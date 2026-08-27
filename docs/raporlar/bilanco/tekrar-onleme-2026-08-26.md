# BELGE BİLANÇOSU — TUR 4 / EK-C: TEKRAR ÖNLEME (teşhis + kural önerisi)

**📸 DONDURULMUŞ** (bilanço bölümü — 2026-08-26) · Tur 4 / EK-C · Salt-okuma teşhis.
Kod DEĞİŞTİRİLMEDİ · CLAUDE.md/kural belgesi DEĞİŞTİRİLMEDİ · DB/PR/commit YOK. Yalnız TEK dosya yazıldı (bu).

> **Ne bu:** PO sordu — "kararların / yarım işlerin / unutulmuş niyetlerin izini kaybetme sorunu NEDEN yaşandı,
> bir daha yaşanmasın diye kalıcı kural yazalım." Bu belge 4 turluk bilanço verisinden **SAYIYA dayalı kök-neden
> teşhisi** + **4 taslak kural değerlendirmesi** üretir. ⚠️ Kural YÜRÜRLÜĞE KONMAZ — yalnız öneri; yürürlük PO onayına
> bağlı (ayrı tur). Kaynak bölüm dosyaları: `docs/raporlar/bilanco/bolumler/` (T1-A, T2-B/C/D/E, T3-A/C/D, T4-A1/A2).
> Her sayı kaynak bölüm dosyasındaki KESİN SAYIM tablolarından toplandı; tahmin yok.

---

## BÖLÜM 1 — KÖK NEDEN ANALİZİ (sayıyla)

### (a) Numarasız kalem — belirti #1: "numarasız = izsiz"

**Numarasız kalem TAM SAYI (bölüm-başı defter, çakışmasız-tekilleştirme YAPILMADAN):**

| kaynak bölüm | belge türü | toplam kalem | numarasız kalem | numarasız oranı |
|---|---|:---:|:---:|:---:|
| T1-A-canonical | karar-belgesi (canonical takip) | ~152 | **23** (A1-A23) | düşük (envanter numaralı) |
| T3-A-oturum-gunlugu | oturum-günlüğü | 58 | **19** | %33 |
| T2-B-kesif | keşif raporu (10 belge) | 140 | **~138** (neredeyse tümü) | ~%99 |
| T2-C-kod-denetimi | kod-denetimi raporu (8 belge) | 207 | çoğunluk | yüksek |
| T2-D-panel-persona | persona/panel raporu (7 belge) | 117 | çoğunluk | yüksek |
| T2-E-icerik | içerik karar-belgesi (3 belge) | 22 | **10** | %45 |
| T3-C-calisma-tarzi | kural-belgesi (CLAUDE.md×2) | 111 | çoğunluk (kural belgesi numara taşımaz) | ~%95 |
| T4-A1-arsiv-erken | arşiv (durum+yol) | 47 | **47** (tümü) | %100 |
| T4-A2-arsiv-strateji | arşiv (strateji+devir) | 83 | çoğunluk | yüksek |

**Yoğunluk hangi belge türünde:** Numarasızlık EN YOĞUN **keşif raporları (T2-B ~%99), arşiv (T4-A1 %100), persona/kod-denetimi
raporları (T2-C/T2-D çoğunluk)** — yani **"rapor" türünde**. En AZ numarasız = **canonical karar-belgesi (T1-A)** (envanteri
numaralı; yalnız düz-metne gömülü A1-A23 numarasız). Ara: **oturum-günlüğü (%33), içerik-karar (%45).**

**Bir kalem numarasız kalınca izi ne oldu (kanıtlı):**
- T1-A §2: "**Numarası olmayan, tabloda olmayan, grep'le zor bulunan** kararlar/niyetler" → bu turun ASIL bulgusu 23 kalemdi;
  yani numarasızlar aktif olarak KAYBOLMUŞtu, ancak baştan-sona okumayla bulundu.
- T4-A1 §2: **14 "unutulmuş erken niyet"** — bugünkü numaralı takipte (00-KARAR-TAKIP/10-yol) **doğrudan numara/satır izi YOK**
  (🌱 11 hâlâ anlamlı · 🕸️ 3 kapsam-değişmiş). Bunların hepsi numarasız arşiv kalemiydi.
- T3-A §2: **15 tutulmamış sözün 15'i de NUMARASIZ ya da numarası sonradan verilmiş** sözlerdi; söz numarasız verilince
  sonraki oturum devralmadı (bkz. (b)).

