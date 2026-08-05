'use client';

/**
 * Program Sağlığı — "kimse kaynıyor mu" (S2) drill-down.
 *
 * Özet sayıya tıkla → o gruptaki kişiler. Pasif üye ve ölü eşleşmede yönetici tek tek
 * "Hatırlat" (nudge) gönderebilir. Veri /api/admin/health-metrics'ten gelir (tenant-scoped).
 * Listeler backend'de CAP'lenir; count > gösterilen ise "+N daha" bilgisi verilir.
 */

import { useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { adminApi } from '@/lib/api/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/atoms/UserAvatar';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { cn } from '@/lib/utils';
import type { HealthMetricsData, NudgeKind } from '@/types/admin';

type MetricKey = 'mentorless' | 'dead' | 'passive';

// Her nudge hedefi için buton durumu: gönderiliyor / gönderildi / hata mesajı.
type NudgeState = 'sending' | 'sent' | { error: string };

function daysSince(iso?: string | null): string {
  if (!iso) return 'hiç giriş yok';
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return 'bugün';
  return `${days} gün önce`;
}

export function ProgramHealthSection() {
  const api = useApiClient();
  const { data, isLoading, error } = useQuery<HealthMetricsData>(() => adminApi.getHealthMetrics(api), []);
  const [selected, setSelected] = useState<MetricKey | null>(null);
  const [nudges, setNudges] = useState<Record<string, NudgeState>>({});

  const doNudge = async (userId: string, kind: NudgeKind) => {
    setNudges((p) => ({ ...p, [userId]: 'sending' }));
    const res = await adminApi.nudgeUser(api, userId, kind);
    setNudges((p) => ({
      ...p,
      [userId]: res.ok ? 'sent' : { error: res.error.message ?? 'Gönderilemedi.' },
    }));
  };

  if (error) return <AlertMessage type="error" message={error} />;
  if (isLoading) return <div className="h-40 animate-pulse rounded-xl bg-muted" />;
  if (!data) return null;

  const cards: Array<{ key: MetricKey; label: string; count: number; hint: string }> = [
    { key: 'mentorless', label: 'Mentörsüz Menti', count: data.mentorlessMenti.count, hint: 'eşleşme bekliyor' },
    { key: 'dead', label: 'Ölü Eşleşme', count: data.deadMatches.count, hint: `${data.thresholds.staleMatchDays}g+ görüşmesiz` },
    { key: 'passive', label: 'Pasif Üye', count: data.passiveMembers.count, hint: `${data.thresholds.passiveDays}g+ girişsiz` },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">Program Sağlığı</h2>
        <p className="text-xs text-muted-foreground">
          Arz-talep: {data.supplyDemand.mentors} mentör / {data.supplyDemand.mentis} menti
          {data.supplyDemand.ratio !== null && ` (oran ${data.supplyDemand.ratio})`}
        </p>
      </div>

      {/* Tıklanabilir özet sayılar */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {cards.map((c) => {
          const active = selected === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setSelected(active ? null : c.key)}
              aria-pressed={active}
              className={cn(
                'rounded-xl border p-4 text-left transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                active ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
              )}
            >
              <p className="text-sm text-muted-foreground">{c.label}</p>
              <p className="text-2xl font-bold">{c.count}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{c.hint} · detay için tıkla</p>
            </button>
          );
        })}
      </div>

      {/* Drill-down: seçili metriğin kişileri */}
      {selected && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {selected === 'mentorless' && 'Mentörsüz Mentiler'}
              {selected === 'dead' && 'Ölü Eşleşmeler'}
              {selected === 'passive' && 'Pasif Üyeler'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {selected === 'mentorless' && (
              <MemberList
                empty="Mentörsüz menti yok — herkes eşleşmiş. 🎉"
                rows={data.mentorlessMenti.items.map((m) => ({
                  id: m.id, name: m.fullName, avatarUrl: m.avatarUrl, sub: `kayıt: ${daysSince(m.createdAt)}`,
                }))}
                total={data.mentorlessMenti.count}
                note="Bu mentilere mentör atanmalı."
              />
            )}

            {selected === 'dead' && (
              <>
                {data.deadMatches.items.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">Ölü eşleşme yok. 🎉</p>
                ) : (
                  data.deadMatches.items.map((d) => (
                    <div key={d.optInId} className="flex items-center justify-between gap-3 border-b border-border py-2 last:border-0">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{d.mentorName} ↔ {d.mentiName}</p>
                        <p className="text-xs text-muted-foreground">eşleşme: {daysSince(d.since)} · hiç görüşme yok</p>
                      </div>
                      <NudgeButton
                        state={nudges[d.mentiId]}
                        onClick={() => doNudge(d.mentiId, 'DEAD_MATCH')}
                        label="Menti'yi Hatırlat"
                      />
                    </div>
                  ))
                )}
                <TruncationNote shown={data.deadMatches.items.length} total={data.deadMatches.count} />
              </>
            )}

            {selected === 'passive' && (
              <>
                {data.passiveMembers.items.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">Pasif üye yok. 🎉</p>
                ) : (
                  data.passiveMembers.items.map((m) => (
                    <div key={m.id} className="flex items-center justify-between gap-3 border-b border-border py-2 last:border-0">
                      <div className="flex min-w-0 items-center gap-3">
                        <UserAvatar src={m.avatarUrl} name={m.fullName} size={32} className="text-xs" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{m.fullName}</p>
                          <p className="text-xs text-muted-foreground">{m.role} · son giriş: {daysSince(m.lastLoginAt)}</p>
                        </div>
                      </div>
                      <NudgeButton
                        state={nudges[m.id]}
                        onClick={() => doNudge(m.id, 'PASSIVE')}
                        label="Hatırlat"
                      />
                    </div>
                  ))
                )}
                <TruncationNote shown={data.passiveMembers.items.length} total={data.passiveMembers.count} />
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ── Alt bileşenler ───────────────────────────────────────────────────────────

function NudgeButton({ state, onClick, label }: { state?: NudgeState; onClick: () => void; label: string }) {
  if (state === 'sent') {
    return <span className="shrink-0 text-xs font-medium text-emerald-600 dark:text-emerald-400">Gönderildi ✓</span>;
  }
  const errorMsg = typeof state === 'object' ? state.error : null;
  return (
    <div className="shrink-0 text-right">
      <Button size="sm" variant="outline" disabled={state === 'sending'} onClick={onClick}>
        {state === 'sending' ? 'Gönderiliyor…' : label}
      </Button>
      {errorMsg && <p className="mt-0.5 text-xs text-destructive">{errorMsg}</p>}
    </div>
  );
}

function MemberList({
  rows, empty, total, note,
}: {
  rows: Array<{ id: string; name: string; avatarUrl?: string | null; sub: string }>;
  empty: string;
  total: number;
  note?: string;
}) {
  if (rows.length === 0) return <p className="py-6 text-center text-sm text-muted-foreground">{empty}</p>;
  return (
    <>
      {note && <p className="mb-1 text-xs text-muted-foreground">{note}</p>}
      {rows.map((r) => (
        <div key={r.id} className="flex items-center gap-3 border-b border-border py-2 last:border-0">
          <UserAvatar src={r.avatarUrl} name={r.name} size={32} className="text-xs" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{r.name}</p>
            <p className="text-xs text-muted-foreground">{r.sub}</p>
          </div>
        </div>
      ))}
      <TruncationNote shown={rows.length} total={total} />
    </>
  );
}

function TruncationNote({ shown, total }: { shown: number; total: number }) {
  if (total <= shown) return null;
  return <p className="pt-1 text-xs text-muted-foreground">+{total - shown} kişi daha (ilk {shown} gösteriliyor).</p>;
}
