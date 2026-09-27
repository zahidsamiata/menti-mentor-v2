/**
 * U-03 (AJ-45) — davet metnindeki kurum adı ZİNCİRİN tamamından gelir.
 *
 * invite-error-tenant-name.test.tsx `useTenant`'ı mock'luyordu; asıl kırık halka ise
 * zincirin ortasındaydı: AuthTenantBridge eskiden kurumu platform yöneticisine kapalı
 * `GET /api/tenants/:id` ile çekiyordu → kurum yöneticisinde ad hep "Kurumunuz" kalıyordu.
 * Bu test gerçek AuthProvider → AuthTenantBridge → TenantProvider → davet sayfası zincirini
 * kurar; yalnız ağ katmanı (`apiClient`) sahtedir. Oturum yanıtı (refresh) kurumu taşır,
 * kopyalanan davet metninde o ad görünmelidir.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '@/providers/AuthProvider';
import { AuthTenantBridge } from '@/providers/AuthTenantBridge';
import InvitePage from '@/app/(admin)/admin/invite/page';

const TENANT_NAME = 'Deneme Gençlik Vakfı';

const apiMock = vi.fn(async (path: string, _opts?: unknown) => {
  if (path === '/api/auth/refresh') {
    return {
      ok: true,
      data: {
        accessToken: 'tok',
        expiresIn: 3600,
        user: { id: 'a1', role: 'ADMIN', tenantId: 't1', fullName: 'Kurum Yöneticisi', email: 'yonetici@example.test' },
        tenant: { id: 't1', name: TENANT_NAME, slug: 'deneme', logoUrl: null, primaryColor: '#4f46e5' },
      },
    };
  }
  if (path === '/api/tenants/t1/invitations') {
    return { ok: true, data: { invitationLink: 'https://example.test/inv/abc' } };
  }
  // Şablon listesi ve diğer çağrılar: boş (varsayılan şablon kullanılır).
  return { ok: true, data: { items: [] } };
});

vi.mock('@/lib/api/client', () => ({
  apiClient: (path: string, opts?: unknown) => apiMock(path, opts),
  refreshCallbackRef: { current: null },
}));

describe('Davet metni — kurum adı zinciri (U-03)', () => {
  beforeEach(() => apiMock.mockClear());

  it('oturumdaki kurum adı köprü → sağlayıcı üzerinden kopyalanan davet metnine ulaşır', async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, 'writeText');

    render(
      <AuthProvider>
        <AuthTenantBridge>
          <InvitePage />
        </AuthTenantBridge>
      </AuthProvider>,
    );

    // Oturum (refresh) çözülüp şablon yüklenene kadar bekle — link üretimi oturum ister.
    await waitFor(() =>
      expect(apiMock).toHaveBeenCalledWith('/api/tenants/t1/invitation-templates', expect.anything()),
    );
    await user.click(screen.getByRole('button', { name: 'Oluştur' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Metni Kopyala' })).toBeEnabled());
    await user.click(screen.getByRole('button', { name: 'Metni Kopyala' }));

    await waitFor(() => expect(writeText).toHaveBeenCalled());
    const copied = writeText.mock.calls[0]![0] as string;
    expect(copied).toContain(TENANT_NAME);
    expect(copied).not.toContain('Kurumunuz');
    expect(copied).not.toContain('{KurumAdı}');
    // Kurum adı platform yöneticisine kapalı `GET /api/tenants/:id` ucundan ÇEKİLMEZ (eski kırık halka).
    expect(apiMock.mock.calls.some(([p]) => p === '/api/tenants/t1')).toBe(false);
  });
});
