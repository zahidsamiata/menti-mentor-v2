/**
 * AJ-33 (P-07 ❌) — check-in sonrası kutlama SAYIM YOLU.
 *
 * Check-in yalnız COMPLETED görüşmede açılır (backend meetingCheckInController → 409), yani
 * kullanıcının görüşme listesinde bu görüşme ZATEN COMPLETED'dır. Eski kod sayıya +1 ekliyordu →
 * ilk görüşmede "2. görüşmen tamamlandı!", 10. eşik 9. görüşmede çıkıyordu.
 * milestones.test.ts yalnız saf eşlemeyi (sayı → metin) ölçüyor; bu dosya listeden sayıya giden yolu
 * hem saf fonksiyon hem sayfa düzeyinde ölçer.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import MeetingCheckInPage from '@/app/(dashboard)/meeting-checkin/page';
import { checkInMilestone } from '@/lib/milestones';
import type { Meeting } from '@/lib/api/meetings';

function mk(id: string, status: Meeting['status']): Meeting {
  return {
    id,
    tenantId: 't1',
    mentorUserId: 'mentor-1',
    mentiUserId: 'menti-1',
    status,
    format: 'ONLINE',
    startsAt: '2026-01-01T10:00:00Z',
    endsAt: '2026-01-01T11:00:00Z',
    notes: null,
    requestMessage: null,
  };
}

/** `n` tamamlanmış görüşme (sonuncusu check-in yapılan `meeting-this`) + tamamlanmamış gürültü. */
function listWithCompleted(n: number): Meeting[] {
  const done = Array.from({ length: n }, (_, i) => mk(i === n - 1 ? 'meeting-this' : `past-${i}`, 'COMPLETED'));
  return [...done, mk('future-1', 'SCHEDULED'), mk('cancel-1', 'CANCELLED')];
}

describe('checkInMilestone — sayım yolu (AJ-33)', () => {
  it('ilk görüşme (listede yalnız bu görüşme COMPLETED) → "ilk görüşme" kutlaması', () => {
    expect(checkInMilestone(listWithCompleted(1)).title).toBe('İlk görüşmeni tamamladın!');
  });

  it('10. görüşme → 10. eşik; 9. görüşme eşik DEĞİL', () => {
    expect(checkInMilestone(listWithCompleted(10)).title).toBe('10 görüşme! Büyük bir eşik.');
    expect(checkInMilestone(listWithCompleted(9)).title).toBe('9. görüşmen tamamlandı!');
  });

  it('liste boş/yüklenmemiş → nötr kutlama (yanlış "ilk görüşme" iddiası yok)', () => {
    expect(checkInMilestone([]).title).toBe('Teşekkürler!');
  });
});

// ── Sayfa düzeyi: gerçek sayfa listeyi çekip gönderimden sonra doğru kutlamayı gösteriyor mu ──

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams('meetingId=meeting-this'),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { id: 'menti-1', role: 'MENTI' }, isLoading: false }),
}));

let meetingsList: Meeting[] = [];
const apiMock = vi.fn(async (path: string) => {
  if (path === '/api/meetings') return { ok: true, data: { items: meetingsList } };
  if (path === '/api/meetings/meeting-this/check-in') return { ok: true, data: {} };
  return { ok: false, error: { error: 'NOT_MOCKED', message: 'yok' }, status: 404 };
});
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));

async function submitQuickCheckIn() {
  render(<MeetingCheckInPage />);
  await waitFor(() => expect(apiMock).toHaveBeenCalledWith('/api/meetings'));
  // Liste sorgusunun çözülmesini bekle (sayı gönderim anında okunur).
  await act(async () => { await Promise.resolve(); });
  // Yıldız satırı her render'da yeniden bağlanır → her tıklamadan önce yeniden sorgula.
  fireEvent.click(screen.getAllByText('★')[4]); // genel değer: 5
  fireEvent.click(screen.getAllByText('★')[9]); // ilerleme: 5
  fireEvent.click(screen.getByText('✅ Evet, kesinlikle'));
  fireEvent.click(screen.getByText('Hızlı Gönder (90 sn)'));
}

describe('Check-in sayfası — kutlama sayısı (AJ-33)', () => {
  beforeEach(() => apiMock.mockClear());

  it('ilk görüşmenin check-in\'i "İlk görüşmeni tamamladın!" gösterir, "2. görüşmen" DEĞİL', async () => {
    meetingsList = listWithCompleted(1);
    await submitQuickCheckIn();
    expect(await screen.findByText('İlk görüşmeni tamamladın!')).toBeInTheDocument();
    expect(screen.queryByText('2. görüşmen tamamlandı!')).not.toBeInTheDocument();
  });

  it('10. görüşmenin check-in\'i 10. eşik kutlamasını gösterir', async () => {
    meetingsList = listWithCompleted(10);
    await submitQuickCheckIn();
    expect(await screen.findByText('10 görüşme! Büyük bir eşik.')).toBeInTheDocument();
  });

  it('9. görüşmenin check-in\'i 10. eşiği erken GÖSTERMEZ', async () => {
    meetingsList = listWithCompleted(9);
    await submitQuickCheckIn();
    expect(await screen.findByText('9. görüşmen tamamlandı!')).toBeInTheDocument();
    expect(screen.queryByText('10 görüşme! Büyük bir eşik.')).not.toBeInTheDocument();
  });
});
