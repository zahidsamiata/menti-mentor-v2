### KARAR-16 · Yöneticiye eşleştirme kontrolleri (görünürlük onayı + yeniden eşleştirme) verilsin mi?  [ÜRÜN KARARI]
**Şu an ne var:** Backend'de iki yönetici aksiyonu yazılı ama ekranda yok: (1) bir mentörün "görünür olma" onayını yönetici teyit eder (double-opt-in); (2) yönetici bir kullanıcıyı "yeniden eşleştir" diyerek eşleştirme sırasına tekrar sokar. Kanıt: `backend/src/routes/adminRoutes.ts:72` (visibility-optin confirm), `adminRoutes.ts:59` (rematch). Frontend'de 0 çağrı. Not: rematch'in bildirim kısmı henüz taslak (stub — `backend/src/controllers/adminController.ts:544-545`).
**Sorun ne:** Yönetici bir mentörü onaylamak ya da kötü giden bir eşleşmeyi yeniden kurmak isteyebilir ama şu an yapamıyor. Eşleştirme tamamen otomatik; yöneticinin müdahale kolu yok.
**Neden sana soruyorum:** "Eşleştirmeye yönetici ne kadar karışsın" ürünün "biz doğru eşi buluyoruz" iddiasına dokunuyor — fazla müdahale motorun değerini zayıflatır.
**Kapsadığı kalemler:** `admin/visibility-optin/:optInId/confirm`, `admin/users/:id/rematch` (+ rematch bildirimi stub → gerçek bildirim gerekebilir).
**Seçenekler:**
**A) İkisini de aç** (onay + yeniden eşleştir butonları) · Kullanıcı (yönetici): mentör görünürlüğünü onaylar, kötü eşleşmeyi yeniden kurar · Kazanç: yönetici gerçek kontrol, sıkışan durumları çözer · Kaybedersin: yönetici motoru sık ezerse "otomatik eşleştirme" değeri aşınır; rematch bildirimi stub olduğu için kullanıcı neden yeniden eşleştiğini anlamayabilir · Süre: M · Geri alınır: evet · Migration: yok
**B) Yalnız görünürlük onayını aç, rematch'i sonraya bırak** · Kullanıcı: yönetici mentör onaylar; yeniden eşleştirme yok · Kazanç: en sık ve düşük riskli ihtiyaç karşılanır, bildirimi tamamlanmamış rematch beklemede kalır · Kaybedersin: kötü eşleşmeyi yönetici elle düzeltemez · Süre: S · Geri alınır: evet · Migration: yok
**C) İkisini de açma** · Kullanıcı: değişiklik yok · Kazanç: motor saf otomatik kalır, panel sade · Kaybedersin: yönetici sıkışan durumda (onay bekleyen mentör, kötü eşleşme) çaresiz · Süre: yok · Migration: yok
**Karşılaştırma:** Yöneticiye eşleştirmede söz hakkı vermek istiyorsan ama motoru korumak istiyorsan B en güvenli başlangıç — görünürlük onayı motoru ezmez, yalnız kapı açar. Tam müdahale kolu istiyorsan A ama rematch bildiriminin tamamlanması gerekir. Motorun tam otomatik kalmasını savunuyorsan C.
**Benim önerim:** B — görünürlük onayı düşük riskli ve net bir ihtiyaç; rematch, bildirimi tamamlanmadan açılırsa kullanıcı kafa karışıklığı yaratır.
**Cevap vermezsen:** İki uç da bağlanmaz. Başka iş etkilenmez.
**İlgili kartlar:** KARAR-13 (aynı tür soru: backend'de yazılı yönetici düğmeleri ekrana gelsin mi) · KARAR-104 (mentör görünürlüğü mentinin gördüğü mentör listesini değiştirir)
**CEVAP:**

---

