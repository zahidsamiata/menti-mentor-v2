/**
 * F-19 — yönetici proaktif eşik-alarmı (saf fonksiyon).
 */

import { describe, it, expect } from 'vitest';
import { computeAdminAlerts, ADMIN_ALERT_THRESHOLDS } from '@/lib/adminAlerts';
import type { KpiData } from '@/types/admin';

function kpi(over: { pendingOptIns?: number; rematch?: number; menti?: number; mentor?: number } = {}): KpiData {
  return {
    tenantId: 't', generatedAt: '',
    stats: {
      totalActiveUsers: 0,
      usersByRole: { MENTI: over.menti ?? 0, MENTOR: over.mentor ?? 0 },
      matching: {
        activeMatches: 0,
        pendingOptIns: over.pendingOptIns ?? 0,
        rematchPriorityUsers: over.rematch ?? 0,
      },
      feedback: { totalFeedbackLogs: 0, avgNpsByPhase: {}, successRate: null },
      activeJobListings: 0,
    },
  };
}

describe('computeAdminAlerts (F-19)', () => {
  it('her şey eşik altındaysa uyarı yok', () => {
    expect(computeAdminAlerts(kpi({ pendingOptIns: 1, menti: 2, mentor: 2 }))).toEqual([]);
  });

  it('null kpi → boş', () => {
    expect(computeAdminAlerts(null)).toEqual([]);
  });

  it('bekleyen opt-in eşiği aşılınca uyarı', () => {
    const a = computeAdminAlerts(kpi({ pendingOptIns: ADMIN_ALERT_THRESHOLDS.pendingOptIns }));
    expect(a.some((x) => x.key === 'pending-optins')).toBe(true);
  });

  it('hiç mentör yok ama menti varsa uyarı', () => {
    const a = computeAdminAlerts(kpi({ menti: 3, mentor: 0 }));
    expect(a.some((x) => x.key === 'no-mentors')).toBe(true);
  });

  it('mentör başına menti eşiği aşılınca uyarı', () => {
    const a = computeAdminAlerts(kpi({ menti: 10, mentor: 1 }));
    expect(a.some((x) => x.key === 'menti-overload')).toBe(true);
  });

  it('yeniden eşleşme bekleyen varsa uyarı', () => {
    const a = computeAdminAlerts(kpi({ rematch: 2 }));
    expect(a.some((x) => x.key === 'rematch')).toBe(true);
  });
});
