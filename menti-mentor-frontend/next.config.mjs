/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

/**
 * İzin verilen görsel domain'lerini ortam değişkeninden veya varsayılan listeden üretir.
 * TENANT_IMAGE_DOMAINS="cdn.example.com,assets.platform.io" formatında tanımlanır.
 */
function buildImagePatterns() {
  const defaultDomains = [
    'avatars.githubusercontent.com',   // GitHub OAuth avatar'ları
    'lh3.googleusercontent.com',       // Google OAuth avatar'ları
    'media.licdn.com',                 // LinkedIn OAuth avatar'ları
  ];

  const envDomains = process.env.TENANT_IMAGE_DOMAINS
    ? process.env.TENANT_IMAGE_DOMAINS.split(',').map((d) => d.trim()).filter(Boolean)
    : [];

  return [...new Set([...defaultDomains, ...envDomains])].map((hostname) => ({
    protocol: /** @type {'https'} */ ('https'),
    hostname,
  }));
}

export default nextConfig;
