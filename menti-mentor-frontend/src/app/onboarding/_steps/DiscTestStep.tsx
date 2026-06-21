'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { DiscAnswer, DiscQuestion } from '@/types/onboarding';

// ─── Üst ilerleme çubuğu ──────────────────────────────────────────────────────

interface ProgressHeaderProps {
  current: number; // 1-indexed
  total:   number;
  percent: number;
}

function ProgressHeader({ current, total, percent }: ProgressHeaderProps) {
  return (
    <div className="space-y-2 mb-8">
      <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
        <span>Mizaç Testi</span>
        <span>
          Soru <strong className="text-foreground">{current}</strong> / {total}
        </span>
      </div>
      {/* İnce ilerleme çubuğu — Zeigarnik etkisi */}
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

// ─── Şık Kartı ───────────────────────────────────────────────────────────────

interface OptionCardProps {
  letter:      string; // "A" | "B" | "C" | "D"
  text:        string;
  isSelected:  boolean;
  isDisabled:  boolean;
  onClick:     () => void;
}

const OPTION_COLORS: Record<string, string> = {
  A: 'hover:border-violet-400 hover:bg-violet-50 data-[selected=true]:border-violet-500 data-[selected=true]:bg-violet-50',
  B: 'hover:border-blue-400   hover:bg-blue-50   data-[selected=true]:border-blue-500   data-[selected=true]:bg-blue-50',
  C: 'hover:border-emerald-400 hover:bg-emerald-50 data-[selected=true]:border-emerald-500 data-[selected=true]:bg-emerald-50',
  D: 'hover:border-amber-400  hover:bg-amber-50  data-[selected=true]:border-amber-500  data-[selected=true]:bg-amber-50',
};

const LETTER_COLORS: Record<string, string> = {
  A: 'bg-violet-100  text-violet-700',
  B: 'bg-blue-100    text-blue-700',
  C: 'bg-emerald-100 text-emerald-700',
  D: 'bg-amber-100   text-amber-700',
};

function OptionCard({ letter, text, isSelected, isDisabled, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      data-selected={isSelected}
      className={cn(
        'group w-full flex items-start gap-4 rounded-xl border-2 border-border bg-card p-4',
        'text-left transition-all duration-150 cursor-pointer',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        'active:scale-[0.98]',
        OPTION_COLORS[letter] ?? 'hover:border-primary/50 hover:bg-primary/5',
        isSelected && 'shadow-md',
      )}
      aria-pressed={isSelected}
    >
      {/* Harf rozeti */}
      <span className={cn(
        'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold',
        LETTER_COLORS[letter] ?? 'bg-muted text-muted-foreground',
      )}>
        {letter}
      </span>
      <span className="text-sm leading-relaxed text-foreground">{text}</span>
    </button>
  );
}

// ─── DiscTestStep ─────────────────────────────────────────────────────────────

interface DiscTestStepProps {
  questions:    DiscQuestion[];
  onComplete:   (answers: DiscAnswer[]) => void;
  isSubmitting: boolean;
  error:        string | null;
}

export function DiscTestStep({
  questions,
  onComplete,
  isSubmitting,
  error,
}: DiscTestStepProps) {
  const [currentIndex, setCurrentIndex]     = useState(0);
  const [answers,      setAnswers]          = useState<DiscAnswer[]>([]);
  const [visible,      setVisible]          = useState(true);
  const [selectedOpt,  setSelectedOpt]      = useState<string | null>(null);

  const total   = questions.length;
  const current = questions[currentIndex];
  const percent = Math.round((currentIndex / total) * 100);

  // Soru değiştiğinde fade-in tetikle
  useEffect(() => { setVisible(true); setSelectedOpt(null); }, [currentIndex]);

  const handleOption = (option: string) => {
    if (selectedOpt || isSubmitting) return;

    setSelectedOpt(option);

    const newAnswer: DiscAnswer = { questionId: current!.id, selectedOption: option };
    const newAnswers = [...answers, newAnswer];

    if (currentIndex < total - 1) {
      // Fade-out → ilerleme → fade-in
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          setAnswers(newAnswers);
          setCurrentIndex((i) => i + 1);
        }, 220);
      }, 350);
    } else {
      // Son soru — gönder
      setAnswers(newAnswers);
      setTimeout(() => onComplete(newAnswers), 400);
    }
  };

  if (!current) return null;

  return (
    <div className="space-y-0">
      {/* İlerleme başlığı — sabit */}
      <ProgressHeader current={currentIndex + 1} total={total} percent={percent} />

      {/* Soru kartı — fade geçişi */}
      <div
        className="transition-opacity duration-200 ease-in-out"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {/* Senaryo metni */}
        <div className="rounded-2xl border border-border bg-card p-6 mb-5 shadow-sm">
          <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
            {current.text}
          </p>
        </div>

        {/* Seçenekler */}
        <div className="space-y-3">
          {Object.entries(current.options).map(([letter, text]) => (
            <OptionCard
              key={letter}
              letter={letter}
              text={text}
              isSelected={selectedOpt === letter}
              isDisabled={!!selectedOpt || isSubmitting}
              onClick={() => handleOption(letter)}
            />
          ))}
        </div>

        {/* Gönderim / hata durumları */}
        {isSubmitting && (
          <p className="mt-4 text-sm text-center text-muted-foreground animate-pulse">
            Mizaç profilin hesaplanıyor…
          </p>
        )}
        {error && (
          <p className="mt-4 text-sm text-center text-destructive" role="alert">{error}</p>
        )}
      </div>
    </div>
  );
}
