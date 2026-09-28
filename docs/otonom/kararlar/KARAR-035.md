### KARAR-35 · Canlı veritabanına salt-okuma izni  [OPERASYON KARARI] (5+ işi açar)
**Şu an ne var:** madde 30 · 33 · 118, söz S10 ve Y6 — hepsi *"canlı veritabanında kaç kayıt var"* sorusuna bağlı ve bu soru **hiç sorulmamış**. Proje kuralı canlı veritabanına `SELECT` için bile onay istiyor.
**Sorun ne:** Beş iş, tek bir sayım yapılamadığı için aylardır kilitli.
**Neden sana soruyorum:** Canlı ve yerel aynı veritabanını paylaşıyor (⚠️ bu varsayım da bu turda **çelişkili** çıktı — bkz. `03-PO-ELLE-ISLER.md` ADIM 0); dokunma izni sende.
**Seçenekler:**
· **A — Salt-okuma `SELECT count(*)` izni ver.** Ne kazanırsın: beş iş **aynı anda** açılır; kişisel veri okunmaz, yalnız sayı döner. Ne kaybedersin: yanlış yazılmış bir sorgu teorik olarak yük bindirir (pratikte `count(*)` zararsız). Süre **S** · geri alınır ✅.
· **B — Sen kendi panelinden say, sayıyı belgeye yaz.** Ne kazanırsın: ajan veritabanına hiç dokunmaz. Ne kaybedersin: **iş sende**; her teyit turunda tekrar gerekir. Süre **S (senin için)** · geri alınır ✅.
· **C — Ertele.** Ne kaybedersin: madde 30/33/118 + S10 + Y6 **kilitli kalır**; sertifika ve öğrenme içeriği ilerlemez. Süre **0** · geri alınır ✅.
**Karşılaştırma:** A ile B aynı sonucu verir; fark işin kimde olduğudur. C hiçbir şey çözmez, yalnız erteler.
**Benim önerim:** **A** — `count(*)` kişisel veri döndürmez ve beş kalemi tek hamlede açar.
⚠️ **Ön koşul:** Hangi veritabanının canlı olduğu (`03-PO-ELLE-ISLER.md` ADIM 0) netleşmeden sayım anlamsızdır.
**Cevap vermezsen:** Beş kalem teyitsiz kapalı kalır.
**CEVAP:**

---

