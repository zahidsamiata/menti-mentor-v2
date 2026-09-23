> 🌡️ ILIK — gerektiğinde okunur (rutin turda değil). Okuma kuralı: OTONOM-PROMPT.txt · Okuma
> TÜR: 🌡️ · SON DOĞRULAMA: ❓ içerik denetlenmedi (başlık 2026-09-23 DA turunda eklendi) · TAZELEME TETİKLEYİCİSİ: docs/ altına belge eklenince, taşınınca ya da dondurulunca
> ⚠️ Bu belge kalemlerin TANIMINI tutar, DURUMUNU TUTMAZ. Buradaki işaretler 2026-09-23 öncesi (belgenin kendi tarihleri) durumudur. Güncel durum: `docs/otonom/00-KUYRUK.md` (köprü: `docs/kararlar/00-KART-INDEKSI.md`)

# 📍 BELGE HARİTASI — docs/ tam envanteri

**🔄 YAŞAYAN** · **Son güncelleme:** 2026-09-20 (K turu — belge mimarisi)
**Kapsam:** `docs/` altındaki **151 .md dosyası / 29.537 satır** (main dalı, 2026-09-20).
**Mod:** salt-okuma analiz. Hiçbir belge silinmedi, birleştirilmedi, taşınmadı. Tek yazma işi: oturum günlüğü bölme (§D).

---

## ⚠️ BU BELGE `00-INDEX.md`'İN YERİNE GEÇMEZ — iş bölümü

`belge-duzeni-rehberi.md` **KURAL 5** şöyle diyor: *"`docs/kararlar/00-INDEX.md`, 'neyi nerede bulurum'un TEK kapısıdır."*
Bu harita o kuralı **çiğnemez, tamamlar.** İkisinin işi farklı — karışırsa bu turun savaştığı 🔁 mükerrerin ta kendisi olur:

| | `kararlar/00-INDEX.md` | **bu harita** |
|---|---|---|
| Ne | **Seçilmiş** canonical işaretçi — "hangi konuda hangi belge yetkili" | **Tam** envanter — 151 dosyanın hepsi, istisnasız |
| Kim güncel tutar | Her yeni belgede (KURAL 5, bitiş adımı) | Denetim turlarında (çeyrekte bir yeter) |
| İçerir | Canonical + arşiv ayrımı, okuma yolu | Satır sayısı · tazelik · çakışma · öksüz bulgu |
| İçermez | Tam liste, tazelik ölçümü | Karar yetkisi — canonical'ı INDEX söyler |

⛔ **Çelişirlerse `00-INDEX` kazanır.** Bu harita ölçüm yapar, yetki dağıtmaz.
⚠️ KURAL 5 gereği bu belgenin `00-INDEX.md`'e bir satırla işlenmesi gerekir — **bu turda yapılmadı** (turun çıktı listesi sabitti). Sonraki belge turuna kalan iş.

---

## 🧭 HANGİ SORUYA HANGİ BELGE (önce buraya bak)

| Sorun | Git buraya | Tür |
|---|---|---|
| "Şu an neredeyiz, en son ne oldu?" | `kararlar/09-DURUM.md` | 🔄 canonical |
| "Ne kaldı, hangi iş yarım, hangi kod ölü?" | `kararlar/00-KARAR-TAKIP.md` | 🔄 canonical |
| "Sırada ne var, öncelik ne?" | `kararlar/10-yol-haritasi.md` | 🔄 canonical |
| "Hangi belge nerede, hangisi yetkili?" | `kararlar/00-INDEX.md` | 🔄 canonical |
| "Belge nasıl yazılır/nereye konur?" | `kararlar/konu/belge-duzeni-rehberi.md` | 🔄 canonical (8 kural) |
| "Nasıl çalışıyoruz, hangi kurallar?" | kök `CLAUDE.md` (KURAL 1-16) | 🔄 canonical |
| "Bu oturumda ne oldu?" (son 3) | `devir/07-oturum-gunlugu.md` | 🔄 |
| "Daha eski oturumlarda ne oldu?" | `devir/gunluk/oturum-2026-08.md` · `oturum-2026-09.md` | 📸 |
| "Projeye yeni geldim, nereden başlarım?" | `devir/01-felsefe-ve-calisma-tarzi.md` → `06-devir-kilavuzu.md` | 🔄 |
| "Mentör/menti paneli ne olmalıydı?" | `raporlar/persona/{mentor,menti}-persona-*.md` | 📸 |
| "…peki kodda ne var?" ⭐ | `raporlar/kod-denetimi/strateji-gercek-denetimi-2026-08-20.md` **B.1/B.2** | 📸 |
| "Admin panelleri ne olmalıydı / kodda ne var?" | `raporlar/panel/` (4 belge, strateji+envanter çiftleri) | 📸 |
| "Sertifika/DISC/öğrenme soruları ne?" | `raporlar/icerik/00-INDEKS.md` → oradan | 📸 |
| "KVKK metinleri / avukat paketi?" | `kararlar/konu/kvkk-metinleri/00-AVUKAT-KONTROL-DOSYASI.md` | 📋 |
| "Bir karar neden böyle alındı?" | `raporlar/bilanco/kararlar/G*.md` (kanıt kartları) | 📸 |
| "Otonom kuyruk / bekleyen PO kararı?" | `otonom/00-KUYRUK.md` · `01-KARARLAR.md` | 🔄 |

---

## 🚫 BU BELGELERE GÜVENME (bayat · çelişkili · yanıltıcı)

> Her satır kanıtlı. "Güvenme" = içeriği yanlış demek DEĞİL; **tek başına okunursa yanıltır** demek.

### 1. Kanıtlanmış DURUM ÇELİŞKİLERİ (çözülmedi — PO kararı)

| # | Çelişki | Nerede | Risk |
|---|---|---|---|
| **Ç-1** | Sunucu/altyapı sertleştirme: **⬜ "PO önceliklendirmedi"** ↔ **🔴 ÇIKIŞ BLOKERİ** | `kararlar/00-KARAR-TAKIP.md:615` (madde 120, ⬜) ↔ **aynı belge** `:171` (S19, 🔴 "çıkış öncesi ZORUNLU") ↔ `raporlar/bilanco/kararlar/G1-guvenlik-kvkk.md:440-444` (G1-28, 🔴, 2026-09-02 PO kararı) | ⚠️ **En yüksek risk.** F.6 tablosuna bakan biri projenin en sert çıkış blokerini "önceliksiz açık iş" sanır. madde 120 satırı G1-28'e hiç atıf vermiyor |
| **Ç-2** | k-anonimlik: **⬜** ↔ **🟡** — *aynı belgenin içinde* | `kararlar/00-KARAR-TAKIP.md:614` (madde 119, ⬜) ↔ `:686` (F-tablo, 🟡, "G1-22") ↔ `G1-guvenlik-kvkk.md:357-364` (⬜, `Numara: NUMARASIZ`) | Bir kalem, iki numara, üç kayıt. İkisi birbirini tanımıyor |
| **Ç-3** | Bilanço toplamı **196 ↔ 259 ↔ 260** | `bilanco/bilanco-po-ozet-2026-08-26.md:22` ("196") · `bilanco/karar-defteri-2026-08-26.md:437` ("196") ↔ `bilanco/kararlar/00-KATLAMA-IZI-2026-08-27.md` ("259") ↔ `00-SAYIM-2026-08-27.md` ("260") | Düzeltme paragrafa yazılmış, **tablo hücreleri 196'da kalmış** |
| **Ç-0** ⭐ | **CANONICAL'IN KALBİ BAYAT.** `09-DURUM.md` başlığı **2026-09-19** diyor; ama `:241` **"⚡ TEK BAKIŞTA (şu an — hepsi doğrulanmış)"** bölümü **2026-08-19** fotoğrafı (32 gün): backend HEAD `b6187c1` · çatı `753c545` · "açık docs PR #96, #97" · "DISC soruları (**20**)" — oysa aynı dosyanın `:119` satırı "DISC **32**" diyor | `kararlar/09-DURUM.md:3` ↔ `:241-249` ↔ `:119` | ⚠️ **En yüksek kazançlı tek düzeltme.** "şu an" diye etiketlenmiş bölüm şu an DEĞİL; canonical'ın en çok okunan yeri yanlış. G9-03 üstü-çizili damgası uygulanmamış |
| **Ç-0b** | ~~[ESKİ · 2026-09-20] `09-DURUM.md:447` **"🔴 KIRMIZI KURALLAR (kalıcı)"** altında *"PR aç, merge etme"* … (**6 yer**)~~ ⚠️ **GÜNCELLEME (2026-09-21, BB turu — teşhis DOĞRUYDU, iki ayrıntısı yanlıştı):** (a) hedef satır `09-DURUM.md:447` **değil `:450`** (`:447` = "🔴 KIRMIZI KURALLAR" başlığı, `:448-449` başka kurallar); (b) "6 yer" **eksik sayım** — geniş tarama (`docs/` + `CLAUDE.md`, harf duyarsız, 2 desen) **15 yürürlükte-görünen satır** buldu. **DURUM: 9'u bu turda düzeltildi** (`CLAUDE.md:26,178` · `09-DURUM.md:450` · `10-yol-haritasi.md:308,309` · `konu/07-calisma-tarzi.md:10,19` · `konu/11-…-disc.md:148` · bu satır). **Kalan 6'sı `docs/devir/01,03,04,06`'da ve hepsi 📸 DONDURULMUŞ** → tur talimatı gereği dokunulmadı; donmuş belge tarihsel kayıttır, ama `01` ve `06` kendini *"kalıcı referans"* ilan ettiği için **PO kararı gerekir** (bkz. `docs/raporlar/kesif/devir-analizi-2026-09-21.md` §6.1). | `09-DURUM.md:450` + 5 devir belgesi ↔ `CLAUDE.md:25-45` | Yeni gelen bu yerlerden birini okuyup merge etmemeyi kural sanar → otonom kuyruk tıkanır. **KURAL 12 "karar-yayılımı" ayağının tam vakası** |
| **Ç-0c** | `00-INDEX.md` (harita!) **13 belgeyi + `otonom/` klasörünün tamamını bilmiyor.** `grep -ci otonom 00-INDEX.md` → **0**. Son commit 2026-08-30 (21 gün); 2026-09-03 sonrası üretilen 13 belge hiç eklenmemiş (~900 satır indekssiz) | `kararlar/00-INDEX.md` | **KURAL 5 ihlali.** Dünkü `hayalet-envanter-2026-09-19.md` haritada yok. Ayrıca `:24` "BURADAN BAŞLA" 6. adımı yeni geleni, kendi `:97`'de "bayat" dediği `durum-panosu`'na yolluyor |
| **Ç-0d** | `09-DURUM.md:456,458` **iki ölü dosya referansı**: `00-karar-statu-haritasi-2026-08-14.md` · `00-DURUM-PANOSU.md` — ikisi de **yok** (doğrulandı). Gerçek yollar `oz-denetim/` altında, `00-` öneki olmadan | `kararlar/09-DURUM.md:456,458` | 2026-08-23 alt-klasörlemesinde atıflar güncellenmemiş |
| **Ç-4** | Manuel eşleştirme: "eksik" ↔ "YASAK" | `raporlar/panel/stk-yonetici-panel-envanteri:71,148` ↔ `stk-yonetici-strateji:67` — çelişkiyi 3. klasörden `kod-denetimi/tam-belge-taramasi-2026-08-23.md:38` yakalamış | panel/ içinde bu çelişkiyi gösteren not YOK |
| **Ç-5** | "~14 backend-var/FE-yok" ↔ "kod-teyidiyle 9" | `kod-denetimi/proje-analizi-kapsamli-denetim-2026-08-22.md:45` ("~14") ↔ `yarim-is-niyet-envanteri-2026-08-23.md:36` ("DOĞRULANAN 9" + 5 yanlış-pozitif reddi) | İkisi de 📸 damgalı, farklı sayı veriyor |

