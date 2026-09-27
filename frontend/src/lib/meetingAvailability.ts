// Randevu ekranı müsaitlik yardımcıları (KR-12).
//
// Neden: mentörün müsaitlik blokları (startTime/endTime) YEREL saat olarak tanımlıdır
// (blok saat dilimi, varsayılan Europe/Istanbul). Backend randevu talebini bu dilimde
// değerlendirir (backend meetingController `zonedWeekdayAndMinutes`). Ekrandaki uyarı UTC
// (getUTCDay/getUTCHours) ile hesaplanınca İstanbul +03 farkıyla 3 saat kayıyor, gece
// yarısına yakın saatlerde günü bile kaydırıyordu. Burada aynı kural, aynı dilimde uygulanır.

export const DEFAULT_AVAILABILITY_TIMEZONE = 'Europe/Istanbul';

export type WeekdayCode = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export interface AvailabilityBlockLike {
  weekday: string;
  startTime: string | null;
  endTime: string | null;
  timezone?: string | null;
}

// Intl kısa-gün (en-US) → gün kodu
const INTL_SHORT_TO_WEEKDAY: Record<string, WeekdayCode> = {
  Mon: 'MON', Tue: 'TUE', Wed: 'WED', Thu: 'THU', Fri: 'FRI', Sat: 'SAT', Sun: 'SUN',
};

export const WEEKDAY_LABELS_TR: Record<WeekdayCode, string> = {
  MON: 'Pazartesi', TUE: 'Salı', WED: 'Çarşamba', THU: 'Perşembe',
  FRI: 'Cuma', SAT: 'Cumartesi', SUN: 'Pazar',
};

/** Gün kodunu (MON…) Türkçe tam ada çevirir; bilinmeyen kod olduğu gibi döner. */
export function weekdayLabelTr(code: string): string {
  return WEEKDAY_LABELS_TR[code as WeekdayCode] ?? code;
}

/**
 * Mutlak bir anı verilen IANA saat diliminde (gün kodu + günün dakikası) bileşenlerine çevirir.
 * hourCycle 'h23' → gece yarısı "24" sorunu olmaz.
 */
export function zonedWeekdayAndMinutes(
  instant: Date,
  timeZone: string = DEFAULT_AVAILABILITY_TIMEZONE,
): { weekday: WeekdayCode; minutes: number } | null {
  if (Number.isNaN(instant.getTime())) return null;
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(instant);

  const wd = parts.find((p) => p.type === 'weekday')?.value;
  const hh = parts.find((p) => p.type === 'hour')?.value;
  const mm = parts.find((p) => p.type === 'minute')?.value;
  if (!wd || hh === undefined || mm === undefined) return null;

  const weekday = INTL_SHORT_TO_WEEKDAY[wd];
  const hours   = parseInt(hh, 10);
  const minutes = parseInt(mm, 10);
  if (!weekday || Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  return { weekday, minutes: hours * 60 + minutes };
}

// "HH:MM" → günün dakikası; geçersiz/boş ise null
function timeToMinutes(hhmm: string | null | undefined): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm ?? '');
  if (!m) return null;
  return parseInt(m[1]!, 10) * 60 + parseInt(m[2]!, 10);
}

/**
 * Seçilen [start, end) aralığı mentörün herhangi bir müsaitlik bloğuna (blok saat diliminde,
 * aynı yerel gün içinde) sığıyor mu? Backend kontrolüyle aynı kural.
 */
export function fitsAvailability(
  start: Date,
  end: Date,
  blocks: ReadonlyArray<AvailabilityBlockLike>,
): boolean {
  return blocks.some((blk) => {
    const tz = blk.timezone || DEFAULT_AVAILABILITY_TIMEZONE;
    const s = zonedWeekdayAndMinutes(start, tz);
    const e = zonedWeekdayAndMinutes(end, tz);
    if (!s || !e) return false;
    if (s.weekday !== blk.weekday || e.weekday !== blk.weekday) return false;
    const blkS = timeToMinutes(blk.startTime);
    const blkE = timeToMinutes(blk.endTime);
    if (blkS === null || blkE === null) return false;
    return s.minutes >= blkS && e.minutes <= blkE;
  });
}

// ── K-05b: menti yalnız müsait başlangıç saatlerinden seçer ─────────────────────────────
//
// Neden: KATI (KARAR-53 ①) mentörde serbest tarih+saat girişi, mentinin blok dışı saati
// SEÇMESİNE izin veriyordu (yalnız gönderemiyordu). Burada seçilebilir saatler üretilir.
// İkinci bir saat dilimi mantığı yazmamak için aday anlar mutlak zamanda (UTC) adım adım
// taranır ve her biri yukarıdaki `fitsAvailability` ile (blok diliminde) süzülür — yerel
// saatten UTC'ye ters dönüşüm gerekmez.

export const BOOKING_WINDOW_DAYS = 14;
export const SLOT_STEP_MINUTES = 30;

export interface BookableSlotOptions {
  blocks: ReadonlyArray<AvailabilityBlockLike>;
  durationMinutes: number;
  now: Date;
  days?: number;
  stepMinutes?: number;
}

/**
 * Önümüzdeki `days` gün içinde, süresiyle birlikte mentörün bir bloğuna tamamen sığan
 * başlangıç anları (geçmiş anlar hariç), artan sırada.
 */
export function listBookableSlots({
  blocks,
  durationMinutes,
  now,
  days = BOOKING_WINDOW_DAYS,
  stepMinutes = SLOT_STEP_MINUTES,
}: BookableSlotOptions): Date[] {
  if (!blocks.length || durationMinutes <= 0 || Number.isNaN(now.getTime())) return [];
  const stepMs = stepMinutes * 60_000;
  const firstMs = Math.ceil((now.getTime() + 1) / stepMs) * stepMs; // şimdiden SONRAKİ ilk adım
  const lastMs = now.getTime() + days * 24 * 60 * 60_000;
  const slots: Date[] = [];
  for (let t = firstMs; t <= lastMs; t += stepMs) {
    const start = new Date(t);
    const end = new Date(t + durationMinutes * 60_000);
    if (fitsAvailability(start, end, blocks)) slots.push(start);
  }
  return slots;
}

export interface SlotDayGroup {
  /** Blok dilimindeki yerel gün (YYYY-MM-DD) */
  dayKey: string;
  /** Örn. "Pazartesi, 4 Ocak" */
  dayLabel: string;
  slots: Array<{ iso: string; timeLabel: string }>;
}

/** Başlangıç anlarını blok diliminde yerel güne göre gruplar; saatler "HH:MM" gösterilir. */
export function groupSlotsByDay(
  slots: ReadonlyArray<Date>,
  timeZone: string = DEFAULT_AVAILABILITY_TIMEZONE,
): SlotDayGroup[] {
  const keyFmt = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' });
  const dayFmt = new Intl.DateTimeFormat('tr-TR', { timeZone, weekday: 'long', day: 'numeric', month: 'long' });
  const timeFmt = new Intl.DateTimeFormat('tr-TR', { timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  const groups: SlotDayGroup[] = [];
  for (const slot of slots) {
    const dayKey = keyFmt.format(slot);
    let group = groups[groups.length - 1];
    if (!group || group.dayKey !== dayKey) {
      group = { dayKey, dayLabel: dayFmt.format(slot), slots: [] };
      groups.push(group);
    }
    group.slots.push({ iso: slot.toISOString(), timeLabel: timeFmt.format(slot) });
  }
  return groups;
}
