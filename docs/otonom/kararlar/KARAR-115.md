### KARAR-115 · "Kurumunu Kur" (kurum kayıt) sayfası arama motorlarında görünsün mü? (0 iş kilitliyor) [ÜRÜN KARARI]
**Şu an ne var:** Ana sayfanın bağlantı verdiği kurum kayıt sayfası (`/onboarding/stk`) arama sonuçlarında görünmüyor. Önceden bu, `robots.txt`'teki genel kapatma sayesindeydi; AJ-47 (#402) ile `robots.txt` artık hiçbir yolu kapatmıyor, sayfa kendi "dizine ekleme" (noindex) etiketiyle dışarıda tutuluyor — davranış aynı kaldı. Kanıt: `frontend/src/app/onboarding/stk/page.tsx:2,6` · `frontend/src/lib/publicRoutes.ts` (`PRIVATE_PATH_PREFIXES` içinde `/onboarding`).
**Sorun ne:** Yeni kurumlar siteyi aramada "kurum kaydı" ile bulamaz; yalnız ana sayfadan ulaşır.
**Neden sana soruyorum:** Kurum kazanımı için sayfanın aramada görünmesi bir pazarlama/ürün tercihi.
**Seçenekler:**
- **A) Aramada görünmesin (bugünkü).** · Kullanıcı ne görür: değişiklik yok · Kazanç: yarım kayıt akışları aramadan açılmaz · Kaybedersin: "kurum kaydı" aramasından gelen trafik · Süre: — · Geri alınır: evet · Migration: yok
- **B) Görünsün.** · Kullanıcı ne görür: aramada "Kurumunu Kur" sayfası çıkar · Kazanç: yeni kurumlar doğrudan kayda ulaşır · Kaybedersin: onboarding yolu için özel istisna (liste bakımı); sayfanın başlık/açıklaması arama için yazılmalı · Süre: S · Geri alınır: evet · Migration: yok
**Karşılaştırma:** Kurum kazanımı ağırlıklı ana sayfa üzerinden yürüyorsa A yeterli; arama trafiği hedefleniyorsa B.
**Benim önerim:** A şimdilik — canlıda site adresi ayarı (`NEXT_PUBLIC_SITE_URL`, 03-PO) henüz yapılmadı, arama görünürlüğü o düzelmeden anlamlı olmaz; bu senin ürün kararın, önerime güvenme.
**Cevap vermezsen:** Bugünkü davranış sürer (A).
**CEVAP:**


