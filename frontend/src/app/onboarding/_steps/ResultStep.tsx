'use client';

import Link from 'next/link';
import { ArrowRight, Zap, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfettiBlast } from '@/components/atoms/ConfettiBlast';
import { cn } from '@/lib/utils';
import type { DiscResultCard } from '@/types/onboarding';

// ─── Paylaşım butonları ───────────────────────────────────────────────────────

interface ShareButtonsProps {
  shareHeadline: string;
}

function ShareButtons({ shareHeadline }: ShareButtonsProps) {
  const encodedText = encodeURIComponent(shareHeadline);
  const whatsappUrl = `https://wa.me/?text=${encodedText}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://menti-mentor.io')}&title=${encodedText}`;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'flex flex-1 items-center justify-center gap-2 rounded-xl border border-border',
          'bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20',
          'px-4 py-3 text-sm font-semibold transition-colors',
        )}
      >
        <span className="text-base" aria-hidden>💬</span>
        WhatsApp&apos;ta Paylaş
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'flex flex-1 items-center justify-center gap-2 rounded-xl border border-border',
          'bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20',
          'px-4 py-3 text-sm font-semibold transition-colors',
        )}
      >
        <span className="text-base" aria-hidden>💼</span>
        LinkedIn&apos;de Paylaş
      </a>
    </div>
  );
}

// ─── ResultStep ───────────────────────────────────────────────────────────────

interface ResultStepProps {
  resultCard: DiscResultCard;
}

export function ResultStep({ resultCard }: ResultStepProps) {
  return (
    <>
      {/* Konfeti — sayfanın üzerinde yüzer */}
      <ConfettiBlast />

      <div className="space-y-6">

        {/* ── Aha Anı Kartı ──────────────────────────────────────────────── */}
        <div className={cn(
          'relative overflow-hidden rounded-2xl border-2 border-primary/30',
          'bg-gradient-to-br from-primary/5 via-card to-primary/10',
          'p-6 shadow-lg shadow-primary/10 text-center',
        )}>
          {/* Arketip ikonu */}
          <div className="mb-4 text-6xl leading-none" aria-hidden>
            {resultCard.icon}
          </div>

          {/* Başlık */}
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
            Sen bir{' '}
            <span className="text-primary">{resultCard.archetype}</span>
            sın!
          </h2>

          {/* Süper güç */}
          <p className="text-sm font-semibold text-primary/80 mb-4">
            ✦ {resultCard.superPower}
          </p>

          {/* Açıklama */}
          <p className="text-sm text-muted-foreground leading-relaxed text-balance mb-5">
            {resultCard.description}
          </p>

          {/* Güçlü yanlar */}
          <div className="flex flex-wrap gap-2 justify-center mb-5">
            {resultCard.strengths.map((strength) => (
              <span
                key={strength}
                className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium"
              >
                {strength}
              </span>
            ))}
          </div>

          {/* İstatistik çubuğu */}
          <div className="grid grid-cols-3 gap-2 rounded-xl bg-background/60 p-3 text-xs">
            {[
              { icon: Zap,       label: 'Dominant',   value: resultCard.dominant   },
              { icon: TrendingUp, label: 'Uyum',      value: `${Math.round((resultCard.discVector[resultCard.dominant] ?? 0) * 100)}%` },
              { icon: Users,     label: 'En İyi Eş',  value: resultCard.compatibleWith.join(' + ') },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon className="h-4 w-4 text-primary" aria-hidden />
                <span className="text-muted-foreground">{label}</span>
                <span className="font-bold text-foreground">{value}</span>
              </div>
            ))}
          </div>

          {/* Büyüme alanı — alt şerit */}
          <div className="mt-4 rounded-xl bg-muted/60 p-3 text-left">
            <p className="text-xs font-semibold text-muted-foreground mb-0.5">💡 Gelişim Alanın</p>
            <p className="text-xs text-muted-foreground">{resultCard.growthArea}</p>
          </div>
        </div>

        {/* ── Paylaşım Butonları ──────────────────────────────────────── */}
        <ShareButtons shareHeadline={resultCard.shareHeadline} />

        {/* ── Devam Et ────────────────────────────────────────────────── */}
        <Button asChild size="lg" className="w-full h-12 text-base rounded-xl gap-2">
          <Link href="/dashboard">
            Eşleşme Bekleme Salonuna Geç
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Profilin onaylandığında en uygun{' '}
          {resultCard.compatibleWith.join(' veya ')} profilli kişiyle eşleştirileceksin.
        </p>
      </div>
    </>
  );
}
