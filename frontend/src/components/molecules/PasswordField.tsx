/**
 * Molecule: PasswordField — göster/gizle (göz) toggle'lı şifre alanı.
 *
 * FormField ile aynı API'yi taşır (label + Input + hata + rightLabel), tek farkı
 * şifreyi görünür/gizli yapan göz butonudur. Login, reset-password gibi şifre
 * alanı olan formlarda FormField yerine kullanılır (kayıt formunda benzer desen
 * zaten vardı; bu molekül onu paylaşılabilir kılar).
 */

import { useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface PasswordFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  /** Alanın sağ üstünde gösterilen ek bağlantı (örn. "Şifremi unuttum") */
  rightLabel?: React.ReactNode;
}

export function PasswordField({ label, error, rightLabel, className, id: externalId, ...inputProps }: PasswordFieldProps) {
  const internalId = useId();
  const id = externalId ?? internalId;
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {rightLabel}
      </div>
      <div className="relative">
        <Input
          id={id}
          type={visible ? 'text' : 'password'}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn('pr-10', error && 'border-destructive focus-visible:ring-destructive', className)}
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={visible ? 'Şifreyi gizle' : 'Şifreyi göster'}
          tabIndex={-1}
        >
          {visible ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
