### KARAR-58 · Eski DISC ölçümü ↔ yeni Big Five senaryo bankası geçiş dönemi  (2+ işi açar)  [ÜRÜN KARARI · MIGRATION · GERİ DÖNÜLMEZ]
**Şu an ne var:** Canlıda 8 hardcoded DISC sorusu (`onboardingController.ts:109-190`) + seed'de 32 Likert DISC (`seed.ts:30-184`). Big Five 39 senaryo/117 şık bankası yazılı ama koda hiç geçmemiş; motor da ölü (I-13). Kanıt: `icerik-kalitesi-2026-09-23.md:223`.
**Sorun ne:** İki ölçüm sistemi çelişiyor (belge "ölçek yok, 3 şık, MOST_LEAST" ↔ kod "1-5 Likert / 4 şık"); banka canlıya çıkarsa eski DISC cevaplı kullanıcıların profili, iki ölçümün bir arada yürüyüp yürümeyeceği, eski `discVector`/`discType` alanlarının akıbeti belirsiz. Kuyrukta bu geçişi kapsayan satır yok (I-13 yalnız ölçek hatası, I-15 yalnız motor bağlama).
**Neden sana soruyorum:** Kullanıcının ölçüldüğü temel araç değişiyor (DISC→Big Five); geçmiş veri anlamı + göç yolu geri dönülmez, migration içerir.
**Seçenekler:**
· **A — Kesme geçiş: banka açılınca herkes yeni ölçümden geçer, eski DISC verisi arşivlenir.** Kullanıcı ne görür: yeni senaryo testi, eski mizaç sonucu sıfırlanır. Ne kazanırsın: tek tutarlı sistem, temiz başlangıç. **Ne kaybedersin:** eski cevaplayanlar yeniden test olur; eski `discVector` verisinin anlamı kaybolur; GERİ DÖNÜLMEZ migration. Süre L · geri alınır ⛔ · migration VAR
· **B — Paralel geçiş: eski DISC sonucu korunur, yeni banka yalnız yeni kullanıcılarda + isteyende çalışır.** Kullanıcı ne görür: eskiler eski sonucunu, yeniler yeni ölçümü. Ne kazanırsın: kimse veri kaybetmez, kademeli. **Ne kaybedersin:** iki ölçüm sistemi bir süre birlikte yaşar (bakım + tutarsızlık); eşleşme iki farklı temelden hesaplanır. Süre L · geri alınır ✅ (yeni sistem kapatılabilir) · migration VAR (ek alan)
· **C — Banka bu tur canlıya çıkmaz, karar ertelenir.** Ne kazanırsın: risk yok, iş yok. **Ne kaybedersin:** 39 senaryo/117 şık ölü kalır; tasarım kararı beklemede. Süre — · geri alınır ✅ · migration yok
**Karşılaştırma:** Temiz tek sisteme hızlı geçiş öncelikse ve eski veri kaybı kabul edilebilirse A; hiçbir kullanıcının verisini kaybetmemek öncelikse B; banka henüz olgun değilse C. ⚠️ A ve B canlı veriye geri dönülmez dokunur — migration/seed öncesi yedek ZORUNLU (CLAUDE.md).
**Benim önerim:** öneri YOK — bu geçmiş veri anlamını değiştiren geri dönülmez bir migration kararı; yalnız PO verir. En azından hangi eski alanın (discVector/discType) korunacağı ayrıca netleşmeli.
**Cevap vermezsen:** senaryo bankasının koda girişi (I-13, I-15) hangi geçiş yolunu kuracağını bilemez; banka ölü kalır.
**CEVAP:**

---

