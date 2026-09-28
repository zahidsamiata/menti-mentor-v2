/**
 * Görüşmelerim — P-05 / KARAR-22 (B): reddedilen/gerçekleşmeyen görüşme çıplak gösterilmez.
 *
 * Eskiden menti, mentörün reddettiği talebi yalnız kırmızı "İptal Edildi" rozetinden öğreniyordu.
 * Artık nötr "Gerçekleşmedi" etiketi + menti'ye jenerik, nazik açıklama. Mentörün gerekçesi
 * (notes) ekranda gösterilmez; alternatif mentör önerilmez.
 */

import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import MeetingsPage from '@/app/(dashboard)/meetings/page';
import type { Meeting } from '@/lib/api/meetings';

// jsdom, <dialog> showModal/close metodlarını tanımlamaz — polyfill (bkz. critical-flows.test.tsx).
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close     = vi.fn();
});

const MENTI_ID  = 'menti-1';
const MENTOR_ID = 'mentor-1';
const GENTLE = 'Bu görüşme gerçekleşmedi. Bu durum seninle ya da profilinle ilgili bir değerlendirme değil.';

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
  useQuery: () => ({ data: queryMock.data, isLoading: false, error: null, refetch: vi.fn() }),
}));

function cancelledMeeting(overrides: Partial<Meeting> = {}): Meeting {
  const startsAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  return {
    id: 'meeting-1',
    tenantId: 'tenant-1',
    mentorUserId: MENTOR_ID,
    mentiUserId: MENTI_ID,
    status: 'CANCELLED',
    format: 'ONLINE',
    startsAt,
    endsAt: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
    notes: null,
    requestMessage: null,
    mentor: { id: MENTOR_ID, fullName: 'Örnek Mentör' },
    menti:  { id: MENTI_ID, fullName: 'Örnek Menti', sectorTags: [], expectationCategories: [] },
    ...overrides,
  };
}

describe('Görüşmelerim — P-05 nazik ret gösterimi', () => {
  beforeEach(() => {
    authMock.user = { id: MENTI_ID, role: 'MENTI' };
    queryMock.data = { items: [cancelledMeeting()], total: 1 };
  });

  it('menti kırmızı "İptal Edildi" yerine nötr "Gerçekleşmedi" etiketi ve nazik açıklama görür', () => {
    render(<MeetingsPage />);
    expect(screen.queryByText('İptal Edildi')).not.toBeInTheDocument();
    expect(screen.getByText('Gerçekleşmedi')).toBeInTheDocument();
    expect(screen.getByText(GENTLE)).toBeInTheDocument();
  });

  it('mentörün notu (gerekçe) ekrana gelmiş olsa bile menti\'ye gösterilmez', () => {
    queryMock.data = { items: [cancelledMeeting({ notes: 'Gizli ret gerekçesi' })], total: 1 };
    render(<MeetingsPage />);
    expect(screen.queryByText(/Gizli ret gerekçesi/)).not.toBeInTheDocument();
  });

  it('alternatif mentör önerilmez', () => {
    render(<MeetingsPage />);
    expect(screen.queryByText(/başka (bir )?mentör/i)).not.toBeInTheDocument();
  });

  it('mentör kendi reddettiği görüşmede teselli metnini görmez', () => {
    authMock.user = { id: MENTOR_ID, role: 'MENTOR' };
    render(<MeetingsPage />);
    expect(screen.getByText('Gerçekleşmedi')).toBeInTheDocument();
    expect(screen.queryByText(GENTLE)).not.toBeInTheDocument();
  });
});
