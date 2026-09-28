/**
 * P-08 (panel denetimi M8) — Öğrenme Yolculuğu ilerlemesi kalıcı.
 *
 * Ölçüt: menti yolculukta kaçıncı aşamada olduğunu kalıcı görür.
 *  - Sayfa yeniden açılınca (yenileme = yeni mount) sunucudaki ilerlemeden KALDIĞI aşamadan başlar;
 *  - aşama geçilince ilerleme sunucuya yazılır (POST .../stages/:id/progress);
 *  - panel kartı "Aşama X/Y · sıradaki: …" ve "Kaldığın yerden devam et" gösterir.
 * Negatif: hiç başlamamış / tamamlamış kişide kart eski metinlerini korur; tamamlamış kişi
 * sayfayı baştan açar.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LearningJourneyPage from '@/app/(dashboard)/learning-journey/page';
import { LearningJourneyCard } from '@/components/organisms/LearningJourneyCard';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { id: 'menti-1', role: 'MENTI' }, isLoading: false }),
}));

const STAGES = [
  { id: 's1', order: 0, title: 'Tanışma', situationText: 'Birinci durum.', learningGoal: '', isStkSpecific: false, choices: [{ key: 'a', label: 'Bir seçenek' }] },
  { id: 's2', order: 1, title: 'İlk görüşme', situationText: 'İkinci durum.', learningGoal: '', isStkSpecific: false, choices: [{ key: 'a', label: 'Bir seçenek' }] },
  { id: 's3', order: 2, title: 'Hedef koyma', situationText: 'Üçüncü durum.', learningGoal: '', isStkSpecific: false, choices: [{ key: 'a', label: 'Bir seçenek' }] },
];

let status: Record<string, unknown>;

function statusWith(done: string[], completed = false) {
  const nextIdx = STAGES.findIndex((s) => !done.includes(s.id));
  const next = nextIdx >= 0 ? STAGES[nextIdx] : undefined;
  return {
    audience: 'MENTI',
    completed,
    completedAt: completed ? '2026-09-01T00:00:00.000Z' : null,
    totalStages: STAGES.length,
    completedStages: done.length,
    completedStageIds: done,
    nextStage: next ? { id: next.id, title: next.title, index: nextIdx } : null,
  };
}

const apiMock = vi.fn<(path: string, opts?: { method?: string }) => Promise<unknown>>(async (path) => {
  if (path === '/api/learning-journey/stages') {
    return { ok: true, data: { audience: 'MENTI', frame: { journeyTitle: 'İlk Mentörünle Yolculuk', intro: 'Giriş', closing: 'Kapanış' }, items: STAGES, total: 3 } };
  }
  if (path === '/api/learning-journey/status') return { ok: true, data: status };
  if (path.endsWith('/select')) return { ok: true, data: { key: 'a', outcome: 'correct', feedback: 'Güzel düşündün.' } };
  if (path.endsWith('/progress')) return { ok: true, data: { completedStages: 2, totalStages: 3, nextStage: null } };
  return { ok: false, error: { error: 'NOT_MOCKED', message: 'yok' }, status: 404 };
});
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));

function progressCalls() {
  return apiMock.mock.calls.filter(([p]) => p.endsWith('/progress'));
}

describe('P-08 — yolculuk sayfası kaldığı aşamadan açılır', () => {
  beforeEach(() => {
    apiMock.mockClear();
  });

  it('yenileme sonrası (yeni mount) 1 aşama geçilmişse 2. aşamadan başlar', async () => {
    status = statusWith(['s1']);
    const first = render(<LearningJourneyPage />);
    expect(await screen.findByText(/İkinci durum\./)).toBeInTheDocument();
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    first.unmount();

    // "Yenileme": sunucu artık 2 aşama geçildi diyor → yeni mount 3. aşamadan açılır
    status = statusWith(['s1', 's2']);
    render(<LearningJourneyPage />);
    expect(await screen.findByText(/Üçüncü durum\./)).toBeInTheDocument();
    expect(screen.getByText('3 / 3')).toBeInTheDocument();
    expect(screen.queryByText(/Birinci durum\./)).not.toBeInTheDocument();
  });

  it('aşama geçilince ilerleme sunucuya yazılır (seçimden önce yazılmaz)', async () => {
    status = statusWith(['s1']);
    render(<LearningJourneyPage />);
    fireEvent.click(await screen.findByText('Bir seçenek'));
    await screen.findByText('Güzel düşündün.');
    expect(progressCalls()).toHaveLength(0);

    fireEvent.click(screen.getByRole('button', { name: 'Sonraki →' }));
    await waitFor(() => expect(progressCalls()).toHaveLength(1));
    expect(progressCalls()[0]?.[0]).toBe('/api/learning-journey/stages/s2/progress');
    expect(progressCalls()[0]?.[1]).toMatchObject({ method: 'POST' });
    expect(await screen.findByText(/Üçüncü durum\./)).toBeInTheDocument();
  });

  it('hepsi geçilmiş ama tamamlanmamışsa kapanış ekranı açılır', async () => {
    status = statusWith(['s1', 's2', 's3']);
    render(<LearningJourneyPage />);
    expect(await screen.findByText('Yolculuğu tamamladın!')).toBeInTheDocument();
  });

  it('negatif: yolculuğu tamamlamış kişi tekrar bakınca baştan başlar', async () => {
    status = statusWith(['s1', 's2', 's3'], true);
    render(<LearningJourneyPage />);
    expect(await screen.findByText(/Birinci durum\./)).toBeInTheDocument();
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });
});

describe('P-08 — panel kartı "neredeyim, sıradaki adım"', () => {
  beforeEach(() => {
    apiMock.mockClear();
  });

  it('yarıdaki menti "Aşama 2/3 · sıradaki: İlk görüşme" ve "Kaldığın yerden devam et" görür', async () => {
    status = statusWith(['s1']);
    render(<LearningJourneyCard />);
    expect(await screen.findByText('Aşama 2/3 · sıradaki: İlk görüşme')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Kaldığın yerden devam et →' })).toHaveAttribute('href', '/learning-journey');
  });

  it('negatif: hiç başlamamış menti eski "Yolculuğa başla" kartını görür', async () => {
    status = statusWith([]);
    render(<LearningJourneyCard />);
    expect(await screen.findByRole('link', { name: 'Yolculuğa başla →' })).toBeInTheDocument();
    expect(screen.queryByText(/sıradaki:/)).not.toBeInTheDocument();
  });

  it('negatif: tamamlamış menti "Tamamlandı" görür, aşama satırı görmez', async () => {
    status = statusWith(['s1', 's2', 's3'], true);
    render(<LearningJourneyCard />);
    expect(await screen.findByText('Tamamlandı ✓')).toBeInTheDocument();
    expect(screen.queryByText(/Aşama \d\/\d/)).not.toBeInTheDocument();
  });
});
