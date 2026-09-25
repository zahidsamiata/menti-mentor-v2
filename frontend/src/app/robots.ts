import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/siteUrl';
import { ROBOTS_DISALLOW } from '@/lib/publicRoutes';

/**
 * F-29 — Arama motorlarına: korumalı/kişisel alanları taramayın; sitemap burada.
 * Y-13 — disallow listesi `lib/publicRoutes.ts`'te; sitemap aynı listeyi dışlar (tutarlılık).
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [...ROBOTS_DISALLOW],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
