> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-23 (📸 fotoğraf tarihi) · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)

# İÇERİK KALİTESİ KONSEYİ — Bölüm A–D, F, G

> **📸 DONDURULMUŞ — 2026-09-23.** Plan değildir; bulguları kuyruğa işlendikten sonra güncellenmez.
> **Mod:** 🟩 PLANLA niteliğinde (salt-okuma; hiçbir ürün kodu/şema/seed değişmedi, hiçbir dosya silinmedi).
> **Tür:** 📸 keşif çıktısı · **Şerit/dal:** `otonom/CN-icerik-kalitesi-20260923` · **Önek:** IK-01…IK-13
> **Kapsam:** `docs/raporlar/icerik/` (17 belge + `bolumler/` 5 belge) · `docs/kararlar/konu/03-psikometri-ve-algoritma.md` · kullanıcıya görünen frontend metinleri · say için kod (`backend/prisma/seed*.ts`, `backend/src/services/*`, `backend/src/controllers/onboardingController.ts`, `frontend/src/**`).
> **⛔ E bölümü tekrar edilmedi:** araştırma brifleri (B-1…B-8) `konsey-icerik-kalitesi-E-arastirma-brifleri-2026-09-23.md`'de; bu rapor **A, B, C, D, F, G**'yi teslim eder. E'nin bulduğu 5 tekrar-yasaklı kaleme yalnız **atıf** verildi (kararsızlık bandı 40-60 kodda yok · SJT "en az" payda asimetrisi · seed 4-şık vs banka 3-şık · uyarlama baskın-boyut vs bulanık-boyut · +1/−0,5 gerekçesizliği).
> **Yöntem:** her sayı bu turda paralel alt-ajanlarla tek tek elle sayıldı; önceki raporların sayısı kopyalanmadı (KURAL 16). Ana ajan yalnız yapılandırılmış özetleri birleştirdi.

---

## 0. ⭐ ÖNCE OKU — dört cümle

1. **Bu turun bulgularının kökü tektir: içerik yazılmış ama koda BAĞLANMAMIŞ.** 8 arketip kartı, 8 yaklaşım metni, 4 "şimdilik" varyantı, 39 senaryoluk karakter bankası (117 şık) ve sertifikanın 11-konu/88-şık sürümü — **hiçbiri canlıda yok.** Canlı sistem eski 8 hardcoded DISC sorusu + 3 SJT senaryosu + 4 DISC kartı (Öncü/Ateşleyici/Yapı Taşı/Kâşif) + soyut OCEAN kodları (M1-M4/m1-m4) ile çalışıyor. Yani içerik kalitesi denetiminin çoğu **"yazılan iyi mi" değil "yazılan neden ürüne girmedi"** sorusudur.
2. **İçeriğin editoryal Türkçesi genelde temiz ve titiz** (özellikle senaryo bankası: 9 yazım kuralı + eksen-kayması yakalamaları). Ana kusurlar yazım değil: (a) **kalibrasyon gerekçesizliği** (eşik/ağırlık sayılarının kaynağı yok), (b) **kod↔belge kopukluğu ve çelişkisi**, (c) **canlı kartın "Sen bir Öncüsün!" damgalayan dili** belgenin kendi "eğilim, kimlik değil" ilkesiyle çelişiyor.
3. **Kuyrukta karakter senaryo bankasının (39/117) karşılığı YOKTUR** — grep ile teyit edildi (§F). En yakın satır F-09 "12 SJT senaryo" ama o başka sistem (kodda 3 SJT senaryosu var). Belge 39 diyor, kodda 0.
4. **İki koda-gömülü yazım hatası canlıda görünür:** `seed.ts:537` "**Menteen**" (İngilizce "mentee" sızması) ve `seed.ts:69` "**doğal bir güçlüğüm**" ("güçlü yanım" olmalı; "güçlüğüm" anlamı tersine çeviriyor). İkisi de doğrulandı.

---

## 1. SAYIM — birleşik envanter (kendi sayımım, birim belirtildi)

