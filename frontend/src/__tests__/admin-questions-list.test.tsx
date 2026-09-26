/**
 * E-3c — Soru Yönetimi: sistem / kuruma özel ayrımı ve kurum STK sorularının görünmesi.
 *
 * Eskiden GET /api/questions tenantId döndürmüyordu → DISC soruları "Kuruma Özel Sorular" altında
 * Düzenle/Sil ile görünüyordu; kurumun eklediği STK_CUSTOM sorular yanıtta yoktu → listede görünmüyordu.
 * Backend artık yöneticiye tenantId + ayrı `stkQuestions` döndürür (backend PR #135).
 * Gerçek useQuery kullanılır; yalnız API katmanı taklit edilir.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import QuestionsPage from '@/app/(admin)/admin/questions/page';

// jsdom <dialog> API'sini (showModal/close) içermez; sayfadaki ConfirmDialog mount'ta close() çağırır.
HTMLDialogElement.prototype.showModal ??= function showModal() {};
HTMLDialogElement.prototype.close ??= function close() {};

const list = vi.fn();
const stableApi = {};
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => stableApi }));
vi.mock('@/lib/api/questions', () => ({
  questionsApi: {
    list: (...args: unknown[]) => list(...args),
    listHidden: () => Promise.resolve({ ok: true, data: { items: [], total: 0 } }),
    hide: vi.fn(), unhide: vi.fn(), delete: vi.fn(), update: vi.fn(), create: vi.fn(),
  },
}));

const DISC_TEXT = 'Sistem DISC sorusu metni';
const STK_TEXT = 'Kurumun eklediği özel soru metni';
const base = { type: 'CORE' as const, order: 1, isActive: true, isRequired: true };
const discQ = { ...base, id: 'q-disc', tenantId: null, text: DISC_TEXT, discDimension: 'D' as const };
const stkQ = { ...base, id: 'q-stk', tenantId: 'tenant-a', text: STK_TEXT, discDimension: 'GENERAL' as const };

const meta = { coreCount: 0, deepeningCount: 0, coreThreshold: 0 };
const respond = (body: Record<string, unknown>) => () => Promise.resolve({ ok: true, data: { total: 0, meta, ...body } });

describe('Soru Yönetimi — sistem / kuruma özel ayrımı (E-3c)', () => {
  beforeEach(() => { list.mockReset(); });

  it('global (tenantId:null) DISC sorusu sistem bölümünde, Düzenle/Sil olmadan görünür', async () => {
    list.mockImplementation(respond({ items: [discQ], stkQuestions: [] }));
    render(<QuestionsPage />);

    expect(await screen.findByText(DISC_TEXT)).toBeInTheDocument();
    expect(screen.getByText('Sistem sorusu')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Düzenle' })).not.toBeInTheDocument();
    expect(screen.getByText(/Henüz kuruma özel soru eklemediniz/)).toBeInTheDocument();
  });

  it('kurumun STK sorusu (stkQuestions) "Kuruma Özel Sorular" altında Düzenle/Sil ile görünür', async () => {
    list.mockImplementation(respond({ items: [discQ], stkQuestions: [stkQ] }));
    render(<QuestionsPage />);

    expect(await screen.findByText(STK_TEXT)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Düzenle' })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Sil' })).toHaveLength(1);
    expect(screen.queryByText(/Henüz kuruma özel soru eklemediniz/)).not.toBeInTheDocument();
  });

  it('negatif: tenantId taşımayan (eski biçim) soru kuruma özel sayılmaz, düzenlenemez', async () => {
    const legacyQ: Record<string, unknown> = { ...discQ };
    delete legacyQ.tenantId;
    list.mockImplementation(respond({ items: [legacyQ] }));
    render(<QuestionsPage />);

    expect(await screen.findByText(DISC_TEXT)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Düzenle' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Sil' })).not.toBeInTheDocument();
  });
});
