/**
 * F-19 — Yönetici proaktif eşik-alarmı.
 *
 * KPI verisinden, yöneticiyi HAREKETE GEÇİREN kırmızı uyarılar türetir (pairSignal'dan
 * farklı: o ikili-görüşme sağlığı içindi; bu program-düzeyi eşik alarmı). Saf fonksiyon —
 * DB/HTTP yok, birim testi kolay.
 */

import type { KpiData } from '@/types/admin';

export interface AdminAlert {
  key: string;
  message: string;
}

// Eşikler tek yerde (sihirli sayı yasağı).
export const ADMIN_ALERT_THRESHOLDS = {
  pendingOptIns: 5, // bu kadar+ eşleşme onayı beklerse hatırlat
  mentiPerMentor: 5, // mentör başına bu kadar+ menti = kapasite zorlanıyor
  rematchPriority: 1, // bu kadar+ kullanıcı yeniden eşleşme bekliyor
};

/**
 * KPI'dan kırmızı uyarı listesi üretir. Uyarı yoksa boş dizi (banner gösterilmez).
 */
export function computeAdminAlerts(kpi: KpiData | null | undefined): AdminAlert[] {
  if (!kpi) return [];
  const alerts: AdminAlert[] = [];
  const { matching, usersByRole } = kpi.stats;

  const mentiCount = usersByRole['MENTI'] ?? 0;
  const mentorCount = usersByRole['MENTOR'] ?? 0;

  if (matching.pendingOptIns >= ADMIN_ALERT_THRESHOLDS.pendingOptIns) {
    alerts.push({
      key: 'pending-optins',
      message: `${matching.pendingOptIns} eşleşme onay bekliyor — mentörlere hatırlatmak eşleşmeyi hızlandırır.`,
    });
  }

  if (mentorCount === 0 && mentiCount > 0) {
    alerts.push({
      key: 'no-mentors',
      message: `${mentiCount} menti bekliyor ama hiç aktif mentör yok — mentör davet edin.`,
    });
  } else if (mentorCount > 0 && mentiCount / mentorCount >= ADMIN_ALERT_THRESHOLDS.mentiPerMentor) {
    alerts.push({
      key: 'menti-overload',
      message: `Mentör başına ${Math.round(mentiCount / mentorCount)} menti düşüyor — kapasite zorlanıyor, yeni mentör davet edin.`,
    });
  }

  if (matching.rematchPriorityUsers >= ADMIN_ALERT_THRESHOLDS.rematchPriority) {
    alerts.push({
      key: 'rematch',
      message: `${matching.rematchPriorityUsers} kullanıcı yeniden eşleşme bekliyor — öncelikli olarak ele alın.`,
    });
  }

  return alerts;
}
