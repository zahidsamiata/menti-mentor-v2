/**
 * Mentör Sertifika API çağrıları (statik içerik — canlıda AI/token YOK).
 *
 * Endpoint sözleşmesi (yalnızca MENTOR):
 *   GET  /api/scoring/certification/questions → senaryolar (cevap sızdırmaz)
 *   POST /api/scoring/certification/answer    → seçim sonrası açıklama
 *   POST /api/scoring/certify                 → ilk-deneme sonucunu değerlendir
 *
 * Tüm fonksiyonlar useApiClient bağlı client'ı (api) alır; ApiResult döner.
 */

import type { ApiResult } from '@/types/api';
import type {
  CertQuestionsResponse,
  CertReveal,
  CertResult,
  CertTopicsResponse,
} from '@/types/certification';

type BoundClient = <T>(
  path: string,
  options?: { method?: 'GET' | 'POST' | 'PATCH'; body?: unknown },
) => Promise<ApiResult<T>>;

export const certificationApi = {
  getQuestions: (api: BoundClient) =>
    api<CertQuestionsResponse>('/api/scoring/certification/questions'),

  revealAnswer: (api: BoundClient, questionCode: string, optionKey: string) =>
    api<CertReveal>('/api/scoring/certification/answer', {
      method: 'POST',
      body: { questionCode, optionKey },
    }),

  /** answers: konu-bazında İLK seçimler ({questionCode, optionKey}). */
  certify: (api: BoundClient, answers: { questionCode: string; optionKey: string }[]) =>
    api<CertResult>('/api/scoring/certify', { method: 'POST', body: { answers } }),

  // ── STK admin ──────────────────────────────────────────────────────────────
  listTopics: (api: BoundClient) =>
    api<CertTopicsResponse>('/api/scoring/certification/topics'),

  setTopic: (api: BoundClient, topic: string, enabled: boolean) =>
    api<CertTopicsResponse>('/api/scoring/certification/topics', {
      method: 'PATCH',
      body: { topic, enabled },
    }),
};
