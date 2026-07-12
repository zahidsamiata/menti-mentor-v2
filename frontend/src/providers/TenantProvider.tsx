'use client';

/**
 * Tenant marka sistemi için React context provider.
 *
 * Sorumluluk (Single Responsibility):
 *  - Tenant verisini AuthProvider'dan alır (prop olarak)
 *  - primaryColor'u HSL CSS değişkenlerine dönüştürür
 *  - Bu değişkenleri document.documentElement'e enjekte eder
 *
 * Neden CSS custom property enjeksiyonu?
 *  - Tailwind class'ları derleme zamanında üretilir; dinamik renk
 *    değerleri class ismine gömülemez (örn. bg-[#6366f1] JIT'te çalışır
 *    ama sabit token sistemiyle çelişir).
 *  - CSS değişkenleri ise runtime'da değiştirilebilir ve tüm alt
 *    bileşenler otomatik olarak güncellenir — yeniden render gerekmez.
 */

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from 'react';
import { buildTenantThemeVars } from '@/lib/branding';
import type { TenantBranding, TenantContextValue } from '@/types/tenant';

// ─── Context ─────────────────────────────────────────────────────────────────

const TenantContext = createContext<TenantContextValue>({
  tenant: null,
  isLoading: true,
});

// ─── Provider ────────────────────────────────────────────────────────────────

interface TenantProviderProps {
  children: ReactNode;
  tenant: TenantBranding | null;
  isLoading?: boolean;
}

export function TenantProvider({
  children,
  tenant,
  isLoading = false,
}: TenantProviderProps) {
  // Tenant değiştiğinde CSS değişkenlerini güncelle
  useEffect(() => {
    if (!tenant) return;

    const themeVars = buildTenantThemeVars(tenant.primaryColor);
    const root = document.documentElement;

    // Tek tek set etmek, diğer CSS değişkenlerini bozmadan günceller
    (Object.entries(themeVars) as [string, string][]).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Sayfa başlığını tenant adıyla güncelle
    document.title = `${tenant.displayName ?? tenant.name} — Mentoring`;
  }, [tenant]);

  return (
    <TenantContext.Provider value={{ tenant, isLoading }}>
      {children}
    </TenantContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

/** Tenant bağlamına erişmek için custom hook. Provider dışında kullanılırsa hata fırlatır. */
export function useTenant(): TenantContextValue {
  const ctx = useContext(TenantContext);
  if (ctx === undefined) {
    throw new Error('useTenant, TenantProvider içinde kullanılmalıdır.');
  }
  return ctx;
}
