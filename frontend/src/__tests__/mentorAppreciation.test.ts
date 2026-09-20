/**
 * P-14 — mentör takdir cümlesi (saf fonksiyon).
 */

import { describe, it, expect } from 'vitest';
import { mentorAppreciation } from '@/lib/mentorAppreciation';

describe('mentorAppreciation (P-14)', () => {
  it('veri yoksa (null) başlangıç cümlesi döner', () => {
    expect(mentorAppreciation(null)).toContain('İlk mentin');
  });

  it('menti var ama görüşme yoksa emanet cümlesi döner', () => {
    const msg = mentorAppreciation({ activeMentis: 2, completedMeetings: 0 });
    expect(msg).toContain('2 menti');
    expect(msg).toContain('ilk görüşmen');
  });

  it('görüşme tamamlanmışsa emeği anlatan teşekkür döner (sayı içerir)', () => {
    const msg = mentorAppreciation({ activeMentis: 3, completedMeetings: 12 });
    expect(msg).toContain('12 görüşme');
    expect(msg).toContain('teşekkürler');
  });

  it('boş durum ile dolu durum AYNI cümle değildir (jenerik değil)', () => {
    expect(mentorAppreciation(null)).not.toBe(
      mentorAppreciation({ activeMentis: 3, completedMeetings: 12 }),
    );
  });
});
