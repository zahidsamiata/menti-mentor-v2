### KARAR-55 · Sertifikada geri bildirim ne zaman gösterilsin?  (2 işi açar)  [ÜRÜN KARARI · SERTİFİKA]
**Şu an ne var:** Mentör sertifika sınavında her şıkkı seçtiği anda o şıkkın açıklamasını görüyor (neden doğru/yanlış). Kanıt: `certification.service.ts:444-465` · `mentor/certification/page.tsx:102-129`. Sınav sonunda ayrıca "pekiştirilecek konular" listesi çıkıyor (`:187-219`).
**Sorun ne:** Tasarım belgeleri tam tersini istiyor: "geri bildirim sınav SONUNDA, konu bazlı" (`faz6:360,650` · `menti-yolculugu:204-214`). Anında açıklama, sınavı bir öğrenme turuna çevirir; aynı oturumda B varyantı da geldiği için ikinci soruyu açıklamayı okuyarak geçmek kolaylaşır.
**Neden sana soruyorum:** Mentörün sınavda ne gördüğü bir ürün kararı; sınavın "ehliyet mi, son tekrar mı" olduğu sorusuna bağlı (`TAS:369-371` "eleme sınavı değil, son tekrar").
**Seçenekler:**
· **A — Anında açıklama kalsın (bugünkü hal).** Kullanıcı ne görür: her seçimden sonra neden doğru/yanlış olduğunu. Ne kazanırsın: öğretici, iş yok. **Ne kaybedersin:** sınav ölçmekten çok öğretir; B varyantı "kopya" ile geçilebilir. Süre S · geri alınır ✅ · migration yok
· **B — Açıklamalar sınav sonunda, konu bazlı (belgelerdeki tasarım).** Kullanıcı ne görür: sınav boyunca yalnız soruları; sonunda konu konu açıklama. Ne kazanırsın: ölçüm temiz. **Ne kaybedersin:** anında öğrenme anı kaybolur; FE sonuç ekranı yeniden yazılır. Süre M · geri alınır ✅ · migration yok
· **C — Anında yalnız "doğru/yanlış", açıklama sonda.** Kullanıcı ne görür: renk/işaret anında, gerekçe sonda. Ne kazanırsın: ara yol. **Ne kaybedersin:** iki gösterim modu = daha karmaşık kod ve metin. Süre M · geri alınır ✅ · migration yok
**Karşılaştırma:** Sertifika "son tekrar" ise A savunulabilir; "yetkinlik kanıtı" ise B doğru. C ikisinin arası ama iki mod bakımı getirir.
**Benim önerim:** B — belgelerdeki üç ayrı karar da bu yönde ve 88 şıklık yeni içerik "sonda, konu bazlı" varsayımıyla yazıldı. Bu senin ürün kararın, önerime güvenme.
**Cevap vermezsen:** 88 şık taşıma turu (KARAR-46) gösterim biçimini belirsiz bırakarak ilerler; IC-04 aynı ekranda.
**CEVAP:**

---

