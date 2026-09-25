/**
 * Platform paneli — kurum ret penceresi iptali (KR-09).
 *
 * Hata: handleReject `window.prompt(...) ?? undefined` kullanıyordu → "İptal" (null)
 * da undefined'a dönüp rejectTenant çağrılıyordu; iptal eden yönetici kurumu reddetmiş
 * oluyordu. Artık iptal = istek yok; ret başarısız olursa hata kullanıcıya gösterilir.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlatformDashboard from '@/app/platform/dashboard/page';

const rejectTenant = vi.fn();
const listPendingTenants = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));
vi.mock('@/components/molecules/ThemeToggle', () => ({
  ThemeToggle: () => null,
}));
vi.mock('@/lib/api/platform', () => ({
  isPlatformAuthError: () => false,
  platformLogout: vi.fn(() => Promise.resolve()),
  // Genel Bakış bu testin konusu değil — hata ile düşsün, sekme değiştirmeyi engellemez.
  getPlatformStats: vi.fn(() => Promise.reject(new Error('stats yok'))),
  getPlatformHealth: vi.fn(() => Promise.reject(new Error('health yok'))),
  listPendingTenants: (...args: unknown[]) => listPendingTenants(...args),
  listAllTenants: vi.fn(),
  approveTenant: vi.fn(),
  rejectTenant: (...args: unknown[]) => rejectTenant(...args),
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

const pendingTenant = {
  id: 'ten-1',
  name: 'acme',
  displayName: 'Acme Vakfı',
  slug: 'acme',
  isActive: false,
  verificationStatus: 'PENDING',
  verificationNote: null,
  createdAt: '2026-09-01T10:00:00.000Z',
  users: [],
};

async function openPendingTab() {
  const user = userEvent.setup();
  render(<PlatformDashboard />);
  await user.click(screen.getByRole('button', { name: /Bekleyen Başvurular/ }));
  await screen.findByText('Acme Vakfı');
  return user;
}

describe('Platform paneli — ret penceresi iptali (KR-09)', () => {
  beforeEach(() => {
    rejectTenant.mockReset();
    listPendingTenants.mockReset();
    listPendingTenants.mockResolvedValue({ items: [pendingTenant], total: 1 });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('pencerede "İptal"e basılırsa kurum reddedilmez ve bildirim çıkmaz', async () => {
    const promptSpy = vi.spyOn(window, 'prompt').mockReturnValue(null);
    const user = await openPendingTab();

    await user.click(screen.getByRole('button', { name: 'Reddet' }));

    expect(promptSpy).toHaveBeenCalledTimes(1);
    expect(rejectTenant).not.toHaveBeenCalled();
    expect(screen.queryByText('Kurum reddedildi.')).not.toBeInTheDocument();
  });

  it('gerekçe yazılıp onaylanırsa kurum gerekçeyle reddedilir', async () => {
    vi.spyOn(window, 'prompt').mockReturnValue('Belge eksik');
    rejectTenant.mockResolvedValue({ ok: true });
    const user = await openPendingTab();

    await user.click(screen.getByRole('button', { name: 'Reddet' }));

    await waitFor(() => expect(rejectTenant).toHaveBeenCalledWith('ten-1', 'Belge eksik'));
    expect(await screen.findByText('Kurum reddedildi.')).toBeInTheDocument();
  });

  it('boş gerekçeyle onaylanırsa gerekçesiz ret yine gider (gerekçe opsiyonel)', async () => {
    vi.spyOn(window, 'prompt').mockReturnValue('');
    rejectTenant.mockResolvedValue({ ok: true });
    const user = await openPendingTab();

    await user.click(screen.getByRole('button', { name: 'Reddet' }));

    await waitFor(() => expect(rejectTenant).toHaveBeenCalledTimes(1));
    expect(rejectTenant.mock.calls[0]![0]).toBe('ten-1');
  });

  it('ret isteği başarısız olursa kullanıcı hata mesajını görür (sessiz yutulmaz)', async () => {
    vi.spyOn(window, 'prompt').mockReturnValue('Belge eksik');
    rejectTenant.mockRejectedValue(new Error('Kurum bulunamadı.'));
    const user = await openPendingTab();

    await user.click(screen.getByRole('button', { name: 'Reddet' }));

    expect(await screen.findByText('Kurum bulunamadı.')).toBeInTheDocument();
    expect(screen.queryByText('Kurum reddedildi.')).not.toBeInTheDocument();
  });
});
