import type { ReactNode } from 'react';
import { DashboardNav, DashboardUserCard } from '@/components/organisms/DashboardNav';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      {/* F-33: kullanıcı kartı içeriğin solunda kendi sütununda (akış içinde) — içeriği örtmez */}
      <div className="md:flex">
        <DashboardUserCard />
        <main className="min-w-0 flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
