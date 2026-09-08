📸 DONDURULMUŞ · 2026-09-04 · salt-okuma keşif · kod DEĞİŞMEDİ

# Faz 5 Ön Koşul Keşfi — OCEAN üretimi + 39 senaryonun koda girişi (2026-09-04)

> 🔒 2026-09-04 salt-okuma keşfinin kod-kanıtlı bulguları. Önce yalnız sohbetteydi.
> **Kod/DB/şema DEĞİŞMEDİ; DB'ye komut gitmedi.** Canonical statü: `00-KARAR-TAKIP` (madde 101·138·139·140·73).
> Çelişki olursa **kod kazanır** (KURAL 10).
>
> **⭐ EN DEĞERLİ BULGU:** Big Five altyapısının İSKELETİ ZATEN KODDA (`SjtQuestion`/`SjtOption`/`sjt-scorer.ts`).
> Faz 5 "sıfırdan motor yazmak" değil, "uyuyan motoru uyandırmak" — ama **üç boşluk** var.
>
> **Kanıt teyidi (2026-09-04):** rapordaki referanslar bu tur kodda tek tek doğrulandı. Tek sapma:
> `adaptiveTestEngine.ts` **284 satır** (keşif "285" demişti). Diğer tüm dosya:satır tuttu.

---

## §A — HAZIR OLAN: SJT altyapısı

