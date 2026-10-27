'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  isPlatformAuthError,
  getTenantUserDetail,
  issueUserPasswordResetLink,
  type PasswordResetLink,
  type TenantUserDetail,
  type TenantMemberRole,
} from '@/lib/api/platform';
import { certStatusBadge } from '@/lib/enumLabels';
import { UI_TEXT } from '@/lib/uiText';
import { DANGER_PILL_CLASS, INFO_PILL_CLASS, SUCCESS_PILL_CLASS } from '@/lib/a11y/statusColors';

const ROLE_LABEL: Record<TenantMemberRole, string> = {
  ADMIN: 'Admin',
  MENTOR: 'Mentör',
  MENTI: 'Menti',
};

function roleBadgeClass(role: TenantMemberRole): string {
  switch (role) {
    case 'ADMIN':
      return 'bg-primary/15 text-primary';
    case 'MENTOR':
      return INFO_PILL_CLASS;
    case 'MENTI':
      return 'bg-muted text-muted-foreground';
  }
}

function activeBadgeClass(isActive: boolean): string {
  return isActive
    ? SUCCESS_PILL_CLASS
    : DANGER_PILL_CLASS;
}

export default function TenantUserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const tenantId = String(params.id);
  const userId = String(params.userId);

  const [user, setUser] = useState<TenantUserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // U-15: üretilen sıfırlama bağlantısı yalnız bu ekranda, sayfa kapanınca kaybolur (saklanmaz).
  const [resetLink, setResetLink] = useState<PasswordResetLink | null>(null);
  const [resetBusy, setResetBusy] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  const handleError = useCallback(
    (e: unknown) => {
      if (isPlatformAuthError(e)) {
        router.push('/platform/login');
      } else {
        setError(e instanceof Error ? e.message : 'Hata oluştu.');
      }
    },
    [router]
  );

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    getTenantUserDetail(tenantId, userId)
      .then((data) => {
        if (active) setUser(data);
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
  }, [tenantId, userId, handleError]);

  const cert = user ? certStatusBadge(user.certificationStatus) : null;

  async function handleIssueResetLink() {
    if (!window.confirm('Bu kişi için şifre sıfırlama bağlantısı üretilsin mi? İşlem iz kaydına yazılır; bağlantıyı kişiye siz ileteceksiniz.')) return;
    setResetBusy(true);
    setResetError(null);
    try {
      setResetLink(await issueUserPasswordResetLink(tenantId, userId));
    } catch (e) {
      if (isPlatformAuthError(e)) router.push('/platform/login');
      else setResetError(e instanceof Error ? e.message : 'Bağlantı üretilemedi.');
    } finally {
      setResetBusy(false);
    }
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border px-6 py-4">
        <Link
          href={`/platform/tenants/${tenantId}`}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Kurum Detayına Dön
        </Link>
      </header>

      <main className="px-6 py-6 space-y-6 max-w-2xl">
        {loading && <p className="text-muted-foreground text-sm">{UI_TEXT.status.loading}</p>}
        {error && !loading && <p className="text-destructive text-sm">{error}</p>}

        {!loading && !error && user && (
          <div className="rounded-xl bg-card border border-border p-5 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl font-bold text-foreground">{user.fullName}</h1>
              <span className={`text-xs px-2 py-0.5 rounded-full ${roleBadgeClass(user.role)}`}>
                {ROLE_LABEL[user.role]}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeBadgeClass(user.isActive)}`}>
                {user.isActive ? 'Aktif' : 'Pasif'}
              </span>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground text-xs">E-posta</dt>
                <dd className="text-foreground font-mono">{user.emailMasked}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">DISC</dt>
                <dd className="text-foreground">{user.discType ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">Sertifika</dt>
                <dd>
                  {cert && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${cert.className}`}>
                      {cert.label}
                    </span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">Sertifikalı mı</dt>
                <dd className="text-foreground">{user.isCertified ? 'Evet' : 'Hayır'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">Öğrenme Yolculuğu</dt>
                <dd className="text-foreground">
                  {user.learningJourneyCompletedAt
                    ? new Date(user.learningJourneyCompletedAt).toLocaleDateString('tr-TR')
                    : 'Tamamlanmadı'}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">Katılım Tarihi</dt>
                <dd className="text-foreground">
                  {new Date(user.joinedAt).toLocaleDateString('tr-TR')}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">KVKK Rızası</dt>
                <dd className="text-foreground">{user.hasKvkkConsent ? 'Var' : 'Yok'}</dd>
              </div>
            </dl>
          </div>
        )}

        {/* U-15 (KARAR-84 B): e-posta çalışmadığında şifresini unutan kişiye yönetici bağlantı iletir. */}
        {!loading && !error && user && (
          <div className="rounded-xl bg-card border border-border p-5 space-y-3">
            <h2 className="text-sm font-semibold text-foreground">Şifre sıfırlama</h2>
            <p className="text-xs text-muted-foreground">
              E-posta çalışmıyorsa bu kişi için tek kullanımlık bir bağlantı üretip kendisine güvenli bir yoldan iletin.
              Bağlantı 60 dakika geçerlidir; her üretim iz kaydına yazılır.
            </p>
            <button
              type="button"
              onClick={handleIssueResetLink}
              disabled={resetBusy}
              className="text-sm px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-50"
            >
              {resetBusy ? UI_TEXT.status.loading : 'Şifre sıfırlama bağlantısı üret'}
            </button>
            {resetError && <p role="alert" className="text-destructive text-sm">{resetError}</p>}
            {resetLink && (
              <div role="status" className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  Bağlantı {resetLink.expiresInMinutes} dakika geçerli, tek kullanımlık:
                </p>
                <input
                  readOnly
                  aria-label="Şifre sıfırlama bağlantısı"
                  value={resetLink.resetUrl}
                  onFocus={(e) => e.currentTarget.select()}
                  className="w-full text-xs font-mono px-2 py-1.5 rounded border border-border bg-muted"
                />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
