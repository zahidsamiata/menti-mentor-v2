> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-21 (📸 fotoğraf tarihi) · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)
> ⚠️ Bu belge kalemlerin TANIMINI tutar, DURUMUNU TUTMAZ. Buradaki işaretler 2026-09-21 durumudur. Güncel durum: `docs/otonom/00-KUYRUK.md` (köprü: `docs/kararlar/00-KART-INDEKSI.md`)

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

**② Eşleştirmenin ANLAMINI doğrulayan test yok — "patlamıyor" testi var.**
14 dosyada **141 test**; bunların ~**131'i** yetki/tenant/tesisat doğruluyor (`matching.ts` testinin 16 testinden **15'i** hiçbir skor beklentisi içermiyor). *"Doğru mentör öne çıkıyor"* iddiasını, **iki aday arasında beklenen sıralamayı** açıkça assert eden **tek bir test bile yok**. Anlamlılığa en yakın iki test de **koşullu**: `feedback-loop.test.ts:123` assert'i `if (goodItems.length > 0 && …)` içinde, `matching.test.ts:176-184` ise `?minMatchScore=95` isteyip `>= 90` assert ediyor ve `forEach` kullanıyor ⇒ **liste boşsa ikisi de sessizce yeşil geçer.** Üstelik formülün en iyi koruması olan `scoring.test-cases.ts` (elle hesaplanmış beklentilerle) `vitest.config.ts:30`'un `include` kalıbı dışında kaldığı için **`npm test` onu hiç çalıştırmıyor**. Bu, KURAL 14'ün ders kitabı örneğidir: **CI yeşil, ama eşleştirme mantığı korumasız.**

**③ OCEAN motoru ölü — ama bugüne kadar hiçbir kullanıcı yanlış sonuç GÖRMEDİ.**
Ölçek hatası bağımsız doğrulandı (§3 B.1, elle hesapla): OCEAN çıktısı matematiksel olarak **[49,75 – 50,30]** bandına hapis, eşikler 60/55/45 ⇒ **8 arketipin 6'sı erişilemez**. **Ama PO'nun asıl sorusunun cevabı rahatlatıcı: hayır, kullanıcılar yanlış sonuç görmedi.** Ekrandaki *"Sen bir Öncü'sün"* kartı DISC harfinden üretiliyor (`onboardingController.ts:464-466` → `DiscRecallCard.tsx:57`) ve **OCEAN'a hiç uğramıyor** — iki veri farklı tablolarda (`User.discResultCard` ↔ `UserProfile.ocean*`), aralarında kod yolu yok. Kuyruktaki I-13 satırı bunu söylemiyordu; **söylemesi gerekir.** Buna karşılık iki yeni zincir bulundu: motor bu haliyle **bağlanırsa** `M1_m1=60` sabiti yüzünden karakter skoru **hiç ayırt etmez** (rastgeleden beter), ve toksik-çift vetosu **hiç tetiklenmez**.

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

---

## 5. BULGULAR — D · EŞLEŞTİRME KALİTESİ ÖLÇÜLÜYOR MU?

### D.1 ⭐ ANA BULGU — `Match` tablosu hiç yazılmıyor, üç yüzey birden ölü

`prisma.match.create` backend'in tamamında **tek yerde**: `scoring.service.ts:137`, `createMatchIfEligible` içinde — ve o fonksiyonun **sıfır çağıranı** var (kapsam K1). Ham SQL insert de yok (`$executeRaw|$queryRaw` taraması: `platformController.ts:143` · `tagController.ts:193` · `health.ts:33` — hiçbiri `Match`'e dokunmuyor).

**Bunun öldürdüğü üç yüzey:**

| # | Yüzey | Kod VAR mı | Kullanıcı ne görüyor |
|:--:|---|:--:|---|
| 1 | Mentörün onay kuyruğunda `%uyum` rozeti | ✅ `mentor/page.tsx:292` | `m.match` null ⇒ **hiç çizilmiyor** |
| 2 | Yöneticinin `/admin/eslesmeler` tablosu (arketip + skor sütunları) | ✅ `eslesmeler/page.tsx:134,142` | **"Henüz eşleşme yok"** (`:100`) — kalıcı |
| 3 | Çift risk sinyali (GREEN/YELLOW/RED) | ✅ `pairSignal.service.ts:37`, **testli** (`degerlendirme-metrik-asama1.test.ts:301-336`, 5 test) | Tek üreticisi `adminController.ts:433`, tek tüketicisi `eslesmeler/page.tsx:170` — **ikisi de aynı boş tabloya bağlı** ⇒ ulaşılamaz |

⚠️ **Dürüst nüans:** risk sinyalinin *hesabı* doğru, testli ve `MeetingCheckIn` verisi **gerçekten** FE'den yazılıyor (`meeting-checkin/page.tsx:49-73`). Kopan yer hesap değil, **gösterim**: sinyali ekrana taşıyan tek yol `Match` satırları üzerinden dönüyor. Yani *"çalışıyor ama görünmüyor"* — silinecek ölü kod değil, **bağlanacak yarım özellik** (silme protokolü gereği bu ayrım önemli).

### D.2 KOPMA NOKTALARI — öğrenme döngüsü nerede kesiliyor