- `SjtQuestion` (`backend/prisma/schema.prisma:932`): `code` · `tier` (CORE/FOLLOWUP) · `answerFormat`
  (SINGLE/**MOST_LEAST**, `:936`) · `forRole` (`:937`) · `scenario` · `triggersOn` (OCEAN boyutu: o|c|e|a|n, `:939`)
- `SjtOption` (`:949`): `key` · `label` · **`weights` Json** `Partial<Record<"o"|"c"|"e"|"a"|"n",number>>` (`:955`) · `signalsArchetype` (`:956`)
- `AnswerFormat` enum'da **MOST_LEAST VAR** (`:925`, değer `:927`)
- Skorlayıcı `backend/src/services/sjt-scorer.ts` (84 satır): SINGLE/MOST → **+1.0** (`:65`, `:68`), LEAST → **−0.5**
  (`:72`), OCEAN ağırlıklarını biriktirip (`sum`/`hits`, `:55`) 0-100 vektöre çevirir (`:80` `50 + ((sum/hits)/3)*50`, clamp `:81`)
- SJT seed mantığı VAR: `seed.ts:505` `seedSjtQuestions()` çağrısı → tanım `:575` (upsert, idempotent) — ama TEHLİKELİ `seed.ts` içinde

⭐ **39 senaryo bu modele uyar:** senaryo ✔ · 3 şık ✔ · MOST_LEAST ✔ · her şıkkın OCEAN yön/ağırlığı = `weights` ✔ ·
yan sinyal = çok-boyutlu weights ✔ · "en bulanık boyuttan" için `triggersOn` ✔ · çekirdek/havuz = `tier` (gevşek uyum).

---

## §B — ÜÇ BOŞLUK (hepsi kritik)

**1. Cevap KALICI SAKLANMIYOR.** `SjtResponse` modeli YOK (KAPSAM BEYANI: `schema.prisma` + `backend/src`,
harf-duyarsız `SjtResponse` = **0 sonuç**). `scoreSjtAnswers` (`sjt-scorer.ts:44`) cevapları istek gövdesinden
alır, anlık skorlar (`Promise<Partial<OceanVector>>`). → Katman-2'nin tamamı (her girişte 1-2 senaryo, en bulanık
boyuttan, ≥4 sinyal) seans-ötesi izleme ister; bu olmadan İMKÂNSIZ. → **MIGRATION.**

**2. Adaptif seçici TERS YÖNDE.** `adaptiveTestEngine.ts` (284/284 okundu): 5 CORE dolunca (`MIN_CORE_RESPONSES=5`
`:22`) **BASKIN** boyutu hesaplar (`getDominantType(rawScores)` `:205`) ve onu derinleştirir (`discDimension === dominant`
`:208`). Tasarım **EN BULANIK** boyutu ister → ters. Ayrıca farklı model yığınında (Question/UserResponse/Likert),
SJT'yi (SjtQuestion) süremez. → **YENİ SEÇİCİ (saf kod).**

**3. GÜVEN RAMPASI YOK.** "%12 → %25" mekanizması aranan terimlerle **0 sonuç** (KAPSAM: 11 terim iki dilde
harf-duyarsız). `confidence` VAR ama = **tamamlanma oranı** (`:231` `totalResponses/maxPossible` · `:282`
`history.length/20`), boyut-bazlı belirsizlik DEĞİL. `sjt-scorer.ts` boyut-başına `hits[key]` sayar (`:55`, `:79`)
ama tek çağrı içinde, kalıcı değil. → **SIFIRDAN.**

**+ `forRole` ZORUNLU** (`schema.prisma:937`, `UserRole` nullable değil) — 39 senaryo rol-nötr (herkese aynı).
→ **MIGRATION** (nullable / "both").

---

## §C — İKİ KOPUKLUK (OCEAN üretimi)

1. `computeAndStoreProfile` (`scoring.service.ts:81`, OCEAN yazımı `:103-115`) → yalnız
   `POST /api/scoring/compute-profile` (`sjtScoringController.ts` route `:47`, çağrı `:72`) → **FE HİÇ ÇAĞIRMIYOR.**
2. **VERİ KÖPRÜSÜ YOK:** fonksiyon `UserProfile.discD/I/S/C` okur (`scoring.service.ts:92-96`), onboarding
   `User.discVector`'a yazar → çağrılsa bile `discToOcean` girdisi boş kalır, tüm boyutlar 50'ye eşitlenir (ayrışma yok).

⚠️ `scoreSjtAnswers` zaten DOĞRUDAN OCEAN üretiyor (`Partial<OceanVector>`, `sjt-scorer.ts:44`) — `discD..C`'ye
hiç uğramıyor. Yani SJT yolu OCEAN'ı doğrudan verir; sorun onboarding'in bu yolu çağırmaması.

---

## §D — CANLI MOTOR: matching.ts

`discType`/`discVector` **18 satır** (~12 mantık noktası): anti-match ve filtre de DISC üzerinden
(`excludeDiscTypes` filtre + anti-match). `ocean|archetype|UserProfile` → **`matching.ts`'te 0 sonuç** (KAPSAM BEYANI:
tek dosya, 3 terim, harf-duyarsız).

**İKİ AYRI SKOR YIĞINI:** canlı (`matching.ts` + `scoring.ts`, DISC, %60/%40) ↔ uyku
(`scoring.service.rankMentorsForMenti`, OCEAN arketip + BLOCKED_PAIRS, FE'siz).

---

## §E — GERİYE DÖNÜK VERİ

`oceanO..N` + `archetype` nullable (`schema.prisma:992-997`). Canlı `matching.ts` OCEAN okumadığı için mevcut
6 test kullanıcısıyla SORUNSUZ çalışıyor. OCEAN yolunda guard VAR: `rankMentorsHandler` `if (!menti?.archetype)`
→ 404 (`sjtScoringController.ts:102-103`) — PATLAMAZ, hata döner. ⚠️ Ama OCEAN'a geçilirse arketipsiz menti
SIRALANAMAZ → backfill mi, yeniden çözme mi = **PO kararı.**

---

## §F — FAZ 5'İN GERÇEK BOYUTU: 11 İŞ

| # | İş | Tür |
|---|---|---|
| a | 39 senaryoyu `SjtQuestion`/`SjtOption`'a yerleştir | SEED |
| b | `forRole` rol-nötr yap (nullable/"both") | MIGRATION |
| c | `SjtResponse` modeli (ham most/least kalıcı) | MIGRATION |
| d | Boyut-bazlı güven/sayaç + %12→%25 rampası | MIGRATION + KOD |
| e | "En bulanık boyuttan" adaptif seçici (SJT) | SAF KOD |
| f | 5 sabit + 10 adaptif onboarding akışı (FE + uç) | SAF KOD |
| g | OCEAN üretimini onboarding'e bağla (compute-profile'ı çağır / SJT yolunu kur) | SAF KOD |
| h | `matching.ts` OCEAN'a geçir VEYA uykudaki `rankMentorsForMenti`'yi bağla (~12 nokta) | SAF KOD |
| i | Ağırlık %60/%40 → %45/%30/%25 | SAF KOD |
| j | Güvenli seed runner (madde 73 ile ORTAK — sertifika + SJT aynı muhafız) | SAF KOD |
| k | Geriye dönük OCEAN (6 test kullanıcısı) | KARAR + DB |

→ **~3 migration · 1-2 seed · ~6 saf kod · 1 DB/karar. "Tek kalem" DEĞİL, bir FAZ.**

---

## §G — 6 KARAR NOKTASI (PO)

1. `discToOcean`/`deriveArchetype` **emekli mi köprü mü**? (`disc-to-ocean.adapter.ts:45` `mergeWithSjt` zaten
   "SJT varsa onu, yoksa DISC türevini" diyor — `scoring.service.ts:98` → köprü BEDAVA olabilir)
2. Skor **hangi alana** yazılacak: doğrudan `oceanO..N` mi, `discD..C` üzerinden mi?
3. Canlı motor: `matching.ts`'i OCEAN'a mı çevirelim, yoksa uykudaki `rankMentorsForMenti`'yi mi canlıya bağlayalım?
4. Geriye dönük veri: backfill mı, yeniden mi çözsünler?
5. `forRole`: 39 senaryo rol-nötr mü kalacak (model değişir)?
6. Ağırlık geçişi %45/%30/%25 + dinamik %12→%25 onaylanıyor mu?

---

## §H — DÜRÜSTLÜK SINIRLARI (kırpma)

- `matching.ts` TAM OKUNMADI (grep, ~12 nokta) — anti-match/filtre OCEAN'a nasıl çevrilir detayı okunmadı.
- `rankMentorsForMenti` + `BLOCKED_PAIRS` + `getCharacterScore` tam okunmadı — uyku motorunun OLGUNLUĞU ayrı keşif ister.
- Canlı DB: `SjtQuestion`'da bugün kaç senaryo var, `oceanO..N` dolu kayıt var mı → ❓ TEYİT GEREK (sorgu yasak).
- `triggersOn` ↔ 39 senaryonun boyut eşlemesi doğrulanmadı (seed edilince netleşir).
- ⬜ Üç kardeş belge YOK (`olcme-mimarisi` · `senaryo-denetim-protokolu` · `olcme-arastirmasi`) — PO BULAMADI,
  muhtemelen hiç yazılmadılar. Ağırlık kalibrasyonu ve denetim protokolü orada olabilirdi.

---

## KALEM LİSTESİ (KURAL 9)

| Kalem | Önerilen durum | Numara adayı mı |
|---|---|---|
| 11 Faz 5 işi (a-k) | ⬜ AÇIK | Evet (PO numaralandıracak; bir kısmı mevcut madde 101/73'e bağlanır) |
| 6 karar noktası (§G) | ❓ TEYİT GEREK | Hayır (PO kararı → S33 sözü) |
| `SjtResponse` modeli (§B-1) | ⬜ AÇIK | Evet (= iş c) |
| Adaptif seçici ters yön (§B-2) | ⬜ AÇIK | Evet (= iş e) |
| Güven rampası %12→%25 (§B-3) | ⬜ AÇIK | Evet (= iş d) |

> **Sayılan birim (KURAL 16):** "11 iş" = §F tablosundaki a-k satırları (SEED/MIGRATION/SAF KOD/KARAR türlerine
> ayrılmış). "6 karar" = §G maddeleri (PO onayı bekleyen). Bu belge YENİ NUMARA VERMEZ.
