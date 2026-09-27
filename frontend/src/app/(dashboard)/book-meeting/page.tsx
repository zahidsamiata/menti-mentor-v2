'use client';

import { Suspense, useId, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { meetingsApi } from '@/lib/api/meetings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { WeeklyMeetingLimitNote } from '@/components/molecules/WeeklyMeetingLimitNote';
import {
  BOOKING_WINDOW_DAYS,
  DEFAULT_AVAILABILITY_TIMEZONE,
  fitsAvailability,
  groupSlotsByDay,
  listBookableSlots,
  weekdayLabelTr,
  type AvailabilityBlockLike,
} from '@/lib/meetingAvailability';
import { conversationsApi } from '@/lib/api/conversations';
import { UI_TEXT } from '@/lib/uiText';

const FORMATS = [
  { value: 'ONLINE'    as const, label: 'Online (video)' },
  { value: 'IN_PERSON' as const, label: 'Yüz yüze' },
  { value: 'PHONE'     as const, label: 'Telefon' },
];
const DURATIONS = [30, 45, 60, 90];

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60_000);
}

function BookMeetingContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useAuth();
  const api = useApiClient();

  const mentorId = params.get('mentorId') ?? '';
  const matchId  = params.get('matchId') ?? undefined;

  const { data: availability, isLoading: availabilityLoading } = useQuery(
    () => meetingsApi.getAvailability(api, mentorId),
    [api, mentorId],
    { enabled: Boolean(mentorId) },
  );
  // KARAR-53 ④: mentör ne blok ne koşul girmişse (şu an: hiç blok yoksa) backend HER randevu
  // talebini 409 ile kesin reddeder (meetingController.ts fitsAvailability). Bu durumda randevu
  // formu göstermek "talep gönderebilirsiniz" yanılgısı yaratıyordu (K-20) — onun yerine mentöre
  // doğrudan mesaj gönderme yolu sunulur.
  const hasAvailabilityBlocks = (availability?.blocks?.length ?? 0) > 0;
  const noAvailabilityConfirmed = !availabilityLoading && availability !== null && !hasAvailabilityBlocks;

  const [format, setFormat]           = useState<'ONLINE' | 'IN_PERSON' | 'PHONE'>('ONLINE');
  // K-05b: serbest tarih+saat yerine mentörün müsait aralıklarından üretilen başlangıç anı (ISO).
  const [selectedDay, setSelectedDay]   = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [duration, setDuration]       = useState(60);
  const [location, setLocation]       = useState('');
  const [requestMessage, setMsg]      = useState('');
  const [submitting, setSubmitting]   = useState(false);
  const [error, setError]             = useState<string | null>(null);
  // AJ-07: label'lar htmlFor/id ile bağlı değildi (WCAG 1.3.1 / 4.1.2).
  const locationId = useId();
  const messageId = useId();
  const [success, setSuccess]         = useState(false);

  // K-20: mentörün müsaitliği yokken (KARAR-53 ④) randevu yerine mesaj yolu.
  const [convoMessage, setConvoMessage] = useState('');
  const [convoSending, setConvoSending] = useState(false);
  const [convoError, setConvoError]     = useState<string | null>(null);

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    const body = convoMessage.trim();
    if (!body) { setConvoError('Lütfen bir mesaj yazın.'); return; }
    setConvoSending(true); setConvoError(null);
    const result = await conversationsApi.start(api, { mentorUserId: mentorId, message: body });
    setConvoSending(false);
    if (result.ok) {
      router.push(`/messages/${result.data.conversation.id}`);
    } else {
      setConvoError(result.error.message ?? 'Mesaj gönderilemedi.');
    }
  }

  const msgLen = requestMessage.length;
  const msgValid = msgLen >= 50 && msgLen <= 500;

  // K-05b (KARAR-53 ①, KATI): menti yalnız bu listeden seçebilir — blok dışı saat listede yoktur.
  const blocks = useMemo(
    () => ((availability?.blocks ?? []) as AvailabilityBlockLike[]),
    [availability],
  );
  const displayTimeZone = blocks.find((b) => b.timezone)?.timezone || DEFAULT_AVAILABILITY_TIMEZONE;
  const slotGroups = useMemo(
    () => groupSlotsByDay(listBookableSlots({ blocks, durationMinutes: duration, now: new Date() }), displayTimeZone),
    [blocks, duration, displayTimeZone],
  );
  // Süre değişince seçili saat artık sığmıyorsa seçim düşer (eski seçim sessizce gönderilmesin).
  const activeGroup = slotGroups.find((g) => g.dayKey === selectedDay) ?? null;
  const activeSlot  = activeGroup?.slots.find((s) => s.iso === selectedSlot) ?? null;

  const selectedStart = activeSlot ? new Date(activeSlot.iso) : null;
  const selectedEnd   = selectedStart ? addMinutes(selectedStart, duration) : null;

  // KR-12: kontrol, backend ile aynı kuralla blok saat diliminde (vars. Europe/Istanbul) yapılır.
  const isFitAvailability =
    !selectedStart || !selectedEnd || !availability?.blocks?.length
      ? true
      : fitsAvailability(selectedStart, selectedEnd, availability.blocks as AvailabilityBlockLike[]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !selectedStart || !selectedEnd || !isFitAvailability) return;
    if (!msgValid) {
      setError('Niyet mesajı 50-500 karakter arasında olmalıdır.');
      return;
    }
    setSubmitting(true); setError(null);
    const result = await meetingsApi.bookMeeting(api, {
      mentorUserId: mentorId, matchId, format,
      startsAt: selectedStart.toISOString(), endsAt: selectedEnd.toISOString(),
      requestMessage,
      // KARAR-7 (A): online toplantı linkini menti değil mentör, onayda girer.
      ...(format === 'IN_PERSON' && location ? { locationText: location } : {}),
      ...(format === 'PHONE'     && location ? { phoneNumber:  location } : {}),
    });
    setSubmitting(false);
    if (result.ok) { setSuccess(true); setTimeout(() => router.push('/menti'), 2000); }
    else { setError(result.error.message ?? 'Görüşme talebi oluşturulamadı.'); }
  }

  if (success) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-4xl">📅</p>
      <h2 className="text-xl font-semibold">Görüşme Talebiniz Gönderildi</h2>
      <p className="text-sm text-muted-foreground text-center">Mentör onayladığında bildirim alacaksınız.</p>
      <WeeklyMeetingLimitNote className="max-w-md text-center" />
    </div>
  );

  return (
    <div className="max-w-lg mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Görüşme Talebi</h1>
        <p className="text-sm text-muted-foreground">Mentörünüzle görüşme için uygun bir zaman seçin.</p>
      </div>

      <WeeklyMeetingLimitNote />

      {noAvailabilityConfirmed ? (
        // K-20 (KARAR-53 ④): mentör hiç müsaitlik bloğu girmemiş — backend bu durumda HER
        // randevu talebini 409 ile kesin reddeder. Randevu formu yerine doğrudan mesaj yolu
        // sunulur; ürün kararı gereği bu mentörle iletişim yalnız mesajlaşmayla başlar.
        <Card>
          <CardHeader><CardTitle className="text-sm">Bu mentör henüz müsait saat belirtmemiş</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Şu an bu mentöre görüşme talebi gönderemezsiniz. Mentörünüze mesaj göndererek uygun bir zaman ayarlayabilirsiniz.
            </p>
            <form onSubmit={handleSendMessage} className="space-y-3">
              {convoError && <AlertMessage type="error" message={convoError} />}
              <textarea
                required
                value={convoMessage}
                onChange={(e) => setConvoMessage(e.target.value)}
                maxLength={500}
                rows={4}
                placeholder="Mentörünüze kendinizi tanıtın ve görüşme talebinizi kısaca yazın."
                aria-label="Mentöre mesaj"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm resize-none"
              />
              <Button type="submit" className="w-full" disabled={convoSending || !convoMessage.trim()}>
                {convoSending ? UI_TEXT.status.sending : 'Mesaj Gönder'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader><CardTitle className="text-sm">Mentörün Müsait Saatleri</CardTitle></CardHeader>
            <CardContent>
              {hasAvailabilityBlocks ? (
                <div className="flex flex-wrap gap-2">
                  {((availability?.blocks ?? []) as Array<{weekday:string;startTime:string;endTime:string}>).map((blk, i) => (
                    <span key={i} className="rounded-lg bg-muted px-3 py-1 text-xs">{weekdayLabelTr(blk.weekday)} {blk.startTime}–{blk.endTime}</span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">Müsaitlik bilgisi yükleniyor…</p>
              )}
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <AlertMessage type="error" message={error} />}
            <div className="space-y-2">
              <label className="text-sm font-medium" id="meeting-format-label">Görüşme Formatı</label>
              {/* AJ-07: aşağıdaki gün/saat seçim butonlarıyla aynı aile (KOMŞU UÇ) — orada
                  role="group"/aria-pressed vardı, burada eksikti; hizalandı. */}
              <div className="grid grid-cols-3 gap-2" role="group" aria-labelledby="meeting-format-label">
                {FORMATS.map(({ value, label }) => (
                  <button key={value} type="button" onClick={() => { setFormat(value); setLocation(''); }}
                    aria-pressed={format === value}
                    className={`rounded-xl border p-2.5 text-xs transition-colors ${format === value ? 'border-primary bg-primary/10 font-medium' : 'border-border hover:bg-muted'}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" id="meeting-duration-label">Süre</label>
              <div className="flex gap-2" role="group" aria-labelledby="meeting-duration-label">
                {DURATIONS.map((d) => (
                  <button key={d} type="button" onClick={() => setDuration(d)}
                    aria-pressed={duration === d}
                    className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${duration === d ? 'border-primary bg-primary/10 font-medium' : 'border-border hover:bg-muted'}`}>
                    {d} dk
                  </button>
                ))}
              </div>
            </div>

            {/* K-05b: "Menti müsait olmayan saati SEÇEMİYOR" — serbest tarih/saat girişi kaldırıldı;
                yalnız mentörün müsait bloklarına (süresiyle birlikte) sığan, geçmemiş başlangıç
                saatleri listelenir. Saatler blok saat diliminde (vars. Europe/Istanbul) gösterilir. */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tarih ve Saat</label>
              {!hasAvailabilityBlocks ? (
                <p className="text-sm text-muted-foreground">Müsait saatler yükleniyor…</p>
              ) : slotGroups.length === 0 ? (
                <p className="text-sm text-muted-foreground" data-testid="no-bookable-slots">
                  Önümüzdeki {BOOKING_WINDOW_DAYS} gün içinde bu süreye uygun müsait saat yok. Daha kısa bir süre seçebilir ya da mentörünüze mesaj gönderebilirsiniz.
                </p>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Gün seçin">
                    {slotGroups.map((g) => (
                      <button key={g.dayKey} type="button"
                        aria-pressed={selectedDay === g.dayKey}
                        onClick={() => { setSelectedDay(g.dayKey); setSelectedSlot(''); }}
                        className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${selectedDay === g.dayKey ? 'border-primary bg-primary/10 font-medium' : 'border-border hover:bg-muted'}`}>
                        {g.dayLabel}
                      </button>
                    ))}
                  </div>
                  {activeGroup ? (
                    <div className="grid grid-cols-4 gap-2" role="group" aria-label="Saat seçin">
                      {activeGroup.slots.map((slot) => (
                        <button key={slot.iso} type="button"
                          aria-pressed={selectedSlot === slot.iso}
                          onClick={() => setSelectedSlot(slot.iso)}
                          className={`rounded-lg border px-2 py-1.5 text-xs transition-colors ${selectedSlot === slot.iso ? 'border-primary bg-primary/10 font-medium' : 'border-border hover:bg-muted'}`}>
                          {slot.timeLabel}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">Önce bir gün seçin.</p>
                  )}
                  <p className="text-xs text-muted-foreground">Saatler Türkiye saatiyle gösterilir.</p>
                </>
              )}
            </div>

            {format === 'ONLINE' ? (
              // KARAR-7 (A): online toplantı linkini mentör, onayda girer — menti burada girmez.
              <p className="text-xs text-muted-foreground">
                Görüşme bağlantısını mentörünüz, talebinizi onaylarken paylaşacak.
              </p>
            ) : (
              <div className="space-y-1">
                <label htmlFor={locationId} className="text-sm font-medium">
                  {format === 'IN_PERSON' ? 'Görüşme Yeri' : 'Telefon Numarası'}
                </label>
                <input id={locationId} type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                  placeholder={format === 'IN_PERSON' ? 'Örn: Kadıköy, İstanbul' : '+90 5xx xxx xx xx'}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor={messageId} className="text-sm font-medium">
                Neden bu görüşmeyi istiyorsunuz? <span className="text-destructive">*</span>
              </label>
              <textarea
                id={messageId}
                required
                value={requestMessage}
                onChange={(e) => setMsg(e.target.value)}
                maxLength={500}
                rows={4}
                placeholder="Hangi konuda deneyiminden faydalanmak istiyorsunuz? Hedeflerinizi, beklentilerinizi ve bu mentörü neden seçtiğinizi kısaca yazın. (50-500 karakter)"
                className={`w-full rounded-xl border bg-background px-3 py-2 text-sm resize-none ${
                  requestMessage.length > 0 && !msgValid
                    ? 'border-destructive'
                    : 'border-border'
                }`}
              />
              <div className="flex justify-between text-xs">
                <span className={msgLen > 0 && msgLen < 50 ? 'text-destructive' : 'text-muted-foreground'}>
                  {msgLen < 50 && msgLen > 0 ? `En az ${50 - msgLen} karakter daha yazın` : ''}
                </span>
                {/* AJ-07: amber-600 beyaz zeminde ~3.2:1 (AA metin eşiği 4.5:1 altı) — amber-700'e çekildi (~5.0:1). */}
                <span className={msgLen > 450 ? 'text-amber-700 dark:text-amber-400' : 'text-muted-foreground'}>
                  {msgLen}/500
                </span>
              </div>
            </div>

            {/* K-05/K-05b: seçim yapılmadan ya da (savunma amaçlı) blok dışı bir anla gönderilemez. */}
            <Button type="submit" className="w-full" disabled={submitting || !selectedStart || !msgValid || !isFitAvailability}>
              {submitting ? UI_TEXT.status.sending : 'Görüşme Talebini Gönder'}
            </Button>
            <p className="text-xs text-muted-foreground text-center">Talebiniz mentöre iletilecek, onaylaması gerekiyor.</p>
          </form>
        </>
      )}
    </div>
  );
}

export default function BookMeetingPage() {
  return <Suspense fallback={<div className="h-32 animate-pulse rounded-xl bg-muted" />}><BookMeetingContent /></Suspense>;
}
