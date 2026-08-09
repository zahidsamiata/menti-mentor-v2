import type { TenantAnalytics } from '@/lib/api/platform';

export function DiscSummary({
  analytics,
  loading,
}: {
  analytics: TenantAnalytics | null;
  loading: boolean;
}) {
  if (loading) return <p className="text-muted-foreground text-sm">Yükleniyor…</p>;
  if (!analytics || analytics.discDistribution.length === 0) {
    return <p className="text-muted-foreground text-sm">DISC analizi için yeterli veri yok.</p>;
  }

  const max = Math.max(...analytics.discDistribution.map((d) => d.count), 1);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        DISC tipi belirlenmiş üye sayısı:{' '}
        <span className="text-foreground font-semibold">{analytics.totalWithDisc}</span>
      </p>

      <div className="rounded-xl bg-card border border-border p-5 space-y-3">
        {analytics.discDistribution.map((d) => {
          const pct = analytics.totalWithDisc > 0
            ? Math.round((d.count / analytics.totalWithDisc) * 100)
            : 0;
          const width = Math.round((d.count / max) * 100);
          return (
            <div key={d.discType} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground font-medium">{d.discType}</span>
                <span className="text-muted-foreground text-xs">
                  {d.count} ({pct}%)
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
