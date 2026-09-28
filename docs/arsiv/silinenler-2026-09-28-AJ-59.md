# Silinenler / taşınanlar — 2026-09-28 · AJ-59 (OAuth ile giren kurum yöneticisinin yönlendirmesi)

> Bu işte davranış SİLİNMEDİ; giriş sonrası yönlendirme kuralı `LoginForm.tsx`'ten ortak saf modüle
> (`frontend/src/lib/postLoginRedirect.ts`) TAŞINDI ve OAuth dönüşü de aynı kuralı kullanmaya başladı.
> Eski metin geri alma kolaylığı için aşağıda AYNEN duruyor. Son commit (değişiklik öncesi main): `d277ee8`.

## 1) `frontend/src/components/organisms/LoginForm.tsx` — yerel `getSmartRedirect` + sabitler

- **Neden yazılmıştı:** e-posta/şifre girişinde rol + onay + kurum durumuna göre hedef seçmek (U-07, AJ-24, AJ-35).
- **Neden değişti:** sosyal giriş dönüşü (OAuth callback) bu kuralı görmüyordu; inceleme bekleyen/reddedilen
  kurumun yöneticisi panele gidiyordu. Kural tek yere alındı (`getSmartRedirect`, `getTenantReviewRedirect`,
  `PENDING_APPROVAL_PATH`, `TENANT_REVIEW_PATH`, `TENANT_REVIEW_SCREEN_STATUSES` — içerik birebir aynı).
- **Geri alma:** `git show d277ee8:frontend/src/components/organisms/LoginForm.tsx > frontend/src/components/organisms/LoginForm.tsx`

Eski hâl (AYNEN):

```ts
// Giriş sonrası akıllı yönlendirme (dokümandaki durum tablosuna birebir uyar):
//   status PENDING  → /pending-approval  (backend 403 → catch bloğu yakalar)
//   status APPROVED → rol bazlı:
//     ADMIN   → kurum başvurusu inceleniyor/reddedildi ise /onboarding/stk/pending-review (AJ-35),
//               değilse /admin/waiting-room
//     MENTOR  → discType yoksa /onboarding (8-soru DISC), varsa /mentor
//     MENTI   → discType yoksa /onboarding (8-soru DISC), varsa /menti
// Not: Platform admin (/platform) ayrı endpoint'ten giriş yapar; buradan yönlendirilmez.
function getSmartRedirect(user: {
  role: string;
  approvalStatus: string;
  discType: string | null;
  tenantVerificationStatus?: TenantVerificationStatus | null;
}): string {
  if (user.approvalStatus === 'PENDING') return '/pending-approval';
  if (user.role === 'ADMIN') {
    // AJ-35: eskiden kurum durum ekranı yalnız kayıt anında açılıyordu; sonradan giriş yapan
    // yönetici "inceleniyor/reddedildi" bilgisini göremiyordu. Düzeltme istenen kurum panele
    // gider (düzeltme formu panel bandında — TenantCorrectionBanner).
    if (user.tenantVerificationStatus && TENANT_REVIEW_SCREEN_STATUSES.includes(user.tenantVerificationStatus)) {
      return TENANT_REVIEW_PATH;
    }
    return '/admin/waiting-room';
  }
  // /disc-test = adaptif Likert (mevcut kullanıcı). Yeni kullanıcı (discType=null) → /onboarding.
  if (!user.discType) return '/onboarding';
  if (user.role === 'MENTOR') return '/mentor';
  if (user.role === 'MENTI') return '/menti';
  return '/dashboard';
}

// PENDING kullanıcının token'ı olmadığından e-postayı bekleme ekranına biz taşırız (U-07).
// AJ-24: URL'ye (`?email=`) konmaz — adres geçmişe/erişim günlüğüne düşmesin; yalnız sekme belleği.
const PENDING_APPROVAL_PATH = '/pending-approval';

/** Kurum başvuru durum ekranı (kayıt sonrası da buraya gidilir — Step4Account). */
const TENANT_REVIEW_PATH = '/onboarding/stk/pending-review';
/** Yöneticiyi panel yerine durum ekranına götüren kurum durumları. */
const TENANT_REVIEW_SCREEN_STATUSES: readonly TenantVerificationStatus[] = ['PENDING_REVIEW', 'REJECTED'];
```

## 2) `frontend/src/providers/AuthProvider.tsx` — `login` içindeki kurum durumu okuması

- **Neden yazılmıştı:** AJ-35 — yönetici girişinde kurum durumunu `/api/auth/me`'den okumak.
- **Neden değişti:** aynı okuma OAuth dönüşünde de gerekiyor → ortak `frontend/src/lib/api/tenantStatus.ts`
  (`fetchOwnTenantVerificationStatus`). Tek fark: `withRefresh: false` (401'de sessiz yenileme tetiklenmez —
  AJ-73: aynı çerezle ikinci yenileme rotasyon kilidinde reddedilir). Okunamazsa yine `null`.
- **Geri alma:** `git show d277ee8:frontend/src/providers/AuthProvider.tsx > frontend/src/providers/AuthProvider.tsx`

Eski hâl (AYNEN):

```ts
    if (userData.role !== 'ADMIN') return userData;
    const meResult = await apiClient<{ tenant: { verificationStatus: TenantVerificationStatus } | null }>(
      '/api/auth/me',
      { token: newToken, tenantId: userData.tenantId },
    );
    const tenantVerificationStatus = meResult.ok ? (meResult.data.tenant?.verificationStatus ?? null) : null;
    return { ...userData, tenantVerificationStatus };
```
(ve üstte: `import type { TenantVerificationStatus } from '@/lib/api/selfServe';`)

## 3) `frontend/src/app/oauth/callback/page.tsx` — sabit hedef

- **Neden yazılmıştı:** AJ-73 — oturum çerezle kurulunca panele/hoş geldin'e gitmek.
- **Neden değişti:** hedef artık ortak kuraldan (`getOAuthRedirect`); yönetici değilse sonuç aynı.
- **Geri alma:** `git show d277ee8:frontend/src/app/oauth/callback/page.tsx > frontend/src/app/oauth/callback/page.tsx`

Eski hâl (AYNEN):

```ts
    if (!isAuthenticated) {
      router.replace(`/login?error=${SESSION_FAILED_ERROR}`);
      return;
    }

    const isNewUser = params.get('isNewUser') === 'true';
    router.replace(isNewUser ? '/dashboard?welcome=1' : '/dashboard');
  }, [params, router, isLoading, isAuthenticated]);
```
