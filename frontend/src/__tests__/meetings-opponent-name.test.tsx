/**
 * Görüşmelerim — karşı taraf adı regresyon testi.
 *
 * Hata: MeetingCard'da karşı taraf `isMentor ? meeting.menti : null` idi → menti
 * tarafında daima null, satır hiç çizilmiyordu; menti KİMİNLE görüşeceğini göremiyordu.
 * Veri zaten geliyordu (backend listMeetings `include: { mentor: {...} }`).
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MeetingsPage from '@/app/(dashboard)/meetings/page';
import type { Meeting } from '@/lib/api/meetings';

const MENTI_ID  = 'menti-1';
const MENTOR_ID = 'mentor-1';

// Kimin baktığını ve listenin ne döndüğünü testler arasında değiştirebilmek için mutable.
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

/** Yaklaşan (gelecek tarihli) tek görüşme — listede "Yaklaşan" bölümünde çizilir. */
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

describe('Görüşmelerim — karşı taraf adı', () => {
  beforeEach(() => {
    authMock.user = { id: MENTI_ID, role: 'MENTI' };
    queryMock.data = { items: [meetingFixture()], total: 1 };
  });

  it('menti bakınca mentörün adı "Mentör" etiketiyle görünür', () => {
    render(<MeetingsPage />);

    expect(screen.getByText('Ayşe Yıldız')).toBeInTheDocument();
    expect(screen.getByText(/Mentör:/)).toBeInTheDocument();
    // Menti kendi adını karşı taraf olarak görmemeli
    expect(screen.queryByText('Deniz Kaya')).not.toBeInTheDocument();
  });

  it('mentör bakınca mevcut davranış korunur: mentinin adı "Menti" etiketiyle görünür', () => {
    authMock.user = { id: MENTOR_ID, role: 'MENTOR' };

    render(<MeetingsPage />);

    expect(screen.getByText('Deniz Kaya')).toBeInTheDocument();
    expect(screen.getByText(/Menti:/)).toBeInTheDocument();
    expect(screen.queryByText('Ayşe Yıldız')).not.toBeInTheDocument();
  });

  it('mentör adı gelmezse satır boş kalmaz, yedek metin gösterilir', () => {
    queryMock.data = { items: [meetingFixture({ mentor: undefined })], total: 1 };

    render(<MeetingsPage />);

    expect(screen.getByText('Mentör bilgisi yok')).toBeInTheDocument();
    expect(document.body.textContent).not.toContain('undefined');
  });

  it('mentör adı boş dizeyse de yedek metin gösterilir', () => {
    queryMock.data = {
      items: [meetingFixture({ mentor: { id: MENTOR_ID, fullName: '   ' } })],
      total: 1,
    };

    render(<MeetingsPage />);

    expect(screen.getByText('Mentör bilgisi yok')).toBeInTheDocument();
  });
});
