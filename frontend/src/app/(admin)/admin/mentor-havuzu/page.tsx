'use client';

/**
 * Mentör Havuzu Sayfası
 *
 * Veri akışı:
 *  useApiClient → adminApi.listUsers({ role: 'MENTOR', page }) → useQuery → AdminUser[]
 *
 * Salt-okunur liste + sayfalama. Aksiyon yok (onboarding onayı Bekleme Odası'nda).
 */

import { useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { adminApi } from '@/lib/api/admin';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { UserAvatar } from '@/components/atoms/UserAvatar';
import type { ApprovalStatus } from '@/types/auth';

// DISC arketipi için tema-uyumlu renkler (waiting-room ile aynı palet).
const DISC_COLORS: Record<string, string> = {
  D: 'text-red-500', I: 'text-yellow-500', S: 'text-green-500', C: 'text-blue-500',
};

const APPROVAL_META: Record<ApprovalStatus, { label: string; variant: 'success' | 'warning' | 'destructive' }> = {
  APPROVED: { label: 'Onaylı', variant: 'success' },
  PENDING:  { label: 'Bekliyor', variant: 'warning' },
  REJECTED: { label: 'Reddedildi', variant: 'destructive' },
};

export default function MentorHavuzuPage() {
  const api = useApiClient();
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery(
    () => adminApi.listUsers(api, { role: 'MENTOR', page }),
    [page],
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mentör Havuzu</h1>
          <p className="text-sm text-muted-foreground">
            Sisteme kayıtlı tüm mentörler ve onay durumları.
          </p>
        </div>
        {!isLoading && data && (
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {data.total} mentör
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
          <p className="text-4xl">👥</p>
          <p className="mt-3 font-medium">Henüz mentör yok</p>
          <p className="text-sm text-muted-foreground mt-1">
            Onaylanan mentörler burada listelenir.
          </p>
        </div>
      )}

      {/* Tablo */}
      {!isLoading && data && data.items.length > 0 && (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Ad</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">E-posta</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">DISC</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Sektörler</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Durum</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Kayıt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.items.map((user) => {
                  const sectorTags = user.sectorTags ?? [];
                  const approval = APPROVAL_META[user.approvalStatus];
                  const registeredAt = new Date(user.createdAt).toLocaleDateString('tr-TR');

                  return (
                    <tr key={user.id} className="transition-colors hover:bg-muted/30">
                      {/* Ad */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <UserAvatar src={user.avatarUrl} name={user.fullName} size={32} className="text-xs" />
                          <span className="font-medium truncate max-w-[180px]">{user.fullName}</span>
                        </div>
                      </td>

                      {/* E-posta */}
                      <td className="px-4 py-3 text-muted-foreground truncate max-w-[220px]">
                        {user.email}
                      </td>

                      {/* DISC */}
                      <td className="px-4 py-3">
                        {user.discType ? (
                          <span className={`font-bold ${DISC_COLORS[user.discType]}`}>
                            {user.discType}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>

                      {/* Sektörler */}
                      <td className="px-4 py-3 max-w-[200px]">
                        {sectorTags.length > 0 ? (
                          <span className="text-xs text-muted-foreground">
                            {sectorTags.slice(0, 2).join(', ')}
                            {sectorTags.length > 2 && ` +${sectorTags.length - 2}`}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>

                      {/* Durum */}
                      <td className="px-4 py-3">
                        <Badge variant={approval.variant} className="text-xs">
                          {approval.label}
                        </Badge>
                      </td>

                      {/* Kayıt */}
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {registeredAt}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
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
