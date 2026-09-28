### KARAR-40 · Eski `POST /api/meetings` ucu: düzeltilsin mi, karantinaya mı alınsın  [ÜRÜN/TEKNİK] (1 işi açar)
> ⭐ **Kaynak:** güvenlik konseyi (`docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md`), 2026-09-21.
**Şu an ne var:** İki görüşme yaratma yolu var. Canlı arayüz `POST /api/meetings/book` kullanıyor (kimliği **token'dan** alıyor, güvenli — `backend/src/controllers/meetingController.ts:465-468`). Eski `POST /api/meetings` kimliği gövdeden alıyor ama GV-06 yamasıyla menti yalnız kendi adına talep açabiliyor (`:199-203`) — yani **A seçeneği fiilen uygulandı**. Oryantasyon kilidini **uygulayan tek yol** hâlâ bu eski uç (`:220`); canlı `book` yolunda kilit yok (`:465-634`, V-15).
**Sorun ne:** Güvenlik açığı kapandı; kalan sorun iki randevu yolunun farklı davranması: kilit yalnız ekranın kullanmadığı eski yolda. Eski ucu kapatmak mı tutmak mı gerektiği bir mükerrer-kod kararı.
**Neden sana soruyorum:** Uç kapatmak **geri dönülmez** ve projenin SİLME PROTOKOLÜ'ne tabi (`K-13`, `E-4`); protokol senin ikinci onayını şart koşuyor.
**Seçenekler:**
· **A — Sahiplik kapısı ekle, uç kalsın.** Kullanıcı ne görür: kimse başkası adına randevu açamaz; başka hiçbir şey değişmez. Ne kazanırsın: **bugün güvenli**, hiçbir şey kaybolmaz, protokol gerekmez. **NE KAYBEDERSİN:** mükerrer kod kalır; iki yol arasındaki davranış farkı (oryantasyon kilidi yalnız eski yolda) sürer ve gelecekte yine karışır. Süre **S** · geri alınır ✅ · migration **yok** · Durum: GV-06 ile uygulandı (`meetingController.ts:199-203`).
· **B — Karantinaya al (rota kapalı), oryantasyon kilidini `book`'a taşı.** Kullanıcı ne görür: tek bir randevu yolu; kilit artık gerçekten çalışıyor. Ne kazanırsın: mükerrerlik biter, kilit **doğru yolda** uygulanır (V-15'i de çözer). **NE KAYBEDERSİN:** iki iş birden; `K-13` protokolü gereği **niyet + ikame kanıtı + arşiv belgesi** yazılmalı; bir tur bekler. Süre **M** · geri alınır ✅ (karantina 🟡) · migration **yok**.
· **C — Şimdilik dokunma, `K-13`/`E-4` turunu bekle.** Kullanıcı ne görür: hiçbir değişiklik. Ne kazanırsın: hiçbir şey. **NE KAYBEDERSİN:** mükerrer kod ve kilidin yanlış yolda durması sürer (GV-06 yamayla kapandığı için artık güvenlik açığı değil; bugün C ile A aynı sonucu verir). Süre **0** · geri alınır ✅ · migration **yok**.
**Karşılaştırma:** A (bugünkü hâl) açığı kapattı ama teknik borcu bırakır. B doğru son hâldir ama yavaştır. C bugünkü hâli sürdürür, yani artık A ile aynı.
**Benim önerim:** **A şimdi, B sonra** — sahiplik kapısı eklendi (GV-06 kapandı); karantina kararı `K-13`/`E-4` turunda SİLME PROTOKOLÜ ile verilsin. Güvenlik düzeltmesi temizlik kararını **beklememeli**.
**Cevap vermezsen:** GV-06 yaması zaten yapıldı (A); ama mükerrerlik ve oryantasyon kilidinin yanlış yolda durması sürer; V-15 ve K-13 ile birlikte belirsiz kalır.
**İlgili kartlar:** KARAR-11 (cevaplı A: karantina → bir tur bekle → sil — B'nin yöntemi) · KARAR-92 (kilit bugün hiç tetiklenmiyor; kilidi `book`'a taşımanın (V-15) değeri buna bağlı) · KARAR-89 (kilidin okuduğu değerlendirme kutusu orada seçiliyor) — birlikte cevaplanması önerilir: KARAR-40 + KARAR-92
**CEVAP:**

---

