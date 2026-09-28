### KARAR-52 · Taşınan KURAL 8 mükerreri: hangi gövde kalsın?  [BELGE/METODOLOJİ] — ⭐ BU TURDA DOĞDU
> ⭐ **Kaynak:** yönetişim konseyi (`docs/raporlar/kesif/konsey-yonetisim-2026-09-21.md`), 2026-09-21.
> ⚠️ **BU TURDA DOĞDU:** mükerrer, bu PR'daki CLAUDE.md bölmesiyle iki dosyadan tek dosyaya taşındı (YN-02).

**Şu an ne var:** Bölme sonrası `belge-duzeni-rehberi.md`'de **KURAL 8 iki kez** var: `:99-109` (rehberin kendi gövdesi, 2026-08-23) ve `:143-152` (CLAUDE.md'den 2026-09-21'de taşınan kopya). Rapor `:337` (B.4-1) bu taşımanın mükerreri **çözeceğini** söylüyordu; fiilen mükerrer **iki dosyadan tek dosyaya taşındı**, ortadan kalkmadı.

**Sorun ne:** Rehberin kendi KURAL 1'i *"tek gerçek kaynağı"* diyor — şimdi kendi dosyasının içinde iki gerçek kaynağı var. Okuyan hangisine uyacağını bilemez; ikisi birebir aynı da değil (rehber hâli 1.300 karakter, taşınan hâli 974).

**Neden sana soruyorum:** Bir kural gövdesini elemek `CLAUDE.md § SİLME PROTOKOLÜ`'ne ve rapor `:333`'teki *"hiçbir kural gövdesi silinmiyor"* taahhüdüne dokunuyor. Hangi gövdenin canonical olduğu belge politikası kararıdır.

**Seçenekler:**
· **A — Rehberin kendi gövdesi (`:99-109`) kalsın; taşınan kopya `## GEÇMİŞ`e insin.** Kullanıcı/ajan ne görür: tek KURAL 8, en uzun ve en eski gövde. Ne kazanırsın: canonical zinciri bozulmaz, hiçbir satır silinmez. **Ne kaybedersin:** CLAUDE.md'nin son hâli (974 karakter) daha güncel olabilir — bu turda içerik farkı **karşılaştırılmadı** (❓ TEYİT GEREK); yanlış gövdeyi seçme riski var. Süre **S** · geri alınır ✅.
· **B — İki gövdeyi BİRLEŞTİR, farkları tek metinde topla.** Ne kazanırsın: hiçbir bilgi kaybı yok, tek gerçek kaynağı gerçekten tek olur. **Ne kaybedersin:** elle karşılaştırma gerektirir (iki gövde satır satır okunmalı); birleştirme sırasında sessiz bir kayıp riski — bu yüzden ⛔ `kalan + taşınan = önceki` denetimi zorunlu olur. Süre **M** · geri alınır ✅.
· **C — İkisi de kalsın, taşınan kopyaya *"bkz. yukarıdaki KURAL 8"* notu düşülsün.** Ne kazanırsın: sıfır risk, sıfır karar. **Ne kaybedersin:** dosya **8.103 karakterlik** taşımanın üstüne ~974 karakter gereksiz taşımaya devam eder; ve "mükerrer bırakma" bu projede üç kez sorun doğurdu. Süre **S** · geri alınır ✅.

**Karşılaştırma:** A hızlı ama hangi gövdenin daha güncel olduğu doğrulanmadan seçim yapıyor. B tek doğru çözüm ama emek istiyor ve denetim şart. C hiçbir şeyi çözmez, yalnız görünür kılar.

**Benim önerim:** **B** — iki gövde de kural metni, ikisi de kısa; birleştirme yarım saatlik iş ve `CLAUDE.md § SİLME PROTOKOLÜ`'ne hiç girmiyor (silme değil birleştirme). A'yı ancak gövdeler birebir aynı çıkarsa öneririm.

**Cevap vermezsen:** YN-02 kuyrukta bekler; `belge-duzeni-rehberi.md` kendi KURAL 1'ini ihlal etmeye devam eder ve "kuralları oku" diyen ajan aynı kuralı iki farklı uzunlukta okur.

**CEVAP:**

---

