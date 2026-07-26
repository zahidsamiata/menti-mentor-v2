'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useApiClient } from '@/hooks/useApiClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { certificationApi } from '@/lib/api/certification';
import type { CertTopicInfo } from '@/types/certification';

// Konu slug → okunabilir başlık (senaryo bankası konuları).
const TOPIC_LABELS: Record<string, string> = {
  'cevabi-verme-buldur':          'Cevabı verme, buldur',
  'yapici-geri-bildirim':         'Yapıcı geri bildirim',
  'beklentileri-hizalama':        'Beklentileri hizalama',
  'aktif-dinleme':                'Aktif dinleme & yargılamama',
  'sinir-koyma':                  'Sınır koyma & rol netliği',
  'gonullu-tukenmisligi':         'Gönüllü tükenmişliği & motivasyon',
  'okul-gonulluluk-dengesi':      'Okul/iş ile gönüllülük dengesi',
  'kulturel-farkliliklara-saygi': 'Kültürel/bireysel farklılıklara saygı',
  'gizlilik-guven':               'Gizlilik & güven',
  'kriz-yonetimi':                'Kriz & hassas durum yönetimi',
};

export default function AdminCertificationPage() {
  const { user } = useAuth();
  const api = useApiClient();

  const [topics, setTopics]   = useState<CertTopicInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [busy, setBusy]       = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await certificationApi.listTopics(api);
    setLoading(false);
    if (res.ok) setTopics(res.data.topics);
    else setError('Konular yüklenemedi.');
  }, [api]);

  useEffect(() => {
    if (user?.role === 'ADMIN') void load();
  }, [user?.role, load]);

  if (!user || user.role !== 'ADMIN') return null;

  async function toggle(topic: string, enabled: boolean) {
    setBusy(topic);
    setError(null);
    const res = await certificationApi.setTopic(api, topic, enabled);
    setBusy(null);
    if (res.ok) setTopics(res.data.topics);
    else setError('Güncelleme başarısız oldu.');
  }

  const enabledCount = topics.filter((t) => t.enabled).length;

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-bold">Sertifika Konuları</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Mentörlerinizin sertifika akışında hangi konuların görüneceğini seçin. Senaryolar ve
          puanlama uzmanlarca hazırlanır — <strong>eklenemez veya düzenlenemez</strong>, yalnızca
          açılıp kapatılır.
        </p>
      </div>

      {error && <AlertMessage type="error" message={error} />}

      {loading ? (
        <p className="text-center text-muted-foreground py-8">Yükleniyor…</p>
      ) : (
        <>
          <p className="text-xs text-muted-foreground">
            {enabledCount} / {topics.length} konu açık
          </p>
          <div className="space-y-2">
            {topics.map((t) => (
              <Card key={t.topic}>
                <CardHeader className="flex flex-row items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <CardTitle className="text-sm flex items-center gap-2 flex-wrap">
                      {TOPIC_LABELS[t.topic] ?? t.topic}
                      {t.isRedLine && (
                        <Badge className="bg-red-100 text-red-800 border border-red-300 text-[10px]">
                          Kritik
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.variantCount} varyant</p>
                  </div>

                  {/* Aç/kapat anahtarı */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={t.enabled}
                    aria-label={`${TOPIC_LABELS[t.topic] ?? t.topic} konusunu ${t.enabled ? 'kapat' : 'aç'}`}
                    disabled={busy === t.topic}
                    onClick={() => toggle(t.topic, !t.enabled)}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      t.enabled ? 'bg-green-500' : 'bg-muted-foreground/40'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                        t.enabled ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
