import path from 'node:path';
import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/siteUrl';
import { discoverPublicPaths } from '@/lib/publicRoutes';

/**
 * F-29 / Y-13 — Yalnız herkese açık (kimlik gerektirmeyen) rotalar.
 *
 * Liste elle yazılmaz: `app/` dizini build sırasında taranır (kurallar: `lib/publicRoutes.ts`).
 * Yeni herkese açık sayfa eklenince sitemap'te kendiliğinden görünür. force-static: dosya
 * build'de üretilir; standalone çıktıda `src/` yoktur, çalışma anında tarama yapılmaz.
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPaths = discoverPublicPaths(path.join(process.cwd(), 'src', 'app'));
  // Tarama sessizce boş dönerse (yanlış çalışma dizini vb.) boş sitemap yayınlamak yerine build kırılsın.
  if (!publicPaths.includes('')) {
    throw new Error('sitemap: app dizini taranamadı — ana sayfa bulunamadı');
  }
  const base = getSiteUrl();
  return publicPaths.map((urlPath) => ({
    url: `${base}${urlPath}`,
    changeFrequency: 'monthly',
    priority: urlPath === '' ? 1 : 0.6,
  }));
}
