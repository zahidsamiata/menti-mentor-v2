'use client';

/**
 * Kullanıcı şikayet butonu + basit modal. Bir üyeyi (mentör/menti) şikayet eder.
 * POST /api/users/:id/report — neden + opsiyonel açıklama. Asıl doğrulama/spam engeli backend'de.
 */

import { useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const REASONS = [
  { key: 'SPAM', label: 'Spam / istenmeyen içerik' },
  { key: 'HARASSMENT', label: 'Taciz / rahatsız edici davranış' },
  { key: 'INAPPROPRIATE', label: 'Uygunsuz içerik / profil' },
  { key: 'NO_SHOW', label: 'Görüşmeye gelmedi' },
  { key: 'OTHER', label: 'Diğer' },
] as const;

type SubmitState = 'idle' | 'sending' | 'sent' | { error: string };

export function ReportUserButton({ targetUserId, targetName }: { targetUserId: string; targetName: string }) {
  const api = useApiClient();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<string>('SPAM');
  const [description, setDescription] = useState('');
  const [state, setState] = useState<SubmitState>('idle');

  const submit = async () => {
    setState('sending');
    const res = await api<{ ok: boolean }>(`/api/users/${targetUserId}/report`, {
      method: 'POST',
      body: { reason, description: description.trim() || undefined },
    });
    setState(res.ok ? 'sent' : { error: res.error.message ?? 'Şikayet gönderilemedi.' });
  };

  const close = () => {
    setOpen(false);
    setState('idle');
    setDescription('');
    setReason('SPAM');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs text-muted-foreground hover:text-destructive transition-colors"
      >
        Şikayet et
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={close}>
          <div
            className="w-full max-w-md rounded-2xl border border-border bg-card p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="text-lg font-semibold text-foreground">Şikayet: {targetName}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Şikayetiniz yöneticiye iletilir. Kötüye kullanım ciddi değerlendirilir.</p>
            </div>

            {state === 'sent' ? (
              <div className="space-y-4">
                <p className="text-sm text-emerald-600 dark:text-emerald-400">Şikayetiniz alındı. Teşekkürler.</p>
                <Button onClick={close} className="w-full">Kapat</Button>
              </div>
            ) : (
              <>
                <div className="space-y-1.5">
                  {REASONS.map((r) => (
                    <label key={r.key} className={cn(
                      'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition-colors',
                      reason === r.key ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
                    )}>
                      <input type="radio" name="report-reason" value={r.key} checked={reason === r.key} onChange={() => setReason(r.key)} />
                      {r.label}
                    </label>
                  ))}
                </div>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={1000}
                  rows={3}
                  placeholder="Ek açıklama (opsiyonel)…"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                />

                {typeof state === 'object' && (
                  <p className="text-sm text-destructive" role="alert">{state.error}</p>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" onClick={close} className="flex-1">Vazgeç</Button>
                  <Button onClick={submit} disabled={state === 'sending'} className="flex-1">
                    {state === 'sending' ? 'Gönderiliyor…' : 'Şikayet Et'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
