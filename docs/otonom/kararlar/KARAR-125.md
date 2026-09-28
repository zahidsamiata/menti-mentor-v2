### KARAR-125 · Mentör ya da menti kendi kurumunu platforma önerebilsin mi ("ters çekim")? (0 iş kilitliyor) [ÜRÜN KARARI]
**Şu an ne var:** Kurumlar platforma yalnız kendi başvurusuyla ("Kurumunu Kur") ya da platform yöneticisi eliyle geliyor; bir kullanıcı "kendi kurumumu da davet et" diyemiyor. KARAR-103 madde 7 yalnız kurumdan kuruma daveti soruyor, bireyden kuruma değil. Kanıt: `frontend/src` araması (`refer` / `kurumunu.*davet` / `ters çekim`) 0 · `docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md:160` (G4-38) · kaynak `docs/kararlar/00-KARAR-TAKIP.md:632` (madde 116).
**Sorun ne:** Bir kurumda memnun kalan mentör/menti, üyesi olduğu başka bir kurumu (okul, dernek, mezun ağı) getiremiyor; organik kurum kazanımı kanalı kapalı.
**Neden sana soruyorum:** Kullanıcıya yeni bir özellik ve büyüme modeli kararı; üçüncü kişinin (kurum yetkilisinin) e-postasını işlemek KVKK sonucu doğurabilir.
**Seçenekler:**
- **A) Yok (bugünkü).** · Kullanıcı ne görür: değişiklik yok · Kazanç: iş yok, üçüncü kişi verisi işlenmez · Kaybedersin: bireylerden gelen kurum kazanımı kanalı kapalı kalır · Süre: — · Geri alınır: evet · Migration: yok
- **B) Basit öneri formu — kullanıcı kurum adını ve (isteğe bağlı) yetkili e-postasını yazar; bildirim platform yöneticisine gider, davet elle yapılır.** · Kullanıcı ne görür: panelde "Kurumunu öner" bağlantısı · Kazanç: ucuz, insan kontrolünde · Kaybedersin: platform yöneticisine iş düşer; yetkili e-postası işlenirse aydınlatma metnine eklenmeli · Süre: S · Geri alınır: evet · Migration: yok (e-posta ile) ya da muhtemel (öneri kaydı)
- **C) Otomatik davet bağlantısı — kullanıcı kurum yetkilisine "Kurumunu Kur" bağlantısı gönderir, kimin getirdiği izlenir.** · Kullanıcı ne görür: paylaşılabilir davet bağlantısı · Kazanç: ölçeklenir; getiren kişiye takdir verilebilir · Kaybedersin: izleme alanı (migration), KVKK değerlendirmesi, kötüye kullanım (spam) önlemi gerekir · Süre: M · Geri alınır: kısmen · Migration: var
**Karşılaştırma:** Önce ilk kurumların oturması istiyorsan A; büyümeyi insan kontrolünde denemek istiyorsan B; kurum kazanımı ana büyüme kanalı olacaksa C.
**Benim önerim:** A (şimdilik) — gerçek kullanıcı ~0 iken büyüme kanalı erken; gelir modeli (KARAR-119) ile birlikte düşün; bu senin ürün kararın, önerime güvenme.
**Cevap vermezsen:** Kanal kapalı kalır; başka iş kilitlenmez.
**İlgili kartlar:** KARAR-103 (md.7 kurumdan kuruma davet, komşu kanal) · KARAR-119 (hangi kurum kazanımına hizmet ettiği gelir modeline bağlı) — birlikte cevaplanması önerilir: KARAR-125 + KARAR-103
**CEVAP:**

