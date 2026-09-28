# Silinen / değişen kod arşivi — 2026-09-28

## AJ-73 · OAuth dönüşünde erişim anahtarı adreste

### 1) `backend/src/controllers/authController.ts` — `oauthCallback` başarı yönlendirmesi
- **Eski hâl (AYNEN):**
```ts
    setRefreshCookie(res, result.refreshToken);
    const params = new URLSearchParams({
      accessToken: result.accessToken,
      isNewUser: String(result.isNewUser),
    });
    return res.redirect(`${config.oauth.frontendCallbackUrl}?${params.toString()}`);
```
  Fonksiyon üstündeki eski yorum (AYNEN):
```
 * Başarı: frontend'e accessToken + refreshToken + isNewUser query parametreleriyle yönlendir.
 * Hata: frontend'e error kodu ile yönlendir.
 *
 * Neden redirect? OAuth callback browser tablosunda gerçekleşir; SPA'ya mesaj
 * iletmenin standart yolu URL parametresidir. Frontend'in bu değerleri
 * LocalStorage'a taşıması ve URL'i temizlemesi gerekir.
```
- **Neden yazılmıştı:** OAuth dönüşü tarayıcı yönlendirmesiyle gelir; SPA'ya erişim anahtarını iletmenin en kısa yolu adres parametresiydi (yenileme anahtarı sonradan HttpOnly çereze taşındı, erişim anahtarı adreste kaldı).
- **Neden değişti:** adresteki anahtar tarayıcı geçmişine, erişim günlüklerine ve Referer başlığına düşer. Yenileme çerezi zaten set edildiği için frontend anahtarı `POST /api/auth/refresh` ile alabilir; e-posta/şifre `login` ucu da anahtarı gövdede döndürür.
- **Son commit (değişiklikten önce, backend):** `b79547dd51c24bae7a3a96348f475d8268488124`
- **Geri alma:** backend'de `git revert <AJ-73 backend commit>` (frontend yeni sürümü eski backend'le de çalışır; adresteki anahtarı yok sayar, çerezden devam eder).

### 2) `frontend/src/app/oauth/callback/page.tsx` — adresteki anahtarla oturum açma
- **Eski hâl (dosyanın TAMAMI, AYNEN):**
```tsx
'use client';

/**
 * OAuth Callback Sayfası
 *
 * Backend'in başarılı OAuth sonrası yönlendirdiği URL.
 * Parametreler: accessToken, refreshToken, expiresIn, isNewUser (veya error)
 *
 * Önceki sorun: localStorage'a yazılıyordu ama AuthProvider state güncellenmiyordu.
 * Düzeltme: loginWithTokens() state + localStorage + user profili günceller.
 */

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { UI_TEXT } from '@/lib/uiText';

function OAuthCallbackInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { loginWithTokens } = useAuth();

  useEffect(() => {
    const error = params.get('error');
    if (error) {
      router.replace(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    const accessToken = params.get('accessToken');
    const expiresIn = parseInt(params.get('expiresIn') ?? '3600', 10);

    if (!accessToken) {
      router.replace('/login?error=GECERSIZ_CALLBACK');
      return;
    }

    // refreshToken HttpOnly cookie'de (backend redirect'te set etti)
    loginWithTokens(accessToken, expiresIn)
      .then(() => {
        const isNewUser = params.get('isNewUser') === 'true';
        router.replace(isNewUser ? '/dashboard?welcome=1' : '/dashboard');
      })
      .catch(() => {
        router.replace('/login?error=SUNUCU_HATASI');
      });
  }, [params, router, loginWithTokens]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground text-sm animate-pulse">Giriş yapılıyor…</p>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm animate-pulse">{UI_TEXT.status.loading}</p>
        </div>
      }
    >
      <OAuthCallbackInner />
    </Suspense>
  );
}
```
- **Neden yazılmıştı:** backend erişim anahtarını adreste gönderiyordu; sayfa onu okuyup `loginWithTokens` ile oturum açıyordu.
- **Neden değişti:** anahtar artık adreste gelmiyor; sayfa AuthProvider'ın açılıştaki sessiz yenilemesini (çerezle `/api/auth/refresh`) bekler. Adreste eski biçimde anahtar gelirse kullanılmaz, adresten silinir. `loginWithTokens` (AuthProvider) yerinde bırakıldı — şu an çağıranı yok; kaldırılması silme protokolüne tabidir.
- **Son commit (değişiklikten önce, çatı):** `59d5c79be97ec8e4a4cdde729eeeef7c43af8ae6`
- **Geri alma:** `git checkout 59d5c79 -- frontend/src/app/oauth/callback/page.tsx` (yalnız backend de geri alınmışsa anlamlı).
