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
 */

import { useEffect, useId, useRef, useState } from 'react';
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

export function InfoTooltip({
  detail,
  sources,
  label = 'Daha fazla bilgi',
  className,
}: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const contentId = useId();
  const containerRef = useRef<HTMLSpanElement>(null);

  // Dışarı tıklama + Escape ile kapatma
  useEffect(() => {
    if (!open) return;

    function handlePointer(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <span
      ref={containerRef}
      className={cn('relative inline-flex align-middle', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? contentId : undefined}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className={cn(
          'inline-flex h-4 w-4 items-center justify-center rounded-full',
          'text-muted-foreground hover:text-foreground transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background',
        )}
      >
        <Info className="h-3.5 w-3.5" aria-hidden />
      </button>

      {open && (
        <span
          id={contentId}
          role="tooltip"
          className={cn(
            'absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2',
            'rounded-lg border border-border bg-card p-3 text-left shadow-xl',
            'text-xs leading-relaxed text-muted-foreground',
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
                    className="mt-1 block text-primary hover:text-primary/80 hover:underline"
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
      )}
    </span>
  );
}
