'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ProfileData } from '@/types/onboarding';

// ─── Statik veriler ────────────────────────────────────────────────────────────

const SECTORS = [
  'Teknoloji', 'Finans', 'Sağlık', 'Eğitim', 'Pazarlama',
  'Hukuk', 'Danışmanlık', 'Girişimcilik', 'Mühendislik',
  'Tasarım & UX', 'İnsan Kaynakları', 'Akademi', 'Diğer',
];

const SKILL_CHIPS = [
  'Yazılım Geliştirme', 'Veri Bilimi & AI', 'Ürün Yönetimi', 'Tasarım & UX',
  'Pazarlama & Büyüme', 'Satış', 'Finans & Yatırım', 'Hukuk & Uyum',
  'İnsan Kaynakları', 'Proje Yönetimi', 'Girişimcilik', 'Akademik Araştırma',
  'Sağlık & Biyoteknoloji', 'Mühendislik', 'Eğitim & Mentorluk', 'Sosyal Girişim',
  'Liderlik & Koçluk', 'İletişim & PR', 'Operasyon', 'Sürdürülebilirlik',
];

const EXPERIENCE_OPTIONS = [
  { label: 'Öğrenci',  sub: 'Henüz kariyerimin başındayım', years: 0  },
  { label: '0–2 Yıl',  sub: 'Kariyerimi yeni kuruyorum',    years: 1  },
  { label: '3–7 Yıl',  sub: 'Alanımda deneyim kazandım',   years: 5  },
  { label: '8+ Yıl',   sub: 'Alanımda uzmanlaştım',        years: 10 },
] as const;

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProfileStepProps {
  onComplete:  (data: ProfileData) => void;
  isSubmitting: boolean;
  error:        string | null;
}

// ─── ProfileStep ─────────────────────────────────────────────────────────────

export function ProfileStep({ onComplete, isSubmitting, error }: ProfileStepProps) {
  const [sector,      setSector]      = useState('');
  const [skills,      setSkills]      = useState<string[]>([]);
  const [expYears,    setExpYears]    = useState<number | null>(null);

  const toggleSkill = (skill: string) =>
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );

  const canSubmit = sector !== '' && expYears !== null;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onComplete({ sector, skills, experienceYears: expYears! });
  };

  return (
    <div className="space-y-8">
      {/* ── Sektör seçimi ──────────────────────────────────────────────── */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-3">
          Sektörün / Alanın <span className="text-destructive">*</span>
        </legend>
        <div className="relative">
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className={cn(
              'w-full appearance-none rounded-xl border border-border bg-background',
              'px-4 py-3 pr-10 text-sm transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
              sector ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            <option value="" disabled>Sektörünü seçin…</option>
            {SECTORS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {/* Chevron ikonu */}
          <ChevronRight
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 h-4 w-4 text-muted-foreground"
            aria-hidden
          />
        </div>
      </fieldset>

      {/* ── Beceri çipleri ─────────────────────────────────────────────── */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-3">
          İlgi Alanları & Beceriler{' '}
          <span className="text-xs text-muted-foreground font-normal">(birden fazla seçilebilir)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {SKILL_CHIPS.map((skill) => {
            const selected = skills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-150',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  selected
                    ? 'bg-primary/15 text-primary border-primary shadow-sm scale-105'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground',
                )}
                aria-pressed={selected}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* ── Deneyim yılı ───────────────────────────────────────────────── */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-3">
          Deneyim Yılı <span className="text-destructive">*</span>
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {EXPERIENCE_OPTIONS.map((opt) => {
            const selected = expYears === opt.years;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => setExpYears(opt.years)}
                className={cn(
                  'rounded-xl border p-4 text-left transition-all duration-150',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  selected
                    ? 'bg-primary/10 border-primary text-foreground shadow-sm'
                    : 'bg-card border-border text-foreground hover:border-primary/40 hover:bg-muted/50',
                )}
                aria-pressed={selected}
              >
                <p className={cn('text-base font-bold', selected && 'text-primary')}>
                  {opt.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{opt.sub}</p>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* ── Hata ─────────────────────────────────────────────────────── */}
      {error && (
        <p className="text-sm text-destructive text-center" role="alert">{error}</p>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <Button
        onClick={handleSubmit}
        disabled={!canSubmit || isSubmitting}
        size="lg"
        className="w-full h-12 text-base rounded-xl gap-2"
      >
        {isSubmitting ? 'Kaydediliyor…' : 'Devam Et — Mizaç Testine Geç'}
        {!isSubmitting && <ChevronRight className="h-4 w-4" aria-hidden />}
      </Button>
    </div>
  );
}
