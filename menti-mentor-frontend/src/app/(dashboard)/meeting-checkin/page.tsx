'use client';

import { Suspense } from 'react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useApiClient } from '@/hooks/useApiClient';
import { meetingsApi } from '@/lib/api/meetings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertMessage } from '@/components/molecules/AlertMessage';

const STARS = [1, 2, 3, 4, 5];
const CONTINUE_OPTIONS = [
  { value: 'EVET',     label: '✅ Evet, kesinlikle' },
  { value: 'BELIRSIZ', label: '🤔 Henüz emin değilim' },
  { value: 'HAYIR',    label: '❌ Devam etmek istemiyorum' },
];
const WANTED_MORE = [
  { value: 'YONLENDIRME', label: 'Daha fazla yönlendirme' },
  { value: 'KAYNAK',      label: 'Daha fazla kaynak/öneri' },
  { value: 'BAGLANIT',    label: 'Daha fazla bağlantı' },
  { value: 'GERI_BILDIRIM', label: 'Daha dürüst geri bildirim' },
  { value: 'HAYIR',       label: 'Hayır, yeterliydi' },
];

function MeetingCheckInContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useAuth();
  const api = useApiClient();

  const meetingId = params.get('meetingId') ?? '';

  const [step, setStep] = useState<'quick' | 'deep' | 'done'>('quick');

  // Zorunlu alanlar
  const [overallRating,  setOverallRating]  = useState<number | null>(null);
  const [progressRating, setProgressRating] = useState<number | null>(null);
  const [continueIntent, setContinueIntent] = useState<string | null>(null);
  const [preparedness,   setPreparedness]   = useState<number | null>(null); // sadece mentör

  // Opsiyonel derin
  const [wantedMore,    setWantedMore]    = useState('');
  const [nextTopicNote, setNextTopicNote] = useState('');
  const [openNote,      setOpenNote]      = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  const isMentor = user?.role === 'MENTOR';
  const canSubmit = overallRating !== null && progressRating !== null && continueIntent !== null;

  async function handleSubmit(withDeep = false) {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);

    const payload = {
      overallRating:  overallRating!,
      progressRating: progressRating!,
      continueIntent: continueIntent! as 'EVET' | 'BELIRSIZ' | 'HAYIR',
      ...(isMentor && preparedness !== null ? { menteePreparedness: preparedness } : {}),
      ...(withDeep ? {
        wantedMore:    wantedMore || undefined,
        nextTopicNote: nextTopicNote || undefined,
        openNote:      openNote || undefined,
      } : {}),
    };

    const result = await meetingsApi.submitCheckIn(api, meetingId, payload);
    setSubmitting(false);
    if (result.ok) {
      setStep('done');
      setTimeout(() => router.push(isMentor ? '/mentor' : '/menti'), 2000);
    } else {
      setError(result.error?.message ?? 'Gönderilemedi.');
    }
  }

  if (step === 'done') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-5xl">🎉</p>
        <h2 className="text-xl font-semibold">Teşekkürler!</h2>
        <p className="text-sm text-muted-foreground">Görüşüz kaydedildi, panele yönlendiriliyorsunuz.</p>
      </div>
    );
  }

  const StarRow = ({ label, value, onChange }: { label: string; value: number | null; onChange: (v: number) => void }) => (
    <div className="space-y-1.5">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex gap-2">
        {STARS.map((s) => (
          <button
            key={s} type="button"
            onClick={() => onChange(s)}
            className={`text-2xl transition-transform hover:scale-110 ${
              value !== null && s <= value ? 'text-yellow-400' : 'text-muted-foreground/30'
            }`}
          >
            ★
          </button>
        ))}
        {value && <span className="text-xs text-muted-foreground self-center">{value}/5</span>}
      </div>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto space-y-6 animate-fade-in py-8">
      <div>
        <h1 className="text-2xl font-bold">Görüşme Değerlendirmesi</h1>
        <p className="text-sm text-muted-foreground">
          {step === 'quick' ? '~90 saniye — 3 hızlı soru' : 'Daha ayrıntılı paylaşmak ister misiniz?'}
        </p>
      </div>

      {error && <AlertMessage type="error" message={error} />}

      {step === 'quick' && (
        <Card>
          <CardContent className="p-5 space-y-6">
            <StarRow
              label="Bu görüşme ne kadar değerliydi?"
              value={overallRating}
              onChange={setOverallRating}
            />
            <StarRow
              label="Hedefinize ne kadar yaklaştınız?"
              value={progressRating}
              onChange={setProgressRating}
            />
            {isMentor && (
              <StarRow
                label="Menti bu görüşmeye ne kadar hazırlıklı geldi?"
                value={preparedness}
                onChange={setPreparedness}
              />
            )}

            <div className="space-y-2">
              <p className="text-sm font-medium">Bir sonraki görüşmeye gelecek misiniz?</p>
              <div className="flex flex-col gap-2">
                {CONTINUE_OPTIONS.map(({ value, label }) => (
                  <button
                    key={value} type="button"
                    onClick={() => setContinueIntent(value)}
                    className={`rounded-xl border px-4 py-2.5 text-sm text-left transition-colors ${
                      continueIntent === value
                        ? 'border-primary bg-primary/10 font-medium'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Button
                onClick={() => handleSubmit(false)}
                disabled={!canSubmit || submitting}
              >
                {submitting ? 'Kaydediliyor…' : 'Hızlı Gönder (90 sn)'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setStep('deep')}
                disabled={!canSubmit}
              >
                Daha fazla paylaş →
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'deep' && (
        <Card>
          <CardHeader><CardTitle className="text-base">Opsiyonel — Daha Derin Görüş</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {!isMentor && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Bu görüşmede daha fazla istediğiniz bir şey var mıydı?</p>
                <div className="grid grid-cols-1 gap-2">
                  {WANTED_MORE.map(({ value, label }) => (
                    <button
                      key={value} type="button"
                      onClick={() => setWantedMore(value)}
                      className={`rounded-xl border px-3 py-2 text-sm text-left ${
                        wantedMore === value ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium">Bir sonraki görüşmede konuşmak istediğiniz konu?</label>
              <textarea
                rows={3}
                maxLength={500}
                value={nextTopicNote}
                onChange={(e) => setNextTopicNote(e.target.value)}
                placeholder="Örn: Kariyer hedeflerimi netleştirmek istiyorum..."
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Yöneticinize iletmek istediğiniz bir şey var mı?</label>
              <textarea
                rows={2}
                maxLength={1000}
                value={openNote}
                onChange={(e) => setOpenNote(e.target.value)}
                placeholder="İsteğe bağlı..."
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm resize-none"
              />
            </div>

            <Button
              className="w-full"
              onClick={() => handleSubmit(true)}
              disabled={submitting}
            >
              {submitting ? 'Kaydediliyor…' : 'Gönder'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function MeetingCheckInPage() {
  return <Suspense fallback={<div className="h-32 animate-pulse rounded-xl bg-muted" />}><MeetingCheckInContent /></Suspense>;
}
