/**
 * Landing "Teknik Eşleşme Skoru" demo hesabı (AlgorithmBento).
 *
 * Neden ayrı saf fonksiyon: eski satır-içi formül (`52 + n*4`) hiç etiket
 * seçilmediğinde de %52 gösteriyordu — "ortak alan yok ama yarıdan fazla
 * uyum" çelişkisi (AJ-86a). Kural: ortak etiket yoksa skor 0; her etiket
 * skoru artırır; demo hiçbir zaman %100 "kusursuz uyum" iddia etmez.
 * Yalnız görsel bir demodur — gerçek eşleştirme `backend/src/services/matching.ts`.
 */
export const BENTO_SCORE = {
  /** İlk ortak etiketle birlikte gelen taban puan. */
  BASE: 52,
  /** Her seçili etiketin katkısı. */
  PER_TAG: 4,
  /** Demo üst sınırı. */
  MAX: 97,
} as const;

export function bentoMatchScore(selectedCount: number): number {
  if (selectedCount <= 0) return 0;
  return Math.min(BENTO_SCORE.MAX, BENTO_SCORE.BASE + selectedCount * BENTO_SCORE.PER_TAG);
}