**KOPMA 1 — kombinasyon skoru tek yönlü.** Check-in → `rewardPenalty.ts:58-62` `matchCombinationScore.upsert` (16 DISC kombinasyonu, ±ödül/ceza `:5-8`) **çalışıyor**. Okuyan taraf `getCombinationScores` (`:69`) yalnız bir admin ucundan çağrılıyor (`feedbackLogRoutes.ts:22-27`), **eşleştirme motorundan değil** (K5). Kodun kendi yorumu bunu itiraf ediyor (`:66-68`: *"…dinamik bonus/ceza **uygulayabilir**"* — gelecek zaman). ⇒ *"D mentör + S menti bu kurumda kötü gidiyor"* sinyali birikiyor, **bir sonraki eşleştirmenin skorunu asla değiştirmiyor.** Test kapsamı: `grep -rn "rewardPenalty" tests/` → **0**. Üstelik bu ucu çağıran FE ekranı da yok (`combination-scores` → FE'de 0 isabet) ⇒ **veri var, görünürlük yok, etki yok.**

**KOPMA 2 — otomatik kalibrasyon boş tabloyu okuyor. 🔴 EN SESSİZ HATA.**
- `algorithmTuner.ts:144-161` `getNpsStats` → `prisma.feedbackLog.findMany(...)`; `:290` `if (!phase3Nps.avgNps || phase3Nps.sampleSize < 10) return result;`
- `FeedbackLog`'a tek yazan: `feedbackLogController.ts:69`, route `POST /api/feedback-logs`. **Hiçbir frontend bu ucu çağırmıyor** (kapsam: FE `src/` tamamı, `feedback-logs|feedbackLog` → yalnız KVKK özet **okuması**, POST **0**).
- Gerçek NPS **başka tabloya** gidiyor: `periodic-survey/page.tsx:54-58` → `Feedback.periodicNpsScore` (`schema.prisma:648`). `FeedbackLog.npsScore` (`:519`) ile arasında **senkronizasyon yok.**
- ⇒ Haftalık cron (`cronScheduler.ts:71`, Pazar 02:00 UTC) **her hafta koşuyor** ve her seferinde guard'a takılıp *"Yeterli NPS verisi yok — ağırlıklar değişmedi"* (`algorithmTuner.ts:286,290-292`) dönüyor. Admin onay akışı (`:327-328`, `applyPendingAdjustment` `:373`) **hiç tetiklenmiyor.**
- ⇒ **Ağırlık ayarı veri-güdümlü değil, tamamen insan sezgisine bağlı** — geriye yalnız manuel `PUT /admin/algorithm-tuner/weights` kalıyor.
- ⇒ Yöneticinin **"Başarı oranı" KPI kartı** da aynı boş tablodan besleniyor (`adminController.ts:91-96`) ⇒ daima `null`; FE bunu hata olarak değil **`—`** olarak gösteriyor (`admin/kpi/page.tsx:70`). **Sessiz.**

**KOPMA 3 — üç soru toplanıyor, hiç okunmuyor.** `mentiNeeds` · `mentorStrengths` · `supportApproach` · `priorityValue`: tek yazan `onboardingController.ts`; `matching.ts` · `scoring.ts` · `scoring.service.ts` · `sector-scorer.service.ts` içinde **0 eşleşme**.

**KOPMA 4 — gölge OCEAN motoru** (§3) + `TenantMembership.qualityMultiplier` kalıcı alanını canlı eşleştirme **okumuyor** (`scoring.ts:163-166` kendi yorumuyla).

### D.3 ⭐ "Eşleştirmeleriniz işe yarıyor mu?" — bugün hangi veriyle cevap verilir

**Cevaplanabilir (gerçek veri + admin ucu + ekran):**

| Soru | Uç | Ekran | Kaynak |
|---|---|---|---|
| Mentörlerin kalite puanı | `TenantMembership.qualityMultiplier` | `admin/mentor-havuzu` | `Feedback.guidanceScore/resourceSharingScore/trustScore` — **gerçek** |
| Arz-talep / kimse kaynıyor mu | `GET /api/admin/health-metrics` (`adminController.ts:143`) | — | mentörsüz menti, ölü eşleşme, pasif üye — **gerçek** |
| Hacim sayıları | `GET /api/admin/kpi` (`adminController.ts:40`) | `admin/kpi/page.tsx:34` | `VisibilityOptIn` sayımları — **gerçek** |

**Cevaplanamayan:**
- *"Başarı oranımız ne?"* → `successRate` daima `null` (KOPMA 2), ekranda `—`.
- *"Hangi çiftler riskli?"* → hesap var, testli, veri var — **ama gösterim `Match` tablosuna bağlı** ⇒ ekran boş (D.1).
- ⭐ *"Yüksek skor verdiğimiz eşleşmeler gerçekten daha iyi gitti mi?"* → **hiçbir yerde hesaplanmıyor.** `predictedScore` yalnız `scoring.service.ts:138`'de **yazılıyor** (o da hiç çağrılmayan fonksiyonda); sonraki `MeetingCheckIn.overallRating` / `Feedback` puanlarıyla karşılaştıran **sorgu, servis veya uç yok** (kapsam: `predictedScore` BE `src/` tamamı → tek isabet, yazım).

> **NET CEVAP (D.3):** Sistem *"mentörlerin kalite katsayısı şu"* ve *"arz-talep dengesi şu"* diyebilir. Ama **"eşleştirme algoritmamız işe yarıyor mu"** sorusuna **cevap veremez** — algoritmanın tahminiyle gerçek sonucu karşılaştıran hiçbir mekanizma yok, ve ölçüm için yazılmış olanlar (`Match`, `FeedbackLog`, `MatchCombinationScore`) ya hiç yazılmıyor ya hiç okunmuyor.

### D.4 ⭐ TEST — "hesaplanıyor" mu, "anlamlı" mı?

14 ilgili test dosyası, **141 test** (`it(`/`test(` sayımı).

**KOVA A — "patlamıyor / yetki doğru / tesisat çalışıyor": ~131 test.**
Örnek: `matching.test.ts` 16 testin **15'i** hiçbir skor beklentisi içermiyor (401, PENDING dışlama, tenant izolasyonu, fallback'in boş dönmemesi).

**KOVA B — "skor ANLAMLI, doğru taraf öne çıkıyor": 2 yer, ikisi de kısıtlı.**
1. `scoring.unit.test.ts:35-41` + `:104-118` — ayırt edicilik ve monotonluk (*"farklı ağırlık → farklı skor"*, *"sektör ağırlığı artınca total artar"*). **Gerçek ama saf-fonksiyon düzeyinde**, sıralama düzeyinde değil.
2. `feedback-loop.test.ts:95-128` — `expect(badItems[0].totalScore).toBeLessThan(goodItems[0].totalScore)`. **Sistemin tek gerçek uçtan-uca anlamlılık iddiası.**

**⚠️ İki testin de kanıt değeri zayıflatılmış — ikisi de KOŞULLU:**
- `feedback-loop.test.ts:123` assert'i `if (goodItems.length > 0 && badItems.length > 0)` içinde ⇒ **liste boşsa assert hiç çalışmaz, test yeşil geçer.**
- `matching.test.ts:176-184` — `?minMatchScore=95` isteniyor, assert `toBeGreaterThanOrEqual(90)` (**eşikle uyumsuz**) ve `body.items.forEach(...)` ⇒ **boş listede boşuna geçer.**

⇒ **"İki aday arasında beklenen sıralamayı" açıkça assert eden tek bir test yok.** Kapsam: `grep -rn "items\[0\]" tests/matching.test.ts tests/mentor-matches.test.ts` → tek isabet `matching.test.ts:244` (uyarı rozeti).
⇒ `matching.test.ts:45-47` yalnız *"liste azalan sırada mı"* diyor — **hangi mentinin önde olması gerektiğini test etmiyor.** Eşitlik davranışını (A.3) hiç test etmiyor.

