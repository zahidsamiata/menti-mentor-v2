/**
 * AJ-72 — Askıdaki kurumun kullanıcısı tek bir askı ekranı görür.
 *
 * Eski davranış: backend her kurum ucunda 403 `KURUM_ASKIDA` + Türkçe cümle dönüyordu
 * (`backend/src/middleware/tenantSuspension.ts` → `TENANT_SUSPENDED_BODY`), ön yüz kodu
 * tanımadığı için kullanıcı sayfa sayfa dağınık genel hata görüyordu; dondurulmuş kurumun
 * yöneticisi girişten sonra panele gidip açıklamasız 403 alıyordu.
 * Yeni: (1) merkezi API istemcisi 403 `KURUM_ASKIDA`'yı tanır → `/kurum-askida`,
 * (2) giriş sonrası dondurulmuş kurumun yöneticisi doğrudan oraya gider,
 * (3) ekran üyeye backend cümlesini AYNEN, yöneticiye yalnız durum cümlesini gösterir.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

const replaceMock = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: replaceMock, push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(''),
}));

const logoutMock = vi.fn();
let authState: { user: { role: string } | null; isLoading: boolean };
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ ...authState, logout: logoutMock }),
}));

const pageApiMock = vi.fn();
vi.mock('@/hooks/useApiClient', () => ({
  useApiClient: () => pageApiMock,
}));

import { apiClient, tenantSuspendedCallbackRef } from '@/lib/api/client';
import { TenantSuspensionRedirect } from '@/providers/TenantSuspensionRedirect';
import TenantSuspendedPage from '@/app/kurum-askida/page';
import {
  TENANT_SUSPENDED_MEMBER_TEXT,
  TENANT_SUSPENDED_PATH,
  TENANT_SUSPENDED_STATUS_TEXT,
} from '@/lib/tenantSuspension';
import {
  getOAuthRedirect,
  getSmartRedirect,
  OAUTH_DEFAULT_PATH,
  TENANT_REVIEW_PATH,
} from '@/lib/postLoginRedirect';

/** Backend'in canlıda döndürdüğü cümle — `backend/src/middleware/tenantSuspension.ts` TENANT_SUSPENDED_BODY.message. */
const BACKEND_SUSPENDED_MESSAGE = 'Kurumunuzun hesabı şu an askıda. Kurum yöneticinizle iletişime geçin.';

function mockFetchOnce(status: number, body: unknown) {
  const fetchMock = vi.fn().mockResolvedValue({
    status,
    ok: status >= 200 && status < 300,
    json: () => Promise.resolve(body),
    headers: new Headers(),
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
  tenantSuspendedCallbackRef.current = null;
});

// ─── 1) Merkezi API istemcisi ──────────────────────────────────────────────────────────────
describe('AJ-72 · apiClient: 403 KURUM_ASKIDA tanınır', () => {
  it('403 KURUM_ASKIDA → askı geri çağrısı bir kez tetiklenir, yanıt çağırana aynen döner', async () => {
    const onSuspended = vi.fn();
    tenantSuspendedCallbackRef.current = onSuspended;
    mockFetchOnce(403, { error: 'KURUM_ASKIDA', message: BACKEND_SUSPENDED_MESSAGE });

    const result = await apiClient('/api/matching/pool', { token: 't', tenantId: 'k1' });

    expect(onSuspended).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      ok: false,
      status: 403,
      error: { error: 'KURUM_ASKIDA', message: BACKEND_SUSPENDED_MESSAGE },
    });
  });

  it.each([
    ['başka bir 403 kodu', 403, { error: 'YETKISIZ', message: 'Bu işlem için yetkiniz yok.' }],
    ['kod aynı ama durum 403 değil', 400, { error: 'KURUM_ASKIDA', message: 'x' }],
    ['başarılı yanıt', 200, { ok: true }],
    ['sunucu hatası', 500, { error: 'SUNUCU_HATASI' }],
  ])('negatif: %s → geri çağrı tetiklenmez (normal akış değişmez)', async (_ad, status, body) => {
    const onSuspended = vi.fn();
    tenantSuspendedCallbackRef.current = onSuspended;
    mockFetchOnce(status, body);
    await apiClient('/api/matching/pool', { token: 't', tenantId: 'k1' });
    expect(onSuspended).not.toHaveBeenCalled();
  });

  it('geri çağrı kurulmamışsa (null) istemci bozulmaz', async () => {
    mockFetchOnce(403, { error: 'KURUM_ASKIDA', message: BACKEND_SUSPENDED_MESSAGE });
    const result = await apiClient('/api/x', {});
    expect(result.ok).toBe(false);
  });
});

