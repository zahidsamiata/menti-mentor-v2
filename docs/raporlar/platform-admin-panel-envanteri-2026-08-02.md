# Platform Admin Paneli — Envanter (Keşif)

**Tarih:** 2026-08-02
**Mod:** Salt-okuma keşif. Kod değişmedi.
**Rol:** PLATFORM ADMIN (sistem sahibi = Zahid, TÜM sistemi yönetir; `isPlatformAdmin`, `/api/platform/*`).
**Strateji felsefesi (Zahid):** "BASİT YÜZEY + DERİN ARKA ODA" — sade dashboard, istenince en detaya (kurum→kullanıcı→görüşme) inme; tam görünürlük ama loglu.
**Yöntem:** 3 Explore agent'ı (backend platform controller/route/middleware, frontend `platform/` sayfaları, Prisma). İki headline bulgu (drill-down frontend'de yok, lastLoginAt platform'da yok) elle teyit edildi. Her bulgu dosya:satır kanıtlı.

> ⚠️ **KRİTİK AYRIM:** Platform admin (sistem sahibi, `/api/platform/*`, `isPlatformAdmin`) **≠** STK yönetici
> (tenant admin, `requireRole('ADMIN')`, `/api/admin/*`). Bu rapor **SADECE platform admin** içindir; STK yönetici
> ayrı incelendi (stk-yonetici-panel-envanteri-2026-08-02.md).

---

## Özet Tablo

| Boyut | Durum | Kısa |
|-------|-------|------|
| 1 Giriş / Ayrım | ✅ AYRI KATMAN | aud:'platform' + isPlatformAdmin + HttpOnly cookie; 5-sekme dashboard |
| 2 Büyüme Nabzı | 🟡 KISMEN | anlık sayı var; trend + aktiflik (lastLoginAt) YOK |
| 3 Sistem Sağlığı | ✅ VAR (temel) | /health + SystemLog + log paneli; mail göstergesi yok |
| 4 Kötüye Kullanım | ✅ manuel tam | şüphe bildirimi akışı var; otomatik anomali yok |
| 5 Kurum Yön. + Drill-down | ✅ / 🔴 | yaşam döngüsü var; **drill-down backend HAZIR / frontend YOK** |
| 6 Yetki + Güvenlik | ✅ SAĞLAM | tüm-tenant erişim + PII maske + AUDIT log + rate limit |

---

## BOYUT 1 — Giriş / Ayrım → ✅ AYRI KATMAN (sağlam)

- **Gerçekten ayrı auth:** JWT `aud: 'platform'` claim + `isPlatformAdmin` + `requirePlatformAdmin`
  (`platformAuth.ts:27`, çift kontrol: hem flag hem aud). Tenant admin token'ında `aud` YOK → platform
  endpoint'inde geçersiz sayılır (`jwtAuth.ts:10-18`).
- **Giriş:** `platformLogin` (`platformController.ts:30-57`) — config'ten email + key (`config.ts:31,47-48`),
  **timing-safe** karşılaştırma (`safeEqual`, `:18-27`), HttpOnly `platform_token` cookie (1s, sameSite strict,
  secure prod, path `/api/platform`).
- **Frontend:** `frontend/src/app/platform/` — `/platform/login` (email+şifre) + `/platform/dashboard`
  (5 sekme: Genel Bakış, Bekleyen Başvurular, Tüm Kurumlar, Şüphe Bildirimleri, Sistem Logları).
- **Mount:** `server.ts:83` `/api/platform` (`platformRoutes`); ayrıca `/api/super-admin` (`superAdminRoutes`) — dashboard/status/verify.

---

## BOYUT 2 — Büyüme Nabzı → 🟡 anlık sayı VAR, trend + aktiflik YOK

- ✅ **`GET /api/platform/stats`** (`platformController.ts:66-126`): sistem-geneli TOPLAM — kurum sayısı,
  kullanıcı (rol dağılımı: mentor/menti/admin), görüşme (pending/completed), bekleyen kurum, incelenmemiş
  rapor, son loglar. Dashboard 8 kartta gösterir.
- ❌ **Büyüme trendi / zaman serisi YOK:** "bu ay yeni kurum/kullanıcı", ivme/artış (↑/↓) yok. Sadece anlık snapshot.
  Hesaplamak için `createdAt` + tarih-filtre JOIN yazılmalı (kod yok).
