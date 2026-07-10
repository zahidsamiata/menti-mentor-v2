'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Step1Slug }      from './_steps/Step1Slug';
import { Step2Template }  from './_steps/Step2Template';
import { Step3Branding }  from './_steps/Step3Branding';
import { Step4Account }   from './_steps/Step4Account';
import { Step5Invite }    from './_steps/Step5Invite';

// ─── Wizard state ─────────────────────────────────────────────────────────────

export interface WizardData {
  // Adım 1
  tenantName: string;
  slug: string;
  // Adım 2
  programTemplate: 'MEZUN' | 'KULUP' | 'GONULLU' | 'OZEL';
  // Adım 3
  logoUrl: string;
  primaryColor: string;
  // Adım 4 — POST /api/self-serve/register'a giden alanlar
  fullName: string;
  email: string;
  password: string;
  kvkkConsent: boolean;
  // Adım 4 sonucu — sonraki adımlar için gerekli
  tenantId: string;
  adminToken: string;
}

const INITIAL: WizardData = {
  tenantName: '', slug: '',
  programTemplate: 'MEZUN',
  logoUrl: '', primaryColor: '#6366f1',
  fullName: '', email: '', password: '', kvkkConsent: false,
  tenantId: '', adminToken: '',
};

const STEP_LABELS = ['Kurum Adresi', 'Program Tipi', 'Görünüm', 'Hesap', 'Davet Linkleri'] as const;
type StepIndex = 0 | 1 | 2 | 3 | 4;

// ─── Adım göstergesi ─────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: StepIndex }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10" aria-label="Onboarding ilerleme">
      {STEP_LABELS.map((label, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors',
                done   && 'bg-primary border-primary text-primary-foreground',
                active && 'border-primary text-primary bg-primary/10',
                !done && !active && 'border-muted-foreground/30 text-muted-foreground/40',
              )}>
                {done ? '✓' : i + 1}
              </div>
              <span className={cn(
                'mt-1 text-[10px] font-medium whitespace-nowrap hidden sm:block',
                active ? 'text-primary' : 'text-muted-foreground/50',
              )}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={cn(
                'h-0.5 w-8 sm:w-12 mx-1 mb-4 sm:mb-5 transition-colors',
                done ? 'bg-primary' : 'bg-muted-foreground/20',
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Ana bileşen ──────────────────────────────────────────────────────────────

export default function StkOnboardingContent() {
  const [step, setStep] = useState<StepIndex>(0);
  const [data, setData]  = useState<WizardData>(INITIAL);

  const update = (partial: Partial<WizardData>) =>
    setData((prev) => ({ ...prev, ...partial }));

  const next = () => setStep((s) => Math.min(s + 1, 4) as StepIndex);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-10 px-4">

      {/* Logo */}
      <div className="mb-8 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
          <span className="text-xs font-black text-white tracking-tighter">M²</span>
        </div>
        <span className="text-base font-bold text-foreground">
          Menti<span className="text-primary">Mentor</span>
        </span>
      </div>

      <div className="w-full max-w-xl">

        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-foreground">Kurumunu Kur</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {step === 0 && 'Kurumun benzersiz adresi — üyelerin bu linkle katılır.'}
            {step === 1 && 'Programına en uygun şablonu seç — sonra değiştirebilirsin.'}
            {step === 2 && 'Kurumunun marka kimliğini ekle.'}
            {step === 3 && 'Hesabını oluştur — kurum yöneticisi olarak kayıt oluyorsun.'}
            {step === 4 && 'Üyeleri davet et. İlk eşleşmen birkaç adım uzaklıkta!'}
          </p>
        </div>

        <StepIndicator current={step} />

        {step === 0 && <Step1Slug  data={data} onUpdate={update} onNext={next} />}
        {step === 1 && <Step2Template data={data} onUpdate={update} onNext={next} />}
        {step === 2 && <Step3Branding data={data} onUpdate={update} onNext={next} />}
        {step === 3 && <Step4Account  data={data} onUpdate={update} onNext={next} />}
        {step === 4 && <Step5Invite   data={data} />}

      </div>
    </div>
  );
}
