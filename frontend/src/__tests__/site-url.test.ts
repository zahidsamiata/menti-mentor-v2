/**
 * F-29 — getSiteUrl (SEO base URL tek kaynağı).
 *
 * Env yoksa dev fallback döner; env verilince sondaki slash'lar temizlenir ki
 * sitemap/robots URL'lerinde mükerrer "/" oluşmasın.
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { getSiteUrl } from '@/lib/siteUrl';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('getSiteUrl (F-29)', () => {
  it('env yoksa dev fallback döner', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', '');
    expect(getSiteUrl()).toBe('http://localhost:3001');
  });

  it('env verilince kullanılır', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://app.example.com');
    expect(getSiteUrl()).toBe('https://app.example.com');
  });

  it('sondaki slash temizlenir', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://app.example.com/');
    expect(getSiteUrl()).toBe('https://app.example.com');
    expect(`${getSiteUrl()}/sitemap.xml`).toBe('https://app.example.com/sitemap.xml');
  });
});
