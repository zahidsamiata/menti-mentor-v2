> 🌡️ ILIK — gerektiğinde okunur (rutin turda değil). Okuma kuralı: OTONOM-PROMPT.txt § 0.4
> TÜR: 🌡️ · SON DOĞRULAMA: ❓ içerik denetlenmedi (başlık 2026-09-23 DA turunda eklendi) · TAZELEME TETİKLEYİCİSİ: ilgili kod ya da karar değişince

# Belge Düzeni Rehberi

**🔄 YAŞAYAN** (düzen kuralları geliştikçe güncellenir) · Son güncelleme: 2026-08-23 (Kural 2 alt-klasör + Kural 7 taşıyıcı iş bölümü + Kural 8 bulgu yaşam döngüsü)

> **Amaç:** `docs/` bir daha dağılmasın; "neyin nerede olduğu, hangi bilginin güncel olduğu" her zaman net bulunsun.
> Bu, tek seferlik temizlik değil **kalıcı düzen**dir. Belge oluşturan/düzenleyen (ajan dahil) ~~bu 6 kurala~~ bu kurallara uyar. ⚠️ ÇELİŞKİ (2026-09-23, CS raporu): "6 kural" bayat — dosyada artık KURAL 1-16 (bölme sonrası 18 blok, YN-02) var. Kanıt: aynı dosyadaki KURAL başlıkları. Düzeltme = YN-02 / AN-44 kuyruk işi.
> Mevcut `CLAUDE.md` kuralları "Belge Eş-Zamanlılığı" ve "Belge Düzeltme Deseni" ile tutarlıdır.

---

## KURAL 1 — Tek gerçek kaynağı (single source of truth)
- Her konunun **BİR yetkili (canonical) belgesi** olur; diğerleri ona **işaret eder**, bilgiyi **kopyalamaz**.
- Canonical'lar: **güncel durum → `09-DURUM.md`** · **iş kuyruğu → `10-yol-haritasi.md`** · **çalışma disiplini → `CLAUDE.md`**.
- **Neden:** kopyalanan bilgi eskir ve çelişir. **Uygulama:** aynı bilgi iki belgede çelişirse **canonical kazanır**;
  ikincil belge canonical'a link verir ("bkz. 09-DURUM").

## KURAL 2 — Belge türü = klasör
- **`kararlar/`** = yaşayan güncel kararlar + durum + kuyruk. **`raporlar/`** = bir kerelik keşif/analiz çıktıları
  (tarihli, dondurulmuş). **`arsiv/`** = eskimiş/geçersiz ama tarihsel iz için saklanan.
- **Neden:** klasör, belgenin ömrünü ve amacını baştan söyler. **Uygulama:** yeni belge oluşturulurken **türüne
  göre doğru klasöre** konur (keşif raporu → `raporlar/`, karar → `kararlar/`, eskiyen → `arsiv/`).

> ⚠️ GÜNCELLEME (2026-08-23): `kararlar/` ve `raporlar/` şişince **alt-klasörlere** ayrıldı (git mv, içerik değişmedi).
> Tür=klasör kuralı korunur, bir kademe derinleşti. Yeni belge doğru alt-klasöre konur:
> - **`kararlar/`** (kök) → yalnız yaşayan canonical taşıyıcılar: `00-INDEX` · `09-DURUM` · `00-KARAR-TAKIP` ·
>   `10-yol-haritasi` · `10-yol-tamamlananlar` (bunlar kökte kalır, taşınmaz).
> - **`kararlar/konu/`** → konu bazlı kalıcı karar belgeleri (vizyon, mimari, güvenlik, tasarım, çalışma tarzı,
>   DISC/yaşam-döngüsü, `belge-duzeni-rehberi`, tasarım-kararları, teslim/metrik tasarımı).
> - **`kararlar/oz-denetim/`** → belgelerin/kararların **kendi iç** denetimi (belge hijyeni, karar-statü haritası,
>   unutulmuş-niyet envanteri, durum panosu) — "kararlarımız gerçekle uyumlu mu?".
> - **`raporlar/kesif/`** → keşif/teşhis fotoğrafları (repo/backend envanteri, kapasite, rakip/tema/katılım, teşhis, panel tasarımı).
> - **`raporlar/kod-denetimi/`** → **kodun gerçeğe karşı** denetimi (envanter ↔ kod, strateji ↔ kod, kapsamlı denetim, eksik analizi).
> - **`raporlar/panel/`** → platform ↔ tenant admin panel envanteri + strateji (kardeş çiftler).
> - **`raporlar/persona/`** → menti/mentör/yönetici persona + sevdirme/metrik belgeleri.
> - **`raporlar/icerik/`** → test/değerlendirme içerik arşivi (soru/cevap dökümü).
>
> **İki "denetim" ayrımı (adına bak, hangisi olduğu anlaşılsın):** `oz-denetim/` = **belge/karar** iç denetimi
> (kendi kararlarımızın hijyeni) · `kod-denetimi/` = **kod/ürün** denetimi (belge ne diyor ↔ kod ne yapıyor).

