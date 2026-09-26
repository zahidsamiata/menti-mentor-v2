/**
 * OAuth dönüşünde (/oauth/callback?error=KOD) hata kodunun kullanıcıyı götüreceği yer.
 *
 * Y1-B8: onay bekleyen / reddedilen hesaba backend artık OAuth ile de token VERMEZ; durum kodunu
 * döner. Şifreli girişteki (LoginForm) ekranlarla aynı yönlendirme:
 *  - HESAP_ONAY_BEKLENIYOR → /pending-approval (bekleme ekranı)
 *  - diğer kodlar (HESAP_REDDEDILDI dahil) → /login?error=KOD, mesaj lib/loginMessages'tan.
 */
export function oauthErrorRedirect(code: string): string {
  if (code === 'HESAP_ONAY_BEKLENIYOR') return '/pending-approval';
  return `/login?error=${encodeURIComponent(code)}`;
}
