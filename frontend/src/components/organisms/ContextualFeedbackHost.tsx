'use client';

import { useMeeting } from '@/context/MeetingContext';
import MeetingFeedbackCard from '@/components/organisms/MeetingFeedbackCard';

const TENANT_KEY = 'X-Tenant-Id';

/**
 * Uygulama layout'una bir kez yerleştirilen global feedback tetikleyicisi.
 * useMeeting().triggerFeedback(meeting) çağrıldığında overlay olarak açılır;
 * gönderim veya dismiss sonrası kapanır.
 *
 * API sözleşmesi:
 *   POST /api/scoring/feedback
 *   Header: X-Tenant-Id (localStorage'dan)
 *   Body: { matchId, checkpoint, fromUserId, role, rapportScore, progressScore, earlyExit, comment? }
 *
 *   POST /api/meetings/:id/feedback-prompted
 *   Header: X-Tenant-Id
 *   Body: {} (sadece işaretleme)
 */
export default function ContextualFeedbackHost() {
  const { pendingFeedback, dismissFeedback } = useMeeting();

  if (!pendingFeedback) return null;

  const tenantId = typeof window !== 'undefined'
    ? (localStorage.getItem(TENANT_KEY) ?? '')
    : '';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(tenantId ? { 'X-Tenant-Id': tenantId } : {}),
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm sm:items-center"
    >
      <MeetingFeedbackCard
        mentorName={pendingFeedback.mentorName}
        onSubmit={(payload) => {
          // 1. Match checkpoint feedback'i gönder (rapportScore/progressScore/earlyExit)
          void fetch('/api/scoring/feedback', {
            method:  'POST',
            headers,
            body: JSON.stringify({
              matchId:       pendingFeedback.matchId,
              checkpoint:    pendingFeedback.checkpoint,
              fromUserId:    pendingFeedback.fromUserId,
              role:          pendingFeedback.userRole,
              rapportScore:  payload.rapportScore,
              progressScore: payload.progressScore,
              earlyExit:     payload.earlyExit,
              comment:       payload.comment,
              // payload.tags backend schema'sında yok; şimdilik comment'e eklenmez
            }),
          });

          // 2. Feedback kartının gösterildiğini işaretle (çift tetiklemeyi önler)
          void fetch(`/api/meetings/${pendingFeedback.id}/feedback-prompted`, {
            method:  'POST',
            headers,
            body:    '{}',
          });

          dismissFeedback();
        }}
        onDismiss={dismissFeedback}
      />
    </div>
  );
}