**⛔ `scoring.test-cases.ts` — en iyi kanıt CI dışında.**
Bu dosya aslında **kova B'ye en yakın malzeme**: sektör skoru (`:49-64`), DISC matris + vektör harmanı elle hesaplanmış beklentilerle (`:69-89`, *conf=0.5 → 67.5*), toplam formül (`:95-119`), anti-match (`:124-130`). Ama vitest değil — `console.log` + `process.exit(1)` betiği.
- Tek çağıran: `package.json:17` `"test:scoring": "tsx src/services/scoring.test-cases.ts"`
- **`npm test` çalıştırmıyor:** `vitest.config.ts:30` `include: ['tests/**/*.test.ts']` — dosya `src/` altında ve adı `.test-cases.ts`; üstelik `:33` `exclude`'da.
- Kaynak kodda **0 import**.
⇒ **Formül regresyonunun en iyi koruması, elle çağrılmadıkça hiç çalışmıyor.** (KURAL 14'ün tam örneği: CI yeşil ≠ test koştu.)

**OCEAN için test: SIFIR.** `tests/` altında `disc-to-ocean|scoring.service|sector-scorer|sjt-scorer|rewardPenalty|matchingInterface` → **0 eşleşme**. `ocean|OCEAN` → tek isabet `learning-journey.test.ts:133` `expect(after?.oceanO).toBeNull()` — OCEAN'ın **yazılmadığını** doğrulayan negatif test. ⇒ **100× ölçek hatasının aylarca sessiz kalmasının doğrudan sebebi.**

### D.5 Kalan kenar durum — kapasite

**KAPASİTE KAVRAMI KODDA YOK.** Kapsam: BE `src/` · `prisma/` · `tests/`, terimler `maxMentees · capacity · maxMenti · kontenjan · kapasite · activeMentiLimit · mentiLimit` (harf duyarsız, iki dilli) → **ilgili 0 eşleşme** (dönen 4 satır: SMTP adresi, seed soru metni, e-posta testi).
`scoreAndFilter`'ın tüm `continue` koşulları (`matching.ts:267,270,274,278,283`) içinde **aktif menti sayısı hiç sorgulanmıyor.**
⇒ **20 aktif mentisi olan mentör ile 0 mentisi olan mentör aynı havuzda, aynı skorla yarışıyor.** Yük dengeleme yok. Mentör personasının *"sürekli meşgul edilmek istemem, seçicilik korunmalı"* endişesinin (`mentor-persona-...:60-62`) kodda hiçbir karşılığı yok.

### D.6 Kenar durum — "hiç mentör yok" ile "eşleşen mentör yok" ayrımı

API ikisini de `{ items: [] }` + HTTP 200 olarak döndürüyor (`matching.ts:382,406`; `matchingController.ts:114`) ⇒ FE ikisini tek metinde birleştirmek zorunda: `menti/page.tsx:276-287` *"Şu an uygun mentor bulunamadı — Programınıza henüz mentor katılmamış ya da profilinizle eşleşen mentor yok. DISC profilinizin güncel olduğundan emin olun."* + `/disc-test` bağlantısı.
⚠️ **İki sonuç:** (1) kurumda gerçekten mentör yokken kullanıcı **kendi profilini suçluyor**; (2) gönderildiği `/disc-test` sayfası, havuzu tamamlamışsa onu 2,5 sn sonra geri atıyor (C.3) ⇒ **çıkışsız döngü.**

---

## 6. ⭐ HAZIR KUYRUK SATIRLARI

> ⛔ **Numara YOK** — `S-??`. Numarayı yalnız PO verir (`00-KUYRUK.md`'ye işlenirken).
> ⚠️ **Konsey talimatı gereği eşleştirme/skorlama dosyasına dokunan HER satır 🟡**'dır (hassas dosya) — kapı kuralının 2. istisnası.
> ⚠️ Aşağıdaki satırlar **güncel `00-KUYRUK.md`** (BB dalı) ile karşılaştırıldı. **Mevcut satırın tekrarı olanlar açılmadı**, §6.B'de "ek bulgu" olarak verildi.

### 6.A — YENİ SATIRLAR

| # | Şerit | İş | Kapı | Bitti demek (kullanıcı gözünden) | Durum | Not (kanıt) |
|---|---|---|:--:|---|---|---|
| S-?? | Ş0 | **Aday sorgularında `orderBy` yok → sıralama tekrarlanabilir değil + 500'den sonrası sessizce kesiliyor.** Deterministik ikincil anahtar (skor → id) + sorguya `orderBy` eklenmeli. | 🟡 | Menti sayfayı yenileyince mentör sırası değişmiyor; kalabalık kurumda hiçbir aday sessizce kaybolmuyor | BEKLIYOR | matching dosyası. Kanıt: comparator tie-breaker'sız `matching.ts:325`, `:429`; sorgular `orderBy`'sız `:149-172`, `:382-398`, ikisi de `take: 500`. `Array.sort` ES2019'dan stabil ⇒ giriş sırası korunur, **ama giriş sırası PostgreSQL'de `ORDER BY`'sız garanti değil**. ⚠️ Gerçek kaymanın sıklığı **TEYİT GEREK** (çalıştırılarak ölçülmeli) — kodda yokluk kesin. |
| S-?? | Ş0 | **⛔ CANLI SESSİZ HATA — onboarding vektörü `confidence`'sız yazılıyor.** Vektör eşleştirmede tamamen yok sayılıyor, ama API "%100 güven" raporluyor. | 🟡 | Onboarding'i bitiren kullanıcının cevapları eşleştirme skoruna gerçekten katılıyor; gösterilen güven değeri doğru | BEKLIYOR | matching/scoring. Kanıt zinciri: `onboardingController.ts:201` tip `{D,I,S,C}` (confidence **yok**) → `:474-478` doğrudan `User.discVector`'a yazım → `scoring.ts:72` `undefined > 0` = false ⇒ **vektör yok sayılır** → `scoring.ts:110` `?? (mentiDisc ? 1 : 0.5)` ⇒ **`confidence: 1` raporlanır** → `discVectorService.ts:37-50` `parseDiscVector` bu JSON'u **`null`** sayar. ⚠️ Bilinçli mi regresyon mu **TEYİT GEREK**; kodda gerekçe yorumu yok. ⚠️ `matching.ts:286` `as DiscVector` cast'i runtime doğrulaması yapmıyor — hata tam buradan sızıyor. |
| S-?? | Ş0 | **Likert yolu (`/disc-test`) `discType`'ı hiç yazmıyor** → testini güncelleyen kullanıcı onboarding'den kalma ESKİ `discType` ile eşleştiriliyor. | 🟡 | Kullanıcı DISC testini güncelleyince eşleştirmesi gerçekten değişiyor | BEKLIYOR | matching/scoring. Kapsam: `discVectorService.ts` tamamı, `discType` harf duyarsız → **0 eşleşme**. Matris skoru (`scoring.ts:74,83`) ve anti-match (`:24-29`) `discType`'a dayanıyor. ⚠️ S-?? (confidence) ile **AYNI DOSYA AİLESİ → SIRALI**. |
| S-?? | Ş0 | **`Match` tablosu hiç yazılmadığı için üç yüzey ölü:** mentör `%uyum` rozeti · yöneticinin `/admin/eslesmeler` tablosu · çift risk sinyali (GREEN/RED). | 🟡 | Yönetici eşleşme listesini ve risk sinyalini gerçekten görüyor; mentör onay kuyruğunda %uyum rozeti çıkıyor | BEKLIYOR | matching. **KÖK = mevcut U-18** (*"`Match` tablosuna yazan kod yok"*) — bu satır **U-18'in sonuç ayağı**, kök değil; PO isterse U-18 Not'una eklenip kapatılır. Kanıt: rozet `mentor/page.tsx:292` (`m.match` null) · tablo `eslesmeler/page.tsx:134,142` + boş durum `:100` · risk sinyali tek üretici `adminController.ts:433` ↔ tek tüketici `eslesmeler/page.tsx:170`. ⚠️ **Silinecek ölü kod DEĞİL** — hesap doğru ve **testli** (`degerlendirme-metrik-asama1.test.ts:301-336`), `MeetingCheckIn` verisi FE'den gerçekten yazılıyor (`meeting-checkin/page.tsx:49-73`); kopan yer **gösterim**. Silme protokolü adım 2 (ikame yok) sağlanıyor. |
| S-?? | Ş4 | **Yöneticinin "Başarı oranı" KPI kartı daima boş ve bunu söylemiyor** — `—` gösteriyor, "veri yok" demiyor. | 🟡 | Yönetici, başarı oranının neden boş olduğunu ekranda okuyor (sessiz `—` yerine) | BEKLIYOR | KPI/analytics. Kanıt: `adminController.ts:91-96` `successRate` kaynağı `feedbackLog.groupBy` (`:77-82`); `FeedbackLog`'a FE **hiç yazmıyor** (kapsam: FE `src/`, `feedback-logs\|feedbackLog` → POST **0**) ⇒ daima `null`; FE `?? '—'` ile gizliyor (`admin/kpi/page.tsx:70`). ⚠️ Hangi NPS'in canonical olduğu **ürün kararı** → KARAR-?? (§7-D). Bu satır yalnız **dürüst boş-durum**, veri kararını beklemez. |
| S-?? | Ş0 | **`dimensionalTotal` cache'inde tenant filtresi yok** → başka kurumun soruları paydaya giriyor, `confidence` olması gerekenden düşük çıkıyor. | 🟡 | Kullanıcının profil güven değeri kendi kurumunun soru havuzuna göre hesaplanıyor | BEKLIYOR | scoring/profil. Kanıt: `discVectorService.ts:73-75` `where: { isActive: true, discDimension: { not: 'GENERAL' } }` — `tenantId` yok. 5 dk TTL cache (`:62-79`). Etki: `confidence` düşük çıkınca `scoring.ts:75-78` harmanı matrise ağırlık verir. |
| S-?? | Ş0 | **Eşleştirmenin ANLAMINI test eden test yok** — iki aday arasında beklenen sıralamayı assert eden tek test bile yok. | 🟡 | (iç kalite — kullanıcı etkisi: formül bozulursa CI yakalar) | BEKLIYOR | matching/scoring testi. Kanıt: 14 dosya · **141 test**; kova B yalnız 2 yer (`scoring.unit.test.ts:35-41,104-118` saf-fonksiyon · `feedback-loop.test.ts:95-128` uçtan uca). `grep "items\[0\]"` → tek isabet `matching.test.ts:244` (uyarı rozeti). `matching.test.ts:45-47` yalnız *"azalan sırada mı"* diyor. Eşitlik davranışı (S-?? orderBy) hiç test edilmiyor. |
| S-?? | Ş0 | **İki "anlamlılık" testi de KOŞULLU — boş listede sessizce yeşil geçiyor** (vacuous). | 🟡 | (iç kalite — yeşil CI gerçekten bir şey kanıtlıyor) | BEKLIYOR | test. Kanıt: `feedback-loop.test.ts:123` assert `if (goodItems.length > 0 && badItems.length > 0)` içinde · `matching.test.ts:176-184` `?minMatchScore=95` isteniyor ama assert `toBeGreaterThanOrEqual(90)` (**eşikle uyumsuz**) ve `forEach` ⇒ boş listede boşuna geçer. ⭐ **KURAL 14'ün tam örneği.** |
| S-?? | Ş0 | **`scoring.test-cases.ts` — formülün en iyi koruması `npm test`'in DIŞINDA.** vitest'e alınmalı. | 🟡 | (iç kalite — formül regresyonu CI'da yakalanır) | BEKLIYOR | scoring testi. Kanıt: içerik kova-B malzemesi (`:49-64` sektör · `:69-89` matris+vektör harmanı elle hesaplı · `:95-119` toplam · `:124-130` anti-match) ama `console.log`+`process.exit(1)` betiği. Tek çağıran `package.json:17` `test:scoring`. `vitest.config.ts:30` `include: ['tests/**/*.test.ts']` **kapsamıyor**, `:33` `exclude`'da. Kaynak kodda **0 import**. |
| S-?? | Ş1 | **Menti "uygun mentor yok" mesajında kendi profilini suçluyor** — API "kurumda mentör yok" ile "eşleşen yok" ayrımını yapmıyor. | 🟢 | Kurumda hiç mentör yokken menti doğru sebebi okuyor, gereksiz yere DISC testine gönderilmiyor | BEKLIYOR | FE + küçük API alanı. Kanıt: `matching.ts:382,406` ikisi de `{items: []}` · `matchingController.ts:114` HTTP 200 · `menti/page.tsx:276-287` tek metin + `/disc-test` bağlantısı. ⚠️ **Çıkışsız döngü:** gönderildiği `/disc-test`, havuzu tamamlamış kullanıcıyı 2,5 sn sonra geri atıyor (S-?? tekrar test). |
| S-?? | Ş1 | **`/onboarding` adım 2 boş soru listesinde SONSUZ SPINNER** (savunmasız) + ilerleme yüzdesi `NaN`. | 🟢 | (savunma — bugün tetiklenmiyor; backend boş dönerse kullanıcı takılmıyor) | BEKLIYOR | yalnız FE, matching değil. Kanıt: `_OnboardingContent.tsx:209-212` "yükleniyor" ile "boş" ayrımı yok (ayrı `loading` state yok, başlangıç `[]` `:96`) · `DiscTestStep.tsx:116` `(currentIndex/total)*100` → `total=0` ⇒ **NaN**. ⚠️ Bugün sorular kodda sabit (`onboardingController.ts:109-190`) → tetiklenmez. Emsal: `/disc-test` bunu **doğru** yapıyor (`disc-test/page.tsx:94-96` `DiscTestEmpty`). |

### 6.B — MEVCUT SATIRLARA EK BULGU (yeni satır AÇILMADI)

| Mevcut satır | Ek bulgu (bu turda çıktı, kuyrukta yok) |
|---|---|
| **I-13** (OCEAN ölçek hatası) | ⭐ İki zincirleme sonuç: (1) `COMPATIBILITY_MATRIX['M1_m1']=60` (`scoring.config.ts:38-44`) ⇒ `getCharacterScore` (`scoring.service.ts:39-42`) **her çift için sabit 60** — motor I-13 düzeltilmeden bağlanırsa karakter skoru **hiç ayırt etmez**; (2) `BLOCKED_PAIRS={M4:['m3'],M1:['m4']}` (`:33`) ⇒ **toksik-çift vetosu hiç tetiklenmez**, `isHardBlocked` daima `false`. ⭐ Ayrıca: **`discToOcean`/`deriveArchetype` için sıfır birim testi** (kapsam §5 D.4) — hatanın sessiz kalmasının doğrudan sebebi; düzeltmeyle birlikte test yazımı düzeltmenin kendisinden kritik. ⭐ Onarım **şema migration'ı gerektirmez** (kolon tipleri aynı) ama **`backfill/recompute` gerektirir** — kayıtlı `ocean*` değerleri çöp, `archetype`'ların hepsi `M1`/`m1`. |
| **I-14** (iki `DiscVector` tipi) | Hatanın **tam yeri** bulundu: `scoring.service.ts:92-97` — tek geçiş noktası, adlandırılmış dönüştürücü yok, **isimler küçük harfe dönüyor sayılar dönmüyor**; iki tarafta da `number` olduğu için **TypeScript yakalayamaz**. ⭐ **Üçüncü bir ölçek yorumu:** `tests/compute-profile-idor.test.ts:33` `{discD:8,…}` = 0–10 gibi. |
| **U-18** (`Match` yazan kod yok) | Sonuç zinciri (§5 D.1): üç yüzey birden ölü. Ayrıca `Meeting.matchId` **yazılabilir** (`meetingController.ts:400,513`) ama canlı yol hiç göndermiyor — `/book-meeting`'e link veren tek yer `menti/page.tsx:325` yalnız `mentorId` gönderiyor. |
| **P-04** (mentör %uyum görmüyor) | ⚠️ **NOT DÜZELTMESİ:** kuyruk *"onay kuyruğunda %rozeti **hiç render edilmiyor**"* diyor — **rozet kodda VAR** (`mentor/page.tsx:292` `%{score} uyum`), beslendiği veri yok. Aday listesindeki çıplak sayı tespiti (`:491`) **doğru**. |
| **U-17** (temiz DB'de DISC havuzu boş) | Davranış tarafı: `/disc-test` boşta **doğru** davranıyor (`DiscTestEmpty`, K-02'de düzeltilmiş); `/onboarding` savunmasız. ⚠️ Mantık hatası: `questionService.ts:173` + `questionController.ts:327` `0 >= 0` ⇒ havuz **1 soruya** düşerse ilk cevapta `discAssessmentCompletedAt` yazılır ve admin'e *"test tamamlandı"* e-postası gider. |
| **F-08** (sektör paydası) | Güncel `main`'de **hâlâ açık**: `scoring.ts:40` payda `mentiSet.size` (2026-09-21 teyidi). |
| **F-11 / I-15** (motoru bağla, 🔴 KARAR-10) | §3 B.4 maliyet tablosu bu satırların karar dayanağıdır. ⚠️ **I-13 düzeltilmeden bağlama, rastgeleden beterdir** (yukarıdaki M1_m1=60 bulgusu). |
| **Y-17** (iki `rankMentorsForMenti`) | Güncel teyit: `matching.ts:351` (canlı, async) ↔ `scoring.service.ts:165` (ölü, senkron). Karışıklık riski gerçek — bu raporun kendisi de ayrımı her seferinde açıkça yazmak zorunda kaldı. |
| **F-31** | İlgisiz — dokunulmadı. |

---

## 7. ⭐ HAZIR KARAR KARTLARI

> ⛔ Numara YOK (`KARAR-??`) · ⛔ `CEVAP:` satırları **BOŞ** — yalnız PO doldurur.

### KARAR-?? · DISC testi tekrar edilebilsin mi? (3 düğme bunu vaat ediyor, hiçbiri çalışmıyor) (2 işi açar)  [ÜRÜN KARARI · VERİ]
**Şu an ne var:** Arayüzde üç ayrı düğme *"DISC Testini Güncelle"* / *"DISC Profilini Güncelle"* diyor (`mentor/page.tsx:163` · `menti/page.tsx:284` · `profile/page.tsx:225,234`). Üçü de `/disc-test`'e götürüyor. Ama soru havuzunun **tamamını** cevaplamış bir kullanıcı oraya girince tek soru bile göremiyor: sistem *"DISC Profiliniz Hazır!"* yazıp **2,5 saniye sonra panoya geri atıyor** (`questionService.ts:174` → `useDiscTest.ts:223,195-199` → `disc-test/page.tsx:53-56`). Cevapları sıfırlayan hiçbir yol yok (kapsam: BE `src/`, `userResponse.delete|reset.*test|retake` → tek isabet hesap silme).
**Sorun ne:** Kullanıcıya bir söz veriliyor ve sessizce tutulmuyor. Kişi kendini değişmiş hissedip profilini güncellemek istiyor, düğmeye basıyor, hiçbir şey olmuyor. Üstelik "uygun mentor bulunamadı" ekranı da onu **aynı çalışmayan sayfaya** yönlendiriyor (`menti/page.tsx:276-287`) → çıkışsız döngü.
**Neden sana soruyorum:** Testin tekrar edilebilmesi teknik değil ürün/veri kararı. Tekrar test **eski cevapların üzerine yazar** (`@@unique([userId, questionId])` + `upsert`, `questionService.ts:198-208`) — geçmiş tutulmuyor. "Kişinin eski profili silinsin mi, yoksa saklansın mı" verinin anlamını belirler.
**Seçenekler:**
**A) Düğmeleri dürüst yap** — tekrar testi açma, düğmeyi *"DISC profilimi gör"*e çevir · Kullanıcı: vaat edilmeyen şeyi beklemiyor · Kazanç: yalan biter, iş S · Kayıp: kişi profilini **hiç** güncelleyemez; zamanla profil bayatlar ve eşleştirme eskiyen veriyle çalışır · Süre **S** · Geri alınır **evet** · Migration **yok**
**B) Tekrar testi aç, eski cevapların üzerine yaz** · Kullanıcı: testi baştan alabiliyor · Kazanç: vaat tutulur, profil tazelenir · Kayıp: **eski profil geri getirilemez**; "kişi zamanla nasıl değişti" sorusu sonsuza kadar cevapsız kalır; kötü niyetli kullanıcı skorunu deneme-yanılmayla optimize edebilir · Süre **M** · Geri alınır **hayır (veri kaybı)** · Migration **yok**
**C) Tekrar testi aç + eski cevabı sürümle** (geçmiş tablosu) · Kullanıcı: B ile aynı · Kazanç: profil değişimi izlenebilir, ileride "gelişim grafiği" mümkün · Kayıp: **yeni tablo = migration**; canlı DB'ye dokunuş; iş belirgin büyür · Süre **L** · Geri alınır **kısmen** · Migration **VAR**
**Karşılaştırma:** Bugün canlıda çok az kullanıcı varsa B'nin veri kaybı küçüktür ve vaadi hemen tutar. Ürün ileride "kendi gelişimini gör" iddiası taşıyacaksa C'yi sonradan eklemek, B'den sonra **geriye dönük veriyi kurtaramaz** — o veri zaten kaybolmuş olur. A, en ucuz ve en dürüst olan; ama profil tazeleme ihtiyacını tamamen erteler.
**Benim önerim:** **B** — çünkü vaat zaten verilmiş durumda ve tutulmaması kullanıcıya bugün zarar veriyor; sürümleme ayrı ve sonradan verilebilecek bir karar. *(Bu senin ürün kararın; "geçmişi saklamak" sana önemli geliyorsa önerime güvenme, C doğrudur.)*
**Cevap vermezsen:** Üç düğme yalan söylemeye devam eder; "uygun mentor yok" ekranındaki çıkışsız döngü kapanmaz.
**CEVAP:**

