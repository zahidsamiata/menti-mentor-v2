### KARAR-12 · Görüşme geri bildirim kayıt sistemi ne olsun?  [ÜRÜN KARARI]
**Şu an ne var:** Görüşme sonrası menti/mentör bir "check-in" (kısa değerlendirme) dolduruyor ve bu çalışıyor. Ama bunun ALTINDA, bundan ayrı, ikinci bir "geri bildirim kaydı" sistemi backend'de tam yazılı: her etkileşimi ayrı ayrı kaydedip analiz için saklıyor. Kanıt: `backend/src/routes/feedbackLogRoutes.ts:17-30` (4 uç: yaz/listele/kombinasyon skorları (yalnız ADMIN)/tek-kayıt; tek yazıcı `backend/src/controllers/feedbackLogController.ts:85`). Bu uçların frontend'de HİÇBİR çağıranı yok (kapsam: `frontend/src` tümü, harf duyarsız; tek iz KVKK dışa aktarım özetindeki sayaç `frontend/src/lib/kvkkSummary.ts:82`).
**Sorun ne:** Bu sistem eşleştirmeyi zamanla iyileştirmek için tasarlanmış (hangi eşleşme iyi gitti, hangisi kötü — bir tür öğrenme döngüsü). Ama kimse bu verileri ne giriyor ne görüyor. Ya bağlanmalı ya da niyeti netleşmeli.
**Neden sana soruyorum:** Bu verinin "kullanıcıya görünen bir panel" mi yoksa "yalnız senin göreceğin iç analiz aracı" mı olacağı bir ürün tercihi — teknik değil.
**Kapsadığı kalemler:** `feedbackLogRoutes.ts` (4 uç) + `FeedbackLog` modeli + buna bağlı `rewardPenalty.ts` skorlama mantığı (aktif import edilmiş). Not: KVKK 3-yıl saklama zaten uygulanmış.
**Seçenekler:**
**A) İç analiz aracı yap** (yalnız platform admin görür, kullanıcıya görünmez) · Kullanıcı: hiçbir şey görmez, arka planda veri birikir · Kazanç: eşleştirme kalitesini ölçmeye başlarsın, kullanıcıyı yormazsın · Kaybedersin: kullanıcı katkısı hissetmez; panel yapımı senin işin, kimse "geri bildirim verdim" demez · Süre: M · Geri alınır: evet · Migration: yok
**B) Kullanıcıya görünen geri bildirim özelliği yap** · Kullanıcı: görüşme sonrası açık uçlu geri bildirim bırakır, belki geçmişini görür · Kazanç: kullanıcı sesini duyurur, zengin veri · Kaybedersin: mevcut check-in ile çakışır/tekrar olur, kullanıcıyı iki kez sorguya çeker · Süre: L · Geri alınır: zor (kullanıcı alışır) · Migration: yok
**C) Şimdilik dursun, check-in yeterli** · Kullanıcı: değişiklik yok · Kazanç: emek çekirdeğe gider, mükerrerlik riski yok · Kaybedersin: yazılmış sistem rafta kalır, öğrenme döngüsü hiç başlamaz · Süre: yok · Migration: yok
**Karşılaştırma:** Eşleştirme motorunu veriyle iyileştirmek yakın hedefinse A doğru ve check-in ile çakışmaz (biri kullanıcıya, biri sana). Kullanıcı sesini ürünün parçası yapmak istiyorsan B, ama check-in ile sınırı iyi çizilmeli. Çekirdek akış (eşleş→randevu→görüş) hâlâ pürüzlüyse C.
**Benim önerim:** A — check-in kullanıcı tarafını zaten karşılıyor; bu sistemin değeri sana ölçüm verisi vermesinde, kullanıcıyı tekrar yormadan.
**Cevap vermezsen:** feedbackLog uçları bağlanmaz, öğrenme döngüsü kapalı kalır. AJ-38 (yöneticinin "Başarı oranı" kartı) KARAR-44 ile birlikte bekler.
**İlgili kartlar:** KARAR-44 (aynı FeedbackLog + rewardPenalty kapsamı) · KARAR-89 (FeedbackLog dört değerlendirme kutusundan biri) · KARAR-90 (yeni soruların verisi nereye akar) — birlikte cevaplanması önerilir: KARAR-12 + KARAR-44
**CEVAP:**

---

