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

---

## 6 · B — TUTARLILIK

> Bölüm sırası: raporda A → C → D → B izlendi (A ve C ara kayıtlarla güvenceye alındı). İçerik aynı.

### 6.1 B.1 — ⭐ İNGİLİZCE / HAM-ENUM KALINTI

**Birim: "render noktası"** = kullanıcıya metin üreten tek `dosya:satır`. **23 render noktası** (1E hariç).

**① 2026-09-09 kullanıcı testinin kaynağı doğrulandı** — `mentor/page.tsx:27-30`:
`'D — Dominant'` · `'I — Influential'` · `'S — Steady'` · `'C — Conscientious'`, render `:403` `.map` → `:412`.
Mentör panelindeki "Engellenecek DISC Profilleri" filtresinde **4 İngilizce etiket** ekranda.
Ayrıca `DiscRecallCard.tsx:80` ve `ResultStep.tsx:69` "Dominant" basıyor.

⚠️ **Asıl bulgu tek hata değil, beş ayrı sözlük:** aynı 4 DISC boyutu için kod tabanında **5 sözlük var ve hiçbiri
diğeriyle uyuşmuyor** — `DiscBadge.tsx:13-16` ve `profile/page.tsx:30-33` (Öncü/Ateşleyici/Yapı Taşı/Kâşif) ·
`types/discTest.ts:134-140` (Kararlılık/Etki/Denge/Titizlik) · `mentor/page.tsx:27-30` (İngilizce) ·
BE `analyticsEngine.ts:67-70` (karma). Tek kaynağa indirilmeden düzeltme kalıcı olmaz.

**② Ham enum ekrana basılıyor — 12 render noktası** (LABELS sözlüğünden geçmiyor):

| Ekranda görünen ham değer | Nerede | Ağırlık |
|---|---|---|
| `MENTOR` / `MENTI` rol rozeti | `admin/waiting-room/page.tsx:133` · `PendingUserCard.tsx:78` | Yüksek (kurum yöneticisi görür) |
| `APPROVED`/`MERGED`/`REJECTED` | `admin/tags/page.tsx:111` | Yüksek |
| **`M1`…`M4` / `m1`…`m4` ham arketip kodu** | `admin/eslesmeler/page.tsx:134,142` (`{match.mentorArchetype}`) | Yüksek — **hiçbir sözlük yok**, yönetici çıplak kod görüyor |
| `ONLINE`/`IN_PERSON`/`PHONE` | `MeetingsTable.tsx:66` | Orta |
| `NOT_STARTED`…`COOLDOWN` | `MembersTable.tsx:92` | Orta — ⚠️ **sözlük VAR ama kullanılmıyor**: `sertifika-sonuclari/page.tsx:37-41` aynı enum'u tam Türkçe çeviriyor |
| `INFO`/`WARN`/`ERROR`/`AUDIT` | `platform/dashboard/page.tsx:263,264,566` | Düşük (teknik ekran) |
| İngilizce başlık **"Journey"** | `MembersTable.tsx:72` | Orta |

**③ Ham enum harfi prozada — 6 nokta:** *"En İyi Eş: **S + C**"* (`ResultStep.tsx:71`, `DiscRecallCard.tsx:86`),
*"…en uygun **S veya C** profilli kişiyle…"* (`ResultStep.tsx:99`), ham `discLetters` (`menti/page.tsx:245`) vb.
Kaynak `onboardingController.ts:70,78,86,94` `compatibleWith: ['S','C']` — aynı dosyada Türkçe arketip adları
zaten var, eşlenmemiş.

**④ E-postada ham rol enum — 2 nokta:** `emailService.ts:110` *"…adlı yeni bir **MENTOR** kaydı sisteme girdi."* ·
`:165` *"Ad Soyad (**MENTI**) DISC karakter analizini tamamladı."* FE'de `TenantSwitcher.tsx:32-33` sözlüğü var,
BE'de eşdeğeri yok.

**⑤ Sistemik — Zod İngilizce varsayılanları kullanıcıya sızıyor (~75 kısıt / 14 controller).**
Projede global Türkçe `errorMap` **yok** (kapsam: BE `src`, `errorMap|setErrorMap|zod-i18n` → 0 sonuç).
`client.ts:26-34` backend'in `fieldErrors`'ından ilk mesajı `error.message`'a taşıyıp ekrana basıyor — dosyanın kendi
yorumu *"(zaten Türkçe)"* diyor, **bu varsayım yanlış**: mesajsız kısıtlarda Zod *"String must contain at most 1000
character(s)"* üretir (ör. `userController.ts:332,342`, `agreementController.ts:30`). **Tek mimari düzeltme
(global errorMap) ~75 kısıtı birden kapatır.**

✅ **Temiz çıkanlar (kapsam beyanlı):** OCEAN boyut adları ekranda **0** · gün adları tam Türkçe sözlükle ·
`MeetingFormat`/`MeetingStatus`/sertifika konu slug'ları/sertifika durumu için **5 tam kapsayan sözlük** ·
onboarding tercih enum'ları tamamı Türkçe · 12 e-posta şablonunun gövdesi Türkçe (istisna ④).
⚠️ 3 İngilizce metin **ölü yolda** (FE v2'nin çağırmadığı uçlar: `analyticsEngine.ts:67`,
`temperamentController.ts:18,22`) → bulgu sayılmadı, **❓ TEYİT GEREK** (başka istemci çağırıyorsa gerçek bulgu).

### 6.2 B.2 — TERİM SÖZLÜĞÜ

**Birim: "kavram"** (9 incelendi) ve **"varyant"** (kullanıcıya görünen farklı sözcük).
**6 kavramın birden fazla görünür varyantı var · 2'si CİDDİ · 3'ü kozmetik-orta · 3'ü yanlış alarm.**

