'use client';

/**
 * Organism: RegisterForm
 *
 * Kayıt sonrası kullanıcı PENDING durumuna düşer; "Onay bekleniyor" ekranı gösterilir.
 * tenantSlug URL query parametresinden okunur; yoksa kullanıcı elle girer.
 */

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/molecules/FormField';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { OAuthButtons } from '@/components/molecules/OAuthButtons';
import { authApi } from '@/lib/api/auth';
import { useFormState } from '@/hooks/useFormState';
import { registerSchema, type RegisterFormValues } from '@/lib/validation';

interface RegisterFormProps {
  /** URL'den gelen tenant slug — kullanıcı değiştiremez */
  initialTenantSlug?: string;
}

const buildInitial = (tenantSlug: string): RegisterFormValues => ({
  email: '',
  password: '',
  confirmPassword: '',
  fullName: '',
  role: 'MENTI',
  tenantSlug,
  kvkkConsent: false as unknown as true, // başlangıçta işaretlenmemiş; Zod'da literal(true) zorunlu
});

export function RegisterForm({ initialTenantSlug = '' }: RegisterFormProps) {
  const form = useFormState(registerSchema, buildInitial(initialTenantSlug));
  const [registered, setRegistered] = useState(false);

  const onSubmit = async (values: RegisterFormValues) => {
    const result = await authApi.register({
      email:       values.email,
      password:    values.password,
      fullName:    values.fullName,
      role:        values.role,
      tenantSlug:  values.tenantSlug,
      kvkkConsent: values.kvkkConsent,
    });

    if (!result.ok) {
      const msg =
        result.error.error === 'EMAIL_MEVCUT'
          ? 'Bu e-posta adresi zaten kayıtlı.'
          : result.error.error === 'TENANT_BULUNAMADI'
          ? 'Kuruluş kodu geçersiz. Lütfen kontrol edin.'
          : result.error.message ?? 'Kayıt başarısız. Tekrar deneyin.';
      form.setServerError(msg);
      return;
    }

    setRegistered(true);
  };

  // ── Onay bekleniyor ekranı ────────────────────────────────────────────────
  if (registered) {
    return (
      <div className="space-y-4 text-center animate-fade-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold">Kayıt Başarılı</h2>
        <p className="text-sm text-muted-foreground">
          Hesabınız oluşturuldu ve yönetici onayına gönderildi.
          Onaylandığında size e-posta ile bildirim yapılacaktır.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/login">Giriş sayfasına dön</Link>
        </Button>
      </div>
    );
  }

  // ── Kayıt formu ──────────────────────────────────────────────────────────
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
      {form.serverError && (
        <AlertMessage type="error" message={form.serverError} />
      )}

      <FormField
        label="Ad Soyad"
        name="fullName"
        type="text"
        autoComplete="name"
        placeholder="Ahmet Yılmaz"
        value={form.values.fullName}
        onChange={form.handleChange}
        error={form.errors.fullName}
        disabled={form.isSubmitting}
      />

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
        autoComplete="new-password"
        placeholder="En az 8 karakter, büyük harf ve rakam"
        value={form.values.password}
        onChange={form.handleChange}
        error={form.errors.password}
        disabled={form.isSubmitting}
      />

      <FormField
        label="Şifre Tekrar"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        placeholder="Şifrenizi tekrar girin"
        value={form.values.confirmPassword}
        onChange={form.handleChange}
        error={form.errors.confirmPassword}
        disabled={form.isSubmitting}
      />

      {/* Rol seçimi */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Ben bir…</label>
        <div className="grid grid-cols-2 gap-2">
          {(['MENTI', 'MENTOR'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => form.setValue('role', r)}
              disabled={form.isSubmitting}
              className={`rounded-lg border-2 p-3 text-sm font-medium transition-all ${
                form.values.role === r
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-background hover:border-primary/40'
              }`}
            >
              {r === 'MENTI' ? '🎓 Menti (Öğrenen)' : '🏅 Mentor (Rehber)'}
            </button>
          ))}
        </div>
        {form.errors.role && (
          <p className="text-xs text-destructive">{form.errors.role}</p>
        )}
      </div>

      {/* Kuruluş kodu — initialTenantSlug varsa gizle */}
      {!initialTenantSlug && (
        <FormField
          label="Kuruluş Kodu"
          name="tenantSlug"
          type="text"
          placeholder="tech-hub"
          value={form.values.tenantSlug}
          onChange={form.handleChange}
          error={form.errors.tenantSlug}
          disabled={form.isSubmitting}
        />
      )}

      {/* KVKK onayı */}
      <div className="space-y-1">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={form.values.kvkkConsent === true}
            onChange={(e) => form.setValue('kvkkConsent', e.target.checked as unknown as true)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
            disabled={form.isSubmitting}
          />
          <span className="text-xs text-muted-foreground leading-relaxed">
            <a href="/kvkk" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80">
              KVKK
            </a>
            {' '}kapsamında verilerimin işlenmesine açık rıza veriyorum. (Zorunlu)
          </span>
        </label>
        {form.errors.kvkkConsent && (
          <p className="text-xs text-destructive pl-6">{form.errors.kvkkConsent}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Kayıt oluşturuluyor…' : 'Kayıt Ol'}
      </Button>

      {form.values.tenantSlug && (
        <>
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">veya şununla devam et</span>
            </div>
          </div>
          <OAuthButtons
            tenantSlug={form.values.tenantSlug}
            role={form.values.role}
            disabled={form.isSubmitting}
          />
        </>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Zaten hesabınız var mı?{' '}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Giriş yap
        </Link>
      </p>
    </form>
  );
}
