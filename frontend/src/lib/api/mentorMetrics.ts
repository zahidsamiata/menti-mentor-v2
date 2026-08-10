import type { ApiResult } from '@/types/api';
import type { RequestOptions } from './client';

type BoundClient = <T>(path: string, options?: Omit<RequestOptions, 'token' | 'tenantId'>) => Promise<ApiResult<T>>;

export interface MentorDashboardMetrics {
  pendingRequests: number;
  completedMeetings: number;
  activeMentis: number;
  /** Ortalama NPS; yeterli geri bildirim yoksa null. */
  avgNps: number | null;
}

export const mentorMetricsApi = {
  get: (api: BoundClient, mentorId: string): Promise<ApiResult<MentorDashboardMetrics>> =>
    api<MentorDashboardMetrics>(`/api/mentors/${mentorId}/dashboard-metrics`),
};
