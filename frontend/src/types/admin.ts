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
  rematchPriority: boolean;
  rematchCount: number;
  needsOrientation: boolean;
  approvalStatus: ApprovalStatus;
  createdAt: string;
  // Profil fotoğrafı — yoksa kartta baş-harf avatarına düşülür.
  avatarUrl?: string | null;
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

// ─── Düzeltme notu için önceden tanımlı mesajlar ─────────────────────────────

export const CORRECTION_NOTE_PRESETS = [
  'Mezuniyet yılı eksik veya hatalı. Lütfen güncelleyin.',
  'Kurum bilgisi doğrulanamadı. LinkedIn profilinizi ekleyin.',
  'Uzmanlık etiketleriniz çok geneldir. Daha spesifik belirtiniz.',
  'Profil fotoğrafı eksik. Sisteme yükleyiniz.',
  'Biyografi bölümünüz yetersiz. En az 50 kelime ile kendinizi tanıtınız.',
] as const;
