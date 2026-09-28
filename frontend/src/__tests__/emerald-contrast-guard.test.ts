/**
 * AJ-85 · AJ-110 (erişilebilirlik denetimi bulgu #10, WCAG 1.4.3) — açık temada düşük kontrastlı
 * renkli metin / koyu zeminli rozet bekçisi.
 *
 * 1) `text-emerald-600` beyaz zeminde ~3.8:1 (AA 4.5:1 altı) — AJ-07/AJ-85 kapattı, yeni eklenmesin.
 * 2) Açık temada koyu tint zemin (`bg-<renk>-900`, saydamlık yok ya da ≥ %30): beyazla
 *    karışınca orta-koyu tona döner, üstündeki renkli metin ~1.2–2:1'e düşer. Koyu zemin yalnız
 *    `dark:` önekiyle serbest; açık temada rozetler `statusColors.ts` sınıflarını kullanır.
 * 3) `statusColors.ts` içindeki her rozet sınıfının kontrastı Tailwind paletinden WCAG formülüyle
 *    hesaplanır: açık temada (beyaz zemin) ve koyu temada (sayfa + kart zemini üstüne karışmış
 *    saydam zemin) ≥ 4.5:1.
 */
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import colors from 'tailwindcss/colors';

import { STATUS_PILL_CLASSES, SUCCESS_PILL_CLASS } from '@/lib/a11y/statusColors';

const SRC = join(__dirname, '..');
const LOW_CONTRAST = /(?<![\w-])text-emerald-600(?![\w-])/;
const PALETTE = 'red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone';
/**
 * Açık temada (öneksiz ya da yalnız `hover:` önekli) koyu tint zemin. `/10` `/20` gibi hafif tintler
 * (ör. uyarı kartı `bg-yellow-900/10`) zemini neredeyse beyaz bıraktığı için serbest.
 */
const DARK_TINT_ON_LIGHT = new RegExp(
  `(?<![\\w:-])(?:hover:)?bg-(?:${PALETTE})-900(?:/(?:[3-9]\\d|100))?(?![\\w/-])`,
);
const SOURCE_EXT = /\.(?:tsx?|jsx?|mjs|css)$/;
const AA_TEXT = 4.5;

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name === '__tests__' || name === 'node_modules' ? [] : walk(full);
    return SOURCE_EXT.test(name) ? [full] : [];
  });
}

// ─── WCAG 2.x göreli parlaklık / kontrast ───────────────────────────────────
type Rgb = [number, number, number];

function hexToRgb(hex: string): Rgb {
  const v = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16) / 255) as Rgb;
}

function hslToRgb(h: number, s: number, l: number): Rgb {
  const sat = s / 100;
  const light = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sat * Math.min(light, 1 - light);
  const f = (n: number) => light - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
}

