/**
 * AJ-85 · AJ-110 (erişilebilirlik denetimi bulgu #10, WCAG 1.4.3) — açık temada düşük kontrastlı
 * renkli metin / koyu zeminli rozet bekçisi.
 *
 * 1) `text-emerald-600` beyaz zeminde ~3.8:1 (AA 4.5:1 altı) — AJ-07/AJ-85 kapattı, yeni eklenmesin.
 * 2) Açık temada koyu tint zemin (`bg-<renk>-800/900/950` ya da en az o kadar koyu keyfi
 *    `bg-[#hex]`; saydamlık yok ya da ≥ %30): beyazla karışınca orta-koyu tona döner, üstündeki
 *    renkli metin ~1.2–2:1'e düşer (AJ-117: platform giriş hata kutusu `bg-red-950/40` 1.49:1).
 *    Koyu zemin yalnız `dark:` içeren önek zinciriyle serbest; `md:`/`hover:` gibi önekler açık
 *    temada da geçerli olduğu için taranır. Gerçekten her iki temada koyu olan alanlar aşağıdaki
 *    gerekçeli istisna listesindedir. Açık temada rozet/uyarı kutuları `statusColors.ts` kullanır.
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

// ─── Açık temada koyu zemin taraması (AJ-110 · AJ-117) ─────────────────────
const DARK_SHADES = '800|900|950';
const PALETTE_BG = new RegExp(`^bg-(${PALETTE})-(?:${DARK_SHADES})(?:/(.+))?$`);
const HEX_BG = /^bg-\[#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\](?:\/(.+))?$/;
/** `/10` `/20` gibi hafif tintler (ör. uyarı kartı `bg-yellow-900/10`) zemini neredeyse beyaz bırakır → serbest. */
const MIN_DARK_ALPHA = 0.3;
/** Keyfi hex zemin, paletin en açık 800 tonu kadar (ya da daha) koyuysa "koyu" sayılır. */
const DARK_HEX_MAX_LUMINANCE = Math.max(
  ...PALETTE.split('|').map((name) =>
    luminance(hexToRgb((colors as unknown as Record<string, Record<string, string>>)[name]['800'])),
  ),
);

/** `/40` · `/[0.4]` · `/[.4]` · `/[40%]` → 0.4; saydamlık yoksa 1. */
function parseAlpha(raw: string | undefined): number {
  if (!raw) return 1;
  const arbitrary = raw.match(/^\[([\d.]+)(%?)\]$/);
  if (arbitrary) return Number(arbitrary[1]) / (arbitrary[2] ? 100 : 1);
  return Number(raw) / 100;
}

function expandHex(hex: string): string {
  return hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
}

/**
 * Bir kaynak satırındaki, açık temada da uygulanan koyu zemin sınıfları. Önek zincirinde `dark`
 * geçmeyen her sınıf (öneksiz, `hover:`, `md:`, `md:hover:` …) açık temada da geçerlidir.
 * Yorum satırları (sınıf değil, açıklama) atlanır.
 */
