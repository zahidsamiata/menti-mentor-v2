import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminCertificationPage from '@/app/(admin)/admin/certification/page';

/** STK admin: konu aç/kapat, red-line kilitli, eşik özeti. */

type T = { topic: string; isRedLine: boolean; variantCount: number; enabled: boolean; locked: boolean };
function overview(topics: T[]) {
  const activeCount = topics.filter((t) => t.enabled).length;
  return { topics, activeCount, requiredToPass: Math.ceil(activeCount * 0.8), minActiveTopics: 5, threshold: 0.8 };
}

// 6 açık konu (min 5 üstü): 1 red-line kilitli + 5 normal.
function freshState() {
  return overview([
    { topic: 'gizlilik-guven', isRedLine: true, variantCount: 2, enabled: true, locked: true },
    { topic: 'aktif-dinleme', isRedLine: false, variantCount: 2, enabled: true, locked: false },
    { topic: 'sinir-koyma', isRedLine: false, variantCount: 2, enabled: true, locked: false },
    { topic: 'beklentileri-hizalama', isRedLine: false, variantCount: 2, enabled: true, locked: false },
    { topic: 'aktif-dinleme-2', isRedLine: false, variantCount: 2, enabled: true, locked: false },
    { topic: 'kulturel-farkliliklara-saygi', isRedLine: false, variantCount: 2, enabled: true, locked: false },
  ]);
}

let state = freshState();

const apiMock = vi.fn(async (path: string, opts?: { method?: string; body?: { topic: string; enabled: boolean } }) => {
  if (path === '/api/scoring/certification/topics' && opts?.method === 'PATCH') {
    state = overview(state.topics.map((t) => (t.topic === opts.body!.topic ? { ...t, enabled: opts.body!.enabled } : t)));
    return { ok: true, data: state };
  }
  return { ok: true, data: state };
});

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { role: 'ADMIN', id: 'a1', tenantId: 't1' } }),
}));

describe('AdminCertificationPage', () => {
  beforeEach(() => {
    state = freshState();
    apiMock.mockClear();
  });

  it('eşik özetini gösterir; red-line kilitli, normal togglelanabilir', async () => {
    render(<AdminCertificationPage />);
    await screen.findByText(/Şu an/);       // özet metni
    expect(screen.getByText('Gizlilik & güven')).toBeInTheDocument();

    const switches = screen.getAllByRole('switch');
    expect(switches.length).toBe(6);
    expect(switches[0]).toBeDisabled();          // red-line kilitli (ilk = gizlilik-guven)
    expect(switches[1]).not.toBeDisabled();      // normal, 6>min5 → togglelanabilir
  });

  it('normal konuyu kapatır (PATCH çağrılır)', async () => {
    render(<AdminCertificationPage />);
    await screen.findByText(/Şu an/);

    const switches = screen.getAllByRole('switch');
    fireEvent.click(switches[1]!);

    await waitFor(() =>
      expect(apiMock).toHaveBeenCalledWith(
        '/api/scoring/certification/topics',
        expect.objectContaining({ method: 'PATCH' }),
      ),
    );
  });
});
