/**
 * F-04 (G1-23) — İçerik Güvenlik Politikası (CSP) tek kaynağı.
 *
 * Neden `.mjs`: `next.config.mjs` bu dosyayı build sırasında doğrudan içe aktarır (TS derlenmez);
 * birim testi de aynı fonksiyonu `@/lib/securityHeaders.mjs` üzerinden sınar.
 *
 * ── Neden REPORT-ONLY ────────────────────────────────────────────────────────────
 * Başlık `Content-Security-Policy-Report-Only` olarak gönderilir: tarayıcı HİÇBİR ŞEYİ
 * ENGELLEMEZ, yalnız ihlali konsola yazar. Amaç, siteyi bozmadan politikanın gerçek trafikte
 * neyi yakalayacağını görmek. Enforce'a (engelleyen `Content-Security-Policy`) geçiş, konsol
 * raporları izlendikten sonra `CSP_HEADER_NAME` değiştirilerek yapılır (PR açıklamasındaki adımlar).
 * ⚠️ Tarayıcılar report-only modunda `frame-ancestors`'u YOK SAYAR — tıklama tuzağı (clickjacking)
 * koruması ancak enforce'ta devreye girer.
 *
 * ── Kaynak kararları (koddan çıkarıldı) ─────────────────────────────────────────
 * - script: Next App Router sayfaya satır içi `<script>` (self.__next_f.push…) basar;
 *   `app/layout.tsx` tema betiği de satır içi. Nonce kullanmak TÜM sayfaları dinamik
 *   render'a zorlar → şimdilik `'unsafe-inline'`. `'unsafe-eval'` YALNIZ `next dev`'de
 *   (React Refresh ister); build/canlı politikada YOK.
 * - style: Tailwind derlenmiş CSS ('self') + next/font ve React `style={}` satır içi → `'unsafe-inline'`.
 * - font: `next/font/google` (Inter) fontu build'de indirip kendi origin'inden sunar → yalnız 'self'.
 *   Google Fonts'a çalışma zamanı isteği YOK.
 * - img: next/image `/_next/image` ('self') + ham `<img>` ile çizilen https kurum logoları
 *   (TenantSwitcher, marka önizleme) → `next.config.mjs` `images.remotePatterns` ile AYNI host listesi
 *   + backend origin (`/uploads` avatarları) + `data:`/`blob:`.
 * - connect: kendi origin + backend API (`NEXT_PUBLIC_API_URL`).
 * - form-action: tüm formlar JS `onSubmit` ile gönderilir; OAuth `window.location.assign` ile
 *   backend'e YÖNLENDİRME'dir (form gönderimi değil) → 'self' yeterli.
 */

/** Şu an gönderilen başlık adı. Enforce'a geçişte `Content-Security-Policy` yapılır. */
export const CSP_HEADER_NAME = 'Content-Security-Policy-Report-Only';

/** OAuth avatar hostları — `images.remotePatterns` ile paylaşılır (tek liste). */
export const DEFAULT_IMAGE_DOMAINS = [
  'avatars.githubusercontent.com', // GitHub OAuth avatar'ları
  'lh3.googleusercontent.com', // Google OAuth avatar'ları
  'media.licdn.com', // LinkedIn OAuth avatar'ları
];

/**
 * Varsayılan + `TENANT_IMAGE_DOMAINS` (virgüllü) görsel hostları, tekrarsız.
 * @param {string | undefined} tenantImageDomains
 * @returns {string[]}
 */
export function resolveImageDomains(tenantImageDomains) {
  const envDomains = tenantImageDomains
    ? tenantImageDomains.split(',').map((d) => d.trim()).filter(Boolean)
    : [];
  return [...new Set([...DEFAULT_IMAGE_DOMAINS, ...envDomains])];
}

/**
 * `NEXT_PUBLIC_API_URL`'den yalnız origin'i (şema+host+port) çıkarır; geçersizse null.
 * @param {string | undefined} apiUrl
 * @returns {string | null}
 */
export function apiOrigin(apiUrl) {
  if (!apiUrl) return null;
  try {
    return new URL(apiUrl).origin;
  } catch {
    return null;
  }
}

/**
 * CSP metnini üretir.
 * @param {{ apiUrl?: string, imageDomains?: string[], isDev?: boolean }} options
 * @returns {string}
 */
export function buildContentSecurityPolicy({ apiUrl, imageDomains = DEFAULT_IMAGE_DOMAINS, isDev = false } = {}) {
  const api = apiOrigin(apiUrl);
  const apiSources = api ? [api] : [];
  const imageHosts = imageDomains.map((host) => `https://${host}`);

  /** @type {Record<string, string[]>} */
  const directives = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", ...(isDev ? ["'unsafe-eval'"] : [])],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'blob:', ...apiSources, ...imageHosts],
    'font-src': ["'self'"],
    'connect-src': ["'self'", ...apiSources],
    'frame-src': ["'none'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
  };

  return Object.entries(directives)
    .map(([name, sources]) => `${name} ${[...new Set(sources)].join(' ')}`)
    .join('; ');
}

/**
 * `next.config.mjs` `headers()` için başlık listesi.
 * @param {{ apiUrl?: string, imageDomains?: string[], isDev?: boolean }} options
 * @returns {{ key: string, value: string }[]}
 */
export function buildSecurityHeaders(options = {}) {
  return [{ key: CSP_HEADER_NAME, value: buildContentSecurityPolicy(options) }];
}
