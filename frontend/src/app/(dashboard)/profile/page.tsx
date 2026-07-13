'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useApiClient } from '@/hooks/useApiClient';
import { useQuery } from '@/hooks/useQuery';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { UserProfileData } from '@/lib/api/profile';

// ─── Statik seçenekler (ProfileStep ile aynı kural seti) ─────────────────────

const SKILL_CHIPS = [
  'Yazılım Geliştirme', 'Veri Bilimi & AI', 'Ürün Yönetimi', 'Tasarım & UX',
  'Pazarlama & Büyüme', 'Satış', 'Finans & Yatırım', 'Hukuk & Uyum',
  'İnsan Kaynakları', 'Proje Yönetimi', 'Girişimcilik', 'Akademik Araştırma',
  'Sağlık & Biyoteknoloji', 'Mühendislik', 'Eğitim & Mentorluk', 'Sosyal Girişim',
  'Liderlik & Koçluk', 'İletişim & PR', 'Operasyon', 'Sürdürülebilirlik',
];

const DISC_META = {
  D: { archetype: 'Öncü',      icon: '🦅', color: 'text-red-500'    },
  I: { archetype: 'Ateşleyici', icon: '🔥', color: 'text-yellow-500' },
  S: { archetype: 'Yapı Taşı', icon: '🌿', color: 'text-green-500'  },
  C: { archetype: 'Kâşif',     icon: '🧭', color: 'text-blue-500'   },
} as const;

// ─── Yardımcı: Json? alanı string'e çevir ─────────────────────────────────────

function jsonToString(v: unknown): string {
  if (v === null || v === undefined) return '';
  if (typeof v === 'string') return v;
  return JSON.stringify(v);
}

