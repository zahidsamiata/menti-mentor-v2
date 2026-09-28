/**
 * Organism: AdminPoolCard — yönetici mentör/menti havuzunda tek kişinin kartı (AJ-63).
 *
 * Neden kart: admin KARAR 2 (`docs/kararlar/konu/tasarim-kararlari-admin.md` § KARAR 2) havuzun yatay
 * tablo yerine KART görünümünde olmasını istiyor. Yöneticinin kartında: fotoğraf · isim · DISC tipi ·
 * durum rozeti (KARAR 3) · sertifika rozeti (KARAR 4, yalnız pozitif) · aksiyon.
 * Eski tablonun geri kalan sütunları (e-posta, sektörler, onay/red izi, kalite puanı, öğrenme yolculuğu,
 * kayıt tarihi) bilgi kaybı olmasın diye kartın alt bölümünde durur — eski tablo: `docs/arsiv/silinenler-2026-09-28-AJ-63.md`.
 *
 * Mahremiyet: DISC yalnız backend'in türettiği harf dizgesiyle (`discLetters`) gösterilir; ham vektör
 * bu bileşene hiç gelmez (KARAR 5, backend `adminController` vektörü yanıttan çıkarır).
 *
 * Aksiyon: karttan yeni bir yönetim işlemi (onay/pasifleştirme) YAPILMAZ — o işlemler kendi ekranlarında
 * (Onay sayfası). Kart yalnız mevcut yollara bağlantı verir: e-posta ve (bekleyen kişide) Onay sayfası.
 */

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { UserAvatar } from '@/components/atoms/UserAvatar';
import { DiscBadge } from '@/components/atoms/DiscBadge';
import { qualityToFive } from '@/lib/adminMetrics';
import { userStatusBadge } from '@/lib/enumLabels';
import type { AdminUser } from '@/types/admin';

/** Kart üstünde gösterilen sektör etiketi sayısı; fazlası "+n" olarak özetlenir (eski tabloyla aynı). */
const VISIBLE_SECTOR_COUNT = 2;
const AVATAR_SIZE_PX = 48;
const APPROVALS_PATH = '/admin/approvals';

const formatDate = (iso: string) => new Date(iso).toLocaleDateString('tr-TR');

const ACTION_LINK_CLASS =
  'inline-flex items-center rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground ' +
  'transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

interface AdminPoolCardProps {
  user: AdminUser;
  /** Mentör havuzu: sertifika rozeti + kalite puanı gösterilir (menti havuzunda anlamsız). */
  variant: 'mentor' | 'menti';
}

