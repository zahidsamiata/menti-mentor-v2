import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import BookMeetingPage from '@/app/(dashboard)/book-meeting/page';

const pushMock = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock, replace: vi.fn() }),
  useSearchParams: () => ({ get: (k: string) => (k === 'mentorId' ? 'mentor-1' : null) }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { id: 'user-1', role: 'MENTI' } }),
}));
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));

const startConversationMock = vi.fn();
vi.mock('@/lib/api/conversations', () => ({
  conversationsApi: { start: (...args: unknown[]) => startConversationMock(...args) },
}));

// Mutable availability mock — set startTime/endTime to null to reproduce the crash
const availabilityMock = { data: undefined as unknown };

vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ data: availabilityMock.data, isLoading: false, error: null }),
}));

describe('BookMeeting — availability null-safety regression', () => {
  beforeEach(() => {
    pushMock.mockClear();
    startConversationMock.mockReset();
  });

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

  // K-20 (KARAR-53 ④, 2026-09-26): mentör hiç bloğu yoksa backend HER randevu talebini kesin
  // reddeder — bu yüzden randevu formu artık gösterilmiyor, mesaj yolu sunuluyor.
  it('K-20: mentörün açık müsaitliği yokken randevu formu yerine mesaj yolu gösterir', () => {
    availabilityMock.data = { blocks: [] };
    render(<BookMeetingPage />);
    expect(screen.getByText(/henüz müsait saat belirtmemiş/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /mesaj gönder/i })).toBeInTheDocument();
    expect(document.querySelector('input[type="date"]')).not.toBeInTheDocument();
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

  // K-05: uyarı göstermek yetmiyordu — geçerli bir niyet mesajı yazılsa bile buton blok-dışı
  // seçimde tıklanabilir kalıyordu (backend zaten 409 ile reddediyordu, ama "gönder" denenebiliyordu).
  it('K-05: geçerli niyet mesajı yazılsa bile blok dışı saatte "Randevu Talebini Gönder" devre dışı', () => {
    availabilityMock.data = { blocks: [{ weekday: 'MON', startTime: '14:00', endTime: '16:00' }] };
    render(<BookMeetingPage />);
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
    const timeInput = document.querySelector('input[type="time"]') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: '2027-01-04' } }); // Monday
    fireEvent.change(timeInput, { target: { value: '10:00' } }); // blok dışı (14:00-16:00 değil)
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'B'.repeat(60) } }); // msgValid = true

    const submitButton = screen.getByRole('button', { name: /randevu talebini gönder/i });
    expect(submitButton).toBeDisabled();
  });

  it('K-05: blok İÇİ saat + geçerli mesajla "Randevu Talebini Gönder" aktif', () => {
    availabilityMock.data = { blocks: [{ weekday: 'MON', startTime: '14:00', endTime: '16:00' }] };
    render(<BookMeetingPage />);
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
    const timeInput = document.querySelector('input[type="time"]') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: '2027-01-04' } }); // Monday
    // Blok varsayılan 'Europe/Istanbul' (UTC+3); test ortamı UTC → 11:30 UTC = 14:30 İstanbul (blok içi).
    fireEvent.change(timeInput, { target: { value: '11:30' } });
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'B'.repeat(60) } });

    const submitButton = screen.getByRole('button', { name: /randevu talebini gönder/i });
    expect(submitButton).not.toBeDisabled();
  });

  // K-20 (KARAR-53 ④, 2026-09-26): mentörün hiç bloğu yoksa randevu formu hiç render edilmez —
  // eski "yine de talep gönderebilirsiniz" yanıltıcı yönlendirmesi kaldırıldı, ne KATI-mentör
  // kesin-ret uyarısı ne de randevu formu görünür; yalnız mesaj yolu vardır.
  it('K-20: bloksuz mentörde ne randevu formu ne eski yanıltıcı metin görünür, yalnız mesaj yolu vardır', () => {
    availabilityMock.data = { blocks: [] };
    render(<BookMeetingPage />);

    expect(screen.queryByText(/yine de bir zaman önerip talep gönderebilirsiniz/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/yalnızca müsait gösterdiği saatlerden seçebilirsiniz/i)).not.toBeInTheDocument();
    expect(document.querySelector('input[type="date"]')).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText(/kendinizi tanıtın/i)).toBeInTheDocument();
  });

  it('K-20: mesaj gönderilince conversationsApi.start çağrılır ve konuşmaya yönlendirilir', async () => {
    availabilityMock.data = { blocks: [] };
    startConversationMock.mockResolvedValueOnce({
      ok: true,
      data: { conversation: { id: 'convo-9' }, message: { id: 'm1', senderUserId: 'user-1', content: 'x', createdAt: '2026-01-01' } },
    });
    render(<BookMeetingPage />);

    const textarea = screen.getByPlaceholderText(/kendinizi tanıtın/i);
    fireEvent.change(textarea, { target: { value: 'Merhaba, sizinle görüşmek isterim.' } });
    fireEvent.click(screen.getByRole('button', { name: /mesaj gönder/i }));

    await waitFor(() => expect(startConversationMock).toHaveBeenCalledWith(
      {},
      { mentorUserId: 'mentor-1', message: 'Merhaba, sizinle görüşmek isterim.' },
    ));
    await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/messages/convo-9'));
  });

  it('K-20: mesaj gönderimi başarısız olursa hata görünür, sessizce yutulmaz', async () => {
    availabilityMock.data = { blocks: [] };
    startConversationMock.mockResolvedValueOnce({ ok: false, error: { message: 'Sunucu hatası.' } });
    render(<BookMeetingPage />);

    fireEvent.change(screen.getByPlaceholderText(/kendinizi tanıtın/i), { target: { value: 'Merhaba.' } });
    fireEvent.click(screen.getByRole('button', { name: /mesaj gönder/i }));

    await waitFor(() => expect(screen.getByText('Sunucu hatası.')).toBeInTheDocument());
    expect(pushMock).not.toHaveBeenCalled();
  });
});