## KURAL 2-B — EKSEN ÇAKIŞMASI: konu mu, yöntem mi? *(eklendi 2026-09-19)*
`raporlar/` alt klasörleri iki farklı eksende tanımlı: **KONU** ekseni (`panel/` · `persona/` · `icerik/`) ve
**YÖNTEM** ekseni (`kod-denetimi/` · `kesif/` · `bilanco/`). Bir belge hem KONU hem YÖNTEM klasörüne aitse (ör. menti personasının kod denetimi):
- Belge **YÖNTEM** klasörüne yazılır (mevcut uygulama korunur).
- ⛔ ZORUNLU: ilgili **KONU** klasörüne bir satırlık **ÇAPRAZ ATIF** bırakılır. Konu klasöründe `00-INDEX.md` yoksa oluşturulur; varsa satır eklenir.
- ⛔ **İNDEKS ADI TEKTİR: `00-INDEX.md`** *(netleştirme 2026-09-21)*. Türkçe `00-INDEKS.md` **yeni açılmaz.**
  **Yeni indeks açmadan ÖNCE** `ls <klasör>/00-IND*` çalıştır: **adı ne olursa olsun** bir indeks varsa
  **satır eklenir, yeni dosya AÇILMAZ.** (Gerekçe: yukarıdaki *"yoksa oluşturulur"* ifadesi, Türkçe adlı
  indeksi göremeyip aynı klasörde **ikinci indeks** açma riski taşıyordu.)
  ⚠️ **Mevcut `docs/raporlar/icerik/00-INDEKS.md` YENİDEN ADLANDIRILMADI** — 2026-09-21 ölçümü:
  **11 atıf / 4 dosya**, markdown link biçiminde **0**, kod/script atfı **0**. Atıfların bir kısmı
  tarihsel kayıtta (oturum günlüğü, 09-DURUM) olduğu için adlandırma değişikliği tarihsel iz bozar;
  kural genişletmesi aynı riski tek satırda kapatıyor. İki ad **kalıcı değil, geçicidir**: o klasör
  bir sonraki düzenlemede `00-INDEX.md`'ye taşınırsa atıflar aynı turda güncellenir.
  Biçim: `<konu> kod denetimi → ../<yöntem-klasörü>/<dosya>.md (tarih, satır aralığı)`

Gerekçe (2026-09-19): mentör/menti kıyası `kod-denetimi/` altındaydı, `panel/` altında arandı, bulunamadı, **bir tur tamamen tekrar edildi** (bkz. `docs/00-BELGE-HARITASI.md` B.0).

## KURAL 3 — Yaşayan mı, dondurulmuş mu (üst etiket)
- Her belgenin **en üstünde** net etiket olur: **🔄 YAŞAYAN** (sürekli güncellenir; ör. `09-DURUM`) veya
  **📸 DONDURULMUŞ (tarih)** (o günün fotoğrafı, güncellenmez; ör. keşif raporları).
- **Neden:** okuyan "bu güncel mi?" diye şüphe etmesin. **Uygulama:** dondurulmuş belge sonradan **düzenlenmez**;
  yanlışsa Kural 6 ile üstüne not düşülür veya arşive taşınır.

## KURAL 4 — Adlandırma
- **Dondurulmuş** belgeler **TARİHLİ** (ör. `teshis-raporu-2026-08-02`, `stk-admin-bulgu-envanteri-2026-08-11`).
- **Yaşayan** belgeler **TARİHSİZ / sabit-numaralı** (ör. `09-DURUM`, `10-yol-haritasi`, `belge-duzeni-rehberi`).
- **Neden:** isimden bile "fotoğraf mı yaşayan mı" anlaşılsın. **Uygulama:** dosya adını türüne göre seç.

## KURAL 5 — INDEX = harita
- **`docs/kararlar/00-INDEX.md`**, "neyi nerede bulurum"un **TEK kapısıdır**. Her önemli belgeyi listeler:
  ne olduğu + **canonical mı / arşiv mi** + **yaşayan mı / dondurulmuş mu**.
- **Neden:** `docs/`'a bakan önce tek yerden yönelensin. **Uygulama:** **yeni belge eklenince INDEX güncellenir**
  (bu, belge işinin bitiş adımıdır — atlanmaz).

## KURAL 6 — Eksik/yanlış işaretleme (silme yok)
- Güncelliğini yitirmiş/şüpheli bilgi **silinmez**; **başına** net uyarı konur:
  **`⚠️ GÜNCELLEME (tarih): [ne değişti / teyit gerek]`**.
- **Neden:** tarihsel iz korunur + kimse eski bilgiyi güncel sanmaz ("yanlış bilgiyi okumak, hiç okumamaktan kötü").
- **Uygulama:** mevcut `CLAUDE.md` "Belge Düzeltme Deseni" ile aynı; yaşayan belgede blok bayatladıysa üstüne
  bu notu ekle, gerçeğiyle güncelle (bkz. bu turda `09-DURUM` "açık PR" bloğu düzeltmesi).

## KURAL 7 — Taşıyıcı belgelerin iş bölümü (sınır kuralı) *(eklendi 2026-08-23)*
- **Neden:** İki 🔄 yaşayan belge aynı konuyu paralel takip ederse zamanla ayrı düşer ve çelişir (bugün G1/G2 güvenlik
  bulgusu yol-haritasında vardı ama karar-takipte yoktu — sınır yazılı olmadığı için). Her bilgi türünün **TEK canonical'ı** olur.
- **Uygulama:** aşağıdaki tablo. Aynı statü iki yaşayan belgeye **yazılmaz** — biri REFERANS verir (madde no / link), statüyü tek yer tutar.
  Çelişince **KOD kazanır**, tek-canonical düzeltilir, diğerleri referansı korur.

