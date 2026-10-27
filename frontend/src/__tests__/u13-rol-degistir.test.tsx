/**
 * U-13 (KARAR-83 A) — Yöneticiler sayfası: yöneticilikten çıkarırken yeni rol açıkça seçilir
 * (eskiden herkes sessizce "Mentör" oluyordu); "Üye rolleri" ile mentör ↔ menti değiştirilir.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ManagersPage from '@/app/(admin)/admin/managers/page';
import { clearQueryCache } from '@/lib/queryCache';

const stableApi = {};
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => stableApi }));

const demoteFromAdmin = vi.fn(() => Promise.resolve({ ok: true, data: { ok: true, role: 'MENTI' } }));
const changeMemberRole = vi.fn(() => Promise.resolve({ ok: true, data: { ok: true, role: 'MENTI' } }));

vi.mock('@/lib/api/admin', () => ({
  adminApi: {
    listAdmins: () => Promise.resolve({
      ok: true,
      data: { items: [
        { id: 'a1', fullName: 'Yönetici Bir', email: 'a1@x' },
        { id: 'a2', fullName: 'Yönetici İki', email: 'a2@x' },
      ], total: 2 },
    }),
    listUsers: () => Promise.resolve({
      ok: true,
      data: { items: [
        { id: 'a1', fullName: 'Yönetici Bir', email: 'a1@x', role: 'ADMIN' },
        { id: 'm1', fullName: 'Mentör Kişi', email: 'm1@x', role: 'MENTOR' },
      ], total: 2, page: 1, totalPages: 1 },
    }),
    promoteToAdmin: vi.fn(),
    demoteFromAdmin: (...args: unknown[]) => demoteFromAdmin(...(args as [])),
    changeMemberRole: (...args: unknown[]) => changeMemberRole(...(args as [])),
  },
}));

beforeEach(() => {
  clearQueryCache();
  demoteFromAdmin.mockClear();
  changeMemberRole.mockClear();
  vi.spyOn(window, 'confirm').mockReturnValue(true);
});

describe('U-13 Yöneticiler sayfası', () => {
  it('yöneticilikten çıkarırken seçilen rol (Menti) gönderilir', async () => {
    render(<ManagersPage />);
    const buttons = await screen.findAllByText('Yöneticilikten çıkar');
    fireEvent.click(buttons[1]!);
    fireEvent.click(screen.getByRole('button', { name: 'Menti' }));
    await waitFor(() => expect(demoteFromAdmin).toHaveBeenCalledWith(stableApi, 'a2', 'MENTI'));
  });

  it('rol seçilmeden istek gitmez (Vazgeç)', async () => {
    render(<ManagersPage />);
    const buttons = await screen.findAllByText('Yöneticilikten çıkar');
    fireEvent.click(buttons[0]!);
    fireEvent.click(screen.getByText('Vazgeç'));
    expect(demoteFromAdmin).not.toHaveBeenCalled();
  });

  it('Üye rolleri: mentör menti yapılır; yönetici listede yok', async () => {
    render(<ManagersPage />);
    fireEvent.click(await screen.findByText('Üye rolleri'));
    fireEvent.click(await screen.findByRole('button', { name: 'Menti yap' }));
    await waitFor(() => expect(changeMemberRole).toHaveBeenCalledWith(stableApi, 'm1', 'MENTI'));
    expect(screen.queryByText('Şu anki rol: Yönetici')).not.toBeInTheDocument();
  });
});
