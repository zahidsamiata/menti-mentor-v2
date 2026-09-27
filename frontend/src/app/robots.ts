import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/siteUrl';

/**
 * F-29 — Arama motorlarına sitemap'in yeri.
 *
 * AJ-47 — Özel alanlar burada Disallow EDİLMEZ. Disallow edilen yolu tarayıcı açmadığı için
 * sayfadaki `noindex`'i göremez; adres başka yerden bağlantı alırsa yine dizine girebilir.
 * Özel alanlar dizin dışında `noindex` ile tutulur (`lib/privateAreaMetadata.ts`,
 * denetim: `lib/publicRoutes.ts` → `findPrivatePagesWithoutNoindex`).
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
