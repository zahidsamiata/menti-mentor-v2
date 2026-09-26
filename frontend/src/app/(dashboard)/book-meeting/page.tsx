'use client';

import { Suspense } from 'react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { meetingsApi } from '@/lib/api/meetings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { WeeklyMeetingLimitNote } from '@/components/molecules/WeeklyMeetingLimitNote';
import { fitsAvailability, weekdayLabelTr, type AvailabilityBlockLike } from '@/lib/meetingAvailability';
import { conversationsApi } from '@/lib/api/conversations';

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
  const [date, setDate]               = useState('');
  const [time, setTime]               = useState('');
  const [duration, setDuration]       = useState(60);
  const [location, setLocation]       = useState('');
  const [requestMessage, setMsg]      = useState('');
  const [submitting, setSubmitting]   = useState(false);
  const [error, setError]             = useState<string | null>(null);
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

  const selectedStart = date && time ? new Date(`${date}T${time}:00`) : null;
  const selectedEnd   = selectedStart ? addMinutes(selectedStart, duration) : null;

  // KR-12: kontrol, backend ile aynı kuralla blok saat diliminde (vars. Europe/Istanbul) yapılır.
  const isFitAvailability =
    !selectedStart || !selectedEnd || !availability?.blocks?.length
      ? true
      : fitsAvailability(selectedStart, selectedEnd, availability.blocks as AvailabilityBlockLike[]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !selectedStart || !selectedEnd) return;
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
    else { setError(result.error.message ?? 'Randevu oluşturulamadı.'); }
  }

  if (success) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-4xl">📅</p>
      <h2 className="text-xl font-semibold">Randevu Talebiniz Gönderildi</h2>
      <p className="text-sm text-muted-foreground text-center">Mentör onayladığında bildirim alacaksınız.</p>
      <WeeklyMeetingLimitNote className="max-w-md text-center" />
    </div>
  );

  return (
    <div className="max-w-lg mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Randevu Talebi</h1>
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
              Şu an bu mentöre randevu talebi gönderemezsiniz. Mentörünüze mesaj göndererek uygun bir zaman ayarlayabilirsiniz.
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
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm resize-none"
              />
              <Button type="submit" className="w-full" disabled={convoSending || !convoMessage.trim()}>
                {convoSending ? 'Gönderiliyor…' : 'Mesaj Gönder'}
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
            {/* K-05: bu uyarı yalnızca mentörün BELİRLİ bloğu varken (KATI/①) ve seçilen saat o bloğa
                uymadığında görünür (isFitAvailability, blok yokken her zaman true döner) — backend bu
                durumda talebi 409 ile KESİN reddeder (meetingController.ts ~505). */}
            {selectedStart && !isFitAvailability && (
              <AlertMessage type="error" message="Seçtiğiniz saat mentörün müsaitlik bloğu dışında. Bu mentör yalnızca müsait gösterdiği saatlerden seçebilirsiniz — talebiniz aksi halde reddedilir." />
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Görüşme Formatı</label>
              <div className="grid grid-cols-3 gap-2">
                {FORMATS.map(({ value, label }) => (
                  <button key={value} type="button" onClick={() => { setFormat(value); setLocation(''); }}
                    className={`rounded-xl border p-2.5 text-xs transition-colors ${format === value ? 'border-primary bg-primary/10 font-medium' : 'border-border hover:bg-muted'}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">Tarih</label>
                <input type="date" required min={new Date().toISOString().split('T')[0]} value={date} onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Saat</label>
                <input type="time" required value={time} onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Süre</label>
              <div className="flex gap-2">
                {DURATIONS.map((d) => (
                  <button key={d} type="button" onClick={() => setDuration(d)}
                    className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${duration === d ? 'border-primary bg-primary/10 font-medium' : 'border-border hover:bg-muted'}`}>
                    {d} dk
                  </button>
                ))}
              </div>
            </div>

            {format === 'ONLINE' ? (
              // KARAR-7 (A): online toplantı linkini mentör, onayda girer — menti burada girmez.
              <p className="text-xs text-muted-foreground">
                Toplantı linkini mentörünüz, talebinizi onaylarken paylaşacak.
              </p>
            ) : (
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  {format === 'IN_PERSON' ? 'Buluşma Yeri' : 'Telefon Numarası'}
                </label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                  placeholder={format === 'IN_PERSON' ? 'Örn: Kadıköy, İstanbul' : '+90 5xx xxx xx xx'}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium">
                Neden bu görüşmeyi istiyorsunuz? <span className="text-destructive">*</span>
              </label>
              <textarea
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
                <span className={msgLen > 450 ? 'text-amber-600 dark:text-amber-400' : 'text-muted-foreground'}>
                  {msgLen}/500
                </span>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={submitting || !date || !time || !msgValid}>
              {submitting ? 'Gönderiliyor…' : 'Randevu Talebini Gönder'}
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
