/**
 * AJ-65 — yönetici mentör/menti havuzunda pasifleştirilmiş kişi "Pasif" rozetiyle ayırt edilir
 * (admin KARAR 3: durum rozeti Onaylı / Bekliyor / Pasif).
 *
 * Önceden rozet yalnız onay durumundan türüyordu; `isActive=false` onaylı kişi "Onaylı" görünüyordu.
 * - saf yardımcı: pasif → "Pasif" (onay durumundan önce gelir); etkin → onay rozeti;
 * - iki sayfa: pasif kişinin kartında "Pasif" var, etkin kişide yok (negatif).
 *
 * AJ-63 güncellemesi: havuz tablodan karta geçti (admin KARAR 2) → kişinin kapsayıcısı `tr` yerine
 * `article` (AdminPoolCard). Beklentiler aynen korunuyor.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import MentorHavuzuPage from '@/app/(admin)/admin/mentor-havuzu/page';
import MentiHavuzuPage from '@/app/(admin)/admin/menti-havuzu/page';
import { userStatusBadge } from '@/lib/enumLabels';
import type { AdminUser } from '@/types/admin';

function makeUser(over: Partial<AdminUser>): AdminUser {
  return {
    id: 'u',
    role: 'MENTOR',
    email: 'kisi@example.com',
    fullName: 'Kişi',
    isActive: true,
    sectorTags: [],
    skills: [],
    discType: null,
    rematchPriority: false,
    rematchCount: 0,
    needsOrientation: false,
    approvalStatus: 'APPROVED',
    createdAt: '2026-09-01T00:00:00.000Z',
    isCertified: false,
    ...over,
  } as AdminUser;
}

let items: AdminUser[] = [];
const listUsers = vi.fn(async () => ({
  ok: true,
  data: { items, total: items.length, page: 1, pageSize: 20, totalPages: 1 },
}));

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => vi.fn() }));
vi.mock('@/lib/api/admin', () => ({ adminApi: { listUsers: (...args: unknown[]) => listUsers(...(args as [])) } }));

describe('userStatusBadge (AJ-65)', () => {
  it('pasif kişi → "Pasif" (onay durumu ne olursa olsun)', () => {
    expect(userStatusBadge({ isActive: false, approvalStatus: 'APPROVED' }).label).toBe('Pasif');
    expect(userStatusBadge({ isActive: false, approvalStatus: 'PENDING' }).label).toBe('Pasif');
    expect(userStatusBadge({ isActive: false, approvalStatus: 'REJECTED' }).label).toBe('Pasif');
  });

  it('negatif: etkin kişi → onay rozeti, "Pasif" değil', () => {
    expect(userStatusBadge({ isActive: true, approvalStatus: 'APPROVED' }).label).toBe('Onaylı');
    expect(userStatusBadge({ isActive: true, approvalStatus: 'PENDING' }).label).toBe('Bekliyor');
    expect(userStatusBadge({ isActive: true, approvalStatus: 'REJECTED' }).label).toBe('Reddedildi');
  });
});

describe.each([
  ['Mentör havuzu', MentorHavuzuPage, 'MENTOR' as const],
  ['Menti havuzu', MentiHavuzuPage, 'MENTI' as const],
])('%s — Pasif rozeti (AJ-65)', (_name, Page, role) => {
  beforeEach(() => {
    listUsers.mockClear();
    items = [
      makeUser({ id: 'p1', role, fullName: 'Pasif Kişi', email: 'pasif@example.com', isActive: false }),
      makeUser({ id: 'a1', role, fullName: 'Etkin Kişi', email: 'etkin@example.com', isActive: true }),
    ];
  });

  it('isActive=false kartında "Pasif" rozeti var, "Onaylı" yok', async () => {
    render(<Page />);
    const row = (await screen.findByText('Pasif Kişi')).closest('article') as HTMLElement;
    expect(within(row).getByText('Pasif')).toBeInTheDocument();
    expect(within(row).queryByText('Onaylı')).not.toBeInTheDocument();
  });

  it('negatif: isActive=true kartında "Pasif" yok, onay rozeti var', async () => {
    render(<Page />);
    const row = (await screen.findByText('Etkin Kişi')).closest('article') as HTMLElement;
    expect(within(row).queryByText('Pasif')).not.toBeInTheDocument();
    expect(within(row).getByText('Onaylı')).toBeInTheDocument();
  });
});
