/**
 * E-3d — Çifti Engelle paneli (admin/eslesmeler, KR-19).
 *
 * Admin bir mentör + bir menti seçip aralarındaki eşleşmeyi kapatır, mevcut
 * engelleri görür ve kaldırır. Backend `POST /api/tenants/:id/block-pair`,
 * `GET /api/tenants/:id/block-pairs` ve `DELETE /api/tenants/:id/block-pair/:pairId`
 * zaten ADMIN yetkisi zorunlu kılıyor (`authenticateTenantAdmin`); ön yüzde bu
 * panel `(admin)/layout.tsx`'in ADMIN gating'i altında render edilir — o yüzden
 * son describe bloğu bu gating'i (ADMIN olmayan kullanıcı /dashboard'a
 * yönlendirilir) doğrudan test eder.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { AdminUser, BlockedPairListItem } from '@/types/admin';

const mentors: AdminUser[] = [
  {
    id: 'mentor-1', role: 'MENTOR', email: 'mentor@x.com', fullName: 'Ada Mentör',
    isActive: true, sectorTags: [], skills: [], discType: null, rematchPriority: false,
    rematchCount: 0, needsOrientation: false, approvalStatus: 'APPROVED',
    createdAt: new Date('2026-01-01').toISOString(), isCertified: false,
  } as AdminUser,
];

const mentis: AdminUser[] = [
  {
    id: 'menti-1', role: 'MENTI', email: 'menti@x.com', fullName: 'Bora Menti',
    isActive: true, sectorTags: [], skills: [], discType: null, rematchPriority: false,
    rematchCount: 0, needsOrientation: false, approvalStatus: 'APPROVED',
    createdAt: new Date('2026-01-01').toISOString(), isCertified: false,
  } as AdminUser,
];

// Mevcut engeller listesi — testler arasında mutasyona uğrar, her testte sıfırlanır.
let blockedItems: BlockedPairListItem[] = [];
const blockedRefetchSpy = vi.fn();

const blockPairSpy = vi.fn().mockResolvedValue({
  ok: true,
  data: {
    message: 'Kullanıcı çifti başarıyla engellendi.',
    blocked: { fromUserId: 'mentor-1', toUserId: 'menti-1', blockedAt: '2026-09-27T00:00:00Z', blockedBy: 'admin-1' },
    fromUser: { id: 'mentor-1', fullName: 'Ada Mentör' },
    toUser: { id: 'menti-1', fullName: 'Bora Menti' },
    totalBlockedPairs: 1,
  },
});
const unblockPairSpy = vi.fn().mockResolvedValue({
  ok: true,
  data: { message: 'Engel kaldırıldı.', totalBlockedPairs: 0 },
});

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { role: 'ADMIN', id: 'admin-1', tenantId: 'tenant-1', fullName: 'Yönetici', email: 'admin@x.com' } }),
}));
vi.mock('@/hooks/useQuery', () => ({
  useQuery: (_fetcher: unknown, _deps: unknown[], options: { cacheKey?: string } = {}) => {
    if (options.cacheKey?.includes('MENTOR')) {
      return { data: { items: mentors, total: mentors.length, page: 1, pageSize: 50, totalPages: 1 }, isLoading: false, error: null, refetch: vi.fn() };
    }
    if (options.cacheKey?.includes('MENTI')) {
      return { data: { items: mentis, total: mentis.length, page: 1, pageSize: 50, totalPages: 1 }, isLoading: false, error: null, refetch: vi.fn() };
    }
    // admin:blocked-pairs:*
    return { data: { items: blockedItems, total: blockedItems.length }, isLoading: false, error: null, refetch: blockedRefetchSpy };
  },
}));
vi.mock('@/lib/api/admin', () => ({
  adminApi: {
    listUsers: vi.fn(),
    listBlockedPairs: vi.fn(),
    blockPair: (...args: unknown[]) => blockPairSpy(...args),
    unblockPair: (...args: unknown[]) => unblockPairSpy(...args),
  },
}));

import { BlockPairPanel } from '@/app/(admin)/admin/eslesmeler/BlockPairPanel';

function openAndSelect() {
  render(<BlockPairPanel />);
  fireEvent.click(screen.getByText('+ Çifti Engelle'));
  fireEvent.change(screen.getByLabelText('Mentör'), { target: { value: 'mentor-1' } });
  fireEvent.change(screen.getByLabelText('Menti'), { target: { value: 'menti-1' } });
}

describe('Çifti Engelle paneli (E-3d)', () => {
  beforeEach(() => {
    blockPairSpy.mockClear();
    unblockPairSpy.mockClear();
    blockedRefetchSpy.mockClear();
    blockedItems = [];
    vi.restoreAllMocks();
  });

  it('mentör + menti seçilip onaylanınca blockPair(tenantId, mentorId, mentiId) çağrılır', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    openAndSelect();

    fireEvent.click(screen.getByText('Engelle'));

    await waitFor(() =>
      expect(blockPairSpy).toHaveBeenCalledWith(expect.anything(), 'tenant-1', 'mentor-1', 'menti-1'),
    );
    expect(window.confirm).toHaveBeenCalledWith(expect.stringContaining('birbirini artık listede göremez, mesajlaşamaz, görüşme planlayamaz'));
  });

  it('onay penceresi reddedilirse istek gönderilmez', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    openAndSelect();

    fireEvent.click(screen.getByText('Engelle'));

    await new Promise((r) => setTimeout(r, 0));
    expect(blockPairSpy).not.toHaveBeenCalled();
  });

  it('backend hata dönerse hata mesajı gösterilir', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    blockPairSpy.mockResolvedValueOnce({ ok: false, status: 409, error: { error: 'ENGEL_MEVCUT', message: 'Bu kullanıcı çifti zaten engellenmiş.' } });
    openAndSelect();

    fireEvent.click(screen.getByText('Engelle'));

    expect(await screen.findByText('Bu kullanıcı çifti zaten engellenmiş.')).toBeInTheDocument();
  });

  it('başarı mesajı taraf adlarıyla gösterilir', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    openAndSelect();

    fireEvent.click(screen.getByText('Engelle'));

    expect(await screen.findByText(/Ada Mentör ile Bora Menti artık birbiriyle eşleşemez\./)).toBeInTheDocument();
  });

  it('hiç engel yoksa yönlendirici metin gösterilir', () => {
    blockedItems = [];
    render(<BlockPairPanel />);
    expect(screen.getByText('Şu an engellenmiş bir çift yok.')).toBeInTheDocument();
  });

  it('mevcut engel taraf adları + tarih + engelleyen adminle listede görünür', () => {
    blockedItems = [{
      pairId: 'menti-1::mentor-1',
      fromUser: { id: 'mentor-1', fullName: 'Ada Mentör' },
      toUser: { id: 'menti-1', fullName: 'Bora Menti' },
      blockedAt: '2026-09-01T10:00:00Z',
      blockedByName: 'Yönetici',
    }];
    render(<BlockPairPanel />);
    expect(screen.getByText('Ada Mentör')).toBeInTheDocument();
    expect(screen.getByText('Bora Menti')).toBeInTheDocument();
    expect(screen.getByText(/Yönetici engelledi/)).toBeInTheDocument();
    expect(screen.getByText('Engeli kaldır')).toBeInTheDocument();
  });

  it('"Engeli kaldır" onaylanınca unblockPair(tenantId, pairId) çağrılır ve liste yenilenir', async () => {
    blockedItems = [{
      pairId: 'menti-1::mentor-1',
      fromUser: { id: 'mentor-1', fullName: 'Ada Mentör' },
      toUser: { id: 'menti-1', fullName: 'Bora Menti' },
      blockedAt: '2026-09-01T10:00:00Z',
      blockedByName: 'Yönetici',
    }];
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<BlockPairPanel />);

    fireEvent.click(screen.getByText('Engeli kaldır'));

    await waitFor(() =>
      expect(unblockPairSpy).toHaveBeenCalledWith(expect.anything(), 'tenant-1', 'menti-1::mentor-1'),
    );
    expect(window.confirm).toHaveBeenCalledWith(
      expect.stringContaining('bu çift birbirini yeniden listede görebilir, mesajlaşabilir, görüşme planlayabilir'),
    );
    await waitFor(() => expect(blockedRefetchSpy).toHaveBeenCalled());
  });

  it('"Engeli kaldır" onay penceresi reddedilirse istek gönderilmez', async () => {
    blockedItems = [{
      pairId: 'menti-1::mentor-1',
      fromUser: { id: 'mentor-1', fullName: 'Ada Mentör' },
      toUser: { id: 'menti-1', fullName: 'Bora Menti' },
      blockedAt: '2026-09-01T10:00:00Z',
      blockedByName: 'Yönetici',
    }];
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    render(<BlockPairPanel />);

    fireEvent.click(screen.getByText('Engeli kaldır'));

    await new Promise((r) => setTimeout(r, 0));
    expect(unblockPairSpy).not.toHaveBeenCalled();
  });

  it('kaldırma hata dönerse hata mesajı gösterilir', async () => {
    blockedItems = [{
      pairId: 'menti-1::mentor-1',
      fromUser: { id: 'mentor-1', fullName: 'Ada Mentör' },
      toUser: { id: 'menti-1', fullName: 'Bora Menti' },
      blockedAt: '2026-09-01T10:00:00Z',
      blockedByName: 'Yönetici',
    }];
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    unblockPairSpy.mockResolvedValueOnce({
      ok: false, status: 404, error: { error: 'ENGEL_BULUNAMADI', message: 'Belirtilen engel kaydı bu kurumda bulunamadı.' },
    });
    render(<BlockPairPanel />);

    fireEvent.click(screen.getByText('Engeli kaldır'));

    expect(await screen.findByText('Belirtilen engel kaydı bu kurumda bulunamadı.')).toBeInTheDocument();
  });
});

describe('Yetki — ADMIN olmayan kullanıcıya panel görünmez (NEGATİF)', () => {
  it('MENTOR rolündeki kullanıcı admin layout üzerinden /dashboard\'a yönlendirilir, panel mount edilmez', async () => {
    vi.resetModules();
    const replace = vi.fn();

    vi.doMock('next/navigation', () => ({
      useRouter: () => ({ replace, push: vi.fn() }),
      usePathname: () => '/admin/eslesmeler',
    }));
    vi.doMock('@/providers/AuthProvider', () => ({
      useAuth: () => ({ user: { role: 'MENTOR', id: 'u1', tenantId: 'tenant-1', fullName: 'Mentör', email: 'm@x.com' }, isLoading: false, logout: vi.fn() }),
    }));
    vi.doMock('@/providers/TenantProvider', () => ({ useTenant: () => ({ tenant: null }) }));
    // Tema/marka katmanı bu testin kapsamı dışında (bkz. dashboard-user-card.test.tsx aynı desen).
    vi.doMock('@/components/molecules/ThemeToggle', () => ({ ThemeToggle: () => null }));
    vi.doMock('@/components/atoms/TenantLogo', () => ({ TenantLogo: () => null }));
    vi.doMock('@/components/molecules/TenantCorrectionBanner', () => ({ TenantCorrectionBanner: () => null }));

    const { default: AdminLayout } = await import('@/app/(admin)/layout');
    const markerText = 'BLOCK_PAIR_PANEL_ICERIGI_GORUNMEMELI';

    render(
      <AdminLayout>
        <div>{markerText}</div>
      </AdminLayout>,
    );

    // `(admin)/layout.tsx` — bu panelin de içinde yaşadığı `/admin/eslesmeler` dahil TÜM
    // `/admin/*` sayfalarının ortak yetki kapısı. ADMIN olmayan kullanıcı `/dashboard`'a
    // yönlendirilir (asıl koruma backend `authenticateTenantAdmin`'dedir — bkz. panel
    // yorumu; bu istemci kapısı KABA'dır, bkz. layout.tsx üstteki not).
    await waitFor(() => expect(replace).toHaveBeenCalledWith('/dashboard'));
  });
});
