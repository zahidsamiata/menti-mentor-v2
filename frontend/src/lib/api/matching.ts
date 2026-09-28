import type { ApiResult } from '@/types/api';
import type { RequestOptions } from './client';
import type {
  MentorsListResponse,
  MentorMatchesResponse,
  RankedMentisResponse,
  MatchRequest,
  CreateMatchRequestPayload,
  MentorFilter,
} from '@/types/matching';

type BoundClient = <T>(path: string, options?: Omit<RequestOptions, 'token' | 'tenantId'>) => Promise<ApiResult<T>>;

// AJ-90: menti mentör havuzunda bir sayfada kaç kart gelir. TEK SABİT — ürün kararı
// KARAR-54.3 (sayfa başına kart sayısı) cevaplanınca yalnız bu değer değişir.
// Geçici değer 18: kuyruğun "cevap yoksa" varsayılanı; kart ızgarası 2 sütun (sm:grid-cols-2)
// olduğundan çift sayı son satırı boş bırakmaz; eski davranışa (tek seferde 100) 9'dan yakındır.
export const MENTOR_POOL_PAGE_SIZE = 18;

export const matchingApi = {
  // Menti için: tenant içindeki aktif mentorları listele (SADECE ONAYLANAN kullanıcılar çağırmalı).
  // /api/users artık sayfalı (varsayılan 50); menti-tarama tam listeyi beklediğinden max sayfa
  // boyutu (100) istenir. 100+ mentörlü tenant'ta gerçek sayfalama/arama UX'i gerekir (follow-up).
  listMentors: (api: BoundClient): Promise<ApiResult<MentorsListResponse>> =>
    api<MentorsListResponse>('/api/users?role=MENTOR&isActive=true&pageSize=100'),

  // Menti için: kendisine uygun mentörleri UYUM SKORUYLA getir (KARAR 5 güvenli — discType yok).
  // IDOR: backend requireSelfOrAdmin ile korur; mentiId kendi id'si olmalı.
  // AJ-90: sayfalı — `offset` verilirse o sıradan sonraki sayfa gelir; yanıttaki `total` tüm
  // uygun mentör sayısıdır. Sıra backend'de kararlı (skor azalan, eşitlikte id) → sayfa sınırında
  // tekrar/eksik yok.
  mentorMatches: (
    api: BoundClient,
    mentiId: string,
    params: { offset?: number } = {},
  ): Promise<ApiResult<MentorMatchesResponse>> => {
    const qs = new URLSearchParams({ limit: String(MENTOR_POOL_PAGE_SIZE) });
    if (params.offset) qs.set('offset', String(params.offset));
    return api<MentorMatchesResponse>(`/api/mentis/${mentiId}/mentor-matches?${qs.toString()}`);
  },

  // PENDING menti için: PII içermeyen mentor sayısı (KVKK — isim/e-posta gönderilmez)
  countMentors: (api: BoundClient): Promise<ApiResult<{ count: number }>> =>
    api<{ count: number }>('/api/users/mentor-count'),

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
