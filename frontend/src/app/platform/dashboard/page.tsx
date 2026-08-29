'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  isPlatformAuthError,
  platformLogout,
  getPlatformStats,
  listPendingTenants,
  listAllTenants,
  approveTenant,
  rejectTenant,
  requestTenantCorrection,
  freezeTenant,
  activateTenant,
  listSuspicionReports,
  reviewReport,
  getPlatformLogs,
  listUserReports,
  reviewUserReport,
  getAnomalies,
  getPlatformHealth,
  type PlatformStats,
  type PlatformHealth,
  type PendingTenant,
  type TenantItem,
  type SuspicionReport,
  type SystemLog,
  type UserReport,
  type AnomalyFlag,
} from '@/lib/api/platform';
import { ThemeToggle } from '@/components/molecules/ThemeToggle';

type Tab = 'overview' | 'pending' | 'tenants' | 'reports' | 'abuse' | 'logs';

export default function PlatformDashboard() {
  const router = useRouter();
  const [tab, setTab]             = useState<Tab>('overview');
  const [stats, setStats]         = useState<PlatformStats | null>(null);
  const [health, setHealth]       = useState<PlatformHealth | null>(null);
  const [pending, setPending]     = useState<PendingTenant[]>([]);
  const [tenants, setTenants]     = useState<TenantItem[]>([]);
  const [reports, setReports]     = useState<SuspicionReport[]>([]);
  const [logs, setLogs]           = useState<SystemLog[]>([]);
  const [userReports, setUserReports] = useState<UserReport[]>([]);
  const [anomalies, setAnomalies] = useState<AnomalyFlag[]>([]);
  const [logCategory, setLogCategory] = useState<string>(''); // '' = tümü, 'AUDIT' = denetim izi, 'ERROR' = hatalar
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  // #37: düzeltme-iste diyaloğu — hangi kurum + not metni
  const [correctionFor, setCorrectionFor] = useState<{ id: string; name: string } | null>(null);
  const [correctionNote, setCorrectionNote] = useState('');
  const [correctionSaving, setCorrectionSaving] = useState(false);

  const loadData = useCallback(async (currentTab: Tab) => {
    setLoading(true); setError(null);
    try {
      if (currentTab === 'overview') {
        const [s, h] = await Promise.all([getPlatformStats(), getPlatformHealth()]);
        setStats(s);
        setHealth(h);
      } else if (currentTab === 'pending') {
        const r = await listPendingTenants();
        setPending(r.items);
      } else if (currentTab === 'tenants') {
        const r = await listAllTenants();
        setTenants(r.items);
      } else if (currentTab === 'reports') {
        const r = await listSuspicionReports();
        setReports(r.items);
      } else if (currentTab === 'abuse') {
        const [rep, anom] = await Promise.all([listUserReports(), getAnomalies()]);
        setUserReports(rep.items);
        setAnomalies(anom.items);
      } else if (currentTab === 'logs') {
        // AUDIT bir kategori, ERROR bir seviyedir → doğru parametreye eşle.
        const isError = logCategory === 'ERROR';
        const r = await getPlatformLogs(200, isError ? undefined : (logCategory || undefined), isError ? 'ERROR' : undefined);
        setLogs(r.items);
      }
    } catch (e) {
      if (isPlatformAuthError(e)) {
        router.push('/platform/login');
      } else {
        setError(e instanceof Error ? e.message : 'Hata oluştu.');
      }
    } finally {
      setLoading(false);
    }
  }, [router, logCategory]);

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

  // #37: düzeltme iste — reddetmek yerine kuruma revizyon notu gönder
  async function submitCorrection() {
    if (!correctionFor) return;
    const note = correctionNote.trim();
    if (note.length < 10) return; // buton zaten disabled; ekstra güvenlik
    setCorrectionSaving(true);
    try {
      await requestTenantCorrection(correctionFor.id, note);
      setCorrectionFor(null);
      setCorrectionNote('');
      notify('Düzeltme talebi gönderildi.');
      void loadData(tab);
    } catch (e) {
      notify(e instanceof Error ? e.message : 'Düzeltme talebi gönderilemedi.');
    } finally {
      setCorrectionSaving(false);
    }
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

  async function handleReviewUserReport(id: string, status: 'REVIEWED' | 'DISMISSED') {
    const note = window.prompt('İnceleme notu (opsiyonel):') ?? undefined;
    await reviewUserReport(id, status, note);
    notify(status === 'DISMISSED' ? 'Şikayet reddedildi.' : 'Şikayet incelendi.');
    void loadData(tab);
  }

  const tabs: { key: Tab; label: string; badge?: number }[] = [
    { key: 'overview', label: 'Genel Bakış' },
    { key: 'pending',  label: 'Bekleyen Başvurular', badge: stats?.totals.pendingTenants },
    { key: 'tenants',  label: 'Tüm Kurumlar' },
    { key: 'reports',  label: 'Şüphe Bildirimleri', badge: stats?.totals.unreviewedReports },
    { key: 'abuse',    label: 'Kullanıcı Şikayetleri' },
    { key: 'logs',     label: 'Sistem Logları' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-foreground">MentiMentor Platform Yönetimi</h1>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => { void platformLogout().finally(() => router.push('/platform/login')); }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Çıkış
          </button>
        </div>
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
            {/* Sistem Sağlığı — basit yeşil/kırmızı özet */}
            {health && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <HealthPill label="Veritabanı" ok={health.db === 'connected'} okText="Bağlı" badText="Kesik" />
                <HealthPill label="E-posta (SMTP)" ok={health.mail === 'configured'} okText="Yapılandırılmış" badText="Eksik yapılandırma" />
                <HealthPill label="Son 24s Kritik Hata" ok={health.recentErrors === 0} okText="0 hata" badText={`${health.recentErrors} hata`} />
                <div className="rounded-xl border border-border bg-card p-3">
                  <p className="text-xs text-muted-foreground">Çalışma Süresi</p>
                  <p className="text-sm font-semibold text-foreground mt-1">
                    {Math.floor(health.uptime / 3600)}s {Math.floor((health.uptime % 3600) / 60)}dk
                  </p>
                </div>
              </div>
            )}

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
                      onClick={() => { setCorrectionFor({ id: t.id, name: t.name }); setCorrectionNote(''); }}
                      className="rounded-lg bg-amber-600 hover:bg-amber-500 px-3 py-1.5 text-sm font-medium text-white transition-colors"
                    >
                      Düzeltme İste
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

        {/* #37: Düzeltme İste diyaloğu — kuruma revizyon notu (red DEĞİL). PII uyarılı. */}
        {correctionFor && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => !correctionSaving && setCorrectionFor(null)}
          >
            <div
              className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-semibold">Düzeltme Talebi</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                <strong>{correctionFor.name}</strong> kurumundan hangi bilgileri güncellemesini istiyorsunuz?
                Başvuru reddedilmez; kurum notu görüp bilgilerini düzeltip tekrar gönderebilir.
              </p>
              <textarea
                value={correctionNote}
                onChange={(e) => setCorrectionNote(e.target.value)}
                rows={4}
                maxLength={1000}
                autoFocus
                placeholder="Örn: Lütfen kurumsal e-posta adresi veya resmi bir belge/bağlantı ekleyin."
                className="mt-3 w-full rounded-lg border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                ⚠️ Bu not kuruma iletilir. Kişisel veri (kimlik no, telefon vb.) yazmayın. En az 10 karakter.
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setCorrectionFor(null)}
                  disabled={correctionSaving}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  onClick={submitCorrection}
                  disabled={correctionSaving || correctionNote.trim().length < 10}
                  className="rounded-lg bg-amber-600 hover:bg-amber-500 px-3 py-1.5 text-sm font-medium text-white transition-colors disabled:opacity-50"
                >
                  {correctionSaving ? 'Gönderiliyor…' : 'Düzeltme İste'}
                </button>
              </div>
            </div>
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
                  <tr
                    key={t.id}
                    onClick={() => router.push(`/platform/tenants/${t.id}`)}
                    className="border-t border-border hover:bg-muted/50 cursor-pointer"
                  >
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
                        <button onClick={(e) => { e.stopPropagation(); void handleFreeze(t.id); }}
                          className="text-xs text-destructive hover:text-destructive/80">
                          Dondur
                        </button>
                      ) : (
                        <button onClick={(e) => { e.stopPropagation(); void handleActivate(t.id); }}
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

        {/* USER REPORTS + ANOMALIES */}
        {!loading && tab === 'abuse' && (
          <div className="space-y-6">
            {/* Otomatik tespit (basit kural v1) */}
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3">
                Otomatik İşaretlenenler <span className="font-normal">(çok şikayet / çok reddedilen — v1)</span>
              </h2>
              {anomalies.length === 0 ? (
                <p className="text-muted-foreground text-sm">İşaretli kullanıcı yok.</p>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {anomalies.map((a) => (
                    <div key={a.userId} className="rounded-xl border border-yellow-700/50 bg-yellow-900/10 p-3">
                      <p className="font-medium text-foreground text-sm truncate">{a.fullName}</p>
                      <p className="text-xs text-muted-foreground">{a.reasons.join(' · ')}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Kullanıcı şikayetleri */}
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3">Kullanıcı Şikayetleri</h2>
              <div className="space-y-3">
                {userReports.length === 0 && <p className="text-muted-foreground text-sm">Şikayet yok.</p>}
                {userReports.map((r) => (
                  <div key={r.id} className={`rounded-xl border p-5 ${r.status !== 'OPEN' ? 'border-border bg-card opacity-60' : 'border-yellow-700/50 bg-yellow-900/10'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1 min-w-0">
                        <p className="font-semibold text-foreground text-sm">
                          {r.reporter.fullName} → {r.target.fullName}
                          <span className="ml-2 text-xs font-normal text-muted-foreground">({r.reason})</span>
                        </p>
                        <p className="text-xs text-muted-foreground">Kurum: {r.tenantName} · {r.status}</p>
                        {r.description && <p className="text-sm text-muted-foreground mt-1">{r.description}</p>}
                        {r.reviewNote && <p className="text-xs text-muted-foreground mt-1">Not: {r.reviewNote}</p>}
                        <p className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleString('tr-TR')}</p>
                      </div>
                      {r.status === 'OPEN' && (
                        <div className="flex flex-col gap-2 shrink-0">
                          <button
                            onClick={() => handleReviewUserReport(r.id, 'REVIEWED')}
                            className="rounded-lg bg-muted hover:bg-muted/80 px-3 py-1.5 text-sm font-medium text-foreground transition-colors"
                          >
                            İncelendi
                          </button>
                          <button
                            onClick={() => handleReviewUserReport(r.id, 'DISMISSED')}
                            className="rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            Reddet
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LOGS */}
        {!loading && tab === 'logs' && (
          <div className="space-y-3">
            {/* Filtre: Tümü / Denetim İzi (AUDIT) / Hatalar (ERROR seviyesi) */}
            <div className="flex gap-2">
              {[
                { key: '', label: 'Tümü' },
                { key: 'AUDIT', label: 'Denetim İzi' },
                { key: 'ERROR', label: 'Hatalar' },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setLogCategory(f.key)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${
                    logCategory === f.key
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {logCategory === 'AUDIT' && (
              <p className="text-xs text-muted-foreground">
                Platform yöneticisinin kurum/kullanıcı verisine erişim ve aksiyonlarının denetim izi (KVKK). İçerik değil, yalnızca eylem loglanır.
              </p>
            )}

            <div className="rounded-xl border border-border overflow-hidden">
              {logs.length === 0 && <p className="px-4 py-3 text-sm text-muted-foreground">Kayıt yok.</p>}
              {logs.map((log) => {
                const meta = (log.meta ?? null) as Record<string, unknown> | null;
                const target = meta?.['targetTenantId'] ?? meta?.['targetId'];
                return (
                  <div key={log.id} className="border-b border-border last:border-0 px-4 py-2.5 flex gap-3 text-sm">
                    <span className={`font-mono text-xs px-1.5 py-0.5 rounded shrink-0 ${
                      log.level === 'ERROR' ? 'bg-red-900/60 text-destructive' :
                      log.level === 'WARN'  ? 'bg-yellow-900/60 text-amber-600 dark:text-amber-400' :
                      log.category === 'AUDIT' ? 'bg-blue-900/60 text-blue-600 dark:text-blue-400' :
                      'bg-muted text-muted-foreground'
                    }`}>{log.category === 'AUDIT' ? 'AUDIT' : log.level}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-foreground truncate block">{log.message}</span>
                      {log.category === 'AUDIT' && target != null && (
                        <span className="text-muted-foreground text-xs">hedef: {String(target)} · IP: {String(meta?.['ip'] ?? '—')}</span>
                      )}
                    </div>
                    <span className="text-muted-foreground text-xs whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString('tr-TR')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/** Basit yeşil/kırmızı sağlık göstergesi (nokta + etiket). */
function HealthPill({ label, ok, okText, badText }: { label: string; ok: boolean; okText: string; badText: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-sm font-semibold mt-1 flex items-center gap-1.5 ${ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}>
        <span className={`inline-block h-2 w-2 rounded-full ${ok ? 'bg-emerald-500' : 'bg-red-500'}`} />
        {ok ? okText : badText}
      </p>
    </div>
  );
}
