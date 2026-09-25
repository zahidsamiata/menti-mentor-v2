import type { Metadata } from 'next';

/**
 * Y-08 — Oturum gerektiren alanlar arama motoru dizinine GİRMEZ.
 *
 * Neden ayrıca gerekli: `app/robots.ts` disallow yalnız bir TARAMA önerisidir; başka sitelerden
 * bağlantı verilen bir URL taranmadan da dizine eklenebilir. Dizinden kesin çıkarmanın yolu
 * sayfanın kendisinde `<meta name="robots" content="noindex, nofollow">` olmasıdır.
 *
 * Tek kaynak: özel alan layout'ları bu sabiti kullanır. Herkese açık sayfalar (ana sayfa,
 * metodoloji, giriş/kayıt, yasal sayfalar) bunu KULLANMAZ — dizinde kalmaları istenir.
 */
export const PRIVATE_AREA_METADATA: Metadata = {
  robots: { index: false, follow: false },
};