| Belge | ⬅ BURAYA GİRER (canonical) | ⛔ GİRMEZ (nereye ait) |
|---|---|---|
| `09-DURUM.md` | "ŞU AN ne oldu" anlatısı: son merge/PR, SHA/pointer snapshot, biten işin kod-anlatısı (dosya:satır, migration teyidi), bilinen sınırlar | açık iş kuyruğu/öncelik (→10-yol) · tek-bakış açık-iş/ölü-kod tablosu (→KARAR-TAKIP) · belge haritası (→INDEX) · biten iş özet-satırı (→tamamlananlar) |
| `10-yol-haritasi.md` | YALNIZ açık/yapılacak işlerin **öncelik sıralı kuyruğu** (v1/v2, madde no sabit, sıradaki somut adım — tek satır) | biten işin tam anlatısı (→09-DURUM) · biten iş özet-kaydı (→tamamlananlar) · ölü-kod niyet analizi (→KARAR-TAKIP) · SHA/snapshot (→09-DURUM) |
| `00-KARAR-TAKIP.md` | "NE KALDI" tek-bakış: açık iş + yarım iş + **ölü/bağlanmamış kod** (niyet→neye bağlanacak) + uygulanmamış karar; her kalem **kod-kanıtlı** (dosya:satır) | öncelik sıralaması (→10-yol) · "ne oldu" anlatısı/SHA (→09-DURUM) · biten iş kaydı (→tamamlananlar). *(Açık işleri 10-yol ile aynı madde-no ile REFERANSLAR, statüyü kopyalamaz.)* |
| `10-yol-tamamlananlar.md` | Biten v1 işlerinin **kompakt kaydı**: madde no + tek satır + PR no + tarih | tam anlatı/kod-detay (→09-DURUM) · açık/kısmi işler (→10-yol; kısmi burada DURMAZ) · ölü kod (→KARAR-TAKIP) |
| `00-INDEX.md` | Belge **haritası**: hangi bilgi hangi belgede, canonical mı/arşiv mi, 🔄 mı 📸 mı, okuma yolu | iş statüsü/durum içeriği (→09/10/KARAR-TAKIP) · karar gövdeleri (→konu/). *(Yalnız işaret eder, içerik tutmaz.)* |
| `00-CIKIS-PLANI.md` | Çıkış **önceliği sınıflandırması** (K0-K5 + tur planı): "hangi iş çıkıştan önce/sonra" bakışı | iş statüsü (→KARAR-TAKIP/09) · kuyruk detayı (→10-yol) · kanıt (→KARAR-TAKIP). *(Maddelere referans verir, statü/detay tutmaz.)* |

- **Yazımdan önce sor:** (1) "ne oldu" mu (→09), "ne kalacak" mı (→10/KARAR-TAKIP), "nerede" mi (→INDEX)? (2) Aynı statüyü ikinci yaşayan belgeye mi yazıyorum → DUR, biri referans versin. (3) Statü kaynağı hep KOD.

## KURAL 8 — Bulgu yaşam döngüsü (bulgu nasıl akar) *(eklendi 2026-08-23)*
- **Neden:** KURAL 7 "hangi bilgi nerede DURUR" der; KURAL 8 "bir bulgu keşiften çıkışa nasıl AKAR" der. Bu akış olmadan bulgular
  rapordan doğrudan yol haritasına sızıp mükerrer numara/kayıp madde üretir (bu turlarda yaşandı). **Tek giriş kapısı = KARAR-TAKIP.**
- **Akış (her bulgu bu sırayı izler):**
  1. **Keşif turu → tarihli 📸 rapor** (`raporlar/` altına). Ham kanıt (dosya:satır), güncellenmez. **Rapor AKSİYON KAYNAĞI OLARAK BIRAKILMAZ.**
  2. **AYNI TURDA → her aksiyon `00-KARAR-TAKIP`'e girer.** TEK GİRİŞ KAPISI. **Numarasını BURADA alır** (tek numara dizisi; başka hiçbir yerde numara verilmez). Rapordan doğrudan yol haritasına giden bulgu OLMAZ.
  3. **Öncelik verilince → `10-yol-haritasi`'na TEK SATIR** (numara + tek cümle + öncelik + "detay: KARAR-TAKIP"). Detay kopyalanmaz.
  4. **İş bitince → önce KOD doğrulanır, sonra dört yer:** KARAR-TAKIP ✅ · yol haritası stub · `10-yol-tamamlananlar` kaydı · `09-DURUM` anlatısı.
  5. **Oturum bitince → `07-oturum-gunlugu`'na bölüm.** ⚠️ (2026-09-24, DC turu): 📸 `07` günlük olarak donduruldu (son kayıt 2026-09-20); tur kaydının fiilî yeri `docs/otonom/02-ILERLEME.md`. Kural↔uygulama çelişkisi PO kararına bırakıldı — bkz. `docs/raporlar/kesif/devir-klasoru-envanteri-2026-09-24.md` §"Bulunan kural çelişkisi".
- **Uygulama:** numara yalnız KARAR-TAKIP'te doğar → çakışma olmaz (bkz. #38 çakışması, 2026-08-23'te ada çevrilerek çözüldü).

---

## Özet (tek bakış)
| # | Kural | Pratik |
|---|---|---|
| 1 | Tek gerçek kaynağı | Kopyalama, link ver; çelişkide canonical kazanır |
| 2 | Tür = klasör (+ alt-klasör 2026-08-23) | kararlar/ yaşayan (kök: canonical · konu/ · oz-denetim/) · raporlar/ dondurulmuş (kesif/ · kod-denetimi/ · panel/ · persona/ · icerik/) · arsiv/ eskiyen |
| 3 | Yaşayan/dondurulmuş etiketi | Belge üstünde 🔄 veya 📸 (tarih) |
| 4 | Adlandırma | Dondurulmuş=tarihli · yaşayan=tarihsiz/numaralı |
| 5 | INDEX = harita | Yeni belge → 00-INDEX güncelle |
| 6 | Eksik-işaretleme | Silme; ⚠️ GÜNCELLEME (tarih) notu ekle |
| 7 | Taşıyıcı belge iş bölümü | 5 taşıyıcının sınırı: statü tek yerde, diğerleri referans; çelişkide KOD kazanır |
| 8 | Bulgu yaşam döngüsü | rapor(📸)→KARAR-TAKIP(numara burada doğar)→yol-haritası(tek satır)→biten:4 yer→günlük |

