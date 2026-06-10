/**
 * Molecule: AlertMessage — form-level başarı/hata bildirimi.
 * Atom düzeyindeki Badge veya span yerine tam genişlik alert kutusu kullanılır;
 * ekran okuyucuların role="alert" ile mesajı duyurması sağlanır.
 */

import { cn } from '@/lib/utils';

interface AlertMessageProps {
  type: 'error' | 'success' | 'info';
  message: string;
  className?: string;
}

const STYLES: Record<AlertMessageProps['type'], string> = {
  error:   'bg-destructive/10 border-destructive/30 text-destructive',
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  info:    'bg-blue-50 border-blue-200 text-blue-800',
};

export function AlertMessage({ type, message, className }: AlertMessageProps) {
  return (
    <div
      role="alert"
      className={cn('rounded-lg border px-4 py-3 text-sm', STYLES[type], className)}
    >
      {message}
    </div>
  );
}
