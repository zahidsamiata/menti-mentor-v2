// AN-27 — "Zaman önerisi" mesajı (KARAR-53 CEVAP ②④): menti NEDEN görüşmek istediğini + bir ZAMAN
// talep eder; mentör bunu sıradan mesajdan ayırt eder.
// Sınırlar backend `src/services/timeProposal.ts` TIME_PROPOSAL_CONFIG ile AYNI tutulur — sunucu
// asıl kapıdır (400 + Türkçe mesaj); buradaki kontrol yalnız kullanıcıyı erken uyarmak içindir.

export const TIME_PROPOSAL_KIND = 'TIME_PROPOSAL' as const;

export const TIME_PROPOSAL_LIMITS = {
  reasonMin: 10,
  reasonMax: 1000,
  maxDaysAhead: 180,
} as const;

const DAY_MS = 24 * 60 * 60 * 1000;

export const TIME_PROPOSAL_TEXT = {
  openButton: 'Zaman öner',
  formTitle: 'Mentörünüze bir görüşme zamanı önerin',
  reasonLabel: 'Neden görüşmek istiyorsunuz?',
  reasonPlaceholder: 'Görüşmede konuşmak istediğiniz konuyu kısaca anlatın…',
  dateLabel: 'Önerdiğiniz tarih ve saat',
  submit: 'Öneriyi gönder',
  hint: 'Öneriniz mesaj olarak gider; randevu kendiliğinden oluşmaz. Mentörünüz uygunluğuna göre yanıtlar.',
  cardTitle: 'Zaman önerisi',
  cardReasonLabel: 'Neden:',
  errReasonShort: `Neden görüşmek istediğinizi en az ${TIME_PROPOSAL_LIMITS.reasonMin} karakterle yazın.`,
  errDateMissing: 'Önerdiğiniz tarih ve saati seçin.',
  errDatePast: 'Önerilen zaman ileri bir tarih olmalıdır.',
  errDateTooFar: `Önerilen zaman en fazla ${TIME_PROPOSAL_LIMITS.maxDaysAhead} gün sonrası olabilir.`,
  sendFailed: 'Öneri gönderilemedi.',
} as const;

/** Form girdisini doğrular; hata yoksa null. `localDateTime` = <input type="datetime-local"> değeri. */
export function validateTimeProposal(reason: string, localDateTime: string, now: Date): string | null {
  if (reason.trim().length < TIME_PROPOSAL_LIMITS.reasonMin) return TIME_PROPOSAL_TEXT.errReasonShort;
  if (!localDateTime) return TIME_PROPOSAL_TEXT.errDateMissing;
  const t = new Date(localDateTime).getTime();
  if (Number.isNaN(t) || t <= now.getTime()) return TIME_PROPOSAL_TEXT.errDatePast;
  if (t > now.getTime() + TIME_PROPOSAL_LIMITS.maxDaysAhead * DAY_MS) return TIME_PROPOSAL_TEXT.errDateTooFar;
  return null;
}

/** <input type="datetime-local"> için yerel saatle 'YYYY-MM-DDTHH:mm' (min değeri). */
export function toLocalInputValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Kartta gösterilen tarih/saat: "3 Ekim 2026 Cumartesi 14:30". */
export function formatProposalTime(iso: string): string {
  return new Date(iso).toLocaleString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric', weekday: 'long', hour: '2-digit', minute: '2-digit',
  });
}
