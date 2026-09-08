📸 DONDURULMUŞ · 2026-09-08 · salt-okuma keşif · kod DEĞİŞMEDİ

# Faz 5 Veri Akışı Keşfi — Üç DISC yolu + ağırlık modeli (2026-09-08)

> 🔒 İki salt-okuma turunun (12 dk derin keşif + 4 dk doğrulama)
> kod-kanıtlı bulguları. Önce yalnız sohbetteydi.
> **Kod/DB/şema DEĞİŞMEDİ; DB'ye komut gitmedi.**
> Okunan dal: `docs/sertifika-oturum1-2026-09-08` · HEAD `fdd0529`
> Çelişki olursa **KOD KAZANIR** (KURAL 10).
>
> **⭐ EN DEĞERLİ BULGU:** DISC verisi için ÜÇ ayrı giriş yolu var;
> yalnız BİRİ OCEAN motorunun okuduğu alanı dolduruyor. Faz 5'in
> "OCEAN'ı onboarding'e bağla" işi tek çağrı eklemek DEĞİL.

---

## §A — ÜÇ DISC GİRİŞ YOLU (asıl bulgu)

DISC verisi iki ayrı modele yazılabiliyor:
- `User.discVector` (`schema.prisma:328`, `Json?`) — canlı
  `matching.ts`'in okuduğu alan
- `UserProfile.discD/discI/discS/discC` (`schema.prisma:988-991`,
  `@default(0)`) — OCEAN motorunun okuduğu alan
  (`scoring.service.ts:92-96`)

Ama bu ikisini birlikte yazan tek kod `recalcDiscVector`'dır.

| Yol | Giriş noktası | `User.discVector` | `UserProfile.discD..C` |
|---|---|---|---|
| **1. Klasik soru yanıtlama** | `POST /respond` + tekil yanıt → `questionController.ts:314` ve `:378` → `recalcDiscVector` | ✅ `discVectorService.ts:145-148` | ✅ `discVectorService.ts:152-156` |
| **2. Adaptif test** | `POST /users/:id/adaptive-test/answer` → `adaptiveTestEngine.ts:236-243` | ✅ `:240` | ❌ (dosyada `userProfile` = 0 sonuç) |
| **3. Onboarding DISC quiz** | `submitDisc` → `onboardingController.ts:474-489` | ✅ `:478` | ❌ (yalnız `User` update; `recalcDiscVector` çağrılmıyor) |

**`UserProfile.discD..C`'ye yazan TÜM noktalar (kapsam tam):**
- `discVectorService.ts:154-155` — `recalcDiscVector` (tek gerçek
  yazıcı; kod yorumu `:150` "skorlayıcının kullandığı kaynak")
- `gdprService.ts:116` — anonimleştirme sıfırlaması (`discD: 0` ...)

**Okuyan:** yalnız `scoring.service.ts:92-96`
(`computeAndStoreProfile` girdisi).

**`User.discVector` okuyanlar (canlı, önemli):** `matching.ts:164`,
`:286`, `:364`, `:400` (eşleştirme menti vektörü) · `discLetters` /
`analyticsEngine` (harf/analitik) · admin/auth (PII-maskeli harf).

### ⭐ Sonuç: `computeAndStoreProfile` bugün çağrılsa ne olurdu?

**Yola bağlı, üç farklı sonuç:**

1. **Yol 1'den gelen kullanıcı** → GERÇEK SKOR. Zincir sağlam:
   `questionController:314/378` → `recalcDiscVector` →
   `UserProfile.discD..C` (`:152-156`) → `scoring.service:92-96` okur.
2. **Yol 2/3'ten gelen, `UserProfile` satırı VAR** → TÜMÜ 50.
   `discD..C` = `@default(0)` → `discToOcean(0,0,0,0)` →
   `clamp(50+0)` → beş boyut da 50, **ayrışma yok**.
3. **Yol 2/3'ten gelen, `UserProfile` satırı YOK** → HATA.
   `computeAndStoreProfile:87-90` `findFirst` → throw
   "UserProfile bulunamadı".

### ⚠️ VERİ TUTARSIZLIĞI UYARISI (PO, 2026-09-08)

