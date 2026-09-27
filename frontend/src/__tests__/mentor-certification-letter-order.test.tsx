/**
 * K-07 (AJ-45) — sertifika sınavında karıştırma SONRASI görüntü harfi üstten alta A→D.
 *
 * Motor testi (ScenarioGuideEngine.test.tsx) yalnız öğrenme yolculuğunu ölçüyordu; 4 şıklı
 * asıl yüzey olan sertifika sayfası testsizdi. Burada shuffle deterministik olarak TERS
 * çevrilir: şıklar D,C,B,A kimliğiyle gelir ama ekranda harfler A,B,C,D sırasında
 * görünmeli; seçilen şıkkın kimliği (optionKey) ise görüntü harfinden bağımsız korunmalı.
 * Eski koda (harf = o.key) dönülürse ekranda D,C,B,A görünür ve test kırılır.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MentorCertificationPage from '@/app/(dashboard)/mentor/certification/page';

vi.mock('@/lib/shuffle', () => ({
  shuffle: <T,>(items: readonly T[]): T[] => items.slice().reverse(),
}));

const apiMock = vi.fn(async (path: string, _opts?: unknown) => {
  if (path === '/api/scoring/certification/questions') {
    return {
      ok: true,
      data: {
        questions: [
          {
            code: 'Q_T1_A', topic: 'topic1', variant: 'A', isRedLine: false,
            scenario: 'Menti bir karar için görüş istiyor.',
            options: [
              { key: 'A', label: 'Birinci içerik' },
              { key: 'B', label: 'İkinci içerik' },
              { key: 'C', label: 'Üçüncü içerik' },
              { key: 'D', label: 'Dördüncü içerik' },
            ],
          },
        ],
      },
    };
  }
  if (path === '/api/scoring/certification/answer') {
    return { ok: true, data: { outcome: 'correct', explanation: 'Açıklama.', isRedLine: false, firstAttemptPass: true } };
  }
  return { ok: false, error: { error: 'X' }, status: 500 };
});

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { role: 'MENTOR', id: 'm1', tenantId: 't1' } }),
}));

describe('Sertifika sınavı — şık harfi sırası (K-07)', () => {
  it('karıştırılan şıklarda görüntü harfi üstten alta A→D, cevap kimliği korunur', async () => {
    render(<MentorCertificationPage />);
    await screen.findByText(/Menti bir karar için görüş istiyor/);

    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(4);
    // Görüntü harfleri üstten alta A→D (karıştırma ters çevirdi: içerik D,C,B,A kimlikli).
    expect(radios.map((r) => r.textContent?.slice(0, 2))).toEqual(['A)', 'B)', 'C)', 'D)']);
    // İlk sıradaki şık, kimliği D olan içeriktir.
    expect(radios[0]).toHaveTextContent('A)Dördüncü içerik');

    // Üstteki ("A)") şık seçilince sunucuya görüntü harfi DEĞİL, gerçek kimlik (D) gider.
    fireEvent.click(radios[0]!);
    await waitFor(() =>
      expect(apiMock).toHaveBeenCalledWith('/api/scoring/certification/answer', {
        method: 'POST',
        body: { questionCode: 'Q_T1_A', optionKey: 'D' },
      }),
    );
  });
});
