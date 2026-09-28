'use client';

/**
 * ThreeQuestionsStep — arketip kartından SONRA gösterilen üç soru (S1/S2/S3, §10.2).
 *
 * S1 (menti: mentiNeeds / mentör: mentorStrengths) — en fazla 2, BOŞ bırakılabilir (EK2, PO).
 * S2 (supportApproach) ve S3 (priorityValue) — ZORUNLU (tek seçim). Ekran atlanamaz, ama
 * S1 boşken ilerleme engellenmez. Metinler lib/threeQuestionsText.ts (TASLAK).
 *
 * Görsel dil (AJ-70 · madde 141 PO ek önlemi 1): bu ekran bilinçli olarak kart ekranından
 * (ResultStep: ortalı, degrade zemin, gölge, büyük ikon) AYRIŞIR — "test bitti, form
 * dolduruyorum" hissi için düz kenarlıklı, nötr zeminli, sola hizalı bir `<form>`; sorular
 * bölmelerle ayrılır, seçenekler onay kutusu / seçim düğmesi işaretli satırlardır.
 */

import { useId, useState, type FormEvent } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { handleRadioGroupKeyDown, rovingTabIndex } from '@/lib/a11y/radioGroup';
import { MENTI_S1, MENTOR_S1, MENTI_S2, MENTOR_S2, S3 } from '@/lib/threeQuestionsText';
import type {
  MatchingPreferences,
  MentiNeed,
  MentorStrength,
  SupportApproach,
  PriorityValue,
} from '@/types/onboarding';
import type { UserRole } from '@/types/auth';
import { UI_TEXT } from '@/lib/uiText';

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
  const s2LegendId = useId();
  const s3LegendId = useId();

  const toggleS1 = (value: string) =>
    setS1Sel((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      if (prev.length >= s1.max) return prev; // en fazla 2 — 3.'yü engelle
      return [...prev, value];
    });

  // S2 + S3 zorunlu; S1 opsiyonel (boş bırakılabilir).
  const canSubmit = supportApproach !== null && priorityValue !== null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || isSubmitting) return;
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
    <form
      aria-label="Tercihler"
      onSubmit={handleSubmit}
      noValidate
      className="rounded-lg border border-border bg-muted/30 text-left"
    >
      <div className="divide-y divide-border">
        {/* ── S1 — ihtiyaç / fayda (en fazla 2, opsiyonel) ─────────────────── */}
        <div className="p-5">
          <fieldset>
            <legend className="text-sm font-semibold text-foreground mb-1">{s1.prompt}</legend>
            <p className="text-xs text-muted-foreground mb-3">
              En fazla 2 seçebilirsin · emin değilsen boş bırakabilirsin
            </p>
            <div className="grid gap-2">
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
                      'flex items-center gap-3 rounded-md border px-3 py-2 text-left text-sm transition-colors',
                      selected
                        ? 'bg-background text-foreground border-primary'
                        : disabled
                          ? 'bg-muted/40 text-muted-foreground/40 border-border cursor-not-allowed'
                          : 'bg-background text-foreground border-border hover:border-primary/50',
                    )}
                  >
                    <SelectionMark shape="square" checked={selected} />
                    {label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        {/* ── S2 — yaklaşım (zorunlu, tek seçim) ───────────────────────────── */}
        <div className="p-5">
          <fieldset>
            <legend id={s2LegendId} className="text-sm font-semibold text-foreground mb-3">
              {s2.prompt} <span className="text-destructive">*</span>
            </legend>
            {/* F-21: tek seçim → radiogroup (ok tuşlarıyla gezilir ve seçilir). S1 çoklu seçim olduğu
                için aria-pressed'li düğme olarak kalır. */}
            <div
              role="radiogroup"
              aria-labelledby={s2LegendId}
              aria-required="true"
              onKeyDown={(e) => handleRadioGroupKeyDown(e)}
              className="grid gap-2"
            >
              {s2.options.map(({ value, label }, index) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={supportApproach === value}
                  tabIndex={rovingTabIndex(index, s2.options.findIndex((o) => o.value === supportApproach))}
                  onClick={() => setSupportApproach(value)}
                  className={cn(
                    'flex items-center gap-3 rounded-md border px-3 py-2 text-left text-sm transition-colors',
                    supportApproach === value
                      ? 'bg-background border-primary text-foreground font-medium'
                      : 'bg-background border-border hover:border-primary/40',
                  )}
                >
                  <SelectionMark shape="circle" checked={supportApproach === value} />
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        {/* ── S3 — öncelik/değer (zorunlu, tek seçim) ──────────────────────── */}
        <div className="p-5">
          <fieldset>
            <legend id={s3LegendId} className="text-sm font-semibold text-foreground mb-3">
              {S3.prompt} <span className="text-destructive">*</span>
            </legend>
            <div
              role="radiogroup"
              aria-labelledby={s3LegendId}
              aria-required="true"
              onKeyDown={(e) => handleRadioGroupKeyDown(e)}
              className="grid gap-2 sm:grid-cols-2"
            >
              {S3.options.map(({ value, label }, index) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={priorityValue === value}
                  tabIndex={rovingTabIndex(index, S3.options.findIndex((o) => o.value === priorityValue))}
                  onClick={() => setPriorityValue(value)}
                  className={cn(
                    'flex items-center gap-3 rounded-md border px-3 py-2 text-left text-sm transition-colors',
                    priorityValue === value
                      ? 'bg-background border-primary text-foreground font-medium'
                      : 'bg-background border-border hover:border-primary/40',
                  )}
                >
                  <SelectionMark shape="circle" checked={priorityValue === value} />
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <div className="space-y-3 border-t border-border p-5">
        {error && (
          <p className="text-sm text-destructive" role="alert">{error}</p>
        )}

        <Button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          size="lg"
          className="w-full h-11 text-base rounded-md gap-2"
        >
          {isSubmitting ? UI_TEXT.status.saving : 'Tamamla ve Eşleşmeye Geç'}
          {!isSubmitting && <ChevronRight className="h-4 w-4" aria-hidden />}
        </Button>
      </div>
    </form>
  );
}

// Form işareti: çoklu seçimde kare (onay kutusu), tek seçimde daire (seçim düğmesi).
// Yalnız görsel — erişilebilir durum düğmenin aria-pressed / aria-checked'inden gelir.
function SelectionMark({ shape, checked }: { shape: 'square' | 'circle'; checked: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex h-4 w-4 shrink-0 items-center justify-center border',
        shape === 'square' ? 'rounded-sm' : 'rounded-full',
        checked ? 'border-primary bg-primary' : 'border-muted-foreground/50 bg-background',
      )}
    >
      {checked && (
        <span className={cn('h-1.5 w-1.5 bg-primary-foreground', shape === 'square' ? 'rounded-[1px]' : 'rounded-full')} />
      )}
    </span>
  );
}
