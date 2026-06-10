/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

/**
 * Minimal SWR-benzeri veri çekme hook'u.
 *
 * Özellikler:
 *  - Mount'ta otomatik fetch
 *  - Manuel refetch
 *  - Loading / error state
 *  - deps değişince yeniden fetch
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ApiResult } from '@/types/api';

interface UseQueryOptions<T> {
  enabled?: boolean;
}

interface UseQueryReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useQuery<T>(
  fetcher: () => Promise<ApiResult<T>>,
  deps: unknown[] = [],
  options: UseQueryOptions<T> = {},
): UseQueryReturn<T> {
  const { enabled = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const doFetch = useCallback(() => {
    if (!enabled) return;
    setIsLoading(true);
    setError(null);
    fetcherRef.current()
      .then((result) => {
        if (result.ok) setData(result.data);
        else setError(result.error.message ?? 'Veri yüklenemedi.');
      })
      .finally(() => setIsLoading(false));
  }, [enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    doFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);

  return { data, isLoading, error, refetch: doFetch };
}
