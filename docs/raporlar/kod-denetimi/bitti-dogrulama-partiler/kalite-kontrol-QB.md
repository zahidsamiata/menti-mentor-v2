# Kalite kontrolü QB — BITTI son doğrulama (2026-09-27)
Denetçi: opus alt-ajan (partileri yapmayan) · referans: çatı 191a256 · backend 3bd9ad3 · salt-okuma
Özet: kontrol edilen 26 · TUTAR 24 · ÇÜRÜDÜ 2 (parti-01: 0 · parti-02: 2) · yeniden koşulan mutasyon 0 (iki ÇÜRÜDÜ bulgu da DB gerektiren entegrasyon testine dayandığı için satır okuması ve grep ile kanıtlandı)

| İş | Parti | Parti kategorisi | QC kararı | Doğru kategori | Kanıt dosya:satır | Kalan (⚠️/🔁/👁 için) | Güvenlik/KVKK etkisi | Karar gerekebilir |
|---|---|---|---|---|---|---|---|---|
| GV-01 | parti-01 | ✅ | TUTAR | ✅ | sjtScoringController.ts:37-47,264-278 · feedback.service.ts:57-64 (taraf kontrolü upsert/EARLY_EXIT öncesi) · tests/scoring-feedback-ownership.test.ts:86-115 | — | — | — |
| GV-02 | parti-01 | ✅ | TUTAR | ✅ | feedbackController.ts:50-58 (yazmadan önce taraf) · :70-96 alan bölümlemesi · tests/meeting-feedback-ownership.test.ts:77-115 | — | — | — |
| K-12 | parti-01 | ✅ | TUTAR | ✅ | kvkkSummary.ts:55-103 · DataPrivacySection.tsx:96 · profile/page.tsx:468 · __tests__/kvkk-summary.test.ts:32-66; alanlar gdprService.ts:316-365 ile eşleşiyor | — (küçük not: rıza satırı ham kod gösterir, ör. ACIK_RIZA) | — | — |
| P-00 | parti-01 | ✅ | TUTAR | ✅ | mask.ts:70-75 · userController.ts:143 · tests/mentor-count-k-anonymity.unit.test.ts:19-43 · mentor-count-membership.test.ts:34 (toEqual bağlantıyı kilitler) | — | — | — |
| V-03 | parti-01 | ✅ | TUTAR | ✅ | userRoutes.ts:91-96 requireSelfOrAdmin('mentorId') · authorize.ts:70-88 · tests/visibility-optin-idor.test.ts:47-54 | — | — | — |
| V-10 | parti-01 | ✅ | TUTAR | ✅ | userRoutes.ts:192-197 · rateLimiter.ts:234-245 (data-export:userId kovası) · tests/export-id-rate-limit.test.ts:38-50 | — | — | — |
| V-13 | parti-01 | ✅ | TUTAR | ✅ | server.ts:142-148 · tests/tags-suggest-mount.test.ts:28-49 · FE lib/api/tags.ts:53-54 | — | — | — |
| Y-01 | parti-01 | ✅ | TUTAR | ✅ | config.ts:99-106,149 · server.ts:57 (tek CORS okuyucusu) · tests/allowed-origins.unit.test.ts:11-40 | — | — | — |
| KR-02 | parti-01 | ✅ | TUTAR | ✅ | AuthProvider.tsx:62-65,124-143 · authController.ts:529-534 · __tests__/session-tenant-branding.test.tsx:49-72 · tests/session-tenant-branding.test.ts:22-45 | — | — | — |
| KR-04 | parti-01 | ✅ | TUTAR | ✅ | adaptiveTestController.ts:118-126 · tests/adaptive-preview-scope.test.ts:42-53 | — | — | — |
| KR-07 | parti-01 | ✅ | TUTAR | ✅ | algorithmTuner.ts:51-58,168-187,293-330,362 · tests/algorithm-tuner-nps-scale.unit.test.ts:17-85 | — | — | — |
| K-19 | parti-01 | ✅ | TUTAR | ✅ | meetingController.ts:573-574,615-617,649-651 · mentor/page.tsx:103-107 · meetings/page.tsx:87-92 · tests/meeting-location-url.test.ts:67,132,140 · __tests__/mentor-approve-link.test.tsx:55-70 | — | — | — |
| F-18 | parti-01 | ✅ | TUTAR | ✅ | csv.ts:21-39 · kpiReport.service.ts:137-175 · adminRoutes.ts:40-46 · adminController.ts:74-96 · admin/kpi/page.tsx:50-70 · __tests__/admin-kpi-csv-download.test.tsx:37-60 | — | — | — |
| P-16 | parti-02 | ✅ | TUTAR | ✅ | userController.ts:132-144 (tenantMembership.count) · tests/mentor-count-membership.test.ts:33-53 | — | — | — |
| U-06 | parti-02 | ✅ | TUTAR | ✅ | oauthService.ts:116-121,153 · OAuthButtons.tsx:21-23 · tests/oauth-invite-approval.test.ts:38-71 | — | — | — |
| U-08 | parti-02 | ✅ | ÇÜRÜDÜ | ⚠️ | kapı yalnız matchingController.ts:74,127 · sjtScoringRoutes.ts:25-29 + sjtScoringController.ts:90-148 rank-mentors onay kontrolsüz, requireAuth yeter | PENDING kullanıcı POST /api/scoring/rank-mentors ile kendi mentör sıralamasını (mentör userId + skor) hâlâ alabiliyor; kapı bu uca da eklenmeli | evet — onaysız hesap eşleşme verisine (ad olmadan) API'den ulaşıyor | hayır — U-08 kuralının aynısı, teknik |
| V-05 | parti-02 | ✅ | TUTAR | ✅ | kpiReport.service.ts:88-98 · platformTenantController.ts:326-342 · tests/k-anonymity-kpi-analytics.test.ts:28-77 | — | — | — |
| V-06 | parti-02 | ✅ | TUTAR | ✅ | config.ts:21-33 (src'de başka yedek yok, grep) · tests/config-jwt-secret.unit.test.ts:13-33 | — | — | — |
| Y-02 | parti-02 | ✅ | TUTAR | ✅ | platformController.ts:233,291,321,469 · tests/platform-read-audit.test.ts:61-100 | — | — | — |
| GV-04 | parti-02 | ✅ | TUTAR | ✅ | meetingCheckInController.ts:102-128 · diğer okuyucular yalnız ADMIN (adminRoutes.ts:63, coachingSuggestions.ts:73) · tests/checkin-visibility.test.ts:59-92 | — | — | — |
| GV-05 | parti-02 | ✅ | TUTAR | ✅ | feedbackLogController.ts:56-68 · feedbackLogRoutes.ts:17 · tests/feedbacklog-identity.test.ts:63-80 | — | — | — |
| GV-06 | parti-02 | ✅ | TUTAR | ✅ | meetingController.ts:196-201 · meetingRoutes.ts:75-78 · tests/create-meeting-identity.test.ts:42-60 | — | — | — |
| GV-08 | parti-02 | ✅ | ÇÜRÜDÜ | ⚠️ | kod tam: gdprService.ts:106-119,124,130-146 · test eksik: tests/gdpr-anonymize.test.ts yalnız User (:61-62) ve Match (:80-99) assert ediyor; userProfile/userResponse assert yok (grep boş) | UserProfile (OCEAN/arketip/DISC) temizliği ve UserResponse silinmesi testsiz; bu satırlar geri alınsa hiçbir test kırılmaz | evet — bugün sızıntı yok ama psikometrik verinin geride kalmasına yol açacak gerileme sessiz kalır | hayır |
| GV-11 | parti-02 | ✅ | TUTAR | ✅ | tenantAdminAuth.ts:26-70 · 10 uçun hepsi kapıdan geçiyor (selfServeController 6, adminSettingsController 4) · tests/tenant-admin-inactive-membership.test.ts:54-112 | — | — | — |
| GV-13 | parti-02 | ✅ | TUTAR | ✅ | refreshToken.ts:25-27 · 4 yazma noktası özetli (authController.ts:376,508 · oauthService.ts:181 · selfServeController.ts:325) · tests/refresh-token-hash.test.ts:46-80 | — | — | — |
| GV-14 | parti-02 | ✅ | TUTAR | ✅ | logUrl.ts:17-25,45-78 (inviteToken sonek kuralıyla maskeli) · requestLogger.ts:24 · errorHandler.ts:23 · tests/log-url-mask.unit.test.ts:17-68 | — | — | — |

## Notlar

### U-08 — ✅ → ⚠️ KISMEN (parti-02)
- Ölçüt: "PENDING kullanıcı eşleşme verisine erişemiyor". Onay kapısı `rejectIfCallerNotApproved` (backend/src/controllers/matchingController.ts:24-36) yalnız iki uçta çağrılıyor: mentör adayları (:74) ve menti mentor-matches (:127).
- Aynı veriyi veren komşu uç `POST /api/scoring/rank-mentors` (backend/src/routes/sjtScoringRoutes.ts:25-29) yalnız `requireAuth()` ile korunuyor. `rankMentorsHandler` (backend/src/controllers/sjtScoringController.ts:90-148) sahipliğe bakıyor (GV-25, :101-108) ama `approvalStatus`'a hiç bakmıyor. PENDING kullanıcı requireTenant'tan geçiyor (tests/matching-approval-gate.test.ts:44-47'deki yorum). DISC testini bitiren PENDING menti önce `compute-profile` ile kendi arketipini üretebiliyor (:50-88, yalnız kendi profili), sonra `rank-mentors` ile sertifikalı mentörlerin `mentorUserId` + skor listesini alabiliyor (scoring.service.ts:169-193). Yanıtta ad yok ama bu kişiye özel eşleşme verisi.
- BITTI notu bu ucu "kapısız komşu uçlar" arasında sayıp GV-25'e bırakmış. GV-25 ise yalnız sahiplik kontrolü ekledi, onay kapısı eklemedi. Aktif kuyrukta bu açığı izleyen bir satır yok (`00-KUYRUK.md`'de "rank-mentors" ve "onay kapı" aramaları boş döndü).
- Öneri: aynı kapıyı `rankMentorsHandler`'a da ekleyen 🟢 bir AJ- satırı ve PENDING için negatif test.

### GV-08 — ✅ → ⚠️ KISMEN (parti-02)
- Kod ölçütü karşılıyor: User'daki kişilik alanları (backend/src/services/gdprService.ts:106-119), UserResponse silme (:124), UserProfile DISC/OCEAN/arketip (:130-139) ve Match arketip kopyası (:143-146) temizleniyor.
- Ölçüt "hiçbir tabloda psikometrik veri kalmıyor" diyor. Test ise yalnız User alanlarını (tests/gdpr-anonymize.test.ts:61-62, :70-75) ve Match arketipini (:80-99) doğruluyor. `tests/` altında anonimleştirmeden sonra `userProfile` (oceanX/archetype/discD-C) ya da `userResponse` sayısını doğrulayan tek bir satır yok: `anonymizeUser` testleri (gdpr-anonymize, me-data-rights) içinde grep boş döndü.
- Bu yüzden parti notundaki "UserProfile, UserResponse kapsanıyor" sözü kod için doğru, test kanıtı için yanlış. :124 ya da :130-139 geri alınsa hiçbir test kırılmaz. Mutasyon denenmedi çünkü entegrasyon testi DB gerektiriyor; sonuç satır okuması ve grep'e dayanıyor.
- Öneri: `gdpr-anonymize.test.ts`'e UserProfile psikometri alanları için null/0 ve UserResponse sayısı için 0 beklentisi eklenmeli (🟢, test ekleme).
