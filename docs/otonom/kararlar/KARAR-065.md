### KARAR-65 · "D mentör + S menti" yasağı menti tarafında da geçerli olsun mu?  (2 işi açar)  [ÜRÜN KARARI]
> ⚠️ KARAR-61 (formül) ile BİRLİKTE cevaplanmalı — yeni formül gelirse bu kural zaten kişilik-tabanlı V1/V2 kurallarına dönüşüyor.
**Şu an ne var:** Mentörün menti listesinde bu çift eleniyor (aday yoksa gevşiyor) — `matching.ts:200-216,283`. Menti'nin mentör listesinde ise hiç uygulanmıyor — `matching.ts:351-431`. Aynı çift bir yönde yasak, diğerinde serbest.
**Sorun ne:** Belgeler "hiç eşleştirilmez" diyor (`eslesme-uyum:60`); tasarım belgesi bu kuralı tamamen kaldırıyor (`TAS:468`). Kod ikisinin arasında, yöne göre farklı davranıyor.
**Neden sana soruyorum:** Kimin kimi görebileceği ürün kararı; ayrıca bu kural KARAR-61 (formül) ile birlikte kalkabilir.
**Seçenekler:**
· **A — Kural iki yönde de uygulanır.** Ne kazanırsın: tutarlı. **Ne kaybedersin:** menti listesi daralır. Süre S · geri alınır ✅ · migration yok
· **B — Kural iki yönde de kaldırılır (TAS kararı).** Ne kazanırsın: tasarımla uyumlu. **Ne kaybedersin:** dayanağı zayıf da olsa bir koruma kalkar. Süre S · geri alınır ✅ · migration yok
· **C — Bugünkü hal, yeni formüle kadar.** Ne kazanırsın: iş yok. **Ne kaybedersin:** tutarsızlık sürer. Süre — · geri alınır ✅ · migration yok
**Karşılaştırma:** Yeni formül yakınsa C; değilse A ya da B'den biri.
**Benim önerim:** B — `TAS:468` gerekçeyle kaldırdı; ama KARAR-61 ile birlikte cevaplanmalı.
**Cevap vermezsen:** md.165 ve TAS kalem 5 bağlanamaz.
**CEVAP:**

---