| Kavram | Varyantlar (görünür) | Baskın | Değerlendirme |
|---|---|---|---|
| **mentör rolü** | `mentör` ~130 / `mentor` ~40 | mentör (~%77) | 🔴 **CİDDİ** — aşağıda |
| **görüşme olayı** | `görüşme` 110 / `toplantı` 17 / `randevu` 9 / `buluşma` 5 | görüşme (%76) | 🔴 **CİDDİ** — aşağıda |
| kurum | `kurum` 112 / `dernek` 10 / `vakıf` 3 / `STK` 6 | kurum | 🟡 Pazarlamada "dernek/vakıf" bilinçli hedef dili; tek karışık yer `admin/learning-journey/page.tsx:357` |
| uyum skoru adı | `Uyum Skoru` / `Eşleşme Skoru` / `Puan` | Uyum Skoru | 🟡 `admin/eslesmeler:116` "Puan" + `:118` "Karakter" — yönetici hangisinin uyum skoru olduğunu ayırt edemez |
| mizaç | `mizaç` 18 / `kişilik` 4 / `karakter` 25 / `DISC` 100+ | mizaç (onboarding) | 🟡 ⚠️ `admin/algorithm-tuner:134` *"kişilik uyumu"* diyor; ürün `EngineSection:80` ve `metodoloji:125`'te *"DISC … kişilik tanısı değildir"* diyor → **kendi feragatiyle çelişiyor** |
| menti · onay · davet | `mentee`/`çağrı` yalnız kod kimliği, kullanıcıya görünen **0**; `doğrulama`/`kabul` ayrı kavramlar | — | 🟢 Yanlış alarm — tutarlı |

**🔴 Aynı ekranda iki yazım — 5 ekranda doğrulandı:**
mentör paneli (*"Mentor Paneli"* `:156` ⟷ *"Mentörlük Saati"* `:45` ⟷ *"Mentör Sertifikası"* `:181`) ·
menti paneli (*"Mentörlük Anlaşmanız"* `:173` ⟷ *"Önerilen Mentorlar"* `:251`) · görüşmelerim (`:36` ⟷ `:198`) ·
anlaşma detayı (`:90,98`) · **en ciddisi davet şablonu** — `admin/invite/page.tsx:57` **tek cümlede**:
*"sizi **mentörlük** programına **mentor** olarak davet etti"* → bu metin yöneticinin **kopyalayıp kurum dışına
gönderdiği** şablon.

**🔴 Randevu ↔ toplantı ↔ görüşme:** aynı `Meeting` kaydı menti ekranında *"Randevu Al / Randevu Talebi"*,
mentör ekranında *"Toplantı Talepleri"*, e-postada *"Yeni Toplantı Talebi"*, menüde *"Görüşmelerim"* —
`meetings/page.tsx:154` tek cümlede ikisi birden (*"Tüm randevularınız ve geçmiş görüşmeleriniz"*).
Destek talebi üretme riski yüksek.

### 6.3 B.3 — ⭐ KİŞİ ADI YASAĞI → **İHLAL YOK**

**Kapsam:** 4 kök dizin (FE `src` · BE `src` · `prisma` [migrations + 3 seed + senaryo bankası] · `scripts`) ×
**2 desen** (~75 Türkçe+İngilizce ad tohumu, harf duyarsız, kelime sınırlı + `'Ad Soyad'` tırnaklı kalıp).
**Ham 41 isabet → alt-dize gürültüsü elendikten sonra 12 gerçek ad geçişi → 12'sinin 12'si kurgusal/temsilî (%100).**

- Landing demo personaları (`AdminCockpit.tsx:92-93`, `AlgorithmBento.tsx:107,120`) — `Ad X.` anonim formunda
- `buildMockPersonas()` (`selfServeController.ts:166`) — fonksiyon adı zaten "Mock"
- Öğrenme yolculuğu senaryo kişileri (`learningJourney.service.ts:65-77`)
- Form placeholder'ları ("Ad Soyad")
- Seed/script: `TechHub Mentoring Yöneticisi`, `TEST Mentör Bir` — tamamen sentetik; `senaryo-bankasi-tam.md`
  363 satırda **0 özel ad**

**⚠️ PO'nun bakması gereken bitişik konu (kişi adı DEĞİL):** `ProfileStep.tsx:296` form placeholder'ı
**iki gerçek üçüncü-taraf kurum adını** örnek veriyor — marka/izin açısından PO teyit etmeli.

⚠️ **Not:** sertifika belgelerindeki `{sert_1}`…`{sert_6}` değişkenleri bir **isim dağılım tablosuna** bağlı
(`sertifika-oturum1-...:278-302`, 6 temsilî ad × 22 senaryo). Bunlar kurgusal — ama **renderer'ı yok**
(kapsam: iki repo `src`+`prisma`, `sert_` harf duyarlı ve duyarsız → **0 sonuç**) → P-99 taşımasında karar gerekir.

### 6.4 B.4 — HATA ve BOŞ-DURUM MESAJLARI

**Birim:** 5 ayrı sayım birimi (FE hata-state literali 41 · `AlertMessage` 10 · FE boş-durum JSX 33 ·
BE `message:` 184 benzersiz · merkezî sözlük 18) → **≈286 mesaj metni tarandı** (çakışmalı toplam).

| Bulgu | Kanıt | Değerlendirme |
|---|---|---|
| **Suçlayıcı ton — 5 metin** | `types/admin.ts:167-173` — *"Uzmanlık etiketleriniz **çok geneldir**. Daha spesifik **belirtiniz**."* · *"Biyografi bölümünüz **yetersiz**…"* | Yargılayıcı + emir kipi. Render yolu doğrulandı: `CorrectionNoteDialog.tsx:55` → `adminController.ts:683-726` → **e-posta ile kullanıcıya** |
| **Ürünün geri kalanı temiz** | `TenantCorrectionBanner.tsx:10` bilinçli ton kuralı yazılı; `certification/page.tsx:151` *"Şimdilik bir mola verelim… acele yok."* | ≈286 metinde "yanlış yaptınız/geçersizsiniz" kalıbı **0** |
| **⭐ YANLIŞ SEBEP — kullanıcıya hatalı bilgi** | BE 4 `failReason` döndürüyor (`certification.service.ts:150,179,216`: `COOLDOWN_ACTIVE`·`NO_ACTIVE_TOPICS`·`RED_LINE_FAILED`·`BELOW_THRESHOLD`) ↔ FE tipi yalnız `'BELOW_THRESHOLD'` tanıyor (`types/certification.ts:64`) ve ekran `failReason`'ı **hiç okumuyor** (kapsam: `frontend/src` tüm `.tsx` → tek isabet bir test dosyası) | **Kriz konusundan elenen mentör, %80 üstü puan almış olsa bile *"Sertifika için en az %80 gerekli"* görüyor** (`mentor/certification/page.tsx:205-209`) |
| **Düzeltme notu ekranda yok** | `adminController.ts:703-706` notu `rejectionReason`'a yazıyor; PENDING 403 yanıtı bunu **döndürmüyor** (`authController.ts:323-327`), `/pending-approval` göstermiyor | Kullanıcı uygulama içinde neyi düzelteceğini öğrenemiyor — yalnız e-posta (mail kapalıysa hiç) |
| **20 içeriksiz jenerik fallback** | `useMutation.ts:45` *"İşlem başarısız."* (tüm mutation'ların ortak fallback'i) + 19 nokta; **5'inde BE hatası tamamen yutuluyor** (`bildir/page.tsx:31`, `admin/certification/page.tsx:64` `res.error` okunmuyor) | "Bir hata oluştu" birebir kalıbı 5 noktada |
| **İç detay sızması — 500 yolu TEMİZ** | `errorHandler.ts:24` yalnız *"Beklenmedik bir sunucu hatası oluştu."* | ✅ stack/DB/dosya yolu gitmiyor |
| **Teknik alan adı sızıyor** | `authController.ts:607` *"tenantSlug zorunlu"* | İngilizce kod tanımlayıcısı kullanıcıya |
| **Tutarsızlık** | *"bulunamadı"* ↔ *"yok"* (4 ekran) · *"Henüz mesajınız yok"* ↔ *"Henüz mesaj yok"* · `menti/page.tsx:278,280` **tek blokta ikisi birden** | Kozmetik ama yaygın |
| ✅ **İyi örnekler** | `messages/page.tsx:57-61` role göre dallanan boş-durum · `disc-test/page.tsx:158-161` sebep + eylem birlikte | Doğru desen ürün içinde mevcut |

