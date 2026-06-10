'use client';

/**
 * Taxonomy & Etiket Yönetimi Sayfası
 *
 * Veri akışı:
 *  useApiClient → adminApi.listPendingTags() → useQuery → PendingTagCard[]
 *
 * Her kart bağımsız aksiyon state'i taşır.
 * Tab'lar PENDING / APPROVED / MERGED / REJECTED durumlarını filtreler.
 */

import { useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { adminApi } from '@/lib/api/admin';
import { PendingTagCard } from '@/components/organisms/PendingTagCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import type { PendingTagStatus } from '@/types/admin';
import { cn } from '@/lib/utils';

const STATUS_TABS: { label: string; value: PendingTagStatus }[] = [
  { label: 'Bekleyen',       value: 'PENDING' },
  { label: 'Onaylananlar',   value: 'APPROVED' },
  { label: 'Birleştirilenler', value: 'MERGED' },
  { label: 'Reddedilenler',  value: 'REJECTED' },
];

export default function TagsPage() {
  const api = useApiClient();
  const [status, setStatus] = useState<PendingTagStatus>('PENDING');
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch } = useQuery(
    () => adminApi.listPendingTags(api, page),
    [status, page],
    { enabled: true },
  );

  const handleTabChange = (newStatus: PendingTagStatus) => {
    setStatus(newStatus);
    setPage(1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Başlık */}
      <div>
        <h1 className="text-2xl font-bold">Etiket Yönetimi</h1>
        <p className="text-sm text-muted-foreground">
          Kullanıcıların önerdiği özel etiketleri inceleyin: onaylayın, birleştirin veya reddedin.
        </p>
      </div>

      {/* Durum sekmeleri */}
      <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit">
        {STATUS_TABS.map(({ label, value }) => (
          <button
            key={value}
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
            <div key={i} className="h-14 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      )}

      {/* Hata */}
      {error && <AlertMessage type="error" message={error} />}

      {/* Boş durum */}
      {!isLoading && data?.items.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-12 text-center">
          <p className="text-2xl">🏷️</p>
          <p className="mt-2 font-medium">Bu kategoride etiket yok</p>
        </div>
      )}

      {/* Etiket kartları */}
      {data && data.items.length > 0 && (
        <div className="space-y-2">
          {/* Sadece PENDING olanlar için aksiyon kartı; diğerleri sadece bilgi */}
          {data.items.map((tag) =>
            status === 'PENDING' ? (
              <PendingTagCard key={tag.id} tag={tag} onActionComplete={refetch} />
            ) : (
              <div key={tag.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                <Badge variant="outline" className="font-mono">#{tag.value}</Badge>
                {tag.mergedInto && (
                  <span className="text-xs text-muted-foreground">→ {tag.mergedInto}</span>
                )}
                <Badge
                  variant={tag.status === 'APPROVED' ? 'success' : tag.status === 'MERGED' ? 'secondary' : 'outline'}
                >
                  {tag.status}
                </Badge>
              </div>
            )
          )}
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
