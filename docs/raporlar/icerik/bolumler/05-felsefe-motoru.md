# İçerik Dökümü — Puanlama ve Felsefe Motoru (2026-08-26)
**🟢 BYPASS (yalnız-belge) · 📸 DONDURULMUŞ (2026-08-26)** — kaynak: backend servis kodu. PII yoktur.

> Tüm iddialar `dosya:satır` kanıtıyladır. Gerekçe bulunamayan yerlerde açıkça
> "BELGELENMEMİŞ" / "TEYİT GEREK" yazılmıştır — İCAT EDİLMEMİŞTİR.

---

## (a) `adaptiveTestEngine.ts` — soru seçimi (CORE sıralı, DEEPENING koşullu)

Dosya: `backend/src/services/adaptiveTestEngine.ts`

**Ana fonksiyonlar:**

| Fonksiyon | Satır | Görev |
|---|---|---|
| `getNextQuestion(userId, tenantId)` | 148 | Ana motor — yanıt geçmişine göre sıradaki soruyu veya bitiş sonucunu döndürür |
| `computeRawScores(history)` | 68 | Boyut başına ham DISC ortalaması (Likert→ağırlık) |
| `normalizeToVector(raw, confidence)` | 86 | Ham skorları toplam=1.0'a normalize eder |
| `getDominantType(raw)` | 100 | En yüksek boyutu döndürür (baskın tip) |
| `computeProgress(...)` | 116 | Saf ilerleme özeti (faz/yüzde) |
| `previewDiscVector(userId)` | 264 | Profil yazmadan anlık vektör önizlemesi |

**Soru seçim akışı (`getNextQuestion`):**
1. Tüm aktif sorular çekilir, `orderBy: [{ type: 'asc' }, { order: 'asc' }]` (satır 166) — bu sıralama CORE'u önce getirir (`CORE` < `DEEPENING` alfabetik) ve grup içinde `order` alanına göre sıralar.
2. **CORE fazı (sıralı):** Yanıtsız CORE varsa → ilk yanıtsız CORE döner (`unansweredCore[0]`, satır 175-184). Kesinlikle sıralı: her zaman `order`'a göre en baştaki yanıtsız.
3. **CORE bitti ama eşik altı:** Tüm CORE yanıtlandı ama `coreAnsweredCount < MIN_CORE_RESPONSES` → PLACEHOLDER soru döner (satır 194-201). *Not: CORE sayısı 5'ten azsa bu dal teorik olarak tetiklenir; pratikte havuz 20 CORE olduğundan ulaşılmaz.*
4. **DEEPENING fazı (koşullu):** Baskın boyut hesaplanır (`getDominantType`), yalnızca **baskın boyuta ait VEYA `GENERAL`** DEEPENING soruları açılır (satır 207-209). İlk yanıtsız DEEPENING döner.
5. **Tamamlandı:** DISC vektörü hesaplanır, `user.discVector` + `user.discType` güncellenir (satır 237-243), `done: true` döner.

---

## (b) CORE→DEEPENING geçiş koşulu (`MIN_CORE_RESPONSES`)

`adaptiveTestEngine.ts` içinde geçiş koşulu **iki yerde** kontrol edilir:
- Satır 22: `const MIN_CORE_RESPONSES = 5;` (sabit)
- Satır 194: `if (coreAnsweredCount < MIN_CORE_RESPONSES)` → eşik altında DEEPENING açılmaz, PLACEHOLDER döner.
- Satır 129 (`computeProgress`): `isDeepening = !isComplete && coreAnswered >= MIN_CORE_RESPONSES`.

ANCAK önemli ayrıntı: `getNextQuestion` **önce tüm CORE'ların yanıtlanmasını** bekler (satır 177: `unansweredCore.length > 0` → hâlâ CORE döner). Yani pratikte DEEPENING'e geçiş için sabit-5 değil, **tüm-CORE-bitti** şartı baskındır; sabit-5 yalnızca ek bir alt-sınır kenedidir (havuz ≥5 CORE ise hiç devreye girmez).

---

## (b-EK) ⚠️ TUTARSIZLIK — sabit 5 (adaptiveTestEngine) ↔ dinamik tüm-CORE (questionService)

**İki farklı geçiş modeli KODDA AYNI ANDA MEVCUTTUR:**

