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

## AJ-75 · Kurum-kapsamlı modellerde findUnique lint kuralı

### 1) `backend/src/db.ts` — TENANT_SCOPED kümesi dışa açıldı
- **Eski hâl (AYNEN):**
```ts
// Bu modeller tenantId sütunu taşır; okuma sorgularına otomatik filtre enjekte edilir.
const TENANT_SCOPED = new Set([
```
- **Neden yazılmıştı:** kurum-kapsamlı model listesi yalnız bu dosyadaki kurum filtresi (RLS eklentisi) için kullanılıyordu; dışarıya açmaya gerek yoktu.
- **Neden değişti:** `export const TENANT_SCOPED` oldu + iki satır açıklama eklendi. `eslint.config.mjs` (findUnique bekçisi) aynı listeyi tutuyor; `tests/eslint-tenant-findunique.unit.test.ts` iki listenin eşit kaldığını ölçmek için bu kümeyi içe aktarıyor. Davranış değişmedi (yalnız erişilebilirlik).
- **Not:** `backend/eslint.config.mjs`'te mevcut satır kaldırılmadı/değişmedi; yalnız ekleme (liste + `src/**/*.ts` için `no-restricted-syntax` bloğu). 18 kaynak dosyaya yalnız `// eslint-disable-next-line` yorum satırı eklendi.
- **Son commit (değişiklikten önce, backend):** `900a472daaa5607fab846a3fed2227a48f36b97d` (dosyaya son dokunan) · backend main `f92e528245a902b842842b57b6b2eb7bc9fac984`
- **Geri alma:** backend'de `git revert <AJ-75 backend commit>` (şema/migration yok).

## GÖREV 2.4 · Duruma göre bölme — belge bekçisinin karar kartı kontrolü yeni yola

### 1) `scripts/belge-bekci.sh` — başlık yorumu ve 01-KARARLAR "İŞLENDİ" hata mesajı
- **Eski hâl (AYNEN):**
```text
#   · docs/otonom/01-KARARLAR.md'de "İŞLENDİ" notlu karar kartı (kural c)
```
```python
            errors.append(f'01-KARARLAR.md {card.split(chr(10), 1)[0][:60]} "İŞLENDİ" notlu kart aktif dosyada → arsiv/01-KARARLAR-cevaplanmis.md (5c-c)')
```
- **Neden yazılmıştı:** kart gövdeleri `01-KARARLAR.md` içindeydi; cevabı işlenen kart `arsiv/01-KARARLAR-cevaplanmis.md`'ye taşınmalıydı (OTONOM-PROMPT 5c-c).
- **Neden değişti:** kartlar kart başına dosyaya ayrıldı (`docs/otonom/kararlar/KARAR-NNN.md`); işlenen kartın yeni yeri `docs/otonom/arsiv/kararlar/`. Yorum ve mesaj yeni yolu söylüyor; kontrol `kararlar/KARAR-*.md` dosyalarını da tarıyor (HATA), ayrıca yeni UYARI (n) — 00-KUYRUK'ta 🔴 kapılı satır. Eski kontrol (01-KARARLAR.md içindeki kartlar) KALDI.
- **Son commit (değişiklikten önce):** dosyaya son dokunan `47d3804e9d0e99452d28433d9bf88111427585f8` · çatı main `03da00623b34965a1ab2c1b9a285d43d50752778`
- **Geri alma:** çatıda `git revert <GÖREV 2.4-E commit>` (yalnız script + test; şema/migration yok).

