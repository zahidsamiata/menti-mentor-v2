/**
 * AJ-86a — Landing "Teknik Eşleşme Skoru": sıfır etikette skor 0.
 * Eski formül (`52 + n*4`) hiç etiket seçilmediğinde %52 gösteriyordu.
 */
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { bentoMatchScore, BENTO_SCORE } from '@/lib/landingBentoScore';
import { AlgorithmBento } from '@/app/_sections/AlgorithmBento';

describe('bentoMatchScore', () => {
  it('sıfır etikette skor 0', () => {
    expect(bentoMatchScore(0)).toBe(0);
  });

  it('her etiket skoru artırır', () => {
    let prev = bentoMatchScore(0);
    for (let n = 1; n <= 11; n++) {
      const cur = bentoMatchScore(n);
      expect(cur).toBeGreaterThan(prev);
      prev = cur;
    }
  });

  it('üst sınırı aşmaz (12 etiketin tamamı seçili)', () => {
    expect(bentoMatchScore(12)).toBe(BENTO_SCORE.MAX);
    expect(bentoMatchScore(100)).toBe(BENTO_SCORE.MAX);
  });

  it('başlangıç seçimi (4 etiket) bugünkü görünümü korur: %68', () => {
    expect(bentoMatchScore(4)).toBe(68);
  });
});

describe('AlgorithmBento — canlı skor', () => {
  it('seçili etiketlerin hepsi kaldırılınca %0 gösterir', () => {
    render(<AlgorithmBento />);
    expect(screen.getByText('%68')).toBeInTheDocument();
    for (const label of ['Yazılım', 'Veri Bilimi', 'Ürün Yönetimi', 'Mühendislik']) {
      fireEvent.click(screen.getByRole('button', { name: label }));
    }
    expect(screen.getByText('%0')).toBeInTheDocument();
    expect(screen.queryByText('%52')).not.toBeInTheDocument();
  });
});
