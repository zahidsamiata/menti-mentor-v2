> 🧊 ARŞİV — silme protokolü adım 4 (kök `CLAUDE.md` § SİLME PROTOKOLÜ). Rutin turda okunmaz; bir karantina geri alınırken ya da gerçek silme (E-5) turunda açılır.
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-28 · TAZELEME TETİKLEYİCİSİ: E-5 (gerçek silme) turu ya da bir karantinanın geri alınması

# Silinenler arşivi — E-4 karantina turu (dosya adı kuyruk satırında sabit: 2026-09-10; içerik 2026-09-28)

**NE:** Mükerrer / ön yüzün çağırmadığı 7 sunucu ucu ve 1 ön yüz bileşeni (+ 1 ön yüz sarmalayıcısı) **karantinaya** alındı. **Hiçbir şey silinmedi.** Kod yerinde duruyor; sunucu uçları `quarantined()` kapısıyla 410 (Gone) döner, ön yüz parçaları `@deprecated` işaretli.
**NEDEN:** Ölü/mükerrer kod her denetimde yanlış alarm üretiyor ve açık duran kullanılmayan uç güvenlik yüzeyi (KARAR-11 "Sorun ne"). Silme geri dönülmez olduğu için önce karantina, bir tur izleme, sonra PO'nun ikinci onayıyla silme.
**KAYNAK (karar):** KARAR-11 = **A** (karantina → bir tur bekle → sonra sil; PO, 2026-09-21 — `docs/otonom/arsiv/01-KARARLAR-cevaplanmis.md`) · KARAR-80/M14 (tek karantina turu; K-13/AN-13/AN-40 bu satıra katlandı) · kuyruk satırı `docs/otonom/00-KUYRUK.md` E-4 · merge kapısı: KARAR-134 (🔵 EVET/HAYIR).
**KAYNAK (aday listesi):** `docs/raporlar/kesif/hayalet-envanter-2026-09-19.md` §5 (🔒 KARANTİNA ADAYI kovası) · `docs/raporlar/kesif/hayalet-envanter-niyet-kaniti-ek-2026-09-27.md` (kalem başına niyet) · `docs/raporlar/kesif/e3-baglanmamis-uclar-2026-09-25.md` (MÜKERRER 22) · `docs/kararlar/00-KART-INDEKSI.md` "→ E-4" kartları (G4-09, G4-10, G10-01 kalanı, G10-02/03/04/08/10/11/15/18).
**DURUM:** karantina PR'da (backend `otonom/E-4-karantina-20260928` + çatı aynı dal) — merge YALNIZ PO "EVET"i sonrası (KARAR-134). Gerçek silme = E-5, PO'nun İKİNCİ onayı (🔴).
**AYRINTI:** kapı `backend/src/middleware/quarantine.ts` · test `backend/tests/e4-karantina.test.ts` · kod anlık görüntüsü: backend `origin/main` @ `22f770c`, çatı `origin/main` @ `4992f98`.

## Kapı nasıl çalışır (ortak)

- Kapı, rota zincirinde **kimlik doğrulamadan SONRA** durur: oturumsuz/yanlış rol eskisi gibi 401/403 alır; yetkili çağıran `410 {"error":"ENDPOINT_QUARANTINED","message":"Bu uç kullanımdan kaldırıldı."}` alır, handler çalışmaz.
- Her çağrı `SystemLog`'a yazılır: seviye WARN, kategori HTTP, mesaj `Karantinadaki uç çağrıldı: <anahtar>`, meta `{key, method, route}` (rota KALIBI, id yok). ⇒ **Bir tur izleme ölçütü:** platform paneli › Sistem kayıtları'nda bu mesaj hiç görünmüyorsa uç gerçekten kullanılmıyor demektir (E-5 silme turunun kanıtı).
- **Acil geri açma (kod değişmeden):** sunucu ortamına `QUARANTINE_REOPEN=<anahtar>[,<anahtar>…]` eklenir (Dokploy ortam değişkeni — PO eli). İstek anında okunur.
- **Kalıcı geri alma (tümü):** backend karantina commit'i `0c8a97d` → `git -C backend revert 0c8a97d` (merge edildiyse merge commit'i: `git -C backend revert -m 1 <merge-sha>`), çatı ön yüz işaretleri (commit `ae7139b` arşivle birlikte geldi; arşivi korumak için yalnız iki dosyayı geri al) → `git checkout ae7139b~1 -- frontend/src/components/organisms/MeetingScheduler.tsx frontend/src/lib/api/meetings.ts`. **Tek uç için:** ilgili rota satırından `quarantined('<anahtar>')` argümanını sil.

## Karantinaya alınanlar — özet tablo

