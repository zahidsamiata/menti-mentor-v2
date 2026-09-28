> 📸 DONDURULMUŞ (2026-09-28) — AJ-77 (G6-02 / madde 49): serbest metin durum alanları + çift rol okuma envanterinin fotoğrafı; güncellenmez. Güncel iş durumu: `docs/otonom/00-KUYRUK.md` · kararlar: `docs/otonom/01-KARARLAR.md`.
> TÜR: 📸 · SON DOĞRULAMA: 2026-09-28 · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)

# Durum alanları (String → enum) + çift rol okuma envanteri — AJ-77 (2026-09-28)

Taban: backend `origin/main` `f92e528` + AJ-77 dalı `otonom/AJ-77-durum-enum-envanter-20260928`. Yalnız kod OKUNDU (grep + dosya); **DB'ye hiçbir sorgu atılmadı.** Canlı değer dağılımı DB ister → §3'te kopyala-çalıştır salt-okuma sorguları var, bu turda çalıştırılmadı.

Satır numaraları AJ-77 dalındaki backend koduna göredir (`backend/…`).

## 0. Özet

| | Sayı |
|---|---|
| İncelenen serbest metin durum/tür alanı (5 model + 1 ek) | 16 |
| Migration'a GİREN (kodda küme kapalı ve tutarlı) | **13 kolon / 5 tablo** |
| Migration'a GİRMEYEN — karar/temizlik gerekiyor | 2 (`Tenant.plan`, `SystemLog.category`) |
| Kapsam dışı, bilgi amaçlı işaretlenen ek String alanlar | 6 (§2) |
| `User.role` okuyan, kurum-içi karar/sayım yapan yer (AJ-01/40/56 sonrası kalan) | 24 (§4) |

Migration: `backend/prisma/migrations/20260928000000_durum_alanlari_enum/migration.sql` (🔵 — PO EVET + tarihli yedek sonrası).

## 1. Alan envanteri (G6-02 kartındaki 5 model)

"Zod" sütunu: istek gövdesi/sorgusu şemaya girmeden DB'ye yazılabiliyor mu. "Kapalı" = bütün yazma yolları sabit küme ile sınırlı.

