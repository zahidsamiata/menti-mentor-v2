# KONSEY 3 · 📚 İÇERİK — yazılan içerik kullanıcıya ulaşıyor mu, ulaştığında doğru mu?

📸 **DONDURULMUŞ — 2026-09-21 fotoğrafı. Bu belge plan değildir; tek işi kuyruğu beslemektir.
Bulguları `00-KUYRUK.md`'ye işlendikten sonra güncellenmez.**

> **MOD:** 🟩 PLANLA / SALT-OKUMA. Hiçbir kod · belge · şema · seed · DB değişmedi; hiçbir seed çalıştırılmadı.
> Bu turda yazılan tek dosya budur. Kuyruk öneki: **C-??** · Kart öneki: **KARAR-??** (numara VERİLMEDİ).

---

## 0 · ⭐ ÖNCE OKU — EN KRİTİK ÜÇ BULGU

**① Sertifika farkı "2 senaryo + 8 şık" değil — 22 senaryonun 17'si seed'de YOK.**
Kuyruk (K-16 Not, P-99) ve KARAR-3 kartı farkı aritmetik olarak kuruyor: belge 22, seed 20 → "2 senaryo + 8 şık yeni".
Bu **sayı** doğru ama **içerik farkını gizliyor**. Belgenin kendi kapanış tablosu (`sertifika-oturum3-4-konu-2026-09-08.md:482-489`)
22 senaryonun kaynağını **faz6 15 · tam.md 5 · yeni 2** diye döküyor ve hemen altında *"`tam.md` 20 sahne sundu, **5'i kullanıldı (%25)**"*
diyor. `tam.md` = seed'in birebir kaynağı (`seed-certification.ts:7`). Yani seed'deki 20 senaryonun **15'i gerekçeli olarak ELENMİŞ**,
belgedeki 22'nin **yalnız 5'i** seed'de bir atası olan senaryo — o 5'i de yeniden yazılmış (5/5'inde metin farkı var, birinde **puan
anlamı ters dönmüş**). Pratik sonuç: taşınacak şık sayısı 8 değil, **88'in tamamı**; düşecek senaryo 15. Efor "S" değil **L**.

**② "İçerik hazır" işaretli 6 kalemin 2'si aslında hazır değil, 1'i yer tutucuyla dolu.**
madde 139 ("şimdilik" varyantları) kuyrukta 4/4 sayılıyor — gerçekte **4/8**: dört varyantın dördü de yalnız mentör tarafı,
belge `arketip-ve-yaklasim-icerigi-2026-09-03.md:269` menti sürümü için *"menti tarafında aynı yapı, arketip adları değişerek"*
diye **talimat bırakmış**, metin yazılmamış. madde 147 (menti öğrenme yolculuğu, 5/5 dolu) her aşamasında `{mentor_mimar}` gibi
yer tutucu taşıyor ve bu değişkenlerin kodda **0 karşılığı** var (kapsam: iki repo `src`+`prisma`, harf duyarsız → 0 dosya) →
bugün seed edilse kullanıcı ekranda ham `{mentor_mimar}` görür. I-17 (gizlilik+bitirme aşamaları) kuyrukta "seed işi" yazıyor
ama **seed'e koyacak içerik hiç yazılmamış** → önce yazım turu.

**③ Aynı arketip adı üç ayrı anlamda kullanıcıya çıkabilir — "Kâşif" çakışması.**
Canlıda çalışan DISC kartı C harfine **"Kâşif"** diyor (`onboardingController.ts:94,97-98`); canonical psikometri belgesi
"Kâşif"i **mentör M2** olarak tanımlıyor (`docs/kararlar/konu/03-psikometri-ve-algoritma.md:14`); yeni içerik belgesi ise
**menti arketipi** olarak kullanıyor (`arketip-ve-yaklasim-icerigi-2026-09-03.md:53`). Üstelik yeni 8 adın **hiçbirinin**
kod değerine (`M1..M4`/`m1..m4`) eşlemesi yazılı değil. madde 138 ve 151 "içerik hazır" ama **hangi metin hangi koda bağlanacak
kararı yok** — bu bir ürün kararı, ajan kendi başına veremez.

