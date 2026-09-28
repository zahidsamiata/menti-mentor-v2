/**
 * AJ-78 — KPI panelinde tamamlama kartları: "Kaydını Tamamlayan Üye", "DISC Tamamlama", "Tamamlanan Görüşme".
 *
 * Gizleme backend'de (k-anonimlik, pay ve payda); kart gelen durumu doğru anlatmalı:
 * - görünür oran yüzde + "pay/payda" ile;
 * - gizli oran "Gizli" + nedeni; yüzde ya da sessiz 0 yok;
 * - alan yoksa (eski yanıt) kartlar hiç çizilmez.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import KpiPage from '@/app/(admin)/admin/kpi/page';
import type { KpiCompletion, KpiData } from '@/types/admin';

const state: { data: KpiData | null } = { data: null };

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ data: state.data, isLoading: false, error: null, refetch: vi.fn() }),
}));
vi.mock('@/lib/api/admin', () => ({ adminApi: { getKpi: vi.fn() } }));
vi.mock('@/components/organisms/ProgramHealthSection', () => ({ ProgramHealthSection: () => null }));

function kpi(completion?: KpiCompletion): KpiData {
  return {
    tenantId: 't1',
    generatedAt: new Date('2026-09-28T10:00:00Z').toISOString(),
    stats: {
      totalActiveUsers: 12,
      usersByRole: { MENTI: 8, MENTOR: 4 },
      matching: { activeMatches: 3, pendingOptIns: 1, rematchPriorityUsers: 0 },
      feedback: { totalFeedbackLogs: 0, avgNpsByPhase: {}, successRate: null },
      activeJobListings: 0,
      ...(completion && { completion }),
    },
  };
}

const cardOf = (label: string) => within(screen.getByTestId('kpi-completion')).getByText(label).parentElement!;

describe('KPI — tamamlama kartları (AJ-78)', () => {
  it('görünür: oranlar yüzde + pay/payda ile, tamamlanan görüşme sayı olarak', () => {
    state.data = kpi({
      registration: { completed: 9, eligible: 12, percent: 75, suppressed: false },
      disc: { completed: 4, eligible: 12, percent: 33, suppressed: false },
      completedMeetings: 17,
      minGroupSize: 3,
    });
    render(<KpiPage />);

    expect(cardOf('Kaydını Tamamlayan Üye')).toHaveTextContent('%75');
    expect(cardOf('Kaydını Tamamlayan Üye')).toHaveTextContent('9/12 mentör ve menti');
    expect(cardOf('DISC Tamamlama')).toHaveTextContent('%33');
    expect(cardOf('DISC Tamamlama')).toHaveTextContent('4/12 mentör ve menti');
    expect(cardOf('Tamamlanan Görüşme')).toHaveTextContent('17');
  });

  it('gizli: k-anonim oran "Gizli" + nedeniyle; yüzde ve pay/payda görünmez', () => {
    state.data = kpi({
      registration: { completed: 5, eligible: 5, percent: 100, suppressed: false },
      disc: { completed: 0, eligible: 0, percent: null, suppressed: true },
      completedMeetings: 0,
      minGroupSize: 3,
    });
    render(<KpiPage />);

    const disc = cardOf('DISC Tamamlama');
    expect(disc).toHaveTextContent('Gizli');
    expect(disc).toHaveTextContent('Gizlilik için en az 3 kişi gerekiyor');
    expect(disc).not.toHaveTextContent('%');
    expect(disc).not.toHaveTextContent(/\d+\/\d+/);
    expect(cardOf('Kaydını Tamamlayan Üye')).toHaveTextContent('%100');
    expect(cardOf('Tamamlanan Görüşme')).toHaveTextContent('0');
  });

  it('eski yanıt (alan yok): tamamlama kartları çizilmez', () => {
    state.data = kpi();
    render(<KpiPage />);
    expect(screen.queryByTestId('kpi-completion')).not.toBeInTheDocument();
    expect(screen.queryByText('DISC Tamamlama')).not.toBeInTheDocument();
  });
});
