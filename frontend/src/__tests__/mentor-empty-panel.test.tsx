/**
 * P-09 — mentör boş paneli + mesaj boş durumu rol metni.
 *
 * - Mesajlar boş durumunda mentör "Bir mentöre mesaj gönderdiğinizde…" (menti ağzı)
 *   yerine kendi rolüne uygun metni görür.
 * - Mentör onay kuyruğu kartı boşken kaybolmaz; yönlendirici boş-durum metni gösterir.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MessagesInboxPage from '@/app/(dashboard)/messages/page';

const authMock = { user: { id: 'u1', role: 'MENTOR' } as { id: string; role: string } };
const queryMock = { data: undefined as unknown };

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: authMock.user, isLoading: false }),
}));
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ data: queryMock.data, isLoading: false, error: null }),
}));

describe('Mesajlar boş durumu — rol metni (P-09)', () => {
  beforeEach(() => {
    queryMock.data = { items: [], total: 0 };
  });

  it('MENTOR menti ağzıyla yazılmış metni GÖRMEZ', () => {
    authMock.user = { id: 'u1', role: 'MENTOR' };
    render(<MessagesInboxPage />);
    expect(screen.getByText(/Bir menti sizinle iletişime geçtiğinde/)).toBeInTheDocument();
    expect(screen.queryByText(/Bir mentöre mesaj gönderdiğinizde/)).not.toBeInTheDocument();
  });

  it('MENTI kendi rolüne uygun metni görür', () => {
    authMock.user = { id: 'u2', role: 'MENTI' };
    render(<MessagesInboxPage />);
    expect(screen.getByText(/Bir mentöre mesaj gönderdiğinizde/)).toBeInTheDocument();
  });
});
