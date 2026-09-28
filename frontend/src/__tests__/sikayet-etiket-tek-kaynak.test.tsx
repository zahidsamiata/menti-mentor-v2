/**
 * AJ-61 — Şikâyet durum/neden etiketleri TEK kaynaktan (`lib/enumLabels.ts`).
 *
 * 1. Kurum şikâyet ekranı her durum/neden için ortak sözlükteki etiketi gösterir
 *    (kart rozeti + neden başlığı + durum filtresi).
 * 2. Tek kaynak: sözlük değişince (yeni değer eklenince) kurum ekranı VE platform paneli
 *    ikisi de yeni etiketi gösterir. Sözlük modülü burada genişletilmiş bir kopyayla
 *    değiştirilir; ekranlardan biri yerel bir harita kullanırsa bu test kırmızı olur.
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminReportsPage from '@/app/(admin)/admin/reports/page';
import PlatformDashboard from '@/app/platform/dashboard/page';
import { REPORT_REASON_LABELS, REPORT_STATUS_LABELS } from '@/lib/enumLabels';
import type { ReportReason, ReportStatus, TenantReport } from '@/types/admin';
import type { UserReport } from '@/lib/api/platform';

// Sözlüğe eklenen (henüz gerçek olmayan) değerler — tek kaynak iddiasını ölçer.
const NEW_REASON = 'YENI_NEDEN';
const NEW_REASON_LABEL = 'Test: yeni neden etiketi';
const NEW_STATUS = 'YENI_DURUM';
const NEW_STATUS_LABEL = 'Test: yeni durum etiketi';

vi.mock('@/lib/enumLabels', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/enumLabels')>();
  const reasons: Record<string, string> = { ...actual.REPORT_REASON_LABELS, YENI_NEDEN: 'Test: yeni neden etiketi' };
  const statuses: Record<string, string> = { ...actual.REPORT_STATUS_LABELS, YENI_DURUM: 'Test: yeni durum etiketi' };
  const lookup = (map: Record<string, string>) => (v: string | null | undefined) => (!v ? '—' : map[v] ?? v);
  return {
    ...actual,
    REPORT_REASON_LABELS: reasons,
    REPORT_STATUS_LABELS: statuses,
    reportReasonLabel: lookup(reasons),
    reportStatusLabel: lookup(statuses),
  };
});

const state: { items: TenantReport[] } = { items: [] };

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ data: { items: state.items, total: state.items.length }, isLoading: false, error: null, refetch: vi.fn() }),
}));
vi.mock('@/lib/api/admin', () => ({ adminApi: { listReports: vi.fn(), reviewReport: vi.fn() } }));

const stableRouter = { push: vi.fn() };
vi.mock('next/navigation', () => ({ useRouter: () => stableRouter }));
vi.mock('@/components/molecules/ThemeToggle', () => ({ ThemeToggle: () => null }));

const platformReports: UserReport[] = [
  {
    id: 'ur-new', tenantId: 't1', tenantName: 'Örnek Kurum', reason: NEW_REASON, description: 'Yeni değerli şikâyet',
    status: NEW_STATUS, reviewNote: null, createdAt: '2026-09-01T10:00:00.000Z',
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
  listUserReports: vi.fn(() => Promise.resolve({ items: platformReports, total: platformReports.length })),
  reviewUserReport: vi.fn(),
  getAnomalies: vi.fn(() => Promise.resolve({ items: [] })),
}));

function report(id: string, reason: string, status: string): TenantReport {
  return {
    id, reason: reason as ReportReason, status: status as ReportStatus, description: null, reviewNote: null,
    createdAt: new Date('2026-09-01T10:00:00Z').toISOString(),
    reporter: { id: 'u1', fullName: 'Bildiren' }, target: { id: 'u2', fullName: 'Hedef' },
  };
}

// Gerçek (sözlükte zaten olan) değerler — mock yalnız EKLER, bunları değiştirmez.
const KNOWN_REASONS = ['SPAM', 'HARASSMENT', 'INAPPROPRIATE', 'NO_SHOW', 'OTHER'] as const;
const KNOWN_STATUSES = ['OPEN', 'REVIEWED', 'DISMISSED'] as const;

describe('AJ-61 · Kurum şikâyet ekranı ortak sözlükten okur', () => {
  it('her neden için kartta ortak sözlükteki etiket görünür', () => {
    state.items = KNOWN_REASONS.map((r, i) => report(`r-${i}`, r, 'REVIEWED'));
    render(<AdminReportsPage />);
    for (const reason of KNOWN_REASONS) {
      expect(screen.getByText(REPORT_REASON_LABELS[reason])).toBeInTheDocument();
    }
  });

  it('her durum için kart rozeti ve filtre düğmesi ortak sözlükteki etiketi gösterir', () => {
    state.items = KNOWN_STATUSES.map((s, i) => report(`s-${i}`, 'OTHER', s));
    render(<AdminReportsPage />);
    for (const status of KNOWN_STATUSES) {
      const label = REPORT_STATUS_LABELS[status];
      // Biri filtre düğmesi, biri kart rozeti.
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
      expect(screen.getAllByText(label)).toHaveLength(2);
    }
  });
});

describe('AJ-61 · Tek kaynak: sözlüğe eklenen değeri iki ekran da gösterir', () => {
  it('kurum ekranı: yeni neden + yeni durum etiketi (kart ve filtre)', () => {
    state.items = [report('n-1', NEW_REASON, NEW_STATUS)];
    const { container } = render(<AdminReportsPage />);
    expect(screen.getByText(NEW_REASON_LABEL)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: NEW_STATUS_LABEL })).toBeInTheDocument();
    expect(screen.getAllByText(NEW_STATUS_LABEL)).toHaveLength(2);
    expect(container.textContent).not.toContain(NEW_REASON);
    expect(container.textContent).not.toContain(NEW_STATUS);
  });

  it('platform paneli: aynı yeni neden + durum etiketi', async () => {
    const user = userEvent.setup();
    const { container } = render(<PlatformDashboard />);
    await user.click(screen.getByRole('button', { name: /Kullanıcı Şikayetleri/ }));
    const card = (await screen.findByText('Yeni değerli şikâyet')).closest('div')?.parentElement ?? container;
    expect(within(card as HTMLElement).getByText(`(${NEW_REASON_LABEL})`)).toBeInTheDocument();
    expect(within(card as HTMLElement).getByText(new RegExp(`Kurum: Örnek Kurum · ${NEW_STATUS_LABEL}`))).toBeInTheDocument();
    expect(container.textContent).not.toContain(NEW_REASON);
    expect(container.textContent).not.toContain(NEW_STATUS);
  });
});
