'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  platformLogout,
  getPlatformStats,
  listPendingTenants,
  listAllTenants,
  approveTenant,
  rejectTenant,
  freezeTenant,
  activateTenant,
  listSuspicionReports,
  reviewReport,
  getPlatformLogs,
  type PlatformStats,
  type PendingTenant,
  type TenantItem,
  type SuspicionReport,
  type SystemLog,
} from '@/lib/api/platform';

type Tab = 'overview' | 'pending' | 'tenants' | 'reports' | 'logs';

export default function PlatformDashboard() {
  const router = useRouter();
  const [tab, setTab]             = useState<Tab>('overview');
  const [stats, setStats]         = useState<PlatformStats | null>(null);
  const [pending, setPending]     = useState<PendingTenant[]>([]);
  const [tenants, setTenants]     = useState<TenantItem[]>([]);
  const [reports, setReports]     = useState<SuspicionReport[]>([]);
  const [logs, setLogs]           = useState<SystemLog[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  const loadData = useCallback(async (currentTab: Tab) => {
    setLoading(true); setError(null);
    try {
      if (currentTab === 'overview') {
        const s = await getPlatformStats();
        setStats(s);
      } else if (currentTab === 'pending') {
        const r = await listPendingTenants();
        setPending(r.items);
      } else if (currentTab === 'tenants') {
        const r = await listAllTenants();
        setTenants(r.items);
      } else if (currentTab === 'reports') {
        const r = await listSuspicionReports();
        setReports(r.items);
      } else if (currentTab === 'logs') {
        const r = await getPlatformLogs(200);
        setLogs(r.items);
      }
    } catch (e) {
      if (e instanceof Error && e.message.includes('401')) {
        router.push('/platform/login');
      } else {
        setError(e instanceof Error ? e.message : 'Hata oluştu.');
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { void loadData(tab); }, [tab, loadData]);

  function notify(msg: string) {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(null), 3000);
  }

  async function handleApprove(id: string) {
    await approveTenant(id);
    notify('Kurum onaylandı.');
    void loadData(tab);
  }

  async function handleReject(id: string) {
    const note = window.prompt('Ret nedeni (opsiyonel):') ?? undefined;
    await rejectTenant(id, note);
    notify('Kurum reddedildi.');
    void loadData(tab);
  }

  async function handleFreeze(id: string) {
    await freezeTenant(id);
    notify('Kurum donduruldu.');
    void loadData(tab);
  }

  async function handleActivate(id: string) {
    await activateTenant(id);
    notify('Kurum aktifleştirildi.');
    void loadData(tab);
  }

  async function handleReviewReport(id: string) {
    const note = window.prompt('İnceleme notu (opsiyonel):') ?? undefined;
    await reviewReport(id, note);
    notify('Bildirim incelendi olarak işaretlendi.');
    void loadData(tab);
  }

  const tabs: { key: Tab; label: string; badge?: number }[] = [
    { key: 'overview', label: 'Genel Bakış' },
    { key: 'pending',  label: 'Bekleyen Başvurular', badge: stats?.totals.pendingTenants },
    { key: 'tenants',  label: 'Tüm Kurumlar' },
    { key: 'reports',  label: 'Şüphe Bildirimleri', badge: stats?.totals.unreviewedReports },
    { key: 'logs',     label: 'Sistem Logları' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-foreground">MentiMentor Platform Yönetimi</h1>
        <button
          onClick={() => { void platformLogout().finally(() => router.push('/platform/login')); }}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Çıkış
        </button>
      </header>

      {/* Tabs */}
      <nav className="border-b border-border px-6 flex gap-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              tab === t.key
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
            {t.badge != null && t.badge > 0 && (
              <span className="rounded-full bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 min-w-[20px] text-center">
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Action notification */}
      {actionMsg && (
        <div className="mx-6 mt-4 rounded-lg bg-green-900/50 border border-green-700 px-4 py-2 text-sm text-green-300">
          {actionMsg}
        </div>
      )}

      <main className="px-6 py-6">
        {loading && <p className="text-muted-foreground text-sm">Yükleniyor…</p>}
        {error && <p className="text-destructive text-sm">{error}</p>}

        {/* OVERVIEW */}
        {!loading && tab === 'overview' && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Kurumlar',   value: stats.totals.tenants },
                { label: 'Kullanıcılar', value: stats.totals.users },
                { label: 'Görüşmeler', value: stats.totals.meetings },
                { label: 'Bekleyen Başvuru', value: stats.totals.pendingTenants, red: true },
                { label: 'Mentörler',  value: stats.totals.mentors },
                { label: 'Mentiler',   value: stats.totals.mentis },
                { label: 'Adminler',   value: stats.totals.admins },
                { label: 'İncelenmemiş Bildirim', value: stats.totals.unreviewedReports, red: true },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-card border border-border p-4">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${stat.red && stat.value > 0 ? 'text-destructive' : 'text-foreground'}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3">Son Sistem Logları</h2>
              <div className="rounded-xl border border-border overflow-hidden">
                {stats.recentLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="border-b border-border last:border-0 px-4 py-2.5 flex gap-3 text-sm">
                    <span className={`font-mono text-xs px-1.5 py-0.5 rounded ${
                      log.level === 'ERROR' ? 'bg-red-900/60 text-destructive' :
                      log.level === 'WARN'  ? 'bg-yellow-900/60 text-amber-600 dark:text-amber-400' :
                      'bg-muted text-muted-foreground'
                    }`}>{log.level}</span>
                    <span className="text-muted-foreground text-xs">{log.category}</span>
                    <span className="text-foreground flex-1 truncate">{log.message}</span>
                    <span className="text-muted-foreground text-xs whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString('tr-TR')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PENDING TENANTS */}
        {!loading && tab === 'pending' && (
          <div className="space-y-3">
            {pending.length === 0 && <p className="text-muted-foreground text-sm">Bekleyen başvuru yok.</p>}
            {pending.map((t) => (
              <div key={t.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{t.displayName ?? t.name}</p>
                    <p className="text-xs text-muted-foreground">slug: {t.slug}</p>
                    {t.users[0] && (
                      <p className="text-sm text-muted-foreground">
                        {t.users[0].fullName} — {t.users[0].email}
                      </p>
                    )}
                    {t.verificationNote && (
                      <p className="text-sm text-muted-foreground mt-1">
                        <span className="text-muted-foreground">Kanıt: </span>
                        {t.verificationNote.startsWith('http') ? (
                          <a href={t.verificationNote} target="_blank" rel="noopener noreferrer"
                             className="text-primary underline break-all">
                            {t.verificationNote}
                          </a>
                        ) : t.verificationNote}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">{new Date(t.createdAt).toLocaleString('tr-TR')}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleApprove(t.id)}
                      className="rounded-lg bg-green-700 hover:bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition-colors"
                    >
                      Onayla
                    </button>
                    <button
                      onClick={() => handleReject(t.id)}
                      className="rounded-lg bg-red-800 hover:bg-red-700 px-3 py-1.5 text-sm font-medium text-white transition-colors"
                    >
                      Reddet
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ALL TENANTS */}
        {!loading && tab === 'tenants' && (
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Kurum</th>
                  <th className="px-4 py-3 text-left">Slug</th>
                  <th className="px-4 py-3 text-left">Durum</th>
                  <th className="px-4 py-3 text-left">Plan</th>
                  <th className="px-4 py-3 text-left">Kullanıcı</th>
                  <th className="px-4 py-3 text-left">İşlem</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((t) => (
                  <tr key={t.id} className="border-t border-border hover:bg-muted/50">
                    <td className="px-4 py-3 text-foreground">{t.displayName ?? t.name}</td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{t.slug}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        !t.isActive            ? 'bg-red-900/60 text-destructive' :
                        t.verificationStatus === 'PENDING_REVIEW' ? 'bg-yellow-900/60 text-amber-600 dark:text-amber-400' :
                        t.verificationStatus === 'APPROVED' || t.verificationStatus === 'AUTO_APPROVED' ? 'bg-green-900/60 text-emerald-600 dark:text-emerald-400' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {!t.isActive ? 'Dondurulmuş' : t.verificationStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{t.plan}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t._count?.users ?? '—'}</td>
                    <td className="px-4 py-3">
                      {t.isActive ? (
                        <button onClick={() => handleFreeze(t.id)}
                          className="text-xs text-destructive hover:text-destructive/80">
                          Dondur
                        </button>
                      ) : (
                        <button onClick={() => handleActivate(t.id)}
                          className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300">
                          Aktifleştir
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SUSPICION REPORTS */}
        {!loading && tab === 'reports' && (
          <div className="space-y-3">
            {reports.length === 0 && <p className="text-muted-foreground text-sm">Şüphe bildirimi yok.</p>}
            {reports.map((r) => (
              <div key={r.id} className={`rounded-xl border p-5 ${r.reviewed ? 'border-border bg-card opacity-60' : 'border-yellow-700/50 bg-yellow-900/10'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Kurum: {r.tenantName}</p>
                    <p className="text-sm text-muted-foreground">{r.reporterName} ({r.reporterRole}) — {r.contact}</p>
                    <p className="text-sm text-muted-foreground mt-1">{r.description}</p>
                    {r.reviewNote && <p className="text-xs text-muted-foreground mt-1">Not: {r.reviewNote}</p>}
                    <p className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleString('tr-TR')}</p>
                  </div>
                  {!r.reviewed && (
                    <button
                      onClick={() => handleReviewReport(r.id)}
                      className="rounded-lg bg-muted hover:bg-muted/80 px-3 py-1.5 text-sm font-medium text-foreground transition-colors shrink-0"
                    >
                      İncelendi
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LOGS */}
        {!loading && tab === 'logs' && (
          <div className="rounded-xl border border-border overflow-hidden">
            {logs.map((log) => (
              <div key={log.id} className="border-b border-border last:border-0 px-4 py-2.5 flex gap-3 text-sm">
                <span className={`font-mono text-xs px-1.5 py-0.5 rounded shrink-0 ${
                  log.level === 'ERROR' ? 'bg-red-900/60 text-destructive' :
                  log.level === 'WARN'  ? 'bg-yellow-900/60 text-amber-600 dark:text-amber-400' :
                  'bg-muted text-muted-foreground'
                }`}>{log.level}</span>
                <span className="text-muted-foreground text-xs shrink-0">{log.category}</span>
                <span className="text-foreground flex-1 truncate">{log.message}</span>
                <span className="text-muted-foreground text-xs whitespace-nowrap">
                  {new Date(log.createdAt).toLocaleString('tr-TR')}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
