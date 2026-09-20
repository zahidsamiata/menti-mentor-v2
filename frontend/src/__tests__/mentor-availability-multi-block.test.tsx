/**
 * Mentör müsaitlik — çoklu aralık regresyonu (K-03)
 *
 * Bulgu (2026-09-09 gerçek kullanıcı testi): mentör Pazartesi 09:00-17:00 ekleyip
 * ardından Cuma 11:00-17:00 eklediğinde ekranda yalnız Cuma kalıyordu.
 *
 * Kök sebep: sayfa, GET /availability sonucunu yerel state'in ÜZERİNE yazıyordu.
 * İstek uçuştayken eklenen ilk aralık, cevap gelince siliniyordu.
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

// useQuery'nin dönüşü test içinde değiştirilebilir — geç gelen GET cevabı böyle taklit edilir.
const queryState: { data: unknown; isLoading: boolean } = { data: null, isLoading: false };
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ ...queryState, error: null, refetch: vi.fn() }),
}));

const saveAvailability = vi.fn();
vi.mock('@/lib/api/meetings', () => ({
  meetingsApi: {
    getAvailability: vi.fn(),
    saveAvailability: (...args: unknown[]) => saveAvailability(...args),
  },
}));

import AvailabilityPage from '@/app/(dashboard)/mentor/availability/page';

/** Formu doldurup "+ Ekle"ye basar. */
function addBlock(weekday: string, startTime: string, endTime: string) {
  fireEvent.change(document.querySelector('select') as HTMLSelectElement, { target: { value: weekday } });
  const [start, end] = Array.from(document.querySelectorAll('input[type="time"]')) as HTMLInputElement[];
  fireEvent.change(start, { target: { value: startTime } });
  fireEvent.change(end, { target: { value: endTime } });
  fireEvent.click(screen.getByRole('button', { name: /\+ ekle/i }));
}

/** Listedeki aralık satırı sayısı — her satırda bir "Sil" düğmesi var. */
const rowCount = () => screen.queryAllByLabelText('Sil').length;

describe('Mentör müsaitlik — birden fazla aralık', () => {
  beforeEach(() => {
    saveAvailability.mockReset();
    saveAvailability.mockResolvedValue({ ok: true, data: { mentorUserId: 'u1', blocks: [] } });
    queryState.data = null;
    queryState.isLoading = false;
  });

  it('iki farklı gün eklenince ikisi de listede ve gönderilen yükte durur', async () => {
    queryState.data = { mentorUserId: 'u1', blocks: [] };
    render(<AvailabilityPage />);

    addBlock('MON', '09:00', '17:00');
    addBlock('FRI', '11:00', '17:00');

    await waitFor(() => expect(rowCount()).toBe(2));
    expect(screen.getByText(/09:00–17:00/)).toBeInTheDocument();
    expect(screen.getByText(/11:00–17:00/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /müsaitliği kaydet/i }));

    await waitFor(() => expect(saveAvailability).toHaveBeenCalled());
    const payload = saveAvailability.mock.calls[0][1] as { blocks: unknown[] };
    expect(payload.blocks).toEqual([
      { weekday: 'MON', startTime: '09:00', endTime: '17:00' },
      { weekday: 'FRI', startTime: '11:00', endTime: '17:00' },
    ]);
  });

  it('GET cevabı ilk eklemeden SONRA gelirse o aralık silinmez (asıl bulgu)', async () => {
    // İstek henüz uçuşta: data yok.
    queryState.data = null;
    queryState.isLoading = true;
    const { rerender } = render(<AvailabilityPage />);

    // Liste yükleme iskeleti gösterirken form yine de açık — kullanıcı ekleyebiliyor.
    addBlock('MON', '09:00', '17:00');

    // Cevap şimdi geldi — sunucuda kayıtlı aralık yok.
    queryState.data = { mentorUserId: 'u1', blocks: [] };
    queryState.isLoading = false;
    rerender(<AvailabilityPage />);

    // Pazartesi hâlâ duruyor olmalı; eskiden burada siliniyordu.
    await waitFor(() => expect(screen.getByText(/09:00–17:00/)).toBeInTheDocument());

    addBlock('FRI', '11:00', '17:00');

    await waitFor(() => expect(rowCount()).toBe(2));
    expect(screen.getByText(/09:00–17:00/)).toBeInTheDocument();
    expect(screen.getByText(/11:00–17:00/)).toBeInTheDocument();
  });

  it('sunucuda kayıtlı aralık + yeni aralık birlikte kaydedilir', async () => {
    queryState.data = {
      mentorUserId: 'u1',
      blocks: [
        { id: 'b1', tenantId: 't1', userId: 'u1', weekday: 'MON', startTime: '09:00', endTime: '17:00', timezone: 'Europe/Istanbul', isActive: true },
      ],
    };
    render(<AvailabilityPage />);

    await waitFor(() => expect(rowCount()).toBe(1));
    addBlock('FRI', '11:00', '17:00');
    await waitFor(() => expect(rowCount()).toBe(2));

    fireEvent.click(screen.getByRole('button', { name: /müsaitliği kaydet/i }));

    await waitFor(() => expect(saveAvailability).toHaveBeenCalled());
    const payload = saveAvailability.mock.calls[0][1] as { blocks: unknown[] };
    // Prisma satırındaki fazladan alanlar geri gönderilmez; kayıtlı blok korunur.
    expect(payload.blocks).toEqual([
      { weekday: 'MON', startTime: '09:00', endTime: '17:00' },
      { weekday: 'FRI', startTime: '11:00', endTime: '17:00' },
    ]);
  });
});