---

### KARAR-?? · Mentörün bir kontenjanı olsun mu? (1 işi açar)  [ÜRÜN KARARI · ŞEMA]
**Şu an ne var:** Kapasite/kontenjan kavramı **kodda hiç yok** (kapsam: BE `src/` · `prisma/` · `tests/`, terimler `maxMentees · capacity · maxMenti · kontenjan · kapasite · activeMentiLimit · mentiLimit` harf duyarsız, iki dilli → ilgili **0 eşleşme**). Eşleştirmenin hiçbir elemesi aktif menti sayısına bakmıyor (`matching.ts:267,270,274,278,283`).
**Sorun ne:** 20 aktif mentisi olan mentör ile hiç mentisi olmayan mentör **aynı havuzda, aynı skorla** yarışıyor. Sektörü uyan popüler bir mentör herkese önerilmeye devam ediyor; yeni katılan mentöre hiç talep gitmiyor. Mentör personasının kendi endişesi bu: *"sürekli meşgul edilmek istemem — mentörlük ara ara bir iştir"* ve *"herkesle eşleşmek istemem, seçicilik korunmalı"* (`persona/mentor-persona-...:60-62`).
**Neden sana soruyorum:** Kontenjan koymak *"kim kiminle eşleşebilir"i* değiştirir — bir mentör, uyumlu olduğu halde bir mentiye artık görünmez. Bu bir ürün vaadidir, teknik ayar değil.
**Seçenekler:**
**A) Kontenjan yok (bugünkü durum)** · Kullanıcı: değişiklik yok · Kazanç: iş yok; menti her zaman en uyumlu mentörü görür · Kayıp: popüler mentör bunalır ve platformu bırakabilir; yeni mentör hiç talep almaz, o da bırakır · Süre **yok** · Migration **yok**
**B) Mentör kendi kontenjanını belirlesin** (profilinde "aynı anda en fazla N menti") · Kullanıcı: mentör bir sayı seçer; dolunca havuzdan düşer · Kazanç: seçicilik mentörün elinde, persona endişesi karşılanır · Kayıp: **yeni alan = migration**; menti "dün gördüğüm mentör kayboldu" diyebilir; kontenjan dolu kurumda menti hiç mentör göremeyebilir · Süre **M** · Geri alınır **evet (alan kalır, filtre kapatılır)** · Migration **VAR**
**C) Kontenjan yok ama skorda yumuşak yük dengesi** (aktif menti sayısı arttıkça skor bir miktar düşer) · Kullanıcı: yoğun mentör listede aşağı iner ama **kaybolmaz** · Kazanç: migration yok (sayım canlı hesaplanır); kimse havuz dışında kalmaz · Kayıp: mentörün kendi tercihi **sorulmamış** olur — persona endişesi tam karşılanmaz; skorun anlamı bulanır ("%uyum" artık saf uyum değil) · Süre **M** · Geri alınır **evet** · Migration **yok**
**Karşılaştırma:** Sorun bugün "mentör bunalıyor" mu, yoksa "yeni mentör talep alamıyor" mu — cevaba göre değişir. Birincisiyse B (tercih mentörde), ikincisiyse C (dağıtım düzelir, kimse kaybolmaz). A yalnız mentör sayısı mentiden fazlaysa güvenlidir.
**Benim önerim:** **C** — çünkü migration gerektirmiyor ve iki sorunun da acı tarafını azaltıyor; B sonradan üzerine eklenebilir. *(Bu senin ürün kararın; mentörlerin "beni koru" demesi senin için asıl mesele ise B doğrudur.)*
**Cevap vermezsen:** Dağıtım dengesizliği sessizce devam eder; kimse şikâyet etmediği için de fark edilmez.
**CEVAP:**

