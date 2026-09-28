/**
 * AJ-86c — landing tema: açık tema seçilince landing de açık, koyu hâl yumuşak lacivert.
 *
 * Karar: `docs/kararlar/konu/06-tasarim-ux.md` § TEMA (G7-10/11/13). Landing eskiden sabit
 * koyu (`bg-slate-950`, `text-white`, `text-slate-*`) yazılmıştı; tema düğmesine uymuyordu.
 * Artık zemin/metin semantik `landing-*` token'larından gelir (`globals.css` :root + .dark),
 * renkli vurgular `text-X-700 dark:text-X-400` gibi eşli çiftlerdir.
 *
 * Bu dosya:
 *  1. token'ları globals.css'ten okur, iki temada metin/zemin kontrastını ÖLÇER (AA ≥ 4.5:1),
 *  2. landing kaynaklarında kullanılan her renkli vurgunun iki temada kontrastını ölçer,
 *  3. kaynak taraması: sabit nötr (slate/gray/…) sınıf yok; renkli metin açık temada ≥ 700 tonu,
 *  4. render: bölüm zemini token sınıfı; tema değişince zemin değeri gerçekten değişir.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render } from '@testing-library/react';
import tailwindColors from 'tailwindcss/colors';

import { HeroSection } from '@/app/_sections/HeroSection';
import { PainSection } from '@/app/_sections/PainSection';
import { EngineSection } from '@/app/_sections/EngineSection';
import { AlgorithmBento } from '@/app/_sections/AlgorithmBento';
import { GameSection } from '@/app/_sections/GameSection';
import { AdminCockpit } from '@/app/_sections/AdminCockpit';

const AA_TEXT = 4.5;
const AA_NON_TEXT = 3; // WCAG 1.4.11 — yalnız aria-hidden ikonlar

const APP = join(__dirname, '..', 'app');
const GLOBALS_CSS = readFileSync(join(APP, 'globals.css'), 'utf8');
const LANDING_FILES = [
  ...readdirSync(join(APP, '_sections')).filter((n) => n.endsWith('.tsx')).map((n) => join(APP, '_sections', n)),
  join(APP, 'page.tsx'),
];

// ─── Renk yardımcıları ──────────────────────────────────────────────────────

type Rgb = [number, number, number];

function hslToRgb(h: number, s: number, l: number): Rgb {
  const sat = s / 100;
  const light = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sat * Math.min(light, 1 - light);
  const f = (n: number) => light - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
}

function hexToRgb(hex: string): Rgb {
  const v = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16) / 255) as Rgb;
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

// ─── globals.css token'ları ─────────────────────────────────────────────────

function block(selector: ':root' | '.dark'): string {
  const start = GLOBALS_CSS.indexOf(`${selector} {`);
  expect(start, `${selector} bloğu bulunamadı`).toBeGreaterThanOrEqual(0);
  return GLOBALS_CSS.slice(start, GLOBALS_CSS.indexOf('}', start) + 1);
}

type Hsl = [number, number, number];
function landingTokens(selector: ':root' | '.dark'): Record<string, Hsl> {
  const out: Record<string, Hsl> = {};
  for (const m of block(selector).matchAll(/--landing-([a-z]+):\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/g)) {
    out[m[1]] = [Number(m[2]), Number(m[3]), Number(m[4])];
  }
  return out;
}

const THEMES = { light: landingTokens(':root'), dark: landingTokens('.dark') } as const;
const rgb = (theme: keyof typeof THEMES, name: string) => hslToRgb(...THEMES[theme][name]);

const TEXT_TOKENS = ['fg', 'soft', 'muted'] as const;
const SURFACE_TOKENS = ['bg', 'surface', 'raised', 'track'] as const;

// Renkli vurgular bu yüzeylerde ya da en çok %20'lik kendi renk tint'i üstünde (kart/chip) durur.
function accentBackgrounds(theme: keyof typeof THEMES, family: string): Array<[string, Rgb]> {
  const shade500 = hexToRgb((tailwindColors as unknown as Record<string, Record<string, string>>)[family][500]);
  const bgs: Array<[string, Rgb]> = (['bg', 'surface', 'raised'] as const).map((n) => [n, rgb(theme, n)]);
  bgs.push([`${family}-500/20 · surface`, blend(shade500, rgb(theme, 'surface'), 0.2)]);
  if (theme === 'light') bgs.push([`${family}-50`, hexToRgb((tailwindColors as unknown as Record<string, Record<string, string>>)[family][50])]);
  return bgs;
}

// ─── Kaynak taraması yardımcıları ───────────────────────────────────────────

const PALETTE = 'indigo|violet|rose|emerald|green|red|amber|yellow|blue|sky|orange|teal|purple|pink|cyan|lime|fuchsia';
const NEUTRAL = 'slate|gray|zinc|neutral|stone|black';

interface Hit { file: string; line: number; token: string; lineText: string }

function scan(pattern: RegExp): Hit[] {
  return LANDING_FILES.flatMap((file) =>
    readFileSync(file, 'utf8').split('\n').flatMap((lineText, i) =>
      [...lineText.matchAll(pattern)].map((m) => ({
        file: file.split('/app/')[1],
        line: i + 1,
        token: m[0],
        lineText,
      })),
    ),
  );
}

// ─────────────────────────────────────────────────────────────────────────────

describe('landing token’ları (globals.css)', () => {
  it('açık ve koyu temada aynı token seti tanımlı', () => {
    const names = [...TEXT_TOKENS, ...SURFACE_TOKENS, 'border'];
    for (const n of names) {
      expect(THEMES.light[n], `:root --landing-${n}`).toBeDefined();
      expect(THEMES.dark[n], `.dark --landing-${n}`).toBeDefined();
    }
  });

  it('koyu zemin yumuşak lacivert: mavi tonlu, siyaha yakın değil (eski slate-950 ≈ %5)', () => {
    const [h, s, l] = THEMES.dark.bg;
    expect(h).toBeGreaterThanOrEqual(215);
    expect(h).toBeLessThanOrEqual(235);
    expect(s).toBeGreaterThanOrEqual(25);
    expect(l).toBeGreaterThanOrEqual(10);
    expect(l).toBeLessThanOrEqual(20);
  });

  it('açık temada zemin açık (landing açık tema seçilince açık görünür)', () => {
    expect(THEMES.light.bg[2]).toBeGreaterThanOrEqual(90);
    expect(luminance(rgb('light', 'bg'))).toBeGreaterThan(luminance(rgb('light', 'fg')));
  });

  for (const theme of ['light', 'dark'] as const) {
    it(`${theme}: her metin token'ı her yüzeyde AA (≥ ${AA_TEXT}:1)`, () => {
      const failures: string[] = [];
      for (const t of TEXT_TOKENS) {
        for (const s of SURFACE_TOKENS) {
          const ratio = contrast(rgb(theme, t), rgb(theme, s));
          if (ratio < AA_TEXT) failures.push(`${t} / ${s} = ${ratio.toFixed(2)}`);
        }
      }
      expect(failures).toEqual([]);
    });
  }
});

describe('landing renkli vurgular — iki temada ölçülmüş kontrast', () => {
  const lightAccents = scan(new RegExp(`(?<![\\w:-])(?:hover:)?text-(${PALETTE})-(\\d{3})(?![\\w-])`, 'g'));
  const darkAccents = scan(new RegExp(`dark:(?:hover:)?text-(${PALETTE})-(\\d{3})(?![\\w-])`, 'g'));

  it('tarama vurgu buluyor (boş tarama yeşil sayılmaz)', () => {
    expect(lightAccents.length).toBeGreaterThan(20);
    expect(darkAccents.length).toBeGreaterThan(20);
  });

  for (const [theme, hits] of [['light', lightAccents], ['dark', darkAccents]] as const) {
    it(`${theme}: metin vurguları AA, yalnız aria-hidden ikonlar ≥ ${AA_NON_TEXT}:1`, () => {
      const failures = new Set<string>();
      for (const hit of hits) {
        const [, family, shade] = hit.token.match(new RegExp(`text-(${PALETTE})-(\\d{3})`))!;
        const color = hexToRgb((tailwindColors as unknown as Record<string, Record<string, string>>)[family][shade]);
        const min = hit.lineText.includes('aria-hidden') ? AA_NON_TEXT : AA_TEXT;
        for (const [bgName, bg] of accentBackgrounds(theme, family)) {
          const ratio = contrast(color, bg);
          if (ratio < min) failures.add(`${hit.file}:${hit.line} ${hit.token} / ${bgName} = ${ratio.toFixed(2)}`);
        }
      }
      expect([...failures]).toEqual([]);
    });
  }
});

describe('landing kaynak taraması — sabit tema rengi yok', () => {
  it('nötr palet sınıfı (slate/gray/…) yok — yerine landing-* token', () => {
    const hits = scan(new RegExp(`(?<!dark:)(?<![\\w-])(?:[a-z-]+:)*(?:bg|text|border|from|via|to|ring|fill)-(?:${NEUTRAL})(?:-\\d{2,3})?(?:/\\d+)?(?![\\w-])`, 'g'));
    expect(hits.map((h) => `${h.file}:${h.line} ${h.token}`)).toEqual([]);
  });

  it('beyaz yalnız doygun renkli zemin üstündeki metin/halka için (bg-white / border-white yok)', () => {
    const hits = scan(/(?<![\w-])(?:[a-z-]+:)*(?:bg|border|from|via|to)-white(?:\/\d+)?(?![\w-])/g);
    expect(hits.map((h) => `${h.file}:${h.line} ${h.token}`)).toEqual([]);
  });

  it('text-white yalnız renkli/gradyan zeminli öğelerde (sayfa zemininde text-landing-fg)', () => {
    // İzinli: aynı satırda gradyan/doygun zemin, ya da gradyan kutunun hemen içindeki etiket.
    const hits = scan(/(?<![\w:-])text-white(?![\w-])/g).filter((h) => {
      if (/bg-gradient|bg-blue-600/.test(h.lineText)) return false;
      if (/{name}|{dim} Tipi|M²/.test(h.lineText)) return false; // arketip kartı (gradyan) + logo kutusu
      if (/font-bold text-white shrink-0 shadow-lg/.test(h.lineText)) return false; // zaman çizelgesi noktası (renkli)
      return true;
    });
    expect(hits.map((h) => `${h.file}:${h.line}`)).toEqual([]);
  });

  it('renkli metin açık temada ≥ 700 tonu; açık ton yalnız dark: eşi olarak (aria-hidden ikon hariç)', () => {
    const hits = scan(new RegExp(`(?<![\\w:-])(?:hover:)?text-(?:${PALETTE})-(?:50|100|200|300|400|500|600)(?![\\w-])`, 'g'))
      .filter((h) => !h.lineText.includes('aria-hidden'));
    expect(hits.map((h) => `${h.file}:${h.line} ${h.token}`)).toEqual([]);
  });

  it('koyu tint zeminler (X-900/950) yalnız dark: eşi olarak', () => {
    const hits = scan(new RegExp(`(?<![\\w:-])bg-(?:${PALETTE})-(?:900|950)(?:/\\d+)?(?![\\w-])`, 'g'));
    expect(hits.map((h) => `${h.file}:${h.line} ${h.token}`)).toEqual([]);
  });
});

describe('landing zemini tema ile değişir (render)', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark');
    document.head.querySelectorAll('style[data-landing-test]').forEach((n) => n.remove());
  });

  const SECTIONS = [
    ['HeroSection', HeroSection],
    ['PainSection', PainSection],
    ['EngineSection', EngineSection],
    ['AlgorithmBento', AlgorithmBento],
    ['GameSection', GameSection],
    ['AdminCockpit', AdminCockpit],
  ] as const;

  for (const [name, Section] of SECTIONS) {
    it(`${name}: bölüm zemini landing token'ı (sabit bg-slate-950 değil)`, () => {
      const { container } = render(<Section />);
      const section = container.querySelector('section')!;
      expect(section.className).toMatch(/\b(bg-landing-bg|from-landing-bg)\b/);
      expect(section.className).not.toMatch(/slate/);
    });
  }

  it('.dark eklenince --landing-bg değeri açık zeminden lacivert zemine geçer', () => {
    const style = document.createElement('style');
    style.setAttribute('data-landing-test', '');
    style.textContent = `${block(':root')}\n${block('.dark')}`;
    document.head.appendChild(style);
    render(<HeroSection />);

    const read = () => getComputedStyle(document.documentElement).getPropertyValue('--landing-bg').trim();
    const lightValue = read();
    document.documentElement.classList.add('dark');
    const darkValue = read();

    expect(lightValue).toBe(THEMES.light.bg.map((v, i) => (i === 0 ? `${v}` : `${v}%`)).join(' '));
    expect(darkValue).toBe(THEMES.dark.bg.map((v, i) => (i === 0 ? `${v}` : `${v}%`)).join(' '));
    expect(darkValue).not.toBe(lightValue);
  });
});
