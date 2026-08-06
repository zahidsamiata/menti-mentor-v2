'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { UserAvatar } from '@/components/atoms/UserAvatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { conversationsApi } from '@/lib/api/conversations';

function formatWhen(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const sameDay = d.toDateString() === today.toDateString();
  return sameDay
    ? d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    : d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' });
}

export default function MessagesInboxPage() {
  const { user, isLoading } = useAuth();
  const api = useApiClient();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace('/login');
  }, [user, isLoading, router]);

  const { data, isLoading: loading } = useQuery(
    () => conversationsApi.list(api),
    [api],
    { enabled: !!user },
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Mesajlar</h1>
        <p className="text-sm text-muted-foreground">Mentörlük konuşmalarınız</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Konuşmalar</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="py-6 text-center text-sm text-muted-foreground">Yükleniyor…</p>
          ) : !data || data.items.length === 0 ? (
            <div className="py-8 text-center space-y-1">
              <p className="text-sm font-medium">Henüz mesajınız yok</p>
              <p className="text-xs text-muted-foreground">
                Bir mentöre mesaj gönderdiğinizde konuşmalarınız burada görünür.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {data.items.map((c) => (
                <Link
                  key={c.id}
                  href={`/messages/${c.id}`}
                  className="flex items-center gap-3 py-3 hover:bg-muted/50 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <UserAvatar src={c.counterpart?.avatarUrl ?? null} name={c.counterpart?.fullName ?? '—'} size={40} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium">{c.counterpart?.fullName ?? 'Konuşma'}</p>
                      <span className="shrink-0 text-xs text-muted-foreground">{formatWhen(c.lastMessageAt)}</span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {c.lastMessagePreview ?? 'Mesaj yok'}
                    </p>
                  </div>
                  {c.unread > 0 && (
                    <span className="shrink-0 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
                      {c.unread}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
