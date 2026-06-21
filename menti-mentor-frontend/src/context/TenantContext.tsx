'use client';

import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface TenantContextValue {
  activeTenantId: string;
  setActiveTenantId: (id: string) => void;
}

const TenantContext = createContext<TenantContextValue | undefined>(undefined);

export function TenantProvider({
  children,
  initialTenantId,
}: {
  children: ReactNode;
  initialTenantId: string;
}) {
  const [activeTenantId, setActiveTenantId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('X-Tenant-Id') ?? initialTenantId;
    }
    return initialTenantId;
  });

  return (
    <TenantContext.Provider value={{ activeTenantId, setActiveTenantId }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant(): TenantContextValue {
  const context = useContext(TenantContext);
  if (!context) throw new Error('useTenant, TenantProvider içinde kullanılmalı.');
  return context;
}
