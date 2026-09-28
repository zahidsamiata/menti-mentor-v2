'use client';

/**
 * K-11 — Kurum yöneticisi şikayet inceleme paneli.
 *
 * Backend `GET /admin/reports` + `PATCH /admin/reports/:id` zaten vardı ama UI yoktu →
 * şikayet döngüsü kapanmıyordu. Bu sayfa açık şikayetleri listeler; yönetici "İnceledim"
 * veya "Reddet" ile durumunu değiştirir (opsiyonel not). Tenant-scope (backend'de).
 */

import { useRef, useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { adminApi } from '@/lib/api/admin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import type { ReportStatus, TenantReport } from '@/types/admin';
import { REPORT_STATUS_LABELS, reportReasonLabel, reportStatusLabel } from '@/lib/enumLabels';
import { UI_TEXT } from '@/lib/uiText';
import { ADMIN_PAGE_DESCRIPTIONS } from '@/lib/adminPageDescriptions';

/**
 * AJ-61 — Durum/neden METİNLERİ tek kaynaktan (`lib/enumLabels.ts`) okunur; platform paneli de
 * aynı sözlüğü kullanır, iki ekran ayrışmaz. Burada yalnız rozet RENGİ (görsel karar) tutulur.
 */
type StatusBadgeVariant = 'warning' | 'success' | 'secondary';

const STATUS_BADGE_VARIANT: Record<ReportStatus, StatusBadgeVariant> = {
  OPEN: 'warning',
  REVIEWED: 'success',
  DISMISSED: 'secondary',
};

/** Sözlükte olup renk haritasında olmayan (yeni) durum nötr rozetle gösterilir. */
const DEFAULT_STATUS_BADGE_VARIANT: StatusBadgeVariant = 'secondary';

const STATUS_FILTERS: { key: ReportStatus | 'ALL'; label: string }[] = [
  ...(Object.keys(REPORT_STATUS_LABELS) as ReportStatus[]).map((key) => ({
    key,
    label: reportStatusLabel(key),
  })),
  { key: 'ALL', label: UI_TEXT.filters.all },
];

/** Sayfaları birleştirir; sayfa sınırında kayma olursa aynı kaydı iki kez göstermez. */
function mergeUnique(first: TenantReport[], rest: TenantReport[]): TenantReport[] {
  const seen = new Set(first.map((r) => r.id));
  const merged = [...first];
  for (const r of rest) {
    if (seen.has(r.id)) continue;
    seen.add(r.id);
    merged.push(r);
  }
  return merged;
}

function ReportCard({ report, onDone }: { report: TenantReport; onDone: () => void }) {
  const api = useApiClient();
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState<null | 'REVIEWED' | 'DISMISSED'>(null);
  const [err, setErr] = useState<string | null>(null);

  async function act(status: 'REVIEWED' | 'DISMISSED') {
    setBusy(status);
    setErr(null);
    const res = await adminApi.reviewReport(api, report.id, status, note.trim() || undefined);
    setBusy(null);
    if (res.ok) onDone();
    else setErr(res.error.message ?? 'İşlem başarısız. Lütfen tekrar deneyin.');
  }

  const statusVariant = STATUS_BADGE_VARIANT[report.status] ?? DEFAULT_STATUS_BADGE_VARIANT;
  const when = new Date(report.createdAt).toLocaleString('tr-TR', { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <div className="rounded-xl border border-border p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold">{reportReasonLabel(report.reason)}</p>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{report.reporter?.fullName ?? 'Bilinmiyor'}</span>
            {' → '}
            <span className="font-medium text-foreground">{report.target?.fullName ?? 'Bilinmiyor'}</span>
            {' · '}{when}
          </p>
        </div>
        <Badge variant={statusVariant} className="text-xs shrink-0">{reportStatusLabel(report.status)}</Badge>
      </div>

      {report.description && (
        <blockquote className="border-l-4 border-border pl-3 text-sm text-muted-foreground">
          {report.description}
        </blockquote>
      )}

      {report.reviewNote && (
        <p className="rounded-lg bg-muted/60 p-2 text-xs text-muted-foreground">
          <span className="font-medium">İnceleme notu: </span>{report.reviewNote}
        </p>
      )}

      {report.status === 'OPEN' && (
        <div className="space-y-2">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            maxLength={1000}
            placeholder="İnceleme notu (opsiyonel)"
            className="w-full rounded-lg border border-border bg-background p-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
          {err && <p className="text-xs text-destructive">{err}</p>}
          <div className="flex gap-2">
            <Button size="sm" disabled={busy !== null} onClick={() => act('REVIEWED')}>
              {busy === 'REVIEWED' ? '…' : 'İncelendi olarak işaretle'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-muted-foreground"
              disabled={busy !== null}
              onClick={() => act('DISMISSED')}
            >
              {busy === 'DISMISSED' ? '…' : 'Reddet'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminReportsPage() {
  const api = useApiClient();
  const [filter, setFilter] = useState<ReportStatus | 'ALL'>('OPEN');

  const statusParam = filter === 'ALL' ? {} : { status: filter };

  // İlk sayfa useQuery ile gelir; "Daha fazla göster" ile eklenen sayfalar ayrı tutulur.
  const { data, isLoading, error, refetch } = useQuery(
    () => adminApi.listReports(api, statusParam),
    [filter],
    { enabled: true },
  );

  // AN-39: sayfalama durumu. `pageGen`, filtre değişimi/yenileme sonrası geç gelen eski sayfa
  // yanıtının yeni listeye eklenmesini engeller.
  const [moreItems, setMoreItems] = useState<TenantReport[]>([]);
  const [moreTotal, setMoreTotal] = useState<number | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [moreError, setMoreError] = useState<string | null>(null);
  const pageGen = useRef(0);

  function resetPaging() {
    pageGen.current += 1;
    setMoreItems([]);
    setMoreTotal(null);
    setMoreError(null);
    setLoadingMore(false);
  }

  function changeFilter(next: ReportStatus | 'ALL') {
    if (next === filter) return;
    resetPaging();
    setFilter(next);
  }

  // Bir şikayet incelenince liste ilk sayfadan yeniden yüklenir.
  function reload() {
    resetPaging();
    refetch();
  }

  const items = data ? mergeUnique(data.items, moreItems) : [];
  const total = moreTotal ?? data?.total ?? 0;
  const hasMore = !isLoading && items.length < total;

  async function loadMore() {
    const gen = pageGen.current;
    setLoadingMore(true);
    setMoreError(null);
    const res = await adminApi.listReports(api, { ...statusParam, offset: items.length });
    if (gen !== pageGen.current) return;
    setLoadingMore(false);
    if (res.ok) {
      setMoreItems((prev) => [...prev, ...res.data.items]);
      setMoreTotal(res.data.total);
    } else {
      setMoreError('Daha fazla şikayet yüklenemedi. Lütfen tekrar deneyin.');
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Şikayetler</h1>
          <p className="text-sm text-muted-foreground">{ADMIN_PAGE_DESCRIPTIONS.reports}</p>
        </div>
        {data && (
          <Badge variant="warning" className="text-sm px-3 py-1">{total}</Badge>
        )}
      </div>

      {/* Durum filtresi — AJ-85: adlandırılmış düğme grubu, seçili filtre aria-pressed. */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Duruma göre filtrele">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={filter === f.key}
            onClick={() => changeFilter(f.key)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === f.key ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/70'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-28 animate-pulse rounded-xl bg-muted" />)}
        </div>
      )}

      {error && <AlertMessage type="error" message={error} />}

      {!isLoading && data && items.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-16 text-center">
          <p className="text-3xl">✅</p>
          <p className="mt-2 font-medium">Bu görünümde şikayet yok</p>
          <p className="text-sm text-muted-foreground">
            {filter === 'OPEN' ? 'Şu an incelenecek açık şikayet bulunmuyor.' : 'Bu durumda kayıt yok.'}
          </p>
        </div>
      )}

      {items.length > 0 && (
        <div className="space-y-3">
          {items.map((r) => <ReportCard key={r.id} report={r} onDone={reload} />)}
        </div>
      )}

      {moreError && <AlertMessage type="error" message={moreError} />}

      {hasMore && (
        <div className="flex justify-center">
          <Button variant="outline" size="sm" disabled={loadingMore} onClick={() => void loadMore()}>
            {loadingMore ? UI_TEXT.status.loading : 'Daha fazla göster'}
          </Button>
        </div>
      )}
    </div>
  );
}
