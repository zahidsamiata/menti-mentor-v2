'use client';

/**
 * DK-01 — tarayıcıda dış hata izlemeyi başlatır (KARAR-27 → A).
 * `NEXT_PUBLIC_SENTRY_DSN` yoksa hiçbir şey yapmaz (SDK indirilmez). Ekrana bir şey çizmez.
 * Ayrıntı ve kişisel veri süzgeci: `src/lib/errorMonitor.ts`.
 */

import { useEffect } from 'react';
import { initErrorMonitor } from '@/lib/errorMonitor';

export function ErrorMonitorInit() {
  useEffect(() => {
    void initErrorMonitor();
  }, []);
  return null;
}
