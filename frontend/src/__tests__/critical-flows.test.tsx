/**
 * Kritik Akış Testleri — Canlı öncesi güvenlik ve yasal kontroller
 *
 * Kapsam:
 *  1. KVKK onayı — kayıt formları (İş 3a, yasal risk)
 *  2. Yönlendirme/erişim mantığı — dashboard (İş 3b, güvenlik)
 *  3. Rol ayrımı — mentor/menti sayfaları (İş 3c, güvenlik)
 */

import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// jsdom, <dialog> showModal/close metodlarını tanımlamaz — polyfill.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close     = vi.fn();
});

// ─── Mock'lar (vi.mock hoisting nedeniyle dosyanın en başında) ───────────────

const routerReplace = vi.fn();
const routerPush    = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter:      () => ({ replace: routerReplace, push: routerPush }),
  useSearchParams: () => ({ get: () => null }),
}));

vi.mock('@/providers/AuthProvider', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/providers/TenantProvider', () => ({
  useTenant: () => ({ tenant: null, isLoading: false }),
}));

vi.mock('@/hooks/useApiClient', () => ({
  useApiClient: () => ({}),
}));

vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ data: null, isLoading: false, error: null, refetch: vi.fn() }),
}));

vi.mock('@/lib/api/selfServe', () => ({
  selfServeRegister: vi.fn(),
  updateOnboarding:  vi.fn(),
}));

vi.mock('@/lib/api/auth', () => ({
  authApi: { register: vi.fn() },
}));

vi.mock('@/components/molecules/OAuthButtons',        () => ({ OAuthButtons: () => null }));
vi.mock('@/components/atoms/TenantLogo',              () => ({ TenantLogo: () => null }));
vi.mock('@/components/organisms/DailyQuestionWidget', () => ({ DailyQuestionWidget: () => null }));
vi.mock('@/components/organisms/DiscConfidenceWidget',() => ({ DiscConfidenceWidget: () => null }));
vi.mock('@/components/organisms/DashboardMetricCard', () => ({ DashboardMetricCard: () => null }));
vi.mock('@/lib/api/matching',  () => ({ matchingApi: {}, mentorFilterApi: {}, matchRequestApi: {} }));
vi.mock('@/lib/api/meetings',  () => ({ meetingsApi: {} }));

// Lazy imports (mock'lar tanımlandıktan sonra)
import { useAuth }              from '@/providers/AuthProvider';
import { Step4Account }         from '@/app/onboarding/stk/_steps/Step4Account';
import RegisterContent          from '@/app/(auth)/register/_RegisterContent';
import DashboardPage            from '@/app/(dashboard)/dashboard/page';
import MentorDashboardPage      from '@/app/(dashboard)/mentor/page';
import MentiDashboardPage       from '@/app/(dashboard)/menti/page';
import { selfServeRegister }    from '@/lib/api/selfServe';
import { authApi }              from '@/lib/api/auth';
import type { WizardData }      from '@/app/onboarding/stk/_StkOnboardingContent';

// ─── Yardımcılar ─────────────────────────────────────────────────────────────

const makeUser = (overrides: Partial<{ role: string; approvalStatus: string; discType: string | null }> = {}) => ({
  id: 'u1',
  tenantId: 't1',
  role: 'MENTI',
  fullName: 'Test',
  email: 'test@test.com',
  approvalStatus: 'APPROVED',
  authProvider: 'LOCAL',
  discType: 'D',
  needsOrientation: false,
  ...overrides,
});

const BASE_WIZARD_DATA: WizardData = {
  tenantName: 'Test Tenant', slug: 'test',
  programTemplate: 'MEZUN',
  logoUrl: '', primaryColor: '#6366f1',
  fullName: 'Test User', email: 'test@example.com', password: 'password123',
  kvkkConsent: false,
  tenantId: '', adminToken: '',
};

// ─── İŞ 3a — KVKK Onayı Zorunluluğu ─────────────────────────────────────────

