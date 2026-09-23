> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-21 (📸 fotoğraf tarihi) · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)
> ⚠️ Bu belge kalemlerin TANIMINI tutar, DURUMUNU TUTMAZ. Buradaki işaretler 2026-09-21 durumudur. Güncel durum: `docs/otonom/00-KUYRUK.md` (köprü: `docs/kararlar/00-KART-INDEKSI.md`)

# DEVİR ANALİZİ — yol haritası · karar takibi · 09-DURUM · kuyruk hijyeni · belge sağlığı
**📸 DONDURULMUŞ** — bu turun kod+belge fotoğrafı, güncellenmez; güncel durum: `docs/kararlar/09-DURUM.md`
**Tur:** AZ · **Dal:** `otonom/AZ-devir-analizi-20260921` · **Tarih:** 2026-09-21
**Mod:** 🟩 PLANLA — salt-okuma. Kod/DB/şema/seed DEĞİŞMEDİ · `docs/otonom/`, `docs/kararlar/`, `CLAUDE.md`, `.env.example` **ELLENMEDİ** · kuyruğa iş eklenmedi · karar kartı açılmadı · **numara VERİLMEDİ** (hepsi `Y-??` / `KARAR-??`).
**Yöntem:** 5 paralel salt-okuma alt-ajanı (A yol-haritası · B karar-takip · C+D 09-DURUM+bayat kural · E kuyruk hijyeni · F belge sağlığı) + orkestratörün **elle kod teyidi**. Belge ↔ kod çelişirse **KOD KAZANIR**; özet ↔ kart çelişirse **KART KAZANIR** (KURAL 15).

---

## 0. ⭐ ÖNCE BUNU OKU — ÜÇ BULGU HER ŞEYDEN ÖNCE GELİR

### 0.1 🔴 OCEAN MOTORU HİÇ ÇALIŞMAMIŞ — 100× ölçek hatası, numarasız
`00-KARAR-TAKIP.md` F.14'te `[aday]` olarak duran, **numara bile verilmemiş** kalem. Orkestratör **uçtan uca elle doğruladı**:

| Adım | Kanıt (`/home/user/menti-mentor`) | Değer |
|---|---|---|
| Yazım | `src/services/discVectorService.ts:135-139` — `round3(raw.D / sum)`, D+I+S+C **1.0'a normalize** | **0-1** |
| Saklama | `src/services/discVectorService.ts:154-155` → `UserProfile.discD/I/S/C` | 0-1 |
| Okuma | `src/services/scoring.service.ts:92-96` → `discToOcean({ d: profile.discD, … })` | 0-1 |
| Dönüşüm | `src/services/disc-to-ocean.adapter.ts:15-16` — `clamp(50 + (50 * raw) / 100)`; ağırlıklar `scoring.config.ts:23-29`, \|w\| ≤ 0.6 | raw ∈ **[-0.6, 0.6]** |
| **Sonuç** | | **OCEAN ∈ [49.7, 50.3]** |
| Eşik | `src/services/scoring.config.ts:31` — `ARCHETYPE_THRESHOLDS = { HIGH: 60, MID: 55, LOW: 45 }` | **hiçbiri aşılamaz** |

**`deriveArchetype`'taki (`disc-to-ocean.adapter.ts:27-40`) HER koşul erişilemez.** Her kullanıcı fallback arketipi alır. **Hata yok, uyarı yok, log yok** — sistem "çalışıyor" görünür.
Formül `raw`'ı **0-100** ölçeğinde bekliyor, **0-1** alıyor → **100× hata**.
⚠️ Üstüne **iki ayrı `DiscVector` tipi** var: `scoring.ts:12` `{ D, I, S, C }` (büyük harf, `discVectorService`'in yazdığı) ↔ `scoring.config.ts:8` `{ d, i, s, c }` (küçük harf, `discToOcean`'ın okuduğu) → **tip sistemi bu hatayı yakalayamaz** (= madde 169).
**Etkisi:** Faz 5'in tamamı (madde 138·139·140 arketip kartı, F-11/KARAR-10) bu motora bağlı. Motor sessizce ölüyken yapılacak her Faz 5 işi boşa gider.

### 0.2 🔴 PO'nun "EN ÖN SIRA" dediği içerik bloğu kuyruğa HİÇ girmemiş
`10-yol-haritasi.md:69-80` — *"⭐⭐ EN ÖNCELİKLİ — 2026-09-03 İÇERİK KALEMLERİ, madde 138-160"*, PO'nun *"bu testler bizim için en önemli işler"* dediği blok. **20 kalemin 17'si `00-KUYRUK.md`'de YOK.**
Orkestratör teyidi (`grep -c "madde N\b" docs/otonom/00-KUYRUK.md`): madde **146·149·150·151·152·157 → hepsi 0 hit**.
Otonom motor yalnız kuyruğu işlediği için (`OTONOM-PROMPT.txt:33-37`), bu blok **21 gündür hiçbir tura girmedi**. İçeriğin bir kısmı **yazılı ve hazır** bekliyor (madde 151: 8 yaklaşım metni; madde 154: 3 metin; madde 155: 2 metin).

### 0.3 🔴 Bayat merge kuralı 14 yerde YÜRÜRLÜKTE görünüyor — biri motorun her tur okuduğu dosyada
`docs/kararlar/09-DURUM.md:450` *"merge kararı ürün sahibinde. PR aç, merge etme."* — ve `OTONOM-PROMPT.txt:37` bu dosyayı **her tur okutuyor**. Politika 2026-09-10'da değişti (`CLAUDE.md:25-44`: 🟢 işler doğrulama listesi tamsa MERGE EDİLİR).
⚠️ **Görevin öncülü yanlıştı:** *"CLAUDE.md (üstü çizildi ✓)"* denmişti. Orkestratör teyidi: **`CLAUDE.md:177` üstü çizili DEĞİL**, düz metin olarak *"PR aç, MERGE ETME: merge kararı kullanıcınındır"* diyor. Dahası `CLAUDE.md:26` yaması kendi hedefini kaybetmiş — `:8` ve `:35`'e atıf veriyor, o satırlarda bugün **başka içerik** var (`:8` = "PO kod yazmaz…", `:35` = "Şema/migration değişikliği YOK"). Gerçek hedefler **`:177` ve `:205`**.

---

## 1. KAPSAM BEYANLARI + SAYILAR