| Kaynak | Eşik modeli | Kanıt |
|---|---|---|
| `adaptiveTestEngine.ts` | Sabit `MIN_CORE_RESPONSES = 5` (+ "tüm CORE yanıtlansın" ön-şartı) | satır 22, 129, 194 |
| `questionService.ts` | **Dinamik**: `coreThreshold = coreCount` (havuzdaki tüm aktif CORE sayısı) | satır 117, 173 |

`questionService.ts` yorumu (satır 15-20) bu farkı açıkça "admin-proof" gerekçesiyle savunur: admin CORE ekler/siler → eşik otomatik güncellenir, hardcode sabite gerek yok. Ayrıca `calcAdaptiveProgress` monotonic kural ekler (satır 173): `isDeepening = coreAnswered >= meta.coreThreshold || deepeningAnswered > 0`.

**GERÇEKTE HANGİSİ KULLANILIYOR — çağrı zinciri KANITI:**
- Route: `userRoutes.ts:131` → `getNextAdaptiveQuestion` handler.
- Controller: `adaptiveTestController.ts:5` `import { getNextQuestion } from '../services/adaptiveTestEngine.js'`; satır 35 ve 96 → `getNextQuestion(...)` çağrılır.
- Yani **canlı "sıradaki soru" ve "yanıt gönder" akışı `adaptiveTestEngine.getNextQuestion`'ı** kullanır → **sabit `MIN_CORE_RESPONSES = 5` + tüm-CORE-bitti modeli GERÇEKTE ETKİN.**
- `questionService.ts` (`buildQuestionList` / `calcAdaptiveProgress` / dinamik `coreThreshold`) `adaptiveTestController` tarafından ÇAĞRILMAZ — ayrı bir tüketici zinciridir (soru listesi/ilerleme meta akışı). Bu iki modül BİRBİRİNİ ÇAĞIRMAZ.

**SONUÇ:** Soru-seçim mantığı için gerçek eşik = `adaptiveTestEngine` (sabit 5, pratikte tüm-CORE). `questionService`'in dinamik `coreThreshold`'u yalnızca kendi tükettiği yerlerde (soru listesi/ilerleme özeti) geçerlidir. İki modül farklı eşik tanımı taşır → **tutarsızlık gerçek ama izole**; ikisi tek bir "sıradaki soru" akışında çakışmaz çünkü aynı zincirde kullanılmazlar. Hangi FE ekranının `questionService` tabanlı ilerlemeyi mi yoksa engine progress'ini mi gösterdiği **TEYİT GEREK** (FE tüketici haritası bu raporun kapsamı dışında).

---

## (c) `discVector` hesaplama: Likert → [0..1] → boyut ortalaması → normalize

Dosya: `backend/src/services/adaptiveTestEngine.ts`

1. **Likert → ağırlık [0..1]** (satır 25-27):
   `LIKERT_TO_WEIGHT = { 1:0.0, 2:0.25, 3:0.50, 4:0.75, 5:1.0 }`. Bilinmeyen değer fallback `0.5` (satır 74).
2. **Boyut ortalaması** (`computeRawScores`, satır 68-84): her boyut için ağırlıkların ortalaması. `GENERAL` boyutu atlanır (satır 73). **Cevaplanmamış boyut → nötr `0.5`** (satır 80).
3. **Normalize (toplam = 1.0)** (`normalizeToVector`, satır 86-98): `total = D+I+S+C`; her boyut `raw/total`, 3 ondalığa yuvarlanır (`Math.round(x*1000)/1000`). `total === 0` ise eşit dağılım `{0.25,0.25,0.25,0.25}` (satır 88-90).

**Eşik/en-yüksek/normalize?**
- **Normalize:** EVET, toplam 1.0 (satır 87-97).
- **En-yüksek (dominant):** `getDominantType` (satır 100-103) — `reduce` ile en yüksek; **eşitlikte ilk gelen kazanır**, `Object.entries` sırası `{D,I,S,C}` başlatma sırasıdır (satır 69) → fiili tiebreak **D > I > S > C**.
- **Eşik:** vektör hesaplamada ayrı bir "eşik" YOK; eşik yalnızca harf gösteriminde (`discLetters.ts`, madde d) ve geçişte (`MIN_CORE_RESPONSES`) var.
- **confidence:** `min(1, yanıt/maxPossible)` (satır 231); `previewDiscVector`'da `min(1, history.length/20)` (satır 282) — **20 sabiti** burada hardcode.

