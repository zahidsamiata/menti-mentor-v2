# STK Yönetici (Tenant Admin) Paneli — Envanter (Keşif)

**Tarih:** 2026-08-02
**Mod:** Salt-okuma keşif. Kod değişmedi.
**Rol:** STK YÖNETİCİSİ = **tenant admin** (role `ADMIN`, bir dernek/kulüp başkanı, SADECE kendi kurumunu yönetir).
**Yetki felsefesi (ürün sahibi):** DENGELİ — yönetici izlesin + kritik birkaç aksiyon alabilsin.
**Amaç:** STK yönetici stratejisini gerçek kod zemini üstüne kurmak — şu an ne var, ne görüyor, ne değiştirebiliyor, dengeli-yetki açısından ne eksik.
**Yöntem:** 3 Explore agent'ı (frontend `(admin)` sayfaları, backend admin controller/route/middleware, Prisma şeması). Güvenlik-kritik bulgular elle teyit edildi. Her bulgu dosya:satır kanıtlı.

> ⚠️ **KRİTİK AYRIM:** Tenant admin (`requireRole('ADMIN')` + X-Tenant-Id izolasyonu) **≠** Platform admin
> (`/api/platform/*`, `/api/super-admin/*`, `isPlatformAdmin` — sistem sahibi). Bu rapor **SADECE tenant admin**
> içindir; platform admin ayrı bir keşif olacak. Tenant izolasyonu (her kurum sadece kendini görür) bu rolün en kritik kuralı.

---

## Özet Tablo

| Boyut | Durum | Kısa |
|-------|-------|------|
| 1 Görme / İzleme | ✅ VAR (geniş) | 15 sayfa + KPI özet; drill-down yok |
| 2 Aksiyon / Müdahale | ✅ VAR (geniş) | onay/rematch/admin/settings; nudge yok, manuel eşleştirme yarım |
| 3 Yetki Sınırları | ✅ SAĞLAM | RLS + membership guard + max 3 admin; adminSettings farklı desen |
| 4 Sistem Akışı | ✅ VAR | kayıt→tenant+admin; ilk giriş = onay kuyruğu |
| 5 Veri Envanteri | 🟡 KISMEN | çekirdek metrik var; **retention/aktiflik verisi YOK** |

---

## BOYUT 1 — Görme / İzleme → ✅ VAR (geniş; drill-down yok)

**15 admin sayfası** (`frontend/src/app/(admin)/admin/`):
approvals, invite, **kpi**, mentor-havuzu, menti-havuzu, eslesmeler, sertifika-sonuclari,
branding, waiting-room, managers, certification, questions, tags, algorithm-tuner, learning-journey.

**Özet dashboard VAR — `/admin/kpi`** → `GET /api/admin/kpi` (`adminController.ts:31-119`),
aggregate & PII-free:
- Toplam aktif üye (`User.isActive=true`), rol dağılımı (ADMIN/MENTOR/MENTI).
- Aktif eşleşme (`VisibilityOptIn` APPROVED), bekleyen opt-in (PENDING).
- NPS ortalaması (faz bazlı) + 3. ay başarı oranı, rematch öncelikli kullanıcı sayısı, aktif iş ilanı.

**11 GET okuma endpoint'i** (`adminRoutes.ts`), hepsi `requireTenant + requireRole('ADMIN')` (`adminRoutes.ts:33-35`):
kpi, users (filtre: role/approvalStatus/rematchOnly/sayfalama), matches, certification-results,
coaching-suggestions, managers, tags/pending, algorithm-tuner/pending, certification, questions, learning-journey.

**Değerlendirme (dengeli yetki):** İzleme tarafı zengin.
- 🟡 **Drill-down YOK:** KPI sadece sayı; "tıkla → o gruptaki kişiler" yok.
- 🟡 A8 DISC soruları / öğrenme yolculuğu: kod sağlam ama **seed uygulanmamış** → boş görünüyor (veri sorunu, kod değil).
- KVKK: eşleşme paneli ad+arketip+skor döner, discVector/email göstermez (`adminController.ts:217-229`).

---

## BOYUT 2 — Aksiyon / Müdahale → ✅ VAR (geniş); 🟡 manuel eşleştirme yarım; ❌ nudge yok

**Onboarding kararı:** approve / reject / request-correction
(`adminController.ts:427 / 511 / 468`); self-approve engelli. Ret → e-posta bildirimi.

**Eşleşme müdahalesi:**
- Rematch tetikle (`adminController.ts:305`) — opt-in'leri PENDING'e al, `rematchPriority=true`.
- Double-opt-in confirm (`adminController.ts:370`) — PENDING → APPROVED.
- Admin mentor aday listesini görür (`matchingController.ts:39`, IDOR korumalı).
- Admin visibility-optin verebilir (`matchingController.ts:80`).

