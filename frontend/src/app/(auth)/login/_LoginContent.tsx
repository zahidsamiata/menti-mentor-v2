'use client';

/**
 * useSearchParams kullanan client bileşeni — Suspense sınırı içinde çalışır.
 * Ayrı dosyaya alınması, LoginPage'in server component kalmasını sağlar.
 */

import { useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/organisms/LoginForm';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { resolveOAuthError } from '@/lib/loginMessages';

// Sosyal giriş hata kodları → mesaj eşlemesi tek yerde: lib/loginMessages (enumeration-safe).

export default function LoginContent() {
  const params = useSearchParams();
  const errorCode = params.get('error');
  const tenantSlug = params.get('tenant') ?? undefined;
  // reset-password başarıyla tamamlanınca buraya yönlendirilir.
  const resetDone = params.get('reset') === 'success';

  return (
    <>
      {resetDone && (
        <AlertMessage
          type="success"
          message="Şifreniz güncellendi. Yeni şifrenizle giriş yapabilirsiniz."
          className="mb-4"
        />
      )}
      {errorCode && (
        <AlertMessage
          type="error"
          message={resolveOAuthError(errorCode)}
          className="mb-4"
        />
      )}
      <LoginForm tenantSlug={tenantSlug} />
    </>
  );
}
