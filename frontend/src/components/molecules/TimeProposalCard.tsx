import { CalendarClock } from 'lucide-react';
import { TIME_PROPOSAL_TEXT, formatProposalTime } from '@/lib/timeProposal';

// AN-27 — sohbette "zaman önerisi" mesajı sıradan balondan AYRI bir kartla gösterilir
// (KARAR-53: mentör bunu sıradan mesajdan ayırt edebilmeli).
export function TimeProposalCard({
  proposedStartAt,
  reason,
  timeLabel,
  mine,
}: {
  proposedStartAt: string;
  reason: string;
  timeLabel: string;
  mine: boolean;
}) {
  return (
    <article
      aria-label={TIME_PROPOSAL_TEXT.cardTitle}
      data-testid="time-proposal-card"
      className="max-w-[80%] rounded-2xl border-2 border-primary/40 bg-primary/5 px-4 py-3 text-sm text-foreground"
    >
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
        <CalendarClock className="h-4 w-4" aria-hidden="true" />
        {TIME_PROPOSAL_TEXT.cardTitle}
      </p>
      <p className="mt-1 text-base font-semibold">{formatProposalTime(proposedStartAt)}</p>
      <p className="mt-2 whitespace-pre-wrap break-words">
        <span className="font-medium">{TIME_PROPOSAL_TEXT.cardReasonLabel}</span> {reason}
      </p>
      <span className={`mt-1 block text-[10px] text-muted-foreground ${mine ? 'text-right' : ''}`}>{timeLabel}</span>
    </article>
  );
}
