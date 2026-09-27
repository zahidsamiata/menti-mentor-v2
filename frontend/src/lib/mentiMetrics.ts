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

/**
 * P-02 — "Gönderilen Talepler" kalıcı sayısı.
 * Menti başlattığı her konuşma bir taleptir; kalıcı konuşma sahiplerini oturum-içi yeni
 * gönderilen mentör id'leriyle BİRLEŞTİRİR (mükerrer sayım yok). Böylece sayfa yenilenince
 * (oturum state'i sıfırlanınca) sayı 0'a düşmez.
 *
 * AJ-42 — konuşma listesi sayfalıdır (F-27: varsayılan 30 kayıt), yüklenen liste uzunluğu
 * gerçek sayıyı vermez. Sunucunun döndürdüğü `totalConversations` yüklenen sayfadan
 * büyükse (liste kırpılmış) sayı `total` üzerinden hesaplanır; oturum-içi gönderilenlerden
 * yalnız yüklenen sayfada görünmeyenler eklenir.
 */
export function countSentRequests(
  conversationCounterpartIds: readonly (string | null | undefined)[],
  sessionSentMentorIds: ReadonlySet<string>,
  totalConversations?: number,
): number {
  const loaded = new Set<string>();
  for (const id of conversationCounterpartIds) {
    if (id) loaded.add(id);
  }
  const contacted = new Set<string>([...loaded, ...sessionSentMentorIds]);
  const isTruncated =
    typeof totalConversations === 'number' && totalConversations > conversationCounterpartIds.length;
  if (!isTruncated) return contacted.size;
  const sessionOnly = [...sessionSentMentorIds].filter((id) => !loaded.has(id)).length;
  return totalConversations + sessionOnly;
}