Üç yolun hepsi canlıda açıksa kullanıcılar arasında **SESSİZ
tutarsızlık** var — kimin `UserProfile.discD..C`'si dolu, kimin boş,
kullanıcının hangi yoldan geldiğine bağlı. OCEAN açıldığında bu üç
farklı sonuç üretir (gerçek skor / tümü-50 / hata).

**Faz 5 (k) "geriye dönük OCEAN" kaleminin kapsamı BÜYÜYOR:** mesele
yalnız 6 test kullanıcısı değil, **HANGİ YOLDAN GELENLER** meselesi.

⚠️ Canlı doluluk **❓ TEYİT GEREK** (DB sorgusu yasak).

---

## §B — AĞIRLIK MODELİ: JSON, MIGRATION YOK

**Depolama:** `Tenant.tenantVocabulary` (`schema.prisma:186`, `Json?`)
içinde `algorithmWeights` anahtarı (`algorithmTuner.ts:131`, `:171`,
`:255`). Ayrı kolon YOK.

→ **3. ağırlık bileşeni MIGRATION GEREKTİRMEZ.** JSON şemasız; yeni
anahtar eklenir. Kilit **KODDA**, veri modelinde değil.

**Ağırlık fonksiyonları — hepsi 2 bileşen varsayıyor:**

| Fonksiyon | Satır | Ne yapar |
|---|---|---|
| `AlgorithmWeights` tipi | 21-26 | `sectorWeight` + `discWeight` |
| `validateManualWeights` | 59-92 | doğrular, `disc = 1 - sector` türetir (`:81`) |
| `setManualWeights` | 106-135 | `{sector, disc}` JSON'a yazar |
| `getAlgorithmWeights` | 165-174 | JSON okur, fallback DEFAULT |
| `getLastWeightChange` / `WeightChangeInfo` | 186-243 | audit: önceki/yeni sector+disc |
| `tuneScoringWeights` | 272-334 | auto-tune: yalnız sector ayarlar, disc türetir (`:314`) |
| `applyPendingAdjustment` / `reject` / `runGlobalTuning` | 363-451 | `AlgorithmWeights` üzerinde çalışır |

**`discWeight = 1 - sectorWeight` türetmesi 3 noktada:** `:53` (yorum)
· `:81` (aktif, doğrulama) · `:314` (aktif, auto-tune). Bu bir
**doğrulama + türetme kuralı** ("toplam HEP 1.00", `:53-56`), veri
modeli kısıtı DEĞİL.

**Varsayılan ve sınırlar:** `algorithmTuner.ts:28-30`
`DEFAULT_WEIGHTS {0.60 / 0.40}` · `:35`/`:52` `MIN_SECTOR=0.40`,
`MAX_SECTOR=0.70` · `scoring.ts:89-90` saf-fonksiyon fallback ·
`scoring.config.ts:48` `WEIGHTS {SECTOR:0.6, CHARACTER:0.4}` (uyku
motoru) · `matching.ts:38` hata düşüşü 0.6/0.4 ·
`scoring.test-cases.ts:8`, `:93-112` test beklentileri.

### %45/%30/%25'e geçilirse KIRILACAK 8 nokta

1. `algorithmTuner.ts:21-26` — tip yalnız 2 alan
2. `algorithmTuner.ts:81` — `disc = 1 - sector` → 3-yönlü toplam kuralı
3. `algorithmTuner.ts:294-314` — auto-tune yalnız sector ayarlar,
   `:314` türetir
4. `scoring.ts:108` — `computeTotalScore` formülü 2 terim
   (`sector*sw + disc*dw`)
5. `algorithmTuner.ts:186-241` — audit yalnız 2 ağırlık izler
6. `algorithmTuner.ts:106-109` — `setManualWeights` imzası
7. `adminController.ts:848-859` — body `{sectorWeight, discWeight}`
8. FE `algorithm-tuner` — tek slider (sector), disc türetilir
   ⚠️ **FE bu turda okunmadı (❓)**

**Negatif teyit:** `characterWeight` · `oceanWeight` ·
`personalityWeight` · `thirdWeight` · `weight3` — harf duyarsız,
`backend/src` → **0 eşleşme.** 3. ağırlık kavramı kodda yok.

