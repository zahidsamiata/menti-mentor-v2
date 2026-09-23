import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OnboardingContent from '@/app/onboarding/_OnboardingContent';

/**
 * I-02 (madde 141 · arketip §4) — onboarding akış sırası:
 *   Profil → Mizaç Testi → ÜÇ SORU → arketip KARTI (kart EN SONDA).
 * Kart, üç soru bitmeden GÖSTERİLMEZ; üç soru bitince ödül anı olarak gelir.
 */

const push = vi.fn();
// STABİL referanslar (vi.hoisted) — useAuth her render'da AYNI objeyi döndürmeli.
// Aksi halde OnboardingContent'teki useEffect([accessToken, user]) her render'da
// yeniden tetiklenir → sonsuz fetch/setState döngüsü → OOM (CI heap taşması).
const { authValue } = vi.hoisted(() => ({
  authValue: {
    user: { role: 'MENTI', id: 'u1', tenantId: 't1' },
    accessToken: 'tok',
    isLoading: false,
  },
}));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));
vi.mock('@/providers/AuthProvider', () => ({ useAuth: () => authValue }));

vi.mock('@/lib/api/onboarding', () => ({
  // Boş-olmayan dizi: step 1'de spinner yerine DiscTestStep render edilsin (içerik önemsiz, stub'lu).
  fetchDiscQuestions: vi.fn(async () => ({ ok: true, data: { questions: [{ id: 'q1' }] } })),
  submitProfile: vi.fn(async () => ({ ok: true, data: {} })),
  submitDiscAnswers: vi.fn(async () => ({ ok: true, data: { resultCard: { archetype: 'Kâşif' } } })),
  submitMatchingPreferences: vi.fn(async () => ({ ok: true, data: {} })),
}));

// Adım bileşenlerini sadeleştir: her biri tek düğmeyle onComplete/onContinue çağırır.
vi.mock('@/app/onboarding/_steps/ProfileStep', () => ({
  ProfileStep: ({ onComplete }: { onComplete: (d: unknown) => void }) => (
    <button onClick={() => onComplete({})}>PROFIL_DEVAM</button>
  ),
}));
vi.mock('@/app/onboarding/_steps/DiscTestStep', () => ({
  DiscTestStep: ({ onComplete }: { onComplete: (d: unknown) => void }) => (
    <button onClick={() => onComplete([])}>DISC_DEVAM</button>
  ),
}));
vi.mock('@/app/onboarding/_steps/ThreeQuestionsStep', () => ({
  ThreeQuestionsStep: ({ onComplete }: { onComplete: (d: unknown) => void }) => (
    <div>
      <span>UC_SORU_EKRANI</span>
      <button onClick={() => onComplete({})}>UC_SORU_DEVAM</button>
    </div>
  ),
}));
vi.mock('@/app/onboarding/_steps/ResultStep', () => ({
  ResultStep: ({ onContinue }: { onContinue: () => void }) => (
    <div>
      <span>ARKETIP_KARTI</span>
      <button onClick={onContinue}>KART_DEVAM</button>
    </div>
  ),
}));

describe('OnboardingContent — akış sırası (I-02)', () => {
  beforeEach(() => push.mockClear());

  it('kart üç sorudan SONRA gelir; üç soru bitince gösterilir, sonra panele geçilir', async () => {
    render(<OnboardingContent />);

    // Adım 1: profil
    fireEvent.click(await screen.findByText('PROFIL_DEVAM'));
    // Adım 2: DISC
    fireEvent.click(await screen.findByText('DISC_DEVAM'));

    // Adım 3: ÜÇ SORU görünür — KART HENÜZ GÖRÜNMEZ
    await screen.findByText('UC_SORU_EKRANI');
    expect(screen.queryByText('ARKETIP_KARTI')).not.toBeInTheDocument();
    // Ara cümle gösterilir
    expect(screen.getByText(/Son üç soru\. Sonra karakter kartın hazır/)).toBeInTheDocument();

    // Üç soruyu bitir → Adım 4: KART (ödül anı) görünür
    fireEvent.click(screen.getByText('UC_SORU_DEVAM'));
    await screen.findByText('ARKETIP_KARTI');
    expect(screen.queryByText('UC_SORU_EKRANI')).not.toBeInTheDocument();
    // Karttan önce panele gidilmemiş olmalı
    expect(push).not.toHaveBeenCalled();

    // Karttan devam → panele geç
    fireEvent.click(screen.getByText('KART_DEVAM'));
    await waitFor(() => expect(push).toHaveBeenCalledWith('/dashboard'));
  });
});
