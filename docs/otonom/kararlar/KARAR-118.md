### KARAR-118 · Ayrı bir deneme (staging) ortamı kurulsun mu? (0 iş kilitliyor) [ÜRÜN + ALTYAPI KARARI]
**Şu an ne var:** Tek ortam var: lokal geliştirme canlı veritabanını kullanıyor (CLAUDE.md § CANLI = LOKAL AYNI DB), ayrı bir deneme sitesi yok. Kanıt: depoda staging izi yok (`docker-compose.yml`, `.github`, `scripts`, `frontend/src`, `backend/src` araması 0) · kaynak `docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:212` (G8-07).
**Sorun ne:** Her değişiklik ilk kez gerçek kullanıcıların sitesinde denenir; lokal bir veri hatası anında canlıya yansır.
**Neden sana soruyorum:** Aylık maliyet ve hesap/sunucu kurulumu (Dokploy, Neon) yalnız sende.
**Seçenekler:**
- **A) Tam staging (ayrı site + ayrı veritabanı dalı).** · Kullanıcı ne görür: değişiklik yok (sen yeni sürümü önce deneme sitesinde görürsün) · Kazanç: canlıdan önce gerçekçi deneme, kurumlara demo/kabul testi; lokal canlı veritabanından kurtulur · Kaybedersin: aylık maliyet; iki ortamın ayarlarını eşit tutma yükü · Süre: M · Geri alınır: evet · Migration: yok
- **B) Yalnız ayrı veritabanı (Neon dalı) — lokal ve testler ona bağlanır, site tek.** · Kullanıcı ne görür: değişiklik yok · Kazanç: canlı veriye kazara yazma riski biter, ucuz · Kaybedersin: arayüz değişikliği yine ilk kez canlıda görülür · Süre: S · Geri alınır: evet · Migration: yok
- **C) Şimdilik hiçbiri.** · Kullanıcı ne görür: değişiklik yok · Kazanç: maliyet ve emek yok · Kaybedersin: "canlı = lokal" riski ve "ilk deneme canlıda" durumu sürer · Süre: — · Geri alınır: — · Migration: yok
**Karşılaştırma:** Kullanıcı gelmeden önce riski ucuza kapatmak istiyorsan B; kurumlara demo ya da kabul testi yapacaksan A; maliyet şu an kesin engel ise C.
**Benim önerim:** B — asıl risk canlı veriye kazara yazmak ve B bunu en ucuza kapatır; bu senin maliyet kararın, önerime güvenme. (Hangi veritabanının canlı olduğu teyidi — 03-PO ADIM 0 — ile birlikte düşün.)
**Cevap vermezsen:** G8-07 açık kalır; migration/seed işleri canlı yedek şartıyla sürer.
**CEVAP:**


