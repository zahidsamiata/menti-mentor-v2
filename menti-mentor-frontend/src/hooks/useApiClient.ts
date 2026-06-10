'use client';

/**
 * Token-aware API client factory hook.
 *
 * Her çağrıda AuthProvider'dan token ve tenantId'yi alıp
 * apiClient'e enjekte eden bağlı versiyon döner.
 *
 * Kullanım:
 *   const api = useApiClient();
 *   const result = await api<MyType>('/api/users');
 */

import { useCallback } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { apiClient, type RequestOptions } from '@/lib/api/client';
import type { ApiResult } from '@/types/api';

type BoundClient = <T>(path: string, options?: Omit<RequestOptions, 'token' | 'tenantId'>) => Promise<ApiResult<T>>;

export function useApiClient(): BoundClient {
  const { accessToken, user } = useAuth();

  return useCallback(
    <T>(path: string, options: Omit<RequestOptions, 'token' | 'tenantId'> = {}) =>
      apiClient<T>(path, {
        ...options,
        token: accessToken ?? undefined,
        tenantId: user?.tenantId,
      }),
    [accessToken, user?.tenantId],
  );
}
