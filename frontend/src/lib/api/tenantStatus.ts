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
  tenant: { verificationStatus: TenantVerificationStatus } | null;
}

export async function fetchOwnTenantVerificationStatus(
  accessToken: string,
  tenantId: string,
): Promise<TenantVerificationStatus | null> {
  const result = await apiClient<MeTenantStatusResponse>('/api/auth/me', {
    token: accessToken,
    tenantId,
    withRefresh: false,
  });
  return result.ok ? (result.data.tenant?.verificationStatus ?? null) : null;
}
