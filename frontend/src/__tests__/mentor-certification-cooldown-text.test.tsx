import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MentorCertificationPage from '@/app/(dashboard)/mentor/certification/page';

/**
 * AN-01 — başarısız sonuç ekranı bekleme kuralını DOĞRU anlatır.
 * Backend kuralı (certification.service.ts CERT_CONFIG, I-08 / madde 158): Türkiye takvim
 * gününde en fazla 2 deneme; günün son hakkı da kalınırsa mola ertesi gün 00:00'a kadar. Eski metin "Ceza veya bekleme yok" diyordu — yanlış bilgi.
 */

const question = {
  code: 'T1_A', topic: 'topic1', variant: 'A', isRedLine: false,
  scenario: 'Gece mesajı sahnesi',
  options: [{ key: 'A', label: 'Seçenek A' }],
};

let attempts = 1;
// AJ-37: molanın başlayıp başlamadığı artık backend'in `cooldownUntil` alanından okunur.
let cooldownUntil: string | null = null;

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
        status: 'FAILED', failReason: 'BELOW_THRESHOLD', attempts, cooldownUntil,
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

  it('ilk başarısız denemede hemen tekrar denenebileceğini ve günde 2 deneme kuralını söyler (I-08)', async () => {
    attempts = 1;
    cooldownUntil = null;
    await finishExam();
    expect(screen.getByText(/Hemen yeniden başlayabilirsin/)).toBeInTheDocument();
    expect(screen.getByText(/bugün 1 deneme hakkın daha var/)).toBeInTheDocument();
    expect(screen.getByText(/günde en fazla 2 deneme yapılabilir; hakların ertesi gün \(Türkiye saatiyle 00:00\) yenilenir/)).toBeInTheDocument();
    expect(screen.queryByText(/24 saatlik/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Ceza veya bekleme yok/)).not.toBeInTheDocument();
  });

  it('günün ikinci başarısız denemesinde hakların dolduğunu ve ertesi güne kalan süreyi söyler (I-08)', async () => {
    attempts = 2;
    // Backend molayı ertesi gün 00:00'a (İstanbul) kadar yazar; ekran yalnız kalan süreyi okur.
    cooldownUntil = new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString();
    await finishExam();
    expect(screen.getByText(/Bugünkü deneme hakların doldu\. Şimdi bir mola başlıyor; yaklaşık 5 saat sonra yeniden deneyebilirsin/)).toBeInTheDocument();
    expect(screen.queryByText(/Hemen yeniden başlayabilirsin/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Ceza veya bekleme yok/)).not.toBeInTheDocument();
  });
});
