'use client';

/**
 * Molecule: MergeTagDialog
 * Admin, bekleyen etiketi var olan bir etikete eşler.
 */

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface MergeTagDialogProps {
  open: boolean;
  tagValue: string;
  isLoading?: boolean;
  onConfirm: (targetTag: string) => void;
  onCancel: () => void;
}

export function MergeTagDialog({ open, tagValue, isLoading = false, onConfirm, onCancel }: MergeTagDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [target, setTarget] = useState('');

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) { el.showModal(); setTarget(''); } else el.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="rounded-2xl border border-border bg-card p-6 shadow-xl w-full max-w-sm backdrop:bg-black/50"
      onCancel={onCancel}
    >
      <h2 className="text-lg font-semibold">Etiket Birleştir</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        <strong>&quot;{tagValue}&quot;</strong> etiketi hangi mevcut etikete eşlensin?
      </p>
      <div className="mt-4 space-y-1.5">
        <Label htmlFor="target-tag">Hedef Etiket</Label>
        <Input
          id="target-tag"
          placeholder="ör: yapay-zeka"
          value={target}
          onChange={(e) => setTarget(e.target.value.trim().toLowerCase())}
        />
        <p className="text-xs text-muted-foreground">
          Bu etiket tüm kullanıcı profillerinde güncellenir.
        </p>
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>Vazgeç</Button>
        <Button onClick={() => target && onConfirm(target)} disabled={!target || isLoading}>
          {isLoading ? 'Birleştiriliyor…' : 'Birleştir'}
        </Button>
      </div>
    </dialog>
  );
}
