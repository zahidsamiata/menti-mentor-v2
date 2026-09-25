/**
 * F-33 (G8-14) — menti/mentör panelinde sol-alt kullanıcı kartı.
 *
 * Kapsam:
 *  - MENTI ve MENTOR panelinde kart, oturumdaki kullanıcının KENDİ adı + rolü + e-postasıyla çizilir.
 *  - Karttaki "Çıkış Yap" oturumu kapatıp /login'e yönlendirir.
 *  - Negatif: oturum yoksa kart çizilmez; ADMIN'de (kendi sidebar kartı var) DashboardNav kart çizmez.
 *  - Admin davranışı korunur: ortak UserCard rol/aria verilmeden eski admin kartıyla aynı içeriği çizer.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';

const routerReplace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter:   () => ({ replace: routerReplace, push: vi.fn() }),
  usePathname: () => '/menti',
}));

vi.mock('@/providers/AuthProvider', () => ({
  useAuth: vi.fn(),
}));

// Nav testi tema/mesaj katmanını kapsamaz (ux-fixes.test.tsx ile aynı gerekçe).
vi.mock('@/components/molecules/ThemeToggle',  () => ({ ThemeToggle: () => null }));
vi.mock('@/components/organisms/MessagesBell', () => ({ MessagesBell: () => null }));

import { useAuth } from '@/providers/AuthProvider';
import { DashboardNav } from '@/components/organisms/DashboardNav';
import { UserCard } from '@/components/molecules/UserCard';

const makeUser = (role: string) => ({
  id: 'u1', tenantId: 't1', role,
  fullName: 'Deneme Kullanıcı', email: 'deneme@ornek.test',
  approvalStatus: 'APPROVED', authProvider: 'LOCAL',
  discType: 'D', needsOrientation: false,
});

describe('DashboardNav — sol-alt kullanıcı kartı (F-33)', () => {
  beforeEach(() => {
    routerReplace.mockReset();
  });

  it('MENTI → kart kendi adı, "Menti" rolü ve e-postasıyla görünür', () => {
    vi.mocked(useAuth).mockReturnValue({ user: makeUser('MENTI'), logout: vi.fn() } as never);
    render(<DashboardNav />);

    const card = screen.getByRole('region', { name: 'Kullanıcı kartı' });
    expect(within(card).getByText('Deneme Kullanıcı')).toBeInTheDocument();
    expect(within(card).getByText('Menti')).toBeInTheDocument();
    expect(within(card).getByText('deneme@ornek.test')).toBeInTheDocument();
    expect(within(card).getByRole('button', { name: /Çıkış Yap/ })).toBeInTheDocument();
  });

  it('MENTOR → kart kendi adı ve "Mentör" rolüyle görünür', () => {
    vi.mocked(useAuth).mockReturnValue({ user: makeUser('MENTOR'), logout: vi.fn() } as never);
    render(<DashboardNav />);

    const card = screen.getByRole('region', { name: 'Kullanıcı kartı' });
    expect(within(card).getByText('Deneme Kullanıcı')).toBeInTheDocument();
    expect(within(card).getByText('Mentör')).toBeInTheDocument();
  });

  it('karttaki "Çıkış Yap" oturumu kapatır ve /login\'e yönlendirir', async () => {
    const logout = vi.fn().mockResolvedValue(undefined);
    vi.mocked(useAuth).mockReturnValue({ user: makeUser('MENTI'), logout } as never);
    render(<DashboardNav />);

    const card = screen.getByRole('region', { name: 'Kullanıcı kartı' });
    fireEvent.click(within(card).getByRole('button', { name: /Çıkış Yap/ }));

    await waitFor(() => expect(routerReplace).toHaveBeenCalledWith('/login'));
    expect(logout).toHaveBeenCalledTimes(1);
  });

  it('negatif: oturum yoksa kart çizilmez', () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, logout: vi.fn() } as never);
    const { container } = render(<DashboardNav />);

    expect(screen.queryByRole('region', { name: 'Kullanıcı kartı' })).not.toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });

  it('negatif: ADMIN için DashboardNav kart çizmez (admin kendi sidebar kartını kullanır)', () => {
    vi.mocked(useAuth).mockReturnValue({ user: makeUser('ADMIN'), logout: vi.fn() } as never);
    render(<DashboardNav />);

    expect(screen.queryByRole('region', { name: 'Kullanıcı kartı' })).not.toBeInTheDocument();
  });
});

describe('UserCard — admin kullanımı (davranış korunur)', () => {
  it('rol/aria verilmezse yalnız ad + e-posta + çıkış çizer, bölge rolü eklemez', () => {
    const onLogout = vi.fn();
    render(<UserCard fullName="Yönetici Kişi" email="yonetici@ornek.test" onLogout={onLogout} />);

    expect(screen.getByText('Yönetici Kişi')).toBeInTheDocument();
    expect(screen.getByText('yonetici@ornek.test')).toBeInTheDocument();
    expect(screen.queryByRole('region')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Çıkış Yap/ }));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});
