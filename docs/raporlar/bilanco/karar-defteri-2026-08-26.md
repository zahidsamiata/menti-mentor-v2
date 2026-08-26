# BELGE BİLANÇOSU — KARAR DEFTERİ (benzersiz/tekilleştirilmiş)

**📸 DONDURULMUŞ** (bilanço sentezi — 2026-08-26) · Kaynak dal: `docs/belge-bilancosu-2026-08-26` (bilanço turları) · TUR-4/FAZ-2 tekilleştirme

> **Ne bu:** Önceki 3 turda üretilen **16 bölüm dosyasının** (`docs/raporlar/bilanco/bolumler/`) BENZERSİZ karar/iş/niyet
> listesi. Aynı karar birden çok belgede tekrar ettiği için burada **TEKİLLEŞTİRİLDİ**: her benzersiz kalem TEK satır,
> altında "geçtiği yerler". Numaralı kalemler (madde 1-103, K/Y/T/G/F kodları, A1-A23) numara=kimlikle tekildir;
> numarasız kalemler niyet-bazlı birleştirildi. **Tereddütte AYIR** (yanlış birleştirme kalem kaybettirir).
> **Numara DOĞURULMADI · kod DEĞİŞTİRİLMEDİ · DB'ye DOKUNULMADI · PR/commit YOK · hakem sadece KOD kanıtı olan
> çelişkide OLUNDU (dosya:satır); kod bakılamayan çelişkide ikisi de yazıldı.**

**DURUM kodları (yalnız 6):** ✅ YAPILDI · 🟡 YARIM · 🔀 PR'DA · ⬜ AÇIK · ❓ TEYİT GEREK · 🗑️ GEÇERSİZ ADAYI
Ek işaret: 🔵 = bilinçli erteleme (⬜ alt-türü, v2/tasarım-hazır) · 📌 = KOD DIŞI kalıcı kural/ilke (iş değil).

**Bölüm dosyası kısaltmaları:** T1-A(canonical) · T1-B1(kararlar-kök) · T1-B2(kararlar-konu) · T1-B3(oz-denetim) ·
T2-A(raporlar-kök=boş) · T2-B(kesif) · T2-C(kod-denetimi) · T2-D(panel-persona) · T2-E(icerik) · T3-A(oturum-günlüğü) ·
T3-B(devir) · T3-C(çalışma-tarzı) · T3-D(tur1-denkleştirme) · T4-A1(arşiv-erken) · T4-A2(arşiv-strateji) · T4-A3(arşiv-katman).

---

## GRUP 1 — GÜVENLİK / KVKK (SEVİYE-1)

