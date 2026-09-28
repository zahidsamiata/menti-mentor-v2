/**
 * AJ-70 (madde 141 · PO ek önlemi 2) — karakter kartı açılmadan önceki kısa geçiş.
 *
 * Üç soru (form) ile kart (ödül anı) arasına kısa bir ayırıcı ekran konur; böylece kart
 * formun devamı gibi değil, ayrı bir an olarak açılır. Süre bilinçli olarak kısadır:
 * kullanıcıyı bekletmek değil, iki ekranı birbirinden ayırmak amaçlanır.
 * `prefers-reduced-motion: reduce` açıksa geçiş atlanır, kart hemen açılır.
 */
export const CARD_REVEAL_DELAY_MS = 900;

/** Geçiş ekranında gösterilen ve ekran okuyucuya duyurulan durum metni (madde 141 cümlesinden). */
export const CARD_REVEAL_STATUS_TEXT = 'Karakter kartın hazır.';
