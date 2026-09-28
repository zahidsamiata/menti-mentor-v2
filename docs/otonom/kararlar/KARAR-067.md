### KARAR-67 · Yönetici drill-down'ı kişinin serbest-metin endişe notuna inmeli mi?  (1 işi açar)  [ÜRÜN KARARI · KVKK]
**Şu an ne var:** Drill-down kişiye iniyor (`yonetici:80`); check-in notları (1000 karakter + endişe etiketi) sahiplik kontrolsüz okunuyor (G-3, `konsey-guvenlik-kvkk`). Kanıt: `persona-panel-gelisimi-2026-09-23.md:271-272` (C1).
**Sorun ne:** Yöneticinin "kim kaynıyor" görme hakkı ile mentinin özel notunun mahremiyeti çarpışıyor.
**Neden sana soruyorum:** Yetki + KVKK + kullanıcı güveni kararı.
**Seçenekler:**
· **A — Yönetici yalnız AGGREGATE + durum görür, serbest-metin notu göremez.** Ne kazanırsın: mahremiyet. **Ne kaybedersin:** yönetici bağlamı azalır. Süre M · geri alınır ✅ · migration yok
· **B — Görür ama LOGLU + kullanıcı bilgilendirilir.** Ne kazanırsın: aksiyon gücü. **Ne kaybedersin:** kırılgan not maruz kalır. Süre M · geri alınır ✅ (🔴 KVKK) · migration yok
· **C — Notlar zaten yalnız taraflar arası — yöneticiye hiç açılmaz.** Ne kazanırsın: en güvenli. **Ne kaybedersin:** yönetici müdahale edemez. Süre M · geri alınır ✅ · migration yok
**Karşılaştırma:** A dengeli; B güçlü ama riskli; C en korumacı ama aksiyonu keser.
**Benim önerim:** A. *(Ürün+KVKK kararın.)*
**Cevap vermezsen:** PL-A2, C1 çatışması + G-3 (kontrolsüz not okuma) açık kalır.
**CEVAP:**

---

