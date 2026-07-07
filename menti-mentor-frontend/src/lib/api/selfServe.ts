/**
 * Self-serve STK onboarding API çağrıları.
 * X-Tenant-Id gerektirmeyen açık endpoint'ler — wizard tamamlanana kadar tenant yok.
 */

import { apiClient } from './client';
import type { ApiResult } from '@/types/api';

export interface SlugCheckResponse {
  available: boolean;
  slug: string;
}

export interface SelfServeRegisterResponse {
  tenant: {
    id: string;
    name: string;
    slug: string;
    onboardingStep: string;
    programTemplate: string;
  };
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
    approvalStatus: string;
  };
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface OnboardingUpdateResponse {
  tenant: {
    id: string;
    name: string;
    slug: string;
    onboardingStep: string;
    logoUrl: string | null;
    primaryColor: string | null;
    programTemplate: string;
  };
}

export interface InvitationResponse {
  invitationLink: string;
  token: string;
  role: 'MENTOR' | 'MENTI';
  expiresIn: string;
  tenant: { id: string; name: string; slug: string };
}

/** GET /api/tenants/self-serve/check-slug?slug=xxx — auth gerektirmez */
export function checkSlugAvailability(slug: string): Promise<ApiResult<SlugCheckResponse>> {
  return apiClient<SlugCheckResponse>(`/api/tenants/self-serve/check-slug?slug=${encodeURIComponent(slug)}`);
}

/** POST /api/tenants/self-serve/register — tenant + admin kullanıcısı oluşturur, JWT döner */
export function selfServeRegister(data: {
  email: string;
  password: string;
  name: string;
  tenantName: string;
  slug: string;
  programTemplate: 'MEZUN' | 'KULUP' | 'GONULLU' | 'OZEL';
}): Promise<ApiResult<SelfServeRegisterResponse>> {
  return apiClient<SelfServeRegisterResponse>('/api/tenants/self-serve/register', {
    method: 'POST',
    body: data,
  });
}

/** PATCH /api/tenants/:id/onboarding — logo, renk, adım günceller */
export function updateOnboarding(
  tenantId: string,
  token: string,
  data: {
    onboardingStep?: string;
    logoUrl?: string;
    primaryColor?: string;
  },
): Promise<ApiResult<OnboardingUpdateResponse>> {
  return apiClient<OnboardingUpdateResponse>(`/api/tenants/${tenantId}/onboarding`, {
    method: 'PATCH',
    body: data,
    token,
  });
}

/** POST /api/tenants/:id/invitations — davet linki oluşturur */
export function createInvitation(
  tenantId: string,
  token: string,
  role: 'MENTOR' | 'MENTI',
): Promise<ApiResult<InvitationResponse>> {
  return apiClient<InvitationResponse>(`/api/tenants/${tenantId}/invitations`, {
    method: 'POST',
    body: { role },
    token,
  });
}
