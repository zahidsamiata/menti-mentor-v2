/**
 * Kullanıcının işletim sistemi/tarayıcıda "hareketi azalt" tercihini açıp açmadığı.
 *
 * SSR'da ve `matchMedia` olmayan ortamlarda (eski tarayıcı, bazı test ortamları) `false` döner:
 * tercih bilinmiyorsa varsayılan davranış korunur.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
