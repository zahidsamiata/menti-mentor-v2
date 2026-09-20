'use client';

/**
 * Route-segment hata sınırı (Next.js App Router). (W denetimi §4#20)
 *
 * Öncesinde frontend'de HİÇ error boundary yoktu → bir render hatası beyaz ekrana
 * dönüyor, kullanıcıya mesaj gösterilmiyor, hiçbir yerde iz kalmıyordu.
 *
 * - Kullanıcıya anlaşılır, suçlayıcı olmayan Türkçe mesaj + "Tekrar dene" / "Ana sayfaya dön".
 * - Hata AYRINTISI (stack/mesaj) kullanıcıya GÖSTERİLMEZ (KVKK/güvenlik) — yalnız konsola.
 * - Dış hata izleme servisi (Sentry vb.) EKLENMEZ; o ayrı bir PO kararıdır.
 */

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Yalnız konsola — kullanıcıya sızdırılmaz.
    console.error('[error-boundary]', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 border border-destructive/20">
            <AlertTriangle className="h-8 w-8 text-destructive" aria-hidden />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Bir şeyler ters gitti</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Beklenmedik bir sorun oluştu. Bu çoğu zaman geçicidir — tekrar denemek genellikle
            işe yarar. Sürerse lütfen biraz sonra yeniden deneyin.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => reset()} className="gap-2">
            <RotateCcw className="h-4 w-4" aria-hidden />
            Tekrar dene
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" aria-hidden />
              Ana sayfaya dön
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
