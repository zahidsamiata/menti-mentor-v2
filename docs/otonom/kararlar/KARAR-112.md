### KARAR-112 · Kurum logosu hangi adreslerden gösterilebilsin? (1 işi açar: AJ-22 kalanı) [ÜRÜN KARARI · GÜVENLİK]
**Şu an ne var:** Kurum yöneticisi logo adresi olarak herhangi bir güvenli (https) internet adresi girebiliyor; sitenin tarayıcı güvenlik politikası (CSP — tarayıcıya "hangi kaynaklara izin var" diyen kural) 2026-09-27'den beri engelleme modunda ama görseller için her https adresine izin veriyor. Kanıt: `frontend/src/lib/securityHeaders.mjs:91` (img-src `https:`, AJ-22 #387) · logo yazma kısıtı `backend/src/services/logoUrl.ts:87-110` (https zorunlu; IP/localhost, port, kullanıcı bilgisi ve güvensiz dosya uzantısı reddedilir — ama alan adı serbest) · ham çizim `frontend/src/components/organisms/TenantSwitcher.tsx:199`, `frontend/src/app/(admin)/admin/branding/page.tsx:199`.
**Sorun ne:** Kötü niyetli ya da ele geçirilmiş bir kurum yöneticisi logo adresi olarak kendi sunucusundaki görünmez bir görseli (izleme pikseli) verirse, kurumun her üyesi paneli açtığında o sunucu üyelerin IP adresini ve tarayıcı bilgisini görür (kişisel veri).
**Neden sana soruyorum:** Seçeneklerden biri bazı kurumların logosunun görünmemesine, biri de PO'nun elle liste tutmasına yol açıyor — kurumların ne göreceğini etkileyen ürün kararı.
**Seçenekler:**
- **A) Bugünkü hâl kalsın (her https adres).** · Kullanıcı ne görür: her kurumun logosu görünür · Kazanç: sıfır iş, hiçbir logo kırılmaz · Kaybedersin: izleme pikseli riski sürer · Süre: — · Geri alınır: evet · Migration: yok
- **B) İzinli alan adı listesi.** · Kullanıcı ne görür: listedeki sitelerde duran logolar görünür, diğerleri görünmez (yöneticiye "bu adres izinli değil" uyarısı) · Kazanç: piksel riski büyük ölçüde kalkar · Kaybedersin: listeyi PO elle tutar; listede olmayan kurumun logosu görünmez · Süre: S · Geri alınır: evet · Migration: yok
- **C) Logo bizim sunucumuza indirilip oradan gösterilsin.** · Kullanıcı ne görür: tüm logolar görünür, kaynağı bizim sunucumuz · Kazanç: en güvenlisi — üyelerin tarayıcısı dış adrese hiç gitmez · Kaybedersin: büyük iş; sunucunun dış adrese istek atması için ayrıca savunma (SSRF — sunucunun iç ağa yönlendirilmesi) gerekir; dosya depolama (kalıcı disk, 03-PO) · Süre: L · Geri alınır: evet · Migration: yok (dosya depolama ayarı PO)
**Karşılaştırma:** Gerçek kurum sayısı azken A pratikte düşük risklidir; kurum sayısı artınca B hızlı bir ara çözüm, C kalıcı çözümdür. B ile C birlikte de düşünülebilir (önce B, sonra C).
**Benim önerim:** A şimdilik, C ayrı iş olarak planlansın — çünkü bugün gerçek kurum yok ve B logoları kırarken C riski tamamen kaldırır; bu senin ürün kararın, önerime güvenme.
**Cevap vermezsen:** AJ-22 "kısmen" kalır; bugünkü davranış (A) sürer.
**CEVAP:**


