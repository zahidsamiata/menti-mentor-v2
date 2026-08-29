# PROFİL / HEDEF VERİSİ ENVANTERİ (S21)

**📸 DONDURULMUŞ** · 2026-08-29 · salt-okuma keşif (kod/DB değişmedi) · Kaynak: `prisma/schema.prisma` + `backend/src` + `frontend/src` (3 paralel Explore ajanı + elle doğrulama)

> **Neden:** Tasarım belgesi (Bölüm 10.6) "profilde bugün ne var BİLİNMİYOR → önce envanter" dedi. Üç soru (S1/S2/S3) migration'ından ÖNCE hangi alanların gerçekten toplandığı/okunduğu kod-kanıtlı çıkarıldı. Yanlış envanter = gereksiz migration.

---

## ⭐ EN BÜYÜK BULGU — TASARIM ↔ KOD UÇURUMU (madde 101 hâlâ geçerli)

**OCEAN (`oceanO/C/E/A/N`) · `archetype` · `goalTags` · `skillTags` YAZILIYOR ama CANLI eşleştirmede OKUNMUYOR.**
- **Yazılıyor:** `scoring.service.ts:106-111` (OCEAN + archetype, `computeAndStoreProfile`) · `onboardingController.ts:340-341` (skill/goal tags). — ✅ ELLE DOĞRULANDI.
- **Canlı motorda OKUNMUYOR:** `matching.ts` içinde `ocean` grep = **0 sonuç** (✅ ELLE, bu tur). Bu alanlar yalnız `scoring.service.rankMentorsForMenti` = `POST /api/scoring/rank-mentors` yolunda okunuyor — ve **frontend o yolu çağırmıyor** (önceki keşif: kalıcı katsayı/OCEAN FE'de çağrılmaz).
- **Canlı motor hâlâ DISC matrisi kullanıyor:** `matching.ts:163,270` (discType) + `scoring.ts:105` (discScore). Kişilik = DISC 4-harf matrisi, OCEAN/Big-Five DEĞİL.

**Anlamı:** Tasarım **Bölüm 9** skorun **%25'ini** Big-Five (OCEAN) 5 kuralıyla (9.2) istiyor. **Canlıda karşılığı YOK** — motor DISC matrisiyle çalışıyor, OCEAN yazılıp bir kenarda duruyor. **Faz 5'in asıl işi budur** (OCEAN'ı canlı motora bağlamak). S21 kapsamı dışı ama en kritik yapısal bulgu.

---

## §A — Alan tablosu

> **SAYIM:** **30 S21-anlamlı SATIR / 40 benzersiz ALAN** — fark: bazı satırlar alan-GRUBU (`education`/`pastProjects`/`volunteerHistory` = 3 alan tek satır · UserProfile cert-6 tek satır · `discD/I/S/C` = 4 alan tek satır · schools/companies/communities 3 alan tek satır · MentorFilter 3 alan · iceBreaker/requestMessage 2 alan · ocean 5 alan). 30 satırdaki toplam alan: 40.
>
> **⭐ KANIT DÜZEYİ — DAĞILIM (kesin, "~" yok):**
> - **ÖNCE (2026-08-29 keşif turu):** ✅ ELLE **8** · ⚠️ AJAN **21** · ❓ **1** = **30**. *(Not: önceki kapanış raporunun "9✅/~18⚠️/1❓" ifadesi HATALIYDI; gerçek başlangıç 8/21/1=30.)*
> - **SONRA (2026-08-29 DOĞRULAMA turu, bu belge):** 30 satır grep ile (kendim, alt-ajansız) teyit edildi → **2 satır DÜZELTİLDİ** (önceki tablo YANLIŞTI) · **0 satır kanıtsız kaldı.** Düzeltilenler: `interactionStyle` CANLI→**YARIM** (bonus fiilen tetiklenmiyor) · `mentorVisibilityEnabled` ❓→**yazılmıyor** (0 write, sadece SELECT). Bu iki düzeltme birer çürütmedir (statü hatası).
>
> **Durum:** CANLI = yazılıyor + (eşleştirmede/kararda) okunuyor · YARIM = yazılıyor, okunmuyor (veya etkisiz) · ÖLÜ = yazılmıyor · KISMİ = kısmen bağlı.

### User
| # | alan | tip | toplanıyor | okunuyor | durum | KANIT DÜZEYİ |
|---|---|---|---|---|---|---|
|1| sectorTags | String[] | userController:446 (create) | matching.ts:297-298 (%60, `computeSectorScore`) | CANLI | ✅ DOĞR (yazma+okuma) |
|2| discType | DiscType? | onboardingController:413 (disc submit) | matching.ts:270,299-300 (%40 matris + excludeDiscTypes) | CANLI | ✅ DOĞR |
|3| discVector | Json? | discVectorService:147 | matching.ts:286 (kesirli confidence blend) | CANLI | ✅ DOĞR |
|4| timeCommitment | enum? | userController:449 / onboarding | matching.ts:274-275 (GATE, iki taraf `areTimeCommitmentsCompatible`) | CANLI (gate) | ✅ DOĞR |
|5| interactionStyle | enum? (2: Görev/Sohbet, **MENTÖR**) | FE ProfileStep.tsx:104 (**YALNIZ `role==='MENTOR'`**) · backend userController:450 | matching.ts:288-292 (+10 bonus, `c.interactionStyle===opts.mentorInteractionStyle`) | ⭐ **YARIM** (okunuyor ama menti tarafı hiç toplanmadığı için `c.interactionStyle` null → bonus **FİİLEN TETİKLENMEZ**) | ✅ DOĞR — ⚠️ **KARAR 2'yi GÜÇLENDİRİR** (hizalama gerçekten ölçülemiyor; kod da fiilen ölü) |
|6| expectationCategories | enum[6] (**MENTİ** beklenti) | FE ProfileStep.tsx:215 · onboarding | matching.ts:278-280 (**GATE/eleme** `if (!hasCommon) continue` — SKOR bileşeni DEĞİL) | CANLI (gate) | ✅ DOĞR — ⚠️ **KARAR 1 notu:** GATE ≠ ağırlık; `mentiNeeds` skor bileşeni olursa "çift-ağırlık" değil "gate + weight" (farklı mekanizma) |
|7| skills | String[] | userController:455 / onboarding | DTO çıktı (matching.ts'te skor DEĞİL) | YARIM | ✅ DOĞR |
|8| bioSummary | String? (1000) | userController:456 | insan kararı (skor değil) | CANLI (insan) | ✅ DOĞR |
|9| expertiseDetails | String? (1000, mentör) | userController:457 | insan kararı | CANLI (insan) | ✅ DOĞR |
|10| targetAudience | String? (500, mentör) | userController:458 | insan kararı | CANLI (insan) | ✅ DOĞR |
|11| education / pastProjects / volunteerHistory | Json? (2000) | userController (schema:338-340 + create data) | insan kararı | CANLI (insan) | ✅ DOĞR |
|12| selfProfile | Json? | userController:427 (patchSelfProfile) | esnek depo | CANLI | ✅ DOĞR |
|13| temperamentJson | Json? | temperamentController:59 | discVector türevi | YARIM | ✅ DOĞR |
|14| enneagramWing | String? | temperamentController:60 | **okunmuyor** (grep) | YARIM (yaz-only) | ✅ DOĞR |
|15| discResultCard | Json? | onboardingController:415 | kullanıcıya "aha" kartı | CANLI | ✅ DOĞR |
|16| rematchPriority | Boolean | adminController:544 (rematch) | adminController:85,253 | CANLI | ✅ DOĞR (ajan "ölü" dedi YANLIŞ) |
|17| rematchCount | Int | adminController:545 (increment) | admin panel | CANLI | ✅ DOĞR (ajan "ölü" dedi YANLIŞ) |
|18| mentorVisibilityEnabled | Boolean | ⭐ **YAZILMIYOR** — kodda tek occurrence userController:177 ve o bir **SELECT** (as-const blok :179); 0 write | okunuyor (getUser select) | ÖLÜ-yazma (default `true`'da kalır, hiç değişmez) | ✅ DOĞR (❓ çözüldü: select, data değil) |

### UserProfile
| # | alan | tip | toplanıyor | okunuyor | durum | KANIT DÜZEYİ |
|---|---|---|---|---|---|---|
|19| discD/I/S/C | Float | discVectorService.ts:154-155 | scoring.service (discToOcean girdisi) | CANLI | ✅ DOĞR (discVectorService.ts:154-155 — ajan "ÖLÜ" dedi YANLIŞ) |
|20| oceanO/C/E/A/N | Float? | scoring.service:106-110 | ⭐ matching.ts'te **OKUNMUYOR** (grep 0) | **YARIM (madde 101)** | ✅ DOĞR (matching.ts ocean grep=0) |
|21| archetype | String? | scoring.service:111 | yalnız /rank-mentors (FE çağırmaz) | YARIM | ✅ DOĞR (matching.ts grep=0) |
|22| industryCode | String? | onboardingController:346 | sektör skoru (çatılı, kısmi bağlı) | KISMİ | ✅ DOĞR |
|23| yearsExp | Int? | onboardingController:347 | — | YARIM | ✅ DOĞR |
|24| skillTags | String[] | onboardingController:344 | /rank-mentors yolu (canlı matching değil) | KISMİ | ✅ DOĞR |
|25| goalTags | String[] (**MENTİ hedef**) | onboardingController:345 | /rank-mentors yolu (canlı matching değil) | KISMİ | ✅ DOĞR |
|26| schools/companies/communities | String[] | onboardingController:348-350 | sector-scorer bağlam bonusu | KISMİ | ✅ DOĞR |
|27| UserProfile cert-6 (isCertified/certScore…) | — | **yazılmıyor** (CLAUDE.md: TenantMembership'te) | — | ÖLÜ (belgeli ikiz) | ✅ DOĞR (backend/CLAUDE.md "UserProfile cert UNUSED" — kod-yazma yok) |

### MentorFilter / VisibilityOptIn / UserResponse
| # | alan | tip | toplanıyor | okunuyor | durum | KANIT DÜZEYİ |
|---|---|---|---|---|---|---|
|28| MentorFilter (minCompatibilityScore/blockedDiscTypes/filterEnabled) | — | mentorFilterController:56-60 (upsert) | matching filtresi | CANLI | ✅ DOĞR |
|29| VisibilityOptIn.iceBreaker / requestMessage | String? | **yazılmıyor** (LLM kaldırıldı; menti MatchRequest'e yazar) | — | ÖLÜ | ✅ DOĞR (matchingController.ts:123 yorum) |
|30| UserResponse.value | Int (1-5) | adaptiveTestController:91-92 (upsert) | discVector hesabı | CANLI | ✅ DOĞR |

**Re-count (KURAL/iki-adım):** 30 satır → 30 satır → ✅ UYUŞUYOR. Kanıt-düzeyi: 30/30 ✅ DOĞRULANDI (0 ⚠️, 0 ❓).

**⚠️ AJANIN 5 YANLIŞ "ÖLÜ" İDDİASI (elle çürütüldü, kayda):** `discD/I/S/C` (discVectorService.ts:154-155) · `Meeting.requestMessage` (bookMeeting `meetingController.ts:520`) · `rematchPriority` + `rematchCount` (adminController.ts:544-545) · `mentorVisibilityEnabled` (userController.ts:177 — SELECT). Hepsi yazılıyor/okunuyor (ÖLÜ değil). M3 dersi: dar arama = yanlış "yok".

### ⭐ DOĞRULAMA TURU (2026-08-29) — KARAR-ETKİLEYEN BULGULAR (grep'ler elle, alt-ajansız)
Üç öncelikli satır (PO kararları bunlara dayanıyor) teyit edildi:
- **(a) interactionStyle +10 bonus — GERÇEK ama FİİLEN ÖLÜ.** `matching.ts:288-292`: bonus koşulu `c.interactionStyle === opts.mentorInteractionStyle` (iki tarafı karşılaştırır, +10). AMA `c` = menti adayı ve menti tarafı **hiç toplanmıyor** (bkz. b) → `c.interactionStyle` null → bonus **hiçbir zaman tetiklenmez.**
- **(b) interactionStyle YALNIZ MENTÖR'de toplanıyor — DOĞRULANDI.** FE `ProfileStep.tsx:104`: `...(role === 'MENTOR' && interactionStyle && {...})` → menti bu soruyu YANITLAMIYOR. → **KARAR 2'nin gerekçesi ("yalnız mentörde, hizalama ölçülemiyor") KANITLI DOĞRU** ve hatta kod fiilen ölü.
- **(c) expectationCategories GATE, skor DEĞİL — DOĞRULANDI.** `matching.ts:278-280`: ortak beklenti yoksa aday elenir (`continue`); skora ağırlık KATMAZ. → **KARAR 1 rafine olmalı:** çift-ağırlık riski aslında "gate + skor" (iki farklı mekanizma); `mentiNeeds` skor bileşeni olacaksa expectationCategories gate'i ayrı katmandır.

> **⚠️ PO KARARLARI DEĞİŞTİRİLMEDİ** (bu bir doğrulama turu). Yukarıdaki bulgular KARAR 1/2'yi ETKİLER; migration/skor turunda dikkate alınmalı — kararlar olduğu gibi geçerli.

---

## §B — Serbest metin alanları (KVKK özel-nitelikli risk)
**9 alan:** `bioSummary`(1000) · `expertiseDetails`(1000) · `targetAudience`(500) · `education`(2000) · `pastProjects`(2000) · `volunteerHistory`(2000) · `schools`/`companies`/`communities` (onboarding text → `sanitizeTags` 80). ⚠️ Serbest metin özel-nitelikli veri (sağlık/inanç/köken) sızdırabilir; tasarım 10.2 bu yüzden **seçmeli** soru istiyor. Mevcut serbest alanlar İNSAN kararı için kalıyor (10.4), algoritma okumaz.

---

## §C — Üç soru örtüşme analizi
| Soru | Mevcut alan | Örtüşme | Kanıt |
|---|---|---|---|
| **S1 menti** (ihtiyaç, ≤2/5) | expectationCategories (enum[6] konu) | **KISMİ** — farklı taksonomi (konu-alanı ≠ ihtiyaç-tipi) | ProfileStep.tsx:215 |
| **S1 mentör** (fayda, ≤2/5) | — | **YOK** (3 terim, 0) | — |
| **S2 menti** (yaklaşım, 1/3) | — | **YOK** (interactionStyle mentöre ait) | ProfileStep.tsx:271 |
| **S2 mentör** (nasıl, 1/3) | interactionStyle (2 değer) | **KISMİ** — 2 değer vs 3, eksen farklı | ProfileStep.tsx:271 |
| **S3 ortak** (öncelik/değer, 1/4) | — | **YOK** (schema grep 0) | — |

**Sonuç:** üç soru büyük ölçüde YENİ; 2 kısmi kesişim (PO kararları §E'de).

---

## §D — Görünürlük + k-anonimlik altyapısı (tasarım 10.3)
- **Alan-bazlı DTO maskeleme: VAR ama AD-HOC** (route-içi). `buildMentiFacingMentorItem` disc strip (matchingController.ts:77-90) · `buildPublicItem` qualityMultiplier strip. **Yeniden-kullanılır helper YOK** (`mask.ts` yalnız maskEmail/maskName). Tasarım 10.3 alan-bazlı görünürlük ister → genelleştirilmeli.
- **Toplu uçlar:** platform aggregate-only (`platformTenantController.ts:254`) · admin kpi aggregate (`adminController.ts:101`) · admin/users+matches row-level (admin-only, tenant-scoped, discVector strip'li).
- **⭐ K-ANONİMLİK: YOK.** `k-anon`/`eşik`/`< 5`/`>= 5`/`minimumCount`/`gizle`/`anonim` — **9 terim arandı, 0 sonuç.** `platformTenantController.ts:269` dağılımı n=1 için bile döner. Tasarım 10.3 + G1-22 eşik ister → eklenmeli (yeni iş, PO numaralandıracak).

---

## §E — Migration TASLAĞI (⚠️ UYGULANMADI — PO kararlarına göre güncel)
Yeni alanlar **User** modeline, hepsi **additive + nullable/[]** (mevcut kayıt = cevapsız, backfill YOK, cevapsız = skorda nötr). Neon: `IF NOT EXISTS` SQL + `db execute` + `migrate resolve` (CLAUDE.md).
- `mentiNeeds` **enum[]** (yeni `MentiNeed`, 5 değer) — S1 menti · **expectationCategories DEĞİŞMEZ, YAN YANA durur** (PO KARAR 1)
- `mentorStrengths` **enum[]** (yeni `MentorStrength`, 5 değer) — S1 mentör
- `supportApproach` **enum?** (yeni `SupportApproach`, 3 değer: yol-gösterme/birlikte-düşünme/dinleme) — S2, **⭐ HER İKİ ROLDE** (menti "isterim", mentör "sunarım") (PO KARAR 2)
- `priorityValue` **enum?** (yeni `PriorityValue`, 4 değer) — S3, her iki rolde
- **`interactionStyle`: şemada KALIR, DONDURULUR, TÜRETME YOK, migration'da HİÇ ELLENMEZ.** (KÖPRÜ İPTAL — PO 2026-08-29; kanıt: bonus fiilen ölü, bkz. tasarım §10.2 revize KARAR 2.) Faz 5'te motor `supportApproach` okumaya başlayınca sütun emekliye ayrılır.
- ⚠️ **TASLAK — bu turda UYGULANMAZ.** Uygulama ⚠️ TEK BAŞINA + PO onaylı ayrı tur. Türetme yazma-anında mı okuma-anında mı → uygulama turunda karar (yazma-anında matching.ts'e dokunmaz, düşük risk).

---

## §F — PO'ya sorular / karar noktaları
1. ✅ **KARARA BAĞLANDI (2026-08-29):** expectationCategories + S1 yan yana (KARAR 1) · supportApproach yeni + her iki rol, **interactionStyle DONDURULUR (köprü İPTAL, türetme YOK)** (KARAR 2 revize).
2. **S3 `priorityValue` 4-değer** onayı (strateji oturumu).
3. **⭐ Tasarım↔kod uçurumu (OCEAN):** Faz 5 karar noktası — kişilik %25'i canlı motora nasıl bağlanacak.
4. **K-anonimlik eşiği (G1-22):** ne zaman, hangi eşik (öneri ≥5).
5. **Çift-ağırlık riski (KARAR 1 notu):** Faz 5 skor fonksiyonu expectationCategories + mentiNeeds sinyalini TEK KEZ ağırlıklandırmalı (iki katman toplamamalı).
6. Yeni sorular hangi ekran; menti/mentör ayrı görünüm.
