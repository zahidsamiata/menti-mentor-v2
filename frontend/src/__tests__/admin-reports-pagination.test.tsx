/**
 * AN-39 — Kurum yöneticisi şikayet paneli sayfalama.
 *
 * Backend artık `{ items, total, limit, offset }` döner (varsayılan 50); `total` filtreye uyan tüm
 * kayıt sayısıdır. `items.length < total` ise "Daha fazla göster" sonraki sayfayı (offset = mevcut
 * uzunluk) listeye ekler. Gerçek useQuery kullanılır; yalnız API katmanı taklit edilir.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminReportsPage from '@/app/(admin)/admin/reports/page';
import type { TenantReport } from '@/types/admin';

const listReports = vi.fn();
const stableApi = {};
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => stableApi }));
vi.mock('@/lib/api/admin', () => ({
  adminApi: {
    listReports: (...args: unknown[]) => listReports(...args),
    reviewReport: vi.fn(),
  },
}));

function report(n: number): TenantReport {
  return {
    id: `r${n}`, reason: 'SPAM', description: `Şikayet metni ${n}`, status: 'OPEN',
    reviewNote: null, createdAt: new Date('2026-09-01T10:00:00Z').toISOString(),
    reporter: { id: 'u1', fullName: 'Bildiren' }, target: { id: 'u2', fullName: 'Hedef' },
  };
}

const ok = (items: TenantReport[], total: number, offset = 0) =>
  Promise.resolve({ ok: true, data: { items, total, limit: 50, offset } });

describe('Şikayet paneli sayfalama (AN-39)', () => {
  beforeEach(() => { listReports.mockReset(); });

  it('total > items iken "Daha fazla göster" görünür; tıklayınca offset\'li istek gider ve satırlar eklenir', async () => {
    listReports
      .mockImplementationOnce(() => ok([report(1), report(2)], 3))
      .mockImplementationOnce(() => ok([report(3)], 3, 2));
    const user = userEvent.setup();
    render(<AdminReportsPage />);

    expect(await screen.findByText('Şikayet metni 1')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Daha fazla göster' }));

    expect(await screen.findByText('Şikayet metni 3')).toBeInTheDocument();
    expect(listReports).toHaveBeenLastCalledWith(stableApi, { status: 'OPEN', offset: 2 });
    expect(screen.getByText('Şikayet metni 1')).toBeInTheDocument();
    expect(screen.getByText('Şikayet metni 2')).toBeInTheDocument();
    // Hepsi yüklendi → düğme kaybolur.
    expect(screen.queryByRole('button', { name: 'Daha fazla göster' })).not.toBeInTheDocument();
  });

  it('negatif: total == items iken düğme yok', async () => {
    listReports.mockImplementation(() => ok([report(1), report(2)], 2));
    render(<AdminReportsPage />);
    expect(await screen.findByText('Şikayet metni 2')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Daha fazla göster' })).not.toBeInTheDocument();
  });

  it('ikinci sayfa hatasında mevcut satırlar kalır ve Türkçe hata görünür', async () => {
    listReports
      .mockImplementationOnce(() => ok([report(1)], 5))
      .mockImplementationOnce(() => Promise.resolve({ ok: false, error: { message: 'boom' } }));
    const user = userEvent.setup();
    render(<AdminReportsPage />);

    expect(await screen.findByText('Şikayet metni 1')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Daha fazla göster' }));

    expect(await screen.findByText(/Daha fazla şikayet yüklenemedi/)).toBeInTheDocument();
    expect(screen.getByText('Şikayet metni 1')).toBeInTheDocument();
    // Tekrar denenebilsin diye düğme durur.
    expect(screen.getByRole('button', { name: 'Daha fazla göster' })).toBeEnabled();
  });

  it('durum filtresi değişince liste sıfırdan (offset\'siz) yüklenir', async () => {
    listReports
      .mockImplementationOnce(() => ok([report(1)], 2))
      .mockImplementationOnce(() => ok([report(2)], 2, 1))
      .mockImplementationOnce(() => ok([report(9)], 1));
    const user = userEvent.setup();
    render(<AdminReportsPage />);

    await screen.findByText('Şikayet metni 1');
    await user.click(screen.getByRole('button', { name: 'Daha fazla göster' }));
    await screen.findByText('Şikayet metni 2');

    await user.click(screen.getByRole('button', { name: 'Tümü' }));
    expect(await screen.findByText('Şikayet metni 9')).toBeInTheDocument();
    expect(listReports).toHaveBeenLastCalledWith(stableApi, {});
    await waitFor(() => expect(screen.queryByText('Şikayet metni 2')).not.toBeInTheDocument());
    expect(screen.queryByText('Şikayet metni 1')).not.toBeInTheDocument();
  });
});
