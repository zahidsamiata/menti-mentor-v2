import type { ReactNode } from 'react';
import { DashboardNav } from '@/components/organisms/DashboardNav';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      {/* md:pb-40 — sol-alt sabit kullanıcı kartı (F-33) sayfa sonundaki içeriği örtmesin */}
      <main className="p-6 md:pb-40">{children}</main>
    </div>
  );
}
