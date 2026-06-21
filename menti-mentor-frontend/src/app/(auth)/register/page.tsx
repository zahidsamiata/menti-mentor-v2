/**
 * /register — Sürtünmesiz Üye Kayıt Sayfası
 *
 * Token'lı davet akışında çalışır: /register?token=...
 * Token → tenant branding → 3 alanlı form → kayıt → otomatik giriş → /onboarding
 *
 * useSearchParams gerektirdiğinden içerik Suspense içinde client bileşene taşındı.
 */

import { Suspense } from 'react';
import { type Metadata } from 'next';
import RegisterContent from './_RegisterContent';

export const metadata: Metadata = { title: 'Hesap Oluştur — MentiMentor' };

function RegisterSkeleton() {
  return (
    <div className="w-full max-w-sm space-y-4 animate-pulse">
      <div className="h-12 rounded-xl bg-muted" />
      <div className="h-64 rounded-2xl bg-muted" />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterSkeleton />}>
      <RegisterContent />
    </Suspense>
  );
}
