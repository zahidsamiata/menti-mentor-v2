/**
 * P-07 — görüşme kilometre taşı kutlaması.
 *
 * Menti/mentör 1. ve 10. görüşmede aynı jenerik "🎉 Teşekkürler" görüyordu. Bu saf fonksiyon,
 * tamamlanan görüşme sayısına göre kişiye özel kutlama metni üretir. UI'dan bağımsız → birim testi kolay.
 *
 * `count` = bu görüşme DAHİL tamamlanan görüşme sayısı (1 = ilk görüşme).
 */

import type { Meeting } from '@/lib/api/meetings';
import { countCompletedMeetings } from '@/lib/mentiMetrics';

export interface MeetingMilestone {
  emoji: string;
  title: string;
  subtitle: string;
}

export function meetingMilestone(count: number): MeetingMilestone {
  if (count <= 0) {
    // Sayı bilinmiyor/geçersiz → nötr kutlama (jenerik davranışa güvenli düşüş).
    return { emoji: '🎉', title: 'Teşekkürler!', subtitle: 'Görüşün kaydedildi.' };
  }
  if (count === 1) {
    return {
      emoji: '🌱',
      title: 'İlk görüşmeni tamamladın!',
      subtitle: 'Harika bir başlangıç — yolculuğun başladı.',
    };
  }
  if (count === 5) {
    return {
      emoji: '⭐',
      title: '5. görüşmen tamamlandı!',
      subtitle: 'İstikrar kazanıyorsun, böyle devam et.',
    };
  }
  if (count === 10) {
    return {
      emoji: '🏆',
      title: '10 görüşme! Büyük bir eşik.',
      subtitle: 'Bu bağlılık gerçekten fark yaratıyor.',
    };
  }
  if (count === 25) {
    return {
      emoji: '💎',
      title: '25. görüşme — olağanüstü!',
      subtitle: 'Emeğin bir yatırıma dönüştü.',
    };
  }
  if (count % 10 === 0) {
    return {
      emoji: '🏆',
      title: `${count}. görüşmeni tamamladın!`,
      subtitle: 'Kilometre taşını geçtin, tebrikler.',
    };
  }
  return {
    emoji: '🎉',
    title: `${count}. görüşmen tamamlandı!`,
    subtitle: 'Görüşün kaydedildi, teşekkürler.',
  };
}

/**
 * AJ-33 — check-in sonrası kutlama: sayım yolu.
 *
 * Check-in yalnız COMPLETED görüşmede açılır (backend `meetingCheckInController` 409 DURUM_HATASI),
 * bu yüzden kullanıcının görüşme listesinde bu görüşme ZATEN COMPLETED sayılır. Sayıya +1 EKLENMEZ;
 * eklenirse ilk görüşmede "2. görüşmen tamamlandı!" çıkar (P-07 hatası).
 * Liste henüz yüklenmediyse sayı 0 → nötr kutlama (yanlış eşik iddia edilmez).
 */
export function checkInMilestone(meetings: readonly Meeting[]): MeetingMilestone {
  return meetingMilestone(countCompletedMeetings(meetings));
}
