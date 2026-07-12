/**
 * Atom: TenantLogo
 *
 * Tenant logosu gösterir. Logo URL'i yoksa tenant adının baş harflerinden
 * renk dairesi oluşturur (tenant brand rengiyle). Bu, logo olmayan tenant'larda
 * tutarlı bir görsel kimlik sağlar.
 */

import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { TenantBranding } from '@/types/tenant';

interface TenantLogoProps {
  tenant: Pick<TenantBranding, 'displayName' | 'logoUrl'>;
  className?: string;
  /** Logo boyutu (px). Hem genişlik hem yükseklik için kullanılır. */
  size?: number;
}

export function TenantLogo({ tenant, className, size = 32 }: TenantLogoProps) {
  const label = tenant.displayName ?? '';

  if (tenant.logoUrl) {
    return (
      <Image
        src={tenant.logoUrl}
        alt={label ? `${label} logosu` : 'Tenant logosu'}
        width={size}
        height={size}
        className={cn('object-contain', className)}
        priority
      />
    );
  }

  // Logo yoksa: baş harfler + brand arka plan rengi
  const initials = label
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('') || '?';

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-md',
        'bg-brand text-brand-foreground font-semibold select-none',
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-label={label ? `${label} logosu` : 'Tenant logosu'}
    >
      {initials}
    </span>
  );
}
