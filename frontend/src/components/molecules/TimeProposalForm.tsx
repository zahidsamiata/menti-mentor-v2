'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UI_TEXT } from '@/lib/uiText';
import {
  TIME_PROPOSAL_LIMITS,
  TIME_PROPOSAL_TEXT,
  toLocalInputValue,
  validateTimeProposal,
} from '@/lib/timeProposal';

// AN-27 — menti'nin mesaj kutusundaki "Zaman öner" formu: gerekçe + tarih/saat.
// Gönderim çağıranın `onSubmit`'i ile yapılır (mevcut mesaj ucu, kind=TIME_PROPOSAL); sunucu
// hatası (ör. geçmiş tarih) Türkçe mesajıyla burada gösterilir.
export function TimeProposalForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (reason: string, proposedStartAtIso: string) => Promise<string | null>;
  onCancel: () => void;
}) {
  const [reason, setReason] = useState('');
  const [when, setWhen] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    const problem = validateTimeProposal(reason, when, new Date());
    if (problem) {
      setError(problem);
      return;
    }
    setSending(true);
    setError(null);
    const serverError = await onSubmit(reason.trim(), new Date(when).toISOString());
    setSending(false);
    if (serverError) setError(serverError);
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="mb-3 space-y-2 rounded-xl border border-primary/40 bg-primary/5 p-3">
      <p className="text-sm font-semibold">{TIME_PROPOSAL_TEXT.formTitle}</p>
      <label className="block text-xs font-medium" htmlFor="time-proposal-reason">
        {TIME_PROPOSAL_TEXT.reasonLabel}
      </label>
      <textarea
        id="time-proposal-reason"
        className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        rows={2}
        maxLength={TIME_PROPOSAL_LIMITS.reasonMax}
        placeholder={TIME_PROPOSAL_TEXT.reasonPlaceholder}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <label className="block text-xs font-medium" htmlFor="time-proposal-when">
        {TIME_PROPOSAL_TEXT.dateLabel}
      </label>
      <input
        id="time-proposal-when"
        type="datetime-local"
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        min={toLocalInputValue(new Date())}
        value={when}
        onChange={(e) => setWhen(e.target.value)}
      />
      <p className="text-xs text-muted-foreground">{TIME_PROPOSAL_TEXT.hint}</p>
      {error && <p className="text-xs text-destructive" role="alert">{error}</p>}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={sending}>
          {UI_TEXT.actions.cancel}
        </Button>
        <Button type="submit" disabled={sending}>
          {sending ? UI_TEXT.status.sending : TIME_PROPOSAL_TEXT.submit}
        </Button>
      </div>
    </form>
  );
}
