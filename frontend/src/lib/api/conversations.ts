import type { ApiResult } from '@/types/api';
import type { RequestOptions } from './client';

type BoundClient = <T>(path: string, options?: Omit<RequestOptions, 'token' | 'tenantId'>) => Promise<ApiResult<T>>;

export interface ConversationCounterpart {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  role: 'ADMIN' | 'MENTOR' | 'MENTI';
}

export interface ConversationListItem {
  id: string;
  counterpart: ConversationCounterpart | null;
  lastMessagePreview: string | null;
  lastMessageAt: string;
  unread: number;
}

export interface ConversationListResponse {
  items: ConversationListItem[];
  total: number;
  limit?: number;
  offset?: number;
}

export interface ChatMessage {
  id: string;
  senderUserId: string;
  /** Sıradan mesajda metin; zaman önerisinde (AN-27) menti'nin gerekçesi. */
  content: string;
  /** AN-27: null/yok = sıradan mesaj · 'TIME_PROPOSAL' = zaman önerisi. */
  kind?: 'TIME_PROPOSAL' | null;
  /** AN-27: yalnız zaman önerisinde dolu (ISO). */
  proposedStartAt?: string | null;
  createdAt: string;
}

export interface ConversationThread {
  id: string;
  mentor: ConversationCounterpart;
  menti: ConversationCounterpart;
  counterpart: ConversationCounterpart | null;
  messages: ChatMessage[];
}

export interface StartConversationResponse {
  conversation: { id: string };
  message: ChatMessage;
}

export const conversationsApi = {
  // AJ-83: sunucu sayfalar (varsayılan 30, en çok 100 — conversationController F-27);
  // `offset` verilirse sonraki sayfa istenir. Parametresiz çağrı ilk sayfayı döndürür.
  list: (
    api: BoundClient,
    params: { limit?: number; offset?: number } = {},
  ): Promise<ApiResult<ConversationListResponse>> => {
    const q = new URLSearchParams();
    if (params.limit !== undefined) q.set('limit', String(params.limit));
    if (params.offset !== undefined) q.set('offset', String(params.offset));
    const qs = q.toString();
    return api<ConversationListResponse>(`/api/conversations${qs ? `?${qs}` : ''}`);
  },

  unreadCount: (api: BoundClient): Promise<ApiResult<{ count: number }>> =>
    api<{ count: number }>('/api/conversations/unread-count'),

  thread: (api: BoundClient, id: string): Promise<ApiResult<ConversationThread>> =>
    api<ConversationThread>(`/api/conversations/${id}/messages`),

  // Menti bir mentöre zorunlu ilk mesajla konuşma başlatır (hemen açık).
  start: (
    api: BoundClient,
    payload: { mentorUserId: string; message: string },
  ): Promise<ApiResult<StartConversationResponse>> =>
    api<StartConversationResponse>('/api/conversations', { method: 'POST', body: payload }),

  send: (api: BoundClient, id: string, message: string): Promise<ApiResult<{ message: ChatMessage }>> =>
    api<{ message: ChatMessage }>(`/api/conversations/${id}/messages`, { method: 'POST', body: { message } }),

  // AN-27 (KARAR-53 ②④): menti'nin zaman önerisi — mevcut mesaj ucu, yapılandırılmış gövde.
  // Randevu OLUŞTURMAZ; yalnız mentörün ayırt ettiği bir mesajdır.
  proposeTime: (
    api: BoundClient,
    id: string,
    payload: { reason: string; proposedStartAt: string },
  ): Promise<ApiResult<{ message: ChatMessage }>> =>
    api<{ message: ChatMessage }>(`/api/conversations/${id}/messages`, {
      method: 'POST',
      body: { message: payload.reason, kind: 'TIME_PROPOSAL', proposedStartAt: payload.proposedStartAt },
    }),

  markRead: (api: BoundClient, id: string): Promise<ApiResult<{ ok: boolean; readAt: string }>> =>
    api<{ ok: boolean; readAt: string }>(`/api/conversations/${id}/read`, { method: 'POST' }),
};
