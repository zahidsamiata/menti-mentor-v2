import { Trophy, Star, Flame, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── CORE Soru Kartları ───────────────────────────────────────────────────────

const SAMPLE_QUESTION = {
  text: 'Grup projesinde genellikle ne yaparsın?',
  options: [
    { letter: 'A', text: 'Liderliği üstlenir, hızlıca hedef koyarım',    color: 'border-violet-500/40 bg-violet-500/10 text-violet-300' },
    { letter: 'B', text: 'Ekibi motive eder, enerji katarım',              color: 'border-blue-500/40   bg-blue-500/10   text-blue-300'   },
    { letter: 'C', text: 'Grubun ihtiyaçlarını destekler, uyum sağlarım', color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
    { letter: 'D', text: 'Planı analiz eder, en doğru kararı veririm',    color: 'border-amber-500/40  bg-amber-500/10  text-amber-300'  },
  ],
};

const ARCHETYPES = [
  { icon: '🦅', name: 'Öncü',        dim: 'D', color: 'from-violet-600 to-indigo-700'  },
  { icon: '🔥', name: 'Ateşleyici',  dim: 'I', color: 'from-rose-600 to-orange-700'    },
  { icon: '🌿', name: 'Yapı Taşı',   dim: 'S', color: 'from-emerald-600 to-teal-700'   },
  { icon: '🧭', name: 'Kâşif',       dim: 'C', color: 'from-amber-600 to-yellow-700'   },
];

function CoreQuestions() {
  return (
    <div className="flex flex-col gap-6">
      {/* Progress header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-slate-300">Mizaç Testi</span>
          <span className="text-slate-500">Soru <strong className="text-white">3</strong> / 8</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full w-[37.5%] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
        </div>
      </div>

      {/* Senaryo sorusu */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
        <p className="text-sm font-semibold text-white leading-relaxed">{SAMPLE_QUESTION.text}</p>
      </div>

      {/* Seçenekler */}
      <div className="space-y-2.5">
        {SAMPLE_QUESTION.options.map(({ letter, text }, i) => (
          <div
            key={letter}
            className={cn(
              'flex items-start gap-3 rounded-xl border-2 p-3.5 transition-all',
              i === 1
                ? 'border-blue-500/70 bg-blue-500/15 shadow-md shadow-blue-500/10' // "seçili" gösterge
                : 'border-slate-700/50 bg-slate-800/40',
            )}
          >
            <span className={cn(
              'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold',
              i === 1 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400',
            )}>
              {letter}
            </span>
            <span className={cn('text-xs leading-relaxed', i === 1 ? 'text-blue-200' : 'text-slate-400')}>
              {text}
            </span>
          </div>
        ))}
      </div>

      {/* Arketip ödül kartları */}
      <div>
        <p className="text-xs text-slate-500 mb-3 text-center">Test bittiğinde kazanacağın arketip:</p>
        <div className="grid grid-cols-4 gap-2">
          {ARCHETYPES.map(({ icon, name, dim, color }) => (
            <div
              key={dim}
              className={cn(
                'rounded-xl bg-gradient-to-b p-3 text-center',
                color,
                dim === 'I' ? 'ring-2 ring-white/40 scale-105 shadow-lg' : 'opacity-60',
              )}
            >
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-[10px] font-bold text-white">{name}</div>
              <div className="text-[9px] text-white/70">{dim} Tipi</div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-[10px] text-slate-500">
          Bu kullanıcı → <strong className="text-blue-400">🔥 Ateşleyici</strong> kazanıyor
        </p>
      </div>
    </div>
  );
}

// ─── Sürekli Gelişim Timeline ─────────────────────────────────────────────────

const TIMELINE_EVENTS = [
  {
    day:    'Gün 1',
    label:  'CORE Test Tamamlandı',
    badge:  '🧭 Kâşif Rozeti',
    color:  'bg-indigo-500',
    done:   true,
  },
  {
    day:    'Gün 7',
    label:  '5 Derinleştirici Soru',
    badge:  '🔥 Seri: 7 Gün',
    color:  'bg-violet-500',
    done:   true,
  },
  {
    day:    'Gün 14',
    label:  'İlk Eşleşme Toplantısı',
    badge:  '⭐ Mentör Onayı',
    color:  'bg-emerald-500',
    done:   true,
  },
  {
    day:    'Gün 30',
    label:  'Aylık İlerleme Sorusu',
    badge:  '🏆 Altın Rozet',
    color:  'bg-amber-500',
    done:   false,
  },
] as const;

function GrowthTimeline() {
  return (
    <div className="relative">
      {/* Dikey çizgi */}
      <div className="absolute left-4 top-3 bottom-3 w-0.5 bg-gradient-to-b from-indigo-500 via-violet-500 to-slate-700" aria-hidden />

      <div className="space-y-6">
        {TIMELINE_EVENTS.map(({ day, label, badge, color, done }) => (
          <div key={day} className="flex items-start gap-4 pl-10 relative">
            {/* Nokta */}
            <div className={cn(
              'absolute left-0 top-1 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-lg',
              done ? color : 'bg-slate-700 border-2 border-slate-600',
            )}>
              {done ? '✓' : '?'}
            </div>

            {/* İçerik */}
            <div className={cn(
              'flex-1 rounded-xl border p-3.5 transition-all',
              done
                ? 'border-slate-700 bg-slate-800/60'
                : 'border-dashed border-slate-700/40 bg-slate-800/20 opacity-60',
            )}>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs text-slate-500 font-medium">{day}</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{label}</p>
                </div>
                <span className="shrink-0 rounded-full bg-slate-700/80 px-2.5 py-1 text-xs font-medium text-slate-300">
                  {badge}
                </span>
              </div>
              {done && (
                <div className="mt-2 flex items-center gap-1.5">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" aria-hidden />
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" aria-hidden />
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" aria-hidden />
                  <span className="text-[10px] text-slate-500 ml-1">Asla geriye düşmez (Monotonic)</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── GameSection ──────────────────────────────────────────────────────────────

export function GameSection() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="mx-auto max-w-6xl">

        {/* Bölüm başlığı */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
            Oyunlaştırılmış Profilleme
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white text-balance">
            Anket Değil, Oyun. Bekle Değil, Kazan.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CORE Sorular */}
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 backdrop-blur">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20">
                <Flame className="h-5 w-5 text-indigo-400" aria-hidden />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">CORE Sorular</h3>
                <p className="text-xs text-slate-500">İlk 90 Saniye · 8 Senaryo · Anında Ödül</p>
              </div>
            </div>
            <CoreQuestions />
          </div>

          {/* Timeline */}
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 backdrop-blur">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20">
                <Trophy className="h-5 w-5 text-amber-400" aria-hidden />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Sürekli Gelişim</h3>
                <p className="text-xs text-slate-500">Monotonic İlerleme · Streak & Rozetler</p>
              </div>
            </div>
            <GrowthTimeline />
            {/* Alt not */}
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-slate-800/60 px-3 py-2.5">
              <ChevronRight className="h-4 w-4 text-indigo-400 shrink-0" aria-hidden />
              <p className="text-xs text-slate-400 leading-snug">
                Derinleştirici sorular DISC vektörünü zenginleştirir. Hiçbir cevap önceki skoru
                <strong className="text-white"> düşüremez</strong> — sadece gelişim vardır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
