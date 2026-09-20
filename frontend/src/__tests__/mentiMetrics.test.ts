import { describe, it, expect } from 'vitest';
import { countCompletedMeetings, countApprovedMatchMentors, countSentRequests } from '@/lib/mentiMetrics';
import type { Meeting } from '@/lib/api/meetings';

function mk(id: string, mentorUserId: string, status: Meeting['status']): Meeting {
  return {
    id,
    tenantId: 't1',
    mentorUserId,
    mentiUserId: 'menti1',
    status,
    format: 'ONLINE',
    startsAt: '2026-01-01T10:00:00Z',
    endsAt: '2026-01-01T11:00:00Z',
    notes: null,
    requestMessage: null,
  };
}

describe('mentiMetrics — K-09 gerçek metrik türetme', () => {
  it('boş liste → 0 / 0 (sahte sayı yok)', () => {
    expect(countCompletedMeetings([])).toBe(0);
    expect(countApprovedMatchMentors([])).toBe(0);
  });

  it('tamamlanan toplantı yalnız COMPLETED sayılır', () => {
    const meetings = [
      mk('a', 'm1', 'COMPLETED'),
      mk('b', 'm1', 'SCHEDULED'),
      mk('c', 'm2', 'COMPLETED'),
      mk('d', 'm3', 'PENDING'),
      mk('e', 'm4', 'CANCELLED'),
    ];
    expect(countCompletedMeetings(meetings)).toBe(2);
  });

  it('onaylanan eşleşme = tekil mentör, PENDING/CANCELLED hariç', () => {
    const meetings = [
      mk('a', 'm1', 'COMPLETED'), // m1 sayılır
      mk('b', 'm1', 'SCHEDULED'), // m1 zaten sayıldı (tekil)
      mk('c', 'm2', 'APPROVED'), // m2 sayılır
      mk('d', 'm3', 'PENDING'), // sayılmaz
      mk('e', 'm4', 'CANCELLED'), // sayılmaz
    ];
    expect(countApprovedMatchMentors(meetings)).toBe(2);
  });

  describe('P-02 — gönderilen talep kalıcı sayısı', () => {
    it('yalnız kalıcı konuşmalar sayılır (sayfa yenilenince 0 olmaz)', () => {
      expect(countSentRequests(['m1', 'm2'], new Set())).toBe(2);
    });

    it('kalıcı konuşma + oturum-içi yeni gönderilen birleşir, mükerrer sayılmaz', () => {
      // m1 hem konuşmada hem oturum state'inde → tek sayılır; m3 yalnız oturumda.
      expect(countSentRequests(['m1', 'm2'], new Set(['m1', 'm3']))).toBe(3);
    });

    it('null/undefined counterpart id atlanır', () => {
      expect(countSentRequests(['m1', null, undefined, 'm1'], new Set())).toBe(1);
    });

    it('hiç talep yoksa 0', () => {
      expect(countSentRequests([], new Set())).toBe(0);
    });
  });
});
