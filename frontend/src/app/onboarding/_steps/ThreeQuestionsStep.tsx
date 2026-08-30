'use client';

/**
 * ThreeQuestionsStep — arketip kartından SONRA gösterilen üç soru (S1/S2/S3, §10.2).
 *
 * S1 (menti: mentiNeeds / mentör: mentorStrengths) — en fazla 2, BOŞ bırakılabilir (EK2, PO).
 * S2 (supportApproach) ve S3 (priorityValue) — ZORUNLU (tek seçim). Ekran atlanamaz, ama
 * S1 boşken ilerleme engellenmez. Metinler lib/threeQuestionsText.ts (TASLAK).
 */

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MENTI_S1, MENTOR_S1, MENTI_S2, MENTOR_S2, S3 } from '@/lib/threeQuestionsText';
import type {
  MatchingPreferences,
  MentiNeed,
  MentorStrength,
  SupportApproach,
  PriorityValue,
} from '@/types/onboarding';
import type { UserRole } from '@/types/auth';

interface ThreeQuestionsStepProps {
  role?:        UserRole;
  onComplete:   (data: MatchingPreferences) => void;
  isSubmitting: boolean;
  error:        string | null;
}

export function ThreeQuestionsStep({ role, onComplete, isSubmitting, error }: ThreeQuestionsStepProps) {
  const isMentor = role === 'MENTOR';
  const s1 = isMentor ? MENTOR_S1 : MENTI_S1;
  const s2 = isMentor ? MENTOR_S2 : MENTI_S2;

  // S1 çoklu seçim (rol'e göre menti/mentör değerleri; string tutulur, gönderimde daraltılır).
  const [s1Sel, setS1Sel] = useState<string[]>([]);
  const [supportApproach, setSupportApproach] = useState<SupportApproach | null>(null);
  const [priorityValue,   setPriorityValue]   = useState<PriorityValue | null>(null);

  const atLimit = s1Sel.length >= s1.max;

  const toggleS1 = (value: string) =>
    setS1Sel((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      if (prev.length >= s1.max) return prev; // en fazla 2 — 3.'yü engelle
      return [...prev, value];
    });

  // S2 + S3 zorunlu; S1 opsiyonel (boş bırakılabilir).
  const canSubmit = supportApproach !== null && priorityValue !== null;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const s1Payload = isMentor
      ? (s1Sel.length > 0 ? { mentorStrengths: s1Sel as MentorStrength[] } : {})
      : (s1Sel.length > 0 ? { mentiNeeds: s1Sel as MentiNeed[] } : {});
    onComplete({
      ...s1Payload,
      supportApproach: supportApproach!,
      priorityValue:   priorityValue!,
    });
  };

  return (
    <div className="space-y-8">
      {/* ── S1 — ihtiyaç / fayda (en fazla 2, opsiyonel) ─────────────────── */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-1">{s1.prompt}</legend>
        <p className="text-xs text-muted-foreground mb-3">
          En fazla 2 seçebilirsin · emin değilsen boş bırakabilirsin
        </p>
        <div className="flex flex-wrap gap-2">
          {s1.options.map(({ value, label }) => {
            const selected = s1Sel.includes(value);
            const disabled = !selected && atLimit;
            return (
              <button
                key={value}
                type="button"
                onClick={() => toggleS1(value)}
                disabled={disabled}
                aria-pressed={selected}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all',
                  selected
                    ? 'bg-primary/15 text-primary border-primary shadow-sm scale-105'
                    : disabled
                      ? 'bg-muted/40 text-muted-foreground/40 border-border cursor-not-allowed'
                      : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground',
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* ── S2 — yaklaşım (zorunlu, tek seçim) ───────────────────────────── */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-3">
          {s2.prompt} <span className="text-destructive">*</span>
        </legend>
        <div className="grid gap-2">
          {s2.options.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setSupportApproach(value)}
              aria-pressed={supportApproach === value}
              className={cn(
                'rounded-xl border p-3 text-left text-sm transition-all',
                supportApproach === value
                  ? 'bg-primary/10 border-primary text-foreground font-semibold'
                  : 'bg-card border-border hover:border-primary/40',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* ── S3 — öncelik/değer (zorunlu, tek seçim) ──────────────────────── */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-3">
          {S3.prompt} <span className="text-destructive">*</span>
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {S3.options.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setPriorityValue(value)}
              aria-pressed={priorityValue === value}
              className={cn(
                'rounded-xl border p-3 text-center text-sm transition-all',
                priorityValue === value
                  ? 'bg-primary/10 border-primary text-foreground font-semibold'
                  : 'bg-card border-border hover:border-primary/40',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      {error && (
        <p className="text-sm text-destructive text-center" role="alert">{error}</p>
      )}

      <Button
        onClick={handleSubmit}
        disabled={!canSubmit || isSubmitting}
        size="lg"
        className="w-full h-12 text-base rounded-xl gap-2"
      >
        {isSubmitting ? 'Kaydediliyor…' : 'Tamamla ve Eşleşmeye Geç'}
        {!isSubmitting && <ChevronRight className="h-4 w-4" aria-hidden />}
      </Button>
    </div>
  );
}
