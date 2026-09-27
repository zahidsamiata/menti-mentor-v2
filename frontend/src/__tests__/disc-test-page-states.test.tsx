/**
 * K-02 (AJ-45) — /disc-test SAYFA dalları.
 *
 * useDiscTest.test.tsx yalnız hook'u ölçüyordu; asıl kök neden sayfadaki koşuldu
 * (`disc-test/page.tsx` eskiden `questions.length === 0` → iskelet). Bu test sayfayı
 * render eder ve üç durumu ayrı ayrı ölçer: yükleniyor → iskelet · yükleme hatası →
 * "Test yüklenemedi" + Tekrar dene · boş havuz → bilgilendirme. Eski koşula dönülürse
 * hata/boş durumlar yine sonsuz iskelete düşer ve bu testler kırılır.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DiscTestPage from '@/app/(dashboard)/disc-test/page';

const reload = vi.fn();
const hookState = {
  loading: false,
  questions: [] as Array<{ id: string }>,
  error: null as string | null,
};

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { id: 'u1', tenantId: 't1' }, accessToken: 'tok' }),
}));
vi.mock('@/providers/TenantProvider', () => ({
  useTenant: () => ({ tenant: { id: 't1', name: 'test' } }),
}));
vi.mock('@/components/organisms/DiscTestCard', () => ({
  DiscTestCard: () => <div data-testid="disc-card" />,
}));
vi.mock('@/hooks/useDiscTest', () => ({
  useDiscTest: () => ({
    state: {
      loading: hookState.loading,
      questions: hookState.questions,
      currentIndex: 0,
      meta: null,
      phaseJustChanged: false,
      isSubmitting: false,
    },
    currentQuestion: hookState.questions[0] ?? null,
    progressPercent: 0,
    answer: vi.fn(),
    error: hookState.error,
    reload,
  }),
}));

describe('/disc-test sayfa dalları (K-02)', () => {
  beforeEach(() => {
    reload.mockReset();
    hookState.loading = false;
    hookState.questions = [];
    hookState.error = null;
  });

  it('yükleme sürerken iskelet gösterilir, hata/boş metni görünmez', () => {
    hookState.loading = true;
    const { container } = render(<DiscTestPage />);
    expect(container.querySelector('.animate-pulse')).not.toBeNull();
    expect(screen.queryByText('Test yüklenemedi')).not.toBeInTheDocument();
    expect(screen.queryByText('Şu an aktif test sorusu yok')).not.toBeInTheDocument();
  });

  it('yükleme hatasında iskelet yerine hata mesajı + Tekrar dene gösterilir', async () => {
    hookState.error = 'Sorular alınamadı';
    const { container } = render(<DiscTestPage />);
    expect(screen.getByText('Test yüklenemedi')).toBeInTheDocument();
    expect(screen.getByText('Sorular alınamadı')).toBeInTheDocument();
    expect(container.querySelector('.animate-pulse')).toBeNull();

    await userEvent.setup().click(screen.getByRole('button', { name: 'Tekrar dene' }));
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it('sorular yüklendi ama havuz boşsa iskelet yerine bilgilendirme gösterilir', () => {
    const { container } = render(<DiscTestPage />);
    expect(screen.getByText('Şu an aktif test sorusu yok')).toBeInTheDocument();
    expect(container.querySelector('.animate-pulse')).toBeNull();
  });

  it('sorular varsa soru kartı gösterilir', () => {
    hookState.questions = [{ id: 'q1' }];
    render(<DiscTestPage />);
    expect(screen.getByTestId('disc-card')).toBeInTheDocument();
  });
});