---

### KARAR-?? · İki yön neden farklı? Menti, mentörün elediği bir eşleşmeyi görmeye devam etmeli mi? (1 işi açar)  [ÜRÜN KARARI]
**Şu an ne var:** Eşleştirme iki yönde **asimetrik** çalışıyor (`matching.ts:265-323` ↔ `:406-427`). Mentör→menti yönünde altı mekanizma var: kalite çarpanı, toksik-çift vetosu (D mentör × S menti), zaman uyumu, beklenti kesişimi, 4 kademeli fallback, iletişim tarzı bonusu. **Menti→mentör yönünde bunların HİÇBİRİ yok** — eşik bile okunmuyor.
**Sorun ne:** Aynı çift, iki taraftan bakınca **farklı yüzde** görüyor. Mentörün *"bana uygun değil"* diye eleyeceği bir menti, kendi panelinde o mentörü yüksek uyumla görüp talep gönderiyor — ve reddediliyor. Menti için bu, sistemin ona yanlış umut vermesidir.
**Neden sana soruyorum:** "Menti neyi görebilmeli" doğrudan ürün kararıdır. Filtreleri menti yönüne de uygulamak, menti havuzunu **daraltır** — az mentörlü kurumda menti ekranı boşalabilir.
**Seçenekler:**
**A) Bugünkü gibi kalsın (menti her şeyi görür)** · Kullanıcı: değişiklik yok · Kazanç: menti ekranı hiç boşalmaz, umut sinyali korunur · Kayıp: yanlış umut ve boşa giden talepler sürer; iki taraftaki yüzde tutarsızlığı açıklanamaz · Süre **yok** · Migration **yok**
**B) Filtreler iki yöne de uygulansın (simetrik)** · Kullanıcı: menti yalnız gerçekten uyumlu mentörleri görür · Kazanç: yüzdeler tutarlı, boşa talep azalır · Kayıp: **menti ekranı boşalabilir** — özellikle küçük kurumda; "hiç mentör yok" hissi menti personasının en büyük kayıp riski (`menti-persona-...:65,73`) · Süre **M** · Geri alınır **evet** · Migration **yok**
**C) Simetrik filtre + menti yönünde fallback** (eleme uygulanır, boşalırsa kademeli gevşer — mentör yönündeki 4 kademenin aynısı) · Kullanıcı: uyumlu liste görür; liste boşalırsa "uyum düşük" rozetiyle yine bir şey görür · Kazanç: B'nin tutarlılığı + A'nın boşalmama güvencesi · Kayıp: en büyük iş; iki yönün kodu ortaklaştırılmalı (bugün ayrı yazılmış) · Süre **L** · Geri alınır **evet** · Migration **yok**
**Karşılaştırma:** Kurumlarda mentör sayısı mentiden azsa B tehlikelidir — menti boş ekran görür ve gider. C bu riski kapatır ama en pahalısıdır. A yalnız "yanlış umut"un maliyetini kabul ediyorsan doğrudur.
**Benim önerim:** **C** — çünkü fallback mekanizması zaten yazılı (`matching.ts:200-227`), diğer yöne taşınması sıfırdan tasarım değil. *(Bu senin ürün kararın.)*
**Cevap vermezsen:** Asimetri sürer; "neden mentörde %74, bende %88 yazıyor?" sorusunun cevabı olmaz.
**CEVAP:**