**Kullanıcı yönetimi:** create/update (`userRoutes.ts`), KVKK anonymize + hard-delete + export.

**Yönetim & konfigürasyon:**
- promote/demote-admin (**max 3**, son-admin guard — `adminController.ts:602/644-651`).
- tag onay/ret/merge, algorithm-tuner onay/ret, manuel cron (tuning/purge).
- tenant settings güncelle + block-pair (`adminSettingsController.ts`).

**Eksikler:**
- 🟡 **Manuel eşleştirme YARIM:** admin PENDING opt-in'i **onaylar** ama **sıfırdan yeni çift OLUŞTURAMAZ** (net "admin bu mentör↔bu menti eşleştir" create akışı/UI'si yok; `setVisibilityOptIn` ADMIN|MENTOR'a açık `userRoutes.ts:62-66` ama pratikte mentor akışı — teyit gerek).
- ❌ **Pasif/takılan kullanıcıya nudge/hatırlatma YOK:** cron'da draft-tenant + feedback + agreement reminder var, ama admin-tetikli üye dürtme aracı yok.

---

## BOYUT 3 — Yetki Sınırları → ✅ SAĞLAM; 🟡 adminSettings farklı desen

**Tenant izolasyonu güçlü** (`middleware/tenant.ts:20-107`):
X-Tenant-Id doğrula → JWT↔header cross-tenant engeli (`:66`) → `TenantMembership.isActive` kapısı
(`:82-97`) → `runWithTenant` RLS extension tüm sorguya `tenantId` enjekte eder.

**Çoklu admin:** `MAX_ADMINS_PER_TENANT = 3` (`adminController.ts:602`); demote'te son-admin guard
(`:644-651` — kurumun son yöneticisi düşürülemez).

**IDOR:** `/api/admin/*` endpoint'lerinin çoğu `tenantId: req.tenant.tenantId` ile filtreli — güvenli
(promote/rematch/users/matches örnekleri doğrulandı).