---

## 7 · ⭐ HAZIR KUYRUK SATIRLARI

⚠️ Numara VERİLMEDİ (`C-??`). Kapı: varsayılan 🟢 · migration/seed · auth/KVKK/matching · geri dönülmez → 🟡 ·
ürün/hukuk kararı → 🔴 + kart. **"Bitti demek" kullanıcı gözünden yazıldı.**

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not (kanıt) |
|---|---|---|---|---|---|---|
| C-?? | Ş0 | **Mentör panelindeki 4 İngilizce DISC etiketi Türkçeleşsin.** 2026-09-09 kullanıcı testi bulgusunun doğrudan kaynağı. | 🟢 | Mentör, filtre ekranında İngilizce yerine Türkçe DISC adı görüyor | BEKLIYOR | `mentor/page.tsx:27-30`, render `:403,412`. ⚠️ Kalıcı çözüm için **5 DISC sözlüğü tek kaynağa** indirilmeli (`DiscBadge:13-16` · `profile:30-33` · `types/discTest:134-140` · `mentor/page:27-30` · BE `analyticsEngine:67-70`) — aksi halde 6. sözlük doğar. Efor S |
| C-?? | Ş0 | **Davet şablonunda tek cümlede iki yazım.** Yöneticinin kopyalayıp kurum DIŞINA gönderdiği metin. | 🟢 | Davet metninde tek ve tutarlı "mentör" yazımı | BEKLIYOR | `admin/invite/page.tsx:57` (ve `:79`) *"sizi mentörlük programına **mentor** olarak davet etti"* — birebir teyitli. 4 ekranda daha aynı-ekran çakışması var (`mentor/page:45,156,181` · `menti/page:173,251` · `meetings/page:36,198` · `agreement/[id]:90,98`). Efor S |
| C-?? | Ş0 | **12 ham-enum render noktası mevcut sözlüklerden geçsin** (rol · etiket durumu · format · sertifika durumu · log seviyesi · "Journey" başlığı). | 🟢 | Yönetici/platform ekranlarında `MENTOR`, `IN_PERSON`, `COOLDOWN` gibi ham değer yerine Türkçe karşılık | BEKLIYOR | Liste §6.1②. ⚠️ `MembersTable:92` için sözlük **zaten var** (`sertifika-sonuclari:37-41`), yalnız kullanılmıyor. Efor S-M |
| C-?? | Ş0 | **Sertifika sonuç ekranı yanlış sebep gösteriyor.** FE tipi BE'nin 4 sebebinden yalnız 1'ini tanıyor. | 🟢 | Kriz/kritik konudan elenen mentör gerçek sebebi görüyor (uydurma "%80" mesajı değil) | BEKLIYOR | BE `certification.service.ts:150,179,216` ↔ FE `types/certification.ts:64` ↔ ekran `mentor/certification/page.tsx:205-209`. **I-03 ile aynı ekran → SIRALI.** Efor S |
| C-?? | Ş0 | **Backend'e global Zod Türkçe `errorMap`.** ~75 mesajsız kısıt bugün İngilizce varsayılan basıyor. | 🟢 | Form hatalarında *"String must contain at most 1000 character(s)"* yerine Türkçe mesaj | BEKLIYOR | Kapsam: BE `src`, `errorMap\|setErrorMap\|zod-i18n` → **0 sonuç**. FE sızma yolu `client.ts:26-34` (yorumu *"zaten Türkçe"* diyor — yanlış varsayım). Tek hamle ~75 kısıtı kapatır. Efor M |
| C-?? | Ş0 | **Giriş hatası hesap varlığını sızdırıyor.** | 🟡 auth | Kayıtlı/kayıtsız e-posta için aynı yanıt | BEKLIYOR | `_LoginContent.tsx:14` *"Bu e-posta başka bir yöntemle kayıtlı."* ↔ projenin kendi kuralı `registerMessages.ts:8-11`. 🟡: auth dosyası. Efor S |
| C-?? | Ş0 | **20 jenerik fallback'in 5'inde backend hatası tamamen yutuluyor.** | 🟢 | Kullanıcı "İşlem başarısız" yerine gerçek sebebi görüyor | BEKLIYOR | `bildir/page.tsx:31` · `admin/certification/page.tsx:64` (`res.error` okunmuyor) · `useMutation.ts:45` ortak fallback. Tam liste §6.4. Efor S |
| C-?? | Ş0 | **PENDING kullanıcıya düzeltme notu uygulama içinde gösterilsin.** | 🟡 auth | Onay bekleyen kullanıcı neyi düzelteceğini ekranda okuyor | BEKLIYOR | Not yazılıyor (`adminController.ts:703-706`) ama PENDING 403 yanıtı döndürmüyor (`authController.ts:323-327`), `/pending-approval` göstermiyor. Mail kapalıyken tek kanal kapanıyor. Efor S |
| C-?? | Ş0 | **Düzeltme şablonlarının suçlayıcı tonu.** 5 metin emir kipinde, e-postayla kullanıcıya gidiyor. | 🟢 | Kullanıcı azarlanmadan ne yapacağını okuyor | BEKLIYOR | `types/admin.ts:167-173`. Ürünün kendi ton kuralı zaten yazılı (`TenantCorrectionBanner.tsx:10`). Efor S |
| C-?? | Ş1 | **madde 139'un eksik yarısı: 4 menti "şimdilik" varyantı yazılsın.** | 🟢 | (ön koşul işi — kullanıcı etkisi I-15 ile görünür) | BEKLIYOR | ⚠️ **I-15'in ön koşulu, kuyrukta ayrı satırı yok.** Belge `arketip-...md:269` menti sürümü için talimat bırakmış, metin yok → I-15 bugün yapılsa **menti tarafı boş kalır**. Efor S (yazım) |
| C-?? | Ş0 | **Terim birleştirme: randevu ↔ toplantı ↔ görüşme.** | 🟢 | Menti "randevu" gönderip mentör "toplantı" alması bitiyor; tek terim | BEKLIYOR | 4 FE ekranı + 3 e-posta şablonu (`book-meeting:102,209` · `mentor/page:251,261` · `emailService:74,170` · `meetings/page:154` tek cümlede ikisi). Terim seçimi teknik karar (CLAUDE.md "isimlendirme → sen karar ver"). Efor M |
| C-?? | Ş0 | **İçerik belgeleri hijyeni:** `bolumler/` 5 belge indekse, 3 zayıf etiket (📸 var "DONDURULMUŞ" yok), bayat `backend/` yolları, faz6'nın aşıldığı notu. | 🟢 | (belge işi — kullanıcı etkisi yok, sonraki turlar doğru belgeyi okur) | BEKLIYOR | `00-INDEKS.md:35,52` · 3 oturum belgesi `:3` · `bolumler/*.md:2,7`. Silme yok, `⚠️ GÜNCELLEME` deseni. Efor S |
| C-?? | Ş1 | **Menti tarafında kriz/kötü-muamele içeriği ve bildirim kanalı yok.** | 🔴 KARAR-31 | Menti, kendisi ya da mentörü kaynaklı bir sorunda ne yapacağını ekranda okuyor | BEKLIYOR | `menti/orientation-guide/page.tsx:17-63` 4 senaryo, hiçbiri kriz değil; `/bildir` kapsamı yalnız sahte kurum kaydı (`bildir/page.tsx:55`). **I-18/KARAR-31'in menti ayağı** — kuyrukta yok. Efor M |
| C-?? | Ş0 | **`M1`/`m1` ham arketip kodları yöneticiye çıplak görünüyor.** | 🔴 KARAR-?? (ad↔kod) | Yönetici eşleşme tablosunda kod yerine arketip adı görüyor | BEKLIYOR | `admin/eslesmeler/page.tsx:134,142`. Sözlük yazılabilmesi için **hangi ad hangi koda** kararı şart (§0③). Efor S (karar sonrası) |

