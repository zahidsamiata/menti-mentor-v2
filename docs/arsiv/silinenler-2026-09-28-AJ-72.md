# Silinenler / değişenler — 2026-09-28 · AJ-72 (askıdaki kurum ekranı)

> Bu işte davranış SİLİNMEDİ. Değişen üç kod parçası ile beklentisi değişen iki test aşağıda AYNEN duruyor.
> Son commit (değişiklik öncesi main): `03da006`. Toplu geri alma: çatı PR'ını revert et.

## 1) `frontend/src/lib/api/tenantStatus.ts` — `fetchOwnTenantVerificationStatus`

- **Neden yazılmıştı:** AJ-35/AJ-59 — kurum yöneticisinin girişten sonra kurum başvuru durumunu okuması (`/api/auth/me`, `withRefresh:false`).
- **Neden değişti:** aynı yanıttaki askı bilgisi (`tenant.isSuspended`) de gerekti; ikinci istek atmamak için fonksiyon
  `fetchOwnTenantStatus` oldu ve `{ verificationStatus, isSuspended }` döndürüyor (istek aynı: yol, anahtar, `withRefresh:false`).
- **Geri alma:** `git show 03da006:frontend/src/lib/api/tenantStatus.ts > frontend/src/lib/api/tenantStatus.ts` (+ AuthProvider ve OAuth callback çağrıları).

Eski hâl (AYNEN, dosyanın ilgili bölümü):

```ts
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
```

## 2) `frontend/src/lib/postLoginRedirect.ts` — "Bilerek KAPSAM DIŞI" notu + `getTenantReviewRedirect`

- **Neden yazılmıştı:** AJ-59 — dondurulmuş (onaylı ama askıda) kurumu durum ekranına göndermek giriş döngüsü yaratırdı;
  askıdaki yöneticiye ne gösterileceği o gün karara bırakılmıştı, yönetici panele gidiyordu.
- **Neden değişti:** AJ-72 — askı ekranı (`/kurum-askida`) geldi; dondurulmuş kurumun yöneticisi artık oraya gider
  (durum ekranına DEĞİL — döngü kuralı korunuyor). Yöneticiye yalnız nötr durum cümlesi gösterilir.
- **Geri alma:** `git show 03da006:frontend/src/lib/postLoginRedirect.ts > frontend/src/lib/postLoginRedirect.ts`

Eski hâl (AYNEN):

```ts
 * Bilerek KAPSAM DIŞI: platformun dondurduğu (onaylı ama askıdaki, `isActive=false`) kurum.
 * Onun durumu `verificationStatus` değil `tenant.isSuspended` ile gelir; bu modül ona özel bir
 * hedef seçmez (yönetici eskisi gibi panele gider). Durum ekranı APPROVED kurum için "Onaylandı →
 * Giriş Yap" gösterdiğinden dondurulmuş kurumu oraya göndermek giriş döngüsü yaratırdı. Askıdaki
 * yöneticiye ne gösterileceği ürün kararıdır (kuruma görünen metin).
 */
import type { TenantVerificationStatus } from '@/lib/api/selfServe';
...
  /** Yalnız kurum yöneticisi için okunur; okunamadıysa null/undefined (yönlendirme değişmez). */
  tenantVerificationStatus?: TenantVerificationStatus | null;
}

/**
 * Kurum yöneticisinin durum ekranına gitmesi gerekiyorsa o adresi, gerekmiyorsa null döner.
 * İki giriş yolunun ORTAK kuralı budur.
 */
export function getTenantReviewRedirect(user: Pick<PostLoginUser, 'role' | 'tenantVerificationStatus'>): string | null {
  if (user.role !== 'ADMIN') return null;
  const status = user.tenantVerificationStatus;
  if (status && TENANT_REVIEW_SCREEN_STATUSES.includes(status)) return TENANT_REVIEW_PATH;
  return null;
}
```

## 3) `frontend/src/providers/AuthProvider.tsx` ve `frontend/src/app/oauth/callback/page.tsx` — çağrı satırları

- **Neden değişti:** 1'deki yeni okuyucuya geçiş; yönetici girişinde askı bilgisi de taşınır (`tenantIsSuspended`).

Eski hâl (AYNEN; import satırları `fetchOwnTenantVerificationStatus` idi):

```ts
// AuthProvider.login
    if (userData.role !== 'ADMIN') return userData;
    const tenantVerificationStatus = await fetchOwnTenantVerificationStatus(newToken, userData.tenantId);
    return { ...userData, tenantVerificationStatus };
// OAuth callback
      const tenantVerificationStatus = await fetchOwnTenantVerificationStatus(accessToken, user.tenantId);
      router.replace(getOAuthRedirect({ role: user.role, tenantVerificationStatus }, { isNewUser }));
```

## 4) Beklentisi değişen iki test

- **Neden değişti:** iki test AJ-59'daki "dondurulmuş kurumun yöneticisi panele gider" davranışını sabitliyordu; AJ-72 ile
  hedef askı ekranı oldu. "Durum ekranına gönderilmez" beklentisi (döngü koruması) iki testte de AYNEN korunuyor.

`frontend/src/__tests__/login-tenant-review-redirect.test.tsx` (eski hâl, AYNEN):

```ts
  it('AJ-59 · negatif: dondurulmuş (onaylı ama askıda) kurumun yöneticisi durum ekranına gönderilmez', async () => {
    // Askı `verificationStatus` değil `isSuspended` ile gelir; onaylı kurum durum ekranında
    // "Onaylandı → Giriş Yap" görür → giriş döngüsü. Mevcut davranış (panel) korunur.
    expect(await submitAs({ ...admin, tenantVerificationStatus: 'APPROVED', isSuspended: true }))
      .toBe('/admin/waiting-room');
  });
```

`frontend/src/__tests__/oauth-callback-redirect.test.tsx` (eski hâl, AYNEN):

```ts
  it('negatif: dondurulmuş (onaylı ama askıda) kurumun yöneticisi durum ekranına GÖNDERİLMEZ — mevcut davranış korunur', async () => {
    mockBackend('ADMIN', { verificationStatus: 'APPROVED', isSuspended: true });
    renderCallback('isNewUser=false');
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(OAUTH_DEFAULT_PATH));
    expect(replaceMock).not.toHaveBeenCalledWith(TENANT_REVIEW_PATH);
  });
```
