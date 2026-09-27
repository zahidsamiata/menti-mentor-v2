# Parti 04 — BITTI son doğrulama (2026-09-27)
Denetçi: Opus 5.5 alt-ajan (işi yapmayan) · referans: çatı 191a256 · backend 3bd9ad3 · salt-okuma
Özet: toplam 15 · ✅ 14 · ⚠️ 1 · ❌ 0 · 🔁 0 · 👁 0 (kod ✅ 0) · ❓ 0 · mutasyon: yapılan 5 / kırmızıya dönen 5 / DB gerekli 10 / yapılamadı 0

| İş | Risk | Ölçüt (kısa) | Kanıt dosya:satır | Test dosya:satır | Mutasyon | Kategori | Not |
|---|---|---|---|---|---|---|---|
| AN-07 | R1 | Kalabalık havuzda liste hızlı ve kapsayıcı | backend/src/services/matching.ts:101-116, 205, 466, 535 | backend/tests/matching-candidate-coverage.unit.test.ts:95-129 | yapıldı: sayfalama tek sayfaya indirildi → 3/4 kırmızı | ✅ | Skordan sonra kesme ve yalnız ilk N için zenginleştirme testle kanıtlı. Hız ölçülmedi. PS-A4 (f4297f5) aynı dosyaya eşik ekledi, AN-07 mantığı yerinde. Önbellek bilinçli olarak yok. |
| AJ-02 | R1 | system-logs `meta` dönmüyor + VIEW_SYSTEM_LOGS izi | backend/src/controllers/systemLogController.ts:41, 48 | backend/tests/security.test.ts:226, 236-237 | DB gerekli (satır okuması: select kalkarsa :226, audit kalkarsa :237 kırılır) | ✅ | Merge sonrası dokunan commit yok. Ön yüz bu ucu çağırmıyor (grep `system-logs` frontend/src boş). |
| AJ-01 | R1 | KPI/tutunma/yönetici sayımı üyelik rolünden | backend/src/services/kpiReport.service.ts:48-56 · backend/src/services/retentionMetrics.service.ts:50 · backend/src/controllers/adminController.ts:883, 906, 939 | backend/tests/kurum-ici-rol-sayimi-uyelik.test.ts:55-61, 162-214 | DB gerekli (satır okuması: user.groupBy'a dönerse :58 MENTI=1 kırılır) | ✅ | Sonraki AJ-09/AJ-17 commit'leri sayımlara dokunmadı. promote/demote hedef kontrolü (:902, :934) hâlâ User.role ve home tenant'a bakıyor. Bu kapsam dışı, not olarak düşüldü. |
| AJ-03 | R1 | Çıkış sonrası erişim anahtarı hemen geçersiz | backend/src/services/accessTokenRevocation.ts:60 · backend/src/middleware/jwtAuth.ts:33, 40 · backend/src/controllers/authController.ts:551-554 · backend/src/controllers/platformController.ts:96-97 | backend/tests/auth.test.ts:285-299, 301 · backend/tests/security-audit-2.test.ts:107 | DB gerekli (satır okuması: revoke çağrısı kalkarsa auth.test.ts:298 kırılır) | ✅ | Ön yüz çıkışta anahtarı gönderiyor (frontend/src/providers/AuthProvider.tsx:202-204). Liste bellek içinde, tek-instance varsayımı var. Birim testi yok. |
| AJ-04 | R1 | 20 uç / 32 test negatif | backend/src/controllers/jobListingController.ts:103 · backend/src/controllers/meetingCheckInController.ts:38 | backend/tests (AJ-04 dosyası):152, 155, 201, 206 | DB gerekli (2 uç satır okuması: kırılır) | ✅ | Dosyada 30 statik it var. approve/reject döngüsü ile koşuda 32 test oluyor. Merge sonrası dokunan commit yok. |
| PS-A4 | R1 | Menti listesinde kurum barajı altı mentör yok | backend/src/services/matching.ts:453, 525-531 | backend/tests/matching-menti-esik.unit.test.ts:71-99 · backend/tests/matching-menti-esik.test.ts:95-106 | yapıldı: eşik filtresi kaldırıldı → 2/4 kırmızı | ✅ | Menti ekranı bağlı: frontend/src/app/(dashboard)/menti/page.tsx:59 → mentor-matches → matchingController.ts:132. Baraj hiç geçilmezse liste boş kalmıyor (fallback), bu da test ediliyor. |
| AJ-09 | R1 | Tek çerez yardımcısı + PII select tek yerden, davranış aynı | backend/src/utils/authCookies.ts:11-24 · backend/src/utils/userSelect.ts:11-17 | backend/tests/authCookies.unit.test.ts:40-47 · backend/tests/userSelect.unit.test.ts | yapıldı: sameSite lax → kırmızı; select'e password eklendi → kırmızı | ✅ | `setRefreshCookie` tanımı tek (yalnız utils). Merge sonrası IC-08 authController'a dokundu, kopyayı geri getirmedi. Görünmez iş. |
| F-24 | R1 | Platform admin kullanıcı detayına iniyor | backend/src/controllers/platformTenantController.ts (getTenantUserDetail) · backend/src/routes/platformRoutes.ts · frontend/src/app/platform/tenants/[id]/_components/MembersTable.tsx:87 | backend/tests/platform-tenant-user-detail.test.ts:89-98 · frontend/src/__tests__/platform-tenant-user-detail.test.tsx:48-58 | yapıldı (FE): çağrı argümanları ters çevrildi → 1/3 kırmızı. BE: DB gerekli (tenantId filtresi kalkarsa :98 kırılır) | ✅ | 404 ile kurumlar arası erişim kapalı. E-posta maskeli. VIEW_TENANT_USER izi test:109-119. Merge sonrası dokunan commit yok. |
| AJ-13 | R1 | 25 uç daha negatif | backend/src/controllers/adminController.ts:477 · backend/src/controllers/tagController.ts:131 | backend/tests (AJ-13 dosyası):105, 107, 125, 127 | DB gerekli (2 uç satır okuması: kırılır) | ✅ | Ölçüt 25 uçtu, 11 yeni uç / 15 test yazıldı. 14 uç #169 ile örtüştüğü için çıkarılmış. AJ13-1 testinde pozitif kontrol yok. |
| AJ-15 | R1 | 20 uç daha negatif | backend/src/controllers/meetingController.ts:315 · backend/src/controllers/tagController.ts:99 | backend/tests (AJ-15 dosyası):267-270, 464-465 | DB gerekli (2 uç satır okuması: kırılır) | ✅ | 20 uç / 27 test, dosyada sayıldı. Merge sonrası dokunan commit yok. |
| AJ-16 | R1 | 20 uç daha negatif | backend/src/services/learningJourney.service.ts:350 · backend/src/controllers/feedbackLogController.ts:190 | backend/tests/aj16-negatif-test-4-parti.test.ts:282, 286, 465 | DB gerekli (2 uç satır okuması: kırılır) | ✅ | 20 uç / 31 test. Başka-kurum denemesi 12 uçta var. Kalan 8 uçta yalnız 401/403 testi var; 2 cron ucunun başka-kurum testi AJ-17 dosyasında. it.fails kaldırılmış. |
| AJ-17 | R1 | Elle cron yalnız kendi kurumu | backend/src/services/gdprService.ts:422-426 · backend/src/services/cronScheduler.ts (runWeeklyTuning where id) · backend/src/controllers/adminController.ts (manualRunPurge/Tuning req.tenant) | backend/tests/aj17-elle-cron-kurum-kapsami.test.ts:84-100, 121-131 | DB gerekli (satır okuması: tenantId filtresi kalkarsa :91 ve :97 kırılır) | ✅ | Otomatik cron platform geneli kalıyor (test :137-180). Ön yüzde buton yok (grep run-purge frontend/src boş). Buton sorusu KARAR-13'te. |
| AJ-18 | R1 | 20 uç daha negatif | backend/src/controllers/meetingCheckInController.ts:141 · backend/src/controllers/meetingController.ts:281 | backend/tests (AJ-18 dosyası):198-199, 309 | DB gerekli (2 uç satır okuması: kırılır) | ✅ | 19 uç / 27 test, dosyada sayıldı. AJ18-12'deki 5 uç yalnız 401/403 (başka-kurum testi AJ-15'te). AJ18-13'teki 3 uçta yalnız 401 var. |
| AJ-19 | R1 | Kalan anlamlı uçların tamamı | backend/src/controllers/conversationController.ts:71 · backend/src/controllers/analyticsController.ts:11 | backend/tests/aj19-negatif-test-son-parti.test.ts:137-139, 105-107 | DB gerekli (2 uç satır okuması: kırılır) | ✅ | 7 uç / 13 test. Anlamsız sayılan uçların gerekçesi yalnız PR #193 açıklamasında. "Başka dosyada test var" iddiası 4 örnekte kontrol edildi, dördü de tuttu (AJ16-6, AJ15-17, AJ15-19, Y3-6). |
| GV-12 | R1 | Kayıtlı/kayıtsız e-posta iki yolda da aynı yanıtı alıyor | backend/src/controllers/selfServeController.ts:255-260 (409 yok, 201 + null) · frontend/src/app/onboarding/stk/_steps/Step4Account.tsx:103-106, 122-126 | backend/tests/self-serve-register-enumeration.test.ts:45-56 · frontend/src/__tests__/stk-register-check-email.test.tsx:49-86 | yapıldı (FE): iki koruma dalı ayrı ayrı kaldırıldı → 1/5 ve 3/5 kırmızı | ⚠️ | 409 kaldırıldı ve canlıda. Ama yeni kayıtta tenant/accessToken dolu dönüyor ve panele geçiliyor, kayıtlıda null dönüyor. E-postanın kayıtlı olup olmadığı hâlâ ayırt edilebiliyor (selfServeController.ts:255-260). Karar KARAR-102'de. |

