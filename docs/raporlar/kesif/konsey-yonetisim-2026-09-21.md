> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-21 (📸 fotoğraf tarihi) · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)
> ⚠️ Bu belge kalemlerin TANIMINI tutar, DURUMUNU TUTMAZ. Buradaki işaretler 2026-09-21 durumudur. Güncel durum: `docs/otonom/00-KUYRUK.md` (köprü: `docs/kararlar/00-KART-INDEKSI.md`)
> İŞLENME: ✅ işlendi (2026-09-21, tur: BC) → `00-KUYRUK` AŞAMA YN · KARAR-49…52 · `03-PO-ELLE-ISLER` #25/#26 · kutu: 2026-09-23 DA turu (belge-duzeni-rehberi § KURAL 23)

# KONSEY 4 · 🗂️ YÖNETİŞİM — klasör yapısı, güncellik, kurallar

📸 DONDURULMUŞ — 2026-09-21 fotoğrafı. Bu belge plan değildir; tek işi kuyruğu beslemektir. Bulguları `00-KUYRUK.md`'ye işlendikten sonra güncellenmez.

**Mod:** 🟩 PLANLA — salt-okuma. Hiçbir dosya taşınmadı/bölünmedi/yeniden adlandırılmadı.
**Analiz tabanı:** `origin/otonom/BB-devir-uygulama-20260921` (main bayat — BB merge BEKLİYOR).
**Kuyruk öneki:** `Y-??` · **Dal:** `otonom/CD-konsey-yonetisim-20260921`

