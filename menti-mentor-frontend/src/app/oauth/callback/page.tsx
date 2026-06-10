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
    const refreshToken = params.get('refreshToken');
    const expiresIn = parseInt(params.get('expiresIn') ?? '3600', 10);

    if (!accessToken || !refreshToken) {
      router.replace('/login?error=GECERSIZ_CALLBACK');
      return;
    }

    // Token'ları AuthProvider state'ine bağla ve kullanıcı profilini yükle
    loginWithTokens(accessToken, refreshToken, expiresIn)
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
          <p className="text-muted-foreground text-sm animate-pulse">Yükleniyor…</p>
        </div>
      }
    >
      <OAuthCallbackInner />
    </Suspense>
  );
}