> **Kök-neden #1 (kanıtlı):** Numara = KURAL 8 gereği "izlenebilirlik anahtarı" (numara YALNIZ 00-KARAR-TAKIP'te doğar). Bir
> kalem numara ALMADAN raporda/günlükte/arşivde kalırsa, sonraki oturum onu **grep'le bulamıyor** → iz kaybı. Ölçülen zarar:
> **≥14 erken niyet + 23 gömülü niyet + 15 söz** numarasız kaldığı için takipten düştü.

### (b) Tutulmamış söz — belirti #2: "söz oturumda verildi, devralınmadı" (T3-A §2)

15 söz (S1-S15). Her biri: verildiği oturum · sonraki oturum DEVRALDI mı · bugünkü durum:

| # | Söz verilen oturum | sonraki oturum devraldı mı | bugünkü durum | kaç kez tekrarlandı |
|---|---|---|:---:|:---:|
| S1 | 08-14 | **HAYIR** — sonraki oturumlarda arşiv-teyidi hiç anılmadı | ❓ izi kayboldu | 0 (bir kez, unutuldu) |
| S2 | 08-20 | HAYIR — Y1-Y7 hiç kodlanmadı | ⬜ açık (6+ gün) | 0 |
| S3 | 08-20 | HAYIR — 3 PO sorusu bir daha anılmadı | ⬜ açık | 0 |
| S4 | 08-23 | kısmen (PO kararına bağlandı) | 🟡 açık (PO) | 1 |
| S5 | 08-23 | kısmen (08-26b depo hijyeni ama taşıma değil) | 🟡 açık (PO) | 1 |
| S6 | 08-25/08-25b | EVET (PO A17 ile İPTAL kararı verildi) | ⬜ açık (bloke) | 2 |
| S7 | 08-25c | HAYIR (avukat bekliyor) | ⬜ açık (bloke) | 0 |
| S8 | 08-26-L | (henüz sonraki tur olmadı) | ⬜ açık | 0 |
| S9 | 08-26-İçerik | (henüz sonraki tur olmadı) | ⬜ açık | 0 |
| S10 | 08-26-İçerik | (henüz sonraki tur olmadı) | ⬜ açık | 0 |
| S11 | 08-26-İçerik | (henüz sonraki tur olmadı) | ⬜ açık (PO) | 0 |
| S12 | KAPANIŞ (:222) | HAYIR — hiç kodlanmadı | 🔵 açık | 0 |
| S13 | KAPANIŞ (:223) | HAYIR — hiç kodlanmadı | 🔵 açık | 0 |
| S14 | KAPANIŞ (:225) | HAYIR — hiç yapılmadı | ⬜ açık | 0 |
| S15 | 08-20 (37m) | HAYIR — hiçbir oturum env AÇMADI | 🔴 açık (6+ gün) | 0 |

**Örüntü:** 15 sözün **11'i sonraki oturum tarafından DEVRALINMADI (S1,S2,S3,S7,S12,S13,S14,S15 + S8/S9/S10/S11 henüz sıra
gelmedi).** DEVRALINAN 2'nin (S4,S5) tekrar sayısı = 1; S6 = 2 (PO kararına ulaştı). **En eski hayalet: S1 (08-14, 12 gün)
— tek kez verildi, hiç tekrarlanmadı, izi kayboldu.**

> **NOT (dürüstlük):** T3-A'nın ana bulgusu şu — söz-tutma disiplini genelde YÜKSEK. 08-25→08-26 güvenlik/KVKK/kalibrasyon
> zinciri sözlerin ÇOĞUNU eksiksiz kapattı (35/58 kalem ✅). Sorun **tüm sözlerde değil**, **numarasız/env-gate/PO-karar-bekleyen
> sözlerde** yoğunlaşıyor. Kritik gerçek: **çalışma-akışının merkezinde olan (güvenlik/kalibrasyon) sözler tutuldu; kenarına
> düşen (retention Y1-Y7, env-flag 37m, arşiv-teyit) sözler düştü.**

**Kök-neden #2:** Söz "oturum SONUNDA" verilir ama "oturum BAŞINDA" okunacak bir yere YAZILMAZ → devir mekanizması yok.
Sonraki oturum yalnız 09-DURUM/00-KARAR-TAKIP okur; oturum-günlüğüne gömülü "⭐ SÖZ" satırlarını okumaz.

### (c) Yanlış ✅ — belirti #3 (T3-D §2)

- **Kesin düşürülen yanlış-✅: 1** (T1-A madde 5 ThemeToggle "✅ zaten mevcut" → 🟡 YARIM).
- **✅ kalıp ama alt-boyut ❓ eklenen: 2** (madde 1 menti→mentör TİP-gizleme, madde 34 kanıt-satırı).
- **Ortak örüntü (kanıtlı):** ThemeToggle "admin'de VAR" diye ✅ verildi ama **platform layout SORGULANMADI**
  (`platform/layout.tsx` grep boş). Yani: **KISMİ kanıt tam-✅ sayıldı + karşı-tarafın kodu ARANMADI.**