// ─── 2) Kök layout yönlendiricisi ──────────────────────────────────────────────────────────
describe('AJ-72 · TenantSuspensionRedirect: 403 KURUM_ASKIDA → /kurum-askida', () => {
  beforeEach(() => {
    replaceMock.mockReset();
    window.history.replaceState(null, '', '/menti');
  });

  it('herhangi bir sayfadaki istek 403 KURUM_ASKIDA alınca askı ekranına yönlendirilir', async () => {
    render(<TenantSuspensionRedirect />);
    mockFetchOnce(403, { error: 'KURUM_ASKIDA', message: BACKEND_SUSPENDED_MESSAGE });

    await apiClient('/api/matching/pool', { token: 't', tenantId: 'k1' });

    expect(replaceMock).toHaveBeenCalledWith(TENANT_SUSPENDED_PATH);
  });

  it('negatif: askı dışı hata yönlendirmez', async () => {
    render(<TenantSuspensionRedirect />);
    mockFetchOnce(403, { error: 'YETKISIZ', message: 'Yetkiniz yok.' });
    await apiClient('/api/matching/pool', { token: 't', tenantId: 'k1' });
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('zaten askı ekranındaysa tekrar yönlendirmez (döngü yok)', async () => {
    window.history.replaceState(null, '', TENANT_SUSPENDED_PATH);
    render(<TenantSuspensionRedirect />);
    mockFetchOnce(403, { error: 'KURUM_ASKIDA', message: BACKEND_SUSPENDED_MESSAGE });
    await apiClient('/api/x', { token: 't', tenantId: 'k1' });
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('bileşen kalkınca geri çağrı temizlenir', () => {
    const { unmount } = render(<TenantSuspensionRedirect />);
    expect(tenantSuspendedCallbackRef.current).not.toBeNull();
    unmount();
    expect(tenantSuspendedCallbackRef.current).toBeNull();
  });
});

// ─── 3) Askı ekranı ────────────────────────────────────────────────────────────────────────
function meSuspended(verificationStatus = 'APPROVED', isSuspended = true) {
  pageApiMock.mockResolvedValue({ ok: true, data: { tenant: { verificationStatus, isSuspended } } });
}

describe('AJ-72 · /kurum-askida ekranı', () => {
  beforeEach(() => {
    replaceMock.mockReset();
    logoutMock.mockReset().mockResolvedValue(undefined);
    pageApiMock.mockReset();
  });

  it('üye metni backend cümlesiyle AYNI', async () => {
    expect(TENANT_SUSPENDED_MEMBER_TEXT).toBe(BACKEND_SUSPENDED_MESSAGE);
    for (const role of ['MENTI', 'MENTOR']) {
      authState = { user: { role }, isLoading: false };
      meSuspended();
      const { unmount } = render(<TenantSuspendedPage />);
      expect(screen.getByTestId('tenant-suspended-message')).toHaveTextContent(BACKEND_SUSPENDED_MESSAGE, {
        normalizeWhitespace: true,
      });
      await waitFor(() => expect(pageApiMock).toHaveBeenCalled());
      unmount();
    }
  });

  it('yönetici metninde "iletişime geçin" YOK — yalnız nötr durum cümlesi', async () => {
    authState = { user: { role: 'ADMIN' }, isLoading: false };
    meSuspended();
    render(<TenantSuspendedPage />);
    const message = screen.getByTestId('tenant-suspended-message');
    expect(message.textContent?.trim()).toBe(TENANT_SUSPENDED_STATUS_TEXT);
    expect(message.textContent).not.toMatch(/iletişime geçin/i);
    await waitFor(() => expect(pageApiMock).toHaveBeenCalled());
  });

  it('çıkış düğmesi oturumu kapatır ve giriş sayfasına götürür', async () => {
    authState = { user: { role: 'MENTI' }, isLoading: false };
    meSuspended();
    render(<TenantSuspendedPage />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /çıkış yap/i }));
    });
    expect(logoutMock).toHaveBeenCalledTimes(1);
    expect(replaceMock).toHaveBeenCalledWith('/login');
  });

  it('kurum durumu askı kapısından muaf /api/auth/me ile, sessiz yenileme tetiklemeden okunur', async () => {
    authState = { user: { role: 'MENTI' }, isLoading: false };
    meSuspended();
    render(<TenantSuspendedPage />);
    await waitFor(() => expect(pageApiMock).toHaveBeenCalledWith('/api/auth/me', { withRefresh: false }));
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it('kurum artık askıda değilse panele döner (kullanıcı burada takılmaz)', async () => {
    authState = { user: { role: 'MENTI' }, isLoading: false };
    meSuspended('APPROVED', false);
    render(<TenantSuspendedPage />);
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(OAUTH_DEFAULT_PATH));
  });

  it('reddedilen kurumun yöneticisi kendi durum ekranına gider (ret ekranı orada)', async () => {
    authState = { user: { role: 'ADMIN' }, isLoading: false };
    meSuspended('REJECTED', true);
    render(<TenantSuspendedPage />);
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(TENANT_REVIEW_PATH));
  });

  it('oturum yoksa giriş sayfasına gider; kurum durumu okunmaz', async () => {
    authState = { user: null, isLoading: false };
    render(<TenantSuspendedPage />);
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith('/login'));
    expect(pageApiMock).not.toHaveBeenCalled();
  });

  it('oturum açılışı sürerken yönlendirme yapılmaz', () => {
    authState = { user: null, isLoading: true };
    render(<TenantSuspendedPage />);
    expect(replaceMock).not.toHaveBeenCalled();
  });
});

