import { ImageResponse } from 'next/og';
import { OG_IMAGE_ALT, OG_IMAGE_SIZE, OgCard } from '@/lib/brandImage';

/**
 * Y-09 — Link paylaşım görseli (Open Graph). Kök segmentte olduğu için tüm sayfalara
 * `og:image` olarak uygulanır; alt segment kendi görselini tanımlarsa o geçerli olur.
 */
export const alt = OG_IMAGE_ALT;
export const size = { ...OG_IMAGE_SIZE };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(<OgCard />, size);
}
