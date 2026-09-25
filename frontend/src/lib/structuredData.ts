/**
 * Y-10 — JSON-LD yapısal veri (schema.org) üreticisi.
 *
 * Arama motorları ana sayfayı bir kurum + web sitesi olarak tanısın diye `Organization`
 * ve `WebSite` şeması üretir. Değerler YALNIZ kodda zaten var olan bilgiden gelir
 * (marka adı, ana sayfa açıklaması, `getSiteUrl()`, `/icon` — Y-09 marka rozeti). Adres, telefon,
 * e-posta, sosyal hesap gibi iletişim alanları BİLİNÇLİ olarak yok — iletişim bilgisi
 * ürün kararına bağlı (KARAR-88); karar verilmeden uydurulmaz.
 *
 * `SoftwareApplication` eklenmedi: zengin sonuç için fiyat/puan/işletim sistemi gibi
 * alanlar ister ve bunların kodda doğrulanmış karşılığı yok.
 */

export const BRAND_NAME = 'MentiMentor';

/** Ana sayfa açıklaması — hem `<meta name="description">` hem JSON-LD tek kaynaktan okur. */
export const HOME_DESCRIPTION =
  'Dernekler, vakıflar ve üniversite kulüpleri için DISC mizaç tabanlı, ' +
  'kapalı devre mentörlük platformu. Kurulum 10 dakika, sonsuza kadar ücretsiz.';

export type JsonLdObject = Record<string, unknown>;

/** Ana sayfa için `Organization` + `WebSite` şemalarını `@graph` altında döndürür. */
export function buildHomeJsonLd(siteUrl: string): JsonLdObject {
  const organizationId = `${siteUrl}/#organization`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: BRAND_NAME,
        url: siteUrl,
        logo: `${siteUrl}/icon`,
        description: HOME_DESCRIPTION,
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: BRAND_NAME,
        url: siteUrl,
        description: HOME_DESCRIPTION,
        inLanguage: 'tr-TR',
        publisher: { '@id': organizationId },
      },
    ],
  };
}

/**
 * JSON-LD'yi `<script>` içine güvenle gömülebilir metne çevirir.
 * `<` → `<`: veri içinde `</script>` geçse bile etiket erken kapanamaz (XSS).
 * `<` JSON içinde geçerli bir kaçış olduğundan ayrıştırılan değer değişmez.
 */
export function serializeJsonLd(data: JsonLdObject): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
