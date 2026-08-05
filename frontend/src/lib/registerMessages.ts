/**
 * Kayıt akışı kullanıcı mesajları — tek yerde (bakım + çeviri kolaylığı).
 *
 * Hem davetli üye kaydı (_RegisterContent) hem STK admin kaydı (Step4Account)
 * bu modülü kullanır. Amaç: dağınık inline string yerine net, yönlendirici ve
 * enumeration-safe mesajlar.
 *
 * GÜVENLİK (enumeration-safe): "e-posta zaten kayıtlı" gibi hesap-varlığı
 * sızdıran mesaj YAZILMAZ. Backend de zaten kayıtlı e-postada başarı yanıtı
 * döndürür (bkz. authController.register); frontend de kod-bazlı, hesap
 * varlığını açığa vurmayan mesajlar gösterir.
 */

import type { ApiError } from '@/types/api';

/** Sabit (koda gömülü) kayıt akışı mesajları. */
export const REGISTER_MESSAGES = {
  /** Davet token'ı olmadan kayıt denendiğinde. */
  MISSING_INVITE:
    'Kayıt için geçerli bir davet bağlantısı gerekiyor. Lütfen kurumunuzun size gönderdiği davet linkini kullanın.',
  /** Kayıt başarılı ama otomatik giriş yapılamadı (ör. hesap onay bekliyor). */
  AUTOLOGIN_REDIRECT:
    'Hesabınız oluşturuldu. Giriş yapmak için giriş sayfasına yönlendiriliyorsunuz.',
  /** Bilinmeyen/eşlenmemiş hata için güvenli genel mesaj. */
  GENERIC_FAIL: 'Kayıt tamamlanamadı. Bilgilerinizi kontrol edip tekrar deneyin.',
} as const;

/**
 * Backend hata KODU (ApiError.error) → kullanıcı dostu, yönlendirici mesaj.
 * Kod eşlenmemişse GENERIC_FAIL'e düşülür (ham backend mesajı gösterilmez →
 * iç detay/enumeration sızmaz).
 */
const CODE_MESSAGES: Record<string, string> = {
  VALIDATION: 'Girdiğiniz bilgilerde eksik veya hata var. Lütfen kontrol edip tekrar deneyin.',
  TENANT_BULUNAMADI: 'Kuruluş bulunamadı. Davet bağlantınızın doğru olduğundan emin olun.',
  TENANT_ONAY_BEKLENIYOR:
    'Kurumunuz henüz platform tarafından onaylanmadı. Onaylandığında kayıt olabilirsiniz.',
};

/** Kayıt hatası ApiError'ını kullanıcıya gösterilecek net mesaja çevirir. */
export function resolveRegisterError(error: ApiError): string {
  return CODE_MESSAGES[error.error] ?? REGISTER_MESSAGES.GENERIC_FAIL;
}
