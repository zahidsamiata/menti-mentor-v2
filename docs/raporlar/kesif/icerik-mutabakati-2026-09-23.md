# İçerik Belgeleri Mutabakatı — çelişkiler · tarafsız değerlendirme · dosya düzeni planı

> 📸 **DONDURULMUŞ — 2026-09-23 fotoğrafı.** Plan değildir; bulguları `00-KUYRUK.md`'ye işlendikten sonra güncellenmez.
>
> 🟩 **PLANLA** turu — salt-okuma. Kod, `docs/otonom/`, `docs/kararlar/`, `CLAUDE.md` DEĞİŞMEDİ. Hiçbir dosya taşınmadı/silinmedi/yeniden adlandırılmadı.
> Karar kartı numarası VERİLMEDİ (`KARAR-??`), kuyruk numarası VERİLMEDİ (`IC-??`).
>
> Yol kısaltmaları — `ARK` = `docs/raporlar/icerik/arketip-ve-yaklasim-icerigi-2026-09-03.md` · `MEN` = `…/menti-yolculugu-ve-eslesme-metinleri-2026-09-03.md` · `KOD` = `…/kod-kalemleri-2026-09-03.md` · `BANKA` = `…/senaryo-bankasi-2026-09-03.md` · `FAZ6` = `…/faz6-ogrenme-ve-sertifika-2026-09-03.md` · `O1/O2/O3` = `…/sertifika-oturum1-4-kritik-konu / oturum2-3-konu / oturum3-4-konu-2026-09-08.md` · `B01…B05` = `…/icerik/bolumler/0x-*.md` · `PSI` = `docs/kararlar/konu/03-psikometri-ve-algoritma.md` · `TAS` = `docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md` · `TAM` = backend `prisma/senaryo-bankasi-tam.md` · `BE` = backend repo (`zahidsamiata/menti-mentor`, HEAD `b0b3dcb`) · `FE` = çatı `frontend/`.
> ⚠️ Bu çalışma alanında çatı içindeki `backend/` submodule'ü **boş** (başlatılmamış); backend kanıtları ayrı klondan (`BE`) okundu.

---

## 0. ⭐ ÖNCE OKU — en kritik 3 çelişki

**① Arketip adları: tek değil DÖRT set var, "Kâşif" üç ayrı anlamda kullanılıyor, "canonical" etiketli belge en bayat olanı.**
`PSI:14-15` (🔄 "canonical", son güncelleme 2026-08-02) mentör için Mimar·**Kâşif**·Çoban·Komutan, menti için İnşaatçı·Gezgin·Tohum·Atılgan diyor. 2026-08-28'de `TAS:71-74` bu seti **PO kararıyla** ("Seçilen set: METAFOR (PO kararı)") mentörde Mimar·Ayna·Liman·Pusula, mentide Rotacı·**Kâşif**·Denge Arayan·İz Açan olarak değiştirdi. Gerekçe `docs/devir/08-oturum-tezi-2026-08-28.md:32`'de ("kişilik boyutu yüzdesi soğuk → kullanıcı metafor arketip görür"). `ARK:52-53` (2026-09-03) aynı yeni seti tekrarlıyor. Tohum iddiası "daha yeni ama kanonik olmayan belge sessizce değiştirdi" yarı yarıya **ÇÜRÜTÜLDÜ**: değişiklik sessiz değil ve bir PO kararı. Asıl sorun, `PSI`'nin hiç damgalanmamış olması.
Canlı kodda ise **üçüncü** bir set var: Öncü·Ateşleyici·Yapı Taşı·**Kâşif** (DISC harfinden, rol ayrımı yok — `BE src/controllers/onboardingController.ts:64,74,84,94`, `FE src/components/atoms/DiscBadge.tsx:13-16`). **Dördüncü** bir set de hiçbir belgede geçmiyor: kurum kayıt önizlemesinde Lider·İlham Veren·Denge Kurucusu·Analist (`BE src/controllers/selfServeController.ts:77-82`).
Karar kartı zaten var: **KARAR-45** (`01-KARARLAR.md:921`), CEVAP boş. Bu rapor karta yeni bilgi ekliyor: 4. set ve PSI'nin bayatlığı (§4.0).

**② Eşleşme formülü: canlı kod 60/40, tasarım kararı %45/30/25 + iki yeni veto. Bu geçişin ZAMANI için kart yok.**
`PSI:19` ve canlı kod `(Sektör×0.60)+(Mizaç×0.40)×kalite` diyor (`BE src/services/scoring.ts:89-90,108`). `TAS:428,494` (2026-08-28) ve `ARK:57-60` ise `[hedef×0.45 + alan×0.30 + kişilik×0.25]×kalite` diyor; kişilik içi dağılım `ARK:63`'te. Veto kuralları üç yerde üç farklı:
- `PSI:24-26`: M4-m3 mutlak, M1-m4 yalnız "çatışma", D-S "bloklu"
- kod: `BLOCKED_PAIRS` M1-m4'ü de TAM blokluyor ama canlı yola bağlı değil (`scoring.config.ts:33-36`). D-S canlı ama fallback 2'de gevşiyor (`matching.ts:210`).
- `TAS:460-462`: bambaşka iki Big Five vetosu (V1/V2)

KARAR-10 motoru aşamalı açmaya karar verdi (cevap C). F-11 formülü "şemsiye" içinde sayıyor (`00-KUYRUK.md:209`). Ama "yeni formül motorla AYNI anda mı açılsın, ayrı mı" sorusu hiçbir kartta yok. Kart KARAR-??-A (§4).

**③ Sertifika içeriği üç kuşak; canlıdaki en eski kuşak. Hiçbir belge "hangisi geçerli" demiyor.**
- **Kuşak 1:** `TAM` ve seed, 10 konu / 20 senaryo / 80 şık (`TAM:338`, `BE prisma/seed-certification.ts:7`). Tohum iddiası "TAM = 22 senaryo" **ÇÜRÜTÜLDÜ**: TAM 20 senaryo.
- **Kuşak 2:** FAZ6 §8, *farklı* 10 konu, yine 20/80 (`FAZ6:7,154,633-635`).
- **Kuşak 3:** O1+O2+O3, 11 konu / 22 senaryo / 88 şık, "SERİ TAMAM" (`O3:1,10,482-487`).

Hiçbir belge FAZ6'yı açıkça geçersiz kılmıyor. `00-INDEKS.md:20` FAZ6'yı hâlâ yaşayan kaynak gibi listeliyor. Üç kaynak konu adlarını ve numaralarını farklı kullanıyor: "Konu 9", TAM'da Gizlilik, FAZ6'da Kendi sınırını bilmek, oturumlarda Beklenti yönetimi.
Karar kartı zaten var: **KARAR-46** (`01-KARARLAR.md:963`, öneri A = 2026-09-08 serisi). Bu rapor iki ek bilgi getiriyor:
- "Harmanla" kararının gerekçesi fiilen gerçekleşmedi: okul-gönüllülük konusu geri gelmedi (`O2:246-247,289-291`).
- `PSI:49-50`'deki "baraj 65 / 12 puan" modeli kodda yok. Kodda eşik %80 ve ilk denemede `>= 2` (`BE src/services/certification.service.ts:26,72-74`).

---

## 1. Kapsam beyanları + önceki üç belgenin kapsadığı

### 1.1 Taranan

| Grup | Dosya | Satır | Nasıl |
|---|---|---|---|
| `docs/raporlar/icerik/` üst düzey | 12 | 4.189 | tam okuma (4 paralel alt-ajan + ana ajan teyidi) |
| `docs/raporlar/icerik/bolumler/` | 5 | 1.153 | tam okuma |
| `PSI` | 1 | 64 | tam okuma |
| `TAS` | 1 | 774 | **kısmi** — Bölüm 3 (arketip), 5 (çekirdek), 9 (formül/veto), 10.2 (ekran kararı), 16 (kalem listesi); ~200 satır |
| `TAM` (backend) | 1 | 363 | başlık, eşik bölümü, ÖZET |
| `seed-certification.ts` (backend) | 1 | 329 | konu/senaryo/şık sayımı + slug |
| Kod teyidi | — | — | `scoring.ts` · `scoring.service.ts` · `scoring.config.ts` · `matching.ts` · `certification.service.ts` · `onboardingController.ts` · `selfServeController.ts` · `disc-to-ocean.adapter.ts` · FE arketip adı araması |
| Önceki denetimler | 3 | 1.553 | `00-BELGE-HARITASI.md` · `konsey-icerik-2026-09-21.md` · `belge-duzeni-rehberi.md` |

**Toplam içerik tabanı: 17 belge / 5.342 satır.** Buna PSI + TAS (kısmi) + TAM + seed eklendi.

**Tarih kaynağı:** Çatı klonu sığ (shallow) geldi. `git fetch --unshallow` ile tam geçmiş alındı, ardından `git log --follow` çalıştırıldı. Tarihler §6.1'de.

**Negatif iddiaların kapsamı:**
- "Kodda yok" = `BE src/ prisma/` + `FE src/` üzerinde `grep`.
- "Belgede yok" = yukarıdaki 17 belge + PSI + TAS için `grep`.

### 1.2 Önceki üç belge ne kapsadı (TEKRAR EDİLMEDİ)

| Belge | Ne buldu | Bu rapor ne ekliyor |
|---|---|---|
| `00-BELGE-HARITASI.md` B.4 (`:176-204`) | Üç sertifika oturum belgesi **mükerrer değil, parçalı-tamamlayıcı** (O1 = 1-4, O2 = 5-7, O3 = 8-11). FAZ6 §8 kısmen geçersiz, §1-7 ve §9-12 tek kaynak. `bolumler/03` = as-is kod fotoğrafı. `icerik/` için M-x / Ç-x satırı YOK. | Klasörde **içerik çelişkisi** var (Ç-1…Ç-16); haritanın "çelişki yok" hükmü yalnız mükerrerlik anlamında doğru. |
| `konsey-icerik-2026-09-21.md` | Arketip "Kâşif" çakışması → KARAR-45 · sertifika 20↔22 yapısal fark (17 senaryo seed'de yok, 15 seed senaryosu gerekçeyle elenmiş, Gizlilik B'de puanlama anlamı ters dönmüş) → KARAR-46 · %45/30/25 ↔ 0.6/0.4 "❓ TEYİT GEREK" (kart AÇILMADI) · olmayan 3 belge dürüstçe işaretli · 14 kuyruk satırı (IC-01…14) | 4. arketip seti (`selfServe`) · PSI bayatlığının kökü (TAS 2026-08-28) · formül **zamanlama** kartı · çekirdek 12↔15 çelişkisi · arketip **atama kuralı** çelişkisi (45/55/60 ↔ 10 puan ↔ 40-60) · terim kartı · öğrenme yolculuğu 7/8/10 · sertifika eşik/bekleme bayatlığı · dosya düzeni planı |
| `belge-duzeni-rehberi.md` | KURAL 2-B (konu ↔ yöntem ekseni) · KURAL 4 (📸 tarihli, 🔄 tarihsiz) · indeks adı `00-INDEX.md` (`00-INDEKS.md` yeniden adlandırılmadı, bilinçli) | §6'daki plan bu kurallara göre yazıldı. |

---

## 2. ÇELİŞKİ TABLOSU (A)

Git son-değişiklik tarihleri §6.1'de. Belge içi tarih ile dosya adındaki tarih farklıysa ikisi de yazıldı.

