/**
 * DK-01 — tarayıcı tarafı dış hata izleme (Sentry) — birim testi.
 *
 * Kapsam:
 *  - `NEXT_PUBLIC_SENTRY_DSN` yokken SDK İNDİRİLMEZ, `init` çağrılmaz, `captureError` göndermez.
 *  - Anahtar varken `init` kişisel veri kapalı + süzgeç kancalarıyla çağrılır.
 *  - `beforeSend` süzgeci: başlık/çerez/gövde, adreslerin sorgu kısmı (davet/şifre token'ı),
 *    kullanıcı e-posta/IP düşer; metinlerde e-posta/JWT maskelenir.
 *  - CSP connect-src'ye yalnız DSN varken izleme origin'i eklenir (anahtar değil).
 */

import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  buildSdkOptions,
  captureError,
  initErrorMonitor,
  resetErrorMonitorForTest,
  scrubBreadcrumb,
  scrubEvent,
  type ErrorMonitorSdk,
  type ScrubbableEvent,
} from '@/lib/errorMonitor';
import { buildContentSecurityPolicy, errorMonitorOrigin } from '@/lib/securityHeaders.mjs';

const JWT = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJ1LTEifQ.c2lnbmF0dXJlLWRlZ2VyaQ';
const EMAIL = 'ornek.kisi@example.com';
const DSN = 'https://publickey123@o1.ingest.de.sentry.io/42';

function fakeSdk() {
  return {
    init: vi.fn<(options: Record<string, unknown>) => unknown>(),
    captureException: vi.fn<(error: unknown) => unknown>(),
  } satisfies ErrorMonitorSdk;
}

afterEach(() => {
  resetErrorMonitorForTest();
  vi.unstubAllEnvs();
});

describe('initErrorMonitor — anahtar yoksa hiçbir şey yapmaz', () => {
  it('NEXT_PUBLIC_SENTRY_DSN boş → SDK yüklenmez, init çağrılmaz, captureError göndermez', async () => {
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', '');
    const sdk = fakeSdk();
    const loadSdk = vi.fn(async () => sdk);

    expect(await initErrorMonitor({ loadSdk })).toBe(false);
    captureError(new Error('x'));

    expect(loadSdk).not.toHaveBeenCalled();
    expect(sdk.init).not.toHaveBeenCalled();
    expect(sdk.captureException).not.toHaveBeenCalled();
  });
});

describe('initErrorMonitor — anahtar varsa', () => {
  it('bir kez başlatılır; kişisel veri kapalı, replay/tracing yok, süzgeç kancaları var', async () => {
    const sdk = fakeSdk();
    const loadSdk = vi.fn(async () => sdk);
    expect(await initErrorMonitor({ dsn: DSN, loadSdk })).toBe(true);
    await initErrorMonitor({ dsn: DSN, loadSdk });

    expect(loadSdk).toHaveBeenCalledTimes(1);
    const options = sdk.init.mock.calls[0][0];
    expect(options.sendDefaultPii).toBe(false);
    expect(options.tracesSampleRate).toBeUndefined();
    expect(options.replaysSessionSampleRate).toBeUndefined();
    expect(options.integrations).toBeUndefined();
    expect(typeof options.beforeSend).toBe('function');

    captureError(new Error('boom'));
    expect(sdk.captureException).toHaveBeenCalledTimes(1);
  });
});

describe('beforeSend süzgeci — kişisel veri düşer', () => {
  const rawEvent = (): ScrubbableEvent => ({
    message: `Hata: ${EMAIL} ${JWT}`,
    request: {
      url: `https://app.example.org/reset-password?token=sifirla-gizli#x`,
      headers: { Referer: `https://app.example.org/join?token=davet-gizli`, 'User-Agent': 'x' },
      cookies: { refreshToken: JWT },
      data: { email: EMAIL },
    },
    user: { id: 'u-1', email: EMAIL, ip_address: '{{auto}}' },
    exception: {
      values: [{ type: 'Error', value: `alıcı ${EMAIL}`, stacktrace: { frames: [{ filename: 'a.js', vars: { p: 'x' } }] } }],
    },
    extra: { email: EMAIL, note: `Bearer ${JWT}` },
    breadcrumbs: [
      { category: 'console', message: EMAIL, data: { arguments: [EMAIL] } },
      { category: 'navigation', data: { from: '/join?token=davet-gizli', to: '/dashboard' } },
      { category: 'fetch', data: { url: 'https://api.example.org/api/x?email=a%40b.co', method: 'GET' } },
    ],
  });

  it('e-posta, JWT, token\'lı sorgu, başlık/çerez/gövde, IP dış servise GİTMEZ', () => {
    const out = scrubEvent(rawEvent());
    const serialized = JSON.stringify(out);

    expect(serialized).not.toContain('ornek.kisi');
    expect(serialized).not.toContain(JWT);
    expect(serialized).not.toContain('sifirla-gizli');
    expect(serialized).not.toContain('davet-gizli');
    expect(serialized).not.toContain('a%40b.co');
    expect(serialized).not.toContain('{{auto}}');

    expect(out.request).toEqual({ url: 'https://app.example.org/reset-password' });
    expect(out.user).toEqual({ id: 'u-1' });
    expect(out.exception?.values?.[0].stacktrace?.frames?.[0]).toEqual({ filename: 'a.js' });
    expect(out.breadcrumbs?.[0].data).toBeUndefined();
  });

  it('SDK seçeneklerindeki kancalar aynı süzgeci kullanır', () => {
    const options = buildSdkOptions(DSN);
    const beforeSend = options.beforeSend as (e: ScrubbableEvent) => ScrubbableEvent;
    const beforeBreadcrumb = options.beforeBreadcrumb as (b: Record<string, unknown>) => Record<string, unknown>;
    expect(JSON.stringify(beforeSend(rawEvent()))).not.toContain('ornek.kisi');
    expect(JSON.stringify(beforeBreadcrumb({ category: 'xhr', data: { url: '/api/a?token=t-gizli' } }))).not.toContain(
      't-gizli',
    );
  });

  it('breadcrumb: konsol verisi düşer', () => {
    expect(scrubBreadcrumb({ category: 'console', data: { arguments: [EMAIL] } }).data).toBeUndefined();
  });
});

describe('CSP — izleme origin\'i yalnız DSN varken', () => {
  it('DSN yok → connect-src değişmez', () => {
    expect(buildContentSecurityPolicy({ apiUrl: 'https://api.example.org' })).toContain(
      "connect-src 'self' https://api.example.org;",
    );
    expect(errorMonitorOrigin('')).toBeNull();
    expect(errorMonitorOrigin('http://k@insecure.example/1')).toBeNull();
  });

  it('DSN var → yalnız origin eklenir, anahtar CSP\'ye girmez', () => {
    const csp = buildContentSecurityPolicy({ apiUrl: 'https://api.example.org', errorMonitorDsn: DSN });
    expect(csp).toContain("connect-src 'self' https://api.example.org https://o1.ingest.de.sentry.io;");
    expect(csp).not.toContain('publickey123');
  });
});
