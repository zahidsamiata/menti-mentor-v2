'use client';

import { useState, useCallback } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { adminApi } from '@/lib/api/admin';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';
import { CoachingSuggestionsDialog } from '@/components/organisms/CoachingSuggestionsDialog';
import type { AdminUser } from '@/types/admin';

const DISC_COLORS: Record<string, string> = {
  D: 'text-red-500', I: 'text-yellow-500', S: 'text-green-500', C: 'text-blue-500',
};

export default function WaitingRoomPage() {
  const api = useApiClient();

  const { data, isLoading, error, refetch } = useQuery(
    () => adminApi.listPendingUsers(api),
    [api],
  );

  const [actionError, setActionError] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [rejectTarget, setRejectTarget] = useState<AdminUser | null>(null);
  const [suggestionsTarget, setSuggestionsTarget] = useState<AdminUser | null>(null);

  const handleAction = useCallback(
    async (userId: string, status: 'APPROVED' | 'REJECTED') => {
      setLoadingId(userId);
      setActionError(null);
      const result = await adminApi.updateUserStatus(api, userId, status);
      setLoadingId(null);
      if (result.ok) {
        refetch();
      } else {
        setActionError(result.error.message ?? 'İşlem başarısız.');
      }
    },
    [api, refetch],
  );

  const pendingCount = data?.total ?? 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bekleme Odası</h1>
          <p className="text-sm text-muted-foreground">
            DISC testini tamamlayan ve onay bekleyen kullanıcılar.
          </p>
        </div>
        {!isLoading && (
          <Badge variant={pendingCount > 0 ? 'warning' : 'success'} className="text-sm px-3 py-1">
            {pendingCount > 0 ? `${pendingCount} bekliyor` : 'Kuyruk boş'}
          </Badge>
        )}
      </div>

      {actionError && (
        <AlertMessage type="error" message={actionError} />
      )}

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
      {!isLoading && !error && pendingCount === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-20 text-center">
          <p className="text-4xl">✅</p>
          <p className="mt-3 font-medium">Bekleme odası boş</p>
          <p className="text-sm text-muted-foreground mt-1">
            Onay bekleyen kullanıcı yok.
          </p>
        </div>
      )}

      {/* Tablo */}
      {!isLoading && data && data.items.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Kullanıcı</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Rol</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">DISC</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Sektörler</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Kayıt</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.items.map((user) => {
                const isProcessing = loadingId === user.id;
                const registeredAt = new Date(user.createdAt).toLocaleDateString('tr-TR');

                return (
                  <tr
                    key={user.id}
                    className={`transition-colors ${isProcessing ? 'opacity-50' : 'hover:bg-muted/30'}`}
                  >
                    {/* Kullanıcı */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                          {user.fullName[0]?.toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate max-w-[160px]">{user.fullName}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[160px]">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Rol */}
                    <td className="px-4 py-3">
                      <Badge variant={user.role === 'MENTOR' ? 'brand' : 'secondary'} className="text-xs">
                        {user.role}
                      </Badge>
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
                      {(user.sectorTags ?? []).length > 0 ? (
                        <span className="text-xs text-muted-foreground">
                          {(user.sectorTags ?? []).slice(0, 2).join(', ')}
                          {(user.sectorTags ?? []).length > 2 && ` +${(user.sectorTags ?? []).length - 2}`}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>

                    {/* Kayıt tarihi */}
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {registeredAt}
                    </td>

                    {/* İşlemler */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          disabled={isProcessing}
                          onClick={() => setSuggestionsTarget(user)}
                        >
                          Öneriler
                        </Button>
                        <Button
                          size="sm"
                          disabled={isProcessing}
                          onClick={() => handleAction(user.id, 'APPROVED')}
                        >
                          {isProcessing ? '…' : 'Onayla'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive border-destructive/40 hover:bg-destructive/10"
                          disabled={isProcessing}
                          onClick={() => setRejectTarget(user)}
                        >
                          Reddet
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Koçluk Önerileri Diyaloğu */}
      {suggestionsTarget && (
        <CoachingSuggestionsDialog
          userId={suggestionsTarget.id}
          userName={suggestionsTarget.fullName}
          open={suggestionsTarget !== null}
          onClose={() => setSuggestionsTarget(null)}
        />
      )}

      {/* Ret onay diyaloğu */}
      <ConfirmDialog
        open={rejectTarget !== null}
        title="Kullanıcıyı Reddet"
        description={
          rejectTarget
            ? `${rejectTarget.fullName} adlı kullanıcı reddedilecek ve eşleşme havuzuna alınmayacak.`
            : ''
        }
        confirmLabel="Reddet"
        variant="danger"
        isLoading={loadingId === rejectTarget?.id}
        onConfirm={() => {
          if (rejectTarget) {
            void handleAction(rejectTarget.id, 'REJECTED').then(() => setRejectTarget(null));
          }
        }}
        onCancel={() => setRejectTarget(null)}
      />
    </div>
  );
}
