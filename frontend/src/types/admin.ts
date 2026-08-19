/**
 * Admin panel veri tipleri — backend adminController + tagController yanıtlarıyla eşleşir.
 */

import type { UserRole, ApprovalStatus } from './auth';
import type { PaginatedResponse } from './api';

// ─── Onboarding Onay Modülü ───────────────────────────────────────────────────

/** Admin kullanıcı listesi satırı — PII içerir, yalnızca ADMIN rolünde erişilir. */
export interface AdminUser {
  id: string;
  role: UserRole;
  email: string;
  fullName: string;
  isActive: boolean;
  sectorTags: string[];
  skills: string[];
  discType: 'D' | 'I' | 'S' | 'C' | null;
  // #12: normalize DISC vektöründen türetilmiş 1–3 harflik gösterim (ör. "DI", "Di", "DIs"). Backend üretir.
  discLetters?: string | null;
  rematchPriority: boolean;
  rematchCount: number;
  needsOrientation: boolean;
  approvalStatus: ApprovalStatus;
  createdAt: string;
  // Profil fotoğrafı — yoksa kartta baş-harf avatarına düşülür.
  avatarUrl?: string | null;
  // Sertifika rozeti (KARAR 4) — kurum-içi sertifika (TenantMembership.isCertified). Mentörlerde anlamlı.
  isCertified: boolean;
  // #7 Aşama 1: kişi kalite puanı (ham çarpan 0.8–1.2, nötr 1.0). YALNIZ yönetici görür (KVKK §5).
  // Mentörlerde anlamlı (feedback-türevi); üyelik yoksa null. FE 5 üzerinden puana çevirir.
  qualityMultiplier?: number | null;
  // #34: Öğrenme Yolculuğu tamamlanma anı (rol-bazlı; TenantMembership). null = tamamlanmadı → FE "—".
  // Retention göstergesi (Analytical, PII değil). Platform admin'de zaten görünür, STK yöneticisi de görür.
  learningJourneyCompletedAt?: string | null;
  // Onay/red denetim izi (İş 2) + red gerekçesi (İş 3 P1) — yalnız admin görür. userId (ham gösterilmez).
  approvedBy?: string | null;
  approvedAt?: string | null;
  rejectedBy?: string | null;
  rejectedAt?: string | null;
  rejectionReason?: string | null;
  // İş 2: onaylayan/reddeden yöneticinin adı (backend tenant-scoped çözer; yoksa null → "bir yönetici").
  approvedByName?: string | null;
  rejectedByName?: string | null;
}

export type AdminUsersResponse = PaginatedResponse<AdminUser>;

export type ApproveUserResponse  = { message: string; userId: string; approvalStatus: 'APPROVED' };
export type RejectUserResponse   = { message: string; userId: string; approvalStatus: 'REJECTED' };
export type CorrectionResponse   = { message: string; userId: string; approvalStatus: 'PENDING' };

// ─── Taxonomy Modülü ──────────────────────────────────────────────────────────

export type PendingTagStatus = 'PENDING' | 'APPROVED' | 'MERGED' | 'REJECTED';

export interface PendingTag {
  id: string;
  value: string;
  status: PendingTagStatus;
  mergedInto: string | null;
  submittedBy: string;
  createdAt: string;
}

export type PendingTagsResponse = PaginatedResponse<PendingTag>;
export type TagActionResponse   = { message: string; tagId: string };
export type MergeTagResponse    = { message: string; tagId: string; from: string; into: string };

// ─── Eşleşme Paneli (A1) — PII yok: yalnızca ad + arketip + skor ─────────────

export type MatchStatus = 'ACTIVE' | 'COMPLETED' | 'EARLY_EXIT' | 'DISSOLVED';

// #7 Aşama 1: çift ilişki-sağlığı risk sinyali (yalnız yönetici görür). Veri yoksa INSUFFICIENT_DATA.
export type RiskSignal = 'GREEN' | 'YELLOW' | 'RED' | 'INSUFFICIENT_DATA';

export interface AdminMatch {
  id: string;
  mentorName: string;
  mentiName: string;
  predictedScore: number;
  sectorScore: number;
  characterScore: number;
  mentorArchetype: string;
  mentiArchetype: string;
  status: MatchStatus;
  meetingCount: number;
  createdAt: string;
  // #7 Aşama 1: son görüşmelerin check-in'lerinden türeyen risk sinyali + gerekçeler.
  riskSignal?: RiskSignal;
  riskReasons?: string[];
}

export type AdminMatchesResponse = PaginatedResponse<AdminMatch>;

// ─── Sertifika Sonuç Panosu (A4) ─────────────────────────────────────────────

export type CertificationStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'CERTIFIED' | 'FAILED' | 'COOLDOWN';

export interface MentorCertResult {
  userId: string;
  fullName: string;
  isCertified: boolean;
  certificationStatus: CertificationStatus;
  certScore: number | null;
  certAttempts: number;
  certifiedAt: string | null;
  cooldownUntil: string | null;
}

export type CertResultsResponse = PaginatedResponse<MentorCertResult>;

// ─── KPI ─────────────────────────────────────────────────────────────────────

export interface KpiData {
  tenantId: string;
  generatedAt: string;
  stats: {
    totalActiveUsers: number;
    usersByRole: Record<string, number>;
    matching: { activeMatches: number; pendingOptIns: number; rematchPriorityUsers: number };
    feedback: {
      totalFeedbackLogs: number;
      avgNpsByPhase: Record<string, { avgNps: number | null; sampleSize: number }>;
      successRate: number | null;
    };
    activeJobListings: number;
  };
}

// ─── Program Sağlığı / Retention ("kimse kaynıyor mu") — drill-down ──────────

export interface HealthMetricMember {
  id: string;
  fullName: string;
  avatarUrl?: string | null;
  role?: string;
  lastLoginAt?: string | null;
  createdAt?: string;
}

export interface DeadMatchItem {
  optInId: string;
  mentorId: string;
  mentiId: string;
  mentorName: string;
  mentiName: string;
  since: string;
}

export interface HealthMetricsData {
  tenantId: string;
  generatedAt: string;
  thresholds: { passiveDays: number; staleMatchDays: number };
  supplyDemand: { mentors: number; mentis: number; ratio: number | null };
  mentorlessMenti: { count: number; items: HealthMetricMember[] };
  deadMatches: { count: number; items: DeadMatchItem[] };
  passiveMembers: { count: number; items: HealthMetricMember[] };
}

export type NudgeKind = 'PASSIVE' | 'DEAD_MATCH' | 'GENERIC';
export interface NudgeResponse { ok: boolean; targetUserId: string; sentAt: string }

// ─── Düzeltme notu için önceden tanımlı mesajlar ─────────────────────────────

export const CORRECTION_NOTE_PRESETS = [
  'Mezuniyet yılı eksik veya hatalı. Lütfen güncelleyin.',
  'Kurum bilgisi doğrulanamadı. LinkedIn profilinizi ekleyin.',
  'Uzmanlık etiketleriniz çok geneldir. Daha spesifik belirtiniz.',
  'Profil fotoğrafı eksik. Sisteme yükleyiniz.',
  'Biyografi bölümünüz yetersiz. En az 50 kelime ile kendinizi tanıtınız.',
] as const;