| # | Konu | Belge A (tarih · satır) ne diyor | Belge B (tarih · satır) ne diyor | Kodda ne var |
|---|---|---|---|---|
| **Ç-1** | Arketip adları | `PSI:14-15` (başlık 2026-08-02; git son 2026-08-28): mentör Mimar·Kâşif·Çoban·Komutan / menti İnşaatçı·Gezgin·Tohum·Atılgan | `TAS:71-74` (2026-08-28, "PO kararı") + `ARK:52-53` (içerik 2026-09-03, git 2026-09-08): Mimar·Ayna·Liman·Pusula / Rotacı·Kâşif·Denge Arayan·İz Açan. "İz Açan" PO-onaysız (`ARK:263`) | **İki set daha:** DISC kartı Öncü·Ateşleyici·Yapı Taşı·Kâşif (`onboardingController.ts:64-94`, FE `DiscBadge.tsx:13-16`, `profile/page.tsx:30-33`, `GameSection.tsx:17-20`, `EngineSection.tsx:7-10`) · kurum önizlemesi Lider·İlham Veren·Denge Kurucusu·Analist (`selfServeController.ts:77-82`). Motor yalnız `M1-M4/m1-m4` kodları (`disc-to-ocean.adapter.ts:28-42`). Yeni 8 ad ve eski 8 ad kodda **0**. |
| **Ç-2** | Sertifika hacmi ve sürümü | FAZ6 (içerik 2026-09-03, git 2026-09-08) §8: 10 konu / 20 senaryo / 80 şık (`FAZ6:7,154,633`) | O1+O2+O3 (2026-09-08): 11 / 22 / 88, "SERİ TAMAM" (`O3:1,10,482-487`) | Seed 10 / 20 / 80, **TAM ile birebir**. FAZ6 ile de oturumlarla da AYNI DEĞİL (`seed-certification.ts:7,38-248`; TAM `:338`). TAM başlığı "TASLAK — onay bekliyor" (`TAM:3`) ↔ "içerik onaylandı" (`TAM:353`), kendi içinde çelişik. |
| **Ç-3** | Eşleşme formülü | `PSI:19` (2026-08-02): Sektör 0.60 + Mizaç 0.40, × kalite (0.7–1.15 kırpılmış) | `TAS:428,494` (2026-08-28) + `ARK:57-63` (2026-09-03): hedef/değer 0.45 + alan 0.30 + kişilik 0.25 (içi 8/7/6/3/1) × kalite | Canlı: `scoring.ts:89-90` 0.6/0.4. Çarpan **kırpılmıyor**, yalnız `min(100)` (`scoring.ts:109`). `scoring.service.ts:45` 0.7–1.15 kırpar ama canlı yola bağlı değil. `algorithmTuner.ts:29-36` kuruma 0.40-0.70 sektör ayarı veriyor. %45/30/25 kodda **yok**. |
| **Ç-4** | Veto / toksik blok | `PSI:24-26`: M4-m3 mutlak veto · M1-m4 "çatışma" (blok değil) · D mentör + S menti "bloklu" | `TAS:460-462`: V1 (mentör uyumluluk <30 VE menti denge <35) · V2 (iki taraf denge <30), kademeli gevşeme | `scoring.config.ts:33-36` `BLOCKED_PAIRS = {M4:['m3'], M1:['m4']}`: M1-m4 **tam blok**, ama `matching.ts` okumuyor. D-S kuralı canlı (`scoring.ts:20-22`, `matching.ts:200`) fakat fallback 2'de kapanıyor (`matching.ts:210`). `eslesme-uyum-po-inceleme:60` bu gevşemeyi doğru anlatıyor. V1/V2 kodda **yok**. |
| **Ç-5** | Çekirdek ölçüm: kaç senaryo, herkese aynı mı | `TAS:159-163` (2026-08-28): "İlk oturum: **12 senaryo**… Herkes AYNI 12 soruyu görür (karşılaştırma için ŞART)"; `TAS:663` akışı "çekirdek (12 senaryo)" | `BANKA:14,45` (içerik 2026-09-03, "kayda geçirildi 2026-09-04", git 2026-09-08): "**5 sabit + 10 adaptif = 15**" · `ARK:116` "15 senaryo" · `ARK:134` "15'in değil **35**'in" (havuz 39, `BANKA:7`) | Kodda senaryo bankası YOK (`BANKA:30-31` "KODA GEÇMEDİ"). Adaptif tetik alanı `triggersOn` şemada var (`schema.prisma:939`), `src/` içinde kullanımı **0**. |
| **Ç-6** | Yanıt formatı | `PSI:31-35` (2026-08-02): "CORE = Single-Select, FOLLOWUP = Most/Least" | `TAS:125` (2026-08-28) + `BANKA:38-42` (2026-09-03): **tüm** senaryolar "en çok ben / en az ben", **3 şık**, ölçek yok | SJT seed 3 soru, **4 şık**: SINGLE ×2 + MOST_LEAST ×1 (`BE prisma/seed.ts:532,546,559`), yani PSI ile uyumlu. **Likert 1-5 DISC 32 soru** hâlâ `/disc-test` ekranında (FE `DiscTestCard.tsx:171`; `seed.ts:30-185`). Onboarding 8 tek-seçimli DISC sorusu (`onboardingController.ts:109-190`). |
| **Ç-7** | Arketip atama eşikleri | `PSI:36`: 40-60 "kararsızlık bandı" → FOLLOWUP tetikler | `ARK:83-106` (P3 kararı): herkes arketip alır; en yüksek boyut + ikinci; fark <10 puan → "şimdilik" dili. **5 boyut → 4 arketip eşlemesi yazılı değil** (`ARK:96,440`) | `scoring.config.ts:31` `ARCHETYPE_THRESHOLDS = {HIGH:60, MID:55, LOW:45}`, **hiçbir belgede yok**. Varsayılan M1/m1'e düşüyor (`disc-to-ocean.adapter.ts:35,42`). 40-60 bandı kodda yok. Ölçek hatası yüzünden eşikler pratikte aşılamıyor (PS-A1, `00-KUYRUK.md:447`). |
| **Ç-8** | Kart ↔ üç soru sırası | `TAS` EKRAN KARARI (PO 2026-08-29): üç soru kartın **sonrasında** | `ARK:116-126` (2026-09-03): 15 senaryo → 3 soru → **kart sonda** | Kod kartı önce gösteriyor (`TAS:586` notu → FE `_OnboardingContent.tsx:223-234`). ✅ Belge tarafı çözülmüş: TAS'a 2026-09-04 GÜNCELLEME notu eklenmiş (`TAS:586-588`). **Kalan:** `BANKA:391-393` hâlâ "belirsiz" diyor, `BANKA:399-404` "kart sonraya alındı" diyor; belge kendi içinde çelişiyor. Kod işi I-02. |
| **Ç-9** | Sertifika geçme kuralı | `PSI:49-50`: "12 puan üzerinden **%65** baraj, kırmızı çizgide 0 seçilmemeli, `PASS_THRESHOLD=65`" · `TAM:9-14`: red-line'da "SADECE 3", "yanlışta ceza/bekleme YOK" · `B03:34-37`, `O1:5-6,403-405`: `=== 3` "kod turu bekliyor" | `O1:5` (2026-09-08): kritik konuda 3 ve 2 GEÇER, 1 ve 0 ELER · FAZ6:176,648: "**günde** 2 deneme" | `certification.service.ts:26` %80 · `:72-74` `competencyScore >= 2` (2026-09-09, `43d15dc`, madde 164) · `:30-32` her 2 başarısız denemede 24 saat bekleme. `PASS_THRESHOLD`, 65 ve "12 puan" kodda **yok**. Dosyanın kendi başlık yorumu `:9-11` hâlâ "SADECE 3" diyor (bayat). "Günlük" sınır kodda yok (I-08). |
| **Ç-10** | Sertifika konu adları ve numaraları | TAM/seed: "Cevabı verme, buldur" · "Yapıcı geri bildirim" · "Beklentileri hizalama" · "Kültürel/bireysel farklılıklara saygı"; konu 9 = Gizlilik | FAZ6 §8: "Cevabı buldurmak" · "Geri bildirim" · "Beklenti yönetimi" · "Kültürel ve **kişisel**", konu 9 = Kendi sınırını bilmek · O1-O3: "Kendi **kapasiteni** bilmek" · "Kültürel ve **bireysel**" (`O3:498-502`), konu 9 = Beklenti yönetimi | Seed slug'ları TAM'a göre (`gizlilik-guven`, `okul-gonulluluk-dengesi`…). Oturum belgeleri kaynağa göre numara kullanıyor ("TAM KONU 9 Varyant B" `O1:156`, "faz6 K10" `O3:219`). Konu adları kullanıcıya görünüyor (sonuç ekranı, I-03 / PR #244); I-03'ün hangi ad setini gösterdiği **TEYİT GEREK**. |
| **Ç-11** | "Harmanla" kararının gerekçesi ↔ gerçekleşen | `icerik-onkosul-kesifleri-2026-09-03.md:28-32` (PO 2026-09-03): "HARMANLA", TAM'ın attığı 3 konu **geri gelir** (okul-gönüllülük dahil); `faz5-onkosul-kesfi:235` "Süreklilik A = sınav dönemi" | O2 (2026-09-08): TAM K7 (okul/iş dengesi) iki sahnesi de elendi (`O2:246-247`); gönüllü tükenmişliği "yanlış özne" diye elendi (`O2:243-244`). "Mentinin hayat önceliklerine saygı" yetkinliği **açıkta** (`O2:289-291`, `O3:442-445`) | Seed'de iki STK-özel konu var (`gonullu-tukenmisligi`, `okul-gonulluluk-dengesi`). KARAR-46 A seçilirse ikisi de canlıdan kalkar. |
| **Ç-12** | Öğrenme yolculuğu aşama sayısı | `B04:6` (2026-08-26, kod fotoğrafı): 7 mentör + 6 menti = 13 | FAZ6 §7 (2026-09-03): **8** mentör (24 şık) · MEN:33 5 menti (15 şık) · `O3` KALEM 19 (`:401-412`, PO 2026-09-08): mentör **8 → 10** (gizlilik + bitirme) | `seed-learning-journey.ts:7` 7+6 = 13 (son commit 2026-08-16). Aynı anda üç sayı dolaşımda: 7 · 8 · 10. FAZ6 kendi içinde de karışık: `FAZ6:43` "eski yapıda 7" ↔ `:76` "eski yapıda 13". |
| **Ç-13** | Testin/kartın adı (terim) | `PSI:19` "Mizaç" · `sorular-po-inceleme:7` "mizaç" | `ARK:124` "karakter kartın" · `BANKA:13` "karakter ölçümü" ↔ `BANKA:48` / `ARK:57-60` "kişilik ağırlığı" · `eslesme-uyum` "karakter" (9 kez) | Kullanıcı metni: "Mizaç profilin hazır!" (`onboardingController.ts:492`). KARAR kartlarında "mizaç testi" (`01-KARARLAR.md:925`). Aynı ürün öğesi için üç ad. |
| **Ç-14** | mentor / mentör yazımı | Oturum serisi tutarlı biçimde "mentör" | TAM ve seed karışık | Kullanıcıya görünen seed metninde "mentorluk" (`seed-certification.ts:87,139,143,197,219,229,232`) ile "mentörlük" (`:43,141,207,241,242,251`) karışık. "mentee"/"danışan" 17 içerik belgesinde **0** (yalnız yazım hatası "Menteen": `sorular-po:147`, `B02:39`). |
| **Ç-15** | Olmayan kardeş belgeler | `ARK:17-19`, `MEN:17`, `FAZ6:17-19`, `BANKA:20-22` şu 3 belgeye atıf veriyor: `olcme-mimarisi-2026-09-03.md` · `senaryo-denetim-protokolu.md` · `olcme-arastirmasi-2026-09-03.md` | `00-INDEKS.md:48-50`: "⬜ HENÜZ YAZILMADI (PO bulamadı)". `KOD:144` hâlâ "**4** kardeş belge eksik" diyor; senaryo bankası 2026-09-04'te geldi, gerçekte 3 eksik | İki repoda da yok (`git ls-files` + `find`). Başka "atıf var, belge yok" vakası: `TAM` çatıda yok sanılıyor (submodule körlüğü, `00-BELGE-HARITASI.md:141`). "tam.md" kısaltması hiçbir yerde tanımlı değil. |
| **Ç-16** | Bayat "kod durumu" iddiaları (📸 belgelerde) | KOD §3B madde 1: "şık karıştırma YOK" (`KOD:74-84`) · `FAZ6:649` karıştırmayı yapılacak iş sayıyor, `FAZ6:168` ise "zaten rastgele" diyor · `O1:341-344`, `O2:392-393`, `O3:387-388,506,527`: `internalNote` alanı YOK · `B03:25-27`: güvenli runner YOK | — | Karıştırma var: `FE src/lib/shuffle.ts`, sertifikada `mentor/certification/page.tsx:90`. `internalNote` var (`schema.prisma:1158`), seed doldurmuyor. Doğrudan-çalıştırma muhafızı var (`seed-certification.ts:320-328`, 2026-09-08). |

**Tohum sonuçları:**

| Tohum | Sonuç |
|---|---|
| 1 · Arketip isimleri | ✅ **DOĞRULANDI**, menti de değişti. ⚠️ **"Sessizce değişti" ÇÜRÜTÜLDÜ:** kaynak TAS 2026-08-28 PO kararı (`TAS:71`; ilk commit `2aa83fc`), gerekçesi `devir/08-oturum-tezi-2026-08-28.md:32`. + Kodda 2 set daha (Ç-1). |
| 2 · Sertifika 20/80 ↔ 22/88 | ✅ **DOĞRULANDI.** ⚠️ **Bir alt iddia ÇÜRÜTÜLDÜ:** `TAM` 22 değil **10 konu / 20 senaryo** (`TAM:338`). "v2" sürüm adı, 22 değil. Gerçek resim üç kuşak (Ç-2). |
| 3 · Formül | ✅ **DOĞRULANDI.** %45/30/25 kaynağı `TAS:428,494` (2026-08-28) + `ARK:57-60`. Kod 0.6/0.4 (`scoring.ts:89-90`). + Veto çelişkisi (Ç-4) + çarpan kırpma farkı. |
| 4 · Olmayan kardeş belge | ✅ **DOĞRULANDI**: 3 belge (`olcme-mimarisi` + 2 kardeş). `KOD:144`'teki "4" bayat. Başka yok (kapsam: 17 belge + PSI + TAS içindeki `.md` atıfları). |

**Diğer tohum eksenleri:**
- "33 DISC sorusu" hiçbir belgede **yok**. Gerçek sayı 32 Likert (`seed.ts:18`; `tam-soru-dokumu:15`). "33" yalnız `BANKA:27`'de yanlış bir ara sayım değeri olarak geçiyor. → **ÇÜRÜTÜLDÜ.**
- "15 senaryo → 3 soru → kart" akışı: Ç-5 + Ç-8.
- Likert: Ç-6.
- 0-3 sertifika puanı ↔ Big Five ağırlıkları: **çelişki yok**, farklı araçlar (§7).
- 45/55/60 ve 40-60: Ç-7. "P3 = 10 puan": Ç-7.
- Terimler: Ç-13, Ç-14.

---

## 3. ⭐ TARAFSIZ DEĞERLENDİRME + öneriler (B)

Her çelişki için dört soru: **(1)** hangisi en son · **(2)** hangisi daha gerekçeli · **(3)** kod hangisini uyguluyor (yalnız bilgi — "kod kazanır" burada uygulanmadı) · **(4)** kullanıcı için hangisi daha iyi.

### Ç-1 · Arketip adları
1. **En son:** ARK 2026-09-03 (git 2026-09-08). Ama kararın kendisi TAS 2026-08-28'de verildi. PSI'nin gövdesi 2026-08-02 (git 2026-08-28 yalnız G9 damga turu). Kod setleri (Öncü…) tarihçe olarak DISC dönemine ait, daha eski.
2. **Gerekçe:**
   - TAS/ARK gerekçeli: PO kararı (`TAS:71`), "yüzde soğuk" (`devir/08:32`), her ad bir Big Five profiline bağlı (`TAS:84-103`), "aşağılayıcı olmayacak" kuralı (`TAS:104-106`), telif temizliği (`ARK:473`).
   - PSI'nin adlarına gerekçe yazılmamış.
   - Kod setlerinin gerekçesi paylaşılabilirlik (`shareHeadline`, `onboardingController.ts:68`).
3. **Kod:** yeni seti de eski seti de uygulamıyor. Kullanıcı bugün Öncü/Ateşleyici/Yapı Taşı/Kâşif görüyor.
4. **Kullanıcı için:**
   - Yeni set rol ayrımı yapıyor (mentör ≠ menti) ve Big Five motoruna bağlanabiliyor; bu güçlü yanı.
   - Canlı set tanıdık ve paylaşılmış; bu da güçlü yanı. Ama rol ayırmıyor ve DISC'e bağlı.
   - PSI seti hiçbir ekranda yok.

**ÖNERİ:** Canonical = **TAS/ARK seti**. **Gerekçe:** PO kararıyla seçilmiş, gerekçesi yazılı tek set; PSI'nin setini koruyan tek şey eski bir "canonical" etiketi. **PO kararı mı?** Evet, ama kart **zaten var: KARAR-45**. Eksik bilgi §4.0'da. PSI'nin damgalanması teknik iş, kart gerekmez (IC-??-1).

### Ç-2 · Sertifika sürümü
1. **En son:** O1-O3, 2026-09-08. Kod 2026-07-26 (Paket B).
2. **Gerekçe:** O-serisi en gerekçeli. Her elenen sahnenin nedeni yazılı (`O3:482-489`). 4 kritik konuda akademik prensip cümlesi var (`O1:13-18`). FAZ6 §8 bir ara kuşak. TAM kuşağının gerekçesi `TAM:7-16`.
3. **Kod:** TAM kuşağını uyguluyor.
4. **Kullanıcı için:**
   - O-serisi daha olgun ve kriz/gizlilik gibi kritik konularda daha doğru. KARAR-46'ya göre seed'deki bir senaryoda puanlamanın anlamı ters.
   - Kodda kalmanın gücü: sıfır risk ve STK-özel iki konu (tükenmişlik, okul dengesi) canlıda kalır.

**ÖNERİ:** Canonical = **O1+O2+O3 birlikte** (`00-BELGE-HARITASI.md:103` ile aynı hüküm). FAZ6 §8 "aşıldı" damgası alır. FAZ6 §7 (öğrenme) canonical kalır. **Gerekçe:** Elenen her sahnenin gerekçesi yazılı; FAZ6 §8'in ve TAM'ın üstüne kurulmuş bir sonraki kuşak. **PO kararı mı?** Evet, **KARAR-46** zaten var. Ç-11 (okul-gönüllülük boşluğu) karta ek bilgi olarak girmeli (§4.0).

### Ç-3 · Eşleşme formülü
1. **En son:** TAS 2026-08-28 + ARK 2026-09-03. PSI 2026-08-02.
2. **Gerekçe:**
   - TAS gerekçeli: eski %50 karakter payı araştırmayla düşürüldü (Dyrenforth 2010, `devir/gunluk/oturum-2026-08.md:315`); hedef/değer benzerliği (Eby 2013).
   - PO notu eski 60/40 onay noktalarını "🗑️ GEÇERSİZ" ilan etmiş (`bilanco/kararlar/G2-eslestirme-psikometri.md:51`).
   - PSI'nin gerekçesi yalnız "kapı → skor" mimarisi (`PSI:20`). Bu mimari TAS'ta da korunuyor.
3. **Kod:** 60/40 çalışıyor. Kurum ayarı var (`algorithmTuner.ts`). %45 katmanının verisi (üç soru S1/S2/S3) şemada var, ama doluluk oranı **ölçülmedi, TEYİT GEREK**.
4. **Kullanıcı için:**
   - 45/30/25 "ne arıyorsun ↔ ne verebilirim" sorusunu doğrudan tartıyor; bu, kullanıcının "neden bu mentör" sorusuna en yakın cevap.
   - 60/40'ın gücü: bugün gerçekten çalışıyor, kurum ayarıyla uyumlu ve kullanıcı yüzdeleri buna alışık.

**ÖNERİ:** Canonical **yön** = TAS (%45/30/25 + V1/V2). Bu yön PO'nun kararı, yeniden sorulmaz. Açık olan **zamanlama**: motor (KARAR-10 aşamaları) ile aynı anda mı, ondan sonra mı? **Gerekçe:** İki değişken aynı anda açılırsa KARAR-10'un "eski/yeni sıralama karşılaştırması" şartı neyin neyi değiştirdiğini ayıramaz. **PO kararı mı?** Evet, puanlama ve kullanıcının göreceği yüzdeler değişiyor → **KARAR-??-A**.

### Ç-4 · Veto
1. **En son:** TAS (V1/V2).
2. **Gerekçe:** TAS vetosu "yalnız zarar" ilkesine dayanıyor (`devir/gunluk/oturum-2026-08.md:315`). PSI'nin D-S / M4-m3 kuralı DISC matrisine ait; PO o matrisi GEÇERSİZ saydı (`G2:51-102`).
3. **Kod:** D-S canlı ama gevşeyebiliyor. `BLOCKED_PAIRS`, PSI'nin söylediğinden **sıkı** (M1-m4 tam blok) ve bağlı değil.
4. **Kullanıcı için:** V1/V2 kişiliğin kendisine bakıyor (DISC etiketine değil), gerçek zarar riskini hedefliyor. D-S'nin gücü basit olması ve bugün canlı olması.

**ÖNERİ:** Canonical = TAS V1/V2. PSI'nin veto satırı `[ESKİ]` damgası alır. **PO kararı mı?** Yön zaten karar. Zamanlaması Ç-3 ile aynı → **KARAR-??-A'ya dahil** (ayrı kart açılmadı; kümeleme kuralı).

### Ç-5 · Çekirdek 12 ↔ 5 sabit + 10 adaptif
1. **En son:** BANKA (2026-09-03, "PO onaylı" `BANKA:6`). TAS §5 2026-08-28 ve güncelleme notu yok.
2. **Gerekçe:**
   - TAS §5 "karşılaştırma için ŞART" diyor ve dürüst sınırını yazmış: "12 × 2 = 24 sinyal" (`TAS:332`).
   - BANKA "en bulanık boyuttan" adaptif seçim diyor (`BANKA:47,131`); 12'den 15'e geçişin **gerekçesi yazılmamış**. Kapsam: BANKA + ARK + TAS; `grep "12"`.
3. **Kod:** Hiçbiri yok. Adaptif seçim altyapısı yok (`triggersOn` 0 kullanım).
4. **Kullanıcı için:**
   - 15 senaryo daha çok sinyal ve daha az "şimdilik" etiketi demek; adaptif seçim kişinin belirsiz tarafını hedefler.
   - 12 sabit senaryo daha kısa (~1 dk), herkese adil ve kurum yöneticisinin "bu iki kişiyi karşılaştır" işine yarar.

**ÖNERİ:** Canonical = BANKA (yeni ve PO onaylı), ama **"herkes aynı" şartından vazgeçildiği** açıkça onaylanmalı. **Gerekçe:** TAS'taki "ŞART" kelimesi sessizce aşılmış; bu, ölçme yöntemi değişikliği. **PO kararı mı?** Evet (ölçme yöntemi) → **KARAR-??-B**.

### Ç-6 · Yanıt formatı
1. **En son:** BANKA/TAS (her şey en çok / en az).
2. **Gerekçe:** Üçü de gerekçeli.
   - PSI: tek seçim, ilk girişte kolay.
   - TAS/BANKA: en çok/en az "tam sıralama verir" (`BANKA:40`); 3 şık ("4. şık ölü kalıyor", `BANKA:39`).
3. **Kod:** PSI modeli (SINGLE + MOST_LEAST, 4 şık). Likert DISC hâlâ canlı; PSI bunu "reddedildi" sayıyor.
4. **Kullanıcı için:** En çok/en az her soruda iki tık demek (biraz daha yorucu), ama sosyal arzu edilirlik yanlılığına daha dayanıklı. Tek seçim hızlı.

**ÖNERİ:** Canonical = BANKA (en çok / en az, 3 şık). **Gerekçe:** PO onaylı, en yeni, tasarım belgesiyle aynı; PSI'nin CORE=Single satırı TAS 2026-08-28 ile aşılmış. **PO kararı mı?** **Hayır**, karar zaten verilmiş (BANKA "PO onaylı"). Eksik olan PSI damgası (IC-??-1). Likert DISC'in canlıda kalması ayrı bir iş (F-11 / Faz 5 ve KARAR-42 kapsamında); yeni kart açılmadı.

### Ç-7 · Arketip atama eşikleri
1. **En son:** ARK P3 (2026-09-03). Kod eşikleri daha eski (OCEAN iskeleti). PSI 40-60 2026-08-02.
2. **Gerekçe:**
   - ARK gerekçeli: 10 puanın rastgele-fark hesabı var (`ARK:94-100`) ve kendi dürüst sınırını yazmış: "ampirik değil, muhakeme" (`ARK:98`).
   - Kod eşiklerinin gerekçesi hiçbir belgede **yok**.
   - PSI 40-60'ın gerekçesi CAT/IRT'den kaçınmak (`PSI:36`).
3. **Kod:** 45/55/60 mutlak eşik. Hiçbiri aşılmazsa M1/m1 **varsayılanı** atanıyor. Bu, ARK'ın "herkes kendi baskın boyutuna göre arketip alır" (P3-B) ilkesiyle **çelişiyor**.
4. **Kullanıcı için:**
   - ARK kuralı herkese kendi baskın tarafını verir ve belirsizliği dürüstçe söyler.
   - Mutlak eşiklerin gücü: "gerçekten yüksek" olmayana güçlü etiket vermez.
   - Üçü katmanlı birlikte de yaşayabilir.

**ÖNERİ:** ARK kuralı canonical; 40-60 bandı yalnız "derinleşme tetiği" olarak kalır; 45/55/60 ya belgelenir ya kaldırılır. **Gerekçe:** Bugün kodda "eşik aşılmazsa M1" davranışı P3 kararını ihlal ediyor ve PS-A1 tam bu dosyaya dokunacak. **PO kararı mı?** Evet (puanlama/eşik) → **KARAR-??-C**.

### Ç-8 · Kart sırası
Belge tarafında çözülmüş (TAS'a 2026-09-04 GÜNCELLEME notu). Canonical = ARK §4. Kod işi I-02'de (🟢, BEKLIYOR). Yalnız BANKA'nın iç çelişkisi için bir baş notu gerekli (IC-??-2). **PO kararı değil.**

### Ç-9 · Sertifika geçme kuralı
1. **En son:** Kod (2026-09-09, madde 164, PO kararı 2026-09-04) > O1 (2026-09-08) > FAZ6 > TAM > PSI.
2. **Gerekçe:** Madde 164'ün gerekçesi `certification.service.ts:65-70`'te ("1↔2 çizgisi = prensip uygulandı mı"). O1 aynı gerekçeyi taşıyor (`O1:5`).
3. **Kod:** %80 + `>= 2` + red-line mutlak kapı + 24 saat bekleme.
4. **Kullanıcı için:** `>= 2` "kabul edilebilir" cevabı elemiyor; mentörü gereksiz yere düşürmüyor ve öğretmeye odaklanıyor. `=== 3`'ün gücü kritik konularda en sıkı güvenceyi vermesi.

**ÖNERİ:** Canonical = madde 164 (O1 + kod). PSI "baraj 65", TAM "SADECE 3" ve "bekleme YOK", `B03` `=== 3` ve `certification.service.ts:9-11` yorumu bayat → damga. **PO kararı mı?** **Hayır**, karar zaten verilmiş ve uygulanmış. "Günde 2 deneme" (FAZ6) ↔ "2 başarısızda 24 saat" (kod) farkı I-08'de kuyrukta (🟡). Kart gerekmez.

### Ç-10 · Konu adları ve numaraları
Canonical = O-serisinin adları (`O3:498-502`); KARAR-46'ya bağlı. Numara karmaşası için teknik çözüm: tek bir **konu sözlüğü tablosu** (canonical ad · seed slug · TAM no · FAZ6 no · O no) 00-INDEX'e eklenir (IC-??-3). **PO kararı mı?** Adın kendisi KARAR-46 ile gelir; sözlük teknik iş.

### Ç-11 · Harmanla gerekçesi ↔ gerçekleşen
1. **En son:** O2 (2026-09-08).
2. **Gerekçe:** O2 elemelerin her birine gerekçe yazmış ("yanlış özne" vb.) ve boşluğu kendisi fark etmiş (`O2:289-291`). Harmanla kararının gerekçesi (`kesif:30-32`) STK kapsamıydı.
3. **Kod:** STK konuları canlıda.
4. **Kullanıcı için:** STK'daki gönüllü mentörler için okul/iş dengesi gerçek bir sahne. O2'nin elemesi ise içerik kalitesini koruyor.

**ÖNERİ:** Tek başına kart değil. KARAR-46'ya **ek bilgi** olarak girmeli: "A seçilirse iki STK-özel konu canlıdan kalkar ve 'hayat önceliklerine saygı' yetkinliği açıkta kalır." **PO kararı mı?** KARAR-46'nın parçası.

### Ç-12 · Öğrenme yolculuğu 7 / 8 / 10
En son = O3 KALEM 19 (10, PO 2026-09-08). FAZ6 §7 (8) gerekçeli ama eksik. Kod 7. Kuyrukta **I-17** (8→10, 🟡) ve **KARAR-5** (öğrenme içeriği canlıya girsin mi) zaten var. **ÖNERİ:** Canonical = FAZ6 §7 + KALEM 19 eki (8+2 = 10). FAZ6'ya "8 → 10'a genişledi, bkz. O3 KALEM 19" baş notu eklenir (IC-??-2). Yeni kart yok.

### Ç-13 · Mizaç / karakter / kişilik
1. **En son:** ARK/BANKA ("karakter"). Ama kod ve kartlar "mizaç" diyor.
2. **Gerekçe:** Hiçbir belge terim seçimini gerekçelendirmemiş (kapsam: 17 belge + PSI + TAS).
3. **Kod:** "Mizaç".
4. **Kullanıcı için:**
   - "kişilik" bilimsel olarak doğru (Big Five), ama klinik duruyor.
   - "karakter" sıcak, ama Türkçede ahlaki yargı çağrıştırıyor ("iyi karakter").
   - "mizaç" tanıdık, ama doğuştan ve değişmez çağrışımı var; KARAR-48'in "değişmez kimlik etiketi" eleştirisiyle çatışıyor.

**ÖNERİ:** Tek terim seçilmeli. **PO kararı mı?** Evet (kullanıcıya görünen ad) → **KARAR-??-D**.

### Ç-14 · mentor / mentör
Oturum serisi "mentör" diyor; kod kullanıcı metninde karışık. **Teknik** (yazım tutarlılığı), kart yok. Seed dosyasında olduğu için kapı 🟡 (IC-??-6). KARAR-46 A seçilirse seed metni zaten baştan yazılacak; o zaman bu satır P-99'a katlanır.

### Ç-15 / Ç-16 · Olmayan belgeler ve bayat kod iddiaları
Teknik. 📸 belgelerin gövdesi değiştirilmez; başa `⚠️ GÜNCELLEME` notu eklenir (KURAL 3/6). IC-??-2'de toplanır. Olmayan 3 belge için "yaz" önerisi **yok**: PO bulamadı, içerikleri bugün TAS'ta ve BANKA'da dağınık yaşıyor. Yeni belge açmak, `CLAUDE.md` "aktif iş kaynağı tektir" ilkesinin ruhuna aykırı.

---

## 4. HAZIR KARAR KARTLARI

### 4.0 · Mevcut kartlara eklenecek bilgi (yeni kart DEĞİL)

| Kart | Eklenecek bilgi | Kanıt |
|---|---|---|
| **KARAR-45** (arketip adları) | (a) Kodda **dördüncü** bir ad seti var: kurum kayıt önizlemesi Lider·İlham Veren·Denge Kurucusu·Analist. Kurum yöneticisi kayıt sırasında bunu görüyor. Hangi seçenek seçilirse seçilsin bu set de hizalanmalı. (b) Yeni set "sessiz" değil; TAS 2026-08-28'de PO kararıyla seçildi. Kartın "eski karar belgesi" dediği PSI **hiç damgalanmamış**. (c) Yeni 8 adın M1…m4 kodlarına eşlemesi yok. Ama TAS her ada bir Big Five profili yazmış (`TAS:84-103`); eşleme buradan türetilebilir. | `selfServeController.ts:77-82` · `TAS:71-107` · `devir/08-oturum-tezi-2026-08-28.md:32` |
| **KARAR-46** (sertifika sürümü) | (a) A seçilirse seed'deki iki STK-özel konu (`gonullu-tukenmisligi`, `okul-gonulluluk-dengesi`) canlıdan kalkar. "Harmanla" kararının "3 konu geri gelir" gerekçesi okul-gönüllülük için gerçekleşmedi; "mentinin hayat önceliklerine saygı" yetkinliği açıkta. (b) Konu adları üç kaynakta farklı; A seçilirse sonuç ekranındaki (I-03) konu adları da değişir. (c) Seed'de "mentorluk/mentörlük" karışık; A seçilirse bu kendiliğinden düzelir. | `O2:243-247,289-291` · `O3:442-445,498-502` · `seed-certification.ts:87,141` |

---

### KARAR-?? · Eşleşme puanının yeni formülü, arketip motoruyla AYNI ANDA mı açılsın, AYRI mı? (2 işi açar — PS-A3 · F-11 formül ayağı)  [ÜRÜN KARARI]
**Şu an ne var:** Kullanıcının eşleşme kartında gördüğü yüzde bugün iki parçadan hesaplanıyor: alan/sektör benzerliği %60 + DISC mizaç uyumu %40 (`BE src/services/scoring.ts:89-90`). Eşleşmeyi tamamen engelleyen tek kural "D tipi mentör + S tipi menti". Bu kural da havuz daralınca gevşiyor (`matching.ts:210`).
Ağustos'taki tasarım kararın (`TAS:428,494`, 2026-08-28) bunu **üç parçaya** çeviriyor: hedef/değer uyumu %45 + alan %30 + kişilik %25. Engelleme kuralları da kişilik puanına dayalı iki kurala (V1/V2, `TAS:460-462`) dönüşüyor. Bu yeni formül **kodda yok**.
**Sorun ne:** KARAR-10'a "C, aşamalı" cevabı verdin: kişilik motoru üç adımda açılacak ve son adımda eski ve yeni sıralama sana karşılaştırmalı gösterilecek. Ama formül değişikliğinin **o adıma dahil olup olmadığı** hiçbir yerde yazmıyor. Kuyruk ikisini aynı satırda (F-11) sayıyor.
İkisi aynı anda açılırsa karşılaştırmada gördüğün farkın ne kadarının kişilik motorundan, ne kadarının yeni ağırlıklardan geldiği ayrılamaz. Ayrıca %45'lik "hedef/değer" parçası, kayıtta sorulan üç sorunun cevabına dayanıyor. Eski kullanıcılarda bu cevapların ne kadar dolu olduğu **ölçülmedi**.
**Neden sana soruyorum:** Kullanıcının gördüğü uyum yüzdesi değişir ve bazı çiftlerin sırası yer değiştirir. Bu kaç kez ve hangi sırayla olsun kararı ürün kararıdır.
**Seçenekler:**
**A) Tek seferde: kişilik motoru + yeni formül + yeni engelleme kuralları birlikte açılır**
- Kullanıcı ne görür: yüzdeler bir kez değişir
- Ne kazanırsın: tasarım kararın tek turda canlıya çıkar; iş bir kez yapılır
- Ne kaybedersin: karşılaştırma ekranında farkın kaynağı ayrılamaz; bir sorun çıkarsa hangi parçanın bozduğu bulunamaz; üç soruyu cevaplamamış kullanıcıda ağırlığın %45'i boş veriyle hesaplanır
- Süre: L · Geri alınır: evet (açma/kapama anahtarıyla) · Migration: yok (TEYİT GEREK)

**B) İki adım: önce kişilik motoru bugünkü 60/40 formülünün içinde açılır, yeni formül ayrı bir sonraki adımda gelir**
- Kullanıcı ne görür: yüzdeler iki kez değişir
- Ne kazanırsın: her adımda tek değişken olur, karşılaştırma anlamlı kalır; üç sorunun doluluk oranı arada ölçülür
- Ne kaybedersin: iş iki kez test edilir; eski formül (senin geçersiz saydığın) bir süre daha canlıda kalır; kullanıcı yüzdesinin iki kez oynadığını fark edebilir
- Süre: M + M · Geri alınır: evet · Migration: yok