**Güven rampası %12→%25 — NEGATİF, kanıtlandı.** KAPSAM:
`backend/src` + `frontend/src`, `.ts`/`.tsx`, harf duyarsız — `0.12`
= 0 · `rampa` = 0 · `ramp` = 0 · `confidence.*ramp` = 0 ·
`güven.*ramp` = 0. Mevcut `confidence`: `scoring.ts:110`
(`mentiVector.confidence ?? 0.5`) ve adaptif motorda tamamlanma oranı
— ikisi de boyut-belirsizliği rampası DEĞİL.

---

## §C — ⭐ DOĞRULAMA TURU: §4.4 çelişkisi nasıl çözüldü

**Çelişki neydi:** 12 dakikalık keşfin §4.4'ü kendi içinde iki şey
birden söyledi —
(a) "Onboarding DISC'i `discVectorService.ts:154` ile
    `UserProfile.discD/I/S/C`'ye yazar" (**koddan**)
(b) "Onboarding `User.discVector`'a yazar → çağrılsa bile tüm
    boyutlar 50'ye eşitlenir" (**`00-KARAR-TAKIP:189` notundan**)

İkisi aynı anda doğru olamazdı. Kural: **kod kazanır.**

**Çözüm — ikisi de kısmen doğruydu, çünkü iki FARKLI yoldan
bahsediyorlardı:**
- (a) `/respond` soru-yanıt akışını tarif ediyordu → orada
  `UserProfile.discD..C` GERÇEKTEN doluyor
- (b) onboarding DISC quiz'ini tarif ediyordu → orada GERÇEKTEN
  dolmuyor

§4.4 bu iki yolu tek "onboarding" sanıp birbirine karıştırmıştı.
Doğrusu §A'daki üç yollu tablo.

### Çürütülen varsayımlar (iki turdan toplam)

| # | Varsayım | Gerçek | Kanıt |
|---|---|---|---|
| 1 | §4.4: "onboarding `discVectorService:154` ile yazar" | Onboarding quiz'i `discVectorService`'ten GEÇMEZ; `User`'a doğrudan yazar | `onboardingController.ts:474-489` |
| 2 | `00-KARAR-TAKIP:189`: "çağrılsa bile 50'ye eşitlenir" | Yalnız yol 2/3 için VE `UserProfile` satırı varsa. Satır yoksa **throw**. Yol 1 için tümüyle yanlış | `computeAndStoreProfile:87-90` |
| 3 | Keşif §G / prompt: "uykudaki `rankMentorsForMenti`" | **İKİ ayrı fonksiyon** aynı isimde: `matching.ts:351` (DISC, CANLI, testli) ve `scoring.service.ts:165` (arketip, uykuda, testsiz) | grep, iki tanım |
| 4 | Prompt: "`BLOCKED_PAIRS` `scoring.service.ts`'te" | `scoring.config.ts:33`'te; service yalnız import eder (`:6`) | `scoring.config.ts:33-35` |
| 5 | Prompt / karar 5: "`forRole`'a göre filtre yapan kod" | Runtime okuyan kod **YOK** (`backend/src` → 0). Yalnız seed yazıyor, index var | `schema.prisma:937`, `:945` |
| 6 | Keşif §H: "`matching.ts` ~12 nokta" | Ham `disc` satırı **43**, fonksiyonel mekanizma **7** | `matching.ts` 431/431 okundu |
| 7 | Keşif: "ağırlık 2→3 yeniden tasarım" (migration ima) | Doğru ama **migration GEREKMEZ** — JSON depolama | `schema.prisma:186` |

---

## §D — ⬜ AÇIK: canlıda hangi yol kullanılıyor

**Soru:** Gerçek kullanıcı akışı üç yoldan hangisini izliyor? Hepsi
açık mı, biri mi?

**Neden önemli:** §A'daki üç sonuçtan (gerçek skor / tümü-50 / hata)
hangisiyle karşılaşacağımız buna bağlı. Faz 5 (k) kaleminin büyüklüğü
de buna bağlı.

