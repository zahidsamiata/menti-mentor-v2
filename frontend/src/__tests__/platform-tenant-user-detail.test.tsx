/**
 * F-24 (G4-08) — Platform tek-kullanıcı drill-down görünümü (`/platform/tenants/[id]/users/[userId]`).
 *
 * Alan kümesi BİLEREK üye listesiyle (MembersTable) aynıdır — yeni PII kategorisi yok.
 * Bkz. backend `getTenantUserDetail` (platformTenantController.ts) ve API istemcisi
 * `getTenantUserDetail` (lib/api/platform.ts).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import TenantUserDetailPage from '@/app/platform/tenants/[id]/users/[userId]/page';
import type { TenantUserDetail } from '@/lib/api/platform';

const getTenantUserDetail = vi.fn();

const stableRouter = { push: vi.fn() };
vi.mock('next/navigation', () => ({
  useRouter: () => stableRouter,
  useParams: () => ({ id: 'tenant-1', userId: 'user-1' }),
}));
vi.mock('@/lib/api/platform', () => ({
  isPlatformAuthError: (e: unknown) => (e as { status?: number } | null)?.status === 401 || (e as { status?: number } | null)?.status === 403,
  getTenantUserDetail: (...args: unknown[]) => getTenantUserDetail(...args),
}));

function detail(overrides: Partial<TenantUserDetail> = {}): TenantUserDetail {
  return {
    id: 'user-1',
    fullName: 'Ayşe Yılmaz',
    role: 'MENTOR',
    isActive: true,
    joinedAt: '2026-01-15T10:00:00.000Z',
    emailMasked: 'a***@ornek.com',
    discType: 'D',
    certificationStatus: 'CERTIFIED',
    isCertified: true,
    learningJourneyCompletedAt: '2026-03-01T00:00:00.000Z',
    hasKvkkConsent: true,
    ...overrides,
  };
}

describe('Platform paneli — kullanıcı detay görünümü (F-24)', () => {
  beforeEach(() => {
    getTenantUserDetail.mockReset();
    stableRouter.push.mockReset();
  });

  it('kullanıcı detayını gösterir: ad, rol, maskeli e-posta, DISC, sertifika, KVKK rızası', async () => {
    getTenantUserDetail.mockResolvedValue(detail());
    render(<TenantUserDetailPage />);

    expect(await screen.findByText('Ayşe Yılmaz')).toBeInTheDocument();
    expect(screen.getByText('Mentör')).toBeInTheDocument();
    expect(screen.getByText('a***@ornek.com')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
    expect(screen.getByText('Evet')).toBeInTheDocument(); // sertifikalı
    expect(screen.getByText('Var')).toBeInTheDocument(); // KVKK rızası
    expect(getTenantUserDetail).toHaveBeenCalledWith('tenant-1', 'user-1');
  });

  it('negatif: 403 alınca platform login sayfasına yönlendirir', async () => {
    const err = new Error('yetkisiz') as Error & { status?: number };
    err.status = 403;
    getTenantUserDetail.mockRejectedValue(err);

    render(<TenantUserDetailPage />);

    await waitFor(() => expect(stableRouter.push).toHaveBeenCalledWith('/platform/login'));
  });

  it('negatif: 404 (kullanıcı bulunamadı) hata mesajı gösterir, patlamaz', async () => {
    const err = new Error('Kullanıcı bu kurumda bulunamadı.') as Error & { status?: number };
    err.status = 404;
    getTenantUserDetail.mockRejectedValue(err);

    render(<TenantUserDetailPage />);

    expect(await screen.findByText('Kullanıcı bu kurumda bulunamadı.')).toBeInTheDocument();
  });
});
