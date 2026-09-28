/**
 * /kurum-askida — askıdaki kurumun kullanıcısına gösterilen ekran (sayfa `'use client'`), AJ-72.
 *
 * Y-08: `noindex, nofollow` — oturumlu kullanıcıya özel ekran, dizine girmez.
 * AJ-25: altta yasal bağlantılı ortak alt bilgi (`PublicPageShell`) — askıdaki kullanıcı da
 * KVKK aydınlatma metnine ulaşabilmeli.
 */

import type { ReactNode } from 'react';
import { PRIVATE_AREA_METADATA } from '@/lib/privateAreaMetadata';
import { PublicPageShell } from '@/components/organisms/PublicPageShell';

export const metadata = PRIVATE_AREA_METADATA;

export default function TenantSuspendedLayout({ children }: { children: ReactNode }) {
  return <PublicPageShell>{children}</PublicPageShell>;
}
