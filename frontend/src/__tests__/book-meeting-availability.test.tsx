import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, screen, waitFor, within } from '@testing-library/react';
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

const bookMeetingMock = vi.fn();
vi.mock('@/lib/api/meetings', () => ({
  meetingsApi: {
    getAvailability: vi.fn(),
    bookMeeting: (...args: unknown[]) => bookMeetingMock(...args),
  },
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

  // K-05b: serbest tarih/saat girişi kaldırıldı — null saatli bloklar seçilebilir saat ÜRETMEZ,
  // ekran çökmeden "uygun müsait saat yok" der (önceki: tarih+saat seçilince isFitAvailability çökmez).
  it('startTime/endTime null bloklarda saat listesi çökmez, uygun saat yok mesajı gösterilir', () => {
    availabilityMock.data = {
      blocks: [{ weekday: 'MON', startTime: null, endTime: null }],
    };
    render(<BookMeetingPage />);
    expect(screen.getByTestId('no-bookable-slots')).toBeInTheDocument();
    expect(document.querySelector('input[type="date"]')).not.toBeInTheDocument();
    expect(document.querySelector('input[type="time"]')).not.toBeInTheDocument();
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

  // K-05 → K-05b: KATI (①, bloklu) mentörde önceden blok dışı saat SEÇİLEBİLİYOR, yalnız uyarı +
  // pasif buton çıkıyordu. Artık serbest saat girişi yok; blok dışı saat hiç listelenmez.
  describe('K-05b: KATI mentörde yalnız müsait saatler seçilebilir', () => {
    beforeEach(() => {
      // 2027-01-03 Pazar 12:00 UTC (= 15:00 İstanbul). Yalnız Date sahtelenir; waitFor etkilenmez.
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(new Date('2027-01-03T12:00:00Z'));
    });
    afterEach(() => { vi.useRealTimers(); });

    it('serbest tarih/saat girişi yok; yanıltıcı "yine de gönder" metni yok', () => {
      availabilityMock.data = { blocks: [{ weekday: 'MON', startTime: '14:00', endTime: '16:00' }] };
      render(<BookMeetingPage />);
      expect(document.querySelector('input[type="date"]')).not.toBeInTheDocument();
      expect(document.querySelector('input[type="time"]')).not.toBeInTheDocument();
      expect(screen.queryByText(/yine de talep gönderebilirsiniz/i)).not.toBeInTheDocument();
    });

    it('yalnız blok içi başlangıç saatleri (60 dk süreyle) listelenir, blok dışı saat listede yok', () => {
      availabilityMock.data = { blocks: [{ weekday: 'MON', startTime: '14:00', endTime: '16:00' }] };
      render(<BookMeetingPage />);
      fireEvent.click(screen.getByRole('button', { name: '4 Ocak Pazartesi' }));
      const times = within(screen.getByRole('group', { name: 'Saat seçin' }))
        .getAllByRole('button').map((b) => b.textContent);
      expect(times).toEqual(['14:00', '14:30', '15:00']);
      expect(screen.queryByRole('button', { name: '10:00' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: '15:30' })).not.toBeInTheDocument(); // 60 dk bloğu aşar
    });

    it('geçerli niyet mesajı yazılsa bile saat seçilmeden "Görüşme Talebini Gönder" devre dışı', () => {
      availabilityMock.data = { blocks: [{ weekday: 'MON', startTime: '14:00', endTime: '16:00' }] };
      render(<BookMeetingPage />);
      fireEvent.change(document.querySelector('textarea') as HTMLTextAreaElement, { target: { value: 'B'.repeat(60) } });
      expect(screen.getByRole('button', { name: /görüşme talebini gönder/i })).toBeDisabled();
      fireEvent.click(screen.getByRole('button', { name: '4 Ocak Pazartesi' }));
      expect(screen.getByRole('button', { name: /görüşme talebini gönder/i })).toBeDisabled();
    });

    it('blok içi saat + geçerli mesajla buton aktif; gönderilen an İstanbul saatinin UTC karşılığı', async () => {
      availabilityMock.data = { blocks: [{ weekday: 'MON', startTime: '14:00', endTime: '16:00' }] };
      bookMeetingMock.mockResolvedValueOnce({ ok: true, data: { meeting: {}, awaitingMentorApproval: true } });
      render(<BookMeetingPage />);
      fireEvent.click(screen.getByRole('button', { name: '4 Ocak Pazartesi' }));
      fireEvent.click(screen.getByRole('button', { name: '14:30' }));
      fireEvent.change(document.querySelector('textarea') as HTMLTextAreaElement, { target: { value: 'B'.repeat(60) } });
      const submitButton = screen.getByRole('button', { name: /görüşme talebini gönder/i });
      expect(submitButton).not.toBeDisabled();
      fireEvent.click(submitButton);
      await waitFor(() => expect(bookMeetingMock).toHaveBeenCalled());
      expect(bookMeetingMock.mock.calls[0]![1]).toMatchObject({
        startsAt: '2027-01-04T11:30:00.000Z', // 14:30 İstanbul (+03)
        endsAt: '2027-01-04T12:30:00.000Z',
      });
    });

    it('süre uzayınca artık sığmayan seçili saat düşer, buton yeniden pasifleşir', () => {
      availabilityMock.data = { blocks: [{ weekday: 'MON', startTime: '14:00', endTime: '16:00' }] };
      render(<BookMeetingPage />);
      fireEvent.change(document.querySelector('textarea') as HTMLTextAreaElement, { target: { value: 'B'.repeat(60) } });
      fireEvent.click(screen.getByRole('button', { name: '4 Ocak Pazartesi' }));
      fireEvent.click(screen.getByRole('button', { name: '15:00' }));
      expect(screen.getByRole('button', { name: /görüşme talebini gönder/i })).not.toBeDisabled();
      fireEvent.click(screen.getByRole('button', { name: '90 dk' }));
      expect(screen.queryByRole('button', { name: '15:00' })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /görüşme talebini gönder/i })).toBeDisabled();
    });
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
