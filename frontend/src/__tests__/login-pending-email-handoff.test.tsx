/**
 * AJ-24 — giriş formu → onay bekleme ekranı yolu: e-posta adres çubuğuna konmaz.
 *
 * Eski davranış: LoginForm `/pending-approval?email=...` ile yönlendiriyordu → e-posta
 * tarayıcı geçmişine ve sunucu/proxy erişim günlüklerine düşüyordu. Yeni: yönlendirme
 * yalın `/pending-approval`, e-posta sekme belleğinde (lib/pendingApprovalEmail) ve
 * bekleme ekranında görünüyor.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LoginForm } from '@/components/organisms/LoginForm';
import PendingApprovalPage from '@/app/pending-approval/page';
import { clearPendingApprovalEmail, readPendingApprovalEmail } from '@/lib/pendingApprovalEmail';

const pushMock = vi.fn();
const loginMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock, replace: vi.fn() }),
  useSearchParams: () => ({ get: () => null }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: null, login: loginMock, logout: vi.fn() }),
}));
vi.mock('@/lib/api/auth', () => ({ authApi: { reapply: vi.fn() } }));
vi.mock('@/components/molecules/OAuthButtons', () => ({ OAuthButtons: () => null }));

const EMAIL = 'aday.kisi@kurum.com';

function submitLogin() {
  fireEvent.change(screen.getByLabelText('E-posta'), { target: { value: EMAIL } });
  fireEvent.change(screen.getByLabelText('Şifre'), { target: { value: 'Gizli-sifre-1' } });
  fireEvent.click(screen.getByRole('button', { name: /giriş yap/i }));
}

/** Yönlendirilen adreste e-postanın hiçbir biçimi (ham / kodlanmış / parametre adı) yok. */
function expectNoEmailInUrl(href: string) {
  expect(href).toBe('/pending-approval');
  expect(href).not.toContain('?');
  expect(href).not.toContain('email');
  expect(href).not.toContain(EMAIL);
  expect(href).not.toContain(encodeURIComponent(EMAIL));
}

beforeEach(() => {
  pushMock.mockReset();
  loginMock.mockReset();
});
afterEach(() => clearPendingApprovalEmail());

describe('AJ-24 · giriş → bekleme ekranı: e-posta URL dışında taşınır', () => {
  it('HESAP_ONAY_BEKLENIYOR (403) → URL e-postasız, e-posta bekleme ekranında görünür', async () => {
    loginMock.mockRejectedValue(
      Object.assign(new Error('Hesabınız onay bekliyor.'), { code: 'HESAP_ONAY_BEKLENIYOR', correctionNote: null }),
    );
    const { unmount } = render(<LoginForm />);
    submitLogin();

    await waitFor(() => expect(pushMock).toHaveBeenCalledTimes(1));
    expectNoEmailInUrl(pushMock.mock.calls[0][0] as string);
    expect(readPendingApprovalEmail()).toBe(EMAIL);

    unmount();
    render(<PendingApprovalPage />);
    expect(await screen.findByText(EMAIL)).toBeInTheDocument();
  });

  it('PENDING kullanıcı başarıyla dönerse de URL e-postasız, e-posta ekranda', async () => {
    loginMock.mockResolvedValue({ role: 'MENTI', approvalStatus: 'PENDING', discType: null });
    const { unmount } = render(<LoginForm />);
    submitLogin();

    await waitFor(() => expect(pushMock).toHaveBeenCalledTimes(1));
    expectNoEmailInUrl(pushMock.mock.calls[0][0] as string);

    unmount();
    render(<PendingApprovalPage />);
    expect(await screen.findByText(EMAIL)).toBeInTheDocument();
  });

  it('onaylı kullanıcı girişinde önceki bekleme e-postası sekme belleğinden silinir', async () => {
    loginMock.mockRejectedValueOnce(
      Object.assign(new Error('Hesabınız onay bekliyor.'), { code: 'HESAP_ONAY_BEKLENIYOR' }),
    );
    const { unmount } = render(<LoginForm />);
    submitLogin();
    await waitFor(() => expect(readPendingApprovalEmail()).toBe(EMAIL));
    unmount();

    loginMock.mockResolvedValue({ role: 'MENTI', approvalStatus: 'APPROVED', discType: 'D' });
    render(<LoginForm />);
    submitLogin();

    await waitFor(() => expect(pushMock).toHaveBeenLastCalledWith('/menti'));
    expect(readPendingApprovalEmail()).toBeNull();
  });
});