---

### KARAR-?? · Algoritma kendi sonuçlarından öğrensin mi — ve hangi memnuniyet verisi "gerçek" sayılsın? (3 işi açar)  [ÜRÜN + VERİ KARARI]
**Şu an ne var:** Sistemde **öğrenme döngüsü yazılmış ama kapalı**. İki ayrı kopma:
 1. Görüşme sonrası check-in'lerden *"D mentör + S menti bu kurumda kötü gidiyor"* sinyali hesaplanıp `MatchCombinationScore` tablosuna **yazılıyor** (`rewardPenalty.ts:58-62`) — ama eşleştirme motoru bu tabloyu **hiç okumuyor** (kapsam K5). Kodun kendi yorumu gelecek zamanla yazılmış: *"…bonus/ceza **uygulayabilir**"* (`:66-68`).
 2. Haftalık otomatik ağırlık ayarı (Pazar 02:00, `cronScheduler.ts:71`) `FeedbackLog` tablosunun NPS'ini okuyor (`algorithmTuner.ts:144-161`) — ama **hiçbir ekran o tabloya yazmıyor** (FE'de `POST /api/feedback-logs` → **0**). Gerçek memnuniyet **başka tabloya** gidiyor: `Feedback.periodicNpsScore` (`periodic-survey/page.tsx:54-58`). İki alan arasında senkron yok. ⇒ Cron her hafta koşup *"yeterli veri yok"* deyip dönüyor; yöneticinin **"Başarı oranı"** kartı da bu yüzden daima boş.
