'use client';

/**
 * OAuth Callback Sayfası
 *
 * Backend'in başarılı OAuth sonrası yönlendirdiği URL.
 * Parametreler: accessToken, refreshToken, expiresIn, isNewUser (veya error)
 *
 * Önceki sorun: localStorage'a yazılıyordu ama AuthProvider state güncellenmiyordu.
 * Düzeltme: loginWithTokens() state + localStorage + user profili günceller.
 *
 * ⚠️ AN-30 / KARAR-34 (OAuth ayağı, 2026-09-26): backend `GRANULAR_CONSENT_ENABLED`
 * AÇIKKEN yeni OAuth kullanıcısı için `accessToken` yerine `pendingConsentToken` query
 * param'ı gelir — bu sayfa granüler rıza formunu gösterip `/api/auth/oauth/complete-registration`
 * ile kaydı tamamlar. Bu sayfa KENDİ `NEXT_PUBLIC_GRANULAR_CONSENT_ENABLED` flag'ine BAKMAZ —
 * yalnız param'ın varlığına göre dallanır (backend flag kapalıyken bu param zaten hiç gelmez,
 * dolayısıyla aşağıdaki normal accessToken akışı BİREBİR eskisi gibi çalışmaya devam eder).
 */

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { authApi } from '@/lib/api/auth';
import { resolveRegisterError } from '@/lib/registerMessages';
import { Button } from '@/components/ui/button';
import {
  GranularConsentForm,
  EMPTY_GRANULAR_CONSENT,
  isGranularConsentValid,
  type GranularConsentValue,
} from '@/components/organisms/GranularConsentForm';

// AN-30 OAuth ayağı için varsayılan token ömrü: backend redirect'i (accessToken yolunda) hiçbir
// zaman `expiresIn` göndermez (yalnız accessToken + isNewUser) — mevcut kod da bu yüzden 3600
// varsayılanına düşer. Complete-registration JSON yanıtı da aynı nedenle expiresIn taşımaz;
// tutarlılık için AYNI varsayılan kullanılır (gerçek süre JWT_EXPIRES_IN=1h ile zaten eşleşir).
const DEFAULT_TOKEN_EXPIRES_IN_SECONDS = 3600;

/** Granüler rıza ekranı — yalnız `pendingConsentToken` varken render edilir. */
function PendingConsentForm({ pendingToken }: { pendingToken: string }) {
  const router = useRouter();
  const { loginWithTokens } = useAuth();
  const [value, setValue] = useState<GranularConsentValue>(EMPTY_GRANULAR_CONSENT);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isGranularConsentValid(value)) return;

    setSubmitting(true);
    setError(null);

    const result = await authApi.completeOAuthRegistration({
      pendingToken,
      granularConsent: {
        discMatching: true,
        foreignStorage: true,
        dataProcessing: true,
        anonymizedImprovement: true,
        crossTenantSharing: value.crossTenantSharing,
        oceanProfiling: value.oceanProfiling,
      },
    });

    if (!result.ok) {
      setSubmitting(false);
      setError(resolveRegisterError(result.error));
      return;
    }

    try {
      await loginWithTokens(result.data.accessToken, DEFAULT_TOKEN_EXPIRES_IN_SECONDS);
      router.replace('/dashboard?welcome=1');
    } catch {
      setSubmitting(false);
      setError('Giriş yapılamadı. Lütfen tekrar deneyin.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm space-y-5">
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="px-6 pt-5 pb-1">
            <h1 className="text-lg font-bold text-foreground">Son bir adım kaldı</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Hesabını oluşturmadan önce aşağıdaki onayları incele.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="p-6 pt-4 space-y-4">
            <GranularConsentForm value={value} onChange={setValue} disabled={submitting} />

            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5">
                <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" aria-hidden />
                <p className="text-xs text-destructive" role="alert">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={submitting || !isGranularConsentValid(value)}
              className="w-full h-12 text-base rounded-xl"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                  Devam ediliyor…
                </span>
              ) : (
                'Devam Et'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function OAuthCallbackInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { loginWithTokens } = useAuth();

  const pendingConsentToken = params.get('pendingConsentToken');

  useEffect(() => {
    // AN-30 OAuth ayağı: rıza ekranı gösterilecekse aşağıdaki eski accessToken/error akışı
    // hiç çalışmaz — PendingConsentForm kendi submit akışını yönetir.
    if (pendingConsentToken) return;

    const error = params.get('error');
    if (error) {
      router.replace(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    const accessToken = params.get('accessToken');
    const expiresIn = parseInt(params.get('expiresIn') ?? String(DEFAULT_TOKEN_EXPIRES_IN_SECONDS), 10);

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
  }, [params, router, loginWithTokens, pendingConsentToken]);

  if (pendingConsentToken) {
    return <PendingConsentForm pendingToken={pendingConsentToken} />;
  }

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
