/**
 * K-12 — KVKK veri paketini insan-okunur Türkçe özete çevirir (saf, test edilebilir).
 *
 * `GET /api/me/data-export` ham JSON döner (profil + sayımlar + rıza izi). Kullanıcı bunu
 * çıplak JSON yerine okunur bölümler halinde görebilsin diye burada özetlenir. YENİ UÇ YOK —
 * yalnız mevcut `DataExportResponse` dönüştürülür.
 */

import type { DataExportResponse } from '@/lib/api/kvkk';

export interface DataSummaryRow {
  label: string;
  value: string;
}

export interface DataSummarySection {
  title: string;
  rows: DataSummaryRow[];
}

const ROLE_LABELS: Record<string, string> = {
  MENTI: 'Menti',
  MENTOR: 'Mentör',
  ADMIN: 'Kurum Yöneticisi',
  PLATFORM_ADMIN: 'Platform Yöneticisi',
};

/** Bir profil alanını güvenle string'e çevirir; boşsa null döner. */
function asText(value: unknown): string | null {
  if (value == null) return null;
  if (typeof value === 'string') return value.trim() || null;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) {
    const items = value.map((v) => (typeof v === 'string' ? v : String(v))).filter(Boolean);
    return items.length ? items.join(', ') : null;
  }
  return null;
}

/** ISO tarihi deterministik DD.MM.YYYY'ye çevirir (locale'e bağlı değil). */
export function formatDate(iso: unknown): string {
  const s = typeof iso === 'string' ? iso : '';
  const d = new Date(s);
  if (!s || Number.isNaN(d.getTime())) return '—';
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const yyyy = d.getUTCFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

export function summarizeDataExport(data: DataExportResponse): DataSummarySection[] {
  const profile = toRecord(data.profile);
  const sections: DataSummarySection[] = [];

  // ── Kimlik & profil ──────────────────────────────────────────────
  const roleRaw = asText(profile.role);
  const profileRows: DataSummaryRow[] = [];
  const pushIf = (label: string, value: string | null) => {
    if (value) profileRows.push({ label, value });
  };
  pushIf('Ad Soyad', asText(profile.fullName));
  pushIf('E-posta', asText(profile.email));
  pushIf('Rol', roleRaw ? (ROLE_LABELS[roleRaw] ?? roleRaw) : null);
  pushIf('DISC profili', asText(profile.discType));
  pushIf('Sektör etiketleri', asText(profile.sectorTags));
  pushIf('Beceriler', asText(profile.skills));
  pushIf('Kısa biyografi', asText(profile.bioSummary));
  pushIf('Kayıt tarihi', profile.createdAt ? formatDate(profile.createdAt) : null);
  if (profileRows.length) {
    sections.push({ title: 'Kimlik ve profil bilgileriniz', rows: profileRows });
  }

  // ── Etkinlik özeti (yalnız sayı — içerik değil) ──────────────────
  sections.push({
    title: 'Etkinlik özetiniz',
    rows: [
      { label: 'DISC test yanıtı', value: `${data.responses?.length ?? 0} kayıt` },
      { label: 'Görüşme değerlendirmesi', value: `${data.feedbackLogs?.length ?? 0} kayıt` },
      { label: 'Eşleşme/mesaj talebi', value: `${data.matchRequests?.length ?? 0} kayıt` },
      { label: 'Gönderdiğiniz mesaj', value: `${data.messageCount ?? 0} adet` },
    ],
  });

  // ── Rıza (onay) geçmişi ──────────────────────────────────────────
  const consents = Array.isArray(data.consents) ? data.consents : [];
  const consentRows: DataSummaryRow[] = consents.map((c) => {
    const rec = toRecord(c);
    const type = asText(rec.type) ?? 'Onay';
    const grantedAt = formatDate(rec.grantedAt);
    const revoked = rec.revokedAt ? ` · geri alındı: ${formatDate(rec.revokedAt)}` : '';
    return { label: type, value: `verildi: ${grantedAt}${revoked}` };
  });
  sections.push({
    title: 'Rıza (onay) geçmişiniz',
    rows: consentRows.length ? consentRows : [{ label: 'Kayıt yok', value: 'Henüz onay kaydı bulunmuyor.' }],
  });

  return sections;
}
