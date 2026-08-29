'use client';

/**
 * Platform grup layout + istemci oturum guard'ı (G1-17 keşfi — boşluk kapatma).
 *
 * ⚠️ `(admin)/layout.tsx`'ten FARK — mimari gereği: Platform yöneticisi AuthProvider'da
 * DEĞİLDİR; oturum backend-origin HttpOnly `platform_token` cookie'sindedir (JS okuyamaz,
 * rol claim'i client'ta yoktur). Bu yüzden rol SENKRON okunamaz → oturum, hafif bir platform
 * ucu (`/health`) çağrılarak DOĞRULANIR; 401/403 → `/platform/login`.
 *
 * Bu KABA bir istemci kapısıdır — ASIL yetki BACKEND'de `requirePlatformAdmin` ile zorlanır
 * (bkz. `backend/src/middleware/platformAuth.ts`). Amaç: yetkisiz ziyaretçi platform kabuğunu
 * görmesin + tüm `/platform/*` tek yerden tutarlı korunsun. Frontend middleware ile
 * çözülemez (cross-origin cookie — bkz. `src/middleware.ts`).
 */

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getPlatformHealth } from '@/lib/api/platform';

export default function PlatformLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  // Login sayfası guard'dan MUAF — aksi halde yönlendirme sonsuz döngüye girer.
  const isLoginPage = pathname === '/platform/login';
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isLoginPage) return;
    let active = true;
    (async () => {
      try {
        await getPlatformHealth(); // 401/403 → catch
        if (active) setChecked(true);
      } catch (e) {
        if (!active) return;
        const status = (e as { status?: number }).status;
        if (status === 401 || status === 403) {
          router.replace('/platform/login');
        } else {
          // Ağ/5xx (oturum sorunu değil) → sayfanın kendi hatasını göstermesine izin ver.
          setChecked(true);
        }
      }
    })();
    return () => {
      active = false;
    };
    // pathname'e bağlı DEĞİL: guard mount'ta bir kez koşar; grup içi gezinme yeniden gate'lemez
    // (spinner flicker olmasın). Oturum ortada düşerse sayfaların kendi 401 akışı devreye girer.
  }, [isLoginPage, router]);

  // Doğrulama tamamlanana kadar korunan içerik render EDİLMEZ (platform kabuğu sızmasın).
  if (!isLoginPage && !checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground animate-pulse">Yükleniyor…</p>
      </div>
    );
  }

  return <div className="min-h-screen bg-background text-foreground">{children}</div>;
}
