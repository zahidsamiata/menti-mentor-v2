/**
 * E-3b — Soru Yönetimi: gizlenen soruları geri açma.
 *
 * GET /api/questions gizlenen soruları listeden çıkarır; yönetici onları ancak "Gizlenen Sorular"
 * bölümünde (GET /api/questions/hidden) görür ve "Tekrar göster" ile geri açar (DELETE /:id/hide).
 * Gerçek useQuery kullanılır; yalnız API katmanı taklit edilir.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionsPage from '@/app/(admin)/admin/questions/page';

// jsdom <dialog> API'sini (showModal/close) içermez; sayfadaki ConfirmDialog mount'ta close() çağırır.
HTMLDialogElement.prototype.showModal ??= function showModal() {};
HTMLDialogElement.prototype.close ??= function close() {};

const list = vi.fn();
const listHidden = vi.fn();
const unhide = vi.fn();
const stableApi = {};
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => stableApi }));
vi.mock('@/lib/api/questions', () => ({
  questionsApi: {
    list: (...args: unknown[]) => list(...args),
    listHidden: (...args: unknown[]) => listHidden(...args),
    unhide: (...args: unknown[]) => unhide(...args),
    hide: vi.fn(), delete: vi.fn(), update: vi.fn(), create: vi.fn(),
  },
}));

const HIDDEN_TEXT = 'Gizlenmiş örnek soru metni';
const hiddenQ = {
  id: 'q-hidden', tenantId: null, text: HIDDEN_TEXT, type: 'CORE' as const,
  discDimension: 'GENERAL' as const, order: 1, hiddenAt: '2026-09-01T10:00:00Z',
};
const asVisible = { ...hiddenQ, isActive: true, isRequired: true };

const ok = <T,>(data: T) => Promise.resolve({ ok: true, data });
const listOf = (items: unknown[]) => ok({ items, total: items.length, meta: { coreCount: 0, deepeningCount: 0, coreThreshold: 0 } });

describe('Soru Yönetimi — Gizlenen Sorular (E-3b)', () => {
  beforeEach(() => { list.mockReset(); listHidden.mockReset(); unhide.mockReset(); });

  it('gizlenen soru "Gizlenen Sorular" bölümünde listelenir', async () => {
    list.mockImplementation(() => listOf([]));
    listHidden.mockImplementation(() => ok({ items: [hiddenQ], total: 1 }));
    render(<QuestionsPage />);

    expect(await screen.findByText('Gizlenen Sorular')).toBeInTheDocument();
    expect(screen.getByText(HIDDEN_TEXT)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tekrar göster' })).toBeInTheDocument();
  });

  it('"Tekrar göster" unhide çağırır; soru gizlenenlerden çıkar ve soru listesine döner', async () => {
    list
      .mockImplementationOnce(() => listOf([]))
      .mockImplementation(() => listOf([asVisible]));
    listHidden
      .mockImplementationOnce(() => ok({ items: [hiddenQ], total: 1 }))
      .mockImplementation(() => ok({ items: [], total: 0 }));
    unhide.mockImplementation(() => Promise.resolve({ ok: true, data: null }));
    const user = userEvent.setup();
    render(<QuestionsPage />);

    await user.click(await screen.findByRole('button', { name: 'Tekrar göster' }));

    expect(unhide).toHaveBeenCalledWith(stableApi, 'q-hidden');
    await waitFor(() => expect(screen.queryByText('Gizlenen Sorular')).not.toBeInTheDocument());
    // Soru tekrar ana listede (gizli bölümün dışında) görünür.
    expect(await screen.findByText(HIDDEN_TEXT)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Tekrar göster' })).not.toBeInTheDocument();
  });

  it('negatif: gizlenen soru yoksa bölüm hiç görünmez', async () => {
    list.mockImplementation(() => listOf([]));
    listHidden.mockImplementation(() => ok({ items: [], total: 0 }));
    render(<QuestionsPage />);

    expect(await screen.findByText('Soru Yönetimi')).toBeInTheDocument();
    await waitFor(() => expect(listHidden).toHaveBeenCalled());
    expect(screen.queryByText('Gizlenen Sorular')).not.toBeInTheDocument();
  });

  it('negatif: geri açma başarısızsa Türkçe hata görünür, soru gizli bölümde kalır', async () => {
    list.mockImplementation(() => listOf([]));
    listHidden.mockImplementation(() => ok({ items: [hiddenQ], total: 1 }));
    unhide.mockImplementation(() => Promise.resolve({ ok: false, error: {} }));
    const user = userEvent.setup();
    render(<QuestionsPage />);

    await user.click(await screen.findByRole('button', { name: 'Tekrar göster' }));

    expect(await screen.findByText('Soru tekrar gösterilemedi.')).toBeInTheDocument();
    expect(screen.getByText(HIDDEN_TEXT)).toBeInTheDocument();
  });

  it('negatif: gizlenenler listesi yüklenemezse Türkçe hata görünür, sayfa bozulmaz', async () => {
    list.mockImplementation(() => listOf([]));
    listHidden.mockImplementation(() => Promise.resolve({ ok: false, error: { message: 'boom' } }));
    render(<QuestionsPage />);

    expect(await screen.findByText(/Gizlenen sorular yüklenemedi/)).toBeInTheDocument();
    expect(screen.getByText('Kuruma Özel Sorular')).toBeInTheDocument();
  });
});
