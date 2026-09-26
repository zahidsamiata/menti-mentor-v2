/**
 * Auth endpoint çağrıları — AuthProvider'dan bağımsız, saf API fonksiyonları.
 * Her fonksiyon ApiResult<T> döner; çağıran kod result.ok ile dallanır.
 */

import { apiClient } from './client';
import type { LoginResponse, RefreshResponse } from '@/types/auth';

/**
 * AN-30 / KARAR-34 — granüler rıza grubu gövdesi. Register (form) ucu VE OAuth
 * complete-registration ucu AYNI şekli paylaşır (backend `GranularConsentSchema`,
 * authController.ts) — DRY, tek yerde tanımlı.
 */
export interface GranularConsentPayload {
  discMatching: true;
  foreignStorage: true;
  dataProcessing: true;
  anonymizedImprovement: true;
  crossTenantSharing?: boolean;
  oceanProfiling?: boolean;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
  role: 'MENTOR' | 'MENTI';
  tenantSlug: string;
  // KVKK Md.5 — backend z.literal(true) ile zorunlu. K4 (18+ beyanı) bu onayın
  // metnine gömülü (PO kararı: tek kutu) — ayrı alan yok.
  kvkkConsent: boolean;
  // Davet token'ı (davet linkindeki ?token). Backend doğrular → geçerliyse davetli APPROVED
  // olur ve login PENDING 403'üne takılmaz (PO kararı 2026-09-01, Seçenek A).
  inviteToken?: string;
  // AN-30 / KARAR-34 — granüler rıza ekranı FLAG'lı (NEXT_PUBLIC_GRANULAR_CONSENT_ENABLED,
  // varsayılan kapalı; bkz. _RegisterContent.tsx). Flag kapalıyken bu alan HİÇ gönderilmez →
  // backend eski tek-kutu (`kvkkConsent`) davranışını aynen uygular.
  granularConsent?: GranularConsentPayload;
}

export interface RegisterResponse {
  message: string;
  user: { id: string; email: string; fullName: string; role: string; approvalStatus: string };
}

// AN-30 / KARAR-34 (OAuth ayağı) — `/oauth/callback` sayfasının `pendingConsentToken` query
// param'ıyla aldığı bekleyen-kayıt token'ını granüler rıza ile tamamlar. Bu param yalnız
// backend `GRANULAR_CONSENT_ENABLED` AÇIKKEN gelir; flag kapalıyken hiç üretilmez (bkz.
// oauth/callback/page.tsx — kendi flag'ine bakmaz, yalnız bu param'ın varlığına bakar).
export interface CompleteOAuthRegistrationPayload {
  pendingToken: string;
  granularConsent: GranularConsentPayload;
}

export interface CompleteOAuthRegistrationResponse {
  accessToken: string;
  isNewUser: boolean;
}

export const authApi = {
  login: (email: string, password: string) =>
    apiClient<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    }),

  register: (payload: RegisterPayload) =>
    apiClient<RegisterResponse>('/api/auth/register', {
      method: 'POST',
      body: payload,
    }),

  // AN-30 / KARAR-34 (OAuth ayağı) — granüler rıza ekranından sonra bekleyen OAuth kaydını
  // tamamlar. Register'dan farkı: redirect değil JSON döner (frontend zaten /oauth/callback
  // sayfasındadır) — bkz. backend authController.completeOAuthRegistration.
  completeOAuthRegistration: (payload: CompleteOAuthRegistrationPayload) =>
    apiClient<CompleteOAuthRegistrationResponse>('/api/auth/oauth/complete-registration', {
      method: 'POST',
      body: payload,
    }),

  // İş 3 P3: reddedilen kullanıcı aynı e-posta+şifreyle tekrar başvurur (REJECTED→PENDING).
  reapply: (email: string, password: string) =>
    apiClient<{ message: string; approvalStatus: string }>('/api/auth/reapply', {
      method: 'POST',
      body: { email, password },
    }),

  refresh: (refreshToken: string) =>
    apiClient<RefreshResponse>('/api/auth/refresh', {
      method: 'POST',
      body: { refreshToken },
    }),

  logout: (refreshToken: string, accessToken: string) =>
    apiClient('/api/auth/logout', {
      method: 'POST',
      body: { refreshToken },
      token: accessToken,
    }),

  // Şifre sıfırlama e-postası tetikler. Backend, kullanıcı tespitini önlemek için
  // e-posta kayıtlı olmasa da aynı generic mesajı döndürür.
  forgotPassword: (email: string) =>
    apiClient<{ message: string }>('/api/auth/forgot-password', {
      method: 'POST',
      body: { email },
    }),

  // E-postadaki token + yeni şifre ile şifreyi günceller.
  resetPassword: (token: string, password: string) =>
    apiClient<{ message: string }>('/api/auth/reset-password', {
      method: 'POST',
      body: { token, password },
    }),
};
