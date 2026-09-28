/**
 * AN-36 / G1-12 — `/admin/yasal-bilgiler`: kurum yöneticisi yasal kimlik bilgilerini görür ve düzenler.
 *
 * Kanıtlanan: kayıtlı değerler forma dolar · geçersiz MERSİS/KEP/VKN'de alan hatası görünür ve
 * Kaydet kilitlenir (istek gitmez) · geçerli kayıtta PATCH doğru kurum + gövdeyle gider ·
 * backend hatası kullanıcıya gösterilir. Yetki kapısı backend'de (entegrasyon: an36-kurum-yasal-bilgiler.test.ts).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const { apiStub } = vi.hoisted(() => ({ apiStub: vi.fn() }));

vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { tenantId: 't1', role: 'ADMIN' }, accessToken: 'tok' }),
}));
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiStub }));
vi.mock('@/lib/api/tenantLegalInfo', () => ({
  tenantLegalInfoApi: { get: vi.fn(), update: vi.fn() },
}));

import LegalInfoPage from '@/app/(admin)/admin/yasal-bilgiler/page';
import { tenantLegalInfoApi } from '@/lib/api/tenantLegalInfo';

const STORED = {
  legalName: 'Örnek Derneği', legalAddress: 'Ankara', kepAddress: 'ornek@hs01.kep.tr',
  mersisNo: null, taxOffice: 'Çankaya', taxNumber: '1234567890', legalInfoUpdatedAt: '2026-09-28T10:00:00.000Z',
};

describe('/admin/yasal-bilgiler', () => {
  beforeEach(() => {
    vi.mocked(tenantLegalInfoApi.get).mockReset();
    vi.mocked(tenantLegalInfoApi.update).mockReset();
    vi.mocked(tenantLegalInfoApi.get).mockResolvedValue({ ok: true, data: { legalInfo: STORED } });
  });

  it('kayıtlı değerler forma dolar', async () => {
    render(<LegalInfoPage />);
    await waitFor(() => expect(screen.getByLabelText('Resmî unvan')).toHaveValue('Örnek Derneği'));
    expect(tenantLegalInfoApi.get).toHaveBeenCalledWith(apiStub, 't1');
    expect(screen.getByLabelText('KEP adresi')).toHaveValue('ornek@hs01.kep.tr');
    expect(screen.getByLabelText('MERSİS numarası')).toHaveValue('');
    expect(screen.getByText(/Son güncelleme/)).toBeInTheDocument();
  });

  it.each([
    ['MERSİS numarası', '12345', /MERSİS numarası 16 haneli/],
    ['KEP adresi', 'kurum@gmail.com', /KEP adresi geçerli bir KEP/],
    ['Vergi kimlik numarası', '12345', /Vergi kimlik numarası 10 haneli/],
  ])('geçersiz %s → alan hatası, Kaydet kilitli, istek gitmez', async (label, bad, msg) => {
    render(<LegalInfoPage />);
    await waitFor(() => expect(screen.getByLabelText('Resmî unvan')).toHaveValue('Örnek Derneği'));
    fireEvent.change(screen.getByLabelText(label), { target: { value: bad } });
    expect(screen.getByText(msg)).toBeInTheDocument();
    expect(screen.getByLabelText(label)).toHaveAttribute('aria-invalid', 'true');
    const save = screen.getByRole('button', { name: /kaydet/i });
    expect(save).toBeDisabled();
    fireEvent.click(save);
    expect(tenantLegalInfoApi.update).not.toHaveBeenCalled();
  });

  it('geçerli kayıt → PATCH kendi kurumuna tüm alanlarla gider, başarı mesajı görünür', async () => {
    vi.mocked(tenantLegalInfoApi.update).mockResolvedValue({
      ok: true,
      data: { message: 'ok', legalInfo: { ...STORED, mersisNo: '0123456789012345' } },
    });
    render(<LegalInfoPage />);
    await waitFor(() => expect(screen.getByLabelText('Resmî unvan')).toHaveValue('Örnek Derneği'));
    fireEvent.change(screen.getByLabelText('MERSİS numarası'), { target: { value: '0123456789012345' } });
    fireEvent.click(screen.getByRole('button', { name: /kaydet/i }));

    await waitFor(() => expect(screen.getByText('Yasal bilgiler kaydedildi.')).toBeInTheDocument());
    expect(tenantLegalInfoApi.update).toHaveBeenCalledWith(apiStub, 't1', {
      legalName: 'Örnek Derneği', legalAddress: 'Ankara', kepAddress: 'ornek@hs01.kep.tr',
      mersisNo: '0123456789012345', taxOffice: 'Çankaya', taxNumber: '1234567890',
    });
  });

  it('backend hatası kullanıcıya gösterilir', async () => {
    vi.mocked(tenantLegalInfoApi.update).mockResolvedValue({
      ok: false, status: 403, error: { error: 'UYELIK_BULUNAMADI', message: 'Bu kurum için aktif yönetici üyeliğiniz bulunmuyor.' },
    });
    render(<LegalInfoPage />);
    await waitFor(() => expect(screen.getByLabelText('Resmî unvan')).toHaveValue('Örnek Derneği'));
    fireEvent.click(screen.getByRole('button', { name: /kaydet/i }));
    await waitFor(() => expect(screen.getByText('Bu kurum için aktif yönetici üyeliğiniz bulunmuyor.')).toBeInTheDocument());
  });
});
