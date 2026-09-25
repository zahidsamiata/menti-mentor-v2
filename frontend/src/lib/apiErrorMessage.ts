/**
 * API hatasından kullanıcıya gösterilecek metni seçer (IC-07).
 *
 * Neden: birçok ekran `res.error`'ı hiç okumadan sabit bir "başarısız oldu" metni basıyordu;
 * backend'in döndürdüğü Türkçe sebep (ör. hız sınırı uyarısı, kapatılamayan konu) yutuluyordu.
 *
 * Kural: backend `message` alanı kullanıcıya uygun görünüyorsa O gösterilir; yoksa ya da teknik
 * görünüyorsa çağıranın verdiği bağlama özgü Türkçe yedek metin gösterilir.
 * GÜVENLİK: hata kodu (`SOME_CODE`), yığın izi (stack) ve Zod'un İngilizce varsayılan metinleri
 * kullanıcıya gösterilmez — bunlar iç detaydır.
 */

/** Tek parça büyük harf + alt çizgi hata kodu: `NOT_FOUND`, `RED_LINE_LOCKED` … */
const ERROR_CODE_PATTERN = /^[A-Z0-9_]+$/;
/** Yığın izi / kaynak dosya izi. */
const STACK_TRACE_PATTERN = /\n\s*at\s|\.(ts|js|tsx):\d+/;
/** Zod'un İngilizce varsayılan kısıt mesajları (backend'de Türkçe errorMap henüz yok). */
const ZOD_ENGLISH_DEFAULT_PATTERN =
  /^(String|Number|Array|Invalid|Expected|Required|Too (small|big)|Unrecognized)\b/;
/** Bundan uzun metin kullanıcı mesajı değil, büyük olasılıkla iç detaydır. */
const MAX_USER_MESSAGE_LENGTH = 300;

export function isUserFacingMessage(message: unknown): message is string {
  if (typeof message !== 'string') return false;
  const text = message.trim();
  if (!text || text.length > MAX_USER_MESSAGE_LENGTH) return false;
  if (ERROR_CODE_PATTERN.test(text)) return false;
  if (STACK_TRACE_PATTERN.test(text)) return false;
  if (ZOD_ENGLISH_DEFAULT_PATTERN.test(text)) return false;
  return true;
}

export function apiErrorMessage(
  error: { message?: unknown } | null | undefined,
  fallback: string,
): string {
  const message = error?.message;
  return isUserFacingMessage(message) ? message.trim() : fallback;
}
