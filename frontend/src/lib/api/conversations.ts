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
}

export interface ChatMessage {
  id: string;
  senderUserId: string;
  content: string;
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
  list: (api: BoundClient): Promise<ApiResult<ConversationListResponse>> =>
    api<ConversationListResponse>('/api/conversations'),

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

  markRead: (api: BoundClient, id: string): Promise<ApiResult<{ ok: boolean; readAt: string }>> =>
    api<{ ok: boolean; readAt: string }>(`/api/conversations/${id}/read`, { method: 'POST' }),
};
