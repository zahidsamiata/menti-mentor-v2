/**
 * Y1-B9 — askıdaki (dondurulmuş / reddedilmiş) kuruma kayıt denemesi kullanıcıya net Türkçe
 * mesajla gösterilir; eşlenmemiş kod olarak genel "başarısız" metnine düşmez.
 */
import { describe, it, expect } from 'vitest';
import { resolveRegisterError, REGISTER_MESSAGES } from '@/lib/registerMessages';
import { resolveOAuthError, LOGIN_MESSAGES } from '@/lib/loginMessages';

const EXPECTED = 'Bu kuruma şu an yeni kayıt alınmıyor. Kurum yöneticinizle iletişime geçin.';

describe('Y1-B9 · KURUM_KAYDA_KAPALI mesajı', () => {
  it('form kaydı: kod eşlenir, genel hata metnine düşmez', () => {
    const msg = resolveRegisterError({ error: 'KURUM_KAYDA_KAPALI' });
    expect(msg).toBe(EXPECTED);
    expect(msg).not.toBe(REGISTER_MESSAGES.GENERIC_FAIL);
  });

  it('sosyal giriş dönüşü: kod eşlenir, genel hata metnine düşmez', () => {
    const msg = resolveOAuthError('KURUM_KAYDA_KAPALI');
    expect(msg).toBe(EXPECTED);
    expect(msg).not.toBe(LOGIN_MESSAGES.GENERIC_OAUTH_FAIL);
  });
});