> **Canonical:** Bu rehber, belge düzeninin tek yetkili kaynağıdır. `CLAUDE.md` buraya işaret eder.

---

# ⭐ KURAL 8-16 — `CLAUDE.md`'den taşındı (2026-09-21)

> **Ne zaman / neden:** 2026-09-21, yönetişim konseyi CLAUDE.md bölme planı KADEME 1.
> `CLAUDE.md` 40.000 karakter uyarı sınırını aşıyordu; bu blok **aynen** buraya taşındı.
> ⛔ **Hiçbir satır silinmedi, tek karakter değişmedi.** KURAL 1-8 zaten bu belgedeydi → seri artık **tek dosyada**.
> (Bu, `CLAUDE.md`'de KURAL 8'in hem özet hem gövde olarak iki yerde durması sorununu da kapatır.)
> `CLAUDE.md` → "Belge düzeni — KURAL 1-16" satırı buraya işaret eder.

## Belge Düzeni — her belge işinde uy
- Belge oluştururken/düzenlerken `docs/kararlar/konu/belge-duzeni-rehberi.md`'deki **8 düzen kuralına** uyulur:
  (1) tek gerçek kaynağı/canonical, (2) tür=klasör + alt-klasör (kararlar/raporlar/arsiv), (3) yaşayan 🔄 / dondurulmuş 📸 üst-etiketi,
  (4) adlandırma (dondurulmuş=tarihli, yaşayan=tarihsiz), (5) yeni belge → `00-INDEX.md` güncelle, (6) eksik-işaretleme (⚠️ GÜNCELLEME, silme yok),
  (7) taşıyıcı belge iş bölümü (statü tek yerde, diğerleri referans), (8) bulgu yaşam döngüsü (aşağıda).
- Bu kurallar "Belge Eş-Zamanlılığı" + "Belge Düzeltme Deseni" ile tutarlıdır; çelişki yok. Rehber = canonical.

### KURAL 8 — Bulgu yaşam döngüsü (keşif turu tur-sonu kontrol listesi)
- (1) Keşif → **tarihli 📸 rapor** (`raporlar/`); ham kanıt, aksiyon kaynağı olarak bırakılmaz.
- (2) **Her aksiyon `00-KARAR-TAKIP`'e girer — numarasını YALNIZ orada alır** (tek numara dizisi; rapordan doğrudan yol haritasına madde geçmez).
- (3) Öncelik verilince → `10-yol-haritasi`'na **tek satır** (numara + öncelik + "detay: KARAR-TAKIP"); detay kopyalanmaz.
- (4) İş bitince → **önce KOD doğrula**, sonra 4 yer: KARAR-TAKIP ✅ · yol-haritası stub · `10-yol-tamamlananlar` · `09-DURUM`.
- (5) Oturum bitince → `devir/07-oturum-gunlugu`'na bölüm. ⚠️ (2026-09-24, DC turu): 📸 `07` günlük olarak donduruldu (son kayıt 2026-09-20); tur kaydının fiilî yeri `docs/otonom/02-ILERLEME.md`. Kural↔uygulama çelişkisi PO kararına bırakıldı — bkz. `docs/raporlar/kesif/devir-klasoru-envanteri-2026-09-24.md` §"Bulunan kural çelişkisi".

> **⚠️ GÜNCELLEME (2026-08-27): KURAL 9-12 yürürlüğe girdi** — 4-turluk belge bilançosunun kök-neden teşhisinden çıktı
> (`docs/raporlar/bilanco/tekrar-onleme-2026-08-26.md`, PO onaylı). Amaç: ~175 kalemin numarasız izsizleşmesi + 15 sözün
> 11'inin devralınmaması + bayat "yapıldı" iddiaları bir daha yaşanmasın. KURAL 8'i tamamlarlar, çelişmezler.

