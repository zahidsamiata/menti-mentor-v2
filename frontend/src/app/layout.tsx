/**
 * Root layout — Next.js App Router global sarmalayıcı.
 *
 * Provider hiyerarşisi:
 *   AuthProvider           → token, user state
 *     AuthTenantBridge     → login sonrası tenant verisini çeker, TenantProvider'ı besler
 *       {children}
 *
 * AuthTenantBridge, AuthProvider'ın context'ini okur ve içinde TenantProvider'ı yönetir.
 * Bu sayede token hazır olduğunda tenant CSS değişkenleri otomatik enjekte edilir.
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/providers/AuthProvider';
import { AuthTenantBridge } from '@/providers/AuthTenantBridge';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { getSiteUrl } from '@/lib/siteUrl';

/**
 * FOUC önleme: React hidrasyonundan ÖNCE `<html>` üzerine tema class'ını senkron uygula.
 * Kayıtlı tercih yoksa sistemin AÇIK tercihi belirginse light, aksi halde koyu (mevcut görünüm).
 */
const themeInitScript = `(function(){try{var t=localStorage.getItem('mm-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}var r=document.documentElement;r.classList.toggle('dark',t==='dark');r.classList.toggle('light',t==='light');}catch(e){}})();`;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  // F-29: metadataBase → OG/canonical gibi göreli URL'ler mutlak URL'e çözülür.
  metadataBase: new URL(getSiteUrl()),
  title: { template: '%s — Mentorluk Platformu', default: 'Mentorluk Platformu' },
  description: 'Mentor-menti eşleştirme platformu',
  // Y-09: paylaşım (OG/Twitter) meta'sı site geneli — önceden yalnız ana sayfadaydı.
  // ⚠️ Burada BİLİNÇLİ olarak title/description YOK: Next, og/twitter title+description
  // BOŞSA her sayfanın kendi title/description'ını kopyalar (resolve-metadata
  // inheritFromMetadata). Burada sabit başlık verilirse /metodoloji, /kvkk, /login… hepsi
  // ana sayfa başlığıyla paylaşılır.
  // Görseller `app/opengraph-image.tsx` + `app/twitter-image.tsx` dosya konvansiyonundan
  // otomatik eklenir (burada `images` verilmez; verilirse dosya görselini ezer). Alt sayfa
  // `openGraph` tanımlarsa bu nesne sığ olarak DEĞİŞTİRİLİR ve kök görsel düşer.
  openGraph: {
    type:     'website',
    locale:   'tr_TR',
    siteName: 'MentiMentor',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr-TR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <AuthTenantBridge>
              {children}
            </AuthTenantBridge>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
