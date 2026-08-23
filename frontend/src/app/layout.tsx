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
import { Analytics, GtmNoScript } from '@/components/analytics/Analytics';

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
  title: { template: '%s — Mentorluk Platformu', default: 'Mentorluk Platformu' },
  description: 'Mentor-menti eşleştirme platformu',
  verification: { google: 'UW3gmZgvwKpStxVx40lJzmnuCYAO63vU4GWqYqkeTRw' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Analytics />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <GtmNoScript />
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