### KURAL 9 — Her rapor KALEM LİSTESİ'yle biter
- Keşif/denetim/analiz raporu üreten HER tur, raporu **"KALEM LİSTESİ"** bölümüyle bitirir. Listede satır almayan bulgu, **bulgu SAYILMAZ** (rapor gövdesine gömülü kalıp kaybolmaz).
- Her satır 3 alan taşır: **kalem** (tek cümle) · **önerilen durum** (aşağıdaki 6'dan biri) · **numara-adayı-mı** (evet/hayır — bu sütun ZORUNLU; yoksa yine numarasız liste doğar).
- Bu liste, bulguların `00-KARAR-TAKIP`'e girişinin (KURAL 8 adım 2) kaynağıdır — rapordan doğrudan aktarılır.

### KURAL 10 — ✅ kanıtsız basılmaz
- "YAPILDI" (✅) yazabilmek için **kod kanıtı (dosya:satır) VEYA açık "KOD DIŞI" etiketi ZORUNLU.** Belge beyanı tek başına YETMEZ.
- **Kısmi iş ✅ değildir → 🟡 YARIM** (ne var / ne yok, ikisi de kanıtlı). Belge ↔ kod çelişirse KOD kazanır.
- **Durum kodları 6 tanedir (başkası YASAK):** ✅ YAPILDI · 🟡 YARIM · 🔀 PR'DA · ⬜ AÇIK · ❓ TEYİT GEREK · 🗑️ GEÇERSİZ ADAYI.

### KURAL 11 — Söz açılışta okunur (EN KRİTİK — disiplin sona değil BAŞA)
- `00-KARAR-TAKIP.md`'de **"⭐ SONRAKİ-TUR SÖZLERİ"** bölümü tutulur (YENİ DOSYA AÇMA — ikinci kaynak = çelişki riski).
- Oturum kapanışında verilen her söz ("sonraki turda/ileride yapılacak"), `07-oturum-gunlugu`'ye yazıldığı AN buraya da **tek satır** kopyalanır (söz · hangi oturum · durum · ilgili madde no). ⚠️ (2026-09-24, DC turu): 📸 `07` günlük olarak donduruldu (son kayıt 2026-09-20); tur kaydının fiilî yeri `docs/otonom/02-ILERLEME.md`. Kural↔uygulama çelişkisi PO kararına bırakıldı — bkz. `docs/raporlar/kesif/devir-klasoru-envanteri-2026-09-24.md` §"Bulunan kural çelişkisi".
- **Her oturum BAŞINDA bu bölüm OKUNUR** ve ürün sahibine açık sözler hatırlatılır. Söz yerine getirilince ✅ + kaldırılır. *(Teşhis: 15 sözün 11'i devralınmadığı için düştü; disiplin oturum sonundan başına taşındı.)*

### KURAL 12 — Tazelik denetimi (3 ayak; 30-gün ikincil)
- **Birincil (yapısal-tetik):** Yapısal kod değişiminde (model ekle/sil, dosya kaldır, ortam/env değişimi) ilgili **`CLAUDE.md` dosyaları DOĞRULANIR** — model sayısı, dosya adları, ortam bilgisi grep'le kontrol edilir. *(backend/CLAUDE.md "5 model / iceBreaker.ts" bu yüzden aylarca bayat kaldı.)*
- **İkincil (karar-yayılımı):** Bir karar değişince **"bunu başka nerede yazmışız"** belge taraması yapılır *(bilançoda 9 çelişki bu yüzden doğdu — ör. sunucu ülkesi 5 belgede).*
- **Üçüncül (süre):** 🔄 YAŞAYAN belge 30 günü aşarsa "bayat" işaretlenir — bu ayak **ELLE değil, ileride script ile** (elle yapılırsa unutulur; maliyet>fayda). Şimdilik birincil+ikincil elle yürür.

### KURAL 13 — NEGATİF İDDİA GENİŞ ARAMAYLA KANITLANIR
- "Bu alan/dosya/kod/özellik YOK" demek için arama **backend + frontend + test + seed + belgeleri** kapsamalı ve **büyük-küçük harf duyarsız** olmalı. Dar arama sonucu "yok" YAZILAMAZ.
- **Pozitif bulgu (var) tek kanıtla yeterlidir; negatif bulgu (yok) KAPSAM BEYANI ister:** "N terim · M dizin tarandı, 0 sonuç".
- ⭐ Bu kural **HERKES için geçerlidir** — ajan, alt-ajan, PO ve strateji katmanı dahil. Kural, üç kez aynı hatanın tekrarlanmasından doğdu.
- **GEREKÇE (üç vaka):**
  - Bilanço turu: "ölü" sanılan ~11 kalem kod-teyitle çürüdü.
  - S21 turu: alt-ajan 5 alanı yanlışlıkla "ölü" ilan etti (`discD/I/S/C` · `Meeting.requestMessage` · `rematchPriority` · `rematchCount` · `mentorVisibilityEnabled`) — hepsi yazılıyordu.
  - Doğrulama turu: strateji katmanı "çift ayraç hatası var" dedi — meğer dosyanın 9 oturum sınırında kullanılan KONVANSİYONMUŞ; tek örneğe bakıp genelleme yapılmıştı.
- **⭐ İKİ DİL EKİ (PO, 2026-08-30):** Bu projede KOD İngilizce, BELGELER Türkçe. Negatif iddia araması **İKİ DİLDE** yapılır:
  `club↔kulüp` · `tenant↔kurum` · `consent↔rıza` · `mentor↔mentör` · `meeting↔görüşme` · `agreement↔anlaşma` ·
  `report↔rapor` · `delete↔silme`. **ARANAN TERİMLER listesi rapora YAZILIR** ki kapsam denetlenebilsin.
  **GEREKÇE:** niyet arkeolojisi turunda `/clubs` uçları "hikâye yok" sanıldı çünkü yalnız `club` arandı — oysa kulüp
  modeli AKTİF bir PO kararı (STK ile aynı yetkiler) ve avukat paketinde kulüp beyanı şartı var. Tek dilde arayan
  yarısını kaçırır.

### KURAL 14 — CI YEŞİL ≠ TEST KOŞTU
> ✅ **ONAYLANDI (PO, 2026-09-02).** (Kanıtlı olaydan doğdu, zaten uygulanıyor.)
> ⚠️ **EK (PO, 2026-09-02):** "CI yeşil" raporlanırken **KAÇ TEST KOŞTUĞU da YAZILIR.** "0 passed" da yeşil görünür — sayı olmadan yeşil bir şey kanıtlamaz.
- Bir testin koştuğu, CI'ın yeşil olmasıyla **KANITLANMAZ.** Kanıt üç şeydir:
  (a) test dosyasının adı **CI log'unda GEÇMELİ** · (b) **TEST SAYISI** önceki koşuyla karşılaştırılmalı ·
  (c) artış, eklenen testin sayısıyla **UYUŞMALI.**
- "0 passed" da yeşil döner. **Stacked PR'da test main'e hiç ulaşmayabilir.**
- **GEREKÇE:** 2026-08-31'de e2e testi main'e ulaşmadı (stacked merge sırası), CI yeşil döndü, iki tur boyunca fark
  edilmedi; #66 ile taşınınca 442→445 kanıtlandı. (Detay: `docs/kararlar/00-KARAR-TAKIP.md` F.11.)

### KURAL 15 — KAYNAK HİYERARŞİSİ
> ✅ **ONAYLANDI (PO, 2026-09-02).** (Kanıtlı olaydan doğdu — G1-23 21. hayalet — zaten uygulanıyor.)
- **G-kartları (`docs/raporlar/bilanco/kararlar/G*.md`) = AYRINTI + KANIT.** Kaynak doğrudur; her kalemin tam tanımı,
  gerekçesi ve kod kanıtı oradadır.
- **`00-KARAR-TAKIP` = ÖZET + numara.** Turlar arası hızlı bakış; kalemin TAM tanımını taşımaz.
- ⭐ **ÇELİŞKİDE KART KAZANIR** — kanıt orada.
- ⚠️ Özet belgede bir kalemi kapatmadan ÖNCE kartın konusunun aynı olduğu DOĞRULANIR. Kısmi kanıtla tam
  kapatma yapılmaz.
- **GEREKÇE:** 2026-08-29'da `00-KARAR-TAKIP` "G1-23 → 🗑️ geçersiz (guard var)" yazdı. Guard tespiti DOĞRUYDU ama
  başka bir konuydu (sahiplik/IDOR); G1-23 kartının konusu XSS'ti ve o açıktı. Özet, ayrıntıyı yanlışlıkla kapattı
  → 21. "hayalet tamamlanmış". (Detay: `docs/raporlar/bilanco/kararlar/G1-guvenlik-kvkk.md` [G1-23].)

### KURAL 16 ADAYI — SAYILAN BİRİM TANIMLANIR (PO onaylayacak)
> ⚠️ Numara verme yetkisi PO'dadır; kural yazıldı ama **"ADAYI"** olarak — PO onaylayınca "ADAYI" düşer.
- Bir sayı raporlanmadan ÖNCE **sayılan birim tanımlanır.**
- "**N kalem**" demek YETMEZ — **hangi yerlerdeki** kalemler sayıldı açıkça yazılır: durum satırı · PO notu · alt madde ·
  başka belge · hangi dosyalar tarandı.
- Farklı birimler farklı sayı verir; ikisi de doğru olabilir. Yanlış olan, birimi söylemeden sayı vermektir.
- **GEREKÇE — üç kez aynı desen, her seferinde birim belirsizdi:**
  - Bilanço: "196 benzersiz kalem" → gerçek ≈259 (aritmetik toplam ≠ tekilleştirilmiş satır).
  - S21 envanteri: "30 satır" → ~40 benzersiz alan (bazı satırlar alan-grubu).
  - 🗑️ taraması: "6 geçersiz kart" → 15 geçersiz kalem (ilk sayım yalnız kart durum satırına baktı; PO notu,
    karar-takip ve alt maddeler sayılmadı).
- ⭐ Uygulama: iki adımlı doğrulamada (M1) "X bekliyorum" denirken **birim de söylenir.**

---

# ⭐ KURAL 18-25 — BELGE SİSTEMİ KALICI ÇÖZÜMLERİ (2026-09-23, DA turu · PO talimatı)

> ⚠️ GÜNCELLEME (2026-09-25, DA2): Bu blok PR #263'ten güncel `main` üzerine yeniden uygulandı. Aynı PR'daki türetme betiği (`scripts/otonom-turet.mjs`), `00-SIRADAKI.md` / `01-CEVAPSIZ.md` ve `OTONOM-PROMPT.txt` § 13.4/13.5 değişiklikleri bu PR'a ALINMADI — bunlara yapılan atıflar (türetme betiği henüz birleşmedi — TEYİT GEREK) notuyla işaretlidir. Rakamlar (2026-09-23 itibarıyla) ölçümdür.

> **Neden bu blok var:** 2026-09-23'te dokuz ayrı belge sorunu yaşandı; her biri tek seferlik temizlikle "çözüldü"
> ama hiçbiri TEKRARI engellemiyordu. Aynı gün arşivleme yapıldı ama dosyalar KÜÇÜLMEDİ
> (`00-KUYRUK` 163.869 → 173.431 · `02-ILERLEME` 80.586 → 84.995 karakter (2026-09-23 itibarıyla)) — aynı turda 8 yeni iş + 1 kart +
> 105 aile etiketi (2026-09-23 itibarıyla) eklendi, arşivleme kazancı silindi. ⇒ **Arşivleme tek başına yetmez; asıl çözüm HEDEFLİ OKUMA**
> (`OTONOM-PROMPT.txt` § 0.4): dosya boyutunu önemsiz kılar.
> ⚠️ **KURAL 17 numarası BİLEREK KULLANILMADI** — "geçersizleşme koşulu" tartışmasına bağlı, `01-KARARLAR.md`
> KARAR-50 (cevapsız). Karışıklık olmasın diye bu blok 18'den başlar.
> Bu kurallar KURAL 1-16'yı **tamamlar**, hiçbirini kaldırmaz. `CLAUDE.md`'de yalnız tek satırlık atıf durur.

## KURAL 18 — Sınıflandırma: 🔥 SICAK · 🌡️ ILIK · 🧊 DONMUŞ
Her belge okunma sıklığına göre üç sınıftan birindedir; sınıf belgenin **ilk satırlarında** tek satırla yazılır:
`> 🔥 SICAK — her otonom turda okunur. Hedefli okuma: OTONOM-PROMPT.txt § 0.4`

| Sınıf | Ne demek | Üyeler (2026-09-23) | Tavan |
|---|---|---|---:|
| 🔥 **SICAK** | her otonom turda okunur | `00-KUYRUK` · `01-KARARLAR` · `02-ILERLEME` · `03-PO-ELLE-ISLER` · `OTONOM-PROMPT.txt` · `CLAUDE.md` · `00-SIRADAKI` · `01-CEVAPSIZ` (türetme betiği henüz birleşmedi — TEYİT GEREK) | **40.000** karakter (2026-09-23 itibarıyla) |
| 🌡️ **ILIK** | gerektiğinde okunur | `00-KARAR-TAKIP` · `00-BELGE-HARITASI` · `00-KART-INDEKSI` · `09-DURUM` · `docs/kararlar/konu/` belgeleri | **120.000** karakter (2026-09-23 itibarıyla) |
| 🧊 **DONMUŞ** | rutin turda okunmaz | `docs/otonom/arsiv/` · `docs/arsiv/` · `docs/raporlar/` altındaki 📸 raporlar · `bilanco/` | yok |

- Ölçü birimi: **karakter** (`LC_ALL=C.UTF-8 wc -m`), bayt değil (Türkçe harfler 2 bayt).
- 🔥 SICAK bir dosya **40.000'i aşarsa o turda ÖNCE arşivleme yapılır (KURAL 21), SONRA iş.** Arşivleme yetmiyorsa
  PO'ya bildirilir; **yapısal bölünme PO KARARIDIR** (ajan kendiliğinden bölmez).
- 🌡️ ILIK için tavan 120.000; aşılırsa aynı sıra. 🧊 DONMUŞ için tavan YOK (bir kez okunur, rutin maliyet üretmez).
- ⚠️ `CLAUDE.md` 2026-09-23'te 34.742 karakter (2026-09-23 itibarıyla) — 40.000'e yaklaşmasın diye buraya yalnız **tek satır atıf** girer.
- **Ölçüm her tur:** kapanış raporunda 🔥 SICAK dosyaların karakter sayısı + 1.000 karakteri aşan satır sayısı yazılır
  (`OTONOM-PROMPT.txt` § 13.5 — bu bölüm henüz `main`'de YOK, PO kararı bekliyor — TEYİT GEREK). Böylece şişme **üç hafta sonra değil, o turda** görünür.
- **Satır tavanı (1.000 karakter)** zaten var (`CLAUDE.md` § "tarihsel iz satırın İÇİNDE tutulmaz"); bu kural ona
  yalnız **ölçüm** ekler. Yeni oluşan 1.000+ satır o turda düzeltilir (geçmiş → belgenin `## GEÇMİŞ` bölümü).
  ⛔ **Not kolonu KISALTILMAZ** — kanıt disiplini korunur; hedefli okuma o satırları zaten yüklemiyor.

## KURAL 19 — Türetilmiş dosyalar (bölme DEĞİL, üretme)
- **Kapı değişken bir özelliktir** (🟡→🟢, 🔴→🟢). Kuyruğu kapıya göre dosyalara BÖLMEK her kapı değişiminde satır
  taşımayı → kayıp / çift kayıt / çakışma riskini getirir. Bunun yerine özet dosyalar kaynaktan **ÜRETİLİR**:
  - `docs/otonom/00-SIRADAKI.md` (türetme betiği henüz birleşmedi — TEYİT GEREK) ← `00-KUYRUK.md` baş kısmı (tanımlar) + YALNIZ 🟢 BEKLIYOR satırları
    (İş · Bitti demek; **Not kolonu alınmaz** → işe başlarken tam satır `grep -n '^| <iş-no> |'` ile kaynaktan okunur)
    ⭐ **İSTİSNA (2026-09-25):** `00-KUYRUK.md`'deki **'⭐ ÖNCELİK (PO)'** satırı ve adı geçen işler **kapıdan bağımsız**, her turda **kaynaktan** okunur (`OTONOM-PROMPT.txt` madde -1). 00-SIRADAKI yalnız 🟢 satır taşıdığı için bu satırı atlayamaz; türetme betiği birleşirken öncelik satırını SIRADAKI'ye alacak şekilde uyarlanmalıdır.
  - `docs/otonom/01-CEVAPSIZ.md` (türetme betiği henüz birleşmedi — TEYİT GEREK) ← `01-KARARLAR.md`'de CEVAP satırı BOŞ kartlar (kart no · başlık · kaç işi açar ·
    kuyrukta kilitlediği 🔴 işler)
- Üretici: `scripts/otonom-turet.mjs` (`npm run otonom:turet`) (türetme betiği henüz birleşmedi — TEYİT GEREK). **Her turun SONUNDA** yeniden üretilir, üzerine yazılır.
- ⛔ Türetilmiş dosyaya **ELLE yazılmaz**, kaynak olarak **kullanılmaz**, **atıf verilmez.** Başında
  `⚙️ TÜRETİLMİŞ — kaynak: … · üretim: <tarih saat>` uyarısı durur. **Çelişkide kaynak KAZANIR.**
- Bayatsa zararsızdır — sonraki turda yeniden üretilir. Ajan üretim tarihine bakar; **1 günden eskiyse** kaynaktan
  hedefli okur.

## KURAL 20 — Bilinçli olarak YAPILMAYANLAR (tekrar önerilmesin diye yazılı)
- ⛔ Dosyayı **kapıya göre bölme** (🟢/🟡/🔴 ayrı dosya) → kapı değişkendir; bunun yerine KURAL 19 türetme.
- ⛔ **Not kolonunu kısaltma** → kanıt disiplini bozulur; hedefli okuma zaten çözüyor.
- ⛔ **DONDURULMUŞ raporları küçültme** → bir kez okunur, rutin maliyet üretmez.
- ⛔ **Yeni planlama belgesi açma** → aktif iş kaynağı TEKTİR (`00-KUYRUK`; `CLAUDE.md` § AKTİF İŞ KAYNAĞI TEKTİR).
- ⛔ **Yapısal bölme (indeks + detay)** → atıfları kırar; yalnız KURAL 18/19/21 yetmezse, **PO KARARIYLA** yapılır.

## KURAL 21 — Ekleme-yalnızca günlükler: otomatik arşivleme eşiği
- Ekleme-yalnızca dosyalar (ilerleme günlüğü · oturum günlüğü) **40.000 karakteri aşınca EN ESKİ kayıtlar aya göre
  arşive taşınır. Son ÜÇ kayıt ana dosyada kalır.**
- `02-ILERLEME.md` için (⚠️ 2026-09-25 itibarıyla bu arşivleme `main`'de henüz YAPILMADI — tur sonunda güncel main üzerinde baştan yapılacak): son üç tur ana dosyada; öncekiler `docs/otonom/arsiv/02-ILERLEME-<YYYY-MM>.md`'ye.
  Ana dosyanın başında `Önceki turlar: <arşiv yolu>` satırı durur.
- ⛔ **SATIR DOĞRULAMASI her taşımada ZORUNLU:** `(ana + arşiv)` toplamı taşımadan önceki toplamdan **AZALAMAZ**
  (yalnız başlık/atıf satırı kadar artabilir). Azalırsa **GERİ AL, DUR, bildir.** Sayılar kapanış raporuna yazılır.
- Taşıma **kelimesi kelimesine** yapılır: metin değiştirilmez, özetlenmez, sıra korunur.

## KURAL 22 — Geçerlilik başlığı + DURUM TEK YERDE
- **Her belgenin başında şu üçlük bulunur:**
  `TÜR: 🔥/🌡️/🧊 · SON DOĞRULAMA: <tarih> · TAZELEME TETİKLEYİCİSİ: <olay>`
  Tetikleyici örnekleri: *"her gerçek kullanıcı testinden sonra"* · *"ilk kurum canlıya girince"* ·
  *"ilgili kod değişince"* · *"KALICI — tazeleme gerekmez"*.
  ⛔ **Tetikleyici BOŞ BIRAKILAMAZ.** Kalıcıysa AÇIKÇA yazılır. (KURAL 3'ün 🔄/📸 etiketini tamamlar: 🔄 YAŞAYAN
  damgası tek başına "ne zaman bakılmalı" demiyordu → "yaşayan ama aylardır ölü" belgeler buradan doğdu.)
- ⭐ **DURUM TEK YERDE:** bir kalemin **DURUMU yalnız `docs/otonom/00-KUYRUK.md`'de** tutulur. Başka belgeler kalemin
  **TANIMINI** tutar, **DURUMUNU TUTMAZ.** Durum işareti taşıyan her belgenin başına:
  > ⚠️ Bu belge kalemlerin TANIMINI tutar, DURUMUNU TUTMAZ. Buradaki işaretler <tarih> durumudur.
  > Güncel durum: `docs/otonom/00-KUYRUK.md` (köprü: `docs/kararlar/00-KART-INDEKSI.md`)
  (KURAL 7 "statü tek yerde"nin otonom sisteme uyarlanmış hâli; KURAL 15 kaynak hiyerarşisini değiştirmez —
  G-kartı **tanımda** kazanır, kuyruk **durumda** kazanır.)

## KURAL 23 — Rapor → kuyruk zorunluluğu (öksüz bulgu önleme)
- Bulgu üreten her rapor, sonunda **HAZIR KUYRUK SATIRLARI** ve **HAZIR KARAR KARTLARI** bölümleri içermek
  **ZORUNDADIR.** Rapor tek başına bir aksiyon DEĞİLDİR. (KURAL 9 "kalem listesi"nin otonom biçimi.)
- Rapor başında **İŞLENME KUTUSU** bulunur:
  `İŞLENME: ⬜ bulgular henüz kuyruğa işlenmedi` ya da `İŞLENME: ✅ işlendi (<tarih>, tur: <ad>)`
- ⬜ kalan rapor bir sonraki tur için **AÇIK İŞ** sayılır.
- ✅ yalnız kuyrukta/kartta kanıtı (iş no · KARAR no · 03-PO satırı) gösterilebiliyorsa basılır (KURAL 10).
- 📸 dondurulmuş bir rapora kutu eklemek KURAL 6'yı ihlal etmez: gövde değişmez, yalnız başa **işlenme durumu** girer.

## KURAL 24 — Görünmez bölge (`.gitignore`'daki klasörler)
- `.gitignore`'daki klasörler ajanlar tarafından **GÖRÜLEMEZ** (temiz klonlarda — bulut oturumu dahil — yoktur).
- ⛔ Karar · içerik · iş taşıyan hiçbir metin bu klasörlerde **BIRAKILMAZ.** PO'nun geçici notları için kullanılabilir
  (örnek: `docs/gelen/`); kalıcı değer taşıyan her şey ilgili `docs/` klasörüne taşınır. **Her ay boşaltılır.**
- (İlgili: `OTONOM-PROMPT.txt` § 0.1 — izlenmeyen dosyalar hiçbir koşulda stash'lenmez.)

## KURAL 25 — Üç sonuçlu doğrulama (iki değil)
- Bir kalemin durumu **KODDA** doğrulanırken üç sonuçtan biri yazılır:
  **✅ DOĞRULANDI** (kanıt: `dosya:satır`) · **⬜ AÇIK** · **❓ DOĞRULANAMADI** (sebep)
- ⛔ ❓ olanı ✅ ya da ⬜ diye **VARSAYMA** — belirsizliğin kendisi kayıt altına alınır.
- ⛔ Sayı **TAHMİN EDİLMEZ** ("≥20 kalem" gibi) — sayılır ya da "sayılmadı" yazılır (KURAL 16 ADAYI ile birlikte).
- ⛔ Negatif iddia ("yok", "hiçbir yerde") **KAPSAM BEYANI** ister: dizin · desen · harf duyarsız mı ·
  iki dilli mi (mentor↔mentör · tenant↔kurum · meeting↔görüşme · invite↔davet) — KURAL 13'ün kısa hâli.