| # | Anahtar | Uç / parça | Niyet (neden yazıldı) | İkame (bugün işi yapan yol) | Yeni karar | Karantina yöntemi |
|---|---|---|---|---|---|---|
| 1 | `super-admin-tenant-status` | `PATCH /api/super-admin/tenants/:id/status` | `de6be04` (2026-07-07, "sprint 8-11 … admin panel") — platform yöneticisinin kurumu askıya alması/açması (T6, KT:493) | `POST /api/platform/tenants/:id/freeze` + `/activate` (`platformRoutes.ts`, denetim izli `FREEZE_TENANT`/`ACTIVATE_TENANT`) — ön yüz bunları kullanıyor | KARAR-11 A · G4-09 PO notu ("yetenek farkı yoksa kapatılır" — fark yok, bkz. §1) | rota kapısı 410 |
| 2 | `super-admin-tenants-pending` | `GET /api/super-admin/tenants/pending` | `7365600` (2026-07-12, "kurum doğrulama sistemi", #15 ile main'e) — doğrulama bekleyen kurum listesi | `GET /api/platform/tenants/pending` — aynı maske (Y-02) + iz | KARAR-11 A · G4-09 (fark yok, bkz. §2) | rota kapısı 410 |
| 3 | `system-logs` | `GET /api/system-logs` | `3e49117` (2026-05-22, ilk iskele) — yönetici için sistem kayıtları (KT:493) | `GET /api/platform/logs` — ön yüz `lib/api/platform.ts:107` bunu çağırıyor; aynı select + iz | KARAR-11 A (kart metninde adıyla: "`/system-logs` ↔ `/platform/logs`") | rota kapısı 410 |
| 4 | `tenants-list` | `GET /api/tenants` | `3e49117` — platformun elle kurum yönetimi (KT:493) | `GET /api/platform/tenants` (sayfalı, iz) | KARAR-11 A ("kurum yönetimi uçları") | rota kapısı 410 |
| 5 | `tenants-get` | `GET /api/tenants/:id` | `3e49117` — aynı | `GET /api/platform/tenants/:id/overview` (maskeli, iz). Not: ön yüz bu ucu 2026-09-25'e kadar markalama için çağırıyordu, KR-03 ile bıraktı (`frontend/src/providers/AuthTenantBridge.tsx:19-24`) | KARAR-11 A · KR-03 | rota kapısı 410 |
| 6 | `users-me-social` | `PATCH /api/users/me/social` | `7df1fae` (2026-07-13) commit gövdesi "İŞ 6 — Profil: avatarUrl/linkedinUrl/instagramUrl alanları … PATCH /api/users/me/social endpoint" | `PATCH /api/users/me/profile` — aynı `socialUrlSchema` doğrulaması (`userController.ts` `linkedinUrl`/`instagramUrl`); ön yüz profil sayfası bunu kullanıyor; fotoğraf `POST /api/users/me/avatar` | KARAR-11 A (kart metninde adıyla örnek) · CLAUDE.md § YANLIŞ SORU TUZAĞI gerçek vakası | rota kapısı 410 |
| 7 | `meetings-pair-signal` | `GET /api/meetings/pair-signal` (+ ön yüz sarmalayıcısı `meetingsApi.getPairSignal`) | `36746b2` (2026-07-07) "GET /meetings/pair-signal: detect inefficient pairs (GREEN/YELLOW/RED)" | Yönetici eşleşme listesi "Risk" sütunu (`frontend/src/app/(admin)/admin/eslesmeler/page.tsx`; veri `adminController.ts` — aynı `pairSignal.service.ts` `computePairSignalFromCheckIns`) | KARAR-11 A · e3 raporu GÜNCELLEME (2026-09-25): "MÜKERRER … K-13/E-4 silme protokolü adayı" | rota kapısı 410 + sarmalayıcıya `@deprecated` |
| 8 | — | `frontend/src/components/organisms/MeetingScheduler.tsx` (231 satır, 0 import) | `918727b` (2026-06-21 ilk büyük iskele) — mentör müsaitlik + menti randevu arayüzü (KT:491 · YİN:33) | `app/(dashboard)/mentor/availability/page.tsx` (müsaitlik) + `app/(dashboard)/book-meeting/page.tsx` (randevu) — ikisi de işi kendi içinde yapıyor | KARAR-11 A (hayalet envanter §4: "Superseded … mükerrer bileşen") · G10-01 (c) | `@deprecated` (bileşen hiçbir yerde render edilmiyor; davranış etkisi yok) |

**Kapsam beyanı (ikame araması):** backend `src/routes/*.ts` + `server.ts` bağlama tablosu; ön yüz `frontend/src` TÜMÜ (`lib/api`, `app`, `components`, `providers`), testler hariç; harf duyarsız; iki dilli (super-admin↔superadmin · system-logs↔systemLog · pair-signal↔pairSignal · social↔sosyal · MeetingScheduler↔randevu/müsaitlik). Ön yüzde 1-7 numaralı uçlara çağrı: **0** (yalnız #7'nin çağrılmayan sarmalayıcısı var).


---

## §1 · `super-admin-tenant-status` — `PATCH /api/super-admin/tenants/:id/status`

**Tam yol:** `backend/src/routes/superAdminRoutes.ts` (rota) + `backend/src/controllers/adminSettingsController.ts:400-448` (handler). Son commit: rota `7365600` (2026-07-12) · handler dosyası `beec3fc` (2026-09-28).
**Neden yazılmıştı:** `de6be04` — platform yöneticisinin bir kurumu askıya alıp yeniden açması (T6 eski super-admin API'si).
**Neden karantinaya alınıyor:** aynı iş `POST /api/platform/tenants/:id/freeze` ve `/activate` ile yapılıyor; ön yüz yalnız onları çağırıyor. **G4-09 yetenek karşılaştırması (PO şartı "eskisinde olup yenisinde olmayan yetenek var mı"):** eski uç `isActive` yazar + önbelleği temizler + zaten aynı durumdaysa 409 döner. Yeni uçlar `isActive` yazar + önbelleği temizler + **denetim izi bırakır** (eskisinde iz YOK). 409 "zaten aktif" uyarısı yenisinde yok (idempotent 200) — bu bir yetenek değil, tekrar tıklamada davranış farkı. ⇒ taşınacak yetenek YOK.
**Geri alma:** `superAdminRoutes.ts`'teki satırı `router.patch('/tenants/:id/status', updateTenantStatus);` hâline döndür, ya da acil: `QUARANTINE_REOPEN=super-admin-tenant-status`.

**Rota dosyasının TAM içeriği (karantina öncesi):**
```ts
import { Router } from 'express';
import { requirePlatformAdmin } from '../middleware/platformAuth.js';
import {
  getSuperAdminDashboard,
  updateTenantStatus,
  listPendingTenants,
  verifyTenant,
} from '../controllers/adminSettingsController.js';

const router = Router();

router.use(requirePlatformAdmin);

router.get('/dashboard', getSuperAdminDashboard);
router.patch('/tenants/:id/status', updateTenantStatus);

// Kurum kayıt doğrulama
router.get('/tenants/pending', listPendingTenants);
router.patch('/tenants/:id/verify', verifyTenant);

export default router;
```

**Handler (TAM, `adminSettingsController.ts:400-448`):**
```ts
// ─── PATCH /api/super-admin/tenants/:id/status ───────────────────────────────

const UpdateTenantStatusSchema = z.object({
  isActive: z.boolean(),
});

export async function updateTenantStatus(req: Request, res: Response) {
  const parsed = validateRequest(UpdateTenantStatusSchema, req.body, res);
  if (!parsed.success) return parsed.response;

  const tenantId = req.params['id'] as string;

  const tenant = await prisma.tenant.findUnique({
    where:  { id: tenantId },
    select: { id: true, name: true, isActive: true },
  });
  if (!tenant) {
    return res.status(404).json({ error: 'TENANT_BULUNAMADI', message: 'Kurum bulunamadı.' });
  }

  if (tenant.isActive === parsed.data.isActive) {
    const state = parsed.data.isActive ? 'zaten aktif' : 'zaten askıya alınmış';
    return res.status(409).json({
      error:   'DURUM_DEGISMEDI',
      message: `Bu kurum ${state}.`,
    });
  }

  const updated = await prisma.tenant.update({
    where: { id: tenantId },
    data:  { isActive: parsed.data.isActive },
    select: {
      id:        true,
      name:      true,
      slug:      true,
      isActive:  true,
      updatedAt: true,
    },
  });

  invalidateTenant(tenantId);

  const action = parsed.data.isActive ? 'aktif edildi' : 'askıya alındı';

  return res.json({
    message:  `Kurum başarıyla ${action}.`,
    tenant:   updated,
  });
}
```


---

## §2 · `super-admin-tenants-pending` — `GET /api/super-admin/tenants/pending`

**Tam yol:** `backend/src/routes/superAdminRoutes.ts` (rota, içerik §1'de) + `backend/src/controllers/adminSettingsController.ts:450-481`. Son commit: rota `7365600` · handler dosyası `beec3fc`.
**Neden yazılmıştı:** `7365600` (2026-07-12, "kurum doğrulama sistemi", main'e #15 ile) — doğrulama bekleyen kurumların listesi.
**Neden karantinaya alınıyor:** `GET /api/platform/tenants/pending` aynı listeyi, aynı maskeyle (başvuran yönetici adı/e-postası maskeli, Y-02 / KVKK md.89) ve aynı denetim iziyle döndürüyor; handler'ın kendi yorumu da bunu söylüyor ("Bu uç frontend'de kullanılmıyor (mükerrer, K-13); kaldırılması silme protokolüne tabidir"). Yetenek farkı YOK.
**Geri alma:** rota satırından `quarantined('super-admin-tenants-pending'), ` kısmını sil · acil: `QUARANTINE_REOPEN=super-admin-tenants-pending`.

**Handler (TAM):**
```ts
// ─── GET /api/super-admin/tenants/pending ─────────────────────────────────────

export async function listPendingTenants(req: Request, res: Response) {
  const tenants = await prisma.tenant.findMany({
    where: { verificationStatus: 'PENDING_REVIEW' },
    select: {
      id:                 true,
      name:               true,
      displayName:        true,
      slug:               true,
      verificationStatus: true,
      verificationNote:   true,
      createdAt:          true,
      users: {
        where: { role: 'ADMIN' },
        select: USER_CONTACT_SELECT,
        take: 1,
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  // Y-02 komşu uç: `/api/platform/tenants/pending` (platformController.maskPendingTenantRow, KVKK md.89) ile AYNI
  // koruma — başvuran yöneticinin kimliği maskeli, okuma denetim izi bırakır. Bu uç frontend'de kullanılmıyor
  // (mükerrer, K-13); kaldırılması silme protokolüne tabidir, o güne kadar sızıntı kapalı tutulur.
  const items = tenants.map((t) => ({
    ...t,
    users: t.users.map((u) => ({ fullName: maskName(u.fullName), email: maskEmail(u.email) })),
  }));
  await auditPlatformAction('VIEW_PENDING_TENANTS', req, { count: items.length, via: 'super-admin' });
  return res.json({ items, total: items.length });
}
```


---

## §3 · `system-logs` — `GET /api/system-logs`

**Tam yol:** `backend/src/routes/systemLogRoutes.ts` + `backend/src/controllers/systemLogController.ts` (dosyanın tek işi bu uç). Son commit: rota `3d17cf6` (2026-07-12) · controller `b3e34b1` (2026-09-27). Bağlama: `backend/src/server.ts` `app.use('/api/system-logs', systemLogRoutes)` (DEĞİŞMEDİ).
**Neden yazılmıştı:** `3e49117` (2026-05-22 ilk iskele) — yönetici için sistem kayıtları. KT:493 "Eski/paralel platform-admin API'leri".
**Neden karantinaya alınıyor:** ön yüz kayıtları `GET /api/platform/logs` ile okuyor (`frontend/src/lib/api/platform.ts:107`); iki uç aynı select'i (ham `meta` yok) ve denetim izini kullanıyor (AJ-02). Tek fark: eski uç sıkı Zod doğrulaması + en çok 100, yeni uç en çok 500 satır — yetenek kaybı yok.
**Geri alma:** rota satırını `router.get('/', listSystemLogs);` yap · acil: `QUARANTINE_REOPEN=system-logs`.

**Rota dosyası (TAM):**
```ts
import { Router } from 'express';
import { requirePlatformAdmin } from '../middleware/platformAuth.js';
import { listSystemLogs } from '../controllers/systemLogController.js';

const router = Router();

// Sistem logları tenant-bağımsız platform verisidir — yalnızca platform yöneticisi erişebilir.
// Tenant kullanıcıları (ADMIN dahil) cross-tenant log sızıntısını önlemek için reddedilir.
router.use(requirePlatformAdmin);

// GET /api/system-logs
router.get('/', listSystemLogs);

export default router;
```

**Controller dosyası (TAM):**
```ts
import { z } from 'zod';
import type { Request, Response } from 'express';
import { prisma } from '../db.js';
import type { LogLevel } from '@prisma/client';
import { validateRequest } from '../middleware/validate.js';
import { auditPlatformAction } from '../services/platformAudit.js';

// Query parametre şeması
const ListSystemLogsQuerySchema = z.object({
  level: z.enum(['INFO', 'WARN', 'ERROR']).optional(),
  category: z
    .enum(['EMAIL', 'ML', 'AUTH', 'DB', 'HTTP', 'SYSTEM'])
    .optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

/**
 * GET /api/system-logs
 * Admin için sistem log kayıtlarını listeler.
 * Query: level (INFO|WARN|ERROR), category, limit (max 100, varsayılan 50)
 *
 * Komşu uç /api/platform/logs (getPlatformLogs) ile aynı koruma (AJ-02):
 * - KVKK: SystemLog.meta (Json) hata stack + userId/tenantId vb. içerebilir → PII sızma riski.
 *   Explicit select ile `meta` KASITLI dışarıda bırakılır.
 * - Y-02 (KVKK Md.12): platform okuma uçları da iz bırakır — kim, ne zaman, hangi filtreyle (PII yok).
 */
export async function listSystemLogs(req: Request, res: Response) {
  const parsed = validateRequest(ListSystemLogsQuerySchema, req.query, res);
  if (!parsed.success) return parsed.response;

  const { level, category, limit } = parsed.data;

  const where = {
    ...(level    && { level: level as LogLevel }),
    ...(category && { category }),
  };

  const [logs, total] = await Promise.all([
    prisma.systemLog.findMany({
      where,
      select: { id: true, level: true, category: true, message: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
    }),
    prisma.systemLog.count({ where }),
  ]);

  await auditPlatformAction('VIEW_SYSTEM_LOGS', req, { count: logs.length, level, category });
  return res.json({ items: logs, total });
}
```


---

## §4-5 · `tenants-list` + `tenants-get` — `GET /api/tenants` · `GET /api/tenants/:id`

**Tam yol:** `backend/src/routes/tenantRoutes.ts` + `backend/src/controllers/tenantController.ts:39-55` (`listTenants`) ve `:57-67` (`getTenant`). Son commit: rota `5e474d3` (2026-07-12) · controller `a934173` (2026-09-25).
**Neden yazılmıştı:** `3e49117` — platformun kurumları elle yönetmesi (KT:493 "platform elle kurum").
**Neden karantinaya alınıyor:** liste `GET /api/platform/tenants` (sayfalı, denetim izli), tekil görünüm `GET /api/platform/tenants/:id/overview` (maskeli, denetim izli) ile yapılıyor. Ek gerekçe: eski `getTenant` kurum kaydının **tamamını** (select'siz) döndürüyor; yeni uç yalnız gereken alanları.
**Bilerek karantinaya ALINMAYAN komşular (aynı dosya):** `POST /api/tenants` (platformun doğrulamasız elle kurum açması — `/platform/*`'ta karşılığı YOK, yetenek farkı) ve `PATCH /api/tenants/:id` (e3 raporu: "tam ikiz değil — PO teyidi"). İkisi "sonraki dilim"de.
**Geri alma:** rota satırlarından `quarantined('tenants-list'), ` / `quarantined('tenants-get'), ` kısmını sil · acil: `QUARANTINE_REOPEN=tenants-list,tenants-get`.

**Rota dosyası (TAM):**
```ts
import { Router } from 'express';
import { requirePlatformAdmin } from '../middleware/platformAuth.js';
import {
  createTenant,
  listTenants,
  getTenant,
  updateTenant,
} from '../controllers/tenantController.js';

const router = Router();

// Tenant CRUD yalnızca platform yöneticisine açıktır.
// Self-serve akış için ayrı endpoint: POST /api/tenants/self-serve/register
router.use(requirePlatformAdmin);

router.get('/', listTenants);
router.post('/', createTenant);
router.get('/:id', getTenant);
router.patch('/:id', updateTenant);

export default router;
```

**`listTenants` (TAM):**
```ts
export async function listTenants(_req: Request, res: Response) {
  const tenants = await prisma.tenant.findMany({
    select: {
      id: true,
      name: true,
      displayName: true,
      slug: true,
      isSharedPoolActive: true,
      logoUrl: true,
      primaryColor: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return res.json({ items: tenants, total: tenants.length });
}
```

**`getTenant` (TAM):**
```ts
export async function getTenant(req: Request, res: Response) {
  const tenant = await prisma.tenant.findUnique({
    where: { id: req.params['id'] as string },
  });

  if (!tenant) {
    return res.status(404).json({ error: 'NOT_FOUND', message: 'Tenant bulunamadı.' });
  }

  return res.json(tenant);
}
```


---

## §6 · `users-me-social` — `PATCH /api/users/me/social`

**Tam yol:** `backend/src/routes/onboardingRoutes.ts:49-54` + `backend/src/controllers/onboardingController.ts:546-567`. Son commit: rota dosyası `befda21` (2026-09-28) · controller `55a195d` (2026-09-28).
**Neden yazılmıştı:** `7df1fae` (2026-07-13) commit gövdesi: "İŞ 6 — Profil: avatarUrl/linkedinUrl/instagramUrl alanları (migration), Google OAuth avatar kaydı, PATCH /api/users/me/social endpoint" — kullanıcının sosyal bağlantılarını düzenlemesi. (Belgede ayrı niyet yok — KT:492; commit gövdesi niyeti taşıyor.)
**Neden karantinaya alınıyor:** aynı iş `PATCH /api/users/me/profile` ile yapılıyor — aynı `socialUrlSchema('linkedin')`/`('instagram')` doğrulaması (`userController.ts`), ön yüz profil sayfası (`frontend/src/app/(dashboard)/profile/page.tsx`) bunu çağırıyor; fotoğraf ayrı `POST /api/users/me/avatar`. ⚠️ Bu uç CLAUDE.md § YANLIŞ SORU TUZAĞI'nın gerçek vakasıdır: "profil düzenleme yok" DEĞİL, işi başka uç yapıyor.
**Geri alma:** rota zincirinden `quarantined('users-me-social'),` satırını sil · acil: `QUARANTINE_REOPEN=users-me-social`.

**Rota bloğu (TAM, karantina öncesi):**
```ts
router.patch(
  '/users/me/social',
  requireAuth(),
  updateSocialProfile as unknown as RequestHandler,
);
```

**Şema + handler (TAM):**
```ts
// ─── PATCH /api/users/me/social ──────────────────────────────────────────────
const SocialProfileSchema = z.object({
  linkedinUrl:  socialUrlSchema('linkedin'),
  instagramUrl: socialUrlSchema('instagram'),
}).strict();

export async function updateSocialProfile(req: RequestWithTenant, res: Response) {
  if (!req.auth) {
    return res.status(401).json({ error: 'KIMLIK_DOGRULANMADI' });
  }

  const parsed = validateRequest(SocialProfileSchema, req.body, res);
  if (!parsed.success) return parsed.response;

  const updated = await prisma.user.update({
    where: { id: req.auth.userId },
    data: parsed.data,
    select: { id: true, linkedinUrl: true, instagramUrl: true, avatarUrl: true },
  });

  return res.json(updated);
}
```


---

## §7 · `meetings-pair-signal` — `GET /api/meetings/pair-signal` (+ ön yüz sarmalayıcısı)

**Tam yol:** `backend/src/routes/meetingRoutes.ts:139-144` + `backend/src/controllers/meetingCheckInController.ts:130-168` · ön yüz `frontend/src/lib/api/meetings.ts:177-182` (`meetingsApi.getPairSignal`, çağıran YOK). Son commit: rota dosyası `201f32f` (2026-09-26) · controller `0c9bfe8` (2026-09-28) · ön yüz `cd60968` (2026-09-27).
**Neden yazılmıştı:** `36746b2` (2026-07-07) "GET /meetings/pair-signal: detect inefficient pairs (GREEN/YELLOW/RED)" — yöneticinin verimsiz giden çifti görmesi.
**Neden karantinaya alınıyor:** çift sinyali yönetici eşleşme listesinde "Risk" sütunu olarak ZATEN görünüyor (`frontend/src/app/(admin)/admin/eslesmeler/page.tsx`; veri `adminController.ts` aynı `computePairSignalFromCheckIns`'i çağırıyor — eşik tek yerde). e3 raporu bunu önce BAĞLA sandı, uygulama sırasında MÜKERRER olarak düzeltti (`e3-baglanmamis-uclar-2026-09-25.md` § GÜNCELLEME). Ortak servis (`pairSignal.service.ts`) karantinada DEĞİL — canlı liste onu kullanıyor.
**Geri alma:** rota zincirinden `quarantined('meetings-pair-signal'),` satırını sil + sarmalayıcıdaki `@deprecated` JSDoc'u kaldır · acil: `QUARANTINE_REOPEN=meetings-pair-signal`.

**Rota bloğu (TAM, karantina öncesi):**
```ts
// GET /pair-signal?mentorId=&mentiId=  → Çift verimsizlik sinyali
router.get(
  '/pair-signal',
  requireRole('ADMIN'),
  getPairEfficiencySignal as unknown as RequestHandler,
);
```

**Handler (TAM):**
```ts
// ─── Verimsizlik tespiti: son N check-in'e bakarak çift risk skoru ─────────────

export async function getPairEfficiencySignal(req: RequestWithTenant, res: Response) {
  const { mentorId, mentiId } = req.query as { mentorId?: string; mentiId?: string };
  if (!mentorId || !mentiId) {
    return sendValidationError(res, 'mentorId ve mentiId gerekli.');
  }

  // Bu çiftin son N görüşmesindeki check-in'leri çek (eşik: pairSignal.service).
  const recentMeetings = await prisma.meeting.findMany({
    where: {
      tenantId:    req.tenant.tenantId,
      mentorUserId: mentorId,
      mentiUserId:  mentiId,
      status:      'COMPLETED',
    },
    orderBy: { startsAt: 'desc' },
    take: PAIR_SIGNAL_CONFIG.recentMeetingsWindow,
    select: { id: true, startsAt: true },
  });

  if (recentMeetings.length === 0) {
    return res.json({ signal: 'INSUFFICIENT_DATA', meetingCount: 0 });
  }

  const meetingIds = recentMeetings.map((m) => m.id);
  const checkIns = await prisma.meetingCheckIn.findMany({
    where: { meetingId: { in: meetingIds } },
    select: { overallRating: true, continueIntent: true },
  });

  // Sinyal hesabı paylaşılan saf servise devredildi (eşik mantığı tek yerde — DRY).
  const result = computePairSignalFromCheckIns(checkIns);

  return res.json({
    ...result,
    meetingCount: recentMeetings.length,
  });
}
```

**Ön yüz sarmalayıcısı (TAM):**
```ts
  getPairSignal: (
    api: BoundClient,
    mentorId: string,
    mentiId: string,
  ): Promise<ApiResult<{ signal: 'GREEN' | 'YELLOW' | 'RED'; reasons: string[]; avgRating: number | null }>> =>
    api(`/api/meetings/pair-signal?mentorId=${mentorId}&mentiId=${mentiId}`),
```


---

## §8 · `MeetingScheduler` — `frontend/src/components/organisms/MeetingScheduler.tsx`

**Tam yol:** `frontend/src/components/organisms/MeetingScheduler.tsx` (231 satır). Son commit: `32673ff` (2026-08-01, tema renkleri) · ilk commit `918727b` (2026-06-21).
**Neden yazılmıştı:** mentör müsaitlik blokları + menti randevu seçimi için tek bileşen (KT:491 · YİN:33); `onSaveAvailability`/`onBook` geri çağrılarıyla sayfalara bağlanmak üzere UI-kit olarak yazıldı.
**Neden karantinaya alınıyor:** hiçbir dosya import etmiyor (`frontend/src` genelinde `MeetingScheduler` araması yalnız kendi dosyası). Aynı işi iki sayfa kendi içinde yapıyor: `app/(dashboard)/mentor/availability/page.tsx` (müsaitlik) ve `app/(dashboard)/book-meeting/page.tsx` (randevu, müsaitliğe uyum kontrolüyle). G10-01 (2026-09-02) bunu "bağlanmayı bekleyen özellik" saymıştı; hayalet envanter (2026-09-19) iki sayfanın işi üstlendiğini buldu → mükerrer.
**Karantina yöntemi:** default export'a `@deprecated` JSDoc (bileşen render edilmediği için davranış değişmez).
**Geri alma:** JSDoc bloğunu kaldır.

**Dosyanın TAM içeriği (karantina öncesi):**
```tsx
'use client';

import { useState, type ReactNode } from 'react';
import { Calendar, Clock, Video, MapPin, Phone, Plus, X, Check } from 'lucide-react';

// Backend Prisma enum değerleriyle birebir eşleşmeli (BÜYÜK HARF)
type MeetingFormat = 'ONLINE' | 'IN_PERSON' | 'PHONE';

// Backend Weekday enum değerleriyle birebir eşleşmeli
type Weekday = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

// Backend /api/meetings/availability beklentisiyle uyumlu alan adları
export interface TimeBlock {
  id: string;
  weekday: Weekday;    // backend: weekday (Weekday enum)
  startTime: string;  // backend: startTime "HH:MM"
  endTime: string;    // backend: endTime  "HH:MM"
}

interface MeetingSchedulerProps {
  mode: 'mentor' | 'menti';
  initialBlocks?: TimeBlock[];
  onSaveAvailability?: (blocks: TimeBlock[]) => void;
  availableBlocks?: TimeBlock[];
  onBook?: (block: TimeBlock, format: MeetingFormat) => void;
}

const DAYS: { value: Weekday; label: string }[] = [
  { value: 'MON', label: 'Pzt'  },
  { value: 'TUE', label: 'Salı' },
  { value: 'WED', label: 'Çar'  },
  { value: 'THU', label: 'Per'  },
  { value: 'FRI', label: 'Cuma' },
  { value: 'SAT', label: 'Cmt'  },
  { value: 'SUN', label: 'Paz'  },
];

const HOURS = Array.from({ length: 14 }, (_, i) => `${String(i + 8).padStart(2, '0')}:00`);

// key değerleri backend MeetingFormat enum ile birebir eşleşiyor
const FORMATS: { key: MeetingFormat; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'ONLINE',    label: 'Online',    icon: Video  },
  { key: 'IN_PERSON', label: 'Yüz yüze', icon: MapPin },
  { key: 'PHONE',     label: 'Telefon',   icon: Phone  },
];

export default function MeetingScheduler(props: MeetingSchedulerProps) {
  return props.mode === 'mentor' ? (
    <MentorAvailability {...props} />
  ) : (
    <MentiBooking {...props} />
  );
}

function MentorAvailability({ initialBlocks = [], onSaveAvailability }: MeetingSchedulerProps) {
  const [blocks, setBlocks] = useState<TimeBlock[]>(initialBlocks);
  const [draft, setDraft] = useState<{ weekday: Weekday; startTime: string; endTime: string }>({
    weekday:   'TUE',
    startTime: '14:00',
    endTime:   '16:00',
  });

  const addBlock = () => {
    if (draft.startTime >= draft.endTime) return;
    setBlocks((b) => [...b, { id: crypto.randomUUID(), ...draft }]);
  };

  const removeBlock = (id: string) => setBlocks((b) => b.filter((x) => x.id !== id));

  const dayLabel = (weekday: Weekday) =>
    DAYS.find((d) => d.value === weekday)?.label ?? weekday;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        <h3 className="text-base font-semibold text-foreground">Müsaitlik Saatlerin</h3>
      </div>

      <div className="mb-4 flex flex-wrap items-end gap-3 rounded-xl bg-muted p-4">
        <Field label="Gün">
          <select
            value={draft.weekday}
            onChange={(e) => setDraft({ ...draft, weekday: e.target.value as Weekday })}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
          >
            {DAYS.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Başlangıç">
          <TimeSelect value={draft.startTime} onChange={(v) => setDraft({ ...draft, startTime: v })} />
        </Field>
        <Field label="Bitiş">
          <TimeSelect value={draft.endTime} onChange={(v) => setDraft({ ...draft, endTime: v })} />
        </Field>
        <button
          onClick={addBlock}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> Ekle
        </button>
      </div>

      <div className="space-y-2">
        {blocks.length === 0 && (
          <p className="py-4 text-center text-sm text-muted-foreground">Henüz müsaitlik eklemedin</p>
        )}
        {blocks.map((b) => (
          <div
            key={b.id}
            className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-2.5"
          >
            <div className="flex items-center gap-3 text-sm">
              <span className="rounded-md bg-primary/10 px-2 py-0.5 font-medium text-primary">
                {dayLabel(b.weekday)}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {b.startTime} – {b.endTime}
              </span>
            </div>
            <button
              onClick={() => removeBlock(b.id)}
              className="text-muted-foreground transition hover:text-rose-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => onSaveAvailability?.(blocks)}
        className="mt-5 w-full rounded-xl bg-foreground py-3 text-sm font-semibold text-background transition hover:bg-foreground/90"
      >
        Müsaitliği Kaydet
      </button>
    </div>
  );
}

function MentiBooking({ availableBlocks = [], onBook }: MeetingSchedulerProps) {
  const [selectedBlock, setSelectedBlock] = useState<TimeBlock | null>(null);
  const [format, setFormat] = useState<MeetingFormat>('ONLINE');

  const dayLabel = (weekday: Weekday) =>
    DAYS.find((d) => d.value === weekday)?.label ?? weekday;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        <h3 className="text-base font-semibold text-foreground">Görüşme Planla</h3>
      </div>

      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Uygun saatler</p>
      <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {availableBlocks.map((b) => {
          const active = selectedBlock?.id === b.id;
          return (
            <button
              key={b.id}
              onClick={() => setSelectedBlock(b)}
              className={`rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                active
                  ? 'border-primary bg-primary/10 ring-1 ring-primary'
                  : 'border-border hover:border-muted-foreground/40'
              }`}
            >
              <div className="font-medium text-foreground">{dayLabel(b.weekday)}</div>
              <div className="text-xs text-muted-foreground">{b.startTime} – {b.endTime}</div>
            </button>
          );
        })}
      </div>

      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Görüşme formatı</p>
      <div className="mb-6 grid grid-cols-3 gap-2">
        {FORMATS.map(({ key, label, icon: Icon }) => {
          const active = format === key;
          return (
            <button
              key={key}
              onClick={() => setFormat(key)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border py-3 transition ${
                active
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:border-muted-foreground/40'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>

      <button
        disabled={!selectedBlock}
        onClick={() => selectedBlock && onBook?.(selectedBlock, format)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
      >
        <Check className="h-4 w-4" />
        Görüşmeyi Oluştur
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

function TimeSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
    >
      {HOURS.map((h) => <option key={h}>{h}</option>)}
    </select>
  );
}
```


---

## GEREKÇE BULUNAMADI → PO'ya sor (karantinaya ALINMADI)

Silme protokolü adım 1: kendi niyeti belgede/commit'te bulunamayan kalem karantinaya bile alınmaz.

| Uç | Bulunan | Bulunamayan | Kaynak |
|---|---|---|---|
| `PATCH /api/users/:id/self-profile` (G10-11) | ilk commit `3e49117` (ilk iskele, gövdesinde uç düzeyi gerekçe yok); ikame `PATCH /api/users/me/profile` | ucun KENDİ niyeti — `karar-defteri-2026-08-26.md:341` "NİYET BELGELENMEMİŞ" | niyet-kaniti-ek #7 |
| `POST /api/users/:id/temperament-test` | ilk commit `3e49117`; ikame DISC + uyarlanır test (`/api/users/disc/submit`) | kendi niyeti — yalnız ikame notu var | niyet-kaniti-ek #18 |

Soru KARAR-134 kartının "Ayrıca" bölümünde.

## Karantina adayı DEĞİL — neden (bu turda dokunulmadı)

| Kalem | Neden aday değil |
|---|---|
| G4-10 `setVisibilityOptIn` (`POST /mentors/:mentorId/visibility-optin`) | Mükerrer değil; ekranı eksik bir özellik → Y-15 → AN-28 (BAĞLA yönü). Yeni karar "kaldır" değil. |
| G10-02 `VisibilityOptIn.requestMessage` | Veritabanı kolonu; kodda yazan yol zaten yok (yalnız KVKK anonimleştirmesi null'lar). Karantinalanacak kod yok; DROP = ayrı 🔵 migration. |
| G10-03 `matchingInterface.ts` | Niyet canlı (iş ilanı eşleştirmesi, bilinçli erteleme); KARAR-9 (kulüp + iş ilanları) cevapsız → 🔴 dokunma. |
| G10-04 `findMatchesDueForCheckpoint` | Ölü değil, yarım (cron'a bağlı, yalnız log); niyet canlı (Aşama 2 bildirim). "Kaldır" kararı yok. |
| G10-06 `ContextualFeedbackHost` + `MeetingContext` | Hayalet envanter karantina adayı demişti; E-3 sonra BAĞLA'ya aldı → U-18 / KARAR-97 (PO EVET'i bekliyor). Yeni karar "bağla" yönünde. |
| G10-08 `UserProfile.qualityMultiplier` | Veritabanı kolonu; kodda okuyan/yazan yok. Karantinalanacak kod yok; DROP = ayrı 🔵 migration. |
| G10-15 `POST /api/questions/respond` (toplu) | Controller yorumu "ileride kullanım / toplu import" — belgeli niyet canlı; e3: İÇ/SİSTEM. |
| G10-18 `enneagramWing` | Yazılıyor + mizaç ucunda dönülüyor; tüketici yok ama "kaldır" kararı yok (PO ağustos: ⏸️ şimdilik alma). |
| G10-05 · G10-14 | 🔴 KARAR-110 · KARAR-16 cevapsız. |
| `POST /api/meetings` (eski randevu) | 🔴 KARAR-40 cevapsız (düzelt mi karantina mı). |
| AN-12 `interactionStyle` | Ayrı karantina, zaten PR-ACIK (backend #186 + çatı #370, KARAR-107) — tekrarlanmadı. |
| `GET /api/users/:id/export` | Yöneticinin başkası adına dışa aktarması ürün sorusu (KARAR-14). |

## Sonraki dilim (bu turda alınmadı — önce ek kanıt ya da PO teyidi)

| Kalem | Neden bekliyor |
|---|---|
| `GET /api/super-admin/dashboard` | G4-09 yetenek farkı: eski uç **toplam mentorluk saatini** (tamamlanan görüşme dakikası toplamı) ve yalnız aktif kullanıcı sayılarını veriyor; `/api/platform/stats`'ta yok. PO şartı: "varsa taşınır, sonra kapatılır" → önce metrik taşınmalı. |
| `PATCH /api/super-admin/tenants/:id/verify` | G4-09 yetenek farkı: eski ret, kurum adresini (slug) serbest bırakıp kurumu askıya alıyor; `/api/platform/tenants/:id/reject` bunları yapmıyor (yeni akışta ret edilen kurum `/reapply` ile aynı adla dönebiliyor — muhtemelen bilinçli, ama teyit gerek). |
| `POST /api/tenants` | Platformun doğrulamasız elle kurum açması; `/platform/*`'ta karşılığı yok (yetenek farkı). |
| `PATCH /api/tenants/:id` | e3: "tam ikiz değil — PO teyidi". |
| `POST /api/scoring/compute-profile` · `POST /api/scoring/rank-mentors` | e3 MÜKERRER dedi; ama 2026-09'da sahiplik/onay kapısı testleri aldılar (`backend/tests/rank-mentors-ownership.test.ts`, `rank-mentors-approval-gate.test.ts`, `compute-profile-idor.test.ts`) — niyet + ikame ayrıca doğrulanmalı. |
| `GET /api/users` · `POST /api/users` | e3 MÜKERRER; kullanıcı oluşturma yolu AN-12 karantinasıyla aynı dosyada — çakışmamak için AN-12 sonrası. |
| `POST/GET /api/requests` · `GET /api/requests/:id` | e3 MÜKERRER ile hayalet envanter ("POST kullanılıyor") çelişiyor; Y-04 (2026-09-25) listeye sayfalama ekledi → önce çağıran teyidi. |
