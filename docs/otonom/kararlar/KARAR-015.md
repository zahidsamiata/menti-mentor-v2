### KARAR-15 · Çok kuruma üye kullanıcı, kurumlar arası geçiş yapabilsin mi?  [ÜRÜN KARARI]
**Şu an ne var:** Bir kullanıcı birden fazla kuruma üye olabiliyor (veri modeli buna izin veriyor). Bunun için bir "kurum değiştirici" arayüz bileşeni de yazılmış (kendisine verilen üyelikleri listeler, seçimi yalnız bir geri çağırmayla bildirir). Ama bu bileşen hiçbir ekrana konulmamış — kullanıcı şu an yalnız tek kurumda çalışıyor gibi görünüyor. Kanıt: `frontend/src/components/organisms/TenantSwitcher.tsx:37` — hiçbir yerden import edilmiyor (kapsam: `frontend/src` tümü, 0 referans; yalnız yorum atıfları `logoUrl.ts:6` · `securityHeaders.mjs:25`). Sunucuda aktif kurumu değiştiren ya da kullanıcının üyeliklerini listeleyen bir uç yok; oturumun kurumu `User.tenantId`'den gelir (`backend/src/controllers/authController.ts:261`) — yani A/B için sunucu (oturum/yetki) işi de gerekir.
**Sorun ne:** Bir kullanıcı hem üniversitesinde hem de bir STK'da mentörse, şu an ikisi arasında geçiş yapamıyor. Ya bu özellik açılmalı ya da "bu ürün tek-kurum kullanıcı içindir" diye netleşmeli.
**Neden sana soruyorum:** "Kullanıcı aynı anda kaç kuruma ait olabilir ve bunu görebilir mi" ürünün temel kapsamıyla ilgili bir karar.
**Kapsadığı kalemler:** `TenantSwitcher` bileşeni (+ bağlı çok-kurumlu üyelik akışı).
**Seçenekler:**
**A) Kurum değiştiriciyi aç** (üst menüye koy) · Kullanıcı: birden çok kurumu varsa üstte kurum seçer, geçiş yapar · Kazanç: çok-kurumlu kullanıcı (üniversite+STK) gerçek ihtiyaç, model zaten destekliyor · Kaybedersin: tek-kurumlu kullanıcı için gereksiz bir öğe, test/kenar durum yükü (yanlış kurumda işlem riski) · Süre: M-L (sunucuda kurum geçişi de yazılmalı; oturum/yetki dosyası → bağımsız inceleme) · Geri alınır: evet · Migration: yok
**B) Yalnız birden fazla üyeliği olana göster** (tek üyelikte gizli) · Kullanıcı: çoğu kullanıcı hiç görmez, yalnız çok-kurumlu olan görür · Kazanç: ihtiyacı olana çözüm, çoğunluk için sade · Kaybedersin: yine de test/kenar durum yükü, nadir bir senaryoya emek · Süre: M-L (sunucuda kurum geçişi de yazılmalı) · Geri alınır: evet · Migration: yok
**C) Açma, tek-kurum modeli kalsın** · Kullanıcı: değişiklik yok · Kazanç: en sade akış, sıfır kenar durum · Kaybedersin: çok-kurumlu kullanıcı ikinci kurumuna erişemez, yazılmış bileşen rafta kalır · Süre: yok · Geri alınır: evet · Migration: yok
**Karşılaştırma:** Aynı kişinin birden çok kurumda yer alması senin hedef senaryonsa (üniversite mezunu + iş yeri gibi) B en akıllıcası — ihtiyacı olana açılır, çoğunluğu yormaz. Bu senaryo nadir/uzaksa C yeterli. A yalnızca çoğu kullanıcının çok-kurumlu olacağını düşünüyorsan mantıklı.
**Benim önerim:** B — model zaten destekliyor, bileşen hazır; koşullu göstermek düşük maliyetle gerçek ihtiyacı karşılar, çoğunluğu etkilemez.
**Cevap vermezsen:** TenantSwitcher bağlanmaz, tek-kurum akışı devam eder. AJ-10 (bağlanmamış bileşenler, kapısı KARAR-36 ile ortak) bekler.
**İlgili kartlar:** KARAR-36 (AJ-10 bağlanmamış bileşenler kapısı ortak) · KARAR-124 (çok kurumlu kişi: platform sayımında da aynı kitle)
**CEVAP:**

---

