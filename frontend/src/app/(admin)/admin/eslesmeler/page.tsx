'use client';

/**
 * Eşleşme Paneli Sayfası (A1)
 *
 * Veri akışı:
 *  useApiClient → adminApi.listMatches({ status, page }) → useQuery → AdminMatch[]
 *
 * Durum sekmeleri kurumun mentör-menti eşleşmelerini duruma göre filtreler.
 * NOT: Bu endpoint KVKK-güvenli — email/ham DISC dönmez; yalnızca ad + arketip + skor.
 */

import { useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { adminApi } from '@/lib/api/admin';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import type { MatchStatus } from '@/types/admin';
import { cn } from '@/lib/utils';

// null = "Tümü" (durum filtresi yok)
const STATUS_TABS: { label: string; value: MatchStatus | null }[] = [
  { label: 'Tümü',        value: null },
  { label: 'Aktif',       value: 'ACTIVE' },
  { label: 'Tamamlanan',  value: 'COMPLETED' },
  { label: 'Erken Biten', value: 'EARLY_EXIT' },
  { label: 'Feshedilen',  value: 'DISSOLVED' },
];

// Durum rozeti: renkler tema-uyumlu (Badge dark eşleri içerir)
const STATUS_BADGE: Record<MatchStatus, { label: string; variant: 'success' | 'default' | 'warning' | 'secondary' }> = {
  ACTIVE:     { label: 'Aktif',       variant: 'success' },
  COMPLETED:  { label: 'Tamamlandı',  variant: 'default' },
  EARLY_EXIT: { label: 'Erken Bitti', variant: 'warning' },
  DISSOLVED:  { label: 'Feshedildi',  variant: 'secondary' },
};

export default function EslesmelerPage() {
  const api = useApiClient();
  const [status, setStatus] = useState<MatchStatus | null>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery(
    () => adminApi.listMatches(api, { status: status ?? undefined, page }),
    [status, page],
    { enabled: true },
  );

  const handleTabChange = (newStatus: MatchStatus | null) => {
    setStatus(newStatus);
    setPage(1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Başlık */}
      <div>
        <h1 className="text-2xl font-bold">Eşleşmeler</h1>
        <p className="text-sm text-muted-foreground">
          Kurumunuzdaki mentör-menti eşleşmeleri.
        </p>
      </div>

      {/* Durum sekmeleri */}
      <div className="flex flex-wrap gap-1 rounded-lg bg-muted p-1 w-fit">
        {STATUS_TABS.map(({ label, value }) => (
          <button
            key={value ?? 'ALL'}
            onClick={() => handleTabChange(value)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              status === value
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Yükleniyor */}
      {isLoading && (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      )}

      {/* Hata */}
      {error && <AlertMessage type="error" message={error} />}

      {/* Boş durum */}
      {!isLoading && !error && data?.items.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-20 text-center">
          <p className="text-4xl">🔗</p>
          <p className="mt-3 font-medium">Henüz eşleşme yok</p>
          <p className="text-sm text-muted-foreground mt-1">
            Bu kategoride gösterilecek eşleşme bulunmuyor.
          </p>
        </div>
      )}

      {/* Tablo */}
      {!isLoading && data && data.items.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Mentör</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Menti</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Puan</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Sektör</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Karakter</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Görüşme</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.items.map((match) => {
                const badge = STATUS_BADGE[match.status];

                return (
                  <tr key={match.id} className="transition-colors hover:bg-muted/30">
                    {/* Mentör */}
                    <td className="px-4 py-3">
                      <p className="font-medium truncate max-w-[160px]">{match.mentorName}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                        {match.mentorArchetype}
                      </p>
                    </td>

                    {/* Menti */}
                    <td className="px-4 py-3">
                      <p className="font-medium truncate max-w-[160px]">{match.mentiName}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                        {match.mentiArchetype}
                      </p>
                    </td>

                    {/* Puan */}
                    <td className="px-4 py-3 text-right font-semibold whitespace-nowrap">
                      %{Math.round(match.predictedScore)}
                    </td>

                    {/* Sektör */}
                    <td className="px-4 py-3 text-right text-muted-foreground whitespace-nowrap">
                      %{Math.round(match.sectorScore)}
                    </td>

                    {/* Karakter */}
                    <td className="px-4 py-3 text-right text-muted-foreground whitespace-nowrap">
                      %{Math.round(match.characterScore)}
                    </td>

                    {/* Görüşme */}
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      {match.meetingCount}
                    </td>

                    {/* Durum */}
                    <td className="px-4 py-3">
                      <Badge variant={badge.variant} className="text-xs">
                        {badge.label}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Sayfalandırma */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border pt-4">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            ← Önceki
          </Button>
          <span className="text-sm text-muted-foreground">Sayfa {page} / {data.totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= data.totalPages} onClick={() => setPage((p) => p + 1)}>
            Sonraki →
          </Button>
        </div>
      )}
    </div>
  );
}
