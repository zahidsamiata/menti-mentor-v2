import { apiClient } from './client';
import type { ApiResult } from '@/types/api';
import type {
  DiscQuestionsResponse,
  DiscAnswer,
  SubmitDiscResponse,
  ProfileData,
  MatchingPreferences,
} from '@/types/onboarding';

/** GET /api/users/disc/questions — 8 onboarding sorusunu çek */
export function fetchDiscQuestions(
  token: string,
  tenantId: string,
): Promise<ApiResult<DiscQuestionsResponse>> {
  return apiClient<DiscQuestionsResponse>('/api/users/disc/questions', { token, tenantId });
}

/** POST /api/users/profile/complete — sektör, beceri, deneyim yılı kaydet */
export function submitProfile(
  data:     ProfileData,
  token:    string,
  tenantId: string,
): Promise<ApiResult<unknown>> {
  return apiClient('/api/users/profile/complete', {
    method: 'POST',
    body:   data,
    token,
    tenantId,
  });
}

/** POST /api/users/disc/submit — cevapları gönder, "Aha Anı" kartını al */
export function submitDiscAnswers(
  answers:  DiscAnswer[],
  token:    string,
  tenantId: string,
): Promise<ApiResult<SubmitDiscResponse>> {
  return apiClient<SubmitDiscResponse>('/api/users/disc/submit', {
    method: 'POST',
    body:   { answers },
    token,
    tenantId,
  });
}

/** PATCH /api/users/me/matching-preferences — üç soru (S1/S2/S3) cevaplarını kaydet */
export function submitMatchingPreferences(
  data:     MatchingPreferences,
  token:    string,
  tenantId: string,
): Promise<ApiResult<unknown>> {
  return apiClient('/api/users/me/matching-preferences', {
    method: 'PATCH',
    body:   data,
    token,
    tenantId,
  });
}
