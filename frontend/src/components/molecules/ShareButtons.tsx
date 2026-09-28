'use client';

/**
 * Molecule: ShareButtons — WhatsApp + LinkedIn paylaşım düğmeleri.
 *
 * Önceden yalnız onboarding DISC sonuç kartında inline duruyordu; F-22 ile görüşme
 * tamamlama kutlaması da paylaşılabilir olduğu için ortak moleküle çıkarıldı (DRY).
 */

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { getSiteUrl } from '@/lib/siteUrl';
import { LINKEDIN_SHARE_CLASS, WHATSAPP_SHARE_CLASS } from '@/lib/a11y/shareColors';

interface ShareButtonsProps {
  /** Paylaşılan metin (WhatsApp gövdesi + LinkedIn başlığı). */
  shareHeadline: string;
  /**
   * LinkedIn paylaşımına eklenen URL. Verilmezse kullanıcının açtığı sitenin kökü kullanılır.
   */
  shareUrl?: string;
}

/**
 * AJ-23: varsayılan paylaşım adresi. Önceki sabit varsayılan ürüne ait olmayan bir alan adına
 * gidiyordu. Canlıda `NEXT_PUBLIC_SITE_URL` her zaman set olmayabildiği için (o zaman
 * `getSiteUrl()` localhost döner) asıl kaynak tarayıcının `window.location.origin`'idir;
 * `getSiteUrl()` yalnız SSR/ilk render yedeğidir. Origin mount sonrası (useEffect) okunur ki
 * sunucu ve istemcinin ilk render'ı aynı kalsın (hydration uyuşmazlığı olmasın).
 */
function useDefaultShareUrl(): string {
  const [url, setUrl] = useState(getSiteUrl);
  useEffect(() => {
    setUrl(window.location.origin);
  }, []);
  return url;
}

export function ShareButtons({ shareHeadline, shareUrl }: ShareButtonsProps) {
  const defaultShareUrl = useDefaultShareUrl();
  const effectiveShareUrl = shareUrl ?? defaultShareUrl;
  const encodedText = encodeURIComponent(shareHeadline);
  const whatsappUrl = `https://wa.me/?text=${encodedText}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(effectiveShareUrl)}&title=${encodedText}`;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'flex flex-1 items-center justify-center gap-2 rounded-xl border border-border',
          WHATSAPP_SHARE_CLASS,
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
          LINKEDIN_SHARE_CLASS,
          'px-4 py-3 text-sm font-semibold transition-colors',
        )}
      >
        <span className="text-base" aria-hidden>💼</span>
        LinkedIn&apos;de Paylaş
      </a>
    </div>
  );
}
