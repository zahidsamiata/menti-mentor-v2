import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MentorCertificationPage from '@/app/(dashboard)/mentor/certification/page';

/**
 * I-03 + IC-04 — sertifika BAŞARISIZ sonuç ekranı:
 *  · zayıf konuların ADI görünür (yalnız sayı değil)
 *  · kritik (red-line) konu elemesinde "%80 gerekli" YAZMAZ, doğru sebep gösterilir
 *  · zayıf konu varsa Öğrenme Yolculuğu linki çıkar
 */

const apiMock = vi.fn(async (path: string) => {
  if (path === '/api/scoring/certification/questions') {
    return {
      ok: true,
      data: {
        questions: [
          {
            code: 'Q_KRIZ_A', topic: 'kriz-yonetimi', variant: 'A', isRedLine: true,
            scenario: 'Menti kendine zarar vermekten söz ediyor.',
            options: [
              { key: 'A', label: 'Görmezden gelirim.' },
              { key: 'B', label: 'Hemen yetkiliye yönlendiririm.' },
            ],
          },
        ],
      },
    };
  }
  if (path === '/api/scoring/certification/answer') {
    return { ok: true, data: { outcome: 'wrong', explanation: 'Kritik durumda pasif kalınmaz.', isRedLine: true, firstAttemptPass: false } };
  }
  if (path === '/api/scoring/certify') {
    return {
      ok: true,
      data: {
        certScore: 85, passRate: 0.85, totalTopics: 1, passedTopics: 0,
        passed: false, status: 'FAILED', failReason: 'RED_LINE_FAILED', attempts: 1,
        topicResults: [{ topic: 'kriz-yonetimi', isRedLine: true, firstScore: 1, passed: false }],
      },
    };
  }
  return { ok: false, error: { error: 'X' }, status: 500 };
});

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { role: 'MENTOR', id: 'm1', tenantId: 't1' } }),
}));

describe('MentorCertificationPage — başarısız sonuç', () => {
  it('red-line elemesinde konu ADINI, doğru sebebi ve yolculuk linkini gösterir', async () => {
    render(<MentorCertificationPage />);

    await screen.findByText(/kendine zarar vermekten/);
    fireEvent.click(screen.getByText(/Görmezden gelirim/));
    await screen.findByText(/Kritik durumda pasif kalınmaz/);

    const finishBtn = await screen.findByRole('button', { name: /Bitir ve değerlendir/ });
    fireEvent.click(finishBtn);

    // I-03: konu ADI görünür (yalnız "konu sayısı: N" değil)
    await waitFor(() => expect(screen.getByText(/Kriz & hassas durum yönetimi/)).toBeInTheDocument());
    // IC-04: red-line elemesinde "%80 gerekli" YAZMAZ, doğru sebep yazar
    expect(screen.getByText(/kritik bir konuyu ilk denemede geçemedin/i)).toBeInTheDocument();
    expect(screen.queryByText(/en az %80 gerekli/)).not.toBeInTheDocument();
    // Öğrenme Yolculuğu linki
    expect(screen.getByRole('link', { name: /Öğrenme Yolculuğu/ })).toBeInTheDocument();
  });
});
