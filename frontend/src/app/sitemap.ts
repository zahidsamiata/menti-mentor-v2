import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/siteUrl';

/**
 * F-29 — Yalnız herkese açık (kimlik gerektirmeyen) rotalar. Dashboard/admin/onboarding
 * gibi korumalı alanlar sitemap'e girmez. Token gerektiren reset-password de dışarıda.
 */
const PUBLIC_PATHS = [
  '',
  '/login',
  '/register',
  '/forgot-password',
  '/gizlilik',
  '/kvkk',
  '/terms',
  '/metodoloji',
  '/bildir',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return PUBLIC_PATHS.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.6,
  }));
}
