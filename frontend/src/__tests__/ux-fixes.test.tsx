/**
 * UX Kritik Düzeltmeler — Vitest
 *
 * Kapsam:
 *  1. DashboardNav rol bazlı link kontrolü
 *  2. Görüşmelerim sayfası — liste + bekleyen feedback uyarısı
 *  3. Mentor müsaitlik sayfası — form render + kaydet
 *  4. Admin nav — gelişmiş grup toggle
 */

import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close     = vi.fn();
});

// ─── Mock'lar ────────────────────────────────────────────────────────────────

const routerReplace = vi.fn();
const routerPush    = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter:      () => ({ replace: routerReplace, push: routerPush }),
  useSearchParams: () => ({ get: () => null }),
  usePathname:    () => '/meetings',
}));

vi.mock('@/providers/AuthProvider', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/providers/TenantProvider', () => ({
  useTenant: () => ({ tenant: null, isLoading: false }),
}));

vi.mock('@/hooks/useApiClient', () => ({
  useApiClient: () => ({}),
}));

const mockQueryData = vi.fn(() => ({ data: null as unknown, isLoading: false, error: null, refetch: vi.fn() }));
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => mockQueryData(),
}));

vi.mock('@/lib/api/meetings', () => ({
  meetingsApi: {
    list:             vi.fn(),
    getAvailability:  vi.fn(),
    saveAvailability: vi.fn(),
  },
}));

vi.mock('@/lib/api/matching',     () => ({ matchingApi: {}, matchRequestApi: {}, mentorFilterApi: {} }));
vi.mock('@/components/atoms/TenantLogo',               () => ({ TenantLogo: () => null }));
vi.mock('@/components/organisms/DailyQuestionWidget',  () => ({ DailyQuestionWidget: () => null }));
vi.mock('@/components/organisms/DiscConfidenceWidget', () => ({ DiscConfidenceWidget: () => null }));
vi.mock('@/components/organisms/DashboardMetricCard',  () => ({ DashboardMetricCard: () => null }));

import { useAuth } from '@/providers/AuthProvider';
import { DashboardNav } from '@/components/organisms/DashboardNav';
import MeetingsPage from '@/app/(dashboard)/meetings/page';
import AvailabilityPage from '@/app/(dashboard)/mentor/availability/page';

const makeUser = (role = 'MENTI', extra: Record<string, unknown> = {}) => ({
  id: 'u1', tenantId: 't1', role,
  fullName: 'Test', email: 'test@test.com',
  approvalStatus: 'APPROVED', authProvider: 'LOCAL',
  discType: 'D', needsOrientation: false,
  ...extra,
});

// ─── 1. DashboardNav ─────────────────────────────────────────────────────────

describe('DashboardNav — rol bazlı linkler', () => {
  it('MENTI → Ana Sayfa, Görüşmelerim, Profil görünür; Müsaitliğim yok', () => {
    vi.mocked(useAuth).mockReturnValue({ user: makeUser('MENTI') } as never);
    render(<DashboardNav />);

    expect(screen.getByText('Ana Sayfa')).toBeInTheDocument();
    expect(screen.getByText('Görüşmelerim')).toBeInTheDocument();
    expect(screen.getByText('Profil')).toBeInTheDocument();
    expect(screen.queryByText('Müsaitliğim')).not.toBeInTheDocument();
  });

  it('MENTOR → Ana Sayfa, Müsaitliğim, Görüşmelerim, Profil görünür', () => {
    vi.mocked(useAuth).mockReturnValue({ user: makeUser('MENTOR') } as never);
    render(<DashboardNav />);

    expect(screen.getByText('Ana Sayfa')).toBeInTheDocument();
    expect(screen.getByText('Müsaitliğim')).toBeInTheDocument();
    expect(screen.getByText('Görüşmelerim')).toBeInTheDocument();
    expect(screen.getByText('Profil')).toBeInTheDocument();
  });

  it('ADMIN → nav gösterilmez (admin kendi sidebar\'ına sahip)', () => {
    vi.mocked(useAuth).mockReturnValue({ user: makeUser('ADMIN') } as never);
    const { container } = render(<DashboardNav />);
    expect(container.firstChild).toBeNull();
  });

  it('Giriş yapılmamış → nav gösterilmez', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null } as never);
    const { container } = render(<DashboardNav />);
    expect(container.firstChild).toBeNull();
  });
});

// ─── 2. Görüşmelerim Sayfası ─────────────────────────────────────────────────

