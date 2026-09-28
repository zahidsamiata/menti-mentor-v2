/**
 * AJ-59 — sosyal girişle (Google / LinkedIn) dönen kurum yöneticisi, e-posta girişiyle AYNI
 * kurala göre yönlendirilir.
 *
 * Eski davranış: callback sayfası herkesi `/dashboard`'a gönderiyordu; kurumu inceleme bekleyen
 * ya da reddedilen yönetici durum ekranını görmüyordu (e-posta girişinde görüyordu — AJ-35).
 * Yeni: hedef ortak `lib/postLoginRedirect` modülünden seçilir; yöneticide kurum durumu
 * `/api/auth/me`'den bir kez okunur (ikinci refresh YOK — AJ-73).
 *
 * 1) Saf fonksiyon birim testleri · 2) gerçek AuthProvider + gerçek callback sayfası (ağ sahte).
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { AuthProvider } from '@/providers/AuthProvider';
import OAuthCallbackPage from '@/app/oauth/callback/page';
import {
  getOAuthRedirect,
  getSmartRedirect,
  getTenantReviewRedirect,
  OAUTH_DEFAULT_PATH,
  OAUTH_WELCOME_PATH,
  TENANT_REVIEW_PATH,
} from '@/lib/postLoginRedirect';
import type { TenantVerificationStatus } from '@/lib/api/selfServe';

const apiMock = vi.fn();
const replaceMock = vi.fn();
let currentSearch = '';

vi.mock('@/lib/api/client', () => ({
  apiClient: (...args: unknown[]) => apiMock(...args),
  refreshCallbackRef: { current: null },
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: replaceMock, push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(currentSearch),
}));

const ALL_STATUSES: TenantVerificationStatus[] = [
  'AUTO_APPROVED', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'CORRECTION_REQUESTED',
];

// ─── 1) Saf fonksiyonlar ───────────────────────────────────────────────────────────────────
describe('AJ-59 · postLoginRedirect saf kurallar', () => {
  it.each(['PENDING_REVIEW', 'REJECTED'] as const)('%s kurumun yöneticisi → durum ekranı', (status) => {
    expect(getTenantReviewRedirect({ role: 'ADMIN', tenantVerificationStatus: status })).toBe(TENANT_REVIEW_PATH);
    expect(getOAuthRedirect({ role: 'ADMIN', tenantVerificationStatus: status }, { isNewUser: false })).toBe(TENANT_REVIEW_PATH);
    expect(getOAuthRedirect({ role: 'ADMIN', tenantVerificationStatus: status }, { isNewUser: true })).toBe(TENANT_REVIEW_PATH);
  });

  it.each(['APPROVED', 'AUTO_APPROVED', 'CORRECTION_REQUESTED'] as const)(
    '%s kurumun yöneticisi durum ekranına GİTMEZ (dondurulmuş/onaylı kurum döngüye girmez)',
    (status) => {
      expect(getTenantReviewRedirect({ role: 'ADMIN', tenantVerificationStatus: status })).toBeNull();
      expect(getOAuthRedirect({ role: 'ADMIN', tenantVerificationStatus: status }, { isNewUser: false })).toBe(OAUTH_DEFAULT_PATH);
    },
  );

  it('kurum durumu okunamazsa (null/undefined) eski davranış', () => {
    expect(getOAuthRedirect({ role: 'ADMIN', tenantVerificationStatus: null }, { isNewUser: false })).toBe(OAUTH_DEFAULT_PATH);
    expect(getOAuthRedirect({ role: 'ADMIN' }, { isNewUser: true })).toBe(OAUTH_WELCOME_PATH);
  });

  it('yönetici olmayan üye kurum durumundan etkilenmez', () => {
    for (const role of ['MENTOR', 'MENTI']) {
      expect(getTenantReviewRedirect({ role, tenantVerificationStatus: 'PENDING_REVIEW' })).toBeNull();
      expect(getOAuthRedirect({ role, tenantVerificationStatus: 'REJECTED' }, { isNewUser: false })).toBe(OAUTH_DEFAULT_PATH);
      expect(getOAuthRedirect({ role, tenantVerificationStatus: 'REJECTED' }, { isNewUser: true })).toBe(OAUTH_WELCOME_PATH);
    }
  });

  it('iki giriş yolu kurum durum ekranı kararında her durumda AYNI sonucu verir', () => {
    for (const status of [...ALL_STATUSES, null]) {
      const admin = { role: 'ADMIN', approvalStatus: 'APPROVED', discType: 'D', tenantVerificationStatus: status };
      const emailGoesToReview = getSmartRedirect(admin) === TENANT_REVIEW_PATH;
      for (const isNewUser of [false, true]) {
        expect(getOAuthRedirect(admin, { isNewUser }) === TENANT_REVIEW_PATH).toBe(emailGoesToReview);
      }
    }
  });
});

// ─── 2) Callback sayfası ───────────────────────────────────────────────────────────────────
function refreshOk(role: string) {
  return {
    ok: true,
    data: {
      accessToken: 'cerezden-gelen-anahtar',
      expiresIn: 3600,
      user: {
        id: 'u1', tenantId: 't1', role, fullName: 'Deneme Kişi', email: 'd@example.com',
        approvalStatus: 'APPROVED', discType: 'D', discLetters: 'D', needsOrientation: false,
      },
      tenant: null,
    },
  };
}

/** refresh + (isteğe bağlı) /api/auth/me yanıtları. `me: 'ERROR'` → 500. */
function mockBackend(role: string, me?: { verificationStatus: TenantVerificationStatus; isSuspended?: boolean } | 'ERROR') {
  apiMock.mockImplementation((path: string) => {
    if (path === '/api/auth/refresh') return Promise.resolve(refreshOk(role));
    if (path === '/api/auth/me' && me) {
      return Promise.resolve(me === 'ERROR'
        ? { ok: false, status: 500, error: {} }
        : { ok: true, data: { tenant: { verificationStatus: me.verificationStatus, isSuspended: me.isSuspended ?? false } } });
    }
    return Promise.resolve({ ok: false, status: 404, error: {} });
  });
}

