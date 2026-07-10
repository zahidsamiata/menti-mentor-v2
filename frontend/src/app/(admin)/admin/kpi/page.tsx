'use client';

import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { adminApi } from '@/lib/api/admin';
import { DashboardMetricCard } from '@/components/organisms/DashboardMetricCard';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function KpiPage() {
  const api = useApiClient();
  const { data, isLoading, error } = useQuery(() => adminApi.getKpi(api), []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">KPI Paneli</h1>
        <p className="text-sm text-muted-foreground">Tenant bazlı istatistikler (aggregate — PII içermez).</p>
      </div>

      {error && <AlertMessage type="error" message={error} />}

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
                  NPS Ortalaması
                  {data.stats.feedback.successRate !== null && (
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      (3. ay başarı: {data.stats.feedback.successRate})
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(data.stats.feedback.avgNpsByPhase).map(([phase, v]) => (
                  <div key={phase} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{phase.replace('phase', '')}. Ay</span>
                    <span className="font-semibold">
                      {(v as { avgNps: number | null }).avgNps ?? '—'}
                      <span className="text-xs text-muted-foreground ml-1">({(v as { sampleSize: number }).sampleSize} kayıt)</span>
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
