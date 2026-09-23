'use client';

import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { meetingsApi } from '@/lib/api/meetings';
import { cn } from '@/lib/utils';

/**
 * Kurumun haftalık görüşme sıklığı (madde 156, I-05) — menti "neden görüşemiyorum" diye
 * takılmasın. Kaynak: `Tenant.maxMeetingsPerWeek` (kurum yöneticisi ayarı). Sunucu limiti
 * onay BEKLEYEN talepleri de sayar (backend meetingController LIMIT_COUNTED_STATUSES) —
 * metin bunu açıkça söyler. Değer yoksa ya da okunamazsa genel metin gösterilir; ekran bozulmaz.
 */
export const WEEKLY_LIMIT_FALLBACK = 'Haftalık görüşme sayısı, kurumun belirlediği sıklığa bağlıdır.';

export function weeklyLimitText(limit: number | null | undefined): string {
  if (typeof limit !== 'number' || !Number.isFinite(limit) || limit <= 0) return WEEKLY_LIMIT_FALLBACK;
  return `Kurumun haftalık görüşme sıklığı: haftada en fazla ${limit} görüşme. Onay bekleyen talepler de bu sayıya dahildir.`;
}

export function WeeklyMeetingLimitNote({ className }: { className?: string }) {
  const api = useApiClient();
  const { data, isLoading } = useQuery(() => meetingsApi.getWeeklyLimit(api), [api]);
  if (isLoading) return null;
  return (
    <p
      data-testid="weekly-meeting-limit"
      className={cn(
        'rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-xs leading-relaxed text-muted-foreground',
        className,
      )}
    >
      🗓️ {weeklyLimitText(data?.maxMeetingsPerWeek)}
    </p>
  );
}
