'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { cn } from '@/lib/utils';

const NAV_BY_ROLE: Record<string, { href: string; label: string; icon: string }[]> = {
  MENTI: [
    { href: '/menti',    label: 'Ana Sayfa',    icon: '🏠' },
    { href: '/meetings', label: 'Görüşmelerim', icon: '📅' },
    { href: '/disc-test', label: 'Profil',      icon: '👤' },
  ],
  MENTOR: [
    { href: '/mentor',               label: 'Ana Sayfa',    icon: '🏠' },
    { href: '/mentor/availability',  label: 'Müsaitliğim',  icon: '📆' },
    { href: '/meetings',             label: 'Görüşmelerim', icon: '📅' },
    { href: '/disc-test',            label: 'Profil',       icon: '👤' },
  ],
};

export function DashboardNav() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user || !NAV_BY_ROLE[user.role]) return null;

  const items = NAV_BY_ROLE[user.role]!;

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
      </nav>
    </header>
  );
}
