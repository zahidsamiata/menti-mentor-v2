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