export function AdminPoolCard({ user, variant }: AdminPoolCardProps) {
  const isMentor = variant === 'mentor';
  // Pasif > onay durumu (AJ-65, gerekçe: enumLabels.userStatusBadge).
  const status = userStatusBadge(user);
  const sectorTags = user.sectorTags ?? [];
  const nameId = `pool-card-name-${user.id}`;
  const qualityFive = isMentor ? qualityToFive(user.qualityMultiplier) : null;

  return (
    <article
      aria-labelledby={nameId}
      data-testid="admin-pool-card"
      className="flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm"
    >
      {/* Üst: fotoğraf · isim · e-posta · DISC */}
      <div className="flex items-start gap-3">
        <UserAvatar src={user.avatarUrl} name={user.fullName} size={AVATAR_SIZE_PX} className="text-sm" />
        <div className="min-w-0 flex-1">
          <h2 id={nameId} className="truncate text-base font-semibold" title={user.fullName}>
            {user.fullName}
          </h2>
          <p className="truncate text-xs text-muted-foreground" title={user.email}>
            {user.email}
          </p>
        </div>
        {/* DISC — #12 çoklu harf (ör. "Di"); birincil harfe göre renk. */}
        <div className="shrink-0 text-right text-xs">
          <span className="block text-muted-foreground">DISC</span>
          <DiscBadge discLetters={user.discLetters} discType={user.discType} />
        </div>
      </div>

      {/* Rozetler: durum (KARAR 3) + sertifika (KARAR 4 — sertifikasızda rozet yok) */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={status.variant} className="text-xs" data-testid="pool-status-badge">
          {status.label}
        </Badge>
        {isMentor && user.isCertified && (
          <Badge variant="success" className="text-xs" data-testid="pool-cert-badge">
            ✓ Sertifikalı
          </Badge>
        )}
      </div>

      {/* Onay/red izi (İş 2) + red gerekçesi (İş 3) — yalnız admin */}
      {user.approvalStatus === 'APPROVED' && user.approvedAt && (
        <p className="text-xs text-muted-foreground">
          Onaylayan: {user.approvedByName ?? 'bir yönetici'} · {formatDate(user.approvedAt)}
        </p>
      )}
      {user.approvalStatus === 'REJECTED' && (user.rejectedAt || user.rejectionReason) && (
        <div className="space-y-0.5 text-xs text-muted-foreground">
          {user.rejectedAt && (
            <p>
              Reddeden: {user.rejectedByName ?? 'bir yönetici'} · {formatDate(user.rejectedAt)}
            </p>
          )}
          {user.rejectionReason && (
            <p className="line-clamp-2 italic" title={user.rejectionReason}>
              “{user.rejectionReason}”
            </p>
          )}
        </div>
      )}

      {/* Ayrıntılar: eski tablonun kalan sütunları */}
      <dl className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-1 text-xs">
        <dt className="text-muted-foreground">Sektörler</dt>
        <dd className="min-w-0 truncate">
          {sectorTags.length > 0 ? (
            <>
              {sectorTags.slice(0, VISIBLE_SECTOR_COUNT).join(', ')}
              {sectorTags.length > VISIBLE_SECTOR_COUNT && ` +${sectorTags.length - VISIBLE_SECTOR_COUNT}`}
            </>
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </dd>

        {/* Kalite Puanı — #7 Aşama 1: feedback-türevi (5 üzerinden). YALNIZ yönetici (KVKK §5).
            Veri/üyelik yoksa "—". Ham çarpan gösterilmez; qualityToFive ile çevrilir. */}
        {isMentor && (
          <>
            <dt className="text-muted-foreground">Kalite puanı</dt>
            <dd>
              {qualityFive === null ? (
                <span className="text-muted-foreground" title="Henüz yeterli değerlendirme yok">—</span>
              ) : (
                <span className="font-medium tabular-nums">{qualityFive.toFixed(1)} / 5</span>
              )}
            </dd>
          </>
        )}

        {/* Öğrenme Yolculuğu — #34: tamamlandıysa tarih (✓), yoksa "—". Retention göstergesi. */}
        <dt className="text-muted-foreground">Öğrenme yolculuğu</dt>
        <dd>
          {user.learningJourneyCompletedAt ? (
            <span className="font-medium text-emerald-800 dark:text-emerald-300">
              ✓ {formatDate(user.learningJourneyCompletedAt)}
            </span>
          ) : (
            <span className="text-muted-foreground" title="Öğrenme yolculuğu henüz tamamlanmadı">—</span>
          )}
        </dd>

        <dt className="text-muted-foreground">Kayıt</dt>
        <dd>{formatDate(user.createdAt)}</dd>
      </dl>

      {/* Aksiyon */}
      <div className="mt-auto flex flex-wrap gap-2 border-t border-border pt-3">
        {user.approvalStatus === 'PENDING' && (
          <Link
            href={APPROVALS_PATH}
            className={ACTION_LINK_CLASS}
            aria-label={`${user.fullName} için onay ekranına git`}
          >
            Onay ekranına git →
          </Link>
        )}
        <a
          href={`mailto:${user.email}`}
          className={ACTION_LINK_CLASS}
          aria-label={`${user.fullName} kişisine e-posta gönder`}
        >
          E-posta gönder
        </a>
      </div>
    </article>
  );
}
