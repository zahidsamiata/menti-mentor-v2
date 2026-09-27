import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/molecules/SiteFooter';

/**
 * AJ-25 (Y-06 kalanı) — herkese açık (oturumsuz) sayfaların ortak kabuğu.
 *
 * Neden: `SiteFooter` yalnız gizlilik/kvkk/terms sayfalarına tek tek takılmıştı; giriş, şifremi
 * unuttum, metodoloji, bildir, davet (join), onay bekleme ve kurum kaydı sayfalarının altından
 * KVKK aydınlatma metnine gidilemiyordu. Sayfalara tek tek eklemek yerine ilgili segmentlerin
 * `layout.tsx`'i bu kabuğu kullanır → yeni sayfa o segmente eklenince alt bilgi kendiliğinden gelir.
 * Kapsam testi: `src/__tests__/public-legal-footer.test.tsx`.
 */
export function PublicPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
