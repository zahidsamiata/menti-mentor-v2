'use client';

/**
 * Admin grup layout — sidebar navigasyon + içerik alanı.
 * Yalnızca ADMIN rolündeki kullanıcılar bu layout'u görmeli;
 * middleware koruması Sprint 15'te eklenir (şimdilik client-side kontrol).
 */

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useTenant } from '@/providers/TenantProvider';
import { TenantLogo } from '@/components/atoms/TenantLogo';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/admin/waiting-room',      label: 'Bekleme Odası',   icon: '⏳' },
  { href: '/admin/approvals',         label: 'Onay Kuyruğu',    icon: '👤' },
  { href: '/admin/algorithm-tuner',   label: 'Algoritma',       icon: '🧠' },
  { href: '/admin/questions',         label: 'Soru Yönetimi',   icon: '❓' },
  { href: '/admin/tags',              label: 'Etiket Yönetimi', icon: '🏷️' },
  { href: '/admin/kpi',               label: 'KPI Paneli',      icon: '📊' },
] as const;

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const { tenant } = useTenant();

  // ADMIN olmayan kullanıcıyı yönlendir
  useEffect(() => {
    if (!isLoading && user && user.role !== 'ADMIN') {
      router.replace('/dashboard');
    }
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-border bg-card flex flex-col">
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 px-4 border-b border-border">
          {tenant && <TenantLogo tenant={tenant} size={28} />}
          <span className="text-sm font-semibold truncate">{tenant?.displayName ?? 'Admin'}</span>
        </div>

        {/* Navigasyon */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors',
                pathname.startsWith(href)
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <span>{icon}</span>
              {label}
            </Link>
          ))}
        </nav>

        {/* Alt bilgi */}
        <div className="p-3 border-t border-border">
          <p className="text-xs text-muted-foreground truncate">{user.fullName}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
      </aside>

      {/* İçerik */}
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
