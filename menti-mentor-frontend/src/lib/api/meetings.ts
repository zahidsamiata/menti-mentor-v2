import type { ApiResult } from '@/types/api';
import type { RequestOptions } from './client';

type BoundClient = <T>(path: string, options?: Omit<RequestOptions, 'token' | 'tenantId'>) => Promise<ApiResult<T>>;

export interface Meeting {
  id: string;
  tenantId: string;
  mentorUserId: string;
  mentiUserId: string;
  status: 'PENDING' | 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  format: 'ONLINE' | 'IN_PERSON' | 'PHONE';
  startsAt: string;
  endsAt: string;
  notes: string | null;
  awaitingMentorApproval?: boolean;
}

export interface MeetingsListResponse {
  items: Meeting[];
  total: number;
}

export interface CheckIn {
  overallRating: number;
  progressRating: number;
  continueIntent: 'EVET' | 'BELIRSIZ' | 'HAYIR';
  menteePreparedness?: number;
  wantedMore?: string;
  nextTopicNote?: string;
  concernTag?: string;
  continuationView?: string;
  openNote?: string;
}

export interface AvailabilityBlock {
  weekday: string;
  startTime: string;
  endTime: string;
}

export interface AvailabilityResponse {
  mentorUserId: string;
  blocks: AvailabilityBlock[];
}

export interface BookMeetingPayload {
  mentorUserId: string;
  matchId?: string;
  format: 'ONLINE' | 'IN_PERSON' | 'PHONE';
  startsAt: string;
  endsAt: string;
  locationUrl?: string;
  locationText?: string;
  phoneNumber?: string;
}

export const meetingsApi = {
  list: (api: BoundClient, params: { status?: string } = {}): Promise<ApiResult<MeetingsListResponse>> => {
    const qs = params.status ? `?status=${params.status}` : '';
    return api<MeetingsListResponse>(`/api/meetings${qs}`);
  },

  getAvailability: (api: BoundClient, mentorUserId: string): Promise<ApiResult<AvailabilityResponse>> =>
    api<AvailabilityResponse>(`/api/meetings/availability?mentorUserId=${mentorUserId}`),

  bookMeeting: (api: BoundClient, payload: BookMeetingPayload): Promise<ApiResult<{ meeting: Meeting; awaitingMentorApproval: boolean }>> =>
    api(`/api/meetings/book`, { method: 'POST', body: payload }),

  approveMeeting: (api: BoundClient, meetingId: string): Promise<ApiResult<{ meeting: Meeting }>> =>
    api<{ meeting: Meeting }>(`/api/meetings/${meetingId}/approve`, { method: 'POST' }),

  rejectMeeting: (api: BoundClient, meetingId: string, reason?: string): Promise<ApiResult<{ meeting: Meeting }>> =>
    api<{ meeting: Meeting }>(`/api/meetings/${meetingId}/reject`, { method: 'POST', body: { reason } }),

  submitCheckIn: (api: BoundClient, meetingId: string, data: CheckIn): Promise<ApiResult<CheckIn>> =>
    api<CheckIn>(`/api/meetings/${meetingId}/check-in`, { method: 'POST', body: data }),

  getPairSignal: (
    api: BoundClient,
    mentorId: string,
    mentiId: string,
  ): Promise<ApiResult<{ signal: 'GREEN' | 'YELLOW' | 'RED'; reasons: string[]; avgRating: number | null }>> =>
    api(`/api/meetings/pair-signal?mentorId=${mentorId}&mentiId=${mentiId}`),
};