## Ayrıntı

### AN-07
- kaynak: docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:305 · PR: backend #171 (4db73a1) · çatı #353
- (1) Ölçüt kodda karşılanıyor:
  - `collectCandidatePages` (matching.ts:104-116) id sırasıyla 500'lük sayfalar topluyor, tavan 5000.
  - Kesme skordan sonra yapılıyor (:535).
  - Menti yönünde müsaitlik ve profil sorguları yalnız dönen ilk N mentör için yapılıyor.
- (2) Merge'den sonra dosyaya yalnız f4297f5 (PS-A4) dokundu. Eşik filtresini `scored` ile `top` arasına ekledi; AN-07 yapısı yerinde.
- (3) Test: matching-candidate-coverage.unit.test.ts, 4 test, DB'siz, CI'da koşuyor.
- (3b) Mutasyon: :112 `break` yapıldı (eski tek sayfa davranışı). Sonuç 3 FAIL / 1 pass.
- (4) Kullanıcıya bağlı:
  - Mentör tarafı: frontend/src/app/(dashboard)/mentor/page.tsx:67 (getRankedMentis).
  - Menti tarafı: menti/page.tsx:59 (mentorMatches).

### AJ-02
- kaynak: :339 · PR: backend #172 (fd8eb0b) · çatı #357
- (1) Ölçüt kodda karşılanıyor:
  - systemLogController.ts:41'de açık select var, `meta` seçilmiyor.
  - :48'de `auditPlatformAction('VIEW_SYSTEM_LOGS')` çağrılıyor.
