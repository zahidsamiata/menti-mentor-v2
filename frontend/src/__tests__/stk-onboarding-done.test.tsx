/**
 * STK kurulum sihirbazı — F-04 + taslak kurum silinme riski.
 *
 * (1) Kayıt başarılıysa kurulum HER durumda "tamamlandı" (DONE) işaretlenir; eskiden yalnız logo
 *     ya da özel renk seçilince işaretleniyordu → diğer kurumlar taslakta kalıp 96 saatlik taslak
 *     temizliğinde silinebiliyordu. İncelemeye düşen kurum da yönlendirmeden ÖNCE işaretlenir.
 * (2) İşaretleme başarısızsa kullanıcı hatayı görür (sessiz yutma yok).
 * (3) Logo adımı yalnız https adres kabul eder (backend kuralıyla aynı).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const routerPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn(), push: routerPush }),
  useSearchParams: () => ({ get: () => null }),
}));
vi.mock('@/lib/api/selfServe', () => ({
  selfServeRegister: vi.fn(),
  updateOnboarding: vi.fn(),
}));

import { Step4Account } from '@/app/onboarding/stk/_steps/Step4Account';
import { Step3Branding } from '@/app/onboarding/stk/_steps/Step3Branding';
import { selfServeRegister, updateOnboarding } from '@/lib/api/selfServe';
import type { WizardData } from '@/app/onboarding/stk/_StkOnboardingContent';

const BASE: WizardData = {
  tenantName: 'Test Tenant', slug: 'test', programTemplate: 'MEZUN',
  logoUrl: '', primaryColor: '#6366f1',
  fullName: 'Test User', email: 'test@example.com', password: 'password123',
  kvkkConsent: true, tenantId: '', adminToken: '',
};

function registerOk(verificationStatus = 'AUTO_APPROVED') {
  vi.mocked(selfServeRegister).mockResolvedValue({
    ok: true,
    data: { tenant: { id: 't1', verificationStatus }, accessToken: 'tok' },
  } as never);
}

describe('Step4Account — kurulum her durumda tamamlandı işaretlenir', () => {
  beforeEach(() => {
    vi.mocked(selfServeRegister).mockReset();
    vi.mocked(updateOnboarding).mockReset();
    routerPush.mockReset();
  });

  it('logo yok + varsayılan renk → yine DONE gönderilir', async () => {
    registerOk();
    vi.mocked(updateOnboarding).mockResolvedValue({ ok: true, data: {} } as never);
    const onNext = vi.fn();
    render(<Step4Account data={BASE} onUpdate={vi.fn()} onNext={onNext} />);
    fireEvent.click(screen.getByRole('button', { name: /hesabı oluştur/i }));
    await waitFor(() => expect(updateOnboarding).toHaveBeenCalledOnce());
    expect(vi.mocked(updateOnboarding).mock.calls[0]?.[2]).toMatchObject({ onboardingStep: 'DONE' });
    await waitFor(() => expect(onNext).toHaveBeenCalled());
  });

  it('inceleme bekleyen kurum: yönlendirmeden ÖNCE DONE gönderilir', async () => {
    registerOk('PENDING_REVIEW');
    vi.mocked(updateOnboarding).mockResolvedValue({ ok: true, data: {} } as never);
    render(<Step4Account data={BASE} onUpdate={vi.fn()} onNext={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /hesabı oluştur/i }));
    await waitFor(() => expect(routerPush).toHaveBeenCalledWith('/onboarding/stk/pending-review'));
    expect(updateOnboarding).toHaveBeenCalledOnce();
    expect(vi.mocked(updateOnboarding).mock.invocationCallOrder[0]!).toBeLessThan(routerPush.mock.invocationCallOrder[0]!);
  });

  it('negatif: işaretleme başarısızsa kullanıcı hatayı görür (sessiz yutulmaz)', async () => {
    registerOk();
    vi.mocked(updateOnboarding).mockResolvedValue({ ok: false, status: 400, error: { message: 'Logo adresi geçersiz.' } } as never);
    render(<Step4Account data={BASE} onUpdate={vi.fn()} onNext={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /hesabı oluştur/i }));
    await waitFor(() => expect(screen.getByText(/kurulum adımı kaydedilemedi/i)).toBeInTheDocument());
  });
});

describe('Step3Branding — logo adresi yalnız https', () => {
  it('negatif: http logo adresinde hata görünür ve Devam Et kilitli', () => {
    render(<Step3Branding data={{ ...BASE, logoUrl: 'http://example.com/logo.png' }} onUpdate={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('alert')).toHaveTextContent(/https:\/\//);
    expect(screen.getByRole('button', { name: /devam et/i })).toBeDisabled();
  });

  it('https logo adresi ya da boş alanla Devam Et açık', () => {
    const { rerender } = render(<Step3Branding data={{ ...BASE, logoUrl: 'https://example.com/logo.png' }} onUpdate={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /devam et/i })).toBeEnabled();
    rerender(<Step3Branding data={BASE} onUpdate={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole('button', { name: /devam et/i })).toBeEnabled();
  });
});
