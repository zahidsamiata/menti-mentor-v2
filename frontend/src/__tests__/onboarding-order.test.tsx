import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import OnboardingContent from '@/app/onboarding/_OnboardingContent';
import { CARD_REVEAL_DELAY_MS, CARD_REVEAL_STATUS_TEXT } from '@/lib/onboardingReveal';

/**
 * I-02 (madde 141 · arketip §4) — onboarding akış sırası:
 *   Profil → Mizaç Testi → ÜÇ SORU → arketip KARTI (kart EN SONDA).
 * Kart, üç soru bitmeden GÖSTERİLMEZ; üç soru bitince ödül anı olarak gelir.
 *
 * AJ-70 (madde 141 PO ek önlemi 2): kart, üç sorudan sonra KISA bir geçiş ekranıyla açılır
 * (ekran okuyucuya `role="status"` ile duyurulur); `prefers-reduced-motion`'da geçiş yok.
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

function mockReducedMotion(reduce: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: reduce && query.includes('prefers-reduced-motion: reduce'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      onchange: null,
      dispatchEvent: vi.fn(),
    })),
  });
}

/** Profil + DISC adımlarını geçip üç soru ekranına gelir (gerçek zamanlayıcılarla). */
async function goToThreeQuestions() {
  const view = render(<OnboardingContent />);
  fireEvent.click(await screen.findByText('PROFIL_DEVAM'));
  fireEvent.click(await screen.findByText('DISC_DEVAM'));
  await screen.findByText('UC_SORU_EKRANI');
  return view;
}

/** Üç soruyu gönderir ve kaydetme sözünün (mock) çözülmesini sahte zamanlayıcıda bekler. */
async function submitThreeQuestionsWithFakeTimers() {
  vi.useFakeTimers();
  fireEvent.click(screen.getByText('UC_SORU_DEVAM'));
  await act(async () => {});
}

describe('OnboardingContent — akış sırası (I-02) + kart öncesi geçiş (AJ-70)', () => {
  beforeEach(() => {
    push.mockClear();
    mockReducedMotion(false);
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('sıra: üç soru → kısa geçiş (durum duyurusu) → kart; sonra panele geçilir', async () => {
    await goToThreeQuestions();

    // Adım 3: ÜÇ SORU görünür — KART HENÜZ GÖRÜNMEZ
    expect(screen.queryByText('ARKETIP_KARTI')).not.toBeInTheDocument();
    // Ara cümle gösterilir
    expect(screen.getByText(/Son üç soru\. Sonra karakter kartın hazır/)).toBeInTheDocument();

    // Üç soruyu bitir → önce GEÇİŞ: form kalkar, durum duyurulur, kart henüz yok
    await submitThreeQuestionsWithFakeTimers();
    expect(screen.queryByText('UC_SORU_EKRANI')).not.toBeInTheDocument();
    const status = screen.getByRole('status');
    expect(status).toHaveTextContent(CARD_REVEAL_STATUS_TEXT);
    expect(screen.queryByText('ARKETIP_KARTI')).not.toBeInTheDocument();

    // Süre dolmadan kart açılmaz
    act(() => { vi.advanceTimersByTime(CARD_REVEAL_DELAY_MS - 1); });
    expect(screen.queryByText('ARKETIP_KARTI')).not.toBeInTheDocument();

    // Süre dolunca KART (ödül anı) açılır, geçiş ekranı kalkar
    act(() => { vi.advanceTimersByTime(1); });
    expect(screen.getByText('ARKETIP_KARTI')).toBeInTheDocument();
    expect(screen.queryByText(CARD_REVEAL_STATUS_TEXT)).not.toBeInTheDocument();
    expect(screen.queryByText('UC_SORU_EKRANI')).not.toBeInTheDocument();
    // Karttan önce panele gidilmemiş olmalı
    expect(push).not.toHaveBeenCalled();

    vi.useRealTimers();
    // Karttan devam → panele geç
    fireEvent.click(screen.getByText('KART_DEVAM'));
    await waitFor(() => expect(push).toHaveBeenCalledWith('/dashboard'));
  });

  it('prefers-reduced-motion: geçiş ekranı yok, kart hemen açılır', async () => {
    mockReducedMotion(true);
    await goToThreeQuestions();

    await submitThreeQuestionsWithFakeTimers();
    // Zamanlayıcı ilerletilmeden kart görünür; geçiş/durum ekranı hiç gösterilmez
    expect(screen.getByText('ARKETIP_KARTI')).toBeInTheDocument();
    expect(screen.queryByText(CARD_REVEAL_STATUS_TEXT)).not.toBeInTheDocument();
    expect(screen.queryByText('UC_SORU_EKRANI')).not.toBeInTheDocument();
  });

  it('geçiş kısa tutulur — kullanıcıyı bekleten uzun gecikme yok', () => {
    expect(CARD_REVEAL_DELAY_MS).toBeGreaterThan(0);
    expect(CARD_REVEAL_DELAY_MS).toBeLessThanOrEqual(1500);
  });

  it('geçiş sürerken sayfadan çıkılırsa bekleyen zamanlayıcı temizlenir', async () => {
    const { unmount } = await goToThreeQuestions();
    await submitThreeQuestionsWithFakeTimers();
    expect(screen.getByRole('status')).toHaveTextContent(CARD_REVEAL_STATUS_TEXT);
    expect(vi.getTimerCount()).toBe(1);

    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
