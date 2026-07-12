/**
 * Tenant branding ve konfigürasyon tipleri.
 * Backend'in Tenant Prisma modeliyle birebir eşleşir.
 */

export interface TenantBranding {
  id: string;
  name: string;           // Internal name
  displayName: string | null; // Kullanıcıya gösterilen isim — Prisma'da String? (nullable)
  slug: string;
  logoUrl: string | null;
  /** Hex renk kodu — örn. "#6366f1". CSS custom property'e dönüştürülür. */
  primaryColor: string;
}

/**
 * CSS'e enjekte edilen hesaplanmış tema değerleri.
 * TenantProvider, TenantBranding'den bu değerleri türetir.
 */
export interface TenantThemeVars {
  '--brand': string;           // HSL kanalları: "238 84% 67%"
  '--brand-foreground': string;
  '--brand-light': string;
  '--brand-dark': string;
  '--primary': string;
  '--primary-foreground': string;
  '--ring': string;
}

/** TenantProvider'ın React context'e sağladığı değerler. */
export interface TenantContextValue {
  tenant: TenantBranding | null;
  /** Tenant yükleniyor mu? (ilk sayfa yüklemesinde true) */
  isLoading: boolean;
}