**Depolar:** çatı+belgeler `/home/user/menti-mentor-v2` @ `eabf387` (2026-09-21 08:50) · backend kodu `/home/user/menti-mentor`. ⚠️ Backend yerel klonu `61aae07`; **canlı submodule pointer `b5415bd`** (PR #86/F-27) — E bölümü BITTI iddialarını GitHub üzerinden `b5415bd`'de doğruladı, pointer **sarkmıyor**.

**⚠️ ANLIK FOTOĞRAF:** Terminalde `/goal` turu (TUR AD) aynı anda `docs/otonom/` altına yazıyor. Kuyruk bulguları **`eabf387` anına** aittir. Terminal turunun yarım işi görüldü, **DOKUNULMADI** (§7.5).

| Kaynak | Birim tanımı | Toplam | Açık | Kuyrukta VAR | Kuyrukta YOK |
|---|---|---:|---:|---:|---:|
| **A — `10-yol-haritasi.md`** (314 satır) | açık iş satırı (numaralı madde + Faz G-kodu + içerik kalemi + ⚠️/❓/E) | — | **101** | **62** | **39** |
| **B — `00-KARAR-TAKIP.md`** (833 satır) | `\| NNN \|` numara hücreli, durumu ⬜/🔵/🟡/🔀/🔴/❓/⛔ olan tablo satırı | — | **89** → kod-teyidiyle **82** | ~34 (+18 yalnız G-kartında) | **~30** |
| **B — SÖZLER** (S1..S38) | söz satırı | 38 | **13** | 5 | **8** |
| **C — `09-DURUM.md`** (462 satır) | `⬜` işaretli satır | 14 satır / 22 geçiş | 14 | 8 başka belgede · 3 kapanmış | **3 sahipsiz** |
| **E — `00-KUYRUK.md`** (260 satır) | `\| <ön-ek>-<no> \|` iş satırı | **110** | 57 BEKLIYOR | — | — |

**⚠️ İki sayım düzeltmesi:**
- Görev *"madde 6-167"* dedi; dosyada **173'e kadar** madde var. **168-173 altısı da AÇIK ve hiçbiri kuyrukta değil** (`00-KARAR-TAKIP.md:317-322`).
- Görev *"~81 açık madde"* dedi; birim tanımlanınca **89**, kod teyidiyle 7'si kapanmış çıkınca **82**.

**Kuyruk istatistiği (`eabf387`):** 110 iş · Kapı 🟢 66 / 🟡 30 / 🔴 **13** / belirsiz 1 · Durum BEKLIYOR 57 / BITTI 52 / ATLANDI 1.
⚠️ Kuyruğun kendi beyanı (`00-KUYRUK.md:235`) *"🔴 sayısı 12 sabit"* diyor — **gerçek 13** (fark: `F-09`, KARAR numarası YOK).

**Motorun fiilen okuduğu belgeler** (`docs/otonom/OTONOM-PROMPT.txt:33-40`): `01-KARARLAR` · `00-KUYRUK` · `02-ILERLEME` · `03-PO-ELLE-ISLER` · `09-DURUM` · `00-BELGE-HARITASI` · `00-KART-INDEKSI`.
⛔ **`10-yol-haritasi.md` · `00-KARAR-TAKIP.md` · `00-CIKIS-PLANI.md` prompt'ta HİÇ geçmiyor** → motor bunları ne okur ne yazar. Devir gerekçesinin kanıtı budur.

---

## 2. ⭐ ÖRTÜŞME — kaynak kalem → kuyrukta karşılığı

### 2.1 A: "KOD İŞ SIRASI" ↔ AŞAMA F — hipotez DOĞRULANDI (varsayılmadı)
**Kanıt 1 (aynı canonical kaynak):** `10-yol-haritasi.md:65` kaynağı `raporlar/bilanco/kararlar/00-ONCELIK-SIRASI-2026-08-28.md` verir; `00-KUYRUK.md:111` AŞAMA F başlığı **aynı dosyayı** gösterir.
**Kanıt 2 (kalem kalem):** Faz 1-8'in tamamı **F-01…F-33**'e devredilmiş (48 satırlık eşleme tablosu alt-ajan raporunda).
**Devredilmeyen 11 G-kodu:** `G8-06` · `G3-15` · `G1-16` · `G1-29` · `G1-10` · `G1-13` · `G8-03` · `G8-04` · `G8-05` · `G8-08` · `madde 137`.
⛔ **Ama bölümün EN ÜST kısmı (`:69-80`, madde 138-160) hiç devredilmemiş** — §0.2.

### 2.2 A: v1-G SEO — F-29 ne yaptı, ne kaldı
**F-29 (PR #219) ile YAPILAN:** `sitemap.ts` · `robots.ts` · `layout.tsx:35` `metadataBase` · `:42` `lang="tr-TR"` · `lib/siteUrl.ts`.
**KALAN 11 kalem:** 51 favicon/ikon (⬜) · 52 root OG+canonical (🟡) · 53 dashboard `noindex` (🟡 — `robots.ts:13` disallow VAR ama `noindex` **0 sonuç**; robots.txt tarama önerisidir, indeksleme yasağı değil) · 54'ün otomatik-türetme şartı (🟡 — `sitemap.ts:8` **elle statik dizi**) · 56 ölçüm · 57 Hakkımızda/İletişim · 58 Footer + yasal link (ölü `<span>` `page.tsx:68,70`) · 59 alt nav (❓ PO) · 60 scroll-to-top · 61 WhatsApp · 62 JSON-LD · 63 semantik HTML (🟡) · 67 çerez bandı.

### 2.3 ⭐ ORKESTRATÖR SENTEZİ — madde 56 + madde 67 + PR #110 TEK DÜĞÜM
Alt-ajan *"madde 56 belge ✅ diyor, kodda YOK"* dedi. Orkestratör devamını buldu:
- `10-yol-haritasi.md:209` — *"**✅ Yapıldı:** `components/analytics/Analytics.tsx`"*
- `main`'de: `frontend/src/components/` = `atoms·molecules·organisms·ui` — **analytics dizini YOK**; `GTM-`·`gtag(`·`clarity.ms`·`next/script` → **0 sonuç**
- **AMA:** `git ls-tree -r FETCH_HEAD -- frontend/src/components/analytics/` (dal `feat/analytics-seo-2026-08-22`) → **`Analytics.tsx` VAR**

→ Kod **yazılmış** (2026-08-22, belgenin dediği gibi) ama **merge edilmemiş PR #110'da duruyor**; PR'ın merge edilmeme sebebi başlığında yazılı: *"🛑 MERGE ETME — çerez izni yok, KVKK riski"* = **madde 67**.
⭐ **Yani 56, 67 ve #110 üç ayrı kalem değil, tek düğümdür:** çerez bandı çıkarsa → #110 açılır → madde 56 gerçekten ✅ olur. Yol haritası bunları üç ayrı satır olarak, birini de **yanlışlıkla kapalı** göstererek, bu tek eylemi görünmez kılıyor.
⭐ **Aciliyet düzeltmesi:** madde 56 kodu canlıda OLMADIĞI için bugün rıza-öncesi izleme **YOK**; `app/gizlilik/page.tsx:62-63` *"Analitik veya pazarlama çerezi bulunmamaktadır"* **kodla TUTARLI**. Yani madde 67 bugün **ihlal değil**, madde 56'nın **ön koşulu**.

### 2.4 B: 7 bilinen çift doğrulandı + kod-teyidiyle kapanan 7 madde
7 çift (119↔G1-22 · 120↔G1-28 · 111↔G2-06 · 121↔G8-05 · 113↔G10-10 · 114↔G10-09 · 116↔G4-38) **geçerli**, `00-KART-INDEKSI`'nde çift yönlü atıflı.
**Belgede AÇIK ama kodda BİTMİŞ 7 madde (KOD KAZANIR):** 82 (`schema.prisma:1294-1308` `Consent.version` VAR) · 98 (F-06 BITTI) · 104 (F-20/PR #218) · 106 (`Step2Template.tsx:22-49` MEZUN/KULUP/GONULLU/OZEL) · 110 (F-22/PR #226) · 112 (G10-25 ✅) · 114 (`sjt-scorer.ts:48` `prisma.sjtQuestion.findMany` → "ölü tablo" iddiası **çürüdü**). Ayrıca 143·144·145·164 hâlâ `🔀 PR'DA` ama kod main'de.

### 2.5 C: `09-DURUM` "BEKLEYEN" — görevin öncülü ÇÜRÜDÜ
Görev *"Chat uçtan uca canlı test ve Mentör paneli metrikleri HİÇBİR YERDE YOK"* dedi. **Yanlış.** İkisi de **G8-03** ve **G8-04** olarak **dört yerde** kayıtlı (orkestratör teyitli):
`G8-altyapi-po-manuel.md:48,60` (tam kart, ⬜, "[x] işleme al" PO işaretli) · `00-KART-INDEKSI.md:180-181` · `01-KARARLAR.md:385` (KARAR-18) · `00-CIKIS-PLANI.md:75` (K4, 30-45 dk / 20 dk).
**Gerçek boşluk daha dar:** (a) 2026-09-19'da açılan **yeni canonical** `03-PO-ELLE-ISLER.md`'de yoklar · (b) `09-DURUM.md:438-442` onları **numara/atıf vermeden** listeliyor → okuyan "kayıtsız" sanıyor. **Bu turun promptu bizzat bu tuzağa düştü** (KURAL 15 vakası).

### 2.6 C: Ertelenmiş teknik borç — belge kodla çelişiyor
`09-DURUM.md:445` *"`VisibilityOptIn.requestMessage` — kod artık **yazmıyor/okumuyor**; DROP = migration"*.
**Orkestratör teyidi — YANLIŞ:** `gdprService.ts:158-160` `tx.visibilityOptIn.updateMany({ data: { iceBreaker: null, requestMessage: null } })` → **aktif YAZIYOR**; `:196` `fieldsCleared` dizisinde `'visibilityOptIn.requestMessage'` listeli.
→ DROP = migration **+ `gdprService.ts` 2 yer + `tests/gdpr-anonymize.test.ts:122,169`**. "Yalnız migration" değil.
⚠️ **Karıştırma uyarısı:** `requestMessage` **3 modelde** var (`schema.prisma:407` VisibilityOptIn = ölü · `:445` MatchRequest = **CANLI** · `:559` Meeting = **CANLI**). Yalnız ilki ölü.

---

## 3. ⭐ HAZIR KUYRUK SATIRLARI

> ⛔ **Numara `Y-??`** — terminalde eşzamanlı tur kuyruğa yazıyor, kesin numara çakışır.
> Kapı kuralı: varsayılan **🟢**; (a) migration/seed · (b) auth-yetki/KVKK/matching · (c) geri dönülmez → **🟡**; KARAR bekliyorsa **🔴**.
> Sıra: **güvenlik/doğruluk en üstte**, sonra PO'nun "EN ÖN SIRA" bloğu, sonra kaynak önceliği.

### 3.1 🔴 EN ÜST — doğruluk/güvenlik

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| Y-?? | Ş0 | **⭐ OCEAN motoru hiç çalışmıyor — 100× ölçek hatası.** `UserProfile.discD/I/S/C` 0-1 ölçeğinde yazılıyor, `discToOcean` 0-100 bekliyor → OCEAN her zaman [49.7, 50.3] → arketip eşikleri (60/55/45) **hiç aşılmıyor**, HERKES fallback arketip alıyor. Hata yok, uyarı yok, log yok. | 🟡 | Kullanıcı kendi verisine göre DEĞİŞEN arketip görüyor (herkes aynı değil) | BEKLIYOR | 🟡 KALIR: matching/skorlama. **NUMARASIZ** (`00-KARAR-TAKIP` F.14 `[aday]`). Kanıt (orkestratör uçtan uca teyitli): `discVectorService.ts:135-139,154-155` (0-1 yaz) → `scoring.service.ts:92-96` (oku) → `disc-to-ocean.adapter.ts:15-16` `clamp(50+(50*raw)/100)`, `scoring.config.ts:23-29` \|w\|≤0.6 → `scoring.config.ts:31` `{HIGH:60,MID:55,LOW:45}`. ⚠️ F-11/KARAR-10'dan **BAĞIMSIZ** — motor kararı ne olursa olsun bu hata düzeltilmeli. ⚠️ Y-?? (madde 169, iki DiscVector tipi) ile **AYNI KÖK** → birlikte. |
| Y-?? | Ş0 | **madde 169 — iki farklı `DiscVector` tipi.** `scoring.ts:12` `{D,I,S,C}` (büyük harf) ↔ `scoring.config.ts:8` `{d,i,s,c}` (küçük harf). Tip sistemi yukarıdaki ölçek hatasını **yakalayamıyor**; yanlış tipi import etmek kolay. | 🟡 | (iç kalite — kullanıcı etkisi üstteki satırla birlikte görünür) | BEKLIYOR | 🟡 KALIR: matching. madde 169. Kanıt yukarıda. Tek tipe indirgenmeli. |
| Y-?? | Ş0 | **madde 168 — `matching.ts` doğrulamasız JSON cast.** `discVector` `parseDiscVector` guard'ından GEÇMEDEN cast ediliyor; şekli bozuk tek kayıt sessizce yanlış skor üretir. Guard **zaten kodda**, kullanılmıyor. | 🟡 | Bozuk profil verisi sessiz yanlış eşleşme yerine güvenli varsayılana düşüyor | BEKLIYOR | 🟡 KALIR: matching. madde 168. Kanıt: `matching.ts:286` `(c.discVector as DiscVector \| null)` · `:400` aynı; `parseDiscVector` yalnız `discVectorService.ts:37,170`. |
| Y-?? | Ş4 | **`SuspicionReport`'ta `tenantId` yok.** Şüphe bildirimleri kurum ayrımı olmadan tek havuzda. | 🟡 | Platform admin bildirimi ait olduğu kurumla görüyor | BEKLIYOR | 🟡 KALIR: migration. **madde 71** (`10-yol-haritasi.md:235`). Kanıt: `schema.prisma:1213-1225`, tek index `@@index([reviewed])`. ⚠️ Form KASITLI public → `tenantId` **nullable** olmalı. ⚠️ **Çelişki:** kart `G1-04` bunu 🗑️ sayıyor (*"public-create + platform-only-read → tasarım"*, `00-KARAR-TAKIP:88`) → **önce KURAL 15 kontrolü**, kart kazanırsa satır AÇILMAZ. |
| Y-?? | Ş4 | **madde 94 — `listPendingTenants` okuma audit izi yok.** Kardeş uçlarda var; bekleyen kurum PII'sine kim baktı iz kalmıyor (KVKK Md.12). | 🟡 | Bekleyen kurumlara bakan platform admin denetim izinde görünüyor | BEKLIYOR | 🟡 KALIR: KVKK-iz. madde 94 = G1-03 ❓. Kanıt: `platformController.ts:231` gövdesinde AUDIT/platformAudit/SystemLog **0 sonuç**. |
| Y-?? | Ş4 | **madde 47 — 90 yerde kopyalanmış Zod doğrulama bloğu.** Her uç kendi hata biçimini elle yazıyor; biçim kayarsa kullanıcı tutarsız hata görür, güvenlik yaması 30 dosyaya ayrı uygulanır. | 🟢 | Girdi hataları tüm uçlarda aynı biçimde ve aynı Türkçe mesajla | BEKLIYOR | madde 47. Kanıt: `backend/src/middleware/` 8 dosya, `validate.ts` YOK; `error: 'VALIDATION'` **90 tekrar / 30 controller**. ⚠️ `firstValidationMessage` (madde 69 CANLIDA) ile hizalı kalsın; davranış DEĞİŞMEZ. |
| Y-?? | Ş4 | **madde 48 kalanı — üç liste ucu sayfalamasız.** `requestController` · `feedbackLogController` · `clubController` tüm satırları tek yanıtta döndürüyor. | 🟢 | Listeler sayfalı geliyor, kayıt artınca ekran donmuyor | BEKLIYOR | madde 48. F-27 yalnız konuşmayı çözdü. Kanıt: üçünde de `take:`/`skip:`/`limit`/`offset`/`page` **0 sonuç**. F-27'nin `parseConversationPagination` desenini yeniden kullan. |
| Y-?? | Ş0 | **madde 100 — `SystemLog.meta.tenantId` JSON-yol sorgusu indekssiz.** Log büyüdükçe kalibrasyon sayfası yavaşlar. | 🟡 | Kalibrasyon sayfası log büyüdükçe yavaşlamıyor | BEKLIYOR | 🟡 KALIR: MIGRATION (yeni `@@index`). madde 100. Kanıt: `schema.prisma:688-695` — level/category/createdAt var, `meta` yok. |
| Y-?? | Ş0 | **`ALLOWED_ORIGINS` boşluk toleransı yok.** `.split(',')` trim etmiyor → env'de virgülden sonra boşluk varsa o origin CORS'ta hiç eşleşmez, site açılmaz, hata mesajı da yok. | 🟢 | Boşluklu env değeriyle de origin eşleşiyor | BEKLIYOR | Kanıt: `backend@b5415bd src/server.ts:53`. **`03-PO` B#8'in kod tarafı** — bugün PO'nun "boşluk koymamayı hatırlaması" gereken insan kuralına çevrilmiş. `.map(s=>s.trim()).filter(Boolean)` + 1 birim test. Efor S. |

### 3.2 ⭐ PO'NUN "EN ÖN SIRA" BLOĞU (madde 138-160) — 17 kalem, kuyrukta hiç yok

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| Y-?? | Ş2 | **madde 31+151 — eşleşen taraflar birbirine nasıl yaklaşacağını hiçbir yerde okumuyor.** 8 hazır metin (4 mentöre + 4 mentiye) **YAZILI** ama ekranda gösterilmiyor. | 🟢 | Eşleşme kurulunca iki taraf da karşısındakine nasıl yaklaşacağını okuyor | BEKLIYOR | ⭐ **İçerik HAZIR** (`00-KARAR-TAKIP:300`, `raporlar/icerik/arketip-ve-yaklasim-icerigi-2026-09-03.md` §7). Kanıt: `approachGuide`/`mentorApproach`/`yaklaşım` → BE+FE harf duyarsız **0**. madde 152'den **BAĞIMSIZ** ilerler. Migration yok. |
| Y-?? | Ş1 | **madde 141 — karakter kartı üç sorudan ÖNCE gösteriliyor, karar tersini söylüyor.** Kullanıcı ödül anını form doldurmadan görüyor, etki kayboluyor. | 🟢 | Kullanıcı üç soruyu bitirdikten SONRA karakter kartını görüyor | BEKLIYOR | Yalnız FE. Kanıt: `_OnboardingContent.tsx:172-175` (`step===2` "Sonucun Hazır! 🎉" · `step===3` "Son Birkaç Soru"). ⚠️ **Metin değil AKIŞ SIRASI** işi. Kart içeriği madde 140'a bağlı (motor bekliyor) → bu iş yalnız sıra + araya tek cümle. |
| Y-?? | Ş1 | **madde 149 — sınavda 4 kritik konu garanti değil.** Geri bildirim·sınır·gizlilik·kriz konularından birer soru her sınavda mutlaka gelmeli. | 🟢 | Her sertifika sınavında 4 kritik konunun hepsi çıkıyor | BEKLIYOR | 4 garantili + 4 rastgele çekim. Eşik ayağı (madde 164) **zaten kodda** (`certification.service.ts:73` `>= 2`). Mevcut 20 senaryoyla da çalışır, seed'e bağlı değil. |
| Y-?? | Ş1 | **madde 150 — sınavı geçemeyen zayıf konusunu öğrenmiyor.** Sonuç ekranı puan veriyor, yön vermiyor. | 🟢 | Sınav sonunda kişi zayıf konusunu ve gideceği öğrenme aşamasını görüyor | BEKLIYOR | Konu bazlı skor `certification.service.ts`'te mevcut, yeni alan gerekmez. |
| Y-?? | Ş1 | **madde 146 — isim değişkeni altyapısı (14 değişken).** Metinlerdeki kişi isimleri koda gömülü; kurum kendi adlarını kullanamıyor. | 🟡 | Kurum senaryolardaki isimleri kendi bağlamına göre değiştirebiliyor | BEKLIYOR | 🟡 KALIR: tenant override alanı ❓ migration. Kanıt: `menti_denge`·`mentor_mimar`·`sert_1` → **0 sonuç**. ⚠️ **SIRA ÖNEMLİ:** K-16/K-18 seed'inden ÖNCE yapılırsa isimler seed'e değişken girer; sonra yapılırsa **ikinci kez seed** gerekir → PO'ya sor. |
| Y-?? | Ş1 | **madde 151+152+153 — eşleşme detay sayfası yok.** Bugün yalnız tek cümlelik "neden uyumlu" var. | 🟡 | Menti "neden bu mentör · nasıl çalışırsınız · ilk görüşmede ne konuşulur" bölümlerini görüyor | BEKLIYOR | 🟡 KALIR: içerik ön koşullu — Bölüm 2'nin **16 kombinasyondan 15'i YAZILMADI**. Katman-1 VAR: `compatibilityReason` render ediliyor (`menti/page.tsx:318`, `mentor/page.tsx:482`). ⚠️ **Bölüm 1 ve 3 bağımsız ilerler** — PO isterse ikiye bölünsün. ⚠️ S1 (`mentiNeeds`) GÖSTERİLMEZ, yalnız örtüşme cümlesi. |
| Y-?? | Ş2 | **madde 154 — bekleyen talep süresiz asılı kalıyor.** 3. gün hatırlatma + 7. gün kapanış + alternatif (3 metin YAZILI), cron yok. | 🟡 | Menti 3. günde hatırlatma, 7. günde alternatif mentör görüyor | BEKLIYOR | 🟡 KALIR: bekleme durum/zaman alanı ❓ migration + cron. Kanıt: `cronScheduler.ts:446` aktif cron listesinde bekleme zamanlayıcısı **YOK**. ⚠️ U-01 ve P-05 ile aynı `meetingController.ts` → SIRALI. |
| Y-?? | Ş1 | **madde 156 — görüşme sıklığı yalnız anlaşma sayfasında.** Profilde ve bekleme metninde görünmüyor. | 🟢 | Menti görüşme sıklığını profilinde ve beklerken görüyor | BEKLIYOR | Kanıt VAR: `menti/agreement/[id]/page.tsx:77-78` `FREQ_LABEL[...]`. Efor S, migration yok. |
| Y-?? | Ş1 | **madde 157+158 — sertifika deneme disiplini yok.** Sınırsız deneme (aynı gün ezberlenebilir); yanlış konu tekrar denemede zorlanmıyor. | 🟡 | Günde 2'den fazla deneme yok; yanlış yapılan konu tekrar sınavda mutlaka çıkıyor | BEKLIYOR | 🟡 KALIR: deneme sayacı/konu-sonucu alanı = **migration olası** (`00-KARAR-TAKIP:306-307`). Kanıt: `certification.service.ts` içinde `attemptLimit`·`dailyAttempt`·`guaranteed` → **0 sonuç**. |
| Y-?? | Ş1 | **madde 167 — öğrenme yolculuğunda GİZLİLİK + BİTİRME aşaması yok (8→10).** İki konu sertifikada **SINANIYOR** ama yolculukta hiç öğretilmiyor → "öğretilmemiş konuda eleme". | 🟡 | Mentör yolculukta gizlilik ve bitirme aşamalarını görüyor | BEKLIYOR | 🟡 KALIR: SEED. Kanıt: `prisma/seed-learning-journey.ts` içinde `GIZLILIK`/`BITIRME` → **0 sonuç**. İçerik yazım turu ÖNKOŞUL. |
| Y-?? | Ş0 | **madde 160 — iptal edilmiş karar hâlâ geçerli görünüyor.** "İsimler unisex, karşı taraf isimsiz" kararı iptal edildi ama belgede üstü çizilmedi. | 🟢 | Eski karar `[ESKİ]` damgalı, okuyan yanılmıyor | BEKLIYOR | **BELGE işi.** Kanıt: `konu/degerlendirme-sistemi-tasarim-2026-08-27.md:410`; iptal gerekçesi faz6 §4'te. G9-03 deseni (silme YOK). |
| Y-?? | Ş0 | **madde 138·139·140 — Big Five arketip kartı üçlüsü.** | 🔴 KARAR-10 | KARAR-10'a göre motor bağlanır, kullanıcı arketip kartını görür | BEKLIYOR | ⛔ **ÖN KOŞUL §0.1** — motor 100× ölçek hatasıyla ölü; önce o düzeltilmeli. = F-11'in alt kümesi → PO isterse F-11 Not'una eklenip satır açılmaz. |
| Y-?? | Ş2 | **madde 155 — ret ekranı sebep gösteriyor, karar tersini söylüyor.** Sebep GİZLİ kalmalı, alternatif aynı ekranda (2 metin YAZILI). | 🔴 KARAR-22 | Reddedilen menti sebep yerine alternatif mentör görüyor | BEKLIYOR | ⚠️ **P-05 ile AYNI konu** → P-05'in içerik/metin ayağı. PO isterse P-05 Not'una eklenip bu satır AÇILMAZ. |
| Y-?? | Ş0 | **madde 159 — kriz bildirimi akışı yok.** Kendine zarar ifadesinde kimse haberdar olmuyor; sertifikada senaryo olarak SINANIYOR ama canlı karşılığı yok. | 🔴 KARAR-?? + avukat | Kriz ifadesinde kurum yöneticisine bildirim gidiyor | BEKLIYOR | ⛔ **HUKUKİ ÖN KOŞUL.** Kanıt: `kriz`·`crisis`·`selfHarm` → tek alakasız sonuç. ⚠️ **G1-01 ÇELİŞKİSİ:** 18 yaş altı menti kabul edilecekse gerçek yaş + veli onayı gerekir → "18+ beyanı yeterli" çöker. Avukat paketine TEK SORU. |

### 3.3 v1-G SEO / kurumsal (F-29 sonrası)

| # | Şerit | İş | Kapı | Bitti demek | Durum | Not |
|---|---|---|---|---|---|---|
| Y-?? | Ş4 | **madde 58 — Footer yalnız ana sayfada, yasal linkler tıklanmıyor.** "Gizlilik Politikası"/"Kullanım Koşulları" **ölü metin**; sayfalar VAR ama hiçbir yerden bağlanmıyor. | 🟢 | Kullanıcı her public sayfanın altından Gizlilik/KVKK/Kullanım Koşulları'na tıklayıp gidiyor | BEKLIYOR | Kanıt: inline footer `app/page.tsx:53-73`; ölü `<span>` `:68,:70`; hedefler VAR (`app/gizlilik`,`kvkk`,`terms`,`metodoloji`). |
| Y-?? | Ş4 | **madde 57 — Hakkımızda ve İletişim sayfaları yok.** | 🟢 | Ziyaretçi /hakkimizda ve /iletisim'i açıp iletişim yolunu görüyor | BEKLIYOR | Kanıt: `frontend/src/app/` dizin listesi. ⚠️ Footer işiyle **aynı dosyalara** dokunur → SIRALI. İletişim bilgisi PO'dan. |
| Y-?? | Ş4 | **madde 53 — dashboard/admin arama motoruna kapalı sayılmıyor.** `robots.txt` tarama önerisidir, indekslemeyi yasaklamaz. | 🟢 | Özel alan sayfaları arama sonuçlarında görünmüyor | BEKLIYOR | Kanıt: `robots.ts:13` disallow VAR; `noindex`/`index: false` → **0 sonuç**. Korumalı layout'lara `metadata.robots={index:false,follow:false}`. |
| Y-?? | Ş4 | **madde 51+52 — site simgesi Next.js varsayılanı, paylaşım görseli yok.** | 🟢 | Sekmede ve link paylaşımında kurum logosu görünüyor | BEKLIYOR | Kanıt: `app/` içinde yalnız `favicon.ico`; `icon.png`/`opengraph-image.*` **0 dosya**; `layout.tsx:33-38` root `openGraph` YOK. |
| Y-?? | Ş4 | **madde 54 şartı — sitemap elle yazılmış.** Yeni public sayfa eklenince sitemap'te çıkmaz. | 🟢 | Yeni public sayfa eklenince sitemap'te kendiliğinden görünüyor | BEKLIYOR | Kanıt: `app/sitemap.ts:8` `PUBLIC_PATHS` statik dizi. ⚠️ Yukarıdaki iki SEO işinden **SONRA**. |
| Y-?? | Ş4 | **madde 62 — JSON-LD yapısal veri yok.** | 🟢 | Arama sonucunda kurum zengin sonuç olarak görünüyor | BEKLIYOR | Kanıt: `ld+json`/`schema.org` → **0 sonuç**. |
| Y-?? | Ş4 | **madde 60+61 — "yukarı çık" ve WhatsApp düğmesi yok.** | 🟢 | Kullanıcı sağ-altta iki düğmeyi görüp kullanıyor | BEKLIYOR | Kanıt: `scrolltotop`/`scrollTo(0`/`yukarı çık` → **0**; WhatsApp yalnız `ShareButtons.tsx:21` (**içerik paylaşımı, farklı iş**). Numara PO teyidi. Klavye + `aria-label` zorunlu. |
| Y-?? | Ş3 | **madde 67 — çerez-izni bandı yok.** ⭐ **PR #110'u açan anahtar.** | 🟡 | Kullanıcı ilk girişte çerez tercihini seçiyor, reddederse izleme yüklenmiyor | BEKLIYOR | 🟡 KALIR: KVKK/rıza. ⭐ **Aciliyet DÜŞTÜ** (§2.3): izleme kodu canlıda YOK → bugün ihlal yok. **madde 56'nın ön koşulu.** Consent Mode v2 + tercih saklama + klavye erişimi. |
| Y-?? | Ş4 | **madde 56 — ölçüm kodu (GTM/GA4/Clarity/GSC) canlıda yok.** Belge "✅ yapıldı" diyor; kod **PR #110'da bekliyor**. | 🟡 | Kurum sahibi ziyaretçi sayısını ve nerede takıldığını görüyor | BEKLIYOR | 🟡 KALIR: KVKK. ⛔ **ÖN KOŞUL: madde 67.** ⭐ Kod **yazılmış**: `feat/analytics-seo-2026-08-22` dalında `components/analytics/Analytics.tsx` VAR, main'de YOK. Bu satır = **#110'u merge edilebilir hale getirmek**, sıfırdan yazmak değil. |
| Y-?? | Ş4 | **madde 59 — alt nav kapsamı belirsiz.** | 🔴 KARAR aday | PO'nun seçtiği cihaz kapsamında alt nav çalışıyor | BEKLIYOR | Belgenin kendisi *"❓ PO NETLEŞTİR"* diyor (`:216`). Kart açılmadan dokunulmaz. |

### 3.4 Diğer kaynak kalemleri (özet — tam liste alt-ajan raporlarında)
`madde 36` onaylı üyeyi çıkarma 🟡 (⭐ **ikame VAR:** `adminController.ts:740-780` `rejectUser` APPROVED'a da uygulanıyor `:764`; eksik olan **FE düğmesi** + `:773-779` "tekrar başvurun" maili onaylı üye için YANLIŞ metin) · `madde 35` iki tip red 🔴 · `madde 7` havuz Aşama 2/3 🔴 · `madde 49` string-enum borcu 🟡 · `madde 70` adaptif test FE guard'ı 🟢 · `madde 137` meeting/verifyTenant actor-log 🟢 (F-06 deseni hazır) · `madde 75` mentör görünürlük FE 🔴 (backend VAR + V-03 IDOR guard'lı, **FE 0 sonuç**) · `madde 127` etiket önerme FE 🟢 (backend V-13 ile düzeltildi, çağıran yok) · `madde 128` eş-anlamlı etiket 🟡 · `madde 108` mentör karar ekranında ilk mesaj 🟡 · `madde 126` `answeredFollowup` 🔴 (kod olmayan tabloyu sorguluyor, try/catch sessizce 0) · `madde 171+170` sessiz düşüş taraması 🟢 · `madde 173` 2026-08-02 beş raporun doğrulaması 🟢 · `madde 166` iki `rankMentorsForMenti` 🔴 · `S38` `certification.service.ts:92` bayat yorum 🟢 · **belge düzeltme paketi** 🟢 (yol-haritasında 6 bayat iddia + karar-takipte 7 bayat satır — hepsi kanıtlı, §7.3).

---

## 4. ⭐ HAZIR KARAR KARTLARI

> ⛔ **NUMARA VERİLMEDİ** — terminalde eşzamanlı tur `01-KARARLAR.md`'ye kart ekliyor. Hepsi `KARAR-??`.
> Kümeleme yapıldı: aynı ürün sorusunu paylaşan kalemler tek kartta.
> ⚠️ Önce **5 EKSİK KART** açılmalı (§7.4) — kuyrukta "KARAR aday" yazan ama kartı olmayan 5 iş var; PO onları cevaplayamıyor çünkü soru **sorulmamış**.

### KARAR-?? · Kurumdan üye çıkarma ve red tipi  [ÜRÜN KARARI] (2 işi açar)
**Şu an ne var:** Yönetici yalnız *bekleyen* başvuruyu reddedebiliyor (`admin/waiting-room/page.tsx:185`). Backend aslında onaylı üyeye de uygulanabiliyor (`adminController.ts:740-780`, `:764` `isActive:false`) ama ekranda düğme yok; üstelik red maili *"tekrar başvurabilirsiniz"* diyor (`:773-779`) — onaylı üyeyi çıkarırken bu metin yanlış.
**Sorun ne:** Kuruma uygun olmadığı anlaşılan bir üye sistemde kalıyor. Ayrıca red tek tip: dolandırıcıya da, eksik form dolduran iyi niyetli kişiye de aynı kibar mesaj gidiyor.
**Neden sana soruyorum:** Birinin kurumdan çıkarılması ve "bir daha başvuramaz" denmesi kişinin hakkını etkiler; KVKK ve etik sonucu var. Teknik değil.
**Seçenekler:**
· **A — Çıkarma yok, sadece "düzeltme iste".** Kullanıcı: bugünkü gibi. Kazanç: sıfır risk, sıfır iş. Kayıp: **kuruma zarar veren üye sistemde kalır**, yönetici elle uğraşır. Süre S · geri alınır ✅ · migration yok.
· **B — Üyelik pasifleştirilir, veri kalır.** Kullanıcı: çıkarılan kişi giriş yapamaz, geçmiş görüşmeleri kurumda kalır. Kazanç: geri alınabilir, istatistik bozulmaz. Kayıp: kişinin verisi kurumda **kalmaya devam eder** — "beni tamamen silin" derse ayrı iş gerekir. Süre M · geri alınır ✅ · migration yok (mevcut `isActive`).
· **C — Üyelik + veri anonimleştirilir.** Kullanıcı: kişi ve izleri kurumdan silinir. Kazanç: KVKK açısından en temiz. Kayıp: **geri dönüşü YOK**; mentörün geçmiş görüşme sayısı da düşer, emeği kaybolur. Süre M · geri alınamaz ⛔ · migration olası.
**Karşılaştırma:** Kurum küçük ve güven esaslıysa B yeter (çıkar, ama izi tut). Kötüye kullanım/taciz vakası bekleniyorsa C gerekir ama emek-kaybı yan etkisi konuşulmalı. A yalnız "şimdilik" cevabıdır.
**Benim önerim:** **B** — çünkü geri alınabilir ve mentör emeğini korur; C'yi gerektiren vaka çıkınca ayrı karar verilir.
**Cevap vermezsen:** madde 36 ve madde 35 kuyruğa giremez; yönetici onaylı üyeyi çıkaramamaya devam eder.
**CEVAP:**

### KARAR-?? · Kriz bildirimi (kendine zarar) + yaş sınırı  [ÜRÜN + HUKUK] (2 işi açar)
**Şu an ne var:** Sertifikada mentöre *"menti kendine zarar ifadesi kullanırsa ne yaparsın"* diye **soruluyor** ama canlıda böyle bir akış **yok** (`kriz`·`crisis`·`selfHarm` → tek alakasız sonuç).
**Sorun ne:** Mentör eğitimde öğrendiği refleksi uygulayacak bir yer bulamıyor; kriz anında sistem sessiz.
**Neden sana soruyorum:** Bir kişinin en kırılgan anında kimin haberdar olacağı hukuki ve etik bir karar; yanlış kurgu zarar verir.
**Seçenekler:**
· **A — Bildirim yok, yalnız yardım hattı metni gösterilir.** Kullanıcı: kriz ifadesinde ekranda destek hattı çıkar. Kazanç: hukuki risk en düşük, mahremiyet tam. Kayıp: **kurum hiçbir zaman haberdar olmaz**; mentör yalnız kalır. Süre S · geri alınır ✅.
· **B — Sessiz bildirim (menti bilmez).** Kullanıcı: yönetici haberdar olur, menti görmez. Kazanç: müdahale mümkün. Kayıp: **menti izlendiğini bilmiyor** — güven ihlali; KVKK açısından açık rıza sorunu. Süre M · geri alınır ✅.
· **C — Şeffaf bildirim (menti görür).** Kullanıcı: *"bu mesaj kurum yöneticisiyle paylaşıldı"* bilgisi görünür. Kazanç: dürüst, KVKK-uyumlu. Kayıp: menti **bir daha o konuyu açmaz** — özellik kendi amacını öldürebilir. Süre M · geri alınır ✅.
**Karşılaştırma:** Hepsi avukat onayı ister. A en güvenli ama en az koruyucu; C etik olarak en savunulabilir ama işlevi zayıflatır; B en riskli.
**Benim önerim:** Yok — **bu senin ürün kararın, önerime güvenme.** Avukat görüşü alınmadan hiçbiri seçilmemeli.
⚠️ **BAĞLI SORU (aynı kart):** Bu akış 18 yaş altı menti varsayıyorsa, **`G1-01` çöker** — bugün "18+ beyanı yeterli" deniyor, gerçek yaş ve veli onayı gerekir. Avukat paketine **tek soru** olarak gitmeli.
**Cevap vermezsen:** madde 159 kuyruğa giremez; sertifika bir davranışı öğretip karşılığını sunmamaya devam eder.
**CEVAP:**

### KARAR-?? · Kulüp tipi kurum ve kurumlar-arası görünürlük  [ÜRÜN + HUKUK] (3 işi açar)
**Şu an ne var:** Kulüp modülü backend'de canlı (`clubRoutes.ts`) ama avukat notu *"veri sorumlusu üniversitedir, kulübün imza yetkisi yok"* diyor (`madde 91`). Ayrı olarak kurumların etkisi birbirine tamamen kapalı (`madde 115`, `116`).
**Sorun ne:** Bir üniversite kulübü kendi başına kayıt olursa sözleşmeyi imzalayacak tüzel kişi yok. Ayrıca hiçbir kurum diğerinin başarısını göremediği için "biz de yapalım" etkisi doğmuyor.
**Neden sana soruyorum:** Kimin kaydolabileceği ve kimin ne göreceği; hukuki sorumluluk ve büyüme stratejisi.
**Seçenekler:**
· **A — Kulüp kaydı kapalı, kurum verisi tamamen kapalı.** Kazanç: sıfır hukuki risk. Kayıp: **kulüpler hiç giremez** (hedef kitlenin bir bölümü) + organik büyüme kanalı yok. Süre S · geri alınır ✅.
· **B — Kulüp ancak üniversite onayıyla; kurum isterse anonim/agregat paylaşır.** Kazanç: hukuk korunur, büyüme kanalı açılır, k-anonimlik kapısı zaten var (`mask.ts:70`). Kayıp: onay akışı **ek iş** (kurum→üniversite doğrulaması) + agregat paylaşım ayrı ekran. Süre L · geri alınır ✅ · migration olası.
· **C — Kulüp açık kalsın (beyanla), açık etki duvarı.** Kazanç: en hızlı büyüme. Kayıp: **avukat riski kurumda** + küçük kurumda agregat bile kişiyi ifşa edebilir. Süre M · geri alınması zor ⛔ (paylaşılan veri geri alınmaz).
**Karşılaştırma:** B, hukuk ile büyümeyi ayıran tek seçenek ama en pahalısı. C, gerçek kullanıcı ~sıfırken cazip görünür, kurum sayısı artınca geri alınamaz.
**Benim önerim:** **B** — çünkü avukat notu zaten C'yi riskli ilan etmiş ve k-anonimlik altyapısı kodda hazır.
**Cevap vermezsen:** madde 91 · 115 · 116 kuyruğa giremez; kulüp modülü canlı ama hukuken savunmasız kalır.
**CEVAP:**

### KARAR-?? · Canlı veritabanına salt-okuma izni  [ÜRÜN/OPERASYON] (5+ işi açar)
**Şu an ne var:** madde 30·33·118, söz S10 ve Y6 — hepsi *"canlı DB'de kaç soru var"* sorusuna bağlı ve **hiç sorulmamış**. Proje kuralı canlı DB'ye `SELECT` için bile onay istiyor.
**Sorun ne:** Beş iş, tek bir sayım yapılamadığı için aylardır kilitli.
**Neden sana soruyorum:** Canlı = lokal aynı Neon; DB'ye dokunmanın izni sende.
**Seçenekler:**
· **A — Salt-okuma `SELECT count(*)` izni ver.** Kazanç: beş iş **aynı anda** açılır, PII okunmaz (yalnız sayı). Kayıp: yanlış yazılmış bir sorgu teorik olarak yük bindirir (pratikte `count(*)` zararsız). Süre S · geri alınır ✅.
· **B — Sen kendi panelinden say, sayıyı yaz.** Kazanç: ajan DB'ye hiç dokunmaz. Kayıp: **sende iş**; her teyit turunda tekrar gerekir. Süre S (senin için) · geri alınır ✅.
· **C — Ertele.** Kayıp: **madde 30/33/118 + S10 + Y6 kilitli kalır**, sertifika ve öğrenme içeriği ilerlemez. Süre 0 · geri alınır ✅.
**Karşılaştırma:** A ile B aynı sonucu verir; fark işin kimde olduğudur. C hiçbir şey çözmez, yalnız erteler.
**Benim önerim:** **A** — `count(*)` PII döndürmez ve beş kalemi tek hamlede açar.
**Cevap vermezsen:** Beş kalem teyitsiz kapalı kalır.
**CEVAP:**

### KARAR-?? · Yarım kalmış üç teknik kalem: `answeredFollowup` · `qualityMultiplier` ikizi · iki yedek tablo  [VERİ KARARI] (4 işi açar)
**Şu an ne var:** (a) Kod var olmayan bir tabloyu sorguluyor, `try/catch` sessizce 0 döndürüyor (`profile-completeness.service.ts:43,47`). (b) `UserProfile.qualityMultiplier` kullanılmıyor; canlı akış `TenantMembership.qualityMultiplier` kullanıyor. (c) İki yedek tablo (`MentorshipAgreement_yedek_20260830`, `CertificationOption_yedek_20260909`) `schema.prisma`'da **yok** → ileride `migrate dev` onları fazlalık görüp DROP etmek isteyebilir (sözler S26/S37, ikisi de ⬜).
**Sorun ne:** Üçü de "yarım bırakılmış"; hiçbiri hata vermiyor, bu yüzden kimse fark etmiyor. Ama üçü de bir gün sessizce veri kaybettirebilir.
**Neden sana soruyorum:** Üçü de **silme** kararı; CLAUDE.md silme protokolü PO'nun ikinci onayını şart koşuyor.
**Seçenekler (her kalem için aynı üçlü):**
· **A — Tamamla/kalıcılaştır.** (a) tabloyu aç · (b) ikizi şemaya doğru bağla · (c) yedek tabloları şemaya ekle. Kazanç: hiçbir şey kaybolmaz. Kayıp: **migration** + kalıcı bakım yükü. Süre M · geri alınır ✅.
· **B — Karantinaya al** (`@deprecated`, rota kapalı), bir tur sonra ikinci onayla sil. Kazanç: protokole uygun, geri dönülebilir. Kayıp: iki tur sürer. Süre M · geri alınır ✅.
· **C — Şimdi sil (DROP).** Kazanç: en temiz. Kayıp: **geri dönüşü yok**; yedek tablolar silinirse 6 saatlik Neon penceresi dışındaki tek koruma gider. Süre S · geri alınamaz ⛔ · migration.
**Karşılaştırma:** (c) yedek tablolar için özellikle dikkat: onlar **koruma amaçlı** duruyor; erken silmek koruma kaybıdır. (a) ve (b) için ölü kod normal protokole girer.
**Benim önerim:** (a)+(b) için **B** (karantina), (c) için **A** (şemaya ekle) — çünkü yedek tabloyu şemaya eklemek `migrate dev`'in onu kazara DROP etmesini önler ve silme kararını aceleye getirmez.
**Cevap vermezsen:** madde 126, D3, S26 ve S37 açık kalır; bir `migrate dev` turunda yedek tablolar **uyarısız kaybolabilir**.
**CEVAP:**

### KARAR-?? · `00-KARAR-TAKIP` madde 103 — kart mı özet mi kazanır  [BELGE/METODOLOJİ]
**Şu an ne var:** `G2-01..05` kartları `md.103` için **🗑️ geçersiz** diyor; madde 103 satırı hâlâ **🔵❓** duruyor.
**Sorun ne:** Aynı kalem iki yerde iki farklı durumda. KURAL 15 *"çelişkide KART kazanır"* diyor, ama kartın konusu *"DISC matrisi onayı"*, madde 103'ünki *"psikometrik gerekçenin belgelenmemesi"* — **aynı şey olmayabilir**.
**Neden sana soruyorum:** Bu tam olarak **G1-23 vakasının tekrarı**: orada da özet belge, farklı konulu bir kanıta dayanarak bir kalemi yanlışlıkla kapatmıştı ("21. hayalet tamamlanmış").
**Seçenekler:**
· **A — Kart kazanır, madde 103 🗑️.** Kazanç: tek hamlede kapanır. Kayıp: **gerçekten ayrı bir konuysa sessizce kaybolur** (G1-23 tekrarı). Süre S · geri alınır ✅.
· **B — Ayrı konu; madde 103 ⬜ AÇIK kalır, yeni kart açılır.** Kazanç: kayıp yok. Kayıp: bir kalem daha açık listede. Süre S · geri alınır ✅.
· **C — ❓ TEYİT GEREK bırak.** Kayıp: belirsizlik sürer, her turda yeniden tartışılır. Süre 0.
**Karşılaştırma:** A hızlı ama G1-23 dersini görmezden gelir; B bir kalem maliyetine kaybı önler.
**Benim önerim:** **B** — çünkü aynı hata bu projede bir kez ölçülmüş ve kural haline getirilmiş (KURAL 15 gerekçesi).
**Cevap vermezsen:** madde 103 belirsiz kalır, her denetim turunda yeniden gündeme gelir.
**CEVAP:**

---

## 5. ⭐ `03-PO-ELLE-ISLER.md`'YE EKLENECEKLER

Mevcut tablo biçimi: `| # | İş | Neden kritik (somut senaryo) | Nerede yapılır | Nasıl anlaşılır (doğrulama) |`. Numaralar 1-13 dolu → yeniler **14+**. **D grubu** önerilir (A=çıkış blokeri · B=sessiz kopma · C=DB · **D=canlı gözlem**).

### D — CANLI GÖZLEM TESTLERİ (kod hazır, gerçek hesapla ekran doğrulaması gerekir)
> Kaynak: `09-DURUM.md:439,441` · kartlar `G8-altyapi-po-manuel.md:48-70` (G8-03 · G8-04, ikisi ⬜, "[x] işleme al" PO işaretli) · `01-KARARLAR.md:385` (KARAR-18) · `00-CIKIS-PLANI.md:75` (K4). **Ajan yapamaz:** iki gerçek hesap, canlı domain, gerçek e-posta kutusu, 45 sn polling.

| # | İş | Neden kritik | Nerede | Nasıl anlaşılır |
|---|---|---|---|---|
| 14 | **[G8-03] Chat'i canlıda uçtan uca dene** | Kod TAM CANLIDA (`09-DURUM.md:419-421`) ama **hiç gerçek kullanıcıyla denenmedi**. Chat mentinin mentörle ilk teması — burada bir pürüz tam güven anında patlar. **Mail ayağı ayrıca riskli:** SMTP boşsa e-posta sessizce düşer (`emailService.ts:38-41`), hiçbir log çıkmaz. | Canlı site, **iki ayrı gizli pencere** (menti + mentör, aynı kurum) + gerçek e-posta kutusu | (1) Menti ilk mesajı yazar → mentörde **rozet 45 sn içinde** artar (polling). (2) Mentör thread'i açar, mesaj görünür. (3) Mentide "okundu" işareti. (4) Mentörün kutusuna bildirim **gerçekten düşer** (düşmezse → B#4 SMTP). (5) Ters yönde aynı 4 adım. **30-45 dk** |
| 15 | **[G8-04] Mentör paneli metriklerini canlıda gözle gör** | Metrik kartları canlıda (IDOR korumalı) ama **gerçek veriyle hiç bakılmadı**. Bu kartlar mentörün emeğinin tek görünür karşılığı; yanlış/sıfır sayı mentörün bırakmasına yol açar ve kimse fark etmez (uç 200 döner). **Somut şüphe:** `SCHEDULED→COMPLETED` geçişi kodda **hiç yazılmıyor** (U-01) → "tamamlanan" kartı kalıcı 0 gösterebilir. | Canlı site, gerçek mentör hesabı + Neon salt-okuma `SELECT` | 4 kart **"0"/"—" değil gerçek sayı** ve DB ile birebir: `SELECT count(*) FROM "Meeting" WHERE "mentorUserId"='<id>' AND status='SCHEDULED';` ↔ bekleyen · `status='COMPLETED'` ↔ tamamlanan (**0 çıkarsa U-01'in kanıtıdır, kart hatası değil — not düş**). "Yaklaşan Toplantılar" tarih sırasıyla görünüyor. **20 dk** |
| 16 | **Kullanıcı mesajları (`Message`) için KVKK saklama süresi belirlet** | `SystemLog` 90 gün, `FeedbackLog` 3 yıl imha ediliyor ama **kişiler arası mesajlar süresiz** duruyor — kod bunu açıkça söylüyor: `gdprService.ts:351` *"süre HENÜZ KARARLAŞMADI"*. KVKK "sınırlı süre" ilkesine aykırı, denetimde ilk sorulacak şey. Süreyi ajan seçerse hukuki sorumluluk **uydurulmuş bir sayıya** dayanır. | Avukat/hukuk danışmanı (G1-10 metin paketi) | Saklama süresi ("N ay") yazılı bir metinde geçiyor ✅ → **F-02** ajan tarafından kodlanabilir hale gelir. ⚠️ Bugün ne KARAR kartı ne 03-PO satırı var → **hiçbir yerde takip edilmiyordu** |
| 17 | **OAuth açık rıza metnini yazdır** | Google ile girişte rıza **implicit** alınıyor (`oauth/oauthService.ts`); kayıt formundaki metin OAuth akışında kullanılamıyor. Ajan checkbox'ı koyabilir, **metni yazamaz**. | Aynı hukuk görüşmesi (#16 ile birlikte) | Metin yazılı ✅ → **F-03** kodlanabilir |
| 18 | **"Kurum kendi sertifika sorusunu ekleyemez" kuralının gerekçesini bir cümleyle yaz** | Kısıt kodda uygulanıyor (`certification.service.ts:385`) ama **NEDEN'i hiçbir belgede yok**. Gerekçe yazılmazsa bir sonraki tur "ölü kısıt" sanıp kaldırmaya kalkar — **bu projede üç kez yaşandı** (YANLIŞ SORU TUZAĞI). Ajan uyduramaz (SİLME PROTOKOLÜ adım 1: *"GEREKÇE BULUNAMADI yaz, UYDURMA"*). | PO — tek cümle | Cümle yazılı ✅ → **F-13** 🟢, 10 dakikalık belge işi |

### Mevcut satırlara eklenecek notlar (yeni satır gerekmez)
- **B#4 (SMTP)** → ek cümle: *"⚠️ **P-10** mentör talep bildirimi bu ayar olmadan **ETKİSİZ** kalır — kod merge edilse de mentöre mail gitmez (`notificationService.ts:39-55` `[PUSH-STUB]`)."* (Kardeş satırlar U-04·V-01·V-08 bu işareti taşıyor, **P-10'da yok.**)
- **B#6 (`BACKEND_URL`)** → başlık daralt: compose tarafı **V-08/PR #225 ile eklendi ✅** (`docker-compose.yml:59-61`); geriye yalnız *"Dokploy'da değeri set edildi mi"* teyidi kalıyor.
- **B#7 (`NEXT_PUBLIC_API_URL`)** → "Nerede yapılır" netleştir: *"Dokploy'da `BACKEND_URL` set et — compose `args` köprüsü hazır (`docker-compose.yml:85-86`, `frontend/Dockerfile:16-17`)."*
- **B#8 (`ALLOWED_ORIGINS`)** → kod tarafı **kuyruğa taşındı** (§3.1); bu satır yalnız *"değer doğru domaini içeriyor mu"* teyidine daralır.
- **`docker build` teyidi (V-14)** → **03-PO'dan ÇIKAR**: `docker build` lokal/CI işidir, Dokploy/Neon erişimi gerektirmez → V-14 Not'una taşı.
- **"Karar bekleyenler" (`:50-53`)** → ⛔ **YANLIŞ BEYAN DÜZELT:** *"Kartlar bu turda açıldı (KARAR-23+): `mentorVisibilityEnabled` (§4.5) · oryantasyon kilidi (§9.2)"* — **bu iki kart YOK** (30 kart doğrulandı: KARAR-0…29). PO listeye bakıp arayacak, bulamayacak.
- **K-14 iş metni** → *"Altyapı kısmı → `01-KARARLAR`'a"* ifadesi **bayat**; doğrusu **`03-PO-ELLE-ISLER.md`** (2026-09-19'da tam bu amaçla açıldı).
- Ayrıca **G1-10 · G1-13 · G8-05 · G8-06 · G8-08 · G1-16 · G3-15** hiçbir listede yok (§2.1) — G8-06 ve G3-15 **ajan işi** (kuyruğa), kalan beşi **PO işi** (buraya).

---

## 6. BAYAT KURAL LİSTESİ — "PR aç, merge etme"

**Kapsam:** `docs/` + `CLAUDE.md`, harf duyarsız, `PR *aç[^.]{0,40}merge *etme` + `merge *karar[ıi]` → **36 satır / 20 dosya** + **17 satır / 12 dosya**.

### 6.1 🔴 YÜRÜRLÜKTE GÖRÜNEN — 14 satır, DÜZELTİLMELİ
`CLAUDE.md:26` (atıf hedefi kaymış) · `CLAUDE.md:162` (bulut-merge çelişkisi, ⚠️ **TEYİT GEREK**) · `CLAUDE.md:177` (**üstü çizili DEĞİL**) · `09-DURUM.md:450` (⭐ **motor her tur okuyor**) · `10-yol-haritasi.md:308` · `:309` · `konu/07-calisma-tarzi.md:10` · `:19` (⭐ *"canonical: çalışma tarzı"*, CLAUDE.md'nin kaynağı) · `konu/11-…-disc.md:148` · `devir/01-felsefe-ve-calisma-tarzi.md:29` · `:56` · `devir/03-kvkk-is-paketi.md:55` · `devir/04-13-admin-bulgusu.md:69` · `devir/06-devir-kilavuzu.md:44` · `:46`.

**Düzeltme deseni (hepsi için aynı, SİLME YOK):**
```markdown
~~[ESKİ · <özgün tarih>] <eski cümle>~~
⚠️ **GÜNCELLEME (2026-09-21): doğrusu —** kapıya göre: **🟢 → doğrulama listesi tamsa MERGE ET**;
🟡 → PR aç, merge etme; 🔴 → KARAR cevapsızsa dokunma.
— kanıt: `CLAUDE.md:25-44` · `docs/otonom/00-KUYRUK.md:6-16` · `OTONOM-PROMPT.txt:151-152`.
```
**İki satır özel metin ister:**
- `09-DURUM.md:450` → *"main'e merge = canlıya deploy **DEĞİŞMEDİ**; değişen merge **yetkisi**: 🟢 işlerde ajanda, 🟡/🔴'de PO'da. Migration/seed yasağı ve DB onayı **aynen geçerli** (üstteki kural)."*
- `devir/03:55` ve `devir/04:69` → *"Bu paket KVKK/enum dosyalarına dokunduğu için **tanımı gereği 🟡**'dir → merge YOK. Sonuç aynı, ama gerekçe **kapı kuralıdır**, genel 'merge etme' kuralı değil."*
- `CLAUDE.md:26` → atıf hedefleri `:8`/`:35` → **`:177` ve `:205`** olarak düzeltilmeli.

### 6.2 🟢 TARİHSEL — BAYAT DEĞİL, DOKUNULMAZ
`docs/arsiv/*` (11 satır) · `docs/devir/gunluk/oturum-2026-08.md:270,302,350,351,419` ve `oturum-2026-09.md:52` · `09-DURUM.md` ⚡ tur kayıtları (18 satır) · `00-KARAR-TAKIP.md:135,137,141,145,147` · `oz-denetim/*` denetim raporları · `bilanco/bolumler/*` 📸 defterler · `G8-altyapi-po-manuel.md:48-70` · `02-ILERLEME.md:195,407`.
→ **O tarihin doğrusuydu.** Düzeltme yazılmaz.

### 6.3 ⚪ ZATEN DOĞRU / İSTİSNA
`CLAUDE.md:25,29-44` (yeni politikanın kendisi) · `00-KUYRUK.md:6-7` (kapı tanımı) · `OTONOM-PROMPT.txt:151-152` · `09-DURUM.md:5,9` · ⭐ **`OTONOM-PROMPT.txt:223` + PR #110 başlığındaki "MERGE ETME" → KVKK istisnası, GEÇERLİ.**

### 6.4 Yan bulgu — `00-BELGE-HARITASI.md:61` (Ç-0b) kendisi bayat
Çelişkiyi **doğru** teşhis etmiş ama hedefi `09-DURUM.md:447` diyor (**gerçek :450**, `:447` boş satır) ve *"6 yer"* diyor — bu tarama **14 yürürlükte-görünen yer** buldu.

---

## 7. KUYRUK HİJYENİ BULGULARI

> ⚠️ **ANLIK FOTOĞRAF `eabf387`.** Terminaldeki tur Durum sütununu güncelliyor; aşağıdakiler o anın tespitidir.

### 7.1 MÜKERRER — 4 kesin çift (+2 kısmi)
| Çift | Neden aynı | Hangisi kalmalı |
|---|---|---|
| **K-13 ↔ E-4** | "Bitti demek"leri birebir aynı teslimat (gerekçe + ikame kanıtı + arşiv + karantina PR). K-13'ün kendi Not'u: *"E-2/E-3/E-4 hayalet akışıyla aynı."* | **E-4** (arşiv yolunu somutlaştırıyor); K-13 onun **kapsam listesi** olarak Not'a insin. ⚠️ Kapıları da çelişiyor (§7.3) |
| **F-15 ↔ P-06** | İkisi de "bekleyen mentiye umut sinyali", aynı ekran, aynı örnek cümle | **P-06 kalsın ama DARALSIN** — F-15 (PR #228) bugün CANLIDA ve P-06'nın "Bitti demek"ini karşılıyor; artakalan tek şey **akran/kuyruk sayısı** (k-anonim agregat) |
| **F-17 ↔ P-05** | İkisi de "mentör reddi deneyimi"; KARAR-22 kartı zaten *"P-05 ve F-17 atlanır"* + *"KARAR-20 ile kümelenmeli"* diyor. F-17'nin varsayımı (*"ret akışı HİÇ yok"*) **çürüdü**: `meetingController.ts:563-585` `rejectMeeting` VAR | **P-05** (kanıtı doğru ve güncel); F-17 kapatılıp Not'a *"= P-05, varsayım çürüdü"*. KARAR-20 → KARAR-22'ye kümelenmeli |
| **K-10 ↔ F-21** | F-21'in kapsamında *"DISC kontrast"* var; F-21'in kendi Not'u *"K-10 ile kesişir"* diyor | **K-10 kalsın** (küçük, 🟢, tek başına çıkar); F-21 *"aria/role/klavye + WCAG"*a daralsın — yoksa iki şerit aynı CSS'e dokunur |

**Kısmi (ayrı kalsın, sınır Not'a):** U-15 ↔ V-01 (farklı izleyici: operatör ↔ kullanıcı) · U-16 ↔ V-01 (ikisi de BITTI, `emailService`).

### 7.2 BAYAT DURUM — 2 (ve **0 sahte YAPILDI** ✅)
| iş | kuyruk | kod gerçeği | kanıt | öneri |
|---|---|---|---|---|
| **F-10** | BEKLIYOR · *"menti-yönü havuz kartı FE tasarımı yok"* | **Kart TAM VAR** — grid + avatar + sektör + `%{mentor.matchScore}` + "Neden uyumlu"; kodda birebir yorum: `// Havuz KART görünümü (KARAR 2/7)`. **Denetimden 21 gün ÖNCE** eklenmiş | `menti/page.tsx:287,290,308-310,315-318`; `git log -S'Havuz KART görünümü'` → `981892b` **2026-08-29** | **BITTI (ZATEN YAPILMIŞ)**. ⚠️ Bir **YANLIŞ SORU TUZAĞI** vakası: negatif iddia dar aramayla yazılmış |
| **P-06** | BEKLIYOR · *"'yakında eşleşeceksin' YOK"* | Umut cümlesi **CANLIDA** (F-15/PR #228) | `menti/page.tsx:217-222` | **YARIM** — başlık *"Bekleyen menti sayısı (k-anonim agregat) yok"*a daralsın, yoksa P-06 asla kapanmaz |

⭐ **TERS YÖN: 0.** 52 `BITTI` satırının **19'u** (riskli olanlar seçilerek) canlı pointer `b5415bd`'ye karşı doğrulandı — **hepsi tuttu** (V-01·V-02·V-03·V-04·V-08·V-10·V-12·V-13·F-15·F-16·F-20·F-26·F-27·F-29·K-12·U-05·U-10·P-11/12/13). **Kuyrukta tek bir "sahte YAPILDI" yok; KURAL 10 disiplini tutmuş.**

**Bayat kanıt (durum doğru, `dosya:satır` yanlış):** `F-32` Not'u `lib/hooks` diyor — **o dizin YOK**; hook'lar `frontend/src/hooks/` ve bir `useQuery` **VAR** (`hooks/useQuery.ts:28`, *"Minimal SWR-benzeri"*). Durum (BEKLIYOR) **doğru** çünkü gerçekten önbelleksiz — ama kanıt ölü yola işaret ediyor. · `F-03` yolu `oauthService.ts:112-120` → dizin eksik (`services/oauth/`).

### 7.3 YANLIŞ KAPI — 5 kesin (1'i **tehlikeli yön**)
| iş | mevcut | olmalı | gerekçe |
|---|---|---|---|
| **K-13** | 🔴 KARAR-11 | **🟡** | ⚠️ *Gereksiz fren — tüm hayalet şeridini donduruyor.* Teslimat **karantina**, silme değil (`:77` *"SİLME YAPILMAZ"*). `CLAUDE.md` net: *"Karantina 🟡'dır, gerçek silme 🔴'dır."* İkizi **E-4 zaten 🟡**. KARAR-11 yalnız **E-5**'i kilitlemeli |
| **F-09** | `🔴 seed` | **🟡** | ⚠️ *Cevaplanacak KARAR YOK → sonsuz kilit.* 13 🔴'nın **tek**'i kart numarası taşımıyor. Emsali **P-99 🟡** (*"seed dosyası değişir, seed çalıştırılmaz"*). Kod tarafı doğru: `prisma/seed.ts:530` `SJT_QUESTIONS` → `grep -c "code: 'Q_"` = **3** (12 değil) |
| **F-31** | 🟢 | **🟡** | ⚠️ ***TEK TEHLİKELİ YÖN.*** "Ürün geri-bildirim akışı" için uygun depo yok (`SuspicionReport` şüphe, `FeedbackLog` görüşme NPS'i) → yeni model = **migration** = istisna (a). Bugünkü 🟢 ile bir tur **şemaya dokunup merge edebilir** |
| **F-07** | 🟡 | **🔴 KARAR-19** | `01-KARARLAR.md` İÇİNDEKİLER KARAR-19'u *"1 (F-07)"* diye sayıyor; F-07 Not'u da *"hukuki karar tarafı KARAR-19'da"* diyor. 🟡 kalırsa bir tur cevaplanmamış hukuki karara girer |
| **P-16** | 🟡 | **🟢** | 🟡 gerekçesi *"TEYİT GEREK (çok kurumlu veri)"* — **üç istisnanın hiçbiri değil**. `User.role` → `TenantMembership.role` sayımı; migration yok, guard yok, matching yok, geri dönülür. TEYİT GEREK **Not'ta** kalmalı, kapıyı değiştirmemeli |

**Savunulabilir sapma:** `F-04` 🟡 (CSP ne auth ne KVKK ne matching; 🟡'yı ayakta tutan *"belirsizse 🟡"* + K-14 ile aynı dosya). **Belirsiz:** `E-3` 🟢/🟡 — kuyruğun tek belirsiz kapısı; alt kalemleri hiçbir yerde satır almamış (*"BAĞLA~7"*, 7 kalemin ne olduğu yazılı değil) ve en az biri (`tags/suggest`) **V-13 olarak ayrıca yapılmış**.

### 7.4 ⭐ KARTSIZ GİZLİ 🔴 — 5 eksik kart
`00-KUYRUK.md:235` politikası *"Yeni 🔴 açılmadı … ürün kararı gerekenler 🟡 + 'KARAR aday'"* dedi. Sonuç: kapısı 🟡 görünen ama pratikte 🔴 olan, **üstelik PO'nun cevaplayacağı kart bile bulunmayan** işler:

| iş | Not'taki ibare | kart |
|---|---|---|
| **U-01** | *"ÜRÜN KARARI GEREKLİ (KARAR aday): kim/ne zaman COMPLETED işaretler"* | ❌ YOK |
| **U-12** | *"ÜRÜN/GÜVENLİK KARARI GEREKLİ"* (davet token modeli) | ❌ YOK |
| **V-15** | *"ÜRÜN KARARI GEREKLİ (§9.2)"* (oryantasyon kilidi) | ❌ YOK — ⚠️ ama `03-PO:52` *"kartlar açıldı"* diye **YANLIŞ beyan ediyor** |
| **U-19** | `mentorVisibilityEnabled` bağlan mı / terk mi (§4.5) | ❌ YOK — aynı yanlış beyan |
| **P-15** | *"ürün kararı (kart gerekebilir)"* | ❌ YOK |

Kart sayısı doğrulandı: `grep -c "^### KARAR-"` = **30** (KARAR-0…29, boşluk yok).

### 7.5 KİLİTLİ ZİNCİR — en çok iş açan kararlar (**hiçbirinin CEVAP'ı dolu değil**)
| # | karar | açtığı iş | işler |
|---|---|---:|---|
| 1 | **KARAR-11** — kullanılmayan/mükerrer kodla ne yapılsın | **3 (+1)** | K-13 · E-5 · E-4 · (kısmi E-3) |
| 2 | **KARAR-22 + KARAR-20** (tek küme) | **2 (+1)** | P-05 · F-17 · (akraba U-18). ⚠️ Kartın kendi önerisi: *"İkisi birlikte cevaplanabilir"* → **tek cevapla 2 satır** |
| 3 | **KARAR-10** — psikometri motoru bağlansın mı | **2** | F-11 · K-19 |
| 4 | **KARAR-3 + KARAR-4** | **1 iş, 2 cevap ŞART** | K-16 (+ ön koşul P-99). ⚠️ **Biri cevaplansa bile açılmaz** |
| 5 | **KARAR-6 + KARAR-7** | **1 iş, 2 cevap ŞART** | K-19 — ⚠️ `01-KARARLAR.md:17-19` kendi uyarısı: K-19'un kapı etiketi *"KARAR-8, KARAR-10"* yazıyor ama **içeriği KARAR-6+7'ye karşılık geliyor** (olası yazım hatası) |

⭐ **PO'ya tek cümle:** İlk cevaplanacak soru **KARAR-11**'dir — tek cevapla 3 satır + hayalet şeridinin tamamı (E-3) açılır ve kuyruğun **2026-09-10'dan beri donmuş** bölümü çözülür. İkincisi **KARAR-22** (KARAR-20 ile birlikte → 2 satır). Üçüncüsü aslında karar değil: **5 eksik kartın açılması** (§7.4).

### 7.6 PO SIZMASI — iki yönlü
**Kuyruk → PO (4 gerçek + 1 yanlış adres):** `F-02` (Message saklama süresi = **hukuki**, `gdprService.ts:351` *"HENÜZ KARARLAŞMADI"*, hiçbir yerde takip edilmiyordu) · `F-03` (OAuth rıza **metni**) · `F-13` (kısıtın **gerekçesi** — ajan uyduramaz) · `P-10` (SMTP olmadan "Bitti demek" **doğrulanamaz**; kardeş satırlarda uyarı var, **P-10'da yok**) · `K-14` **yanlış adres** (`01-KARARLAR` → `03-PO-ELLE-ISLER`).
**PO → kuyruk (2 gerçek + 2 bayat kapsam + 1 yanlış beyan):** `B#8` `ALLOWED_ORIGINS` trim (**kod hatası**, insan kuralına çevrilmiş — §3.1'e taşındı) · `docker build` teyidi (lokal/CI işi, Dokploy gerektirmez) · `B#6`/`B#7` bayat kapsam (V-08 ile zaten yapıldı) · `:50-53` yanlış kart beyanı (§7.4).

### 7.7 Terminal turunun yarım işi — DOKUNULMADI
`02-ILERLEME.md:7-11` (*"TUR DEVAM — TUR AD"*) kalan 🟢 listesi: `K-04/05/06/08/10/11 · F-01/10/13/14/19/21/27/28/31/32/33 · P-10 · V-09 · E-3`. Oysa `eabf387`'te **K-04 · K-11 · F-27 = BITTI** → ILERLEME geride. ⛔ **Daha ciddisi: K-06** kuyrukta `🔴 KARAR-29 / ATLANDI(karar)` ama ILERLEME onu **🟢 BEKLIYOR** sayıyor → tur K-06'yı 🟢 sanıp tutarsa **KARAR-29 atlanmış olur**. Tur kapanışında hizalanmalı; **K-06 🟢 listesinden çıkarılmalı.**

### 7.8 Sayılar
Mükerrer **4** (+2 kısmi) · Bayat durum **2** (1 kesin + 1 kısmi) · Sahte YAPILDI **0** ✅ · Bayat kanıt **2** · Yanlış kapı **5** (+1 sapma +1 belirsiz) · Kartsız gizli 🔴 **5** · PO sızması **4** (+1 yanlış adres) · Ters sızma **2** (+2 bayat kapsam +1 yanlış beyan) · Belge-içi çelişki **2** (ILERLEME↔KUYRUK K-06 · "🔴 12" ↔ gerçek 13).

---

## 8. ⭐ "DEVREDİLDİ" NOTLARI — üç kaynak belgenin başına

> ⛔ **ÖN KOŞUL (atlanırsa iş kaybı):** Bu notlar konmadan önce §3'teki hazır kuyruk satırları kuyruğa **eklenmiş olmalı**. `00-ONCELIK-SIRASI` bu adımı yapmıştı (→ AŞAMA F); `10-yol` ve `00-KARAR-TAKIP` için **bu tur yaptı** (§2) — eşleme tabloları elde.

### 8.1 `docs/kararlar/10-yol-haritasi.md` (başlığın hemen altına)
```markdown
**📸 DONDURULMUŞ (2026-09-21)** — bu belge artık güncellenmez.
> **Neden:** (1) Fiilen durdu — son commit 2026-09-09, **12 gündür 0 commit**; gövde künyesi (satır 9)
> hâlâ "Son güncelleme: 2026-08-22" diyordu. (2) **Otonom motor bu belgeyi HİÇ okumuyor** —
> `docs/otonom/OTONOM-PROMPT.txt:33-40` okuma listesinde adı geçmiyor.
> **Devir kanıtı:** Faz 1-8 → `00-KUYRUK.md` **AŞAMA F (F-01…F-33)**; kalan 39 açık kalem
> 2026-09-21 devir analiziyle çıkarıldı: `docs/raporlar/kesif/devir-analizi-2026-09-21.md` §2-3.
> **Takip artık nerede:** açık iş → `docs/otonom/00-KUYRUK.md` · çıkış önceliği → aynı dosyada
> `⛔ ÇIKIŞ BLOKERİ` satırları · karar/söz geçmişi → `00-KARAR-TAKIP.md` · biten v1 →
> `10-yol-tamamlananlar.md` · şu an ne oldu → `09-DURUM.md`.
> ⛔ **BELGE TAŞINMAZ, SATIR SİLİNMEZ.** Maddeler (madde 30, 73, 163…) kardeş belgelerde **numarayla**
> anılıyor; taşımak atıf ağını kırar — gerekçe `10-yol-tamamlananlar.md:10-13`. Bundan sonra buraya
> **yeni madde yazılmaz**; yeni iş doğrudan `00-KUYRUK.md`'ye açılır.
```

### 8.2 `docs/kararlar/00-KARAR-TAKIP.md` — ⛔ EMEKLİ EDİLMEZ, **ROL DARALIR**
Ölçüm: son 14 günde **45 commit** — depodaki 2. en aktif belge. Ölmedi; sorun motorun **hem buraya hem kuyruğa** yazması (`OTONOM-PROMPT.txt:133` ↔ `:266`) → aynı iş iki yerde, çift bayatlama.
```markdown
# 00 — KARAR & SÖZ GEÇMİŞİ (hangi karar ne zaman, neden, kim verdi)
> ⭐ **ROL DARALTMASI (2026-09-21) — bu belge artık İŞ TAKİBİ YAPMAZ.**
> | konu | artık nerede |
> |---|---|
> | Açık iş · yarım iş · durum (BEKLIYOR/BITTI) | ⛔ **`docs/otonom/00-KUYRUK.md`** — tek canonical |
> | PO'nun elle yapacağı işler | `docs/otonom/03-PO-ELLE-ISLER.md` |
> | Cevap bekleyen ürün/hukuk kararı | `docs/otonom/01-KARARLAR.md` |
> | **KARAR GEÇMİŞİ** — ne zaman, **NEDEN**, kim verdi, sonra değişti mi | ✅ **BU BELGE** |
> | **SÖZ GEÇMİŞİ** — S1…S38, tutuldu mu | ✅ **BU BELGE** |
> | **ÖLÜ KOD / TERK NİYETİ** (silme protokolü izi) | ✅ **BU BELGE** (iş hâline gelince kuyruğa satır) |
> **Yeni yazım kuralı:** (1) Buraya **durum güncellemesi için gelinmez** — ✅ kuyruğa yazılır, buraya
> yalnız o işi doğuran KARAR ve SÖZ. (2) Madde numaraları **SİLİNMEZ/TAŞINMAZ**; statüsü kuyruğa geçmiş
> maddenin durum hücresine `→ statü: 00-KUYRUK <satır>` **pointer'ı** yazılır.
> (3) `OTONOM-PROMPT.txt:266` tur-sonu adımı buna göre okunur.
> ⛔ **HİÇBİR SATIR SİLİNMEZ.** Daralma = **yeni yazımın** kapsamı; eski içerik yerinde kalır.
```

### 8.3 `docs/kararlar/09-DURUM.md` — dondurulmaz (motor okuyor), **iki düzeltme**
(1) `:450` bayat merge kuralı → §6.1 metni. (2) `:438-442` BEKLEYEN satırlarına **kart numarası + canonical yol** eklensin (G8-01/02 → `03-PO` A#1 · G8-03 → `03-PO` D#14 · G8-04 → D#15 · KARAR-8 → `01-KARARLAR`), çünkü numarasızlık bu turun promptunu bile yanılttı (§2.5).

---

## 9. TARANAMAYANLAR
| # | Taranamayan | Sebep |
|---|---|---|
| 1 | **Canlı DB içeriği** (DISC 32 / SJT 3 / sertifika 20 ↔ Neon) | Bulut VM'de Neon yok; `SELECT` bile PO onayı ister → §4 KARAR-?? |
| 2 | `G1-07 Tur B` consent migration canlıda mı | Migration dosyası VAR, `migrate status` "up to date" (2026-09-09) ama canlı sorgu yapılamadı → **TEYİT GEREK** |
| 3 | `G8-06` 12 yerel dal silinebilir mi | `git branch --merged` koşulmadı |
| 4 | `G1-16` rıza backfill gerekli mi | Canlı DB doluluk bilinmiyor |
| 5 | `K-10` dark-mode kontrast | Gerçek tarayıcı/kontrast ölçümü gerekir |
| 6 | `CLAUDE.md:162` bulut-merge kısıtı kasıtlı mı yama artığı mı | Belgeden anlaşılmıyor → **PO teyidi** (⚠️ bu oturum bulut oturumudur, davranışı doğrudan etkiler) |
| 7 | `U-08` PENDING kullanıcı `mentor-matches`'e erişiyor mu | Gerçek hesap gerekir; kuyruğun kendisi de "❓" diyor |
| 8 | 2026-08-29 öncesi belge değişim tarihleri | Depo geçmişi o tarihte başlıyor (226 commit, kök `87b7908`) → git tarihleri o tabana göre okunmalı |
| 9 | F/U serisinin kalan ~15 BEKLIYOR satırı | Bütçe. Rapor *"kuyrukta bayat durum yoktur"* demiyor; **denetlenen kesitte 2 bulundu** diyor |
| 10 | `madde 47` refresh-token/cookie yardımcı duplikasyonu | `authController` ↔ `selfServeController` karşılaştırması yapılmadı |

---

## 10. EMEKLİLİK — altı planlama belgesinin durumu

> ⚠️ **ÖLÇÜM SINIRI:** depo 226 commit, **en eski 2026-08-29** (`87b7908`, kök içe-aktarma). 2026-08-29 görünen bir tarih *"o gün güncellendi"* değil, **"en az 23 gündür dokunulmadı"** demektir.
> Birim: *"son 14 gün commit"* = `git log --since=2026-09-07 --oneline -- <dosya> | wc -l`.

| belge | son commit | damga | son 14 gün | yaşıyor mu | karar |
|---|---|---|---:|---|---|
| `10-yol-haritasi.md` (314) | 2026-09-09 | `🔄 YAŞAYAN` | 7 (hepsi 09-08/09) | ❌ 12 gündür 0 | **📸 DONDUR** (§8.1) |
| `00-KARAR-TAKIP.md` (833) | 2026-09-20 | `🔄 YAŞAYAN` | **45** | ✅ 2. en aktif | ⛔ **EMEKLİ EDİLMEZ — rol daralır** (§8.2) |
| `00-CIKIS-PLANI.md` (120) | 2026-08-29 (=kök) | `🔄 YAŞAYAN` | **0** | ❌ 23-27 gün | **📸 DONDUR** — ⛔ önce K0-K5 fikri kurtarılsın (§11) |
| `bilanco/kararlar/00-ONCELIK-SIRASI-2026-08-28.md` (133) | 2026-09-20 | ⚠️ **ÇELİŞKİLİ**: `:3` "DEVREDİLDİ" · `:13` "🔄 YAŞAYAN" | 1 (devrin kendisi) | ❌ | **📸 DONDUR** — devir zaten yapılmış (→ AŞAMA F), tek eksik damga + `:13`'ün üstünün çizilmesi |
| `00-KUYRUK.md` (260) | **2026-09-21 (bugün)** | ⚠️ **DAMGA YOK** | **20** | ✅ tek aktif kaynak | **🔄 YAŞAYAN damgası EKLE** (KURAL 3 ihlali) |
| `00-KART-INDEKSI.md` (257) | 2026-09-20 | DAMGA YOK | **1** (=oluşturma) | ⚠️ hiç güncellenmedi | **📸 DONDUR (snapshot)** — belge zaten `:6`'da *"snapshot; canonical DEĞİL"* diyor; 184 satırlık elle senkron maliyeti faydayı aşıyor |

**`00-KUYRUK.md`'ye eklenecek damga (satır 2 altına):**
```markdown
**🔄 YAŞAYAN** (canonical: **TEK aktif iş kaynağı** — otonom motorun okuduğu tek iş listesi)
> ⭐ **Bu belge projenin tek iş kuyruğudur (2026-09-21).** `10-yol-haritasi.md` ve `00-CIKIS-PLANI.md`
> 📸 donduruldu; `00-ONCELIK-SIRASI-2026-08-28.md`'nin açık kalemleri AŞAMA F olarak buraya devredildi.
> **Yeni iş başka hiçbir belgeye açılmaz.** Kod-dışı işler istisnadır: `docs/otonom/03-PO-ELLE-ISLER.md`.
```
**`00-CIKIS-PLANI.md` dondurma notunun kilit cümlesi:** *"⭐ BU BELGENİN FİKRİ ÖLMEDİ — TAŞINDI. K0→`⛔ ÇIKIŞ BLOKERİ` · K1→`⛔ ÇIKIŞ BLOKERİ` · K2/K3→işaretsiz · K4→`03-PO-ELLE-ISLER.md` · K5→`01-KARARLAR.md`. KATI TEST (`:13` *"varsayılan = ERTELE; bloker olduğunu KANITLA"*) yerinde kalır ve yeni işler için ölçüt olarak okunur."*

---

## 11. ⭐ ÇIKIŞ BLOKERLERİ — "canlıya çıkabilir miyiz?" tek listesi

**Test** (`00-CIKIS-PLANI.md:13` katı testi): **T1** yasa/sızıntı/geri-alınamaz kayıp · **T2** ana akış kırılır (başvuru→onay→davet→giriş→eşleşme→randevu) · **T3** sessiz yanlış (kimse fark etmez). Biri net EVET ise `⛔ ÇIKIŞ BLOKERİ`.

**24 iş** (110 kuyruk satırı + 13 PO işi evreninden). **PO 10 · ajan 14** (4'ü ayrıca PO kararı bekliyor). Efor: **S 12 · M 11 · L 1**.

| kim | iş | neden (test) | efor |
|---|---|---|:---:|
| **PO** | A1 avatar kalıcı disk | T1 — her deploy'da fotoğraflar SİLİNİR, `avatarUrl` DB'de kalır | S |
| **PO** | A2 DB yedeği + restore provası (= madde 120/G1-28) | T1 — 6 saatten eski kayba **sıfır koruma** | M |
| **PO** | A3 `NODE_ENV=production` teyidi | T1+T3 — değilse 3 guard + 4 cookie `secure` **sessizce** kapanır | S |
| **PO** | B4 SMTP doldur | T2+T3 — biri boşsa **tüm mail sessizce atılıyor**; davet + şifre sıfırlama ölür | S |
| **PO** | B5 `TENANT_NOTIFICATIONS_ENABLED='true'` | T2+T3 — panelde "başarı" görünür, kuruma hiçbir şey gitmez = **kurum alma akışının ta kendisi** | S |
| **PO** | B6 `BACKEND_URL` teyidi | T1 — avatar URL'leri + **KVKK unsubscribe linki** yanlış domaine gider | S |
| **PO** | B7 `NEXT_PUBLIC_API_URL` build teyidi | T2 — build-time gömülür, runtime'da düzeltilemez | S |
| **PO** | B8 `ALLOWED_ORIGINS` değeri | T2 — yanlışsa CORS fail-closed (kod tarafı §3.1'e taşındı) | S |
| **PO** | B9 `CRON_ENABLED` teyidi | T1+T3 — kapalıysa KVKK 90 gün/3 yıl imhası durur | S |
| **PO** | C11 seed tabloları dolu mu | T2 — boşsa DISC `isComplete` asla `true` olmaz → menti akışı durur | S |
| ajan | **U-17** temiz DB'de DISC havuzu boş | T2 — yeni ortam kurulurken patlar; tek yol yıkıcı `seed.ts` | **L** |
| ajan | **U-06** davetli OAuth'la gelirse APPROVED olmuyor | T2+T3 — davet ettiğin kişi sessizce PENDING'de kalır | M |
| ajan | **U-08** onay kapısı yalnız `/api/users`'ta | T1 — onaysız kullanıcı eşleşme verisi alabiliyor (❓ TEYİT) | M |
| ajan+PO | **U-12** davet token'ı e-postaya bağlı değil, iptal edilemez, 30 gün | T1 — link sızarsa yabancı kalıcı üye olur | M |
| ajan | **U-15** şifre sıfırlama tek kanala bağlı, hata yansımıyor | T2+T3 — şifresini unutan geri giremez, kimse görmez | M |
| ajan | **U-13** rol değiştirme ucu yok, ADMIN düşürme körlemesine `MENTOR` yazıyor | T1+T3 — rol **sessizce bozulur**, düzeltecek uç da yok | M |
| ajan+PO | **U-01** `SCHEDULED→COMPLETED` geçişi yok | T2 — görüşme hiç "tamamlandı" olmuyor → check-in + değerlendirme hiç açılmıyor | M |
| ajan | **V-06** fallback JWT secret koda gömülü | T1 — depo PUBLIC; A3 tutmazsa token sahtelenebilir | **S** |
| ajan | **V-05** k-anonimlik KPI/analytics/health-metrics'te YOK | T1 — küçük kurumda `/admin/kpi` tek kişinin DISC'ini ifşa ediyor | **S** |
| ajan | **K-14** sunucu sertleştirme kod tarafı | T1 — global limit anahtarı doğrulanmamış `X-Tenant-Id`, `trust proxy` yok | M |
| ajan | **F-04** `logoUrl` XSS guard | T1 — kurum logosu yeni kurumun yüklediği İLK şey; CSP kapalı | **S** |
| ajan | **P-10** mentör bildirimi ulaşmıyor | T2+T3 — mentör talebi ancak paneli açınca öğrenir → eşleşme döngüsü durur | M |
| ajan | **K-05** menti müsait olmayan saati seçebiliyor, 409 anlaşılmaz | T2 — randevu halkası kırık | **S** |
| ajan+PO | **K-18** öğrenme yolculuğu seed | T2 **KOŞULLU** — yalnız C11 "boş" derse bloker | M |

**Kasten bloker SAYILMAYANLAR (disiplin kanıtı):** K-08 · K-10 · K-13 · K-15/16/17/19 · P-99 · E-3/4/5 · F-01…F-33 (F-04 hariç) · P-04/05/06/08/15/16 · U-18/19 · V-09/15 · PO-C10/C12/C13. Gerekçe: hiçbiri T1/T2/T3'ten net EVET almıyor.

⭐ **TEK CÜMLELİK CEVAP: Hayır, bugün çıkılamaz — ama yükün ağırlığı koda değil PO'ya düşüyor.** 10 PO işinin **8'i "S"** (env/panel ayarı + teyit), bir oturumda kapatılabilir. Ajan tarafında **S eforlu 4 iş** (V-06 · V-05 · F-04 · K-05) hemen arkasından gelir. Geriye **10 M + 1 L** kalır.

---

## 12. `09-DURUM.md` ARŞİVLEME PLANI

**Mevcut:** 462 satır / 124.190 bayt. Kendi kuralı `:455-457` *"yalnızca ŞU AN'ı tutar, detaylı geçmiş arşive taşınır"*. Yapı: `5-241` katman bölgesi (**67 blok**, ters-kronolojik) · `242-462` kalıcı bölümler.
**Önceki arşivler** → desen `09-DURUM-<içerik>-<YYYY-MM-DD>.md` (tarih = **arşivleme günü**):
`09-DURUM-ve-yolharitasi-arsiv-2026-08-10.md` · `09-DURUM-gecmis-katmanlar-2026-08-19.md` · `09-DURUM-tamamlanan-isler-arsiv-2026-08-19.md`.
### ⭐ HEDEF: `docs/arsiv/09-DURUM-gecmis-katmanlar-2026-09-21.md`

| | aralık | satır |
|---|---|---:|
| KALIR (üst) | 1-17 | **17** |
| **TAŞINIR** | **18-236** (64 katman bloğu, 2026-08-19 → 2026-09-09) | **219** |
| KALIR (alt) | 237-462 | **226** |
| | **KALAN** | **243** |
| | **DENETİM: 243 + 219** | **= 462** ✅ |

**Orkestratör teyidi (komut çıktısıyla):** `wc -l` → **462** · `awk 'NR>=18&&NR<=236' | wc -l` → **219** · `awk 'NR<=17||NR>=237' | wc -l` → **243**. ✅ Aritmetik tutuyor.

⚠️ **`11-16` KALIR — istisna.** Tarihi eski (2026-09-08) ama içeriği **yürürlükteki operasyonel emir**: *"her migration turunda etkilenen tablo için ÖNCE yedek tablo alınır"*. Katman değil, **kalıcı kural**; arşive giderse canlı DB koruması kaybolur.
**Pointer eklenirse** dosya 243 → 244/245 olur; bu **yeni yazılan satırdır, kayıp değildir**:
```markdown
> **2026-08-19 → 2026-09-09 arası tarih/SHA katmanları (64 blok, 219 satır — bu belgeden taşındı):**
> `docs/arsiv/09-DURUM-gecmis-katmanlar-2026-09-21.md`.
```
⭐ **Yan kazanç:** `09-DURUM`'un **38 uzun satırının tamamı** 18-236 aralığında → bu tek adım §14'teki 72 uzun satırı **34'e düşürür**, hiçbir metin silinmeden.

---

## 13. İNDEKS ADLANDIRMA

`find docs -iname "00-IND*"` → **4 dosya** (orkestratör teyitli): `kararlar/00-INDEX.md` · `raporlar/panel/00-INDEX.md` · `raporlar/persona/00-INDEX.md` · ⚠️ `raporlar/icerik/00-INDEKS.md`.
**Risk gerçek, teorik değil:** KURAL 2-B (`belge-duzeni-rehberi.md:45`) *"Konu klasöründe `00-INDEX.md` yoksa **oluşturulur**"* diyor ve `:41-42` konu eksenini **`panel/ · persona/ · icerik/`** diye sayıyor → kuralı harfiyen uygulayan ajan `icerik/`'e **ikinci indeks açar**.
**Atıf sayımı:** `00-INDEKS` → **11 satır / 4 dosya**; markdown **link** biçiminde **0**, kod/script'te **0**. Bunların **6'sı tarihsel** (oturum günlüğü 4 + `09-DURUM` 2) → değiştirilmez, yalnız damgalanır. **Gerçekten güncellenecek canlı atıf: 5** (`00-BELGE-HARITASI.md:42,105,200,421` · `00-KARAR-TAKIP.md:264`).

| | (a) Yeniden adlandır | (b) KURAL 2-B'yi genişlet |
|---|---|---|
| ➕ | Tek desen; ikinci-indeks riski **tamamen** kapanır | 0 atıf kırılır, 1 satır düzenlenir |
| ➖ | 11 satırlık dokunuş (5 canlı + 6 tarihsel damga) | **İki ad kalıcılaşır**; her ajan iki deseni birden sormak zorunda |

⭐ **ÖNERİ: (a) yeniden adlandır.** Risk 11 satırlık, tamamı metin-içi, link'siz, kod-atıfsız; buna karşılık (b) tutarsızlığı **kalıcı kurala** dönüştürür.
**Ek gerçek:** 20 klasörün **16'sında indeks YOK** — asıl boşluk `kesif/` (20 belge) · `bilanco/kararlar/` (17) · `bilanco/bolumler/` (16) · `konu/` (15). Adlandırma tutarsızlığıyla birlikte ele alınmalı.
**KURAL 2-B'ye eklenecek hazır cümle:**
```markdown
- ⛔ **İNDEKS ADI TEKTİR: `00-INDEX.md`** *(netleştirme 2026-09-21)*. Türkçe `00-INDEKS.md` kullanılmaz.
  **Yeni indeks açmadan önce** `ls <klasör>/00-IND*` çalıştır: adı ne olursa olsun bir indeks varsa
  **satır eklenir, yeni dosya AÇILMAZ.** (Gerekçe: "yoksa oluşturulur" ifadesi, Türkçe adlı indeksi
  göremeyip aynı klasörde ikinci indeks açma riski taşıyordu.)
```

---

## 14. ⭐ SATIR İÇİ GEÇMİŞ ŞİŞMESİ

**Ölçüm (orkestratör teyitli):** `docs/` altında 1.000 karakteri aşan **72 satır**; toplam **133.353 karakter**; 2.000+ **19**, 3.000+ **5**. `docs/` toplamı 33.847 satır → uzun satırlar **%0,21**'i ama ~130 KiB metin taşıyor.

| dosya | 1.000+ satır |
|---|---:|
| `09-DURUM.md` | **38** |
| `00-KARAR-TAKIP.md` | **30** |
| `00-KUYRUK.md` | 2 (`:63`, `:98`) |
| `10-yol-haritasi.md` | 1 (`:236`) |
| `devir/gunluk/oturum-2026-08.md` | 1 (`:710`) |

⭐ **%94'ü iki dosyada (68/72).** İki dosya **iki farklı çözüm** ister:
- `09-DURUM.md`'de uzun satır = **%100 tarihsel** → **§12 arşivi** çözer (38 satırın tamamı 18-236'da).
- `00-KARAR-TAKIP.md`'de uzun satır = **1 geçerli cümle + 3-6 katmanlık üstü-çizili zincir** → belge sonundaki `## GEÇMİŞ` bölümü çözer.

**En uzun 5 (doğrulandı):** `00-KARAR-TAKIP.md:554` **6.460** (madde 101; geçerli bilgi ~200 karakter, gerisi 4 kuşak düzeltme) · `:281` **5.646** (madde 30) · `:569` **3.662** (T5) · `:3` **3.376** (6 ardışık üstü-çizili tur kaydı — klasik matruşka) · `:311` **3.264** (madde 162, iki iptal edilmiş tanım).

### ⭐ YENİ KURAL — `CLAUDE.md`'ye hazır metin
**Yer:** mevcut *"Belge Düzeltme Deseni"* bölümünün **sonuna** (yeni başlık açılmaz — iki kural yan yana okunsun).
```markdown
### ⭐ KALICI KURAL — tarihsel iz satırın İÇİNDE tutulmaz (2026-09-21)
**İlke:** Tarihsel iz **korunur** ama **satırın içinde birikmez.** Satırda yalnız **güncel durum** + bir
`geçmiş: bkz. <yer>` atfı durur. Üstü çizili eski zincir, belgenin sonundaki **`## GEÇMİŞ`** bölümüne ya
da arşive taşınır. ⛔ **Hiçbir şey silinmez — yer değiştirir.**
**Neden:** "eskiyi silme, üstünü çiz" kuralı satırın İÇİNDE uygulandığı için satır her güncellemede
büyüyor, hiç küçülmüyor. Ölçüm (2026-09-21): `docs/` altında 1.000 karakteri aşan **72 satır**, toplam
**133.353 karakter**; en uzunu `00-KARAR-TAKIP.md:554` = **6.460 karakter** (4 kuşak düzeltme, geçerli
bilgi ~200 karakter). Tablo hücresinde bu, okunamaz demektir.
**Uygulama:** (1) **1.000 karakter** tavandır; düzeltme eklerken aşılıyorsa **önce** taşıma yapılır.
(2) Satırda yalnız son geçerli hâl kalır, sonuna `· geçmiş: bkz. GEÇMİŞ §<anahtar>` eklenir.
(3) Üstü-çizili zincir **tek karakter değiştirilmeden** `## GEÇMİŞ` altına `### §<anahtar>` başlığıyla
yapıştırılır; tarihleri ve `~~biçimi~~` korunur. (4) `<anahtar>` = kalıcı numara (md.101, S35, G1-23…) —
atıf ağının omurgası, asla değişmez (`10-yol-tamamlananlar.md:10-13`). (5) `09-DURUM.md` gibi
ters-kronolojik belgelerde taşıma yeri `docs/arsiv/09-DURUM-gecmis-katmanlar-<tarih>.md`.
(6) **Taşıma denetimi zorunlu:** `kalan + taşınan = önceki toplam` kapanış raporunda gösterilir;
tutmuyorsa **taşıma geri alınır.**
**"Belge Düzeltme Deseni" ile ÇELİŞMEZ — onu tamamlar:** Düzeltme Deseni **"ne yazılır"**ı söyler
(eski cümle silinmez, `~~[ESKİ]~~` + `⚠️ GÜNCELLEME`); bu kural **"nerede durur"**u söyler. İz silinmez,
biçimi bozulmaz, yalnız satırdan bölüme iner ve satırda ona giden bir atıf kalır. `belge-duzeni-rehberi`
KURAL 6 (silme yok) ve KURAL 7 (statü tek yerde) ile de çelişmez.
```

---

## KAPANIŞ

Bu tur **kod/DB/şema/seed değiştirmedi**, hiçbir şey silmedi; `docs/otonom/`, `docs/kararlar/`, `docs/devir/`, `CLAUDE.md`, `.env.example` **ellenmedi**; kuyruğa iş eklenmedi, karar kartı açılmadı, **numara verilmedi**. Tek değişen dosya budur.

**Üç cümlede:** (1) Üç kaynak belgenin devri **yapılabilir durumda** — eşleme tabloları çıkarıldı, 39 + ~30 + 3 sahipsiz kalem `Y-??` satırı olarak hazır; `10-yol` ve `00-CIKIS-PLANI` dondurulabilir, `00-KARAR-TAKIP` **emekli edilmez, rolü daralır**. (2) Ama devirden önce iki şey düzeltilmeli: **OCEAN motorunun 100× ölçek hatası** (numarasız, Faz 5'in tamamını boşa çıkarıyor) ve **14 yerde yürürlükte görünen bayat merge kuralı** (biri motorun her tur okuduğu `09-DURUM.md:450`). (3) Turun en pahalı dersi metodolojik: görevin **iki öncülü de yanlıştı** (G8-03/04 "hiçbir yerde yok" → dört yerde kayıtlı; `CLAUDE.md` "üstü çizildi ✓" → çizilmemiş) — ikisi de KURAL 15'in uyardığı *"özet belgeye bakıp kartı görmeme"* hatası, ve bu kez hatayı **görevin kendisi** yaptı.
