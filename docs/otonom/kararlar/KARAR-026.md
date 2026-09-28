> ⚪ gereksiz olabilir — KARAR-36 (c) aynı iki yedek tabloyu (`MentorshipAgreement_yedek_20260830` · `CertificationOption_yedek_20260909`) aynı üç seçenekle (şemaya ekle / karantina-beklet / DROP) soruyor; biri cevaplanınca diğeri anlamsızlaşır; kapatma PO'nun
### KARAR-26 · İki yedek tablo (S26/S37) düşürülsün mü? (0 işi açar — DB)  [ÜRÜN KARARI · DB · GERİ DÖNÜLMEZ]
**Şu an ne var:** `MentorshipAgreement_yedek_20260830` (150 satır, 2026-08-30'dan beri) ve `CertificationOption_yedek_20260909` (20 satır, 2026-09-09'dan beri) canlı veritabanında duruyor; ikisi de güncel şemada yok. Kanıt: W §4.4, `docs/kararlar/00-KARAR-TAKIP.md:199` (S26) · `:210` (S37) · `docs/otonom/03-PO-ELLE-ISLER.md:98` (#10); canlıda varlığı bu sunucudan teyit edilemedi (DB erişimi yok).
**Sorun ne:** Şemada olmayan bu tablolar, bir `migrate`/`db push` sırasında "fazlalık" görülüp silinmek istenebilir — yani koruma amaçlı yedek, koruduğu veriyi kaybetme riski taşıyor. Tek savunma bir insan kuralı (`--accept-data-loss` yasağı).
**Neden sana soruyorum:** DROP (tablo silme) geri dönülmez bir veri işlemidir; "artık gerek yok" (regresyon görülmedi) kararını yalnız sen verebilirsin.
**Seçenekler:**
**A) Şimdi DROP et (regresyon yok teyidiyle)** · Ne kazanırsın: drift + kazara-silme riski biter, şema temiz · Ne kaybedersin: yedek verisi kalıcı gider · Kullanıcı ne görür: hiçbir şey · Süre S · Migration/DB · **GERİ DÖNÜLMEZ**
**B) Beklet (regresyon penceresi dolana kadar)** · Ne kazanırsın: veri elde kalır (gerekirse geri dönülür) · Ne kaybedersin: drift/DROP riski sürer, yedekler birikmeye devam eder · Kullanıcı ne görür: hiçbir şey · Süre yok · Geri alınır: evet (her an A ya da C'ye geçilir) · Migration yok
**C) Kalıcı sakla — şemaya "arşiv tablo" olarak ekle** · Ne kazanırsın: hem korunur hem drift biter · Ne kaybedersin: şema kirlenir, migration eforu · Kullanıcı ne görür: hiçbir şey · Süre M · Geri alınır: evet (şemadan çıkarılır; veri kaybı yok) · Migration
**Karşılaştırma:** İlgili işlerin regresyonsuz çalıştığından eminsen A (temiz). Emin değilsen B (veri elde kalsın). Bu yedekleri kalıcı kanıt olarak tutmak istiyorsan C.
**Benim önerim:** Bu senin veri kararın, önerime güvenme — regresyon teyitliyse A, değilse B. ⛔ Bulutta yapılamaz (canlı Neon gerekir), 03-PO C#10'da.
**Cevap vermezsen:** Drift + migrate DROP riski sürer.
**İlgili kartlar:** KARAR-25 (yedek stratejisi; bu tablolar geçici yedek görevinde) · KARAR-35 (tabloların canlıda varlığı salt-okuma sayımla teyit edilir) · KARAR-36 ((c) kalemi aynı iki tabloyu soruyor, mükerrer) · KARAR-118 (deneme ortamı yokken her migration yeni yedek tablo doğurur) — birlikte cevaplanması önerilir: KARAR-26 + KARAR-36
**CEVAP:**

---

