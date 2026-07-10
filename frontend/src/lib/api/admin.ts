/**
 * Admin endpoint çağrıları — useApiClient ile kullanılır.
 *
 * Her fonksiyon bound client alır ve ApiResult<T> döner.
 * Bu sayede bileşenler API URL'lerini bilmez; değişiklik tek yerde yapılır.
 */

import type { ApiResult } from '@/types/api';
import type {
  AdminUsersResponse,
  ApproveUserResponse,
  RejectUserResponse,
  CorrectionResponse,
  KpiData,
  PendingTagsResponse,
  TagActionResponse,
  MergeTagResponse,
} from '@/types/admin';
import type { RequestOptions } from './client';

type BoundClient = <T>(path: string, options?: Omit<RequestOptions, 'token' | 'tenantId'>) => Promise<ApiResult<T>>;

export const adminApi = {
  // ── KPI ───────────────────────────────────────────────────────────────────
  getKpi: (api: BoundClient): Promise<ApiResult<KpiData>> =>
    api<KpiData>('/api/admin/kpi'),

  // ── Kullanıcı Yönetimi ────────────────────────────────────────────────────
  listUsers: (api: BoundClient, params: { approvalStatus?: string; role?: string; page?: number } = {}) => {
    const qs = new URLSearchParams();
    if (params.approvalStatus) qs.set('approvalStatus', params.approvalStatus);
    if (params.role) qs.set('role', params.role);
    if (params.page) qs.set('page', String(params.page));
    return api<AdminUsersResponse>(`/api/admin/users?${qs.toString()}`);
  },

  // Bekleme odası: yalnızca PENDING kullanıcıları döner (sayfalama yok — tüm liste)
  listPendingUsers: (api: BoundClient): Promise<ApiResult<AdminUsersResponse>> =>
    api<AdminUsersResponse>('/api/admin/users?approvalStatus=PENDING'),

  // Tek noktadan onay/ret — approveUser / rejectUser'ı sarmalar
  updateUserStatus: (
    api: BoundClient,
    userId: string,
    status: 'APPROVED' | 'REJECTED',
  ): Promise<ApiResult<ApproveUserResponse | RejectUserResponse>> =>
    status === 'APPROVED'
      ? api<ApproveUserResponse>(`/api/admin/users/${userId}/approve`, { method: 'POST' })
      : api<RejectUserResponse>(`/api/admin/users/${userId}/reject`, { method: 'POST' }),

  approveUser: (api: BoundClient, userId: string): Promise<ApiResult<ApproveUserResponse>> =>
    api<ApproveUserResponse>(`/api/admin/users/${userId}/approve`, { method: 'POST' }),

  rejectUser: (api: BoundClient, userId: string): Promise<ApiResult<RejectUserResponse>> =>
    api<RejectUserResponse>(`/api/admin/users/${userId}/reject`, { method: 'POST' }),

  requestCorrection: (api: BoundClient, userId: string, feedbackNote: string): Promise<ApiResult<CorrectionResponse>> =>
    api<CorrectionResponse>(`/api/admin/users/${userId}/request-correction`, {
      method: 'POST',
      body: { feedbackNote },
    }),

  // ── Koçluk Önerileri ────────────────────────────────────────────────────────
  getCoachingSuggestions: (api: BoundClient, userId: string) =>
    api(`/api/admin/users/${userId}/coaching-suggestions`),

  // ── Taxonomy ──────────────────────────────────────────────────────────────
  listPendingTags: (api: BoundClient, page = 1): Promise<ApiResult<PendingTagsResponse>> =>
    api<PendingTagsResponse>(`/api/admin/tags/pending?page=${page}`),

  approveTag: (api: BoundClient, tagId: string): Promise<ApiResult<TagActionResponse>> =>
    api<TagActionResponse>(`/api/admin/tags/${tagId}/approve`, { method: 'POST' }),

  mergeTag: (api: BoundClient, tagId: string, targetTag: string): Promise<ApiResult<MergeTagResponse>> =>
    api<MergeTagResponse>(`/api/admin/tags/${tagId}/merge`, { method: 'POST', body: { targetTag } }),

  rejectTag: (api: BoundClient, tagId: string): Promise<ApiResult<TagActionResponse>> =>
    api<TagActionResponse>(`/api/admin/tags/${tagId}/reject`, { method: 'POST' }),
};
