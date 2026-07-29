import type { ApiResult } from '@/types/api';
import type { RequestOptions } from './client';

type BoundClient = <T>(path: string, options?: Omit<RequestOptions, 'token' | 'tenantId'>) => Promise<ApiResult<T>>;

export type LearningAudience = 'MENTOR' | 'MENTI';
export type StageOutcome = 'correct' | 'warn' | 'wrong';

/** Oyuncuya dönen seçenek — cevap anahtarı (outcome/feedback) gizli. */
export interface PublicStageChoice {
  key: string;
  label: string;
}

export interface PublicStage {
  id: string;
  order: number;
  title: string;
  situationText: string;
  learningGoal: string;
  isStkSpecific: boolean;
  choices: PublicStageChoice[];
}

export interface JourneyFrame {
  journeyTitle: string;
  intro: string;
  closing: string;
}

export interface StagesResponse {
  audience: LearningAudience;
  frame: JourneyFrame;
  items: PublicStage[];
  total: number;
}

export interface ChoiceResult {
  key: string;
  outcome: StageOutcome;
  feedback: string;
}

export interface JourneyStatus {
  audience: LearningAudience;
  completed: boolean;
  completedAt: string | null;
  totalStages: number;
}

// ─── Yönetici (STK) tarafı — tam aşama (cevap anahtarı dahil) ─────────────────

export interface AdminStageChoice {
  key: string;
  label: string;
  outcome: StageOutcome;
  feedback: string;
}

export interface AdminStage {
  id: string;
  tenantId: string | null;
  audience: LearningAudience;
  order: number;
  title: string;
  situationText: string;
  learningGoal: string;
  authoringGuide: string | null;
  isStkSpecific: boolean;
  choices: AdminStageChoice[];
  isActive: boolean;
  /** Global bir aşamadan klonlandıysa kaynak global id; değilse null. */
  clonedFromId: string | null;
  /** Bu tenant tarafından gizlenmiş global aşama mı (yalnızca global kayıtlar için). */
  isHidden: boolean;
}

export interface AdminStagesResponse {
  items: AdminStage[];
  total: number;
}

export interface AdminStageInput {
  audience: LearningAudience;
  title: string;
  situationText: string;
  learningGoal: string;
  authoringGuide?: string | null;
  isStkSpecific?: boolean;
  order?: number;
  isActive?: boolean;
  choices: AdminStageChoice[];
}

export const learningJourneyApi = {
  // ── Oyuncu (menti/mentör) ──────────────────────────────────────────────────
  getStages: (api: BoundClient): Promise<ApiResult<StagesResponse>> =>
    api<StagesResponse>('/api/learning-journey/stages'),

  getStatus: (api: BoundClient): Promise<ApiResult<JourneyStatus>> =>
    api<JourneyStatus>('/api/learning-journey/status'),

  select: (api: BoundClient, stageId: string, choiceKey: string): Promise<ApiResult<ChoiceResult>> =>
    api<ChoiceResult>(`/api/learning-journey/stages/${stageId}/select`, {
      method: 'POST',
      body: { choiceKey },
    }),

  complete: (api: BoundClient): Promise<ApiResult<{ completed: boolean; completedAt: string }>> =>
    api('/api/learning-journey/complete', { method: 'POST' }),

  // ── Yönetici (STK) CRUD ────────────────────────────────────────────────────
  adminList: (api: BoundClient, audience?: LearningAudience): Promise<ApiResult<AdminStagesResponse>> =>
    api<AdminStagesResponse>(
      audience ? `/api/admin/learning-journey/stages?audience=${audience}` : '/api/admin/learning-journey/stages',
    ),

  adminCreate: (api: BoundClient, data: AdminStageInput) =>
    api('/api/admin/learning-journey/stages', { method: 'POST', body: data }),

  adminUpdate: (api: BoundClient, stageId: string, data: Partial<AdminStageInput>) =>
    api(`/api/admin/learning-journey/stages/${stageId}`, { method: 'PATCH', body: data }),

  adminDelete: (api: BoundClient, stageId: string) =>
    api(`/api/admin/learning-journey/stages/${stageId}`, { method: 'DELETE' }),

  /** Global aşamayı klonlayarak özelleştir (klon tenant'a ait + global gizlenir). */
  adminCustomize: (api: BoundClient, stageId: string) =>
    api(`/api/admin/learning-journey/stages/${stageId}/customize`, { method: 'POST' }),

  adminHide: (api: BoundClient, stageId: string) =>
    api(`/api/admin/learning-journey/stages/${stageId}/hide`, { method: 'POST' }),

  adminUnhide: (api: BoundClient, stageId: string) =>
    api(`/api/admin/learning-journey/stages/${stageId}/hide`, { method: 'DELETE' }),

  adminReorder: (api: BoundClient, order: string[]) =>
    api('/api/admin/learning-journey/stages/reorder', { method: 'POST', body: { order } }),
};
