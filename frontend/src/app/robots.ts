import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/siteUrl';

/**
 * F-29 — Arama motorlarına: korumalı/kişisel alanları taramayın; sitemap burada.
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/admin', '/platform', '/onboarding', '/menti', '/mentor', '/messages'],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
