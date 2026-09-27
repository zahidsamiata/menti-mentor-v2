/**
 * P-09 / U-10 (AJ-45) — mentör panelinde "Görüşme Talepleri" kartı boşken de görünür.
 *
 * mentor-empty-panel.test.tsx yalnız mesajlar sayfasının rol metnini ölçüyordu; mentör
 * panelindeki boş talep kartı (`mentor/page.tsx` Onay Kuyruğu) testsizdi. Eski kodda kart
 * yalnız talep varken çiziliyordu → yeni mentör kartı hiç görmüyordu. Bu test:
 * - bekleyen talep yokken kart başlığı + yönlendirici boş-durum metni görünür, rozet yok;
 * - talep varken boş-durum metni görünmez, "1 bekliyor" rozeti görünür.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MentorDashboardPage from '@/app/(dashboard)/mentor/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { id: 'm1', role: 'MENTOR' }, isLoading: false }),
}));
vi.mock('@/providers/TenantProvider', () => ({ useTenant: () => ({ tenant: null }) }));
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/components/organisms/DailyQuestionWidget', () => ({ DailyQuestionWidget: () => null }));
vi.mock('@/components/organisms/DiscConfidenceWidget', () => ({ DiscConfidenceWidget: () => null }));
vi.mock('@/components/organisms/LearningJourneyCard', () => ({ LearningJourneyCard: () => null }));
vi.mock('@/components/organisms/DiscRecallCard', () => ({ DiscRecallCard: () => null }));

const pending: { items: unknown[] } = { items: [] };

vi.mock('@/hooks/useQuery', () => ({
  useQuery: (_fetcher: unknown, _deps: unknown[], options?: { cacheKey?: string }) => {
    if (options?.cacheKey === 'meetings:list:PENDING') {
      return { data: pending, isLoading: false, error: null, refetch: vi.fn() };
    }
    return {
      data: { items: [], total: 0, blockedDiscTypes: [], filterEnabled: true, minCompatibilityScore: 0 },
      isLoading: false, error: null, refetch: vi.fn(),
    };
  },
}));

const EMPTY_TEXT = /Henüz görüşme talebiniz yok/;

describe('Mentör paneli — boş görüşme talepleri kartı (P-09 / U-10)', () => {
  beforeEach(() => {
    pending.items = [];
  });

  it('bekleyen talep yokken kart görünür ve yönlendirici boş-durum metni gösterir', () => {
    render(<MentorDashboardPage />);
    expect(screen.getByText('Görüşme Talepleri')).toBeInTheDocument();
    expect(screen.getByText(EMPTY_TEXT)).toHaveTextContent(/talepleri burada onaylayıp yanıtlayabilirsiniz/);
    expect(screen.queryByText(/bekliyor$/)).not.toBeInTheDocument();
  });

  it('talep varken boş-durum metni görünmez, bekleyen sayısı rozeti görünür', () => {
    pending.items = [
      { id: 'meet-1', format: 'IN_PERSON', startsAt: '2027-01-04T10:00:00.000Z', match: null, menti: { fullName: 'Test Menti', sectorTags: [] } },
    ];
    render(<MentorDashboardPage />);
    expect(screen.getByText('Görüşme Talepleri')).toBeInTheDocument();
    expect(screen.getByText('1 bekliyor')).toBeInTheDocument();
    expect(screen.queryByText(EMPTY_TEXT)).not.toBeInTheDocument();
  });
});
