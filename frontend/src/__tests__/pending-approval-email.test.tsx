/**
 * /pending-approval — e-posta gösterimi testi (U-07).
 *
 * Hata: PENDING local kullanıcıya JWT verilmediğinden `user` null → `{user?.email}`
 * boş çiziliyordu; kullanıcı kendi adresini göremiyordu. Düzeltme: login formu
 * e-postayı `?email=` query'siyle taşıyor, sayfa onu yedek olarak kullanıyor.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PendingApprovalPage from '@/app/pending-approval/page';

const authMock = { user: null as { email?: string; fullName?: string } | null };
const searchMock = { email: null as string | null };

vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: authMock.user, logout: vi.fn() }),
}));
vi.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: (k: string) => (k === 'email' ? searchMock.email : null) }),
}));

describe('/pending-approval — e-posta', () => {
  it('token yokken (user null) query e-postası gösterilir', () => {
    authMock.user = null;
    searchMock.email = 'aday@kurum.com';

    render(<PendingApprovalPage />);

    expect(screen.getByText('aday@kurum.com')).toBeInTheDocument();
  });

  it('e-posta hiç yoksa boş yerine anlaşılır yedek metin gösterilir', () => {
    authMock.user = null;
    searchMock.email = null;

    render(<PendingApprovalPage />);

    expect(
      screen.getByText(/kayıtlı e-posta adresinize bildirim gönderilecek/),
    ).toBeInTheDocument();
  });

  it('token varsa user.email query yerine öncelikli gösterilir', () => {
    authMock.user = { email: 'giris@kurum.com' };
    searchMock.email = 'query@kurum.com';

    render(<PendingApprovalPage />);

    expect(screen.getByText('giris@kurum.com')).toBeInTheDocument();
    expect(screen.queryByText('query@kurum.com')).not.toBeInTheDocument();
  });
});
