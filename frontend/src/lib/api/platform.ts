import { apiClient } from './client';

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

// Platform admin token'ı localStorage'da saklanır (sadece platform sayfaları kullanır).
export function getPlatformToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('platform_token');
}
export function setPlatformToken(token: string) {
  localStorage.setItem('platform_token', token);
}
export function clearPlatformToken() {
  localStorage.removeItem('platform_token');
}

async function platformFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getPlatformToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((options.headers as Record<string, string>) ?? {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as Record<string, unknown>;
    throw new Error((err['message'] as string) ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function platformLogin(email: string, password: string): Promise<{ accessToken: string }> {
  return platformFetch<{ accessToken: string }>('/api/platform/auth', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function getPlatformStats() {
  return platformFetch<PlatformStats>('/api/platform/stats');
}

export async function listPendingTenants() {
  return platformFetch<{ items: PendingTenant[]; total: number }>('/api/platform/tenants/pending');
}

export async function listAllTenants(page = 1) {
  return platformFetch<{ items: TenantItem[]; total: number; page: number; limit: number }>(
    `/api/platform/tenants?page=${page}`
  );
}

export async function approveTenant(id: string) {
  return platformFetch<{ ok: boolean }>(`/api/platform/tenants/${id}/approve`, { method: 'POST' });
}

export async function rejectTenant(id: string, note?: string) {
  return platformFetch<{ ok: boolean }>(`/api/platform/tenants/${id}/reject`, {
    method: 'POST',
    body: JSON.stringify({ note }),
  });
}

export async function freezeTenant(id: string) {
  return platformFetch<{ ok: boolean }>(`/api/platform/tenants/${id}/freeze`, { method: 'POST' });
}

export async function activateTenant(id: string) {
  return platformFetch<{ ok: boolean }>(`/api/platform/tenants/${id}/activate`, { method: 'POST' });
}

export async function listSuspicionReports(reviewed?: boolean) {
  const q = reviewed !== undefined ? `?reviewed=${reviewed}` : '';
  return platformFetch<{ items: SuspicionReport[]; total: number }>(`/api/platform/suspicion-reports${q}`);
}

export async function reviewReport(id: string, note?: string) {
  return platformFetch<{ ok: boolean }>(`/api/platform/suspicion-reports/${id}/review`, {
    method: 'POST',
    body: JSON.stringify({ note }),
  });
}

export async function getPlatformLogs(limit = 100) {
  return platformFetch<{ items: SystemLog[]; total: number }>(`/api/platform/logs?limit=${limit}`);
}

// ─── Şüphe bildirimi (public) ────────────────────────────────────────────────
export async function submitSuspicionReport(data: {
  tenantName: string;
  reporterName: string;
  reporterRole: string;
  contact: string;
  description: string;
}) {
  const res = await apiClient<{ id: string; ok: boolean }>('/api/suspicion-reports', {
    method: 'POST',
    body: data,
    withRefresh: false,
  });
  return res;
}

// ─── Tip tanımları ───────────────────────────────────────────────────────────

export interface PlatformStats {
  totals: {
    tenants: number;
    users: number;
    mentors: number;
    mentis: number;
    admins: number;
    meetings: number;
    pendingMeetings: number;
    completedMeetings: number;
    pendingTenants: number;
    unreviewedReports: number;
  };
  tenants: TenantItem[];
  recentLogs: SystemLog[];
}

export interface PendingTenant {
  id: string;
  name: string;
  displayName: string | null;
  slug: string;
  isActive: boolean;
  verificationStatus: string;
  verificationNote: string | null;
  createdAt: string;
  users: { fullName: string; email: string }[];
}

export interface TenantItem {
  id: string;
  name: string;
  displayName: string | null;
  slug: string;
  isActive: boolean;
  verificationStatus: string;
  plan: string;
  createdAt: string;
  _count?: { users: number };
}

export interface SuspicionReport {
  id: string;
  tenantName: string;
  reporterName: string;
  reporterRole: string;
  contact: string;
  description: string;
  reviewed: boolean;
  reviewNote: string | null;
  createdAt: string;
}

export interface SystemLog {
  id: string;
  level: string;
  category: string;
  message: string;
  createdAt: string;
}
