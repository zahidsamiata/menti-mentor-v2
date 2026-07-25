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
  /** Kaynağın görünen adı (ör. "Harvard Business Review, 2024"). */
  label: string;
  /** Kaynağın URL'i. */
  url: string;
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
          'text-slate-400 hover:text-slate-200 transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-950',
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
            'rounded-lg border border-white/10 bg-slate-900 p-3 text-left shadow-xl',
            'text-xs leading-relaxed text-slate-300',
          )}
        >
          {detail}
          {sources && sources.length > 0 && (
            <span className="mt-2 block border-t border-white/10 pt-2">
              <span className="block font-semibold text-slate-400">Kaynak</span>
              {sources.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block truncate text-indigo-400 hover:text-indigo-300 hover:underline"
                >
                  {s.label}
                </a>
              ))}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
