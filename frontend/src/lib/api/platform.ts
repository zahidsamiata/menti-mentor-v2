import { apiClient } from './client';

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

// Platform admin oturumu HttpOnly cookie ile yönetilir — localStorage kullanılmaz.
// Token tarayıcı tarafından otomatik gönderilir; frontend'in okuması/saklaması gerekmez.

async function platformFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    credentials: 'include', // HttpOnly cookie'yi otomatik gönder
    headers: {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) ?? {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as Record<string, unknown>;
    throw new Error((err['message'] as string) ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function platformLogin(email: string, password: string): Promise<{ ok: boolean }> {
  return platformFetch<{ ok: boolean }>('/api/platform/auth', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function platformLogout(): Promise<void> {
  await platformFetch<{ ok: boolean }>('/api/platform/logout', { method: 'POST' });
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

export async function getPlatformLogs(limit = 100, category?: string, level?: string) {
  const cat = category ? `&category=${encodeURIComponent(category)}` : '';
  const lvl = level ? `&level=${encodeURIComponent(level)}` : '';
  return platformFetch<{ items: SystemLog[]; total: number }>(`/api/platform/logs?limit=${limit}${cat}${lvl}`);
}

export async function getPlatformHealth() {
  return platformFetch<PlatformHealth>('/api/platform/health');
}

// ─── Kullanıcı şikayetleri + otomatik tespit ─────────────────────────────────
export async function listUserReports(status?: string) {
  const q = status ? `?status=${status}` : '';
  return platformFetch<{ items: UserReport[]; total: number }>(`/api/platform/user-reports${q}`);
}

export async function reviewUserReport(id: string, status: 'REVIEWED' | 'DISMISSED', note?: string) {
  return platformFetch<{ ok: boolean }>(`/api/platform/user-reports/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status, note }),
  });
}

export async function getAnomalies() {
  return platformFetch<{ items: AnomalyFlag[]; total: number }>('/api/platform/anomalies');
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
  meta?: Record<string, unknown> | null;
  createdAt: string;
}

export interface UserReport {
  id: string;
  tenantId: string;
  tenantName: string;
  reason: string;
  description: string | null;
  status: string;
  reviewNote: string | null;
  createdAt: string;
  reporter: { fullName: string };
  target: { fullName: string };
}

export interface AnomalyFlag {
  userId: string;
  fullName: string;
  tenantId: string;
  reportCount: number;
  rejectionCount: number;
  reasons: string[];
}

export interface PlatformHealth {
  status: string;
  db: string;
  mail: string;
  recentErrors: number;
  env: string;
  uptime: number;
  memory: { heapUsed: number; heapTotal: number; rss: number };
  nodeVersion: string;
}
