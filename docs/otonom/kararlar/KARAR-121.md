### KARAR-121 · Kişilik testinin cevap biçimi: zorunlu seçim mi, puanlama mı, karma mı? (0 iş kilitliyor; KARAR-58 ve KARAR-103 md.12 ile ilişkili) [ÜRÜN KARARI · PSİKOMETRİ]
**Şu an ne var:** Mizaç soruları iki ayrı biçimde: kayıtta "dört şıktan birini seç", /disc-test'te 1-5 katılım ölçeği. Karma biçim tasarlanmadı; ters ifadeli (tutarlılık) soru da yok. Kanıt: `docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:716,764` · `backend/prisma/schema.prisma:738-752`.
**Sorun ne:** Yalnız "birini seç" biçimi kişileri birbirleriyle kıyaslamayı bozar (herkesin toplamı aynı çıkar); yalnız puanlama ise "hepsine 5 veririm" kaymasına açık.
**Neden sana soruyorum:** Kullanıcının testi nasıl yaşadığını ve sonucun anlamını değiştirir; psikometri tasarım kararı.
**Seçenekler:**
- **A) Karma: temel sorular puanlama + birkaç zorunlu seçim sorusu.** · Kullanıcı ne görür: iki tür soru · Kazanç: iki sorunun da etkisi azalır · Kaybedersin: test biraz uzar; puanlama kodu ve içerik yeniden yazılır · Süre: L · Geri alınır: evet (eski cevaplar korunursa) · Migration: muhtemel (soru tipi alanı)
- **B) Bugünkü biçim kalsın, yalnız ters ifadeli tutarlılık soruları eklensin.** · Kullanıcı ne görür: birkaç ters ifadeli soru · Kazanç: az iş, kayma tespit edilir · Kaybedersin: kıyaslama sorunu sürer · Süre: M · Geri alınır: evet · Migration: muhtemel
- **C) Big Five geçişine (KARAR-58) kadar dokunma.** · Kullanıcı ne görür: değişiklik yok · Kazanç: iş yok; geçişte tek seferde tasarlanır · Kaybedersin: bugünkü ölçüm zayıflığı sürer · Süre: — · Geri alınır: — · Migration: yok
**Karşılaştırma:** Ölçüm kalitesi hemen önemliyse A; hafif iyileştirme yeterliyse B; test zaten Big Five'a geçecekse C emek israfını önler.
**Benim önerim:** C — KARAR-58 cevapsızken biçim tasarlamak iki kez iş demek; bu senin ürün kararın, önerime güvenme (uzman paketi G-6 ile birlikte düşün).
**Cevap vermezsen:** Test biçimi olduğu gibi kalır; başka iş kilitlenmez.
**İlgili kartlar:** KARAR-42 (tekrar test aynı cevap biçimini yeniden kullanır) · KARAR-57 (hangi testin biçimi esas sayılacak) · KARAR-58 (Big Five geçişinde biçim baştan tasarlanır; öneri C buna bağlı) · KARAR-103 md.12 (ters kodlu soru eksikliği aynı konu) — birlikte cevaplanması önerilir: KARAR-121 + KARAR-103 md.12
**CEVAP:**


