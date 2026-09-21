# KONSEY 1 · PSİKOMETRİ VE EŞLEŞTİRME — ürünün asıl iddiası çalışıyor mu?

**📸 DONDURULMUŞ — 2026-09-21 fotoğrafı.** Bu belge plan değildir; tek işi kuyruğu beslemektir.
Bulguları `docs/otonom/00-KUYRUK.md`'ye işlendikten sonra güncellenmez.
(Kural: `CLAUDE.md` — *"AKTİF İŞ KAYNAĞI TEKTİR"* · yeni planlama belgesi açılmaz.)

> **Mod:** 🟩 PLANLA — salt-okuma. Kod, belge, şema, DB, seed **değişmedi**; hiçbir şey silinmedi.
> Canlı sisteme istek atılmadı, exploit yazılmadı. Yalnız kod okundu.
> **Kuyruk öneki:** `S-??` · **Kart numarası:** `KARAR-??` (numarayı yalnız PO verir).
> **Karşılaştırma tabanı:** güncel `main` (`a8cec0f`) + merge edilmemiş `otonom/BB-devir-uygulama-20260921` dalındaki kuyruk/kararlar.

---

## 0. ⭐ ÖNCE OKU — en kritik üç bulgu

**① `Match` tablosuna yazan kod YOK — eşleştirmenin kalıcı kaydı hiç doğmuyor.**
`prisma.match.create` backend'in tamamında **tek yerde** geçiyor: `scoring.service.ts:137`, `createMatchIfEligible()` içinde. Bu fonksiyonun **sıfır çağıranı** var (kapsam: `src/` · `tests/` · `scripts/` · `prisma/` harf duyarsız → tek isabet, o da tanımın kendisi; frontend `src/` → 0 isabet). Sonuç zincirleme: `Meeting.matchId` hiç dolmuyor → mentörün onay kuyruğundaki **`%{score} uyum` rozeti** (`mentor/page.tsx:292`) `m.match` null olduğu için **hiç çizilmiyor** → yöneticinin sol menüsündeki **`/admin/eslesmeler`** sayfası (`(admin)/layout.tsx:35`) sonsuza kadar *"Henüz eşleşme yok"* (`eslesmeler/page.tsx:100`) gösteriyor. Menti ekranında yüzde **görünürken** yöneticiye *"eşleşme yok"* demek, sessiz bir yalandır. ⚠️ Bu, kuyruktaki P-04 notunun (*"%rozeti hiç render edilmiyor"*) **düzeltilmesidir**: rozet kodda VAR, beslendiği veri yok.

