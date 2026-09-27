/**
 * AJ-23 (F-22 kalanı) — ShareButtons LinkedIn bağlantısı canlı site adresini kullanır.
 *
 * Önceden varsayılan paylaşım URL'i ürüne ait olmayan sabit bir alan adıydı; artık
 * `getSiteUrl()` (NEXT_PUBLIC_SITE_URL) kaynağından gelir.
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ShareButtons } from '@/components/molecules/ShareButtons';

afterEach(() => {
  vi.unstubAllEnvs();
});

function linkedinSharedUrl(): string {
  const link = screen.getByRole('link', { name: /LinkedIn/i });
  const href = link.getAttribute('href') ?? '';
  return new URL(href).searchParams.get('url') ?? '';
}

describe('ShareButtons — LinkedIn paylaşım adresi (AJ-23)', () => {
  it('varsayılan paylaşım adresi canlı site köküdür (NEXT_PUBLIC_SITE_URL)', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://app.example.com/');
    render(<ShareButtons shareHeadline="Örnek başlık" />);
    expect(linkedinSharedUrl()).toBe('https://app.example.com');
  });

  it('ürüne ait olmayan sabit alan adına gitmez', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://app.example.com');
    render(<ShareButtons shareHeadline="Örnek başlık" />);
    const href = screen.getByRole('link', { name: /LinkedIn/i }).getAttribute('href') ?? '';
    expect(href).not.toContain('menti-mentor.io');
  });

  it('açıkça verilen shareUrl korunur', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://app.example.com');
    render(<ShareButtons shareHeadline="Örnek başlık" shareUrl="https://app.example.com/meetings" />);
    expect(linkedinSharedUrl()).toBe('https://app.example.com/meetings');
  });
});
