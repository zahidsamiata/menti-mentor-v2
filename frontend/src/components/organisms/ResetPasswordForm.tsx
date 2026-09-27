'use client';

/**
 * Organism: ResetPasswordForm
 *
 * E-postadaki token (prop) + yeni şifre ile POST /api/auth/reset-password çağırır.
 * Başarıda /login?reset=success'e yönlendirir; login sayfası oradan başarı mesajı gösterir.
 * Token geçersiz/süresi dolmuşsa backend 400 TOKEN_GECERSIZ döner → hata mesajı + "yeni bağlantı
 * talep et" düğmesi (/forgot-password) gösterilir (AJ-36 / U-14 kalanı: eskiden yalnız "Giriş
 * sayfasına dön" vardı, kullanıcı çıkış yolunu kendisi bulmak zorundaydı). Sıfırlama bağlantısı
 * yalnız token taşır, e-posta bilinmez → forgot-password formu boş açılır.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PasswordField } from '@/components/molecules/PasswordField';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { useFormState } from '@/hooks/useFormState';
import { PASSWORD_RULE_HINT, resetPasswordSchema, type ResetPasswordFormValues } from '@/lib/validation';
import { authApi } from '@/lib/api/auth';

const INITIAL: ResetPasswordFormValues = { password: '', confirmPassword: '' };

/** Backend'in geçersiz/süresi dolmuş sıfırlama token'ı için döndürdüğü hata kodu (authController.resetPassword). */
const RESET_TOKEN_REJECTED_CODE = 'TOKEN_GECERSIZ';

/** Yeni sıfırlama bağlantısı isteme düğmesi — token'sız ekran (_ResetPasswordContent) ile ortak. */
export const REQUEST_NEW_RESET_LINK_TEXT = 'Yeni bağlantı talep et';

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const form = useFormState(resetPasswordSchema, INITIAL);
  const [tokenRejected, setTokenRejected] = useState(false);

  const onSubmit = async (values: ResetPasswordFormValues) => {
    const result = await authApi.resetPassword(token, values.password);
    if (result.ok) {
      router.push('/login?reset=success');
    } else {
      setTokenRejected(result.error.error === RESET_TOKEN_REJECTED_CODE);
      form.setServerError(
        result.error.message ?? 'Şifre güncellenemedi. Bağlantı geçersiz veya süresi dolmuş olabilir.',
      );
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
      {form.serverError && <AlertMessage type="error" message={form.serverError} />}
      {tokenRejected && (
        <Link
          href="/forgot-password"
          className="block text-center text-sm font-medium text-primary hover:underline"
        >
          {REQUEST_NEW_RESET_LINK_TEXT}
        </Link>
      )}

      <PasswordField
        label="Yeni Şifre"
        name="password"
        autoComplete="new-password"
        value={form.values.password}
        onChange={form.handleChange}
        error={form.errors.password}
        hint={PASSWORD_RULE_HINT}
        disabled={form.isSubmitting}
      />

      <PasswordField
        label="Yeni Şifre (Tekrar)"
        name="confirmPassword"
        autoComplete="new-password"
        value={form.values.confirmPassword}
        onChange={form.handleChange}
        error={form.errors.confirmPassword}
        disabled={form.isSubmitting}
      />

      <Button type="submit" className="w-full" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Güncelleniyor…' : 'Şifreyi Güncelle'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="text-primary font-medium hover:underline">
          Giriş sayfasına dön
        </Link>
      </p>
    </form>
  );
}
