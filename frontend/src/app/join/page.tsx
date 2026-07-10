/**
 * /join?token=... — Davet Karşılama Sayfası
 *
 * Akış: Davet linki → bu sayfa → /register?token=... → onboarding
 *
 * Layout notu: (auth) veya (dashboard) grubu içinde değil.
 * Benzersiz marka temalı tam ekran tasarım; root layout (AuthProvider) yeterli.
 */

import { Suspense } from 'react';
import { type Metadata } from 'next';
import JoinContent from './_JoinContent';

export const metadata: Metadata = {
  title:       'Davete Katıl',
  description: 'Mentörlük ağına davet edildiniz.',
};

// useSearchParams gerektiren içerik Suspense boundary içinde olmalı
// (Next.js App Router statik rendering kuralı).
function JoinFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4" role="status">
        <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-sm text-muted-foreground">Yükleniyor…</p>
      </div>
    </div>
  );
}

export default function JoinPage() {
  return (
    <Suspense fallback={<JoinFallback />}>
      <JoinContent />
    </Suspense>
  );
}