---

## 1 · KAPSAM BEYANLARI

- **Okunan yerler:** BE `/home/user/menti-mentor/src` + `/prisma` (seed*.ts, `senaryo-bankasi-tam.md`) · FE
  `/home/user/menti-mentor-v2/frontend/src` · içerik belgeleri `docs/raporlar/icerik/` · karar belgeleri (salt-okuma).
- **Güncel kuyruk kaynağı:** `origin/otonom/BB-devir-uygulama-20260921` dalındaki `00-KUYRUK.md` · `01-KARARLAR.md` ·
  `03-PO-ELLE-ISLER.md` (main henüz güncel değil). Her öneri bu hallerle karşılaştırıldı.
- **Yöntem:** 1 ana ajan + 5 paralel salt-okuma alt-ajanı; **yüksek etkili her iddia ana ajan tarafından kaynaktan yeniden
  doğrulandı.** Doğrulamada bir sayım düzeltildi (§9.2).
- **İki dilli tarama (KURAL 13):** mentor↔mentör · tenant↔kurum · meeting↔görüşme · match↔eşleşme · invite↔davet ·
  consent↔rıza · privacy↔gizlilik · crisis↔kriz · certification↔sertifika · stage↔aşama · archetype↔arketip.
- **SAYILAN BİRİMLER:** "senaryo" = belgede `### Varyant` başlığı / seed'de benzersiz `code` · "şık" = belgede `- **(0-3)**`
  maddesi / seed'de `options[]` nesnesi · "konu" = belgede `## N. KONU` / seed'de benzersiz `topic` · "kalem" = bu raporun
  KALEM LİSTESİ'ndeki satır · "aşama" = `seed-learning-journey.ts`'te `audience` taşıyan **veri** nesnesi (sorgu `where`
  blokları sayılmaz — bkz. §9.2).

---

## 2 · A — ⭐ HAZIR BEKLEYEN İÇERİK

### 2.1 Altı kalemin gerçek durumu