### 2) `scripts/belge-bekci.sh` — kural (n) başlık yorumu (GÖREV 2.4 düzeltmesi)
- **Eski hâl (AYNEN):**
```text
#   · kural (n): 00-KUYRUK'ta kapısı 🔴 olan satır → 00-KUYRUK-KARAR-BEKLEYEN.md'ye (GÖREV 2.4, 5c-n)
```
- **Neden yazılmıştı:** 5c (n) ilk hâlinde yalnız kapısı 🔴 satırları kapsıyordu (aynı PR, commit `2dae3ef`).
- **Neden değişti:** geri bakılabilirlik testi, Durumu ATLANDI(karar) olan (kapısı 🟢) satırların da karar beklediğini ama haritada görünmediğini buldu; (n) bunları da kapsayacak şekilde genişletildi, bekçi ATLANDI(karar) satırı için de UYARI veriyor (+1 test vakası).
- **Son commit (değişiklikten önce):** `2dae3ef` (bu PR'ın E commit'i; origin/main'de bu satır yoktu)
- **Geri alma:** `git revert <GÖREV 2.4-G commit>`.


---

## GÖREV 2.5 — belge bekçisi boyut eşikleri daraltıldı (çatı `otonom/KURAL-I-BAGLAM-20260928`)

**Tam yol:** `scripts/belge-bekci.sh` — `LIMITS` listesinin ilk iki satırı (eski hâl AYNEN):

```python
LIMITS = [('docs/otonom/00-KUYRUK.md', 150), ('docs/otonom/01-KARARLAR.md', 150),
          ('docs/otonom/02-ILERLEME.md', 150), ('CLAUDE.md', 35), ('docs/otonom/OTONOM-PROMPT.txt', 35),
```

**Yeni hâl:** `('docs/otonom/00-KUYRUK.md', 90), ('docs/otonom/01-KARARLAR.md', 40), ('docs/otonom/02-ILERLEME.md', 80)` (diğer eşikler aynı).
**Neden yazılmıştı:** PO K-A (2026-09-26) — sık okunan dosyalarda şişmeyi yakalamak için ilk eşikler; o gün dosyalar 150 KB civarındaydı.
**Neden değişti:** GÖREV 2.4 (2026-09-28) duruma göre bölmeden sonra 01-KARARLAR yalnız indeks (≈35 KB), karar bekleyen satırlar ayrı dosyada; 150 KB eşiği artık hiçbir şişmeyi yakalamıyordu. PO GÖREV 2.5 isteği: 00-KUYRUK 90 · 01-KARARLAR 40 · 02-ILERLEME 80 KB. Yalnız UYARI (çıkış kodu değişmez).
**Son commit hash (değişiklik öncesi):** `060594c` (`scripts/belge-bekci.sh` son değişikliği).
**Geri alma:** üç sayıyı 150'ye çevir (ya da `git show 060594c:scripts/belge-bekci.sh`); test `scripts/belge-bekci.test.sh` "boyut negatif/pozitif" vakaları eşikle birlikte güncellenmeli.
Kural metnindeki eski eşik satırı: `docs/otonom/arsiv/kural-gecmisi-OTONOM-PROMPT.md` § GÖREV 2.5.

## AJ-83 · Mesajlar gelen kutusu sayfalama

### 1) `frontend/src/lib/api/conversations.ts` — `conversationsApi.list`
- **Eski hâl (AYNEN):**
```ts
  list: (api: BoundClient): Promise<ApiResult<ConversationListResponse>> =>
    api<ConversationListResponse>('/api/conversations'),
```
- **Neden yazılmıştı:** sunucu sayfalamasından (F-27) önce uç tüm konuşmaları döndürüyordu; parametre gerekmiyordu.
- **Neden değişti:** F-27 sonrası sunucu yalnız ilk 30'u döndürüyor; ön yüz sonraki sayfayı isteyebilsin diye isteğe bağlı `{ limit?, offset? }` eklendi. Parametresiz çağrı (ör. `menti/page.tsx`) aynı isteği atar — davranış değişmedi.
- **Son commit (değişiklikten önce):** dosyaya son dokunan `41e53abc8fbde1ff775fbe49b2ebe0559482a69f` · çatı main `a99fe89ff22f24fa268f681207f55e1d6d099897`
- **Geri alma:** çatıda `git revert <AJ-83 commit>` (şema/migration yok).

### 2) `frontend/src/app/(dashboard)/messages/page.tsx` — liste gövdesi
- **Eski hâl (AYNEN, değişen satırlar):**
```tsx
  const { data, isLoading: loading } = useQuery(
    () => conversationsApi.list(api),
    [api],
    { enabled: !!user, cacheKey: 'conversations:list' },
  );
```
```tsx
          ) : !data || data.items.length === 0 ? (
```
```tsx
            <div className="divide-y divide-border">
              {data.items.map((c) => (
```
- **Neden yazılmıştı:** tek sorgu tüm listeyi getiriyordu (F-27 öncesi).
- **Neden değişti:** yalnız ilk sayfa görünüyordu (30'dan sonrası erişilemez). Artık ilk sayfa + "Daha fazla göster" ile eklenen sayfalar id ile tekilleştirilerek gösteriliyor; ilk sayfa hatasında "Henüz mesajınız yok" yerine Türkçe hata görünüyor. Liste satırının biçimi değişmedi (yalnız bir kat girinti).
- **Son commit (değişiklikten önce):** dosyaya son dokunan `cefa2c439ac16a97c1a7015bc46bb32d4352a554` · çatı main `a99fe89ff22f24fa268f681207f55e1d6d099897`
- **Geri alma:** çatıda `git revert <AJ-83 commit>`.

## AJ-60 · Sertifika molası: sayfa yeniden açılınca kalan süre (değişen satırlar)

### 1) `backend/src/controllers/sjtScoringController.ts` — `certQuestionsHandler`
- **Eski hâl (AYNEN, değişen satırlar):**
```ts
    select: { certWrongTopics: true, certAttempts: true },
```
```ts
  return res.status(200).json({ questions, retryTopics });
```
- **Neden yazılmıştı:** soru ucu yalnız sınav sırası (yanlış konular başa, diğer varyant) için kişinin kendi `certWrongTopics`/`certAttempts` verisini okuyordu (madde 157).
- **Neden değişti:** mola bitiş anı yalnız değerlendirme yanıtında (AJ-37) dönüyordu; sayfa mola sırasında açılınca kalan süre görünmüyordu. Select'e `cooldownUntil` eklendi, yanıt `cooldownUntil` (gelecekteyse ISO, değilse null) alanıyla genişledi — eski alanlar aynen duruyor.
- **Son commit (değişiklikten önce):** dosyaya son dokunan `cd95f0f53fda028a478d19a6e0751fdf1bd39d22` · backend main `b3502a52d4ac21952c41fc82016d75a972ebe501`
- **Geri alma:** backend'de `git revert <AJ-60 commit>` (şema/migration yok).

### 2) `frontend/src/app/(dashboard)/mentor/certification/page.tsx` — son adım düğmesi ve mola uyarısı
- **Eski hâl (AYNEN, değişen satırlar):**
```tsx
              <Button onClick={() => void proceed()} size="sm">
                {topicIdx >= topics.length - 1 &&
                !(variantIdx === 0 && !reveal.firstAttemptPass && currentTopic.variants.length > 1)
                  ? 'Bitir ve değerlendir →'
                  : 'Devam →'}
              </Button>
```
```tsx
            <AlertMessage
              type="error"
              message={
                cooldownRunning && cooldownUntil
                  ? CERT_COOLDOWN_TEXT.alreadyActive(formatRemaining(cooldownUntil, now))
                  : CERT_COOLDOWN_TEXT.alreadyActiveUnknown
              }
            />
```
```tsx
          {cooldownActive && (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
```
- **Neden yazılmıştı:** AJ-37 kalan süreyi yalnız değerlendirme gönderildikten sonra (409 / sonuç ekranı) gösterdi; son adım düğmesi her zaman açıktı.
- **Neden değişti:** mola sürerken "Bitir ve değerlendir" kilitlenir (koşul `isFinalStep` sabitine çıkarıldı — metin seçimi aynı); süre ekran açıkken dolunca uyarı "mola bitince" metninde takılı kalmak yerine `CERT_COOLDOWN_TEXT.ended` gösterir ve Öğrenme Yolculuğu köprüsü gizlenir.
- **Son commit (değişiklikten önce):** dosyaya son dokunan `23a7431ec8575428c7dd45ce1ecb6163dabe71af` · çatı main `23f761a517dd9041f4e7a1abac4c566fb9c4a8a0`
- **Geri alma:** çatıda `git revert <AJ-60 commit>`.


---

## AJ-70 — üç soru ekranı form görünümüne alındı + kart öncesi kısa geçiş (çatı `otonom/AJ-70-onboarding-gecis-20260928`)

**Özet gerekçe:** madde 141 (`docs/kararlar/00-KARAR-TAKIP.md:311`) PO ek önlemleri: (1) üç soru kart ekranından
FARKLI görsel dilde olmalı ("test bitti, form dolduruyorum" hissi); (2) kart açılışına kısa gecikme — sorulardan
ayırsın, ödül anını belirginleştirsin. I-02 yalnız sıra + cümleyi yapmıştı. Hiçbir özellik/veri/uç kaldırılmadı;
yalnız görünüm (sınıflar, kap öğesi) ve adım geçişi değişti. Son commit (iki dosya): `1a1fb9a`.
Geri alma: `git revert <AJ-70 merge commit>` ya da aşağıdaki eski hâlleri geri yapıştır.

### 1. `frontend/src/app/onboarding/_steps/ThreeQuestionsStep.tsx` — kap öğesi + seçenek görünümü (satır 58-188, eski hâl aynen)

- **Neden yazılmıştı:** §10.2 üç soru ekranı (S1 çoklu, S2/S3 tek seçim); F-21 radiogroup erişilebilirliği.
- **Neden değişti:** kart ekranıyla aynı görsel dili (yuvarlak hap düğmeler, `rounded-xl` kartlar, `scale-105`) paylaşıyordu.
  Yeni hâl: adlandırılmış `<form aria-label="Tercihler">`, nötr zemin + düz kenarlık, bölmeli sorular, onay kutusu /
  seçim düğmesi işaretli satırlar, gönderim form `onSubmit` üzerinden (düğme `type="submit"`). Seçenek metinleri,
  roller, `aria-pressed`/`aria-checked`, gönderilen veri AYNI.

```tsx
  const handleSubmit = () => {
    if (!canSubmit) return;
    const s1Payload = isMentor
      ? (s1Sel.length > 0 ? { mentorStrengths: s1Sel as MentorStrength[] } : {})
      : (s1Sel.length > 0 ? { mentiNeeds: s1Sel as MentiNeed[] } : {});
    onComplete({
      ...s1Payload,
      supportApproach: supportApproach!,
      priorityValue:   priorityValue!,
    });
  };

  return (
    <div className="space-y-8">
      {/* ── S1 — ihtiyaç / fayda (en fazla 2, opsiyonel) ─────────────────── */}
      <fieldset>
        <legend className="text-sm font-semibold text-foreground mb-1">{s1.prompt}</legend>
        <p className="text-xs text-muted-foreground mb-3">
          En fazla 2 seçebilirsin · emin değilsen boş bırakabilirsin
        </p>
        <div className="flex flex-wrap gap-2">
          {s1.options.map(({ value, label }) => {
            const selected = s1Sel.includes(value);
            const disabled = !selected && atLimit;
            return (
              <button
                key={value}
                type="button"
                onClick={() => toggleS1(value)}
                disabled={disabled}
                aria-pressed={selected}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all',
                  selected
                    ? 'bg-primary/15 text-primary border-primary shadow-sm scale-105'
                    : disabled
                      ? 'bg-muted/40 text-muted-foreground/40 border-border cursor-not-allowed'
                      : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground',
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* ── S2 — yaklaşım (zorunlu, tek seçim) ───────────────────────────── */}
      <fieldset>
        <legend id={s2LegendId} className="text-sm font-semibold text-foreground mb-3">
          {s2.prompt} <span className="text-destructive">*</span>
        </legend>
        {/* F-21: tek seçim → radiogroup (ok tuşlarıyla gezilir ve seçilir). S1 çoklu seçim olduğu
            için aria-pressed'li düğme olarak kalır. */}
        <div
          role="radiogroup"
          aria-labelledby={s2LegendId}
          aria-required="true"
          onKeyDown={(e) => handleRadioGroupKeyDown(e)}
          className="grid gap-2"
        >
          {s2.options.map(({ value, label }, index) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={supportApproach === value}
              tabIndex={rovingTabIndex(index, s2.options.findIndex((o) => o.value === supportApproach))}
              onClick={() => setSupportApproach(value)}
              className={cn(
                'rounded-xl border p-3 text-left text-sm transition-all',
                supportApproach === value
                  ? 'bg-primary/10 border-primary text-foreground font-semibold'
                  : 'bg-card border-border hover:border-primary/40',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* ── S3 — öncelik/değer (zorunlu, tek seçim) ──────────────────────── */}
      <fieldset>
        <legend id={s3LegendId} className="text-sm font-semibold text-foreground mb-3">
          {S3.prompt} <span className="text-destructive">*</span>
        </legend>
        <div
          role="radiogroup"
          aria-labelledby={s3LegendId}
          aria-required="true"
          onKeyDown={(e) => handleRadioGroupKeyDown(e)}
          className="grid grid-cols-2 gap-2"
        >
          {S3.options.map(({ value, label }, index) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={priorityValue === value}
              tabIndex={rovingTabIndex(index, S3.options.findIndex((o) => o.value === priorityValue))}
              onClick={() => setPriorityValue(value)}
              className={cn(
                'rounded-xl border p-3 text-center text-sm transition-all',
                priorityValue === value
                  ? 'bg-primary/10 border-primary text-foreground font-semibold'
                  : 'bg-card border-border hover:border-primary/40',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      {error && (
        <p className="text-sm text-destructive text-center" role="alert">{error}</p>
      )}

      <Button
        onClick={handleSubmit}
        disabled={!canSubmit || isSubmitting}
        size="lg"
        className="w-full h-12 text-base rounded-xl gap-2"
      >
        {isSubmitting ? UI_TEXT.status.saving : 'Tamamla ve Eşleşmeye Geç'}
        {!isSubmitting && <ChevronRight className="h-4 w-4" aria-hidden />}
      </Button>
    </div>
  );
}
```

### 2. `frontend/src/app/onboarding/_OnboardingContent.tsx` — başarıda anında kart adımı (satır 163-170, eski hâl aynen)

- **Neden yazılmıştı:** I-02 — üç soru kaydedilince kart (adım 4) açılsın.
- **Neden değişti:** madde 141 PO ek önlemi 2 — kart doğrudan değil, kısa geçişle (`CARD_REVEAL_DELAY_MS`,
  `frontend/src/lib/onboardingReveal.ts`) açılır; `prefers-reduced-motion`'da geçiş atlanır ve eski davranış (anında kart) korunur.

```tsx
    const result = await submitMatchingPreferences(data, accessToken, user.tenantId);

    setIsSubmitting(false);
    if (result.ok) {
      setStep(3);
    } else {
      setStepError(result.error.message ?? 'Tercihlerin kaydedilemedi. Tekrar deneyin.');
    }
```

## AJ-56 · Misafir üye — pasif sayım, onaylayan adı, hatırlatma, koçluk önerisi üyelikten (backend `otonom/AJ-56-misafir-uye-okuma-20260928`)

### 1) `backend/src/services/retentionMetrics.service.ts` — `computeHealthMetrics` — `passiveWhere` + pasif sayım/liste sorgusu + dönüş
- **Eski hâl (AYNEN, değişen/kaldırılan satırlar):**
```ts
    approvalStatus: 'APPROVED' as const,
    OR: [
      { lastLoginAt: { lt: passiveCutoff } },
      { lastLoginAt: null, createdAt: { lt: passiveCutoff } },
    ],
```
```ts
    prisma.user.count({ where: passiveWhere }),
    prisma.user.findMany({
```
```ts
      select: { id: true, fullName: true, role: true, lastLoginAt: true, createdAt: true },
      orderBy: { lastLoginAt: { sort: 'asc', nulls: 'first' } }, // en pasif üstte
```
```ts
    passiveMembers: { count: passiveCount, items: passiveItems },
```
- **Neden yazılmıştı:** Pasif üye (X gündür girişsiz) sayımı ve drill-down listesi; tek kuruma scoped (yönetici paneli S2 sorusu).
- **Neden değişti:** Sorgu `prisma.user` + `tenantId` = ev-sahibi kurumdu; misafir üye (ev-sahibi başka kurum, bu kurumda aktif üyelik) sayılmıyordu. Komşu `mentorlessWhere` (AJ-40) gibi üyelikten başlar; rol = bu kurumdaki üyelik rolü.
- **Son commit (değişiklikten önce):** dosyaya son dokunan `4afdab3e4ec76332dfb140c02e8539f05c6c1ed2` · backend main `2efa2630a59f4011f68cc07876e3ccba77a7f576`
- **Geri alma:** backend'de `git revert <AJ-56 commit>` (şema/migration yok).

### 2) `backend/src/controllers/adminController.ts` — `nudgeUser` hedef arama · `adminListUsers` onaylayan/reddeden adı · `getCoachingSuggestions` hedef arama
- **Eski hâl (AYNEN, değişen/kaldırılan satırlar):**
```ts
  // Tenant izolasyonu: hedef bu tenant'ın üyesi olmalı.
  const target = await prisma.user.findFirst({
    where: { id: targetId, tenantId },
    select: { id: true, email: true, fullName: true, role: true, isActive: true },
  });
  if (!target || !target.isActive) {
```
```ts
  if (target.role === 'ADMIN') {
```
```ts
    const admins = await prisma.user.findMany({
      where: { id: { in: adminIds }, tenantId: req.tenant.tenantId },
      select: { id: true, fullName: true },
```
```ts
    for (const a of admins) nameById.set(a.id, a.fullName);
```
```ts
  const user = await prisma.user.findFirst({
    where: { id: userId, tenantId: req.tenant.tenantId },
    select: { id: true, fullName: true },
  });
  if (!user) {
```
- **Neden yazılmıştı:** Hedef kişinin bu kurumun üyesi olduğunu doğrulamak (kurum izolasyonu) ve onaylayan yönetici adını çapraz-kurum sızdırmadan çözmek.
- **Neden değişti:** `prisma.user.findFirst/findMany({ id, tenantId })` ev-sahibi kurumla arıyordu → misafir üye 404 / misafir yöneticinin adı null. Artık `findTenantMember` (aktif üyelik) / `tenantMembership.findMany` — kurum filtresi üyelik satırında. Kişi-genel yazan işlemler DEĞİŞMEDİ (KARAR-133).
- **Son commit (değişiklikten önce):** dosyaya son dokunan `97d59ee1ed9ff5a5c01b39c2e57ebe18b9f36678` · backend main `2efa2630a59f4011f68cc07876e3ccba77a7f576`
- **Geri alma:** backend'de `git revert <AJ-56 commit>` (şema/migration yok).

### 3) `backend/src/services/coachingSuggestions.ts` — `generateSuggestions` — kişi arama
- **Eski hâl (AYNEN, değişen/kaldırılan satırlar):**
```ts
  const user = await prisma.user.findFirst({
    where: { id: userId, tenantId },
    select: {
      id: true, role: true, fullName: true,
      discType: true, approvalStatus: true,
      needsOrientation: true, rematchCount: true,
      createdAt: true,
    },
```
```ts
  if (!user) return [];
```
- **Neden yazılmıştı:** Kural bazlı koçluk önerisi için kişinin metriklerini okumak; bu kurumla sınırlı.
- **Neden değişti:** Ev-sahibi kurum sorgusu misafirde boş öneri döndürüyordu. `findTenantMember` ile üyelikten; kullanılmayan `role/fullName/approvalStatus` seçimi düştü; misafirde `rematchCount` (başka kurumun kararı, AJ-40 maskesi) 0 sayılır.
- **Son commit (değişiklikten önce):** dosyaya son dokunan `1e6da66881da97eea56de84110606ed78cf05449` · backend main `2efa2630a59f4011f68cc07876e3ccba77a7f576`
- **Geri alma:** backend'de `git revert <AJ-56 commit>` (şema/migration yok).

### 4) `backend/src/services/nudgeService.ts` — `wasRecentlyNudged` — spam limiti filtresi
- **Eski hâl (AYNEN, değişen/kaldırılan satırlar):**
```ts
      meta: { path: ['targetUserId'], equals: targetUserId },
      // tenantId de meta'da tutulur; targetUserId zaten tenant'a özgü olduğundan tek filtre yeterli.
```
- **Neden yazılmıştı:** Aynı kişiye 24 saatte tek dürtme (spam limiti); yorumda "targetUserId zaten tenant'a özgü" varsayımı.
- **Neden değişti:** Varsayım misafir üyede geçersiz: A kurumunun dürtmesi B yöneticisine 429 olarak sızıyordu. Filtre `meta.tenantId` ile kurum başına.
- **Son commit (değişiklikten önce):** dosyaya son dokunan `465ae47bc431abbccad2bf1a90f416dca2bb7cd5` · backend main `2efa2630a59f4011f68cc07876e3ccba77a7f576`
- **Geri alma:** backend'de `git revert <AJ-56 commit>` (şema/migration yok).

## AJ-85 · text-emerald-600 kontrastı + düğme grubu adları (çatı `otonom/AJ-85-kontrast-grup-etiket-20260928`)

Silme YOK — yalnız sınıf/öznitelik değişti. Taban commit: `6fdd83b` (çatı main). Geri alma: `git revert <AJ-85 commit>` ya da aşağıdaki eski satırları aynen geri koy.

- **Neden yazılmıştı:** yeşil "olumlu durum" tonu olarak `text-emerald-600` (koyu tema `emerald-400`) — AJ-07/K-10 koyu tema düzeltmesinin açık tema yarısı. Platform rozetleri `bg-green-900/60` zemini koyu tema için seçilmişti.
- **Neden değişti:** WCAG 1.4.3 — `emerald-600` beyaz zeminde 3.77:1 (AA 4.5:1 altı); rozetlerde `bg-green-900/60` açık temada beyazla karışınca (#729881) üstündeki yeşil metin 1.17:1. Metin → `text-emerald-700` (5.48:1; `bg-emerald-50` üstünde 5.21:1); rozet → `SUCCESS_PILL_CLASS` (`frontend/src/lib/a11y/statusColors.ts`: açıkta `bg-emerald-100 text-emerald-800` 6.78:1, koyu tema eski çift `dark:` ile aynen). Düğme gruplarına `role="group"` + ad + `aria-pressed` eklendi (erişilebilirlik denetimi bulgu #11).
- ⏳ `frontend/src/app/platform/tenants/[id]/page.tsx:37,178` DOKUNULMADI (AJ-79 dosya çakışması) — test istisna listesinde.

Eski satırlar (dosya:satır, aynen):
```
frontend/src/components/organisms/TenantSwitcher.tsx:132
                        <span className="inline-flex items-center gap-0.5 rounded bg-emerald-50 px-1 text-[10px] font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
frontend/src/components/organisms/ProgramHealthSection.tsx:11,67,78-79,181
import { useState } from 'react';
        <h2 className="text-lg font-semibold">Program Sağlığı</h2>
      {/* Tıklanabilir özet sayılar */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
    return <span className="shrink-0 text-xs font-medium text-emerald-600 dark:text-emerald-400">Gönderildi ✓</span>;
frontend/src/app/platform/dashboard/page.tsx:244-245,470,486,672
      {/* Tabs */}
      <nav className="border-b border-border px-6 flex gap-1">
                        t.verificationStatus === 'APPROVED' || t.verificationStatus === 'AUTO_APPROVED' ? 'bg-green-900/60 text-emerald-600 dark:text-emerald-400' :
                          className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300">
      <p className={`text-sm font-semibold mt-1 flex items-center gap-1.5 ${ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}>
frontend/src/app/platform/tenants/[id]/_components/MeetingsTable.tsx:18,71
      return 'bg-green-900/60 text-emerald-600 dark:text-emerald-400';
                  m.hasFeedback ? 'bg-green-900/60 text-emerald-600 dark:text-emerald-400' : 'bg-muted text-muted-foreground'
frontend/src/app/platform/tenants/[id]/_components/MembersTable.tsx:47,115
      <div className="flex flex-wrap gap-1">
                      m.isActive ? 'bg-green-900/60 text-emerald-600 dark:text-emerald-400' : 'bg-red-900/60 text-destructive'
frontend/src/app/platform/tenants/[id]/users/[userId]/page.tsx:34
    ? 'bg-green-900/60 text-emerald-600 dark:text-emerald-400'
frontend/src/components/molecules/SectorTagSuggest.tsx:24
  success: 'text-emerald-600 dark:text-emerald-400',
frontend/src/app/(dashboard)/profile/page.tsx:449
        <p className="text-sm text-emerald-600 dark:text-emerald-400 text-center font-medium" role="status">
frontend/src/app/onboarding/stk/pending-review/page.tsx:54
        icon={<CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />}
frontend/src/app/onboarding/stk/_steps/Step1Slug.tsx:70,115
    if (slugStatus === 'available') return <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
            <p className="text-xs text-emerald-600 dark:text-emerald-400">Bu adres kullanılabilir.</p>
frontend/src/app/onboarding/stk/_steps/Step5Invite.tsx:27
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />}
frontend/src/app/(admin)/admin/algorithm-tuner/page.tsx:239,245,266
          <CardTitle className="text-base">Analiz Bildirimi Sıklığı</CardTitle>
          <div className="grid gap-2 sm:grid-cols-3">
            {freqSaved && <span className="text-xs text-emerald-600 dark:text-emerald-400">✓ Kaydedildi</span>}
frontend/src/app/(admin)/admin/reports/page.tsx:204-205
      {/* Durum filtresi */}
      <div className="flex flex-wrap gap-2">
frontend/src/app/(admin)/admin/eslesmeler/page.tsx:72-73 · sertifika-sonuclari/page.tsx:63-64
      {/* Durum sekmeleri */}
      <div className="flex flex-wrap gap-1 rounded-lg bg-muted p-1 w-fit">
frontend/src/app/(admin)/admin/tags/page.tsx:58-59
      {/* Durum sekmeleri */}
      <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit">
```
(Grup düğmelerine eklenen `type="button"` / `aria-pressed` satırları salt eklemedir; eski hâlde yoklardı.)

## AJ-86a · Landing Bento skoru — sıfır etikette %52 (çatı `otonom/AJ-86a-bento-20260928`)

Silme YOK — satır-içi formül saf fonksiyona (`frontend/src/lib/landingBentoScore.ts` `bentoMatchScore`) taşındı. Taban commit: `9f3787e` (çatı main; dosyanın son commit'i `4a0b5f4`). Geri alma: `git revert <AJ-86a commit>` ya da aşağıdaki eski satırları aynen geri koy.

- **Neden yazılmıştı:** landing "Teknik Eşleşme Skoru" demosu — seçilen etiket sayısıyla canlı artan görsel skor (taban 52, etiket başı 4, tavan 97).
- **Neden değişti:** taban puan etiket sayısından bağımsız eklendiği için hiç etiket seçilmediğinde de %52 gösteriyordu ("0 ortak alan" yazısıyla çelişki; `docs/kararlar/konu/06-tasarim-ux.md` § Landing UX paketi "mantık hatası, öncelikli"). Yeni kural: 0 etiket → 0; 1+ etiket → eski formül aynen (başlangıçtaki 4 etiket yine %68).

Eski satırlar (dosya:satır, aynen):
```
frontend/src/app/_sections/AlgorithmBento.tsx:36-37
  const rawScore = 52 + selected.size * 4;
  const matchScore = Math.min(97, rawScore);
```

## AJ-86b · Landing bilgi balonu (InfoTooltip) + gri metin kontrastı (çatı `otonom/AJ-86b-tooltip-kontrast-20260928`)

Silme YOK — bileşenin davranışı/sınıfları değişti, landing metni aynı. Taban commit: `9f3787e` (çatı main; `InfoTooltip.tsx` son commit'i `32673ff`). Geri alma: `git revert <AJ-86b commit>` ya da aşağıdaki eski hâli aynen geri koy.

- **Neden yazılmıştı:** landing'deki doğrulanabilir iddiaların yanına kaynaklı açıklama balonu (hover + tıklama); gri tonlar koyu landing tasarımının ikincil metin hiyerarşisi.
- **Neden değişti:** `docs/kararlar/konu/06-tasarim-ux.md` § Landing UX paketi: balon ile ikon arasındaki `mt-2` boşluğunda fare kapsayıcıdan çıkıp balon kapanıyordu (kaynak linklerine ulaşılamıyordu); tetikleyicinin `onBlur`'u link tıklaması tamamlanmadan balonu kaldırıyordu; balon ekrana sığmasa da hep altta/ortalı açılıyordu; ikon `text-muted-foreground` koyu zeminde soluk; kaynak linki `text-primary` açık temada beyaz balonda 4.34:1 (AA altı). `text-slate-500` koyu landing zeminlerinde 3.07–4.24:1, `text-slate-600` 1.93–2.66:1 (AA 4.5:1 altı) → `text-slate-400` (≥5.71:1).

Eski `frontend/src/components/atoms/InfoTooltip.tsx` render bloğu (aynen; üstteki import/prop/Escape-dışarı-tıklama kısmı değişmeden korunuyor):
```tsx
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <span
      ref={containerRef}
      className={cn('relative inline-flex align-middle', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? contentId : undefined}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className={cn(
          'inline-flex h-4 w-4 items-center justify-center rounded-full',
          'text-muted-foreground hover:text-foreground transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background',
        )}
      >
        <Info className="h-3.5 w-3.5" aria-hidden />
      </button>

      {open && (
        <span
          id={contentId}
          role="tooltip"
          className={cn(
            'absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2',
            'rounded-lg border border-border bg-card p-3 text-left shadow-xl',
            'text-xs leading-relaxed text-muted-foreground',
          )}
        >
          {detail}
          {sources && sources.length > 0 && (
            <span className="mt-2 block border-t border-border pt-2">
              <span className="block font-semibold text-muted-foreground">Kaynak</span>
              {sources.map((s) =>
                s.url ? (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-primary hover:text-primary/80 hover:underline"
                  >
                    {s.label}
                  </a>
                ) : (
                  <span key={s.label} className="mt-1 block text-muted-foreground">
                    {s.label}
                  </span>
                ),
              )}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
```

Eski gri sınıflı satırlar (dosya:satır, aynen — tümü `text-slate-400` oldu; `AdminCockpit.tsx:132` hover'ı `hover:text-slate-400` → `hover:text-slate-300`):
```
frontend/src/app/_sections/AdminCockpit.tsx:35:      <div className="flex justify-between text-[10px] text-slate-600">
frontend/src/app/_sections/AdminCockpit.tsx:40:      <p className="text-[10px] text-slate-500 leading-relaxed">
frontend/src/app/_sections/AdminCockpit.tsx:81:      <p className="text-[10px] text-slate-500 leading-relaxed">
frontend/src/app/_sections/AdminCockpit.tsx:103:        <span className="text-[10px] text-slate-500">{pairs.length} kayıt</span>
frontend/src/app/_sections/AdminCockpit.tsx:114:              <span className="text-xs text-slate-600 mx-1">↔</span>
frontend/src/app/_sections/AdminCockpit.tsx:116:              <span className="text-[10px] text-slate-500 ml-2">· {reason}</span>
frontend/src/app/_sections/AdminCockpit.tsx:121:              className="text-slate-600 hover:text-red-400 transition-colors shrink-0"
frontend/src/app/_sections/AdminCockpit.tsx:132:        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-700 py-2 text-xs text-slate-500 hover:border-slate-500 hover:text-slate-400 transition-colors"
frontend/src/app/_sections/AdminCockpit.tsx:200:        <p className="mt-6 text-center text-xs text-slate-600">
frontend/src/app/_sections/AdminCockpit.tsx:202:          <strong className="text-slate-500"> KVKK uyumlu</strong>
frontend/src/app/_sections/EngineSection.tsx:108:              <p className="text-xs text-slate-500 mt-1 leading-snug">{desc}</p>
frontend/src/app/_sections/AlgorithmBento.tsx:47:        <p className="text-xs text-slate-500 leading-relaxed">
frontend/src/app/_sections/AlgorithmBento.tsx:88:        <p className="mt-2 text-[10px] text-slate-500">
frontend/src/app/_sections/AlgorithmBento.tsx:145:          <p className="text-[10px] text-slate-500">{profile.role}</p>
frontend/src/app/_sections/AlgorithmBento.tsx:159:            <span className="w-6 text-right text-[10px] text-slate-500">{pct}%</span>
frontend/src/app/_sections/AlgorithmBento.tsx:176:        <p className="text-xs text-slate-500 leading-relaxed">
frontend/src/app/_sections/AlgorithmBento.tsx:217:                <div className="text-[9px] text-slate-500">Baskın Lider</div>
frontend/src/app/_sections/GameSection.tsx:30:          <span className="text-slate-500">Soru <strong className="text-white">3</strong> / 8</span>
frontend/src/app/_sections/GameSection.tsx:69:        <p className="text-xs text-slate-500 mb-3 text-center">Test bittiğinde kazanacağın arketip:</p>
frontend/src/app/_sections/GameSection.tsx:86:        <p className="mt-2 text-center text-[10px] text-slate-500">
frontend/src/app/_sections/GameSection.tsx:153:                  <p className="text-xs text-slate-500 font-medium">{day}</p>
frontend/src/app/_sections/GameSection.tsx:165:                  <span className="text-[10px] text-slate-500 ml-1">Asla geriye düşmez (Monotonic)</span>
frontend/src/app/_sections/GameSection.tsx:202:                <p className="text-xs text-slate-500">İlk 90 Saniye · 8 Senaryo · Anında Ödül</p>
frontend/src/app/_sections/GameSection.tsx:216:                <p className="text-xs text-slate-500">Monotonic İlerleme · Streak & Rozetler</p>
frontend/src/app/page.tsx:60:            <p className="text-xs text-slate-600 text-center">
```

## AJ-86c · Landing tema: sabit koyu → yumuşak lacivert + açık tema (çatı `otonom/AJ-86c-tema-20260928`)

Silme YOK — yalnız renk sınıfları değişti (landing metni aynı; metin-karşılaştırma betiğiyle 0 fark). Taban commit: `c815379` (çatı main). Geri alma: `git revert <AJ-86c commit>` ya da aşağıdaki eski satırları aynen geri koy (globals.css/tailwind.config.ts'e yalnız ekleme yapıldı; eklenen `--landing-*` token'ları ve `landing` renk grubu silinir).

- **Neden yazılmıştı:** eski karar "Landing HER ZAMAN DARK" (`docs/kararlar/konu/06-tasarim-ux.md` § TEMA) → bölümler sabit `bg-slate-950` / `text-white` / `text-slate-*` / `*-400` vurgularla yazıldı; 2026-08-02'de landing tema seçimi "canlı-sonrası"na ertelendi (~256 sabit nokta).
- **Neden değişti:** G7-10/11/13 (aynı belge): landing tema düğmesine uymalı, koyu hâli siyah değil yumuşak lacivert. PO'nun 2026-09-28 görevi T5'i (AJ-86) sıraya koydu. Sabit renkler → `landing-*` semantik token'ları (`globals.css` :root/.dark) + renkli vurgular `text-X-700|800 dark:text-X-<eski ton>` eşli çiftleri; koyu vurgu indigo-400 → indigo-300 (lacivert zeminde %20 indigo tint üstünde 4.23 → AA).

Eski satırlar (`git diff -U0 c815379` '-' satırları, aynen):
```
== frontend/src/app/_sections/AdminCockpit.tsx
-        <span className="text-xs font-medium text-slate-300">Haftalık Görüşme Limiti</span>
-        <span className="text-sm font-extrabold text-indigo-400">{value} görüşme / hafta</span>
-        className="w-full h-2 rounded-full bg-slate-700 appearance-none cursor-pointer
-      <div className="flex justify-between text-[10px] text-slate-400">
-          <span key={n} className={n === value ? 'text-indigo-400 font-bold' : ''}>{n}</span>
-      <p className="text-[10px] text-slate-400 leading-relaxed">
-        Bir menti haftada en fazla <strong className="text-slate-300">{value}</strong> görüşme
-      <span className="text-xs font-medium text-slate-300">Minimum Eşleşme Barajı</span>
-                ? 'border-violet-500/50 bg-violet-500/15 text-violet-300'
-                : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600',
-      <p className="text-[10px] text-slate-400 leading-relaxed">
-        <span className="text-xs font-medium text-slate-300">Kara Liste / Engelli Çiftler</span>
-        <span className="text-[10px] text-slate-400">{pairs.length} kayıt</span>
-            <ShieldAlert className="h-3.5 w-3.5 text-red-400 shrink-0" aria-hidden />
-              <span className="text-xs text-slate-300 font-medium">{a}</span>
-              <span className="text-xs text-slate-400 mx-1">↔</span>
-              <span className="text-xs text-slate-300 font-medium">{b}</span>
-              <span className="text-[10px] text-slate-400 ml-2">· {reason}</span>
-              className="text-slate-400 hover:text-red-400 transition-colors shrink-0"
-        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-700 py-2 text-xs text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-colors"
-    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-slate-950">
-          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
-          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white text-balance">
-          <p className="mt-3 text-slate-400 max-w-lg mx-auto text-sm">
-          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-5 backdrop-blur">
-                <Settings2 className="h-4 w-4 text-indigo-400" aria-hidden />
-              <span className="text-sm font-bold text-white">Görüşme Yönetimi</span>
-          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-5 backdrop-blur">
-                <BarChart3 className="h-4 w-4 text-violet-400" aria-hidden />
-              <span className="text-sm font-bold text-white">Kalite Barajı</span>
-          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-5 backdrop-blur">
-                <ShieldAlert className="h-4 w-4 text-red-400" aria-hidden />
-              <span className="text-sm font-bold text-white">İdari Override</span>
-        <p className="mt-6 text-center text-xs text-slate-400">
-          <strong className="text-slate-400"> KVKK uyumlu</strong>
== frontend/src/app/_sections/AlgorithmBento.tsx
-          <span className="text-3xl font-black text-indigo-400">%60</span>
-          <span className="text-sm font-semibold text-slate-300">Teknik Uyum</span>
-        <p className="text-xs text-slate-400 leading-relaxed">
-                  ? 'bg-indigo-500/20 border-indigo-500/60 text-indigo-300 scale-105 shadow-sm shadow-indigo-500/20'
-                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300',
-      <div className="mt-auto rounded-xl bg-slate-800/60 border border-slate-700/50 p-4">
-          <span className="text-xs text-slate-400 font-medium">Teknik Eşleşme Skoru</span>
-          <span className="text-lg font-extrabold text-indigo-400">%{matchScore}</span>
-        <div className="h-2 w-full rounded-full bg-slate-700 overflow-hidden">
-        <p className="mt-2 text-[10px] text-slate-400">
-    <div className="rounded-xl bg-slate-800/70 border border-slate-700/50 p-3 space-y-3 flex-1">
-          <p className="text-xs font-semibold text-white">{profile.name}</p>
-          <p className="text-[10px] text-slate-400">{profile.role}</p>
-            <span className="w-3 text-[10px] font-bold text-slate-400">{dim}</span>
-            <div className="flex-1 h-1.5 rounded-full bg-slate-700 overflow-hidden">
-            <span className="w-6 text-right text-[10px] text-slate-400">{pct}%</span>
-          <span className="text-3xl font-black text-violet-400">%40</span>
-          <span className="text-sm font-semibold text-slate-300">Psikometrik Derinlik</span>
-        <p className="text-xs text-slate-400 leading-relaxed">
-      <div className="rounded-xl bg-slate-800/60 border border-green-500/20 p-4">
-            <span className="text-xl font-black text-green-400">%88</span>
-            <CheckCircle2 className="h-5 w-5 text-green-400" aria-hidden />
-            <span className="text-[9px] text-green-500 font-medium text-center leading-tight">
-          <CheckCircle2 className="h-3.5 w-3.5 text-green-400 shrink-0" aria-hidden />
-          <span className="text-[10px] text-green-400 font-medium">
-      <div className="rounded-xl bg-slate-800/60 border border-red-500/20 p-4">
-            <div key={initials} className="flex-1 rounded-lg bg-slate-800 border border-slate-700 p-2.5 flex items-center gap-2 opacity-70">
-                <div className="text-[10px] font-semibold text-slate-300">D Profili</div>
-                <div className="text-[9px] text-slate-400">Baskın Lider</div>
-            <ShieldX className="h-7 w-7 text-red-400" aria-hidden />
-            <span className="text-[9px] text-red-400 font-bold text-center leading-tight">
-          <ShieldX className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" aria-hidden />
-          <span className="text-[10px] text-red-400 font-medium leading-relaxed">
-    <section id="algorithm" className="bg-slate-950 py-20 sm:py-28 px-4 sm:px-6">
-          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
-          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white text-balance">
-          <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
-          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 backdrop-blur">
-          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 backdrop-blur">
-        <div className="mt-6 flex items-center justify-center gap-0 rounded-xl border border-slate-700/50 bg-slate-900/60 p-4 overflow-hidden">
-            <span className="text-sm font-bold text-indigo-400 shrink-0">%60 Teknik</span>
-          <div className="h-8 w-px bg-slate-700 shrink-0" />
-            <span className="text-sm font-bold text-violet-400 shrink-0">%40 Psikometrik</span>
== frontend/src/app/_sections/EngineSection.tsx
-  { dim: 'D', label: 'Öncü',      color: 'text-orange-400',  bg: 'bg-orange-500/10',  border: 'border-orange-500/20', desc: 'Kararlı, hızlı, sonuç odaklı' },
-  { dim: 'I', label: 'Ateşleyici', color: 'text-yellow-400', bg: 'bg-yellow-500/10',  border: 'border-yellow-500/20', desc: 'İlham veren, sosyal, enerjik' },
-  { dim: 'S', label: 'Yapı Taşı', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', desc: 'Güvenilir, sabırlı, uyumlu' },
-  { dim: 'C', label: 'Kâşif',     color: 'text-sky-400',     bg: 'bg-sky-500/10',     border: 'border-sky-500/20',    desc: 'Analitik, titiz, derinlikli' },
-    <section id="algorithm" className="bg-slate-950 py-24 px-4 border-t border-white/5">
-          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
-          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
-          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
-                <Briefcase className="h-5 w-5 text-indigo-400" aria-hidden />
-                <p className="text-2xl font-extrabold text-white">%60</p>
-                <p className="text-sm font-semibold text-indigo-400">Sektör Uyumu</p>
-            <p className="text-sm text-slate-400 leading-relaxed">
-                <Brain className="h-5 w-5 text-violet-400" aria-hidden />
-                <p className="text-2xl font-extrabold text-white">%40</p>
-                <p className="text-sm font-semibold text-violet-400">
-            <p className="text-sm text-slate-400 leading-relaxed">
-              <p className="text-sm font-bold text-white">{label}</p>
-              <p className="text-xs text-slate-400 mt-1 leading-snug">{desc}</p>
-        <div className="rounded-xl border border-rose-500/20 bg-rose-950/15 p-4 mb-10 text-sm text-slate-400 leading-relaxed text-center">
-          <span className="font-semibold text-rose-400">Toksik eşleşme koruması:</span>{' '}
== frontend/src/app/_sections/GameSection.tsx
-    { letter: 'A', text: 'Liderliği üstlenir, hızlıca hedef koyarım',    color: 'border-violet-500/40 bg-violet-500/10 text-violet-300' },
-    { letter: 'B', text: 'Ekibi motive eder, enerji katarım',              color: 'border-blue-500/40   bg-blue-500/10   text-blue-300'   },
-    { letter: 'C', text: 'Grubun ihtiyaçlarını destekler, uyum sağlarım', color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
-    { letter: 'D', text: 'Planı analiz eder, en doğru kararı veririm',    color: 'border-amber-500/40  bg-amber-500/10  text-amber-300'  },
-          <span className="font-medium text-slate-300">Mizaç Testi</span>
-          <span className="text-slate-400">Soru <strong className="text-white">3</strong> / 8</span>
-        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
-      <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
-        <p className="text-sm font-semibold text-white leading-relaxed">{SAMPLE_QUESTION.text}</p>
-                : 'border-slate-700/50 bg-slate-800/40',
-              i === 1 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400',
-            <span className={cn('text-xs leading-relaxed', i === 1 ? 'text-blue-200' : 'text-slate-400')}>
-        <p className="text-xs text-slate-400 mb-3 text-center">Test bittiğinde kazanacağın arketip:</p>
-        <p className="mt-2 text-center text-[10px] text-slate-400">
-          Bu kullanıcı → <strong className="text-blue-400">🔥 Ateşleyici</strong> kazanıyor
-      <div className="absolute left-4 top-3 bottom-3 w-0.5 bg-gradient-to-b from-indigo-500 via-violet-500 to-slate-700" aria-hidden />
-              done ? color : 'bg-slate-700 border-2 border-slate-600',
-                ? 'border-slate-700 bg-slate-800/60'
-                : 'border-dashed border-slate-700/40 bg-slate-800/20 opacity-60',
-                  <p className="text-xs text-slate-400 font-medium">{day}</p>
-                  <p className="text-sm font-semibold text-white mt-0.5">{label}</p>
-                <span className="shrink-0 rounded-full bg-slate-700/80 px-2.5 py-1 text-xs font-medium text-slate-300">
-                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" aria-hidden />
-                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" aria-hidden />
-                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" aria-hidden />
-                  <span className="text-[10px] text-slate-400 ml-1">Asla geriye düşmez (Monotonic)</span>
-    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-slate-950 to-slate-900">
-          <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
-          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white text-balance">
-          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 backdrop-blur">
-                <Flame className="h-5 w-5 text-indigo-400" aria-hidden />
-                <h3 className="text-sm font-bold text-white">CORE Sorular</h3>
-                <p className="text-xs text-slate-400">İlk 90 Saniye · 8 Senaryo · Anında Ödül</p>
-          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 backdrop-blur">
-                <Trophy className="h-5 w-5 text-amber-400" aria-hidden />
-                <h3 className="text-sm font-bold text-white">Sürekli Gelişim</h3>
-                <p className="text-xs text-slate-400">Monotonic İlerleme · Streak & Rozetler</p>
-            <div className="mt-5 flex items-center gap-2 rounded-lg bg-slate-800/60 px-3 py-2.5">
-              <ChevronRight className="h-4 w-4 text-indigo-400 shrink-0" aria-hidden />
-              <p className="text-xs text-slate-400 leading-snug">
-                <strong className="text-white"> düşüremez</strong> — sadece gelişim vardır.
== frontend/src/app/_sections/HeroSection.tsx
-    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950 pt-16">
-        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300">
-        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
-        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed text-balance">
-          <strong className="text-slate-200 font-semibold">DISC davranış modeline dayalı</strong>{' '}
-          <strong className="text-slate-200 font-semibold">sonsuza kadar ücretsiz.</strong>
-            className="h-12 px-8 text-base border-white/20 text-slate-300 bg-transparent hover:bg-white/5 hover:text-white hover:border-white/30"
-        <div className="h-8 w-5 rounded-full border-2 border-slate-600 flex items-start justify-center p-1">
-          <div className="h-1.5 w-1 rounded-full bg-slate-400" />
== frontend/src/app/_sections/Navbar.tsx
-    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
-            <span className="text-base font-bold text-white hidden sm:block">
-              Menti<span className="text-indigo-400">Mentor</span>
-                className="rounded-md px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:bg-white/8 transition-colors"
-            className="md:hidden rounded-md p-2 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
-                className="rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/8 transition-colors"
== frontend/src/app/_sections/PainSection.tsx
-    <section className="bg-slate-950 py-24 px-4 border-t border-white/5">
-          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
-          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
-            <span className="text-rose-400">yanlış eşleşme</span>
-          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
-          <div className="rounded-2xl border border-rose-500/20 bg-rose-950/20 p-6">
-            <p className="text-sm font-bold text-rose-400 mb-5 flex items-center gap-2">
-                <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
-                  <X className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" aria-hidden />
-          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/15 p-6">
-            <p className="text-sm font-bold text-emerald-400 mb-5 flex items-center gap-2">
-                <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
-                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden />
== frontend/src/app/page.tsx
-        <footer className="bg-slate-950 border-t border-slate-800 py-10 px-4">
-              <span className="text-sm font-bold text-white">
-                Menti<span className="text-indigo-400">Mentor</span>
-            <p className="text-xs text-slate-400 text-center">
-            <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-400" aria-label="Yasal bağlantılar">
-              <Link href="/gizlilik" className="hover:text-white underline-offset-4 hover:underline">Gizlilik Politikası</Link>
-              <Link href="/kvkk" className="hover:text-white underline-offset-4 hover:underline">KVKK</Link>
-              <Link href="/terms" className="hover:text-white underline-offset-4 hover:underline">Kullanım Koşulları</Link>
```
