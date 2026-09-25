import type { ApiResult } from '@/types/api';
import type { RequestOptions } from './client';

type BoundClient = <T>(path: string, options?: Omit<RequestOptions, 'token' | 'tenantId'>) => Promise<ApiResult<T>>;

/**
 * Kullanıcı sektör etiketi önerisi (madde 127, Y-16).
 * Backend: `POST /api/tags/suggest` (server.ts — requireTenant + requireAuth + generalRateLimiter),
 * controller `tagController.ts` suggestTag. Öneri kurumun PendingTag kuyruğuna düşer; yönetici
 * `/admin/tags` ekranında onaylar, birleştirir ya da reddeder (sonuç önerenin profiline her
 * zaman yansımaz — kullanıcı metni bu yüzden söz vermez).
 */

/** Backend SuggestTagSchema ile eşlenmiş sınırlar (2-50 karakter, harf/rakam/boşluk/tire). */
export const TAG_SUGGEST_MIN = 2;
export const TAG_SUGGEST_MAX = 50;
export const TAG_SUGGEST_PATTERN = /^[a-zçğışöüA-ZÇĞİŞÖÜ0-9\s-]+$/;

export type PendingTagStatus = 'PENDING' | 'APPROVED' | 'MERGED' | 'REJECTED';

/**
 * 201 → yeni öneri oluştu (`tag` dolu).
 * 200 → aynı etiket bu kurumda daha önce önerilmiş; yeni kayıt açılmadı (`status` dolu).
 */
export interface SuggestTagResponse {
  message: string;
  tag?: { id: string; value: string; status: PendingTagStatus; createdAt: string };
  status?: PendingTagStatus;
}

/**
 * Girişi backend kurallarıyla ön-kontrol eder (asıl doğrulama backend'de).
 * Kural dışıysa kullanıcıya gösterilecek Türkçe hata döner; istek gönderilmez.
 * Küçük harfe çevirme backend'e bırakılır — iki tarafta farklı normalize edilmesin.
 */
export function validateTagSuggestion(
  raw: string,
): { ok: true; value: string } | { ok: false; message: string } {
  const trimmed = raw.trim();
  if (trimmed.length < TAG_SUGGEST_MIN) {
    return { ok: false, message: `Etiket en az ${TAG_SUGGEST_MIN} karakter olmalı.` };
  }
  if (trimmed.length > TAG_SUGGEST_MAX) {
    return { ok: false, message: `Etiket en fazla ${TAG_SUGGEST_MAX} karakter olabilir.` };
  }
  if (!TAG_SUGGEST_PATTERN.test(trimmed)) {
    return { ok: false, message: 'Etiket yalnızca harf, rakam, boşluk ve tire içerebilir.' };
  }
  return { ok: true, value: trimmed };
}

export const tagsApi = {
  suggest: (api: BoundClient, value: string): Promise<ApiResult<SuggestTagResponse>> =>
    api<SuggestTagResponse>('/api/tags/suggest', { method: 'POST', body: { value } }),
};
