# Değiştirilenler arşivi — 2026-09-28 · AJ-55 (self-serve kurum eşleşmesi merkezî yardımcıya)

> CLAUDE.md § SİLME PROTOKOLÜ adım 4. Hiçbir dosya/fonksiyon SİLİNMEDİ; aşağıdaki elle yazılı kontroller
> eşdeğer merkezî yardımcı çağrısıyla (`authenticateTenantAdminForParam`, `backend/src/middleware/tenantAdminAuth.ts`, AJ-44)
> değiştirildi. Eski hâl AYNEN (backend main `3b1a2d6` itibarıyla). Backend dalı `otonom/AJ-55-kurum-eslesme-merkezi-20260928`.

**Neden yazılmıştı:** URL `:id` kurumu ile oturum (JWT) kurumunun eşleşmesi — bir kurumun yöneticisi başka kurumun
kimliğiyle onun kaynağına yazamasın/okuyamasın. İlk hâlleri `de6be04` / `7df1fae`.
**Neden değişti:** AJ-44 bu eşleşmeyi tek yardımcıda topladı; self-serve uçları elle yazmaya devam ediyordu. Açık yoktu;
bir sonraki değişiklikte kontrolün unutulmaması için tek kapıya bağlandı. Durum kodları aynı. Tek gövde farkı: iki şablon
ucu 403'te artık `message` alanı da döner (önceden yalnız `{ error: 'YETKI_YOK' }`).
**Son commit (eski hâl):** `selfServeController.ts` → `a265fdc` · `adminSettingsController.ts` → `f06db12`.
**Geri alma:** backend'de `git revert <AJ-55 merge commit>` ya da `git checkout 3b1a2d6 -- src/controllers/selfServeController.ts src/controllers/adminSettingsController.ts`.

### 1. `backend/src/controllers/selfServeController.ts` — import (satır 10)
```ts
import { authenticateTenantAdmin } from '../middleware/tenantAdminAuth.js';
```

### 2. `backend/src/controllers/selfServeController.ts` — updateOnboarding (satır 376-387)
```ts
export async function updateOnboarding(req: Request, res: Response) {
  const payload = await authenticateTenantAdmin(req, res);
  if (!payload) return;

  const tenantId = req.params['id'] as string;

  if (payload.tenantId !== tenantId) {
    return res.status(403).json({
      error:   'YETKI_YOK',
      message: 'Başka bir kurumun onboarding adımını güncelleyemezsiniz.',
    });
  }
```

### 3. `backend/src/controllers/selfServeController.ts` — createInvitation (satır 587-598)
```ts
export async function createInvitation(req: Request, res: Response) {
  const payload = await authenticateTenantAdmin(req, res);
  if (!payload) return;

  const tenantId = req.params['id'] as string;

  if (payload.tenantId !== tenantId) {
    return res.status(403).json({
      error:   'YETKI_YOK',
      message: 'Başka bir kurumun davet linkini oluşturamazsınız.',
    });
  }
```

### 4. `backend/src/controllers/selfServeController.ts` — getInvitationTemplates (satır 737-744)
```ts
export async function getInvitationTemplates(req: Request, res: Response) {
  const payload = await authenticateTenantAdmin(req, res);
  if (!payload) return;

  const tenantId = req.params['id'] as string;
  if (payload.tenantId !== tenantId) {
    return res.status(403).json({ error: 'YETKI_YOK' });
  }
```

### 5. `backend/src/controllers/selfServeController.ts` — saveInvitationTemplate (satır 751-758)
```ts
export async function saveInvitationTemplate(req: Request, res: Response) {
  const payload = await authenticateTenantAdmin(req, res);
  if (!payload) return;

  const tenantId = req.params['id'] as string;
  if (payload.tenantId !== tenantId) {
    return res.status(403).json({ error: 'YETKI_YOK' });
  }
```

### 6. `backend/src/controllers/adminSettingsController.ts` — listBlockedPairs üstü bayat yorum (satır 165-167)
```ts
// ─── GET /api/tenants/:id/block-pairs ────────────────────────────────────────
// E-3d: admin panelinde koyduğu engelleri GÖREBİLSİN diye — `blockPair` ile
// aynı auth zinciri (authenticateTenantAdmin) + tenant eşleşmesi. `pairId`
```
