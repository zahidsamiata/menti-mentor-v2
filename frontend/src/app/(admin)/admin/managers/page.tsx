'use client';

import { useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { adminApi } from '@/lib/api/admin';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { Button } from '@/components/ui/button';

export default function ManagersPage() {
  const api       = useApiClient();
  const [msg, setMsg] = useState<string | null>(null);
  const [showAssign, setShowAssign] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useQuery(
    () => adminApi.listAdmins(api),
    [],
    { enabled: true },
  );

  // Atama listesi yalnızca panel açılınca çekilir (onaylı kullanıcılar).
  const approved = useQuery(
    () => adminApi.listUsers(api, { approvalStatus: 'APPROVED' }),
    [showAssign],
    { enabled: showAssign },
  );

  function notify(m: string) {
    setMsg(m);
    setTimeout(() => setMsg(null), 3000);
  }

  async function handleDemote(userId: string, name: string) {
    if (!window.confirm(`${name} kullanıcısını yöneticilikten çıkarmak istediğinize emin misiniz?`)) return;
    setBusyId(userId);
    const result = await adminApi.demoteFromAdmin(api, userId);
    setBusyId(null);
    if (result.ok) { notify(`${name} yöneticilikten çıkarıldı.`); refetch(); approved.refetch(); }
    else notify((result as { ok: false; error?: { message?: string } }).error?.message ?? 'Hata oluştu.');
  }

  async function handlePromote(userId: string, name: string) {
    setBusyId(userId);
    const result = await adminApi.promoteToAdmin(api, userId);
    setBusyId(null);
    if (result.ok) { notify(`${name} yönetici olarak atandı.`); refetch(); approved.refetch(); }
    // Backend max-3 ve son-admin kurallarını uygular; hata mesajını Türkçe göster.
    else notify((result as { ok: false; error?: { message?: string } }).error?.message ?? 'Atama başarısız oldu.');
  }

  // Zaten yönetici olanları atama listesinden çıkar (rol kaynağı: gerçek yönetici listesi).
  const adminIds = new Set((data?.items ?? []).map((a) => a.id));
  const assignable = (approved.data?.items ?? []).filter((u) => !adminIds.has(u.id));
  const atAdminLimit = (data?.items.length ?? 0) >= 3;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Yöneticiler</h1>
          <p className="text-sm text-muted-foreground">
            Kurumunuzdaki tüm yöneticiler. Onaylı kullanıcıları buradan yönetici atayabilir veya çıkarabilirsiniz (en fazla 3 yönetici).
          </p>
        </div>
        <Button size="sm" onClick={() => setShowAssign((v) => !v)} disabled={atAdminLimit && !showAssign}>
          {showAssign ? 'Kapat' : '+ Yönetici Ata'}
        </Button>
      </div>

      {msg && <AlertMessage type="success" message={msg} />}
      {error && <AlertMessage type="error" message={error} />}
      {atAdminLimit && (
        <AlertMessage type="info" message="En fazla 3 yönetici olabilir. Yeni atama için önce bir yöneticiyi çıkarın." />
      )}

      {/* Atama paneli — onaylı, henüz yönetici olmayan kullanıcılar */}
      {showAssign && (
        <div className="rounded-xl border p-4 space-y-3">
          <p className="text-sm font-medium">Yönetici atanacak kullanıcı seç</p>
          {approved.isLoading && <p className="text-sm text-muted-foreground">Yükleniyor…</p>}
          {approved.error && <AlertMessage type="error" message={approved.error} />}
          {approved.data && assignable.length === 0 && (
            <p className="text-sm text-muted-foreground">Atanabilecek onaylı kullanıcı yok.</p>
          )}
          {assignable.map((u) => (
            <div key={u.id} className="flex items-center justify-between gap-3 border-b last:border-0 pb-2 last:pb-0">
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{u.fullName}</p>
                <p className="text-xs text-muted-foreground truncate">{u.email}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                disabled={busyId === u.id || atAdminLimit}
                onClick={() => handlePromote(u.id, u.fullName)}
              >
                {busyId === u.id ? 'Atanıyor…' : 'Yönetici yap'}
              </Button>
            </div>
          ))}
        </div>
      )}

      {isLoading && <p className="text-sm text-muted-foreground">Yükleniyor…</p>}

      {data && (
        <div className="rounded-xl border overflow-hidden">
          {data.items.length === 0 && (
            <p className="px-4 py-6 text-sm text-muted-foreground text-center">Henüz yönetici yok.</p>
          )}
          {data.items.map((admin) => (
            <div key={admin.id} className="flex items-center justify-between px-4 py-3 border-b last:border-0">
              <div>
                <p className="font-medium text-sm">{admin.fullName}</p>
                <p className="text-xs text-muted-foreground">{admin.email}</p>
              </div>
              {data.items.length > 1 && (
                <button
                  onClick={() => handleDemote(admin.id, admin.fullName)}
                  disabled={busyId === admin.id}
                  className="text-xs text-destructive hover:text-destructive/80 transition-colors disabled:opacity-50"
                >
                  Yöneticilikten çıkar
                </button>
              )}
              {data.items.length === 1 && (
                <span className="text-xs text-muted-foreground italic">Son yönetici</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
