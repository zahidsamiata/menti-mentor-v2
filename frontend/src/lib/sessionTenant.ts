/**
 * Oturum yanıtındaki kurum bilgisini TenantProvider'ın beklediği markaya çevirir.
 *
 * Neden: login / refresh / me yanıtları kurumun görünen adını `name` alanında döndürür
 * (backend: displayName ?? name). TenantBranding ise `displayName` alanını da bekler.
 */
import type { TenantBranding } from '@/types/tenant';

export interface SessionTenantLike {
  id?: string;
  name: string;
  slug?: string;
  logoUrl?: string | null;
  primaryColor?: string;
}

/** Kimliği ya da rengi olmayan (eksik) kurum bilgisinde null döner — marka uygulanmaz. */
export function toTenantBranding(t: SessionTenantLike | null | undefined): TenantBranding | null {
  if (!t?.id || !t.primaryColor) return null;
  return {
    id: t.id,
    name: t.name,
    displayName: t.name,
    slug: t.slug ?? '',
    logoUrl: t.logoUrl ?? null,
    primaryColor: t.primaryColor,
  };
}