function darkTintsOnLight(line: string): string[] {
  const trimmed = line.trim();
  if (/^(?:\/\/|\/\*|\*|\{\/\*)/.test(trimmed)) return [];
  return line.split(/[\s'"`{}(),;]+/).filter((token) => {
    const parts = token.replace(/^!/, '').split(':');
    const base = parts.pop()!.replace(/^!/, '');
    if (parts.some((variant) => variant.includes('dark'))) return false;
    const palette = base.match(PALETTE_BG);
    if (palette) return parseAlpha(palette[2]) >= MIN_DARK_ALPHA;
    const hex = base.match(HEX_BG);
    if (hex) {
      return parseAlpha(hex[2]) >= MIN_DARK_ALPHA
        && luminance(hexToRgb(expandHex(hex[1]))) <= DARK_HEX_MAX_LUMINANCE;
    }
    return false;
  });
}

/**
 * Gerekçeli istisnalar — açık temada da koyu zemin kasıtlı ve üstündeki metin AA'yı geçiyor.
 * Anahtar `dosya` + satırda geçen sınıf; bayat istisna (sınıf artık yoksa) test kırmızı olur.
 */
const DARK_BG_EXCEPTIONS: { file: string; token: string; reason: string }[] = [
  {
    file: 'app/metodoloji/page.tsx',
    token: 'bg-slate-950',
    // Metodoloji sayfası tema bağımsız, hep koyu tasarlandı: tüm metinler slate-200/400, indigo-400 gibi
    // açık tonlar; sayfa zemini temayla değişmez, açık temada "koyu zemin + koyu metin" oluşmaz.
    reason: 'hep koyu metodoloji sayfası zemini',
  },
  {
    file: 'app/platform/dashboard/page.tsx',
    token: 'bg-red-800',
    // "Reddet" düğmesi: dolu kırmızı zemin + `text-white` — beyaz/red-800 ≈ 8.3:1 (aşağıda hesaplanır);
    // tint değil dolu düğme, iki temada da aynı ve AA'yı geçer.
    reason: 'dolu kırmızı düğme, beyaz metin',
  },
];

function isException(rel: string, token: string): boolean {
  return DARK_BG_EXCEPTIONS.some((e) => e.file === rel && e.token === token);
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

  function darkBgHits(): { rel: string; line: number; token: string }[] {
    return files.flatMap((rel) =>
      readFileSync(join(SRC, rel), 'utf8')
        .split('\n')
        .flatMap((text, i) => darkTintsOnLight(text).map((token) => ({ rel, line: i + 1, token }))),
    );
  }

  it('src/ altında açık temada koyu zemin (`bg-<renk>-800/900/950`, koyu `bg-[#hex]`) yok — yalnız `dark:` önekiyle ya da gerekçeli istisna', () => {
    const offending = darkBgHits()
      .filter((hit) => !isException(hit.rel, hit.token))
      .map((hit) => `${hit.rel}:${hit.line} ${hit.token}`);
    expect(offending).toEqual([]);
  });

  it('istisna listesi bayat değil: her istisna kaynakta hâlâ geçiyor', () => {
    const hits = darkBgHits();
    for (const e of DARK_BG_EXCEPTIONS) {
      expect(hits.some((hit) => hit.rel === e.file && hit.token === e.token), `${e.file} ${e.token} (${e.reason})`).toBe(true);
    }
  });

  it('istisna "Reddet" düğmesi: beyaz metin / red-800 zemin ≥ 4.5:1', () => {
    const ratio = contrast(hexToRgb('#ffffff'), paletteSwatch('bg-red-800', 'bg').rgb);
    expect(ratio).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it('desen kendini doğruluyor: koyu zemin önek/ton/saydamlık biçimleri yakalanır, dark:/hafif tint/yorum serbest', () => {
    expect(darkTintsOnLight("'bg-red-900/60 text-destructive'")).toEqual(['bg-red-900/60']);
    expect(darkTintsOnLight("'bg-sky-900/60 text-sky-600 dark:text-sky-400'")).toEqual(['bg-sky-900/60']);
    expect(darkTintsOnLight('bg-green-900/50 border')).toEqual(['bg-green-900/50']);
    // AJ-117: -950 / -800 tonları, duyarlı ve zincirli önekler, keyfi saydamlık, koyu hex
    expect(darkTintsOnLight('<p className="text-sm text-destructive bg-red-950/40 rounded-lg">')).toEqual(['bg-red-950/40']);
    expect(darkTintsOnLight('bg-emerald-800 text-emerald-300')).toEqual(['bg-emerald-800']);
    expect(darkTintsOnLight('md:bg-slate-950')).toEqual(['md:bg-slate-950']);
    expect(darkTintsOnLight('md:hover:bg-red-900/50')).toEqual(['md:hover:bg-red-900/50']);
    expect(darkTintsOnLight('bg-red-950/[0.4]')).toEqual(['bg-red-950/[0.4]']);
    expect(darkTintsOnLight('bg-red-950/[40%]')).toEqual(['bg-red-950/[40%]']);
    expect(darkTintsOnLight('!bg-red-900')).toEqual(['!bg-red-900']);
    expect(darkTintsOnLight('bg-[#1a0f0f] text-red-400')).toEqual(['bg-[#1a0f0f]']);
    // serbest olanlar
    expect(darkTintsOnLight('dark:bg-red-900/60 dark:text-red-300')).toEqual([]);
    expect(darkTintsOnLight('md:dark:bg-red-950')).toEqual([]);
    expect(darkTintsOnLight('border-yellow-700/50 bg-yellow-900/10')).toEqual([]);
    expect(darkTintsOnLight('bg-emerald-950/15')).toEqual([]);
    expect(darkTintsOnLight('bg-red-950/[0.2]')).toEqual([]);
    expect(darkTintsOnLight('dark:hover:bg-amber-900/40')).toEqual([]);
    expect(darkTintsOnLight('bg-red-700 bg-[#6366f1] bg-[#25D366]/10')).toEqual([]);
    expect(darkTintsOnLight('/* eski sabit bg-slate-950 */')).toEqual([]);
  });

  it('AJ-117: platform giriş hata kutusu DANGER rozet desenini kullanıyor (açık/koyu temada AA)', () => {
    const source = readFileSync(join(SRC, 'app/platform/login/page.tsx'), 'utf8');
    expect(source).toMatch(/className=\{`[^`]*\$\{DANGER_PILL_CLASS\}[^`]*`\}>\{error\}/);
    expect(source).not.toMatch(/bg-red-950/);
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
