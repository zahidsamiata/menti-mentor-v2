/**
 * AN-28 — menti panelindeki mentör kartı: gerçekten randevu alınabilir mi?
 *
 * KARAR-80/M7: kart isFaded=true olsa da HİÇ kaldırılmaz, yalnız soluk (opacity) + "Sınırlı"
 * rozetiyle işaretlenir. KARAR-32 revizyonu: isBookable=false olan mentörde "Randevu Al"
 * devre dışı kalır, "Mesaj" HER ZAMAN aktif kalır.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import MentiDashboardPage from '@/app/(dashboard)/menti/page';
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

const bookableMentor: MentorMatch = {
  mentorId: 'mentor-bookable',
  mentorName: 'Uygun Mentör',
  mentorAvatarUrl: null,
  sectorTags: ['teknoloji'],
  skills: [],
  matchScore: 80,
  compatibilityReason: 'Ortak sektör ve ilgi alanları',
  isFaded: false,
  isBookable: true,
};

const fadedMentor: MentorMatch = {
  mentorId: 'mentor-faded',
  mentorName: 'Soluk Mentör',
  mentorAvatarUrl: null,
  sectorTags: ['finans'],
  skills: [],
  matchScore: 60,
  compatibilityReason: 'Genel profil uyumu',
  isFaded: true,
  isBookable: false,
};

let mentorMatchesResponse: unknown = { ok: true, data: { items: [bookableMentor, fadedMentor] } };

const apiMock = vi.fn(async (path: string) => {
  if (path === '/api/mentis/menti-1/mentor-matches?limit=100') return mentorMatchesResponse;
  if (path === '/api/agreements/active') return { ok: false, error: { error: 'NOT_FOUND', message: 'yok' }, status: 404 };
  if (path === '/api/meetings') return { ok: true, data: { items: [] } };
  if (path === '/api/conversations') return { ok: true, data: { items: [] } };
  return { ok: false, error: { error: 'NOT_MOCKED', message: 'yok' }, status: 404 };
});
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));

HTMLDialogElement.prototype.showModal ??= function showModal() {};
HTMLDialogElement.prototype.close ??= function close() {};

describe('AN-28 · Menti mentör kartı — isFaded / isBookable', () => {
  beforeEach(() => {
    apiMock.mockClear();
    mentorMatchesResponse = { ok: true, data: { items: [bookableMentor, fadedMentor] } };
  });

  it('isBookable:true mentörde "Randevu Al" aktif ve tıklanabilir', async () => {
    render(<MentiDashboardPage />);
    await screen.findByText('Uygun Mentör');

    const card = screen.getByText('Uygun Mentör').closest('div.rounded-xl') as HTMLElement;
    const bookButton = within(card).getByRole('button', { name: 'Randevu Al' });
    expect(bookButton).not.toBeDisabled();
  });

  it('isBookable:false mentörde "Randevu Al" devre dışı, "Mesaj" aktif kalır', async () => {
    render(<MentiDashboardPage />);
    await screen.findByText('Soluk Mentör');

    const card = screen.getByText('Soluk Mentör').closest('div.rounded-xl') as HTMLElement;
    const bookButton = within(card).getByRole('button', { name: 'Randevu Al' });
    expect(bookButton).toBeDisabled();

    const messageButton = within(card).getByRole('button', { name: 'Mesaj' });
    expect(messageButton).not.toBeDisabled();
  });

  it('isFaded:true kart GİZLENMEZ — "Sınırlı" rozetiyle listede kalır (KARAR-80/M7)', async () => {
    render(<MentiDashboardPage />);
    await screen.findByText('Soluk Mentör');
    // Her iki kart da listede: soluk mentör kaldırılmadı.
    expect(screen.getByText('Uygun Mentör')).toBeInTheDocument();
    expect(screen.getByText('Soluk Mentör')).toBeInTheDocument();
    expect(screen.getByText('Sınırlı')).toBeInTheDocument();
  });

  it('isFaded:false mentörde "Sınırlı" rozeti YOK', async () => {
    render(<MentiDashboardPage />);
    await screen.findByText('Uygun Mentör');
    const card = screen.getByText('Uygun Mentör').closest('div.rounded-xl') as HTMLElement;
    expect(within(card).queryByText('Sınırlı')).not.toBeInTheDocument();
  });
});
