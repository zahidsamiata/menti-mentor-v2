/**
 * WCAG 2.x kontrast hesaplayıcısı — kontrast bekçisi testlerinin ortak yardımcısı (AJ-110 · AJ-117 · AJ-121).
 *
 * Neden ayrı dosya: aynı formül hem `emerald-contrast-guard.test.ts` (rozetler, açık temada koyu zemin,
 * keyfi hex metin) hem `share-buttons-contrast.test.ts` (paylaş düğmeleri) tarafından kullanılır;
 * kopyalanırsa iki hesap zamanla ayrışır. Zeminler `globals.css` tema değişkenlerinden okunur ki
 * tema rengi değişince ölçüm de değişsin.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/** WCAG 1.4.3 normal metin için AA eşiği. */
export const AA_TEXT = 4.5;

export type Rgb = [number, number, number];

export function hexToRgb(hex: string): Rgb {
  const raw = hex.replace('#', '');
  const v = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw;
  return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16) / 255) as Rgb;
}

export function hslToRgb(h: number, s: number, l: number): Rgb {
  const sat = s / 100;
  const light = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sat * Math.min(light, 1 - light);
  const f = (n: number) => light - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
}

export function luminance([r, g, b]: Rgb): number {
  const f = (x: number) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

export function contrast(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Saydam `fg` rengini `bg` üstüne `alpha` oranında karıştırır. */
export function blend(fg: Rgb, bg: Rgb, alpha: number): Rgb {
  return fg.map((c, i) => c * alpha + bg[i] * (1 - alpha)) as Rgb;
}

/** Tailwind saydamlık soneki: `/40` · `/[0.4]` · `/[.4]` · `/[40%]` → 0.4; sonek yoksa 1. */
export function parseAlpha(raw: string | undefined): number {
  if (!raw) return 1;
  const arbitrary = raw.match(/^\[([\d.]+)(%?)\]$/);
  if (arbitrary) return Number(arbitrary[1]) / (arbitrary[2] ? 100 : 1);
  return Number(raw) / 100;
}

// ─── globals.css zeminleri (metnin durduğu yüzeyler: sayfa + kart) ──────────
const SRC = join(__dirname, '..', '..');
const GLOBALS_CSS = readFileSync(join(SRC, 'app/globals.css'), 'utf8');

function themeToken(block: ':root' | '.dark', token: 'background' | 'card'): Rgb {
  const start = GLOBALS_CSS.indexOf(`${block} {`);
  const body = GLOBALS_CSS.slice(start, GLOBALS_CSS.indexOf('}', start));
  const m = body.match(new RegExp(`--${token}:\\s*([\\d.]+)\\s+([\\d.]+)%\\s+([\\d.]+)%`));
  if (start < 0 || !m) throw new Error(`globals.css ${block} --${token} bulunamadı`);
  return hslToRgb(Number(m[1]), Number(m[2]), Number(m[3]));
}

export type Theme = 'light' | 'dark';

export const SURFACES: Record<Theme, Record<'background' | 'card', Rgb>> = {
  light: { background: themeToken(':root', 'background'), card: themeToken(':root', 'card') },
  dark: { background: themeToken('.dark', 'background'), card: themeToken('.dark', 'card') },
};
