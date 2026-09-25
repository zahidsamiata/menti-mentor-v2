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
import type { CertificationStatus, PendingTagStatus } from '@/types/admin';

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
