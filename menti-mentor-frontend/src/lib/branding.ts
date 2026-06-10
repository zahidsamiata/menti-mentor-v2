/**
 * Tenant marka rengi hesaplama yardımcıları.
 *
 * Tailwind CSS değişkenleri HSL kanalı formatında saklanır ("238 84% 67%").
 * Bu modül, backend'den gelen hex renk kodunu bu formata dönüştürür ve
 * açık/koyu tonları ile kontrast foreground rengini hesaplar.
 *
 * Tasarım kararı: Dönüşüm client'ta yapılır (server'da değil) çünkü
 * CSS custom property enjeksiyonu DOM'a ihtiyaç duyar.
 */

import type { TenantThemeVars } from '@/types/tenant';

/** Hex renk kodunu HSL kanalı dizisine dönüştürür. */
function hexToHsl(hex: string): [number, number, number] {
  // Hex'i normalize et (#fff → #ffffff)
  const normalized = hex.replace('#', '');
  const full = normalized.length === 3
    ? normalized.split('').map((c) => c + c).join('')
    : normalized;

  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));

    switch (max) {
      case r: h = ((g - b) / delta + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / delta + 2) / 6; break;
      case b: h = ((r - g) / delta + 4) / 6; break;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

/**
 * Verilen lightness değerine göre okunabilirlik için uygun foreground rengini döner.
 * WCAG AA kontrast oranı: açık arka plan → koyu metin, koyu arka plan → beyaz metin.
 */
function contrastForeground(lightness: number): string {
  // L > 55% ise arka plan açık sayılır → koyu metin
  return lightness > 55 ? '222 47% 11%' : '0 0% 100%';
}

/**
 * Tenant'ın primaryColor hex değerinden Tailwind CSS değişken setini üretir.
 * Geçersiz hex verilirse varsayılan indigo-500 kullanılır.
 */
export function buildTenantThemeVars(primaryColor: string): TenantThemeVars {
  // Geçersiz renk için güvenli fallback
  const safeColor = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(primaryColor)
    ? primaryColor
    : '#6366f1';

  const [h, s, l] = hexToHsl(safeColor);
  const hslBase = `${h} ${s}% ${l}%`;

  // Açık ve koyu tonlar için lightness'ı ±10 kaydır (sınırlar: 5–95)
  const lLight = Math.min(95, l + 10);
  const lDark = Math.max(5, l - 10);

  return {
    '--brand': hslBase,
    '--brand-foreground': contrastForeground(l),
    '--brand-light': `${h} ${s}% ${lLight}%`,
    '--brand-dark': `${h} ${s}% ${lDark}%`,
    '--primary': hslBase,
    '--primary-foreground': contrastForeground(l),
    '--ring': hslBase,
  };
}
