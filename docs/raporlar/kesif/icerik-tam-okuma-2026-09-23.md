> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-23 (📸 fotoğraf tarihi) · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)
> ⚠️ Bu belge kalemlerin TANIMINI tutar, DURUMUNU TUTMAZ. Buradaki işaretler 2026-09-23 durumudur. Güncel durum: `docs/otonom/00-KUYRUK.md` (köprü: `docs/kararlar/00-KART-INDEKSI.md`)

# İçerik Külliyatı: Tam Okuma (Karar Zincirleri, Sayı Mutabakatı, 88 Şık Karşılaştırması)

> 📸 **DONDURULMUŞ, 2026-09-23 fotoğrafı.** Bu bir salt-okuma keşif raporudur. Kod, belge ve DB değişmedi. Numara verilmedi (`TO-??`, `KARAR-??`).
> Tür: 🟩 PLANLA · Dal: `otonom/CL-icerik-tam-okuma-20260923` · Öncül: `icerik-mutabakati-2026-09-23.md` (dal `otonom/CI-icerik-mutabakati-20260923`, main'de değil).
> Bu tur, mutabakat turunun **okuyamadığını** yazdığı dilimleri kapatır (mutabakat §8 SINIRLAR, madde 1, 2, 3, 7, 8, 10).
>
> **Kısaltmalar** mutabakatla aynıdır:
> - `TAS` = `docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md`
> - `PSI` = `docs/kararlar/konu/03-psikometri-ve-algoritma.md`
> - `ARK` / `MEN` / `BANKA` / `KOD` / `FAZ6` = `docs/raporlar/icerik/` altındaki 2026-09-03 belgeleri
> - `O1` / `O2` / `O3` = sertifika oturum belgeleri (2026-09-08)
> - `B01…B05` = `docs/raporlar/icerik/bolumler/`
> - `ARŞ` = `docs/arsiv/icerik/`
> - `KT` = `docs/kararlar/00-KARAR-TAKIP.md`
> - `TAM` = backend `prisma/senaryo-bankasi-tam.md`
> - `SEED` = backend `prisma/seed-certification.ts`
> - `SEED-LJ` = backend `prisma/seed-learning-journey.ts`
> - `BE` = backend `zahidsamiata/menti-mentor` (HEAD `dd7c48c`)
> - `FE` = çatı `frontend/src`
>
> Etiketler:
> - `[MUT Ç-n]` = mutabakat raporu bu bulguyu zaten verdi
> - `[KONSEY]` = `konsey-icerik-2026-09-21.md` bu bulguyu zaten verdi
> - `[YENİ]` = bu turda ilk kez çıktı

---

## 0. ⭐ ÖNCE OKU — en kritik 3 bulgu

1. **Konseyin "Gizlilik B'de puan anlamı ters dönmüş" iddiası abartılı. Gerçek ters dönme başka bir senaryoda. Canlıda en riskli fark ise Kriz'de.**
   - **Gizlilik B:** Üç ayrı alt-ajan bağımsız olarak aynı sonuca vardı.
     - Seed T09_B'deki 2 puanlık "sessiz kalır + teşvik ederim" şıkkı, O1 3-B'de 3 puanlık şıkkın parçası oldu (`SEED:229-232` ↔ `O1:159-179`).
     - Bu bir kademelik kaymadır. Hiçbir şık iyiden kötüye geçmedi. Geçme/kalma sonucu da değişmiyor, çünkü kod her konuda `>= 2` istiyor.
     - "Ters" kelimesi O1'in kendi "C(2) ters yön vakası" terimidir (`O1:316`). Anlamı: "2 bu kez aşağı değil yukarı gitti."
   - **Kültürel B'de gerçek ters dönme var** (seed T08_B ↔ O3 10-B, yakın ikiz sahne):
     - "Konuyu değiştiririm" seed'de 1 puan, O3'te 3 puan.
     - "Kendi görüşümü belirtirim" seed'de 2 puan (geçer), O3'te 1 puan (konu geçilmez).
     - "Merakla anlamaya çalışırım" seed'de 3 puan, O3'te 2 puan (`SEED:207-210` ↔ `O3:192-206`).
   - **Kriz:** Canlı seed'de T10_A'daki "dinlerim, yanında olduğumu söylerim" şıkkı 2 puan alıyor ve bugün geçiyor (`SEED:242`, `certification.service.ts:72-74`). O1 4B'de aynı davranış 1 puan alıyor ve eliyor (`O1:228-230`). `[YENİ]`
2. **Kullanıcının mizaç vektörünü aynı alana üç ayrı yol, üç farklı formülle yazıyor.** Mutabakatın KARAR-??-B kartındaki "kullanıcı bugün 8 soruluk DISC testi çözüyor" cümlesi eksik.
   - **Yol 1:** `/disc-test` ekranı `questionService` → `discVectorService.recalcDiscVector` yolunu kullanıyor. Bu yolda 32 Likert soru var, 12 DEEPENING sorusunun tamamı açılıyor, cevapsız boyut 0.25 sayılıyor, güven dinamik hesaplanıyor.
   - **Yol 2:** Dashboard'daki `DailyQuestionWidget` / `DiscConfidenceWidget` `adaptiveTestEngine`'i kullanıyor. Bu yolda yalnız baskın boyutun DEEPENING soruları açılıyor, cevapsız boyut 0.5 sayılıyor, güven /20 ile hesaplanıyor, `discType`'ı da yalnız bu yol yazıyor.
   - **Yol 3:** Onboarding'deki 8 soruluk seçim sayımı.
   - B05 "canlı akış tek, tutarsızlık izole" diyor. Kod bunu doğrulamıyor.
   - Kanıt: `FE hooks/useDiscTest.ts:101-160` · `FE lib/api/discTest.ts:23-44` · `BE discVectorService.ts:95-155,122-127` · `BE adaptiveTestEngine.ts:80,207-209,231` · `FE components/organisms/DailyQuestionWidget.tsx:19,44`. `[YENİ]`
3. **Kullanıcıya yanlış bilgi veriliyor ve belgeler "yok" dediği davranışları kod zaten yapıyor. Belge ile kod birbirini görmüyor.**
   - **Yanlış bilgi:** Sertifika sonuç ekranı "Ceza veya bekleme yok" diyor (`FE mentor/certification/page.tsx:215`). Backend ise 2 başarısız denemeden sonra 24 saat bekletiyor (`certification.service.ts:30-32`).
   - **Geri bildirim zamanı:** FAZ6 ve MEN, sertifika geri bildiriminin "sınav sonunda" verilmesini istiyor (`FAZ6:360`, `MEN:204-214`). Kod her seçimden sonra anında açıklama gösteriyor (`certification.service.ts:444-465`, `FE page.tsx:102-129`).
   - **Hatalı konu hedefleme:** TAS, FAZ6 ve KT md.157 "bugün yok" diyor. `certWrongTopics` yanlış konuları en az 2026-08-15'ten beri öne alıyor (`certification.service.ts:309-315`, `sjtScoringController.ts:160-171`).
   - **Sınav örneklemi:** Belgelere göre sınav 8 senaryo çekiyor. Kod açık konuların tamamını soruyor (`certification.service.ts:288-316`).
   - `[YENİ]` (bekleme metni için konseydeki `failReason` bulgusuyla komşu)

---

## 1. Kapsam beyanı

| Dilim | Satır | Alt-ajan | TAM okundu mu |
|---|---|---|---|
| TAS 1-260 | 260 | 1 | evet |
| TAS 261-520 | 260 | 1 | evet |
| TAS 521-774 | 254 | 1 | evet |
| ARK | 473 | 1 | evet |
| MEN | 433 | 1 | evet |
| BANKA + KOD + TAM (backend) | 407 + 149 + 363 | 1 | evet |
| FAZ6 1-340 + SEED-LJ | 340 + 543 | 1 | evet |
| FAZ6 341-674 | 334 | 1 | evet |
| sorular-po-inceleme + tam-soru-dökümü + eşleşme-uyum + 00-INDEKS | 405 + 158 + 91 + 65 | 1 | evet |
| B01 + B02 + B05 | 206 + 109 + 213 | 1 | evet |
| B03 + B04 | 363 + 262 | 1 | evet |
| ARŞ (6 dosya) + PSI + `docs/gelen` geçmişi | 409 + 64 | 1 | evet |
| KT md.138-169 (satır 300-331, 32 satır, ~24,6 KB) | 32 | 1 | evet |
| Sertifika Konu 1-4: O1 + SEED + FAZ6 §8 + ARŞ | 408 + 329 | 1 | evet (FAZ6 §8'in ilgili kısmı) |
| Sertifika Konu 5-7: O2 + SEED + FAZ6 §8 | 397 + 329 | 1 | evet |
| Sertifika Konu 8-11: O3 + SEED + FAZ6 §8 + B03 + ARŞ | 529 + 329 | 1 | evet |
| Frontend terim taraması | 194 FE + 120 BE dosyası | 1 | evet (desenler §5'te) |
| Önceki turların kapsam çıkarımı (mutabakat 597 + konsey 737) | 1.334 | 1 | evet |

- **Toplam:** 17 içerik belgesi (5.342 satır) + TAS 774 + ARŞ 409 + PSI 64 + KT 32 satır = **6.621 belge satırı**. Ayrıca 1.235 satır kod/seed okundu. **18 paralel alt-ajan** çalıştı.
- **TAM KAPSAM: EVET.** Görevde listelenen 5 kalemin hepsi son satırına kadar okundu. Ana ajan hiçbir belgeyi kendisi okumadı, yalnız özetleri birleştirdi.
- **`docs/gelen/`:** Klasör hiç commit edilmedi. `.gitignore:56-57` "PO'nun gelen kutusu" satırı onu git dışında tutuyor. Taşıma iki commit'le yapıldı:
  - `da05f6e`: ARK, FAZ6 ve MEN taşındı.
  - `988d3c6`: BANKA taşındı.
  - Günlük (`oturum-2026-09.md:186-191,377-380`) "içerik değişmedi" diyor.
  - Git'e hiç girmemiş bir artık var: `Yeni Metin Belgesi.txt` (28.599 bayt, `KT:817`). İçeriği **doğrulanamadı**, çünkü ne git'te ne bulut dosya sisteminde. Karar kaybı olup olmadığı bu yüzden bilinemiyor.

**Önceki turlardan tekrar EDİLMEYENLER** (yalnız atıf verilir):
- Mutabakat Ç-1…Ç-16: arketip 4 set, sertifika 3 kuşak, formül 60/40 ↔ 45/30/25, veto, çekirdek 12↔15, yanıt formatı, atama eşikleri, kart sırası, geçme kuralı, "Konu 9" kayması, okul-gönüllülük elemesi, 7/8/10 aşama, terim kartı, mentor/mentör seed yazımı, olmayan 3 kardeş belge, 📸 belgelerdeki bayat kod iddiaları. Mutabakatın KARAR-??-A…D kartları ve IC-??-1…10 satırları da bunlara dahil.
- Konsey: KARAR-45, KARAR-46, IC-01…14, 20↔22 yapısal fark (17 senaryo seed'de yok, 15 seed senaryosu elendi).
- `icerik-kalitesi-2026-09-23.md` **yok** (86 uzak dal tarandı). En yakın dosya `konsey-icerik-kalitesi-E-arastirma-brifleri-2026-09-23.md`, yalnız `claude/sweet-brown-8dqgim` dalında. Yalnız E bölümünü (8 araştırma brifi) kapsıyor. Bu rapor onunla çakışmıyor.

---

## 2. ⭐ KARAR ZİNCİRLERİ (A)

Her zincir kronolojik sıradadır ve son halkası **"kodda"** diye biter. Belge ile kod çeliştiğinde hüküm verilmedi; ikisi de yazıldı.

### Z-1 · Arketip adları `[MUT Ç-1][KONSEY]` + ek
- **2026-08-02**, `PSI:14-15`: Mimar·Kâşif·Çoban·Komutan / İnşaatçı·Gezgin·Tohum·Atılgan. Gerekçe yok, yalnız "16 hücre yönetilebilir".
- **2026-08-28**, `TAS:71-74`: METAFOR seti (Mimar·Ayna·Liman·Pusula / Rotacı·Kâşif·Denge Arayan·İz Açan). Gerekçe yalnız "PO kararı". "İz Açan" kesinleşmedi (`TAS:112`), nedeni yazılmamış.
- **2026-09-03**, `ARK:50-53`: aynı set tekrarlandı, gerekçe yok.
- **Kodda:** 8 adın hiçbiri geçmiyor. Yalnız M1-M4 / m1-m4 kodları var (`disc-to-ocean.adapter.ts:27-43`). "Kâşif" 5 FE dosyasında DISC-C anlamında kullanılıyor (`DiscBadge.tsx:16`, `GameSection.tsx:20,100`, `EngineSection.tsx:10`, `types/onboarding.ts:21`).
- **YENİ:** Sıra varsayımıyla eşlenince TAS profili "Ayna = açıklık + sıcaklık (A)" diyor. M2'nin kod koşulu ise `o && e`, yani **dışadönüklük** (`TAS:84-102` ↔ `adapter:30-41`). Menti tarafında her kodun belgede olmayan ek koşulu var:
  - m1: `o<MID`
  - m2: `c<LOW`
  - m3: `a>MID`
  - m4: O hiç kontrol edilmiyor

### Z-2 · Eşleşme formülü `[MUT Ç-3]` + ek
- **2026-08-02**, `PSI:19`: sektör 0.60 + mizaç 0.40. Gerekçe yok.
- **2026-08-26**, `eslesme-uyum:76-82`: 60/40 PO'ya soruldu. **PO notu boş kaldı ve belge donduruldu** `[YENİ]`.
- **2026-08-28**, `TAS:426-432,494`: %45 / %30 / %25 + filtre + kalite çarpanı. Gerekçe: Dyrenforth 2010.
- **2026-09-03**:
  - `ARK:57-63`: aynı, gerekçesiz ("tartışılmaz" damgalı).
  - `BANKA:48`: kişilik ağırlığı "%12 → %25" (≥4 sinyal). Gerekçe yok.
- **2026-09-08**, `KT md.165`: "Ağırlık modeli 2→3 bileşen, 8 kod noktası". ⬜ AÇIK. **Gerekçe yazılmamış, kuyrukta satırı da YOK** `[YENİ]`.
- **Kodda:** 0.6 / 0.4 (`scoring.config.ts:48`, `scoring.ts:89-90`). Kurum ayarı (`algorithmTuner`, `scoring.ts:99-106`) ve formül dışı +10 etkileşim bonusu (`matching.ts:287-294`) da var.
- **Kişilik ağırlığı için üç değer var:** 0.40 (kod) · %25 (TAS/ARK) · %12 (BANKA'daki "eski" değer).

### Z-3 · Veto / anti-match `[MUT Ç-4]` + ek
- **2026-08-02**, `PSI:24-26`: M4-m3 mutlak veto. M1-m4 yalnız "çatışma". D-mentör / S-menti bloklu.
- **2026-08-26**, `eslesme-uyum:60` ve `B05:135-138`: D-S "hiç eşleştirilmez". Gerekçe yok.
- **2026-08-28**, `TAS:460-468`: V1/V2 (Big Five eşikleri 30/35/30, sayılar gerekçesiz). "D-S vetosu kaldırıldı."
- **Kodda:**
  - D-S canlı (`scoring.ts:20-22`, `matching.ts:283`) ve 2. fallback'te gevşiyor (`matching.ts:210`).
  - `BLOCKED_PAIRS` M1-m4'ü de TAM blokluyor (`scoring.config.ts:33-36`), oysa PSI yalnız "çatışma" diyor. Bu çiftler yalnız SJT yığınında kullanılıyor.
  - **YENİ:** Anti-match yalnız mentör→menti sıralamasında uygulanıyor. `rankMentorsForMenti` (`matching.ts:351-431`) hiç uygulamıyor, yani menti D-S çiftini görebiliyor.

### Z-4 · Kalite çarpanı `[YENİ]`
- **2026-08-02**, PSI kendi içinde iki aralık veriyor: `PSI:19` "0.7–1.15" ve `PSI:55` "±%20, son 10 görüşme, 3'ten az görüşmede 1.0".
- **2026-08-28**, `TAS:432`: 0.8-1.2. Gerekçe yok.
- **2026-08-29**, `TAS:35,483-487`: "çift çarpım" iddiası çürütüldü.
- **Kodda iki ayrı yığın var:**
  - Canlı eşleştirme `scoring.ts:118-140`: 0.8-1.2.
  - SJT yolu `scoring.service.ts:14-15`: 0.7-1.15.

### Z-5 · Ölçüm yanıt formatı ve kanal `[MUT Ç-6]` + ek
- **2026-08-02**, `PSI:31-35`: Likert reddedildi. Format SINGLE / MOST_LEAST, "en az" seçimi −0.5.
- **2026-08-15**, `ARŞ disc:12-14`: canlıda 20 Likert DISC sorusu var (seed-questions.ts).
- **2026-08-23**: seed-questions.ts silindi (`5745e0f`).
- **2026-08-26**:
  - `B01`: kodda 32 Likert soru (20 CORE + 12 DEEP), hiç ters kodlanmış madde yok. Gerekçe yok.
  - `B02`: 3 SJT sorusu.
- **2026-08-28**, `TAS:118-126`: senaryo + 4 şık + "ikinci yakın". Gerekçe yok.
- **2026-09-03**, `BANKA:38-42`: 3 şık + en çok / en az.
- **Kodda:** Üç yazma yolu var (bkz. §0-2). SJT puanlayıcıyı (`sjt-scorer.ts:67-72`) yalnız `/api/scoring/compute-profile` çağırıyor, bu ucun **FE çağıranı yok**.
- **YENİ, mutabakat Ç-6'ya düzeltme:** Mutabakat "TAS:125 … 3 şık" diyor. TAS:124 aslında **4 şık** diyor. "3 şık" BANKA'ya ait.

### Z-6 · Çekirdek senaryo sayısı `[MUT Ç-5]` + ek
- **2026-08-28**:
  - `TAS:159-163`: 12, herkese aynı, "ŞART".
  - `TAS:663`: Bölüm 11 akışı da 12 diyor.
- **2026-09-04**, `TAS:586`: "15 senaryo".
- **2026-09-03**:
  - `BANKA:14,45`: 5 sabit + 10 adaptif = 15.
  - `ARK:134`: havuz 35. `ARK:16` ise **39** diyor, belge kendi içinde çelişiyor.
- **Kodda:** Senaryo bankası yok. `triggersOn` kullanımı 0.
- **YENİ:** TAS denge tablosu 24 sinyal diyor (`TAS:323-327`). Senaryo etiketlerinden kendi sayımımız 27 (açıklık 7, uyumluluk 6). 8 etiket Big Five dışında (temkin, erteleme, çatışmadan kaçınma vb.) ve OCEAN'a çevrimleri tanımsız.

### Z-7 · Arketip atama kuralı `[MUT Ç-7]` + ek
- **2026-08-02**, `PSI:36`: 40-60 kararsızlık bandı.
- **2026-09-03**:
  - `ARK:83-102`: P3 kararı, fark 10 puandan azsa "şimdilik" dili. Gerekçe var ("anlatım eşiği, istatistiksel değil").
  - `KT md.138`: aynı karar 🔵.
- **Kodda:** Mutlak eşik 60/55/45 (`scoring.config.ts:31`), varsayılan M1/m1. Fark kuralı, "şimdilik" dalı ve ikincil arketip yok.
- **YENİ:**
  - "4 şimdilik varyantı" (`ARK:7`) aslında 2 "şimdilik" + 2 çoklu-arketip varyantı. "İki taraf" / "üç taraf yakın" eşiği tanımlanmamış ve sınırlar örtüşüyor (`ARK:277-293`).
  - Baskın + ikincil gösterim (`TAS:76-78`, `ARK:55`) şemadaki tek `archetype` alanıyla (`schema.prisma:997`) çelişiyor.

### Z-8 · Ekran sırası: kart mı önce, üç soru mu? `[MUT Ç-8]` + ek
- **2026-08-29**: kart önce.
- **2026-09-04**, `TAS:586-588`: kart sona alındı. Gerekçe: S2 bias.
- **2026-09-03/04**: `ARK:116-126` ve `KT md.140-141` aynı yönde.
- **Kodda:** Kart hâlâ önce geliyor (`_OnboardingContent.tsx:223-230`). Backend yorumu da "arketip kartından SONRA toplanır" diyor (`onboardingController.ts:365`).
- **YENİ:**
  - `TAS:663-665` (Bölüm 11 akışı) düzeltilmemiş: "çekirdek → kart → eşleşme". Üç soru hiç anılmıyor.
  - "Son üç soru. Sonra karakter kartın hazır." cümlesi (`ARK:124`) kodda 0. Kod "Son Birkaç Soru" diyor.

### Z-9 · Sertifika geçme kuralı `[MUT Ç-9]` + ek
- **2026-08-02**, `PSI:49-50`: baraj %65, 12 puan.
- **2026-08-15 / 08-26**, `TAM:12`, `B03:45-52`: red-line konuda "SADECE 3".
- **2026-09-03**, `FAZ6:360,663`: tek doğru şık (ikili puanlama), %80. "Red-line tam puan, mevcut kodda var" deniyor.
- **2026-09-04**: PO kararı, `>= 2`.
- **2026-09-08**, O-serisi 0-3 puanlama: 2 "GEÇER", 1 "ELER".
- **2026-09-09**, kod `43d15dc`: `>= 2` (`certification.service.ts:72-74`).
- **YENİ:**
  - `certification.service.ts:92`'deki `CertFailReason` yorumu hâlâ "3 ile geçilemedi" diyor. Mutabakat yalnız `:9-11`'i yakaladı.
  - `isRedLine` parametresi fonksiyonda kullanılmıyor.
  - O1:6 hâlâ "`>= 2` kod turu BEKLİYOR" diyor.

### Z-10 · Deneme sınırı `[YENİ]`
- **2026-08-26**, `B03:36-37`: 2 başarısız denemeden sonra 24 saat bekleme. Kod yorumu, gerekçe yok.
- **2026-08-28**, `TAS:379`: "günde 2, üçüncüsünde bekleme". Gerekçe yalnız "PO kararı".
- **2026-09-03**, `FAZ6:176,648` ve `KT md.158`: "günde 2" + beklerken yolculuğa yönlendirme. Gerekçe yok, bekleme süresi yazılmamış.
- **Kodda:** Takvim günü sınırı yok, her 2 başarısızlıkta 24 saat bekleme var (`CERT_CONFIG:30-32`). Yolculuğa yönlendirme de var (`FE page.tsx:353-362`).
- **FE metni:** "Ceza veya bekleme yok" (`page.tsx:215`). Kullanıcıya yanlış bilgi veriliyor.

### Z-11 · Sertifika geri bildirim zamanı `[YENİ]`
- **2026-09-03**:
  - `FAZ6:360,650`: "sınav sonunda, konu bazlı". Gerekçe yok.
  - `MEN:204-214`: sertifikada "sonda, doğru/yanlış işaretli, renkli". Gerekçe var.
- **Kodda:** Her seçimden sonra `revealOption` ile anında açıklama (`certification.service.ts:444-465`, `FE page.tsx:102-129`). Sonuç ekranında da zayıf konu listesi var (`page.tsx:187-219`).

### Z-12 · Sınav örneklemi (8 senaryo, 4 kritik konu garantili) `[YENİ]`
- **2026-08-28**, `TAS:375-378` → **2026-09-03**, `FAZ6:156-158,647` → **2026-09-03**, `KT md.149` 🔵.
- **Kodda:** Çekim yok. Kurumda açık tüm konular soruluyor (varsayılan 10, en az 5), oturum içinde B varyantı tekrarı da var (`certification.service.ts:288-316`). Red-line konular kapatılamadığı için "garanti" dolaylı olarak sağlanıyor.

### Z-13 · Hatalı konu hedefleme `[YENİ]`
- `TAS:380-381,388` → `FAZ6:170-172,646` ("bugün YOK") → `KT md.157` 🔵.
- **Kodda:** `certWrongTopics` (`schema.prisma:1115`) yanlış konuları öne alıyor (`certification.service.ts:232-234,309-315`). Alan en geç 2026-08-15'ten beri kodda (`git -S`). "Diğer varyantla" kısmı yok, FE her sınavda önce A varyantını açıyor (`page.tsx:41,88`).

### Z-14 · Öğrenme yolculuğu aşama sayısı `[MUT Ç-12]` + ek
- **2026-08-15**, `ARŞ ogr`: 7 + 6.
- **2026-08-26**, `B04:6`: 13.
- **2026-09-03**:
  - `FAZ6 §7`: mentör 8 (8 sahne, 24 şık).
  - `MEN:33`: menti 5 (15 şık).
  - `KT md.147-148`: hedef 8 + 5.
- **2026-09-08**, `O3 KALEM 19` → `KT md.167`: mentör 10 (gizlilik + bitirme eklenecek).
- **Kodda:** 7 + 6 (`SEED-LJ:7`). 42 şık: mentör 24, menti 18.
- **YENİ:**
  - `KT md.148`'in "yeni mentör 8" hedefi md.167'den sonra 10'a güncellenmedi.
  - FAZ6'nın 8 sahnesinin **hiçbiri** seed metniyle birebir aynı değil. 5 tema örtüşüyor, 3 aşama yalnız belgede, 2 aşama yalnız seed'de (gönüllülük ruhu, okul/gönüllülük dengesi). Konseyin "1 aşama ayrışmış" özeti (`konsey:717` md.13) eksik kalıyor.
  - Seed'in 3 mentör aşamasında 4 şık var (`SEED-LJ:139,215,256`). FAZ6 "3 şık" diyor, `AUTHORING_GUIDE` "3-4".
  - `FAZ6:76` "13 aşamanın hepsinde menti aynı" diyor. Oysa 6 MENTI aşamasında kullanıcı menti rolünde.
  - `FAZ6:150` "herkes aynısını görür" diyor. Kodda kurum-özel aşama ekleme, gizleme ve sıralama var (`learningJourney.service.ts:272-534`, `LearningStageHide`), 2026-08-15'ten beri. B04 bunu atlamış.

### Z-15 · Kullanıcı boyut yüzdesini görür mü? `[YENİ]`
- **2026-08-28**, `TAS:44`: "görmez". Gerekçe `devir/08:32`'de ("yüzde soğuk").
- **2026-09-03**, `ARK:46`: "isterse görebilir". Önceki kararı revize ediyor, **kaynak göstermeden**.
- **Kodda:** Ekranda yok. `/api/scoring/compute-profile` ham OCEAN yüzdelerini dönüyor (`sjtScoringController.ts:80-86`), FE çağıranı yok. Ayrıca `TAS:45` "eşleşme yüzdesi görünür" diyor ve FE bunu gösteriyor (`menti/page.tsx:311`).

### Z-16 · `interactionStyle` / köprü `[YENİ]`
- **2026-08-29**, `TAS:576-580` (PR #141): köprü iptal, alan DONDURULDU, "hiçbir yere yazılmaz".
- **Kodda:**
  - Yazma şemaları hâlâ kabul ediyor (`onboardingController.ts:269,320`, `userController.ts:253,301,456`).
  - +10 bonus kodu duruyor (`matching.ts:287-293`).
  - FE soruyu kaldırmış (`ProfileStep.tsx:49,236`).
  - "Pasif SELECT temizliği" (`TAS:582`) numarasız kalmış.
- `TAS:717` (Bölüm 14 madde 8) hâlâ "interactionStyle türetilir" diyor.

### Z-17 · k-anonimlik eşiği `[YENİ]`
- **Tarihsiz**, `TAS:612-615`: örnek eşik "5'ten az". `TAS:716`: "kodda YOK". Kalem 11: ❓.
- **Kodda:** `K_ANONYMITY_THRESHOLD = 3` (`mask.ts:52`). Yalnız `userController.ts:140`'ta kullanılıyor. Üç soru (S1/S2/S3) için toplu görünüm ucu yok.

### Z-18 · Kişi adları / persona / isim değişkeni `[KONSEY]` + ek
- **2026-08-28**, `TAS:410`: isimler unisex.
- **2026-09-03**:
  - `FAZ6:128-136`: unisex iptal, cinsiyet dengesi.
  - `FAZ6:102-124` + `MEN:56-65`: 14 değişken, kurum bazında özelleştirilebilir. Gerekçesiz.
- **2026-09-23**, `TAS:411` + `KT md.160`: [ESKİ] damgası (`3dd5c10`).
- **Kodda:** Değişken altyapısı 0. Seed ve `learningJourney.service.ts:62-80` sabit persona adları taşıyor.
- **YENİ:** O-serisi metinlerin tamamı `{sert_n}` içeriyor. Seed'e ham haliyle taşınırsa ekranda `{sert_n}` görünür.

### Z-19 · Eşitlik bozucu (tie-break) `[YENİ]`
- **2026-08-26**, `eslesme-uyum:69`, `tam-soru:44`, `B05:76`: D>I>S>C. Gerekçe yok.
- **Kodda:**
  - `discLetters.ts:64` ve `onboardingController.ts:206-208`: D>I>S>C.
  - `temperamentAnalysis.ts:15-16`: **D>I>C>S**.
  - `onboardingController:206`'daki "temperamentAnalysis ile tutarlı" yorumu yanlış.

### Z-20 · Kurumlar arası eşleşme `[YENİ]`
- **2026-08-02**, `PSI:59`: "Match tenant-scoped, kurumlar arası eşleşme yok".
- **Kodda:** `matching.ts:128-140`, `isSharedPoolActive` ile kurumlar arası havuz kuruyor. `backend/CLAUDE.md` iş kuralı 1 de böyle diyor.

### Z-21 · Sektör alt-skoru `[YENİ]`
- **2026-08-02**, `PSI:39-42`: 5 alt metrik (30/25/25/15/5), "kod YAZILMADI, stub nötr 50".
- **2026-08-28**, `TAS:475-479`: payda iki tarafın etiket birleşimi olacak, çatılı eşleşme (IndustryNode/LCA) bağlanacak.
- **Kodda:**
  - `sector-scorer.service.ts` 5 bileşeni tam uygulamış ama **hiçbir yerden import edilmiyor**. Payda orada da asimetrik.
  - Canlı yol basit örtüşme kullanıyor, payda menti etiket sayısı (`scoring.ts:31-40`).
  - `taxonomy.service.ts` da bağlı değil.

### Z-22 · Soru yönetimi ve güvenli çalıştırıcı (B03/B04 bayatlığı) `[YENİ]`
- **2026-08-26**:
  - `B04:210,223,225`: `tenantScoped=false` ile global soru yaratılabilir.
  - `B03:25-27`: güvenli seed çalıştırıcısı YOK.
- **2026-08-29**, `5667daa`: bayrak yok sayılıyor, soru daima kuruma ait (`questionController.ts:132-140`). `:112` yorumu ve Zod alanı işlevsiz kaldı.
- **2026-09-08**, `5bd1656`: `isDirectRun` muhafızı eklendi (`SEED:320-329`). B03'te damga yok.

**Zincir özeti:**
- **22 karar zinciri.**
- **222 karar satırı** çıkarıldı: 13 dilim, belgeler arası tekrar dahil. Dağılım: TAS 64 · ARK 16 · MEN 13 · BANKA 11 · FAZ6 26 · soru-inceleme 9 · B01/02/05 16 · B03/04 15 · ARŞ+PSI 20 · KT 32.
- **Gerekçesiz karar: 96 satır** (tekrar dahil). En yoğun olanlar: bütün eşik sayıları (V1/V2 30/35/30, 45-75 bandı, r>.10, %80, "günde 2", 3/7 gün, 60-80 kelime, 0.25 / 0.75 harf eşikleri, 16 matris değeri, D-S anti-match, D>I>S>C, ters madde yokluğu) ve KT md.139, 142, 143, 146, 150, 151, 152, 154, 155, 157, 158, 165 ile md.138'in 10 puan eşiği.

---

## 3. ⭐ SAYI MUTABAKATI TABLOSU (B)

Tüm sayılar alt-ajanlarca **yeniden sayıldı**. "Kendi sayım" sütunu belgenin iddiasından farklıysa ayrıca yazıldı.

| # | Ne (birim) | Belge A | Belge B | Kendi sayım | Kodda | Uyuşmazlık |
|---|---|---|---|---|---|---|
| 1 | Çekirdek karakter senaryosu | TAS:162,663 → 12 | BANKA:45 → 5+10=15 · TAS:586 → 15 · ARK:134 → 35 havuz, ARK:16 → 39 | BANKA 39 senaryo / 117 şık ✓ | 0 (banka yok) | belge↔belge, belge↔kod [MUT Ç-5] |
| 2 | Senaryo başına şık (karakter) | TAS:124 → 4 | BANKA:38 → 3 | TAS [1]-[7] 4'er | SJT seed 4 | belge↔belge [MUT Ç-6 + düzeltme] |
| 3 | Denge tablosu sinyali | TAS:323-327 → 24 (5/5/5/6/3) | — | **27** (5/7/6/6/3) | — | belge↔kendi sayım [YENİ] |
| 4 | Derinleşme havuzu | TAS:342 → 30-40, hedef 100+ | BANKA → 34 havuz | 34 | DEEPENING 12 (4 DISC × 3, `questionService.ts:13`) | 3 yönlü [YENİ] |
| 5 | Derinleşme boyutu | TAS:345 → 5 Big Five | — | — | 4 DISC (`adaptiveTestEngine.ts:208`) | belge↔kod [YENİ] |
| 6 | Arketip kartı | ARK:7 → 8 | TAS:73-74 → 4+4 | 8 | 0 ad, 8 kod | belge↔kod [MUT] |
| 7 | "Şimdilik" varyantı | ARK:7 → 4 | — | 2 "şimdilik" + 2 çoklu, menti 0 | 0 | belge↔kendi sayım [YENİ] |
| 8 | Yaklaşım metni | ARK:7 → 8 | — | 8 | 0 | [KONSEY md.151] |
| 9 | Arketip eşiği | ARK:94 → fark <10 | PSI:36 → 40-60 | — | 60/55/45 | 3 yönlü [MUT Ç-7] |
| 10 | Mentör öğrenme aşaması | FAZ6:7 → 8 · MEN:175 → 8 | O3 K19 / KT md.167 → 10 · B04 → 7 | FAZ6 8 | 7 | [MUT Ç-12] + md.148 bayat [YENİ] |
| 11 | Menti öğrenme aşaması | MEN:33 → 5 | B04 → 6 | 5 | 6 | [MUT Ç-12] |
| 12 | Öğrenme şıkkı | FAZ6 → 24 (mentör) · MEN → 15 (menti) | — | 24 / 15 | 24 / 18 = 42 | belge↔kod |
| 13 | Aşama başına şık | FAZ6:34,199 → 3 | AUTHORING_GUIDE → 3-4 | — | 3 aşamada 4 | [YENİ] |
| 14 | Sertifika konu / senaryo / şık | FAZ6, TAM, B03 → 10/20/80 | O1+O2+O3 → 11/22/88 | 10/20/80 · 11/22/88 ✓ | 10/20/80. **Yorumu** `certification.service.ts:69` → "88 şık" | belge↔belge [MUT Ç-2], kod içi [YENİ] |
| 15 | Sınav başına senaryo | TAS:375, FAZ6:156 → 8 | — | — | açık konu sayısı (≥5, varsayılan 10) + B tekrarı | belge↔kod [YENİ] |
| 16 | Deneme / bekleme | TAS, FAZ6 → günde 2 | B03 → 2 başarısız → 24 s | — | 2 başarısız → 24 s · FE "bekleme yok" | 3 yönlü [YENİ] |
| 17 | Geçme eşiği | PSI:49 → %65 / 12 puan | FAZ6, B03 → %80 · red-line 3 | — | %80 (ceil) · her konuda ≥2 | [MUT Ç-9] |
| 18 | Kritik (red-line) konu / senaryo | tüm kuşaklar → 4 / 8 | — | 4 / 8 ✓ | T02/T05/T09/T10, 8 `isRedLine` ✓ | uyuşuyor |
| 19 | Ağırlık (sektör / DISC …) | PSI, eslesme-uyum, B05 → 60/40 | TAS, ARK → 45/30/25 · BANKA → kişilik %12→%25 | — | 0.6/0.4 + tuner (0.40-0.70) + bonus 10 | 3 yönlü [MUT Ç-3] |
| 20 | Kişilik içi dağılım | TAS:447-451, ARK:63 → 8/7/6/3/1 | BANKA → %8/%3/%1 | 25 ✓ | yok | belge↔belge [YENİ] |
| 21 | Kalite çarpanı | PSI:19 → 0.7-1.15 | PSI:55 → ±%20 · TAS:432 → 0.8-1.2 | — | iki yığın: 0.8-1.2 ve 0.7-1.15 | [YENİ] |
| 22 | Veto sayısı | TAS:458 → 2 (V1/V2) | PSI → 3 blok | — | D-S + 2 BLOCKED_PAIRS | [MUT Ç-4] |
| 23 | k-anonimlik | TAS:614 → 5 | — | — | 3 (`mask.ts:52`) | belge↔kod [YENİ] |
| 24 | DISC Likert sorusu | ARŞ disc:12 → 20 (canlı, 08-15) | B01, tam-soru → 32 | 32 (20 CORE + 12 DEEP) | 32 (`seed.ts:30-184`) + onboarding 8 | canlı DB teyitsiz [YENİ] |
| 25 | SJT sorusu / şıkkı | PSI:47 → 4 (üstü çizili) | B02 → 3 | 3 / 12 | 3 / 12 | uyuşuyor (PSI düzeltilmiş) |
| 26 | Adaptif CORE eşiği | B05:36 → 5 | — | — | engine 5 ↔ questionService 20 | kod↔kod [YENİ] |
| 27 | Cevapsız boyut başlangıç değeri | B05:71 → 0.5 | — | — | 0.5 (engine) ↔ 0.25 (discVectorService) | kod↔kod [YENİ] |
| 28 | İlk oturum süresi | TAS:590 → ~7 dk | TAS:667 → ~5-6 dk · TAS:161 → ~5-6 dk | — | — | belge içi [YENİ] |
| 29 | İsim değişkeni | FAZ6 → 4+6 · KT md.146 → 14 | MEN → 4 mentör | 14 ✓ | 0 | belge↔kod [KONSEY] |
| 30 | O3 yeni yazılan 0 şıkkı | O3:473 → 3 | — | **5** | — | belge↔kendi sayım [YENİ] |
| 31 | O3 elenen tekil şık | O3:323-330 → 3 | — | **5** | — | belge↔kendi sayım [YENİ] |
| 32 | Bekleme günleri | MEN:330,338 → 3. gün / 7. gün | — | — | yok (cron'da iş yok) | [KONSEY md.154] |
| 33 | Haftalık görüşme | MEN:308 → "ör. 1 veya 2", menti sınırsız başvurur | — | — | varsayılan 2, aralık 1-5, **PENDING dahil sayılır**, 409 döner | belge↔kod [YENİ] |
| 34 | PO inceleme notu | sorular-po → 68 | eslesme-uyum → 19 | 68/68 ve 19/19 **boş** | — | [YENİ] |
| 35 | FAZ6 doğru şık konumu | — | — | 20 doğrunun 16'sı 2. şık, 3'ü 3. şık, 1'i 4. şık | FE karıştırıyor (`shuffle`) | taşıma riski [YENİ] |

**Uyuşmazlık sayısı:** 35 satırın **32'sinde** en az bir uyuşmazlık var. Uyuşanlar: #18, #25 ve #8'in belge tarafı.
- Belge↔belge: 13
- Belge↔kod: 17
- Kod↔kod: 3
- Belge↔kendi sayım: 5

Bazı satırlar birden fazla türe girdiği için bu sayıların toplamı 32'yi aşar.

---

## 4. 88 ŞIK KARŞILAŞTIRMASI (C)

### 4.1 "88" neyi sayıyor
- 88 = O1 (8 senaryo / 32 şık) + O2 (6 / 24) + O3 (8 / 32) = **22 senaryo × 4 = 88 şık, 11 konu**. Yalnız O-serisine ait.
- SEED, FAZ6, B03, ARŞ ve TAM **80** şık taşıyor (20 × 4).
- Kod yorumu `certification.service.ts:69` ile commit `43d15dc` "88 şık" diyor; seed ise 80. `[YENİ]`

### 4.2 Konu numarası kayması (her kuşak farklı) `[MUT Ç-10]` + ayrıntı

| İçerik | SEED / TAM / B03 / ARŞ | FAZ6 §8 | O-serisi |
|---|---|---|---|
| Geri bildirim (RL) | 2 | K1 | 1 |
| Sınır (RL) | 5 | K2 | 2 |
| Gizlilik (RL) | **9** | K3 | 3 |
| Kriz (RL) | 10 | K4 | 4 |
| Cevabı buldurmak | 1 | 5 | 8 |
| Beklenti | 3 | 6 | **9** |
| Kültürel | 8 | 7 | 10 |
| Süreklilik | — | 8 | 6 |
| Kendi sınırını / kapasiteni bilmek | — | **9** | 5 |
| Bitirme | — | 10 | 11 |
| Aktif dinleme | 4 | — | 7 |
| Gönüllü tükenmişliği (STK) | 6 | — | — (elendi) |
| Okul-gönüllülük (STK) | 7 | — | — (elendi, yetkinlik açıkta) |

- **"Konu 9" dört farklı konuyu gösteriyor:** Gizlilik (B03:14,301 · ARŞ:125 · TAM:275), Kendi sınırını bilmek (FAZ6:574), Beklenti (O3:90 ve 6 atıf daha).
- **O-serisi içinde iki numaralandırma birlikte kullanılıyor:** O3'te "Konu 9-B" Beklenti'yi gösteriyor. O1:156,266,316'daki "K9-VarB" ise TAM numarasıyla Gizlilik'i gösteriyor. `[YENİ]`

### 4.3 Senaryo eşleştirme özeti (22 O-senaryosu)
- **Kaynak dağılımı** (O3:482-489 ile kendi sayımız tutuyor): FAZ6'dan 15, TAM/seed'den 5, yeni 2.
- **Seed kökenli 5 senaryo ve farkları:**

| O-senaryosu | Seed karşılığı | Metin | Puan |
|---|---|---|---|
| O1 Geri bildirim B | T02_B (bütçe planı) | küçük fark | aynı |
| O1 Gizlilik B | T09_B (hata itirafı) | değişti | **3↔2 kayması** |
| O2 K7-A | T04_B (dikkat kayması) | küçük fark | aynı |
| O3 9-B | T03_A (çerçeve) | kelime düzeyinde | aynı |
| O3 10-A | T08_A (çalışma tarzı) | sahne değişti ("ve değerlere" çıktı, "sonuçlar iyi" eklendi) | aynı |

- **Yakın ikiz:** O3 10-B, FAZ6 7A'dan geliyor ve seed T08_B'ye yakın. Puan sırası tersine dönmüş (§4.4).
- **Seed'den elenen 15 senaryo:** T01_A/B, T02_A, T03_B, T04_A, T05_A/B, T06_A/B, T07_A/B, T08_B, T09_A, T10_A/B. O1:262-269, O2:241-248 ve O3:319-320 bunları gerekçeleriyle kaydetmiş.
- **FAZ6'dan alınan 15 senaryonun hepsinde şık metni değişti.** Tipik değişiklikler:
  - FAZ6'daki tek "✅ doğru" şık O-serisinde 3 puanlık şık oldu (O3'teki 8 sahnenin 6'sında birebir).
  - FAZ6'daki bir şık elendi, yerine yeni bir 0 şıkkı yazıldı.
  - İsim değişkeni numaraları kaydırıldı (`sert_2`→`sert_5` gibi).

### 4.4 ⭐ Puan anlamı ters dönen / sonucu değişen vakalar

**(a) Gizlilik B: konseyin iddiası DÜZELTİLİYOR, ters değil kayma var** `[KONSEY düzeltmesi]`

| Davranış | SEED T09_B (`:229-232`) | O1 3-B (`:159-179`) |
|---|---|---|
| Korurum; **istersem** cesaretlendiririm | **3** | — |
| Sessiz kalırım **ama teşvik ederim** | **2** ("3'e yakın") | 3'ün parçası (+ "güvenini koruduğumu söylerim") |
| Sessiz kalırım, **ayrıca konuşmam** | — | **2** GEÇER |
| Sorulursa doğruyu söylerim | 1 | 1 |
| Bildiğimi paylaşırım | 0 | 0 |

- **Değerlendirme:** Değişen tek şey 3↔2 bandının yeniden ayrılması (`O1:156`). Kodda eşik `>= 2` olduğu için geçme/kalma sonucu değişmiyor.
- Konseyin `konsey:18-19,125-126,706` ve KARAR-46 C seçeneğindeki "ters puanlanan senaryo canlıda kalır" gerekçesi **bu vaka için geçerli değil**.

**(b) Kültürel B: GERÇEK ters dönme** `[YENİ]`

| Davranış ailesi | SEED T08_B (`:207-210`, `TAM:263-270`) | O3 10-B (`:192-206`) |
|---|---|---|
| Merakla anlamaya çalışırım / görüşünü sorarım | **3** | **2** |
| Konuyu değiştiririm, girmem ↔ konuyu nazikçe mentörlük hedefine çeviririm | **1** | **3** |
| Kendi görüşümü belirtirim | **2** (geçer) | **1** (konu geçilmez) |
| İkna etmeye çalışırım | 0 | 0 |

- Sahneler birebir aynı değil: O3 sahneye "hedefle ilgili değil" koşulunu ekledi.
- O3 bu çatışmayı kendisi tespit etmiş (KALEM 17, `O3:320,363-367,429-430`).
- Canlı seed'de davranış tam tersine sonuçlanıyor: "kendi görüşünü söyleyen" geçiyor, "konuyu yönlendiren" kalıyor.

**(c) Kriz: geçme/kalma çizgisi yer değiştirmiş** `[YENİ]`

| Davranış | SEED T10_A (`:241-244`), canlı | O1 4B (`:223-231`) |
|---|---|---|
| Dinler, uzmana yönlendiririm (bildirim yok) | 3 | 2 GEÇER ("aramızda kalsın, bildirmem") |
| Dinlerim, yanında olduğumu söylerim | **2, bugün GEÇER** | **1, ELER** |
| Konuyu değiştiririm | 0 | 0 |

- FAZ6 4B da benzer şıkkı yanlış sayıyor (`FAZ6:459,464`).

**(d) Seed'in kendi tereddüdü bugün geçiyor** `[YENİ]`
- Seed T05_A D (`:132`) ve T10_B D (`:252`) 2 puan alıyor, ama açıklamaları "Kabul edilebilir değil-e yakın" diyor.
- O1 KALEM 1 (`:314-315`) bu ikisinin ve T05_B D'nin (`:142`) 1'e düşmesini istiyor.
- T03_B'deki "Elimden geleni yaparım" (2) için O3:425-426 da 1 öneriyor.
- Hepsi canlı ve hepsi geçiyor.

**(e) Diğer aynı yönlü kaymalar**
- O2 K5-A'daki "şimdilik idare ederim" 1 puan (eler). Seed T05_A'da red-line konuda 2 puan (`O2:52` ↔ `SEED:132`).
- TAM K7 A/B'deki C şıkları 2→1'e çekildi (`O2:332-335`). Seed hâlâ 2 veriyor (`SEED:176,186`).
- Cevabı buldurmak A'da seed'in 3 puanlık "soruyu geri ver" şıkkı O3'te 2'ye düştü (`O3:46-50`). Eşiğin üstünde kaldığı için sonuç değişmiyor.

### 4.5 Diğer 88-şık bulguları
- **O3'ün kendi sayımında iki hata var** `[YENİ]`:
  - Yeni yazılan 0 şıkkı 3 değil **5**: 8-B ve 9-A eksik sayılmış.
  - Elenen tekil şık 3 değil **5**: FAZ6 5B "Yürümezse ne yaparsın?" ve 6A "Denemesini söylerim" listede yok.
- **KALEM 18 koruması kodda yok** `[YENİ]`: O3, T08_A'daki "sonuçlar iyi" ifadesinin düzenlenemeyeceğini söylüyor (`O3:371-389`). Seed'de bu ifade yok. `internalNote` alanı var (`schema.prisma:1158`) ama seed onu hiç doldurmuyor.
- **Seed'e ait bayat açıklamalar:** `SEED:7` kaynak olarak TAM'ı gösteriyor. B03 "runner yok" diyor.
- **Kategori sınıflaması:** Seed her şıkkın başına "Doğru / Kabul edilebilir / Zayıf / Zararlı" yazıyor. FAZ6 tek ✅ gerekçesi veriyor. O-serisi her şık için prensip gerekçesi veriyor.

---

## 5. TERİM TUTARSIZLIKLARI (D)

**Kapsam:**
- **Dizinler:** `FE frontend/src` (194 .ts/.tsx dosyası) · `BE src` (120 dosya, e-posta şablonları satır içi) · belgeler `docs/raporlar/icerik/` (17 .md).
- **Hariç tutulanlar:** `__tests__`, `*.test.*` ve `*.spec.*` dosyaları.
- **Desenler** (hepsi harf duyarsız):
  - `miza[çc]` · `karakter` · `ki[şs]il[iı]k`
  - `senaryo` · `\bsoru` · `\bvaka`
  - `\bmenti(?!on)` · `\bmentee` · `dan[ıi][şs]an`
  - `\bmentor` · `\bment[öÖ]r`
  - `e[şs]le[şs]me` · `e[şs]le[şs]tirme`
  - `g[öo]r[üu][şs]me` · `toplant[ıi]` · `randevu` · `\bseans` · `\boturum`
- **Ayıklama:** Kullanıcı metni tanımlayıcılardan elle ayrıldı: import, yorum, yol, camelCase, BÜYÜK HARF enum, marka adı ve logger satırları dışarıda kaldı. Hassasiyet yaklaşık ±%5.

| Grup | FE kullanıcı metni | BE kullanıcı metni (yakl.) | Belge (satır) | Tutarsızlık |
|---|---|---|---|---|
| mizaç / karakter / kişilik | 15 / 8 / 2 | 3 / 2 / 0 | 2 / 25 / 14 | ❌ Kullanıcı "Mizaç Testi" görüyor. Admin, hukuki metinler ve mentör paneli "Karakter" diyor. Belgelerde "mizaç" neredeyse hiç yok. `algorithm-tuner/page.tsx:130,134,142` aynı kartta iki terim kullanıyor. `admin/invite/page.tsx:34` aynı paragrafta "Karakterine … Mizaç". "karakter" ayrıca "harf sayısı" anlamında da geçiyor (FE 11, BE 20). |
| senaryo / soru / vaka | 8 / ~50 / 0 | 0 / ~37 / 0 | 171 / 287 / 10 | ⚠️ `GameSection.tsx:30` "Soru 3 / 8" ↔ `:202` "8 Senaryo". Onboarding aynı adımı "Mizaç Testi" (`:34`), "Senaryo sorularına" (`:180`) ve "sorular" (`DiscTestCard.tsx:144`) diye anıyor. "vaka" yalnız belgede var. |
| menti / mentee / danışan | ~50 / 0 / 0 | — | 290 / 5 / 0 | ✅ tutarlı |
| mentor (ASCII) / mentör | ~34 / 75 (**8 dosyada ikisi birden**) | ~14 / ~19 | 65 / 220 | ❌ `menti/page.tsx` (251 "Önerilen Mentorlar" ↔ 173 "Mentörlük") · `mentor/page.tsx:156` "Mentor Paneli" ↔ `:191` "Mentör Sertifikası" · `certification/page.tsx:262-264` arka arkaya · `meetings/page.tsx:36` ↔ `:198` · `agreement/[id]/page.tsx:66` ↔ `:98` · `PainSection.tsx:36` tek cümlede · davet akışında üç yazım (`admin/invite:206` "Mentor Daveti", `Step5Invite.tsx:83` ve `InvitationCard.tsx:21` "Mentör") · `layout.tsx:36-37` "Mentorluk Platformu" ↔ landing "Mentörlük". **Melez yazım:** "mentorlük" (`Step2Template.tsx:27`) ve "Mentorünüz" (`BE notificationService.ts:65`). BE hata mesajlarında "Mentor bulunamadı." ↔ "mentör bulunamadı" (`meetingController.ts:175` ↔ `:387`). |
| eşleşme / eşleştirme | 65 / 18 | ~27 / 6 | 35 / 16 | ⚠️ Anlam ayrımı büyük ölçüde tutuyor (süreç / sonuç). İstisnalar: `kvkk/page.tsx:38` ↔ `:46`, `algorithm-tuner:118` ↔ `:138`. |
| görüşme / toplantı / randevu (+ buluşma) | 71 / 8 / 9 | ~20 / ~15 / 0 | 92 / 2 / 0 | ❌ **Aynı görüşme talebi dört adla anılıyor:** menü "Görüşmelerim" (`DashboardNav.tsx:16`) · paneller "Toplantı Talepleri / Tamamlanan Toplantılar" (`mentor/page.tsx:43,251,512`, `menti/page.tsx:243`) · talep ekranı "Randevu Talebi" (`book-meeting/page.tsx:94,102,209`) ve "Randevu Al" · e-posta "Yeni Toplantı Talebi" (`BE emailService.ts:103,119`) · kvkk "buluşma kayıtları". Belgelerde "oturum" (72) sertifika oturumu anlamında geçiyor, FE'de karşılığı yok. |

**Tutarsızlık sayısı:** 5 terim grubunda tutarsızlık var (yalnız "menti" tutarlı). Yukarıda dosya:satırıyla verilen **31 somut nokta** var.
- Konseyin IC-02 (davet mentörlük/mentor) ve IC-11 (randevu/toplantı/görüşme) satırları ile mutabakatın KARAR-??-D (terim) kartı bu grupları zaten kapsıyor.
- Bu tur o satırlara **FE ve BE nokta listesini** ekler (bkz. §8).

---

## 6. ARŞİV BULGULARI (E)

Arşivdeki belgeler GÜNCEL sayılmadı. Aşağıdaki biçim "arşivde şu var, güncelde yok".

1. **Eski 20 DISC sorusunun tam metni yalnız arşivde duruyor** (`ARŞ disc-sorulari:18-50`, 16 CORE + 4 DEEPENING). Arşiv dışında 0 eşleşme var ("Rekabetçi ortamlarda…", "Stres altında bile sakin…").
   - 08-15 sayımına göre canlıdaki set bu 20'ydi. `seed-questions.ts` 08-23'te silindi.
   - Canlı DB hâlâ bu 20 soruyu taşıyorsa, canlı içeriğin **tek belge kaydı arşivdedir**. `tam-soru-dokumu:145` bunu "canlı teyit kuyruğu" diye bırakmış.
2. **08-15 canlı sayım fotoğrafı yalnız arşivde:** sertifika 5 soru / 20 şık, STK_CUSTOM 1 soru (`ARŞ sert:13`, `ARŞ stk:7`). Güncel belgede yalnız "~5 (canlı) ⏳ teyit" yazıyor (`tam-soru:59`).
3. **"Hangi testte DISC'e göre uyarlama var" tablosu** (`ARŞ 00-icerik-index:26-34`) güncel belgelerde yok. Sonradan ARK #31 (8 yaklaşım metni) ile tasarım karşılığı yazıldı, ama tablo güncellenmedi.
4. **Taşıma değerlendirmesi:**
   - DISC, SJT, STK ve index dökümlerinin taşınması doğru. Yerlerine kod-kanıtlı `bolumler/` belgeleri geldi (`0d04ceb`, 08-28, G9-08/16).
   - **Sertifika ve öğrenme dökümlerine vurulan "BAYAT" etiketi yanlış.** İçerdikleri 20 senaryo ve 7+6 aşama bugün kodla birebir örtüşüyor. Eskiyen kod değil; onları geride bırakan yeni tasarım (FAZ6, O-serisi).
   - Arşiv sertifika listesi ayrı bir "4. kuşak" değil. Seed ile aynı içerik, yalnız metinler kısaltılmış.
5. **PSI (canonical damgalı, 08-02'den beri gözden geçirilmemiş) içinde koda karşı bayat ve güncelde ayrıca işaretlenmemiş iddialar:**
   - `:41` "stub nötr 50" (bkz. Z-21)
   - `:59` "kurumlar arası yok" (bkz. Z-20)
   - `:45` P1-P5 mentörlük yetkinliği: kodda 0
   - `:47` "Mini Akademi 4 modül": kodda ve FE'de 0

   `[YENİ]` Mutabakatın IC-??-1'i "PSI damgası" diyor ama bu 4 maddeyi saymıyor.

**Arşiv bulgusu sayısı: 5.**

---

## 7. YENİ ÇELİŞKİLER (mutabakat ve konseyin bulmadıkları)

| # | Çelişki | Kanıt |
|---|---|---|
| Y-1 | Mizaç vektörüne 3 yazma yolu, farklı formüllerle | §0-2 |
| Y-2 | Mutabakat KARAR-??-B'deki "8 soruluk DISC" cümlesi eksik; `/disc-test` 32 Likert soruyla canlı | B01 · `useDiscTest.ts` |
| Y-3 | Kültürel B'de gerçek puan tersliği | §4.4b |
| Y-4 | Kriz'de canlıda "yanında olurum" şıkkı geçiyor, O-serisinde eliyor | §4.4c |
| Y-5 | Seed'in "değil-e yakın" dediği 2 puanlık şıklar canlıda geçiyor | §4.4d |
| Y-6 | Konseyin "Gizlilik B ters" iddiası bir kademe kaymadan ibaret | §4.4a |
| Y-7 | FE "Ceza veya bekleme yok" ↔ BE 24 saat bekleme | Z-10 |
| Y-8 | Sertifika geri bildirimi belgede "sonda", kodda anında | Z-11 |
| Y-9 | Belgede 8 senaryo çekimi, kodda tüm açık konular | Z-12 |
| Y-10 | "Hatalı konu hedefleme yok" iddiası ↔ `certWrongTopics` var | Z-13 |
| Y-11 | MEN "menti istediği kadar başvurur" ↔ haftalık limit PENDING talepleri de sayıyor, 409 dönüyor | `meetingController.ts:79-84,184-187` |
| Y-12 | Anti-match menti→mentör yönünde uygulanmıyor | Z-3 |
| Y-13 | Tie-break D>I>S>C ↔ `temperamentAnalysis` D>I>C>S | Z-19 |
| Y-14 | PSI:59 "kurumlar arası yok" ↔ kodda kurumlar arası havuz var | Z-20 |
| Y-15 | PSI:41 "stub" ↔ `sector-scorer` tam yazılmış ama bağlı değil | Z-21 |
| Y-16 | `interactionStyle` "hiçbir yere yazılmaz" ↔ yazma yolları ve +10 bonus duruyor | Z-16 |
| Y-17 | k-anonimlik: belgede 5, kodda 3, üç soru için uç yok | Z-17 |
| Y-18 | Ayna ↔ M2 koşul uyuşmazlığı; menti kodlarındaki ek koşullar | Z-1 |
| Y-19 | TAS:44 "yüzde görmez" ↔ ARK:46 "görebilir" (kaynaksız) ↔ API ham OCEAN döndürüyor | Z-15 |
| Y-20 | TAS Bölüm 11 akışı ve Bölüm 14 md.8 düzeltilmemiş | Z-8, Z-16 |
| Y-21 | TAS kalem listesi bayat: kalem 9 "⬜" ama kodda var; kalem 13 "⬜" ama S21 yapıldı; kalem 5 "D-S kaldır" ama canlı | `TAS:746,750,754` |
| Y-22 | TAS zorunlu kısıtları dil ve kapasite kodda yok | `TAS:431` ↔ `matching.ts:274-275` |
| Y-23 | Derinleşme belgede 5 Big Five boyutuyla, kodda 4 DISC boyutuyla | #5 |
| Y-24 | TAS denge tablosu 24, kendi sayımımız 27 | #3 |
| Y-25 | PO inceleme belgeleri: 87 not satırının hepsi boş, belgeler yine de donduruldu | `sorular-po`, `eslesme-uyum` |
| Y-26 | KT'de durum işaretleri bayat: md.143, 144, 145, 164 🔀 ama canlı; md.150 ve 160 🔵 ama bitti; md.149, 157, 158 🔵 ama yarım | KT:305-327 ↔ `00-KUYRUK.md:108-121` |
| Y-27 | KT md.165 ve md.168 AÇIK ama kuyrukta yok ("aktif iş kaynağı tektir" kuralına aykırı). md.168'in "guard zaten var" dediği `parseDiscVector` export edilmemiş | `discVectorService.ts:37` |
| Y-28 | KT md.162 kendi içinde çelişiyor ve bir ayağı kaynaksız ("belgeye yazılmadı") | KT:324 |
| Y-29 | Kuyruk `:104` "B.1 satır 287-309" diyor, satırlar kaymış (bugün 300-322) | `00-KUYRUK.md:104` |
| Y-30 | "4 şimdilik varyantı" aslında 2 + 2; menti varyantı 0 | Z-7 |
| Y-31 | Baskın + ikincil gösterim ↔ şemada tek `archetype` alanı | Z-7 |
| Y-32 | ARK "bu bir eğilim" ilkesi ↔ ARK'ın kendi örneklerinde kimlik dili ("Sen bir Limansın") | `ARK:55,87,149,281` |
| Y-33 | FAZ6 §7'deki 8 sahnenin hiçbiri seed'le birebir değil (konseyin "1 aşama" özeti eksik); FAZ6:76 ve :150 iddiaları koda uymuyor | Z-14 |
| Y-34 | B04 kurum-özel aşama yönetimini atlamış; `tenantScoped` bayat | Z-14, Z-22 |
| Y-35 | ScenarioGuideEngine "diğer seçenekler" açılınca yalnız etiketleri gösteriyor; MEN:185 "üçü de görünür" diyor | `ScenarioGuideEngine.tsx:271` |
| Y-36 | O3 kendi sayımında 2 hata; KALEM 18 koruması seed'de yok | §4.5 |
| Y-37 | "Konu 9" dört anlama geliyor; O-serisi içinde iki numaralandırma birlikte | §4.2 |
| Y-38 | `certification.service.ts:92` yorumu "3 ile" diyor; `:69` yorumu "88 şık" | Z-9, §4.1 |

**Yeni çelişki sayısı: 38.**

---

## 8. HAZIR KUYRUK SATIRLARI (TO-??) ve KARAR KARTLARI (KARAR-??)

> ⛔ Numara verilmedi. `00-KUYRUK.md` ve `01-KARARLAR.md`'ye bu turda **yazılmadı** (terminalde /goal turu çalışıyor). PO / ana tur kopyalar.

### 8.1 Kuyruk satırları

| Önerilen | Kapı | İş | Dosyalar | Not |
|---|---|---|---|---|
| TO-?? · sertifika bekleme metni | 🟢 | "Ceza veya bekleme yok" metnini gerçek kurala uydur: 2 başarısız denemeden sonra 24 saat bekleme | FE `mentor/certification/page.tsx:215` | Kullanıcıya yanlış bilgi veriyor. Metin düzeltmesi. auth, KVKK ve matching dosyalarına dokunmuyor. IC-04 ile aynı ekranda, sıralı yapılmalı. |
| TO-?? · KT durum senkronu | 🟢 (belge, K-20 sonu) | KT md.143, 144, 145, 164 → ✅ · md.150, 160 → ✅ · md.149, 157, 158 → 🟡 YARIM · md.148 hedefini 10'a güncelle · md.162 iç çelişkisini damgala | `docs/kararlar/00-KARAR-TAKIP.md` | Y-26, Y-28 |
| TO-?? · md.165 ve md.168 kuyruğa devir | 🟡 | md.168: `parseDiscVector`'ü export et, `matching.ts:286,400`'deki ham cast'leri değiştir. md.165: KARAR-??-A (formül) cevabına bağla | BE `discVectorService.ts`, `matching.ts` | matching dosyası → 🟡 |
| TO-?? · PSI ek bayatlıkları | 🟢 (belge) | IC-??-1'e (PSI damgası) ek: `:41` stub, `:45` P1-P5, `:47` Mini Akademi, `:55` / `:19` iki çarpan, `:59` kurumlar arası | PSI | Z-20, Z-21, Y-14, Y-15 |
| TO-?? · bolumler/03-04 baş-notu | 🟢 (belge) | IC-??-2 paketine ekle: B03:24-27, 45-52, 56, 361, 363 · B04:9-12, 210, 223, 225 + kurum-özel aşama notu | `bolumler/03`, `bolumler/04` | Z-22 |
| TO-?? · backend bayat yorumlar | 🟢 | IC-??-4'e ekle: `certification.service.ts:69` ("88 şık"), `:92` ("3 ile") · `SEED:7` · `onboardingController.ts:206` ("tutarlı"), `:365` ("kart sonra") | BE | yorum düzeltmesi |
| TO-?? · TAS iç bayatlık | 🟢 (belge) | Bölüm 11 akışı (`:663-665`) · Bölüm 14 md.8 (`:717`) · kalem 5, 9, 13 durumları · `:580` "hiçbir yere yazılmaz" | TAS | Y-20, Y-21 |
| TO-?? · `interactionStyle` karantinası | 🟡 | Dondurulmuş alanı yazma şemalarından çıkar. +10 bonus kararını bağla (`TAS:488-489`, Faz 5) | BE `onboardingController`, `userController`, `matching.ts` | SİLME PROTOKOLÜ geçerli: önce karantina. matching → 🟡 |
| TO-?? · tie-break tek kaynak | 🟡 | `temperamentAnalysis.ts:15-16` D>I>C>S ↔ `discLetters.ts:64` D>I>S>C | BE | Kullanıcının harf sonucu değişebilir → önce doğrula |
| TO-?? · eski 20 DISC sorusunun canlı teyidi | PO elle | Canlı DB'de DISC sorusu kaç ve hangi metin (salt-okuma sorgu) | → `03-PO-ELLE-ISLER.md` | Bulutta DB erişimi yok. §6-1 |
| TO-?? · terim noktaları | 🟢 (IC-02 / IC-11 ekine) | §5'teki 31 noktayı IC-02 (mentor/mentör + melez "mentorlük", "Mentorünüz") ve IC-11'e (görüşme/toplantı/randevu, e-posta dahil) ekle | FE / BE metinleri | KARAR-??-D cevabından sonra |
| TO-?? · 88 şık taşıma kontrol listesi | 🔴 (KARAR-46'ya bağlı) | Taşıma turunda şunları kontrol et: `{sert_n}` ham metin · KALEM 18 "sonuçlar iyi" · `internalNote` doldurulsun · FAZ6 doğru şık konum yığılması · O3 sayım düzeltmesi (5/5) | SEED | §4.5 |

### 8.2 Yeni karar kartları

```
### KARAR-?? · Sertifikada geri bildirim ne zaman gösterilsin?  [ÜRÜN KARARI]  (2 işi açar)
**Şu an ne var:** Mentör sertifika sınavında her şıkkı seçtiği anda o şıkkın açıklamasını görüyor
(neden doğru/yanlış). Kanıt: backend certification.service.ts:444-465 · frontend
mentor/certification/page.tsx:102-129. Sınav sonunda ayrıca "pekiştirilecek konular" listesi çıkıyor (:187-219).
**Sorun ne:** Tasarım belgeleri tam tersini istiyor: "geri bildirim sınav SONUNDA, konu bazlı"
(faz6:360,650; menti-yolculugu:204-214). Anında açıklama, sınavı bir öğrenme turuna çevirir; aynı oturumda
B varyantı da geldiği için ikinci soruyu açıklamayı okuyarak geçmek kolaylaşır.
**Neden sana soruyorum:** Mentörün sınavda ne gördüğü bir ürün kararı; sınavın "ehliyet mi, son tekrar mı"
olduğu sorusuna bağlı (TAS:369-371 "eleme sınavı değil, son tekrar").
**Seçenekler:**
  A · Anında açıklama kalsın (bugünkü hal)
     · Kullanıcı: her seçimden sonra neden doğru/yanlış olduğunu görür · Kazanç: öğretici, iş yok
     · Kayıp: sınav ölçmekten çok öğretir; B varyantı "kopya" ile geçilebilir · Süre S · Geri alınır · Migration yok
  B · Açıklamalar sınav sonunda, konu bazlı (belgelerdeki tasarım)
     · Kullanıcı: sınav boyunca yalnız soruları görür, sonunda konu konu açıklama · Kazanç: ölçüm temiz
     · Kayıp: anında öğrenme anı kaybolur; FE sonuç ekranı yeniden yazılır · Süre M · Geri alınır · Migration yok
  C · Anında yalnız "doğru/yanlış", açıklama sonda
     · Kullanıcı: renk/işaret görür, gerekçe sonda · Kazanç: ara yol
     · Kayıp: iki gösterim modu = daha karmaşık kod ve metin · Süre M · Geri alınır · Migration yok
**Karşılaştırma:** Sertifika "son tekrar" ise A savunulabilir; "yetkinlik kanıtı" ise B doğru.
C ikisinin arası ama iki mod bakımı getirir.
**Benim önerim:** B — belgelerdeki üç ayrı karar da bu yönde ve 88 şıklık yeni içerik "sonda, konu bazlı"
varsayımıyla yazıldı. Bu senin ürün kararın, önerime güvenme.
**Cevap vermezsen:** 88 şık taşıma turu (KARAR-46) gösterim biçimini belirsiz bırakarak ilerler; IC-04 aynı ekranda.
**CEVAP:**
```

```
### KARAR-?? · Menti aynı hafta birden fazla mentöre görüşme talebi gönderebilsin mi?  [ÜRÜN KARARI]  (3 işi açar)
**Şu an ne var:** Haftalık görüşme sınırına (varsayılan 2) onay BEKLEYEN talepler de sayılıyor. Menti o hafta
2 talep gönderdiyse 3.'yü gönderemez, sistem hata (409) döner. Kanıt: backend meetingController.ts:79-84,184-187.
**Sorun ne:** Menti yolculuğu tasarımı "menti istediği kadar başvurur; kim dönerse onunla başlar, sıklık
dolduysa diğeri sonraki haftaya kalır" diyor ve bekleme metni "birden fazla başvuru normaldir" yazıyor
(menti-yolculugu:304-310,324-326). Bugünkü kodla bu metin yanlış olur.
**Neden sana soruyorum:** Kullanıcının ne yapabileceği (kaç talep) bir ürün kararı; mentörlerin gelen kutusu da
etkilenir.
**Seçenekler:**
  A · Bugünkü hal: bekleyen talepler sınıra sayılır
     · Kullanıcı: 2 bekleyen talepten sonra yeni talep gönderemez · Kazanç: mentör gelen kutusu şişmez
     · Kayıp: yanıt vermeyen mentör menti'yi bir hafta kilitler; tasarım metni değişmeli · Süre S · Geri alınır · Migration yok
  B · Yalnız onaylanan görüşmeler sayılır, talep serbest
     · Kullanıcı: istediği kadar talep gönderir; onaylar sınıra ulaşınca kalanlar sonraki haftaya
     · Kazanç: tasarımla uyumlu, bekleme ölü zamanı yok · Kayıp: mentörler reddedilecek/eskiyecek talep görür;
       3/7 gün zamanlayıcısı (md.154) daha kritik olur · Süre M · Geri alınır · Migration yok
  C · Bekleyen talep için ayrı, daha yüksek sınır (örn. 3)
     · Kazanç: ara yol · Kayıp: iki sayaç = kullanıcıya anlatması zor · Süre M · Geri alınır · Migration yok
**Karşılaştırma:** Mentör tarafı az ve yavaşsa A korur; menti kaybı önemliyse B. C ancak ölçüm verisi varsa anlamlı.
**Benim önerim:** B — bekleme/ret akışının (md.154/155) tüm metinleri bu varsayımla yazıldı.
Bu senin ürün kararın, önerime güvenme.
**Cevap vermezsen:** I-10 (bekleme zamanlayıcısı), I-16 (ret), I-05 (sıklık gösterimi) metinleri kodla çelişik kalır.
**CEVAP:**
```

```
### KARAR-?? · Kullanıcının mizaç sonucunu hangi test belirlesin?  [ÜRÜN KARARI]  (4 işi açar)
**Şu an ne var:** Aynı mizaç sonucuna üç ayrı yol yazıyor:
(1) kayıt sırasındaki 8 soruluk test (onboardingController.ts:109-190),
(2) /disc-test sayfasındaki 32 soruluk test (questionService + discVectorService),
(3) panodaki "günün sorusu" kutusu (adaptiveTestEngine). Üçü farklı formülle hesaplıyor
(boş boyut 0.25 ↔ 0.5, güven hesabı farklı, derinleşme soruları farklı açılıyor) ve en son hangisi
çalıştıysa sonuç o oluyor. Kanıt: bkz. bu rapor §0-2.
**Sorun ne:** Kullanıcı panodaki bir soruyu cevaplayınca mizaç tipi (ve eşleşme puanı) başka formülle
yeniden hesaplanıp değişebilir. Kullanıcı bunun nedenini göremez.
**Neden sana soruyorum:** Hangi ölçümün "gerçek" sayıldığı, kullanıcının gördüğü kartı ve eşleşmelerini belirler;
yeni senaryo motoru (TAS) gelene kadar hangisinin yaşayacağı ürün kararıdır.
**Seçenekler:**
  A · Tek yol: 32 soruluk test esas, diğer ikisi yalnız ona veri besler (ortak hesap)
     · Kazanç: tek formül, tutarlı sonuç · Kayıp: kayıttaki 8 soru ayrı ağırlıkla sayılmaz · Süre M · Geri alınır · Migration yok
  B · Kayıttaki 8 soru esas, 32 soruluk test ve pano yalnız "güveni artırır"
     · Kazanç: herkes aynı başlangıç noktasına sahip · Kayıp: 32 soruluk test anlamını yitirir · Süre M · Geri alınır · Migration yok
  C · Bugünkü hal sürer, yeni senaryo motoruna kadar dokunulmaz
     · Kazanç: iş yok · Kayıp: sonuç sessizce değişmeye devam eder · Süre — · Geri alınır · Migration yok
**Karşılaştırma:** Senaryo motoru yakında gelecekse C geçici olarak kabul edilebilir; uzun sürecekse A.
**Benim önerim:** A — md.162'nin "ortak buildDiscVector" önerisiyle aynı yön.
**Cevap vermezsen:** md.162, md.168, md.169, PS-02 bağlanamaz.
**CEVAP:**
```

```
### KARAR-?? · "D mentör + S menti" yasağı menti tarafında da geçerli olsun mu?  [ÜRÜN KARARI]  (2 işi açar)
**Şu an ne var:** Mentörün menti listesinde bu çift eleniyor (aday yoksa gevşiyor) — matching.ts:200-216,283.
Menti'nin mentör listesinde ise hiç uygulanmıyor — matching.ts:351-431. Aynı çift bir yönde yasak, diğerinde serbest.
**Sorun ne:** Belgeler "hiç eşleştirilmez" diyor (eslesme-uyum:60); tasarım belgesi ise bu kuralı tamamen
kaldırıyor (TAS:468). Kod ikisinin arasında, yöne göre farklı davranıyor.
**Neden sana soruyorum:** Kimin kimi görebileceği ürün kararı; ayrıca bu kural KARAR-??-A (formül) ile birlikte
kalkabilir.
**Seçenekler:**
  A · Kural iki yönde de uygulanır · Kazanç: tutarlı · Kayıp: menti listesi daralır · Süre S · Geri alınır · Migration yok
  B · Kural iki yönde de kaldırılır (TAS kararı) · Kazanç: tasarımla uyumlu · Kayıp: dayanağı zayıf da olsa bir koruma kalkar · Süre S · Geri alınır · Migration yok
  C · Bugünkü hal, yeni formüle kadar · Kazanç: iş yok · Kayıp: tutarsızlık sürer · Geri alınır · Migration yok
**Karşılaştırma:** Yeni formül yakınsa C; değilse A ya da B'den biri.
**Benim önerim:** B — TAS:468 gerekçeyle kaldırdı; ama KARAR-??-A ile birlikte cevaplanmalı.
**Cevap vermezsen:** md.165 ve TAS kalem 5 bağlanamaz.
**CEVAP:**
```

### 8.3 Mevcut kartlara ek bilgi

**KARAR-45'e ek:**
- **Ayna ↔ M2 koşulu uyuşmuyor.** TAS'ta Ayna "açıklık + sıcaklık (A)", koddaki M2 koşulu ise "açıklık + dışadönüklük" (`TAS:84-102` ↔ `disc-to-ocean.adapter.ts:30-41`). Menti kodlarında da belgede olmayan ek koşullar var (Z-1). A veya C seçilirse ad↔kod eşlemesi yazılırken koşulların da yeniden eşlenmesi gerekir.
- **"4 şimdilik varyantı" aslında 2 + 2**, menti tarafı 0. Madde 139'un "4/8 eksik" hesabı buna göre güncellenmeli (Z-7).
- **Baskın + ikincil gösterim** tek alanlı şemayla (`schema.prisma:997`) çelişiyor. Hangi seçenek kazanırsa kazansın ikincil arketip için alan ya da hesap gerekecek.
- **ARK'ın kendi örnekleri kimlik dili kullanıyor** ("Sen bir Limansın", `ARK:55,87,281`), oysa ilke "bu bir eğilim" (`ARK:149`). Kart metinleri yazılırken düzeltilmeli.

**KARAR-46'ya ek:**
- **C seçeneğinin gerekçesi düzeltilmeli.** "Ters puanlanan senaryo canlıda kalır" ifadesi Gizlilik B için doğru değil: orada bir kademe kayma var ve geçme/kalma sonucu değişmiyor (§4.4a).
- **Gerçek riskler başka yerde:**
  - Kültürel B tersliği (§4.4b)
  - Kriz'de "yanında olurum" şıkkının canlıda geçmesi (§4.4c)
  - Seed'in kendi "değil-e yakın" dediği 2 puanlık şıkların geçmesi (§4.4d)

  C seçilirse bunların hepsi canlıda kalır. B ("önce 4 red-line") seçilirse Kriz ve Gizlilik düzelir, Kültürel B kalır.
- **Taşıma turunun kontrol listesi:**
  - `{sert_n}` ham metin riski
  - KALEM 18 koruması
  - `internalNote` doldurma
  - O3 sayımının 5/5'e düzeltilmesi
  - "Konu 9"un dört anlamı (slug eşlemesi numarayla değil adla yapılmalı)
  - FAZ6 doğru şıklarının %80'inin ikinci konumda olması (karıştırma olmazsa tahminle bulunur)
- **88 sayısı yalnız O-serisine ait.** Kod yorumu (`certification.service.ts:69`) ve commit `43d15dc` seed'den ileri gidiyor.

**Mutabakat KARAR-??-D (terim) kartına ek:** §5'teki FE/BE sayımları. Kullanıcı "mizaç" (15), admin ve hukuki metinler "karakter" (8), belgeler "karakter/kişilik" (25 / 14) diyor. Kart, KVKK ve gizlilik metinlerindeki "karakter değerlendirmesi" ifadesini de kapsamalı (hukuki metin → KARAR-47 ile koordinasyon).

**Mutabakat KARAR-??-B (çekirdek) kartına ek:** "Şu an ne var" kısmına `/disc-test` 32 Likert yolu ve pano widget'ı eklenmeli (Y-2).

---

## 9. KAPSAM SONUCU

**TAM KAPSAM: EVET.** Görevdeki 5 okuma kalemi ve A-E bölümlerinin hepsi alt-ajanlarca son satırına kadar okundu. Okunmayan dilim yok.

Açık kalan, **doğrulanamayan** noktalar (okuma eksikliği değil, erişim sınırı):
1. `docs/gelen/Yeni Metin Belgesi.txt` (28.599 bayt): git'te ve bulutta yok, içeriği bilinemiyor.
2. Canlı DB'deki DISC ve sertifika soru sayısı: bulutta DB erişimi yok (TO-?? PO elle).
3. FE terim sayımları yaklaşık ±%5. Satırlara bölünmüş bazı JSX metinleri kaçmış olabilir. Tutarsızlık **noktaları** dosya:satırıyla kesin.

**Belge senkronu:** Gerekmedi. Bu tur salt-okuma bir PLANLA turu. `docs/otonom/`, `docs/kararlar/` ve `CLAUDE.md`'ye yazılmadı. Tek çıktı bu dosya.
