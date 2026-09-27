/**
 * AJ-48 — Algoritma ayar ekranı kurumun KAYITLI rapor sıklığını seçili gösterir.
 *
 * Eskiden sıklık her açılışta `useState('WEEKLY')` ile başlıyordu; kayıtlı değer yüklenmiyordu
 * (kayıt çalışıyordu, gösterim yanlıştı). Artık GET /api/admin/algorithm-tuner/weights yanıtındaki
 * `reportingFrequency` seçili seçenek olur. Gerçek useQuery kullanılır; yalnız API katmanı taklit edilir.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import AlgorithmTunerPage from '@/app/(admin)/admin/algorithm-tuner/page';
import { clearQueryCache } from '@/lib/queryCache';

// jsdom <dialog> API'sini (showModal/close) içermez; sayfadaki ConfirmDialog mount'ta close() çağırır.
HTMLDialogElement.prototype.showModal ??= function showModal() {};
HTMLDialogElement.prototype.close ??= function close() {};

const stableApi = {};
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => stableApi }));
vi.mock('@/providers/AuthProvider', () => ({ useAuth: () => ({ user: { tenantId: 'tenant-a' } }) }));

const getWeights = vi.fn();
const updateFrequency = vi.fn();
vi.mock('@/lib/api/algorithmTuner', () => ({
  algorithmTunerApi: {
    getPending: () => Promise.resolve({ ok: true, data: { pending: null } }),
    getWeights: (...args: unknown[]) => getWeights(...args),
    setWeights: vi.fn(), approve: vi.fn(), reject: vi.fn(),
    updateFrequency: (...args: unknown[]) => updateFrequency(...args),
  },
}));

const weights = { sectorWeight: 0.6, discWeight: 0.4, lastAdjustedAt: '2026-09-01T00:00:00.000Z', reason: '' };
const respondWith = (reportingFrequency?: string) => () =>
  Promise.resolve({ ok: true, data: { weights, lastChange: null, reportingFrequency } });

const option = (label: string) => screen.getByRole('button', { name: new RegExp(label) });

describe('AJ-48: rapor sıklığı kayıtlı değerle yüklenir', () => {
  beforeEach(() => {
    clearQueryCache();
    getWeights.mockReset();
    updateFrequency.mockReset();
  });

  it('kayıtlı MONTHLY ise ekran "Aylık" seçeneğini seçili gösterir (Haftalık değil)', async () => {
    getWeights.mockImplementation(respondWith('MONTHLY'));
    render(<AlgorithmTunerPage />);

    await waitFor(() => expect(option('Aylık')).toHaveAttribute('aria-pressed', 'true'));
    expect(option('Haftalık')).toHaveAttribute('aria-pressed', 'false');
    expect(option('2 Haftada 1')).toHaveAttribute('aria-pressed', 'false');
  });

  it('kayıtlı MONTHLY iken doğrudan Kaydet → MONTHLY gönderilir (varsayılan WEEKLY ile ezilmez)', async () => {
    getWeights.mockImplementation(respondWith('MONTHLY'));
    updateFrequency.mockResolvedValue({ ok: true, data: { message: 'ok' } });
    render(<AlgorithmTunerPage />);

    await waitFor(() => expect(option('Aylık')).toHaveAttribute('aria-pressed', 'true'));
    fireEvent.click(screen.getAllByRole('button', { name: 'Kaydet' }).at(-1)!);
    await waitFor(() => expect(updateFrequency).toHaveBeenCalledWith(stableApi, 'tenant-a', 'MONTHLY'));
  });

  it('alan yoksa (eski yanıt) Haftalık varsayılanı seçili kalır; kullanıcı seçimi kayıtlı değeri ezer', async () => {
    getWeights.mockImplementation(respondWith(undefined));
    render(<AlgorithmTunerPage />);

    await waitFor(() => expect(getWeights).toHaveBeenCalled());
    expect(option('Haftalık')).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(option('2 Haftada 1'));
    expect(option('2 Haftada 1')).toHaveAttribute('aria-pressed', 'true');
    expect(option('Haftalık')).toHaveAttribute('aria-pressed', 'false');
  });
});
