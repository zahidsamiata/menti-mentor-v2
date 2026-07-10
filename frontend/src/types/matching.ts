export type DiscType = 'D' | 'I' | 'S' | 'C';

export interface MentorListItem {
  id: string;
  fullName: string;
  email: string;
  discType: DiscType | null;
  sectorTags: string[];
  skills: string[];
  bioSummary: string | null;
  expertiseDetails: string | null;
  isActive: boolean;
}

export interface MentorsListResponse {
  items: MentorListItem[];
  total: number;
}

export interface RankedMenti {
  mentiId: string;
  mentiName: string;
  mentiTenantId: string;
  totalScore: number;
  sectorScore: number;
  discScore: number;
  confidence: number;
  skills: string[];
  fallbackLevel: 0 | 1 | 2 | 3;
  warnings: string[];
}

export interface RankedMentisResponse {
  items: RankedMenti[];
  fallbackLevel: 0 | 1 | 2 | 3;
}

export interface CreateMatchRequestPayload {
  requesterUserId: string;
  targetType: 'USER' | 'JOB_LISTING';
  targetId: string;
  requestMessage?: string;
}

export interface MatchRequest {
  id: string;
  tenantId: string;
  requesterUserId: string;
  targetType: 'USER' | 'JOB_LISTING';
  targetId: string;
  requestMessage: string | null;
  createdAt: string;
}

export interface MentorFilter {
  mentorId: string;
  minCompatibilityScore: number;
  blockedDiscTypes: DiscType[];
  filterEnabled: boolean;
}
