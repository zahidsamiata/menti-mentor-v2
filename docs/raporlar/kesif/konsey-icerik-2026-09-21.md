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

---

## 4 · C — İÇERİK DOĞRULUĞU

### 4.1 C.1 — Metin kullanıcıya ne VAAT ediyor?

**Birim:** "kullanıcıya görünen, ürün/test/sertifika/eşleşme hakkında iddia taşıyan metin bloğu."
**136 blok tarandı** (landing 31 · metodoloji 14 · arketip kartları 32 · mizaç testi 11 · onboarding 24 ·
öğrenme çerçevesi 6 · sertifika sonucu 9 · eşleşme gerekçesi 5) → **9'u riskli**.

⚠️ Bilimsel geçerlilik bu konseyin konusu değil (psikometri ayrı konsey); yalnız metnin **vaadi** değerlendirildi.

| # | Nerede | Alıntı | Risk | Önerilen yön (metin yazılmadı) |
|---|---|---|---|---|
| C1-1 | `onboardingController.ts:67` (ve `:77,87,97`) | *"Sen bir Öncüsün! Cesur, sonuç odaklı…"* | 8 soruluk testin sonucunu **değişmez kimlik etiketi** gibi sunuyor | Koşullu/zamansal dil ("şu an … eğilimi") |
| C1-2 | `ResultStep.tsx:39-43` | *"Sen bir {archetype}sın!"* (en büyük tipografi + konfeti) | Aynı etiketleme, kutlama efektiyle pekiştiriliyor | Başlıkta kimlik değil gözlem dili |
| C1-3 | `ResultStep.tsx:71` | *"En İyi Eş"* | Üstünlük iddiası; eğilim kesinmiş gibi | Göreli dil |
| C1-4 | `ResultStep.tsx:98-100` | *"…en uygun … kişiyle eşleştirileceksin."* | **Kesin gelecek vaadi** — oysa havuz boşsa ürün "uygun mentor bulunamadı" diyor | Koşullu kip |
| C1-5 | `menti/page.tsx:311-312` | *"%{matchScore} uyum"* | Skor **nesnel ölçü** gibi, açıklamasız (arkasında sektör 0.6 + DISC 0.4) | Bant (yüksek/orta) veya "nasıl hesaplandı" bağlantısı |
| C1-6 | `matchingController.ts:15,88` | `compatibilityReason … \|\| 'Genel profil uyumu'` | "Neden uyumlu:" başlığı altında **içeriksiz gerekçe** basılıyor | Gerekçe üretilemiyorsa satırı hiç göstermemek |
| C1-7 **HUKUKİ** | `mentor/certification/page.tsx:193,195` (+ `admin/mentor-havuzu:168`, `TenantSwitcher:132`) | *"Tebrikler — Sertifikalı Mentörsün!"* + `SERTİFİKALI` rozeti | **Akreditasyon izlenimi**; kapsam/çekince cümlesi yok. Kapsam beyanı: `frontend/src/app/**`, `akredit\|mesleki yeterlilik\|diploma\|unvan\|yasal` TR+EN harf duyarsız → **0 çekince** | Rozetin yanında kapsam çerçevesi — **PO/avukat** |
| C1-8 **HUKUKİ** | `HeroSection.tsx:34,51` | *"Sonsuza kadar ücretsiz"* (2 kez) | **Süresiz ticari taahhüt**; kullanım koşullarında karşılığı yok | Koşullu dil ya da koşullarda karşılık — **PO/avukat** |
| C1-9 | `GameSection.tsx:69,86` | *"Test bittiğinde kazanacağın arketip"* | Testi **ödül oyunu** gibi çerçeveliyor; ürün içi *"bu sorular seni bir kalıba sokmak için değil"* tonuyla çelişiyor | Keşif dili |

**⭐ Desen (asıl bulgu):** iddia disiplini **landing/metodoloji ve öğrenme yolculuğunda güçlü** — metodoloji sayfası
*"Kesin bir başarı garantisi değil"*, *"kanıtlanmış bir kesinlik değil"*, EngineSection *"DISC … kişilik tanısı aracı
değildir"*, DiscNoPressureNote *"burada doğru-yanlış yok"* diyor. Ama bu disiplin **onboarding sonuç kartında,
eşleşme kartında ve sertifika rozetinde YOK** — yani kullanıcının ürüne ilk girdiği ve **paylaş düğmesiyle dışarı
taşıdığı** ekranlarda (`onboardingController.ts:68` `shareHeadline`). Risk, çekincenin olmadığı yerde yoğunlaşmış.

### 4.2 C.2 — HUKUKİ HASSAS İÇERİK

#### KARAR-3'ün kanıtı (kart bunu istiyordu — kartın kendisi senaryoyu adlandırmıyor)

