/**
 * F-22 — Tamamlanan görüşme için paylaşılabilir kutlama kartı.
 *
 * COMPLETED görüşmede "🎉 ... tamamladın" metni + WhatsApp/LinkedIn paylaşım düğmeleri
 * görünür; tamamlanmamış görüşmede görünmez.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MeetingsPage from '@/app/(dashboard)/meetings/page';
import type { Meeting } from '@/lib/api/meetings';

const meetingsMock: { items: Meeting[] } = { items: [] };

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));
vi.mock('@/providers/AuthProvider', () => ({
  useAuth: () => ({ user: { id: 'me', role: 'MENTI' }, isLoading: false }),
}));
vi.mock('@/hooks/useApiClient', () => ({ useApiClient: () => ({}) }));
vi.mock('@/hooks/useQuery', () => ({
  useQuery: () => ({ data: { items: meetingsMock.items, total: meetingsMock.items.length }, isLoading: false, error: null }),
}));

function meeting(status: Meeting['status'], startOffsetMs: number): Meeting {
  const start = new Date(Date.now() + startOffsetMs);
  return {
    id: 'm1', tenantId: 't', mentorUserId: 'mentor', mentiUserId: 'me',
    status, format: 'ONLINE',
    startsAt: start.toISOString(), endsAt: start.toISOString(),
    notes: null, requestMessage: null,
    mentor: { id: 'mentor', fullName: 'Mentör Kişi' },
    awaitingMentorApproval: false,
  };
}

describe('Görüşme tamamlama paylaşımı (F-22)', () => {
  it('COMPLETED görüşmede kutlama + paylaşım düğmeleri görünür', () => {
    meetingsMock.items = [meeting('COMPLETED', -3 * 60 * 60 * 1000)];
    render(<MeetingsPage />);
    expect(screen.getByText(/tamamladın/)).toBeInTheDocument();
    expect(screen.getByText(/WhatsApp/)).toBeInTheDocument();
    expect(screen.getByText(/LinkedIn/)).toBeInTheDocument();
  });

  it('SCHEDULED görüşmede paylaşım düğmesi görünmez', () => {
    meetingsMock.items = [meeting('SCHEDULED', 3 * 60 * 60 * 1000)];
    render(<MeetingsPage />);
    expect(screen.queryByText(/WhatsApp/)).not.toBeInTheDocument();
  });
});
