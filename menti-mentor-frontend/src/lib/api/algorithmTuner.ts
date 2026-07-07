import type { ApiResult } from '@/types/api';
import type { RequestOptions } from './client';

type BoundClient = <T>(path: string, options?: Omit<RequestOptions, 'token' | 'tenantId'>) => Promise<ApiResult<T>>;

export interface AlgorithmWeights {
  sectorWeight: number;
  discWeight: number;
  lastAdjustedAt: string;
  reason: string;
}

export interface PendingAdjustment {
  tenantId: string;
  previousWeights: AlgorithmWeights;
  newWeights: AlgorithmWeights;
  phase1Nps: { avgNps: number | null; sampleSize: number };
  phase3Nps: { avgNps: number | null; sampleSize: number };
  adjusted: boolean;
  reason: string;
  proposedAt: string;
}

export type ReportingFrequency = 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';

export const algorithmTunerApi = {
  getPending: (api: BoundClient): Promise<ApiResult<{ pending: PendingAdjustment | null }>> =>
    api('/api/admin/algorithm-tuner/pending'),

  approve: (api: BoundClient): Promise<ApiResult<{ message: string; applied: PendingAdjustment }>> =>
    api('/api/admin/algorithm-tuner/approve', { method: 'POST' }),

  reject: (api: BoundClient): Promise<ApiResult<{ message: string }>> =>
    api('/api/admin/algorithm-tuner/reject', { method: 'POST' }),

  updateFrequency: (
    api: BoundClient,
    tenantId: string,
    frequency: ReportingFrequency,
  ): Promise<ApiResult<{ message: string }>> =>
    api(`/api/tenants/${tenantId}/settings`, {
      method: 'PATCH',
      body: { reportingFrequency: frequency },
    }),
};
