### KARAR-110 · Periyodik anket (mentörlük ilişkisinin genel değerlendirmesi) ne olsun? (1 işi açar: AJ-14)  [ÜRÜN KARARI]
> ⭐ Kaynak: E-3e yan bulgusu + 7b incelemesi (2026-09-27); kuyrukta AJ-14.

**Şu an ne var:** `/periodic-survey` adında bir sayfa var (tavsiye puanı, güven, özgüven, kariyer katkısı soruları; `frontend/src/app/(dashboard)/periodic-survey/page.tsx`). Ama (1) hiçbir ekrandan ya da e-postadan bu sayfaya bağlantı yok; (2) sayfa açılsa bile gönderim her seferinde "En az bir değerlendirme puanı girilmelidir" hatasıyla reddediliyor (`backend/src/controllers/feedbackController.ts:11-30`); (3) cevaplar görüşme başına TEK satırlık geri bildirim kaydına yazılmaya çalışılıyor — mentör ve menti ikisi de doldurursa biri diğerinin cevabını ezer, ve menti'nin notu mentöre görünür (`feedbackController.ts:185-189`).
**Sorun ne:** Yarım kalmış bir özellik: kimse ulaşamıyor, ulaşsa kaydedemiyor, kaydedebilse gizlilik kuralını (KARAR-80 M22 "herkes yalnız kendi yazdığını görür") bozar.
**Neden sana soruyorum:** Periyodik anketin hiç olup olmayacağı, kime ve ne sıklıkta gösterileceği ürün kararı; düzgün çalışması yeni bir kayıt yapısı (migration) istiyor.
**Seçenekler:**
- **A) AN-52 anket altyapısına katılsın** (KARAR-106 EVET olursa gelen `ProductSurveyResponse` tablosu; kişi başına ayrı kayıt, gizlilik doğal olarak korunur) ve eski sayfa karantinaya alınsın — Kullanıcı: ilişki değerlendirme soruları köşedeki isteğe bağlı soru kartlarında, belirli anlarda çıkar · Kazanç: tek anket sistemi, ek migration yok (KARAR-106 ile gelir), gizlilik sorunu kökten çözülür · Kayıp: eski sayfa kalkar (karantina, silme değil); KARAR-106'ya bağlı · Süre M · Geri alınır · Migration: KARAR-106'nınki.
- **B) Eski sayfa ayrı bir kayıt yapısıyla onarılsın ve belirli aralıkla (ör. 3 ayda bir) e-postayla gönderilsin** — Kullanıcı: dönemsel "ilişkiniz nasıl gidiyor?" e-postası ve sayfa · Kazanç: bağımsız, dönemsel ölçüm · Kayıp: ikinci bir anket sistemi; ayrı migration + e-posta zamanlayıcısı; SMTP'ye bağlı · Süre L · Geri alınır · Migration VAR.
- **C) Şimdilik dokunulmasın** — Kullanıcı: değişiklik yok (sayfa zaten erişilemez) · Kazanç: iş yok · Kayıp: yarım kod durur; biri sayfayı bağlarsa hem hata hem gizlilik sorunu çıkar · Süre — · Geri alınır · Migration yok.
**Karşılaştırma:** Tek ve tutarlı bir anket sistemi istiyorsan A; dönemsel e-posta ölçümü ayrı bir hedefse B; ilk kurumlarla canlıya çıkış öncelikliyse C.
**Benim önerim:** A — gizlilik sorununu yeni kodla değil mevcut planlanan altyapıyla çözer, iki anket sistemi doğmaz.
**Cevap vermezsen:** AJ-14 bekler; sayfa erişilemez olduğu için kullanıcı etkisi yok.
**CEVAP:**

