/**
 * F-20 — Bekleme salonu bildirim izni istemi.
 *
 * Saf `notificationPromptView` tarayıcı izin durumundan ne render edileceğini türetir:
 * yalnız 'default' iken izin düğmesi; 'granted'/'denied' iken durum metni; desteklenmiyorsa
 * hiçbir şey. Böylece Notification API'siz (jsdom) ortamda mantık deterministik test edilir.
 */

import { describe, it, expect } from 'vitest';
import { notificationPromptView } from '@/components/organisms/NotificationOptInButton';

describe('notificationPromptView (F-20)', () => {
  it("'default' iken izin düğmesi gösterilir, metin yok", () => {
    const v = notificationPromptView('default');
    expect(v.showButton).toBe(true);
    expect(v.statusText).toBeNull();
  });

  it("'granted' iken düğme yok, açık durum metni gösterilir", () => {
    const v = notificationPromptView('granted');
    expect(v.showButton).toBe(false);
    expect(v.statusText).toMatch(/açık/i);
  });

  it("'denied' iken düğme yok, kapalı durum metni gösterilir", () => {
    const v = notificationPromptView('denied');
    expect(v.showButton).toBe(false);
    expect(v.statusText).toMatch(/kapalı/i);
  });

  it("desteklenmeyen tarayıcıda hiçbir şey render edilmez", () => {
    const v = notificationPromptView('unsupported');
    expect(v.showButton).toBe(false);
    expect(v.statusText).toBeNull();
  });
});
