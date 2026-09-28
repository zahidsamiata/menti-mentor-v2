/**
 * AJ-106 — Çifti Engelle paneli seçim listesi araması.
 *
 * Eskiden mentör/menti seçim kutuları yalnız `GET /api/admin/users` İLK sayfasını (50 kişi)
 * gösteriyordu; 50'den fazla onaylı üyesi olan kurumda sonrakiler hiç seçilemiyordu. Artık
 * her kutunun üstünde ada göre arama var: yazılan metin backend `search` parametresiyle
 * TÜM onaylı üyelerde aranır ve ilk sayfada olmayan kişi de seçilip engellenebilir.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useEffect, useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { AdminUser } from '@/types/admin';

function user(id: string, role: 'MENTOR' | 'MENTI', fullName: string): AdminUser {
  return {
    id, role, email: `${id}@x.com`, fullName,
    isActive: true, sectorTags: [], skills: [], discType: null, rematchPriority: false,
    rematchCount: 0, needsOrientation: false, approvalStatus: 'APPROVED',
    createdAt: new Date('2026-01-01').toISOString(), isCertified: false,
  } as AdminUser;
}

// İlk sayfa: 50 menti, aranan kişi YOK (toplam 51 → 2 sayfa).
const firstPageMentis = Array.from({ length: 50 }, (_, i) => user(`menti-${i}`, 'MENTI', `Menti ${i}`));
const hiddenMenti = user('menti-51', 'MENTI', 'Aranan Üye');
const mentor = user('mentor-1', 'MENTOR', 'Ada Mentör');

type ListParams = { role?: string; approvalStatus?: string; search?: string };
const listUsersSpy = vi.fn(async (_api: unknown, params: ListParams) => {
  if (params.role === 'MENTOR') {
    return { ok: true, data: { items: [mentor], total: 1, page: 1, pageSize: 50, totalPages: 1 } };
  }
  if (params.search) {
    const q = params.search.toLocaleLowerCase('tr-TR');
    const all = [...firstPageMentis, hiddenMenti].filter((u) => u.fullName.toLocaleLowerCase('tr-TR').includes(q));
    return { ok: true, data: { items: all, total: all.length, page: 1, pageSize: 50, totalPages: 1 } };
  }
  return { ok: true, data: { items: firstPageMentis, total: 51, page: 1, pageSize: 50, totalPages: 2 } };
});
const blockPairSpy = vi.fn().mockResolvedValue({ ok: true, data: { totalBlockedPairs: 1 } });

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { role: 'ADMIN', id: 'admin-1', tenantId: 'tenant-1', fullName: 'Yönetici', email: 'admin@x.com' } }),
}));
// Gerçek fetcher'ı deps değişince çağıran küçük useQuery (önbellek katmanı bu testin konusu değil).
vi.mock('@/hooks/useQuery', () => ({
  useQuery: <T,>(
    fetcher: () => Promise<{ ok: boolean; data?: T }>,
    deps: unknown[],
    options: { enabled?: boolean } = {},
  ) => {
    const [data, setData] = useState<T | null>(null);
    const enabled = options.enabled ?? true;
    useEffect(() => {
      if (!enabled) return;
      let alive = true;
      void fetcher().then((r) => { if (alive && r.ok) setData(r.data ?? null); });
      return () => { alive = false; };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, ...deps]);
    return { data, isLoading: false, error: null, refetch: vi.fn() };
  },
}));
vi.mock('@/lib/api/admin', () => ({
  adminApi: {
    listUsers: (...args: [unknown, ListParams]) => listUsersSpy(...args),
    listBlockedPairs: vi.fn().mockResolvedValue({ ok: true, data: { items: [], total: 0 } }),
    blockPair: (...args: unknown[]) => blockPairSpy(...args),
    unblockPair: vi.fn(),
  },
}));

import { BlockPairPanel } from '@/app/(admin)/admin/eslesmeler/BlockPairPanel';

function mentiOptionIds(): string[] {
  const select = screen.getByLabelText('Menti') as HTMLSelectElement;
  return Array.from(select.options).map((o) => o.value).filter(Boolean);
}

describe('Çifti Engelle — seçim listesi araması (AJ-106)', () => {
  beforeEach(() => {
    listUsersSpy.mockClear();
    blockPairSpy.mockClear();
  });

  it('ilk sayfada olmayan menti adıyla aranınca bulunur, seçilir ve engellenir', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<BlockPairPanel />);
    fireEvent.click(screen.getByText('+ Çifti Engelle'));

    // Arama öncesi: yalnız ilk sayfa, aranan kişi yok; "ilk 50 kişi" uyarısı görünür.
    await waitFor(() => expect(mentiOptionIds()).toHaveLength(50));
    expect(mentiOptionIds()).not.toContain('menti-51');
    expect(screen.getByText(/İlk 50 kişi gösteriliyor \(51 kişiden\)/)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Menti ara'), { target: { value: 'aranan' } });

    await waitFor(() => expect(mentiOptionIds()).toEqual(['menti-51']));
    expect(listUsersSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ role: 'MENTI', approvalStatus: 'APPROVED', search: 'aranan' }),
    );

    await waitFor(() =>
      expect(Array.from((screen.getByLabelText('Mentör') as HTMLSelectElement).options).map((o) => o.value)).toContain('mentor-1'),
    );
    fireEvent.change(screen.getByLabelText('Mentör'), { target: { value: 'mentor-1' } });
    fireEvent.change(screen.getByLabelText('Menti'), { target: { value: 'menti-51' } });
    fireEvent.click(screen.getByText('Engelle'));

    await waitFor(() =>
      expect(blockPairSpy).toHaveBeenCalledWith(expect.anything(), 'tenant-1', 'mentor-1', 'menti-51'),
    );
    expect(window.confirm).toHaveBeenCalledWith(expect.stringContaining('Ada Mentör ile Aranan Üye'));
  });

  it('seçilen kişi, arama değişip sonuçtan düşse de seçili kalır', async () => {
    render(<BlockPairPanel />);
    fireEvent.click(screen.getByText('+ Çifti Engelle'));

    fireEvent.change(screen.getByLabelText('Menti ara'), { target: { value: 'aranan' } });
    await waitFor(() => expect(mentiOptionIds()).toEqual(['menti-51']));
    fireEvent.change(screen.getByLabelText('Menti'), { target: { value: 'menti-51' } });

    fireEvent.change(screen.getByLabelText('Menti ara'), { target: { value: 'Menti 7' } });
    await waitFor(() => expect(mentiOptionIds()).toContain('menti-7'));
    expect(mentiOptionIds()).toContain('menti-51');
    expect((screen.getByLabelText('Menti') as HTMLSelectElement).value).toBe('menti-51');
  });

  it('eşleşme yoksa bilgilendirici metin gösterilir', async () => {
    render(<BlockPairPanel />);
    fireEvent.click(screen.getByText('+ Çifti Engelle'));

    fireEvent.change(screen.getByLabelText('Menti ara'), { target: { value: 'yokboyle' } });
    expect(await screen.findByText('Bu adla eşleşen onaylı menti bulunamadı.')).toBeInTheDocument();
  });
});
