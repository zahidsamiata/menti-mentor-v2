'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { algorithmTunerApi, type ReportingFrequency } from '@/lib/api/algorithmTuner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog';

const FREQ_OPTIONS: { value: ReportingFrequency; label: string; desc: string }[] = [
  { value: 'WEEKLY',   label: 'Haftalık',    desc: 'Her Pazar analiz yapılır' },
  { value: 'BIWEEKLY', label: '2 Haftada 1', desc: '1. ve 3. Pazar analiz yapılır' },
  { value: 'MONTHLY',  label: 'Aylık',       desc: 'Ayın ilk Pazar günü analiz yapılır' },
];

export default function AlgorithmTunerPage() {
  const { user } = useAuth();
  const api = useApiClient();

  const { data, isLoading, error, refetch } = useQuery(
    () => algorithmTunerApi.getPending(api),
    [api],
  );

  const [actionError, setActionError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'approve' | 'reject' | null>(null);
  const [selectedFreq, setSelectedFreq] = useState<ReportingFrequency>('WEEKLY');
  const [freqSaved, setFreqSaved] = useState(false);
  const [freqSaving, setFreqSaving] = useState(false);

  const pending = data?.pending ?? null;

  async function handleAction(action: 'approve' | 'reject') {
    setActionLoading(true);
    setActionError(null);
    const result = action === 'approve'
      ? await algorithmTunerApi.approve(api)
      : await algorithmTunerApi.reject(api);
    setActionLoading(false);
    setConfirmAction(null);
    if (result.ok) { refetch(); }
    else { setActionError(result.error.message ?? 'İşlem başarısız.'); }
  }

  async function saveFrequency() {
    if (!user?.tenantId) return;
    setFreqSaving(true);
    const result = await algorithmTunerApi.updateFrequency(api, user.tenantId, selectedFreq);
    setFreqSaving(false);
    if (result.ok) setFreqSaved(true);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Algoritma Kalibrasyon Merkezi</h1>
        <p className="text-sm text-muted-foreground">
          Eşleştirme ağırlıklarını NPS verilerine göre optimize edin.
        </p>
      </div>

      {actionError && <AlertMessage type="error" message={actionError} />}
      {error && <AlertMessage type="error" message={error} />}

      {/* Bildirim Sıklığı */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Analiz Bildirimi Sıklığı</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Sistem NPS verilerini ne sıklıkla analiz edip size öneri sunacak?
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {FREQ_OPTIONS.map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => { setSelectedFreq(value); setFreqSaved(false); }}
                className={`rounded-xl border p-3 text-left transition-colors ${
                  selectedFreq === value
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:bg-muted'
                }`}
              >
                <p className="font-medium text-sm">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button size="sm" onClick={saveFrequency} disabled={freqSaving}>
              {freqSaving ? 'Kaydediliyor…' : 'Kaydet'}
            </Button>
            {freqSaved && <span className="text-xs text-green-600">✓ Kaydedildi</span>}
          </div>
        </CardContent>
      </Card>

      {/* Bekleyen Öneri */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Bekleyen Kalibrasyon Önerisi</CardTitle>
          {pending && (
            <Badge variant="warning" className="text-xs">Onay Bekliyor</Badge>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-32 animate-pulse rounded-xl bg-muted" />
          ) : !pending ? (
            <div className="flex flex-col items-center py-10 text-center">
              <p className="text-3xl">✅</p>
              <p className="mt-2 font-medium">Bekleyen öneri yok</p>
              <p className="text-sm text-muted-foreground mt-1">
                Sistem yeterli veri biriktirdiğinde yeni bir öneri hazırlayacak.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Neden bu öneri */}
              <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Neden bu öneri?</p>
                <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">{pending.reason}</p>
              </div>

              {/* NPS Verileri */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border p-3 text-center">
                  <p className="text-xs text-muted-foreground">1. Ay NPS</p>
                  <p className="text-2xl font-bold mt-1">
                    {pending.phase1Nps.avgNps ?? '—'}
                  </p>
                  <p className="text-xs text-muted-foreground">{pending.phase1Nps.sampleSize} yanıt</p>
                </div>
                <div className="rounded-xl border border-border p-3 text-center">
                  <p className="text-xs text-muted-foreground">3. Ay NPS</p>
                  <p className="text-2xl font-bold mt-1">
                    {pending.phase3Nps.avgNps ?? '—'}
                  </p>
                  <p className="text-xs text-muted-foreground">{pending.phase3Nps.sampleSize} yanıt</p>
                </div>
              </div>

              {/* Ağırlık değişimi */}
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-muted-foreground">Kriter</th>
                      <th className="px-4 py-2 text-center font-medium text-muted-foreground">Mevcut</th>
                      <th className="px-4 py-2 text-center font-medium text-muted-foreground">Önerilen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="px-4 py-3">Sektör Ağırlığı</td>
                      <td className="px-4 py-3 text-center">%{Math.round(pending.previousWeights.sectorWeight * 100)}</td>
                      <td className="px-4 py-3 text-center font-bold text-primary">
                        %{Math.round(pending.newWeights.sectorWeight * 100)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Karakter/DISC Ağırlığı</td>
                      <td className="px-4 py-3 text-center">%{Math.round(pending.previousWeights.discWeight * 100)}</td>
                      <td className="px-4 py-3 text-center font-bold text-primary">
                        %{Math.round(pending.newWeights.discWeight * 100)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-muted-foreground">
                Bu değişiklik küçük (±%5) ve geri alınabilir. Son karar sizindir.
              </p>

              <div className="flex gap-3">
                <Button onClick={() => setConfirmAction('approve')} disabled={actionLoading}>
                  ✅ Onayla ve Uygula
                </Button>
                <Button
                  variant="outline"
                  className="text-destructive border-destructive/40"
                  onClick={() => setConfirmAction('reject')}
                  disabled={actionLoading}
                >
                  ❌ Reddet
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={confirmAction !== null}
        title={confirmAction === 'approve' ? 'Kalibrasyon Önerisini Onayla' : 'Kalibrasyon Önerisini Reddet'}
        description={
          confirmAction === 'approve'
            ? 'Algoritma ağırlıkları önerilen değerlere güncellenecek.'
            : 'Öneri reddedilecek, mevcut ağırlıklar korunacak.'
        }
        confirmLabel={confirmAction === 'approve' ? 'Onayla' : 'Reddet'}
        variant={confirmAction === 'reject' ? 'danger' : 'default'}
        isLoading={actionLoading}
        onConfirm={() => confirmAction && handleAction(confirmAction)}
        onCancel={() => setConfirmAction(null)}
      />
    </div>
  );
}
