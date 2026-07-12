# PROJECT_STATUS.md

> Projeye aylar sonra dönen biri veya yeni bir geliştirici için:
> bu dosyayı okuyarak 10 dakikada tam resmi görebilirsin.

---

## 1. Proje Nedir

**MentiMentor** — çok-kiracılı (multi-tenant) bir mentörlük SaaS platformu. Hedef kitle: üniversite kulüpleri, mezun dernekleri ve sosyal girişimler. Her "tenant" kendi mentor-menti havuzunu yönetir; kullanıcılar DISC kişilik testi + sektör uyumuna göre algoritmik olarak eşleştirilir. Mentör adayları opt-in onay mekanizmasıyla seçilir; platformun gelir modeli yoktur — sosyal girişim odaklı, ücretsiz kalacak.

---

## 2. Mimari

### Repo Yapısı

```
C:\Users\...\Geliştirme\                  ← git kökü (menti-mentor-v2.git)
├── backend/                              ← SUBMODULE → menti-mentor.git
│   ├── src/                              ← Express 5 + TypeScript backend
│   ├── prisma/                           ← Schema + migration'lar
│   └── tests/                            ← vitest (72 test)
├── frontend/                             ← Next.js 14 frontend (normal klasör)
│   └── src/app/                          ← Route'lar ve bileşenler
├── .github/workflows/ci.yml              ← Çatı repo CI (backend+frontend+integration)
└── PROJECT_STATUS.md                     ← Bu dosya
```

**GitHub URL'leri:**
- Backend (submodule): `https://github.com/zahidsamiata/menti-mentor`
- Çatı repo (frontend + submodule): `https://github.com/zahidsamiata/menti-mentor-v2`

### ⚠️ KRİTİK KURAL — Submodule Pointer

> Her backend (`menti-mentor`) merge işleminden **sonra** çatı repoda
> submodule pointer güncellenmesi **zorunludur**.
>
> ```bash
> cd "Geliştirme/"
> cd backend && git checkout main && git pull
> cd ..
> git add backend
> git commit -m "chore: backend submodule <hash>'e güncellendi"
> git push
> ```
>
> Güncellenmezse çatı repo CI eski backend commit'ini test eder.
> Bu projede bir kez 13 commit gecikmesi yaşandı.

### Stack

| Katman | Teknoloji | Versiyon |
|--------|-----------|----------|
| Backend | TypeScript + Express | 5.1.0 |
| ORM | Prisma | 6.16.x |
| Veritabanı | PostgreSQL / Neon Serverless | 16 |
| Frontend | Next.js + React | 14.2.35 / 18 |
| Test | vitest + supertest | 4.1.x |
| CI DB | postgres:16 service container | — |

### CI Yapısı

