/**
 * Giriş sayfası.
 * tenantSlug, URL query'sinden okunur → OAuth düğmelerine aktarılır.
 * Örnek: /login?tenant=tech-hub
 */

import { Suspense } from 'react';
import { type Metadata } from 'next';
import { LoginForm } from '@/components/organisms/LoginForm';
import LoginContent from './_LoginContent';

export const metadata: Metadata = { title: 'Giriş Yap' };

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm space-y-6 animate-fade-in">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Hoş Geldiniz</h1>
        <p className="text-sm text-muted-foreground">Hesabınıza erişmek için giriş yapın.</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <Suspense fallback={<LoginForm />}>
          <LoginContent />
        </Suspense>
      </div>
    </div>
  );
}
