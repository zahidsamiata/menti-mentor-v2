'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  getTenantOverview,
  listTenantMembers,
  listTenantMeetings,
  getTenantAnalytics,
  type TenantOverview,
  type TenantMember,
  type TenantMeeting,
  type TenantAnalytics,
  type TenantMemberRole,
} from '@/lib/api/platform';
import { KpiCards } from './_components/KpiCards';
import { MembersTable, type RoleFilter } from './_components/MembersTable';
import { MeetingsTable } from './_components/MeetingsTable';
import { DiscSummary } from './_components/DiscSummary';

type DetailTab = 'members' | 'meetings' | 'analytics';

const TABS: { key: DetailTab; label: string }[] = [
  { key: 'members', label: 'Üyeler' },
  { key: 'meetings', label: 'Görüşmeler' },
  { key: 'analytics', label: 'Analizler' },
];

function tenantStatusBadge(tenant: TenantOverview['tenant']) {
  if (!tenant.isActive) return { cls: 'bg-red-900/60 text-destructive', label: 'Dondurulmuş' };
  if (tenant.verificationStatus === 'PENDING_REVIEW')
    return { cls: 'bg-yellow-900/60 text-amber-600 dark:text-amber-400', label: tenant.verificationStatus };
  if (tenant.verificationStatus === 'APPROVED' || tenant.verificationStatus === 'AUTO_APPROVED')
    return { cls: 'bg-green-900/60 text-emerald-600 dark:text-emerald-400', label: tenant.verificationStatus };
  return { cls: 'bg-muted text-muted-foreground', label: tenant.verificationStatus };
}

export default function TenantDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = String(params.id);

  const [overview, setOverview] = useState<TenantOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tab, setTab] = useState<DetailTab>('members');

  // Üyeler
  const [members, setMembers] = useState<TenantMember[]>([]);
  const [membersLoaded, setMembersLoaded] = useState(false);
  const [membersLoading, setMembersLoading] = useState(false);
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('ALL');

  // Görüşmeler
  const [meetings, setMeetings] = useState<TenantMeeting[]>([]);
  const [meetingsLoaded, setMeetingsLoaded] = useState(false);
  const [meetingsLoading, setMeetingsLoading] = useState(false);

  // Analizler
  const [analytics, setAnalytics] = useState<TenantAnalytics | null>(null);
  const [analyticsLoaded, setAnalyticsLoaded] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  const handleError = useCallback(
    (e: unknown) => {
      if (e instanceof Error && e.message.includes('401')) {
        router.push('/platform/login');
      } else {
        setError(e instanceof Error ? e.message : 'Hata oluştu.');
      }
    },
    [router]
  );

  // Overview yükleme
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    getTenantOverview(id)
      .then((data) => {
        if (active) setOverview(data);
      })
      .catch((e) => {
        if (active) handleError(e);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id, handleError]);

  // Üyeler — sekme ilk açıldığında veya rol filtresi değiştiğinde
  const loadMembers = useCallback(async () => {
    setMembersLoading(true);
    try {
      const role = roleFilter === 'ALL' ? undefined : (roleFilter as TenantMemberRole);
      const data = await listTenantMembers(id, { role });
      setMembers(data.members);
      setMembersLoaded(true);
    } catch (e) {
      handleError(e);
    } finally {
      setMembersLoading(false);
    }
  }, [id, roleFilter, handleError]);

  useEffect(() => {
    if (tab === 'members') void loadMembers();
  }, [tab, loadMembers]);

  // Görüşmeler — lazy, tek sefer
  useEffect(() => {
    if (tab !== 'meetings' || meetingsLoaded) return;
    setMeetingsLoading(true);
    listTenantMeetings(id)
      .then((data) => {
        setMeetings(data.meetings);
        setMeetingsLoaded(true);
      })
      .catch(handleError)
      .finally(() => setMeetingsLoading(false));
  }, [tab, meetingsLoaded, id, handleError]);

  // Analizler — lazy, tek sefer
  useEffect(() => {
    if (tab !== 'analytics' || analyticsLoaded) return;
    setAnalyticsLoading(true);
    getTenantAnalytics(id)
      .then((data) => {
        setAnalytics(data);
        setAnalyticsLoaded(true);
      })
      .catch(handleError)
      .finally(() => setAnalyticsLoading(false));
  }, [tab, analyticsLoaded, id, handleError]);

  const badge = overview ? tenantStatusBadge(overview.tenant) : null;

  return (
    <div className="min-h-screen">
      <header className="border-b border-border px-6 py-4">
        <Link
          href="/platform/dashboard"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Tüm Kurumlar
        </Link>
      </header>

      <main className="px-6 py-6 space-y-6">
        {loading && <p className="text-muted-foreground text-sm">Yükleniyor…</p>}
        {error && !loading && <p className="text-destructive text-sm">{error}</p>}

        {!loading && !error && overview && (
          <>
            {/* Kurum başlığı */}
            <div className="rounded-xl bg-card border border-border p-5">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-bold text-foreground">{overview.tenant.name}</h1>
                {badge && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${badge.cls}`}>
                    {badge.label}
                  </span>
                )}
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {overview.tenant.plan}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    overview.tenant.isActive
                      ? 'bg-green-900/60 text-emerald-600 dark:text-emerald-400'
                      : 'bg-red-900/60 text-destructive'
                  }`}
                >
                  {overview.tenant.isActive ? 'Aktif' : 'Pasif'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-mono mt-2">slug: {overview.tenant.slug}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-xs text-muted-foreground">
                <span>
                  Oluşturulma: {new Date(overview.tenant.createdAt).toLocaleString('tr-TR')}
                </span>
                <span>
                  Son görüşme:{' '}
                  {overview.activity.lastMeetingAt
                    ? new Date(overview.activity.lastMeetingAt).toLocaleString('tr-TR')
                    : '—'}
                </span>
                <span>
                  Son üye katılımı:{' '}
                  {overview.activity.lastMemberJoinedAt
                    ? new Date(overview.activity.lastMemberJoinedAt).toLocaleString('tr-TR')
                    : '—'}
                </span>
              </div>
            </div>

            {/* KPI kartları */}
            <KpiCards counts={overview.counts} />

            {/* Sekme çubuğu */}
            <div>
              <nav className="border-b border-border flex gap-1">
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      tab === t.key
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </nav>

              <div className="pt-6">
                {tab === 'members' && (
                  <MembersTable
                    members={members}
                    loading={membersLoading || !membersLoaded}
                    roleFilter={roleFilter}
                    onRoleFilterChange={setRoleFilter}
                  />
                )}
                {tab === 'meetings' && (
                  <MeetingsTable
                    meetings={meetings}
                    loading={meetingsLoading || !meetingsLoaded}
                  />
                )}
                {tab === 'analytics' && (
                  <DiscSummary
                    analytics={analytics}
                    loading={analyticsLoading || !analyticsLoaded}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