**C) Yeni formül rafa kalkar, 60/40 kalıcı olur**
- Kullanıcı ne görür: bugünkü yüzdeler (motor açılınca yalnız kişilik kısmı değişir)
- Ne kazanırsın: en az iş, en az risk
- Ne kaybedersin: "ne arıyorsun ↔ ne verebilirim" uyumu puana hiç girmez (tasarımdaki araştırma gerekçesi boşa gider); kayıtta sorulan üç sorunun cevabı toplanır ama eşleşmede kullanılmaz; Ağustos kararın yeniden açılmış olur
- Süre: — · Geri alınır: evet

**Karşılaştırma:** Hızlı ve tek seferlik bir geçiş istiyorsan ve sorun çıkarsa hepsini birden kapatmayı göze alıyorsan A. KARAR-10'da istediğin "önce/sonra karşılaştırmasının" gerçekten anlamlı olmasını istiyorsan B. Tasarım kararından vazgeçtiysen C.
**Benim önerim:** B — KARAR-10'a verdiğin "aşamalı ve karşılaştırmalı" cevabın ruhu, her aşamada tek şeyin değişmesi.
**Cevap vermezsen:** PS-A3 (bağlama) hangi formülle açılacağını bilmeden yazılamaz; F-11'in formül ayağı belirsiz kalır.
**CEVAP:**

