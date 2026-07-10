'use client';

/**
 * Onboarding Onay Sayfası
 *
 * Veri akışı:
 *  useApiClient → adminApi.listUsers(PENDING) → useQuery → PendingUserCard[]
 *
 * Her aksiyon (approve/reject/correction) tamamlandığında refetch tetiklenir.
 * Sayfalandırma: basit ileri/geri navigasyon.
 */

import { useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { adminApi } from '@/lib/api/admin';
import { PendingUserCard } from '@/components/organisms/PendingUserCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertMessage } from '@/components/molecules/AlertMessage';

export default function ApprovalsPage() {
  const api = useApiClient();
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch } = useQuery(
    () => adminApi.listUsers(api, { approvalStatus: 'PENDING', page }),
    [page],
    { enabled: true },
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Onay Kuyruğu</h1>
          <p className="text-sm text-muted-foreground">
            Platforma katılmak isteyen kullanıcıları inceleyin.
          </p>
        </div>
        {data && (
          <Badge variant="warning" className="text-sm px-3 py-1">
            {data.total} bekliyor
          </Badge>
        )}
      </div>

      {/* Yükleniyor */}
      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-52 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      )}

      {/* Hata */}
      {error && <AlertMessage type="error" message={error} />}

      {/* Boş durum */}
      {!isLoading && data?.items.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-16 text-center">
          <p className="text-3xl">🎉</p>
          <p className="mt-2 font-medium">Onay kuyruğu boş</p>
          <p className="text-sm text-muted-foreground">Tüm kayıtlar işlendi.</p>
        </div>
      )}

      {/* Kullanıcı kartları */}
      {data && data.items.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((user) => (
            <PendingUserCard key={user.id} user={user} onActionComplete={refetch} />
          ))}
        </div>
      )}

      {/* Sayfalandırma */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border pt-4">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            ← Önceki
          </Button>
          <span className="text-sm text-muted-foreground">
            Sayfa {page} / {data.totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={page >= data.totalPages} onClick={() => setPage((p) => p + 1)}>
            Sonraki →
          </Button>
        </div>
      )}
    </div>
  );
}