function renderCallback(search: string) {
  currentSearch = search;
  return render(
    <AuthProvider>
      <OAuthCallbackPage />
    </AuthProvider>,
  );
}

const meCalls = () => apiMock.mock.calls.filter((c) => c[0] === '/api/auth/me');
const refreshCalls = () => apiMock.mock.calls.filter((c) => c[0] === '/api/auth/refresh');

describe('AJ-59 · OAuth callback: kurum yöneticisi e-posta girişiyle aynı yere gider', () => {
  beforeEach(() => {
    apiMock.mockReset();
    replaceMock.mockReset();
  });

  it.each(['PENDING_REVIEW', 'REJECTED'] as const)(
    '%s kurumun yöneticisi sosyal girişle durum ekranına gider (panel değil)',
    async (status) => {
      mockBackend('ADMIN', { verificationStatus: status, isSuspended: status === 'REJECTED' });
      renderCallback('isNewUser=false');

      await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(TENANT_REVIEW_PATH));
      expect(replaceMock).not.toHaveBeenCalledWith(OAUTH_DEFAULT_PATH);
      // Kurum durumu oturum anahtarıyla, yenileme tetiklemeden, bir kez okunur; refresh tek kalır.
      expect(meCalls()).toHaveLength(1);
      expect(meCalls()[0][1]).toEqual(expect.objectContaining({
        token: 'cerezden-gelen-anahtar', tenantId: 't1', withRefresh: false,
      }));
      expect(refreshCalls()).toHaveLength(1);
    },
  );

  it('yeni kayıt olan yöneticinin kurumu inceleniyorsa da durum ekranı (hoş geldin değil)', async () => {
    mockBackend('ADMIN', { verificationStatus: 'PENDING_REVIEW' });
    renderCallback('isNewUser=true');
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(TENANT_REVIEW_PATH));
    expect(replaceMock).not.toHaveBeenCalledWith(OAUTH_WELCOME_PATH);
  });

  it('onaylı kurumun yöneticisi panele gider', async () => {
    mockBackend('ADMIN', { verificationStatus: 'APPROVED' });
    renderCallback('isNewUser=false');
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(OAUTH_DEFAULT_PATH));
  });

  it('negatif: dondurulmuş (onaylı ama askıda) kurumun yöneticisi durum ekranına GÖNDERİLMEZ — askı ekranına gider', async () => {
    // ⚠️ AJ-72 (2026-09-28): beklenen hedef panel → askı ekranı. Gerekçe: panelde her istek 403
    // KURUM_ASKIDA alıyordu (açıklamasız). Durum ekranına gitmeme (giriş döngüsü yok) kuralı aynen.
    mockBackend('ADMIN', { verificationStatus: 'APPROVED', isSuspended: true });
    renderCallback('isNewUser=false');
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith('/kurum-askida'));
    expect(replaceMock).not.toHaveBeenCalledWith(TENANT_REVIEW_PATH);
    expect(replaceMock).not.toHaveBeenCalledWith(OAUTH_DEFAULT_PATH);
    expect(meCalls()).toHaveLength(1);
    expect(refreshCalls()).toHaveLength(1);
  });

  it('kurum durumu okunamazsa (500) giriş bozulmaz, panele gidilir', async () => {
    mockBackend('ADMIN', 'ERROR');
    renderCallback('isNewUser=false');
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(OAUTH_DEFAULT_PATH));
    expect(refreshCalls()).toHaveLength(1);
  });

  it('normal kullanıcı panele gider; kurum durumu okunmaz', async () => {
    mockBackend('MENTI', { verificationStatus: 'PENDING_REVIEW' });
    renderCallback('isNewUser=false');
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(OAUTH_DEFAULT_PATH));
    expect(meCalls()).toHaveLength(0);
    expect(replaceMock).not.toHaveBeenCalledWith(TENANT_REVIEW_PATH);
  });

  it('yeni kullanıcı hoş geldin paneline gider', async () => {
    mockBackend('MENTOR');
    renderCallback('isNewUser=true');
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(OAUTH_WELCOME_PATH));
    expect(meCalls()).toHaveLength(0);
  });

  it('yönlendirme tek kez yapılır (kurum durumu ikinci kez okunmaz)', async () => {
    mockBackend('ADMIN', { verificationStatus: 'REJECTED' });
    renderCallback('isNewUser=false');
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(TENANT_REVIEW_PATH));
    await new Promise((r) => setTimeout(r, 20));
    expect(replaceMock).toHaveBeenCalledTimes(1);
    expect(meCalls()).toHaveLength(1);
  });
});