- **Zemin neden (T3-D §b):** TUR-1'de **🟡 YARIM durum kodu YOKTU (5 kod vardı, 6 değil)** → kısmi işler ✅/⬜ arasında
  sıkıştı, ✅'e yuvarlandı. TUR-1 sayıları da TAHMİNDİ (~103/~140/~120) = kural ihlali.
- **Not:** Hayalet-tamamlanmış (belge "açık" der kod "yapıldı") çok daha fazla (T1-A H1-H3=3 · T3-D GH1-GH5=5 yeni +
  4 küme) — ama bunlar TERS yön (belge bayat-geride, kod ileride); yanlış-✅ değil, bayat-not.

**Kök-neden #3:** ✅ basılırken (i) kod dosya:satır kanıtı ZORUNLU değildi + (ii) kısmi durum kodu (🟡) yoktu → yuvarlama.

### (d) Bayat YAŞAYAN belge — belirti #4 (T3-C + T1-A A11)

**Bayat kod-gerçeği iddiası (🗑️/❓) TAM SAYI (T3-C §2):**
- **6× 🗑️ GEÇERSİZ ADAYI** (kesin bayat): B1 CLAUDE.md:81 "eu-west-2/İrlanda" · B2 CLAUDE.md:74 eski güvenli-seed
  listesi · B3 backend:51 "Five models" (kod=38) · B4 backend:46 iceBreaker.ts core-tablo (dosya yok) · B5 backend:87
  iceBreaker+matchReason (ikisi de yok) · B6 backend:7 "LLM yalnız ice-breaker" (aynı belge içi çelişki).
- **2× ❓** (dosya-adı karşılıksız): B7 `llmRateLimiter` · B8 `registerMessages.ts`.

**Kaçı ajanların HER oturum okuduğu belge (kritik):**
- Bunların **8'i de kök `CLAUDE.md` (2) + `backend/CLAUDE.md` (6)** içinde. **CLAUDE.md = her oturum başında okunması ZORUNLU
  belge** ("Proje Hafızası — nereye bakılır", oturum-başı kuralı). Yani **ajanların her oturum güvendiği kural-belgesinde
  8 bayat kod-gerçeği iddiası var.**
- **En eski/en ağır:** `backend/CLAUDE.md` = **DONDURULMUŞ ONBOARDING snapshot** ("Five models" ↔ kod 38; iceBreaker/matchReason
  canlı-dosya sanıyor; "LLM yalnız ice-breaker" ↔ "LLM removed" aynı belge içi çelişki). Bu belge kod 38-model + LLM-siz'e
  evrilirken hiç güncellenmedi.

**Bayat YAŞAYAN belge (📸-adayı ama hâlâ 🔄) — T1-A A11:**
- `durum-panosu-2026-08-14` = 🔄 YAŞAYAN etiketli ama **11 gün (bugün 12) donmuş** → 📸'ye düşürülmeli. +2 belge
  (tasarim-kararlari-admin, degerlendirme-metrik) tarihli-ad ama 🔄. Toplam **3 bayat-yaşayan belge**, en eskisi
  **12 günlük.** (S4 sözü de budur — PO kararı bekliyor.)

**Kök-neden #4:** YAŞAYAN (🔄) belgelerin tazeliği HİÇ denetlenmiyor. En kritik olan (CLAUDE.md) yapısal kod değişiminde
(LLM kaldırıldı, 5→38 model) doğrulanmadı → her oturum okunan belgede 8 bayat iddia birikti.

### (e) Aynı karar farklı belgede farklı durumda — belirti #5 (çelişkiler)

**Çelişki TAM SAYI:**
- **T1-A Ç1-Ç6: 6 çelişki** (belge↔belge). 3'ü **bayat-not** (Ç1 madde 39 · Ç2 K5-soru2 · Ç6 sunucu-ülkesi — yeni gerçek
  belgeye işlenmemiş, eski satır kaldı); 2'si canlı-sayı-teyidi (Ç3 DISC 32/20 · Ç4 SJT 3/4); 1'i açık PO kararı (Ç5).
- **T2-E: +1 yeni çelişki** (enneagramWing "okunmuyor" belge ↔ kod okuyor).
- **T3-C: içsel çelişki** (backend:7 "LLM yalnız ice-breaker" ↔ backend:62 "LLM removed" — AYNI belge içinde).
- **T4-A1: +1** (super-admin router "sil öneri" ↔ "silinmedi testli").

