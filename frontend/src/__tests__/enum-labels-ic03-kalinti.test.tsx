/**
 * AJ-41 (IC-03 kalıntısı) — iki ekranda kalan ham enum artık Türkçe:
 *   1. Program Sağlığı → Pasif Üyeler satırı: `MENTOR`/`MENTI` yerine "Mentör"/"Menti".
 *   2. Platform paneli → Kullanıcı Şikayetleri: durum (`OPEN`…) ve neden (`SPAM`…) Türkçe.
 * Ortak sözlük: `lib/enumLabels.ts`.
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProgramHealthSection } from '@/components/organisms/ProgramHealthSection';
import PlatformDashboard from '@/app/platform/dashboard/page';
import { reportReasonLabel, reportStatusLabel } from '@/lib/enumLabels';
import type { HealthMetricsData } from '@/types/admin';
import type { UserReport } from '@/lib/api/platform';

const healthData: HealthMetricsData = {
  tenantId: 't1',
  generatedAt: '2026-09-27T10:00:00.000Z',
  thresholds: { passiveDays: 30, staleMatchDays: 21 },
  supplyDemand: { mentors: 1, mentis: 1, ratio: 1 },
  mentorlessMenti: { count: 0, items: [] },
  deadMatches: { count: 0, items: [] },
  passiveMembers: {
    count: 2,
    items: [
      { id: 'p1', fullName: 'Üye Bir', role: 'MENTOR', lastLoginAt: null },
      { id: 'p2', fullName: 'Üye İki', role: 'MENTI', lastLoginAt: null },
    ],
  },
};

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ data: healthData, isLoading: false, error: null, refetch: vi.fn() }),
}));
vi.mock('@/lib/api/admin', () => ({ adminApi: { getHealthMetrics: vi.fn(), nudgeUser: vi.fn() } }));

const stableRouter = { push: vi.fn() };
vi.mock('next/navigation', () => ({ useRouter: () => stableRouter }));
vi.mock('@/components/molecules/ThemeToggle', () => ({ ThemeToggle: () => null }));

const reports: UserReport[] = [
  {
    id: 'ur-1', tenantId: 't1', tenantName: 'Örnek Kurum', reason: 'HARASSMENT', description: 'Açıklama bir',
    status: 'OPEN', reviewNote: null, createdAt: '2026-09-01T10:00:00.000Z',
    reporter: { fullName: 'Bildiren Üye' }, target: { fullName: 'Hedef Üye' },
  },
  {
    id: 'ur-2', tenantId: 't1', tenantName: 'Örnek Kurum', reason: 'NO_SHOW', description: 'Açıklama iki',
    status: 'DISMISSED', reviewNote: null, createdAt: '2026-09-02T10:00:00.000Z',
    reporter: { fullName: 'Bildiren Üye' }, target: { fullName: 'Hedef Üye' },
  },
];

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
  listUserReports: vi.fn(() => Promise.resolve({ items: reports, total: reports.length })),
  reviewUserReport: vi.fn(),
  getAnomalies: vi.fn(() => Promise.resolve({ items: [] })),
}));

describe('AJ-41 · Program Sağlığı pasif üye rolü Türkçe', () => {
  it('Pasif Üyeler listesinde rol "Mentör"/"Menti" görünür; ham MENTOR/MENTI görünmez', async () => {
    const user = userEvent.setup();
    const { container } = render(<ProgramHealthSection />);
    await user.click(screen.getByRole('button', { name: /Pasif Üye/ }));

    expect(screen.getByText(/^Mentör · son giriş:/)).toBeInTheDocument();
    expect(screen.getByText(/^Menti · son giriş:/)).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/\bMENTOR\b|\bMENTI\b/);
  });
});

describe('AJ-41 · Platform paneli şikâyet durumu ve nedeni Türkçe', () => {
  it('sözlük karşılıkları kurum şikâyet ekranıyla aynı; bilinmeyen değer ham döner', () => {
    expect(reportStatusLabel('OPEN')).toBe('Açık');
    expect(reportStatusLabel('REVIEWED')).toBe('İncelendi');
    expect(reportStatusLabel('DISMISSED')).toBe('Reddedildi');
    expect(reportReasonLabel('SPAM')).toBe('Spam / istenmeyen');
    expect(reportReasonLabel('YENI_DEGER')).toBe('YENI_DEGER');
    expect(reportStatusLabel(null)).toBe('—');
  });

  it('şikâyet kartında durum ve neden Türkçe; ham OPEN/DISMISSED/HARASSMENT/NO_SHOW görünmez', async () => {
    const user = userEvent.setup();
    const { container } = render(<PlatformDashboard />);
    await user.click(screen.getByRole('button', { name: /Kullanıcı Şikayetleri/ }));

    expect(await screen.findByText('Açıklama bir')).toBeInTheDocument();
    expect(screen.getByText(/Kurum: Örnek Kurum · Açık/)).toBeInTheDocument();
    expect(screen.getByText(/Kurum: Örnek Kurum · Reddedildi/)).toBeInTheDocument();
    expect(screen.getByText('(Taciz / rahatsız edici)')).toBeInTheDocument();
    expect(screen.getByText('(Görüşmeye gelmedi)')).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/\bOPEN\b|\bDISMISSED\b|\bHARASSMENT\b|\bNO_SHOW\b/);
  });
});
