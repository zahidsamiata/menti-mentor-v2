import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SiteFooter } from '@/components/molecules/SiteFooter';

/**
 * Y-06 — public alt bilgi yasal metinlere TIKLANABİLİR bağlantı verir
 * (önceden yalnız ana sayfada ölü <span> vardı).
 */
describe('SiteFooter (Y-06)', () => {
  it('Gizlilik, KVKK, Kullanım Koşulları ve Metodoloji bağlantılarını tıklanabilir gösterir', () => {
    render(<SiteFooter />);
    const expected = [
      { name: /Gizlilik Politikası/, href: '/gizlilik' },
      { name: /KVKK Aydınlatma Metni/, href: '/kvkk' },
      { name: /Kullanım Koşulları/, href: '/terms' },
      { name: /Metodoloji/, href: '/metodoloji' },
    ];
    for (const { name, href } of expected) {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('href', href);
    }
  });
});