> ⚠️ **GÜNCELLEME (2026-09-21, BC turu — atıf haritası):** Bu rapordaki **tüm `CLAUDE.md:<satır>` atıfları
> BÖLME ÖNCESİ dosyaya aittir** (47.456 karakter · 712 satır). §B.4-1'in önerdiği taşıma **aynı gün uygulandı**
> (bu rapor 📸 dondurulmuş olduğu için satırları tek tek değiştirilmedi — Belge Düzeltme Deseni). Yeni adresler
> **bölüm adıyla**:
> · **KURAL 8-16 gövdeleri** (eski `:376-462`; bu raporda `:377` · `:381` · `:383` · `:383-393` · `:402` · `:412`)
>   → `docs/kararlar/konu/belge-duzeni-rehberi.md` § "⭐ KURAL 8-16 — `CLAUDE.md`'den taşındı (2026-09-21)".
>   `CLAUDE.md`'de yerinde **tek satır atıf** kaldı: § "Belge düzeni — KURAL 1-16".
> · **RTK komut kataloğu** (eski `:575-710`) → `docs/kararlar/konu/rtk-komut-rehberi.md`.
>   `CLAUDE.md`'de yerinde atıf: § "RTK — token-tasarruflu komutlar" (⛔ kural AKTİF, yalnız gövdesi taşındı).
> Bölme sonrası `CLAUDE.md` = **34.742 karakter**. Bu iki blok dışındaki satır numaraları da kaydı
> (376'dan sonrası), o atıflar bu turda KASITLI olarak ellenmedi.

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

---

# B — KURAL SİCİLİ

> ⚠️ **Birim notu:** bu bölümün kaynak analizi CLAUDE.md'yi "50.477 karakter" diye ölçmüş — o sayı **bayttır** (gerçek: 46.817 karakter). Blok bazlı ölçümler karaktere yakın çıktı (ör. RTK 5.051 ≈ 5.048), bu yüzden aşağıdaki kazanç rakamları **±%7 yaklaşıktır**; sıralama güvenilir, mutlak değerler değil.

## B.1 — Kural envanteri
**Birim: "kural" = `##`/`###` başlıklı davranış kuralı bloğu.** (Künye/başlık blokları ve RTK araç kılavuzu sayıma girmez.)

**Toplam 74 kural** = `CLAUDE.md` **65** + `belge-duzeni-rehberi.md` **9** (1 · 2 · **2-B** · 3 · 4 · 5 · 6 · 7 · 8).

### ⭐ En kritik yapısal bulgu: numara dizileri ÇAKIŞIYOR
İki dosya **iki bağımsız numara dizisi** kullanıyor ve **1, 2, 8 numaraları iki farklı kurala** verilmiş:

| Numara | `belge-duzeni-rehberi.md` | `CLAUDE.md` | Durum |
|---|---|---|---|
| **KURAL 1** | Tek gerçek kaynağı (`:11-16`) | Oturum başında KARAR-TAKIP oku (`:329`) | ❌ ÇAKIŞMA |
| **KURAL 2** | Belge türü = klasör (`:17-39`) | Tur sonunda KARAR-TAKIP güncelle (`:332`) | ❌ ÇAKIŞMA |
| **KURAL 8** | Bulgu yaşam döngüsü (`:99-109`, 1.300) | Bulgu yaşam döngüsü (`:383-393`, 1.053) | 🔁 **TAM MÜKERRER** — aynı kural, aynı numara, iki gövde |
| KURAL 9-16 | *(yok)* | `:394-463` | 🧩 Seri yalnız CLAUDE.md'de |
| **KURAL 2-B** | Eksen çakışması (`:40-57`, 1.822) | *(adı bile geçmiyor)* | 🧩 CLAUDE.md 2-B'yi hiç anmıyor |

**Canonical net ve çelişkisiz:** `rehber:124` *"Bu rehber, belge düzeninin tek yetkili kaynağıdır"* + `CLAUDE.md:381` *"Rehber = canonical."*
➡️ Ama CLAUDE.md, KURAL 8'i **tam metin kopyalayarak** rehberin **KURAL 1'ini ("kopyalama, işaret et") ihlal ediyor.**

### ⚠️ İki sayım hatası (KURAL 16'nın kendi rehberinde ihlali)
- Kaç düzen kuralı var? `rehber:6` **"6 kural"** · `CLAUDE.md:377` **"8 düzen kuralı"** · **gerçek: 9**. Üç farklı sayı, aynı şeyi sayıyor.
- `rehber:3` künyesi *"Son güncelleme: 2026-08-23"* diyor ama içinde `:40` *"(eklendi 2026-09-19)"* ve `:45` *"(netleştirme 2026-09-21)"* var → künye **29 gün bayat** (KURAL 12 birincil ayak ihlali).

## B.2 — ⭐ GEÇERSİZLEŞME KOŞULU — brief'in öncülü düzeltildi

**KURAL 17 YOKTUR.** (§0 ② — 13 terim · BB + 11 dal · 0 dosya.) Dolayısıyla soru "uygulaması neden yarım kaldı" değil, **"hiç başlamadı"**.

Yine de asıl soru cevaplanabilir — her kural için koşul yazılı mı:

| Durum | Kural | % |
|---|---:|---:|
| ✅ Koşulu YAZILI | **6** | 8,1 |
| ❌ Koşulu yazılı değil | **68** | 91,9 |
| ↳ bunlardan "asla geçersizleşmez" diye **bilinçli** beyan taşıyan | 4 | — |
| ↳ hiçbir şey söylemeyen | 64 | — |
| **TOPLAM** | **74** | 100 |

**Koşulu yazılı 6 kural:** KURAL 16 ADAYI (`:452` *"PO onaylayınca ADAYI düşer"*) · CANLI=LOKAL DB (`:248`) · Ortam/Veritabanı (`:265`, aynı cümle) · KURAL 12 3. ayak (`:412` *"şimdilik elle"*) · Güvenlik/mesaj resolver (`:518-520`) · rehber 2-B indeks adı (`:52-53` *"geçicidir"*).

⚠️ **6'sının hiçbiri ölçülebilir tetik taşımıyor** — hepsi *"X olunca"* biçiminde, X'i kimin ne zaman kontrol edeceği yazılı değil. Pratikte hiçbiri kendiliğinden tetiklenmiyor; B.3 bunu doğruluyor.

## B.3 — ⭐ KOŞULU SAĞLANMIŞ / BAYAT KURALLAR (4) — kaldırma PO kararı

### 🔴 B.3-1 · Güvenlik kuralı YANLIŞ KANITA dayanıyor *(orkestratör doğruladı)*
`CLAUDE.md:519` aynen: *"`registerMessages.ts` örnek addır, **dosya HENÜZ kodda YOK: grep boş**"*
**Kod gerçeği:** `git ls-tree -r $BB | grep registerMessage` → **`frontend/src/lib/registerMessages.ts` VAR.**
➡️ Bir **güvenlik** kuralı, artık doğru olmayan bir gerekçeye yaslanıyor. İddia en az 2026-08-28'den beri yanlış (**24 gün**) — üstelik bu tam olarak KURAL 13'ün kendi gerekçe listesindeki vaka tipi: *kural yazıldı, kendi kaynağı düzeltilmedi*.

### 🔴 B.3-2 · Canonical rehber, DONDURULMUŞ belgeyi canonical gösteriyor *(orkestratör doğruladı)*
`belge-duzeni-rehberi.md:13` aynen: *"Canonical'lar: … **iş kuyruğu → `10-yol-haritasi.md`**"*
**Gerçek:** `10-yol-haritasi.md:4` → **`📸 DONDURULMUŞ (2026-09-21)` — "bu belge artık güncellenmez"**. Aynısı `00-CIKIS-PLANI.md:4`.
Ve `CLAUDE.md:370` → *"Aktif iş kaynağı **tektir: `docs/otonom/00-KUYRUK.md`**"*.
➡️ **Belge düzeninin canonical'ı, kendi canonical örneğini yanlış gösteriyor.** Rehberi okuyan ajan ölü belgeye yönlendirilir. KURAL 7 tablosundaki `10-yol` ve `00-CIKIS-PLANI` satırları da aynı durumda.

### 🟡 B.3-3 · "PR aç, MERGE ETME" — koşul sağlandı, artık satır içi tortu kaldı
Koşul 2026-09-19'da sağlandı, düzeltme 2026-09-21'de yapıldı (`:178-179`). Kalan artık: bölüm **başlığı** hâlâ `:25` *"…KISMEN KALDIRILDI"* ve `:26-27`'de yanlış çıkmış bir **atıf zinciri** satır içinde duruyor.
➡️ Bu tam olarak `CLAUDE.md:356-368`'in ("tarihsel iz satırın İÇİNDE tutulmaz") yasakladığı desen — **kural kendi dosyasında uygulanmamış.**

### 🔴 B.3-4 · Kişi Adı Yasağı kendi dosyasında ihlal ediliyor
`CLAUDE.md:287` *"Hiçbir kod/yorum/commit/PR/belgeye kişi adı YAZMA."*
**İhlal, kural metninden 279 satır ÖNCE:** `CLAUDE.md:8`'de PO'nun kişi adı parantez içinde geçiyor. Aynı desen `docs/otonom/00-KUYRUK.md:2` ve toplam **13 dosyada 15 geçiş**.
`:288` *"Mevcut belgelerdeki isimler ayrı bir temizlik işinde giderilir"* → koşul **SAĞLANMADI**, iş hiç açılmadı.
⚠️ **Repo PUBLIC** — bu rapor gereği ada yer vermiyor; temizlik işi ad listesi üretmeden yapılabilir (`grep` PO'nun elinde).
ℹ️ KVKK metinlerindeki 4 geçiş **yasal zorunluluk**, ayrı tutulmalı (G9-14'te "DOKUNULMADI" kararı var).

### ⬜ Koşul henüz SAĞLANMADI (4 — takipte kalsın)
| Kural | Koşul | Bugünkü durum |
|---|---|---|
| KURAL 16 ADAYI | PO onaylayınca "ADAYI" düşer | **19 gündür** açık; KURAL 14/15 onaylandı, 16 atlandı |
| KURAL 12 · 3. ayak | "ileride script ile" | `scripts/` altında tazelik script'i **yok** (yalnız `kvkk-docx-gen.py`, `verify.sh`) |
| CANLI=LOKAL ↔ Ortam-DB çelişkisi | PO `DATABASE_URL`'i teyit edecek | `03-PO-ELLE-ISLER.md` "ADIM 0" hâlâ açık (= AÇ-1) |
| rehber 2-B indeks adı | klasör `00-INDEX.md`'ye taşınırsa | `raporlar/icerik/00-INDEKS.md` hâlâ duruyor |

**+ İçi boşalmış 1 kural:** `Model Yönlendirme` (`:290-294`, 346 krk) — gövdesi 2026-08-28'de çıkarılmış; geriye tek cümle + onun **iki katı** uzunlukta GÜNCELLEME notu kalmış. Kural artık **hiçbir davranış talep etmiyor**.

## B.4 — BİRLEŞTİRME ÖNERİLERİ (yeni kural YOK)

⚠️ Konsey kuralına uyuldu: **0 yeni kural.** Yalnız BİRLEŞTİR / SADELEŞTİR / TAŞI. **Hiçbir kural gövdesi silinmiyor.**

| # | Birleştirme | Kaynak | Kazanç |
|---|---|---|---:|
| **B.4-1** | **KURAL 8 mükerreri** → CLAUDE.md'deki kopya rehbere, yerine atıf | `CLAUDE.md:383-393` ≡ `rehber:99-109` | **933** |
| B.4-2 | Belge Düzeltme Deseni + rehber KURAL 6 → tek kural (gövde rehbere) | `:346-355` + `rehber:75-81` | 422 |
| **B.4-3** | **DB/ortam dörtlüsü** → tek "VERİTABANI" kuralı. İçinde **birebir aynı ~530 krk ÇELİŞKİ paragrafı İKİ KEZ** var (`:248`, `:265`) | `:243-273` (3.440) | **~1.340** |
| B.4-4 | `TEST_DATABASE_URL` guard uyarısı **üç yerde** → tek yer + 2 atıf | `:33-34`+`:199-200`+`:260-261` | 279 |
| B.4-5 | İki paralellik kuralı → tek kural (ikisi de "şüphede SIRALI" diyor) | `:120-127` + `:277-285` | ~481 |
| **B.4-6** | **Üç belge-senkron yükümlülüğü** → tek "TUR BİTİŞ KONTROL LİSTESİ" | `:145-150`+`:300-313`+`:332-335` | **~1.089** |
| B.4-7 | Submodule ikilisi → tek kural | `:214-218` + `:219-233` | ~439 |
| **B.4-8** | **Kanıt disiplini üçlüsü** (KURAL 10+13+16) → tek kural; 6 gerekçe vakası `## GEÇMİŞ`e | `:399-403`+`:414-428`+`:451-463` | **~1.400** |
| B.4-9 | Kapı + Bitti tanımı → `00-KUYRUK.md`'ye taşı (CLAUDE.md:370 zaten "tek kaynak orası" diyor) | `:30,44,45` + `:151-160` | ~610 |
| B.4-10 | `Model Yönlendirme` → tek cümleye indir, not `## GEÇMİŞ`e | `:290-294` | ~256 |
| | **TOPLAM** | | **≈ 7.249** |

➡️ Kural sayısı **74 → 65** (9 birleşme), **hiçbir kural kaldırılmadan.**
➡️ B.4 (≈7.249) **+ A.3 Kademe 1** (13.208) birbirini büyük ölçüde kapsıyor (B.4-1/2/8 ile KURAL 9-16 taşıması aynı bloklara dokunuyor) — **toplamları TOPLANMAZ.** A.3'ün taşıma planı uygulanırsa B.4-3/4/5/6/7/9/10 (≈4.494) **ek** kazanç sağlar → CLAUDE.md ≈ **24.200 karakter**.

---

# D — GÜNCELLİK

## D.1 — 🔄 YAŞAYAN damgalı belgeler ölü mü?
**Birim: belge.** Kapsam: BB dalı `docs/` altı 163 `.md`, künye = ilk 20 satır, desen `🔄 YAŞAYAN`.

| Durum | Belge |
|---|---:|
| Künyesinde 🔄 damgası | 29 |
| ↳ BB turunda zaten 📸'ye çevrilmiş | −3 |
| **Aktif 🔄 kalan** | **26** |
| ☠️ **ÖLÜ** (bayat **+** işi devredilmiş) | **2** |
| 🟡 ÖLÜ ADAYI (devir kanıtı var, eşik altı) | 2 |
| ⚠️ Bayat ama devir kanıtı YOK (damga yanlış, ölü değil) | 6 |
| ✅ Sağlıklı | 16 |

> ⚠️ `00-BELGE-HARITASI.md:528` "🔄 34" diyor; bu sayım 29 buldu. Fark (5) muhtemelen gövde-içi damgalar + haritanın main/2026-09-20 ölçümü → **❓ TEYİT GEREK** (haritanın sayım yöntemi yazılı değil).

### ☠️ ÖLÜ (2) — devir kanıtı belgenin KENDİ içinde
| Belge | Kendi beyanı | Devralan |
|---|---|---|
| `kararlar/konu/08-acik-sorular.md` | `:5` *"canonical açık-karar takibi artık `00-KARAR-TAKIP.md`"* | `00-KARAR-TAKIP.md` |
| `raporlar/icerik/kod-kalemleri-2026-09-03.md` | `:8` *"✅ NUMARALANDI — kalemler … madde 138-160'a işlendi"* | `00-KUYRUK.md` AŞAMA I |

### 🟡 ÖLÜ ADAYI (2) — PO kararı gerek
- `kararlar/10-yol-tamamlananlar.md` — besleyicisi `10-yol-haritasi.md` donduruldu; "bitti" kaydı artık `02-ILERLEME.md`'ye yazılıyor. ⚠️ Ama `10-yol-haritasi.md:7` hâlâ *"biten v1 → `10-yol-tamamlananlar.md`"* diyor → **önce o atıf düzeltilmeli, yoksa kırık atıf doğar.**
- `raporlar/bilanco/kararlar/G9-belge-surec.md` — kaynağı AŞAMA F'ye devredildi; kendi KURAL 12 eşiği **2026-10-02**'de dolar.

### HAZIR DONDURMA NOTLARI (kopyala-yapıştır)
```
> ⚠️ GÜNCELLEME (2026-09-21): Bu belge artık güncellenmiyor — işi `docs/kararlar/00-KARAR-TAKIP.md` devraldı. 📸 DONDURULMUŞ sayılır. Güncel için: docs/kararlar/00-KARAR-TAKIP.md
```
```
> ⚠️ GÜNCELLEME (2026-09-21): Bu belge artık güncellenmiyor — işi `docs/otonom/00-KUYRUK.md` AŞAMA I devraldı. 📸 DONDURULMUŞ sayılır. Güncel için: docs/otonom/00-KUYRUK.md
```
Ayrıca künyedeki `**🔄 YAŞAYAN**` ifadesi `~~[ESKİ · 2026-09-21] **🔄 YAŞAYAN**~~` biçiminde damgalanmalı (`CLAUDE.md:349-353` deseni).

## D.2 — ⭐ 1.000+ KARAKTER SATIRLAR — brief'in öncülü DÜZELTİLDİ

Brief: *"BB sonrası 00-KARAR-TAKIP'te 33, 00-KUYRUK'ta 5 **kaldı**"* — "kaldı" kelimesi azalma ima ediyor. **Gerçek: ikisi de ARTTI.** *(orkestratör doğruladı)*

| Dosya | main | BB | Fark |
|---|---:|---:|---|
| `kararlar/00-KARAR-TAKIP.md` | 30 | **33** | **+3 BÜYÜDÜ** |
| `otonom/00-KUYRUK.md` | 2 | **5** | **+3 BÜYÜDÜ** |
| `kararlar/09-DURUM.md` | 38 | 3 | −35 **(silinmedi, arşive taşındı)** |
| `arsiv/09-DURUM-gecmis-katmanlar-2026-09-21.md` | 0 | 35 | +35 (yeni, taşımanın hedefi) |
| diğer 3 dosya | 3 | 4 | +1 |
| **TOPLAM** | **73** | **80** | **+7** |

**Birim:** uzunluğu ≥1000 karakter olan fiziksel satır.
- **Aktif belgelerdeki gerçek yük: 80 − 35 (arşiv) = 45 satır.** Arşivdekiler kurala uygun (son durak).
- En uzun satır: `00-KARAR-TAKIP.md:858` = **4.994 karakter** *(orkestratör ölçtü)*.
- ⚠️ `CLAUDE.md:358`'deki ölçüm **bayat**: *"74 satır … en uzunu madde 101 = 6.460 karakter"* → bugün 80 satır, madde 101 **1.511'e inmiş** (taşıma çalışmış), yeni rekortmen `:858`.

### ⭐ Kök neden ve çözüm: **kural ZATEN VAR, uygulanmamış**
`CLAUDE.md:356-366` — *"⭐ KALICI KURAL — tarihsel iz satırın İÇİNDE tutulmaz"* — 6 uygulama adımıyla **tam yazılı**. Altyapı da hazır: `00-KARAR-TAKIP.md:850` altında **`## GEÇMİŞ`** bölümü açılmış ve **3 kalemde uygulanmış** (`:294` md.30 · `:567` md.101 · `:582` T5).
➡️ **Öneri yeni kural DEĞİL** — var olan kuralın kalan 33 + 5 satıra da uygulanması.

**Hazır desen (mevcut mekanizmanın aynısı):**
```
satırda kalan:  | 30 | <kalem> | <durum> | <SON geçerli hâl, tek katman> · geçmiş: bkz. `## GEÇMİŞ` §md.30 |

belge sonunda:  ### §md.30
                > Taşındı: 2026-09-21 · kaynak: `00-KARAR-TAKIP.md:294` · tek karakter değişmedi.
                ~~[ESKİ · 2026-08-26] …~~
                ~~[ESKİ · 2026-09-03] …~~
```
**Anahtar** = satırın kalıcı numarası (md.30 · S35 · G1-23 · F-19) — asla değişmez, atıf ağının omurgası.
⛔ **Denetim zorunlu:** `kalan + taşınan = önceki toplam`, kapanış raporunda sayıyla gösterilir; tutmazsa geri alınır. (Uygulanmış örnek: `arsiv/09-DURUM-gecmis-katmanlar-2026-09-21.md:8-9` → *"kalan 244 + taşınan 219 = 463 ✅"*.)

| Dosya | Hedef |
|---|---|
| `00-KARAR-TAKIP.md` (33) | kendi `## GEÇMİŞ` (`:850`) — bölüm zaten çalışıyor |
| `00-KUYRUK.md` (5) | ⚠️ **kuyrukta `## GEÇMİŞ` YOK** → `arsiv/00-KUYRUK-gecmis-<tarih>.md` **ya da** Not sütunundaki devir hikâyesi `02-ILERLEME.md`'ye. Motor bu dosyayı **her tur** okuyor → okunabilirlik doğrudan tur kalitesi |
| `09-DURUM.md` (3) | `arsiv/09-DURUM-gecmis-katmanlar-<tarih>.md` (mekanizma işliyor) |
| arşiv 35 · 10-yol 2 · HARİTA 1 · günlük 1 | **taşıma YOK** — 📸/arşiv, iz son durağında |

## D.3 — Otonom sistem dosyaları tutarlılığı

### ✅ Kapı tanımları (🟢/🟡/🔴) — üçünde de AYNI, çelişki YOK
`OTONOM-PROMPT.txt:186-194` ≡ `00-KUYRUK.md:9-19` ≡ `CLAUDE.md:30,44,45`.
⚠️ **Granülerlik boşluğu (çelişki değil):** 🟡'nin **üç istisnası** promptta ve kuyrukta var, **`CLAUDE.md:44`'te YOK** (orada yalnız *"riskli/geniş"*). CLAUDE.md'yi tek başına okuyan 🟡'nin sınırını bilemez.

### ❌ Ç-1 · DURUM KODLARI — üç dosya, üç set, **ikisi "başkası YASAK" diyor**
| Dosya | Set | Adet |
|---|---|---:|
| `OTONOM-PROMPT.txt:80-81` | `BEKLIYOR·CALISILIYOR·**PR-ACIK**·BITTI·ATLANDI·BASARISIZ·IPTAL` — *"(baskasi YASAK)"* | **7** |
| `00-KUYRUK.md:53-54` | aynısı ama **`PR-ACIK` YOK** | 6 |
| `CLAUDE.md:402` | `✅·🟡·🔀·⬜·❓·🗑️` — *"6 tanedir (başkası YASAK)"* | 6, **tamamen farklı alfabe** |

⭐ **Kuyruk kendi sözlüğünü ihlal ediyor** *(orkestratör doğruladı)*: `:53-54` sözlüğünde `PR-ACIK` **yok**, ama gövdede **1 kez kullanılıyor** (F-19 satırı).
**Öneri:** `OTONOM-PROMPT.txt:80-84` canonical (en yeni, 2026-09-21); kuyruk ona hizalansın. `CLAUDE.md:402` **ayrı bir alfabedir** (kart kodları) — ikisi de "başkası YASAK" dediği için okuyan çarpışıyor; **ikisine de "hangi belge için geçerli" cümlesi** eklenmeli.

### ❌ Ç-2 · MOD ETİKETLERİ — 2 mi 3 mü, kuyrukta hiç yok
`CLAUDE.md:132-134` tablosu **2 mod** (🟥 BYPASS · 🟩 PLANLA) · `CLAUDE.md:175` **3 mod** (PLAN/BYPASS/**MANUEL-ONAY** — renk kodu yok, tabloda yok) · `OTONOM-PROMPT.txt:1` yalnız 🟥 · `00-KUYRUK.md`'de mod kavramı **hiç geçmiyor** (`grep "BYPASS\|PLANLA\|🟥\|🟩"` = 0).
**Öneri:** `:132-138` canonical; `:175`'teki üçlü ya `~~[ESKİ]~~` damgalansın ya da MANUEL-ONAY tabloya renk koduyla eklensin.

### ❌ Ç-3 · ŞERİT SİSTEMİ — motorun okuduğu promptta YOK
`CLAUDE.md:121-125` "en fazla **4 şerit**" · `00-KUYRUK.md:58-66` `## ŞERİT DAĞILIMI` **5 satır** (Ş1-Ş4 + **Ş0 sıralı**) · `OTONOM-PROMPT.txt`'te şerit **hiç geçmiyor** (kapsam: `serit|şerit|Ş1|Ş0|paralel` → 2 alakasız isabet).
➡️ Kuyrukta her işin şeridi var, CLAUDE.md şeridi kural yapıyor, ama **her turda aynen gönderilen dosya** şeritten hiç bahsetmiyor.
**Öneri:** `00-KUYRUK.md:58-66` canonical (dosya sahipliği orada); prompta tek satır atıf; `CLAUDE.md:122`'deki "4" → "4 paralel + Ş0 sıralı".

### ❌ Ç-4 · AŞAMA LİSTESİ — hayalet aşama *(orkestratör doğruladı)*
`OTONOM-PROMPT.txt:148-150` **8 aşama** sayıyor: `I · K · F · P · E · U · V · Y`.
`00-KUYRUK.md` gerçek `## AŞAMA` başlıkları: **11** — `I·A·B·C·E·D·F·P·U·V·Y`.
- **(a)** Promptun saydığı **"K (kullanıcı testi)" aşaması kuyrukta YOK** — `grep -c "AŞAMA K"` = **0**.
- **(b)** Kuyruktaki **A·B·C·D** promptun listesinde yok → motor bunları "yeni aşama" sayar (`:151` kurtarıcı kuralı var ama tanım bayat).
**Öneri:** kuyruk başlıkları canonical; prompt listesi ona hizalansın.

### ❌ Ç-5 · ÇAPRAZ ATIF SATIR NUMARALARI BAYAT (3 vaka, üçü de "kanıt" diye sunulmuş)
| İddia | Gerçek |
|---|---|
| `CLAUDE.md:179` *"kanıt: `OTONOM-PROMPT.txt:151-152`"* | `:151` = *"Yeni asama gorursen…"*, `:152` boş. Kapı politikası **§7 `:186-194`** |
| `CLAUDE.md:179` *"`00-KUYRUK.md:6-16`"* | Kapılar **`:9-20`**; `:6` = başka konu |
| `00-KUYRUK.md:74` *"(`OTONOM-PROMPT.txt:33-37`)"* | `:33-37` = yarım dal/CI; okuma listesi **§0.4 `:43-51`** |

⚠️ `CLAUDE.md:27` bu hastalığı **zaten teşhis etmiş** (*"atıf hedefleri kaymıştı"*) — ama düzeltmenin kendisi (`:179`) **yine bayat numara üretmiş**. Bu, A.5'teki bulgunun otonom katmandaki karşılığı: **çözüm satır numarası değil, bölüm adı.**

---

# E — ⭐ UYGULAMA PLANI (terminal turu için hazır)

**Risk sırası: önce geri alınabilir küçük adımlar, EN SONA CLAUDE.md bölme.** Her adımdan sonra commit.
⚠️ **ÖN KOŞUL (E-0):** BB merge edilmeden hiçbiri başlamaz. Ayrıca **AZ dalı BB'den ÖNCE veya BB ile birlikte** merge edilmeli (§C.2 C-3 — BB'nin kanıt atıfları AZ'deki dosyaya gidiyor).

| # | Adım | Dosyalar | Doğrulama (önce → sonra) | Geri alınabilir |
|---|---|---|---|---|
| **E-1** | 2 ölü belgeye dondurma notu + künye damgası (§D.1 hazır metinler) | `konu/08-acik-sorular.md` · `icerik/kod-kalemleri-2026-09-03.md` | 🔄 sayısı 26 → 24 | ✅ tek satır geri alınır |
| **E-2** | `rehber:13` + KURAL 7 tablosu: canonical iş kuyruğu `10-yol-haritasi` → `00-KUYRUK` (§B.3-2) | `belge-duzeni-rehberi.md` | `grep "10-yol-haritasi" rehber` canonical bağlamında 0 | ✅ |
| **E-3** | `CLAUDE.md:519` bayat güvenlik kanıtını düzelt (§B.3-1) — `~~[ESKİ]~~` + GÜNCELLEME | `CLAUDE.md` | dosya var, iddia düzeltildi | ✅ |
| **E-4** | Otonom sözlük hizalaması: `PR-ACIK` kuyruk sözlüğüne; aşama listesi prompta (§D.3 Ç-1, Ç-4) | `00-KUYRUK.md` · `OTONOM-PROMPT.txt` | kuyrukta kullanılan her kod sözlükte var; aşama listesi 11 = 11 | ✅ |
| **E-5** | Mod etiketi + şerit tutarlılığı (§D.3 Ç-2, Ç-3) | `CLAUDE.md:175` · `:122` · `OTONOM-PROMPT.txt` | tek mod tablosu; şerit "4 paralel + Ş0" | ✅ |
| **E-6** | 🟡 istisnalarını `CLAUDE.md:44`'e ekle (§D.3 granülerlik boşluğu) — **+~200 krk, bilinçli** | `CLAUDE.md` | CLAUDE.md tek başına okunabilir | ✅ |
| **E-7** | 23 yaşayan atıfı satır no → **bölüm adı** (§A.5). 📸 belgelere DOKUNMA | 9 yaşayan belge + `CLAUDE.md` | `grep -E 'CLAUDE\.md:[0-9]+'` yaşayanlarda 0 | ✅ |
| **E-8** | Uzun satır taşıma: `00-KARAR-TAKIP` 33 → `## GEÇMİŞ` (§D.2 deseni) | `00-KARAR-TAKIP.md` | ⛔ `kalan + taşınan = önceki` **sayıyla** raporlanır | ⚠️ dikkat |
| **E-9** | Uzun satır taşıma: `00-KUYRUK` 5 (⚠️ `## GEÇMİŞ` bölümü **yok**, önce açılmalı) | `00-KUYRUK.md` | aynı denetim | ⚠️ |
| **E-10** | B.4 birleştirmeleri (10 kalem, ≈7.249 krk) — **kural gövdesi silinmeden** | `CLAUDE.md` · `rehber` | kural sayısı 74 → 65; hiçbir kural kaybolmadı | ⚠️ |
| **E-11** | ⭐ **CLAUDE.md BÖLME — Kademe 1** (§A.3) | `CLAUDE.md` → `rtk-komut-rehberi.md` (YENİ) + `belge-duzeni-rehberi.md` | **46.817 → ~33.859** karakter | ⚠️⚠️ |
| **E-12** | ⭐ **Kademe 2** (karar kartı şablonu + düzeltme deseni) | + `KARAR-KARTI-SABLONU.md` (YENİ) | **→ ~28.715** karakter | ⚠️⚠️ |
| **E-13** | Kapanış: `00-INDEX.md`'e yeni dosyalar + `otonom/` bölümü (§C.1, C-9 — KURAL 5 borcu) | `00-INDEX.md` | `grep -ci otonom 00-INDEX` > 0 | ✅ |

### ⛔ E-11/E-12 için ZORUNLU karakter denetimi
Taşınan her bölümün **TAMAMI** hedefte AYNEN bulunmalı:
```
# taşımadan ÖNCE
python3 -c "print(len(open('CLAUDE.md',encoding='utf-8').read()))"          # 46817
sed -n '568,705p' CLAUDE.md | python3 -c "import sys;print(len(sys.stdin.read()))"   # 5048

# taşımadan SONRA
python3 -c "print(len(open('docs/kararlar/konu/rtk-komut-rehberi.md',encoding='utf-8').read()))"
# hedef dosyadaki gövde >= 5048 olmalı (başlık eklenir); CLAUDE.md 46817-5048+~125'e inmeli
```
**Kural:** `yeni_CLAUDE + taşınan_gövdeler = eski_CLAUDE + eklenen_başlıklar`. Tutmazsa **geri al**.

---

## 3. ⭐ HAZIR KUYRUK SATIRLARI

⚠️ Numara VERİLMEDİ (`Y-??`). BB dalındaki AŞAMA Y (18 satır) ile karşılaştırıldı — **hiçbiri mükerrer değil**; mevcut Y satırlarının tamamı kod/ürün işi, belge yönetişimi kapsanmamış.

| # | Şerit | İş | Kapı | Bitti demek (kullanıcı gözünden) | Durum | Not |
|---|---|---|---|---|---|---|
| Y-?? | Ş0 | ⭐ **CLAUDE.md 40.000 karakter sınırını aşıyor.** Gerçek ölçüm 46.817 karakter (main 41.940 — o da sınırın üstünde). Ajan her oturumda hepsini okuyor. Kademe 1+2 taşıma planı hazır. | 🟢 | Ajan oturum başında uyarı almıyor; CLAUDE.md < 35.000 karakter | BEKLIYOR | §A.3-A.4 · E-11/E-12 · taşınan bölüm silinmiyor, yeri değişiyor · karakter denetimi zorunlu |
| Y-?? | Ş0 | **Numaralı kural serisi iki dosyaya bölünmüş** — rehber KURAL 1-8, CLAUDE.md 9-16; üstelik KURAL 1/2/8 numaraları **iki farklı kurala** verilmiş, KURAL 8 tam mükerrer. | 🟢 | "Kuralları oku" diyen tek dosya açıyor; aynı numara tek anlama geliyor | BEKLIYOR | §B.1 · E-11 ile birlikte · `CLAUDE.md:383-393` ≡ `rehber:99-109` |
| Y-?? | Ş0 | ⭐ **Güvenlik kuralı yanlış kanıta dayanıyor.** `CLAUDE.md:519` *"registerMessages.ts kodda YOK: grep boş"* diyor; dosya **var** (`frontend/src/lib/registerMessages.ts`). 24 gündür yanlış. | 🟢 | Güvenlik kuralının gerekçesi kod gerçeğiyle uyuşuyor | BEKLIYOR | §B.3-1 · orkestratör `git ls-tree` ile doğruladı · E-3 |
| Y-?? | Ş0 | ⭐ **Canonical rehber, dondurulmuş belgeyi canonical gösteriyor.** `rehber:13` *"iş kuyruğu → 10-yol-haritasi.md"*; o belge `:4`'te 📸 DONDURULMUŞ (2026-09-21). | 🟢 | Rehberi okuyan ajan canlı kuyruğa (`00-KUYRUK`) yönleniyor | BEKLIYOR | §B.3-2 · KURAL 7 tablosu da güncellenmeli · E-2 |
| Y-?? | Ş0 | **2 belge 🔄 YAŞAYAN diyor ama ölü** — `konu/08-acik-sorular.md` ve `icerik/kod-kalemleri-2026-09-03.md`; ikisi de kendi içinde "işi X devraldı" yazıyor. | 🟢 | Okuyan bayat belgeyi güncel sanmıyor | BEKLIYOR | §D.1 · hazır dondurma notları raporda · E-1 |
| Y-?? | Ş0 | **Otonom sözlük çelişkisi: `PR-ACIK` kodu kullanılıyor ama sözlükte yok.** `00-KUYRUK.md:53-54` 6 kod sayıyor, gövdede 7.'si kullanılıyor. Ayrıca prompt "AŞAMA K" sayıyor, kuyrukta yok. | 🟢 | Motor her turda tanımlı kod setiyle çalışıyor | BEKLIYOR | §D.3 Ç-1/Ç-4 · orkestratör doğruladı (`grep -c "AŞAMA K"` = 0) · E-4 |
| Y-?? | Ş0 | **Mod etiketi 2 mi 3 mü + şerit sistemi promptta yok.** `CLAUDE.md:132` 2 mod, `:175` 3 mod; `00-KUYRUK` şerit tablosu var, `OTONOM-PROMPT` şeritten hiç bahsetmiyor. | 🟢 | Üç dosya aynı mod/şerit tanımını veriyor | BEKLIYOR | §D.3 Ç-2/Ç-3 · E-5 |
| Y-?? | Ş0 | **Uzun satırlar AZALMADI, ARTTI** — `00-KARAR-TAKIP` 30→33, `00-KUYRUK` 2→5; en uzun 4.994 karakter. Kural (`CLAUDE.md:356-366`) ve `## GEÇMİŞ` altyapısı **zaten var**, 3 kalemde uygulanmış, kalan 38'e uygulanmamış. | 🟡 | Kuyruk/karar-takip satırları ekranda okunabiliyor | BEKLIYOR | §D.2 · ⛔ `kalan+taşınan=önceki` denetimi zorunlu · `00-KUYRUK`'ta `## GEÇMİŞ` bölümü **yok**, açılmalı · E-8/E-9 |
| Y-?? | Ş0 | **23 yaşayan `CLAUDE.md:<satır>` atfı bölmede kırılacak** (8'i CLAUDE.md'nin kendi içinde). Kalan 126 atıf 📸 belgelerde ve **zaten bugün kırık** — dokunulmaz. | 🟢 | Atıflar bölme/taşımadan sonra da doğru yere gidiyor | BEKLIYOR | §A.5 · satır no → **bölüm adı** · E-7 |
| Y-?? | Ş0 | **`docs/otonom/` hiçbir klasör tanımı belgesinde tanımlı değil** — `grep -ci otonom kararlar/00-INDEX.md` = **0**. Projenin fiilî omurgası haritada yok. Ayrıca `00-BELGE-HARITASI` kendi beyanıyla INDEX'e hâlâ işlenmedi (KURAL 5 borcu). | 🟢 | INDEX'e bakan `docs/otonom/`'u ve belge haritasını görüyor | BEKLIYOR | §C.1 · C-9 · E-13 |
| Y-?? | Ş4 | **`raporlar/` 91 dosyadan 5'i etiketsiz, 3'ü zayıf etiketli.** En yanıltıcısı `bilanco-po-ozet-2026-08-26.md` — PO'ya hitap ediyor, 25 gün, hiç etiketi yok. | 🟢 | Her rapor "güncel mi dondurulmuş mu" sorusunu kendi başlığında cevaplıyor | BEKLIYOR | §C.5 · KURAL 3 ihlali · `panel/00-INDEX` ve `persona/00-INDEX` de etiketsiz |
| Y-?? | Ş4 | **İndeks adı 4 kalıpta** (`00-INDEX` · `00-INDEKS` · `00-icerik-index` · `00-KART-INDEKSI`); kuralın koruma komutu `ls 00-IND*` üçüncüyü **yakalamıyor**. 13 klasörde hiç indeks yok. | 🟢 | Tek desenle her klasörün girişi bulunuyor | BEKLIYOR | §C.3 · ❓ `00-icerik-index` kasıtlı mı TEYİT GEREK |
| Y-?? | Ş0 | **Kişi adı yasağı kendi dosyasında ihlal ediliyor** — kural `CLAUDE.md:287`, ihlal `:8`'de (279 satır önce) + 13 dosyada 15 geçiş. `:288` "ayrı temizlik işinde" diyor, iş hiç açılmadı. ⚠️ Repo PUBLIC. | 🟡 | Public repoda kişi adı geçmiyor | BEKLIYOR | §B.3-4 · KVKK metinlerindeki 4 geçiş **yasal**, hariç (G9-14 "DOKUNULMADI") · bu rapor ada yer vermiyor |
| Y-?? | Ş0 | **10 kural birleştirme ≈7.249 karakter** — yeni kural YOK, hiçbir kural kaldırılmadan 74→65. En büyükleri: kanıt disiplini üçlüsü (~1.400), DB/ortam dörtlüsü (~1.340, içinde **birebir aynı ~530 krk paragraf iki kez**), üç belge-senkron (~1.089). | 🟡 | Aynı kural iki yerde yazmıyor; okuyan tek yerden okuyor | BEKLIYOR | §B.4 · A.3 ile **örtüşür, toplanmaz** · E-10 |

---

## 4. ⭐ HAZIR KARAR KARTLARI

### KARAR-?? · `devir/01` ve `devir/06`: "dondurulmuş" mu, "kalıcı referans" mı? [ÜRÜN KARARI]

**Şu an ne var:** İki devir belgesi künyesinde **tek cümle içinde** hem 📸 DONDURULMUŞ hem "kalıcı referans" yazıyor (`devir/01:3`, `devir/06:3`). Üstelik `01`'in başlığı **"yeni sohbet önce bunu oku"**. İçlerinde bugün geçersiz olan **6 "PR aç, merge etme" satırı** var (`01`'de 2 · `06`'da 2 · `03`'te 1 · `04`'te 1). Kanıt: `docs/00-BELGE-HARITASI.md:61`.

**Sorun ne:** Yeni bir oturum "önce bunu oku" diyen belgeyi açıp **artık geçerli olmayan merge kuralını** öğreniyor. Doğrusu kapıya bağlı (🟢 merge et · 🟡 PR'da bekle · 🔴 dokunma). Sonuç: ajan 🟢 işleri merge etmiyor, otonom kuyruk tıkanıyor. BB turu 9 yeri düzeltti ama bu 6'sına "dondurulmuş belgeye dokunulmaz" gerekçesiyle dokunmadı — **iki turdur açık**.

**Neden sana soruyorum:** Dondurulmuş belgeye dokunmak "tarihsel iz" ilkesini deler; dokunmamak yanlış kuralı yürürlükte bırakır. İkisi de belge politikası kararı, teknik değil.

**Seçenekler:**
- **A · Künyeden "kalıcı referans" ibaresini kaldır, yönlendirme ekle.** Kullanıcı: `01`/`06` açınca "bu 2026-08-11 fotoğrafıdır; güncel kural `CLAUDE.md § MERGE POLİTİKASI`" uyarısını görür. Kazanç: tarihsel iz **tam korunur**, yanlış kural etkisizleşir. Kayıp: belge hâlâ "önce bunu oku" diyor, yeni gelen yine oradan başlıyor. Süre **S** · geri alınır ✅ · migration yok.
- **B · 6 bayat satırı `~~[ESKİ]~~` + GÜNCELLEME ile damgala** (BB'nin diğer 9'da yaptığının aynısı). Kullanıcı: satırı görür ama üstü çizilidir, altında doğrusu yazar. Kazanç: **tutarlılık** — aynı kural her yerde aynı biçimde düzeltilmiş olur. Kayıp: dondurulmuş belge düzenlenmiş olur (ilke esner); 4 dosyaya dokunulur. Süre **S** · geri alınır ✅ · migration yok.
- **C · `devir/01-06` setini arşive taşı, yerine tek "yeni gelen" sayfası.** Kullanıcı: tek güncel başlangıç sayfası görür. Kazanç: kök sorun biter, "önce bunu oku" tek ve doğru yere işaret eder. Kayıp: **en pahalısı** — 6 belge taşınır, onlara giden atıflar kırılır, devir hikâyesi dağılır; SİLME PROTOKOLÜ'nün 5 adımı işletilmeli. Süre **M** · geri alınır ⚠️ (git mv, atıflar elle) · migration yok.

**Karşılaştırma:** A en ucuz ve ilkeye en sadık olanı, ama "önce bunu oku" tuzağını bırakıyor. B tutarlılığı sağlıyor ve BB'nin zaten kurduğu deseni tamamlıyor; ilkeden sapması küçük çünkü damga **silme değil ekleme**. C sorunu kökten çözüyor ama bu turun kapasitesinin üstünde ve atıf ağını riske atıyor.

**Benim önerim:** **B** — çünkü BB zaten 9 yeri bu desenle düzeltti; 6'sını dışarıda bırakmak kuralın kendisini yarım uygulamak oluyor, ve damga hiçbir tarihsel izi silmiyor.

**Cevap vermezsen:** Y-?? (kişi adı) dışındaki belge işleri ilerler ama **yeni her oturum yanlış merge kuralını okumaya devam eder**; otonom kuyruk 🟢 işlerde tıkanmayı sürdürür.

**CEVAP:**

---

### KARAR-?? · Kuralların "geçersizleşme koşulu" zorunlu olsun mu? [ÜRÜN KARARI]

**Şu an ne var:** 74 kuraldan **6'sının** (%8,1) geçersizleşme koşulu yazılı; 68'inin yok. 6'sının hiçbiri ölçülebilir tetik taşımıyor ("X olunca" diyor, X'i kimin ne zaman kontrol edeceği yazılı değil) — bu yüzden **hiçbiri kendiliğinden tetiklenmemiş**. Sonuç: koşulu fiilen sağlanmış 4 kural hâlâ yürürlükte görünüyor (§B.3), biri **yanlış kanıta dayanan bir güvenlik kuralı**.
⚠️ Brief "KURAL 17 var ama yarım uygulanmış" diyordu — **öyle bir kural yok** (13 terim · BB + 11 dal · 0 dosya).

**Sorun ne:** Kurallar yalnız **birikiyor**, hiç düşmüyor. CLAUDE.md son 2 günde +4.876 karakter büyüdü. Her ders yeni kural oluyor, hiçbiri emekliye ayrılmıyor.

**Neden sana soruyorum:** Bu konseyin özel kuralı *"CLAUDE.md'yi BÜYÜTECEK hiçbir öneri kabul edilmez"* diyor. Böyle bir kural eklemek CLAUDE.md'yi büyütür. **Ben bu yüzden önermiyorum** — ama sorunun kendisi gerçek ve kararı senin.

**Seçenekler:**
- **A · Kural EKLEME. Bunun yerine §B.3'teki 4 bayat kuralı tek seferde düzelt.** Kullanıcı/ajan: yanlış kanıta dayanan güvenlik kuralı düzelir. Kazanç: CLAUDE.md **büyümez**, bugünkü zarar biter. Kayıp: **mekanizma kurulmaz** — 3 ay sonra aynı yerde olursunuz. Süre **S** · geri alınır ✅.
- **B · Kural ekle ama yer aç: B.4 birleştirmeleriyle birlikte uygula.** Kazanç: mekanizma kurulur **ve** dosya yine de küçülür (birleştirme ≈7.249 krk kazandırıyor, kural ~400 krk). Kayıp: kural sayısı artar (65→66), her yeni kural yazımı biraz daha zahmetli olur. Süre **M** · geri alınır ✅.
- **C · Kural yerine ALIŞKANLIK: KURAL 12'nin (tazelik denetimi) 3. ayağını script'e bağla.** Kazanç: **sıfır karakter maliyeti** — denetim otomatik olur, CLAUDE.md hiç büyümez. Kayıp: script yazılana kadar hiçbir şey değişmez; `CLAUDE.md:412` bunu "ileride" diyeli beri **hiç yapılmadı**, aynı akıbet olabilir. Süre **M** · geri alınır ✅.

**Karşılaştırma:** A bugünü kurtarır, yarını kurtarmaz. B kalıcı çözüm ama kural sayısını artırır — konseyin yasağıyla ancak birleştirmelerle birlikte uygulanırsa bağdaşır. C en zarif olanı (maliyet sıfır) ama aynı söz bir kez verilip tutulmadı; script gerçekten yazılacaksa en iyisi, yazılmayacaksa en kötüsü.

**Benim önerim:** **A şimdi, C sonra** — B'yi önermiyorum çünkü konseyin yasağını ancak bir paketle birlikte deler; A'nın kazancı kesin ve bugün alınabilir, C ise ayrı bir iş olarak kuyruğa girebilir.

**Cevap vermezsen:** §B.3'teki 4 bayat kural yürürlükte kalır — en ciddisi `CLAUDE.md:519`'daki **yanlış kanıtlı güvenlik kuralı**; ve kural birikmesi aynı hızla sürer.

**CEVAP:**

---

### KARAR-?? · 4 "yaşayan ama ölü" belge dondurulsun mu? [ÜRÜN KARARI]

**Şu an ne var:** 26 aktif 🔄 YAŞAYAN belgeden **2'si kesin ölü**, **2'si ölü adayı** (§D.1). İkisi kendi içinde *"işi X devraldı"* yazıyor ama künyesi hâlâ 🔄 diyor.

**Sorun ne:** 🔄 damgası "buraya bak, güncel" demek. Okuyan ölü belgeyi güncel sanıp yanlış yere yazıyor ya da bayat bilgiyi doğru sanıyor.

**Neden sana soruyorum:** Bir belgeyi dondurmak "bu artık canonical değil" demektir — KURAL 7 gereği canonical kararı PO'nundur. Ayrıca `10-yol-tamamlananlar` için **atıf zinciri** var: `10-yol-haritasi.md:7` hâlâ oraya yönlendiriyor.

**Seçenekler:**
- **A · Yalnız 2 kesin ölüyü dondur** (`08-acik-sorular` · `kod-kalemleri`). Kullanıcı: bu ikisi "📸 dondurulmuş, güncel için X" diyor. Kazanç: kanıtı kendi içinde olan iki vaka kapanır, risk sıfır. Kayıp: 2 ölü aday belirsiz kalır. Süre **S** · geri alınır ✅.
- **B · Dördünü birden dondur.** Kazanç: 🔄 kümesi tamamen dürüst olur. Kayıp: `10-yol-tamamlananlar` dondurulursa `10-yol-haritasi.md:7`'deki yönlendirme **kırık atıf** olur — önce o düzeltilmeli; `G9` için KURAL 12 eşiği henüz dolmadı (2026-10-02), erken dondurmak kuralı delmek olur. Süre **M** · geri alınır ✅.
- **C · Hiçbirini dondurma, yalnız "son güncelleme" tarihi ekle.** Kazanç: hiçbir canonical değişmez. Kayıp: **asıl sorun çözülmez** — okuyan yine 🔄 görüp güncel sanar. Süre **S** · geri alınır ✅.

**Karşılaştırma:** A risksiz ve kanıtı belgelerin kendisinde. B daha eksiksiz ama iki ön koşul istiyor (atıf düzeltme + eşik bekleme). C sorunu görünür kılar ama çözmez.

**Benim önerim:** **A** — iki kesin vaka bugün kapansın; `10-yol-tamamlananlar` `10-yol-haritasi.md:7` düzeltildikten sonra, `G9` ise 2026-10-02'de kendi kuralıyla dondurulsun.

**Cevap vermezsen:** 4 belge 🔄 görünmeye devam eder; `00-BELGE-HARITASI`'nın 🔄 sayımı da yanlış kalır.

**CEVAP:**

---

## 5. PO'NUN ELLE YAPACAKLARI

| # | İş | Neden PO |
|---|---|---|
| 1 | ⭐ **`DATABASE_URL` teyidi** — canlı hangi DB? (§A.6 AÇ-1) | Dokploy paneline erişim PO'da. `03-PO-ELLE-ISLER.md` "ADIM 0" olarak zaten açık. **Çözme talimatı gereği bu tur dokunmadı.** |
| 2 | **BB ve AZ dallarının merge sırası** — AZ önce ya da BB ile birlikte (§C.2 C-3) | Merge yetkisi; yanlış sıra BB'nin kanıt atıflarını boşa düşürür |
| 3 | **KURAL 16 ADAYI'na onay** — 19 gündür bekliyor; 14/15 onaylandı, 16 atlandı | Numara verme yetkisi PO'da (kuralın kendi metni) |
| 4 | Üç karar kartının cevabı (§4) | Ürün/belge politikası |

---

## 6. ✅ ZATEN İYİ

- **Kapı tanımları (🟢/🟡/🔴) üç dosyada da tutarlı** — `OTONOM-PROMPT.txt:186-194` ≡ `00-KUYRUK.md:9-19` ≡ `CLAUDE.md:30,44,45`. Çelişki yok.
- **`## GEÇMİŞ` mekanizması çalışıyor** — `00-KARAR-TAKIP.md:850` bölümü açılmış, 3 kalemde uygulanmış; `09-DURUM` 38 uzun satırdan 3'e inmiş, taşınan 35'i arşivde **denetim sayısıyla** (`kalan 244 + taşınan 219 = 463 ✅`). Desen kurulmuş, yalnız kalanlara uygulanmamış.
- **KURAL 2-B (eksen çakışması) yazılmış ve `panel/` + `persona/` klasörlerinde uygulanmış** — çapraz atıf bölümleri yerinde (`panel/00-INDEX.md:12`, `persona/00-INDEX.md:10-13`). 2026-09-20'deki kaybın tekrarı bu iki klasörde engellenmiş.
- **BB turu 9 bayat merge satırını doğru desenle düzeltti** (üstü çizili + tarihli GÜNCELLEME, silme yok) ve **kendi sayım hatasını da düzeltti** ("14 satır" → gerçek 15).
- **Canonical beyanı çelişkisiz:** hem `rehber:124` hem `CLAUDE.md:381` "rehber = canonical" diyor. Sorun beyanın kendisinde değil, uygulamada.
- **`00-ONCELIK-SIRASI-2026-08-28.md` BB'de zaten dondurulmuş** — "🔄 ama DEVREDİLDİ" çelişkisi bu turda değil, BB turunda kapanmış (main'e bakan yanılır).

---

## 7. TARANAMAYANLAR

| Ne | Neden |
|---|---|
| Canlı DB / `.env` içerikleri | PO'da; bulut oturumunun erişimi yok (§A.6 AÇ-1 bu yüzden çözülmedi) |
| Dört paralel konseyin henüz açılmamış dalları | Aynı anda çalışıyorlar; yalnız `AZ`, `BA`, `BB`, `F19` dalları görüldü |
| 🔄 damgasının `YASAYAN` (şapkasız) varyantı | Tarama `🔄 YAŞAYAN` desenine dayandı → ❓ TEYİT GEREK (küçük pay) |
| `00-BELGE-HARITASI` "🔄 34" ↔ bu turun "29" farkı | Haritanın sayım yöntemi yazılı değil → ❓ TEYİT GEREK |
| `scripts/verify.sh` ve CI workflow içerikleri | Bu turun kapsamı belge yönetişimiydi; kod tarafı açılmadı |
| B.4 kazanç rakamlarının karakter doğrulaması | Kaynak analiz bayt/karakter karışık ölçmüş → **±%7 yaklaşık** işaretlendi (§B giriş notu) |

---

**SONRAKİ TUR: bu bulgular `docs/otonom/00-KUYRUK.md` AŞAMA Y'ye işlenecek.**
