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
 * K-06: seçim YAPILDIKTAN SONRA diğer şıkların açıklaması da (yine resolveChoice ile)
 * istenerek gösterilir — seçimden önce hiçbir açıklama istemciye gelmez.
 */

import { useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { shuffle } from '@/lib/shuffle';

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
  /**
   * Şık sırasını her gösterimde karıştır (madde 143). Cevap kimliğe (key) bağlı,
   * indeks değil → karıştırma cevabı bozmaz. Aynı oturumda geri dönülünce sıra
   * değişebilir (kabul edilmiş davranış). Varsayılan: false (Görüşme Rehberi sabit kalsın).
   */
  shuffleChoices?: boolean;
  /**
   * Nötr geri bildirim (madde 144 — öğrenme yolculuğu): seçim sonrası YALNIZ seçilen
   * şıkkın geri bildirimi görünür; RENK YOK, doğru/yanlış İŞARETİ YOK; diğer şıklar
   * kapalı, "Diğer seçenekler…" ile açılır ve açıldığında da işaretlenmez. Gerekçe:
   * kişi kalıbı öğrenmesin (beklenen tepkiyi değil kendi tepkisini seçsin).
   * K-06: "Diğer seçenekler…" açılınca diğer şıkların açıklaması da görünür (yalnız metin;
   * outcome kullanılmaz → renk/işaret yine YOK). Açıklamalar ancak seçimden SONRA, açılış
   * anında resolveChoice ile istenir. Varsayılan:
   * false → Görüşme Rehberi eski renkli/işaretli davranışı korur. Sertifika bu motoru KULLANMAZ.
   */
  neutralFeedback?: boolean;
}

const OUTCOME_STYLE: Record<ScenarioOutcome, { badge: string; icon: string }> = {
  correct: { badge: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800', icon: '✅' },
  warn: { badge: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800', icon: '⚠️' },
  wrong: { badge: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800', icon: '❌' },
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
  shuffleChoices = false,
  neutralFeedback = false,
}: ScenarioGuideEngineProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<{ outcome: ScenarioOutcome; feedback: string } | null>(null);
  const [pending, setPending] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Nötr modda "Diğer seçenekler" aç/kapa (madde 144). Her aşamada sıfırlanır.
  const [showOthers, setShowOthers] = useState(false);
  // K-06: diğer şıkların açıklamaları (key → feedback). Yalnız seçimden sonra, "Diğer
  // seçenekler" ilk açıldığında istenir. othersFor = hangi aşama için yüklendiği.
  const [othersFeedback, setOthersFeedback] = useState<Record<string, string>>({});
  const [othersFor, setOthersFor] = useState<string | null>(null);
  const [othersLoading, setOthersLoading] = useState(false);
  const [othersFailed, setOthersFailed] = useState(false);
  // Geç gelen yanıt başka aşamaya yazılmasın diye güncel aşama kimliği.
  const activeScenarioId = useRef<string | null>(null);

  const scenario = scenarios[current];
  const isLast = current === scenarios.length - 1;
  const done = current >= scenarios.length;
  const revealed = result !== null;
  activeScenarioId.current = scenario?.id ?? null;

  // Şık sırası: karıştırma açıksa aşama başına stabil — aynı aşamada sabit kalır,
  // sonraki/önceki aşamaya geçince yeniden karışır. Bağımlılık scenario?.id (obje değil):
  // üst bileşen her render'da yeni dizi üretse bile aşama içinde sıra zıplamaz.
  const displayChoices = useMemo(
    () => (!scenario ? [] : shuffleChoices ? shuffle(scenario.choices) : scenario.choices),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scenario?.id, shuffleChoices],
  );

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

  async function loadOthersFeedback() {
    // Seçimden önce ASLA istenmez (cevap anahtarı önden yüklenmesin).
    if (!scenario || !revealed || !selected) return;
    // Başarıyla yüklendiyse tekrar isteme; kısmi hata varsa yeniden açılışta tekrar dener.
    if (othersLoading || (othersFor === scenario.id && !othersFailed)) return;
    const stageId = scenario.id;
    const keys = displayChoices.filter((c) => c.key !== selected).map((c) => c.key);
    setOthersLoading(true);
    setOthersFailed(false);
    const settled = await Promise.allSettled(keys.map((k) => resolveChoice(stageId, k)));
    if (activeScenarioId.current !== stageId) return; // kullanıcı aşamayı geçti
    const map: Record<string, string> = {};
    let failed = false;
    settled.forEach((r, i) => {
      const key = keys[i];
      if (r.status === 'fulfilled' && key) map[key] = r.value.feedback;
      else failed = true;
    });
    setOthersFeedback(map);
    setOthersFor(stageId);
    setOthersFailed(failed);
    setOthersLoading(false);
  }

  function toggleOthers() {
    const opening = !showOthers;
    setShowOthers(opening);
    if (opening) void loadOthersFeedback();
  }

  function next() {
    setSelected(null);
    setResult(null);
    setError(null);
    setShowOthers(false);
    setOthersFeedback({});
    setOthersFor(null);
    setOthersLoading(false);
    setOthersFailed(false);
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
            {revealed && neutralFeedback ? (
              // ── Nötr geri bildirim (madde 144): seçilen + feedback; renk/işaret YOK ──
              // K-06: diğer şıklar açılınca onların açıklaması da görünür.
              <NeutralReveal
                choices={displayChoices}
                selectedKey={selected}
                feedback={result?.feedback ?? ''}
                showOthers={showOthers}
                onToggleOthers={toggleOthers}
                othersFeedback={othersFor === scenario.id ? othersFeedback : {}}
                othersLoading={othersLoading}
                othersFailed={othersFailed}
              />
            ) : (
              displayChoices.map((c, idx) => {
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
                    {/* madde/K-07: görüntü harfi karıştırmadan SONRA sıraya göre atanır
                        (üstten alta hep A→D). Cevap kimliği c.key ile korunur. */}
                    <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)})</span>
                    {revealed && isSelected && style && <span className="mr-1">{style.icon}</span>}
                    {c.label}
                    {revealed && isSelected && result && (
                      <p className="mt-2 text-xs opacity-90">{result.feedback}</p>
                    )}
                  </button>
                );
              })
            )}

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
        <Card className="border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
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

