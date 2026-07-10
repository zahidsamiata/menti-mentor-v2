/**
 * Auth grup layout — sidebar ve navigation yoktur.
 * Ortalanmış kart düzeni; arka planda muted renk.
 */

import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-muted flex items-center justify-center p-4">
      {children}
    </main>
  );
}