describe('KVKK Onay Zorunluluğu — STK Onboarding (Step4Account)', () => {
  beforeEach(() => { vi.mocked(selfServeRegister).mockReset(); });

  it('KVKK onaylanmadan submit → hata mesajı gösterir, backend çağrılmaz', async () => {
    render(
      <Step4Account
        data={BASE_WIZARD_DATA}
        onUpdate={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /hesabı oluştur/i }));

    await waitFor(() => {
      expect(screen.getByText('Devam etmek için onay vermeniz gerekiyor.')).toBeInTheDocument();
    });
    expect(selfServeRegister).not.toHaveBeenCalled();
  });

  it('KVKK onaylanınca selfServeRegister çağrılır', async () => {
    vi.mocked(selfServeRegister).mockResolvedValue({
      ok: true,
      data: { tenant: { id: 't1' }, accessToken: 'tok', refreshToken: 'ref' },
    } as never);

    render(
      <Step4Account
        data={{ ...BASE_WIZARD_DATA, kvkkConsent: true }}
        onUpdate={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /hesabı oluştur/i }));

    await waitFor(() => {
      expect(selfServeRegister).toHaveBeenCalledOnce();
    });
    expect(vi.mocked(selfServeRegister).mock.calls[0]?.[0]).toMatchObject({ kvkkConsent: true });
  });
});

describe('KVKK Onay Zorunluluğu — Kayıt Formu (RegisterContent)', () => {
  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({ login: vi.fn() } as never);
    vi.mocked(authApi.register).mockReset();
  });

  it('KVKK onaylanmadan submit → KVKK hata mesajı görünür, register çağrılmaz', async () => {
    render(<RegisterContent />);

    // Geçerli e-posta, şifre ve tekrar şifre doldur
    fireEvent.change(screen.getByLabelText('E-posta Adresi'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Güçlü Bir Şifre'), { target: { value: 'sifre12345' } });
    fireEvent.change(screen.getByLabelText('Şifre Tekrar'), { target: { value: 'sifre12345' } });
    // KVKK checkbox işaretlemiyoruz

    fireEvent.click(screen.getByRole('button', { name: /hesabımı oluştur/i }));

    await waitFor(() => {
      expect(screen.getByText('KVKK kapsamında veri işleme onayı zorunludur.')).toBeInTheDocument();
    });
    expect(authApi.register).not.toHaveBeenCalled();
  });
});

// ─── İŞ 3b — Yönlendirme / Erişim Mantığı ───────────────────────────────────

describe('Dashboard Yönlendirme (DashboardPage)', () => {
  beforeEach(() => { routerReplace.mockReset(); });

  it('Giriş yapılmamış (user=null) → /login\'e yönlendirir', async () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, isLoading: false } as never);

    render(<DashboardPage />);

    await waitFor(() => {
      expect(routerReplace).toHaveBeenCalledWith('/login');
    });
  });

  it('MENTOR kullanıcı → /mentor\'e yönlendirir', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: makeUser({ role: 'MENTOR' }), isLoading: false,
    } as never);

    render(<DashboardPage />);

    await waitFor(() => {
      expect(routerReplace).toHaveBeenCalledWith('/mentor');
    });
  });

  it('MENTI kullanıcı → /menti\'ye yönlendirir', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: makeUser({ role: 'MENTI' }), isLoading: false,
    } as never);

    render(<DashboardPage />);

    await waitFor(() => {
      expect(routerReplace).toHaveBeenCalledWith('/menti');
    });
  });
});

// ─── İŞ 3c — Rol Ayrımı ──────────────────────────────────────────────────────

describe('Rol Ayrımı — Mentor Sayfası (MentorDashboardPage)', () => {
  beforeEach(() => { routerReplace.mockReset(); });

  it('MENTI kullanıcı /mentor\'e gelince /dashboard\'a yönlendirilir', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: makeUser({ role: 'MENTI' }), isLoading: false,
    } as never);

    render(<MentorDashboardPage />);

    await waitFor(() => {
      expect(routerReplace).toHaveBeenCalledWith('/dashboard');
    });
  });
});

describe('Rol Ayrımı — Menti Sayfası (MentiDashboardPage)', () => {
  beforeEach(() => { routerReplace.mockReset(); });

  it('MENTOR kullanıcı /menti\'ye gelince /dashboard\'a yönlendirilir', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: makeUser({ role: 'MENTOR' }), isLoading: false,
    } as never);

    render(<MentiDashboardPage />);

    await waitFor(() => {
      expect(routerReplace).toHaveBeenCalledWith('/dashboard');
    });
  });
});
