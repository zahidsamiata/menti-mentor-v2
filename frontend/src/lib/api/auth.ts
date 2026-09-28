/**
 * Auth endpoint çağrıları — AuthProvider'dan bağımsız, saf API fonksiyonları.
 * Her fonksiyon ApiResult<T> döner; çağıran kod result.ok ile dallanır.
 */

import { apiClient } from './client';
import type { LoginResponse, RefreshResponse } from '@/types/auth';

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
  // F-05 (G1-26): Cloudflare Turnstile CAPTCHA token'ı. Site key tanımsızsa widget hiç
  // render edilmediğinden bu alan gönderilmez; backend de anahtar yokken no-op'tur.
  captchaToken?: string;
}

// AJ-112: backend kayıtlı ve kayıtsız e-posta için AYNI gövdeyi döner (hesap varlığı gövdeden
// okunamasın) → kullanıcı nesnesi yok. Kayıt sonrası oturum ayrıca /login ile açılır.
export interface RegisterResponse {
  message: string;
}

export interface ChangePasswordResponse {
  message: string;
  /** false: isteği yapan oturumun çerezi bulunamadı, tüm oturumlar kapatıldı. */
  currentSessionKept: boolean;
  revokedSessions: number;
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
  // captchaToken: F-05 (G1-26) — site key tanımsızsa undefined gider, backend no-op'tur.
  forgotPassword: (email: string, captchaToken?: string) =>
    apiClient<{ message: string }>('/api/auth/forgot-password', {
      method: 'POST',
      body: { email, captchaToken },
    }),

  // E-postadaki token + yeni şifre ile şifreyi günceller.
  resetPassword: (token: string, password: string) =>
    apiClient<{ message: string }>('/api/auth/reset-password', {
      method: 'POST',
      body: { token, password },
    }),

  // GV-19: oturum içi şifre değiştirme. Kimlik token'dan alınır; istemci kullanıcı id'si göndermez.
  // Başarıda backend diğer cihazlardaki oturumları kapatır, bu oturumu korur.
  changePassword: (
    currentPassword: string,
    newPassword: string,
    accessToken: string,
    tenantId: string,
  ) =>
    apiClient<ChangePasswordResponse>('/api/auth/change-password', {
      method: 'POST',
      body: { currentPassword, newPassword },
      token: accessToken,
      tenantId,
    }),
};
