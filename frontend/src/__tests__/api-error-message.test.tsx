import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import { apiErrorMessage, isUserFacingMessage } from '@/lib/apiErrorMessage';
import { useMutation } from '@/hooks/useMutation';
import BildirPage from '@/app/bildir/page';
import AdminCertificationPage from '@/app/(admin)/admin/certification/page';

/**
 * IC-07 — backend'in döndürdüğü Türkçe hata sebebi kullanıcıya ulaşır; mesaj yoksa ya da
 * teknikse (kod, stack, Zod İngilizce varsayılanı) bağlama özgü Türkçe yedek metin gösterilir.
 */

const submitMock = vi.fn();
vi.mock('@/lib/api/platform', () => ({
  submitSuspicionReport: (...args: unknown[]) => submitMock(...args),
}));

const apiMock = vi.fn();
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { role: 'ADMIN', id: 'a1', tenantId: 't1' } }),
}));

describe('apiErrorMessage', () => {
  it('backend Türkçe mesajını döndürür', () => {
    expect(apiErrorMessage({ message: 'Çok fazla deneme. Lütfen biraz bekleyin.' }, 'Yedek')).toBe(
      'Çok fazla deneme. Lütfen biraz bekleyin.',
    );
  });

  it('mesaj yoksa bağlama özgü yedek metni döndürür (negatif)', () => {
    expect(apiErrorMessage({}, 'Bildirim gönderilemedi.')).toBe('Bildirim gönderilemedi.');
    expect(apiErrorMessage(undefined, 'Yedek')).toBe('Yedek');
    expect(apiErrorMessage({ message: '   ' }, 'Yedek')).toBe('Yedek');
  });

  it('iç detay / teknik metni göstermez (negatif)', () => {
    expect(isUserFacingMessage('RED_LINE_LOCKED')).toBe(false);
    expect(isUserFacingMessage('Error: boom\n    at handler (src/x.ts:12:3)')).toBe(false);
    expect(isUserFacingMessage('String must contain at most 1000 character(s)')).toBe(false);
    expect(isUserFacingMessage('x'.repeat(301))).toBe(false);
  });
});

describe('useMutation — ortak yedek', () => {
  it('backend mesajını error olarak verir', async () => {
    const { result } = renderHook(() =>
      useMutation(async () => ({ ok: false as const, status: 409, error: { error: 'CONFLICT', message: 'Bu saat dolu.' } })),
    );
    await act(() => result.current.mutate(undefined));
    expect(result.current.error).toBe('Bu saat dolu.');
  });

  it('mesajsız hatada Türkçe yedek verir, hata kodunu göstermez (negatif)', async () => {
    const { result } = renderHook(() =>
      useMutation(async () => ({ ok: false as const, status: 500, error: { error: 'INTERNAL_ERROR' } })),
    );
    await act(() => result.current.mutate(undefined));
    expect(result.current.error).toBe('İşlem tamamlanamadı. Lütfen tekrar deneyin.');
  });
});

describe('BildirPage — şüpheli davet bildirimi hatası', () => {
  beforeEach(() => submitMock.mockReset());

  function submitForm() {
    render(<BildirPage />);
    fireEvent.submit(screen.getByRole('button', { name: /gönder/i }).closest('form')!);
  }

  it('backend mesajını gösterir', async () => {
    submitMock.mockResolvedValue({
      ok: false,
      status: 429,
      error: { error: 'RATE_LIMITED', message: 'Çok fazla bildirim gönderildi. Lütfen daha sonra tekrar deneyin.' },
    });
    submitForm();
    expect(await screen.findByText('Çok fazla bildirim gönderildi. Lütfen daha sonra tekrar deneyin.')).toBeInTheDocument();
  });

  it('mesajsız hatada Türkçe yedek metni gösterir (negatif)', async () => {
    submitMock.mockResolvedValue({ ok: false, status: 500, error: { error: 'INTERNAL_ERROR' } });
    submitForm();
    expect(await screen.findByText('Bildirim gönderilemedi. Lütfen tekrar deneyin.')).toBeInTheDocument();
    expect(screen.queryByText('INTERNAL_ERROR')).not.toBeInTheDocument();
  });
});

describe('AdminCertificationPage — konu güncelleme hatası', () => {
  const overview = {
    topics: Array.from({ length: 6 }, (_, i) => ({
      topic: `konu-${i}`, isRedLine: false, variantCount: 2, enabled: true, locked: false,
    })),
    activeCount: 6, requiredToPass: 5, minActiveTopics: 5, threshold: 0.8,
  };

  function mockPatchError(error: { error: string; message?: string }) {
    apiMock.mockReset();
    apiMock.mockImplementation(async (_path: string, opts?: { method?: string }) =>
      opts?.method === 'PATCH' ? { ok: false, status: 400, error } : { ok: true, data: overview },
    );
  }

  it('backend mesajını gösterir', async () => {
    mockPatchError({ error: 'TOPIC_UPDATE_FAILED', message: 'Bu konu şu an güncellenemiyor.' });
    render(<AdminCertificationPage />);
    await screen.findByText(/Şu an/);
    fireEvent.click(screen.getAllByRole('switch')[1]);
    expect(await screen.findByText('Bu konu şu an güncellenemiyor.')).toBeInTheDocument();
  });

  it('mesajsız hatada Türkçe yedek metni gösterir (negatif)', async () => {
    mockPatchError({ error: 'TOPIC_UPDATE_FAILED' });
    render(<AdminCertificationPage />);
    await screen.findByText(/Şu an/);
    fireEvent.click(screen.getAllByRole('switch')[1]);
    expect(await screen.findByText('Konu güncellenemedi. Lütfen tekrar deneyin.')).toBeInTheDocument();
    expect(screen.queryByText('TOPIC_UPDATE_FAILED')).not.toBeInTheDocument();
  });
});
