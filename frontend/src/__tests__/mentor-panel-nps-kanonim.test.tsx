/**
 * AJ-99 — mentör panelindeki "Ortalama NPS" kartı k-anonimlik maskesini gösterir.
 *
 * Backend (mentorMetricsController + mask.ts maskNpsSample) yanıt sayısı eşiğin (3) altındaysa
 * avgNps=null, npsSuppressed=true döndürür. Ekran bu durumda ortalama yerine kurum
 * ekranlarıyla aynı "gizli (<3 yanıt)" metnini gösterir; eşik üstünde ortalama görünür.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MentorDashboardPage from '@/app/(dashboard)/mentor/page';

const npsMock: { avgNps: number | null; npsSuppressed: boolean } = { avgNps: null, npsSuppressed: false };

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { id: 'm1', role: 'MENTOR', fullName: 'Mentor Kişi' }, isLoading: false }),
}));
vi.mock('@/providers/TenantProvider', () => ({
  useTenant: () => ({ tenant: null }),
}));
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));

// Tüm useQuery çağrılarına birleşik nesne (bkz. mentor-panel-data.test.tsx).
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({
    data: {
      items: [],
      total: 0,
      pendingRequests: 0,
      completedMeetings: 0,
      activeMentis: 0,
      avgNps: npsMock.avgNps,
      npsSuppressed: npsMock.npsSuppressed,
      npsMinSampleSize: 3,
      totalMentoringHours: 0,
      isCertified: false,
      activeMentees: [],
      minCompatibilityScore: 0,
      blockedDiscTypes: [],
      filterEnabled: true,
    },
    isLoading: false,
    error: null,
    refetch: vi.fn(),
  }),
}));

vi.mock('@/components/organisms/DailyQuestionWidget', () => ({ DailyQuestionWidget: () => null }));
vi.mock('@/components/organisms/DiscConfidenceWidget', () => ({ DiscConfidenceWidget: () => null }));
vi.mock('@/components/organisms/LearningJourneyCard', () => ({ LearningJourneyCard: () => null }));

describe('Mentör paneli — Ortalama NPS k-anonimlik (AJ-99)', () => {
  it('eşik altında ortalama yerine "gizli (<3 yanıt)" görünür', () => {
    npsMock.avgNps = null;
    npsMock.npsSuppressed = true;
    render(<MentorDashboardPage />);
    expect(screen.getByText('Ortalama NPS')).toBeInTheDocument();
    expect(screen.getByText('gizli (<3 yanıt)')).toBeInTheDocument();
  });

  it('eşik üstünde ortalama görünür, gizli metni yok', () => {
    npsMock.avgNps = 8;
    npsMock.npsSuppressed = false;
    render(<MentorDashboardPage />);
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.queryByText(/gizli \(</)).not.toBeInTheDocument();
  });
});
