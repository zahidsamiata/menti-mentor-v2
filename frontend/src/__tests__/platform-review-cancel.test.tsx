/**
 * Platform paneli — bildirim/şikayet inceleme penceresi iptali (KR-09 takip).
 *
 * Aynı hata: `window.prompt(...) ?? undefined` → "İptal" de işlemi yapıyordu (şüphe bildirimi
 * "incelendi" işaretleniyor, kullanıcı şikayeti kapatılıyordu). Artık iptal = istek yok.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlatformDashboard from '@/app/platform/dashboard/page';

const reviewReport = vi.fn();
const reviewUserReport = vi.fn();

// Sabit router nesnesi: sayfanın loadData'sı [router]'a bağlı; her render'da yeni nesne sonsuz
// yeniden yükleme döngüsü yaratır (gerçek Next router'ı sabittir).
const stableRouter = { push: vi.fn() };
vi.mock('next/navigation', () => ({ useRouter: () => stableRouter }));
vi.mock('@/components/molecules/ThemeToggle', () => ({ ThemeToggle: () => null }));
vi.mock('@/lib/api/platform', () => ({
  isPlatformAuthError: () => false,
  platformLogout: vi.fn(() => Promise.resolve()),
  getPlatformStats: vi.fn(() => Promise.reject(new Error('stats yok'))),
  getPlatformHealth: vi.fn(() => Promise.reject(new Error('health yok'))),
  listPendingTenants: vi.fn(),
  listAllTenants: vi.fn(),
  approveTenant: vi.fn(),
  rejectTenant: vi.fn(),
  requestTenantCorrection: vi.fn(),
  freezeTenant: vi.fn(),
  activateTenant: vi.fn(),
  listSuspicionReports: vi.fn(() => Promise.resolve({ items: [{
    id: 'rep-1', tenantName: 'Acme Vakfı', reporterName: 'Bildiren', reporterRole: 'MENTI', contact: 'x',
    description: 'Şüpheli davet', reviewed: false, reviewNote: null, createdAt: '2026-09-01T10:00:00.000Z',
  }] })),
  reviewReport: (...args: unknown[]) => reviewReport(...args),
  getPlatformLogs: vi.fn(),
  listUserReports: vi.fn(() => Promise.resolve({ items: [{
    id: 'ur-1', tenantId: 't1', tenantName: 'Acme Vakfı', reason: 'SPAM', description: null, status: 'OPEN',
    reviewNote: null, createdAt: '2026-09-01T10:00:00.000Z', reporter: { fullName: 'A Kişi' }, target: { fullName: 'B Kişi' },
  }] })),
  reviewUserReport: (...args: unknown[]) => reviewUserReport(...args),
  getAnomalies: vi.fn(() => Promise.resolve({ items: [] })),
}));

describe('Platform paneli — inceleme penceresi iptali', () => {
  let promptSpy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    reviewReport.mockReset().mockResolvedValue({});
    reviewUserReport.mockReset().mockResolvedValue({});
    promptSpy = vi.spyOn(window, 'prompt');
  });
  afterEach(() => promptSpy.mockRestore());

  it('negatif: şüphe bildirimi penceresinde İptal → işaretleme isteği gitmez', async () => {
    promptSpy.mockReturnValue(null);
    const user = userEvent.setup();
    render(<PlatformDashboard />);
    await user.click(screen.getByRole('button', { name: /Şüphe Bildirimleri/ }));
    await user.click(await screen.findByRole('button', { name: 'İncelendi' }));
    expect(reviewReport).not.toHaveBeenCalled();
  });

  it('şüphe bildirimi penceresinde Tamam → işaretlenir', async () => {
    promptSpy.mockReturnValue('kontrol edildi');
    const user = userEvent.setup();
    render(<PlatformDashboard />);
    await user.click(screen.getByRole('button', { name: /Şüphe Bildirimleri/ }));
    await user.click(await screen.findByRole('button', { name: 'İncelendi' }));
    await waitFor(() => expect(reviewReport).toHaveBeenCalledWith('rep-1', 'kontrol edildi'));
  });

  it('negatif: kullanıcı şikayeti penceresinde İptal → şikayet kapatılmaz', async () => {
    promptSpy.mockReturnValue(null);
    const user = userEvent.setup();
    render(<PlatformDashboard />);
    await user.click(screen.getByRole('button', { name: /Kullanıcı Şikayetleri/ }));
    const buttons = await screen.findAllByRole('button', { name: /İncelendi|Reddet/ });
    for (const b of buttons) await user.click(b);
    expect(reviewUserReport).not.toHaveBeenCalled();
  });
});
