'use client';

import { useState } from 'react';
import { X, ArrowRight, Check, RefreshCw } from 'lucide-react';

type Emoji = { value: number; icon: string; label: string };
type Chip  = { id: string; label: string; positive: boolean; dimension: string };

interface FeedbackPayload {
  rapportScore: number;
  progressScore?: number;
  tags: string[];
  comment?: string;
  earlyExit: boolean;
}

interface MeetingFeedbackCardProps {
  mentorName?: string;
  onSubmit: (payload: FeedbackPayload) => void;
  onDismiss?: () => void;
}

const EMOJIS: Emoji[] = [
  { value: 2, icon: '😕', label: 'Zayıf'       },
  { value: 3, icon: '😐', label: 'İdare eder'  },
  { value: 4, icon: '🙂', label: 'İyi'          },
  { value: 5, icon: '😍', label: 'Harika'       },
];

const CHIPS: Chip[] = [
  { id: 'listen',  label: '👂 İyi dinledi',           positive: true,  dimension: 'P3' },
  { id: 'guide',   label: '💡 Net yönlendirdi',        positive: true,  dimension: 'P1' },
  { id: 'focus',   label: '🎯 Hedefe odaklı',           positive: true,  dimension: 'P1' },
  { id: 'safe',    label: '🤝 Rahat hissettim',         positive: true,  dimension: 'P3' },
  { id: 'time',    label: '⏰ Zamanı iyi yönetti',      positive: true,  dimension: 'P4' },
  { id: 'messy',   label: '🌀 Dağınıktı',              positive: false, dimension: 'P1' },
  { id: 'cold',    label: '🧊 Mesafeliydi',             positive: false, dimension: 'P3' },
  { id: 'rushed',  label: '🏃 Acele etti',              positive: false, dimension: 'P4' },
  { id: 'unclear', label: '❓ Net değildi',             positive: false, dimension: 'P2' },
];

export default function MeetingFeedbackCard({
  mentorName = 'Mentörün',
  onSubmit,
  onDismiss,
}: MeetingFeedbackCardProps) {
  const [step,     setStep]     = useState<1 | 2 | 3>(1);
  const [rapport,  setRapport]  = useState<number | null>(null);
  const [progress, setProgress] = useState(3);
  const [tags,     setTags]     = useState<string[]>([]);
  const [comment,  setComment]  = useState('');

  const toggleTag = (id: string) =>
    setTags((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));

  const submit = (earlyExit = false) =>
    onSubmit({
      rapportScore:  rapport ?? 3,
      progressScore: progress,
      tags,
      comment:       comment.trim() || undefined,
      earlyExit,
    });

  return (
    <div className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute right-4 top-4 text-slate-300 transition hover:text-slate-500"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {/* Adım 1 — Genel his */}
      {step === 1 && (
        <>
          <h3 className="mb-1 text-base font-semibold text-slate-800">Görüşme nasıldı?</h3>
          <p className="mb-5 text-xs text-slate-500">{mentorName} ile geçirdiğin zaman</p>
          <div className="flex justify-between gap-2">
            {EMOJIS.map((e) => (
              <button
                key={e.value}
                onClick={() => { setRapport(e.value); setStep(2); }}
                className="flex flex-1 flex-col items-center gap-1.5 rounded-xl py-3 transition hover:bg-slate-50"
              >
                <span className="text-3xl">{e.icon}</span>
                <span className="text-[10px] font-medium text-slate-500">{e.label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Adım 2 — Etiketler + ilerleme */}
      {step === 2 && (
        <>
          <h3 className="mb-4 text-base font-semibold text-slate-800">Ne öne çıktı?</h3>

          <div className="mb-2 flex flex-wrap gap-2">
            {CHIPS.filter((c) => c.positive).map((c) => (
              <ChipButton key={c.id} chip={c} active={tags.includes(c.id)} onClick={() => toggleTag(c.id)} />
            ))}
          </div>

          <div className="my-3 text-center text-[11px] uppercase tracking-wide text-slate-300">
            geliştirilebilir
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            {CHIPS.filter((c) => !c.positive).map((c) => (
              <ChipButton key={c.id} chip={c} active={tags.includes(c.id)} onClick={() => toggleTag(c.id)} />
            ))}
          </div>

          <p className="mb-2 text-xs font-medium text-slate-600">
            Bu görüşme seni hedefine yaklaştırdı mı?
          </p>
          <div className="mb-5 flex items-center gap-3">
            <span className="text-xs text-slate-400">Hiç</span>
            <input
              type="range"
              min={1}
              max={5}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="flex-1 accent-indigo-600"
            />
            <span className="text-xs text-slate-400">Çok</span>
          </div>

          <button
            onClick={() => setStep(3)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Devam <ArrowRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* Adım 3 — Opsiyonel yorum */}
      {step === 3 && (
        <>
          <h3 className="mb-1 text-base font-semibold text-slate-800">Eklemek istediğin?</h3>
          <p className="mb-3 text-xs text-slate-400">opsiyonel</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Birkaç kelime…"
            className="mb-4 w-full resize-none rounded-xl border border-slate-200 p-3 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />
          <button
            onClick={() => submit(false)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <Check className="h-4 w-4" /> Tamamla
          </button>
        </>
      )}

      {/* Erken çıkış */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <button
          onClick={() => submit(true)}
          className="flex w-full items-center justify-center gap-1.5 text-xs text-slate-400 transition hover:text-rose-500"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Bu eşleşme bana uygun değil, farklı birini dene
        </button>
        <p className="mt-1 text-center text-[10px] text-slate-300">
          Geri bildirim eşleşme algoritmasını iyileştirir, kimliğin paylaşılmaz.
        </p>
      </div>
    </div>
  );
}

function ChipButton({
  chip,
  active,
  onClick,
}: {
  chip: Chip;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
        active
          ? chip.positive
            ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
            : 'border-rose-400 bg-rose-50 text-rose-700'
          : 'border-slate-200 text-slate-600 hover:border-slate-300'
      }`}
    >
      {chip.label}
    </button>
  );
}
