### KARAR-39 · Anonimleştirme kapsamı: psikometrik kopyalar ve başkasının yazdığı yorumlar  [ÜRÜN + KVKK] (1 işi açar)
> ⭐ **Kaynak:** güvenlik konseyi (`docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md`), 2026-09-21.
**Şu an ne var:** Hesap kapatınca `UserProfile.archetype`, OCEAN ve DISC değerleri **özenle siliniyor** (`gdprService.ts:112-119`) — ama **aynı arketip `Match` tablosunda düz metin duruyor** (`schema.prisma:1035-1036`, **NOT NULL**) ve `Match.mentorId → UserProfile.id → userId` zinciriyle hâlâ kişiye bağlanabiliyor. Ayrıca `MatchFeedback.comment` (başkasının o kişi hakkında yazdığı 1000 karakterlik yorum) hiç ellenmiyor; `fromUserId`'de **FK bile yok** (`:1170`) → şema düzeyinde hiçbir cascade yakalayamaz. Kullanıcıya verilen metin ise *"kimliğinizle ilişkilendirilebilir verileriniz geri döndürülemez şekilde anonimleştirildi"* diyor (`:50`).
**Sorun ne:** Verilen taahhüt **psikometrik veri için gerçekleşmiyor**. Ayrıca `Match` satırını boşaltmak kurumun geçmiş eşleştirme istatistiklerini de etkiler — bu bir denge sorusu.
**Neden sana soruyorum:** "Kişi gitti; ama onun hakkında **başkasının yazdığı** yorum ve onunla kurulmuş eşleşmenin istatistiği kalsın mı?" — bu bir KVKK yorumu değil, **ürün ve etik** kararıdır.
**Seçenekler:**
· **A — Arketipi boşalt, yorumu da boşalt.** Kullanıcı ne görür: verilen taahhüt aynen gerçekleşir. Ne kazanırsın: en temiz konum; taahhüt metni doğru olur. **NE KAYBEDERSİN:** `Match.mentorArchetype` **NOT NULL** → ya migration ile nullable yapılır ya `'[kaldırıldı]'` yazılır; kurumun geçmiş eşleştirme kalitesi analizi bozulur. Süre **M** · geri alınır ✅ · **migration olası**.
· **B — Arketipi boşalt, yorumu bırak (yazarın verisi say).** Kullanıcı ne görür: profili gider, hakkında yazılanlar kalır. Ne kazanırsın: yazarın ifade kaydı korunur; **projede bu desen zaten var** (`gdprService.ts:168-171`, `MentorshipAgreement`'ta yalnız menti tarafı boşaltılıyor). **NE KAYBEDERSİN:** kişi hakkında 1000 karakterlik yorum sistemde kalır — "unutulma hakkı" tam karşılanmaz, kişi itiraz ederse savunması zor. Süre **S** · geri alınır ✅ · migration **yok**.
· **C — İkisini de bırak, taahhüt metnini düzelt.** Kullanıcı ne görür: "anonimleştirildi" yerine "bir kısmı kalır" diyen dürüst ama küçültülmüş bir vaat. Ne kazanırsın: sıfır kod işi. **NE KAYBEDERSİN:** ürünün **en hassas vaadinden geri adım**; KVKK açısından da en zayıf konum. Süre **S** · geri alınır ✅ · migration **yok**.
**Karşılaştırma:** A taahhüde birebir uyar ama istatistik maliyeti ve migration getirir. B mevcut proje desenine uygun ve ucuz, ama yorum konusunda savunması zayıf. C dürüst ama vaadi küçültür.
**Benim önerim:** **B + taahhüt metninin netleştirilmesi** — arketip (kişinin **kendi** psikometrik verisi) A'daki gibi temizlenmeli; yorum ise projenin zaten benimsediği "yazarın verisi" desenine bırakılmalı; ama `gdprService.ts:50`'deki metin bu ayrımı **açıkça** söylemeli.
**Cevap vermezsen:** GV-08'in **yorum ayağı** kilitli kalır (arketip + 4 alan ayağı karardan bağımsız yapılabilir); anonimleştirme 6 tabloyu atlamaya devam eder ve kullanıcıya verilen taahhüt yanlış kalır.
**CEVAP:**

---