**Konu: 🔴 KRİTİK KONU 4 — KRİZ, Varyant B "Endişe veren ifade"** (ikincil: Varyant A "Menti kayboldu").

| Ne | Dosya:satır | Birebir metin |
|---|---|---|
| Şık (3 puan) | `sertifika-oturum1-4-kritik-konu-2026-09-08.md:218-219` | *"Sözünü kesmeden dinlerim, ciddiye aldığımı söylerim; profesyonel destek almasını öneririm **ve kurum yöneticisine bildiririm**."* |
| Asıl hukuki iddia (gerekçe) | aynı `:220-222` | *"**Bildirim gizlilik ihlali değil sorumluluktur** — ve bunu {sert_1}'e açıkça söylemek…"* |
| Konunun prensip cümlesi | aynı `:187-188` | *"Mentör dinler ama tek başına taşımaz; risk sinyalinde yönlendirir **ve kuruma bildirir**."* |
| Önceki belgedeki mutlaklık | `faz6-ogrenme-ve-sertifika-2026-09-03.md:466` | *"Bu, mentörün **hiçbir koşulda tek başına taşımaması gereken** tek durumdur."* |
| Belgenin kendi uyarısı | `sertifika-oturum1-...:183-185` | *"⚠️⚠️ HUKUKİ TEYİT BEKLİYOR — HER İKİ VARYANT."* |

⭐ **KARAR-3 için kritik bağlam (kartta yok):** bu bildirim yükümlülüğü metni **kodda YOK**.
`seed-certification.ts:236-259` (kriz soruları) şıklarının hiçbirinde kuruma/yöneticiye/aileye bildirim geçmiyor —
yalnız "uzmana/profesyonel desteğe yönlendiririm" var. Kapsam: o dosyada `bildir|yasal|kolluk|polis|savcı|kuruma|amir`
harf duyarsız → tek isabet "geri **bildirim**" (feedback). ⇒ **KARAR-3 canlıdaki bir metni değil, P-99 ile
taşınacak bir metni blokluyor.** Bu, kararın aciliyetini düşürür ama gerekliliğini değiştirmez.

#### KARAR-4'ün kanıtı

Boşluk **yer tutucu olarak bile yok** — metin doğrudan soyut yazılmış:
`seed-certification.ts:241` *"…bir uzmana/profesyonel desteğe nazikçe yönlendiririm"* · `:251` *"…doğru profesyonel
desteğe (uzman/kurum)…"* · `seed-learning-journey.ts:196` *"…(okul psikoloğu/uzman) yönlendirirsin"*.
Kapsam: beş dosyada `___ · TODO · TBD · placeholder · doldur · eklenecek · belirlenecek · 182 · 112 · destek hatt`
harf duyarsız → kriz metinlerinde **0 eşleşme**. Ürün içindeki **tek somut kaynak adı** "okul psikoloğu"
(`seed-learning-journey.ts:196`) — yalnız okul bağlamı, yetişkin menti/STK için karşılığı yok.
Belge bunu "ÇIKIŞ BLOKERİ" diye kayda geçmiş (`sertifika-oturum1-...:356-359`).

#### YENİ hukuki bulgular (KARAR-3/4 dışında) — **13 kalem**

⛔ Metin yazılmadı, düzeltme önerilmedi. Hepsi **PO/avukat kararı**.

