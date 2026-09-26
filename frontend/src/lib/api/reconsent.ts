import { apiClient } from './client';
import type { ApiResult } from '@/types/api';

/**
 * GV-18 — rıza metni sürümü güncellenince kullanıcı yeniden onaylar.
 * userId TOKEN'dan alınır; istemci id göndermez (IDOR yok, komşu uç /api/auth/me ile aynı desen).
 */
export function submitReconsent(token: string, tenantId: string): Promise<ApiResult<{ needsReconsent: boolean }>> {
  return apiClient<{ needsReconsent: boolean }>('/api/auth/reconsent', {
    method: 'POST',
    token,
    tenantId,
  });
}
