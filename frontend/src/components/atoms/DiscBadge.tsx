/**
 * Atom: DiscBadge — DISC kimlik rozeti (KARAR 1 · iş #12).
 *
 * Kişinin DISC kimliğini tek harf yerine türetilmiş 1–3 harflik dizge olarak gösterir
 * (ör. "D", "DI", "Di", "DIs"). Harf backend'de normalize DISC vektöründen türetilir
 * (`discLetters`); bu değer yoksa eski tek `discType`'a düşülür; o da yoksa "—".
 *
 * Renk: birincil (ilk) harfe göre — D kırmızı · I sarı · S yeşil · C mavi (havuz sayfalarıyla aynı palet).
 * Büyük/küçük harf ayrımı (güçlü vs destekleyici) korunur; tooltip Türkçe arketip açıklaması verir.
 *
 * AJ-07: açık temada I (`yellow-600` ~2.9:1) ve S (`green-600` ~3.3:1) beyaz zeminde WCAG AA
 * (metin ≥4.5:1) altındaydı. `yellow-700`/`green-700`'e çekildi (~4.9:1 / ~5.0:1). Koyu mod
 * (`dark:*-400`, K-10) DOKUNULMADI. Aynı harf→renk eşlemesi profile/page.tsx, mentor/page.tsx ve
 * admin/questions/page.tsx'te tekrar ediyor — kapsam: dördü de hizalandı (bkz. AJ-07 notu, tek
 * kaynağa taşımak ayrı bir refaktör olur, bu turun kapsamı dışında bırakıldı).
 */

const DISC_META: Record<string, { archetype: string; color: string }> = {
  D: { archetype: 'Öncü',       color: 'text-red-600 dark:text-red-400'    },
  I: { archetype: 'Ateşleyici', color: 'text-yellow-700 dark:text-yellow-400' },
  S: { archetype: 'Yapı Taşı',  color: 'text-green-700 dark:text-green-400'  },
  C: { archetype: 'Kâşif',      color: 'text-blue-600 dark:text-blue-400'   },
};

interface DiscBadgeProps {
  /** Backend'de türetilmiş çoklu harf dizgesi (ör. "DIs"). Tercih edilen kaynak. */
  discLetters?: string | null;
  /** Eski tek harf — discLetters yoksa geriye dönük uyumluluk için. */
  discType?: string | null;
  className?: string;
}

export function DiscBadge({ discLetters, discType, className = '' }: DiscBadgeProps) {
  const letters = discLetters && discLetters.length > 0 ? discLetters : (discType ?? '');
  if (!letters) return <span className="text-muted-foreground">—</span>;

  const primary = letters.charAt(0).toUpperCase();
  const color = DISC_META[primary]?.color ?? '';

  // Türkçe tooltip: her harf için arketip + rol (baskın / güçlü / destekleyici).
  const title = letters
    .split('')
    .map((ch, i) => {
      const meta = DISC_META[ch.toUpperCase()];
      const role = i === 0 ? 'baskın' : ch === ch.toUpperCase() ? 'güçlü' : 'destekleyici';
      return meta ? `${meta.archetype} (${role})` : ch;
    })
    .join(' · ');

  return (
    <span className={`font-bold ${color} ${className}`.trim()} title={title}>
      {letters}
    </span>
  );
}
