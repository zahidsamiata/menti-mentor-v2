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