/**
 * Nötr geri bildirim gösterimi (madde 144). Seçilen şık + feedback görünür; RENK YOK,
 * doğru/yanlış İŞARETİ YOK. Diğer şıklar kapalı; "Diğer seçenekler…" ile işaretsiz açılır.
 * K-06 (KARAR-29 → A): açılınca diğer şıkların açıklaması da görünür. Açıklamalar yalnız
 * seçimden SONRA istenir; outcome hiç gösterilmez (işaret/renk yok kuralı korunur).
 * Harfler üstteki listeyle aynı: görüntü sırasına göre A→D (K-07), orijinal key değil.
 */
function NeutralReveal({
  choices,
  selectedKey,
  feedback,
  showOthers,
  onToggleOthers,
  othersFeedback,
  othersLoading,
  othersFailed,
}: {
  choices: ScenarioChoice[];
  selectedKey: string | null;
  feedback: string;
  showOthers: boolean;
  onToggleOthers: () => void;
  othersFeedback: Record<string, string>;
  othersLoading: boolean;
  othersFailed: boolean;
}) {
  const letterOf = (key: string) => String.fromCharCode(65 + choices.findIndex((c) => c.key === key));
  const selected = choices.find((c) => c.key === selectedKey);
  const others = choices.filter((c) => c.key !== selectedKey);

  return (
    <div className="space-y-3">
      {selected && (
        <div className="w-full text-left rounded-xl border border-primary/40 bg-primary/5 p-3 text-sm">
          <span className="font-semibold mr-2">{letterOf(selected.key)})</span>
          {selected.label}
          {feedback && <p className="mt-2 text-xs opacity-90">{feedback}</p>}
        </div>
      )}

      {others.length > 0 && (
        <div>
          <button
            type="button"
            onClick={onToggleOthers}
            aria-expanded={showOthers}
            className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            {showOthers ? 'Diğer seçenekleri gizle' : 'Diğer seçenekler ne anlama geliyordu?'}
          </button>
          {showOthers && (
            <ul className="mt-2 space-y-2">
              {others.map((c) => (
                <li
                  key={c.key}
                  className="rounded-xl border border-border bg-muted/40 p-3 text-sm text-muted-foreground"
                >
                  <span className="font-semibold mr-2">{letterOf(c.key)})</span>
                  {c.label}
                  {othersFeedback[c.key] && (
                    <p className="mt-2 text-xs opacity-90">{othersFeedback[c.key]}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
          {showOthers && othersLoading && (
            <p className="mt-2 text-xs text-muted-foreground">Açıklamalar yükleniyor…</p>
          )}
          {showOthers && !othersLoading && othersFailed && (
            <p className="mt-2 text-xs text-muted-foreground">
              Bazı açıklamalar yüklenemedi. Seçenekleri kapatıp yeniden açabilirsin.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
