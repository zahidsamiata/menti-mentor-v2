### KARAR-35 · Canlı veritabanına salt-okuma izni  [OPERASYON KARARI] (5+ işi açar)
**Şu an ne var:** madde 30 · 33 · 118, söz S10 ve Y6 — hepsi *"canlı veritabanında kaç kayıt var"* sorusuna bağlı. Kuyrukta bu karta kapılı satır yok (madde 30 = K-16, kapısı KARAR-3: `docs/otonom/00-KUYRUK-KARAR-BEKLEYEN.md:28`); sayımların bir kısmı zaten senin listende (`docs/otonom/03-PO-ELLE-ISLER.md:153` #22 · `:239` #29). Yeni sayım ihtiyaçları: KARAR-111 adım (1) 60 dk altı blok · KARAR-128 §3b. Kural iki satırda belirsiz: `CLAUDE.md:245` "DB işleminde onay al" · `:252` "salt-okuma sorgu, PII maskeli". Bu sunucuda veritabanı bağlantı bilgisi de yok (`backend/.env` yok, yalnız `.env.example`).
**Sorun ne:** Beş iş, tek bir sayım yapılamadığı için aylardır kilitli.
**Neden sana soruyorum:** Canlı ve yerel aynı veritabanını paylaşıyor (⚠️ bu varsayım da bu turda **çelişkili** çıktı — bkz. `03-PO-ELLE-ISLER.md` ADIM 0); dokunma izni sende.
**Seçenekler:**
· **A — Salt-okuma `SELECT count(*)` izni ver.** Ne kazanırsın: beş iş **aynı anda** açılır; kişisel veri okunmaz, yalnız sayı döner. Ne kaybedersin: yanlış yazılmış bir sorgu teorik olarak yük bindirir (pratikte `count(*)` zararsız). Süre **S** · geri alınır ✅ · Kullanıcı ne görür: hiçbir şey · Migration: yok · ⚠️ izin tek başına yetmez, ajana salt-okuma bir bağlantı da verilmeli.
· **B — Sen kendi panelinden say, sayıyı belgeye yaz.** Ne kazanırsın: ajan veritabanına hiç dokunmaz. Ne kaybedersin: **iş sende**; her teyit turunda tekrar gerekir. Süre **S (senin için)** · geri alınır ✅ · Kullanıcı ne görür: hiçbir şey · Migration: yok.
· **C — Ertele.** Ne kaybedersin: madde 30/33/118 + S10 + Y6 **kilitli kalır**; sertifika ve öğrenme içeriği ilerlemez. Süre **0** · geri alınır ✅ · Kullanıcı ne görür: hiçbir şey · Migration: yok.
**Karşılaştırma:** A ile B aynı sonucu verir; fark işin kimde olduğudur. C hiçbir şey çözmez, yalnız erteler.
**Benim önerim:** **A** — `count(*)` kişisel veri döndürmez ve beş kalemi tek hamlede açar.
⚠️ **Ön koşul:** Hangi veritabanının canlı olduğu (`03-PO-ELLE-ISLER.md` ADIM 0) netleşmeden sayım anlamsızdır.
**Cevap vermezsen:** Beş kalem teyitsiz kapalı kalır; KARAR-111 ve KARAR-128'e EVET gelse bile ön sayım (60 dk altı blok · §3b) yapılamaz, merge bekler.
**İlgili kartlar:** KARAR-5 (öğrenme içeriğinin canlıda olup olmadığı sayımla görülür) · KARAR-25 (ikisinin de önkoşulu: hangi DB canlı, ADIM 0) · KARAR-26 (yedek tabloların canlıda varlığı sayımla teyit edilir) · KARAR-111 (60 dk altı blok sayımı) · KARAR-118 (ayrı deneme ortamı olsa sayım/deneme canlıdan ayrışır) · KARAR-128 (§3b listede olmayan değer sayımı)
**CEVAP:**

---

