'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ProfileData, ExpectationCategory, TimeCommitment, InteractionStyle } from '@/types/onboarding';
import type { UserRole } from '@/types/auth';

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

const EXPECTATION_OPTIONS: { value: ExpectationCategory; label: string }[] = [
  { value: 'KARIYER_YONLENDIRME', label: 'Kariyer Yönlendirme' },
  { value: 'TEKNIK_BECERI',       label: 'Teknik Beceri Geliştirme' },
  { value: 'IS_STAJ_BAGLANTISI',  label: 'İş / Staj Bağlantısı' },
  { value: 'GIRISIMCILIK',        label: 'Girişimcilik' },
  { value: 'KISISEL_GELISIM',     label: 'Kişisel Gelişim' },
  { value: 'SEKTOR_TANIMA',       label: 'Sektör Tanıma' },
];

const TIME_COMMITMENT_OPTIONS: { value: TimeCommitment; label: string; sub: string }[] = [
  { value: 'AYDA_1',          label: 'Ayda 1 görüşme',     sub: 'Yoğun takvimler için' },
  { value: 'AYDA_2_3',        label: 'Ayda 2-3 görüşme',   sub: 'Dengeli tempo' },
  { value: 'HAFTADA_1',       label: 'Haftada 1 görüşme',  sub: 'Aktif program' },
  { value: 'HAFTADA_2_PLUS',  label: 'Haftada 2+ görüşme', sub: 'Yoğun program' },
];

const INTERACTION_OPTIONS: { value: InteractionStyle; label: string; desc: string }[] = [
  { value: 'GOREV_BAZLI',   label: 'Görev Bazlı',  desc: 'Belirli hedefler ve aksiyonlar üzerinden ilerlemek' },
  { value: 'SOHBET_BAZLI',  label: 'Sohbet Bazlı', desc: 'Açık keşif ve fikir alışverişi yapmak' },
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProfileStepProps {
  role?:         UserRole;
  onComplete:   (data: ProfileData) => void;
  isSubmitting: boolean;
  error:        string | null;
}

// ─── ProfileStep ─────────────────────────────────────────────────────────────

export function ProfileStep({ role, onComplete, isSubmitting, error }: ProfileStepProps) {
  const [sector,      setSector]      = useState('');
  const [skills,      setSkills]      = useState<string[]>([]);
  const [expYears,    setExpYears]    = useState<number | null>(null);
  // Rol-spesifik
  const [expectations,    setExpectations]    = useState<ExpectationCategory[]>([]);
  const [timeCommitment,  setTimeCommitment]  = useState<TimeCommitment | null>(null);
  const [interactionStyle, setInteractionStyle] = useState<InteractionStyle | null>(null);

  const toggleSkill = (skill: string) =>
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );

  const toggleExpectation = (cat: ExpectationCategory) =>
    setExpectations((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );

  const canSubmit = sector !== '' && expYears !== null;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onComplete({
      sector,
      skills,
      experienceYears: expYears!,
      ...(role === 'MENTI' && expectations.length > 0 && { expectationCategories: expectations }),
      ...(role === 'MENTOR' && timeCommitment   && { timeCommitment  }),
      ...(role === 'MENTOR' && interactionStyle && { interactionStyle }),
    });
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

      {/* ── Menti: Beklenti chip'leri ─────────────────────────────────── */}
      {role === 'MENTI' && (
        <fieldset>
          <legend className="text-sm font-semibold text-foreground mb-3">
            Bu mentörlükten beklentin{' '}
            <span className="text-xs text-muted-foreground font-normal">(birden fazla seçilebilir)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {EXPECTATION_OPTIONS.map(({ value, label }) => {
              const selected = expectations.includes(value);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggleExpectation(value)}
                  className={cn(
                    'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all',
                    selected
                      ? 'bg-primary/15 text-primary border-primary shadow-sm scale-105'
                      : 'bg-background text-muted-foreground border-border hover:border-primary/50',
                  )}
                  aria-pressed={selected}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* ── Mentor: Zaman kotası + etkileşim tarzı ────────────────────── */}
      {role === 'MENTOR' && (
        <>
          <fieldset>
            <legend className="text-sm font-semibold text-foreground mb-3">
              Zaman Kotası
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {TIME_COMMITMENT_OPTIONS.map(({ value, label, sub }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTimeCommitment(value)}
                  className={cn(
                    'rounded-xl border p-3 text-left transition-all',
                    timeCommitment === value
                      ? 'bg-primary/10 border-primary text-foreground'
                      : 'bg-card border-border hover:border-primary/40',
                  )}
                  aria-pressed={timeCommitment === value}
                >
                  <p className="text-sm font-bold">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-foreground mb-3">
              Mentorluk Tarzı
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {INTERACTION_OPTIONS.map(({ value, label, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setInteractionStyle(value)}
                  className={cn(
                    'rounded-xl border p-3 text-left transition-all',
                    interactionStyle === value
                      ? 'bg-primary/10 border-primary text-foreground'
                      : 'bg-card border-border hover:border-primary/40',
                  )}
                  aria-pressed={interactionStyle === value}
                >
                  <p className="text-sm font-bold">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </button>
              ))}
            </div>
          </fieldset>
        </>
      )}

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
