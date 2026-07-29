/**
 * /forgot-password — Şifre sıfırlama talebi sayfası.
 * E-posta alır, backend'e sıfırlama bağlantısı gönderttirir.
 */

import { type Metadata } from 'next';
import { ForgotPasswordForm } from '@/components/organisms/ForgotPasswordForm';

export const metadata: Metadata = { title: 'Şifremi Unuttum — MentiMentor' };

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-sm space-y-6 animate-fade-in">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Şifreni mi unuttun?</h1>
        <p className="text-sm text-muted-foreground">
          E-posta adresini gir, sana sıfırlama bağlantısı gönderelim.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
