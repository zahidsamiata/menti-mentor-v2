import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MentorCertificationPage from '@/app/(dashboard)/mentor/certification/page';
import { formatRemaining, isCooldownActive } from '@/lib/certificationCooldownText';

/**
 * AJ-37 (AN-01 kalanı) — sertifika molasında kişi KALAN SÜREYİ görür ve mola bitene kadar
 * "Yeniden başla" düğmesi kapalıdır. Süre backend'in `cooldownUntil` alanından okunur.
 * Eski davranış: "Kısa bir bekleme sonrası" metni (mola 24 saat) + düğme hep açık.
 */

const MINUTE = 60_000;
const question = {
  code: 'T1_A', topic: 'topic1', variant: 'A', isRedLine: false,
  scenario: 'Deneme sahnesi',
  options: [{ key: 'A', label: 'Seçenek A' }],
};

let certifyResponse: unknown;

const apiMock = vi.fn(async (path: string) => {
  if (path === '/api/scoring/certification/questions') {
    return { ok: true, data: { questions: [question] } };
  }
  if (path === '/api/scoring/certification/answer') {
    return { ok: true, data: { outcome: 'wrong', explanation: 'Açıklama', isRedLine: false, firstAttemptPass: false } };
  }
  if (path === '/api/scoring/certify') return certifyResponse;
  return { ok: false, error: { error: 'X' }, status: 500 };
});

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { role: 'MENTOR', id: 'm1', tenantId: 't1' } }),
}));

function failedResult(cooldownUntil: string | null, attempts = 2) {
  return {
    ok: true,
    data: {
      certScore: 0, passRate: 0, totalTopics: 1, passedTopics: 0, passed: false,
      status: 'FAILED', failReason: 'BELOW_THRESHOLD', attempts, cooldownUntil,
      topicResults: [{ topic: 'topic1', isRedLine: false, firstScore: 0, passed: false }],
    },
  };
}

async function answerAndSubmit() {
  render(<MentorCertificationPage />);
  fireEvent.click(await screen.findByText('Seçenek A'));
  fireEvent.click(await screen.findByText(/Bitir ve değerlendir/));
}

const questionLoads = () => apiMock.mock.calls.filter(([p]) => p === '/api/scoring/certification/questions').length;

describe('Sertifika molası — kalan süre ve yeniden başla kilidi (AJ-37)', () => {
  beforeEach(() => apiMock.mockClear());

  it('mola başladıysa kalan süreyi gösterir, "Yeniden başla" kapalıdır ve tıklama yeni deneme başlatmaz', async () => {
    certifyResponse = failedResult(new Date(Date.now() + (5 * 60 + 30) * MINUTE).toISOString());
    await answerAndSubmit();
    await screen.findByText(/Neredeyse oldu/);

    expect(screen.getByText(/yaklaşık 5 saat 30 dakika sonra yeniden deneyebilirsin/)).toBeInTheDocument();
    expect(screen.getByText(/Yeniden başla düğmesi 5 saat 30 dakika sonra açılır/)).toBeInTheDocument();
    const restartButton = screen.getByRole('button', { name: 'Yeniden başla' });
    expect(restartButton).toBeDisabled();

    const loadsBefore = questionLoads();
    fireEvent.click(restartButton);
    expect(questionLoads()).toBe(loadsBefore);
    expect(screen.getByText(/Neredeyse oldu/)).toBeInTheDocument();
    expect(screen.queryByText(/Kısa bir bekleme/)).not.toBeInTheDocument();
  });

  it('mola yoksa (cooldownUntil null) "Yeniden başla" açıktır ve yeni denemeyi başlatır', async () => {
    certifyResponse = failedResult(null, 1);
    await answerAndSubmit();
    await screen.findByText(/Neredeyse oldu/);

    const restartButton = screen.getByRole('button', { name: 'Yeniden başla' });
    expect(restartButton).toBeEnabled();
    expect(screen.queryByText(/sonra açılır/)).not.toBeInTheDocument();
    const loadsBefore = questionLoads();
    fireEvent.click(restartButton);
    expect(questionLoads()).toBe(loadsBefore + 1);
  });

  it('bitiş anı geçmişteyse mola bitmiş sayılır — düğme açıktır', async () => {
    certifyResponse = failedResult(new Date(Date.now() - MINUTE).toISOString());
    await answerAndSubmit();
    await screen.findByText(/Neredeyse oldu/);
    expect(screen.getByRole('button', { name: 'Yeniden başla' })).toBeEnabled();
    expect(screen.getByText(/Hemen yeniden başlayabilirsin/)).toBeInTheDocument();
  });

  it('mola sürerken gönderilen deneme (COOLDOWN_ACTIVE) kalan süreyi gösterir, "kısa bekleme" demez', async () => {
    certifyResponse = {
      ok: false, status: 409,
      error: {
        error: 'COOLDOWN_ACTIVE', message: 'Bekleme süresi henüz dolmadı.',
        cooldownUntil: new Date(Date.now() + 23 * 60 * MINUTE).toISOString(),
      },
    };
    await answerAndSubmit();
    expect(await screen.findByText(/Yaklaşık 23 saat sonra yeniden deneyebilirsin/)).toBeInTheDocument();
    expect(screen.queryByText(/Kısa bir bekleme/)).not.toBeInTheDocument();
    expect(screen.getByText(/Bu arada: Öğrenme Yolculuğu/)).toBeInTheDocument();
  });
});

describe('certificationCooldownText — saf hesap', () => {
  const now = Date.parse('2026-01-01T00:00:00Z');
  const at = (minutes: number) => new Date(now + minutes * MINUTE).toISOString();

  it('kalan süreyi saat/dakika olarak yazar, dakikayı yukarı yuvarlar, en az 1 dakika der', () => {
    expect(formatRemaining(at(24 * 60), now)).toBe('24 saat');
    expect(formatRemaining(at(90), now)).toBe('1 saat 30 dakika');
    expect(formatRemaining(at(45), now)).toBe('45 dakika');
    expect(formatRemaining(new Date(now + 10_000).toISOString(), now)).toBe('1 dakika');
  });

  it('bitiş anı yoksa, geçmişteyse ya da bozuksa mola aktif sayılmaz', () => {
    expect(isCooldownActive(null, now)).toBe(false);
    expect(isCooldownActive(at(-1), now)).toBe(false);
    expect(isCooldownActive('gecersiz', now)).toBe(false);
    expect(isCooldownActive(at(1), now)).toBe(true);
  });
});
