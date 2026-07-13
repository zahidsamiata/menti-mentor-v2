import type { ReactNode } from 'react';
import { DashboardNav } from '@/components/organisms/DashboardNav';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="p-6">{children}</main>
    </div>
  );
}
