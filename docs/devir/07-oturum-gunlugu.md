# 07 — OTURUM GÜNLÜĞÜ (yaşayan devir kaydı)

**🔄 YAŞAYAN** — oturum kapanış kayıtları burada birikir. **Her yeni oturum buraya YENİ BÖLÜM olarak eklenir; ayrı dosya AÇILMAZ.**

> **Amaç:** Oturum-oturum "ne oldu, şu an neredeyiz, ne bekliyor" tarihsel kaydı — git+docs ile DOĞRULANMIŞ.
> Yeni sohbet: önce `01-felsefe` + **en alttaki en güncel oturum bölümü** + `docs/kararlar/09-DURUM.md` + `00-KARAR-TAKIP.md` oku, sonra git'ten doğrula.
>
> **Altın kural:** Bu belge tarihsel kayıttır; çelişki görürsen **09-DURUM + 00-KARAR-TAKIP + git gerçeği** kazanır.
>
> **⚠️ Not (2026-08-20):** Bu belge eski `07-oturum-2026-08-14.md` + `08-oturum-2026-08-15.md`'nin birleşimidir (içerik kaybı yok, tarih başlıklı bölümler halinde). Eski `08` dosyası `docs/arsiv/08-oturum-2026-08-15.md`'ye taşındı (silinmedi). Bundan sonra yeni oturumlar **buraya eklenir**.

---
---

# 📅 OTURUM 2026-08-14

**📸 O oturumun kapanış fotoğrafı** — aşağıdaki SHA/PR değerleri o güne aittir; güncel için git + 09-DURUM.

