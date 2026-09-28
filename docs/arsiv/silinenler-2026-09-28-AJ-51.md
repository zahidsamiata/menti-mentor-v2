# Değişen kod arşivi — 2026-09-28 · AJ-51 (platform çıkışı kalıcı)

> Silme yok; aşağıdaki satırlar **değiştirildi** (yerine genişletilmiş hâli geldi). Eski hâl AYNEN, geri alma için.
> Son commit (değişiklik öncesi): backend `1fa44fc` (main, AJ-87 #219 merge). Değişiklik: backend PR #223, commit `1f50ba7`.

## 1. `backend/src/controllers/platformController.ts` — `platformLogout` iptal satırı

**Eski hâl:**
```ts
import { revokeAccessToken } from '../services/accessTokenRevocation.js';
...
  if (payload?.jti && payload.exp) {
    revokeAccessToken(payload.jti, payload.exp);
  }
```
**Neden yazılmıştı:** AJ-03 — çıkışta platform anahtarını sunucu tarafında (bellek-içi jti listesi) anında iptal etmek.
**Neden değişti:** bellek listesi sunucu yeniden başlatmasında sıfırlanıyor; çıkış yapılmış platform anahtarı ömrü dolana kadar yeniden geçerli oluyordu (AJ-51). Yeni hâl `recordPlatformLogout(jti, exp)` — aynı bellek iptalini yapar + `SystemLog`'a `AUTH/PLATFORM_LOGOUT` kaydı yazar.
**Geri alma:** `git -C backend revert 1f50ba7` (ya da yukarıdaki satırı geri koy, `recordPlatformLogout` çağrısını ve try/catch'i kaldır).

## 2. `backend/src/middleware/platformAuth.ts` — `requirePlatformAdmin` imzası

**Eski hâl:**
```ts
export function requirePlatformAdmin(req: Request, res: Response, next: NextFunction) {
  ...
  if (!payload || !payload.isPlatformAdmin || payload.aud !== PLATFORM_AUDIENCE) {
    return res.status(403).json({ error: 'YETKISIZ', message: 'Bu endpoint yalnızca platform yöneticisine açıktır.' });
  }

  next();
}
```
**Neden yazılmıştı:** platform uçlarının kapısı — imza + `aud` + (AJ-87) `typ` kontrolü, DB'siz.
**Neden değişti:** `async` oldu; imza kontrolünden sonra `resolvePlatformSession(payload)` ile DB'deki çıkış kaydına bakıyor. 403 gövdesi `PLATFORM_FORBIDDEN_BODY` sabitine alındı (metin aynı).
**Geri alma:** `git -C backend revert 1f50ba7`.

## 3. `backend/tests/jwt-token-type.unit.test.ts` — `platformGate` yardımcı fonksiyonu

**Eski hâl:**
```ts
    systemLog: { create: vi.fn().mockResolvedValue({}) },
...
  function platformGate(token: string): number {
    const req = { headers: { cookie: `${PLATFORM_COOKIE}=${token}` } } as unknown as Request;
    const res = fakeRes();
    let passed = false;
    requirePlatformAdmin(req, res as unknown as Response, (() => { passed = true; }) as NextFunction);
    return passed ? 200 : res.statusCode;
  }

  it('platform anahtarı (aud + typ:platform) → kabul', () => {
    expect((jwt.decode(platformToken()) as { typ?: string }).typ).toBe('platform');
    expect(platformGate(platformToken())).toBe(200);
  });

  it('negatif: erişim / state / davet anahtarı platform kapısında → 403', () => {
    expect(platformGate(accessToken())).toBe(403);
    expect(platformGate(createOAuthState('kurum', 'MENTI'))).toBe(403);
    expect(platformGate(invitationToken())).toBe(403);
  });
```
**Neden yazılmıştı:** AJ-87 — platform kapısının tür ayrımını DB'siz ölçmek.
**Neden değişti:** `requirePlatformAdmin` async oldu → yardımcı `await` eder; sahte Prisma'ya `systemLog.findFirst` (null) eklendi. İddialar aynı.
**Geri alma:** `git -C backend revert 1f50ba7`.
