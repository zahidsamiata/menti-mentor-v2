### KARAR-119 · Gelir/sürdürülebilirlik modeli hangi kanal olsun? (0 iş kilitliyor; KARAR-103 md.3 ve md.7'yi etkiler) [ÜRÜN KARARI]
**Şu an ne var:** Kurum paketi alanı (FREE/PRO/ENTERPRISE) kaydediliyor ama hiçbir sınır ya da ücret uygulanmıyor; gelir kanalı hiçbir belgede seçilmedi ("MVP sonrası" diye bırakıldı). Kanıt: `backend/prisma/schema.prisma:194` · `docs/kararlar/konu/01-urun-vizyonu.md:34` · `docs/kararlar/konu/08-acik-sorular.md:22`.
**Sorun ne:** Paket sınırları ve kurumdan kuruma davet gibi özellikler (KARAR-103 md.3, md.7) hangi gelir kanalına hizmet edeceği bilinmeden tasarlanamıyor.
**Neden sana soruyorum:** Kimin ödeyeceği (kurum mu, sponsor mu, hibe mi) ürünün kime ne göstereceğini belirler; iş modeli kararı.
**Seçenekler:**
- **A) Kurumsal abonelik (paket sınırı).** · Kullanıcı ne görür: kurum yöneticisi paketini ve sınırlarını görür · Kazanç: öngörülebilir gelir; KARAR-103 md.3 anlam kazanır · Kaybedersin: küçük STK'lar için giriş engeli; ödeme altyapısı + sözleşme gerekir · Süre: L · Geri alınır: kısmen · Migration: muhtemel
- **B) Sponsor/hibe destekli ücretsiz platform.** · Kullanıcı ne görür: değişiklik yok; sponsor raporu (F-18 CSV) öne çıkar · Kazanç: STK'lar için sürtünmesiz · Kaybedersin: gelir dış kaynağa bağımlı; paket alanı atıl kalır · Süre: S · Geri alınır: evet · Migration: yok
- **C) Karar ilk kurum çıkışı sonrasına ertelensin.** · Kullanıcı ne görür: değişiklik yok · Kazanç: odak çıkış işlerinde · Kaybedersin: KARAR-103 md.3/md.7 cevapsız kalır; paket alanı yanıltıcı kalır · Süre: — · Geri alınır: evet · Migration: yok
**Karşılaştırma:** Kısa vadede kurum sayısı öncelikse B ya da C sürtünmesiz; gelir hemen gerekiyorsa A, ama altyapı ve hukuk yükü getirir.
**Benim önerim:** C — ilk kurum çıkışından (KARAR-69) önce kurulan gelir altyapısı yarım kalır; bu senin ürün kararın, önerime güvenme.
**Cevap vermezsen:** KARAR-103 md.3/md.7 kararsız kalır; başka iş kilitlenmez.
**İlgili kartlar:** KARAR-103 (md.3 paket sınırı ve md.7 kurumdan kuruma davet gelir kanalına bağlı) · KARAR-105 (kurumlar arası karşılaştırma bir paket ayrıcalığı olabilir) · KARAR-115 (kurum kazanımı: kayıt sayfasının aramada görünmesi) · KARAR-125 (bireyden kuruma büyüme kanalı gelir modeline hizmet eder) · KARAR-128 (`Tenant.plan` seçenek listesi bu karara bırakıldı) — birlikte cevaplanması önerilir: KARAR-119 + KARAR-103
**CEVAP:**