- (2) Merge'den sonra dosyaya dokunan commit yok.
- (3) Test security.test.ts:
  - :226 `not.toHaveProperty('meta')`
  - :236-237 denetim izinin varlığı
  - :246 negatif: kurum ADMIN'i 403 alıyor, iz yazılmıyor
- (3b) DB gerekli, mutasyon koşulmadı. Satır okuması:
  - select kalkarsa :226 kırılır.
  - audit satırı kalkarsa :237 kırılır.
- (4) Ön yüz bu ucu kullanmıyor; kayıttaki iddiayla uyumlu.

### AJ-01
- kaynak: :345 · PR: backend #173 (77bc264) · çatı #358
- (1) Sayımlar `tenantMembership.count/groupBy/findMany` ile yapılıyor:
  - kpiReport.service.ts:48, 53
  - retentionMetrics.service.ts:50
  - adminController.ts:883, 906, 939
- (2) Merge'den sonra adminController'a 19753e1 (AJ-09) ve 4a16bac (AJ-17) dokundu; sayım satırları değişmedi.
- (3) kurum-ici-rol-sayimi-uyelik.test.ts: 9 test, bunların 4'ü negatif (:64, :162, :178, :196).
- (3b) DB gerekli, mutasyon koşulmadı. Satır okuması: `prisma.user.groupBy({where:{tenantId}})`'e dönülürse B kurumunda dualCitizen'ın home tenant'ı A olduğu için sayılmaz, :58 `usersByRole.MENTI toBe(1)` kırılır.
- (4) Ön yüz bağlantıları:
  - frontend/src/lib/api/admin.ts:37 (/api/admin/kpi)
  - ProgramHealthSection.tsx:41 (health-metrics)
- Kapsam dışı: promote/demote hedef aramasında User.tenantId ve User.role kullanılıyor (:898-902, :934). Kurumda konuk olarak ADMIN üyeliği olan kişi bu uçlarla hedeflenemiyor.

### AJ-03
- kaynak: :358 · PR: backend #175 (dfa248c) · çatı #360
- (1) Mekanizma:
  - `signToken` her anahtara jti ekliyor (jwtAuth.ts:33).
  - `verifyToken` iptal listesine bakıyor (:40).
  - Kurum çıkışı (authController.ts:551-554) ve platform çıkışı (platformController.ts:96-97) jti'yi listeye yazıyor.