### 2. Dosya adındaki tarih ≠ tazelik (32 dosya — mekanik ölçüm)

`docs/` altında **32 dosyada** iç tarih, dosya adındaki tarihten YENİ. İkiye ayrılır:

- **Gerçekten sonradan düzenlenmiş: 12 dosya** (📸 damgalı ama ⚠️ GÜNCELLEME notu almış).
  En çarpıcı: `raporlar/panel/platform-admin-strateji-2026-08-02.md` → içinde `⚠️ GÜNCELLEME (2026-08-14)`; `stk-yonetici-strateji-2026-08-02.md:82` → aynı; `kararlar/oz-denetim/durum-panosu-2026-08-14.md` → 2026-08-28.
  ⚠️ **Bu bir kural ihlali DEĞİL** — KURAL 6 tam da bunu emrediyor ("silme; ⚠️ GÜNCELLEME notu ekle"). Sorun kuralda değil **sinyalde**: dosya adına bakan "49 günlük" sanıyor, belge 12 gün önce düzeltilmiş.
- **Yalnız başka bir tarihe ATIF veren: 20 dosya** — düzenlenmemiş (ör. `kesif/katilim-modeli-mevcut-durum-notu-2026-08-02.md` +37 gün, GÜNCELLEME notu yok).

➡️ **Kural: tazelik için dosya adına ASLA bakma.** Belgenin künyesindeki son ⚠️ GÜNCELLEME satırına bak.

### 3. Etiket sorunları
| Dosya | Sorun |
|---|---|
| `raporlar/bilanco/bilanco-po-ozet-2026-08-26.md` | 37 bilanço dosyasının **tek etiketsizi** — 🔄/📸 üst-etiketi hiç yok (❓ teyit gerek) |
| `raporlar/bilanco/kararlar/G3-icerik.md` | Başlık `📸 DONDURULMUŞ (2026-08-27)` ama `:172` **2026-09-02** düzenlemesi taşıyor. Kardeşleri G1/G9/G10 aynı durumda 🔄 YAŞAYAN'a çevrildi, G3 atlanmış (❓ kasıtlı mı) |
| `raporlar/bilanco/kararlar/00-ONCELIK-SIRASI-2026-08-28.md` | 🔄 ama künyesi *"DEVREDİLDİ (2026-09-19) → `otonom/00-KUYRUK.md` AŞAMA F"* diyor — takip artık orada, bu belge yönlendirici |
| `arsiv/PROJECT_STATUS.md` | Güncel durum sanılabilir; **değil**. Canonical: `kararlar/09-DURUM.md` |

### 4. ⚠️ Yaklaşan bayatlama (KURAL 12, 30 gün)
`bilanco/kararlar/` altında **9 kart dosyası** (G2, G4a, G4b, G5, G6, G7, G8, G11 + G3 gövdesi) 23-24 gündür dokunulmamış — eşiğe **6-7 gün**. Kardeşleri G1/G9/G10 çapraz-doğrulama turu aldı, bunlar almadı → "hayalet tamamlanmış" riski ölçülmedi.

---

## 🏛️ CANONICAL BELGELER — bir konuda tek doğru kaynak

| Konu | Canonical | Neden / not |
|---|---|---|
| Güncel durum ("ne oldu") | `kararlar/09-DURUM.md` | CLAUDE.md + KURAL 7 |
| Açık iş / ölü kod ("ne kaldı") | `kararlar/00-KARAR-TAKIP.md` | KURAL 7 — ⚠️ ama bkz. §B/P-3: fiilen ayrıntı kopyalıyor |
| Öncelik kuyruğu | `kararlar/10-yol-haritasi.md` | KURAL 7 |
| Belge haritası / yetki | `kararlar/00-INDEX.md` | KURAL 5 — **bu harita onun yerine geçmez** |
| Belge düzeni kuralları | `kararlar/konu/belge-duzeni-rehberi.md` | 8 kural, kendini canonical ilan ediyor |
| Çalışma disiplini | kök `CLAUDE.md` | KURAL 1-16 |
| **Bir kalemin AYRINTISI + KANITI** | `raporlar/bilanco/kararlar/G*.md` | **KURAL 15: çelişkide KART KAZANIR** |
| Otonom iş kuyruğu (fiilî omurga) | `otonom/00-KUYRUK.md` | 2026-09-19'dan beri takip buraya kaydı |
| Sertifika içeriği (güncel) | `icerik/sertifika-oturum1+2+3-…-2026-09-08.md` **üçü birlikte** | Tek dosya canonical DEĞİL — bkz. §B |
| Sertifika içeriği (kodda ne var) | `icerik/bolumler/03-sertifika.md` | as-is kod fotoğrafı |
| Soru envanteri (68 soru) | `icerik/tam-soru-dokumu-2026-08-26.md` | `icerik/00-INDEKS.md` üzerinden gidilir |
| Mentör/menti paneli kıyası | `kod-denetimi/strateji-gercek-denetimi-2026-08-20.md` **B.1/B.2** | ⚠️ persona/ klasöründen görünmez — bkz. §B/D2 |

---

# BÖLÜM B — ÇAKIŞMA / MÜKERRER TESPİTİ

## ⭐ B.0 — KÖK NEDEN: "yanlış dosyalama" DEĞİL, **eksen çakışması**
> ✅ **ÇÖZÜLDÜ (2026-09-19):** Eksen çakışması `belge-duzeni-rehberi.md` **KURAL 2-B** ile kurala bağlandı (KONU+YÖNTEM çakışırsa → YÖNTEM klasörü + KONU klasörüne zorunlu çapraz atıf). Geriye dönük: `raporlar/persona/00-INDEX.md` ve `raporlar/panel/00-INDEX.md` oluşturuldu; beş kıyas bölümü (B.1-B.5) satır aralıklarıyla çapraz atıflandı; B.5 için `arsiv/admin-panelleri-tasarim-2026-08-02.md`'ye de atıf. Kaynak: PR (otonom/T-yapisal-ve-kuyruk-20260919).

Bugünkü kayıp: mentör/menti kıyası `kod-denetimi/strateji-gercek-denetimi-2026-08-20.md` **B.1 (satır 64-85)** ve **B.2 (satır 87-107)**'de duruyordu; `raporlar/panel/` altında arandı, bulunamadı, tur tekrarlandı.

**İlk varsayım yanlıştı.** Belge DOĞRU klasördeydi. `belge-duzeni-rehberi.md` KURAL 2 aynen şöyle diyor:
> `raporlar/kod-denetimi/` → **kodun gerçeğe karşı** denetimi (envanter ↔ kod, **strateji ↔ kod**, kapsamlı denetim, eksik analizi)

`strateji-gercek-denetimi` tam olarak bir "strateji ↔ kod" denetimidir → **kural uygulanmış.**

**Asıl sorun:** `raporlar/` alt klasörleri **iki farklı eksende** tanımlanmış —
`panel/` · `persona/` · `icerik/` **KONU** ekseninde · `kod-denetimi/` · `kesif/` **YÖNTEM** ekseninde.
Bir belge ikisine birden ait olunca (menti personasının kod denetimi) **yöntem** klasörüne yazılıyor, insan **konu** klasöründe arıyor. Kural hangisinin kazanacağını söylemiyor.

**Vaka sanıldığından 5 kat büyük.** Aynı dosya 5 kıyas bölümü taşıyor, **3 ayrı kaynak klasörden** beslenmiş — hiçbiri kendi klasöründen görünmüyor:

