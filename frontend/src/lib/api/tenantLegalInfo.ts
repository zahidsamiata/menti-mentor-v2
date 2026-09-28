/**
 * AN-36 / G1-12 — Kurum yasal bilgileri uçları (KVKK Veri İşleyen Sözleşmesi için).
 *
 * `/api/tenants/:id/settings` ile aynı aile: X-Tenant-Id header'ı KULLANMAZ, tenantId URL param +
 * oturum eşleşmesiyle korunur (backend `authenticateTenantAdminForParam`, yalnız kurumun ADMIN'i).
 */

import type { ApiResult } from '@/types/api';
import type { RequestOptions } from './client';

type BoundClient = <T>(path: string, options?: Omit<RequestOptions, 'token' | 'tenantId'>) => Promise<ApiResult<T>>;

/** Backend `TENANT_LEGAL_INFO_SELECT` ile birebir alan listesi. */
export interface TenantLegalInfo {
  legalName:          string | null;
  legalAddress:       string | null;
  kepAddress:         string | null;
  mersisNo:           string | null;
  taxOffice:          string | null;
  taxNumber:          string | null;
  legalInfoUpdatedAt: string | null;
}

export type TenantLegalInfoInput = Partial<Record<Exclude<keyof TenantLegalInfo, 'legalInfoUpdatedAt'>, string | null>>;

export const tenantLegalInfoApi = {
  get: (api: BoundClient, tenantId: string): Promise<ApiResult<{ legalInfo: TenantLegalInfo }>> =>
    api<{ legalInfo: TenantLegalInfo }>(`/api/tenants/${tenantId}/legal-info`),

  update: (
    api: BoundClient,
    tenantId: string,
    body: TenantLegalInfoInput,
  ): Promise<ApiResult<{ message: string; legalInfo: TenantLegalInfo }>> =>
    api<{ message: string; legalInfo: TenantLegalInfo }>(`/api/tenants/${tenantId}/legal-info`, {
      method: 'PATCH',
      body,
    }),
};
