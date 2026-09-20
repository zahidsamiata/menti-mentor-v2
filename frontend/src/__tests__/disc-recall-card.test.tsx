/**
 * P-03 — DISC arketip rapeli.
 *
 * Kayıt sonrası zengin arketip kartı (ResultStep) tek seferlikti; panelde bir daha
 * görünmüyordu. DiscRecallCardView salt-okunur rapeli çizer; kart yoksa sarmalayıcı
 * hiçbir şey göstermez.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DiscRecallCardView, type DiscRecallCardData } from '@/components/organisms/DiscRecallCard';

const card: DiscRecallCardData = {
  archetype: 'Kâşif',
  icon: '🧭',
  superPower: 'Fırsatları herkesten önce görürsün',
  description: 'Enerjin ve merakınla ekibini ileri taşırsın.',
  strengths: ['Girişkenlik', 'İkna'],
  growthArea: 'Detayları atlamamaya özen göster.',
  compatibleWith: ['S', 'C'],
  dominant: 'I',
};

describe('DiscRecallCardView (P-03)', () => {
  it('arketip, süper güç, güçlü yanlar ve gelişim alanını gösterir', () => {
    render(<DiscRecallCardView card={card} />);

    expect(screen.getByText('Kâşif')).toBeInTheDocument();
    expect(screen.getByText(/Fırsatları herkesten önce/)).toBeInTheDocument();
    expect(screen.getByText('Girişkenlik')).toBeInTheDocument();
    expect(screen.getByText('İkna')).toBeInTheDocument();
    expect(screen.getByText(/Detayları atlamamaya/)).toBeInTheDocument();
    expect(screen.getByText('S + C')).toBeInTheDocument();
    expect(screen.getByText('I')).toBeInTheDocument();
  });
});