**Bu turda cevaplanamadı:** FE akışı izlenmedi (kapsam dışıydı).
Canlı DB sayıları sorgulanamaz (kural).

**Cevap için gereken (sonraki tur):**
- `frontend/src` onboarding akışı: hangi uç çağrılıyor
- Kaç kullanıcının `UserProfile` satırı var, kaçında `discD..C`
  sıfırdan farklı → **❓ TEYİT GEREK (DB, PO onayı)**

---

## §E — KARAR ETKİSİ VE KALEM LİSTESİ

### Faz 5'in 6 karar noktasına etkisi

| # | Karar | Kanıt durumu | Bu keşfin katkısı |
|---|---|---|---|
| 1 | `discToOcean` adapter emekli mi köprü mü | ✅ yeterli | Tek çağıran `computeAndStoreProfile` (`scoring.service:92-99`); o da FE'siz uçtan. Emekli etmek düşük riskli |
| 2 | Skor hangi alana yazılacak | ✅ yeterli | `ocean*` nullable + yazılıp okunmuyor · `archetype` nullable + uyku motoru okuyor · `disc*` default-0 + canlı okuyor |
| 3 | `matching.ts` çevir mi / uyku motoru bağla mı | 🟡 kısmi | §F.3'teki karşılaştırma tablosu. Eksik: backfill boyutu (❓ DB) + FE DTO uyarlama eforu |
| 4 | Backfill mi yeniden-çözme mi | ✅ yeterli | `SjtResponse` YOK → ham cevap saklanmıyor → **yeniden-çözme imkânsız**, tek seçenek DISC'ten türetme |
| 5 | `forRole` rol-nötr mü | ✅ yeterli | Runtime okuyan kod 0 → nullable yapmak neredeyse bedava (seed + index + NOT NULL kısıtı) |
| 6 | Ağırlık %45/%30/%25 | ✅ yeterli | Migration YOK, 8 kod noktası (§B) |

⚠️ **Bu tablo KARAR VERMEZ.** Kanıt sunar; kararlar PO'da (S33).

### Kalem adayları (⚠️ NUMARA VERİLMEDİ)

| Kalem | Ne | Durum |
|---|---|---|
| [adayı] | Üç DISC yolunun birleştirilmesi — `UserProfile.discD..C`'yi hangi yolun dolduracağına karar + eksik yolları bağlama | ⬜ AÇIK |
| [adayı] | İki `rankMentorsForMenti` isim çakışması — Faz 5 kararı sonrası biri emekli/yeniden adlandırılmalı | ⬜ AÇIK |
| [adayı] | Ağırlık modeli 2→3 bileşen (8 kod noktası, migration YOK) | ⬜ AÇIK |
| [adayı] | `CertificationOption`'a iç-not alanı (**migration**) — §G.1 | ⬜ AÇIK |
| [adayı] | **Kritik konu eşiği kod turu ön koşulu:** `certification.test.ts:78` (`expect(isFirstAttemptPass(2, true)).toBe(false)`) `>= 2` değişikliğinde **KIRILACAK** — assert ters döner. `:74-77` geçerli kalır. ⚠️ `certification-retry.test.ts` ve eşik testleri satır satır okunmadı → **❓ TEYİT GEREK.** Kod turu bu testleri de güncellemeli | ⬜ AÇIK |
| [adayı] | **Madde güncellemeleri AYRI TURDA** — bu tur yalnız keşif raporunu yazar, `00-KARAR-TAKIP`'e DOKUNMAZ. Güncellenecekler: **madde 101** (üç yol bulgusu) · **Faz 5 (g)** (tek çağrı değil, iki adım) · **Faz 5 (i)** (⭐ MIGRATION GEREKMİYOR — JSON'da, F.13'e takılmıyor) · **Faz 5 (k)** (kapsam büyüdü: hangi yoldan gelenler) · **S33** (6→7 karar noktası) · **madde 72** (§G.2 test etkisi) | ⬜ AÇIK |

### ⏳ BEKLEYEN MADDE GÜNCELLEMESİ (bu turda YAPILMADI)

