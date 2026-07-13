import { apiClient } from './client';
import type { ApiResult } from '@/types/api';

export interface UserProfileData {
  id: string;
  fullName: string;
  email: string;
  role: string;
  discType: 'D' | 'I' | 'S' | 'C' | null;
  discResultCard: {
    archetype: string;
    icon: string;
    superPower: string;
    description: string;
    strengths: string[];
    growthArea: string;
    compatibleWith: string[];
    dominant: string;
  } | null;
  bioSummary: string | null;
  expertiseDetails: string | null;
  targetAudience: string | null;
  education: unknown;
  pastProjects: unknown;
  volunteerHistory: unknown;
  skills: string[];
  sectorTags: string[];
  linkedinUrl: string | null;
  instagramUrl: string | null;
  expectationCategories: string[];
  timeCommitment: string | null;
  interactionStyle: string | null;
  approvalStatus: string;
}

export interface ProfileUpdatePayload {
  bioSummary?: string | null;
  expertiseDetails?: string | null;
  targetAudience?: string | null;
  education?: string;
  pastProjects?: string;
  volunteerHistory?: string;
  skills?: string[];
  sectorTags?: string[];
  linkedinUrl?: string | null;
  instagramUrl?: string | null;
}

export function fetchUserProfile(
  userId: string,
  token: string,
  tenantId: string,
): Promise<ApiResult<UserProfileData>> {
  return apiClient<UserProfileData>(`/api/users/${userId}`, { token, tenantId });
}

export function updateMyProfile(
  data: ProfileUpdatePayload,
  token: string,
  tenantId: string,
): Promise<ApiResult<UserProfileData>> {
  return apiClient<UserProfileData>('/api/users/me/profile', {
    method: 'PATCH',
    body: data,
    token,
    tenantId,
  });
}
