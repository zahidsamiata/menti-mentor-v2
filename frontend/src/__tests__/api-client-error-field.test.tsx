import { afterEach, describe, expect, it, vi } from 'vitest';
import { apiClient } from '@/lib/api/client';

/**
 * K-05 — bazı controller'lar (ör. meetingController 409'ları) insan-okunur Türkçe
 * mesajı `message` yerine `error` alanına yazar. Fix öncesi apiClient bu durumda
 * `error.message`'ı undefined bırakıyor, çağıran ekran generic yedek metne düşüyordu
 * ve mentin gördüğü gerçek red sebebi (backend'in ürettiği Türkçe açıklama) kayboluyordu.
 */
describe('apiClient — `error` alanındaki insan-okunur mesaj `message`e yükselir (K-05)', () => {
  afterEach(() => vi.unstubAllGlobals());

  function stubFetchError(status: number, body: Record<string, unknown>) {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(new Response(JSON.stringify(body), { status }))));
  }

  it('409: backend `message` göndermeden Türkçe cümleyi `error`e koyarsa yine de yüzeye çıkar', async () => {
    stubFetchError(409, { error: 'Seçilen saat mentörün müsaitlik aralığına uymuyor.' });
    const result = await apiClient('/api/meetings/book', { method: 'POST', body: {} });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.message).toBe('Seçilen saat mentörün müsaitlik aralığına uymuyor.');
    }
  });

  it('zaten `message` içeren hatayı olduğu gibi bırakır (regresyon yok)', async () => {
    stubFetchError(409, { error: 'CONFLICT', message: 'Bu saat dolu.' });
    const result = await apiClient('/api/meetings/book', { method: 'POST', body: {} });
    if (!result.ok) expect(result.error.message).toBe('Bu saat dolu.');
  });

  it('negatif: `error` bir kod ise (tek-token, boşluksuz) `message`e taşınmaz', async () => {
    stubFetchError(500, { error: 'INTERNAL_ERROR' });
    const result = await apiClient('/api/meetings/book', { method: 'POST', body: {} });
    if (!result.ok) expect(result.error.message).toBeUndefined();
  });

  it('doğrulama (Zod) detaylarından gelen mesaj hâlâ önceliklidir (details > error)', async () => {
    stubFetchError(400, {
      error: 'VALIDATION',
      details: { fieldErrors: { requestMessage: ['Niyet mesajı en az 50 karakter olmalıdır.'] } },
    });
    const result = await apiClient('/api/meetings/book', { method: 'POST', body: {} });
    if (!result.ok) expect(result.error.message).toBe('Niyet mesajı en az 50 karakter olmalıdır.');
  });
});
