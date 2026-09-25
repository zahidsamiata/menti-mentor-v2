/**
 * I-05 (madde 156) — "Bekleme Odasındasınız" afişinde kurumun haftalık görüşme sıklığı.
 * Afiş görünürken kurum ayarı varsa sıklık notu görünür; veri yoksa (null) ya da uç hata
 * verirse afiş bozulmaz ve not hiç görünmez.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MentiDashboardPage from '@/app/(dashboard)/menti/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({
    user: { id: 'menti-1', role: 'MENTI', discType: 'D', approvalStatus: 'PENDING', fullName: 'Deneme Menti' },
    isLoading: false,
  }),
}));
vi.mock('@/providers/TenantProvider', () => ({ useTenant: () => ({ tenant: null }) }));

// Afişle ilgisi olmayan, kendi verisini çeken kartlar etkisizleştirilir.
vi.mock('@/components/organisms/DailyQuestionWidget', () => ({ DailyQuestionWidget: () => null }));
vi.mock('@/components/organisms/DiscConfidenceWidget', () => ({ DiscConfidenceWidget: () => null }));
vi.mock('@/components/organisms/DiscRecallCard', () => ({ DiscRecallCard: () => null }));
vi.mock('@/components/organisms/LearningJourneyCard', () => ({ LearningJourneyCard: () => null }));
vi.mock('@/components/organisms/NotificationOptInButton', () => ({ NotificationOptInButton: () => null }));

let weeklyLimitResponse: unknown;
const apiMock = vi.fn(async (path: string) => {
  if (path === '/api/meetings/weekly-limit') return weeklyLimitResponse;
  if (path === '/api/users/mentor-count') return { ok: true, data: { count: 5 } };
  return { ok: false, error: { error: 'NOT_MOCKED', message: 'yok' }, status: 404 };
});
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));

// jsdom <dialog> API'sini (showModal/close) içermez; sayfa mount'ta close() çağırır.
HTMLDialogElement.prototype.showModal ??= function showModal() {};
HTMLDialogElement.prototype.close ??= function close() {};

describe('Menti bekleme odası afişi — haftalık görüşme sıklığı (I-05)', () => {
  beforeEach(() => apiMock.mockClear());

  it('kurum ayarı varsa afişte sıklık notu görünür', async () => {
    weeklyLimitResponse = { ok: true, data: { maxMeetingsPerWeek: 2 } };
    render(<MentiDashboardPage />);
    expect(screen.getByText('Bekleme Odasındasınız')).toBeInTheDocument();
    const note = await screen.findByTestId('waiting-weekly-meeting-limit');
    expect(note).toHaveTextContent(/haftada en fazla 2 görüşme/);
    expect(note).toHaveTextContent(/Onay bekleyen talepler de bu sayıya dahildir/);
    expect(apiMock).toHaveBeenCalledWith('/api/meetings/weekly-limit');
  });

  it('negatif: ayar yoksa (null) afiş durur, not görünmez', async () => {
    weeklyLimitResponse = { ok: true, data: { maxMeetingsPerWeek: null } };
    render(<MentiDashboardPage />);
    // Afişin mentor sayısı satırı gelene kadar bekle → sorgular çözülmüş olur.
    expect(await screen.findByText(/5 onaylı mentor/)).toBeInTheDocument();
    expect(screen.getByText('Bekleme Odasındasınız')).toBeInTheDocument();
    expect(screen.queryByTestId('waiting-weekly-meeting-limit')).not.toBeInTheDocument();
    expect(screen.queryByText(/haftalık görüşme/i)).not.toBeInTheDocument();
  });

  it('negatif: uç hata verirse afiş bozulmaz, not görünmez', async () => {
    weeklyLimitResponse = { ok: false, error: { error: 'X', message: 'hata' }, status: 500 };
    render(<MentiDashboardPage />);
    expect(await screen.findByText(/5 onaylı mentor/)).toBeInTheDocument();
    expect(screen.getByText('Bekleme Odasındasınız')).toBeInTheDocument();
    expect(screen.queryByTestId('waiting-weekly-meeting-limit')).not.toBeInTheDocument();
  });
});
