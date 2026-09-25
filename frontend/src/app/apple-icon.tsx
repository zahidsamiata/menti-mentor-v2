import { ImageResponse } from 'next/og';
import { BrandMark } from '@/lib/brandImage';

/** Y-09 — iOS ana ekran simgesi (Next.js `apple-icon` dosya konvansiyonu). */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(<BrandMark size={size.width} />, size);
}