| Kalem | Belgede kaç | Kodda kaç | Kanıt |
|---|---|---|---|
| DISC ölçümü — Likert (seed) | — | **32 soru** (8D+8I+8S+8C, 1-5 ölçek) | `backend/prisma/seed.ts:30-184` |
| DISC ölçümü — canlı onboarding | belge "ölçek yok, 3 şık" | **8 soru × 4 şık** (tek seçim) | `onboardingController.ts:109-190` (id 1–8 doğrulandı) |
| SJT senaryosu | F-09 hedef "12" | **3 senaryo** (CORE_01 mentör, CORE_01 menti, FOLLOWUP_N_01) | `seed.ts:530-573` (3 `code:`, biri `triggersOn:'n'`) |
| SJT şık | — | **12 şık** (3×4) | `seed.ts:538-571` |
| Karakter senaryo bankası (Big Five, MOST_LEAST) | **39 senaryo · 117 şık** (5 çekirdek + 34 havuz; U5/A7 bilinçli boş) | **0** (koda hiç geçmemiş) | belge: `senaryo-bankasi-2026-09-03.md:3,30-31` (belge kendisi "BU BELGE KODA GEÇMEDİ" der) |
| Sertifika konu | **11** | **10** | belge `sertifika-oturum3-4-konu-2026-09-08.md:10` ↔ kod `seed-certification.ts` (10 distinct `topic:`) |
| Sertifika senaryo | **22** | **20** (CERT_T01_A…T10_B) | kod doğrulandı (20 `CERT_T*` bloğu) |
| Sertifika şık | **88** | **80** (20×4) | belge `oturum1-4:320,398` · `oturum3:480,487` ↔ kod |
| Mentör arketip kartı | **4** (Mimar/Ayna/Liman/Pusula) | **0** isimli (canlı: 4 DISC kartı + soyut M1-M4) | `arketip-ve-yaklasim-icerigi-2026-09-03.md:153,167,181,195` ↔ `disc-to-ocean.adapter.ts:27-43`, `onboardingController.ts:63-102` |
| Menti arketibi | **4** (Rotacı/Kâşif/Denge Arayan/İz Açan) | **0** isimli (soyut m1-m4) | `arketip-…:209,223,237,251` ↔ `disc-to-ocean.adapter.ts:39-43` |
| Yaklaşım (#31) metni | **8** (4 mentör + 4 menti) | **0** | `arketip-…:324-402` |
| "şimdilik" varyantı | **4 — yalnız MENTÖR** (menti sürümü yazılmamış) | **0** | `arketip-…:271,279,287,295` |
| Öğrenme aşaması — mentör | belge içi çelişki: bir yerde **8**, bir yerde **7** | **7** (M1-M7) | `menti-yolculugu-…:19` "8" ↔ `04-ogrenme-kurumozel.md:6` + seed `seed-learning-journey.ts` (7) |
| Öğrenme aşaması — menti | tasarım **5** | **6** (T1-T6) | `menti-yolculugu-…:71-171` (5) ↔ seed (6) |
| Eşleşme detay Bölüm-2 kombinasyon metni | **16 hedef · 1 yazılı** | render tek cümle `compatibilityReason` | `menti-yolculugu-…:285,391` ↔ `menti/page.tsx:318` |

> ⚠️ **İki ayrı "16'lık matris" karışıklığı:** `eslesme-uyum-po-inceleme-2026-08-26.md:22-53` DISC harfleri (D/I/S/C) üzerinden 16 kombinasyon verir; yeni tasarım (`menti-yolculugu-…:273`) **isimli arketipler** üzerinden 16 der. İkisi **aynı şey değil**; belgeler ilişkiyi kurmuyor, okuyucu aynı sanabilir.

---

## A — YAZIM KALİTESİ

### A.1 TON — kullanıcıyı küçültme / damgalama
- ⚠️ **CANLI KOD damgalıyor (en kritik):** `frontend/src/app/onboarding/_steps/ResultStep.tsx:38-42` → **"Sen bir {archetype}sın!"** + `onboardingController.ts:67` → "**Sen bir Öncüsün!** Cesur, sonuç odaklı…". Bu, belgenin kendi ilkesiyle **doğrudan çelişir**: `arketip-ve-yaklasim-icerigi:149` "Sen busun **değil**, bu bir eğilim". Kimlik dayatan dil Barnum/etiketleme riski taşır (E B-6 · KARAR-48).
- ⚠️ **Aynı damgalayan metin panelde İKİNCİ kez:** `frontend/src/components/organisms/DiscRecallCard.tsx:56-58` yine "Sen bir {archetype}sın!" (E yalnız ResultStep'i anmıştı; ikinci mount noktası burası).
- Belge kartları ilkeye uygun (davranış anlatır, kimlik dayatmaz) — sorun belgede değil, canlı kartta.
- Sertifika tarafında kullanıcıya görünen damgalayan metin **yok**; ancak `certification.service.ts` config'i mentörü "**geride kalan**" diye 3 gün sonra admin'e bildiriyor (`adminNotifyAfterDays:3`, `03-sertifika.md:38`) — kullanıcıya görünmez ama ton notu.

### A.2 NETLİK
- `tam-soru-dokumu-2026-08-26.md:95` DISC C20 "Kalite, hız veya miktardan her zaman daha önce gelir." → cümle yapısı kırık; kullanıcı ne kadar katılacağını kestiremez (belge de işaretlemiş).
- Belge arketip kartlarında "sonra ne yapayım" eylem çağrısı yok (tasarımca #31 yaklaşım metnine bırakılmış; kart tek başına görülürse boşlukta).

### A.3 TÜRKÇE / çeviri kokusu (koda gömülü, canlıda görünür)
- ⚠️ `backend/prisma/seed.ts:69` (I9 sorusu): "…doğal bir **güçlüğüm** gibi hissettiriyor." → "güçlü **yanım**" olmalı; "güçlüğüm" = zorluğum, **anlamı tersine** çeviriyor. **DOĞRULANDI.**
- ⚠️ `backend/prisma/seed.ts:537` (SJT1): "**Menteen**, haftalardır…" → "Mentin/Menti'n" olmalı; İngilizce "mentee" yazımı Türkçe metne sızmış. **DOĞRULANDI.**
- `seed-certification.ts:132,252`: "Kabul edilebilir **değil-e yakın**" → tuhaf tireleme, anlam belirsiz (canlıya giden metin).
- Belge Türkçesi genel olarak temiz; frontend kullanıcı metinleri (ResultStep, DiscNoPressureNote) akıcı ve doğru.

### A.4 KİŞİ ADI (⚠️ CLAUDE.md "Kişi Adı Yasağı" ile ilişkili — PO kararı gerektirir)
- **Öğrenme yolculuğu senaryolarında sabit gerçek adlar, koda gömülü:** mentör hep **"Zeynep"**, menti hep **"Deniz"** (`seed-learning-journey.ts`; belge `sorular-po-inceleme-2026-08-26.md:326-405` + `04-ogrenme-kurumozel.md:22,116`). Belge isim-değişkeni (`{mentor_*}`) altyapısı öngörüyor ama **kod bunu uygulamamış** — seed edilirse ham ad görünür.
- Sertifika/senaryo bankasında kullanıcıya görünen kişi adı yok (iyi). Not: bu adlar **persona** (kurgusal); yasak PO/geliştirici adını kastediyor — kapsam belirsiz, **PO kararı**.

### A.5 UZUNLUK
- Belge kartları/şıkları ekran için uygun (~90-110 kelime).
- ⚠️ Canlı `ResultStep` tek ekrana çok blok istifliyor (ikon+başlık+süperGüç+açıklama+4 chip+3'lü grid+gelişim+paylaş+devam) → mobilde yoğun; "ödül anı, sade" ilkesiyle gerilimde.

---

## B — ÖLÇME YÖNTEMİ İÇ TUTARLILIĞI

> ⚠️ Psikometrik GEÇERLİLİK doğrulanamaz (uzman işi, → G). Aşağısı yalnız **iç tutarlılık**tır; bilimsel hüküm verilmedi.

### B.1 BOYUT DENGESİ (Big Five: O/C/E/A/N)
**Koddaki SJT (3 senaryo, 12 şık) sinyal dağılımı** (sıfır-olmayan ağırlık = 1 sinyal, `seed.ts:538-571`):

| Boyut | Sinyal sayısı |
|---|---|
| Açıklık (O) | 6 |
| Dışadönüklük (E) | 7 |
| Uyumluluk (A) | 7 |
| Sorumluluk (C) | 5 |
| **Duygusal Denge (N)** | **4** |

→ ⚠️ **ŞÜPHELİ:** 3 senaryoyla 5 boyut ölçülüyor; **Duygusal Denge en az sinyalli (4)** — üstelik FOLLOWUP senaryosu (S3) SADECE n için varken (`seed.ts:563` `triggersOn:'n'`). PO'nun özellikle sorduğu iki boyut: **Açıklık bol (6), Duygusal Denge kıt (4)** — dengesiz.

**Senaryo bankası (39 senaryo)** ise dengeli (Uyumluluk 8 · Duygusal Denge 7 · Sorumluluk 7 · Açıklık 6 · Dışadönüklük 6, gerekçeleri yazılı `senaryo-bankasi:133,201,248,291,333`) **ama kodda değil** (→ D/F).

### B.2 AĞIRLIKLAR
- ⚠️ **ŞÜPHELİ — büyüklük ölçeği tutarsız:** ağırlıklar {−3…+3} aralığında ama gerekçesiz farklı büyüklük: `seed.ts` S1-C `a:+3` (en güçlü uyumluluk) vs S1-B `a:+1` — neden C üç kat A? Kalibrasyon gerekçesi kodda/belgede yok (`tam-soru-dokumu:49` "psikometrik gerekçe belgelenmemiş/sezgisel").
- DISC tarafı iç tutarlı: Likert→ağırlık `adaptiveTestEngine.ts:25-27` doğrusal `{1:0…5:1.0}`, her soru kendi boyutuna pozitif.

### B.3 TERS KODLAMA
- ⚠️ **DISC'te ters-kodlanmış madde YOK** — `bolumler/01-disc.md:18` "ters kodlanan soru yoktur"; `tam-soru-dokumu:93` "32 sorunun hepsi pozitif yön → acquiescence/sosyal beğenilirlik ölçülemez". Sistematik boşluk (iç tutarlılık gözlemi, hüküm değil).
- SJT'de ters-**işaretli** ağırlık var (boyutun iki yönü); senaryo bankası sosyal-arzuya karşı **tasarım** önlemi taşıyor ("doğru cevap kokusu yasak", `senaryo-bankasi:52`).

### B.4 MOST/LEAST "en az" katsayısı
- Kodda tek MOST_LEAST senaryo var (S3); katsayı `sjt-scorer.ts:72` çıplak `−0.5` — **kod-içi gerekçe yorumu yok** (yalnız `03-psikometri:34` "sinyali güçlendirir", NEDEN 0.5 açıklanmamış). E raporu gerekçesizliği bulmuştu; ek olarak **kod-içi yorum eksikliği** (`sjt-scorer.ts:70`).

### B.5 EŞİK DEĞERLERİ — gerekçesiz liste
| Eşik | Değer | Kanıt | Durum |
|---|---|---|---|
| Sertifika geçme oranı | 0.8 | `certification.service.ts` CERT_CONFIG | ⚠️ gerekçe yok (atıf: E) |
| Min aktif konu | 5 | CERT_CONFIG | ⚠️ **GEREKÇESİZ** — 10 konu varken neden alt sınır 5? |
| Cooldown öncesi deneme | 2 | CERT_CONFIG | ⚠️ **GEREKÇESİZ** + semantik çelişki: belge `faz6:176` "**günde** 2" ↔ kod `service:227` "her 2 başarısız denemede" |
| Cooldown süresi | 24 saat | CERT_CONFIG | ⚠️ **GEREKÇESİZ** |
| Admin bildirim | 3 gün | CERT_CONFIG | ⚠️ **GEREKÇESİZ** |
| Arketip eşiği | HIGH 60 / MID 55 / LOW 45 | `scoring.config.ts:31` | ⚠️ gerekçe yok (atıf: E) |
| Kişilik ağırlığı | %12→%25 (≥4 sinyal) | `senaryo-bankasi:48` | ⚠️ eşiklerin kaynağı yok |

### B.6 SERTİFİKA 0-3 PUANLAMA
- ✅ **20/20 senaryoda tam bir `3` ve tam bir `0` var** (elle doğrulandı); kısmi puanlar (1,2) mevcut ve ayrışıyor.
- ⚠️ **ŞÜPHELİ — kod↔belge puan çatışması:** `seed CERT_T05_A D` score **2** ↔ belge `oturum1-4:314` bu bandı **2→1** düşürdü; `seed CERT_T10_B D` score **2** ↔ `oturum1-4:315` "kriz K10-VarB D(2)→1". Kod hâlâ **2** basıyor — özellikle **kriz (red-line) senaryosunda "zarara yakın" şık `>=2` ile GEÇİRİYOR.** İçerik kararı seed'e yansımamış.
- ⚠️ `certification.service.ts:72-73` `isFirstAttemptPass(competencyScore, isRedLine)` **`isRedLine` parametresini kullanmıyor** (`return competencyScore >= 2`) — red-line farkı ilk-deneme eşiğinde artık yok, ölü parametre (yanıltıcı imza).

### B.7 AKIŞ (adaptif)
- ⚠️ **İki ters kural** (tasarım çelişkisi, teknik karar): canlı `adaptiveTestEngine.ts:9-14` **baskın boyutu** derinleştiriyor; belge `senaryo-bankasi:47` **bulanık boyutu** istiyor (atıf: E). Kararsızlık bandı (40-60) kodda yok (atıf: E).

---

## C — BAĞLAMI ZAYIF / GEREKÇESİZ / ŞÜPHELİ KISIMLAR

| Dosya:satır | Etiket | Bulgu | Netleşme için gerek |
|---|---|---|---|
| `senaryo-bankasi:45` | ⚠️ GEREKÇESİZ | "5 sabit + 10 adaptif = 15" — 10'un neden 10 olduğu yazılı değil | PO/psikometri |
| `senaryo-bankasi:48` | ⚠️ GEREKÇESİZ | "%12→%25 (≥4 sinyal)" eşiklerinin kaynağı yok | pilot veri/uzman |
| `senaryo-bankasi:336` | ⚠️ GEREKÇESİZ | Dışadönüklük "kişiliğin %1'i" — %1/%3/%8 boyut ağırlıklarının kaynağı yok | uzman/kaynak |
| `arketip-…:62-63` | ⚠️ GEREKÇESİZ | Kişilik içi dağılım %8/%7/%6/%3/%1 — 5 sayının %25'e nasıl bölündüğü belgesiz | uzman |
| `scoring.config.ts:38-44` | ⚠️ GEREKÇESİZ | `COMPATIBILITY_MATRIX` {100/60/30} — hangi çift neden 100 türetimi yok | uzman/pilot |
| `scoring.config.ts:33-36` | ⚠️ ŞÜPHELİ | `BLOCKED_PAIRS` (kod: M4→m3, M1→m4) ile belge (`03-psikometri:26` D-mentör+S-menti, M3-m3) **tutmuyor**; canlı DISC anti-match'i de farklı | PO/kod teyidi |
| `disc-to-ocean.adapter.ts:24-28` | ⚠️ GEREKÇESİZ | DISC→OCEAN 5×4 matris (20 katsayı) psikometrik atıf yok; `scoring.config.ts:1-4` "pilot veri biriktikçe güncelleyin" diye dolaylı itiraf | uzman (G-5) |
| `certification.service.ts:72-73` | ⚠️ ŞÜPHELİ | `isRedLine` parametresi hiç kullanılmıyor — ölü/yanıltıcı imza | kod yorumu/temizlik |
| `oturum1-4:183-185,402` | ⚠️ BAĞLAM YETERSİZ | Kriz konusu "HUKUKİ TEYİT BEKLİYOR" ama seed metni (`CERT_T10_A/B`) canlıya hazır — avukat onayı belirsiz | hukuki teyit |
| `oturum3:391-412` | ⚠️ ŞÜPHELİ | Gizlilik red-line ama öğrenme yolculuğunda öğretilmiyor → "öğretilmemiş konuda eleme" | PO kararı |
| `03-sertifika.md:21,362` | ⚠️ ŞÜPHELİ | "Canlı senaryo sayısı ⏳ TEYİT GEREK" — kod 20, canlı bilinmiyor, güvenli seed runner yok | seed teyidi |
| `senaryo-bankasi:387` | ⚠️ ŞÜPHELİ | "P3 SORUNU çözülmedi" — her boyutta ortada olan kişide arketip çıkmıyor, çözüm ⬜ | PO (arketip kartı turu) |
| `disc-to-ocean.adapter.ts:41-42` | ⚠️ ŞÜPHELİ | Menti `m1` hem gerçek kural hem fallback → `m1` = çöp kutusu; belge (Rotacı) net eğilim gibi sunuyor | kod/PO |

---

## D — EKSİK İÇERİK

### D.1 / D.2 — Tasarımı var, metni/kodu yok (⬜)
- **Karakter senaryo bankası (39/117) KODA HİÇ GEÇMEMİŞ** — en büyük eksik; canlı hâlâ 8 hardcoded DISC (`onboardingController.ts:109-190`). Belge kendisi der: "BU BELGE KODA GEÇMEDİ" (`senaryo-bankasi:30`).
- **8 arketip kartı metni + 8 yaklaşım (#31) metni koda hiç geçmemiş** (motor da ölü — I-13 OCEAN 100× ölçek hatası).
- **Menti "şimdilik" varyantları HİÇ yazılmamış** — 4 varyant yalnız MENTÖR için var (`arketip-…:271-295`); menti sürümü sadece talimat (`:269`). Frontend'de "şimdilik" arketip dili yok (`ResultStep` herkese kesin dil).
- **Eşleşme detay Bölüm-2: 16 kombinasyondan 15'i yazılmamış** (`menti-yolculugu-…:285,391`); detay rotası da yok.
- **Sertifika 11-konu/88-şık sürümü seed edilmemiş** — kod eski 10/20/80'de; üç oturum belgesi kendi sonunda "seed'e girmedi" der (`oturum1:408`, `oturum2:394`, `oturum3:529`).
- **İç notlar (`internalNote`) şemada yok** — migration bekliyor (`oturum3:506,527`, madde 163); risk: `explanation`'a sızarsa kullanıcı görür.
- **3 kardeş belge yazılmamış** (bkz. D.3).
- **Menti yolculuğunda kriz aşaması yok** (5 aşama: ilk görüşme/anlamama/eleştiri/yapmama/uymayan öneri).

### D.3 — Atıf yapılan ama VAR OLMAYAN belgeler (glob ile 0 dosya doğrulandı)
| Atıf yapan | Beyan edilen kapsam | Durum |
|---|---|---|
| `docs/raporlar/icerik/00-INDEKS.md:48` | `olcme-mimarisi-2026-09-03.md` | ❌ YOK |
| `00-INDEKS.md:49` | `senaryo-denetim-protokolu.md` | ❌ YOK |
| `00-INDEKS.md:50` | `olcme-arastirmasi-2026-09-03.md` (akademik ölçme özeti) | ❌ YOK — fiilen E raporu bu boşluğu dolduruyor (INDEKS bağlamıyor; belge-hijyen adayı) |

### D.4 — Metin yazılmamış rol/akış (⚠️ YANLIŞ SORU TUZAĞI kontrolü yapıldı)
- **Kurum yöneticisi (tenant admin) ekranları:** içerik **VAR** — `frontend/src/app/(admin)/admin/**` altında 17 sayfa (kpi, eslesmeler, havuzlar, certification, invite, algorithm-tuner, waiting-room…), metinler Türkçe.
- **Platform admin ekranları:** içerik **VAR** — `frontend/src/app/platform/**` (dashboard, login, tenants/[id] alt bileşenleri).
- → "rol için hiç metin yok" iddiası bu iki rol için **YANLIŞ olurdu**. Gerçek eksik: arketip "şimdilik" varyantları (D.2) ve eşleşme detay 15 kombinasyon.

---

## F — İÇERİK ENVANTERİ (belge ↔ kod ↔ kuyruk)

Ana envanter tablosu §1'dedir. Kuyruk eşlemesi (`docs/otonom/00-KUYRUK.md` TAM okundu):

| Kalem | Kuyruk satırı | Not |
|---|---|---|
| Karakter senaryo bankası (39/117) | **YOK** | grep teyit: `39`, `senaryo bankası`, `MOST_LEAST`, `çekirdek senaryo` → 0 anlamlı eşleşme |
| SJT senaryo (kod 3, hedef 12) | **F-09** | "12 SJT senaryo + arketip seed" — bu SJT, karakter bankası değil |
| 8 arketip kartı | **I-15** | motoru bağlar; kart METİNLERİ ayrıca taşınmamış |
| 8 yaklaşım metni | (I-11 kısmen) | bağımsız satır yok |
| Mentör/menti öğrenme aşamaları | **K-18** (seed) · **I-17** (gizlilik/bitirme yazımı) · **I-09** (isim değişkeni) | belge/kod aşama sayısı uyuşmuyor |
| Sertifika (88 şık) | **K-16** (seed) · **P-99** (içeriği seed'e taşı) | kuyruk 20/80→88 farkını yakalamış, efor L |
| 4 "şimdilik" varyantı | **I-15** + **IC-10** | menti tarafı hiç yazılmamış |
| Eşleşme detay metinleri | **I-11** | 15/16 kombinasyon eksik |

> ⭐ **DOĞRULANMIŞ NEGATİF (kapsam beyanı: `00-KUYRUK.md`, harf duyarsız, `39`/`senaryo bankası`/`karakter senaryo`/`çekirdek`/`MOST_LEAST`):** Karakter senaryo bankasının (39/117) koda taşınması için **açık bir kuyruk satırı yoktur.** F-09 SJT havuzudur (kodda 3/12), Big Five karakter bankası (39/117, kodda 0) DEĞİL. **Belge 39 diyor, kodda 0, kuyrukta karşılığı yok.**

### F → hazır kuyruk satırları (numarasız, "aday")
1. **[aday] Karakter senaryo bankası (39 senaryo/117 şık) seed'e taşı** 🟡/🔴 — canlı DB → yedek + PO onayı. Ön koşul: Big Five MOST_LEAST için ayrı DB modeli var mı tespiti (kodda `Question` DISC-Likert, `SjtQuestion` SJT var; yeni model gerekirse migration → 🔴).
2. **[aday] 8 arketip kartı metnini koda/seed'e taşı** 🟡 — I-15 motoru bağlar ama kart metinleri hiç konmamış.
3. **[aday] 8 yaklaşım (#31) metnini koda taşı** 🟡.
4. **[aday] Menti öğrenme aşaması sayısı uyuşmazlığını çöz** 🟡 — belge 5, kod 6; hangisi doğru PO kararı.
5. **[aday] Eşleşme detayı 15 kombinasyon metnini yaz** 🟢 (yazım, I-11 ön koşulu).
6. **[aday] Menti "şimdilik" 4 varyantını yaz** 🟢 (IC-10 ile).
7. **[aday] `seed.ts:69` "güçlüğüm" + `seed.ts:537` "Menteen" yazım düzeltmesi** 🟡 — seed dosyası (seed ÇALIŞTIRILMAZ; yalnız metin düzeltme).
8. **[aday] Sertifika kod↔belge puan çatışması (T05_A D, T10_B D score 2→1)** 🟡 — özellikle kriz red-line senaryosu; içerik kararı seed'e yansımamış.

---

## G — UZMAN PAKETİ (psikometri/ölçme uzmanına tek oturumda)

> Ayrım: **E = literatür araştırması** (genel bulgu). **G = bu ürünün kendi verisine/kararına uzman görüşü** (literatür cevaplayamaz; uzman + bizim veri/tasarım cevaplar). Her maddede E ile çakışma yönü belirtildi.

**G-1 · Türkçe ölçme değişmezliği (measurement invariance) sınama protokolü** — 39 senaryo/117 şıkkın Türkçe'de hedeflenen boyutu ölçtüğü hangi örneklem + yöntemle (CFA çoklu-grup / alignment) sınanır, pilot öncesi hangi ön-kontrol? · **Neden:** tüm psikometri iddiasının ön koşulu; senaryolar özgün Türkçe. · **Bekleyen:** senaryo bankası koda geçişi, tüm arketip/eşleşme çıktısı. · **Bedel:** Türkçe'de başka boyut ölçülüyorsa tüm profil sistematik yanlış, hata vermez. · **E ile:** E §6.6 zaten "uzman paketine girmeli" diyor → **tamamen G**.

**G-2 · Eşleştirme kalitesi ölçüt değişkeni (bizim veri hangisi?)** — NPS/yıldız/ilişki süresi/hedef ilerlemesi/görüşme sayısı arasında "eşleşme işe yaradı" için hangisi birincil, hangisi bizim ölçeğimizde güvenilir? · **Bekleyen:** KARAR-44. · **Bedel:** yanlış ölçüt → kalibrasyon döngüsü gürültüye göre öğrenir. · **E ile:** B-2'nin **ürüne-özel ölçüm yarısı** → G; literatür yarısı E'de.

**G-3 · SJT şık ağırlıklarının ampirik anahtara geçiş eşiği** — 117 şıkkın bugünkü **sözel** sinyalini sayısala çevirirken kaç gerçek yanıttan sonra uzman ağırlığından ampirik anahtara geçilmeli, ilk madde analizi ilk-50 verimizle nasıl? · **Bekleyen:** PS-A1, senaryo bankası koda geçişi. · **Bedel:** uzman ağırlığı sonsuza kalır, en net profiller "şimdilik"e düşer. · **E ile:** yöntem E B-5, **uygulama G** (sıralı).

**G-4 · Sertifika 88 şıkkın 1↔2 çizgisi tutarlılığı (iki bağımsız okuyucu)** — 0-3 puanlamanın "geçer/kalır" çizgisi iki uzman okuyucuda ne kadar örtüşüyor, hangi şıklar tutarsız? · **Bekleyen:** KARAR-46, P-99, canlı mentör eleme. · **Bedel:** çizgi tutarsızsa yetkin mentör şansa bağlı elenir + 24s bekletilir. · **E ile:** E B-4 karar tutarlılığı **yöntemini** araştırır; **bizim 88 şıkkın örtüşmesi** → G (E §6.8'de (b) olarak işaretli).

**G-5 · DISC↔Big Five ağırlık matrisimizin (5×4) hücre-hücre denetimi** — `scoring.config.ts:23-29` `DISC_TO_OCEAN_WEIGHTS` "seçilmiş"; uzman hangi hücrelerin savunulamaz olduğunu işaretler mi? · **Bekleyen:** KARAR-10 (C), PS-A1/A3, Göç Planı. · **Bedel:** eşleşmenin %40'ı ölçülmemiş kişiliğe dayanır. · **E ile:** ⚠️ **büyük çakışma** — E B-1 ilişkiyi genel araştırır; **bizim matrisimizin denetimi** → G. **Öneri: önce E B-1 dönsün, G-5 uzmana E çıktısı + matris ile sunulsun (sıralı).**

**G-6 · "En az" ters katsayı (−0,5) ve payda asimetrisinin uzman onayı** — E B-5'in bulduğu matematik asimetri düzeltildikten sonra "en az" katsayısı bizim 3-şıklı formatta ne olmalı? · **Bekleyen:** seed 4-şık ↔ banka 3-şık uyumsuzluğu (E §5 Y-d). · **Bedel:** yanlış katsayı sinyal iptali; tutarlı cevaplayan cezalanır. · **E ile:** math bulgusu (Y-a) önce düzeltilir, sonra G-6.

### G ↔ E yönlendirme özeti
- **Tamamen G (E'de yok):** G-1 (Türkçe değişmezlik) · G-2 (bizim ölçüt verisi) · G-4 (88 şık örtüşmesi).
- **E + G sıralı (E önce, çıktısı G'ye girdi):** G-3 · G-5 · G-6. Bunlar E'ye tekrar gönderilmemeli.

---

## HAZIR KARAR KARTLARI (numarasız — PO `01-KARARLAR.md`'ye açar)

### KARAR aday · Eski DISC ölçümü ↔ yeni Big Five senaryo bankası geçiş dönemi [ÜRÜN KARARI]
**Şu an ne var:** Canlıda 8 hardcoded DISC sorusu (`onboardingController.ts:109-190`) + seed'de 32 Likert DISC (`seed.ts:30-184`). Big Five 39 senaryo/117 şık bankası yazılı ama koda hiç geçmemiş; motor da ölü (I-13). **Sorun:** iki ölçüm sistemi çelişiyor (belge "ölçek yok, 3 şık, MOST_LEAST" ↔ kod "1-5 Likert / 4 şık"); banka canlıya çıkarsa eski DISC cevaplı kullanıcıların profili, iki ölçümün bir arada yürüyüp yürümeyeceği, eski `discVector`/`discType` alanlarının akıbeti belirsiz. **Neden ürün kararı:** kullanıcının ölçüldüğü temel araç değişiyor (DISC→Big Five); geçmiş veri anlamı + göç yolu geri dönülmez, migration içerir. **Not:** kuyrukta bu geçişi kapsayan satır yok (I-13 yalnız ölçek hatası, I-15 yalnız motor bağlama).

### KARAR aday · Canlı arketip kartının damgalayan dili [ÜRÜN KARARI]
**Şu an ne var:** `ResultStep.tsx:38` + `DiscRecallCard.tsx:56` "Sen bir Öncüsün!" (kimlik dili) + `ResultStep.tsx:71,97-100` "En İyi Eş" / "…eşleştirileceksin" (kesin gelecek vaadi). **Sorun:** belge ilkesiyle (`arketip-…:149` "eğilim, kimlik değil") ve ürünün kendi invite metniyle (`admin/invite/page.tsx:22` "kimi seçeceğine sen karar veriyorsun") çelişiyor. **Neden ürün kararı:** kullanıcının gördüğü sonuç dilinin tonu (KARAR-48 ile örtüşür; oraya EK). **En somut araştırma-beklemez düzeltme:** "En İyi Eş" + "eşleştirileceksin" tutulamayan vaadi.

### KARAR aday · Öğrenme yolculuğu senaryolarında sabit kişi adları [ÜRÜN + KVKK/kural] 
**Şu an ne var:** "Zeynep"/"Deniz" koda gömülü (`seed-learning-journey.ts`). **Sorun:** CLAUDE.md "Kişi Adı Yasağı" ile ilişki belirsiz (persona mı, ihlal mi); belge isim-değişkeni öngörüyor, kod uygulamamış. **Neden ürün kararı:** kullanıcıya görünen içerikte kişi adı politikası.

---

## 03-PO-ELLE-ISLER'e aday (ajanın yapamayacağı)
- **Hukuki:** kriz/gizlilik sertifika senaryolarının (`CERT_T10_A/B`, red-line) avukat onayı — canlıya çıkmadan (`oturum1-4:183-185`).
- **Uzman:** G-1…G-6 paketinin bir psikometri/ölçme uzmanına iletilmesi.
- **Ürün kararı:** yukarıdaki 3 karar kartı.

---

## BU TURUN PROMPTUNA ELEŞTİRİ

1. **A–D/F/G promptu ile E promptu ayrı oturumlara düştü.** E turu kendi raporunda "A–D/F/G bu oturuma ulaşmadı" dedi; bu tur da E'yi tekrar etmemek için ekstra iş yaptı. **Öneri:** tek konsey promptu tek oturumda, ya da bölümler açıkça "önceki bölüm main'de, atıf ver" talimatıyla.
2. **"kullaniciya gorunen frontend metinleri" kapsamı bulanıktı** — DISC test soruları frontend'de değil backend seed'de (`DiscTestStep.tsx:6` tipi backend'den gelir). Frontend taraması yalnız kart/sonuç/eşleşme metinlerini yakaladı; asıl soru metinleri seed'de. **Öneri:** "kullanıcıya görünen metin" derken kaynağın backend seed olabileceği baştan söylensin.
3. **F bölümü "belge 39 diyor kodda 3 var" beklentisiyle geldi ama iki AYRI sistem var** (SJT 3 senaryo ≠ karakter bankası 39 senaryo). Prompt bunları tek kalem sanıyordu; envanter ikisini ayırınca "kodda 0" gerçeği çıktı. **Öneri:** sayım kalemleri sistem-adıyla ayrışsın (SJT · karakter bankası · DISC).
4. **B (ölçme iç tutarlılığı) ile G (uzman) sınırı prompt içinde net değildi** — "hüküm verme ama tutarsızlığı bul" ile "uzmana sor" arasında bazı bulgular iki yere de yazılabilir. Bu raporda B = iç tutarlılık (math/kod), G = geçerlilik (uzman) diye ayrıldı; prompt bunu baştan tanımlasa iyi olurdu.
5. **"Kişi adı yasağı" kapsamı persona için tanımsız** — A.4 bulgusu net bir ihlal mi yoksa kabul edilebilir kurgu mu, PO kararına kaldı. Prompt "persona adları yasağa dahil mi" diye önceden netleştirseydi bulgu aksiyona daha yakın olurdu.
6. **Bir sonraki içerik turu neye bakmalı:** (a) 117 şıkkın sözel→sayısal ağırlık eşlemesi (F §aday-1'in ön koşulu), (b) sertifika kod↔belge puan çatışmasının tam listesi (T05/T10 dışında kaç senaryo), (c) menti "şimdilik" 4 varyantının yazımı (B-6 kuralları geldikten sonra), (d) `internalNote` migration'ının (madde 163) durumu.

---

## KAPANIŞ — TAM KAPSAM BEYANI

- **A (yazım):** ✅ 6 içerik ailesi + frontend tarandı. Kapsam: `docs/raporlar/icerik/**` + `frontend/src/**` (harf duyarsız grep).
- **B (iç tutarlılık):** ✅ SJT boyut dağılımı elle sayıldı; sertifika 20/20 puanlama elle doğrulandı; 7 eşik listelendi.
- **C:** ✅ 13 bağlam-zayıf kalem üç etiketle.
- **D:** ✅ eksik/hayalet/rol taraması (yanlış soru tuzağı kontrolü yapıldı).
- **F:** ✅ envanter tablosu + kuyruk eşlemesi + doğrulanmış negatif (39 senaryo kuyrukta yok).
- **G:** ✅ 6 uzman maddesi, E ile çakışma yönleri belirtildi.
- **Okunmayan dilim:** yok — 5 paralel alt-ajanla tüm içerik belgeleri + say için kod okundu. Kısmi okuma yapılmadı.
- **⛔ Dokunulmayanlar:** ürün kodu · şema · seed · KARAR CEVAP satırları · `docs/otonom/` · hiçbir şey silinmedi.
- **Belge senkronu:** iş kaynağı tek kuyruk (CLAUDE.md "AKTİF İŞ KAYNAĞI TEKTİR"); bu rapor bulguları **aday**dır, kuyruğa devir PO'nun ana prompt turunda yapılır. 09-DURUM/10-yol/00-KARAR-TAKIP güncellenmedi.