- ❌ **`lastLoginAt` platform seviyesinde KULLANILMIYOR (elle teyit edildi):** `platformController.ts`
  bu alanı hiç okumuyor. Sistem-geneli "kaç üye aktif/pasif" yok. STK tarafında `retentionMetrics.service.ts`
  (tenant-scoped) + `/api/admin/health-metrics` var; **platform-geneli sürümü YOK → ortak eksik (bkz. sonuç).**

---

## BOYUT 3 — Sistem Sağlığı → ✅ VAR (temel); 🟡 mail göstergesi yok

- ✅ **Health:** `GET /health` (`server.ts:52-58`) — DB + uptime + versiyon.
- ✅ **Log görünürlüğü:** `SystemLog` modeli (`schema.prisma:566-579`; INFO/WARN/ERROR + kategori
  EMAIL/AUTH/DB/HTTP/SYSTEM/AUDIT). `GET /api/platform/logs` (`platformController.ts:150-166`, level/kategori
  filtre) → dashboard "Sistem Logları" sekmesi (renk kodlu). `logger.ts` altyapısı panele **bağlı**.
- 🟡 **Mail durumu açık gösterge YOK:** gönderim hataları ERROR log'a düşer (filtreyle görülebilir) ama
  "mail gidiyor mu" ayrı bir sağlık kartı yok.

---

## BOYUT 4 — Kötüye Kullanım → ✅ manuel akış tam; ❌ otomatik yok

- ✅ **Şüphe bildirimi:** `SuspicionReport` (`schema.prisma:1068-1080`). Public form
  `POST /api/suspicion-reports` (auth'suz, `generalRateLimiter` korumalı). Platform admin:
  `GET /api/platform/suspicion-reports` + `POST /:id/review` (not ekleme, `platformController.ts:275-302`)
  → dashboard sekmesi + incelenmemiş badge.
- ❌ **Otomatik anomali/anormallik tespiti YOK** — tamamen kullanıcı-bildirimi.
- ⚠️ **KVKK notu:** `SuspicionReport`'ta `tenantId` YOK (raporlar global) + `reporterName/contact` maskesiz
  döner. Reporter PII maskeleme yok (teyit gerek — düzeltme adayı).

---

## BOYUT 5 — Kurum Yönetimi + Drill-down → ✅ yaşam döngüsü; 🔴 drill-down backend VAR / frontend YOK

- ✅ **Yaşam döngüsü:** approve / reject / freeze / activate (`platformController.ts`;
  `Tenant.verificationStatus` = AUTO_APPROVED/PENDING_REVIEW/APPROVED/REJECTED + `isActive`).
  ❌ **Tenant DELETE YOK** — sadece freeze (disable). KVKK Md.7 (silinme hakkı) karşılanmıyor.
- ✅ **Kurum listesi:** `GET /tenants/pending` + `GET /tenants` (sayfalı, `_count.users`, plan, durum, verification note).
- 🔴 **DRILL-DOWN — "derin arka oda" BACKEND HAZIR ama FRONTEND YOK (hayalet-backend deseni):**
  - Backend `platformTenantController.ts` **4 endpoint** (route `platformRoutes.ts:52-55`):
    `/tenants/:id/overview` (`:82-156`), `/members` (`:158-217`), `/meetings` (`:219-254`), `/analytics` (`:256-284`).
    Üye/görüşme/DISC-dağılımı döner — **PII maskeli + AUDIT loglu**.
  - AMA frontend `lib/api/platform.ts` bu 4 fonksiyonu **çağırmıyor (elle teyit edildi: yok)** + dashboard'da
    "kurum detay" sekmesi YOK. → Platform admin "Tüm Kurumlar"dan bir kuruma tıklayıp içine **inemiyor**.
  - **Tek-kullanıcı profil drill-down endpoint'i de YOK** (`/tenants/:id/users/:userId` yok); üye listesi
    var ama tam profile inilemiyor (zaten ham profil maskeli tutuluyor).

---

## BOYUT 6 — Yetki + Güvenlik → ✅ SAĞLAM; 🟡 küçük notlar

- ✅ **Tüm tenant erişimi:** platform admin `requireTenant`/RLS'i bypass eder (X-Tenant-Id taşımaz;
  `runWithTenant` çağrılmaz). Erişim URL param + manuel `where: { tenantId }` filtresiyle izole —
  cross-tenant sızıntı yok.
