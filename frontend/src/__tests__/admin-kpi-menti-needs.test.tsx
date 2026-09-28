/**
 * AJ-89 — KPI panelinde mentilerin S1 ihtiyaç dağılımı kartı (yalnız toplu, §10.3).
 *
 * Gizleme backend'de (k-anonimlik); kart gelen durumu doğru anlatmalı:
 * - dağılım gizliyse (cevaplayan < eşik) hiçbir seçenek satırı/oranı yok, nedeni yazılı;
 * - eşik altı hücre "gizli" diye görünür (sessiz 0 yok), eşik üstü yüzde + kişi sayısı;
 * - seçenek metinleri onboarding sorusundaki metinlerle aynı (`MENTI_S1`);
 * - alan yoksa (eski yanıt) kart hiç çizilmez.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import KpiPage from '@/app/(admin)/admin/kpi/page';
import { MENTI_S1 } from '@/lib/threeQuestionsText';
import type { KpiData, MentiNeedsDistribution } from '@/types/admin';

const state: { data: KpiData | null } = { data: null };

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ data: state.data, isLoading: false, error: null, refetch: vi.fn() }),
}));
vi.mock('@/lib/api/admin', () => ({ adminApi: { getKpi: vi.fn() } }));
vi.mock('@/components/organisms/ProgramHealthSection', () => ({ ProgramHealthSection: () => null }));

function kpi(mentiNeeds?: MentiNeedsDistribution): KpiData {
  return {
    tenantId: 't1',
    generatedAt: new Date('2026-09-28T10:00:00Z').toISOString(),
    stats: {
      totalActiveUsers: 12,
      usersByRole: { MENTI: 8, MENTOR: 4 },
      matching: { activeMatches: 3, pendingOptIns: 1, rematchPriorityUsers: 0 },
      feedback: { totalFeedbackLogs: 0, avgNpsByPhase: {}, successRate: null },
      activeJobListings: 0,
      ...(mentiNeeds && { mentiNeeds }),
    },
  };
}

const label = (value: string) => MENTI_S1.options.find((o) => o.value === value)!.label;

describe('KPI — mentilerin ihtiyaç dağılımı kartı (AJ-89)', () => {
  it('görünür: eşik üstü seçenek yüzde + kişi sayısıyla, eşik altı seçenek "gizli"', () => {
    state.data = kpi({
      respondentCount: 4,
      suppressed: false,
      minGroupSize: 3,
      options: [
        { need: 'KARAR_VEREMIYORUM', count: 3, percent: 75, suppressed: false },
        { need: 'GUVENMIYORUM', count: 0, percent: null, suppressed: true },
      ],
    });
    render(<KpiPage />);
    const card = screen.getByTestId('kpi-menti-needs');

    expect(within(card).getByText(MENTI_S1.prompt, { exact: false })).toBeInTheDocument();
    const shown = within(card).getByText(label('KARAR_VEREMIYORUM')).parentElement!;
    expect(shown).toHaveTextContent('%75');
    expect(shown).toHaveTextContent('(3 kişi)');
    const hidden = within(card).getByText(label('GUVENMIYORUM')).parentElement!;
    expect(hidden).toHaveTextContent('gizli (<3 kişi)');
    expect(hidden).not.toHaveTextContent('%');
    expect(within(card).getByText(/4 menti cevapladı/)).toBeInTheDocument();
    expect(within(card).queryByTestId('kpi-menti-needs-hidden')).not.toBeInTheDocument();
  });

  it('gizli: cevaplayan eşik altındaysa hiçbir seçenek ve oran görünmez, nedeni yazılı', () => {
    state.data = kpi({ respondentCount: 0, suppressed: true, minGroupSize: 3, options: [] });
    render(<KpiPage />);
    const card = screen.getByTestId('kpi-menti-needs');

    expect(within(card).getByTestId('kpi-menti-needs-hidden')).toHaveTextContent(
      'Yeterli cevap yok (gizlilik için en az 3 menti cevabı gerekiyor).',
    );
    for (const o of MENTI_S1.options) expect(within(card).queryByText(o.label)).not.toBeInTheDocument();
    expect(within(card).queryByText(/%/)).not.toBeInTheDocument();
    expect(within(card).queryByText(/menti cevapladı/)).not.toBeInTheDocument();
  });

  it('eski yanıtta alan yoksa kart çizilmez', () => {
    state.data = kpi();
    render(<KpiPage />);
    expect(screen.queryByTestId('kpi-menti-needs')).not.toBeInTheDocument();
  });
});
