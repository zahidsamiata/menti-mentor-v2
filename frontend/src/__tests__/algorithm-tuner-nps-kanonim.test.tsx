/**
 * AJ-69 — Algoritma ayar ekranı, yanıt sayısı k-anonimlik eşiğinin altındaki NPS ortalamasını
 * GÖSTERMEZ; "gizli (<3 yanıt …)" yazar. Backend bu durumda avgNps=null, sampleSize=0,
 * suppressed=true, minSampleSize=3 döner (backend/src/services/mask.ts maskNpsSample).
 * Gerçek useQuery kullanılır; yalnız API katmanı taklit edilir (algorithm-tuner-frequency-load deseni).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import AlgorithmTunerPage from '@/app/(admin)/admin/algorithm-tuner/page';
import { clearQueryCache } from '@/lib/queryCache';
import type { NpsSample, PendingAdjustment } from '@/lib/api/algorithmTuner';

// jsdom <dialog> API'sini (showModal/close) içermez; sayfadaki ConfirmDialog mount'ta close() çağırır.
HTMLDialogElement.prototype.showModal ??= function showModal() {};
HTMLDialogElement.prototype.close ??= function close() {};

const stableApi = {};
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => stableApi }));
vi.mock('@/providers/AuthProvider', () => ({ useAuth: () => ({ user: { tenantId: 'tenant-a' } }) }));

const getPending = vi.fn();
vi.mock('@/lib/api/algorithmTuner', () => ({
  algorithmTunerApi: {
    getPending: (...args: unknown[]) => getPending(...args),
    getWeights: () => Promise.resolve({ ok: true, data: { weights: null, lastChange: null } }),
    setWeights: vi.fn(), approve: vi.fn(), reject: vi.fn(), updateFrequency: vi.fn(),
  },
}));

const weights = { sectorWeight: 0.6, discWeight: 0.4, lastAdjustedAt: '2026-09-01T00:00:00.000Z', reason: '' };
const HIDDEN: NpsSample = { avgNps: null, sampleSize: 0, suppressed: true, minSampleSize: 3 };

function pendingWith(phase1Nps: NpsSample): PendingAdjustment {
  return {
    tenantId: 'tenant-a',
    previousWeights: weights,
    newWeights: { ...weights, sectorWeight: 0.55, discWeight: 0.45 },
    phase1Nps,
    phase3Nps: { avgNps: 5.5, sampleSize: 12, suppressed: false, minSampleSize: 3 },
    adjusted: true,
    reason: '1. aydan 3. aya NPS düşüşü (3. ay ortalama 5.5/10) — DISC ağırlığı +5%',
    proposedAt: '2026-09-02T00:00:00.000Z',
  };
}

async function phase1Tile() {
  const label = await screen.findByText('1. Ay NPS');
  return label.parentElement as HTMLElement;
}

describe('AJ-69: küçük örnekte 1. ay NPS ortalaması ekranda yok', () => {
  beforeEach(() => {
    clearQueryCache();
    getPending.mockReset();
  });

  it('gizli örnek → "gizli" ve eşik metni görünür, sayı ve yanıt adedi görünmez', async () => {
    getPending.mockResolvedValue({ ok: true, data: { pending: pendingWith(HIDDEN) } });
    render(<AlgorithmTunerPage />);

    const tile = await phase1Tile();
    expect(within(tile).getByText('gizli')).toBeInTheDocument();
    expect(within(tile).getByText(/<3 yanıt/)).toBeInTheDocument();
    // Başlıktaki "1." ve eşikteki "<3" dışında kutuda HİÇ rakam yok (ne ortalama ne yanıt adedi).
    expect(tile.textContent!.replace('1. Ay NPS', '').replace('<3', '')).not.toMatch(/\d/);
    expect(within(tile).queryByText('—')).toBeNull();
    // 3. ay (eşik üstü) normal gösterilir.
    const tile3 = screen.getByText('3. Ay NPS').parentElement as HTMLElement;
    expect(within(tile3).getByText('5.5')).toBeInTheDocument();
    expect(within(tile3).getByText('12 yanıt')).toBeInTheDocument();
  });

  it('eşik üstü örnek → ortalama ve yanıt adedi görünür, "gizli" yok', async () => {
    getPending.mockResolvedValue({
      ok: true,
      data: { pending: pendingWith({ avgNps: 8.2, sampleSize: 3, suppressed: false, minSampleSize: 3 }) },
    });
    render(<AlgorithmTunerPage />);

    const tile = await phase1Tile();
    expect(within(tile).getByText('8.2')).toBeInTheDocument();
    expect(within(tile).getByText('3 yanıt')).toBeInTheDocument();
    expect(within(tile).queryByText('gizli')).toBeNull();
  });
});
