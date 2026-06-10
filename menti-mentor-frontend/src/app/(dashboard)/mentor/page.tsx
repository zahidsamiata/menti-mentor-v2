'use client';

/**
 * Mentor Dashboard
 *
 * Metriks: aktif menti sayısı, bekleyen opt-in talepleri, ortalama NPS,
 *          tamamlanan toplantılar.
 * Eylemler: sıralı menti listesi, toplantı planla.
 *
 * Sprint 14'te gerçek API verileriyle doldurulacak (apiClient + SWR/React Query).
 * Şu an statik placeholder veriler gösterilir.
 */

import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { useTenant } from '@/providers/TenantProvider';
import { TenantLogo } from '@/components/atoms/TenantLogo';
import { DashboardMetricCard } from '@/components/organisms/DashboardMetricCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Placeholder veri — Sprint 14'te API'den gelecek
const PLACEHOLDER_METRICS = [
  { label: 'Aktif Mentilerim',       value: 3,  color: 'brand'   as const },
  { label: 'Bekleyen Talepler',      value: 5,  color: 'warning' as const },
  { label: 'Ortalama NPS',           value: 78, color: 'success' as const },
  { label: 'Tamamlanan Toplantılar', value: 12, color: 'neutral' as const },
];

const PLACEHOLDER_CANDIDATES = [
  { id: '1', name: 'Ayşe K.', discType: 'C', totalScore: 91, fallbackLevel: 0 },
  { id: '2', name: 'Mehmet T.', discType: 'S', totalScore: 84, fallbackLevel: 0 },
  { id: '3', name: 'Zeynep A.', discType: 'I', totalScore: 76, fallbackLevel: 1 },
];

export default function MentorDashboardPage() {
  const { user } = useAuth();
  const { tenant } = useTenant();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {tenant && <TenantLogo tenant={tenant} size={40} />}
          <div>
            <h1 className="text-2xl font-bold">Mentor Paneli</h1>
            <p className="text-sm text-muted-foreground">
              Hoş geldiniz, {user?.fullName?.split(' ')[0] ?? 'Mentor'}
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href="/disc-test">DISC Testini Güncelle</Link>
        </Button>
      </div>

      {/* Metrikler */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {PLACEHOLDER_METRICS.map((m) => (
          <DashboardMetricCard key={m.label} label={m.label} value={m.value} color={m.color} />
        ))}
      </div>

      {/* Önerilen Mentiler */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Eşleşme Önerileri</CardTitle>
          <Badge variant="secondary" className="text-xs">Algoritmik sıralama</Badge>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          {PLACEHOLDER_CANDIDATES.map((c) => (
            <div key={c.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                  {c.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">DISC: {c.discType}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{c.totalScore}</p>
                  <p className="text-xs text-muted-foreground">uyum skoru</p>
                </div>
                {c.fallbackLevel > 0 && (
                  <Badge variant="warning" className="text-xs">Geniş arama</Badge>
                )}
                <Button size="sm" variant="outline">Profili Gör</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Yaklaşan Toplantılar placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Yaklaşan Toplantılar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-6">
            Sprint 14&apos;te toplantı akışı buraya entegre edilecek.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
