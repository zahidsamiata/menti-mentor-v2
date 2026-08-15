export type DiscType = 'D' | 'I' | 'S' | 'C';

export interface MentorListItem {
  id: string;
  fullName: string;
  email: string;
  // KARAR 5: menti→mentör bakışında backend discType'ı response'a HİÇ koymaz → alan gelmez.
  // Bu yüzden opsiyonel; menti bağlamında UI zaten DISC göstermez (savunma-derinliği).
  discType?: DiscType | null;
  sectorTags: string[];
  skills: string[];
  bioSummary: string | null;
  expertiseDetails: string | null;
  isActive: boolean;
  // Profil fotoğrafı — yoksa kartta baş-harf avatarına düşülür.
  avatarUrl?: string | null;
}

export interface MentorsListResponse {
  items: MentorListItem[];
  total: number;
}

export interface RankedMenti {
  mentiId: string;
  mentiName: string;
  mentiTenantId: string;
  // Profil fotoğrafı — yoksa kartta baş-harf avatarına düşülür.
  mentiAvatarUrl?: string | null;
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
