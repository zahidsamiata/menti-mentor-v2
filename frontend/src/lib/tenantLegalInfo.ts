/**
 * AN-36 / G1-12 — Kurum yasal bilgileri formunun alan tanımı + istemci doğrulaması.
 *
 * Kurallar backend `services/tenantLegalInfo.ts` (UpdateLegalInfoSchema) ile AYNI; burası yalnız
 * kullanıcıya erken geri bildirim içindir — asıl kapı backend'dedir.
 *
 * ⚠️ Etiket/açıklama metinleri kuruma görünen TASLAK metindir (PO onayı bekler — AN-36 PR metin tablosu).
 * Tek yerde durur ki onaydan sonra değişiklik buradan yapılsın.
 */

import type { TenantLegalInfo } from '@/lib/api/tenantLegalInfo';

export type LegalFieldKey = Exclude<keyof TenantLegalInfo, 'legalInfoUpdatedAt'>;

export interface LegalFieldDef {
  key:          LegalFieldKey;
  label:        string;
  placeholder:  string;
  hint?:        string;
  maxLength:    number;
  multiline?:   boolean;
  inputMode?:   'numeric' | 'email' | 'text';
}

export const LEGAL_INFO_TEXT = {
  pageTitle:       'Yasal Bilgiler',
  pageDescription: 'Kurumunuzun resmî kimlik bilgileri. Bu bilgiler KVKK kapsamındaki veri işleyen sözleşmesinin hazırlanmasında kullanılacaktır. Bu sayfayı yalnızca kurum yöneticileri görür.',
  cardTitle:       'Kurum kimliği',
  cardDescription: 'Tüm alanlar isteğe bağlıdır. Bir alanı boşaltıp kaydederseniz kayıtlı değer silinir.',
  lastUpdated:     'Son güncelleme',
  saved:           'Yasal bilgiler kaydedildi.',
  loadError:       'Yasal bilgiler yüklenemedi. Lütfen sayfayı yenileyin.',
  saveError:       'Kaydetme başarısız. Lütfen tekrar deneyin.',
  sessionMissing:  'Oturum bulunamadı. Lütfen yeniden giriş yapın.',
} as const;

export const LEGAL_FIELDS: readonly LegalFieldDef[] = [
  { key: 'legalName',    label: 'Resmî unvan',         placeholder: 'ör. Örnek Gençlik ve Eğitim Derneği', maxLength: 300 },
  { key: 'legalAddress', label: 'Resmî adres',         placeholder: 'Tebligat adresi',                     maxLength: 500, multiline: true },
  { key: 'kepAddress',   label: 'KEP adresi',          placeholder: 'kurum@hs01.kep.tr',                    maxLength: 254, inputMode: 'email',
    hint: 'Kayıtlı Elektronik Posta adresi; kep.tr ile biter.' },
  { key: 'mersisNo',     label: 'MERSİS numarası',     placeholder: '16 haneli numara',                     maxLength: 19, inputMode: 'numeric',
    hint: 'Derneklerde MERSİS numarası olmayabilir; bu durumda boş bırakın.' },
  { key: 'taxOffice',    label: 'Vergi dairesi',       placeholder: 'ör. Çankaya',                          maxLength: 100 },
  { key: 'taxNumber',    label: 'Vergi kimlik numarası', placeholder: '10 haneli numara',                   maxLength: 13, inputMode: 'numeric' },
] as const;

const MERSIS_NO_PATTERN = /^\d{16}$/;
const TAX_NUMBER_PATTERN = /^\d{10}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const KEP_DOMAIN_SUFFIX = '.kep.tr';

/** Alan için hata mesajı ya da null (boş alan her zaman geçerlidir — hepsi isteğe bağlı). */
export function validateLegalField(key: LegalFieldKey, raw: string): string | null {
  const value = raw.trim();
  if (value === '') return null;
  switch (key) {
    case 'mersisNo':
      return MERSIS_NO_PATTERN.test(value.replace(/\s+/g, '')) ? null : 'MERSİS numarası 16 haneli olmalı ve yalnız rakam içermeli.';
    case 'taxNumber':
      return TAX_NUMBER_PATTERN.test(value.replace(/\s+/g, '')) ? null : 'Vergi kimlik numarası 10 haneli olmalı ve yalnız rakam içermeli.';
    case 'kepAddress': {
      const v = value.toLowerCase();
      return EMAIL_PATTERN.test(v) && v.endsWith(KEP_DOMAIN_SUFFIX)
        ? null
        : 'KEP adresi geçerli bir KEP e-posta adresi olmalı (ör. kurum@hs01.kep.tr).';
    }
    default:
      return null;
  }
}
