/**
 * AJ-121 (erişilebilirlik, WCAG 1.4.3) — paylaş düğmelerinin metni açık ve koyu temada AA.
 *
 * Önce: WhatsApp metni `text-[#25D366]` kendi `bg-[#25D366]/10` zemininde 1.84:1 (beyazda 1.98:1);
 * LinkedIn metni `text-[#0A66C2]` hover tintinde 4.23:1, koyu temada ~3:1. Şimdi her düğmenin metni,
 * zemin tinti (boşta `/10` ve hover `/20`) sayfa ve kart zemini üstüne karıştırılarak ölçülür.
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ShareButtons } from '@/components/molecules/ShareButtons';
import { SHARE_BUTTON_CLASSES } from '@/lib/a11y/shareColors';

import { AA_TEXT, SURFACES, blend, contrast, hexToRgb, parseAlpha, type Rgb, type Theme } from './helpers/wcag';

type Swatch = { rgb: Rgb; alpha: number };

function hexSwatch(cls: string, prefix: 'bg' | 'text'): Swatch {
  const m = cls.match(new RegExp(`^${prefix}-\\[#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\\](?:/(.+))?$`));
  if (!m) throw new Error(`keyfi hex değil: ${cls}`);
  return { rgb: hexToRgb(m[1]), alpha: parseAlpha(m[2]) };
}

/** Temanın metin rengi + zemin durumları (boşta, hover). Zemin tinti iki temada ortaktır. */
function buttonParts(classes: string, theme: Theme) {
  const tokens = classes.split(' ');
  const text = tokens.filter((t) => (theme === 'light' ? /^text-/.test(t) : /^dark:text-/.test(t)));
  expect(text, `${theme} metin tek sınıf olmalı: ${classes}`).toHaveLength(1);
  const backgrounds = tokens.filter((t) => /^(?:hover:)?bg-/.test(t));
  expect(backgrounds.map((t) => (t.startsWith('hover:') ? 'hover' : 'boşta')).sort(), `boşta + hover zemini: ${classes}`)
    .toEqual(['boşta', 'hover']);
  return {
    text: hexSwatch(text[0].replace(/^dark:/, ''), 'text'),
    backgrounds: backgrounds.map((t) => ({
      state: t.startsWith('hover:') ? 'hover' : 'boşta',
      ...hexSwatch(t.replace(/^hover:/, ''), 'bg'),
    })),
  };
}

describe('AJ-121 · paylaş düğmesi metni açık/koyu temada ≥ 4.5:1', () => {
  it('ShareButtons iki düğmede de ortak renk sınıflarını kullanıyor (satır kilitli)', () => {
    render(<ShareButtons shareHeadline="Örnek başlık" shareUrl="https://example.org" />);
    const whatsapp = screen.getByRole('link', { name: /WhatsApp/i });
    const linkedin = screen.getByRole('link', { name: /LinkedIn/i });
    for (const cls of SHARE_BUTTON_CLASSES.whatsapp.split(' ')) expect(whatsapp).toHaveClass(cls);
    for (const cls of SHARE_BUTTON_CLASSES.linkedin.split(' ')) expect(linkedin).toHaveClass(cls);
    // Marka rengi metin olarak açık temada kullanılmaz (yalnız zemin ve `dark:` metin).
    expect(whatsapp.className.split(' ')).not.toContain('text-[#25D366]');
    expect(linkedin.className.split(' ')).not.toContain('text-[#0A66C2]');
  });

  for (const [name, classes] of Object.entries(SHARE_BUTTON_CLASSES)) {
    for (const theme of ['light', 'dark'] as const) {
      it(`${name} düğmesi ${theme} temada boşta ve hover'da, sayfa ve kart zemininde ≥ ${AA_TEXT}:1`, () => {
        const { text, backgrounds } = buttonParts(classes, theme);
        for (const [surfaceName, surface] of Object.entries(SURFACES[theme])) {
          for (const bg of backgrounds) {
            const bgOnSurface = blend(bg.rgb, surface, bg.alpha);
            const ratio = contrast(blend(text.rgb, bgOnSurface, text.alpha), bgOnSurface);
            expect(ratio, `${name}/${theme}/${surfaceName}/${bg.state} = ${ratio.toFixed(2)}`).toBeGreaterThanOrEqual(AA_TEXT);
          }
        }
      });
    }
  }
});
