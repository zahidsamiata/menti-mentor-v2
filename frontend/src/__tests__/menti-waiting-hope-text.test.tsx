/**
 * F-15 (AJ-45) — bekleyen menti "Bekleme Odası"nda umut/anlam cümlesini görür.
 *
 * Metin `menti/page.tsx` bekleme afişindeydi ama hiçbir testte ölçülmüyordu. Bu test:
 * - onay bekleyen menti umut cümlesini + beklerken yapılacakları (öğrenme yolculuğu,
 *   DISC profili) görür; havuz küçükken (<3) de görür ve cümle sayı uydurmaz;
 * - DISC testini henüz bitirmemiş menti afişi (ve cümleyi) görmez.
 * Cümle kaldırılırsa ilk iki test kırılır.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MentiDashboardPage from '@/app/(dashboard)/menti/page';

const authState: { user: Record<string, unknown> } = { user: {} };

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: authState.user, isLoading: false }),
}));
vi.mock('@/providers/TenantProvider', () => ({ useTenant: () => ({ tenant: null }) }));

vi.mock('@/components/organisms/DailyQuestionWidget', () => ({ DailyQuestionWidget: () => null }));
vi.mock('@/components/organisms/DiscConfidenceWidget', () => ({ DiscConfidenceWidget: () => null }));
vi.mock('@/components/organisms/DiscRecallCard', () => ({ DiscRecallCard: () => null }));
vi.mock('@/components/organisms/LearningJourneyCard', () => ({ LearningJourneyCard: () => null }));
vi.mock('@/components/organisms/NotificationOptInButton', () => ({ NotificationOptInButton: () => null }));

let mentorCount = 5;
const apiMock = vi.fn(async (path: string) => {
  if (path === '/api/users/mentor-count') return { ok: true, data: { count: mentorCount } };
  if (path === '/api/meetings/weekly-limit') return { ok: true, data: { maxMeetingsPerWeek: null } };
  return { ok: false, error: { error: 'NOT_MOCKED', message: 'yok' }, status: 404 };
});
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));

HTMLDialogElement.prototype.showModal ??= function showModal() {};
HTMLDialogElement.prototype.close ??= function close() {};

const HOPE = /Sen yalnız değilsin — onay çoğunlukla kısa sürede gelir/;

describe('Menti bekleme odası — umut cümlesi (F-15)', () => {
  beforeEach(() => {
    apiMock.mockClear();
    mentorCount = 5;
    authState.user = { id: 'menti-1', role: 'MENTI', discType: 'D', approvalStatus: 'PENDING' };
  });

  it('onay bekleyen menti umut cümlesini ve beklerken yapılacakları görür', async () => {
    render(<MentiDashboardPage />);
    expect(await screen.findByText(/5 onaylı mentör/)).toBeInTheDocument();
    const hope = screen.getByText(HOPE);
    expect(hope).toHaveTextContent(/öğrenme yolculuğunu/);
    expect(hope).toHaveTextContent(/DISC profilini/);
  });

  it('havuz küçükken (<3) de cümle görünür ve sayı uydurmaz', async () => {
    mentorCount = 1;
    render(<MentiDashboardPage />);
    expect(await screen.findByText(/DISC testiniz tamamlandı/)).toBeInTheDocument();
    const hope = screen.getByText(HOPE);
    expect(hope.textContent).not.toMatch(/\d/);
  });

  it('negatif: DISC testini bitirmemiş menti bekleme afişini ve cümleyi görmez', () => {
    authState.user = { id: 'menti-1', role: 'MENTI', discType: null, approvalStatus: 'PENDING' };
    render(<MentiDashboardPage />);
    expect(screen.getByText('DISC Profilinizi Tamamlayın')).toBeInTheDocument();
    expect(screen.queryByText('Bekleme Odasındasınız')).not.toBeInTheDocument();
    expect(screen.queryByText(HOPE)).not.toBeInTheDocument();
  });
});
