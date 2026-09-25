/**
 * / — Ana Sayfa (Showroom / Landing Page)
 *
 * Server component. İnteraktif bölümler 'use client' alt bileşenler olarak ayrılmıştır.
 * Navbar, Hero: sunucu tarafı render (SEO avantajı).
 * AlgorithmBento, AdminCockpit: istemci bileşeni (interaktivite için).
 */

import type { Metadata } from 'next';
import Link               from 'next/link';
import { Navbar }         from './_sections/Navbar';
import { HeroSection }    from './_sections/HeroSection';
import { PainSection }    from './_sections/PainSection';
import { EngineSection }  from './_sections/EngineSection';
import { AlgorithmBento } from './_sections/AlgorithmBento';
import { GameSection }    from './_sections/GameSection';
import { AdminCockpit }   from './_sections/AdminCockpit';

export const metadata: Metadata = {
  title: 'MentiMentor — Mentörlük Programınızı Zahmetsizce Yönetin',
  description:
    'Dernekler, vakıflar ve üniversite kulüpleri için DISC mizaç tabanlı, ' +
    'kapalı devre mentörlük platformu. Kurulum 10 dakika, sonsuza kadar ücretsiz.',
  // Y-09: openGraph/twitter (type/locale/siteName/card) kök `layout.tsx`'te. og:title /
  // og:description ve twitter karşılıkları Next tarafından yukarıdaki title/description'dan
  // otomatik doldurulur. Burada `openGraph` tanımlama: kök nesneyi sığ olarak değiştirir ve
  // `opengraph-image` görseli düşer (resolve-metadata mergeStaticMetadata yalnız kök segmentte).
  robots: {
    index:  true,
    follow: true,
  },
};

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PainSection />
        <EngineSection />
        <AlgorithmBento />
        <GameSection />
        <AdminCockpit />

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <footer className="bg-slate-950 border-t border-slate-800 py-10 px-4">
          <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
                <span className="text-[10px] font-black text-white">M²</span>
              </div>
              <span className="text-sm font-bold text-white">
                Menti<span className="text-indigo-400">Mentor</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 text-center">
              © {new Date().getFullYear()} MentiMentor · KVKK uyumlu · Türkiye&apos;de geliştirildi 🇹🇷
            </p>
            {/* Y-06: yasal linkler artık tıklanabilir (önceden ölü <span>'di). */}
            <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-400" aria-label="Yasal bağlantılar">
              <Link href="/gizlilik" className="hover:text-white underline-offset-4 hover:underline">Gizlilik Politikası</Link>
              <span aria-hidden>·</span>
              <Link href="/kvkk" className="hover:text-white underline-offset-4 hover:underline">KVKK</Link>
              <span aria-hidden>·</span>
              <Link href="/terms" className="hover:text-white underline-offset-4 hover:underline">Kullanım Koşulları</Link>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