// ─── Profil sayfası ───────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { user, accessToken, isLoading: authLoading } = useAuth();
  const api = useApiClient();
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Form alanları
  const [bioSummary,       setBioSummary]       = useState('');
  const [expertiseDetails, setExpertiseDetails] = useState('');
  const [targetAudience,   setTargetAudience]   = useState('');
  const [education,        setEducation]        = useState('');
  const [pastProjects,     setPastProjects]     = useState('');
  const [volunteerHistory, setVolunteerHistory] = useState('');
  const [skills,           setSkills]           = useState<string[]>([]);
  const [linkedinUrl,      setLinkedinUrl]      = useState('');
  const [instagramUrl,     setInstagramUrl]     = useState('');

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) router.replace('/login');
  }, [user, authLoading, router]);

  // Profil verisi yükle
  const fetcher = useCallback(
    () => api<UserProfileData>(`/api/users/${user?.id}`),
    [api, user?.id],
  );
  const { data: profile, isLoading: profileLoading } = useQuery<UserProfileData>(
    fetcher,
    [user?.id],
    { enabled: !!user?.id },
  );

  // Form alanlarını mevcut veriyle doldur
  useEffect(() => {
    if (!profile) return;
    setBioSummary(profile.bioSummary ?? '');
    setExpertiseDetails(profile.expertiseDetails ?? '');
    setTargetAudience(profile.targetAudience ?? '');
    setEducation(jsonToString(profile.education));
    setPastProjects(jsonToString(profile.pastProjects));
    setVolunteerHistory(jsonToString(profile.volunteerHistory));
    setSkills(profile.skills ?? []);
    setLinkedinUrl(profile.linkedinUrl ?? '');
    setInstagramUrl(profile.instagramUrl ?? '');
  }, [profile]);

  const toggleSkill = (skill: string) =>
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );

  const handleSave = async () => {
    if (!accessToken || !user) return;
    setSaving(true);
    setSaveError(null);

    const result = await api<UserProfileData>('/api/users/me/profile', {
      method: 'PATCH',
      body: {
        bioSummary:       bioSummary       || null,
        expertiseDetails: expertiseDetails || null,
        targetAudience:   targetAudience   || null,
        education:        education        || undefined,
        pastProjects:     pastProjects     || undefined,
        volunteerHistory: volunteerHistory || undefined,
        skills,
        linkedinUrl:  linkedinUrl  || null,
        instagramUrl: instagramUrl || null,
      },
    });

    setSaving(false);
    if (result.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setSaveError(result.error.message ?? 'Kayıt başarısız. Lütfen tekrar deneyin.');
    }
  };

  if (authLoading || profileLoading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-muted-foreground animate-pulse">Yükleniyor…</p>
      </div>
    );
  }

  if (!user) return null;

  const discMeta = user.discType ? DISC_META[user.discType] : null;

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-16">

      {/* ── Başlık ────────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{user.fullName}</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{user.email}</p>
      </div>

      {/* ── DISC sonucu (salt okunur) ─────────────────────────────────── */}
      {discMeta ? (
        <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
          <span className="text-3xl">{discMeta.icon}</span>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">DISC Tipin</p>
            <p className={cn('text-lg font-bold', discMeta.color)}>
              {user.discType} — {discMeta.archetype}
            </p>
          </div>
          <Link
            href="/disc-test"
            className="text-xs text-primary hover:underline shrink-0"
          >
            Testi yenile →
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Henüz DISC testi tamamlanmamış.</p>
          <Link href="/disc-test" className="text-xs text-primary hover:underline">
            Testi Başlat →
          </Link>
        </div>
      )}

      {/* ── Hakkımda ──────────────────────────────────────────────────── */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-2">
          Hakkımda
          <span className="text-xs font-normal text-muted-foreground ml-1">(max 1000 karakter)</span>
        </legend>
        <textarea
          value={bioSummary}
          onChange={(e) => setBioSummary(e.target.value)}
          maxLength={1000}
          rows={4}
          placeholder="Kendinizi kısaca tanıtın…"
          className={cn(
            'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
            'resize-y transition-colors placeholder:text-muted-foreground',
          )}
        />
        <p className="text-xs text-muted-foreground text-right mt-1">
          {bioSummary.length}/1000
        </p>
      </fieldset>

      {/* ── MENTOR: Uzmanlık & Hedef kitle ────────────────────────────── */}
      {user.role === 'MENTOR' && (
        <>
          <fieldset>
            <legend className="text-sm font-semibold text-foreground mb-2">
              Uzmanlık Alanı
              <span className="text-xs font-normal text-muted-foreground ml-1">(max 1000 karakter)</span>
            </legend>
            <textarea
              value={expertiseDetails}
              onChange={(e) => setExpertiseDetails(e.target.value)}
              maxLength={1000}
              rows={3}
              placeholder="Hangi konularda rehberlik sunabilirsiniz?"
              className={cn(
                'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
                'resize-y transition-colors placeholder:text-muted-foreground',
              )}
            />
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-foreground mb-2">
              Kimler Benimle Görüşmeli?
              <span className="text-xs font-normal text-muted-foreground ml-1">(max 500 karakter)</span>
            </legend>
            <textarea
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              maxLength={500}
              rows={2}
              placeholder="Hangi profildeki kişilerle çalışmayı tercih edersiniz?"
              className={cn(
                'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
                'resize-y transition-colors placeholder:text-muted-foreground',
              )}
            />
          </fieldset>
        </>
      )}

      {/* ── Beceriler ─────────────────────────────────────────────────── */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-3">
          Beceriler{' '}
          <span className="text-xs font-normal text-muted-foreground">(birden fazla seçilebilir)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {SKILL_CHIPS.map((skill) => {
            const selected = skills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                aria-pressed={selected}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-150',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  selected
                    ? 'bg-primary/15 text-primary border-primary shadow-sm scale-105'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground',
                )}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* ── Eğitim ────────────────────────────────────────────────────── */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-2">Eğitim</legend>
        <textarea
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          maxLength={2000}
          rows={3}
          placeholder="Öğrenim geçmişiniz (okul, bölüm, yıl…)"
          className={cn(
            'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
            'resize-y transition-colors placeholder:text-muted-foreground',
          )}
        />
      </fieldset>

      {/* ── Geçmiş Projeler ───────────────────────────────────────────── */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-2">Geçmiş Projeler</legend>
        <textarea
          value={pastProjects}
          onChange={(e) => setPastProjects(e.target.value)}
          maxLength={2000}
          rows={3}
          placeholder="Öne çıkan projeleriniz ve katkılarınız…"
          className={cn(
            'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
            'resize-y transition-colors placeholder:text-muted-foreground',
          )}
        />
      </fieldset>

      {/* ── Gönüllü Geçmişi ───────────────────────────────────────────── */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-2">Gönüllü Çalışmalar</legend>
        <textarea
          value={volunteerHistory}
          onChange={(e) => setVolunteerHistory(e.target.value)}
          maxLength={2000}
          rows={3}
          placeholder="Gönüllü aktivite ve kuruluşlar…"
          className={cn(
            'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
            'resize-y transition-colors placeholder:text-muted-foreground',
          )}
        />
      </fieldset>

      {/* ── Sosyal Linkler ────────────────────────────────────────────── */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-foreground mb-2">Sosyal Bağlantılar</legend>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">LinkedIn URL</label>
          <input
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            placeholder="https://linkedin.com/in/kullaniciadiniz"
            className={cn(
              'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
              'transition-colors placeholder:text-muted-foreground',
            )}
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Instagram URL</label>
          <input
            type="url"
            value={instagramUrl}
            onChange={(e) => setInstagramUrl(e.target.value)}
            placeholder="https://instagram.com/kullaniciadiniz"
            className={cn(
              'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
              'transition-colors placeholder:text-muted-foreground',
            )}
          />
        </div>
      </fieldset>

      {/* ── Geri bildirim ─────────────────────────────────────────────── */}
      {saveError && (
        <p className="text-sm text-destructive text-center" role="alert">{saveError}</p>
      )}
      {saved && (
        <p className="text-sm text-green-600 text-center font-medium" role="status">
          Profil başarıyla kaydedildi.
        </p>
      )}

      {/* ── Kaydet ────────────────────────────────────────────────────── */}
      <Button
        onClick={handleSave}
        disabled={saving}
        size="lg"
        className="w-full h-12 text-base rounded-xl"
      >
        {saving ? 'Kaydediliyor…' : 'Kaydet'}
      </Button>
    </div>
  );
}
