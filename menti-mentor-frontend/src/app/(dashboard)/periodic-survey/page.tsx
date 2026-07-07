'use client';

import { Suspense } from 'react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { apiClient } from '@/lib/api/client';

const NPS_LABELS: Record<number, string> = {
  0: 'Kesinlikle hayır', 5: 'Belki', 10: 'Kesinlikle evet',
};

const CAREER_OPTIONS = [
  { value: 'MUCH_CLEARER', label: 'Çok daha netleşti' },
  { value: 'CLEARER',      label: 'Biraz netleşti' },
  { value: 'SAME',         label: 'Değişmedi' },
  { value: 'LESS_CLEAR',   label: 'Daha da karmaşıklaştı' },
];

const CONFIDENCE_OPTIONS = [
  { value: 5, label: 'Çok arttı' },
  { value: 4, label: 'Arttı' },
  { value: 3, label: 'Değişmedi' },
  { value: 2, label: 'Azaldı' },
  { value: 1, label: 'Çok azaldı' },
];

function PeriodicSurveyContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useAuth();
  const meetingId = params.get('meetingId') ?? '';

  const [npsScore,        setNpsScore]        = useState<number | null>(null);
  const [trustScore,      setTrustScore]      = useState<number | null>(null);
  const [careerGrowth,    setCareerGrowth]    = useState('');
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
  const [openNote,        setOpenNote]        = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);
  const [done,       setDone]       = useState(false);

  const canSubmit = npsScore !== null;

  async function handleSubmit() {
    if (!canSubmit || !meetingId) return;
    setSubmitting(true);
    setError(null);

    const result = await apiClient(`/api/meetings/${meetingId}/feedback`, {
      method: 'POST',
      body: {
        periodicNpsScore:      npsScore,
        periodicTrustScore:    trustScore ?? undefined,

        periodicConfidenceScore: confidenceScore ?? undefined,
        periodicCareerGrowth:  careerGrowth || undefined,
        specificComments:      openNote || undefined,
      },
      token: undefined,
    });

    setSubmitting(false);
    if (result.ok) { setDone(true); setTimeout(() => router.push(user?.role === 'MENTOR' ? '/mentor' : '/menti'), 2000); }
    else { setError((result.error as { message?: string })?.message ?? 'Gönderilemedi.'); }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-5xl">💛</p>
        <h2 className="text-xl font-semibold">Değerlendirmeniz Alındı</h2>
        <p className="text-sm text-muted-foreground">Bu program için çok değerli!</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6 animate-fade-in py-8">
      <div>
        <h1 className="text-2xl font-bold">Dönemlik Değerlendirme</h1>
        <p className="text-sm text-muted-foreground">Bu ay programı nasıl değerlendiriyorsunuz? (~10 dakika)</p>
      </div>

      {error && <AlertMessage type="error" message={error} />}

      <Card>
        <CardContent className="p-5 space-y-7">
          {/* NPS */}
          <div className="space-y-3">
            <p className="text-sm font-medium">
              Bu programı bir arkadaşınıza ne kadar tavsiye ederdiniz? (0–10)
            </p>
            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: 11 }, (_, i) => i).map((n) => (
                <button
                  key={n} type="button"
                  onClick={() => setNpsScore(n)}
                  className={`h-9 w-9 rounded-lg border text-sm font-medium transition-colors ${
                    npsScore === n
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 — {NPS_LABELS[0]}</span>
              <span>{NPS_LABELS[5]}</span>
              <span>10 — {NPS_LABELS[10]}</span>
            </div>
          </div>

          {/* Güven skoru */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Mentörünüzle/mentiyle güven ilişkinizi 1-10 puanlayın</p>
            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <button
                  key={n} type="button"
                  onClick={() => setTrustScore(n)}
                  className={`h-9 w-9 rounded-lg border text-sm font-medium transition-colors ${
                    trustScore === n ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-muted'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Kariyer netliği */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Kariyer hedefleriniz bu süreçte ne kadar netleşti?</p>
            <div className="grid grid-cols-2 gap-2">
              {CAREER_OPTIONS.map(({ value, label }) => (
                <button
                  key={value} type="button"
                  onClick={() => setCareerGrowth(value)}
                  className={`rounded-xl border p-2.5 text-xs text-left ${
                    careerGrowth === value ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Özgüven */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Bu süreçte özgüveniniz nasıl değişti?</p>
            <div className="flex flex-col gap-1.5">
              {CONFIDENCE_OPTIONS.map(({ value, label }) => (
                <button
                  key={value} type="button"
                  onClick={() => setConfidenceScore(value)}
                  className={`rounded-xl border px-3 py-2 text-sm text-left ${
                    confidenceScore === value ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Yöneticiye not */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Yöneticinize iletmek istediğiniz bir şey? (opsiyonel)</label>
            <textarea
              rows={3}
              maxLength={1000}
              value={openNote}
              onChange={(e) => setOpenNote(e.target.value)}
              placeholder="Program hakkında herhangi bir görüş, öneri..."
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm resize-none"
            />
          </div>

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
          >
            {submitting ? 'Kaydediliyor…' : 'Değerlendirmeyi Gönder'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PeriodicSurveyPage() {
  return <Suspense fallback={<div className="h-32 animate-pulse rounded-xl bg-muted" />}><PeriodicSurveyContent /></Suspense>;
}
