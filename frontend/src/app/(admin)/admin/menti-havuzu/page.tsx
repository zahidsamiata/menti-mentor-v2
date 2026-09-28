'use client';

/**
 * Menti Havuzu Sayfası
 *
 * Veri akışı:
 *  useApiClient → adminApi.listUsers({ role: 'MENTI', page }) → useQuery → AdminUser[]
 *
 * Kart ızgarası (admin KARAR 2, AJ-63 — kart: AdminPoolCard) + sayfalama. Eşleşme durumu burada
 * gösterilmez (yalınlık).
 */

import { useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { adminApi } from '@/lib/api/admin';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { AdminPoolCard } from '@/components/organisms/AdminPoolCard';
import { ADMIN_PAGE_DESCRIPTIONS } from '@/lib/adminPageDescriptions';

export default function MentiHavuzuPage() {
  const api = useApiClient();
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery(
    () => adminApi.listUsers(api, { role: 'MENTI', page }),
    [page],
    { cacheKey: `admin:users:MENTI:${page}` },
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Menti Havuzu</h1>
          <p className="text-sm text-muted-foreground">{ADMIN_PAGE_DESCRIPTIONS['menti-havuzu']}</p>
        </div>
        {!isLoading && data && (
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {data.total} menti
          </Badge>
        )}
      </div>

      {/* Hata */}
      {error && <AlertMessage type="error" message={error} />}

      {/* Yükleniyor */}
      {isLoading && (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      )}

      {/* Boş durum */}
      {!isLoading && !error && data?.items.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-20 text-center">
          <p className="text-4xl">👫</p>
          <p className="mt-3 font-medium">Henüz menti yok</p>
          <p className="text-sm text-muted-foreground mt-1">
            Onaylanan mentiler burada listelenir.
          </p>
        </div>
      )}

      {/* Kart ızgarası — admin KARAR 2 (AJ-63): mobilde 1, sm 2, xl 3 sütun. */}
      {!isLoading && data && data.items.length > 0 && (
        <ul role="list" aria-label="Menti listesi" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {data.items.map((user) => (
            <li key={user.id}>
              <AdminPoolCard user={user} variant="menti" />
            </li>
          ))}
        </ul>
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
