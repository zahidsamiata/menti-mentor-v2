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

> **SAYIM:** **30 S21-anlamlı SATIR / ~40 benzersiz ALAN** — fark: bazı satırlar alan-GRUBU (`education`/`pastProjects`/`volunteerHistory` = 3 alan tek satır · UserProfile cert-6 tek satır · `discD/I/S/C` tek satır · schools/companies/communities 3 alan tek satır).
>
> **⭐ KANIT DÜZEYİ sütunu (en kritik):** `✅ ELLE` = bu keşifte dosya:satır grep/read ile doğrulandı · `⚠️ AJAN` = alt-ajan iddiası, elle teyit EDİLMEDİ · `❓ TEYİT` = belirsiz. **Sebep:** bu turda alt-ajan **5 alanı yanlışlıkla "ölü" ilan etti** (aşağıda), hepsi yazılıyordu → aynı ajanın kontrol edilmemiş satırları aynı riski taşır. **Doğrulanmamış satır doğrulanmış GİBİ okunmamalı.**
>
> **Durum:** CANLI = yazılıyor + (eşleştirmede/kararda) okunuyor · YARIM = yazılıyor, okunmuyor · ÖLÜ = yazılmıyor · KISMİ = kısmen bağlı.

### User
| # | alan | tip | toplanıyor | okunuyor | durum | KANIT DÜZEYİ |
|---|---|---|---|---|---|---|
|1| sectorTags | String[] | onboarding/userController | matching.ts:162 (%60) | CANLI | ⚠️ AJAN |
|2| discType | DiscType? | onboarding disc submit | matching.ts:163,270 (%40 matris) | CANLI | ⚠️ AJAN (matris okuma ✅ ELLE matching.ts:270) |
|3| discVector | Json? | discVectorService | matching.ts:236,286 | CANLI | ⚠️ AJAN |
|4| timeCommitment | enum? | onboarding | matching.ts:174 (gate) | CANLI (gate) | ⚠️ AJAN |
|5| interactionStyle | enum? (2: Görev/Sohbet, **MENTÖR**) | onboarding ProfileStep.tsx:271 | matching.ts:288 (+10 bonus) | CANLI | ✅ ELLE (bonus matching.ts:288; FE ProfileStep.tsx:271) |
|6| expectationCategories | enum[6] (**MENTİ** beklenti) | onboarding ProfileStep.tsx:215 | matching.ts:278 (gate/örtüşme) | CANLI (gate) | ✅ ELLE (matching.ts:278; FE ProfileStep.tsx:215) |
|7| skills | String[] | onboarding/profil | DTO çıktı (skor DEĞİL) | YARIM | ⚠️ AJAN |
|8| bioSummary | String? (1000) | profil page:246 | insan kararı | CANLI (insan) | ⚠️ AJAN |
|9| expertiseDetails | String? (1000, mentör) | profil page:272 | insan kararı | CANLI (insan) | ⚠️ AJAN |
|10| targetAudience | String? (500, mentör) | profil page:290 | insan kararı | CANLI (insan) | ⚠️ AJAN |
|11| education / pastProjects / volunteerHistory | Json? (2000) | profil | insan kararı | CANLI (insan) | ⚠️ AJAN |
|12| selfProfile | Json? | patchSelfProfile/onboarding | esnek depo | CANLI | ⚠️ AJAN |
|13| temperamentJson | Json? | temperament testi | discVector türevi | YARIM | ⚠️ AJAN |
|14| enneagramWing | String? | temperamentController:60 | **okunmuyor** | YARIM (yaz-only) | ⚠️ AJAN |
|15| discResultCard | Json? | onboarding | kullanıcıya "aha" kartı | CANLI | ⚠️ AJAN |
|16| rematchPriority | Boolean | adminController:544 (rematch) | adminController:85,253 | CANLI | ✅ ELLE (adminController.ts:544 — ajan "ölü" dedi YANLIŞ) |
|17| rematchCount | Int | adminController:545 (increment) | admin panel | CANLI | ✅ ELLE (adminController.ts:545 — ajan "ölü" dedi YANLIŞ) |
|18| mentorVisibilityEnabled | Boolean | userController.ts:177 (select mi data mı belirsiz) | havuz görünürlüğü | ❓ TEYİT GEREK | ❓ TEYİT (userController.ts:177) |

