'use client';

/**
 * Y-11 (madde 60) — "Sayfanın başına dön" düğmesi.
 *
 * Kök layout'a TEK yerden takılır; landing, metodoloji, yasal sayfalar ve panellerdeki uzun listelerde
 * belirli bir kaydırmadan sonra sağ-altta görünür.
 * - Sağ-alt seçildi: panel kullanıcı kartı (DashboardNav) sol-altta; admin panelinde sağ-altta sabit öğe yok.
 * - `prefers-reduced-motion: reduce` ise yumuşak kaydırma yapılmaz (anlık atlar).
 * - Kaydırma dinleyicisi pasif; bileşen kalkınca temizlenir.
 * - Yazdırmada gizli (`print:hidden`).
 */

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Düğmenin görünmesi için gereken dikey kaydırma (px). */
export const SCROLL_TO_TOP_THRESHOLD_PX = 600;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > SCROLL_TO_TOP_THRESHOLD_PX);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  if (!visible) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Sayfanın başına dön"
      title="Sayfanın başına dön"
      className={cn(
        'fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full',
        'border border-border bg-card text-foreground shadow-md',
        'hover:bg-muted transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'print:hidden',
      )}
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}
