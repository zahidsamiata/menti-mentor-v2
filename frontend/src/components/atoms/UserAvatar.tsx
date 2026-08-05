/**
 * Atom: UserAvatar
 *
 * Kullanıcı profil fotoğrafını gösterir. Fotoğraf yoksa (avatarUrl null/boş) adın
 * baş harfinden nötr bir daire üretir — havuz kartlarında tutarlı görsel kimlik.
 *
 * Foto opsiyoneldir; herkeste yoktur. Bu yüzden fallback (baş harf) her zaman korunur.
 * TenantLogo deseniyle aynı yaklaşım (Image varsa göster, yoksa baş harf).
 */

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  /** Profil fotoğrafı URL'i. Yoksa baş harf avatarına düşülür. */
  src?: string | null;
  /** Kullanıcının tam adı — baş harf ve erişilebilirlik etiketi için. */
  name: string;
  /** Avatar boyutu (px). Hem genişlik hem yükseklik. */
  size?: number;
  className?: string;
}

export function UserAvatar({ src, name, size = 36, className }: UserAvatarProps) {
  const initial = name?.trim()?.[0]?.toUpperCase() ?? '?';

  if (src) {
    return (
      <Image
        src={src}
        alt={name ? `${name} profil fotoğrafı` : 'Profil fotoğrafı'}
        width={size}
        height={size}
        className={cn('shrink-0 rounded-full object-cover', className)}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground select-none',
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-label={name ? `${name} baş harfi` : undefined}
    >
      {initial}
    </div>
  );
}
