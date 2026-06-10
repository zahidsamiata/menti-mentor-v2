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
}

export interface RegisterResponse {
  message: string;
  user: { id: string; email: string; fullName: string; role: string; approvalStatus: string };
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
};
