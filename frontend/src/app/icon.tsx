import { ImageResponse } from 'next/og';
import { BrandMark } from '@/lib/brandImage';

/** Y-09 — Sekme simgesi (Next.js `icon` dosya konvansiyonu); build'de PNG olarak üretilir. */
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(<BrandMark size={size.width} />, size);
}
