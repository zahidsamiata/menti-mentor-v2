import type { ApiResult } from '@/types/api';
import type { RequestOptions } from './client';

type BoundClient = <T>(path: string, options?: Omit<RequestOptions, 'token' | 'tenantId'>) => Promise<ApiResult<T>>;

export interface ActiveMentee {
  id: string;
  fullName: string;
}

export interface MentorDashboardMetrics {
  pendingRequests: number;
  completedMeetings: number;
  activeMentis: number;
  /** Ortalama NPS; yeterli geri bildirim yoksa null. */
  avgNps: number | null;
  // ── Aşağıdakiler backend pointer bump'ından ÖNCE gelmeyebilir (opsiyonel) ──
  /** P-11: tamamlanan görüşmelerin toplam süresi (saat). */
  totalMentoringHours?: number;
  /** P-12: mentörün bu kurumdaki sertifika durumu. */
  isCertified?: boolean;
  /** P-13: aktif menti sayacının arkasındaki isim listesi. */
  activeMentees?: ActiveMentee[];
}

export const mentorMetricsApi = {
  get: (api: BoundClient, mentorId: string): Promise<ApiResult<MentorDashboardMetrics>> =>
    api<MentorDashboardMetrics>(`/api/mentors/${mentorId}/dashboard-metrics`),
};
