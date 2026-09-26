'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { meetingsApi } from '@/lib/api/meetings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { UI_TEXT } from '@/lib/uiText';
import type { UserProfileData } from '@/lib/api/profile';

const WEEKDAYS = [
  { value: 'MON', label: 'Pazartesi' },
  { value: 'TUE', label: 'Salı' },
  { value: 'WED', label: 'Çarşamba' },
  { value: 'THU', label: 'Perşembe' },
  { value: 'FRI', label: 'Cuma' },
  { value: 'SAT', label: 'Cumartesi' },
  { value: 'SUN', label: 'Pazar' },
] as const;

type Weekday = typeof WEEKDAYS[number]['value'];

interface Block { weekday: Weekday; startTime: string; endTime: string }

const WEEKDAY_LABEL: Record<Weekday, string> = Object.fromEntries(
  WEEKDAYS.map(({ value, label }) => [value, label])
) as Record<Weekday, string>;

/** Aynı aralığın iki kez listelenmemesi için tekilleştirme anahtarı. */
const blockKey = (b: Block) => `${b.weekday}|${b.startTime}|${b.endTime}`;

export default function AvailabilityPage() {
  const { user, isLoading } = useAuth();
  const api = useApiClient();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.replace('/login');
    if (!isLoading && user && user.role !== 'MENTOR') router.replace('/dashboard');
  }, [user, isLoading, router]);

  const { data, isLoading: fetchingBlocks, error: loadError, refetch } = useQuery(
    () => meetingsApi.getAvailability(api, user?.id ?? ''),
    [api, user?.id],
    { enabled: Boolean(user?.id) },
  );

  // AN-28: mevcut görünürlük tercihini kendi profil kaydından oku (USER_FULL_SELECT self için
  // mentorVisibilityEnabled döner). Müsaitlik bloklarından AYRI bir kayıt/uç — burada yalnız
  // OKUNUR, kaydetme kendi düğmesiyle (saveVisibility) yapılır.
  const { data: profileData } = useQuery(
    () => api<UserProfileData>(`/api/users/${user?.id ?? ''}`),
    [api, user?.id],
    { enabled: Boolean(user?.id) },
  );

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [newBlock, setNewBlock] = useState<Block>({ weekday: 'MON', startTime: '09:00', endTime: '17:00' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [visibilityEnabled, setVisibilityEnabled] = useState(true);
  const [visibilitySaving, setVisibilitySaving] = useState(false);
  const [visibilitySaved, setVisibilitySaved] = useState(false);
  const [visibilityError, setVisibilityError] = useState<string | null>(null);
  const visibilityHydratedRef = useRef(false);

  // Sunucu verisi yerel listeye YALNIZ BİR KEZ aktarılır. Aksi halde GET cevabı
  // (ilk yükleme geç dönerse ya da token yenilenince yeniden istek atılırsa)
  // kullanıcının o sırada eklediği, henüz kaydedilmemiş aralıkları siler —
  // mentörün ikinci gün ekleyememesinin sebebi buydu (K-03).
  const hydratedRef = useRef(false);

  // Kaydet, sunucudaki listeyi TAMAMEN değiştirir (önce tüm aralıklar pasifleşir).
  // Liste yüklenemediyse ya da hâlâ yükleniyorsa ekrandaki liste eksik/boş olabilir;
  // bu hâlde kaydetmek mentörün kayıtlı aralıklarını siler (KR-10) → kaydet kilitli.
  const canSave = !fetchingBlocks && !loadError;

  useEffect(() => {
    if (!data?.blocks || hydratedRef.current) return;
    hydratedRef.current = true;

    // Sunucu satırları Prisma alanlarını da taşır (id/tenantId/timezone…);
    // forma yalnız bu üç alan girer, kaydederken de yalnız bu üçü geri gider.
    const serverBlocks: Block[] = (data.blocks as Block[]).map((b) => ({
      weekday:   b.weekday,
      startTime: b.startTime,
      endTime:   b.endTime,
    }));
    const serverKeys = new Set(serverBlocks.map(blockKey));

    // Cevap beklenirken eklenmiş aralıklar korunur, mükerrerleri atılır.
    setBlocks((prev) => [
      ...serverBlocks,
      ...prev.filter((b) => !serverKeys.has(blockKey(b))),
    ]);
  }, [data]);

  // Görünürlük tercihi yalnız BİR KEZ sunucudan hidratlanır (blocks ile aynı gerekçe, K-03) —
  // aksi halde henüz kaydedilmemiş bir değişiklik, arka planda tekrar çeken bir GET tarafından silinir.
  useEffect(() => {
    if (profileData?.mentorVisibilityEnabled === undefined || visibilityHydratedRef.current) return;
    visibilityHydratedRef.current = true;
    setVisibilityEnabled(profileData.mentorVisibilityEnabled);
  }, [profileData]);

  function addBlock() {
    if (newBlock.startTime >= newBlock.endTime) {
      setError('Başlangıç saati bitiş saatinden önce olmalı.');
      return;
    }
    setBlocks((prev) => [...prev, { ...newBlock }]);
    setError(null);
    setSaved(false);
  }

  function removeBlock(index: number) {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  }

  async function save() {
    if (!canSave) return;
    setSaving(true);
    setError(null);
    const result = await meetingsApi.saveAvailability(api, { blocks });
    setSaving(false);
    if (result.ok) {
      setSaved(true);
    } else {
      setError(result.error.message ?? 'Kaydedilemedi.');
    }
  }

  // AN-28: görünürlük tercihi PATCH /users/me/profile üzerinden kaydedilir (müsaitlik
  // bloklarından ayrı uç — bkz. userController.updateMyProfile).
  async function saveVisibility(next: boolean) {
    setVisibilityEnabled(next);
    setVisibilitySaving(true);
    setVisibilityError(null);
    setVisibilitySaved(false);
    const result = await api<UserProfileData>('/api/users/me/profile', {
      method: 'PATCH',
      body: { mentorVisibilityEnabled: next },
    });
    setVisibilitySaving(false);
    if (result.ok) {
      setVisibilitySaved(true);
    } else {
      setVisibilityEnabled(!next); // başarısız → görünen durumu eskiye al
      setVisibilityError(result.error.message ?? 'Görünürlük tercihi kaydedilemedi.');
    }
  }

  if (isLoading || !user) return null;

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Müsaitlik Takvimim</h1>
        <p className="text-sm text-muted-foreground">
          Mentileriniz bu aralıklarda randevu talep edebilir.
        </p>
      </div>

      {error && <AlertMessage type="error" message={error} />}
      {saved && <AlertMessage type="success" message="Müsaitlik saatleriniz kaydedildi." />}

      {/* AN-28 · KARAR-32 revizyonu: mentör kendi görünürlüğünü kapatabilir — kapatınca
          menti havuzundan ÇIKMAZ, kartı soluk görünür ve yalnız mesaj alabilir, randevu alamaz. */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Menti Havuzunda Görünürlük</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Kapatırsanız yeni mentiler sizi listede soluk görür ve yalnızca mesaj gönderebilir;
            randevu talebi alamazsınız. Devam eden eşleşmeleriniz etkilenmez.
          </p>
          {visibilityError && <AlertMessage type="error" message={visibilityError} />}
          {visibilitySaved && <AlertMessage type="success" message="Görünürlük tercihiniz kaydedildi." />}
          <button
            type="button"
            role="switch"
            aria-checked={visibilityEnabled}
            disabled={visibilitySaving}
            onClick={() => saveVisibility(!visibilityEnabled)}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-sm font-medium transition-colors disabled:opacity-40 ${
              visibilityEnabled
                ? 'border-primary/40 bg-primary/5 text-foreground'
                : 'border-border bg-muted text-muted-foreground'
            }`}
          >
            <span
              className={`inline-block h-5 w-9 rounded-full transition-colors ${
                visibilityEnabled ? 'bg-primary' : 'bg-border'
              }`}
            >
              <span
                className={`block h-4 w-4 translate-y-0.5 rounded-full bg-white transition-transform ${
                  visibilityEnabled ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </span>
            {visibilityEnabled ? 'Yeni mentilere görünürüm' : 'Yeni mentilere kapalıyım'}
          </button>
        </CardContent>
      </Card>

      {/* Yeni blok ekle */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Yeni Aralık Ekle</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Gün</label>
            <select
              value={newBlock.weekday}
              onChange={(e) => setNewBlock((b) => ({ ...b, weekday: e.target.value as Weekday }))}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            >
              {WEEKDAYS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Başlangıç</label>
              <input
                type="time"
                value={newBlock.startTime}
                onChange={(e) => setNewBlock((b) => ({ ...b, startTime: e.target.value }))}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Bitiş</label>
              <input
                type="time"
                value={newBlock.endTime}
                onChange={(e) => setNewBlock((b) => ({ ...b, endTime: e.target.value }))}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
          <Button onClick={addBlock} variant="outline" className="w-full">+ Ekle</Button>
        </CardContent>
      </Card>

      {/* Mevcut bloklar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">
            Müsait Olduğum Saatler
            {blocks.length > 0 && (
              <span className="ml-2 text-xs font-normal text-muted-foreground">({blocks.length} aralık)</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadError && !fetchingBlocks ? (
            <div className="space-y-3 py-4 text-center">
              <p className="text-sm text-destructive">
                Kayıtlı müsaitlik saatleriniz yüklenemedi. Mevcut aralıklarınızın silinmemesi için
                liste yüklenene kadar kaydetme kapalı.
              </p>
              <Button onClick={refetch} variant="outline" size="sm">Tekrar yükle</Button>
            </div>
          ) : fetchingBlocks ? (
            <div className="space-y-2">
              {[1, 2].map((i) => <div key={i} className="h-10 animate-pulse rounded-lg bg-muted" />)}
            </div>
          ) : blocks.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              Henüz müsaitlik eklenmedi. Mentileriniz randevu talep edemez.
            </p>
          ) : (
            <div className="space-y-2">
              {blocks.map((blk, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                  <span className="text-sm">
                    <span className="font-medium">{WEEKDAY_LABEL[blk.weekday]}</span>
                    {' '}{blk.startTime}–{blk.endTime}
                  </span>
                  <button
                    onClick={() => removeBlock(i)}
                    className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                    aria-label={UI_TEXT.actions.delete}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Button onClick={save} disabled={saving || !canSave} className="w-full">
        {saving ? UI_TEXT.status.saving : 'Müsaitliği Kaydet'}
      </Button>
    </div>
  );
}
