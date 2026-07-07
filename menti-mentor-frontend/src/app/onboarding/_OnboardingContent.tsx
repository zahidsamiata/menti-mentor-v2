'use client';

/**
 * _OnboardingContent — Çok adımlı onboarding wizard'ının ana kontrolcüsü.
 *
 * Adımlar:
 *  1. Profil tamamlama (sektör, beceriler, deneyim yılı)
 *  2. Oyunlaştırılmış DISC testi (8 senaryo sorusu)
 *  3. "Aha Anı" — mizaç sonuç kartı + paylaşım + dashboard'a geçiş
 *
 * API çağrıları bu bileşende merkezlenir; adım bileşenleri saf UI rolü üstlenir.
 */

import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import {
  fetchDiscQuestions,
  submitProfile,
  submitDiscAnswers,
} from '@/lib/api/onboarding';
import { ProfileStep }  from './_steps/ProfileStep';
import { DiscTestStep } from './_steps/DiscTestStep';
import { ResultStep }   from './_steps/ResultStep';
import type { DiscAnswer, DiscQuestion, DiscResultCard, ProfileData } from '@/types/onboarding';
import type { UserRole } from '@/types/auth';
import { cn } from '@/lib/utils';

// ─── Adım göstergesi ─────────────────────────────────────────────────────────

const STEPS = ['Profil', 'Mizaç Testi', 'Sonuç'] as const;
type StepIndex = 0 | 1 | 2;

interface StepIndicatorProps {
  current: StepIndex;
}

function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8" aria-label="İlerleme">
      {STEPS.map((label, i) => {
        const done    = i < current;
        const active  = i === current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors',
                done   && 'bg-primary border-primary text-primary-foreground',
                active && 'border-primary text-primary bg-primary/10',
                !done && !active && 'border-muted-foreground/30 text-muted-foreground/50',
              )}>
                {done ? '✓' : i + 1}
              </div>
              <span className={cn(
                'mt-1 text-[10px] font-medium whitespace-nowrap',
                active ? 'text-primary' : 'text-muted-foreground/60',
              )}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn(
                'h-0.5 w-12 sm:w-16 mx-1 mb-4 transition-colors',
                done ? 'bg-primary' : 'bg-muted-foreground/20',
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Loading / Auth bekleyici ─────────────────────────────────────────────────

function LoadingShell() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
    </div>
  );
}

// ─── _OnboardingContent ───────────────────────────────────────────────────────

export default function OnboardingContent() {
  const { user, accessToken, isLoading: authLoading } = useAuth();
  const userRole: UserRole | undefined = user?.role as UserRole | undefined;

  const [step,           setStep]           = useState<StepIndex>(0);
  const [questions,      setQuestions]      = useState<DiscQuestion[]>([]);
  const [resultCard,     setResultCard]     = useState<DiscResultCard | null>(null);
  const [isSubmitting,   setIsSubmitting]   = useState(false);
  const [stepError,      setStepError]      = useState<string | null>(null);
  const [questionsError, setQuestionsError] = useState<string | null>(null);

  // ── Soru çekimi — mount'ta ────────────────────────────────────────────────
  useEffect(() => {
    if (!accessToken || !user) return;

    (async () => {
      const result = await fetchDiscQuestions(accessToken, user.tenantId);
      if (result.ok) {
        setQuestions(result.data.questions);
      } else {
        setQuestionsError(result.error.message ?? 'Sorular yüklenemedi. Sayfayı yenileyin.');
      }
    })();
  }, [accessToken, user]);

  // ── Auth yüklenene kadar bekle ────────────────────────────────────────────
  if (authLoading || !accessToken || !user) return <LoadingShell />;

  // ── Adım 1 tamamlandı: profili kaydet, adım 2'ye geç ─────────────────────
  const handleProfileComplete = async (data: ProfileData) => {
    setIsSubmitting(true);
    setStepError(null);

    const result = await submitProfile(data, accessToken, user.tenantId);

    setIsSubmitting(false);
    if (result.ok) {
      setStep(1);
    } else {
      setStepError(result.error.message ?? 'Profil kaydedilemedi. Tekrar deneyin.');
    }
  };

  // ── Adım 2 tamamlandı: DISC gönder, sonuç kartını al ─────────────────────
  const handleDiscComplete = async (answers: DiscAnswer[]) => {
    setIsSubmitting(true);
    setStepError(null);

    const result = await submitDiscAnswers(answers, accessToken, user.tenantId);

    setIsSubmitting(false);
    if (result.ok) {
      setResultCard(result.data.resultCard);
      setStep(2);
    } else {
      setStepError(result.error.message ?? 'Sonuçlar hesaplanamadı. Tekrar deneyin.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-lg">

        {/* Sayfa başlığı */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-foreground">
            {step === 0 && 'Profilini Tamamla'}
            {step === 1 && 'Mizaç Testini Çöz'}
            {step === 2 && 'Sonucun Hazır! 🎉'}
          </h1>
          {step < 2 && (
            <p className="text-sm text-muted-foreground mt-1">
              {step === 0 && 'Seni doğru eşleştirebilmemiz için birkaç bilgi alalım.'}
              {step === 1 && 'Senaryo sorularına sezgisel olarak cevap ver — yanlış cevap yoktur.'}
            </p>
          )}
        </div>

        {/* Adım göstergesi */}
        <StepIndicator current={step} />

        {/* Adım içeriği */}
        {step === 0 && (
          <ProfileStep
            role={userRole}
            onComplete={handleProfileComplete}
            isSubmitting={isSubmitting}
            error={stepError}
          />
        )}

        {step === 1 && (
          questionsError ? (
            <div className="text-center py-12 space-y-3">
              <p className="text-destructive text-sm">{questionsError}</p>
              <button
                className="text-sm text-primary underline"
                onClick={() => window.location.reload()}
              >
                Yenile
              </button>
            </div>
          ) : questions.length === 0 ? (
            <div className="flex justify-center py-12">
              <div className="h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            </div>
          ) : (
            <DiscTestStep
              questions={questions}
              onComplete={handleDiscComplete}
              isSubmitting={isSubmitting}
              error={stepError}
            />
          )
        )}

        {step === 2 && resultCard && (
          <ResultStep resultCard={resultCard} />
        )}

      </div>
    </div>
  );
}
