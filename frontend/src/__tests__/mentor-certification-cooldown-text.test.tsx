import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MentorCertificationPage from '@/app/(dashboard)/mentor/certification/page';

/**
 * AN-01 — başarısız sonuç ekranı bekleme kuralını DOĞRU anlatır.
 * Backend kuralı (certification.service.ts CERT_CONFIG): her 2 başarısız denemede
 * 24 saat bekleme. Eski metin "Ceza veya bekleme yok" diyordu — yanlış bilgi.
 */

const question = {
  code: 'T1_A', topic: 'topic1', variant: 'A', isRedLine: false,
  scenario: 'Gece mesajı sahnesi',
  options: [{ key: 'A', label: 'Seçenek A' }],
};

let attempts = 1;

const apiMock = vi.fn(async (path: string) => {
  if (path === '/api/scoring/certification/questions') {
    return { ok: true, data: { questions: [question] } };
  }
  if (path === '/api/scoring/certification/answer') {
    return { ok: true, data: { outcome: 'wrong', explanation: 'Açıklama', isRedLine: false, firstAttemptPass: false } };
  }
  if (path === '/api/scoring/certify') {
    return {
      ok: true,
      data: {
        certScore: 0, passRate: 0, totalTopics: 1, passedTopics: 0, passed: false,
        status: 'FAILED', failReason: 'BELOW_THRESHOLD', attempts,
        topicResults: [{ topic: 'topic1', isRedLine: false, firstScore: 0, passed: false }],
      },
    };
  }
  return { ok: false, error: { error: 'X' }, status: 500 };
});

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { role: 'MENTOR', id: 'm1', tenantId: 't1' } }),
}));

async function finishExam() {
  render(<MentorCertificationPage />);
  fireEvent.click(await screen.findByText('Seçenek A'));
  fireEvent.click(await screen.findByText(/Bitir ve değerlendir/));
  await screen.findByText(/Neredeyse oldu/);
}

describe('Sertifika sonuç ekranı — bekleme kuralı metni (AN-01)', () => {
  beforeEach(() => apiMock.mockClear());

  it('ilk başarısız denemede hemen tekrar denenebileceğini ve 2 denemede 24 saat mola kuralını söyler', async () => {
    attempts = 1;
    await finishExam();
    expect(screen.getByText(/Hemen yeniden başlayabilirsin/)).toBeInTheDocument();
    expect(screen.getByText(/her 2 başarısız denemeden sonra 24 saatlik bir mola verilir/)).toBeInTheDocument();
    expect(screen.queryByText(/Ceza veya bekleme yok/)).not.toBeInTheDocument();
  });

  it('ikinci başarısız denemede 24 saatlik molanın başladığını söyler', async () => {
    attempts = 2;
    await finishExam();
    expect(screen.getByText(/Şimdi 24 saatlik bir mola başlıyor/)).toBeInTheDocument();
    expect(screen.queryByText(/Hemen yeniden başlayabilirsin/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Ceza veya bekleme yok/)).not.toBeInTheDocument();
  });
});
