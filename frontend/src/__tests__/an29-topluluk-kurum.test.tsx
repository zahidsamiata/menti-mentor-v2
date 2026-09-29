/**
 * AN-29 / KARAR-34 SORU 1 — topluluk tipi kurum (ön yüz).
 *
 * KARAR-34 CEVAP (PO, 2026-09-23): lider TALEP oluşturur → PO yalnız LİDERİ onaylar → lider
 * üyelerini kendisi davet eder (mevcut kurum akışıyla aynı iskelet).
 * Ölçülen: sihirbazda "Kurum / Topluluk" seçimi; topluluk seçilince kurumsal e-postada bile görev +
 * kanıt istenir ve kayıt isteği türü taşır; kurum kaydı eskisi gibi (kurumsal e-postada kanıt yok);
 * platform onay ekranında başvurunun türü görünür.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const listPendingTenants = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
  useSearchParams: () => ({ get: () => null }),
}));
vi.mock('@/components/molecules/ThemeToggle', () => ({ ThemeToggle: () => null }));
vi.mock('@/lib/api/selfServe', () => ({
  selfServeRegister: vi.fn(),
  updateOnboarding: vi.fn(),
  checkSlugAvailability: vi.fn(() => Promise.resolve({ ok: true, data: { available: true, slug: 'x' } })),
}));
vi.mock('@/lib/api/platform', () => ({
  isPlatformAuthError: () => false,
  platformLogout: vi.fn(() => Promise.resolve()),
  getPlatformStats: vi.fn(() => Promise.reject(new Error('stats yok'))),
  getPlatformHealth: vi.fn(() => Promise.reject(new Error('health yok'))),
  listPendingTenants: (...args: unknown[]) => listPendingTenants(...args),
  listAllTenants: vi.fn(),
  approveTenant: vi.fn(),
  rejectTenant: vi.fn(),
  requestTenantCorrection: vi.fn(),
  freezeTenant: vi.fn(),
  activateTenant: vi.fn(),
  listSuspicionReports: vi.fn(),
  reviewReport: vi.fn(),
  getPlatformLogs: vi.fn(),
  listUserReports: vi.fn(),
  reviewUserReport: vi.fn(),
  getAnomalies: vi.fn(),
}));

import { Step1Slug } from '@/app/onboarding/stk/_steps/Step1Slug';
import { Step4Account } from '@/app/onboarding/stk/_steps/Step4Account';
import PlatformDashboard from '@/app/platform/dashboard/page';
import { selfServeRegister, updateOnboarding } from '@/lib/api/selfServe';
import { tenantKindLabel } from '@/lib/enumLabels';
import type { WizardData } from '@/app/onboarding/stk/_StkOnboardingContent';

const BASE: WizardData = {
  tenantKind: 'ORGANIZATION',
  tenantName: 'Test', slug: 'test', programTemplate: 'MEZUN',
  logoUrl: '', primaryColor: '#6366f1',
  // kurumsal alan adı → kurum kaydında kanıt alanı ÇIKMAZ
  fullName: 'Test Lider', email: 'lider@ornek-topluluk.org', password: 'password123',
  kvkkConsent: true, tenantId: '', adminToken: '',
};

describe('AN-29 — tür etiketi', () => {
  it('NULL / bilinmeyen = Kurum, COMMUNITY = Topluluk', () => {
    expect(tenantKindLabel(null)).toBe('Kurum');
    expect(tenantKindLabel('ORGANIZATION')).toBe('Kurum');
    expect(tenantKindLabel('COMMUNITY')).toBe('Topluluk');
  });
});

describe('AN-29 — sihirbaz 1. adım: Kurum / Topluluk seçimi', () => {
  it('varsayılan Kurum seçili; Topluluk seçilince tür güncellenir', () => {
    const onUpdate = vi.fn();
    render(<Step1Slug data={BASE} onUpdate={onUpdate} onNext={vi.fn()} />);
    expect(screen.getByRole('radio', { name: /^Kurum/ })).toBeChecked();
    fireEvent.click(screen.getByRole('radio', { name: /^Topluluk/ }));
    expect(onUpdate).toHaveBeenCalledWith({ tenantKind: 'COMMUNITY' });
  });

  it('topluluk seçiliyken ad alanı "Topluluk Adı" olur', () => {
    render(<Step1Slug data={{ ...BASE, tenantKind: 'COMMUNITY' }} onUpdate={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByLabelText('Topluluk Adı')).toBeInTheDocument();
  });
});

describe('AN-29 — sihirbaz hesap adımı', () => {
  beforeEach(() => {
    vi.mocked(selfServeRegister).mockReset();
    vi.mocked(updateOnboarding).mockReset();
    vi.mocked(updateOnboarding).mockResolvedValue({ ok: true, data: {} } as never);
    vi.mocked(selfServeRegister).mockResolvedValue({
      ok: true, data: { tenant: { id: 't1', verificationStatus: 'AUTO_APPROVED' }, accessToken: 'tok' },
    } as never);
  });

  it('negatif: topluluk + kurumsal e-posta → görev/kanıt boşsa istek GİTMEZ', async () => {
    render(<Step4Account data={{ ...BASE, tenantKind: 'COMMUNITY' }} onUpdate={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByLabelText('Topluluktaki Göreviniz')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /hesabı oluştur/i }));
    expect(await screen.findByText('Topluluktaki görevinizi belirtin.')).toBeInTheDocument();
    expect(selfServeRegister).not.toHaveBeenCalled();
  });

  it('topluluk: görev + kanıt doluysa istek kind=COMMUNITY ile gider', async () => {
    render(<Step4Account data={{ ...BASE, tenantKind: 'COMMUNITY' }} onUpdate={vi.fn()} onNext={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('Topluluktaki Göreviniz'), { target: { value: 'Kurucu' } });
    fireEvent.change(screen.getByLabelText(/Kanıt/), { target: { value: 'https://ornek.org' } });
    fireEvent.click(screen.getByRole('button', { name: /hesabı oluştur/i }));
    await waitFor(() => expect(selfServeRegister).toHaveBeenCalledOnce());
    expect(vi.mocked(selfServeRegister).mock.calls[0]?.[0]).toMatchObject({
      kind: 'COMMUNITY', institutionRole: 'Kurucu', verificationNote: 'https://ornek.org',
    });
  });

  it('kurum kaydı değişmedi: kurumsal e-postada kanıt alanı yok, kind=ORGANIZATION gider', async () => {
    render(<Step4Account data={BASE} onUpdate={vi.fn()} onNext={vi.fn()} />);
    expect(screen.queryByLabelText('Kurumunuzdaki Göreviniz')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /hesabı oluştur/i }));
    await waitFor(() => expect(selfServeRegister).toHaveBeenCalledOnce());
    const sent = vi.mocked(selfServeRegister).mock.calls[0]?.[0];
    expect(sent).toMatchObject({ kind: 'ORGANIZATION' });
    expect(sent).not.toHaveProperty('verificationNote');
  });
});

describe('AN-29 — platform onay ekranında başvurunun türü', () => {
  it('topluluk başvurusu "Topluluk", eski/kurum başvurusu "Kurum" rozetiyle görünür', async () => {
    const row = {
      isActive: true, displayName: null, verificationStatus: 'PENDING_REVIEW', verificationNote: null,
      createdAt: '2026-09-29T10:00:00.000Z', users: [],
    };
    listPendingTenants.mockResolvedValue({
      items: [
        { ...row, id: 'a', name: 'Mezun Ağı', slug: 'mezun-agi', kind: 'COMMUNITY' },
        { ...row, id: 'b', name: 'Eski Dernek', slug: 'eski-dernek', kind: null },
      ],
      total: 2,
    });
    const user = userEvent.setup();
    render(<PlatformDashboard />);
    await user.click(screen.getByRole('button', { name: /Bekleyen Başvurular/ }));
    const community = await screen.findByText('Mezun Ağı');
    expect(community).toHaveTextContent('Topluluk');
    expect(screen.getByText('Eski Dernek')).toHaveTextContent('Kurum');
  });
});