- (2) Merge'den sonra IC-08 (a467891) ve AJ-09 (19753e1) authController'a dokundu; logout bloğu yerinde.
- (3) auth.test.ts:285 (çıkış sonrası 401), :301 (negatif: A'nın çıkışı B'yi etkilemiyor), :323 · security-audit-2.test.ts:107 (platform anahtarının tekrar oynatılması reddediliyor).
- (3b) DB gerekli, mutasyon koşulmadı. Satır okuması: :553'teki revoke çağrısı kalkarsa :298 `toBe(401)` 200 alır ve kırılır.
- (4) Ön yüz çıkışta Bearer anahtarı gönderiyor (AuthProvider.tsx:202-204 → client.ts:126). Mekanizma gerçek kullanımda da devrede.

### AJ-04 / AJ-13 / AJ-15 / AJ-16 / AJ-18 / AJ-19 (negatif test kovaları)
- kaynak: :364, :396, :408, :414, :421, :427 · PR: backend #176, #184, #188, #190, #192, #193
- Ortak:
  - PR'lar yalnız birer test dosyası ekliyor, kaynak koda dokunmuyor. Dosyalar main'de duruyor, merge'den sonra dokunan commit yok.
  - CI kapsamı: backend vitest.config.ts:28 `tests/**/*.test.ts`, ci.yml'de `TEST_DATABASE_URL`'li Postgres ve `npx vitest run`.
  - Seçilen uçların hiçbirinde geniş durum kabulü (`[403,404,200]`) ya da koşullu assert yok. Yazma uçlarında kaynağın değişmediği DB'den ayrıca doğrulanıyor.
- İddia edilen ve dosyada sayılan test sayıları:
  - AJ-04: iddia 20/32. Dosyada 30 statik it var; approve/reject döngüsüyle koşuda 32.
  - AJ-13: 11/15.
  - AJ-15: 20/27.
  - AJ-16: 20/31.
  - AJ-18: 19/27.
  - AJ-19: 7/13.
- Rastgele 2 uç, satır okumasıyla (koruma geri alınırsa):
  - AJ-04: jobListingController.ts:103 → :152/:155 kırılır · meetingCheckInController.ts:38 → :201 kırılır.
  - AJ-13: adminController.ts:477 → :105/:107 kırılır · tagController.ts:131 → :125/:127 kırılır.
  - AJ-15: meetingController.ts:315 → :267-270 kırılır · tagController.ts:99 → :464-465 kırılır.
  - AJ-16: learningJourney.service.ts:350 → :282/:286 kırılır · feedbackLogController.ts:190 → :465 kırılır.
  - AJ-18: meetingCheckInController.ts:141 → :198-199 kırılır. :185-191'deki pozitif kontrol testin totoloji olmasını önlüyor · meetingController.ts:281 → :309 kırılır.
  - AJ-19: conversationController.ts:71 → :137/:139 kırılır · analyticsController.ts:11 → :105/:107 kırılır.
- Yan not: `requireSelfOrAdmin` (backend/src/middleware/authorize.ts:79-84) kurum kontrolü yapmıyor. Kurum izolasyonu tamamen controller'lardaki tenantId filtrelerine dayanıyor; bu kovalar tam o filtreleri kilitliyor.

### PS-A4
- kaynak: :377 · PR: backend #180 (26efc49) · çatı #364
- (1) Eşik kodda uygulanıyor:
  - matching.ts:453 kurumun `minMatchScoreThreshold` değerini okuyor.
  - :525-527 filtreyi uyguluyor, :531 baraj hiç geçilmezse fallback yapıyor.
  - İstemciden eşik parametresi alınmıyor.
- (2) Merge'den sonra dokunan commit yok.
- (3) Birim testi 4 test. Entegrasyon testi 5 test; negatifler: :95 başka kurum, :108 istemci eşiği gevşetemiyor.
- (3b) Mutasyon: filtre `scored` yapıldı. Sonuç 2 FAIL / 2 pass: "eşik altı yok" ve "kurum eşiği değişince liste değişir" testleri kırıldı.
- (4) Ön yüz bağlantısı: menti/page.tsx:59 → /api/mentis/:id/mentor-matches → matchingController.ts:132.

### AJ-09
- kaynak: :384 · PR: backend #181 (31b7715) · çatı #365
- (1) Yardımcılar:
  - authCookies.ts tek çerez yardımcısı; selfServeController.ts:19 ve authController.ts:27 bunu import ediyor, kopya tanım yok.
  - userSelect.ts'te 3 sabit var; 15 dosya bunları kullanıyor.
