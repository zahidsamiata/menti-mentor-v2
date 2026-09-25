// @vitest-environment node
/**
 * K-10 — sınıf haritası CSS'e giriyor mu?
 *
 * Tailwind yalnız `content` globlarındaki dosyaları tarar. `DISC_DIMENSION_COLORS`
 * `src/types/` altında durduğu ve bu klasör taranmadığı için eklenen `dark:*` sınıfları
 * (ve önceden `bg-yellow-100`/`text-yellow-800`) derlenmiş CSS'te hiç yoktu.
 * Bu test gerçek tailwind.config ile CSS üretir ve haritadaki her sınıfın çıktıda olduğunu doğrular.
 */
import { describe, it, expect } from 'vitest';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import tailwindConfig from '../../tailwind.config';
import { DISC_DIMENSION_COLORS } from '@/types/discTest';

/** Tailwind'in seçicide kaçırdığı karakterler (`:` `/` `[` `]` `=` `.`) — `.dark\:bg-green-500\/15` biçimi. */
function toSelector(cls: string): string {
  return '.' + cls.replace(/([:/[\]=.])/g, '\\$1');
}

describe('K-10 · tailwind content taraması', () => {
  it('content globları src/types klasörünü kapsıyor', () => {
    const content = tailwindConfig.content as string[];
    expect(content).toContain('./src/types/**/*.{ts,tsx}');
  });

  it('DISC_DIMENSION_COLORS içindeki her sınıf (dark: dahil) üretilen CSS\'te var', async () => {
    const result = await postcss([tailwindcss(tailwindConfig)]).process('@tailwind utilities;', { from: undefined });
    const css = result.css;
    const classes = Object.values(DISC_DIMENSION_COLORS).flatMap((s) => s.split(/\s+/)).filter(Boolean);
    const missing = classes.filter((cls) => !css.includes(toSelector(cls)));
    expect(missing).toEqual([]);
    // Özellikle raporlanan örnekler:
    expect(css).toContain(toSelector('dark:bg-green-500/15'));
    expect(css).toContain(toSelector('bg-yellow-100'));
    expect(css).toContain(toSelector('text-yellow-800'));
  }, 60_000);
});