| Bölüm | Satır | Kaynak belge | Kaynak klasör | Madde |
|---|---|---|---|---|
| B.1 MENTİ | 64 | `menti-persona-ve-sevdirme` | **persona/** | 13 |
| B.2 MENTÖR | 87 | `mentor-persona-ve-sevdirme` | **persona/** | 14 |
| B.3 STK YÖNETİCİ | 109 | `yonetici-persona` **+** `stk-yonetici-strateji` | **persona/ + panel/ (İKİSİ)** | 27 |
| B.4 PLATFORM ADMİN | 177 | `platform-admin-strateji` | **panel/** | 20 |
| B.5 ADMİN PANEL TASARIM | 232 | `admin-panelleri-tasarim-2026-08-02` | **arsiv/ (4. yer)** | 11 |
| | | | | **85** |

### 💣 Belge kendi kaybını 31 gün önce ÖNGÖRMÜŞ
`strateji-gercek-denetimi-2026-08-20.md:341-350` — §E.2 "Klasör ayrımı önerisi" ve §E.3 **"İsim benzerliği (karışabilecek çiftler)"**, dört çifti tek tek saymış. Öneri yazıldı, **uygulanmadı**, ve öngördüğü kayıp bugün yaşandı.

### İkinci kayıp kanalı: submodule körlüğü
Bazı belgeler `backend/` submodule'ünde yaşıyor. `backend/prisma/senaryo-bankasi-tam.md`'ye **5 sertifika belgesi atıf veriyor**; submodule init edilmediği için çatıda görünmüyor ve "dosya yok" sanılıyor. Dosya duruyor. (Bu turda bir alt-ajan tam bu hataya düştü, orkestratör düzeltti.)
➡️ `docs/` tek başına belge evreni DEĞİL. `backend/prisma/*.md` de sayılmalı.

### Ağırlaştırıcı: `raporlar/` altında INDEX YOK
`kararlar/00-INDEX.md` var; `raporlar/` kökünde **hiç .md yok** (doğrulandı). Rapor tarafında arama = klasör gezme.

---

## B.1 — 🔁 MÜKERRER (aynı iş iki kez, biri diğerini bilmeden)

| # | Bulgu | Dosyalar | Daha yeni | Canonical ÖNERİSİ |
|---|---|---|---|---|
| **M-1** | "~14 backend-var/FE-yok" listesi **iki kez üretildi** | `kod-denetimi/proje-analizi-kapsamli-denetim-2026-08-22.md:45` ↔ `yarim-is-niyet-envanteri-2026-08-23.md:5,36,49` | yarim-is-niyet (1 gün sonra) | **yarim-is-niyet** — kalem başına kod teyidi + 5 yanlış-pozitifi gerekçeli reddetti (14→9). Aynı zamanda 🔀 (bkz. Ç-5) |
| **M-2** | "Ölü kod" **üç kez** sayıldı, üçü birbirine atıf vermeden | `tam-envanter-gercek-durum-2026-08-19.md:28,56` ↔ `proje-analizi-…-08-22.md:166,170` ↔ `yarim-is-niyet-…-08-23` | yarim-is-niyet | **yarim-is-niyet** (niyet + kod teyidi birlikte). Üçü de "3 kesin ölü" diyor — sonuç aynı, emek üç kat |
| **M-3** | `raporlar/kesif/` kalem defteri **iki kez tutuldu** ⭐ | `bilanco/bolumler/T2-B-kesif.md` (2026-08-26, 9 belge, 140 kalem) ↔ bu turun §C analizi | bu tur | **T2-B-kesif kaynak kabul edilmeli**; bu tur yalnız sonradan yazılan **8 belgeyi** ekler (aşağıda ⭐ ile işaretli). Aksi halde **üçüncü kez** aynı defter tutulur |
| **M-4** | `llmRetry.ts` iki kartta | `G10-olu-kod-terk.md` G10-01 ↔ G10-07 | — | ✅ **ZATEN ÇÖZÜLDÜ** — sahip G10-07, `:449` üstü-çizili damgalı. Projenin kendi tespiti |

> ⚠️ **Çürütülen iddia:** "`strateji-gercek-denetimi` + `tam-envanter` + `proje-analizi` aynı işi üç kez yaptı" **DOĞRU DEĞİL.** Kapsam cümleleri ayrık: biri *belge vaadi ↔ kod* (85 madde), biri *iş kuyruğu ↔ kod* (28 iş), biri *teknik/güvenlik bulgu* (6 eksen). Gerçek mükerrerlik yalnız `tam-envanter` ↔ `proje-analizi` arasında, ölü-kod ekseninde (M-2).

## B.2 — 🧩 PARÇALI (aynı konu çok dosyada, indeksi yok)

| # | Bulgu | Dosyalar | Canonical ÖNERİSİ |
|---|---|---|---|
| **P-1** | **Aynı kalem iki numarayla, çapraz-atıfsız** — 7 doğrulanmış çift: madde 119↔G1-22 · 120↔G1-28 · 111↔G2-06 · 121↔G8-05 · 113↔G10-10 · 114↔G10-09 · 116↔G4-38. **47 kart alanı `Numara: NUMARASIZ`** | `kararlar/00-KARAR-TAKIP.md` F.6/F.7 ↔ `bilanco/kararlar/G*.md` | Tek kimlik = **G-numarası** (`otonom/00-KUYRUK.md` zaten onu kullanıyor: 65 G-atıfı ↔ 3 madde-atıfı). Madde tablosuna `=G1-28` sütunu |
| **P-2** | **Kart durumu 3 yerde tutuluyor, indeksi yok** — kart (184) ↔ `00-KARAR-TAKIP` (41/184 = %22) ↔ `otonom/00-KUYRUK` (65/184). Hiçbiri diğer ikisinin kapsamını bilmiyor | aynı üçlü | Kart = durum canonical'i (KURAL 15); diğer ikisi **yalnız pointer** |
| | ✅ **ÇÖZÜLDÜ (2026-09-19):** `docs/kararlar/00-KART-INDEKSI.md` köprü belgesi oluşturuldu — **184/184 kart** tek tabloda: konu · durum · madde no · KUYRUK satırı · **canonical durum kaynağı** (kuyrukta varsa KUYRUK, yoksa G-kartı). Belge durum TUTMAZ, yönlendirir. Kaynak: PR (otonom/T-yapisal-ve-kuyruk-20260919). | | |
| | ✅ **P-1 ÇÖZÜLDÜ (2026-09-19):** 7 doğrulanmış numara çifti (119↔G1-22 · 120↔G1-28 · 111↔G2-06 · 121↔G8-05 · 113↔G10-10 · 114↔G10-09 · 116↔G4-38) çift-yönlü çapraz atıfla bağlandı (`00-KARAR-TAKIP` madde satırı ↔ G-kartı başlığı). | | |
| **P-3** | **"Özet" belge ayrıntıyı KOPYALIYOR** — `00-KARAR-TAKIP` 112 benzersiz kod atıfı taşıyor, G-kartlarının **78'inden fazla**. KURAL 15 ("özet + numara") + KURAL 1 ("kopyalama yok") fiilen ihlal | `00-KARAR-TAKIP.md:87` ↔ `G1-guvenlik-kvkk.md:378-380` | Özet satırı = numara + tek cümle + kart linki |
| **P-4** | "Yönetici" konusu **4 parça, 3 klasör, 0 indeks** | `persona/yonetici-persona` + `panel/stk-yonetici-strateji` + `panel/stk-yonetici-panel-envanteri` + `kod-denetimi/strateji-gercek-denetimi:109-175` | `panel/` altına `00-yonetici-INDEX.md` |
| **P-5** | `panel/` klasörü **yarım denetlenmiş**, bu hiçbir yerde yazmıyor — 2 strateji denetlendi (B.3/B.4), 2 envanter denetlenmedi | `panel/` 4 dosya ↔ `strateji-gercek-denetimi:337` (E.1 "sonraki tur") | panel/ içine denetim-durumu notu |
| **P-6** | `00-OKUMA-REHBERI` ↔ `00-SAYIM` **aynı 11-grup/260 tablosunu** iki yerde tutuyor | `bilanco/kararlar/` | `00-SAYIM`; REHBERI toplamlara atıf versin |

## B.3 — 🔀 ÇELİŞKİLİ
Yukarıda **§"BU BELGELERE GÜVENME"** bölümünde tablo halinde: Ç-1 (sunucu sertleştirme ⬜↔🔴) · Ç-2 (k-anonimlik ⬜↔🟡) · Ç-3 (196/259/260) · Ç-4 (manuel eşleştirme) · Ç-5 (14↔9).

## B.4 — ⭐ `raporlar/icerik/` HAKKINDA KESİN CEVAP

**Soru:** üç sertifika belgesi aynı içerik mi, farklı oturumların parçaları mı, birbirini geçersiz kılan sürümler mi?

### ✅ VERDİKT: **(a) FARKLI PARÇALAR.** Mükerrer DEĞİL, sürüm DEĞİL. Üçü birleşince tam seti verir.

| Belge | KONU | Senaryo | Şık |
|---|---|---|---|
| `sertifika-oturum1-4-kritik-konu-2026-09-08.md:25,78,130,181` | **1-4** (Geri bildirim · Sınır · Gizlilik · Kriz — hepsi 🔴 red-line) | 8 | 32 |
| `sertifika-oturum2-3-konu-2026-09-08.md:25,94,158` | **5-7** (Kapasite · Süreklilik · Aktif dinleme) | 6 | 24 |
| `sertifika-oturum3-4-konu-2026-09-08.md:31,90,153,213` | **8-11** (Buldurmak · Beklenti · Farklılık · Bitirme) | 8 | 32 |
| | **11** | **22** | **88** |

**Kanıt (orkestratör elle doğruladı):**
1. **KONU numaraları ayrık ve ardışık — kesişim SIFIR.** 22 senaryo başlığının tamamı tekil.
2. **Belgeler birbirini "kardeş" ilan ediyor, KALEM numaraları devam ediyor:** 1-10 → 11-16 → 17-19 (`oturum2:6-9`, `oturum3:6-9`). Mükerrer iş olsa numara sıfırdan başlardı.
3. **Kümülatif sayaç üçüncüde kapanıyor:** `oturum2:384` "Şu ana kadar 7 konu" (4+3 ✓) → `oturum3:11,480` "⭐ BU BELGEYLE SERİ TAMAMLANIR: 11/22/88".
4. **"oturum1/2/3" = içerik ÜRETİM oturumu, sınav oturumu DEĞİL.** Üçünün künyesi: *"📸 Üretim: 2026-09-08 PO+strateji oturumu"*. Sınav tek oturumda 8 soru (`00-KARAR-TAKIP.md:281`).

⚠️ **TEK İSTİSNA — KALEM katmanı kısmî sürümdür:** KALEM 1, 5, 13, 15'in **güncel hali yalnız Oturum 3'te** (`oturum3:414-461`, `:455`'te üstü-çizili düzeltme). Senaryolar için üçü de geçerli; KALEM okuyan O1/O2'deki eski tanımla kalmamalı.

### Diğer belgelerle ilişki (karma)
- `faz6-ogrenme-ve-sertifika-2026-09-03.md` → **§8 kısmen GEÇERSİZ**: 20 senaryosunun 15'i oturum serisine taşındı, 5'i elendi (`oturum3:485` kaynak tablosu). **AMA §1-7 ve §9-12 TEK KAYNAK** — 8 aşamalık öğrenme yolculuğu (`:197-356`) dahil. **"Bayat" DENMEMELİ.**
- `bolumler/03-sertifika.md` → **ters yönde belge**: as-is **kod fotoğrafı** (`seed-certification.ts`). Oturum serisi = to-be. İkisi birlikte lazım.
- `senaryo-bankasi-2026-09-03.md` → **İLGİSİZ**. 39 **karakter** senaryosu (Big Five/OCEAN), sertifika değil. `00-INDEKS.md:52` bu karışıklığı zaten uyarıyor. Tek risk: **isim benzerliği**.
- `tam-soru-dokumu` ↔ `sorular-po-inceleme` → aynı 68 sorunun **teknik dökümü** ve **PO işaretleme formu**. Mükerrer değil; `tam-soru-dokumu:9` bilinçli olarak metni tekrar etmediğini yazıyor.
- `arsiv/icerik/` (6 dosya) → **doğru damgalanmış sürüm arşivi.** Örnek pratik, yapılacak iş yok.

**Soy ağacı:** arşiv (08-15) → `bolumler/03-sertifika` (as-is kod) → faz6 §8 (taslak) → oturum1+2+3 (⭐ güncel). Her nesil öncekini **kaynak gösterip dönüştürüyor** — evrim, mükerrer değil (`oturum3:486`: *"20 sahne sunuldu, 5'i kullanıldı (%25)"*).

---

# BÖLÜM C — `raporlar/kesif/` DURUM ANALİZİ (17 belge)

> ⚠️ **KRİTİK AYRIM (bu bölümün tüm değeri buna bağlı):** 📸 DONDURULMUŞ bir keşif belgesi **"yarım kalmış iş" DEĞİLDİR** — o bir fotoğraftır, işi bitmiştir. "Öksüz" sayılan, **bulguları hiçbir karara/işe bağlanmamış** olanlardır. Ölçüt "belge güncel mi" değil, "bulgular bir yere AKTI mı".

## C.0 — ⭐ ÖNCE: bu defter ikinci kez tutuluyor
`bilanco/bolumler/T2-B-kesif.md` (358 satır, 2026-08-26) **tam olarak bu işi yaptı**: belge-başına okuma tablosu + 140 kalemlik `| kaynak | kalem | numara | durum | kanıt |` defteri — ama **9 belge** için.
Bugünkü 17'nin **8'i o defterden SONRA yazıldı** ve hiç bilanço görmedi:
`eslestirme-motoru-2026-08-27` · `profil-envanteri-2026-08-29` · `yetki-haritasi-2026-08-29` · `sema-drift-2026-08-30` · `icerik-onkosul-2026-09-03` · `faz5-onkosul-2026-09-04` · `faz5-veri-akisi-2026-09-08` · `hayalet-envanter-2026-09-19`
➡️ **Sonraki tur 17'yi baştan saymamalı** — T2-B-kesif kaynak kabul edilip yalnız bu 8'i eklemeli. Aksi halde **üçüncü kez** aynı defter tutulur (🔁 M-3).

## C.1 — Durum tablosu

| belge | cevabı bulunmuş mu | bulgular bağlandı mı (kanıt) | öksüz |
|---|---|---|---|
| `belge-mimarisi-ve-merge-cozumu-onerileri-2026-08-19` | ✅ | ✅ **ÇOK GÜÇLÜ** — 9 öneriden 7'si uygulandı: Taslak A→`CLAUDE.md` "pointer bump DANS ÖNLEME" · Taslak B→"SERİLEŞTİR" · INDEX→madde 123 ✅ · PROJECT_STATUS→madde 122 ✅ · okuma yolu→`00-INDEX.md:17`. 1 PO iptali, 1 kısmi | ❌ |
| `yetki-haritasi-2026-08-29` | ✅ (187 uç, 0 cross-tenant) | ✅ TAM — `10-yol-haritasi.md:97` Y1-Y6 = madde 131-136, IDOR testleriyle kapatıldı (backend PR #60) | ❌ |
| `sema-drift-2026-08-30` | ✅ (+ çözüm uygulanmış, PR #63) | ✅ `00-KARAR-TAKIP.md:644,666` F.8 ÇÖZÜLDÜ · S26 ⬜ · S27 ✅ | ❌ |
| `faz5-veri-akisi-kesfi-2026-09-08` | ✅ | ✅ madde 101 güncellendi · S33 7. karar · madde 161 ✅ | ❌ |
| `faz5-onkosul-kesfi-2026-09-04` | ✅ (11 iş + 6 karar) | ✅ madde 101 + S33 kaynağı · `otonom/00-KUYRUK` F-09/F-11 | ❌ |
| `eslestirme-motoru-kesfi-2026-08-27` | ✅ (14 kalem listesi) | ✅ **6 numara-adayının 6'sı da numaralandı** → madde 125-130 | ❌ |
| `hayalet-envanter-2026-09-19` | ✅ (35/4/3 + triyaj) | ✅ KARAR-12..17 olarak `otonom/01-KARARLAR.md`'ye girmiş | ❌ |
| `icerik-onkosul-kesifleri-2026-09-03` | ✅ | ✅ madde 73 kapsam daraltması bu belgenin §D'si kanıt gösterilerek yapıldı | ❌ |
| `profil-envanteri-2026-08-29` | ✅ (30/30 kanıtlı) | ✅ S21 ✅ YAPILDI · madde 119 + G1-22 | ❌ |
| `kart-havuz-backend-envanteri-2026-08-02` | ✅ | ✅ F1 ✅ CANLIDA · madde 7-A ✅ CANLIDA | ❌ |
| `katilim-modeli-mevcut-durum-notu-2026-08-02` | ✅ (net: karşılamıyor) | ✅ madde 17 🔴 + `10-yol-haritasi.md:254` | ❌ |
| `tema-durum-ve-landing-maliyeti-2026-08-02` | ✅ | ✅ md.5 ✅ ZATEN MEVCUT · madde 22 ⏸️ canlı-sonrası | ❌ |
| `teshis-raporu-2026-08-02` | ✅ (en geniş) | 🟡 geniş ama 3 bulgu izsiz (B10/B11/B12) | 🟡 3 |
| `hayalet-backend-2026-08-02` | ✅ | 🟡 dağınık ama var (iceBreaker · llmRetry ✅ · rewardPenalty KARAR-12) | 🟡 3 |
| `mentor-karti-rakip-analizi-2026-08-02` | ✅ + PO'nun 6 kararı | 🟡 kart işi bağlı, **§5'in 5 açık sorusu + PO kararı 5 izsiz** | 🟡 6 |
| `kapasite-analizi-2026-08-02` | ✅ (3 darboğaz) | 🟡 **ZAYIF** — 3 darboğazın hiçbiri numaralanmamış | 🟡 3-4 |
| `depo-denetimi-2026-08-02` | ✅ | 🟡 `.env.backup-anaDB`→madde 121 ⬜; `Menti Mentör proje/` izsiz | 🟡 1 |

**17 belgenin hiçbiri tümüyle öksüz değil.** 12'si tam bağlı · 5'inde kısmi öksüz bulgu var — ve **bu 5'ten 4'ü aynı ailedendir: 2026-08-02 ilk keşif turu.**

## C.2 — ÖKSÜZ BULGULAR (19 kalem — 5 takip belgesinde numara izi YOK)

⛔ **Kuyruğa işlenmedi, karar kartı açılmadı, hiçbir dosyaya yazılmadı. Yalnızca liste.**

| # | Bulgu | Kaynak |
|---|---|---|
| 1 | Kökteki `Menti Mentör proje/` klasörünün akıbeti (0-byte `Untitled`) | `depo-denetimi-2026-08-02.md:18-23` |
| 2 | Neon `connection_limit` ayarsız + mail cron seri `await` (~30-40 eşzamanlıda "too many connections") | `kapasite-analizi-2026-08-02.md:19-24` |
| 3 | Eşleştirmede cache yok + `take: 500` sabit kırpma (admin yanlış sayı görebilir) | `kapasite-analizi-2026-08-02.md:26-31` |
| 4 | In-process `node-cron` çok-instance deploy'da **cron duplication** riski | `kapasite-analizi-2026-08-02.md:38` |
| 5 | `rateLimiter.ts` tenant başına tek kaba bucket → meşru kullanıcı 429 alabilir | `kapasite-analizi-2026-08-02.md:36` |
| 6 | `LLM_PROVIDER` env anahtarı duruyor ama LLM devre dışı | `hayalet-backend-2026-08-02.md:46` |
| 7 | `pending-approval` + `onboarding/stk/pending-review` sayfaları nav'dan linksiz olabilir | `hayalet-backend-2026-08-02.md:49` |
| 8 | `NotificationService` 7 fonksiyonluk stub, gerçek push provider yok | `hayalet-backend-2026-08-02.md:54` |
| 9 | **B10** Sekme geçişi yavaş: `useApiClient` her render'da yeni `api` → `useQuery([api])` her geçişte refetch | `teshis-raporu-2026-08-02.md:29` |
| 10 | **B11** Logout UI'ya bağlı değil (`AuthProvider.tsx:167-174` var, buton yok) | `teshis-raporu-2026-08-02.md:30` |
| 11 | **B12** Sol alt kullanıcı kartı yok | `teshis-raporu-2026-08-02.md:31` |
| 12 | Kartta DISC nasıl gösterilsin (harf/renk/kelime) | `mentor-karti-rakip-analizi-2026-08-02.md:87` |
| 13 | Sektör etiketi kaç tane, fazlası "+N" mı | `…rakip-analizi:88` |
| 14 | Sayfa başına kaç kart (15/18/20) | `…rakip-analizi:89` |
| 15 | Havuzda arama + filtre bu turda mı sonraki turda mı | `…rakip-analizi:90` |
| 16 | Menti kartı mentör kartıyla aynı mı farklı mı | `…rakip-analizi:91` |
| 17 | **PO kararı 5** — "serbest mesajlaşma ŞİMDİLİK YOK, eşleşme sonrasına ertelendi" hiçbir takip belgesine geçmemiş | `…rakip-analizi:116-119` |
| 18 | `hayalet-envanter`'in kendi "sonraki tura" 2 kalemi kuyrukta satır almamış: `/api/requests` GET · `Tenant.verifiedBy` audit | `hayalet-envanter-2026-09-19.md:113` |
| 19 | Kalan şema drift: `updatedAt` DEFAULT ×4 tablo · `LearningStage.tenantId` onDelete | `00-KARAR-TAKIP.md:666` (yazılı ama **numarasız** — yarı-öksüz) |

⚠️ **TEYİT GEREK:** 9-11 (B10/B11/B12) muhtemelen aradan koda girmiştir. Bu tur `frontend/`/`backend/` **kodu okumadı**; kanıtlı olan yalnız "5 takip belgesinde numara izi YOK". Aynı belirsizlik `00-KARAR-TAKIP.md:322` **madde 173**'ün konusudur.

---

# BÖLÜM A — TAM ENVANTER (151 dosya)

> **Nasıl üretildi (uydurma yok):** `satır` = `wc -l` · `konu` = dosyanın ilk `#` başlığı · `tür` = dosyanın **kendi üst-etiketi** (🔄/📸/🗄️; yoksa ❓) · `tazelik` = belgenin **İÇİNDEKİ en geç tarih** → 2026-09-20'ye gün. Dosya adındaki tarih farklıysa `ad:YYYY-MM-DD` ile ayrıca yazıldı.
> ⚠️ **Tazelik uyarısı:** iç tarih bazen bir **atıftır**, düzenleme değil (bkz. §"BU BELGELERE GÜVENME" md.2). Kesin tazelik için belgenin son ⚠️ GÜNCELLEME satırına bakın.
> ⛔ `otonom/` dosyalarının **içeriği okunmadı** (başka tur orada çalışıyor) — yalnız satır sayısı verildi.


### `docs/` — 1 dosya / 270 satır

| dosya | satır | konu | tür | tazelik |
|---|---:|---|---|---|
| `00-BELGE-HARITASI.md` | 275 | 📍 BELGE HARİTASI — docs/ tam envanteri | 🔄 | 2026-09-20 (0g) |

### `docs/kararlar/` — 7 dosya / 2084 satır

| dosya | satır | konu | tür | tazelik |
|---|---:|---|---|---|
| `00-CIKIS-PLANI.md` | 120 | 00 — CANLI ÇIKIŞ PLANI (kullanıcı almaya başlamak için NE  | 🔄 | 2026-08-25 (26g) |
| `00-INDEX.md` | 220 | MENTİMENTOR / SİVİLKAPASİTE — BELGE HARİTASI (INDEX) | 🔄 | 2026-08-30 (21g) |
| `00-KARAR-TAKIP.md` | 833 | 00 — KARAR & İŞ TAKİBİ (NE KALDI · NE YARIM · NE UNUTULDU) | 🔄 | 2026-09-19 (1g) |
| `09-DURUM.md` | 458 | 09 — GÜNCEL DURUM (ŞU AN NEREDEYİZ) | 🔄 | 2026-09-19 (1g) |
| `10-yol-haritasi.md` | 314 | MentiMentor — Yol Haritası (SIRADAKİ İŞLER) · v1/v2 önceli | 🔄 | 2026-09-09 (11g) |
| `10-yol-tamamlananlar.md` | 68 | Yol Haritası — Tamamlanan v1 İşleri (kayıt) | 🔄 | 2026-08-26 (25g) |
| `dokploy-foto-volume-talimati.md` | 71 | Dokploy — Fotoğraf İçin Kalıcı Disk (MERGE ÖNCESİ ŞART) | 📸 | ❓ tarih yok |

### `docs/kararlar/konu/` — 15 dosya / 2025 satır

| dosya | satır | konu | tür | tazelik |
|---|---:|---|---|---|
| `01-urun-vizyonu.md` | 37 | 01 — ÜRÜN VİZYONU | 🔄 | 2026-08-02 (49g) |
| `02-mimari-ve-altyapi.md` | 57 | 02 — MİMARİ VE ALTYAPI | 🔄 | 2026-08-23 (28g) |
| `03-psikometri-ve-algoritma.md` | 64 | 03 — PSİKOMETRİ VE EŞLEŞTİRME ALGORİTMASI | 🔄 | 2026-08-17 (34g) |
| `04-guvenlik-ve-kvkk.md` | 68 | 04 — GÜVENLİK VE KVKK | 🔄 | 2026-08-23 (28g) |
| `05-ozellikler-ve-paneller.md` | 60 | 05 — ÖZELLİKLER VE PANELLER | 🔄 | 2026-08-14 (37g) |
| `06-tasarim-ux.md` | 66 | 06 — TASARIM VE UX | 🔄 | 2026-08-28 (23g) |
| `07-calisma-tarzi.md` | 58 | 07 — ÇALIŞMA TARZI VE PROMPT FELSEFESİ | 🔄 | 2026-08-28 (23g) |
| `08-acik-sorular.md` | 58 | 08 — AÇIK SORULAR VE KARARA BAĞLANMAYANLAR | 🔄 | 2026-08-28 (23g) |
| `11-tasarim-kararlari-yasam-dongusu-ve-disc.md` | 148 | 11 — Tasarım Kararları: Kullanıcı Yaşam Döngüsü & DISC Gös | 🔄 | 2026-08-16 (35g) |
| `belge-duzeni-rehberi.md` | 106 | Belge Düzeni Rehberi | 🔄 | 2026-08-23 (28g) |
| `chat-v1-teslim.md` | 72 | Chat v1 — Teslim Dökümanı (menti↔mentör talep mesajlaşma) | 📸 | 2026-08-06 (45g) |
| `consent-modeli-plani-2026-08-28.md` | 92 | Consent (Rıza) Modeli — Şema Tasarımı + Migration Planı | 📸 | 2026-08-28 (23g) |
| `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md` | 232 | Tasarım: Eşleşme Sonrası Değerlendirme + Metrik Takip + Ot | 🔄 | 2026-08-28 (23g) · ad:2026-08-19 |
| `degerlendirme-sistemi-tasarim-2026-08-27.md` | 774 | Değerlendirme + Eşleştirme Sistemi — Tasarım Belgesi | ❓ | 2026-09-04 (16g) · ad:2026-08-27 |
| `tasarim-kararlari-admin-2026-08-11.md` | 133 | STK Admin Paneli — Tasarım Kararları (2026-08-11) | 🔄 | 2026-08-11 (40g) |

### `docs/kararlar/konu/kvkk-metinleri/` — 10 dosya / 437 satır

| dosya | satır | konu | tür | tazelik |
|---|---:|---|---|---|
| `00-AVUKAT-KONTROL-DOSYASI.md` | 71 | 📋 AVUKAT KONTROL DOSYASI (KVKK belge paketi kapağı) | ❓ | 2026-08-26 (25g) |
| `01-aydinlatma-metni.md` | 55 | Aydınlatma Metni (KVKK Md.10) | ❓ | 2026-08-26 (25g) |
| `02-acik-riza-metni.md` | 43 | Açık Rıza Metni | ❓ | 2026-08-26 (25g) |
| `03-gizlilik-politikasi.md` | 47 | Gizlilik Politikası | ❓ | 2026-08-25 (26g) |
| `04-cerez-politikasi.md` | 31 | Çerez Politikası | ❓ | 2026-08-25 (26g) |
| `05-saklama-imha-politikasi.md` | 39 | Kişisel Veri Saklama ve İmha Politikası | ❓ | 2026-08-26 (25g) |
| `06-ilgili-kisi-basvuru-formu.md` | 42 | İlgili Kişi Başvuru Formu ve Usulü (KVKK Md.11 / Md.13) | ❓ | 2026-08-25 (26g) |
| `07-kullanim-kosullari.md` | 39 | Kullanım Koşulları | ❓ | 2026-08-25 (26g) |
| `08-veri-isleyen-sozlesmesi-sablonu.md` | 47 | Veri İşleyen (Veri İşleme) Sözleşmesi — ŞABLON | ❓ | 2026-08-26 (25g) |
| `README.md` | 23 | KVKK Belge Paketi — klasör rehberi | ❓ | 2026-08-26 (25g) |

### `docs/kararlar/oz-denetim/` — 7 dosya / 1126 satır

| dosya | satır | konu | tür | tazelik |
|---|---:|---|---|---|
| `belge-aksiyon-denetimi-2026-08-11.md` | 315 | Belge-Aksiyon Denetimi — "Kararlar aksiyona geçti mi?" (20 | 📸 | 2026-08-14 (37g) · ad:2026-08-11 |
| `belge-denetimi-2026-08-10.md` | 106 | Belge Denetimi — 09-DURUM.md + 10-yol-haritasi.md (2026-08 | 📸 | 2026-08-10 (41g) |
| `belge-temizlik-haritasi-2026-08-14.md` | 145 | Belge Temizlik Haritası | 🔄 | 2026-08-14 (37g) |
| `durum-panosu-2026-08-14.md` | 159 | 🎛️ DURUM PANOSU — Kararlar Tek Bakışta | 🔄 | 2026-08-28 (23g) · ad:2026-08-14 |
| `karar-statu-haritasi-2026-08-14.md` | 216 | Karar Statü Haritası | 📸 | 2026-08-14 (37g) |
| `stk-admin-bulgu-envanteri-2026-08-11.md` | 63 | STK Admin Paneli — 13 Bulgu Envanteri (2026-08-11) | 📸 | 2026-08-11 (40g) |
| `unutulmus-niyet-envanteri-2026-08-10.md` | 122 | Unutulmuş Niyet Envanteri (2026-08-10) | 📸 | 2026-08-10 (41g) |

### `docs/devir/` — 8 dosya / 785 satır

| dosya | satır | konu | tür | tazelik |
|---|---:|---|---|---|
| `01-felsefe-ve-calisma-tarzi.md` | 95 | 01 — FELSEFE VE ÇALIŞMA TARZI (yeni sohbet önce bunu oku) | 📸 | 2026-08-28 (23g) |
| `02-proje-durumu.md` | 79 | 02 — PROJE DURUMU (şu an nerede, kanıtlı) | 📸 | 2026-08-20 (31g) |
| `03-kvkk-is-paketi.md` | 60 | 03 — KVKK İŞ PAKETİ (canlı öncesi kritik — yol haritasında | 📸 | 2026-08-20 (31g) |
| `04-13-admin-bulgusu.md` | 73 | 04 — STK ADMİN PANELİ: 13 BULGU (yol haritası A — öncelik  | 📸 | 2026-08-20 (31g) |
| `05-bekleyen-kararlar-ve-manuel.md` | 90 | 05 — BEKLEYEN KARARLAR VE ÜRÜN SAHİBİ MANUEL İŞLERİ | 📸 | 2026-08-20 (31g) |
| `06-devir-kilavuzu.md` | 79 | 06 — DEVİR KILAVUZU (yeni sohbet: ilk ne yap) | 📸 | 2026-08-20 (31g) |
| `07-oturum-gunlugu.md` | 139 | 07 — OTURUM GÜNLÜĞÜ (yaşayan devir kaydı) | 🔄 | 2026-09-20 (0g) |
| `08-oturum-tezi-2026-08-28.md` | 170 | 08 — OTURUM TEZİ (2026-08-28): kararların ardındaki muhake | 📸 | 2026-08-29 (22g) · ad:2026-08-28 |

### `docs/otonom/` — 3 dosya / 672 satır

| dosya | satır | konu | tür | tazelik |
|---|---:|---|---|---|
| `00-KUYRUK.md` | 161 | (okunmadı — başka tur çalışıyor) | ⛔ | — |
| `01-KARARLAR.md` | 390 | (okunmadı — başka tur çalışıyor) | ⛔ | — |
| `02-ILERLEME.md` | 121 | (okunmadı — başka tur çalışıyor) | ⛔ | — |

### `docs/raporlar/panel/` — 4 dosya / 589 satır

| dosya | satır | konu | tür | tazelik |
|---|---:|---|---|---|
| `platform-admin-panel-envanteri-2026-08-02.md` | 136 | Platform Admin Paneli — Envanter (Keşif) | 📸 | 2026-08-02 (49g) |
| `platform-admin-strateji-2026-08-02.md` | 143 | PLATFORM ADMIN PANELİ — STRATEJİ (İDEAL TASARIM) | 📸 | 2026-08-28 (23g) · ad:2026-08-02 |
| `stk-yonetici-panel-envanteri-2026-08-02.md` | 167 | STK Yönetici (Tenant Admin) Paneli — Envanter (Keşif) | 📸 | 2026-08-02 (49g) |
| `stk-yonetici-strateji-2026-08-02.md` | 143 | STK YÖNETİCİ PANELİ — STRATEJİ (İDEAL TASARIM) | 📸 | 2026-08-14 (37g) · ad:2026-08-02 |

### `docs/raporlar/persona/` — 3 dosya / 414 satır

| dosya | satır | konu | tür | tazelik |
|---|---:|---|---|---|
| `menti-persona-ve-sevdirme-2026-08-02.md` | 149 | MENTİ PERSONASI + SEVDİRME STRATEJİSİ | 📸 | 2026-08-02 (49g) |
| `mentor-persona-ve-sevdirme-2026-08-02.md` | 127 | MENTÖR PERSONASI + SEVDİRME STRATEJİSİ | 📸 | 2026-08-02 (49g) |
| `yonetici-persona-ve-metrikler-2026-08-02.md` | 138 | STK YÖNETİCİ PERSONASI + METRİK TASLAĞI | 📸 | 2026-08-02 (49g) |

### `docs/raporlar/kod-denetimi/` — 8 dosya / 1286 satır

| dosya | satır | konu | tür | tazelik |
|---|---:|---|---|---|
| `degerlendirme-test-soru-envanteri-2026-08-15.md` | 120 | Değerlendirme / Test / Soru Sistemi — Envanter Raporu (202 | 📸 | 2026-08-15 (36g) |
| `eksikler-derinlestirilmis-2026-08-15.md` | 77 | Değerlendirme/Test Sistemi — Derinleştirilmiş Eksik Analiz | 📸 | 2026-08-28 (23g) · ad:2026-08-15 |
| `kvkk-veri-aktarim-envanteri-2026-08-25.md` | 115 | KVKK Veri Aktarım Envanteri — kod-kanıtlı (2026-08-25) | 📸 | 2026-08-26 (25g) · ad:2026-08-25 |
| `proje-analizi-kapsamli-denetim-2026-08-22.md` | 225 | Proje Analizi — Kapsamlı Denetim Raporu | 📸 | 2026-08-22 (29g) |
| `strateji-gercek-denetimi-2026-08-20.md` | 376 | STRATEJİ ↔ GERÇEK DENETİMİ (DERİN) | 📸 | 2026-08-20 (31g) |
| `tam-belge-taramasi-2026-08-23.md` | 82 | Tam-Belge Taraması — 40+ Belgeden Kayıp Madde Çıkarımı (20 | 📸 | 2026-08-23 (28g) |
| `tam-envanter-gercek-durum-2026-08-19.md` | 227 | 📸 DONDURULMUŞ — Tam Gerçek Durum Envanteri (Belge vs Kod) | 📸 | 2026-08-19 (32g) |
| `yarim-is-niyet-envanteri-2026-08-23.md` | 64 | Yarım-İş & Niyet Envanteri — Kod Arkeolojisi (2026-08-23) | 🔄 | 2026-08-23 (28g) |

### `docs/raporlar/kesif/` — 17 dosya / 2613 satır

| dosya | satır | konu | tür | tazelik |
|---|---:|---|---|---|
| `belge-mimarisi-ve-merge-cozumu-onerileri-2026-08-19.md` | 400 | Belge Mimarisi + Merge/Submodule Sürtünmesi — Öneri Raporu | ❓ | 2026-08-23 (28g) · ad:2026-08-19 |
| `depo-denetimi-2026-08-02.md` | 58 | Depo Denetimi Raporu | 📸 | 2026-08-02 (49g) |
| `eslestirme-motoru-kesfi-2026-08-27.md` | 200 | EŞLEŞTİRME MOTORU + SEKTÖR/ETİKET DERİN KEŞFİ | 📸 | 2026-08-29 (22g) · ad:2026-08-27 |
| `faz5-onkosul-kesfi-2026-09-04.md` | 259 | Faz 5 Ön Koşul Keşfi — OCEAN üretimi + 39 senaryonun koda  | 📸 | 2026-09-04 (16g) |
| `faz5-veri-akisi-kesfi-2026-09-08.md` | 396 | Faz 5 Veri Akışı Keşfi — Üç DISC yolu + ağırlık modeli (20 | 📸 | 2026-09-08 (12g) |
| `hayalet-backend-2026-08-02.md` | 71 | Hayalet-Backend Raporu | 📸 | 2026-08-02 (49g) |
| `hayalet-envanter-2026-09-19.md` | 113 | 📸 HAYALET ENVANTER — Niyet Arkeolojisi + Triyaj (2026-09-1 | 📸 | 2026-09-19 (1g) |
| `icerik-onkosul-kesifleri-2026-09-03.md` | 162 | İçerik Ön-Koşul Keşifleri (2026-09-03) | 📸 | 2026-09-03 (17g) |
| `kapasite-analizi-2026-08-02.md` | 59 | Kapasite / Ölçeklenme Analizi | 📸 | 2026-08-02 (49g) |
| `kart-havuz-backend-envanteri-2026-08-02.md` | 205 | Kart / Havuz / Uyum / Niyet Mektubu / Foto — Backend Envan | 📸 | 2026-08-02 (49g) |
| `katilim-modeli-mevcut-durum-notu-2026-08-02.md` | 46 | Katılım Modeli — Mevcut Durum Notu (İŞ 5, kod yazılmadı) | 📸 | 2026-09-08 (12g) · ad:2026-08-02 |
| `mentor-karti-rakip-analizi-2026-08-02.md` | 132 | MENTÖR / MENTİ KARTI — RAKİP ANALİZİ | 📸 | 2026-08-02 (49g) |
| `profil-envanteri-2026-08-29.md` | 128 | PROFİL / HEDEF VERİSİ ENVANTERİ (S21) | 📸 | 2026-08-29 (22g) |
| `sema-drift-2026-08-30.md` | 128 | ŞEMA DRIFT KEŞFİ — Fiziksel DB ↔ schema.prisma (F.8) | 📸 | 2026-08-30 (21g) |
| `tema-durum-ve-landing-maliyeti-2026-08-02.md` | 67 | Tema Durumu + Landing Maliyeti | 📸 | 2026-09-08 (12g) · ad:2026-08-02 |
| `teshis-raporu-2026-08-02.md` | 114 | MentiMentor — Kapsamlı Teşhis + Yol Haritası Raporu | 📸 | 2026-08-02 (49g) |
| `yetki-haritasi-2026-08-29.md` | 75 | YETKİ HARİTASI — Tüm Endpoint'lerin Yetki Denetimi (FAZ 3b | 📸 | 2026-08-29 (22g) |

### `docs/raporlar/icerik/` — 12 dosya / 4189 satır

| dosya | satır | konu | tür | tazelik |
|---|---:|---|---|---|
| `00-INDEKS.md` | 65 | İçerik Belgeleri İndeksi — docs/raporlar/icerik/ | 🔄 | 2026-09-08 (12g) |
| `arketip-ve-yaklasim-icerigi-2026-09-03.md` | 473 | Arketip Kartları, Yaklaşım İçeriği ve Ölçme Kararları | 📸 | 2026-09-04 (16g) · ad:2026-09-03 |
| `eslesme-uyum-po-inceleme-2026-08-26.md` | 91 | Eşleştirme Uyum Tablosu — Ürün Sahibi İncelemesi (2026-08- | 📸 | 2026-08-28 (23g) · ad:2026-08-26 |
| `faz6-ogrenme-ve-sertifika-2026-09-03.md` | 674 | Faz 6 — Öğrenme Yolculuğu ve Sertifika İçeriği | 📸 | 2026-09-04 (16g) · ad:2026-09-03 |
| `kod-kalemleri-2026-09-03.md` | 149 | Kod Kalemleri Envanteri + Açık Yapısal Kalemler (2026-09-0 | 🔄 | 2026-09-03 (17g) |
| `menti-yolculugu-ve-eslesme-metinleri-2026-09-03.md` | 433 | Menti Yolculuğu, Eşleşme Detayı ve Ret/Bekleme Metinleri | 📸 | 2026-09-04 (16g) · ad:2026-09-03 |
| `senaryo-bankasi-2026-09-03.md` | 407 | Senaryo Bankası — 39 Senaryo · 117 Şık | 📸 | 2026-09-04 (16g) · ad:2026-09-03 |
| `sertifika-oturum1-4-kritik-konu-2026-09-08.md` | 408 | Sertifika İçeriği — Oturum 1: 4 Kritik Konu (2026-09-08) | ❓ | 2026-09-08 (12g) |
| `sertifika-oturum2-3-konu-2026-09-08.md` | 397 | Sertifika İçeriği — Oturum 2: 3 Konu (2026-09-08) | ❓ | 2026-09-08 (12g) |
| `sertifika-oturum3-4-konu-2026-09-08.md` | 529 | Sertifika İçeriği — Oturum 3: 4 Konu (2026-09-08) · SERİ T | ❓ | 2026-09-08 (12g) |
| `sorular-po-inceleme-2026-08-26.md` | 405 | Soru İnceleme — Ürün Sahibi İçin (2026-08-26) | 📸 | 2026-08-28 (23g) · ad:2026-08-26 |
| `tam-soru-dokumu-2026-08-26.md` | 158 | Tam Soru Dökümü + Puanlama/Felsefe Analizi (2026-08-26) | 📸 | 2026-08-26 (25g) |

### `docs/raporlar/icerik/bolumler/` — 5 dosya / 1153 satır

| dosya | satır | konu | tür | tazelik |
|---|---:|---|---|---|
| `01-disc.md` | 206 | İçerik Dökümü — DISC Soruları (2026-08-26) | 📸 | 2026-08-26 (25g) |
| `02-sjt.md` | 109 | İçerik Dökümü — SJT (Durumsal Yargı Testi) (2026-08-26) | 📸 | 2026-08-26 (25g) |
| `03-sertifika.md` | 363 | İçerik Dökümü — Sertifika Senaryoları (2026-08-26) | 📸 | 2026-08-26 (25g) |
| `04-ogrenme-kurumozel.md` | 262 | İçerik Dökümü — Öğrenme Yolculuğu + Kurum-Özel Soru Altyap | 📸 | 2026-08-26 (25g) |
| `05-felsefe-motoru.md` | 213 | İçerik Dökümü — Puanlama ve Felsefe Motoru (2026-08-26) | 📸 | 2026-08-26 (25g) |

### `docs/raporlar/bilanco/` — 4 dosya / 1175 satır

| dosya | satır | konu | tür | tazelik |
|---|---:|---|---|---|
| `belge-bilancosu-2026-08-26.md` | 235 | BELGE BİLANÇOSU — NİHAİ RAPOR (4 tur) | 🔄 | 2026-08-27 (24g) · ad:2026-08-26 |
| `bilanco-po-ozet-2026-08-26.md` | 149 | BELGE BİLANÇOSU — ÜRÜN SAHİBİ ÖZETİ | ❓ | 2026-08-27 (24g) · ad:2026-08-26 |
| `karar-defteri-2026-08-26.md` | 475 | BELGE BİLANÇOSU — KARAR DEFTERİ (benzersiz/tekilleştirilmi | 📸 | 2026-08-26 (25g) |
| `tekrar-onleme-2026-08-26.md` | 316 | BELGE BİLANÇOSU — TUR 4 / EK-C: TEKRAR ÖNLEME (teşhis + ku | 🔄 | 2026-08-27 (24g) · ad:2026-08-26 |

### `docs/raporlar/bilanco/bolumler/` — 16 dosya / 3684 satır

| dosya | satır | konu | tür | tazelik |
|---|---:|---|---|---|
| `T1-A-canonical.md` | 230 | BELGE BİLANÇOSU — TUR 1 / GRUP A (canonical takip belgeler | 📸 | 2026-08-26 (25g) |
| `T1-B1-kararlar-kok.md` | 36 | BELGE BİLANÇOSU — TUR 1 / GRUP B1 (kararlar/ kök geri kala | 📸 | 2026-08-26 (25g) |
| `T1-B2-kararlar-konu.md` | 326 | BELGE BİLANÇOSU — TUR 1 / GRUP B2 (kararlar/konu — 13 belg | 📸 | 2026-08-26 (25g) |
| `T1-B3-kararlar-ozdenetim.md` | 320 | BELGE BİLANÇOSU — TUR 1 / GRUP B3 (docs/kararlar/oz-deneti | 🔄 | 2026-08-26 (25g) |
| `T2-A-raporlar-kok.md` | 29 | BELGE BİLANÇOSU — TUR 2 / GRUP A (raporlar/ kök) | 📸 | 2026-08-26 (25g) |
| `T2-B-kesif.md` | 358 | BELGE BİLANÇOSU — TUR 2 / GRUP B (docs/raporlar/kesif/ — 1 | 📸 | 2026-08-26 (25g) |
| `T2-C-kod-denetimi.md` | 322 | BELGE BİLANÇOSU — TUR 2 / GRUP C (docs/raporlar/kod-deneti | 📸 | 2026-08-26 (25g) |
| `T2-D-panel-persona.md` | 193 | BELGE BİLANÇOSU — TUR 2 / GRUP D (panel envanteri/strateji | 📸 | 2026-08-26 (25g) |
| `T2-E-icerik.md` | 125 | BELGE BİLANÇOSU — TUR 2 / GRUP E (docs/raporlar/icerik/ —  | 📸 | 2026-08-28 (23g) |
| `T3-A-oturum-gunlugu.md` | 292 | BELGE BİLANÇOSU — TUR 3 / GRUP A (oturum günlüğü — proje z | 📸 | 2026-08-26 (25g) |
| `T3-B-devir-diger.md` | 217 | BELGE BİLANÇOSU — TUR 3 / GRUP B (docs/devir/ — 6 belge, 0 | 📸 | 2026-08-26 (25g) |
| `T3-C-calisma-tarzi.md` | 315 | BELGE BİLANÇOSU — TUR 3 / GRUP C (çalışma-tarzı: kök CLAUD | 📸 | 2026-08-26 (25g) |
| `T3-D-tur1-denklestirme.md` | 304 | BELGE BİLANÇOSU — TUR 3 / GRUP D (TUR-1 geriye dönük denkl | 📸 | 2026-08-26 (25g) |
| `T4-A1-arsiv-erken.md` | 179 | BELGE BİLANÇOSU — TUR 4 / ARŞİV-KAZISI A1 (en erken dönem  | 📸 | 2026-08-26 (25g) |
| `T4-A2-arsiv-strateji.md` | 253 | BELGE BİLANÇOSU — TUR 4 / ARŞİV-KAZISI-A2 (arşiv: strateji | 📸 | 2026-08-26 (25g) |
| `T4-A3-arsiv-katmanlar.md` | 185 | BELGE BİLANÇOSU — TUR 4 / ARŞİV-KAZISI A3 (arşiv katman/ko | 📸 | 2026-08-26 (25g) |

### `docs/raporlar/bilanco/kararlar/` — 17 dosya / 3921 satır

| dosya | satır | konu | tür | tazelik |
|---|---:|---|---|---|
| `00-KATLAMA-IZI-2026-08-27.md` | 116 | BİLANÇO — İKİZ SATIR KATLAMA İZİ (Tur-5a-EK) | 📸 | 2026-08-27 (24g) |
| `00-OKUMA-REHBERI-2026-08-27.md` | 58 | BİLANÇO KARAR DOSYALARI — OKUMA REHBERİ & MUTABAKAT (Tur-5 | 📸 | 2026-08-28 (23g) · ad:2026-08-27 |
| `00-ONCELIK-SIRASI-2026-08-28.md` | 133 | 00 — ÖNCELİK SIRASI (kod iş sırası) — 2026-08-28 | ❓ | 2026-09-19 (1g) · ad:2026-08-28 |
| `00-PO-KARARLARI-2026-08-27.md` | 117 | PO KARARLARI — İŞLENDİ (Tur-5c) | 📸 | 2026-08-28 (23g) · ad:2026-08-27 |
| `00-SAYIM-2026-08-27.md` | 372 | BİLANÇO — KONU-BAZLI SAYIM & KATEGORİZASYON (Tur-5a) | 📸 | 2026-08-27 (24g) |
| `G1-guvenlik-kvkk.md` | 510 | BİLANÇO KARAR DOSYASI — G1: Güvenlik / KVKK / hukuk | 🔄 | 2026-09-02 (18g) |
| `G10-olu-kod-terk.md` | 448 | BİLANÇO KARAR DOSYASI — G10: Ölü kod / yarım özellik / ter | 🔄 | 2026-09-02 (18g) |
| `G11-urun-stratejisi.md` | 52 | BİLANÇO KARAR DOSYASI — G11: Ürün Stratejisi / Vizyon / İş | 📸 | 2026-08-27 (24g) |
| `G2-eslestirme-psikometri.md` | 194 | BİLANÇO KARAR DOSYASI — G2: Eşleştirme motoru / psikometri | 📸 | 2026-08-28 (23g) |
| `G3-icerik.md` | 287 | BİLANÇO KARAR DOSYASI — G3: İçerik (sorular, sertifika, öğ | 📸 | 2026-09-02 (18g) |
| `G4a-panel-akis.md` | 326 | BİLANÇO KARAR DOSYASI — G4a: STK-admin + Platform paneli ( | 📸 | 2026-08-28 (23g) |
| `G4b-panel-akis.md` | 282 | BİLANÇO KARAR DOSYASI — G4b: Retention / persona / sevdirm | 📸 | 2026-08-27 (24g) |
| `G5-bildirim-mail.md` | 121 | BİLANÇO KARAR DOSYASI — G5: Bildirim / Mail / İletişim | 📸 | 2026-08-27 (24g) |
| `G6-veri-modeli-borc.md` | 153 | BİLANÇO KARAR DOSYASI — G6: Veri modeli / migration / tekn | 📸 | 2026-08-28 (23g) |
| `G7-ux-tasarim.md` | 204 | BİLANÇO KARAR DOSYASI — G7: UX / Tasarım / Erişilebilirlik | 📸 | 2026-08-28 (23g) |
| `G8-altyapi-po-manuel.md` | 203 | BİLANÇO KARAR DOSYASI — G8: Altyapı / Deploy / PO Manuel İ | 📸 | 2026-08-28 (23g) |
| `G9-belge-surec.md` | 345 | BİLANÇO KARAR DOSYASI — G9: Belge düzeni / çalışma tarzı / | 🔄 | 2026-09-02 (18g) |

### `docs/arsiv/` — 9 dosya / 1781 satır

| dosya | satır | konu | tür | tazelik |
|---|---:|---|---|---|
| `08-oturum-2026-08-15.md` | 98 | 08 — OTURUM ÖZETİ (2026-08-15) — devir güncellemesi | 🗄️ ARŞİV | 2026-08-20 (31g) · ad:2026-08-15 |
| `09-DURUM-gecmis-katmanlar-2026-08-19.md` | 89 | 09-DURUM — Geçmiş Katmanlar Arşivi | 🗄️ ARŞİV | 2026-08-19 (32g) |
| `09-DURUM-tamamlanan-isler-arsiv-2026-08-19.md` | 42 | 09-DURUM — Tamamlanan İşler Arşivi (eski oturum kayıtları) | 🗄️ ARŞİV | 2026-08-19 (32g) |
| `09-DURUM-ve-yolharitasi-arsiv-2026-08-10.md` | 634 | ARŞİV — 09-DURUM.md + 10-yol-haritasi.md (2026-08-10 önces | 🗄️ ARŞİV | 2026-08-10 (41g) |
| `PROJECT_STATUS.md` | 249 | PROJECT_STATUS.md | 🗄️ ARŞİV | 2026-08-28 (23g) |
| `SOHBET-KARAR-OZETI-devir.md` | 110 | MENTİMENTOR — SOHBET KARAR & DURUM ÖZETİ (devir/hafıza bel | 🗄️ ARŞİV | 2026-08-23 (28g) |
| `admin-panelleri-tasarim-2026-08-02.md` | 95 | MentiMentor — Admin Panelleri Keşif + Tasarım Raporu | 🗄️ ARŞİV | 2026-08-28 (23g) · ad:2026-08-02 |
| `strateji-ve-guvenlik-denetimi.md` | 434 | Sosyal Girişim Stratejisi, Onboarding Akışları, Panel Tasa | 🗄️ ARŞİV | 2026-08-02 (49g) |
| `yol-haritasi-kopya-kayitlar-2026-08-19.md` | 30 | Yol Haritası — Kopya Kayıtlar Arşivi | 🗄️ ARŞİV | 2026-08-19 (32g) |

### `docs/arsiv/icerik/` — 6 dosya / 409 satır

| dosya | satır | konu | tür | tazelik |
|---|---:|---|---|---|
| `00-icerik-index.md` | 34 | İçerik Dökümü — INDEX (2026-08-15) | 🗄️ ARŞİV | 2026-08-28 (23g) |
| `disc-sorulari-2026-08-15.md` | 53 | İçerik Dökümü — DISC (Mizaç) Soruları (2026-08-15) | 🗄️ ARŞİV | 2026-08-28 (23g) · ad:2026-08-15 |
| `ogrenme-yolculugu-2026-08-15.md` | 107 | İçerik Dökümü — Öğrenme Yolculuğu (2026-08-15) | 🗄️ ARŞİV | 2026-08-28 (23g) · ad:2026-08-15 |
| `sertifika-senaryolari-2026-08-15.md` | 152 | İçerik Dökümü — Sertifika Senaryoları (2026-08-15) | 🗄️ ARŞİV | 2026-08-28 (23g) · ad:2026-08-15 |
| `sjt-sorulari-2026-08-15.md` | 42 | İçerik Dökümü — SJT Soruları (2026-08-15) | 🗄️ ARŞİV | 2026-08-28 (23g) · ad:2026-08-15 |
| `stk-custom-sorular-2026-08-15.md` | 21 | İçerik Dökümü — STK Custom Sorular (2026-08-15) | 🗄️ ARŞİV | 2026-08-28 (23g) · ad:2026-08-15 |

**TOPLAM: 152 dosya** = önceden var olan **151** + bu haritanın kendisi.

## A.1 — Tür dağılımı (152 dosya)

| Tür | Adet | Not |
|---|---:|---|
| 📸 DONDURULMUŞ | **92** | Fotoğraf — güncellenmez. Tazelik sorulmaz, "bulguları aktı mı" sorulur (§C) |
| 🔄 YAŞAYAN | **34** | Güncellenmeye devam eden canonical'lar |
| 🗄️ ARŞİV | **15** | `arsiv/` altı — eskimiş ama tarihsel iz için saklanan |
| ❓ **ETİKETSİZ** | **17** | ⚠️ Üst-etiketi hiç yok → okuyan "güncel mi?" diye şüphe eder. **KURAL 3 ihlali** |
| ⛔ okunmadı | 3 | `otonom/` — başka tur çalışıyor |

⚠️ **17 etiketsiz belge**, `belge-duzeni-rehberi.md` KURAL 3'ün ("her belgenin en üstünde net etiket olur") açık boşluğudur. Bunların çoğu `kvkk-metinleri/` ve `konu/` altındaki karar belgeleridir — tür sütununda ❓ ile işaretli. Etiketleme ayrı bir belge turunun işi; bu tur yalnız **ölçtü**.

---

# BÖLÜM D — OTURUM GÜNLÜĞÜ BÖLÜNDÜ (bu turun tek yazma işi)

`devir/07-oturum-gunlugu.md` 1.333 satırdı ve her turda bağlam yiyordu. **Tarihsel kayıt olduğu için hiçbir satır silinmedi.**

| | satır | içerik |
|---|---:|---|
| **öncesi** (tek dosya) | 1.333 | 54 oturum bölümü |
| `devir/gunluk/oturum-2026-08.md` | 715 | 34 oturum (2026-08-14 → 08-30) |
| `devir/gunluk/oturum-2026-09.md` | 527 | 17 oturum (2026-09-01 → 09-09, #8-24) |
| `devir/07-oturum-gunlugu.md` | 139 | **son 3 oturum** (#25, #26, OTONOM TUR 1) + indeks |
| **sonrası** | **1.381** | +48 = yalnız başlık/indeks satırları |

**KAYIPSIZLIK KANITI (ölçüldü, beyan değil):** üç dosyadan orijinal yeniden kuruldu (`header + part08 + part09 + tail`), `diff` ve `md5sum` ile karşılaştırıldı → **birebir aynı**:
`md5(orijinal) = md5(yeniden) = 2462eb3228daf9985099e1e4dd2907dc`

Bölme **başlıktan başlığa** yapıldı; hiçbir oturumun ortasından kesilmedi. Başlıklar üç farklı biçimde geçiyordu (`# 📅 OTURUM`, `## OTURUM`, `## <tarih>`) ve üçü de tarandı; oturum olmayan iki `##` başlığı (`⏭️ SIRADAKİ İŞ SIRASI`, `🧭 çalışma tarzı hatırlatması`) içinde bulunduğu oturumla birlikte taşındı.

---

---

## ⭐ EK (2026-09-21, BC turu) — `raporlar/kesif/` altına GİREN ALTI YENİ RAPOR

> Bu altı belge 2026-09-21'de yedi ayrı dalda üretildi ve **BC birleşik PR'ında tek dala toplandı**.
> Hepsi **📸 DONDURULMUŞ** — bulguları `00-KUYRUK.md` / `01-KARARLAR.md`'ye işlendikten sonra güncellenmezler.
> ⚠️ Bu harita (2026-09-20 fotoğrafı) yazıldığında bu altı belge **yoktu**; §C'nin "17 belge / 2613 satır" sayımı
> bugün **17 → 23 belge**'dir. Eski sayıya dokunulmadı (KURAL 6), burada düzeltildi.

| Belge | Ne | Satır | Tür | Bulguları nereye işlendi |
|---|---|---:|---|---|
| `devir-analizi-2026-09-21.md` | Yol haritası + karar takibi + 09-DURUM + kuyruk hijyeni devir analizi | 603 | 📸 | `00-KUYRUK` AŞAMA Y · `03-PO-ELLE-ISLER` §"ÇIKIŞ İÇİN ŞART" |
| `po-cikis-kilavuzu-2026-09-21.md` | PO'nun canlıya çıkış kılavuzu (elle yapılacaklar + doğrulama yolları) | 745 | 📸 | `03-PO-ELLE-ISLER.md` A/B/C/D bölümleri |
| `konsey-psikometri-2026-09-21.md` | Psikometri/eşleştirme konseyi — OCEAN motoru, DISC vektörü, sıralama, test örtüsü | 591 | 📸 | `00-KUYRUK` **AŞAMA PS** (11 satır) · **KARAR-41…44** · KARAR-10 eki · PO #22/#23 |
| `konsey-guvenlik-kvkk-2026-09-21.md` | Güvenlik + KVKK konseyi — IDOR, kimlik sahteciliği, anonimleştirme, rıza, aydınlatma metni | 452 | 📸 | `00-KUYRUK` ⛔⛔ EN ÜST (GV-01/02) + **AŞAMA GV** (23 satır) · **KARAR-38…40** · PO #19/#20/#21 |
| `konsey-icerik-2026-09-21.md` | İçerik konseyi — hazır içerik denetimi, terim tutarlılığı, hata/boş-durum metinleri, sertifika sürümü | 737 | 📸 | `00-KUYRUK` **AŞAMA IC** (14 satır) + AŞAMA I notları · **KARAR-45…48** · PO #24 |
| `konsey-yonetisim-2026-09-21.md` | Yönetişim konseyi — klasör yapısı, belge güncelliği, kural yönetimi, CLAUDE.md boyutu | 640 | 📸 | `00-KUYRUK` **AŞAMA YN** (15 satır) · **KARAR-49…52** · PO #25/#26 · ⭐ CLAUDE.md bölme (uygulandı) |

⚠️ **Atıf uyarısı:** `konsey-yonetisim-2026-09-21.md`'deki tüm `CLAUDE.md:<satır>` atıfları **bölme öncesi**
dosyaya (47.456 karakter · 712 satır) aittir. Yeni adresler belgenin kendi başındaki ⚠️ GÜNCELLEME notunda,
**bölüm adıyla** yazılı.

⚠️ **KURAL 5 borcunun BİR KISMI bu turda kapandı:** bu PR'la açılan
`docs/kararlar/konu/rtk-komut-rehberi.md` **`kararlar/00-INDEX.md`'e işlendi.** Bu haritanın kendisinin
INDEX'e işlenmesi ve INDEX'in 13 eksik belgesi **HÂLÂ AÇIK** (`00-KUYRUK` **YN-03**).

## 📌 BU TURUN YAPMADIKLARI (bilinçli)

- ⛔ Hiçbir belge **silinmedi, birleştirilmedi, taşınmadı** (§D'deki bölme hariç — o da kayıpsız).
- ⛔ Hiçbir çakışma **çözülmedi** — yalnız işaretlendi. Canonical önerileri **öneridir**, uygulanmadı.
- ⛔ `docs/otonom/` **açılmadı** (başka tur orada çalışıyor). Bu yüzden `otonom/` ↔ `09-DURUM` ilişkisi ❓ kaldı.
- ⛔ Öksüz bulgular (§C.2, 19 kalem) **kuyruğa işlenmedi, karar kartı açılmadı**.
- ⛔ 📸 DONDURULMUŞ belgelerin içeriğine dokunulmadı.
- ⛔ Kod / DB / migration / seed: sıfır temas.
- ⚠️ **KURAL 5 borcu:** bu haritanın `kararlar/00-INDEX.md`'e bir satırla işlenmesi gerekir — turun çıktı listesi sabit olduğu için **yapılmadı**, sonraki belge turuna kalan iştir. (Aynı turda INDEX'in **13 eksik belgesi** de kapatılmalı — bkz. §"BU BELGELERE GÜVENME".)

---

*Bu harita bir ÖLÇÜM belgesidir, yetki dağıtmaz. Canonical'ı `kararlar/00-INDEX.md` söyler; bir kalemin doğrusunu `bilanco/kararlar/G*.md` kartı söyler (KURAL 15); kod ile belge çelişirse **KOD kazanır**.*