**② Eşleştirmenin ANLAMINI doğrulayan test yok — yalnız "patlamıyor" testi var.**
*(A.4 — alt-ajan bulgusu bölüm 4'te, sayılarla.)*

**③ OCEAN motoru ölü (I-13) — ama kullanıcıya görünen bir şeyi bozuyor mu, ayrı soru.**
*(B.2 — bölüm 3'te, kanıtla.)*

---

## 1. KAPSAM BEYANLARI

Negatif iddialar (*"yok / çağrılmıyor"*) bu kapsamlarla kanıtlandı. **Pozitif bulgu tek kanıtla yeterlidir; negatif bulgu kapsam beyanı ister** (KURAL 13).

| # | İddia | Taranan dizinler | Taranan terimler (harf duyarsız, iki dilli) | Sonuç |
|:--:|---|---|---|---|
| K1 | `Match` tablosuna yazan kod yok | BE `src/` · `tests/` · `scripts/` · `prisma/` + FE `src/` | `createMatchIfEligible` · `prisma.match.create` · `match.create` | **1 tanım, 0 çağrı** |
| K2 | `matchId` canlı rezervasyon yolunda gönderilmiyor | FE `src/` tamamı | `matchid` | 9 isabet; tek yazan `book-meeting/page.tsx:32` URL parametresinden okuyor, oraya link veren tek yer `menti/page.tsx:325` ve **yalnız `mentorId` gönderiyor** |
| K3 | OCEAN yolu FE'den çağrılmıyor | FE `src/` · `e2e/` | `rank-mentors` · `compute-profile` | **0 sonuç** |
| K4 | `sector-scorer.service.ts` çağrılmıyor | BE `src/` `tests/` `scripts/` `prisma/` + FE `src/` `e2e/` | `rankMentorsWithSectorScore` · `sectorScorer` · `sector_scorer` · `sector-scorer` | Yalnız kendi yorum satırları → **gerçek import/çağrı 0** |
| K5 | `rewardPenalty` sinyali sıralamada okunmuyor | BE `src/` `tests/` `scripts/` `prisma/` + FE `src/` `e2e/` | `rewardPenalty` · `getCombinationScores` · `matchCombinationScore` · `applyFeedbackSignal` | Yazma canlı; **sıralama yolunda 0 okuma** |
| K6 | `matchingInterface.ts` zincirde değil | BE `src/` `tests/` | `matchingInterface` | Kendi dosyası hariç **0** |
| K7 | Aday sorgularında `orderBy` yok | BE `src/services/matching.ts` tamamı | `findMany` · `orderBy` · `take:` | 4 `findMany`, **0 `orderBy`**, 2 × `take: 500` |

⚠️ **İki dil eki (KURAL 13):** eşleştirme terimleri iki dilde arandı — `match↔eşleşme` · `mentor↔mentör` · `meeting↔görüşme` · `tenant↔kurum` · `score↔skor/puan` · `feedback↔geri bildirim`.

---

## 2. BULGULAR — A · CANLI EŞLEŞTİRME MOTORU (DISC)

### A.1 Uçtan uca iz — kullanıcı gördüğü yüzdeyi hangi kod üretiyor

Canlıda **tek** motor çalışıyor: `scoring.ts::computeTotalScore` → `matching.ts`. Yanında ekrana hiç gitmeyen **ikinci bir motor** daha var (§3).

**Yol 1 — Mentör → Menti** (mentörün aday listesi):

| # | Adım | Kanıt |
|:--:|---|---|
| 1 | Menti DISC cevabı | `_OnboardingContent.tsx:139` → `POST /api/users/disc/submit` (`onboardingRoutes.ts:36`) |
| 2 | Yazma | `onboardingController.ts:474-479` → `User.discType` · `User.discVector` · `User.discResultCard` |
| 3 | FE istek | `mentor/page.tsx:63-67` → `matchingApi.getRankedMentis` → `matching.ts(FE):40` |
| 4 | Route | `userRoutes.ts:70-74` `GET /mentors/:mentorId/candidates` + `requireRole('ADMIN','MENTOR')` |
| 5 | Controller | `matchingController.ts:59-70` |
| 6 | Servis | `matching.ts:57` `rankMentisForMentor` → aday sorgusu `:149` (`take: 500`) |
| 7 | Skor | `matching.ts:296-305` → `scoring.ts:92-112` |
| 8 | Sıralama | `matching.ts:325` `filtered.sort((a,b) => b.totalScore - a.totalScore)` |
| 9 | Ekran | `mentor/page.tsx:491` `{c.totalScore.toFixed(0)}` · `:484` gerekçe · `:494` fallback rozeti |

**Yol 2 — Menti → Mentör** (menti havuz kartı):
`menti/page.tsx:55-59` → `matching.ts(FE):24` → `userRoutes.ts:81-86` (`requireRole('ADMIN','MENTI')` + `requireSelfOrAdmin('mentiId')`) → `matchingController.ts:107-114` → `matching.ts:351` `rankMentorsForMenti` → mentör sorgusu `:382` (`take: 500`) → skor `:407-415` → sıralama `:429` → ekran `menti/page.tsx:311` `%{mentor.matchScore}` · `:318` gerekçe.

**⭐ İKİ YÖN SİMETRİK DEĞİL** (kanıt: `matching.ts:265-323` ↔ `:406-427`):

| Mekanizma | Mentör→Menti | Menti→Mentör |
|---|:--:|:--:|
| kaliteÇarpanı (0.8–1.2) | ✅ `:300` | ❌ parametre geçilmiyor → 1.0 |
| anti-match vetosu (D×S) | ✅ `:283` | ❌ |
| zaman uyumu filtresi | ✅ `:274-276` | ❌ |
| beklenti kesişimi | ✅ `:278-281` | ❌ |
| 4 kademeli fallback | ✅ `:200-227` | ❌ |
| iletişim tarzı bonusu +10 | ✅ `:288-294` | ❌ |

⇒ **Aynı çift, iki taraftan bakınca farklı yüzde görür.** Mentörün "uygun değil" diye eleyeceği bir menti, menti panelinde o mentörü yüksek skorla görmeye devam eder. Belgede bu asimetrinin gerekçesi aranmadı — **TEYİT GEREK (ürün niyeti)**.

### A.2 Skor formülü, ağırlıklar ve gerekçe

```
toplam = min(100, [ sektör×sektörAğırlık + karakter×karakterAğırlık ] × kaliteÇarpanı )   (scoring.ts:92-112)
                    ( + iletişimBonusu×kaliteÇarpanı, yalnız mentör yönünde, matching.ts:288-294 )
```
- **sektör** `scoring.ts:31-41` — `ortak / MENTİ_etiket_sayısı × 100`. **Asimetrik**; payda menti seti. Menti etiketi yoksa → **0**.
- **karakter** `scoring.ts:63-84` — 4×4 sabit matris `:44-49`; vektör varsa `confidence` ile harmanlanır `:75-78`. Mentörün `discType`'ı yoksa → **sessiz sabit 50** (`:68`).
- **ağırlıklar** varsayılan **0.60 / 0.40**; canlıda `Tenant.tenantVocabulary.algorithmWeights` JSON'undan okunuyor (`algorithmTuner.ts:165-174`), sıralama başında **bir kez** (`matching.ts:104`, `:404` — N+1 yok), DB hatasında sert fallback `matching.ts:38`.
- Ağırlık **dört yerde** tanımlı: `scoring.ts:89-90` · `algorithmTuner.ts:28-33` · `matching.ts:38` · `scoring.config.ts:48` — ⚠️ **dördüncüsü ölü zincire ait** (§3), ekrandaki skoru üretmiyor.
- Ağırlığı değiştiren iki canlı yol: admin paneli `admin/algorithm-tuner/page.tsx:70` (sınır `algorithmTuner.ts:35-37`: %5'in katı, 0.40 ≤ sektör ≤ 0.70) · **haftalık cron** `cronScheduler.ts:16` (Pazar 02:00 UTC).

**⭐ Gerekçe — belgede DÜRÜSTÇE "yok" yazıyor.** `raporlar/icerik/eslesme-uyum-po-inceleme-2026-08-26.md:87-91`:
> *"16 uyum değeri, D>I>S>C sıralaması ve %60/%40 ağırlığı — kodun içine elle yazılmış sabit sayılardır. Bunların bilimsel/psikometrik bir kaynağı, dayanağı ya da gerekçesi ne kodda ne de belgelerde yoktur… şu an sezgiseldir."*

O belgedeki `[ ] PO notu:` satırları **boş** → PO bu tabloyu hâlâ onaylamamış. Kodun kendi vaadi *"gerçek kullanıcı verisi biriktikçe kalibre edilecek"* — ⚠️ **bu vaat yapısal olarak tutulamaz**, çünkü kalibrasyonun dayanağı olan `Match` tablosu hiç yazılmıyor (§0①, §5).

### A.3 ⭐ KENAR DURUMLAR — kod ne yapıyor

| Durum | Kodun davranışı | Kanıt | Değerlendirme |
|---|---|---|:--:|
| **Eşit skorlu iki mentör** | `sort` yalnız skora bakıyor, **tie-breaker YOK**; aday sorgularında **`orderBy` YOK** | `matching.ts:325`, `:429`; sorgular `:149`, `:382` | ⚠️ **SORUNLU** |
| **Havuz > 500 kişi** | `take: 500`, `orderBy` yok → **hangi 500'ü aldığı tanımsız** | `matching.ts:171`, `:397` | ⚠️ **SORUNLU** |
| **DISC testi yarım** | Mentör `discType` yoksa karakter skoru **sessizce 50** | `scoring.ts:68` | ⚠️ **SORUNLU** (uyarı/rozet yok) |
| **Menti etiketi yok** | Sektör skoru **0** → toplam yalnız karakterden gelir | `scoring.ts:33` | 🟡 fallback kademe-3 yakalıyor |
| **Hiç mentör yok / eşleşme yok** | 4 kademeli fallback: filtreler gevşer, son kademede yalnız-sektör + **uyarı rozeti** | `matching.ts:200-227`; rozet `mentor/page.tsx:494` | ✅ **GÜVENLİ** |
| **DISC harfinde beraberlik** | Sabit sıra **D > I > S > C**, deterministik | `discLetters.ts:45`, `:68` | ✅ **GÜVENLİ** |
| **Mentör kapasitesi dolu** | *(D şeridi — §6)* | | |

**⭐ `orderBy` yokluğunun iki ayrı sonucu — bu bugüne kadar hiçbir denetimde yakalanmadı:**
1. **Sıralama tekrarlanabilir değil.** `Array.prototype.sort` ES2019'dan beri kararlıdır, yani eşitlikte **giriş sırası** korunur — ama giriş sırası PostgreSQL'in `ORDER BY`'sız satır sırasıdır ve bu **garanti edilmez** (güncelleme/VACUUM/plan değişimi sırayı kaydırır). ⇒ Menti sayfayı yenileyince *"en uygun mentör"* değişebilir, hiçbir açıklama olmadan.
2. **Sessiz kesme.** 500'den kalabalık bir kurumda havuza kimin gireceği tanımsız → **yüksek skorlu bir aday hiç görünmeden elenebilir.** Ne log var ne uyarı. Bu bir kozmetik değil, **doğruluk** hatasıdır.

### A.5 Belgedeki vaat ↔ kodun fiili davranışı

| Vaat | Kaynak | Kod gerçeği | Durum |
|---|---|---|:--:|
| *"İşte sana çok uygun **3 menti** — biri tam senin sektöründen, **%92 uyum**"* (mentör P1 "ilk 5 dk aha") | `persona/mentor-persona-...:68-72` | Aday listesi var ama: sayı ("3 menti") başlıkta yok · skor `mentor/page.tsx:491` **çıplak sayı, % işareti yok** · liste 6 bloğun altında | 🟡 **YARIM** |
| Onay kuyruğunda %uyum rozeti | — | Rozet **kodda var** (`mentor/page.tsx:292` `%{score} uyum`) ama `m.match` daima null → **hiç çizilmiyor** | ⬜ **ULAŞILAMAZ** |
| *"Gerçek kullanıcı verisi biriktikçe kalibre edilecek"* | `eslesme-uyum-po-inceleme-...:91` + `algorithmTuner.ts:1-16` | Kalibrasyonun dayanağı `Match` tablosu **hiç yazılmıyor** | ⬜ **YAPISAL OLARAK TUTULAMAZ** |
| Sektör skoru "kapsamlı 5 bileşen" | `sector-scorer.service.ts` (TAM kod) | Canlı formül **basit etiket kesişimi**; 5-bileşen servisi **0 çağrılı** (K4) | ⬜ **BAĞLI DEĞİL** |
| Ödül/ceza sinyali sıralamayı ayarlar | `rewardPenalty.ts:66-68` yorumu | Sinyal `MatchCombinationScore`'a **yazılıyor**, `getCombinationScores` **0 çağrılı** (K5) | ⬜ **TEK YÖNLÜ** |

⚠️ **Bayat denetim uyarısı:** `raporlar/kod-denetimi/strateji-gercek-denetimi-2026-08-20.md:92` P1'i **"✅ TAM VAR"** saymış ve kanıt olarak *"%uyum + gerekçe"* yazmıştı. Kod bunu doğrulamıyor; `panel-denetimi-mentor-menti-2026-09-19.md:88` bunu zaten çürütmüştü. **Bu turda da çürük** — belge ↔ kod çelişkisinde **KOD KAZANIR**.

---

## 3. BULGULAR — B · OCEAN MOTORU

### B.1 Ölçek hatası — bağımsız doğrulandı, elle hesapla

| Halka | Kanıt | Ölçek |
|---|---|:--:|
| **Yazma** | `discVectorService.ts:117` `(r.value-1)/4` → `:131-137` `raw.X / sum` → `:152-156` `UserProfile.discD..C` upsert | **0–1, toplam = 1.0** |
| **Okuma** | `scoring.service.ts:92-97` `discToOcean({ d: profile.discD, … })` | ölçek **dönüştürülmüyor** |
| **Formül** | `disc-to-ocean.adapter.ts:15-16` `raw = Σ w·disc` → `clamp(50 + 50·raw/100)` | `/100` böleni → **0–100 bekliyor** |

**Formülün 0–100 beklediğinin üç bağımsız kanıtı:** (1) `:16`'daki `/100` böleni · (2) `:10` `clamp(0,100)` — girdi 0–1 olsa bu kırpma hiç tetiklenmez, ölü kod olur · (3) **en kesin:** SJT tarafı aynı OCEAN uzayında açıkça 0–100 üretiyor (`sjt-scorer.ts:80-81`) ve `mergeWithSjt` (`adapter.ts:45-56`) iki kaynağı **alan alan** karıştırıyor (`sjtOverrides.o ?? discDerived.o`) — karışan iki değerin ölçeği zorunlu olarak aynı olmalı.

**Elle hesap — düz profil `(0.25, 0.25, 0.25, 0.25)`, ağırlıklar `scoring.config.ts:23-29`:**

| boyut | raw = Σ w·disc | ocean = 50 + 50·raw/100 |
|:--:|--:|--:|
| o | 0,25·(0,1+0,4−0,3−0,2) = **0,000** | **50,000** |
| c | 0,25·(0,3−0,1+0,1+0,6) = **0,225** | **50,113** |
| e | 0,25·(0,4+0,6−0,2−0,3) = **0,125** | **50,063** |
| a | 0,25·(−0,5+0,2+0,5−0,1) = **0,025** | **50,013** |
| n | 0,25·(−0,2−0,1−0,4+0,1) = **−0,150** | **49,925** |

`Σdisc = 1` olduğundan `raw` en fazla ağırlık matrisinin uç bileşeni kadar olabilir: `raw ∈ [−0,5 ; +0,6]` (`a.d = −0,5`, `c.c = +0,6`) ⇒ **`ocean ∈ [49,75 ; 50,30]`** — tasarlanan 0–100 yelpazenin **%0,55'i**.

**Eşikler** `scoring.config.ts:31` `{HIGH:60, MID:55, LOW:45}` · arketip kuralları `adapter.ts:27-43`:

| Rol | Koşul | Arketip | Erişilebilir mi |
|:--:|---|:--:|:--:|
| MENTOR | C>60 ∧ O>60 | M1 | ❌ |
| MENTOR | O>60 ∧ E>60 | M2 | ❌ |
| MENTOR | C>60 ∧ A<45 | M4 | ❌ |
| MENTOR | A>60 | M3 | ❌ |
| MENTOR | *fallback* | **M1** | ✅ **daima** |
| MENTI | A>55 ∧ N>55 | m3 | ❌ |
| MENTI | E>60 ∧ A<45 | m4 | ❌ |
| MENTI | O>60 ∧ C<45 | m2 | ❌ |
| MENTI | C>60 ∧ O<55 | m1 | ❌ |
| MENTI | *fallback* | **m1** | ✅ **daima** |

⇒ **8 arketipin 6'sı erişilemez; tüm nüfus tek arketipe çöküyor.** Hata yok, uyarı yok, log yok.

**⭐ Kuyrukta olmayan iki zincirleme sonuç:**
1. `COMPATIBILITY_MATRIX['M1_m1'] = 60` (`scoring.config.ts:38-44`) ⇒ `getCharacterScore` (`scoring.service.ts:39-42`) **her çift için sabit 60**. Motor bağlansaydı karakter skoru **hiç ayırt etmezdi** — yani I-13 düzeltilmeden bağlama, rastgeleden beter olurdu.
2. `BLOCKED_PAIRS = { M4:['m3'], M1:['m4'] }` (`scoring.config.ts:33`) ⇒ M4/m3/m4 hiç üretilmediği için **toksik-çift vetosu hiç tetiklenmez**; `isHardBlocked` daima `false`.

### B.2 ⭐ ETKİ ALANI — kullanıcılar yanlış sonuç mu gördü?

> **CEVAP: HAYIR.** Bugüne kadar hiçbir kullanıcı OCEAN kaynaklı bir sonuç görmedi. Kullanıcının gördüğü arketip **DISC harfinden** geliyor, OCEAN'a hiç uğramıyor.

**Kanıt — kullanıcının gördüğü kart DISC kaynaklı:**
`onboardingController.ts:464-466` `calculateDiscResult(answers).dominant` → `DISC_RESULT_CARDS[dominant]` (`:49-105`, Türkçe kartlar: *Öncü · Ateşleyici · Yapı Taşı · Kâşif*) → `User.discResultCard` (`schema.prisma:325`) → FE: `DiscRecallCard.tsx:57` *"Sen bir {card.archetype}sın!"* · `ResultStep.tsx:40` · `profile/page.tsx:221` · `DiscBadge.tsx:12-16`.
**`discResultCard` `User` tablosunda, OCEAN `UserProfile` tablosunda — aralarında hiçbir kod yolu yok.**

**Ama iki "sızıntı yüzeyi" var (ikisi de bugün kullanıcıya ulaşmıyor):**
1. `POST /api/scoring/compute-profile` **canlı bir uç** (`server.ts:132`) ve yanıtında `archetype` + `ocean:{o,c,e,a,n}` dönüyor (`sjtScoringController.ts:74-86`). FE çağırmıyor (K3) — ama uç açık.
2. Yöneticinin **`/admin/eslesmeler`** sayfası `mentorArchetype`/`mentiArchetype` sütunlarını **çiziyor** (`eslesmeler/page.tsx:134,142`). Veri gelseydi yöneticiye her satırda `M1`/`m1` görünecekti. Bugün görünmüyor — çünkü tablo hiç dolmuyor (§0①).

**Kapsam beyanı (KURAL 13):** dizinler BE `src/ tests/ scripts/ prisma/` + FE `src/ e2e/` + kök kod dosyaları. Terimler harf duyarsız: `archetype · arketip · ocean · bigfive · big-five · openness · neuroticism · conscientiousness · agreeableness · oceanO · discD · discToOcean · deriveArchetype · mergeWithSjt · ARCHETYPE_THRESHOLDS · DISC_TO_OCEAN_WEIGHTS · compute-profile · rank-mentors · api/scoring`. Dosya türleri `.ts .tsx .js .jsx .mjs .json .prisma .sql`, `node_modules` hariç. FE'deki 16 dosyadaki tüm eşleşmeler satır bazında incelendi → **hepsi DISC harfi kaynaklı ya da ölü yol.**

### B.3 İki farklı `DiscVector` tipi — hatanın tam yeri

| | Tip A | Tip B |
|---|---|---|
| Tanım | `scoring.ts:12-18` `{D,I,S,C,confidence}` | `scoring.config.ts:8-13` `{d,i,s,c}` |
| Katman | DB · JSON · **canlı eşleştirme** · analitik | **yalnız** OCEAN adaptörü |
| Ölçek sözleşmesi | yorumda açık: toplam **1.0** | yazılı sözleşme **yok** |

**Adlandırılmış dönüştürücü YOK.** Tek geçiş noktası `scoring.service.ts:92-97`:
```ts
const discDerived = discToOcean({ d: profile.discD, i: profile.discI, s: profile.discS, c: profile.discC });
```
⇒ **İsimler küçük harfe dönüyor, sayılar dönmüyor.** Her iki tarafta da `number` olduğu için **TypeScript bunu yakalayamaz** — hatanın aylarca sessiz kalmasının yapısal sebebi budur.

⚠️ **Üçüncü bir ölçek yorumu:** `tests/compute-profile-idor.test.ts:33` `{discD: 8, discI: 2, discS: 5, discC: 5}` — ne 0–1 ne 0–100, **0–10 gibi**. Test fixture'ı üretim yazıcısının ölçeğiyle de uyuşmuyor. Kastın ne olduğu **TEYİT GEREK**.

### B.4 ⭐ KARAR-?? İÇİN MALİYET — üç seçenek, eşit ayrıntıda

> ⚠️ Bu bölüm **tavsiye vermez.** Seçenekler eşit ayrıntıda sunulur; karar PO'nundur. Mevcut **KARAR-10** kartıyla aynı konudur — bu bölüm o kartın **maliyet eki**dir, yeni kart değildir (§7'de kart olarak da verildi).

**Ortak gerçekler (üç seçenekte de geçerli):**
- `UserProfile.ocean*` + `archetype` **DB'ye kalıcı yazılıyor** (`scoring.service.ts:103-115` `prisma.userProfile.update`), runtime hesap değil. Şema `schema.prisma:992-999`.
- **`discToOcean` ve `deriveArchetype` için sıfır birim testi var** (kapsam: `tests/` dizini, terimler `discToOcean|deriveArchetype|mergeWithSjt|ARCHETYPE_THRESHOLDS|DISC_TO_OCEAN_WEIGHTS|scoring.config|ocean|archetype` harf duyarsız). **Hata tam bu yüzden sessiz kaldı.**
- Canlı DB'de kaç `UserProfile` satırında `archetype != null` olduğu **TEYİT GEREK** — bulut DB'ye bakamaz; ölçülmeli, varsayılmamalı.

| | **A · ERTELE / DOKUNMA** | **B · YALNIZ ÖLÇEĞİ ONAR** | **C · ONAR + BAĞLA** |
|---|---|---|---|
| **Kullanıcı ne görür** | Değişiklik yok | Değişiklik yok | Daha zengin profil + arketip kartı; eşleştirme gerekçesi değişir |
| **Kaç dosya** | 0 | **1 satır bloğu** (`scoring.service.ts:92-97`) *veya* formülü 0–1'e göre yaz (`adapter.ts:15-16`) | Yukarıdakiler + `matching.ts` bağlama + `scoring.config.ts:31` eşik kalibrasyonu + sektör 5-bileşen bağlama |
| **Hangi test** | — | **Yeni** birim testi yazılmalı (bugün 0) | Yeni birim + entegrasyon + sıralama regresyon testleri |
| **Hangi davranış değişir** | Hiçbiri | Hiçbiri (yol zaten ölü) — motor "açılmaya hazır" olur | **Canlı sıralama değişir** → mevcut eşleşmeler kayar |
| **Migration** | Yok | **Şema migration'ı YOK** (kolon tipleri aynı) ama **veri anlamı değişir** → `backfill/recompute` script'i gerekir | B'nin aynısı + eşik kalibrasyonu veri gerektirir |
| **Geri alınır mı** | — | Evet (kod geri alınır; backfill yeniden koşar) | Zor — sıralama değişimi kullanıcı deneyimine yansır |
| **Süre** | Yok | **S–M** | **XL** |
| **Ne kaybedersin** | Ölü kod durmaya devam eder, her denetimde yeniden gündeme gelir; `archetype` yazılmış satırlar (varsa) çöp kalır | Kullanıcıya **hâlâ sıfır değer**; ölü kodu bakımlı tutma maliyeti sürer; eşik kalibrasyonu yine yapılmamış olur | Çok büyük iş; DISC zaten çalışıyor, ölçülebilir fayda **belirsiz** — üstelik faydayı ölçecek mekanizma da yok (§5) |
| **Regresyon riski** | Sıfır | **Düşük** — hiçbir ekran bağlı değil, hiçbir test kırılmaz | Yüksek |

⚠️ **Üç seçenekte de geçerli uyarı:** ölçek yalnız çağrı noktasında düzeltilirse **iki tip + üç ölçek yorumu belirsizliği kalır** ve hata yeniden doğabilir. Kuyruktaki **I-14** (tip birleştirme) bu yüzden **I-13 ile birlikte** yapılmalı — kuyruk bunu zaten söylüyor.

---

## 4. BULGULAR — C · DISC TESTİ VE VERİ

### C.0 ⭐ İKİ AYRI DISC BORUSU — kenar durumların çoğunun kaynağı

Aynı `User.discVector` alanına yazan **iki bağımsız test** var:

| | **A · Likert havuzu** (`/disc-test`) | **B · Onboarding 8 soru** (`/onboarding` adım 2) |
|---|---|---|
| Soru kaynağı | **DB** (`Question`) — `questionService.ts:82-89` | **Kodda sabit** — `onboardingController.ts:109-190` (`:107` yorumu: *"Question DB modeli kullanılmaz"*) |
| Cevap tipi | Likert 1–5 | A/B/C/D şık |
| Ham cevap kaydı | **`UserResponse`** | **hiç kaydedilmiyor** (yalnız sonuç) |
| Yazdığı alanlar | `discVector` + `UserProfile.discD..C` | `discType` + `discVector` + `discResultCard` |
| `discType` yazıyor mu | ❌ **HAYIR** | ✅ evet |
| `confidence` yazıyor mu | ✅ evet | ❌ **HAYIR** |

### C.1 Soru havuzu boşsa kullanıcı ne görüyor

- **Backend:** hata değil, **HTTP 200 + boş dizi + sıfırlı meta** (`questionController.ts:105-108`). `recalcDiscVector` boş havuzda patlamaz: `confidence: 0`, vektör `{.25,.25,.25,.25}` (`discVectorService.ts:140-142`).
- **`/disc-test` ✅ GÜVENLİ:** `page.tsx:86` iskelet → `:89-91` hata ekranı + "Yeniden dene" → **`:94-96` `DiscTestEmpty`** (`:148-165`): *"Şu an aktif test sorusu yok… kurum yöneticinizle iletişime geçin."* (K-02'de düzeltilmiş, kod yorumu bunu söylüyor.) Sonsuz iskelet YOK.
- **`/onboarding` adım 2 ⚠️ SAVUNMASIZ:** `_OnboardingContent.tsx:209-212` — `questions.length === 0` dalı **sonsuz spinner** çiziyor; "yükleniyor" ile "boş" ayrımı yok (ayrı `loading` state yok, başlangıç `[]` `:96`). Ayrıca `DiscTestStep.tsx:116` `(currentIndex/total)*100` → `total=0` iken **NaN**. ⚠️ **Bugün tetiklenmez** (sorular kodda sabit) — ama backend boş dizi dönerse kullanıcı sonsuza kadar döner ikon görür. Hata yolu ayrı ve düzgün (`:199-208`).
- ⚠️ **Mantık hatası (bugün görünür etkisi yok):** `questionService.ts:173` `isDeepening = coreAnswered >= coreThreshold || …` → boş havuzda `0 >= 0` → **true**. Aynı desen `questionController.ts:327`'de: havuz **1 soruya** düşerse **ilk cevapta** `discAssessmentCompletedAt` yazılır ve admin'e *"test tamamlandı"* e-postası gider.

⚠️ Bu, kuyruktaki **U-17** (*"temiz DB'de DISC havuzu boş kalıyor"*) satırının **davranış tarafıdır**: U-17 havuzun nasıl dolacağını soruyor, buradaki bulgu havuz boşken ne olduğunu söylüyor. **Aynı iş, ek kanıt** — yeni satır gerekmez.

### C.2 Puanlama ve ölçek — OCEAN hatasının aynısı başka yerde var mı?

**A borusu** (`discVectorService.ts:110-143`): Likert `(value−1)/4` → 0–1 · boyut ortalaması · cevapsız boyuta **prior 0,25** · toplama normalize ⇒ **D+I+S+C = 1,0**. `confidence = cevaplanan/toplam` (`:140-142`).
**B borusu** (`onboardingController.ts:227-240`): şık sayımı / toplam ⇒ **toplam ≈ 1,0**, 2 ondalık.
**C borusu** (`adaptiveTestEngine.ts:86-98`): `raw/total` ⇒ **toplam 1,0**; `discVector` **ve** `discType` yazar (`:237-243`).
**Eşleştirmede** (`scoring.ts:53-61`): matris 0–100 × vektör 0–1 ⇒ sonuç 0–100. **Tutarlı.**

⇒ **OCEAN'daki türden ikinci bir ölçek hatası DISC borusunda YOK.** Üç boru da 0–1/toplam-1 sözleşmesine uyuyor. *(Kapsam: `discVectorService.ts` · `onboardingController.ts` · `adaptiveTestEngine.ts` · `discLetters.ts` · `scoring.ts` tam okundu.)*

**⛔ AMA BAŞKA BİR SESSİZ HATA VAR — ve bu CANLI, her onboarding kullanıcısını etkiliyor:**

`calculateDiscResult` dönüşü `{D,I,S,C}` — **`confidence` alanı YOK** (tip `onboardingController.ts:201`; üretim `:232-239`). Bu nesne doğrudan `User.discVector`'a yazılıyor (`:474-478`). Sonuç zinciri:

| # | Kod | Değer | Sonuç |
|:--:|---|---|---|
| 1 | `scoring.ts:72` `mentiVector.confidence > 0` | `undefined > 0` = **false** | **Vektör tamamen yok sayılır**, yalnız matris kullanılır |
| 2 | `scoring.ts:110` `args.mentiVector?.confidence ?? (args.mentiDisc ? 1 : 0.5)` | nesne var, alan `undefined` → `??` tetiklenir → `discType` dolu → **1** | API **`confidence: 1`** ("tam güven") raporluyor |
| 3 | `discVectorService.ts:37-50` `parseDiscVector` | `confidence` `number` olmadığı için **`null`** | `getDiscVector()` onboarding vektörünü **"yok"** sayar |

⇒ **Onboarding'i bitirmiş kullanıcının vektörü eşleştirmeye hiç katılmıyor, ama sistem "%100 güven" diyor.** İkisi birden yanlış olduğu için hata kendini gizliyor: skor düşmüyor (matrise düşüyor), gösterge de alarm vermiyor. ⚠️ Bilinçli tasarım mı regresyon mu → **TEYİT GEREK (ürün niyeti)**; kodda gerekçe yorumu yok.

**İkinci tutarsızlık:** A borusu `discType`'a **hiç dokunmuyor** (kapsam: `discVectorService.ts` tamamı, `discType` harf duyarsız → **0 eşleşme**). Matris skoru (`scoring.ts:74,83`) ve anti-match (`scoring.ts:24-29`) `discType`'a dayandığı için ⇒ **Likert testini güncelleyen kullanıcı, onboarding'den kalma ESKİ `discType` ile eşleştirilmeye devam ediyor.**

**Üçüncü:** `dimensionalTotal` cache'i (`discVectorService.ts:73-75`) `where: { isActive: true, discDimension: { not: 'GENERAL' } }` — **tenant filtresi YOK** ⇒ başka kurumun STK soruları paydaya giriyor, `confidence` olması gerekenden **düşük** çıkıyor.

### C.3 Tekrar test — üç düğme var, hiçbiri işe yaramıyor

**Üzerine yazılıyor, sürüm/geçmiş TUTULMUYOR.** `UserResponse` `@@unique([userId, questionId])` (`schema.prisma:913`) + `upsertSingleResponse` (`questionService.ts:198-208`) `update: { value }` → eski değer kaybolur. Geçmiş tablosu yok (kapsam: `schema.prisma` tamamı, desen `ResponseHistory|ResponseVersion|Audit.*Response` → **yok**).

**⛔ Havuzu TAMAMLAMIŞ kullanıcı testi tekrar edemiyor:**
`isComplete` (`questionService.ts:174`) → `derivePhase` `'COMPLETE'` (`useDiscTest.ts:223`) → `useEffect` `onComplete()` (`:195-199`) → `disc-test/page.tsx:53-56` *"DISC Profiliniz Hazır!"* → **2,5 sn sonra `/dashboard`**. Kullanıcı **tek soru bile göremiyor.** Cevapları sıfırlayan uç yok (kapsam: BE `src/` tamamı, desen `userResponse.delete|reset.*test|retake` harf duyarsız → tek eşleşme `gdprService.ts:108`, o da hesap silme).

**Oysa arayüzde üç ayrı düğme bunu vaat ediyor:** `mentor/page.tsx:163` *"DISC Testini Güncelle"* · `menti/page.tsx:284` *"DISC Profilini Güncelle"* · `profile/page.tsx:225,234` — üçü de `/disc-test`'e götürüyor.

⚠️ **Sınır — abartma:** bu yalnız **havuzun tamamını cevaplamış** kullanıcıyı etkiler. Onboarding'i bitirip Likert havuzuna hiç girmemiş kullanıcının `UserResponse`'u **0**'dır → `isComplete` false → o testi normal görür. Etkilenen kitlenin büyüklüğü canlı veriye bağlı → **TEYİT GEREK (DB)**.

Ayrıca `discAssessmentCompletedAt` **yalnız ilk kez** yazılıyor (`questionController.ts:411` erken `return`) → ikinci testin tarihi hiçbir yerde tutulmuyor.

### C.4 Kenar durumlar — veri tarafı

| Durum | Davranış | Kanıt | Değerlendirme |
|---|---|---|:--:|
| Test yarım | Cevapsız boyuta **prior 0,25**, kısmilik yalnız `confidence`'ta görünür; eşleştirme doğru harmanlıyor | `discVectorService.ts:123-128`; `scoring.ts:75-78` | ✅ **TASARIM SAĞLAM** |
| **Tek soru cevaplanmış** | `raw={D:1, .25,.25,.25}` → `D≈0,571` → `computeDiscLetters` **"D" harfini üretir**, `confidence≈0,03` | `discLetters.ts:75` | ⚠️ **SORUNLU** — harfi gösteren katmanlar `confidence`'a bakmıyorsa aşırı özgüven |
| `discVector` NULL kullanıcı | Eşleştirmeye **giriyor**; hiçbir filtre elemiyor; skor sessizce **nötr 50** | `matching.ts:149-172` (koşul yok) · `:245-320` (eleme yok) · `scoring.ts:82` | 🟡 **BİLİNÇLİ Mİ, TEYİT GEREK** |
| Vektör cast'i | `c.discVector as DiscVector` — **runtime doğrulama yok**, `parseDiscVector` burada kullanılmıyor | `matching.ts:286` | ⚠️ **SORUNLU** — C.2'deki `confidence` hatası tam buradan sızıyor |

### C.5 `prisma/seed.ts` — soru/cevap açısından yıkım yüzeyi

Salt gözlem (**çalıştırılmadı**). `prisma/seed.ts:299-319` tek `$transaction`:
- **`:300` `prisma.userResponse.deleteMany()` — FİLTRESİZ**: tüm kullanıcıların tüm DISC cevapları.
- **`:318` `prisma.question.deleteMany({ where: { tenantId: null } })`**: tüm global soru havuzu.
- `User.discVector` **silinmiyor** ⇒ çalıştırılırsa **vektör kalır, dayandığı cevaplar gider** — sessiz tutarsız durum.

Soru yazan tek dosya `prisma/seed.ts` (`:325-337`, 32 soru). `seed-certification.ts` · `seed-learning-journey.ts` · `scripts/seed-test-tenant.mjs` `Question`'a **yazmıyor** (kapsam: `prisma/` + `scripts/`, desen `prisma.question|question.create` harf duyarsız → eşleşme yok). ⇒ `CLAUDE.md`'nin *"tehlikeli = `prisma/seed.ts`"* uyarısı **kod-teyitli doğru**.