- (2) Merge'den sonra dokunan tek commit IC-08 merge'ü (2a8acc7/a467891); yardımcı kullanımı korunmuş.
- (3)/(3b) authCookies.unit ve userSelect.unit toplam 11 test, mutasyonsuz yeşil. Mutasyonlar:
  - sameSite:'lax' → 1 FAIL.
  - USER_IDENTITY_SELECT'e password eklendi → 2 FAIL.
- (4) Görünmez iş; ölçüt davranışın aynı kalması.

### F-24
- kaynak: :390 · PR: backend #182 (0ab094f) · çatı #366 (fbb97e4)
- (1) Uç ve arayüz:
  - `getTenantUserDetail`, tenantMembership'i tenantId+userId+isActive ile arıyor; kayıt yoksa 404.
  - E-posta `maskEmail` ile dönüyor, `VIEW_TENANT_USER` izi yazılıyor. Route platformRoutes.ts'de.
  - Ön yüz: MembersTable.tsx:87 link veriyor, users/[userId]/page.tsx:63 ucu çağırıyor.
- (2) Merge'den sonra dokunan commit yok.
- (3) Backend testi 5 test: :72 kurum ADMIN'i 403, :89 başka kurum 404, :101 olmayan kurum 404, :109 denetim izi. Ön yüz testi 3 test.
- (3b) Ön yüzde mutasyon koşuldu: argümanlar ters çevrildi → 1 FAIL (:58). Backend DB gerekli; satır okuması: where'den tenantId kalkarsa :98 `toBe(404)` kırılır.

### AJ-17
- kaynak: :415 · PR: backend #191 (2d5a18e) · çatı #375
- (1) Kapsam daraltması:
  - `manualRunPurge` ve `manualRunTuning` `req.tenant.tenantId` geçiriyor.
  - gdprService.ts:422-426 feedbackLog silmesini tenantId ile filtreliyor; SystemLog temizliği atlanıyor (`systemLogsSkipped`).
  - runWeeklyTuning'de `where id: tenantId`.
- (2) Merge'den sonra dokunan commit yok.
- (3) aj17-elle-cron-kurum-kapsami.test.ts:
  - :84 A kurumunun kaydı kalıyor.
  - :121 yalnız B kurumu ayarlanıyor.
  - :137 ve :153 argümansız çağrıda platform geneli davranış korunuyor.
- (3b) DB gerekli, mutasyon koşulmadı. Satır okuması: tenantId filtresi kalkarsa :91 `feedbackLogsDeleted` 1 yerine 2 olur, :97 `stillA` null olur; ikisi de kırılır.
- (4) Ön yüzde tetikleme butonu yok (grep frontend/src 'run-purge/run-tuning' boş). Ölçüt API davranışı; buton sorusu KARAR-13'te.

### GV-12
- kaynak: docs/otonom/00-KUYRUK.md:356 (Durum ATLANDI(karar), notta "BITTI (doc-senkron)") · PR: backend #131 (666c56a) · çatı #312 (702163f)
- (1) Yapılan kısım:
  - 409 EMAIL_MEVCUT kaldırıldı; kayıtlı e-postaya 201 + aynı mesaj + tenant/user null dönüyor, hesap sahibine bilgilendirme e-postası gidiyor.
  - Ön yüz her iki durumda da "e-postanızı kontrol edin" ekranını gösteriyor, eski 409'a da aynı ekranla uyumlu.
- (2) Merge'den sonra selfServeController'a GV-19, Y1-B9 ve AJ-09 dokundu; Step4Account'a F-05 ve GV-19 dokundu. İlgili dallar yerinde.
- (3) Backend self-serve-register-enumeration.test.ts:45-105 (4 test) · ön yüz stk-register-check-email.test.tsx:49-86 (5 test).
- (3b) Ön yüzde mutasyon koşuldu:
  - EMAIL_MEVCUT dalı kaldırıldı → 1 FAIL.
  - `!tenant` dalı kaldırıldı → 3 FAIL.
- Eksik (⚠️ nedeni): "aynı yanıt" ölçütü tam karşılanmıyor.
  - Kayıtsız e-postada gövdede tenant ve accessToken var (test :105) ve kullanıcı panele geçiyor.
  - Kayıtlı e-postada null dönüyor ve yalnız e-posta ekranı çıkıyor. Bu fark ayırt edilebilir.
  - Kodda kendisi "bilinen sınır" diye not düşülmüş; çözümü ürün kararı KARAR-102'de.
