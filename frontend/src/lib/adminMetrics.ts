/**
 * #7 Aşama 1 — Yönetici metrik gösterim yardımcıları (YALNIZ yönetici sayfalarında kullanılır).
 * Kalite puanı ve risk sinyali KVKK gereği kişiye/peer'a gösterilmez (tasarım §5).
 */

import type { RiskSignal } from '@/types/admin';

/**
 * Kalite çarpanı (ham: 0.8–1.2, nötr 1.0) → yöneticiye anlaşılır 5 üzerinden puan.
 * Lineer eşleme: 0.8 → 1.0 · 1.0 (nötr) → 3.0 · 1.2 → 5.0. Ham çarpanı yönetici yorumlamak
 * zorunda kalmasın diye. null/undefined (üyelik/veri yok) → null ("—" gösterilir).
 */
export function qualityToFive(multiplier: number | null | undefined): number | null {
  if (multiplier == null) return null;
  const five = 1 + ((multiplier - 0.8) / 0.4) * 4;
  return Math.round(Math.min(5, Math.max(1, five)) * 10) / 10;
}

type BadgeVariant = 'success' | 'warning' | 'destructive' | 'secondary';

/** Risk sinyali → Türkçe etiket + Badge varyantı (GREEN=İyi/yeşil, RED=Riskli/kırmızı). */
export const RISK_META: Record<RiskSignal, { label: string; variant: BadgeVariant }> = {
  GREEN:             { label: 'İyi',      variant: 'success' },
  YELLOW:            { label: 'Dikkat',   variant: 'warning' },
  RED:               { label: 'Riskli',   variant: 'destructive' },
  INSUFFICIENT_DATA: { label: 'Veri yok', variant: 'secondary' },
};
