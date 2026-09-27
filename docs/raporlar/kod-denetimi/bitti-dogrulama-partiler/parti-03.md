# Parti 03 — BITTI son doğrulama (2026-09-27)
Denetçi: Claude Opus 5.5 alt-ajan (işi yapmayan) · referans: çatı 191a256 · backend 3bd9ad3 · salt-okuma
Özet: toplam 16 · ✅ 11 · ⚠️ 3 · ❌ 0 · 🔁 2 · 👁 0 (kod ✅ 0) · ❓ 0 · mutasyon: yapılan 14 / kırmızıya dönen 12 / DB gerekli 6 / yapılamadı 0

| İş | Risk | Ölçüt (kısa) | Kanıt dosya:satır | Test dosya:satır | Mutasyon | Kategori | Not |
|---|---|---|---|---|---|---|---|
| GV-16 | R1 | Yüklenen fotoğraf konum taşımıyor | backend/src/services/imageSanitize.ts:38,123 · backend/src/controllers/avatarController.ts:45,69 · backend/src/services/avatarStorage.ts:56 | backend/tests/image-sanitize.unit.test.ts:93-99,160-187 | APP1 düşürme geri alındı → 4/14 KIRMIZI | ✅ | Eski yüklenmiş fotoğraflar yerinde (geriye dönük temizlik ayrı karar). |
| GV-18 | R1 | Sürüm değişince yeniden onay ekranı | backend/src/services/consentService.ts:189-193 · backend/src/controllers/authController.ts:389,528,868,893-910 · frontend/src/components/organisms/ReconsentBanner.tsx:22 · frontend/src/app/(dashboard)/layout.tsx:18 | backend/tests/gv18-reconsent.test.ts:29-71 · backend/tests/consentService.test.ts:100-131 · frontend/src/__tests__/reconsent-banner.test.tsx:26-58 | FE banner koşulu → KIRMIZI · BE: DB gerekli | ✅ | Canlıda bugün görünmez (CONSENT_VERSION yer tutucu); layout mount'u testte ölçülmüyor. |
| GV-19 | R1 | Uygulama içi şifre değiştirme + zayıf şifre reddi | backend/src/services/passwordPolicy.ts:30-35 · backend/src/controllers/authController.ts:38,63,70,640 · backend/src/routes/authRoutes.ts:63-68 · frontend/src/app/(dashboard)/profile/page.tsx:465 | backend/tests/password-policy.unit.test.ts:24-29 · backend/tests/gv19-change-password.test.ts:41-192 · frontend/src/__tests__/change-password.test.tsx:43-127 | harf/rakam regex kaldırıldı → 2/10 KIRMIZI | ✅ | |
| GV-21 | R1 | Yeni /api/auth adresi OAuth'a düşmüyor, test yakalar | backend/src/controllers/authController.ts:723-725,743,778 · backend/src/routes/authRoutes.ts:81-87 | backend/tests/auth-route-order.test.ts:9-27 | hasOwn→in: 2/3 KIRMIZI · /me rotası catch-all sonrasına: 1/3 KIRMIZI | ✅ | DB'siz supertest; erişilemez sahte DATABASE_URL ile koşuldu. Test yalnız /me'yi korur. |
| GV-23 | R1 | Hesap kapatınca oturum çerezi tutarlı temizleniyor | backend/src/controllers/gdprController.ts:145 · backend/src/utils/authCookies.ts:22-24 | backend/tests/me-data-rights.test.ts:121-127 | DB gerekli | 🔁 | AJ-09 (19753e1) clearRefreshCookie'yi utils/authCookies.ts'e taşıdı; güncel hâl ölçütü karşılıyor: evet. |
| GV-24 | R1 | Onaylanmamış kullanıcı tekil profili okuyamıyor | backend/src/controllers/userController.ts getUser (onay kapısı + approvalStatus filtresi, ONAY_BEKLENIYOR) | backend/tests/user-detail-approval-gate.test.ts:28-80 | DB gerekli | ✅ | Sonraki 4 commit getUser kapılarına dokunmadı (diff doğrulandı). |
| GV-25 | R1 | Yalnız kendi mentör sıralaması | backend/src/controllers/sjtScoringController.ts rankMentorsHandler (isAdmin/userId kontrolü → 403) | backend/tests/rank-mentors-ownership.test.ts:37-76 | DB gerekli | ✅ | Ucun ekran çağıranı yok (satırda da yazıyor); onay kapısı eksikliği ayrı iş. |
| PS-01 | R1 | Yenilemede sıra değişmiyor, 500+ kurumda aday kaybolmuyor | backend/src/services/matching.ts:76-84,231,386,486,516 | backend/tests/matching-stable-order.unit.test.ts:73-108 | eşitlik kırıcı `return 0` → 3/3 KIRMIZI | 🔁 | AN-07 (57cd7d4) take:500 kesmesini keyset sayfalamaya çevirdi; ölçütün 500+ kısmı AN-07 ile karşılandı; güncel hâl ölçütü karşılıyor: evet. |
| PS-02 | R1 | Onboarding vektörü güvenle yazılıyor | backend/src/controllers/onboardingController.ts:480,493 | backend/tests/onboarding-disc-confidence.unit.test.ts:24-120 | :480 confidence kaldırıldı → 6/6 YEŞİL | ⚠️ | Test boş: düzeltme satırını değil, testin kendi kurduğu vektörü ölçüyor; persist edilen discVector.confidence hiçbir testte assert edilmiyor. |
| PS-06 | R1 | Güven paydası kendi kurumunun havuzu | backend/src/services/discVectorService.ts:72-86 · backend/src/controllers/questionController.ts:337,401 | backend/tests/discVector-tenant-cache.unit.test.ts:29-65 · backend/tests/discVector-tenant-confidence.test.ts:63-79 | OR tenant filtresi silindi → 2/3 KIRMIZI | ✅ | |
| PS-07 | R1 | Eşleştirme anlamı testle korunuyor | backend/tests/matching-semantics.unit.test.ts:45-149 · backend/src/services/matching.ts:209,469 (#122 kendini dışlama) | backend/tests/matching-semantics.unit.test.ts:90 · backend/tests/matching-ranking.test.ts:105-121,191-204 | ağırlık takası → 1/11 KIRMIZI · #122: DB gerekli | ✅ | Ağırlık takasını yalnız 1 test yakaladı (varsayılan ağırlıkta sektör-baskın testi yeşil kaldı). |
| PS-08 | R1 | Koşullu testler gerçek assert | backend/tests/feedback-loop.test.ts (hedef menti find + toBeDefined + toBeLessThan) · backend/tests/matching.test.ts (eşik=90, length>0, not.toContain(low)) | aynı dosyalar (cea49b3 sonrası değişmedi) | DB gerekli | ✅ | Satır okuması: kalite çarpanı ya da eşik filtresi bozulursa toBeLessThan / not.toContain kırılır; boş liste artık kırmızı. |
| PS-09 | R1 | Formül vakaları CI'da | backend/tests/scoring-formula-cases.unit.test.ts:18-62 · backend/vitest.config.ts:28 · backend/.github/workflows/ci.yml:58 | backend/tests/scoring-formula-cases.unit.test.ts:40-56 | ağırlık takası → 3/17 KIRMIZI | ✅ | 17 beklenen değer kaynak betikle (scoring.test-cases.ts:49-119) birebir. |
| PS-10 | R1 | Mentör yokken doğru sebep, DISC'e yönlendirme yok | frontend/src/app/(dashboard)/menti/page.tsx:295-302 · backend/src/services/matching.ts:525-531 | frontend/src/__tests__/menti-mentor-card-bookable.test.tsx:118-124 | eski metin+link geri → 1/5 KIRMIZI | ✅ | PS-A4 eşiği sonradan eklendi ama eşik boşaltırsa atlanıyor (matching.ts:531), mesaj hâlâ doğru. Metin AN-10 ile "mentör" yazımına geçti. |
| PS-A1 | R1 | Motor doğru ölçekte, testler kanıtlıyor | backend/src/services/disc-to-ocean.adapter.ts:22-24 · backend/src/services/scoring.service.ts:94-101 | backend/tests/disc-to-ocean.unit.test.ts:30-150 | adapter ×100 kaldırıldı → 8/24 KIRMIZI · çağrı noktası eski hâle → 24/24 YEŞİL | ⚠️ | Asıl hata yeri scoring.service.ts:94 çağrısı hiçbir testte ölçülmüyor; iki DiscVector tipi hâlâ ayrı (scoring.ts:12 · scoring.config.ts:8). |
| IC-06 | R1 | Kayıtlı/kayıtsız e-posta için aynı yanıt | frontend/src/lib/loginMessages.ts:30-58 · frontend/src/components/organisms/LoginForm.tsx:99 · frontend/src/app/(auth)/login/_LoginContent.tsx:11 · backend/src/controllers/authController.ts:324-331 | frontend/src/__tests__/login-enumeration-safe.test.tsx:40-78 | eşleme+tek tip mesaj geri → 4/6 KIRMIZI | ⚠️ | Ekran metni tek tip; ancak OAuth dönüş adresindeki ?error= kodu hâlâ hesaba göre farklı (backend/src/services/oauth/oauthService.ts:65-79), satırda "kalan" olarak yazılı. |

## Ayrıntı
### GV-16
- kaynak: docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:252 · PR: backend #116 (2c22a7c) · çatı #298 (9836ac3)
- (1) JPEG APP1/APP13/COM, PNG eXIf/tEXt, WEBP EXIF/XMP düşürülüyor (imageSanitize.ts:38,146); yön etiketi yalnız orientation içeren yeni APP1 ile korunuyor (:69-84,110); EOI sonrası atılıyor (:109). Kontrolcü diske `sanitized.clean` yazıyor (avatarController.ts:45,69); dosya adı `randomUUID()` (avatarStorage.ts:56). (2) 2c22a7c..HEAD bu üç dosyaya commit yok. (3) image-sanitize.unit.test.ts 14 test; GPS dizgisinin çıktıda olmadığı assert ediliyor (:99,162,187). (3b) JPEG_DROP'tan 0xe1 çıkarıldı → 4 test kırmızı. (4) Ön yüz POST /api/users/me/avatar (frontend/src/lib/api/profile.ts:40).

### GV-18
- kaynak: :253 · PR: backend #147 (35dfcf2) · çatı #324 (3f0e845)
- (1) hasCurrentSignupConsent yalnız ACIK_RIZA, LEGACY_VERSION→'v1.0' normalize (consentService.ts:174-193); login/refresh/me needsReconsent (authController.ts:389,528,868); POST /reconsent kimliği oturumdan alıyor (authController.ts:893-910, authRoutes.ts:58). Banner (ReconsentBanner.tsx:22) layout'ta (layout.tsx:18). (2) authController'a sonra 6 commit dokundu; needsReconsent/reconsent satırları yerinde. (3) gv18-reconsent.test.ts: yoksa true (:31), güncelde false (:37), legacy false (:46), /me (:52), reconsent sonrası false + satırlar (:55-68), 401 (:71). consentService.test.ts:100-131. (3b) FE: `!user?.needsReconsent` → `!user` → "false ise render etmez" kırmızı. BE satır okuması: kontrol her zaman true dönerse gv18-reconsent.test.ts:31,52 ve consentService.test.ts:101,112 kırılır. (4) Tüm dashboard alanlarında mount; canlıda sürüm artmadığı için bugün görünmez (beklenen).

### GV-19
- kaynak: :254 · PR: backend #152 (b6418c2) · çatı #335 (576cf53)
- (1) passwordSchema harf+rakam, 8-128 (passwordPolicy.ts:30-35); kayıt/sıfırlama/değiştirme/self-serve kullanıyor (authController.ts:38,63,70 · selfServeController.ts:195); changePassword mevcut şifre + diğer oturumları düşürme (authController.ts:640-690). (2) passwordPolicy.ts'e sonra commit yok; profile/page.tsx'e yalnız AJ-07 (renk) — ChangePasswordSection hâlâ :465. (3) password-policy.unit.test.ts:24-29 "12345678"/"abcdefgh" ret; gv19-change-password.test.ts 10 senaryo (yanlış mevcut şifre, gövdeden kimlik, OAuth 409, oturum düşürme); change-password.test.tsx 9 test. (3b) iki regex kaldırıldı → 2 kırmızı. (4) Profil sayfasında bölüm, API /api/auth/change-password (frontend/src/lib/api/auth.ts:95).

### GV-21
- kaynak: :256 · PR: backend #111 (1d42040) · çatı #289
- (1) isOAuthProviderKey `Object.hasOwn` (authController.ts:723-725), redirect/callback'te 404/yönlendirme (:743,778); rota sırası uyarısı (authRoutes.ts:81). (2) authRoutes'a sonra 5 commit (F-05, Y1-B9, GV-19, GV-18); /:provider hâlâ en sonda (:86-87). (3) auth-route-order.test.ts 3 test. (3b) Test DB'ye dokunmadığı için yerelde koşuldu (özel include config + erişilemez DATABASE_URL, test değişmedi): hasOwn→`in` → 2 kırmızı; /me satırı /:provider sonrasına taşındı → 1 kırmızı. (4) Kullanıcıya görünmez sertleştirme.

### GV-23
- kaynak: :258 · PR: backend #110 (1cdc7fe) · çatı #289
- (1) Hesap kapatma clearRefreshCookie(res) (gdprController.ts:145) → httpOnly+secure+sameSite strict (utils/authCookies.ts:22-24). (2) 19753e1 (AJ-09) yardımcıyı authController'dan utils/authCookies.ts'e taşıdı; seçenekler aynı. (3) me-data-rights.test.ts:121-127 mm_refresh için Expires 1970 + HttpOnly + SameSite=Strict. (3b) DB gerekli; satır okuması: opsiyonsuz clearCookie'ye dönülürse :126-127 kırılır. (4) Arka uç çerez davranışı.

### GV-24
- kaynak: :259 · PR: backend #125 (3e00615) · çatı #306
- (1) getUser: fullAccess değilse çağıranın approvalStatus'u APPROVED değilse 403 ONAY_BEKLENIYOR; hedef sorgusunda `approvalStatus: 'APPROVED'` (userController.ts getUser). (2) 4 sonraki commit (AJ-09, AN-28 x2, GV-10) diff'inde bu satırlar yok. (3) user-detail-approval-gate.test.ts: 403 (:32), 404 (:54), kendi/ADMIN 200 (:62,72). (3b) DB gerekli; satır okuması: çağıran kapısı kaldırılırsa :32, hedef filtresi kaldırılırsa :54 kırılır. (4) Negatif (erişimi kesme) ölçüt; arka uç.

### GV-25
- kaynak: :260 · PR: backend #126 (ffdd1fe) · çatı #306
- (1) rankMentorsHandler: `menti && !isAdmin && menti.userId !== req.auth?.userId` → 403; kurum filtresi user:{tenantId}. (2) ffdd1fe sonrası dosyaya commit yok. (3) rank-mentors-ownership.test.ts: 403 (:42), kendi 200 (:52), ADMIN 200 (:63), başka kurum 404 (:76). (3b) DB gerekli; satır okuması: kontrol kaldırılırsa :42 200/404 döner, kırılır. (4) Ekran çağıranı yok (satırda beyan edilmiş).

### PS-01
- kaynak: :266 · PR: backend #136 (3bd6fd3)
- (1) byScoreDescThenId (matching.ts:76-84), iki sıralamada kullanılıyor (:386,516); sorgularda orderBy id asc (:231,486). (2) Sonradan AN-07 (57cd7d4) take:500 ön-kesmesini keyset sayfalamaya çevirdi (matching.ts:85-99) — ölçütün "500'den sonrası kaybolmuyor" kısmı AN-07 ile karşılandı; PS-A4, KR-19, Y1-B9b, AN-28 de dosyaya dokundu, kararlı sıra korunuyor. (3) matching-stable-order.unit.test.ts:73-108 eşit skorda id artan + girdi sırasından bağımsız. (3b) eşitlik kırıcı `return 0` → 3/3 kırmızı. (4) Menti/mentör aday listeleri bu servisten.

### PS-02
- kaynak: :267 · PR: backend #139 (2885bdc)
- (1) persistedDiscVector = {...vector, confidence} (onboardingController.ts:480), User.discVector'a yazılıyor (:493). (2) Sonra commit yok. (3) onboarding-disc-confidence.unit.test.ts calculateDiscResult'ın confidence döndürdüğünü ve scoring'in confidence'lı vektörü kullandığını ölçüyor; ama `{...vector, confidence}` birleşimini testin kendisi kuruyor (:81,113). Entegrasyon testleri (e2e-registration-flow.test.ts:79-82) yalnız discVector not null diyor. (3b) :480'de confidence kaldırıldı → 6/6 YEŞİL → test düzeltme satırını ölçmüyor. (4) Onboarding DISC gönderimi /api/users/disc/submit.

### PS-06
- kaynak: :269 · PR: backend #134 (4a50bdb)
- (1) Sayım `OR: [{tenantId:null},{tenantId}]`, cache anahtarı tenantId (discVectorService.ts:72-86); çağıranlar req.tenant.tenantId geçiyor (questionController.ts:337,401). (2) Sonra commit yok. (3) discVector-tenant-cache.unit.test.ts:34 sorgu biçimi toEqual, :43-55 kurum-bazlı cache; entegrasyon discVector-tenant-confidence.test.ts:63-79. (3b) OR satırı silindi → 2 kırmızı. (4) Güven değeri skorlamayı besliyor (dolaylı).

### PS-07
- kaynak: :270 · PR: backend #120 (96af0dc) · #122 (187e4d3) · çatı #302
- (1) Test-only iş: matching-semantics.unit.test.ts 11 saf test, matching-ranking.test.ts 11 DB testi. Bulgu düzeltmesi: aday sorgularında istekte bulunan dışlanıyor (matching.ts:209,469). (2) matching-ranking.test.ts'e PS-A4 (f4297f5) yalnız eşik gevşetme satırı ekledi; semantik testlere dokunulmadı. (3) Sıralamayı assert eden testler var (ör. :45,57,105). (3b) Sektör/DISC ağırlığı takas edildi → 1/11 kırmızı (:90); kendini dışlama mutasyonu DB gerekli — satır okuması: `not: args.mentorId` kaldırılırsa matching-ranking.test.ts:120 `not.toContain(mentor.id)` kırılır (liste boş kalmasın diye referans aday :117). (4) İç kalite; #122 kullanıcıya görünür (kendini listede görmeme).

### PS-08
- kaynak: :271 · PR: backend #119 (cea49b3)
- (1) feedback-loop.test.ts: `if (ikisi de dolu)` kaldırıldı, hedef menti iki listede toBeDefined + toBeLessThan; matching.test.ts: eşik=90 hem istek hem assert, length>0, yüksek aday içerir / düşük aday içermez, 95 eşiğinde boş liste. (2) cea49b3 sonrası iki dosyaya commit yok. (3) Testler artık koşulsuz. (3b) DB gerekli; satır okuması: kalite çarpanı devre dışı kalırsa toBeLessThan, minMatchScore filtresi bozulursa not.toContain(lowMentiId) kırılır. (4) İç kalite.

### PS-09
- kaynak: :272 · PR: backend #153 (9723c50) · çatı #336
- (1) 17 vaka birim teste taşındı; beklenen değerler betikle birebir (scoring.test-cases.ts:49-119 ↔ test :19-62); vitest include `tests/**/*.test.ts` (vitest.config.ts:28), CI `npx vitest run` (ci.yml:58). Kaynak betik silinmedi (package.json:20). (2) Sonra commit yok. (3) Toplam skor vakaları :40-56. (3b) ağırlık takası → 3 kırmızı. (4) İç kalite.

### PS-10
- kaynak: :273 · PR: çatı #333 (86ed188)
- (1) Boş listede "Programınızda şu an görüşülebilecek mentör yok / Bu, profilinizle ilgili değil", DISC bağlantısı yok (menti/page.tsx:295-302). Eşik sonradan geldi (PS-A4) ama eşiği geçen yoksa atlanıyor (backend matching.ts:525-531), boş liste yine yalnız gerçekten mentör yokken. (2) Sonradan AN-10 (yazım "mentör"), IC-11, AJ-07 dokundu; mesaj ve bağlantısızlık yerinde. (3) menti-mentor-card-bookable.test.tsx:118-124. (3b) eski metin + /disc-test bağlantısı geri → 1 kırmızı. (4) Menti paneli.

### PS-A1
- kaynak: :275 · PR: backend #143 (cb61803) · çatı #329
- (1) toOceanScale ×100 (disc-to-ocean.adapter.ts:22-24); computeUserProfile çağrısı (scoring.service.ts:94-101). (2) Sonra commit yok. (3) disc-to-ocean.unit.test.ts 24 test: adapter, regresyon bandı, eşik aşımı, tüm arketip dalları. (3b) adapter'da ×100 kaldırıldı → 8 kırmızı; ANCAK scoring.service.ts:94 çağrısı eski hatalı hâline (0-1, küçük harf, dönüşümsüz) getirildi → 24/24 YEŞİL: hatanın asıl yeri olan çağrı noktası testle korunmuyor. Satır görevinde istenen iki DiscVector tipinin birleştirilmesi yapılmamış (scoring.ts:12 ve scoring.config.ts:8 hâlâ ayrı). (4) Bu aşama bilerek görünmez.

### IC-06
- kaynak: :284 · PR: çatı #309 (90a5a83)
- (1) PROVIDER_CATISMASI ve HESAP_PASIF aynı metne düşüyor (loginMessages.ts:30-42), KIMLIK_DOGRULANMADI sabit tek tip (:56-58), LoginForm.tsx:99 ve _LoginContent.tsx:11 kullanıyor; arka uç şifre girişinde hesap yok/OAuth/yanlış şifre aynı 401 (authController.ts:324-331). (2) Sonradan IC-08, Y1-B9, F-28b dokundu; eşleme yerinde. (3) login-enumeration-safe.test.tsx 6 test. (3b) eşleme + tek tip mesaj geri → 4 kırmızı. (4) Ekran tek tip. Eksik: OAuth dönüşünde adres çubuğundaki `?error=PROVIDER_CATISMASI|HESAP_PASIF` kodu hesabın varlığını hâlâ ayırt ediyor (oauthService.ts:65-79) — satırda "Kalan (backend, ayrı iş)" olarak beyan edilmiş.
