'use client';

import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { adminApi } from '@/lib/api/admin';
import { DashboardMetricCard } from '@/components/organisms/DashboardMetricCard';
import { ProgramHealthSection } from '@/components/organisms/ProgramHealthSection';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { computeAdminAlerts } from '@/lib/adminAlerts';

/**
 * PS-05: Backend'in k-anonimlik eşiği (`backend/src/services/mask.ts` K_ANONYMITY_THRESHOLD, V-05).
 * Bir dönemde bu sayıdan az yanıt varsa ortalama gizlenir (null) ve yanıt sayısı 0'a indirgenir —
 * küçük kurumda tek kişinin puanı ortalamadan okunmasın diye. Ekran bu yüzden "0 yanıt" ile
 * "1-2 yanıt"ı ayırt edemez; ikisini de aynı dürüst cümleyle anlatır (sessiz "—" yerine).
 */
const MIN_RESPONSES_FOR_AVERAGE = 3;
const NOT_ENOUGH_RESPONSES_TEXT = `Yeterli yanıt yok (gizlilik için en az ${MIN_RESPONSES_FOR_AVERAGE} yanıt gerekiyor)`;
const SUCCESS_RATE_EMPTY_TEXT =
  `3. ay başarı oranı henüz hesaplanamıyor: yeterli 3. ay değerlendirmesi yok. ` +
  `Kişilerin puanı tek tek okunamasın diye en az ${MIN_RESPONSES_FOR_AVERAGE} yanıt gerekiyor.`;

export default function KpiPage() {
  const api = useApiClient();
  const { data, isLoading, error } = useQuery(() => adminApi.getKpi(api), []);

  // F-19: yöneticiyi harekete geçiren proaktif kırmızı uyarılar (eşik aşımı).
  const alerts = computeAdminAlerts(data);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">KPI Paneli</h1>
        <p className="text-sm text-muted-foreground">Tenant bazlı istatistikler (aggregate — PII içermez).</p>
      </div>

      {error && <AlertMessage type="error" message={error} />}

      {/* F-19: eşik aşımında kırmızı proaktif uyarı bandı */}
      {alerts.length > 0 && (
        <div className="rounded-2xl border-2 border-destructive/50 bg-destructive/5 p-4 space-y-2">
          <p className="flex items-center gap-2 text-sm font-semibold text-destructive">
            ⚠️ Dikkat gerektiren durumlar
          </p>
          <ul className="space-y-1">
            {alerts.map((a) => (
              <li key={a.key} className="text-sm text-destructive/90">• {a.message}</li>
            ))}
          </ul>
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-28 animate-pulse rounded-xl bg-muted" />)}
        </div>
      )}

      {data && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <DashboardMetricCard label="Toplam Aktif Kullanıcı" value={data.stats.totalActiveUsers} color="brand" />
            <DashboardMetricCard label="Aktif Eşleşmeler" value={data.stats.matching.activeMatches} color="success" />
            <DashboardMetricCard label="Bekleyen Opt-In" value={data.stats.matching.pendingOptIns} color="warning" />
            <DashboardMetricCard label="Aktif İş İlanları" value={data.stats.activeJobListings} color="neutral" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Rol dağılımı */}
            <Card>
              <CardHeader><CardTitle className="text-base">Rol Dağılımı</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(data.stats.usersByRole).map(([role, count]) => (
                  <div key={role} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{role}</span>
                    <span className="font-semibold">{count as number}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* NPS */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  NPS Ortalaması (NPS: 0-10 arası «tavsiye eder misin» puanı)
                  {data.stats.feedback.successRate !== null && (
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      (3. ay başarı: {data.stats.feedback.successRate})
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {data.stats.feedback.successRate === null && (
                  <p className="text-sm text-muted-foreground" data-testid="kpi-success-rate-empty">
                    {SUCCESS_RATE_EMPTY_TEXT}
                  </p>
                )}
                {Object.entries(data.stats.feedback.avgNpsByPhase).map(([phase, v]) => (
                  <div key={phase} className="flex justify-between gap-2 text-sm">
                    <span className="text-muted-foreground">{phase.replace('phase', '')}. Ay</span>
                    {v.avgNps !== null ? (
                      <span className="font-semibold">
                        {v.avgNps}
                        <span className="text-xs text-muted-foreground ml-1">({v.sampleSize} kayıt)</span>
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground text-right">{NOT_ENOUGH_RESPONSES_TEXT}</span>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Program Sağlığı — "kimse kaynıyor mu" drill-down + dürtme (kişi-bazlı, admin-only) */}
      <ProgramHealthSection />
    </div>
  );
}
