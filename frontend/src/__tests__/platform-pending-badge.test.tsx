/**
 * U-05 (AJ-45) — platform paneli: bekleyen kurum başvurusu rozeti + Genel Bakış kartı.
 *
 * `platform/dashboard/page.tsx` sekmesinde `stats.totals.pendingTenants` rozeti ve Genel
 * Bakış'ta "Bekleyen Başvuru" kartı vardı ama hiçbir test ölçmüyordu. Bu test:
 * - bekleyen başvuru varken "Bekleyen Başvurular" sekmesinde sayı rozeti görünür;
 * - Genel Bakış kartı sayıyı kırmızı (dikkat) gösterir;
 * - bekleyen yokken rozet görünmez, kart 0'ı nötr renkte gösterir.
 * Ayrıca (F-25 ön yüz ayağı) sağlık ucu e-postayı "configured" dışında bildirirse
 * SMTP hapı "Eksik yapılandırma" der.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import PlatformDashboard from '@/app/platform/dashboard/page';

const getPlatformStats = vi.fn();
const getPlatformHealth = vi.fn();

// Kararlı router nesnesi: sayfa `loadData`'yı router'a bağlı useCallback ile kurar; her
// render'da yeni nesne dönerse veri sonsuz yeniden yüklenir.
const routerStub = { push: vi.fn() };
vi.mock('next/navigation', () => ({
  useRouter: () => routerStub,
}));
vi.mock('@/components/molecules/ThemeToggle', () => ({
  ThemeToggle: () => null,
}));
vi.mock('@/lib/api/platform', () => ({
  isPlatformAuthError: () => false,
  platformLogout: vi.fn(() => Promise.resolve()),
  getPlatformStats: (...args: unknown[]) => getPlatformStats(...args),
  getPlatformHealth: (...args: unknown[]) => getPlatformHealth(...args),
  listPendingTenants: vi.fn(),
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

function statsWith(pendingTenants: number) {
  return {
    totals: {
      tenants: 7, users: 40, mentors: 11, mentis: 25, admins: 2, meetings: 12,
      pendingMeetings: 1, completedMeetings: 5, pendingTenants, unreviewedReports: 0,
    },
    tenants: [],
    recentLogs: [],
  };
}

const HEALTH_OK = { db: 'connected', mail: 'configured', recentErrors: 0, uptime: 3600 };

function overviewCardValue(label: string): HTMLElement {
  const labelEl = screen.getByText(label, { selector: 'p' });
  return labelEl.nextElementSibling as HTMLElement;
}

describe('Platform paneli — bekleyen başvuru rozeti (U-05)', () => {
  beforeEach(() => {
    getPlatformStats.mockReset();
    getPlatformHealth.mockReset();
    getPlatformHealth.mockResolvedValue(HEALTH_OK);
  });

  it('bekleyen başvuru varken sekmede sayı rozeti ve kırmızı Genel Bakış kartı görünür', async () => {
    getPlatformStats.mockResolvedValue(statsWith(3));
    render(<PlatformDashboard />);
    await screen.findByText('Bekleyen Başvuru', { selector: 'p' });

    const tab = screen.getByRole('button', { name: /Bekleyen Başvurular/ });
    expect(within(tab).getByText('3')).toBeInTheDocument();

    const value = overviewCardValue('Bekleyen Başvuru');
    expect(value).toHaveTextContent('3');
    expect(value.className).toContain('text-destructive');
  });

  it('bekleyen başvuru yokken rozet görünmez, kart 0 ve nötr', async () => {
    getPlatformStats.mockResolvedValue(statsWith(0));
    render(<PlatformDashboard />);
    await screen.findByText('Bekleyen Başvuru', { selector: 'p' });

    const tab = screen.getByRole('button', { name: /Bekleyen Başvurular/ });
    expect(tab.querySelector('span')).toBeNull();

    const value = overviewCardValue('Bekleyen Başvuru');
    expect(value).toHaveTextContent('0');
    expect(value.className).not.toContain('text-destructive');
  });

  it('F-25 ön yüz: e-posta sağlık durumu configured değilse SMTP hapı "Eksik yapılandırma" der', async () => {
    getPlatformStats.mockResolvedValue(statsWith(0));
    getPlatformHealth.mockResolvedValue({ ...HEALTH_OK, mail: 'not_configured' });
    render(<PlatformDashboard />);
    const pillLabel = await screen.findByText('E-posta (SMTP)');
    expect(pillLabel.parentElement).toHaveTextContent('Eksik yapılandırma');
    expect(pillLabel.parentElement).not.toHaveTextContent('Yapılandırılmış');
  });
});
