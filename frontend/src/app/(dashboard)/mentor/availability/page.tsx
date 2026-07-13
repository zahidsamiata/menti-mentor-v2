'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { meetingsApi } from '@/lib/api/meetings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertMessage } from '@/components/molecules/AlertMessage';

const WEEKDAYS = [
  { value: 'MON', label: 'Pazartesi' },
  { value: 'TUE', label: 'Salı' },
  { value: 'WED', label: 'Çarşamba' },
  { value: 'THU', label: 'Perşembe' },
  { value: 'FRI', label: 'Cuma' },
  { value: 'SAT', label: 'Cumartesi' },
  { value: 'SUN', label: 'Pazar' },
] as const;

type Weekday = typeof WEEKDAYS[number]['value'];

interface Block { weekday: Weekday; startTime: string; endTime: string }

const WEEKDAY_LABEL: Record<Weekday, string> = Object.fromEntries(
  WEEKDAYS.map(({ value, label }) => [value, label])
) as Record<Weekday, string>;

export default function AvailabilityPage() {
  const { user, isLoading } = useAuth();
  const api = useApiClient();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.replace('/login');
    if (!isLoading && user && user.role !== 'MENTOR') router.replace('/dashboard');
  }, [user, isLoading, router]);

  const { data, isLoading: fetchingBlocks } = useQuery(
    () => meetingsApi.getAvailability(api, user?.id ?? ''),
    [api, user?.id],
    { enabled: Boolean(user?.id) },
  );

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [newBlock, setNewBlock] = useState<Block>({ weekday: 'MON', startTime: '09:00', endTime: '17:00' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data?.blocks) {
      setBlocks(data.blocks as Block[]);
    }
  }, [data]);

  function addBlock() {
    if (newBlock.startTime >= newBlock.endTime) {
      setError('Başlangıç saati bitiş saatinden önce olmalı.');
      return;
    }
    setBlocks((prev) => [...prev, { ...newBlock }]);
    setError(null);
    setSaved(false);
  }

  function removeBlock(index: number) {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    setError(null);
    const result = await meetingsApi.saveAvailability(api, { blocks });
    setSaving(false);
    if (result.ok) {
      setSaved(true);
    } else {
      setError(result.error.message ?? 'Kaydedilemedi.');
    }
  }

  if (isLoading || !user) return null;

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Müsaitlik Takvimim</h1>
        <p className="text-sm text-muted-foreground">
          Mentileriniz bu aralıklarda randevu talep edebilir.
        </p>
      </div>

      {error && <AlertMessage type="error" message={error} />}
      {saved && <AlertMessage type="success" message="Müsaitlik saatleriniz kaydedildi." />}

      {/* Yeni blok ekle */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Yeni Aralık Ekle</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Gün</label>
            <select
              value={newBlock.weekday}
              onChange={(e) => setNewBlock((b) => ({ ...b, weekday: e.target.value as Weekday }))}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            >
              {WEEKDAYS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Başlangıç</label>
              <input
                type="time"
                value={newBlock.startTime}
                onChange={(e) => setNewBlock((b) => ({ ...b, startTime: e.target.value }))}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Bitiş</label>
              <input
                type="time"
                value={newBlock.endTime}
                onChange={(e) => setNewBlock((b) => ({ ...b, endTime: e.target.value }))}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
          <Button onClick={addBlock} variant="outline" className="w-full">+ Ekle</Button>
        </CardContent>
      </Card>

      {/* Mevcut bloklar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">
            Müsait Olduğum Saatler
            {blocks.length > 0 && (
              <span className="ml-2 text-xs font-normal text-muted-foreground">({blocks.length} aralık)</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {fetchingBlocks ? (
            <div className="space-y-2">
              {[1, 2].map((i) => <div key={i} className="h-10 animate-pulse rounded-lg bg-muted" />)}
            </div>
          ) : blocks.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              Henüz müsaitlik eklenmedi. Mentileriniz randevu talep edemez.
            </p>
          ) : (
            <div className="space-y-2">
              {blocks.map((blk, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                  <span className="text-sm">
                    <span className="font-medium">{WEEKDAY_LABEL[blk.weekday]}</span>
                    {' '}{blk.startTime}–{blk.endTime}
                  </span>
                  <button
                    onClick={() => removeBlock(i)}
                    className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Sil"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Button onClick={save} disabled={saving} className="w-full">
        {saving ? 'Kaydediliyor…' : 'Müsaitliği Kaydet'}
      </Button>
    </div>
  );
}
