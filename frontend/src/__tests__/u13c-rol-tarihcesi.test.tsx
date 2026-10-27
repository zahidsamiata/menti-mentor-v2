/**
 * U-13C (KARAR-83 C) — rol tarihçesi: "Mentör → Menti · tarih · değiştiren: <ad>".
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RoleHistory } from '@/components/molecules/RoleHistory';

const stableApi = {};
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => stableApi }));
const getRoleHistory = vi.fn();
vi.mock('@/lib/api/admin', () => ({ adminApi: { getRoleHistory: (...a: unknown[]) => getRoleHistory(...a) } }));

describe('U-13C rol tarihçesi', () => {
  it('önceki → yeni rol ve değiştireni gösterir', async () => {
    getRoleHistory.mockResolvedValue({
      ok: true,
      data: { items: [{ id: 'r1', previousRole: 'MENTOR', newRole: 'MENTI', createdAt: '2026-10-27T09:00:00Z', changedByName: 'Yönetici Bir' }] },
    });
    render(<RoleHistory userId="u1" />);
    expect(await screen.findByText(/Mentör → Menti/)).toHaveTextContent('değiştiren: Yönetici Bir');
    expect(getRoleHistory).toHaveBeenCalledWith(stableApi, 'u1');
  });

  it('kayıt yoksa bunu söyler', async () => {
    getRoleHistory.mockResolvedValue({ ok: true, data: { items: [] } });
    render(<RoleHistory userId="u1" />);
    expect(await screen.findByText('Rol değişikliği kaydı yok.')).toBeInTheDocument();
  });
});
