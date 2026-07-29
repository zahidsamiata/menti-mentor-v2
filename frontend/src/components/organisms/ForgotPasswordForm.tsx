'use client';

/**
 * Organism: ForgotPasswordForm
 *
 * E-posta alır, POST /api/auth/forgot-password çağırır. Backend, kullanıcı
 * numaralandırmasını önlemek için e-posta kayıtlı olsun olmasın aynı generic
 * mesajı döndürür — bu yüzden başarı durumunda her zaman aynı bilgi gösterilir.
 */

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/molecules/FormField';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { useFormState } from '@/hooks/useFormState';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/lib/validation';
import { authApi } from '@/lib/api/auth';

const INITIAL: ForgotPasswordFormValues = { email: '' };

export function ForgotPasswordForm() {
  const form = useFormState(forgotPasswordSchema, INITIAL);
  const [sent, setSent] = useState(false);

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    const result = await authApi.forgotPassword(values.email);
    if (result.ok) {
      setSent(true);
    } else {
      form.setServerError(result.error.message ?? 'Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  if (sent) {
    return (
      <div className="space-y-4">
        <AlertMessage
          type="success"
          message="E-posta adresiniz kayıtlıysa şifre sıfırlama bağlantısı gönderildi. Gelen kutunuzu kontrol edin."
        />
        <Link href="/login" className="block text-center text-sm text-primary hover:underline">
          Giriş sayfasına dön
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
      {form.serverError && <AlertMessage type="error" message={form.serverError} />}

      <FormField
        label="E-posta"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="ornek@kuruluş.com"
        value={form.values.email}
        onChange={form.handleChange}
        error={form.errors.email}
        disabled={form.isSubmitting}
      />

      <Button type="submit" className="w-full" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Gönderiliyor…' : 'Sıfırlama Bağlantısı Gönder'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="text-primary font-medium hover:underline">
          Giriş sayfasına dön
        </Link>
      </p>
    </form>
  );
}
