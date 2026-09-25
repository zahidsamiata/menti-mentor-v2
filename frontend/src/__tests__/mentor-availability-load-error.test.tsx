/**
 * Mentör müsaitlik — yükleme hatasında kaydet kilidi (KR-10)
 *
 * Bulgu: GET /availability başarısız olunca hata gizleniyor, liste "henüz müsaitlik
 * eklenmedi" diye boş görünüyordu. Kaydet ise backend'de önce TÜM aralıkları
 * pasifleştirdiği için mentör boş/eksik listeyi kaydedip kayıtlı aralıklarını silebiliyordu.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
  useSearchParams: () => ({ get: () => null }),
  usePathname: () => '/mentor/availability',
}));

vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({
    user: { id: 'u1', tenantId: 't1', role: 'MENTOR', fullName: 'Test', email: 't@t.com' },
    isLoading: false,
  }),
}));

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));

const refetch = vi.fn();
const queryState: { data: unknown; isLoading: boolean; error: string | null } = {
  data: null, isLoading: false, error: null,
};
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ ...queryState, refetch }),
}));

const saveAvailability = vi.fn();
vi.mock('@/lib/api/meetings', () => ({
  meetingsApi: {
    getAvailability: vi.fn(),
    saveAvailability: (...args: unknown[]) => saveAvailability(...args),
  },
}));

import AvailabilityPage from '@/app/(dashboard)/mentor/availability/page';

const saveButton = () => screen.getByRole('button', { name: /müsaitliği kaydet/i });

describe('Mentör müsaitlik — liste yüklenemezse', () => {
  beforeEach(() => {
    saveAvailability.mockReset();
    saveAvailability.mockResolvedValue({ ok: true, data: { mentorUserId: 'u1', blocks: [] } });
    refetch.mockReset();
    queryState.data = null;
    queryState.isLoading = false;
    queryState.error = null;
  });

  it('hata mesajı görünür, boş liste mesajı görünmez, Kaydet devre dışı', () => {
    queryState.error = 'Sunucu hatası';
    render(<AvailabilityPage />);

    expect(screen.getByText(/müsaitlik saatleriniz yüklenemedi/i)).toBeInTheDocument();
    expect(screen.queryByText(/henüz müsaitlik eklenmedi/i)).not.toBeInTheDocument();
    expect(saveButton()).toBeDisabled();
  });

  it('Kaydet tıklansa bile kaydetme isteği GİTMEZ (bloklar silinmez)', async () => {
    queryState.error = 'Sunucu hatası';
    render(<AvailabilityPage />);

    fireEvent.click(saveButton());
    await new Promise((r) => setTimeout(r, 0));

    expect(saveAvailability).not.toHaveBeenCalled();
  });

  it('"Tekrar yükle" listeyi yeniden ister', () => {
    queryState.error = 'Sunucu hatası';
    render(<AvailabilityPage />);

    fireEvent.click(screen.getByRole('button', { name: /tekrar yükle/i }));
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('yükleme sürerken de Kaydet kilitli', () => {
    queryState.isLoading = true;
    render(<AvailabilityPage />);
    expect(saveButton()).toBeDisabled();
  });

  it('başarılı yüklemede hata görünmez, Kaydet aktif ve istek gider', async () => {
    queryState.data = {
      mentorUserId: 'u1',
      blocks: [{ weekday: 'MON', startTime: '09:00', endTime: '17:00' }],
    };
    render(<AvailabilityPage />);

    expect(screen.queryByText(/yüklenemedi/i)).not.toBeInTheDocument();
    expect(saveButton()).not.toBeDisabled();

    fireEvent.click(saveButton());
    await waitFor(() => expect(saveAvailability).toHaveBeenCalledTimes(1));
    const payload = saveAvailability.mock.calls[0][1] as { blocks: unknown[] };
    expect(payload.blocks).toEqual([{ weekday: 'MON', startTime: '09:00', endTime: '17:00' }]);
  });
});
