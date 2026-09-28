/**
 * AJ-83 — Mesajlar gelen kutusu sayfalama.
 *
 * Sunucu `/api/conversations` yanıtını sayfalar (varsayılan 30, en çok 100 — backend
 * `conversationController.ts` F-27) ve `{ items, total, limit, offset }` döner. Eskiden ön yüz
 * yalnız ilk sayfayı gösteriyordu; 30'dan fazla konuşması olan kullanıcı eskilerine ulaşamıyordu.
 * `items.length < total` iken "Daha fazla göster" sonraki sayfayı (offset = mevcut uzunluk) ekler.
 * Gerçek useQuery kullanılır; yalnız API katmanı taklit edilir.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MessagesInboxPage from '@/app/(dashboard)/messages/page';
import type { ConversationListItem } from '@/lib/api/conversations';

const list = vi.fn();
const stableApi = {};
const stableUser = { id: 'u1', role: 'MENTI', tenantId: 't1', fullName: 'Menti', email: 'menti@example.com' };

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => stableApi }));
vi.mock('@/providers/AuthProvider', () => ({ useAuth: () => ({ user: stableUser, isLoading: false }) }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ replace: vi.fn(), push: vi.fn() }) }));
vi.mock('@/lib/api/conversations', () => ({
  conversationsApi: { list: (...args: unknown[]) => list(...args) },
}));

const PAGE = 30;

function convo(n: number): ConversationListItem {
  return {
    id: `c${n}`,
    counterpart: { id: `m${n}`, fullName: `Kişi ${n}`, avatarUrl: null, role: 'MENTOR' },
    lastMessagePreview: `Önizleme ${n}`,
    // Yeniden eskiye: n büyüdükçe daha eski.
    lastMessageAt: new Date(Date.UTC(2026, 8, 1) - n * 60_000).toISOString(),
    unread: 0,
  };
}

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => convo(from + i));

const ok = (items: ConversationListItem[], total: number, offset = 0) =>
  Promise.resolve({ ok: true, data: { items, total, limit: PAGE, offset } });

describe('Mesajlar gelen kutusu sayfalama (AJ-83)', () => {
  beforeEach(() => { list.mockReset(); });

  it('toplam 31 iken "Daha fazla göster" görünür; tıklayınca offset=30 istenir ve 31. konuşma listelenir', async () => {
    list
      .mockImplementationOnce(() => ok(range(1, PAGE), 31))
      .mockImplementationOnce(() => ok([convo(31)], 31, PAGE));
    const user = userEvent.setup();
    render(<MessagesInboxPage />);

    expect(await screen.findByText('Önizleme 1')).toBeInTheDocument();
    expect(screen.queryByText('Önizleme 31')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Daha fazla göster' }));

    expect(await screen.findByText('Önizleme 31')).toBeInTheDocument();
    expect(list).toHaveBeenLastCalledWith(stableApi, { offset: PAGE });
    // Sıra korunur, tekrar yok: 31 bağlantı, sonuncusu 31. konuşma.
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(31);
    expect(links[0]).toHaveAttribute('href', '/messages/c1');
    expect(links[30]).toHaveAttribute('href', '/messages/c31');
    // Hepsi yüklendi → düğme kaybolur.
    expect(screen.queryByRole('button', { name: 'Daha fazla göster' })).not.toBeInTheDocument();
  });

  it('sayfa sınırında kayma olursa aynı konuşma iki kez listelenmez', async () => {
    // Arada yeni mesaj geldi: c30 ikinci sayfanın başına kaydı.
    list
      .mockImplementationOnce(() => ok(range(1, PAGE), 31))
      .mockImplementationOnce(() => ok([convo(30), convo(31)], 31, PAGE));
    const user = userEvent.setup();
    render(<MessagesInboxPage />);

    await screen.findByText('Önizleme 1');
    await user.click(screen.getByRole('button', { name: 'Daha fazla göster' }));
    await screen.findByText('Önizleme 31');

    expect(screen.getAllByText('Önizleme 30')).toHaveLength(1);
    expect(screen.getAllByRole('link')).toHaveLength(31);
  });

  it('negatif: toplam sayfa boyutunu aşmıyorsa düğme yok', async () => {
    list.mockImplementation(() => ok(range(1, PAGE), PAGE));
    render(<MessagesInboxPage />);
    expect(await screen.findByText(`Önizleme ${PAGE}`)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Daha fazla göster' })).not.toBeInTheDocument();
    expect(list).toHaveBeenCalledTimes(1);
  });

  it('sonraki sayfa hatasında mevcut konuşmalar kalır, Türkçe hata görünür, düğme tekrar denenebilir', async () => {
    list
      .mockImplementationOnce(() => ok(range(1, PAGE), 40))
      .mockImplementationOnce(() => Promise.resolve({ ok: false, error: { message: 'boom' } }));
    const user = userEvent.setup();
    render(<MessagesInboxPage />);

    await screen.findByText('Önizleme 1');
    await user.click(screen.getByRole('button', { name: 'Daha fazla göster' }));

    expect(await screen.findByText(/Daha fazla konuşma yüklenemedi/)).toBeInTheDocument();
    expect(screen.getByText('Önizleme 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Daha fazla göster' })).toBeEnabled();
  });

  it('ilk sayfa yüklenemezse "henüz mesajınız yok" yerine Türkçe hata görünür', async () => {
    list.mockImplementation(() => Promise.resolve({ ok: false, error: { message: 'boom' } }));
    render(<MessagesInboxPage />);
    expect(await screen.findByText(/Konuşmalar yüklenemedi/)).toBeInTheDocument();
    expect(screen.queryByText('Henüz mesajınız yok')).not.toBeInTheDocument();
  });
});