> ⚠️ İKİNCİ VEKTÖR YOLU: Onboarding'de ayrı bir scorer var — `onboardingController.ts:210` `calculateDiscResult`. Bu **seçenek-sayımı** modelidir (Likert değil): her cevabın `option.disc` boyutunu ++ artırır (satır 222), sonra `score/total` ile normalize eder (satır 232-237), 2 ondalık. Tiebreak `DISC_TIEBREAK_ORDER = ['D','I','S','C']` (satır 208, 240). **İki farklı vektör üretim yolu (adaptif Likert-ortalama vs onboarding seçim-sayımı) aynı `user.discVector` alanına yazar** — hangi akış çalıştıysa o kazanır.

---

## (d) Baskın + ikincil harf (`discLetters.ts`)

Dosya: `backend/src/services/discLetters.ts` · Ana fonksiyon: `computeDiscLetters` (satır 58).

**Config (satır 29-41):**
- `midline: 0.25` — orta çizgi (normalize vektörde eşit pay).
- `uppercaseRatioOfPrimary: 0.75` — BÜYÜK/küçük eşiği.

**Algoritma:**
1. Skorlar güçten zayıfa sıralanır; **eşitlikte sabit `D > I > S > C`** (satır 45 `DISC_ORDER` + satır 65-69 sort tiebreak).
2. Gösterilecekler: **birincil (daima) + orta çizgiyi `>` GEÇEN** diğer tipler (satır 75, strict `>`).
3. Her gösterilen tip: `score >= primary.score * 0.75` → **BÜYÜK**, aksi → **küçük** (satır 77-80). Birincil daima BÜYÜK.

**Örnekler (kod mantığından türetilmiş):**
- `{D:0.50, I:0.30, S:0.12, C:0.08}` → gösterilen: D (birincil), I (0.30>0.25). Eşik = 0.50×0.75 = 0.375. I=0.30 < 0.375 → küçük → **"Di"**.
- `{D:0.40, I:0.35, S:0.15, C:0.10}` → D, I gösterilir. Eşik 0.30; I=0.35 ≥ 0.30 → BÜYÜK → **"DI"**.
- `{D:0.28, I:0.27, S:0.26, C:0.19}` → D,I,S orta çizgiyi geçer (>0.25). Eşik 0.21; hepsi ≥0.21 → **"DIS"**.
- `{D:0.70, I:0.10, S:0.10, C:0.10}` → yalnız D >0.25 → **"D"** (saf stil).
- Düz profil `{0.25,0.25,0.25,0.25}` → hiçbiri `> 0.25` değil ama birincil daima gösterilir → **"D"** (tiebreak).

Türetme yeri: `discLettersFromVector` (satır 88) `userController.ts:205`'te self/admin yanıtına `discLetters` olarak eklenir.

---

## (e) Eşleştirme DISC uyumu — `scoring.ts` `DISC_COMPATIBILITY`

Dosya: `backend/src/services/scoring.ts` (satır 44-49).

**TAM matris (mentor = satır, menti = sütun) — 16 değer:**

| mentor↓ \ menti→ | D | I | S | C |
|---|---|---|---|---|
| **D** | 60 | 75 | 30 | 85 |
| **I** | 70 | 60 | 70 | 80 |
| **S** | 35 | 70 | 75 | 65 |
| **C** | 85 | 75 | 65 | 60 |

**Simetrik mi?** **HAYIR, asimetrik.** Örnekler:
- D→S = 30 ↔ S→D = 35 (farklı)
- D→C = 85 ↔ C→D = 85 (bu çift eşit — tesadüfen)
- D→I = 75 ↔ I→D = 70 (farklı)
- S→C = 65 ↔ C→S = 65 (eşit)
- I→S = 70 ↔ S→I = 70 (eşit)

Yani matris genel olarak asimetriktir (mentor rolü ≠ menti rolü); bazı çiftler tesadüfen eşit.

**Sektör/DISC 60/40 nerede:**
- `scoring.ts:89-90`: `DEFAULT_SECTOR_WEIGHT = 0.6`, `DEFAULT_DISC_WEIGHT = 0.4`.
- `computeTotalScore` (satır 92-112): `base = sectorScore*sectorWeight + discScore*discWeight` (satır 108). Ağırlıklar tenant'tan override edilebilir (`args.sectorWeight ?? 0.6`).
- Ek: vektör varsa DISC skoru `confidence*vectorScore + (1-confidence)*matrixScore` harmanı (satır 72-79).

