/**
 * Organism: DashboardMetricCard — KPI kutusu.
 * Tenant brand rengiyle renklendirilebilir; icon slot genişletme için hazır.
 */

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardMetricCardProps {
  label: string;
  value: string | number;
  description?: string;
  /** 'brand' seçilirse tenant rengi kullanılır */
  color?: 'brand' | 'success' | 'warning' | 'neutral';
  icon?: React.ReactNode;
}

const COLOR_MAP: Record<NonNullable<DashboardMetricCardProps['color']>, string> = {
  brand:   'text-primary bg-primary/10',
  success: 'text-emerald-700 bg-emerald-50',
  warning: 'text-amber-700 bg-amber-50',
  neutral: 'text-muted-foreground bg-muted',
};

export function DashboardMetricCard({
  label,
  value,
  description,
  color = 'neutral',
  icon,
}: DashboardMetricCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          {icon && (
            <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', COLOR_MAP[color])}>
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
