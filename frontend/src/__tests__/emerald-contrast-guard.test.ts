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
 * 4) AJ-121: açık temada da uygulanan keyfi hex METİN rengi (`text-[#hex]`, önek zincirinde `dark`
 *    yok) açık sayfa/kart zemininde ≥ 4.5:1 olmalı. Paylaş düğmesindeki `text-[#25D366]` (WhatsApp
 *    yeşili) beyazda 1.98:1'di. Marka rengi zemin/ikon olarak kalabilir; metin koyu tona çekilir,
 *    parlak marka tonu yalnız `dark:` ile. Renkli tint zemin üstündeki ölçüm (düğmenin kendi
 *    `bg-[#hex]/10` zemini, hover dahil) `share-buttons-contrast.test.ts` içindedir.
 */
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import colors from 'tailwindcss/colors';

import { STATUS_PILL_CLASSES, SUCCESS_PILL_CLASS } from '@/lib/a11y/statusColors';

import {
  AA_TEXT, SURFACES, blend, contrast, hexToRgb, luminance, parseAlpha, type Rgb,
} from './helpers/wcag';

const SRC = join(__dirname, '..');
const LOW_CONTRAST = /(?<![\w-])text-emerald-600(?![\w-])/;
const PALETTE = 'red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone';
const SOURCE_EXT = /\.(?:tsx?|jsx?|mjs|css)$/;

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name === '__tests__' || name === 'node_modules' ? [] : walk(full);
    return SOURCE_EXT.test(name) ? [full] : [];
  });
}

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
        && luminance(hexToRgb(hex[1])) <= DARK_HEX_MAX_LUMINANCE;
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

// ─── Açık temada keyfi hex metin taraması (AJ-121) ─────────────────────────
const HEX_TEXT = /^text-\[#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\](?:\/(.+))?$/;

/** Bir kaynak satırındaki, açık temada da uygulanan keyfi hex metin sınıfları (yorum satırları hariç). */
function hexTextsOnLight(line: string): { token: string; rgb: Rgb; alpha: number }[] {
  const trimmed = line.trim();
  if (/^(?:\/\/|\/\*|\*|\{\/\*)/.test(trimmed)) return [];
  return line.split(/[\s'"`{}(),;]+/).flatMap((token) => {
    const parts = token.replace(/^!/, '').split(':');
    const base = parts.pop()!.replace(/^!/, '');
    if (parts.some((variant) => variant.includes('dark'))) return [];
    const hex = base.match(HEX_TEXT);
    return hex ? [{ token, rgb: hexToRgb(hex[1]), alpha: parseAlpha(hex[2]) }] : [];
  });
}

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

  it('AJ-121: açık temada uygulanan keyfi hex metin (`text-[#hex]`) açık sayfa ve kart zemininde ≥ 4.5:1', () => {
    const hits = files.flatMap((rel) =>
      readFileSync(join(SRC, rel), 'utf8')
        .split('\n')
        .flatMap((text, i) => hexTextsOnLight(text).map((hit) => ({ ...hit, where: `${rel}:${i + 1}` }))),
    );
    // Boş tarama yeşil sayılmaz: paylaş düğmeleri hex metin taşıyor.
    expect(hits.some((hit) => hit.where.startsWith('lib/a11y/shareColors.ts'))).toBe(true);
    const failing = hits.flatMap((hit) =>
      Object.entries(SURFACES.light).flatMap(([surfaceName, surface]) => {
        const ratio = contrast(blend(hit.rgb, surface, hit.alpha), surface);
        return ratio >= AA_TEXT ? [] : [`${hit.where} ${hit.token} / ${surfaceName} = ${ratio.toFixed(2)}`];
      }),
    );
    expect(failing).toEqual([]);
  });

  it('AJ-121 desen: hex metin önek/saydamlık biçimleri yakalanır, dark: ve yorum serbest', () => {
    expect(hexTextsOnLight("'bg-[#25D366]/10 text-[#25D366]'").map((h) => h.token)).toEqual(['text-[#25D366]']);
    expect(hexTextsOnLight('hover:text-[#abc]/80').map((h) => [h.token, h.alpha])).toEqual([['hover:text-[#abc]/80', 0.8]]);
    expect(hexTextsOnLight('dark:text-[#25D366] md:dark:text-[#fff]')).toEqual([]);
    expect(hexTextsOnLight('// eski: text-[#25D366]')).toEqual([]);
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