- ✅ **PII maskeleme:** üye listesinde `maskEmail` (`platformTenantController.ts:186-211`) + sadece
  `discType` (kategorik D/I/S/C); ham `discVector`/`selfProfile`/`temperamentJson` **ASLA seçilmez**.
- ✅ **KVKK AUDIT loglama VAR:** drill-down endpoint'leri `audit('VIEW_TENANT_OVERVIEW|MEMBERS|MEETINGS|ANALYTICS', tenantId, req)`
  → `logger.info('AUDIT', ...)` → SystemLog (actor + tenantId + IP). "Kim neye ne zaman baktı" kaydı hazır.
- ✅ **Rate limit:** `platformAuthRateLimiter` (10/dk IP, brute-force) + `platformReadRateLimiter` (120/dk IP).
- 🟡 `PLATFORM_ADMIN_EMAIL` `.env.example`'da yok → prod'da default `admin@platform.local`'a düşme riski (dok. eksik; `PLATFORM_ADMIN_KEY` prod'da zorunlu override'lı).
- ✅ STK'daki `adminSettings` zayıf güvenlik deseni (middleware'siz manuel JWT) platform'u **ETKİLEMİYOR** — platform ayrı katman (`/api/super-admin` + `requirePlatformAdmin`).

---

## SONUÇ — "Basit yüzey + derin arka oda" gözüyle

- **Basit yüzey:** ✅ VAR — 5 sekmeli sade dashboard (özet sayı + kurum onay + rapor + log).
- **Derin arka oda:** 🔴 **backend hazır, frontend bağlanmamış** — kurum drill-down (üye/görüşme/DISC,
  maskeli + AUDIT loglu) API'leri var ama UI yok. "Derine inme" felsefesinin en kritik parçası **eksik**.

### En kritik 5 bulgu
1. 🔴 **Drill-down: backend HAZIR (audit + mask dâhil), frontend YOK.** En yüksek değer / en düşük efor —
   4 API'yi frontend'e bağla + dashboard'a "kurum detay" sekmesi. "Derin arka oda"yı bu açar.
2. ❌ **`lastLoginAt` platform-geneli kullanılmıyor** → sistem "yaşıyor mu / ölüyor mu" aktiflikle ölçülemiyor.
3. ❌ **Büyüme trendi (zaman serisi) yok** → sadece anlık sayı; ivme/artış görünmüyor.
4. ⚠️ **Tenant DELETE yok** (sadece freeze) → KVKK Md.7 (silme hakkı) karşılanmıyor.
5. ⚠️ **SuspicionReport:** tenantId yok + reporter PII maskesiz; otomatik anomali tespiti yok.

### ⚠️ ORTAK EKSİK KONTROLÜ (STK ile — iki kez yapma)
- **Aktiflik/retention (lastLoginAt):** STK'da tenant-scoped (`retentionMetrics.service.ts`) yapıldı;
  platform-geneli sürümü YOK → **aynı servis genelleştirilerek ORTAK yapılabilir** (tenant filtresini
  opsiyonel kıl → sistem-geneli + kurum-bazlı tek servis).
- **Drill-down deseni:** STK'da KPI drill-down (özet→kişi) yapıldı; platform'da backend hazır → **benzer UI deseni** tekrar kullanılır.
- **Kötüye kullanım otomatik tespiti:** her iki panelde de YOK → ortak anomali altyapısı.
- **Büyüme/aktivite trendi (zaman serisi):** her ikisinde de YOK → ortak metrik altyapısı.

### ⚠️ Kurum içine inme — KVKK loglama
✅ **VAR** — drill-down endpoint'leri AUDIT loglar (action + tenantId + actor + IP → SystemLog). Frontend
bağlanınca zaten aktif olur; loglama **sonradan eklenmesi gereken bir eksik DEĞİL, hazır**. (Bu, drill-down'ı
frontend'e bağlamayı daha da güvenli/ucuz kılar.)
