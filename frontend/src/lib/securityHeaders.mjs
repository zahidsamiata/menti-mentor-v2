/**
 * F-04 (G1-23) — İçerik Güvenlik Politikası (CSP) tek kaynağı.
 *
 * Neden `.mjs`: `next.config.mjs` bu dosyayı build sırasında doğrudan içe aktarır (TS derlenmez);
 * birim testi de aynı fonksiyonu `@/lib/securityHeaders.mjs` üzerinden sınar.
 *
 * ── Neden ZORUNLU (enforce) — AJ-22 ─────────────────────────────────────────────
 * Başlık `Content-Security-Policy` olarak gönderilir: politikaya uymayan kaynak tarayıcıda
 * ENGELLENİR. Önceki rapor modu (`...-Report-Only`) hiçbir şeyi engellemiyordu ve ihlal raporu
 * hiçbir yere toplanmıyordu (hazırlık: `docs/raporlar/kesif/csp-zorunlu-mod-hazirlik-2026-09-27.md`).
 * Geçişte script-src/style-src içeriği DEĞİŞMEDİ ('unsafe-inline' korunur) → Next.js satır içi
 * betikleri enforce'ta da çalışır; yeni engelleme yalnız dış kaynak listelerinde olur.
 * `frame-ancestors 'none'` artık etkindir (report-only'de tarayıcı bunu yok sayıyordu).
 * Acil geri dönüş: `CSP_HEADER_NAME`'i yeniden `Content-Security-Policy-Report-Only` yapmak.
 *
 * ── Kaynak kararları (koddan çıkarıldı) ─────────────────────────────────────────
 * - script: Next App Router sayfaya satır içi `<script>` (self.__next_f.push…) basar;
 *   `app/layout.tsx` tema betiği de satır içi. Nonce kullanmak TÜM sayfaları dinamik
 *   render'a zorlar → şimdilik `'unsafe-inline'`. `'unsafe-eval'` YALNIZ `next dev`'de
 *   (React Refresh ister); build/canlı politikada YOK.
 * - style: Tailwind derlenmiş CSS ('self') + next/font ve React `style={}` satır içi → `'unsafe-inline'`.
 * - font: `next/font/google` (Inter) fontu build'de indirip kendi origin'inden sunar → yalnız 'self'.
 *   Google Fonts'a çalışma zamanı isteği YOK.
 * - img: next/image `/_next/image` ('self') + backend origin (`/uploads` avatarları) + `data:`/`blob:`
 *   + ŞEMA düzeyinde `https:`. Neden host listesi değil: kurum logosu (`<img>`: TenantSwitcher,
 *   marka önizleme) kurumun kendi https CDN'inde olabilir ve alan adı kısıtlanmadı (AJ-05);
 *   host listesiyle enforce logoları sessizce kırardı. Kaynak denetimi backend yazma katmanındadır
 *   (`backend/src/services/logoUrl.ts`: yalnız https, IP/localhost/özel ağ/port/userinfo reddi,
 *   görsel uzantısı). `http:`/`javascript:`/diğer şemalar engellenir. Host listesine daraltmak
 *   ürün kararı ister (izinli görsel alan adları). `images.remotePatterns` (next/image) ayrı ve
 *   hâlâ host listesiyle (`resolveImageDomains`) sınırlıdır.
 * - connect: kendi origin + backend API (`NEXT_PUBLIC_API_URL`) + (DK-01) hata izleme servisinin
 *   olay alma adresi — yalnız `NEXT_PUBLIC_SENTRY_DSN` doluysa ve https ise (anahtarsız hiçbir şey eklenmez).
 * - form-action: tüm formlar JS `onSubmit` ile gönderilir; OAuth `window.location.assign` ile
 *   backend'e YÖNLENDİRME'dir (form gönderimi değil) → 'self' yeterli.
 * - F-05 (G1-26): Cloudflare Turnstile CAPTCHA widget'ı `challenges.cloudflare.com`'dan bir
 *   <script> yükler (script-src) ve kendi doğrulama arayüzünü bir <iframe> içinde render eder
 *   (frame-src). `NEXT_PUBLIC_TURNSTILE_SITE_KEY` tanımsızken widget hiç mount edilmez → bu
 *   kaynaklar rapor modunda dahi hiçbir isteğe yol açmaz; anahtar girilince aktifleşir.
 *
 * ── İhlal raporu — AJ-52 ─────────────────────────────────────────────────────────
 * Engellenen kaynak tarayıcıda sessizce kaybolmasın diye tarayıcı ihlali backend'e bildirir:
 * `report-uri <api-origin>/api/csp-reports` (eski yol; Firefox dahil yaygın destek) +
 * `report-to csp-endpoint` ve `Reporting-Endpoints` başlığı (Reporting API; destekleyen tarayıcı
 * `report-uri`'yi yok sayar → çift rapor olmaz). Uç public'tir, oran sınırlı ve PII'siz yazar
 * (`backend/src/services/cspReport.ts`). API origin'i bilinmiyorsa (NEXT_PUBLIC_API_URL yok/geçersiz)
 * rapor yönergesi EKLENMEZ: göreli adres ön yüzün kendisine gider, orada uç yok.
 */

