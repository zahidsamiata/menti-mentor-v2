/**
 * F-05 (G1-26) — takip düzeltmesi: Cloudflare Turnstile token'ı TEK KULLANIMLIKTIR.
 * Backend her denemede `siteverify` ile tüketir. Başarısız bir gönderimden sonra (ör.
 * backend'in KENDİ iş kuralı 400/409 döndürdüğünde — token'ın kendisi geçerliydi) widget
 * sıfırlanmazsa, kullanıcı ikinci denemesinde tükenmiş token yüzünden `CAPTCHA_GECERSIZ`
 * alır ve formun asıl hatasını hiç göremez.
 *
 * Bu dosya iki şeyi doğrular:
 *  1. `TurnstileWidget`in `ref.reset()`'i Cloudflare'ın `window.turnstile.reset(widgetId)`'ini
 *     doğru widget id ile çağırıyor (saf birim testi).
 *  2. Gerçek bir form (`Step4Account` — self-serve kurum kaydı) başarısız yanıttan sonra hem
 *     `reset()`'i çağırıyor hem de kendi `captchaToken` state'ini temizliyor (bir sonraki
 *     doğrulamada YENİ token beklendiğini kanıtlar).
 */

import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createRef } from 'react';

function clearTurnstileScripts(): void {
  document
    .querySelectorAll('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]')
    .forEach((el) => el.remove());
  delete (window as unknown as { turnstile?: unknown }).turnstile;
}

describe('F-05 takip: TurnstileWidget ref.reset()', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
    clearTurnstileScripts();
  });

  it('reset() render() ile dönen widget id ile window.turnstile.reset()\'i çağırır', async () => {
    vi.stubEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY', 'test-site-key');
    vi.resetModules();
    const { TurnstileWidget } = await import('@/components/molecules/TurnstileWidget');
    type Handle = { reset: () => void };

    const resetSpy = vi.fn();
    (window as unknown as { turnstile: unknown }).turnstile = {
      render: vi.fn(() => 'widget-42'),
      remove: vi.fn(),
      reset: resetSpy,
    };

    const ref = createRef<Handle>();
    render(<TurnstileWidget ref={ref} onVerify={() => {}} />);

    await waitFor(() => expect(ref.current).not.toBeNull());
    ref.current!.reset();

    expect(resetSpy).toHaveBeenCalledWith('widget-42');
  });

  it('negatif: script/window.turnstile hiç yüklenmediyse reset() sessizce hiçbir şey yapmaz (çökmez)', async () => {
    vi.stubEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY', 'test-site-key');
    vi.resetModules();
    const { TurnstileWidget } = await import('@/components/molecules/TurnstileWidget');
    type Handle = { reset: () => void };

    const ref = createRef<Handle>();
    render(<TurnstileWidget ref={ref} onVerify={() => {}} />);

    expect(() => ref.current?.reset()).not.toThrow();
  });
});

describe('F-05 takip: Step4Account başarısız gönderimden sonra CAPTCHA sıfırlanır', () => {
  const routerPush = vi.fn();

  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY', 'test-site-key');
    vi.resetModules();
    vi.doMock('next/navigation', () => ({
      useRouter: () => ({ push: routerPush, replace: vi.fn() }),
      useSearchParams: () => ({ get: () => null }),
    }));
    vi.doMock('@/lib/api/selfServe', () => ({
      selfServeRegister: vi.fn(),
      updateOnboarding: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
    vi.doUnmock('next/navigation');
    vi.doUnmock('@/lib/api/selfServe');
    clearTurnstileScripts();
    routerPush.mockReset();
  });

  it('başarısız kayıt yanıtından sonra widget.reset() çağrılır ve captchaToken temizlenir (bir sonraki doğrulama yeni token üretir)', async () => {
    const resetSpy = vi.fn();
    let renderedCallback: ((token: string) => void) | undefined;
    (window as unknown as { turnstile: unknown }).turnstile = {
      render: vi.fn((_container: HTMLElement, options: { callback: (t: string) => void }) => {
        renderedCallback = options.callback;
        return 'widget-1';
      }),
      remove: vi.fn(),
      reset: resetSpy,
    };

    const { Step4Account } = await import('@/app/onboarding/stk/_steps/Step4Account');
    const { selfServeRegister } = await import('@/lib/api/selfServe');
    // İlk deneme: backend iş kuralı hatasıyla reddeder (slug alınmış vb.) — CAPTCHA'nın
    // KENDİSİ geçerliydi, token zaten tüketildi.
    vi.mocked(selfServeRegister).mockResolvedValueOnce({
      ok: false,
      error: { error: 'SLUG_ALINDI', message: 'Bu kurum adresi zaten kullanılıyor.' },
    } as never);

    const data = {
      tenantKind: 'ORGANIZATION' as const,
      tenantName: 'Test Tenant', slug: 'test', programTemplate: 'MEZUN' as const,
      logoUrl: '', primaryColor: '#6366f1',
      fullName: 'Test User', email: 'test@example.com', password: 'password123',
      kvkkConsent: true, tenantId: '', adminToken: '',
    };

    render(<Step4Account data={data} onUpdate={vi.fn()} onNext={vi.fn()} />);

    // Widget monte olup callback'i yakalayana kadar bekle, sonra "doğrulandı" simüle et.
    await waitFor(() => expect(renderedCallback).toBeDefined());
    renderedCallback!('ilk-token');

    fireEvent.click(screen.getByRole('button', { name: /hesabı oluştur/i }));

    await waitFor(() => expect(screen.getByText(/zaten kullanılıyor/i)).toBeInTheDocument());

    // Token tek kullanımlıktır: başarısız yanıttan sonra widget sıfırlanmalı.
    expect(resetSpy).toHaveBeenCalledWith('widget-1');

    // Kullanıcı widget'ı YENİDEN doğrulamadan tekrar gönderirse (ör. formu hemen tekrar
    // tıkladıysa) tükenmiş ilk-token'ı SESSİZCE tekrar YOLLAMAMALI — captchaToken state'i
    // temizlendiği için ikinci istek undefined taşımalı (backend zaten CAPTCHA_GEREKLI
    // döner, ama en azından tükenmiş token'la sahte bir "geçerli" izlenimi vermez).
    vi.mocked(selfServeRegister).mockResolvedValueOnce({
      ok: false,
      error: { error: 'CAPTCHA_GEREKLI', message: 'Lütfen robot olmadığınızı doğrulayın.' },
    } as never);
    fireEvent.click(screen.getByRole('button', { name: /hesabı oluştur/i }));

    await waitFor(() => expect(vi.mocked(selfServeRegister)).toHaveBeenCalledTimes(2));
    const secondCallArg = vi.mocked(selfServeRegister).mock.calls[1]?.[0] as { captchaToken?: string };
    expect(secondCallArg.captchaToken).toBeUndefined();
  });
});
