/**
 * IC-06 — giriş ekranı hesabın varlığını / açılış yöntemini ele vermez.
 *
 * Eski davranış: sosyal giriş dönüşünde "Bu e-posta başka bir yöntemle kayıtlı." yazıyordu;
 * şifre girişinde ekrana backend metni aynen basılıyordu. Yeni: lib/loginMessages
 * üzerinden tek tip, sağlayıcı adı içermeyen mesajlar.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginContent from '@/app/(auth)/login/_LoginContent';
import { LoginForm } from '@/components/organisms/LoginForm';
import { LOGIN_MESSAGES, resolveOAuthError, resolveLoginError } from '@/lib/loginMessages';

const searchMock = { error: null as string | null };
const loginMock = vi.fn();

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: (k: string) => (k === 'error' ? searchMock.error : null) }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ login: loginMock }),
}));
vi.mock('@/lib/api/auth', () => ({ authApi: { reapply: vi.fn() } }));
vi.mock('@/components/molecules/OAuthButtons', () => ({ OAuthButtons: () => null }));

/** Hesap varlığını ya da sağlayıcıyı ele veren ifadeler. */
const LEAK_PATTERN = /kayıtlı|google|linkedin|microsoft|github|şifre ile|devre dışı|sağlayıcıyı kullanın/i;

describe('IC-06 · sosyal giriş dönüş mesajları (enumeration-safe)', () => {
  beforeEach(() => { searchMock.error = null; });

  it.each(['PROVIDER_CATISMASI', 'HESAP_PASIF'])(
    '%s → ekranda sağlayıcı adı / "kayıtlı" ifadesi yok, tek tip mesaj var',
    (code) => {
      searchMock.error = code;
      render(<LoginContent />);
      const alert = screen.getByText(LOGIN_MESSAGES.OAUTH_NOT_ALLOWED);
      expect(alert).toBeInTheDocument();
      expect(document.body.textContent ?? '').not.toMatch(/kayıtlı|google|linkedin|devre dışı/i);
    },
  );

  it('hesaba bağlı kodlar birbirinden ayırt edilemez (aynı metin)', () => {
    expect(resolveOAuthError('PROVIDER_CATISMASI')).toBe(resolveOAuthError('HESAP_PASIF'));
    expect(resolveOAuthError('PROVIDER_CATISMASI')).not.toMatch(LEAK_PATTERN);
  });

  it('bilinmeyen kod → genel mesaj (ham kod ekrana basılmaz)', () => {
    expect(resolveOAuthError('BILINMEYEN_KOD')).toBe(LOGIN_MESSAGES.GENERIC_OAUTH_FAIL);
  });
});

describe('IC-06 · e-posta/şifre girişi (enumeration-safe)', () => {
  beforeEach(() => { loginMock.mockReset(); });

  it('KIMLIK_DOGRULANMADI → backend metni ne olursa olsun sabit tek tip mesaj', async () => {
    loginMock.mockRejectedValue(
      Object.assign(new Error('Bu e-posta adresi GOOGLE ile kayıtlıdır.'), { code: 'KIMLIK_DOGRULANMADI' }),
    );
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText('E-posta'), { target: { value: 'kisi@ornek.com' } });
    fireEvent.change(screen.getByLabelText('Şifre'), { target: { value: 'yanlis-sifre-1' } });
    fireEvent.click(screen.getByRole('button', { name: /giriş yap/i }));

    await waitFor(() => expect(screen.getByText(LOGIN_MESSAGES.INVALID_CREDENTIALS)).toBeInTheDocument());
    expect(screen.queryByText(/kayıtlı/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/google/i)).not.toBeInTheDocument();
  });

  it('kimlik doğrulanamadığında mesaj tek tiptir ve sızıntı ifadesi içermez', () => {
    const a = resolveLoginError('KIMLIK_DOGRULANMADI', 'E-posta veya şifre hatalı.');
    const b = resolveLoginError('KIMLIK_DOGRULANMADI', 'Bu hesap sosyal giriş ile açılmış.');
    expect(a).toBe(b);
    expect(a).not.toMatch(LEAK_PATTERN);
  });
});
