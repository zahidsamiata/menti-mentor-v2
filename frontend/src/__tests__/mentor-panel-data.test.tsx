/**
 * P-11 / P-12 / P-13 — mentör paneli veri zenginleştirme.
 *
 * - P-11: "Mentörlük Saati" metrik kartı toplam saati gösterir.
 * - P-12: sertifikalı mentör "Sertifikaya başla" yerine "✅ Sertifikalı" rozeti görür.
 * - P-13: "Mentilerim" listesi aktif menti isimlerini gösterir.
 *
 * Not: mentör sayfası birden çok useQuery çağırır; hepsine tek birleşik nesne verilir
 * (her tüketici yalnız kendi alanlarını okur, fazlalar yok sayılır).
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MentorDashboardPage from '@/app/(dashboard)/mentor/page';

const metricsMock: {
  isCertified: boolean;
  totalMentoringHours: number;
  activeMentees: { id: string; fullName: string }[];
} = { isCertified: false, totalMentoringHours: 0, activeMentees: [] };

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

// Tüm useQuery çağrılarına birleşik nesne: candidatesData.items, pendingMeetings.items,
// scheduledMeetings.items = []; metrics alanları + savedFilter alanları aynı nesnede.
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({
    data: {
      items: [],
      total: 0,
      // metrics
      pendingRequests: 0,
      completedMeetings: 4,
      activeMentis: metricsMock.activeMentees.length,
      avgNps: null,
      totalMentoringHours: metricsMock.totalMentoringHours,
      isCertified: metricsMock.isCertified,
      activeMentees: metricsMock.activeMentees,
      // savedFilter
      minCompatibilityScore: 0,
      blockedDiscTypes: [],
      filterEnabled: true,
    },
    isLoading: false,
    error: null,
    refetch: vi.fn(),
  }),
}));

// Ağır alt bileşenleri sadeleştir (kendi query'lerini kurmasınlar).
vi.mock('@/components/organisms/DailyQuestionWidget', () => ({ DailyQuestionWidget: () => null }));
vi.mock('@/components/organisms/DiscConfidenceWidget', () => ({ DiscConfidenceWidget: () => null }));
vi.mock('@/components/organisms/LearningJourneyCard', () => ({ LearningJourneyCard: () => null }));

describe('Mentör paneli veri zenginleştirme (P-11/P-12/P-13)', () => {
  it('P-11: "Mentörlük Saati" kartı toplam saati gösterir', () => {
    metricsMock.totalMentoringHours = 12;
    metricsMock.isCertified = false;
    metricsMock.activeMentees = [];
    render(<MentorDashboardPage />);
    expect(screen.getByText('Mentörlük Saati')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('P-12: sertifikalı mentör "✅ Sertifikalı" görür, "Sertifikaya başla" görmez', () => {
    metricsMock.totalMentoringHours = 0;
    metricsMock.isCertified = true;
    metricsMock.activeMentees = [];
    render(<MentorDashboardPage />);
    expect(screen.getByText(/Sertifikalı/)).toBeInTheDocument();
    expect(screen.queryByText(/Sertifikaya başla/)).not.toBeInTheDocument();
  });

  it('P-12: sertifikasız mentör "Sertifikaya başla" görür', () => {
    metricsMock.isCertified = false;
    render(<MentorDashboardPage />);
    expect(screen.getByText(/Sertifikaya başla/)).toBeInTheDocument();
  });

  it('P-13: "Mentilerim" listesi aktif menti isimlerini gösterir', () => {
    metricsMock.isCertified = false;
    metricsMock.activeMentees = [
      { id: 'a', fullName: 'Ada Yılmaz' },
      { id: 'b', fullName: 'Bora Demir' },
    ];
    render(<MentorDashboardPage />);
    expect(screen.getByText('Mentilerim')).toBeInTheDocument();
    expect(screen.getByText('Ada Yılmaz')).toBeInTheDocument();
    expect(screen.getByText('Bora Demir')).toBeInTheDocument();
  });

  it('P-13: menti yoksa "Mentilerim" listesi görünmez', () => {
    metricsMock.activeMentees = [];
    render(<MentorDashboardPage />);
    expect(screen.queryByText('Mentilerim')).not.toBeInTheDocument();
  });
});
