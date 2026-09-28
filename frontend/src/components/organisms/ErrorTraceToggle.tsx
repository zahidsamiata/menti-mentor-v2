'use client';

/**
 * DK-03 · Platform panelinde hata "iz kaydı" (KARAR-24 → B, PO 2026-09-21).
 *
 * Neden: platform operatörü bir 500 hatasının iz kaydını (stack) panelde göremiyordu; teşhis elle
 * veritabanı sorgusuna bağlıydı. İz, yalnız "İz kaydını göster" tıklanınca ve yalnız o satır için
 * çekilir (`GET /api/platform/logs/:id/trace`) — liste ucu meta döndürmez (AJ-102) ve iz açma işlemi
 * backend'de denetim izi bırakır. Kişisel veri backend'de temizlenir; burada yalnız gösterilir.
 */

import { useState } from 'react';
import { getPlatformLogTrace, type ErrorTrace } from '@/lib/api/platform';

type TraceState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ready'; trace: ErrorTrace }
  | { status: 'error' };

export const TRACE_LOAD_ERROR_TEXT = 'İz kaydı yüklenemedi. Sayfayı yenileyip tekrar deneyin.';
export const TRACE_EMPTY_TEXT = 'Bu kayıtta iz kaydı (stack) yok.';

export function ErrorTraceToggle({ logId }: { logId: string }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<TraceState>({ status: 'idle' });

  async function toggle() {
    const next = !open;
    setOpen(next);
    // İz bir kez çekilir; katlayıp açmak yeniden istek atmaz (her açış ayrı denetim kaydı olmasın).
    if (!next || state.status === 'ready' || state.status === 'loading') return;
    setState({ status: 'loading' });
    try {
      setState({ status: 'ready', trace: await getPlatformLogTrace(logId) });
    } catch {
      setState({ status: 'error' });
    }
  }

  const panelId = `trace-${logId}`;
  return (
    <div className="mt-1">
      <button
        type="button"
        onClick={() => { void toggle(); }}
        aria-expanded={open}
        aria-controls={panelId}
        className="text-xs text-primary hover:underline"
      >
        {open ? 'İz kaydını gizle' : 'İz kaydını göster'}
      </button>
      {open && (
        <div id={panelId} className="mt-2 rounded-lg border border-border bg-muted/40 p-3 text-xs space-y-2">
          {state.status === 'loading' && <p className="text-muted-foreground">Yükleniyor…</p>}
          {state.status === 'error' && <p className="text-destructive">{TRACE_LOAD_ERROR_TEXT}</p>}
          {state.status === 'ready' && <TraceBody trace={state.trace} />}
        </div>
      )}
    </div>
  );
}

function TraceBody({ trace }: { trace: ErrorTrace }) {
  const context = [
    trace.method && trace.url ? `${trace.method} ${trace.url}` : trace.url,
    trace.tenantId ? `kurum no: ${trace.tenantId}` : null,
    trace.userId ? `kullanıcı no: ${trace.userId}` : null,
  ].filter(Boolean);

  return (
    <>
      <p className="text-muted-foreground">Kişisel veriler maskelenmiştir ([gizli]).</p>
      {context.length > 0 && <p className="font-mono text-foreground break-all">{context.join(' · ')}</p>}
      {trace.errorMessage && <p className="font-mono text-foreground break-all">{trace.errorMessage}</p>}
      {trace.stack ? (
        <pre className="font-mono whitespace-pre-wrap break-all text-foreground max-h-80 overflow-auto">{trace.stack}</pre>
      ) : (
        <p className="text-muted-foreground">{TRACE_EMPTY_TEXT}</p>
      )}
    </>
  );
}
