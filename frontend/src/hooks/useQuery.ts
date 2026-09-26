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
 *  - F-32: `cacheKey` verilirse stale-while-revalidate — önbellekte veri varsa beklemeden
 *    gösterilir (isLoading=false), arka planda tazelenir. Önbellek bellek içi ve oturuma
 *    (kullanıcı+kurum) bağlıdır; ayrıntı ve sızıntı önlemleri: `lib/queryCache.ts`.
 *    `cacheKey` sorgunun TÜM parametrelerini içermelidir (sayfa, filtre, kimlik…).
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ApiResult } from '@/types/api';
import { queryCacheTicket, readQueryCache, writeQueryCache } from '@/lib/queryCache';

interface UseQueryOptions<T> {
  enabled?: boolean;
  /** Verilirse yanıt oturuma bağlı bellek içi önbellekte tutulur (F-32). */
  cacheKey?: string;
}

interface UseQueryReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/** Tazelenen veri öncekiyle aynıysa referansı koru — `[data]` effect'leri (form doldurma) boşuna tetiklenmesin. */
function sameData(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

export function useQuery<T>(
  fetcher: () => Promise<ApiResult<T>>,
  deps: unknown[] = [],
  options: UseQueryOptions<T> = {},
): UseQueryReturn<T> {
  const { enabled = true, cacheKey } = options;
  const [data, setData] = useState<T | null>(() =>
    enabled && cacheKey ? readQueryCache<T>(cacheKey) ?? null : null,
  );
  const [isLoading, setIsLoading] = useState(
    () => enabled && !(cacheKey && readQueryCache<T>(cacheKey) !== undefined),
  );
  const [error, setError] = useState<string | null>(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;
  const cacheKeyRef = useRef(cacheKey);
  cacheKeyRef.current = cacheKey;

  const runFetch = useCallback((silent: boolean) => {
    if (!enabled) return;
    const key = cacheKeyRef.current;
    const ticket = queryCacheTicket();
    if (!silent) setIsLoading(true);
    setError(null);
    fetcherRef.current()
      .then((result) => {
        if (result.ok) {
          if (key) writeQueryCache(key, result.data, ticket);
          setData((prev) => (sameData(prev, result.data) ? prev : result.data));
        } else setError(result.error.message ?? 'Veri yüklenemedi.');
      })
      .finally(() => setIsLoading(false));
  }, [enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  const doFetch = useCallback(() => runFetch(false), [runFetch]);

  useEffect(() => {
    if (!enabled) return;
    const cached = cacheKey ? readQueryCache<T>(cacheKey) : undefined;
    if (cached !== undefined) {
      // Önbellekten hemen göster, arka planda sessizce tazele.
      setData((prev) => (sameData(prev, cached) ? prev : cached));
      runFetch(true);
    } else {
      runFetch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, cacheKey, ...deps]);

  return { data, isLoading, error, refetch: doFetch };
}
