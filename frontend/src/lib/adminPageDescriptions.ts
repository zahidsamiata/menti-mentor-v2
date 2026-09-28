/**
 * Kurum yönetici paneli — sayfa başlığının altındaki "bu sayfa ne işe yarar" açıklamaları (AJ-91).
 *
 * NEDEN VAR: panel sayfalarının açıklamaları her sayfada elle yazılıydı ve teknik dil taşıyordu
 * ("Tenant bazlı", "aggregate", "PII", "NPS", "red-line"…). Kurum yöneticisi teknik bilmez;
 * PO notu (docs/kararlar/konu/06-tasarim-ux.md § UX İYİLEŞTİRMELERİ): açıklamalar daha basit olmalı.
 * Metinler tek yerde durur ki birlikte okunup onaylanabilsin ve dil tutarlı kalsın.
 *
 * KURALLAR:
 *   - Her sayfa için TEK cümle; kurumun anlayacağı dil, teknik terim yok (zorunluysa parantezle açıkla).
 *   - Hitap "siz". Sayfanın davranışını anlatır, DEĞİŞTİRMEZ (ör. "en fazla 3 yönetici" gibi kurallar korunur).
 *   - Bu metinler kuruma görünür → değişiklik PO metin onayı ister (🟡 kapı).
 *   - Yeni panel sayfası eklenirse anahtar burada açılır; `src/__tests__/admin-page-descriptions.test.ts`
 *     her panel sayfasının bu sözlükten okuduğunu denetler.
 *
 * Anahtar = `app/(admin)/admin/<klasör>` adı.
 */
export const ADMIN_PAGE_DESCRIPTIONS = {
  'algorithm-tuner':
    'Eşleşmelerin birinci ve üçüncü ay memnuniyet puanlarına göre platformun önerdiği eşleştirme ayarlarını buradan onaylayabilir, reddedebilir ya da oranları kendiniz değiştirebilirsiniz.',
  approvals: 'Kurumunuza katılmak için başvuran kişileri burada inceleyip karara bağlayabilirsiniz.',
  branding: 'Kurumunuzun logosunu ve rengini buradan değiştirebilirsiniz; değişiklik tüm üyelerinize görünür.',
  certification:
    'Mentörlerinizin sertifika sınavında hangi konuların çıkacağını buradan açıp kapatabilirsiniz; konuları uzmanlar hazırlar, eklenemez veya düzenlenemez ve kritik konular her zaman açıktır.',
  eslesmeler: 'Kurumunuzda hangi mentörün hangi mentiyle eşleştiğini burada görebilirsiniz.',
  invite: 'Hazır davet metnini düzenleyip kopyalayın ve kendi e-postanızdan ya da WhatsApp üzerinden gönderin.',
  kpi: 'Kurumunuzdaki mentörlük programının genel sayılarını burada görürsünüz; kişilerin bilgileri gösterilmez.',
  'learning-journey':
    'Üyelerinizin sınav olmadan adım adım ilerlediği öğrenme aşamalarını buradan yönetebilirsiniz; hazır aşamalar kilitlidir, onları gizleyebilir ya da kopyalayıp kendi sürümünüzü düzenleyebilirsiniz.',
  managers:
    'Kurumunuzun yöneticilerini burada görebilir, onaylı üyelerinizden yönetici atayabilir veya çıkarabilirsiniz (en fazla 3 yönetici).',
  'menti-havuzu': 'Kurumunuza kayıtlı tüm mentileri ve başvurularının onay durumunu burada görebilirsiniz.',
  'mentor-havuzu': 'Kurumunuza kayıtlı tüm mentörleri ve başvurularının onay durumunu burada görebilirsiniz.',
  questions:
    'Kişilik testi (DISC) soruları sabittir ve değiştirilemez; kurumunuza özel soruları buradan ekleyip yönetebilirsiniz.',
  reports: 'Üyelerinizin birbirleri hakkında gönderdiği şikayetleri buradan inceleyebilirsiniz.',
  'sertifika-sonuclari':
    'Mentörlerinizin sertifika sınavındaki durumlarını, puanlarını ve kaç kez denediklerini burada görebilirsiniz.',
  tags: 'Üyelerinizin önerdiği yeni etiketleri buradan onaylayabilir, benzeriyle birleştirebilir ya da reddedebilirsiniz.',
  'waiting-room':
    "Onay Kuyruğu'ndaki başvuruların aynısını burada tablo hâlinde, varsa kişilik testi (DISC) sonucu ve koçluk önerileriyle birlikte görür, onaylayabilir ya da reddedebilirsiniz.",
} as const;

export type AdminPageKey = keyof typeof ADMIN_PAGE_DESCRIPTIONS;
