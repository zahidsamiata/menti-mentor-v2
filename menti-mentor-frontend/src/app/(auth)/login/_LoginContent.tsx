'use client';

/**
 * useSearchParams kullanan client bileşeni — Suspense sınırı içinde çalışır.
 * Ayrı dosyaya alınması, LoginPage'in server component kalmasını sağlar.
 */

import { useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/organisms/LoginForm';
import { AlertMessage } from '@/components/molecules/AlertMessage';

const OAUTH_ERROR_MESSAGES: Record<string, string> = {
  KULLANICI_REDDETTI:   'Giriş işlemi iptal edildi.',
  PROVIDER_CATISMASI:   'Bu e-posta başka bir yöntemle kayıtlı.',
  GECERSIZ_STATE:       'Oturum süresi doldu. Lütfen tekrar deneyin.',
  PROVIDER_HATASI:      'Sosyal giriş sağlayıcısında hata oluştu.',
  TENANT_BULUNAMADI:    'Kuruluş bulunamadı. Bağlantıyı kontrol edin.',
  SUNUCU_HATASI:        'Bir hata oluştu. Lütfen tekrar deneyin.',
};

export default function LoginContent() {
  const params = useSearchParams();
  const errorCode = params.get('error');
  const tenantSlug = params.get('tenant') ?? undefined;

  return (
    <>
      {errorCode && (
        <AlertMessage
          type="error"
          message={OAUTH_ERROR_MESSAGES[errorCode] ?? 'Giriş sırasında hata oluştu.'}
          className="mb-4"
        />
      )}
      <LoginForm tenantSlug={tenantSlug} />
    </>
  );
}
