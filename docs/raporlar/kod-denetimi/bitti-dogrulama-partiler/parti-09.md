> 📸 DONDURULMUŞ (2026-09-27) — BITTI son doğrulama ara dosyası; güncellenmez. Özet ve nihai kategoriler: `docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md`.
> TÜR: 📸 · SON DOĞRULAMA: 2026-09-27 · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)

# Parti 09 — BITTI son doğrulama (2026-09-27)
Denetçi: Sonnet 5 alt-ajan (işi yapmayan) · referans: çatı 191a256 · backend 3bd9ad3 · salt-okuma
Özet: toplam 21 · ✅ 18 · ⚠️ 1 · ❌ 0 · 🔁 1 · 👁 1 (kod ✅ 1) · ❓ 0 · mutasyon: yapılan 1 / kırmızıya dönen 1 / DB gerekli 1 / yapılamadı 0

| İş | Risk | Ölçüt (kısa) | Kanıt dosya:satır | Test dosya:satır | Mutasyon | Kategori | Not |
|---|---|---|---|---|---|---|---|
| F-32 | R2 | Sekme geçişleri önbellekten anında görünür | frontend/src/lib/queryCache.ts:1-40 · frontend/src/hooks/useQuery.ts:50-92 (17 sayfa kullanıyor) | frontend/src/__tests__/query-cache-f32.test.tsx (12, çoklu negatif) | hayır | ✅ DOĞRULANDI | Merge sonrası dosyalara dokunan commit yok |
| F-33 | R2 | Menti/mentör panelinde sol-alt kullanıcı kartı | frontend/src/components/molecules/UserCard.tsx · frontend/src/components/organisms/DashboardNav.tsx:99-121 `DashboardUserCard` | frontend/src/__tests__/dashboard-user-card.test.tsx (9) | EVET → kırmızı (1/9) | ✅ DOĞRULANDI | ROLE_LABEL guard kaldırılınca ADMIN negatif testi kırıldı |
| U-01 | R2 | Bitiş saati geçen görüşme otomatik COMPLETED, mentör "gerçekleşmedi" ile düzeltebilir | backend/src/services/cronScheduler.ts:287-303 · backend/src/controllers/meetingController.ts:770-794 `markMeetingNotHappened` | backend/tests/auto-complete-meetings-cron.test.ts:46-58 · backend/tests/meeting-mark-not-happened.test.ts:66-73 | DB gerekli | ✅ DOĞRULANDI | FE: frontend/src/lib/api/meetings.ts:165 + meetings/page.tsx:147,189 çağırıyor; satır okuması: cronScheduler.ts:302-303 revert edilirse cron testi 46-58 kırılır, mentorUserId filtresi kaldırılırsa 404-testi 66-73 kırılır |
| Y-03 | R3 | Girdi hataları tüm uçlarda aynı biçim/Türkçe mesaj | backend/src/middleware/validate.ts (29 controller kullanıyor) | backend/tests/validate.unit.test.ts (4, negatif dahil) | hayır | ✅ DOĞRULANDI | Merge sonrası validate.ts'e dokunan commit yok |
| Y-04 | R2 | requestController/feedbackLogController/clubController sayfalı | backend/src/services/pagination.ts `LIST_PAGE` · 3 controller (5 uç) | backend/tests/list-pagination.test.ts (negatif: üst sınır 100'e kırpılır) | hayır | ✅ DOĞRULANDI | Sonraki commit'ler (Y-03, KR-19b) aynı dosyalara dokundu ama pagination mantığı değişmemiş |
| Y-08 | R2 | Özel alan sayfaları arama sonucunda görünmez (noindex) | frontend/src/lib/privateAreaMetadata.ts · 7 özel-alan layout/page (admin/platform/onboarding/pending/oauth) | frontend/src/__tests__/private-area-noindex.test.ts (16: 9 özel + herkese açık 7 kontrol) | hayır | ✅ DOĞRULANDI | Testler gerçek metadata export'larını import ediyor, mock değil |
| Y-09 | R2 | Sekmede/paylaşımda kurum logosu görünür | frontend/src/lib/brandImage.tsx · app/icon.tsx · app/opengraph-image.tsx · app/twitter-image.tsx | frontend/src/__tests__/brand-image.test.ts (10, boyut/format/metin güvenliği) | hayır | 👁 İNSAN GÖZÜ GEREKİR (kod ✅) | Test PNG boyut/metin güvenliğini doğruluyor; gerçek sekme/paylaşım görünümü ancak tarayıcı/sosyal önizlemeyle görülür. NEXT_PUBLIC_SITE_URL Dokploy build-arg'ı 03-PO-ELLE-ISLER'de |
| Y-10 | R3 | Ana sayfada JSON-LD (Organization+WebSite) var | frontend/src/lib/structuredData.ts · components/atoms/JsonLd.tsx · app/page.tsx:39 | frontend/src/__tests__/json-ld.test.tsx (4; negatif: `<` kaçışı, uydurma iletişim alanı yok) | hayır | ✅ DOĞRULANDI | HTML çıktısı doğrudan doğrulanabilir; arama motorunun zengin sonuç gösterip göstermeyeceği bu ölçütün dışı |
| Y-13 | R3 | Yeni herkese açık sayfa sitemap'te kendiliğinden görünür | frontend/src/lib/publicRoutes.ts `discoverPublicPaths` · app/sitemap.ts | frontend/src/__tests__/sitemap-public-routes.test.ts (11: gerçek app dizini + sahte app dizini senaryoları) | hayır | ✅ DOĞRULANDI | Merge sonrası dosyalara dokunan commit yok |
| Y-16 | R2 | Kullanıcı yeni sektör etiketi önerebiliyor | frontend/src/components/molecules/SectorTagSuggest.tsx · lib/api/tags.ts · profile/page.tsx:356 | frontend/src/__tests__/sector-tag-suggest.test.tsx (8, çoklu negatif) | hayır | ✅ DOĞRULANDI | F-28b metin merkezileştirmesi dosyaya dokunmuş ama yalnız buton metnini UI_TEXT'e taşımış |
| GV-03 | R2 | Kullanıcı http(s) dışı adres kaydedemiyor; karşı taraf sahte bağlantı görmüyor | backend/src/services/safeUrl.ts `isHttpUrl` (ApproveMeetingSchema.refine) · frontend/src/lib/safeUrl.ts + meetings/page.tsx:90 | backend/tests/meeting-location-url.test.ts:121-140 | hayır | 🔁 SONRADAN DEĞİŞTİ | K-19/KARAR-7 (`5444cab`) linki bookMeeting'den approve akışına taşıdı; isHttpUrl doğrulaması ve FE render guard'ı her iki uçta da KORUNDU — güncel hâl ölçütü karşılıyor: EVET |
| GV-09b | R3 | KVKK metni gerçek sunucu ülkesini (Londra/BK) yazıyor | frontend/src/app/kvkk/page.tsx:92-107 | frontend/src/__tests__/kvkk-page-server-location.test.tsx:11-14 (negatif: "İrlanda" yok) | hayır | ✅ DOĞRULANDI | Merge sonrası sayfaya dokunan commit yok, "İrlanda" ibaresi kodda 0 |
| GV-15 | R2 | Kullanıcının yazdığı metin e-postanın biçimini bozamıyor | backend/src/services/htmlEscape.ts `escapeHtml` · emailService.ts (40 kullanım) + tenantNotifications.ts | backend/tests/email-html-escape.unit.test.ts (22, negatif: ham etiket yok) | hayır | ✅ DOĞRULANDI | Sonraki yeni şablon (AN-09 `sendSuspicionReportAlert`) da escapeHtml kullanıyor — desen sürüyor |
| GV-20 | R2 | Aşırı çözünürlüklü görsel yüklenemiyor | backend/src/services/imageSanitize.ts:16-29 `AVATAR_IMAGE_LIMITS`/`isWithinAvatarLimits` · avatarController.ts:52-55 | backend/tests/image-sanitize.unit.test.ts:218-228 (negatif: 60000×60000 ve NaN red) | hayır | ✅ DOĞRULANDI | Merge sonrası dosyaya dokunan commit yok |
| GV-22 | R2 | Yükleme sınırı ayarı yanlış yazılırsa varsayılana düşer, sessizce kalkmaz | backend/src/config.ts:65 `parseUploadMaxBytes` | backend/tests/config-upload-max-bytes.unit.test.ts (negatif: 7 geçersiz değer → 5 MB, `warn` 7 kez) | hayır | ✅ DOĞRULANDI | Sonraki commit'ler (F-05, IC-05) config.ts'e dokundu ama bu fonksiyona değil |
| PS-05 | R2 | Yönetici KPI'da başarı oranı boşsa nedenini okuyor | frontend/src/app/(admin)/admin/kpi/page.tsx:21,128-138 | frontend/src/__tests__/admin-kpi-success-rate-empty.test.tsx (3) | hayır | ✅ DOĞRULANDI | F-18 (CSV export) aynı sayfaya dokundu, boş-durum metni yerinde duruyor |
| PS-11 | R2 | Onboarding boş soru listesinde sonsuz spinner/NaN yok | frontend/src/app/onboarding/_OnboardingContent.tsx:219-234 · _steps/DiscTestStep.tsx:123-124 | frontend/src/__tests__/onboarding-empty-questions.test.tsx (3) | hayır | ✅ DOĞRULANDI | Merge sonrası F-21/K-10 dosyalara dokundu, NaN-koruması ve boş-durum dalı bozulmamış |
| IC-01 | R2 | Mentör panelinde DISC boyutları Türkçe, tek sözlük | frontend/src/types/discTest.ts:143-147 `discDimensionLabel` (4 ekranda kullanılıyor) | frontend/src/__tests__/disc-dimension-label.test.ts (kaynak dosyalarını okuyup İngilizce sızıntısını arıyor) | hayır | ✅ DOĞRULANDI | Merge sonrası dosyalara dokunan commit yok |
| IC-03 | R2 | Yönetici/platform ekranlarında ve e-postada ham enum yerine Türkçe | frontend/src/lib/enumLabels.ts (9 ekranda kullanılıyor) · backend/src/services/emailService.ts:166-169 `roleLabel` | frontend/src/__tests__/enum-labels-ic03.test.tsx (8) · log-level-labels.test.ts · backend/tests/email-role-label.unit.test.ts | hayır | ⚠️ KISMEN | Kapsam içi ekranlar/e-posta Türkçeleşti; satırın kendi notunda "ayrı küçük iş" diye bıraktığı iki nokta hâlâ ham: backend/src/services/notificationService.ts:118 (`args.newUserRole` uygulama-içi bildirimde ham) ve `lib/kvkkSummary.ts` rol sözlüğü kopyası |
| IC-05 | R2 | Form hatalarında Zod'un İngilizce varsayılanı yerine Türkçe mesaj | backend/src/zodLocale.ts (config.ts:5 global yükleniyor) | backend/tests/zod-locale.unit.test.ts (4; negatif: İngilizce/teknik terim sızmaz) | hayır | ✅ DOĞRULANDI | Satırın kendi notundaki "Kalan İngilizce mesajlar: backend #118" de merge edilmiş (authController.ts + temperamentController.ts) |
| IC-07 | R2 | Kullanıcı jenerik "işlem başarısız" yerine backend'in gerçek Türkçe sebebini görüyor | frontend/src/lib/apiErrorMessage.ts · hooks/useMutation.ts (5 ekranda kullanılıyor) | frontend/src/__tests__/api-error-message.test.tsx (9, çoklu negatif) | hayır | ✅ DOĞRULANDI | Satırın notundaki "authController teknik mesajı → backend #118" de merge edilmiş, `tenantSlug` artık sızmıyor |

## Ayrıntı

### F-32 — sekme geçiş önbelleği
- kaynak: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:198` · PR: çatı #310 (`17ae11b`)
- (1) `queryCache.ts` modül-içi Map, `useQuery.ts:50-92` `cacheKey` ile stale-while-revalidate; 17 sayfa `cacheKey` veriyor.
- (2) `git log 17ae11b..origin/main -- queryCache.ts useQuery.ts` → boş, dokunulmamış.
- (3) `query-cache-f32.test.tsx` 12 test; negatifler: kapsam değişince silinir, geç yanıt yeni oturuma yazmaz, misafirde önbellek yok, TTL dolar, başarılı yazma sonrası temizlenir.
- (4) FE zaten doğrudan kullanıyor (hook + 17 sayfa).

### F-33 — dashboard sol-alt kullanıcı kartı
- kaynak: `:199` · PR: çatı #285 (`44119d4`)
- (1) `UserCard.tsx` ortak bileşen, `DashboardNav.tsx:99-121` `DashboardUserCard`, `(dashboard)/layout.tsx:15` mount ediyor.
- (2) Merge sonrası dosyalara dokunan commit yok.
- (3) `dashboard-user-card.test.tsx` 9 test (MENTI/MENTOR görünür, ÇIKIŞ çalışır, sabit konumlanmaz, ADMIN'de görünmez, oturumsuz görünmez).
- (3b) Mutasyon: `DashboardNav.tsx:103` `if (!user || !ROLE_LABEL[user.role]) return null;` → `if (!user) return null;` yapıldı (`/tmp/mut-09-F33`, worktree artık kaldırıldı). Sonuç: 1 kırmızı / 8 yeşil — "negatif: ADMIN için kart çizilmez" testi (ADMIN `ROLE_LABEL`'de yok, guard kalkınca kart yine de çiziliyor) kırıldı; beklenen davranış.
- (4) FE zaten layout'ta mount edilmiş durumda.

### U-01 — SCHEDULED → COMPLETED otomasyonu + mentör düzeltmesi
- kaynak: `:211` · PR: backend #140 (`c2a9682`), çatı #317 (`33f6e6f`, pointer)
- (1) `cronScheduler.ts:287-303` 15 dk'da bir `endsAt < now` olan `SCHEDULED`'ı `COMPLETED` yapıyor; `meetingController.ts:770-794` `markMeetingNotHappened` yalnız görüşmenin kendi mentörü `COMPLETED`→`CANCELLED`.
- (2) Backend'de merge sonrası dosyaya dokunan 8 commit var — hepsi terim değişikliği ("toplantı"→"görüşme", IC-11) veya ilgisiz (AJ-09 refactor, KR-19 blok), mantık satırları (302-303, 770-794) değişmemiş. Çatı tarafında da yalnız terim/bağımsız fix commit'leri.
- (3) İki entegrasyon testi (`testPrisma`, `cleanDb`) — DB gerekli, koşulmadı. Satır okuması: `auto-complete-meetings-cron.test.ts:46-58` `res.completed===1` + `updated.status==='COMPLETED'` — cronScheduler.ts:302-303 revert edilirse KIRILIR. `meeting-mark-not-happened.test.ts:66-73` "BAŞKA bir mentör işaretleyemez (404)" — `meetingController.ts:781` `mentorUserId: userId` filtresi kaldırılırsa KIRILIR (200 döner, testte `.expect(404)` fail).
- (4) FE: `lib/api/meetings.ts:165-166` `markNotHappened`, `meetings/page.tsx:147,189` "Gerçekleşmedi olarak işaretle" butonu çağırıyor.

### Y-03 — Zod doğrulama merkezileştirme
- kaynak: `:228` · PR: backend #123 (`e17a4c3`)
- (1) `validate.ts` `validateRequest`, 29 controller kullanıyor.
- (2) Merge sonrası dosyaya dokunan commit yok.
- (3) `validate.unit.test.ts` 4 test — başarı, 400 biçimi (`{error,details:{formErrors,fieldErrors}}` birebir), nesne-olmayan girdi, özel mesaj korunur.
- (4) Backend-only, ekran kullanımı Y-04/GV-03 gibi controller'lar üzerinden dolaylı.

### Y-04 — liste sayfalama
- kaynak: `:229` · PR: backend #117 (`d99274d`)
- (1) `pagination.ts` `LIST_PAGE={defaultLimit:50,maxLimit:100}`; requestController/feedbackLogController/clubController (5 uç).
- (2) İki sonraki commit (Y-03, KR-19b) aynı controller dosyalarına dokundu ama `parsePagination`/`LIST_PAGE` satırlarına değil (diff'te doğrulandı — pairBlockGuard eklemesi ve validateRequest'e geçiş, pagination mantığı aynı).
- (3) `list-pagination.test.ts` — sayfalar çakışmaz/total doğru, üst sınır 100'e kırpılır.
- (4) Backend-only (ekran çağıranı bu satırın kapsamında değil, satırın kendi notu da bunu söylüyor).

### Y-08 — özel alan noindex
- kaynak: `:230` · PR: çatı #294 (`4a210cf`)
- (1) `privateAreaMetadata.ts` `PRIVATE_AREA_METADATA={robots:{index:false,follow:false}}`; 7 server-layout/page bunu export ediyor.
- (2) Merge sonrası dosyalara dokunan commit yok.
- (3) `private-area-noindex.test.ts` 16 test (1+7+1+1+6) — gerçek metadata export'larını import edip kontrol ediyor, mock yok.
- (4) Doğrudan Next.js metadata mekanizması; ekran davranışı test tarafından doğrudan doğrulanıyor.

### Y-09 — favicon + OG görsel
- kaynak: `:231` · PR: çatı #297 (`30c386a`→`816e699`)
- (1) `brandImage.tsx` + `icon.tsx`/`apple-icon.tsx`/`opengraph-image.tsx`/`twitter-image.tsx`; kök `layout.tsx` sabit başlık taşımıyor.
- (2) Merge sonrası dosyalara dokunan commit yok; `docker-compose.yml`/`Dockerfile`'daki `NEXT_PUBLIC_SITE_URL` build-arg'ı V-16 (bb0bdbd) sonrası da yerinde.
- (3) `brand-image.test.ts` 10 test — PNG boyutları (32×32/180×180/1200×630), metinlerin çizilebilir Türkçe karakter seti, alt sayfaya ana sayfa başlığı sızmıyor.
- (4) Kategori 👁: kod ve testler görsel ÜRETİMİNİ doğruluyor ama tarayıcı sekmesinde/sosyal medya kartında gerçekten NASIL göründüğü ancak canlıda insan gözüyle doğrulanır.

### Y-10 — JSON-LD
- kaynak: `:232` · PR: çatı #303 (`51a133d`)
- (1) `structuredData.ts` `buildHomeJsonLd`, `JsonLd.tsx` `<script type="application/ld+json">`, `page.tsx:39` kullanıyor.
- (2) Merge sonrası dosyalara dokunan commit yok.
- (3) `json-ld.test.tsx` 4 test — geçerli JSON, doğru @type/name/url, iletişim alanı uydurulmamış, `<` kaçışı.
- (4) HTML çıktısı doğrudan test edilebilir (arama motorunun zengin sonuç göstermesi ayrı, kontrol dışı).

### Y-13 — otomatik sitemap
- kaynak: `:233` · PR: çatı #307 (`a2c3bf0`)
- (1) `publicRoutes.ts` `discoverPublicPaths` build-sırasında `app/` tarıyor; `sitemap.ts` bunu kullanıyor, `force-static`.
- (2) Merge sonrası dosyalara dokunan commit yok.
- (3) `sitemap-public-routes.test.ts` 11 test — gerçek app dizini (9 sayfa) + sahte app dizini senaryoları (yeni sayfa otomatik girer, route grubu/dinamik/noindex/disallow dışlanır).
- (4) Build-time mekanizma, doğrudan test edilebilir.

### Y-16 — sektör etiketi önerme ekranı
- kaynak: `:234` · PR: çatı #286 (`eb3005c`)
- (1) `SectorTagSuggest.tsx`, `lib/api/tags.ts`, `profile/page.tsx:356` mount ediyor.
- (2) Sonraki commit (F-28b) yalnız "Gönderiliyor…" metnini `UI_TEXT.status.sending`'e taşımış, işlevsel değişiklik yok.
- (3) `sector-tag-suggest.test.tsx` 8 test — geçerli öneri, zaten incelemede bilgisi, 4 negatif (boş/geçersiz/zaten sahip/uç hatası), backend 400 alan mesajı.
- (4) Profil sayfasında mount edilmiş, FE bağlantısı doğrudan.

### GV-03 — görüşme bağlantısı yalnız http(s)
- kaynak: `:240` · PR: backend #107 (`c6f22dd`), çatı #284/#289 (pointer)
- (1) `safeUrl.ts` `isHttpUrl`; `meetingController.ts:616` `ApproveMeetingSchema` `.refine(isHttpUrl)`; FE `lib/safeUrl.ts` + `meetings/page.tsx:90` render guard'ı.
- (2) **Akış SONRADAN DEĞİŞTİ**: `5444cab` (K-19/KARAR-7, "online toplantı linkini menti değil mentör, onayda girer") `bookMeeting`'in `locationUrl` kabul etmesini kaldırdı, linki mentörün onay adımına taşıdı. `isHttpUrl` doğrulaması approve şemasında KALDI; FE render guard'ı da değişmedi. Test dosyası da bu akışı yansıtacak şekilde güncellenmiş (`describe('KARAR-7: bookMeeting artık locationUrl kabul etmiyor')`).
- (3) `meeting-location-url.test.ts:121-140` — http(s) olmayan bağlantıyla onay 400, ONLINE linksiz onaylanamaz, geçerli linkle 200+SCHEDULED.
- (4) FE `meetings/page.tsx:90` `isHttpUrl(meeting.locationUrl)` kontrolü olmadan link tıklanabilir çizilmiyor.
- Sonuç: güncel hâl ölçütü karşılıyor mu → **EVET** (giriş noktası değişti ama http(s)-yalnız kural + render guard'ı korunuyor).

### GV-09b — KVKK sunucu ülkesi düzeltmesi
- kaynak: `:246` · PR: çatı #315 (`db30cb3`)
- (1) `kvkk/page.tsx:92-107` "Londra (Birleşik Krallık)" — "İrlanda" ibaresi kodda **0 sonuç**.
- (2) Merge sonrası dosyaya dokunan commit yok.
- (3) `kvkk-page-server-location.test.tsx:11-14` — metni doğru gösterir + "İrlanda" YOK negatif kontrolü.
- (4) Kullanıcıya doğrudan görünen statik metin; kod okumasıyla doğrulanabilir, 👁 gerektirmez.

### GV-15 — e-posta HTML kaçışı
- kaynak: `:251` · PR: backend #130 (`7c4060b`), çatı #308 (pointer)
- (1) `htmlEscape.ts` `escapeHtml`; `emailService.ts` 40 kullanım + `tenantNotifications.ts` 5 kullanım.
- (2) Merge sonrası `emailService.ts`'e dokunan tek yeni şablon (AN-09 `sendSuspicionReportAlert`) da `escapeHtml(args.reportId)` kullanıyor — desen korunmuş, kırılma yok.
- (3) `email-html-escape.unit.test.ts` 22 test — negatif: ham `<script>`/etiket gövdede kalmıyor.
- (4) Backend-only; e-postanın GERÇEKTEN nasıl SMTP sağlayıcısı tarafından işlendiği canlıda doğrulanır ama biçim-bozma riskinin kapanması doğrudan unit testle ölçülebiliyor → 👁 gerekmez.

### GV-20 — avatar çözünürlük sınırı
- kaynak: `:255` · PR: backend #116 (`2c22a7c`)
- (1) `imageSanitize.ts:16` `AVATAR_IMAGE_LIMITS={maxSide:8000,maxPixels:40_000_000}`, `avatarController.ts:52-55` uyguluyor.
- (2) Merge sonrası dosyaya dokunan commit yok.
- (3) `image-sanitize.unit.test.ts:218-228` — olağan fotoğraf kabul, 10000×100/8000×8000/0×100 red.
- (4) Backend-only, doğrudan controller'da uygulanıyor.

### GV-22 — yükleme sınırı ayar-parse sertleştirme
- kaynak: `:257` · PR: backend #109 (`e695c96`)
- (1) `config.ts:65` `parseUploadMaxBytes` — `isFinite` + pozitif kontrolü + varsayılana düşme + `console.warn`.
- (2) Sonraki commit'ler (F-05, IC-05) `config.ts`'e dokundu ama farklı bölümlere (turnstile, zodLocale import) — `parseUploadMaxBytes` değişmemiş.
- (3) `config-upload-max-bytes.unit.test.ts` — 7 geçersiz değer (NaN, negatif, 0, string, Infinity vb.) → varsayılan 5 MB + `warn` 7 kez.
- (4) Backend-only.

### PS-05 — KPI başarı oranı boş-durum metni
- kaynak: `:268` · PR: çatı #280 (`7e832ad`)
- (1) `admin/kpi/page.tsx:21` `NOT_ENOUGH_RESPONSES_TEXT`, `:128-138` `successRate===null` dalı.
- (2) F-18 (CSV export, `2ccfe23`) aynı sayfaya dokundu ama bu bloğa değil — hâlâ yerinde.
- (3) `admin-kpi-success-rate-empty.test.tsx` 3 test.
- (4) Admin KPI ekranında doğrudan render ediliyor.

### PS-11 — onboarding boş liste savunması
- kaynak: `:274` · PR: çatı #274 (`01b0395`)
- (1) `_OnboardingContent.tsx:219-234` boş-durum dalı + "Yeniden dene"; `DiscTestStep.tsx:123-124` `total>0 ? Math.round(...) : 0`.
- (2) Sonraki commit'ler (F-21 erişilebilirlik, K-10 kontrast) dosyalara dokundu, bu satırlara değil.
- (3) `onboarding-empty-questions.test.tsx` 3 test — boş listede spinner yok/NaN yok, dolu listede normal, DiscTestStep çökmüyor.
- (4) FE savunma kodu, ekranda doğrudan.

### IC-01 — DISC boyut etiketleri tek Türkçe kaynak
- kaynak: `:281` · PR: çatı #331 (`8383ede`)
- (1) `discTest.ts:143-147` `discDimensionLabel`; `mentor/page.tsx`, `admin/questions/page.tsx`, `ResultStep.tsx`, `DiscRecallCard.tsx` kullanıyor.
- (2) Merge sonrası dosyalara dokunan commit yok.
- (3) `disc-dimension-label.test.ts` — birebir Türkçe eşleme + 4 dosyanın KAYNAK KODUNU okuyup İngilizce (`Dominant|Influential|Steady|Conscientious`) sızıntısı arıyor negatif kontrol.
- (4) Doğrudan ekranlarda kullanılıyor, test kaynak taramasıyla doğrulanmış.

### IC-03 — ham enum → Türkçe sözlük
- kaynak: `:282` · PR: çatı #292/#295 (`dad6dd0`), backend #121 (`5ae0352`), pointer #298
- (1) `enumLabels.ts` (rol/etiket/görüşme formatı/sertifika/log seviyesi), 9 ekranda kullanılıyor; backend `emailService.ts:166-169` `roleLabel`.
- (2) Merge sonrası dosyalara dokunan commit yok.
- (3) `enum-labels-ic03.test.tsx` (8), `log-level-labels.test.ts`, `email-role-label.unit.test.ts`.
- (4) Kapsam içi ekranlar/e-posta doğrulandı. **Ancak** satırın kendi metni iki noktayı "ayrı küçük iş" diye açıkça kapsam dışı bırakmış: `notificationService.ts:118` — `body: \`${args.newUserFullName} (${args.newUserRole}) sisteme katıldı...\`` hâlâ ham rol (MENTOR/MENTİ) basıyor, kod okumasıyla doğrulandı; `lib/kvkkSummary.ts` rol sözlüğü hâlâ ayrı kopya (`enumLabels.ts`'e bağlanmamış). Bu ikisi ölçütün ("... ve e-postada ... Türkçe karşılık") tam kapsamını doldurmuyor → ⚠️ KISMEN.

### IC-05 — global Türkçe Zod errorMap
- kaynak: `:283` · PR: backend #114 (`5a69360`)
- (1) `zodLocale.ts`, `config.ts:5` her giriş noktasında global yükleniyor.
- (2) Merge sonrası dosyaya dokunan commit yok. Satırın kendi notundaki "Kalan İngilizce mesajlar: backend #118" `gh pr view 118` ile **MERGED** doğrulandı (authController.ts + temperamentController.ts + validation-messages-tr.test.ts).
- (3) `zod-locale.unit.test.ts` 4 test — uzunluk/boşluk, eksik alan/biçim/seçim, negatif İngilizce/teknik terim sızmaz, özel mesaj korunur.
- (4) Backend-only, FE `client.ts` ilk alan mesajını gösteriyor (Y-03/IC-05 ile hizalı).

### IC-07 — gerçek hata sebebinin gösterilmesi
- kaynak: `:285` · PR: çatı #291 (`cc6ec90`)
- (1) `apiErrorMessage.ts` `isUserFacingMessage` (hata kodu/stack/Zod İngilizce deseni filtrelenir); `useMutation.ts` + 4 sayfa kullanıyor.
- (2) Merge sonrası dosyalara dokunan commit yok. Satırın notundaki "authController teknik mesajı → backend #118" da MERGED (yukarıda IC-05'te doğrulandı); `authController.ts:41,728` artık `tenantSlug` yerine kullanıcı-dostu Türkçe mesaj taşıyor.
- (3) `api-error-message.test.tsx` 9 test — backend mesajı gösterilir, mesajsızda Türkçe yedek, iç detay/kod gösterilmez (3 ekran + hook üzerinde ayrı ayrı).
- (4) 5 ekranda doğrudan kullanılıyor.
