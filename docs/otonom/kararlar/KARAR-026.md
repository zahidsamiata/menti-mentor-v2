### KARAR-26 · İki yedek tablo (S26/S37) düşürülsün mü? (0 işi açar — DB)  [ÜRÜN KARARI · DB · GERİ DÖNÜLMEZ]
**Şu an ne var:** `MentorshipAgreement_yedek_20260830` (150 satır, 21 gündür) ve `CertificationOption_yedek_20260909` (20 satır, 11 gündür) canlı veritabanında duruyor; ikisi de güncel şemada yok. Kanıt: W §4.4, `00-KARAR-TAKIP.md:189`.
**Sorun ne:** Şemada olmayan bu tablolar, bir `migrate`/`db push` sırasında "fazlalık" görülüp silinmek istenebilir — yani koruma amaçlı yedek, koruduğu veriyi kaybetme riski taşıyor. Tek savunma bir insan kuralı (`--accept-data-loss` yasağı).
**Neden sana soruyorum:** DROP (tablo silme) geri dönülmez bir veri işlemidir; "artık gerek yok" (regresyon görülmedi) kararını yalnız sen verebilirsin.
**Seçenekler:**
**A) Şimdi DROP et (regresyon yok teyidiyle)** · Ne kazanırsın: drift + kazara-silme riski biter, şema temiz · Ne kaybedersin: yedek verisi kalıcı gider · Süre S · Migration/DB · **GERİ DÖNÜLMEZ**
**B) Beklet (regresyon penceresi dolana kadar)** · Ne kazanırsın: veri elde kalır (gerekirse geri dönülür) · Ne kaybedersin: drift/DROP riski sürer, yedekler birikmeye devam eder · Süre yok
**C) Kalıcı sakla — şemaya "arşiv tablo" olarak ekle** · Ne kazanırsın: hem korunur hem drift biter · Ne kaybedersin: şema kirlenir, migration eforu · Süre M · Migration
**Karşılaştırma:** İlgili işlerin regresyonsuz çalıştığından eminsen A (temiz). Emin değilsen B (veri elde kalsın). Bu yedekleri kalıcı kanıt olarak tutmak istiyorsan C.
**Benim önerim:** Bu senin veri kararın, önerime güvenme — regresyon teyitliyse A, değilse B. ⛔ Bulutta yapılamaz (canlı Neon gerekir), 03-PO C#10'da.
**Cevap vermezsen:** Drift + migrate DROP riski sürer.
**CEVAP:**

---

