# Silinenler / değiştirilenler arşivi — 2026-09-28

> CLAUDE.md § SİLME PROTOKOLÜ adım 4. Bu dosyadaki her kayıt: tam yol · eski hâl AYNEN · neden yazılmıştı ·
> neden değişti · son commit hash · geri alma yolu.

---

## AJ-57 — tehlikeli DB komutları açık onay kapısına alındı (backend `otonom/AJ-57-db-komut-korumasi-20260928`)

**Özet gerekçe (aşağıdaki kayıtların ortak nedeni):** `backend/README.md` kurulum adımı `npm run prisma:migrate`
(= `prisma migrate dev`) çalıştırıyordu. `migrate dev` şema sapmasında (drift) veritabanını SIFIRLAMAYI önerir;
sıfırlama tüm tabloları boşaltır ve `package.json` `prisma.seed` ayarı yüzünden ardından `prisma/seed.ts`
kendiliğinden koşar (toplu `deleteMany()`). CANLI = LOKAL AYNI DB (CLAUDE.md § CANLI = LOKAL AYNI DB) →
README'yi izleyen biri (insan ya da ajan) canlı veriyi silebilirdi. Hiçbir satır kaldırılmadı: komutlar
koruma betiğinden (`backend/scripts/db-guard.ts`) geçecek biçimde yönlendirildi; `MENTI_TEHLIKELI_DB_ONAY=<işlem>`
verilince eskisi gibi çalışır. Kullanım dışı kalan kod yok (karantina gerekmedi).

**Kontrol (kimse etkilenmiyor mu):** CI (`backend/.github/workflows/ci.yml`) yalnız `prisma generate` ve
`prisma migrate deploy` kullanır; Dockerfile `prisma migrate deploy`; `tests/globalSetup.ts` `npx prisma migrate deploy`
(yalnız `TEST_DATABASE_URL`). Hiçbiri `prisma:migrate` / `seed` / `prisma.seed` kullanmaz → CI akışı değişmez.

### 1. `backend/package.json` — `scripts.prisma:migrate`

- **Eski hâl (aynen):**
  ```json
      "prisma:migrate": "prisma migrate dev",
  ```
- **Yeni hâl:** `"prisma:migrate": "tsx scripts/db-guard.ts migrate-dev",` + yeni salt-okuma
  `"prisma:migrate:status": "prisma migrate status",`
- **Neden yazılmıştı:** ilk iskelet commit'i `3e49117` (2026-05-22, "feat: bento grid dashboard ve jwt guvenlik altyapisi") —
  standart Prisma geliştirme kısayolu; o tarihte lokal ≠ canlı varsayımıyla yazıldı.
- **Neden değişti:** canlı = lokal aynı DB olunca `migrate dev` DB sıfırlama + otomatik seed kapısı oldu (yukarıdaki özet).
- **Son commit (değişiklikten önce):** `ad08368` (backend `package.json`).
- **Geri alma:** `git -C backend revert <AJ-57 merge commit>` ya da satırı yukarıdaki eski hâline döndür;
  `tests/db-guard.unit.test.ts` ilgili testleri de geri alınmalı (yoksa kırmızı olur — bilinçli).

### 2. `backend/package.json` — `scripts.seed`

- **Eski hâl (aynen):**
  ```json
      "seed": "tsx prisma/seed.ts",
  ```
- **Yeni hâl:** `"seed": "tsx scripts/db-guard.ts seed",`
- **Neden yazılmıştı:** `de6be04` (2026-07-07, "feat: sprint 8-11 — …") — yük testi / geliştirme için 3 kurum,
  20 mentor, 200 menti mock verisi (`prisma/seed.ts` başlık yorumu).
- **Neden değişti:** tek komutla toplu `deleteMany()`; CLAUDE.md'de "ASLA" listesinde. Artık onaysız hiçbir şey çalışmaz.
- **Son commit:** `ad08368`.
- **Geri alma:** satırı eski hâline döndür + `tests/seed-scripts-safety.unit.test.ts:79` beklentisini `'tsx prisma/seed.ts'` yap.

### 3. `backend/package.json` — `prisma.seed`

- **Eski hâl (aynen):**
  ```json
    "prisma": {
      "seed": "npx tsx prisma/seed.ts"
    },
  ```
