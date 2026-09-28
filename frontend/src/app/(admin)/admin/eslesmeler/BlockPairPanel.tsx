'use client';

/**
 * Çifti Engelle Paneli (E-3d, KR-19)
 *
 * Kurum yöneticisi bir mentör + bir menti seçip aralarındaki eşleşmeyi kapatır,
 * mevcut engelleri görür ve istediğinde kaldırır. KR-19/KR-19b sayesinde backend
 * bu engeli dört yüzeyde iki yönlü uygular: liste (matching), mesaj (konuşma),
 * randevu (görüşme), anlaşma. Engel kaldırılınca çift bu dört yüzeyde de yeniden
 * birbirine erişebilir (backend `pairKey` ile aynı yön-bağımsız kimlik — bkz.
 * `adminApi.unblockPair`).
 *
 * Yetki: backend `authenticateTenantAdmin` zaten ADMIN zorunlu kılıyor; bu sayfa
 * `(admin)/layout.tsx` altında olduğu için ADMIN olmayan kullanıcı zaten
 * `/dashboard`'a yönlendirilir (bkz. `admin/layout.tsx` useEffect gating) — panel
 * kendi başına ayrıca rol kontrolü YAPMAZ, komşu admin sayfalarıyla aynı desen.
 */

import { useEffect, useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { useAuth } from '@/providers/AuthProvider';
import { useQuery } from '@/hooks/useQuery';
import { adminApi } from '@/lib/api/admin';
import { Button } from '@/components/ui/button';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { UI_TEXT } from '@/lib/uiText';

// Arama kutusu her tuşta istek atmasın diye kısa bekleme (ms).
const SEARCH_DEBOUNCE_MS = 300;

/** Yazmayı bitirdikten SEARCH_DEBOUNCE_MS sonra kırpılmış arama metnini döner. */
function useDebouncedSearch(value: string): string {
  const [debounced, setDebounced] = useState(value.trim());
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [value]);
  return debounced;
}

