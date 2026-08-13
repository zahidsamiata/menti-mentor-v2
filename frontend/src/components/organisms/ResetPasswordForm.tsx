'use client';

/**
 * Organism: ResetPasswordForm
 *
 * E-postadaki token (prop) + yeni şifre ile POST /api/auth/reset-password çağırır.
 * Başarıda /login?reset=success'e yönlendirir; login sayfası oradan başarı mesajı gösterir.
 * Token geçersiz/süresi dolmuşsa backend 400 döner → alan altında server hatası olarak gösterilir.
 */

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PasswordField } from '@/components/molecules/PasswordField';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { useFormState } from '@/hooks/useFormState';
import { resetPasswordSchema, type ResetPasswordFormValues } from '@/lib/validation';
import { authApi } from '@/lib/api/auth';

const INITIAL: ResetPasswordFormValues = { password: '', confirmPassword: '' };

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const form = useFormState(resetPasswordSchema, INITIAL);

  const onSubmit = async (values: ResetPasswordFormValues) => {
    const result = await authApi.resetPassword(token, values.password);
    if (result.ok) {
      router.push('/login?reset=success');
    } else {
      form.setServerError(
        result.error.message ?? 'Şifre güncellenemedi. Bağlantı geçersiz veya süresi dolmuş olabilir.',
      );
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
      {form.serverError && <AlertMessage type="error" message={form.serverError} />}

      <PasswordField
        label="Yeni Şifre"
        name="password"
        autoComplete="new-password"
        value={form.values.password}
        onChange={form.handleChange}
        error={form.errors.password}
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
