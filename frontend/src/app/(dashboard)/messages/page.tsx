'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { UserAvatar } from '@/components/atoms/UserAvatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertMessage } from '@/components/molecules/AlertMessage';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { conversationsApi, type ConversationListItem } from '@/lib/api/conversations';
import { UI_TEXT } from '@/lib/uiText';

function formatWhen(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const sameDay = d.toDateString() === today.toDateString();
  return sameDay
    ? d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    : d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' });
}

const LIST_LOAD_ERROR = 'Konuşmalar yüklenemedi. Lütfen sayfayı yenileyin.';
const MORE_LOAD_ERROR = 'Daha fazla konuşma yüklenemedi. Lütfen tekrar deneyin.';

/**
 * Sayfaları birleştirir. Sayfalar arasında yeni mesaj gelirse bir konuşma üst sıraya kayar ve
 * sonraki sayfada tekrar görünebilir — aynı konuşma iki kez listelenmesin diye id ile tekilleştirilir.
 */
function mergeUniqueById(first: ConversationListItem[], rest: ConversationListItem[]): ConversationListItem[] {
  const seen = new Set(first.map((c) => c.id));
  const merged = [...first];
  for (const c of rest) {
    if (seen.has(c.id)) continue;
    seen.add(c.id);
    merged.push(c);
  }
  return merged;
}

export default function MessagesInboxPage() {
  const { user, isLoading } = useAuth();
  const api = useApiClient();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace('/login');
  }, [user, isLoading, router]);

  // AJ-83: ilk sayfa useQuery ile gelir (sunucu varsayılanı 30); "Daha fazla göster" ile eklenen
  // sayfalar ayrı tutulur (desen: admin şikayet paneli, AN-39). Eskiden yalnız ilk 30 görünüyordu.
  const { data, isLoading: loading, error } = useQuery(
    () => conversationsApi.list(api),
    [api],
    { enabled: !!user, cacheKey: 'conversations:list' },
  );

  const [moreItems, setMoreItems] = useState<ConversationListItem[]>([]);
  const [moreTotal, setMoreTotal] = useState<number | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [moreError, setMoreError] = useState<string | null>(null);
  // Sayfa kapanıp açılırsa (unmount) geç gelen yanıt state'e yazılmasın.
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);

  const items = data ? mergeUniqueById(data.items, moreItems) : [];
  const total = Math.max(moreTotal ?? 0, data?.total ?? 0);
  const hasMore = !loading && items.length < total;

  async function loadMore() {
    setLoadingMore(true);
    setMoreError(null);
    const res = await conversationsApi.list(api, { offset: items.length });
    if (!mounted.current) return;
    setLoadingMore(false);
    if (res.ok) {
      setMoreItems((prev) => [...prev, ...res.data.items]);
      setMoreTotal(res.data.total);
    } else {
      setMoreError(MORE_LOAD_ERROR);
    }
  }

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
            <p className="py-6 text-center text-sm text-muted-foreground">{UI_TEXT.status.loading}</p>
          ) : error && !data ? (
            <AlertMessage type="error" message={LIST_LOAD_ERROR} />
          ) : !data || items.length === 0 ? (
            <div className="py-8 text-center space-y-1">
              <p className="text-sm font-medium">Henüz mesajınız yok</p>
              <p className="text-xs text-muted-foreground">
                {/* P-09: boş durum metni role göre — mentör "mentöre mesaj gönder" görmemeli. */}
                {user?.role === 'MENTOR'
                  ? 'Bir menti sizinle iletişime geçtiğinde konuşmalarınız burada görünür.'
                  : 'Bir mentöre mesaj gönderdiğinizde konuşmalarınız burada görünür.'}
              </p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-border">
                {items.map((c) => (
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
              {moreError && <AlertMessage type="error" message={moreError} />}
              {hasMore && (
                <div className="flex justify-center pt-3">
                  <Button variant="outline" size="sm" disabled={loadingMore} onClick={() => void loadMore()}>
                    {loadingMore ? UI_TEXT.status.loading : 'Daha fazla göster'}
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
