### KARAR-60 · Kullanıcı kişilik boyut yüzdesini görür mü?  (1 işi açar)  [ÜRÜN KARARI]
**Şu an ne var:** Belgeler çelişiyor: TAS "kullanıcı yüzdeyi görmez" diyor (`TAS:44`), ARK "görebilir" diyor (kaynaksız, `ARK:46`), API ise ham OCEAN boyut değerlerini döndürüyor. Kanıt: `icerik-tam-okuma-2026-09-23.md` Z-15, Y-19.
**Sorun ne:** Kullanıcının kendi kişilik kartında ham yüzde (ör. "Dışadönüklük %72") görüp görmeyeceği kararsız; API ham veriyi döndürdüğü için frontend'de sızma riski de var. Kullanıcı bir ekranda yüzde görürken diğerinde yalnız arketip görebilir.
**Neden sana soruyorum:** Kullanıcının kendisi hakkında ne kadar ham veri gördüğü bir ürün + ton kararı; "yüzde soğuk/klinik" hissi tasarımın arketip metaforu seçme gerekçesiyle (`devir/08-oturum-tezi-2026-08-28.md:32`) ilgili.
**Seçenekler:**
· **A — Yüzde gösterilmez, yalnız arketip/ipucu (TAS).** Kullanıcı ne görür: "Öncü" gibi bir arketip, sayı yok. Ne kazanırsın: sıcak, damgalamayan, "eğilim" diliyle tutarlı. **Ne kaybedersin:** meraklı kullanıcı ham sonucu göremez; API ham veriyi döndürmeye devam ederse şeffaflık dengesizliği kalır. Süre S · geri alınır ✅ · migration yok
· **B — Yüzde gösterilir (ARK).** Kullanıcı ne görür: her boyut için sayı. Ne kazanırsın: şeffaf, meraklıyı tatmin eder. **Ne kaybedersin:** klinik/soğuk his; dayanağı zayıf skorun kesin sayı gibi sunulması (KARAR-66 ile çelişir); kırılganda yanlış özdeğer riski. Süre S · geri alınır ✅ · migration yok
**Karşılaştırma:** Ürünün temkinli metodoloji diliyle tek ses A; şeffaflık ve merak öndeyse B ama sayıyı "kesin ölçüm" gibi göstermenin etik riskini taşır.
**Benim önerim:** A — KARAR-48/KARAR-64'ün temkinli "eğilim" diliyle en tutarlısı; API ham veri sızmasının da ayrıca kapatılması gerekir.
**Cevap vermezsen:** kişilik kartı işi hangi veriyi göstereceğini bilemez; API ham OCEAN döndürmeye devam eder.
**CEVAP:**

---

