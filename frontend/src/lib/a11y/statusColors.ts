/**
 * Erişilebilirlik (AJ-85 · AJ-110, WCAG 1.4.3): durum rozetlerinin (pill) renkleri tek yerde.
 *
 * Neden: platform tablolarındaki rozetler `bg-<renk>-900/60` zemin + `text-<renk>-600` metin taşıyordu.
 * Bu zemin açık temada beyazla karışınca orta-koyu bir tona döner; üstündeki renkli metin ~1.2–2:1'e
 * düşer — metni koyulaştırmak kontrastı DÜŞÜRÜR. Bu yüzden her durum için tek sınıf tanımlanır:
 * açık temada açık zemin + koyu metin (`<renk>-100` + `<renk>-800`), koyu temada eski koyu zemin
 * `dark:` önekiyle korunur, metin ise o zemin üstünde AA'yı geçen açık tona (`300`/`400`) çekilir.
 * Oranlar `emerald-contrast-guard.test.ts` içinde Tailwind paletinden hesaplanır (≥4.5:1).
 *
 * Metin/ikon için: yeşilin 600 tonu beyaz zeminde ~3.8:1 → açık zeminde `text-emerald-700` kullanılır.
 */

/** Olumlu durum (ör. "Aktif", "Var", onaylı kurum, tamamlanan görüşme). */
export const SUCCESS_PILL_CLASS = 'bg-emerald-100 text-emerald-800 dark:bg-green-900/60 dark:text-emerald-400';
/** Olumsuz durum (ör. "Pasif", "Dondurulmuş", iptal, ERROR log). */
export const DANGER_PILL_CLASS = 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300';
/** Bekleyen/uyarı durumu (ör. inceleme bekleyen kurum, beklemedeki görüşme, WARN log). */
export const WARNING_PILL_CLASS = 'bg-amber-100 text-amber-800 dark:bg-yellow-900/60 dark:text-amber-400';
/** Bilgi durumu (ör. planlanmış görüşme, Mentör rolü). */
export const INFO_PILL_CLASS = 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-400';
/** Denetim kaydı (AUDIT log) rozeti. */
export const AUDIT_PILL_CLASS = 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-400';

/** Tüm durum rozetleri — kontrast testi bu listeyi dolaşır; yeni rozet sınıfı buraya eklenir. */
export const STATUS_PILL_CLASSES = {
  success: SUCCESS_PILL_CLASS,
  danger: DANGER_PILL_CLASS,
  warning: WARNING_PILL_CLASS,
  info: INFO_PILL_CLASS,
  audit: AUDIT_PILL_CLASS,
} as const;
