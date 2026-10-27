/**
 * U-15 (KARAR-84 B) — platform yöneticisi kullanıcı detayında şifre sıfırlama bağlantısı üretir ve
 * ekranda görür (kişiye kendisi iletir). Onaylamazsa istek gitmez.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TenantUserDetailPage from '@/app/platform/tenants/[id]/users/[userId]/page';

const issueUserPasswordResetLink = vi.fn();

// Sabit router: her render'da yeni nesne dönerse sayfanın yükleme etkisi sonsuz döngüye girer.
const stableRouter = { push: vi.fn() };
vi.mock('next/navigation', () => ({
  useRouter: () => stableRouter,
  useParams: () => ({ id: 'tenant-1', userId: 'user-1' }),
}));
vi.mock('@/lib/api/platform', () => ({
  isPlatformAuthError: () => false,
  getTenantUserDetail: () => Promise.resolve({
    id: 'user-1', fullName: 'Örnek Kullanıcı', role: 'MENTI', isActive: true,
    joinedAt: '2026-01-15T10:00:00.000Z', emailMasked: 'a***@ornek.com', discType: null,
    certificationStatus: 'NOT_STARTED', isCertified: false, learningJourneyCompletedAt: null, hasKvkkConsent: true,
  }),
  issueUserPasswordResetLink: (...args: unknown[]) => issueUserPasswordResetLink(...args),
}));

beforeEach(() => {
  issueUserPasswordResetLink.mockReset();
});

describe('U-15 platform yöneticisi sıfırlama bağlantısı', () => {
  it('bağlantı üretilir ve ekranda gösterilir', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    issueUserPasswordResetLink.mockResolvedValue({ resetUrl: 'https://site/reset-password?token=abc', expiresInMinutes: 60 });
    render(<TenantUserDetailPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'Şifre sıfırlama bağlantısı üret' }));
    await waitFor(() => expect(issueUserPasswordResetLink).toHaveBeenCalledWith('tenant-1', 'user-1'));
    expect(await screen.findByDisplayValue('https://site/reset-password?token=abc')).toBeInTheDocument();
    expect(screen.getByText(/Bağlantı 60 dakika geçerli, tek kullanımlık/)).toBeInTheDocument();
  });

  it('onay verilmezse istek gitmez', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    render(<TenantUserDetailPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'Şifre sıfırlama bağlantısı üret' }));
    expect(issueUserPasswordResetLink).not.toHaveBeenCalled();
  });

  it('hata mesajı gösterilir', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    issueUserPasswordResetLink.mockRejectedValue(new Error('Bu kişi Google/LinkedIn ile giriş yapıyor; şifre sıfırlama gerekmez.'));
    render(<TenantUserDetailPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'Şifre sıfırlama bağlantısı üret' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Google/LinkedIn');
  });
});