- **Yeni hâl:** `"seed": "npx tsx scripts/db-guard.ts seed"`
- **Neden yazılmıştı:** `de6be04` (2026-07-07) — `prisma db seed` / `prisma migrate reset` / ilk `migrate dev`'in
  mock veriyi otomatik yüklemesi için Prisma'nın standart kancası.
- **Neden değişti:** bu kanca, `migrate dev` sıfırlaması sonrası seed.ts'i kullanıcı fark etmeden koşturuyordu.
- **Son commit:** `ad08368`.
- **Geri alma:** değeri eski hâline döndür.

### 4. `backend/README.md` — kurulum adımı 3 ve § Geliştirme Komutları

- **Eski hâl (aynen), kurulum (`README.md:33-35`):**
  ```bash
  # 3. Veritabanı
  npm run prisma:migrate
  npm run prisma:generate
  ```
- **Eski hâl (aynen), geliştirme komutları (`README.md:441`):**
  ```bash
  npm run prisma:migrate   # Migration uygula
  ```
- **Eski hâl (aynen), kurulum adım 4 sonu (`README.md:62-63`):**
  ```bash
  # (tests/readme-seed-guard.unit.test.ts bu README'de çalıştırılabilir `npm run seed` satırı
  # olmadığını denetler.)
  ```
- **Eski hâl (aynen), `README.md:443`:**
  ```bash
  # npm run seed           # ⛔ ÇALIŞTIRMA — toplu deleteMany() (veri SİLER); CANLI=LOKAL AYNI DB.
  ```
- **Yeni hâl:** `npm run prisma:generate` + `npm run prisma:migrate:status` (salt-okuma) çalıştırılabilir satır;
  `npm run prisma:migrate` yalnız `#` yorumunda "KORUMALI" uyarısıyla ve güvenli yol (CLAUDE.md § Migration Kuralı:
  `IF NOT EXISTS` SQL + `prisma db execute` + `prisma migrate resolve`) ile anılır; seed yorumuna "KORUMALI (AJ-57)" eklendi.
- **Neden yazılmıştı:** kurulum satırı `3e49117` (2026-05-22) iskeletinden; `:441` komut listesi `de6be04` (2026-07-07);
  seed uyarıları `5789a01` (AJ-26, "docs(readme): kurulumdan veri silen npm run seed adımı çıkarıldı + koruma testi").
- **Neden değişti:** kurulum adımı veri kaybı yoluydu (özet gerekçe).
- **Son commit:** `5789a01` (backend `README.md`).
- **Geri alma:** satırları yukarıdaki eski hâllerine döndür; `tests/readme-seed-guard.unit.test.ts` kırmızı olur (bilinçli).

### 5. `backend/CLAUDE.md` — § Commands

- **Eski hâl (aynen, `CLAUDE.md:21`):**
  ```bash
  npm run prisma:migrate     # Apply pending migrations
  ```
- **Yeni hâl:** `npm run prisma:migrate:status  # Read-only …` + `prisma:migrate` ve `seed` yalnız `#` yorumunda "GUARDED (AJ-57)".
- **Neden yazılmıştı:** `3e49117` (2026-05-22) iskeletiyle gelen komut listesi.
- **Neden değişti:** ajanlar bu listeyi izler; "Apply pending migrations" açıklaması `migrate dev`'in sıfırlama riskini gizliyordu.
- **Son commit:** `61aae07` (backend `CLAUDE.md`).
- **Geri alma:** satırı eski hâline döndür.

### 6. `backend/tests/seed-scripts-safety.unit.test.ts:79-82` — beklenti

- **Eski hâl (aynen):**
  ```ts
    it('bilinen-tehlikeli düz "seed" komutu güvenli listede DEĞİL (silme protokolü — dokunulmadı)', () => {
      expect(seedCommandNames).not.toContain('seed');
      expect(scripts['seed']).toBe('tsx prisma/seed.ts');
    });
  ```
- **Neden yazılmıştı:** AJ-08 — düz `seed` komutunun güvenli `seed:*` listesine sızmadığını ve silme protokolü gereği
  dokunulmadığını kilitlemek.
- **Neden değişti:** `seed` artık koruma betiğine yönleniyor (kaldırılmadı); beklenti yeni değere güncellendi, `seed:*`
  listesine girmeme şartı aynen duruyor.
- **Son commit:** `639d439`.
- **Geri alma:** beklentiyi eski değere döndür (madde 2 ile birlikte).

### 7. `backend/tests/readme-seed-guard.unit.test.ts` — dedektör (AJ-26)