---

### KARAR-?? · İlk ölçüm: herkes aynı senaryoları mı çözsün, yoksa sistem kişiye göre mi seçsin? (2 işi açar — senaryo bankasının koda girişi · derinleşme motoru)  [ÜRÜN KARARI · ÖLÇME YÖNTEMİ]
**Şu an ne var:** Kodda senaryo bankası henüz yok. Kullanıcı bugün 8 soruluk DISC testi çözüyor (`onboardingController.ts:109-190`). Yazılı iki plan var ve birbirini tutmuyor:
- Tasarım belgesi: "ilk oturum **12 senaryo**, herkes **aynı** 12'yi görür, karşılaştırma için **şart**" (`TAS:159-163`, 2026-08-28).
- Senaryo bankası: "**5 sabit + 10 kişiye göre seçilen = 15 senaryo**" (`BANKA:14,45`, 2026-09-03, "PO onaylı").

**Sorun ne:** Daha yeni belge daha eskisindeki "şart" kelimesini gerekçe yazmadan aşmış. 15 senaryolu planda kişiler arasında doğrudan karşılaştırma yalnız 5 ortak senaryoda mümkün. Ayrıca "kişiye göre seçme" motoru kodda hiç yok (`triggersOn` alanı var, kullanımı 0).
**Neden sana soruyorum:** Ölçme yöntemi değişiyor: kullanıcının kaç soru çözeceği ve iki kişinin aynı ölçüyle ölçülüp ölçülmediği. Teknik değil.
**Seçenekler:**
**A) 5 sabit + 10 kişiye göre seçilen (senaryo bankası planı)**
- Kullanıcı ne görür: 15 senaryo (~5 dk); belirsiz kaldığı tarafa odaklanan sorular
- Ne kazanırsın: en çok bilgi, en az "şimdilik" etiketi
- Ne kaybedersin: kişiler arası karşılaştırma 5 senaryoya düşer; seçim motoru yazılmadan başlanamaz (ek iş M-L); tasarım belgesindeki "şart" geri alınmış olur
- Süre: L · Geri alınır: evet · Migration: muhtemelen gerekli (cevap kaydı; KARAR-10 aşamalarıyla birlikte, TEYİT GEREK)

