/**
 * /bildir — şüpheli davet bildirimi (herkese açık).
 *
 * AJ-25: yalnız altta yasal bağlantılı ortak alt bilgiyi (`PublicPageShell`) ekler —
 * sayfanın kendi görünümü/davranışı değişmez.
 */

import type { ReactNode } from 'react';
import { PublicPageShell } from '@/components/organisms/PublicPageShell';

export default function BildirLayout({ children }: { children: ReactNode }) {
  return <PublicPageShell>{children}</PublicPageShell>;
}
