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

/**
 * Doğrulama (Zod) hatalarında backend `message` alanı GÖNDERMEZ; yalnızca
 * `details` (flatten: { formErrors, fieldErrors }) döner. Bu durumda details'teki
 * (zaten Türkçe) ilk anlamlı mesajı `message`'a taşırız — böylece tüm çağıranlar
 * `error.message` üzerinden generic "Hata" yerine anlamlı açıklama görür.
 * GÜVENLİK: yalnızca Zod'un kullanıcı-dostu alan mesajları yüzeye çıkar; stack/DB/iç detay YOK.
 */
function withValidationMessage(err: ApiError): ApiError {
  if (err.message) return err;
  const d = err.details as unknown as
    | { formErrors?: string[]; fieldErrors?: Record<string, string[]> }
    | undefined;
  const fromField = d?.fieldErrors ? Object.values(d.fieldErrors).flat().find(Boolean) : undefined;
  const fromForm = d?.formErrors?.find(Boolean);
  const msg = fromField ?? fromForm;
  return msg ? { ...err, message: msg } : err;
}

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
  // FormData (dosya yükleme) gönderiliyorsa Content-Type'ı ELLE set ETME — tarayıcının
  // multipart boundary'yi kendisi eklemesi gerekir. Aksi hâlde backend body'yi parse edemez.
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  const headers: Record<string, string> = { ...extra };
  if (!isFormData) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (tenantId) headers['X-Tenant-Id'] = tenantId;

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body:
        body === undefined
          ? undefined
          : isFormData
            ? (body as FormData)
            : JSON.stringify(body),
      credentials: 'include',
    });

    if (response.status === 204) return { ok: true, data: undefined as T };

    const json = await response.json() as T | ApiError;

    if (!response.ok) return { ok: false, error: withValidationMessage(json as ApiError), status: response.status };
    return { ok: true, data: json as T };
  } catch {
    return { ok: false, error: { error: 'NETWORK_ERROR', message: 'Sunucuya ulaşılamıyor.' }, status: 0 };
  }
}
