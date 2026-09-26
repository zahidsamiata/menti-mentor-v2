> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-26 (📸 fotoğraf tarihi) · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)
> ⚠️ Bu belge kalemlerin DOĞRULAMA fotoğrafını tutar, DURUMUNU TUTMAZ. Güncel durum: `docs/otonom/00-KUYRUK.md`.

# AN-53 · G1..G11 bilanço kartlarındaki açık kalemlerin kod doğrulaması (2026-09-26)

**Kaynak iş:** `docs/otonom/00-KUYRUK.md` AN-53 · **Yöntem:** 5 salt-okuma alt ajanı (G1 · G2+G3 · G4a+G4b+G5 · G6+G7+G8 · G9+G10+G11), kod gerçeği = backend `origin/main` `60715c7` + çatı `origin/main`. Her açık kalem (⬜/🟡/❓/🔴 ya da "✅ kod ama ❓ onay") için üç sonuçtan biri: **✅ CANLIDA** (dosya:satır kanıtı) · **⬜ HÂLÂ AÇIK** (arama deseni + kapsam beyanı) · **❓ DOĞRULANAMADI** (koddan karar verilemez — PO onayı, canlı veri, dış altyapı). ❓ hiçbir yerde ✅/⬜ diye varsayılmadı. 🔵 bilinçli erteleme kalemleri sayıma katılmadı (grup notlarında belirtildi).
**Kartlar değiştirilmedi** (🧊 dondurulmuş belge — KURAL 3/6): her kartın başına yalnız bu rapora atıf veren tarihli not eklendi.

## Sayım (birim: kart kalemi)
| Grup | Kart | Açık kalem | ✅ canlıda | ⬜ hâlâ açık | ❓ doğrulanamadı |
|---|---|---:|---:|---:|---:|
| A | G1 | 20 | 1 | 15 | 4 |
| B | G2 + G3 | 27 | 1 | 10 | 16 |
| C | G4a + G4b + G5 | 40 | 13 | 19 | 8 |
| D | G6 + G7 + G8 | 35 | 9 | 14 | 12 |
| E | G9 + G10 + G11 | 23 | 0 | 15 | 8 |
| **Toplam** | | **145** | **24** | **73** | **48** |

(Satırın tahmini "~134" idi; sayım 145 açık kalem buldu — kartların kendi "açık" tanımına göre, 🔵 hariç.)

