/**
 * K-05b — menti görüşme saatini yalnız mentörün müsait aralıklarından seçer.
 * Saat üretimi mutlak zamanda (UTC) yapılır ve KR-12 `fitsAvailability` ile blok diliminde
 * (Europe/Istanbul) süzülür; sonuçlar sunucu/tarayıcı saat diliminden bağımsız olmalıdır.
 */
import { describe, it, expect } from 'vitest';
import { groupSlotsByDay, listBookableSlots } from '@/lib/meetingAvailability';

// 2027-01-04 Pazartesi.
const MON_14_16 = [{ weekday: 'MON', startTime: '14:00', endTime: '16:00' }];
const SUNDAY_NOON_UTC = new Date('2027-01-03T12:00:00Z');

describe('listBookableSlots', () => {
  it('İstanbul 14:00-16:00 bloğu, 60 dk → UTC 11:00/11:30/12:00 (+03), iki haftada iki Pazartesi', () => {
    const slots = listBookableSlots({ blocks: MON_14_16, durationMinutes: 60, now: SUNDAY_NOON_UTC });
    expect(slots.map((d) => d.toISOString())).toEqual([
      '2027-01-04T11:00:00.000Z',
      '2027-01-04T11:30:00.000Z',
      '2027-01-04T12:00:00.000Z',
      '2027-01-11T11:00:00.000Z',
      '2027-01-11T11:30:00.000Z',
      '2027-01-11T12:00:00.000Z',
    ]);
  });

  it('blok dışı (UTC 14:00 = İstanbul 17:00) ve bloğu taşan başlangıçlar üretilmez', () => {
    const iso = listBookableSlots({ blocks: MON_14_16, durationMinutes: 60, now: SUNDAY_NOON_UTC })
      .map((d) => d.toISOString());
    expect(iso).not.toContain('2027-01-04T14:00:00.000Z');
    expect(iso).not.toContain('2027-01-04T12:30:00.000Z'); // 15:30 + 60 dk > 16:00
  });

  it('geçmiş saatler gösterilmez (şimdi Pazartesi 14:40 İstanbul → ilk saat 15:00)', () => {
    const now = new Date('2027-01-04T11:40:00Z');
    const slots = listBookableSlots({ blocks: MON_14_16, durationMinutes: 30, now, days: 1 });
    expect(slots.map((d) => d.toISOString())).toEqual([
      '2027-01-04T12:00:00.000Z',
      '2027-01-04T12:30:00.000Z',
    ]);
  });

  it('gece yarısı sınırı: İstanbul Salı 01:00 bloğu, UTC Pazartesi 22:00 olarak üretilir', () => {
    const blocks = [{ weekday: 'TUE', startTime: '01:00', endTime: '02:00' }];
    const slots = listBookableSlots({ blocks, durationMinutes: 60, now: SUNDAY_NOON_UTC, days: 3 });
    expect(slots.map((d) => d.toISOString())).toEqual(['2027-01-04T22:00:00.000Z']);
  });

  it('pencere dışı (14 günden sonrası) ve boş/geçersiz bloklar saat üretmez', () => {
    expect(listBookableSlots({ blocks: [], durationMinutes: 60, now: SUNDAY_NOON_UTC })).toEqual([]);
    expect(listBookableSlots({
      blocks: [{ weekday: 'MON', startTime: null, endTime: null }], durationMinutes: 60, now: SUNDAY_NOON_UTC,
    })).toEqual([]);
    const all = listBookableSlots({ blocks: MON_14_16, durationMinutes: 60, now: SUNDAY_NOON_UTC });
    expect(all.every((d) => d.getTime() <= SUNDAY_NOON_UTC.getTime() + 14 * 86_400_000)).toBe(true);
  });
});

describe('groupSlotsByDay', () => {
  it('İstanbul yerel gününe göre gruplar, Türkçe gün/saat etiketi verir', () => {
    const groups = groupSlotsByDay([
      new Date('2027-01-04T11:00:00Z'),
      new Date('2027-01-04T22:00:00Z'), // İstanbul'da Salı 01:00
    ]);
    expect(groups).toEqual([
      { dayKey: '2027-01-04', dayLabel: '4 Ocak Pazartesi', slots: [{ iso: '2027-01-04T11:00:00.000Z', timeLabel: '14:00' }] },
      { dayKey: '2027-01-05', dayLabel: '5 Ocak Salı', slots: [{ iso: '2027-01-04T22:00:00.000Z', timeLabel: '01:00' }] },
    ]);
  });
});
