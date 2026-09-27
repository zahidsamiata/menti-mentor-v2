'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  isPlatformAuthError,
  getTenantUserDetail,
  type TenantUserDetail,
  type TenantMemberRole,
} from '@/lib/api/platform';
import { certStatusBadge } from '@/lib/enumLabels';
import { UI_TEXT } from '@/lib/uiText';

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
      return 'bg-sky-900/60 text-sky-600 dark:text-sky-400';
    case 'MENTI':
      return 'bg-muted text-muted-foreground';
  }
}

function activeBadgeClass(isActive: boolean): string {
  return isActive
    ? 'bg-green-900/60 text-emerald-600 dark:text-emerald-400'
    : 'bg-red-900/60 text-destructive';
}

export default function TenantUserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const tenantId = String(params.id);
  const userId = String(params.userId);

  const [user, setUser] = useState<TenantUserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      </main>
    </div>
  );
}
