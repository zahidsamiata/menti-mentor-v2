// Sertifika/senaryo bankası konu slug'ları → okunabilir Türkçe başlık.
// Tek kaynak: admin paneli ve mentör sertifika sonuç ekranı buradan okur (DRY).
export const TOPIC_LABELS: Record<string, string> = {
  'cevabi-verme-buldur':          'Cevabı verme, buldur',
  'yapici-geri-bildirim':         'Yapıcı geri bildirim',
  'beklentileri-hizalama':        'Beklentileri hizalama',
  'aktif-dinleme':                'Aktif dinleme & yargılamama',
  'sinir-koyma':                  'Sınır koyma & rol netliği',
  'gonullu-tukenmisligi':         'Gönüllü tükenmişliği & motivasyon',
  'okul-gonulluluk-dengesi':      'Okul/iş ile gönüllülük dengesi',
  'kulturel-farkliliklara-saygi': 'Kültürel/bireysel farklılıklara saygı',
  'gizlilik-guven':               'Gizlilik & güven',
  'kriz-yonetimi':                'Kriz & hassas durum yönetimi',
};

/** Konu slug'ını okunabilir başlığa çevirir; bilinmeyen slug'ı olduğu gibi döndürür. */
export const topicLabel = (topic: string): string => TOPIC_LABELS[topic] ?? topic;
