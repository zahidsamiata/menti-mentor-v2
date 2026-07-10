'use client';

/**
 * Organism: PendingTagCard
 *
 * Her bekleyen etiket için bağımsız kart.
 * 3 aksiyon: Onayla, Birleştir (hedef etiket gir), Reddet.
 */

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';
import { MergeTagDialog } from '@/components/molecules/MergeTagDialog';
import { useMutation } from '@/hooks/useMutation';
import { useApiClient } from '@/hooks/useApiClient';
import { adminApi } from '@/lib/api/admin';
import type { PendingTag } from '@/types/admin';

interface PendingTagCardProps {
  tag: PendingTag;
  onActionComplete: () => void;
}

type DialogState = 'none' | 'reject' | 'merge';

export function PendingTagCard({ tag, onActionComplete }: PendingTagCardProps) {
  const api = useApiClient();
  const [dialog, setDialog] = useState<DialogState>('none');
  const [actionError, setActionError] = useState<string | null>(null);

  const approve = useMutation(
    () => adminApi.approveTag(api, tag.id),
    { onSuccess: onActionComplete, onError: setActionError },
  );

  const reject = useMutation(
    () => adminApi.rejectTag(api, tag.id),
    { onSuccess: () => { setDialog('none'); onActionComplete(); }, onError: (e) => { setActionError(e); setDialog('none'); } },
  );

  const merge = useMutation(
    (targetTag: string) => adminApi.mergeTag(api, tag.id, targetTag),
    { onSuccess: () => { setDialog('none'); onActionComplete(); }, onError: (e) => { setActionError(e); setDialog('none'); } },
  );

  const anyLoading = approve.isLoading || reject.isLoading || merge.isLoading;
  const submittedAt = new Date(tag.createdAt).toLocaleDateString('tr-TR');

  return (
    <>
      <Card>
        <CardContent className="flex items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-3 min-w-0">
            <Badge variant="outline" className="font-mono text-xs shrink-0">
              #{tag.value}
            </Badge>
            <span className="text-xs text-muted-foreground shrink-0">{submittedAt}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {actionError && <span className="text-xs text-destructive mr-1">{actionError}</span>}
            <Button size="sm" onClick={() => approve.mutate(undefined as never)} disabled={anyLoading}>
              {approve.isLoading ? '…' : 'Onayla'}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setDialog('merge')} disabled={anyLoading}>
              Birleştir
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-destructive border-destructive/40 hover:bg-destructive/10"
              onClick={() => setDialog('reject')}
              disabled={anyLoading}
            >
              Reddet
            </Button>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={dialog === 'reject'}
        title="Etiketi Reddet"
        description={`"${tag.value}" etiketi sessizce reddedilecek. Kullanıcıya bildirim gönderilmez.`}
        confirmLabel="Reddet"
        variant="danger"
        isLoading={reject.isLoading}
        onConfirm={() => reject.mutate(undefined as never)}
        onCancel={() => setDialog('none')}
      />

      <MergeTagDialog
        open={dialog === 'merge'}
        tagValue={tag.value}
        isLoading={merge.isLoading}
        onConfirm={(targetTag) => merge.mutate(targetTag)}
        onCancel={() => setDialog('none')}
      />
    </>
  );
}
