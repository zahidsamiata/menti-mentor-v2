### KARAR-45 · Arketip adları: hangi metin hangi koda bağlanacak? (4 işi açar) [ÜRÜN KARARI]
> ⭐ **Kaynak:** içerik konseyi (`docs/raporlar/kesif/konsey-icerik-2026-09-21.md`), 2026-09-21.
> ⚠️ **ÇAPRAZ:** **KARAR-10** (OCEAN motoru) ile karıştırma — o *motor açılsın mı*, bu *hangi ad hangi koda bağlansın*. Motor açılmasa bile ad↔kod kararı **IC-14 · I-01 · I-15**'i açar.

**Şu an ne var:** Kullanıcı bugün mizaç testini bitirince "Sen bir **Öncü**sün!" gibi bir kart görüyor
(4 ad: Öncü · Ateşleyici · Yapı Taşı · Kâşif). Kanıt: `onboardingController.ts:53-105`, ekran `ResultStep.tsx:40-41`.
Ayrıca yazılmış ama hiç gösterilmeyen **8 yeni arketip kartı** var (Mimar · Ayna · Liman · Pusula / Rotacı · Kâşif ·
Denge Arayan · İz Açan) — `arketip-ve-yaklasim-icerigi-2026-09-03.md:153-261`.

· Kodda DÖRDÜNCÜ bir ad seti de var: kurum kayıt önizlemesi "Lider · İlham Veren · Denge Kurucusu · Analist" gösteriyor (`selfServeController.ts:52-55`) — hangi seçenek seçilirse seçilsin bu set de hizalanmalı. Yeni 8 ad 2026-08-28'de PO kararıyla seçildi (TAS); eşlemesi TAS'taki Big Five profillerinden türetilebilir (`TAS:71-107`). *(2026-09-23 EK BİLGİ katmanı buraya işlendi 2026-09-27; aslı: `docs/otonom/arsiv/01-KARARLAR-kart-gecmisi.md` §KARAR-45)*
**Sorun ne:** Üç ayrı yerde "**Kâşif**" var ve üçü farklı kişiyi anlatıyor: canlıdaki DISC kartında bir mizaç tipi
(`onboardingController.ts:96`), eski karar belgesinde bir **mentör** tipi (`03-psikometri-ve-algoritma.md:14`),
yeni içerikte bir **menti** tipi (`arketip-...md:53`). Üstelik yeni 8 adın hiçbirinin, sistemin içindeki kod
değerine (M1…m4 gibi teknik etiketler) karşılığı **hiçbir belgede yazılı değil**. Buna karar verilmeden yeni
kartlar bağlanamaz; bağlanırsa kullanıcı aynı adı iki ekranda iki farklı anlamda görür. Ayrıca yeni adlardan
**"İz Açan" senin onayını almamış** (belge `:263` bunu kendisi not etmiş).

**Neden sana soruyorum:** Kullanıcının kendisi hakkında okuduğu **kimlik etiketi**. Teknik değil; hangi adın
kalacağı, hangisinin emekli olacağı ürün kararı ve geri dönmesi zor (kullanıcı ekran görüntüsü paylaşıyor —
`onboardingController.ts:70` `shareHeadline`).

**Seçenekler:**
**A) Yeni 8 ad kazanır, canlıdaki 4 DISC adı emekli olur** · Kullanıcı: yeni kartları görür, eski adlar kaybolur ·
Kazanç: tek sistem, çakışma biter · Kayıp: bugün test çözmüş kullanıcıların bildiği ad değişir; "Kâşif" anlam
değiştirir (mizaç tipi → menti arketipi) · Süre: M · Geri alınır: evet (metin) · Migration: yok
**B) İkisi yan yana yaşar — farklı şeyler oldukları açıkça yazılır** · Kullanıcı: hem mizaç kartını hem arketip
kartını görür · Kazanç: hiçbir içerik çöpe gitmez · Kayıp: iki kavramı ayırt etmek kullanıcıya iş yükü;
"Kâşif" çakışması **sürer** (ad değişmezse kafa karışıklığı kalıcı) · Süre: M · Geri alınır: evet · Migration: yok
**C) Yeni 8 ad kazanır ama çakışan adlar yeniden adlandırılır** ("Kâşif" ve onaysız "İz Açan" değişir) ·
Kullanıcı: çakışmasız tek sistem · Kazanç: hem çakışma hem onay sorunu biter · Kayıp: 2 ad yeniden yazılır,
8 kartın ilgili cümleleri elden geçer (belgeye göre "İz Açan" 6 yerde geçiyor) · Süre: M+ · Geri alınır: evet · Migration: yok

**Karşılaştırma:** Eski 4 adın kullanıcı zihninde yer ettiğini düşünüyorsan B; tek ve temiz bir sistem istiyorsan
A; A'yı istiyorsun ama "Kâşif"in iki anlamı seni rahatsız ediyorsa C. A ve C arasındaki tek fark iki adın yeniden
yazılması.
**Benim önerim:** C — çakışma kalıcı kafa karışıklığı üretir ve "İz Açan" zaten onayını bekliyor; ikisini tek
turda kapatmak ucuz.
**Cevap vermezsen:** I-01 (yaklaşım metinleri), I-15 (arketip kartı), IC-14 (ham `M1` kodları) ve madde 139'un
menti varyantları **bağlanamaz** — dördü de bu eşlemeye bağlı. Kuyruk karşılığı: IC-14 + IC-10/AN-05'in arketip adı ayağı (`00-KUYRUK.md:128`); I-15 artık PS-A3 içinde.
**İlgili kartlar:** KARAR-10 (cevaplı; arketip kodlarını üreten motor) · KARAR-48 (sonuç kartındaki kimlik etiketi dili) · KARAR-54 (havuz kartında arketip adı/rozet) · KARAR-57 (sonuç kartı hangi testten doğar) · KARAR-63 (hangi arketip kodu atanır — eşik kuralı) · KARAR-64 (kartın genel adı: mizaç/karakter/kişilik)
**CEVAP:**

---

