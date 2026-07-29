/**
 * /reset-password?token=... — Yeni şifre belirleme sayfası.
 * Token, e-posta bağlantısından URL query'sinden okunur.
 *
 * useSearchParams gerektirdiğinden içerik Suspense içinde client bileşene taşındı
 * (login/register sayfalarıyla aynı desen).
 */

import { Suspense } from 'react';
import { type Metadata } from 'next';
import ResetPasswordContent from './_ResetPasswordContent';

export const metadata: Metadata = { title: 'Şifre Sıfırla — MentiMentor' };

function ResetPasswordSkeleton() {
  return (
    <div className="w-full max-w-sm space-y-4 animate-pulse">
      <div className="h-12 rounded-xl bg-muted" />
      <div className="h-64 rounded-2xl bg-muted" />
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordSkeleton />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