| Kalem | İçerik nerede | Gerçekten hazır mı | Koda bağlanmak için ne lazım | Bağlama eforu |
|---|---|---|---|---|
| **madde 151** · yaklaşım metinleri | `arketip-ve-yaklasim-icerigi-2026-09-03.md:307-404` (mentöre `:324-360`, mentiye `:366-402`) | ✅ **8/8 TAM** — yer tutucu yok, editör notu yok, ton tutarlı, ekrana redaksiyonsuz konabilir | Şema/seed **gerekmez**; FE sabit dizi (anahtar `M1..M4`/`m1..m4`) + **yeni eşleşme-detay ekranı** (FE'de böyle bir ekran yok) | **S** metin · **L** uçtan uca |
| **madde 154** · bekleyen talep | `menti-yolculugu-ve-eslesme-metinleri-2026-09-03.md:322-346` (3 metin + buton etiketleri) | 🟡 **3/3 yazılı ama iki açık:** `{n}` **sıfır** hâli tanımsız (belgenin kendi açık kalemi `:420`) · kapanış metni ilk cümlede olumsuzu söylüyor (`:340`) → ton kararı | FE sabit dizi + **durum alanı** (bkz. §2.3 ÇAPRAZ-3) + `cronScheduler.ts`'e 1 iş + `{n}` sayacı | **M** |
| **madde 155** · eşleşme ret | aynı dosya `:356-364` (menti) · `:374-376` (mentöre) | 🟡 Mentör metni **tam hazır**; menti metninde aynı `{n}` boşluğu (`:362`) | Ret eylemi için durum + mentör panosunda **eşleşme** reddi UI'ı (bugün yalnız **toplantı** reddi var) + aynı ekranda alternatif | **S** metin · **M** akış |
| **madde 138** · 8 arketip kartı | `arketip-ve-yaklasim-icerigi-2026-09-03.md:153-261` (5 parçalı 8 kart) | 🟡 **8/8 TAM ve akıcı**, ama **"İz Açan" adı PO-onaysız** (belge `:263` bunu kendisi yazıyor) + "Kâşif" çakışması (§0③) | Şema/seed **gerekmez**; FE sabit dizi + kart (desen hazır: `ResultStep.tsx:74-82`). Ön koşul: **ad↔kod eşlemesi** + OCEAN motoru (I-13) + canlıdaki DISC kartının akıbeti | **S** metin · **L** uçtan uca |
| **madde 139** · "şimdilik" varyantları | aynı dosya `:271-301` | ⛔ **4/8 — YARIM.** Dördü de mentör tarafı; menti sürümü **yazılmamış**, `:269` talimat bırakmış | Önce **4 menti varyantı yazılacak**; sonra eşik dalı + sabit dizi. Eşik sabiti `scoring.config.ts:31` komşusuna (sihirli sayı yazılmaz) | **S** yazım + **S** bağlama |
| **madde 147** · menti öğrenme yolculuğu | `menti-yolculugu-ve-eslesme-metinleri-2026-09-03.md:71-171` (5 aşama · 15 şık · 15 geri bildirim) | 🟡 **5/5 dolu** ama **her aşamada `{mentor_*}` yer tutucusu** — kodda 0 karşılık | SEED (`LearningStage`, şema gerekmez). ⛔ İki engel: (a) madde 146 isim değişkenleri, (b) seed'de **zaten 6 farklı menti aşaması var** → üzerine yazma/pasifleştirme **PO kararı** | **M** |

### 2.2 A.3 — öğrenme yolculuğu seed'i (⛔ çalıştırılmadı, yalnız okundu)

- **13 aşama dolu:** MENTOR **7** (`:42-266`) + MENTI **6** (`:303-468`), toplam 42 şık. `TODO|FIXME|TBD|placeholder|lorem`
  taraması → **0 sonuç**; boş alan taraması → **0 sonuç**.
- **Yazma biçimi güvenli:** yalnız `upsert` (2 çağrı), **`deleteMany` 0 · `updateMany` 0** (dosya tümü). Doğrudan-çalıştırma
  muhafızı var (`:534-536`). Tek tabloya dokunuyor: `LearningStage`, yalnız `tenantId = null` çekirdek satırları.
- **Kalan gerçek risk:** idempotent **üzerine yazma** — canlıda bu 13 satır elle/panelden düzenlendiyse seed onları sessizce
  eski hâline döndürür (`update` tüm alanları ezer). Kurum klonları ve gizleme kayıtları etkilenmez.
- **Belge ↔ seed farkı:** içerik belgesi mentör için **8** aşama yazmış, seed'de **7** var → 1 aşama ayrışmış. ❓ TEYİT GEREK
  (hangi 8'inci aşama hiç girmedi).
- **KARAR-5 neyi bekliyor:** kartın kendisi *"içeriği kimse okumadan canlıya gitmesin"* endişesini soruyor. Bu denetim o
  endişeye **kısmi cevap** veriyor: içerik dolu ve placeholder'sız, seed yalnız `upsert` — yani teknik risk düşük. Kalan soru
  saf içerik kalitesi (PO okuması) + yukarıdaki 7↔8 ayrışması.

### 2.3 Üç çapraz bulgu (kuyruktaki I-01/I-10/I-15/I-16'da YOK)

- **ÇAPRAZ-1 · Ad↔kod eşlemesi yazılı değil, üstelik eski eşleme çelişiyor.** Kod 8 arketibi `M1..M4`/`m1..m4` olarak tanıyor
  (`disc-to-ocean.adapter.ts:27-43`, `scoring.config.ts:33-44`, `schema.prisma:997`). Eski canonical adlar
  (`03-psikometri-ve-algoritma.md:14-15`) ile yeni içerik adları (`arketip-...md:52-53`) **farklı**, ve "Kâşif" iki belgede
  **iki farklı rolde** (eskide mentör M2, yenide menti) — üstüne canlıdaki DISC kartında **üçüncü** bir "Kâşif" var
  (`onboardingController.ts:94`). Kapsam: `docs/**/*.md` + BE `src`/`prisma`, 8 ad × 8 kod çapraz, harf duyarsız →
  isim↔kod eşlemesi **1 sonuç, o da eski adlarla**. Yeni 8 ad için **0 eşleme**.
- **ÇAPRAZ-2 · İçerik belgesindeki ağırlıklar kodla çelişiyor.** Belge hedef/değer %45 · alan %30 · kişilik %25
  (`arketip-...md:57-60`); kod `SECTOR 0.6 / CHARACTER 0.4` (`scoring.config.ts:48`), canonical belge de kodu doğruluyor
  (`03-psikometri-ve-algoritma.md:19`). Kart kullanıcıya "profilin şu ağırlıklarla hesaplandı" der duruma gelirse çelişki
  görünür olur. ❓ TEYİT GEREK (hangisi geçerli — PO).
- **ÇAPRAZ-3 · "Durum alanı yok" engeli sanıldığı kadar sert değil.** I-10/I-16 `MatchRequest`'te durum alanı olmadığını
  doğru saptıyor (`schema.prisma:439-458`). **Ama** `VisibilityOptIn` (`:397-425`) `PENDING|APPROVED|REJECTED` durumu +
  indeksleri taşıyor ve **canlıda yazılıyor** (`matchingController.ts:174-190`), REJECTED sayımı bile kullanılıyor
  (`abuseDetection.service.ts:6,36`). Menti→mentör yolunda **bilerek** devre dışı bırakılmış
  (`requestController.ts:17` yorumu). Yani soru "alan yok" değil, **"hangi tablo kanonik"** — migration'sız yol teknik olarak
  açık ve I-10/I-16'nın eforunu düşürebilir. ❓ TEYİT GEREK (mimari karar).

---

## 3 · A.2 — ⭐ SERTİFİKA: BELGE (22/88) ↔ SEED (20/80) TAM FARKI

### 3.1 Sayım (birimler §1'de tanımlı)

| Kaynak | Konu | Senaryo | Şık | Red-line |
|---|---|---|---|---|
| Belge (3 oturum dosyası, 2026-09-08) | **11** | **22** | **88** | 4 konu / 8 senaryo / 32 şık |
| Seed (`seed-certification.ts`) | **10** | **20** | **80** | 4 konu / 8 senaryo |

Seed sayımı kod-teyitli: `code: 'CERT_T` → 20 · `{ key: '` → 80 · benzersiz `topic` → 10 · `isRedLine: true` → 8 ·
`internalNote` → **0**. Belge sayımı: `^### Varyant` → 8+6+8 = 22 · `^- **(0-3)**` → 32+24+32 = 88; belgenin kendi
kapanış tablosu da aynı (`sertifika-oturum3-4-konu-2026-09-08.md:480-489`).

### 3.2 Fark aritmetik değil, yapısal

Belgenin kapanış tablosu 22 senaryonun kaynağını döküyor: **faz6 15 · tam.md 5 · yeni 2**. `tam.md` = seed'in kaynağı
(`seed-certification.ts:7`). Buradan:

- **Seed'de karşılığı olmayan senaryo: 17** (22 − 5) → **68 şık** hiç yok.
- **Belgede elenmiş seed senaryosu: 15** — her biri gerekçeli "ELENEN SAHNELER" tablolarında (yüzey ayrımı/çelişki).
- **Tamamen yeni konu: 1** — *Bitirme* (`sertifika-oturum3-4...md:213`; belge `:218` *"`tam.md`'de bitirme konusu YOK"*).
  Ayrıca 2 konu yeniden tanımlanmış; seed'deki 2 konu (`okul-gonulluluk-dengesi`, `gonullu-tukenmisligi`) düşüyor.
- **Soy bağı olan 5 senaryonun 5'i de değişmiş.** En kritiği: *Gizlilik B* — **puan anlamı ters dönmüş** (seed'de **2**
  puanlık davranış belgede **3**'ün parçası). Yani seed'deki metin yalnız eski değil, bazı yerlerde **yanlış puanlıyor**.

### 3.3 "Seed atılsa yeni içerik çıkmaz" → doğru, üstelik eski metin yeniyi EZER

`seed-certification.ts:263-301`: her soru `upsert` ile yazılıyor ve `update:` bloğu `scenario`, `isRedLine`, `topic`,
`variant`, `isActive` alanlarını **koşulsuz** üzerine yazıyor; her şık da `label`, `competencyScore`, `explanation`,
`outcome` alanlarını koşulsuz eziyor. Silme yok — eskiler pasifleştiriliyor (`:307-310`). ⚠️ **Şık artığı riski:** şık silme
hiç yok; bir soru aynı `code` ile kalıp şık anahtarları değişirse eski şıklar DB'de kalır ve soru 4'ten fazla şıkla görünür
(`getCertificationQuestions` filtre uygulamıyor).

### 3.4 `internalNote` (madde 163)

Şemada **var** (`schema.prisma:1158`, `String?` nullable, migration `20260909000000_add_internal_note`), seed **hiç
doldurmuyor** (0 kayıt). Belgelerde karşılığı **17 iç not maddesi** yazılı (O1:238-255 · O2:218-236 · O3:277-308).
⚠️ **Yapısal uyumsuzluk (yeni bulgu):** alan **şık** düzeyinde, notlar **konu/varyant** düzeyinde yazılmış → taşırken karar
gerekiyor: (a) notu ilgili şıkka iliştir · (b) varyantın 4 şıkkına kopyala · (c) soru düzeyinde yeni alan aç (**migration**).
Bu karar madde 30'un içinde kabul edilmiş değil.

### 3.5 Taşıma planı (seed ÇALIŞTIRILMADAN — P-99'u besler)

**Ön koşul durumu:** eşik `>= 2` koda geçmiş (`certification.service.ts:72`, madde 164 ✅) · `internalNote` canlıda ✅ ·
açık blokerler: **KARAR-3** (kriz senaryolarının hukuki teyidi) ve **KARAR-4** (somut destek kaynağı adı) — belge bunu
kendi içinde "ÇIKIŞ BLOKERİ" diye işaretliyor (O1:356-359).

**Değişecek yerler:** `seed-certification.ts` `:13-18` tip (+`internalNote?`) · `:37-257` `CERT_QUESTIONS` **tamamen yeniden
yazılır** (20→22 nesne, 80→88 şık) · `:283-301` option upsert (+`internalNote`) · `:6-11` kaynak yorumu ·
FE `admin/certification/page.tsx:13-24` `TOPIC_LABELS` (10→11 slug; **haritada olmayan slug ham slug olarak ekrana basılır**) ·
`senaryo-bankasi-tam.md`'ye bayat damgası (silme yok) · `tests/certification*.test.ts` fixture'ları.

**Dört açık karar (taşımadan önce):** ① konu slug şeması ve düşen 2 slug'ın `Tenant.disabledCertTopics` /
`TenantMembership.certWrongTopics` kayıtlarına etkisi · ② soru `code` şeması (eskiler pasifleştirilsin mi — şık artığı riski
buna bağlı) · ③ `{sert_N}` isim değişkenleri (kodda **0 renderer**: iki repo `src`+`prisma`, harf duyarlı ve duyarsız → 0 sonuç) ·
④ iç not yerleşimi (§3.4).

**Yan etkiler (satır kaybı yok, ama iki alan anlamsızlaşabilir):** `certWrongTopics` ve `disabledCertTopics` slug tutuyor —
slug değişirse "zayıf konuya ağırlık" sessizce devre dışı kalır, kurumun kapattığı konu öksüz kalır. **Geçme eşiği payda
değişir:** `ceil(aktif konu × 0.8)` → 10 konuda 8, 11 konuda **9** → sertifika zorlaşır.

**Migration:** mevcut tasarımla **gerekmez** (yeni konu = veri işi); yalnız §3.4-(c) seçilirse gerekir.
**Efor: L** — saf kod M, ama 4 açık karar + 1 hukuki bloker + FE + test + canlı tur birlikte L. En az ikiye bölünmeli
(içerik taşıma PR'ı / çalıştırma turu).

### 3.6 Red-line kümesi — tek tam örtüşen boyut ✅

Belge ve seed **aynı 4 red-line konuyu** taşıyor: `yapici-geri-bildirim` · `sinir-koyma` · `gizlilik-guven` ·
`kriz-yonetimi` (seed `:62,128,216,238`; belge O1 başlığı ve `:383`). Önceki turun "seed'de tam 4 red-line konu var"
iddiası **doğrulandı**.