---

## 8 · ⭐ HAZIR KARAR KARTLARI

> Numara VERİLMEDİ. Aynı ürün sorusunu paylaşan kalemler **tek kartta kümelendi** (CLAUDE.md kart kuralı).
> Mevcut KARAR-3/4/5/29/30/31 ile **örtüşmez** — onlara ek bağlam §4.2 ve §2.2'de.

### KARAR-?? · Arketip adları: hangi metin hangi koda bağlanacak? (4 işi açar) [ÜRÜN KARARI]

**Şu an ne var:** Kullanıcı bugün mizaç testini bitirince "Sen bir **Öncü**sün!" gibi bir kart görüyor
(4 ad: Öncü · Ateşleyici · Yapı Taşı · Kâşif). Kanıt: `onboardingController.ts:53-104`, ekran `ResultStep.tsx:39-43`.
Ayrıca yazılmış ama hiç gösterilmeyen **8 yeni arketip kartı** var (Mimar · Ayna · Liman · Pusula / Rotacı · Kâşif ·
Denge Arayan · İz Açan) — `arketip-ve-yaklasim-icerigi-2026-09-03.md:153-261`.

**Sorun ne:** Üç ayrı yerde "**Kâşif**" var ve üçü farklı kişiyi anlatıyor: canlıdaki DISC kartında bir mizaç tipi
(`onboardingController.ts:94`), eski karar belgesinde bir **mentör** tipi (`03-psikometri-ve-algoritma.md:14`),
yeni içerikte bir **menti** tipi (`arketip-...md:53`). Üstelik yeni 8 adın hiçbirinin, sistemin içindeki kod
değerine (M1…m4 gibi teknik etiketler) karşılığı **hiçbir belgede yazılı değil**. Buna karar verilmeden yeni
kartlar bağlanamaz; bağlanırsa kullanıcı aynı adı iki ekranda iki farklı anlamda görür. Ayrıca yeni adlardan
**"İz Açan" senin onayını almamış** (belge `:263` bunu kendisi not etmiş).

**Neden sana soruyorum:** Kullanıcının kendisi hakkında okuduğu **kimlik etiketi**. Teknik değil; hangi adın
kalacağı, hangisinin emekli olacağı ürün kararı ve geri dönmesi zor (kullanıcı ekran görüntüsü paylaşıyor —
`onboardingController.ts:68` `shareHeadline`).

**Seçenekler:**
**A) Yeni 8 ad kazanır, canlıdaki 4 DISC adı emekli olur** · Kullanıcı: yeni kartları görür, eski adlar kaybolur ·
Kazanç: tek sistem, çakışma biter · Kayıp: bugün test çözmüş kullanıcıların bildiği ad değişir; "Kâşif" anlam
değiştirir (mizaç tipi → menti arketipi) · Süre: M · Geri alınır: evet (metin) · Migration: yok
**B) İkisi yan yana yaşar — farklı şeyler oldukları açıkça yazılır** · Kullanıcı: hem mizaç kartını hem arketip
kartını görür · Kazanç: hiçbir içerik çöpe gitmez · Kayıp: iki kavramı ayırt etmek kullanıcıya iş yükü;
"Kâşif" çakışması **sürer** (ad değişmezse kafa karışıklığı kalıcı) · Süre: M · Geri alınır: evet · Migration: yok
**C) Yeni 8 ad kazanır ama çakışan adlar yeniden adlandırılır** ("Kâşif" ve onaysız "İz Açan" değişir) ·
Kullanıcı: çakışmasız tek sistem · Kazanç: hem çakışma hem onay sorunu biter · Kayıp: 2 ad yeniden yazılır,
8 kartın ilgili cümleleri elden geçer (belgeye göre "İz Açan" 6 yerde geçiyor) · Süre: M+ · Geri alınır: evet

