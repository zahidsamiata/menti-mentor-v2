/**
 * Y-09 — Site simgesi ve paylaşım görseli (Open Graph / Twitter) için ortak marka öğeleri.
 *
 * `app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx` ve `app/twitter-image.tsx`
 * bu modülü kullanır; görseller Next.js dosya konvansiyonuyla `next/og` `ImageResponse`
 * üzerinden build sırasında üretilir (ek bağımlılık / statik PNG dosyası yok).
 *
 * Marka öğeleri koddaki mevcut kaynaklardan alınmıştır — yenisi uydurulmadı:
 *  · Logo "M²" rozeti + indigo-500 → violet-600 gradyanı: `app/page.tsx` footer ve Navbar.
 *  · Zemin slate-950, vurgu indigo-400: `app/_sections/HeroSection.tsx`.
 *  · Slogan: Hero başlığı; alt satır: ana sayfa metadata açıklaması.
 *
 * ⚠️ FONT KISITI: `ImageResponse`'ın gömülü varsayılan fontu (Noto Sans, "latin" alt kümesi)
 * ğ/Ğ, ş/Ş ve İ glif'lerini İÇERMİYOR (ı, ö, ü, ç VAR). Eksik glif'te satori çalışma anında
 * Google Fonts'tan font indirmeye çalışır — ağ bağımlılığı istemiyoruz. Bu yüzden görsellerdeki
 * metinler bu harfleri içermeyecek şekilde seçildi; `brand-image.test.ts` bunu bekçi olarak
 * doğrular. Metin değiştirirken bu harflerden kaçının (ya da yerel bir TTF gömün).
 */

/** Varsayılan OG fontunda (Noto Sans latin) bulunmayan Türkçe harfler. */
export const UNSUPPORTED_OG_GLYPHS = ['ğ', 'Ğ', 'ş', 'Ş', 'İ'] as const;

/** Görsel metni varsayılan fontla eksiksiz çizilebilir mi? */
export function isOgSafeText(text: string): boolean {
  return !UNSUPPORTED_OG_GLYPHS.some((glyph) => text.includes(glyph));
}

export const BRAND_COLORS = {
  background: '#020617', // slate-950
  gradientFrom: '#6366f1', // indigo-500 (= globals.css --primary varsayılanı)
  gradientTo: '#7c3aed', // violet-600
  accent: '#818cf8', // indigo-400
  text: '#ffffff',
  muted: '#94a3b8', // slate-400
} as const;

export const BRAND_TEXT = {
  logoMark: 'M²',
  namePrefix: 'Menti',
  nameSuffix: 'Mentor',
  slogan: 'Mentörlük programınızı zahmetsizce yönetin',
  tagline: 'DISC mizaç tabanlı mentörlük platformu',
} as const;

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const OG_IMAGE_ALT = `${BRAND_TEXT.namePrefix}${BRAND_TEXT.nameSuffix} — ${BRAND_TEXT.slogan}`;

/** Kare "M²" rozeti — sekme simgesi ve apple-touch-icon. `size` px cinsinden kenar uzunluğu. */
export function BrandMark({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Math.round(size * 0.22),
        backgroundImage: `linear-gradient(135deg, ${BRAND_COLORS.gradientFrom}, ${BRAND_COLORS.gradientTo})`,
        color: BRAND_COLORS.text,
        fontSize: Math.round(size * 0.5),
        lineHeight: 1,
      }}
    >
      {BRAND_TEXT.logoMark}
    </div>
  );
}

/** 1200×630 paylaşım kartı: logo + marka adı + slogan + kısa açıklama. */
export function OgCard() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 96px',
        backgroundColor: BRAND_COLORS.background,
        backgroundImage: `radial-gradient(circle at 80% 10%, rgba(99,102,241,0.35), transparent 55%)`,
        color: BRAND_COLORS.text,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <BrandMark size={112} />
        <div style={{ display: 'flex', fontSize: 72 }}>
          <span>{BRAND_TEXT.namePrefix}</span>
          <span style={{ color: BRAND_COLORS.accent }}>{BRAND_TEXT.nameSuffix}</span>
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: 56, fontSize: 60, lineHeight: 1.15, maxWidth: 1000 }}>
        {BRAND_TEXT.slogan}
      </div>
      <div style={{ display: 'flex', marginTop: 28, fontSize: 34, color: BRAND_COLORS.muted }}>
        {BRAND_TEXT.tagline}
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 56,
          width: 160,
          height: 8,
          borderRadius: 4,
          backgroundImage: `linear-gradient(90deg, ${BRAND_COLORS.gradientFrom}, ${BRAND_COLORS.gradientTo})`,
        }}
      />
    </div>
  );
}