**En çarpıcı vaka:** `00-CIKIS-PLANI.md` (2026-08-25 "güncel") madde 39 + K5-soru2 + repo-private konularında
**2026-08-26 kararlarından habersiz** → canonical takip belgeleri arasında **EN BAYAT olanı** (T1-A kapanış). Aynı karar
(madde 39 = ✅ CANLIDA #54) ÇIKIŞ-PLANI'nda "K0 açık" görünüyor.

**Vaka toplamı: 6 (Ç1-Ç6) + 3 (T2-E/T3-C/T4-A1) = 9 çelişki vakası.**

**Kök-neden #5:** Bir karar değişince (39 çözüldü, sunucu Londra oldu) güncelleme YALNIZ bir belgeye işlendi (canonical/KVKK),
diğer belgelerdeki (çıkış-planı, CLAUDE.md env-notu, 09-DURUM eski katman) aynı-karar satırları bayat kaldı → tek-gerçek-kaynak
ilkesi (belge-düzeni KURAL 1) uygulamada delindi.

---

## BÖLÜM 2 — KURAL 8 NEDEN TUTMADI (dürüst)

**KURAL 8 (mevcut):** keşif → 📸 rapor → **her aksiyon 00-KARAR-TAKIP'e girer, numarasını YALNIZ orada alır** → öncelik
verilince 10-yol tek satır → iş bitince KOD-doğrula + 4 yer → oturum sonu 07-oturum-gunlugu.

**KURAL 8 vardı ve ihlal edildi. İhlal aşamaları (sayıyla):**

| KURAL 8 aşaması | ihlal kanıtı | kaç kalem |
|---|---|:---:|
| **(2) rapor → KARAR-TAKIP numara geçişi** | keşif raporlarındaki bulgular numara ALMADAN raporda kaldı | T2-B ~138 numarasız + T4-A1 14 iz-yok + T1-A 23 gömülü |
| **(3) öncelik → 10-yol tek satır** | Y1-Y7 (S2) hiç 10-yol'a öncelik-satırı olmadı | 7 (Y1-Y7) |
| **(4) iş bitince KOD-doğrula + 4 yer** | ThemeToggle ✅ basıldı ama kod tam-aranmadı (platform boş) | 1 kesin + 2 nüans |
| **(4-ters) bayat-not: belge geride kaldı** | 39/92/K5 çözüldü ama çıkış-planı/CLAUDE.md/09-DURUM güncellenmedi | 9 çelişki vakası |
| **(5) oturum sonu → oturum-günlüğü** | oturum-günlüğü DİSİPLİNLİ tutuldu ✅ AMA sözler numarasız gömüldü | 15 söz (numarasız) |

**Kaç kalem KURAL 8 DIŞINDA doğdu:** Ölçülebilir en net grup — **T4-A1'in 14 unutulmuş erken niyeti** ve **T3-A'nın 15
sözünün numarasızları**, KURAL 8'in (2) aşamasından (rapor→KARAR-TAKIP numara) hiç geçmediği için doğdu. Ek olarak
**keşif raporlarının ~138 numarasız kalemi** (2) aşamasında takıldı — ama bunların çoğu ARADAN yapıldı/kod-teyitli
(rapor bir kez okunup aksiyonu numaralanınca kalanı ham-kanıt); asıl kayıp, aksiyon adayı olup numara ALMAYANLAR.

**İhlaller hangi aşamada YOĞUN:**
1. **En yoğun ihlal: (2) rapor → KARAR-TAKIP numara geçişi.** Rapor üretiliyor, ama içindeki her aksiyon adayı
   00-KARAR-TAKIP'e girip numara almıyor → numarasız kalıyor → izsizleşiyor. (Bölüm 1a'nın kök nedeni.)
2. **İkinci: (4-ters) belge-güncelleme.** İş bitince 4 yer güncellenmeli; kod-tarafı ✅ oluyor ama **eski/paralel
   belgeler (çıkış-planı, CLAUDE.md env-notu) güncellenmiyor** → 9 çelişki + 8 bayat CLAUDE.md iddiası.
3. **Üçüncü: söz-devri mekanizması KURAL 8'de YOK.** KURAL 8 "aksiyon"u numaralar ama "sonraki-tur sözü"nü ((5) oturum-günlüğüne
   yazılır ama başında OKUNMAZ) devretmez → 11/15 söz devralınmadı.

**HİPOTEZ TESTİ:** *"Disiplin oturum SONUNDA isteniyor, bağlam dolmuşken atlanıyor."*

