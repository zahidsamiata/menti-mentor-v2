### KARAR-47 · Hukuki metin paketi — avukata tek seferde ne sorulacak? (5 kalem) [HUKUKİ · PO+AVUKAT]
> ⭐ **Kaynak:** içerik konseyi (`docs/raporlar/kesif/konsey-icerik-2026-09-21.md`), 2026-09-21.
> ⚠️ **ÇAPRAZ:** **KARAR-38** (sunucu ülkesi/aydınlatma metni) · **KARAR-3/KARAR-4** (sertifika kriz metni) · **F-02** (mesaj saklama süresi) · **F-03**/**GV-18** (rıza sürümü) hepsi aynı avukat paketine bağlı — **tek görüşmede** sorulmalı.

**Şu an ne var:** Ürünün üç hukuki sayfası (KVKK aydınlatma · gizlilik · kullanım koşulları) **kendi içinde
"bu metin taslaktır" diyor** (`kvkk/page.tsx:111` · `gizlilik/page.tsx:87` · `terms/page.tsx:75`), ama kayıt
ekranı kullanıcıya bu metinler için **zorunlu açık rıza** aldırıyor (`_RegisterContent.tsx:416-440`).

**Sorun ne:** Beş ayrı yerde, kodun gerçekten yaptığından **daha fazlasını vaat eden** ya da eksik kalan metin var:
① davet kartı *"Bilgileriniz KVKK uyumlu … ve güvendedir"* (`InvitationCard.tsx:142`) ve footer *"KVKK uyumlu"*
damgası (`page.tsx:61`) — metinler taslakken koşulsuz uyum beyanı · ② geri bildirim ekranı *"kimliğin
paylaşılmaz"* diyor (`MeetingFeedbackCard.tsx:176`) ama yönetici geri bildirimleri **ad-soyadla** listeliyor
(`feedbackLogController.ts:154-155`) · ③ "Sertifikalı Mentör" rozeti hiçbir yerde "bu mesleki bir yeterlilik
değildir" demiyor (kapsam: `frontend/src/app/**`, 6 terim TR+EN → **0 çekince**) · ④ landing *"Sonsuza kadar
ücretsiz"* diyor (`HeroSection.tsx:34,51`), koşullarda karşılığı yok · ⑤ 18 yaş beyanı ayrı kutu değil, KVKK
rızasının metnine gömülü (`_RegisterContent.tsx:164`) ve **yaş verisi hiç saklanmıyor** → beyanın ispatı yok
(`consentService.ts:59`).

**Neden sana soruyorum:** Hepsi hukuki sonucu olan metin. Ben avukat değilim; aşağıdaki hiçbir şey hukuki görüş
değildir ve **metin önerisi yazılmadı**.

**Seçenekler:**
**A) Beşini tek pakette avukata sor, cevap gelene kadar dokunma** · Kullanıcı: bugünkü metinleri görmeye devam
eder · Kazanç: tek seferde doğru metin, dağınık düzeltme olmaz · Kayıp: süresiz bekleme; "güvendedir" ve
"kimliğin paylaşılmaz" gibi **kodla çelişen** cümleler yayında kalır · Süre: — (iş yok; bekleme avukata bağlı) · Geri alınır: — · Migration: yok
**B) Kodla ÇELİŞENLERİ hemen düzelt (② ve ①), geri kalanı avukata bırak** · Kullanıcı: doğru kapsamı okur ·
Kazanç: yanlış beyan bugün kalkar, hukuki yorum gerektirenler beklemede kalır · Kayıp: iki kez metin turu olur ·
Süre: S + bekleme · Geri alınır: evet · Migration: yok
**C) Beşini de şimdi yumuşat, avukat gelince rafine et** · Kullanıcı: daha temkinli metinler görür ·
Kazanç: risk bugün düşer · Kayıp: pazarlama gücü azalır ("sonsuza kadar ücretsiz" ve "KVKK uyumlu" satış
cümleleri); avukat gelince üçüncü kez yazılır · Süre: M · Geri alınır: evet · Migration: yok

**Karşılaştırma:** ② ve ① kodun yaptığıyla doğrudan çelişiyor — bunlar hukuki yorum değil **olgu düzeltmesi**,
avukat beklemeye gerek yok. ③④⑤ gerçekten hukuki yorum istiyor. B bu ayrımı yapan tek seçenek.
**Benim önerim:** B — ama bu senin ürün/hukuk kararın, önerime güvenme.
**Cevap vermezsen:** 13 hukuki bulgunun hiçbiri hareket etmez; ②'deki çelişki (kimlik paylaşılmaz ↔ yönetici
ad-soyad görüyor) yayında kalır.
**İlgili kartlar:** KARAR-3 (kriz metni aynı avukat paketinde) · KARAR-4 (kriz destek metni aynı pakette) · KARAR-19 (KVKK silme/rıza kalemleri hukukçu onayı ister) · KARAR-31 (18 yaş/veli onayı ⑤ ile aynı soru) · KARAR-38 (tek avukat paketi) · KARAR-75 (yasal metinde veri sorumlusunun adı) · KARAR-91 (değerlendirme saklama süresi) · KARAR-96 (rıza metni avukatta) · KARAR-120 (hatırlatma e-postası rıza/metin teyidi) — birlikte cevaplanması önerilir: KARAR-47 + KARAR-38 + KARAR-31
**CEVAP:**

---

