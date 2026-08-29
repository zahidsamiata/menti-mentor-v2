'use client';

/**
 * Admin grup layout — sidebar navigasyon + içerik alanı.
 *
 * Yalnızca ADMIN rolündeki kullanıcılar bu layout'u görmeli. Aşağıdaki useEffect KABA bir
 * istemci kapısıdır — ⚠️ frontend middleware ile ÇÖZÜLEMEZ: auth cookie'leri backend
 * origin'inde (`api.sivilkapasite.org`); frontend origin'i (`sivilkapasite.org`) bunları almaz
 * (parent domain paylaşımı yok) → middleware token/rol OKUYAMAZ. ASIL koruma BACKEND yetki
 * denetimidir (`requireRole`). G1-17 → Faz 3b (endpoint yetki denetimi). Bkz. `src/middleware.ts`
 * + `docs/kararlar/00-KARAR-TAKIP.md` (G1-17).
 */

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { useTenant } from '@/providers/TenantProvider';
import { TenantLogo } from '@/components/atoms/TenantLogo';
import { ThemeToggle } from '@/components/molecules/ThemeToggle';
import { TenantCorrectionBanner } from '@/components/molecules/TenantCorrectionBanner';
import { cn } from '@/lib/utils';

// Sol menü — KARAR 1: 4 mantıksal grup, sıklığa göre sıralı.
// Kaynak: docs/kararlar/tasarim-kararlari-admin-2026-08-11.md (KARAR 1).
// Tüm öğeler ADMIN'e görünür (rol gating layout seviyesinde; öğe-bazlı gizleme yok).
const NAV_GROUPS = [
  {
    title: 'Günlük İşler',
    items: [
      { href: '/admin/approvals',    label: 'Onay',          icon: '👤' },
      { href: '/admin/invite',       label: 'Davet',         icon: '📨' },
      { href: '/admin/waiting-room', label: 'Bekleme Odası', icon: '⏳' },
      { href: '/admin/eslesmeler',   label: 'Eşleşmeler',    icon: '🔗' },
    ],
  },
  {
    title: 'İnsanlar',
    items: [
      { href: '/admin/mentor-havuzu', label: 'Mentör Havuzu', icon: '👥' },
      { href: '/admin/menti-havuzu',  label: 'Menti Havuzu',  icon: '👫' },
      { href: '/admin/managers',      label: 'Yöneticiler',   icon: '🛡️' },
    ],
  },
  {
    title: 'Program & İçerik',
    items: [
      { href: '/admin/kpi',                 label: 'Program',            icon: '📊' },
      { href: '/admin/questions',           label: 'Soru Yönetimi',      icon: '❓' },
      { href: '/admin/certification',       label: 'Sertifika Konuları', icon: '🎓' },
      { href: '/admin/sertifika-sonuclari', label: 'Sertifika Sonuç',    icon: '📜' },
      { href: '/admin/learning-journey',    label: 'Öğrenme Yolculuğu',  icon: '🚀' },
    ],
  },
  {
    title: 'Ayarlar & Kurulum',
    items: [
      { href: '/admin/branding',        label: 'Marka',           icon: '🎨' },
      { href: '/admin/algorithm-tuner', label: 'Algoritma',       icon: '🧠' },
      { href: '/admin/tags',            label: 'Etiket Yönetimi', icon: '🏷️' },
    ],
  },
] as const;

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, logout } = useAuth();
  const { tenant } = useTenant();

  async function handleLogout() {
    await logout();
    router.replace('/login');
  }

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
          <div className="ml-auto shrink-0">
            <ThemeToggle />
          </div>
        </div>

        {/* Navigasyon — KARAR 1: 4 mantıksal grup, her grup başlıklı */}
        <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="space-y-1">
              <p className="px-3 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                {group.title}
              </p>
              {group.items.map(({ href, label, icon }) => (
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
            </div>
          ))}
        </nav>

        {/* Alt bilgi + çıkış */}
        <div className="p-3 border-t border-border space-y-2">
          <div>
            <p className="text-xs text-muted-foreground truncate">{user.fullName}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* İçerik */}
      <main className="flex-1 overflow-auto p-6">
        {/* #37: başvuru için düzeltme istendiyse üstte bilgi bandı + tekrar gönderim */}
        <TenantCorrectionBanner />
        {children}
      </main>
    </div>
  );
}
