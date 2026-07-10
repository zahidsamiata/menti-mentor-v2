import Link from 'next/link';
import { Briefcase, Brain, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DISC_TYPES = [
  { dim: 'D', label: 'Öncü',      color: 'text-orange-400',  bg: 'bg-orange-500/10',  border: 'border-orange-500/20', desc: 'Kararlı, hızlı, sonuç odaklı' },
  { dim: 'I', label: 'Ateşleyici', color: 'text-yellow-400', bg: 'bg-yellow-500/10',  border: 'border-yellow-500/20', desc: 'İlham veren, sosyal, enerjik' },
  { dim: 'S', label: 'Yapı Taşı', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', desc: 'Güvenilir, sabırlı, uyumlu' },
  { dim: 'C', label: 'Kâşif',     color: 'text-sky-400',     bg: 'bg-sky-500/10',     border: 'border-sky-500/20',    desc: 'Analitik, titiz, derinlikli' },
] as const;

export function EngineSection() {
  return (
    <section id="algorithm" className="bg-slate-950 py-24 px-4 border-t border-white/5">
      <div className="mx-auto max-w-5xl">

        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
            Eşleştirme Motoru
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Sadece takvime değil,{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              insan kimyasına
            </span>{' '}
            bak.
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            İki boyutlu bilimsel skor: kim kiminle çalışır, kim çatışır?
          </p>
        </div>

        {/* ── Ağırlık göstergesi ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">

          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20">
                <Briefcase className="h-5 w-5 text-indigo-400" aria-hidden />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">%60</p>
                <p className="text-sm font-semibold text-indigo-400">Sektör Uyumu</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Mentor ve mentinin sektör etiketleri Jaccard benzerliğiyle karşılaştırılır.
              Ortak alan yoksa skor sıfır — güçlü alan örtüşmesi doğrudan transfer sağlar.
            </p>
          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20">
                <Brain className="h-5 w-5 text-violet-400" aria-hidden />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">%40</p>
                <p className="text-sm font-semibold text-violet-400">DISC Mizaç Uyumu</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              4 boyutlu psikometrik matris — tamamlayıcı profiller yüksek sinerji üretir.
              Çatışan profiller (ör. D↔D) hard-gate ile otomatik engellenir, not düşürülmez.
            </p>
          </div>
        </div>

        {/* ── DISC kartları ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {DISC_TYPES.map(({ dim, label, color, bg, border, desc }) => (
            <div key={dim} className={`rounded-xl border ${border} ${bg} p-4 text-center`}>
              <p className={`text-3xl font-black ${color} mb-1`}>{dim}</p>
              <p className="text-sm font-bold text-white">{label}</p>
              <p className="text-xs text-slate-500 mt-1 leading-snug">{desc}</p>
            </div>
          ))}
        </div>

        {/* ── Hard-gate notu ────────────────────────────────────────────────── */}
        <div className="rounded-xl border border-rose-500/20 bg-rose-950/15 p-4 mb-10 text-sm text-slate-400 leading-relaxed text-center">
          <span className="font-semibold text-rose-400">Toksik eşleşme koruması:</span>{' '}
          Belirli DISC kombinasyonları (örn. iki yüksek D profili) mentorluk bağlamında sistematik
          çatışma üretir. Bu çiftler algoritmik hard-gate ile eşleştirme havuzundan tamamen çıkarılır —
          skor düşürme değil, tam engelleme.
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 border-0 text-white shadow-xl shadow-indigo-500/25"
          >
            <Link href="/onboarding/stk">
              10 Dakikada Derneğini Kur
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
