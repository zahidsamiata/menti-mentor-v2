'use client';

import { GraduationCap, Heart, Users, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { WizardData } from '../_StkOnboardingContent';

interface Props {
  data: WizardData;
  onUpdate: (p: Partial<WizardData>) => void;
  onNext: () => void;
}

type Template = WizardData['programTemplate'];

const TEMPLATES: Array<{
  value: Template;
  icon: React.ElementType;
  title: string;
  description: string;
  bullets: string[];
}> = [
  {
    value: 'MEZUN',
    icon: GraduationCap,
    title: 'Mezun Mentörlüğü',
    description: 'Mezunların aktif üyelerle birebir mentorlük yapması.',
    bullets: ['Kariyer yönlendirme odaklı', 'Uzun soluklu eşleşmeler', 'Etki raporu dahil'],
  },
  {
    value: 'KULUP',
    icon: Users,
    title: 'Kulüp İçi',
    description: 'Aynı kulüpte deneyimli ve yeni üyeler arası köprü.',
    bullets: ['Hızlı kısa dönemli eşleşmeler', 'Proje bazlı destek', 'Kulüp aktivitesi takibi'],
  },
  {
    value: 'GONULLU',
    icon: Heart,
    title: 'Gönüllü Gelişimi',
    description: 'Gönüllülerin becerilerini geliştirdiği yapılandırılmış program.',
    bullets: ['Beceri bazlı eşleştirme', 'Sertifikasyon desteği', 'Sosyal etki metrikleri'],
  },
  {
    value: 'OZEL',
    icon: Wrench,
    title: 'Sıfırdan Kur',
    description: 'Tüm ayarları kendin yapılandır.',
    bullets: ['Tam özelleştirme', 'Hazır şablon yok', 'İleri düzey kullanıcılar için'],
  },
];

export function Step2Template({ data, onUpdate, onNext }: Props) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TEMPLATES.map(({ value, icon: Icon, title, description, bullets }) => {
          const active = data.programTemplate === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onUpdate({ programTemplate: value })}
              className={cn(
                'text-left rounded-xl border p-4 transition-all hover:border-primary/50',
                active
                  ? 'border-primary bg-primary/5 ring-2 ring-primary ring-offset-2 ring-offset-background'
                  : 'border-border bg-card',
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-lg',
                  active ? 'bg-primary/20' : 'bg-muted',
                )}>
                  <Icon className={cn('h-4 w-4', active ? 'text-primary' : 'text-muted-foreground')} aria-hidden />
                </div>
                <span className="text-sm font-semibold text-foreground">{title}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2 leading-snug">{description}</p>
              <ul className="space-y-0.5">
                {bullets.map((b) => (
                  <li key={b} className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className={cn('h-1 w-1 rounded-full shrink-0', active ? 'bg-primary' : 'bg-muted-foreground/40')} />
                    {b}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground text-center">Her şeyi sonra değiştirebilirsin.</p>

      <Button type="button" className="w-full" onClick={onNext}>
        Devam Et
      </Button>
    </div>
  );
}
