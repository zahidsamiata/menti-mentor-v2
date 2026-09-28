### KARAR-85 · Yeni ortamda DISC soru havuzu nasıl dolacak? (1 iş açar: U-17) [SEED KARARI]
**Şu an ne var:** Temiz bir veritabanında DISC soru havuzu boş kalıyor; dolduran tek yol veri silen `prisma/seed.ts` (bu turda KR-01 ile kilitlendi, yerel olmayan veritabanında artık çalışmaz). Yöneticinin soru ekleme ekranı DISC sorusu eklemeyi engelliyor. Kanıt: DISC soruları yalnız `backend/prisma/seed.ts:33-187` listesinde, `:330-331`'de yazılıyor; aynı betik önce `:304-323` arasında toplu siliyor (global sorular dahil `:323`); KR-01 kilidi `:299-300`; ekran kilidi `backend/src/controllers/questionController.ts:133-138`. Diğer betiklerin (`seed-certification`, `seed-learning-journey`, `seed-approval-gate`, `scripts/seed-test-tenant.mjs`) hiçbiri DISC sorusu yazmıyor.
**Sorun ne:** Yeni bir kurulumda (yeni sunucu, test ortamı, felaket sonrası geri yükleme) mentör ve mentiler karakter testini çözemez; test sorusuz açılır, eşleştirmenin kişilik ayağı boş kalır. Havuzu doldurmanın tek yolu verileri silen betik olduğu için güvenli bir kurulum yolu yok.
**Neden sana soruyorum:** Seed ve canlı veriye yazım kuralı gereği her seed işi senin onayını ister.
**Seçenekler:**
- **A) Ayrı, yalnız ekleyen/güncelleyen (silmeyen) bir "DISC soru havuzu" betiği** · Kazanç: yeni ortam güvenle kurulur; mevcut canlı veriye dokunmaz · **Ne kaybedersin:** yeni betik + bakım; çalıştırılması yine senin onayına bağlı · Süre S · Migration: yok · Geri alınır: evet
- **B) Soruları migration içine göm** · Kazanç: kurulumda kendiliğinden gelir · **Ne kaybedersin:** migration = canlı DB değişikliği (her ortamda çalışır), içerik değişince yeni migration · Süre M · Migration: VAR · Geri alınır: zor (içerik migration geçmişine girer; geri almak yeni migration ister)
- **C) Şimdilik yalnız kurulum belgesi (elle yöntem)** · Kazanç: sıfır kod · **Ne kaybedersin:** yeni ortam kurulumu kırılgan kalır · Süre S · Migration: yok · Geri alınır: evet
**Karşılaştırma:** A en güvenli ve tekrarlanabilir; B otomatik ama her değişiklikte canlıya dokunur; C erteleme.
**Benim önerim:** A — silmeyen betik mevcut güvenli seed desenleriyle (`seed-certification`, `seed-learning-journey`) aynı.
**Cevap vermezsen:** U-17 (çıkış blokeri) kilitli kalır.
**İlgili kartlar:** KARAR-99 (bir DISC soru metninin yazım düzeltmesi `seed.ts`'te, PR #160 — yeni betik düzeltilmiş metni taşımalı)
**CEVAP:**

