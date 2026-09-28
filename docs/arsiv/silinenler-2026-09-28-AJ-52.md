# Değiştirilenler arşivi — 2026-09-28 · AJ-52 (CSP ihlal raporu toplama)

> CLAUDE.md § SİLME PROTOKOLÜ adım 4. Hiçbir dosya/fonksiyon SİLİNMEDİ; aşağıdaki satırlar genişletildi.
> Backend dalı ve çatı dalı `otonom/AJ-52-csp-ihlal-raporu-20260928`. Kuyruk: `docs/otonom/00-KUYRUK.md` AJ-52.
> Kaynak bulgu: `docs/raporlar/kesif/csp-zorunlu-mod-hazirlik-2026-09-27.md` Bulgu 1.

### 1. `backend/src/services/logger.ts` — `LogCategory` birliği

- **Son commit (eski hâl):** `232e6e2`
- **Neden yazılmıştı:** SystemLog kategorilerini tip düzeyinde sınırlamak (AUDIT: KVKK Md.12 denetim kaydı).
- **Neden değişti:** CSP ihlal raporları ayrı süzülebilsin diye `'CSP'` eklendi. `SystemLog.category` DB'de
  `String` → migration YOK.
- **Eski hâl (aynen):**
  ```ts
  type LogCategory = 'EMAIL' | 'ML' | 'AUTH' | 'DB' | 'HTTP' | 'SYSTEM' | 'AUDIT';
  ```
- **Geri alma:** backend'de `git revert <AJ-52 merge commit>`.

### 2. `frontend/src/lib/securityHeaders.mjs` — `buildSecurityHeaders` gövdesi

- **Son commit (eski hâl):** `7d25612` (AJ-22)
- **Neden yazılmıştı:** `next.config.mjs` `headers()` için tek CSP başlığı üretmek.
- **Neden değişti:** Reporting API için `Reporting-Endpoints` başlığı (API origin'i biliniyorsa) eklendi;
  politika metnine de `report-uri` + `report-to` yönergeleri girdi (`buildContentSecurityPolicy` sözlüğüne ekleme).
- **Eski hâl (aynen):**
  ```js
  export function buildSecurityHeaders(options = {}) {
    return [{ key: CSP_HEADER_NAME, value: buildContentSecurityPolicy(options) }];
  }
  ```
- **Geri alma:** `git revert <AJ-52 çatı merge commit>` ya da `git checkout 7d25612 -- frontend/src/lib/securityHeaders.mjs`.

### 3. `frontend/src/__tests__/security-headers.test.ts` — AJ-22 başlık listesi iddiası

- **Son commit (eski hâl):** `7d25612`
- **Neden yazılmıştı:** gönderilen başlığın yalnız engelleyen CSP olduğunu (Report-Only olmadığını) kilitlemek.
- **Neden değişti:** başlık listesine `Reporting-Endpoints` eklendi; Report-Only yokluğu iddiası aynen duruyor.
- **Eski hâl (aynen):**
  ```ts
      expect(headers.map((h) => h.key)).toEqual(['Content-Security-Policy']);
  ```
- **Geri alma:** madde 2 ile birlikte.

### 4. `CLAUDE.md` § Güvenlik › KASITLI public listesi

- Eski iki satır AYNEN `docs/otonom/arsiv/kural-gecmisi-CLAUDE.md` § "AJ-52" altında.
