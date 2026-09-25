/**
 * KR-12 — randevu ekranında müsaitlik uyarısı İstanbul saatine göre hesaplanmalı.
 * Bulgu: ekran UTC (getUTCDay/getUTCHours) ile kontrol ediyordu; backend blokları
 * Europe/Istanbul yerel saatinde değerlendiriyor → uyarı 3 saat kayıktı, gün adı ham ("MON").
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  fitsAvailability,
  weekdayLabelTr,
  zonedWeekdayAndMinutes,
} from '@/lib/meetingAvailability';
import BookMeetingPage from '@/app/(dashboard)/book-meeting/page';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => ({ get: (k: string) => (k === 'mentorId' ? 'mentor-1' : null) }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { id: 'user-1', role: 'MENTI' } }),
}));
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({
    data: { blocks: [{ weekday: 'MON', startTime: '09:00', endTime: '12:00' }] },
    isLoading: false,
    error: null,
  }),
}));

// 2027-01-04 bir Pazartesi.
const MON_BLOCK = [{ weekday: 'MON', startTime: '09:00', endTime: '12:00' }];

describe('zonedWeekdayAndMinutes — İstanbul saat dilimi', () => {
  it('UTC 06:30 → İstanbul 09:30, aynı gün', () => {
    expect(zonedWeekdayAndMinutes(new Date('2027-01-04T06:30:00Z'))).toEqual({
      weekday: 'MON',
      minutes: 9 * 60 + 30,
    });
  });

  it('gece yarısı sınırı: UTC Pazartesi 22:30 → İstanbul Salı 01:30', () => {
    expect(zonedWeekdayAndMinutes(new Date('2027-01-04T22:30:00Z'))).toEqual({
      weekday: 'TUE',
      minutes: 1 * 60 + 30,
    });
  });

  it('geçersiz tarih → null', () => {
    expect(zonedWeekdayAndMinutes(new Date('geçersiz'))).toBeNull();
  });
});

describe('fitsAvailability — backend ile aynı kural', () => {
  it('İstanbul 09:30-10:30 Pazartesi bloğa (09:00-12:00) sığar', () => {
    const start = new Date('2027-01-04T06:30:00Z');
    const end = new Date('2027-01-04T07:30:00Z');
    expect(fitsAvailability(start, end, MON_BLOCK)).toBe(true);
  });

  it('negatif: UTC 09:30 = İstanbul 12:30 → blok dışı (eski UTC mantığı "içinde" sayıyordu)', () => {
    const start = new Date('2027-01-04T09:30:00Z');
    const end = new Date('2027-01-04T10:00:00Z');
    expect(fitsAvailability(start, end, MON_BLOCK)).toBe(false);
  });

  it('negatif: İstanbul Salı 01:30 → Pazartesi bloğu dışında (UTC günü Pazartesi olsa bile)', () => {
    const lateBlock = [{ weekday: 'MON', startTime: '00:00', endTime: '23:59' }];
    const start = new Date('2027-01-04T22:30:00Z');
    const end = new Date('2027-01-04T23:00:00Z');
    expect(fitsAvailability(start, end, lateBlock)).toBe(false);
  });

  it('boş/geçersiz saatli blok çökmez, müsaitlik dışı sayılır', () => {
    const start = new Date('2027-01-04T06:30:00Z');
    const end = new Date('2027-01-04T07:30:00Z');
    expect(fitsAvailability(start, end, [{ weekday: 'MON', startTime: null, endTime: null }])).toBe(false);
  });
});

describe('gün adı Türkçe', () => {
  it('gün kodları Türkçe tam ada çevrilir', () => {
    expect(weekdayLabelTr('MON')).toBe('Pazartesi');
    expect(weekdayLabelTr('TUE')).toBe('Salı');
    expect(weekdayLabelTr('SUN')).toBe('Pazar');
  });

  it('randevu ekranı müsait saatleri Türkçe gün adıyla gösterir (ham "MON" görünmez)', () => {
    render(<BookMeetingPage />);
    expect(screen.getByText('Pazartesi 09:00–12:00')).toBeInTheDocument();
    expect(screen.queryByText(/MON 09:00/)).not.toBeInTheDocument();
  });
});
