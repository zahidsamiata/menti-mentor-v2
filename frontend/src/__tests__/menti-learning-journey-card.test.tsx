/**
 * AJ-82 (G4-22 kalanı) — bekleyen menti ekranında Öğrenme Yolculuğu kartı.
 *
 * Diğer menti testleri `LearningJourneyCard`'ı boş bileşenle taklit ediyor; kartın
 * bekleyen mentide göründüğü hiçbir yerde ölçülmüyordu. Bu dosya kartı TAKLİT ETMEZ:
 * gerçek bileşen render edilir ve kendi durum ucunu (`/api/learning-journey/status`) çağırır.
 * - DISC'i bitmiş, onay bekleyen menti kartı ve "Yolculuğa başla" bağlantısını görür;
 * - yolculuğu tamamlamışsa gerçek bileşen "Tamamlandı" rozetini gösterir (veri akışı gerçek);
 * - negatif: DISC'i bitmemiş menti kartı görmez, durum ucu hiç çağrılmaz.
 * `menti/page.tsx`'teki kart satırı silinirse ilk iki test, koşul tersine çevrilirse negatif test kırılır.
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

// Kart dışındaki ağır widget'lar taklit edilir; LearningJourneyCard bilerek taklit EDİLMEZ.
vi.mock('@/components/organisms/DailyQuestionWidget', () => ({ DailyQuestionWidget: () => null }));
vi.mock('@/components/organisms/DiscConfidenceWidget', () => ({ DiscConfidenceWidget: () => null }));
vi.mock('@/components/organisms/DiscRecallCard', () => ({ DiscRecallCard: () => null }));
vi.mock('@/components/organisms/NotificationOptInButton', () => ({ NotificationOptInButton: () => null }));

const JOURNEY_STATUS_PATH = '/api/learning-journey/status';
let journeyCompleted = false;
const apiMock = vi.fn(async (path: string) => {
  if (path === JOURNEY_STATUS_PATH) {
    return {
      ok: true,
      data: { audience: 'MENTI', completed: journeyCompleted, completedAt: null, totalStages: 5 },
    };
  }
  if (path === '/api/users/mentor-count') return { ok: true, data: { count: 5 } };
  if (path === '/api/meetings/weekly-limit') return { ok: true, data: { maxMeetingsPerWeek: null } };
  return { ok: false, error: { error: 'NOT_MOCKED', message: 'yok' }, status: 404 };
});
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));

HTMLDialogElement.prototype.showModal ??= function showModal() {};
HTMLDialogElement.prototype.close ??= function close() {};

const CARD_TITLE = /Öğrenme Yolculuğu/;

function journeyStatusCalls() {
  return apiMock.mock.calls.filter(([path]) => path === JOURNEY_STATUS_PATH).length;
}

describe('Bekleyen menti — Öğrenme Yolculuğu kartı (AJ-82)', () => {
  beforeEach(() => {
    apiMock.mockClear();
    journeyCompleted = false;
    authState.user = { id: 'menti-1', role: 'MENTI', discType: 'D', approvalStatus: 'PENDING' };
  });

  it('DISC testini bitirmiş bekleyen menti kartı ve "Yolculuğa başla" bağlantısını görür', async () => {
    render(<MentiDashboardPage />);
    expect(await screen.findByText('Bekleme Odasındasınız')).toBeInTheDocument();

    expect(screen.getByText(CARD_TITLE)).toBeInTheDocument();
    const link = await screen.findByRole('link', { name: 'Yolculuğa başla →' });
    expect(link).toHaveAttribute('href', '/learning-journey');
    // Gerçek bileşen mount edildi: kendi durum ucunu çağırdı.
    expect(journeyStatusCalls()).toBeGreaterThan(0);
  });

  it('yolculuğu tamamlamış bekleyen menti kartta "Tamamlandı" rozetini ve "Tekrar bak" bağlantısını görür', async () => {
    journeyCompleted = true;
    render(<MentiDashboardPage />);

    expect(await screen.findByText('Tamamlandı ✓')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Tekrar bak →' })).toHaveAttribute('href', '/learning-journey');
  });

  it('negatif: DISC testini bitirmemiş bekleyen menti kartı görmez, durum ucu çağrılmaz', async () => {
    authState.user = { id: 'menti-1', role: 'MENTI', discType: null, approvalStatus: 'PENDING' };
    render(<MentiDashboardPage />);

    expect(await screen.findByText('DISC Profilinizi Tamamlayın')).toBeInTheDocument();
    expect(screen.queryByText(CARD_TITLE)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Yolculuğa başla/ })).not.toBeInTheDocument();
    expect(journeyStatusCalls()).toBe(0);
  });
});
