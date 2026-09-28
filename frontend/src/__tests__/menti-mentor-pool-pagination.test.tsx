/**
 * AJ-90 — menti mentör havuzu sayfalama.
 *
 * Uç artık `{ items, total, limit, offset }` döner; ön yüz ilk sayfayı `limit=MENTOR_POOL_PAGE_SIZE`
 * ile ister. `items.length < total` ise "Daha fazla göster" sonraki sayfayı (offset = yüklenen kart
 * sayısı) listeye ekler; hepsi yüklenince düğme kaybolur. Yalnız API katmanı taklit edilir.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MentiDashboardPage from '@/app/(dashboard)/menti/page';
import { MENTOR_POOL_PAGE_SIZE } from '@/lib/api/matching';
import type { MentorMatch } from '@/types/matching';

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

function mentor(n: number): MentorMatch {
  return {
    mentorId: `mentor-${n}`,
    mentorName: `Mentör ${n}`,
    mentorAvatarUrl: null,
    sectorTags: ['teknoloji'],
    skills: [],
    matchScore: 70,
    compatibilityReason: 'Ortak sektör ve ilgi alanları',
    isFaded: false,
    isBookable: true,
  };
}

const FIRST_PAGE_PATH = `/api/mentis/menti-1/mentor-matches?limit=${MENTOR_POOL_PAGE_SIZE}`;
const SECOND_PAGE_PATH = `/api/mentis/menti-1/mentor-matches?limit=${MENTOR_POOL_PAGE_SIZE}&offset=${MENTOR_POOL_PAGE_SIZE}`;

let pages: Record<string, unknown> = {};

const apiMock = vi.fn(async (path: string) => {
  if (path in pages) return pages[path];
  if (path === '/api/agreements/active') return { ok: false, error: { error: 'NOT_FOUND', message: 'yok' }, status: 404 };
  if (path === '/api/meetings') return { ok: true, data: { items: [] } };
  if (path === '/api/conversations') return { ok: true, data: { items: [], total: 0, limit: 30, offset: 0 } };
  return { ok: false, error: { error: 'NOT_MOCKED', message: 'yok' }, status: 404 };
});
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));

HTMLDialogElement.prototype.showModal ??= function showModal() {};
HTMLDialogElement.prototype.close ??= function close() {};

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => mentor(from + i));
const page = (items: MentorMatch[], total: number, offset: number) =>
  ({ ok: true, data: { items, total, limit: MENTOR_POOL_PAGE_SIZE, offset } });

describe('AJ-90 · menti mentör havuzu sayfalama', () => {
  beforeEach(() => {
    apiMock.mockClear();
    pages = {};
  });

  it('total > yüklenen kart iken "Daha fazla göster" görünür; tıklayınca 2. sayfa (offset) istenir ve eklenir', async () => {
    const total = MENTOR_POOL_PAGE_SIZE + 2;
    pages[FIRST_PAGE_PATH] = page(range(1, MENTOR_POOL_PAGE_SIZE), total, 0);
    pages[SECOND_PAGE_PATH] = page(range(MENTOR_POOL_PAGE_SIZE + 1, total), total, MENTOR_POOL_PAGE_SIZE);
    const user = userEvent.setup();
    render(<MentiDashboardPage />);

    expect(await screen.findByText('Mentör 1')).toBeInTheDocument();
    expect(screen.queryByText(`Mentör ${total}`)).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Daha fazla göster' }));

    expect(await screen.findByText(`Mentör ${total}`)).toBeInTheDocument();
    expect(apiMock).toHaveBeenCalledWith(SECOND_PAGE_PATH);
    // İlk sayfa kartları yerinde, tekrar yok.
    expect(screen.getAllByText('Mentör 1')).toHaveLength(1);
    expect(screen.getByText(`Mentör ${MENTOR_POOL_PAGE_SIZE}`)).toBeInTheDocument();
    // Hepsi yüklendi → düğme kaybolur.
    expect(screen.queryByRole('button', { name: 'Daha fazla göster' })).not.toBeInTheDocument();
  });

  it('negatif: total == yüklenen kart iken düğme yok ve ikinci istek gitmez', async () => {
    pages[FIRST_PAGE_PATH] = page(range(1, 3), 3, 0);
    render(<MentiDashboardPage />);

    expect(await screen.findByText('Mentör 3')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Daha fazla göster' })).not.toBeInTheDocument();
    expect(apiMock.mock.calls.some(([p]) => String(p).includes('offset='))).toBe(false);
  });

  it('ikinci sayfa hatasında mevcut kartlar kalır, Türkçe hata görünür, düğme tekrar denenebilir', async () => {
    pages[FIRST_PAGE_PATH] = page(range(1, MENTOR_POOL_PAGE_SIZE), MENTOR_POOL_PAGE_SIZE + 5, 0);
    pages[SECOND_PAGE_PATH] = { ok: false, error: { error: 'INTERNAL', message: 'boom' }, status: 500 };
    const user = userEvent.setup();
    render(<MentiDashboardPage />);

    expect(await screen.findByText('Mentör 1')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Daha fazla göster' }));

    expect(await screen.findByText(/Daha fazla mentör yüklenemedi/)).toBeInTheDocument();
    expect(screen.getByText('Mentör 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Daha fazla göster' })).toBeEnabled();
  });
});
