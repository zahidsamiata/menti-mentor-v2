'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useApiClient } from '@/hooks/useApiClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { certificationApi } from '@/lib/api/certification';
import type { CertQuestion, CertReveal, CertResult, CertOutcome } from '@/types/certification';

// Renk semantiği: yeşil=doğru, sarı=kabul edilebilir, kırmızı=yanlış (renk körlüğü için ikon da).
const OUTCOME_STYLE: Record<CertOutcome, { badge: string; icon: string; label: string }> = {
  correct:    { badge: 'bg-green-100 text-green-800 border-green-300', icon: '✅', label: 'En doğru' },
  acceptable: { badge: 'bg-amber-100 text-amber-800 border-amber-300', icon: '⚠️', label: 'Kabul edilebilir' },
  wrong:      { badge: 'bg-red-100 text-red-800 border-red-300',       icon: '❌', label: 'Zararlı / zayıf' },
};

interface Topic {
  topic: string;
  isRedLine: boolean;
  variants: CertQuestion[];
}

function groupByTopic(questions: CertQuestion[]): Topic[] {
  const order: string[] = [];
  const map = new Map<string, Topic>();
  for (const q of questions) {
    const key = q.topic ?? q.code;
    if (!map.has(key)) {
      map.set(key, { topic: key, isRedLine: q.isRedLine, variants: [] });
      order.push(key);
    }
    map.get(key)!.variants.push(q);
  }
  for (const t of map.values()) {
    t.variants.sort((a, b) => (a.variant ?? '').localeCompare(b.variant ?? ''));
  }
  return order.map((k) => map.get(k)!);
}