**Karşılaştırma:** Eski 4 adın kullanıcı zihninde yer ettiğini düşünüyorsan B; tek ve temiz bir sistem istiyorsan
A; A'yı istiyorsun ama "Kâşif"in iki anlamı seni rahatsız ediyorsa C. A ve C arasındaki tek fark iki adın yeniden
yazılması.
**Benim önerim:** C — çakışma kalıcı kafa karışıklığı üretir ve "İz Açan" zaten onayını bekliyor; ikisini tek
turda kapatmak ucuz.
**Cevap vermezsen:** I-01 (yaklaşım metinleri), I-15 (arketip kartı), C-?? (ham `M1` kodları) ve madde 139'un
menti varyantları **bağlanamaz** — dördü de bu eşlemeye bağlı.
**CEVAP:**

---

### KARAR-?? · Sertifika içeriğinin hangi sürümü canlıya gidecek? (P-99'u açar) [ÜRÜN KARARI · SEED]

**Şu an ne var:** Aynı sertifika sahnesi **üç farklı metinle** üç yerde duruyor: 2026-09-03 tarihli faz6 belgesi ·
2026-09-08 tarihli oturum belgeleri · **kodda bambaşka bir üçüncü sahne** (`seed-certification.ts:216-217`).
Hangisinin canlıya gideceği hiçbir belgede yazmıyor; faz6 hâlâ "dondurulmuş" etiketli.

**Sorun ne:** Kuyruk (P-99) işi "22 senaryoyu seed'e taşı" diye tarif ediyor; gerçekte **22'nin 17'sinin seed'de
karşılığı yok, seed'deki 20'nin 15'i belgelerde gerekçeli elenmiş** ve ortak olan 5 senaryonun **5'i de yeniden
yazılmış** — birinde puanlamanın anlamı ters dönmüş. Ayrıca taşımadan önce üç teknik soru cevapsız: konu
kodlarının değişmesi kurumların "kapattığım konu" kaydını öksüz bırakır, geçme eşiği 10 konuda 8 iken 11 konuda
**9'a çıkar** (sertifika zorlaşır), ve belgelerdeki 17 "iç not" konu düzeyinde yazılmış ama alan **şık**
düzeyinde (`schema.prisma:1158`).

**Neden sana soruyorum:** Hangi içeriğin mentörlere sınav olarak çıkacağı ve sertifikanın **zorlaşması** ürün
kararı; ayrıca canlı veriye yazma (seed) senin iki değişmez kuralından biri.

**Seçenekler:**
**A) 2026-09-08 serisi kazanır — tam taşıma** · Kullanıcı: 11 konu / 22 senaryo ile sınava girer, sertifika
zorlaşır (8→9 konu) · Kazanç: en olgun içerik canlıya çıkar, elenen 15 sahnenin gerekçesi zaten yazılı ·
Kayıp: 88 şıkkın tamamı yeniden yazılacak (efor L), konu kodları değişince eski kayıtlar öksüz kalır ·
Süre: L · Geri alınır: evet (yedek + pasifleştirme) · Migration: yok (iç not şık düzeyinde kalırsa)
**B) Önce yalnız 4 kritik (red-line) konu taşınır, gerisi sonra** · Kullanıcı: kriz/sınır/gizlilik/geri bildirim
konularında yeni metni görür, kalan 7 konu eski metinde kalır · Kazanç: en riskli içerik önce düzelir, efor M ·
Kayıp: bir süre **karışık sürüm** yayında olur (bazı konular yeni, bazıları eski); geçme eşiği iki kez değişir ·
Süre: M · Geri alınır: evet · Migration: yok
**C) Hiç taşıma — bugünkü 20/80 kalır** · Kullanıcı: bugünkü sınavı görmeye devam eder · Kazanç: sıfır risk,
sıfır iş · Kayıp: üç haftadır yazılı duran içerik rafta kalır; **puanlama anlamı ters olan senaryo canlıda
kalmaya devam eder** · Süre: — · Geri alınır: —

**Karşılaştırma:** Sertifikanın zorlaşmasını şimdi göze alabiliyorsan A tek turda biter. Kriz içeriğinin doğru
olması acilse ama toplu değişimi istemiyorsan B; ama karışık sürüm yönetmek gerekir. C'nin tek savunması zaman.
**Benim önerim:** A — ama **KARAR-3 ve KARAR-4 cevaplanmadan başlanamaz** (kriz senaryolarının 8 şıkkı onlara
bağlı) ve iş ikiye bölünmeli: "içerik taşıma PR'ı" ve "seed çalıştırma turu".
**Cevap vermezsen:** P-99 ve K-16 açık kalır; sertifika ekranı bugünkü hâliyle kalır.
**CEVAP:**

---

### KARAR-?? · Hukuki metin paketi — avukata tek seferde ne sorulacak? (5 kalem) [HUKUKİ · PO+AVUKAT]

**Şu an ne var:** Ürünün üç hukuki sayfası (KVKK aydınlatma · gizlilik · kullanım koşulları) **kendi içinde
"bu metin taslaktır" diyor** (`kvkk/page.tsx:109` · `gizlilik/page.tsx:85` · `terms/page.tsx:73`), ama kayıt
ekranı kullanıcıya bu metinler için **zorunlu açık rıza** aldırıyor (`_RegisterContent.tsx:398-418`).

**Sorun ne:** Beş ayrı yerde, kodun gerçekten yaptığından **daha fazlasını vaat eden** ya da eksik kalan metin var:
① davet kartı *"Bilgileriniz KVKK uyumlu … ve güvendedir"* (`InvitationCard.tsx:142`) ve footer *"KVKK uyumlu"*
damgası (`page.tsx:65`) — metinler taslakken koşulsuz uyum beyanı · ② geri bildirim ekranı *"kimliğin
paylaşılmaz"* diyor (`MeetingFeedbackCard.tsx:173`) ama yönetici geri bildirimleri **ad-soyadla** listeliyor
(`feedbackLogController.ts:134-135`) · ③ "Sertifikalı Mentör" rozeti hiçbir yerde "bu mesleki bir yeterlilik
değildir" demiyor (kapsam: `frontend/src/app/**`, 6 terim TR+EN → **0 çekince**) · ④ landing *"Sonsuza kadar
ücretsiz"* diyor (`HeroSection.tsx:34,51`), koşullarda karşılığı yok · ⑤ 18 yaş beyanı ayrı kutu değil, KVKK
rızasının metnine gömülü (`_RegisterContent.tsx:162`) ve **yaş verisi hiç saklanmıyor** → beyanın ispatı yok
(`consentService.ts:59`).

