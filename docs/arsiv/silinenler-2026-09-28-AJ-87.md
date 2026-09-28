# Değiştirilenler arşivi — 2026-09-28 · AJ-87 (JWT tür ayrımı)

> CLAUDE.md § SİLME PROTOKOLÜ adım 4. Hiçbir dosya/fonksiyon SİLİNMEDİ; aşağıdaki gövdeler davranış
> değiştirecek biçimde düzenlendi. Eski hâl AYNEN (backend main `86aa87a` itibarıyla) · neden yazılmıştı ·
> neden değişti · son commit hash · geri alma yolu. Backend dalı `otonom/AJ-87-jwt-tur-ayrimi-20260928` (PR zahidsamiata/menti-mentor#219).

**Ortak gerekçe:** erişim, platform, OAuth durum (state) ve davet anahtarları aynı sırla, tür bilgisi olmadan
imzalanıyor ve doğrulayıcılar türe bakmıyordu. State anahtarı Authorization başlığında `verifyToken`'dan geçip
yalnız `middleware/tenant.ts` kurum uyuşmazlığına (403) takılıyordu; davet anahtarı (`sub` yok) üyelik sorgusuna
`userId: undefined` ile iniyordu (500). Kuyruk: `docs/otonom/00-KUYRUK.md` AJ-87.

**Geri alma (hepsi için):** backend'de `git revert <AJ-87 merge commit>` ya da tek dosya:
`git checkout 86aa87a -- <yol>` (bu arşivdeki eski hâl birebir o committeki gövdedir).

### 1. `backend/src/middleware/jwtAuth.ts` — signToken / verifyToken

- **Son commit (eski hâl):** `b720128`
- **Neden yazılmıştı:** tek imzalayıcı/doğrulayıcı; AJ-03 jti iptali eklendi (b720128 AJ-31 son dokunuş).
- **Neden değişti:** tür (`typ`) yazılmıyor, doğrulamada tür denetlenmiyordu → `typ:'access'`/`'platform'` yazılır; `verifyToken` yalnız erişim türünü (geçişte tür-siz eski erişim biçimini) kabul eder; platform için yeni `verifyPlatformToken`.
- **Eski hâl (aynen, satır 32-51):**
  ```ts
  export function signToken(
    payload: Omit<JwtPayload, 'iat' | 'exp' | 'aud' | 'jti'>,
    options?: { audience?: string },
  ): string {
    // `as jwt.SignOptions`: config.jwt.expiresIn string'tir; ms-StringValue tipini karşılamak için cast.
    const signOptions = { expiresIn: config.jwt.expiresIn } as jwt.SignOptions;
    if (options?.audience) signOptions.audience = options.audience;
    return jwt.sign({ ...payload, jti: crypto.randomUUID() }, config.jwt.secret, signOptions);
  }
  
  export function verifyToken(token: string): JwtPayload | null {
    try {
      const payload = jwt.verify(token, config.jwt.secret) as JwtPayload;
      // AJ-03: imza geçerli olsa bile, sahibi çıkış yaptıysa (jti iptal listesindeyse) reddedilir.
      if (isAccessTokenRevoked(payload.jti)) return null;
      return payload;
    } catch {
      return null;
    }
  }
  ```

### 2. `backend/src/middleware/platformAuth.ts` — requirePlatformAdmin içindeki verifyToken çağrısı

- **Son commit (eski hâl):** `39b9f1a`
- **Neden yazılmıştı:** platform çerezi ortak doğrulayıcıyla çözülüp aud + isPlatformAdmin ile ayrılıyordu.
- **Neden değişti:** `verifyToken` artık aud taşıyan anahtarı reddeder → platform çerezi `verifyPlatformToken` ile doğrulanır (aud + typ).
- **Eski hâl (aynen, satır 1-3):**
  ```ts
  import type { Request, Response, NextFunction } from 'express';
  import { verifyToken, PLATFORM_AUDIENCE } from './jwtAuth.js';
  import { PLATFORM_COOKIE } from '../controllers/platformController.js';
  ```

  Satır 22 (aynen): `  const payload = verifyToken(token);`

### 3. `backend/src/controllers/platformController.ts` — platformLogout içindeki verifyToken çağrısı

- **Son commit (eski hâl):** `19753e1`
- **Neden yazılmıştı:** AJ-03: çıkışta platform anahtarının jti'si iptal listesine yazılır.
- **Neden değişti:** aynı neden (platform anahtarı erişim doğrulayıcısından geçmez) → `verifyPlatformToken`.
- **Eski import (aynen, satır 6):** `import { signToken, verifyToken, PLATFORM_AUDIENCE } from '../middleware/jwtAuth.js';`
- **Eski hâl (aynen, satır 93-99):**
  ```ts
  export async function platformLogout(req: Request, res: Response) {
    const token = extractPlatformCookieToken(req.headers.cookie);
    const payload = token ? verifyToken(token) : null;
    if (payload?.jti && payload.exp) {
      revokeAccessToken(payload.jti, payload.exp);
    }
  
  ```

### 4. `backend/src/services/oauth/oauthStateService.ts` — createOAuthState / verifyOAuthState

- **Son commit (eski hâl):** `c304bd2`
- **Neden yazılmıştı:** stateless OAuth CSRF koruması (JWT imzalı state, 10 dk).
- **Neden değişti:** state tür bilgisi taşımıyordu; artık `typ:'oauth_state'` yazılır ve doğrulamada şart (tür-siz eski state'e geçiş yok — ömrü 10 dk).
- **Eski hâl (aynen, satır 16-46):**
  ```ts
  /** Tenant, rol ve (varsa) davet token'ını imzalanmış bir state string'ine dönüştürür. */
  export function createOAuthState(tenantSlug: string, role: 'MENTOR' | 'MENTI', inviteToken?: string): string {
    const payload: OAuthStatePayload = {
      tenantSlug,
      role,
      nonce: crypto.randomBytes(16).toString('hex'),
      ...(inviteToken ? { inviteToken } : {}),
    };
    return jwt.sign(payload, config.jwt.secret, { expiresIn: STATE_EXPIRY_SECONDS });
  }
  
  /**
   * Callback'ten dönen state string'ini doğrular ve içeriğini döner.
   * @returns Geçerliyse payload, değilse null (süre dolmuş veya imza bozuk)
   */
  export function verifyOAuthState(state: string): OAuthStatePayload | null {
    try {
      const decoded = jwt.verify(state, config.jwt.secret) as OAuthStatePayload & jwt.JwtPayload;
      // jwt.verify zaten exp kontrolü yapıyor; tip guard olarak alanları kontrol et
      if (!decoded.tenantSlug || !decoded.role || !decoded.nonce) return null;
      return {
        tenantSlug: decoded.tenantSlug,
        role: decoded.role,
        nonce: decoded.nonce,
        ...(typeof decoded.inviteToken === 'string' ? { inviteToken: decoded.inviteToken } : {}),
      };
    } catch {
      return null;
    }
  }
  ```

### 5. `backend/src/services/invitationToken.ts` — verifyInvitationToken

- **Son commit (eski hâl):** `217877b`
- **Neden yazılmıştı:** register/OAuth davetliyi onaylı yapmak için paylaşılan davet doğrulaması (type guard).
- **Neden değişti:** `typ` varsa `'invitation'` olmalı (tür-siz eski davetler `type` ile kabul edilmeye devam eder).
- **Eski hâl (aynen, satır 27-36):**
  ```ts
  /** Geçerli + `type: 'invitation'` ise claim'leri döndürür; aksi halde null (geçersiz/süresi dolmuş/yanlış tip). */
  export function verifyInvitationToken(token: string): InvitationTokenClaims | null {
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as InvitationTokenClaims;
      // type guard: normal auth token'larının davet gibi geçmesini engelle.
      return decoded.type === 'invitation' ? decoded : null;
    } catch {
      return null;
    }
  }
  ```

### 6. `backend/src/controllers/selfServeController.ts` — signInvitationToken / verifyInvitationToken

- **Son commit (eski hâl):** `29bba4c`
- **Neden yazılmıştı:** kurum yöneticisinin ürettiği 30 günlük davet anahtarı.
- **Neden değişti:** imzaya `typ:'invitation'` eklendi; doğrulamada typ varsa `'invitation'` şart.
- **Eski hâl (aynen, satır 552-572):**
  ```ts
  function signInvitationToken(
    tenantId: string,
    role: 'MENTOR' | 'MENTI',
    invitedByName?: string,
    invitedByTitle?: string,
  ): string {
    const payload: Omit<InvitationTokenClaims, 'iat' | 'exp'> = { tenantId, role, type: 'invitation' };
    if (invitedByName) payload.invitedByName = invitedByName;
    if (invitedByTitle) payload.invitedByTitle = invitedByTitle;
    return jwt.sign(payload, config.jwt.secret, { expiresIn: '30d' } as jwt.SignOptions);
  }
  
  function verifyInvitationToken(token: string): InvitationTokenClaims | null {
    try {
      const decoded = jwt.verify(token, config.jwt.secret) as InvitationTokenClaims;
      // type guard: normal auth token'larının bu endpoint'e geçmesini engelle
      return decoded.type === 'invitation' ? decoded : null;
    } catch {
      return null;
    }
  }
  ```