**SONUÇ: KISMEN DOĞRU, ama ana neden DEĞİL. Veriyle nüanslandırıldı:**

- **DOĞRULAYAN kanıt:** T4-A2 devir belgesi başında ajan İTİRAFI var (satır 7/110): *"asistan context'i doldu, son
  kısımlar okunamadı, %100 eksiksiz değil"* — global-seed uygulaması + görsel-inceleme sözleri "context doldu" diye
  belirsiz kaldı. Bu, bağlam-dolması → atlama'nın DOĞRUDAN kanıtı (ama tek vaka).
- **ÇÜRÜTEN kanıt (daha güçlü):** Oturum-günlüğü (07) ve 00-KARAR-TAKIP tur SONUNDA **DİSİPLİNLE dolduruldu** — T3-A
  "günlük-içi çelişki: 0, hayalet-tamamlanmış: 0, NİYET BELGELENMEMİŞ: 0" diyor. Yani **tur-sonu yazımı atlanmadı;
  YAZILDI.** Sorun yazmada değil, **yazılan yerin sonraki oturumda OKUNMAMASINDA** ve **numara-almamada**. 15 söz
  oturum-günlüğüne DÜZGÜN yazıldı; ama günlük sonraki-oturum-başı okuma listesinde DEĞİL (yalnız 09-DURUM/00-KARAR-TAKIP okunuyor).
- **GERÇEK ANA NEDEN (çürütmeden çıkan):** Sorun "oturum sonunda yorgunluk" değil, **YAPISAL iki boşluk:**
  (1) **numara-kapısı eksikliği** — aksiyon adayı numara almadan raporda/günlükte kalabiliyor (KURAL 8 (2) zayıf zorlanıyor);
  (2) **açılış-okuma kapsamı dar** — oturum başında yalnız 2 belge okunuyor, sözler/numarasızlar oradaysa görünmez.
  "Bağlam dolması" bunu AĞIRLAŞTIRIR (T4-A2 vakası) ama tek başına açıklamaz.

---

## BÖLÜM 3 — KURAL ÖNERİLERİ (PO onayına)

> Her taslak Bölüm 1-2 bulgularına göre değerlendirildi: hangi belirtiyi önler, kaç kalemi kurtarır. Körü körüne onay YOK.

### TASLAK KURAL 9 — Rapor "KALEM LİSTESİ"yle biter → **ÖNERİLİR (güçlü)**
*"Satır almayan bulgu bulgu değil; her rapor sonunda her satır: kalem · durum · numara-adayı-mı."*
- **Hangi belirtiyi önler:** Bölüm 1(a) numarasız-kalem + Bölüm 2 ihlal-aşama-(2). En güçlü kök-nedeni doğrudan hedefler.
- **Kaç kalem kurtarırdı:** T2-B ~138 + T4-A1 14 iz-yok + T1-A 23 gömülü niyet — bunların **aksiyon-adayı olanları** rapor
  sonunda "numara-adayı: EVET" işaretlenip 00-KARAR-TAKIP'e taşınırdı. En büyük etki alanı.