/** Gönderilen başlık adı — engelleyen (enforce) mod. */
export const CSP_HEADER_NAME = 'Content-Security-Policy';

/** Backend'deki ihlal raporu ucunun yolu (`backend/src/server.ts`). */
export const CSP_REPORT_PATH = '/api/csp-reports';

/** `report-to` ve `Reporting-Endpoints` başlığındaki uç adı. */
export const CSP_REPORT_GROUP = 'csp-endpoint';

/** OAuth avatar hostları — `images.remotePatterns` (next/image) listesi. */
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
 * DK-01: Sentry DSN'inden (`https://<anahtar>@<host>/<proje>`) yalnız olay alma origin'ini çıkarır.
 * Anahtar (userinfo) origin'e girmez. https değilse ya da geçersizse null.
 * @param {string | undefined} dsn
 * @returns {string | null}
 */
export function errorMonitorOrigin(dsn) {
  if (!dsn || !dsn.trim()) return null;
  try {
    const u = new URL(dsn.trim());
    return u.protocol === 'https:' ? u.origin : null;
  } catch {
    return null;
  }
}

/**
 * CSP metnini üretir.
 * @param {{ apiUrl?: string, isDev?: boolean, errorMonitorDsn?: string }} options
 * @returns {string}
 */
export function buildContentSecurityPolicy({ apiUrl, isDev = false, errorMonitorDsn } = {}) {
  const api = apiOrigin(apiUrl);
  const apiSources = api ? [api] : [];
  const monitor = errorMonitorOrigin(errorMonitorDsn);

  /** @type {Record<string, string[]>} */
  const directives = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", 'https://challenges.cloudflare.com', ...(isDev ? ["'unsafe-eval'"] : [])],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'blob:', ...apiSources, 'https:'],
    'font-src': ["'self'"],
    'connect-src': ["'self'", ...apiSources, ...(monitor ? [monitor] : [])],
    'frame-src': ['https://challenges.cloudflare.com'],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    ...(api && {
      'report-uri': [`${api}${CSP_REPORT_PATH}`],
      'report-to': [CSP_REPORT_GROUP],
    }),
  };

  return Object.entries(directives)
    .map(([name, sources]) => `${name} ${[...new Set(sources)].join(' ')}`)
    .join('; ');
}

/**
 * `next.config.mjs` `headers()` için başlık listesi.
 * @param {{ apiUrl?: string, isDev?: boolean, errorMonitorDsn?: string }} options
 * @returns {{ key: string, value: string }[]}
 */
export function buildSecurityHeaders(options = {}) {
  const api = apiOrigin(options.apiUrl);
  return [
    { key: CSP_HEADER_NAME, value: buildContentSecurityPolicy(options) },
    ...(api ? [{ key: 'Reporting-Endpoints', value: `${CSP_REPORT_GROUP}="${api}${CSP_REPORT_PATH}"` }] : []),
  ];
}