**Anti-match kuralı var mı:** EVET (satır 20-29).
- `ANTI_MATCH_RULES = [{ mentorDisc:'D', mentiDisc:'S' }]` — **tek kural**: D mentor + S menti.
- `isAntiMatch()` (satır 24) bu çifti yakalar; `matching.ts:283`'te `applyAntiMatch` açıksa aday **elenir** (`continue`).
- `matching.ts` 4 katmanlı fallback (satır 200-216): anti-match ilk 2 katmanda uygulanır, aday kalmazsa fallback2/3'te kaldırılır (satır 210, 216 `applyAntiMatch: false`).

---

## (f) `discResultCard` ("aha" kartı) — içerik + üretim + OKUNUYOR mu?

**Üretim** (`onboardingController.ts:398-408`, `submitDiscTest`):
- `calculateDiscResult(answers)` → `result`; `DISC_RESULT_CARDS[result.dominant]` → statik kart (arketip/ikon/superPower/description/strengths/growthArea/compatibleWith).
- `discResultCard = { ...resultCard, dominant, discVector, rawScores, completedAt }` (satır 402-408).
- `user.discResultCard`'a yazılır (satır 415).

**⭐ OKUNUYOR MU — grep kanıtı: EVET, ölü-yazma DEĞİL.**
- `userController.ts:152` — `USER_PUBLIC_SELECT` içinde `discResultCard: true` (public kart gösterimi için).
- `userController.ts:198` — KARAR 5: menti→mentör bakışında maskelenir (`discResultCard` çıkarılır); aksi durumda döner.
- **Frontend OKUR:** `frontend/src/lib/api/profile.ts:10-19` → `UserProfileData.discResultCard` tipi tanımlı (archetype/icon/superPower/description/strengths/growthArea/compatibleWith/dominant) ve `fetchUserProfile` bunu çeker.
- `frontend/src/types/onboarding.ts:19` — "discResultCard alanının tam şekli" tipi.

> ⚠️ TARİHSEL NOT: `docs/raporlar/kesif/hayalet-backend-2026-08-02.md:41,69` bu alanı "yaz-ama-oku-yok adayı" işaretlemişti; sonraki denetim `yarim-is-niyet-envanteri-2026-08-23.md:19` "discResultCard okuma → bağlı (yanlış-pozitif)" diyerek düzeltti. Güncel kod gerçeği: **bağlı ve okunuyor.**

---

## (g) OCEAN + `enneagramWing` — dolduruluyor/okunuyor mu, ölü mü?

**`enneagramWing`:**
- **Yazılıyor:** `temperamentController.ts:60` (`analyzeTemperament` sonucundan). Kaynak: `temperamentAnalysis.ts:64-79` (en sık enneagram etiketi).
- **Okunuyor:** Yalnızca YAZAN endpoint'in kendi yanıtında geri döner (`temperamentController.ts:66` select). GDPR'da null'lanır (`gdprService.ts:98,181`).
- **Frontend'de OKUMA YOK** (`frontend`'te `enneagramWing` grep → **No matches**). Canlı eşleştirmede (`matching.ts`) kullanılmaz.
- **Bulgu:** `enneagramWing` = pratikte **yaz-ama-oku-yok / ölü-okuma adayı** (kendi endpoint yankısı hariç kimse okumuyor).

**OCEAN (`UserProfile.oceanO..N`, `archetype`):**
- **Yazılıyor:** `scoring.service.ts:106-110` (`computeAndStoreProfile` → DISC→OCEAN adapter). Route: `POST /api/scoring/compute-profile` (`sjtScoringRoutes.ts:19`).
- **Okunuyor:** `sjtScoringController.ts:68-72` (compute-profile yanıtı); `scoring.service.ts:165` `rankMentorsForMenti` OCEAN tabanlı sıralama yapar → route `POST /api/scoring/rank-mentors` (`sjtScoringRoutes.ts:26`).
- **⭐ KRİTİK:** Bu OCEAN sıralama yolu **FE'de ÇAĞRILMIYOR** — kod-içi kanıt `scoring.ts:163-166` yorumu: *"persist edilen alanı OKUYAN tek sıralama yolu scoring.service.ts → /api/scoring/rank-mentors olup FE'de ÇAĞRILMIYOR. Canlı eşleştirme (matching.ts) bu alanı OKUMAZ."* Grep teyidi: `frontend`'te `rank-mentors`/`scoring.service` → **No files found**; `matching.ts`'te `oceanO`/`UserProfile`/`archetype` → **No matches**.
- **Bulgu:** OCEAN katmanı **paralel/bağlanmamış** — canlı eşleştirme DISC matrisi (`scoring.ts` + `matching.ts`) üzerinden çalışır; OCEAN/archetype sıralaması yazılıyor ama canlı UI'ya bağlı DEĞİL (yarım/gölge özellik).

