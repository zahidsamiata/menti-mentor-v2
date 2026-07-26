import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminCertificationPage from '@/app/(admin)/admin/certification/page';

/** Paket E — STK admin: sertifika konularını aç/kapat. */

let topicsState = [
  { topic: 'gizlilik-guven', isRedLine: true, variantCount: 2, enabled: true },
  { topic: 'aktif-dinleme', isRedLine: false, variantCount: 2, enabled: true },
];

const apiMock = vi.fn(async (path: string, opts?: { method?: string; body?: { topic: string; enabled: boolean } }) => {
  if (path === '/api/scoring/certification/topics' && (!opts || opts.method !== 'PATCH')) {
    return { ok: true, data: { topics: topicsState } };
  }
  if (path === '/api/scoring/certification/topics' && opts?.method === 'PATCH') {
    topicsState = topicsState.map((t) =>
      t.topic === opts.body!.topic ? { ...t, enabled: opts.body!.enabled } : t,
    );
    return { ok: true, data: { topics: topicsState } };
  }
  return { ok: false, error: { error: 'X' }, status: 500 };
});

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { role: 'ADMIN', id: 'a1', tenantId: 't1' } }),
}));

describe('AdminCertificationPage', () => {
  it('konuları listeler ve toggle ile kapatır', async () => {
    render(<AdminCertificationPage />);

    // Konu başlıkları okunabilir etiketle görünür
    await screen.findByText('Gizlilik & güven');
    expect(screen.getByText('Aktif dinleme & yargılamama')).toBeInTheDocument();

    // İki switch (aç/kapat) render edilir
    const switches = screen.getAllByRole('switch');
    expect(switches.length).toBe(2);
    expect(switches[0]).toHaveAttribute('aria-checked', 'true');

    // İlk konuyu kapat
    fireEvent.click(switches[0]!);
    await waitFor(() => {
      expect(screen.getAllByRole('switch')[0]).toHaveAttribute('aria-checked', 'false');
    });
    expect(apiMock).toHaveBeenCalledWith(
      '/api/scoring/certification/topics',
      expect.objectContaining({ method: 'PATCH' }),
    );
  });
});
