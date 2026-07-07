'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/molecules/FormField';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { selfServeRegister, updateOnboarding } from '@/lib/api/selfServe';
import { cn } from '@/lib/utils';
import type { WizardData } from '../_StkOnboardingContent';

interface Props {
  data: WizardData;
  onUpdate: (p: Partial<WizardData>) => void;
  onNext: () => void;
}

function validate(data: WizardData): Record<string, string> {
  const errs: Record<string, string> = {};
  if (!data.fullName.trim()) errs['fullName'] = 'Ad soyad zorunludur.';
  if (!data.email.includes('@')) errs['email'] = 'Geçerli bir e-posta adresi girin.';
  if (data.password.length < 8)  errs['password'] = 'Şifre en az 8 karakter olmalı.';
  if (!data.kvkkConsent) errs['kvkk'] = 'Devam etmek için onay vermeniz gerekiyor.';
  return errs;
}

export function Step4Account({ data, onUpdate, onNext }: Props) {
  const [errors,      setErrors]      = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [loading,     setLoading]     = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(data);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setServerError('');

    // 1. Tenant + admin kaydı yap
    const regResult = await selfServeRegister({
      email:           data.email,
      password:        data.password,
      name:            data.fullName,
      tenantName:      data.tenantName,
      slug:            data.slug,
      programTemplate: data.programTemplate,
    });

    if (!regResult.ok) {
      setLoading(false);
      setServerError(regResult.error.message ?? 'Kayıt başarısız. Lütfen tekrar deneyin.');
      return;
    }

    const { tenant, accessToken, refreshToken } = regResult.data;

    // refreshToken'ı localStorage'a koy (AuthProvider ile senkron)
    localStorage.setItem('mm_refresh_token', refreshToken);

    // 2. Branding varsa güncelle (logo veya renk varsayılandan farklıysa)
    if (data.logoUrl || data.primaryColor !== '#6366f1') {
      await updateOnboarding(tenant.id, accessToken, {
        onboardingStep: 'INVITE',
        ...(data.logoUrl      && { logoUrl: data.logoUrl }),
        ...(data.primaryColor && { primaryColor: data.primaryColor }),
      });
    }

    // Wizard state'e tenantId + adminToken kaydet
    onUpdate({ tenantId: tenant.id, adminToken: accessToken });
    setLoading(false);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">

        {serverError && <AlertMessage type="error" message={serverError} />}

        <FormField
          label="Ad Soyad"
          name="fullName"
          autoComplete="name"
          placeholder="Ayşe Kaya"
          value={data.fullName}
          onChange={(e) => { onUpdate({ fullName: e.target.value }); setErrors((p) => ({ ...p, fullName: '' })); }}
          error={errors['fullName']}
          disabled={loading}
        />
        <FormField
          label="E-posta"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="ayse@dernek.org"
          value={data.email}
          onChange={(e) => { onUpdate({ email: e.target.value }); setErrors((p) => ({ ...p, email: '' })); }}
          error={errors['email']}
          disabled={loading}
        />
        <FormField
          label="Şifre"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="En az 8 karakter"
          value={data.password}
          onChange={(e) => { onUpdate({ password: e.target.value }); setErrors((p) => ({ ...p, password: '' })); }}
          error={errors['password']}
          disabled={loading}
        />

        {/* KVKK açık rıza */}
        <div className="space-y-1">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={data.kvkkConsent}
              onChange={(e) => { onUpdate({ kvkkConsent: e.target.checked }); setErrors((p) => ({ ...p, kvkk: '' })); }}
              disabled={loading}
              className="mt-0.5 h-4 w-4 rounded border-input accent-primary cursor-pointer"
            />
            <span className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
              <a href="/kvkk" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80">
                Kişisel Verilerin Korunması Kanunu (KVKK)
              </a>{' '}
              kapsamında kişisel verilerimin işlenmesine açık rızam ile{' '}
              <a href="/kullanim-kosullari" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80">
                Kullanım Koşullarını
              </a>{' '}
              okudum, kabul ediyorum.
            </span>
          </label>
          {errors['kvkk'] && (
            <p className={cn('text-xs text-destructive pl-7')}>{errors['kvkk']}</p>
          )}
        </div>

      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Hesap oluşturuluyor…' : 'Hesabı Oluştur ve Devam Et'}
      </Button>
    </form>
  );
}