---

## (h) ⭐⭐ EN KRİTİK — Psikometrik VARSAYIM/GEREKÇE belgelenmiş mi?

**Tek tek, dürüst durum:**

| Karar | Değer | Kod/yorum/belge gerekçesi VAR MI? | Bulgu |
|---|---|---|---|
| **Tiebreak D>I>S>C** | `DISC_ORDER`/`DISC_TIEBREAK_ORDER` | discLetters.ts:44 yalnızca "baskın harf mantığıyla tutarlı" der (kendine referans); **NEDEN bu sıra? gerekçe YOK** | **BELGELENMEMİŞ / sezgisel.** "D>I>S>C neden" için psikometrik kaynak/atıf yok — yalnızca deterministiklik için sabit sıra. |
| **midline 0.25** | `DISC_LETTER_CONFIG.midline` | discLetters.ts:23,27: "BAŞLANGIÇ DEĞERLERİ — gerçek veri biriktikçe kalibre edilecek", "Onay: ürün sahibi 2026-08-17" | **KISMEN:** matematiksel gerekçe var (normalize'de eşit pay=0.25); ama "neden bu eşik doğru" ampirik/psikometrik kaynak YOK — açıkça geçici başlangıç. |
| **ratio 0.75 (BÜYÜK/küçük)** | `uppercaseRatioOfPrimary` | discLetters.ts:23: "başlangıç, ileride kalibre" | **BELGELENMEMİŞ/sezgisel** (ürün sahibi onayı var, ampirik dayanak yok). |
| **60/40 sektör/DISC** | `DEFAULT_SECTOR_WEIGHT/DISC_WEIGHT` | scoring.ts:86-90: "Varsayılan; tenant override eder"; algorithmTuner ile aynı taban. **NEDEN 60/40? gerekçe YOK** | **BELGELENMEMİŞ / sezgisel.** Sektör uyumunun DISC'ten neden ağır bastığına dair kaynak/analiz yok. |
| **DISC_COMPATIBILITY 16 değeri** | matris (30..85) | scoring.ts:43 yalnızca "mentor satır, menti sütun" der. **Değerlerin türetimi/kaynağı YOK** | **BELGELENMEMİŞ / sezgisel.** 16 sayının (60, 75, 30, 85...) nereden geldiği hiçbir yorumda/belgede yok. |
| **Anti-match D→S** | tek kural | scoring.ts:20 sadece kuralı tanımlar, **NEDEN D mentor + S menti sakıncalı? gerekçe YOK** | **BELGELENMEMİŞ / sezgisel.** Klasik DISC teorisinde D-S gerilimi sezgisel olsa da kodda/belgede atıf/gerekçe yok. |
| **Likert→ağırlık 0/.25/.5/.75/1** | `LIKERT_TO_WEIGHT` | adaptiveTestEngine.ts:24 "Likert 1-5 → normalize" (mekanik açıklama) | Mekanik olarak açık (lineer eşit aralık); "neden lineer" psikometrik gerekçe YOK ama tartışmasız standart. |
| **confidence /20 sabiti** | previewDiscVector | adaptiveTestEngine.ts:282: gerekçe/yorum YOK | **BELGELENMEMİŞ.** 20 sayısı neden hedef, kaynak yok. |

**DÜRÜST GENEL BULGU:** Motorun **psikometrik çekirdek sabitlerinin çoğu BELGELENMEMİŞ / sezgisel / "başlangıç değeri, ileride kalibre edilecek"** durumundadır. Matematiksel *mekanik* (normalize, ortalama, harmanlama) yorumlarla iyi açıklanmış; ancak **hangi sayının neden seçildiği** (tiebreak sırası, 60/40, 16 uyum değeri, anti-match çifti, eşikler) için ampirik/teorik **kaynak yoktur**. `discLetters.ts` ve `scoring.ts` yorumları bunu dolaylı itiraf eder ("başlangıç değerleri, gerçek kullanıcı verisi biriktikçe kalibre"). Tek "onay" izi: `discLetters.ts:27` ürün sahibi onayı (2026-08-17) — bu bir *karar* onayıdır, psikometrik *gerekçe* değil.

---

## (i) DEEPENING profil güncelleme — üzerine mi yazıyor, kaç kez derinleşilebilir?

Dosya: `adaptiveTestEngine.ts`.

- **Üzerine yazma:** Test tamamlandığında `getNextQuestion` `prisma.user.update` ile `discVector` + `discType`'ı **KOŞULSUZ üzerine yazar** (satır 237-243). Eski değer korunmaz — her tamamlanışta baştan hesaplanan vektör yazılır. Vektör, o anki **tüm yanıt geçmişinden** (CORE + o boyutun DEEPENING'i) yeniden hesaplanır (`computeRawScores(history)`, satır 204/233) — inkremental değil, tam yeniden hesap.
- **DEEPENING sadece baskın boyut için:** yalnızca `dominant`'a ait + `GENERAL` DEEPENING soruları açılır (satır 207-209). Diğer 3 boyutun DEEPENING soruları bu kullanıcıya hiç sorulmaz.
- **Kaç kez derinleşilebilir / sınır var mı:**
  - Motor tarafında **tekrar-derinleşme mekanizması YOK.** Test doğrusaldır: yanıtsız soru bitince `done: true`. Yanıtlar `upsert` olduğundan (`adaptiveTestController.ts:89`, `questionService.ts:203`) kullanıcı eski bir soruyu **yeniden yanıtlayabilir** → sonraki `getNextQuestion` çağrısında vektör yeniden hesaplanıp yine üzerine yazılır. Yani "yeniden yanıtla → yeniden hesapla" dolaylı olarak mümkün, ama **açık bir "N kez derinleş" sayacı/limiti YOKTUR**.
  - Baskın boyut yanıtlar değişirse kayabilir; ancak DEEPENING zaten **eski** baskın boyuta göre açılmış sorulardır — motor baskın-boyut değişiminde eski DEEPENING'i geri almaz/yeniden açmaz. Bu bir kenar durumdur; **kodda özel ele alma YOK** (TEYİT GEREK: baskın-boyut sonradan değişirse tutarsız DEEPENING seti kalabilir).

