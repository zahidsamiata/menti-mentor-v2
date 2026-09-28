### KARAR-76 · `Tenant.verifiedBy` alanı ne olsun? (silme protokolü boşluğu) [VERİ KARARI · SİLME PROTOKOLÜ]
> ⭐ Kaynak: hayalet envanter turu (2026-09-19) — bu alan için "GEREKÇE BULUNAMADI" dendi; silme protokolü "gerekçe bulunamazsa PO'ya sorulur" der ama soru PO'ya HİÇ ulaşmadı (E.5a).
**Şu an ne var:** `Tenant.verifiedBy` alanı şemada duruyor (`backend/prisma/schema.prisma` — Tenant modeli; kardeş alan `verifiedAt`/`isVerified` belgeli), ama neden eklendiği HİÇBİR belgede yazılı değil (git log/commit/PR/docs tarandı, gerekçe yok). Bugün yazan tek yer önerilen AN-08 işidir (doğrulama controller'ında `verifiedBy: adminId` — henüz yazılmıyor).
**Sorun ne:** Gerekçesi bulunamayan bir alan silme protokolünün İLK adımında (niyet) takılı; ne silinebiliyor ne de "kalsın" kararı var. Her envanter turunda yeniden "öksüz mü" diye işaretleniyor.
**Neden sana soruyorum:** Silme protokolü "gerekçe bulunamazsa SİLİNMEZ, PO'ya SORULUR" diyor; bu o soru. Şema alanının kaderi = veri kararı.
**Seçenekler:**
- **A) KALSIN** — ileride kurum doğrulama audit'i için (AN-08 bu alana yazar). · Kullanıcı ne görür: hiçbir şey · Kazanç: sıfır iş, AN-08 doğrudan bağlanır · **Ne kaybedersin:** gerekçesiz alan şemada durur, her envanterde yeniden sorulur · Süre — · geri alınır ✅ · migration yok
- **B) KARANTİNA** — kod yerinde ama devre dışı + arşiv belgesi; 3 ay kimse aramazsa silinir. · Kazanç: güvenli ara adım (silme protokolünün önerdiği) · **Ne kaybedersin:** iki aşamalı iş, takip gerekir · Süre S · geri alınır ✅ · migration yok
- **C) SİL** — arşivle + migration. · Kazanç: şema temizlenir · **Ne kaybedersin:** geri dönüş migration gerektirir; aynı özellik istenirse yeniden yazılır (AN-08 iptal olur) · Süre M · geri alınır ⚠️ zor · migration VAR
**Karşılaştırma:** A en ucuz ama belirsizlik sürer; B silme protokolünün kendi önerdiği güvenli ara adım; C temizler ama geri-dönüşü pahalı ve AN-08'i iptal eder.
⚠️ C seçilirse kırmızı kural: yedek tablo + PO açık onayı şart (CLAUDE.md silme protokolü).
**Benim önerim:** B — silme protokolünün kendi önerdiği ara adım; ama AN-08 (audit yazımı) yakında yapılacaksa A daha ucuz. *(Veri kararın.)*
**Cevap vermezsen:** alan belirsiz kalır, her envanter turunda yeniden "öksüz" diye işaretlenir; AN-08 de kilitli kalır.
**CEVAP:**

---