describe('Görüşmelerim sayfası', () => {
  beforeEach(() => {
    routerReplace.mockReset();
    mockQueryData.mockReturnValue({ data: null, isLoading: false, error: null, refetch: vi.fn() });
  });

  it('Görüşme yok → "Yaklaşan görüşme yok" mesajı', () => {
    vi.mocked(useAuth).mockReturnValue({ user: makeUser('MENTI'), isLoading: false } as never);
    mockQueryData.mockReturnValue({
      data: { items: [], total: 0 },
      isLoading: false, error: null, refetch: vi.fn(),
    });

    render(<MeetingsPage />);
    expect(screen.getByText('Görüşmelerim')).toBeInTheDocument();
    expect(screen.getByText('Yaklaşan görüşme yok.')).toBeInTheDocument();
  });

  it('COMPLETED ve awaitingMentorApproval=false görüşme → feedback uyarısı çıkar', () => {
    vi.mocked(useAuth).mockReturnValue({ user: makeUser('MENTI'), isLoading: false } as never);

    const pastMeeting = {
      id: 'm1', tenantId: 't1',
      mentorUserId: 'mentor1', mentiUserId: 'u1',
      status: 'COMPLETED', format: 'ONLINE',
      startsAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      endsAt:   new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      notes: null, requestMessage: null,
      awaitingMentorApproval: false,
    };
    mockQueryData.mockReturnValue({
      data: { items: [pastMeeting], total: 1 },
      isLoading: false, error: null, refetch: vi.fn(),
    });

    render(<MeetingsPage />);
    expect(screen.getByText(/değerlendirme bekliyor/i)).toBeInTheDocument();
  });

  it('Giriş yapılmamış → /login\'e yönlendirilir', async () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, isLoading: false } as never);
    render(<MeetingsPage />);
    await waitFor(() => expect(routerReplace).toHaveBeenCalledWith('/login'));
  });
});

// ─── 3. Mentor Müsaitlik Sayfası ─────────────────────────────────────────────

describe('Mentor Müsaitlik Sayfası', () => {
  beforeEach(() => {
    routerReplace.mockReset();
    mockQueryData.mockReturnValue({ data: null, isLoading: false, error: null, refetch: vi.fn() });
  });

  it('Başlık ve "Yeni Aralık Ekle" formu görünür', () => {
    vi.mocked(useAuth).mockReturnValue({ user: makeUser('MENTOR'), isLoading: false } as never);
    render(<AvailabilityPage />);

    expect(screen.getByText('Müsaitlik Takvimim')).toBeInTheDocument();
    expect(screen.getByText('Yeni Aralık Ekle')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ekle/i })).toBeInTheDocument();
  });

  it('Mevcut bloklar API\'den yüklenince listelenir', () => {
    vi.mocked(useAuth).mockReturnValue({ user: makeUser('MENTOR'), isLoading: false } as never);
    mockQueryData.mockReturnValue({
      data: {
        mentorUserId: 'u1',
        blocks: [{ weekday: 'MON', startTime: '09:00', endTime: '17:00' }],
      },
      isLoading: false, error: null, refetch: vi.fn(),
    });

    render(<AvailabilityPage />);
    // Saat aralığı yalnızca liste öğesinde var, select option'da değil
    expect(screen.getByText(/09:00–17:00/)).toBeInTheDocument();
  });

  it('Blok ekleme → "müsaitlik eklenmedi" mesajı kalkar, saat aralığı görünür', async () => {
    vi.mocked(useAuth).mockReturnValue({ user: makeUser('MENTOR'), isLoading: false } as never);
    render(<AvailabilityPage />);

    // Başlangıçta boş mesajı görünür
    expect(screen.getByText(/henüz müsaitlik eklenmedi/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /ekle/i }));

    await waitFor(() => {
      // Boş mesaj kalktı, saat aralığı göründü (select option değil, liste öğesi)
      expect(screen.queryByText(/henüz müsaitlik eklenmedi/i)).not.toBeInTheDocument();
      expect(screen.getByText(/09:00–17:00/)).toBeInTheDocument();
    });
  });

  it('MENTOR olmayan kullanıcı → /dashboard\'a yönlendirilir', async () => {
    vi.mocked(useAuth).mockReturnValue({ user: makeUser('MENTI'), isLoading: false } as never);
    render(<AvailabilityPage />);
    await waitFor(() => expect(routerReplace).toHaveBeenCalledWith('/dashboard'));
  });
});
