/**
 * Erişilebilirlik (AJ-85, WCAG 1.4.3): "olumlu durum" yeşil tonları tek yerde.
 *
 * Neden: yeşilin 600 tonu (emerald) beyaz zeminde ~3.8:1 — normal metin için AA eşiği 4.5:1'in altında.
 * Açık zeminde metin/ikon için `text-emerald-700` (~5.5:1) kullanılır; koyu tema tonu (`emerald-400`) zaten AA'yı geçtiği
 * için aynen korunur.
 *
 * Rozet (pill) istisnası: platform tablolarındaki yeşil rozetler `bg-green-900/60` zemin taşıyordu.
 * Bu zemin açık temada beyazla karışınca orta-koyu yeşile döner; üstündeki yeşil metin (600 ya da
 * 700) ~1.2–1.7:1'e düşer — metni koyulaştırmak kontrastı DÜŞÜRÜR. Bu yüzden rozet açık temada
 * `Badge variant="success"` ile aynı açık zemin/koyu metin çiftine (`bg-emerald-100` +
 * `text-emerald-800`, ~6.8:1) çekilir; koyu temadaki mevcut görünüm `dark:` önekiyle aynen kalır.
 */

/** Tablo içi yeşil durum rozeti (ör. "Aktif", "Var", onaylı kurum). */
export const SUCCESS_PILL_CLASS = 'bg-emerald-100 text-emerald-800 dark:bg-green-900/60 dark:text-emerald-400';
