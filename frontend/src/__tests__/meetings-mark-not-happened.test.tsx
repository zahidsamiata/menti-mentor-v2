/**
 * Görüşmelerim — U-01 "Gerçekleşmedi" düzeltme butonu.
 *
 * KARAR-80/M11: bitiş saati geçen SCHEDULED toplantılar backend cron'u ile otomatik
 * COMPLETED olur. Mentör, otomasyon yanılırsa (toplantı aslında hiç olmadı) bunu
 * düzeltebilmeli. Buton yalnız COMPLETED + mentör tarafında görünür; onay diyaloğu
 * olmadan istek atılmaz.
 */

import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MeetingsPage from '@/app/(dashboard)/meetings/page';
import type { Meeting } from '@/lib/api/meetings';

// jsdom, <dialog> showModal/close metodlarını tanımlamaz — polyfill (bkz. critical-flows.test.tsx).
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close     = vi.fn();
});

const MENTI_ID  = 'menti-1';
const MENTOR_ID = 'mentor-1';

const authMock = { user: { id: MENTOR_ID, role: 'MENTOR' } as { id: string; role: string } };
const queryMock = { data: undefined as unknown };

// vi.mock hoisting nedeniyle mock referansları vi.hoisted ile tanımlanır.
const { refetchMock, markNotHappenedMock } = vi.hoisted(() => ({
  refetchMock: vi.fn(),
  markNotHappenedMock: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: authMock.user, isLoading: false }),
}));
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ data: queryMock.data, isLoading: false, error: null, refetch: refetchMock }),
}));
vi.mock('@/lib/api/meetings', async (orig) => {
  const actual = await orig<typeof import('@/lib/api/meetings')>();
  return {
    ...actual,
    meetingsApi: { ...actual.meetingsApi, markNotHappened: markNotHappenedMock },
  };
});

function meetingFixture(overrides: Partial<Meeting> = {}): Meeting {
  const startsAt = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
  return {
    id: 'meeting-1',
    tenantId: 'tenant-1',
    mentorUserId: MENTOR_ID,
    mentiUserId: MENTI_ID,
    status: 'COMPLETED',
    format: 'ONLINE',
    startsAt,
    endsAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    notes: null,
    requestMessage: null,
    mentor: { id: MENTOR_ID, fullName: 'Ayşe Yıldız' },
    menti:  { id: MENTI_ID, fullName: 'Deniz Kaya', sectorTags: [], expectationCategories: [] },
    ...overrides,
  };
}

describe('Görüşmelerim — U-01 "Gerçekleşmedi" düzeltmesi', () => {
  beforeEach(() => {
    authMock.user = { id: MENTOR_ID, role: 'MENTOR' };
    queryMock.data = { items: [meetingFixture()], total: 1 };
    refetchMock.mockClear();
    markNotHappenedMock.mockReset();
    markNotHappenedMock.mockResolvedValue({ ok: true, data: { meeting: meetingFixture({ status: 'CANCELLED' }) } });
  });

  it('mentör COMPLETED bir görüşmede "Gerçekleşmedi olarak işaretle" butonunu görür', () => {
    render(<MeetingsPage />);
    expect(screen.getByText('Gerçekleşmedi olarak işaretle')).toBeInTheDocument();
  });

  it('menti bu butonu GÖRMEZ (yalnız mentör düzeltebilir)', () => {
    authMock.user = { id: MENTI_ID, role: 'MENTI' };
    render(<MeetingsPage />);
    expect(screen.queryByText('Gerçekleşmedi olarak işaretle')).not.toBeInTheDocument();
  });

  it('butona basınca onay diyaloğu açılır; onaylamadan istek atılmaz', () => {
    render(<MeetingsPage />);
    fireEvent.click(screen.getByText('Gerçekleşmedi olarak işaretle'));

    expect(screen.getByText('Görüşme gerçekleşmedi mi?')).toBeInTheDocument();
    expect(markNotHappenedMock).not.toHaveBeenCalled();
  });

  it('onay verilince ilgili görüşme için istek atılır ve liste tazelenir', async () => {
    render(<MeetingsPage />);
    fireEvent.click(screen.getByText('Gerçekleşmedi olarak işaretle'));
    fireEvent.click(screen.getByText('Evet, gerçekleşmedi'));

    await waitFor(() => expect(markNotHappenedMock).toHaveBeenCalledWith({}, 'meeting-1'));
    await waitFor(() => expect(refetchMock).toHaveBeenCalled());
  });
});
