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

## §I — SERTİFİKA KARARLARI (2026-09-04 içerik oturumu)

> ⚠️ **FAZ 0 KOD TEYİTLERİ (2026-09-04, salt-okuma; DB'ye sorulmadı):**
>
> **T1 — geçme eşiği KONU bazlı (PUAN değil):** `certification.service.ts:12` "aktif konuların en az %80'inde
> ilk-denemede geçmek". `requiredToPass(n) = Math.ceil(n × 0.8)` (`:50-51`) → **8 konu → ceil(6.4) = 7 konu**
> (24 puandan 19 DEĞİL). Her konu geçişi: `isFirstAttemptPass` (`:66-67`) — **red-line `=== 3`**, normal `>= 2`.
> Red-line AYRI SERT KAPI: `RED_LINE_FAILED` (`:86`) = bir açık red-line konu ilk-denemede 3 ile geçilemezse.
> → Kod ZATEN seçenek (c)'yi uyguluyor (KONU eşiği %80 + red-line hard gate). ⚠️ İncelik: red-line'da
> geçmek için ilk-deneme **3 şart** (yalnız "0 eler" değil — red-line 1 ve 2 de eler). Bu kod gerçeğidir (KURAL 10).
>
> **T2 — competencyScore aralığı 0-3 TEYİT:** `schema.prisma:1155` `competencyScore Int` (şema kısıtı yok);
> `seed-certification.ts`'te değerler tam **{0, 1, 2, 3}** — her biri 20 kez (20 senaryo × 4 şık; her senaryoda
> 0/1/2/3 dördü de VAR → §I-3'teki "3 ve 0 mutlaka" kuralı zaten sağlanıyor). `isFirstAttemptPass` 3/2 eşikleri de 0-3'ü doğrular.
>
> ✅ Bulgular karar (c) ile TUTARLI — beklenenden farklı değil, karar metni kendi kararımla değiştirilmedi.

**1. PUANLAMA: 0-3 KORUNUYOR (PO kararı).** Harmanlamada Faz 6'nın puansız yapısı DEĞİL, `tam.md` v2'nin 0-3
sistemi geçerli (kodda zaten 0-3, T2). Gerekçe: red-line mantığı 0-3 ile çalışır, ikili doğru/yanlışla çalışmaz;
"yanlış ama makul" ↔ "zararlı" ayrımı korunur. Sonuç kullanıcıya PUAN olarak değil, KONU BAZLI geri bildirim
olarak gösterilir (madde 150).

**2. ⭐ MADDE 72 KARARA BAĞLANDI — seçenek (c).** Red-line konularda düşük puan DOĞRUDAN ELER (kod: red-line
ilk-deneme `!== 3` → RED_LINE_FAILED) + diğer konularda TOPLAM EŞİĞİ belirler (KONU'nun %80'i, ceil). Gerekçe:
(a) yetersiz (kritik olmayan konuda zararlı cevap veren geçebiliyor), (b) fazla katı (sertifika ehliyettir,
mükemmellik sınavı değil; felsefe "öğretimin son tekrarı"). ⬜ ALT KARAR: toplam eşiği kalibrasyona muhtaç —
ilk 20-30 sınav sonucuna bakılacak. ⚠️ İçerik oturumunu BLOKLAMAZ. (Kod bu kararı zaten uyguluyor — FAZ 0-T1.)

**3. ⭐ PUANLAMA REHBERİ (88 şık için tutarlılık — PO):**
- **3** = En doğru. Prensibi tam uyguluyor, zamanlaması doğru.
- **2** = Doğru yönde ama eksik. Prensip anlaşılmış, uygulama kısmi (söylüyor ama yanlış zamanda).
- **1** = Yanlış ama zararsız. Prensip kaçırılmış, kimseye zarar vermiyor (pasif kalma).
- **0** = Zararlı. Karşı tarafa somut zarar riski (gizlilik ihlali, kriz anında yönlendirmeme).

⚠️ Her senaryoda **3 ve 0 MUTLAKA** bulunsun. 1 ve 2 opsiyonel ama ikisi birden yoksa senaryo ikili seçime döner.

⚠️ **RED-LINE KONULARDA 0 DAHA DAR TANIMLANIR.** Kritik 4 konuda (geri bildirim · sınır · gizlilik · kriz)
red-line ilk-deneme 3 değilse elediği için, orada 0 = "zararlı olabilir" değil, **"zararlı"** — tartışmasız.
Örnek tuzak: kriz anında *"hiçbir şey söylemem, gizlilik mutlaktır"* — Faz 6'da "makul görünen aşırılık" diye 1'e
aday gösterilmişti, ama o bağlamda **0'dır**. Red-line konularda "1" şıkkı yazarken dikkat: eleme yapmayan ama
gerçekte tehlikeli bir cevaba 1 vermek **elemeyi delen kaçak** yaratır (kod: yalnız 3 geçirir, ama 1/2 de RED_LINE_FAILED'ı tetiklemez → puanlama doğru olmalı).

### ⭐ KRİTİK KONU EŞİĞİ (PO kararı, 2026-09-04)

**Kod değişikliği:** `certification.service.ts:66-67` red-line eşiği `=== 3` → **`>= 2`**.

- **Kritik 4 konu:** 3 veya 2 GEÇER · **0 ve 1 ELER**
- **Diğer 7 konu:** ELEME YOK — konu geçilmezse yalnız toplam eşiğine (`ceil(n×0.8)`) katkı vermez

⚠️ **Bu bir KOD DEĞİŞİKLİĞİ, belge kararı değil.** Kaydedilmezse şıklar "2 geçer" varsayımıyla yazılır, kod
elemeye devam eder, kimse fark etmez.

**Gerekçe (PO):**
1. Sertifika felsefesi: "öğretimin son tekrarı", eleme sınavı değil. Yalnız 3 kabul etmek kritik konularda
   mükemmellik istemektir; "doğru yönde ama zamanlaması eksik" bir cevap gerçek mentörlükte de yaşanır ve
   öğretilerek düzelir.
2. Ayrım ZARARDA ve PRENSİP KAVRAYIŞINDA, isabet derecesinde değil. 0 = zararlı · 1 = prensip hiç kavranmamış
   → ikisi de eler. 2 = prensip kavranmış, uygulama kısmi → geçer.
3. Pratik: 4 kritik konuda yalnız 3 kabul edilirse kişinin dördünde de tam isabet yapması gerekir; birinde 2
   alması bile eler. Sertifika kapı kapatan bir şeye döner.

⚠️ **RED-LINE'IN İKİ İŞLEVİ DE KORUNUYOR:**
1. Her sınavda garantili gelir (madde 149) — kişi o konuda sınanmadan geçemez
2. **Ayrı eleme kapısı** — çizgi 3'ten 2'ye indi ama kapı DURUYOR. `RED_LINE_FAILED` (`:86`) anlamlı kalır.

⚠️ **ELEME YALNIZ KRİTİK KONULARDA.** Normal konularda 1 almak ELEMEZ. Aksi halde madde 72'de reddedilen
**(b) seçeneğine** ("her soruda eleme") düşerdik — fazla katı bulunmuştu.

⚠️ **KOD İNCELİĞİ (FAZ 0-T1 ile tutarlılık):** `isFirstAttemptPass` normal konularda bugün de `>= 2` istiyor —
yani normal konuda 1 alan o KONUYU geçmiş sayılmaz. Ama bu **eleme değil**: yalnız geçilen konu sayısını düşürür
ve `ceil(8×0.8)=7` toplam eşiğine takılabilir. Eleme (ilk denemede doğrudan kalma) yalnız red-line'da vardır.
Bu ayrım kod turunda korunmalı.

⚠️ **BUNUN ŞIKLARA YÜKLEDİĞİ ŞART — kritik konularda "2":** Kritik 4 konuda 2 puan GEÇER, o yüzden orada 2 =
"prensip ANLAŞILMIŞ ama uygulama kısmi" olmalı; prensibin kendisi tartışmasız kabul edilmiş olmalı.

Örnek (sınır konusu):
- **3** = "Gece mesajlarına sabah dönerim" derim, sebebini de söylerim → sınır kuruldu, açıklandı
- **2** = "Gece dönemem" derim, sebep söylemem → sınır kuruldu, eksik anlatıldı
- **1** = Sabah cevaplarım, bir şey söylemem → sınır hiç kurulmadı
- **0** = O an cevap veririm, alışkanlık olsun → sınır aktif olarak yıkıldı

⚠️ **2 ile 1 arasındaki çizgi: prensip UYGULANDI mı?** Uygulandıysa eksik bile olsa **2**; uygulanmadıysa **1**.
Bu çizgi kritik konularda **geçme ile kalma çizgisidir** — 32 şık yazılırken her kritik senaryoda açıkça görülmelidir.

**4. SAHNE SEÇİM KRİTERİ (7 ortak konu, sıralı):**
(1) dört şıkkı daha iyi ayrışan → ölçüm gücü · (2) STK bağlamına daha yakın → ürünün ayırt edici tarafı ·
(3) öğrenme yolculuğuyla çakışmayan → yüzey ayrımı kuralı. (Eşitlikte `tam.md`'ninki — akademik kaynak avantajı.)

**5. AKADEMİK KAYNAKLAR — DOĞRULANMADI (PO kararı).** `tam.md` v2 şıklarında CIMER/NCSU gibi atıflar var;
ajanın internet erişimi YOK, doğrulayamaz. Kaynaklar metinde KORUNUR ama **"⚠️ kaynak doğrulanmadı"** notuyla
işaretlenir. Doğrulama sonraya bırakıldı, içerik oturumunu bekletmiyor.

**6. KRİZ SENARYOLARI — HUKUKİ TEYİT (numara adayı).** Kriz senaryolarının (4A/4B) "doğru cevap" işaretlemesi
avukat onayı olmadan KESİNLEŞMEZ (faz6 §12). Senaryolar yazılır, işaretlenir, ama ⚠️ "hukuki teyit bekliyor"
etiketiyle. **Canlıya çıkmadan önce teyit ZORUNLU.** ⚠️ Etiket takip edilmez, KALEM takip edilir → **madde 159
kapsamına eklendi** (bkz. Faz 2 madde güncellemeleri).

**7. ÜÇ OTURUMLUK BÖLÜNME (PO planı):**
- **Oturum 1:** 4 kritik konu (8 senaryo, 32 şık) — hazır içerik, sahne seçimi + puanlama. ⚠️ madde 72 kararı ön koşuldu → verildi ✅
- **Oturum 2:** 2 birleşen konu SIFIRDAN + aktif dinleme uyarlama (6 senaryo, 24 şık) — asıl yazım oturumu
- **Oturum 3:** kalan 5 konu (10 senaryo, 40 şık) — sahne seçimi + puanlama

**8. 11 KONU — BİRLEŞTİRME KAYDI:** 7 ortak + 3 geri (`tam.md`) + 3 yeni (faz6) = 13 olurdu → iki çift birleşti
→ **11 konu × 2 varyant = 22 senaryo**:
- gönüllü tükenmişliği (STK) + kendi sınırını bilmek → **"Kendi kapasiteni bilmek"** (A: STK gönüllü tükenmişliği · B: genel kapasite aşımı)
- okul-gönüllülük dengesi (STK) + sürekliliği koruma → **"Sürekliliği koruma"** (A: menti sınav dönemi · B: genel devamsızlık)

Sınav 8 soru: 4 kritik garantili + kalan 7'den 4 rastgele (çeşitlilik 6→7, tekrar riski azalır). (§A içerik keşfi
§A ile tutarlı.)

---

## KALEM LİSTESİ (KURAL 9)

| Kalem | Önerilen durum | Numara adayı mı |
|---|---|---|
| 11 Faz 5 işi (a-k) | ⬜ AÇIK | Evet (PO numaralandıracak; bir kısmı mevcut madde 101/73'e bağlanır) |
| 6 karar noktası (§G) | ❓ TEYİT GEREK | Hayır (PO kararı → S33 sözü) |
| `SjtResponse` modeli (§B-1) | ⬜ AÇIK | Evet (= iş c) |
| Adaptif seçici ters yön (§B-2) | ⬜ AÇIK | Evet (= iş e) |
| Güven rampası %12→%25 (§B-3) | ⬜ AÇIK | Evet (= iş d) |
| madde 72 geçme eşiği → seçenek (c) KARARA BAĞLANDI (§I-2; kod zaten uyguluyor) | ✅ KARAR | Hayır (mevcut madde 72) |
| madde 72 toplam eşiği kalibrasyonu (ilk 20-30 sınav) (§I-2) | ⬜ AÇIK | Hayır (alt karar, içeriği bloklamaz) |
| Sertifika 22 senaryo içeriği (0-3 puanlama + rehber, §I) | ⬜ AÇIK | Evet (= madde 30 içerik ayağı; 3 oturum) |
| Kriz senaryoları HUKUKİ teyit (§I-6) | ⬜ AÇIK | Evet/Hayır (madde 159 kapsamına eklendi) |
| Akademik kaynaklar doğrulanmadı (§I-5) | ❓ TEYİT GEREK | Hayır (sonraya, içeriği bloklamaz) |
| ⭐ Red-line geçme eşiği `=== 3` → `>= 2` (`certification.service.ts:66-67`) + `RED_LINE_FAILED` (`:86`) akıbeti — **KOD turu** (PO kararı 2026-09-04) | ⬜ AÇIK | Evet (kod işi; PO numaralandıracak) |

> **Sayılan birim (KURAL 16):** "11 iş" = §F tablosundaki a-k satırları (SEED/MIGRATION/SAF KOD/KARAR türlerine
> ayrılmış). "6 karar" = §G maddeleri (PO onayı bekleyen). Bu belge YENİ NUMARA VERMEZ.
