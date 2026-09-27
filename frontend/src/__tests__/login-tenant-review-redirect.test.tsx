/**
 * AJ-35 (U-04 kalanı) — sonradan giriş yapan kurum yöneticisi kurumunun başvuru durumunu görür.
 *
 * Eski davranış: kurum durum ekranı (`/onboarding/stk/pending-review`) yalnız kayıt anında
 * açılıyordu; günler sonra giriş yapan yönetici her durumda panele (`/admin/waiting-room`)
 * gidiyor, "inceleniyor / reddedildi" bilgisini uygulamada görmüyordu.
 * Yeni: yönetici girişinde kurum durumu `/api/auth/me`'den okunur; inceleniyor/reddedildi →
 * durum ekranı. Onaylı ya da düzeltme istenen kurumun yöneticisi panele gider.
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';

const pushMock = vi.fn();
const loginMock = vi.fn();
const apiMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock, replace: vi.fn() }),
  useSearchParams: () => ({ get: () => null }),
}));
vi.mock('@/lib/api/auth', () => ({ authApi: { reapply: vi.fn() } }));
vi.mock('@/components/molecules/OAuthButtons', () => ({ OAuthButtons: () => null }));

const REVIEW_PATH = '/onboarding/stk/pending-review';

// ─── 1) LoginForm yönlendirmesi (login sonucu doğrudan verilir) ────────────────────────────
describe('AJ-35 · LoginForm: kurum yöneticisi kurum durumuna göre yönlendirilir', () => {
  beforeEach(async () => {
    pushMock.mockReset();
    loginMock.mockReset();
    vi.resetModules();
    vi.doMock('@/providers/AuthProvider', () => ({
      useAuth: () => ({ user: null, login: loginMock, logout: vi.fn() }),
    }));
  });

  async function submitAs(result: Record<string, unknown>) {
    const { LoginForm } = await import('@/components/organisms/LoginForm');
    loginMock.mockResolvedValue(result);
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText('E-posta'), { target: { value: 'yonetici@ornek-kurum.test' } });
    fireEvent.change(screen.getByLabelText('Şifre'), { target: { value: 'Gizli-sifre-1' } });
    fireEvent.click(screen.getByRole('button', { name: /giriş yap/i }));
    await waitFor(() => expect(pushMock).toHaveBeenCalledTimes(1));
    return pushMock.mock.calls[0][0] as string;
  }

  const admin = { role: 'ADMIN', approvalStatus: 'APPROVED', discType: 'D' };

  it('inceleme bekleyen kurumun yöneticisi durum ekranına gider (panel değil)', async () => {
    expect(await submitAs({ ...admin, tenantVerificationStatus: 'PENDING_REVIEW' })).toBe(REVIEW_PATH);
  });

  it('reddedilen kurumun yöneticisi durum ekranına gider (panel değil)', async () => {
    expect(await submitAs({ ...admin, tenantVerificationStatus: 'REJECTED' })).toBe(REVIEW_PATH);
  });

  it.each(['APPROVED', 'AUTO_APPROVED', 'CORRECTION_REQUESTED'])(
    '%s kurumun yöneticisi panele gider',
    async (status) => {
      expect(await submitAs({ ...admin, tenantVerificationStatus: status })).toBe('/admin/waiting-room');
    },
  );

  it('kurum durumu okunamazsa (null) eski davranış: panel', async () => {
    expect(await submitAs({ ...admin, tenantVerificationStatus: null })).toBe('/admin/waiting-room');
  });

  it('yönetici olmayan üye kurum durumundan etkilenmez', async () => {
    expect(await submitAs({ role: 'MENTOR', approvalStatus: 'APPROVED', discType: 'S', tenantVerificationStatus: 'PENDING_REVIEW' }))
      .toBe('/mentor');
  });
});

// ─── 2) AuthProvider.login kurum durumunu okur ─────────────────────────────────────────────
describe('AJ-35 · AuthProvider.login: yönetici için kurum durumu /api/auth/me ile okunur', () => {
  beforeEach(() => {
    apiMock.mockReset();
    vi.resetModules();
    vi.doUnmock('@/providers/AuthProvider');
    vi.doMock('@/lib/api/client', () => ({
      apiClient: (...args: unknown[]) => apiMock(...args),
      refreshCallbackRef: { current: null },
    }));
  });

  function mockBackend(role: string, meStatus: string | 'ERROR') {
    apiMock.mockImplementation((path: string) => {
      if (path === '/api/auth/refresh') return Promise.resolve({ ok: false, status: 401, error: {} });
      if (path === '/api/auth/login') {
        return Promise.resolve({
          ok: true,
          data: {
            accessToken: 'yeni-anahtar',
            expiresIn: 3600,
            user: { id: 'u1', tenantId: 't1', role, fullName: 'Deneme Yonetici', email: 'y@ornek-kurum.test',
              approvalStatus: 'APPROVED', discType: 'D', needsOrientation: false, needsReconsent: false },
            tenant: { id: 't1', name: 'Ornek Kurum', slug: 'ornek', logoUrl: null, primaryColor: '#112233' },
          },
        });
      }
      if (path === '/api/auth/me') {
        return Promise.resolve(meStatus === 'ERROR'
          ? { ok: false, status: 500, error: {} }
          : { ok: true, data: { tenant: { verificationStatus: meStatus } } });
      }
      return Promise.resolve({ ok: false, status: 404, error: {} });
    });
  }

  async function loginAndGetResult() {
    const { AuthProvider, useAuth } = await import('@/providers/AuthProvider');
    function Probe() {
      const { login } = useAuth();
      const [out, setOut] = useState('bekliyor');
      return (
        <button onClick={async () => {
          const r = await login({ email: 'y@ornek-kurum.test', password: 'Gizli-sifre-1' });
          setOut(JSON.stringify({ role: r.role, status: r.tenantVerificationStatus ?? 'yok' }));
        }}>{out}</button>
      );
    }
    render(<AuthProvider><Probe /></AuthProvider>);
    await waitFor(() => expect(apiMock).toHaveBeenCalledWith('/api/auth/refresh', expect.anything()));
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByRole('button')).not.toHaveTextContent('bekliyor'));
    return JSON.parse(screen.getByRole('button').textContent ?? '{}') as { role: string; status: string };
  }

  it('yönetici girişinde durum yeni anahtarla /api/auth/me\'den okunur ve döner', async () => {
    mockBackend('ADMIN', 'REJECTED');
    expect(await loginAndGetResult()).toEqual({ role: 'ADMIN', status: 'REJECTED' });
    expect(apiMock).toHaveBeenCalledWith('/api/auth/me', expect.objectContaining({ token: 'yeni-anahtar' }));
  });

  it('durum okunamazsa null döner (giriş bozulmaz)', async () => {
    mockBackend('ADMIN', 'ERROR');
    expect(await loginAndGetResult()).toEqual({ role: 'ADMIN', status: 'yok' });
  });

  it('yönetici olmayan üyede /api/auth/me çağrılmaz', async () => {
    mockBackend('MENTI', 'PENDING_REVIEW');
    expect(await loginAndGetResult()).toEqual({ role: 'MENTI', status: 'yok' });
    expect(apiMock.mock.calls.some((c) => c[0] === '/api/auth/me')).toBe(false);
  });
});
