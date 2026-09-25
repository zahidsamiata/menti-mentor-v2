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

import { type ReactNode } from 'react';
import { TenantProvider } from './TenantProvider';
import { useAuth } from './AuthProvider';

/*
 * ⚠️ GÜNCELLEME 2026-09-25 (KR-03): marka artık AuthProvider'ın oturum yanıtlarından
 * (login / refresh / me — hepsi oturumdaki kullanıcının KENDİ kurumu) gelir. Eskiden burada
 * `GET /api/tenants/:id` çağrılıyordu; o uç yalnız platform yöneticisine açık olduğu için
 * normal kullanıcıda her seferinde reddediliyor ve marka hiç yüklenmiyordu.
 */
export function AuthTenantBridge({ children }: { children: ReactNode }) {
  const { tenant, isLoading } = useAuth();

  return (
    <TenantProvider tenant={tenant} isLoading={isLoading}>
      {children}
    </TenantProvider>
  );
}
