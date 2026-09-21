/**
 * K-11 — Kurum yöneticisi şikayet inceleme paneli.
 *
 * Açık şikayetler listelenir; "İncelendi olarak işaretle" reviewReport'u çağırır.
 * Boş listede yönlendirici metin görünür.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminReportsPage from '@/app/(admin)/admin/reports/page';
import type { TenantReport } from '@/types/admin';

const state: { items: TenantReport[] } = { items: [] };
const reviewSpy = vi.fn().mockResolvedValue({ ok: true });

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ data: { items: state.items, total: state.items.length }, isLoading: false, error: null, refetch: vi.fn() }),
}));
vi.mock('@/lib/api/admin', () => ({
  adminApi: {
    listReports: vi.fn(),
    reviewReport: (...args: unknown[]) => reviewSpy(...args),
  },
}));

function report(overrides: Partial<TenantReport> = {}): TenantReport {
  return {
    id: 'r1', reason: 'HARASSMENT', description: 'Rahatsız edici mesaj', status: 'OPEN',
    reviewNote: null, createdAt: new Date('2026-09-01T10:00:00Z').toISOString(),
    reporter: { id: 'u1', fullName: 'Ada' }, target: { id: 'u2', fullName: 'Bora' },
    ...overrides,
  };
}

describe('Şikayet inceleme paneli (K-11)', () => {
  beforeEach(() => { reviewSpy.mockClear(); });

  it('açık şikayeti taraflar + gerekçe ile listeler', () => {
    state.items = [report()];
    render(<AdminReportsPage />);
    expect(screen.getByText('Şikayetler')).toBeInTheDocument();
    expect(screen.getByText(/Taciz/)).toBeInTheDocument();
    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(screen.getByText('Bora')).toBeInTheDocument();
  });

  it('"İncelendi" düğmesi reviewReport(REVIEWED) çağırır', async () => {
    state.items = [report()];
    render(<AdminReportsPage />);
    fireEvent.click(screen.getByText(/İncelendi olarak işaretle/));
    await waitFor(() => expect(reviewSpy).toHaveBeenCalledWith(expect.anything(), 'r1', 'REVIEWED', undefined));
  });

  it('boş listede yönlendirici metin', () => {
    state.items = [];
    render(<AdminReportsPage />);
    expect(screen.getByText(/şikayet yok/)).toBeInTheDocument();
  });
});
