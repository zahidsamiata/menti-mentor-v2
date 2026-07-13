import type { ApiResult } from '@/types/api';
import type { RequestOptions } from './client';

type BoundClient = <T>(path: string, options?: Omit<RequestOptions, 'token' | 'tenantId'>) => Promise<ApiResult<T>>;

export type AgreementStatus = 'DRAFT' | 'ACTIVE' | 'RENEWAL_PENDING' | 'RENEWED' | 'ENDED';

export interface MentorshipAgreement {
  id: string;
  tenantId: string;
  mentorId: string;
  mentiId: string;
  matchId: string | null;
  meetingFrequency: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
  communicationChannel: 'ONLINE' | 'IN_PERSON' | 'PHONE';
  durationWeeks: number;
  targetMeetings: number;
  mentiGoal: string;
  agendaOwner: string;
  privacyAgreed: boolean;
  mentorConfirmedAt: string | null;
  mentiConfirmedAt: string | null;
  status: AgreementStatus;
  renewalAskedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAgreementPayload {
  mentorId: string;
  mentiId: string;
  matchId?: string;
  meetingFrequency: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
  communicationChannel: 'ONLINE' | 'IN_PERSON' | 'PHONE';
  durationWeeks: number;
  targetMeetings: number;
  mentiGoal: string;
  agendaOwner?: 'MENTOR' | 'MENTI';
  privacyAgreed: true;
}

export const agreementsApi = {
  getActive: (api: BoundClient): Promise<ApiResult<MentorshipAgreement>> =>
    api<MentorshipAgreement>('/api/agreements/active'),

  create: (api: BoundClient, data: CreateAgreementPayload): Promise<ApiResult<MentorshipAgreement>> =>
    api<MentorshipAgreement>('/api/agreements', { method: 'POST', body: data }),

  confirm: (api: BoundClient, id: string): Promise<ApiResult<MentorshipAgreement>> =>
    api<MentorshipAgreement>(`/api/agreements/${id}/confirm`, { method: 'POST' }),

  renew: (api: BoundClient, id: string): Promise<ApiResult<MentorshipAgreement>> =>
    api<MentorshipAgreement>(`/api/agreements/${id}/renew`, { method: 'POST' }),

  end: (api: BoundClient, id: string): Promise<ApiResult<MentorshipAgreement>> =>
    api<MentorshipAgreement>(`/api/agreements/${id}/end`, { method: 'POST' }),
};
