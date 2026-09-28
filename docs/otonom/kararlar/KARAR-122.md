### KARAR-122 · Kişi derinleşme sorularını sınırsız yeniden cevaplayıp profilini değiştirebilsin mi? (0 iş kilitliyor) [ÜRÜN KARARI · PSİKOMETRİ]
⚠️ **KARAR-42 ile AYNI ürün sorusu (kümeleme):** kişi cevaplarını yeniden verip profilini değiştirebilir mi — iki kart BİRLİKTE cevaplanmalı (çelişkili cevap riski: 42=B sınırsız yeniden test ↔ 122=B 30 günlük sınır). Bugün arayüz havuzu bitiren kullanıcıya yeniden soru göstermiyor (KARAR-42); sınırsız yeniden cevap yalnız doğrudan API çağrısıyla mümkün (`POST /api/questions/:id/respond` — `questionRoutes.ts:73`).
**Şu an ne var:** Ek (derinleşme) sorular her cevaplandığında mizaç profili baştan hesaplanıyor; kaç kez cevaplanabileceğine sınır yok. Kanıt: `backend/src/controllers/questionController.ts:318-321` (her yanıtta `recalcDiscVector`) · kaynak `docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:366` (G3-03).
**Sorun ne:** Kişi istediği profili çıkarana kadar cevapları değiştirebilir; eşleşme önerileri de her seferinde kayar.
**Neden sana soruyorum:** Kullanıcının kendi profiline ne kadar hükmedebileceği ürün kararı.
**Seçenekler:**
- **A) Sınırsız kalsın.** · Kullanıcı ne görür: istediği kadar günceller · Kazanç: özgürlük; "değiştim" diyenin profili tazelenir · Kaybedersin: oyunlama, eşleşme istikrarsızlığı · Süre: — · Geri alınır: — · Migration: yok
- **B) Dönemsel sınır (ör. 30 günde bir yeniden derinleşme).** · Kullanıcı ne görür: "bir sonraki güncelleme X tarihinde" notu · Kazanç: istikrar, oyunlama zorlaşır · Kaybedersin: gerçek değişim de beklemek zorunda · Süre: S · Geri alınır: evet · Migration: muhtemelen yok (son cevap tarihi mevcut)
- **C) Yeniden cevap serbest, ama profil yalnız belirgin değişimde güncellenir (eşik).** · Kullanıcı ne görür: küçük oynamalarda profil değişmez · Kazanç: hem özgürlük hem istikrar · Kaybedersin: davranış kullanıcıya anlaşılmaz gelebilir; eşik psikometri kararı ister · Süre: M · Geri alınır: evet · Migration: yok
**Karşılaştırma:** Kullanıcı güveni öncelikse A; eşleşme istikrarı öncelikse B; ikisi arasında denge istiyorsan C.
**Benim önerim:** B — basit ve anlaşılır; bu senin ürün kararın, önerime güvenme.
**Cevap vermezsen:** Sınırsız davranış sürer; başka iş kilitlenmez.
**İlgili kartlar:** KARAR-42 (aynı soru: yeniden cevaplayıp profili değiştirme) — birlikte cevaplanması önerilir: KARAR-42 + KARAR-122
**CEVAP:**