- **Değerlendirme: ONAYLA.** Ancak (Bölüm 4'e bakınız) rapor-sonu kalem-listesinin numarasız kalanları FİLTRELEMESİ değil,
  **her satırın numara-adayı-mı sütununu ZORUNLU kılması** kritik — aksi halde yine numarasız liste üretir.

### TASLAK KURAL 10 — ✅ kanıtsız basılmaz → **ÖNERİLİR (güçlü)**
*"✅ için kod dosya:satır VEYA açık 'KOD DIŞI' zorunlu; kısmi = 🟡."*
- **Hangi belirtiyi önler:** Bölüm 1(c) yanlış-✅. ThemeToggle vakasının TAM karşılığı.
- **Kaç kalem kurtarırdı:** doğrudan 1 kesin (ThemeToggle) + 2 nüans; ama asıl değeri **önleyici** — 6'lı durum kodu (🟡 dahil)
  + dosya:satır zorunluluğu, TUR-1'in "5 kod + tahmin" hatasının tekrarını keser. NOT: bu kural PRATİKTE ZATEN
  benimsenmiş — TUR-2/3/4 bölümleri "✅ için KOD KANITI, belge diyor YETMEZ" kuralıyla çalıştı (T4-A1 §1 kanıt-kuralı).
- **Değerlendirme: ONAYLA + RESMİLEŞTİR.** Bilanço turları bunu zaten uyguladı; CLAUDE.md'ye yazılması kalıcılaştırır.

### TASLAK KURAL 11 — Söz defteri + oturum AÇILIŞINDA okunur → **ÖNERİLİR (en yüksek öncelik)**
*"Disiplin oturum sonundan BAŞINA taşınır."*
- **Hangi belirtiyi önler:** Bölüm 1(b) tutulmamış-söz + Bölüm 2 "söz-devri mekanizması yok" + hipotez-testinin GERÇEK ana
  nedeni (açılış-okuma kapsamı dar).
- **Kaç kalem kurtarırdı:** 15 sözün devralınmayan **11'i** (özellikle S1 12-gün-hayalet, S2 Y1-Y7, S15 37m env).
- **Nerede tutulsun (öneri getir):** **YENİ dosya AÇMA — 00-KARAR-TAKIP'e bir bölüm ekle.** Gerekçe: (i) 00-KARAR-TAKIP
  ZATEN "ne kaldı" canonical'ı ve KURAL 1 gereği oturum başında okunuyor → "açılışta oku" mekanizması HAZIR, ikinci dosya
  = ikinci-kaynak riski (belge-düzeni KURAL 1 tek-gerçek-kaynak ihlali). (ii) Yeni "söz-defteri.md" açmak, 00-KARAR-TAKIP ile
  ÇAKIŞAN üçüncü takip yeri yaratır (aynı hastalığı üretir). **Öneri: 00-KARAR-TAKIP'e "⭐ SONRAKİ-TUR SÖZLERİ" bölümü;
  her ⭐ SÖZ oturum-günlüğüne yazıldığı AN buraya da tek-satır kopyalanır (numara-adayıyla).**
- **Değerlendirme: ONAYLA (en kritik).** Bu, hipotez-testinin gerçek-ana-nedenini (dar açılış-okuma) kapatır.

### TASLAK KURAL 12 — Tazelik denetimi → **ÖNERİLİR (koşullu — otomatikleştirilerek)**
*"🔄 YAŞAYAN 30 günü aşarsa 'bayat'; CLAUDE.md her yapısal kod değişiminde doğrulanır."*
- **Hangi belirtiyi önler:** Bölüm 1(d) bayat-yaşayan-belge + 1(e) çelişki.
- **Kaç kalem kurtarırdı:** 3 bayat-yaşayan belge (en eski 12 gün) + 8 bayat CLAUDE.md iddiası + 9 çelişki vakasının
  belge-geride olanları (Ç1/Ç2/Ç6 + çıkış-planı en-bayat).
- **⚠️ İNCE AYAR (körü körüne onaylamıyorum):** "30 gün" eşiği T3-A/T1-A verisiyle GEVŞEK — en kritik bayatlıklar
  (ThemeToggle-platform, madde-39-çıkışplanı, sunucu-İrlanda) **günler içinde** oluştu, 30 gün değil. 30-gün-eşiği yalnız
  "durum-panosu 12-gün" gibi YAVAŞ bayatlığı yakalar; HIZLI bayatlığı (karar değişince aynı-gün diğer belge geride kalır)
  KAÇIRIR. Bu yüzden KURAL 12'nin İKİNCİ ayağı ("CLAUDE.md yapısal-kod-değişiminde doğrulanır") ve KURAL 10-benzeri
  "karar değişince tüm-örnekleri-tara" ayağı ASIL değerli; salt 30-gün-tarihi zayıf.
- **Değerlendirme: ONAYLA — AMA "30 gün" ikincil; birincil = (a) yapısal-kod-değişiminde CLAUDE.md doğrula + (b) karar
  değişince "bunu kim yazmış?" belge-taraması (mevcut API-değişikliği kuralının belge-versiyonu).**

**ÖZET: 4 taslağın 4'ü de ÖNERİLDİ, 0 reddedildi.** Ancak KURAL 12'nin "30 gün" ayağı ZAYIF bulundu → birincil-ayak
yapısal-tetik olacak şekilde revize önerisi. KURAL 10 zaten pratikte uygulanıyor (resmileştir). KURAL 11 en yüksek öncelik.

---

## BÖLÜM 4 — UYGULANABİLİRLİK (dürüst)

**Bu kurallar KURAL 8'den neden farklı tutar (mekanizma) — yoksa aynı kaderi mi paylaşır?**

KURAL 8 TUTMADI çünkü **tamamı "ajan hatırlayıp yapsın" tipi elle-disiplindi** ve tek zorlama noktası "tur EKSİK sayılır"
uyarısıydı — ölçülmedi, denetlenmedi. Aşağıda her kuralın KURAL 8'den farkı = **zorlama noktasının nerede olduğu:**

| kural | mekanizma farkı (KURAL 8'den) | aynı kaderi paylaşır mı |
|---|---|:---:|
| **9 kalem-listesi** | Zorlama **rapor-üretim anında** (rapor kalem-listesiyle bitmezse yarım-rapor); ajan raporu bitirmek için mecburen kalem-listesi yazar → tur-sonuna ertelenmez | Otomatik kontrol eklenirse HAYIR; salt-kural kalırsa RİSK |
| **10 kanıtsız-✅-yok** | Zorlama **✅ yazma anında** (dosya:satır YOKSA ✅ yazılamaz, 🟡 yazılır); TUR-2/3/4 zaten böyle çalıştı = KANITLANMIŞ tutar | HAYIR — pratikte 3 tur boyunca tuttu |
| **11 söz açılışta-oku** | Zorlama **oturum-BAŞINDA** (KURAL 1 zaten 00-KARAR-TAKIP açılışta okunuyor; söz oraya kopyalanınca otomatik görünür) → "sonunda yorgunken atlama" hipotezini yapısal olarak bypass eder | HAYIR — açılış-okuma zaten mecburi |
| **12 tazelik** | Zorlama **tarama ile** (elle: kural; otomatik: script) | 30-gün elle kalırsa RİSK; otomatik/yapısal-tetik ise HAYIR |

> **Kritik dürüstlük:** KURAL 9 ve 12'nin "salt-kural" versiyonu KURAL 8'in kaderini paylaşır (unutulur). Farkı yaratan
> tek şey **otomatikleştirme veya üretim-anı-zorlama.** KURAL 10 ve 11 doğaları gereği zaten var-olan mecburi bir ana
> (✅-yazma / açılış-okuma) çengellediği için elle-kalsalar bile tutma şansı yüksek.

**Otomatikleştirilebilirlik (⚠️ KOD YAZILMAZ — yalnız değerlendirme):**

| kontrol | otomatikleştirilebilir mi | ne kadar iş (tahmin) | oturuma maliyet |
|---|:---:|---|---|
| **Kalem-listesi eksik kontrolü** (rapor kalem-listesiyle bitiyor mu) | KISMEN | markdown-lint benzeri: "rapor son-bölümü 'KESİN SAYIM' içeriyor mu" regex ~yarım gün | +0 dk (üretim-anı) |
| **Bayat-belge taraması** (🔄 etiketli belgenin son-değişiklik tarihi > 30 gün) | EVET (kolay) | git log tarih + 🔄-grep script ~yarım gün | ~1 dk (haftalık cron/manuel) |
| **Kırık-link / bayat kod-iddiası** (CLAUDE.md dosya-adı iddiaları kodda var mı) | EVET | grep-döngüsü (registerMessages/iceBreaker tipi) ~yarım gün; T3-C bunu ELLE zaten yaptı | ~2 dk (yapısal-değişimde) |
| **Söz-defteri senkronu** (⭐ SÖZ oturum-günlüğünde ama 00-KARAR-TAKIP'te değil) | EVET | iki-dosya grep-diff ~yarım gün | ~1 dk |
| **Kanıtsız-✅ taraması** (✅ satırında dosya:satır veya "KOD DIŞI" yok mu) | EVET | regex ~yarım gün | +0 dk (üretim-anı) |

**Her kuralın oturum-maliyeti (elle, otomatiksiz):**
- KURAL 9: +0 dk (rapor zaten yazılıyor; kalem-listesi rapor-üretiminin parçası, ekstra tur yok).
- KURAL 10: +0 dk (✅ yazarken zaten kanıt biliniyor; yalnız yazma-formatı).
- KURAL 11: **+2-3 dk** (oturum başında 00-KARAR-TAKIP'teki söz-bölümünü okuma + tur sonunda yeni-sözü kopyalama).
- KURAL 12: elle **+5-10 dk/oturum** (bayat-tarama) → **MALİYET>FAYDA elle yapılırsa.** Otomatik cron ~1 dk → fayda>maliyet.

**Maliyet>fayda uyarısı:** **KURAL 12'nin ELLE versiyonu ÖNERİLMEZ** (her oturum 5-10 dk bayat-tarama = KURAL 8 kaderi:
unutulur/atlanır). **KURAL 12 yalnız OTOMATİK script + yapısal-tetik olarak önerilir.** Diğer 3 kural (9/10/11) elle bile
düşük-maliyet/yüksek-fayda.

**Otomatikleştirilebilir kural sayısı: 5 kontrolün 4'ü kolayca (bayat-tarama, kod-iddia-tarama, söz-senkron, kanıtsız-✅);
1'i kısmen (kalem-listesi eksik).** Hiçbiri karmaşık altyapı gerektirmez (grep + git log düzeyinde).

---

## BÖLÜM 5 — PO ONAY SATIRLARI

> **⚠️ GÜNCELLEME (2026-08-27): PO ONAYLADI → KURAL 9-12 YÜRÜRLÜKTE.** Dördü de kök `CLAUDE.md`'ye KURAL 8'in ardına
> eklendi (KURAL 12 **revize**: birincil ayak = yapısal-kod-değişiminde CLAUDE.md doğrula + karar-değişince belge-tara;
> "30 gün" ikincil/otomatik-script). KURAL 11 gereği `00-KARAR-TAKIP`'te **"⭐ SONRAKİ-TUR SÖZLERİ"** bölümü açıldı ve
> 10 açık söz taşındı. Aşağıdaki `[ ]` satırları tarihsel iz olarak kalır (artık karar verilmiştir).

**TASLAK KURAL 9 — Rapor kalem-listesiyle biter (numara-adayı-mı sütunu zorunlu)** — ✅ YÜRÜRLÜKTE (2026-08-27)
`[ ] PO notu: ` (kabul / değişsin / gereksiz)

**TASLAK KURAL 10 — ✅ kanıtsız basılmaz (dosya:satır VEYA "KOD DIŞI"; kısmi=🟡) — pratikte uygulanıyor, resmileştir**
`[ ] PO notu: ` (kabul / değişsin / gereksiz)

**TASLAK KURAL 11 — Söz açılışta okunur (yer: YENİ dosya DEĞİL, 00-KARAR-TAKIP'e "⭐ SONRAKİ-TUR SÖZLERİ" bölümü) — en yüksek öncelik**
`[ ] PO notu: ` (kabul / değişsin / gereksiz)

**TASLAK KURAL 12 — Tazelik denetimi (birincil ayak = yapısal-kod-değişiminde CLAUDE.md doğrula + karar-değişince belge-tara; "30 gün" ikincil + yalnız otomatik script)**
`[ ] PO notu: ` (kabul / değişsin / gereksiz)

---

## KAPANIŞ NOTU (EK-C / Tur 4)
- **Kök-neden en güçlü bulgu (sayıyla):** İhlal EN YOĞUN **KURAL 8 (2) aşamasında** — rapor→KARAR-TAKIP numara geçişi;
  **~138 (keşif) + 14 (arşiv iz-yok) + 23 (canonical gömülü) + 15 (söz)** kalem numara ALMADAN izsizleşti. Numarasızlık
  en yoğun **rapor türünde (~%99)**, en az **canonical karar-belgesinde**.
- **KURAL 8 hangi aşamada TUTTU:** (5) oturum-günlüğü + 00-KARAR-TAKIP tur-sonu yazımı DİSİPLİNLİ (günlük-içi çelişki 0,
  hayalet 0). **Hangi aşamada TUTMADI:** (2) numara-geçişi + (4-ters) belge-güncelleme (9 çelişki + 8 bayat CLAUDE.md iddiası)
  + söz-devri mekanizması yokluğu (11/15 söz devralınmadı).
- **Hipotez ("sonunda yorgunken atlanıyor"):** KISMEN doğru (T4-A2 "context doldu" itirafı) ama ÇÜRÜTÜLDÜ — tur-sonu yazımı
  ATLANMADI, yazıldı; gerçek-neden **yapısal iki boşluk: numara-kapısı zayıf + açılış-okuma kapsamı dar.**
- **4 kuraldan kaçı önerildi/reddedildi:** **4/4 önerildi, 0 reddedildi** — AMA KURAL 12'nin "30 gün" ayağı ZAYIF bulundu
  (hızlı-bayatlığı kaçırır) → birincil-ayak yapısal-tetik olacak şekilde revize önerildi; KURAL 12 elle-versiyonu
  maliyet>fayda (yalnız otomatik önerilir).
- **Otomatikleştirilebilir:** 5 kontrolün **4'ü kolayca** (bayat-tarama, kod-iddia-tarama, söz-senkron, kanıtsız-✅),
  1'i kısmen (kalem-listesi). Hiçbiri grep+git-log düzeyini aşmaz. ⚠️ Bu turda KOD YAZILMADI (yalnız değerlendirme).
- **Kural YÜRÜRLÜĞE KONMADI** — yalnız öneri. Yürürlük PO onayına bağlı (Bölüm 5 satırları + ayrı tur).
- DB'ye dokunulmadı · kod değiştirilmedi · CLAUDE.md/kural belgesi değiştirilmedi · PR açılmadı · commit yok ·
  kişi adı yazılmadı. Yalnız TEK dosya yazıldı: `docs/raporlar/bilanco/tekrar-onleme-2026-08-26.md`.
