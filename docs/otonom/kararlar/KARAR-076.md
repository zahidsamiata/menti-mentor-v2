> ⚪ gereksiz olabilir — alanın niyeti kodda yazılı (backend commit `7365600` "kurum doğrulama sistemi" + `backend/prisma/schema.prisma:224` yorumu "Platform admin user ID (onay/red/düzeltme-iste son işlem izi)"); silme protokolünün "gerekçe bulunamadı" sorusu doğmuyor, kalan iş AN-08 bağlaması; kapatma PO'nun
### KARAR-76 · `Tenant.verifiedBy` alanı ne olsun? (silme protokolü boşluğu) [VERİ KARARI · SİLME PROTOKOLÜ]
> ⭐ Kaynak: hayalet envanter turu (2026-09-19) — bu alan için "GEREKÇE BULUNAMADI" dendi; silme protokolü "gerekçe bulunamazsa PO'ya sorulur" der ama soru PO'ya HİÇ ulaşmadı (E.5a).
**Şu an ne var:** `Tenant.verifiedBy` alanı şemada duruyor (`backend/prisma/schema.prisma:224`). Niyet kodda yazılı: alan kurum doğrulama sistemiyle birlikte eklendi (backend commit `7365600`, 2026-07-12, "kurum doğrulama sistemi … platform admin approve/reject"; şema yorumu "Platform admin user ID") ve `dcaf678` (2026-08-19) yorumu "onay/red/düzeltme-iste son işlem izi" diye genişletti. Ama hiçbir kod yazmıyor: onay/red/düzeltme yolları yalnız `verifiedAt` yazıyor (`backend/src/controllers/platformController.ts:340,367,412` · `adminSettingsController.ts:451,469`). Bunu bağlayacak iş AN-08 (`verifiedBy: adminId`).
**Sorun ne:** Alanın niyeti (kurumu kimin onayladığı izi) var ama hiç doldurulmuyor; ne bağlanmış ne de "kalsın/sil" kararı var. Her envanter turunda yeniden "öksüz mü" diye işaretleniyor.
**Neden sana soruyorum:** Silme protokolü "gerekçe bulunamazsa SİLİNMEZ, PO'ya SORULUR" diyor; bu o soru. Şema alanının kaderi = veri kararı.
**Seçenekler:**
- **A) KALSIN** — ileride kurum doğrulama audit'i için (AN-08 bu alana yazar). · Kullanıcı ne görür: hiçbir şey · Kazanç: sıfır iş, AN-08 doğrudan bağlanır · **Ne kaybedersin:** gerekçesiz alan şemada durur, her envanterde yeniden sorulur · Süre — · geri alınır ✅ · migration yok
- **B) KARANTİNA** — kod yerinde ama devre dışı + arşiv belgesi; 3 ay kimse aramazsa silinir. · Kazanç: güvenli ara adım (silme protokolünün önerdiği) · Kullanıcı ne görür: hiçbir şey · **Ne kaybedersin:** iki aşamalı iş, takip gerekir; kurumu kimin onayladığı izi yine tutulmaz · Süre S · geri alınır ✅ · migration yok
- **C) SİL** — arşivle + migration. · Kullanıcı ne görür: hiçbir şey · Kazanç: şema temizlenir · **Ne kaybedersin:** geri dönüş migration gerektirir; aynı özellik istenirse yeniden yazılır (AN-08 iptal olur) · Süre M · geri alınır ⚠️ zor · migration VAR
**Karşılaştırma:** A en ucuz ama belirsizlik sürer; B silme protokolünün kendi önerdiği güvenli ara adım; C temizler ama geri-dönüşü pahalı ve AN-08'i iptal eder.
⚠️ C seçilirse kırmızı kural: yedek tablo + PO açık onayı şart (CLAUDE.md silme protokolü).
**Benim önerim:** B — silme protokolünün kendi önerdiği ara adım; ama AN-08 (audit yazımı) yakında yapılacaksa A daha ucuz. *(Veri kararın.)*
**Cevap vermezsen:** alan belirsiz kalır, her envanter turunda yeniden "öksüz" diye işaretlenir; AN-08 de kilitli kalır.
**İlgili kartlar:** KARAR-100 (aynı tür "gerekçesiz şema kalemi" sorusu; bu kartta niyet sonradan bulundu)
**CEVAP:**

---

