/**
 * Oturumdaki kullanıcının KENDİ kurumunun başvuru durumunu okur (giriş sonrası yönlendirme için).
 *
 * `/api/auth/me` askı kapısından muaftır (reddedilen kurumda da yanıt verir) ve kurumu oturumdan
 * alır (IDOR yok). Login ve refresh yanıtları bu alanı taşımaz; bu yüzden yalnız kurum yöneticisi
 * girişinde ek olarak okunur (AJ-35 e-posta girişi, AJ-59 sosyal giriş dönüşü).
 *
 * `withRefresh: false`: bu çağrı 401 alırsa sessiz yenileme TETİKLENMEZ — sosyal giriş dönüşünde
 * AuthProvider'ın açılış yenilemesiyle aynı çerezle ikinci yenileme, token rotasyon kilidinde
 * reddedilip oturumu düşürürdü (AJ-73). Okunamazsa `null` döner; yönlendirme eski davranışa düşer.
 */
import { apiClient } from './client';
import type { TenantVerificationStatus } from './selfServe';

interface MeTenantStatusResponse {
  tenant: { verificationStatus: TenantVerificationStatus; isSuspended?: boolean } | null;
}

/**
 * AJ-72: askı bilgisi (`isSuspended` — dondurma ya da ret) aynı yanıtta gelir; ikinci bir istek
 * atılmaz. Eski backend alanı döndürmezse `false` sayılır (yönlendirme eski davranışa düşer).
 */
export interface OwnTenantStatus {
  verificationStatus: TenantVerificationStatus;
  isSuspended: boolean;
}

export async function fetchOwnTenantStatus(
  accessToken: string,
  tenantId: string,
): Promise<OwnTenantStatus | null> {
  const result = await apiClient<MeTenantStatusResponse>('/api/auth/me', {
    token: accessToken,
    tenantId,
    withRefresh: false,
  });
  if (!result.ok || !result.data.tenant) return null;
  return {
    verificationStatus: result.data.tenant.verificationStatus,
    isSuspended: result.data.tenant.isSuspended === true,
  };
}
