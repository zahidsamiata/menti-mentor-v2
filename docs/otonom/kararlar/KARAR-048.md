### KARAR-48 · Test sonucu ve eşleşme skoru kullanıcıya nasıl anlatılsın? (3 ekran) [ÜRÜN KARARI]
> ⭐ **Kaynak:** içerik konseyi (`docs/raporlar/kesif/konsey-icerik-2026-09-21.md`), 2026-09-21.

**Şu an ne var:** Mizaç testi bitince ekran *"Sen bir Öncüsün!"* diyor, konfeti atıyor, *"En İyi Eş: S + C"*
yazıyor ve *"…en uygun … kişiyle **eşleştirileceksin**"* diye söz veriyor (`ResultStep.tsx:39-43,71,98-100`).
Eşleşme kartında *"%87 uyum"* gibi bir sayı var (`menti/page.tsx:311`), gerekçe üretilemezse yerine
*"Genel profil uyumu"* basılıyor (`matchingController.ts:15`).

· Kimlik dili ve tutulamayan vaat kodda: "Sen bir Öncüsün!" (`ResultStep.tsx:38` · `DiscRecallCard.tsx:56` · `onboardingController.ts:67`), "En İyi Eş" / "…eşleştirileceksin" (`ResultStep.tsx:71,97-100`) — metodoloji "kişilik tanısı değildir" diyor. En somut, araştırma beklemeyen düzeltme: "En İyi Eş" + "eşleştirileceksin" vaadinin kaldırılması. *(2026-09-23 EK BİLGİ katmanı buraya işlendi 2026-09-27; aslı: `docs/otonom/arsiv/01-KARARLAR-kart-gecmisi.md` §KARAR-48)*
**Sorun ne:** Ürünün kendi metodoloji sayfası *"kesin bir başarı garantisi değil"*, *"DISC kişilik tanısı
değildir"* diyor — ama kullanıcının **gerçekten okuduğu** ekranlar (sonuç kartı, eşleşme kartı) bu temkinli dili
taşımıyor: kimlik etiketi ("Sen bir X'sin"), üstünlük ("En İyi Eş"), kesin vaat ("eşleştirileceksin") ve
açıklamasız bir yüzde. Üstelik sonuç kartında **paylaş düğmesi** var, yani bu dil ürünün dışına taşınıyor.
Ayrıca havuz boşsa aynı kullanıcı birkaç ekran sonra *"uygun mentor bulunamadı"* görüyor — vaat tutulmuyor.

**Neden sana soruyorum:** Kullanıcının kendisi hakkında ne öğrendiği ve üründen ne beklediği; ölçü değil **vaat**
meselesi. Teknik değil.

**Seçenekler:**
**A) Koşullu dile geç** ("şu an şu eğilimi gösteriyorsun", "genelde iyi anlaşılan", "eşleştirmeye çalışacağız",
yüzde yerine bant) · Kullanıcı: daha dürüst, daha az kesin bir kart görür · Kazanç: metodoloji sayfasıyla tutarlı
olur, vaat tutulmadığında hayal kırıklığı azalır · Kayıp: "aha anı" zayıflar, paylaşılabilirlik düşer ·
Süre: S · Migration: yok
**B) Bugünkü dil kalsın, yanına küçük bir çekince satırı eklensin** · Kullanıcı: aynı heyecanı yaşar, altında bir
açıklama görür · Kazanç: etki korunur, dürüstlük eklenir · Kayıp: çekinceyi kimse okumaz; çelişki görünür kalır ·
Süre: S · Migration: yok
**C) Hiçbir şey değişmesin** · Kullanıcı: bugünkü kartı görür · Kazanç: sıfır iş, en güçlü ilk izlenim ·
Kayıp: ürün iki dille konuşur (metodoloji temkinli, kart iddialı); yüzde açıklanmadığı için "neden bu mentör"
sorusu cevapsız kalır · Süre: — · Geri alınır: —

**Karşılaştırma:** İlk izlenimin çarpıcılığı büyüme için kritikse B; ürünün tek sesle konuşması senin için
önemliyse A. C yalnızca bu çelişkiyi bilinçli kabul ediyorsan savunulabilir.
**Benim önerim:** A — yüzde ve "eşleştirileceksin" ürünün **tutamadığı** iki vaat; kalan kısım zaten güçlü.
**Cevap vermezsen:** C1-1…C1-6 (6 metin) olduğu gibi kalır; eşleşme kartındaki boş gerekçe de sürer.
**CEVAP:**

---

