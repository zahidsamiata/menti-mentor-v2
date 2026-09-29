/**
 * AN-27 — "Zaman önerisi" mesajı (KARAR-53 CEVAP ②④).
 * Mentör sohbette zaman önerisini sıradan mesajdan AYIRT eder (ayrı kart: başlık + tarih/saat + gerekçe);
 * "Zaman öner" düğmesi yalnız konuşmanın menti tarafında görünür; form geçmiş tarihi göndermez.
 * Gerçek useQuery; yalnız API katmanı taklit edilir.
 */
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConversationThreadPage from '@/app/(dashboard)/messages/[id]/page';
import type { ConversationThread } from '@/lib/api/conversations';
import { formatProposalTime, toLocalInputValue, validateTimeProposal, TIME_PROPOSAL_TEXT } from '@/lib/timeProposal';

const thread = vi.fn();
const markRead = vi.fn();
const proposeTime = vi.fn();
const stableApi = {};
const authState: { user: { id: string; role: string; tenantId: string; fullName: string; email: string } } = {
  user: { id: 'mentor1', role: 'MENTOR', tenantId: 't1', fullName: 'Mentör', email: 'm@example.com' },
};

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => stableApi }));
vi.mock('@/providers/AuthProvider', () => ({ useAuth: () => ({ user: authState.user, isLoading: false }) }));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
  useParams: () => ({ id: 'c1' }),
}));
vi.mock('@/lib/api/conversations', () => ({
  conversationsApi: {
    thread: (...a: unknown[]) => thread(...a),
    markRead: (...a: unknown[]) => markRead(...a),
    proposeTime: (...a: unknown[]) => proposeTime(...a),
    send: vi.fn(),
  },
}));

const PROPOSED = '2031-03-14T11:30:00.000Z';
const REASON = 'Kariyer geçişim hakkında konuşmak istiyorum.';

function makeThread(): ConversationThread {
  return {
    id: 'c1',
    mentor: { id: 'mentor1', fullName: 'Mentör', avatarUrl: null, role: 'MENTOR' },
    menti: { id: 'menti1', fullName: 'Menti', avatarUrl: null, role: 'MENTI' },
    counterpart: null,
    messages: [
      { id: 'm1', senderUserId: 'menti1', content: 'Merhaba, tanışmak isterim.', kind: null, proposedStartAt: null, createdAt: '2031-03-01T10:00:00.000Z' },
      { id: 'm2', senderUserId: 'menti1', content: REASON, kind: 'TIME_PROPOSAL', proposedStartAt: PROPOSED, createdAt: '2031-03-01T10:05:00.000Z' },
    ],
  };
}

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

describe('AN-27 · zaman önerisi mesajı', () => {
  beforeEach(() => {
    thread.mockReset().mockResolvedValue({ ok: true, data: makeThread() });
    markRead.mockReset().mockResolvedValue({ ok: true, data: { ok: true, readAt: '' } });
    proposeTime.mockReset();
  });

  it('mentör görünümü: zaman önerisi ayrı kartta (başlık + tarih/saat + gerekçe); sıradan mesaj kartta DEĞİL', async () => {
    authState.user = { id: 'mentor1', role: 'MENTOR', tenantId: 't1', fullName: 'Mentör', email: 'm@example.com' };
    render(<ConversationThreadPage />);

    const cards = await screen.findAllByRole('article', { name: 'Zaman önerisi' });
    expect(cards).toHaveLength(1);
    const card = cards[0]!;
    expect(within(card).getByText(formatProposalTime(PROPOSED))).toBeInTheDocument();
    expect(within(card).getByText(REASON)).toBeInTheDocument();

    const normal = screen.getByText('Merhaba, tanışmak isterim.');
    expect(normal.closest('article')).toBeNull();

    // Mentör zaman öneremez → düğme yok.
    expect(screen.queryByRole('button', { name: /Zaman öner/ })).not.toBeInTheDocument();
  });

  it('menti görünümü: "Zaman öner" formu geçmiş tarihi göndermez; geçerli öneriyi mesaj ucuna gönderir', async () => {
    authState.user = { id: 'menti1', role: 'MENTI', tenantId: 't1', fullName: 'Menti', email: 'x@example.com' };
    proposeTime.mockResolvedValue({ ok: true, data: { message: {} } });
    const u = userEvent.setup();
    render(<ConversationThreadPage />);

    await u.click(await screen.findByRole('button', { name: /Zaman öner/ }));
    await u.type(screen.getByLabelText(TIME_PROPOSAL_TEXT.reasonLabel), REASON);

    const past = toLocalInputValue(new Date(Date.now() - 24 * 60 * 60 * 1000));
    const dateInput = screen.getByLabelText(TIME_PROPOSAL_TEXT.dateLabel);
    fireEvent.change(dateInput, { target: { value: past } });
    await u.click(screen.getByRole('button', { name: TIME_PROPOSAL_TEXT.submit }));
    expect(await screen.findByRole('alert')).toHaveTextContent(TIME_PROPOSAL_TEXT.errDatePast);
    expect(proposeTime).not.toHaveBeenCalled();

    const future = toLocalInputValue(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));
    fireEvent.change(dateInput, { target: { value: future } });
    await u.click(screen.getByRole('button', { name: TIME_PROPOSAL_TEXT.submit }));
    expect(proposeTime).toHaveBeenCalledTimes(1);
    expect(proposeTime).toHaveBeenCalledWith(stableApi, 'c1', {
      reason: REASON,
      proposedStartAt: new Date(future).toISOString(),
    });
  });
});

describe('AN-27 · validateTimeProposal', () => {
  const now = new Date('2026-09-29T12:00:00');
  it('kısa gerekçe / tarih yok / geçmiş / çok uzak → hata; geçerli → null', () => {
    expect(validateTimeProposal('kısa', '2026-10-01T10:00', now)).toBe(TIME_PROPOSAL_TEXT.errReasonShort);
    expect(validateTimeProposal(REASON, '', now)).toBe(TIME_PROPOSAL_TEXT.errDateMissing);
    expect(validateTimeProposal(REASON, '2026-09-28T10:00', now)).toBe(TIME_PROPOSAL_TEXT.errDatePast);
    expect(validateTimeProposal(REASON, '2027-09-29T10:00', now)).toBe(TIME_PROPOSAL_TEXT.errDateTooFar);
    expect(validateTimeProposal(REASON, '2026-10-01T10:00', now)).toBeNull();
  });
});
