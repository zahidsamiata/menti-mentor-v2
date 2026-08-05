'use client';

/**
 * Tema (koyu/açık) state yönetimi.
 *
 * Strateji:
 *  - Tema `<html>` üzerindeki `.dark` class'ı ile uygulanır (tailwind darkMode: ['class']).
 *  - Kullanıcı tercihi localStorage'da (`mm-theme`) tutulur; yenileme/sayfa geçişinde korunur.
 *  - İlk ziyarette (kayıtlı tercih yoksa) sistem tercihi (prefers-color-scheme) okunur;
 *    sistemin belirgin bir tercihi yoksa varsayılan KOYU (mevcut görünüm korunur).
 *  - FOUC (tema yanıp sönmesi) root layout'taki inline script ile önlenir; bu provider
 *    yalnızca React tarafındaki state'i ve toggle'ı yönetir.
 *
 * Genişletilebilirlik: yeni bir tema eklemek için Theme birliğine değer ekle + globals.css'e
 * ilgili class (`.dark`, `.<yeni-tema>`) tanımla. Renkler tek merkezde (globals.css) durur.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'mm-theme';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** `<html>` class'ını temayla eşitle. */
function applyThemeClass(theme: Theme): void {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('light', theme === 'light');
}

/** localStorage → geçerli tema; yoksa sistem tercihi; o da yoksa koyu. */
function resolveInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* localStorage erişilemez (SSR/gizli mod) — sistem tercihine düş */
  }
  // Sistemin AÇIK tercihi belirgeç ise light; aksi halde (dark veya belirsiz) koyu.
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // İlk render'da inline script class'ı zaten set etti; burada state'i ona hizala.
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    setThemeState(resolveInitialTheme());
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    applyThemeClass(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* yazılamazsa sessiz geç — tema yine de bu oturumda uygulanır */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme, ThemeProvider içinde kullanılmalıdır.');
  return ctx;
}
