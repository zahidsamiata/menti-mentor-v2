/**
 * Ekrana basılan backend enum'larının Türkçe karşılıkları — TEK kaynak.
 *
 * Neden: rol / etiket durumu / görüşme formatı / sertifika durumu gibi değerler
 * birkaç ekranda ham İngilizce (MENTOR, IN_PERSON, COOLDOWN…) görünüyordu; her sayfa
 * kendi sözlüğünü yazınca bir kısmı unutuluyordu. Yeni bir ekran enum basacaksa
 * buradaki yardımcıyı kullanır.
 *
 * Bilinmeyen değer (backend'e yeni enum eklendi ama burası güncellenmedi) → ham değer
 * aynen döner; ekran boş kalmaz, eksik çeviri göze çarpar.
 */
import type { CertificationStatus, PendingTagStatus, ReportReason, ReportStatus } from '@/types/admin';
import type { ApprovalStatus } from '@/types/auth';

function labelFrom(map: Record<string, string>, value: string | null | undefined): string {
  if (!value) return '—';
  return map[value] ?? value;
}

// Not: `lib/kvkkSummary.ts` aynı eşlemenin bir kopyasını taşır; KVKK dosyası bu işte
// bilerek değiştirilmedi (ayrı iş: oradan da buraya bağlanmalı).
export const ROLE_LABELS: Record<string, string> = {
  MENTI: 'Menti',
  MENTOR: 'Mentör',
  ADMIN: 'Kurum Yöneticisi',
  PLATFORM_ADMIN: 'Platform Yöneticisi',
};

export const roleLabel = (role: string | null | undefined): string => labelFrom(ROLE_LABELS, role);

export const TAG_STATUS_LABELS: Record<PendingTagStatus, string> = {
  PENDING: 'Bekliyor',
  APPROVED: 'Onaylandı',
  MERGED: 'Birleştirildi',
  REJECTED: 'Reddedildi',
};

export const tagStatusLabel = (status: string | null | undefined): string =>
  labelFrom(TAG_STATUS_LABELS, status);

export const MEETING_FORMAT_LABELS: Record<string, string> = {
  ONLINE: 'Online',
  IN_PERSON: 'Yüz yüze',
  PHONE: 'Telefon',
};

export const meetingFormatLabel = (format: string | null | undefined): string =>
  labelFrom(MEETING_FORMAT_LABELS, format);

/** Sertifika durumu rozeti — tema uyumlu, dark modda çiftli renkler. */
export const CERT_STATUS_BADGE: Record<CertificationStatus, { label: string; className: string }> = {
  CERTIFIED:   { label: 'Sertifikalı',  className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300' },
  FAILED:      { label: 'Başarısız',    className: 'bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300' },
  COOLDOWN:    { label: 'Bekleme',      className: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300' },
  NOT_STARTED: { label: 'Başlamamış',   className: 'bg-muted text-muted-foreground' },
  IN_PROGRESS: { label: 'Devam ediyor', className: 'bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300' },
};

const CERT_STATUS_FALLBACK_CLASS = 'bg-muted text-muted-foreground';

/** Bilinmeyen durumda ham değeri nötr renkle döner. */
export function certStatusBadge(status: string | null | undefined): { label: string; className: string } {
  const known = status ? CERT_STATUS_BADGE[status as CertificationStatus] : undefined;
  return known ?? { label: status || '—', className: CERT_STATUS_FALLBACK_CLASS };
}

/** Sistem log seviyesi (platform paneli). AUDIT kategorisi ayrıca "Denetim" gösterilir. */
export const LOG_LEVEL_LABELS: Record<string, string> = {
  INFO: 'Bilgi',
  WARN: 'Uyarı',
  ERROR: 'Hata',
};

export const logLevelLabel = (level: string | null | undefined): string => labelFrom(LOG_LEVEL_LABELS, level);

export const logBadgeLabel = (log: { level: string; category: string }): string =>
  log.category === 'AUDIT' ? 'Denetim' : logLevelLabel(log.level);

/** Kullanıcı şikâyeti durumu — platform paneli + kurum şikâyet ekranının TEK kaynağı (AJ-61). */
export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  OPEN: 'Açık',
  REVIEWED: 'İncelendi',
  DISMISSED: 'Reddedildi',
};

export const reportStatusLabel = (status: string | null | undefined): string =>
  labelFrom(REPORT_STATUS_LABELS, status);

/** Kullanıcı şikâyeti nedeni — platform paneli + kurum şikâyet ekranının TEK kaynağı (AJ-61). */
export const REPORT_REASON_LABELS: Record<ReportReason, string> = {
  SPAM: 'Spam / istenmeyen',
  HARASSMENT: 'Taciz / rahatsız edici',
  INAPPROPRIATE: 'Uygunsuz içerik',
  NO_SHOW: 'Görüşmeye gelmedi',
  OTHER: 'Diğer',
};

export const reportReasonLabel = (reason: string | null | undefined): string =>
  labelFrom(REPORT_REASON_LABELS, reason);

/**
 * Yönetici havuzlarındaki durum rozeti (admin KARAR 3: Onaylı / Bekliyor / Pasif — yalnız
 * yönetici görür, otomatik belirlenir). Mentör ve menti havuzu aynı yardımcıyı kullanır;
 * kart düzenine geçişte (AJ-63) de buradan okunur.
 */
export type UserStatusBadgeVariant = 'success' | 'warning' | 'destructive' | 'secondary';

export interface UserStatusBadge {
  label: string;
  variant: UserStatusBadgeVariant;
}

export const APPROVAL_STATUS_BADGE: Record<ApprovalStatus, UserStatusBadge> = {
  APPROVED: { label: 'Onaylı', variant: 'success' },
  PENDING: { label: 'Bekliyor', variant: 'warning' },
  REJECTED: { label: 'Reddedildi', variant: 'destructive' },
};

export const INACTIVE_STATUS_BADGE: UserStatusBadge = { label: 'Pasif', variant: 'secondary' };

/**
 * Tek rozet döner. Öncelik: pasif > onay durumu.
 * Neden: pasif kişi onay durumundan bağımsız olarak sisteme giremez; "Onaylı" rozeti
 * yöneticiye onu etkin sanır. KARAR 3 durumu tek rozet olarak tanımlar (üç değer), bu yüzden
 * iki rozet yan yana konmaz. Onay/red izi (kim, ne zaman) rozetin altında ayrıca görünmeye
 * devam eder, yani onay bilgisi kaybolmaz.
 */
export function userStatusBadge(user: { isActive: boolean; approvalStatus: ApprovalStatus }): UserStatusBadge {
  if (user.isActive === false) return INACTIVE_STATUS_BADGE;
  return APPROVAL_STATUS_BADGE[user.approvalStatus] ?? { label: user.approvalStatus || '—', variant: 'secondary' };
}
