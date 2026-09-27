/**
 * AJ-42 — menti paneli "Gönderilen Talepler" kartı, konuşma listesi sayfalı (30) olsa da
 * yanıttaki `total`'ı gösterir; yüklenen liste uzunluğunda (30) takılmaz.
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import MentiDashboardPage from '@/app/(dashboard)/menti/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({
    user: { id: 'menti-1', role: 'MENTI', discType: 'D', approvalStatus: 'APPROVED', fullName: 'Deneme Menti' },
    isLoading: false,
  }),
}));
vi.mock('@/providers/TenantProvider', () => ({ useTenant: () => ({ tenant: null }) }));

vi.mock('@/components/organisms/DailyQuestionWidget', () => ({ DailyQuestionWidget: () => null }));
vi.mock('@/components/organisms/DiscConfidenceWidget', () => ({ DiscConfidenceWidget: () => null }));
vi.mock('@/components/organisms/DiscRecallCard', () => ({ DiscRecallCard: () => null }));
vi.mock('@/components/organisms/LearningJourneyCard', () => ({ LearningJourneyCard: () => null }));
vi.mock('@/components/organisms/NotificationOptInButton', () => ({ NotificationOptInButton: () => null }));

// Sunucu F-27 sayfalaması: ilk sayfada 30 konuşma, toplam 35.
const PAGE_SIZE = 30;
const TOTAL_CONVERSATIONS = 35;
const firstPageItems = Array.from({ length: PAGE_SIZE }, (_, i) => ({
  id: `conv-${i + 1}`,
  counterpart: { id: `mentor-${i + 1}` },
  lastMessagePreview: null,
  lastMessageAt: '2026-01-01T10:00:00Z',
  unread: 0,
}));

const apiMock = vi.fn(async (path: string) => {
  if (path === '/api/mentis/menti-1/mentor-matches?limit=100') return { ok: true, data: { items: [] } };
  if (path === '/api/agreements/active') return { ok: false, error: { error: 'NOT_FOUND', message: 'yok' }, status: 404 };
  if (path === '/api/meetings') return { ok: true, data: { items: [] } };
  if (path === '/api/conversations') {
    return { ok: true, data: { items: firstPageItems, total: TOTAL_CONVERSATIONS, limit: PAGE_SIZE, offset: 0 } };
  }
  return { ok: false, error: { error: 'NOT_MOCKED', message: 'yok' }, status: 404 };
});
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));

HTMLDialogElement.prototype.showModal ??= function showModal() {};
HTMLDialogElement.prototype.close ??= function close() {};

function sentRequestsValue(): string | null {
  const label = screen.getByText('Gönderilen Talepler');
  return label.nextElementSibling?.textContent ?? null;
}

describe('AJ-42 · Menti paneli — Gönderilen Talepler sayacı total kullanır', () => {
  it('konuşma listesi 30 kayıtla kırpılmış, total=35 → kart 35 gösterir (30 değil)', async () => {
    render(<MentiDashboardPage />);
    await waitFor(() => expect(apiMock).toHaveBeenCalledWith('/api/conversations'));
    await waitFor(() => expect(sentRequestsValue()).toBe(String(TOTAL_CONVERSATIONS)));
    expect(sentRequestsValue()).not.toBe(String(PAGE_SIZE));
  });
});
