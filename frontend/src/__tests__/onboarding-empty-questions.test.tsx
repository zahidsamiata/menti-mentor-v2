import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import OnboardingContent from '@/app/onboarding/_OnboardingContent';
import { DiscTestStep } from '@/app/onboarding/_steps/DiscTestStep';

/**
 * PS-11 — /onboarding adım 2 (Mizaç Testi) boş soru listesi:
 *   - boş liste gelirse sonsuz dönen gösterge YERİNE anlaşılır boş durum mesajı,
 *   - ilerleme yüzdesi NaN OLMAZ (0'a bölme koruması),
 *   - dolu listede davranış değişmez (sorular görünür).
 */

// STABİL referans — useAuth her render'da aynı objeyi dönmeli (bkz. onboarding-order.test).
const { authValue, fetchDiscQuestions } = vi.hoisted(() => ({
  authValue: {
    user: { role: 'MENTI', id: 'u1', tenantId: 't1' },
    accessToken: 'tok',
    isLoading: false,
  },
  fetchDiscQuestions: vi.fn(),
}));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock('@/providers/AuthProvider', () => ({ useAuth: () => authValue }));
vi.mock('@/lib/api/onboarding', () => ({
  fetchDiscQuestions,
  submitProfile: vi.fn(async () => ({ ok: true, data: {} })),
  submitDiscAnswers: vi.fn(async () => ({ ok: true, data: { resultCard: {} } })),
  submitMatchingPreferences: vi.fn(async () => ({ ok: true, data: {} })),
}));
// Profil adımı tek düğmeyle geçilir; DiscTestStep GERÇEK bileşen (NaN kontrolü için).
vi.mock('@/app/onboarding/_steps/ProfileStep', () => ({
  ProfileStep: ({ onComplete }: { onComplete: (d: unknown) => void }) => (
    <button onClick={() => onComplete({})}>PROFIL_DEVAM</button>
  ),
}));

const SAMPLE_QUESTION = {
  id: 1,
  text: 'Ekip toplantısında beklenmedik bir sorun çıktı.',
  options: { A: 'Hemen yönetirim', B: 'Ekibi toplarım', C: 'Dinlerim', D: 'Analiz ederim' },
};

describe('Onboarding — boş soru listesi (PS-11)', () => {
  beforeEach(() => fetchDiscQuestions.mockReset());

  it('boş listede boş durum mesajı görünür, gösterge dönmez, ekranda NaN yok', async () => {
    fetchDiscQuestions.mockResolvedValue({ ok: true, data: { questions: [], total: 0 } });
    const { container } = render(<OnboardingContent />);

    fireEvent.click(await screen.findByText('PROFIL_DEVAM'));

    expect(await screen.findByText('Şu an gösterilecek soru yok')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Yeniden dene' })).toBeInTheDocument();
    expect(container.querySelector('.animate-spin')).toBeNull();
    expect(container.textContent).not.toContain('NaN');
  });

  it('dolu listede sorular görünür, boş durum mesajı yok, yüzde NaN değil', async () => {
    fetchDiscQuestions.mockResolvedValue({ ok: true, data: { questions: [SAMPLE_QUESTION], total: 1 } });
    const { container } = render(<OnboardingContent />);

    fireEvent.click(await screen.findByText('PROFIL_DEVAM'));

    expect(await screen.findByText(SAMPLE_QUESTION.text)).toBeInTheDocument();
    expect(screen.queryByText('Şu an gösterilecek soru yok')).not.toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    expect(container.textContent).not.toContain('NaN');
  });

  it('DiscTestStep boş listede NaN üretmez ve çökmez', () => {
    const { container } = render(
      <DiscTestStep questions={[]} onComplete={vi.fn()} isSubmitting={false} error={null} />,
    );
    expect(container.textContent).not.toContain('NaN');
    expect(container.innerHTML).not.toContain('NaN');
  });
});
