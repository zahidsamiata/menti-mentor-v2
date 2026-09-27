'use client';

/**
 * Molecule: TurnstileWidget — Cloudflare Turnstile CAPTCHA widget'ı (F-05/G1-26).
 *
 * `NEXT_PUBLIC_TURNSTILE_SITE_KEY` TANIMSIZSA hiçbir şey render etmez (`null`) — bugünkü
 * görünüm aynen korunur (backend de anahtar yokken no-op'tur, bkz. backend `middleware/turnstile.ts`).
 * Anahtar TANIMLIYSA Cloudflare'ın script'i CDN'den yüklenir (npm bağımlılığı EKLENMEDİ — görev
 * kapsamı script-tag yüklemesini öngörüyor) ve widget explicit render API'siyle monte edilir.
 *
 * Kullanım: formun `onSubmit`'i çağrılmadan önce `onVerify` ile alınan token, isteğe
 * `captchaToken` alanı olarak eklenir (backend `req.body.captchaToken` okur).
 */

import { useEffect, useId, useRef } from 'react';

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

interface TurnstileRenderOptions {
  sitekey: string;
  callback: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

// Script CDN'den yalnız BİR kez yüklenir — birden fazla widget (ör. aynı sayfada iki form)
// aynı promise'i paylaşır.
let scriptLoadPromise: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Turnstile betiği yüklenemedi.')));
      return;
    }
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Turnstile betiği yüklenemedi.'));
    document.head.appendChild(script);
  });
  return scriptLoadPromise;
}

export interface TurnstileWidgetProps {
  /** Cloudflare doğrulaması başarılı olunca token bununla iletilir. */
  onVerify: (token: string) => void;
  /** Token süresi dolunca (kullanıcı formu uzun süre açık bıraktıysa) çağrılır. */
  onExpire?: () => void;
  className?: string;
}

export function TurnstileWidget({ onVerify, onExpire, className }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const reactId = useId();
  // onVerify/onExpire her render'da yeni referans olabilir (inline arrow fn) — widget'ı
  // yeniden monte etmeden en güncel callback'e ulaşmak için ref'te tutulur.
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  onVerifyRef.current = onVerify;
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!SITE_KEY) return;
    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          callback: (token) => onVerifyRef.current(token),
          'expired-callback': () => onExpireRef.current?.(),
        });
      })
      .catch(() => {
        // CDN'e ulaşılamadı (ağ/adblock) — form yine de gönderilebilir kalsın; backend
        // anahtar tanımlıyken token yoksa 400 döner, kullanıcı normal hata akışını görür.
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  if (!SITE_KEY) return null;

  return <div ref={containerRef} id={`turnstile-${reactId}`} className={className} data-testid="turnstile-widget" />;
}
