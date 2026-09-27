/**
 * IC-08 — onay bekleyen kullanıcı yöneticinin "düzeltme iste" notunu ekranda görür.
 * Not giriş yanıtından (correctionNote) sekme belleğine bırakılır; URL'ye konmaz.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PendingApprovalPage from '@/app/pending-approval/page';
import {
  clearPendingCorrectionNote,
  readPendingCorrectionNote,
  storePendingCorrectionNote,
} from '@/lib/pendingCorrectionNote';

vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: null, logout: vi.fn() }),
}));
vi.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: () => null }),
}));

afterEach(() => clearPendingCorrectionNote());

describe('IC-08 — /pending-approval düzeltme notu', () => {
  it('not varsa "Yöneticinizin notu" kutusunda gösterilir', async () => {
    storePendingCorrectionNote('Profil fotoğrafını ekleyin.');
    render(<PendingApprovalPage />);
    expect(await screen.findByText('Yöneticinizin notu')).toBeInTheDocument();
    expect(screen.getByText('Profil fotoğrafını ekleyin.')).toBeInTheDocument();
  });

  it('not yoksa kutu hiç çizilmez', () => {
    render(<PendingApprovalPage />);
    expect(screen.queryByText('Yöneticinizin notu')).not.toBeInTheDocument();
  });

  it('boş/null not saklanmaz, önceki not temizlenir', () => {
    storePendingCorrectionNote('eski not');
    storePendingCorrectionNote(null);
    expect(readPendingCorrectionNote()).toBeNull();
    storePendingCorrectionNote('   ');
    expect(readPendingCorrectionNote()).toBeNull();
  });
});