**Neden sana soruyorum:** Hepsi hukuki sonucu olan metin. Ben avukat değilim; aşağıdaki hiçbir şey hukuki görüş
değildir ve **metin önerisi yazılmadı**.

**Seçenekler:**
**A) Beşini tek pakette avukata sor, cevap gelene kadar dokunma** · Kullanıcı: bugünkü metinleri görmeye devam
eder · Kazanç: tek seferde doğru metin, dağınık düzeltme olmaz · Kayıp: süresiz bekleme; "güvendedir" ve
"kimliğin paylaşılmaz" gibi **kodla çelişen** cümleler yayında kalır · Süre: ? · Geri alınır: —
**B) Kodla ÇELİŞENLERİ hemen düzelt (② ve ①), geri kalanı avukata bırak** · Kullanıcı: doğru kapsamı okur ·
Kazanç: yanlış beyan bugün kalkar, hukuki yorum gerektirenler beklemede kalır · Kayıp: iki kez metin turu olur ·
Süre: S + bekleme · Geri alınır: evet
**C) Beşini de şimdi yumuşat, avukat gelince rafine et** · Kullanıcı: daha temkinli metinler görür ·
Kazanç: risk bugün düşer · Kayıp: pazarlama gücü azalır ("sonsuza kadar ücretsiz" ve "KVKK uyumlu" satış
cümleleri); avukat gelince üçüncü kez yazılır · Süre: M · Geri alınır: evet

**Karşılaştırma:** ② ve ① kodun yaptığıyla doğrudan çelişiyor — bunlar hukuki yorum değil **olgu düzeltmesi**,
avukat beklemeye gerek yok. ③④⑤ gerçekten hukuki yorum istiyor. B bu ayrımı yapan tek seçenek.
**Benim önerim:** B — ama bu senin ürün/hukuk kararın, önerime güvenme.
**Cevap vermezsen:** 13 hukuki bulgunun hiçbiri hareket etmez; ②'deki çelişki (kimlik paylaşılmaz ↔ yönetici
ad-soyad görüyor) yayında kalır.
**CEVAP:**

---

### KARAR-?? · Test sonucu ve eşleşme skoru kullanıcıya nasıl anlatılsın? (3 ekran) [ÜRÜN KARARI]

**Şu an ne var:** Mizaç testi bitince ekran *"Sen bir Öncüsün!"* diyor, konfeti atıyor, *"En İyi Eş: S + C"*
yazıyor ve *"…en uygun … kişiyle **eşleştirileceksin**"* diye söz veriyor (`ResultStep.tsx:39-43,71,98-100`).
Eşleşme kartında *"%87 uyum"* gibi bir sayı var (`menti/page.tsx:311`), gerekçe üretilemezse yerine
*"Genel profil uyumu"* basılıyor (`matchingController.ts:15`).

**Sorun ne:** Ürünün kendi metodoloji sayfası *"kesin bir başarı garantisi değil"*, *"DISC kişilik tanısı
değildir"* diyor — ama kullanıcının **gerçekten okuduğu** ekranlar (sonuç kartı, eşleşme kartı) bu temkinli dili
taşımıyor: kimlik etiketi ("Sen bir X'sin"), üstünlük ("En İyi Eş"), kesin vaat ("eşleştirileceksin") ve
açıklamasız bir yüzde. Üstelik sonuç kartında **paylaş düğmesi** var, yani bu dil ürünün dışına taşınıyor.
Ayrıca havuz boşsa aynı kullanıcı birkaç ekran sonra *"uygun mentor bulunamadı"* görüyor — vaat tutulmuyor.

**Neden sana soruyorum:** Kullanıcının kendisi hakkında ne öğrendiği ve üründen ne beklediği; ölçü değil **vaat**
meselesi. Teknik değil.

**Seçenekler:**
**A) Koşullu dile geç** ("şu an şu eğilimi gösteriyorsun", "genelde iyi anlaşılan", "eşleştirmeye çalışacağız",
yüzde yerine bant) · Kullanıcı: daha dürüst, daha az kesin bir kart görür · Kazanç: metodoloji sayfasıyla tutarlı
olur, vaat tutulmadığında hayal kırıklığı azalır · Kayıp: "aha anı" zayıflar, paylaşılabilirlik düşer ·
Süre: S · Migration: yok
**B) Bugünkü dil kalsın, yanına küçük bir çekince satırı eklensin** · Kullanıcı: aynı heyecanı yaşar, altında bir
açıklama görür · Kazanç: etki korunur, dürüstlük eklenir · Kayıp: çekinceyi kimse okumaz; çelişki görünür kalır ·
Süre: S · Migration: yok
**C) Hiçbir şey değişmesin** · Kullanıcı: bugünkü kartı görür · Kazanç: sıfır iş, en güçlü ilk izlenim ·
Kayıp: ürün iki dille konuşur (metodoloji temkinli, kart iddialı); yüzde açıklanmadığı için "neden bu mentör"
sorusu cevapsız kalır · Süre: — · Geri alınır: —

**Karşılaştırma:** İlk izlenimin çarpıcılığı büyüme için kritikse B; ürünün tek sesle konuşması senin için
önemliyse A. C yalnızca bu çelişkiyi bilinçli kabul ediyorsan savunulabilir.
**Benim önerim:** A — yüzde ve "eşleştirileceksin" ürünün **tutamadığı** iki vaat; kalan kısım zaten güçlü.
**Cevap vermezsen:** C1-1…C1-6 (6 metin) olduğu gibi kalır; eşleşme kartındaki boş gerekçe de sürer.
**CEVAP:**

---

## 9 · BELGE ↔ KOD ÇELİŞKİLERİ (işaretlendi, çözülmedi — KOD KAZANIR)

