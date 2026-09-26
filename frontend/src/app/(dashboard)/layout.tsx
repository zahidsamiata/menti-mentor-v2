import type { ReactNode } from 'react';
import { DashboardNav, DashboardUserCard } from '@/components/organisms/DashboardNav';
import { ReconsentBanner } from '@/components/organisms/ReconsentBanner';
import { PRIVATE_AREA_METADATA } from '@/lib/privateAreaMetadata';

// Y-08: oturum alanı arama motoru dizinine girmez.
export const metadata = PRIVATE_AREA_METADATA;

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      {/* F-33: kullanıcı kartı içeriğin solunda kendi sütununda (akış içinde) — içeriği örtmez */}
      <div className="md:flex">
        <DashboardUserCard />
        <main className="min-w-0 flex-1 p-6">
          {/* GV-18: rıza sürümü güncellenince tüm oturum alanlarında görünür (rol bağımsız) */}
          <ReconsentBanner />
          {children}
        </main>
      </div>
    </div>
  );
}