export default function MentorCertificationPage() {
  const { user } = useAuth();
  const api = useApiClient();

  const [topics, setTopics]     = useState<Topic[]>([]);
  const [loading, setLoading]   = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [topicIdx, setTopicIdx]     = useState(0);
  const [variantIdx, setVariantIdx] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [reveal, setReveal]         = useState<CertReveal | null>(null);
  const [revealing, setRevealing]   = useState(false);

  const [firstAttempts, setFirstAttempts] = useState<{ questionCode: string; optionKey: string }[]>([]);
  const [answeredTopics, setAnsweredTopics] = useState<Set<string>>(new Set());

  const [result, setResult]         = useState<CertResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const loadQuestions = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    const res = await certificationApi.getQuestions(api);
    setLoading(false);
    if (res.ok) {
      setTopics(groupByTopic(res.data.questions));
    } else {
      setLoadError('Senaryolar yüklenemedi. Lütfen tekrar deneyin.');
    }
  }, [api]);

  useEffect(() => {
    if (user?.role === 'MENTOR') void loadQuestions();
  }, [user?.role, loadQuestions]);

  if (!user || user.role !== 'MENTOR') return null;

  const currentTopic    = topics[topicIdx];
  const currentQuestion = currentTopic?.variants[variantIdx];
  const isLearningRetry = variantIdx > 0;

  async function choose(key: string) {
    if (reveal || revealing || !currentQuestion || !currentTopic) return;
    setSelectedKey(key);
    setRevealing(true);
    const res = await certificationApi.revealAnswer(api, currentQuestion.code, key);
    setRevealing(false);
    if (!res.ok) {
      setSelectedKey(null);
      setLoadError('Açıklama alınamadı. Lütfen tekrar deneyin.');
      return;
    }
    setReveal(res.data);
    // İlk-deneme yalnızca konunun İLK varyantında kaydedilir.
    if (variantIdx === 0 && !answeredTopics.has(currentTopic.topic)) {
      setFirstAttempts((prev) => [...prev, { questionCode: currentQuestion!.code, optionKey: key }]);
      setAnsweredTopics((prev) => new Set(prev).add(currentTopic!.topic));
    }
  }

  async function proceed() {
    if (!currentTopic || !reveal) return;
    const failedFirstAttempt = variantIdx === 0 && !reveal.firstAttemptPass && currentTopic.variants.length > 1;

    setSelectedKey(null);
    setReveal(null);

    if (failedFirstAttempt) {
      // Aynı konunun farklı varyantıyla öğret (ilk-deneme sonucu değişmez).
      setVariantIdx(1);
      return;
    }

    // Sonraki konu — ya da bitir.
    if (topicIdx >= topics.length - 1) {
      await submit();
      return;
    }
    setTopicIdx((i) => i + 1);
    setVariantIdx(0);
  }

  async function submit() {
    setSubmitting(true);
    setSubmitError(null);
    const res = await certificationApi.certify(api, firstAttempts);
    setSubmitting(false);
    if (res.ok) {
      setResult(res.data);
    } else {
      setSubmitError('Değerlendirme gönderilemedi. Lütfen tekrar deneyin.');
    }
  }

  function restart() {
    setResult(null);
    setTopicIdx(0);
    setVariantIdx(0);
    setSelectedKey(null);
    setReveal(null);
    setFirstAttempts([]);
    setAnsweredTopics(new Set());
    void loadQuestions();
  }

  // ── Yükleniyor / hata ────────────────────────────────────────────────────────
  if (loading) {
    return <div className="max-w-2xl mx-auto py-10 text-center text-muted-foreground">Senaryolar yükleniyor…</div>;
  }
  if (loadError && topics.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-10 space-y-4">
        <AlertMessage type="error" message={loadError} />
        <Button onClick={() => void loadQuestions()}>Tekrar dene</Button>
      </div>
    );
  }

  // ── Sonuç ekranı ─────────────────────────────────────────────────────────────
  if (result) {
    const failed = result.topicResults.filter((t) => !t.passed);
    return (
      <div className="max-w-2xl mx-auto py-8 space-y-6 animate-fade-in">
        {result.passed ? (
          <Card className="border-green-300 bg-green-50 dark:bg-green-950/20">
            <CardContent className="p-8 text-center space-y-4">
              <div className="text-5xl">🎓</div>
              <h2 className="text-xl font-bold">Tebrikler — Sertifikalı Mentörsün!</h2>
              <Badge className="bg-green-600 text-white text-sm">SERTİFİKALI</Badge>
              <p className="text-sm text-muted-foreground">
                İlk-deneme başarı oranın <strong>%{result.certScore}</strong>{' '}
                ({result.passedTopics}/{result.totalTopics} konu).
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-amber-300 bg-amber-50 dark:bg-amber-950/20">
            <CardContent className="p-8 text-center space-y-4">
              <div className="text-5xl">📚</div>
              <h2 className="text-xl font-bold">Neredeyse oldu — tekrar deneyebilirsin</h2>
              <p className="text-sm text-muted-foreground">
                İlk-deneme oranın <strong>%{result.certScore}</strong>{' '}
                ({result.passedTopics}/{result.totalTopics} konu). Sertifika için en az %80 gerekli.
                <br />Ceza veya bekleme yok — hemen yeniden başlayabilirsin.
              </p>
              {failed.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  Pekiştirilecek konu sayısı: {failed.length}
                </p>
              )}
              <Button onClick={restart}>Yeniden başla</Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // ── Değerlendiriliyor ────────────────────────────────────────────────────────
  if (submitting) {
    return <div className="max-w-2xl mx-auto py-10 text-center text-muted-foreground">Değerlendiriliyor…</div>;
  }

  if (!currentTopic || !currentQuestion) return null;

  // ── Senaryo akışı ────────────────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in py-6">
      <div>
        <h1 className="text-2xl font-bold">Mentör Sertifikası</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gerçek mentorluk durumlarını çöz. Her seçimden sonra kısa bir açıklama göreceksin — amaç öğrenmek.
        </p>
      </div>

      {/* İlerleme */}
      <div className="flex items-center gap-1.5" aria-label="İlerleme">
        {topics.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i < topicIdx ? 'bg-primary' : i === topicIdx ? 'bg-primary/50' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              Konu {topicIdx + 1} / {topics.length}
            </Badge>
            {currentQuestion.isRedLine && (
              <Badge className="bg-red-100 text-red-800 border border-red-300 text-xs">
                Kritik konu
              </Badge>
            )}
            {isLearningRetry && (
              <Badge className="bg-blue-100 text-blue-800 border border-blue-300 text-xs">
                Pekiştirme — farklı bir durum
              </Badge>
            )}
          </div>
          <CardTitle className="text-base leading-snug mt-2">🎬 {currentQuestion.scenario}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion.options.map((o) => {
            const isSelected = selectedKey === o.key;
            const style = reveal && reveal.outcome ? OUTCOME_STYLE[reveal.outcome] : null;
            return (
              <button
                key={o.key}
                onClick={() => choose(o.key)}
                disabled={Boolean(reveal) || revealing}
                className={`w-full text-left rounded-xl border p-3 text-sm transition-all ${
                  reveal && isSelected && style
                    ? `${style.badge} border`
                    : reveal
                    ? 'opacity-40 cursor-default border-border bg-muted'
                    : 'border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer'
                }`}
                aria-pressed={isSelected}
              >
                <span className="font-semibold mr-2">{o.key})</span>
                {reveal && isSelected && style && <span className="mr-1">{style.icon}</span>}
                {o.label}
                {reveal && isSelected && (
                  <span className="mt-2 block text-xs opacity-90">
                    {reveal.explanation}
                  </span>
                )}
              </button>
            );
          })}

          {reveal && (
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {reveal.firstAttemptPass
                  ? '✓ Bu konuyu ilk denemede geçtin.'
                  : variantIdx === 0 && currentTopic.variants.length > 1
                  ? 'Bir de benzer bir durumla pekiştirelim.'
                  : 'Açıklamayı okudun — devam edelim.'}
              </span>
              <Button onClick={() => void proceed()} size="sm">
                {topicIdx >= topics.length - 1 &&
                !(variantIdx === 0 && !reveal.firstAttemptPass && currentTopic.variants.length > 1)
                  ? 'Bitir ve değerlendir →'
                  : 'Devam →'}
              </Button>
            </div>
          )}

          {submitError && <AlertMessage type="error" message={submitError} />}
        </CardContent>
      </Card>
    </div>
  );
}
