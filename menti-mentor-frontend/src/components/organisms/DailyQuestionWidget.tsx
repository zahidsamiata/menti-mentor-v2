'use client';

import { useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { questionsApi } from '@/lib/api/questions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Props {
  userId: string;
}

export function DailyQuestionWidget({ userId }: Props) {
  const api = useApiClient();

  const { data, isLoading, refetch } = useQuery(
    () => questionsApi.getNextAdaptive(api, userId),
    [api, userId],
    { enabled: Boolean(userId) },
  );

  const [selected, setSelected] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [justAnswered, setJustAnswered] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (isLoading) return null;
  if (!data || data.done) return null; // Tüm sorular bitti

  const { question, progress } = data;
  if (!question) return null;
  // Test tamamlandıysa widget gizle — zorunlu değil zaten, isteyenler devam edebilir
  if (progress.isComplete) return null;

  async function handleSubmit() {
    if (selected === null || !question) return;
    setSubmitting(true);
    await questionsApi.submitAdaptiveAnswer(api, userId, question.id, selected);
    setSubmitting(false);
    setSelected(null);
    setJustAnswered(true);
    setTimeout(() => { setJustAnswered(false); refetch(); }, 1500);
  }

  const LIKERT = [
    { value: 1, label: 'Hiç katılmıyorum' },
    { value: 2, label: 'Katılmıyorum' },
    { value: 3, label: 'Kararsızım' },
    { value: 4, label: 'Katılıyorum' },
    { value: 5, label: 'Tamamen katılıyorum' },
  ];

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Profil Sorusu</CardTitle>
          <span className="text-xs text-muted-foreground">
            %{Math.round(progress.completionPercent)} tamamlandı
          </span>
        </div>
        <Progress value={progress.completionPercent} className="h-1.5" />
      </CardHeader>
      <CardContent className="space-y-4">
        {justAnswered ? (
          <div className="text-center py-4">
            <p className="text-2xl">✓</p>
            <p className="text-sm font-medium mt-1">Kaydedildi!</p>
          </div>
        ) : (
          <>
            <p className="text-sm font-medium leading-relaxed">{question.text}</p>
            <div className="flex flex-col gap-1.5">
              {LIKERT.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setSelected(value)}
                  className={`rounded-lg border px-3 py-2 text-xs text-left transition-colors ${
                    selected === value
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background hover:bg-muted'
                  }`}
                >
                  <span className="font-bold mr-2">{value}</span>{label}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <Button
                size="sm"
                disabled={selected === null || submitting}
                onClick={handleSubmit}
              >
                {submitting ? 'Kaydediliyor…' : 'Gönder ve devam et'}
              </Button>
              <button
                className="text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setDismissed(true)}
              >
                Daha sonra
              </button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
