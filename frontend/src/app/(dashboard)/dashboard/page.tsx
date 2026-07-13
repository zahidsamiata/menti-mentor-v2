'use client';

/**
 * Dashboard giriş noktası — kullanıcı rolüne göre yönlendirir.
 * MENTOR → /mentor, MENTI → /menti, ADMIN → /admin (Sprint 14)
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!user) { router.replace('/login'); return; }

    const routes: Record<string, string> = {
      MENTOR: '/mentor',
      MENTI:  '/menti',
      ADMIN:  '/admin',
    };
    router.replace(routes[user.role] ?? '/login');
  }, [user, isLoading, router]);

  return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}
