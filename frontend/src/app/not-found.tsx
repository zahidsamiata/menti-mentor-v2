/**
 * 404 — Sayfa bulunamadı (Next.js App Router). (W denetimi §4#20)
 *
 * Öncesinde `not-found.tsx` yoktu → bilinmeyen adresler Next.js'in çıplak varsayılan
 * 404'üne düşüyordu. Bu ekran anlaşılır Türkçe mesaj + ana sayfaya dönüş sağlar.
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
            <Compass className="h-8 w-8 text-primary" aria-hidden />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Sayfa bulunamadı</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Aradığınız sayfa taşınmış veya hiç var olmamış olabilir. Adresi kontrol edebilir
            ya da ana sayfaya dönebilirsiniz.
          </p>
        </div>

        <Button asChild className="gap-2">
          <Link href="/">
            <Home className="h-4 w-4" aria-hidden />
            Ana sayfaya dön
          </Link>
        </Button>
      </div>
    </div>
  );
}