| # | Bulgu | Alan | Dosya:satır | Neden riskli |
|---|---|---|---|---|
| H-01 | Üç hukuki sayfa da kendi metninde *"Bu metin **taslak** niteliğindedir"* diyor | Sözleşme | `kvkk/page.tsx:109` · `gizlilik/page.tsx:85` · `terms/page.tsx:73` | Kayıt akışı bu metinlere **zorunlu açık rıza** aldırıyor → rıza, kendini geçersiz ilan eden metne veriliyor |
| H-02 | *"Bilgileriniz KVKK uyumlu, kapalı devre ve **güvendedir**"* | KVKK | `InvitationCard.tsx:142` | Koşulsuz uyum + güvenlik garantisi, H-01 ile birlikte çelişik |
| H-03 | Footer *"KVKK uyumlu"* damgası | KVKK | `app/page.tsx:65` | Aynı sayfadaki metinler taslakken koşulsuz uyum beyanı |
| H-04 | Footer'daki hukuki bağlantılar **link değil `<span>`** | Sözleşme erişimi | `app/page.tsx:67-71` | Sayfalar var ama footer'dan tıklanamıyor → "sunuldu" savunması zayıflar |
| H-05 | Aydınlatma metni işlenen veri kategorilerini eksik sayıyor | KVKK Md.10 | `kvkk/page.tsx:31-38` | `Message`, `FeedbackLog` ve sertifika yanıtları metinde yok |
| H-06 | Saklama süreleri metin↔kod uyuşmuyor; mesaj süresi belirsiz | KVKK saklama-imha | `kvkk/page.tsx:69-74` ↔ `gdprService.ts:341-342,378-380` | Kodda `TODO(G1-10): Message saklama süresi avukat metniyle belirlenecek` |
| H-07 | *"Geri bildirim … **kimliğin paylaşılmaz**"* | KVKK | `MeetingFeedbackCard.tsx:173` ↔ `feedbackLogController.ts:134-135,147-148` | Admin geri bildirim kayıtlarını **ad-soyadla** listeliyor (`fullName` select) — ifade kapsam belirtmiyor |
| H-08 | 18+ beyanı ayrı kutu değil, KVKK rızasına **gömülü** | Yaş/rıza | `_RegisterContent.tsx:162,413-417` · `Step4Account.tsx:199-207` | Tek kutu iki ayrı hukuki işlemi birleştiriyor; rıza geri alınırsa yaş beyanının akıbeti belirsiz |
| H-09 | Yaş verisi saklanmıyor, 18+ için ayrı rıza tipi yok | Yaş/ispat yükü | `consentService.ts:59` (`AYDINLATMA`,`ACIK_RIZA`) | Beyanın **ispatı yok** — G1-01 çelişkisinin kod tarafı |
| H-10 | Koşullar mutlak 18+ diyor, kriz içeriği 18 altını tartışıyor | Yaş/sözleşme | `terms/page.tsx:30` ↔ `sertifika-oturum1-...:350-354` | Ürün kararı ile sözleşme çelişiyor |
| H-11 | Yurt dışı aktarım tek genel rızaya bağlanmış | KVKK Md.9 | `kvkk/page.tsx:100-105` | Aktarım için ayrı rıza tipi kodda yok (bkz. H-09) |
| H-12 | Giriş hatası hesap varlığını sızdırıyor | Güvenlik/KVKK | `_LoginContent.tsx:14` *"Bu e-posta başka bir yöntemle kayıtlı."* | Projenin kendi enumeration-safe kuralıyla (`registerMessages.ts:8-11`) doğrudan çelişiyor |
| H-13 | `/bildir` üye olmayandan iletişim verisi topluyor, aydınlatma bağlantısı görülmedi | KVKK | `bildir/page.tsx:41-42` | ❓ TEYİT GEREK (sayfanın tamamı okunmadı) |

✅ **Olumlu ve kayda değer:** hesap kapatma akışı **dürüst** — "silinir" demiyor, anonimleştirmeyi anlatıyor
(`DataPrivacySection.tsx:199-206`) ve kod aynı şeyi söylüyor (`gdprService.ts:45-47`: *"'Silindi' DEMEZ"*).
Bu, H-01…H-11'in nasıl düzeltilebileceğinin ürün içindeki **hazır örneğidir**.

### 4.3 C.3 — KRİZ/RİSK: sistem mentöre ne söylüyor?

**Birim:** kriz/risk konusunu işleyen ayrı içerik nesnesi. **11 nesne** (sertifika 2 · öğrenme yolculuğu 1 · belge 8) ·
**canlı tetiklenen akış: 0.**

