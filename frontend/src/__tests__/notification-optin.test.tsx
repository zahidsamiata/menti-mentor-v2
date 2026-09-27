/**
 * F-20 — Bekleme salonu bildirim izni istemi.
 *
 * Saf `notificationPromptView` tarayıcı izin durumundan ne render edileceğini türetir:
 * yalnız 'default' iken izin düğmesi; 'granted'/'denied' iken durum metni; desteklenmiyorsa
 * hiçbir şey. Böylece Notification API'siz (jsdom) ortamda mantık deterministik test edilir.
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import {
  NotificationOptInButton,
  NOTIFICATION_OPT_IN_TEXT,
  notificationPromptView,
} from '@/components/organisms/NotificationOptInButton';

/**
 * AJ-39 — Uygulama bugün hiçbir tarayıcı bildirimi göndermiyor; metinler gelecekte bildirim
 * gönderileceğini VAAT ETMEMELİ. Bu desen "haber vereceğiz / bildireceğiz / bildirim
 * göndereceğiz / haberdar edeceğiz" gibi gelecek-zaman vaatlerini yakalar.
 */
const PROMISE_PATTERN = /(haber\s+ver(eceğiz|ecegiz))|(bildir(eceğiz|ecegiz))|(gönder(eceğiz|ecegiz))|(haberdar\s+ed(eceğiz|ecegiz))/i;

describe('notificationPromptView (F-20)', () => {
  it("'default' iken izin düğmesi gösterilir, metin yok", () => {
    const v = notificationPromptView('default');
    expect(v.showButton).toBe(true);
    expect(v.statusText).toBeNull();
  });

  it("'granted' iken düğme yok, izin verildi durum metni gösterilir", () => {
    const v = notificationPromptView('granted');
    expect(v.showButton).toBe(false);
    expect(v.statusText).toMatch(/izni verildi/i);
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

describe('NotificationOptInButton — tıklama ve metin (AJ-39)', () => {
  const originalNotification = (window as unknown as { Notification?: unknown }).Notification;

  afterEach(() => {
    cleanup();
    if (originalNotification === undefined) {
      delete (window as unknown as { Notification?: unknown }).Notification;
    } else {
      (window as unknown as { Notification?: unknown }).Notification = originalNotification;
    }
  });

  function installNotificationStub(result: 'granted' | 'denied') {
    const stub = {
      permission: 'default' as string,
      requestPermission: vi.fn(async () => result),
    };
    (window as unknown as { Notification: unknown }).Notification = stub;
    return stub;
  }

  it("'default' iken düğmeye tıklamak tarayıcıdan izin ister ve verilen izin vaatsiz metinle gösterilir", async () => {
    const stub = installNotificationStub('granted');
    render(<NotificationOptInButton />);

    const button = await screen.findByRole('button', { name: NOTIFICATION_OPT_IN_TEXT.button });
    fireEvent.click(button);

    expect(stub.requestPermission).toHaveBeenCalledTimes(1);
    const status = await screen.findByText(NOTIFICATION_OPT_IN_TEXT.granted);
    expect(status.textContent).not.toMatch(PROMISE_PATTERN);
    expect(screen.queryByRole('button', { name: NOTIFICATION_OPT_IN_TEXT.button })).toBeNull();
  });

  it('izin reddedilirse kapalı durum metni gösterilir', async () => {
    const stub = installNotificationStub('denied');
    render(<NotificationOptInButton />);

    fireEvent.click(await screen.findByRole('button', { name: NOTIFICATION_OPT_IN_TEXT.button }));

    expect(stub.requestPermission).toHaveBeenCalledTimes(1);
    expect(await screen.findByText(NOTIFICATION_OPT_IN_TEXT.denied)).toBeTruthy();
  });

  it('hiçbir durum metni gelecekte bildirim gönderileceğini vaat etmez', () => {
    for (const text of Object.values(NOTIFICATION_OPT_IN_TEXT)) {
      expect(text).not.toMatch(PROMISE_PATTERN);
    }
    // Desenin gerçekten eski vaadi yakaladığını da sabitle (totoloji olmasın).
    expect('🔔 Bildirimler açık — önemli bir gelişme olduğunda haber vereceğiz.').toMatch(PROMISE_PATTERN);
  });
});
