/**
 * Davet Metni — hata görünürlüğü + kurum adı (U-03).
 *
 * İki hata: (1) generateLink/saveTemplate hataları sessizce yutuluyordu (setMsg
 * hiç çağrılmıyordu); (2) {KurumAdı} yer tutucusu admin fullName'ine bakıp boş
 * dizeye çevriliyordu → davet metninde kurum adı boştu. Artık gerçek tenant adı.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InvitePage from '@/app/(admin)/admin/invite/page';

const apiMock = vi.fn();

vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { tenantId: 't1', fullName: 'Admin Kişi' }, accessToken: 'tok' }),
}));
vi.mock('@/providers/TenantProvider', () => ({
  useTenant: () => ({ tenant: { name: 'internal', displayName: 'Acme Vakfı', slug: 'acme' } }),
}));
vi.mock('@/lib/api/client', () => ({
  apiClient: (...args: unknown[]) => apiMock(...args),
}));

describe('Davet Metni — U-03', () => {
  beforeEach(() => {
    apiMock.mockReset();
    // useEffect'teki şablon çağrısı için varsayılan: boş liste (default şablon kullanılır).
    apiMock.mockResolvedValue({ ok: true, data: { items: [] } });
  });

  it('davet linki oluşturma başarısızsa hata mesajı gösterilir (eskiden sessizdi)', async () => {
    const user = userEvent.setup();
    render(<InvitePage />);

    // "Oluştur" → invitations POST başarısız
    apiMock.mockResolvedValueOnce({ ok: false, error: { message: 'Yetkiniz yok.' } });
    await user.click(screen.getByRole('button', { name: 'Oluştur' }));

    await waitFor(() => {
      expect(screen.getByText('Yetkiniz yok.')).toBeInTheDocument();
    });
  });

  it('kopyalanan metinde kurum adı gerçek tenant adıyla dolar (boş değil)', async () => {
    const user = userEvent.setup();
    // userEvent.setup() navigator.clipboard'ı kendi stub'ıyla kurar → onu gözetle.
    const writeText = vi.spyOn(navigator.clipboard, 'writeText');
    render(<InvitePage />);

    // Önce link oluştur (kopya düğmesi link olmadan disabled).
    apiMock.mockResolvedValueOnce({ ok: true, data: { invitationLink: 'https://x/inv/abc' } });
    await user.click(screen.getByRole('button', { name: 'Oluştur' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Metni Kopyala' })).toBeEnabled());

    await user.click(screen.getByRole('button', { name: 'Metni Kopyala' }));

    await waitFor(() => expect(writeText).toHaveBeenCalled());
    const copied = writeText.mock.calls[0]![0] as string;
    expect(copied).toContain('Acme Vakfı');
    expect(copied).not.toContain('{KurumAdı}');
  });
});
