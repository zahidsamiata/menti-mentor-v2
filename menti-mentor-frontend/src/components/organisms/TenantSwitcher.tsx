'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronsUpDown,
  Check,
  Plus,
  Building2,
  LogOut,
  BadgeCheck,
} from 'lucide-react';

export interface TenantMembership {
  tenantId: string;
  slug: string;
  name: string;
  logoUrl?: string;
  role: 'MENTOR' | 'MENTI';   // Backend UserRole enum: ADMIN | MENTOR | MENTI
  isCertified: boolean;
}

interface TenantSwitcherProps {
  memberships: TenantMembership[];
  activeTenantId: string;
  onSwitch: (tenantId: string) => void;
  onAddTenant?: () => void;
  onSignOut?: () => void;
}

const TENANT_STORAGE_KEY = 'X-Tenant-Id';
const ROLE_LABEL: Record<TenantMembership['role'], string> = {
  MENTOR: 'Mentör',
  MENTI:  'Menti',    // 'MENTEE' değil, backend 'MENTI' döndürür
};

export default function TenantSwitcher({
  memberships,
  activeTenantId,
  onSwitch,
  onAddTenant,
  onSignOut,
}: TenantSwitcherProps) {
  const [open, setOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeMembership =
    memberships.find((m) => m.tenantId === activeTenantId) ?? memberships[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwitch = (tenantId: string) => {
    if (tenantId === activeTenantId) {
      setOpen(false);
      return;
    }
    try {
      localStorage.setItem(TENANT_STORAGE_KEY, tenantId);
    } catch (error) {
      console.warn('Error', error);
    }
    onSwitch(tenantId);
    setOpen(false);
  };

  if (!activeMembership) return null;

  return (
    <div ref={containerRef} className="relative w-full max-w-[280px]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left transition-colors duration-150 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
      >
        <TenantAvatar name={activeMembership.name} logoUrl={activeMembership.logoUrl} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-slate-800">
            {activeMembership.name}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>{ROLE_LABEL[activeMembership.role]}</span>
            {activeMembership.isCertified && (
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            )}
          </div>
        </div>
        <ChevronsUpDown className="h-4 w-4 shrink-0 text-slate-400" />
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          <div className="px-3 py-2">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Kurumların
            </p>
          </div>

          <div className="max-h-72 overflow-y-auto px-1.5 pb-1.5">
            {memberships.map((membership) => {
              const isActive = membership.tenantId === activeTenantId;
              return (
                <button
                  key={membership.tenantId}
                  type="button"
                  onClick={() => handleSwitch(membership.tenantId)}
                  className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors duration-150 ${
                    isActive ? 'bg-indigo-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <TenantAvatar
                    name={membership.name}
                    logoUrl={membership.logoUrl}
                    small
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-slate-800">
                      {membership.name}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <span>{ROLE_LABEL[membership.role]}</span>
                      {membership.isCertified && (
                        <span className="inline-flex items-center gap-0.5 rounded bg-emerald-50 px-1 text-[10px] font-medium text-emerald-600">
                          <BadgeCheck className="h-3 w-3" /> Sertifikalı
                        </span>
                      )}
                    </div>
                  </div>
                  {isActive && (
                    <Check className="h-4 w-4 shrink-0 text-indigo-600" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-100 p-1.5">
            {onAddTenant && (
              <button
                type="button"
                onClick={() => {
                  onAddTenant();
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-slate-600 transition-colors duration-150 hover:bg-slate-50"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-dashed border-slate-300">
                  <Plus className="h-4 w-4" />
                </span>
                Yeni kuruma katıl
              </button>
            )}
            {onSignOut && (
              <button
                type="button"
                onClick={onSignOut}
                className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-slate-500 transition-colors duration-150 hover:bg-rose-50 hover:text-rose-600"
              >
                <span className="flex h-7 w-7 items-center justify-center">
                  <LogOut className="h-4 w-4" />
                </span>
                Çıkış yap
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface TenantAvatarProps {
  name: string;
  logoUrl?: string;
  small?: boolean;
}

function TenantAvatar({ name, logoUrl, small = false }: TenantAvatarProps) {
  const sizeClasses = small ? 'h-7 w-7 text-xs' : 'h-9 w-9 text-sm';
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={name}
        className={`${sizeClasses} shrink-0 rounded-lg object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses} flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 font-semibold text-white`}
    >
      {initials || <Building2 className="h-4 w-4" />}
    </div>
  );
}
