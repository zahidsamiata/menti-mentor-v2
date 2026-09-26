/**
 * Y1-B8 — OAuth dönüşünde onay kapısı: şifreli girişle aynı ekranlar.
 * Backend PENDING/REJECTED hesaba token vermez, durum koduyla /oauth/callback'e yönlenir.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import OAuthCallbackPage from '@/app/oauth/callback/page';
import { oauthErrorRedirect } from '@/lib/oauthCallbackRoute';
import { LOGIN_MESSAGES, resolveOAuthError } from '@/lib/loginMessages';

const params: Record<string, string | null> = {};
const replaceMock = vi.fn();
const loginWithTokensMock = vi.fn();

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: (k: string) => params[k] ?? null }),
  useRouter: () => ({ replace: replaceMock, push: vi.fn() }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ loginWithTokens: loginWithTokensMock }),
}));

describe('Y1-B8 · OAuth callback yönlendirmesi', () => {
  beforeEach(() => {
    for (const k of Object.keys(params)) delete params[k];
    replaceMock.mockReset();
    loginWithTokensMock.mockReset();
  });

  it('HESAP_ONAY_BEKLENIYOR → /pending-approval, oturum AÇILMAZ', async () => {
    params['error'] = 'HESAP_ONAY_BEKLENIYOR';
    render(<OAuthCallbackPage />);
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith('/pending-approval'));
    expect(loginWithTokensMock).not.toHaveBeenCalled();
  });

  it('HESAP_REDDEDILDI → giriş ekranı red mesajıyla, oturum AÇILMAZ', async () => {
    params['error'] = 'HESAP_REDDEDILDI';
    render(<OAuthCallbackPage />);
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith('/login?error=HESAP_REDDEDILDI'));
    expect(loginWithTokensMock).not.toHaveBeenCalled();
    expect(resolveOAuthError('HESAP_REDDEDILDI')).not.toBe(LOGIN_MESSAGES.GENERIC_OAUTH_FAIL);
  });

  it('onaylı kullanıcı (accessToken var) → normal giriş, panele gider (davranış değişmedi)', async () => {
    params['accessToken'] = 'tok';
    loginWithTokensMock.mockResolvedValue(undefined);
    render(<OAuthCallbackPage />);
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith('/dashboard'));
    expect(loginWithTokensMock).toHaveBeenCalledWith('tok', 3600);
  });

  it('diğer hata kodları eskisi gibi giriş ekranına', () => {
    expect(oauthErrorRedirect('PROVIDER_CATISMASI')).toBe('/login?error=PROVIDER_CATISMASI');
  });
});
