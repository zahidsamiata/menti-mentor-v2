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

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { template: '%s — Mentorluk Platformu', default: 'Mentorluk Platformu' },
  description: 'Mentor-menti eşleştirme platformu',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <AuthTenantBridge>
            {children}
          </AuthTenantBridge>
        </AuthProvider>
      </body>
    </html>
  );
}
