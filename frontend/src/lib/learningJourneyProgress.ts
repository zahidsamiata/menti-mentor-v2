/**
 * P-08 — Öğrenme Yolculuğu kalıcı ilerleme yardımcıları (saf, test edilebilir).
 *
 * Backend geçilen aşamaları id olarak tutar (`GET /api/learning-journey/status` →
 * `completedStageIds`, `nextStage`). Yönetici aşamaları yeniden sıralayabildiği için
 * kaldığı yer indeksle değil id ile bulunur.
 */

import type { JourneyStatus } from '@/lib/api/learningJourney';

/**
 * Yolculuk sayfası hangi aşamadan açılsın?
 *  - Durum yok (yüklenemedi) ya da yolculuk zaten tamamlandı (tekrar bakıyor) → baştan (0).
 *  - Aksi halde ilk geçilmemiş aşama; hepsi geçildiyse `stageIds.length` (kapanış ekranı).
 */
export function resumeStageIndex(stageIds: readonly string[], status: JourneyStatus | null | undefined): number {
  if (!status || status.completed) return 0;
  const done = new Set(status.completedStageIds ?? []);
  const idx = stageIds.findIndex((id) => !done.has(id));
  return idx === -1 ? stageIds.length : idx;
}

/**
 * Panel kartındaki "neredeyim" satırı. Başlamamış ya da tamamlamışsa null
 * (kart kendi başla/tamamlandı metnini gösterir).
 */
export function journeyProgressLine(status: JourneyStatus | null | undefined): string | null {
  if (!status || status.completed) return null;
  const done = status.completedStages ?? 0;
  const total = status.totalStages;
  if (done <= 0 || total <= 0) return null;
  if (!status.nextStage) return `${total} aşamanın hepsini gördün · kapanışı görmek için yolculuğa dön.`;
  return `Aşama ${status.nextStage.index + 1}/${total} · sıradaki: ${status.nextStage.title}`;
}
