/**
 * GV-12 — Kurum kaydında kayıtlı e-posta sızmaz (frontend tarafı).
 *
 * Backend kayıtlı e-postayla gelen başvuruya yeni kayıtla aynı 201 + mesajı döner ama kurum
 * oluşturmaz ve oturum açmaz (`tenant: null`, `user: null`, accessToken yok). Sihirbaz bu durumda
 * çökmemeli, kurulum adımını işaretlememeli, panele/sonraki adıma geçmemeli ve yalnız
 * "e-postanızı kontrol edin" demeli — "kayıtlı" ifadesi ekrana hiç çıkmamalı.
 * Eski backend (409 EMAIL_MEVCUT) için de aynı ekran gösterilir (geriye uyum).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const routerPush = vi.fn();
const routerReplace = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: routerReplace, push: routerPush }),
  useSearchParams: () => ({ get: () => null }),
}));
vi.mock('@/lib/api/selfServe', () => ({
  selfServeRegister: vi.fn(),
  updateOnboarding: vi.fn(),
}));

import { Step4Account } from '@/app/onboarding/stk/_steps/Step4Account';
import { selfServeRegister, updateOnboarding } from '@/lib/api/selfServe';
import type { WizardData } from '@/app/onboarding/stk/_StkOnboardingContent';

const BASE: WizardData = {
  tenantName: 'Test Tenant', slug: 'test', programTemplate: 'MEZUN',
  logoUrl: '', primaryColor: '#6366f1',
  fullName: 'Test User', email: 'test@example.com', password: 'password123',
  kvkkConsent: true, tenantId: '', adminToken: '',
};

function submit(onUpdate = vi.fn(), onNext = vi.fn()) {
  render(<Step4Account data={BASE} onUpdate={onUpdate} onNext={onNext} />);
  fireEvent.click(screen.getByRole('button', { name: /hesabı oluştur/i }));
  return { onUpdate, onNext };
}

describe('Step4Account — GV-12 oturumsuz başvuru yanıtı', () => {
  beforeEach(() => {
    vi.mocked(selfServeRegister).mockReset();
    vi.mocked(updateOnboarding).mockReset();
    routerPush.mockReset();
    routerReplace.mockReset();
  });

  it('tenant: null → yükleniyor biter, "e-postanızı kontrol edin" ekranı görünür', async () => {
    vi.mocked(selfServeRegister).mockResolvedValue({
      ok: true,
      data: { message: 'Kurumunuz başarıyla oluşturuldu.', tenant: null, user: null },
    });
    submit();
    await waitFor(() => expect(screen.getByText(/e-postanızı kontrol edin/i)).toBeInTheDocument());
    expect(screen.getByRole('heading', { name: /başvurunuz alındı/i })).toBeInTheDocument();
    expect(screen.queryByText(/hesap oluşturuluyor/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /hesabı oluştur/i })).not.toBeInTheDocument();
  });

  it('negatif: tenant: null → oturum bilgisi yazılmaz, kurulum işaretlenmez, panele/sonraki adıma geçilmez', async () => {
    vi.mocked(selfServeRegister).mockResolvedValue({
      ok: true,
      data: { message: 'Başvurunuz alındı.', tenant: null, user: null },
    });
    const { onUpdate, onNext } = submit();
    await waitFor(() => expect(screen.getByText(/e-postanızı kontrol edin/i)).toBeInTheDocument());
    expect(updateOnboarding).not.toHaveBeenCalled();
    expect(onNext).not.toHaveBeenCalled();
    expect(onUpdate).not.toHaveBeenCalledWith(expect.objectContaining({ adminToken: expect.anything() }));
    expect(routerPush).not.toHaveBeenCalled();
    expect(routerReplace).not.toHaveBeenCalled();
  });

  it('negatif: ekranda "kayıtlı" ifadesi yok', async () => {
    vi.mocked(selfServeRegister).mockResolvedValue({
      ok: true,
      data: { message: 'Kurumunuz başarıyla oluşturuldu.', tenant: null, user: null },
    });
    const { container } = render(<Step4Account data={BASE} onUpdate={vi.fn()} onNext={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /hesabı oluştur/i }));
    await waitFor(() => expect(screen.getByText(/e-postanızı kontrol edin/i)).toBeInTheDocument());
    expect(container.textContent ?? '').not.toMatch(/kayıtlı/i);
  });

  it('geriye uyum: eski 409 EMAIL_MEVCUT → aynı ekran, backend\'in "zaten kayıtlı" mesajı gösterilmez', async () => {
    vi.mocked(selfServeRegister).mockResolvedValue({
      ok: false,
      status: 409,
      error: { error: 'EMAIL_MEVCUT', message: 'Bu e-posta adresi zaten kayıtlı.' },
    });
    const { onNext } = submit();
    await waitFor(() => expect(screen.getByText(/e-postanızı kontrol edin/i)).toBeInTheDocument());
    expect(screen.queryByText(/zaten kayıtlı/i)).not.toBeInTheDocument();
    expect(updateOnboarding).not.toHaveBeenCalled();
    expect(onNext).not.toHaveBeenCalled();
    expect(routerPush).not.toHaveBeenCalled();
  });

  it('normal kayıt akışı değişmedi: DONE işaretlenir, oturum sihirbaza yazılır, sonraki adıma geçilir', async () => {
    vi.mocked(selfServeRegister).mockResolvedValue({
      ok: true,
      data: { tenant: { id: 't1', verificationStatus: 'AUTO_APPROVED' }, accessToken: 'tok' },
    } as never);
    vi.mocked(updateOnboarding).mockResolvedValue({ ok: true, data: {} } as never);
    const { onUpdate, onNext } = submit();
    await waitFor(() => expect(onNext).toHaveBeenCalled());
    expect(updateOnboarding).toHaveBeenCalledWith('t1', 'tok', expect.objectContaining({ onboardingStep: 'DONE' }));
    expect(onUpdate).toHaveBeenCalledWith({ tenantId: 't1', adminToken: 'tok' });
    expect(screen.queryByText(/e-postanızı kontrol edin/i)).not.toBeInTheDocument();
  });
});
