'use client';

/**
 * AJ-72 — Askıdaki kurum yanıtını (403 `KURUM_ASKIDA`) askı ekranına bağlar.
 *
 * Merkezi API istemcisi kodu tanır ama router'a bağımlı değildir (`tenantSuspendedCallbackRef`,
 * `refreshCallbackRef` ile aynı desen). Bu bileşen kök layout'ta (AuthProvider içinde) bir kez
 * render edilir, geri çağrıyı set eder ve kullanıcıyı `/kurum-askida`'ya götürür.
 *
 * Neden AuthProvider'ın içinde değil: yönlendirme router ister; AuthProvider router'sız kalır
 * (birim testleri ve oturum mantığı sayfa gezintisinden bağımsız).
 * Döngü yok: askı ekranı yalnız askı kapısından muaf `/api/auth/me` ucunu çağırır; zaten
 * askı ekranındaysak tekrar yönlendirilmez.
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { tenantSuspendedCallbackRef } from '@/lib/api/client';
import { TENANT_SUSPENDED_PATH } from '@/lib/tenantSuspension';

export function TenantSuspensionRedirect() {
  const router = useRouter();

  useEffect(() => {
    tenantSuspendedCallbackRef.current = () => {
      if (window.location.pathname === TENANT_SUSPENDED_PATH) return;
      router.replace(TENANT_SUSPENDED_PATH);
    };
    return () => { tenantSuspendedCallbackRef.current = null; };
  }, [router]);

  return null;
}
