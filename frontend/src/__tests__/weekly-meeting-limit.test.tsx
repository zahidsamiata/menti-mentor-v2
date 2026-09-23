import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  WeeklyMeetingLimitNote,
  weeklyLimitText,
  WEEKLY_LIMIT_FALLBACK,
} from '@/components/molecules/WeeklyMeetingLimitNote';

/**
 * madde 156 (I-05) — kurumun haftalık görüşme sıklığı menti ekranlarında görünür.
 * Değer yoksa / uç hata verirse ekran bozulmaz, genel metin görünür.
 */

let response: unknown;
const apiMock = vi.fn(async () => response);
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => apiMock }));

describe('WeeklyMeetingLimitNote', () => {
  beforeEach(() => apiMock.mockClear());

  it('kurum ayarı varsa sayıyı ve "onay bekleyenler dahil" bilgisini gösterir', async () => {
    response = { ok: true, data: { maxMeetingsPerWeek: 2 } };
    render(<WeeklyMeetingLimitNote />);
    expect(await screen.findByText(/haftada en fazla 2 görüşme/)).toBeInTheDocument();
    expect(screen.getByText(/Onay bekleyen talepler de bu sayıya dahildir/)).toBeInTheDocument();
    expect(apiMock).toHaveBeenCalledWith('/api/meetings/weekly-limit');
  });

  it('ayar yoksa (null) genel metin', async () => {
    response = { ok: true, data: { maxMeetingsPerWeek: null } };
    render(<WeeklyMeetingLimitNote />);
    expect(await screen.findByText(new RegExp(WEEKLY_LIMIT_FALLBACK))).toBeInTheDocument();
  });

  it('uç hata verirse ekran bozulmaz, genel metin', async () => {
    response = { ok: false, error: { error: 'X', message: 'hata' }, status: 500 };
    render(<WeeklyMeetingLimitNote />);
    expect(await screen.findByTestId('weekly-meeting-limit')).toHaveTextContent(WEEKLY_LIMIT_FALLBACK);
  });

  it('weeklyLimitText: geçersiz değerler genel metne düşer', () => {
    for (const v of [undefined, null, 0, -1, Number.NaN]) expect(weeklyLimitText(v)).toBe(WEEKLY_LIMIT_FALLBACK);
    expect(weeklyLimitText(3)).toContain('haftada en fazla 3 görüşme');
  });
});
