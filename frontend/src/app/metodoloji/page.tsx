import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Metodoloji — MentiMentor Nasıl Eşleştirir?',
  description:
    'MentiMentor eşleştirme metodolojisi: uyuma göre eşleştirmenin araştırma temeli, '
    + 'DISC modelinin dürüst konumlandırılması, eşleşme matrisi ve Jaccard sektör uyumu.',
};

/** Kaynak künyesi: url varsa link, yoksa düz metin. */
function Citation({ label, url }: { label: string; url?: string }) {
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-400 hover:text-indigo-300 hover:underline"
      >
        {label}
      </a>
    );
  }
  return <span className="text-slate-400">{label}</span>;
}

/** Bir bölümün altındaki künye listesi. */
function Sources({ items }: { items: Array<{ label: string; url?: string }> }) {
  return (
    <div className="mt-4 border-t border-white/10 pt-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
        Kaynaklar
      </p>
      <ul className="space-y-1 text-xs leading-relaxed">
        {items.map((s) => (
          <li key={s.label}>
            <Citation label={s.label} url={s.url} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const COMPLEMENTARY = [
  { pair: 'D + S', desc: 'hız + istikrar, en tamamlayıcı çiftlerden biri' },
  { pair: 'D + C', desc: 'sonuç odaklı, güçlü (tempo farkı yönetilmeli)' },
  { pair: 'I + C', desc: 'zıtlar çeker, iyi anlaşmayla verimli' },
] as const;

const CONFLICT = [
  { pair: 'D + D', desc: 'görev/kontrol çatışması eğilimi' },
  { pair: 'C + C', desc: 'doğruluk konusunda rekabet' },
  { pair: 'I + I', desc: 'sosyal uyum yüksek, görev veriminde düşük' },
] as const;

export default function MetodolojiPage() {
  return (
    <main className="min-h-screen bg-slate-950 py-16 px-4">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Ana sayfaya dön
        </Link>

        <header className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
            Metodoloji
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            MentiMentor nasıl eşleştirir?
          </h1>
          <p className="mt-4 text-slate-400 leading-relaxed">
            Eşleştirme motorumuzun dayandığı ilkeleri, hangi araçları neden kullandığımızı ve
            bunların bilimsel temelini olduğu gibi paylaşıyoruz — abartmadan, kaynağıyla.
          </p>
        </header>

        <div className="space-y-14">

          {/* ── Bölüm 1 ─────────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4">
              1. Neden uyuma göre eşleştirme?
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Mentorluğun başarısını belirleyen tek en güçlü faktör ilişkinin kalitesidir; ilişki
              kalitesini belirleyen en güçlü faktör ise eşleşmenin uyumudur. Araştırmalar, mentör ve
              mentiyi ilgi ve uyuma göre eşleştiren programlarda etkinin belirgin şekilde arttığını;
              yüzeysel/demografik benzerlik yerine değer, tarz ve kişilikteki &lsquo;derin
              düzey&rsquo; benzerliğin daha güçlü bir belirleyici olduğunu gösteriyor. MentiMentor bu
              nedenle eşleştirmeyi rastgele ya da elle değil, çok boyutlu uyum sinyallerine göre yapar.
            </p>
            <Sources
              items={[
                {
                  label:
                    'DuBois, D.L., Portillo, N., Rhodes, J.E., Silverthorn, N., & Valentine, J.C. (2011). How Effective Are Mentoring Programs for Youth? Psychological Science in the Public Interest, 12(2), 57-91.',
                  url: 'https://journals.sagepub.com/doi/abs/10.1177/1529100611414806',
                },
                {
                  label:
                    'Eby, L.T., et al. (2013). An interdisciplinary meta-analysis of protégé perceptions of mentoring. Psychological Bulletin.',
                },
              ]}
            />
          </section>

          {/* ── Bölüm 2 ─────────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4">
              2. DISC nedir, neden ve nasıl kullanıyoruz?
            </h2>
            <p className="text-slate-300 leading-relaxed">
              DISC, davranış tarzlarını dört boyutta tanımlayan bir modeldir: Dominance (Baskınlık),
              Influence (Etki), Steadiness (İstikrar), Conscientiousness (Titizlik). Temeli psikolog
              William Moulton Marston&rsquo;ın 1928 tarihli &lsquo;Emotions of Normal People&rsquo;
              kitabına dayanır. DISC güvenilir bir araçtır (aynı kişi zaman içinde tutarlı sonuç
              alır), ancak bir iletişim ve tarz aracıdır — kişilik tanısı ya da performans kehaneti
              aracı değildir. MentiMentor&rsquo;da DISC, uyum sinyallerinden biri olarak tarz uyumunu
              değerlendirmek için kullanılır; tek başına başarı garantisi olarak sunulmaz.
            </p>
            <Sources
              items={[
                { label: 'Marston, W.M. (1928). Emotions of Normal People.' },
                {
                  label:
                    'DISC assessment — Wikipedia (güvenilirlik yüksek, performans tahmini için tasarlanmamış)',
                  url: 'https://en.wikipedia.org/wiki/DISC_assessment',
                },
              ]}
            />
          </section>

          {/* ── Bölüm 3 — Eşleşme matrisi ──────────────────────────────── */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4">
              3. Eşleşme matrisi
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Aşağıdaki eğilimler, DISC uygulama pratiğinde yaygın gözlemlere dayanır. Kesin bir
              başarı garantisi değil; eşleşme kalitesini artırmayı amaçlayan olasılıksal bir
              rehberdir ve sistem gerçek geri bildirimle sürekli kalibre edilir.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tamamlayıcı */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/15 p-5">
                <p className="flex items-center gap-2 text-sm font-bold text-emerald-400 mb-4">
                  <CheckCircle2 className="h-4 w-4" aria-hidden />
                  Tamamlayıcı (yüksek uyum)
                </p>
                <ul className="space-y-3">
                  {COMPLEMENTARY.map(({ pair, desc }) => (
                    <li key={pair} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden />
                      <span className="text-sm text-slate-300">
                        <span className="font-bold text-white">{pair}</span> : {desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Çatışma riski */}
              <div className="rounded-2xl border border-rose-500/20 bg-rose-950/15 p-5">
                <p className="flex items-center gap-2 text-sm font-bold text-rose-400 mb-4">
                  <XCircle className="h-4 w-4" aria-hidden />
                  Çatışma riski (dikkat)
                </p>
                <ul className="space-y-3">
                  {CONFLICT.map(({ pair, desc }) => (
                    <li key={pair} className="flex items-start gap-3">
                      <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" aria-hidden />
                      <span className="text-sm text-slate-300">
                        <span className="font-bold text-white">{pair}</span> : {desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Sources
              items={[
                {
                  label:
                    'Assessments 24x7 — DISC Styles and Task Compatibility (DISC danışmanlık pratiği; akademik kanıt değil)',
                  url: 'https://blog.assessments24x7.com/disc-styles/',
                },
                {
                  label:
                    'Crystal — DISC D+D / D+S relationship guides (DISC danışmanlık pratiği; akademik kanıt değil)',
                  url: 'https://www.crystalknows.com/disc/d-d-relationship',
                },
              ]}
            />
          </section>

          {/* ── Bölüm 4 — Jaccard ──────────────────────────────────────── */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4">
              4. Sektör/alan uyumu (Jaccard) nasıl hesaplanıyor?
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Mentör ve mentinin sektör/alan etiketlerinin ne kadar örtüştüğü, Jaccard benzerlik
              katsayısı ile ölçülür: ortak etiket sayısı, toplam benzersiz etiket sayısına bölünür ve
              0-1 arası bir değer verir. 0 = hiç ortak alan yok, 1 = etiketler tamamen aynı. Formül:{' '}
              <code className="rounded bg-white/5 px-1.5 py-0.5 text-violet-300">
                J(A,B) = |A ∩ B| / |A ∪ B|
              </code>
              . Yöntem ilk kez Paul Jaccard tarafından 1901&rsquo;de tanımlanmıştır.
            </p>
            <Sources
              items={[
                {
                  label: 'Jaccard index — Wikipedia',
                  url: 'https://en.wikipedia.org/wiki/Jaccard_index',
                },
              ]}
            />
          </section>

          {/* ── Bölüm 5 — Çatışma engelleme ────────────────────────────── */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4">
              5. Çatışma riskli eşleşmelerin engellenmesi
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Belirli DISC kombinasyonları (örneğin iki yüksek baskınlık profili) görev ve kontrol
              bağlamında güç çatışması eğilimi gösterebilir. MentiMentor bu tür yüksek riskli
              kombinasyonları eşleştirme havuzundan çıkarır. Bu, kanıtlanmış bir kesinlik değil;
              uygulama gözlemine dayalı bir risk azaltma tercihidir ve sistem geri bildirimiyle
              güncellenir.
            </p>
            <Sources
              items={[
                {
                  label: 'Assessments 24x7 — DISC Styles and Task Compatibility',
                  url: 'https://blog.assessments24x7.com/disc-styles/',
                },
                {
                  label: 'Crystal — DISC D+D relationship guide',
                  url: 'https://www.crystalknows.com/disc/d-d-relationship',
                },
              ]}
            />
          </section>

        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 text-center">
          <p className="text-slate-300 mb-4">
            Kurumunuz için 10 dakikada kurun, ilk eşleşmenizi görün.
          </p>
          <Link
            href="/onboarding/stk"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-400 hover:to-violet-500 transition-colors"
          >
            Kurumunu Ücretsiz Kur
          </Link>
        </div>

      </div>
    </main>
  );
}
