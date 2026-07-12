'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useTenant } from '@/providers/TenantProvider';
import { TenantLogo } from '@/components/atoms/TenantLogo';
import { DashboardMetricCard } from '@/components/organisms/DashboardMetricCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { matchingApi, mentorFilterApi } from '@/lib/api/matching';
import { meetingsApi } from '@/lib/api/meetings';
import { DailyQuestionWidget } from '@/components/organisms/DailyQuestionWidget';
import { DiscConfidenceWidget } from '@/components/organisms/DiscConfidenceWidget';
import type { DiscType, MentorFilter } from '@/types/matching';

const DISC_OPTIONS: { value: DiscType; label: string; color: string }[] = [
  { value: 'D', label: 'D — Dominant',       color: 'text-red-500' },
  { value: 'I', label: 'I — Influential',    color: 'text-yellow-500' },
  { value: 'S', label: 'S — Steady',         color: 'text-green-500' },
  { value: 'C', label: 'C — Conscientious',  color: 'text-blue-500' },
];

const PLACEHOLDER_METRICS = [
  { label: 'Aktif Mentilerim',       value: '—',  color: 'brand'   as const },
  { label: 'Bekleyen Talepler',      value: '—',  color: 'warning' as const },
  { label: 'Ortalama NPS',           value: '—',  color: 'success' as const },
  { label: 'Tamamlanan Toplantılar', value: '—',  color: 'neutral' as const },
];

