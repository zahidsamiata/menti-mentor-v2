/**
 * Kurum logosu adresi güvenli mi? Boş kabul edilir (logo istemeyebilir).
 * Yalnız https:// şeması — backend `src/services/logoUrl.ts` ile aynı kural (F-04).
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
