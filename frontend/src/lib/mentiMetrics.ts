import type { Meeting } from '@/lib/api/meetings';

/**
 * K-09 — Menti paneli metrikleri gerçek toplantı verisinden türetilir (hardcoded 0 yerine).
 * Saf fonksiyonlar → birim testi kolay, UI'dan bağımsız.
 */

// "Onaylanan eşleşme": mentörün ilişkiyi kabul ettiği (PENDING/CANCELLED dışı) durumlar.
// Aynı mentörle birden çok toplantı olsa da eşleşme tekil sayılır (distinct mentör).
const APPROVED_MATCH_STATUSES: ReadonlyArray<Meeting['status']> = [
  'APPROVED',
  'SCHEDULED',
  'IN_PROGRESS',
  'COMPLETED',
];

/** Tamamlanmış toplantı sayısı. */
export function countCompletedMeetings(meetings: readonly Meeting[]): number {
  return meetings.filter((m) => m.status === 'COMPLETED').length;
}

/** Onaylanan eşleşme = mentörün kabul ettiği ilişki kurulan tekil mentör sayısı. */
export function countApprovedMatchMentors(meetings: readonly Meeting[]): number {
  const mentors = new Set<string>();
  for (const m of meetings) {
    if (APPROVED_MATCH_STATUSES.includes(m.status)) mentors.add(m.mentorUserId);
  }
  return mentors.size;
}
