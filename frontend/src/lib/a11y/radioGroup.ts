/**
 * Erişilebilirlik (F-21): tek-seçimli soru grupları için WAI-ARIA "radiogroup" klavye deseni.
 *
 * Neden: seçenekler görsel olarak kart/düğme olarak çizildiği için gerçek `<input type="radio">`
 * kullanılamıyor (görünüm değişmemeli). Bu yüzden `role="radio"` + `aria-checked` taşıyan düğmelere
 * ok tuşu gezintisi ve "gezici tabIndex" (grupta yalnız bir öğe Tab sırasında) burada eklenir.
 *
 * `selectOnMove`:
 *  - true  → ok tuşu odağı taşır VE seçer (standart radio davranışı).
 *  - false → ok tuşu yalnız odağı taşır; seçim Boşluk/Enter ile yapılır. Seçimin hemen bir sonraki
 *            soruya geçtiği/cevabı kilitlediği akışlarda (DISC, sertifika) kullanılır — aksi halde
 *            kullanıcı seçenekleri gezerken istemeden cevap göndermiş olur.
 */

import type { KeyboardEvent } from 'react';

const NEXT_KEYS = ['ArrowDown', 'ArrowRight'];
const PREV_KEYS = ['ArrowUp', 'ArrowLeft'];
const HANDLED_KEYS = [...NEXT_KEYS, ...PREV_KEYS, 'Home', 'End'];

interface RadioGroupKeyOptions {
  selectOnMove?: boolean;
}

function isEnabled(el: HTMLElement): boolean {
  return !(el as HTMLButtonElement).disabled && el.getAttribute('aria-disabled') !== 'true';
}

/** Radiogroup kapsayıcısının `onKeyDown`'una bağlanır. */
export function handleRadioGroupKeyDown(
  event: KeyboardEvent<HTMLElement>,
  { selectOnMove = true }: RadioGroupKeyOptions = {},
): void {
  if (!HANDLED_KEYS.includes(event.key)) return;

  const radios = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]'),
  ).filter(isEnabled);
  if (radios.length === 0) return;

  const currentIndex = radios.indexOf(document.activeElement as HTMLElement);
  if (currentIndex === -1) return;

  event.preventDefault();
  const last = radios.length - 1;
  let nextIndex = currentIndex;
  if (NEXT_KEYS.includes(event.key)) nextIndex = currentIndex === last ? 0 : currentIndex + 1;
  else if (PREV_KEYS.includes(event.key)) nextIndex = currentIndex === 0 ? last : currentIndex - 1;
  else if (event.key === 'Home') nextIndex = 0;
  else if (event.key === 'End') nextIndex = last;

  const target = radios[nextIndex];
  if (!target) return;
  target.focus();
  if (selectOnMove) target.click();
}

/**
 * Gezici tabIndex: seçili seçenek (yoksa ilki) Tab ile ulaşılır, diğerleri ok tuşlarıyla.
 * `selectedIndex` -1 ise hiçbir şey seçili değil demektir.
 */
export function rovingTabIndex(index: number, selectedIndex: number): 0 | -1 {
  const active = selectedIndex >= 0 ? selectedIndex : 0;
  return index === active ? 0 : -1;
}
