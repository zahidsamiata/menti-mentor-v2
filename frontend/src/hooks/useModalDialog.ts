'use client';

/**
 * Erişilebilirlik (F-21): `fixed inset-0` ile elle yazılmış modal pencereler için ortak davranış.
 *
 * Native `<dialog>.showModal()` bunları kendisi sağlar; bu hook, görünümü bozmamak için native
 * dialog'a çevrilmeyen özel pencereler içindir:
 *  - açılınca odak pencerenin içine (ilk odaklanabilir öğeye) taşınır,
 *  - Esc pencereyi kapatır (`onClose`),
 *  - Tab/Shift+Tab pencerenin içinde döner (basit odak tuzağı),
 *  - kapanınca odak, pencereyi açan öğeye geri döner.
 *
 * Kullanım: dönen `ref` pencere panelinin kapsayıcısına verilir; kapsayıcıya ayrıca
 * `role="dialog"`, `aria-modal="true"`, `aria-labelledby` ve `tabIndex={-1}` eklenir.
 * Yeni bağımlılık eklememek için (focus-trap vb.) bilinçli olarak küçük tutuldu.
 */

import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function focusableIn(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
}

export function useModalDialog<T extends HTMLElement = HTMLDivElement>(
  open: boolean,
  onClose: () => void,
) {
  const ref = useRef<T>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const container = ref.current;
    if (container && !container.contains(document.activeElement)) {
      (focusableIn(container)[0] ?? container).focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab' || !container) return;

      const items = focusableIn(container);
      if (items.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }
      const first = items[0]!;
      const last = items[items.length - 1]!;
      const active = document.activeElement;
      if (!container.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused && previouslyFocused !== document.body && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [open]);

  return ref;
}
