'use client';

/**
 * Molecule: RejectReasonDialog
 *
 * Admin bir kullanıcıyı reddederken opsiyonel gerekçe yazar (İş 3 P1).
 * Gerekçe ≤500 karakter; ileride kullanıcıya gösterilebileceği için PII/hassas
 * bilgi yazılmaması uyarısı verilir. Yıkıcı işlem → net onay.
 */

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const MAX = 500;

interface RejectReasonDialogProps {
  open: boolean;
  userName: string;
  isLoading?: boolean;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}

export function RejectReasonDialog({
  open, userName, isLoading = false, onConfirm, onCancel,
}: RejectReasonDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [reason, setReason] = useState('');

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) { el.showModal(); setReason(''); }
    else el.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="rounded-2xl border border-border bg-card p-6 shadow-xl w-full max-w-md backdrop:bg-black/50"
      onCancel={onCancel}
    >
      <h2 className="text-lg font-semibold">Kullanıcıyı Reddet</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        <strong>{userName}</strong> reddedilecek ve eşleşme havuzuna alınmayacak.
      </p>

      <div className="mt-4 space-y-1.5">
        <Label htmlFor="reject-reason">Gerekçe (opsiyonel)</Label>
        <textarea
          id="reject-reason"
          rows={3}
          maxLength={MAX}
          className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Red gerekçesini yazın (ör. bilgiler eksik/hatalı)…"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>⚠️ Bu gerekçe ileride kullanıcıya gösterilebilir — kişisel/hassas bilgi yazmayın.</span>
          <span>{reason.length}/{MAX}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>Vazgeç</Button>
        <Button
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          onClick={() => onConfirm(reason)}
          disabled={isLoading}
        >
          {isLoading ? 'Reddediliyor…' : 'Reddet'}
        </Button>
      </div>
    </dialog>
  );
}
