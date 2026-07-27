'use client';

/**
 * ScenarioGuideEngine — senaryo-temelli keşif motoru (ortak, DRY).
 *
 * Mekanik: durum → seçenekler → seçim → outcome rozeti (✅/⚠️/❌) + feedback → sonraki.
 * "Sınav" DEĞİL "keşif": puanlama / geçme-kalma YOK. Ton: sıcak, sen-dili.
 *
 * İki yolculuk bu motoru kullanır:
 *   - Görüşme Rehberi (menti orientation-guide) → resolveChoice yerel (gömülü feedback).
 *   - Öğrenme Yolculuğu (mentör/menti)          → resolveChoice API'den outcome+feedback.
 *
 * Bu ayrım sayesinde cevap anahtarı (learning-journey'de) istemciye önden yüklenmez.
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertMessage } from '@/components/molecules/AlertMessage';

export type ScenarioOutcome = 'correct' | 'warn' | 'wrong';

export interface ScenarioChoice {
  key: string;
  label: string;
}

export interface EngineScenario {
  id: string;
  /** Durum/senaryo metni (🎬 Sahne). */
  situationText: string;
  /** İsteğe bağlı yönlendirici soru (örn. "Ne yaparsın?"). */
  question?: string;
  choices: ScenarioChoice[];
}

export interface ScenarioCompletion {
  emoji?: string;
  title: string;
  message: string;
  buttonLabel: string;
  loadingLabel?: string;
}

export interface ScenarioGuideEngineProps {
  title: string;
  subtitle?: string;
  scenarios: EngineScenario[];
  /**
   * Seçimin sonucunu çözer. Yerel (gömülü) ya da API tabanlı olabilir.
   * Hata fırlatırsa motor kullanıcıya nazik bir hata mesajı gösterir.
   */
  resolveChoice: (
    scenarioId: string,
    choiceKey: string,
  ) => Promise<{ outcome: ScenarioOutcome; feedback: string }>;
  /** Tüm aşamalar görülünce çağrılır; başarıyı { ok } ile bildirir. */
  onComplete: () => Promise<{ ok: boolean }>;
  completion: ScenarioCompletion;
}

const OUTCOME_STYLE: Record<ScenarioOutcome, { badge: string; icon: string }> = {
  correct: { badge: 'bg-green-100 text-green-800 border-green-300', icon: '✅' },
  warn: { badge: 'bg-amber-100 text-amber-800 border-amber-300', icon: '⚠️' },
  wrong: { badge: 'bg-red-100 text-red-800 border-red-300', icon: '❌' },
};

const SELECT_ERROR = 'Seçimin kaydedilemedi. Lütfen tekrar dene.';
const COMPLETE_ERROR = 'Tamamlama işlemi başarısız oldu. Lütfen tekrar dene.';

export function ScenarioGuideEngine({
  title,
  subtitle,
  scenarios,
  resolveChoice,
  onComplete,
  completion,
}: ScenarioGuideEngineProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<{ outcome: ScenarioOutcome; feedback: string } | null>(null);
  const [pending, setPending] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scenario = scenarios[current];
  const isLast = current === scenarios.length - 1;
  const done = current >= scenarios.length;
  const revealed = result !== null;

  async function choose(key: string) {
    if (revealed || pending) return;
    if (!scenario) return;
    setSelected(key);
    setPending(true);
    setError(null);
    try {
      const r = await resolveChoice(scenario.id, key);
      setResult(r);
    } catch {
      setSelected(null);
      setError(SELECT_ERROR);
    } finally {
      setPending(false);
    }
  }

  function next() {
    setSelected(null);
    setResult(null);
    setError(null);
    setCurrent((c) => c + 1);
  }

  async function complete() {
    setCompleting(true);
    setError(null);
    try {
      const res = await onComplete();
      if (!res.ok) setError(COMPLETE_ERROR);
    } catch {
      setError(COMPLETE_ERROR);
    } finally {
      setCompleting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in py-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>

      {/* İlerleme */}
      {!done && scenarios.length > 0 && (
        <div className="flex items-center gap-2">
          {scenarios.map((s, i) => (
            <div
              key={s.id}
              className={`h-2 flex-1 rounded-full transition-colors ${
                i < current ? 'bg-primary' : i === current ? 'bg-primary/50' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      )}

      {/* Senaryo */}
      {!done && scenario && (
        <Card>
          <CardHeader>
            <Badge variant="secondary" className="w-fit text-xs mb-1">
              {current + 1} / {scenarios.length}
            </Badge>
            <CardTitle className="text-base leading-snug">🎬 {scenario.situationText}</CardTitle>
            {scenario.question && <p className="text-sm font-medium mt-2">{scenario.question}</p>}
          </CardHeader>
          <CardContent className="space-y-3">
            {scenario.choices.map((c) => {
              const isSelected = selected === c.key;
              const style = result ? OUTCOME_STYLE[result.outcome] : null;
              return (
                <button
                  key={c.key}
                  onClick={() => void choose(c.key)}
                  disabled={revealed || pending}
                  className={`w-full text-left rounded-xl border p-3 text-sm transition-all ${
                    revealed && isSelected && style
                      ? `${style.badge} border`
                      : revealed
                        ? 'opacity-40 cursor-default border-border bg-muted'
                        : pending
                          ? 'opacity-60 cursor-wait border-border'
                          : 'border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer'
                  }`}
                >
                  <span className="font-semibold mr-2">{c.key.toUpperCase()})</span>
                  {revealed && isSelected && style && <span className="mr-1">{style.icon}</span>}
                  {c.label}
                  {revealed && isSelected && result && (
                    <p className="mt-2 text-xs opacity-90">{result.feedback}</p>
                  )}
                </button>
              );
            })}

            {error && !revealed && <AlertMessage type="error" message={error} />}

            {revealed && (
              <div className="pt-2 flex justify-end">
                {isLast ? (
                  <Button onClick={() => setCurrent(scenarios.length)} size="sm">
                    Tamamla →
                  </Button>
                ) : (
                  <Button onClick={next} size="sm" variant="outline">
                    Sonraki →
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tamamlandı ekranı */}
      {done && (
        <Card className="border-green-300 bg-green-50 dark:bg-green-950/20">
          <CardContent className="p-6 text-center space-y-4">
            <div className="text-4xl">{completion.emoji ?? '🎉'}</div>
            <h2 className="text-lg font-semibold">{completion.title}</h2>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{completion.message}</p>
            {error && <AlertMessage type="error" message={error} />}
            <Button onClick={() => void complete()} disabled={completing}>
              {completing ? (completion.loadingLabel ?? 'Kaydediliyor…') : completion.buttonLabel}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