**B) 12 sabit senaryo, herkese aynı (tasarım belgesi planı)**
- Kullanıcı ne görür: 12 senaryo (~4 dk)
- Ne kazanırsın: en basit, herkese adil, karşılaştırılabilir; seçim motoru gerekmez
- Ne kaybedersin: 39'luk bankada "12'lik çekirdek" diye bir liste yok, yeniden seçilmesi gerekir; belirsiz boyuta odaklanma olmaz; daha az sinyal (tasarım belgesi bunu kendisi "dürüst sınır" diye yazmış, `TAS:332`)
- Süre: M · Geri alınır: evet · Migration: aynı

**C) Geçiş planı: şimdilik 15 SABİT senaryo (5 çekirdek + havuzdan seçilmiş sabit 10), kişiye göre seçim sonra**
- Kullanıcı ne görür: 15 senaryo, herkes aynı
- Ne kazanırsın: seçim motorunu beklemeden 15 sinyal ve karşılaştırılabilirlik; A'ya sonra geçilebilir
- Ne kaybedersin: sabit 10'u birinin seçmesi gerekir (içerik işi); "en bulanık boyuta odaklanma" ertelenir; iki geçiş olur
- Süre: M · Geri alınır: evet · Migration: aynı

**Karşılaştırma:** Ölçümün kişiye özel keskinliği önemliyse ve seçim motorunun işine hazırsan A. Kurum yöneticisinin iki kişiyi aynı ölçüyle kıyaslaması önemliyse B. Hemen başlamak ama A'yı kapatmamak istiyorsan C.
**Benim önerim:** C — seçim motoru bugün yok, C bugün uygulanabilir ve A'ya açık kalır. ⚠️ Bu bir ölçme yöntemi kararı; önerime güvenme, kendi önceliğine göre seç.
**Cevap vermezsen:** Senaryo bankasının koda girişi (Faz 5 "a" + "f": 39 senaryo seed + 5+10 akış, `devir/gunluk/oturum-2026-09.md:341`) hangi akışı kuracağını bilmeden başlayamaz.
**CEVAP:**

---

### KARAR-?? · Kişiye hangi arketip verilecek — hangi puanla? (2 işi açar — PS-A1 eşikleri · I-15 arketip kartı)  [ÜRÜN KARARI · EŞİK]
**Şu an ne var:** Arketip atayan kod bir kişilik boyutunun **45 / 55 / 60** eşiklerini aşıp aşmadığına bakıyor (`scoring.config.ts:31`). Hiçbir eşik aşılmazsa kişiye otomatik olarak "M1" (mentörde Mimar) ya da "m1" (mentide Rotacı) veriliyor (`disc-to-ocean.adapter.ts:35,42`). Bu eşikler **hiçbir belgede yazılı değil**.
İçerik belgesindeki kuralın (P3) farklı: herkes arketip alır; en yüksek boyut ve ikincisi gösterilir; aralarındaki fark 10 puandan azsa "şimdilik" dili kullanılır (`ARK:83-106`).
Eski karar belgesinde üçüncü bir kural var: 40-60 arası "kararsız" sayılır ve ek soru açılır (`PSI:36`).
**Sorun ne:**
- Bugünkü kod senin P3 kararını ihlal ediyor. Eşiği aşamayan herkes Mimar/Rotacı oluyor; kendi baskın tarafını değil, varsayılanı görüyor.
- Beş kişilik boyutundan dört arketipe nasıl gidileceği yazılı değil (`ARK:96,440`).
- PS-A1 (ölçek düzeltme) tam bu dosyaya dokunacak. Karar verilmezse "düzeltme" bugünkü belgesiz eşikleri kalıcı hale getirir.

**Neden sana soruyorum:** Kişinin kendisi hakkında okuyacağı etiketi hangi puanın belirleyeceği, puanlama/eşik kararıdır.
**Seçenekler:**
**A) İçerik belgesindeki kural (P3): en yüksek boyut kazanır, 10 puan altı fark "şimdilik" dili alır; 45/55/60 kaldırılır**
- Kullanıcı ne görür: herkes kendi baskın tarafının arketipini, belirsizse "şimdilik" diliyle görür
- Ne kazanırsın: P3 kararınla birebir; "herkese Mimar" hatası biter
- Ne kaybedersin: zayıf bir öne çıkış bile arketip verir (belirsizlik dille yönetilir, etiketle değil); 10 puan "muhakeme", ampirik değil (`ARK:98`)
- Süre: M · Geri alınır: evet · Migration: yok

**B) Koddaki mutlak eşikler (45/55/60) kalır, belgeye yazılır; "şimdilik" dili yalnız metin katmanında**
- Kullanıcı ne görür: yalnız gerçekten yüksek çıkan boyut arketip verir; diğerleri varsayılan ya da "henüz belirlenmedi"
- Ne kazanırsın: güçlü etiket yalnız güçlü sinyale verilir
- Ne kaybedersin: P3'te reddettiğin "arketip verme / beşinci dengeli arketip" yoluna geri dönülür; varsayılanın ne olacağı yeni bir soru olur
- Süre: S · Geri alınır: evet · Migration: yok

