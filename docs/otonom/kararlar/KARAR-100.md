### KARAR-100 · `ProfileSource.SJT_ENRICHED` değeri ne olsun? (silme protokolü — gerekçe bulunamadı) (0 iş açar) [VERİ KARARI · SİLME PROTOKOLÜ]
> ⭐ Kaynak: AN-54 taraması (2026-09-26, `docs/raporlar/kesif/gerekcesiz-kalem-taramasi-2026-09-26.md`) — 694 şema kalemi tarandı, **2** kalemde gerekçe bulunamadı: biri zaten KARAR-76 (`Tenant.verifiedBy`), diğeri bu. **KARAR-76 ile aynı tür soru** — istersen ikisine aynı harfi yaz.
**Şu an ne var:** Kişilik profilinin "nereden geldiği" bilgisini tutan listede (`ProfileSource`) `SJT_ENRICHED` diye bir değer var. Kod bu değeri **hiç yazmıyor, hiç okumuyor**: senaryo testi (SJT) sonrası profil `HYBRID` olarak işaretleniyor (`backend/src/services/scoring.service.ts:104-105`). Değeri ekleyen commit (`de6be04`, toplu "sprint 8-11" commit'i) açıklama içermiyor, PR yok, belgelerde hiç geçmiyor.
**Sorun ne:** Ne işe yaradığı bilinmeyen bir değer silme protokolünün ilk adımında (niyet) takılı; her taramada yeniden "öksüz mü" diye çıkacak.
**Neden sana soruyorum:** Silme protokolü "gerekçe bulunamazsa SİLİNMEZ, PO'ya SORULUR" diyor; ayrıca bu değer ileride SJT'nin ayrı bir profil durumu olarak kullanılmak üzere planlanmış olabilir (KARAR-10 OCEAN/SJT motoru) — bunu yalnız sen bilirsin.
**Seçenekler:**
- **A) KALSIN** — SJT motoru (KARAR-10 aşamaları) açılınca ayrı durum olarak kullanılacak. · Kullanıcı ne görür: hiçbir şey · Kazanç: sıfır iş · **Ne kaybedersin:** gerekçesiz değer durmaya devam eder; bir sonraki taramada yine çıkar (kararı bu karta yazarak kapanır).
- **B) KARANTİNA** — değer yerinde kalır, koda "kullanılmıyor — KARAR-100" notu + arşiv belgesi; bir tur sorunsuz geçerse senin ikinci onayınla silinir. · Kazanç: silme protokolünün güvenli ara adımı · **Ne kaybedersin:** iki aşamalı iş · Süre S · geri alınır ✅ · karantina 🔵.
- **C) SİL** — arşivle + migration (enum'dan değer çıkarma). · Kazanç: şema temizlenir · **Ne kaybedersin:** PostgreSQL'de enum değeri çıkarmak zahmetli bir migration; SJT ayrı durum isterse yeniden eklenir · Süre M · geri alınır ⚠️ zor · migration VAR (🔵 + 🔴 ikinci onay).
**Karşılaştırma:** SJT motoru yakında açılacaksa A doğru; açılmayacaksa B güvenli yol; C temizler ama pahalı ve geri dönüşü zor.
**Benim önerim:** A — KARAR-10'un SJT aşamaları henüz açılmadı ve değer kimseye zarar vermiyor; kararın bu kartta yazılı olması tekrar tekrar sorulmasını bitirir. *(Veri kararın, önerime güvenme.)*
**Cevap vermezsen:** hiçbir iş kilitlenmez; değer her şema taramasında yeniden "gerekçesiz" çıkar.
**CEVAP:**

---

