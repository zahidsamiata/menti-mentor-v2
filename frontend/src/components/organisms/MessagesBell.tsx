'use client';

/**
 * Bildirim çanı — okunmamış mesaj toplamını gösterir.
 *
 * Polling: gerçek zamanlı YOK. Hafif periyodik unread-count sorgusu (POLL_MS) +
 * route değişiminde tazeleme (thread okununca rozet hızlı düşsün). Agresif değil.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';
import { useApiClient } from '@/hooks/useApiClient';
import { conversationsApi } from '@/lib/api/conversations';

const POLL_MS = 45_000;

export function MessagesBell() {
  const api = useApiClient();
  const pathname = usePathname();
  const [count, setCount] = useState(0);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const res = await conversationsApi.unreadCount(api);
      if (active && res.ok) setCount(res.data.count);
    };
    void load();
    const timer = setInterval(load, POLL_MS);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [api, pathname]);

  return (
    <Link
      href="/messages"
      aria-label={count > 0 ? `Mesajlar (${count} okunmamış)` : 'Mesajlar'}
      className="relative inline-flex items-center rounded-lg border border-border px-2.5 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Bell className="h-4 w-4" aria-hidden />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </Link>
  );
}
