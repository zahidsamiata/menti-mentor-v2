'use client';

/**
 * Molecule: CorrectionNoteDialog
 *
 * Admin, PENDING kullanıcıya düzeltme talebi gönderirken bir not seçer
 * veya özel not yazar. Önceden tanımlı şablonlar hızlı seçim sağlar.
 */

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CORRECTION_NOTE_PRESETS } from '@/types/admin';
import { cn } from '@/lib/utils';

interface CorrectionNoteDialogProps {
  open: boolean;
  userName: string;
  isLoading?: boolean;
  onConfirm: (note: string) => void;
  onCancel: () => void;
}

export function CorrectionNoteDialog({
  open, userName, isLoading = false, onConfirm, onCancel,
}: CorrectionNoteDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [custom, setCustom] = useState('');

  const activeNote = custom.trim() || selected;

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) { el.showModal(); setSelected(null); setCustom(''); }
    else el.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="rounded-2xl border border-border bg-card p-6 shadow-xl w-full max-w-md backdrop:bg-black/50"
      onCancel={onCancel}
    >
      <h2 className="text-lg font-semibold">Düzeltme Talebi</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        <strong>{userName}</strong> için düzeltme notu seçin veya yazın.
      </p>

      {/* Hızlı seçim şablonları */}
      <div className="mt-4 space-y-2">
        <Label className="text-xs text-muted-foreground uppercase tracking-wide">Hazır Şablonlar</Label>
        {CORRECTION_NOTE_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => { setSelected(preset); setCustom(''); }}
            className={cn(
              'w-full rounded-lg border p-3 text-left text-sm transition-all',
              selected === preset && !custom
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border hover:border-primary/40',
            )}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Özel not */}
      <div className="mt-4 space-y-1.5">
        <Label htmlFor="custom-note">Özel Not (opsiyonel)</Label>
        <Input
          id="custom-note"
          placeholder="Özel mesajınızı yazın…"
          value={custom}
          onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
        />
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>Vazgeç</Button>
        <Button
          onClick={() => activeNote && onConfirm(activeNote)}
          disabled={!activeNote || isLoading}
        >
          {isLoading ? 'Gönderiliyor…' : 'Düzeltme Gönder'}
        </Button>
      </div>
    </dialog>
  );
}
