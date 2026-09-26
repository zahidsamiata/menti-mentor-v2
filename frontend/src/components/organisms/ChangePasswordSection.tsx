'use client';

/**
 * Organism: ChangePasswordSection (GV-19)
 *
 * Profil sayfasında oturum içi şifre değiştirme: mevcut şifre + yeni şifre + tekrar →
 * POST /api/auth/change-password. Başarıda backend diğer cihazlardaki oturumları kapatır,
 * bu oturum açık kalır.
 *
 * Yalnız e-posta/şifre (LOCAL) hesaplarında anlamlıdır. Şifreyle girişte oturum nesnesi
 * authProvider taşımaz (login yanıtında yok) → bilinmiyorsa bölüm gösterilir; OAuth hesabıysa
 * backend 409 döner ve anlaşılır Türkçe mesajı alanın üstünde görünür.
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PasswordField } from '@/components/molecules/PasswordField';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { useAuth } from '@/providers/AuthProvider';
import { useFormState } from '@/hooks/useFormState';
import {
  PASSWORD_RULE_HINT,
  changePasswordSchema,
  type ChangePasswordFormValues,
} from '@/lib/validation';
import { authApi } from '@/lib/api/auth';

const INITIAL: ChangePasswordFormValues = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const FALLBACK_ERROR = 'Şifre değiştirilemedi. Lütfen tekrar deneyin.';

export function ChangePasswordSection() {
  const { user, accessToken } = useAuth();
  const form = useFormState(changePasswordSchema, INITIAL);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!user || !accessToken) return null;
  // Google/LinkedIn hesabının uygulamada şifresi yok; bilindiği durumda bölüm hiç gösterilmez.
  if (user.authProvider && user.authProvider !== 'LOCAL') return null;

  const onSubmit = async (values: ChangePasswordFormValues) => {
    setSuccessMessage(null);
    const result = await authApi.changePassword(
      values.currentPassword,
      values.newPassword,
      accessToken,
      user.tenantId,
    );
    if (!result.ok) {
      form.setServerError(result.error.message ?? FALLBACK_ERROR);
      return;
    }
    form.setValue('currentPassword', '');
    form.setValue('newPassword', '');
    form.setValue('confirmNewPassword', '');
    setSuccessMessage(result.data.message);
  };

  return (
    <section
      aria-labelledby="change-password-title"
      className="rounded-xl border border-border bg-card p-5 space-y-4"
    >
      <div>
        <h2 id="change-password-title" className="text-base font-semibold text-foreground">
          Şifreyi değiştir
        </h2>
        <p className="text-sm text-muted-foreground">
          Değiştirdiğinizde diğer cihazlardaki oturumlarınız kapatılır.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
        {form.serverError && <AlertMessage type="error" message={form.serverError} />}
        {successMessage && !form.serverError && (
          <AlertMessage type="success" message={successMessage} />
        )}

        <PasswordField
          label="Mevcut şifre"
          name="currentPassword"
          autoComplete="current-password"
          value={form.values.currentPassword}
          onChange={(e) => { setSuccessMessage(null); form.handleChange(e); }}
          error={form.errors.currentPassword}
          disabled={form.isSubmitting}
        />

        <PasswordField
          label="Yeni şifre"
          name="newPassword"
          autoComplete="new-password"
          value={form.values.newPassword}
          onChange={(e) => { setSuccessMessage(null); form.handleChange(e); }}
          error={form.errors.newPassword}
          hint={PASSWORD_RULE_HINT}
          disabled={form.isSubmitting}
        />

        <PasswordField
          label="Yeni şifre (tekrar)"
          name="confirmNewPassword"
          autoComplete="new-password"
          value={form.values.confirmNewPassword}
          onChange={(e) => { setSuccessMessage(null); form.handleChange(e); }}
          error={form.errors.confirmNewPassword}
          disabled={form.isSubmitting}
        />

        <Button type="submit" disabled={form.isSubmitting}>
          {form.isSubmitting ? 'Güncelleniyor…' : 'Şifreyi değiştir'}
        </Button>
      </form>
    </section>
  );
}