⚠️ Bu belge `00-KARAR-TAKIP.md`'ye dokunmadı — PR #160 açık ve aynı
dosyaya yazıyor, çakışma riski vardı. **#160 merge edildikten sonra
ayrı turda yapılacak** (bkz. kalem listesi, 6. satır).

⚠️ **Bu kalem yazılmazsa** bulgular raporda kalır, kalemler yanlış
kapsamla durur — sonraki oturum "ağırlık işi migration ister" sanıp
F.13'ü (Neon yedeği) bekler. Oysa §B kanıtladı: ağırlık JSON'da,
migration GEREKMİYOR.

---

## §F — CANLI VE UYKU MOTORU (12 dk turunun diğer bulguları)

### F.1 — `matching.ts` DISC haritası (431/431 okundu)

**Sayılan birim:** `disc` dizgisi geçen satır, harf duyarsız. İki
sayım: düz grep = 43, `LC_ALL=C` grep = 43 (tutarlı).

| Sınıf | Adet | Satırlar |
|---|---|---|
| [TİP] import / tip alanı | 7 | 1, 3, 14, 235, 236, 247, 347 |
| [FİLTRE] `excludeDiscTypes` / `blockedDiscTypes` | 11 | 63, 94, 119-122, 179, 257, 269-271 |
| [ANTİ-MATCH] `isAntiMatch` | 1 | 283 |
| [SKOR] hesap + veri | 22 | 33, 36, 38, 82, 104, 163, 164, 182, 260, 286, 299, 300, 304, 316, 364, 394, 400, 404, 410, 411, 414, 424 |
| [GÖSTERİM] `discScore` çıktı | 2 | 335, 345 |
| **Toplam** | **43** | |

**7 fonksiyonel mekanizma (asıl değişecek yer sayısı):**
1. `excludeDiscTypes` filtresi — kaynak `MentorFilter.blockedDiscTypes`
   (DB) veya API arg (`:92-94`, `:119-123`), uygulama `:270-271`.
   ⚠️ **OCEAN'da doğrudan karşılığı YOK** (D/I/S/C 4 kesikli kova;
   OCEAN sürekli) → yeniden tasarım
2. `isAntiMatch` `:283` — tanım `scoring.ts:20-22`, **tek kural**
   (D mentör × S menti). ⚠️ OCEAN'da matris yeniden tasarlanmalı
3. `computeTotalScore(mentiDisc, mentorDisc)` — 2 çağrı yeri
   (`:296-305` mentör→menti, `:407-415` menti→mentör)
