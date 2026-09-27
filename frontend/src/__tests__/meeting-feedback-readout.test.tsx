/**
 * E-3e — görüşme değerlendirmesini OKUMA ekranı.
 *
 * Backend `GET /api/meetings/:meetingId/feedback` (feedbackController.ts
 * getMeetingFeedback) taraf bazlı böler — KARAR-80 (M22, A kabul, GV-04):
 * yazan yalnız KENDİ kaydını görür, karşı tarafın alanları hiç dönmez.
 * Bu bileşen backend'in döndürdüğünden fazlasını göstermez; testler backend
 * çağrısını mock'lar ve yalnız dönen alanların render edildiğini doğrular.
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

const { getFeedbackMock } = vi.hoisted(() => ({
  getFeedbackMock: vi.fn(),
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
    meetingsApi: { ...actual.meetingsApi, getFeedback: getFeedbackMock },
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

describe('Görüşmelerim — E-3e değerlendirme okuma', () => {
  beforeEach(() => {
    authMock.user = { id: MENTOR_ID, role: 'MENTOR' };
    queryMock.data = { items: [meetingFixture()], total: 1 };
    getFeedbackMock.mockReset();
  });

  it('kendi yazdığı değerlendirmeyi gösterir (yalnız backend\'in döndürdüğü alanlar)', async () => {
    getFeedbackMock.mockResolvedValue({
      ok: true,
      status: 200,
      data: {
        id: 'fb-1', meetingId: 'meeting-1', tenantId: 'tenant-1',
        mentorId: MENTOR_ID, mentiId: MENTI_ID,
        // Mentör görünümü — menti->mentör alanları (guidance/resourceSharing/trust)
        // backend tarafından ZATEN elenmiş, bileşen bunları hiç görmüyor.
        preparednessScore: 4,
        proactivityScore: 5,
        keyLearnings: 'Hedef netleşti.',
        specificComments: null,
        createdAt: '2026-09-01T00:00:00.000Z', updatedAt: '2026-09-01T00:00:00.000Z',
      },
    });

    render(<MeetingsPage />);

    expect(await screen.findByText('Değerlendirmeniz')).toBeInTheDocument();
    expect(screen.getByText('Hazırlık')).toBeInTheDocument();
    expect(screen.getByText('4/5')).toBeInTheDocument();
    expect(screen.getByText('Proaktiflik')).toBeInTheDocument();
    expect(screen.getByText('5/5')).toBeInTheDocument();
    expect(screen.getByText(/Hedef netleşti\./)).toBeInTheDocument();

    // Karşı tarafın alanı (guidanceScore vb.) backend hiç döndürmediği için ekranda YOK.
    expect(screen.queryByText('Yönlendirme kalitesi')).not.toBeInTheDocument();
  });

  it('değerlendirme yoksa (404) mevcut değerlendirme akışına yönlendirme linki gösterir', async () => {
    getFeedbackMock.mockResolvedValue({
      ok: false,
      status: 404,
      error: { error: 'NOT_FOUND', message: 'Geri bildirim bulunamadı.' },
    });

    render(<MeetingsPage />);

    const link = await screen.findByRole('link', { name: /Değerlendirme Yap/ });
    expect(link).toHaveAttribute('href', '/meeting-checkin?meetingId=meeting-1');
  });

  it('403 (taraf değil) durumunda çökmez — sessizce gizlenir', async () => {
    getFeedbackMock.mockResolvedValue({
      ok: false,
      status: 403,
      error: { error: 'YETKISIZ' },
    });

    render(<MeetingsPage />);

    await waitFor(() => expect(getFeedbackMock).toHaveBeenCalled());
    // Sayfa çökmedi, ana başlık hâlâ ekranda.
    expect(screen.getByText('Görüşmelerim')).toBeInTheDocument();
    expect(screen.queryByText('Değerlendirmeniz')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Değerlendirme Yap/ })).not.toBeInTheDocument();
  });

  it('beklenmeyen hatada (ör. 500) çökmez, nötr bir mesaj gösterir', async () => {
    getFeedbackMock.mockResolvedValue({
      ok: false,
      status: 500,
      error: { error: 'SUNUCU_HATASI' },
    });

    render(<MeetingsPage />);

    expect(await screen.findByText('Değerlendirme yüklenemedi.')).toBeInTheDocument();
    expect(screen.getByText('Görüşmelerim')).toBeInTheDocument();
  });
});