- **Yönlendirme yönü DOĞRU:** içerik "kendin çöz" demiyor (`seed-certification.ts:244` *"Zararlı: krizdeki birini
  görmezden gelmek"*), "profesyonele yönlendir" diyor ve rol sınırını çiziyor (*"mentör … terapist değildir"*).
- **Ama YETERSİZ:** somut kaynak yok (KARAR-4) ve **"kuruma bildir" adımı canlı içerikte hiç yok** — belgede
  planlanmış (`sertifika-oturum1-...:18`), kodda karşılığı yok. İçerik ↔ belge farkı.
- **Canlı kriz akışı yok — kapsam beyanıyla doğrulandı:** 4 dizin (FE `src`, BE `src`, `src/routes`, `schema.prisma`) ×
  **22 terim iki dilli** (`kriz↔crisis` · `intihar↔suicide` · `kendine zarar↔self-harm` · `acil↔emergency` · `şiddet` ·
  `istismar` · `taciz` · `psikolog` · `ruh sağlığı↔mental health` · `112/183/182` · `escalat` · `safeguard` · `alert`…)
  → şemada **0**, rotalarda **0**, BE'de 5 isabetin **5'i alakasız** (algoritma fallback, meslek unvanı listesi),
  FE'de 5 isabetin **5'i alakasız** (SVG path, psikolog adı, pazarlama cümlesi, sınav konu etiketi).
- **EK BULGULAR (önceki turda yok):**
  - **Menti tarafında kriz içeriği HİÇ yok** — `menti/orientation-guide/page.tsx:17-63` dört senaryo içeriyor,
    hiçbiri kriz/kötü muamele/sınır ihlali değil. Menti, kendisi ya da mentörü kaynaklı bir sorunda ne yapacağını
    hiçbir ekranda öğrenmiyor.
  - **Menti "sadece konuşacak biri lazım" diyebiliyor** (`threeQuestionsText.ts:30`) ama bu seçim yalnız eşleştirme
    sinyali; hiçbir destek çerçevesine bağlanmıyor.
  - **Tek "bildir" kanalı kriz için değil** — `/bildir` kapsamı sahte kurum kaydı/yetkisiz davet (`bildir/page.tsx:55`);
    ilişki-içi risk/istismar bildirimi için kanal yok.
  - **Kriz konusunda elenen mentöre sebebi söylenmiyor** (aşağıda, C-?? satırı).

---

## 5 · D — İÇERİK BELGELERİ

**Birim:** tek `.md` dosyası. Klasörde **12 üst düzey + 5 `bolumler/` = 17 belge**, ayrıca kod deposunda ilişkili 1
belge (`prisma/senaryo-bankasi-tam.md`).

### D.1 — Mükerrerlik: önceki iddia **kısmen** doğrulandı

✅ **Üç sertifika oturum belgesi gerçekten farklı parçalar:** O1 = KONU 1-4, O2 = KONU 5-7, O3 = KONU 8-11;
tekrar eden konu/varyant **yok**, numaralandırma ardışık.
✅ `senaryo-bankasi-tam.md` (sertifika, 10×2) ↔ `senaryo-bankasi-2026-09-03.md` (Big Five karakter, 39/117)
**mükerrer değil**; indeks bu ayrımı `:52-55`'te doğru anlatıyor.

⛔ **AMA aynı denetim diğer belgelere uygulandığında ÇELİŞKİ çıkıyor — bu YENİ bulgu:**
Aynı sahne **üç farklı metinle** üç yerde duruyor. Örnek, Gizlilik Varyant A:
`faz6-...md:418-427` (puansız, `✅ İkinci` biçimi) ↔ `sertifika-oturum1-...:134-153` (0-3 puanlı, yeniden yazılmış) ↔
**kodda bambaşka bir sahne** (`seed-certification.ts:216-217`, kaynağı `senaryo-bankasi-tam.md:279-281`).
Aynı örüntü kriz, sınır ve geri bildirim konularında da geçerli. Oturum belgeleri kaynak atfı yapıyor
(`sertifika-oturum1-...:135` *"Kaynak: faz6 3A sahnesi"*) **ama hangi sürümün canlıya gideceği hiçbir belgede yazmıyor**
ve faz6 hâlâ "📸 DONDURULMUŞ" etiketli. ⇒ P-99 taşıma turu bu üçlüden hangisini alacağını bilmiyor.

### D.2 — İndeks güncelliği

- **Klasörde olup indekste olmayan (üst düzey): YOK** — 11 belgenin 11'i listeli.
- **Kısmi eksik:** `bolumler/` altındaki **5 belge tek tek listelenmiyor**, indeks yalnız klasörü anıyor (`:35`).
- **İndekste olup klasörde olmayan: 3** — ama bunlar `⬜ HENÜZ YAZILMADI` diye dürüstçe işaretli, hata değil.
- **Bayat yol:** `00-INDEKS.md:52` (ve `bolumler/*.md` başlıkları) `backend/prisma/...` yolunu kullanıyor;
  bu çalışma alanında `menti-mentor-v2/backend` **boş** (submodule), gerçek yol `menti-mentor/prisma/...`.
- **İndekste eksik bağlam:** 2026-09-08 serisinin faz6'yı **aştığı** hiç yazmıyor; `:20` hâlâ faz6'yı
  "20 sertifika senaryosu" diye sunuyor.

### D.3 — Durum etiketleri

- **Zayıf etiket (3 belge):** üç sertifika oturum belgesi `> 📸 Üretim: 2026-09-08 …` diyor — 📸 var ama
  **"DONDURULMUŞ"/"YAŞAYAN" sözcüğü yok**, klasörün kalıbına uymuyor.
- **Etiketi doğru, içeriği aşılmış (1):** `faz6-...:6` `📸 DONDURULMUŞ` — ama sahneleri yeniden yazılmış;
  belge "hangi sürüm geçerli" sorusunu cevaplamıyor.
- **Etiket↔kod çelişkisi (1):** `prisma/senaryo-bankasi-tam.md:3` kendini *"TAM TASLAK — kullanıcı onayı bekliyor"*
  sayıyor, oysa içeriği **zaten canlı seed'in kaynağı** (`seed-certification.ts:7`).
