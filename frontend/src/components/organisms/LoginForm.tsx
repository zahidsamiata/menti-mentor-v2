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

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/molecules/FormField';
import { PasswordField } from '@/components/molecules/PasswordField';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { OAuthButtons } from '@/components/molecules/OAuthButtons';
import { useAuth } from '@/providers/AuthProvider';
import { useFormState } from '@/hooks/useFormState';
import { authApi } from '@/lib/api/auth';
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

  // İş 3 P2/P3: reddedilen kullanıcı için red ekranı + tekrar başvuru state'i.
  const [rejected, setRejected] = useState<{ reason: string | null } | null>(null);
  const [reapplyStatus, setReapplyStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [reapplyError, setReapplyError] = useState<string | null>(null);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const userData = await login(values);
      router.push(getSmartRedirect(userData));
    } catch (err) {
      // PENDING: backend JWT vermeden 403 atar — biz yine de /pending-approval'a yönlendiririz.
      const e = err as Error & { code?: string; rejectionReason?: string | null; canReapply?: boolean };
      if (e.code === 'HESAP_ONAY_BEKLENIYOR') {
        router.push('/pending-approval');
        return;
      }
      // REDDEDİLDİ: gerekçe + tekrar-başvuru ekranı (giriş bilgileri formda duruyor → reapply için kullanılır).
      if (e.code === 'HESAP_REDDEDILDI') {
        setRejected({ reason: e.rejectionReason ?? null });
        return;
      }
      form.setServerError(err instanceof Error ? err.message : 'Giriş başarısız. Bilgilerinizi kontrol edin.');
    }
  };

  async function handleReapply() {
    setReapplyStatus('loading');
    setReapplyError(null);
    const res = await authApi.reapply(form.values.email, form.values.password);
    if (res.ok) {
      setReapplyStatus('done');
    } else {
      setReapplyStatus('idle');
      setReapplyError(res.error.message ?? 'Tekrar başvuru başarısız. Lütfen sonra deneyin.');
    }
  }

  // ── Reddedilen kullanıcı ekranı (kibar; gerekçe + tekrar başvuru) ──
  if (rejected) {
    return (
      <div className="space-y-4">
        {reapplyStatus === 'done' ? (
          <AlertMessage
            type="success"
            message="Başvurunuz yeniden alındı ve değerlendirme için yöneticinize iletildi. Onaylandığında giriş yapabilirsiniz."
          />
        ) : (
          <>
            <div className="rounded-2xl border border-border bg-muted/40 p-4">
              <h2 className="text-base font-semibold">Başvurunuz hakkında</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Başvurunuzu tamamlamak için birkaç güncelleme gerekiyor. Aşağıdaki notu inceleyip tekrar başvurabilirsiniz —
                daha önce doldurduğunuz test ve profil bilgileriniz korunur.
              </p>
              {rejected.reason && (
                <p className="mt-3 rounded-lg bg-background border border-border p-3 text-sm">
                  <span className="font-medium">Not: </span>{rejected.reason}
                </p>
              )}
            </div>
            {reapplyError && <AlertMessage type="error" message={reapplyError} />}
            <Button className="w-full" onClick={handleReapply} disabled={reapplyStatus === 'loading'}>
              {reapplyStatus === 'loading' ? 'Gönderiliyor…' : 'Tekrar Başvur'}
            </Button>
            <button
              type="button"
              onClick={() => { setRejected(null); setReapplyError(null); }}
              className="w-full text-center text-sm text-muted-foreground hover:underline"
            >
              ← Geri dön
            </button>
          </>
        )}
      </div>
    );
  }

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

      <PasswordField
        label="Şifre"
        name="password"
        autoComplete="current-password"
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
