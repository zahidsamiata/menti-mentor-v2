# MentiMentor — Kapsamlı Teşhis + Yol Haritası Raporu
**Tarih:** 2026-08-02 · **Kapsam:** niyet vs mevcut-kod envanteri (salt-okuma, kanıtlı) + merge runbook + KVKK + güvenlik
**Durum kodları:** ✅ var · ⚠️ yarım · ❌ yok · 🐛 bozuk · 🔒 bilinçli kısıt
**Genel örüntü:** Backend (model + endpoint) büyük ölçüde HAZIR; eksik olan çoğunlukla **admin UI panelleri**. Birkaç gerçek bug var.

> Not: Frontend `feat/light-theme` (main-based + tema), backend submodule `feat/platform-panel-deep`. Bulgular bu checkout'a göre; "panel merge olunca ne kırılır" için Bölüm 1-B15'e bak.

---

## 1. TEŞHİS

### GRUP A — Eksik paneller / özellikler (niyet → gerçek → fark)

| # | Panel (niyet) | Durum | Kanıt (dosya) | Efor | Not |
|---|---|---|---|---|---|
| A1 | Eşleşme paneli — yönetici "kim kiminle eşleşti" görsün | ⚠️ yarım | model `Match` (schema.prisma:906), `rankMentisForMentor` (services/matching.ts:40) VAR; admin UI + endpoint YOK | Orta | Backend hazır, sayfa yok |
| A2 | Mentör havuzu | ⚠️ yarım | `GET /api/users?role=MENTOR&isActive=true` (routes/userRoutes.ts:23) + `matchingApi.listMentors` VAR; admin sayfa YOK | Küçük | |
| A3 | Menti havuzu | ⚠️ yarım | aynı endpoint (role=MENTI); admin sayfa YOK | Küçük | |
| A4 | Mentör sertifika sonuç panosu | ⚠️ yarım | `TenantMembership.isCertified/certScore/certAttempts` (schema.prisma:975) + cert motoru VAR; yönetici sonuç panosu YOK | Orta | Veri hazır, UI yok |
| A5 | Oyunlaştırılmış görev/sorumluluk | 🔒 bilinçli | Learning Journey = keşif (senaryo, puanlama YOK) — tasarım kararı; services/learningJourney.service.ts | N/A | "Puanlı görev" istenmemiş |
| A6 | DISC + sektör dağılım oranı ayarı | ❌ yok | `scoring.config.ts` WEIGHTS.SECTOR=0.6 / CHARACTER=0.4 **hardcoded**; sector-scorer bileşen ağırlıkları da sabit. adminSettings'te sadece `maxMeetingsPerWeek`+`minMatchScoreThreshold`+`reportingFrequency` | **Büyük** | Şema migration + endpoint + UI |
| A7 | Kurum sayfası/branding (sonradan düzenleme) | ⚠️ yarım | onboarding Step3Branding (logo/renk) + TenantProvider CSS enjeksiyon + lib/branding.ts VAR; kayıt SONRASI düzenleme paneli YOK | Küçük | Altyapı hazır |
| A8 | DISC sorularını görüntüleme | ✅ var | admin/questions global soruları listeler (kilit rozeti + kuruma-özel ekleme) | N/A | Tam işlevsel |
| A9 | Yöneticilik verme akışı | ✅ var | `POST /api/admin/users/:id/promote-admin` (adminRoutes.ts:67, adminController.ts:483, max 3 admin/tenant), admin/managers; demote de var | Küçük | "Tüm ONAYLI kullanıcı" listesi eksik (sadece PENDING kuyruğu var) |

### GRUP B — Bug / performans (kök neden)

