# KONSEY 4 · 🗂️ YÖNETİŞİM — klasör yapısı, güncellik, kurallar

📸 DONDURULMUŞ — 2026-09-21 fotoğrafı. Bu belge plan değildir; tek işi kuyruğu beslemektir. Bulguları `00-KUYRUK.md`'ye işlendikten sonra güncellenmez.

**Mod:** 🟩 PLANLA — salt-okuma. Hiçbir dosya taşınmadı/bölünmedi/yeniden adlandırılmadı.
**Analiz tabanı:** `origin/otonom/BB-devir-uygulama-20260921` (main bayat — BB merge BEKLİYOR).
**Kuyruk öneki:** `Y-??` · **Dal:** `otonom/CD-konsey-yonetisim-20260921`

---

## 0. ⭐ ÖNCE OKU — en kritik 3 bulgu

**① Sorun sanıldığından büyük ama plan sanıldığından kolay — ve birim yanlış ölçülmüş.** Brief CLAUDE.md'yi **bayt** cinsinden veriyor (45.154 → 50.477); Claude Code'un uyarı eşiği ise **karakter** cinsinden. Türkçe metinde fark büyük: gerçek sayılar **main 41.940 · BB 46.816 karakter**. Yani **main ZATEN 40.000 sınırının üstünde** — sorun BB ile başlamadı, BB onu 6.816 karakter daha kötüleştirdi. İyi haber: hedefe ulaşmak için **tüm dosyayı yeniden düzenlemek gerekmiyor** — yalnız iki bloğu taşımak (RTK 5.048 + KURAL 9-16 gövdeleri 8.160) CLAUDE.md'yi **33.859 karaktere** indiriyor, hedefin altında. Dört blok taşınırsa **28.715** (6.285 pay).

**② Brief'in B.2 öncülü yanlış: KURAL 17 diye bir kural YOK.** "Her kuralın geçersizleşme koşulu olur" kuralı ne CLAUDE.md'de, ne rehberde, ne de **hiçbir dalda** var. Kapsam beyanı: BB dalı + 11 uzak dal, `KURAL 17` · `geçersizleşme` · `yürürlükten` · `sunset` · `kaldırma koşulu` · `geçerlilik süresi` (13 terim, iki dilli, harf duyarsız) → **0 dosya**. Repodaki en yüksek numara **KURAL 16**, o da `ADAYI` etiketli (PO onayı bekliyor). Dolayısıyla B.2'nin cevabı "uygulaması yarım kaldı" değil: **hiçbir kuralın geçersizleşme koşulu yazılı değil, çünkü bunu zorunlu kılan kural hiç var olmadı.** Böyle bir kural eklemek bu konseyin "CLAUDE.md'yi büyütme" yasağına takılır → karar kartına taşındı, ben önermiyorum.

**③ Numaralı kural serisi İKİ dosyaya bölünmüş — ve "KURAL 1/2" adı iki farklı anlamda kullanılıyor.** `belge-duzeni-rehberi.md` **KURAL 1-8**'i taşıyor (canonical, 10.987 karakter); **KURAL 9-16** ise yalnız **CLAUDE.md**'de yaşıyor (`:376-466`). Yani "kuralları oku" diyen biri iki ayrı dosya açmak zorunda ve hiçbiri diğerini tam listelemiyor. Üstüne: CLAUDE.md `:329` ve `:332` **"KURAL 1" / "KURAL 2"** ifadelerini *Karar-Takip Disiplini'nin kendi iç numaraları* olarak kullanıyor — yani aynı dosyada "KURAL 2" hem *"tür = klasör"* hem *"tur sonunda güncelle"* demek. Bu, taşıma planının en güçlü gerekçesi: KURAL 9-16'yı rehbere taşımak kopya silmek değil, **seriyi birleştirmektir**.

---

## 1. KAPSAM BEYANLARI

