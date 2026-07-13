/**
 * Organism: InvitationCard
 *
 * Davet linkiyle gelen üyenin ilk durağı — "Soğuk Karşılama" ekranı.
 * Tenant marka rengi ve logosu dinamik olarak uygulanır.
 * Tüm renkler CSS custom property üzerinden gelir; parent tarafından enjekte edilir.
 */

import Link from 'next/link';
import { Users, GraduationCap, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { TenantLogo } from '@/components/atoms/TenantLogo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { InvitationData } from '@/types/invitation';

// ─── Role Badge ───────────────────────────────────────────────────────────────

const ROLE_CONFIG = {
  MENTOR: {
    icon:  Users,
    label: 'Mentör Davetiyesi',
    desc:  'Deneyimlerinizi paylaşarak bir mentiyi şekillendireceksiniz.',
  },
  MENTI: {
    icon:  GraduationCap,
    label: 'Menti Davetiyesi',
    desc:  'Sizi en iyi anlayan mentörle buluşturacağız.',
  },
} as const;

interface RoleBadgeProps {
  role: 'MENTOR' | 'MENTI';
}

function RoleBadge({ role }: RoleBadgeProps) {
  const { icon: Icon, label } = ROLE_CONFIG[role];
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-semibold">
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      {label}
    </span>
  );
}

// ─── InvitationCard ──────────────────────────────────────────────────────────

interface InvitationCardProps {
  data:  InvitationData;
  token: string;
}

export function InvitationCard({ data, token }: InvitationCardProps) {
  const roleDesc = ROLE_CONFIG[data.role].desc;
  const registerHref = `/register?token=${encodeURIComponent(token)}`;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-sm sm:max-w-md text-center">

      {/* ── Logo ─────────────────────────────────────────────────────────── */}
      <div className="relative">
        {/* Glow ring — brand renginde ışıma efekti */}
        <div
          className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl scale-110"
          aria-hidden
        />
        <div className="relative rounded-2xl bg-card border border-border shadow-md p-4">
          <TenantLogo
            tenant={{ displayName: data.tenantName, logoUrl: data.logoUrl }}
            size={72}
            className="rounded-xl"
          />
        </div>
      </div>

      {/* ── Başlık bloğu ─────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <RoleBadge role={data.role} />

        {/* Davet eden şeffaflığı */}
        {data.invitedByName && (
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{data.invitedByName}</span>
            {data.invitedByTitle && (
              <span className="text-muted-foreground"> ({data.invitedByTitle})</span>
            )}
            {' '}sizi davet etti.
          </p>
        )}

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight text-balance">
          {data.tenantName} Mentörlük Ağına
          <br />
          <span className="text-primary">Hoş Geldiniz</span>
        </h1>

        <p className="text-base text-muted-foreground leading-relaxed text-balance">
          {roleDesc} Sizi, karakter ve uzmanlık uyumuna göre{' '}
          <strong className="text-foreground font-medium">
            size en uygun kişiyle
          </strong>{' '}
          eşleştireceğiz.
          <br />
          <span className="inline-flex items-center gap-1 mt-1 text-sm text-primary font-medium">
            <Sparkles className="h-4 w-4" aria-hidden />
            Sadece 3 dakika sürer.
          </span>
        </p>
      </div>

      {/* ── Kart — CTA ───────────────────────────────────────────────────── */}
      <div className={cn(
        'w-full rounded-2xl border border-border bg-card shadow-sm',
        'p-6 space-y-4',
      )}>
        {/* Üç adım özeti */}
        <ol className="text-left space-y-2.5" aria-label="Kayıt adımları">
          {[
            'Kısa profilini doldur',
            'Oyunlaştırılmış mizaç testini çöz',
            'Eşleşmeni ve mizaç kartını al',
          ].map((step, i) => (
            <li key={step} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        {/* CTA Button */}
        <Button asChild size="lg" className="w-full h-13 text-base rounded-xl gap-2">
          <Link href={registerHref}>
            Ücretsiz Kaydol ve Başla
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
        </Button>

        {/* KVKK Mikro-Metni */}
        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary/70" aria-hidden />
          Bilgileriniz KVKK uyumlu, kapalı devre ve güvendedir.
        </p>
      </div>

      {/* Şüphe bildirimi linki */}
      <p className="text-xs text-muted-foreground">
        Bu daveti tanımıyor musunuz?{' '}
        <Link href="/bildir" className="underline hover:text-foreground transition-colors">
          Bildirin
        </Link>
      </p>

    </div>
  );
}
