### KARAR-74 · Kurum (tenant) kalıcı silme hakkı (G1-29) — (1 iş açar: AN-37) [ÜRÜN + KVKK KARARI]
> ⭐ Kaynak: CS bilanço denetimi §7 KARAR-C.
**Şu an ne var:** Platform admin bir kurumu yalnız "dondurabiliyor" (`platformRoutes.ts:53 /freeze`); kalıcı silme (DELETE) yok (grep: `hardDeleteTenant` yok).
**Sorun ne:** Bir kurum platformdan tümüyle silinmek isterse (KVKK "unutulma hakkı" kurumsal karşılığı) bunu yapacak yol yok; veriler süresiz dondurulmuş kalır.
**Neden sana soruyorum:** Kurumun tüm verisinin (üyeler, eşleşmeler, geçmiş) geri-dönülmez silinmesi hem KVKK yükümlülüğü hem geri-alınamaz bir işlem — ürün+hukuk kararı.
**Seçenekler:**
- **A) Kalıcı silme eklensin (anonimleştirme+silme):** · Kazanç: KVKK uyumu, gerçek "unutulma" · Kayıp: yanlış silme felaketi; yedek/onay katmanı şart · Süre M · Migration VAR · Geri alınamaz
- **B) Yalnız freeze kalsın + elle DB silme:** · Kazanç: 0 iş · Kayıp: KVKK talebinde manuel/riskli operasyon; iz bırakmaz · Süre 0
- **C) Freeze + zamanlı otomatik imha (X ay sonra):** · Kazanç: dondur→sil köprüsü · Kayıp: en çok iş, süre kararı gerekir · Süre L · Migration VAR
**Karşılaştırma:** A KVKK'yı tam karşılar ama en riskli işlem; B hukuki talepte açık verir; C otomatik ama süre eşiği yeni bir karar doğurur.
**Benim önerim:** A — ama çift-onay + tarihli yedek tablo zorunluluğuyla (CLAUDE.md silme protokolü). *(Ürün+hukuk kararın.)*
**Cevap vermezsen:** G1-29 öksüz kalır; ilk kurum silme talebinde hazırlıksız yakalanılır (AN-37 kilitli).
**CEVAP:**

