> 📸 DONDURULMUŞ (2026-09-27) — BITTI son doğrulama ara dosyası; güncellenmez. Özet ve nihai kategoriler: `docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md`.
> TÜR: 📸 · SON DOĞRULAMA: 2026-09-27 · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)

# Parti 06 — BITTI son doğrulama (2026-09-27)
Denetçi: Sonnet 5 alt-ajan (işi yapmayan) · referans: çatı 191a256 (HEAD docs-only ilerlemiş, kod diff'i sıfır — doğrulandı) · backend 3bd9ad3 · salt-okuma
Özet: toplam 21 · ✅ 17 · ⚠️ 2 · ❌ 0 · 🔁 1 · 👁 1 (kod ✅ 1) · ❓ 0 · mutasyon: yapılan 3 (F-27, P-12, U-07) / kırmızıya dönen 3 / DB gerekli 0 / yapılamadı 0

| İş | Risk | Ölçüt (kısa) | Kanıt dosya:satır | Test dosya:satır | Mutasyon | Kategori | Not |
|---|---|---|---|---|---|---|---|
| F-25 | R2 | Mail göstergesi gerçek probe sonucunu gösteriyor | backend/src/controllers/platformController.ts:180-183 · backend/src/services/emailService.ts:33-53 (verifyTransporter, 5sn timeout) | backend/tests/health.test.ts:76-86 | hayır | ✅ DOĞRULANDI | Config-var yerine gerçek verify() çağrısı; frontend platform/dashboard/page.tsx:284 sonucu okuyor. PR #84+#227 sonrası çok sayıda dokunuş ama zincir bozulmamış. |
| F-26 | R3 | .env.example tam (PLATFORM_ADMIN_EMAIL var) | backend/.env.example:18-20 · backend/src/config.ts:43-55 | backend/tests/platformAdminEmail.unit.test.ts | hayır | ✅ DOĞRULANDI | Kuyrukta "PR yok" yazsa da gerçek PR #72 (2026-09-20) ile eklenmiş; atıf eksik ama iş gerçek ve testli. |
| F-27 | R2 | Konuşma listesi tek sorguda + sayfalı | backend/src/controllers/conversationController.ts:25-31,281-289 | backend/tests/conversation-pagination.unit.test.ts:16-34 (5 test) | EVET | ✅ DOĞRULANDI | Mutasyon: clamp/limit mantığı sabit değere döndürüldü → 3/5 test kırmızı oldu; worktree temizlendi. Sonraki AJ-06 dokunuşu (2574548,b42a36e) sayfa-içi N+1'i de kapatmış, ölçüt bozulmadı. |
| F-29 | R3 | sitemap+robots+metadataBase mevcut | frontend/src/app/sitemap.ts · frontend/src/app/robots.ts · frontend/src/app/layout.tsx:35-36,59 (lang tr-TR) · frontend/src/lib/siteUrl.ts | frontend/src/__tests__/site-url.test.ts (3 test) + sitemap-public-routes.test.ts | hayır | 🔁 SONRADAN DEĞİŞTİ | PR #219'daki sitemap.ts ELLE yazılmış 9 yollu bir liste idi; sonraki commit 0519943 (Y-13) implementasyonu tamamen `discoverPublicPaths()` ile otomatik taramaya DÖNÜŞTÜRDÜ (dosya artık PR #219'un diff'iyle birebir eşleşmiyor). Dış davranış (sitemap+robots+metadataBase+lang mevcudiyeti) bozulmadı, güncel hâl ölçütü karşılıyor: EVET. |
| F-30 | R3 | Bayat yorum kaldırıldı | frontend/src/components/organisms/LoginForm.tsx:6-7 | yok — gerekmez: statik yorum kontrolü | hayır | ✅ DOĞRULANDI | "Sprint 14" cümlesi kalkmış, TenantProvider/useTenant açıklamasıyla değişmiş; sonraki 4 dokunuş satırı bozmamış. |
| P-01 | R2 | Menti randevu kartında mentör adını görüyor | frontend/src/app/(dashboard)/meetings/page.tsx:49-51,69-71 | frontend/src/__tests__/meetings-opponent-name.test.tsx (4 test) | hayır | ✅ DOĞRULANDI | PR #190 sonrası 14 kozmetik dokunuşa rağmen opponent/opponentName mantığı sağlam. |
| P-02 | R2 | Talep sayısı yenilemeden sonra korunuyor | frontend/src/lib/mentiMetrics.ts:33-46 · frontend/src/app/(dashboard)/menti/page.tsx:91-96,108-111,261 | frontend/src/__tests__/mentiMetrics.test.ts:50-64 | hayır | ✅ DOĞRULANDI | countSentRequests kalıcı ∪ oturum birleşimi; 11 sonraki dokunuş mantığı değiştirmemiş. |
| P-03 | R2 | Menti DISC kartını panelde tekrar görüyor | frontend/src/components/organisms/DiscRecallCard.tsx:33-126 · frontend/src/app/(dashboard)/menti/page.tsx:249 | frontend/src/__tests__/disc-recall-card.test.tsx (3 test) | hayır | ✅ DOĞRULANDI | Küçük eksik: veri-yoksa-gizle wrapper davranışı ayrı test edilmemiş, temel iddia (arketip+güçlü yön kartı görünüyor) kanıtlı. |
| P-07 | R2 | Menti kilometre taşlarında kişiye özel kutlama görüyor | frontend/src/lib/milestones.ts:17-61 · frontend/src/app/(dashboard)/meeting-checkin/page.tsx:88,97-101 | frontend/src/__tests__/milestones.test.ts (6 test) | hayır | ✅ DOĞRULANDI | "1. ile 10. görüşme aynı metni göstermez" testi orijinal şikayeti doğrudan hedefliyor; sonraki tek dokunuş (F-28b metin sözlüğü) mantığa dokunmamış. |
| P-09 | R2 | Mentör boş ekranda değer/yönlendirme + doğru rol metni görüyor | frontend/src/app/(dashboard)/mentor/page.tsx:265-282 (onay kuyruğu boşken görünür) · frontend/src/app/(dashboard)/messages/page.tsx:52-58 (rol dallanması) | frontend/src/__tests__/mentor-empty-panel.test.tsx (yalnız messages/rol dalını test ediyor, 2 test) | hayır | ⚠️ KISMEN | Mesaj boş-durum kolu test kanıtlı; mentör panelindeki onay-kuyruğu görünürlüğü kod-doğrulandı ama testsiz. Orijinal şikayetteki "4× '—' metrik" alt-parçası bu PR'ın kapsamı dışında kalmış. |
| P-10 | R2 | Mentör yeni talepte bildirim/e-posta alıyor | backend/src/controllers/meetingController.ts:599-607 (book handler, sendMeetingRequestEmail fire-and-forget) | backend/tests/meetings.test.ts:160-179 (gerçek booking isteği + mock çağrı doğrulaması) | hayır | 👁 İNSAN GÖZÜ GEREKİR (kod ✅) | Ölçüt "e-posta ALIYOR" — gönderim çağrısı+test kod seviyesinde kanıtlı ve PR #89 sonrası hâlâ duruyor, ama e-postanın gerçekten ULAŞMASI SMTP yapılandırmasına bağlı (03-PO-ELLE-ISLER B#4), yalnız canlıda doğrulanır. |
| P-11 | R2 | Mentör toplam mentörlük saatini panelde görüyor | backend/src/controllers/mentorMetricsController.ts:26,50 · frontend/src/app/(dashboard)/mentor/page.tsx:48 | backend/tests/mentor-metrics.unit.test.ts:24-36 · frontend/src/__tests__/mentor-panel-data.test.tsx:65-72 | hayır | ✅ DOĞRULANDI | PR #82+#222+#223 sonrası yalnız 1 tenant-izolasyon düzeltmesi (Y3b) dokunmuş, hesaplama/render sağlam. |
| P-12 | R2 | Sertifikalı mentör panelde kalıcı rozet görüyor | backend/src/controllers/mentorMetricsController.ts:43,51,107-111,131 · frontend/src/app/(dashboard)/mentor/page.tsx:194-215 | backend/tests/mentor-metrics.unit.test.ts:38-45 (2 test) · frontend/src/__tests__/mentor-panel-data.test.tsx:74-87 | EVET | ✅ DOĞRULANDI | Mutasyon: isCertified çıktısı sabit false'a döndürüldü → "sertifikalıysa true" testi kırmızı oldu; worktree temizlendi. |
| P-13 | R2 | Mentör aktif mentilerini panelde listeleyebiliyor | backend/src/controllers/mentorMetricsController.ts:114-122 · frontend/src/app/(dashboard)/mentor/page.tsx:245-256 | backend/tests/mentor-metrics.unit.test.ts:48-63 · frontend/src/__tests__/mentor-panel-data.test.tsx:89-105 | hayır | ✅ DOĞRULANDI | Sayı≡liste tutarlılığı hem backend hem frontend testinde ayrı ayrı doğrulanmış. |
| P-14 | R2 | Mentör emeğini anlatan takdir mesajı görüyor | frontend/src/lib/mentorAppreciation.ts:14-24 · frontend/src/app/(dashboard)/mentor/page.tsx:238-242 | frontend/src/__tests__/mentorAppreciation.test.ts (P-14 describe bloğu) | hayır | ✅ DOĞRULANDI | Saf fonksiyon + banner render; PR #216 sonrası yalnız kozmetik terim/renk dokunuşları, mantık sağlam. |
| U-02 | R2 | Online görüşmenin linki randevu/görüşme kartında görünüyor | frontend/src/app/(dashboard)/meetings/page.tsx:80-107 | frontend/src/__tests__/meetings-location.test.tsx (5 test) | hayır | ✅ DOĞRULANDI | Güvenlik notu (arşiv): GV-03 GERÇEKTEN kapanmış — backend meetingController.ts:616 `isHttpUrl` refine (giriş) + frontend meetings/page.tsx:90 `isHttpUrl` kontrolü (çıkış), ikisi de bağımsız doğrulandı, negatif test dahil. |
| U-03 | R2 | Davet hatası ekranda görünüyor, kopyalanan metinde kurum adı dolu | frontend/src/app/(admin)/admin/invite/page.tsx:95,147,166,280 | frontend/src/__tests__/invite-error-tenant-name.test.tsx (2 test) | hayır | ✅ DOĞRULANDI | setMsg artık generateLink/saveTemplate hatalarında çağrılıyor; useTenant() gerçek ad. Sonraki 2 dokunuş yalnız kozmetik. |
| U-04 | R2 | Kurum onay/ret durumunu uygulama içinde net görüyor | frontend/src/app/onboarding/stk/pending-review/page.tsx:38-45,52,69,88,112 · backend/src/controllers/authController.ts:857-886 | frontend/src/__tests__/pending-review-status.test.tsx (5 test) | hayır | ✅ DOĞRULANDI | 4 durum (onaylandı/reddedildi/düzeltme/bekliyor) dallanması kanıtlı; e-posta bildirimi açılması ayrı PO adımı, bu ölçütü etkilemiyor. |
| U-05 | R2 | Platform admin panelinde bekleyen başvuru rozeti/göstergesi var | frontend/src/app/platform/dashboard/page.tsx:221,300,305 · backend/src/controllers/platformController.ts:166 | yok — grep boş, hiçbir testte pendingTenants/"Bekleyen Başvuru" ölçülmüyor | hayır | ⚠️ KISMEN | Kod doğrulandı ve hâlâ duruyor (yalnız kozmetik dokunuşlar), ama test yok → tam ✅ verilemiyor (CLAUDE.md kuralı). |
| U-07 | R2 | Bekleyen kullanıcı kendi e-postasını ekranda görüyor | frontend/src/app/pending-approval/page.tsx:11-15 · frontend/src/components/organisms/LoginForm.tsx:55,77 | frontend/src/__tests__/pending-approval-email.test.tsx (3 test) | EVET | ✅ DOĞRULANDI | Mutasyon: query-parametresi yedeği kaldırıldı → "token yokken query e-postası gösterilir" testi kırmızı oldu; worktree temizlendi. |
| U-09 | R2 | Yeni kurum admini boş panelde "davet gönder" yönlendirmesi + doğru metin görüyor | frontend/src/app/(admin)/admin/approvals/page.tsx:62-73 · frontend/src/app/(admin)/admin/waiting-room/page.tsx:81-90 | frontend/src/__tests__/approvals-empty-invite.test.tsx (1 test, yalnız approvals) | hayır | ✅ DOĞRULANDI | approvals kolu kod+test tam; waiting-room kodda doğrulandı ama ayrı testi yok (PR'ın kendi kapsamıyla tutarlı — "Test 1 yeni"). |

## Ayrıntı

### F-25 — Mail gerçek probe
- kaynak: `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md:65` · PR #84(BE)+#227(pointer)
- (1) `platformController.ts:180-183` config-var yerine `verifyTransporter()`+`getSmtpStatus()` çağırıyor; `emailService.ts:33-53` gerçek `transporter.verify()`, 5sn timeout.
- (2) PR merge (81523fa) sonrası çok sayıda dokunuş (AJ-09, AJ-03, V-16, GV-15, GV-07) ama zincir bozulmamış.
- (3) `health.test.ts:76-86` iki alt-fonksiyonu (getSmtpStatus/verifyTransporter) doğrudan test ediyor; controller'ın kendisi için ayrı entegrasyon testi yok ama üzerine kurulduğu birimler test edilmiş.
- (4) `platform/dashboard/page.tsx:284` göstergeyi render ediyor.

### F-26 — .env.example eksik değişken
- kaynak: `...md:66` · PR yok denmiş, gerçekte PR #72 (2026-09-20)
- (1) `.env.example:18-20` PLATFORM_ADMIN_EMAIL açıklamalı; `config.ts:43-55` yoksa varsayılan + prod uyarısı (throw yok, bilinçli).
- (2) Sonraki dokunuşlar (env belgeleme, Y-01, V-06, GV-22, IC-05, F-05) satırı korumuş.
- (3) `platformAdminEmail.unit.test.ts` gerçek davranışı (env set/unset, prod uyarı) ölçüyor.

### F-27 — N+1 konuşma listesi
- kaynak: `...md:67` · PR #86(BE)+#229(pointer)
- (1) `conversationController.ts:25-31` `parseConversationPagination` (limit 1-100, varsayılan 30) + `:281-289` tek `count`+`findMany(take/skip)`.
- (2) Backend merge (b5415bd) sonrası AJ-06 (b42a36e, 2574548) sayfa-içi unread/son-mesaj N+1'ini de 2 sabit sorguya indirmiş — ölçüt korunmuş, genişletilmiş.
- (3) `conversation-pagination.unit.test.ts` 5 test — sınır/negatif/varsayılan değerleri tek tek ölçüyor, totolojik değil.
- (3b) MUTASYON: `parseConversationPagination` gövdesi `{limit: CONVERSATION_PAGE_DEFAULT, offset: 0}` sabitine indirgendi (clamp/parse mantığı kaldırıldı) → `npx vitest run --config vitest.unit.config.ts tests/conversation-pagination.unit.test.ts` sonucu **3/5 kırmızı** ("limit 1 altına düşmez", tavan/offset testleri). Worktree `/tmp/mut-06-F27-me-*` `worktree remove --force` ile temizlendi.
- (4) `conversationRoutes.ts:20` üzerinden `GET /api/conversations` gerçek uçta kullanılıyor.

### F-29 — SEO teknik paketi
- kaynak: `...md:68` · PR #219 (merge a9b70349)
- (1) `app/sitemap.ts`, `app/robots.ts`, `layout.tsx:35-36` metadataBase, `:59` `lang="tr-TR"`, `lib/siteUrl.ts` tek kaynak (`getSiteUrl()`).
- (2) `gh pr diff 219` incelendi: PR'daki `sitemap.ts` ELLE yazılmış `PUBLIC_PATHS` (9 yol) listesiydi. Sonraki commit `0519943` ("feat(seo): Y-13 sitemap app dizininden build'de otomatik üretilir") implementasyonu tamamen değiştirdi: artık `discoverPublicPaths()` ile `app/` dizinini tarıyor. Kod artık PR #219'un diff'iyle AYNI DEĞİL — bu yüzden kategori 🔁, ✅ değil. Dış davranış (sitemap/robots/metadataBase/lang mevcudiyeti) korunmuş: EVET, ölçüt hâlâ karşılanıyor.
- (3) `site-url.test.ts` 3 test (fallback, env, slash temizliği — `getSiteUrl()` saf helper'ı). `sitemap-public-routes.test.ts` (Y-13 sonrası eklenmiş) bugünkü 9 yolun korunduğunu, yeni herkese açık sayfanın kendiliğinden girdiğini ve robots disallow ile çakışmadığını doğruluyor — güncel implementasyonun kendisi de test kanıtlı.

### F-30 — Bayat yorum temizliği
- kaynak: `...md:69` · PR #206
- (1) `LoginForm.tsx:6-7` eski "Sprint 14'te tam entegrasyon" cümlesi kalkmış.
- (2) Sonraki IC-06/IC-08/F-28b/merge dokunuşları satırı bozmamış.
- (3) Test gerekmez — yalnız JSDoc yorumu, davranış değişmedi.

### P-01 — Menti randevu kartında mentör adı
- kaynak: `...md:76` · PR #190
- (1) `meetings/page.tsx:49-51` `opponent = isMentor ? meeting.menti : meeting.mentor` + `:69-71` koşulsuz render.
- (2) 14 sonraki dokunuş (K-10, IC-11, AN-10, IC-03, F-32…) mantığı bozmamış.
- (3) `meetings-opponent-name.test.tsx` 4 test (rol + boş-ad yedek metni).

### P-02 — "Gönderilen Talepler" kalıcılığı
- kaynak: `...md:77` · PR #211
- (1) `mentiMetrics.ts:33-46` `countSentRequests` kalıcı `/api/conversations` ∪ oturum-içi id'ler.
- (2) 11 sonraki dokunuş mantığı değiştirmemiş.
- (3) `mentiMetrics.test.ts:50-64` mükerrer/null/boş liste senaryoları.

### P-03 — DISC rapel kartı
- kaynak: `...md:78` · PR #209
- (1) `DiscRecallCard.tsx:114-126` wrapper (`/api/users/:id` → discResultCard) + `:33-106` view; `menti/page.tsx:249` mount.
- (2) AJ-07/IC-01 dokunuşları işlevi bozmamış.
- (3) `disc-recall-card.test.tsx` 3 test — yalnız saf view'i kapsıyor; API'den veri gelmeyince kartın gizlendiğini doğrulayan ayrı test yok (küçük eksik, genel iddia kanıtlı).

### P-07 — Kilometre taşı kutlaması
- kaynak: `...md:79` · PR #214
- (1) `lib/milestones.ts:17-61` `meetingMilestone(count)` (1/5/10/25/10-katları) + `meeting-checkin/page.tsx:88,97-101`.
- (2) Yalnız F-28b (metin sözlüğü taşıma) dokunmuş, mantık sağlam.
- (3) `milestones.test.ts` 6 test, "1. ile 10. aynı metni göstermez" doğrudan orijinal şikayeti hedefliyor.

### P-09 — Mentör boş panel + mesaj rol metni
- kaynak: `...md:80` · PR #210
- (1) `mentor/page.tsx:265-282` onay kuyruğu kartı boşken de görünür + yönlendirici metin; `messages/page.tsx:52-58` role göre dallanmış boş-durum metni.
- (2) 13 sonraki dokunuş (K-19, IC-01, AN-10, IC-11, F-28b, AJ-07) blokları bozmamış.
- (3) `mentor-empty-panel.test.tsx` yalnız `MessagesInboxPage`'i render edip rol metnini test ediyor; onay-kuyruğu görünürlüğü için ayrı test yok.
- (4) İkisi de gerçek route'larda mount ediliyor.
- Sonuç ⚠️ KISMEN: mesaj kolu kod+test tam, onay-kuyruğu kolu kod-doğrulandı ama testsiz; ayrıca orijinal şikayetin "4× '—' metrik" alt-parçası PR kapsamına hiç girmemiş (METRIC_DEFS hâlâ veri yoksa "—" basıyor).

### P-10 — Mentör booking e-posta bildirimi
- kaynak: `...md:81` · PR #89(BE)+pointer
- (1) `meetingController.ts:599-607` book handler'da `sendMeetingRequestEmail(...).catch(...)` fire-and-forget.
- (2) PR merge (4686ba4) sonrası çok sayıda dokunuş (KR-19, K-19, GV-03, GV-06, U-01, Y-03…) ama çağrı satırı ve içeriği bozulmadan duruyor.
- (3) `meetings.test.ts:160-179` gerçek `/api/meetings/book` isteği atıp `sendMeetingRequestEmailMock`'un mentor e-postasıyla 1 kez çağrıldığını doğruluyor — DB gerektiren entegrasyon testi (supertest+prisma), totolojik değil.
- (4) Ölçüt cümlesi "e-posta ALIYOR" — gönderim mekanizması kod+testle kanıtlı ama gerçek ULAŞMA SMTP yapılandırmasına bağlı (03-PO-ELLE-ISLER B#4) → kategori 👁 (kod ✅).

### P-11 — Mentörlük saati
- kaynak: `...md:82` · PR #82(BE)+#222(FE)+#223(pointer)
- (1) `mentorMetricsController.ts:26` (`totalMentoringHours`), `:50` (`Math.round(dakika/60)`); `mentor/page.tsx:48` kart tanımı.
- (2) Yalnız Y3b (8af2f66, tenant-izolasyon 404 düzeltmesi) dokunmuş, hesaplama sağlam.
- (3) `mentor-metrics.unit.test.ts:24-36` (3 test: 150dk→3sa, 100dk→2sa, null→0) + `mentor-panel-data.test.tsx:65-72` (kart render).

### P-12 — Sertifika rozeti kalıcılığı
- kaynak: `...md:83` · PR #82(BE)+#222(FE)+#223(pointer)
- (1) `mentorMetricsController.ts:107-111` (`tenantMembership.findUnique({select:{isCertified}})`), `:131` (`membership?.isCertified ?? false`); `mentor/page.tsx:194-215` rozet/CTA dallanması.
- (2) Yalnız Y3b dokunmuş, mantık sağlam.
- (3) `mentor-metrics.unit.test.ts:38-45` (2 test) + `mentor-panel-data.test.tsx:74-87` (rozet/CTA render, 2 test).
- (3b) MUTASYON: `buildMentorMetricsResponse` içindeki `isCertified: input.isCertified` satırı `isCertified: false` sabitine çevrildi → `mentor-metrics.unit.test.ts` sonucu **1/9 kırmızı** ("sertifikalıysa true"). Worktree `/tmp/mut-06-P12-me-*` temizlendi.

### P-13 — Aktif menti listesi
- kaynak: `...md:84` · PR #82(BE)+#222(FE)+#223(pointer)
- (1) `mentorMetricsController.ts:114-122` (`activeMentees` sorgusu, `activeMentis = activeMentees.length`); `mentor/page.tsx:245-256` liste render.
- (2) Yalnız Y3b dokunmuş.
- (3) `mentor-metrics.unit.test.ts:48-63` (sayı≡liste, boş liste) + `mentor-panel-data.test.tsx:89-105` (2 test).

### P-14 — Mentöre takdir cümlesi
- kaynak: `...md:85` · PR #216
- (1) `lib/mentorAppreciation.ts:14-24` saf fonksiyon; `mentor/page.tsx:238-242` banner.
- (2) PR merge (c743f6b) sonrası yalnız kozmetik dokunuşlar (AJ-07, F-28b, AN-10, IC-11, IC-01, K-19, F-32, F-21, K-10, AN-17), mantık sağlam.
- (3) `mentorAppreciation.test.ts` P-14 describe bloğu — sıfır/kısmi/dolu senaryo + "null ile dolu aynı metin değil" negatif kontrolü.

### U-02 — Toplantı linki görünürlüğü
- kaynak: `...md:91` · PR #201
- (1) `meetings/page.tsx:80-107` format'a göre link/konum/telefon render.
- (2) Sonraki çok sayıda dokunuş (P-05, AN-10, IC-11, IC-03, K-19, GV-03, E-3e) render bloğunu kaldırmamış.
- (3) `meetings-location.test.tsx` 5 test (ONLINE, GV-03 negatif, IN_PERSON, PHONE, boş-durum).
- Güvenlik notu (arşiv iddiası: doğrulanmamış locationUrl tıklanabilir): GV-03 GERÇEKTEN kapanmış — giriş `meetingController.ts:616` `z.string().max(2048).refine(isHttpUrl,...)` (yalnız mentör onayında yazılıyor); çıkış `meetings/page.tsx:90` `isHttpUrl(meeting.locationUrl)` kontrolü olmadan link render edilmiyor. Backend PR #107, frontend PR #284, ikisi de merge; negatif test dahil.

### U-03 — Davet ekranı hata görünürlüğü
- kaynak: `...md:92` · PR #204
- (1) `admin/invite/page.tsx:95` (`useTenant()` gerçek ad), `:147,166` (`setMsg` çağrıları), `:280` (mesaj render).
- (2) Yalnız 2 kozmetik dokunuş (AN-10, IC-02).
- (3) `invite-error-tenant-name.test.tsx` 2 test.

### U-04 — Kurum onay/ret durumu
- kaynak: `...md:93` · PR #224
- (1) `pending-review/page.tsx:38-45` `/api/auth/me` okuması + `:52,69,88,112` 4 durum dallanması; backend `authController.ts:857-886`.
- (2) Yalnız K-10 (koyu mod) dokunmuş.
- (3) `pending-review-status.test.tsx` 5 test (APPROVED/REJECTED/CORRECTION/PENDING/401).
- (4) E-posta bildiriminin açılması ayrı PO adımı (SMTP) — bu ölçütün (uygulama-içi gösterge) dışında.

### U-05 — Platform admin bekleyen başvuru göstergesi
- kaynak: `...md:94` · PR yok, "ZATEN YAPILMIŞ" iddiası
- (1) `platform/dashboard/page.tsx:221` (sekme rozeti), `:300,305` (kırmızı kart); backend `platformController.ts:166` (`pendingTenants`).
- (2) Yalnız kozmetik dokunuşlar (F-28b, F-21, IC-03, AN-39, KR-09).
- (3) Test yok — `pendingTenants`/"Bekleyen Başvuru" için grep boş, ne frontend ne backend testinde ölçülüyor.
- Sonuç ⚠️ KISMEN: kod doğru ve duruyor, ama CLAUDE.md kuralı gereği test yoksa tam ✅ verilemez.

### U-07 — Bekleyen kullanıcı kendi e-postası
- kaynak: `...md:95` · PR #202
- (1) `pending-approval/page.tsx:11-15` `email = user?.email ?? searchParams.get('email')`; `LoginForm.tsx:55,77` `?email=` query'siyle taşıma.
- (2) PR merge (dfb2fe4) sonrası IC-06/IC-08/F-28b dokunmuş ama satır mantığı sağlam.
- (3) `pending-approval-email.test.tsx` 3 test (query yedeği, e-posta yokken yedek metin, token varken öncelik).
- (3b) MUTASYON: `email` ataması `user?.email ?? undefined` olarak query yedeği kaldırılacak şekilde değiştirildi → `npx vitest run src/__tests__/pending-approval-email.test.tsx` sonucu **1/3 kırmızı** ("token yokken query e-postası gösterilir"). Worktree `/tmp/mut-06-U07-me-*` temizlendi.

### U-09 — Boş admin panelinde davet yönlendirmesi
- kaynak: `...md:96` · PR #203
- (1) `admin/approvals/page.tsx:62-73` nötr metin + `/admin/invite` linki; `admin/waiting-room/page.tsx:81-90` aynı desen.
- (2) Yalnız 2 kozmetik dokunuş (F-32, IC-03).
- (3) `approvals-empty-invite.test.tsx` 1 test — yalnız approvals sayfasını kapsıyor, waiting-room için ayrı test yok (PR'ın kendi kapsamıyla tutarlı: "Test 1 yeni").
