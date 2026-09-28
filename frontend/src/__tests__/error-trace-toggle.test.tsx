/**
 * DK-03 · Platform panelinde hata satırının "İz kaydını göster" katlanır alanı (KARAR-24 → B).
 * İz yalnız tıklanınca ve bir kez çekilir; backend'in temizlediği metin aynen gösterilir;
 * hata durumunda iç detay değil sabit Türkçe cümle görünür.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const getTraceMock = vi.fn();
vi.mock('@/lib/api/platform', () => ({
  getPlatformLogTrace: (id: string) => getTraceMock(id),
}));

import { ErrorTraceToggle, TRACE_EMPTY_TEXT, TRACE_LOAD_ERROR_TEXT } from '@/components/organisms/ErrorTraceToggle';

const TRACE = {
  id: 'log-1',
  category: 'HTTP',
  message: 'Beklenmedik sunucu hatası',
  createdAt: '2026-09-28T10:00:00.000Z',
  errorMessage: 'Unique constraint failed for o***@example.org',
  stack: 'Error: x\n    at handler (/srv/app/dist/controllers/meetingController.js:77:9)',
  method: 'POST',
  url: '/api/meetings/m1',
  userId: 'u-1',
  tenantId: 't-1',
};

describe('DK-03 · ErrorTraceToggle', () => {
  beforeEach(() => { getTraceMock.mockReset(); });

  it('kapalı başlar, istek atmaz; tıklanınca izi bir kez çeker ve gösterir', async () => {
    getTraceMock.mockResolvedValue(TRACE);
    render(<ErrorTraceToggle logId="log-1" />);
    expect(getTraceMock).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'İz kaydını göster' }));
    await waitFor(() => expect(screen.getByText(/meetingController\.js:77:9/)).toBeTruthy());
    expect(getTraceMock).toHaveBeenCalledWith('log-1');
    expect(screen.getByText(/POST \/api\/meetings\/m1 · kurum no: t-1 · kullanıcı no: u-1/)).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'İz kaydını gizle' }));
    fireEvent.click(screen.getByRole('button', { name: 'İz kaydını göster' }));
    expect(getTraceMock).toHaveBeenCalledTimes(1);
  });

  it('iz yoksa bilgi cümlesi', async () => {
    getTraceMock.mockResolvedValue({ ...TRACE, stack: null });
    render(<ErrorTraceToggle logId="log-2" />);
    fireEvent.click(screen.getByRole('button', { name: 'İz kaydını göster' }));
    await waitFor(() => expect(screen.getByText(TRACE_EMPTY_TEXT)).toBeTruthy());
  });

  it('istek hatasında iç detay değil sabit Türkçe cümle', async () => {
    getTraceMock.mockRejectedValue(new Error('HTTP 500 iç detay'));
    render(<ErrorTraceToggle logId="log-3" />);
    fireEvent.click(screen.getByRole('button', { name: 'İz kaydını göster' }));
    await waitFor(() => expect(screen.getByText(TRACE_LOAD_ERROR_TEXT)).toBeTruthy());
    expect(screen.queryByText(/iç detay/)).toBeNull();
  });
});
