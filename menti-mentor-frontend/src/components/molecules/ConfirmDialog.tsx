'use client';

/**
 * Molecule: ConfirmDialog — Yıkıcı işlemler için onay modalı.
 * Radix Dialog yerine native <dialog> kullanılır; dış bağımlılık eklenmez.
 */

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'default';
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open, title, description,
  confirmLabel = 'Onayla', cancelLabel = 'Vazgeç',
  variant = 'default', isLoading = false,
  onConfirm, onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) el.showModal(); else el.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="rounded-2xl border border-border bg-card p-6 shadow-xl w-full max-w-sm backdrop:bg-black/50"
      onCancel={onCancel}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          {cancelLabel}
        </Button>
        <Button
          variant={variant === 'danger' ? 'destructive' : 'default'}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? 'İşleniyor…' : confirmLabel}
        </Button>
      </div>
    </dialog>
  );
}
