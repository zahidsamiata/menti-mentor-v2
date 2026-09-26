import type { ApiError } from '@/types/api';

// U-18 (KARAR-22 B + KARAR-80/M1): ret sebebi menti'ye ASLA gösterilmez; alternatif mentör önerisi BİLİNÇLİ olarak yok.
export const CONVERSATION_REJECTED_CODE = 'CONVERSATION_REJECTED';

export const REJECTED_MENTI_TEXT =
  'Bu eşleşme gerçekleşmedi.\n\nMentörler genelde kapasite ya da uygunluk nedeniyle dönüş yapamıyor — çoğu zaman aynı anda birkaç mentiyle çalışıyorlar.\n\nBu senin profilinle ilgili değil.';

const REJECTED_MENTI_SHORT_TEXT =
  'Bu eşleşme gerçekleşmedi. Mentörler genelde kapasite ya da uygunluk nedeniyle dönüş yapamıyor; bu senin profilinle ilgili değil.';

/** Menti bir mentöre yazmayı denediğinde dönen hatayı kullanıcıya gösterilecek metne çevirir. */
export function conversationStartErrorMessage(error: ApiError): string {
  if (error.error === CONVERSATION_REJECTED_CODE) return REJECTED_MENTI_SHORT_TEXT;
  return error.message ?? 'Mesaj gönderilemedi.';
}
