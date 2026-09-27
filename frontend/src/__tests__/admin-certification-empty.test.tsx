/**
 * U-10 (AJ-45) — admin sertifika konuları ekranı boşken anlamlı boş durum gösterir.
 *
 * U-10'un dört ekranından admin/certification boş dalsız kalmıştı: konu listesi boş gelince
 * ekranda yalnız "Şu an 0 konu açık… en az 0 konuda" özeti ve boşluk kalıyordu. Artık:
 * - konu yoksa boş-durum metni görünür, yanıltıcı eşik özeti ve anahtar görünmez;
 * - konu varsa boş-durum metni görünmez (negatif).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdminCertificationPage from '@/app/(admin)/admin/certification/page';

let topics: Array<{ topic: string; isRedLine: boolean; variantCount: number; enabled: boolean; locked: boolean }> = [];

const apiMock = vi.fn(async () => {
  const activeCount = topics.filter((t) => t.enabled).length;
  return { ok: true, data: { topics, activeCount, requiredToPass: 0, minActiveTopics: 5, threshold: 0.8 } };
});

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { role: 'ADMIN', id: 'a1', tenantId: 't1' } }),
}));

const EMPTY = /Henüz sertifika konusu yüklenmemiş/;

describe('Admin sertifika konuları — boş durum (U-10)', () => {
  beforeEach(() => {
    apiMock.mockClear();
    topics = [];
  });

  it('konu yoksa boş-durum metni görünür; eşik özeti ve anahtar görünmez', async () => {
    render(<AdminCertificationPage />);
    expect(await screen.findByText(EMPTY)).toBeInTheDocument();
    expect(screen.queryByText(/Şu an/)).not.toBeInTheDocument();
    expect(screen.queryAllByRole('switch')).toHaveLength(0);
  });

  it('negatif: konu varsa boş-durum metni görünmez', async () => {
    topics = [{ topic: 'aktif-dinleme', isRedLine: false, variantCount: 2, enabled: true, locked: false }];
    render(<AdminCertificationPage />);
    await screen.findByText(/Şu an/);
    expect(screen.getAllByRole('switch')).toHaveLength(1);
    expect(screen.queryByText(EMPTY)).not.toBeInTheDocument();
  });
});
