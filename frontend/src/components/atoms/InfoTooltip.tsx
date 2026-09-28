'use client';

/**
 * Atom: InfoTooltip
 *
 * Küçük "ⓘ" ikonu; üzerine gelince (hover) veya tıklayınca (mobil) açılan,
 * kaynak-şeffaf bir açıklama balonu. Landing page'de doğrulanabilir iddiaların
 * yanına kaynak göstermek için kullanılır.
 *
 * Erişilebilirlik:
 * - Tetikleyici gerçek bir <button> — klavye ile odaklanılabilir.
 * - Balon içeriği aria-describedby ile tetikleyiciye bağlanır (ekran okuyucu).
 * - Escape kapatır, dışarı tıklama kapatır.
 * - Hover (masaüstü) + tıklama (mobil/dokunmatik) birlikte desteklenir.
 *
 * AJ-86b (landing UX paketi, `docs/kararlar/konu/06-tasarim-ux.md` § Landing UX):
 * - Hover köprüsü: balon ile ikon arasındaki boşluk balonun kendi saydam dolgusudur
 *   (margin değil) → fare ikondan balona geçerken kapsayıcıdan çıkmaz; kapanış kısa
 *   gecikmelidir (çapraz hareket). Önceden `mt-2` boşluğunda balon kapanıyor, kaynak
 *   linklerine ulaşılamıyordu.
 * - Odak balonun içinde kalırsa (kaynak linkine Tab ya da dokunma) balon açık kalır.
 *   Önceden tetikleyicinin `onBlur`'u link tıklaması tamamlanmadan balonu kaldırıyordu.
 * - Konum: balon ekrana sığmıyorsa yukarı açılır / sola-sağa hizalanır
 *   (`computeTooltipPlacement`), dar ekranda genişlik ekranla sınırlıdır.
 * - İkon çevresindeki metnin rengini alır (`text-current`) → zemin ne olursa olsun
 *   yanındaki metin kadar okunur; önceki `text-muted-foreground` koyu landing
 *   zemininde soluk kalıyordu.
 */

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { FocusEvent, PointerEvent } from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InfoTooltipSource {
  /** Kaynağın görünen adı / akademik künye (ör. "DuBois et al. (2011), ..."). */
  label: string;
  /** Kaynağın URL'i. Opsiyonel — yoksa künye düz metin olarak render edilir. */
  url?: string;
}

interface InfoTooltipProps {
  /** Açıklama metni (BÖLÜM 1'den alınır). */
  detail: string;
  /** İsteğe bağlı kaynak listesi — link olarak render edilir. */
  sources?: InfoTooltipSource[];
  /**
   * Tetikleyicinin erişilebilir etiketi (ekran okuyucu).
   * Varsayılan: "Daha fazla bilgi".
   */
  label?: string;
  className?: string;
}

/** Fare balondan/ikondan çıktıktan sonra kapanmadan önce beklenen süre. */
export const TOOLTIP_CLOSE_DELAY_MS = 150;
/** Balonun ekran kenarına bırakacağı en az boşluk. */
export const TOOLTIP_VIEWPORT_GUTTER_PX = 16;
/** Tetikleyici ile balon kartı arasındaki (saydam köprü) boşluk. */
export const TOOLTIP_GAP_PX = 8;

export type TooltipVertical = 'bottom' | 'top';
export type TooltipAlign = 'center' | 'start' | 'end';

export interface TooltipPlacement {
  vertical: TooltipVertical;
  align: TooltipAlign;
}

export interface TooltipPlacementInput {
  trigger: { left: number; right: number; top: number; bottom: number };
  tooltipWidth: number;
  tooltipHeight: number;
  viewportWidth: number;
  viewportHeight: number;
}

/**
 * Balonun hangi yöne açılacağını hesaplar (saf fonksiyon — DOM'dan bağımsız test edilir).
 * Varsayılan: altta, ortalı. Altta yer yoksa ve üstte varsa yukarı açılır; ortalı
 * balon ekranın solundan/sağından taşıyorsa tetikleyicinin soluna/sağına hizalanır.
 */
