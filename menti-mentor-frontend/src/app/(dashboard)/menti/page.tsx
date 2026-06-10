'use client';

/**
 * Menti Dashboard
 *
 * Öncelikli eylem: DISC testi tamamlanmamışsa banner göster.
 * Metriks: eşleşme talebi durumu, toplantı sayısı, DISC boyutları.
 * Sprint 14'te API verileriyle doldurulacak.
 */

import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { useTenant } from '@/providers/TenantProvider';
import { TenantLogo } from '@/components/atoms/TenantLogo';
import { DashboardMetricCard } from '@/components/organisms/DashboardMetricCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PLACEHOLDER_METRICS = [
  { label: 'Gönderilen Talepler',    value: 2,  color: 'brand'   as const },
  { label: 'Onaylanan Eşleşmeler',   value: 1,  color: 'success' as const },
  { label: 'Tamamlanan Toplantılar', value: 3,  color: 'neutral' as const },
  { label: 'DISC Güven Skoru',       value: '%72', color: 'warning' as const },
];

// DISC vektör placeholder — Sprint 14'te API'den gelecek
const DISC_VECTOR = { D: 18, I: 42, S: 28, C: 12 };
const DISC_COLORS: Record<string, string> = {
  D: 'bg-red-400', I: 'bg-yellow-400', S: 'bg-green-400', C: 'bg-blue-400',
};

export default function MentiDashboardPage() {
  const { user } = useAuth();
  const { tenant } = useTenant();

  // DISC profili tamamlanmamış uyarısı (gerçek veri Sprint 14'te)
  const needsDiscTest = !user?.discType;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {tenant && <TenantLogo tenant={tenant} size={40} />}
          <div>
            <h1 className="text-2xl font-bold">Menti Paneli</h1>
            <p className="text-sm text-muted-foreground">
              Hoş geldiniz, {user?.fullName?.split(' ')[0] ?? 'Menti'}
            </p>
          </div>
        </div>
        <Badge
          variant={user?.approvalStatus === 'APPROVED' ? 'success' : 'warning'}
          className="text-xs"
        >
          {user?.approvalStatus === 'APPROVED' ? 'Onaylandı' : 'Onay Bekleniyor'}
        </Badge>
      </div>

      {/* DISC testi tamamlanmamış uyarısı */}
      {needsDiscTest && (
        <div className="rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 p-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-sm">DISC Profilinizi Tamamlayın</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Profil tamamlandığında size uygun mentorlar gösterilmeye başlar.
            </p>
          </div>
          <Button asChild size="sm">
            <Link href="/disc-test">Teste Başla →</Link>
          </Button>
        </div>
      )}

      {/* Metrikler */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {PLACEHOLDER_METRICS.map((m) => (
          <DashboardMetricCard key={m.label} label={m.label} value={m.value} color={m.color} />
        ))}
      </div>

      {/* DISC Vektör görselleştirme */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">DISC Boyutlarım</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(DISC_VECTOR).map(([dim, value]) => (
            <div key={dim} className="flex items-center gap-3">
              <span className="w-4 text-xs font-bold text-muted-foreground">{dim}</span>
              <div className="flex-1">
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${DISC_COLORS[dim]}`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
              <span className="w-8 text-right text-xs font-medium">{value}%</span>
            </div>
          ))}
          <p className="text-xs text-muted-foreground pt-1">
            * Placeholder veri — Sprint 14&apos;te gerçek DISC vektörüyle güncellenir
          </p>
        </CardContent>
      </Card>

      {/* Önerilen Mentorlar placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Önerilen Mentorlar</CardTitle>
        </CardHeader>
        <CardContent>
          {needsDiscTest ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              DISC profilinizi tamamladıktan sonra size uygun mentorlar burada görünecek.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-6">
              Sprint 14&apos;te mentor listesi API&apos;ye bağlanacak.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