**🟡 DİKKAT (elle teyit edildi):** `adminSettingsRoutes.ts` (`PATCH /tenants/:id/settings`, `POST /tenants/:id/block-pair`)
**`requireTenant`/`requireRole` middleware KULLANMIYOR** (satır 9 yorumu: "X-Tenant-Id gerektirmez — JWT
Bearer + tenantId URL param eşleşmesiyle korunur"). Koruma controller içinde manuel:
`payload.tenantId !== req.params.id → 403` (`adminSettingsController.ts:83`). İşlevsel olarak izole
görünüyor AMA `/api/admin/*`'tan **farklı/zayıf desen** (middleware zinciri dışı, controller-içi manuel).
Kart/retention işi bu route'lara dokunursa **izole denetim önerilir**.

---

## BOYUT 4 — Sistem Akışı → ✅ VAR (aksiyon-öncelikli)

**Kayıt (self-serve):** `selfServeController.ts:236-354` → tek transaction'da Tenant + ilk ADMIN
(`approvalStatus=APPROVED` — kurucu direkt onaylı) + TenantMembership. Domain'e göre
`verificationStatus`: kurumsal → `AUTO_APPROVED`, diğer → `PENDING_REVIEW` (`:244-245`).

**İlk giriş:** `/admin` → **redirect `/admin/approvals`** (`admin/page.tsx`) — yöneticinin ilk
aksiyonu "kimi içeri alayım". Boş özet değil, aksiyon kuyruğu.

**Onboarding wizard:** Şablon (MEZUN/KULUP/GONULLU/OZEL) → DISC (yöneticinin kişisel testi) → Branding (logo+renk) → Done.

**Menü** (`(admin)/layout.tsx`): 3 ana sekme (👤 Onay, 📨 Davet, 📊 Program) + ~12 gelişmiş (havuzlar, eşleşmeler, sertifika, marka, yöneticiler, algoritma, soru, etiket, öğrenme yolculuğu). Dar pencerede daraltılır.

---

## BOYUT 5 — Veri Envanteri → 🟡 çekirdek var, retention verisi YOK

**✅ Hazır (KPI'da hesaplanıyor):**
- Üye sayısı + rol dağılımı; aktif/bekleyen eşleşme (VisibilityOptIn); rematch kuyruğu; NPS/feedback; aktif iş ilanı.
- Ortalama uyum skoru türetilebilir (`Match.predictedScore`).

**🟡 Kısmen (veri var, aggregate/JOIN yazılmalı):**
- Görüşme sayıları — `Meeting` modeli (`schema.prisma:425`) var, KPI'da aggregate yok; sadece bireysel `listMeetings`.
- Onboarding tamamlama % — alanlar var (`approvalStatus`, `discAssessmentCompletedAt`, `needsOrientation`), hesaplama logic'i yok.
- **Mentörsüz menti** — `User × VisibilityOptIn` JOIN + count=0 logic'i gerekir.
- **Ölü eşleşme** — `Match × Meeting` count=0 JOIN gerekir.

**❌ KRİTİK EKSİK (retention'ın temeli):**
- `lastLoginAt` / `lastActiveAt` **User modelinde HİÇ YOK** (`schema.prisma:226-325`).
  → Pasif üye / haftalık aktiflik / churn **hesaplanamaz**.
- `RefreshToken.createdAt` yanlış proxy (7 gün ömürlü + yenilenir).
- `SystemLog` (`:561-574`) teorik olarak aktiflik türetebilir ama analytics'te kullanılmıyor.

**Not — "eşleşme" iki modelde:** `VisibilityOptIn` (opt-in kapısı, `:327`) + ayrı `Match` (`:906`).
KPI'nın "activeMatches"i aslında **onaylı opt-in sayar**, `Match` satırı değil. Metrik işinde bu ayrım netleşmeli.

**Metrik taslağına karşı skor** (yonetici-persona-ve-metrikler raporu S1/S2/S3):
mevcut veriyle ~7/14 metrik ✅, ~5/14 🟡 (query yazılmalı), ~2/14 ❌ (yeni alan `lastLoginAt` gerekir).

---

## SONUÇ — Dengeli yetki gözüyle ne var, ne eksik

- **İzleme tarafı:** ✅ güçlü (15 sayfa + KPI özet). Eksik: **drill-down** + **retention/aktiflik verisi**.
- **Aksiyon tarafı:** ✅ geniş (onay / rematch / admin yönetimi / settings / block-pair). Eksik: **pasifi dürtme (nudge)** + **sıfırdan manuel eşleştirme** + görüşme/ölü-eşleşme görünürlüğü.

### En kritik 5 eksik (öncelik sırası)
1. ❌ **`lastLoginAt`/`lastActiveAt` yok** → RETENTION turunun (yol haritası md.4) **TEMEL verisi eksik**. Schema alanı + login handler güncellemesi + KPI sorgusu gerekir. **En kritik.**
2. 🟡 **KPI drill-down yok** → "programım nasıl gidiyor" sayıdan kişiye inemiyor; yönetici-persona S1/S2/S3'ün aksiyon kısmı eksik.
3. ❌ **Nudge/hatırlatma aracı yok** → pasif üye / ölü eşleşmeye admin müdahalesi yok (retention'ın davranışsal kolu).
4. 🟡 **Görüşme + mentörsüz menti + ölü eşleşme metrikleri** → veri var, KPI aggregate/JOIN yazılmalı (S2 "kimse kaynıyor mu").
5. 🟡 **Manuel eşleştirme (yeni çift oluşturma)** → dengeli-yetki "kritik aksiyon" için eksik; şu an sadece onay var.

### İstatistik/özet dashboard durumu
VAR (`/admin/kpi`) ama **sığ**: aggregate sayı, drill-down yok, retention metriği yok.
**Retention turu = bu paneli derinleştirmek** (drill-down) + **`lastLoginAt` altyapısı** + eksik JOIN/aggregate metrikleri.

### ⚠️ Tenant izolasyonu / IDOR
Genel mimari **sağlam** (RLS extension + membership guard + cross-tenant engeli + max-3/son-admin guard).
Tek dikkat: `adminSettingsRoutes` middleware kullanmıyor (controller-içi manuel tenantId kontrolü) —
kasıtlı ama farklı/zayıf desen; **izole denetim önerilir**. Bugün kapatılan 2 IDOR dışında yeni net açık
görülmedi (**teyit gerek**).

---

## Strateji kurarken bilinmesi gereken en kritik 5 bulgu
1. **İzleme geniş, aksiyon geniş** — panel dengeli-yetki felsefesine büyük ölçüde zaten uygun. Sıfırdan kurmak değil, **derinleştirmek** gerekiyor.
2. **Retention verisi yok (`lastLoginAt`)** — yönetici "programım yaşıyor mu / kim kaynıyor" sorusuna cevap veremiyor; bu, retention turunun ön koşulu.
3. **KPI var ama drill-down yok** — sayıdan kişiye inememe, yöneticinin aksiyona geçmesini engelliyor.
4. **Nudge/manuel-eşleştirme boşluğu** — "kritik aksiyon alabilsin" tarafının iki somut eksiği bunlar.
5. **adminSettings farklı güvenlik deseni** — mimari genelde sağlam; bu route istisna, ileride dokunulursa dikkat.
