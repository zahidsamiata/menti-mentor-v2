/**
 * U-14 — süresi dolmuş/geçersiz davette "yeni link iste" düğmesi.
 *
 * Eskiden davet linki geçersiz/expired olduğunda yalnız düz metin ("yöneticinizden isteyin")
 * vardı, eyleme dönük düğme yoktu. Artık "Yeni davet iste" (mailto) + "Giriş yap" düğmeleri var.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import JoinContent from '@/app/join/_JoinContent';

const fetchInvitationMock = vi.fn();

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('token=expired-token'),
}));
vi.mock('@/lib/api/invitation', () => ({
  fetchInvitation: (...args: unknown[]) => fetchInvitationMock(...args),
}));

describe('Davet geçersiz/expired ekranı — yeni link düğmesi (U-14)', () => {
  beforeEach(() => {
    fetchInvitationMock.mockReset();
  });

  it('token geçersizse "Yeni davet iste" ve "Giriş yap" düğmeleri görünür', async () => {
    fetchInvitationMock.mockResolvedValue({ valid: false, message: 'Davetin süresi dolmuş.' });

    render(<JoinContent />);

    await waitFor(() => {
      expect(screen.getByText('Davetin süresi dolmuş.')).toBeInTheDocument();
    });

    const request = screen.getByRole('link', { name: 'Yeni davet iste' });
    expect(request).toHaveAttribute('href', expect.stringContaining('mailto:'));
    expect(screen.getByRole('link', { name: /Giriş yap/ })).toHaveAttribute('href', '/login');
  });
});
