/**
 * Üç soru (S1/S2/S3) — kullanıcıya görünen metinler (tek yerde; registerMessages deseni).
 *
 * ⚠️ TASLAK METİN — içerik oturumunda keskinleştirilecek. Değiştirmek MIGRATION GEREKTİRMEZ
 * (enum sabiti ≠ görünen metin; sabitler backend şemasında, metin burada). Bekleyen (§10.2):
 *   · S3'te LEARNING ↔ PERSPECTIVE ("öğrenmek" ↔ "yeni bakış açısı") bulanıklığı ayrışacak.
 *   · S2 metni NÖTR yazılacak (arketip biası — kişi az önce arketip etiketi gördü).
 *   · MentorStrength.DINLEME ile SupportApproach.DINLEME farklı sorular → metinleri AYRIŞIK
 *     (S1 mentör "Dinlemede faydalıyım" = güç · S2 "Dinlerim, çözümü o bulur" = yaklaşım).
 *
 * Enum sabitleri backend §10.2 ile birebir; görünen metin aşağıdaki taslaktır.
 */

import type { MentiNeed, MentorStrength, SupportApproach, PriorityValue } from '@/types/onboarding';

interface Option<T> {
  value: T;
  label: string;
}

/** S1 — menti: ihtiyaç tipi (en fazla 2). */
export const MENTI_S1: { prompt: string; max: number; options: Option<MentiNeed>[] } = {
  prompt: 'Şu an en çok neye ihtiyacın var?',
  max: 2,
  options: [
    { value: 'KARAR_VEREMIYORUM',    label: 'Ne yapacağıma karar veremiyorum' },
    { value: 'BECERIDE_TAKILDIM',    label: 'Belirli bir beceride takıldım' },
    { value: 'GUVENMIYORUM',         label: 'Kendime güvenmiyorum' },
    { value: 'INSANLARI_TANIMIYORUM', label: 'Doğru insanları tanımıyorum' },
    { value: 'KONUSACAK_BIRI',       label: 'Sadece konuşacak biri lazım' },
  ],
};

/** S1 — mentör: fayda beyanı (en fazla 2). */
export const MENTOR_S1: { prompt: string; max: number; options: Option<MentorStrength>[] } = {
  prompt: 'En çok neyde faydalı olabilirsin?',
  max: 2,
  options: [
    { value: 'YON_BULMA', label: 'Yön bulmada' },
    { value: 'BECERI',    label: 'Belirli becerilerde' },
    { value: 'OZGUVEN',   label: 'Özgüven kazanmada' },
    { value: 'AG_KURMA',  label: 'Ağ kurmada' },
    { value: 'DINLEME',   label: 'Dinlemede' },
  ],
};

/** S2 — yaklaşım hizası (1 seç). Metin role göre değişir (aynı enum, farklı cümle). */
export const MENTI_S2: { prompt: string; options: Option<SupportApproach>[] } = {
  prompt: 'Nasıl bir destek istersin?',
  options: [
    { value: 'YOL_GOSTERME',    label: 'Bana yol göstersin' },
    { value: 'BIRLIKTE_DUSUNME', label: 'Birlikte düşünelim' },
    { value: 'DINLEME',         label: 'Sadece dinlesin, ben çözerim' },
  ],
};

export const MENTOR_S2: { prompt: string; options: Option<SupportApproach>[] } = {
  prompt: 'Nasıl bir mentörsün?',
  options: [
    { value: 'YOL_GOSTERME',    label: 'Yol gösteririm' },
    { value: 'BIRLIKTE_DUSUNME', label: 'Birlikte düşünürüz' },
    { value: 'DINLEME',         label: 'Dinlerim, çözümü o bulur' },
  ],
};

/** S3 — değer önceliği (1 seç). Her iki rol ortak. */
export const S3: { prompt: string; options: Option<PriorityValue>[] } = {
  prompt: 'Bu süreçte senin için en önemlisi ne?',
  options: [
    { value: 'RESULT',      label: 'Somut sonuç almak' },
    { value: 'LEARNING',    label: 'Öğrenmek' },
    { value: 'UNDERSTOOD',  label: 'Anlaşılmak' },
    { value: 'PERSPECTIVE', label: 'Yeni bakış açısı' },
  ],
};
