/**
 * Onay Kuyruğu — boş durum davet yönlendirmesi (U-09).
 *
 * Hata: kuyruk boşken "🎉 Tüm kayıtlar işlendi" yazıyordu — hiç kayıt gelmemişken
 * de aynı metin çıkıyor, yanıltıyordu; ayrıca yeni admini davete yönlendiren düğme yoktu.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ApprovalsPage from '@/app/(admin)/admin/approvals/page';

const queryMock = {
  data: { items: [] as unknown[], total: 0, totalPages: 1 },
  isLoading: false,
  error: null as string | null,
};

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ ...queryMock, refetch: vi.fn() }),
}));

describe('Onay Kuyruğu — boş durum', () => {
  it('boşken yanıltıcı "tüm kayıtlar işlendi" yerine davet yönlendirmesi gösterir', () => {
    render(<ApprovalsPage />);

    expect(screen.queryByText(/Tüm kayıtlar işlendi/)).not.toBeInTheDocument();
    const invite = screen.getByRole('link', { name: /Davet gönder/ });
    expect(invite).toHaveAttribute('href', '/admin/invite');
  });
});
