/**
 * AJ-85 (erişilebilirlik denetimi bulgu #11) — seçim/filtre düğme grupları adlandırılmış.
 *
 * Görsel olarak bir arada duran ve tek seçimli filtre gibi davranan düğmeler ekran okuyucuya
 * birbirinden kopuk tekil düğmeler olarak okunuyordu. Artık her grup `role="group"` ve bir ad
 * (görünür başlık varsa `aria-labelledby`, yoksa Türkçe `aria-label`) taşır; seçili düğme
 * `aria-pressed` ile duyurulur. Görünüm değişmez.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within, fireEvent } from '@testing-library/react';

import { MembersTable } from '@/app/platform/tenants/[id]/_components/MembersTable';
import AlgorithmTunerPage from '@/app/(admin)/admin/algorithm-tuner/page';
import AdminReportsPage from '@/app/(admin)/admin/reports/page';
import { ProgramHealthSection } from '@/components/organisms/ProgramHealthSection';
import { clearQueryCache } from '@/lib/queryCache';

// jsdom <dialog> API'sini (showModal/close) içermez; algoritma sayfasındaki ConfirmDialog mount'ta close() çağırır.
HTMLDialogElement.prototype.showModal ??= function showModal() {};
HTMLDialogElement.prototype.close ??= function close() {};

const stableApi = {};
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => stableApi }));
vi.mock('@/providers/AuthProvider', () => ({ useAuth: () => ({ user: { tenantId: 'tenant-a' } }) }));

vi.mock('@/lib/api/algorithmTuner', () => ({
  algorithmTunerApi: {
    getPending: () => Promise.resolve({ ok: true, data: { pending: null } }),
    getWeights: () => Promise.resolve({
      ok: true,
      data: {
        weights: { sectorWeight: 0.6, discWeight: 0.4, lastAdjustedAt: '2026-09-01T00:00:00.000Z', reason: '' },
        lastChange: null,
        reportingFrequency: 'WEEKLY',
      },
    }),
    setWeights: vi.fn(), approve: vi.fn(), reject: vi.fn(), updateFrequency: vi.fn(),
  },
}));

vi.mock('@/lib/api/admin', () => ({
  adminApi: {
    listReports: () => Promise.resolve({ ok: true, data: { items: [], total: 0, limit: 30, offset: 0 } }),
    reviewReport: vi.fn(),
    nudgeUser: vi.fn(),
    getHealthMetrics: () => Promise.resolve({
      ok: true,
      data: {
        tenantId: 'tenant-a',
        generatedAt: '2026-09-28T00:00:00.000Z',
        thresholds: { passiveDays: 30, staleMatchDays: 30 },
        supplyDemand: { mentors: 2, mentis: 3, ratio: 1.5 },
        mentorlessMenti: { count: 0, items: [] },
        deadMatches: { count: 0, items: [] },
        passiveMembers: { count: 0, items: [] },
      },
    }),
  },
}));

beforeEach(() => clearQueryCache());

describe('AJ-85 · platform kurum üyeleri — rol filtresi', () => {
  it('filtre düğmeleri "Role göre filtrele" adlı grupta, seçili olan aria-pressed', () => {
    const onChange = vi.fn();
    render(<MembersTable tenantId="t1" members={[]} loading={false} roleFilter="MENTOR" onRoleFilterChange={onChange} />);

    const group = screen.getByRole('group', { name: 'Role göre filtrele' });
    const buttons = within(group).getAllByRole('button');
    expect(buttons.map((b) => b.textContent)).toEqual(['Hepsi', 'Mentörler', 'Mentiler', 'Adminler']);
    expect(within(group).getByRole('button', { name: 'Mentörler' })).toHaveAttribute('aria-pressed', 'true');
    expect(within(group).getByRole('button', { name: 'Hepsi' })).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(within(group).getByRole('button', { name: 'Adminler' }));
    expect(onChange).toHaveBeenCalledWith('ADMIN');
  });
});

describe('AJ-85 · algoritma ayarları — bildirim sıklığı', () => {
  it('sıklık seçenekleri görünür kart başlığıyla adlandırılmış grupta', async () => {
    render(<AlgorithmTunerPage />);

    const group = await screen.findByRole('group', { name: 'Analiz Bildirimi Sıklığı' });
    await waitFor(() =>
      expect(within(group).getByRole('button', { name: /Haftalık/ })).toHaveAttribute('aria-pressed', 'true'),
    );
    expect(within(group).getAllByRole('button')).toHaveLength(3);
  });
});

describe('AJ-85 · kurum şikâyetleri — durum filtresi', () => {
  it('durum filtreleri "Duruma göre filtrele" adlı grupta, tam biri seçili', async () => {
    render(<AdminReportsPage />);

    const group = await screen.findByRole('group', { name: 'Duruma göre filtrele' });
    const buttons = within(group).getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(1);
    expect(buttons.filter((b) => b.getAttribute('aria-pressed') === 'true')).toHaveLength(1);
  });
});

describe('AJ-85 · program sağlığı — özet kartları', () => {
  it('tıklanabilir sayılar "Program Sağlığı" başlığıyla adlandırılmış grupta', async () => {
    render(<ProgramHealthSection />);

    const group = await screen.findByRole('group', { name: 'Program Sağlığı' });
    expect(within(group).getAllByRole('button')).toHaveLength(3);
    expect(within(group).getByRole('button', { name: /Mentörsüz Menti/ })).toHaveAttribute('aria-pressed', 'false');
  });
});
