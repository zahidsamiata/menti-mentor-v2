### KARAR-85 · Yeni ortamda DISC soru havuzu nasıl dolacak? (1 iş açar: U-17) [SEED KARARI]
**Şu an ne var:** Temiz bir veritabanında DISC soru havuzu boş kalıyor; dolduran tek yol veri silen `prisma/seed.ts` (bu turda KR-01 ile kilitlendi, yerel olmayan veritabanında artık çalışmaz). Yöneticinin soru ekleme ekranı DISC sorusu eklemeyi engelliyor.
**Neden sana soruyorum:** Seed ve canlı veriye yazım kuralı gereği her seed işi senin onayını ister.
**Seçenekler:**
- **A) Ayrı, yalnız ekleyen/güncelleyen (silmeyen) bir "DISC soru havuzu" betiği** · Kazanç: yeni ortam güvenle kurulur; mevcut canlı veriye dokunmaz · **Ne kaybedersin:** yeni betik + bakım; çalıştırılması yine senin onayına bağlı · Süre S · Migration: yok
- **B) Soruları migration içine göm** · Kazanç: kurulumda kendiliğinden gelir · **Ne kaybedersin:** migration = canlı DB değişikliği (her ortamda çalışır), içerik değişince yeni migration · Süre M · Migration: VAR
- **C) Şimdilik yalnız kurulum belgesi (elle yöntem)** · Kazanç: sıfır kod · **Ne kaybedersin:** yeni ortam kurulumu kırılgan kalır · Süre S · Migration: yok
**Karşılaştırma:** A en güvenli ve tekrarlanabilir; B otomatik ama her değişiklikte canlıya dokunur; C erteleme.
**Benim önerim:** A — silmeyen betik mevcut güvenli seed desenleriyle (`seed-certification`, `seed-learning-journey`) aynı.
**Cevap vermezsen:** U-17 (çıkış blokeri) kilitli kalır.
**CEVAP:**

