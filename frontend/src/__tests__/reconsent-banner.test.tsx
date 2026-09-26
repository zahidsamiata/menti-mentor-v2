/**
 * GV-18 — rıza metni sürümü güncellenince banner + yeniden onay akışı.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ReconsentBanner } from '@/components/organisms/ReconsentBanner';

const authMock: { user: { tenantId: string; needsReconsent: boolean } | null; accessToken: string | null } = {
  user: { tenantId: 't1', needsReconsent: false },
  accessToken: 'tok-1',
};
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => authMock,
}));

const submitReconsentMock = vi.fn();
vi.mock('@/lib/api/reconsent', () => ({
  submitReconsent: (...args: unknown[]) => submitReconsentMock(...args),
}));

describe('ReconsentBanner (GV-18)', () => {
  beforeEach(() => {
    submitReconsentMock.mockReset();
  });

  it('needsReconsent false ise hiçbir şey render etmez', () => {
    authMock.user = { tenantId: 't1', needsReconsent: false };
    const { container } = render(<ReconsentBanner />);
    expect(container).toBeEmptyDOMElement();
  });

  it('needsReconsent true ise banner + Onayla butonu görünür', () => {
    authMock.user = { tenantId: 't1', needsReconsent: true };
    render(<ReconsentBanner />);
    expect(screen.getByText('Aydınlatma metnimiz güncellendi')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Onayla' })).toBeInTheDocument();
  });

  it('Onayla başarılı olursa banner kaybolur', async () => {
    authMock.user = { tenantId: 't1', needsReconsent: true };
    submitReconsentMock.mockResolvedValueOnce({ ok: true, data: { needsReconsent: false } });
    render(<ReconsentBanner />);

    fireEvent.click(screen.getByRole('button', { name: 'Onayla' }));

    await waitFor(() => expect(submitReconsentMock).toHaveBeenCalledWith('tok-1', 't1'));
    await waitFor(() => expect(screen.queryByText('Aydınlatma metnimiz güncellendi')).not.toBeInTheDocument());
  });

  it('backend hata dönerse kullanıcı hatayı görür, banner kaybolmaz (sessizce yutulmaz)', async () => {
    authMock.user = { tenantId: 't1', needsReconsent: true };
    submitReconsentMock.mockResolvedValueOnce({ ok: false, error: { message: 'Sunucu hatası.' } });
    render(<ReconsentBanner />);

    fireEvent.click(screen.getByRole('button', { name: 'Onayla' }));

    await waitFor(() => expect(screen.getByText('Sunucu hatası.')).toBeInTheDocument());
    expect(screen.getByText('Aydınlatma metnimiz güncellendi')).toBeInTheDocument();
  });
});