### UserProfile
| # | alan | tip | toplanıyor | okunuyor | durum | KANIT DÜZEYİ |
|---|---|---|---|---|---|---|
|19| discD/I/S/C | Float | discVectorService.ts:154-155 | scoring.service (discToOcean girdisi) | CANLI | ✅ ELLE (discVectorService.ts:154-155 — ajan "ÖLÜ" dedi YANLIŞ) |
|20| oceanO/C/E/A/N | Float? | scoring.service:106-110 | ⭐ matching.ts'te **OKUNMUYOR** (grep 0) | **YARIM (madde 101)** | ✅ ELLE (matching.ts ocean grep=0) |
|21| archetype | String? | scoring.service:111 | yalnız /rank-mentors (FE çağırmaz) | YARIM | ✅ ELLE (matching.ts grep=0) |
|22| industryCode | String? | onboarding:342 | sektör skoru (çatılı, kısmi bağlı) | KISMİ | ⚠️ AJAN |
|23| yearsExp | Int? | onboarding:347 | — | YARIM | ⚠️ AJAN |
|24| skillTags | String[] | onboarding:340 | /rank-mentors yolu | KISMİ | ⚠️ AJAN |
|25| goalTags | String[] (**MENTİ hedef**) | onboarding:341 | /rank-mentors yolu | KISMİ | ⚠️ AJAN |
|26| schools/companies/communities | String[] | onboarding:348-350 | sector-scorer bağlam bonusu | KISMİ | ⚠️ AJAN |
|27| UserProfile cert-6 (isCertified/certScore…) | — | **yazılmıyor** (CLAUDE.md: TenantMembership'te) | — | ÖLÜ (belgeli ikiz) | ⚠️ AJAN (CLAUDE.md destekli) |

### MentorFilter / VisibilityOptIn / UserResponse
| # | alan | tip | toplanıyor | okunuyor | durum | KANIT DÜZEYİ |
|---|---|---|---|---|---|---|
|28| MentorFilter (minCompatibilityScore/blockedDiscTypes/filterEnabled) | — | mentorFilterController:56 | matching filtresi | CANLI | ⚠️ AJAN |
|29| VisibilityOptIn.iceBreaker / requestMessage | String? | **yazılmıyor** (LLM kaldırıldı; menti MatchRequest'e yazar) | — | ÖLÜ | ✅ ELLE (matchingController.ts:123 yorum) |
|30| UserResponse.value | Int (1-5) | adaptiveTestController:89 | discVector hesabı | CANLI | ⚠️ AJAN |

**Re-count (KURAL/iki-adım):** başta 30 satır dedim → 30 satır yazıldı → ✅ UYUŞUYOR.

**⚠️ AJANIN 5 YANLIŞ "ÖLÜ" İDDİASI (elle çürütüldü, kayda):** `discD/I/S/C` (discVectorService.ts:154-155) · `Meeting.requestMessage` (bookMeeting `meetingController.ts:520`) · `rematchPriority` + `rematchCount` (adminController.ts:544-545) · `mentorVisibilityEnabled` (userController.ts:177, ❓). Hepsi YAZILIYOR. M3 dersi: dar arama = yanlış "yok".

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
- **`interactionStyle`: ŞEMADA KALIR, dokunulmaz.** Yeni `supportApproach`'tan TÜRETİLİR (geçici köprü — bkz. tasarım 2.2 / PO KARAR 2). Eşleme kayıplı (3→2): birlikte-düşünme & dinleme eski sütunda ayırt edilemez (bilinçli).
- ⚠️ **TASLAK — bu turda UYGULANMAZ.** Uygulama ⚠️ TEK BAŞINA + PO onaylı ayrı tur. Türetme yazma-anında mı okuma-anında mı → uygulama turunda karar (yazma-anında matching.ts'e dokunmaz, düşük risk).

---

## §F — PO'ya sorular / karar noktaları
1. ✅ **KARARA BAĞLANDI (2026-08-29):** expectationCategories + S1 yan yana (KARAR 1) · supportApproach yeni + her iki rol, interactionStyle türetilir (KARAR 2).
2. **S3 `priorityValue` 4-değer** onayı (strateji oturumu).
3. **⭐ Tasarım↔kod uçurumu (OCEAN):** Faz 5 karar noktası — kişilik %25'i canlı motora nasıl bağlanacak.
4. **K-anonimlik eşiği (G1-22):** ne zaman, hangi eşik (öneri ≥5).
5. **Çift-ağırlık riski (KARAR 1 notu):** Faz 5 skor fonksiyonu expectationCategories + mentiNeeds sinyalini TEK KEZ ağırlıklandırmalı (iki katman toplamamalı).
6. Yeni sorular hangi ekran; menti/mentör ayrı görünüm.
