import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';
import { buildSecurityHeaders, resolveImageDomains } from './src/lib/securityHeaders.mjs';

/**
 * Faz fonksiyonu: `next dev`'de CSP'ye `'unsafe-eval'` eklenir (React Refresh ister);
 * build/canlı politikada YOKTUR. Ayrıntı: `src/lib/securityHeaders.mjs`.
 * @param {string} phase
 * @returns {import('next').NextConfig}
 */
const nextConfig = (phase) => ({
  /**
   * Standalone output: minimal server bundle, node_modules kopyalanmaz (~70% küçültme).
   */
  output: 'standalone',

  images: {
    /**
     * Tenant logo domain listesi — production'da CDN hostname'leri buraya eklenir.
     *
     * Güvenlik: Önceki `hostname: '**'` (wildcard) herhangi bir HTTPS kaynağından
     * görsel yüklemeye izin veriyordu; potansiyel SSRF vektörü.
     *
     * Yeni yaklaşım: İzin verilen domain'ler açık listede tanımlanır.
     * TENANT_IMAGE_DOMAINS ortam değişkeni ile runtime'da genişletilebilir.
     */
    remotePatterns: buildImagePatterns(),
  },

  /**
   * F-04 (G1-23) — İçerik Güvenlik Politikası, şimdilik YALNIZ RAPOR modunda
   * (`Content-Security-Policy-Report-Only`): hiçbir şeyi engellemez, ihlali konsola yazar.
   * Değerler build anında sabitlenir (NEXT_PUBLIC_API_URL / TENANT_IMAGE_DOMAINS build argümanı).
   */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: buildSecurityHeaders({
          apiUrl: process.env.NEXT_PUBLIC_API_URL,
          imageDomains: resolveImageDomains(process.env.TENANT_IMAGE_DOMAINS),
          isDev: phase === PHASE_DEVELOPMENT_SERVER,
        }),
      },
    ];
  },
});

/**
 * İzin verilen görsel domain'lerini ortam değişkeninden veya varsayılan listeden üretir.
 * TENANT_IMAGE_DOMAINS="cdn.example.com,assets.platform.io" formatında tanımlanır.
 */
function buildImagePatterns() {
  // Varsayılan OAuth avatar hostları (GitHub/Google/LinkedIn) + TENANT_IMAGE_DOMAINS —
  // liste `src/lib/securityHeaders.mjs`'te; CSP img-src ile AYNI kaynaktan beslenir.
  const patterns = resolveImageDomains(process.env.TENANT_IMAGE_DOMAINS).map((hostname) => ({
    protocol: /** @type {'https'} */ ('https'),
    hostname,
  }));

  // Backend origin — kullanıcının yüklediği avatarlar <backend>/uploads/... yolundan
  // servis edilir. Host, NEXT_PUBLIC_API_URL'den türetilir: dev'de http://localhost:3000,
  // canlıda https://api.sivilkapasite.org. Böylece next/image bu kaynağa izin verir.
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) {
    try {
      const u = new URL(apiUrl);
      patterns.push({
        protocol: /** @type {'https'} */ (u.protocol.replace(':', '')),
        hostname: u.hostname,
        ...(u.port ? { port: u.port } : {}),
        pathname: '/uploads/**',
      });
    } catch {
      // Geçersiz URL — sessizce atla, varsayılan domainlerle devam et.
    }
  }

  return patterns;
}

export default nextConfig;
