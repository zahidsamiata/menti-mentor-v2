'use client';

/**
 * Kök hata sınırı (Next.js App Router). (W denetimi §4#20)
 *
 * `error.tsx` route segment'lerini yakalar; `global-error.tsx` ise KÖK layout'un kendisi
 * patladığında devreye girer ve kendi <html>/<body>'sini render etmek ZORUNDADIR (layout
 * yüklenmemiş olabilir). Bu yüzden tasarım token'larına/provider'lara güvenmeden inline stil
 * kullanılır. Hata ayrıntısı kullanıcıya GÖSTERİLMEZ — yalnız konsola.
 */

import { useEffect } from 'react';
import { UI_TEXT } from '@/lib/uiText';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[global-error-boundary]', error);
  }, [error]);

  return (
    <html lang="tr">
      <body
        style={{
          minHeight: '100vh',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          background: '#0b0b0c',
          color: '#e7e7e9',
          padding: '1rem',
        }}
      >
        <div style={{ maxWidth: 420, textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Bir şeyler ters gitti
          </h1>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#a1a1aa', marginBottom: '1.5rem' }}>
            Beklenmedik bir sorun oluştu. Tekrar denemek çoğu zaman sorunu çözer; sürerse
            lütfen biraz sonra yeniden deneyin.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => reset()}
              style={{
                cursor: 'pointer',
                borderRadius: 8,
                border: 'none',
                padding: '0.6rem 1.1rem',
                fontSize: '0.9rem',
                fontWeight: 500,
                background: '#4f46e5',
                color: '#fff',
              }}
            >
              {UI_TEXT.actions.retry}
            </button>
            {/* global-error kök layout çöktüğünde çalışır; next/link router context'i
                güvenilmez olabilir → tam sayfa gezinme için düz <a> kasıtlı. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                borderRadius: 8,
                border: '1px solid #3f3f46',
                padding: '0.6rem 1.1rem',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: '#e7e7e9',
                textDecoration: 'none',
              }}
            >
              Ana sayfaya dön
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
