'use client';

/**
 * Organism: LoginForm
 *
 * AuthProvider.login ile bağlıdır. Başarılı girişte tenant bilgisi
 * AuthProvider'dan TenantProvider'a köprülenecek (Sprint 14'te tam entegrasyon).
 *
 * Hata hiyerarşisi:
 *  1. Zod validasyon hataları → alan bazlı (FormField altında)
 *  2. Backend API hataları → form başında AlertMessage
 */

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/molecules/FormField';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { OAuthButtons } from '@/components/molecules/OAuthButtons';
import { useAuth } from '@/providers/AuthProvider';
import { useFormState } from '@/hooks/useFormState';
import { loginSchema, type LoginFormValues } from '@/lib/validation';

interface LoginFormProps {
  /** OAuth düğmeleri için tenant slug (URL'den okunur) */
  tenantSlug?: string;
}

// Giriş sonrası akıllı yönlendirme (dokümandaki durum tablosuna birebir uyar):
//   status PENDING  → /pending-approval  (backend 403 → catch bloğu yakalar)
//   status APPROVED → rol bazlı:
//     ADMIN   → /admin/waiting-room
//     MENTOR  → discType yoksa /onboarding (8-soru DISC), varsa /mentor
//     MENTI   → discType yoksa /onboarding (8-soru DISC), varsa /menti
// Not: Platform admin (/platform) ayrı endpoint'ten giriş yapar; buradan yönlendirilmez.
function getSmartRedirect(user: { role: string; approvalStatus: string; discType: string | null }): string {
  if (user.approvalStatus === 'PENDING') return '/pending-approval';
  if (user.role === 'ADMIN') return '/admin/waiting-room';
  // /disc-test = adaptif Likert (mevcut kullanıcı). Yeni kullanıcı (discType=null) → /onboarding.
  if (!user.discType) return '/onboarding';
  if (user.role === 'MENTOR') return '/mentor';
  if (user.role === 'MENTI') return '/menti';
  return '/dashboard';
}

const INITIAL: LoginFormValues = { email: '', password: '' };

export function LoginForm({ tenantSlug }: LoginFormProps) {
  const router = useRouter();
  const { login } = useAuth();
  const form = useFormState(loginSchema, INITIAL);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const userData = await login(values);
      router.push(getSmartRedirect(userData));
    } catch (err) {
      // PENDING: backend JWT vermeden 403 atar — biz yine de /pending-approval'a yönlendiririz.
      const code = (err as Error & { code?: string }).code;
      if (code === 'HESAP_ONAY_BEKLENIYOR') {
        router.push('/pending-approval');
        return;
      }
      form.setServerError(err instanceof Error ? err.message : 'Giriş başarısız. Bilgilerinizi kontrol edin.');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
      {form.serverError && (
        <AlertMessage type="error" message={form.serverError} />
      )}

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

      <FormField
        label="Şifre"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={form.values.password}
        onChange={form.handleChange}
        error={form.errors.password}
        disabled={form.isSubmitting}
        rightLabel={
          <Link href="/forgot-password" className="text-xs text-primary hover:underline">
            Şifremi unuttum
          </Link>
        }
      />

      <Button type="submit" className="w-full" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Giriş yapılıyor…' : 'Giriş Yap'}
      </Button>

      {tenantSlug && (
        <>
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">veya şununla devam et</span>
            </div>
          </div>
          <OAuthButtons tenantSlug={tenantSlug} disabled={form.isSubmitting} />
        </>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Hesabınız yok mu?{' '}
        <Link href="/register" className="text-primary font-medium hover:underline">
          Kayıt ol
        </Link>
      </p>
    </form>
  );
}
