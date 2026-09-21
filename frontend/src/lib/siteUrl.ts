/**
 * F-29 — Kanonik site kök URL'i (SEO: sitemap, robots, metadataBase için tek kaynak).
 *
 * Prod'da `NEXT_PUBLIC_SITE_URL` set edilir (örn. https://app.example.com). Set değilse
 * dev fallback kullanılır. Sondaki slash'lar temizlenir ki `${base}${path}` mükerrer "/"
 * üretmesin.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const base = raw && raw.length > 0 ? raw : 'http://localhost:3001';
  return base.replace(/\/+$/, '');
}
