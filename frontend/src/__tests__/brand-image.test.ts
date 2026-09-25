/**
 * Y-09 — Site simgesi + paylaşım görseli metadata sözleşmesi.
 *
 * Görsellerin kendisi build'de üretilir (`next build` çıktısında /icon, /opengraph-image);
 * burada dosya konvansiyonu export'ları, kök layout OG/Twitter meta'sı ve görsel metinlerinin
 * varsayılan OG fontuyla çizilebilirliği (ğ/ş/İ yok) doğrulanır.
 */
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-sans', className: 'inter' }),
}));

import {
  BRAND_TEXT,
  OG_IMAGE_ALT,
  UNSUPPORTED_OG_GLYPHS,
  isOgSafeText,
} from '@/lib/brandImage';
import * as icon from '@/app/icon';
import * as appleIcon from '@/app/apple-icon';
import * as ogImage from '@/app/opengraph-image';
import * as twitterImage from '@/app/twitter-image';
import { metadata as rootMetadata } from '@/app/layout';
import { metadata as homeMetadata } from '@/app/page';
import { metadata as metodolojiMetadata } from '@/app/metodoloji/page';

describe('Y-09 görsel metinleri — varsayılan OG fontu', () => {
  it('isOgSafeText desteklenmeyen Türkçe harfleri yakalar', () => {
    expect(isOgSafeText('Mentörlük programınızı')).toBe(true);
    for (const glyph of UNSUPPORTED_OG_GLYPHS) {
      expect(isOgSafeText(`a${glyph}b`)).toBe(false);
    }
  });

  it('görsellerdeki tüm metinler eksiksiz çizilebilir (ğ/ş/İ içermez)', () => {
    for (const text of [...Object.values(BRAND_TEXT), OG_IMAGE_ALT]) {
      expect(isOgSafeText(text), text).toBe(true);
    }
  });
});

describe('Y-09 dosya konvansiyonu export\'ları', () => {
  it('icon 32×32 PNG', () => {
    expect(icon.size).toEqual({ width: 32, height: 32 });
    expect(icon.contentType).toBe('image/png');
    expect(typeof icon.default).toBe('function');
  });

  it('apple-icon 180×180 PNG', () => {
    expect(appleIcon.size).toEqual({ width: 180, height: 180 });
    expect(appleIcon.contentType).toBe('image/png');
  });

  it('opengraph-image ve twitter-image 1200×630 PNG + alt metni', () => {
    for (const mod of [ogImage, twitterImage]) {
      expect(mod.size).toEqual({ width: 1200, height: 630 });
      expect(mod.contentType).toBe('image/png');
      expect(mod.alt).toBe(OG_IMAGE_ALT);
      expect(typeof mod.default).toBe('function');
    }
  });
});

describe('Y-09 kök layout paylaşım meta\'sı', () => {
  it('metadataBase + openGraph + twitter site geneli tanımlı', () => {
    expect(rootMetadata.metadataBase).toBeInstanceOf(URL);
    expect(rootMetadata.openGraph).toMatchObject({
      siteName: 'MentiMentor',
      locale: 'tr_TR',
      type: 'website',
    });
    expect(rootMetadata.twitter).toMatchObject({ card: 'summary_large_image' });
  });

  it('kök meta görseli elle vermez (dosya konvansiyonu görselini ezmesin)', () => {
    expect(rootMetadata.openGraph).not.toHaveProperty('images');
    expect(rootMetadata.twitter).not.toHaveProperty('images');
  });

  it('kök OG/Twitter sabit başlık/açıklama taşımaz (alt sayfalara sızmasın)', () => {
    // Next og/twitter title+description yalnız BOŞSA sayfanın kendi title/description'ını kopyalar.
    for (const block of [rootMetadata.openGraph, rootMetadata.twitter]) {
      expect(block).not.toHaveProperty('title');
      expect(block).not.toHaveProperty('description');
    }
  });

  it('alt sayfa (metodoloji) ana sayfa başlığını taşımaz, kendi başlığıyla paylaşılır', () => {
    expect(metodolojiMetadata.title).toBeTruthy();
    expect(metodolojiMetadata.title).not.toBe(homeMetadata.title);
    // OG'yi kendisi tanımlamıyor → kökteki (başlıksız) OG + kendi title/description kullanılır.
    expect(metodolojiMetadata.openGraph).toBeUndefined();
  });

  it('ana sayfa kendi başlık/açıklamasını korur, OG\'yi yeniden tanımlamaz', () => {
    expect(homeMetadata.title).toBe('MentiMentor — Mentörlük Programınızı Zahmetsizce Yönetin');
    expect(String(homeMetadata.description)).toContain('DISC mizaç tabanlı');
    expect(homeMetadata.openGraph).toBeUndefined();
    expect(homeMetadata.twitter).toBeUndefined();
  });
});
