import { X, CheckCircle2 } from 'lucide-react';

const BEFORE = [
  "Spreadsheet'ta kim kimle eşleşti takip etmek",
  "WhatsApp grubuna mentor duyurusu atıp beklemek",
  "Yanlış kişiyi eşleştirip çakışmaları çözmek",
  "Kim kaç görüşme yaptı bilmemek",
  '"Neden çalışmadı?" sorusuna veri olmadan cevap aramamak',
];

const AFTER = [
  'Bir tıkla DISC + sektör tabanlı akıllı eşleştirme',
  'Toksik çiftler sistemin kendisi engeller',
  'Yönetici paneli tüm programı tek ekranda gösterir',
  'Her eşleşmenin ilerleme takibi otomatik',
  'Veriyle desteklenen "neden çalıştı" raporları',
];

export function PainSection() {
  return (
    <section className="bg-slate-950 py-24 px-4 border-t border-white/5">
      <div className="mx-auto max-w-5xl">

        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
            Tanıyor musunuz?
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Mentörlük programlarının{' '}
            <span className="text-rose-400">%67'si</span>
            {' '}başladığı gibi bitmez.
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Sorun motivasyon eksikliği değil. Sorun, eşleştirmeyi elle yapıyor olmanız.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ── Öncesi ──────────────────────────────────────────────────── */}
          <div className="rounded-2xl border border-rose-500/20 bg-rose-950/20 p-6">
            <p className="text-sm font-bold text-rose-400 mb-5 flex items-center gap-2">
              <X className="h-4 w-4" aria-hidden />
              Klasik Program Yönetimi
            </p>
            <ul className="space-y-3">
              {BEFORE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                  <X className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Sonrası ─────────────────────────────────────────────────── */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/15 p-6">
            <p className="text-sm font-bold text-emerald-400 mb-5 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" aria-hidden />
              MentiMentor ile
            </p>
            <ul className="space-y-3">
              {AFTER.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
