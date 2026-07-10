'use client';

/**
 * AuthTenantBridge — Auth ve Tenant provider'larını bağlar.
 *
 * Problem: TenantProvider, tenant verisine ihtiyaç duyar; bu veri
 * AuthProvider'ın login yanıtından gelir. İki provider bağımsız context'te
 * yaşadığından doğrudan birbirinden okuyamazlar.
 *
 * Çözüm: Bu köprü bileşen AuthProvider'ın içinde render edilir, tenant
 * verisini okur ve TenantProvider'ı sararak aşağıya aktarır.
 * Root layout'ta AuthProvider > AuthTenantBridge > {children} şeklinde kullanılır.
 */

import { type ReactNode, useState, useEffect } from 'react';
import { TenantProvider } from './TenantProvider';
import { useAuth } from './AuthProvider';
import { apiClient } from '@/lib/api/client';
import type { TenantBranding } from '@/types/tenant';

type TenantInfoResponse = TenantBranding;

export function AuthTenantBridge({ children }: { children: ReactNode }) {
  const { user, accessToken, isLoading: authLoading } = useAuth();
  const [tenant, setTenant] = useState<TenantBranding | null>(null);
  const [tenantLoading, setTenantLoading] = useState(false);

  useEffect(() => {
    if (!user || !accessToken) {
      setTenant(null);
      return;
    }

    setTenantLoading(true);
    apiClient<TenantInfoResponse>(`/api/tenants/${user.tenantId}`, {
      token: accessToken,
      tenantId: user.tenantId,
    }).then((result) => {
      if (result.ok) setTenant(result.data);
    }).finally(() => setTenantLoading(false));
  }, [user?.tenantId, accessToken]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TenantProvider tenant={tenant} isLoading={authLoading || tenantLoading}>
      {children}
    </TenantProvider>
  );
}
