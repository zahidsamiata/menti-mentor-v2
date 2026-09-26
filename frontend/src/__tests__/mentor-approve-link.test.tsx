/**
 * K-19 / KARAR-7 (A) — online toplantı linkini menti değil mentör, onayda girer.
 *
 * Mentör panelinde bekleyen ONLINE bir talep için "Onayla" linksiz DEVRE DIŞI olmalı;
 * link girilince aktifleşmeli; onay isteği locationUrl'i taşımalı; backend hata dönerse
 * kullanıcı bunu görmeli (sessizce yutulmamalı).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MentorDashboardPage from '@/app/(dashboard)/mentor/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { id: 'm1', role: 'MENTOR', fullName: 'Mentor Kişi' }, isLoading: false }),
}));
vi.mock('@/providers/TenantProvider', () => ({ useTenant: () => ({ tenant: null }) }));
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/components/organisms/DailyQuestionWidget', () => ({ DailyQuestionWidget: () => null }));
vi.mock('@/components/organisms/DiscConfidenceWidget', () => ({ DiscConfidenceWidget: () => null }));
vi.mock('@/components/organisms/LearningJourneyCard', () => ({ LearningJourneyCard: () => null }));

const pendingMeetingsMock = {
  items: [
    { id: 'meet-1', format: 'ONLINE', startsAt: '2027-01-04T10:00:00.000Z', match: null, menti: { fullName: 'Menti Bir', sectorTags: [] } },
  ],
};
const refetchPendingMock = vi.fn();
const approveMeetingMock = vi.fn();

vi.mock('@/hooks/useQuery', () => ({
  useQuery: (_fetcher: unknown, _deps: unknown[], options?: { cacheKey?: string }) => {
    if (options?.cacheKey === 'meetings:list:PENDING') {
      return { data: pendingMeetingsMock, isLoading: false, error: null, refetch: refetchPendingMock };
    }
    return { data: { items: [], total: 0, blockedDiscTypes: [], filterEnabled: true, minCompatibilityScore: 0 }, isLoading: false, error: null, refetch: vi.fn() };
  },
}));

vi.mock('@/lib/api/meetings', () => ({
  meetingsApi: {
    list: vi.fn(),
    approveMeeting: (...args: unknown[]) => approveMeetingMock(...args),
    rejectMeeting: vi.fn(),
  },
}));

describe('K-19/KARAR-7: mentör onayında toplantı linki', () => {
  beforeEach(() => {
    refetchPendingMock.mockClear();
    approveMeetingMock.mockReset();
  });

  it('ONLINE talepte link boşken "Onayla" devre dışı', () => {
    render(<MentorDashboardPage />);
    const approveButton = screen.getByRole('button', { name: 'Onayla' });
    expect(approveButton).toBeDisabled();
  });

  it('link girilince "Onayla" aktifleşir ve locationUrl ile approveMeeting çağrılır', async () => {
    approveMeetingMock.mockResolvedValueOnce({ ok: true, data: { meeting: {} } });
    render(<MentorDashboardPage />);
    const linkInput = screen.getByPlaceholderText('Toplantı linki (https://...)');
    fireEvent.change(linkInput, { target: { value: 'https://meet.google.com/abc-defg-hij' } });
    const approveButton = screen.getByRole('button', { name: 'Onayla' });
    expect(approveButton).not.toBeDisabled();
    fireEvent.click(approveButton);
    await waitFor(() => expect(approveMeetingMock).toHaveBeenCalledWith({}, 'meet-1', 'https://meet.google.com/abc-defg-hij'));
    await waitFor(() => expect(refetchPendingMock).toHaveBeenCalled());
  });

  it('backend hata dönerse (ör. linksiz onay reddi) kullanıcı hatayı görür, sessizce yutulmaz', async () => {
    approveMeetingMock.mockResolvedValueOnce({ ok: false, error: { message: 'Online görüşmeyi onaylamak için toplantı bağlantısı girmelisiniz.' } });
    render(<MentorDashboardPage />);
    const linkInput = screen.getByPlaceholderText('Toplantı linki (https://...)');
    fireEvent.change(linkInput, { target: { value: 'https://meet.google.com/abc' } });
    fireEvent.click(screen.getByRole('button', { name: 'Onayla' }));
    await waitFor(() => expect(screen.getByText('Online görüşmeyi onaylamak için toplantı bağlantısı girmelisiniz.')).toBeInTheDocument());
    expect(refetchPendingMock).not.toHaveBeenCalled();
  });
});
