### KARAR-25 · Gerçek yedek nereye yazılsın? (0 işi açar — G1-28 🔴 blokerine bağlı)  [ÜRÜN KARARI · KVKK · ALTYAPI]
**Şu an ne var:** Düzenli/bütün-veritabanı yedeği YOK; 6 saatten eski veri kaybına karşı sıfır koruma. Üstelik haftalık silme işi Pazar 03:00 UTC çalışıyor. Kanıt: W §B.1, `cronScheduler.ts:414`. = `madde 120 / [G1-28]` 🔴 çıkış blokeri.
**Sorun ne:** Pazartesi mesaide fark edilen bir sorunda Neon'un 6 saatlik geri-alma penceresi çoktan kapanmış olur → veri kalıcı gider.
**Neden sana soruyorum:** Üç seçenek farklı maliyet/hukuk profiline sahip; özellikle biri KVKK'da "üçüncü ülkeye veri aktarımı" sayılabilir (proje zaten bir aktarım envanteri tutuyor).
**Seçenekler:**
**A) Dokploy diskine (volume) yazan cron** · Ne kazanırsın: veri VPS içinde kalır, KVKK aktarımı yok · Ne kaybedersin: aynı sunucu tamamen giderse yedek de gider; cron+script eforu · Süre M · Migration yok
**B) Neon ücretli plan (pencere 6 saat → 30 gün)** · Ne kazanırsın: kod işi yok, en az emek · Ne kaybedersin: aylık ücret; yine tek sağlayıcıya bağımlı · Süre S (hesap) · Migration yok
**C) GitHub Actions yedek dosyası (artifact)** · Ne kazanırsın: repo altyapısında, kolay · Ne kaybedersin: ⚠️ KVKK'da **üçüncü ülkeye aktarım** sayılabilir (aktarım envanterine eklenmeli), ABD sunucu · Süre M · Migration yok
**Karşılaştırma:** KVKK'da veriyi yurt içinde/VPS'te tutmak istiyorsan A. En az emekle pencereyi büyütmek istiyorsan B (ama tek sağlayıcı riski sürer). Repo araçlarını kullanmak kolayına gidiyorsa C — ama aktarım envanteri ve hukuki değerlendirme şart.
**Benim önerim:** Bu senin ürün+hukuk kararın, önerime güvenme — yalnız KVKK açısından A veya B, C'den daha güvenli. İdeali: A/B + restore (geri yükleme) provası.
**Cevap vermezsen:** 🔴 çıkış blokeri (G1-28) açık kalır; 03-PO A#2 (yedek + restore provası) yapılamaz.
**CEVAP:**

---

