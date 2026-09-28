### KARAR-38 · Kurum sunucusunun ülkesi ve aydınlatma metninin düzeltilmesi  [HUKUK + ÜRÜN] (1 işi açar)
> ⭐ **Kaynak:** güvenlik konseyi (`docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md`), 2026-09-21.
> ⚠️ **ÇAPRAZ:** bu kartın avukat sorusu **KARAR-47** (hukuki metin paketi) içinde tek seferde sorulur — ayrı bir hukuk görüşmesi açma.
**Şu an ne var:** KVKK aydınlatma sayfası (`app/kvkk/page.tsx:92-107`) *"İrlanda (Avrupa Birliği) bölgesinde … GDPR standartlarına tabidir"* diyor. Proje belgesi ise PO teyidiyle veritabanı bölgesinin **Londra / Birleşik Krallık** olduğunu yazıyor (`CLAUDE.md § Ortam / Veritabanı`, madde 92, 2026-08-26) — **BK, AB üyesi değil.** Metin ayrıca "yönetilen PostgreSQL hizmeti" diyor, PROD ise kendi konteynerinde Postgres çalıştırıyor (`docker-compose.yml:16-24`). Aktarım bölümü (`:60-64`) Google/LinkedIn OAuth ve e-posta sağlayıcısını **hiç saymıyor**; işlenen veri listesinde (`:31-39`) 8 kategori eksik (mesaj içeriği, telefon, sosyal linkler, avatar, OCEAN/arketip, şikâyet kayıtları, IP adresi `platformAudit.ts:32`, `lastLoginAt`).
**Sorun ne:** Kuruma ve kullanıcıya **yanlış ülke ve yanlış hukuki rejim** beyan ediliyor. Bir denetimde ilk bakılacak belge budur; yanlış beyan, eksik beyandan daha ağır sonuç doğurur.
**Neden sana soruyorum:** Metin hukuki sonuç doğuruyor ve ajan doğru cevabı koddan çıkaramaz — **uygulama sunucusunun ülkesi kodda hiç yok** (yalnız veritabanı bölgesi belgede).
**Seçenekler:**
· **A — Metni gerçeğe uydur (Londra/BK + tüm alıcılar).** Kullanıcı ne görür: doğru ülke, doğru rejim ve tam alıcı listesi. Ne kazanırsın: beyan gerçeğe uyar, denetimde savunulabilir. **NE KAYBEDERSİN:** BK'ye aktarım **yurt dışı aktarım** sayılırsa KVKK Md.9 gereği ek açık rıza/taahhütname gerekebilir → **yeni bir rıza akışı** ve mevcut kullanıcılardan yeniden onay demek. Süre **M** · geri alınır ✅ · migration **yok**.
· **B — Sunucuyu AB/Türkiye'ye taşı, metni koru.** Kullanıcı ne görür: hiçbir değişiklik. Ne kazanırsın: en temiz hukuki konum, ek rıza yükü yok. **NE KAYBEDERSİN:** taşıma **geri dönülmez bir altyapı işi** — kesinti riski, yeniden yapılandırma, maliyet; üstelik taşıma maliyeti bu turda **ölçülmedi**. Süre **L** · geri alınması **zor ⛔** · migration **yok** (veri taşınır).
· **C — Önce avukata sor, sonra karar ver.** Kullanıcı ne görür: bir süre daha bugünkü (yanlış) metni. Ne kazanırsın: yanlış yöne para/zaman harcanmaz. **NE KAYBEDERSİN:** metin **yanlış hâliyle canlıda kalmaya devam eder**; her geçen gün yanlış beyanla kullanıcı alınır. Süre **S** (soru) + bekleme · geri alınır ✅ · migration **yok**.
**Karşılaştırma:** A hızlı ve dürüst ama yeni bir rıza yükü getirebilir. B en temiz ama en pahalı ve maliyeti bugün bilinmiyor. C tek başına çözüm değil; A veya B'nin ön adımıdır.
**Benim önerim:** **C → sonra A.** Çünkü "BK'ye aktarım ek rıza ister mi" sorusunun cevabı A'nın maliyetini tamamen değiştiriyor ve bunu ajan bilemez. Ama C'de **beklerken metin düzeltilmeli** — en azından "İrlanda/AB" ifadesinin kaldırılıp "sunucu konumu teyit ediliyor" denmesi, yanlış beyandan iyidir.
**Cevap vermezsen:** GV-09 kilitli kalır; aydınlatma metni yanlış ülke beyanıyla canlıda durur. Avukat paketine bağlı **F-02** (mesaj saklama süresi), **F-03** (OAuth rıza metni) ve **GV-18** (rıza sürümü, `CONSENT_VERSION` yer tutucu) da **birlikte kilitli kalır**.
**CEVAP:**

---

