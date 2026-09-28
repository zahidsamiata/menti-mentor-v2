### KARAR-30 · Senaryo isimleri: seed'den ÖNCE mi SONRA mı değişken yapılsın  [ÜRÜN + SIRA KARARI] (2 işi açar)
**Şu an ne var:** Senaryo metinlerindeki kişi isimleri koda gömülü. Kurum kendi bağlamına uygun isim kullanamıyor. Kanıt: 9 terim (`menti_denge`·`mentor_mimar`·`sert_1` …) iki repo tamamında harf duyarsız → **kodda 0 dosya** (7 isabetin hepsi belge). İçerik hazır: `docs/raporlar/icerik/menti-yolculugu-ve-eslesme-metinleri-2026-09-03.md:56` (14 değişken).
**Sorun ne:** Bu iş **tek başına** bir sıra sorusu doğuruyor: sertifika (K-16) ve öğrenme yolculuğu (K-18) içerikleri **canlı veritabanına yazılacak**. İsim değişkeni altyapısı bu yazımdan ÖNCE yapılırsa isimler baştan değişken olarak girer; SONRA yapılırsa **aynı içeriği ikinci kez yazmak** gerekir.
**Neden sana soruyorum:** Canlı veritabanına içerik yazımı geri dönülmez bir işlem ve onayın şart; sıranın yanlış seçilmesi aynı işi iki kez yaptırır.
**Seçenekler:**
· **A — Önce isim altyapısı, sonra içerik yazımı.** Kullanıcı ne görür: bir süre daha bugünkü "Seçenek A" metinleri. Ne kazanırsın: içerik canlıya **bir kez** yazılır, kurum ilk günden kendi isimlerini kullanır. Ne kaybedersin: sertifika/yolculuk içeriği **gecikir** (isim altyapısı önce bitmeli). Süre **M** · geri alınır ✅ · migration **olası** (kurum-bazlı isim alanı).
· **B — Önce içerik yazımı, isimler sonra.** Kullanıcı ne görür: gerçek senaryolar **hemen** canlıda. Ne kazanırsın: en hızlı görünür değer. Ne kaybedersin: isim altyapısı gelince **aynı içerik ikinci kez yazılır** — canlı veritabanına ikinci geri-dönülmez işlem + ikinci onay turu. Süre **S sonra M** · geri alınır ⚠️ zor · migration **olası**.
· **C — İsimler sabit kalsın, değişken altyapısı hiç yapılmasın.** Kullanıcı ne görür: bugünkü hâli, kalıcı. Ne kazanırsın: sıfır iş. Ne kaybedersin: **kurum kendi bağlamını kuramaz**; senaryolar her kurumda aynı kurgu isimlerle okunur, sahiplik hissi düşer. Süre **0** · geri alınır ✅.
**Karşılaştırma:** Sertifika/yolculuk içeriğini yakında canlıya almak istiyorsan B hızlıdır ama ikinci yazım maliyetini kabul etmiş olursun. İçerik birkaç hafta bekleyebiliyorsa A toplamda daha ucuz. C yalnız "isim özelleştirme bizim için önemli değil" diyorsan doğrudur.
**Benim önerim:** **A** — çünkü canlı veritabanına içerik yazımı bu projede onay + yedek gerektiren ağır bir işlem; onu iki kez yapmaktansa bir kez doğru yapmak daha ucuz.
**Cevap vermezsen:** **I-09** kuyrukta bekler; ayrıca **K-16** ve **K-18** seed işleri "hangi sıra" sorusu cevapsız olduğu için güvenle başlatılamaz.
**CEVAP:**

---