## Öne çıkan bulgular
1. **Kuyrukta BITTI görünen ama kalemin tamamı kodda olmayanlar** (satırın "Bitti demek" kapsamı daha dar olabilir — yeniden açılmadı, strateji katmanına not): G1-23 ↔ F-04 (logo için yalnız `https:` kuralı; host/MIME izin listesi yok, CSP rapor modunda) · G6-01 ↔ F-27 (sayfalama var, konuşma başına ayrı sorgu sürüyor) · G6-03 (yalnız 5 bağlantıda RESTRICT) · G7-13 (yalnız belge yönü) · G7-09 ↔ F-21 (bütünsel WCAG denetimi yok).
2. **Kuyrukta karşılığı OLMAYAN ⬜ kalemler** (ajan iş eklemez → strateji katmanı): G1-09 (KVKK başvuru adresi — `config.ts` yer tutucu) · G1-10 (aydınlatma metninde eksik veri kategorileri) · G1-13 (kulüp tipi için imza yetkisi beyanı) · G1-18 (kurum-içi sayımlar `User.role`'den — `TenantMembership.role` kuralı) · G2-06 · G2-09 (CORE eşiği iki yerde farklı; F-08 ile numara çakışması) · G3-09 (sertifika seed npm komutu) · G3-14 · G4-11/12/13/19/26/29/32/33/35/37/38 · G5-06/07 · G6-02 · G6-06 (ortak çerez/PII seçimi ayakları) · G7-02 (açık tema DISC kontrastı WCAG AA altı) · G7-11 · G7-14 · G8-06 · G8-11 (Redis ayağı) · G9-07 · G10-12 (`/clubs` ön yüzde çağrılmıyor) · G10-20 (`TenantSwitcher`, `ProfileStrengthCard` kullanılmıyor).
3. **Kodda canlı ama kartta ⬜ görünenler** (kart dondurulmuş — düzeltme bu raporda): G1-03 (denetim izi, Y-02) · G3-05 · G4-05/16/17 ve C grubunun diğer ✅'leri (liste aşağıda).
4. **Yanlış soru tuzağı notu:** G10-01(c) `MeetingScheduler` kullanılmıyor ama aynı işi `mentor/availability` ve `book-meeting` yapıyor → eksik özellik değil MÜKERRER (K-13 / silme protokolü). G10-24 → ürün kararı (❓).
5. **Tiebreak iki kaynaklı:** `onboardingController.ts` D>I>S>C ↔ `temperamentAnalysis.ts` D>I>C>S (AN-12 ile ilgili).

## Grup ayrıntıları (alt ajan çıktıları, düzenlenmeden)

### AN-53 · grup A

Kaynak: `docs/raporlar/bilanco/kararlar/G1-guvenlik-kvkk.md` · kod gerçeği = backend `origin/main` (`60715c7`) + çatı `origin/main` · 2026-09-26
Açık sayılanlar: "Bugünkü durum" satırı ⬜/🟡/❓/🔴 olan kartlar. Hariç: ✅ (G1-02,05,07,14,17,19,22), ⚫ (G1-01,04,17), 🔵 G1-11 (bilinçli erteleme, açık-işaret listesinde değil).

#### Sayım
| Kart | Açık kalem | ✅ | ⬜ | ❓ |
|---|---|---|---|---|
| G1-guvenlik-kvkk.md | 20 | 1 | 15 | 4 |

#### Kalemler
| Kart | Kalem (kısa) | Kartta işaret | Sonuç | Kanıt (dosya:satır / arama) | Kuyruk |
|---|---|---|---|---|---|
| G1-03 | listPendingTenants görüntüleme denetim izi | ❓ | ✅ CANLIDA | backend `src/controllers/platformController.ts:261` `auditPlatformAction('VIEW_PENDING_TENANTS')` + mükerrer uç `src/controllers/adminSettingsController.ts:360` (maskeli + iz) | Y-02 (backend #156 merge) · AN-46 |
| G1-06 | Message otomatik imhası (FeedbackLog ✅) | 🟡 | ⬜ HÂLÂ AÇIK | `src/services/gdprService.ts:397` `TODO(G1-10)` — Message imhası bilinçli yazılmadı; `purgeExpiredData` yalnız systemLog+feedbackLog siler (`:363-392`). Süre avukat metnine bağlı | F-02 |
| G1-08 | OAuth'ta açık rıza UI yok + KVKK/18+ tek kutu | ⬜ | ⬜ HÂLÂ AÇIK | OAuth: `frontend/src/components/molecules/OAuthButtons.tsx` rıza/kvkk grep 0; register'da OAuth düğmesi rıza kutusundan önce ve kutuya bağlı değil (`frontend/src/app/(auth)/register/_RegisterContent.tsx:310-316`); backend rızayı örtük yazar (`src/services/oauth/oauthService.ts:131-135`). Tek kutu kodda "PO kararı" diye bilinçli (`_RegisterContent.tsx:163`) → hukukçu teyidi ayrıca ❓ | F-03 → AN-30 |
| G1-09 | `destek@` KVKK başvuru kanalı + hak-kullanım ekranı | ⬜ | ⬜ HÂLÂ AÇIK (kısmi) | Ekran ayağı CANLI: `frontend/src/app/(dashboard)/profile/page.tsx:468` `<DataPrivacySection/>` (indir/hesap kapat). Açık ayak: aydınlatma metninde başvuru adresi yok — `frontend/src/app/kvkk/page.tsx` "@" grep 0, sonda "platform yöneticinizle iletişime geçiniz"; backend `src/config.ts:43` `'admin@platform.local'` yer tutucu, `:133` "destek@ kurulunca açılacak". Canlı env değeri koddan görülemez (❓) | yok (yalnız env: `03-PO-ELLE-ISLER.md` #19) |
| G1-10 | Aydınlatma metninde eksik veri kategorileri | ⬜ (🔴 PO notu) | ⬜ HÂLÂ AÇIK | `frontend/src/app/kvkk/page.tsx:33-39` yalnız 5 kategori (kimlik, profil, DISC, eşleşme, oturum); mesaj içeriği · sosyal medya · OCEAN · SJT · telefon SAYILMIYOR. Metnin kendisi "taslak" diyor (`:122-125`). Nihai metin avukata bağlı | kısmi: F-02 (Message süresi) · GV-18 (sürüm) · GV-09/09b (ülke). Kategori eksikliği için satır YOK |
| G1-12 | Veri İşleyen Sözleşmesi — kurum yasal alanları | ⬜ | ⬜ HÂLÂ AÇIK | `git grep -i "legalName\|taxNo\|verbis\|dpaSigned\|dataProcessing\|kepAddress\|mersis\|unvan\|vergi\|veri işleyen\|dpa"` backend `src`+`prisma` ve çatı `frontend/src` → 0 ilgili sonuç (yalnız `blockedPairs` gürültüsü) | AN-36 |
| G1-13 | Kulüp-tipi kurum aktif + aydınlatmada AÇIK BEYAN (tek madde) | ⬜ (🔴 PO notu) | ⬜ HÂLÂ AÇIK | Aktiflik ayağı: KULUP şablonu seçilebilir (`frontend/src/app/onboarding/stk/_steps/Step2Template.tsx:31`, backend `src/controllers/selfServeController.ts:219`). Beyan ayağı yok: `git grep -i "imza yetki\|temsil yetki\|yetkili olduğumu"` frontend/src + backend src/prisma → 0; `kvkk/page.tsx`'te kulüp/başkan ibaresi yok. PO şartı "ikisi birlikte" → yarım = açık | yok |
| G1-15 | SystemLog 90g imhası kalibrasyon "son değişiklik" izini siliyor | ⬜ | ⬜ HÂLÂ AÇIK | `src/services/gdprService.ts:363` `SYSTEM_LOG_RETENTION_DAYS=90` + `:389` kategori istisnasız `systemLog.deleteMany`; iz kaynağı SystemLog AUDIT (`src/services/algorithmTuner.ts:222-231` `getLastWeightChange`) | F-07 (🔴 KARAR-19) |
| G1-16 | Eski kayıtlar için yeniden-rıza politikası (K3) | 🟡 | ❓ DOĞRULANAMADI | Teknik backfill ayağı kartta ✅; kalan = ürün+hukuk politikası (PO onayı, "EN SON"a ertelendi). Koddan karar verilemez | AN-46 → AN-53 |
| G1-18 | Tüm rol/sertifika okumaları TenantMembership'ten mi | ❓ | ⬜ HÂLÂ AÇIK | Kurum-içi sayımda `User.role` okuyan canlı yollar var: `src/services/retentionMetrics.service.ts:48-54` (`user.groupBy by role`, tenantId'li), `src/controllers/adminController.ts:59-63` (kurum KPI rol dağılımı), `src/controllers/adminSettingsController.ts:240-241`. Arama: `git grep "user.groupBy\|user.count({"` backend src | AN-46 → AN-53 (ilgili: P-16 BITTI yalnız mentor-count) |
| G1-20 | findUnique tenant sızıntısı lint kuralı | ⬜ (🔵 v2) | ⬜ HÂLÂ AÇIK | backend `eslint.config.mjs:7-17` yalnız no-explicit-any/no-unused-vars/no-undef; `findUnique`/no-restricted grep 0 | AN-46 → AN-53 |
| G1-21 | X-Tenant-Id yoksa varsayılan kuruma düşme | 🟡 | ❓ DOĞRULANAMADI | Davranış kodda sürüyor: `src/middleware/tenant.ts:29` `headerTenantId \|\| config.defaultTenantId` (JWT çelişkisi `:65` reddediliyor). Kasıtlı mı = PO/güvenlik kararı → PO onayı | AN-46 → AN-53 (ilgili: K-14 notu) |
| G1-23 | logoUrl host/MIME allowlist + CSP | ⬜ | ⬜ HÂLÂ AÇIK (kısmi) | Kapanan: backend `https:` zorunlu `src/services/logoUrl.ts:20` (`tenantController.ts:13,82`, `selfServeController.ts:380`); FE `TenantSwitcher.tsx:4` `isSafeLogoUrl`. Açık: host/MIME allowlist backend'de yok; FE CSP yalnız `Content-Security-Policy-Report-Only` (`frontend/next.config.mjs:31`, engellemez); backend CSP yalnız `/uploads` (`src/server.ts:79`) | F-04 (kuyrukta BITTI — kartın host/MIME+zorlayıcı CSP kapsamıyla çelişir) |
| G1-24 | OAuth accessToken URL sorgusunda | ❓ | ⬜ HÂLÂ AÇIK | `src/controllers/authController.ts:807` redirect params'ında `accessToken`; FE `frontend/src/app/oauth/callback/page.tsx:29` `params.get('accessToken')` | AN-46 → AN-53 |
| G1-25 | createMeeting oryantasyon kilidi tenant-kapsamsız findUnique | ❓ | ⬜ HÂLÂ AÇIK | `src/controllers/meetingController.ts:175-178` `prisma.user.findUnique({ where: { id: mentiId } })` tenantId filtresi yok (çağrı `:202`) | AN-46 → AN-53 (ilgili: V-15) |
| G1-26 | Şüphe formu CAPTCHA + step-up (IP-limit ✅) | 🟡 | ⬜ HÂLÂ AÇIK | `git grep -i "captcha\|turnstile\|recaptcha\|hcaptcha"` backend src + frontend/src → 0 | F-05 |
| G1-27 | Prod yönetici anahtarı rotasyonu | ⬜ | ❓ DOĞRULANAMADI | Operasyonel (Dokploy env); koddan görülemez. Kod yalnız varsayılan-değer guard'ı taşır (`src/config.ts:38-40`) | AN-46 → AN-53 |
| G1-28 | Sunucu/altyapı sertleştirme (yedek/SSH/firewall/SSL) | 🔴 | ❓ DOĞRULANAMADI | Kod dışı altyapı (sunucu erişimi gerekir). Kod ayağı K-14 BITTI | K-14 (kod) · altyapı 01-KARARLAR / 03-PO-ELLE-ISLER |
| G1-29 | Kurum kalıcı silme (yalnız freeze var) | ⬜ | ⬜ HÂLÂ AÇIK | `hardDeleteTenant\|deleteTenant\|tenant.delete` → yalnız taslak-kurum temizlik cron'u `src/services/cronScheduler.ts:214`; platform/superAdmin rotalarında `router.delete` 0 | AN-37 (🔴 KARAR-74) |
| G1-30 | Çerez izni bandı (Consent Mode v2) | ⬜ | ⬜ HÂLÂ AÇIK (bilinçli kilitli) | `git grep -i "CookieBanner\|consent mode\|çerez"` frontend/src → band yok; `frontend/src/app/gizlilik/page.tsx:64-65` "analitik çerez yok"; gtag/GTM/clarity grep 0. PO: çıkışta analitik yok, #110 ile gelir | Y-12 |

### AN-53 · grup B

Kapsam: `docs/raporlar/bilanco/kararlar/G2-eslestirme-psikometri.md`, `G3-icerik.md`. Kod gerçeği = backend `origin/main` (60715c7) + çatı `origin/main`. Salt-okuma.
Açık sayılmayanlar (bakılmadı): kartta ✅ olanlar; ✅'e düzeltilmiş G2-11 (`authController.ts:165-169`) ve G3-19 (PendingTag); 🔵 bilgi notları (G2 md.15, G3-02, G3 Katman-3).
Not: G2-01..05 ve G3-11'i PO 2026-08-28'de "🗑️ geçersiz" işaretledi (DISC→Big Five). Kartta ❓ duruyor, PO kararı olduğu için ❓ (PO) yazıldı.

#### Sayım
| Kart | Açık kalem | ✅ | ⬜ | ❓ |
|---|---|---|---|---|
| G2 | 10 | 0 | 4 | 6 |
| G3 | 17 | 1 | 6 | 10 |
| **Toplam** | **27** | **1** | **10** | **16** |

#### Kalemler
| Kart | Kalem (kısa) | Kartta işaret | Sonuç | Kanıt (dosya:satır / arama) | Kuyruk |
|---|---|---|---|---|---|
| G2 | G2-01 DISC 4×4 matris onayı | ❓ (PO: geçersiz) | ❓ PO onayı | DISC matrisi hâlâ canlı: backend `src/services/scoring.ts:44` DISC_COMPATIBILITY, `:74` kullanım. PO kararı DISC→Big Five (B9); B9 formülü kodda yok | F-11 (KARAR-61) |
| G2 | G2-02 Hard-gate toksik blok onayı | ✅ kod / ❓ onay (PO: geçersiz) | ❓ PO onayı | `scoring.ts:20-26` ANTI_MATCH_RULES; `scoring.config.ts:33` BLOCKED_PAIRS; `scoring.service.ts:35,54` isHardBlocked | F-11 |
| G2 | G2-03 Tiebreak D>I>S>C onayı | ❓ (PO: geçersiz) | ❓ PO onayı | `src/controllers/onboardingController.ts:213-249` DISC_TIEBREAK_ORDER; ⚠️ `temperamentAnalysis.ts:27` farklı sıra "D > I > C > S", yani iki tiebreak var | F-11 |
| G2 | G2-04 Psikometrik gerekçe yok | ❓ (PO: geçersiz) | ❓ PO onayı | `src/services/discLetters.ts:23` "kalibre edilecek" itirafı duruyor | F-11 |
| G2 | G2-05 %60/40 varsayılan onayı | ❓ (PO: geçersiz) | ❓ PO onayı | `scoring.ts:89` DEFAULT_SECTOR_WEIGHT=0.6, `:106` fallback; B9 %45/30/25 yok | F-11 |
| G2 | G2-06 "Varsayılana düşen profil oranı" metriği | ⬜ | ⬜ HÂLÂ AÇIK | `git grep -i -E "fallback(Rate\|Ratio\|Count)\|defaultProfile\|neutral(Rate\|Count)\|(without\|missing\|eksik)(Disc\|Profile)\|discComplet"` backend src+prisma, FE frontend/src: metrik yok. Yalnız istek başına `fallbackLevel` var (`matching.ts:20,209-233`); oran toplanmıyor | yok |
| G2 | G2-07 m101 OCEAN/SJT canlı eşleştirmede okunmuyor | ⬜ | ⬜ HÂLÂ AÇIK | `src/services/matching.ts:1-7` importlarında scoring.service/sector-scorer yok; canlı yol `matchingController.ts:5,132` → `matching.ts:365`; OCEAN'lı yol `scoring.service.ts:169` yalnız `sjtScoringController.ts:5,141` + `sector-scorer.service.ts:110` | F-11 · Y-17 · PS-A1/I-13 |
| G2 | G2-08 md.14 sector-scorer uyuyor | 🟡 | ⬜ HÂLÂ AÇIK | `sector-scorer.service.ts:4,110` yalnız scoring.service'e bağlı; `matching.ts` import etmiyor; `matchingInterface.ts:65-79` yorum satırında | F-11 |
| G2 | G2-09 md.102 CORE eşiği 5 ↔ coreCount | ❓ | ⬜ HÂLÂ AÇIK (tutarsızlık sürüyor) | `src/services/adaptiveTestEngine.ts:22` MIN_CORE_RESPONSES=5, `:129`; `src/controllers/questionController.ts:104,349` coreThreshold (questionService, dinamik). Niyet belgesi yok | yok (⚠️ F-08 "G2-09" başka bir kalem, sektör paydası: numara çakışması) |
| G2 | G2-10 Eşleşme hesaplama tetikleyicisi | ❓ | ❓ ürün/keşif kararı | Tek persist yeri `scoring.service.ts:141` prisma.match.create; canlı liste `matching.ts` her istekte hesaplıyor. Tetik modeli bir karar, koddan çıkarılamaz | AN-45 |
| G3 | G3-01 DISC'e özel "mentiye yaklaşım" içeriği | ⬜ (PO: tasarım tezine bağlı) | ⬜ HÂLÂ AÇIK | `coachingSuggestions` yalnız `adminController.ts:19` import ediyor. `git grep -i -E "approach(Text\|Guide\|Tips)\|yaklaşım (rehber\|önerisi\|metni)\|nasıl yaklaş\|communicationTip\|discTip\|mentorTip\|iletişim ipu"` backend src/prisma + frontend/src: yalnız sertifika seed metni çıkıyor. `DISC_META` (`profile/page.tsx:34`, `DiscBadge.tsx:12`) kişinin kendi tipi, yaklaşım değil | AN-04 (8 yaklaşım metni) |
| G3 | G3-03 Sınırsız yeniden derinleşme davranışı | ❓ | ❓ PO kararı | Kodda kilit yok, her yanıtta vektör yeniden hesaplanıyor: `questionController.ts:335-336,399-400` recalcDiscVector. Doğru davranışın hangisi olduğu ürün kararı | F-11 (triggersOn derinleşme, kısmi) |
| G3 | G3-04 STK-custom soru değeri (canlı ~1) | ❓ DB | ❓ DOĞRULANAMADI (canlı DB + PO) | Mekanizma var: `prisma/schema.prisma:155` STK_CUSTOM, `questionController.ts:43-44,141`. Kullanım sayısı DB'de. PO notu: kalıyor + genişliyor | AN-13 · F-12 |
| G3 | G3-05 Sertifika soru yetkisi gerekçe belgesi | ✅ kod / ❓ belge | ✅ CANLIDA | çatı `docs/kararlar/sertifika-soru-standardi-gerekce-2026-09-21.md` (commit f1884f0, main'de); kod `src/services/certification.service.ts:390` setCertificationTopic yalnız aç/kapa | F-13 (kuyrukta satır yok; `02-ILERLEME.md:674` CANLIDA) |
| G3 | G3-06 DISC canlı soru sayısı (kod 32 ↔ canlı ~20) | ❓ DB | ❓ DOĞRULANAMADI (canlı DB) | Kod: `prisma/seed.ts` 20× `type: 'CORE'` + 12× `type: 'DEEPENING'` = 32. Canlı sayı DB'de | yok (`00-KUYRUK.md:294` not, satır değil) |
| G3 | G3-07 SJT 3→4 mü, belge düzeltme mi | ⬜ | ❓ PO kararı | Kod 3 senaryo: `prisma/seed.ts:533-565` (MENTOR_CORE_01, MENTI_CORE_01, MENTI_FOLLOWUP_N_01). PO G3-11 notu: tasarım B6 ile 30-40 senaryoya çıkıyor, "3→4" sorusu anlamını yitirdi | F-09 |
| G3 | G3-08 Sertifika seed ↔ canlı (20 ↔ ~5) | ⬜ (+❓ DB) | ❓ DOĞRULANAMADI (canlı DB) | `prisma/seed-certification.ts:7` "20 senaryo", 20× competencyScore 3; upsert `:263,:284`, deleteMany yok. Canlı sayı DB'de; seed hâlâ eski 20/80 sürüm | K-16 · P-99 |
| G3 | G3-09 Güvenli sertifika seed runner yok | ⬜ | ⬜ HÂLÂ AÇIK | backend `package.json:16,38` yalnız `"seed"` (tehlikeli seed.ts); seed-certification script yok. Başka yol: `seed-certification.ts:321` doğrudan tsx çalıştırma guard'ı var, ama npm runner değil | K-16 (Not'ta; kendi satırı yok) |
| G3 | G3-10 68 soruluk PO inceleme belgesi boş | ⬜ (PO: tasarım tezine bağlı) | ❓ PO işi | Belge var: çatı `docs/raporlar/icerik/sorular-po-inceleme-2026-08-26.md`. İşaretleme PO'nun işi, koddan doğrulanmaz | yok |
| G3 | G3-11 17 eşleştirme onay noktası | ❓ (PO: geçersiz) | ❓ PO onayı | G2-01..05 ile aynı: `scoring.ts:20,44,89` | F-11 |
| G3 | G3-12 İçerik & soru felsefesi keşfi | ⬜ | ❓ DOĞRULANAMADI (kod dışı keşif) | Kısmi belge var: çatı `docs/raporlar/icerik/bolumler/05-felsefe-motoru.md`. Tamamlanıp tamamlanmadığı koddan ölçülemez | yok |
| G3 | G3-13 Kurum sorusu cevap tipi (answerType) | ⬜ | ⬜ HÂLÂ AÇIK | `prisma/schema.prisma:738-752` Question modelinde answerType yok. `AnswerFormat` yalnız SjtQuestion'da (`schema.prisma:925,936`) | F-12 (KARAR-21) |
| G3 | G3-14 İçerik felsefesi gözlemleri (ters kod vb.) | ⬜ | ⬜ HÂLÂ AÇIK | Question modelinde ters kod alanı yok (`schema.prisma:738-752`); `git grep -i reverse` backend src/prisma: soru bağlamında yok | yok (dolaylı: AN-04 yeni banka) |
| G3 | G3-15 Soru metni yazım hataları | ⬜ | ⬜ HÂLÂ AÇIK | `prisma/seed.ts:70` "güçlüğüm", `:540` "Menteen" duruyor (C20/D20 bakılmadı) | AN-02 (satır no'ları ±1 kaymış: 69/537) |
| G3 | G3-16 Global içerik seed'i ana Neon'a | ⬜ | ❓ DOĞRULANAMADI (canlı DB) | Seed dosyaları var: `prisma/seed-learning-journey.ts`, `seed-certification.ts`. Canlı dolu mu, DB'de | K-18 · K-16 (`00-KUYRUK.md:294` notu) |
| G3 | G3-17 Öğrenme yolculuğu kalan uçları | ❓ | ⬜ HÂLÂ AÇIK (yarım) | STK düzenleme VAR: `src/routes/learningJourneyAdminRoutes.ts:26-38` + FE `frontend/src/lib/api/learningJourney.ts:115-122`. DISC tonu YOK: `learningJourney.service.ts` içinde `discType\|tone` grep boş. Test var: `tests/learning-journey.test.ts`. İçerik onayı PO'da | K-18 · I-17 · P-08 (kısmi) |
| G3 | G3-18 6 canlı teyit kuyruğu | ❓ DB | ❓ DOĞRULANAMADI (canlı DB) | Canlı sayılar DB'de; koddan çıkmaz | yok (`00-KUYRUK.md:294` not, satır değil) |

Not: çatı `origin/main` backend pointer'ı b6418c2, backend `origin/main` HEAD 60715c7 (IC-11 merge). Pointer bump'ı bekliyor olabilir; bu tur doğrulanmadı.

### AN-53 · grup C

Kod gerçeği = origin/main (çatı `7c5a7d7`, backend `60715c7`). Backend yolları `backend/` altında, frontend yolları çatı reposunda.
Kapsam: 🔵 işaretli kalemler (G4-07, G4-20, G4-21, G5-03) açık sayılmadı (görev ⬜/🟡/❓/🔴 dedi). Kartta sonradan "✅ DÜZELTME" almış G4-02, G4-04 sayılmadı. Kart gövdesi açık, "KOD DOGRULAMA NOTU"nda ✅ yazan kalemler (G4-01/14/22/23/24/31/39, G5-04) SAYILDI ve yeniden doğrulandı.
Aramalar: `git grep -n -i` (harf duyarsız), backend `src prisma`, frontend `frontend/src`; gerektiğinde iki dilli (mentor/mentör, tenant/kurum, meeting/görüşme).

#### Sayım
| Kart | Açık kalem | ✅ | ⬜ | ❓ |
|---|---|---|---|---|
| G4a-panel-akis | 16 | 5 | 7 | 4 |
| G4b-panel-akis | 18 | 7 | 9 | 2 |
| G5-bildirim-mail | 6 | 1 | 3 | 2 |
| **Toplam** | **40** | **13** | **19** | **8** |

#### Kalemler
| Kart | Kalem (kısa) | Kartta işaret | Sonuç | Kanıt (dosya:satır / arama) | Kuyruk |
|---|---|---|---|---|---|
| G4a | G4-01 Havuz KART görünümü | ⬜ | ✅ CANLIDA | `frontend/src/app/(dashboard)/menti/page.tsx:305-347` (grid kart + %uyum + "Neden uyumlu", DISC gösterilmez) | yok (F-10, arşivlenmiş satır) |
| G4a | G4-03 Manuel eşleştirme | ❓ | ❓ DOĞRULANAMADI | PO kararı "geçersiz/YOK" verilmiş; kod bu kararla uyumlu: `manual.*pair\|createPair\|manualMatch` backend/src 0 eşleşme. Kapanış PO onayı + belge işi | yok |
| G4a | G4-05 adminSettings izolasyon deseni | ⬜ | ✅ CANLIDA | `backend/src/controllers/adminSettingsController.ts:4,11,67-76` → merkezî `backend/src/middleware/tenantAdminAuth.ts:23-34` (isActive + aud kontrolü) | F-23 (BITTI) / GV-11 |
| G4a | G4-06 "çok yakın" BÜYÜK harf eşiği kalibrasyonu | ❓ | ❓ DOĞRULANAMADI | Eşik kodda var `backend/src/services/discLetters.ts:23,29,77` (`uppercaseRatioOfPrimary`, "başlangıç değeri, kalibre edilecek"); kesin değer canlı veri + PO kararı ister | yok |
| G4a | G4-08 Platform tek-kullanıcı drill-down | ⬜ (🟡) | ⬜ HÂLÂ AÇIK | `backend/src/routes/platformRoutes.ts:57-60` yalnız overview/members/meetings/analytics; `users/:userId` platform rotası 0; `MembersTable.tsx:48` tek onClick = rol filtresi | F-24 (BEKLIYOR) |
| G4a | G4-09 Mükerrer super-admin API | ❓ | ⬜ HÂLÂ AÇIK | `backend/src/server.ts:110` `/api/super-admin` hâlâ bağlı; `backend/src/routes/superAdminRoutes.ts:14-19` 4 uç; `super-admin` frontend/src 0 eşleşme. Keşif/karantina yapılmamış | K-13 |
| G4a | G4-10 setVisibilityOptIn sil/bağla/ertele | ❓ | ❓ DOĞRULANAMADI | Uç `backend/src/routes/userRoutes.ts:95` → `matchingController.ts:149`; frontend/src çağıran 0. Sil/bağla kararı PO'da | K-13 (+I-10/I-16 VisibilityOptIn) |
| G4a | G4-11 Anomali tespiti v2 + alarm bandı | 🟡 | ⬜ HÂLÂ AÇIK | v1: `backend/src/services/abuseDetection.service.ts:2,14-15`; liste `frontend/src/app/platform/dashboard/page.tsx:533-537`. v2/banner yok (PO: "v1 yeterli") | yok |
| G4a | G4-12 Platform büyüme trendi | ⬜ | ⬜ HÂLÂ AÇIK | `getPlatformStats` (`platformController.ts:75`) içinde `req.query/gte/trend/series/lastLogin` 0; `trend\|büyüme` frontend/src/app/platform 0 | yok |
| G4a | G4-13 Platform ayarlar UI | ⬜ (🔴) | ⬜ HÂLÂ AÇIK | `frontend/src/app/platform` altında yalnız dashboard/login/tenants/[id] sayfaları; `platformSetting\|PlatformConfig` backend 0 | yok |
| G4a | G4-14 Sistem sağlığı mail probe | 🟡 | ✅ CANLIDA | `backend/src/controllers/platformController.ts:150-153` `verifyTransporter()` gerçek SMTP handshake | yok (F-25, satır yok) |
| G4a | G4-15 `reviewedBy='platform-admin'` sabit | ⬜ | ⬜ HÂLÂ AÇIK | `backend/src/controllers/platformController.ts:538` hâlâ sabit metin | AN-38 (🔴 KARAR-87) |
| G4a | G4-16 user-reports 200 tavan | ⬜ | ✅ CANLIDA | `backend/src/controllers/reportController.ts:82,90,95` limit/offset/total | AN-39 (BITTI) |
| G4a | G4-17 `PLATFORM_ADMIN_EMAIL` .env.example | ⬜ | ✅ CANLIDA | `backend/.env.example:18-20`; eksikse uyarı `backend/src/config.ts:44-55` | yok |
| G4a | G4-18 Fotoğraf zorunluluğu | 🟡 | ❓ DOĞRULANAMADI | PO kararı ("şimdilik opsiyonel, zorunluluk sonra"); ürün kararı, koddan kapanmaz | yok |
| G4a | G4-19 Premium/`Tenant.plan` limitleri | ⬜ (❓) | ⬜ HÂLÂ AÇIK | `backend/prisma/schema.prisma:194` alan var; kullanım yalnız select/göster (`selfServeController.ts:287,357`, `platformController.ts:282`); plan-bazlı kısıt 0 | yok |
| G4b | G4-22 Menti bekleme anı | ⬜ | ✅ CANLIDA | `frontend/src/app/(dashboard)/menti/page.tsx:213-245` bekleme odası + `:256` LearningJourneyCard (PR #228) | yok (F-15, satır yok) |
| G4b | G4-23 Umut sinyali / sosyal kanıt | ⬜ | ✅ CANLIDA | statik sinyal `menti/page.tsx:231-235`; mentör sayısı ≥3 `:219-224`. ⚠️ "N kişi bekliyor" akran sayısı YOK → ayrı satırda açık | AN-21 (🔴 KARAR-56) / P-06 |
| G4b | G4-24 Menti özgüven sunumu | ⬜ | ✅ CANLIDA | `frontend/src/components/organisms/DiscRecallCard.tsx:38,98-101` | yok (F-16, satır yok) |
| G4b | G4-25 Reddi yumuşat + küçük kutlama | ⬜ | ⬜ HÂLÂ AÇIK | Ret hâlâ çıplak: `frontend/src/app/(dashboard)/meetings/page.tsx:27` "İptal Edildi" destructive; `alternatif` 0. Kutlama kısmı var (`frontend/src/lib/milestones.ts:2`, `meeting-checkin/page.tsx:96`) | F-17 → P-05 (🔵) / I-16 |
| G4b | G4-26 Mentör rozet çeşitliliği | ⬜ | ⬜ HÂLÂ AÇIK | `rozet\|badge` frontend/src: yalnız sertifika rozeti (`mentor/page.tsx:190-198`); "5 görüşme/yılın mentörü" 0 | yok |
| G4b | G4-27 Mentör kapasite sınırı | ⬜ | ⬜ HÂLÂ AÇIK | `maxMenti\|capacity\|kapasite\|maxActive` backend/src + prisma 0 | P-15 (🔴 KARAR-41) |
| G4b | G4-28 Mentör "kendi etkim" (toplam saat) | 🟡 | ✅ CANLIDA | `backend/src/controllers/mentorMetricsController.ts:26,50,62` `totalMentoringHours`; `frontend/src/app/(dashboard)/mentor/page.tsx:47` "Mentörlük Saati" | yok (P-11, satır yok) |
| G4b | G4-29 Mentör sektör filtresi | 🟡 | ⬜ HÂLÂ AÇIK | `sector` `backend/src/controllers/mentorFilterController.ts` 0 eşleşme; sektör yalnız gösterim (`mentor/page.tsx:287,318`) | yok |
| G4b | G4-30 Yönetici rapor export | ⬜ | ⬜ HÂLÂ AÇIK | `text/csv\|xlsx\|pdfkit\|jspdf\|exportReport` frontend/src + backend/src 0 | F-18 (BEKLIYOR) / AN-22 |
| G4b | G4-31 Proaktif kırmızı uyarı | 🟡 (⬜) | ✅ CANLIDA | `frontend/src/app/(admin)/admin/kpi/page.tsx:28,40` + `frontend/src/lib/adminAlerts.ts:2` (PR #231) | yok (F-19, satır yok) |
| G4b | G4-32 STK zaman serisi KPI | 🟡 | ⬜ HÂLÂ AÇIK | `trend\|ivme\|weekly\|series` admin/kpi 0; `retentionMetrics.service.ts:134` yalnız anlık oran | yok |
| G4b | G4-33 Yönetici önizleme-demo | ⬜ | ⬜ HÂLÂ AÇIK | `önizleme\|preview\|demo` onboarding/stk + (admin): yalnız marka önizlemesi (`branding/page.tsx:173`); eşleşme önizlemesi 0 | yok |
| G4b | G4-34 İki-aha modeli | ❓ | ❓ DOĞRULANAMADI | Wizard var (`onboarding/stk/_steps/Step1..5`); "canlı-veri aha" tanımı ürün kararı, kod tek başına yetmez | yok |
| G4b | G4-35 Member persona şablon ekranı | ⬜ | ⬜ HÂLÂ AÇIK | `MEZUN\|GONULLU\|persona` onboarding/stk dışında 0 (yalnız davet metni `admin/invite/page.tsx:15`) | yok |
| G4b | G4-36 Menti/mentör "sevdirme" deneyimi | ⬜ | ❓ DOĞRULANAMADI | Kapsam tanımsız; parçalar canlı (bekleme sinyali, özgüven tonu, kilometre taşı kutlaması, paylaşım kartı) ama "persona-temelli akış" ölçütü yok | yok |
| G4b | G4-37 Kurum sosyal kanıt duvarı + Etki kartı | ⬜ | ⬜ HÂLÂ AÇIK | `etki kart\|impact\|sosyal kanıt\|social-proof\|wall` frontend/src/app 0 | yok |
| G4b | G4-38 Ters çekim büyüme kanalı (md.116) | ⬜ | ⬜ HÂLÂ AÇIK | `refer\|kurumunu.*davet\|ters çekim` frontend/src 0 | yok |
| G4b | G4-39 "Görüşme tamamladım" paylaşım kartı | 🟡 | ✅ CANLIDA | `frontend/src/app/(dashboard)/meetings/page.tsx:114` (PR #226) | yok (F-22, satır yok) |
| G5 | G5-01 Kurum mail bayrağını açma | ⬜ (🔴 blokör) | ❓ DOĞRULANAMADI | Kod hazır, varsayılan kapalı: `backend/src/config.ts:135`, `.env.example:65-68`. Prod env değeri Dokploy'da — koddan görülmez | DK-02 (bağımlı) + 03-PO B5 |
| G5 | G5-02 Kurum onay/ret maili + destek@ + prod PLATFORM_ADMIN_EMAIL | 🟡 (🔴 blokör) | ❓ DOĞRULANAMADI | Şablon `backend/src/services/tenantNotifications.ts:30,84`; `destek@` yalnız yorumda (`config.ts:133`); prod env + metin için PO onayı | DK-02 (🟡, PO onayı) + 03-PO B4 |
| G5 | G5-04 Bekleme salonu bildirim izni | ⬜ | ✅ CANLIDA | `frontend/src/components/organisms/NotificationOptInButton.tsx:60`; `menti/page.tsx:243` (PR #218) | yok (F-20, satır yok) |
| G5 | G5-05 Ürün geri bildirim mekanizması | ⬜ | ⬜ HÂLÂ AÇIK | Genel akış 0 (`FeedbackButton\|productFeedback\|/api/feedback` frontend+backend 0; `app/bildir/page.tsx` yalnız şüphe). Şüphe maili artık VAR: `suspicionController.ts:23` | F-31 → AN-52 |
| G5 | G5-06 Mentör bildirim ritmi | ⬜ | ⬜ HÂLÂ AÇIK | `throttle\|cadence\|ritim\|digest` backend/src/services: ilgisiz tek eşleşme (refreshToken) | yok |
| G5 | G5-07 Gerçek push (Expo/FCM) | 🔵/⬜ | ⬜ HÂLÂ AÇIK | `backend/src/services/notificationService.ts:52-54` hâlâ stub, `sent: true` | yok (AN-09 Not'u OB-09'u kapsam dışı bırakmış) |

### AN-53 · grup D

Kapsam: G6-veri-modeli-borc.md · G7-ux-tasarim.md · G8-altyapi-po-manuel.md. Kod gerçeği = `origin/main` (çatı + backend, 2026-09-26 fetch).
Açık sayılan: kart gövdesinde ⬜/🟡/❓/🔵 olan her kalem (gövdeye sonradan "✅ YAPILDI" notu eklenmiş olsa da gövde işareti açıksa dahil edildi: G6-07, G7-12, G7-13). "Zaten yapılmışlar" bölümündeki ✅'lere bakılmadı.

#### Sayım
| Kart | Açık kalem | ✅ | ⬜ | ❓ |
|---|---|---|---|---|
| G6 | 7 | 2 | 4 | 1 |
| G7 | 14 | 4 | 6 | 4 |
| G8 | 14 | 3 | 4 | 7 |
| **Toplam** | **35** | **9** | **14** | **12** |

#### Kalemler
| Kart | Kalem (kısa) | Kartta işaret | Sonuç | Kanıt (dosya:satır / arama) | Kuyruk |
|---|---|---|---|---|---|
| G6 | G6-01 N+1 konuşma listesi + sayfalama | ⬜ | ⬜ HÂLÂ AÇIK (yarım) | Sayfalama VAR: backend `src/controllers/conversationController.ts:21-26,262` (limit 30/tavan 100). N+1 SÜRÜYOR: aynı dosya `:277-290` `convos.map` içinde her konuşmaya ayrı `message.count` + `message.findFirst` (sayfa başı ≤2×limit sorgu). "tek aggregate/JOIN" yapılmadı | F-27 (arşiv, BITTI: "tek sorguda + sayfalı" — tek-sorgu ayağı kodla çelişiyor) |
| G6 | G6-02 String→enum + çift rol | ⬜ | ⬜ HÂLÂ AÇIK | backend `prisma/schema.prisma:194,196,197,210` (Tenant), `:596-605` (MeetingCheckIn), `:1193,1195` (UserReport), `:1238-1239` (MentorshipAgreement), `:1277-1278` (InvitationTemplate) hâlâ `String`; çift rol `:267 role UserRole` + `:1105` TenantMembership.role | yok (madde 49 bilerek satır açılmadı: `00-KUYRUK.md:385`; P-16 yalnız bir sayım ayağı) |
| G6 | G6-03 onDelete stratejisi / dolu tenant silme | ⬜ | ⬜ HÂLÂ AÇIK (yarım) | `schema.prisma` 83 `@relation(` / 22 `onDelete`; migration `20260830100000_add_restrict_fks` (5 FK, hepsi RESTRICT). `src/services/cronScheduler.ts:200-215` anlaşmalı taslak tenant'ı atlıyor, dolu tenant silme yolu yok (arama `tenant.delete` → yalnız :214) | `00-KUYRUK.md:291` "G6-03(onDelete) ✅" — kodla kısmen çelişiyor |
| G6 | G6-04 User.email global unique + Meeting index | ❓ | ❓ DOĞRULANAMADI — PO/mimari kararı | `schema.prisma:268 email String @unique` (global) hâlâ; Meeting index'leri mevcut (`@@index` ×7, Meeting modeli). Kasıtlı mı borç mu = PO onayı | yok |
| G6 | G6-05 Sayfa metni merkezileştirme | ⬜ | ✅ CANLIDA | çatı `frontend/src/lib/uiText.ts:2` (F-28/G6-05 sözlüğü); 27 dosya import ediyor | F-28 (BITTI) |
| G6 | G6-06 validate() + cookie helper + PII-select | ⬜ | ⬜ HÂLÂ AÇIK (yarım) | validate ✅: backend `src/middleware/validate.ts:22` `validateRequest`, 29 dosya kullanıyor, `.safeParse(` 10/6 dosyaya indi. Cookie helper DUPLİKE: `src/controllers/authController.ts:74` + `src/controllers/selfServeController.ts:36` (ikisi de `setRefreshCookie`). PII-select ortaklaşmadı: `select:{… email: true` satır içi 29 yer (`src/`) | Y-03 (yalnız validate ayağı, BITTI); cookie + PII-select: yok |
| G6 | G6-07 Kullanılmayan 5 @radix-ui | ⬜ (+YAPILDI notu) | ✅ CANLIDA | çatı `frontend/package.json:15-16` yalnız react-label + react-slot | `00-KUYRUK.md:289` (Faz1 ✅) |
| G7 | G7-01 Ekran okuyucu noktasal düzeltmeler | ⬜ | ✅ CANLIDA | `frontend/src/components/organisms/DailyQuestionWidget.tsx:83-93` radiogroup/radio/aria-checked; `ReportUserButton.tsx:68-70` role=dialog/aria-modal | F-21 (BITTI) |
| G7 | G7-02 DISC renkleri açık temada kontrast | ⬜ | ⬜ HÂLÂ AÇIK (yarım) | 500→600 tonuna çekildi ama açık temada `text-yellow-600` (#CA8A04 ≈2.9:1) ve `text-green-600` (#16A34A ≈3.3:1) beyaz zeminde AA 4.5:1 altında: `frontend/src/components/atoms/DiscBadge.tsx:14-15`, `app/(dashboard)/mentor/page.tsx:30-31`, `app/(admin)/admin/questions/page.tsx:15`, `app/(dashboard)/profile/page.tsx:37` | K-10 (BITTI, yalnız KOYU mod) · F-21 (BITTI, DISC kontrastı K-10'a devretmiş) → açık tema ayağı için satır YOK |
| G7 | G7-03 SEO teknik paketi | ⬜ | ✅ CANLIDA | `frontend/src/app/sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `icon.tsx`, `apple-icon.tsx` var; `app/layout.tsx:36` metadataBase; `:59` `lang="tr-TR"` | F-29 (arşiv), Y-09, Y-13 (BITTI) |
| G7 | G7-04 www → apex 301 | ⬜ | ✅ CANLIDA | `frontend/src/middleware.ts:23` WWW_HOST, `:35` `NextResponse.redirect(url, 301)` | `00-KUYRUK.md:290` (Faz3 ✅) |
| G7 | G7-05 GTM/GA4/Clarity kodu | ⬜ | ⬜ HÂLÂ AÇIK (PO kararıyla bilinçli bekliyor) | arama `googletagmanager|gtag(|dataLayer|clarity.ms|GA_MEASUREMENT|NEXT_PUBLIC_GTM`, harf duyarsız, `frontend/src` → 0. Kartta PO notu: çıkışta analytics YOK | Y-12 (BEKLIYOR) |
| G7 | G7-06 Çıkışta GA kullanılsın mı | ❓ | ❓ DOĞRULANAMADI — PO onayı | Kart PO notu "çıkışta analytics OLMAYACAK"; ürün kararı, koddan onaylanamaz | Y-12 |
| G7 | G7-07 GTM+GA4 canlı sonrası kontrol | 🔵 | ❓ DOĞRULANAMADI — canlı ortam + PO ertelemesi | Ölçüm kodu yok (G7-05); kontrol canlı deploy sonrası PO işi | yok (Y-12 komşu) |
| G7 | G7-08 Kurumsal sayfalar + footer/nav/yukarı-çık/WhatsApp/JSON-LD | ⬜ | ❓ DOĞRULANAMADI — kalan ayak PO içeriği (KARAR-88) | VAR: `frontend/src/components/molecules/SiteFooter.tsx:15`, `atoms/ScrollToTopButton.tsx:26` (`app/layout.tsx:71` mount), JSON-LD (`__tests__/json-ld.test.tsx`, Y-10). YOK: hakkimizda/iletisim/about/contact dosyası (ls-tree, harf duyarsız → 0); yüzen WhatsApp düğmesi yok (yalnız `admin/invite/page.tsx:39,77` şablon) | Y-07 (🔴 KARAR-88), Y-10 (BITTI), Y-11 (🔴 KARAR-88, yukarı-çık ayağı BITTI) |
| G7 | G7-09 WCAG 2.1 AA bütünsel denetim | ⬜ | ⬜ HÂLÂ AÇIK | Sistematik denetim raporu yok: `docs` ağacında `wcag|erisilebilir|a11y|accessib` dosya adı → 0; F-21 yalnız noktasal düzeltme, kendi notu "Kalan: role=alert" | F-21 (BITTI işaretli — bütünsel denetim ayağı yapılmadı) |
| G7 | G7-10 Landing UX paketi (ipucu, tıklanabilirlik, mobil, AlgorithmBento) | ⬜ | ❓ DOĞRULANAMADI — kalem tanımı somut değil | "i" ikonu / "mantık hatası" / "tutarsızlık" hangi öğe belirtilmemiş; koddan tek tek karşılaştırılamaz. `_sections/AlgorithmBento.tsx` mevcut | yok |
| G7 | G7-11 Landing koyu/açık tema | ⬜ | ⬜ HÂLÂ AÇIK | `frontend/src/app/_sections` içinde `dark:` sınıfı 0; landing sabit koyu (`app/page.tsx:50` `bg-slate-950`) | yok |
| G7 | G7-12 Hero slogan | ⬜ (+YAPILDI notu) | ✅ CANLIDA | `frontend/src/app/_sections/HeroSection.tsx:38-44` "Mentörlük programınızı zahmetsizce yönetin"; SEO başlığı da güncel `app/page.tsx:23`. (Alt metin PO'ca kesinleşmedi — ayrı) | `00-KUYRUK.md:289` (Faz1 ✅) |
| G7 | G7-13 Yumuşak lacivert landing teması | ⬜ (+belge YAPILDI) | ⬜ HÂLÂ AÇIK (kod) | `docs/kararlar/konu/06-tasarim-ux.md:15` "🟢 ⏳ (uygulanmadı)"; 2026-08-28 sonrası `_sections` commit'leri palet değiştirmiyor (Y-06/09/10 SEO/footer); `_sections` hâlâ `bg-slate-9xx` | `00-KUYRUK.md:289` "G7-13 ✅" — yalnız belge yönü; kod ayağı için satır YOK |
| G7 | G7-14 Konuşma listesi sanallaştırma | ⬜ | ⬜ HÂLÂ AÇIK | arama `react-window|virtuoso|react-virtual|virtualiz|sanallaş`, harf duyarsız, `frontend/src` + `frontend/package.json` → 0 | yok |
| G8 | G8-01 Foto kalıcı disk (volume) | ⬜ | ❓ DOĞRULANAMADI — Dokploy canlı ayarı | Repo `docker-compose.yml:23-24,105-106` yalnız `postgres_data`; uploads volume YOK. Dokploy UI'da tanımlı mı koddan görülmez | K-04 (arşiv) · `03-PO-ELLE-ISLER.md:43` A1 / `:74` #1 |
| G8 | G8-02 UPLOAD_DIR + BACKEND_URL/NEXT_PUBLIC_API_URL teyidi | ⬜ | ❓ DOĞRULANAMADI — canlı env | `docker-compose.yml:65` BACKEND_URL, `:90` NEXT_PUBLIC_API_URL geçiriliyor; UPLOAD_DIR compose'da yok, kod `backend src/config.ts:163` env'den okuyor (yoksa `./uploads`) | K-04 (arşiv) · `03-PO-ELLE-ISLER.md:84` #6 |
| G8 | G8-03 Chat canlı uçtan uca test | ⬜ | ❓ DOĞRULANAMADI — canlı PO gözlemi | Koddan test edilemez | yok (`03-PO-ELLE-ISLER.md:107` #14) |
| G8 | G8-04 Mentör paneli metrikleri canlı gözlem | ⬜ | ❓ DOĞRULANAMADI — canlı PO gözlemi | Koddan test edilemez | yok (`03-PO-ELLE-ISLER.md:108` #15) |
| G8 | G8-05 `.env.backup-anaDB` sil | ⬜ | ✅ (lokal disk) | `ls -a /home/ajan/menti/backend` → yalnız `.env.example`, `.env.test.example`; `.env.backup-anaDB` YOK (gitignored dosya, origin/main'de hiç yoktu) | yok |
| G8 | G8-06 Birleşmiş dal/worktree temizliği (uzak dallar) | 🟡 | ⬜ HÂLÂ AÇIK | `git ls-remote --heads origin`: çatı 149 dal (kartın adayları `chore/pointer-bump-52`, `feat/kalibrasyon-aktor-izi-fe` hâlâ var), backend 90 dal; `git worktree list` 34 satır (`.claude/worktrees/agent-*`) | yok |
| G8 | G8-07 Staging ortamı | ⬜ | ❓ DOĞRULANAMADI — dış altyapı (Dokploy/Neon) | Repo'da iz yok: `staging` arama (dosya adı + `docker-compose.yml`, `.github`, `scripts`, `frontend/src`, backend `src`) → 0. Dokploy'da ayrı uygulama olup olmadığı koddan görülmez | yok |
| G8 | G8-08 İzole test DB (TEST_DATABASE_URL + Neon dalı) | 🟡 | ❓ DOĞRULANAMADI — dış servis (Neon) | Guard var: backend `tests/helpers/assertTestDatabase.ts`; CI ephemeral Postgres `.github/workflows/ci.yml:119,188`. Lokal: `TEST_DATABASE_URL` env yok, `backend/.env.test` dosyası yok (yalnız `.env.test.example`). Kalıcı Neon test dalı koddan doğrulanamaz | yok (KR-14 yalnız guard) |
| G8 | G8-09 DB bağlantı havuzu + seri mail | ❓ | ❓ DOĞRULANAMADI — canlı env | `connection_limit|pool_timeout|connectionLimit` backend `src`+`prisma` → 0 (DATABASE_URL parametresinde olabilir, env). Mail seri doğrulandı: `src/services/cronScheduler.ts:255-257` for-döngüsünde `await sendFeedbackReminderEmail` | AN-06 (BEKLIYOR) |
| G8 | G8-10 Eşleştirme önbelleği yok + take:500 | ⬜ | ⬜ HÂLÂ AÇIK | backend `src/services/matching.ts:178,434` `take: 500`; yorum `:176,:432` "Kapsayıcılık AN-07 işidir"; cache yok | AN-07 (BEKLIYOR) |
| G8 | G8-11 Rate limiter in-memory (Redis) | ⬜ | ⬜ HÂLÂ AÇIK (yarım) | backend `src/middleware/rateLimiter.ts:14` `new Map` (bellek içi); `redis` backend `src`+`package.json` → 0. Kamu uçlarında tenant-anahtar zayıflığı K-14 ile giderildi (`:37`) | K-14 (BITTI, yalnız anahtar ayağı); Redis ayağı: yok |
| G8 | G8-12 Cron çok-instance çift çalışma | ⬜ | ⬜ HÂLÂ AÇIK | `advisory|lock|leader|INSTANCE` backend `src/services/cronScheduler.ts` → 0. (Tek instance ise risk yok — topoloji PO teyidi) | AN-06 (BEKLIYOR) |
| G8 | G8-13 Sekme geçiş yavaşlığı | ❓ | ✅ CANLIDA | `frontend/src/lib/queryCache.ts`; `hooks/useQuery.ts:20,66` önbellek kullanıyor | F-32 (BITTI) |
| G8 | G8-14 Sol-alt kullanıcı kartı | ❓ | ✅ CANLIDA | `frontend/src/components/molecules/UserCard.tsx`; `components/organisms/DashboardNav.tsx:8,112` mount; `app/(dashboard)/layout.tsx:2` | F-33 (BITTI) |

### AN-53 · grup E

Kod gerçeği = origin/main (backend `60715c7` = çatı pointer'ı). Kapsam: G9-belge-surec.md, G10-olu-kod-terk.md, G11-urun-stratejisi.md.
Açık sayılan: ⬜ 🟡 ❓ 🔴 + 🔵 (bilinçli ertelenmiş, yapılmamış). Dışarıda bırakılan: ✅ kalemler, G10-19 (kartta "✅ KARAR verildi", KARAR-32), G10-23 (❓→🗑️ çözüldü), G9 "tekil operasyonel not" 🗑️'leri (kart değil).

#### Sayım
| Kart | Açık kalem | ✅ | ⬜ | ❓ |
|---|---|---|---|---|
| G9 | 4 | 0 | 3 | 1 |
| G10 | 17 | 0 | 12 | 5 |
| G11 | 2 | 0 | 0 | 2 |
| **Toplam** | **23** | **0** | **15** | **8** |

#### Kalemler
| Kart | Kalem (kısa) | Kartta işaret | Sonuç | Kanıt (dosya:satır / arama) | Kuyruk |
|---|---|---|---|---|---|
| G9 | G9-06 durum-panosu tarihli ad tarihsizleştir | 🟡 | ⬜ HÂLÂ AÇIK | `docs/kararlar/oz-denetim/durum-panosu-2026-08-14.md` hâlâ tarihli adla duruyor (`git ls-tree origin/main docs`); 📸 kısmı yapılmış (satır 3 "📸 DONDURULMUŞ") | F-01 |
| G9 | G9-07 OneDrive → yerel disk taşıma | 🟡 | ❓ DOĞRULANAMADI | PO'nun yerel makine adımı; repodan görülemez. `grep -i OneDrive` 00-KUYRUK.md + 03-PO-ELLE-ISLER.md = boş | yok |
| G9 | G9-11 5 taşıyıcı belge + 38 referans reorg | 🟡 | ⬜ HÂLÂ AÇIK | `docs/kararlar/{00-INDEX,00-KARAR-TAKIP,09-DURUM,10-yol-haritasi}.md` hâlâ kök `docs/kararlar/` altında (`git ls-tree origin/main docs/kararlar/`) | F-01 |
| G9 | G9-12 büyük belge reorg (~68 belge) | ⬜ | ⬜ HÂLÂ AÇIK | Belge-içi iş; G9-11 taşıması yapılmamış → üst iş de açık (kanıt yukarıdaki ls-tree) | F-01 |
| G10 | G10-01 ölü demet: (c) MeetingScheduler (a ✅, b geçersiz) | 🟡 | ⬜ HÂLÂ AÇIK | `frontend/src/components/organisms/MeetingScheduler.tsx` duruyor, import 0 (`git grep MeetingScheduler origin/main -- frontend/src`). ⚠️ İkame VAR: `frontend/src/app/(dashboard)/mentor/availability/page.tsx` + `book-meeting/page.tsx` → `lib/api/meetings.ts:114,117` `/api/meetings/availability` → bu MÜKERRER kod (silme protokolü), "eksik özellik" değil | K-13 |
| G10 | G10-02 `VisibilityOptIn.requestMessage` DROP | 🔵 | ⬜ HÂLÂ AÇIK | `prisma/schema.prisma:407` kolon duruyor; yazan yok (`matchingController.ts:197` upsert'te yok), yalnız `gdprService.ts:217` anonimleştirme | AN-40 |
| G10 | G10-03 `matchingInterface.ts` Job Board | 🔵 | ⬜ HÂLÂ AÇIK | `src/services/matchingInterface.ts` var; `git grep matchingInterface origin/main -- src` = yalnız dosyanın kendisi (0 import) | AN-40 |
| G10 | G10-04 checkpoint cron LOG-ONLY | 🟡 | ⬜ HÂLÂ AÇIK | `src/services/cronScheduler.ts:398,415-422` "AŞAMA 1 = LOG-ONLY", yalnız `logger.info`; bildirim yok | AN-40 (AN-26 ayrı hatırlatma işi) |
| G10 | G10-05 Feedback alanları yazılmıyor | 🟡 | ⬜ HÂLÂ AÇIK | `src/controllers/feedbackController.ts:177-196` engagement/goalClarity/periodic* alanları destructure ile dışlanıyor | AN-40 |
| G10 | G10-06 ContextualFeedbackHost/MeetingProvider mount | ⬜ | ⬜ HÂLÂ AÇIK | `git grep "ContextualFeedbackHost\|MeetingProvider\|useMeeting" origin/main -- frontend/src` = yalnız kendi dosyaları (`ContextualFeedbackHost.tsx:3,24`, `context/MeetingContext.tsx`). Kısmi ikame: `app/(dashboard)/periodic-survey/page.tsx:54` `/api/meetings/:id/feedback` | AN-40 |
| G10 | G10-08 `UserProfile.qualityMultiplier` ikiz DROP | ❓ | ❓ DOĞRULANAMADI (PO onayı) | Kod: `prisma/schema.prisma:1017` (UserProfile) duruyor; okuma yok — canlı kaynak `schema.prisma:1112` TenantMembership + `scoring.ts:127` feedback'ten hesap. DROP = migration + PO kararı | AN-40 |
| G10 | G10-10 `PATCH /users/me/social` bilinçli mi terk mi | ❓ | ❓ DOĞRULANAMADI (PO onayı) | `src/routes/onboardingRoutes.ts:42` + `onboardingController.ts:542` canlı; FE çağrısı yok (`git grep me/social origin/main -- frontend/src` boş). İkame: `/api/users/me/profile` (`src/services/socialUrl.ts:6`) → mükerrer; niyet kararı PO | K-13 |
| G10 | G10-11 `/users/:id/self-profile` mükerrer mi | ❓ | ❓ DOĞRULANAMADI (PO onayı) | `src/routes/userRoutes.ts:120-122` var; FE çağrısı 0 (`git grep self-profile origin/main -- frontend/src` boş); `me/profile` ile işlev örtüşmesi → PO/triyaj | AN-13 |
| G10 | G10-12 `/clubs` FE bağla (PO: aktif) | ⬜ | ⬜ HÂLÂ AÇIK | `src/server.ts:125` `app.use('/api/clubs')`; FE: `git grep -niE "club" origin/main -- frontend/src/lib frontend/src/app` (api/fetch) = 0 | yok (yalnız Y-04 sayfalama, FE bağlama değil; G1-13 satırı yok) |
| G10 | G10-13 `/feedback-logs` + `/combination-scores` FE paneli | ❓ | ❓ DOĞRULANAMADI (PO onayı) | `src/server.ts:124`, `src/routes/feedbackLogRoutes.ts:22-24`; FE çağrısı 0 (`git grep "feedback-logs\|combination-scores" origin/main -- frontend/src` boş). Ürün mü/ertele mi = PO | yok (Y-04 yalnız sayfalama) |
| G10 | G10-14 `/rematch` admin FE aksiyonu | ⬜ | ⬜ HÂLÂ AÇIK | `src/routes/adminRoutes.ts:56` POST `/users/:id/rematch`; FE'de çağrı yok (`git grep -n rematch origin/main -- frontend/src` → yalnız `lib/adminAlerts.ts:20,55` KPI uyarısı + testler) | AN-13 |
| G10 | G10-15 toplu `/questions/respond` | ⬜ | ⬜ HÂLÂ AÇIK | `src/routes/questionRoutes.ts:46` var; FE yalnız tek-soru `frontend/src/lib/api/discTest.ts:32` | AN-40 |
| G10 | G10-18 `enneagramWing` tüketici yok | 🟡 | ⬜ HÂLÂ AÇIK | Yazım/echo `src/services/temperamentAnalysis.ts:64-79`, `temperamentController.ts:59,65`; FE `git grep -i enneagramWing origin/main -- frontend/src` = 0; `matching.ts` 0 | AN-40 |
| G10 | G10-20 5-dosya yarım-özellik demeti | 🔵 | ⬜ HÂLÂ AÇIK (kısmen ilerledi) | ✅ `profile-completeness` artık bağlı: `src/services/matching.ts:6,468`. Kalan 4 bağlanmamış: `MeetingScheduler.tsx`, `TenantSwitcher.tsx`, `ProfileStrengthCard.tsx` (FE import 0), `matchingInterface.ts` (BE import 0). `git grep -iE "switchTenant\|/tenants/switch" frontend/src` boş | K-13 (MeetingScheduler) · U-19 ✅ (profile-completeness) · TenantSwitcher/ProfileStrengthCard: yok |
| G10 | G10-21 taxonomy/IndustryNode skorlamada yok | ⬜ | ⬜ HÂLÂ AÇIK | `sector-scorer.service.ts:2` taxonomy'yi import ediyor ama `sector-scorer` hiçbir yerde import edilmiyor (yalnız `:95` yorum satırı); `matching.ts`'te taxonomy/IndustryNode 0 | F-11 |
| G10 | G10-24 mentör karar ekranında menti ilk mesajı | ⬜ | ❓ DOĞRULANAMADI | ⚠️ İkame VAR: `frontend/src/app/(dashboard)/mentor/page.tsx:293-297` bekleyen görüşme talebinde menti "niyet mesajı" (`requestMessage`) en üstte gösteriliyor. Chat ilk mesajı değil; `Conversation` (schema) `matchRequestId` köken izi var, Meeting FK yok. Niyet mesajının kalemi karşılayıp karşılamadığı = ürün kararı | yok |
| G11 | G11-01 modül sırası vizyonu | ⬜ | ❓ DOĞRULANAMADI (PO onayı) | İş/strateji kararı, kod iddiası yok; PO notu "ilerleyen yıllar" | yok |
| G11 | G11-02 gelir modeli + pilot + kullanıcı görüşmesi | ⬜ | ❓ DOĞRULANAMADI (PO onayı) | İş kararı + saha işi; koddan doğrulanamaz. PO notu "hacme gelince minimum ücret" | yok |

