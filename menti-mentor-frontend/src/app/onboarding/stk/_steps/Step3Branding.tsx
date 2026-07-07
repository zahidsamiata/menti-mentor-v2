'use client';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/molecules/FormField';
import type { WizardData } from '../_StkOnboardingContent';

interface Props {
  data: WizardData;
  onUpdate: (p: Partial<WizardData>) => void;
  onNext: () => void;
}

const PRESET_COLORS = [
  { label: 'İndigo',   value: '#6366f1' },
  { label: 'Violet',   value: '#8b5cf6' },
  { label: 'Gök Mavisi', value: '#0ea5e9' },
  { label: 'Zümrüt',  value: '#10b981' },
  { label: 'Amber',   value: '#f59e0b' },
  { label: 'Gül',     value: '#f43f5e' },
] as const;

export function Step3Branding({ data, onUpdate, onNext }: Props) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">

        {/* Logo URL */}
        <FormField
          label="Logo URL (opsiyonel)"
          name="logoUrl"
          type="url"
          placeholder="https://..."
          value={data.logoUrl}
          onChange={(e) => onUpdate({ logoUrl: e.target.value })}
        />

        {/* Ana renk */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Kurumun Ana Rengi</p>
          <div className="flex gap-2 flex-wrap">
            {PRESET_COLORS.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                aria-label={label}
                title={label}
                onClick={() => onUpdate({ primaryColor: value })}
                className="h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{
                  backgroundColor: value,
                  borderColor: data.primaryColor === value ? 'white' : 'transparent',
                  boxShadow: data.primaryColor === value ? `0 0 0 3px ${value}` : 'none',
                }}
              />
            ))}
          </div>

          {/* Custom renk girişi */}
          <div className="flex items-center gap-2 mt-1">
            <input
              type="color"
              value={data.primaryColor}
              onChange={(e) => onUpdate({ primaryColor: e.target.value })}
              className="h-8 w-8 rounded-full border border-input cursor-pointer bg-transparent"
              aria-label="Özel renk seç"
            />
            <span className="text-xs text-muted-foreground font-mono">{data.primaryColor}</span>
          </div>
        </div>

        {/* Canlı önizleme */}
        <div className="rounded-xl border border-border p-4 bg-background space-y-3">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Canlı Önizleme</p>
          <div className="flex items-center gap-3">
            {data.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.logoUrl}
                alt="Kurum logosu"
                className="h-10 w-10 rounded-lg object-cover border border-border"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ backgroundColor: data.primaryColor }}
              >
                {(data.tenantName || 'MM').slice(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-foreground">
                {data.tenantName || 'Kurumunuz'}
              </p>
              <p className="text-xs" style={{ color: data.primaryColor }}>
                mentimentor.app/{data.slug || 'kurum-adi'}
              </p>
            </div>
          </div>
        </div>

      </div>

      <p className="text-xs text-muted-foreground text-center">Opsiyonel — sonra da ekleyebilirsin.</p>

      <Button type="button" className="w-full" onClick={onNext}>
        Devam Et
      </Button>
    </div>
  );
}