| Alan (şema satırı) | Kodda yazılan değerler — yazma yeri | Okuma yerleri | Zod | Karar |
|---|---|---|---|---|
| `Tenant.plan` (`schema.prisma:279`) | yalnız `'FREE'`: `selfServeController.ts:272` (kayıt) + şema varsayılanı; `scripts/seed-test-tenant.mjs:68`. Güncelleyen uç YOK. | `platformController.ts:321`, `platformTenantController.ts:86`, `selfServeController.ts:345,403,482,647,675`, `adminSettingsController.ts:274,306` (yalnız görüntüleme) | yazma yolu yok | ❌ **GİRMEZ — ürün kararı:** şema yorumu `FREE \| PRO \| ENTERPRISE` diyor ama kod yalnız `FREE` biliyor; paket kümesi (fiyatlandırma) ürün kararı. Enum yapılırsa küme bugünden donar. |
| `Tenant.onboardingStep` (`:281`) | `PENDING` (varsayılan) · `DONE` (`selfServeController.ts:276`) · Zod `selfServeController.ts:365` (`PATCH /api/tenants/:id/onboarding`) | `cronScheduler.ts:118,136,205` (`DRAFT_STEPS` TEMPLATE/LOGO/PREVIEW) · `selfServeController.ts:346,403` | ✅ kapalı (5 değer) | ✅ GİRER → `TenantOnboardingStep` |
| `Tenant.programTemplate` (`:282`, null olabilir) | Zod `selfServeController.ts:204` (MEZUN/KULUP/GONULLU/OZEL, varsayılan OZEL) | `selfServeController.ts:347,405,482,646,674` (görüntüleme) | ✅ kapalı | ✅ GİRER → `ProgramTemplate` |
| `Tenant.reportingFrequency` (`:295`) | varsayılan `WEEKLY` · Zod `adminSettingsController.ts:28` | `cronScheduler.ts:46-77` (`shouldRunTuningThisWeek`), `adminController.ts:837-842` | ✅ kapalı | ✅ GİRER → `ReportingFrequency` |
| `MeetingCheckIn.continueIntent` (`:681`) | Zod `meetingCheckInController.ts:17` → upsert `:62-72` | `pairSignal.service.ts:30,44` · `coachingSuggestions.ts:70,82` · `adminController.ts:388-391` · `meetingCheckInController.ts:159` (hepsi `=== 'HAYIR'`) | ✅ kapalı | ✅ GİRER → `CheckInContinueIntent` |
| `MeetingCheckIn.wantedMore` (`:687`) | Zod `meetingCheckInController.ts:23` | yalnız check-in listesi (`getCheckIns`) | ✅ kapalı | ✅ GİRER → `CheckInWantedMore` |
| `MeetingCheckIn.concernTag` (`:689`) | Zod `meetingCheckInController.ts:25` | yalnız check-in listesi | ✅ kapalı | ✅ GİRER → `CheckInConcernTag` |
| `MeetingCheckIn.continuationView` (`:690`) | Zod `meetingCheckInController.ts:26` | yalnız check-in listesi | ✅ kapalı | ✅ GİRER → `CheckInContinuationView` |
| `UserReport.reason` (`:1278`) | Zod `reportController.ts:10` → create `:45` | `reportController.ts` liste · `platformController.ts:504-560` (maskeli liste) | ✅ kapalı | ✅ GİRER → `UserReportReason` |
| `UserReport.status` (`:1280`) | varsayılan `OPEN` · Zod `reportController.ts:98` + `platformController.ts:570` (REVIEWED/DISMISSED) | `reportController.ts:38` (`'OPEN'` tekrar engeli), `:62` filtre · `platformController.ts:533` filtre · `abuseDetection.service.ts:32` (`not DISMISSED`) | ✅ kapalı | ✅ GİRER → `UserReportStatus` |
| `MentorshipAgreement.meetingFrequency` (`:1323`) | Zod `agreementController.ts:29` → create `:88` | görüntüleme | ✅ kapalı | ✅ GİRER → `MeetingFrequency` |
| `MentorshipAgreement.communicationChannel` (`:1324`) | Zod `agreementController.ts:30` | görüntüleme | ✅ kapalı | ✅ GİRER → mevcut `MeetingFormat` (ONLINE/IN_PERSON/PHONE — birebir aynı küme, yeni tip açılmadı) |
| `MentorshipAgreement.agendaOwner` (`:1328`) | varsayılan `MENTI` · Zod `agreementController.ts:34` | görüntüleme | ✅ kapalı | ✅ GİRER → `MentorshipSide` (MENTOR/MENTI) |
| `InvitationTemplate.role` (`:1362`) | Zod `selfServeController.ts:718` → upsert (`@@unique [tenantId, role, format]`) | `getInvitationTemplates` | ✅ kapalı | ✅ GİRER → `MentorshipSide` (bilerek `UserRole` DEĞİL: ADMIN kabul edilmez) |
| `InvitationTemplate.format` (`:1363`) | Zod `selfServeController.ts:719` | aynı | ✅ kapalı | ✅ GİRER → `InvitationFormat` |
| `SystemLog.category` (`:771`, ek) | `logger.ts:7` `LogCategory` = EMAIL/ML/AUTH/DB/HTTP/SYSTEM/**AUDIT** · `platformAudit.ts:30`, `nudgeService.ts:27` `'AUDIT'` yazıyor · `platformSessionRevocation.ts:71` `'AUTH'` | filtre `systemLogController.ts:11-13` (**AUDIT yok**) · `platformController.ts:221-225` (filtresiz serbest metin) | ⚠️ tutarsız | ❌ **GİRMEZ — temizlik gerekiyor:** şema yorumu + `/system-logs` filtresi `AUDIT`'i bilmiyor, kod yazıyor. Ayrıca en büyük tablo (90 gün log) — tip değişikliği tabloyu yeniden yazar. Önce küme tek yere alınmalı (ayrı iş). |

**Ortak kural (bu PR'la):** kümeler artık `backend/src/services/statusFieldSchemas.ts`'te Prisma enum'undan okunuyor (`z.enum(PrismaEnum)`); controller'lardaki elle yazılmış listeler kaldırıldı (eski hâl: `docs/arsiv/silinenler-2026-09-28.md` § AJ-77). Davranış değişmedi: aynı değerler kabul, aynı değerler 400.

## 2. Kapsam dışı ek String alanlar (bilgi — iş açılmadı)

| Alan | Neden kapsam dışı |
|---|---|
| `User.authProvider` (`LOCAL \| GOOGLE \| LINKEDIN`) | Küme kodda kapalı görünüyor (`authController.ts:180`, `oauthService.ts:127`) ama auth dosyası → ayrı iş + 7b gerektirir; G6-02 kartında yok. |
| `CertificationOption.outcome` (`"correct" \| "acceptable" \| "wrong"`) | İçerik betiğiyle (seed-certification) yazılıyor; kod yazma yolu yok → canlı dağılım görülmeden karar verilemez. |
| `SjtQuestion.triggersOn` (`o\|c\|e\|a\|n`) · `CertificationQuestion.dimension` | İçerik tablosu, küçük harf/serbest; içerik ekibinin kümesi. |
| `UserProfile.archetype` · `Match.mentorArchetype/mentiArchetype` | `disc-to-ocean.adapter.ts:41` üretir — hesaplanan etiket, matching dosyası (7b). |
| `SuspicionReport.reporterRole` | **Bilinçli serbest metin** (public form, `suspicionController.ts:11` `z.string().min(2).max(100)`) — enum OLMAMALI. |

## 3. Canlı değer dağılımı — tek seferlik salt-okuma sorguları (ÇALIŞTIRILMADI)

**Canlı dağılım: tek seferlik salt-okuma sorgusu gerekiyor.** Aşağıdaki iki sorgu yalnız `SELECT`; yazma yok. Migration merge'ünden ÖNCE çalıştırılır.

### 3a. Dağılım (her alan için değer + adet)

```sql
SELECT 'Tenant.onboardingStep' AS alan, "onboardingStep"::text AS deger, count(*) FROM "Tenant" GROUP BY 2
UNION ALL SELECT 'Tenant.programTemplate', "programTemplate"::text, count(*) FROM "Tenant" GROUP BY 2
UNION ALL SELECT 'Tenant.reportingFrequency', "reportingFrequency"::text, count(*) FROM "Tenant" GROUP BY 2
UNION ALL SELECT 'Tenant.plan', "plan"::text, count(*) FROM "Tenant" GROUP BY 2
UNION ALL SELECT 'MeetingCheckIn.continueIntent', "continueIntent"::text, count(*) FROM "MeetingCheckIn" GROUP BY 2
UNION ALL SELECT 'MeetingCheckIn.wantedMore', "wantedMore"::text, count(*) FROM "MeetingCheckIn" GROUP BY 2
UNION ALL SELECT 'MeetingCheckIn.concernTag', "concernTag"::text, count(*) FROM "MeetingCheckIn" GROUP BY 2
UNION ALL SELECT 'MeetingCheckIn.continuationView', "continuationView"::text, count(*) FROM "MeetingCheckIn" GROUP BY 2
UNION ALL SELECT 'UserReport.reason', "reason"::text, count(*) FROM "UserReport" GROUP BY 2
UNION ALL SELECT 'UserReport.status', "status"::text, count(*) FROM "UserReport" GROUP BY 2
UNION ALL SELECT 'MentorshipAgreement.meetingFrequency', "meetingFrequency"::text, count(*) FROM "MentorshipAgreement" GROUP BY 2
UNION ALL SELECT 'MentorshipAgreement.communicationChannel', "communicationChannel"::text, count(*) FROM "MentorshipAgreement" GROUP BY 2
UNION ALL SELECT 'MentorshipAgreement.agendaOwner', "agendaOwner"::text, count(*) FROM "MentorshipAgreement" GROUP BY 2
UNION ALL SELECT 'InvitationTemplate.role', "role"::text, count(*) FROM "InvitationTemplate" GROUP BY 2
UNION ALL SELECT 'InvitationTemplate.format', "format"::text, count(*) FROM "InvitationTemplate" GROUP BY 2
UNION ALL SELECT 'SystemLog.category', "category"::text, count(*) FROM "SystemLog" GROUP BY 2
ORDER BY 1, 2;
```

### 3b. Geçersiz değer sayısı (migration'ın kabul etmeyeceği satırlar) — hepsi 0 olmalı

```sql
SELECT 'Tenant.onboardingStep' AS alan, count(*) AS gecersiz FROM "Tenant" WHERE "onboardingStep" NOT IN ('PENDING','TEMPLATE','LOGO','PREVIEW','DONE')
UNION ALL SELECT 'Tenant.programTemplate', count(*) FROM "Tenant" WHERE "programTemplate" IS NOT NULL AND "programTemplate" NOT IN ('MEZUN','KULUP','GONULLU','OZEL')
UNION ALL SELECT 'Tenant.reportingFrequency', count(*) FROM "Tenant" WHERE "reportingFrequency" NOT IN ('WEEKLY','BIWEEKLY','MONTHLY')
UNION ALL SELECT 'MeetingCheckIn.continueIntent', count(*) FROM "MeetingCheckIn" WHERE "continueIntent" NOT IN ('EVET','BELIRSIZ','HAYIR')
UNION ALL SELECT 'MeetingCheckIn.wantedMore', count(*) FROM "MeetingCheckIn" WHERE "wantedMore" IS NOT NULL AND "wantedMore" NOT IN ('YONLENDIRME','KAYNAK','BAGLANIT','GERI_BILDIRIM','HAYIR')
UNION ALL SELECT 'MeetingCheckIn.concernTag', count(*) FROM "MeetingCheckIn" WHERE "concernTag" IS NOT NULL AND "concernTag" NOT IN ('MOT_DUSUK','HEDEF_BELIRSIZ','ZAMAN_YOK','ILETISIM','HAYIR')
UNION ALL SELECT 'MeetingCheckIn.continuationView', count(*) FROM "MeetingCheckIn" WHERE "continuationView" IS NOT NULL AND "continuationView" NOT IN ('KESINLIKLE','EVET','KARARSIZ','HAYIR')
UNION ALL SELECT 'UserReport.reason', count(*) FROM "UserReport" WHERE "reason" NOT IN ('SPAM','HARASSMENT','INAPPROPRIATE','NO_SHOW','OTHER')
UNION ALL SELECT 'UserReport.status', count(*) FROM "UserReport" WHERE "status" NOT IN ('OPEN','REVIEWED','DISMISSED')
UNION ALL SELECT 'MentorshipAgreement.meetingFrequency', count(*) FROM "MentorshipAgreement" WHERE "meetingFrequency" NOT IN ('WEEKLY','BIWEEKLY','MONTHLY')
UNION ALL SELECT 'MentorshipAgreement.communicationChannel', count(*) FROM "MentorshipAgreement" WHERE "communicationChannel" NOT IN ('ONLINE','IN_PERSON','PHONE')
UNION ALL SELECT 'MentorshipAgreement.agendaOwner', count(*) FROM "MentorshipAgreement" WHERE "agendaOwner" NOT IN ('MENTOR','MENTI')
UNION ALL SELECT 'InvitationTemplate.role', count(*) FROM "InvitationTemplate" WHERE "role" NOT IN ('MENTOR','MENTI')
UNION ALL SELECT 'InvitationTemplate.format', count(*) FROM "InvitationTemplate" WHERE "format" NOT IN ('EMAIL','WHATSAPP');
```

Bir satır bile 0 değilse: migration merge EDİLMEZ; o değerler için ayrı karar (düzelt / eşle) gerekir. (Migration bu durumda zaten kendini durdurur — §5.)

## 4. Çift rol okuma envanteri — `User.role` ↔ `TenantMembership.role`

**Bağlam (kodda doğrulandı):** oturum anahtarındaki rol `User.role`'den imzalanır (`authController.ts:382,530`, `oauthService.ts:79,155`, `selfServeController.ts:332`) ama `requireTenant` her istekte rolü **üyelikten** ezer (`middleware/tenant.ts:127-134`, `membershipAccess.ts`). Dolayısıyla `req.auth.role` = kurum-içi rol ✅. Kalan sorun **veritabanından `User.role` okuyan** sorgular. Anahtar kurumu = `User.tenantId` (ana kurum) olduğu için bugün ikisi çoğunlukla aynıdır; ayrıştıkları yer: çok kurumlu kişi (misafir üyelik) ve `ensureMembershipSafe` başarısız olursa (non-fatal).

AJ-01/40 ile düzelenler (yeniden sayılmadı): `adminController.ts:239,275,923,946,979` · `retentionMetrics.service.ts:51-65` · `kpiReport.service.ts:54` · `userController.ts:135-141` · `matching.ts:139,214` · `meetingController.ts:385-390,433-436` · `sjtScoringController.ts:271` · `gdprService.ts:293,296` · `platformTenantController.ts:98-228`.

### 4a. Kurum-içi karar — `TenantMembership.role` olmalı (öneri: geçir)

| # | Yer | Ne yapıyor | Öneri |
|---|---|---|---|
| 1 | `adminController.ts:152,160` | kullanıcı pasifleştirme: hedef ADMIN mi (`User.role`) | üyelik rolü (AJ-56 ile birlikte; aynı kapsamda `retentionMetrics.service.ts:104` pasif üye listesindeki rol de `User.role`) |
| 2 | `adminController.ts:941` (`promoteToAdmin`) | "zaten admin mi" `User.role` | üyelik rolü; ardından `User.role` yazımı (`:955`) + `ensureMembershipSafe` çift yazım — kaynak tek olmalı |
| 3 | `adminController.ts:973` (`demoteFromAdmin`) | "admin mi" `User.role`; `:988` her durumda `MENTOR`'a düşürür | üyelik rolü |
| 4 | `adminController.ts:507` (rematch) | `role` seçiliyor, **kullanılmıyor** | etkisiz — select'ten çıkar (temizlik) |
| 5 | `userController.ts:76` | peer listesi `?role=` filtresi `User.role` | üyelik rolü (AJ-40'ın admin listesi eşleniği) |
| 6 | `userController.ts:90,113` / `:156,232` | DISC görünürlük kararı `canViewerSeeDiscType(viewer, u.role)` — hedef rolü `User.role` | üyelik rolü (kurum-içi görünürlük) |
| 7 | `matchingController.ts:139` · `:157,163` | hedef MENTOR / MENTI mi | üyelik rolü (matching dosyası → 7b) |
| 8 | `requestController.ts:44-46` | istek hedefi MENTOR mu | üyelik rolü |
| 9 | `conversationController.ts:144-146` | konuşma hedefi MENTOR mu | üyelik rolü |
| 10 | `meetingController.ts:208,212` | görüşme tarafları MENTOR/MENTI mi | üyelik rolü (aynı dosyada `:385` zaten üyelikten okuyor — **komşu uç farkı**) |
| 11 | `agreementController.ts:62-66` | anlaşma tarafları MENTOR/MENTI mi | üyelik rolü |
| 12 | `feedbackLogController.ts:73,77` | log tarafları MENTOR/MENTI mi | üyelik rolü |
| 13 | `mentorFilterController.ts:21,45` | hedef MENTOR mu | üyelik rolü |
| 14 | `feedbackController.ts:208` (`clearOrientationLock`) | hedef MENTI mi | üyelik rolü |
| 15 | `authController.ts:902` (`/auth/me`) | düzeltme notunu yalnız ADMIN'e göster (`User.role`) | üyelik rolü (kurum-içi görünürlük) |
| 16 | `coachingSuggestions.ts:26` | `role` seçiliyor, **kullanılmıyor** | etkisiz — temizlik |

### 4b. Kurum yöneticilerine bildirim alıcısı — `User.role = ADMIN` + `User.tenantId`

Misafir üye olarak yönetici olan kişi bildirim almaz; ana kurumu burası olup rolü düşürülmüş kişi (üyelikte MENTOR, `User.role` senkron kalmadıysa) alabilir.

| # | Yer |
|---|---|
| 17 | `authController.ts:212` (yeni kayıt → yöneticilere e-posta) |
| 18 | `oauthService.ts:195` (OAuth kaydı → yöneticilere) |
| 19 | `userController.ts:535` (yönetici eliyle kullanıcı ekleme → yöneticilere) |
| 20 | `questionController.ts:421` (DISC tamamlandı → yöneticilere) |
| 21 | `algorithmTuner.ts:521` (ayar önerisi → yöneticilere) |
| 22 | `cronScheduler.ts:152` (taslak kurum hatırlatması → kurucu yönetici) |
| 23 | `tenantNotifications.ts:94` (kurum doğrulama sonucu → ilk yönetici) |

Öneri: tek yardımcı (`tenantAdminRecipients(tenantId)` — `tenantMembership.findMany({ role: 'ADMIN', isActive: true, user: { isActive: true } })`) + yedi çağrı yeri. Davranış değişikliği (kim e-posta alır) küçük ama gerçek → 🟢 iş, ürün kararı değil.

### 4c. Platform geneli — `User.role` kabul edilebilir (tanım notu)

| # | Yer | Not |
|---|---|---|
| 24 | `platformController.ts:131-133` · `adminSettingsController.ts:293-294` (süper-admin paneli) | Sistem geneli mentor/menti/admin sayısı **ana roldür**; çok kurumlu kişi bir kez sayılır. "Kaç mentörlük üyeliği var" isteniyorsa `tenantMembership.count` — tanım farkı, iş açmak PO'nun tercihi. |
| — | `platformController.ts:291` · `adminSettingsController.ts:398` | onay bekleyen kurum listesinde "başvuran yönetici" iletişimi (`tenant.users where role ADMIN`) — kurum yeni, tek üye; pratikte fark yok. |
| — | `gdprService.ts:322` | KVKK veri dışa aktarımı: kişinin kendi `User.role` alanı — doğru (kişisel veri kaydı). |
| — | `middleware/tenantAdminAuth.ts:39` | anahtar ön-kapısı `payload.role !== 'ADMIN'` (`User.role` imzalı) → ardından üyelik kontrolü. Üyelikte ADMIN ama `User.role` MENTOR olan kişi reddedilir; bugün `promote/demote` ikisini birlikte yazdığı için ayrışmıyor. |

**Önerilen kuyruk satırı (ana ajan açar):** 4a #1-3 AJ-56 kapsamında; 4a #5-15 + 4b tek "kurum-içi rol okumaları üyelikten" işi (🟢 + 7b, matching/auth dosyası var); #4 ve #16 temizlik.

## 5. Migration özeti (🔵)

- Dosya: `backend/prisma/migrations/20260928000000_durum_alanlari_enum/migration.sql` — elle yazıldı, **çalıştırılmadı**.
- 12 yeni enum tipi (`DO $$ … duplicate_object` korumalı) + mevcut `MeetingFormat` yeniden kullanıldı.
- Veri kaybı yok: Prisma'nın önerdiği `DROP COLUMN / ADD COLUMN` yerine `ALTER COLUMN … TYPE … USING "<kolon>"::text::"<Enum>"`; varsayılanlı 4 kolonda `DROP DEFAULT` → tip → `SET DEFAULT`. İndeksler Postgres tarafından aynı adla yeniden kurulur.
- **Geçersiz değer:** betik önce kümeye uymayan satırları sayar; biri bile varsa `RAISE EXCEPTION` ile TÜM betik geri alınır (hiçbir kolon değişmez). ⚠️ Dockerfile açılışta `prisma migrate deploy` çalıştırdığı için bu durumda **backend konteyneri açılmaz** (site API'si kapalı kalır) ve Prisma migration'ı "başarısız" işaretler → `migrate resolve --rolled-back` gerekir. Bu yüzden §3b sayımı merge'den ÖNCE şarttır.
- Kilit: `ALTER COLUMN TYPE` tabloyu yeniden yazar (ACCESS EXCLUSIVE). Beş tablo küçük (kurum, check-in, şikayet, anlaşma, şablon) → saniyeler.

### Geri alma SQL'i (gerekirse; kod PR'ı revert edilmeden çalıştırılmaz)

```sql
ALTER TABLE "Tenant" ALTER COLUMN "onboardingStep" DROP DEFAULT, ALTER COLUMN "onboardingStep" TYPE text USING "onboardingStep"::text, ALTER COLUMN "onboardingStep" SET DEFAULT 'PENDING';
ALTER TABLE "Tenant" ALTER COLUMN "programTemplate" TYPE text USING "programTemplate"::text;
ALTER TABLE "Tenant" ALTER COLUMN "reportingFrequency" DROP DEFAULT, ALTER COLUMN "reportingFrequency" TYPE text USING "reportingFrequency"::text, ALTER COLUMN "reportingFrequency" SET DEFAULT 'WEEKLY';
ALTER TABLE "MeetingCheckIn" ALTER COLUMN "continueIntent" TYPE text USING "continueIntent"::text, ALTER COLUMN "wantedMore" TYPE text USING "wantedMore"::text, ALTER COLUMN "concernTag" TYPE text USING "concernTag"::text, ALTER COLUMN "continuationView" TYPE text USING "continuationView"::text;
ALTER TABLE "UserReport" ALTER COLUMN "reason" TYPE text USING "reason"::text, ALTER COLUMN "status" DROP DEFAULT, ALTER COLUMN "status" TYPE text USING "status"::text, ALTER COLUMN "status" SET DEFAULT 'OPEN';
ALTER TABLE "MentorshipAgreement" ALTER COLUMN "meetingFrequency" TYPE text USING "meetingFrequency"::text, ALTER COLUMN "communicationChannel" TYPE text USING "communicationChannel"::text, ALTER COLUMN "agendaOwner" DROP DEFAULT, ALTER COLUMN "agendaOwner" TYPE text USING "agendaOwner"::text, ALTER COLUMN "agendaOwner" SET DEFAULT 'MENTI';
ALTER TABLE "InvitationTemplate" ALTER COLUMN "role" TYPE text USING "role"::text, ALTER COLUMN "format" TYPE text USING "format"::text;
DROP TYPE IF EXISTS "TenantOnboardingStep", "ProgramTemplate", "ReportingFrequency", "CheckInContinueIntent", "CheckInWantedMore", "CheckInConcernTag", "CheckInContinuationView", "UserReportReason", "UserReportStatus", "MeetingFrequency", "MentorshipSide", "InvitationFormat";
-- ardından: prisma migrate resolve --rolled-back 20260928000000_durum_alanlari_enum
```

## 6. Tarihli yedek planı (çalıştırılmadı — EVET sonrası, migration'dan hemen önce)

`<GGAA>` = uygulama günü (ör. `20261001`).

```sql
CREATE TABLE "Tenant_yedek_2026<GGAA>"              AS SELECT * FROM "Tenant";
CREATE TABLE "MeetingCheckIn_yedek_2026<GGAA>"      AS SELECT * FROM "MeetingCheckIn";
CREATE TABLE "UserReport_yedek_2026<GGAA>"          AS SELECT * FROM "UserReport";
CREATE TABLE "MentorshipAgreement_yedek_2026<GGAA>" AS SELECT * FROM "MentorshipAgreement";
CREATE TABLE "InvitationTemplate_yedek_2026<GGAA>"  AS SELECT * FROM "InvitationTemplate";

-- Satır sayısı eşitliği (her satırda kaynak = yedek olmalı; 02-ILERLEME'ye yazılır)
SELECT 'Tenant' AS tablo, (SELECT count(*) FROM "Tenant") AS kaynak, (SELECT count(*) FROM "Tenant_yedek_2026<GGAA>") AS yedek
UNION ALL SELECT 'MeetingCheckIn', (SELECT count(*) FROM "MeetingCheckIn"), (SELECT count(*) FROM "MeetingCheckIn_yedek_2026<GGAA>")
UNION ALL SELECT 'UserReport', (SELECT count(*) FROM "UserReport"), (SELECT count(*) FROM "UserReport_yedek_2026<GGAA>")
UNION ALL SELECT 'MentorshipAgreement', (SELECT count(*) FROM "MentorshipAgreement"), (SELECT count(*) FROM "MentorshipAgreement_yedek_2026<GGAA>")
UNION ALL SELECT 'InvitationTemplate', (SELECT count(*) FROM "InvitationTemplate"), (SELECT count(*) FROM "InvitationTemplate_yedek_2026<GGAA>");
```

## 7. EVET/HAYIR kartı metni (01-KARARLAR'a ana ajan ekler)

```
### EVET/HAYIR · AJ-77 — durum alanlarını veritabanında kilitle (13 alan, 5 tablo)  [🔵 MIGRATION]
**Kullanıcı ne görür:** Hiçbir ekran değişmez. Kurum kurulumu, görüşme değerlendirmesi, şikayet,
  mentörlük anlaşması ve davet şablonu formları bugünkü seçeneklerle aynı çalışır.
**Ne değişir:** Bu 13 alan bugün veritabanında "serbest yazı". Uygulama zaten yalnız belirli seçenekleri
  kabul ediyor ama veritabanı kendisi bir denetim yapmıyor. EVET'ten sonra veritabanı da yalnız bu
  seçenekleri kabul eder (yazım hatalı/uydurma değer kaydedilemez). Seçenek listesi tek yerde tutulur.
**Geri alınır mı:** Evet. Hazır geri alma betiği var (rapor §5); kod değişikliği ayrıca geri alınır.
  Veri silinmez, yalnız alanın türü değişir.
**Yedeği alınacak tablolar:** Tenant · MeetingCheckIn · UserReport · MentorshipAgreement · InvitationTemplate
  (tarihli kopya + satır sayısı eşitliği — rapor §6).
**Merge öncesi gereken tek seferlik DB sorguları (salt-okuma):** rapor §3a (değer dağılımı) ve §3b
  (geçersiz değer sayısı). §3b'de 0 olmayan satır varsa merge EDİLMEZ — o değerler için ayrı karar gerekir.
  ⚠️ Bu sayım atlanıp geçersiz değer çıkarsa backend açılışta durur (site API'si kapalı kalır).
**Kapsam dışı bırakılanlar:** Tenant.plan (paket listesi ürün kararı) · SystemLog.category (önce temizlik).
**PR:** backend #<no> · çatı #<no>
**CEVAP:**
```
