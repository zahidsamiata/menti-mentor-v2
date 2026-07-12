'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

const GENERIC_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'hotmail.com', 'hotmail.co.uk',
  'outlook.com', 'yahoo.com', 'yahoo.co.uk', 'ymail.com',
  'yandex.com', 'yandex.ru', 'icloud.com', 'me.com', 'mac.com',
  'proton.me', 'protonmail.com', 'protonmail.ch', 'live.com',
  'msn.com', 'aol.com', 'mail.com',
]);

type DomainTier = 'INSTITUTION' | 'EDU' | 'GENERIC';

function classifyDomain(email: string): DomainTier {
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  if (GENERIC_DOMAINS.has(domain)) return 'GENERIC';
  if (domain.endsWith('.edu.tr')) return 'EDU';
  return 'INSTITUTION';
}

function validate(data: WizardData, tier: DomainTier, institutionRole: string, verificationNote: string): Record<string, string> {
  const errs: Record<string, string> = {};
  if (!data.fullName.trim()) errs['fullName'] = 'Ad soyad zorunludur.';
  if (!data.email.includes('@')) errs['email'] = 'Geçerli bir e-posta adresi girin.';
  if (data.password.length < 8)  errs['password'] = 'Şifre en az 8 karakter olmalı.';
  if (!data.kvkkConsent) errs['kvkk'] = 'Devam etmek için onay vermeniz gerekiyor.';
  if (tier !== 'INSTITUTION') {
    if (!institutionRole.trim()) errs['institutionRole'] = 'Kurumunuzdaki görevinizi belirtin.';
    if (!verificationNote.trim()) errs['verificationNote'] = 'Kanıt linki veya açıklama zorunludur.';
  }
  return errs;
}

export function Step4Account({ data, onUpdate, onNext }: Props) {
  const router = useRouter();
  const [errors,          setErrors]          = useState<Record<string, string>>({});
  const [serverError,     setServerError]      = useState('');
  const [loading,         setLoading]          = useState(false);
  const [domainTier,      setDomainTier]       = useState<DomainTier>('INSTITUTION');
  const [institutionRole, setInstitutionRole]  = useState('');
  const [verificationNote, setVerificationNote] = useState('');

  useEffect(() => {
    if (data.email.includes('@')) {
      setDomainTier(classifyDomain(data.email));
    }
  }, [data.email]);

  const needsVerification = domainTier !== 'INSTITUTION';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(data, domainTier, institutionRole, verificationNote);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setServerError('');

    const regResult = await selfServeRegister({
      email:            data.email,
      password:         data.password,
      name:             data.fullName,
      tenantName:       data.tenantName,
      slug:             data.slug,
      programTemplate:  data.programTemplate,
      kvkkConsent:      data.kvkkConsent,
      ...(needsVerification && {
        institutionRole,
        verificationNote,
      }),
    });

    if (!regResult.ok) {
      setLoading(false);
      setServerError(regResult.error.message ?? 'Kayıt başarısız. Lütfen tekrar deneyin.');
      return;
    }

    const { tenant, accessToken } = regResult.data;
    // refreshToken HttpOnly cookie'de — localStorage'a yazmıyoruz

    if (tenant.verificationStatus === 'PENDING_REVIEW') {
      router.push('/onboarding/stk/pending-review');
      return;
    }

    if (data.logoUrl || data.primaryColor !== '#6366f1') {
      await updateOnboarding(tenant.id, accessToken, {
        onboardingStep: 'DONE',
        ...(data.logoUrl      && { logoUrl: data.logoUrl }),
        ...(data.primaryColor && { primaryColor: data.primaryColor }),
      });
    }

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

        {needsVerification && data.email.includes('@') && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 space-y-1">
            <p className="font-medium">
              {domainTier === 'EDU'
                ? '.edu.tr e-posta adresiyle kayıt — başvurunuz incelenecektir.'
                : 'Kurumsal e-posta adresiyle daha hızlı onaylanırsınız. Aşağıdaki alanları doldurarak devam edebilirsiniz.'}
            </p>
          </div>
        )}

        {needsVerification && (
          <>
            <FormField
              label="Kurumunuzdaki Göreviniz"
              name="institutionRole"
              placeholder="Örn: Kulüp Başkanı, Koordinatör"
              value={institutionRole}
              onChange={(e) => { setInstitutionRole(e.target.value); setErrors((p) => ({ ...p, institutionRole: '' })); }}
              error={errors['institutionRole']}
              disabled={loading}
            />
            <FormField
              label="Kanıt (Link veya Açıklama)"
              name="verificationNote"
              placeholder="Kulüp sosyal medya linki, danışman hoca e-postası veya web adresi"
              value={verificationNote}
              onChange={(e) => { setVerificationNote(e.target.value); setErrors((p) => ({ ...p, verificationNote: '' })); }}
              error={errors['verificationNote']}
              disabled={loading}
            />
          </>
        )}

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
              <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80">
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
