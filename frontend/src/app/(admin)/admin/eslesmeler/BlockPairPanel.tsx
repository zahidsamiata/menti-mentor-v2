'use client';

/**
 * Çifti Engelle Paneli (E-3d, KR-19)
 *
 * Kurum yöneticisi bir mentör + bir menti seçip aralarındaki eşleşmeyi kapatır.
 * KR-19/KR-19b sayesinde backend bu engeli dört yüzeyde iki yönlü uygular:
 * liste (matching), mesaj (konuşma), randevu (görüşme), anlaşma. Bu panel yalnız
 * engeli KOYAR — KALDIRAN veya MEVCUT engelleri LİSTELEYEN bir backend ucu yok
 * (E-3d denetimi, 2026-09-27); o iş ayrı bir uç ister, burada kapsam dışı.
 *
 * Yetki: backend `authenticateTenantAdmin` zaten ADMIN zorunlu kılıyor; bu sayfa
 * `(admin)/layout.tsx` altında olduğu için ADMIN olmayan kullanıcı zaten
 * `/dashboard`'a yönlendirilir (bkz. `admin/layout.tsx` useEffect gating) — panel
 * kendi başına ayrıca rol kontrolü YAPMAZ, komşu admin sayfalarıyla aynı desen.
 */

import { useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { useAuth } from '@/providers/AuthProvider';
import { useQuery } from '@/hooks/useQuery';
import { adminApi } from '@/lib/api/admin';
import { Button } from '@/components/ui/button';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { UI_TEXT } from '@/lib/uiText';

export function BlockPairPanel() {
  const api = useApiClient();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [mentorId, setMentorId] = useState('');
  const [mentiId, setMentiId] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const mentors = useQuery(
    () => adminApi.listUsers(api, { role: 'MENTOR', approvalStatus: 'APPROVED' }),
    [open],
    { enabled: open, cacheKey: 'admin:users:MENTOR:APPROVED:1' },
  );
  const mentis = useQuery(
    () => adminApi.listUsers(api, { role: 'MENTI', approvalStatus: 'APPROVED' }),
    [open],
    { enabled: open, cacheKey: 'admin:users:MENTI:APPROVED:1' },
  );

  function notify(type: 'success' | 'error', text: string) {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 4000);
  }

  async function handleBlock() {
    if (!user?.tenantId || !mentorId || !mentiId) return;

    const mentorName = mentors.data?.items.find((u) => u.id === mentorId)?.fullName ?? 'seçilen mentör';
    const mentiName = mentis.data?.items.find((u) => u.id === mentiId)?.fullName ?? 'seçilen menti';

    const confirmed = window.confirm(
      `${mentorName} ile ${mentiName} birbirini artık listede göremez, mesajlaşamaz, randevu alamaz. ` +
        'Bu çifti engellemek istediğinize emin misiniz?',
    );
    if (!confirmed) return;

    setBusy(true);
    const result = await adminApi.blockPair(api, user.tenantId, mentorId, mentiId);
    setBusy(false);

    if (result.ok) {
      notify('success', `${mentorName} ile ${mentiName} artık birbiriyle eşleşemez.`);
      setMentorId('');
      setMentiId('');
    } else {
      notify('error', result.error.message ?? 'Engelleme başarısız oldu.');
    }
  }

  return (
    <div className="rounded-xl border p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Çifti Engelle</p>
          <p className="text-xs text-muted-foreground">
            Bir mentör ve bir mentiyi birbiriyle eşleşmeye kapatır.
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={() => setOpen((v) => !v)}>
          {open ? UI_TEXT.actions.close : '+ Çifti Engelle'}
        </Button>
      </div>

      {open && (
        <div className="space-y-3 pt-1">
          {msg && <AlertMessage type={msg.type} message={msg.text} />}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground" htmlFor="block-pair-mentor">
                Mentör
              </label>
              <select
                id="block-pair-mentor"
                className="mt-1 w-full rounded-lg border border-border bg-background px-2 py-1.5 text-sm"
                value={mentorId}
                onChange={(e) => setMentorId(e.target.value)}
                disabled={mentors.isLoading}
              >
                <option value="">Mentör seçin…</option>
                {(mentors.data?.items ?? []).map((u) => (
                  <option key={u.id} value={u.id}>{u.fullName}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground" htmlFor="block-pair-menti">
                Menti
              </label>
              <select
                id="block-pair-menti"
                className="mt-1 w-full rounded-lg border border-border bg-background px-2 py-1.5 text-sm"
                value={mentiId}
                onChange={(e) => setMentiId(e.target.value)}
                disabled={mentis.isLoading}
              >
                <option value="">Menti seçin…</option>
                {(mentis.data?.items ?? []).map((u) => (
                  <option key={u.id} value={u.id}>{u.fullName}</option>
                ))}
              </select>
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
