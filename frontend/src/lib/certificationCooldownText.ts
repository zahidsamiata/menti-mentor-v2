/**
 * Mentör sertifikası — bekleme (mola) metinleri ve kalan süre hesabı (AJ-37).
 *
 * NEDEN VAR: mola sırasında ekran "Kısa bir bekleme sonrası" diyordu, oysa mola 24 saat.
 * Mola bitişi artık backend'in döndürdüğü `cooldownUntil` anından okunur (kural ön yüzde
 * yeniden hesaplanmaz); kalan süre buradaki saf fonksiyonla metne çevrilir.
 * Akışa özgü metin olduğu için `UI_TEXT` yerine burada durur (uiText.ts KAPSAM notu).
 */

/** Mola hâlâ sürüyor mu? `cooldownUntil` yoksa ya da geçmişteyse hayır. */
export function isCooldownActive(cooldownUntil: string | null | undefined, now: number): boolean {
  if (!cooldownUntil) return false;
  const end = Date.parse(cooldownUntil);
  return Number.isFinite(end) && end > now;
}

/** Kalan süreyi "5 saat 12 dakika" biçimine çevirir (en az 1 dakika; dakika yukarı yuvarlanır). */
export function formatRemaining(cooldownUntil: string, now: number): string {
  const totalMinutes = Math.max(1, Math.ceil((Date.parse(cooldownUntil) - now) / 60_000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes} dakika`;
  if (minutes === 0) return `${hours} saat`;
  return `${hours} saat ${minutes} dakika`;
}

export const CERT_COOLDOWN_TEXT = {
  /** Sonuç ekranı: bu deneme molayı başlattı. */
  startedOnResult: (remaining: string) =>
    `Şimdi bir mola başlıyor; yaklaşık ${remaining} sonra yeniden deneyebilirsin. Bu arada konuları Öğrenme Yolculuğu'nda pekiştirebilirsin.`,
  /** Değerlendirme gönderildiğinde mola zaten sürüyordu (backend COOLDOWN_ACTIVE). */
  alreadyActive: (remaining: string) =>
    `Şimdilik bir mola verelim. Yaklaşık ${remaining} sonra yeniden deneyebilirsin — acele yok.`,
  /** Backend bitiş anını göndermediyse (beklenmez) süre uydurulmaz. */
  alreadyActiveUnknown: 'Şimdilik bir mola verelim. Mola bitince yeniden deneyebilirsin — acele yok.',
  /** Mola sürerken kapalı "Yeniden başla" düğmesinin yanındaki açıklama. */
  restartLocked: (remaining: string) => `Yeniden başla düğmesi ${remaining} sonra açılır.`,
} as const;
