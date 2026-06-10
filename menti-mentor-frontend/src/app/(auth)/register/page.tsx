import { Suspense } from 'react';
import { type Metadata } from 'next';
import RegisterContent from './_RegisterContent';

export const metadata: Metadata = { title: 'Kayıt Ol' };

export default function RegisterPage() {
  return (
    <div className="w-full max-w-sm space-y-6 animate-fade-in">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Hesap Oluştur</h1>
        <p className="text-sm text-muted-foreground">
          Mentorluk platformuna katılmak için kayıt olun.
        </p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <Suspense fallback={<div className="h-96 animate-pulse bg-muted rounded-lg" />}>
          <RegisterContent />
        </Suspense>
      </div>
    </div>
  );
}