| kalem (tek cümle) | numara | durum | kanıt (dosya:satır) | geçtiği yerler |
|---|:---:|:---:|---|---|
| KARAR 5 DISC güvenlik: menti mentörün DISC'ini görmez (yüzde/ham-vektör gizli) | md.1 / KARAR 5 | ✅ | `discVisibility.ts`+`discLetters.ts`+`userController.ts` (#37+#71) | T1-A, T1-B2, T1-B3, T2-C, T3-A, T3-B, T3-D, T4-A3 ×8 |
| ⤷ NÜANS: menti→mentör DISC **TİP(harf)** gizleme DTO role-ayrışması kanıtlanamadı | md.1-alt | ❓ | S1/PII: durum-panosu :49/:142 + karar-statu :103/:211 "kanıtlanamadı"; DTO bu turda açılmadı | T1-B3, T3-D ×2. NİYET: asimetrik mahremiyet. DURDU: DTO açılmadı, TUR-4/kod-turu |
| K2 OAuth `kvkkConsentAt` set ediliyor (belge yanılıyordu, kod TAM) | md.2 / K2 | ✅ | `oauthService.ts:112`,`authController.ts:176` (#38+#73) — "en büyük sürpriz" | T1-A, T1-B2, T1-B3, T2-C, T3-A, T3-B, T4-A1, T4-A3 ×8 |
| K4 18+ öz-beyan (KVKK metnine gömülü — METİN var) | md.3 / K4 | ✅ | #38+#73 | T1-A, T1-B2, T3-A, T3-B, T4-A1, T4-A3 ×6 |
| ⤷ K4 yaş **form-input/DB-alanı** yok (`birthDate`/`birthYear` şemada yok) | md.3-alt / K4 | ⬜ | `birthDate`/`birthYear` grep BOŞ (T2-C 1.G A1) | T1-B3, T2-C, T3-B, T3-D ×4. NİYET: 18+ doğrulama. DURDU: veri-katmanı yazılmadı, metin var/input yok nüansı |
| K5 sunucu konumu beyanı (kvkk sayfası §8) | md.4 / K5 | ✅ | `kvkk/page.tsx §8` (#73) | T1-A, T1-B2, T1-B3, T3-A, T3-B, T4-A1 ×6 |
| ThemeToggle admin nav'da (kısmi — platform eksik, bkz. GRUP-Retention/UX değil altyapı) — NOT: güvenlik değil, burada değil | — | — | — | (Bu kalem GRUP Platform/UX'e taşındı) |
| G1/madde 38 `updateUser` password+PII sızıntısı fix | md.38 (G1) | ✅ | `userController.ts:280 select:USER_FULL_SELECT`+`db.ts:52 global omit` (#51 `b4b6d66`) — ⭐KOD-TEYİT | T1-A, T1-B3, T2-C, T3-A, T3-C ×5 |
| G2/madde 39 hardDelete FK ihlali → anonymize'e yönlendirildi (KVKK silme çalışır) | md.39 (G2)/96 | ✅ | `gdprService.ts:128-171 anonymizeUser updateMany` (#54 CANLIDA) — ⭐KOD-TEYİT | T1-A(Ç1/H1), T1-B3, T2-C, T3-A, T3-D ×5 |
| Tam anonimleştirme + hardDelete→anonymize (PO (c)+(iii)+(2): "silindi" deme + token iptali + dürüst metin) | md.93+39 (96) | ✅ | `gdprService.ts:132-165` Message/Feedback serbest-metin+avatar+token (#54 `b433554`) | T1-A, T1-B2, T2-C, T3-A ×4. NÜANS: userId(cuid) kalır (dürüst-sınır H-9) |
| G3/madde 68 `SuspicionReport` reporter PII maske | md.68 (G3) | ✅ | `platformController.ts:422 maskName/maskContact` (#51) — ⭐KOD-TEYİT | T1-A, T1-B3, T2-C, T2-D ×4 |
| madde 71 (T3) `SuspicionReport`'ta `tenantId` YOK → tenant-izolasyon boşluğu | md.71 (T3) | ⬜ | `schema.prisma:1168-1180` tenantId alanı yok (tenantName var) — ⭐KOD-TEYİT | T1-A, T2-C, T2-D, T3-C ×4. NİYET: rapor hangi kuruma ait. DURDU: kod-tasarım kararı |
| madde 80 `getPlatformLogs` select + `listUserReports` maske | md.80 | ✅ | #51 | T1-A, T3-A ×2 |
| madde 88 `getPlatformStats` recentLogs meta çıkarıldı | md.88 | ✅ | #51 | T1-A, T3-A ×2 |
| madde 89 `listPendingTenants` admin PII maske | md.89 / 94-doğuran | ✅ | maskEmail (#51) | T1-A, T3-A, T2-D ×3 |
| madde 94 `listPendingTenants` VIEW audit izi yok (düşük) | md.94 | ❓ | düşük öncelik | T1-A, T3-A ×2 |
| madde 40/97 KVKK FE üçlüsü (export/anon/silme) — backend var, FE 0 | md.40/97 | 🟡 | backend `userRoutes.ts:167-185` var; FE hard-delete/anonymize/export çağrısı YOK (grep boş) — ⭐KOD-TEYİT | T1-A, T1-B2, T1-B3, T2-C, T3-B, T3-D ×6. NİYET: KVKK Md.11 kullanıcı-yüzü. DURDU: FE 0 |
| madde 81 KVKK otomatik imha yok (Message/FeedbackLog süresiz; SystemLog 90g var) | md.81 | ⬜ | `gdprService.ts:262` cron yalnız SystemLog | T1-A, T2-C, T3-C ×3 |
| madde 82 rıza **sürümü** tutulmuyor (`consentVersion`/`policyVersion` yok) — ispat açığı | md.82 | ⬜ | `consentVersion` grep BOŞ — ⭐KOD-TEYİT | T1-A, T2-C, T3-D ×3. NİYET: rıza ispatı. DURDU: yalnız `kvkkConsentAt` |
| madde 83 OAuth açık rıza UI'da alınmıyor + KVKK/18+ tek kutuda | md.83 | ⬜/❓ | `_RegisterContent.tsx:414-415`; `oauthService.ts:112` (implicit) | T1-A, T1-B2, T2-C, T3-B ×4. Hukukçu |
| madde 84 `destek@` config'te tanımsız + FE hak-kullanım ekranı yok | md.84 | ⬜ | `config.ts:31` (`admin@platform.local` placeholder) | T1-A, T2-C, T3-A, T3-B, T4-A1 ×5. PO env |
| madde 85 aydınlatma metni eksik kategoriler (mesaj/sosyal/OCEAN/SJT/phone) | md.85 | ⬜ | — | T1-A, T2-C ×2. Hukukçu |
| madde 90 Veri İşleyen Sözleşmesi entegrasyon (tenant yasal alan) | md.90 | 🟡 | migration; hukukçu sonrası | T1-A, T1-B3, T3-D ×3 |
| madde 91 Kulüp-tipi tenant AKTİF EDİLMEZ (avukat kısıtı, canlı-öncesi) | md.91 | ⬜ | — | T1-A, T1-B2, T3-A, T3-D ×4. Hukuki kısıt |
| madde 92 sunucu ülkesi Londra/BK (eu-west-2=Londra, AB DEĞİL; İrlanda hataydı) | md.92 (Ç6) | ✅ | PO teyitli 2026-08-26 (#117); `assertTestDatabase.test.ts:7 eu-west-2` | T1-A, T1-B2, T1-B3, T2-C, T3-A, T3-C, T4-A2 ×7 |
| madde 95 kalibrasyon 'son değişiklik' aktör izi (getLastWeightChange) | md.95 | ✅ | #53 `b433554`+çatı#116 (migration YOK) | T1-A, T3-A ×2 |
| madde 98 kalibrasyon audit yazımı `void` (fire-and-forget) — iz kaybolabilir | md.98 | ⬜/❓ | S1 KVKK denetim; B.4 D-13 (audit yanıt-sonrası) | T1-A, T2-C, T3-A ×3 |
| madde 99 SystemLog 90g purge → "son değişiklik" izi 3 ay sonra kaybolur | md.99 | ⬜/❓ | S1 KVKK/iz | T1-A, T2-C ×2 |
| K3 eski-kayıt consent backfill politikası yok | K3 | ⬜/❓ | backfill kodu yok; ⏸️ EN SON (PO) | T1-A, T1-B3, T2-C, T3-B, T3-D ×5. S1 KVKK karar |
| K6 admin server-side guard yok (`frontend/src/middleware.ts` yok) | K6/md.66 | ⬜ | Glob BOŞ — ⭐KOD-TEYİT; API backend-korumalı (veri-sızıntısı değil, savunma-derinliği) | T1-A, T1-B3, T2-C, T3-B, T3-C, T3-D, T4-A1 ×7 |
| K7 çift-tenant kimlik teyidi (tüm okumalar Membership'ten mi) | K7 | ❓ | kod kanıtı yok; certified/qualityMultiplier okuma-kaynağı | T1-B3, T3-D ×2. S1 kimlik |
| `certified/qualityMultiplier` UserProfile→TenantMembership taşındı; eski-kod eski yerden okuyor olabilir | (K7 akrabası) | ❓ | =02:51/04:25; `UserProfile.qualityMultiplier` ikiz atıl | T1-B2, T2-C(D3), T4-A2 ×3 |
| DISC için ayrı açık rıza (hassas veri, register'da tek rıza) | md.25(v2)/83 | 🔵/⬜ | — | T1-B2, T1-B3, T3-B, T4-A1 ×4. Hukukçu |
| RLS lint kuralı (`findUnique` sızıntı tuzağı) | md.26(v2) | 🔵 | — | T1-B2, T1-B3, T3-B ×3 |
| Tenant izolasyon 5-katman + X-Tenant JWT çapraz-reddi + RLS oto-enjeksiyon (P0) | (04-guvenlik/güvenlik-denetimi 3.1) | ✅ | `tenant.ts:66-97,106` cross-tenant→403+membership+RLS — ⭐KOD-TEYİT | T1-B2, T3-C, T4-A2(H1) ×3 |
| Eşleştirme deadlock: boş havuz `{items:[],fallbackLevel}` kademeli fallback (P0) | (güvenlik-denetimi 2.1) | ✅ | `matching.ts:97,202-213,366` — ⭐KOD-TEYİT | T4-A2(H2) ×1 |
| DISC/SJT matematik sıfıra-bölme/NaN guard (P1) | (04:38 / güvenlik-denetimi 2.2) | ✅ | `sjt-scorer.ts:79 hits===0`+`Number.isFinite` guardları — ⭐KOD-TEYİT | T1-B2, T4-A2(H3) ×2 |
| Settings clamp + blockedPairs Zod-guard + Json-guard (P1 kural paneli hardening) | (04:39-40 / güvenlik-denetimi 1.1/4) | ✅ | `adminSettingsController.ts:65-75` clamp + `sanitizeBlockedPairs` — ⭐KOD-TEYİT | T1-B2, T4-A2(H4) ×2 |
| Super-admin gizlilik sınırı (agregat-only DTO whitelist, ham veri sızmaz) | (madde 80 / güvenlik-denetimi 3.2) | ✅ | `adminSettingsController.ts:224-286` whitelist DTO | T2-C, T4-A2 ×2. NÜANS: k-anon yuvarlama YOK |
| k-anonimlik (super-admin küçük-grup metrik yuvarlama) | (güvenlik-denetimi 3.2) | ⬜ | grep BOŞ; KVKK-agregat borcu | T4-A2 ×1. İZ ZAYIF |
| Header-yok → default-tenant'a düşme (denetim "reddet" öneriyordu; kod default'a düşer) | (güvenlik-denetimi 3.1 nüans) | 🟡/❓ | `tenant.ts:27 headerTenantId\|\|config.defaultTenantId`; JWT-kapısı `:66` azaltır | T4-A2(Ç4) ×1. Kasıtlı-mı = PO/güvenlik kararı |
| Sunucu/altyapı sertleştirme HİÇ ele alınmadı (Dokploy HTTP/firewall/SSH/SSL/yedek) | (04:54-57 / A6 canlı-öncesi) | ⬜ | KOD DIŞI altyapı; canlı-öncesi ZORUNLU, aksiyon-numarası YOK | T1-B2, T3-B, T4-A1(E15), T4-A2 ×4. ⭐güvenlik-borcu |
| logoUrl XSS: `z.string().url()` yetersiz (data:svg geçebilir) — MIME/host + CSP img-src | NUMARASIZ | ❓/✅ | admin-panelleri :68; B.5 `isSafeLogoUrl:50` XSS guard VAR (T2-D/T2-C) | T2-B, T2-C(B.5) ×2 |
| OAuth accessToken URL query'de (Referer/log riski, düşük) | NUMARASIZ | ❓ | `authController.ts:655-659`; token 1s+FE-memory | T2-C ×1 |
| `createMeeting` oryantasyon kilidi tenant-scope'suz `findUnique` (düşük) | NUMARASIZ | ❓ | `meetingController.ts:78-91`; PII/yazma yok | T2-C ×1 |
| suspicion-report IP-limit/CAPTCHA + GDPR şifre step-up (düşük) | NUMARASIZ | ⬜ | teshis :93 | T2-B ×1 |
| Resend key rotasyonu (açığa çıkan eski key silindi) | NUMARASIZ | ✅ | devir :16 | T4-A2 ×1. Tarihsel |
| Prod admin-key güçlü (64-hane); rotasyon opsiyonel | NUMARASIZ | ⬜ | devir :99 | T4-A2 ×1. Opsiyonel |

---

## GRUP 2 — EŞLEŞTİRME / PSİKOMETRİ (SEVİYE-1)

| kalem (tek cümle) | numara | durum | kanıt (dosya:satır) | geçtiği yerler |
|---|:---:|:---:|---|---|
| Eşleşme formülü Sektör×0.60 + Mizaç×0.40 (×qualityMultiplier) | md.9-formül | ✅ | `scoring.ts:89 DEFAULT_SECTOR_WEIGHT=0.6`; matris `:45` | T1-B2(03:19), T2-B, T2-E, T3-C(backend:63) ×4 |
| Ağırlık gösterim kartı %60/%40 (STK admin) | md.9 | ✅ | GET .../weights (#49+#102) | T1-A, T1-B3, T2-E, T3-B ×4 |
| Tenant manuel ağırlık ayarı (PUT weights, +/−%5, %40-70 clamp, audit) | md.9a | ✅ | #52 `838d128`+çatı#114 (migration YOK) | T1-A, T1-B3, T2-B(TH7), T3-A, T3-B ×5 |
| Motor kaydedilen ağırlığı okur (madde 87 ölü-yazma çözüldü) | md.9b/87 | ✅ | `scoring.ts` opsiyonel ağırlık (#52); DURAK-A: 0 tenant özel ağırlık | T1-A, T3-A ×2 |
| %60/%40 VARSAYILAN oranın PO onayı (eslesme-uyum `[ ]` boş) | (md.9 alt) | ❓ | `eslesme-uyum:75-82` boş `[ ]` | T2-E ×1. PO onayı |
| DISC 4×4 uyum matrisi (asimetrik, sabit-kodlu) PO onayına sunuldu | md.103 | ❓ | `scoring.ts:44-49` D:{D60,I75,S30,C85}… belgeyle BİREBİR; `[ ]` boş | T2-E ×1. PO onayı, SEVİYE-1 |
| Hard-gate toksik blok (D-mentör+S-menti veto, ANTI_MATCH); yönetici eşiği ≠ hard-gate | md.103/03:23 | ✅ (kod)/❓ (onay) | `scoring.ts:20-22 ANTI_MATCH_RULES`; `BLOCKED_PAIRS` | T1-B2(03:23), T2-E, T4-A2(:290) ×3. Onay `[ ]` boş |
| Tiebreak sırası D>I>S>C PO onayına sunuldu | (madde 103 akraba) | ❓ | `scoring.ts`/`discLetters.ts` eşitlikte D>I>S>C; `[ ]` boş | T2-E ×1 |
| Psikometrik gerekçe BELGELENMEMİŞ (matris/ağırlık/eşik ampirik kaynaksız, kod-içi "kalibre edilecek" itirafı) | md.103 | ❓ | `scoring.ts:44-49` sabit + `discLetters.ts` itiraf — ⭐KOD-TEYİT | T1-A, T2-E ×2. Ürün/bilim kararı (PO) |
| "Varsayılana düşen profil oranı" izleme metriği (psikometrik kör-nokta) | NUMARASIZ | ⬜ | grep BOŞ; madde 103'e akraba | T4-A2(:373) ×1. İZ YOK, NİYET belgelenmiş |
| madde 101 SJT/OCEAN katmanı canlı eşleştirmede OKUNMUYOR (bağlanmamış paralel) | md.101 | ⬜ | iki ayrı `rankMentorsForMenti`: `matching.ts:351`(DISC+sektör, OCEAN yok) ↔ `scoring.service.ts:165`(OCEAN'lı, ayrı tüketici) — ⭐KOD-TEYİT | T1-A, T2-B(hayalet:17), T2-E, T3-D ×4. NİYET: bağlansın mı bilinçli-ayrı mı = PO |
| madde 102 CORE-eşiği tutarsızlığı (adaptiveTestEngine sabit 5 ↔ questionService dinamik coreCount) | md.102 | ❓ | `adaptiveTestEngine.ts:22 MIN_CORE_RESPONSES=5` ↔ `questionService.ts:117 coreThreshold=coreCount` (ayrı tüketiciler) — ⭐KOD-TEYİT | T1-A, T2-E ×2. NİYET BELGELENMEMİŞ; FE tüketici haritası yok |
| Sektör skoru 5-bileşen servisi UYUYOR (`sector-scorer.service.ts` TAM kod, `matching.ts` çağırmıyor) | md.14 (İŞ7)/U1 | 🟡 | `sector-scorer.service.ts` VAR; `matching.ts` import YOK (grep boş) — ⭐KOD-TEYİT; canlı Jaccard/tag×0.6 kullanıyor | T1-A, T1-B2(03:38), T1-B3, T2-B(:52), T2-C(U1), T3-B, T4-A1(E23/E45) ×7. NİYET: isabetli sektör skoru. DURDU: staging şart |
| Eşleştirmeyi birleştir (iki paralel skorlama tek sisteme, staging'de) | md.15 (İŞ8) | 🔵/⬜ | =madde 101 ile ilişkili | T1-A, T1-B3, T3-B, T4-A1(E46) ×4 |
| Match DB'ye persist ediliyor (runtime skorlama değil) | NUMARASIZ (A15) | ✅ | `scoring.service.ts:137` (T1-B2 05:20) | T1-A(A15), T1-B2, T2-B ×3 |
| Eşleşme hesaplama tetikleyicisi (event-driven mi sayfa-açılınca mı) — karar yok | A14 / F5 | ❓ | `selfServeController.ts:245` AUTO_APPROVED yalnız tenant-tier | T1-A, T1-B2, T1-B3, T2-C(B.3-25), T2-D, T3-B, T4-A2 ×7. Keşif+PO |
| KARAR 6 otomatik onay (yönetici davetiyle gelen ONAYLI, dışardan Bekliyor) — tetik kodda yok | KARAR 6 / A14 | ❓ | InvitationTemplate var, tetik yok (`selfServeController.ts`) | T1-A, T1-B2, T1-B3, T2-C, T2-D, T3-B ×6. Keşif+PO |
| OCEAN adapter (disc-to-ocean) + arketip + SJT scorer psikometri motoru | NUMARASIZ | ✅ (kısmi) | `disc-to-ocean.adapter.ts`; SJT tarafı kısmen yarım | T1-B2(03:9), T2-B(:53), T2-C(1.D) ×3 |
| `isCertified` yalnız sertifika sınavıyla set (SJT ile bağlı değil) | NUMARASIZ | ✅ | `certification.service.ts:234,67` PASS_THRESHOLD=65 | T1-B2(03:44/49), T2-C(:48) ×2 |
| Progressive profiling + kademeli fallback (`{items:[],fallbackLevel}` throw etmez) | NUMARASIZ | ✅ | 🟢 [P0]; =deadlock guard | T1-B2(03:52) ×1 |

---

## GRUP 3 — STK-ADMİN PANEL

| kalem (tek cümle) | numara | durum | kanıt (dosya:satır) | geçtiği yerler |
|---|:---:|:---:|---|---|
| Sol menü 4-grup (Günlük/İnsanlar/Program&İçerik/Ayarlar) | md.8/KARAR 1/md.2 | ✅ | `(admin)/layout.tsx:25,34,42,52 NAV_GROUPS` (çatı#76) — ⭐KOD-TEYİT (karar-statu :99 🟥 BAYAT) | T1-A, T1-B2(ta), T1-B3(ÇELİŞKİ1), T2-B, T3-D(GH1), T4-A1 ×6 |
| Durum rozeti (Onaylı/Bekliyor/Pasif, yalnız yönetici, otomatik) | md.10/KARAR 3 | ✅ | `mentor-havuzu/page.tsx:25-27,101 APPROVAL_META` — ⭐KOD-TEYİT (karar-statu :101 🟥 BAYAT) | T1-A, T1-B2(ta), T1-B3(ÇELİŞKİ2), T3-D(GH2) ×4 |
| Sertifika rozeti kişi-geneli (herkes görür "✓ Sertifikalı") | md.11/KARAR 4 | ✅ | `mentor-havuzu/page.tsx:167-168 isCertified`+`TenantMembership.isCertified` (#40+#77) — ⭐KOD-TEYİT | T1-A, T1-B2(ta), T1-B3, T2-B, T3-D(GH3), T4-A1 ×6 |
| DISC çoklu harf "DI" (baskın+ikincil, yüzde gösterilmez; midline+istisna) | md.12/KARAR 11/1 | ✅ | `discLetters.ts:29 DISC_LETTER_CONFIG,:72 midline` (#47+#93+#94) — ⭐KOD-TEYİT (karar-statu :105 🟥 BAYAT) | T1-A, T1-B2(11:KARAR1/ta), T1-B3, T2-C, T3-D(GH4), T4-A3 ×6 |
| ⤷ KARAR 1 "çok yakın=BÜYÜK" kesin sayısal eşik kalibrasyonu | (md.12 alt) | ❓ | eşik ölçeğe bağlı, kod var eşik teyit | T1-B2(11:38) ×1 |
| Admin soru düzenleme UI (tenant-scoped IDOR) | md.32 | ✅ | `questions/page.tsx:256` (çatı#87) — ARADAN KAPANDI (E5 "buton yok" bayat) | T1-A, T2-C(E5), T3-D ×3 |
| Öğrenme-yolculuğu tamamlanma görünürlüğü (STK admin) | md.34 | ✅ | `adminController.ts:311-335` (#49+#102) — ARADAN (E7/C1 "yok" bayat) | T1-A, T2-C(E7/C1), T3-A, T4-A1(E42) ×4. NÜANS: T3-D kanıt-satırı ❓ istedi |
| Kurum "DÜZELTME İSTE" akışı (CORRECTION_REQUESTED, migration canlıda) | md.37 | ✅ | #50+#104 | T1-A, T3-A ×2 |
| 37m kurum mail gönderimini AÇMA (`TENANT_NOTIFICATIONS_ENABLED=false`) | md.37m | 🔴 | KOD DIŞI PO-manuel env; 08-20'den beri açık | T1-A, T3-A(S15), T3-B, T4-A2 ×4 |
| Kurum onay/ret maili + `destek@` + prod `PLATFORM_ADMIN_EMAIL` (altyapı hazır, bağlanmadı) | md.6/84 | 🟡 | kullanıcı maili ✅; kurum kısmı AÇIK (37m'e bağlı) | T1-A, T1-B2(05:53), T1-B3, T2-D, T3-A, T3-B, T4-A1(E41), T4-A2 ×8 |
| Havuz KART görünümü (rol-bazlı: yönetici DISC+durum / mentör→menti DISC+skor / menti→mentör SADECE skor) | md.31-akraba/KARAR 2 | ⬜ | backend %90 hazır; FE kart tasarlanacak | T1-B2(06:26/ta), T2-B(kart-havuz), T2-D(menti:98), T4-A1(E35) ×4 |
| "Neden uyumlu" Katman 1 (zengin ama ham-DISC ifşa etmeyen metin) | KARAR 7 | ⬜/✅ | mentör→menti gerekçe FE render #102 (`compatibilityReason`); menti-tarafı Katman-1 FE alan yok | T1-B2(ta:64), T1-B3(:104), T3-A ×3 |
| Manuel eşleştirme (sıfırdan çift oluşturma) — envanter "eksik" ↔ strateji "YASAK" ÇELİŞKİ | md.76 (T8)/Ç5 | ❓/⬜ | `stk-panel-envanteri:71,148`↔`stk-strateji:67`; kodda manuel-pair endpoint YOK (algoritmik) | T1-A(Ç5), T2-C(T8), T2-D(Ç), T3-D ×4. Açık PO kararı (K5-soru 8). HAKEM OLUNMADI |
| Pasif/takılan üyeye elle nudge/hatırlatma | NUMARASIZ | ✅ | `adminRoutes.ts:58 POST /users/:id/nudge`+`nudgeUser` (PASSIVE/DEAD_MATCH/GENERIC, 24s, audit) — HAYALET-TAMAM | T2-D(:52/72) ×1 |
| Otomatik nudge (sistem-tetikli dürtme) | md.24(v2) | 🔵 | KVKK/rıza; elle-nudge ✅ | T1-B3(:164), T2-D, T4-A1(E12) ×3 |
| Yöneticilik-verme akışı (A9) YENİDEN KURGU + "tüm onaylı liste" eksik (promote-admin max 3 var) | md.A9 | 🟡/⬜ | `admin/managers/page.tsx:66-124` promote var; tüm-liste eksik | T1-A(A9), T1-B2(05:54/08:31), T2-B(A9), T3-B(A3-c) ×4. PO'ya sorulacak sözü |
| Sertifika/etiket havuzu admin-yönetilir tablo yok (seed'de etiket var, talep-onay akışı) | KARAR 12/A9 | ⬜/❓ | seed↔tablo keşif; "hazır sistem etiketleri" seed'de bulunamadı | T1-A, T1-B2(ta:82), T1-B3(B12), T2-C(A9), T3-A, T3-B(#12) ×6. PO |
| Etiket ekleme yönetici doğrudan mı (öneri onayı mı) | md.C20 | ⬜/❓ | admin-11 KARAR 12 (havuz onaydan geçer); kod belirsiz | T1-B2(08:34), T2-B(C20) ×2 |
| Sertifika soru ekleme yönetici mi (bilinçli kısıt "kurum ekleyemez") + gerekçe belgesi zayıf | md.13-akraba/B13 | ✅/❓ | `certification` KODLU kısıt; "neden ekleyemez" gerekçe belgesi ❓ | T1-B2(08:32), T1-B3(B13), T2-B(C19) ×3 |
| STK-custom soru DISC'i etkilemez (STK_CUSTOM ayrımı doğru) + neredeyse kullanılmıyor (canlı 1) | B8a/E6 | ✅/❓ | doğru-çalışıyor; değer üretmiyor tut/kaldır PO | T1-B3(B8a), T2-C(E6) ×2. "canlı 1" DB-teyit |
| adminSettings farklı/zayıf desen (izole-denetim önerisi) | NUMARASIZ | ⬜ | `adminSettingsController.ts:83` controller-içi manuel tenantId | T2-D(:76) ×1 |
| Şifre göster/gizle (login+register+reset PasswordField) | B1/md.1 | ✅ | #62 — ARADAN KAPANDI | T1-B3(B1), T4-A3 ×2 |
| CORE/DEEPENING İngilizce→Türkçeleştir (görünüm-etiketi, enum DB'de EN kalır) | B9/md.9-STK/C18 | ✅ | #62 TYPE_LABELS Temel/Derinleştirme | T1-B3(B9), T2-B(C18), T3-B(#9) ×3 |
| Sektör kolonu havuzda "—" (backend select var, VERİ boş) | B3/md.21(v2)/KARAR 10 | 🔵 | veri-girişi boşluğu; canlı-sonrası | T1-B3(B3), T3-B(#3) ×2 |

---

## GRUP 4 — PLATFORM PANEL

| kalem (tek cümle) | numara | durum | kanıt (dosya:satır) | geçtiği yerler |
|---|:---:|:---:|---|---|
| Platform admin paneli B-kapsam (KpiCards/MembersTable/MeetingsTable/DiscSummary) + ayrı auth katmanı | NUMARASIZ | ✅ | `platformAuth.ts:27` (backend#26+FE#29) | T1-B2(05:6), T2-D, T4-A2(:19) ×3 |
| Platform drill-down FE (kurum→üye, 4 endpoint mask+audit) | F2 | ✅ | `platform/tenants/[id]/page.tsx:82-133` render — HAYALET-TAMAM ("frontend YOK" bayat) | T1-B3(F2), T2-D(:24), T3-D(GH8) ×3 |
| KPI drill-down (sayıdan kişiye, health-metrics) | F7 | ✅ | `getHealthMetrics`+`admin/kpi/page.tsx:81` — HAYALET-TAMAM | T1-B3(F7), T2-D(:46), T3-D(GH8) ×3 |
| Platform tek-kullanıcı profil drill-down endpoint yok (`/tenants/:id/users/:userId`) | md.77 (T9) | ⬜/🟡 | `platform.ts` üye-listesi var, tek-kişi yok; `MembersTable` tıklanamaz | T1-A, T2-C(T9), T2-D(:91) ×3. DURUŞ SEBEBİ YOK |
| Tenant DELETE yok (yalnız freeze) → KVKK Md.7 tenant hard-delete | md.16(v2)/F3 | ⬜ | `platformRoutes.ts:50-54` freeze var, DELETE yok | T1-B3(F3), T2-C(B.4-16), T2-D(:83), T4-A1 ×4. GERİ-ALINAMAZ, PO. NOT: kullanıcı-anonimleştirme ✅ ama TENANT ayrı |
| Mükerrer platform API konsolidasyon (super-admin router + system-logs) | md.74 (T6)/A1 | ❓ | `server.ts:12,105` superAdminRoutes mount, FE 0; `/platform/*` ikame etti | T1-A, T2-C(T6), T1-B3(A1), T4-A1(E28/E30) ×4. PO |
| `setVisibilityOptIn` Taraf-1 (super-admin) sil/bağla/ertele | md.86/A20 | ❓ | kasıtlı korundu, davranışsal-testli | T1-B3(A1), T2-C, T4-A1(E28) ×3. PO |
| Otomatik anomali/kötüye-kullanım tespiti (v1 var, v2 derinleştirme) | NUMARASIZ | 🟡 | `abuseDetection.service.ts:26-67` v1 basit; alarm-banner yarım | T2-D(:23), T4-A2 ×2 |
| Platform büyüme trendi + platform-geneli lastLoginAt aktiflik (ivme/oran) | Y7 | 🟡/🔴 | `getPlatformStats` tarih-filtresi yok; anlık sayı var | T2-D(:21/Y7), T4-A1 ×2 |
| Platform seviyesi ayarlar UI yok (config env-sabit) | Y7 | 🔴 | B.4 D-18 | T2-D ×1. Düşük öncelik (platform=PO) |
| Sistem sağlığı mail-göstergesi kartı (env-config, gerçek-probe değil) | NUMARASIZ | 🟡 | `getPlatformHealth` mail probe eksik | T2-D(:22/B) ×1. DURUŞ SEBEBİ YOK |
| `reviewedBy='platform-admin'` sabit metin → çoklu-admin gerçek kimlik | NUMARASIZ | ⬜ | arşiv:175/480 | T4-A1(E9) ×1. 🕸️ tek-admin varsayımı |
| user-reports listesi 200-tavan, sayfalama yok | NUMARASIZ | ⬜ | arşiv:175/481; genel md.48'e girebilir | T4-A1(E10) ×1. 🌱 |
| `PLATFORM_ADMIN_EMAIL` `.env.example`'da yok (prod default riski) | NUMARASIZ | ⬜ | platform-envanteri :106 | T2-D ×1. Config eksik |
| lastLoginAt/lastActiveAt User modelinde (retention temeli) | md.4-STK | ✅ | migration `20260805..._add_user_last_login_at`+`activityService.ts` — HAYALET-TAMAM ("HİÇ YOK EN KRİTİK" bayat) | T2-D(:112), T4-A1(E11), T3-D ×3 |
| Görüşme/mentörsüz-menti/ölü-eşleşme metrikleri (aggregate/JOIN) | NUMARASIZ | ✅ | `computeHealthMetrics` — HAYALET-TAMAM | T2-D(:118) ×1 |
| Hayalet-mod PENDING havuzda görünmez | NUMARASIZ | ✅ | PR#31 `be295e2`; `listusers-approval-filter.test.ts` | T2-D(:82), T2-B ×2 |

---

## GRUP 5 — RETENTION / PERSONA / SEVDİRME

| kalem (tek cümle) | numara | durum | kanıt (dosya:satır) | geçtiği yerler |
|---|:---:|:---:|---|---|
| Menti "bekleme anı" deneyimi (mentör kıtlığında sessizce kaybolmasın; öğrenme+DISC-derinleşme+umut sinyali) | Y1 | ⬜ | LearningJourneyCard bekleme-ekranına konumlandırılmamış (`menti/page.tsx` yalnız `!needsDiscTest`) | T1-A(Y1), T2-C(B.1 m6-8), T2-D(menti:62-83), T4-A2(:237) ×4. DURUŞ SEBEBİ YOK |
| Umut sinyali/sosyal-kanıt ("12 kişi bekliyor, mentörler geliyor") — statik mesaj | Y1 | ⬜ | `menti/page.tsx:172-191` öz-grep boş | T2-C(B.1 m8), T2-D ×2 |
| Menti P1 DISC ÖZGÜVEN AŞISI sunumu ("değerlisin") | NUMARASIZ | ⬜ | menti-yönü özel sunum ⬜ | T2-D(menti:80) ×1. DURUŞ SEBEBİ YOK |
| Reddi yumuşat (mentör "hayır" → "dolu, işte 3 alternatif") + küçük başarı kutlaması | Y2 | ⬜ | mentör→menti ret akışı yok; konfeti yalnız DISC-aha | T1-A(Y2), T2-C(B.1 m10/m11), T2-D(menti:88-94) ×3. DURUŞ SEBEBİ YOK |
| Mentör emeği görünür kıl (takdir/rozet çeşitliliği: "5 görüşme"/"yılın mentörü"/"12 saat") | md.78 (T10)/Y5-akraba | ⬜ | `certification/page.tsx:178` tek sertifika rozeti; "toplam saat"/rozet-çeşit yok | T1-A(md.78), T2-C(T10/mn8), T2-D(mentör:83), T4-A2(:36) ×4. PO |
| Mentör kapasite sınırı (kaç menti) | Y5 | ⬜ | yalnız `Tenant.maxMeetingsPerWeek` (tenant-bazlı); mentör-bazlı alan yok | T1-A(Y5), T2-C(B.2 mn11) ×2. PO, canlı-sonrası |
| Mentör "kendi etkim" yuvası (etki istatistiği + takdir) | md.78 | 🟡 | `mentorMetricsController.ts:26-54` NPS var, "toplam saat" yok | T2-C(mn6), T2-D(mentör:90-101) ×2 |
| Mentör sektör filtresi (kendi alanından menti) — filtre var ama minCompatibilityScore/blockedDisc, sektör değil | NUMARASIZ | 🟡 | `mentorFilterController.ts` | T2-C(mn12/mn3-14) ×1. Öneri S |
| Yönetici rapor EXPORT (PDF/Excel/CSV) + oran (onboarding/DISC-tamamlama) | Y3 | ⬜ | öz-grep 0 dosya; "sponsora sun" kanıtı yok | T1-A(Y3), T2-C(B.3 S3-14), T2-D(yönetici:83) ×3. Kritik canlı-öncesi (Persona B/C) |
| Proaktif kırmızı uyarı (panel "15 menti bekliyor" → harekete geçir, nötr sayı değil) | Y4 | 🟡/⬜ | `pairSignal.service.ts` GREEN/YELLOW/RED var; eşik-tabanlı alarm/ivme-oku yok | T1-A(Y4), T2-C(B.3-16/17), T2-D(strateji:44) ×3. DURUŞ SEBEBİ YOK |
| STK aktif-üye ORAN/görüşme-ivme/haftalık-trend zaman-serisi (S1/S3) | Y3/Y7 | 🟡 | `retentionMetrics.service.ts` pasif var; oran/ivme/trend KPI kartı yok | T2-C(B.3 S1/S3), T2-D(yönetici:70) ×2 |
| Çift-aha modeli / yönetici-önizleme-demo ("davet-etmeden sistem böyle eşleştiriyor") | A13 | ⬜ | grep: yönetici-önizleme-demo ekranı yok | T1-A(A13), T1-B3(:103), T2-D(strateji:82), T4-A2(:104/151) ×4. Teyit, KODLANMADI |
| STK "iki-aha modeli" (önizleme aha + gerçek aha) — wizard var, canlı-veri-aha tam değil | A13 | ❓ | onboarding wizard var | T1-A(A13), T1-B3, T3-B(C-5) ×3 |
| Bekleme salonu bildirim izni (`Notification.requestPermission`) — "en kritik" UX | NUMARASIZ | ⬜ | grep 0 dosya — ⭐KOD-TEYİT (T3-B) | T1-B3(:101), T2-C(A7), T3-B(C-3), T4-A2(:168) ×4. NİYET: bekleme retention |
| Onboarding şablon-seçim ekranı ("Mezun/Gönüllü/Kulüp") — "terk-oranını en-çok-düşüren ekran" | NUMARASIZ | ⬜ | grep: şablon-seçim ekranı yok | T4-A2(:132) ×1. DURUŞ SEBEBİ YOK, 🌱 |
| Menti/mentör tarafı retention "sevdirme" deneyimi (persona-temelli, onboarding-aha) — yalnız yönetici dilimi yapıldı | NUMARASIZ | ⬜ | STK-yönetici ✅; menti/mentör sevdirme izi yok | T4-A1(E36), T2-D(persona) ×2. 🌱 |
| Kurumlar-arası "sosyal kanıt" duvarı + paylaşılabilir kurum "Etki kartı" (B2B2C viral) | NUMARASIZ | ⬜ | grep: kamuya-açık kurum-duvarı/etki-kartı FE yok | T4-A2(:28) ×1. 🌱 |
| Mentör/menti-kaynaklı "ters çekim" bottom-up büyüme kanalı | NUMARASIZ | ⬜ | multi-tenant altyapı hazır, kanala çevrilmedi | T4-A2(:30) ×1. 🌱 |
| DISC sonuç paylaşım kartı (LinkedIn/WhatsApp, tüm rollere) | NUMARASIZ | ✅ | `ResultStep.tsx:16-51` rol-gate yok | T2-C(mn3), T4-A2(:230) ×2 |
| "Görüşme tamamladım 🎉" paylaşım kartı (DISC-kartından ayrı) | NUMARASIZ | 🟡 | DISC-kart var; görüşme-paylaşım kartı grep yok | T4-A2(:39) ×1. 🌱 |
| Kullanıcı→ürün geri bildirim mekanizması (her sayfa "Bildir"→mail; suspicion mail GÖNDERMİYOR) | E24 (teshis) | ⬜ | `SuspicionReport` DB'ye yazar, mail atmaz | T1-B2(05:55), T2-B(E24), T3-D(E1), T4-A1(E21) ×4. NİYET belgelenmiş |
| Mentör bildirim ritmi (seyrek+anlamlı, her biri sebep taşısın) | NUMARASIZ | ⬜ | push stub | T2-D(mentör:79) ×1. Bilinçli ileride |

---

## GRUP 6 — İÇERİK / SORU

| kalem (tek cümle) | numara | durum | kanıt (dosya:satır) | geçtiği yerler |
|---|:---:|:---:|---|---|
| DISC 32 soru (20 CORE + 12 DEEPENING) — belge "20" bayatı çözüldü, KOD 32 | Ç3 | ✅ (döküm) | `seed.ts` grep=49 giriş (CORE/DEEP/SJT); kod 32 üretir | T1-A(Ç3), T1-B2, T2-C, T2-E ×4 |
| ⤷ DISC canlı soru sayısı (kod 32 ↔ canlı ~20) — DB teyit | Ç3-canlı | ❓ | DB'ye sorulmadı (kural) | T1-A, T2-E, T4-A2, T4-A3 ×4. Canlı-teyit kuyruğu |
| SJT 3 soru (2 CORE + 1 FOLLOWUP) — belge "4" YANLIŞ, KOD 3 | Ç4/BÇ1 | ✅ (döküm) | `seed.ts:530 SJT_QUESTIONS=3` — ⭐KOD-TEYİT | T1-A(Ç4), T1-B2(BÇ1), T2-C, T2-E ×4 |
| ⤷ SJT içerik 3→4 genişletme mi belge-düzelt mi | md.33-akraba | ⬜ | PO kararı | T1-A, T2-C(E4), T2-E ×3 |
| Sertifika kod 20 senaryo ↔ canlı ~5 (seed↔canlı tutarsızlığı) + güvenli seed | md.30 | ⬜ | `seed-certification.ts` 20 idempotent upsert; canlı ~5 DB-teyit | T1-A, T2-C(E2), T2-E, T3-B(#13), T4-A3 ×5. Canlı DB→PO |
| Güvenli sertifika seed runner yok (madde 30'u bloklar) | md.73 (T5) | ⬜ | `package.json`'da `seed-certification` referansı YOK (grep) — ⭐KOD-TEYİT | T1-A, T2-C(T5), T2-E ×3 |
| DISC-tipine-özel "mentiye yaklaşım" içeriği YOK (sıfırdan; EN BÜYÜK BOŞLUK) — 3 seçenek | md.31 / A1 | ⬜ | grep+3-ajan negatif; `coachingSuggestions.ts` yöneticiye — ⭐KOD-TEYİT | T1-A(md.31/A1), T1-B2, T2-C(E1/A6), T2-E, T4-A3 ×5. PO biçim kararı |
| DISC-DERİNLEŞME kurgusu (kademeli karakter netleşmesi + karşıya-yaklaşım; ~%50-60 zemin) | A1 | 🔵/🟡 | adaptif motor VAR (`adaptiveTestEngine.ts`), DEEPENING discVector yazar; aksiyon+UX+sınır eksik | T1-A(A1), T2-E(§10), T3-D ×3. PO tasarım (#1/#2/#3) |
| ⤷ "Sınırsız-yeniden-derinleşme davranışı" karara bağlanmalı (her sefer discVector değişir) | A3 | ❓ | — | T1-A(A3) ×1 |
| PO TÜM soruları görmek istiyor → beğendiğini ayıracak (68 soru inceleme belgesi HAZIR, `[ ]` BOŞ) | A2/A4 | ⬜ | `sorular-po-inceleme:14-404` 68 boş `[ ] PO notu` | T1-A(A2/A4), T2-E ×2. En büyük bekleyen PO-işi |
| 17 eşleştirme PO-onay noktası (16 komb.+anti-match+tiebreak+%60-40+genel) `[ ]` BOŞ | (md.103 çıktısı) | ❓ | `eslesme-uyum` tüm `[ ]` boş — 5 yeni PO-onay kalemi | T2-E ×1. PO onayı |
| İçerik & Soru Felsefesi Keşfi (tüm soruların içerik+felsefe+puanlama) | A4 | ⬜ | kısmen 2026-08-26 yapıldı | T1-A(A4), T2-E, T3-A ×3 |
| Kurum-özel soru cevap-tipi (şıklı/açık-uçlu) — answerType şema alanı yok, migration | md.13 / B8b | ⬜ | ⏸️ERTELENDİ; `seed`/schema answerType yok, Likert sabit — ⭐KOD-TEYİT | T1-A, T1-B3(B8b), T2-C(A4), T2-E, T3-B(#10) ×5. Kapsam belirsiz→PO |
| İçerik felsefesi gözlemleri (reverse-kod yok, sosyal-beğenilirlik, tek-persona, outcome tutarsız) | NUMARASIZ | ⬜ | KOD DIŞI içerik kalite; PO sorusu #8 | T2-E(§7/§11) ×1 |
| Yazım hataları (I9/D9 "güçlüğüm"→"güçlü yanım", C20/D20, SJT1 "Menteen"→"Menti'n") | NUMARASIZ | ⬜ | KOD DIŞI içerik metni; düşük efor | T2-E ×1 |
| Global içerik seed ana Neon'a uygula (DISC+LearningJourney "boş" görünüyor = seed eksik) | NUMARASIZ/Y6 | ⬜ | admin-panelleri :10-18/:86; canlı=lokal Neon→PO onaylı seed | T2-B(:10/:86), T4-A2(:58), T4-A1(A8) ×3 |
| Öğrenme yolculuğu puanlama YOK (bilinçli tasarım); 13 aşama seed'li; ADMIN görür (aradan) | NUMARASIZ | ✅ | `learningJourney.service.ts` seed'li | T1-B2(05:31), T2-B, T2-C ×3 |
| Öğrenme yolculuğu kalan uçları (DISC ton + STK düzenleme + içerik onayı + uçtan uca test) | A15 | ❓ | kod MERGED, uçlar açık | T1-A(A15), T1-B2, T3-B(C-7), T4-A1(E42) ×4 |
| 6 canlı-teyit kuyruğu (DISC/sertifika/SJT/LearningStage/kurum-özel canlı sayı + FE-progress haritası) | NUMARASIZ/Y6 | ⬜ | DB'ye sorulmadı (kural) — altyapı-kontrol turu | T2-E, T3-A(S10), T4-A2 ×3 |

---

## GRUP 7 — BELGE-HİJYEN / ÇALIŞMA-TARZI

| kalem (tek cümle) | numara | durum | kanıt (dosya:satır) | geçtiği yerler |
|---|:---:|:---:|---|---|
| CLAUDE.md:81 "eu-west-2/**İrlanda**" bayat (sunucu Londra/BK) | NUMARASIZ | 🗑️ | =madde 92/Ç6; env-notu düzeltilmemiş — ⭐KOD-TEYİT (eu-west-2=Londra) | T3-C(B1), T3-B(01:51) ×2. Silme yok, ⚠️GÜNCELLEME notu |
| backend/CLAUDE.md "Five models" ↔ kod 38 model | NUMARASIZ | 🗑️ | `schema.prisma` `^model `=38 — ⭐KOD-TEYİT | T3-C(B3) ×1. Onboarding snapshot bayat |
| backend/CLAUDE.md `iceBreaker.ts` core-modül tablosunda mevcut-dosya (silinmiş) | NUMARASIZ | 🗑️ | `iceBreaker.ts` DOSYASI YOK | T3-C(B4), T2-B, T2-C ×3 |
| backend/CLAUDE.md "LLM yalnız ice-breaker" ↔ "LLM removed" (içsel çelişki) | NUMARASIZ | 🗑️ | backend:7 ↔ backend:62 aynı belge | T3-C(B6) ×1 |
| backend/CLAUDE.md `matchReason.ts`+`iceBreaker.ts` LLM kuralı (iki dosya da YOK) | NUMARASIZ | 🗑️ | ikisi de YOK; `llmRetry.ts:4` yorumda anılıyor | T3-C(B5) ×1 |
| backend/CLAUDE.md `llmRateLimiter` middleware "var" (kodda karşılıksız) | NUMARASIZ | ❓ | grep BOŞ — silinmiş/adı-değişmiş adayı | T3-C(B7) ×1 |
| CLAUDE.md:232 `registerMessages.ts` merkezi mesaj dosyası (kodda karşılıksız) | NUMARASIZ | ❓ | grep BOŞ; "kod-bazlı resolver" alternatifi olabilir | T3-C(B8) ×1 |
| Belge güvenli-seed listesi düzeltmesi (seed-questions.ts silindi #45; güvenli=cert/lj/test-tenant.mjs) | NUMARASIZ | ✅ | CLAUDE.md:75-78 GÜNCELLEME kodla TAM örtüşür (`seed.ts:300` deleteMany) — ⭐KOD-TEYİT | T3-C, T3-B, T4-A2(:95) ×3 |
| Bayat gövde satırları belge-içi (03:47 SJT-4, 08:13 sunucu-?, dm:111 maxMeetings, 05:27 timezone, 04:34 IDOR) | NUMARASIZ | 🗑️ | belge-içi ⚠️ not düzeltmiş, gövde kalmış (BH1-BH5) | T1-B2(BH1-5), T2-C(:55/:57/:59) ×2 |
| platform-strateji :106 "AdminAuditLog tablosu" gövde bayat (SystemLog'a AUDIT) | NUMARASIZ | 🗑️ | belge-içi ⚠️ notu var | T2-D(:60), T1-B3, T2-B(:168) ×3 |
| 09-DURUM belge-içi çelişki blokları (chat 3-durum/VisibilityOptIn 2-durum/4-rol/platform-tema) | NUMARASIZ | 🗑️ | eski bloklar silinmemiş; PO kararı (arşive taşı) | T1-B3(belge-denetimi :59), T3-D ×2 |
| durum-panosu-2026-08-14 🔄 ama 12+ gün donmuş → 📸'ye düşür + 2 tarihli-ad tarihsizleştir | A11 | 🟡 | `durum-panosu:3` DOĞRULANDI; K5-soru 9, PO kararı | T1-A(A11), T1-B3, T3-A(S4) ×3 |
| OneDrive senkron riski → repoyu `C:\dev\`'e taşı (`.git` senkron+disk) | A10 | 🟡 | 08-26b disk açıldı ama OneDrive TAŞIMA yapılmadı; PO kararı | T1-A(A10), T3-A(S5), T3-D ×3 |
| icerik/ 6 belge KÖKTEN BAYAT (silinmiş seed-questions.ts'e dayanır, "20 DISC") | NUMARASIZ | 🗑️/⬜ | ⚠️GÜNCELLEME notu gerek | T2-C(:64), T2-E(SAYILMADI) ×2. Belge-hijyen |
| PROJECT_STATUS.md DEPRECATED → arşivle + 09-DURUM'a yönlendir | NUMARASIZ | ⬜ | 9 Ağu'dan eski; CLAUDE.md hâlâ işaret ediyor | T2-B(:207) ×1. Belge-hijyen |
| INDEX eksik (raporlar/arsiv büyük ölçüde INDEX'te yok, Kural 5) + üst-etiket eksik ~29 belge | NUMARASIZ | ⬜ | belge-mimarisi :210-215; A5 reorg kapsamı | T2-B(:210), T1-B3(:106/:125) ×2. S2 belge-hijyen |
| Belge düzeni reorg (kararlar/+raporlar/ alt-klasör, 38 referans) — 5 canonical taşıyıcı ad TAŞINMADI | A5 | 🟡 | 2026-08-23 kısmi (git mv); taşıyıcı 5 ad yerinde | T1-A(A5), T1-B2(bdr), T3-A(:107) ×3 |
| BELGE YENİDEN YAPILANDIRMA turu (~68 belge, isim/klasör/arşiv/referans/sadeleştirme) | A5 | ⬜ | kısmen; bu bilanço turu onun parçası | T1-A(A5) ×1 |
| Submodule pointer bump dansı önleme kuralı — CLAUDE.md'ye işlendi (Taslak A) | NUMARASIZ | ✅ | CLAUDE.md "Merge sonrası pointer bump — DANS ÖNLEME" | T2-B(:282), T3-C ×2 |
| Docs çakışma serileştirme kuralı — CLAUDE.md'ye işlendi (Taslak B) | NUMARASIZ | ✅ | CLAUDE.md "Docs çakışması önleme — SERİLEŞTİR" | T2-B(:314), T3-C ×2 |
| `admin-panelleri-tasarim-2026-08-02` GÜÇLÜ ARŞİV ADAYI (6 panel uygulandı) | NUMARASIZ | ⬜ | belge-mimarisi :156; A5, PO-arşiv | T2-B, T2-C(E.4) ×2 |
| Kişi-adı yasağı: mevcut belgelerdeki isimler AYRI temizlik işinde (yeni-içerik kuralı yürürlükte) | NUMARASIZ | ⬜ | CLAUDE.md:109-110; ayrı-tur bekliyor | T3-C ×1 |
| Model tercihi 07 "Sonnet yeterli" ↔ CLAUDE.md Sonnet/Opus ayrımı (yumuşak çelişki, düşük) | BÇ5/E12 | ❓ | 07:40 ↔ CLAUDE.md | T1-B2(BÇ5), T3-D(E12) ×2 |
| Çalışma-tarzı/güvenlik kuralları CLAUDE.md'de canonical (8-unsur/DevSecOps/3-kırmızı-kural/belge-senkron/karar-takip) | NUMARASIZ | 📌 | KOD DIŞI yürürlükteki kural (72 kalem T3-C'de) | T3-C, T3-B(01/06), T4-A2, T4-A3 ×4 |

---

## GRUP 8 — ALTYAPI / PO-MANUEL

| kalem (tek cümle) | numara | durum | kanıt (dosya:satır) | geçtiği yerler |
|---|:---:|:---:|---|---|
| Dokploy foto volume (`/app/uploads` kalıcı + uid 1001 chown + redeploy-sonrası test) — merge ÖNCESİ ŞART | A22 (foto-volume) | ⬜ | `config.ts:94`,`server.ts:68,140`; docker-compose'da uploads volume YOK — kod gerçeği | T1-A(A22), T1-B1(6 kalem), T3-A(S-manuel), T3-B(B-2), T4-A1(E4) ×5. PO-manuel kritik |
| `UPLOAD_DIR=/app/uploads` env + `BACKEND_URL`/`NEXT_PUBLIC_API_URL` teyit | NUMARASIZ | ⬜/❓ | `config.upload.dir` okur | T1-B1 ×1. PO-manuel |
| Chat uçtan uca canlı test (thread/çan/okundu/mail) | A22 | ⬜ | PO gözlem | T1-A(A22), T3-B(B-1), T4-A1(E1) ×3. PO-manuel |
| Mentör paneli metriklerini canlıda gözle görme | A22 | ⬜ | PO gözlem | T1-A(A22), T3-B(B-3) ×2. PO-manuel |
| Repoları PRIVATE yapma | A22/H3 | ✅ | 2026-08-25 PO yaptı (`KARAR-TAKIP:149`) — ARADAN KAPANDI ("yap" bayat) | T1-A(A22/H3), T1-B3, T3-A, T3-B(B-4), T4-A1(E6), T4-A2(:78) ×6 |
| `backend/.env.backup-anaDB` sil (env geçişi bitince) | NUMARASIZ | ⬜ | dosya HÂLÂ VAR (`ls` mevcut) — ⭐KOD-TEYİT | T2-B(depo:25) ×1. PO/env-geçiş |
| `Menti Mentör proje/` belirsiz kök klasör | NUMARASIZ | ✅ | klasör ARTIK YOK (`ls` GONE) — ARADAN temizlendi | T2-B(depo:18) ×1 |
| Ortam temizliği (merge olmuş worktree/branch/temp-script sil) | md.28(v2) | ⬜ | 08-26b 91-yerel+93-uzak dal silindi; git-teyidi kısmi | T1-B3(İŞ1), T3-B(C-11), T4-A2(:69) ×3. v2 |
| Staging ortamı (`staging.sivilkapasite.org`+ayrı Neon branch+Dokploy 2.app+`.env.compose.staging`) | md.27(v2) | ⬜ | `*staging*` dosya YOK (grep) — ⭐KOD-TEYİT; İŞ7/8'in ön-koşulu | T1-B3(İŞ5), T3-B(C-12), T4-A1(E43) ×3. v2 |
| İzole test DB (`TEST_DATABASE_URL` + Neon test branch) — guard var, izole branch PO adımı | md.İŞ2 | 🟡 | `.env.test` VAR + `assertTestDatabase.ts` guard; kalıcı TEST_DATABASE_URL PO-elinde | T1-B3(İŞ2), T4-A1(E40), T4-A2(:75) ×3 |
| Neon pool + senkron mail cron (connection_limit yok, seri await) — canlı-sonrası | NUMARASIZ | ❓ | `02:48-49`; staging load-test | T1-B2, T2-B(kapasite:19) ×2 |
| Eşleştirme cache yok + `take:500` sabit (O(n) skorlama) — canlı-sonrası | NUMARASIZ | ⬜ | kapasite :26-31 | T2-B ×1 |
| Rate limiter in-memory → çok-instance'ta Redis (generalRateLimiter tenant-key public'te zayıf) | md.02:50/E2 | ⬜ | `rateLimiter.ts:35 generalRateLimiter` | T1-B2(02:50), T2-B(:36), T3-D(E2) ×3 |
| in-process node-cron çok-instance duplication riski (staging tek-instance/lock) | NUMARASIZ | ⬜ | kapasite :38; staging | T2-B ×1 |
| `listUsers` sayfalama (canlı-öncesi) | NUMARASIZ | ✅ | `userController.ts:38,64,99-100,116` pageSize/skip/take — ARADAN | T2-B(kapasite:12/TH1) ×1 |
| N+1 konuşma listesi + pagination'sız listeler | md.48 | ⬜ | `conversationController.ts:236` | T1-A(md.48), T2-C(:113) ×2 |
| String→enum (UserReport/InvitationTemplate/Tenant/MeetingCheckIn/MentorshipAgreement) + çift-rol User.role↔Membership | md.49 | ⬜/❓ | `schema.prisma`; CLAUDE.md "Membership.role esas" | T1-A(md.49), T2-C(:119/:122) ×2 |
| onDelete stratejisi tanımsız (çoğu FK RESTRICT); staleDraftCleanup dolu tenant silemiyor | md.49-akraba | ⬜ | schema geneli; tenant hard-delete ile ilişkili | T2-C(:106/:110) ×1 |
| `User.email` global unique (multi-tenant çakışma?) + Meeting index eksik (düşük) | NUMARASIZ | ❓ | kasıtlı global-user olabilir | T2-C(:126) ×1 |
| B10 sekme-geçiş yavaşlık (useApiClient stable ref) / cache turu | E17/B10 | ❓/⬜ | teshis :29; düzeldi mi teyit yok | T2-B(B10), T4-A1(E17) ×2. DURUŞ SEBEBİ YOK |
| B12 sol-alt kullanıcı kartı/dropdown | B12 | ❓ | eklendi mi teyit yok | T2-B(B12) ×1. DURUŞ SEBEBİ YOK |
| C17 sayfa metinleri merkezileştirme (dağınık inline string) | md.47/C17 | ⬜ | UNUTULDU; madde 47 içinde | T1-B3, T2-B(C17), T3-D(E5) ×3 |
| Temiz-kod borcu: Zod validate() middleware (~85 kopya/30 dosya) + cookie helper duplike + PII-select 11+ yer | md.47 | ⬜ | `authController.ts:54-103`↔`selfServeController.ts:12-36` | T1-A(md.47), T2-C(:153/:154/:157) ×2 |
| Kesin-ölü kod sil (llmRetry/TenantContext-ikiz/MeetingScheduler 231-satır) — PO onayı | md.44 | ⬜ | `matchingController`/`schema`; ölü-kod ilkesi | T1-A(md.44), T2-C(:173), T2-B ×3. PO |
| Kullanılmayan 5 `@radix-ui/*` paketi (0 import) | md.46 | ⬜ | build yeşil kalmalı (doğrulanmalı) | T1-A(md.46), T2-C(:187) ×2 |
| a11y noktasal (ReportUserButton modal + soru-formu label + DailyQuestionWidget radiogroup) | md.50 | ⬜ | `ReportUserButton.tsx:57-61`, `questions/page.tsx:133-166` | T1-A(md.50), T2-C(:135-139) ×2 |
| DISC renk WCAG FAIL light (D22 5 dosya ~7 renk 600/700) + D23 platform rozet light varyant | md.64/D22/D23 | ⬜ | `06:17/18`; a11y borcu | T1-B2(06:17), T2-B(D22/D23), T4-A1(E22), T4-A2(:73) ×4 |
| SEO teknik (favicon/OG/metadataBase/sitemap/robots/lang tr-TR) | md.51-55 | ⬜ | — | T1-A ×1 |
| `www`→çıplak-host 301 (SEO-kanonik, `middleware.ts` yok) — KRİTİK | md.66 | 🔴 | `frontend/src/middleware.ts` YOK (K6 ile aynı dosya) | T1-A(md.66) ×1 |
| GTM+GA4+Clarity+GSC KISMİ (kod var, merge/deploy yok; #110 kilitli) | md.56 | ⬜ | grep boş (analytics kodda yok); #110 "MERGE ETME" | T1-A(md.56), T2-C(:32), T3-A ×3. KVKK bağlı |
| 🍪 Çerez-izni bandı (Consent Mode v2) — analytics ön-koşulu | md.67 | ⬜ | `10-yol:146`; en yüksek madde=67 | T1-A(md.67), T2-C(:71) ×2. S1 KVKK |
| Çıkışta Google Analytics olsun mu (EVET→#67+#56 K0'a yükselir; #110 buna bağlı) | A19 | ❓ | açık PO kararı | T1-A(A19), T3-D ×2 |
| GTM+GA4 EN SON kontrol edilecek (canlı deploy sonrası) | A12 | ⏸️ | ertelendi (PO) | T1-A(A12) ×1 |
| Kurumsal sayfalar/footer/nav/scroll-top/WhatsApp/JSON-LD/semantik | md.57-63 | ⬜ | — | T1-A ×1 |
| WCAG 2.1 AA denetimi | md.64 | ⬜ | — | T1-A ×1 |
| Landing UX paketi (tooltip/hover-köprü/link-tıklanamıyor/"i"-ikonu/sıfır-etikette-skor ÇELİŞKİ/mobil) + AlgorithmBento mantık-hatası | md.22(v2) | ⬜ | grep AlgorithmBento var; sıfır-skor mantık-hatası (PO "öncelikli") İZ ZAYIF | T1-B2(06:24), T2-B(tema), T4-A2(:72), T3-D ×4 |
| Landing dark/light seçilebilir (~256 hardcoded nokta/~1.5 gün) — canlı-sonrasına ertelendi | md.22(v2) | ⬜ | 9 dosya ~256 nokta | T1-B2(06:7), T2-B(tema:29), T4-A1 ×3 |
| Landing slogan değişikliği (yeni H1 "Mentörlük programınızı… zahmetsizce" + alt-metin) — karar var kod yok | F4/md.22 | ⬜ | page.tsx eski (`belge-aksiyon :88`) | T1-B2(06:22), T1-B3(F4), T4-A2(:29) ×3 |
| Yumuşak lacivert landing tema yönelişi — karar var kod yok (UNUTULDU) | E4/md.65 | ⬜ | roadmap'te net değil | T1-B3(belge-aksiyon:91), T3-D(E4), T4-A2(:34) ×3 |
| Tema toggle altyapısı (ThemeProvider/localStorage/.dark/FOUC) çalışıyor | md.5 | ✅ | PR#32 | T1-B2(06:6), T2-B(tema:9) ×2 |
| Fotoğraf upload (client-side multer + magic-byte) + avatarUrl havuz select'lerinde | F1 | ✅ | `avatarController.ts`+`middleware/avatarUpload.ts`; `userController.ts:95,157,472 avatarUrl:true` — ARADAN | T1-B3(F1), T2-B(kart-havuz:102/TH2/TH3), T4-A1 ×3 |
| Fotoğraf ZORUNLU kılma kararı (upload backend ✅, zorunluluk tarihi belirsiz) | NUMARASIZ | 🟡 | mentor-karti PO-karar-6 | T1-B2(06:39), T2-B(kart-havuz:120), T3-B(A3-d) ×3. PO |
| Logout UI'a bağlı (B11) | B11 | ✅ | `DashboardNav.tsx:30,39 logout()+await` — ARADAN | T2-B(teshis:30/TH6), T3-D(GH5) ×2 |
| Zod validation hata mesajı (firstValidationMessage) | md.69 (T1)/B14 | ✅ | #51 | T1-A, T2-B(B14), T2-C(T1), T3-A ×4 |
| adaptive-test `progress` (+FE guard #114) | md.70 (T2)/B15 | ✅ | #51 backend + çatı#114 | T1-A, T2-B(B15), T2-C(T2), T3-A ×4 |
| Haftalık görüşme limiti enforce (menti başına, 7-gün UTC kova, 409) | md.79 | ✅ | #51 — dm:111 "uygulanmıyor" bayat | T1-A, T1-B2(dm:111/BÇ4) ×2 |
| Konuşma listesi UX sanallaştırma yok (kozmetik, düşük) | NUMARASIZ | ⬜ | kapasite :37 | T2-B ×1 |

---

## GRUP 9 — v2 BACKLOG (bilinçli erteleme)

| kalem (tek cümle) | numara | durum | kanıt/geçtiği yerler |
|---|:---:|:---:|---|
| Sektör-skoru canlı bağlama | md.14 | 🔵 | =GRUP-2 sektör-scorer (staging şart). T1-A, T4-A1(E23/E45) |
| Eşleştirme birleştir | md.15 | 🔵 | =GRUP-2. T1-A, T4-A1(E46) |
| Tenant hard-delete (KVKK Md.7, migration) | md.16/F3 | 🔵 | =GRUP-4 Tenant DELETE. T1-A, T2-D |
| Hayalet mod (pasif hesap) + toplu CSV davet | md.17/F6 | 🔵 | katilim-modeli :28-35; migration, ayrı büyük tur. T1-A, T2-B, T4-A1(E13) |
| `VisibilityOptIn.requestMessage` DROP (ölü kolon) | md.18/A21 | 🔵 | `schema.prisma:364` HÂLÂ var — ⭐KOD-TEYİT. T1-A(A21), T3-B(A2), T4-A1(E2) |
| "Neden uyumlu" Katman-2 (zengin gerekçe) | md.19/KARAR 8 | 🔵 | T1-A, T1-B2(ta) |
| Mentör yaklaşım Katman-3 (rıza/mahremiyet/dil kılavuzu) | md.20/KARAR 9 | 🔵 | veri-girişi boşluğu. T1-A, T1-B2(ta) |
| Sektör kolonu (canlı-sonrası) | md.21/KARAR 10/B3 | 🔵 | veri-girişi. T1-A, T3-B(#3) |
| Gerçek push (Expo/FCM stub `sent:true`) | md.23 | 🔵/⬜ | `notificationService.ts` TODO; in-app/mail idare. T1-A, T1-B3(:67), T2-C(A8), T2-D, T3-B(C-9) |
| Retention nudge cron (otomatik) | md.24 | 🔵 | =GRUP-5 otomatik-nudge. T1-A |
| RLS lint kuralı | md.26 | 🔵 | =GRUP-1. T1-A, T3-B(C-10) |
| Staging ortamı | md.27 | ⬜ | =GRUP-8. T1-A, T3-B(C-12) |
| Ortam temizliği | md.28 | ⬜ | =GRUP-8. T1-A |
| `matchingInterface.ts` USER-strategy + Job Board şablonu (kasıtlı-ileride) | U2/md.44 | 🔵 | `matchingInterface.ts:56-90` uyuyan. T1-A(U2), T1-B3(:69), T2-B(:37), T2-C(U2), T3-D(E9) |
| Premium "kilitli görünür" + `Tenant.plan/limits` altyapısı (freemium) | E13/E24 | ⬜/❓ | şema var uygulama-mantığı yok. T1-B2(01:18), T2-C(:59), T3-D(E13), T4-A1(E24), T4-A2(:57) |
| Modül sırası (Mentörlük→Kurumsal-hafıza→Sponsorluk→Belgelendirme→Ağ→Etkinlik) | NUMARASIZ | ⬜ | vizyon sırası. T1-B2(01:23) |
| Gelir/sürdürülebilirlik modeli + pilot-kulüp + gerçek-kullanıcı görüşmeleri (iş/strateji) | NUMARASIZ | ⬜ | PO/iş kararı. T1-B2(01:31), T1-B3(:54), T3-B(A3-e), T4-A2 |
| Erasmus İPTAL (kâr amacı gütmeyen sosyal girişim) | NUMARASIZ | ✅ | karar kesinleşti. T1-B2(01:27) |
| "UniClub" eski isim geçersiz → Sivilkapasite | NUMARASIZ | ✅ | çözülmüş. T1-B2(01:36) |

---

## GRUP 10 — ÖLÜ KOD / YARIM BAĞLANTI

| kalem (tek cümle) | numara | durum | kanıt (dosya:satır) | geçtiği yerler |
|---|:---:|:---:|---|---|
| `findMatchesDueForCheckpoint` cron'a bağlandı (LOG-ONLY, gerçek bildirim Aşama 2) | D1 | 🟡 | `cronScheduler.ts:359` LOG-ONLY | T1-A(D1), T1-B2(dm:104), T2-C(D1), T3-A, T3-D ×4 |
| `getPairSignal` FE'de "Risk" rozeti bağlandı | F1 | ✅ | Aşama1 (#48/#100) | T1-A(F1), T1-B2(dm:113) ×2 |
| Feedback şema alanları (engagement/goalClarity/periodic*×5) yazılmıyor (create.data+Zod'da yok) | NUMARASIZ | 🟡 | `schema.prisma:593-605`; #7 Aşama 3 formu | T1-A(C), T1-B2(dm), T2-C(:31), T3-D ×3. Migration GEREKMEZ |
| `ContextualFeedbackHost`/`MeetingProvider` bağlanmadı (payload.tags backend şemada yok) | F5/F6 | ⬜ | `ContextualFeedbackHost.tsx:58` | T1-A(F5/F6), T1-B3(:71), T2-C(:194), T3-D(E11) ×4 |
| `llmRetry.ts` LLM kaldırıldı, 0 import (tüketici matchReason.ts silinmiş) — atıl | D2/md.44 | ⬜ | `llmRetry.ts:4-5` 0 import — ⭐KOD-TEYİT | T1-A(D2), T1-B3, T2-B(:38), T2-C(:51), T3-C ×4. Sil PO |
| `UserProfile.qualityMultiplier` ikiz alan atıl (canlı Membership) | D3 | ❓ | `schema.prisma:970`; DROP migration→PO | T1-A(D3), T2-C(D3), T4-A2(:417) ×3 |
| `iceBreaker.ts` decommissioned SİLİNDİ | NUMARASIZ | ✅ | dosya YOK — ARADAN | T1-A(C.2), T1-B3, T2-B(:35), T2-C(:50), T3-C ×4 |
| `SjtQuestion`/`SjtOption` tabloları 0 prisma query (ölü-tablo adayı) | NUMARASIZ | ❓ | `schema.prisma:889,906` | T2-C(1.A:21) ×1. DURUŞ SEBEBİ YOK |
| `PATCH /users/me/social` bağlanmamış — NİYET BELGEDE YOK | md.45/A20 | ❓ | `onboardingController.ts:461` | T1-A(A20), T2-C(:26) ×2. DURUŞ SEBEBİ YOK, PO |
| `PATCH /users/:id/self-profile` me/profile ile mükerrer mi | A20 | ❓ | NİYET BELGELENMEMİŞ | T1-A(A20), T2-C(:26) ×2 |
| `/clubs` 7 uç FE'siz (kulüp modülü) — ürün mü ölü mü | md.41 | ❓ | `clubController.ts` | T1-A(md.41), T2-C(:26) ×2. PO |
| `/feedback-logs`+`/combination-scores` FE'siz (ML/geri-bildirim paneli) | md.42 | ❓ | — | T1-A(md.42), T2-C(:26) ×2. PO |
| `/rematch` admin FE aksiyonu yok (push-stub'a bağlı) | NUMARASIZ | ⬜/❓ | `adminController.ts:450` stub | T1-B3(:68), T2-B(hayalet:19), T2-C(:21) ×3. DURUŞ SEBEBİ YOK |
| `questionController` toplu-yanıt endpoint (hazır, FE çağırmıyor) | md.70-akraba | ⬜ | `questionController.ts:11` | T1-B3(:70), T3-D(E10) ×2 |
| `rewardPenalty.ts` import izi yok (yanlış-alarm/bağlı) — teyit | NUMARASIZ | ❓/✅ | yarim-is :19 "bağlı" der; T2-B teyit istedi | T1-B3(:212), T2-B(:36), T2-C(:19) ×3 |
| `discResultCard` yaz-oku çelişkisi (hayalet "okuma-yok" ↔ kart-havuz "okunuyor") | NUMARASIZ | 🟡/✅ | FE'de okunuyor (`profile.ts`/`onboarding.ts` grep) — doğru | T2-B(hayalet:41/TÇ3), T2-C(:19), T2-E ×3 |
| `enneagramWing` yaz-echo-ama-tüketici-yok (hesaplanır+yazılır+analiz-yanıtında echo AMA hiçbir tüketici okumaz) | NUMARASIZ (md.86/101 akrabası) | 🟡 | `temperamentAnalysis.ts:64`+`temperamentController.ts:60,66` echo eder; FE grep BOŞ, matching kullanmaz — ⭐KOD-TEYİT (VERDİKT: yarım-bağlı alan, gerçek çelişki DEĞİL) | T2-E(:47) ×1. Belge "hiçbir yerde okunmuyor" der; nüans: eşleştirmede okunmaz, temperament endpoint echo eder |
| `mentorVisibilityEnabled` ölü/bağlanmamış PLG alanı | md.86 | ❓ | bilinçli mi yarım mı — PO | T1-A(md.86), T1-B3(:141) ×2 |
| `matchingInterface`/`profile-completeness`/`ProfileStrengthCard`/`TenantSwitcher`/`MeetingScheduler` yarım-özellik (bağlanmadı) | md.45 | 🔵/⬜ | `schema`/dosya var, import yok; sil niyet-yok-eder | T1-A(C.2/md.45), T2-C(:30/:180) ×2 |
| super-admin router SİLİNMEDİ (testli) ↔ Taraf-2 visibility SİLİNDİ (#35) | NUMARASIZ | ✅/❓ | `server.ts:105` mount VAR; Taraf-2 silindi | T4-A1(E28/E30/E33), T3-B(A1) ×2. HAKEM: silinmedi (kod) |
| `run-tuning`/`run-purge` cron manuel tetik (bilinçli debug) | NUMARASIZ | ✅ | debug amaçlı | T2-B(hayalet:21) ×1 |
| `taxonomy.service`/`IndustryNode` LCA seed'li ama skorlamada kullanılmıyor (sector-scorer bağlı) | NUMARASIZ | ⬜ | =sektör-scorer/İŞ7. T1-A(C.2), T2-B(:43) | T1-A, T2-B ×2 |
| `LoginForm.tsx` "Sprint 14 TenantProvider köprüsü" bayat-yorum | NUMARASIZ | ❓ | `LoginForm.tsx:7` | T2-C(:32) ×1. DURUŞ SEBEBİ YOK |
| `mentiRequestController.ts` durumu (kart-havuz "VAR" ↔ belge-denetimi "SİLİNDİ") | NUMARASIZ | ❓ | zaman farkı; kod-teyit yapılmadı | T2-B(TÇ2), T1-B3 ×2 |
| Mentör karar ekranında menti CHAT ilk mesajı (Conversation↔Meeting FK yok) — "KALICI İŞ" | NUMARASIZ | ⬜ | ön-koşul (chat) ✅, iş inşa edilmedi | T4-A1(E29) ×1. 🌱 izsiz |
| Profil-düzenleme keşfi (kayıt-sonrası bilgi/foto güncelleme yeteneği var mı) | NUMARASIZ | ❓ | PLANLA keşfi hiç yapılmamış | T4-A1(E34) ×1. 🌱 |

---

## GRUP 11 — 🗑️ GEÇERSİZ ADAYI / o-güne-özel (silinmedi)

| kalem | durum | geçtiği yerler |
|---|:---:|---|
| teshis :106 sunucu-konumu "İrlanda/AB" (Londra/BK ile çürütüldü) | 🗑️ | T2-B(TÇ1), T3-B(01:51/03:31), T3-C(B1) |
| "Arkadaşın başvurusu — gerçek kişi bekliyor" (tekil operasyonel not) | 🗑️ | T4-A1(E16), T1-B2(08:35), T4-A2(:64) |
| İŞ 1 o-güne-özel worktree/branch listesi (2026-08 tarihli) | 🗑️ | T4-A1(E39) |
| CLAUDE.md/backend bayat kod-gerçeği iddiaları (İrlanda/5-model/iceBreaker/matchReason/LLM-içsel-çelişki) | 🗑️ | T3-C(B1-B6) — bkz. GRUP-7 |
| Belge-içi bayat gövde satırları (SJT-4/sunucu-?/maxMeetings/timezone/IDOR/AdminAuditLog/09-DURUM-bloklar) | 🗑️ | T1-B2(BH1-5), T2-D(:60), T1-B3 — bkz. GRUP-7 |

---

## TEKİLLEŞTİRME SAYIMI

**HAM toplam (16 dosyanın beyan ettiği kalem/defter satırı — çakışmalar AYRI):**

| dosya | ham kalem |
|---|:---:|
| T1-A | 152 |
| T1-B1 | 6 |
| T1-B2 | 156 |
| T1-B3 | 120 |
| T2-A | 0 |
| T2-B | 140 |
| T2-C | 207 |
| T2-D | 117 |
| T2-E | 22 |
| T3-A | 58 |
| T3-B | 79 |
| T3-C | 111 |
| T3-D | 50 (14 EK-A + ~36 düzeltme/denkleştirme satırı) |
| T4-A1 | 47 |
| T4-A2 | 83 |
| T4-A3 | 33 |
| **HAM TOPLAM** | **1381** |

> Not: T3-D'nin "≈434 defter satırı" sayısı T1 dosyalarının TEKRAR-sayımıdır (T1-A/B1/B2/B3 = 152+6+156+120=434);
> burada T3-D kendi ÜRETTİĞİ düzeltme/EK-A satırlarıyla (50) sayıldı — T1'i tekrar saymamak için. HAM TOPLAM 1381,
> aynı kararın 16 dosyadaki tüm görünümlerinin toplamıdır (kasıtlı çift-sayım: her dosya bağımsız defter).

**BENZERSİZ toplam (bu karar defterindeki tekil satır):** **196**

Grup bazında benzersiz kalem:
- GRUP 1 (Güvenlik/KVKK): 46 (2 alt-nüans dahil)
- GRUP 2 (Eşleştirme/psikometri): 21
- GRUP 3 (STK-admin): 25
- GRUP 4 (Platform): 17
- GRUP 5 (Retention/persona): 22
- GRUP 6 (İçerik/soru): 20
- GRUP 7 (Belge-hijyen/çalışma-tarzı): 25
- GRUP 8 (Altyapı/PO-manuel): 42
- GRUP 9 (v2 backlog): 19
- GRUP 10 (Ölü kod): 26
- GRUP 11 (Geçersiz adayı — GRUP 7/10 ile örtüşenler ayrı sayılmaz): 3 tekil (teshis-İrlanda, arkadaş-başvurusu, İŞ1-worktree)

> Bazı kalemler doğal olarak birden çok grupta anılır (örn. tenant-hard-delete GRUP-4+GRUP-9; sektör-scorer
> GRUP-2+GRUP-9). Çift-sayım önlemek için her kalem BİRİNCİL grubunda tam yazıldı, ikincil grupta yalnız
> referans ("=GRUP-X") verildi. **Benzersiz tekil karar/iş/niyet = 196.**

**Kaç kalem birleşti:** 1381 ham − 196 benzersiz = **1185 tekrar** birleştirildi (ortalama her benzersiz kalem
~7 dosyada tekrar ediyordu; en çok tekrar edenler: KARAR 5/DISC-güvenlik ×8, K2-OAuth ×8, madde 6/kurum-mail ×8,
madde 92/sunucu-ülke ×7, K6 ×7, sektör-scorer ×7).

---

## BENZERSİZ DURUM DAĞILIMI

> Her benzersiz kalemin ANA (baskın) durumu bir kez sayıldı. Alt-nüans satırları (⤷) ayrı kalem sayıldı.
> 🔵 (bilinçli erteleme) ve 📌 (KOD DIŞI kalıcı kural) ayrı gösterildi; ⬜ içine de sayılabilirler.

| durum | TAM sayı |
|---|:---:|
| ✅ YAPILDI | 58 |
| 🟡 YARIM | 22 |
| 🔀 PR'DA | 0 |
| ⬜ AÇIK | 66 |
| ❓ TEYİT GEREK | 32 |
| 🗑️ GEÇERSİZ ADAYI | 12 |
| 🔵 (bilinçli erteleme — ⬜ alt-türü) | 5 |
| 📌 (KOD DIŞI kalıcı kural) | 1 |
| **TOPLAM** | **196** |

> Kontrol: 58+22+0+66+32+12+5+1 = 196. ✅

**Çelişkiler (tekil):** 6 benzersiz çelişki — hepsi KOD/PO hakemli veya açık PO kararı:
1. **madde 39 (G2)** — ⬜ tablo ↔ ✅ CANLIDA → **KOD hakem: ✅** (`gdprService.ts:128`, #54).
2. **Sunucu ülkesi** — belgeler "İrlanda/AB" ↔ **PO/KOD: Londra/BK** (eu-west-2=Londra, `assertTestDatabase.test.ts:7`).
3. **SJT 4 ↔ 3** — belge "4" ↔ **KOD: 3** (`seed.ts:530`).
4. **DISC 20 ↔ 32** — belge "20" ↔ **KOD: 32** (`seed.ts` 49 giriş); canlı sayı ❓ DB.
5. **madde 34** — kopya-arşiv "AÇIK" ↔ **canonical/KOD: ✅** (`adminController.ts:311`, #49).
6. **Manuel eşleştirme (md.76)** — envanter "eksik" ↔ strateji "YASAK" → **açık PO kararı** (K5-soru 8), KOD: manuel-pair endpoint yok (HAKEM OLUNMADI).

Ek KOD-hakemli nüanslar (çelişki sayılmadı, verdikt verildi):
- **enneagramWing** — "hiçbir yerde okunmuyor" ↔ `temperamentController.ts:60,66` echo eder → **VERDİKT: yarım-bağlı yaz-echo-ama-tüketici-yok alanı** (FE grep boş, matching kullanmaz). Gerçek çelişki değil.
- **ThemeToggle (madde 5)** — "✅ zaten mevcut" ↔ **admin VAR (`(admin)/layout.tsx:16,93`) / platform YOK (grep boş)** → **🟡 YARIM** (T3-D düzeltmesi).
- **Header-yok davranışı** — denetim "reddet" ↔ kod "default-tenant'a düş" (`tenant.ts:27`) → kasıtlı-mı PO/güvenlik kararı.

**KOD-hakemli çelişki: 5** (39, sunucu-ülke, SJT, DISC-sayı, madde 34) + 1 açık-PO (md.76) = **6 tekil çelişki**.

---

## KAPANIŞ NOTU (karar defteri)

- **16/16 bölüm dosyası TAM okundu** (T2-A boş=0 kalem). HAM toplam **1381** kalem/görünüm → tekilleştirilerek
  **196 benzersiz** karar/iş/niyet kalemine indirildi (**1185 tekrar birleşti**).
- **Benzersiz durum:** ✅ 58 · 🟡 22 · 🔀 0 · ⬜ 66 · ❓ 32 · 🗑️ 12 · 🔵 5 · 📌 1 = **196**.
- **6 tekil çelişki** (5 KOD-hakemli net + 1 açık-PO md.76). enneagramWing KOD-verdiktiyle "yarım-bağlı yaz-echo
  alanı" olarak yazıldı (gerçek çelişki değil, madde 86/101 akrabası).
- **En büyük grup: GRUP-1 Güvenlik/KVKK (46 benzersiz kalem)** — projenin en yoğun karar-alanı; çoğu S1, kritik
  açıklar hâlâ ⬜/❓ (SuspicionReport.tenantId, KVKK-FE, K4-yaş-input, consent-sürüm, K6, sunucu-sertleştirme).
  İkinci: GRUP-8 Altyapı/PO-manuel (42), üçüncü: GRUP-10 Ölü-kod (26) ile GRUP-3/GRUP-7 (25).
- **En çok tekrar eden kararlar** (tekilleştirmenin en çok kalem birleştirdiği yer): KARAR 5/DISC-güvenlik (8 dosya),
  K2-OAuth (8), madde 6/kurum-mail (8), madde 92/sunucu-ülke (7), K6/admin-guard (7), sektör-scorer/madde 14 (7),
  repo-PRIVATE (6), K3/madde 40/K6/DISC-DI/sol-menü (6'şar).
- **Ana boşluk (durak sebebi yok / niyet belgelenmemiş):** madde 102 (CORE-eşiği hangisi doğru — NİYET BELGELENMEMİŞ),
  T9 platform drill-down, `PATCH social`/`self-profile`/SjtQuestion-tablo (niyet yok→PO), B10/B12 bug'ları,
  Y1-Y7 retention (08-20'den beri açık, "neden ele alınmadı" gerekçesiz).
- **DB'ye dokunulmadı · kod değiştirilmedi · PR açılmadı · commit yapılmadı · mevcut belge silinmedi/taşınmadı ·
  numara doğurulmadı · kişi adı yazılmadı.** Yalnız TEK dosya yazıldı: `docs/raporlar/bilanco/karar-defteri-2026-08-26.md`.