- **Eski hâl (aynen, yalnız dedektör kısmı):**
  ```ts
  const README_PATH = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'README.md');

  /** Tehlikeli komut: `npm run seed` ve ardından boşluk/satır sonu (alt komutlar `seed:x` hariç). */
  const DANGEROUS_SEED = /^npm\s+run\s+seed(\s|$)/;

  /** Kod bloklarında yorum olmayan, çalıştırılabilir `npm run seed` satırlarını bulur. */
  function findRunnableSeedLines(markdown: string): number[] {
    return codeBlockLines(markdown)
      .filter(({ text }) => DANGEROUS_SEED.test(text.trim()))
      .map(({ lineNo }) => lineNo);
  }
  ```
  (test başlığı: `'kod bloklarında çalıştırılabilir \`npm run seed\` satırı yok'`)
- **Neden yazılmıştı:** AJ-26 (`5789a01`) — README'ye çalıştırılabilir `npm run seed` satırı geri gelmesin.
- **Neden değişti:** yalnız `npm run seed` yakalanıyordu; `migrate dev/reset`, `db seed`, `tsx prisma/seed.ts`,
  `db push --accept-data-loss`, `npm run prisma:migrate` kaçıyordu. Dedektör genişletildi (desen listesi + yorum ayıklama),
  backend/CLAUDE.md de tarandı; eski pozitif/negatif örnek testi aynen duruyor.
- **Son commit:** `5789a01`.
- **Geri alma:** `git -C backend show 5789a01:tests/readme-seed-guard.unit.test.ts > backend/tests/readme-seed-guard.unit.test.ts`.

---

## AJ-73 · OAuth dönüşünde erişim anahtarı adreste

### 1) `backend/src/controllers/authController.ts` — `oauthCallback` başarı yönlendirmesi
- **Eski hâl (AYNEN):**
```ts
    setRefreshCookie(res, result.refreshToken);
    const params = new URLSearchParams({
      accessToken: result.accessToken,
      isNewUser: String(result.isNewUser),
    });
    return res.redirect(`${config.oauth.frontendCallbackUrl}?${params.toString()}`);
```
  Fonksiyon üstündeki eski yorum (AYNEN):
```
 * Başarı: frontend'e accessToken + refreshToken + isNewUser query parametreleriyle yönlendir.
 * Hata: frontend'e error kodu ile yönlendir.
 *
 * Neden redirect? OAuth callback browser tablosunda gerçekleşir; SPA'ya mesaj
 * iletmenin standart yolu URL parametresidir. Frontend'in bu değerleri
 * LocalStorage'a taşıması ve URL'i temizlemesi gerekir.
```
- **Neden yazılmıştı:** OAuth dönüşü tarayıcı yönlendirmesiyle gelir; SPA'ya erişim anahtarını iletmenin en kısa yolu adres parametresiydi (yenileme anahtarı sonradan HttpOnly çereze taşındı, erişim anahtarı adreste kaldı).
- **Neden değişti:** adresteki anahtar tarayıcı geçmişine, erişim günlüklerine ve Referer başlığına düşer. Yenileme çerezi zaten set edildiği için frontend anahtarı `POST /api/auth/refresh` ile alabilir; e-posta/şifre `login` ucu da anahtarı gövdede döndürür.
- **Son commit (değişiklikten önce, backend):** `b79547dd51c24bae7a3a96348f475d8268488124`
- **Geri alma:** backend'de `git revert <AJ-73 backend commit>` (frontend yeni sürümü eski backend'le de çalışır; adresteki anahtarı yok sayar, çerezden devam eder).

