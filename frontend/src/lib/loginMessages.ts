/**
 * Giriş akışı kullanıcı mesajları — tek yerde (registerMessages deseni).
 *
 * GÜVENLİK (enumeration-safe): giriş ekranı bir e-postanın kayıtlı olup olmadığını,
 * hangi yöntemle (şifre / sosyal sağlayıcı) açıldığını ya da hesabın pasif olduğunu
 * ELE VERMEZ. Kimliği doğrulanamayan her durum tek tip mesajla gösterilir; sağlayıcı
 * adı yazılmaz. Bkz. registerMessages.ts (aynı ilke) ve authController.login
 * (backend şifre girişinde zaten tek tip 401 döner).
 */

export const LOGIN_MESSAGES = {
  /** E-posta/şifre girişi başarısız — hesap yok / yanlış şifre / sosyal hesap ayırt edilmez. */
  INVALID_CREDENTIALS: 'E-posta ya da şifre hatalı.',
  /**
   * Sosyal giriş, mevcut bir hesapla eşleşemedi (farklı yöntemle açılmış ya da kullanılamayan hesap).
   * Sağlayıcı adı verilmez; kullanıcı kendi bildiği yönteme yönlendirilir.
   */
  OAUTH_NOT_ALLOWED:
    'Bu yöntemle giriş yapılamadı. Hesabınızı hangi yöntemle açtıysanız onunla deneyin ya da şifrenizi sıfırlayın.',
  /** Eşlenmemiş giriş hatası için güvenli genel mesaj. */
  GENERIC_LOGIN_FAIL: 'Giriş başarısız. Bilgilerinizi kontrol edin.',
  /** Eşlenmemiş sosyal giriş dönüş kodu için güvenli genel mesaj. */
  GENERIC_OAUTH_FAIL: 'Giriş sırasında hata oluştu.',
} as const;

/**
 * Sosyal giriş dönüşünde (/login?error=KOD) gelen kod → kullanıcı mesajı.
 * Hesabın varlığına bağlı kodlar (PROVIDER_CATISMASI, HESAP_PASIF) AYNI metne düşer.
 */
const OAUTH_CODE_MESSAGES: Record<string, string> = {
  KULLANICI_REDDETTI: 'Giriş işlemi iptal edildi.',
  PROVIDER_CATISMASI: LOGIN_MESSAGES.OAUTH_NOT_ALLOWED,
  HESAP_PASIF: LOGIN_MESSAGES.OAUTH_NOT_ALLOWED,
  GECERSIZ_STATE: 'Oturum süresi doldu. Lütfen tekrar deneyin.',
  PROVIDER_HATASI: 'Sosyal giriş sağlayıcısında hata oluştu.',
  TENANT_BULUNAMADI: 'Kuruluş bulunamadı. Bağlantıyı kontrol edin.',
  TENANT_ONAY_BEKLENIYOR:
    'Kurumunuz henüz inceleme aşamasında. Onaylandıktan sonra kayıt olabilirsiniz.',
  SUNUCU_HATASI: 'Bir hata oluştu. Lütfen tekrar deneyin.',
};

/** Sosyal giriş hata kodunu gösterilecek mesaja çevirir (bilinmeyen kod → genel mesaj). */
export function resolveOAuthError(code: string): string {
  return OAUTH_CODE_MESSAGES[code] ?? LOGIN_MESSAGES.GENERIC_OAUTH_FAIL;
}

/**
 * E-posta/şifre giriş hatasını gösterilecek mesaja çevirir.
 * Kimlik doğrulanamadıysa backend metnine GÜVENİLMEZ, sabit tek tip mesaj gösterilir
 * (backend metni ileride değişse bile hesap varlığı sızmasın diye).
 * Kimlik doğrulandıktan SONRAKİ durum mesajları (ör. hesap pasif) backend'den gelir —
 * bunlar yalnız doğru şifreyle görülebildiği için sızıntı değildir.
 */
export function resolveLoginError(code: string | undefined, backendMessage: string | undefined): string {
  if (code === 'KIMLIK_DOGRULANMADI') return LOGIN_MESSAGES.INVALID_CREDENTIALS;
  return backendMessage || LOGIN_MESSAGES.GENERIC_LOGIN_FAIL;
}
