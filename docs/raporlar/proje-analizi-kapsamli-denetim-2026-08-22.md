# Proje Analizi — Kapsamlı Denetim Raporu

> **Tür:** 📸 Dondurulmuş anlık analiz · **Tarih:** 2026-08-22 · **Kapsam:** backend + frontend (salt-okuma)
> **Yöntem:** 6 bağımsız paralel salt-okuma agent'ı → ana agent tarafından koddan doğrulama.
> **Not:** Hiçbir dosya değiştirilmedi. Silme/refactor kararları ürün sahibinindir (proje "ölü kod → sil varsayılan değil" ilkesi).

## İçindekiler
1. [Yönetici Özeti](#0-yönetici-özeti)
2. [Backend var / Frontend yok](#1-backend-var--frontend-yok--bağlanmamış-özellikler)
3. [Güvenlik](#2-güvenlik)
4. [Veritabanı](#3-veritabanı)
5. [Erişilebilirlik (a11y)](#4-erişilebilirlik-a11y)
6. [Gereksiz / Şişkin Kod](#5-gereksiz--şişkin-kod)
7. [Ölü / Bağlanmamış Kod](#6-ölü--bağlanmamış-kod)
8. [Öncelikli Aksiyon Listesi](#7-öncelikli-aksiyon-listesi)
9. [Doğrulama Notu](#8-doğrulama-notu-ana-agent)

---

## 0. Yönetici Özeti

Kod tabanı genel olarak **olgun ve disiplinli**: güvenlik guard zincirleri, tenant izolasyonu, enumeration-safe auth, kapsamlı index tasarımı, temiz tip kullanımı (`any` neredeyse yok, `@ts-ignore` sıfır), erişilebilir tasarım sistemi (atoms/molecules). **Kritik güvenlik açığı yok.** Asıl teknik borç şu 3 eksende toplanıyor:

1. **Backend'i tam ama frontend'i yapılmamış ~14 özellik** — en görünür olanı **KVKK üçlüsü** (veri dışa aktarma / anonimleştirme / kalıcı silme) ve **mentor görünürlük opt-in** akışı.
2. **Silme / referans bütünlüğü stratejisi eksik** — `hardDeleteUser` gerçek veri olan hesapta FK ihlaliyle patlar (KVKK silme hakkı teknik olarak çalışmayabilir).
3. **1 adet YÜKSEK güvenlik bulgusu** — `updateUser` yanıtı `password` hash'i ve tüm PII'yi sızdırıyor.

**Bulgu yoğunluğu (ana agent doğrulamasıyla):**

| Boyut | Kritik | Yüksek | Orta | Düşük |
|---|---|---|---|---|
| Güvenlik | 0 | 1 | 0 | 2 |
| Veritabanı | 0 | 2 | 4 | 3 |
| Backend-var/FE-yok | — | ~14 eksik özellik | ~12 ölü/ikame | ~9 kasıtlı |
| Erişilebilirlik | 0 | 2 | 3 | 3 |
| Gereksiz kod | 0 | 2 | 3 | 4 |
| Ölü kod | — | 3 kesin-ölü | 5 yarım-özellik | 2 dep temizliği |

---

## 1. Backend var / Frontend yok — bağlanmamış özellikler

`server.ts` mount haritası (23 route) → tüm endpoint'ler → `frontend/src` genelinde çağrı araması ile eşleştirildi. **Ana agent doğruladı:** aşağıdaki modüller frontend'de **0 eşleşme** verdi.

### 🔴 Muhtemel EKSİK özellik (backend hazır, FE yapılmamış) — ~14 adet

| Endpoint / Modül | Dosya | Değerlendirme |
|---|---|---|
| **KVKK veri dışa aktarma** `GET /api/users/:id/export` | `userRoutes.ts:180` | KVKK Md.20 — FE yok. ✅ doğrulandı (0 eşleşme) |
| **KVKK anonimleştirme** `POST /api/users/:id/anonymize` | `userRoutes.ts:170` | FE yok. ✅ doğrulandı |
| **KVKK kalıcı silme** `DELETE /api/users/:id/hard-delete` | `userRoutes.ts:175` | FE yok (+ backend'de de patlıyor, bkz. §3). ✅ doğrulandı |
| **Mentor görünürlük opt-in** `POST /api/mentors/:mentorId/visibility-optin` | `userRoutes.ts:89` | **Temel iş kuralı** (backend CLAUDE.md "opt-in gate"). FE bağlı değil. ✅ doğrulandı |
| **Admin double-opt-in onayı** `POST /api/admin/visibility-optin/:optInId/confirm` | `adminRoutes.ts:68` | Yukarıdakinin admin tarafı. FE yok. ✅ doğrulandı |
| **Kurum-içi şikayet inceleme** `GET/PATCH /api/admin/reports` | `adminRoutes.ts:81-82` | Sadece platform `user-reports` var, tenant-admin tarafı yok. |
| **Kulüp modülü (tümü)** `GET/POST/PATCH /api/clubs...` | `clubRoutes.ts:20-44` | Tüm FE yapılmamış. ✅ doğrulandı (0 eşleşme) |
| **Feedback-logs modülü (tümü)** `/api/feedback-logs...` | `feedbackLogRoutes.ts` | ML geri bildirim FE'si yok. ✅ doğrulandı |
| **Sosyal profil düzenleme** `PATCH /api/users/me/social` | `onboardingRoutes.ts:41` | FE yok. |
| **Toplantı feedback görüntüleme** `GET /api/meetings/:id/feedback` | `meetingRoutes.ts:91` | Sadece POST var, listeleme yok. |
| **Check-in özeti** `GET /api/meetings/:id/check-ins` | `meetingRoutes.ts:119` | Sadece POST var. |
| **Aktif toplantı poller** `GET /api/meetings/active` | `meetingRoutes.ts:53` | "MeetingProvider poller" yorumu var ama FE bağlanmamış (bkz. §6 ContextualFeedback kümesi). |

### 🟡 Muhtemel ÖLÜ / ikame edilmiş (başka endpoint devralmış) — ~12 adet

- **İki paralel platform-admin API'si:** `/api/super-admin/*` (superAdminRoutes — dashboard, tenant status/verify) tamamen kullanılmıyor; FE yalnız `/api/platform/*` kullanıyor. ✅ doğrulandı (`super-admin` → 0 eşleşme). **Birleştirme / temizlik adayı.**
- `tenantRoutes` CRUD: `POST /` (createTenant), `GET /` (list), `PATCH /:id` — platform route'larıyla örtüşüyor (yalnız `GET /:id` kullanılıyor).
- `POST /api/scoring/compute-profile`, `POST /api/scoring/rank-mentors` — eşleşme başka endpoint üzerinden.
- `POST /api/users/:id/temperament-test` — adaptive test ile ikame.
- `PATCH /api/users/:id/self-profile` — `me/profile` ile örtüşüyor.
- `POST /api/meetings/` (createMeeting), `PATCH /api/meetings/:id` — booking akışıyla ikame.
- `POST /api/admin/users/:id/rematch` — FE'de yok.

### 🟢 Kasıtlı backend-only (eksik DEĞİL) — ~9 adet
OAuth başlat/callback (×2), `unsubscribe`, `questions/respond` (bulk data-migration), `cron/run-tuning` + `cron/run-purge` (manuel admin tetikleme), `job-listings` modülü (planlı "future job board", backend CLAUDE.md'de belgeli).

> **DOĞRULANMALI:** Yöntem string-arama olduğundan dolaylı/değişkende tutulan çağrılar kaçmış olabilir. Kritik olanlar (opt-in, super-admin) manuel okumayla teyit edildi — 0 eşleşme gerçek.

---

## 2. Güvenlik

Genel duruş **güçlü**: guard zincirleri (`requireTenant → requireAuth/requireRole/requireSelfOrAdmin`), RLS extension + savunma-derinliği `findFirst({tenantId})`, enumeration-safe auth, Zod `.strict()` whitelist, IP-bazlı özel rate limiter'lar, parametreli `$queryRaw`, merkezi hata gizleme, helmet + explicit-origin CORS. **Kritik açık yok.**

### 🔴 [YÜKSEK] `updateUser` yanıtı `password` hash'i + tüm PII'yi sızdırıyor — `userController.ts:272-277` ✅ DOĞRULANDI
```ts
const updated = await prisma.user.update({ where: { id: existing.id }, data: parsed.data });
return res.json(updated);   // ← explicit select YOK → password hash + discVector + email + CV döner
```
- **Açık türü:** Aşırı veri döndürme / hassas alan ifşası.
- **Kanıt:** Global Prisma `omit` yok, `User.password String?` mevcut. Aynı dosyada `createUser`/`updateMyProfile`/`patchSelfProfile` explicit `select` KULLANIYOR — bu handler istisna/atlanmış.
- **Etki:** `PATCH /api/users/:id` `requireRole('ADMIN')`'e açık; tenant admin başka üyeyi güncellediğinde o üyenin bcrypt hash'i + ham PII yanıta düşer. CLAUDE.md "password ASLA dönmesin" invariantını ihlal.
- **Öneri:** Explicit `select` ekle (password hariç). Kalıcı çözüm: PrismaClient'a global `omit: { user: { password: true } }`.

### 🔵 [DÜŞÜK] OAuth access token'ı URL query string ile taşınıyor — `authController.ts:655-659`
Callback `res.redirect(...?accessToken=...)` → tarayıcı geçmişi/Referer/proxy log'una düşebilir. Token kısa ömürlü (1s), refresh HttpOnly cookie'de, FE token'ı memory'de tutuyor (localStorage'a yazmıyor — güvenli). Öneri: URL fragment (`#`) veya tek-kullanımlık code değişimi. Üretim-öncesi kabul edilebilir.

### 🔵 [DÜŞÜK] `createMeeting` oryantasyon kilidi tenant-scope'suz okuma — `meetingController.ts:78-91`
`checkOrientationLock` → `findUnique({id})` tenantId olmadan (findUnique RLS'ten muaf). Sonraki mentor/menti fetch'leri scope'lu olduğundan akış bozulmuyor; en fazla başka tenant userId için `needsOrientation` boolean çıkarımı. PII/yazma yok. Tutarlılık için `tenantId` eklenmeli.

---

## 3. Veritabanı

Şema (1241 satır, 42 migration) **olgun**: kapsamlı tenant-scoped bileşik index'ler, doğru composite `@@unique`'ler, yüksek transaction disiplini, batch-fetch ile N+1'den kaçınma, Neon-uyumlu idempotent (`IF NOT EXISTS`) migration'lar. Ana açık: **silme / onDelete stratejisi.**

### 🔴 [YÜKSEK] `hardDeleteUser` gerçek veri olan hesapta FK ihlaliyle patlar — `gdprService.ts:145-178` ✅ DOĞRULANDI
- **Kanıt:** Transaction yalnız `UserResponse, VisibilityOptIn, MatchRequest, ClubMembership, FeedbackLog, UserProfile` siliyor. `Meeting`, `Feedback`, `MeetingCheckIn`, `Conversation`, `Message`, `UserReport`, `MentorshipAgreement`, `PendingTag` FK'leri `ON DELETE RESTRICT` → `tx.user.delete()` patlar. **Kodun kendi yorumu (satır 171-174) bunu itiraf ediyor:** *"Meeting.mentorId/mentiId nullable hale getirilmeli (ADIM 9 öneri)"*.
- **Risk:** KVKK Md.7 silme hakkı gerçek kullanıcıda teknik olarak yerine getirilemez (transaction rollback).
- **Öneri:** Silme öncesi bu tabloları temizle VEYA istatistik için korunacaklarda (Meeting/Feedback) userId'yi nullable + `onDelete: SetNull` yap. Sil vs anonimleştir = PO kararı.

### 🔴 [YÜKSEK] onDelete stratejisi tanımsız (çoğu FK = RESTRICT) — `schema.prisma` geneli
User/Tenant silimlerinde orphan/rollback riski; nullable+SetNull kararı verilmemiş. `cronScheduler.staleDraftCleanup` (`:187-188`) da tenant silmeden önce yalnız `user.deleteMany` yapıyor, transaction dışında — dolu draft tenant silinemez (sessizce yutulur).

### 🟡 [ORTA] Konuşma listesi N+1 (2N+1 sorgu) + pagination yok — `conversationController.ts:236-261`
Her konuşma için ayrı `message.count` + `message.findFirst`. Öneri: `lastMessageAt` denormalize (zaten var) / tek `groupBy`.

### 🟡 [ORTA] Pagination'sız liste sorguları — `requestController.ts:89`, `feedbackLogController.ts:125`, `clubController.ts:90`, `conversationController.ts:230`
`take` yok → tenant büyüdükçe sınırsız satır. (Not: `userReport`/`systemLog`/`user` listeleri `take` kullanıyor — iyi.)

### 🟡 [ORTA] String-tabanlı enum adayları — `schema.prisma`
`UserReport.reason/status` (:1149-1151), `InvitationTemplate.role/format` (:1230-1231 — `UserRole` enum'u varken), `Tenant.plan/onboardingStep/...` (:162-178), `MeetingCheckIn.*` (:553-562), `MentorshipAgreement.*` (:1193-1198). DB seviyesinde geçersiz değer engellenmez, yalnız Zod'a güven.

### 🟡 [ORTA] Çift rol kaynağı — `User.role` (:234) + `TenantMembership.role` (:1062)
CLAUDE.md "kurum-içi rol TenantMembership.role üzerinden, User.role DEĞİL" diyor. `User.tenantId` (:233) de membership pivot ile çift-kaynak. `User.role`/`User.tenantId`'nin legacy mi terk mi olduğu netleştirilmeli (00-KARAR-TAKIP'e çift-kaynak adayı).

### 🔵 [DÜŞÜK] Diğer
`User.email` global `@unique` (:235) — multi-tenant modelde aynı e-posta farklı kurumlarda çakışır (**DOĞRULANMALI** — kasıtlı global-user kararı olabilir). Meeting çakışma sorgusu için `(mentorUserId, startsAt)` bileşik index yok. Migration idempotent pattern drift'i garanti etmez → periyodik `prisma migrate diff` (DB erişimi gerektiğinden DOĞRULANMALI).

---

## 4. Erişilebilirlik (a11y)

**Olgunluk: Orta-Yüksek.** Merkezi tasarım sistemi örnek nitelikte: doğru `focus-visible:ring` (tehlikeli `outline-none`-tek-başına deseni **hiç yok**), `role="alert"` hata mesajları, `aria-describedby`/`aria-invalid` wiring, native `<dialog>` (`ConfirmDialog`), radiogroup (`LikertScale`), tutarlı `aria-hidden` ikonlar, tüm `<img>`'lerde anlamlı `alt`, `<html lang="tr">`, landmark'lar. Sorunlar **merkezi bileşenleri atlayıp elle yazılan** birkaç form/modalda toplanmış — sistemik değil, noktasal borç.

### 🔴 En kritik 5
1. **[Yüksek] `ReportUserButton` şikayet modalı** — `role="dialog"`/`aria-modal` yok, Escape kapatmıyor, focus trap/focus taşıma yok — `ReportUserButton.tsx:57-61`. ✅ DOĞRULANDI (0 eşleşme). Öneri: native `<dialog>`+`showModal()` (`ConfirmDialog` deseni).
2. **[Yüksek] Soru yönetimi formu** — 3 `<select>` + `<textarea>` label/aria-label'sız, erişilebilir isimsiz — `admin/questions/page.tsx:133-166`.
3. **[Orta] `MeetingScheduler` `Field`** — etiket `<span>` ile, `htmlFor`/`id` bağı yok — `MeetingScheduler.tsx:212-218`. (Not: bu bileşen aynı zamanda ölü, bkz. §6.)
4. **[Orta] `DailyQuestionWidget`** — tek-seçim grubu radiogroup/radio deseni olmadan düz buton yığını (seçim yalnız renkle belli), `LikertScale` varken kullanılmamış — `DailyQuestionWidget.tsx:81-94`.
5. **[Orta] `ContextualFeedbackHost` dialog** — `aria-labelledby` başlık bağı + focus yönetimi eksik — `ContextualFeedbackHost.tsx:37-41`.

### 🔵 Düşük
Admin menü emoji ikonları `aria-hidden`'sız (metin etiketi yanında olduğundan kritik değil), Register KVKK checkbox hatası `aria-describedby` ile bağlı değil, `ProfileStep` sektör select'i `aria-label`'sız.

**Sorun YOK:** görsel alt metinleri, dil/landmark/başlık hiyerarşisi, focus göstergesi, ARIA geçerliliği.

---

## 5. Gereksiz / Şişkin Kod

Kod beklenenden **temiz**: backend'de yalnız 4 `any`, sıfır `@ts-ignore`, prod'da debug `console.log` kaçağı yok, ölü yorum minimal. Borç iki eksende: controller boilerplate tekrarı + birkaç aşırı büyük handler.

### 🔴 Yüksek etkili
1. **Zod doğrulama-hata bloğu ~85 yerde birebir kopya** (30 dosya) — `{ safeParse; if(!success) return 400 VALIDATION }`. Öneri: `validate(schema)` middleware / `parseOrRespond()` helper → 85 tekrar tek tanıma.
2. **Refresh-token/cookie güvenlik yardımcıları iki controller'da duplike** — `authController.ts:54-103` ↔ `selfServeController.ts:12-36` (`BCRYPT_ROUNDS=12`, `REFRESH_COOKIE_NAME`, `setRefreshCookie()`...). Güvenlik-hassas; biri değişirse diğeri unutulur. Öneri: `services/refreshToken.ts`'e çıkar.

### 🟡 Orta
3. **100+ satırlık handler'lar** — `selfServeRegister` (140), `login` (137), `adminListUsers` (118), `completeProfile` (107), `getKpiDashboard` (103). İş mantığı service'e çıkarılmalı (`analyticsEngine`/`kpi.service` deseni mevcut, bu handler'lar kaçmış).
4. **Ağır Prisma agregasyonu doğrudan controller'da** — `getKpiDashboard` `adminController.ts:36-120` (8'li `Promise.all`).
5. **`{fullName, email}` PII-select bloğu 11+ yerde elle** — Öneri: `USER_CONTACT_SELECT` sabiti (KVKK denetlenebilirliği + DRY).

### 🔵 Düşük
NPS yuvarlama 3 yerde, slug regex 2 yerde, FE DISC etiket/renkleri 5 dosyada dağınık (`lib/constants/disc.ts`'e topla), yorum-bloğuna alınmış eski kod 4 dosyada (`notificationService.ts:50-52` push stub, `matchingInterface.ts:67-74`, `sector-scorer.service.ts:95-97`), `matching.ts`'te 4 `any`.

---

## 6. Ölü / Bağlanmamış Kod

> **İlke:** "Sil" varsayılan değil — çoğu bağlanmamış kod yarım kalmış özelliğin parçası. Niyet değerlendirmesi yapıldı; silme = PO kararı. **Yöntem güveni yüksek:** FE'de hiç `dynamic()`/`React.lazy()` yok, backend route'ları tamamen `server.ts`'te mount, barrel/index re-export yok → statik grep güvenilir.

### 🔴 Kesin-ölü (yüksek güven)
| Öğe | Kanıt | Öneri |
|---|---|---|
| `services/llmRetry.ts` (`fetchWithRetry`) | ✅ 0 importer (tüketicisi matchReason/iceBreaker silinmiş, LLM decommissioned) | sil-PO / gerekçeyle sakla + yorumu düzelt |
| `context/TenantContext.tsx` (`TenantProvider`) | ✅ 0 import — canonical olan `providers/TenantProvider.tsx` (2 farklı tasarım, kafa karışıklığı) | sil-PO |
| `organisms/MeetingScheduler.tsx` (231 satır) | ✅ 0 dış import — `mentor/availability/page.tsx` aynı mantığı inline kopyalamış | sil-PO / sayfayı bu bileşene refactor |

### 🟡 Muhtemel yarım-özellik (silmek niyeti yok eder → araştır)
| Öğe | Değerlendirme |
|---|---|
| `matchingInterface.ts` (`MatchStrategy`...) | JOB_LISTING polimorfik eşleştirme iskeleti (planlı, backend CLAUDE.md'de belgeli) |
| `sector-scorer.service.ts` | 5-bileşenli alternatif sektör-skorlama modeli, hiçbir controller'a bağlı değil |
| `profile-completeness.service.ts` + FE `ProfileStrengthCard.tsx` | Uçtan uca bağlanmamış "profil gücü" özelliği (endpoint yok, kart mount edilmemiş) |
| `ContextualFeedbackHost` + `context/MeetingContext` + `MeetingFeedbackCard` | "Bağlamsal toplantı geri bildirimi" kümesi — hiçbir layout'a mount edilmemiş (bkz. §1 `meetings/active` poller) |
| `organisms/TenantSwitcher.tsx` (212 satır) | Çok-kurumlu kurum-değiştirme dropdown'u, nav'a konmamış (TenantMembership çok-kurum modeliyle uyumlu) |

### 🔵 Dependency / script temizliği
- **5× kullanılmayan `@radix-ui/*`** (`react-avatar`, `react-dialog`, `react-dropdown-menu`, `react-separator`, `react-toast`) — FE'de 0 import (dialog'lar elle `molecules/*Dialog.tsx`'te). Kaldırmadan önce `npm run build` yeşil kalmalı (DOĞRULANMALI). Backend dependency'lerin tümü kullanımda.
- `seed-certification.ts`, `seed-learning-journey.ts` — package.json script'te değil; muhtemel manuel araç (CLAUDE.md `seed-learning-journey`'i güvenli sayıyor).

**Yanlış-pozitif elenenler (ölü DEĞİL):** `scoring.test-cases.ts` (`test:scoring` script'i), `resetRateLimiters` (test yardımcısı), `platformFetch` (cookie-tabanlı platform akışı — `apiClient`'tan ayrı meşru).

---

## 7. Öncelikli Aksiyon Listesi

Etki × kolaylık sırasıyla önerilen sıra (kararlar PO'nun):

1. **[Güvenlik/YÜKSEK]** `updateUser`'a explicit `select` ekle + global `omit: {user:{password}}` → password hash sızıntısını kapat. *(Düşük risk, hızlı.)*
2. **[DB/YÜKSEK]** `hardDeleteUser` FK zincirini tamamla / SetNull stratejisi belirle → KVKK silme hakkını çalışır yap. *(Migration gerektirir — sil vs anonimleştir PO kararı.)*
3. **[Uyum/EKSİK]** KVKK üçlüsü FE'sini bağla (export/anonymize/hard-delete) — backend hazır. *(Md.20 görünürlük boşluğu.)*
4. **[İş kuralı/EKSİK]** Mentor görünürlük opt-in + admin double-opt-in confirm FE'sini bağla — "opt-in gate" temel kural.
5. **[Temizlik/YÜKSEK]** Zod doğrulama boilerplate'ini middleware'e + refresh-token helper'larını paylaşılan modüle al. *(Düşük risk, yüksek getiri.)*
6. **[a11y/YÜKSEK]** `ReportUserButton` modalını `ConfirmDialog` desenine (native `<dialog>`) taşı + admin/questions form label'ları.
7. **[Mimari]** İki paralel platform API'sini (`super-admin` vs `platform`) netleştir/birleştir; kesin-ölü 3 dosyayı PO onayıyla temizle.
8. **[DB/ORTA]** Konuşma listesi N+1 + pagination'sız liste endpoint'lerine `take` ekle.

---

## 8. Doğrulama Notu (ana agent)

6 paralel salt-okuma agent'ının çıktıları ana agent tarafından **koddan bağımsız doğrulandı.** Yüksek/kritik iddiaların hepsi teyit edildi:

| İddia | Doğrulama |
|---|---|
| `updateUser` password sızıntısı | ✅ `userController.ts:272-277` okundu — `.update` select yok |
| `hardDeleteUser` FK patlaması | ✅ `gdprService.ts:171-174` — kod-yorumu sorunu itiraf ediyor |
| visibility-optin / super-admin / KVKK / clubs / feedback-logs FE'de yok | ✅ `frontend/src`'te 0 eşleşme |
| `llmRetry.ts` / `context/TenantContext.tsx` / `MeetingScheduler.tsx` ölü | ✅ 0 dış importer |
| `ReportUserButton` modal role/aria-modal yok | ✅ 0 eşleşme |

**"DOĞRULANMALI" işaretli, DB/dinamik erişim gerektiren ve teyit edilemeyenler** (canlı DB'ye yazma yasağı gereği açık bırakıldı): `User.email` global-unique kararının kasıtlılığı, migration drift (`prisma migrate diff`), radix paketleri kaldırınca build yeşil kalır mı. Bunlar ilgili maddede işaretlendi.

---

*Belge senkron notu: Bu salt-okuma analiz turudur; kod/durum değişmedi → `09-DURUM.md`/`00-KARAR-TAKIP.md` güncellemesi gerekmedi. Bu rapor bulguları içerir; bir sonraki iş turunda seçilen maddeler karar-takibe taşınabilir.*
