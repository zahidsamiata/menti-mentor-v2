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

// Menti → Mentör uyum kartı (GET /mentis/:mentiId/mentor-matches).
// KARAR 5: discType YOK — menti mentörün DISC tipini görmez, yalnız uyum skoru (yüzde)
// + jenerik gerekçe. Backend (buildMentiFacingMentorItem) bu şekli garanti eder.
export interface MentorMatch {
  mentorId: string;
  mentorName: string;
  mentorAvatarUrl?: string | null;
  sectorTags: string[];
  skills: string[];
  matchScore: number;          // 0-100 uyum yüzdesi
  compatibilityReason: string; // jenerik ("Ortak sektör…" / "İletişim tarzları uyumlu")
}

export interface MentorMatchesResponse {
  items: MentorMatch[];
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
  // #7(A): "neden uyumlu" gerekçesi — backend buildPublicItem üretir (jenerik, DISC harfi/tipi İÇERMEZ:
  // "Ortak sektör ve ilgi alanları" / "İletişim tarzları uyumlu"). Yoksa "Genel profil uyumu" döner.
  // ⚠️ KARAR 3/5: menti'nin DISC tipi mentöre AÇILMAZ — yalnız bu jenerik metin gösterilir.
  compatibilityReason?: string;
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
