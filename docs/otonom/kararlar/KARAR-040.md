### KARAR-40 · Eski `POST /api/meetings` ucu: düzeltilsin mi, karantinaya mı alınsın  [ÜRÜN/TEKNİK] (1 işi açar)
> ⭐ **Kaynak:** güvenlik konseyi (`docs/raporlar/kesif/konsey-guvenlik-kvkk-2026-09-21.md`), 2026-09-21.
**Şu an ne var:** İki görüşme yaratma yolu var. Canlı arayüz `POST /api/meetings/book` kullanıyor (kimliği **token'dan** alıyor, güvenli — `meetingController.ts:515`). Eski `POST /api/meetings` ise kimliği **gövdeden** alıyor ve sahiplik kontrolü yok (`:155-211`, GV-06) — ama oryantasyon kilidini **uygulayan tek yol** da bu (`:162`).
**Sorun ne:** Açık uç canlıda mount'lu ve her mentiye yetkili. Bunu düzeltmek mi kapatmak mı gerektiği bir mükerrer-kod kararı.
**Neden sana soruyorum:** Uç kapatmak **geri dönülmez** ve projenin SİLME PROTOKOLÜ'ne tabi (`K-13`, `E-4`); protokol senin ikinci onayını şart koşuyor.
**Seçenekler:**
· **A — Sahiplik kapısı ekle, uç kalsın.** Kullanıcı ne görür: kimse başkası adına randevu açamaz; başka hiçbir şey değişmez. Ne kazanırsın: **bugün güvenli**, hiçbir şey kaybolmaz, protokol gerekmez. **NE KAYBEDERSİN:** mükerrer kod kalır; iki yol arasındaki davranış farkı (oryantasyon kilidi yalnız eski yolda) sürer ve gelecekte yine karışır. Süre **S** · geri alınır ✅ · migration **yok**.
· **B — Karantinaya al (rota kapalı), oryantasyon kilidini `book`'a taşı.** Kullanıcı ne görür: tek bir randevu yolu; kilit artık gerçekten çalışıyor. Ne kazanırsın: mükerrerlik biter, kilit **doğru yolda** uygulanır (V-15'i de çözer). **NE KAYBEDERSİN:** iki iş birden; `K-13` protokolü gereği **niyet + ikame kanıtı + arşiv belgesi** yazılmalı; bir tur bekler ve bu arada açık uç açık kalır. Süre **M** · geri alınır ✅ (karantina 🟡) · migration **yok**.
· **C — Şimdilik dokunma, `K-13`/`E-4` turunu bekle.** Kullanıcı ne görür: hiçbir değişiklik. Ne kazanırsın: hiçbir şey. **NE KAYBEDERSİN:** ⛔ **açık uç canlıda açık kalır** — GV-06 bir çıkış blokeri; kabul edilemez. Süre **0** · geri alınır ✅ · migration **yok**.
**Karşılaştırma:** A açığı bugün kapatır ama teknik borcu bırakır. B doğru son hâldir ama yavaştır. C açığı açık bırakır.
**Benim önerim:** **A şimdi, B sonra** — sahiplik kapısı bugün eklensin (GV-06 kapansın), karantina kararı `K-13`/`E-4` turunda SİLME PROTOKOLÜ ile verilsin. Güvenlik düzeltmesi temizlik kararını **beklememeli**.
**Cevap vermezsen:** GV-06'nın **acil yaması yine de yapılabilir** (A yolu karardan bağımsızdır), ama mükerrerlik ve oryantasyon kilidinin yanlış yolda durması sürer; V-15 ve K-13 ile birlikte belirsiz kalır.
**CEVAP:**

---

