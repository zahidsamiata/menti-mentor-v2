/**
 * AJ-73 — sosyal giriş dönüşünde oturum adresteki anahtarla değil, yenileme çereziyle kurulur.
 *
 * Eski davranış: callback sayfası `?accessToken=` parametresini okuyup oturumu onunla açıyordu;
 * anahtar yoksa girişe atıyordu. Yeni: sayfa adreste anahtar beklemez, AuthProvider'ın açılıştaki
 * sessiz yenilemesinin (`POST /api/auth/refresh`, çerezle) sonucunu bekler. Adreste eski biçimde
 * anahtar gelirse o değer hiçbir istekte kullanılmaz ve adresten silinir.
 *
 * Gerçek AuthProvider + gerçek callback sayfası koşar; yalnız ağ (apiClient) ve Next yönlendirici sahtedir.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { AuthProvider } from '@/providers/AuthProvider';
import OAuthCallbackPage from '@/app/oauth/callback/page';

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

const LEGACY_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eski-adres-anahtari.imza';

const REFRESH_OK = {
  ok: true,
  data: {
    accessToken: 'cerezden-gelen-anahtar',
    expiresIn: 3600,
    user: {
      id: 'u1', tenantId: 't1', role: 'MENTI', fullName: 'Deneme Kişi', email: 'd@example.com',
      approvalStatus: 'APPROVED', discType: null, discLetters: '', needsOrientation: false,
    },
    tenant: null,
  },
};

function renderCallback(search: string) {
  currentSearch = search;
  return render(
    <AuthProvider>
      <OAuthCallbackPage />
    </AuthProvider>,
  );
}

/** Hiçbir istek eski adres anahtarını taşımamalı (ne Authorization ne gövde). */
function expectLegacyTokenNeverUsed() {
  for (const call of apiMock.mock.calls) {
    expect(JSON.stringify(call)).not.toContain(LEGACY_TOKEN);
  }
}

describe('AJ-73: OAuth dönüşü — oturum çerezle kurulur, adresteki anahtar kullanılmaz', () => {
  beforeEach(() => {
    apiMock.mockReset();
    replaceMock.mockReset();
  });

  it('adreste anahtar yokken çerezle /api/auth/refresh çağrılır ve panele gidilir', async () => {
    apiMock.mockImplementation((path: string) =>
      Promise.resolve(path === '/api/auth/refresh' ? REFRESH_OK : { ok: false, status: 404, error: {} }),
    );

    renderCallback('isNewUser=false');

    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith('/dashboard'));
    expect(apiMock).toHaveBeenCalledWith('/api/auth/refresh', expect.objectContaining({ method: 'POST' }));
    // Tek yenileme: aynı çerezle ikinci eşzamanlı yenileme backend'de reddedilip oturumu düşürürdü.
    expect(apiMock.mock.calls.filter((c) => c[0] === '/api/auth/refresh')).toHaveLength(1);
  });

  it('yeni kullanıcı → hoş geldin paneline gider', async () => {
    apiMock.mockImplementation((path: string) =>
      Promise.resolve(path === '/api/auth/refresh' ? REFRESH_OK : { ok: false, status: 404, error: {} }),
    );

    renderCallback('isNewUser=true');

    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith('/dashboard?welcome=1'));
  });

  it('negatif: adreste eski biçimde accessToken gelse de o değer kullanılmaz ve adresten silinir', async () => {
    apiMock.mockImplementation((path: string) =>
      Promise.resolve(path === '/api/auth/refresh' ? REFRESH_OK : { ok: false, status: 404, error: {} }),
    );

    const view = renderCallback(`accessToken=${LEGACY_TOKEN}&expiresIn=3600&isNewUser=false`);

    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith('/oauth/callback?isNewUser=false'));
    expect(replaceMock).not.toHaveBeenCalledWith('/dashboard');

    // Temizlenmiş adresle sayfa yeniden çizilir → oturum çerezden kurulur.
    currentSearch = 'isNewUser=false';
    view.rerender(
      <AuthProvider>
        <OAuthCallbackPage />
      </AuthProvider>,
    );
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith('/dashboard'));
    expect(apiMock).toHaveBeenCalledWith('/api/auth/refresh', expect.anything());
    expectLegacyTokenNeverUsed();
  });

  it('negatif: çerezle yenileme başarısızsa (401) giriş sayfasına hata koduyla gidilir', async () => {
    apiMock.mockResolvedValue({ ok: false, status: 401, error: { error: 'REFRESH_TOKEN_EKSIK' } });

    renderCallback('isNewUser=false');

    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith('/login?error=SUNUCU_HATASI'));
    expect(replaceMock).not.toHaveBeenCalledWith('/dashboard');
  });

  it('backend hata koduyla dönerse giriş sayfasına o kodla gidilir', async () => {
    apiMock.mockResolvedValue({ ok: false, status: 401, error: {} });

    renderCallback('error=GECERSIZ_STATE');

    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith('/login?error=GECERSIZ_STATE'));
  });
});
