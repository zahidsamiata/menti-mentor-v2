import Link from 'next/link';
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SOCIAL_PROOF = [
  { icon: Users,  label: 'Aktif Kurum',   value: '120+' },
  { icon: Zap,    label: 'Eşleşme',       value: '3.400+' },
  { icon: Shield, label: 'Engellenen Toksik Eşleşme', value: '890+' },
] as const;

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950 pt-16">

      {/* ── Arka plan parlamaları ─────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-indigo-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-indigo-400/8 blur-3xl" />
        {/* Izgara desen */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ── İçerik ────────────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">

        {/* Üst rozet */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400" />
          </span>
          Self-Serve · Kurulum 10 dk · Sonsuza kadar ücretsiz
        </div>

        {/* Ana başlık */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
          Ağınızı Sadece{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
            Takvimle Değil,
          </span>
          <br />
          İnsan Kimyasıyla Yönetin.
        </h1>

        {/* Alt başlık */}
        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed text-balance">
          Dernekler, STK&apos;lar ve üniversite kulüpleri için kapalı devre,{' '}
          <strong className="text-slate-200 font-semibold">bilimsel mizaç tabanlı</strong>{' '}
          akıllı mentörlük altyapısı. Kurulum sadece 10 dakika,{' '}
          <strong className="text-slate-200 font-semibold">sonsuza kadar ücretsiz.</strong>
        </p>

        {/* CTA butonları */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="h-12 px-8 text-base bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 border-0 text-white shadow-xl shadow-indigo-500/30 gap-2"
          >
            <Link href="/onboarding/stk">
              Kurumunu Ücretsiz Kur
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg"
            className="h-12 px-8 text-base border-white/20 text-slate-300 bg-transparent hover:bg-white/5 hover:text-white hover:border-white/30"
          >
            <Link href="#algorithm">Nasıl Çalışır?</Link>
          </Button>
        </div>

        {/* Sosyal kanıt sayaçları */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
          {SOCIAL_PROOF.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-indigo-400" aria-hidden />
                <span className="text-2xl font-extrabold text-white">{value}</span>
              </div>
              <span className="text-xs text-slate-500">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Aşağı kaydır oku ─────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-8 w-5 rounded-full border-2 border-slate-600 flex items-start justify-center p-1">
          <div className="h-1.5 w-1 rounded-full bg-slate-400" />
        </div>
      </div>
    </section>
  );
}
