### KARAR-88 · Hakkımızda / İletişim sayfaları ve yüzen WhatsApp düğmesi — içerik ve iletişim kanalı (2 iş açar: Y-07, Y-11) [ÜRÜN KARARI · KURUMLARA GÖRÜNEN METİN]
> ⭐ Kaynak: otonom tur 2026-09-25; Y-07 ve Y-11 kuyrukta 🟢, ama ikisi de senden gelecek bilgiye bağlı.
**Şu an ne var:** Sitede "Hakkımızda" ve "İletişim" sayfası yok (`frontend/src/app/` altında böyle bir klasör yok). Yüzen WhatsApp düğmesi de yok; WhatsApp yalnız davet metni paylaşımında geçiyor (`frontend/src/app/(admin)/admin/invite/page.tsx`). Ekranda gösterilen tek iletişim adresi `destek@mentimentor.io` (`frontend/src/app/join/_JoinContent.tsx:65`, `onboarding/stk/pending-review/page.tsx:108,172`). E-postaların gönderen adresi ise `noreply@sivilkapasite.org` (`backend/src/config.ts`). İki farklı alan adı görünüyor. Ayrıca kurum bildirim e-postaları `destek@` kurulana kadar kapalı (03-PO-ELLE-ISLER).
**Sorun ne:** Siteye gelen biri kimin arkasında olduğunu ve nasıl ulaşacağını göremiyor. Kurumlar için güven eksikliği. Ben bu sayfaların metnini ve iletişim bilgisini uyduramam.
**Neden sana soruyorum:** Kurumlara görünen metin ve resmi iletişim kanalı senin kararın. Hangi adres, hangi numara, kimin adına konuşulduğu da senin kararın.
**Seçenekler:**
- **A) İki sayfa + yalnız e-posta (WhatsApp yok)** · Kullanıcı ne görür: altbilgide "Hakkımızda · İletişim" bağlantıları; iletişimde tek resmi e-posta · Kazanç: sade, telefon numarası yayımlanmaz · **Ne kaybedersin:** hızlı soru soracak kurum için anlık kanal yok · Süre S (metin gelince) · Geri alınır · Migration yok
- **B) İki sayfa + e-posta + yüzen WhatsApp düğmesi** · Kullanıcı ne görür: A'ya ek olarak her sayfanın köşesinde WhatsApp düğmesi · Kazanç: kurumlara anlık ulaşım · **Ne kaybedersin:** bir telefon numarası herkese açık olur, mesajlara cevap verecek biri gerekir; düğme mobilde ekran alanı kaplar · Süre S · Geri alınır · Migration yok
- **C) Şimdilik yok (erteleme)** · Kazanç: sıfır iş · **Ne kaybedersin:** güven eksikliği sürer; Y-07 ve Y-11 kilitli kalır
**Karşılaştırma:** A, iletişim yükünü e-postada tutar. B, kurumlarla hızlı temas ister ama bir sorumlu kişi gerektirir. C, içerik hazır olana kadar erteler.
**Benim önerim:** A — bugün gerçek kullanıcı az; anlık kanal açmak cevap yükü doğurur, e-posta yeterli. *(Bu senin ürün kararın, önerime güvenme.)*
**Senden gereken (A veya B seçersen):** (1) Hakkımızda için 3-5 cümle: kim, neden, kimin için. (2) Resmi iletişim e-postası: `destek@mentimentor.io` mı, başka bir adres mi? (3) B seçersen WhatsApp numarası.
**Cevap vermezsen:** Y-07 ve Y-11'in WhatsApp kısmı bekler. "Yukarı çık" düğmesi teknik bir iş, ondan bağımsız yapılır.
**CEVAP:**

---

