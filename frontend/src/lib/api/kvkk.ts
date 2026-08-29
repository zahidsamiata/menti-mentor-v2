import { apiClient } from './client';
import type { ApiResult } from '@/types/api';

/**
 * KVKK self-servis hak uçları (G1-05).
 *   - GET  /api/me/data-export   → kullanıcının kendi verisi (JSON, indirilebilir)
 *   - POST /api/me/delete-account → kullanıcı kendi hesabını kapatır (anonimleştirme)
 *
 * userId her iki uçta da TOKEN'dan alınır; istemci id göndermez (IDOR yok).
 */

/** GET /api/me/data-export yanıtı — kullanıcının taşınabilir veri paketi. */
export interface DataExportResponse {
  userId: string;
  exportedAt: string;
  profile: Record<string, unknown>;
  responses: unknown[];
  feedbackLogs: unknown[];
  matchRequests: unknown[];
  consents: unknown[];
  /** Mesaj İÇERİĞİ değil yalnız SAYI (karşı taraf PII'si dışa aktarılmaz). */
  messageCount: number;
}

/** POST /api/me/delete-account yanıtı — hesap kapatıldı (anonimleştirildi). */
export interface DeleteAccountResponse {
  message: string;
  anonymizedInstead: boolean;
}

export function fetchMyDataExport(
  token: string,
  tenantId: string,
): Promise<ApiResult<DataExportResponse>> {
  return apiClient<DataExportResponse>('/api/me/data-export', { token, tenantId });
}

export function deleteMyAccount(
  confirmEmail: string,
  token: string,
  tenantId: string,
): Promise<ApiResult<DeleteAccountResponse>> {
  return apiClient<DeleteAccountResponse>('/api/me/delete-account', {
    method: 'POST',
    body: { confirmEmail },
    token,
    tenantId,
    // Kapatma sonrası token geçersizleşir; 401'de refresh denenip döngüye girilmesin.
    withRefresh: false,
  });
}
