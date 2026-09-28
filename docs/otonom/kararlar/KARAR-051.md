### KARAR-51 · 4 "yaşayan ama ölü" belge dondurulsun mu?  [BELGE POLİTİKASI] (2 işi açar)
> ⭐ **Kaynak:** yönetişim konseyi (`docs/raporlar/kesif/konsey-yonetisim-2026-09-21.md`), 2026-09-21.

**Şu an ne var:** 26 aktif 🔄 YAŞAYAN belgeden **2'si kesin ölü**, **2'si ölü adayı**. İkisi kendi içinde *"işi X devraldı"* yazıyor ama künyesi hâlâ 🔄 diyor: `kararlar/konu/08-acik-sorular.md:5` (→ `00-KARAR-TAKIP.md`) · `raporlar/icerik/kod-kalemleri-2026-09-03.md:8` (→ `00-KUYRUK.md` AŞAMA I). Adaylar: `kararlar/10-yol-tamamlananlar.md` · `raporlar/bilanco/kararlar/G9-belge-surec.md`.

**Sorun ne:** 🔄 damgası "buraya bak, güncel" demek. Okuyan ölü belgeyi güncel sanıp yanlış yere yazıyor ya da bayat bilgiyi doğru sanıyor.

**Neden sana soruyorum:** Bir belgeyi dondurmak *"bu artık canonical değil"* demektir — KURAL 7 gereği canonical kararı PO'nundur. Ayrıca `10-yol-tamamlananlar` için **atıf zinciri** var: `10-yol-haritasi.md:7` hâlâ oraya yönlendiriyor.

**Seçenekler:**
· **A — Yalnız 2 kesin ölüyü dondur.** Kullanıcı ne görür: bu ikisi *"📸 dondurulmuş, güncel için X"* diyor. Ne kazanırsın: kanıtı kendi içinde olan iki vaka kapanır, risk sıfır, hazır metinler mevcut. **Ne kaybedersin:** 2 ölü aday belirsiz kalır; `00-BELGE-HARITASI`'nın 🔄 sayımı yine tam doğru olmaz. Süre **S** · geri alınır ✅ · migration yok.
· **B — Dördünü birden dondur.** Ne kazanırsın: 🔄 kümesi tamamen dürüst olur, sayım bir kerede düzelir. **Ne kaybedersin:** `10-yol-tamamlananlar` dondurulursa `10-yol-haritasi.md:7`'deki yönlendirme **kırık atıf** olur — önce o düzeltilmeli; `G9` için KURAL 12 eşiği henüz dolmadı (**2026-10-02**), erken dondurmak kendi kuralını delmek olur. Süre **M** · geri alınır ✅ · migration yok.
· **C — Hiçbirini dondurma, yalnız "son güncelleme" tarihi ekle.** Ne kazanırsın: hiçbir canonical değişmez, sıfır risk. **Ne kaybedersin: asıl sorun çözülmez** — okuyan yine 🔄 görüp güncel sanar; tarih eklemek "bu belge ölü" demez. Süre **S** · geri alınır ✅ · migration yok.

**Karşılaştırma:** A risksiz ve kanıtı belgelerin kendisinde. B daha eksiksiz ama iki ön koşul istiyor (atıf düzeltme + eşik bekleme). C sorunu görünür kılar ama çözmez.

**Benim önerim:** **A** — iki kesin vaka bugün kapansın; `10-yol-tamamlananlar` ancak `10-yol-haritasi.md:7` düzeltildikten sonra, `G9` ise 2026-10-02'de kendi kuralıyla dondurulsun.

**Cevap vermezsen:** 4 belge 🔄 görünmeye devam eder; `00-BELGE-HARITASI`'nın 🔄 sayımı da yanlış kalır.

**CEVAP:**

---

