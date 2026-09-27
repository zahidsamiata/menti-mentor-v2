/**
 * Kurum logosu adresi kuralları — F-04 (2026-09) + AJ-05 (2026-09-27) sıkılaştırması.
 *
 * İKİ ayrı kontrol var, KARIŞTIRMA:
 * - `isSafeLogoUrl`  — GÖSTERİM (okuma) guard'ı. Yalnız https şeması ister. Bilerek gevşek:
 *   `TenantSwitcher` gibi yerlerde ZATEN KAYITLI logoları çizip çizmeyeceğine karar verir;
 *   burayı sıkılaştırmak, daha önce kaydedilmiş geçerli bir logoyu ekrandan aniden kaybettirir.
 * - `isLogoUrlSafeToSave` — KAYDETME (yazma) guard'ı. Backend `backend/src/services/logoUrl.ts`
 *   ile AYNI kural seti (https-only + kullanıcı bilgisi/port/IP-literal/localhost-özel ağ reddi +
 *   izinli uzantı). Yalnız yeni logo giren formlarda (`Step3Branding`, `/admin/branding`) kullanılır —
 *   kullanıcı submit etmeden backend'in reddedeceği bir adresi görür, sessiz 400 almaz.
 *
 * Kurallardaki değişiklik ihtimali için: bu dosya backend'deki ile senkron tutulur (ayrı paket
 * olduğundan kod paylaşılamıyor, kural paylaşılıyor — biri değişirse diğeri de güncellenir).
 */

export function isSafeLogoUrl(url: string): boolean {
  if (url.trim() === '') return true;
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

export const LOGO_URL_ERROR = 'Logo adresi https:// ile başlayan geçerli bir adres olmalı.';

// ─── Kaydetme (yazma) guard'ı — backend `logoUrlSchema` ile birebir aynı kurallar ────────────

const ALLOWED_LOGO_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

/** `hostname` dört noktalı ondalık bir IPv4 literal mi? (WHATWG URL zaten kanonik forma normalize eder.) */
function isIPv4Literal(hostname: string): boolean {
  return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname);
}

/** `hostname` köşeli parantezli bir IPv6 literal mi? (WHATWG URL, IPv6 host'ları hep `[...]` yazar.) */
function isIPv6Literal(hostname: string): boolean {
  return hostname.startsWith('[') && hostname.endsWith(']');
}

/** `localhost`, `*.localhost`, `*.local` (mDNS/zeroconf) ve yaygın iç ağ TLD'leri. */
function isLocalOrInternalHostname(hostname: string): boolean {
  return (
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.internal') ||
    hostname.endsWith('.intranet') ||
    hostname.endsWith('.corp') ||
    hostname.endsWith('.lan') ||
    hostname.endsWith('.home.arpa')
  );
}

/** Yeni logo KAYDEDERKEN kullanılır — backend `isSafeLogoUrl` (logoUrl.ts) ile aynı kural seti. */
export function isLogoUrlSafeToSave(url: string): boolean {
  if (url.trim() === '') return true; // logo opsiyonel

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== 'https:') return false;
  if (parsed.username !== '' || parsed.password !== '') return false;
  if (parsed.port !== '') return false;

  const hostname = parsed.hostname;
  if (isIPv4Literal(hostname) || isIPv6Literal(hostname)) return false;
  if (isLocalOrInternalHostname(hostname)) return false;

  const lowerPath = parsed.pathname.toLowerCase();
  if (!ALLOWED_LOGO_EXTENSIONS.some((ext) => lowerPath.endsWith(ext))) return false;

  return true;
}

export const LOGO_URL_SAVE_ERROR =
  'Logo adresi https:// ile başlayan, güvenli ve desteklenen bir görsel adresi olmalı (.png, .jpg, .jpeg, .webp).';
