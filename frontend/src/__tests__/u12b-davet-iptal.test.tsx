/**
 * U-12B (KARAR-82 B) — Davet sayfasında oluşturulan linkler listelenir; geçerli link "Linki iptal et" ile
 * kapatılır (onay sorusundan sonra). İptal/süresi dolmuş linkte düğme yok.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { InvitationLinksPanel } from '@/components/organisms/InvitationLinksPanel';

const apiClient = vi.fn();
vi.mock('@/lib/api/client', () => ({ apiClient: (...a: unknown[]) => apiClient(...a) }));

const rows = [
  { id: 'l1', role: 'MENTI', createdAt: '2026-10-27T08:00:00Z', expiresAt: '2026-11-03T08:00:00Z', revokedAt: null, status: 'ACTIVE' },
  { id: 'l2', role: 'MENTOR', createdAt: '2026-10-20T08:00:00Z', expiresAt: '2026-10-27T08:00:00Z', revokedAt: '2026-10-21T08:00:00Z', status: 'REVOKED' },
];

beforeEach(() => {
  apiClient.mockReset();
  apiClient.mockImplementation((path: string) =>
    Promise.resolve(path.endsWith('/revoke') ? { ok: true, data: { ok: true } } : { ok: true, data: { items: rows } }),
  );
});

describe('U-12B davet linkleri paneli', () => {
  it('linkleri durumuyla gösterir; yalnız geçerli linkte iptal düğmesi var', async () => {
    render(<InvitationLinksPanel tenantId="t1" accessToken="tok" refreshKey={0} />);
    expect(await screen.findByText(/Geçerli/)).toBeInTheDocument();
    expect(screen.getByText(/İptal edildi/)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Linki iptal et' })).toHaveLength(1);
  });

  it('onaylanınca iptal isteği gider', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<InvitationLinksPanel tenantId="t1" accessToken="tok" refreshKey={0} />);
    fireEvent.click(await screen.findByRole('button', { name: 'Linki iptal et' }));
    await waitFor(() =>
      expect(apiClient).toHaveBeenCalledWith('/api/tenants/t1/invitations/l1/revoke', { method: 'POST', token: 'tok' }),
    );
  });

  it('onaylanmazsa iptal isteği gitmez', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    render(<InvitationLinksPanel tenantId="t1" accessToken="tok" refreshKey={0} />);
    fireEvent.click(await screen.findByRole('button', { name: 'Linki iptal et' }));
    expect(apiClient).not.toHaveBeenCalledWith(expect.stringContaining('/revoke'), expect.anything());
  });

  it('iptal başarısızsa hata mesajı görünür kalır', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    apiClient.mockImplementation((path: string) =>
      Promise.resolve(path.endsWith('/revoke')
        ? { ok: false, error: { message: 'Davet linki bulunamadı ya da zaten iptal edilmiş.' } }
        : { ok: true, data: { items: rows } }),
    );
    render(<InvitationLinksPanel tenantId="t1" accessToken="tok" refreshKey={0} />);
    fireEvent.click(await screen.findByRole('button', { name: 'Linki iptal et' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('zaten iptal edilmiş');
  });
});
