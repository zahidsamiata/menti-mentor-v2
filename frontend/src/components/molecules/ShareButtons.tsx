'use client';

/**
 * Molecule: ShareButtons — WhatsApp + LinkedIn paylaşım düğmeleri.
 *
 * Önceden yalnız onboarding DISC sonuç kartında inline duruyordu; F-22 ile görüşme
 * tamamlama kutlaması da paylaşılabilir olduğu için ortak moleküle çıkarıldı (DRY).
 */

import { cn } from '@/lib/utils';

interface ShareButtonsProps {
  /** Paylaşılan metin (WhatsApp gövdesi + LinkedIn başlığı). */
  shareHeadline: string;
  /** LinkedIn paylaşımına eklenen URL. */
  shareUrl?: string;
}

export function ShareButtons({ shareHeadline, shareUrl = 'https://menti-mentor.io' }: ShareButtonsProps) {
  const encodedText = encodeURIComponent(shareHeadline);
  const whatsappUrl = `https://wa.me/?text=${encodedText}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodedText}`;

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
