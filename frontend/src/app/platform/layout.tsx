/**
 * Platform grup layout — ince server sarmalayıcı.
 *
 * Y-08: `metadata` yalnız server bileşeninden export edilebilir; oturum guard'ı `'use client'`
 * olduğu için `_PlatformGuard.tsx`'e taşındı, davranışı AYNEN korunur. Bu dosya yalnız
 * `noindex` ekler ve guard'ı sarar.
 */

import type { ReactNode } from 'react';
import { PRIVATE_AREA_METADATA } from '@/lib/privateAreaMetadata';
import PlatformGuard from './_PlatformGuard';

export const metadata = PRIVATE_AREA_METADATA;

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return <PlatformGuard>{children}</PlatformGuard>;
}
