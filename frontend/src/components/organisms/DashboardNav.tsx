'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { ThemeToggle } from '@/components/molecules/ThemeToggle';
import { cn } from '@/lib/utils';

const NAV_BY_ROLE: Record<string, { href: string; label: string; icon: string }[]> = {
  MENTI: [
    { href: '/menti',             label: 'Ana Sayfa',    icon: '🏠' },
    { href: '/learning-journey',  label: 'Yolculuk',     icon: '🚀' },
    { href: '/meetings',          label: 'Görüşmelerim', icon: '📅' },
    { href: '/profile',           label: 'Profil',       icon: '👤' },
  ],
  MENTOR: [
    { href: '/mentor',               label: 'Ana Sayfa',    icon: '🏠' },
    { href: '/learning-journey',     label: 'Yolculuk',     icon: '🚀' },
    { href: '/mentor/availability',  label: 'Müsaitliğim',  icon: '📆' },
    { href: '/meetings',             label: 'Görüşmelerim', icon: '📅' },
    { href: '/profile',              label: 'Profil',       icon: '👤' },
  ],
};

export function DashboardNav() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (!user || !NAV_BY_ROLE[user.role]) return null;

  const items = NAV_BY_ROLE[user.role]!;

  async function handleLogout() {
    await logout();
    router.replace('/login');
  }

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <nav className="flex items-center gap-1 px-4 h-12 overflow-x-auto">
        {items.map(({ href, label, icon }) => {
          const active = pathname === href || (href !== '/menti' && href !== '/mentor' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition-colors shrink-0',
                active
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <span className="text-base leading-none">{icon}</span>
              <span>{label}</span>
            </Link>
          );
        })}
        <div className="ml-auto flex shrink-0 items-center gap-2 pl-2">
          <span className="hidden sm:inline max-w-[140px] truncate text-xs text-muted-foreground">
            {user.fullName}
          </span>
          <ThemeToggle />
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Çıkış Yap"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden />
            <span className="hidden sm:inline">Çıkış Yap</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
