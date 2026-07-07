/**
 * / — Ana Sayfa (Showroom / Landing Page)
 *
 * Server component. İnteraktif bölümler 'use client' alt bileşenler olarak ayrılmıştır.
 * Navbar, Hero: sunucu tarafı render (SEO avantajı).
 * AlgorithmBento, AdminCockpit: istemci bileşeni (interaktivite için).
 */

import type { Metadata } from 'next';
import { Navbar }         from './_sections/Navbar';
import { HeroSection }    from './_sections/HeroSection';
import { PainSection }    from './_sections/PainSection';
import { EngineSection }  from './_sections/EngineSection';
import { AlgorithmBento } from './_sections/AlgorithmBento';
import { GameSection }    from './_sections/GameSection';
import { AdminCockpit }   from './_sections/AdminCockpit';

export const metadata: Metadata = {
  title: 'MentiMentor — İnsan Kimyasıyla Akıllı Mentörlük',
  description:
    'Dernekler, STK\'lar ve üniversite kulüpleri için DISC mizaç tabanlı, ' +
    'kapalı devre mentörlük platformu. Kurulum 10 dakika, sonsuza kadar ücretsiz.',
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
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span>Gizlilik Politikası</span>
              <span>·</span>
              <span>Kullanım Koşulları</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