function luminance([r, g, b]: Rgb): number {
  const f = (x: number) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrast(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function blend(fg: Rgb, bg: Rgb, alpha: number): Rgb {
  return fg.map((c, i) => c * alpha + bg[i] * (1 - alpha)) as Rgb;
}

// ─── globals.css zeminleri (rozetlerin durduğu yüzeyler: sayfa + kart) ──────
const GLOBALS_CSS = readFileSync(join(SRC, 'app/globals.css'), 'utf8');

function themeToken(block: ':root' | '.dark', token: 'background' | 'card'): Rgb {
  const start = GLOBALS_CSS.indexOf(`${block} {`);
  const body = GLOBALS_CSS.slice(start, GLOBALS_CSS.indexOf('}', start));
  const m = body.match(new RegExp(`--${token}:\\s*([\\d.]+)\\s+([\\d.]+)%\\s+([\\d.]+)%`));
  if (start < 0 || !m) throw new Error(`globals.css ${block} --${token} bulunamadı`);
  return hslToRgb(Number(m[1]), Number(m[2]), Number(m[3]));
}

const SURFACES = {
  light: { background: themeToken(':root', 'background'), card: themeToken(':root', 'card') },
  dark: { background: themeToken('.dark', 'background'), card: themeToken('.dark', 'card') },
};

type Swatch = { rgb: Rgb; alpha: number };

/** `bg-red-900/60` / `text-sky-400` → Tailwind palet rengi + saydamlık. */
function paletteSwatch(cls: string, prefix: 'bg' | 'text'): Swatch {
  const m = cls.match(new RegExp(`^${prefix}-([a-z]+)-(\\d+)(?:/(\\d+))?$`));
  const palette = m && (colors as unknown as Record<string, Record<string, string>>)[m[1]];
  const hex = palette?.[m![2]];
  if (!m || !hex) throw new Error(`palet dışı sınıf: ${cls}`);
  return { rgb: hexToRgb(hex), alpha: m[3] ? Number(m[3]) / 100 : 1 };
}

function pillParts(pill: string, theme: 'light' | 'dark') {
  const tokens = pill.split(' ');
  const own = theme === 'light'
    ? tokens.filter((t) => !t.includes(':'))
    : tokens.filter((t) => t.startsWith('dark:')).map((t) => t.slice('dark:'.length));
  const bg = own.filter((t) => t.startsWith('bg-'));
  const text = own.filter((t) => t.startsWith('text-'));
  expect(bg, `${theme} zemin tek sınıf olmalı: ${pill}`).toHaveLength(1);
  expect(text, `${theme} metin tek sınıf olmalı: ${pill}`).toHaveLength(1);
  return { bg: paletteSwatch(bg[0], 'bg'), text: paletteSwatch(text[0], 'text') };
}

function pillContrast(pill: string, theme: 'light' | 'dark', surface: Rgb): number {
  const { bg, text } = pillParts(pill, theme);
  const bgOnSurface = blend(bg.rgb, surface, bg.alpha);
  return contrast(blend(text.rgb, bgOnSurface, text.alpha), bgOnSurface);
}

describe('AJ-85 · AJ-110 · açık temada düşük kontrastlı renkli metin / rozet kalmadı', () => {
  const files = walk(SRC).map((f) => relative(SRC, f).split(sep).join('/'));

  function offenders(pattern: RegExp): string[] {
    return files.flatMap((rel) =>
      readFileSync(join(SRC, rel), 'utf8')
        .split('\n')
        .map((line, i) => (pattern.test(line) ? `${rel}:${i + 1}` : null))
        .filter((hit): hit is string => hit !== null),
    );
  }

  it('tarama gerçekten kaynak dosyaları görüyor (boş tarama yeşil sayılmaz)', () => {
    expect(files.length).toBeGreaterThan(100);
    expect(files).toContain('app/platform/dashboard/page.tsx');
    expect(files).toContain('app/platform/tenants/[id]/page.tsx');
  });

  it('src/ altında (testler hariç) `text-emerald-600` yok — istisna listesi yok', () => {
    expect(offenders(LOW_CONTRAST)).toEqual([]);
  });

  it('src/ altında açık temada koyu tint zemin (`bg-<renk>-900/60` vb.) yok — yalnız `dark:` önekiyle', () => {
    expect(offenders(DARK_TINT_ON_LIGHT)).toEqual([]);
  });

  it('desen kendini doğruluyor: eski rozet sınıfları yakalanır, dark:/hafif tint serbest', () => {
    expect(DARK_TINT_ON_LIGHT.test("'bg-red-900/60 text-destructive'")).toBe(true);
    expect(DARK_TINT_ON_LIGHT.test("'bg-sky-900/60 text-sky-600 dark:text-sky-400'")).toBe(true);
    expect(DARK_TINT_ON_LIGHT.test('bg-green-900/50 border')).toBe(true);
    expect(DARK_TINT_ON_LIGHT.test('dark:bg-red-900/60 dark:text-red-300')).toBe(false);
    expect(DARK_TINT_ON_LIGHT.test('border-yellow-700/50 bg-yellow-900/10')).toBe(false);
    expect(DARK_TINT_ON_LIGHT.test('dark:hover:bg-amber-900/40')).toBe(false);
  });

  it('yeşil rozet deseni açık temada açık zemin + koyu metin, koyu temada eski görünüm', () => {
    const classes = SUCCESS_PILL_CLASS.split(' ');
    expect(classes).toContain('bg-emerald-100');
    expect(classes).toContain('text-emerald-800');
    expect(classes).not.toContain('bg-green-900/60');
    expect(classes).toContain('dark:bg-green-900/60');
    expect(classes).toContain('dark:text-emerald-400');
  });

  for (const [name, pill] of Object.entries(STATUS_PILL_CLASSES)) {
    for (const theme of ['light', 'dark'] as const) {
      it(`${name} rozeti ${theme} temada sayfa ve kart zemininde ≥ ${AA_TEXT}:1`, () => {
        for (const [surfaceName, surface] of Object.entries(SURFACES[theme])) {
          const ratio = pillContrast(pill, theme, surface);
          expect(ratio, `${name}/${theme}/${surfaceName} = ${ratio.toFixed(2)}`).toBeGreaterThanOrEqual(AA_TEXT);
        }
      });
    }
  }
});
