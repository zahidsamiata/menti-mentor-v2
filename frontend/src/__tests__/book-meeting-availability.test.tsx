import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import BookMeetingPage from '@/app/(dashboard)/book-meeting/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => ({ get: (k: string) => (k === 'mentorId' ? 'mentor-1' : null) }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { id: 'user-1', role: 'MENTI' } }),
}));
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));

// Mutable availability mock — set startTime/endTime to null to reproduce the crash
const availabilityMock = { data: undefined as unknown };

vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ data: availabilityMock.data, isLoading: false, error: null }),
}));

describe('BookMeeting — availability null-safety regression', () => {
  it('startTime/endTime null bloklar varken ilk render çökmez', () => {
    availabilityMock.data = {
      blocks: [{ weekday: 'MON', startTime: null, endTime: null }],
    };
    expect(() => render(<BookMeetingPage />)).not.toThrow();
  });

  it('startTime/endTime null iken tarih+saat seçilince isFitAvailability çökmez', () => {
    availabilityMock.data = {
      blocks: [{ weekday: 'MON', startTime: null, endTime: null }],
    };
    render(<BookMeetingPage />);
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
    const timeInput = document.querySelector('input[type="time"]') as HTMLInputElement;
    expect(dateInput).toBeTruthy();
    expect(timeInput).toBeTruthy();
    // Trigger isFitAvailability with null startTime blocks — should not throw
    expect(() => {
      fireEvent.change(dateInput, { target: { value: '2027-01-04' } }); // Monday
      fireEvent.change(timeInput, { target: { value: '14:00' } });
    }).not.toThrow();
  });

  it('U-10: mentörün açık müsaitliği yokken kart yerine yönlendirici boş-durum gösterir', () => {
    availabilityMock.data = { blocks: [] };
    render(<BookMeetingPage />);
    expect(screen.getByText(/henüz açık müsaitlik saati belirtmemiş/i)).toBeInTheDocument();
  });

  it('I-05: talep ekranında haftalık görüşme sıklığı notu görünür; değer yokken ekran bozulmaz', () => {
    availabilityMock.data = { blocks: [] }; // sıklık alanı yok → genel metin
    render(<BookMeetingPage />);
    expect(screen.getByTestId('weekly-meeting-limit')).toHaveTextContent(/kurumun belirlediği sıklığa bağlıdır/);
  });

  // K-05: KATI (①, bloklu) mentörde blok dışı saat seçilince backend talebi 409 ile KESİN
  // reddeder (meetingController.ts). Önceki metin "Yine de talep gönderebilirsiniz" diyerek
  // esnekmiş gibi yanıltıyordu; artık kesin ret ve doğru saat aralığına yönlendirme gösterilir.
  it('K-05: KATI mentörde blok dışı saat seçilince kesin-ret uyarısı gösterir (yanıltıcı "yine de gönder" YOK)', () => {
    availabilityMock.data = { blocks: [{ weekday: 'MON', startTime: '14:00', endTime: '16:00' }] };
    render(<BookMeetingPage />);
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
    const timeInput = document.querySelector('input[type="time"]') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: '2027-01-04' } }); // Monday
    fireEvent.change(timeInput, { target: { value: '10:00' } }); // blok dışı (14:00-16:00 değil)

    expect(screen.getByText(/yalnızca müsait gösterdiği saatlerden seçebilirsiniz/i)).toBeInTheDocument();
    expect(screen.queryByText(/yine de talep gönderebilirsiniz/i)).not.toBeInTheDocument();
  });

  // K-05: mentörün hiç bloğu yoksa (④, message-only) backend'in katı zaman-eşleşmesi devreye
  // girmez; ekran hâlâ "yine de talep gönderebilirsiniz" yönlendirmesini gösterebilir — bu ifade
  // yalnızca KATI/① mentörde yanıltıcıdır, blok-yokken doğrudur.
  it('K-05: bloksuz (message-only) mentörde "yine de talep gönderebilirsiniz" yönlendirmesi kalır', () => {
    availabilityMock.data = { blocks: [] };
    render(<BookMeetingPage />);
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
    const timeInput = document.querySelector('input[type="time"]') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: '2027-01-04' } });
    fireEvent.change(timeInput, { target: { value: '10:00' } });

    expect(screen.getByText(/yine de bir zaman önerip talep gönderebilirsiniz/i)).toBeInTheDocument();
    expect(screen.queryByText(/yalnızca müsait gösterdiği saatlerden seçebilirsiniz/i)).not.toBeInTheDocument();
  });
});