export default function MentorDashboardPage() {
  const { user, isLoading } = useAuth();
  const { tenant } = useTenant();
  const api = useApiClient();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) { router.replace('/login'); return; }
    if (user.role !== 'MENTOR' && user.role !== 'ADMIN') {
      router.replace('/dashboard');
    }
  }, [user, isLoading, router]);

  // ── Aday listesi ────────────────────────────────────────────────────────────
  const { data: candidatesData, isLoading: candidatesLoading } = useQuery(
    () => matchingApi.getRankedMentis(api, user?.id ?? ''),
    [api, user?.id],
    { enabled: Boolean(user?.id) },
  );

  // ── Onay bekleyen toplantı talepleri ────────────────────────────────────────
  const { data: pendingMeetings, refetch: refetchPending } = useQuery(
    () => meetingsApi.list(api, { status: 'PENDING' }),
    [api],
    { enabled: Boolean(user?.id) },
  );

  const [meetingActionId, setMeetingActionId] = useState<string | null>(null);

  async function handleMeetingAction(meetingId: string, action: 'approve' | 'reject') {
    setMeetingActionId(meetingId);
    if (action === 'approve') { await meetingsApi.approveMeeting(api, meetingId); }
    else { await meetingsApi.rejectMeeting(api, meetingId); }
    setMeetingActionId(null);
    refetchPending();
  }

  // ── Filtre: mevcut tercihleri yükle ─────────────────────────────────────────
  const { data: savedFilter, isLoading: filterLoading } = useQuery(
    () => mentorFilterApi.get(api, user?.id ?? ''),
    [api, user?.id],
    { enabled: Boolean(user?.id) },
  );

  const [filter, setFilter] = useState<Omit<MentorFilter, 'mentorId'>>({
    minCompatibilityScore: 0,
    blockedDiscTypes: [],
    filterEnabled: true,
  });
  const [filterInitialised, setFilterInitialised] = useState(false);
  const [filterSaving, setFilterSaving] = useState(false);
  const [filterSaved, setFilterSaved] = useState(false);

  // Yüklenen tercihleri form state'e kopyala (bir kez)
  if (savedFilter && !filterInitialised) {
    setFilter({
      minCompatibilityScore: savedFilter.minCompatibilityScore,
      blockedDiscTypes: savedFilter.blockedDiscTypes,
      filterEnabled: savedFilter.filterEnabled,
    });
    setFilterInitialised(true);
  }

  const toggleDiscBlock = useCallback((disc: DiscType) => {
    setFilter((prev) => ({
      ...prev,
      blockedDiscTypes: prev.blockedDiscTypes.includes(disc)
        ? prev.blockedDiscTypes.filter((d) => d !== disc)
        : [...prev.blockedDiscTypes, disc],
    }));
    setFilterSaved(false);
  }, []);

  async function saveFilter() {
    if (!user?.id) return;
    setFilterSaving(true);
    const result = await mentorFilterApi.upsert(api, user.id, filter);
    setFilterSaving(false);
    if (result.ok) setFilterSaved(true);
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {tenant && <TenantLogo tenant={tenant} size={40} />}
          <div>
            <h1 className="text-2xl font-bold">Mentor Paneli</h1>
            <p className="text-sm text-muted-foreground">
              Hoş geldiniz, {user?.fullName?.split(' ')[0] ?? 'Mentor'}
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href="/disc-test">DISC Testini Güncelle</Link>
        </Button>
      </div>

      {/* Profil güvenilirliği + günün sorusu */}
      {user?.id && <DiscConfidenceWidget userId={user.id} />}
      {user?.id && <DailyQuestionWidget userId={user.id} />}

      {/* Metrikler */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {PLACEHOLDER_METRICS.map((m) => (
          <DashboardMetricCard key={m.label} label={m.label} value={m.value} color={m.color} />
        ))}
      </div>

      {/* ── Onay Kuyruğu ─────────────────────────────────────────────────────── */}
      {(pendingMeetings?.items?.length ?? 0) > 0 && (
        <Card className="border-amber-300 dark:border-amber-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Toplantı Talepleri</CardTitle>
            <Badge variant="warning" className="text-xs">
              {pendingMeetings!.items.length} bekliyor
            </Badge>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            {pendingMeetings!.items.map((m) => {
              const start = new Date(m.startsAt).toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' });
              const isActing = meetingActionId === m.id;
              return (
                <div key={m.id} className="flex items-center justify-between py-3 gap-3">
                  <div>
                    <p className="text-sm font-medium">{start}</p>
                    <p className="text-xs text-muted-foreground">{m.format}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      disabled={isActing}
                      onClick={() => handleMeetingAction(m.id, 'approve')}
                    >
                      {isActing ? '…' : 'Onayla'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive border-destructive/40"
                      disabled={isActing}
                      onClick={() => handleMeetingAction(m.id, 'reject')}
                    >
                      Reddet
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* ── Filtrelerim ─────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Filtrelerim</CardTitle>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <span className="text-xs text-muted-foreground">
              {filter.filterEnabled ? 'Filtre Açık' : 'Filtre Kapalı'}
            </span>
            <button
              role="switch"
              aria-checked={filter.filterEnabled}
              onClick={() => { setFilter((p) => ({ ...p, filterEnabled: !p.filterEnabled })); setFilterSaved(false); }}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                filter.filterEnabled ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                  filter.filterEnabled ? 'translate-x-4' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </CardHeader>
        <CardContent className="space-y-5">
          {filterLoading ? (
            <div className="h-24 rounded-xl bg-muted animate-pulse" />
          ) : (
            <>
              {/* Minimum uyum skoru */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Minimum Uyum Skoru</label>
                  <span className="text-sm font-bold text-primary">
                    {filter.minCompatibilityScore === 0
                      ? 'Filtre yok'
                      : `%${filter.minCompatibilityScore}`}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={filter.minCompatibilityScore}
                  disabled={!filter.filterEnabled}
                  onChange={(e) => {
                    setFilter((p) => ({ ...p, minCompatibilityScore: Number(e.target.value) }));
                    setFilterSaved(false);
                  }}
                  className="w-full accent-primary disabled:opacity-40"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 (hepsini göster)</span>
                  <span>100</span>
                </div>
              </div>

              {/* Engellenecek DISC tipleri */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Engellenecek DISC Profilleri</p>
                <p className="text-xs text-muted-foreground">
                  Seçtiğiniz profil tipindeki mentiler listenizde görünmez.
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {DISC_OPTIONS.map(({ value, label, color }) => {
                    const blocked = filter.blockedDiscTypes.includes(value);
                    return (
                      <button
                        key={value}
                        disabled={!filter.filterEnabled}
                        onClick={() => toggleDiscBlock(value)}
                        className={`rounded-xl border px-3 py-2 text-xs font-medium transition-colors disabled:opacity-40 ${
                          blocked
                            ? 'border-destructive bg-destructive/10 text-destructive'
                            : 'border-border bg-background hover:bg-muted'
                        }`}
                      >
                        <span className={blocked ? '' : color}>{label}</span>
                        {blocked && <span className="ml-1 text-destructive">✕</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  onClick={saveFilter}
                  disabled={filterSaving}
                >
                  {filterSaving ? 'Kaydediliyor…' : 'Filtreleri Kaydet'}
                </Button>
                {filterSaved && (
                  <span className="text-xs text-green-600">✓ Kaydedildi</span>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* ── Eşleşme Önerileri ────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Eşleşme Önerileri</CardTitle>
          <Badge variant="secondary" className="text-xs">Algoritmik sıralama</Badge>
        </CardHeader>
        <CardContent>
          {candidatesLoading ? (
            <div className="flex flex-col gap-3 py-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : !candidatesData?.items.length ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              Mevcut filtrelerinize uyan menti adayı bulunamadı.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {candidatesData.items.map((c) => (
                <div key={c.mentiId} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                      {c.mentiName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{c.mentiName}</p>
                      <p className="text-xs text-muted-foreground">
                        Sektör: {c.sectorScore.toFixed(0)}% · DISC: {c.discScore.toFixed(0)}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{c.totalScore.toFixed(0)}</p>
                      <p className="text-xs text-muted-foreground">uyum skoru</p>
                    </div>
                    {c.fallbackLevel > 0 && (
                      <Badge variant="warning" className="text-xs">Geniş arama</Badge>
                    )}
                    {c.warnings.length > 0 && (
                      <Badge variant="destructive" className="text-xs">Uyarı</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Yaklaşan Toplantılar placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Yaklaşan Toplantılar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-6">
            Toplantı modülü yakında buraya entegre edilecek.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
