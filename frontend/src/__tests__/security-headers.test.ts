/**
 * F-04 (G1-23) — İçerik Güvenlik Politikası (CSP) başlık üreticisi.
 *
 * AJ-22: politika ENGELLEYEN modda (`Content-Security-Policy`) gönderilir; rapor moduna geri
 * dönüş, kritik yönergelerin varlığı, canlı politikada `'unsafe-eval'` bulunmaması ve img-src'nin
 * yalnız https (şema düzeyi) kabul etmesi burada kilitlenir.
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
  it('AJ-22: engelleyen CSP başlığı gönderir (Report-Only DEĞİL)', () => {
    const headers = buildSecurityHeaders({ apiUrl: 'https://api.example.org' });
    expect(CSP_HEADER_NAME).toBe('Content-Security-Policy');
    expect(headers.map((h) => h.key)).toEqual(['Content-Security-Policy']);
    expect(headers.some((h) => /report-only/i.test(h.key))).toBe(false);
    const d = parsePolicy(headers[0].value);
    expect(d['frame-ancestors']).toEqual(["'none'"]);
    expect(d['object-src']).toEqual(["'none'"]);
  });

  it("kritik yönergeler mevcut; script/style 'unsafe-inline' korunur (Next.js satır içi betikleri)", () => {
    const d = parsePolicy(buildContentSecurityPolicy({ apiUrl: 'https://api.example.org' }));
    expect(d['default-src']).toEqual(["'self'"]);
    expect(d['object-src']).toEqual(["'none'"]);
    expect(d['frame-ancestors']).toEqual(["'none'"]);
    expect(d['base-uri']).toEqual(["'self'"]);
    expect(d['form-action']).toEqual(["'self'"]);
    expect(d['font-src']).toEqual(["'self'"]);
    expect(d['script-src']).toContain("'unsafe-inline'");
    expect(d['style-src']).toContain("'unsafe-inline'");
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

  it('AJ-22: img-src kurum logoları için yalnız https şemasını kabul eder (http/joker YOK)', () => {
    const d = parsePolicy(buildContentSecurityPolicy({ apiUrl: 'https://api.example.org' }));
    expect(d['img-src']).toEqual(["'self'", 'data:', 'blob:', 'https://api.example.org', 'https:']);
    expect(d['img-src']).not.toContain('http:');
    expect(d['img-src']).not.toContain('*');
  });

  it('resolveImageDomains (next/image remotePatterns) varsayılan + env hostlarını tekrarsız döner', () => {
    const domains = resolveImageDomains('cdn.example.org, ,cdn.example.org');
    for (const host of DEFAULT_IMAGE_DOMAINS) expect(domains).toContain(host);
    expect(domains.filter((h) => h === 'cdn.example.org')).toHaveLength(1);
    expect(domains).not.toContain('');
  });

  it('F-05 (G1-26): Cloudflare Turnstile script-src + frame-src içinde (enforce modda engellenmez)', () => {
    const d = parsePolicy(buildContentSecurityPolicy({ apiUrl: 'https://api.example.org' }));
    expect(d['script-src']).toContain('https://challenges.cloudflare.com');
    expect(d['frame-src']).toContain('https://challenges.cloudflare.com');
  });
});