| # | Belge ne diyor | Kod ne diyor | Kanıt |
|---|---|---|---|
| 9.1 | `CLAUDE.md` *"registerMessages.ts … dosya HENÜZ kodda YOK: grep boş"* | Dosya **VAR** ve 3 dosyadan kullanılıyor | `frontend/src/lib/registerMessages.ts` · BE'de `REGISTER_MESSAGES` (`authController.ts:125`) |
| 9.2 | *(bu turun kendi sayım düzeltmesi)* İlk hızlı sayımım `audience` grep'iyle **8+7** aşama verdi | Gerçek **7+6** — fazlalık iki sorgu `where` bloğundan (`:526,529`) | Birim "veri nesnesi" diye tanımlandı (§1). Alt-ajanın 7+6 sayımı doğruydu |
| 9.3 | Sertifika belgeleri *"kod hâlâ `=== 3` istiyor, `>= 2` kod turu BEKLİYOR"* | Kod turu **YAPILMIŞ**: `return competencyScore >= 2` | `sertifika-oturum1-...:6,403-406` ↔ `certification.service.ts:72` → belge bayat |
| 9.4 | `senaryo-bankasi-tam.md:12` *"red-line: SADECE 3 geçer"* | Kod red-line ayrımı yapmıyor (`isRedLine` parametresi gövdede okunmuyor) | `certification.service.ts:72-73` → belge iki kuşak geride |
| 9.5 | Belgeler kriz doğru cevabında **kuruma bildirim** şart koşuyor | Koddaki kriz şıklarında bildirim **yok** | `sertifika-oturum1-...:187,218` ↔ `seed-certification.ts:238-259` |
| 9.6 | `senaryo-bankasi-tam.md:3` *"TAM TASLAK — kullanıcı onayı bekliyor"* | İçeriği zaten canlı seed'in kaynağı | `seed-certification.ts:7` |
| 9.7 | `00-INDEKS.md:52` ve `bolumler/*.md` `backend/prisma/...` yolunu kullanıyor | Bu çalışma alanında `menti-mentor-v2/backend` **boş** (submodule); gerçek yol `menti-mentor/prisma/...` | Yol bayat, içerik doğru |
| 9.8 | `client.ts:22` yorumu Zod mesajları için *"(zaten Türkçe)"* | ~75 mesajsız kısıt İngilizce varsayılan üretiyor | `client.ts:26-34` + BE `errorMap` → 0 sonuç |
| 9.9 | `EngineSection:80` / `metodoloji:125` *"DISC kişilik tanısı değildir"* | `admin/algorithm-tuner:134` aynı şeye *"kişilik uyumu"* diyor | Ürün kendi feragatiyle çelişiyor |

---

## 10 · PO'NUN ELLE YAPACAKLARI

> Bu tur `03-PO-ELLE-ISLER.md`'ye **yazmadı** (salt-okuma). Aşağıdakiler oraya aday satırlardır.

1. **KARAR-3 ve KARAR-4'ü cevapla** — ikisi birlikte sertifika seed'ini (K-16 + P-99) kilitliyor. Bu turun eklediği
   bağlam: bildirim metni **kodda yok**, yalnız belgede → karar canlıdaki bir metni değil, taşınacak metni etkiliyor.
2. **KARAR-4 için somut kaynak adı** — belge bunu "ÇIKIŞ BLOKERİ" ilan etmiş ve *"kapanmış bir hat adı kriz anında
   işe yaramaz bilgidir"* diye uyarmış; adın **güncelliğini PO doğrulamalı** (ajan doğrulayamaz).
3. **Avukat paketine tek soru olarak gitsin:** kriz bildirim yükümlülüğü + 18 yaş/veli onayı + yaş verisi saklama
   (§4.2 H-08…H-11). Belge bunların **tek soru** olduğunu zaten söylüyor (`sertifika-oturum1-...:350-354`).
4. **`ProfileStep.tsx:296`** — form placeholder'ında **iki gerçek üçüncü-taraf kurum adı** örnek veriliyor;
   marka/izin açısından teyit gerekiyor (kişi adı yasağı kapsamında değil).
