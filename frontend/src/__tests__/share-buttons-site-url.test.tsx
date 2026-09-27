/**
 * @vitest-environment jsdom
 * @vitest-environment-options {"url": "https://canli.example.org/meetings"}
 */
/**
 * AJ-23 (F-22 kalanı) — ShareButtons LinkedIn bağlantısı kullanıcının açtığı sitenin kökünü paylaşır.
 *
 * Önceden varsayılan paylaşım URL'i ürüne ait olmayan sabit bir alan adıydı. Canlıda
 * NEXT_PUBLIC_SITE_URL set olmayabildiği için (getSiteUrl() → localhost) kaynak tarayıcı
 * origin'idir; bu dosyada jsdom origin'i "canlı" bir adrese ayarlanır.
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ShareButtons } from '@/components/molecules/ShareButtons';

const LIVE_ORIGIN = 'https://canli.example.org';

afterEach(() => {
  vi.unstubAllEnvs();
});

function linkedinHref(): string {
  return screen.getByRole('link', { name: /LinkedIn/i }).getAttribute('href') ?? '';
}

function linkedinSharedUrl(): string {
  return new URL(linkedinHref()).searchParams.get('url') ?? '';
}

describe('ShareButtons — LinkedIn paylaşım adresi (AJ-23)', () => {
  it('test ortamı: jsdom origin canlı adrese ayarlı', () => {
    expect(window.location.origin).toBe(LIVE_ORIGIN);
  });

  it('varsayılan paylaşım adresi tarayıcının açtığı sitenin köküdür', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://baska.example.net');
    render(<ShareButtons shareHeadline="Örnek başlık" />);
    expect(linkedinSharedUrl()).toBe(LIVE_ORIGIN);
  });

  it('NEXT_PUBLIC_SITE_URL tanımsızken (localhost yedeği) bile canlı origin kullanılır', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', '');
    render(<ShareButtons shareHeadline="Örnek başlık" />);
    expect(linkedinSharedUrl()).toBe(LIVE_ORIGIN);
    expect(linkedinHref()).not.toContain('localhost');
  });

  it('ürüne ait olmayan sabit alan adına gitmez', () => {
    render(<ShareButtons shareHeadline="Örnek başlık" />);
    expect(linkedinHref()).not.toContain('menti-mentor.io');
  });

  it('açıkça verilen shareUrl korunur', () => {
    render(<ShareButtons shareHeadline="Örnek başlık" shareUrl="https://canli.example.org/ozel-sayfa" />);
    expect(linkedinSharedUrl()).toBe('https://canli.example.org/ozel-sayfa');
  });
});
