# Kalite kontrolü QC — BITTI son doğrulama (2026-09-27)
Denetçi: opus alt-ajan (partileri yapmayan) · referans: çatı 191a256 · backend 3bd9ad3 · salt-okuma
Özet: kontrol edilen 25 · TUTAR 23 · ÇÜRÜDÜ 2 (parti-03: 1 · parti-04: 1) · yeniden koşulan mutasyon 0

| İş | Parti | Parti kategorisi | QC kararı | Doğru kategori | Kanıt dosya:satır | Kalan (⚠️/🔁/👁 için) | Güvenlik/KVKK etkisi | Karar gerekebilir |
|---|---|---|---|---|---|---|---|---|
| GV-16 | parti-03 | ✅ | TUTAR | ✅ | backend/src/services/imageSanitize.ts:38,123 · avatarController.ts:45,69 · avatarStorage.ts:56 · test image-sanitize.unit.test.ts:99,162,185 | — | — | — |
| GV-18 | parti-03 | ✅ | TUTAR | ✅ | consentService.ts:189-193 · authController.ts:389,528,868,893-910 · ReconsentBanner.tsx:22 · layout.tsx:18 · test consentService.test.ts:108-112 (eski sürüm → false) · gv18-reconsent.test.ts:29-71 | — | — | — |
| GV-19 | parti-03 | ✅ | TUTAR | ✅ | passwordPolicy.ts:29-34 · authController.ts:68-71,640-690 · authRoutes.ts:63-68 · profile/page.tsx:465 · test password-policy.unit.test.ts:24-29 | — | — | — |
| GV-21 | parti-03 | ✅ | ÇÜRÜDÜ | ⚠️ | authController.ts:722-724 · authRoutes.ts:76-87 · test auth-route-order.test.ts:9-27 (yalnız /me ve bilinmeyen adları ölçüyor) | catch-all altına eklenen yeni GET ucu hâlâ OAuth'a düşer; bunu genel olarak yakalayan test (rota yığınında /:provider en sonda mı) yok | hayır — yanlış düşüş artık 404 PROVIDER_BULUNAMADI, açık uç üretmiyor | hayır |
| GV-24 | parti-03 | ✅ | TUTAR | ✅ | userController.ts:194-230 (onay kapısı + approvalStatus filtresi) · test user-detail-approval-gate.test.ts:28-56 | — | — | — |
| GV-25 | parti-03 | ✅ | TUTAR | ✅ | sjtScoringController.ts:105-108 · test rank-mentors-ownership.test.ts:37-46,66-80 | — | — | — |
| PS-06 | parti-03 | ✅ | TUTAR | ✅ | discVectorService.ts:72-86,107 · questionController.ts:337,401 · test discVector-tenant-cache.unit.test.ts:29-55 (not: dosyaya sonradan b538be8/19753e1 dokundu, ilgili satırlar yerinde) | — | — | — |
| PS-07 | parti-03 | ✅ | TUTAR | ✅ | test matching-semantics.unit.test.ts:17,45-105 (üretim computeTotalScore çağrılıyor) · matching-ranking.test.ts:104-121 · matching.ts:209,469 | — | — | — |
| PS-08 | parti-03 | ✅ | TUTAR | ✅ | feedback-loop.test.ts:129-134 · matching.test.ts:184-200 (koşulsuz; cea49b3 sonrası değişiklik yok) | — | — | — |
| PS-09 | parti-03 | ✅ | TUTAR | ✅ | tests/scoring-formula-cases.unit.test.ts:39-56 · vitest.config.ts:28 · .github/workflows/ci.yml:58 | — | — | — |
| PS-10 | parti-03 | ✅ | TUTAR | ✅ | frontend menti/page.tsx:295-302 · backend matching.ts:531 · test menti-mentor-card-bookable.test.tsx:118-124 | — | — | — |
| AN-07 | parti-04 | ✅ | TUTAR | ✅ | matching.ts:101-116,535 · test matching-candidate-coverage.unit.test.ts:105-115 (zenginleştirme yalnız ilk N — hızın yapısal vekili; süre ölçülmüyor) | — | — | — |
| AJ-02 | parti-04 | ✅ | TUTAR | ✅ | systemLogController.ts:41,48 · test security.test.ts:219-246 | — | — | — |
| AJ-01 | parti-04 | ✅ | ÇÜRÜDÜ | ⚠️ | retentionMetrics.service.ts:59-65,87 (Mentörsüz Menti sayımı User.tenantId+User.role) · ProgramHealthSection.tsx:60 · adminController.ts:211-217,247 (kullanıcı listesi toplamı User.role) | panelde gösterilen Mentörsüz Menti sayısı ve kullanıcı listesi rol filtresi/toplamı hâlâ User.role + ana kurumdan | hayır — kurumlar arası sızıntı değil, yalnız sayım doğruluğu | hayır |
| AJ-03 | parti-04 | ✅ | TUTAR | ✅ | jwtAuth.ts:32,40 · authController.ts:549-554 · tüm doğrulayıcılar verifyToken kullanıyor (tenant.ts:63, platformAuth.ts:22) · test auth.test.ts:285-322 | — | — | — |
| AJ-04 | parti-04 | ✅ | TUTAR | ✅ | tests/aj04-negatif-test-devami.test.ts:142-155 (404 + içerik/DB değişmedi) | — | — | — |
| PS-A4 | parti-04 | ✅ | TUTAR | ✅ | matching.ts:525-531 (fallback kuyrukta beyanlı, KARAR-104) · test matching-menti-esik.unit.test.ts:71-99 | — | — | — |
| AJ-09 | parti-04 | ✅ | TUTAR | ✅ | utils/authCookies.ts:12,23 (tek res.cookie/clearCookie) · utils/userSelect.ts:11-22 · satır içi eş küme grep'i 0 · test authCookies.unit.test.ts:40-47 | — | — | — |
| F-24 | parti-04 | ✅ | TUTAR | ✅ | platformTenantController.ts getTenantUserDetail (tenantId+userId, 404, maskEmail) · platformRoutes.ts:60 · MembersTable.tsx:87 (m.id = user.id) · test platform-tenant-user-detail.test.ts:89-98 | — | — | — |
| AJ-13 | parti-04 | ✅ | TUTAR | ✅ | tests/aj13-negatif-test-2-parti.test.ts (15 it; 14 uç #169 ile örtüşük, PR #193 dökümünde eşlendi) | — | — | — |
| AJ-15 | parti-04 | ✅ | TUTAR | ✅ | tests/aj15-negatif-test-3-parti.test.ts:255-271 (404 + durum PENDING kalıyor) | — | — | — |
| AJ-16 | parti-04 | ✅ | TUTAR | ✅ | tests/aj16-negatif-test-4-parti.test.ts:276-300 · kaynaksız/öz-servis uçlarda yalnız 401/403 anlamlı; conversation çapraz testi conversation.test.ts'te | — | — | — |
| AJ-17 | parti-04 | ✅ | TUTAR | ✅ | adminController.ts:570-594 · cronScheduler.ts:62-72,100-104 · gdprService.ts:413-427 · test aj17-elle-cron-kurum-kapsami.test.ts:84-131 | — | — | — |
| AJ-18 | parti-04 | ✅ | TUTAR | ✅ | tests/aj18-negatif-test-5-parti.test.ts:185-199,309 (pozitif kontrol var) | — | — | — |
| AJ-19 | parti-04 | ✅ | TUTAR | ✅ | tests/aj19-negatif-test-son-parti.test.ts:95-139 · PR #193 dökümünden 7 atıf dosyada doğrulandı (ör. meeting-reject-notify:90, tenant-isolation-fixes:22) | — | — | — |

## Notlar

### GV-21 (parti-03) · ✅ → ⚠️
- Ölçüt: "Yeni bir adres eklendiğinde yanlış yere düşmüyor; test bunu yakalıyor".
- Kodda yapılan: `isOAuthProviderKey` artık `Object.hasOwn` kullanıyor (authController.ts:722-724). Bu yüzden bilinmeyen ad 404 PROVIDER_BULUNAMADI alıyor. Rota dosyasına yalnız bir yorum uyarısı eklendi (authRoutes.ts:76-85).
- Eksik 1: `/:provider` catch-all'unun altına eklenen yeni bir `GET /api/auth/<ad>` ucu hâlâ OAuth işleyicisine düşer. Artık güvenli biçimde 404 döner, ama "yanlış yere düşmüyor" ölçütü sağlanmıyor.
- Eksik 2: tests/auth-route-order.test.ts yalnız `/me` ucunun sırasını ve bilinmeyen adların 404 almasını ölçüyor. Rota yığınını tarayıp `/:provider`'ın en sonda olduğunu doğrulayan genel bir test yok. Bu yüzden yeni ucun yanlış yere eklenmesini ancak o ucun kendi testi yakalar. Parti de notta "Test yalnız /me'yi korur" diyor.

### AJ-01 (parti-04) · ✅ → ⚠️
- Ölçüt: "Kurum yöneticisi KPI/panelde yalnız KENDİ kurumundaki rollere göre doğru sayı görüyor". Kuyruk satırı tutunma metriklerini açıkça kapsamda sayıyor.
- Taşınanlar: KPI rol dağılımı, arz-talep sayımı ve yönetici listesi/limiti TenantMembership'e taşındı (kpiReport.service.ts:48-56 · retentionMetrics.service.ts:50 · adminController.ts:883,906,939).
- Eksik 1 (tutunma sayımı): aynı servisteki "Mentörsüz Menti" sayımı hâlâ `prisma.user.count({ where: { tenantId, role: 'MENTI', ... } })` ile yapılıyor (retentionMetrics.service.ts:59-65,87). Yani ana kurum ve User.role kullanılıyor. Bu sayı yönetici panelinde görünüyor (frontend ProgramHealthSection.tsx:60). Başka kurumda menti üyeliği olan kişi sayılmıyor. Ana kurumunda User.role'ü MENTI olup üyelik rolü farklı olan kişi ise yanlışlıkla sayılıyor.
- Eksik 2 (yönetici kullanıcı listesi): liste de `User.tenantId` + `User.role` ile süzülüyor ve toplamı buradan sayılıyor (adminController.ts:211-217,247).
- Test durumu: bu iki yol kurum-ici-rol-sayimi-uyelik.test.ts'te ölçülmüyor. Merge 77bc264 bu satırlara dokunmadı.
