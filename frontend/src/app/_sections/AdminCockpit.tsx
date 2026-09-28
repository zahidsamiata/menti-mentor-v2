'use client';

import { useState } from 'react';
import { Settings2, ShieldAlert, BarChart3, X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Haftaık Görüşme Limiti ───────────────────────────────────────────────────

function MeetingLimitControl() {
  const [value, setValue] = useState(2);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-landing-soft">Haftalık Görüşme Limiti</span>
        <span className="text-sm font-extrabold text-indigo-700 dark:text-indigo-300">{value} görüşme / hafta</span>
      </div>
      <input
        type="range"
        min={1}
        max={7}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-2 rounded-full bg-landing-track appearance-none cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:h-5
                   [&::-webkit-slider-thumb]:w-5
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-indigo-500
                   [&::-webkit-slider-thumb]:shadow-lg
                   [&::-webkit-slider-thumb]:shadow-indigo-500/40
                   [&::-webkit-slider-thumb]:cursor-grab"
        aria-label="Haftalık görüşme limiti"
      />
      <div className="flex justify-between text-[10px] text-landing-muted">
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <span key={n} className={n === value ? 'text-indigo-700 dark:text-indigo-300 font-bold' : ''}>{n}</span>
        ))}
      </div>
      <p className="text-[10px] text-landing-muted leading-relaxed">
        Bir menti haftada en fazla <strong className="text-landing-soft">{value}</strong> görüşme
        yapabilir. Fazlası sistematik olarak engellenir.
      </p>
    </div>
  );
}

// ─── Kalite Barajı ────────────────────────────────────────────────────────────

const THRESHOLD_OPTIONS = [
  { value: 30, label: 'Geniş', desc: 'Tüm eşleşmeler görünür' },
  { value: 50, label: 'Dengeli', desc: 'Önerilen ayar (varsayılan)' },
  { value: 70, label: 'Seçici', desc: 'Yalnızca yüksek uyum' },
] as const;

function QualityThreshold() {
  const [selected, setSelected] = useState<30 | 50 | 70>(50);

  return (
    <div className="space-y-3">
      <span className="text-xs font-medium text-landing-soft">Minimum Eşleşme Barajı</span>
      <div className="grid grid-cols-3 gap-2">
        {THRESHOLD_OPTIONS.map(({ value, label, desc }) => (
          <button
            key={value}
            type="button"
            onClick={() => setSelected(value)}
            className={cn(
              'rounded-xl border p-2.5 text-center transition-all text-xs',
              selected === value
                ? 'border-violet-500/50 bg-violet-500/15 text-violet-700 dark:text-violet-300'
                : 'border-landing-border bg-landing-raised/50 text-landing-muted hover:border-landing-muted',
            )}
          >
            <div className="font-extrabold text-base mb-0.5">%{value}</div>
            <div className="font-semibold">{label}</div>
            <div className="text-[9px] mt-0.5 opacity-70">{desc}</div>
          </button>
        ))}
      </div>
      <p className="text-[10px] text-landing-muted leading-relaxed">
        %{selected} altındaki uyum skoruna sahip çiftler birbirini göremez.
        Bu barajın altında kalan üyeler havuzda kalır ama önlere çıkmaz.
      </p>
    </div>
  );
}

// ─── İdari Bloklama Listesi ───────────────────────────────────────────────────

const INITIAL_PAIRS = [
  { id: 1, a: 'Kemal B.', b: 'Selin D.', reason: 'Kurumsal çatışma' },
  { id: 2, a: 'Tarık Y.', b: 'Aylin M.', reason: 'Yönetici kararı'  },
];

function BlockList() {
  const [pairs, setPairs] = useState(INITIAL_PAIRS);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-landing-soft">Kara Liste / Engelli Çiftler</span>
        <span className="text-[10px] text-landing-muted">{pairs.length} kayıt</span>
      </div>
      <div className="space-y-2">
        {pairs.map(({ id, a, b, reason }) => (
          <div
            key={id}
            className="flex items-center gap-2 rounded-lg border border-red-500/15 bg-red-500/5 px-3 py-2"
          >
            <ShieldAlert className="h-3.5 w-3.5 text-red-700 dark:text-red-400 shrink-0" aria-hidden />
            <div className="flex-1 min-w-0">
              <span className="text-xs text-landing-soft font-medium">{a}</span>
              <span className="text-xs text-landing-muted mx-1">↔</span>
              <span className="text-xs text-landing-soft font-medium">{b}</span>
              <span className="text-[10px] text-landing-muted ml-2">· {reason}</span>
            </div>
            <button
              type="button"
              onClick={() => setPairs((p) => p.filter((x) => x.id !== id))}
              className="text-landing-muted hover:text-red-700 dark:hover:text-red-400 transition-colors shrink-0"
              aria-label={`${a} - ${b} engelini kaldır`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPairs((p) => [...p, { id: Date.now(), a: 'Yeni A.', b: 'Yeni B.', reason: 'Eklendi' }])}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-landing-border py-2 text-xs text-landing-muted hover:border-landing-muted hover:text-landing-soft transition-colors"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden />
        Yeni çift ekle
      </button>
    </div>
  );
}

// ─── AdminCockpit ─────────────────────────────────────────────────────────────

export function AdminCockpit() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-landing-bg">
      <div className="mx-auto max-w-6xl">

        {/* Bölüm başlığı */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
            Dernek Yöneticisi Kokpiti
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-landing-fg text-balance">
            Kurumunuzu Kod Yazmadan Özelleştirin
          </h2>
          <p className="mt-3 text-landing-muted max-w-lg mx-auto text-sm">
            Program kurallarını, eşleşme limitlerini ve acil müdahaleleri tam kontrol altında tutun.
          </p>
        </div>

        {/* Kokpit Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Görüşme Limiti */}
          <div className="rounded-2xl border border-landing-border/50 bg-landing-surface/80 p-5 backdrop-blur">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20">
                <Settings2 className="h-4 w-4 text-indigo-700 dark:text-indigo-300" aria-hidden />
              </div>
              <span className="text-sm font-bold text-landing-fg">Görüşme Yönetimi</span>
            </div>
            <MeetingLimitControl />
          </div>

          {/* Kalite Barajı */}
          <div className="rounded-2xl border border-landing-border/50 bg-landing-surface/80 p-5 backdrop-blur">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20">
                <BarChart3 className="h-4 w-4 text-violet-700 dark:text-violet-400" aria-hidden />
              </div>
              <span className="text-sm font-bold text-landing-fg">Kalite Barajı</span>
            </div>
            <QualityThreshold />
          </div>

          {/* Kara Liste */}
          <div className="rounded-2xl border border-landing-border/50 bg-landing-surface/80 p-5 backdrop-blur">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/20">
                <ShieldAlert className="h-4 w-4 text-red-700 dark:text-red-400" aria-hidden />
              </div>
              <span className="text-sm font-bold text-landing-fg">İdari Override</span>
            </div>
            <BlockList />
          </div>

        </div>

        {/* Alt açıklama */}
        <p className="mt-6 text-center text-xs text-landing-muted">
          Tüm ayarlar anlık geçerli olur · API anahtarı veya teknik bilgi gerektirmez ·
          <strong className="text-landing-muted"> KVKK uyumlu</strong>
        </p>
      </div>
    </section>
  );
}
