'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useApiClient } from '@/hooks/useApiClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { certificationApi } from '@/lib/api/certification';
import type { CertTopicsResponse } from '@/types/certification';

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

const label = (topic: string) => TOPIC_LABELS[topic] ?? topic;

export default function AdminCertificationPage() {
  const { user } = useAuth();
  const api = useApiClient();

  const [data, setData]       = useState<CertTopicsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [busy, setBusy]       = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await certificationApi.listTopics(api);
    setLoading(false);
    if (res.ok) setData(res.data);
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
    if (res.ok) {
      setData(res.data);
    } else if (res.error.error === 'RED_LINE_LOCKED') {
      setError('Kritik (red-line) konular kapatılamaz.');
    } else if (res.error.error === 'MIN_TOPICS') {
      setError(res.error.message ?? 'En az minimum sayıda konu açık kalmalı.');
    } else {
      setError('Güncelleme başarısız oldu.');
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-bold">Sertifika Konuları</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Mentörlerinizin sertifika akışında hangi konuların görüneceğini seçin. Senaryolar ve
          puanlama uzmanlarca hazırlanır — <strong>eklenemez veya düzenlenemez</strong>, yalnızca
          açılıp kapatılır. Kritik (red-line) konular her zaman zorunludur.
        </p>
      </div>

      {error && <AlertMessage type="error" message={error} />}

      {loading || !data ? (
        <p className="text-center text-muted-foreground py-8">Yükleniyor…</p>
      ) : (
        <>
          {/* Backend'den gelen tek-kaynak eşik özeti (UI kendi hesaplamaz) */}
          <Card className="bg-muted/40">
            <CardContent className="p-4 text-sm">
              <p>
                Şu an <strong>{data.activeCount}</strong> konu açık. Sertifika için mentörün
                ilk-denemede en az <strong>{data.requiredToPass}</strong> konuda başarılı olması
                gerekir (%{Math.round(data.threshold * 100)}).
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                En az {data.minActiveTopics} konu açık kalmalı. Kritik konular kapatılamaz.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-2">
            {data.topics.map((t) => {
              // Kapatma engeli: red-line kilitli VEYA min sınırına ulaşıldı (açık konuyu kapatırken).
              const atMin = data.activeCount <= data.minActiveTopics;
              const disableToggle =
                busy === t.topic ||
                t.locked ||
                (t.enabled && atMin && !t.locked);
              return (
                <Card key={t.topic}>
                  <CardHeader className="flex flex-row items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <CardTitle className="text-sm flex items-center gap-2 flex-wrap">
                        {label(t.topic)}
                        {t.isRedLine && (
                          <Badge className="bg-red-100 text-red-800 border border-red-300 text-[10px]">
                            Kritik · kilitli
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {t.variantCount} varyant
                        {t.locked && ' · zorunlu, kapatılamaz'}
                        {!t.locked && t.enabled && atMin && ' · min konu sınırı, kapatılamaz'}
                      </p>
                    </div>

                    {/* Aç/kapat anahtarı */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={t.enabled}
                      aria-label={`${label(t.topic)} konusunu ${t.enabled ? 'kapat' : 'aç'}`}
                      disabled={disableToggle}
                      onClick={() => toggle(t.topic, !t.enabled)}
                      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
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
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