### 2) `frontend/src/app/oauth/callback/page.tsx` — adresteki anahtarla oturum açma
- **Eski hâl (dosyanın TAMAMI, AYNEN):**
```tsx
'use client';

/**
 * OAuth Callback Sayfası
 *
 * Backend'in başarılı OAuth sonrası yönlendirdiği URL.
 * Parametreler: accessToken, refreshToken, expiresIn, isNewUser (veya error)
 *
 * Önceki sorun: localStorage'a yazılıyordu ama AuthProvider state güncellenmiyordu.
 * Düzeltme: loginWithTokens() state + localStorage + user profili günceller.
 */

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { UI_TEXT } from '@/lib/uiText';

function OAuthCallbackInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { loginWithTokens } = useAuth();

  useEffect(() => {
    const error = params.get('error');
    if (error) {
      router.replace(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    const accessToken = params.get('accessToken');
    const expiresIn = parseInt(params.get('expiresIn') ?? '3600', 10);

    if (!accessToken) {
      router.replace('/login?error=GECERSIZ_CALLBACK');
      return;
    }

    // refreshToken HttpOnly cookie'de (backend redirect'te set etti)
    loginWithTokens(accessToken, expiresIn)
      .then(() => {
        const isNewUser = params.get('isNewUser') === 'true';
        router.replace(isNewUser ? '/dashboard?welcome=1' : '/dashboard');
      })
      .catch(() => {
        router.replace('/login?error=SUNUCU_HATASI');
      });
  }, [params, router, loginWithTokens]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground text-sm animate-pulse">Giriş yapılıyor…</p>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm animate-pulse">{UI_TEXT.status.loading}</p>
        </div>
      }
    >
      <OAuthCallbackInner />
    </Suspense>
  );
}
```
- **Neden yazılmıştı:** backend erişim anahtarını adreste gönderiyordu; sayfa onu okuyup `loginWithTokens` ile oturum açıyordu.
- **Neden değişti:** anahtar artık adreste gelmiyor; sayfa AuthProvider'ın açılıştaki sessiz yenilemesini (çerezle `/api/auth/refresh`) bekler. Adreste eski biçimde anahtar gelirse kullanılmaz, adresten silinir. `loginWithTokens` (AuthProvider) yerinde bırakıldı — şu an çağıranı yok; kaldırılması silme protokolüne tabidir.
- **Son commit (değişiklikten önce, çatı):** `59d5c79be97ec8e4a4cdde729eeeef7c43af8ae6`
- **Geri alma:** `git checkout 59d5c79 -- frontend/src/app/oauth/callback/page.tsx` (yalnız backend de geri alınmışsa anlamlı).

---

## AJ-74 · Oryantasyon kilidi kurum filtresiz ve 404 kontrolünden önce

### 1) `backend/src/controllers/meetingController.ts` — `checkOrientationLock` + `createMeeting` içindeki çağrısı
- **Eski hâl (AYNEN):**
```ts
async function checkOrientationLock(mentiId: string, res: Response): Promise<boolean> {
  const menti = await prisma.user.findUnique({
    where:  { id: mentiId },
    select: { needsOrientation: true },
  });
  if (menti?.needsOrientation) {
    res.status(403).json({
      error:   'ORYANTASYON_KILIDI',
      message: 'Bu menti oryantasyon kilidi nedeniyle yeni görüşme oluşturamaz.',
    });
    return true;
  }
  return false;
}
```
  `createMeeting` içinde (GV-06 sahiplik kontrolünden hemen sonra, kurum-kapsamlı mentör/menti sorgusundan ÖNCE):
```ts
  if (await checkOrientationLock(mentiId, res)) return;
```
  ve kurum-kapsamlı menti sorgusunun seçimi: `select: USER_IDENTITY_SELECT,`
- **Neden yazılmıştı:** oryantasyon kilidi olan menti (ör. geri bildirim sonrası kilitlenen) görüşme rehberini tamamlamadan yeni görüşme açamasın diye; kontrol en başa, ayrı bir sorguyla konmuştu.
- **Neden değişti:** `findUnique` kurum filtresi taşımıyor (otomatik kurum filtresinin bilinçli dışında) ve 404 kontrollerinden önce koşuyordu → başka kurumdaki bir menti kimliğiyle istekte kilitliyse 403 `ORYANTASYON_KILIDI`, değilse 404 dönüyor, başka kurumdaki kaydın kilit durumu yanıttan çıkarılabiliyordu. Artık kilit, kurum-kapsamlı `findFirst` ile bulunan menti kaydından (`needsOrientation` seçime eklendi) okunuyor ve 404 kontrollerinden SONRA değerlendiriliyor (`rejectIfOrientationLocked`). Kendi kurumunda kilitli menti yine 403 `ORYANTASYON_KILIDI` alır.
- **Son commit (değişiklikten önce, backend):** `e1bce3bdf4bccdf944396586a5cd591a0f9d40e2` (dosyaya son dokunan) · backend main `b79547dd51c24bae7a3a96348f475d8268488124`
- **Geri alma:** backend'de `git revert <AJ-74 backend commit>` (şema/migration yok).
