/**
 * Dashboard grup layout — kimlik doğrulama gerektiren tüm sayfalar.
 * Sprint 13'te Sidebar + Navbar organism'leri buraya eklenir.
 */

import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar ve Navbar Sprint 13'te eklenir */}
      <main className="p-6">{children}</main>
    </div>
  );
}
