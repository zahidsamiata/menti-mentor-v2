/**
 * KR-02 + KR-03 — sayfa yenilenince (F5) oturum ve kurum markası geri gelir.
 *
 * İki hata: (1) sessiz refresh yalnız erişim anahtarını alıyordu, kullanıcı bilgisi boş
 * kaldığı için F5 sonrası paneller girişe atıyordu; (2) marka, yalnız platform yöneticisine
 * açık `/api/tenants/:id` ucundan isteniyor ve normal kullanıcıda hep reddediliyordu.
 * Artık ikisi de refresh yanıtından gelir; `/api/tenants/:id` hiç çağrılmaz.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import { AuthTenantBridge } from '@/providers/AuthTenantBridge';
import { useTenant } from '@/providers/TenantProvider';
import { toTenantBranding } from '@/lib/sessionTenant';

const apiMock = vi.fn();

vi.mock('@/lib/api/client', () => ({
  apiClient: (...args: unknown[]) => apiMock(...args),
  refreshCallbackRef: { current: null },
}));

function Probe() {
  const { user } = useAuth();
  const { tenant } = useTenant();
  return (
    <div>
      <span data-testid="user">{user ? user.fullName : 'misafir'}</span>
      <span data-testid="brand">{tenant ? `${tenant.displayName}|${tenant.primaryColor}` : 'marka-yok'}</span>
    </div>
  );
}

function renderApp() {
  return render(
    <AuthProvider>
      <AuthTenantBridge>
        <Probe />
      </AuthTenantBridge>
    </AuthProvider>,
  );
}

describe('KR-02/KR-03: F5 sonrası oturum + kurum markası', () => {
  beforeEach(() => {
    apiMock.mockReset();
  });

  it('sessiz refresh kullanıcıyı ve kendi kurum markasını geri getirir; /api/tenants/:id çağrılmaz', async () => {
    apiMock.mockImplementation((path: string) => {
      if (path === '/api/auth/refresh') {
        return Promise.resolve({
          ok: true,
          data: {
            accessToken: 'tok',
            expiresIn: 3600,
            user: {
              id: 'u1', tenantId: 't1', role: 'MENTI', fullName: 'Ayşe Menti', email: 'a@example.com',
              approvalStatus: 'APPROVED', discType: null, discLetters: '', needsOrientation: false,
            },
            tenant: { id: 't1', name: 'Acme Vakfı', slug: 'acme', logoUrl: null, primaryColor: '#112233' },
          },
        });
      }
      return Promise.resolve({ ok: false, status: 404, error: {} });
    });

    renderApp();

    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent('Ayşe Menti'));
    expect(screen.getByTestId('brand')).toHaveTextContent('Acme Vakfı|#112233');
    const calledPaths = apiMock.mock.calls.map((c) => c[0] as string);
    expect(calledPaths.some((p) => p.startsWith('/api/tenants/'))).toBe(false);
  });

  it('oturum çerezi yoksa (refresh 401) kullanıcı ve marka boş kalır', async () => {
    apiMock.mockResolvedValue({ ok: false, status: 401, error: { error: 'REFRESH_TOKEN_EKSIK' } });

    renderApp();

    await waitFor(() => expect(apiMock).toHaveBeenCalledWith('/api/auth/refresh', expect.anything()));
    expect(screen.getByTestId('user')).toHaveTextContent('misafir');
    expect(screen.getByTestId('brand')).toHaveTextContent('marka-yok');
  });
});

describe('toTenantBranding', () => {
  it('oturum kurumunu markaya çevirir; kimliksiz ya da renksiz kurumda null döner', () => {
    expect(toTenantBranding({ id: 't1', name: 'Acme', slug: 'acme', logoUrl: null, primaryColor: '#000000' })).toEqual({
      id: 't1', name: 'Acme', displayName: 'Acme', slug: 'acme', logoUrl: null, primaryColor: '#000000',
    });
    expect(toTenantBranding({ name: 'Eksik' })).toBeNull();
    expect(toTenantBranding(null)).toBeNull();
  });
});