**Sorun ne:** Ürün *"gerçek kullanıcı verisi biriktikçe kalibre edilecek"* diye yazılı bir söz veriyor (`eslesme-uyum-po-inceleme-2026-08-26.md:91`). Bugün o söz **yapısal olarak tutulamaz**: veri toplanıyor, bir yere yazılıyor, ama okuyan yok. Kurum *"eşleştirmeniz işe yarıyor mu"* diye sorduğunda sistem cevap veremiyor.
**Neden sana soruyorum:** İki ayrı ürün sorusu var, ikisi de teknik değil: (a) algoritma kendi kendine değişsin mi, yoksa değişiklik hep insan onayından mı geçsin; (b) hangi memnuniyet ölçümü **resmî** sayılsın. (b) verinin anlamını belirler ve geri dönüşü zordur.
**Seçenekler:**
**A) Döngü kapalı kalsın; yalnız dürüstlük düzeltilsin** (KPI kartı "veri yok" desin, yanıltıcı `—` yerine) · Kullanıcı: yönetici neden boş olduğunu okur · Kazanç: en ucuz; yanlış izlenim biter · Kayıp: algoritma **hiç öğrenmez**; ağırlıklar sonsuza kadar sezgisel kalır; toplanan check-in verisi çöpe gider · Süre **S** · Geri alınır **evet** · Migration **yok**
**B) Tek canonical NPS seç + otomatik ayarı çalışır hale getir** (`Feedback.periodicNpsScore`'u tuner'a bağla) · Kullanıcı: yönetici gerçek başarı oranını görür; ağırlıklar veriye göre önerilir (uygulama yine admin onayıyla, `algorithmTuner.ts:373`) · Kazanç: verilen söz tutulur; ağırlık sezgiden çıkar · Kayıp: iki alandan biri **terk edilir** → `FeedbackLog.npsScore` ölü alan olur (silme protokolü gerekir); eşiğe (≥10 yanıt) ulaşana kadar yine boş görünür · Süre **M** · Geri alınır **evet** · Migration **yok** (mevcut alanlar kullanılır)
**C) B + kombinasyon skorunu da sıralamaya bağla** (tam öğrenme döngüsü) · Kullanıcı: eşleştirme zamanla o kuruma özel iyileşir · Kazanç: yatırılmış emeğin tamamı karşılığını verir; ürünün asıl iddiası gerçekleşir · Kayıp: **sıralama kendiliğinden değişmeye başlar** — aynı menti dün gördüğü mentörü bugün göremeyebilir ve sebebini kimse açıklayamaz; az veriyle erken öğrenme **yanlış** öğrenmedir; hata ayıklaması zor · Süre **L** · Geri alınır **kısmen (bayrakla kapatılır, öğrenilmiş katsayılar kalır)** · Migration **yok**
**Karşılaştırma:** Canlıda kullanıcı sayısı düşükken C tehlikelidir — birkaç kötü check-in bütün bir DISC kombinasyonunu cezalandırır ve kimse farkı anlayamaz. B, sözü tutar ve insan onayını korur. A yalnız "şimdilik ölçmeyeceğiz" demeye hazırsan doğrudur — ama o zaman kalibrasyon sözünün belgeden **çıkarılması** gerekir, yoksa her denetimde yeniden bulunur.
**Benim önerim:** **B** — çünkü sözü tutuyor, insan onayını koruyor ve az veriyle yanlış öğrenme riskini almıyor. *(Bu senin ürün kararın.)*
**Cevap vermezsen:** Cron her hafta boşa koşar, KPI kartı sessizce boş kalır, toplanan check-in verisi hiçbir işe yaramaz.
**CEVAP:**

---

