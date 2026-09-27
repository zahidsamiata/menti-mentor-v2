> 📸 DONDURULMUŞ (2026-09-27) — BITTI son doğrulama ara dosyası; güncellenmez. Özet ve nihai kategoriler: `docs/raporlar/kod-denetimi/bitti-dogrulama-2026-09-27.md`.
> TÜR: 📸 · SON DOĞRULAMA: 2026-09-27 · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)

# Kalite kontrolü QE5 — BITTI son doğrulama (2026-09-27)
Denetçi: opus alt-ajan (partileri yapmayan) · referans: çatı 191a256 (worktree HEAD 9327764, aradaki commit'ler yalnız docs) · backend 3bd9ad3 · salt-okuma
Özet: kontrol edilen 16 · TUTAR 11 · ÇÜRÜDÜ 5 (5'i de parti-08'den) · yeniden koşulan mutasyon 0

| İş | Parti | Parti kategorisi | QC kararı | Doğru kategori | Kanıt dosya:satır | Kalan (⚠️/🔁/👁 için) | Güvenlik/KVKK etkisi | Karar gerekebilir |
|---|---|---|---|---|---|---|---|---|
| KR-12 | parti-08 | ✅ | ÇÜRÜDÜ | 🔁 SONRADAN DEĞİŞTİ (güncel hâl karşılıyor: EVET) | K-05b e532b50 uyarıyı sildi; book-meeting/page.tsx:97-101,230-262 slot listesi · meetingAvailability.ts:39-62 · book-meeting-slots.test.ts:14-66 | Yok; "uyarı" yerine İstanbul saatine göre seçilebilir saat listesi var, testli | hayır — yalnız saat gösterimi/seçimi | hayır |
| KR-15 | parti-08 | ✅ | TUTAR | ✅ | frontend/e2e/dbGuard.ts:12-34 · e2e/global-setup.ts:27 · e2e-db-guard.test.ts:13-31 (3 negatif) | — | — | — |
| KR-16 | parti-08 | ✅ | ÇÜRÜDÜ | 👁 İNSAN GÖZÜ (kod ✅) | backend Dockerfile:22-23,36,43,58 · package.json:38 · ci.yml:63-101 · açık teyit: 03-PO-ELLE-ISLER.md:152 (Dokploy start override, durum "—") | Dokploy panelinde npx içeren başlatma komutu override'ı olmadığı PO tarafından teyit edilmedi | evet (düşük) — override varsa açılışta sürümsüz indirme tedarik zinciri riski sürer | hayır |
| KR-17 | parti-08 | ✅ | TUTAR | ✅ | meetingController.ts:633-686 (Serializable + 409) · approve-meeting-conflict.test.ts:48-56 · mentor/page.tsx:103-112,363-364 | — | — | — |
| KR-18 | parti-08 | ✅ | TUTAR | ✅ | agreementController.ts:37-41,181-185 · agreement-renewal-active.test.ts:42-71 · frontend lib/api/agreements.ts:44-45 | — | — | — |
| KR-21 | parti-08 | ✅ | TUTAR | ✅ | cronScheduler.ts:46-53,71-77 · cron-tuning-frequency.unit.test.ts:9-29 · UI admin/algorithm-tuner/page.tsx:96-101 | — (not: ekran kayıtlı sıklığı yüklemiyor, hep WEEKLY gösteriyor :44 — ölçüt dışı) | — | — |
| KR-22 | parti-08 | ✅ | ÇÜRÜDÜ | 🔁 SONRADAN DEĞİŞTİ (güncel hâl karşılıyor: KISMEN) | KR-16 (backend #161, KR-22'den 1,5 saat sonra) backend ci.yml:63-101 docker-prisma job'u ekledi; scripts/verify.sh:20-22 "bilinçli farklar" bunu anmıyor | verify.sh başlığına backend CI docker-prisma job'u yerelde koşulmayan fark olarak yazılmalı | hayır | hayır |
| KR-23 | parti-08 | ✅ | TUTAR | ✅ | selfServeController.ts:266-282 ($transaction içinde onboardingStep DONE) · self-serve-onboarding-done.test.ts:32-41 | — (not: negatif test işlem geri alımını değil tekrar e-posta erken dönüşünü ölçüyor) | — | — |
| I-05 | parti-08 | ✅ | TUTAR | ✅ | WeeklyMeetingLimitNote.tsx:16-35 · profile/page.tsx:256 · book-meeting/page.tsx:142,153 · menti/page.tsx:72-79,236-240 · menti-waiting-weekly-limit.test.tsx:43-68 | — | — | — |
| I-07 | parti-08 | ✅ | TUTAR | ✅ | certExamSelection.ts:97-111 · certification.service.ts:320 · sjtScoringController.ts:173-182 · certExamSelection.unit.test.ts:93-127 · certification-retry.test.ts:169 | — | — | — |
| K-05 | parti-08 | ✅ | TUTAR | ✅ | book-meeting/page.tsx:230-262,318 (yalnız slot butonları, date/time input yok) · book-meeting-availability.test.tsx:86-140 | — | — | — |
| K-20b | parti-08 | ✅ | TUTAR | ✅ | book-meeting/page.tsx:54-55,155-181 · conversationController startConversation (menti→aktif mentör izinli) · book-meeting-availability.test.tsx:62-67,147-185 | — | — | — |
| K-06 | parti-08 | ✅ | TUTAR | ✅ | ScenarioGuideEngine.tsx:151-172,362-394 · ScenarioGuideEngine.test.tsx:116-164 (negatif: seçimden önce istenmez) | — | — | — |
| K-08 | parti-08 | ✅ | TUTAR | ✅ | socialUrl.ts:16-42 · userController.ts:369-370 · onboardingController.ts:538-539 (tek yazım yolları, grep) · profile-social-links.test.ts:48-90 | — | — | — |
| F-04 | parti-08 | ✅ | ÇÜRÜDÜ | ⚠️ KISMEN | securityHeaders.mjs:36 CSP yalnız Report-Only · frontend lib/logoUrl.ts:17-24 gösterim guard'ı yalnız https · TenantSwitcher.tsx:197-203 ham img · backend logoUrl.ts:44,64-76 host allowlist değil denylist | CSP engellemiyor; ham img yolunda host allowlist uygulanmıyor, eski kayıtlı logolar yalnız https ile çiziliyor | evet — keyfi https hosta üyelerin IP/UA'sı sızabilir (izleme pikseli), CSP bunu durdurmuyor | hayır (enforce geçişi teknik iş) |
| F-28 | parti-08 | ✅ | ÇÜRÜDÜ | ⚠️ KISMEN | inline "Vazgeç" kaldı: admin/questions/page.tsx:148,270 · TenantCorrectionBanner.tsx:153 · platform/dashboard/page.tsx:429 · ui-text.test.tsx:22-43 yalnız sözlük sabitlerini ölçüyor | 4 inline "Vazgeç" UI_TEXT.actions.cancel'a taşınmadı; test inline kalıntıyı yakalamıyor | hayır | hayır |

## Notlar

### KR-12 — ✅ → 🔁
Ölçüt "müsaitlik UYARISI İstanbul saatine göre doğru". KR-12'nin kapattığı uyarı (`AlertMessage "Seçtiğiniz saat mentörün müsaitlik bloğu dışında…"`) K-05b (`e532b50`) ile serbest tarih/saat girişiyle birlikte kaldırıldı (diff'te `-` satırları). Parti "çekirdek değişmedi" dedi ama kullanıcının gördüğü yüzey değişti. Güncel hâl amacı karşılıyor: saatler `listBookableSlots` → `fitsAvailability` → `zonedWeekdayAndMinutes` ile blok diliminde üretiliyor (`book-meeting/page.tsx:97-101`), ekranda "Saatler Türkiye saatiyle gösterilir" (`:258`), `book-meeting-slots.test.ts:14-66` İstanbul↔UTC ve gece yarısı sınırını ölçüyor. `book-meeting-timezone.test.tsx` hâlâ geçerli (saf fonksiyon). 

### KR-16 — ✅ → 👁 (kod ✅)
İmaj tarafı doğru: `prisma` dependencies'te, runner'da yerel ikili ile `CMD` (`Dockerfile:58`), CI ağsız sürüm kontrolü yapıyor. Ancak ölçüt canlı SUNUCUNUN açılışı hakkında ve kuyruk satırının kendisi "Açık nokta: Dokploy panelinde ayrı başlatma komutu" diyor; `03-PO-ELLE-ISLER.md:152` teyidi hâlâ boş ("—"). Panelde `npx prisma migrate deploy` içeren bir override varsa imajdaki `CMD` hiç çalışmaz. /health ok:true bunu ayırt etmez.

### KR-22 — ✅ → 🔁
KR-22 çatı #330 `dd614a3` (2026-09-26 21:03 +03) ile kapandı; KR-16 backend #161 `02ac78c` (22:28 +03) backend CI'a `docker-prisma` job'unu ekledi. `scripts/verify.sh:20-22` hâlâ "backend CI yalnız npm ci · prisma generate · tsc --noEmit · vitest run koşar" diyor. Yani "kalan fark belgeli" ayağı sonradan eskidi. Belge bekçisi eklemesi (`303de1a`) ise iki tarafta da tutarlı (`verify.sh:9,132-133` ↔ `.github/workflows/ci.yml:30-37`).

### F-04 — ✅ → ⚠️
Ölçüt: "host/MIME allowlist'e tabi, CSP kapsıyor". (1) CSP `Content-Security-Policy-Report-Only` (`securityHeaders.mjs:36`): tarayıcı hiçbir şeyi engellemiyor, yani CSP pratikte korumuyor. Parti bunu kendisi yazdı ama yine ✅ verdi. (2) Yazma guard'ı (`backend/src/services/logoUrl.ts`) host ALLOWLIST değil, IP/localhost/iç-TLD DENYLIST'i. Uzantı kontrolü MIME değil dosya adı. (3) Gösterim yolu `TenantSwitcher.tsx:197` gevşek `isSafeLogoUrl`'i (`frontend/src/lib/logoUrl.ts:17-24`, yalnız https) kullanıyor. Host listesi (`img-src` = remotePatterns) yalnız report-only CSP'de var. Sonuç: herhangi bir genel https hostundaki logo her üyenin tarayıcısından çekiliyor. Mutasyon kanıtı (8/11) yalnız yazma denylist'ini ölçüyor.

### F-28 — ✅ → ⚠️
Sözlük kuralı "en az 3 yerde birebir geçen" metni kapsıyor. `UI_TEXT.actions.cancel` 11 yerde kullanılıyor ama "Vazgeç" 4 yerde hâlâ inline: `admin/questions/page.tsx:148,270`, `TenantCorrectionBanner.tsx:153`, `platform/dashboard/page.tsx:429`. Bu satırlar 2026-08'den kalma, F-28/F-28b bunları taşımadı. `ui-text.test.tsx:22-43` yalnız sözlük değerlerini kendi sabitleriyle karşılaştırıyor. Dağınık metnin merkezde olup olmadığını ölçmüyor, bu yüzden kalıntıyı yakalayamaz.