**C) Katmanlı: A kuralı arketipi verir, 40-60 bandı yalnız "hangi boyut için ek senaryo sorulsun" tetiği olur, 45/55/60 kaldırılır**
- Kullanıcı ne görür: A ile aynı; ek olarak belirsiz tarafına yönelik derinleşme soruları
- Ne kazanırsın: üç kuralın her birinin tek bir görevi olur, çelişki biter
- Ne kaybedersin: derinleşme motoru yazılmadan 40-60 ayağı çalışmaz (KARAR-??-B'ye bağlı); en karmaşık seçenek
- Süre: M+ · Geri alınır: evet · Migration: yok

**Karşılaştırma:** P3 kararın hâlâ geçerliyse A ya da C. Güçlü etiketi yalnız güçlü sinyale vermek istiyorsan B, ama bu P3'ü geri almak demek. A ile C'nin tek farkı, 40-60 bandının derinleşme için kullanılıp kullanılmaması.
**Benim önerim:** A — P3 zaten senin kararın; C'nin fazlası derinleşme motoru gelince eklenebilir.
**Cevap vermezsen:** PS-A1 ölçeği düzeltir ama eşikleri olduğu gibi bırakır (sessiz kalıcılaşma); I-15 arketip kartı hangi kuralla dolacağını bilmez.
**CEVAP:**

---

### KARAR-?? · Test ve kartın adı: "mizaç" mı, "karakter" mi, "kişilik" mi? (1 işi açar — terim birliği, IC-01 ile aynı dosyalar)  [ÜRÜN KARARI · KULLANICI METNİ]
**Şu an ne var:** Aynı şey üç adla anılıyor.
- Canlı ekranda "**Mizaç** profilin hazır!" yazıyor (`onboardingController.ts:492`); karar kartlarında "mizaç testi" deniyor.
- Yeni içerik belgeleri "**karakter** kartın" (`ARK:124`) ve "**karakter** ölçümü" (`BANKA:13`) diyor.
- Aynı belgeler ağırlıktan söz ederken "**kişilik**" diyor (`ARK:57-60`, `BANKA:48`).

**Sorun ne:** Kullanıcı aynı testi farklı ekranlarda farklı adla görecek. Hiçbir belge terim seçimini gerekçelendirmemiş.
**Neden sana soruyorum:** Kullanıcıya görünen ürün adı ve üç kelimenin Türkçede farklı çağrışımları var.
**Seçenekler:**
**A) "Mizaç"**
- Kullanıcı ne görür: bugünkü ad
- Ne kazanırsın: tanıdık, canlıda değişiklik yok
- Ne kaybedersin: "doğuştan, değişmez" çağrışımı var; KARAR-48'in "değişmez kimlik etiketi" eleştirisiyle ve Big Five'ın "eğilim" diliyle (`TAS` etiketleme riski notu) çatışır
- Süre: S · Geri alınır: evet · Migration: yok

**B) "Karakter"**
- Kullanıcı ne görür: "karakter kartın"
- Ne kazanırsın: sıcak ve oyunsu, yeni içerik belgeleriyle uyumlu
- Ne kaybedersin: Türkçede ahlaki yargı çağrıştırır ("iyi/kötü karakter"); paylaşılan kartta yanlış okunabilir
- Süre: S · Geri alınır: evet · Migration: yok

**C) "Kişilik"**
- Kullanıcı ne görür: "kişilik kartın"
- Ne kazanırsın: motorun bilimsel adıyla (Big Five) birebir, en dürüst ad
- Ne kaybedersin: daha klinik ve daha soğuk; tasarım belgesi arketip metaforunu tam da "yüzde soğuk" diye seçmişti (`devir/08-oturum-tezi-2026-08-28.md:32`)
- Süre: S · Geri alınır: evet · Migration: yok

**Karşılaştırma:** Canlıda hiçbir şey değişmesin istiyorsan A. Sıcaklık ve oyun hissi öndeyse B. Metodoloji sayfasıyla tek sesle konuşmak öndeyse C.
**Benim önerim:** C — ürünün temkinli metodoloji diliyle (KARAR-48) en tutarlısı. ⚠️ Bu tamamen bir ton kararı; önerime güvenme.
**Cevap vermezsen:** Yeni içerik (I-15 kartı, BANKA metinleri) koda "karakter" diye, canlı ekran "mizaç" diye girer; kullanıcı iki ad görür.
**CEVAP:**

---

## 5. HAZIR KUYRUK SATIRLARI

Kapı kuralı (`00-KUYRUK.md:9-20`):
- seed / migration · auth / KVKK / matching dosyası · geri dönülmez dokunuş → 🟡
- ürün kararı bekliyor → 🔴
- diğerleri → 🟢

| # | Şerit | İş | Kapı | Kullanıcı ne görür | Durum | Not / kanıt |
|---|---|---|---|---|---|---|
| IC-??-1 | Ş0 | **`03-psikometri-ve-algoritma.md` bayat canonical damgası.** Arketip adları (`:14-15`), formül (`:19`), veto (`:24-26`), yanıt formatı (`:33`), sertifika barajı (`:49-50`) satırları `~~[ESKİ]~~` + `⚠️ GÜNCELLEME` → canonical TAS (§3 · §9 · §4), BANKA (format), `certification.service.ts:26,72-74` (eşik). Başlıktaki "Son güncelleme 2026-08-02" düzeltilir. | 🟢 | (belge — sonraki turlar ve yeni oturumlar yanlış arketip adını / formülü "canonical" diye okumaz) | BEKLIYOR | Bu rapor Ç-1, 3, 4, 6, 9. ⚠️ Arketip satırı KARAR-45 cevabından **bağımsız** damgalanabilir: PSI seti her seçenekte emekli. |
| IC-??-2 | Ş0 | **📸 içerik belgelerine baş-notu paketi** (gövde DEĞİŞMEZ, yalnız başa `⚠️ GÜNCELLEME`): FAZ6 (§8 aşıldı → O1-O3; §7 8→10 → O3 KALEM 19; `:168` ↔ `:649` karıştırma) · O1/O2/O3 (`=== 3` kod turu yapıldı; `internalNote` alanı var) · `B03` (`=== 3`, runner var) · BANKA (`:391-393` belirsiz ↔ `:399-404` çözüldü) · ARK (`:134` "35" → havuz 39) · KOD (`:144` 4 → 3 eksik belge; §3B madde 1 shuffle yapıldı). | 🟢 | (belge) | BEKLIYOR | **IC-12 ile birleştirilebilir.** IC-12 aynı klasörün hijyeni; bu satır onun içerik ayağı. Ç-8, 9, 12, 15, 16. |
| IC-??-3 | Ş0 | **`docs/raporlar/icerik/00-INDEX.md` (🔄) — "konu → canonical belge → kodda ne var" haritası + sertifika konu sözlüğü** (canonical ad · seed slug · TAM no · FAZ6 no · O no). `00-INDEKS.md` yönlendirme saplamasına dönüşür (§6 Adım 1-2). | 🟢 | (belge — "hangi belge geçerli?" sorusu tek tabloda) | BEKLIYOR | Ç-2, Ç-10. KURAL 2-B "indeks adı tektir: 00-INDEX.md". IC-12'deki "`bolumler/` indekse" maddesini de karşılar. |
| IC-??-4 | Ş0 | **Backend belge/yorum bayatlığı:** `certification.service.ts:9-11` başlık yorumu ("red-line SADECE 3") → `>= 2` (madde 164) · `prisma/senaryo-bankasi-tam.md:3` "TASLAK — onay bekliyor" ↔ `:353` "onaylandı" + başa "kuşak 1 — canlıdaki; aşan: O1-O3" notu. | 🟢 | (kod yorumu + belge — davranış değişmez) | BEKLIYOR | Ç-2, Ç-9. Sertifika servisi auth/KVKK/matching değil, yalnız yorum. Backend PR + çatı pointer. |
| IC-??-5 | Ş0 | **5. DISC ad sözlüğü: kurum kayıt önizlemesi** (`selfServeController.ts:77-82` Lider·İlham Veren·Denge Kurucusu·Analist) → IC-01'in "5 DISC sözlüğü tek kaynağa" işine dahil edilsin. | 🟢 | Kurum yöneticisi kayıt önizlemesinde, üyelerinin göreceği adın aynısını görür | BEKLIYOR | Ç-1. ⚠️ **TEYİT GEREK:** IC-01'in saydığı 5 sözlük bu dosyayı içeriyor mu? (`konsey-icerik:374-377`). İçeriyorsa bu satır düşer. Hangi adın kalacağı KARAR-45'e bağlı değil; bu yalnız DISC adlarının birliği. |
| IC-??-6 | Ş0 | **Sertifika seed metninde "mentorluk/mentörlük" karışıklığı** → "mentör". | 🟡 | Mentör sınav metinlerinde tek yazım görür | BEKLIYOR | Ç-14. 🟡 = seed (istisna 1). ⛔ KARAR-46 → A gelirse metin baştan yazılır ve bu satır **P-99'a katlanır**; önce KARAR-46 beklenmeli. |
| IC-??-7 | Ş0 | **Eşleşme formülü geçişi** (%45/30/25 + V1/V2) — KARAR-??-A cevabına göre PS-A3 ile birlikte ya da ayrı. | 🔴 KARAR-??-A | Eşleşme yüzdesi yeni formülle hesaplanır | BEKLIYOR | Ç-3, Ç-4. Cevaptan sonra 🟡 (matching). F-11'in formül ayağı. |
| IC-??-8 | Ş0 | **Çekirdek senaryo akışı** (12 sabit / 5+10 / 15 sabit) — BANKA'nın koda girişinin akış tanımı. | 🔴 KARAR-??-B | Kullanıcı ilk oturumda kararlaştırılan sayıda senaryo çözer | BEKLIYOR | Ç-5. Cevaptan sonra 🟡 (seed + muhtemel migration). |
| IC-??-9 | Ş0 | **Arketip atama kuralı** (P3 / 45-55-60 / katmanlı) — `ARCHETYPE_THRESHOLDS` + `deriveArchetype`. | 🔴 KARAR-??-C | Kişi kendi baskın tarafının arketipini görür (varsayılan "Mimar/Rotacı" değil) | BEKLIYOR | Ç-7. ⛔ **PS-A1'den ÖNCE cevaplanmalı** (aynı dosya). Cevaptan sonra 🟡 (skorlama). |
| IC-??-10 | Ş0 | **Test/kart adı terim birliği** (mizaç / karakter / kişilik) — kullanıcı metinleri + içerik belgeleri. | 🔴 KARAR-??-D | Kullanıcı testi her ekranda aynı adla görür | BEKLIYOR | Ç-13. Cevaptan sonra 🟢 (metin). |

**Sayım:** 10 satır: 🟢 5 · 🟡 1 · 🔴 4.

---

## 6. DOSYA DÜZENİ (C)

### 6.1 Mevcut durum (C.1)

