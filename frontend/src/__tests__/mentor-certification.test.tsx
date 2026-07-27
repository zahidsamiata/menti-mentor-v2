import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MentorCertificationPage from '@/app/(dashboard)/mentor/certification/page';

/**
 * Paket D — Mentör sertifika öğrenme akışı UI.
 * Senaryo → seçim → açıklama → bitir → sertifika sonucu.
 */

const apiMock = vi.fn(async (path: string) => {
  if (path === '/api/scoring/certification/questions') {
    return {
      ok: true,
      data: {
        questions: [
          {
            code: 'Q_T1_A', topic: 'topic1', variant: 'A', isRedLine: false,
            scenario: 'Mentin sorusuyla geliyor.',
            options: [
              { key: 'A', label: 'Kendi çözümünü buldururum.' },
              { key: 'B', label: 'Cevabı direkt söylerim.' },
            ],
          },
        ],
      },
    };
  }
  if (path === '/api/scoring/certification/answer') {
    return { ok: true, data: { outcome: 'correct', explanation: 'İyi mentörlük buldurmaktır.', isRedLine: false, firstAttemptPass: true } };
  }
  if (path === '/api/scoring/certify') {
    return {
      ok: true,
      data: {
        certScore: 100, passRate: 1, totalTopics: 1, passedTopics: 1,
        passed: true, status: 'CERTIFIED', failReason: null, attempts: 1,
        topicResults: [{ topic: 'topic1', isRedLine: false, firstScore: 3, passed: true }],
      },
    };
  }
  return { ok: false, error: { error: 'X' }, status: 500 };
});

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { role: 'MENTOR', id: 'm1', tenantId: 't1' } }),
}));

describe('MentorCertificationPage', () => {
  it('senaryo → seçim → açıklama → bitir → SERTİFİKALI akışı', async () => {
    render(<MentorCertificationPage />);

    // Senaryo yüklenir
    const scenario = await screen.findByText(/Mentin sorusuyla geliyor/);
    expect(scenario).toBeInTheDocument();

    // Seçim yap → açıklama gösterilir
    fireEvent.click(screen.getByText(/Kendi çözümünü buldururum/));
    await screen.findByText(/İyi mentörlük buldurmaktır/);

    // Tek konu + ilk-deneme geçti → "Bitir ve değerlendir"
    const finishBtn = await screen.findByRole('button', { name: /Bitir ve değerlendir/ });
    fireEvent.click(finishBtn);

    // Sertifika sonucu
    await waitFor(() => expect(screen.getByText(/SERTİFİKALI/)).toBeInTheDocument());
    expect(screen.getByText(/Sertifikalı Mentörsün/)).toBeInTheDocument();
  });
});
