/**
 * G7-04 — www → apex 301 middleware testleri.
 *
 * Kapsam:
 *  - www host → 301, hedef apex, yol + query KORUNUR
 *  - apex host → yönlendirme YOK (sonsuz döngü koruması)
 *  - localhost (yerel geliştirme) → yönlendirme YOK
 *  - başka host/subdomain → yönlendirme YOK
 *
 * Not: G1-17 (admin server-guard) bilinçli olarak middleware'de YOK (cross-origin cookie —
 * bkz. src/middleware.ts). Bu yüzden token/rol testi bu dosyada yer almaz.
 */

import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from '../middleware';

function reqWithHost(url: string, host: string): NextRequest {
  return new NextRequest(new URL(url), { headers: { host } });
}

describe('middleware — G7-04 www→apex 301', () => {
  it('www host → 301, hedef apex, yol + query korunur', () => {
    const res = middleware(reqWithHost('https://www.sivilkapasite.org/kvkk?ref=mail', 'www.sivilkapasite.org'));
    expect(res.status).toBe(301);
    const loc = res.headers.get('location')!;
    const target = new URL(loc);
    expect(target.hostname).toBe('sivilkapasite.org');
    expect(target.pathname).toBe('/kvkk');
    expect(target.search).toBe('?ref=mail');
    expect(target.port).toBe(''); // varsayılan 443
  });

  it('www host + port → hostname yine www kabul edilir, 301', () => {
    const res = middleware(reqWithHost('https://www.sivilkapasite.org/', 'www.sivilkapasite.org:443'));
    expect(res.status).toBe(301);
    expect(new URL(res.headers.get('location')!).hostname).toBe('sivilkapasite.org');
  });

  it('apex host → yönlendirme YOK (döngü koruması)', () => {
    const res = middleware(reqWithHost('https://sivilkapasite.org/dashboard', 'sivilkapasite.org'));
    // NextResponse.next() → redirect değil (301 değil, location yok)
    expect(res.status).not.toBe(301);
    expect(res.headers.get('location')).toBeNull();
  });

  it('localhost → yönlendirme YOK (yerel geliştirme etkilenmez)', () => {
    const res = middleware(reqWithHost('http://localhost:3001/admin/approvals', 'localhost:3001'));
    expect(res.status).not.toBe(301);
    expect(res.headers.get('location')).toBeNull();
  });

  it('başka subdomain (ör. api) → yönlendirme YOK', () => {
    const res = middleware(reqWithHost('https://api.sivilkapasite.org/x', 'api.sivilkapasite.org'));
    expect(res.status).not.toBe(301);
    expect(res.headers.get('location')).toBeNull();
  });
});
