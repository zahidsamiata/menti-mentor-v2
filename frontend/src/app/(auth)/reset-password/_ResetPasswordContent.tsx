'use client';

/**
 * useSearchParams kullanan client bileşeni — Suspense sınırı içinde çalışır.
 * Token yoksa (bağlantı bozuk / doğrudan erişim) form yerine yönlendirici mesaj gösterilir.
 */

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ResetPasswordForm } from '@/components/organisms/ResetPasswordForm';
import { AlertMessage } from '@/components/molecules/AlertMessage';

export default function ResetPasswordContent() {
  const token = useSearchParams().get('token');

  return (
    <div className="w-full max-w-sm space-y-6 animate-fade-in">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Yeni şifreni belirle</h1>
        <p className="text-sm text-muted-foreground">Hesabın için yeni bir şifre oluştur.</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        {token ? (
          <ResetPasswordForm token={token} />
        ) : (
          <div className="space-y-4">
            <AlertMessage
              type="error"
              message="Geçersiz veya eksik sıfırlama bağlantısı. Lütfen yeni bir bağlantı talep edin."
            />
            <Link
              href="/forgot-password"
              className="block text-center text-sm text-primary hover:underline"
            >
              Yeni bağlantı talep et
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