// ─── 4) Giriş sonrası yönlendirme ──────────────────────────────────────────────────────────
describe('AJ-72 · giriş sonrası: dondurulmuş kurumun yöneticisi askı ekranına gider', () => {
  const admin = { role: 'ADMIN', approvalStatus: 'APPROVED', discType: 'D' };

  it.each(['APPROVED', 'AUTO_APPROVED', 'CORRECTION_REQUESTED'] as const)(
    '%s ama askıda → iki giriş yolu da /kurum-askida (durum ekranına DEĞİL — giriş döngüsü yok)',
    (status) => {
      const user = { ...admin, tenantVerificationStatus: status, tenantIsSuspended: true };
      expect(getSmartRedirect(user)).toBe(TENANT_SUSPENDED_PATH);
      expect(getOAuthRedirect(user, { isNewUser: false })).toBe(TENANT_SUSPENDED_PATH);
      expect(getOAuthRedirect(user, { isNewUser: true })).toBe(TENANT_SUSPENDED_PATH);
    },
  );

  it('reddedilen kurum (askıda) → durum ekranı öncelikli', () => {
    const user = { ...admin, tenantVerificationStatus: 'REJECTED' as const, tenantIsSuspended: true };
    expect(getSmartRedirect(user)).toBe(TENANT_REVIEW_PATH);
  });

  it('negatif: askıda olmayan / bilinmeyen kurumun yöneticisi eskisi gibi panele gider', () => {
    for (const tenantIsSuspended of [false, null, undefined]) {
      const user = { ...admin, tenantVerificationStatus: 'APPROVED' as const, tenantIsSuspended };
      expect(getSmartRedirect(user)).toBe('/admin/waiting-room');
      expect(getOAuthRedirect(user, { isNewUser: false })).toBe(OAUTH_DEFAULT_PATH);
    }
  });

  it('negatif: yönetici olmayan üyenin giriş hedefi askı bayrağından etkilenmez (askıyı istemci yakalar)', () => {
    const user = { role: 'MENTI', approvalStatus: 'APPROVED', discType: 'S', tenantIsSuspended: true };
    expect(getSmartRedirect(user)).toBe('/menti');
  });
});
