/**
 * F-18 — Yönetici KPI ekranından toplu raporu CSV olarak indirebiliyor.
 * - Düğme uca gider, sunucunun önerdiği dosya adıyla indirme tetiklenir.
 * - Hata olursa Türkçe mesaj görünür.
 * - apiClient `responseType: 'file'` başarılı yanıtı blob + dosya adı olarak döner.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import KpiPage from '@/app/(admin)/admin/kpi/page';
import { apiClient, filenameFromContentDisposition, type DownloadedFile } from '@/lib/api/client';

const download = vi.fn();

vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ data: null, isLoading: false, error: null, refetch: vi.fn() }),
}));
vi.mock('@/lib/api/admin', () => ({ adminApi: { getKpi: vi.fn(), downloadKpiCsv: (...a: unknown[]) => download(...a) } }));
vi.mock('@/components/organisms/ProgramHealthSection', () => ({ ProgramHealthSection: () => null }));

describe('KPI ekranı — CSV olarak indir (F-18)', () => {
  const createObjectURL = vi.fn(() => 'blob:kpi');
  const revokeObjectURL = vi.fn();
  let clicked: HTMLAnchorElement | null = null;

  beforeEach(() => {
    download.mockReset();
    clicked = null;
    Object.assign(URL, { createObjectURL, revokeObjectURL });
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      clicked = this; // eslint-disable-line @typescript-eslint/no-this-alias -- tıklanan bağlantıyı yakalamak için
    });
  });
  afterEach(() => vi.restoreAllMocks());

  it('düğmeye basınca sunucunun dosya adıyla indirme başlar', async () => {
    const file: DownloadedFile = { blob: new Blob(['﻿Bölüm;Metrik;Değer;Açıklama\r\n']), filename: 'kpi-raporu-ornek-2026-09-26.csv' };
    download.mockResolvedValue({ ok: true, data: file });

    render(<KpiPage />);
    fireEvent.click(screen.getByRole('button', { name: 'CSV olarak indir' }));

    await waitFor(() => expect(clicked).not.toBeNull());
    expect(download).toHaveBeenCalledTimes(1);
    expect(clicked!.download).toBe('kpi-raporu-ornek-2026-09-26.csv');
    expect(createObjectURL).toHaveBeenCalledWith(file.blob);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:kpi');
  });

  it('negatif: hata olursa Türkçe mesaj görünür, indirme başlamaz', async () => {
    download.mockResolvedValue({ ok: false, status: 500, error: { error: 'INTERNAL_ERROR' } });

    render(<KpiPage />);
    fireEvent.click(screen.getByRole('button', { name: 'CSV olarak indir' }));

    expect(await screen.findByText('Rapor indirilemedi. Lütfen biraz sonra tekrar deneyin.')).toBeInTheDocument();
    expect(clicked).toBeNull();
  });
});

describe('apiClient responseType: file', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('başarılı yanıt blob + Content-Disposition dosya adı olarak döner', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(new Response('a;b\r\n', {
      status: 200,
      headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="kpi-raporu-x-2026-09-26.csv"' },
    }))));
    const result = await apiClient<DownloadedFile>('/api/admin/kpi/export', { responseType: 'file' });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.filename).toBe('kpi-raporu-x-2026-09-26.csv');
      expect(await result.data.blob.text()).toBe('a;b\r\n');
    }
  });

  it('negatif: hata yanıtı yine JSON hata olarak okunur', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(new Response(JSON.stringify({ error: 'FORBIDDEN', message: 'Yetkiniz yok.' }), { status: 403 }))));
    const result = await apiClient<DownloadedFile>('/api/admin/kpi/export', { responseType: 'file' });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.message).toBe('Yetkiniz yok.');
  });

  it('filenameFromContentDisposition', () => {
    expect(filenameFromContentDisposition('attachment; filename="a.csv"')).toBe('a.csv');
    expect(filenameFromContentDisposition('attachment; filename=b.csv')).toBe('b.csv');
    expect(filenameFromContentDisposition(null)).toBeNull();
    expect(filenameFromContentDisposition('attachment')).toBeNull();
  });
});
