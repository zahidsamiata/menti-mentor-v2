/**
 * Erişilebilirlik (AJ-121, WCAG 1.4.3): paylaş düğmelerinin renkleri tek yerde.
 *
 * Neden: düğmeler marka rengini hem zemin tinti hem METİN olarak kullanıyordu. WhatsApp yeşili
 * `#25D366` beyaz zeminde 1.98:1, kendi `/10` tintinde 1.84:1; LinkedIn mavisi `#0A66C2` hover
 * tintinde (`/20`) 4.23:1, koyu temada ~3:1 — hepsi AA (4.5:1) altı.
 * Karar: marka rengi zemin tinti olarak kalır (düğme tanınır); metin açık temada markanın koyu
 * tonuna (WhatsApp `#075E54`, LinkedIn `#004182`), koyu temada `dark:` ile parlak/açık tona çekilir.
 * Oranlar `share-buttons-contrast.test.ts` içinde hesaplanır (boşta + hover, sayfa + kart zemini).
 */

export const WHATSAPP_SHARE_CLASS = 'bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#075E54] dark:text-[#25D366]';
export const LINKEDIN_SHARE_CLASS = 'bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#004182] dark:text-[#70B5F9]';

/** Tüm paylaş düğmesi renkleri — kontrast testi bu listeyi dolaşır; yeni düğme buraya eklenir. */
export const SHARE_BUTTON_CLASSES = {
  whatsapp: WHATSAPP_SHARE_CLASS,
  linkedin: LINKEDIN_SHARE_CLASS,
} as const;
