'use client';

/**
 * Organism: DiscTestCard — tek soru kartı + Likert ölçeği
 *
 * Sorumluluk: Aktif soruyu göstermek, kullanıcı seçimini callback'e iletmek.
 * Faz geçiş kararı bu bileşende verilmez — hook'tan gelen `phaseJustChanged` flag'ine bakar.
 *
 * ──────────────────────────────────────────────────────────────
 * Props Tasarımı (Refactored)
 * ──────────────────────────────────────────────────────────────
 * Önceki versiyon: 9 prop, `previousPhase` ile bileşen faz karşılaştırması yapıyordu.
 * Yeni versiyon  : 7 prop; `phaseJustChanged` hook'tan gelir, bileşen sadece gösterir.
 *
 * `previousPhase` kaldırıldı: Bu bilgi useDiscTest hook'un sorumluluğundadır.
 * Bileşen için "faz değişti" sinyali boolean flag yeterlidir.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LikertScale } from '@/components/molecules/LikertScale';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import {
  DISC_DIMENSION_COLORS,
  DISC_DIMENSION_LABELS,
  type DiscQuestion,
  type LikertValue,
} from '@/types/discTest';
import { cn } from '@/lib/utils';

// ─── Alt bileşen: QuestionProgressBar ────────────────────────────────────────

/**
 * Molecule: QuestionProgressBar — ilerleme çubuğu + soru sayacı + rozet.
 * DiscTestCard'dan çıkarıldı: tek sorumluluğu seri göstermek.
 * Başka ekranlarda (onboarding özet, rapor) yeniden kullanılabilir.
 */
interface QuestionProgressBarProps {
  questionNumber: number;
  totalQuestions: number;
  progressPercent: number;
  question: DiscQuestion;
}

function QuestionProgressBar({
  questionNumber,
  totalQuestions,
  progressPercent,
  question,
}: QuestionProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Soru {questionNumber} / {totalQuestions}
        </span>
        <div className="flex items-center gap-2">
          <Badge
            className={cn('text-xs', DISC_DIMENSION_COLORS[question.discDimension])}
            title={DISC_DIMENSION_LABELS[question.discDimension]}
          >
            {question.type === 'DEEPENING' ? '✦ Derinleştirici' : 'Temel'}
          </Badge>
          <span className="text-xs font-medium text-muted-foreground">%{progressPercent}</span>
        </div>
      </div>
      <Progress value={progressPercent} />
    </div>
  );
}

// ─── Ana bileşen: DiscTestCard ────────────────────────────────────────────────

interface DiscTestCardProps {
  question: DiscQuestion;
  questionNumber: number;
  totalQuestions: number;
  progressPercent: number;
  /**
   * Hook'tan gelen faz geçiş sinyali.
   * true: CORE→DEEPENING geçişi henüz gerçekleşti → banner göster.
   * Her yanıt sonrası hook bu değeri false'a sıfırlar.
   */
  phaseJustChanged: boolean;
  isSubmitting: boolean;
  error: string | null;
  onAnswer: (value: LikertValue) => Promise<void>;
}

export function DiscTestCard({
  question,
  questionNumber,
  totalQuestions,
  progressPercent,
  phaseJustChanged,
  isSubmitting,
  error,
  onAnswer,
}: DiscTestCardProps) {
  const [selected, setSelected] = useState<LikertValue | null>(null);
  const [showTransitionBanner, setShowTransitionBanner] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Yeni soru geldiğinde seçimi sıfırla ve karta odaklan (erişilebilirlik)
  useEffect(() => {
    setSelected(null);
    cardRef.current?.focus();
  }, [question.id]);

  /**
   * Faz geçiş banner yönetimi.
   * phaseJustChanged=true geldiğinde banner açılır; 3 saniye sonra kapanır.
   * Cleanup: bileşen unmount'ta veya flag tekrar true gelirse timer iptal edilir.
   */
  useEffect(() => {
    if (!phaseJustChanged) return;
    setShowTransitionBanner(true);
    const timer = setTimeout(() => setShowTransitionBanner(false), 3000);
    return () => clearTimeout(timer);
  }, [phaseJustChanged]);

  /**
   * Seçim handler: 250ms görsel feedback gecikmesi.
   * Kullanıcı seçimini görmeden sayfa geçişi olmaması için minimal bekleme.
   */
  const handleSelect = useCallback(
    async (value: LikertValue) => {
      if (isSubmitting) return;
      setSelected(value);
      await new Promise<void>((resolve) => setTimeout(resolve, 250));
      await onAnswer(value);
    },
    [isSubmitting, onAnswer],
  );

  return (
    <div className="w-full max-w-lg mx-auto space-y-6 animate-fade-in">
      {/* Faz geçiş banner — yalnızca CORE→DEEPENING geçişinde görünür */}
      {showTransitionBanner && (
        <AlertMessage
          type="success"
          message="Temel sorular tamamlandı! Artık sizi daha iyi tanımak için derinleştirici sorulara geçiyoruz."
          className="animate-fade-in"
        />
      )}

      <QuestionProgressBar
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
        progressPercent={progressPercent}
        question={question}
      />

      {/* Soru kartı */}
      <div
        ref={cardRef}
        tabIndex={-1}
        role="group"
        aria-label={`Soru ${questionNumber}: ${question.text}`}
        className="rounded-2xl border border-border bg-card p-8 shadow-sm focus:outline-none"
      >
        <p className="text-lg font-medium leading-relaxed text-foreground mb-8 min-h-[4rem]">
          {question.text}
        </p>
        <LikertScale value={selected} onChange={handleSelect} disabled={isSubmitting} />
      </div>

      {error && <AlertMessage type="error" message={error} />}

      <p className="text-center text-xs text-muted-foreground">
        Cevabınızı seçtiğinizde otomatik olarak ilerler
      </p>
    </div>
  );
}