## 🔎 Git-doğrulanmış durum (2026-08-14)
- **Çatı main HEAD:** `0aaeac7` (Merge PR #64 — belge düzeni rehberi + CLAUDE.md bağlama).
- **Backend main HEAD:** `afc2769` (Merge PR #36); bu oturumda backend'e DOKUNULMADI → pointer `afc2769` senkron.
- **Açık PR:** Çatı **#65** (belge temizliği FAZ 1+2, salt-docs, CI yeşil, merge PO'da). Backend: sıfır. Çatı CI main: SUCCESS.

## A) Yapılanlar (2026-08-13→14, kanıtlı)
- **Masa temizlendi — #58–#64 MERGED, canlıda:**
  - **#62 admin UI:** B7 yönetici atama UI · B9 CORE/DEEPENING görünen etiket Türkçeleştirme (enum-safe) · B1 şifre göster/gizle (`PasswordField`). Salt-frontend. (B4 DISC ikincil gösterim ÇIKARILDI — backend PII kararı gerekir.)
  - **#63** tasarım kararları arşivi · **#59** belge-aksiyon denetimi · **#60** yol haritası F bölümü · **#61** CLAUDE.md belge-senkron kuralı · **#58** devir belgeleri (`01–06`) · **#64** belge düzeni rehberi (6 kural) + CLAUDE.md bağlama.
- **IDOR çelişkisi ÇÖZÜLDÜ (kod keşfi):** `/mentors/:mentorId/candidates` ve `/requests/:id` tenant izolasyonu + sahiplik kontrolü ile KORUMALI (düzeltme `161ae00`; `matchingController.ts:45-52`, `requestController.ts:116-121`; null-auth → 401). "2 IDOR düzeltilmedi" iddiası geçersiz.
- **Belge temizliği — PR #65 (o an açık):** 44 belge 6 düzen kuralına göre tarandı (harita: `belge-temizlik-haritasi-2026-08-14.md`). FAZ 1: 28 belgeye tür etiketi (🔄/📸) + INDEX. FAZ 2: 7 bayat bilgi kanıtla işaretlendi (IDOR ✅; AdminAuditLog→SystemLog; hayalet-mod PR #31; Next.js 15.5.20; timezone `6a30f21`). Salt-docs.

## B) Kararlar (canonical'a işaret — kopyalanmadı)
- **STK admin tasarım kararları:** `docs/kararlar/konu/tasarim-kararlari-admin-2026-08-11.md` (10+ karar). Tek kaynak burasıdır.
- **Belge düzeni kuralları:** `docs/kararlar/konu/belge-duzeni-rehberi.md` (6 kural, canonical).

## C) O oturumdaki bekleyenler (sonradan çoğu kapandı — güncel için 00-KARAR-TAKIP)
1. PR #65 merge (belge temizliği). 2. 6 arşiv teyidi (`hayalet-backend`, `kapasite-analizi`, `katilim-modeli`, `mentor-karti-rakip-analizi`, `tema-durum`, `devir/`). 3. Karar-statü taraması (sonradan `00-karar-statu-haritasi-2026-08-14` + `00-DURUM-PANOSU` ile yapıldı). 4. Durum panosu. 5. Yol haritası v1/v2 önceliklendirme. 6. İnşa kuyruğu (B6 kalibrasyon · B8b cevap-tipi · havuz kartı · sektör/etiket havuzu · KVKK). 7. PO manuel: foto volume/Dokploy (canlı öncesi ŞART) · chat canlı test · repoları private.

---
---

# 📅 OTURUM 2026-08-15

**📸 O oturumun kapanış fotoğrafı** — SHA/PR o güne aittir.

## 🔎 Git-doğrulanmış durum (2026-08-15)
- **Çatı main HEAD:** `cafd68c` (Merge PR #72). **Backend main HEAD / pointer:** `379658a` (senkron). **Açık PR:** çatı 0 · backend 0. İki repo main CI: SUCCESS.

## A) Yapılanlar (2026-08-15, git+PR kanıtlı)
- **✅ KARAR 5 — DISC güvenlik açığı (backend #37 + çatı #71 MERGED, canlıda):** Menti, mentörün DISC tipini görmüyor. Merkezi `discVisibility.ts` (`canViewerSeeDiscType`) → `listUsers`+`getUser` menti→mentör `discType`/`discResultCard`'ı maskeler; FE menti kartı DISC göstermez; regresyon testli (`disc-visibility.test.ts`). **v1 #1 canlı-öncesi ŞART kapandı.**
- **✅ KVKK v1 (backend #38 + çatı #73 MERGED, canlıda):** K2 OAuth `kvkkConsentAt` yakalanır · K4 18+ doğrulama (ayrı kutu kaldırıldı, KVKK onayına birleşti) · K5 sunucu konumu beyanı.
- **✅ Üç havuz kartı + iki yönde uyum skoru (backend #39 + çatı #74 MERGED, canlıda):** Menti→mentör skoru mevcut motorun ters kullanımıyla (güvenli yol). Menti tarafında skor VAR / DISC gerekçesi GİZLİ (KARAR 5 ile tutarlı). Follow-up: mentör→menti aday kartı + yönetici havuz kartları.
- **✅ Belge/masa temizliği (#65–#70, #72 MERGED):** açık PR 0'a indi.
- **Merge zinciri:** #37+#71 → #38+#73 → #39+#74 → #72 (docs). Hepsi `--merge`, pointer senkron, iki main CI yeşil.

## B) O oturumun v1 durum tablosu
| Küme | Toplam | ✅ canlıda | ⏳ kaldı |
|---|---|---|---|
| v1 | 13 | 4 (KARAR 5, K2, K4, K5) | 9 |
| v2 | 15 | 0 | 15 |
> ⚠️ "34 iş" çerçevesi düzeltmesi: kanıtlı sayı **28 kodlanabilir iş** (v1 13 + v2 15). "34" eski/yuvarlak.

## C) O oturumda kalan 9 v1 iş (boy) — çoğu sonradan kapandı
#5 ThemeToggle (S) · #6 onay maili (S–M) · #7 havuz kart follow-up (M–L) · #8 menü 4-grup (S–M) · #9 kalibrasyon (M) · #10 durum rozeti (S) · #11 sertifika rozeti (S) · #12 DISC "DI" (S) · #13 cevap-tipi (M–L, ❓).
> ⚠️ O gün: #8/#10/#11 kart turunda yapılmış olabilir ama yol haritasında ⏳ görünüyordu → koda güven, belgeye değil. (Sonradan #12 DISC harf + rozetler canlıda doğrulandı.)

---
---

# 📅 OTURUM 2026-08-20 (strateji-denetimi + karar senkronu)

**🔎 Git-doğrulanmış durum (yazım anı):** Çatı main HEAD **`888ceb8`** (Merge PR #107) · backend main HEAD / submodule pointer **`ba92dfa`** (bu oturumda backend'e DOKUNULMADI → senkron) · **açık PR 0** (bu devir PR'ı hariç). İki main CI yeşil.

## A) Canlıya çıkanlar (bu oturum + yakın arkasında, PR no'larıyla)
- **✅ #7 Aşama 1 — değerlendirme/metrik ölü uçları bağlandı (backend #48 + çatı #100, MERGED):** kalıcı kalite puanı yazımı (`TenantMembership.qualityMultiplier`) + yönetici "Kalite Puanı" kolonu · risk sinyali (`pairSignal`) + eşleşmeler "Risk" rozeti · periyodik checkpoint cron (LOG-ONLY). Migration/şema SIFIR.
- **✅ #34 — öğrenme yolculuğu tamamlanma görünürlüğü (backend #49 + çatı #102, MERGED):** `adminListUsers` `learningJourneyCompletedAt` + havuz kolonu.
- **✅ #7A — mentör→menti aday kartı gerekçesi FE render (çatı #102, MERGED):** `compatibilityReason` kart gerekçesi (DISC harfi hariç).
- **✅ #9-gösterim — algoritma ağırlık gösterimi (backend #49 + çatı #102, MERGED):** "Mevcut Ağırlıklar" kartı %60/%40 + salt-okuma endpoint. **AYARLAMA YOK** (→ 9a migration turu).
- **✅ #37 — kurum "düzeltme iste" akışı (backend #50 + çatı #104, MERGED):** 🛑 **MIGRATION CANLIDA** (`CORRECTION_REQUESTED` enum + `Tenant.correctionNote`, canlı DB'de teyitli) + platform admin "Düzeltme İste" + kurum resubmit. **Mail altyapısı hazır ama GÖNDERİM KAPALI** (`TENANT_NOTIFICATIONS_ENABLED=false` → 37m).

## B) Kurulan sistem (kalıcı disiplin)
- **`00-KARAR-TAKIP.md`** oluşturuldu: "arkada ne kaldı" tek-canonical (açık iş + yarım + ölü kod + uygulanmamış karar, kanıtlı).
- **`CLAUDE.md`'ye iki kural eklendi (Karar-Takip Disiplini):** (1) her oturum **başında** 00-KARAR-TAKIP oku + PO'ya açık maddeleri hatırlat; (2) her BYPASS turu **sonunda** güncelle (yalnız kod gerçeğiyle "yapıldı").
- **Merge sürtünmesi kuralları:** pointer bump dansı (backend PR merge sonrası çatı pointer'ı **backend main HEAD**'e bump — `git submodule update --remote backend`) + docs çakışması (09-DURUM/10-yol paylaşılan → yazım SIRALI, tarihli alt-bölüme append).

## C) Yapılan keşifler + raporları
- `tam-envanter-gercek-durum-2026-08-19.md` — genel envanter.
- `belge-mimarisi-ve-merge-cozumu-onerileri-2026-08-19.md` — belge mimarisi + merge çözümü.
- **`strateji-gercek-denetimi-2026-08-20.md` (PR #106, MERGED):** 6 strateji/persona belgesi ↔ kod, **85 madde, %66 tam var.** Ana bulgu: admin tasarım-kartları baştan sona uygulanmış; kopukluk 3 eksende — mail/bildirim (37m), menti retention inceliği (bekleme/ret/kutlama), yönetici kanıt katmanı (export/oran/trend). Yeni açık iş: **Y1–Y7** (bkz. `00-KARAR-TAKIP.md` B.4).
- **Karar senkronu (PR #107, MERGED):** PO kararları `00-KARAR-TAKIP.md`'ye işlendi (9a/9b/K6/K3/sektör-etiket/2a/#7/#13/#31/37m + #38 yeni DISC kurgusu).

## D) Cevaplanmamış sorular (PO cevaplamalı — 00-KARAR-TAKIP D.3'te tam liste)
- Kurum düzeltme yapınca **otomatik mi** incelemeye dönsün? (şu an otomatik)
- Kurum kaç kez düzeltme yapabilir — **sınır var mı?** (şu an sınırsız)
- Düzeltme **notu geçmişi** tutulsun mu? (şu an yalnız son not)

---

# 📅 OTURUM 2026-08-23 (belge reorg + tam tarama + niyet envanteri)

**MOD:** 🟢 BYPASS (salt-docs; kod OKUNDU, değiştirilmedi). **Hiçbir PR merge edilmedi** (merge PO'da).

**Merge edilenler (2026-08-23, PO onayıyla):** #106 (strateji↔gerçek denetimi) · #107 (Y1-Y7 + PO kararları) · #108 (oturum günlüğü birleştir + devir) · #109 (kapsamlı denetim + yol haritası 38-66) · #111 (belge hijyen, taşımasız).

**🛑 AÇIK & MERGE-KİLİTLİ — #110 (analytics/GA4):** **MERGE ETME.** Çerez-izni bandı (madde 67) YOK → merge edilirse autodeploy ile **rıza-öncesi izleme = KVKK ihlali (canlıda)**. Yeni oturum bunu bilmezse yanlışlıkla merge edebilir → **#110, madde 67 (Consent Mode v2) canlıya girmeden ASLA merge edilmez.**

**Bu oturumda yapılan (3 alt-tur, hepsi #112'ye):**
- **Belge düzeni reorg:** `kararlar/` + `raporlar/` alt-klasörlere ayrıldı (git mv); 38 tam-yol referansı + 00-INDEX yeniden yazıldı; `belge-duzeni-rehberi` KURAL 2 alt-klasör + **KURAL 7 (taşıyıcı belge iş bölümü)** eklendi; kırık-link 0. **Canonical taşıyıcı 5 ad taşınmadı.**
- **Tam-belge taraması (7 ajan, 42 belge):** → `00-KARAR-TAKIP` **Bölüm F**, 13 kayıp madde → yol haritası **madde 68-78** (`v1-H`). **3'ü 🔴 GÜVENLİK canlı-öncesi:** G1 `updateUser` PII/password sızıntısı (madde 38) · G2 `hardDeleteUser` FK→KVKK silme çalışmıyor (madde 39) · G3 `SuspicionReport` reporter PII maskesiz (madde 68). ⚠️ **Repolar PUBLIC → dışarıdan okunabilir.**
- **Niyet envanteri (5 ajan):** → `00-KARAR-TAKIP` **C.2** + rapor `yarim-is-niyet-envanteri-2026-08-23.md`. "~14 FE'siz özellik" iddiası → **kod-teyidiyle 9 doğrulandı** (KVKK üçlüsü, mentor opt-in, kulüp, feedback-logs, tenant şikayet, sosyal profil…).
- **Numaralandırma:** **#38 çakışması çözüldü** (madde 38=güvenlik canonical; DISC işi → numarasız "DISC-DERİNLEŞME kurgusu"). **madde 67 (çerez izni) ZATEN VARDI** — eklenmedi.
- **Kırmızı kural düzeltmesi:** "güvenli seed" listesi silinen `seed-questions.ts`'i sayıyordu → gerçek güvenli liste (`seed-certification` + `seed-learning-journey` + `seed-test-tenant.mjs`; tehlikeli=`seed.ts`). CLAUDE.md + 4 belge tarihli notla düzeltildi.
- **Etiket-çelişki (AJAN-E):** `durum-panosu-2026-08-14` 🔄 ama 11 gün donmuş → 📸 adayı (Bölüm E). Gerçek statü çelişkisi: **0** (taşıyıcılar senkron).

**Altyapı uyarısı:** Bir önceki tur disk %98'e dayandı (`sed` geçici-dosyası patladı); repo OneDrive altında (`.git` senkron riski). Bu tur OneDrive alan boşalttı (%87). → Bölüm E: repoyu OneDrive dışına taşıma adayı (PO).

---

# 📅 OTURUM 2026-08-25 (KVKK güvenlik turu — ilk KOD turu)

**MOD:** 🟢 BYPASS. İlk kez KOD değişti (önceki turlar salt-docs'tu). **Hiçbir PR merge edilmedi.**

**Yapılan:**
- **FAZ A — K0 güvenlik (backend PR #51, MERGE OLMADI):** madde 38 `updateUser`/temperament password+PII sızıntısı düzeltildi (`db.ts` PrismaClient **global omit** `{user:{password:true}}` + explicit select + regresyon testi) · madde 68 `SuspicionReport` reporter PII maskeleme (`maskName`/`maskContact` + test). backend branch `fix/kvkk-pii-guvenlik-38-68`; tsc/eslint temiz; DB testleri CI'da. **Çatı submodule pointer'ı DEĞİŞMEDİ** (backend merge olmadı → dans yok).
- **FAZ B — teyitler (salt-okuma):** T7 opt-in eşleşmeyi bloklamıyor (K2, alan ölü→madde 86) · `maxMeetingsPerWeek` **enforce EDİLMİYOR** (madde 79) · 9b indirmesi doğru (görünür yalan yok).
- **FAZ C — KVKK veri aktarım envanteri** (kod-kanıtlı, 2 ajan): `raporlar/kod-denetimi/kvkk-veri-aktarim-envanteri-2026-08-25.md`. 8 hukukçu sorusu + [PO DOLDURACAK]. Yeni maddeler **79-87** (00-KARAR-TAKIP F.5).

**⚠️ KALAN (bu tur YAPILMADI — bağlam sınırı, dürüstçe):** FAZ D KVKK belge paketi (8 belge — **envanter hazır, ayrı tur temiz üretir**) · FAZ E FE entegrasyonu (🛑 merge-kilitli PR). Avukat mevcut metinleri "yetersiz" bulmuştu → paket sıfırdan, envantere dayalı yazılacak.

**⭐ Kritik açıklar (envanterden):** OAuth'ta açık rıza UI'da alınmıyor · KVKK+18 birleşik kutu · rıza sürümü tutulmuyor · aydınlatma eksik kategoriler · hak-kullanım kanalı operasyonel eksik (madde 84) · otomatik imha yok (madde 81) · madde 39 hardDelete FK patlıyor. **Repolar hâlâ PUBLIC → G1/G3 kodu okunabilir; PRIVATE öncelik.**

---

# 📅 OTURUM 2026-08-25b (KVKK belge paketi)

**MOD:** 🟢 BYPASS (kod + belge). **Hiçbir PR merge edilmedi.**

- **FAZ 0 — madde 80 (backend PR #51'e ek):** `getPlatformLogs` explicit select (meta çıkarıldı) + `listUserReports` fullName maskeleme + test. tsc/eslint temiz. Yeni bulgular: madde 88 (getPlatformStats recentLogs meta) · madde 89 (listPendingTenants admin PII).
- **FAZ D — KVKK belge paketi (çatı #112):** `docs/kararlar/konu/kvkk-metinleri/` **9 TASLAK belge** (00-AVUKAT-KONTROL kapak + aydınlatma[iki sürüm]/açık-rıza/gizlilik/çerez/saklama-imha/başvuru/kullanım-koşulları/veri-işleyen-sözleşmesi). Envantere dayalı, jenerik değil.
- **Avukat modeli (belgelerin temeli):** platform=veri işleyen · kurum=veri sorumlusu · üniversite kulüpleri→sorumlu üniversite (kulüp-tenant aktif edilmez, madde 91) · anonimleştirme yeterli · sunucu yurtdışı kalıyor.
- **🔴 Sunucu ülke çelişkisi:** belge "eu-west-2/İrlanda" tutarsız (eu-west-2=Londra) → metinlerde ülke YAZILMADI, [PO DOLDURACAK] + kapak uyarısı (madde 92).
- **8 hukukçu sorusu** (DISC Md.6? · VERBİS? · yurtdışı SS-3? vb.) kapak dosyasında; **[PO DOLDURACAK]** alanları listeli.

**⚠️ KALAN:** FAZ E FE entegrasyonu (metinleri /kvkk /gizlilik /terms + yeni çerez/başvuru sayfalarına yerleştir, merge-kilitli PR). Hukukçu onayına kadar zaten merge olmayacağı için ayrı tura bırakıldı. **Ön koşul:** hukukçu onayı + [PO DOLDURACAK] (özellikle başvuru `destek@` + sunucu ülke).

---

# 📅 OTURUM 2026-08-25c (KVKK Word paketi + anonimleştirme teyidi)

**MOD:** 🟢 BYPASS (kod + belge). **Hiçbir PR merge edilmedi.**

- **FAZ 1 — Anonimleştirme teyidi (backend PR #51'e ek):** `anonymizeUser` kod teyidi → **kısmi (takma-adlaştırma).** Eksik User PII (sosyal linkler/avatar/enneagram/discResultCard) **eklendi + test**. **Kalan (madde 93):** mesaj içeriği · fiziksel foto dosyası · `Meeting` alanları · **userId (PK) değişmiyor** → çapraz-tablo yeniden-tanımlanma. `05-saklama-imha` + kapak, "tam geri-döndürülemez" vaadini **kaldırıp gerçeği beyan ediyor.**
- **FAZ 2 — Profesyonel Word (çatı #112):** `konu/kvkk-metinleri/KVKK-BELGE-PAKETI-2026-08-25.docx` — kapak + "nasıl incelensin" + otomatik içindekiler + 9 belge (her biri yeni sayfa) + altbilgi sayfa-no + kenarlıklı tablolar + [HUKUKÇU]=sarı/[DOLDURACAK]=gri vurgu. **Doğrulandı:** Türkçe tam, kalan emoji 0, 4 tablo, 197KB. Üretici `scripts/kvkk-docx-gen.py` (python-docx); md=canonical, docx=türev (README).
- **⭐ PO kararı:** **FE site-entegrasyonu İPTAL** — metinler siteye çıkarılmayacak, avukata Word ile gidilecek. Sayfalara gömme hukukçu onayı sonrasına. `/kvkk /gizlilik /terms` **dokunulmadı.**
- Yeni bulgu iş maddesi: **madde 93** (tam anonimleştirme).

**⚠️ Avukat sonrası:** revizyon → md'ye işle → `python scripts/kvkk-docx-gen.py` → yeni Word. Ön koşul: [PO DOLDURACAK] (başvuru `destek@` + sunucu ülke) + hukukçu onayı.

---

# 📅 OTURUM 2026-08-25d (migration'sız 5 iş — KVKK paketi beklerken)

**MOD:** 🟢 BYPASS (kod). **Hiçbir PR merge edilmedi.** Backend PR #51'e 5 commit, **CI YEŞİL** (357 test).

- **madde 88** — `getPlatformStats` recentLogs meta çıkarıldı (madde 80 deseni).
- **madde 89** — `listPendingTenants` admin fullName+email maskelendi. **Karar:** maskele (onay/red akışı e-postayı tüketmiyor, bildirim maili adresi yeniden çeker; `maskEmail` domain'i korur → admin doğrulayabilir). Bulgu → **madde 94** (VIEW audit izi yok, düşük).
- **madde 79** — haftalık görüşme limiti enforce edildi. **Semantik:** menti başına · **sabit 7-günlük UTC kova** · tanımsızsa limit yok · 409 · CANCELLED/COMPLETED hariç. ⚠️ İlk CI fail: ileri-only pencere önceki görüşmeyi kaçırıyordu → teşhis + kova'ya çevrildi.
- **madde 69** — Zod validation `message` (`firstValidationMessage`). **FE değişikliği GEREKMEZ** (client.ts + questions/page.tsx zaten `message` okuyor).
- **madde 70** — adaptive-test `progress` (`computeProgress`, migration yok). FE guard `DailyQuestionWidget.tsx:39` kaldırma = **ayrı çatı FE turu**.

**Kalan:** (a) madde 70 FE guard kaldırma (küçük çatı PR) · (b) PR #51 merge (PO) · (c) 9a+9b migration turu (tek başına) · (d) KVKK avukat cevabı.

---

# 📅 OTURUM 2026-08-25e (PR #51/#112 merge + pointer bump + senkron)

**MOD:** 🟢 BYPASS. **PO backend #51 + çatı #112'yi merge etti, repoları PRIVATE yaptı.**

- **PR #51 CANLIDA:** backend main HEAD **`b4b6d66`** (madde 38/68/80/88/89/93/79/69/70 — güvenlik+KVKK+UX, backend autodeploy).
- **PR #112 CANLIDA:** çatı main HEAD **`9bb02b7`** (reorg + KVKK belge paketi + tüm docs).
- **Çatı submodule pointer bump:** #51 merge sonrası pointer geride kaldı (`ba92dfa`) → **PR #113** açıldı (`ba92dfa`→`b4b6d66`, **ileri-sarım kanıtlı**, yalnız pointer, merge PO'da). backend submodule main'e alındı, `.docx` commit'e girmedi.
- **Belge senkronu (KURAL 8):** 00-KARAR-TAKIP F.1/F.2/F.5 (9 madde) → ✅ CANLIDA · Bölüm E repolar → ✅ PRIVATE · 10-yol 38/69/70 stub · 10-yol-tamamlananlar 8 kayıt · 09-DURUM yeni snapshot.
- **Repolar PRIVATE** (PO-manuel) → F.1 güvenlik açıkları hem düzeltildi hem repo gizlendi.

**Kalan:** (a) #113 pointer merge (PO) · (b) madde 39 KVKK hardDelete (migration turu) · (c) madde 70 FE guard (ayrı çatı PR) · (d) 9a/9b kalibrasyon (migration'sız, temiz main'den) · (e) madde 93 tam-anonim.

---

# 📅 OTURUM 2026-08-26 (9a/9b kalibrasyon — migration YOK)

**MOD:** 🟢 BYPASS. #51 merge sonrası temiz main'den. **Hiçbir PR merge edilmedi.**

- **9b (backend PR #52):** canlı motor kaydedilen tenant ağırlığını okur (`scoring.ts` opsiyonel ağırlık, default 0.6/0.4=eski davranış; `matching.ts` N+1 yok; regresyon testi) → **madde 87 (ölü yazma) çözülür.**
- **9a (backend #52 + çatı #114):** tenant manuel ağırlık ayarı `PUT /algorithm-tuner/weights` (0.05 katı · %40-70 · discWeight=1-sector · tenant-izolasyon · tüm adminler · SystemLog.meta audit · manuel ayar pending'i temizler).
- **⭐ MIGRATION GEREKMEDİ** (ağırlık `tenantVocabulary` Json'da, keşif doğruladı) — DURAK-1 raporu bunu göstermişti; DURAK-2 devreye girmedi.
- **FE (çatı #114):** kalibrasyon +/− %5 UI (DISC otomatik, son-değişiklik satırı, backend hata mesajı) + **madde 70** progress guard kaldırma.
- **CI:** backend #52 ✅ yeşil. Çatı #114 koşuyor. **PR'lar MERGE EDİLMEDİ.**

**⚠️ DURAK-A (PO, #52 merge öncesi):** `tenantVocabulary`'de `algorithmWeights` KAYITLI tenant sayısını salt-okuma kontrol et — 0 ise 9b tamamen risksiz; >0 ise o kurumların sıralaması aktive olur (kayıt yoksa DEFAULT=mevcut, regresyon garantili). Yalnız sayı+ağırlık, PII yok.

**Kalan:** #52+#114 merge (PO) · madde 39 KVKK hardDelete (migration turu) · madde 93 tam-anonim.

---

# 📅 OTURUM 2026-08-26b (#52/#114 merge senkron + pointer bump + depo hijyeni)

**MOD:** 🟢 BYPASS. PO #52 (`838d128`) + #114 (`6e6e798`) merge etti. **Hiçbir PR merge edilmedi (bu ajan).**

- **9a/9b/madde 70/87 → ✅ CANLIDA** (backend #52 + çatı #114). Motor kaydedilen ağırlığı okur (madde 87 çözüldü) + tenant manuel ayar + progress guard.
- **⭐ DURAK-A sonucu (PO, Neon prod salt-okuma):** `tenantVocabulary`'de özel ağırlık kayıtlı tenant = **0** → 9b hiçbir sıralamayı değiştirmedi (tümü %60/%40). Belgeye kanıt olarak işlendi.
- **Pointer bump PR `chore/pointer-bump-52`:** çatı submodule `b4b6d66`→`838d128` (ileri-sarım kanıtlı, yalnız pointer). MERGE EDİLMEDİ.
- **Yeni madde 95:** kalibrasyon 'son değişiklik' satırında **AKTÖR (kim)** gösterilmiyor (getWeights actorUserId dönmüyor) → 9a PO kararının yarısı eksik, küçük FE/BE işi.
- **🧹 Depo hijyeni:** 6 atıl worktree (3 backend-kopyası ~1GB + 3 çatı) kaldırıldı (hepsi commit-edilmemiş-iş YOK doğrulandı); merge olmuş **yerel 91 + uzak 93** dal silindi; unmerged dallar + #110 korundu. Disk 16→17G.

**Kalan:** pointer-bump-52 merge (PO) · madde 95 (aktör izi) · madde 39 KVKK hardDelete (migration) · madde 93 tam-anonim.

---

## ⏭️ SIRADAKİ İŞ SIRASI (bu günlüğün en güncel yönlendirmesi)
> **Migration'lar ASLA paralel değil — SIRALI** (canlı = lokal aynı Neon DB; her migration PO onayı + staging ister).
0. **🔴 CANLI-ÖNCESİ:** (a) **repoları PRIVATE yap** (PO-manuel) · (b) güvenlik: madde 38+68 **✅ backend PR #51 (merge PO'da)**; **madde 39 (G2)** kaldı (migration+PO). · (c) **KVKK belge paketi (FAZ D)** — envanter hazır (`kvkk-veri-aktarim-envanteri-2026-08-25`), ayrı tur: 8 belge + FE (merge-kilitli) + 8 hukukçu sorusu. · (d) **madde 79** görüşme limiti enforce (küçük).
1. **9a + 9b (birlikte):** kalibrasyon düzeltme (motor kaydedilen ağırlığı OKUSUN) + ağırlık ayarlanabilirliği (tüm yöneticiler, %60/%40 varsayılan, değişiklik izi). Migration.
2. **2a ghost red — 30 GÜN UYKU MODU:** veriler hemen silinmez; 30 gün kurum geri alırsa döner, almazsa tamamen silinir. Zamanlanmış iş (cron) + migration.
3. **#7 Aşama 2:** otomatik pasifleştirme (dernek eşiği girer, varsayılan KAPALI) + feedback şema alanları. Migration.

**Keşif bekleyenler (kod öncesi):** #36 kullanıcı çıkarma (önce git keşfi) · etiket havuzu (talep-onay; önce kod keşfi) · **İçerik & Soru Felsefesi Keşfi** (DISC-DERİNLEŞME kurgusu/#31/#13/#30 buna bağlı) · **belge yeniden yapılandırma** (~68 belge — 2026-08-23 reorg ile kısmen yapıldı).

**PO manuel (kod değil):** 37m kurum maili (destek@ + env) · Dokploy foto volume · repoları private · KVKK/çerez metinleri (canlı öncesi, en son).

---
---

# 📅 OTURUM 2026-08-26 (KVKK + madde 95 + tam-anonimleştirme keşfi)

**📸 O oturumun kapanış fotoğrafı** — güncel için git + 09-DURUM.

## 🔎 Git-doğrulanmış durum (2026-08-26, tur başı)
- **Çatı main HEAD:** `f9c1a34` (#52 pointer-bump merged) · **backend main HEAD/pointer:** `838d128` (senkron). Masa temiz.

## A) Yapılanlar (kanıtlı)
- **FAZ 0 — KVKK paketi (madde 92 ✅ ÇÖZÜLDÜ):** sunucu ülkesi **Londra/Birleşik Krallık** (AWS `eu-west-2`; eski "İrlanda" HATALIYDI, BK = AB üyesi DEĞİL) + veri sorumlusu kimliği (gerçek kişi — PO: şirketleşene kadar ad, sonra şirket) yasal metinlere (01/02/03/07/08 + 00-AVUKAT) işlendi; envanter raporuna ⚠️ GÜNCELLEME notu; Word yeniden üretildi (emoji temiz, Türkçe). Docs branch commit `ca29506`. **Hukuki İÇERİK değişmedi — yalnız placeholder + ülke.**
- **FAZ 1 — madde 95 (🔀 PR'da, MERGE OLMADI):** kalibrasyon "son değişiklik" aktör izi. Backend **#53** (`getLastWeightChange`: actorName yalnız AD/e-posta değil, tenant-izolasyonlu, `WEIGHT_CHANGE_AUDIT_MESSAGE` tek-kaynak, migration YOK; test: aktör+eski→yeni+e-posta sızmıyor+okuma-izolasyonu) + çatı **#116** (FE satır). Lokal: backend tsc/eslint + FE tsc/lint/build yeşil; entegrasyon testi CI'da.
- **FAZ 2-A — TAM ANONİMLEŞTİRME KEŞFİ (madde 93+39):** 3 salt-okuma ajan → `00-KARAR-TAKIP` madde 96. **🛑 DURAK-1'de PO 1·1·1 = (c)+(iii)+(2) seçti** (+ EK ŞART: "silindi" deme, token iptali, dürüst yasal metin).
- **FAZ 2-B — UYGULANDI (🔀 PR'da, MERGE OLMADI):** backend **#54** (MIGRATION YOK): `anonymizeUser` bağlı serbest-metin (mesaj `[silindi]` iki-taraflı, görüşme/telefon/feedback/talep/şikayet/sözleşme) + fiziksel avatar dosyası + oturum/token iptali (membership pasif + token sil → eski token 403); `hardDelete`→anonymize ("silindi" DENMEZ, ACCOUNT_CLOSED_MESSAGE). Test: iki-taraflı mesaj, yeniden-tanımlama izi yok, token 403, satır silinmez. KVKK metinleri (05/06/00-AVUKAT H-9) + Word güncellendi. **Dürüst sınır:** userId (cuid) kalır → "tam geri-döndürülemez" vaadi YOK, H-9.

## B) ✅ DURAK-1 ÇÖZÜLDÜ (PO kararı 2026-08-26)
- **1·1·1 = (c) migration'sız içerik-temizleme + (iii) mesaj placeholder + (2) hardDelete→anonymize.** EK: token/oturum iptali + dürüst kapanış mesajı.
- **Migration YAZILMADI** (c yolu gerektirmedi) → DURAK-2 tetiklenmedi.

## C) MERGE TURU (PO yetkisiyle, aynı gün ilerledi)
- **Merge sırası kanıtlandı:** dört PR **bağımsız** (stacked değil) — backend #53⊥#54 (`#53 not ancestor of #54`, sıfır dosya çakışması), çatı #116/#117 docs/FE ayrı. Backend önce (pointer için).
- **MERGED (`--merge`, geçmiş korundu):** çatı **#116** (PO daha önce, `9b09dc3`) · backend **#53** (`2caa7bb`) · backend **#54** (`b433554`) · çatı **#117** (`71bac0c`). Her merge sonrası ilgili main CI **yeşil** teyit edildi.
- **✅ CANLIDA (autodeploy):** madde 95 + 92 + **93/39 tam anonimleştirme.** ⚠️ Anonimleştirme davranışı değişti (bkz. 09-DURUM).
- **Pointer bump:** `chore/pointer-bump-53-54` (`838d128`→`b433554`, ileri-sarım) + belge senkronu → **PR AÇILDI, MERGE EDİLMEDİ** (merge PO'da).
- **Silinen dallar:** backend feat/kalibrasyon-aktor-izi + feat/tam-anonimlestirme (yerel+uzak); çatı docs/kvkk-sunucu-veri-sorumlusu + feat/kalibrasyon-aktor-izi-fe + chore/pointer-bump-52 (yerel; uzak merge'de silindi).
- **Açık PR (şu an):** pointer bump PR + **#110** (kilitli). Diğer hepsi MERGED.
- **Kalan iş:** madde 97 (FE hesap-kapatma) · H-9 (hukukçu) · küçük borç **98/99/100** (kalibrasyon audit void · SystemLog 90g purge izi · meta.tenantId indekssiz).

---
---

# 📅 OTURUM 2026-08-26 (İÇERİK KEŞFİ — tam soru dökümü, 🟢 BYPASS yalnız-belge)

**Salt-belge tur** — kod OKUNDU, değiştirilmedi; DB'ye komut YOK; seed çalıştırılmadı. Çatı main `27542ef`'ten branch `docs/icerik-kesfi-2026-08-26`.

## Yapılanlar
- **FAZ-1 (5 ajan → bölüm dosyaları):** her ajan kendi ham dökümünü `raporlar/icerik/bolumler/01-05`'e yazdı (bağlam koruması). Kod gerçeği: **DISC 32** (20 CORE+12 DEEPENING; "20"=silinmiş `seed-questions.ts`) · **SJT 3** (OCEAN ölçer, DISC değil) · **sertifika 20** (4 red-line) · **öğrenme 13** (puansız).
- **FAZ-2 (analiz):** `tam-soru-dokumu-2026-08-26.md` (referans+analiz, tam metin kopyalanmadı) + iki PO dosyası: `sorular-po-inceleme` (68 soru) + `eslesme-uyum-po-inceleme` (16 kombinasyon + tiebreak + 60/40). ⭐ Bulgular: **#31 NEGATİF** (yok, sıfırdan) · **felsefe BELGELENMEMİŞ** (matris/tiebreak/60-40 sezgisel) · **CORE-eşiği tutarsızlığı** (engine 5 = canlı yol) · **üç ayrık sistem** (SJT/OCEAN canlı eşleştirmede okunmuyor).
- **FAZ-3:** 6 bayat belge ⚠️ GÜNCELLEME notu + 00-INDEX/00-KARAR-TAKIP senkron. **Yeni madde 101** (SJT/OCEAN okunmuyor) · **102** (CORE-eşiği) · **103** (psikometrik gerekçe belgesiz). madde 13/30/31/33/73 + DISC-DERİNLEŞME'ye keşif notu.
- **Küçük düzeltme:** 09-DURUM satır 5+9 (bayat "pointer bump PR AÇIK" → #118 MERGED, senkron).

## Açık PR / kalan
- Bu tur PR açılır (docs/icerik-kesfi) → **MERGE ETME.** #110 kilitli ELLENMEDİ.
- **PO kararı bekleyen:** 68 soru + uyum tablosu işaretleme · #31/DISC-DERİNLEŞME yönü · SJT/OCEAN bağlanacak mı (101) · #30 seed önceliği · #13 gerek mi.
- **⏳ CANLI TEYİT KUYRUĞU** (döküm sonunda): canlı DISC/sertifika/SJT/öğrenme sayıları — sonraki altyapı-kontrol turunda tek seferde.
- **Not:** stash@{0} = yalnız `.docx` (KVKK Word), DROP EDİLMEDİ — PO kararına bırakıldı.

---

## OTURUM 2026-08-26 (akşam) — BELGE BİLANÇOSU (4-tur salt-belge sayım)
- **Mod:** 🟢 BYPASS (yalnız-belge; kod/DB/PR-merge YOK). Branch: `docs/belge-bilancosu-2026-08-26`.
- **Ne yapıldı:** Tüm `docs/` (canonical + kararlar/ + raporlar/ + devir/ + arsiv/) + kök & backend `CLAUDE.md` **4 turda baştan-sona okundu** (71 belge, 10.473 satır; 11 ham içerik + 11 kvkk-metni kural gereği sayılmadı). Her karar/iş/niyet çıkarıldı, kod gerçeğiyle çaprazlandı, **tekilleştirildi**.
  - Tur-1: canonical + kararlar/ (27 belge) · Tur-2: raporlar/ (28 belge, 486 kalem) · Tur-3: devir/ + CLAUDE.md (9 belge) + TUR-1 denkleştirme · Tur-4: arsiv/ (7 belge) + tekilleştirme + nihai çıktılar.
- **Sonuç:** HAM 1381 kalem → **196 benzersiz** (1185 tekrar birleşti) [⚠️ DÜZELTME (2026-08-27): "196" YANLIŞ — gerçek tekil **≈259** (270 satır − 11 ikiz); bkz. `../raporlar/bilanco/kararlar/00-KATLAMA-IZI-2026-08-27.md`]. Açık: ⬜66+🟡22+❓32=**120**. **21 numara adayı → NUMARALANDI (104-124)** — PO talimatıyla `00-KARAR-TAKIP` F.6'ya işlendi, hepsi ⬜ AÇIK (PO önceliklendirmedi), öncelik yok/10-yol'a eklenmedi. **15 tutulmamış söz**, **~29 unutulmuş erken niyet**, **6 çelişki** (5 kod-hakemli), **~20 hayalet-tamamlanmış**.
- **Öne çıkan:** `enneagramWing` kod-hakem = yarım-bağlı yaz-echo-alanı · ThemeToggle TUR-1 yanlış-✅ düzeltildi (platform layout'ta yok) · `backend/CLAUDE.md` 6 bayat onboarding iddiası · `00-CIKIS-PLANI` en bayat canonical · Y1-Y7 retention 08-20'den beri gerekçesiz açık.
- **Çıktılar:** `docs/raporlar/bilanco/` → nihai rapor + karar defteri + PO özet + tekrar-önleme (KURAL 9-12 öneri, yürürlükte DEĞİL) + 16 bölüm defteri.
- **Belge-senkron:** 00-INDEX + 00-KARAR-TAKIP + 09-DURUM + bu günlük ⚠️ notla güncellendi. **Ek tur (PO talimatı):** numara adayları `00-KARAR-TAKIP` F.6'da **104-124** olarak numaralandı — hepsi ⬜ AÇIK (PO önceliklendirmedi), öncelik/sıra YOK, 10-yol'a eklenmedi (KURAL 8: roadmap yalnız öncelik verilince).
- **Sınır:** DB'ye HİÇ sorgu yok (canlı sayı teyitleri ⏳ kuyrukta); kod OKUNDU, değiştirilmedi; PR açıldı, MERGE EDİLMEDİ.

---

## OTURUM 2026-08-27 — CLAUDE.md düzeltmesi (madde 124) + KURAL 9-12 yürürlüğe
- **Mod:** 🟢 BYPASS (yalnız-belge; kod/DB YOK). Branch: `docs/claude-md-duzeltme-2026-08-26` (backend + çatı).
- **GÖREV A (madde 124):** İki `CLAUDE.md`'deki bayat kod-gerçeği iddiaları **grep-kanıtlı** düzeltildi.
  - `backend/CLAUDE.md` (backend PR **#55**): "5 model"→**38** (`^model`=38); silinmiş `iceBreaker.ts`/`matchReason.ts` çıkarıldı+not; "LLM only ice-breaker"↔"removed" içsel çelişkisi tek ifadeye indirildi (LLM removed; yalnız `config` env + `llmRetry.ts` 0-import iskele); `llmRateLimiter` "var"→kaldırıldı (grep boş); UserProfile etiket **50→80** (`sanitizeTags` maxLen); `matching.ts` satırına `rankMentorsForMenti` eklendi.
  - kök `CLAUDE.md` (çatı PR): eu-west-2 "İrlanda"→**Londra/Birleşik Krallık** (AB değil; madde 92).
  - **DOĞRU çıkıp değişmeyenler:** `registerMessages.ts` (frontend — bilanço backend'e bakıp yanılmış), `assertTestDatabase.ts` (tests/helpers), Express 5, `iceBreaker` şema alanı (servis silindi, alan durur), tenantSharing/canCrossTenantMatch/SECTOR_TAG(50)/purgeExpiredData(Pazar=weekly). **TEYİT GEREK kalan: 0.**
- **GÖREV B (KURAL 9-12 yürürlüğe):** kök `CLAUDE.md`'ye KURAL 8 ardına eklendi — K9 rapor kalem-listesiyle biter (numara-adayı sütunu zorunlu) · K10 ✅ kanıtsız basılmaz (kısmi=🟡; 6 durum) · **K11 söz açılışta okunur** (00-KARAR-TAKIP'e "⭐ SONRAKİ-TUR SÖZLERİ" bölümü — YENİ dosya değil; 10 açık söz taşındı) · K12 tazelik denetimi (revize: birincil=yapısal-kod-değişiminde CLAUDE.md doğrula + karar-yayılım taraması; 30-gün ikincil/script).
- **Belge-senkron:** 00-KARAR-TAKIP (madde 124 ✅ + SÖZLER bölümü + K9-12 CLAUDE.md'de) · 09-DURUM · tekrar-onleme Bölüm 5 (✅ yürürlükte) · bu günlük. Kırık-link 0.
- **Sınır/submodule:** backend PR #55 + çatı PR açık, **HİÇBİRİ MERGE EDİLMEDİ** (PO). Çatı pointer backend #55 feature-commit'e bump; backend merge sonrası main HEAD'e re-bump gerekir (DANS ÖNLEME).

---

## OTURUM 2026-08-27 (öğleden sonra) — PO KARARLARI İŞLENDİ (184 kart)
- **Mod:** 🟢 BYPASS (yalnız-belge). Branch: `docs/po-kararlari-2026-08-27`. ~~PR açık, MERGE ETME~~ → ⚠️ GÜNCELLEME (2026-08-28): **PR #124 MERGED (`90bb7d4`).**
- **Ne yapıldı:** PO'nun strateji oturumunda 184 karar kartına verdiği kararlar `G*.md` dosyalarına deterministik script'le işlendi (kutu `[x]` + PO notu; kart metni değişmedi).
  - **176 karar:** ✅ işleme al 87 (9 çıkış-blokeri: G8-01, G1-05/07/09/10/13/28, G5-01/02) · ⏸️ şimdilik alma 85 · 🗑️ geçersiz 2 (G4-03, G9-01) · ❓ keşif 2 (G4-09/10) · **8 kart boş** (PO listesinde yoktu: G3-08/11, G4-01/11/12/24, G8-08, G9-05).
  - **24 PO notu** aynen işlendi (analytics-çıkışta-yok, kulüp-aktif, manuel-eşleştirme-yok, anket→migration vb.).
- **Sync:** madde 13 ⏸️→✅ (G3-13 canlandı); T8/76 🗑️ çözüldü (Ç5 kapandı); SÖZLER S17-S20 eklendi; 09-DURUM + bu günlük not.
- **Bağlı kararlar:** G1-13↔G1-10 (kulüp-aktif + açık-beyan), G3-04→G3-13 (anket→migration), G2-07+G2-08+G10-21 (sektör+OCEAN bağlama), G8-01↔G10-25 (foto zinciri).
- **Sınır:** öncelik SIRALAMA YAPILMADI (KURAL 8: 10-yol'a yalnız öncelik verilince). Kod/DB/kart-metni değişmedi. G4-10 çift-atama keşif'e çözüldü (raporda not).

---

## OTURUM 2026-08-28 — Değerlendirme/eşleştirme sistemi TASARIM BELGESİ (iki tur)
- **Mod:** 🟢 BYPASS (yalnız-belge; kod/DB/seed/migration YOK). Branch: `docs/tasarim-belgesi-2026-08-27` (temiz main'den). ~~PR #125 açık — MERGE EDİLMEDİ~~ → ⚠️ GÜNCELLEME (2026-08-28): **PR #125 MERGED (`b212507`).**
- **Çıktı:** yeni belge `docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md` (🔄 YAŞAYAN, **16 bölüm**, ~730 satır). İki turda yazıldı: **Tur A** (Bölüm 1-8: neden/model/arketip/ölçme + **çekirdek 12 senaryo tam metin**/derinleşme/sertifika/öğrenme ayrımı) + **Tur B** (Bölüm 9-16: eşleştirme algoritması/veri boşluğu/süreç/göç/kalibrasyon/açık kararlar/dürüstlük/KALEM LİSTESİ).
- **Ana kararlar (belgeye kaydedildi, YORUM KATILMADI):** DISC→**Big Five** motor + metafor arketip görünen yüz · Likert→**senaryo+şık** ölçme · algoritma ağırlıkları **%45 hedef-değer / %30 alan / %25 kişilik** (eski %50 karakter araştırmayla düştü — Dyrenforth 2010) · kişilik içi dağılım + **2 veto** (yalnız zarar) · sektör asimetri düzeltmesi (payda=etiket birleşimi) · **üç soru** (S1/S2/S3) deep-level similarity boşluğu (Eby 2013) · görünürlük+k-anonimlik · manuel eşleştirme YOK (algoritma seçenek sunar).
- **KURAL 9 KALEM LİSTESİ:** Bölüm 16'da **24 kalem** (durum + numara-adayı sütunlu). Bunlar `00-KARAR-TAKIP`'e girişte numara alacak.
- **8 açık nokta** (Bölüm 14, numaralı `[ ] PO notu`): İz Açan adı · karma format · 12-senaryo inceliği · sınırsız yeniden-derinleşme (G3-03) · özet alanı yönergesi · göç planı · k-anonimlik eşiği · profil envanteri (S21).
- **Tur A düzeltmesi (Tur B'de):** belge başındaki keşif rapor yolları YANLIŞTI (`kararlar/konu/kesif...`) → `docs/raporlar/kesif...` + `.../icerik...` düzeltildi. Kırık-link 0.
- **Belge-senkron:** 00-INDEX (yeni belge satırı) · 00-KARAR-TAKIP (**S16 ✅** + yeni **S21** + madde 101/102/103 & 125-130'a ⚠️ GÜNCELLEME referansı) · 09-DURUM (⚡ ŞU AN bloğu) · G2/G3 kartlarına yalnız belge-içi referans (kartlar DEĞİŞTİRİLMEDİ) · bu günlük.
- **Sınır:** #110, `kvkk-metinleri/`, karar dosyaları (G*.md) ELLENMEDİ · numara doğurulmadı · kişi adı yok. **MERGE EDİLMEDİ** (PO).

---

## OTURUM 2026-08-28b — 8 boş kart + öncelik sıralaması (S17 kapanışı) + çakışma-öncesi merge
- **Mod:** 🟢 BYPASS (yalnız-belge). Branch: `docs/oncelik-siralama-2026-08-28` (temiz main `90bb7d4`'ten). **PR açık — MERGE EDİLMEDİ.**
- **Ön koşul (git-doğrulandı):** #125 MERGED (`b212507`) + #124 MERGED (`90bb7d4`) → iş main'in üstünde yürüdü. *(Ara adım: bu turdan önce #124 çakışması çözüldü — `d789902` merge commit, iki turun içeriği kayıpsız birleşti.)*
- **GÖREV A — 8 boş kart bağlandı** (kutu `[x]` + PO notu AYNEN): G3-08 işleme-al · G3-11 geçersiz · G4-01 işleme-al · G4-11 şimdilik · G4-12 şimdilik · G4-24 işleme-al · G8-08 işleme-al · G9-05 işleme-al · +G4-10 PO-teyit (keşif kararı doğru, G4-09 ile keşif turu).
- **Yeni dağılım (TAM SAYI, kod-kutusu grep-doğrulandı): 184 = 92 işleme-al / 87 şimdilik / 3 geçersiz / 2 keşif / 0 boş.**
- **GÖREV B — öncelik belgesi:** `../raporlar/bilanco/kararlar/00-ONCELIK-SIRASI-2026-08-28.md` (🔄; 8 faz + 🟣 PO-park + bağlı işler tablosu; 3 sıralama ilkesi + dürüstlük notu).
- **GÖREV C — 10-yol:** yeni "🗺️ KOD İŞ SIRASI" üst-bölümü (her kalem tek satır + kart ref; detay öncelik belgesine referans; yeni numara açılmadı).
- **DURAK uygulandı:** 11 işleme-al kart PO'nun faz listesinde tek tek anılmamıştı (G1-01, G2-01..05, G2-11, G3-05, G4-39, G8-13, G8-14) → Faz 8'e eklendi + raporlandı (PO teyidine açık). Böylece 92 işleme-al'ın tamamı sıralamada.
- **GÖREV D — senkron:** S17 ✅ · 00-PO-KARARLARI ⚠️ GÜNCELLEME (yeni dağılım) · 00-INDEX 2 satır · 09-DURUM ⚡ blok + 2 bayat "PR açık" satırı tazelendi (#124/#125 MERGED, SHA git-doğrulandı) · bu günlük. Kırık-link 0.
- **Sınır:** DB/seed/migration/kod DEĞİŞMEDİ · #110 ELLENMEDİ · numara doğurulmadı · kişi adı yok. **MERGE EDİLMEDİ** (PO).

---

## 🧭 Her oturum için çalışma tarzı hatırlatması
- **Ürün sahibi kod yazmaz;** strateji-Claude promptları yazar, PO Claude Code'a kopyalar.
- **Modlar:** 🔵 PLANLA (salt-okuma) / 🟢 BYPASS (kod/belge yazar, PR açar — **MERGE ETMEZ**). Merge kararı hep PO'da.
- **3 kırmızı kural:** (1) canlı = lokal aynı Neon DB → DB işleminden önce dur+onay · (2) tehlikeli seed asla (güvenli olanlar hariç) · (3) merge kararı hep PO'da (PR aç, merge etme).
- **Belge-senkron:** her BYPASS turu bitişinde `09-DURUM` + `00-KARAR-TAKIP` güncellenir veya "gerekmedi" denir.
- **Kişi adı yok** ("ürün sahibi"). Kullanıcıya görünen metin Türkçe; kod iç mekaniği İngilizce.

---
*Canonical güncel durum: `docs/kararlar/09-DURUM.md` · arkada ne kaldı: `docs/kararlar/00-KARAR-TAKIP.md` · sıradaki işler: `docs/kararlar/10-yol-haritasi.md`. Bu belge = oturum tarihsel kaydı (yaşayan; yeni oturumlar aşağı eklenir).*
