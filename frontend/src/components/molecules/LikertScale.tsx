'use client';

/**
 * Molecule: LikertScale — 1-5 Likert ölçeği.
 *
 * Erişilebilirlik:
 *  - Radiogroup + radiobutton rolü
 *  - Her seçenek aria-label içerir ("Hiç katılmıyorum" vb.)
 *  - ~~[ESKİ · 2026-09-25] Klavye gezintisi native radio ile ücretsiz gelir~~
 *    ⚠️ GÜNCELLEME (2026-09-25, F-21): düğmeler native radio DEĞİL; ok tuşu gezintisi ve gezici
 *    tabIndex `handleRadioGroupKeyDown` ile eklendi. Seçim hemen ilerlettiği için ok tuşu yalnız
 *    odağı taşır, seçim Boşluk/Enter ile yapılır.
 *
 * Görsel:
 *  - Seçili: brand rengi (--primary) arka plan
 *  - Hover: muted arka plan
 *  - Uç etiketler: "Hiç katılmıyorum" ↔ "Tamamen katılıyorum"
 */

import { LIKERT_LABELS, type LikertValue } from '@/types/discTest';
import { cn } from '@/lib/utils';
import { handleRadioGroupKeyDown, rovingTabIndex } from '@/lib/a11y/radioGroup';

interface LikertScaleProps {
  value: LikertValue | null;
  onChange: (value: LikertValue) => void;
  disabled?: boolean;
}

const KEYS = [1, 2, 3, 4, 5] as const;

export function LikertScale({ value, onChange, disabled = false }: LikertScaleProps) {
  return (
    <div className="space-y-3">
      {/* Seçenek düğmeleri */}
      <div
        role="radiogroup"
        aria-label="Katılım düzeyi seçin"
        onKeyDown={(e) => handleRadioGroupKeyDown(e, { selectOnMove: false })}
        className="flex items-center justify-between gap-2"
      >
        {KEYS.map((k, index) => {
          const selected = value === k;
          return (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={rovingTabIndex(index, value === null ? -1 : KEYS.indexOf(value))}
              aria-label={LIKERT_LABELS[k].ariaLabel}
              disabled={disabled}
              onClick={() => onChange(k)}
              className={cn(
                'flex-1 h-12 rounded-lg border-2 text-sm font-semibold transition-all duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                selected
                  ? 'border-primary bg-primary text-primary-foreground scale-105 shadow-md'
                  : 'border-border bg-background text-foreground hover:bg-muted hover:border-primary/50',
              )}
            >
              {k}
            </button>
          );
        })}
      </div>

      {/* Uç etiketler */}
      <div className="flex justify-between">
        <span className="text-xs text-muted-foreground">Hiç katılmıyorum</span>
        <span className="text-xs text-muted-foreground">Tamamen katılıyorum</span>
      </div>
    </div>
  );
}
