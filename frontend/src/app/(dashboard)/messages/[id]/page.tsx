'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { UserAvatar } from '@/components/atoms/UserAvatar';
import { Button } from '@/components/ui/button';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { conversationsApi } from '@/lib/api/conversations';

const MESSAGE_MAX = 2000;

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

export default function ConversationThreadPage() {
  const { user, isLoading } = useAuth();
  const api = useApiClient();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const conversationId = params.id;

  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const markedRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace('/login');
  }, [user, isLoading, router]);

  const { data, isLoading: loading, error, refetch } = useQuery(
    () => conversationsApi.thread(api, conversationId),
    [api, conversationId],
    { enabled: !!user },
  );

  // Thread açılınca okundu işaretle (bir kez) — unread rozeti sıfırlansın.
  useEffect(() => {
    if (data && !markedRef.current) {
      markedRef.current = true;
      void conversationsApi.markRead(api, conversationId);
    }
  }, [data, api, conversationId]);

  // Yeni mesaj gelince en alta kaydır.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data?.messages.length]);

  async function handleSend() {
    const body = text.trim();
    if (!body || sending) return;
    setSending(true);
    setSendError(null);
    const result = await conversationsApi.send(api, conversationId, body);
    setSending(false);
    if (result.ok) {
      setText('');
      refetch();
    } else {
      setSendError(result.error.message ?? 'Mesaj gönderilemedi.');
    }
  }

  const counterpart = data?.counterpart;

  return (
    <div className="mx-auto flex h-[calc(100vh-6rem)] max-w-2xl flex-col animate-fade-in">
      {/* Başlık */}
      <div className="flex items-center gap-3 border-b border-border pb-3">
        <Link href="/messages" className="text-muted-foreground hover:text-foreground" aria-label="Geri">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        {counterpart && <UserAvatar src={counterpart.avatarUrl} name={counterpart.fullName} size={36} />}
        <div>
          <p className="text-sm font-semibold">{counterpart?.fullName ?? 'Konuşma'}</p>
        </div>
      </div>

      {/* Mesajlar */}
      <div className="flex-1 space-y-3 overflow-y-auto py-4">
        {loading ? (
          <p className="py-6 text-center text-sm text-muted-foreground">Yükleniyor…</p>
        ) : error ? (
          <p className="py-6 text-center text-sm text-destructive">{error}</p>
        ) : !data || data.messages.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">Henüz mesaj yok.</p>
        ) : (
          data.messages.map((m) => {
            const mine = m.senderUserId === user?.id;
            return (
              <div key={m.id} className={mine ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={
                    mine
                      ? 'max-w-[75%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground'
                      : 'max-w-[75%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm text-foreground'
                  }
                >
                  <p className="whitespace-pre-wrap break-words">{m.content}</p>
                  <span className={`mt-1 block text-[10px] ${mine ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {formatTime(m.createdAt)}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Gönderme kutusu */}
      <div className="border-t border-border pt-3">
        {sendError && <p className="mb-2 text-xs text-destructive">{sendError}</p>}
        <div className="flex items-end gap-2">
          <textarea
            className="flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            rows={2}
            maxLength={MESSAGE_MAX}
            placeholder="Bir mesaj yazın…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void handleSend();
              }
            }}
          />
          <Button onClick={handleSend} disabled={sending || text.trim().length === 0}>
            {sending ? 'Gönderiliyor…' : 'Gönder'}
          </Button>
        </div>
      </div>
    </div>
  );
}
