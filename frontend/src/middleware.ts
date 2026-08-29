import { NextResponse, type NextRequest } from 'next/server';

/**
 * Next.js Edge Middleware.
 *
 * ── G7-04 — www → apex kalıcı (301) yönlendirme (SEO kanonikleştirme) ────────────
 * `www.sivilkapasite.org` → `sivilkapasite.org` (301, yol + query KORUNUR). Yalnız host
 * tabanlı; apex/localhost/preview host'ları DOKUNULMAZ (sonsuz döngü + yerel geliştirme
 * koruması — apex zaten apex ise yönlendirme YOK).
 *
 * ── ⚠️ G1-17 (admin/platform sayfa server-guard'ı) BU DOSYADA YOK — BİLİNÇLİ ─────
 * Frontend middleware ile ÇÖZÜLEMEZ: auth cookie'leri backend origin'inde
 * (`api.sivilkapasite.org`) set edilir; frontend origin'i (`sivilkapasite.org`) bunları
 * ALMAZ (parent domain paylaşımı yok, SameSite=Strict) → middleware token/rol OKUYAMAZ.
 * access token zaten yalnız bellekte (React state). Dolayısıyla burada güvenilir bir rol
 * kontrolü yapılamaz; JS-yazılabilir bir "rol cookie'si" ise sahte güven verir (devtools'tan
 * atlanır) — korumasız olmaktan tehlikeli, o yüzden EKLENMEDİ.
 * ASIL koruma BACKEND yetki denetimidir (`requireRole` / `requirePlatformAdmin`). Frontend'de
 * rol-gating client layout guard'larındadır (kaba kapı). G1-17 → **Faz 3b** (admin/platform
 * endpoint yetki denetimi; G1-23 ailesi). Ayrıntı: `docs/kararlar/00-KARAR-TAKIP.md` (G1-17).
 */

const WWW_HOST = 'www.sivilkapasite.org';
const APEX_HOST = 'sivilkapasite.org';

export function middleware(req: NextRequest): NextResponse {
  // Host, port içerebilir ("host:port") — yalnız hostname'i büyük/küçük harf duyarsız kıyasla.
  const hostname = (req.headers.get('host') ?? '').split(':')[0].toLowerCase();

  if (hostname === WWW_HOST) {
    const url = req.nextUrl.clone(); // pathname + search bu klonda korunur
    url.protocol = 'https:';
    url.hostname = APEX_HOST;
    url.port = '';
    return NextResponse.redirect(url, 301); // 301 = kalıcı (SEO); varsayılan 307 değil
  }

  return NextResponse.next();
}

export const config = {
  // Dar matcher: statik dosyalar (uzantılı), `_next/` ve `api/` middleware'den MUAF.
  // Yalnız sayfa istekleri değerlendirilir (www→apex redirect için yeterli).
  matcher: ['/((?!_next/|api/|.*\\..*).*)'],
};
