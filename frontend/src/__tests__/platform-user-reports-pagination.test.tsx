/**
 * AN-39 — Platform paneli "Kullanıcı Şikayetleri" sayfalama.
 *
 * `listUserReports` artık `{ items, total }` ile filtreye uyan TÜM kayıt sayısını döner (varsayılan
 * sayfa 50). `items.length < total` ise "Daha fazla göster" sonraki sayfayı (offset = mevcut uzunluk)
 * ekler; hata olursa mevcut liste kalır.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlatformDashboard from '@/app/platform/dashboard/page';
import type { UserReport } from '@/lib/api/platform';

const listUserReports = vi.fn();

// Sabit router nesnesi: loadData [router]'a bağlı; her render'da yeni nesne sonsuz döngü yaratır.
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
  listSuspicionReports: vi.fn(() => Promise.resolve({ items: [] })),
  reviewReport: vi.fn(),
  getPlatformLogs: vi.fn(),
  listUserReports: (...args: unknown[]) => listUserReports(...args),
  reviewUserReport: vi.fn(),
  getAnomalies: vi.fn(() => Promise.resolve({ items: [] })),
}));

function userReport(n: number): UserReport {
  return {
    id: `ur-${n}`, tenantId: 't1', tenantName: 'Acme Vakfı', reason: 'SPAM', description: `Açıklama ${n}`,
    status: 'OPEN', reviewNote: null, createdAt: '2026-09-01T10:00:00.000Z',
    reporter: { fullName: 'A Kişi' }, target: { fullName: 'B Kişi' },
  } as UserReport;
}

async function openAbuseTab() {
  const user = userEvent.setup();
  render(<PlatformDashboard />);
  await user.click(screen.getByRole('button', { name: /Kullanıcı Şikayetleri/ }));
  return user;
}

describe('Platform paneli — kullanıcı şikayetleri sayfalama (AN-39)', () => {
  beforeEach(() => { listUserReports.mockReset(); });

  it('total > items iken "Daha fazla göster" görünür; tıklayınca offset\'li istek gider ve satırlar eklenir', async () => {
    listUserReports
      .mockResolvedValueOnce({ items: [userReport(1), userReport(2)], total: 3, limit: 50, offset: 0 })
      .mockResolvedValueOnce({ items: [userReport(3)], total: 3, limit: 50, offset: 2 });
    const user = await openAbuseTab();

    expect(await screen.findByText('Açıklama 1')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Daha fazla göster' }));

    expect(await screen.findByText('Açıklama 3')).toBeInTheDocument();
    expect(listUserReports).toHaveBeenLastCalledWith(undefined, { offset: 2 });
    expect(screen.getByText('Açıklama 1')).toBeInTheDocument();
    expect(screen.getByText('Açıklama 2')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Daha fazla göster' })).not.toBeInTheDocument();
  });

  it('negatif: total == items iken düğme yok', async () => {
    listUserReports.mockResolvedValue({ items: [userReport(1), userReport(2)], total: 2, limit: 50, offset: 0 });
    await openAbuseTab();
    expect(await screen.findByText('Açıklama 2')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Daha fazla göster' })).not.toBeInTheDocument();
  });

  it('ikinci sayfa hatasında mevcut satırlar kalır ve Türkçe hata görünür', async () => {
    listUserReports
      .mockResolvedValueOnce({ items: [userReport(1)], total: 4, limit: 50, offset: 0 })
      .mockRejectedValueOnce(new Error('boom'));
    const user = await openAbuseTab();

    expect(await screen.findByText('Açıklama 1')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Daha fazla göster' }));

    expect(await screen.findByText(/Daha fazla şikayet yüklenemedi/)).toBeInTheDocument();
    expect(screen.getByText('Açıklama 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Daha fazla göster' })).toBeEnabled();
  });
});
