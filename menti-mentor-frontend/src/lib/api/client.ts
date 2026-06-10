/**
 * Type-safe API istemcisi — 401 token-refresh interceptor dahil.
 *
 * Yenileme akışı:
 *  1. İstek 401 döndürürse refreshCallbackRef (AuthProvider'dan inject edilir) çağrılır
 *  2. Yeni access token alınırsa orijinal istek yeni token ile bir kez tekrar edilir
 *  3. Refresh de başarısızsa null döner → çağıran kod oturumu temizler
 *
 * Tasarım kararı: refreshCallback bir ref üzerinden inject edilir; bu sayede
 * apiClient pure kalır ve AuthProvider context'ine doğrudan bağımlı olmaz.
 * RefreshCallbackRef null iken interceptor devre dışıdır (login/register gibi herkese açık endpoint'ler).
 */

import type { ApiError, ApiResult } from '@/types/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
  body?: unknown;
  token?: string;
  tenantId?: string;
  headers?: Record<string, string>;
  /** true: 401 alınırsa refresh dene ve tekrar et (varsayılan: true) */
  withRefresh?: boolean;
}

/** AuthProvider tarafından set edilir; null iken refresh devre dışı. */
export const refreshCallbackRef: { current: (() => Promise<string | null>) | null } = {
  current: null,
};

export async function apiClient<T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiResult<T>> {
  const { method = 'GET', body, token, tenantId, headers: extra = {}, withRefresh = true } = options;

  const result = await executeRequest<T>(path, method, body, token, tenantId, extra);

  // 401 aldık + refresh mümkünse — bir kez yenile ve tekrar dene
  if (!result.ok && result.status === 401 && withRefresh && refreshCallbackRef.current) {
    const newToken = await refreshCallbackRef.current();
    if (newToken) {
      return executeRequest<T>(path, method, body, newToken, tenantId, extra);
    }
  }

  return result;
}

async function executeRequest<T>(
  path: string,
  method: string,
  body: unknown,
  token: string | undefined,
  tenantId: string | undefined,
  extra: Record<string, string>,
): Promise<ApiResult<T>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...extra,
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (tenantId) headers['X-Tenant-Id'] = tenantId;

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (response.status === 204) return { ok: true, data: undefined as T };

    const json = await response.json() as T | ApiError;

    if (!response.ok) return { ok: false, error: json as ApiError, status: response.status };
    return { ok: true, data: json as T };
  } catch {
    return { ok: false, error: { error: 'NETWORK_ERROR', message: 'Sunucuya ulaşılamıyor.' }, status: 0 };
  }
}
