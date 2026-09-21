/**
 * U-04 — Kurum onay/ret durumu uygulama-içinde görünür.
 *
 * /api/auth/me'den gelen tenant.verificationStatus'a göre pending-review ekranı değişir:
 * onaylandı → olumlu ekran; reddedildi → dürüst ekran; düzeltme → not; aksi/oturumsuz → inceleniyor.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import PendingReviewPage from '@/app/onboarding/stk/pending-review/page';

const meMock: { ok: boolean; status: string | null; note: string | null } = {
  ok: true,
  status: 'PENDING_REVIEW',
  note: null,
};

vi.mock('@/hooks/useApiClient', () => ({
  useApiClient: () => async () =>
    meMock.ok
      ? { ok: true, data: { role: 'ADMIN', tenant: meMock.status ? { name: 'Kurum', verificationStatus: meMock.status, correctionNote: meMock.note } : null } }
      : { ok: false, error: { message: 'unauth' } },
}));

describe('Pending-review durum ekranı (U-04)', () => {
  it('PENDING_REVIEW → "İnceleniyor"', async () => {
    meMock.ok = true; meMock.status = 'PENDING_REVIEW'; meMock.note = null;
    render(<PendingReviewPage />);
    await waitFor(() => expect(screen.getByText('Başvurunuz İnceleniyor')).toBeInTheDocument());
  });

  it('APPROVED → onaylandı ekranı + Giriş Yap', async () => {
    meMock.ok = true; meMock.status = 'APPROVED'; meMock.note = null;
    render(<PendingReviewPage />);
    await waitFor(() => expect(screen.getByText(/Başvurunuz Onaylandı/)).toBeInTheDocument());
    expect(screen.getByText('Giriş Yap →')).toBeInTheDocument();
  });

  it('REJECTED → onaylanmadı + gerekçe notu', async () => {
    meMock.ok = true; meMock.status = 'REJECTED'; meMock.note = 'Kurum belgesi eksik';
    render(<PendingReviewPage />);
    await waitFor(() => expect(screen.getByText('Başvurunuz Onaylanmadı')).toBeInTheDocument());
    expect(screen.getByText(/Kurum belgesi eksik/)).toBeInTheDocument();
  });

  it('CORRECTION_REQUESTED → düzeltme isteniyor + not', async () => {
    meMock.ok = true; meMock.status = 'CORRECTION_REQUESTED'; meMock.note = 'Web sitenizi ekleyin';
    render(<PendingReviewPage />);
    await waitFor(() => expect(screen.getByText('Bilgi Güncellemesi İsteniyor')).toBeInTheDocument());
    expect(screen.getByText(/Web sitenizi ekleyin/)).toBeInTheDocument();
  });

  it('oturum yok (401) → güvenli varsayılan "İnceleniyor"', async () => {
    meMock.ok = false; meMock.status = null; meMock.note = null;
    render(<PendingReviewPage />);
    await waitFor(() => expect(screen.getByText('Başvurunuz İnceleniyor')).toBeInTheDocument());
  });
});