| Dosya | İçerik | Tür (başlıktaki) | Belge içi tarih ↔ ad tarihi ↔ git (ilk / son) | Hâlâ geçerli mi | Örtüşme |
|---|---|---|---|---|---|
| `00-INDEKS.md` | klasör indeksi | 🔄 (`:3`); harita 📸 sanıyor (`00-BELGE-HARITASI.md:42`) | 2026-09-03 ↔ — ↔ 09-08 / 09-08 | Kısmen: FAZ6'yı aşılmamış gibi listeliyor, `bolumler/` 5 dosyası tek tek yok, `backend/` yolu bayat | — |
| `arketip-ve-yaklasim-icerigi-2026-09-03.md` | 8 arketip kartı, 4 "şimdilik", 8 yaklaşım, P3, 10 puan, akış | 📸 | 09-03 ↔ 09-03 ↔ **09-08** / 09-08 | ✅ canonical (arketip içeriği); formül bölümü TAS'ın tekrarı | TAS §3, §9 |
| `menti-yolculugu-ve-eslesme-metinleri-2026-09-03.md` | 5 menti aşaması, eşleşme detay, bekleme/ret metinleri | 📸 | 09-03 ↔ 09-03 ↔ **09-08** / 09-08 | ✅ canonical (menti yolculuğu + eşleşme metinleri) | — |
| `faz6-ogrenme-ve-sertifika-2026-09-03.md` | §7: 8 mentör öğrenme aşaması · §8: 20 sertifika senaryosu · isim değişkenleri | 📸 | 09-03 ↔ 09-03 ↔ **09-08** / 09-08 | §7 ✅ (+KALEM 19 eki) · **§8 aşıldı** (O1-O3) · §4 isim tablosu O1 §7 ile güncellendi | O1-O3, B03, TAM |
| `kod-kalemleri-2026-09-03.md` | 23 kod kalemi envanteri → madde 138-160 | 🔄 (YN-06: "yaşayan ama ölü") | 09-03 ↔ 09-03 ↔ **09-08** / 09-08 | Tarihsel: numaralar 00-KARAR-TAKIP'te; §3B kısmen bayat | 00-KARAR-TAKIP |
| `senaryo-bankasi-2026-09-03.md` | 39 karakter senaryosu / 117 şık | 📸 "PO onaylı" | 09-03 ↔ 09-03 ↔ kayıt 09-04 ↔ git **09-08** | ✅ canonical (karakter ölçümü) | TAS §5 (12 ↔ 15) |
| `sertifika-oturum1-4-kritik-konu-2026-09-08.md` | O1: 4 kritik konu / 8 senaryo / 32 şık | ❓ "📸 Üretim" (DONDURULMUŞ sözcüğü yok) | 09-08 ↔ 09-08 ↔ 09-08 | ✅ canonical (parça 1/3) | O2, O3 |
| `sertifika-oturum2-3-konu-2026-09-08.md` | O2: 3 konu / 6 / 24 | ❓ aynı | 09-08 | ✅ (parça 2/3) | — |
| `sertifika-oturum3-4-konu-2026-09-08.md` | O3: 4 konu / 8 / 32 + seri kapanışı | ❓ aynı | 09-08 | ✅ (parça 3/3) + KALEM 1/5/13/15 güncel hâli | — |
| `sorular-po-inceleme-2026-08-26.md` | 68 soru, PO işaretleme formu | 📸 | 08-26 ↔ 08-26 ↔ 08-26 / 08-28 | Tarihsel (canlı soruların PO incelemesi) | tam-soru-dokumu (aynı 68) |
| `eslesme-uyum-po-inceleme-2026-08-26.md` | 60/40 + DISC matrisi PO incelemesi | 📸 | 08-26 ↔ 08-26 ↔ 08-26 / 08-28 | Tarihsel (canlı formülün doğru fotoğrafı; tasarım kararı onu aşıyor) | PSI |
| `tam-soru-dokumu-2026-08-26.md` | 68 soru, teknik döküm | 📸 | 08-26 | Tarihsel (as-is) | sorular-po |
| `bolumler/01-disc.md` … `05-felsefe-motoru.md` | as-is kod dökümü (DISC, SJT, sertifika, öğrenme, motor) | 📸 | 08-26 ↔ ad tarihsiz ↔ 08-26 | Tarihsel (as-is). B03 eşik bölümü bayat (`=== 3`) | `arsiv/icerik/*-2026-08-15` (bir önceki fotoğraf) |

**Klasör dışı ama bu içeriğin canonical'ı:** `TAS` (arketip/formül/ölçme kararları) · `PSI` (bayat canonical) · backend `TAM` (kuşak 1).

### 6.2 Sorunlar (C.2)

1. **Tarih yanıltıcı.** Dosya adında 09-03 yazan 5 belge git'e 09-08'de girdi (`da05f6e`). BANKA'nın içi "kayda geçirildi 2026-09-04" diyor. Ad = üretim oturumu, git = kayıt tarihi. Ayrım hiçbir yerde açıklanmıyor.
2. **Ad içinde sayılar karışıyor.** `sertifika-oturum1-4-kritik-konu` "oturum 1'den 4'e" diye okunuyor; gerçekte "oturum 1 · 4 kritik konu". `oturum2-3-konu` ve `oturum3-4-konu` aynı tuzak.
3. **İndeks adı iki biçimde:** `00-INDEKS.md` ↔ kural `00-INDEX.md` (KURAL 2-B). Arşivdeki `00-icerik-index.md` üçüncü biçim (YN-12).
4. **Bir konu dört dosyaya dağılmış:** sertifika O1 + O2 + O3 + FAZ6 §8 (aşılmış) + B03 (as-is) + TAM (backend). Canonical'ın "üç dosyanın birlikte okunması" olduğu yalnız `00-BELGE-HARITASI.md:103`'te yazıyor.
5. **Bir dosya iki konuyu taşıyor:** FAZ6 = öğrenme yolculuğu (canonical) + sertifika (aşılmış). Dosya adı ikisini de söylüyor ama hangisinin geçerli olduğunu söylemiyor.
6. **Tür etiketi zayıf:** 3 oturum belgesi "📸 Üretim" diyor (DONDURULMUŞ/YAŞAYAN sözcüğü yok). `kod-kalemleri` 🔄 ama ölü.
7. **"Canonical" etiketi yanlış yerde:** en bayat belge (PSI) 🔄 "canonical"; gerçek karar belgesi TAS `kararlar/konu/`'da, içerik ise `raporlar/icerik/`'te. Okuyan "canonical"a gidip yanlış adı ve formülü alıyor.
8. **Submodule körlüğü:** TAM çatıda görünmüyor, 5 belge ona atıf veriyor (`00-BELGE-HARITASI.md:141`).

### 6.3 Hedef yapı önerisi (C.3)

**İlke:** Bu klasör bir **içerik arşivi**; iş listesi değil (iş kaynağı tek: `00-KUYRUK.md`). "Net ve anlaşılır" ihtiyacını **dosyaları taşımak değil, tek bir harita** karşılar. 17 dosyanın 12'si açıkça 📸, 3'ü (oturum serisi) fiilen 📸; asıl kırılacak olan ise bu dosyalara DIŞARIDAN verilen atıflar — onların çoğu da 📸 belgelerde (§6.4).

**Önerilen hedef (Faz 1, önerilen):**

```
docs/raporlar/icerik/
├── 00-INDEX.md                         🔄 YENİ — tek harita (aşağıdaki şablon)
├── 00-INDEKS.md                        🔄 → yönlendirme saplaması ("bkz. 00-INDEX.md"; eski içerik altında GEÇMİŞ olarak kalır)
├── arketip-ve-yaklasim-icerigi-2026-09-03.md        📸 + baş notu
├── menti-yolculugu-ve-eslesme-metinleri-2026-09-03.md 📸
├── faz6-ogrenme-ve-sertifika-2026-09-03.md          📸 + baş notu (§8 aşıldı · §7 8→10)
├── senaryo-bankasi-2026-09-03.md                    📸 + baş notu (iç çelişki)
├── sertifika-oturum1-4-kritik-konu-2026-09-08.md    📸 (etiket düzeltme notu)
├── sertifika-oturum2-3-konu-2026-09-08.md           📸 (aynı)
├── sertifika-oturum3-4-konu-2026-09-08.md           📸 (aynı)
├── kod-kalemleri-2026-09-03.md                      🔄→📸 (YN-06) + baş notu
├── sorular-po-inceleme-2026-08-26.md                📸
├── eslesme-uyum-po-inceleme-2026-08-26.md           📸
├── tam-soru-dokumu-2026-08-26.md                    📸
└── bolumler/01…05                                   📸 (as-is 2026-08-26)
```

Dosya adı değişmez, klasör değişmez. **Kırılan atıf: 0.**

**`00-INDEX.md` şablonu** (ana değer burada):

| Konu | Canonical (bugün geçerli) | Aşılmış / tarihsel | Kodda ne var (as-is) | Karar kartı / kuyruk |
|---|---|---|---|---|
| Arketip adları + kartlar | `arketip-ve-yaklasim…` §2-§5 + `TAS` §3 | `PSI:14-15` (emekli) | DISC 4 ad (`onboardingController.ts`) · `selfServe` 4 ad | KARAR-45 · I-15 |
| Karakter ölçümü (senaryo bankası) | `senaryo-bankasi…` | `TAS` §5 (12 senaryo) | 8 DISC + 32 Likert + 3 SJT → `bolumler/01-02` | KARAR-??-B |
| Eşleşme formülü | `TAS` §9 | `PSI:19` · `eslesme-uyum…` | 60/40 → `bolumler/05` | KARAR-??-A · F-11 |
| Sertifika içeriği | O1 + O2 + O3 (birlikte) | `faz6` §8 · `TAM` | seed 10/20/80 → `bolumler/03` | KARAR-46 · P-99 |
| Sertifika geçme kuralı | kod (madde 164) + O1 | `PSI:49-50` · `TAM:9-14` · `bolumler/03` | `certification.service.ts:24-74` | I-08 |
| Mentör öğrenme yolculuğu | `faz6` §7 + O3 KALEM 19 | — | 7+6 → `bolumler/04` | KARAR-5 · I-17 |
| Menti yolculuğu + eşleşme metinleri | `menti-yolculugu…` | — | — | I-10 · I-11 · I-16 |
| **Sertifika konu sözlüğü** | canonical ad · slug · TAM no · FAZ6 no · O no | | | IC-??-3 |

**KURAL 2-B uyumu:**
- `icerik/` KONU klasörü; bu rapor YÖNTEM klasöründe (`kesif/`). `00-INDEX.md`'ye bir satırlık çapraz atıf konur: `içerik mutabakatı → ../kesif/icerik-mutabakati-2026-09-23.md (2026-09-23)`.
- TAS ve PSI `kararlar/konu/`'da kalır, INDEX onlara işaret eder.

