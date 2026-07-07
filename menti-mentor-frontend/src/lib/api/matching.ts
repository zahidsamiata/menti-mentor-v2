import type { ApiResult } from '@/types/api';
import type { RequestOptions } from './client';
import type {
  MentorsListResponse,
  RankedMentisResponse,
  MatchRequest,
  CreateMatchRequestPayload,
  MentorFilter,
} from '@/types/matching';

type BoundClient = <T>(path: string, options?: Omit<RequestOptions, 'token' | 'tenantId'>) => Promise<ApiResult<T>>;

export const matchingApi = {
  // Menti için: tenant içindeki aktif mentorları listele
  listMentors: (api: BoundClient): Promise<ApiResult<MentorsListResponse>> =>
    api<MentorsListResponse>('/api/users?role=MENTOR&isActive=true'),

  // Mentor için: algoritmik sıralanmış menti adaylarını getir
  getRankedMentis: (
    api: BoundClient,
    mentorId: string,
    params: { minMatchScore?: number; excludeDiscTypes?: string[] } = {},
  ): Promise<ApiResult<RankedMentisResponse>> => {
    const qs = new URLSearchParams();
    if (params.minMatchScore !== undefined) qs.set('minMatchScore', String(params.minMatchScore));
    if (params.excludeDiscTypes?.length) qs.set('excludeDiscTypes', params.excludeDiscTypes.join(','));
    const query = qs.toString() ? `?${qs.toString()}` : '';
    return api<RankedMentisResponse>(`/api/mentors/${mentorId}/candidates${query}`);
  },
};

export const matchRequestApi = {
  // Menti → Mentor doğrudan talep gönder (kendi mesajıyla)
  create: (
    api: BoundClient,
    payload: CreateMatchRequestPayload,
  ): Promise<ApiResult<MatchRequest>> =>
    api<MatchRequest>('/api/requests', { method: 'POST', body: payload }),
};

export const mentorFilterApi = {
  // Mentörün kaydedilmiş filtre tercihlerini getir
  get: (api: BoundClient, mentorId: string): Promise<ApiResult<MentorFilter>> =>
    api<MentorFilter>(`/api/mentors/${mentorId}/filter`),

  // Filtre tercihlerini kaydet / güncelle
  upsert: (
    api: BoundClient,
    mentorId: string,
    data: Omit<MentorFilter, 'mentorId'>,
  ): Promise<ApiResult<MentorFilter>> =>
    api<MentorFilter>(`/api/mentors/${mentorId}/filter`, { method: 'PUT', body: data }),
};
