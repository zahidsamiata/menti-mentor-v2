'use client';

/**
 * F-20 — Bekleme salonunda tarayıcı bildirim izni istemi.
 *
 * Bekleyen menti, yönetici onayı/eşleşme olduğunda haberdar olmak isteyebilir ama
 * uygulama tarayıcı bildirim iznini hiç istemiyordu (`Notification.requestPermission`
 * kod tabanında 0 kullanım). Bu bileşen yalnız izin "default" iken bir düğme gösterir;
 * verilmiş/reddedilmiş durumda düğme yerine kısa bir durum metni gösterir. Tarayıcı
 * Notification API'sini desteklemiyorsa (veya SSR) hiçbir şey render etmez.
 *
 * AJ-39 — METİN GERÇEĞE UYDURULDU: uygulama bugün hiçbir tarayıcı bildirimi GÖNDERMİYOR
 * (`new Notification` / push / service worker kullanımı yok). Eski "önemli bir gelişme olduğunda
 * haber vereceğiz" metni karşılıksız bir vaatti. Gerçek bildirim gönderimi eklenmesi ürün kararıdır;
 * o karar verilene kadar metinler vaat içermez. Bildirim gönderimi eklenirse bu metinler güncellenir.
 */

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

/** Bu bileşene özgü kullanıcı metinleri (tek kullanım → UI_TEXT sözlüğüne girmez). */
export const NOTIFICATION_OPT_IN_TEXT = {
  button: '🔔 Bildirimlere izin ver',
  granted: '🔔 Tarayıcı bildirim izni verildi. Gelişmeleri şimdilik bu panelden takip edebilirsin.',
  denied: 'Bildirimler kapalı. Dilersen tarayıcı ayarlarından açabilirsin.',
} as const;

export type BrowserNotificationPermission = 'default' | 'granted' | 'denied' | 'unsupported';

export interface NotificationPromptView {
  /** İzin isteme düğmesi gösterilsin mi? Yalnız 'default' iken. */
  showButton: boolean;
  /** Düğme yoksa gösterilecek kısa durum metni (yoksa null → hiçbir şey). */
  statusText: string | null;
}

/** Saf: tarayıcı izin durumundan ne render edileceğini türetir (test edilebilir). */
export function notificationPromptView(
  permission: BrowserNotificationPermission,
): NotificationPromptView {
  switch (permission) {
    case 'default':
      return { showButton: true, statusText: null };
    case 'granted':
      return { showButton: false, statusText: NOTIFICATION_OPT_IN_TEXT.granted };
    case 'denied':
      return { showButton: false, statusText: NOTIFICATION_OPT_IN_TEXT.denied };
    case 'unsupported':
    default:
      return { showButton: false, statusText: null };
  }
}

function readPermission(): BrowserNotificationPermission {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
  return window.Notification.permission as BrowserNotificationPermission;
}

export function NotificationOptInButton() {
  // SSR'da 'unsupported' başlar; gerçek durum mount sonrası okunur (hydration güvenli).
  const [permission, setPermission] = useState<BrowserNotificationPermission>('unsupported');

  useEffect(() => {
    setPermission(readPermission());
  }, []);

  const view = notificationPromptView(permission);

  async function handleClick() {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    try {
      const result = await window.Notification.requestPermission();
      setPermission(result as BrowserNotificationPermission);
    } catch {
      // Eski tarayıcılar callback tabanlı requestPermission kullanır; sessiz geç.
    }
  }

  if (view.showButton) {
    return (
      <Button size="sm" variant="outline" onClick={handleClick}>
        {NOTIFICATION_OPT_IN_TEXT.button}
      </Button>
    );
  }
  if (view.statusText) {
    return <p className="text-xs text-amber-700 dark:text-amber-400">{view.statusText}</p>;
  }
  return null;
}