export function computeTooltipPlacement({
  trigger,
  tooltipWidth,
  tooltipHeight,
  viewportWidth,
  viewportHeight,
}: TooltipPlacementInput): TooltipPlacement {
  const gutter = TOOLTIP_VIEWPORT_GUTTER_PX;
  const needed = tooltipHeight + TOOLTIP_GAP_PX + gutter;
  const spaceBelow = viewportHeight - trigger.bottom;
  const spaceAbove = trigger.top;
  const vertical: TooltipVertical = spaceBelow < needed && spaceAbove >= needed ? 'top' : 'bottom';

  const center = (trigger.left + trigger.right) / 2;
  const half = tooltipWidth / 2;
  let align: TooltipAlign = 'center';
  if (center - half < gutter) align = 'start';
  else if (center + half > viewportWidth - gutter) align = 'end';

  return { vertical, align };
}

const DEFAULT_PLACEMENT: TooltipPlacement = { vertical: 'bottom', align: 'center' };

const ALIGN_CLASS: Record<TooltipAlign, string> = {
  center: 'left-1/2 -translate-x-1/2',
  start: 'left-0',
  end: 'right-0',
};

const VERTICAL_CLASS: Record<TooltipVertical, string> = {
  // Dolgu (pt/pb) saydam hover köprüsüdür — margin kullanılmaz.
  bottom: 'top-full pt-2',
  top: 'bottom-full pb-2',
};

export function InfoTooltip({
  detail,
  sources,
  label = 'Daha fazla bilgi',
  className,
}: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<TooltipPlacement>(DEFAULT_PLACEMENT);
  const contentId = useId();
  const containerRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLSpanElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openNow = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose]);

  const closeNow = useCallback(() => {
    cancelClose();
    setOpen(false);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  // Dışarı tıklama + Escape ile kapatma
  useEffect(() => {
    if (!open) return;

    function handlePointer(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        closeNow();
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') closeNow();
    }

    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, closeNow]);

  // Açılınca balonun ekrana sığacağı yönü ölç.
  useLayoutEffect(() => {
    if (!open) {
      setPlacement(DEFAULT_PLACEMENT);
      return;
    }
    const trigger = triggerRef.current?.getBoundingClientRect();
    const card = cardRef.current?.getBoundingClientRect();
    if (!trigger || !card) return;
    setPlacement(
      computeTooltipPlacement({
        trigger,
        tooltipWidth: card.width,
        tooltipHeight: card.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      }),
    );
  }, [open]);

  function handlePointerEnter(event: PointerEvent) {
    // Dokunmatikte açma/kapama tıklamayla yapılır; sahte "enter" açıp tıklama hemen kapatmasın.
    if (event.pointerType === 'touch') return;
    openNow();
  }

  function handlePointerLeave(event: PointerEvent) {
    if (event.pointerType === 'touch') return;
    cancelClose();
    closeTimerRef.current = setTimeout(() => setOpen(false), TOOLTIP_CLOSE_DELAY_MS);
  }

  // Odak kapsayıcının dışına çıkınca kapat — balondaki kaynak linkine geçmek açık tutar.
  function handleBlur(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (next && containerRef.current?.contains(next)) return;
    closeNow();
  }

  return (
    <span
      ref={containerRef}
      className={cn('relative inline-flex align-middle', className)}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? contentId : undefined}
        onClick={() => (open ? closeNow() : openNow())}
        onFocus={openNow}
        className={cn(
          'inline-flex h-5 w-5 items-center justify-center rounded-full',
          'text-current opacity-90 hover:opacity-100 transition-opacity',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background',
        )}
      >
        <Info className="h-4 w-4" aria-hidden />
      </button>

      {open && (
        <span
          data-placement={`${placement.vertical}-${placement.align}`}
          className={cn(
            'absolute z-50 block w-72 max-w-[calc(100vw-2rem)]',
            VERTICAL_CLASS[placement.vertical],
            ALIGN_CLASS[placement.align],
          )}
        >
          <span
            ref={cardRef}
            id={contentId}
            role="tooltip"
            className={cn(
              'block rounded-lg border border-border bg-card p-3 text-left shadow-xl',
              'text-xs font-normal normal-case tracking-normal leading-relaxed text-muted-foreground',
            )}
          >
            {detail}
            {sources && sources.length > 0 && (
              <span className="mt-2 block border-t border-border pt-2">
                <span className="block font-semibold text-muted-foreground">Kaynak</span>
                {sources.map((s) =>
                  s.url ? (
                    <a
                      key={s.url}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-indigo-700 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-200"
                    >
                      {s.label}
                    </a>
                  ) : (
                    <span key={s.label} className="mt-1 block text-muted-foreground">
                      {s.label}
                    </span>
                  ),
                )}
              </span>
            )}
          </span>
        </span>
      )}
    </span>
  );
}
