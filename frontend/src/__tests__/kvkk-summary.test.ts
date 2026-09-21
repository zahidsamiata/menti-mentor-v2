/**
 * K-12 — summarizeDataExport (KVKK ham veri → okunur Türkçe özet).
 *
 * Profil alanları okunur satırlara çevrilir (rol Türkçeleşir, diziler virgülle birleşir),
 * etkinlik yalnız SAYI olarak özetlenir (içerik sızmaz), rıza geçmişi tarihlenir.
 */

import { describe, it, expect } from 'vitest';
import { summarizeDataExport, formatDate } from '@/lib/kvkkSummary';
import type { DataExportResponse } from '@/lib/api/kvkk';

const base: DataExportResponse = {
  userId: 'u1',
  exportedAt: '2026-09-21T00:00:00.000Z',
  profile: {
    fullName: 'Ada Lovelace',
    email: 'ada@example.com',
    role: 'MENTI',
    discType: 'I',
    sectorTags: ['Yazılım', 'Eğitim'],
    skills: ['Liderlik'],
    createdAt: '2026-01-15T10:00:00.000Z',
  },
  responses: [{}, {}, {}],
  feedbackLogs: [{}],
  matchRequests: [],
  consents: [{ type: 'KVKK_ACIK_RIZA', grantedAt: '2026-01-15T10:00:00.000Z' }],
  messageCount: 7,
};

describe('summarizeDataExport (K-12)', () => {
  it('profil alanlarını okunur satırlara çevirir, rolü Türkçeleştirir', () => {
    const sections = summarizeDataExport(base);
    const profile = sections.find((s) => s.title.includes('Kimlik'))!;
    const find = (l: string) => profile.rows.find((r) => r.label === l)?.value;
    expect(find('Ad Soyad')).toBe('Ada Lovelace');
    expect(find('Rol')).toBe('Menti');
    expect(find('Sektör etiketleri')).toBe('Yazılım, Eğitim');
    expect(find('Kayıt tarihi')).toBe('15.01.2026');
  });

  it('etkinliği yalnız sayı olarak özetler (içerik değil)', () => {
    const sections = summarizeDataExport(base);
    const activity = sections.find((s) => s.title.includes('Etkinlik'))!;
    const find = (l: string) => activity.rows.find((r) => r.label === l)?.value;
    expect(find('DISC test yanıtı')).toBe('3 kayıt');
    expect(find('Gönderdiğiniz mesaj')).toBe('7 adet');
    expect(find('Eşleşme/mesaj talebi')).toBe('0 kayıt');
  });

  it('rıza geçmişini tarihiyle listeler', () => {
    const sections = summarizeDataExport(base);
    const consent = sections.find((s) => s.title.includes('Rıza'))!;
    expect(consent.rows[0].label).toBe('KVKK_ACIK_RIZA');
    expect(consent.rows[0].value).toContain('15.01.2026');
  });

  it('boş/eksik alanları güvenle atlar, rıza yoksa nötr metin gösterir', () => {
    const empty: DataExportResponse = {
      userId: 'u2', exportedAt: '', profile: {},
      responses: [], feedbackLogs: [], matchRequests: [], consents: [], messageCount: 0,
    };
    const sections = summarizeDataExport(empty);
    const consent = sections.find((s) => s.title.includes('Rıza'))!;
    expect(consent.rows[0].label).toBe('Kayıt yok');
  });

  it('geçersiz tarihte — döner', () => {
    expect(formatDate('')).toBe('—');
    expect(formatDate('saçma')).toBe('—');
  });
});
