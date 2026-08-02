'use client';

/**
 * Mentör Sertifika Sonuç Panosu (A4)
 *
 * Veri akışı:
 *  useApiClient → adminApi.listCertResults({ status?, page? }) → useQuery → MentorCertResult[]
 *
 * Durum sekmeleri sertifikasyon durumunu (CERTIFIED / FAILED / COOLDOWN / NOT_STARTED)
 * sunucu tarafında filtreler. "Tümü" filtresiz sorar.
 */

import { useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { adminApi } from '@/lib/api/admin';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import type { CertificationStatus } from '@/types/admin';
import { cn } from '@/lib/utils';

// Filtre sekmeleri: value null ise "Tümü" (filtresiz)
const STATUS_TABS: { label: string; value: CertificationStatus | null }[] = [
  { label: 'Tümü',       value: null },
  { label: 'Sertifikalı', value: 'CERTIFIED' },
  { label: 'Başarısız',  value: 'FAILED' },
  { label: 'Bekleme',    value: 'COOLDOWN' },
  { label: 'Başlamamış', value: 'NOT_STARTED' },
];

// Rozet eşlemesi — tema uyumlu, dark modda çiftli renkler
const STATUS_BADGE: Record<
  CertificationStatus,
  { label: string; className: string }
> = {
  CERTIFIED:   { label: 'Sertifikalı',  className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300' },
  FAILED:      { label: 'Başarısız',    className: 'bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300' },
  COOLDOWN:    { label: 'Bekleme',      className: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300' },
  NOT_STARTED: { label: 'Başlamamış',   className: 'bg-muted text-muted-foreground' },
  IN_PROGRESS: { label: 'Devam ediyor', className: 'bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300' },
};

export default function CertResultsPage() {
  const api = useApiClient();
  const [status, setStatus] = useState<CertificationStatus | null>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery(
    () => adminApi.listCertResults(api, { status: status ?? undefined, page }),
    [status, page],
  );

  const handleTabChange = (newStatus: CertificationStatus | null) => {
    setStatus(newStatus);
    setPage(1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Başlık */}
      <div>
        <h1 className="text-2xl font-bold">Mentör Sertifika Sonuçları</h1>
        <p className="text-sm text-muted-foreground">
          Mentörlerin sertifikasyon durumlarını, skorlarını ve deneme sayılarını inceleyin.
        </p>
      </div>

      {/* Durum sekmeleri */}
      <div className="flex flex-wrap gap-1 rounded-lg bg-muted p-1 w-fit">
        {STATUS_TABS.map(({ label, value }) => (
          <button
            key={label}
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
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      )}

      {/* Hata */}
      {error && <AlertMessage type="error" message={error} />}

      {/* Boş durum */}
      {!isLoading && !error && data?.items.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-20 text-center">
          <p className="text-4xl">📜</p>
          <p className="mt-3 font-medium">Henüz sertifika kaydı yok</p>
        </div>
      )}

      {/* Tablo */}
      {!isLoading && data && data.items.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Mentör</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Durum</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Skor</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Deneme</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Tarih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.items.map((result) => {
                const badge = STATUS_BADGE[result.certificationStatus];
                const certifiedAt = result.certifiedAt
                  ? new Date(result.certifiedAt).toLocaleDateString('tr-TR')
                  : '—';

                return (
                  <tr key={result.userId} className="transition-colors hover:bg-muted/30">
                    {/* Mentör */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                          {result.fullName[0]?.toUpperCase()}
                        </div>
                        <span className="font-medium truncate max-w-[200px]">{result.fullName}</span>
                      </div>
                    </td>

                    {/* Durum rozeti */}
                    <td className="px-4 py-3">
                      <Badge className={cn('border-transparent', badge.className)}>
                        {badge.label}
                      </Badge>
                    </td>

                    {/* Skor */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      {result.certScore !== null ? (
                        <span className="font-medium">%{result.certScore}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>

                    {/* Deneme */}
                    <td className="px-4 py-3 text-muted-foreground">{result.certAttempts}</td>

                    {/* Tarih */}
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {certifiedAt}
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
