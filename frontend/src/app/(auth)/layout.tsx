/**
 * Auth grup layout — sidebar ve navigation yoktur.
 * Ortalanmış kart düzeni; arka planda muted renk.
 * AJ-25: altta yasal bağlantılı ortak alt bilgi (`PublicPageShell`).
 */

import type { ReactNode } from 'react';
import { PublicPageShell } from '@/components/organisms/PublicPageShell';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <PublicPageShell>
      <main className="min-h-screen bg-muted flex items-center justify-center p-4">
        {children}
      </main>
    </PublicPageShell>
  );
}
