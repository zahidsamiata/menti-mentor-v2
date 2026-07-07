'use client';

import { useEffect, useRef, useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { adminApi } from '@/lib/api/admin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Suggestion {
  code: string;
  severity: 'INFO' | 'WARN' | 'CRITICAL';
  title: string;
  description: string;
  actions: string[];
}

interface SuggestionsResponse {
  userId: string;
  suggestionCount: number;
  hasCritical: boolean;
  items: Suggestion[];
}

interface Props {
  userId: string;
  userName: string;
  open: boolean;
  onClose: () => void;
}

const SEVERITY_STYLES: Record<string, string> = {
  CRITICAL: 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800',
  WARN:     'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800',
  INFO:     'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800',
};
const SEVERITY_BADGE: Record<string, 'destructive' | 'warning' | 'secondary'> = {
  CRITICAL: 'destructive', WARN: 'warning', INFO: 'secondary',
};

export function CoachingSuggestionsDialog({ userId, userName, open, onClose }: Props) {
  const api = useApiClient();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [data, setData] = useState<SuggestionsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) { el.showModal(); fetchSuggestions(); }
    else { el.close(); }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchSuggestions() {
    setLoading(true);
    const result = await adminApi.getCoachingSuggestions(api, userId);
    setLoading(false);
    if (result.ok) setData(result.data as SuggestionsResponse);
  }

  return (
    <dialog
      ref={dialogRef}
      className="rounded-2xl border border-border bg-card p-6 shadow-xl w-full max-w-lg backdrop:bg-black/50"
      onCancel={onClose}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{userName} — Aksiyon Önerileri</h2>
        <Button variant="outline" size="sm" onClick={onClose}>✕</Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2].map((i) => <div key={i} className="h-20 animate-pulse rounded-xl bg-muted" />)}
        </div>
      ) : !data?.items.length ? (
        <div className="text-center py-8">
          <p className="text-3xl">✅</p>
          <p className="mt-2 font-medium">Müdahale gerektiren durum yok</p>
          <p className="text-sm text-muted-foreground mt-1">Bu kullanıcı için her şey yolunda görünüyor.</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {data.items.map((s) => (
            <div key={s.code} className={`rounded-xl border p-4 ${SEVERITY_STYLES[s.severity]}`}>
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-sm">{s.title}</p>
                <Badge variant={SEVERITY_BADGE[s.severity]} className="shrink-0 text-xs">
                  {s.severity === 'CRITICAL' ? 'Kritik' : s.severity === 'WARN' ? 'Uyarı' : 'Bilgi'}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
              <div className="mt-2 space-y-1">
                {s.actions.map((action, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs">
                    <span className="text-muted-foreground">→</span>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-4">
        Bunlar sistem önerileridir. Son karar her zaman yöneticinizindir.
      </p>
    </dialog>
  );
}