**Backend CI** (menti-mentor.git — `.github/workflows/ci.yml`):
- `npm ci` → `prisma generate` → `tsc --noEmit` → `vitest run`
- DB: postgres:16 service container (Neon'a bağlanmaz, flaky değil)
- Tetikleyici: PR ve `main` push

**Çatı repo CI** (menti-mentor-v2.git — `.github/workflows/ci.yml`):
- `backend-check`: submodule checkout → tsc (src + tests) + ESLint
- `frontend-check`: tsc + `next build`
- `integration-tests` (backend-check sonrası): postgres:16 + `prisma migrate deploy` + vitest
- ESLint artık hard gate: lint hatası `backend-check`'i ve dolayısıyla `integration-tests`'i bloklar.

---

## 3. Tamamlananlar

### Güvenlik
- **P0 deadlock**: matching'de level-3 fallback sonsuz döngüsü giderildi
- **P1 statik skor**: sektör skoru her zaman 0 dönüyordu, düzeltildi
- **PII sızıntısı**: `listUsers` PENDING kullanıcıya mentor isim/e-posta döndürüyordu, engellendi
- `Meeting.status` TypeScript tipinde eksik `APPROVED` değeri eklendi

### Faz 1 — Landing + Auth Gate + STK Onboarding Backend
Auth endpoint'leri (register, login, refresh, logout), slug kontrolü, selfServeRegister, davet linki sistemi, login response'a `discType` + `needsOrientation` eklendi.

### Faz 2 — Kullanıcı Onboarding
`completeProfile` endpoint'i (sektör, beceri, beklenti, etkileşim stili), PII-güvenli mentor sayısı (`/users/mentor-count`), frontend onboarding flow + rol-farkındalıklı redirect + bekleme odası.

### Faz 2.5 — DISC Güvenilirlik Göstergesi
Backend DISC vektörü `confidence` skoru; frontend'de `DiscConfidenceWidget` ile görsel ilerleme çubuğu.

### Faz 3 — STK Büyüme
Landing sayfası (OG/Twitter meta, robots.txt, KVKK uyumlu — çerez yok), taslak tenant kurtarma e-postası (72s reminder cron), 96s cleanup cron, unsubscribe token + endpoint.

### KVKK Uyum Paketi
- `Tenant.kvkkConsentAt`: selfServeRegister'da STK admin onayı kaydediliyor
- `User.kvkkConsentAt`: auth/register'da menti/mentor onayı kaydediliyor
- Backend Zod: `kvkkConsent: z.literal(true)` — API doğrudan çağrılsa da consent zorunlu
- Unsubscribe URL hatası düzeltildi (`FRONTEND_URL` → `BACKEND_URL` env var)
- `/kvkk`, `/terms`, `/gizlilik` statik sayfaları oluşturuldu (taslak)
- Frontend consent checkbox'ları `<span>` → `<a>` gerçek link dönüşümü

### Test Altyapısı
- Neon soğuk başlatma P1002: globalSetup'ta `waitForDatabase()` (5×3s) + `migrateWithRetry()` (3×4s)
- 5/5 ardışık koşu yeşil

### Migration Geçmişi
- `20260707140000_add_draft_tenant_email_fields` (Faz 3 Tenant alanları)
- `20260707150000_add_kvkk_consent_at` (Tenant consent)
- `20260707160000_add_user_kvkk_consent_at` (User consent)
- `20260712000000_add_tenant_verification` (kurum doğrulama: TenantVerificationStatus enum + 4 alan)

### Temizlik
- `web/` (82 dosya, eski Bento Grid frontend) silindi — bkz. Bölüm 4
- `matchReason.ts` (hiç import edilmemiş OpenAI servisi) silindi
- `RegisterForm.tsx` (ölü bileşen) + `validation.ts` `registerSchema` silindi
- 5 adet `prisma as unknown as {...}` cast'ı kaldırıldı (`questionHide`, `meetingCheckIn`)

---

## 4. Bilinen Özellikler & Dikkat Noktaları

### Neon Soğuk Başlatma

Neon serverless DB, uzun süre kullanılmadığında `P1002` (Can't reach database server) fırlatır.

**Testlerde çözüm**: `tests/globalSetup.ts`'de çift katmanlı koruma:
1. `waitForDatabase()` — `migrate deploy`'dan önce SELECT 1 (5 deneme × 3s)
2. `migrateWithRetry()` — deploy 3 deneme × 4s

CI'da Neon yerine postgres:16 service container kullanılır (sorunsuz).

### ⚠️ `migrate dev` ÇALIŞMAZ — Migration Prosedürü

Neon shadow-DB kısıtı nedeniyle `prisma migrate dev` kullanılamaz.
**Her schema değişikliğinde şu adımları uygula:**

```bash
# 1. schema.prisma'ya yeni alanı ekle

# 2. Migration klasörü ve SQL dosyasını oluştur
mkdir prisma/migrations/YYYYMMDDHHMMSS_aciklama
# SQL (IF NOT EXISTS guard zorunlu):
# ALTER TABLE "Model" ADD COLUMN IF NOT EXISTS "alan" TIMESTAMP(3);

# 3. Sütunu gerçekten oluştur (canlı DB)
echo 'ALTER TABLE "..." ADD COLUMN IF NOT EXISTS "..." TIMESTAMP(3);' \
  | npx prisma db execute --schema prisma/schema.prisma --stdin

# 4. Migration'ı uygulanmış olarak işaretle (_prisma_migrations tablosuna ekler)
npx prisma migrate resolve --applied YYYYMMDDHHMMSS_aciklama

# 5. Doğrula
npx prisma migrate status   # "Database schema is up to date!" görmeli

# 6. Prisma client'ı yeniden üret (CI'da otomatik yapılır)
npx prisma generate
```

**Windows/OneDrive notu**: `prisma generate` bazen `EPERM: DLL kilidi` hatası verir.
`.d.ts` tipler güncellendiyse (grep ile kontrol et) yeterli; binary'yi CI güncelleyecek.

### web/ Geri Alma

`web/` dizini silindi ancak git history'de korunuyor.
Taşınmamış içerik: `analytics/friction/`, `analytics/ideal/`, `platform/` sayfaları.

```bash
# Belirli bir dosyayı geri almak için:
git -C backend show de6be04 -- web/<dosya_yolu>

# Tüm dizini geri almak için:
git -C backend checkout de6be04 -- web/
```

---

## 5. Bilinçli Bırakılanlar

| # | Madde | Neden bırakıldı |
|---|-------|-----------------|
| 1 | 110× `as unknown as RequestHandler` route dosyalarında | `RequestWithTenant` → `RequestHandler` yapısal uyumsuzluğu; zararsız, 110 yerdeki refactor riskten fazla değer üretmez |
| 2 | TR/EN karışık error kodları (`TENANT_BULUNAMADI` vs `NOT_FOUND`) | Frontend bu kodları string olarak işliyor, davranışı kırmaz; standartlaştırma kozmetik |
| 3 | `tests/cron-probe.ts` ve `tests/k1-probe.ts` yeniden sayıldı | Manuel doğrulama araçları; `scripts/` taşınması kozmetik |
| 4 | `tests/cron-probe.ts` ve `tests/k1-probe.ts` `tests/` içinde | Manuel doğrulama araçları; `.test.ts` uzantısı olmadığından vitest çalıştırmaz |
| 5 | Root repo (`menti-mentor-v2`) README.md yok | İşlevsel değil, içerik bu dosyada |
| 6 | `-v2` GitHub ismi yanıltıcı | Repo rename PR gerektirir, takım kararı |

---

## 6. Production'a Çıkmadan Önce

### Zorunlu Env Değişkenleri

`.env.example` dosyasına bakınız (`backend/.env.example`).

| Değişken | Açıklama | Kritiklik |
|----------|----------|-----------|
| `DATABASE_URL` | Neon bağlantı string'i | **Zorunlu** |
| `JWT_SECRET` | En az 32 karakter, tahmin edilemez | **Zorunlu** |
| `PLATFORM_ADMIN_KEY` | Super-admin API anahtarı | **Zorunlu** |
| `BACKEND_URL` | Express sunucusunun public URL'i | **Zorunlu** — ayrı-domain deploy'da unsubscribe e-posta linki buna bağlı. Atlanırsa kullanıcılar abonelikten çıkamaz |
| `FRONTEND_URL` | Next.js uygulamasının public URL'i | **Zorunlu** |
| `SMTP_USER` + `SMTP_PASS` | Gmail uygulama şifresi | Zorunlu (e-postalar için) |
| `SMTP_FROM` | Gönderen adresi | Opsiyonel (SMTP_USER fallback) |
| `OPENAI_API_KEY` | Eşleşme gerekçesi için (şu an devre dışı) | Opsiyonel |

### Yasal Metinler

`/kvkk`, `/terms`, `/gizlilik` sayfaları **taslak** niteliğindedir — üretim öncesi bir hukukçu tarafından gözden geçirilip tamamlanması gerekir.

### KVKK Eski Kayıt Politikası

Migration öncesi oluşturulan `Tenant` ve `User` kayıtlarında `kvkkConsentAt` alanı `NULL`'dur (veri kaybı yoktur, sadece onay zaman damgası yok). Uyum gereksinimine göre bu kayıtlar için bir politika belirlenmesi gerekebilir (örneğin yeniden onay e-postası veya pasifleştirme).

---

*Son güncelleme: 2026-07-08*
