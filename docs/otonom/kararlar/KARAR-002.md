### KARAR-2 · Profile serbest bağlantı alanı  [ÜRÜN KARARI · MIGRATION]
**Şu an ne var:** Profilde yalnız LinkedIn ve Instagram alanı var. Kanıt: `backend/prisma/schema.prisma:337-338` · `frontend/src/lib/api/profile.ts:28-29,54-55`
**Sorun ne:** Kişisel site, YouTube kanalı, portfolyo linki konulacak yer yok. Kullanıcı LinkedIn alanına YouTube linki yazıyor (testte oldu).
**Neden sana soruyorum:** Yeni alan = veritabanı değişikliği; ayrıca "profil ne kadar zengin olsun" bir ürün tercihi.
**Seçenekler:**
**A) Tek `websiteUrl` alanı ekle** · Kullanıcı: bir adet serbest link koyabilir · Kazanç: en sık ihtiyaç karşılanır, küçük iş · Kayıp: iki link isteyen yine sığdıramaz · Süre: S · Geri alınır: evet · Migration: VAR
**B) Çoklu link listesi** (ad + adres, istediği kadar) · Kullanıcı: sınırsız link ekler · Kazanç: hiç kısıt yok · Kayıp: yeni tablo, yönetim ekranı, spam riski, profil dağınıklaşır · Süre: L · Geri alınır: zor · Migration: VAR
**C) Şimdilik ekleme** · Kullanıcı: iki alanla yetinir · Kazanç: migration bütçesi K-15'e kalır · Kayıp: test bulgusu açık kalır · Süre: yok · Geri alınır: evet · Migration: yok
**Karşılaştırma:** Mentör profilinin bir "vitrin" olmasını istiyorsan B; profil sade kalsın ve eşleştirme öne çıksın diyorsan A yeter. C, bu turda başka migration yapılacaksa mantıklı — iki migration yerine bir tane.
**Benim önerim:** A — B'nin karmaşıklığı bu aşamada karşılığını vermez. KARAR-1'e A dersen ikisini aynı migration turunda yapabilir.
**Cevap vermezsen:** K-17 atlanır. Başka iş etkilenmez.
**İlgili kartlar:** KARAR-21 (o da migration; aynı turda birleştirilebilir) · KARAR-111 (aynı migration turu, K-15) — birlikte cevaplanması önerilir: KARAR-2 + KARAR-21
**CEVAP:**

---

