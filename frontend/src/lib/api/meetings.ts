import type { ApiResult } from '@/types/api';
import type { RequestOptions } from './client';

type BoundClient = <T>(path: string, options?: Omit<RequestOptions, 'token' | 'tenantId'>) => Promise<ApiResult<T>>;

export interface MentiProfile {
  id: string;
  fullName: string;
  sectorTags: string[];
  expectationCategories: string[];
}

/** Görüşme listesinde karşı taraf olarak gösterilen mentör (backend listMeetings include'u). */
export interface MentorProfile {
  id: string;
  fullName: string;
}

export interface MeetingMatch {
  id: string;
  predictedScore: number;
  sectorScore: number;
  characterScore: number;
}

export interface Meeting {
  id: string;
  tenantId: string;
  mentorUserId: string;
  mentiUserId: string;
  status: 'PENDING' | 'SCHEDULED' | 'IN_PROGRESS' | 'APPROVED' | 'COMPLETED' | 'CANCELLED';
  format: 'ONLINE' | 'IN_PERSON' | 'PHONE';
  startsAt: string;
  endsAt: string;
  notes: string | null;
  requestMessage: string | null;
  // Görüşme yeri — formata göre yalnız biri dolu (backend listMeetings tüm scalar
  // alanları döndürür; U-02'ye kadar FE'de hiç render edilmiyordu).
  locationUrl?: string | null;
  locationText?: string | null;
  phoneNumber?: string | null;
  menti?: MentiProfile;
  mentor?: MentorProfile;
  match?: MeetingMatch | null;
  awaitingMentorApproval?: boolean;
}

export interface MeetingsListResponse {
  items: Meeting[];
  total: number;
}

/**
 * E-3e / GV-04 / KARAR-80 (M22, A kabul): backend `getMeetingFeedback`
 * (feedbackController.ts) taraf bazlı böler — yazan yalnız KENDİ kaydını,
 * kurum yöneticisi hepsini görür; karşı tarafın alanları HİÇ dönmez ("en dar
 * görünürlük"). Bu yüzden alanların TAMAMI opsiyonel: hangi rolden (mentör/
 * menti/admin) bakıldığına göre bazıları hiç gelmez.
 */
export interface MeetingFeedback {
  id: string;
  meetingId: string;
  tenantId: string;
  mentorId: string;
  mentiId: string;
  // Menti → Mentor
  guidanceScore?: number | null;
  resourceSharingScore?: number | null;
  trustScore?: number | null;
  // Mentor → Menti
  preparednessScore?: number | null;
  proactivityScore?: number | null;
  engagementScore?: number | null;
  goalClarityScore?: number | null;
  keyLearnings?: string | null;
  specificComments?: string | null;
  // Dönemlik derin
  periodicCareerGrowth?: string | null;
  periodicTrustScore?: number | null;
  periodicNetworkScore?: number | null;
  periodicConfidenceScore?: number | null;
  periodicNpsScore?: number | null;
  createdAt: string;
  updatedAt: string;
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
  // KARAR-7 (A): online toplantı linkini menti değil mentör, onayda girer — bkz. approveMeeting.
  locationText?: string;
  phoneNumber?: string;
  requestMessage: string;
}

export interface SaveAvailabilityPayload {
  blocks: { weekday: string; startTime: string; endTime: string }[];
}

/** GET /api/meetings/weekly-limit — kurumun haftalık görüşme sıklığı (madde 156). null = ayar yok. */
export interface WeeklyLimitResponse {
  maxMeetingsPerWeek: number | null;
}

export const meetingsApi = {
  list: (
    api: BoundClient,
    params: { status?: string; mentorId?: string; mentiId?: string } = {},
  ): Promise<ApiResult<MeetingsListResponse>> => {
    const qs = new URLSearchParams();
    if (params.status)   qs.set('status', params.status);
    if (params.mentorId) qs.set('mentorId', params.mentorId);
    if (params.mentiId)  qs.set('mentiId', params.mentiId);
    const q = qs.toString();
    return api<MeetingsListResponse>(`/api/meetings${q ? `?${q}` : ''}`);
  },

  getWeeklyLimit: (api: BoundClient): Promise<ApiResult<WeeklyLimitResponse>> =>
    api<WeeklyLimitResponse>('/api/meetings/weekly-limit'),

  getAvailability: (api: BoundClient, mentorUserId: string): Promise<ApiResult<AvailabilityResponse>> =>
    api<AvailabilityResponse>(`/api/meetings/availability?mentorUserId=${mentorUserId}`),

  saveAvailability: (api: BoundClient, payload: SaveAvailabilityPayload): Promise<ApiResult<AvailabilityResponse>> =>
    api<AvailabilityResponse>('/api/meetings/availability', { method: 'POST', body: payload }),

  bookMeeting: (api: BoundClient, payload: BookMeetingPayload): Promise<ApiResult<{ meeting: Meeting; awaitingMentorApproval: boolean }>> =>
    api(`/api/meetings/book`, { method: 'POST', body: payload }),

  // KARAR-7 (A): ONLINE görüşmede locationUrl zorunlu — backend link olmadan onayı 400'ler.
  approveMeeting: (api: BoundClient, meetingId: string, locationUrl?: string): Promise<ApiResult<{ meeting: Meeting }>> =>
    api<{ meeting: Meeting }>(`/api/meetings/${meetingId}/approve`, { method: 'POST', body: { locationUrl } }),

  rejectMeeting: (api: BoundClient, meetingId: string, reason?: string): Promise<ApiResult<{ meeting: Meeting }>> =>
    api<{ meeting: Meeting }>(`/api/meetings/${meetingId}/reject`, { method: 'POST', body: { reason } }),

  // U-01: mentör, otomatik-tamamlanmış (COMPLETED) bir görüşmeyi "gerçekleşmedi" diyerek
  // düzeltir → CANCELLED (meetingController.ts markMeetingNotHappened).
  markNotHappened: (api: BoundClient, meetingId: string, reason?: string): Promise<ApiResult<{ meeting: Meeting }>> =>
    api<{ meeting: Meeting }>(`/api/meetings/${meetingId}/mark-not-happened`, { method: 'POST', body: { reason } }),

  submitCheckIn: (api: BoundClient, meetingId: string, data: CheckIn): Promise<ApiResult<CheckIn>> =>
    api<CheckIn>(`/api/meetings/${meetingId}/check-in`, { method: 'POST', body: data }),

  // E-3e: KENDİ yazdığın görüşme değerlendirmesini okur. Kayıt yoksa 404, taraf
  // değilsen 403 döner (backend zaten taraf/admin kontrolü yapıyor) — çağıran
  // bu iki durumu ayrı ele almalı (bkz. MeetingFeedbackReadout).
  getFeedback: (api: BoundClient, meetingId: string): Promise<ApiResult<MeetingFeedback>> =>
    api<MeetingFeedback>(`/api/meetings/${meetingId}/feedback`),

  getPairSignal: (
    api: BoundClient,
    mentorId: string,
    mentiId: string,
  ): Promise<ApiResult<{ signal: 'GREEN' | 'YELLOW' | 'RED'; reasons: string[]; avgRating: number | null }>> =>
    api(`/api/meetings/pair-signal?mentorId=${mentorId}&mentiId=${mentiId}`),
};
