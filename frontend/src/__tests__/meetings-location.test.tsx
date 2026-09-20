/**
 * Görüşmelerim — görüşme yeri/bağlantısı render testi (U-02).
 *
 * Hata: backend `locationUrl`/`locationText`/`phoneNumber` 3 alana yazıyordu ama
 * MeetingCard hiçbirini render etmiyordu → online görüşmenin linki hiçbir ekranda
 * görünmüyordu. Veri zaten geliyordu (listMeetings `include` → tüm scalar alanlar).
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MeetingsPage from '@/app/(dashboard)/meetings/page';
import type { Meeting } from '@/lib/api/meetings';

const MENTI_ID  = 'menti-1';
const MENTOR_ID = 'mentor-1';

const authMock = { user: { id: MENTI_ID, role: 'MENTI' } as { id: string; role: string } };
const queryMock = { data: undefined as unknown };

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: authMock.user, isLoading: false }),
}));
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ data: queryMock.data, isLoading: false, error: null }),
}));

function meetingFixture(overrides: Partial<Meeting> = {}): Meeting {
  const startsAt = new Date(Date.now() + 86_400_000).toISOString(); // yarın
  return {
    id: 'meeting-1',
    tenantId: 'tenant-1',
    mentorUserId: MENTOR_ID,
    mentiUserId: MENTI_ID,
    status: 'SCHEDULED',
    format: 'ONLINE',
    startsAt,
    endsAt: new Date(Date.now() + 90_000_000).toISOString(),
    notes: null,
    requestMessage: null,
    mentor: { id: MENTOR_ID, fullName: 'Ayşe Yıldız' },
    menti:  { id: MENTI_ID, fullName: 'Deniz Kaya', sectorTags: [], expectationCategories: [] },
    ...overrides,
  };
}

describe('Görüşmelerim — görüşme yeri/bağlantısı', () => {
  beforeEach(() => {
    authMock.user = { id: MENTI_ID, role: 'MENTI' };
  });

  it('ONLINE görüşmede katılım linki tıklanabilir olarak görünür', () => {
    queryMock.data = {
      items: [meetingFixture({ format: 'ONLINE', locationUrl: 'https://meet.example.com/abc' })],
      total: 1,
    };

    render(<MeetingsPage />);

    const link = screen.getByRole('link', { name: /Görüşmeye katıl/ });
    expect(link).toHaveAttribute('href', 'https://meet.example.com/abc');
  });

  it('IN_PERSON görüşmede konum metni görünür', () => {
    queryMock.data = {
      items: [meetingFixture({ format: 'IN_PERSON', locationText: 'Kadıköy Ofis, Kat 3', locationUrl: undefined })],
      total: 1,
    };

    render(<MeetingsPage />);

    expect(screen.getByText('Kadıköy Ofis, Kat 3')).toBeInTheDocument();
  });

  it('PHONE görüşmede telefon numarası tel: linki olarak görünür', () => {
    queryMock.data = {
      items: [meetingFixture({ format: 'PHONE', phoneNumber: '+905551112233', locationUrl: undefined })],
      total: 1,
    };

    render(<MeetingsPage />);

    const link = screen.getByRole('link', { name: '+905551112233' });
    expect(link).toHaveAttribute('href', 'tel:+905551112233');
  });

  it('yer bilgisi yoksa hiçbir bağlantı/konum satırı çizilmez', () => {
    queryMock.data = {
      items: [meetingFixture({ format: 'ONLINE', locationUrl: undefined })],
      total: 1,
    };

    render(<MeetingsPage />);

    expect(screen.queryByText(/Bağlantı:/)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Görüşmeye katıl/ })).not.toBeInTheDocument();
  });
});
