/**
 * Molecule: FormField — Label + Input + hata mesajı üçlüsü.
 *
 * Atom bileşenlerini (Label, Input) bir araya getirir; tekrar eden
 * form satırı yapısını tek yerden yönetir.
 */

import { useId } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  /** Alanın sağ üstünde gösterilen ek bağlantı (örn. "Şifremi unuttum") */
  rightLabel?: React.ReactNode;
}

export function FormField({ label, error, rightLabel, className, id: externalId, ...inputProps }: FormFieldProps) {
  const internalId = useId();
  const id = externalId ?? internalId;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {rightLabel}
      </div>
      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(error && 'border-destructive focus-visible:ring-destructive', className)}
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
