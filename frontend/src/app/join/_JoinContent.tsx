'use client';

/**
 * _JoinContent — useSearchParams gerektirdiği için ayrı client bileşen.
 * page.tsx içinde Suspense boundary ile sarmalanır.
 *
 * Akış:
 *  1. token query param'ını oku
 *  2. GET /api/invitations/:token/join → tenant branding + rol bilgisi
 *  3. buildTenantThemeVars() ile brand CSS değişkenlerini container'a enjekte et
 *  4. InvitationCard'ı render et
 */

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AlertCircle, Link2Off } from 'lucide-react';
import { fetchInvitation } from '@/lib/api/invitation';
import { buildTenantThemeVars } from '@/lib/branding';
import { InvitationCard } from '@/components/organisms/InvitationCard';
import type { InvitationData } from '@/types/invitation';

// ─── Loading ──────────────────────────────────────────────────────────────────

function LoadingView() {
  return (
    <div className="flex flex-col items-center gap-4" role="status" aria-label="Yükleniyor">
      <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      <p className="text-sm text-muted-foreground">Davetiye doğrulanıyor…</p>
    </div>
  );
}

// ─── Error ────────────────────────────────────────────────────────────────────

interface ErrorViewProps {
  noToken: boolean;
  message: string;
}

function ErrorView({ noToken, message }: ErrorViewProps) {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm text-center">
      <div className="rounded-full bg-destructive/10 p-4">
        {noToken ? (
          <Link2Off className="h-8 w-8 text-destructive" aria-hidden />
        ) : (
          <AlertCircle className="h-8 w-8 text-destructive" aria-hidden />
        )}
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-bold text-foreground">
          {noToken ? 'Geçersiz Davet Linki' : 'Link Doğrulanamadı'}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
      </div>
      <p className="text-xs text-muted-foreground">
        Yöneticinizden yeni bir davet linki isteyin.
      </p>
    </div>
  );
}

// ─── JoinContent ─────────────────────────────────────────────────────────────

export default function JoinContent() {
  const searchParams = useSearchParams();
  const token        = searchParams.get('token');

  const [state, setState] = useState<
    | { status: 'loading' }
    | { status: 'error'; noToken: boolean; message: string }
    | { status: 'success'; data: InvitationData }
  >({ status: 'loading' });

  useEffect(() => {
    if (!token) {
      setState({
        status:  'error',
        noToken: true,
        message: 'Bu link geçerli bir davet tokenı içermiyor.',
      });
      return;
    }

    let cancelled = false;

    (async () => {
      const result = await fetchInvitation(token);

      if (cancelled) return;

      if (!result.valid) {
        setState({
          status:  'error',
          noToken: false,
          message: result.message,
        });
        return;
      }

      setState({ status: 'success', data: result });
    })();

    return () => { cancelled = true; };
  }, [token]);

  // Tenant brand rengini CSS değişkenlerine çevir — yalnızca başarılı durumda
  const themeVars =
    state.status === 'success'
      ? buildTenantThemeVars(state.data.primaryColor)
      : undefined;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 transition-colors duration-300"
      style={
        themeVars
          ? {
              ...(themeVars as React.CSSProperties),
              // Yumuşak marka rengi arka planı
              background: 'linear-gradient(135deg, hsl(var(--primary)/0.06) 0%, hsl(var(--background)) 50%, hsl(var(--primary)/0.04) 100%)',
            }
          : undefined
      }
    >
      {state.status === 'loading' && <LoadingView />}

      {state.status === 'error' && (
        <ErrorView noToken={state.noToken} message={state.message} />
      )}

      {state.status === 'success' && token && (
        <InvitationCard data={state.data} token={token} />
      )}
    </div>
  );
}
