/**
 * F-04 (G1-23) — İçerik Güvenlik Politikası (CSP) başlık üreticisi.
 *
 * Politika şimdilik yalnız rapor modunda gönderilir; kritik yönergelerin varlığı ve
 * canlı politikada `'unsafe-eval'` bulunmaması burada kilitlenir.
 */

import { describe, it, expect } from 'vitest';
import {
  CSP_HEADER_NAME,
  DEFAULT_IMAGE_DOMAINS,
  apiOrigin,
  buildContentSecurityPolicy,
  buildSecurityHeaders,
  resolveImageDomains,
} from '@/lib/securityHeaders.mjs';

/** "a x y; b z" → { a: ['x','y'], b: ['z'] } */
function parsePolicy(policy: string): Record<string, string[]> {
  return Object.fromEntries(
    policy.split(';').map((part) => {
      const [name, ...sources] = part.trim().split(/\s+/);
      return [name, sources];
    }),
  );
}

describe('buildSecurityHeaders (F-04 CSP)', () => {
  it('yalnız Report-Only başlığı gönderir (engelleyen CSP başlığı YOK)', () => {
    const headers = buildSecurityHeaders({ apiUrl: 'https://api.example.org' });
    expect(CSP_HEADER_NAME).toBe('Content-Security-Policy-Report-Only');
    expect(headers.map((h) => h.key)).toEqual(['Content-Security-Policy-Report-Only']);
    expect(headers.some((h) => h.key === 'Content-Security-Policy')).toBe(false);
  });

  it('kritik yönergeler mevcut', () => {
    const d = parsePolicy(buildContentSecurityPolicy({ apiUrl: 'https://api.example.org' }));
    expect(d['default-src']).toEqual(["'self'"]);
    expect(d['object-src']).toEqual(["'none'"]);
    expect(d['frame-ancestors']).toEqual(["'none'"]);
    expect(d['base-uri']).toEqual(["'self'"]);
    expect(d['form-action']).toEqual(["'self'"]);
    expect(d['font-src']).toEqual(["'self'"]);
  });

  it("canlı politikada 'unsafe-eval' YOK", () => {
    const policy = buildContentSecurityPolicy({ apiUrl: 'https://api.example.org' });
    expect(policy).not.toContain("'unsafe-eval'");
  });

  it("'unsafe-eval' yalnız next dev'de script-src'ye eklenir", () => {
    const d = parsePolicy(buildContentSecurityPolicy({ isDev: true }));
    expect(d['script-src']).toContain("'unsafe-eval'");
  });

  it('backend origin connect-src ve img-src içinde (yol/sorgu atılır)', () => {
    const d = parsePolicy(buildContentSecurityPolicy({ apiUrl: 'https://api.example.org/api/x?y=1' }));
    expect(d['connect-src']).toEqual(["'self'", 'https://api.example.org']);
    expect(d['img-src']).toContain('https://api.example.org');
  });

  it('geçersiz API adresi politikaya sızmaz', () => {
    expect(apiOrigin('not a url')).toBeNull();
    const d = parsePolicy(buildContentSecurityPolicy({ apiUrl: 'not a url' }));
    expect(d['connect-src']).toEqual(["'self'"]);
  });

  it('img-src görsel host listesini yalnız https ile içerir', () => {
    const d = parsePolicy(
      buildContentSecurityPolicy({ imageDomains: resolveImageDomains('cdn.example.org, ,cdn.example.org') }),
    );
    for (const host of DEFAULT_IMAGE_DOMAINS) expect(d['img-src']).toContain(`https://${host}`);
    expect(d['img-src'].filter((s) => s === 'https://cdn.example.org')).toHaveLength(1);
    expect(d['img-src']).not.toContain('http://cdn.example.org');
    expect(d['img-src']).not.toContain('https:');
  });
});
