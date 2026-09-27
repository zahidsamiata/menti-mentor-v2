/**
 * F-05 (G1-26) — TurnstileWidget: NEXT_PUBLIC_TURNSTILE_SITE_KEY yokken hiçbir şey
 * render edilmez (bugünkü görünüm aynen korunur); varken widget container'ı monte edilir
 * ve Cloudflare script'i CDN'den yüklenir.
 *
 * `SITE_KEY` modül yüklenirken `process.env`'den okunduğu için her testte `vi.resetModules()`
 * + `vi.stubEnv()` + dinamik import kullanılır (backend `config-jwt-secret.unit.test.ts` ile
 * aynı desen).
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

function clearTurnstileScripts(): void {
  document
    .querySelectorAll('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]')
    .forEach((el) => el.remove());
  delete (window as unknown as { turnstile?: unknown }).turnstile;
}

describe('F-05: TurnstileWidget', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
    clearTurnstileScripts();
  });

  it('site key TANIMSIZSA hiçbir şey render etmez', async () => {
    vi.stubEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY', '');
    vi.resetModules();
    const { TurnstileWidget } = await import('@/components/molecules/TurnstileWidget');

    const { container } = render(<TurnstileWidget onVerify={() => {}} />);

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByTestId('turnstile-widget')).not.toBeInTheDocument();
    expect(
      document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]'),
    ).toBeNull();
  });

  it('site key TANIMLIYSA widget container\'ı render edilir ve Cloudflare script\'i CDN\'den yüklenir', async () => {
    vi.stubEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY', 'test-site-key');
    vi.resetModules();
    const { TurnstileWidget } = await import('@/components/molecules/TurnstileWidget');

    render(<TurnstileWidget onVerify={() => {}} />);

    expect(screen.getByTestId('turnstile-widget')).toBeInTheDocument();
    await waitFor(() => {
      expect(
        document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]'),
      ).not.toBeNull();
    });
  });

  it('script yüklenip window.turnstile hazır olunca render() sitekey ile çağrılır; callback token ileter', async () => {
    vi.stubEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY', 'test-site-key');
    vi.resetModules();
    const { TurnstileWidget } = await import('@/components/molecules/TurnstileWidget');

    const renderSpy = vi.fn((_container: HTMLElement, options: { callback: (t: string) => void }) => {
      // Cloudflare gerçek script'i böyle davranır: render() sonrası kullanıcı doğrulanınca callback çağrılır.
      queueMicrotask(() => options.callback('taklit-token'));
      return 'widget-1';
    });
    (window as unknown as { turnstile: unknown }).turnstile = {
      render: renderSpy,
      remove: vi.fn(),
      reset: vi.fn(),
    };

    const onVerify = vi.fn();
    render(<TurnstileWidget onVerify={onVerify} />);

    // Script zaten "yüklü" (window.turnstile mevcut) → loadTurnstileScript hemen resolve olur.
    await waitFor(() => expect(renderSpy).toHaveBeenCalledOnce());
    expect(renderSpy.mock.calls[0]?.[1]).toMatchObject({ sitekey: 'test-site-key' });
    await waitFor(() => expect(onVerify).toHaveBeenCalledWith('taklit-token'));
  });
});
