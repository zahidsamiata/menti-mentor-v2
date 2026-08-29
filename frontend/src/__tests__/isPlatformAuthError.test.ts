/**
 * DK1 (Faz 3c) — isPlatformAuthError: platform sayfaları oturum düşünce (401/403) login'e
 * yönlendirmeli. Eski `message.includes('401')` bozuktu (backend Türkçe mesaj fırlatır).
 * Artık .status'e bakılıyor.
 */

import { describe, it, expect } from 'vitest';
import { isPlatformAuthError } from '@/lib/api/platform';

describe('isPlatformAuthError', () => {
  it('401 → true (login\'e yönlendir)', () => {
    expect(isPlatformAuthError(Object.assign(new Error('Platform oturumu gerekli.'), { status: 401 }))).toBe(true);
  });

  it('403 → true (yetkisiz platform token)', () => {
    expect(isPlatformAuthError(Object.assign(new Error('Yetkisiz'), { status: 403 }))).toBe(true);
  });

  it('500 → false (login\'e yönlendirme, sayfa hatası göster)', () => {
    expect(isPlatformAuthError(Object.assign(new Error('Sunucu hatası'), { status: 500 }))).toBe(false);
  });

  it('status yok (ağ hatası) → false', () => {
    expect(isPlatformAuthError(new Error('Sunucuya ulaşılamıyor.'))).toBe(false);
  });

  it('null/undefined → false', () => {
    expect(isPlatformAuthError(null)).toBe(false);
    expect(isPlatformAuthError(undefined)).toBe(false);
  });

  it('eski hata (Türkçe mesajda "401" geçmiyor) yine de status ile yakalanır', () => {
    // Regresyon: mesaj kod içermese de status doğru sinyali verir.
    const err = Object.assign(new Error('Platform oturumu gerekli.'), { status: 401 });
    expect(isPlatformAuthError(err)).toBe(true);
  });
});