**Adlandırma kuralı önerisi** (KURAL 4'ün içerik klasörüne uygulanışı):
1. 📸 içerik kaydı → `<konu>-<ne>-YYYY-MM-DD.md`. **Tarih = içeriğin üretildiği oturum** (belge içi `Tarih:` satırıyla AYNI). Git'e başka gün girdiyse başlığa ikinci satır yazılır: `Kayda geçti: YYYY-MM-DD`. INDEX'te ikisi ayrı sütun.
2. 🔄 yaşayan dosya → tarihsiz, sabit ad (`00-INDEX.md`).
3. Seri belgelerde sıra numarası ile sayı yan yana gelmez: `sertifika-o1-kritik-4konu-…` gibi (**yalnız yeni belgeler için**; eskiler yeniden adlandırılmaz).
4. İndeks adı tek: `00-INDEX.md`.
5. Türkçe, ASCII, kebab-case (mevcut uygulama).

**Faz 2 (isteğe bağlı, ÖNERİLMİYOR) — konu alt klasörleri:**

```
icerik/arketip/ · icerik/karakter-olcumu/ · icerik/sertifika/ · icerik/yolculuk/ · icerik/po-inceleme-2026-08-26/ · icerik/kod-fotografi-2026-08-26/ (= bolumler/)
```

Maliyeti §6.4'te. FAZ6 iki konuya ait olduğu için hangi klasöre gideceği ayrıca tartışma yaratır.

### 6.4 Geçiş planı (C.4)

**Atıf sayımı** (`git grep -F <basename>`, dosyanın kendisi hariç; çatı repo; 2026-09-23):

| Dosya | Atıf veren dosya / satır (çatı) | Backend |
|---|---|---|
| `00-INDEKS` | 10 / 29 | 0 |
| `arketip-ve-yaklasim-icerigi-2026-09-03` | 13 / 19 (+ kısaltılmış `arketip-...md` 4 / 7) | 0 |
| `eslesme-uyum-po-inceleme-2026-08-26` | 9 / 14 | 0 |
| `faz6-ogrenme-ve-sertifika-2026-09-03` | 11 / 13 | 0 |
| `kod-kalemleri-2026-09-03` | 9 / 16 | 0 |
| `menti-yolculugu-ve-eslesme-metinleri-2026-09-03` | 8 / 9 (+ kısaltılmış 1 / 2) | 0 |
| `senaryo-bankasi-2026-09-03` | 8 / 18 | 0 |
| `sertifika-oturum1-4-kritik-konu-2026-09-08` | 6 / 9 | **1 / 1** (`schema.prisma:1158`) |
| `sertifika-oturum2-3-konu-2026-09-08` | 4 / 5 | 0 |
| `sertifika-oturum3-4-konu-2026-09-08` | 4 / 8 | 0 |
| `sorular-po-inceleme-2026-08-26` | 7 / 9 | 0 |
| `tam-soru-dokumu-2026-08-26` | 15 / 28 | 0 |
| `bolumler/01…05` | 5/6 · 4/5 · 5/9 · 5/6 · 5/6 | 0 |

**Faz 2 toplamı** (16 dosya taşınırsa, 00-INDEKS hariç):
- **~180 satır** atıf (çatı) + **1** kod yorumu (backend).
- Klasör dışında **34 ayrı dosya** + klasör içinde 10 dosyada 40 çapraz atıf.
- Klasör dışındaki 34 dosyanın **~27'si 📸 dondurulmuş** (başlık taraması; yaklaşık). Bunların atıfları kurala göre **güncellenemez**: taşıma bu atıfları **kalıcı olarak kırar**. `devir/gunluk/*`, `arsiv/*`, `bilanco/*`, konsey raporları bu gruba giriyor.

**Faz 1 adımları (önerilen; kırılan atıf 0):**

| Adım | İş | Doğrulama |
|---|---|---|
| 1 | `00-INDEX.md` oluştur (§6.3 şablonu + konu sözlüğü + `bolumler/` 5 satır + bu rapora çapraz atıf) | `ls docs/raporlar/icerik/00-IND*` → 2 dosya · dosya sayısı 17 → 18 |
| 2 | `00-INDEKS.md`'nin başına "➡️ güncel harita: `00-INDEX.md`" yönlendirmesi; eski gövde `## GEÇMİŞ` altına **aynen** iner (tarihsel iz satırda değil bölümde kuralı) | `00-INDEKS.md` satır: önce 65, sonra 65 + yönlendirme (kalan + taşınan = önceki) · 29 atıf hâlâ çözülüyor |
| 3 | 📸 belgelere baş-notları (IC-??-2) — **gövde değişmez**, yalnız başa `⚠️ GÜNCELLEME` bloğu | her dosya için `git diff --stat` yalnız başa ekleme · gövde satırları birebir (`git diff` silme satırı 0) |
| 4 | 3 oturum belgesinin tür etiketi → "📸 DONDURULMUŞ" notu (yalnız ek) | aynı |
| 5 | `kod-kalemleri` → 📸 (YN-06 ile aynı iş) | aynı |
| 6 | `PSI` damgası (IC-??-1) — `docs/kararlar/` yazımı | `~~[ESKİ]~~` sayısı = damgalanan satır sayısı |
| 7 | `docs/kararlar/00-INDEX.md` içerik satırı → `raporlar/icerik/00-INDEX.md` (KURAL 5 bitiş adımı) | — |

**Sıra:** 1 → 2 (önce yeni harita, sonra yönlendirme; atıf hiçbir an boşa düşmez) → 3-5 (bağımsız, tek PR) → 6-7 (kararlar/, ayrı PR). ⛔ SİLME YOK, TAŞIMA YOK, YENİDEN ADLANDIRMA YOK.

**Faz 2 yapılacaksa (önerilmiyor) sıra:**
1. Her taşınan dosyanın eski yerine 📸 yönlendirme saplaması bırakılır. Kırılma 0 olur ama dosya sayısı 17'den 33'e çıkar; bu, "net ve anlaşılır" hedefine ters.
2. 🔄 belgelerdeki atıflar (KUYRUK, KARARLAR, KARAR-TAKIP, BELGE-HARITASI, INDEX; ~9 dosya) aynı PR'da güncellenir.
3. `git mv` ile taşınır.
4. Doğrulama: `git grep -c` öncesi ve sonrası; çözülmeyen atıf listesi 0 olmalı (saplamalar sayesinde).

**Birleştirme:** Sertifika için tek bir birleşik içerik belgesi (O1+O2+O3 → `sertifika-icerik-11-konu.md`) cazip. Ama KARAR-46 cevaplanmadan yazılırsa hangi sürümü birleştireceği belirsiz. KARAR-46 → A gelirse birleşik belge **P-99'un seed kaynağı** olarak doğal biçimde doğar; O1-O3 📸 kalır, yeni belge onlara atıf verir. **Şimdi önerilmez.**

### 6.5 Risk — yapmanın ve yapmamanın maliyeti (C.5)

| | Maliyet |
|---|---|
| **Faz 1'i YAPMAK** | 1 küçük belge PR'ı (S) + 1 `kararlar/` PR'ı (S). Kırılan atıf 0. Risk: yeni bir "harita" dosyası daha → bu yüzden yalnız **bu klasörün** indeksi olarak kalır, iş listesi taşımaz. |
| **Faz 1'i YAPMAMAK** | AŞAMA I kodlanırken ajan PSI'yi "canonical" diye okuyup **eski arketip adını veya 60/40'ı** koda taşıyabilir. FAZ6 §8'i "20 senaryo" diye seed'e götürebilir (`00-INDEKS.md:20` bunu davet ediyor). Konsey, IC-12 ve bu rapor aynı riski üç kez yazdı. |
| **Faz 2'yi YAPMAK** | ~180 atıf satırı; ~27 dondurulmuş dosyada kalıcı kırık ya da 16 saplama dosyası. Tarihsel iz bozulur (KURAL 2-B gerekçesi). Kazanç: klasör görünümü düzenli. Ürüne etkisi sıfır. |
| **Faz 2'yi YAPMAMAK** | 17 dosya düz listede kalır. INDEX olduğu sürece okuyan yolu bulur. |

**⭐ Öneri: şimdi / sonra**
- **ŞİMDİ** (AŞAMA I kodlanmadan önce): Faz 1 adım 1-2 (INDEX + yönlendirme) ve IC-??-1 (PSI damgası). Gerekçe: kodlama turları yanlış kaynağı okumasın. Toplam S.
- **AŞAMA I ile paralel:** Faz 1 adım 3-5 (baş-notları; IC-12 ile tek PR).
- **KARAR cevaplarından sonra:** KARAR-46 → birleşik sertifika belgesi (P-99 ile). KARAR-45 → arketip ad↔kod tablosu INDEX'e.
- **HİÇ (önerilen):** Faz 2 klasör taşıması. Ürünü canlıya çıkarmaya katkısı yok, tarihsel izi bozar.

---

## 7. ✅ ÇELİŞKİ BULUNMAYAN ALANLAR

- **Red-line konuları:** 4 kritik konu (geri bildirim · sınır · gizlilik · kriz) TAM, seed, FAZ6 ve O-serisinde birebir aynı (`seed-certification.ts` T02/T05/T09/T10 · `O3:498-502`; konsey `:177-182`).
- **Karakter bankası sayımı:** 39 senaryo / 117 şık doğru (5 çekirdek + 34 havuz; 118 ok işaretinden 1'i düzeltme notu). Çekirdek dağılım etiketi `BANKA:123` satır satır tutuyor.
- **Oturum serisi sayımları:** O1 4/8/32 · O2 3/6/24 · O3 4/8/32 · toplam 11/22/88. Kaynak dağılımı (FAZ6 15 · TAM 5 · yeni 2) tek tek tutuyor.
- **Oturum serisi iç tutarlılığı:** KALEM numaraları kesintisiz (1-10 → 11-16 → 17-19). O1 §10'daki konu atamalarına O2 ve O3 uymuş. İsim dağılımı tablosu (O1 §7) 22 senaryoda tutarlı.
- **Soru envanteri:** `tam-soru-dokumu` ↔ `sorular-po-inceleme` aynı 68 soru (32+3+20+13); mükerrer değil, iki farklı amaç.
- **`bolumler/` ↔ kod (2026-08-26 itibarıyla):** B01/B02/B03 seed ile birebir. Yalnız B03 eşik bölümü 09-09'dan sonra bayat (Ç-9).
- **Rol adı "menti":** 17 belgede "mentee" ve "danışan" terim olarak **hiç yok** (yalnız "Menteen" yazım hatası ×2, kod enum'u). Tutarlı.
- **Sertifika 4 şık ↔ karakter 3 şık:** çelişki değil; iki ayrı araç, ikisi de gerekçeli (sertifika: rastgele tutturma %25 ↔ %33, `ARK:456`; karakter: "4. şık ölü kalıyor", `BANKA:39`).
- **0-3 sertifika puanı ↔ Big Five ağırlıkları:** farklı ölçüm alanları; birbirine dokunmuyor.
- **"Kapı → skor" mimarisi:** PSI (`:20`) ve TAS aynı ilkeyi taşıyor (engelleme puandan önce; kalite çarpanı toplam terimi değil çarpan). Yalnız çarpanın kırpılıp kırpılmadığında kod farklı (Ç-3).
- **Kart sırası:** belge tarafında çözülmüş (TAS `:586` notu ↔ ARK §4); kalan yalnız kod (I-02) ve BANKA'nın iç notu.
- **İsim kuralı (unisex iptali):** TAS `:409-410` damgası 2026-09-23'te yapıldı (I-06); FAZ6 §4 ile tutarlı.

---

## 8. TARANAMAYANLAR / SINIRLAR

- **TAS (774 satır)** yalnız ilgili bölümleriyle okundu (~200 satır). Bölüm 6-8, 11-15'te ek çelişki olabilir. **TEYİT GEREK.**
- **`docs/arsiv/icerik/` 6 dosya** (2026-08-15 fotoğrafı) taranmadı. `00-BELGE-HARITASI.md:202` "doğru damgalanmış" diyor.
- **88 sertifika şıkkının metin bazında karşılaştırması** yapılmadı (konsey `:291-299` üç sahne örneğiyle yaptı). Puan anlamı ters dönen senaryonun ayrıntısı konseyde.
- **I-03 (PR #244)** sonuç ekranında hangi konu adı setini gösteriyor: **TEYİT GEREK** (Ç-10).
- **Üç sorunun (S1/S2/S3) canlı doluluk oranı** ölçülmedi (DB erişimi yok). KARAR-??-A için önemli.
- **Ölçek hatası** (`discD..C` 0-1 ↔ adaptör 0-100) kod okumasından çıkarım; çalıştırılmadı. PS-A1 aynı tespiti yapıyor.
- **Frontend metinlerinin** tam terim taraması (mizaç/karakter/kişilik) yapılmadı; yalnız arketip adları arandı.
- **`00-KARAR-TAKIP.md` madde 138-169 satırları** tek tek okunmadı; yalnız kuyruk ve kart çapraz atıfları kullanıldı.
- **Faz 2 dondurulmuş-dosya sayısı (~27)** ilk 8 satırda 📸/DONDURUL araması ile tahmin edildi; kesin sayım değil.
- **`git log --follow` tarihleri** unshallow sonrası alındı. `docs/raporlar/icerik/` dosyalarının ilk kaydı 2026-09-08 (`da05f6e`, `docs/gelen/`'den taşıma). Taşıma öncesi `docs/gelen/` geçmişi izlenmedi.
