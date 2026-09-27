/**
 * E-3e — görüşme değerlendirmesini (check-in) OKUMA ekranı.
 *
 * DÜZELTME (bağımsız inceleme, PR #372): ilk sürüm yanlış tablodan okuyordu —
 * "Değerlendirme Yap" (/meeting-checkin) `MeetingCheckIn` tablosuna yazar, ilk
 * sürüm ise `Feedback` tablosunu (`GET /:id/feedback`) okuyordu. Bu testler
 * doğru uç olan `GET /api/meetings/:meetingId/check-ins`
 * (meetingCheckInController.ts:102 getCheckIns) için yazıldı — backend
 * çağrısı mock'lanır, yalnız KENDİ kaydın gösterildiği ve karşı tarafın
 * kaydının asla "kaydedildi" diye sunulmadığı doğrulanır.
 */

import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import MeetingsPage from '@/app/(dashboard)/meetings/page';
import type { Meeting } from '@/lib/api/meetings';

// U-01: sayfa her zaman bir <ConfirmDialog> (native <dialog>) mount ediyor;
// jsdom showModal/close metodlarını tanımlamaz — polyfill (bkz. meetings-mark-not-happened.test.tsx).
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close     = vi.fn();
});

const MENTI_ID  = 'menti-1';
const MENTOR_ID = 'mentor-1';

const authMock = { user: { id: MENTOR_ID, role: 'MENTOR' } as { id: string; role: string } };
const queryMock = { data: undefined as unknown };

