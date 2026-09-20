/**
 * P-07 — görüşme kilometre taşı kutlaması (saf fonksiyon).
 */

import { describe, it, expect } from 'vitest';
import { meetingMilestone } from '@/lib/milestones';

describe('meetingMilestone (P-07)', () => {
  it('ilk görüşme kişiye özel metin gösterir', () => {
    expect(meetingMilestone(1).title).toBe('İlk görüşmeni tamamladın!');
  });

  it('10. görüşme özel eşik metni gösterir', () => {
    expect(meetingMilestone(10).title).toContain('10');
  });

  it('birinci ile onuncu görüşme AYNI metni göstermez (jenerik değil)', () => {
    expect(meetingMilestone(1).title).not.toBe(meetingMilestone(10).title);
  });

  it('10 katları eşik olarak kutlanır', () => {
    expect(meetingMilestone(20).title).toContain('20');
    expect(meetingMilestone(30).emoji).toBe('🏆');
  });

  it('ara sayılar sayıyı içeren nötr kutlama gösterir', () => {
    expect(meetingMilestone(3).title).toContain('3');
  });

  it('geçersiz/sıfır sayı nötr kutlamaya düşer (jenerik güvenli)', () => {
    expect(meetingMilestone(0).title).toBe('Teşekkürler!');
  });
});