| Ne | Kapsam |
|---|---|
| Analiz tabanı | `origin/otonom/BB-devir-uygulama-20260921` (BB merge bekliyor; main bayat) |
| CLAUDE.md ölçümü | `git show BB:CLAUDE.md` → Python `len(str)` (karakter) + `len(bytes)` (bayt). ⚠️ `wc -m` bu ortamda locale yüzünden BAYT sayıyor — kullanılmadı |
| Atıf taraması | `git grep -E 'CLAUDE\.md:[0-9]+'` → BB dalı, tüm repo |
| KURAL 17 negatif iddiası | BB + 11 uzak dal · 13 terim (`KURAL 17`·`geçersizleşme`·`gecersizlesme`·`sunset`·`expiry`·`expire`·`yürürlükten`·`yururlukten`·`ne zaman kalkar`·`kaldırma koşulu`·`kaldirma kosulu`·`geçerlilik süresi`·`iptal koşulu`) · harf duyarsız · iki dilli |
| Taranamayan | Canlı DB · `.env` içerikleri (PO'da) · dört paralel konseyin henüz açılmamış dalları |

**Birim tanımları:** "karakter" = Python `len(str)` (UTF-8 kod noktası) · "bayt" = `len(bytes)` · "atıf" = `CLAUDE.md:<sayı>` biçiminde tek eşleşme · "kural" = numaralı KURAL veya CLAUDE.md'de `##` başlıklı adlandırılmış politika.

---

## 2. BULGULAR

# A — ⭐ CLAUDE.md BÖLME PLANI

## A.1 · A.2 — Bölüm envanteri + sınıflandırma

**Ölçüm (BB dalı): 46.817 karakter · 50.477 bayt · 704 satır.**

🟢 ÇEKİRDEK = her oturumda şart · 🟡 BAĞLAMSAL = yalnız belli işlerde · ⚪ TARİHSEL = arşive

| Satır | Karakter | Bölüm | Sınıf |
|---:|---:|---|:--:|
| 2-24 | 1.264 | Otonom mod: Nedir · Üç dosya | 🟢 |
| 25-53 | 2.170 | **MERGE POLİTİKASI** (kapı bazlı merge yetkisi) | 🟢 |
| 54-63 | 649 | **KARAR AYRIMI** — neyi sor, neyi sorma | 🟢 |
| 64-83 | 1.349 | **SİLME PROTOKOLÜ** (5 adım) | 🟢 |
| 84-92 | 588 | **YANLIŞ SORU TUZAĞI** | 🟢 |
| 93-119 | 1.552 | Karar kartı biçimi (şablon) | 🟡 |
| 120-127 | 508 | Paralellik — şerit sistemi | 🟢 |
| 128-144 | 840 | Mod etiketi (🟥/🟩) | 🟢 |
| 145-150 | 381 | Belge senkronu — SONA tek sefer | 🟢 |
| 151-171 | 914 | Bitti tanımı · Bulut oturumu farkı | 🟢 |
| 174-213 | 3.086 | Çalışma sözleşmesi · Proje hafızası · Push öncesi · verify↔CI · Branch · CI | 🟢 |
| 214-233 | 1.810 | Submodule senkronizasyonu | 🟡 |
| 234-245 | 691 | API/şema · Veri modeli · Migration kuralı | 🟢 |
| 246-256 | 1.375 | **CANLI = LOKAL AYNI DB** (kritik güvenlik) | 🟢 |
| 257-273 | 1.740 | Ortam/Veritabanı · Neon test branch | 🟡 |
| 274-299 | 1.543 | Belirsizlik · Koşullu paralellik · İsim yasağı · Model · Hata felsefesi | 🟢 |
| 300-324 | 2.308 | Belge senkronizasyonu — zorunlu bitiş | 🟡 |
| 325-341 | 1.558 | Karar-takip disiplini | 🟡 |
| 342-345 | 204 | Git fetch önce | 🟢 |
| 346-375 | 3.842 | Belge düzeltme deseni | 🟡 |
| **376-466** | **8.160** | **Belge düzeni — KURAL 8-16 gövdeleri** | 🟡 |
| 467-527 | 3.207 | Güvenlik kuralları — kod yazarken | 🟡* |
| 528-567 | 1.923 | Temiz kod & sürdürülebilirlik | 🟡* |
| **568-705** | **5.048** | **RTK komut rehberi** (⛔ AKTİF — ajan `rtk grep` kullanıyor) | 🟡 |

`*` = teknik olarak bağlamsal, ama **taşınması ÖNERİLMİYOR** (A.4 gerekçe).
⚪ TARİHSEL: bu turda **0 bölüm** — üstü çizili satırlar bölüm değil satır içi; onlar D.2'nin konusu.

## A.3 — ⭐ HEDEF HESABI (< 35.000 karakter)

**Başlangıç: 46.817 · 40.000 uyarı sınırını 6.817 aşıyor · hedefe inmek için ≥11.817 taşınmalı.**

### KADEME 1 — zorunlu (hedefi TEK BAŞINA sağlar)
| İşlem | Karakter |
|---|---:|
| − RTK bölümü `[568-705]` | −5.048 |
| − KURAL 9-16 gövdeleri `[376-466]` | −8.160 |
| + 2 atıf satırı | +250 |
| **SONUÇ** | **33.859** ✅ hedefin altında (pay 1.141) |

### KADEME 1+2 — önerilen (rahat pay)
| İşlem | Karakter |
|---|---:|
| Kademe 1 | −12.958 |
| − Karar kartı biçimi `[93-119]` | −1.552 |
| − Belge düzeltme deseni `[346-375]` | −3.842 |
| + 2 atıf satırı daha | +250 |
| **SONUÇ** | **28.715** ✅ pay **6.285** |

**Öneri: Kademe 1+2.** Gerekçe: Kademe 1'in 1.141 karakterlik payı bir sonraki "ders" eklendiğinde tükenir — bu belgenin şişme hızı son 2 günde +4.876 karakter.

## A.4 — Taşınacak bölümler: hedef dosya + kalacak atıf satırı

| Bölüm | Hedef dosya | CLAUDE.md'de KALACAK satır |
|---|---|---|
| RTK `[568-705]` | `docs/kararlar/konu/rtk-komut-rehberi.md` **(YENİ)** | `## RTK — token-tasarruflu komutlar`<br>`Komutları `rtk` ile önekle (git, tsc, vitest, grep…). ⛔ AKTİF kullanımda. Tam liste: `docs/kararlar/konu/rtk-komut-rehberi.md`` |
| KURAL 9-16 `[376-466]` | `docs/kararlar/konu/belge-duzeni-rehberi.md` (KURAL 1-8 zaten orada) | `## Belge düzeni — KURAL 1-16`<br>`Tek canonical: `docs/kararlar/konu/belge-duzeni-rehberi.md`. Başlıklar: 9 kalem listesi · 10 ✅ kanıtsız basılmaz · 11 söz açılışta · 12 tazelik · 13 negatif iddia · 14 CI≠test · 15 kaynak hiyerarşisi · 16 sayılan birim (ADAYI).`` |
| Karar kartı biçimi `[93-119]` | `docs/otonom/KARAR-KARTI-SABLONU.md` **(YENİ)** | `Karar kartı şablonu: `docs/otonom/KARAR-KARTI-SABLONU.md` — "Ne kaybedersin" ASLA boş kalmaz.` |
| Belge düzeltme deseni `[346-375]` | `belge-duzeni-rehberi.md` (KURAL 6'nın yanına) | `Bayat satır SİLİNMEZ: üstü çizili + `[ESKİ]` damga + `⚠️ GÜNCELLEME (tarih)`. Ayrıntı: rehber KURAL 6.` |

**⛔ TAŞINMAMASI önerilen (5.130 karakter):** `Güvenlik Kuralları [467-527]` + `Temiz Kod [528-567]`.
Gerekçe: ikisi de "kod yazarken UY" başlıklı ve **yazma anında** devreye giriyor. Bir tık uzağa koymak uyum riskini artırır; hedef onlarsız zaten sağlanıyor. Bu, plan kapasitesi değil **bilinçli tercih**.

## A.5 — ⭐ KIRILACAK ATIFLAR

`CLAUDE.md:<satır>` biçiminde **toplam 149 atıf** (birim: eşleşme). Ama hepsi eşit değil:

| Grup | Atıf | Durum |
|---|---:|---|
| **CLAUDE.md'nin KENDİ içindeki** (`:26,27,129,146,179`…) | **8** | ⚠️ Bölmede **kesin kırılır** — aynı dosya kayıyor |
| **🔄 YAŞAYAN belgelerde** (`02-ILERLEME` 4 · `10-yol` 2 · `07-calisma-tarzi` 2 · `00-BELGE-HARITASI` 2 · `00-KUYRUK` 1 · `09-DURUM` 1 · `00-KARAR-TAKIP` 1 · `konu/08` 1 · `konu/11` 1) | **15** | ⚠️ Kırılır, **düzeltilmeli** |
| **📸 DONDURULMUŞ belgelerde** (`T3-C-calisma-tarzi` 98 · `G9-belge-surec` 10 · diğer 18) | **126** | ✅ **Zaten bugün kırık** — 2026-08-26 satır numaralarına bakıyorlar. Tarihsel kayıt, düzeltilmez (KURAL 6) |

**Yani gerçekte düzeltilmesi gereken: 23 atıf** (8 + 15), 126'sı değil.
**Kanıt ki 126'sı zaten kırık:** `T3-C:35` *"CLAUDE.md:8 | PR aç, MERGE ETME"* diyor; BB'nin kendi notu `CLAUDE.md:27` *"bugün `:8` = 'PO kod yazmaz…'"* diyor → atıf çoktan kaymış.

**Öneri (yeni kural DEĞİL, mevcut deseni netleştirme):** yaşayan belgelerde satır numarası yerine **bölüm adıyla** atıf — `CLAUDE.md § MERGE POLİTİKASI`. Bölüm adı bölmede de taşınmada da kırılmaz. Dondurulmuş belgelere **dokunulmaz**.

## A.6 — CLAUDE.md İÇ ÇELİŞKİLERİ

| # | Çelişki | Nerede | Durum |
|---|---|---|---|
| **AÇ-1** | "Canlı ve lokal **AYNI Neon**" ↔ "**PROD**: docker-compose Postgres, **Neon değil**" | `:247` ↔ `:261` | ⛔ **ÇÖZME — PO `DATABASE_URL`'e bakacak.** BB ikisini de ⚠️ ÇELİŞKİ notuyla damgalamış (`:248`, `:262`) — teşhis kayıtlı, karar PO'da |
| **AÇ-2** | Belge senkronu **iki farklı kural**: `:146` "her iş sonrası DEĞİL, kuyruk sonunda TEK PR" ↔ `:300-324` "her BYPASS tur, senkron yapılmadan TAMAMLANMIŞ SAYILMAZ" | `:145-150` ↔ `:300-324` | 🔀 Otonom katmanı eski gövdeyi geçersiz kıldığını söylüyor ama gövde hâlâ mutlak dille duruyor. Okuyan hangisine uyacağını bilemez |
| **AÇ-3** | "KURAL 1 / KURAL 2" adı **iki farklı anlamda** | `:329,:332` (Karar-Takip'in iç numaraları) ↔ rehber KURAL 1-2 (tek gerçek kaynağı / tür=klasör) | 🔀 İsim çakışması. Karar-Takip'in iç maddeleri "KURAL" değil "ADIM" diye adlandırılsa çakışma biter (karakter maliyeti ~0) |

**Sayı: 3 iç çelişki** (AÇ-1 PO'ya ait, AÇ-2 ve AÇ-3 belge düzeni işi).

## A.7 — MÜKERRER KURALLAR

| # | Mükerrer | Nerede | Kazanç |
|---|---|---|---:|
| **AM-1** | **Paralellik iki kez anlatılıyor** — `Paralellik — şerit sistemi` (okuma sınırsız / yazma 4 şerit / şüphede SIRALI) ↔ `Koşullu Paralellik` (bağımsızsa paralel / bağımlıysa SIRALI / şüphede sıralı) | `:120-127` (508) ↔ `:277-285` (660) | Birleşince ~**600 karakter** kazanılır; ikisi çelişmiyor, **aynı şeyi söylüyor** |
| **AM-2** | **Belge senkronu iki kez** (AÇ-2 ile aynı kök) | `:145-150` ↔ `:300-324` | Otonom hali kalsın, gövde hali rehbere → **~2.300 karakter** |
| **AM-3** | KURAL 8 **iki dosyada** — rehberde tam gövde, CLAUDE.md `:383`'te özet | rehber `KURAL 8` ↔ `CLAUDE.md:383` | KURAL 9-16 taşınınca kendiliğinden çözülür |

**Sayı: 3 mükerrer küme.** Üçü de A.3 taşıma planıyla ya çözülüyor ya da ~600 karakterlik tek bir birleştirmeye iniyor.

---

# C — KLASÖR YAPISI

## C.1 — Tanımı YAZILI OLMAYAN klasörler (7)
Tanımlar iki yerde: `belge-duzeni-rehberi.md:17-38` (KURAL 2) + `kararlar/00-INDEX.md:33-60` (klasör ağacı).

| Klasör | Durum |
|---|---|
| **`docs/otonom/`** | ❌ **Hiçbir klasör tanımı belgesinde YOK.** `grep -ci otonom kararlar/00-INDEX.md` → **0** |
| `raporlar/bilanco/` + `bolumler/` + `kararlar/` | ❌ KURAL 2 listesinde yok (yalnız 2-B'de adı geçiyor, tanımı yok) |
| `raporlar/icerik/bolumler/` · `devir/gunluk/` | ❌ |
| `arsiv/icerik/` · `kararlar/konu/kvkk-metinleri/` | ⚠️ kısmi (belge tablosunda var, ağaçta yok) |
| `devir/` | ⚠️ tek satır INDEX'te; rehberde `devir` kelimesi 0 eşleşme |

⭐ **En kritik: `docs/otonom/`** — `CLAUDE.md`'nin kendi ifadesiyle *"Aktif iş kaynağı tektir: `docs/otonom/00-KUYRUK.md`"*, yani projenin fiilî omurgası; ama klasörün ne olduğu hiçbir düzen belgesinde tanımlı değil.

## C.2 — Eksen çakışması (KURAL 2-B)
- KURAL 2-B (KONU↔YÖNTEM + zorunlu çapraz atıf) **var**: `belge-duzeni-rehberi.md:40-56` (2026-09-19'da eklenmiş, BB'den önce).
- **BB'nin eklediği:** `:45-53` "⛔ İNDEKS ADI TEKTİR: `00-INDEX.md`".
- ❌ **`CLAUDE.md` 2-B'yi adıyla anmıyor** — kapsam: CLAUDE.md tamamı, `eksen`·`çapraz`·`capraz`·`KURAL 2-B`·`00-INDEKS` → **0 eşleşme**.

| KONU klasörü | İndeks | ÇAPRAZ ATIF bölümü |
|---|---|---|
| `raporlar/panel/` | `00-INDEX.md` | ✅ `:12` |
| `raporlar/persona/` | `00-INDEX.md` | ✅ `:10-13` |
| **`raporlar/icerik/`** | `00-INDEKS.md` | ❌ **YOK** — `:64-65`'te iki başlıksız atıf var ama 2-B'nin ⛔ ZORUNLU biçimini karşılamıyor |

### ⭐ C-3 — "Kanıt dosyası yok" iddiası: DÜZELTİLDİ
BB'nin eklediği kurallar 6+ yerden `docs/raporlar/kesif/devir-analizi-2026-09-21.md`'ye "kanıt" diye atıf veriyor (`belge-duzeni-rehberi.md:49` · `CLAUDE.md:248,265,362,366`).
Bir alt-ajan bunu *"dosya repoda YOK, kanıt commit edilmemiş"* diye raporladı. **Orkestratör doğruladı: yarı-yanlış.**

| Dal | Dosya |
|---|---|
| `origin/main` | yok |
| `origin/otonom/BB-devir-uygulama-20260921` | yok |
| **`origin/otonom/AZ-devir-analizi-20260921`** | ✅ **VAR** |

➡️ Dosya **kayıp değil** — kardeş bir dalda duruyor. Bu bir kırık atıf değil, **merge-sırası bağımlılığı**: *BB, AZ'den ÖNCE merge edilirse* atıflar boşa düşer. **Aksiyon: AZ önce (ya da BB ile birlikte) merge edilmeli.** Bu, "belge yok" demekten tamamen farklı bir iş.

## C.3 — İndeks adı: 4 ayrı kalıp yaşıyor
Kural: `belge-duzeni-rehberi.md:45` **"`00-INDEX.md` TEKTİR"**.

| Kalıp | Nerede |
|---|---|
| `00-INDEX.md` ✅ | `kararlar/` · `raporlar/panel/` · `raporlar/persona/` |
| `00-INDEKS.md` ⚠️ | `raporlar/icerik/` (bilinçli bırakılmış, gerekçe `rehber:49-53`) |
| `00-icerik-index.md` ⚠️ | `arsiv/icerik/` — **üçüncü kalıp**, kural metninde hiç anılmıyor |
| `00-KART-INDEKSI.md` ⚠️ | `kararlar/` — indeks değil köprü belgesi, ama ad çakışma riski |

⚠️ **Kuralın kendi koruması delik:** `rehber:46` *"`ls <klasör>/00-IND*` çalıştır"* diyor — bu desen `00-icerik-index.md`'yi **yakalamıyor** (önek `00-ic…`). ❓ TEYİT GEREK: kasıtlı mı, gözden mi kaçtı.

**İndeksi HİÇ olmayan klasör: 13** (`docs/` kökü · `arsiv/` · `devir/` · `devir/gunluk/` · `kararlar/konu/` · `kvkk-metinleri/` · `oz-denetim/` · `otonom/` · `bilanco/` · `bilanco/bolumler/` · `icerik/bolumler/` · `kesif/` · `kod-denetimi/`).

## C.4 — "00-" önek: giriş noktası belirsiz olan 2 klasör
| Klasör | `00-` dosya | Giriş noktası |
|---|---:|---|
| `kararlar/` | 4 | ✅ NET — `rehber:70` "00-INDEX TEK kapıdır" |
| **`raporlar/bilanco/kararlar/`** | **5** | ❌ **BELİRSİZ** — hiçbirinde "buradan başla" yok. `00-OKUMA-REHBERI:3` fiilen giriş ama dışarıdan işaret yok; `00-INDEX.md:175-183` ise `belge-bilancosu`'nu ⭐ ile işaretliyor → **iki farklı giriş sinyali** |
| **`docs/` kökü** | 1 | ⚠️ **NEGATİF tanım** — `00-BELGE-HARITASI.md:9` "bu `00-INDEX`'in yerine geçmez". Köke bakanın gördüğü tek `00-` dosyası bu → yanlış giriş riski |

## C.5 — `raporlar/` etiket denetimi (birim: dosya)
| Sonuç | Dosya | % |
|---|---:|---:|
| TOPLAM `.md` | **91** | 100 |
| Tam etiketli (`DONDURULMU` geçiyor) | 83 | 91,2 |
| 📸 var ama "DONDURULMUŞ" kelimesi yok (**zayıf**) | 3 | 3,3 |
| **Hiç etiket yok** | **5** | 5,5 |

**Etiketsiz + zayıf tam liste:**

| Dosya | Durum | Son iç tarih | Gün | Neden yanıltıcı |
|---|---|---|---:|---|
| ⭐ `bilanco/bilanco-po-ozet-2026-08-26.md` | ❌ hiç yok | 2026-08-27 | **25** | **PO'ya hitap eden özet** — en çok okunan, hiç etiketsiz. Ayrıca `:22` "196" diyor, doğrusu 259 |
| `raporlar/panel/00-INDEX.md` | ❌ hiç yok | 2026-09-19 | 2 | İndeks → 🔄 olmalı (kardeşi `icerik/00-INDEKS:3` 🔄 taşıyor) |
| `raporlar/persona/00-INDEX.md` | ❌ hiç yok | 2026-09-19 | 2 | aynı |
| `icerik/sertifika-oturum1-4-…-2026-09-08.md` | ⚠️ zayıf (`:3` 📸 "Üretim") | 2026-09-08 | 13 | 📸 burada "üretim tarihi" anlamında; **canonical ilan edilmiş** (`00-BELGE-HARITASI:104`) ama etiketi belirsiz |
| `icerik/sertifika-oturum2-3-…` · `oturum3-4-…` | ⚠️ zayıf | 2026-09-08 | 13 | aynı |

**Ek gerilim:** `raporlar/` = "dondurulmuş klasör" (rehber `:18-19`) ama içinde **4 adet 🔄 YAŞAYAN** dosya var (`G1:5` · `G9:5` · `G10:5` · `icerik/kod-kalemleri:5`). KURAL 2 ↔ KURAL 3 gerilimi kurala bağlanmamış. Kardeşi **`G3-icerik.md` atlanmış**: başlık 📸 ama `:172` 2026-09-02 düzenlemesi taşıyor → ❓ TEYİT GEREK.

## C.6 — ⭐ `docs/devir/` çelişkisi (BB bu klasöre HİÇ dokunmadı)

**(a) Çelişki DOĞRULANDI — tek cümle içinde, orkestratör aynen okudu:**
- `devir/01-felsefe-ve-calisma-tarzi.md:3` → `**📸 DONDURULMUŞ** — oturum devir notu (felsefe / çalışma tarzı; **kalıcı referans**).`
- `devir/06-devir-kilavuzu.md:3` → `**📸 DONDURULMUŞ** — oturum devir kılavuzu (prosedür; **kalıcı referans**).`
- Üstüne `01`'in **başlığı**: `# 01 — FELSEFE VE ÇALIŞMA TARZI (**yeni sohbet önce bunu oku**)`

📸 = *"o günün fotoğrafı, güncellenmez"* (rehber `:59-62`) · "kalıcı referans" = *"bugün de bağlayıcı"*. Bir belge ikisi birden olamaz — ve `01` kendini **ilk okunacak belge** ilan ederek çelişkiyi en zararlı yere koyuyor.

**(b) Bayat merge kuralı — SAYIM (birim: satır, `grep -ci "merge etme"`):**
| Dosya | Satır |
|---|---:|
| `devir/01-felsefe-ve-calisma-tarzi.md` | 2 |
| `devir/06-devir-kilavuzu.md` | 2 |
| `devir/03-kvkk-is-paketi.md` | 1 |
| `devir/04-13-admin-bulgusu.md` | 1 |
| **TOPLAM** | **6** · düzeltilen **0** |

Bu, BB'nin kendi beyanıyla **birebir tutuyor** (`00-BELGE-HARITASI.md:61`: *"Kalan 6'sı `docs/devir/01,03,04,06`'da"*). BB 9 satırı düzeltti, bu 6'ya "dondurulmuş" gerekçesiyle dokunmadı.

**(c) İkinci kat çelişki:** `00-BELGE-HARITASI.md:38` bu iki dosyayı **🔄** etiketliyor, dosyalar kendini **📸** diyor → harita ↔ belge etiket çakışması.

➡️ **Risk (BB'nin kendi tanımı):** *"Yeni gelen bu yerlerden birini okuyup merge etmemeyi kural sanar → otonom kuyruk tıkanır."* Çelişki bilinen, kayıtlı, **iki turdur çözülmemiş** → PO kararı (kart aşağıda).

