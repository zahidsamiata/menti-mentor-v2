### KARAR-65 · "D mentör + S menti" yasağı menti tarafında da geçerli olsun mu?  (2 işi açar)  [ÜRÜN KARARI]
> ⚠️ KARAR-61 (formül) ile BİRLİKTE cevaplanmalı — yeni formül gelirse bu kural zaten kişilik-tabanlı V1/V2 kurallarına dönüşüyor.
**Şu an ne var:** Mentörün menti listesinde bu çift eleniyor (aday yoksa gevşiyor) — `matching.ts:265,269,348` (3. yedek kademede kapanıyor `:275`). Menti'nin mentör listesinde ise hiç uygulanmıyor — `matching.ts:423-592` (`rankMentorsForMenti` içinde bu kuralın çağrısı yok). Aynı çift bir yönde yasak, diğerinde serbest.
**Sorun ne:** Belgeler "hiç eşleştirilmez" diyor (`eslesme-uyum:60`); tasarım belgesi bu kuralı tamamen kaldırıyor (`TAS:468`). Kod ikisinin arasında, yöne göre farklı davranıyor.
**Neden sana soruyorum:** Kimin kimi görebileceği ürün kararı; ayrıca bu kural KARAR-61 (formül) ile birlikte kalkabilir.
**Seçenekler:**
· **A — Kural iki yönde de uygulanır.** Ne kazanırsın: tutarlı. **Ne kaybedersin:** menti listesi daralır. Süre S · geri alınır ✅ · migration yok · Kullanıcı ne görür: S tipi menti, D tipi mentörleri kendi listesinde artık görmez
· **B — Kural iki yönde de kaldırılır (TAS kararı).** Ne kazanırsın: tasarımla uyumlu. **Ne kaybedersin:** dayanağı zayıf da olsa bir koruma kalkar. Süre S · geri alınır ✅ · migration yok · Kullanıcı ne görür: D tipi mentör, bugün elenen S tipi mentileri de listesinde görür
· **C — Bugünkü hal, yeni formüle kadar.** Ne kazanırsın: iş yok. **Ne kaybedersin:** tutarsızlık sürer. Süre — · geri alınır ✅ · migration yok · Kullanıcı ne görür: değişiklik yok
**Karşılaştırma:** Yeni formül yakınsa C; değilse A ya da B'den biri.
**Benim önerim:** B — `TAS:468` gerekçeyle kaldırdı; ama KARAR-61 ile birlikte cevaplanmalı.
**Cevap vermezsen:** md.165 ve TAS kalem 5 bağlanamaz.
**İlgili kartlar:** KARAR-43 (bu kural iki yön asimetrisinin bir parçası) · KARAR-61 (yeni formülde kural V1/V2'ye dönüşüyor) — birlikte cevaplanması önerilir: KARAR-61 + KARAR-65
**CEVAP:**

---

