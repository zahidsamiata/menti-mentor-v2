### KARAR-14 · Yönetici, bir kullanıcının verisini panelden silebilsin/indirebilsin mi?  [ÜRÜN KARARI · HUKUKİ/KVKK]
**Şu an ne var:** Kullanıcının kendisi verilerini indirebiliyor ve hesabını silebiliyor (self-servis, çalışıyor — `/api/me/data-export`, `/api/me/delete-account`). Bunun bir de YÖNETİCİ tarafı backend'de yazılı: yönetici bir kullanıcının verisini dışa aktarabilir, anonimleştirebilir veya kalıcı silebilir. Kanıt: `userRoutes.ts:177` (anonymize), `:182` (hard-delete), `:187` (export). Hiçbirinin ekranda butonu yok.
**Sorun ne:** KVKK kapsamında bir kullanıcı "verimi silin" diye kuruma başvurursa, yöneticinin bunu yapabilmesi gerekebilir. Ama bu aynı zamanda tehlikeli: bir yönetici başka birinin verisini kalıcı silebilir/indirebilir — kötüye kullanım ve gizlilik riski.
**Neden sana soruyorum:** Hukuki (KVKK) sonucu olan ve geri dönülmez (kalıcı silme) bir yetki — kimin, kimin verisine dokunabileceği ürün+hukuk kararı. Ben avukat değilim.
**Kapsadığı kalemler:** `/api/users/:id/anonymize`, `/api/users/:id/hard-delete` (DELETE), `/api/users/:id/export` (ADMIN muadilleri).
**Seçenekler:**
**A) Yönetici bu üç işlemi panelden yapabilsin** (onay + log ile) · Kullanıcı (yönetici): kullanıcı kartında "veriyi indir / anonimleştir / sil" · Kazanç: KVKK başvurusuna kurum hızlı cevap verir, self-servise erişemeyen kullanıcı için de çözüm · Kaybedersin: yönetici başkasının verisini görebilir/silebilir — gizlilik yüzeyi büyür, kötüye kullanım riski, her işlem denetim izi ister · Süre: L · Geri alınır: hard-delete HAYIR (kalıcı) · Migration: yok
**B) Yalnız anonimleştirme ve dışa aktarma, kalıcı silme YOK** · Kullanıcı: yönetici indirir/anonimleştirir ama kalıcı silemez · Kazanç: KVKK ihtiyacı büyük ölçüde karşılanır, geri dönülmez silme riskini almaz · Kaybedersin: "tamamen sil" talebi yalnız kullanıcının kendisiyle ya da seninle çözülür · Süre: M · Geri alınır: evet (anonimleştirme geri alınamaz ama silme kadar sert değil) · Migration: yok
**C) Hiç açma, yalnız self-servis kalsın** · Kullanıcı: değişiklik yok · Kazanç: en dar gizlilik yüzeyi, yönetici kimsenin verisine dokunamaz · Kaybedersin: self-servise erişemeyen (hesabı kilitli, vefat vb.) kullanıcının KVKK talebi karşılıksız kalır, yük sana biner · Süre: yok · Migration: yok
**Karşılaştırma:** Kurumların KVKK sorumluluğunu kendi panellerinden yönetmesini istiyorsan A ama kalıcı silme için sağlam onay+log+yetki şart. Riski minimize edip ihtiyacın çoğunu karşılamak istiyorsan B en dengeli. Gizliliği en üstte tutuyorsan ve kurum sayısı azken sen aracılık edebiliyorsan C.
**Benim önerim:** B — KVKK ihtiyacının çoğunu karşılar, geri dönülmez silme yetkisini yöneticiye vermenin riskini almaz; kalıcı silme ayrı bir karar olarak sonra gelebilir. (Bu senin ürün+hukuk kararın, önerime güvenme — avukat görüşü değerli olur.)
**Cevap vermezsen:** ADMIN KVKK uçları bağlanmaz, self-servis çalışmaya devam eder. Başka iş etkilenmez.
**CEVAP:**

---