**Sınır bulgusu:** Derinleşme sayısına dair **hiçbir sabit/limit yok**; doğal sınır = havuzdaki (baskın boyut + GENERAL) DEEPENING soru sayısı. Tekrar-hesaplama upsert üzerinden sınırsız tetiklenebilir.

---

## Özet (kapanış)

- **Dosya:** `docs/raporlar/icerik/bolumler/05-felsefe-motoru.md` (bu belge).
- **(h) EN KRİTİK bulgu:** Psikometrik çekirdek sabitler — tiebreak `D>I>S>C`, `60/40` sektör/DISC, 16'lık `DISC_COMPATIBILITY` matrisi, tek `D→S` anti-match kuralı, harf eşikleri (0.25 / 0.75), confidence `/20` — **BÜYÜK ÇOĞUNLUKLA BELGELENMEMİŞ / sezgisel / "başlangıç değeri".** Mekanik iyi yorumlanmış; sayı seçimlerinin ampirik/teorik gerekçesi YOK. Tek iz: ürün sahibi *karar* onayı (discLetters 2026-08-17), gerekçe değil.
- **(b) TUTARSIZLIK bulgusu:** İki geçiş modeli kodda birlikte yaşıyor — `adaptiveTestEngine` **sabit 5 + tüm-CORE** (canlı "sıradaki soru" akışında GERÇEKTE etkin; çağrı zinciri: `userRoutes:131 → adaptiveTestController → getNextQuestion`) vs `questionService` **dinamik `coreThreshold=coreCount`** (ayrı tüketici zinciri, engine'i çağırmaz). Tutarsızlık gerçek ama izole; tek soru-seçim akışında çakışmıyorlar. Hangi FE ekranının hangisini gösterdiği **TEYİT GEREK**.
- **Ek bulgular:** `discResultCard` OKUNUYOR (FE profile.ts + userController) → ölü değil. `enneagramWing` = yaz-ama-oku-yok. OCEAN/archetype sıralaması yazılıyor ama canlı eşleştirmede (`matching.ts`) OKUNMUYOR (kod yorumu + grep teyitli) → bağlanmamış paralel katman.
