'use client';

import { useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { adminApi } from '@/lib/api/admin';
import { AlertMessage } from '@/components/molecules/AlertMessage';

export default function ManagersPage() {
  const api       = useApiClient();
  const [msg, setMsg] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useQuery(
    () => adminApi.listAdmins(api),
    [],
    { enabled: true },
  );

  function notify(m: string) {
    setMsg(m);
    setTimeout(() => setMsg(null), 3000);
  }

  async function handleDemote(userId: string, name: string) {
    if (!window.confirm(`${name} kullanıcısını yöneticilikten çıkarmak istediğinize emin misiniz?`)) return;
    const result = await adminApi.demoteFromAdmin(api, userId);
    if (result.ok) { notify(`${name} yöneticilikten çıkarıldı.`); refetch(); }
    else notify((result as { ok: false; error?: { message?: string } }).error?.message ?? 'Hata oluştu.');
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-2xl font-bold">Yöneticiler</h1>
      <p className="text-sm text-muted-foreground">
        Kurumunuzdaki tüm yöneticiler. Kullanıcıları onaylama ekranından yönetici olarak atayabilirsiniz.
      </p>

      {msg && <AlertMessage type="success" message={msg} />}
      {error && <AlertMessage type="error" message={error} />}

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
                  className="text-xs text-red-500 hover:text-red-600 transition-colors"
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
