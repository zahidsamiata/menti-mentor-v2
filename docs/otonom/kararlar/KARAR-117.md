### KARAR-117 · Mentörün emeği dönemsel olarak da takdir edilsin mi ("dönemin/yılın mentörü")? (0 iş kilitliyor) [ÜRÜN KARARI]
**Şu an ne var:** Mentör panelinde emeği anlatan tek bir takdir cümlesi (P-14) ve tek rozet var: "Sertifikalı". "Dönemin/yılın mentörü" gibi dönemsel bir takdir hiç yok. Rozet çeşitliliği ayrıca KARAR-103 madde 8'de soruluyor. Kanıt: `frontend/src/app/(dashboard)/mentor/page.tsx:205` (rozet) · `:238` (P-14 cümlesi) · kaynak `docs/kararlar/00-KARAR-TAKIP.md:595` (T10).
**Sorun ne:** Mentör persona çalışması "emeğim görünmüyor" diyor; görünmeyen emek, gönüllü mentörün bırakma riskini artırır.
**Neden sana soruyorum:** Kurum içinde kişileri öne çıkarmak (ve dolaylı olarak sıralamak) kullanıcıya görünen bir ürün kararı; kırgınlık ve rekabet etiği (KARAR-71) içeriyor.
**Seçenekler:**
- **A) Yok — bugünkü takdir cümlesi + KARAR-103 md.8 cevabına göre rozetler.** · Kullanıcı ne görür: değişiklik yok · Kazanç: sıralama kırgınlığı yok, iş yok · Kaybedersin: dönemsel tanınma yok; "emeğim görünmüyor" hissi sürebilir · Süre: — · Geri alınır: evet · Migration: yok
- **B) Kurum yöneticisi elle "dönemin mentörü" seçer; mentör panelinde rozet görünür.** · Kullanıcı ne görür: seçilen mentörün panelinde (isteğe bağlı kurum sayfasında) rozet · Kazanç: insan eliyle, adil algı; kurum teşekkür/tören yapabilir · Kaybedersin: yönetici yükü; seçilmeyenlerde kırgınlık · Süre: M · Geri alınır: evet · Migration: muhtemel (seçim kaydı)
- **C) Otomatik (görüşme sayısı + değerlendirme eşiği).** · Kullanıcı ne görür: eşiği geçen mentörde otomatik rozet · Kazanç: emeksiz, ölçeklenir · Kaybedersin: sayı oyununa teşvik; küçük kurumda kimin kaç görüşme yaptığı dolaylı görünür (k-anonimlik); değerlendirme verisi bugün zayıf (KARAR-44) · Süre: M · Geri alınır: evet · Migration: muhtemel
**Karşılaştırma:** İlk kurumlarda sade kalmak istiyorsan A; kurumlar teşekkür/tören kültürü istiyorsa B; mentör sayısı büyük ve ölçüt güvenilirse C.
**Benim önerim:** A (şimdilik) — gerçek kullanıcı yokken takdir düzeni tasarlamak erken; bu senin ürün kararın, önerime güvenme.
**Cevap vermezsen:** T10'un "dönemsel takdir" ayağı bekler; başka iş kilitlenmez.
**CEVAP:**


