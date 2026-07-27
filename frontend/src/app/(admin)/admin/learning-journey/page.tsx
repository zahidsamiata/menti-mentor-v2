'use client';

/**
 * STK Öğrenme Yolculuğu düzenleme paneli — kopya-üzerine-düzenle.
 *
 * Global (çekirdek) aşamalar KİLİTLİ: yalnızca gizlenir ya da "özelleştir" ile
 * klonlanıp düzenlenir. STK kendi aşamalarını ekler/düzenler/siler/sıralar.
 * learningGoal + authoringGuide her kartta ÖNE ÇIKARILIR (editöre rehber).
 */

import { useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import {
  learningJourneyApi,
  type AdminStage,
  type AdminStageChoice,
  type AdminStageInput,
  type LearningAudience,
  type StageOutcome,
} from '@/lib/api/learningJourney';

const AUDIENCES: { value: LearningAudience; label: string }[] = [
  { value: 'MENTOR', label: 'Mentör Yolculuğu' },
  { value: 'MENTI', label: 'Menti Yolculuğu' },
];

const OUTCOME_LABEL: Record<StageOutcome, string> = {
  correct: '✅ Doğru',
  warn: '⚠️ Kısmi',
  wrong: '❌ Yanlış',
};

function emptyChoice(): AdminStageChoice {
  return { key: '', label: '', outcome: 'correct', feedback: '' };
}

export default function AdminLearningJourneyPage() {
  const api = useApiClient();
  const [audience, setAudience] = useState<LearningAudience>('MENTOR');
  const [actionError, setActionError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useQuery(
    () => learningJourneyApi.adminList(api, audience),
    [api, audience],
  );

  const stages = data?.items ?? [];

  function errMsg(res: { ok: false; error: { message?: string } }): string {
    return res.error.message ?? 'İşlem başarısız oldu.';
  }

  async function run(id: string, fn: () => Promise<{ ok: boolean; error?: { message?: string } }>) {
    setBusyId(id);
    setActionError(null);
    const res = await fn();
    setBusyId(null);
    if (res.ok) refetch();
    else setActionError((res as { ok: false; error: { message?: string } }).error.message ?? 'İşlem başarısız.');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold">Öğrenme Yolculuğu</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Keşif temelli aşamalar — sınav değil. Global çekirdek aşamalar kilitlidir;
            özelleştirerek kendi kopyanı düzenleyebilir ya da gizleyebilirsin.
          </p>
        </div>
        <Button size="sm" onClick={() => { setShowAdd((s) => !s); setEditId(null); }}>
          {showAdd ? 'Vazgeç' : '+ Yeni Aşama'}
        </Button>
      </div>

      {/* Audience sekmeleri */}
      <div className="flex gap-2">
        {AUDIENCES.map((a) => (
          <button
            key={a.value}
            onClick={() => { setAudience(a.value); setShowAdd(false); setEditId(null); }}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
              audience === a.value
                ? 'bg-primary text-primary-foreground font-medium'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      {actionError && <AlertMessage type="error" message={actionError} />}

      {showAdd && (
        <StageForm
          audience={audience}
          onCancel={() => setShowAdd(false)}
          onSubmit={async (input) => {
            const res = await learningJourneyApi.adminCreate(api, input);
            if (res.ok) { setShowAdd(false); refetch(); }
            else setActionError(errMsg(res as { ok: false; error: { message?: string } }));
            return res.ok;
          }}
        />
      )}

      {isLoading ? (
        <div className="h-40 rounded-2xl bg-muted animate-pulse" />
      ) : error ? (
        <AlertMessage type="error" message={error} />
      ) : stages.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">Bu yolculukta henüz aşama yok.</p>
      ) : (
        <div className="space-y-4">
          {stages.map((stage, idx) => {
            const isGlobal = stage.tenantId === null;
            const isBusy = busyId === stage.id;
            const isEditing = editId === stage.id;

            if (isEditing) {
              return (
                <StageForm
                  key={stage.id}
                  audience={audience}
                  initial={stage}
                  onCancel={() => setEditId(null)}
                  onSubmit={async (input) => {
                    const res = await learningJourneyApi.adminUpdate(api, stage.id, input);
                    if (res.ok) { setEditId(null); refetch(); }
                    else setActionError(errMsg(res as { ok: false; error: { message?: string } }));
                    return res.ok;
                  }}
                />
              );
            }

            return (
              <Card key={stage.id} className={stage.isHidden ? 'opacity-60' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">#{stage.order + 1}</Badge>
                    {isGlobal ? (
                      <Badge variant="outline" className="text-xs">Global (kilitli)</Badge>
                    ) : (
                      <Badge variant="brand" className="text-xs">
                        {stage.clonedFromId ? 'Özelleştirilmiş kopya' : 'Kuruma özel'}
                      </Badge>
                    )}
                    {stage.isStkSpecific && <Badge variant="outline" className="text-xs">STK bağlamı</Badge>}
                    {stage.isHidden && <Badge variant="warning" className="text-xs">Gizli</Badge>}
                  </div>
                  <CardTitle className="text-base mt-1">{stage.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* learningGoal + authoringGuide öne çıkarılır */}
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 space-y-1.5">
                    <p className="text-xs">
                      <span className="font-semibold">🎯 Öğrenme hedefi:</span> {stage.learningGoal}
                    </p>
                    {stage.authoringGuide && (
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold">✍️ Yazım rehberi:</span> {stage.authoringGuide}
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">🎬 {stage.situationText}</p>
                  <p className="text-xs text-muted-foreground">{stage.choices.length} seçenek</p>

                  {/* Eylemler */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {isGlobal ? (
                      <>
                        {!stage.isHidden && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={isBusy}
                              onClick={() => void run(stage.id, () => learningJourneyApi.adminCustomize(api, stage.id))}
                            >
                              Özelleştir
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={isBusy}
                              onClick={() => void run(stage.id, () => learningJourneyApi.adminHide(api, stage.id))}
                            >
                              Gizle
                            </Button>
                          </>
                        )}
                        {stage.isHidden && (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={isBusy}
                            onClick={() => void run(stage.id, () => learningJourneyApi.adminUnhide(api, stage.id))}
                          >
                            Yeniden göster
                          </Button>
                        )}
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={() => { setEditId(stage.id); setShowAdd(false); }}>
                          Düzenle
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive"
                          disabled={isBusy}
                          onClick={() => void run(stage.id, () => learningJourneyApi.adminDelete(api, stage.id))}
                        >
                          {stage.clonedFromId ? 'Varsayılana dön' : 'Sil'}
                        </Button>
                      </>
                    )}

                    {/* Sıralama — yalnızca kuruma özel aşamalar */}
                    {!isGlobal && (
                      <div className="flex gap-1 ml-auto">
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={isBusy || idx === 0}
                          onClick={() => void reorder(stages, idx, -1)}
                          aria-label="Yukarı taşı"
                        >
                          ↑
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={isBusy || idx === stages.length - 1}
                          onClick={() => void reorder(stages, idx, 1)}
                          aria-label="Aşağı taşı"
                        >
                          ↓
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );

  // Sıralama: yalnızca kuruma özel aşamaların id sırasını gönderir (global kilitli).
  async function reorder(list: AdminStage[], idx: number, dir: -1 | 1) {
    const target = idx + dir;
    if (target < 0 || target >= list.length) return;
    const ids = list.map((s) => s.id);
    [ids[idx], ids[target]] = [ids[target]!, ids[idx]!];
    // Yalnızca tenant'a ait id'leri gönder (backend global id reddeder).
    const ownIds = ids.filter((id) => list.find((s) => s.id === id)?.tenantId !== null);
    setBusyId(list[idx]!.id);
    setActionError(null);
    const res = await learningJourneyApi.adminReorder(api, ownIds);
    setBusyId(null);
    if (res.ok) refetch();
    else setActionError((res as { ok: false; error: { message?: string } }).error.message ?? 'Sıralama başarısız.');
  }
}

// ─── Aşama formu (ekle/düzenle) ───────────────────────────────────────────────

interface StageFormProps {
  audience: LearningAudience;
  initial?: AdminStage;
  onCancel: () => void;
  onSubmit: (input: AdminStageInput) => Promise<boolean>;
}

function StageForm({ audience, initial, onCancel, onSubmit }: StageFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [situationText, setSituationText] = useState(initial?.situationText ?? '');
  const [learningGoal, setLearningGoal] = useState(initial?.learningGoal ?? '');
  const [authoringGuide, setAuthoringGuide] = useState(initial?.authoringGuide ?? '');
  const [isStkSpecific, setIsStkSpecific] = useState(initial?.isStkSpecific ?? false);
  const [choices, setChoices] = useState<AdminStageChoice[]>(
    initial?.choices?.length ? initial.choices : [emptyChoice(), emptyChoice()],
  );
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function updateChoice(i: number, patch: Partial<AdminStageChoice>) {
    setChoices((prev) => prev.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
  }

  async function submit() {
    setFormError(null);
    if (!title.trim() || !situationText.trim() || !learningGoal.trim()) {
      setFormError('Başlık, durum metni ve öğrenme hedefi zorunludur.');
      return;
    }
    if (choices.length < 2 || choices.some((c) => !c.key.trim() || !c.label.trim() || !c.feedback.trim())) {
      setFormError('En az 2 seçenek; her seçenekte anahtar, etiket ve geri bildirim dolu olmalı.');
      return;
    }
    setSaving(true);
    const ok = await onSubmit({
      audience,
      title: title.trim(),
      situationText: situationText.trim(),
      learningGoal: learningGoal.trim(),
      authoringGuide: authoringGuide.trim() || null,
      isStkSpecific,
      choices: choices.map((c) => ({ ...c, key: c.key.trim(), label: c.label.trim(), feedback: c.feedback.trim() })),
    });
    setSaving(false);
    if (!ok) setFormError('Kaydedilemedi. Alanları kontrol edip tekrar dene.');
  }

  const field = 'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50';

  return (
    <Card className="border-primary/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{initial ? 'Aşamayı Düzenle' : 'Yeni Aşama'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-xs font-medium">Başlık</label>
          <input className={field} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={160} />
        </div>
        <div>
          <label className="text-xs font-medium">Durum / senaryo metni</label>
          <textarea className={field} rows={3} value={situationText} onChange={(e) => setSituationText(e.target.value)} maxLength={2000} />
        </div>
        <div>
          <label className="text-xs font-medium">🎯 Öğrenme hedefi</label>
          <input className={field} value={learningGoal} onChange={(e) => setLearningGoal(e.target.value)} maxLength={500} />
        </div>
        <div>
          <label className="text-xs font-medium">✍️ Yazım rehberi (opsiyonel)</label>
          <textarea className={field} rows={2} value={authoringGuide} onChange={(e) => setAuthoringGuide(e.target.value)} maxLength={1000} />
        </div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={isStkSpecific} onChange={(e) => setIsStkSpecific(e.target.checked)} />
          STK/dernek bağlamına özgü aşama
        </label>

        {/* Seçenekler */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold">Seçenekler (puan yok — her biri bir öğrenme anı)</p>
            <Button size="sm" variant="ghost" onClick={() => setChoices((p) => [...p, emptyChoice()])}>+ Seçenek</Button>
          </div>
          {choices.map((c, i) => (
            <div key={i} className="rounded-lg border border-border p-2 space-y-2">
              <div className="flex gap-2">
                <input
                  className={`${field} w-16`}
                  placeholder="a"
                  value={c.key}
                  onChange={(e) => updateChoice(i, { key: e.target.value })}
                  maxLength={8}
                />
                <select
                  className={field}
                  value={c.outcome}
                  onChange={(e) => updateChoice(i, { outcome: e.target.value as StageOutcome })}
                >
                  {(Object.keys(OUTCOME_LABEL) as StageOutcome[]).map((o) => (
                    <option key={o} value={o}>{OUTCOME_LABEL[o]}</option>
                  ))}
                </select>
                {choices.length > 2 && (
                  <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setChoices((p) => p.filter((_, idx) => idx !== i))}>
                    ✕
                  </Button>
                )}
              </div>
              <input className={field} placeholder="Seçenek metni" value={c.label} onChange={(e) => updateChoice(i, { label: e.target.value })} maxLength={600} />
              <textarea className={field} rows={2} placeholder="Geri bildirim (neden böyle?)" value={c.feedback} onChange={(e) => updateChoice(i, { feedback: e.target.value })} maxLength={1200} />
            </div>
          ))}
        </div>

        {formError && <AlertMessage type="error" message={formError} />}

        <div className="flex justify-end gap-2 pt-1">
          <Button size="sm" variant="outline" onClick={onCancel} disabled={saving}>Vazgeç</Button>
          <Button size="sm" onClick={() => void submit()} disabled={saving}>
            {saving ? 'Kaydediliyor…' : 'Kaydet'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
