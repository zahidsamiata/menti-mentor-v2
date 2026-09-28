import { afterEach, describe, expect, it, vi } from 'vitest';
import { apiClient } from '@/lib/api/client';

/**
 * AJ-62 — randevu/check-in/selfProfile uçlarının elle yazılmış 400'leri artık ortak biçimde:
 * `{ error: 'VALIDATION', message: '<Türkçe cümle>', details: { formErrors: [cümle], fieldErrors: {} } }`.
 * Eskiden cümle `error` alanındaydı. Ekranlar `result.error.message` okur → kullanıcının gördüğü
 * Türkçe metin biçim değişikliğinden sonra da AYNI kalmalı (ne kod `VALIDATION` ne boş yedek).
 */
describe('apiClient — AJ-62 ortak 400 biçimindeki Türkçe mesaj kullanıcıya aynen ulaşır', () => {
  afterEach(() => vi.unstubAllGlobals());

  function stubFetch400(message: string) {
    const body = { error: 'VALIDATION', message, details: { formErrors: [message], fieldErrors: {} } };
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(new Response(JSON.stringify(body), { status: 400 }))));
  }

  it.each([
    ['/api/meetings/availability', 'POST', 'Başlangıç saati bitişten önce olmalı.'],
    ['/api/meetings/book', 'POST', 'Geçmiş bir zamana görüşme oluşturulamaz.'],
    ['/api/meetings/m-1/approve', 'POST', 'Online görüşmeyi onaylamak için görüşme bağlantısı girmelisiniz.'],
    ['/api/users/u-1/self-profile', 'PATCH', 'selfProfile en fazla 50 anahtar içerebilir.'],
  ] as const)('%s → message aynı Türkçe cümle, kod VALIDATION metne sızmaz', async (path, method, message) => {
    stubFetch400(message);
    const result = await apiClient(path, { method, body: {} });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(400);
      expect(result.error.message).toBe(message);
      expect(result.error.error).toBe('VALIDATION');
    }
  });
});