5. **Canlı DB teyitleri:** `Question`/`CertificationQuestion`/`LearningStage` gerçekten dolu mu; `internalNote`
   kaç kayıtta dolu; öğrenme yolculuğunun kriz aşaması canlıda var mı. (Bu tur DB'ye bakmadı.)

---

## 11 · ✅ ZATEN İYİ (boş bırakılmaz)

1. **Kişi adı yasağına tam uyum** — 4 dizin × ~75 ad tohumu taraması sonrası **0 gerçek kişi adı**; demo
   personaları bile `Ad X.` anonim formunda.
2. **Hesap kapatma metni dürüst** — "silinir" demiyor, anonimleştirmeyi anlatıyor (`DataPrivacySection.tsx:199-206`)
   ve kod aynı şeyi söylüyor (`gdprService.ts:45-47`). H-01…H-11'in nasıl düzeltileceğinin **ürün içi örneği**.
3. **Metodoloji sayfası örnek bir dürüstlük metni** — *"kanıtlanmış bir kesinlik değil"*, kaynak etiketlerinde
   *"akademik kanıt değil"* (`metodoloji/page.tsx:126,147,194,238`).
4. **Ton kuralı yazılı ve çoğunlukla uygulanıyor** — `TenantCorrectionBanner.tsx:10` destekleyici dil kuralı;
   ≈286 mesajda "yanlış yaptınız" kalıbı **0**.
5. **500 yolu temiz** — stack/DB/dosya yolu kullanıcıya hiç gitmiyor (`errorHandler.ts:24`).
6. **`seed-learning-journey.ts` güvenli yazılmış** — yalnız `upsert`, `deleteMany` 0, doğrudan-çalıştırma muhafızı;
   13 aşamanın 42 şıkkında 0 TODO/boş alan.
7. **`seed-certification.ts` silmiyor, pasifleştiriyor** — `:307-310` `isActive:false`, yorumu da *"silme yok,
   veri korunur"* diyor.
8. **Üç sertifika oturum belgesi gerçekten farklı parçalar** — 11 konu ardışık, tekrar yok (önceki iddia doğrulandı).
9. **İndeks `senaryo-bankasi` ikilisini doğru ayırmış** (`00-INDEKS.md:52-55`) ve yazılmamış 3 belgeyi
   `⬜ HENÜZ YAZILMADI` diye **dürüstçe** işaretlemiş.
10. **madde 151 ve 138 metinleri gerçekten ekrana hazır** — 8/8 tam, yer tutucusuz, ton tutarlı; iş "yaz" değil "bağla".
11. **5 enum sözlüğü tam kapsıyor** (format · görüşme durumu · sertifika durumu · konu slug'ı · gün adları) —
    ham enum sızıntısı bu 5 alanda **yok**.
12. **DISC feragati ürünün en görünür yerinde var** (`EngineSection.tsx:80`) — eksik olan, aynı cümlenin
    testi çözen kullanıcıya tekrarlanması.

---

## 12 · TARANAMAYANLAR

1. **Canlı DB'ye bakılmadı** (salt-okuma tur, PO onayı yok) → `internalNote` dolu kayıt sayısı, seed'lerin
   çalıştırılıp çalıştırılmadığı, `COMPLETED` görüşme var mı — hepsi **❓ TEYİT GEREK**.
2. **88 şık karakter düzeyinde karşılaştırılmadı** — soy bağı olan 5 senaryoda örnekleme yapıldı; kalan 17'de
   karşılaştırılacak seed metni zaten yok.
3. **`faz6-ogrenme-ve-sertifika-2026-09-03.md` tam okunmadı** (15 sahnenin kaynağı) — oturum belgelerinin
   kaynak etiketleri esas alındı.
4. **3 İngilizce metnin ölü yolda olduğu iddiası** FE v2'nin uç listesine dayanıyor; **başka bir istemci varsa**
   (FE v1) gerçek bulgu olur → ❓ TEYİT GEREK.
5. **Psikometrik geçerlilik tartışılmadı** — bilinçli: psikometri konseyinin konusu. Bu tur yalnız metnin **vaadine**
   baktı.
6. **`/bildir` sayfasının tamamı okunmadı** (ilk ~60 satır) → aydınlatma bağlantısı iddiası ❓ TEYİT GEREK.

---

## 13 · KALEM LİSTESİ (KURAL 9)

**Birim:** bu turda çıkan benzersiz bulgu satırı. **Toplam 30 kalem.** Numara VERİLMEDİ, kuyruğa iş EKLENMEDİ.

| # | Kalem | Durum | Numara adayı mı |
|---|---|---|---|
| 1 | Sertifika farkı 2 senaryo değil **17**; seed'in 15 senaryosu elenmiş, ortak 5'in 5'i değişmiş | 🟡 YARIM | **evet** (P-99 Not'u düzeltilir) |
| 2 | Soy bağlı senaryolardan birinde **puan anlamı ters dönmüş** (Gizlilik B) | ⬜ AÇIK | evet |
| 3 | `internalNote` alanı şık düzeyinde, 17 iç not konu/varyant düzeyinde → yerleşim kararı yok | ⬜ AÇIK | evet |
| 4 | Seed şık **silmiyor** → şık anahtarı değişirse soru 4'ten fazla şıkla görünür | ⬜ AÇIK | evet |
| 5 | Konu slug'ı değişirse `certWrongTopics`/`disabledCertTopics` öksüz kalır; geçme eşiği 8→9 | ⬜ AÇIK | evet |
| 6 | madde 139 gerçekte **4/8** — menti varyantları yazılmamış | 🟡 YARIM | **evet** |
| 7 | madde 147'nin 5 aşamasında `{mentor_*}` yer tutucusu, kodda 0 karşılık | 🟡 YARIM | evet |
| 8 | madde 147 seed'de **zaten 6 farklı menti aşaması var** → üzerine yazma kararı | ⬜ AÇIK | evet |
| 9 | I-17 kuyrukta "seed işi" ama içerik **hiç yazılmamış** → önce yazım turu | 🟡 YARIM | **evet** (I-17 Not'u düzeltilir) |
| 10 | Arketip ad↔kod eşlemesi hiçbir yerde yazılı değil; "Kâşif" 3 anlamda; "İz Açan" onaysız | ⬜ AÇIK | **evet** (kart) |
| 11 | İçerik belgesindeki ağırlıklar (%45/%30/%25) kodla (0.6/0.4) çelişiyor | ❓ TEYİT GEREK | evet |
| 12 | `VisibilityOptIn` durum alanı zaten var → I-10/I-16'nın "şema engeli" yumuşayabilir | ❓ TEYİT GEREK | evet |
| 13 | Öğrenme yolculuğu: belge 8 mentör aşaması, seed 7 → 1 aşama ayrışmış | ❓ TEYİT GEREK | evet |
| 14 | Mentör panelinde 4 İngilizce DISC etiketi (2026-09-09 testinin kaynağı) | ⬜ AÇIK | **evet** |
| 15 | Aynı 4 DISC boyutu için **5 uyuşmayan sözlük** | ⬜ AÇIK | evet |
| 16 | 12 ham-enum render noktası (rol · durum · format · log · "Journey") | ⬜ AÇIK | evet |
| 17 | `M1`/`m1` ham arketip kodu yöneticiye çıplak görünüyor, sözlük yok | ⬜ AÇIK | evet |
| 18 | E-postada ham `MENTOR`/`MENTI` rol enum'u (2 şablon) | ⬜ AÇIK | evet |
| 19 | ~75 mesajsız Zod kısıtı → İngilizce varsayılan kullanıcıya sızıyor | ⬜ AÇIK | **evet** |
| 20 | Davet şablonunda **tek cümlede** "mentörlük … mentor"; 4 ekranda daha aynı-ekran çakışması | ⬜ AÇIK | **evet** |
| 21 | randevu ↔ toplantı ↔ görüşme: aynı olay 4 farklı adla | ⬜ AÇIK | evet |
| 22 | Sertifika sonucu `RED_LINE_FAILED`'i okumuyor → **kullanıcıya yanlış sebep** | ⬜ AÇIK | **evet** |
| 23 | PENDING düzeltme notu uygulama içinde hiç gösterilmiyor | ⬜ AÇIK | evet |
| 24 | 5 düzeltme şablonu suçlayıcı/emir kipinde | ⬜ AÇIK | evet |
| 25 | 20 jenerik fallback; 5'inde BE hatası tamamen yutuluyor | ⬜ AÇIK | evet |
| 26 | Enumeration sızıntısı (`PROVIDER_CATISMASI`) — projenin kendi kuralıyla çelişiyor | ⬜ AÇIK · HUKUKİ | evet |
| 27 | Onboarding sonuç kartı + eşleşme skoru: kesin kimlik/vaat dili (6 metin) | ⬜ AÇIK | **evet** (kart) |
| 28 | 13 yeni hukuki bulgu (taslak sayfalar + zorunlu rıza · "kimliğin paylaşılmaz" ↔ admin ad-soyad · sertifika çekincesi · "sonsuza kadar ücretsiz" · 18+ beyanı/yaş verisi …) | ⬜ AÇIK · HUKUKİ | **evet** (kart) |
| 29 | Menti tarafında kriz/kötü-muamele içeriği ve bildirim kanalı yok | ⬜ AÇIK | evet |
| 30 | Belge hijyeni: `bolumler/` 5 belge indekste yok · 3 zayıf etiket · bayat `backend/` yolları · faz6'nın aşıldığı yazmıyor | ⬜ AÇIK | evet |

**Belge senkronu:** bu tur 🟩 PLANLA (salt-okuma) — **belge güncellemesi gerekmedi: hiçbir kod/durum değişmedi.**
Bulgular `00-KUYRUK.md` ve `01-KARARLAR.md`'ye işlendiğinde bu belge güncellenmez (📸 dondurulmuş).
