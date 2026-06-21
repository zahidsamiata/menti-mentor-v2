'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

// Backend /api/scoring/feedback FeedbackSchema zorunlu alanları:
// matchId, checkpoint, fromUserId, role
// Bunlar triggerFeedback çağrısında sağlanmalıdır (poller veya sayfa bileşeni tarafından).
export type FeedbackCheckpoint = 'DAY_3' | 'DAY_14' | 'DAY_30';
export type UserRole = 'ADMIN' | 'MENTOR' | 'MENTI';

export interface PendingFeedbackMeeting {
  id: string;           // Meeting.id (feedback-prompted işaretlemek için)
  matchId: string;      // Match.id  (scoring/feedback endpoint zorunlu)
  checkpoint: FeedbackCheckpoint;   // hangi kontrol noktası
  fromUserId: string;   // geri bildirimi veren kullanıcı
  userRole: UserRole;   // geri bildirimi veren kullanıcının rolü
  mentorName?: string;  // UI'da göstermek için
}

interface MeetingContextValue {
  pendingFeedback: PendingFeedbackMeeting | null;
  triggerFeedback: (meeting: PendingFeedbackMeeting) => void;
  dismissFeedback: () => void;
}

const MeetingContext = createContext<MeetingContextValue | undefined>(undefined);

export function MeetingProvider({ children }: { children: ReactNode }) {
  const [pendingFeedback, setPendingFeedback] =
    useState<PendingFeedbackMeeting | null>(null);

  const triggerFeedback = useCallback((meeting: PendingFeedbackMeeting) => {
    setPendingFeedback(meeting);
  }, []);

  const dismissFeedback = useCallback(() => {
    setPendingFeedback(null);
  }, []);

  return (
    <MeetingContext.Provider value={{ pendingFeedback, triggerFeedback, dismissFeedback }}>
      {children}
    </MeetingContext.Provider>
  );
}

export function useMeeting(): MeetingContextValue {
  const ctx = useContext(MeetingContext);
  if (!ctx) throw new Error('useMeeting, MeetingProvider içinde kullanılmalı.');
  return ctx;
}
