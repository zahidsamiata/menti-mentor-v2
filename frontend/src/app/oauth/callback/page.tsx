'use client';

/**
 * OAuth Callback Sayfası
 *
 * Backend'in sosyal giriş (Google / LinkedIn) sonrası yönlendirdiği adres.
 * Parametreler: `isNewUser` (başarı) veya `error` (hata kodu).
 *
 * AJ-73: erişim anahtarı artık adreste GELMEZ (adresteki anahtar tarayıcı geçmişine, erişim
 * günlüklerine ve Referer başlığına düşüyordu). Backend yenileme anahtarını HttpOnly çereze
 * yazar; oturum, sayfa yenilemesindeki sessiz girişle AYNI yoldan kurulur: AuthProvider açılışta
 * `POST /api/auth/refresh` çağırır (çerezle), bu sayfa yalnız onun sonucunu bekler.
 * Burada ayrıca refresh çağrılmaz — aynı çerezle eşzamanlı ikinci yenileme backend'de
 * reddedilir (token rotasyonu, iyimser kilit) ve oturumu düşürürdü.
 *
 * Eski backend / eski sekme adreste `accessToken` getirirse o değer KULLANILMAZ, adresten
 * temizlenir; oturum yine çerezden kurulur (yeni ön yüz eski backend'le de çalışır).
 */

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { UI_TEXT } from '@/lib/uiText';

/** Eski dönüş biçiminin adreste taşıdığı, artık okunmayan gizli parametreler. */
const LEGACY_SECRET_PARAMS = ['accessToken', 'refreshToken', 'expiresIn'] as const;

/** Oturum çerezden kurulamadıysa giriş sayfasında gösterilecek hata kodu. */
const SESSION_FAILED_ERROR = 'SUNUCU_HATASI';

function OAuthCallbackInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    const error = params.get('error');
    if (error) {
      router.replace(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    // Eski biçimde gelen anahtar kullanılmaz; adres çubuğundan/geçmişten hemen silinir.
    if (LEGACY_SECRET_PARAMS.some((key) => params.has(key))) {
      const cleaned = new URLSearchParams(params.toString());
      LEGACY_SECRET_PARAMS.forEach((key) => cleaned.delete(key));
      const query = cleaned.toString();
      router.replace(query ? `/oauth/callback?${query}` : '/oauth/callback');
      return;
    }

    // AuthProvider'ın açılış yenilemesi (çerezle) bitene kadar bekle.
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace(`/login?error=${SESSION_FAILED_ERROR}`);
      return;
    }

    const isNewUser = params.get('isNewUser') === 'true';
    router.replace(isNewUser ? '/dashboard?welcome=1' : '/dashboard');
  }, [params, router, isLoading, isAuthenticated]);

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
