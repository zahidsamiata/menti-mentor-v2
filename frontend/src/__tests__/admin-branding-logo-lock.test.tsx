/**
 * AJ-05 — `/admin/branding`: kayıtlı ama YENİ kurala uymayan bir logo, sayfayı kilitlememeli.
 *
 * Kaynak: bağımsız inceleme bulgusu (PR #363 yorumu) — sıkılaştırılmış `isLogoUrlSafeToSave`
 * kaydetme formunda DOĞRUDAN mevcut değere uygulanınca, eski (uzantısız/IP/port'lu) bir logosu
 * olan kurumun yöneticisi yalnız RENK değiştirmek istese bile "Kaydet" kilitli buluyordu ve
 * atlatılsa bile backend 400 döndürüyordu. Düzeltme: doğrulama + istek payload'ı yalnız alan
 * KAYITLI değerden FARKLI ve DOLU bir şeye değiştiyse uygulanır.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const tenantMock: { tenant: { id: string; name: string; displayName: string | null; slug: string; logoUrl: string | null; primaryColor: string } } = {
  tenant: {
    id: 't1', name: 'Test Kurum', displayName: 'Test Kurum', slug: 'test-kurum',
    logoUrl: 'https://cdn.example.com/eski-logo', // eski kural altında kaydedilmiş, uzantısız → yeni kuralla GEÇERSİZ
    primaryColor: '#6366f1',
  },
};

vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { tenantId: 't1' }, accessToken: 'tok' }),
}));
vi.mock('@/providers/TenantProvider', () => ({
  useTenant: () => tenantMock,
}));
vi.mock('@/lib/api/selfServe', () => ({
  updateOnboarding: vi.fn(),
}));

import BrandingPage from '@/app/(admin)/admin/branding/page';
import { updateOnboarding } from '@/lib/api/selfServe';

describe('/admin/branding — kayıtlı eski-kural logo Kaydet\'i kilitlemez', () => {
  beforeEach(() => {
    vi.mocked(updateOnboarding).mockReset();
    vi.mocked(updateOnboarding).mockResolvedValue({ ok: true, data: {} } as never);
  });

  it('sayfa açılışında hata gösterilmez, Kaydet açıktır (logoya hiç dokunulmadı)', () => {
    render(<BrandingPage />);
    expect(screen.queryByText(/gerçek bir alan adına ait/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/logo url/i)).not.toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('button', { name: /kaydet/i })).toBeEnabled();
  });

  it('yalnız renk değiştirip kaydedince istekte logoUrl YOK (kayıtlı değer korunur)', async () => {
    render(<BrandingPage />);
    fireEvent.click(screen.getByRole('button', { name: /amber/i }));
    fireEvent.click(screen.getByRole('button', { name: /kaydet/i }));

    await waitFor(() => expect(updateOnboarding).toHaveBeenCalledOnce());
    const [, , payload] = vi.mocked(updateOnboarding).mock.calls[0]!;
    expect(payload).not.toHaveProperty('logoUrl');
    expect(payload).toMatchObject({ primaryColor: '#f59e0b' });
  });

  it('logo alanını YENİ geçersiz bir değere değiştirince hata gösterilir ve Kaydet kilitlenir', () => {
    render(<BrandingPage />);
    fireEvent.change(screen.getByLabelText(/logo url/i), { target: { value: 'https://127.0.0.1/logo.png' } });
    expect(screen.getByRole('button', { name: /kaydet/i })).toBeDisabled();
  });

  it('logo alanını YENİ geçerli bir değere değiştirip kaydedince istekte logoUrl VAR', async () => {
    render(<BrandingPage />);
    fireEvent.change(screen.getByLabelText(/logo url/i), { target: { value: 'https://cdn.example.com/yeni-logo.png' } });
    fireEvent.click(screen.getByRole('button', { name: /kaydet/i }));

    await waitFor(() => expect(updateOnboarding).toHaveBeenCalledOnce());
    const [, , payload] = vi.mocked(updateOnboarding).mock.calls[0]!;
    expect(payload).toMatchObject({ logoUrl: 'https://cdn.example.com/yeni-logo.png' });
  });

  it('logo alanını boşaltıp kaydedince istekte logoUrl gönderilmez (boş dize backend\'de reddedilir)', async () => {
    render(<BrandingPage />);
    fireEvent.change(screen.getByLabelText(/logo url/i), { target: { value: '' } });
    expect(screen.getByRole('button', { name: /kaydet/i })).toBeEnabled();
    fireEvent.click(screen.getByRole('button', { name: /kaydet/i }));

    await waitFor(() => expect(updateOnboarding).toHaveBeenCalledOnce());
    const [, , payload] = vi.mocked(updateOnboarding).mock.calls[0]!;
    expect(payload).not.toHaveProperty('logoUrl');
  });
});
