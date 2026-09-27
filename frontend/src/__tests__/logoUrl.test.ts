/**
 * AJ-05 — `isLogoUrlSafeToSave` (KAYDETME guard'ı) birim testi.
 * Backend `logoUrlSchema` (backend/src/services/logoUrl.ts) ile AYNI kural seti; kanıt için
 * karşılaştırmalı: `tests/logo-url-https.unit.test.ts` orada aynı örnekleri sınar.
 */
import { describe, it, expect } from 'vitest';
import { isLogoUrlSafeToSave, isSafeLogoUrl } from '@/lib/logoUrl';

describe('isLogoUrlSafeToSave', () => {
  it('izinli uzantılı https adresleri kabul eder', () => {
    for (const good of [
      'https://cdn.example.com/logo.png',
      'https://cdn.example.com/logo.jpg',
      'https://cdn.example.com/logo.jpeg',
      'https://cdn.example.com/logo.webp',
      'https://cdn.example.com/assets/LOGO.PNG',
      'https://cdn.example.com/logo.png?v=2',
      'https://sub.cdn.example.com/logo.png',
    ]) {
      expect(isLogoUrlSafeToSave(good), good).toBe(true);
    }
  });

  it('boş alanı geçerli sayar (logo opsiyonel)', () => {
    expect(isLogoUrlSafeToSave('')).toBe(true);
    expect(isLogoUrlSafeToSave('   ')).toBe(true);
  });

  it('negatif: https dışı şema reddedilir', () => {
    for (const bad of ['http://cdn.example.com/logo.png', 'javascript:alert(1)', 'data:image/png;base64,AAAA']) {
      expect(isLogoUrlSafeToSave(bad), bad).toBe(false);
    }
  });

  it('negatif: kullanıcı bilgisi ve açık port reddedilir', () => {
    expect(isLogoUrlSafeToSave('https://user:pass@cdn.example.com/logo.png')).toBe(false);
    expect(isLogoUrlSafeToSave('https://cdn.example.com:8443/logo.png')).toBe(false);
    expect(isLogoUrlSafeToSave('https://cdn.example.com:443/logo.png')).toBe(true); // varsayılan port
  });

  it('negatif: IP-literal (IPv4/IPv6, gizlenmiş biçimler dahil) reddedilir', () => {
    for (const bad of [
      'https://93.184.216.34/logo.png',
      'https://127.0.0.1/logo.png',
      'https://169.254.169.254/logo.png',
      'https://0x7f.0.0.1/logo.png',
      'https://2130706433/logo.png',
      'https://[::1]/logo.png',
      'https://[fc00::1]/logo.png',
    ]) {
      expect(isLogoUrlSafeToSave(bad), bad).toBe(false);
    }
  });

  it('negatif: localhost ve iç ağ TLD reddedilir (sondaki nokta dahil)', () => {
    for (const bad of [
      'https://localhost/logo.png',
      'https://foo.localhost/logo.png',
      'https://printer.local/logo.png',
      'https://cdn.internal/logo.png',
      'https://localhost./logo.png', // kök-bölge noktası atlatmayı denemesin
      'https://x.local./logo.png',
    ]) {
      expect(isLogoUrlSafeToSave(bad), bad).toBe(false);
    }
    // normal (yerel olmayan) bir alan adı sondaki noktayla reddedilmez
    expect(isLogoUrlSafeToSave('https://cdn.example.com./logo.png')).toBe(true);
  });

  it('negatif: izinsiz/eksik uzantı reddedilir (SVG dahil)', () => {
    for (const bad of [
      'https://cdn.example.com/logo.svg',
      'https://cdn.example.com/logo.gif',
      'https://cdn.example.com/logo',
    ]) {
      expect(isLogoUrlSafeToSave(bad), bad).toBe(false);
    }
  });
});

describe('isSafeLogoUrl (gösterim/okuma guard\'ı — bilerek gevşek, AJ-05 tarafından SIKILAŞTIRILMADI)', () => {
  it('yalnız https şemasını kontrol eder; uzantı/host kısıtı yok', () => {
    expect(isSafeLogoUrl('https://cdn.example.com/logo')).toBe(true); // uzantısız — yine de gösterilir
    expect(isSafeLogoUrl('https://127.0.0.1/logo.png')).toBe(true); // IP-literal — yine de gösterilir
    expect(isSafeLogoUrl('http://cdn.example.com/logo.png')).toBe(false);
    expect(isSafeLogoUrl('')).toBe(true); // boş = logo yok, geçerli kabul edilir
  });
});