export function BlockPairPanel() {
  const api = useApiClient();
  const { user } = useAuth();
  const tenantId = user?.tenantId;

  const [open, setOpen] = useState(false);
  const [mentorId, setMentorId] = useState('');
  const [mentiId, setMentiId] = useState('');
  const [busy, setBusy] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  // AJ-106: seçim listeleri eskiden yalnız ilk sayfadaki (50) kişiyi gösteriyordu; ada göre arama
  // backend'de (`search`) tüm onaylı üyelerde yapılır. Seçilen kişinin adı ayrıca tutulur ki
  // arama değişince seçim listeden düşse de onay metninde ve seçim kutusunda görünmeye devam etsin.
  const [mentorSearch, setMentorSearch] = useState('');
  const [mentiSearch, setMentiSearch] = useState('');
  const [selectedNames, setSelectedNames] = useState<Record<string, string>>({});
  const mentorQuery = useDebouncedSearch(mentorSearch);
  const mentiQuery = useDebouncedSearch(mentiSearch);

  const blocked = useQuery(
    () => adminApi.listBlockedPairs(api, tenantId ?? ''),
    [tenantId],
    { enabled: !!tenantId, cacheKey: tenantId ? `admin:blocked-pairs:${tenantId}` : undefined },
  );
  const mentors = useQuery(
    () => adminApi.listUsers(api, { role: 'MENTOR', approvalStatus: 'APPROVED', search: mentorQuery || undefined }),
    [open, mentorQuery],
    { enabled: open, cacheKey: `admin:users:MENTOR:APPROVED:1:${mentorQuery}` },
  );
  const mentis = useQuery(
    () => adminApi.listUsers(api, { role: 'MENTI', approvalStatus: 'APPROVED', search: mentiQuery || undefined }),
    [open, mentiQuery],
    { enabled: open, cacheKey: `admin:users:MENTI:APPROVED:1:${mentiQuery}` },
  );

  function selectUser(
    id: string,
    items: { id: string; fullName: string }[] | undefined,
    setId: (id: string) => void,
  ) {
    setId(id);
    const name = items?.find((u) => u.id === id)?.fullName;
    if (name) setSelectedNames((prev) => ({ ...prev, [id]: name }));
  }

  /** Seçim kutusu seçenekleri: arama sonucu + (sonuçta yoksa) seçili kişi. */
  function optionsFor(items: { id: string; fullName: string }[] | undefined, selectedId: string) {
    const list = items ?? [];
    if (!selectedId || list.some((u) => u.id === selectedId) || !selectedNames[selectedId]) return list;
    return [{ id: selectedId, fullName: selectedNames[selectedId] }, ...list];
  }

  function notify(type: 'success' | 'error', text: string) {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 4000);
  }

  async function handleBlock() {
    if (!tenantId || !mentorId || !mentiId) return;

    const mentorName = selectedNames[mentorId]
      ?? mentors.data?.items.find((u) => u.id === mentorId)?.fullName ?? 'seçilen mentör';
    const mentiName = selectedNames[mentiId]
      ?? mentis.data?.items.find((u) => u.id === mentiId)?.fullName ?? 'seçilen menti';

    const confirmed = window.confirm(
      `${mentorName} ile ${mentiName} birbirini artık listede göremez, mesajlaşamaz, görüşme planlayamaz. ` +
        'Bu çifti engellemek istediğinize emin misiniz?',
    );
    if (!confirmed) return;

    setBusy(true);
    const result = await adminApi.blockPair(api, tenantId, mentorId, mentiId);
    setBusy(false);

    if (result.ok) {
      notify('success', `${mentorName} ile ${mentiName} artık birbiriyle eşleşemez.`);
      setMentorId('');
      setMentiId('');
      blocked.refetch();
    } else {
      notify('error', result.error.message ?? 'Engelleme başarısız oldu.');
    }
  }

  async function handleUnblock(pairId: string, fromName: string | null, toName: string | null) {
    if (!tenantId) return;

    const a = fromName ?? 'birinci taraf';
    const b = toName ?? 'ikinci taraf';
    const confirmed = window.confirm(
      `${a} ile ${b} arasındaki engeli kaldırmak istediğinize emin misiniz? ` +
        'Kaldırıldıktan sonra bu çift birbirini yeniden listede görebilir, mesajlaşabilir, görüşme planlayabilir.',
    );
    if (!confirmed) return;

    setRemovingId(pairId);
    const result = await adminApi.unblockPair(api, tenantId, pairId);
    setRemovingId(null);

    if (result.ok) {
      notify('success', `${a} ile ${b} arasındaki engel kaldırıldı.`);
      blocked.refetch();
    } else {
      notify('error', result.error.message ?? 'Engel kaldırılamadı.');
    }
  }

  return (
    <div className="rounded-xl border p-4 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Çifti Engelle</p>
          <p className="text-xs text-muted-foreground">
            Bir mentör ve bir mentiyi birbiriyle eşleşmeye kapatır; mevcut engelleri buradan kaldırabilirsiniz.
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={() => setOpen((v) => !v)}>
          {open ? UI_TEXT.actions.close : '+ Çifti Engelle'}
        </Button>
      </div>

      {msg && <AlertMessage type={msg.type} message={msg.text} />}

      {/* Mevcut engeller — her zaman görünür, panel açık/kapalı fark etmez */}
      <div className="space-y-2">
        {blocked.isLoading && <p className="text-xs text-muted-foreground">{UI_TEXT.status.loading}</p>}
        {blocked.error && <AlertMessage type="error" message={blocked.error} />}
        {blocked.data && blocked.data.items.length === 0 && (
          <p className="text-xs text-muted-foreground">Şu an engellenmiş bir çift yok.</p>
        )}
        {blocked.data && blocked.data.items.length > 0 && (
          <div className="rounded-lg border divide-y divide-border">
            {blocked.data.items.map((pair) => (
              <div key={pair.pairId} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
                <div className="min-w-0">
                  <p className="truncate">
                    <span className="font-medium">{pair.fromUser.fullName ?? 'Silinmiş kullanıcı'}</span>
                    {' ↔ '}
                    <span className="font-medium">{pair.toUser.fullName ?? 'Silinmiş kullanıcı'}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(pair.blockedAt).toLocaleDateString('tr-TR')}
                    {pair.blockedByName && ` · ${pair.blockedByName} engelledi`}
                  </p>
                </div>
                <button
                  onClick={() => handleUnblock(pair.pairId, pair.fromUser.fullName, pair.toUser.fullName)}
                  disabled={removingId === pair.pairId}
                  className="shrink-0 text-xs text-destructive hover:text-destructive/80 transition-colors disabled:opacity-50"
                >
                  {removingId === pair.pairId ? 'Kaldırılıyor…' : 'Engeli kaldır'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div className="space-y-3 pt-1 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground" htmlFor="block-pair-mentor">
                Mentör
              </label>
              <input
                type="search"
                aria-label="Mentör ara"
                placeholder="Ada göre ara…"
                className="mt-1 w-full rounded-lg border border-border bg-background px-2 py-1.5 text-sm"
                value={mentorSearch}
                onChange={(e) => setMentorSearch(e.target.value)}
              />
              <select
                id="block-pair-mentor"
                className="mt-1 w-full rounded-lg border border-border bg-background px-2 py-1.5 text-sm"
                value={mentorId}
                onChange={(e) => selectUser(e.target.value, mentors.data?.items, setMentorId)}
                disabled={mentors.isLoading}
              >
                <option value="">Mentör seçin…</option>
                {optionsFor(mentors.data?.items, mentorId).map((u) => (
                  <option key={u.id} value={u.id}>{u.fullName}</option>
                ))}
              </select>
              {mentors.data && mentors.data.totalPages > 1 && (
                <p className="mt-1 text-xs text-muted-foreground">
                  İlk {mentors.data.items.length} kişi gösteriliyor ({mentors.data.total} kişiden). Aradığınız kişiyi bulamazsanız adını yazın.
                </p>
              )}
              {mentors.data && mentors.data.items.length === 0 && mentorSearch.trim() && (
                <p className="mt-1 text-xs text-muted-foreground">Bu adla eşleşen onaylı mentör bulunamadı.</p>
              )}
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground" htmlFor="block-pair-menti">
                Menti
              </label>
              <input
                type="search"
                aria-label="Menti ara"
                placeholder="Ada göre ara…"
                className="mt-1 w-full rounded-lg border border-border bg-background px-2 py-1.5 text-sm"
                value={mentiSearch}
                onChange={(e) => setMentiSearch(e.target.value)}
              />
              <select
                id="block-pair-menti"
                className="mt-1 w-full rounded-lg border border-border bg-background px-2 py-1.5 text-sm"
                value={mentiId}
                onChange={(e) => selectUser(e.target.value, mentis.data?.items, setMentiId)}
                disabled={mentis.isLoading}
              >
                <option value="">Menti seçin…</option>
                {optionsFor(mentis.data?.items, mentiId).map((u) => (
                  <option key={u.id} value={u.id}>{u.fullName}</option>
                ))}
              </select>
              {mentis.data && mentis.data.totalPages > 1 && (
                <p className="mt-1 text-xs text-muted-foreground">
                  İlk {mentis.data.items.length} kişi gösteriliyor ({mentis.data.total} kişiden). Aradığınız kişiyi bulamazsanız adını yazın.
                </p>
              )}
              {mentis.data && mentis.data.items.length === 0 && mentiSearch.trim() && (
                <p className="mt-1 text-xs text-muted-foreground">Bu adla eşleşen onaylı menti bulunamadı.</p>
              )}
            </div>
          </div>

          {mentors.error && <AlertMessage type="error" message={mentors.error} />}
          {mentis.error && <AlertMessage type="error" message={mentis.error} />}

          <Button
            size="sm"
            variant="destructive"
            disabled={!mentorId || !mentiId || busy}
            onClick={handleBlock}
          >
            {busy ? 'Engelleniyor…' : 'Engelle'}
          </Button>
        </div>
      )}
    </div>
  );
}
