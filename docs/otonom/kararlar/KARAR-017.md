### KARAR-17 · Kurum yöneticisi, davet göndermeden canlı bir önizleme görebilsin mi?  [ÜRÜN KARARI]
**Şu an ne var:** Bir kurum yöneticisi platforma bakarken, gerçek kullanıcı davet etmeden "ürün nasıl görünüyor" diye canlı bir önizleme göremiyor. Backend'de bunun için bir "önizleme" ucu yazılı (kurumun kendi görünümünü örnek veriyle gösteren), ama ekranı yok. Kanıt: `selfServeRoutes.ts:29` (`/api/tenants/:slug/preview`). Belgelerde bu "çift-aha / önizleme aha" diye ürün fikri olarak geçiyor (`docs/.../T4-A2-arsiv-strateji.md:49`).
**Sorun ne:** Yeni bir kurum yöneticisi platformu değerlendirirken "önce kullanıcı davet et, sonra gör" engeliyle karşılaşıyor. Önce görüp sonra karar vermek (dene-sonra-al) dönüşümü artırabilir.
**Neden sana soruyorum:** Bu bir büyüme/satış (PLG) tercihi — önizlemenin var olup olmayacağı ve ne göstereceği ürün kararı.
**Kapsadığı kalemler:** `GET /api/tenants/:slug/preview` + self-serve önizleme demo ekranı (FE yok).
**Seçenekler:**
**A) Önizleme demo ekranını yap** · Kullanıcı (yönetici): davet etmeden örnek bir menti/mentör deneyimini canlı görür · Kazanç: "önce gör, sonra karar ver" — kurum kaydı/dönüşüm artabilir, satış hikâyesi güçlenir · Kaybedersin: örnek veri gerçekçi değilse yanlış izlenim; bakım (demo içeriği güncel tutulmalı); çekirdek akıştan emek çeker · Süre: L · Geri alınır: evet · Migration: yok
**B) Basit statik önizleme** (ekran görüntüsü/tanıtım, canlı demo değil) · Kullanıcı: sabit tanıtım görselleri/metin · Kazanç: hızlı, düşük bakım, yine de fikir verir · Kaybedersin: "canlı deneme" hissi olmaz, backend önizleme ucu kullanılmaz (rafta kalır) · Süre: S · Geri alınır: evet · Migration: yok
**C) Şimdilik yapma** · Kullanıcı: değişiklik yok · Kazanç: emek çekirdek akışa gider · Kaybedersin: yazılmış önizleme ucu atıl kalır, dene-sonra-al dönüşüm fırsatı kaçar · Süre: yok · Migration: yok
**Karşılaştırma:** Kurumlara satış/demo yakın hedefinse ve "önce gör" dönüşümü artıracaksa A yatırıma değer, ama demo içeriğinin gerçekçi ve bakımlı olması şart. Hızlı bir tanıtım yeterliyse B. Çekirdek akış (üç bug daha önce vardı) hâlâ önceliğinse C.
**Benim önerim:** C şimdilik — çekirdek akış kusursuzlaşmadan demo önizleme erken; ama kuruma demo/satış gündeme gelince A'ya geç. (Bu senin büyüme kararın, önerime güvenme.)
**Cevap vermezsen:** Önizleme ucu bağlanmaz. Başka iş etkilenmez.
**CEVAP:**

---
