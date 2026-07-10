'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createInvitation } from '@/lib/api/selfServe';
import type { WizardData } from '../_StkOnboardingContent';

interface Props {
  data: WizardData;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={() => void copy()}
      className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium border border-border bg-muted hover:bg-muted/80 transition-colors"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />}
      {copied ? 'Kopyalandı!' : 'Kopyala'}
    </button>
  );
}

interface InviteLink { link: string | null; loading: boolean; error: string }

export function Step5Invite({ data }: Props) {
  const [mentor, setMentor] = useState<InviteLink>({ link: null, loading: true, error: '' });
  const [menti,  setMenti]  = useState<InviteLink>({ link: null, loading: true, error: '' });

  useEffect(() => {
    if (!data.tenantId || !data.adminToken) return;

    (async () => {
      const [mentorRes, mentiRes] = await Promise.all([
        createInvitation(data.tenantId, data.adminToken, 'MENTOR'),
        createInvitation(data.tenantId, data.adminToken, 'MENTI'),
      ]);

      setMentor({
        link:    mentorRes.ok ? mentorRes.data.invitationLink : null,
        loading: false,
        error:   mentorRes.ok ? '' : (mentorRes.error.message ?? 'Link oluşturulamadı.'),
      });
      setMenti({
        link:    mentiRes.ok ? mentiRes.data.invitationLink : null,
        loading: false,
        error:   mentiRes.ok ? '' : (mentiRes.error.message ?? 'Link oluşturulamadı.'),
      });
    })();
  }, [data.tenantId, data.adminToken]);

  return (
    <div className="space-y-5">

      {/* Kutlama */}
      <div className="text-center py-4 space-y-2">
        <div className="text-4xl">🎉</div>
        <h2 className="text-lg font-bold text-foreground">Kurumun hazır!</h2>
        <p className="text-sm text-muted-foreground">
          Üyeleri davet et — ilk eşleşmen birkaç adım uzaklıkta.
        </p>
      </div>

      {/* Davet linkleri */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">

        <p className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" aria-hidden />
          Davet Linkleri
        </p>

        {(['mentor', 'menti'] as const).map((role) => {
          const state = role === 'mentor' ? mentor : menti;
          const label = role === 'mentor' ? 'Mentör Davet Linki' : 'Menti Davet Linki';
          return (
            <div key={role} className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
              {state.loading ? (
                <div className="h-9 rounded-md bg-muted animate-pulse" />
              ) : state.link ? (
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-md border border-input bg-muted/50 px-3 py-2 text-xs text-muted-foreground font-mono truncate select-all">
                    {state.link}
                  </div>
                  <CopyButton text={state.link} />
                </div>
              ) : (
                <p className="text-xs text-destructive">{state.error}</p>
              )}
            </div>
          );
        })}

        <p className="text-xs text-muted-foreground">
          Bu linkler 90 gün geçerlidir. Yönetici panelinden yeni link üretebilirsin.
        </p>
      </div>

      {/* Panele git */}
      <Button asChild className="w-full gap-2">
        <Link href="/admin/waiting-room">
          Yönetici Paneline Git
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </Button>

    </div>
  );
}
