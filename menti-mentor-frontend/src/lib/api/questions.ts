import type { ApiResult } from '@/types/api';
import type { RequestOptions } from './client';

type BoundClient = <T>(path: string, options?: Omit<RequestOptions, 'token' | 'tenantId'>) => Promise<ApiResult<T>>;

export interface Question {
  id: string;
  tenantId: string | null;
  text: string;
  type: 'CORE' | 'DEEPENING';
  discDimension: 'D' | 'I' | 'S' | 'C' | 'GENERAL';
  order: number;
  isActive: boolean;
  isRequired: boolean;
}

export interface QuestionsResponse {
  items: Question[];
  total: number;
  meta: {
    coreCount: number;
    deepeningCount: number;
    coreThreshold: number;
  };
}

export interface AdaptiveProgress {
  totalAnswered: number;
  coreAnswered: number;
  deepeningAnswered: number;
  coreThreshold: number;
  isDeepening: boolean;
  isComplete: boolean;
  completionPercent: number;
}

export interface NextQuestionResponse {
  done: boolean;
  question?: Question;
  progress: AdaptiveProgress;
}

export const questionsApi = {
  list: (api: BoundClient): Promise<ApiResult<QuestionsResponse>> =>
    api<QuestionsResponse>('/api/questions'),

  create: (
    api: BoundClient,
    data: { text: string; type?: string; discDimension?: string; order?: number; tenantScoped?: boolean },
  ) => api('/api/questions', { method: 'POST', body: data }),

  update: (
    api: BoundClient,
    questionId: string,
    data: { text?: string; order?: number; isRequired?: boolean; isActive?: boolean },
  ) => api(`/api/questions/${questionId}`, { method: 'PATCH', body: data }),

  delete: (api: BoundClient, questionId: string) =>
    api(`/api/questions/${questionId}`, { method: 'DELETE' }),

  hide: (api: BoundClient, questionId: string) =>
    api(`/api/questions/${questionId}/hide`, { method: 'POST' }),

  unhide: (api: BoundClient, questionId: string) =>
    api(`/api/questions/${questionId}/hide`, { method: 'DELETE' }),

  getNextAdaptive: (api: BoundClient, userId: string): Promise<ApiResult<NextQuestionResponse>> =>
    api<NextQuestionResponse>(`/api/users/${userId}/adaptive-test/next`),

  submitAdaptiveAnswer: (
    api: BoundClient,
    userId: string,
    questionId: string,
    value: number,
  ): Promise<ApiResult<NextQuestionResponse>> =>
    api<NextQuestionResponse>(`/api/users/${userId}/adaptive-test/answer`, {
      method: 'POST',
      body: { questionId, value },
    }),
};
