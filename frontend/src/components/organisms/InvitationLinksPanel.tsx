'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '@/lib/api/client';
import { UI_TEXT } from '@/lib/uiText';

/**
 * U-12B (KARAR-82 B): kurum yöneticisi ürettiği toplu davet bağlantılarını görür ve iptal eder.
 * Sızan bağlantı artık 7 günü beklemeden kapatılabilir. Liste bağlantının KENDİSİNİ göstermez
 * (backend token döndürmez) — yalnız rol, tarih ve durum.
 */
export interface InvitationLinkRow {
  id: string;
  role: 'MENTOR' | 'MENTI' | 'ADMIN';
  createdAt: string;
  expiresAt: string;
  revokedAt: string | null;
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
}

const ROLE_LABEL: Record<InvitationLinkRow['role'], string> = { MENTOR: 'Mentör', MENTI: 'Menti', ADMIN: 'Yönetici' };
const STATUS_LABEL: Record<InvitationLinkRow['status'], string> = {
  ACTIVE: 'Geçerli',
  EXPIRED: 'Süresi doldu',
  REVOKED: 'İptal edildi',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export function InvitationLinksPanel({
  tenantId,
  accessToken,
  refreshKey,
}: {
  tenantId: string;
  accessToken: string;
  /** Yeni bağlantı üretilince artar → liste tazelenir. */
  refreshKey: number;
}) {
  const [items, setItems] = useState<InvitationLinkRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await apiClient<{ items: InvitationLinkRow[] }>(`/api/tenants/${tenantId}/invitations`, { token: accessToken });
    if (res.ok) {
      setItems(res.data.items);
      setError(null);
    } else {
      setError(res.error.message ?? 'Davet linkleri yüklenemedi.');
    }
  }, [tenantId, accessToken]);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  async function revoke(id: string) {
    if (!window.confirm('Bu davet linki iptal edilsin mi? Linke sahip olan kimse artık katılamaz. Bu işlem geri alınmaz; gerekirse yeni link oluşturun.')) return;
    setBusyId(id);
    const res = await apiClient<{ ok: boolean }>(`/api/tenants/${tenantId}/invitations/${id}/revoke`, {
      method: 'POST',
      token: accessToken,
    });
    setBusyId(null);
    await load();
    // Liste yüklemesi hatayı temizler; iptal hatası ondan SONRA yazılır ki yönetici görsün (7b notu).
    if (!res.ok) setError(res.error.message ?? 'Link iptal edilemedi.');
  }

  return (
    <section aria-labelledby="davet-linkleri-baslik" className="rounded-xl border border-border p-4 space-y-3">
      <h2 id="davet-linkleri-baslik" className="text-sm font-semibold">Oluşturulan davet linkleri (son 30 gün)</h2>
      <p className="text-xs text-muted-foreground">
        Bir link yanlış kişilere ulaştıysa iptal edin; o linkle artık kimse katılamaz.
      </p>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      {items === null && !error && <p className="text-sm text-muted-foreground">{UI_TEXT.status.loading}</p>}
      {items && items.length === 0 && <p className="text-sm text-muted-foreground">Henüz link oluşturulmadı.</p>}
      {items && items.length > 0 && (
        <ul className="divide-y divide-border">
          {items.map((l) => (
            <li key={l.id} className="flex items-center justify-between gap-3 py-2 text-sm">
              <span>
                {ROLE_LABEL[l.role]} · {formatDate(l.createdAt)} · <span className="text-muted-foreground">{STATUS_LABEL[l.status]}</span>
              </span>
              {l.status === 'ACTIVE' && (
                <button
                  type="button"
                  onClick={() => revoke(l.id)}
                  disabled={busyId === l.id}
                  className="text-xs text-destructive hover:text-destructive/80 disabled:opacity-50"
                >
                  {busyId === l.id ? 'İptal ediliyor…' : 'Linki iptal et'}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
