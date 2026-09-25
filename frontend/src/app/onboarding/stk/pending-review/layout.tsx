/**
 * /onboarding/stk/pending-review — kurum kaydı sonrası inceleme bekleme ekranı (sayfa `'use client'`).
 *
 * Y-08: yalnız `noindex, nofollow` ekleyen ince server layout — görünüm/davranış değişmez.
 * Bkz. `@/lib/privateAreaMetadata`.
 */

import type { ReactNode } from 'react';
import { PRIVATE_AREA_METADATA } from '@/lib/privateAreaMetadata';

export const metadata = PRIVATE_AREA_METADATA;

export default function StkPendingReviewLayout({ children }: { children: ReactNode }) {
  return children;
}
