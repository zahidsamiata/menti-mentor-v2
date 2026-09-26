import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import KvkkPage from '@/app/kvkk/page';

/**
 * GV-09b — KVKK aydınlatma sayfası gerçek sunucu konumunu (Londra/Birleşik Krallık)
 * yazar; önceden yanlışlıkla "İrlanda (Avrupa Birliği)" diyordu (CLAUDE.md madde 92,
 * PO teyitli 2026-08-26).
 */
describe('KvkkPage (GV-09b)', () => {
  it('sunucu konumunu Londra/Birleşik Krallık olarak gösterir, İrlanda demez', () => {
    render(<KvkkPage />);
    expect(screen.getByText(/Londra \(Birleşik Krallık\)/)).toBeInTheDocument();
    expect(screen.queryByText(/İrlanda/)).not.toBeInTheDocument();
  });
});
