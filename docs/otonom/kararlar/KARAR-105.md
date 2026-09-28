### KARAR-105 · Kurumlar arası anonim karşılaştırma: izni kim açar, hangi sayılar paylaşılır? (1 işi açar: AN-31)  [ÜRÜN KARARI · KVKK · MIGRATION]
> ⭐ Kaynak: AN-31 uygulama denemesi (2026-09-27, salt-okuma). KARAR-34 SORU 2'ye verdiğin **B** cevabının ("izin verilirse yalnız ANONİM TOPLU veri paylaşılır") ayrıntısı.

**Şu an ne var:** Kurumlar birbirinin verisini hiç görmüyor. Anonimleştirme altyapısı hazır: 3 kişiden küçük gruplar gizleniyor (`backend/src/services/mask.ts:70`). Ancak bir kurumun "anonim karşılaştırmaya katılıyorum" demesini kaydedecek bir yer yok (`backend/prisma/schema.prisma:181-262`). Mevcut `isSharedPoolActive` (`:185`) başka bir şey: kişilerin kurumlar arası eşleştirilmesi.
**Sorun ne:** "İzin verilirse" dedin ama izni kimin vereceği (kurum yöneticisi mi, tek tek kullanıcılar mı) ve karşılaştırmada hangi sayıların görüneceği belli değil. Ayrıca izni kaydetmek için veritabanına yeni bir alan eklemek gerekiyor (migration — canlı veritabanında yapı değişikliği).
**Neden sana soruyorum:** Kimin verisinin, kimin izniyle, hangi biçimde başka kurumlara gösterileceği KVKK sonucu olan bir ürün kararı.
**Seçenekler:**
- **A) Kurum yöneticisi açar/kapatır; paylaşılan yalnız kurum düzeyinde toplamlar** (ör. aktif menti sayısı, eşleşme oranı, ortalama görüşme sayısı — hepsi 3'ten küçük grupta gizli) — Kullanıcı: yönetici panelde "anonim karşılaştırmaya katıl" anahtarı ve katılan kurumların ortalamasıyla kendi kurumunu görür · Kazanç: basit, kurum kararı tek noktada · Kayıp: tek tek kullanıcıların sözü yok (verileri toplama girer); aydınlatma metninde yazılması gerekir · Süre M · Geri alınır (anahtar kapatılır) · Migration VAR (kurumda izin alanı).
- **B) Yönetici açar AMA yalnız bireysel rıza vermiş kullanıcıların verisi sayılır** (AN-30'daki kurumlar arası paylaşım rızasıyla birlikte) — Kullanıcı: aynı ekran, sayılar yalnız rıza verenlerden · Kazanç: KVKK açısından en temkinli · Kayıp: rıza oranı düşükse sayılar küçük ve çoğu grup gizlenir; AN-30'un (KARAR-96) EVET'ine bağlı · Süre M-L · Geri alınır · Migration VAR.
- **C) Şimdilik yapılmasın** (v2) — Kullanıcı: bugünkü gibi · Kazanç: migration yok, hukuki metin yükü yok · Kayıp: kurumlar kendini diğerleriyle kıyaslayamaz · Süre — · Geri alınır · Migration yok.
**Karşılaştırma:** Hızlı ve anlaşılır bir karşılaştırma istiyorsan A. Her kişinin açık rızasını esas almak istiyorsan B, ama sayılar küçük kalabilir. İlk kurumlarla canlıya çıkış öncelikliyse C.
**Benim önerim:** C şimdilik, sonra A. Toplamlar zaten 3'ten küçük grupları gizliyor ama karşılaştırma yapılacak kadar çok kurum henüz yok. *(Bu senin ürün kararın; önerime güvenme.)*
**Cevap vermezsen:** AN-31 kilitli kalır; başka iş etkilenmez.
**İlgili kartlar:** KARAR-34 (cevaplı; SORU 2 → B, yalnız anonim toplu paylaşım) · KARAR-96 (B seçeneği AN-30 bireysel rızasına bağlı) · KARAR-119 (karşılaştırma bir paket ayrıcalığı olabilir)
**CEVAP:**

---

