/**
 * GV-03: başka bir kullanıcının girdiği bağlantı yalnız http(s) ise tıklanabilir çizilir.
 * Backend `src/services/safeUrl.ts` ile aynı kural; bu frontend tarafındaki savunma katmanı
 * (kural gelmeden önce kaydedilmiş adresler için de).
 */
export function isHttpUrl(value: string): boolean {
  try {
    const protocol = new URL(value).protocol;
    return protocol === 'https:' || protocol === 'http:';
  } catch {
    return false;
  }
}
