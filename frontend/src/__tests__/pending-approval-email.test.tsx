/**
 * /pending-approval — e-posta gösterimi testi (U-07, AJ-24).
 *
 * Hata (U-07): PENDING local kullanıcıya JWT verilmediğinden `user` null → `{user?.email}`
 * boş çiziliyordu; kullanıcı kendi adresini göremiyordu.
 * AJ-24: e-posta artık URL'de (`?email=`) değil, giriş formunun sekme belleğine bıraktığı
 * değerden okunur (lib/pendingApprovalEmail). URL'deki e-posta dikkate alınmaz.
 */

import { afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PendingApprovalPage from '@/app/pending-approval/page';
import {
  clearPendingApprovalEmail,
  readPendingApprovalEmail,
  storePendingApprovalEmail,
} from '@/lib/pendingApprovalEmail';

const authMock = { user: null as { email?: string; fullName?: string } | null };
const searchMock = { email: null as string | null };

vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: authMock.user, logout: vi.fn() }),
}));
vi.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: (k: string) => (k === 'email' ? searchMock.email : null) }),
}));

afterEach(() => {
  clearPendingApprovalEmail();
  searchMock.email = null;
});

describe('/pending-approval — e-posta', () => {
  it('token yokken (user null) sekme belleğindeki e-posta gösterilir', async () => {
    authMock.user = null;
    storePendingApprovalEmail('aday@kurum.com');

    render(<PendingApprovalPage />);

    expect(await screen.findByText('aday@kurum.com')).toBeInTheDocument();
  });

  it('URL query e-postası artık okunmaz (adres URL ile taşınmaz)', () => {
    authMock.user = null;
    searchMock.email = 'query@kurum.com';

    render(<PendingApprovalPage />);

    expect(screen.queryByText('query@kurum.com')).not.toBeInTheDocument();
    expect(screen.getByText(/kayıtlı e-posta adresinize bildirim gönderilecek/)).toBeInTheDocument();
  });

  it('e-posta hiç yoksa boş yerine anlaşılır yedek metin gösterilir', () => {
    authMock.user = null;

    render(<PendingApprovalPage />);

    expect(
      screen.getByText(/kayıtlı e-posta adresinize bildirim gönderilecek/),
    ).toBeInTheDocument();
  });

  it('token varsa user.email sekme belleği yerine öncelikli gösterilir', async () => {
    authMock.user = { email: 'giris@kurum.com' };
    storePendingApprovalEmail('bellek@kurum.com');

    render(<PendingApprovalPage />);

    expect(await screen.findByText('giris@kurum.com')).toBeInTheDocument();
    expect(screen.queryByText('bellek@kurum.com')).not.toBeInTheDocument();
  });

  it('boş/boşluk e-posta saklanmaz, önceki değer temizlenir', () => {
    storePendingApprovalEmail('eski@kurum.com');
    storePendingApprovalEmail('   ');
    expect(readPendingApprovalEmail()).toBeNull();
  });
});
