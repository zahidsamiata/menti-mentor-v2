/**
 * PS-05 — Yöneticinin KPI ekranında "3. ay başarı oranı" boşken nedeni yazıyor.
 *
 * Backend (V-05 k-anonimlik): 3'ten az yanıtlı dönemde ortalama null, yanıt sayısı 0 döner;
 * successRate = 3. dönem ortalaması → yeterli yanıt yoksa null. Ekran sessiz "—" göstermemeli.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import KpiPage from '@/app/(admin)/admin/kpi/page';
import type { KpiData } from '@/types/admin';

const state: { data: KpiData | null } = { data: null };

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ data: state.data, isLoading: false, error: null, refetch: vi.fn() }),
}));
vi.mock('@/lib/api/admin', () => ({ adminApi: { getKpi: vi.fn() } }));
vi.mock('@/components/organisms/ProgramHealthSection', () => ({ ProgramHealthSection: () => null }));

function kpi(feedback: KpiData['stats']['feedback']): KpiData {
  return {
    tenantId: 't1',
    generatedAt: new Date('2026-09-25T10:00:00Z').toISOString(),
    stats: {
      totalActiveUsers: 12,
      usersByRole: { MENTI: 8, MENTOR: 4 },
      matching: { activeMatches: 3, pendingOptIns: 1, rematchPriorityUsers: 0 },
      feedback,
      activeJobListings: 0,
    },
  };
}

describe('KPI başarı oranı boş durumu (PS-05)', () => {
  it('successRate null → nedeni anlatan metin görünür, yalnız "—" kalmaz', () => {
    state.data = kpi({
      totalFeedbackLogs: 2,
      avgNpsByPhase: { phase3: { avgNps: null, sampleSize: 0 } },
      successRate: null,
    });
    render(<KpiPage />);
    const empty = screen.getByTestId('kpi-success-rate-empty');
    expect(empty).toHaveTextContent(/yeterli 3\. ay değerlendirmesi yok/);
    expect(empty).toHaveTextContent(/en az 3 yanıt/);
    // Dönem satırı da aynı mantıkla açıklanır; sessiz tire ve yanıltıcı "0 kayıt" yok.
    expect(screen.getByText(/Yeterli yanıt yok \(gizlilik için en az 3 yanıt gerekiyor\)/)).toBeInTheDocument();
    expect(screen.queryByText('—')).not.toBeInTheDocument();
    expect(screen.queryByText(/0 kayıt/)).not.toBeInTheDocument();
    expect(screen.queryByText(/3\. ay başarı:/)).not.toBeInTheDocument();
  });

  it('hiç dönem verisi yokken de başarı oranı boşluğu açıklanır', () => {
    state.data = kpi({ totalFeedbackLogs: 0, avgNpsByPhase: {}, successRate: null });
    render(<KpiPage />);
    expect(screen.getByTestId('kpi-success-rate-empty')).toBeInTheDocument();
    expect(screen.queryByText('—')).not.toBeInTheDocument();
  });

  it('değer varken sayı görünür, boş-durum metni görünmez', () => {
    state.data = kpi({
      totalFeedbackLogs: 9,
      avgNpsByPhase: {
        phase1: { avgNps: 7, sampleSize: 5 },
        phase3: { avgNps: 8, sampleSize: 4 },
      },
      successRate: 8,
    });
    render(<KpiPage />);
    expect(screen.getByText(/3\. ay başarı: 8/)).toBeInTheDocument();
    expect(screen.getByText('(4 kayıt)')).toBeInTheDocument();
    expect(screen.getByText('(5 kayıt)')).toBeInTheDocument();
    expect(screen.queryByTestId('kpi-success-rate-empty')).not.toBeInTheDocument();
    expect(screen.queryByText(/Yeterli yanıt yok/)).not.toBeInTheDocument();
  });
});
