/**
 * U-18 — mentörün bir mesaj talebini (konuşmayı) nazikçe reddedebilmesi.
 *
 * KARAR-22 B + KARAR-80/M1: ret sebebi menti'ye ASLA gösterilmez; yalnız jenerik
 * teselli metni + bildirim gider. "Alternatif mentör" akışı (I-16 orijinali) BİLİNÇLİ
 * olarak yok — bu testler o metnin GÖRÜNMEDİĞİNİ de doğrular.
 */
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ConversationThreadPage from '@/app/(dashboard)/messages/[id]/page';

// Sayfa her zaman bir <ConfirmDialog> (native <dialog>) mount ediyor; jsdom showModal/close
// metodlarını tanımlamaz — polyfill (bkz. meetings-location.test.tsx / critical-flows.test.tsx).
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close     = vi.fn();
  // jsdom scrollIntoView'ı tanımlamaz; sayfa yeni mesaj gelince en alta kaydırmayı dener.
  Element.prototype.scrollIntoView = vi.fn();
});

const replaceMock = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: replaceMock, push: vi.fn() }),
  useParams: () => ({ id: 'convo-1' }),
}));

const authMock: { user: { id: string; role: string } | null } = {
  user: { id: 'mentor-1', role: 'MENTOR' },
};
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: authMock.user, isLoading: false }),
}));

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));

const rejectMock = vi.fn();
const sendMock = vi.fn();
const markReadMock = vi.fn().mockResolvedValue({ ok: true, data: { ok: true, readAt: '2026-01-01' } });
vi.mock('@/lib/api/conversations', () => ({
  conversationsApi: {
    reject: (...args: unknown[]) => rejectMock(...args),
    send: (...args: unknown[]) => sendMock(...args),
    markRead: (...args: unknown[]) => markReadMock(...args),
  },
}));

const threadMock = {
  data: undefined as unknown,
};
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ data: threadMock.data, isLoading: false, error: null, refetch: vi.fn() }),
}));

const counterpart = { id: 'menti-1', fullName: 'Menti Bir', avatarUrl: null, role: 'MENTI' as const };
const mentorObj = { id: 'mentor-1', fullName: 'Mentör Bir', avatarUrl: null, role: 'MENTOR' as const };

function baseThread(rejectedAt: string | null) {
  return {
    id: 'convo-1',
    mentor: mentorObj,
    menti: counterpart,
    counterpart,
    rejectedAt,
    messages: [{ id: 'm1', senderUserId: 'menti-1', content: 'Merhaba', createdAt: '2026-01-01T00:00:00.000Z' }],
  };
}

describe('U-18 — mentör tarafı: Reddet butonu + ConfirmDialog', () => {
  beforeEach(() => {
    rejectMock.mockReset();
    sendMock.mockReset();
    authMock.user = { id: 'mentor-1', role: 'MENTOR' };
  });

  it('mentör, reddedilmemiş bir konuşmada "Reddet" butonunu görür', () => {
    threadMock.data = baseThread(null);
    render(<ConversationThreadPage />);
    expect(screen.getByRole('button', { name: 'Reddet' })).toBeInTheDocument();
  });

  it('"Reddet" tıklanınca ConfirmDialog açılır (alternatif mentör metni YOK), onaylayınca reject API çağrılır', async () => {
    threadMock.data = baseThread(null);
    rejectMock.mockResolvedValueOnce({ ok: true, data: { conversation: { id: 'convo-1', rejectedAt: '2026-01-02T00:00:00.000Z' } } });
    render(<ConversationThreadPage />);

    fireEvent.click(screen.getByRole('button', { name: 'Reddet' }));
    expect(screen.getByText(/Reddetmek normaldir/i)).toBeInTheDocument();
    expect(screen.getByText(/Sebebini yazman gerekmez/i)).toBeInTheDocument();
    // KARAR-22 B: "alternatif mentör" önerisi/havuza dön akışı burada YOK.
    expect(screen.queryByText(/havuza dön/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sana uygun/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Evet, reddet'));
    await waitFor(() => expect(rejectMock).toHaveBeenCalledWith({}, 'convo-1'));
  });

  it('zaten reddedilmiş bir konuşmada "Reddet" butonu artık YOK', () => {
    threadMock.data = baseThread('2026-01-02T00:00:00.000Z');
    render(<ConversationThreadPage />);
    expect(screen.queryByRole('button', { name: 'Reddet' })).not.toBeInTheDocument();
  });
});

describe('U-18 — menti tarafı: reddedilince mesaj kutusu kapanır, ret metni görünür', () => {
  beforeEach(() => {
    rejectMock.mockReset();
    sendMock.mockReset();
    authMock.user = { id: 'menti-1', role: 'MENTI' };
  });

  it('rejectedAt boşken mesaj kutusu görünür, ret metni YOK', () => {
    threadMock.data = baseThread(null);
    render(<ConversationThreadPage />);
    expect(document.querySelector('textarea')).toBeInTheDocument();
    expect(screen.queryByText(/Bu eşleşme gerçekleşmedi/i)).not.toBeInTheDocument();
  });

  it('rejectedAt doluyken mesaj kutusu YOK, ret metni GÖRÜNÜR (alternatif mentör önerisi YOK)', () => {
    threadMock.data = baseThread('2026-01-02T00:00:00.000Z');
    render(<ConversationThreadPage />);
    expect(document.querySelector('textarea')).not.toBeInTheDocument();
    expect(screen.getByText(/Bu eşleşme gerçekleşmedi/i)).toBeInTheDocument();
    expect(screen.getByText(/Bu senin profilinle ilgili değil/i)).toBeInTheDocument();
    expect(screen.queryByText(/havuza dön/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sana uygun/i)).not.toBeInTheDocument();
    // Menti "Reddet" butonunu asla görmez.
    expect(screen.queryByRole('button', { name: 'Reddet' })).not.toBeInTheDocument();
  });

  it('geçmiş mesaj geçmişi reddedilse dahi salt-okunur görünür kalır', () => {
    threadMock.data = baseThread('2026-01-02T00:00:00.000Z');
    render(<ConversationThreadPage />);
    expect(screen.getByText('Merhaba')).toBeInTheDocument();
  });
});
