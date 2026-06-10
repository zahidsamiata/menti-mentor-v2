/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

/**
 * Mutation hook — POST/PATCH/DELETE işlemleri için.
 *
 * Özellikler:
 *  - Tek seferlik async işlem
 *  - Loading / error state
 *  - onSuccess callback (refetch, toast, navigation tetiklemek için)
 *  - onError callback
 */

import { useCallback, useState } from 'react';
import type { ApiResult } from '@/types/api';

interface UseMutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (message: string, variables: TVariables) => void;
}

interface UseMutationReturn<TData, TVariables> {
  mutate: (variables: TVariables) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}

export function useMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<ApiResult<TData>>,
  options: UseMutationOptions<TData, TVariables> = {},
): UseMutationReturn<TData, TVariables> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (variables: TVariables) => {
      setIsLoading(true);
      setError(null);
      const result = await mutationFn(variables);
      setIsLoading(false);
      if (result.ok) {
        options.onSuccess?.(result.data, variables);
      } else {
        const msg = result.error.message ?? 'İşlem başarısız.';
        setError(msg);
        options.onError?.(msg, variables);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mutationFn],
  );

  const reset = useCallback(() => setError(null), []);
  return { mutate, isLoading, error, reset };
}