const { getCheckInsMock } = vi.hoisted(() => ({
  getCheckInsMock: vi.fn(),
}));

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
vi.mock('@/lib/api/meetings', async (orig) => {
  const actual = await orig<typeof import('@/lib/api/meetings')>();
  return {
    ...actual,
    meetingsApi: { ...actual.meetingsApi, getCheckIns: getCheckInsMock },
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

function checkInFixture(overrides: Partial<{
  id: string; userId: string; role: 'MENTOR' | 'MENTI';
  overallRating: number; progressRating: number; continueIntent: string;
  menteePreparedness: number | null; openNote: string | null;
}> = {}) {
  return {
    id: 'ci-1',
    meetingId: 'meeting-1',
    tenantId: 'tenant-1',
    userId: MENTOR_ID,
    role: 'MENTOR' as const,
    overallRating: 4,
    progressRating: 5,
    continueIntent: 'EVET',
    menteePreparedness: 3,
    wantedMore: null,
    nextTopicNote: null,
    concernTag: null,
    continuationView: null,
    openNote: 'Harika bir görüşmeydi.',
    submittedAt: '2026-09-01T00:00:00.000Z',
    ...overrides,
  };
}

describe('Görüşmelerim — E-3e check-in okuma', () => {
  beforeEach(() => {
    authMock.user = { id: MENTOR_ID, role: 'MENTOR' };
    queryMock.data = { items: [meetingFixture()], total: 1 };
    getCheckInsMock.mockReset();
  });

  it('kendi check-in kaydını gösterir (backend zaten yalnız kendi kaydını döndürür)', async () => {
    getCheckInsMock.mockResolvedValue({
      ok: true,
      status: 200,
      data: { items: [checkInFixture({ userId: MENTOR_ID })], total: 1 },
    });

    render(<MeetingsPage />);

    expect(await screen.findByText('Değerlendirmeniz')).toBeInTheDocument();
    expect(screen.getByText('4/5')).toBeInTheDocument();
    expect(screen.getByText('5/5')).toBeInTheDocument();
    expect(screen.getByText('Evet, kesinlikle')).toBeInTheDocument();
    expect(screen.getByText(/Harika bir görüşmeydi\./)).toBeInTheDocument();
  });

  it('yalnız karşı tarafın kaydı geldiyse (kendi kaydı YOK) "kaydedildi" göstermez — CTA gösterir (NEGATİF)', async () => {
    // Savunma testi: backend sözleşmesine göre bu normalde olmaz (taraf yalnız
    // kendi kaydını görür) ama bileşen yine de kendi userId'siyle eşleşmeyen
    // bir kaydı ASLA "Değerlendirmeniz" diye sunmamalı.
    getCheckInsMock.mockResolvedValue({
      ok: true,
      status: 200,
      data: { items: [checkInFixture({ id: 'ci-2', userId: MENTI_ID, role: 'MENTI' })], total: 1 },
    });

    render(<MeetingsPage />);

    const link = await screen.findByRole('link', { name: /Değerlendirme Yap/ });
    expect(link).toHaveAttribute('href', '/meeting-checkin?meetingId=meeting-1');
    expect(screen.queryByText('Değerlendirmeniz')).not.toBeInTheDocument();
  });

  it('check-in yoksa (boş liste) mevcut değerlendirme akışına yönlendirme linki gösterir', async () => {
    getCheckInsMock.mockResolvedValue({ ok: true, status: 200, data: { items: [], total: 0 } });

    render(<MeetingsPage />);

    const link = await screen.findByRole('link', { name: /Değerlendirme Yap/ });
    expect(link).toHaveAttribute('href', '/meeting-checkin?meetingId=meeting-1');
  });

  it('404 durumunda da yönlendirme linki gösterir', async () => {
    getCheckInsMock.mockResolvedValue({ ok: false, status: 404, error: { error: 'NOT_FOUND' } });

    render(<MeetingsPage />);

    const link = await screen.findByRole('link', { name: /Değerlendirme Yap/ });
    expect(link).toHaveAttribute('href', '/meeting-checkin?meetingId=meeting-1');
  });

  it('403 (taraf değil) durumunda çökmez — sessizce gizlenir (NEGATİF)', async () => {
    getCheckInsMock.mockResolvedValue({ ok: false, status: 403, error: { error: 'YETKI_YETERSIZ' } });

    render(<MeetingsPage />);

    await waitFor(() => expect(getCheckInsMock).toHaveBeenCalled());
    expect(screen.getByText('Görüşmelerim')).toBeInTheDocument();
    expect(screen.queryByText('Değerlendirmeniz')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Değerlendirme Yap/ })).not.toBeInTheDocument();
  });

  it('beklenmeyen hatada (ör. 500) çökmez, nötr bir mesaj gösterir (NEGATİF)', async () => {
    getCheckInsMock.mockResolvedValue({ ok: false, status: 500, error: { error: 'SUNUCU_HATASI' } });

    render(<MeetingsPage />);

    expect(await screen.findByText('Değerlendirme yüklenemedi.')).toBeInTheDocument();
    expect(screen.getByText('Görüşmelerim')).toBeInTheDocument();
  });

  it('kurum yöneticisi görünümünde "Değerlendirmeniz" değil "Değerlendirmeler" etiketi kullanılır', async () => {
    authMock.user = { id: 'admin-1', role: 'ADMIN' };
    getCheckInsMock.mockResolvedValue({
      ok: true,
      status: 200,
      data: {
        items: [
          checkInFixture({ id: 'ci-1', userId: MENTOR_ID, role: 'MENTOR' }),
          checkInFixture({ id: 'ci-2', userId: MENTI_ID, role: 'MENTI', overallRating: 5 }),
        ],
        total: 2,
      },
    });

    render(<MeetingsPage />);

    expect(await screen.findByText('Değerlendirmeler')).toBeInTheDocument();
    expect(screen.queryByText('Değerlendirmeniz')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Değerlendirme Yap/ })).not.toBeInTheDocument();
  });

  it('admin görünümünde check-in hiç yoksa yönlendirme butonu göstermez (admin değerlendiren taraf değildir)', async () => {
    authMock.user = { id: 'admin-1', role: 'ADMIN' };
    getCheckInsMock.mockResolvedValue({ ok: true, status: 200, data: { items: [], total: 0 } });

    render(<MeetingsPage />);

    await waitFor(() => expect(getCheckInsMock).toHaveBeenCalled());
    expect(screen.queryByRole('link', { name: /Değerlendirme Yap/ })).not.toBeInTheDocument();
  });
});
