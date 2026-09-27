/**
 * /pending-approval — kayıt sonrası onay bekleme ekranı (sayfa `'use client'`).
 *
 * Y-08: yalnız `noindex, nofollow` ekleyen ince server layout — görünüm/davranış değişmez.
 * Bkz. `@/lib/privateAreaMetadata`.
 * AJ-25: altta yasal bağlantılı ortak alt bilgi (`PublicPageShell`).
 */

import type { ReactNode } from 'react';
import { PRIVATE_AREA_METADATA } from '@/lib/privateAreaMetadata';
import { PublicPageShell } from '@/components/organisms/PublicPageShell';

export const metadata = PRIVATE_AREA_METADATA;

export default function PendingApprovalLayout({ children }: { children: ReactNode }) {
  return <PublicPageShell>{children}</PublicPageShell>;
}
