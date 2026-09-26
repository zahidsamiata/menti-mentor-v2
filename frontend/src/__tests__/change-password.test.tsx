/**
 * GV-19 — oturum içi şifre değiştirme bölümü + ortak şifre kuralı (backend passwordPolicy aynası).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChangePasswordSection } from '@/components/organisms/ChangePasswordSection';
import {
  changePasswordSchema,
  passwordRule,
  passwordRuleError,
  resetPasswordSchema,
  PASSWORD_MESSAGES,
} from '@/lib/validation';

const authMock: {
  user: { tenantId: string; authProvider?: 'LOCAL' | 'GOOGLE' | 'LINKEDIN' } | null;
  accessToken: string | null;
} = { user: { tenantId: 't1' }, accessToken: 'tok-1' };
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => authMock,
}));

const changePasswordMock = vi.fn();
vi.mock('@/lib/api/auth', () => ({
  authApi: { changePassword: (...args: unknown[]) => changePasswordMock(...args) },
}));

function fill(label: string, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

function fillForm(current: string, next: string, confirm = next) {
  fill('Mevcut şifre', current);
  fill('Yeni şifre', next);
  fill('Yeni şifre (tekrar)', confirm);
}

describe('GV-19: şifre kuralı (frontend)', () => {
  it.each(['Test1234!', 'sifre12345', 'ğüşıöç12'])('geçerli: %s', (pw) => {
    expect(passwordRule.safeParse(pw).success).toBe(true);
  });

  it('yalnız rakam / yalnız harf / kısa / 129 karakter reddedilir', () => {
    expect(passwordRuleError('12345678')).toBe(PASSWORD_MESSAGES.NEEDS_LETTER);
    expect(passwordRuleError('abcdefgh')).toBe(PASSWORD_MESSAGES.NEEDS_DIGIT);
    expect(passwordRuleError('abc12')).toBe(PASSWORD_MESSAGES.TOO_SHORT);
    expect(passwordRuleError(`${'a1'.repeat(64)}x`)).toBe(PASSWORD_MESSAGES.TOO_LONG);
  });

  it('reset formu da aynı kuralı kullanır', () => {
    expect(resetPasswordSchema.safeParse({ password: 'abcdefgh', confirmPassword: 'abcdefgh' }).success).toBe(false);
    expect(resetPasswordSchema.safeParse({ password: 'abcdefg1', confirmPassword: 'abcdefg1' }).success).toBe(true);
  });

  it('değiştirme şeması: tekrar eşleşmeli ve yeni şifre mevcut şifreden farklı olmalı', () => {
    expect(changePasswordSchema.safeParse({ currentPassword: 'Eski1234', newPassword: 'Yeni12345', confirmNewPassword: 'Baska123' }).success).toBe(false);
    expect(changePasswordSchema.safeParse({ currentPassword: 'Ayni1234', newPassword: 'Ayni1234', confirmNewPassword: 'Ayni1234' }).success).toBe(false);
    expect(changePasswordSchema.safeParse({ currentPassword: 'Eski1234', newPassword: 'Yeni12345', confirmNewPassword: 'Yeni12345' }).success).toBe(true);
  });
});

describe('GV-19: ChangePasswordSection', () => {
  beforeEach(() => {
    changePasswordMock.mockReset();
    authMock.user = { tenantId: 't1' };
    authMock.accessToken = 'tok-1';
  });

  it('bölüm ve kural ipucu görünür', () => {
    render(<ChangePasswordSection />);
    expect(screen.getByRole('heading', { name: 'Şifreyi değiştir' })).toBeInTheDocument();
    expect(screen.getByText(/en az bir harf ve bir rakam/)).toBeInTheDocument();
  });

  it('OAuth (Google) hesabında bölüm gösterilmez', () => {
    authMock.user = { tenantId: 't1', authProvider: 'GOOGLE' };
    const { container } = render(<ChangePasswordSection />);
    expect(container).toBeEmptyDOMElement();
  });

  it('zayıf yeni şifre → alan hatası, API çağrılmaz', async () => {
    render(<ChangePasswordSection />);
    fillForm('Eski1234', '12345678');
    fireEvent.click(screen.getByRole('button', { name: 'Şifreyi değiştir' }));

    expect(await screen.findByText(PASSWORD_MESSAGES.NEEDS_LETTER)).toBeInTheDocument();
    expect(changePasswordMock).not.toHaveBeenCalled();
  });

  it('şifreler eşleşmezse API çağrılmaz', async () => {
    render(<ChangePasswordSection />);
    fillForm('Eski1234', 'Yeni12345', 'Yeni12346');
    fireEvent.click(screen.getByRole('button', { name: 'Şifreyi değiştir' }));

    expect(await screen.findByText('Şifreler eşleşmiyor')).toBeInTheDocument();
    expect(changePasswordMock).not.toHaveBeenCalled();
  });

  it('başarılı gönderim → doğru argümanlar, başarı mesajı, alanlar temizlenir', async () => {
    changePasswordMock.mockResolvedValueOnce({
      ok: true,
      data: { message: 'Şifreniz güncellendi. Diğer cihazlardaki oturumlarınız kapatıldı.', currentSessionKept: true, revokedSessions: 1 },
    });
    render(<ChangePasswordSection />);
    fillForm('Eski1234', 'Yeni12345');
    fireEvent.click(screen.getByRole('button', { name: 'Şifreyi değiştir' }));

    await waitFor(() => expect(changePasswordMock).toHaveBeenCalledWith('Eski1234', 'Yeni12345', 'tok-1', 't1'));
    expect(await screen.findByText(/Şifreniz güncellendi/)).toBeInTheDocument();
    expect(screen.getByLabelText('Mevcut şifre')).toHaveValue('');
    expect(screen.getByLabelText('Yeni şifre')).toHaveValue('');
  });

  it('backend hatası (yanlış mevcut şifre) kullanıcıya gösterilir', async () => {
    changePasswordMock.mockResolvedValueOnce({
      ok: false,
      error: { error: 'MEVCUT_SIFRE_HATALI', message: 'Mevcut şifre hatalı.' },
    });
    render(<ChangePasswordSection />);
    fillForm('Yanlis123', 'Yeni12345');
    fireEvent.click(screen.getByRole('button', { name: 'Şifreyi değiştir' }));

    expect(await screen.findByText('Mevcut şifre hatalı.')).toBeInTheDocument();
    expect(screen.queryByText(/Şifreniz güncellendi/)).not.toBeInTheDocument();
  });

  it('OAuth hesabı bilinmiyorsa backend 409 mesajı anlaşılır gösterilir', async () => {
    changePasswordMock.mockResolvedValueOnce({
      ok: false,
      error: { error: 'SIFRE_DEGISTIRILEMEZ', message: 'Hesabınız Google veya LinkedIn ile açıldığı için şifre bu sağlayıcı üzerinden yönetilir.' },
    });
    render(<ChangePasswordSection />);
    fillForm('Herhangi1', 'Yeni12345');
    fireEvent.click(screen.getByRole('button', { name: 'Şifreyi değiştir' }));

    expect(await screen.findByText(/Google veya LinkedIn/)).toBeInTheDocument();
  });
});
