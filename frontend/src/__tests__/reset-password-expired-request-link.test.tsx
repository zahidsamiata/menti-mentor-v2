/**
 * AJ-36 (U-14 kalanı) — süresi dolmuş/geçersiz şifre sıfırlama bağlantısında "yeni bağlantı iste" düğmesi.
 *
 * Eskiden sunucu token'ı reddettiğinde (400 TOKEN_GECERSIZ) ekranda yalnız hata metni ve
 * "Giriş sayfasına dön" vardı; kullanıcı yeni bağlantıyı nereden isteyeceğini bilemiyordu.
 * Artık /forgot-password'a giden "Yeni bağlantı talep et" düğmesi görünür. Token reddi DIŞINDAKİ
 * hatalarda (ör. ağ hatası) düğme görünmez — bağlantı hâlâ geçerli olabilir.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ResetPasswordForm } from '@/components/organisms/ResetPasswordForm';

const resetPasswordMock = vi.fn();
const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));
vi.mock('@/lib/api/auth', () => ({
  authApi: { resetPassword: (...args: unknown[]) => resetPasswordMock(...args) },
}));

const VALID_PASSWORD = 'GucluSifre123!';

function submitNewPassword() {
  fireEvent.change(screen.getByLabelText('Yeni Şifre'), {
    target: { name: 'password', value: VALID_PASSWORD },
  });
  fireEvent.change(screen.getByLabelText('Yeni Şifre (Tekrar)'), {
    target: { name: 'confirmPassword', value: VALID_PASSWORD },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Şifreyi Güncelle' }));
}

describe('Şifre sıfırlama — süresi dolmuş bağlantıda yeni bağlantı düğmesi (AJ-36)', () => {
  beforeEach(() => {
    resetPasswordMock.mockReset();
    pushMock.mockReset();
  });

  it('sunucu token\'ı reddedince "Yeni bağlantı talep et" düğmesi /forgot-password\'a gider', async () => {
    resetPasswordMock.mockResolvedValue({
      ok: false,
      status: 400,
      error: { error: 'TOKEN_GECERSIZ', message: 'Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş.' },
    });

    render(<ResetPasswordForm token="suresi-dolmus-token" />);
    expect(screen.queryByRole('link', { name: 'Yeni bağlantı talep et' })).not.toBeInTheDocument();

    submitNewPassword();

    await waitFor(() => {
      expect(screen.getByText('Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş.')).toBeInTheDocument();
    });
    expect(resetPasswordMock).toHaveBeenCalledWith('suresi-dolmus-token', VALID_PASSWORD);
    expect(screen.getByRole('link', { name: 'Yeni bağlantı talep et' })).toHaveAttribute(
      'href',
      '/forgot-password',
    );
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('token reddi dışındaki hatada (ağ hatası) düğme görünmez', async () => {
    resetPasswordMock.mockResolvedValue({
      ok: false,
      status: 0,
      error: { error: 'NETWORK_ERROR', message: 'Sunucuya ulaşılamıyor.' },
    });

    render(<ResetPasswordForm token="gecerli-token" />);
    submitNewPassword();

    await waitFor(() => {
      expect(screen.getByText('Sunucuya ulaşılamıyor.')).toBeInTheDocument();
    });
    expect(screen.queryByRole('link', { name: 'Yeni bağlantı talep et' })).not.toBeInTheDocument();
  });
});
