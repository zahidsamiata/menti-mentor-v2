'use client';

import { useEffect, useState } from 'react';
import { useApiClient } from '@/hooks/useApiClient';
import { adminApi, type RoleHistoryItem } from '@/lib/api/admin';
import { UI_TEXT } from '@/lib/uiText';

/** U-13C (KARAR-83 C): üyenin rol tarihçesi — önceki → yeni rol · tarih · değiştiren yönetici. */
const ROLE_LABEL: Record<RoleHistoryItem['newRole'], string> = { ADMIN: 'Yönetici', MENTOR: 'Mentör', MENTI: 'Menti' };

export function RoleHistory({ userId }: { userId: string }) {
  const api = useApiClient();
  const [items, setItems] = useState<RoleHistoryItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void adminApi.getRoleHistory(api, userId).then((res) => {
      if (!active) return;
      if (res.ok) setItems(res.data.items);
      else setError(res.error.message ?? 'Rol geçmişi yüklenemedi.');
    });
    return () => {
      active = false;
    };
  }, [api, userId]);

  if (error) return <p role="alert" className="text-xs text-destructive">{error}</p>;
  if (!items) return <p className="text-xs text-muted-foreground">{UI_TEXT.status.loading}</p>;
  if (items.length === 0) return <p className="text-xs text-muted-foreground">Rol değişikliği kaydı yok.</p>;
  return (
    <ul className="text-xs text-muted-foreground space-y-0.5" aria-label="Rol geçmişi">
      {items.map((r) => (
        <li key={r.id}>
          {ROLE_LABEL[r.previousRole]} → {ROLE_LABEL[r.newRole]} · {new Date(r.createdAt).toLocaleDateString('tr-TR')}
          {r.changedByName ? ` · değiştiren: ${r.changedByName}` : ''}
        </li>
      ))}
    </ul>
  );
}
