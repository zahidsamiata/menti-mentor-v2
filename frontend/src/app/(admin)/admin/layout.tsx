/**
 * /admin/* — kurum yönetici paneli. Üstteki `(admin)/layout.tsx` `'use client'` olduğu için
 * metadata export edemez; `noindex` bu ince server layout'ta verilir.
 *
 * Y-08: yalnız `noindex, nofollow` ekler — görünüm/davranış değişmez.
 * Bkz. `@/lib/privateAreaMetadata`.
 */

import type { ReactNode } from 'react';
import { PRIVATE_AREA_METADATA } from '@/lib/privateAreaMetadata';

export const metadata = PRIVATE_AREA_METADATA;

export default function AdminNoIndexLayout({ children }: { children: ReactNode }) {
  return children;
}
