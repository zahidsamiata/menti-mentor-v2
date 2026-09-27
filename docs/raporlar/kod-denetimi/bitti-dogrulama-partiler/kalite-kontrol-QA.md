# Kalite kontrolü QA — BITTI son doğrulama (2026-09-27)
Denetçi: opus alt-ajan (partileri yapmayan) · referans: çatı 191a256 · backend 3bd9ad3 · salt-okuma
Özet: kontrol edilen 40 · TUTAR 37 · ÇÜRÜDÜ 3 (parti-07: 1 · parti-10: 1 · parti-11: 1) · yeniden koşulan mutasyon 0

| İş | Parti | Parti kategorisi | QC kararı | Doğru kategori | Kanıt dosya:satır | Kalan (⚠️/🔁/👁 için) | Güvenlik/KVKK etkisi | Karar gerekebilir |
|---|---|---|---|---|---|---|---|---|
| KR-19 | 01 | ⚠️ | TUTAR | ⚠️ | backend/src/services/matching.ts:436-443 (yorum: karşı kurumun bloğu bu yönden görünmez), :459 yalnız çağıranın kurumu | Kurumlar arası havuzda karşı kurumun yöneticisinin koyduğu blok listede görünmüyor; eylemler engelli. | evet — engellenen kişi karşı tarafı listede görmeye devam edebiliyor (kurumlar arası). | evet — kurumlar arası çiftte hangi kurumun blok listesi geçerli olmalı, ürün sorusu. |
| K-14 | 01 | ⚠️ | TUTAR | ⚠️ | backend/src/middleware/rateLimiter.ts:39,64-66 (req.ip) · src/server.ts `app.set` yok (grep boş) | trust proxy yok; vekil arkasında tüm IP limitçileri tek kova. | evet — login/forgot-password IP limitleri vekil arkasında etkisiz ya da herkesi birlikte kilitler. | hayır (teknik; PO'nun server.ts turu) |
| F-23 | 01 | ⚠️ | TUTAR | ⚠️ | backend/src/controllers/adminSettingsController.ts:40,97 elle `payload.tenantId !== tenantId` | Yetki kapısı merkezî; URL kurum eşleşmesi her uçta hâlâ elle. | hayır — bugün her uçta kontrol var; risk yalnız yeni uçta unutulması. | hayır |
| U-19 | 02 | ⚠️ | TUTAR | ⚠️ | backend/src/services/matching.ts:554-562 · tests/mentor-bookable-status.test.ts:86-97 yalnız catch dalı | Profil satırı var ama çekirdek eksik dalı testsiz; ayrı isCoreComplete birim testi yok. | hayır | hayır |
| GV-07 | 02 | ⚠️ | TUTAR | ⚠️ | backend/src/services/logger.ts:22-23 · tests/platform-login-log-pii.unit.test.ts:34-38 yalnız çağrı yeri | Logger katmanındaki süzgeç bağlantısını ölçen test yok; başka çağrı yeri e-posta yazarsa yakalanmaz. | evet — KVKK: kalıcı SystemLog'a PII düşmesinin genel koruması testsiz. | hayır |
| GV-10 | 02 | 🔁 | TUTAR | 🔁 | backend/src/middleware/jwtAuth.ts:40 (AJ-03 f2da8ce) · membershipAccess.ts:32-36 · tests/auth.test.ts:284-297 | Güncel hâl ölçütü karşılıyor; erişim anahtarı iptal listesi bellek içi (yeniden başlatmada sıfırlanır). | evet — sunucu yeniden başlarsa çıkış yapılmış anahtar süresi dolana kadar geçerli. | hayır |
| GV-23 | 03 | 🔁 | TUTAR | 🔁 | backend/src/controllers/gdprController.ts:145 · src/utils/authCookies.ts:22-24 · tests/me-data-rights.test.ts:121-127 | Yok — AJ-09 yardımcıyı taşıdı, seçenekler aynı. | hayır | hayır |
| PS-01 | 03 | 🔁 | TUTAR | 🔁 | backend/src/services/matching.ts:76-84,104-116 (AN-07 keyset), :231,486 orderBy | 5000 aday tavanının üstü hâlâ kesilir (MAX_MATCH_CANDIDATES); pratikte erişilmez. | hayır | hayır |
| PS-02 | 03 | ⚠️ | TUTAR | ⚠️ | backend/src/controllers/onboardingController.ts:479,493 · tests/onboarding-disc-confidence.unit.test.ts:81,113 vektörü test kuruyor · scoring.ts:110 | Kalıcı yazılan confidence testsiz; scoring.ts:110 eski vektörde hâlâ güveni 1 raporlar. | hayır | hayır |
| PS-A1 | 03 | ⚠️ | TUTAR | ⚠️ | backend/src/services/scoring.service.ts:94-101 testsiz · scoring.ts:12 ile scoring.config.ts:8 iki ayrı DiscVector | Çağrı noktası testle korunmuyor; iki DiscVector tipi birleştirilmedi. | hayır | hayır |
| IC-06 | 03 | ⚠️ | TUTAR | ⚠️ | backend/src/services/oauth/oauthService.ts:64-82 (HESAP_PASIF ve PROVIDER_CATISMASI ayrı kod) | OAuth dönüş adresindeki hata kodu hesabın varlığını ve durumunu ayırt ettiriyor. | evet — küçük hesap-varlığı sızıntısı (yalnız o e-postanın OAuth hesabına sahip olan görür). | hayır |
| GV-12 | 04 | ⚠️ | TUTAR | ⚠️ | backend/src/controllers/selfServeController.ts:246-259 (kayıtlıda tenant/user null, oturum yok) | Kayıtlı ve kayıtsız e-posta sonraki ekrandan ayırt edilebiliyor. | evet — üyelik bilgisi sızıntısının kalıntısı. | evet — KARAR-102 (kayıt sonrası hemen giriş mi, e-posta doğrulaması mı). |
| F-15 | 05 | ⚠️ | TUTAR | ⚠️ | frontend/src/app/(dashboard)/menti/page.tsx:231-236 · __tests__ grep "yalnız değilsin" boş | Metin var, hiçbir testte assert edilmiyor. | hayır | hayır |
| F-29 | 06 | 🔁 | TUTAR | 🔁 | frontend/src/app/layout.tsx:36,59 · src/app/sitemap.ts (Y-13 0519943) · __tests__/site-url.test.ts, sitemap-public-routes.test.ts | Yok — güncel hâl ölçütü karşılıyor. | hayır | hayır |
| P-09 | 06 | ⚠️ | TUTAR | ⚠️ | frontend/src/app/(dashboard)/mentor/page.tsx:265-282 · __tests__/mentor-empty-panel.test.tsx yalnız mesajlar sayfası | Mentör panelindeki boş talep kartı testsiz. | hayır | hayır |
| P-10 | 06 | 👁 | TUTAR | 👁 | backend/src/controllers/meetingController.ts:599 · tests/meetings.test.ts:160-180 | E-postanın gerçekten ulaşması SMTP'ye bağlı, canlıda bakılmalı. | hayır | hayır |
| U-05 | 06 | ⚠️ | TUTAR | ⚠️ | frontend/src/app/platform/dashboard/page.tsx:221,300 · __tests__/platform-reject-cancel.test.tsx:59 yalnız sekmeye tıklıyor | Bekleyen başvuru rozeti ve kartı testle ölçülmüyor. | hayır | hayır |
| U-10 | 07 | 🔁 | ÇÜRÜDÜ | ⚠️ | frontend/src/app/(admin)/admin/certification/page.tsx:68-87 boş dal yok · mentor/page.tsx:277-282 testsiz | 4 ekrandan admin/certification bilinçli atlandı; mentör talep kartı (P-09) testsiz. | hayır | hayır |
| U-16 | 07 | ⚠️ | TUTAR | ⚠️ | backend/src/services/cronScheduler.ts:166-180 · feedbackController.ts:265-291 · tests/ grep reminderEmailSentAt/delivered boş | delivered sayımı ve hatırlatmanın yakılmaması testsiz. | hayır | hayır |
| V-02 | 07 | ⚠️ | TUTAR | ⚠️ | backend/src/middleware/errorHandler.ts:17-27 · src/server.ts:192-203 · tests/ grep "Beklenmedik sunucu" boş | 500 meta alanları ve süreç işleyicileri testsiz. | evet — KVKK: 500 log meta'sında PII olmadığını ölçen test yok. | hayır |
| V-08 | 07 | 👁 | TUTAR | 👁 | docker-compose.yml:63-65 (`${BACKEND_URL:-http://localhost:3000}`) · backend/src/config.ts:88 | Dokploy'da BACKEND_URL set değilse varsayılan localhost; canlı değer PO teyidi (03-PO-ELLE-ISLER:89). | evet — KVKK zorunlu abonelikten çıkma linki yanlış domaine gidebilir. | hayır |
| V-09 | 07 | ⚠️ | TUTAR | ⚠️ | backend/src/routes/authRoutes.ts:72 `/reapply` (2026-08-16'dan beri) · CLAUDE.md:399-408 listede yok | Kapanışta da eksikti: POST /api/auth/reapply public ama listede yok. | evet — belgesiz public uç, yeni uç denetiminde gözden kaçar. | hayır |
| V-11 | 07 | ⚠️ | TUTAR | ⚠️ | backend/src/services/cronScheduler.ts:29-35 · tests/health.test.ts:52,89 yalnız NODE_ENV=test dalı | CRON_ENABLED='false' dalı ve /health eşlemesi gerçekten ölçülmüyor. | evet — KVKK imha cron'u kapalıysa operatör göstergesinin doğruluğu testsiz. | hayır |
| V-12 | 07 | ⚠️ | TUTAR | ⚠️ | frontend/src/app/error.tsx:29 · global-error.tsx:23 · __tests__ grep boş | Üç hata ekranına test yok. | hayır | hayır |
| I-04 | 08 | ⚠️ | TUTAR | ⚠️ | backend/src/services/certification.service.ts:320 (maxTopics verilmiyor) · certExamSelection.ts:17-20 | 4+4 rastgele çekim devreye alınmadı; tüm aktif sorular geliyor. | hayır | evet — örnekleme açılmadan önce puanlama paydası kararı gerekir. |
| K-10 | 08 | 🔁 | TUTAR | 🔁 | frontend/src/components/atoms/DiscBadge.tsx:11-14,20-21 (AJ-07 7671558) | Gerekçe düzeltmesi: AJ-07 açık temayı düzeltti, koyu mod (400) K-10'dan beri AA; güncel hâl karşılıyor. | hayır | hayır |
| F-21 | 08 | 👁 | TUTAR | 👁 | frontend/src/__tests__/a11y-f21.test.tsx:35-39 (gerçek keyDown/odak) · src/lib/a11y/radioGroup.ts | Gerçek ekran okuyucu deneyimi insanla doğrulanmalı. | hayır | hayır |
| Y-09 | 09 | 👁 | TUTAR | 👁 | frontend/src/app/icon.tsx · opengraph-image.tsx · twitter-image.tsx · __tests__/brand-image.test.ts (10) | Sekme/paylaşım önizlemesi tarayıcıda görülmeli; NEXT_PUBLIC_SITE_URL build-arg PO'da. | hayır | hayır |
| GV-03 | 09 | 🔁 | TUTAR | 🔁 | backend/src/controllers/meetingController.ts:616 (tek yazma yolu) · frontend meetings/page.tsx:90 · tests/meeting-location-url.test.ts:121-130 | Yok — link onay akışına taşındı, iki uçta koruma duruyor. | hayır | hayır |
| IC-03 | 09 | ⚠️ | TUTAR | ⚠️ | frontend/src/components/organisms/ProgramHealthSection.tsx:155 `{m.role}` (admin/kpi) · platform/dashboard/page.tsx:561 `{r.status}` | Kanıt düzeltmesi: parti notificationService.ts:118 dedi, o push STUB (kullanıcıya gitmez); asıl ham kalanlar bu iki satır. | hayır | hayır |
| YN-09 | 10 | ⚠️ | TUTAR | ⚠️ | docs/otonom/00-KUYRUK.md 37 satır >1000 krk, `## GEÇMİŞ` yok · docs/kararlar/00-KARAR-TAKIP.md 29 satır | Kuyruk ayağı hiç yapılmadı; karar-takip 24'ten 29'a geri büyüdü. | hayır | hayır |
| YN-11 | 10 | ⚠️ | TUTAR | ⚠️ | docs/raporlar/kesif/csp-zorunlu-mod-hazirlik-2026-09-27.md:1-5 · kesif/erisilebilirlik-denetimi-2026-09-27.md:1-5 etiketsiz | Yeni raporlar etiketsiz geliyor; sürekli denetim yok. | hayır | hayır |
| AN-09 | 10 | 👁 | TUTAR | 👁 | backend/src/controllers/suspicionController.ts:23 · src/services/emailService.ts:371-379 · tests/suspicion-report-alert.test.ts:37-47 | E-postanın ulaşması SMTP'ye bağlı, canlıda bakılmalı. | hayır | hayır |
| AN-11 | 10 | ⚠️ | ÇÜRÜDÜ | ✅ | backend/src/services/certification.service.ts:70-72 (80 şık = seed-certification.ts 80 optionKey), :74-78 `_isRedLine` | Yok. | hayır | hayır |
| P-05 | 11 | 👁 | TUTAR | 👁 | backend/src/controllers/meetingController.ts:738-751 · notificationService.ts:43-54 push STUB · frontend meetings/page.tsx:30 | E-posta SMTP'ye bağlı; uygulama içi bildirim STUB, kullanıcıya ulaşmıyor (kuyruk notu "çan çalışır" diyor). | hayır | evet — push/çan bildirimi stub kararı (OB-09) canlı-öncesi mi sonrası mı. |
| AJ-06 | 11 | ⚠️ | TUTAR | ⚠️ | backend/src/controllers/conversationController.ts:294-334 (groupBy + DISTINCT ON) · tests/conversation.test.ts:186-234 yalnız sonuç | Sorgu sayısını ölçen test yok; N+1 geri gelse test kırılmaz. | hayır | hayır |
| V-16 | 11 | ⚠️ | TUTAR | ⚠️ | backend/src/services/health.ts:52 · docs/otonom/03-PO-ELLE-ISLER.md:15 | Dokploy'da GIT_SHA set edilmedi; canlıda "unknown". | hayır | hayır |
| IC-10 | 11 | ⚠️ | ÇÜRÜDÜ | ✅ | docs/raporlar/icerik/menti-simdilik-varyantlari.md:13,21,29,37 (4 varyant) | Yok (ölçüt ön koşul metni; ekran etkisi I-15 ile). PO içerik onayı ayrı 🟡 adım (:55). | hayır | evet — PO içerik onayı + KARAR-45 (adlar) I-15'i açar. |
| AN-05 | 11 | ⚠️ | TUTAR | ⚠️ | docs/raporlar/icerik/birlikte-calisma-kombinasyonlari.md:18-165 (16 metin) · :12 onay bekliyor | Metin yazıldı; ölçüt "menti ekranda görüyor", koda girmedi. | hayır | evet — KARAR-45 (adlar) + PO içerik onayı. |
| AN-10 | 11 | ⚠️ | TUTAR | ⚠️ | frontend/src/__tests__/terminology-mentor.test.ts:16-36 (yalnız listelenen dosyalar) | mizaç/karakter/kişilik ayağı yapılmadı. | hayır | evet — KARAR-64 cevapsız. |

## Notlar

### U-10 · parti-07 · 🔁 → ⚠️
- Ölçüt "Bu 4 ekran boşken anlamlı boş-durum metni gösteriyor". Parti "ölçüt hâlâ karşılanıyor" dedi.
- `frontend/src/app/(admin)/admin/certification/page.tsx:68-87`: `data.topics` boşken ayrı bir boş-durum dalı yok. Kuyruk notu bu ekranın "pratikte hiç boş olmuyor" diye bilinçli atlandığını yazıyor. Yani 4 ekrandan biri yapılmadı.
- Mentör talep kartı P-09'da çözüldü (`mentor/page.tsx:277-282`) ama bunu ölçen test yok. `mentor-empty-panel.test.tsx` yalnız mesajlar sayfasını render ediyor.
- book-meeting (K-20 ile değişti) ve admin/questions testli. Bu yüzden 🔁 değil ⚠️: bir parça eksik, bir parça testsiz.

### AN-11 · parti-10 · ⚠️ → ✅
- Bu yalnız yorum ve imza düzeltmesi. Kategori tanımına göre belge işinde kanıt `belge:satır` ile verilir, davranış testi gerekmez.
- `certification.service.ts:70-72` "bugünkü seed'de 80 şık var" diyor. `prisma/seed-certification.ts` içinde gerçekten 80 `optionKey` sayıldı. Eski "3 ile" ifadesi grep'te yok.
- `:74-78` `_isRedLine` parametresinin eşiği etkilemediğini açıkça yazıyor. Merge (`a2abff2`) sonrasında dosyaya dokunan commit'ler (PS-02, Y-03, K-08) bu yorumları bozmadı.
- Ölçüt ("yorum/imza kod gerçeğini söylüyor") karşılanıyor.

### IC-10 · parti-11 · ⚠️ → ✅
- Kuyruk satırındaki "Bitti demek" hücresi açıkça ön koşul işi diyor: kullanıcı etkisi `I-15` ile birlikte görünecek. Yani ölçüt yalnız 4 menti varyantının yazılması.
- `docs/raporlar/icerik/menti-simdilik-varyantlari.md:13,21,29,37`'de dört varyant duruyor.
- Parti "koda girmedi" gerekçesiyle ⚠️ verdi. Oysa kodlama bu işin değil, I-15'in ölçütü (🔴 KARAR-10 kilitli).
- PO içerik onayı (`:55`) ayrı bir 🟡 adım. Bitti tanımını değil, I-15'in açılmasını etkiliyor.

### Kategori doğru ama parti gerekçesi/kanıtı hatalı (ÇÜRÜDÜ sayılmadı)
- **K-10:** Parti "kapanışta ölçüt gerçekte karşılanmıyordu" dedi. Oysa AJ-07 (`7671558`) yalnız açık temadaki 600 tonlarını düzeltti; koyu mod (`dark:*-400`) K-10'dan beri AA'yı geçiyor ve dokunulmadı (`DiscBadge.tsx:11-14`). 🔁 yine doğru, çünkü aynı satırları sonraki iş değiştirdi.
- **IC-03:** Parti kalan olarak `notificationService.ts:118`'i gösterdi. O satır push STUB (`notificationService.ts:43-54`); yalnız başlığı günlüğe yazıyor, kullanıcıya ulaşmıyor. Kullanıcıya görünen ham enum kalanları şunlar: `ProgramHealthSection.tsx:155` (yönetici KPI ekranında `MENTOR`/`MENTI`) ve `platform/dashboard/page.tsx:561` (şikâyet durumu `OPEN`/`REVIEWED`/`DISMISSED`). Kapsam dışı ama aynı sınıftan: `mentor/page.tsx:329,574` `{m.format}` (`ONLINE`/`IN_PERSON`).
- **P-05:** Kuyruk notu "uygulama içi (çan) ayağı çalışır" diyor. Oysa `notifyMeetingRequestDeclined` bir push STUB; gerçekte yalnız e-posta ve ekrandaki nazik etiket ("Gerçekleşmedi") var.
- **V-09:** `/api/auth/reapply` 2026-08-16'dan (`dd75b63`) beri var. Yani V-09 kapatılırken yazılan "tam liste" zaten eksikti; sonradan eklenmiş bir uç değil.