- **B10 — Sekmeler arası geçiş YAVAŞ 🐛.** Kök neden: `useApiClient` her render'da yeni `api` referansı döndürüyor → `useQuery(..., [api])` bağımlılığı her sekme geçişinde değişip yeniden fetch tetikliyor (menti/page.tsx:32,49,56,62; hooks/useApiClient.ts:24-32; hooks/useQuery.ts:52-55). Çözüm: api client'i stable referans yap (memo/context). Efor orta. **⚠️ fix-anında tam mekanizma doğrulanmalı.**
- **B11 — Logout 🐛.** `logout` fonksiyonu VAR (providers/AuthProvider.tsx:167-174) ama **hiçbir UI'a bağlı değil** → kullanıcı çıkış yapamıyor. Efor düşük (nav/user-menüsüne buton).
- **B12 — Sol alt kullanıcı kartı 🐛.** Hiç yok (DashboardNav sadece linkler + tema toggle). Efor orta (kart + dropdown, B11 ile birlikte).
- **B13 — Kurum-özel soru ekleme ✅.** Çalışıyor: questionController.ts:80-103 (POST /api/questions, Zod validasyon, DISC_ASSESSMENT kilitli, STK_CUSTOM eklenebilir).
- **B14 — Hata mesajları belirsiz ⚠️.** Backend VALIDATION yanıtı `{ error:'VALIDATION', details }` — **`message` alanı YOK**; frontend `error.message ?? 'Hata'` → generic "Hata" gösteriyor (questions/page.tsx:43,53,70). Diğer hata kodları (401/403/404) `message` içeriyor, sorun yok. Efor düşük (backend VALIDATION'a message ekle).
- **B15 — Backend↔frontend KONTRAT FARKI ⚠️ (ÖNEMLİ).**
  - Adaptive-test: `/api/users/:id/adaptive-test/next|answer` (adaptiveTestController → adaptiveTestEngine.getNextQuestion) **`progress` DÖNDÜRMÜYOR**; frontend tipi + DailyQuestionWidget `progress`'i zorunlu sayıyordu → /mentor,/menti çökmesinin kökü (**kısmen düzeltildi:** widget savunmacı guard, commit `cfda33c`). Kalıcı çözüm: backend `progress` döndürsün YA DA frontend uyarlasın.
  - `dimensionalTotal` (types/discTest.ts) tipte var, backend dönmüyor — kullanılmadığı için zararsız (tip temizliği).
  - ✅ Uyumlu: matching `/candidates` (`{items,fallbackLevel}`), learning-journey (`{audience,frame,items,total}`).

### GRUP C — UX / içerik (yüzeysel)

- **C16** Nav yazı boyutu `text-sm` — tutarlı ((admin)/layout.tsx:74,101; DashboardNav.tsx:43). Kontrast/weight iyileştirmesi küçük iş.
- **C17** Sayfa açıklama metinleri her `page.tsx`'te **inline/dağınık** (9+ dosya). Merkezileştirme orta iş.
- **C18** Soru ekleme dropdown'ında **CORE/DEEPENING İngilizce** (questions/page.tsx:122) → "Temel/Derinleştirme" (orta). "Genel (bilgi amaçlı)" içindeki D/I/S/C, `discDimension` enum'u — DISC skorlaması için doğru, değiştirilmemeli.
- **C19** Sertifika soru ekleme 🔒 **bilinçli kısıt** (sadece aç/kapa; UI'da "eklenemez, yalnızca açılıp kapatılır" yazılı — certification/page.tsx:72-75).
- **C20** Etiket: yönetici **sadece öneri onaylar/reddeder/birleştirir** (admin/tags + admin.ts:68-78); doğrudan ekleme akışı YOK. Ekleme istenirse orta iş.

### GRUP D — Tema (kalan iş, PR #32)

- **D21** ThemeToggle sadece DashboardNav'da (menti/mentor); **admin ((admin)/layout.tsx) + platform (platform/dashboard) nav'larına eklenmeli**. Efor küçük (~1-2h). Tema global olduğu için işlev zaten her yerde geçerli; sadece buton eksik.
- **D22** DISC renkleri light kontrast (WCAG FAIL): 5 dosyada ~7 renk-map — menti/page.tsx:22-24, mentor:22-26, profile:23-27, admin/questions:13-15, admin/waiting-room:14-16, onboarding/DiscTestStep:57-62. Sorunlu: `text-yellow-500`, `text-gray-400`, `bg-*-100+text-*-700`. Düzeltme: 600/700 tonuna çek. Efor orta (~2-3h).
- **D23** Platform admin rozetleri koyu-alfa tint (`bg-red-900/60` vb.) light'ta görünmez: platform/dashboard/page.tsx 4 yer / ~10 satır (152, 189-193, 274-278, 338-341). Light varyant ekle. Efor küçük-orta (~1-2h).

### GRUP E — Yeni özellik: kullanıcı geri bildirim mekanizması (fizibilite)

- Altyapı HAZIR: `emailService.ts` (Resend/SMTP, send fonksiyonları), `bildir/page.tsx` + suspicion-report şablon örnek. ⚠️ Suspicion şu an mail GÖNDERMİYOR (sadece DB'ye yazıyor).
- **MVP (metin-only):** her sayfada "Bildir" butonu → açıklama + otomatik `URL`+`userAgent` → mail. Yeni model + endpoint (public + **rate-limit şart**) + email fonksiyonu. Efor **~4-6h**.
- +Context (ekran boyutu/locale/session) ~8-10h. +Screenshot (html2canvas + CDN) ~16-24h.

---

## 2. ÖNERİLEN GRUPLANDIRMA + SIRA (öncelik kararı kullanıcıda)

1. **🔴 Kullanılabilirlik blocker'ları (önce):** B11 logout + B12 user kartı (birlikte), B10 yavaşlık, B14 hata mesajları. Küçük-orta; günlük kullanımı doğrudan bozuyor.
2. **🟡 Yönetici panelleri (founder vizyonu):** A1, A2, A3, A4, A7 + A9-onaylı-liste. Backend hazır, hepsi UI → tek "admin paneli tamamlama" turu.
3. **Tema bitir:** D21-D23 + görsel WCAG QA → PR #32.
4. **B15 progress kontratı:** backend adaptive-test `progress` döndürsün (panel merge öncesi kalıcı çözüm).
5. **Büyük/ertelenebilir:** A6 (ağırlık ayarı — büyük), E24 (geri bildirim), C17/C18/C20 (UX/içerik).

---

## 3. MERGE RUNBOOK (panel + güvenlik/UX paketi) — dinlenmiş turda

> ### 🔴🔴 EN KRİTİK KURAL: #26 (ve #29) **MERGE-COMMIT** ile kapatılacak — **SQUASH YASAK.**
> Squash → panel commit hash'leri değişir → panel-base branch'ler (#27/#28/#30/#31/#32) o commit'leri "eksik" görür → rebase çakışması.

**Açık PR'lar:** #26 panel-backend (base main), #29 panel-umbrella (base main), #27 güvenlik A+B+hardening (base panel), #28 register-backend (base panel), #30 register-frontend (base panel), #31 CLAUDE.md (base main, bağımsız), #32 light-theme (base main, WIP).

**ROUND 1 — Panel:** #26 merge (merge-commit) → çatı submodule pointer bump (backend commit→push→umbrella `git add backend`→commit→push, ara commit YOK) → #29 merge → 🔴 prod deploy → 🔴 **PROD BACKFILL** (`node scripts/backfill-memberships.mjs` dry-run → `--apply`; b3 membership; prod DATABASE_URL ile; "kalan eksik: 0" görülmeli).

**ROUND 2 — Güvenlik+UX:** #27/#28/#30 base'i main'e çevir + rebase → **#27/#28 gerçek backend CI burada koşar** (main-base) → merge → pointer bump → #30 merge → 🔴 prod deploy.

**Geri-alınamaz noktalar:** yalnızca deploy + backfill. Merge'ler main'e yazar ama deploy'suz geri alınabilir (repo'da CD workflow YOK → merge tek başına deploy etmez).

---

## 4. GÜVENLİK — doğrulanmış bulgular

- ✅ **#27'de çözülü (throwaway CI ile 245 test yeşil):** `GET /users/:id` + `/users/:userId/clubs` IDOR (`requireSelfOrAdmin` middleware — authorize.ts), login brute-force (`loginRateLimiter` — rateLimiter.ts).
- 🔴 **#27 DIŞINDA 2 YENİ doğrulanmış IDOR (fix'ten önce dosya:satır teyit):**
  - `GET /mentors/:mentorId/candidates` (matchingController.ts:39-58): mentör başka mentörün aday listesini görebilir. Fix: `role==='MENTOR' && userId!==mentorId → 403`.
  - `GET /requests/:id` (requestController.ts:104): başkasının match request'i + requestMessage (PII) görülebilir. Fix: requester/taraf kontrolü.
- 🟢 Çürütüldü (korunuyor): `/mentors/:id/filter`, `/users/:id/temperament-test`, `/self-profile`, `/agreements/:id/*`; secret: prod'da JWT_SECRET fail-safe + `timingSafeEqual`.
- 🟡 Sonra: suspicion-report IP-limit/CAPTCHA, GDPR anonymize/hard-delete şifre step-up (ADMIN-only, düşük risk).

---

## 5. KVKK — production-blocker + kod planı

- ✅ Backend güçlü: `gdprService.ts` anonymize/hardDelete/export; `kvkkConsentAt` enforce; PII/Analytical sınıflandırma; **purge cron ZAMANLANMIŞ** (cronScheduler, Pazar 03:00 UTC).
- 🔴 **Blocker'lar (gerçek kullanıcı almadan önce):**
  - **Privacy center YOK** (frontend): kullanıcı verisini indir/sil/rıza-geri-çek UI — backend endpoint var, ekran yok. ~3-4h + rıza-geri-çek için küçük backend PATCH.
  - **DISC ayrı rıza YOK** (KVKK Md.6): onboarding'e checkbox + `discConsentAt` (migration). ~1.5h.
  - **Metinler "taslak"** (`/kvkk`,`/terms`): veri sorumlusu iletişim/adres, 30-gün başvuru, KVKK Kurumu referansı, veri lokasyonu eksik. **Hukuki finalize.**
  - **Meeting/Feedback FK nullable** (hard-delete rollback riski, gdprService.ts:171): şema nullable + `onDelete:SetNull` migration. ~2.5h + prod backup.
  - **18+ yaş** kodda doğrulanmıyor (terms 18+ diyor).
- **Sunucu konumu (kanıtlı):** DB Neon eu-west-2 (İrlanda/AB) ✅, Mail Resend İrlanda (AB) ✅, deploy bölgesi bilinmiyor (teyit edilmeli).
- **Kullanıcı kararları:** veri sorumlusu kim (platform/kurum), sunucu AB'de mi kalacak, hedef yaş, DISC ayrı rıza, metin finalize zamanı.

---

## 6. Açık işler — hızlı hatırlatma
Merge runbook (5 PR + backfill) · KVKK blocker paketi · güvenlik (2 yeni IDOR) · tema bitirme (PR #32) · admin panelleri (A1-A4/A7/A9) · kullanılabilirlik bug'ları (B10-B12,B14) · A6 ağırlık ayarı · E24 geri bildirim.

**Bu rapor karar içindir; kod yazılmadı. Öncelik/uygulama sırası kullanıcıya aittir.**
