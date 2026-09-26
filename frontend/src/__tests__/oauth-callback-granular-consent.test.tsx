/**
 * AN-30 / KARAR-34 (OAuth ayağı, 2026-09-26) — `/oauth/callback` sayfası.
 *
 * `pendingConsentToken` query param'ı VARKEN granüler rıza ekranı gösterilir ve
 * `authApi.completeOAuthRegistration` ile kayıt tamamlanır. Bu param YOKKEN (flag kapalı
 * senaryo — bugünkü canlı davranış) eski `accessToken` akışı BİREBİR aynı çalışmaya devam
 * eder (regresyon testi de bu dosyada).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

let currentParams: Record<string, string> = {};

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: routerReplaceMock }),
  useSearchParams: () => ({ get: (k: string) => currentParams[k] ?? null }),
}));

const { routerReplaceMock, loginWithTokensMock, completeOAuthRegistrationMock } = vi.hoisted(() => ({
  routerReplaceMock: vi.fn(),
  loginWithTokensMock: vi.fn(),
  completeOAuthRegistrationMock: vi.fn(),
}));

vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ loginWithTokens: loginWithTokensMock }),
}));

vi.mock('@/lib/api/auth', () => ({
  authApi: { completeOAuthRegistration: completeOAuthRegistrationMock },
}));

import OAuthCallbackPage from '@/app/oauth/callback/page';

describe('/oauth/callback — pendingConsentToken VARKEN (AN-30 OAuth ayağı)', () => {
  beforeEach(() => {
    currentParams = { pendingConsentToken: 'pending-tok-123' };
    routerReplaceMock.mockReset();
    loginWithTokensMock.mockReset().mockResolvedValue(undefined);
    completeOAuthRegistrationMock.mockReset();
  });

  it('granüler rıza formu render edilir, accessToken akışı (loginWithTokens) TETİKLENMEZ', async () => {
    render(<OAuthCallbackPage />);
    await waitFor(() => expect(screen.getByText(/son bir adım kaldı/i)).toBeInTheDocument());
    expect(screen.getAllByRole('checkbox')).toHaveLength(6);
    expect(loginWithTokensMock).not.toHaveBeenCalled();
  });

  it('zorunlu maddeler işaretlenmeden "Devam Et" butonu disabled kalır', async () => {
    render(<OAuthCallbackPage />);
    await waitFor(() => expect(screen.getByText(/son bir adım kaldı/i)).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /devam et/i })).toBeDisabled();
  });

  it('zorunlu 4 madde işaretlenince buton aktif olur, submit → doğru API çağrısı + başarılı girişte yönlendirme', async () => {
    completeOAuthRegistrationMock.mockResolvedValue({
      ok: true,
      data: { accessToken: 'new-access-token', isNewUser: true },
    });

    render(<OAuthCallbackPage />);
    await waitFor(() => expect(screen.getByText(/son bir adım kaldı/i)).toBeInTheDocument());

    const checkboxes = screen.getAllByRole('checkbox');
    // İlk 4 checkbox zorunlu grup (bkz. GranularConsentForm MANDATORY_ITEMS sırası)
    checkboxes.slice(0, 4).forEach((cb) => fireEvent.click(cb));

    const submitBtn = screen.getByRole('button', { name: /devam et/i });
    expect(submitBtn).not.toBeDisabled();
    fireEvent.click(submitBtn);

    await waitFor(() => expect(completeOAuthRegistrationMock).toHaveBeenCalledTimes(1));
    const payload = completeOAuthRegistrationMock.mock.calls[0][0];
    expect(payload.pendingToken).toBe('pending-tok-123');
    expect(payload.granularConsent).toMatchObject({
      discMatching: true,
      foreignStorage: true,
      dataProcessing: true,
      anonymizedImprovement: true,
    });

    await waitFor(() => expect(loginWithTokensMock).toHaveBeenCalledWith('new-access-token', 3600));
    await waitFor(() => expect(routerReplaceMock).toHaveBeenCalledWith('/dashboard?welcome=1'));
  });

  it('backend hatası ekranda gösterilir, yönlendirme YAPILMAZ', async () => {
    completeOAuthRegistrationMock.mockResolvedValue({
      ok: false,
      error: { error: 'PENDING_TOKEN_GECERSIZ', message: undefined },
      status: 400,
    });

    render(<OAuthCallbackPage />);
    await waitFor(() => expect(screen.getByText(/son bir adım kaldı/i)).toBeInTheDocument());

    screen.getAllByRole('checkbox').slice(0, 4).forEach((cb) => fireEvent.click(cb));
    fireEvent.click(screen.getByRole('button', { name: /devam et/i }));

    await waitFor(() =>
      expect(screen.getByText(/kayıt bağlantınızın süresi doldu/i)).toBeInTheDocument(),
    );
    expect(loginWithTokensMock).not.toHaveBeenCalled();
    expect(routerReplaceMock).not.toHaveBeenCalled();
  });
});

describe('/oauth/callback — pendingConsentToken YOK (regresyon: mevcut accessToken akışı)', () => {
  beforeEach(() => {
    currentParams = { accessToken: 'existing-flow-token', isNewUser: 'true' };
    routerReplaceMock.mockReset();
    loginWithTokensMock.mockReset().mockResolvedValue(undefined);
    completeOAuthRegistrationMock.mockReset();
  });

  it('granüler form YOK; loginWithTokens eski parametrelerle çağrılır ve /dashboard?welcome=1\'e yönlendirir', async () => {
    render(<OAuthCallbackPage />);
    await waitFor(() => expect(loginWithTokensMock).toHaveBeenCalledWith('existing-flow-token', 3600));
    await waitFor(() => expect(routerReplaceMock).toHaveBeenCalledWith('/dashboard?welcome=1'));
    expect(screen.queryByText(/son bir adım kaldı/i)).not.toBeInTheDocument();
    expect(completeOAuthRegistrationMock).not.toHaveBeenCalled();
  });

  it('error param varsa /login?error=...\'e yönlendirir (pendingConsentToken yokken davranış aynı)', async () => {
    currentParams = { error: 'KULLANICI_REDDETTI' };
    render(<OAuthCallbackPage />);
    await waitFor(() => expect(routerReplaceMock).toHaveBeenCalledWith('/login?error=KULLANICI_REDDETTI'));
    expect(loginWithTokensMock).not.toHaveBeenCalled();
  });
});
