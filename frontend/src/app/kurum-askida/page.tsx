'use client';

/**
 * /kurum-askida — AJ-72: askıdaki (platformun dondurduğu ya da reddettiği) kurumun kullanıcısı.
 *
 * Buraya iki yoldan gelinir: (1) herhangi bir istek 403 `KURUM_ASKIDA` alınca
 * (`TenantSuspensionRedirect`), (2) dondurulmuş kurumun yöneticisi giriş yapınca
 * (`lib/postLoginRedirect`).
 *
 * Metin: üyeye backend'in döndürdüğü cümle AYNEN; yöneticiye yalnız durum cümlesi (bkz.
 * `lib/tenantSuspension`). Yöneticiye kime başvuracağını söylemek ürün kararıdır.
 *
 * Sayfa kendini doğrular (askı kapısından MUAF `/api/auth/me` ile — döngü yok):
 *  - oturum yoksa → giriş sayfası (bu ekranın oturumsuz söyleyeceği bir şey yok),
 *  - kurum artık askıda değilse → panel girişi (askı kaldırılınca kullanıcı burada takılmaz),
 *  - reddedilen/inceleme bekleyen kurumun yöneticisi → kendi durum ekranı (ret gerekçesi orada).
 * `withRefresh: false`: 401'de ikinci bir sessiz yenileme tetiklenmez (AJ-73 dersi).
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PauseCircle, LogOut } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { useApiClient } from '@/hooks/useApiClient';
import { Button } from '@/components/ui/button';
import { UI_TEXT } from '@/lib/uiText';
import type { TenantVerificationStatus } from '@/lib/api/selfServe';
import { getTenantReviewRedirect, OAUTH_DEFAULT_PATH } from '@/lib/postLoginRedirect';
import { TENANT_SUSPENDED_MEMBER_HINT, TENANT_SUSPENDED_STATUS_TEXT } from '@/lib/tenantSuspension';

const LOGIN_PATH = '/login';

interface MeTenantResponse {
  tenant: { verificationStatus: TenantVerificationStatus; isSuspended?: boolean } | null;
}

export default function TenantSuspendedPage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const api = useApiClient();
  const role = user?.role;
  const hasSession = !!user;

  useEffect(() => {
    if (isLoading) return;
    if (!hasSession) {
      router.replace(LOGIN_PATH);
      return;
    }
    let cancelled = false;
    void (async () => {
      const result = await api<MeTenantResponse>('/api/auth/me', { withRefresh: false });
      if (cancelled || !result.ok || !result.data.tenant) return;
      const { isSuspended, verificationStatus } = result.data.tenant;
      if (isSuspended !== true) {
        router.replace(OAUTH_DEFAULT_PATH);
        return;
      }
      const reviewTarget = getTenantReviewRedirect({ role: role ?? '', tenantVerificationStatus: verificationStatus });
      if (reviewTarget) router.replace(reviewTarget);
    })();
    return () => { cancelled = true; };
  }, [isLoading, hasSession, role, api, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-sm animate-pulse">{UI_TEXT.status.loading}</p>
      </div>
    );
  }

  const isTenantAdmin = user.role === 'ADMIN';

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <PauseCircle className="h-8 w-8 text-amber-600 dark:text-amber-400" aria-hidden />
          </div>
        </div>

        <div className="space-y-2" data-testid="tenant-suspended-message">
          <h1 className="text-2xl font-bold text-foreground">{TENANT_SUSPENDED_STATUS_TEXT}</h1>
          {!isTenantAdmin && (
            <>
              {' '}
              <p className="text-sm text-muted-foreground leading-relaxed">{TENANT_SUSPENDED_MEMBER_HINT}</p>
            </>
          )}
        </div>

        <Button
          variant="outline"
          className="gap-2"
          onClick={async () => {
            await logout();
            router.replace(LOGIN_PATH);
          }}
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Çıkış yap
        </Button>
      </div>
    </div>
  );
}
