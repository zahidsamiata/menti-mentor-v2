import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import MentorCertificationPage from '@/app/(dashboard)/mentor/certification/page';

/**
 * madde 157 (I-07) — tekrar sınavda yanlış yapılan konu diğer varyantıyla gelir.
 * Sunucu varyant sırasını belirler (B önce); ekran bunu YENİDEN SIRALAMAMALI,
 * aksi halde hep A gelir ve "farklı sahne" kuralı ekranda kaybolur.
 */

type Q = { code: string; topic: string; variant: string; isRedLine: boolean; scenario: string; options: { key: string; label: string }[] };
const opts = [{ key: 'A', label: 'Seçenek A' }, { key: 'B', label: 'Seçenek B' }];

let payload: { questions: Q[]; retryTopics?: string[] };

const apiMock = vi.fn(async (path: string) => {
  if (path === '/api/scoring/certification/questions') return { ok: true, data: payload };
  return { ok: false, error: { error: 'X' }, status: 500 };
});

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { role: 'MENTOR', id: 'm1', tenantId: 't1' } }),
}));

describe('Sertifika tekrar sınavı — farklı sahne', () => {
  beforeEach(() => apiMock.mockClear());

  it('sunucu B varyantını başa koyduysa ekran B sahnesiyle açılır ve "zorlandığın konu" işareti görünür', async () => {
    payload = {
      questions: [
        { code: 'T1_B', topic: 'topic1', variant: 'B', isRedLine: false, scenario: 'Arkadaşlık talebi sahnesi', options: opts },
        { code: 'T1_A', topic: 'topic1', variant: 'A', isRedLine: false, scenario: 'Gece mesajı sahnesi', options: opts },
      ],
      retryTopics: ['topic1'],
    };
    render(<MentorCertificationPage />);
    expect(await screen.findByText(/Arkadaşlık talebi sahnesi/)).toBeInTheDocument();
    expect(screen.queryByText(/Gece mesajı sahnesi/)).not.toBeInTheDocument();
    expect(screen.getByText(/Geçen sefer zorlandığın konu/)).toBeInTheDocument();
  });

  it('ilk sınavda (retryTopics yok) A sahnesiyle açılır, işaret görünmez', async () => {
    payload = {
      questions: [
        { code: 'T1_A', topic: 'topic1', variant: 'A', isRedLine: false, scenario: 'Gece mesajı sahnesi', options: opts },
        { code: 'T1_B', topic: 'topic1', variant: 'B', isRedLine: false, scenario: 'Arkadaşlık talebi sahnesi', options: opts },
      ],
    };
    render(<MentorCertificationPage />);
    expect(await screen.findByText(/Gece mesajı sahnesi/)).toBeInTheDocument();
    expect(screen.queryByText(/Geçen sefer zorlandığın konu/)).not.toBeInTheDocument();
  });
});