4. `discVector` → `mentiVector` (`:286`, `:400`, progressive profiling)
5. `discWeight` (0.4) — ~9 satırda taşınıyor
6. `discScore` çıktı DTO alanı (`:316`, `:424`); menti yanıtına
   harfsiz döner (`matchingController.ts:114` strip'ler)
7. `DiscType`/`DiscVector` import + tip alanları (7 satır)

**Ayrıca:** `blockedPairs` (`:44-55`, `:90`, `:126`) —
`Tenant.blockedPairs` JSON, **ID-bazlı** (DISC değil), idari blok.

**Negatif teyit:** KAPSAM: 8 terim (`ocean`, `archetype`,
`UserProfile`, `oceanO`, `bigfive`, `big five`, `mergeWithSjt`,
`deriveArchetype`), harf duyarsız, `matching.ts` 431 satır →
**0 sonuç.** Canlı motor tümüyle DISC.

### F.2 — Uyku motoru olgunluk karnesi (`scoring.service.ts`)

⭐ "Uyku motoru" **arketip-tabanlı** (M1-M4 / m1-m4) ve zaten OCEAN
yazıyor (`computeAndStoreProfile:81-116`).

| # | Kriter | Durum | Kanıt |
|---|---|---|---|
| a | Çalışır durumda mı | 🟡 | Fonksiyonlar tam (`:39-192`), uç bağlı (`sjtScoringController:90-142`), ama canlı veri yok (arketip null) |
| b | Testi var mı | ⬜ | `calculateMatchScore` / `getCharacterScore` / `isHardBlocked` / `rankMentorsForMenti` için birim testi **0**. KAPSAM: `backend/tests` + `*.test.ts`, 3 sembol → 0. Yalnız `compute-profile-idor.test.ts` (uç IDOR guard'ı, sıralama mantığını test ETMEZ) |
| c | Hata yönetimi | 🟡 | Uç 400 (`:93`), 404 arketip-null (`:102`), `createMatchIfEligible` throw (`:125-126`), `rankMentorsForMenti` sessiz `continue` (`:174`) |
| d | Tenant izolasyonu | ✅ | menti `:100`, mentors `:114`, membership `:121` — üçü de tenant-scoped |
| e | Canlı ile aynı girdi | ⬜ | HAYIR. Uyku: `UserProfile.archetype` + `goalTags`/`skillTags` (`:134-136`). Canlı: `User.discType`/`discVector`/`sectorTags` |
| f | Çıktı şekli FE ile uyuşuyor mu | ⬜ | HAYIR. Uyku döner `{mentiId, totalEligible, results: RankedMentor}` (`:141`); FE kartı `mentorName`/`avatar`/`sectorTags`/`skills` bekliyor — sonuçta YOK |

**Çağrı yolu:** `POST /api/scoring/rank-mentors`
(`sjtScoringRoutes.ts:27`, `requireAuth`) → `rankMentorsHandler`
(`sjtScoringController.ts:90`) → `rankMentorsForMenti`
(`scoring.service.ts:165`).
**FE bu ucu ÇAĞIRMIYOR.** KAPSAM: `frontend/src`, terimler
`rank-mentors` / `compute-profile` / `/scoring` → yalnız `feedback` +
`certification` bulundu. Kod yorumu da teyit ediyor
(`scoring.ts:163-166`).

**`BLOCKED_PAIRS`:** `scoring.config.ts:33-35`, **2 çift**,
arketip-tabanlı. `WEIGHTS` `:48`.

### F.3 — İki motorun karşılaştırması (karar 3)

| Kriter | `matching.ts`'i OCEAN'a çevirmek | Uyku motorunu bağlamak |
|---|---|---|
| Dokunulacak dosya | `matching.ts` + `scoring.ts` + `scoring.config.ts` (+ tuner) | Esas hazır; veri köprüsü + FE DTO + onboarding tetiği |
| Dokunulacak satır | ~43 satır / 7 mekanizma | Yeni sıralama mantığı YOK; bağlama işi |
| Migration | Gerekmez (OCEAN alanları var) | Gerekmez; **backfill gerekir** (arketip null) |
| FE değişikliği | Az (`discScore` zaten harfsiz) | **Fazla** — çıktı `mentorName`/`avatar` içermiyor |
| Test durumu | ✅ var (`scoring.unit.test.ts`, `mentor-matches.test.ts`, `scoring.test-cases.ts`) | ⬜ sıralama mantığı test edilmemiş |
| Geri alınabilirlik | Orta (canlı yolu değiştirir) | Yüksek (ayrı yol) |
| Bilinmeyenler | OCEAN anti-match / dışlama matrisi tasarımı | Arketip backfill + FE kart uyumu + 0 test |

⚠️ **PO kararı — tavsiye verilmedi.**

---

## §G — SERTİFİKA TARAFI (üç bekleyen kalem)

### G.1 — ⭐ İÇ-NOT ALANI YOK (KALEM 6 kesinleşti)

`CertificationOption` (`schema.prisma:1149-1161`) alanları:
- `competencyScore Int` (0-3)
- `explanation String?` — "neden doğru/yanlış" öğrenme metni,
  **kullanıcıya gösterilir**
- `outcome String?` — UI rozeti, **kullanıcıya gösterilir**

`internalNote` benzeri **gizli alan YOK.** İki metin alanı da
kullanıcıya dönük.

→ **Oturum 1 belgesindeki 🔒 iç notlar mevcut şemayla seed'e GİREMEZ.**
Girerse `explanation`'a yazılır ve sınav ekranında görünür ("bu
sahnede kriz yok, olsaydı 0'dı" → ne ölçtüğümüzü ele verir).
**Yeni alan = migration.**

### G.2 — `certification.service.ts:66-67` bugünkü hali

export function isFirstAttemptPass(competencyScore: number, isRedLine: boolean): boolean {
  return isRedLine ? competencyScore === 3 : competencyScore >= 2;
}

Red-line `=== 3`, normal `>= 2`.

**Dokunan test VAR:** `backend/tests/certification.test.ts:73-78`.
`>= 2` değişikliğinde **kırılacak satır `:78`**:
`expect(isFirstAttemptPass(2, true)).toBe(false)` — red-line'da 2
artık geçeceği için assert ters döner. (`:74-77` geçerli kalır.)
⚠️ `certification-retry.test.ts` ve eşik testleri satır satır okunmadı
→ **❓ TEYİT GEREK.**

### G.3 — Seed muhafız karşılaştırması (madde 73)

| Dosya | Doğrudan-çalıştırma muhafızı |
|---|---|
| `seed-learning-journey.ts:534-542` | **VAR:** `const isDirectRun = process.argv[1]?.includes('seed-learning-journey'); if (isDirectRun) { seedLearningJourney()... }` |
| `seed-certification.ts` | **YOK:** dosya `:318`'de fonksiyon `}` ile biter. `import.meta` / `require.main` / `process.argv` / `fileURLToPath` → **0 sonuç** |

Fonksiyonun kendisi güvenli (upsert + `updateMany isActive:false`
pasifleştirme `:304-311`, `deleteMany` YOK). Risk yalnız **erişim
yolu**: tek çağıran `prisma/seed.ts` ve o `deleteMany` içeriyor.
Madde 73 = `seed-learning-journey` desenini (~9 satır) buraya eklemek.

---

## §H — DÜRÜSTLÜK SINIRLARI

- **Canlı DB sayıları** (arketipli/arketipsiz `UserProfile`,
  `discD..C` dolu kayıt) → ❓ TEYİT GEREK, sorgu yasak
- **Canlı onboarding hangi yolu kullanıyor** → ❓ FE izlenmedi (§D)
- **FE `algorithm-tuner`** — slider sayısı / disc türetimi
  doğrulanmadı (❓)
- **`adaptiveTestEngine.ts`** tam okunmadı (kapsam dışı; 284 vs 285
  sapması bu turda doğrulanmadı)
- **`sjt-scorer.ts`** (84 satır) bulundu, tam okunmadı
- **`triggersOn` ↔ senaryo eşlemesi** — yalnız şema alanı görüldü
  (`schema.prisma:939`); eşleme doğrulanmadı
- **`algorithmTuner.ts:334-451`** grep'le görüldü, satır satır
  okunmadı (ağırlık mantığını değiştirmiyor)
- `certification-retry.test.ts` etkisi doğrulanmadı (§G.2)

## §I — SAYIM (KURAL 16)

**Sayılan birim tanımları:**
- "DISC yolu" = `User.discVector` veya `UserProfile.discD..C`'ye yazan
  ayrı giriş akışı → **3**
- "kırılacak nokta" = 3. ağırlık bileşeninde değişmesi gereken
  fonksiyon/imza/formül → **8**
- "`matching.ts` DISC satırı" = `disc` dizgisi geçen satır → **43**
  (mekanizma olarak **7**)
- "çürütülen varsayım" = kod kanıtıyla yanlışlanan önceki iddia → **7**
- "kalem adayı" → **6**

⚠️ **ÖNCEKİ SAYIMLA UYUM (KURAL 16).**
`faz5-onkosul-kesfi-2026-09-04.md` §D `matching.ts` için
"`discType`/`discVector` **18 satır** (~12 mantık noktası)" diyor. Bu
tur "**43 satır** / 7 mekanizma" saydı. **Üçü de doğru — birimler
farklı:**
- **18** = yalnız `discType` + `discVector` tanımlayıcıları
- **43** = `disc` alt dizgisi geçen tüm satırlar (`discWeight`,
  `discScore`, `excludeDiscTypes`, `DiscVector` dahil), harf duyarsız
- **~12 → 7** = tekil koşul/çağrı sayısı vs. onların toplandığı işlev
  kümesi (§F.1'deki 7 mekanizma)

Çelişki YOK; eski sayım dar terimliydi, bu tur geniş taradı.

📸 Bu belge YENİ NUMARA VERMEZ.
