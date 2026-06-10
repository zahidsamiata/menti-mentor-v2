/**
 * DISC Test API Çağrıları
 *
 * Endpoint sözleşmesi:
 *   GET  /api/questions               → sorular + pool meta verisi (QuestionsResponse)
 *   POST /api/questions/:id/respond   → tek soru yanıtı (RespondResponse)
 *   GET  /api/questions/my-responses  → adaptif ilerleme durumu (AdaptiveProgress)
 *
 * Tüm fonksiyonlar ApiResult<T> döner; çağıran result.ok ile dallanır.
 * Ayrı bir RespondPayload interface'i tanımlamak yerine inline literaller kullanılır —
 * tek alanlı payload için overhead yaratmak orantısız olur.
 */

import { apiClient } from './client';
import type { QuestionsResponse, RespondResponse, AdaptiveProgress, LikertValue } from '@/types/discTest';

export const discTestApi = {
  /**
   * Tenant'a erişilebilir aktif soruları ve pool meta verisini getir.
   * meta.coreThreshold: hook'ta CORE→DEEPENING faz kararı için kullanılır.
   */
  getQuestions: (token: string, tenantId: string) =>
    apiClient<QuestionsResponse>('/api/questions', { token, tenantId }),

  /**
   * Tek soru yanıtı kaydet ve güncellenmiş vektör + ilerleme al.
   *
   * Faz kararı: dönen progress.isDeepening → hook faz güncellemesi yapar.
   * discVector: güncellenen profil vektörü (görsel gösterim için opsiyonel).
   */
  respond: (questionId: string, value: LikertValue, token: string, tenantId: string) =>
    apiClient<RespondResponse>(`/api/questions/${questionId}/respond`, {
      method: 'POST',
      body: { value },
      token,
      tenantId,
    }),

  /**
   * Kullanıcının adaptif ilerleme durumunu getir.
   * Test sayfası açıldığında çağrılır; test kaldığı yerden devam edebilir.
   */
  getProgress: (token: string, tenantId: string) =>
    apiClient<AdaptiveProgress>('/api/questions/my-responses', { token, tenantId }),
};
