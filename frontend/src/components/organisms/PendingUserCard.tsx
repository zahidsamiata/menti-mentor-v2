'use client';

/**
 * Organism: PendingUserCard
 *
 * Onay bekleyen her kullanıcı için bağımsız kart.
 * 3 aksiyon:
 *  - Onayla: tek tıkla (onay diyaloğu yok — hızlı akış)
 *  - Düzeltme İste: not seçimi + gönder
 *  - Reddet: yıkıcı işlem — onay diyaloğu gösterilir
 *
 * Tasarım kararı: Her kart kendi aksiyon state'ini yönetir.
 * Liste bileşeni sadece onSuccess'te refetch yapar; optimistik güncelleme yok
 * (veri tutarlılığı backend'e bırakılır).
 */

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';
import { CorrectionNoteDialog } from '@/components/molecules/CorrectionNoteDialog';
import { useMutation } from '@/hooks/useMutation';
import { useApiClient } from '@/hooks/useApiClient';
import { adminApi } from '@/lib/api/admin';
import type { AdminUser } from '@/types/admin';

interface PendingUserCardProps {
  user: AdminUser;
  onActionComplete: () => void;
}

type DialogState = 'none' | 'reject' | 'correction';

export function PendingUserCard({ user, onActionComplete }: PendingUserCardProps) {
  const api = useApiClient();
  const [dialog, setDialog] = useState<DialogState>('none');
  const [actionError, setActionError] = useState<string | null>(null);

  // Onayla
  const approve = useMutation(
    () => adminApi.approveUser(api, user.id),
    { onSuccess: onActionComplete, onError: setActionError },
  );

  // Reddet
  const reject = useMutation(
    () => adminApi.rejectUser(api, user.id),
    { onSuccess: () => { setDialog('none'); onActionComplete(); }, onError: (e) => { setActionError(e); setDialog('none'); } },
  );

  // Düzeltme talebi
  const correction = useMutation(
    (note: string) => adminApi.requestCorrection(api, user.id, note),
    { onSuccess: () => { setDialog('none'); onActionComplete(); }, onError: (e) => { setActionError(e); setDialog('none'); } },
  );

  const anyLoading = approve.isLoading || reject.isLoading || correction.isLoading;
  const registeredAt = new Date(user.createdAt).toLocaleDateString('tr-TR');

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-5">
          {/* Başlık satırı */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                {user.fullName[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-medium truncate">{user.fullName}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <Badge variant={user.role === 'MENTOR' ? 'brand' : 'secondary'} className="shrink-0">
              {user.role}
            </Badge>
          </div>

          {/* Doğrulama detayları */}
          <div className="mt-4 rounded-lg bg-muted/50 p-3 space-y-1.5 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Kayıt tarihi</span>
              <span className="font-medium text-foreground">{registeredAt}</span>
            </div>
            {user.sectorTags.length > 0 && (
              <div className="flex justify-between">
                <span>Sektörler</span>
                <span className="font-medium text-foreground text-right max-w-[60%]">
                  {user.sectorTags.slice(0, 3).join(', ')}
                  {user.sectorTags.length > 3 && ` +${user.sectorTags.length - 3}`}
                </span>
              </div>
            )}
            {user.skills.length > 0 && (
              <div className="flex justify-between">
                <span>Beceriler</span>
                <span className="font-medium text-foreground text-right max-w-[60%]">
                  {user.skills.slice(0, 3).join(', ')}
                </span>
              </div>
            )}
          </div>

          {actionError && (
            <AlertMessage type="error" message={actionError} className="mt-3" />
          )}

          {/* Aksiyon düğmeleri */}
          <div className="mt-4 flex gap-2">
            <Button
              size="sm"
              className="flex-1"
              onClick={() => approve.mutate(undefined as never)}
              disabled={anyLoading}
            >
              {approve.isLoading ? '…' : '✓ Onayla'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={() => setDialog('correction')}
              disabled={anyLoading}
            >
              ✎ Düzelt
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-destructive border-destructive/40 hover:bg-destructive/10"
              onClick={() => setDialog('reject')}
              disabled={anyLoading}
            >
              ✕
            </Button>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={dialog === 'reject'}
        title="Kullanıcıyı Reddet"
        description={`${user.fullName} adlı kullanıcı reddedilecek ve eşleşme havuzuna alınmayacak.`}
        confirmLabel="Reddet"
        variant="danger"
        isLoading={reject.isLoading}
        onConfirm={() => reject.mutate(undefined as never)}
        onCancel={() => setDialog('none')}
      />

      <CorrectionNoteDialog
        open={dialog === 'correction'}
        userName={user.fullName}
        isLoading={correction.isLoading}
        onConfirm={(note) => correction.mutate(note)}
        onCancel={() => setDialog('none')}
      />
    </>
  );
}
