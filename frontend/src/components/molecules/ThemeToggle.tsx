'use client';

/**
 * Koyu/açık tema değiştirme butonu.
 * Tercih ThemeProvider tarafından localStorage'da tutulur; tüm sayfalarda geçerlidir.
 */

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
      title={isDark ? 'Açık tema' : 'Koyu tema'}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border',
        'text-muted-foreground hover:text-foreground hover:bg-muted transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      {isDark
        ? <Sun className="h-4 w-4" aria-hidden />
        : <Moon className="h-4 w-4" aria-hidden />}
    </button>
  );
}
