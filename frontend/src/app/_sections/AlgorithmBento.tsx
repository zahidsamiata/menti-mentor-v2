'use client';

import { useState } from 'react';
import { ShieldX, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Sol bento: Teknik Eşleştirme (%60) ──────────────────────────────────────

const SKILL_TAGS = [
  { id: 1,  label: 'Yazılım',        sector: true  },
  { id: 2,  label: 'Veri Bilimi',    sector: true  },
  { id: 3,  label: 'Ürün Yönetimi',  sector: true  },
  { id: 4,  label: 'Finans',         sector: false },
  { id: 5,  label: 'UX Tasarım',     sector: false },
  { id: 6,  label: 'Girişimcilik',   sector: false },
  { id: 7,  label: 'Pazarlama',      sector: false },
  { id: 8,  label: 'İnsan Kaynakları', sector: false },
  { id: 9,  label: 'Hukuk',          sector: false },
  { id: 10, label: 'Mühendislik',    sector: true  },
  { id: 11, label: 'Akademi',        sector: false },
  { id: 12, label: 'Liderlik',       sector: false },
];

const INITIAL_SELECTED = new Set([1, 2, 3, 10]);

function TechnicalBento() {
  const [selected, setSelected] = useState<Set<number>>(INITIAL_SELECTED);

  const toggle = (id: number) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });

  const rawScore = 52 + selected.size * 4;
  const matchScore = Math.min(97, rawScore);

  return (
    <div className="flex flex-col h-full gap-5">
      {/* Başlık */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-3xl font-black text-indigo-400">%60</span>
          <span className="text-sm font-semibold text-slate-300">Teknik Uyum</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Sektör, rol ve yetkinlik örtüşmesi. Etiketleri seçerek eşleşme skorunu canlı gör.
        </p>
      </div>

      {/* İnteraktif chip bulutu */}
      <div className="flex flex-wrap gap-2">
        {SKILL_TAGS.map(({ id, label }) => {
          const isActive = selected.has(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => toggle(id)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150 cursor-pointer',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400',
                isActive
                  ? 'bg-indigo-500/20 border-indigo-500/60 text-indigo-300 scale-105 shadow-sm shadow-indigo-500/20'
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300',
              )}
              aria-pressed={isActive}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Canlı skor göstergesi */}
      <div className="mt-auto rounded-xl bg-slate-800/60 border border-slate-700/50 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 font-medium">Teknik Eşleşme Skoru</span>
          <span className="text-lg font-extrabold text-indigo-400">%{matchScore}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500 ease-out"
            style={{ width: `${matchScore}%` }}
          />
        </div>
        <p className="mt-2 text-[10px] text-slate-500">
          {selected.size} ortak alan · {selected.size} etiket seçili
        </p>
      </div>
    </div>
  );
}

// ─── DISC Profil Mini Barları ─────────────────────────────────────────────────

interface DiscProfile {
  name:    string;
  role:    string;
  initials: string;
  color:   string;
  bars:    { dim: string; pct: number }[];
}

const MENTOR_PROFILE: DiscProfile = {
  name: 'Ali K.',
  role: 'Mentor',
  initials: 'AK',
  color: 'from-violet-500 to-indigo-600',
  bars: [
    { dim: 'D', pct: 80 },
    { dim: 'I', pct: 25 },
    { dim: 'S', pct: 20 },
    { dim: 'C', pct: 75 },
  ],
};

const MENTI_PROFILE: DiscProfile = {
  name: 'Zeynep A.',
  role: 'Menti',
  initials: 'ZA',
  color: 'from-emerald-500 to-teal-600',
  bars: [
    { dim: 'D', pct: 20 },
    { dim: 'I', pct: 55 },
    { dim: 'S', pct: 80 },
    { dim: 'C', pct: 70 },
  ],
};

function DiscProfileCard({ profile }: { profile: DiscProfile }) {
  return (
    <div className="rounded-xl bg-slate-800/70 border border-slate-700/50 p-3 space-y-3 flex-1">
      {/* Avatar + İsim */}
      <div className="flex items-center gap-2">
        <div className={cn(
          'h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br flex items-center justify-center text-xs font-bold text-white',
          profile.color,
        )}>
          {profile.initials}
        </div>
        <div>
          <p className="text-xs font-semibold text-white">{profile.name}</p>
          <p className="text-[10px] text-slate-500">{profile.role}</p>
        </div>
      </div>
      {/* DISC Barları */}
      <div className="space-y-1.5">
        {profile.bars.map(({ dim, pct }) => (
          <div key={dim} className="flex items-center gap-2">
            <span className="w-3 text-[10px] font-bold text-slate-400">{dim}</span>
            <div className="flex-1 h-1.5 rounded-full bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-400/70 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-6 text-right text-[10px] text-slate-500">{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PsychometricBento() {
  return (
    <div className="flex flex-col h-full gap-5">
      {/* Başlık */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-3xl font-black text-violet-400">%40</span>
          <span className="text-sm font-semibold text-slate-300">Psikometrik Derinlik</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Bilimsel DISC mizaç motoru. Tamamlayıcı profiller güçlü, çakışanlar engellenir.
        </p>
      </div>

      {/* Başarılı eşleşme */}
      <div className="rounded-xl bg-slate-800/60 border border-green-500/20 p-4">
        <div className="flex items-start gap-3 mb-3">
          <DiscProfileCard profile={MENTOR_PROFILE} />

          {/* Orta: skor */}
          <div className="flex flex-col items-center justify-center gap-1 shrink-0 py-2">
            <span className="text-xl font-black text-green-400">%88</span>
            <CheckCircle2 className="h-5 w-5 text-green-400" aria-hidden />
            <span className="text-[9px] text-green-500 font-medium text-center leading-tight">
              Uyumlu<br />Eşleşme
            </span>
          </div>

          <DiscProfileCard profile={MENTI_PROFILE} />
        </div>

        <div className="flex items-center gap-1.5 rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-2">
          <CheckCircle2 className="h-3.5 w-3.5 text-green-400 shrink-0" aria-hidden />
          <span className="text-[10px] text-green-400 font-medium">
            D + S kombinasyonu: Tamamlayıcı güçler — sistem onaylar.
          </span>
        </div>
      </div>

      {/* Toksik engel */}
      <div className="rounded-xl bg-slate-800/60 border border-red-500/20 p-4">
        <div className="flex items-center gap-3 mb-3">
          {/* İki aynı profil */}
          {(['DK', 'MB'] as const).map((initials) => (
            <div key={initials} className="flex-1 rounded-lg bg-slate-800 border border-slate-700 p-2.5 flex items-center gap-2 opacity-70">
              <div className="h-7 w-7 rounded-md bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                {initials}
              </div>
              <div>
                <div className="text-[10px] font-semibold text-slate-300">D Profili</div>
                <div className="text-[9px] text-slate-500">Baskın Lider</div>
              </div>
            </div>
          ))}

          <div className="flex flex-col items-center gap-1 shrink-0">
            <ShieldX className="h-7 w-7 text-red-400" aria-hidden />
            <span className="text-[9px] text-red-400 font-bold text-center leading-tight">
              ENGELLENDİ
            </span>
          </div>
        </div>

        <div className="flex items-start gap-1.5 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2">
          <ShieldX className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" aria-hidden />
          <span className="text-[10px] text-red-400 font-medium leading-relaxed">
            <strong>Anti-Toksik Hard-Gate:</strong> İki baskın D profili güç çatışması üretir.
            Sistem bu eşleşmeyi otomatik engeller.
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── AlgorithmBento ───────────────────────────────────────────────────────────

export function AlgorithmBento() {
  return (
    <section id="algorithm" className="bg-slate-950 py-20 sm:py-28 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">

        {/* Bölüm başlığı */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Eşleştirme Motoru
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white text-balance">
            Akıllı Eşleştirmenin İki Bileşeni
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Sadece uzmanlığa değil, insan kimyasına da bak. Bu ikisinin özel ağırlıklı bileşimi
            her eşleşmede çalışır.
          </p>
        </div>

        {/* Bento Grid — sol %60, sağ %40 */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 backdrop-blur">
            <TechnicalBento />
          </div>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 backdrop-blur">
            <PsychometricBento />
          </div>
        </div>

        {/* Oran özeti */}
        <div className="mt-6 flex items-center justify-center gap-0 rounded-xl border border-slate-700/50 bg-slate-900/60 p-4 overflow-hidden">
          <div className="flex-[3] flex items-center gap-3 px-4">
            <div className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400" style={{ width: '100%' }} />
            <span className="text-sm font-bold text-indigo-400 shrink-0">%60 Teknik</span>
          </div>
          <div className="h-8 w-px bg-slate-700 shrink-0" />
          <div className="flex-[2] flex items-center gap-3 px-4">
            <div className="h-3 rounded-full bg-gradient-to-r from-violet-500 to-violet-400" style={{ width: '100%' }} />
            <span className="text-sm font-bold text-violet-400 shrink-0">%40 Psikometrik</span>
          </div>
        </div>
      </div>
    </section>
  );
}
