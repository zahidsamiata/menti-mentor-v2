/**
 * AN-17 — DISC arketip kartı mentör panelinde ve profil sayfasında.
 *
 * P-03 (#209) kartı yalnız menti panelinde gösteriyordu. Bu test, kartın mentör
 * panelinde (`DiscRecallCard` sarmalayıcısı, `/api/users/:id`) ve profil sayfasında
 * (zaten çekilen profil yanıtındaki `discResultCard`) göründüğünü; kart verisi yoksa
 * (DISC tamamlanmamış) hiçbir şey çizilmediğini doğrular.
 *
 * Not: sayfalar birden çok useQuery çağırır; hepsine tek birleşik, KARARLI nesne verilir
 * (her tüketici yalnız kendi alanlarını okur). Kararlı referans, profil sayfasındaki
 * `useEffect([profile])` döngüsünü önler.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MentorDashboardPage from '@/app/(dashboard)/mentor/page';
import ProfilePage from '@/app/(dashboard)/profile/page';
import type { DiscRecallCardData } from '@/components/organisms/DiscRecallCard';

const card: DiscRecallCardData = {
  archetype: 'Kâşif',
  icon: '🧭',
  superPower: 'Derin analiz',
  description: 'Ayrıntıyı görürsün.',
  strengths: ['Titizlik', 'Planlama'],
  growthArea: 'Esneklik',
  compatibleWith: ['S'],
  dominant: 'C',
};

const authState: { role: 'MENTOR' | 'MENTI' } = { role: 'MENTOR' };

// Kararlı nesneler — her render'da aynı referans döner.
const baseData = {
  items: [],
  total: 0,
  pendingRequests: 0,
  completedMeetings: 0,
  activeMentis: 0,
  avgNps: null,
  totalMentoringHours: 0,
  isCertified: false,
  activeMentees: [],
  minCompatibilityScore: 0,
  blockedDiscTypes: [],
  filterEnabled: true,
  // profil alanları
  id: 'u1',
  fullName: 'Deneme Kullanıcı',
  email: 'deneme@example.com',
  role: 'MENTOR',
  discType: 'C',
  bioSummary: null,
  expertiseDetails: null,
  targetAudience: null,
  education: null,
  pastProjects: null,
  volunteerHistory: null,
  skills: [],
  sectorTags: [],
  linkedinUrl: null,
  instagramUrl: null,
  avatarUrl: null,
};
const dataWithCard = { ...baseData, discResultCard: card };
const dataWithoutCard = { ...baseData, discResultCard: null };
const queryState: { data: typeof dataWithCard | typeof dataWithoutCard } = { data: dataWithCard };

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({
    user: {
      id: 'u1',
      role: authState.role,
      fullName: 'Deneme Kullanıcı',
      email: 'deneme@example.com',
      discType: 'C',
      discLetters: 'C',
    },
    accessToken: 't',
    isLoading: false,
  }),
}));
vi.mock('@/providers/TenantProvider', () => ({
  useTenant: () => ({ tenant: null }),
}));
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ data: queryState.data, isLoading: false, error: null, refetch: vi.fn() }),
}));

// Ağır alt bileşenleri sadeleştir.
vi.mock('@/components/organisms/DailyQuestionWidget', () => ({ DailyQuestionWidget: () => null }));
vi.mock('@/components/organisms/DiscConfidenceWidget', () => ({ DiscConfidenceWidget: () => null }));
vi.mock('@/components/organisms/LearningJourneyCard', () => ({ LearningJourneyCard: () => null }));
vi.mock('@/components/organisms/DataPrivacySection', () => ({ DataPrivacySection: () => null }));
vi.mock('@/components/molecules/WeeklyMeetingLimitNote', () => ({ WeeklyMeetingLimitNote: () => null }));

describe('AN-17: DISC arketip kartı — mentör paneli', () => {
  beforeEach(() => {
    authState.role = 'MENTOR';
  });

  it('kart verisi varsa mentör panelinde arketip kartı görünür', () => {
    queryState.data = dataWithCard;
    render(<MentorDashboardPage />);
    expect(screen.getByText('Senin DISC Profilin')).toBeInTheDocument();
    expect(screen.getByText(/Derin analiz/)).toBeInTheDocument();
    expect(screen.getByText('Titizlik')).toBeInTheDocument();
    // Menti özgüven tonu mentörde gösterilmez.
    expect(screen.queryByText(/Doğru mentörle/)).not.toBeInTheDocument();
  });

  it('kart verisi yoksa mentör panelinde kart çizilmez', () => {
    queryState.data = dataWithoutCard;
    render(<MentorDashboardPage />);
    expect(screen.queryByText('Senin DISC Profilin')).not.toBeInTheDocument();
  });
});

describe('AN-17: DISC arketip kartı — profil sayfası', () => {
  it('kart verisi varsa profilde arketip kartı görünür', () => {
    authState.role = 'MENTOR';
    queryState.data = dataWithCard;
    render(<ProfilePage />);
    expect(screen.getByText('Senin DISC Profilin')).toBeInTheDocument();
    expect(screen.getByText(/Derin analiz/)).toBeInTheDocument();
    expect(screen.getByText('Planlama')).toBeInTheDocument();
  });

  it('kart verisi yoksa profilde kart çizilmez', () => {
    authState.role = 'MENTOR';
    queryState.data = dataWithoutCard;
    render(<ProfilePage />);
    expect(screen.queryByText('Senin DISC Profilin')).not.toBeInTheDocument();
  });
});
