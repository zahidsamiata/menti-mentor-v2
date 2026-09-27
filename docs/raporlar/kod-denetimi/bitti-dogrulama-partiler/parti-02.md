> 📸 DONDURULMUŞ (2026-09-27) — BITTI son doğrulama ara dosyası; güncellenmez. Özet ve nihai kategoriler: `docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md`.
> TÜR: 📸 · SON DOĞRULAMA: 2026-09-27 · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)

# Parti 02 — BITTI son doğrulama (2026-09-27)
Denetçi: Opus 5.5 alt-ajan (işi yapmayan) · referans: çatı 191a256 · backend 3bd9ad3 · salt-okuma
Özet: toplam 16 · ✅ 13 · ⚠️ 2 · ❌ 0 · 🔁 1 · 👁 0 (kod ✅ 0) · ❓ 0 · mutasyon: yapılan 6 / kırmızıya dönen 6 / DB gerekli 10 / yapılamadı 0
(Mutasyon yapılan 6 işte 7 mutant koşuldu; GV-07'nin ikinci mutantı (logger süzgeci) yeşil kaldı, bkz. GV-07.)

| İş | Risk | Ölçüt (kısa) | Kanıt dosya:satır | Test dosya:satır | Mutasyon | Kategori | Not |
|---|---|---|---|---|---|---|---|
| P-16 | R1 | mentor-count TenantMembership.role'den | backend/src/controllers/userController.ts:132-144 | backend/tests/mentor-count-membership.test.ts:37-53 | DB gerekli; satır okuması: kırılır | ✅ | FE bağı frontend/src/lib/api/matching.ts:28 → menti/page.tsx:68 |
| U-06 | R1 | OAuth davetli APPROVED olur | backend/src/services/oauth/oauthService.ts:117-121 · frontend/src/components/molecules/OAuthButtons.tsx:21-23 | backend/tests/oauth-invite-approval.test.ts:38-78 · frontend/src/__tests__/oauth-buttons-invite.test.tsx:23-38 | FE: kırmızı (1/2) · BE: DB gerekli, kırılır | ✅ | Kayıt sayfası token'ı iletir: _RegisterContent.tsx:323-327 |
| U-08 | R1 | PENDING eşleşme verisine erişemez | backend/src/controllers/matchingController.ts:24-36,74,127 | backend/tests/matching-approval-gate.test.ts:36-58 | DB gerekli; satır okuması: kırılır | ✅ | Kapsam yalnız mentor-matches + candidates; komşu kapısız uçlar Not'ta ayrı takipte (GV-25 vb.) |
| U-19 | R1 | Profili eksik mentör soluk (KARAR-80/M7) | backend/src/services/matching.ts:554-570 · frontend/src/app/(dashboard)/menti/page.tsx:316,327 | backend/tests/mentor-bookable-status.test.ts:86-110 | DB gerekli; satır okuması: kısmen | ⚠️ | Test yalnız "UserProfile yok" (catch) dalını ölçüyor; profil var ama coreComplete:false dalı testsiz — matching.ts:558 `return true` yapılsa hiçbir assert kırılmaz |
| V-05 | R1 | Küçük kurumda KPI/analytics tek kişiyi ifşa etmez | backend/src/services/kpiReport.service.ts:88-98 · backend/src/controllers/platformTenantController.ts:326-336 | backend/tests/k-anonymity-kpi-analytics.test.ts:28-77 | DB gerekli; satır okuması: kırılır | ✅ | KPI hesabı F-18 ile kpiReport.service'e taşındı, k-anonimlik korunmuş; FE DiscSummary.tsx:12-26 |
| V-06 | R1 | Gömülü fallback JWT secret yok | backend/src/config.ts:21-33 | backend/tests/config-jwt-secret.unit.test.ts:13-17 | kırmızı (1/3) | ✅ | Eski değer yalnız yasak listesi olarak duruyor (config.ts:21,31) |
| Y-02 | R1 | 4 platform okuma ucu denetim izi bırakır | backend/src/controllers/platformController.ts:233,291,321,469 · adminSettingsController.ts:443 | backend/tests/platform-read-audit.test.ts:61-100 | DB gerekli; satır okuması: kırılır | ✅ | Aktör sabit 'platform-admin' (tek paylaşımlı platform anahtarı) |
| GV-04 | R1 | Check-in notlarını yalnız yazan + yönetici görür | backend/src/controllers/meetingCheckInController.ts:112-125 | backend/tests/checkin-visibility.test.ts:59-92 | DB gerekli; satır okuması: kırılır | ✅ | FE çağrısı frontend/src/lib/api/meetings.ts:175 |
| GV-05 | R1 | Mentör başkası adına geri bildirim yazamaz | backend/src/controllers/feedbackLogController.ts:56-68 | backend/tests/feedbacklog-identity.test.ts:63-80 | DB gerekli; satır okuması: kırılır | ✅ | Arayüzde bu POST çağrılmıyor; ölçüt API düzeyi (iç güvenlik) |
| GV-06 | R1 | Menti başkası adına talep açamaz | backend/src/controllers/meetingController.ts:198-201 | backend/tests/create-meeting-identity.test.ts:42-60 | DB gerekli; satır okuması: kırılır | ✅ | Arayüz /api/meetings/book kullanıyor (meetings.ts:154); ölçüt API düzeyi |
| GV-07 | R1 | Sistem günlüğünde ham e-posta yok | backend/src/controllers/platformController.ts:49-52 · backend/src/services/logger.ts:22-23 | backend/tests/platform-login-log-pii.unit.test.ts:21-37 · log-sanitizer.unit.test.ts:12-93 | çağrı yeri: kırmızı · logger süzgeci: YEŞİL kaldı | ⚠️ | Logger katmanı (logger.ts:22-23 süzgeç bağlantısı) testsiz — kaldırılınca 11 test yeşil; yalnız çağrı yeri korunuyor |
| GV-08 | R1 | Hesap kapatınca psikometrik veri hiçbir tabloda kalmaz | backend/src/services/gdprService.ts:106-119,124,130-146,167,197 | backend/tests/gdpr-anonymize.test.ts:70-119,211 | DB gerekli; satır okuması: kırılır | ✅ | Psikometri alanı taşıyan tüm modeller (User, UserProfile, UserResponse, Match) kapsanıyor; MatchFeedback.comment kasıtlı dışarıda (KARAR-39) |
| GV-10 | R1 | Çıkış/rol düşürme/red sonrası erişim anında kesilir | backend/src/middleware/membershipAccess.ts:32-38 · tenant.ts:86-96,120-124 · jwtAuth.ts:40 | backend/tests/membership-access.unit.test.ts:36 · session-revocation.test.ts:38-106 · auth.test.ts:285-301 | kırmızı (1/6) | 🔁 | #138 çıkışta access token'ı kesmiyordu; çıkış ayağını sonradan AJ-03 (f2da8ce) kapattı — güncel hâl ölçütü karşılıyor: evet |
| GV-11 | R1 | Üyeliği kapalı yönetici kurum ayarını açamaz | backend/src/middleware/tenantAdminAuth.ts:42-63 | backend/tests/tenant-admin-inactive-membership.test.ts:54-96 | DB gerekli; satır okuması: kırılır | ✅ | selfServe + adminSettings uçlarının hepsi authenticateTenantAdmin'den geçiyor; eski extractAdminPayload kalmadı |
| GV-13 | R1 | Refresh token DB'de özetli | backend/src/services/refreshToken.ts:25-27 · authController.ts:378,510 · oauthService.ts:182 · selfServeController.ts:327 | backend/tests/refreshToken.unit.test.ts:12-32 · refresh-token-hash.test.ts:46-93 | kırmızı (2/3) | ✅ | 4 yazma noktasının hepsi hashRefreshToken kullanıyor; eski açık-metin kayıtlar geçişte kabul ediliyor (tasarım) |
| GV-14 | R1 | Davet bağlantısı günlükte görünmez | backend/src/services/logUrl.ts:45-78 · middleware/requestLogger.ts:24 · errorHandler.ts:23 | backend/tests/log-url-mask.unit.test.ts:17-68 | kırmızı (1/6) | ✅ | Kalan (kapsam dışı, Not'ta yazılı): OAuth dönüşünde access token sorgu dizesinde |

## Ayrıntı

### P-16
- kaynak: docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:205 · PR: backend #106 (merge 31f28ec), çatı #283
- (1) `countApprovedMentors` artık `prisma.tenantMembership.count({ tenantId, role:'MENTOR', isActive:true, user:{isActive, approvalStatus:'APPROVED'} })` — backend/src/controllers/userController.ts:132-144; k-anonimlik `applyKAnonymity` korunuyor.
- (2) Merge sonrası dosyaya 7 commit dokundu (AJ-09, AN-28, GV-10, GV-24, Y-03, K-08); fonksiyon gövdesi değişmemiş.
- (3) backend/tests/mentor-count-membership.test.ts:37-44 (User.role MENTOR + üyelik MENTI → sayılmaz), :46-53 (pasif üyelik → sayılmaz). Fabrika üyeliği otomatik açıyor (tests/helpers/factories.ts createUser). CI'da koşar.
- (3b) DB gerekli. Satır okuması: eski `prisma.user.count({role:'MENTOR',...})` geri gelirse :43 ve :52'de sayı 4 olur → kırılır.
- (4) frontend/src/lib/api/matching.ts:28 → frontend/src/app/(dashboard)/menti/page.tsx:68 (bekleme odası).

### U-06
- kaynak: :212 · PR: backend #101 (d282359), çatı #273
- (1) backend/src/services/oauth/oauthService.ts:110-121 (PENDING_REVIEW kapısı + davet doğrulaması → APPROVED), :153 (bildirim yalnız PENDING'de); state taşıma oauthStateService.ts:17-40; başlangıç ucu authController.ts:731,760. FE: OAuthButtons.tsx:21-23, _RegisterContent.tsx:323-327; hata mesajı lib/loginMessages.ts:37 (_LoginContent.tsx:11).
- (2) oauthService'e 3, authController'a 14 commit dokundu (GV-13, Y1-B9, AJ-09, AJ-03…); davet kuralı satırları aynı.
- (3) backend/tests/oauth-invite-approval.test.ts:38 (APPROVED), :44/:51/:57 (negatif PENDING), :71 (inceleme kurumu). frontend/src/__tests__/oauth-buttons-invite.test.tsx:23-38 (frontend vitest include `src/**/*.test.{ts,tsx}`).
- (3b) FE mutasyonu: OAuthButtons.tsx:23 inviteToken ekini kaldırdım → 1 kırmızı / 1 yeşil (beklenen). BE: DB gerekli; `approvalStatus` sabit 'PENDING' yapılırsa :38 testi kırılır.
- (4) Kayıt sayfası davet varken OAuth düğmesine token'ı veriyor.

### U-08
- kaynak: :213 · PR: backend #99 (29d5944), çatı #273
- (1) backend/src/controllers/matchingController.ts:24-36 `rejectIfCallerNotApproved`; :74 (mentör adayları), :127 (menti mentor-matches). Rotalar userRoutes.ts:71,82.
- (2) 2 commit (AN-28, Y-03) — kapı yerinde. Test dosyası GV-10 takibiyle (e2bec9e) reddedilen için 401 bekler hâle geldi; PENDING davranışı aynı.
- (3) backend/tests/matching-approval-gate.test.ts:36-41 (PENDING menti 403), :54-58 (PENDING mentör 403), :44-51 (REJECTED 401).
- (3b) DB gerekli. Satır okuması: :74/:127 çağrıları kaldırılırsa :39 ve :57 `403` beklentisi kırılır.
- (4) Ölçüt backend erişim kapısı; menti sayfası onaysızken yalnız mentor-count çağırıyor (menti/page.tsx:68).

### U-19
- kaynak: :214 · PR: backend #146 (66c7dad) + AN-28 takip, çatı #323
- (1) backend/src/services/matching.ts:554-563 her mentör için `computeProfileCompleteness` (hata → soluk), :569-570 `isProfileFaded`/`isFaded`; DTO matchingController.ts:112; FE menti/page.tsx:316,327 (kart soluklaşır, gizlenmez — KARAR-80/M7).
- (2) matching.ts'e 4 commit (PS-A4, AN-07, Y1-B9b, KR-19); AN-07 tamamlanma hesabını ilk N adaya daralttı, mantık aynı.
- (3) backend/tests/mentor-bookable-status.test.ts:71-83 (profil tam → soluk değil), :86-97 (UserProfile yok → isProfileFaded true), :99-110 (kart listede kalır).
- (3b) DB gerekli. Satır okuması: `isProfileFaded = false` yapılırsa :95 kırılır; ama matching.ts:558 `return result.coreComplete` → `return true` yapılırsa hiçbir assert kırılmaz — "profil var ama çekirdek eksik" dalı testsiz. `isCoreComplete` için ayrı birim testi de yok (tests/ altında grep: profile-completeness/isCoreComplete → yalnız mock).
- (4) FE bağlı. Görsel soluklaşma canlıda insan gözüyle bakılmalı.
- Sonuç: ⚠️ — asıl vaka (eksik profil + profil satırı var) testle kanıtlanmıyor.

### V-05
- kaynak: :220 · PR: backend #100 (c719ab6), çatı #273
- (1) KPI hesabı F-18 ile backend/src/services/kpiReport.service.ts:88-98'e taşınmış, `applyKAnonymity` korunmuş (CSV de aynı kaynaktan); platform analizi backend/src/controllers/platformTenantController.ts:326-336 (eşik altı DISC grubu çıkarılır, toplam görünenlerden).
- (2) adminController'a 8, platformTenantController'a 1 commit; k-anonimlik hâlâ yerinde.
- (3) backend/tests/k-anonymity-kpi-analytics.test.ts:28 (DISC grubu gizlenir), :64-68 (3'ten az NPS yanıtı → null/0), :72-77 (eşik üstü görünür).
- (3b) DB gerekli. Satır okuması: filtre kaldırılırsa :28 testinde "I" grubu döner → kırılır; NPS bastırması kaldırılırsa :68 kırılır.
- (4) FE platform/tenants/[id]/_components/DiscSummary.tsx:12-26, admin KPI sayfası lib/api/admin.ts. Not: başlıktaki health-metrics ucu (adminController.ts:111) yönetici drill-down'ı olarak ad döndürüyor ve DISC döndürmüyor; ölçütün dışında.

### V-06
- kaynak: :221 · PR: backend #98 (a07512a), çatı #273
- (1) backend/src/config.ts:24-30 JWT_SECRET yoksa/boşsa açılışta hata; :31-33 canlıda eski herkese açık değer reddi. src altında başka fallback yok (grep `JWT_SECRET ??|JWT_SECRET ||` → 0).
- (2) 3 commit (F-05, IC-05, GV-22) — JWT bloğu değişmemiş.
- (3) backend/tests/config-jwt-secret.unit.test.ts:13-17 (boş → hata), :19-26, :28-33.
- (3b) Mutasyon: config.ts:24 `|| KNOWN_PUBLIC_DEV_JWT_SECRET` geri eklendi → :13 testi KIRMIZI (1/3).
- (4) Kullanıcıya görünmez (iç güvenlik).

### Y-02
- kaynak: :227 · PR: backend #156 (0deb76b), çatı #338
- (1) backend/src/controllers/platformController.ts:233 VIEW_PLATFORM_LOGS, :291 VIEW_PENDING_TENANTS, :321 VIEW_ALL_TENANTS, :469 VIEW_SUSPICION_REPORTS; komşu mükerrer uç adminSettingsController.ts:443 (iz + maskeleme). Yazıcı services/platformAudit.ts:20-35.
- (2) 3 + 2 commit (AJ-09, AJ-03, Y1-B9, E-3d) — iz satırları yerinde.
- (3) backend/tests/platform-read-audit.test.ts:61-79 (4 uç döngüsü, meta'da PII yok), :81-85 (oturumsuz → iz yok), :87-100 (super-admin maskeli + iz).
- (3b) DB gerekli. Satır okuması: herhangi bir `auditPlatformAction` satırı silinirse o uç için :73 `not.toBeNull` kırılır.
- (4) FE bu 4 ucu kullanıyor: frontend/src/lib/api/platform.ts:56,94,107.

### GV-04
- kaynak: :241 · PR: backend #93 (d7fd9eb), çatı #269
- (1) backend/src/controllers/meetingCheckInController.ts:103-125 (kimlik oturumdan; taraf/yönetici değilse 403; yönetici değilse yalnız kendi kaydı).
- (2) 1 commit (Y-03), getCheckIns değişmemiş.
- (3) backend/tests/checkin-visibility.test.ts:59-72 (taraflar yalnız kendi kaydı), :74-76 (yönetici hepsi), :79-92 (dışarıdan 403, başka kurum 404, kimliksiz 401).
- (3b) DB gerekli. Satır okuması: :123 filtresi kaldırılırsa :61 total 2 olur; :115 kapısı kaldırılırsa :80 403 beklentisi kırılır.
- (4) FE frontend/src/lib/api/meetings.ts:175. Komşu /pair-signal yalnız ADMIN (meetingRoutes.ts:141-143).

### GV-05
- kaynak: :242 · PR: backend #95 (2d4c824), çatı #269
- (1) backend/src/controllers/feedbackLogController.ts:56-68 (MENTOR: mentorId === oturum; çift için görüşme şartı).
- (2) 2 commit (Y-03, Y-04 sayfalama) — kontrol yerinde.
- (3) backend/tests/feedbacklog-identity.test.ts:63-69 (başkası adına 403 + kombinasyon skoru değişmez), :71-75, :77-80.
- (3b) DB gerekli. Satır okuması: :58-60 kaldırılırsa :66 403 beklentisi kırılır.
- (4) Arayüzde POST /api/feedback-logs çağrısı yok (frontend/src/lib/api altında grep); ölçüt API düzeyi, uygun.

### GV-06
- kaynak: :243 · PR: backend #94 (48c5b97), çatı #269
- (1) backend/src/controllers/meetingController.ts:198-201 (MENTI yalnız kendi mentiId'si); rota meetingRoutes.ts:76-78 `requireRole('ADMIN','MENTI')`.
- (2) 11 commit dosyaya dokundu; kontrol satırları yerinde.
- (3) backend/tests/create-meeting-identity.test.ts:42-47 (başkası adına 403 + kayıt yok), :35-39, :50-55, :58.
- (3b) DB gerekli. Satır okuması: :199-201 kaldırılırsa :45 kırılır.
- (4) Arayüz randevu için /api/meetings/book kullanıyor (meetings.ts:154, token'dan kimlik); bu uç API düzeyinde kapatıldı.

### GV-07
- kaynak: :244 · PR: backend #128 (33fdca8), çatı #308
- (1) Çağrı yeri backend/src/controllers/platformController.ts:49-52 (`emailProvided`), logger süzgeci backend/src/services/logger.ts:22-23 (`scrubText` + `sanitizeLogMeta`), yardımcı services/logSanitizer.ts.
- (2) Merge sonrası dört dosyaya dokunan commit yok (platformController'da başka satırlar değişti).
- (3) backend/tests/platform-login-log-pii.unit.test.ts:21-37 (SystemLog'da e-posta yok); backend/tests/log-sanitizer.unit.test.ts:12-93 yalnız saf fonksiyonları test ediyor.
- (3b) Mutant A (çağrı yeri `email: email ?? '(boş)'`) → KIRMIZI. Mutant B (logger.ts:22-23 süzgeç bağlantısını kaldır) → 11/11 YEŞİL: logger katmanının süzgeci gerçekten çağırdığını ölçen test yok.
- (4) Kullanıcıya görünmez.
- Sonuç: ⚠️ — iki katmanlı düzeltmenin logger katmanı testsiz; başka bir çağrı yeri e-posta yazsa bunu yakalayacak test yok.

### GV-08
- kaynak: :245 · PR: backend #145 (923ab6d), çatı #329
- (1) backend/src/services/gdprService.ts:106-119 (User kişilik alanları + password/rejectionReason null), :124 (UserResponse silinir), :130-139 (UserProfile DISC/OCEAN/arketip), :143-146 (Match arketip kopyası, yalnız anonimleşen tarafın alanı), :167 (Meeting.locationUrl), :197 (UserReport.reviewNote). Şemada psikometri taşıyan kullanıcıya bağlı modeller: User, UserProfile, UserResponse, Match — hepsi kapsanıyor.
- (2) 2 commit (AJ-17, Y3b) — anonimleştirme gövdesi değişmemiş.
- (3) backend/tests/gdpr-anonymize.test.ts:70-75, :80-99 (karşı taraf korunur), :102-119, :211.
- (3b) DB gerekli. Satır okuması: :144 kaldırılırsa :98 kırılır; :118 kaldırılırsa :74 kırılır.
- (4) Görünmez (veri tarafı). MatchFeedback.comment kasıtlı dışarıda (KARAR-39), ölçüt psikometri için karşılanıyor.

### GV-10
- kaynak: :247 · PR: backend #138 (0fee83c), çatı pointer d87b227
- (1) backend/src/middleware/membershipAccess.ts:32-38 (üyelik pasif / hesap pasif / REJECTED → ret), tenant.ts:86-96 (401 HESAP_PASIF), :120-124 (rol her istekte üyelikten); aynı kural tenantAdminAuth.ts:42-63.
- (2) tenant.ts'e 2 commit (Y1-B9) — ekleme, kural aynı. Çıkış ayağı: #138 yalnız refresh'i siliyordu; access token'ın çıkışta anında kesilmesi sonradan AJ-03 (f2da8ce) ile eklendi — jwtAuth.ts:40 `isAccessTokenRevoked`.
- (3) backend/tests/membership-access.unit.test.ts:19-41; backend/tests/session-revocation.test.ts:38 (rol düşürme), :69 (red), :89 (pasif), :106 (çıkış sonrası refresh); backend/tests/auth.test.ts:285-301 (AJ-03: çıkış sonrası access token 401).
- (3b) Mutasyon: membershipAccess.ts:34 REJECTED koşulu kaldırıldı → :36 testi KIRMIZI (1/6).
- (4) Görünür etki: reddedilen/rolü düşen kullanıcı sonraki istekte 401/403.
- Sonuç: 🔁 — BITTI işaretinde çıkış ayağı eksikti, AJ-03 tamamladı; güncel hâl ölçütü karşılıyor: evet (not: iptal listesi bellek içi, accessTokenRevocation.ts).

### GV-11
- kaynak: :248 · PR: backend #132 (da219d2)
- (1) backend/src/middleware/tenantAdminAuth.ts:37-63 (aud kontrolü, üyelik aktif + rolü ADMIN değilse 403, hesap pasifse 401); kullanım selfServeController.ts:374,431,477,580,730,744 ve adminSettingsController.ts:35,92,186,239. Eski `extractAdminPayload`/`verifyToken` bu iki controller'da kalmadı (grep → 0).
- (2) tenantAdminAuth'a 2 commit (GV-10, Y1-B9) — ortak kurala bağlandı, güçlendi.
- (3) backend/tests/tenant-admin-inactive-membership.test.ts:54-63 (pasif üyelik 403 + ayar değişmez), :66-78, :81-87, :90-96, :106-112.
- (3b) DB gerekli. Satır okuması: :53 kapısı kaldırılırsa :59 403 beklentisi kırılır.
- (4) Kurum ayarları ekranı bu uçları kullanıyor; görünür etki 403.

### GV-13
- kaynak: :249 · PR: backend #137 (392e2e0)
- (1) backend/src/services/refreshToken.ts:25-27 (SHA-256), :36-47 (arama: özet + geçiş için eski ham değer); yazma noktaları authController.ts:378,510, oauthService.ts:182, selfServeController.ts:327 — `refreshToken.create` çağrılarının hepsi özetli.
- (2) Yardımcı ve testlerine sonradan dokunulmamış.
- (3) backend/tests/refreshToken.unit.test.ts:12-32; backend/tests/refresh-token-hash.test.ts:46-55 (DB'de ham değer yok), :57-69, :72-79 (DB değeri çerez yerine geçmez).
- (3b) Mutasyon: hashRefreshToken ham değeri döndürsün → 2/3 KIRMIZI. (Çağrı yeri mutasyonu DB gerekli; satır okuması: authController.ts:378 ham yazarsa refresh-token-hash.test.ts:51/54 kırılır.)
- (4) Görünmez.

### GV-14
- kaynak: :250 · PR: backend #129 (d9e4f5a), çatı #308
- (1) backend/src/services/logUrl.ts:45-78 (davet yol parçası, code/state/token parametreleri, JWT biçimli parça), bağlantı middleware/requestLogger.ts:24 ve middleware/errorHandler.ts:23.
- (2) Merge sonrası dokunan commit yok.
- (3) backend/tests/log-url-mask.unit.test.ts:17-47 (saf fonksiyon), :52-68 (requestLogger satırında token yok).
- (3b) Mutasyon: requestLogger.ts:24 maskeleme kaldırıldı → :52 testi KIRMIZI (1/6). errorHandler.ts:23 bağlantısı ayrıca test edilmiyor (ikincil yol).
- (4) Görünmez. Kalan (satırda yazılı, kapsam dışı): OAuth dönüşünde access token sorgu dizesinde.
