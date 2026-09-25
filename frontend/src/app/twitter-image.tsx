import { ImageResponse } from 'next/og';
import { OG_IMAGE_ALT, OG_IMAGE_SIZE, OgCard } from '@/lib/brandImage';

/** Y-09 — Twitter/X kartı görseli (`summary_large_image`); OG görseliyle aynı tasarım. */
export const alt = OG_IMAGE_ALT;
export const size = { ...OG_IMAGE_SIZE };
export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(<OgCard />, size);
}