### KARAR-10 · OCEAN/SJT psikometri motoru — **YENİ KART DEĞİL, MALİYET EKİ**
⚠️ Bu konunun kartı **zaten var** (`01-KARARLAR.md:225`). Yeni kart açılmadı. §3 **B.4** o kartın A/B/C seçeneklerinin **somut maliyet tablosudur** (kaç dosya · hangi test · hangi davranış · migration · ne kaybedersin · regresyon riski) ve şu iki yeni gerçeği ekler:
- ⛔ **I-13 düzeltilmeden bağlama (seçenek C), rastgeleden beterdir:** `M1_m1=60` sabiti yüzünden karakter skoru **hiç ayırt etmez**.
- ⛔ **Motorun sıfır birim testi var** ⇒ hangi seçenek seçilirse seçilsin, onarımın doğruluğunu kanıtlayacak kanıt örtüsü **bugün yok**.
Kartın içindeki *"AĞUSTOS SİNYALİ"* gerilimi (ağustos yönü C'ye yakın, kart önerisi A) **hâlâ çözülmemiş** — bu rapor o gerilimi çözmez, yalnız fiyatını koyar.

---

## 8. PO'NUN ELLE YAPACAKLARI

Bu turdan çıkan, **kodla çözülemeyen** iki kalem (`docs/otonom/03-PO-ELLE-ISLER.md`'ye aday — ajan oraya yazmaz, PO karar verir):

| # | İş | Neden kod değil |
|:--:|---|---|
| 1 | **Canlı DB'de ölç:** kaç `UserProfile` satırında `archetype != null` · kaç kullanıcı Likert havuzunu **tamamlamış** (tekrar-test kilidinden etkilenen kitle) · `Tenant.tenantVocabulary.algorithmWeights` kayıtlı mı (yani ağırlık gerçekten 60/40 mı) | Bulut oturumunun DB erişimi yok; üçü de **varsayılmamalı, ölçülmeli**. ⚠️ KARAR-?? (canlı DB salt-okuma) bu işi açar. |
| 2 | **`eslesme-uyum-po-inceleme-2026-08-26.md`'deki boş `[ ] PO notu:` satırlarını doldur** — 16 uyum değeri · D>I>S>C sırası · %60/%40 ağırlık | Belge kendisi *"bu sayılar sezgiseldir, onaylamak ürün kararıdır ve karar sizindir"* diyor (`:87-91`). Ajan bu onayı veremez. 21 gündür boş. |

---

## 9. ✅ ZATEN İYİ — bu bölüm boş bırakılmaz

Denetimler bozuğu bulur; sağlamı da yazmak gerekir, yoksa sonraki tur aynı yeri yeniden kazar.

1. **Fallback mimarisi sağlam.** Mentör yönünde 4 kademeli gevşeme (`matching.ts:200-227`) + son kademede **uyarı rozeti** (`mentor/page.tsx:494`). Tenant barajı kademe-3'te bilinçli atlanıyor — *aktivasyon deadlock'u* düşünülmüş.
2. **DISC harf beraberliği deterministik.** `D > I > S > C` sabit sırası hem `discLetters.ts:45,68` hem `onboardingController.ts:208` içinde, ve **ikincisi JS `sort` kararlılığına güvenmemek için açıkça** öyle yazılmış (kod yorumu `:207`). Doğru refleks.
3. **Kısmi profil doğru harmanlanıyor.** `confidence × vektör + (1−confidence) × matris` (`scoring.ts:75-78`) — test yarım bırakılmışken bile anlamlı skor. Tasarım olarak sağlam.
4. **N+1 yok.** Ağırlıklar sıralama başında bir kez okunuyor (`matching.ts:102-104` yorumuyla birlikte); risk sinyali tek batch sorgu (`adminController.ts:394-397`, yorumda *"N+1 yok, TENANT-SCOPED"*).
5. **Tenant izolasyonu eşleştirmede sıkı.** Çapraz havuz yalnız **iki taraf da** `isSharedPoolActive` ise (`matching.ts:130-144`); aday sorgusu `TenantMembership.role` üzerinden (`User.role` değil) — proje kuralına uygun.
6. **KVKK refleksi eşleştirmede çalışıyor.** Menti→mentör DTO'sundan `discScore` **çıkarılıyor** (`matching.ts:345-347`, KARAR 5) ve bunun **testi var** (`disc-visibility.test.ts`, 5 test). Admin eşleşme listesi yorumu da *"ham discVector/email DÖNMEZ"* diyor (`adminController.ts:355-356`).
7. **`/disc-test` boş-durumu örnek davranış.** İskelet → hata + yeniden dene → **boş-durum metni** (`page.tsx:86,89-91,94-96`). K-02'de düzeltilmiş ve kod yorumu neyin düzeltildiğini yazıyor. `/onboarding`'in yapması gereken tam olarak bu.
8. **Ağırlık ayarında insan koruması var.** `validateManualWeights` (%5 katı, 0.40–0.70 sınır, toplam 1.00) + RBAC + **audit izi**, 20 testle korunuyor (`algorithm-weights-manual*.test.ts`). Otomatik ayar da admin onayından geçiyor (`algorithmTuner.ts:373`).
9. **Belge dürüstlüğü.** `eslesme-uyum-po-inceleme-2026-08-26.md:87-91` sayıların sezgisel olduğunu **açıkça** yazıyor. Bu rapor o dürüstlüğü doğruladı — nadir ve değerli.
10. **`CLAUDE.md`'nin seed uyarısı kod-teyitli doğru.** *"Tehlikeli = `prisma/seed.ts`"* — `:300` filtresiz `userResponse.deleteMany()` ve `:318` global soru silme doğrulandı; güvenli listedeki üç dosya `Question`'a gerçekten yazmıyor.

---

## 10. TARANAMAYANLAR + NEDEN

| Kalem | Neden taranamadı | Nasıl kapanır |
|---|---|---|
| Canlı DB sayıları (`archetype != null` satır sayısı · havuzu tamamlamış kullanıcı sayısı · kayıtlı `algorithmWeights` · `Question` tablosundaki gerçek soru sayısı) | Bulut oturumunun DB erişimi yok; kural gereği canlıya istek atılmadı | §8 #1 (PO) · KARAR-?? (canlı DB salt-okuma) |
| `orderBy` yokluğunun **pratikte** ne sıklıkla sıra değiştirdiği | Ölçüm çalıştırma gerektirir (salt-okuma turu) | Eşit skorlu iki aday tohumlanıp aynı uç N kez çağrılarak — S-?? (orderBy) işinin testi |
| `/api/users/:userId/adaptive-test/*` canlıda gerçekten kullanılıyor mu | `DailyQuestionWidget` iki panelde mount edilmiş (`menti/page.tsx:234`, `mentor/page.tsx:169`) ⇒ **kullanılıyor**; ama `adaptiveTestEngine.ts:194-201`'deki `id:'PLACEHOLDER'` sahte sorusunun FE'de nasıl render edildiği izlenmedi | `DailyQuestionWidget.tsx` davranış izi — ayrı küçük iş |
| `sectorTags`'in hangi ekrandan doldurulduğu | Skorun %60'ını besliyor ama bu turun kapsamı motor tarafıydı | Ayrı tur (etiket altyapısı; `eslestirme-motoru-kesfi-2026-08-27.md` §4'te kısmen var) |
| `matchingInterface.ts` içeriği | Yalnız **hiçbir yerden import edilmediği** doğrulandı (K6); 100 satırın niyeti okunmadı | Y-17 ile aynı aile — silme protokolü adım 1 (niyet) gerektirir |
| `60/40` ve DISC matris hücrelerinin ürün gerekçesi | `docs/` tarandı ve **gerekçenin olmadığı** belgenin kendi ifadesiyle doğrulandı (A.2) — ama her belge tek tek okunmadı | §8 #2 (PO notu) |

---

## 11. ⭐ KALEM LİSTESİ (KURAL 9)

> Numara YALNIZ `00-KARAR-TAKIP`'te doğar. **Birim (KURAL 16):** "kalem" = bu raporun ürettiği, tek cümleyle ifade edilebilen bağımsız bulgu.

| # | Kalem | durum | numara-adayı-mı |
|:--:|---|:--:|---|
| 1 | Aday sorgularında `orderBy` yok → sıralama tekrarlanabilir değil | ⬜ | **EVET** (yeni) |
| 2 | `take: 500` + `orderBy` yok → kalabalık kurumda sessiz kesme | ⬜ | **EVET** (yeni) |
| 3 | Onboarding vektörü `confidence`'sız → vektör yok sayılıyor ama "%100 güven" raporlanıyor | 🟡 | **EVET** (yeni, CANLI) |
| 4 | Likert yolu `discType` yazmıyor → eski tiple eşleştirme sürüyor | 🟡 | **EVET** (yeni) |
| 5 | `Match` boş → 3 yüzey ölü (rozet · admin tablosu · risk sinyali) | 🟡 | hayır — **U-18'in sonucu** |
| 6 | `FeedbackLog`'a FE hiç yazmıyor → haftalık cron no-op, `successRate` daima null | 🟡 | **EVET** (yeni) |
| 7 | `MatchCombinationScore` yazılıyor, sıralamada hiç okunmuyor | 🟡 | **EVET** (yeni) |
| 8 | Üç soru (S1/S2/S3) toplanıyor, hiçbir skorlama dosyasında okunmuyor | ⬜ | **EVET** (yeni) |
| 9 | Eşleştirmenin anlamını test eden test yok (141 testin ~131'i "patlamıyor") | ⬜ | **EVET** (yeni) |
| 10 | İki anlamlılık testi de koşullu → boş listede vacuous geçiyor | 🟡 | **EVET** (yeni) |
| 11 | `scoring.test-cases.ts` `npm test` kapsamı dışında | 🟡 | **EVET** (yeni) |
| 12 | OCEAN için sıfır birim testi | ⬜ | hayır — **I-13'e ek** |
| 13 | `M1_m1=60` ⇒ motor bağlanırsa karakter skoru hiç ayırt etmez | ⬜ | hayır — **I-13'e ek** |
| 14 | `BLOCKED_PAIRS` hiç tetiklenmiyor (toksik-çift vetosu ölü) | ⬜ | hayır — **I-13'e ek** |
| 15 | OCEAN onarımı migration değil **backfill** gerektirir | ❓ | hayır — **I-13'e ek** |
| 16 | Hatanın tam yeri `scoring.service.ts:92-97`; TS yakalayamaz | 🟡 | hayır — **I-14'e ek** |
| 17 | Üçüncü ölçek yorumu: test fixture 0–10 | ❓ | hayır — **I-14'e ek** |
| 18 | Kapasite/kontenjan kavramı kodda yok | ⬜ | **EVET** (yeni, ürün kararı) |
| 19 | İki yön asimetrik (6 mekanizma tek yönde) | ⬜ | **EVET** (yeni, ürün kararı) |
| 20 | Havuzu tamamlamış kullanıcı testi tekrar edemiyor; 3 düğme vaat ediyor | 🟡 | **EVET** (yeni, ürün kararı) |
| 21 | `dimensionalTotal` cache tenant filtresiz → confidence düşük | 🟡 | **EVET** (yeni) |
| 22 | "Mentör yok" ile "eşleşen yok" ayrımı API'de yok → menti kendini suçluyor | ⬜ | **EVET** (yeni) |
| 23 | `/onboarding` boş soru listesinde sonsuz spinner + NaN | ⬜ | **EVET** (yeni, savunma) |
| 24 | Havuz 1 soruya düşerse ilk cevapta "test tamamlandı" e-postası gider (`0>=0`) | ⬜ | hayır — **U-17'ye ek** |
| 25 | P-04 notu bayat: rozet kodda VAR, veri yok | 🗑️ | hayır — **P-04 not düzeltmesi** |
| 26 | `%uyum` vaadi (persona P1) hâlâ kurulamıyor; 08-20 denetimi bunu ✅ saymıştı | 🟡 | hayır — **P-04/panel-denetimi'nde var** |
| 27 | `predictedScore` ↔ gerçek sonuç korelasyonunu ölçen hiçbir kod yok | ⬜ | **EVET** (yeni) |
| 28 | `prisma/seed.ts:300` filtresiz `userResponse.deleteMany()` — vektör kalır, cevaplar gider | ⬜ | hayır — `CLAUDE.md` uyarısının **kod teyidi** |

**KALEM LİSTESİ: 28 satır** — numara-adayı **EVET: 16** · mevcut satır/karta ek: **12**.

---

> **Kapanış:** Bu tur yalnız TESPİT. Kod, belge, şema, DB, seed **değişmedi**; hiçbir şey silinmedi; kuyruk işi yapılmadı; karar/satır numarası verilmedi; `CEVAP:` satırları boş. PR açık, **MERGE EDİLMEDİ** (bulut merge edemez).
