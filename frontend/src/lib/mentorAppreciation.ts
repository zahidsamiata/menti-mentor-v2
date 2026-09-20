/**
 * P-14 — mentöre takdir/teşekkür cümlesi.
 *
 * Mentör paneli "kendi etkim" tamamen sayısaldı; emeği anlatan tek cümle yoktu. Bu saf fonksiyon,
 * mentörün aktif menti + tamamlanan görüşme sayısına göre emeğini anlatan bir cümle üretir.
 * UI'dan bağımsız → birim testi kolay.
 */

export interface MentorEffort {
  activeMentis: number | null;
  completedMeetings: number | null;
}

export function mentorAppreciation(m: MentorEffort | null): string {
  const active = m?.activeMentis ?? 0;
  const completed = m?.completedMeetings ?? 0;

  if (completed === 0 && active === 0) {
    return 'İlk mentin eşleştiğinde etkin burada büyümeye başlayacak. İyi ki buradasın.';
  }
  if (completed === 0) {
    return `${active} menti sana emanet — ilk görüşmen bir kişinin yolunu değiştirebilir.`;
  }
  const who = active > 0 ? `${active} mentiye` : 'mentilerine';
  return `Bugüne kadar ${completed} görüşmede ${who} yol gösterdin. Bu emek çoğu zaman görünmez ama karşılığı büyük — teşekkürler.`;
}
