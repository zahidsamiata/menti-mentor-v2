> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-19 (📸 fotoğraf tarihi) · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)
> ⚠️ Bu belge kalemlerin TANIMINI tutar, DURUMUNU TUTMAZ. Buradaki işaretler 2026-09-19 durumudur. Güncel durum: `docs/otonom/00-KUYRUK.md` (köprü: `docs/kararlar/00-KART-INDEKSI.md`)

# OPERASYONEL HAZIRLIK DENETİMİ — izleme · yedek · koruma · ortam

**📸 DONDURULMUŞ keşif raporu** — bu turun kod fotoğrafı, güncellenmez. Güncel durum: `docs/kararlar/09-DURUM.md`.
**Tur:** W · **Dal:** `otonom/W-operasyonel-hazirlik-20260919` · **Denetim tarihi:** 2026-09-20
**Mod:** 🟩 PLANLA — salt-okuma. Hiçbir kod dosyası değişmedi, DB/migration/seed yapılmadı, `docs/otonom/` · `docs/kararlar/` · `docs/devir/` · `CLAUDE.md` · `.env.example` **ellenmedi**. Bu turda repoya eklenen tek dosya bu rapordur.
**Yöntem:** 4 paralel salt-okuma alt-ajanı (A izleme · B yedek · C koruma · D ortam) + orkestratörün birleştirmesi. Her iddia `dosya:satır` kanıtlı.

> ⚠️ Bu rapor **AKSİYON KAYNAĞI DEĞİLDİR** (KURAL 8). Kuyruğa iş eklenmedi, karar kartı açılmadı — tur kapsamı gereği. Aksiyonlar ayrı bir turda `00-KARAR-TAKIP`'e girer ve numarasını **yalnız orada** alır.

> **Neden bu tur:** bugüne kadarki denetimler ÜRÜN tarafına baktı (özellik var mı, ekran çalışıyor mu). OPERASYONEL taraf — bir şey bozulunca haberimiz olacak mı, veri kaybolursa geri gelir mi, kötü niyetli bir istek ne yapabilir — hiç denetlenmemişti.

---

## 0. BİR BAKIŞTA — dört şüphenin sonucu

| # | Şüphe (tur öncesi) | SONUÇ | Tek cümlelik kanıt |
|---|---|---|---|
| (a) | Hata izleme servisi yok gibi | **DOĞRULANDI** (ama eksik çerçevelenmişti) | 19 terim × 2 repo, harf-duyarsız → gerçek isabet 0; kurulu tek izleme `logger.ts` + `SystemLog`. **Asıl sorun servis yokluğu değil, mevcut kaydın teşhise yetmemesi** (§1.A) |
| (b) | Düzenli yedek yordamı yok gibi | **DOĞRULANDI** | 17 terim × 2 repo → `pg_dump` 0, CI `schedule:` 0, npm script 0. Buna karşılık **2 otomatik SİLME cron'u var** (§1.B) |
| (c) | Rate limit kapsamı dar gibi (23 dosyadan 6'sında referans) | **ÇÜRÜTÜLDÜ → daha kötü bir bulguyla yer değiştirdi** | Limit dar değil, **global**: `server.ts:81` 189 ucu kapsıyor. AMA kova anahtarı doğrulanmamış `X-Tenant-Id` başlığı → **atlatılabilir** (§1.C) |
| (d) | 13 ortam değişkeni belgelenmemiş | **11 DOĞRULANDI · 1 kısmen çürüdü · 1 çürüdü** | `PLATFORM_ADMIN_EMAIL` `.env.example:8`'de VAR; `SMTP_SECURE` yorum satırında belgeli. Gerçek sayı **18 belgesiz** (şüphe listesinden 5 fazla) (§1.D) |

**Bu turun en değerli iki bulgusu, şüphe listesinde HİÇ yoktu:**
- 🔴 **Avatar dosyaları için kalıcı disk yok** — A ve B bölümleri birbirinden bağımsız olarak aynı sonuca vardı. `docker-compose.yml`'de backend servisinin `volumes:` anahtarı hiç yok; her redeploy'da kullanıcı fotoğrafları silinir, `User.avatarUrl` DB'de dolu kaldığı için **sessizce kırık URL'lere** dönüşür. DB restore ile düzeltilemez.
- 🔴 **`SMTP_HOST` boşsa tüm e-postalar sessizce atılır** — `emailService.ts:38-41` `return` eder, çağıran katman her durumda başarı görür. Şifre sıfırlama dahil.

---

## 1. KAPSAM BEYANLARI

Her bölüm kendi kapsamını ayrıca ilan eder; burası özettir. **Negatif iddia ("yok") yalnız kapsam beyanıyla yazılmıştır (KURAL 13).**

| Bölüm | Taranan | Terim sayısı | Harf duyarsız | Sonuç |
|---|---|---|---|---|
| A — izleme | backend `src/` `prisma/` `scripts/` `tests/` `package.json` + `frontend/src` + `docs/` + `docker-compose.yml` + lockfile'lar | **19** (sentry·bugsnag·rollbar·datadog·dd-trace·newrelic·new-relic·opentelemetry·otel·honeybadger·airbrake·logrocket·elastic-apm·pino·winston·posthog·grafana·prometheus·statsd) | ✅ `grep -rniE` | 2 eşleşme, **ikisi de yanlış-pozitif** |
| B — yedek | 2 repo: `src/` `scripts/` `prisma/` (44 migration) `tests/` `.github/workflows/` `package.json` `Dockerfile` `docker-compose.yml` `docs/` (tümü) | **17** iki dilli (backup·back-up·pg_dump·pgdump·dump·restore·pg_restore·snapshot·**yedek**·**yedekleme**·**geri yükle/geri-yukle**·**geri al**·**kurtarma**·recovery·archive·**arşiv/arsiv**·_bak) + 9 temizlik + 8 disk terimi | ✅ `grep -rniE`, Türkçe varyant regex'li (`ar[şs]iv`, `geri[ _-]?y[üu]kle`) | backend 26 satır (21'i ilgisiz "taslak kurum kurtarma e-postası", 4'ü `vi.restoreAllMocks`) → **gerçek isabet 5** |
| C — koruma | backend `server.ts` + `routes/*.ts` ×23 + `middleware/*.ts` ×8 + `controllers/*.ts` ×34; frontend `src/` **195 dosya** | **32** iki dilli (k-anon·kAnon·anonim·anonymize·threshold·**eşik**·minCount·**asgari**·mask·**maskele**·redact·blur·**bulanık**·censor·**gizle/gizli**·hide·canSee·**görebilir**·visibility·**görünürlük**·suppress·sayısal eşik karşılaştırmaları·isAdmin·role===·aggregate·optIn·mentorVisibilityEnabled …) | ✅ tümü `-i` | **190 uç** sayıldı; klasik "frontend guard yeterli sanıldı" bulgusu **0 adet** |
| D — ortam | backend `src/` `scripts/` `tests/` `prisma/` `vitest.config.ts`; frontend `src/` `next.config.mjs` `playwright.config.ts`; `Dockerfile` ×2, `docker-compose.yml`, `.env.compose`, `.env.example`, `.env.test.example`, CI ×2 (hepsi TAM okundu) | `process.env` **115 backend + 11 frontend** eşleşme + `env()` prisma | ✅ | **54 benzersiz değişken** |

**SAYILAN BİRİM TANIMLARI (KURAL 16 adayı):**
- **"uç"** = kodda tanımlanmış tek bir `router.<metod>(path, …)` / `app.<metod>(path, …)` çağrısı. Aynı path'in farklı metodu ayrı uç; parametrik path (`/:id`) tek uç. → **190** (`grep -cE "^router\.(get|post|patch|put|delete)\("` toplamı 188, 23 dosya + `server.ts` 2 satır-içi uç).
- **"limitçi"** = `export function` olarak tanımlanmış ve `res.status(429)` döndüren middleware. → **13** (`resetRateLimiters` limitçi değildir).
- **"ortam değişkeni"** = kodda `process.env.X` / `env("X")` olarak okunan benzersiz ad. → **54** = backend 48 + frontend 8 − 2 çakışma (`DATABASE_URL`, `NODE_ENV`). `npm_package_version` sayılmadı (npm'in kendi değişkeni, operatör ayarı değil).
- **"model"** = `schema.prisma`'da `^model ` → **39** (⚠️ `backend/CLAUDE.md` "38" der = bayat).

**Ortak not — depo durumu:** `/home/user/menti-mentor-v2/backend/` submodule dizini bu oturumda **BOŞ** (checkout edilmemiş). Backend kodu `/home/user/menti-mentor` (branch `claude/peaceful-hopper-fml62k`, HEAD `61aae07`) üzerinden denetlendi. Üretimde build edilen backend'in bu commit'le aynı olduğu **TEYİT GEREK**.

---

## 2.A — BÖLÜM A: HATA İZLEME (bir şey bozulunca haberimiz olur mu?)

### A.1 — Dış hata izleme / APM servisi kurulu mu? → **HAYIR**

19 terim, iki repo, harf-duyarsız (`grep -rniE`), kapsam yukarıda. Toplam **2 eşleşme, ikisi de yanlış-pozitif**:
- `backend/src/controllers/adminController.ts:711` — `noteLength:` içindeki `oteL` harf dizisi `otel` terimine takılıyor.
- `docs/raporlar/kesif/mentor-karti-rakip-analizi-2026-08-02.md:132` — bir araştırma yazısında kaynak atfı olarak geçen "LogRocket".

**Lockfile doğrulaması:** `grep -c '"node_modules/@opentelemetry'` → backend **0**, frontend **0**. Lockfile'larda geçen `@opentelemetry/api` satırları yalnız Prisma ve Next.js'in `peerDependenciesMeta: {optional: true}` bildirimleridir (`backend/package-lock.json:5365-5383`, `frontend/package-lock.json:5939-5947, 8194-8210`) — kurulu değiller.

**Bağımlılık listeleri elle doğrulandı:** `backend/package.json:19-33` (`@prisma/client, bcryptjs, cors, dotenv, express, helmet, jsonwebtoken, multer, node-cron, nodemailer, zod`) ve `frontend/package.json:11-21` (`@radix-ui/*, class-variance-authority, clsx, lucide-react, next, react, react-dom, tailwind-merge, zod`) — **observability/RUM/analytics paketi yok.** `docker-compose.yml:41-64` backend `environment:` bloğunda hiçbir `*_DSN` / `SENTRY_*` / `APM_*` yok.

⇒ **Kurulu tek izleme altyapısı kendi yazdığımız `logger.ts` + `SystemLog` tablosudur.**

### A.2 — Bugün bir 500 olunca iz nerede kalıyor? → **İz kalıyor, ama teşhise yetmiyor**

**Merkezi hata yakalayıcı** — `src/middleware/errorHandler.ts:9-25` (25 satır, tam okundu):
```ts
export function globalErrorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  void logger.error('HTTP', 'Beklenmedik sunucu hatası', {
    message: err instanceof Error ? err.message : String(err),
    stack:   err instanceof Error ? err.stack   : undefined,
  });
  if (res.headersSent) return;
  res.status(500).json({ error: 'INTERNAL', message: 'Beklenmedik bir sunucu hatası oluştu.' });
}
```
`server.ts:135-137`'de tüm route'lardan sonra, doğru 4-parametreli imzayla mount edilmiş. Client'a jenerik 500 döner, iç detay sızmaz (`errorHandler.ts:22-24`) ✅.

**Logger** — `src/services/logger.ts` (49 satır, tam okundu), iki hedef:
1. **stdout** (`logger.ts:19`): `console.log(\`[${level}] [${category}] ${message}\`)` — ⚠️ **`meta` (stack dâhil) konsola HİÇ yazılmaz.**
2. **PostgreSQL `SystemLog`** (`logger.ts:23-30`): `prisma.systemLog.create({data:{level, category, message, meta}})`.

Kategoriler `logger.ts:6`: `EMAIL | ML | AUTH | DB | HTTP | SYSTEM | AUDIT`. Seviyeler `schema.prisma:120-124`: `INFO | WARN | ERROR`. **Dosyaya yazma / rotation / harici sink yok** (49 satırın tamamı okundu, başka hedef yok).

**`SystemLog` modeli** — `prisma/schema.prisma:683-696`: `id, level, category, message, meta Json?, createdAt` + 4 indeks (`:691-695`, `@@index([level, category, createdAt])` panelin sorgusunu tam karşılıyor ✅). ⚠️ **`tenantId` kolonu YOK** — `algorithmTuner.ts:200` bunu açıkça itiraf ediyor: *"SystemLog global tablodur (tenantId kolonu yok) → sorgu `meta.tenantId` üzerinden"*.

**Yazan tek yer:** `logger.ts:23`. Kodda başka `systemLog.create` yok.
**Okuyan/silen yerler:** `platformController.ts:98,151,187,193` · `systemLogController.ts:28` · `nudgeService.ts:25` · `algorithmTuner.ts:205` · `gdprService.ts:366` (`deleteMany`, 90 gün).

**Hata mı, iş olayı mı?** Her ikisi de. 22 `logger.error` çağrısı var: HTTP 500 (`errorHandler.ts:15`), cron hataları (`cronScheduler.ts:75,90,161,204,211,252,290,334,347,390`), e-posta (`questionController.ts:444`, `tenantNotifications.ts:130`, `emailService.ts:47`, `cronScheduler.ts:155`), ML (`feedbackLogController.ts:92`, `algorithmTuner.ts:444`), non-fatal iş hataları (`membership.ts:52`, `meetingCheckInController.ts:85`, `feedbackController.ts:84`), auth (`activityService.ts:26`). Güvenlik olayları da `logger.warn` ile kayıtlı: `tenant.ts:67` (**cross-tenant penetrasyon girişimi**), `tenant.ts:88`, `platformController.ts:41` (başarısız platform login, IP'li).

**`uncaughtException` / `unhandledRejection` handler → YOK.**
Kapsam: `grep -rn "uncaughtException\|unhandledRejection\|process.on(" src/ scripts/` → **2 sonuç**, ikisi de sinyal: `server.ts:170` (`SIGTERM`), `server.ts:171` (`SIGINT`). `server.ts` 171 satırın tamamı okundu.

**Async hata yakalama:** `grep -rn "asyncHandler" src/` → **0**; `grep -rn "next(err\|next(e)\|next(error" src/` → **0**. Express sürümü `package.json:26` `^5.1.0`, kurulu **5.2.1** (`package-lock.json:2877-2879`). Express 5 reddedilmiş promise'i otomatik yakalar ⇒ **yakalanmayan async controller hatası `globalErrorHandler`'a ULAŞIR ve loglanır** ✅ — ama tüm hata yakalama tek bir framework davranışına bağlı; `setTimeout`/event-emitter callback'indeki hata hiçbir katmanda yakalanmaz.

### A.3 — SOMUT VAKA: 2026-09-09 fotoğraf yükleme hatası

**Mesajın kaynağı kesin.** `grep -rn "Beklenmedik"` backend `src/`+`tests/` ve frontend `src/` → **tüm kod tabanında 2 eşleşme, ikisi de aynı dosyada, frontend'de HİÇ yok**:
- `errorHandler.ts:15` (log mesajı) · `errorHandler.ts:24` (client'a dönen `"Beklenmedik bir sunucu hatası oluştu."`)

⇒ Kullanıcının gördüğü metin **yalnızca `globalErrorHandler`'dan** gelebilir. Bu, hatanın ne olmadığını da söyler: multer boyut/tip hatası **değildi** (`avatarUpload.ts:46-49,52,56-61,64` kendi Türkçe mesajlarını ve 400/413'ü döner), magic-byte reddi **değildi** (`avatarController.ts:36`), dosya-yok **değildi** (`:28`), kullanıcı-bulunamadı **değildi** (`:44`). ⇒ Hata, **controller'ın try-catch'siz gövdesinde** fırlatılıp Express 5 tarafından taşınmış bir exception'dır.

**Kod zinciri (kanıtlı):** `avatarController.ts:23-57` — fonksiyonun tamamında `try/catch` yok.
`:47` `await writeAvatarFile(filename, file.buffer)` → `avatarStorage.ts:66-69` → `:67` `ensureUploadDir()` → `avatarStorage.ts:61-63` `mkdir(config.upload.dir, {recursive:true})` → `:68` `writeFile(join(config.upload.dir, filename), buffer)`.
`mkdir`/`writeFile` **EACCES/ENOSPC/EROFS** fırlatırsa → reject → Express 5 → `errorHandler.ts:15` log + `:24` **"Beklenmedik bir sunucu hatası oluştu."** ✅ bildirilen semptomla birebir.

**EACCES neden çok olası — üretim konteyner kanıtı (🔴 muhtemel kök neden):**
- `config.ts:113` → `dir: process.env.UPLOAD_DIR ?? resolve(process.cwd(), 'uploads')`
- `Dockerfile:23` `WORKDIR /app` (root sahipliğinde) · `:26-27` `adduser --system --uid 1001 backend` · `:38` `USER backend`
- **Dockerfile'da `uploads` için `RUN mkdir` veya `chown` satırı YOK** (42 satırın tamamı okundu)
- `docker-compose.yml:41-64` backend `environment:` içinde **`UPLOAD_DIR` tanımlı DEĞİL**; `:65-73` backend servisinde **`volumes:` bloğu HİÇ YOK**

⇒ Üretimde `/app/uploads`, süreç uid 1001, `/app` root sahipli 755 ⇒ `mkdir('/app/uploads')` **EACCES**.
⚠️ İki kod kanıtı (chown yok + volume/UPLOAD_DIR yok) kesindir; **üretimde gerçekten EACCES alındığı TEYİT GEREK** (Dokploy kendi env/compose'unu kullanıyor olabilir). Doğrulama: `SELECT meta FROM "SystemLog" WHERE level='ERROR' AND category='HTTP' AND "createdAt"::date='2026-09-09'` → `meta.stack` içinde `EACCES`/`ensureUploadDir` var mı.

**Dahası:** `server.ts:142-144` açılışta `ensureUploadDir().catch(err => console.error('Upload dizini oluşturulamadı:', ...))` — bu hata **yalnız stdout'a** düşer, `logger` kullanılmaz ⇒ **SystemLog'a girmez, panelde görünmez.** Sistem ayağa kalkarken zaten bağırmış ve kimse duymamış olabilir.

**O hatanın bugün bıraktığı iz:**

| Senaryo | 500 döner mi | SystemLog'a yazılır mı | Panelde görünür mü | Kanıt |
|---|---|---|---|---|
| `writeAvatarFile` EACCES/ENOSPC | ✅ | ✅ ama **jenerik + URL'siz** | ⚠️ tek satır, **stack yok, endpoint yok** | `errorHandler.ts:15,24` + `platformController.ts:189` |
| `prisma.user.update` hatası | ✅ | ✅ aynı jenerik, ayırt edilemez | ⚠️ | `avatarController.ts:50` |
| Multer `LIMIT_FILE_SIZE` | ❌ (413) | ❌ **hiç** | ❌ | `avatarUpload.ts:46-49` |
| Multer diğer / bilinmeyen hata | ❌ (400) | ❌ **hiç** | ❌ | `avatarUpload.ts:52,64` |
| Geçersiz magic-byte | ❌ (400) | ❌ **hiç** | ❌ | `avatarController.ts:34-38` |
| Açılışta upload dizini yaratılamaması | — | ❌ **hiç** (yalnız stdout) | ❌ | `server.ts:142-144` |
| Eski dosya silinemedi (ENOENT hariç) | — | ✅ WARN/SYSTEM | ✅ | `avatarStorage.ts:101` |

⇒ **2026-09-09 vakasında sistemde kalan tek iz, panelde bile stack'siz ve endpoint'siz tek satırlık jenerik bir `ERROR/HTTP` kaydıdır.** Hangi kullanıcı, hangi kurum, hangi dosya, hangi OS hata kodu — hiçbiri kayıtlı değil. (Ve `gdprService.ts:366` gereği 2026-12-08'de o kayıt da silinir.)

### A.4 — /platform paneli: hata görmek için yeterli mi? → **HAYIR**

Ekran: `frontend/src/app/platform/dashboard/page.tsx` (598 satır), sekmeler `overview|pending|tenants|reports|abuse|logs` (`:34`).

| Panel öğesi | Frontend | Backend route | Controller |
|---|---|---|---|
| Sistem Sağlığı kartları | `:219-232` | `platformRoutes.ts:44` `GET /api/platform/health` | `platformController.ts:140-170` |
| "Son Sistem Logları" (5) | `:254-272` | `platformRoutes.ts:43` `/stats` | `platformController.ts:98-102,135` |
| "Sistem Logları" sekmesi | `:524-581` | `platformRoutes.ts:45` `/logs` | `platformController.ts:173-197` |

**GÖSTERİYOR:** DB bağlı/kesik (`platformController.ts:142` gerçek `SELECT 1`), SMTP yapılandırılmış/eksik (`:147` — **yalnız env var mı bakar, canlı test yok**, gerekçe `:145-146`), son 24s ERROR sayısı (`:151`), uptime (`:159`), son 5 log satırı, 200 kayıtlık log listesi + 3 filtre.

**GÖSTERMİYOR (kanıtlı):**

| Eksik | Kanıt |
|---|---|
| **Stack trace / `meta`** | `platformController.ts:189` ve `:99` — `select`'te `meta` YOK (KVKK gerekçesi `:182-185`). Frontend tipi `meta` tanımlıyor (`lib/api/platform.ts:207`) ve okumaya çalışıyor (`dashboard/page.tsx:557-558,570`) ama API **hiç göndermiyor** → AUDIT satırlarında `hedef:`/`IP:` pratikte `—`. **Tip ↔ gerçek response uyuşmuyor** |
| Hangi endpoint patladı | `errorHandler.ts:11` — `_req` kullanılmıyor, URL hiç loglanmıyor |
| Hangi kurum/kullanıcı | `schema.prisma:683-696` — `tenantId`/`userId` kolonu yok |
| Tarih filtresi / metin araması / sayfalama | `platformController.ts:174-180,191` — yalnız `limit/level/category`, `skip` yok → **200. kayıttan eskisine panelden ulaşılamaz** |
| 4xx hataları | `requestLogger.ts:18` yalnız stdout'a basıyor, SystemLog'a yazan yok |
| WARN filtresi | `dashboard/page.tsx:529-532` — sadece Tümü/AUDIT/ERROR. **Cross-tenant penetrasyon girişimi (`tenant.ts:67`) filtrelenemiyor** |
| p95 latency / hata oranı | Hiç hesaplanmıyor. `requestLogger.ts:15` `ms` ölçüyor, **yalnız stdout'a** basıyor |
| Alarm / bildirim | Kodda hata eşiği aşımında e-posta/webhook gönderen hiçbir mekanizma yok |
| Otomatik yenileme | `dashboard/page.tsx:93` — `useEffect` yalnız `tab` değişince; polling/websocket yok |
| Sunucu çöküşü izi | handler yok → SystemLog'a girmez, ERROR sayacı artmaz |

⚠️ **"Son 24s Kritik Hata" pill'i yanıltıcı güvence veriyor:** `dashboard/page.tsx:224` `ok={health.recentErrors === 0}` → yeşil. Ama sayaç yalnız `SystemLog.level='ERROR'` sayar. Süreç `uncaughtException` ile çöküp restart ettiyse, upload middleware 400'e yuttuysa, DB erişilemez olup logger yazamadıysa (`logger.ts:31-34`) → **sayaç 0 kalır, pill yemyeşil, sistem bozuk.**

**Ölü uç — `/api/system-logs`:** `server.ts:121` mount, `systemLogRoutes.ts:9` `requirePlatformAdmin` ✅. Ama `grep -rn "system-logs" frontend/src` → **0 sonuç**; panel `/api/platform/logs` kullanıyor (`lib/api/platform.ts:107`). İroni: `systemLogController.ts:28-35` `select` kullanmadığı için **`meta`'yı (stack dâhil) DÖNDÜRÜR** — sistemdeki tek "stack görülebilen" uç budur, ama hiçbir ekrandan erişilemiyor. Ayrıca `systemLogController.ts:9-11` kategori enum'unda **`AUDIT` eksik** → `?category=AUDIT` 400 döner (`:22-24`) oysa `logger.ts:6`'da geçerli ve `platformAudit.ts:30`'da aktif kullanılıyor.

**Sağlık uçları:** `grep -rn "'/health\|\"/health\|healthz\|/readyz\|/livez"` → 3 sonuç. `/healthz`, `/readyz`, `/livez` **YOK**.
- `GET /health` (`server.ts:53-59`, public, rate-limit dışı): `{ok, env, ts, version, uptime}`. ⚠️ **DB'ye hiç bakmaz** — `SELECT 1` yok. Postgres tamamen down olsa `{ok:true}` döner. **Ve bu uç Docker healthcheck'ini besliyor** (`docker-compose.yml:67` `wget -qO- http://localhost:3000/health`) ⇒ **container "healthy" görünürken uygulama DB'siz ve kullanılamaz olabilir**, orchestrator restart etmez. `docker-compose.yml:76-78` frontend `depends_on: service_healthy` bu yanlış sinyale güveniyor.
- `GET /api/platform/health` (auth arkasında): gerçek DB probe'u var (`:142`), 503 döner (`:167-169`) — ama **auth arkasında olduğu için otomatik izlemede kullanılamaz**; `catch {}` (`:167`) hatayı tamamen yutar, sebebini loglamaz.

**Frontend tarafında sıfır gözlemlenebilirlik:** `find frontend/src/app -name "error.tsx" -o -name "global-error.tsx" -o -name "not-found.tsx"` → **0**; `grep -rln "ErrorBoundary\|componentDidCatch" frontend/src` → **0**; `grep -rn "console\." frontend/src` → **tüm frontend'de 1 çağrı** (`components/organisms/TenantSwitcher.tsx:69`). ⇒ Bir React render hatası = **beyaz ekran, kullanıcıya mesaj yok, hiçbir yerde kayıt yok.**

### A.5 — Kendi altyapımız yeterli mi? → **HAYIR: bir 500'ü SAYMAYA yeter, TEŞHİS ETMEYE yetmez**

> Dış servis önerilmiyor. Aşağıdakiler tamamen kendi kodumuzdaki kanıtlı eksiklerdir.

| # | Eksik | Kanıt |
|---|---|---|
| **E1** | Hata kaydında endpoint/kullanıcı/kurum YOK — tüm 500'ler sabit `'Beklenmedik sunucu hatası'` mesajıyla yazılır, 10 farklı endpoint'in hatası DB'de ayırt edilemez. *Fiilen: "hata sayacı var, hata kaydı yok."* | `errorHandler.ts:11,15` |
| **E2** | Yakalanan stack hiçbir arayüzden okunamıyor — yazan `:17`, okuyan `platformController.ts:189`/`:99` `select`'inde `meta` yok; tek okuyabilen uç (`systemLogController.ts:28`) frontend'den hiç çağrılmıyor. **Hatayı incelemek için DB'ye SQL atmak gerekiyor** | `grep -rn "system-logs" frontend/src` → 0 |
| **E3** | Süreç çöküşü hiçbir yere yazılmıyor — handler yok + `restart: unless-stopped` (`docker-compose.yml:37`) = **sessiz yeniden başlatma**; panelde hiç görünmez | `grep` → 0 sonuç; `server.ts:170-171` |
| **E4** | stdout kalıcılaşmıyor; iki iz birleştirilemiyor — `requestLogger.ts:18` URL+status **sadece** console'a, `logger.ts:19` `meta`'yı console'a **hiç** basmıyor, ortak `requestId` kodda hiç üretilmiyor. *"Hangi istek bu stack'e ait?" sorusunun teknik cevabı yok* | `grep -rn "requestId\|correlationId\|traceId" src/` → 0 |
| **E5** | Docker healthcheck yalan söyleyebilir — `/health` DB'ye bakmaz + healthcheck onu kullanıyor | `server.ts:53-59`; `docker-compose.yml:67` |
| **E6** | Tek kalıcı log hedefi, izlediği bağımlılığın kendisi — *Postgres arızası = hata loglarının da arızası* | `logger.ts:23, 31-34` |
| **E7** | Upload katmanı tamamen sessiz — `avatarUpload.ts` 66 satırın tamamında `logger` import'u bile yok; `:64` **bilinmeyen her hatayı 400'e çevirip yutuyor** → globalErrorHandler'a hiç ulaşmaz | `avatarUpload.ts` (tam) |
| **E8** | Alarm yok; fark etme tamamen insana bağlı — `cronScheduler.ts`'teki 8 iş KVKK temizliği/tuning/hatırlatma; **hata alarmı job'ı yok** | `dashboard/page.tsx:93` |
| **E9** | 4xx tamamen görünmez — "kullanıcılar 403 duvarına toslar" türü sorunlar hiç ölçülmez | `requestLogger.ts:16,18` |
| **E10** | Frontend'de sıfır gözlemlenebilirlik — error boundary 0, console 1 | yukarıda |

**⭐ Bir yaygın yanlışın düzeltmesi:** *"Hata DB'ye yazılmıyor → restart'ta kayboluyor"* **DOĞRU DEĞİL.** Yakalanmış 500'ler Postgres'e yazılır (`logger.ts:23`), `postgres_data` volume'ü kalıcıdır (`docker-compose.yml:91-92`), 90 gün saklanır (`gdprService.ts:349,361,366`). **Restart'ta kaybolan:** (a) tüm `requestLogger` stdout'u = URL/status/süre bilgisinin tamamı, (b) `uncaughtException` stack'leri, (c) `server.ts:143` upload-dizini hatası, (d) `logger.ts:33` DB-yazım-başarısız mesajları. ⇒ **Kaybolan şey "hata var mı" değil, "hata neydi ve nerede oldu".**

---

## 2.B — BÖLÜM B: YEDEK (veri kaybolursa geri gelir mi?)

### B.1 — Düzenli yedek alan script / cron / CI işi → **TEK BİR TANE BİLE YOK**

Kapsam §1'de. Aday yerlerin her biri tek tek denetlendi:

| Aday yer | Bulunan | Kanıt |
|---|---|---|
| `backend/scripts/` | 5 dosya (`backfill-consent.ts`, `backfill-memberships.mjs`, `cleanup-orphan-agreements-2026-08-30.sql`, `delete-test-data.mjs`, `seed-test-tenant.mjs`) — **hiçbiri yedek almaz** | `ls` |
| `v2/scripts/` | 2 dosya (`kvkk-docx-gen.py`, `verify.sh`) — **hiçbiri yedek almaz** | `scripts/verify.sh` (tsc+lint+test+build, DB'ye dokunmaz) |
| backend `package.json` script'leri | 14 script — **yedek yok** | `package.json:7-22` |
| v2 `package.json` script'leri | 12 script — **yedek yok** | `package.json:6-18` |
| backend CI | Tek job; `on:` yalnız `push`/`pull_request`, **`schedule:` YOK** | `backend/.github/workflows/ci.yml:3-6` |
| çatı CI | 4 job; `schedule:` YOK. Tek artifact upload'ı coverage + playwright raporu (`retention-days: 7`) — CI çıktısı, veri yedeği DEĞİL | `v2/.github/workflows/ci.yml:19-23, 140-146, 264-272` |
| `docker-compose.yml` | 3 servis + **tek volume `postgres_data`**; yedek servisi/sidecar/cron container YOK | `:23-25, 118-119` |
| `Dockerfile` | `CMD ["sh","-c","npx prisma migrate deploy && node dist/server.js"]` — yedek adımı YOK, `VOLUME` direktifi YOK | `Dockerfile:39` |
| `cronScheduler.ts` | **8 zamanlanmış görev** — yedek alan **sıfır** | `cronScheduler.ts:399-447` |

⚠️ **Asimetri:** Kod tabanında **iki otomatik SİLME cron'u** var (`runWeeklyPurge` Pazar 03:00 UTC · `runDraftTenantCleanup` her gün 04:00 UTC, `cronScheduler.ts:200-207` `user.deleteMany` + `tenant.delete`), **sıfır otomatik YEDEK.** Veri her gün otomatik siliniyor, hiç otomatik yedeklenmiyor.

### B.2 — Belgelerde yedek yordamı → **yordam TARİF EDİLMEMİŞ, ihtiyaç 20+ yerde İTİRAF EDİLMİŞ**

Niyet beyanları (yordam değil): `docs/kararlar/konu/04-guvenlik-ve-kvkk.md:14,55` · `docs/kararlar/00-CIKIS-PLANI.md:74` · `docs/raporlar/bilanco/kararlar/G1-guvenlik-kvkk.md:441,451,455` ("yedekleme → 🔴 en sert bloker") · `docs/devir/05-bekleyen-kararlar-ve-manuel.md:86` · `docs/kararlar/10-yol-haritasi.md:294` · `docs/raporlar/kod-denetimi/strateji-gercek-denetimi-2026-08-20.md:372` · `docs/raporlar/kesif/teshis-raporu-2026-08-02.md:104`.

Tek "gerçek" yordam **F.13** (`docs/kararlar/00-KARAR-TAKIP.md:767-781`) — yordam değil **KURAL**:
- `:779` "✅ TEYİT EDİLDİ (2026-09-08, PO panel teyidi): Plan **ücretsiz** · restore penceresi **6 SAAT** · ⚠️ Kaynak: **PO beyanı — ajan doğrulamadı**"
- `:780` "⚠️ **6 SAAT NE DEMEK:** hata 6 saat içinde fark edilmezse **geri dönüş YOK.** Riskli senaryo: cuma akşamı migration, hafta sonu kimse bakmaz, pazartesi fark edilir"
- `:781` "⭐ **ZORUNLU ÖNLEM:** migration turlarında **etkilenen tablo için ÖNCE yedek tablo alınsın.**"
Aynı kural: `v2/CLAUDE.md:48` · `docs/otonom/OTONOM-PROMPT.txt:47-50` · `docs/kararlar/09-DURUM.md:7-8`.

**Üç katmana ayırmak gerekir:**

| Katman | Durum | Kanıt |
|---|---|---|
| (1) Migration-öncesi tek-tablo yedeği | ✅ **UYGULANABİLİR VE İKİ KEZ UYGULANMIŞ** (satır sayısı doğrulamasıyla) | `07-oturum-gunlugu.md:51` |
| (2) Bütün-DB yedeği | ⛔ **SADECE NİYET** — nasıl/nereye/hangi komut/hangi sıklık hiçbiri yazılmamış | `pg_dump` 0 eşleşme |
| (3) Geri yükleme (restore) provası | ⛔ **HİÇ YAPILMAMIŞ** — tek atıf bir TODO: "yedekleme geri-dönüş denemesi (1-2 saat)" | `00-CIKIS-PLANI.md:74` |
| (4) Geri alma SQL'i | 🟡 yazılı ama **test EDİLMEMİŞ** | `cleanup-orphan-agreements-2026-08-30.sql:29` |

⚠️ **Projenin kendi dürüst itirafı:** `07-oturum-gunlugu.md:65` — **"geri alma (DROP COLUMN/restore) DENENMEDİ"**. Yedek ALMA iki kez koşturulmuş; yedekten GERİ DÖNME hiç koşturulmamış.

### B.3 — 6 saatten eski kayba karşı kodda ne var? → **HİÇBİR ŞEY**

Kapsam §1'de (17 terim, iki repo, 7 dizin ailesi; `pg_dump`/`pg_restore` 0, CI `schedule:` 0, npm script 0, compose backup servisi 0).

| Senaryo | 6 saat yeter mi | Kodda ek koruma |
|---|---|---|
| Migration hatası, dakikalar içinde fark edilir | ✅ | + tarihli yedek tablo (elle) |
| Cuma akşamı işlem, pazartesi fark edilir | ⛔ | **YOK** (F.13:780 bu senaryoyu adıyla yazmış) |
| `runDraftTenantCleanup` gece 04:00'te yanlış tenant siler, ertesi gün fark edilir | ⛔ | **YOK** — `cronScheduler.ts:200-207` fiziksel silme |
| `runWeeklyPurge` Pazar 03:00'te siler, pazartesi fark edilir | ⛔ | **YOK** — `gdprService.ts:365-374` |
| Uygulama bug'ı sessizce veri bozar, haftalar sonra fark edilir | ⛔ | **YOK** |
| Neon hesabının kendisi kaybolur | ⛔ **restore penceresi de gider** — Neon dışında tek kopya yok | **YOK** |

⚠️ **En sivri çelişki:** iki otomatik silme cron'u da 6 saatlik pencereyle çakışıyor. `runWeeklyPurge` **Pazar 03:00 UTC** çalışır (`cronScheduler.ts:414-416`); pazartesi mesai başında fark edilirse aradan **~27 saat** geçmiştir — pencere çoktan kapanmıştır. Bu, F.13:780'de yazılan "cuma akşamı … pazartesi fark edilir" senaryosunun gerçekleşmiş hâlidir ve onu bir insan değil, **kodun kendisi her hafta otomatik tetikliyor.**

### B.4 — Yedek tablo deseni: nasıl yapılmış? → **%100 ELLE SQL**

**`prisma/migrations/` altında yedek tablo içeren migration: SIFIR.** 44 migration klasörü tarandı (`yedek|_backup|_bak|AS SELECT`) → 1 eşleşme, o da **yorum**: `20260909000000_add_internal_note/migration.sql:6-7` *"⚠️ BU TUR ÇALIŞTIRILMADI … F.13 kuralı: çalıştırma turunda ÖNCE CertificationOption için yedek tablo alınır"*. Migration'ın fiili SQL'i tek satır (`:14`, `ADD COLUMN IF NOT EXISTS "internalNote"`). **Yedek alma migration'ın İÇİNDE DEĞİL** — migration yedeği *hatırlatıyor*, almıyor.

**Fiilen alınmış 2 yedek tablo:**

| # | Tablo | Tarih | Satır | Nasıl | Kanıt |
|---|---|---|---|---|---|
| 1 | `MentorshipAgreement_yedek_20260830` | 2026-08-30 | 150 | Repoda `.sql` VAR ama migration değil, çağrılmayan tek-seferlik metin | `scripts/cleanup-orphan-agreements-2026-08-30.sql:16-21` |
| 2 | `CertificationOption_yedek_20260909` | 2026-09-09 | 20 | **Repo DIŞI geçici `.sql`**, tur sonunda silindi | `07-oturum-gunlugu.md:51, 61` |

**"Script mi, elle mi?" — 4 bağımsız kanıt ELLE diyor:**
1. `.sql` dosyasının kendisi yazıyor (`:9`): *"Migration DEĞİL → migrate history'ye GİRMEZ; `db execute` / `$executeRaw` ile **bir kez** çalışır."* Onu çağıran hiçbir `.ts`/`.mjs`/npm script yok (`package.json` 14 script + `scripts/` 5 dosya tarandı; `grep -rn "cleanup-orphan"` yalnız dosyanın kendisini buluyor).
2. #2'nin SQL'i **repoya hiç girmedi** (`:51` "temp .sql, repo-dışı", `:61` "o da silindi") — bugün hiçbir yerde yok.
3. **Adlandırma tutarsızlığı** (otomasyon yokluğunun parmak izi): fiilen alınan ikisi PascalCase, `00-KUYRUK.md:76-77`'de planlanan ikisi **snake_case** (`availability_block_yedek_20260910`). Bir script olsaydı adı tek yerden üretirdi.
4. **Yordam her seferinde yeniden keşfedildi** — `07-oturum-gunlugu.md:45`: *"Önceki canlı migration turu … yöntemi **bulundu** … Aynen kullanıldı."*

**Tekrarlanabilir hale getirme TARİFİ (kod YAZILMADI, dosya oluşturulmadı):**

> **SEÇENEK A — yedek tablo script'i** (en küçük adım; mevcut deseni yalnız kodlar, ~yarım saat, risk düşük)
> Nereye: `backend/scripts/backup-table.mjs` (mevcut `.mjs` script'leriyle aynı klasör/desen). Adımlar:
> 1. Argüman: `--table <Model> [--date YYYYMMDD]`; tablo adı **beyaz listeden** doğrulanır (`schema.prisma` model adları) — `$queryRawUnsafe`'e serbest metin gitmesin.
> 2. **ADIM 0 kapısı:** hedef yedek tablo `information_schema.tables`'ta VAR MI? Varsa **DUR ve hata ver** — bu, `.sql:12-13`'ün *"IF NOT EXISTS KULLANILMAZ; tablo zaten varsa sessizce atlanır → YEDEKSİZ silmeye yol açar"* kuralını kodlar.
> 3. Kaynak satır sayısını SELECT et, bas.
> 4. `CREATE TABLE "<Tablo>_yedek_<tarih>" AS SELECT * FROM "<Tablo>";`
> 5. Yedek satır sayısını SELECT et; **kaynak ≠ yedek ise hata ile çık** (`07-oturum-gunlugu.md:51`'deki "kaynak=20, yedek=20 EŞİT, ikisi de ≠0" doğrulamasını kodlar).
> 6. Tek satır stdout: `<Tablo>_yedek_<tarih> | <n> satır` → bu satır `02-ILERLEME.md`'ye yapıştırılır (böylece `CLAUDE.md:48` kuralı fiilen işler hale gelir).
> Zorunlu muhafızlar (projede zaten var olan desenler): doğrudan-çalıştırma muhafızı (`seed-learning-journey.ts:534-543`), `--apply` olmadan **dry-run** varsayılanı (`scripts/backfill-consent.ts` deseni, `09-DURUM.md:96`), DB host'unu maskeli basma (`07-oturum-gunlugu.md:44`).
>
> **SEÇENEK B — envanter script'i** (`scripts/list-backup-tables.mjs`): `information_schema.tables` → `table_name LIKE '%_yedek_%'`, satır sayısı + yaş. **DROP ETMEZ**, yalnız listeler; silme PO kararıdır (S26/S37 deseni). Bugün bu tabloların envanterini çıkaran hiçbir şey yok.
>
> **SEÇENEK C — gerçek yedek** (ayrı ve büyük iş; yedek tablo bunun yerini TUTMAZ): `.github/workflows/backup.yml`, `on: schedule`, `pg_dump --format=custom` → `actions/upload-artifact` (`retention-days: 30`). ⚠️ **KVKK engeli:** GitHub artifact "üçüncü ülkeye veri aktarımı" sayılabilir (`docs/raporlar/kod-denetimi/kvkk-veri-aktarim-envanteri-2026-08-25.md` zaten aktarım envanteri tutuyor) → **kodlanmadan önce KVKK değerlendirmesi + PO kararı gerekir.** Alternatifler: Dokploy volume'üne yazan cron (veri VPS'te kalır) veya Neon ücretli planla 30 günlük pencere (F.13:779). ⚠️ **Restore provası zorunlu adımdır** — yedeği alıp geri yüklemeyi denememek, yedek almamakla neredeyse aynı şeydir.
>
> Önerilen sıra: **A → B → C**.

### B.5 — Yedek tabloların ömrü → **BİRİKİYOR**

**Temizlik yapan cron VAR ama yedek tablolara dokunmuyor.** `purgeExpiredData` (`gdprService.ts:335-389`, tam okundu) yalnız 2 tablo temizler: `SystemLog` 90 gün (`:342, :366-368`), `FeedbackLog` 3 yıl (`:343, :371-373`). `Message` **bilinçli yazılmamış** (`:376-378`: *"saklama süresi avukat aydınlatma metniyle belirlenecek … kodda keyfi bir süre uygularsak yayınlanacak metinle çelişir"*). Tetik: `cronScheduler.ts:414-416` + manuel `adminController.ts:619-625`.
Not: `retentionMetrics.service.ts` adı yanıltıcı — **kullanıcı tutundurma metriği**, veri saklamayla ilgisi yok (`adminController.ts:130`).

**Yedek tabloları temizleyen hiçbir şey YOK.** Kapsam: `src/` tümünde 9 terimlik temizlik kümesi (`purge|cleanup|clean_up|retention|expire|expired|prune|temizl|saklama`) → ~60 eşleşme, hiçbiri `_yedek_` tablosuna dokunmuyor. Ayrıca `grep -rniE "[a-zA-Z_]+_yedek_[0-9]{8}"` iki repo genelinde 17 eşleşme → **hepsi `docs/` markdown'ı veya o tek `.sql` yorumu; `src/` içinde SIFIR.** Çalışan kodun hiçbir yeri yedek tablonun varlığından haberdar değil.

Temizlik yerine **iki insan sözü**, ikisi de hâlâ açık:

| Söz | Tablo | Alındı | Bugün (2026-09-20) | Kanıt |
|---|---|---|---|---|
| **S26** | `MentorshipAgreement_yedek_20260830` (150 satır) | 2026-08-30 | ⬜ **21 gündür bekliyor** | `00-KARAR-TAKIP.md:178` |
| **S37** | `CertificationOption_yedek_20260909` (20 satır) | 2026-09-09 | ⬜ **11 gündür bekliyor** | `00-KARAR-TAKIP.md:189` |

Belgenin kendisi riski adıyla yazmış (`:178`): *"geçici artefakt izlenmezse unutulur."*
⚠️ **İleriye dönük birikme:** `00-KUYRUK.md:76,77,79,118`'de **en az 4 tane daha** yedek tablo planlanmış → canlıda 6 yedek tablo olur, hiçbiri otomatik temizlenmez. `certification_option_yedek_20260910` (K-16), S37'nin tablosuyla **aynı tablonun ikinci tarihli kopyası** olacak.

**Şemada tanımlı mı? → HAYIR, drift riski DOĞRULANDI.**
`grep -niE "yedek|backup|_bak|model .*(Yedek|Backup)" prisma/schema.prisma` → **SIFIR**; `grep -c "^model "` → **39**. İki yedek tablo yalnız ham SQL ile yaratıldı, Prisma şemasına hiç girmedi. Üç bağımsız doğrulama:
1. `docs/raporlar/kesif/sema-drift-2026-08-30.md:128` — *"yedek tablo (`migrate diff`'te 'şemada yok' görünür → S26 ile düşürülecek)"*
2. `00-KARAR-TAKIP.md:178` — *"`migrate diff`'te 'şemada olmayan tablo' olarak görünüyor"*
3. `00-KARAR-TAKIP.md:189` — ⚠️ *"ileride `migrate dev`/`db push` onu **fazlalık görüp DROP etmek isteyebilir**"*

⚠️ **İroni kayda değer:** yedek tablo, verinin kaybolmaması için var — ama şemada olmadığı için Prisma'nın kendisi onu silmek isteyebilir. Koruma aracı, koruduğu şeyi kaybetme riski taşıyor. Tek savunma `db push --accept-data-loss` yasağı — **bir insan kuralı, bir kod muhafızı değil.** (Kuralın kanonik metni `v2/CLAUDE.md:48`'de; `backend/CLAUDE.md`'de 17+4 terim taramasında **0 eşleşme**.)

### B.6 — 🔴 Neon dışında veri nerede duruyor? (bu bölümün EN ACİL bulgusu)

**Diske yazılıyor — uçtan uca kod kanıtlı:**

| Adım | Kanıt | Ne oluyor |
|---|---|---|
| 1 | `avatarUpload.ts:19` | `multer.memoryStorage()` — henüz disk yok |
| 2 | `userRoutes.ts:48` | yorum: *"multer parse → controller magic-byte doğrular, **diske yazar**"* |
| 3 | `avatarController.ts:47` | `await writeAvatarFile(filename, file.buffer)` |
| 4 | **`avatarStorage.ts:67-69`** | `ensureUploadDir()` + `writeFile(join(config.upload.dir, filename), buffer)` |
| 5 | `config.ts:113` | `dir: process.env.UPLOAD_DIR ?? resolve(process.cwd(), 'uploads')` |
| 6 | `server.ts:68-78` | `express.static('/uploads', …)` ile servis ediliyor |
| 7 | `avatarController.ts:50` | DB'de yalnız **metin URL** tutuluyor (`avatarUrl`), dosya değil |

Kapsam: `src/` tümünde `writeFile|createWriteStream|appendFile|mkdir|fs\.|diskStorage` harf-duyarsız → **diske yazan tek modül `avatarStorage.ts`**; `logger.ts`'te dosya yazma 0 eşleşme. ⇒ **Neon dışındaki tek veri: kullanıcı avatar dosyaları.**

**Container ephemeral mi? → EVET, VOLUME TANIMI YOK. 5 bağımsız kanıt:**
1. `docker-compose.yml:23-24, 118-119` — tek volume `postgres_data:/var/lib/postgresql/data`. **Backend servisinin (`:33-79`) `volumes:` anahtarı HİÇ YOK** (blok tam okundu: yalnız `build, restart, depends_on, environment, ports, healthcheck, networks`).
2. `grep -n "UPLOAD" .env.compose` → **SIFIR**; `docker-compose.yml:38-63` backend `environment:` içinde `UPLOAD_DIR` **yok** ⇒ `config.ts:113` fallback devreye girer = **`/app/uploads`** (`Dockerfile:24` `WORKDIR /app`) = ephemeral container katmanı.
3. `grep -rn "VOLUME" backend/Dockerfile` → **SIFIR**.
4. **Kod bunu zaten biliyor ve uyarıyor:** `config.ts:106-107` *"Deploy'da SİLİNMEMESİ için kalıcı disk (Dokploy persistent volume) olarak mount edilmeli"*; `.env.example:51-54` aynı uyarı, değer **boş**; `.gitignore:9-11` *"Canlıda kalıcı disk (Dokploy volume) kullanılır"*.
5. **Belgeler bunu 🔴 ÇIKIŞ BLOKERİ ilan etmiş:** `docs/raporlar/bilanco/kararlar/G8-altyapi-po-manuel.md:22-33` [G8-01] — `:28` *"Şu haliyle canlıya çıkılırsa **her deploy'da kullanıcı fotoğrafları kaybolur**"*, `:30` *"(teyit) `docker-compose.yml`'de yalnız postgres için volume var; `uploads` volume tanımı YOK — bilanço iddiası DOĞRULANDI"*, `:33` *"🔴 ÇIKIŞ BLOKERİ"*.

**Bu denetim aynı teyidi bugünkü ağaç üzerinde bağımsız olarak TEKRARLADI ve DOĞRULADI.**

**Neden yedekten daha acil:**

| | Neon (DB) | Avatar dosyaları (disk) |
|---|---|---|
| Kaç kopya | 1 + **6 saatlik** geri-dönüş penceresi | **1 kopya. Sıfır yedek. Sıfır pencere.** |
| Kaybolma tetiği | Operatör/kod hatası (nadir, kasıtlı işlem) | **Her redeploy / container yeniden yaratma** (rutin) |
| Fark edilme | `migrate status`, satır sayımı, testler | **Hiçbir izleme yok** — kullanıcı profiline bakana kadar belli olmaz |
| Geri dönüş | Neon restore (6 saat içinde) | **YOK** |
| DB'deki durum | — | `User.avatarUrl` **dolu kalır** → 404 veren kırık URL'ler |

⚠️ **Asıl sivri nokta — SESSİZ tutarsızlık:** `/app/uploads` boşalır ama `User.avatarUrl` Neon'da aynen durur. DB, olmayan dosyalara işaret eden URL'lerle dolu kalır; ne hata fırlar ne log yazılır (`avatarStorage.ts:97-101`'deki tek uyarı *silme* başarısızlığında tetiklenir; dosyanın **var olup olmadığını** kontrol eden hiçbir kod yok). **Bu durum Neon restore ile DÜZELTİLEMEZ** — DB'yi 6 saat geri alsanız dosyalar geri gelmez; tersine, geri alınan DB daha fazla kırık URL içerir.
⚠️ **TEYİT GEREK:** Dokploy'un yeniden başlatma ↔ yeniden yaratma davranış farkı ve panelden elle eklenmiş bir mount olup olmadığı repodan görülemez.

**⚠️ Ek bulgu — kurtarma anında ortaya çıkacak risk (TEYİT GEREK):** `backend/.dockerignore` son satırı `prisma/migrations/*/migration.sql`; ama `Dockerfile:39` `npx prisma migrate deploy` çalıştırıyor ve `:36` `COPY --from=builder /app/prisma ./prisma` yapıyor; builder `COPY . .` (`:15`) ile dockerignore'a tabidir ⇒ **imaj içindeki migration klasörlerinde `.sql` dosyası olmayabilir.** Doğruysa, **sıfırdan yeni bir ortama (felaket sonrası kurtarma dâhil) dağıtımda şema yeniden oluşturulamaz.** Canlının bugüne kadar çalışıyor olması bunu çürütmez: mevcut DB şeması zaten güncel olduğundan `migrate deploy` uygulanacak bir şey bulamayıp sessizce geçer — **sorun ancak boş bir DB'ye karşı, yani tam da kurtarma anında ortaya çıkar.** Doğrulama (salt-okuma kapsamı dışı, `docker build` gerekir): imajda `ls /app/prisma/migrations/*/migration.sql`.

**⚠️ Belge ↔ pratik drift'i:** `v2/CLAUDE.md:48` ve `OTONOM-PROMPT.txt:48` *"Yedek adı + satır sayısı `02-ILERLEME.md`'ye yazılır"* diyor. Dosya var (`docs/otonom/02-ILERLEME.md`, 180 satır) ama `grep -cniE "yedek|volume|foto"` → **0**. İki yedek tablo alındı, ikisi de oraya yazılmadı; kayıt `07-oturum-gunlugu.md` ve `09-DURUM.md`'ye düştü. Bilinçli kural değişikliği mi unutma mı — **TEYİT GEREK.**

---
## 2.C — BÖLÜM C: KORUMA (kötü niyetli bir istek ne yapabilir?)

**Kapsam:** Backend `/home/user/menti-mentor` (`src/server.ts`, `src/routes/*.ts` × 23, `src/middleware/*.ts` × 8, `src/controllers/*.ts` × 34) + Frontend `/home/user/menti-mentor-v2/frontend/src` (195 `.ts`/`.tsx` dosyası).
**Hiçbir dosya değiştirilmedi, yazılmadı, commit edilmedi.**

---

### ⭐ C.1(d) — ÖNCE BU: RATE LIMIT GLOBAL Mİ? (tabloyu okumadan önce oku)

**Cevap: EVET, global bir limitçi VAR — ama anahtarı saldırgan kontrolünde, yani pratikte yok hükmünde.**

`src/server.ts:81`
```ts
app.use('/api', generalRateLimiter);
```

Bu satır `/api/*` altındaki **188 + 1 = 189 ucun tamamını** kapsar. Dolayısıyla "rate limit YOK" diyebileceğim uç **teknik olarak yalnızca 1 tanedir** (`GET /health`, `server.ts:53` — `/api` prefix'i dışında). Statik `/uploads` servisi de (`server.ts:67-78`) `/api` dışındadır → limitsizdir.

#### 🔴 BULGU C.1-d-1 — generalRateLimiter'ın anahtarı tamamen saldırgan kontrolünde (KRİTİK)

`src/middleware/rateLimiter.ts:35-45`
```ts
export function generalRateLimiter(req, res, next) {
  const tenantId = req.header('X-Tenant-Id')?.trim() ?? 'anon';
  if (!checkLimit(`general:${tenantId}`, DEFAULT_RPM)) { ... 429 ... }
```

Kova anahtarı, doğrulanmamış bir **istek başlığıdır**. Saldırgan her istekte `X-Tenant-Id: <rastgele-uuid>` göndererek her seferinde **taze bir kova** alır → `generalRateLimiter` sınırsız kez atlatılır. Doğrulama (`requireTenant`, `src/middleware/tenant.ts:37`) limitçiden SONRA çalışır; yani sahte tenant 401 alsa bile istek limit sayacına takılmadan DB'ye (`getCachedTenant`) ulaşır.

**Sonuç:** "Global limit var" ifadesi bir savunma beyanı olarak GEÇERSİZDİR. Bu yüzden aşağıdaki tabloda **`general` sütununu koruma saymıyorum**; gerçek koruma yalnız IP-bazlı EK limitçilerdedir.

#### 🔴 BULGU C.1-d-2 — `app.set('trust proxy')` YOK → IP-bazlı limitçilerin tamamı üretimde bozuk

Kapsam beyanı: `trust proxy` · `trustProxy` · `X-Forwarded-For` · `x-forwarded` terimleri **`src/` (tüm alt dizinler) + `Dockerfile`** üzerinde harf-duyarsız tarandı → **0 sonuç** (`grep` exit 1).

`rateLimiter.ts:52-54`
```ts
function clientIp(req: Request): string {
  return (req.ip ?? req.socket?.remoteAddress ?? 'unknown').toString();
}
```

`trust proxy` ayarlanmadığında Express `req.ip` = **soket adresi**. Üretimde uygulama Dokploy/nginx arkasında (`Dockerfile` mevcut, `CLAUDE.md` "PROD: docker-compose") çalıştığı için bu değer **ters-vekilin tek IP'sidir**. İki yönlü hasar:
- **Yanlış-pozitif:** tüm meşru kullanıcılar tek kovayı paylaşır → `loginRateLimiter` 10/dk ile tüm kurum kilitlenir (DoS).
- **Yanlış-negatif yok ama koruma anlamsız:** saldırgan ile kurban aynı kovada.

⚠️ TEYİT GEREK: üretimdeki gerçek `req.ip` değeri — kod okunarak kesinleştirilemez, çalışan ortamda ölçülmeli.

---

### C.1(a) — server.ts MOUNT HARİTASI (tam)

`src/server.ts` (171 satır) tamamı okundu.

**Route öncesi global katman:**

| # | Satır | Katman | Not |
|---|---|---|---|
| 1 | `server.ts:43-46` | `helmet({contentSecurityPolicy:false, crossOriginEmbedderPolicy:false})` | CSP kapalı — API olduğu için bilinçli |
| 2 | `server.ts:48-49` | `cors({origin: ALLOWED_ORIGINS, credentials:true})` | varsayılan `localhost:3001` |
| 3 | `server.ts:50` | `express.json({ limit: '1mb' })` | ✅ **global gövde boyut sınırı 1 MB** (multipart'a uygulanmaz) |
| 4 | `server.ts:51` | `requestLogger` | PII loglamaz (`requestLogger.ts:18-27`: yalnız method/url/status/ms/tenantId) ✅ |
| 5 | `server.ts:67-78` | `express.static('/uploads')` — `index:false`, `dotfiles:'deny'`, `nosniff`, CSP `sandbox` | **`/api` DIŞINDA → rate limit YOK** |
| 6 | `server.ts:81` | **`app.use('/api', generalRateLimiter)`** | Tek global limitçi (yukarıdaki C.1-d-1) |

**Mount noktaları:**

| Satır | Prefix | Router dosyası | Mount noktasında middleware | Router İÇİNDE `router.use(...)` |
|---|---|---|---|---|
| `server.ts:84` | `/api/platform` | `platformRoutes.ts` | — (yalnız general) | `requirePlatformAdmin` (:39), `platformReadRateLimiter` (:40) — **satır 34-35'ten SONRA** |
| `server.ts:87` | `/api/suspicion-reports` | `suspicionRoutes.ts` | — | yok (uç bazlı `suspicionReportRateLimiter`) |
| `server.ts:90` | `/api/auth` | `authRoutes.ts` | — | yok (uç bazlı limitçiler) |
| `server.ts:93` | `/api/invitations` | `invitationRoutes.ts` | — | yok (uç bazlı `invitationJoinRateLimiter`) |
| `server.ts:98` | `/api/tenants` | `selfServeRoutes.ts` | — | **yok — auth controller içinde** (`extractAdminPayload`) |
| `server.ts:102` | `/api/tenants` | `adminSettingsRoutes.ts` | — | **yok — auth controller içinde** |
| `server.ts:105` | `/api/super-admin` | `superAdminRoutes.ts` | — | `requirePlatformAdmin` (:12) |
| `server.ts:108` | `/api/tenants` | `tenantRoutes.ts` | — | `requirePlatformAdmin` (:14) |
| `server.ts:113` | `/api` | `onboardingRoutes.ts` | — | `requireTenant` (:15) |
| `server.ts:116` | `/api` | `userRoutes.ts` | — | `requireTenant` (:23) |
| `server.ts:117` | `/api/job-listings` | `jobListingRoutes.ts` | — | `requireTenant` (:12) |
| `server.ts:118` | `/api/meetings` | `meetingRoutes.ts` | — | `requireTenant` (:29) |
| `server.ts:119` | `/api/feedback-logs` | `feedbackLogRoutes.ts` | — | `requireTenant` (:13) |
| `server.ts:120` | `/api/clubs` | `clubRoutes.ts` | — | `requireTenant` (:15) |
| `server.ts:121` | `/api/system-logs` | `systemLogRoutes.ts` | — | `requirePlatformAdmin` (:9) |
| `server.ts:122` | `/api/questions` | `questionRoutes.ts` | — | `requireTenant` (:28) |
| `server.ts:123` | `/api/analytics` | `analyticsRoutes.ts` | — | `requireTenant` (:7) |
| `server.ts:126` | `/api/admin/learning-journey` | `learningJourneyAdminRoutes.ts` | — | `requireTenant` (:25) + `requireRole('ADMIN')` (:26) |
| `server.ts:127` | `/api/admin` | `adminRoutes.ts` | — | `requireTenant` (:39) + `requireRole('ADMIN')` (:40) |
| `server.ts:128` | `/api/scoring` | `sjtScoringRoutes.ts` | — | `requireTenant` (:16) |
| `server.ts:129` | `/api/agreements` | `agreementRoutes.ts` | — | `requireTenant` (:13) |
| `server.ts:130` | `/api/conversations` | `conversationRoutes.ts` | — | `requireTenant` (:14) |
| `server.ts:131` | `/api/learning-journey` | `learningJourneyRoutes.ts` | — | `requireTenant` (:22) |
| `server.ts:133` | `POST /api/tags/suggest` (inline) | `tagController.suggestTag` | `generalRateLimiter` (mükerrer) | ⚠️ **`requireTenant` YOK** — bkz. BULGU C.1-a-1 |
| `server.ts:53` | `GET /health` (inline) | — | **hiçbiri** | `/api` dışı → limitsiz |
| `server.ts:136-137` | — | `notFoundHandler`, `globalErrorHandler` | — | iç hata sızdırmaz (`errorHandler.ts:22-24`) ✅ |

#### 🟡 BULGU C.1-a-1 — `POST /api/tags/suggest` fail-closed ölü uç
`server.ts:133` bu ucu `requireTenant` OLMADAN mount ediyor. `req.auth` yalnızca `tenant.ts:47` ve `tenant.ts:100`'de set edilir (kapsam beyanı: `req.auth =` ataması tüm `src/` içinde harf-duyarsız tarandı, başka set noktası yok). Sonuç: `tagController.ts:57-59` her çağrıda `401 KIMLIK_DOGRULANMADI` döner ve `req.tenant.tenantId` (`tagController.ts:67`) hiç değerlendirilmez.
**Güvenlik açığı DEĞİL (fail-closed), ama uç işlevsiz.** Doğru düzeltme `requireTenant` + `requireAuth()` eklemektir.

#### ⚠️ Mount sırası gözlemi (bulgu değil, kırılganlık)
`/api/tenants` prefix'i **üç ayrı router'a** mount edilmiştir (`server.ts:98, 102, 108`) ve üçünün auth modeli farklıdır (controller-içi JWT / controller-içi JWT / `requirePlatformAdmin`). Doğru çalışması **yalnızca path segment sayısına ve mount sırasına** bağlıdır. `tenantRoutes.ts:18`'deki `GET /:id` tek-segment olduğu için `GET /api/tenants/unsubscribe` (`selfServeRoutes.ts:38`) önce mount edildiğinden ona gider. Bugün doğru; yeni bir tek-segment path eklendiğinde sessizce yanlış router'a düşme riski var.

---

### C.1(b) — rateLimiter.ts TAM ANALİZİ

`src/middleware/rateLimiter.ts` (253 satır) tamamı okundu. **11 ayrı limitçi + 1 test yardımcısı.** Ortak altyapı: tek in-memory `Map` (`:13`), sabit 60 sn sliding window (`:11`), 5 dk'da bir temizlik (`:28-33`).

| # | İsim | Satır | Pencere | Limit (varsayılan / env) | Anahtar | Skip koşulu | Mesaj (özet) |
|---|---|---|---|---|---|---|---|
| 1 | `generalRateLimiter` | :35 | 60 sn | 100 / `RATE_LIMIT_RPM` | **`X-Tenant-Id` başlığı** (yoksa `'anon'`) | **yok** | "İstek limiti aşıldı. Dakikada en fazla N istek…" |
| 2 | `platformAuthRateLimiter` | :57 | 60 sn | 10 / `PLATFORM_AUTH_RPM` | IP | yok | "Çok fazla giriş denemesi…" |
| 3 | `platformReadRateLimiter` | :69 | 60 sn | 120 / `PLATFORM_READ_RPM` | IP | yok | "İstek limiti aşıldı…" |
| 4 | `avatarUploadRateLimiter` | :85 | 60 sn | 5 / `AVATAR_UPLOAD_RPM` | `req.auth.userId` → yoksa IP | yok | "Çok fazla yükleme denemesi…" |
| 5 | `loginRateLimiter` | :105 | 60 sn | 10 / `LOGIN_RATE_RPM` | IP | yok | "Çok fazla giriş denemesi…" |
| 6 | `passwordResetRateLimiter` | :123 | 60 sn | 5 / `PASSWORD_RESET_RATE_RPM` | IP | yok | "Çok fazla şifre işlemi denemesi…" |
| 7 | `registerRateLimiter` | :142 | 60 sn | 10 / `REGISTER_RATE_RPM` | IP | yok | "Çok fazla kayıt denemesi…" |
| 8 | `suspicionReportRateLimiter` | :155 | 60 sn | 5 / `SUSPICION_RATE_RPM` | IP | yok | "Çok fazla bildirim gönderdiniz…" |
| 9 | `invitationJoinRateLimiter` | :172 | 60 sn | 20 / `INVITE_JOIN_RATE_RPM` | IP | yok | "Çok fazla deneme…" |
| 10 | `checkSlugRateLimiter` | :185 | 60 sn | 30 / `CHECK_SLUG_RATE_RPM` | IP | yok | "Çok fazla sorgu…" |
| 11 | `dataExportRateLimiter` | :203 | 60 sn | 5 / `DATA_EXPORT_RATE_RPM` | `req.auth.userId` → yoksa IP | yok | "Çok fazla veri indirme talebi…" |
| 12 | `accountDeleteRateLimiter` | :217 | 60 sn | 5 / `ACCOUNT_DELETE_RATE_RPM` | `req.auth.userId` → yoksa IP | yok | "Çok fazla hesap kapatma denemesi…" |
| 13 | `selfServeRegisterRateLimiter` | :238 | 60 sn | 5 / `SELF_SERVE_REGISTER_RATE_RPM` | IP | yok | "Çok fazla kurum başvurusu denemesi…" |
| — | `resetRateLimiters` | :251 | — | — | — | test yardımcısı | — |

(Tablo 13 satır; "11 limitçi" derken `general` + 12 özel = 13 fonksiyon. **Sayılan birim: `export function` olarak tanımlanmış ve `res.status(429)` döndüren middleware.** Bu tanımla **13 limitçi**; `resetRateLimiters` bir limitçi değildir.)

#### ⭐ NODE_ENV / test-ortamı devre dışı bırakma sorusu — KANITLI CEVAP: **HAYIR, devre dışı bırakılmıyor**

Kapsam beyanı: `NODE_ENV` · `nodeEnv` terimleri **`src/` (controllers, middleware, routes, services, config) tamamında** harf-duyarsız tarandı. Toplam 10 isabet, hiçbiri `src/middleware/` içinde değil:

| Dosya:satır | Kullanım | Limitçiyi etkiler mi |
|---|---|---|
| `src/config.ts:10`, `:53` | `isProd`, `config.nodeEnv` | hayır |
| `src/controllers/authController.ts:62` | refresh cookie `secure` bayrağı | hayır |
| `src/controllers/selfServeController.ts:16` | cookie `secure` | hayır |
| `src/controllers/platformController.ts:16` | cookie `secure` | hayır |
| `src/controllers/platformController.ts:158` | `/platform/health` yanıtı | hayır |
| `src/services/cronScheduler.ts:30` | `NODE_ENV !== 'test'` → cron kapalı | hayır (cron, limitçi değil) |
| `src/server.ts:55`, `:140` | `/health` yanıtı + açılış logu | hayır |

**`src/middleware/rateLimiter.ts` içinde `NODE_ENV` hiç geçmiyor → limitçiler HER ortamda aktiftir.** ✅ Bu **ZATEN İYİ**.

Bunun yerine test izolasyonu iki mekanizmayla sağlanmış (ikisi de güvenli desen):
- Eşikler **çağrı anında** env'den okunuyor (`:106, :124, :143, :156, :173, :186, :205, :219, :239` — `const` değil) → test `.env.test`'te eşiği yükseltebilir.
- `resetRateLimiters()` (`:251-253`) sayaçları testler arası sıfırlar.

⚠️ `.env.test.example` incelendi: içinde **hiçbir `*_RATE_RPM` override'ı yok** (yalnız `TEST_DATABASE_URL`, `NODE_ENV=test`, `JWT_SECRET`, `PLATFORM_ADMIN_KEY`). Yorumlarda (`:138-139`) ".env.test'te yüksek tutularak" deniyor ama örnek dosya bunu yansıtmıyor → **TEYİT GEREK:** gerçek `.env.test` gitignore'da, içeriği okunamadı.

#### 🟡 BULGU C.1-b-1 — 13 limitçinin 11'inin env değişkeni `.env.example`'da belgelenmemiş
`.env.example` içinde yalnız `LOGIN_RATE_RPM` (`:11`) ve `PASSWORD_RESET_RATE_RPM` (`:13`) var. Belgelenmeyenler: `RATE_LIMIT_RPM`, `PLATFORM_AUTH_RPM`, `PLATFORM_READ_RPM`, `AVATAR_UPLOAD_RPM`, `REGISTER_RATE_RPM`, `SUSPICION_RATE_RPM`, `INVITE_JOIN_RATE_RPM`, `CHECK_SLUG_RATE_RPM`, `DATA_EXPORT_RATE_RPM`, `ACCOUNT_DELETE_RATE_RPM`, `SELF_SERVE_REGISTER_RATE_RPM`. Operatör bunları ayarlayabileceğini bilmiyor.

#### 🟡 BULGU C.1-b-2 — In-memory sayaç, çok-instance'ta ölçeklenmez
`counters` bir process-yerel `Map`'tir (`:13`). Yatay ölçeklemede (2 replika) etkin limit **iki katına** çıkar; process restart'ta sayaç sıfırlanır. Ayrıca pencere sabit 60 sn olduğundan **saat/gün bazlı** limit (ör. "günde 3 kurum başvurusu") ifade edilemiyor — kodun kendi yorumu da bunu kabul ediyor (`:235-236`).

#### 🟡 BULGU C.1-b-3 — Bellek büyümesi, saldırgan kontrollü anahtarla
`generalRateLimiter` anahtarı sahte `X-Tenant-Id` ile sınırsız çeşitlenebildiğinden (C.1-d-1), `counters` Map'i saldırganın istediği hızda büyür. Temizlik 5 dakikada bir (`:33`) ve yalnız 2 dk'dan eski kayıtları siler → dakikada ~N benzersiz başlıkla bellek şişirme (hafif DoS) mümkün.

---

### ⭐ C.1(c) — UÇ TABLOSU (TAM — 190 uç)

**SAYILAN BİRİM (KURAL 16):** Bir "uç" = kodda tanımlanmış tek bir `router.<metod>(path, ...)` / `app.<metod>(path, ...)` çağrısıdır. Aynı path'in farklı HTTP metotları **ayrı uç** sayılır; parametrik path (`/:id`) tek uç sayılır.

**SAYIM: 190 uç — 23 route dosyası + `server.ts` (2 satır-içi uç).**
Doğrulama: `grep -cE "^router\.(get|post|patch|put|delete)\("` toplamı = **188** (23 dosya) + `server.ts:53` (`GET /health`) + `server.ts:133` (`POST /api/tags/suggest`) = **190**.

**Sütun notu:** "rate limit" sütununda `general` = yalnız `generalRateLimiter` (C.1-d-1 uyarınca gerçek koruma sayılmaz). İkinci bir limitçi varsa açıkça yazılmıştır.

#### 1) platformRoutes.ts → `/api/platform` (21 uç)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| POST /api/platform/auth | **YOK (public)** | general + **platformAuth 10/dk/IP** | Platform admin e-posta+şifre girişi, cookie basar | platformRoutes.ts:34 |
| POST /api/platform/logout | **YOK (public)** | general | Platform cookie'sini temizler | platformRoutes.ts:35 |
| GET /api/platform/stats | platformAuth | general + platformRead 120 | Sistem geneli sayaçlar | platformRoutes.ts:43 |
| GET /api/platform/health | platformAuth | general + platformRead | DB/servis sağlığı | platformRoutes.ts:44 |
| GET /api/platform/logs | platformAuth | general + platformRead | SystemLog listesi | platformRoutes.ts:45 |
| GET /api/platform/tenants/pending | platformAuth | general + platformRead | Onay bekleyen kurumlar | platformRoutes.ts:48 |
| GET /api/platform/tenants | platformAuth | general + platformRead | Tüm kurumlar | platformRoutes.ts:49 |
| POST /api/platform/tenants/:id/approve | platformAuth | general + platformRead | Kurumu onaylar | platformRoutes.ts:50 |
| POST /api/platform/tenants/:id/reject | platformAuth | general + platformRead | Kurumu reddeder | platformRoutes.ts:51 |
| POST /api/platform/tenants/:id/request-correction | platformAuth | general + platformRead | Düzeltme ister | platformRoutes.ts:52 |
| POST /api/platform/tenants/:id/freeze | platformAuth | general + platformRead | Kurumu dondurur | platformRoutes.ts:53 |
| POST /api/platform/tenants/:id/activate | platformAuth | general + platformRead | Kurumu aktive eder | platformRoutes.ts:54 |
| GET /api/platform/tenants/:id/overview | platformAuth | general + platformRead | Kurum derin özet (audit'li) | platformRoutes.ts:57 |
| GET /api/platform/tenants/:id/members | platformAuth | general + platformRead | Üye listesi (e-posta **maskeli**) | platformRoutes.ts:58 |
| GET /api/platform/tenants/:id/meetings | platformAuth | general + platformRead | Görüşme listesi | platformRoutes.ts:59 |
| GET /api/platform/tenants/:id/analytics | platformAuth | general + platformRead | DISC dağılımı (k-anon YOK — bkz. C.5-3) | platformRoutes.ts:60 |
| GET /api/platform/suspicion-reports | platformAuth | general + platformRead | Şüphe bildirimleri | platformRoutes.ts:63 |
| POST /api/platform/suspicion-reports/:id/review | platformAuth | general + platformRead | Bildirimi inceler | platformRoutes.ts:64 |
| GET /api/platform/user-reports | platformAuth | general + platformRead | Sistem geneli şikayetler | platformRoutes.ts:67 |
| PATCH /api/platform/user-reports/:id | platformAuth | general + platformRead | Şikayeti karara bağlar | platformRoutes.ts:68 |
| GET /api/platform/anomalies | platformAuth | general + platformRead | Otomatik anomali tespiti | platformRoutes.ts:69 |

#### 2) suspicionRoutes.ts → `/api/suspicion-reports` (1 uç)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| POST /api/suspicion-reports | **YOK (public, kasıtlı)** | general + **suspicion 5/dk/IP** | Sahte kurum/davet şüphesi kaydı → DB yazar | suspicionRoutes.ts:9 |

#### 3) authRoutes.ts → `/api/auth` (10 uç)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| POST /api/auth/register | **YOK (public, kasıtlı)** | general + **register 10/dk/IP** | Kullanıcı kaydı; **mail gönderir** (admin bildirimi + "zaten kayıtlı" maili) | authRoutes.ts:21 |
| POST /api/auth/login | **YOK (public, kasıtlı)** | general + **login 10/dk/IP** | E-posta+şifre → JWT + refresh cookie | authRoutes.ts:25 |
| POST /api/auth/refresh | **YOK (public)** | general **(tek başına)** | Refresh cookie ile token rotasyonu; DB yazar | authRoutes.ts:28 |
| POST /api/auth/logout | **YOK (public)** | general | Refresh token'ı DB'den siler | authRoutes.ts:31 |
| POST /api/auth/forgot-password | **YOK (public)** | general + **pwreset 5/dk/IP** | **Şifre sıfırlama maili gönderir** + DB'ye token yazar | authRoutes.ts:35 |
| POST /api/auth/reset-password | **YOK (public)** | general + **pwreset 5/dk/IP** | Token doğrular, şifreyi değiştirir, tüm oturumları düşürür | authRoutes.ts:39 |
| GET /api/auth/me | requireTenant + controller `!req.auth`→401 | general | Oturum sahibinin profili | authRoutes.ts:42 |
| POST /api/auth/reapply | **YOK (public)** | general + **login 10/dk/IP** | Reddedilen kullanıcı yeniden başvurur (şifre doğrular) | authRoutes.ts:46 |
| GET /api/auth/:provider | **YOK (public)** | general **(tek başına)** | OAuth başlatma → provider'a redirect | authRoutes.ts:55 |
| GET /api/auth/:provider/callback | **YOK (public)** | general **(tek başına)** | OAuth callback; kullanıcı oluşturabilir/oturum açar | authRoutes.ts:56 |

#### 4) invitationRoutes.ts → `/api/invitations` (1 uç)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| GET /api/invitations/:token/join | **YOK (public, kasıtlı)** | general + **invite-join 20/dk/IP** | Davet token'ını doğrular, kurum marka bilgisini döner | invitationRoutes.ts:13 |

#### 5) selfServeRoutes.ts → `/api/tenants` (9 uç) — **hiçbirinde route-seviyesi auth yok, tamamı controller-içi JWT**

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| GET /api/tenants/self-serve/check-slug | **YOK (public)** | general + **check-slug 30/dk/IP** | Slug müsait mi (kurum numaralandırma yüzeyi) | selfServeRoutes.ts:23 |
| POST /api/tenants/self-serve/register | **YOK (public)** | general + **self-serve-register 5/dk/IP** | **Tenant + ADMIN User + membership + 2 rıza kaydı + refreshToken yazar** (bcrypt 12 tur) | selfServeRoutes.ts:25 |
| POST /api/tenants/self-serve/resubmit | controller JWT ADMIN (`selfServeController.ts:442`) | general | Reddedilen başvuruyu yeniden gönderir | selfServeRoutes.ts:27 |
| PATCH /api/tenants/:id/onboarding | controller JWT ADMIN (`:383`) + `payload.tenantId === :id` (`:388`) | general | Onboarding adımı/logo/renk/limits günceller | selfServeRoutes.ts:28 |
| GET /api/tenants/:slug/preview | controller JWT ADMIN (`:490`) + tenant eşleşmesi (`:503`) | general | DISC önizleme personaları üretir | selfServeRoutes.ts:29 |
| POST /api/tenants/:id/invitations | controller JWT ADMIN (`:593`) + tenant eşleşmesi (`:598`) | general | 30 günlük davet JWT'si üretir | selfServeRoutes.ts:30 |
| GET /api/tenants/:id/invitation-templates | controller JWT ADMIN (`:737`) + tenant eşleşmesi (`:741`) | general | Davet şablonlarını listeler | selfServeRoutes.ts:33 |
| PUT /api/tenants/:id/invitation-templates | controller JWT ADMIN (`:751`) + tenant eşleşmesi (`:755`) | general | Şablon upsert (≤5000 char) | selfServeRoutes.ts:34 |
| GET /api/tenants/unsubscribe | **YOK (public, kasıtlı)** — token yeterli | general **(tek başına)** | `unsubscribeToken` ile kurumu mail listesinden çıkarır; **DB yazar** | selfServeRoutes.ts:38 |

#### 6) adminSettingsRoutes.ts → `/api/tenants` (2 uç)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| PATCH /api/tenants/:id/settings | controller JWT ADMIN (`adminSettingsController.ts:12-18`) + tenant eşleşmesi (`:84`) | general | Haftalık görüşme limiti + min eşleşme skoru | adminSettingsRoutes.ts:14 |
| POST /api/tenants/:id/block-pair | controller JWT ADMIN + tenant eşleşmesi (`:143`) | general | İki üyeyi eşleşmeye kapatır | adminSettingsRoutes.ts:18 |

#### 7) superAdminRoutes.ts → `/api/super-admin` (4 uç) — `requirePlatformAdmin` (:12)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| GET /api/super-admin/dashboard | platformAuth | general | Platform özet panosu | superAdminRoutes.ts:14 |
| PATCH /api/super-admin/tenants/:id/status | platformAuth | general | Kurum aktif/pasif | superAdminRoutes.ts:15 |
| GET /api/super-admin/tenants/pending | platformAuth | general | Onay bekleyen kurumlar | superAdminRoutes.ts:18 |
| PATCH /api/super-admin/tenants/:id/verify | platformAuth | general | Kurum doğrulama kararı | superAdminRoutes.ts:19 |

⚠️ Not: bu router'da `platformReadRateLimiter` **YOK** (platformRoutes'takinin aksine) → yalnız atlatılabilir `general`.

#### 8) tenantRoutes.ts → `/api/tenants` (4 uç) — `requirePlatformAdmin` (:14)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| GET /api/tenants | platformAuth | general | Kurum listesi | tenantRoutes.ts:16 |
| POST /api/tenants | platformAuth | general | Kurum oluşturur | tenantRoutes.ts:17 |
| GET /api/tenants/:id | platformAuth | general | Kurum detayı | tenantRoutes.ts:18 |
| PATCH /api/tenants/:id | platformAuth | general | Kurum günceller | tenantRoutes.ts:19 |

#### 9) onboardingRoutes.ts → `/api` (5 uç) — `requireTenant` (:15)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| POST /api/users/profile/complete | requireAuth | general | Sektör/beceri/deneyim kaydeder | onboardingRoutes.ts:20 |
| GET /api/users/disc/questions | requireAuth | general | 8 DISC sorusu (boyutlar gizli) | onboardingRoutes.ts:29 |
| POST /api/users/disc/submit | requireAuth | general | DISC cevaplarını işler, "Aha Anı" kartı üretir | onboardingRoutes.ts:35 |
| PATCH /api/users/me/social | requireAuth | general | Sosyal profil alanları (userId token'dan) | onboardingRoutes.ts:41 |
| PATCH /api/users/me/matching-preferences | requireAuth | general | S1/S2/S3 üç soru alanları | onboardingRoutes.ts:49 |

#### 10) userRoutes.ts → `/api` (29 uç) — `requireTenant` (:23)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| GET /api/users | requireAuth (+ controller: PENDING üyeye 403, `userController.ts:46-57`) | general | Onaylı peer listesi, sayfalı | userRoutes.ts:27 |
| GET /api/users/mentor-count | requireAuth | general | Onaylı mentör sayısı — **k-anonim (`userController.ts:140`)** | userRoutes.ts:31 |
| POST /api/users | requireRole(ADMIN) | general | Kullanıcı oluşturur | userRoutes.ts:34 |
| GET /api/users/:id | requireAuth + controller self/admin→tam, diğeri minimal (`userController.ts:187-191`) | general | Profil detayı | userRoutes.ts:37 |
| PATCH /api/users/me/profile | requireAuth | general | Kendi profilini düzenler (whitelist) | userRoutes.ts:40 |
| POST /api/users/me/avatar | requireAuth | general + **avatar-upload 5/dk/userId** | Avatar yükler (multer 5MB → magic-byte → diske) | userRoutes.ts:49 |
| PATCH /api/users/:id | requireRole(ADMIN) | general | Kullanıcı günceller | userRoutes.ts:58 |
| POST /api/users/:id/temperament-test | requireRole(ADMIN,MENTI) + controller self/admin (`temperamentController.ts:37`) | general | 7 soruluk mizaç testi | userRoutes.ts:62 |
| GET /api/mentors/:mentorId/candidates | requireRole(ADMIN,MENTOR) + controller isOwner/isAdmin (`matchingController.ts:45-48`) | general | Mentöre menti adayları (ağır skorlama) | userRoutes.ts:70 |
| GET /api/mentis/:mentiId/mentor-matches | requireRole(ADMIN,MENTI) + **requireSelfOrAdmin** | general | Mentiye mentör listesi (ağır skorlama) | userRoutes.ts:81 |
| POST /api/mentors/:mentorId/visibility-optin | requireRole(ADMIN,MENTOR) — **sahiplik kontrolü YOK** | general | Mentör→menti opt-in upsert | userRoutes.ts:89 |
| GET /api/mentors/:mentorId/dashboard-metrics | requireRole + **requireSelfOrAdmin** | general | Mentör panel kartları | userRoutes.ts:97 |
| POST /api/users/:id/report | requireAuth (+ self-report engeli, tekrar engeli) | general | Üye şikayeti → DB yazar | userRoutes.ts:105 |
| GET /api/requests | requireAuth | general | Eşleşme istekleri listesi | userRoutes.ts:108 |
| GET /api/requests/:id | requireAuth | general | Tek istek detayı | userRoutes.ts:109 |
| POST /api/requests | requireAuth | general | Eşleşme isteği oluşturur | userRoutes.ts:110 |
| GET /api/users/:userId/clubs | requireAuth + **requireSelfOrAdmin** | general | Kullanıcının kulüp üyelikleri | userRoutes.ts:114 |
| PATCH /api/users/:id/self-profile | requireAuth + controller self/admin (`userController.ts:402`) | general | selfProfile JSON merge (≤50 anahtar) | userRoutes.ts:118 |
| GET /api/users/:id/adaptive-test/next | requireAuth + controller self/admin (`adaptiveTestController.ts:21-24`) | general | Sıradaki adaptif soru | userRoutes.ts:128 |
| POST /api/users/:id/adaptive-test/answer | requireAuth + controller self/admin (`:56-59`) | general | Cevap kaydeder + sıradaki soru | userRoutes.ts:133 |
| GET /api/users/:id/adaptive-test/preview | requireAuth + controller self/admin (`:113-116`) | general | Anlık DISC tahmini | userRoutes.ts:138 |
| GET /api/mentors/:mentorId/filter | requireRole + **requireSelfOrAdmin** | general | Kayıtlı filtre tercihleri | userRoutes.ts:147 |
| PUT /api/mentors/:mentorId/filter | requireRole + **requireSelfOrAdmin** | general | Filtre tercihlerini yazar | userRoutes.ts:155 |
| POST /api/users/me/orientation-completed | requireRole(MENTI) | general | Oryantasyon kilidini kaldırır | userRoutes.ts:167 |
| POST /api/users/:id/anonymize | requireRole(ADMIN) + controller ADMIN teyidi | general | **GERİ ALINAMAZ** anonimleştirme | userRoutes.ts:177 |
| DELETE /api/users/:id/hard-delete | requireRole(ADMIN) + controller ADMIN teyidi | general | "Silme" → anonimleştirmeye delege | userRoutes.ts:182 |
| GET /api/users/:id/export | requireAuth + controller self/admin (`gdprController.ts:63-67`) | general | **Ağır çok-tablolu KVKK export** | userRoutes.ts:187 |
| GET /api/me/data-export | requireAuth (userId token'dan) | general + **data-export 5/dk/userId** | Kendi verisini indirir | userRoutes.ts:197 |
| POST /api/me/delete-account | requireAuth (userId token'dan) | general + **account-delete 5/dk/userId** | Kendi hesabını kapatır (e-posta teyitli) | userRoutes.ts:203 |

#### 11) jobListingRoutes.ts → `/api/job-listings` (4 uç) — `requireTenant` (:12)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| GET /api/job-listings | requireAuth | general | İlan listesi (tenant-private) | jobListingRoutes.ts:15 |
| POST /api/job-listings | requireRole(ADMIN) | general | İlan oluşturur | jobListingRoutes.ts:18 |
| GET /api/job-listings/:id | requireAuth | general | İlan detayı (`where` tenantId'li) | jobListingRoutes.ts:21 |
| PATCH /api/job-listings/:id | requireRole(ADMIN) | general | İlan günceller | jobListingRoutes.ts:24 |

#### 12) meetingRoutes.ts → `/api/meetings` (17 uç) — `requireTenant` (:29)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| POST /api/meetings/availability | requireRole(MENTOR) | general | Mentör müsaitlik blokları | meetingRoutes.ts:33 |
| GET /api/meetings/availability | requireAuth | general | Bir mentörün müsaitliği | meetingRoutes.ts:39 |
| POST /api/meetings/book | requireRole(MENTI) | general | Çakışma kontrollü randevu; **mail gönderir** | meetingRoutes.ts:47 |
| GET /api/meetings/active | requireAuth | general | Aktif görüşmeler (frontend **poller**) | meetingRoutes.ts:53 |
| POST /api/meetings/:meetingId/feedback-prompted | requireAuth | general | Feedback kartı gösterildi işareti | meetingRoutes.ts:59 |
| POST /api/meetings | requireRole(ADMIN,MENTI) | general | Basit toplantı talebi | meetingRoutes.ts:67 |
| GET /api/meetings | requireAuth | general | Görüşme listesi | meetingRoutes.ts:73 |
| PATCH /api/meetings/:id | requireRole(ADMIN,MENTOR) | general | Durum günceller | meetingRoutes.ts:79 |
| POST /api/meetings/:meetingId/feedback | requireRole(ADMIN,MENTOR,MENTI) | general | Görüşme geri bildirimi | meetingRoutes.ts:86 |
| GET /api/meetings/:meetingId/feedback | requireAuth + controller taraf/admin + **alan kırpma** (`feedbackController.ts:126-153`) | general | Geri bildirim (karşı tarafınki gizli) | meetingRoutes.ts:91 |
| POST /api/meetings/:meetingId/approve | requireRole(MENTOR) | general | Talebi onaylar; **mail gönderir** | meetingRoutes.ts:99 |
| POST /api/meetings/:meetingId/reject | requireRole(MENTOR) | general | Talebi reddeder | meetingRoutes.ts:105 |
| POST /api/meetings/:meetingId/check-in | requireAuth | general | Hızlı değerlendirme | meetingRoutes.ts:113 |
| GET /api/meetings/:meetingId/check-ins | requireAuth | general | Check-in özetleri | meetingRoutes.ts:119 |
| GET /api/meetings/pair-signal | requireRole(ADMIN) | general | Çift verimsizlik sinyali | meetingRoutes.ts:125 |
| POST /api/meetings/reminders/send | requireRole(ADMIN) | general | **TOPLU MAIL: her bekleyen görüşme için 2 mail, sınırsız döngü** (`feedbackController.ts:189-203`) | meetingRoutes.ts:132 |
| DELETE /api/meetings/orientation-lock/:userId | requireRole(ADMIN) | general | Oryantasyon kilidini açar | meetingRoutes.ts:137 |

#### 13) feedbackLogRoutes.ts → `/api/feedback-logs` (4 uç) — `requireTenant` (:13)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| POST /api/feedback-logs | requireRole(ADMIN,MENTOR) | general | ML geri bildirim kaydı | feedbackLogRoutes.ts:17 |
| GET /api/feedback-logs | requireAuth | general | Log listesi (tenant filtreli) | feedbackLogRoutes.ts:20 |
| GET /api/feedback-logs/combination-scores | requireRole(ADMIN) | general | ML kombinasyon skorları | feedbackLogRoutes.ts:23 |
| GET /api/feedback-logs/:id | requireAuth + controller rol/sahiplik (`feedbackLogController.ts:158-159`) | general | Tek log | feedbackLogRoutes.ts:30 |

#### 14) clubRoutes.ts → `/api/clubs` (7 uç) — `requireTenant` (:15)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| GET /api/clubs | requireAuth | general | Kulüp listesi | clubRoutes.ts:20 |
| POST /api/clubs | requireRole(ADMIN) | general | Kulüp oluşturur | clubRoutes.ts:23 |
| GET /api/clubs/:id | requireAuth | general | Kulüp detayı (`where` tenantId'li) | clubRoutes.ts:26 |
| PATCH /api/clubs/:id | requireRole(ADMIN) | general | Kulüp günceller | clubRoutes.ts:29 |
| GET /api/clubs/:id/members | requireAuth | general | Kulüp üyeleri | clubRoutes.ts:34 |
| POST /api/clubs/:id/members | requireRole(ADMIN) | general | Üye ekler | clubRoutes.ts:37 |
| DELETE /api/clubs/:id/members/:userId | requireRole(ADMIN) | general | Üye çıkarır | clubRoutes.ts:40 |

#### 15) systemLogRoutes.ts → `/api/system-logs` (1 uç)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| GET /api/system-logs | platformAuth (`:9`) | general | Sistem logları (tenant-üstü) | systemLogRoutes.ts:12 |

#### 16) questionRoutes.ts → `/api/questions` (9 uç) — `requireTenant` (:28)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| GET /api/questions | requireAuth | general | Soru listesi + pool meta | questionRoutes.ts:33 |
| POST /api/questions | requireRole(ADMIN) | general | Soru ekler | questionRoutes.ts:36 |
| POST /api/questions/respond | requireAuth | general | **Toplu** yanıt gönderimi | questionRoutes.ts:44 |
| GET /api/questions/my-responses | requireAuth | general | Kendi ilerleme durumu | questionRoutes.ts:47 |
| PATCH /api/questions/:questionId | requireRole(ADMIN) | general | Soru günceller | questionRoutes.ts:52 |
| DELETE /api/questions/:questionId | requireRole(ADMIN) | general | Tenant sorusunu siler | questionRoutes.ts:55 |
| POST /api/questions/:questionId/hide | requireRole(ADMIN) | general | Global soruyu gizler | questionRoutes.ts:58 |
| DELETE /api/questions/:questionId/hide | requireRole(ADMIN) | general | Gizlemeyi kaldırır | questionRoutes.ts:61 |
| POST /api/questions/:questionId/respond | requireAuth | general | Tek soru yanıtı; **mail gönderebilir** (`questionController.ts:32` test-tamamlandı bildirimi) | questionRoutes.ts:68 |

#### 17) analyticsRoutes.ts → `/api/analytics` (1 uç) — `requireTenant` (:7)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| GET /api/analytics/:userId | requireAuth + **requireSelfOrAdmin('userId')** | general | DISC vektöründen türetilmiş profil (PII) | analyticsRoutes.ts:12 |

#### 18) learningJourneyAdminRoutes.ts → `/api/admin/learning-journey` (8 uç) — `requireTenant`(:25) + `requireRole('ADMIN')`(:26)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| GET /api/admin/learning-journey/stages | ADMIN | general | Aşama listesi | :29 |
| POST /api/admin/learning-journey/stages | ADMIN | general | Aşama oluşturur | :30 |
| POST /api/admin/learning-journey/stages/reorder | ADMIN | general | Sıralar | :31 |
| PATCH /api/admin/learning-journey/stages/:stageId | ADMIN | general | Aşama günceller | :34 |
| DELETE /api/admin/learning-journey/stages/:stageId | ADMIN | general | Aşama siler | :35 |
| POST /api/admin/learning-journey/stages/:stageId/customize | ADMIN | general | Aşamayı özelleştirir | :36 |
| POST /api/admin/learning-journey/stages/:stageId/hide | ADMIN | general | Global aşamayı gizler | :37 |
| DELETE /api/admin/learning-journey/stages/:stageId/hide | ADMIN | general | Gizlemeyi kaldırır | :38 |

#### 19) adminRoutes.ts → `/api/admin` (28 uç) — `requireTenant`(:39) + `requireRole('ADMIN')`(:40)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| GET /api/admin/kpi | ADMIN | general | 8 paralel sayım/groupBy (k-anon YOK — C.5-2) | adminRoutes.ts:43 |
| GET /api/admin/health-metrics | ADMIN | general | Mentörsüz/ölü/pasif + **kişi drill-down (e-posta+ad okur)** | adminRoutes.ts:45 |
| GET /api/admin/users | ADMIN | general | PENDING dahil kullanıcı listesi | adminRoutes.ts:48 |
| GET /api/admin/matches | ADMIN | general | Eşleşme paneli | adminRoutes.ts:51 |
| GET /api/admin/mentors/certification-results | ADMIN | general | Sertifika sonuçları | adminRoutes.ts:52 |
| POST /api/admin/users/:id/approve | ADMIN | general | Üye onaylar; **mail gönderir** | adminRoutes.ts:53 |
| POST /api/admin/users/:id/reject | ADMIN | general | Üye reddeder | adminRoutes.ts:54 |
| POST /api/admin/users/:id/request-correction | ADMIN | general | Düzeltme ister | adminRoutes.ts:55 |
| POST /api/admin/users/:id/rematch | ADMIN | general | Yeniden eşleştirme tetikler (ağır) | adminRoutes.ts:56 |
| POST /api/admin/users/:id/nudge | ADMIN | general + **24 saat/hedef cooldown** (`adminController.ts:201`) | **Mail gönderir** (dürtme) | adminRoutes.ts:58 |
| GET /api/admin/users/:id/coaching-suggestions | ADMIN | general | Kural bazlı öneriler | adminRoutes.ts:60 |
| GET /api/admin/tags/pending | ADMIN | general | Bekleyen etiketler | adminRoutes.ts:63 |
| POST /api/admin/tags/:id/approve | ADMIN | general | Etiket onaylar | adminRoutes.ts:64 |
| POST /api/admin/tags/:id/merge | ADMIN | general | Etiket birleştirir | adminRoutes.ts:65 |
| POST /api/admin/tags/:id/reject | ADMIN | general | Etiket reddeder | adminRoutes.ts:66 |
| POST /api/admin/visibility-optin/:optInId/confirm | ADMIN | general | Double opt-in onayı | adminRoutes.ts:69 |
| GET /api/admin/algorithm-tuner/pending | ADMIN | general | Bekleyen ayar önerileri | adminRoutes.ts:72 |
| GET /api/admin/algorithm-tuner/weights | ADMIN | general | Mevcut ağırlıklar | adminRoutes.ts:73 |
| PUT /api/admin/algorithm-tuner/weights | ADMIN | general | Ağırlıkları yazar (audit'li) | adminRoutes.ts:75 |
| POST /api/admin/algorithm-tuner/approve | ADMIN | general | Öneriyi onaylar | adminRoutes.ts:76 |
| POST /api/admin/algorithm-tuner/reject | ADMIN | general | Öneriyi reddeder | adminRoutes.ts:77 |
| POST /api/admin/cron/run-tuning | ADMIN | general | **Cron'u elle tetikler (ağır batch)** | adminRoutes.ts:80 |
| POST /api/admin/cron/run-purge | ADMIN | general | **Veri imha cron'unu elle tetikler (yıkıcı)** | adminRoutes.ts:81 |
| GET /api/admin/reports | ADMIN | general | Kurum şikayetleri | adminRoutes.ts:84 |
| PATCH /api/admin/reports/:id | ADMIN | general | Şikayeti karara bağlar | adminRoutes.ts:85 |
| GET /api/admin/managers | ADMIN | general | Admin listesi | adminRoutes.ts:88 |
| POST /api/admin/users/:id/promote-admin | ADMIN | general | **Yetki yükseltme** | adminRoutes.ts:89 |
| POST /api/admin/users/:id/demote-admin | ADMIN | general | Yetki düşürme | adminRoutes.ts:90 |

#### 20) sjtScoringRoutes.ts → `/api/scoring` (8 uç) — `requireTenant` (:16)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| POST /api/scoring/compute-profile | requireAuth + controller self/admin (`sjtScoringController.ts:61-65`) | general | **Ağır profil hesabı + DB yazar** | sjtScoringRoutes.ts:19 |
| POST /api/scoring/rank-mentors | requireAuth | general | **Ağır sıralama hesabı** | sjtScoringRoutes.ts:26 |
| POST /api/scoring/feedback | requireRole(MENTOR,MENTI) | general | Skorlama geri bildirimi | sjtScoringRoutes.ts:33 |
| GET /api/scoring/certification/questions | requireRole(MENTOR) | general | Sertifika senaryoları | sjtScoringRoutes.ts:40 |
| POST /api/scoring/certification/answer | requireRole(MENTOR) | general | Seçim sonrası açıklama | sjtScoringRoutes.ts:47 |
| POST /api/scoring/certify | requireRole(MENTOR) | general | Sertifika sonucunu değerlendirir | sjtScoringRoutes.ts:54 |
| GET /api/scoring/certification/topics | requireRole(ADMIN) | general | Konu aç/kapat listesi | sjtScoringRoutes.ts:61 |
| PATCH /api/scoring/certification/topics | requireRole(ADMIN) | general | Konu aç/kapat | sjtScoringRoutes.ts:68 |

#### 21) agreementRoutes.ts → `/api/agreements` (5 uç) — `requireTenant` (:13)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| GET /api/agreements/active | requireAuth | general | Aktif anlaşma | agreementRoutes.ts:16 |
| POST /api/agreements | requireRole(ADMIN,MENTOR,MENTI) + controller taraf kontrolü (`agreementController.ts:50`) | general | Anlaşma taslağı | agreementRoutes.ts:19 |
| POST /api/agreements/:id/confirm | requireAuth + controller taraf kontrolü (`:109`) + tenantId (`:100`) | general | Taraf onayı | agreementRoutes.ts:22 |
| POST /api/agreements/:id/renew | requireAuth + controller (`:162`) + tenantId (`:155`) | general | Yenileme onayı | agreementRoutes.ts:25 |
| POST /api/agreements/:id/end | requireAuth + controller (`:189`) + tenantId (`:182`) | general | Anlaşmayı bitirir | agreementRoutes.ts:28 |

#### 22) conversationRoutes.ts → `/api/conversations` (6 uç) — `requireTenant` (:14)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| GET /api/conversations/unread-count | requireAuth | general | Okunmamış toplamı (çan rozeti, **poller**) | conversationRoutes.ts:18 |
| GET /api/conversations | requireAuth | general | Inbox — N+1 sorgu (her konuşma için 2 ek sorgu, `conversationController.ts:236-261`) | conversationRoutes.ts:20 |
| POST /api/conversations | requireRole(MENTI) | general | Konuşma başlatır | conversationRoutes.ts:22 |
| GET /api/conversations/:id/messages | requireAuth + controller `canAccess` (`:279`) | general | Thread | conversationRoutes.ts:24 |
| POST /api/conversations/:id/messages | requireAuth + controller `sideOf` (`:199-202`) | general | Mesaj gönderir; **mail gönderebilir** (`:205`) | conversationRoutes.ts:26 |
| POST /api/conversations/:id/read | requireAuth + controller `sideOf` (`:310`) | general | Okundu işaretler | conversationRoutes.ts:28 |

#### 23) learningJourneyRoutes.ts → `/api/learning-journey` (4 uç) — `requireTenant` (:22)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| GET /api/learning-journey/stages | requireRole(MENTOR,MENTI) | general | Role göre aşamalar | learningJourneyRoutes.ts:28 |
| GET /api/learning-journey/status | requireRole(MENTOR,MENTI) | general | Tamamlanma durumu | learningJourneyRoutes.ts:31 |
| POST /api/learning-journey/complete | requireRole(MENTOR,MENTI) | general | Yolculuğu tamamlar | learningJourneyRoutes.ts:34 |
| POST /api/learning-journey/stages/:stageId/select | requireRole(MENTOR,MENTI) | general | Seçim → outcome | learningJourneyRoutes.ts:37 |

#### 24) server.ts satır-içi uçlar (2 uç)

| Metod + tam yol | Auth | Rate limit | Ne yapıyor | dosya:satır |
|---|---|---|---|---|
| GET /health | **YOK (public, kasıtlı)** | **YOK** (`/api` dışı) | ok/env/ts/version/uptime döner | server.ts:53 |
| POST /api/tags/suggest | **`requireTenant` YOK → her zaman 401** | general (mükerrer) | (işlevsiz — bkz. C.1-a-1) | server.ts:133 |

---

### C.2 — ÜÇ GRUP: KORUMASIZ / ZAYIF KORUMALI UÇLAR

Sınıflandırma **C.1-d-1 ve C.1-d-2 varsayımıyla** yapılmıştır: `generalRateLimiter` atlatılabilir, `req.ip` üretimde güvenilmez. Yani gerçekte "hiçbir işe yarar limiti olmayan" uç sayısı yüksektir.

#### 🔴 KRİTİK — 17 uç

| # | Uç | Gerekçe (tek cümle) | dosya:satır |
|---|---|---|---|
| 1 | POST /api/auth/forgot-password | Public + **her istekte kurbanın adresine mail gönderiyor** → mail-bomb; tek savunma IP limiti (5/dk) ki vekil arkasında anlamsız. | authRoutes.ts:35 |
| 2 | POST /api/auth/register | Public + mevcut e-postaya "zaten kayıtlısınız" maili gönderiyor (`authController.ts:179`) → adres doğrulama + mail-bomb; bcrypt 12 tur CPU maliyeti de var. | authRoutes.ts:21 |
| 3 | POST /api/tenants/self-serve/register | Public + **her çağrıda kalıcı Tenant + ADMIN User + membership + 2 rıza + refreshToken yazıyor** (`selfServeController.ts:276-338`) → DB kirletme, 5/dk/IP tek savunma. | selfServeRoutes.ts:25 |
| 4 | POST /api/suspicion-reports | Public + doğrudan DB'ye serbest metin (2000 char) yazıyor → şikayet kuyruğu doldurma. | suspicionRoutes.ts:9 |
| 5 | POST /api/auth/reset-password | Public + token brute-force yüzeyi + DB transaction (şifre + token sil + tüm oturum sil). | authRoutes.ts:39 |
| 6 | POST /api/auth/login | Public + bcrypt doğrulaması (CPU) + credential-stuffing hedefi. | authRoutes.ts:25 |
| 7 | POST /api/auth/reapply | Public + şifre doğrulaması içeriyor (bcrypt) ama sadece `loginRateLimiter` kovasını login ile **paylaşıyor** → login limiti tüketilebilir. | authRoutes.ts:46 |
| 8 | POST /api/auth/refresh | Public, **kendi limitçisi YOK**, her çağrıda DB okuma + silme + iki yazma (token rotasyonu). | authRoutes.ts:28 |
| 9 | GET /api/auth/:provider/callback | Public, **kendi limitçisi YOK**, provider'a dış HTTP çağrısı yapıp kullanıcı oluşturabiliyor. | authRoutes.ts:56 |
| 10 | GET /api/auth/:provider | Public, **kendi limitçisi YOK**, her çağrıda OAuth state üretimi. | authRoutes.ts:55 |
| 11 | POST /api/auth/logout | Public, limitçisi yok, `deleteMany` ile DB yazımı tetikliyor. | authRoutes.ts:31 |
| 12 | GET /api/tenants/unsubscribe | Public, **kendi limitçisi YOK**, geçerli token'da **DB yazıyor**; token numaralandırma yüzeyi. | selfServeRoutes.ts:38 |
| 13 | POST /api/platform/logout | Public, limitçisi yok (platformAuth **öncesinde** tanımlı, `:35` < `:39`). | platformRoutes.ts:35 |
| 14 | POST /api/meetings/reminders/send | Auth'lu (ADMIN) ama **sınırsız döngüde görüşme başına 2 mail** gönderiyor (`feedbackController.ts:189-203`), hiçbir batch/cooldown yok → tek admin tüm kurumu spam'leyebilir. | meetingRoutes.ts:132 |
| 15 | POST /api/admin/cron/run-purge | Auth'lu (ADMIN) ama **veri imha cron'unu** elle tetikliyor; geri alınamaz, limit yok. | adminRoutes.ts:81 |
| 16 | POST /api/admin/cron/run-tuning | Auth'lu (ADMIN) ama ağır batch hesaplamayı elle tetikliyor; limit yok. | adminRoutes.ts:80 |
| 17 | GET /health | Public, **`/api` dışı olduğu için HİÇBİR limitçiye tabi değil**; `uptime`/`version`/`env` sızdırıyor. | server.ts:53 |

#### 🟡 ORTA — 21 uç

| # | Uç | Gerekçe | dosya:satır |
|---|---|---|---|
| 1 | GET /api/tenants/self-serve/check-slug | Public slug numaralandırma — hangi kurumların kayıtlı olduğu 30/dk/IP ile taranabilir. | selfServeRoutes.ts:23 |
| 2 | GET /api/invitations/:token/join | Public; geçerli token'da kurum adı/logo/plan sızdırıyor, 20/dk/IP. | invitationRoutes.ts:13 |
| 3 | GET /api/mentors/:mentorId/candidates | Auth'lu ağır skorlama (tüm menti havuzu + filtre + DISC matrisi), limitsiz tekrar edilebilir. | userRoutes.ts:70 |
| 4 | GET /api/mentis/:mentiId/mentor-matches | Aynı — ağır sıralama, limitsiz. | userRoutes.ts:81 |
| 5 | POST /api/scoring/rank-mentors | Ağır sıralama hesabı, kendi limitçisi yok. | sjtScoringRoutes.ts:26 |
| 6 | POST /api/scoring/compute-profile | Ağır hesap + DB yazımı, limitçisi yok. | sjtScoringRoutes.ts:19 |
| 7 | GET /api/users/:id/export | **Çok-tablolu ağır KVKK export**; `/me/data-export` 5/dk ile korunurken bu ikiz uçta limit YOK. | userRoutes.ts:187 |
| 8 | GET /api/conversations | **N+1**: her konuşma için ayrı `count` + `findFirst` (`conversationController.ts:240,247`), limitsiz. | conversationRoutes.ts:20 |
| 9 | GET /api/conversations/unread-count | Frontend poller'ı; limitsiz çağrılabilir. | conversationRoutes.ts:18 |
| 10 | GET /api/meetings/active | Frontend poller'ı (`MeetingProvider`); limitsiz. | meetingRoutes.ts:53 |
| 11 | POST /api/conversations/:id/messages | Mesaj başına **mail tetikleyebiliyor** (`conversationController.ts:205`); cooldown yalnız "alıcı güncel mi" mantığında. | conversationRoutes.ts:26 |
| 12 | POST /api/meetings/book | Randevu + mail; limitsiz. | meetingRoutes.ts:47 |
| 13 | GET /api/users | Toplu peer okuma/enumeration (sayfalı, ama sayfa sayısı sınırsız). | userRoutes.ts:27 |
| 14 | GET /api/admin/users | ADMIN toplu kullanıcı okuma (PENDING dahil, PII'li). | adminRoutes.ts:48 |
| 15 | GET /api/admin/health-metrics | ADMIN drill-down **e-posta + ad okuyor** (`adminController.ts:188`). | adminRoutes.ts:45 |
| 16 | POST /api/questions/respond | Toplu yanıt gönderimi, boyut sınırı yalnız global 1 MB. | questionRoutes.ts:44 |
| 17 | POST /api/questions/:questionId/respond | Mail tetikleyebiliyor (test tamamlandı bildirimi). | questionRoutes.ts:68 |
| 18 | PATCH /api/users/:id/self-profile | 50 anahtar sınırı var ama **değer boyutu sınırsız** (yalnız global 1 MB); JSON merge ile kalıcı şişirme. | userRoutes.ts:118 |
| 19 | POST /api/users/:id/report | Şikayet yazımı; tekrar engeli var ama **farklı hedeflere sınırsız** şikayet açılabilir. | userRoutes.ts:105 |
| 20 | POST /api/admin/users/:id/rematch | Ağır yeniden-eşleştirme, limitsiz. | adminRoutes.ts:56 |
| 21 | POST /api/tags/suggest | Fail-closed ölü uç (C.1-a-1); düzeltilirse public yazma yüzeyi olur. | server.ts:133 |

#### 🟢 DÜŞÜK — 152 uç

Kalan **190 − 17 − 21 = 152** uç: auth'lu, hafif okuma/yazma, kötüye kullanım değeri düşük. Örnekler: `GET /api/clubs/:id`, `GET /api/job-listings`, `GET /api/learning-journey/status`, `PATCH /api/questions/:questionId`, `GET /api/agreements/active`, tüm `platformRead` korumalı `/api/platform/*` okumaları, `learningJourneyAdmin` CRUD'ları.

**Özet sayı: 🔴 17 · 🟡 21 · 🟢 152 · TOPLAM 190.**

---

### C.3 — PUBLIC (AUTH'SUZ) UÇLARIN TAM LİSTESİ

**18 public uç** (17 API ucu + 1 statik dizin servisi).
Tanım: rota zincirinde `requireAuth` / `requireRole` / `requirePlatformAdmin` / `requireTenant`+controller-401 / controller-içi JWT doğrulaması **hiçbiri yok**.

| # | Uç | CLAUDE.md'ye göre KASITLI mı? | Mail gönderiyor mu? | DB'ye yazıyor mu? | Boyut sınırı | Zod | Rate limit |
|---|---|---|---|---|---|---|---|
| 1 | GET /health (server.ts:53) | ✅ health | hayır | hayır | — | yok (girdi yok) | **YOK** |
| 2 | POST /api/auth/register (authRoutes:21) | ✅ register | **EVET** ×2 (admin bildirimi + "zaten kayıtlı") | **EVET** (User + rıza) | 1 MB global | ✅ `RegisterSchema` (`authController.ts:25`) | register 10/dk/IP |
| 3 | POST /api/auth/login (authRoutes:25) | ✅ login | hayır | evet (refreshToken) | 1 MB | ✅ `LoginSchema` (`:41`) | login 10/dk/IP |
| 4 | POST /api/auth/forgot-password (authRoutes:35) | ⚠️ **listede YOK** | **EVET** (reset maili) | **EVET** (token) | 1 MB | ✅ `ForgotPasswordSchema` (`:46`) | pwreset 5/dk/IP |
| 5 | POST /api/auth/reset-password (authRoutes:39) | ⚠️ **listede YOK** | hayır | **EVET** (şifre + token sil + oturum sil) | 1 MB | ✅ `ResetPasswordSchema` (`:50`) | pwreset 5/dk/IP |
| 6 | POST /api/auth/refresh (authRoutes:28) | ⚠️ **listede YOK** | hayır | **EVET** (token rotasyonu) | 1 MB | ❌ **Zod YOK** (cookie'den okur) | **yalnız general** |
| 7 | POST /api/auth/logout (authRoutes:31) | ⚠️ **listede YOK** | hayır | **EVET** (`deleteMany`) | 1 MB | ❌ Zod YOK | **yalnız general** |
| 8 | POST /api/auth/reapply (authRoutes:46) | ⚠️ **listede YOK** | TEYİT GEREK (kod 393-432 okundu, mail çağrısı görülmedi) | **EVET** | 1 MB | ✅ (gövde şeması var) | login 10/dk/IP (paylaşımlı kova) |
| 9 | GET /api/auth/:provider (authRoutes:55) | ⚠️ **listede YOK** | hayır | hayır | — | ✅ `OAuthInitSchema` (`:606`) | **yalnız general** |
| 10 | GET /api/auth/:provider/callback (authRoutes:56) | ⚠️ **listede YOK** | TEYİT GEREK | **EVET** (yeni kullanıcı oluşturabilir) | — | TEYİT GEREK | **yalnız general** |
| 11 | POST /api/platform/auth (platformRoutes:34) | ⚠️ **listede YOK** (login sayılabilir) | hayır | TEYİT GEREK | 1 MB | TEYİT GEREK | platform-auth 10/dk/IP |
| 12 | POST /api/platform/logout (platformRoutes:35) | ⚠️ **listede YOK** | hayır | TEYİT GEREK | 1 MB | ❌ Zod YOK | **yalnız general** |
| 13 | POST /api/suspicion-reports (suspicionRoutes:9) | ✅ suspicion report | hayır | **EVET** | 1 MB + **alan bazlı** (`suspicionController.ts:5-11`: 200/100/100/200/2000) | ✅ | suspicion 5/dk/IP |
| 14 | GET /api/invitations/:token/join (invitationRoutes:13) | ✅ invitation join | hayır | hayır (salt-okuma) | — | ❌ Zod yok (JWT `verify` + `type==='invitation'` guard `:578`) | invite-join 20/dk/IP |
| 15 | GET /api/tenants/self-serve/check-slug (selfServeRoutes:23) | ⚠️ **listede YOK** | hayır | hayır | — | ✅ `SlugQuerySchema` (`:195`, regex+max 50) | check-slug 30/dk/IP |
| 16 | POST /api/tenants/self-serve/register (selfServeRoutes:25) | ⚠️ **listede YOK** | TEYİT GEREK | **EVET (ağır: Tenant+User+membership+2 rıza+token)** | 1 MB + alan bazlı (`:219-235`) | ✅ `SelfServeRegisterSchema` | self-serve-register 5/dk/IP |
| 17 | GET /api/tenants/unsubscribe (selfServeRoutes:38) | ✅ unsubscribe | hayır | **EVET** (`unsubscribedAt`) | — | ❌ Zod yok — elle `token.length < 10` kontrolü (`:702`) | **yalnız general** |
| 18 | `GET /uploads/*` statik (server.ts:67) | ⚠️ **listede YOK** | hayır | hayır | — | — | **YOK** (`/api` dışı) |

#### 🔴 BULGU C.3-1 — CLAUDE.md'nin "kasıtlı public" listesi kodla uyuşmuyor

CLAUDE.md: *"KASITLI public olan endpoint'ler: login, register, health, unsubscribe, invitation join, suspicion report. Bunun DIŞINDA public endpoint YOK."*

**Kod gerçeği: listede olmayan 11 public uç var** (yukarıdaki tabloda ⚠️ işaretliler):
`forgot-password` · `reset-password` · `refresh` · `logout` · `reapply` · `auth/:provider` · `auth/:provider/callback` · `platform/auth` · `platform/logout` · `self-serve/check-slug` · `self-serve/register` (+ `/uploads` statik servisi).

Bunların çoğu savunulabilir (şifre sıfırlama akışı doğası gereği public'tir) **ama belge beyanı yanlıştır** ve bu tür bir beyan, sonraki denetimlerde gerçek bir fazlalığın gözden kaçmasına yol açar. Özellikle vurgulanması gerekenler:
- **`POST /api/tenants/self-serve/register`** — public bir uç **kalıcı kurum + yetkili ADMIN hesabı** yaratıyor; listede hiç geçmiyor.
- **`POST /api/platform/logout`** — platform yüzeyinde, `requirePlatformAdmin` satırından (`:39`) **önce** tanımlanmış (`:35`); konumlandırma bilinçli görünüyor ama belgelenmemiş.
- **`/uploads` statik servisi** — hiçbir auth/limit yok; dosya adları `<userId>-<uuid>` olduğu için tahmin edilemez, ama URL bir kez sızarsa erişim süresiz.

---

### C.4 — DOSYA YÜKLEME DENETİMİ

`src/middleware/avatarUpload.ts` (66 satır) tamamı okundu; `src/services/avatarStorage.ts` ve `src/controllers/avatarController.ts` de incelendi.

| Soru | Cevap | Kanıt |
|---|---|---|
| **Boyut sınırı var mı, kaç?** | ✅ **VAR** — `limits: { fileSize: config.upload.maxBytes, files: 1 }`; varsayılan **5 MB** (`UPLOAD_MAX_BYTES` ile değişir). Aşımda 413 `DOSYA_BUYUK`. | `avatarUpload.ts:20`; `config.ts:115`; `avatarUpload.ts:44-51` |
| **MIME kontrolü?** | ✅ VAR — `ALLOWED_MIME = {image/jpeg, image/png, image/webp}`, `fileFilter` ile reddediyor. | `avatarUpload.ts:16, 21-27` |
| **MIME tek başına sahtelenebilir — biliniyor mu?** | ✅ **EVET, kod bunu açıkça yazıyor**: *"MIME ön-kontrolü ilk savunmadır (istemci spoof edebilir → asıl doğrulama controller'daki magic-byte)"* | `avatarUpload.ts:8-9` |
| **Magic-byte kontrolü?** | ✅ **VAR ve asıl kapı bu** — `detectImageType(file.buffer)` JPEG (`FFD8FF`), PNG (8 bayt imza), WEBP (`RIFF`…`WEBP`) doğruluyor; **SVG bilinçli reddediliyor** (XSS vektörü). Başarısızsa 400. | `avatarStorage.ts:26-48`; `avatarController.ts:32-38` |
| **Uzantı kontrolü?** | ⚠️ Kullanıcı uzantısı **hiç okunmuyor** — bu doğru tasarım; uzantı magic-byte'tan türetiliyor (`kind.ext`). | `avatarController.ts:46` |
| **Dosya adı kullanıcıdan mı geliyor?** | ❌ **HAYIR** — `buildAvatarFilename(userId, ext)` = `<userId>-<randomUUID()>.<ext>`. Orijinal `file.originalname` **hiç kullanılmıyor**. | `avatarStorage.ts:51-53` |
| **Path traversal mümkün mü?** | ❌ **HAYIR** — ad kullanıcı girdisi içermiyor; silme yolunda ayrıca `basename()` + çözülen mutlak yolun upload dizini içinde kaldığının **ikinci kez doğrulaması** var. | `avatarStorage.ts:8-10, 71-80` |
| **Depolama** | `multer.memoryStorage()` — dosya **diske yazılmadan önce** buffer'da doğrulanıyor; ancak 5 MB'lık buffer'lar belleğe alınıyor (eşzamanlı yükleme baskısında bellek maliyeti; 5/dk/kullanıcı limiti bunu hafifletiyor). | `avatarUpload.ts:19` |
| **Nereye yazıyor?** | `config.upload.dir` (`UPLOAD_DIR`, varsayılan `process.cwd()/uploads`) | `avatarStorage.ts:66-69`; `config.ts:113` |
| **Servis ediliyor mu?** | ✅ EVET — `express.static(config.upload.dir)` `/uploads` altında. | `server.ts:67-78` |
| **Doğrudan indirilebilen dosyada XSS/HTML riski?** | 🟢 **Risk düşük, çok katmanlı savunma var:** (a) yalnız 3 raster format magic-byte ile geçiyor, SVG/HTML geçemiyor; (b) `X-Content-Type-Options: nosniff`; (c) `Content-Security-Policy: default-src 'none'; img-src 'self'; sandbox`; (d) `index:false` (dizin listeleme kapalı); (e) `dotfiles:'deny'`. | `server.ts:72-76` |
| **AVATAR_UPLOAD_RPM uygulanıyor mu, hangi route'ta?** | ✅ **EVET** — `POST /api/users/me/avatar`, doğru sırayla: `requireAuth()` → `avatarUploadRateLimiter` → `avatarUploadMiddleware` → controller. Limitçi `req.auth.userId`'ye ihtiyaç duyduğu için `requireAuth`'tan sonra olması **kritik ve doğru**. | `userRoutes.ts:49-55`; `rateLimiter.ts:85-96` |
| **IDOR** | ❌ Yok — path `/users/me/avatar`, hedef `req.auth.userId`'den (`avatarController.ts:41`), `:id` parametresi hiç yok. | `avatarController.ts:40-43` |

#### 🟡 BULGU C.4-1 — Polyglot/gömülü-payload riski artık kalıntı seviyede
Magic-byte doğrulaması yalnız **ilk 12 baytı** okuyor; geçerli JPEG başlığından sonra keyfi veri gömülebilir (ör. JPEG içine gömülü JS). `nosniff` + `sandbox` CSP bunu tarayıcıda etkisizleştiriyor, dolayısıyla **kabul edilebilir kalıntı risk**. Görüntü yeniden-kodlama (re-encode/sanitize) eklenirse sıfırlanır.

#### 🟡 BULGU C.4-2 — Eski dosya temizliği best-effort, disk sızıntısı mümkün
`deleteLocalAvatar` hata yutuyor (`avatarStorage.ts:71-80` yorumu: "Best-effort: dosya yoksa sessizce geçer"). Silme kalıcı olarak başarısız olursa (izin/kilit) disk yavaşça şişer; 5/dk/kullanıcı limiti üst sınırı belirliyor (kullanıcı başına günde ~7 200 × 5 MB teorik tavan).

**Genel değerlendirme C.4: bu, denetimdeki EN İYİ korunan yüzeydir.** Boyut + tip + içerik + ad + yol + servis başlıkları + rate limit — altı katmanın hepsi yerinde.

---

### ⭐ C.5 — "FRONTEND GUARD YETERLİ DEĞİL" DESENİ

#### ARANAN TERİMLER LİSTESİ (KURAL 13 — kapsam denetlenebilsin)

**Tarama alanı:** `/home/user/menti-mentor-v2/frontend/src` (195 dosya, tüm alt dizinler) + `/home/user/menti-mentor/src` (tüm alt dizinler). **Tamamı `-i` harf-duyarsız.**

**32 terim, iki dilli:**
`k-anon` · `k-anonymity` · `kAnon` · `K_ANON` · `anonim` · `anonym` · `anonimleştir` · `anonymize` · `threshold` · `eşik` · `esik` · `minCount` · `min_count` · `MIN_` · `asgari` · `mask` · `maskele` · `redact` · `blur` · `bulanık` · `censor` · `gizle` · `gizli` · `hide` · `canSee` · `görebilir` · `gorebilir` · `visibility` · `görünürlük` · `gorunurluk` · `suppress` · `< 5` / `<5` / `count >= ` / `count > ` / `length < ` biçimindeki sayısal eşik karşılaştırmaları · `isAdmin` · `role === 'ADMIN'` · `role !== 'ADMIN'` · `user?.role` · `aggregate` · `yalnız(ca) admin` / `only admin` · `optIn` / `opt-in` · `mentorVisibilityEnabled`

---

#### ✅ C.5-1 — İDDİA ÇÜRÜDÜ: k-anonimlik frontend-only DEĞİL, backend'de DE var

Göreve verilen "bilinen örnek" (*k-anonimlik yalnız frontend'de*) **kod gerçeğiyle uyuşmuyor.**

- **Frontend eşiği:** `frontend/src/app/(dashboard)/menti/page.tsx:189` — `mentorCountData.count >= 3` (yorum `:190`: "Küçük havuz koruması: eşik altında (<3) sayı gösterme — kimliği daraltabilir")
- **Backend karşılığı: VAR** — `backend/src/controllers/userController.ts:140` → `return res.json(applyKAnonymity(rawCount))`
- **Uygulama:** `backend/src/services/mask.ts:52` `K_ANONYMITY_THRESHOLD = 3`; `mask.ts:70-75` eşik altındaki gerçek sayıyı response'a **hiç koymuyor**, `{count: 0, suppressed: true}` döndürüyor.

**Sonuç: bu uçta çift katmanlı koruma var, eşikler de (3) birebir aynı.** Bu bir bulgu değil, **ZATEN İYİ** örneğidir. (KURAL 15 gereği: kaynak belgedeki iddia yerine kod kazanır.)

---

#### 🟡 BULGU C.5-2 — `applyKAnonymity` YALNIZ TEK UÇTA kullanılıyor; KPI panosunda yok

**Kapsam beyanı:** `applyKAnonymity` · `kAnon` · `K_ANON` · `suppress` terimleri **backend `src/` tamamında** harf-duyarsız tarandı → **tek çağrı noktası**: `userController.ts:140`. Başka hiçbir controller/servis bu fonksiyonu import etmiyor (`userController.ts:10` tek `import`).

Korunmayan toplu yüzeyler:

| Uç | Ne dönüyor | k-anon | Kanıt |
|---|---|---|---|
| GET /api/admin/kpi | `usersByRole` **rol başına ham sayım** + faz başına ortalama NPS + `_count` | ❌ YOK | `adminController.ts:57-61, 77-82` |
| GET /api/admin/health-metrics | mentörsüz/ölü/pasif sayıları **+ kişi listesi (e-posta, ad)** | ❌ YOK | `adminController.ts:188` |
| GET /api/platform/tenants/:id/analytics | `discDistribution`: **DISC tipi başına ham sayım** | ❌ YOK | `platformTenantController.ts:263-273` |

**Frontend'de de suppression yok:** `frontend/src/app/(admin)/admin/kpi/page.tsx:44-49` `Object.entries(data.stats.usersByRole)` ile sayıları **doğrudan basıyor**, hiçbir eşik kontrolü yok. `ProgramHealthSection.tsx:56-57` de `data.deadMatches.count` değerini ham basıyor.

**Riskin somut hâli:** 4 kişilik bir kurumda `usersByRole = {MENTOR: 1, MENTI: 3}` → kurumu tanıyan admin için tek mentörün kimliği kesindir. `discDistribution: [{discType:'D', count:1}]` → o kişinin DISC tipi ifşa olur. CLAUDE.md'nin kendi kuralı bunu yasaklıyor: *"Analytics endpoints (`/api/analytics/*`, `/api/admin/kpi`) must return only aggregate counts… never row-level PII"* — teknik olarak satır döndürmüyor ama n=1 kovada toplam = satırdır.

**Bu bir "frontend-only guard" bulgusu DEĞİL** (frontend'de de koruma yok) — **her iki katmanda da eksik** bir k-anonimlik bulgusudur. Araç (`mask.ts:70`) hazır, uygulanmamış.

---

#### 🟡 BULGU C.5-3 — `mentorVisibilityEnabled` opt-in bayrağı HİÇBİR YERDE zorlanmıyor

**Kapsam beyanı:** `mentorVisibilityEnabled` · `visibilityEnabled` · `optIn` · `opt-in` terimleri **backend `menti-mentor/` tamamı (`*.ts`, `*.prisma`, `*.md`) + frontend `menti-mentor-v2/frontend/src` tamamı (`*.ts`, `*.tsx`)** üzerinde harf-duyarsız tarandı.

Sonuç — `mentorVisibilityEnabled` için **toplam 2 isabet**:
- `prisma/schema.prisma:323` — alan tanımı, `Boolean @default(true)`
- `src/controllers/userController.ts:183` — `USER_FULL_SELECT` içinde okunuyor (yalnız self/admin'e dönüyor)

**Yazan hiçbir kod yok. Okuyup karar veren hiçbir kod yok. Frontend'de 0 isabet.**

`src/services/matching.ts` filtreleri incelendi (`:73, 151-155, 361, 384-387`): `isActive`, `approvalStatus:'APPROVED'`, `memberships.some(...)`, `blockedMentiIds`, `blockedDiscTypes`, `minCompatibilityScore` uygulanıyor — **`mentorVisibilityEnabled` uygulanmıyor.**

**Bulgu türü:** "frontend'de var, backend'de yok" değil; **hiçbir katmanda yok** — şemada duran, hiçbir akışın okumadığı uyuyan bir görünürlük bayrağı. Eğer ürün niyeti "mentör kendini havuzdan çekebilsin" idi, bu özellik **fiilen yok**. ⚠️ TEYİT GEREK: alanın niyeti (CLAUDE.md silme protokolü gereği silme adayı değil; PO kararı gerekir).

---

#### ✅ C.5-4 — Feedback görünürlüğü BACKEND'DE zorlanıyor (ZATEN İYİ)

Görevin özel sorusu: *"kişi hakkında yazılan yorum o kişiye görünüyor mu?"*

**Backend kapısı tam:** `feedbackController.ts:106-153`
- `:116` tenant izolasyonu (`feedback.meeting.tenantId !== req.tenant.tenantId` → 404)
- `:126-128` taraf/admin değilse 403
- `:140-142` **mentör görünümü**: `guidanceScore`, `resourceSharingScore`, `trustScore` (menti→mentör alanları) response'tan **destructure ile çıkarılıyor**
- `:146-152` **menti görünümü**: `preparednessScore`, `proactivityScore`, `engagementScore`, `goalClarityScore`, `keyLearnings`, `specificComments`, tüm `periodic*` alanları çıkarılıyor
- `:134-136` yalnız ADMIN tam kaydı görüyor

**Alan kırpma sunucu tarafında, veri response'a hiç girmiyor.** Frontend'e "gizle" görevi verilmemiş. Örnek desen.

---

#### ✅ C.5-5 — E-posta maskeleme BACKEND'DE yapılıyor (ZATEN İYİ)

`platformTenantController.ts:198` → `emailMasked: maskEmail(m.user.email)` (yorum: *"KVKK: ham e-posta response'a girmez"*).
Frontend (`app/platform/tenants/[id]/_components/MembersTable.tsx:86`) yalnız `m.emailMasked` alanını basıyor — **ham e-postayı hiç almıyor**. `mask.ts:5` de bunu ilke olarak yazıyor: *"Maskeleme BACKEND'de yapılır; ham veri response'a hiç girmez."*

---

#### ✅ C.5-6 — Admin panel guard'ı frontend'de var AMA backend'de de var (ZATEN İYİ)

`frontend/src/app/(admin)/layout.tsx:79` — `if (!isLoading && user && user.role !== 'ADMIN') router.replace('/dashboard')`. Dosyanın kendi yorumu (`:6`) bunu **"KABA bir"** guard olarak nitelendiriyor.
Backend karşılığı **VAR**: `adminRoutes.ts:40` `router.use(requireRole('ADMIN'))` → `/api/admin/*` altındaki **28 ucun tamamı** sunucuda korunuyor. Aynı şekilde `learningJourneyAdminRoutes.ts:26`.
Bu bir bulgu **değil**; doğru uygulanmış "defense in depth".

---

#### ✅ C.5-7 — Öğrenme yolculuğu cevap anahtarı backend'de gizleniyor (ZATEN İYİ)

`frontend/src/lib/api/learningJourney.ts:9` — *"Oyuncuya dönen seçenek — cevap anahtarı (outcome/feedback) gizli."* Tip tanımı, backend'in zaten göndermediğini varsayıyor (frontend'de filtreleme yok). Aynı desen DISC sorularında da var: `onboardingRoutes.ts:27` — *"8 onboarding sorusunu listele (seçenek boyutları gizli)"*.

---

#### ✅ C.5-8 — DISC eşiği frontend'den backend'e TAŞINMIŞ (düzeltilmiş eski bulgu)

`frontend/src/types/discTest.ts:5-11` açıkça anlatıyor: *"CORE_COMPLETION_THRESHOLD sabiti kaldırıldı… Önceki versiyonda `CORE_COMPLETION_THRESHOLD = 20` frontend'de hardcoded'dı… Yeni yaklaşım: Backend `GET /api/questions` yanıtı `meta.coreThreshold` döner."*
Aynı desen sertifikada: `frontend/src/app/(admin)/admin/certification/page.tsx:85` — *"Backend'den gelen tek-kaynak eşik özeti (UI kendi hesaplamaz)"*; `frontend/src/types/certification.ts:47` — *"eşik backend'de hesaplanır, UI sadece gösterir"*.
**Bu proje bu deseni bilinçli olarak düzeltmiş.** Önceki denetimlerin bulgusu kapanmış.

---

#### C.5 SONUÇ

| Aranan desen | Bulgu var mı |
|---|---|
| k-anonimlik yalnız frontend'de | ❌ **HAYIR** — backend'de de var (C.5-1) |
| k-anonimlik hiçbir yerde yok (KPI/analytics) | ✅ **EVET — C.5-2** |
| Görünürlük opt-in bayrağı zorlanmıyor | ✅ **EVET — C.5-3** |
| Feedback görünürlüğü yalnız frontend'de | ❌ HAYIR — backend'de (C.5-4) |
| PII maskeleme yalnız frontend'de | ❌ HAYIR — backend'de (C.5-5) |
| Rol guard'ı yalnız frontend'de | ❌ HAYIR — backend'de (C.5-6) |
| Eşik/cevap anahtarı yalnız frontend'de | ❌ HAYIR — bilinçli olarak backend'e taşınmış (C.5-7, C.5-8) |

**32 terim · 2 repo · 390+ dosya tarandı. Klasik "frontend guard yeterli sanıldı" bulgusu 0 adet.** İki gerçek bulgu (C.5-2, C.5-3) *"hiçbir katmanda yok"* türündedir, *"yalnız frontend'de var"* türünde değil.

---

### C.6 — IDOR TARAMASI + TENANT İZOLASYONU

#### C.6-a — `:id` / `:userId` / `:mentorId` alan uçlarda sahiplik kontrolü

**`requireSelfOrAdmin` kullanan 5 uç (route seviyesinde):**

| Uç | Param | dosya:satır |
|---|---|---|
| GET /api/analytics/:userId | `userId` | analyticsRoutes.ts:12 |
| GET /api/mentis/:mentiId/mentor-matches | `mentiId` | userRoutes.ts:84 |
| GET /api/mentors/:mentorId/dashboard-metrics | `mentorId` | userRoutes.ts:100 |
| GET /api/users/:userId/clubs | `userId` | userRoutes.ts:114 |
| GET+PUT /api/mentors/:mentorId/filter | `mentorId` | userRoutes.ts:152, 161 |

**Middleware yok ama controller içinde eşdeğer kontrol yapan 10 uç (kabul edilebilir, ama kalıp dışı):**

| Uç | Controller kontrolü | dosya:satır |
|---|---|---|
| GET /api/users/:id | self/admin → tam, diğeri minimal DTO | userController.ts:187-191, 203-207 |
| PATCH /api/users/:id/self-profile | `!isSelf && !isAdmin` → 403 | userController.ts:399-404 |
| POST /api/users/:id/temperament-test | `!isSelf && !isAdmin` → 403 | temperamentController.ts:34-39 |
| GET /api/users/:id/export | `!isSelf && !isAdmin` → 403 | gdprController.ts:63-67 |
| GET /api/mentors/:mentorId/candidates | `!isOwner && !isAdmin` → 403 | matchingController.ts:45-48 |
| GET/POST /api/users/:id/adaptive-test/{next,answer,preview} (3 uç) | `!isSelf && !isAdmin` → 403 | adaptiveTestController.ts:21-24, 56-59, 113-116 |
| POST /api/scoring/compute-profile (gövde `userId`) | `!isAdmin && userId !== req.auth.userId` → 403 + rol token'dan zorlanıyor | sjtScoringController.ts:61-65 |
| POST /api/users/:id/anonymize, DELETE /api/users/:id/hard-delete | controller ayrıca ADMIN teyidi | gdprController.ts:30-32, 46-48 |

#### 🔴 BULGU C.6-1 — `POST /api/mentors/:mentorId/visibility-optin` — SAHİPLİK KONTROLÜ YOK (gerçek IDOR)

**Rota:** `userRoutes.ts:89-93`
```ts
router.post(
  '/mentors/:mentorId/visibility-optin',
  requireRole('ADMIN', 'MENTOR'),        // ← requireSelfOrAdmin YOK
  setVisibilityOptIn as unknown as RequestHandler,
);
```

**Controller:** `matchingController.ts:124-190` — tamamı okundu. Yaptığı kontroller:
- `:132` mentör aynı tenant'ta + rolü MENTOR + aktif mi
- `:139-144` self-match engeli (mentor.id === mentiId)
- `:155-159` hedef gerçekten aktif MENTI mi
- `:161-171` cross-tenant shared-pool izni

**Yapmadığı kontrol:** `req.auth.userId === mentorId` karşılaştırması **hiç yok**.

**Etki:** Aynı kurumdaki Mentör A, Mentör B'nin ID'sini yazıp `POST /api/mentors/<B-id>/visibility-optin` çağırabilir ve B adına bir `VisibilityOptIn` kaydını `upsert` edebilir (`:174-186`) — hem **oluşturabilir** hem mevcut kaydın `status` alanını **ezebilir**. `initiatedBy: 'MENTOR'` sabit yazıldığı için denetim izinde saldırgan görünmez, kayıt B'nin kendi eylemi gibi görünür. Mentör ID'leri `GET /api/users?role=MENTOR` (`userRoutes.ts:27`) ile serbestçe numaralandırılabilir.

**Neden bu tutarsız:** Aynı dosyada **komşu** uçlar (`:84` mentor-matches, `:100` dashboard-metrics, `:152`/`:161` filter) `requireSelfOrAdmin` kullanıyor ve yorumlarında (`:158-160`) tam olarak bu senaryo anlatılıyor: *"mentör A, mentör B'nin eşleşme filtresini değiştirip rakibinin aday havuzunu sabote edebilirdi."* Aynı mantık opt-in için **uygulanmamış**. CLAUDE.md'nin kendi kalıbı: *"Yeni `:id`/`:userId` endpoint'inde inline yazma, route'a bunu ekle."*

**Düzeltme kalıbı hazır:** `requireSelfOrAdmin('mentorId')` satırı `userRoutes.ts:91` ile `:92` arasına eklenmeli.

#### 🟡 BULGU C.6-2 — `GET /api/users/:id/export` ikizinden daha zayıf korunuyor
`userRoutes.ts:187-191` — sahiplik kontrolü controller'da var (`gdprController.ts:63-67` ✅), **ama rate limit yok.** Aynı ağır çok-tablolu export'u yapan `/me/data-export` (`userRoutes.ts:197-202`) `dataExportRateLimiter` (5/dk/userId) ile korunuyor. Bir kullanıcı `:id`'ye kendi ID'sini yazarak `/users/:id/export` üzerinden **limitsiz** aynı ağır sorguyu koşturabilir → `dataExportRateLimiter` fiilen atlatılır.

#### C.6-b — Tenant izolasyonu: `where` içinde `tenantId` var mı

**Katman 1 — Prisma RLS extension (`src/db.ts:54-71`):** 15 model tenant-kapsamlı (`db.ts:19-39`), ve **yalnız** `findMany`/`findFirst`/`count`/`aggregate`/`groupBy` operasyonlarına otomatik `tenantId` enjekte ediliyor (`db.ts:44`).

**⚠️ `findUnique` KASITLI olarak kapsam dışı** (`db.ts:41-43`): *"findUnique yalnızca PK/unique alanlar üzerinden çalışır; tenantId enjeksiyonu imza uyumsuzluğuna yol açar."* Bu, `findUnique` kullanan her sorgunun **elle** tenant doğrulaması yapmasını zorunlu kılıyor.

**Katman 2 — `requireTenant` (`tenant.ts:66-77`):** JWT `tenantId` ≠ `X-Tenant-Id` → 403; `TenantMembership.isActive` doğrulaması (`:82-97`).

**`findUnique({ where: { id: ... } })` kullanan 9 çağrı denetlendi:**

| Dosya:satır | Model | Tenant güvencesi | Değerlendirme |
|---|---|---|---|
| `adminController.ts:208` | Tenant | `tenantId` zaten `req.tenant`'tan | ✅ güvenli |
| `adminSettingsController.ts:178, 312, 390` | Tenant | JWT `payload.tenantId === :id` önceden doğrulanmış (`:84`, `:143`) / platformAuth | ✅ güvenli |
| `platformController.ts:287, 307, 378, 388, 433, 518` | Tenant / SuspicionReport / UserReport | `requirePlatformAdmin` — tenant-üstü yetki, izolasyon uygulanmaz | ✅ tasarım gereği |
| `conversationController.ts:194, 272, 305` | Conversation | **tenantId YOK** — ama Conversation/Message `TENANT_SCOPED` listesinde **kasıtlı olarak yok** (`db.ts:34-38`) | ✅ bilinçli, bkz. aşağıda |
| `selfServeController.ts:495, 511, 610, 658, 706` | Tenant / User | slug/token/JWT-eşleşmesi ile korunuyor | ✅ güvenli |

**Conversation istisnası — doğru gerekçelendirilmiş:** `db.ts:34-38` açıklıyor: *"Chat, güvenlik sınırını tenant'a değil KATILIMCIYA dayar: shared-pool'da menti ile mentör farklı tenant'ta olabilir; tenantId RLS filtresi karşı tarafı eler."* Yetki controller'da katılımcı bazlı zorlanıyor: `sendMessage` `:199-202` (`sideOf` → yoksa 404), `getMessages` `:279` (`canAccess`), `markRead` `:310`. Yetkisizde **404 dönüyor** (403 değil) → varlık ifşası engelleniyor. ✅ **ZATEN İYİ.**

**Tenant izolasyonunda tespit edilen eksik: YOK.**
**Kapsam beyanı:** `findUnique({ where: { id:` deseni `src/controllers/` (34 dosya) tamamında tarandı → 9 isabet, dokuzu da yukarıda tek tek denetlendi. `tenantId` içermeyen ve elle doğrulanmayan **0 sorgu** bulundu.

---

### ✅ ZATEN İYİ — kapanmış/doğru uygulanmış kontroller

1. **Rate limitçiler test/dev'de devre dışı DEĞİL** — `NODE_ENV` `src/middleware/` içinde hiç geçmiyor (10 isabetin tamamı denetlendi). Eşikler çağrı anında okunuyor (`rateLimiter.ts:106` vb.) → test izolasyonu limiti kapatmadan sağlanıyor.
2. **Avatar yükleme altı katmanlı** — boyut (5 MB) + tek dosya + MIME ön-filtre + **magic-byte** + SVG reddi + rastgele dosya adı + `basename`+mutlak-yol çift doğrulaması + `nosniff`/CSP-sandbox/`index:false`/`dotfiles:deny` (C.4).
3. **Global gövde boyut sınırı** — `express.json({limit:'1mb'})` (`server.ts:50`).
4. **Global `omit: { user: { password: true } }`** (`db.ts:52`) — `select`siz hiçbir sorgu parola hash'ini response'a taşıyamaz.
5. **Hata mesajları iç detay sızdırmıyor** — `errorHandler.ts:20-24`, stack yalnız sunucu logunda.
6. **requestLogger PII loglamıyor** — yalnız method/url/status/ms/tenantId (`requestLogger.ts:18-27`); `Authorization` loglanmıyor.
7. **Cross-tenant token reddi** — `tenant.ts:66-77`, WARN log + 403.
8. **Aktif üyelik kapısı** — `tenant.ts:82-97`, `findUnique` composite key ile (RLS'in findUnique'i filtrelememesi burada **bilinçli ve doğru** kullanılmış).
9. **Platform token domain ayrımı** — `platformAuth.ts:27` çift kontrol (`isPlatformAdmin` claim **ve** `aud === 'platform'`); tenant token'ı platform ucunda geçerli sayılamaz.
10. **E-posta numaralandırma karşıtı desenler** — `register` var/yok aynı 201 yanıtı (`authController.ts:180-184`); `forgot-password` tek jenerik mesaj (`:522, :550`).
11. **Reset token DB'de SHA-256 hash'li** (`authController.ts:93-98`), refresh token rotasyonlu (`:473-483`), reset sonrası tüm refresh token'lar iptal (`:586`).
12. **Refresh cookie** `httpOnly + sameSite:'strict' + secure(prod)` (`authController.ts:64-71`).
13. **Feedback karşılıklı görünürlük kapısı backend'de** (C.5-4).
14. **PII maskeleme backend'de** (C.5-5), platform derin panel audit'li (`platformTenantController.ts:7-10`).
15. **k-anonimlik mentör sayımında çift katmanlı** (C.5-1), eşikler (3) backend ve frontend'de tutarlı.
16. **Eşik/cevap anahtarı frontend'den backend'e taşınmış** (C.5-7, C.5-8) — eski bulgu kapanmış.
17. **Conversation katılımcı-bazlı yetki, yetkisizde 404** (varlık ifşası engelli).
18. **`nudgeUser` 24 saat/hedef cooldown** (`adminController.ts:200-206`) + self/ADMIN hedef engelleri (`:193-198`).
19. **`createReport` tekrar-şikayet engeli** (`reportController.ts:37-44`) + self-report engeli (`:21-23`).
20. **`/users` ucunda PENDING üye peer havuzunu göremiyor** (`userController.ts:46-57`) + `approvalStatus:'APPROVED'` zorlaması (`:74`).

---

### ⛔ TARANAMADI / TEYİT GEREK

| # | Konu | Neden | Ne gerekir |
|---|---|---|---|
| 1 | Gerçek `.env` ve `.env.test` içeriği | gitignore'da, dosyalar yok | Üretim eşiklerinin gerçek değerleri; `.env.test`'te limit override'ı olup olmadığı |
| 2 | **Üretimdeki `req.ip` değeri** | Kod okunarak belirlenemez | Çalışan ortamda ölçüm — C.1-d-2'nin ciddiyeti buna bağlı |
| 3 | `oauthCallback` (`authController.ts:656-705`) tam davranışı | Yalnız ilk 50 satırı okundu | Kullanıcı oluşturma akışı, Zod doğrulaması, mail gönderip göndermediği |
| 4 | `platformLogin` / `platformLogout` gövdesi | `platformController.ts` okunmadı | Zod doğrulaması, DB yazımı, `PLATFORM_ADMIN_KEY` kullanımı |
| 5 | `auth/reapply` (`authController.ts:393-432`) | Yalnız kısmen görüldü | Mail gönderip göndermediği |
| 6 | `adminController.ts` (39 KB) tam denetimi | Yalnız `getKpiDashboard`, `getHealthMetrics`, `nudgeUser` okundu | Kalan 25 admin ucunun tenant/sahiplik detayı |
| 7 | `meetingController.ts` (25 KB) tam denetimi | Yalnız route seviyesi + mail import'u görüldü | `:meetingId` uçlarında katılımcı kontrolü (`approve`/`reject`/`check-in`) |
| 8 | `onboardingController.ts` (23 KB), `selfServeController.ts:1-39` | Kısmen okundu | `sanitizeTags` sınırları, `recordSignupConsent` |
| 9 | Prisma şeması unique/index yapısı | `schema.prisma` yalnız 2 satırı için grep'lendi | Token alanlarının unique'liği, indeksleme |
| 10 | `tests/` dizini | Kapsam dışı bırakıldı | Hangi güvenlik iddiasının testle korunduğu |
| 11 | `mentorVisibilityEnabled` niyeti | Kod arkeolojisi yapılmadı (git log okunmadı; repo `.git` var ama "is a git repository: false" bildirildi) | PO kararı — CLAUDE.md silme protokolü adım 1 (NİYET) |
| 12 | Route sırası çakışmaları | Elle akıl yürütmeyle denetlendi, koşturulmadı | `/api/tenants` üçlü mount'unun (server.ts:98/102/108) canlı davranışı |

---

### BULGU ÖZETİ (kalem listesi — KURAL 9)

| # | Kalem | Önem | Numara adayı mı | Kanıt |
|---|---|---|---|---|
| C.1-d-1 | `generalRateLimiter` anahtarı doğrulanmamış `X-Tenant-Id` başlığı → global limit atlatılabilir | 🔴 | **evet** | rateLimiter.ts:36 |
| C.1-d-2 | `app.set('trust proxy')` yok → 9 IP-bazlı limitçi vekil arkasında bozuk | 🔴 | **evet** | rateLimiter.ts:52-54; `src/`+Dockerfile taraması 0 sonuç |
| C.6-1 | `POST /api/mentors/:mentorId/visibility-optin` sahiplik kontrolü yok (IDOR) | 🔴 | **evet** | userRoutes.ts:89-93; matchingController.ts:124-190 |
| C.3-1 | CLAUDE.md "kasıtlı public" listesi eksik — 11 belgelenmemiş public uç | 🔴 | **evet** | C.3 tablosu |
| — | `POST /api/meetings/reminders/send` sınırsız toplu mail | 🔴 | **evet** | feedbackController.ts:189-203 |
| C.5-2 | `applyKAnonymity` yalnız 1 uçta; KPI/analytics/health-metrics'te yok | 🟡 | **evet** | mask.ts:70 tek çağrı = userController.ts:140 |
| C.5-3 | `mentorVisibilityEnabled` hiçbir akışta zorlanmıyor (2 isabet, ikisi de pasif) | 🟡 | **evet** | schema.prisma:323; userController.ts:183 |
| C.6-2 | `/users/:id/export` rate limitsiz; `/me/data-export` limitini atlatır | 🟡 | **evet** | userRoutes.ts:187 vs :197 |
| C.1-a-1 | `POST /api/tags/suggest` `requireTenant`sız mount → her zaman 401 (ölü uç) | 🟡 | **evet** | server.ts:133; tagController.ts:57 |
| C.1-b-1 | 13 limitçinin 11'inin env değişkeni `.env.example`'da yok | 🟡 | evet | .env.example:11,13 |
| C.1-b-2 | In-memory sayaç çok-instance'ta ölçeklenmez; saat/gün penceresi ifade edilemiyor | 🟡 | evet | rateLimiter.ts:13, 235-236 |
| C.1-b-3 | Saldırgan-kontrollü anahtarla `counters` Map'i şişirilebilir | 🟡 | evet | rateLimiter.ts:13, 28-33 |
| C.4-1 | Magic-byte yalnız ilk 12 bayt — polyglot kalıntı riski (CSP ile azaltılmış) | 🟡 | hayır | avatarStorage.ts:26-48 |
| C.4-2 | Avatar silme best-effort → disk sızıntısı mümkün | 🟡 | hayır | avatarStorage.ts:71-80 |
| — | `/api/tenants` üçlü mount — path-segment sayısına bağlı kırılgan yönlendirme | 🟡 | hayır | server.ts:98,102,108 |
| — | `superAdminRoutes` `platformReadRateLimiter` taşımıyor (platformRoutes'un aksine) | 🟡 | hayır | superAdminRoutes.ts:12 |
| C.5-1 | Görevdeki "k-anonimlik frontend-only" iddiası **çürüdü** — backend'de de var | ✅ | hayır (kapanış) | userController.ts:140; mask.ts:70 |

---

## 2.D — BÖLÜM D: ORTAM (canlıda neyin açık neyin kapalı olduğunu biliyor muyuz?)

> **Denetim türü:** salt-okuma. Hiçbir dosya değiştirilmedi, yazılmadı, commit edilmedi. `.env.example` yalnızca okundu.
> **Tarih:** 2026-09-20 · **Repolar:** `/home/user/menti-mentor` (backend, git branch `claude/peaceful-hopper-fml62k`), `/home/user/menti-mentor-v2` (çatı + frontend)

---

### KAPSAM BEYANI (tüm bölüm için geçerli)

**Taranan dizinler ve komutlar:**

| Kapsam | Komut | Sonuç |
|---|---|---|
| Backend | `grep -rn "process\.env" src/ scripts/ tests/ prisma/ vitest.config.ts` (`/home/user/menti-mentor`) | **115 eşleşme** — `src/`: 59, `tests/`: 52, `scripts/`: 4, `prisma/`: 0, `vitest.config.ts`: 0 |
| Backend (Prisma) | `grep -n "env(" prisma/schema.prisma` | 1 eşleşme: `prisma/schema.prisma:7` → `env("DATABASE_URL")` |
| Frontend | `grep -rn "process\.env" frontend/ --include=*.ts --include=*.tsx --include=*.js --include=*.mjs` (node_modules hariç) | **11 eşleşme** (4 dosya) |
| NEXT_PUBLIC | `grep -rn "NEXT_PUBLIC" frontend/ docker-compose.yml .github/ .env.compose` | 9 eşleşme |
| LLM terimleri | `grep -rniE "openai\|anthropic\|\bllm\b\|gpt\|claude\|iceBreaker\|matchReason\|llmRetry" src/` | 14 eşleşme (detay D.3) |
| Deploy | `Dockerfile`, `frontend/Dockerfile`, `docker-compose.yml`, `.env.compose`, iki `.github/workflows/ci.yml` — hepsi TAM okundu | — |

**TAM okunan dosyalar:** `src/config.ts` (139 satır), `src/server.ts` (172), `src/services/cronScheduler.ts` (452), `src/services/emailService.ts` (295), `src/services/tenantNotifications.ts` (133), `src/middleware/rateLimiter.ts` (254), `src/middleware/errorHandler.ts` (26), `src/services/tenantCache.ts`, `.env.example` (76), `.env.test.example` (24), `frontend/next.config.mjs` (63), `frontend/Dockerfile` (38), `docker-compose.yml` (101), `.env.compose` (35), backend `ci.yml` (58).

**TARANMADI (aşağıda ayrıca listelenmiştir):** `node_modules/`, `.git/`, derlenmiş `dist/`, `docs/` ve `CLAUDE.md` içerikleri (belge iddiaları kod kanıtı sayılmamıştır), v2 `scripts/`, frontend `src/` içindeki `.env` dışı runtime konfigürasyon.

---

### D.1 — KODDA KULLANILAN TÜM ORTAM DEĞİŞKENLERİ

#### Sayım (BİRİM TANIMI — KURAL 16)

> **Kodda 54 benzersiz ortam değişkeni adı** geçiyor.
> Dağılım: **backend 48** (bunların 46'sı `src/` runtime + `DATABASE_URL` yalnız `prisma/schema.prisma:7` + `TEST_DATABASE_URL` yalnız test) **+ frontend 8** (2'si uygulama kodu: `NEXT_PUBLIC_API_URL`, `TENANT_IMAGE_DOMAINS`; 6'sı e2e/test aracı) **− 2 çakışma** (`DATABASE_URL` ve `NODE_ENV` her iki tarafta).
> **Backend `.env.example`'da 28 aktif satır + 1 yorumlu satır (`SMTP_SECURE`) = 29 değişken anılıyor.**
> **Çatı reposunda `.env.example` YOK**; karşılığı `.env.compose` (14 değişken şablonu) — bu bir compose değişkeni şablonudur, backend env şablonu değildir.
> **Kodda `src/` runtime'da kullanılıp backend `.env.example`'da HİÇ geçmeyen: 18 değişken** (+ `SMTP_SECURE` yalnız yorum satırında = 19'uncu, kısmi).
>
> Not: `npm_package_version` (`src/server.ts:57`) sayıma dahil edilmedi — bu npm'in kendi otomatik değişkenidir, operatörün set edeceği bir ayar değildir.

#### TABLO A — Backend runtime değişkenleri (`src/`)

| değişken | nerede kullanılıyor (dosya:satır) | ne işe yarar | varsayılanı | varsayılanda kalırsa NE OLUR | .env.example'da var mı |
|---|---|---|---|---|---|
| `NODE_ENV` | `config.ts:10,53`; `authController.ts:62`; `selfServeController.ts:16`; `platformController.ts:16`; `cronScheduler.ts:30` | prod/dev/test modu; cookie `secure`, config fail-fast guard'ları | `'development'` (`config.ts:53`); `isProd` false | ⚠️ **KRİTİK** — `secure` cookie KAPALI, `JWT_SECRET`/`PLATFORM_ADMIN_KEY` varsayılan kontrolü ÇALIŞMAZ (bkz. D.4) | ❌ HAYIR |
| `PORT` | `config.ts:52` → `server.ts:139` | HTTP dinleme portu | `3000` | Sorun yok; compose `PORT: 3000` verir (`docker-compose.yml:49`) | ❌ HAYIR |
| `DATABASE_URL` | `prisma/schema.prisma:7`; `scripts/*.mjs`; `tests/helpers/db.ts:12` | Postgres bağlantısı | yok (zorunlu) | Prisma açılışta hata verir → uygulama ayağa kalkmaz (fail-fast, iyi) | ✅ EVET (satır 1) |
| `JWT_SECRET` | `config.ts:17,19` | JWT imza anahtarı | ⚠️ **`'dev-secret-change-in-production-min-32-chars!!'`** (`config.ts:16`) | prod'da throw (`config.ts:20`); **prod DIŞINDA sabit, kamuya açık secret ile token üretir** (bkz. D.4) | ✅ EVET (satır 4) |
| `JWT_EXPIRES_IN` | `config.ts:58` → `middleware/jwtAuth.ts:25` | Access token ömrü | `'1h'` | 1 saat makul; çalınan token 1 saat geçerli | ❌ HAYIR |
| `PLATFORM_ADMIN_KEY` | `config.ts:24,26` → `platformController.ts:38` | Platform paneli parolası | ⚠️ `'platform-dev-key-change-in-production'` (`config.ts:23`) | prod'da throw (`config.ts:27`); prod dışında tahmin edilebilir | ✅ EVET (satır 5) |
| `PLATFORM_ADMIN_EMAIL` | `config.ts:32,39` → `platformController.ts:37` | Platform girişi 2. faktör (e-posta) | ⚠️ `'admin@platform.local'` (`config.ts:31`) | **prod'da THROW YOK — yalnız `console.warn`** (`config.ts:39-45`). İkinci faktör tahmin edilebilir | ✅ EVET (satır 8) |
| `DEFAULT_TENANT_ID` | `config.ts:12,54` → `middleware/tenant.ts:27` | `X-Tenant-Id` yoksa fallback tenant | `undefined` | prod'da SET EDİLİRSE throw (`config.ts:13`) — doğru tasarım | ✅ EVET (satır 16, boş) |
| `ALLOWED_ORIGINS` | `server.ts:48` → `server.ts:49` (cors) | CORS izinli origin listesi | `'http://localhost:3001,http://127.0.0.1:3001'` | Canlıda set edilmezse **frontend'den gelen credentialed istekler CORS'ta reddedilir** (site çalışmaz) | ✅ EVET (satır 43) |
| `FRONTEND_URL` | `config.ts:49,92`; `emailService.ts:142,182,218,221` | Şifre sıfırlama/davet/onboarding link tabanı | `'http://localhost:3001'` | ⚠️ Şifre sıfırlama maili `http://localhost:3001/reset-password?...` linki ile gider → **kullanıcı linke tıklayınca hiçbir şey açılmaz** | ✅ EVET (satır 36) |
| `BACKEND_URL` | `config.ts:49`; `emailService.ts:221` | Backend route linkleri (unsubscribe) + avatar public base | `FRONTEND_URL` → `'http://localhost:3000'` | KVKK zorunlu unsubscribe linki bozuk olur (`emailService.ts:223`) | ✅ EVET (satır 40) |
| `SMTP_HOST` | `config.ts:73` → `emailService.ts:9,38` | SMTP sunucu adresi | `''` (boş) | ⚠️ **TÜM E-POSTALAR SESSİZCE ATILIR** (bkz. D.2c) | ✅ EVET (satır 25) |
| `SMTP_PORT` | `config.ts:74,78` | SMTP portu + `smtpSecure` türetimi | `465` | 465 → `secure=true` (implicit TLS); makul | ✅ EVET (satır 26) |
| `SMTP_SECURE` | `config.ts:76,77,78` | TLS modu override | yok → `SMTP_PORT===465` ise `true` | Türetim doğru; 587 kullanılırsa otomatik `false` | 🟡 **YALNIZ YORUM SATIRINDA** (satır 31-32: `# SMTP_SECURE="true"`) |
| `SMTP_USER` | `config.ts:79` → `emailService.ts:13,38` | SMTP kullanıcı | `''` | Boşsa e-posta sessizce atılır (`emailService.ts:38-41`) | ✅ EVET (satır 27) |
| `SMTP_PASS` | `config.ts:80` → `emailService.ts:14,38` | SMTP parola/API key | `''` | Boşsa e-posta sessizce atılır | ✅ EVET (satır 28) |
| `SMTP_FROM` | `config.ts:83` → `emailService.ts:44` | Gönderen adresi | `'noreply@sivilkapasite.org'` | SPF/DKIM doğrulanmamış domainse mail spam'e düşer / bounce | ✅ EVET (satır 30) |
| `TENANT_NOTIFICATIONS_ENABLED` | `config.ts:88` → `tenantNotifications.ts:116` | Kurum (STK) başvuru bildirimi gönderim bayrağı | **`false`** (`'true'` string eşitliği) | ⚠️ Kurum onay/red/düzeltme mailleri **hiç gitmez, yalnız log** (bkz. D.2a) | ❌ HAYIR |
| `CRON_ENABLED` | `cronScheduler.ts:31` | Zamanlanmış işler ana şalteri | **AÇIK** (`!== 'false'`) | Varsayılan AÇIK → sorun değil; `'false'` set edilirse 8 iş durur (bkz. D.2b) | ❌ HAYIR |
| `RATE_LIMIT_RPM` | `rateLimiter.ts:10` → `server.ts:81` (`/api/*`) | Genel tenant-bazlı istek limiti | `100` istek/dk/tenant | Tek tenant'ın tüm kullanıcıları 100/dk paylaşır — büyük STK'da **meşru kullanıcı 429 yiyebilir** | ❌ HAYIR |
| `PLATFORM_AUTH_RPM` | `rateLimiter.ts:49` | Platform login brute-force limiti (IP) | `10`/dk/IP | Makul | ❌ HAYIR |
| `PLATFORM_READ_RPM` | `rateLimiter.ts:50` | Platform panel okuma limiti (IP) | `120`/dk/IP | Makul | ❌ HAYIR |
| `AVATAR_UPLOAD_RPM` | `rateLimiter.ts:82` | Avatar yükleme limiti (kullanıcı) | `5`/dk | Makul | ❌ HAYIR |
| `LOGIN_RATE_RPM` | `rateLimiter.ts:106` | Kullanıcı login brute-force (IP) | `10`/dk/IP | Makul | ✅ EVET (satır 11) |
| `PASSWORD_RESET_RATE_RPM` | `rateLimiter.ts:124` | forgot/reset limiti (IP) | `5`/dk/IP | Makul | ✅ EVET (satır 13) |
| `REGISTER_RATE_RPM` | `rateLimiter.ts:143` | Kayıt spam limiti (IP) | `10`/dk/IP | Makul | ❌ HAYIR |
| `SUSPICION_RATE_RPM` | `rateLimiter.ts:156` | Şüphe bildirimi limiti (IP) | `5`/dk/IP | Makul | ❌ HAYIR |
| `INVITE_JOIN_RATE_RPM` | `rateLimiter.ts:173` | Davet token deneme limiti (IP) | `20`/dk/IP | Makul (NAT arkası toplu katılım için bilinçli gevşek) | ❌ HAYIR |
| `CHECK_SLUG_RATE_RPM` | `rateLimiter.ts:186` | Slug numaralandırma yavaşlatma (IP) | `30`/dk/IP | Makul | ❌ HAYIR |
| `DATA_EXPORT_RATE_RPM` | `rateLimiter.ts:205` | KVKK veri indirme limiti (kullanıcı) | `5`/dk | Makul | ❌ HAYIR |
| `ACCOUNT_DELETE_RATE_RPM` | `rateLimiter.ts:219` | Hesap kapatma limiti (kullanıcı) | `5`/dk | Makul | ❌ HAYIR |
| `SELF_SERVE_REGISTER_RATE_RPM` | `rateLimiter.ts:239` | Sahte kurum başvurusu limiti (IP) | `5`/dk/IP | Makul | ❌ HAYIR |
| `TENANT_CACHE_TTL_MS` | `tenantCache.ts:16` | Tenant L1 cache TTL | `300_000` ms (5 dk) | Tenant ayarı (logo, `isSharedPoolActive`, vocabulary) değişikliği **5 dk'ya kadar yansımayabilir** — `invalidateTenant` çağrılmayan yollarda | ❌ HAYIR |
| `INVITATION_TOKEN_EXPIRY` | `config.ts:100` — **TÜKETİCİSİ YOK** | (niyet: davet token ömrü) | `'90d'` | ⚠️ **ÖLÜ AYAR.** Davet token'ı `selfServeController.ts:571` ve `:632`'de **sabit `'30d'`** ile imzalanır. Operatör `.env`'de `180d` yazsa bile token 30 gün yaşar | ✅ EVET (satır 48) — **yanıltıcı** |
| `UPLOAD_DIR` | `config.ts:113` → `server.ts:69`, `avatarStorage.ts:62,68,90` | Avatar yazma dizini | `process.cwd()/uploads` | ⚠️ Docker'da kalıcı volume mount edilmezse **her deploy'da tüm avatarlar silinir** | ✅ EVET (satır 54, boş) |
| `UPLOAD_PUBLIC_BASE_URL` | `config.ts:114` → `avatarStorage.ts:57` | Avatar public URL tabanı | `backendBaseUrl` | Yanlışsa avatarlar 404 | ✅ EVET (satır 58, boş) |
| `UPLOAD_MAX_BYTES` | `config.ts:115` → `middleware/avatarUpload.ts:20,45` | Azami dosya boyutu | `5*1024*1024` (5 MB) | Makul | ✅ EVET (satır 60) |
| `GOOGLE_CLIENT_ID` | `config.ts:127` → `googleProvider.ts:57,94` | Google OAuth | `''` | Boşsa Google girişi çalışmaz (`config.ts:122-123` yorumu: runtime hata) | ✅ EVET (satır 65) |
| `GOOGLE_CLIENT_SECRET` | `config.ts:128` → `googleProvider.ts:95` | Google OAuth | `''` | aynı | ✅ EVET (satır 66) |
| `GOOGLE_REDIRECT_URI` | `config.ts:129` → `googleProvider.ts:58,96` | Google callback | `http://localhost:3000/api/auth/google/callback` | Canlıda set edilmezse Google `redirect_uri_mismatch` verir | ✅ EVET (satır 67) |
| `LINKEDIN_CLIENT_ID` | `config.ts:132` → `linkedinProvider.ts:43,76` | LinkedIn OAuth | `''` | Boşsa LinkedIn girişi çalışmaz | ✅ EVET (satır 73) |
| `LINKEDIN_CLIENT_SECRET` | `config.ts:133` → `linkedinProvider.ts:77` | LinkedIn OAuth | `''` | aynı | ✅ EVET (satır 74) |
| `LINKEDIN_REDIRECT_URI` | `config.ts:134` → `linkedinProvider.ts:44,75` | LinkedIn callback | `http://localhost:3000/api/auth/linkedin/callback` | Canlıda mismatch | ✅ EVET (satır 75) |
| `FRONTEND_OAUTH_CALLBACK_URL` | `config.ts:137` → `authController.ts:690,706` | OAuth sonrası frontend yönlendirmesi | `http://localhost:3001/oauth/callback` | Canlıda set edilmezse **OAuth girişi localhost'a yönlendirir → giriş tamamlanmaz** | ✅ EVET (satır 44) |
| `LLM_PROVIDER` | `config.ts:65` — **TÜKETİCİSİ YOK** | (niyet: LLM sağlayıcı seçimi) | `'openai'` | ÖLÜ — hiçbir etkisi yok (bkz. D.3) | ❌ HAYIR |
| `OPENAI_API_KEY` | `config.ts:66` — **TÜKETİCİSİ YOK** | (niyet: OpenAI anahtarı) | `''` | ÖLÜ (bkz. D.3) | ✅ EVET (satır 19) — **yanıltıcı** |
| `OPENAI_MODEL` | `config.ts:67` — **TÜKETİCİSİ YOK** | (niyet: model adı) | `'gpt-4.1-mini'` | ÖLÜ (bkz. D.3) | ✅ EVET (satır 20) — **yanıltıcı** |
| `npm_package_version` | `server.ts:57` (`/health`) | Sürüm bilgisi | `'0.1.0'` | Docker `node dist/server.js` ile çalıştığında npm set etmez → `/health` daima `0.1.0` gösterir | ❌ (gerekmiyor) |

#### TABLO B — Backend test-only

| değişken | dosya:satır | not |
|---|---|---|
| `TEST_DATABASE_URL` | `tests/setup.ts:13`; `tests/globalSetup.ts:91,95`; `tests/helpers/assertTestDatabase.ts` | Canlı DB'yi TRUNCATE'ten koruyan fail-safe. `.env.test.example:20`'de var. Backend `.env.example`'da yok (doğru). |

Testlerde sabitlenen değerler (`tests/setup.ts:19-24`): `NODE_ENV=test`, `JWT_SECRET`, `PLATFORM_ADMIN_KEY`, `SELF_SERVE_REGISTER_RATE_RPM=1000`.

#### TABLO C — Frontend (`/home/user/menti-mentor-v2/frontend`)

| değişken | dosya:satır | ne işe yarar | varsayılanı | varsayılanda kalırsa NE OLUR | env örneğinde var mı |
|---|---|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | `src/lib/api/client.ts:16`; `src/lib/api/platform.ts:3`; `src/components/molecules/OAuthButtons.tsx:16`; `next.config.mjs:45` | Backend API tabanı (**build-time gömülür**) | `'http://localhost:3000'` | ⚠️ **Uygulama canlıda localhost'a istek atar → tamamen çalışmaz.** `frontend/Dockerfile:16-17` ARG/ENV ile build'e gömülür; `docker-compose.yml:83` `${BACKEND_URL}`'den besler | 🟡 Çatıda dolaylı: `.env.compose:15` `BACKEND_URL` |
| `TENANT_IMAGE_DOMAINS` | `next.config.mjs:33,34` | `next/image` ek izinli domain listesi | `[]` (varsayılan 3 OAuth CDN + API origin) | Tenant logosu harici CDN'deyse `next/image` görseli reddeder | ❌ HAYIR |
| `E2E_BASE_URL` | `playwright.config.ts:23` | e2e hedef | `http://localhost:3001` | test-only | ❌ |
| `E2E_API_URL` | `e2e/global-setup.ts:21` | e2e API hedefi | `http://localhost:3000` | test-only | ❌ |
| `DATABASE_URL` | `e2e/global-setup.ts:28` | e2e seed | `''` | test-only | ❌ |
| `GITHUB_RUN_ID` / `E2E_RUN_ID` | `e2e/global-setup.ts:42` | e2e izolasyon eki | `'local'` | test-only | ❌ |
| `CI` | `playwright.config.ts:18` | `forbidOnly` | — | test-only | ❌ |

---

#### ⚠️ ŞÜPHE LİSTESİ — 13 DEĞİŞKENİN TEK TEK DOĞRULAMASI

| # | değişken | kodda gerçekten kullanılıyor mu? | `.env.example`'da gerçekten yok mu? | HÜKÜM |
|---|---|---|---|---|
| 1 | `CRON_ENABLED` | ✅ EVET — `cronScheduler.ts:31` | ✅ YOK (`grep -c CRON_ENABLED .env.example` = 0) | **DOĞRULANDI** |
| 2 | `JWT_EXPIRES_IN` | ✅ EVET — `config.ts:58` → `jwtAuth.ts:25` | ✅ YOK | **DOĞRULANDI** |
| 3 | `RATE_LIMIT_RPM` | ✅ EVET — `rateLimiter.ts:10` (tüm `/api/*`) | ✅ YOK | **DOĞRULANDI** |
| 4 | `PLATFORM_AUTH_RPM` | ✅ EVET — `rateLimiter.ts:49` | ✅ YOK | **DOĞRULANDI** |
| 5 | `PLATFORM_READ_RPM` | ✅ EVET — `rateLimiter.ts:50` | ✅ YOK | **DOĞRULANDI** |
| 6 | `AVATAR_UPLOAD_RPM` | ✅ EVET — `rateLimiter.ts:82` | ✅ YOK | **DOĞRULANDI** |
| 7 | `SMTP_SECURE` | ✅ EVET — `config.ts:76,77,78` | 🟡 **KISMEN ÇÜRÜTÜLDÜ** — `.env.example:31-32`'de **yorum satırı** olarak belgelenmiş (`# SMTP_SECURE="true"`) | **KISMEN ÇÜRÜTÜLDÜ** (belgelenmiş, aktif değil — kasıtlı: 465 için otomatik türetiliyor) |
| 8 | `TENANT_CACHE_TTL_MS` | ✅ EVET — `tenantCache.ts:16` | ✅ YOK | **DOĞRULANDI** |
| 9 | `TENANT_NOTIFICATIONS_ENABLED` | ✅ EVET — `config.ts:88` → `tenantNotifications.ts:116` | ✅ YOK | **DOĞRULANDI — en riskli maddedir (D.2a)** |
| 10 | `LLM_PROVIDER` | 🟡 OKUNUYOR (`config.ts:65`) ama **hiçbir tüketicisi yok** | ✅ YOK | **DOĞRULANDI ama ÖLÜ** (D.3) |
| 11 | `NODE_ENV` | ✅ EVET — 5 dosya, davranış değiştiriyor | ✅ YOK | **DOĞRULANDI** — ancak `Dockerfile:39` (`ENV NODE_ENV=production`) ve `docker-compose.yml:43` set ediyor → canlı risk düşük, **PO teyit etmeli** |
| 12 | `PORT` | ✅ EVET — `config.ts:52` → `server.ts:139` | ✅ YOK | **DOĞRULANDI** — `docker-compose.yml:49` `PORT: 3000` set ediyor → etkisiz |
| 13 | `PLATFORM_ADMIN_EMAIL` | ✅ EVET — `config.ts:32` → `platformController.ts:37` | ❌ **VAR — `.env.example:8`** (üstünde 2 satır açıklama da var, satır 6-7) | **ÇÜRÜTÜLDÜ** |

**Özet:** 13 şüpheden **11 DOĞRULANDI**, 1 KISMEN ÇÜRÜTÜLDÜ (`SMTP_SECURE`), 1 tamamen ÇÜRÜTÜLDÜ (`PLATFORM_ADMIN_EMAIL`).

**Şüphe listesinde OLMAYAN ama aynı durumda olan 7 ek değişken** (rapora eklenmeli):
`REGISTER_RATE_RPM`, `SUSPICION_RATE_RPM`, `INVITE_JOIN_RATE_RPM`, `CHECK_SLUG_RATE_RPM`, `DATA_EXPORT_RATE_RPM`, `ACCOUNT_DELETE_RATE_RPM`, `SELF_SERVE_REGISTER_RATE_RPM` — hepsi `rateLimiter.ts`'te aktif, hiçbiri `.env.example`'da yok.

---

### D.2 ⭐ SESSİZ KAPALILIK RİSKİ

#### D.2a — `TENANT_NOTIFICATIONS_ENABLED`

**Nerede okunuyor:** `src/config.ts:88`
```ts
tenantNotificationsEnabled: process.env.TENANT_NOTIFICATIONS_ENABLED === 'true',
```
Katı string eşitliği: `'1'`, `'TRUE'`, `'yes'` **çalışmaz**. Tam olarak `'true'` gerekir.

**Hangi koşulda:** `src/services/tenantNotifications.ts:116-123`
```ts
if (!config.email.tenantNotificationsEnabled) {
  void logger.info('EMAIL', 'Kurum bildirimi hazır ama gönderim KAPALI (log-only).', {...});
  return;              // ← sessizce çıkar, çağırana hiçbir sinyal vermez
}
await sendEmail(admin.email, subject, html);
```

**KAPSAM BEYANI (negatif iddia için):** `grep -rn "tenantNotificationsEnabled\|TENANT_NOTIFICATIONS_ENABLED" src/ tests/` → 6 eşleşme, hepsi yukarıda listelendi. Bu bayrağın **tek tüketicisi** `tenantNotifications.ts:116`'dır. Bu servisin **tek dışa açık fonksiyonu gönderim yapan** `notifyTenantVerification`, ve `grep -rn "notifyTenantVerification" src/` → yalnız `platformController.ts`'te 3 çağrı.

##### Bayrak `'true'` DEĞİLSE sessizce gitmeyen akışlar (TAM LİSTE — 3 akış)

| # | Akış | Tetikleyen dosya:satır | Uç nokta | Kullanıcı (kurum yöneticisi) ne bekler | NE OLMAZ |
|---|---|---|---|---|---|
| 1 | **Kurum başvurusu ONAY** | `platformController.ts:298` → `tenantNotifications.ts:116` | `POST /api/platform/tenants/:id/approve` | "Başvurunuz onaylandı, hoş geldiniz" maili (`tenantNotifications.ts:40-45`) | Mail GİTMEZ. STK yöneticisi onaylandığını **hiç öğrenmez**; panele kendiliğinden girip bakması gerekir. DB'de `verificationStatus='APPROVED'` yazılır (`platformController.ts:291-293`), API `{ok:true}` döner |
| 2 | **Kurum başvurusu RET** | `platformController.ts:325` | `POST /api/platform/tenants/:id/reject` | "Başvurunuz şu aşamada onaylanamadı" + gerekçe (`tenantNotifications.ts:67-74`) | **Ret bildirimi GİTMEZ.** Yönetici reddedildiğini ve `note` gerekçesini öğrenemez. `verificationNote` DB'ye yazılır ama kuruma iletilmez |
| 3 | **Kurum DÜZELTME İSTEĞİ** | `platformController.ts:371` | `POST /api/platform/tenants/:id/request-correction` | "Bazı bilgileri güncellemenizi rica ediyoruz" + `correctionNote` (`tenantNotifications.ts:52-62`) | **Düzeltme isteği GİTMEZ.** Başvuru `CORRECTION_REQUESTED` durumunda **süresiz askıda kalır** — kurum ne istendiğini bilmediği için asla düzeltmez. En yüksek iş etkisi bunda |

Üç çağrının hepsi de `void notifyTenantVerification(...)` — **fire-and-forget**, dönüş değeri kontrol edilmiyor, hata ana akışı bozmuyor (`tenantNotifications.ts:127-131` catch). Platform operatörü panelde "Onayla"ya bastığında **her durumda başarı görür**.

##### ⚠️ Bayrak KAPSAMIDIŞINDA kalan akışlar — "başka bayrak mı var?" (kod takip edildi)

Sorulan diğer akışlar (kişi reddi, hatırlatma, davet, eşleşme, randevu, kişi onayı) **bu bayrakla değil**, tamamen farklı mekanizmalarla yönetiliyor. Varsayım yapılmadı; her biri grep ile izlendi:

| Akış | Fonksiyon | Çağıran dosya:satır | Bayrak? | Gerçek kapı |
|---|---|---|---|---|
| **Kişi kaydı ONAY** | `sendUserApprovalNotification` | `adminController.ts:666` | ❌ bayrak yok | Yalnız SMTP (D.2c) |
| **Kişi kaydı RET** | `sendUserApprovalNotification` | `adminController.ts:716` | ❌ | Yalnız SMTP |
| **Kişi DÜZELTME isteği** | `sendUserApprovalNotification` | `adminController.ts:773` | ❌ | Yalnız SMTP |
| **Yeni kayıt → admin bildirimi** | `sendAdminNewUserNotification` | `authController.ts:233`, `userController.ts:500`, `oauth/oauthService.ts:176` | ❌ | Yalnız SMTP |
| **DISC testi bitti → admin** | `sendAdminTestCompletedNotification` | `questionController.ts:437` | ❌ | Yalnız SMTP |
| **Şifre sıfırlama** | `sendPasswordResetEmail` | `authController.ts:543` | ❌ | Yalnız SMTP + `FRONTEND_URL` |
| **"Zaten kayıtlısınız"** | `sendAlreadyRegisteredEmail` | `authController.ts:179` | ❌ | Yalnız SMTP |
| **RANDEVU talebi** | `sendMeetingRequestEmail` | `meetingController.ts:199` | ❌ | Yalnız SMTP; hata `.catch()` → `logger.warn` (`meetingController.ts:204-208`) |
| **RANDEVU onayı** | `sendMeetingApprovalEmail` | `meetingController.ts:289` | ❌ | Yalnız SMTP; `.catch()` → warn (`:294-298`) |
| **Yeni mesaj bildirimi** | `sendNewChatMessageEmail` | `conversationController.ts:97` | ❌ | Yalnız SMTP |
| **Geri bildirim HATIRLATMASI** | `sendFeedbackReminderEmail` | `feedbackController.ts:190,196`; `cronScheduler.ts:243,244` | ❌ | SMTP **+ `CRON_ENABLED`** (cron yolu) |
| **Taslak kurum HATIRLATMASI** | `sendDraftTenantReminderEmail` | `cronScheduler.ts:143` | ❌ | SMTP **+ `CRON_ENABLED`** |
| **Dürtme (nudge)** | `sendNudgeReminderEmail` | `nudgeService.ts:49` | ❌ | Yalnız SMTP |
| **Algoritma ayar önerisi** | `sendAlgorithmAdjustmentProposal` | `algorithmTuner.ts:417` | ❌ | SMTP + `CRON_ENABLED` |
| **DAVET** | — | `selfServeController.ts:625-640` | — | ⚠️ **HİÇ E-POSTA GÖNDERİLMİYOR.** Davet yalnızca **link üretir** (`invitationLink`, `config.frontendBaseUrl` tabanlı) ve JSON'da döner. Yönetici linki kendi eliyle paylaşır. **Kanıt (negatif iddia, kapsam beyanlı):** `grep -rn "sendEmail\|emailService\|send(" src/routes/invitationRoutes.ts src/services/invitationToken.ts src/controllers/tenantController.ts` → **0 eşleşme**; `grep -rn "invitation\|davet" src/services/emailService.ts` → **0 eşleşme** |
| **EŞLEŞME / görünürlük onayı** | `notifyVisibilityApproved`, `notifyPendingVisibilityRequest`, `notifyMatchRequestReceived`, `notifyAdminsPendingUser`, `notifyAdminsMentorCertLapsed`, `notifyRematchRequested` | `notificationService.ts:60,72,84,96,113,125` | ❌ | ⚠️ **TAMAMI STUB.** `notificationService.ts:38-54`: `sendPushNotification` yalnızca `logger.info('SYSTEM', '[PUSH-STUB] Bildirim kuyruğa eklendi')` yazar ve `{sent:true}` döner. **Hiçbir push/e-posta gitmez** ve çağıran `sent:true` görür. Bu bir env bayrağı DEĞİL — kalıcı kod stub'ıdır |

**BULGU D.2a-1 (yüksek):** `TENANT_NOTIFICATIONS_ENABLED` yalnız 3 kurum-düzeyi akışı etkiliyor, ama etkisi tam sessizlik. `.env.example`'da hiç anılmadığı için operatör bu bayrağın varlığından habersiz kalır.
**BULGU D.2a-2 (yüksek):** Kişi-düzeyi bildirimler ve randevu/mesaj bildirimleri bayrak arkasında değil — onlar `SMTP_HOST` boşsa sessiz kalır (D.2c). İki farklı sessizlik mekanizması var.
**BULGU D.2a-3 (orta/yüksek):** Uygulama-içi bildirim katmanı (`notificationService.ts`) tamamen stub — env ile açılamaz, kod değişikliği gerekir.
**Canlı değer:** `TENANT_NOTIFICATIONS_ENABLED` hiçbir deploy dosyasında geçmiyor (D.5) → canlıda muhtemelen tanımsız = kapalı. **PO teyit etmeli.**

---

#### D.2b — `CRON_ENABLED`

**Nerede:** `src/services/cronScheduler.ts:29-31` (TAM okundu, 452 satır)
```ts
const CRON_ENABLED =
  process.env.NODE_ENV !== 'test' &&
  process.env.CRON_ENABLED !== 'false';
```
`startCronScheduler()` çağrısı: `src/server.ts:145` (`app.listen` callback'i içinde).
Kapalıyken: `cronScheduler.ts:400-403` → `console.log('[CRON] CRON_ENABLED=false — tüm zamanlanmış görevler devre dışı.')` ve `return`.

##### ⚠️ VARSAYILAN DEĞER — KANIT

**CRON VARSAYILANDA AÇIKTIR.** Kanıt: `cronScheduler.ts:31` operatörü `!== 'false'`'dur — negatif kontrol. `process.env.CRON_ENABLED` **tanımsız** (`undefined`) olduğunda `undefined !== 'false'` → `true`. Yani değişken hiç set edilmezse cron **çalışır**. Kapatmak için açıkça `CRON_ENABLED=false` string'i yazılmalıdır.
**İkinci koşul:** `NODE_ENV !== 'test'`. `NODE_ENV=test` ise cron her halükârda kapalı (`tests/setup.ts:19` bunu set eder). Üretimde `NODE_ENV=production` (`Dockerfile:39`, `docker-compose.yml:43`) → bu koşul geçer.
**Sonuç:** Canlıda (Docker) cron **AÇIK** olmalı. `CRON_ENABLED` hiçbir deploy dosyasında geçmediği için (D.5) varsayılan devreye girer. **PO teyit etmeli** — `/health` cron durumunu göstermiyor; teyit için konteyner log'unda `[CRON] Haftalık görevler zamanlandı...` satırı (`cronScheduler.ts:445-446`) aranmalı.

##### `CRON_ENABLED=false` ise koşmayan işler (8 iş — TAM LİSTE)

| # | Zamanlama (UTC) | Kayıt satırı | Fonksiyon | Ne yapıyor | KOŞMAMASININ SONUCU (kullanıcı gözünden) |
|---|---|---|---|---|---|
| 1 | `0 2 * * 0` — Her Pazar 02:00 | `cronScheduler.ts:406-408` | `runWeeklyTuning` (`:42-77`) | Tenant'ın `reportingFrequency`'sine göre NPS'ten sektör/DISC ağırlıklarını ayarlar (`tuneScoringWeights`) | Eşleştirme algoritması **hiç öğrenmez**; 60/40 ağırlıkları sonsuza kadar sabit kalır. STK yöneticisi "algoritma kalibrasyon önerisi" mailini (`algorithmTuner.ts:417`) **hiç almaz** — panelde onay bekleyen öneri hiç belirmez |
| 2 | `0 3 * * 0` — Her Pazar 03:00 | `:411-413` | `runWeeklyPurge` (`:81-92`) | `purgeExpiredData()` — 90 günden eski `SystemLog`, 3 yıldan eski `FeedbackLog` siler | ⚠️ **KVKK Md.7 saklama süresi ihlali.** Veri süresiz birikir; DB şişer. Denetimde "saklama politikası uygulanıyor" iddiası kanıtlanamaz |
| 3 | `0 */6 * * *` — Her 6 saat | `:416-418` | `runDraftTenantReminder` (`:107-163`) | 72 saatten eski yarım kalmış STK onboarding'i için admin'e kurtarma maili (unsubscribe linkli) | Yarım kalan kurum kurulumları **hiç hatırlatılmaz** → dönüşüm kaybı. `reminderEmailSentAt` hiç dolmaz |
| 4 | `0 4 * * *` — Her gün 04:00 | `:421-423` | `runDraftTenantCleanup` (`:170-214`) | 96 saatten eski, anlaşması olmayan taslak tenant'ları + kullanıcılarını siler | ⚠️ Terk edilmiş kayıtlar (kişisel veri dahil: e-posta, ad) **süresiz saklanır** — veri minimizasyonu ihlali. DB'de ölü tenant birikir |
| 5 | `0 8 * * *` — Her gün 08:00 | `:426-428` | `runCheckpointFeedbackReminderCron` (`:365-395`) | DAY_3/14/30 değerlendirme vadesi dolan eşleşmeleri sayar — **LOG-ONLY** (`:377`, Aşama 1) | Yöneticinin görünürlüğü kaybolur. **NOT: Bu iş zaten kullanıcıya bildirim GÖNDERMİYOR** (kodun kendi yorumu `:356-364`) — kapalı olması kullanıcıya ek zarar vermez, yalnız log kaybı |
| 6 | `0 9 * * *` — Her gün 09:00 | `:431-433` | `runFeedbackReminderCron` (`:221-255`) | Bitmiş ama geri bildirimi olmayan toplantılar için mentör+menti'ye hatırlatma maili; `feedbackPrompted=true` işaretler | **Geri bildirim hatırlatması hiç gitmez** → NPS/feedback verisi toplanmaz → (1) numaralı tuning'in girdisi de kurur. Zincirleme etki |
| 7 | `0 10 * * *` — Her gün 10:00 | `:436-438` | `runAgreementRenewalCron` (`:261-293`) | Bitmesine ≤7 gün kalan `ACTIVE` mentorluk anlaşmasını `RENEWAL_PENDING`'e çevirir | ⚠️ Anlaşmalar **`ACTIVE` olarak süresi dolmuş halde kalır**; yenileme istemi hiç doğmaz. Taraflar anlaşmanın bittiğini fark etmez |
| 8 | `0 11 * * *` — Her gün 11:00 | `:441-443` | `runMentorCertAdminNotifyCron` (`:305-350`) | Sertifikada geride kalan mentör için STK yöneticisine **uygulama-içi** bildirim; `certAdminNotifiedAt` işaretler | Yönetici geride kalan mentörleri öğrenemez. **NOT:** hedef fonksiyon `notifyAdminsMentorCertLapsed` zaten `notificationService` stub'ıdır (`notificationService.ts:38-54`) → bu iş koşsa bile yalnız log üretir |

**BULGU D.2b-1:** Cron varsayılanda AÇIK — bu iyi bir varsayılan (fail-open, veri temizliği tarafında doğru seçim).
**BULGU D.2b-2 (orta):** `CRON_ENABLED` `.env.example`'da yok ve hiçbir deploy dosyasında yok → operatör bu şalterin varlığını bilmiyor; yanlışlıkla `CRON_ENABLED=false` yazılırsa 8 iş sessizce durur, tek belirti konteyner log'unda tek satırdır.
**BULGU D.2b-3 (orta):** Cron'ların 3'ü (#3, #6, ayrıca #1'in mail adımı) e-posta gönderiyor — cron AÇIK olsa bile `SMTP_HOST` boşsa hiçbiri gitmez (D.2c). İki bağımsız sessizlik katmanı üst üste biniyor.
**BULGU D.2b-4:** Tek-instance varsayımı — `cron.schedule` her konteynerde çalışır. Çok replikalı deploy'da işler **N kez** koşar (özellikle #4 silme işi). `docker-compose.yml`'de replika yok → şu an risk yok, ölçeklemede **TEYİT GEREK**.

---

#### D.2c — `SMTP_HOST` boşsa mail katmanı ne yapıyor?

**Dosya TAM okundu:** `src/services/emailService.ts` (295 satır).

**1) Transport modül yüklenirken kuruluyor** — `emailService.ts:8-16`:
```ts
const transporter = nodemailer.createTransport({
  host: config.email.smtpHost,   // '' olabilir
  port: config.email.smtpPort,
  secure: config.email.smtpSecure,
  auth: { user: config.email.smtpUser, pass: config.email.smtpPass },
});
```
Boş host ile `createTransport` **hata fırlatmaz** (nodemailer bağlantıyı gönderim anında kurar). Açılışta hiçbir uyarı yok.

**2) Gönderim kapısı** — `emailService.ts:31-49`:
```ts
export async function send(to, subject, html): Promise<void> {
  if (isUndeliverableRecipient(to)) {                       // :34
    void logger.info('EMAIL', 'Teslim edilemez/sahte alıcı — gönderim atlandı.');
    return;                                                 // :36 — sessiz
  }
  if (!config.email.smtpHost || !config.email.smtpUser || !config.email.smtpPass) {
    void logger.warn('EMAIL', 'SMTP yapılandırması eksik — e-posta gönderilmedi.');
    return;                                                 // :40 — sessiz
  }
  try {
    await transporter.sendMail({ from: config.email.from, to, subject, html });
  } catch (err) {
    void logger.error('EMAIL', `E-posta gönderilemedi: ${reason}`);   // :47 — yutar
  }
}
```

**CEVAP — üç ayrı sessiz çıkış:**
- **Hata fırlatmıyor.** `send()` her durumda `Promise<void>` olarak **başarıyla resolve** olur. Ne `throw` ne de `false` dönüş var.
- **Log'a basıyor** — üç farklı seviyede: `info` (sahte alıcı, `:35`), `warn` (SMTP eksik, `:39`), `error` (SMTP/auth hatası ör. 535, `:47`).
- **Sessizce geçiyor** — çağıran katman için üç durum da "başarı"dan ayırt edilemez.

**3) Ek sessiz filtre — `isUndeliverableRecipient` (`emailService.ts:20-29`):** `.local`, `.test`, `.invalid`, `.example` ile biten **tüm** alıcılar `info` log'uyla atlanır. Bir kurum gerçekten `*.test` uzantılı bir alan adı kullanıyorsa (ör. `.test` TLD'si RFC2606 rezerve, ama iç ağlarda `sirket.local` yaygın) mailleri **hiç gitmez**.

##### "Davet gönderildi" görüp mail gitmiyor olabilir mi?

**Davet için HAYIR — çünkü davet zaten mail göndermiyor.** `selfServeController.ts:625-640` yalnız `invitationLink` üretip JSON'da döndürür; kod yolunda e-posta çağrısı yok (kapsam beyanı D.2a tablosunda). Frontend'in "davet gönderildi" yazıp yazmadığı **TEYİT GEREK** — eğer öyle yazıyorsa bu bir **UI metni hatasıdır**, mail katmanı sorunu değil.

**Diğer akışlar için EVET, ve yaygın olarak.** Çağıran katman hiçbir yerde sonucu kontrol etmiyor:

| Çağrı biçimi | Örnek | Sonuç |
|---|---|---|
| `void send...()` — fire-and-forget | `authController.ts:179,233,543`; `adminController.ts:666,716,773`; `userController.ts:500`; `questionController.ts:437`; `conversationController.ts:97`; `oauthService.ts:176`; `algorithmTuner.ts:417` | Promise'ın sonucu **hiç beklenmiyor**; API 200/201 döner |
| `.catch(() => logger.warn(...))` | `meetingController.ts:199-208`, `:289-298` | Hata yalnız log'a; **HTTP yanıtı `201 Created` / başarı** (`meetingController.ts:210`) |
| `.catch(() => null)` | `cronScheduler.ts:243,244` | Hata tamamen yutulur |
| `try/catch` + `logger.error` | `cronScheduler.ts:154-156` | Taslak hatırlatma; `reminderEmailSentAt` sadece başarıda yazılır (bu **doğru** davranış) |

**Mail gönderimi başarısız olunca çağıran akış ne yapıyor:** **Tamamı non-fatal.** Hiçbir akış geri alınmıyor, hiçbir HTTP yanıtı değişmiyor, kullanıcıya hiçbir uyarı gösterilmiyor. Somut senaryolar:

- **Randevu:** Menti randevu talep eder → DB'ye yazılır (`meetingController.ts:190-197`) → mail sessizce atılır → API `201` döner → UI "Talep gönderildi" gösterir → **mentör hiçbir şeyden haberdar olmaz** ve panele bakmadıkça talebi görmez.
- **Şifre sıfırlama:** `authController.ts:543` → `void sendPasswordResetEmail(...)` → API başarı döner → kullanıcı "E-postanızı kontrol edin" görür → **hiçbir mail gelmez**. Kullanıcı hesabına erişimini kalıcı kaybeder.
- **Kişi onayı/reddi:** Admin "Onayla"ya basar → `adminController.ts:666` → başarı → **kullanıcı onaylandığını öğrenmez**.
- **Yeni kayıt:** `authController.ts:233` → admin'e mail gitmez → **onay bekleyen kullanıcı süresiz bekler**.

**BULGU D.2c-1 (KRİTİK):** `send()` başarısızlığı çağıran katmana **hiçbir kanalla** iletilmiyor — ne dönüş değeri, ne exception, ne metrik. Tek belirti `SystemLog`'daki `warn`/`error` kaydı. Operatör bunu proaktif izlemiyorsa ay(lar)ca fark edilmeyebilir.
**BULGU D.2c-2 (yüksek):** Açılışta SMTP sağlık kontrolü yok. `transporter.verify()` çağrısı yok (`grep -n "verify" src/services/emailService.ts` → 0). `/health` (`server.ts:53-59`) SMTP durumunu **raporlamıyor**.
**BULGU D.2c-3 (orta):** `docker-compose.yml:52` `SMTP_HOST: ${SMTP_HOST:-}` — **boş varsayılana izin veriyor**, `JWT_SECRET`'taki gibi `:?` zorunluluk yok. `.env.compose:25` `SMTP_HOST=` boş. Yani **varsayılan compose kurulumu maili KAPALI başlatır.** Canlı değer **PO teyit etmeli.**

---

### D.3 ⭐ `LLM_PROVIDER`: ÖLÜ MÜ CANLI MI?

#### KAPSAM BEYANI
Komutlar (hepsi `/home/user/menti-mentor` kökünde, `node_modules` hariç):
1. `grep -rniE "openai|anthropic|\bllm\b|gpt|claude|iceBreaker|matchReason|llmRetry" src/ --include=*.ts` → **14 eşleşme**
2. `grep -rn "config\.llm|\.llm\b|llm\." src/ --include=*.ts` → **0 eşleşme**
3. `grep -rni "llm" src/ scripts/ tests/ prisma/schema.prisma package.json` → 6 eşleşme (3'ü `config.ts`, 3'ü yorum)
4. `cat package.json` — bağımlılık listesi tam okundu

#### Kanıt 1 — `LLM_PROVIDER` nereye gidiyor?
`src/config.ts:64-68`:
```ts
llm: {
  provider: process.env.LLM_PROVIDER ?? 'openai',
  openaiApiKey: process.env.OPENAI_API_KEY ?? '',
  openaiModel: process.env.OPENAI_MODEL ?? 'gpt-4.1-mini',
},
```
Okunan değer `config.llm.provider` alanına yazılıyor. **`config.llm`'in TÜKETİCİSİ YOKTUR** — `grep -rn "config\.llm" src/` → **0 eşleşme**. Aynı şekilde `config.llm.openaiApiKey` ve `config.llm.openaiModel` de hiçbir yerde okunmuyor. **O kod yolu ÇAĞRILMIYOR — çünkü ortada bir kod yolu yok, yalnız bir nesne alanı var.**

#### Kanıt 2 — Terim taraması (14 eşleşmenin tamamı)
| dosya:satır | eşleşme | niteliği |
|---|---|---|
| `config.ts:64,65,66,67` | `llm:` / `LLM_PROVIDER` / `OPENAI_API_KEY` / `OPENAI_MODEL` (`gpt-4.1-mini`) | **Yalnız tanım — tüketicisiz iskele** |
| `controllers/selfServeController.ts:75` | `// ─── DISC Önizleme Motoru (kural tabanlı, LLM yok) ───` | Yorum |
| `controllers/matchingController.ts:123` | `// Ice-breaker LLM çağrısı kaldırıldı — ...` | Yorum |
| `controllers/conversationController.ts:13` | `// ... (backend CLAUDE.md)` | Yorum (dosya adı geçiyor) |
| `controllers/platformController.ts:183`, `controllers/userController.ts:14` | `CLAUDE.md` atıfları | Yorum |
| `services/scoring.service.ts:12,32` | `export type MatchReason = 'OK' \| 'HARD_CONSTRAINT_VIOLATION'` | **Ad benzerliği tuzağı** — silinen `matchReason.ts` ile ilgisi yok, saf tip |
| `services/gdprService.ts:160,196` | `iceBreaker: null` / `'visibilityOptIn.iceBreaker'` | **Şema alanı temizliği** — `VisibilityOptIn.iceBreaker` DB sütunu hâlâ duruyor, anonimleştirmede null'lanıyor. Üretici kod yok |

#### Kanıt 3 — Dosyalar ve bağımlılıklar
- `iceBreaker.ts`, `matchReason.ts`, `llmRetry.ts`: `ls src/services/` çıktısında **YOK** (45 servis dosyası listelendi, hiçbiri bu adlarda değil). Belgenin iddiası **DOĞRULANDI**.
- `package.json` (TAM okundu): `dependencies` = `@prisma/client, @types/jsonwebtoken, bcryptjs, cors, dotenv, express, helmet, jsonwebtoken, multer, node-cron, nodemailer, zod`. **`openai` YOK. `@anthropic-ai/*` YOK. HTTP istemcisi (axios/undici/node-fetch) YOK.**
- `llmRateLimiter`: `src/middleware/rateLimiter.ts` TAM okundu (254 satır) — böyle bir export yok.

#### Kanıt 4 — Çalışan bir LLM çağrı yolu VAR MI?
**HAYIR.** Negatif iddianın kapsamı: yukarıdaki 4 komut `src/`'nin tamamını (`controllers/`, `services/`, `middleware/`, `routes/`, `config.ts`, `server.ts`, `db.ts`, `types.ts`) kapsar. Ne `fetch(`, ne `openai.`, ne `anthropic.`, ne bir model adına yapılan çağrı bulundu. Dolayısıyla **hiçbir uçtan tetiklenmiyor**.

#### SONUÇ: **ÖLÜ** (tam ölü, "yarım" değil)

| Değişken | Durum | Gerekçe |
|---|---|---|
| `LLM_PROVIDER` | **ÖLÜ** | `config.ts:65`'te okunuyor, `config.llm.provider`'a yazılıyor, **0 tüketici** |
| `OPENAI_API_KEY` | **ÖLÜ** | `config.ts:66`, 0 tüketici. ⚠️ `.env.example:19`'da duruyor → **operatörü canlı sanmaya iter** |
| `OPENAI_MODEL` | **ÖLÜ** | `config.ts:67`, 0 tüketici. `.env.example:20`'de `"gpt-4.1-mini"` yazılı |

**BULGU D.3-1 (düşük/orta — güvenlik+bakım):** `.env.example:18-20`, LLM bloğunu `# LLM (opsiyonel — ice-breaker devre dışı, ileride kullanılabilir)` başlığıyla sunuyor. Bu, operatörü **canlıya gerçek bir OpenAI API anahtarı koymaya** davet ediyor. Hiçbir işe yaramayan ama **sızıntı riski taşıyan** bir sır ortam değişkenlerinde tutulmuş olur (konteyner env'i, log, `docker inspect` üzerinden okunabilir). `LLM_PROVIDER` ise `.env.example`'da hiç geçmiyor.
**BULGU D.3-2:** `CLAUDE.md`'nin "yalnız kullanılmayan `config.ts` OpenAI env iskelesi kaldı" iddiası **koddan DOĞRULANDI** — belge bu noktada doğru.
**Öneri:** `config.ts:64-68` bloğu ve `.env.example:18-20` birlikte silinmeli (bu denetimde hiçbir değişiklik yapılmadı).

---

### D.4 — GÜVENLİK ETKİSİ OLAN VARSAYILANLAR

#### 1. `JWT_SECRET` — ⚠️ **FALLBACK SECRET VAR**

`src/config.ts:16-21`:
```ts
const DEV_JWT_SECRET = 'dev-secret-change-in-production-min-32-chars!!';
const jwtSecret = process.env.JWT_SECRET ?? DEV_JWT_SECRET;
if (isProd && jwtSecret === DEV_JWT_SECRET) {
  throw new Error('JWT_SECRET production ortamında varsayılan değerle çalışamaz.');
}
```

**Fallback secret VAR — `config.ts:16`. Bu kaynak koda gömülüdür ve repoda açıktır.** Ancak:
- ✅ **Azaltıcı kontrol var:** `NODE_ENV==='production'` ise açılışta **throw** → uygulama ayağa kalkmaz (fail-fast). Bu doğru tasarım.
- ⚠️ **Ama kontrol `NODE_ENV`'e bağlı.** `NODE_ENV` set edilmemişse `isProd=false` → **guard sessizce devre dışı** → canlı sistem, GitHub'da okunabilir bir secret'la JWT imzalar. **Herkes geçerli admin token'ı üretebilir.**
- `docker-compose.yml:45` `JWT_SECRET: ${JWT_SECRET:?JWT_SECRET zorunlu — min 32 karakter}` — compose `:?` ile zorunlu kılıyor (**ZATEN İYİ**). `Dockerfile:39` `NODE_ENV=production` sabitliyor (**ZATEN İYİ**). Bu iki katman birlikte compose ile deploy edilen sistemde riski kapatır.
- ⚠️ Docker/compose **dışında** (ör. `npm start` ile bare-metal, PM2, systemd) deploy edilirse iki koruma da yok.

**Makul mü:** Kısmen. Fallback secret'ın varlığı KRİTİK bir desen hatasıdır; guard'ın tek bir başka env değişkenine (`NODE_ENV`) bağlı olması tek nokta arızası yaratır.
**Ne olmalı:** Fallback tamamen kaldırılmalı, `JWT_SECRET` her ortamda zorunlu olmalı (`if (!process.env.JWT_SECRET) throw`), ek olarak min 32 karakter uzunluk doğrulaması yapılmalı. Dev ortamı için `.env.example` yeterlidir.
**Canlı değer:** **PO teyit etmeli** — canlıda `JWT_SECRET` gerçekten set mi ve `NODE_ENV=production` mı?

#### 2. `PLATFORM_ADMIN_KEY` — aynı desen
`config.ts:23-28`: fallback `'platform-dev-key-change-in-production'`, prod'da throw. `docker-compose.yml:46` `:?` zorunlu (**ZATEN İYİ**). Aynı `NODE_ENV` bağımlılığı riski geçerli.

#### 3. `PLATFORM_ADMIN_EMAIL` — ⚠️ **THROW YOK, YALNIZ UYARI**
`config.ts:31-45`: fallback `'admin@platform.local'`; prod'da **`console.warn`** (throw değil — kodun kendi gerekçesi `:34-38`: "süreç çökerse tüm site kapanır"). Kullanım: `platformController.ts:37` `safeEqual(email, config.platformAdminEmail)`.
**Sonuç:** Yanlış kalırsa platform panelinin **iki faktöründen biri tahmin edilebilir** hale gelir; güvenlik tek başına `PLATFORM_ADMIN_KEY`'e iner.
**Azaltıcı:** `docker-compose.yml:48` `PLATFORM_ADMIN_EMAIL: ${PLATFORM_ADMIN_EMAIL:-admin@platform.local}` → **compose varsayılanı bizzat zayıf değeri set ediyor** ve `.env.compose:13` `PLATFORM_ADMIN_EMAIL=` boş. Yani compose'un kendisi zayıf varsayılanı canlıya taşıyor. `console.warn` konteyner log'unda tek satır olarak geçer.
**Makul mü:** Hayır. `warn` yetersiz.
**Ne olmalı:** Compose'da `:?` ile zorunlu kılın; en azından `.env.compose`'da gerçek bir adresle doldurulması zorunlu hale getirilsin. **PO teyit etmeli.**

#### 4. `JWT_EXPIRES_IN` — `'1h'`
`config.ts:58` → `middleware/jwtAuth.ts:25` (`jwt.sign(payload, secret, {expiresIn})`).
**Makul mü: EVET.** 1 saat, çalınan access token için makul bir pencere. Refresh cookie ayrı (`authController.ts:65`).
⚠️ Ancak kodda **sabit** `'30d'` ile imzalanan token'lar var: `selfServeController.ts:571` (davet token'ı) ve `:632`. Ayrıca `authController.ts:359,499`, `selfServeController.ts:362`'de `expiresIn: 3600` sabit. Bunlar env'den yönetilemez.
**Ne olmalı:** Davet token'ı 30 gün canlı; `.env.example:48`'de `INVITATION_TOKEN_EXPIRY="90d"` yazması **yanıltıcıdır** (ölü ayar — D.1 Tablo A).

#### 5. Rate limit varsayılanları

| değişken | varsayılan | kapsam | makul mü / ne olmalı |
|---|---|---|---|
| `RATE_LIMIT_RPM` | **100**/dk/**tenant** | `server.ts:81` tüm `/api/*` | ⚠️ **Şüpheli.** Anahtar `X-Tenant-Id` (`rateLimiter.ts:36`) — 200 kişilik bir STK'nın **tamamı** 100 istek/dk paylaşır. Dashboard açan 5 kullanıcı bunu doldurabilir → meşru kullanıcı `429`. **Ne olmalı:** tenant büyüklüğüne göre ölçeklenmeli veya kullanıcı-bazlı olmalı; en azından canlıda 500+ yapılmalı. Ayrıca header'sız istekler `'anon'` ortak kovasına düşüyor (`:36`) — tek saldırgan tüm anonim trafiği kilitleyebilir (kodun kendisi bunu `:47-48` ve `:99-101`'de kabul ediyor, bu yüzden ek IP limitleri eklenmiş) |
| `PLATFORM_AUTH_RPM` | **10**/dk/IP | `rateLimiter.ts:49,58` | ✅ **Makul.** Credential-stuffing'e karşı yeterince sıkı |
| `PLATFORM_READ_RPM` | **120**/dk/IP | `:50,70` | ✅ **Makul.** Panel okuma için rahat |
| `AVATAR_UPLOAD_RPM` | **5**/dk/kullanıcı | `:82,88` | ✅ **Makul.** Disk doldurma koruması. `UPLOAD_MAX_BYTES` 5 MB ile birlikte 25 MB/dk üst sınır |

⚠️ **Ortak mimari sınır (BULGU D.4-1, orta):** Sayaçlar **in-memory `Map`** (`rateLimiter.ts:13`). Sonuçlar: (a) süreç yeniden başlayınca tüm limitler sıfırlanır; (b) **çok replikalı deploy'da limit replika sayısıyla çarpılır** (N replika = N×10 login denemesi/dk). `docker-compose.yml`'de replika tanımlı değil → şu an tek instance. Ölçeklemede Redis'e taşınmalı. **PO teyit etmeli.**

#### 6. `NODE_ENV` — hangi korumalar kapalı kalır?

**Kodda `NODE_ENV`'e göre davranış değişen TÜM yerler** (kapsam: `grep -rn "isProd\|nodeEnv\|NODE_ENV" src/` → 14 eşleşme, tamamı aşağıda):

| # | dosya:satır | `NODE_ENV≠production` iken |
|---|---|---|
| 1 | `config.ts:12-14` | `DEFAULT_TENANT_ID` yasağı **DEVRE DIŞI** → tenant izolasyonu bypass'ı mümkün: `X-Tenant-Id` header'ı olmayan istek `middleware/tenant.ts:27`'de fallback tenant'a düşer |
| 2 | `config.ts:19-21` | **`JWT_SECRET` varsayılan kontrolü DEVRE DIŞI** → repoda açık secret'la imzalama (yukarıda) |
| 3 | `config.ts:26-28` | **`PLATFORM_ADMIN_KEY` varsayılan kontrolü DEVRE DIŞI** → `platform-dev-key-change-in-production` ile platform paneli açılır |
| 4 | `config.ts:39-45` | `PLATFORM_ADMIN_EMAIL` uyarısı bile basılmaz |
| 5 | `authController.ts:62,67` | **Refresh cookie `secure: false`** (`res.cookie(..., {secure: isProd})`) → cookie düz HTTP'de de gönderilir, MITM'e açık |
| 6 | `authController.ts:74` | `clearCookie` aynı şekilde `secure: false` |
| 7 | `selfServeController.ts:16,33` | Self-serve refresh cookie **`secure: false`** |
| 8 | `platformController.ts:16` | **Platform admin cookie `secure: false`** (`process.env['NODE_ENV'] === 'production'`) — en ayrıcalıklı oturum çerezi |
| 9 | `cronScheduler.ts:30` | `NODE_ENV='test'` **değilse** cron çalışır (yalnız `test` özel) |
| 10 | `server.ts:55`, `platformController.ts:158` | `/health` ve platform yanıtı `env` alanını raporlar → **teyit aracı** |

**CEVAP:** `NODE_ENV` production'a set edilmezse **3 fail-fast guard + 4 cookie `secure` bayrağı = 7 koruma sessizce kapalı kalır.** Bu **kritik** bir bağımlılıktır: tek bir env değişkeni tüm güvenlik guard katmanını taşıyor.
**Azaltıcı (ZATEN İYİ):** `Dockerfile:39` `ENV NODE_ENV=production` — imaj düzeyinde sabit. `docker-compose.yml:43` ayrıca `NODE_ENV: production`. İki katman.
**Teyit yolu:** `GET /health` → `{"env": "..."}` alanı (`server.ts:55`). **PO bunu canlıda çağırıp `"production"` gördüğünü teyit etmeli.** Bu, canlı env'i tahmin etmeden doğrulamanın tek yoludur.
**Ne olmalı:** Guard'lar `NODE_ENV`'e değil, secret'ın kendi niteliğine bağlanmalı (fallback'i tamamen kaldır). Ayrıca `NODE_ENV` `.env.example`'a eklenmeli.

#### 7. CORS ayarı

`src/server.ts:48-49`:
```ts
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:3001,http://127.0.0.1:3001').split(',');
app.use(cors({ origin: allowedOrigins, credentials: true }));
```
- **Env'den geliyor:** evet, `ALLOWED_ORIGINS` (virgülle ayrılmış).
- **Varsayılan:** `http://localhost:3001,http://127.0.0.1:3001` — **açık liste, wildcard YOK** (**ZATEN İYİ**).
- **`credentials: true`** + açık liste doğru kombinasyon. `origin: '*'` **kullanılmamış** — `credentials` ile birlikte olsaydı kritik olurdu.
- **Makul mü: EVET, tasarım doğru.** ⚠️ Ama varsayılanda kalırsa canlı frontend **CORS'a takılır** (fail-closed — güvenlik açısından doğru yön, işlevsellik açısından tam kırılma).
- `docker-compose.yml:50` `ALLOWED_ORIGINS: ${FRONTEND_URL:-http://localhost:3001}` — `.env.compose:16`'dan besleniyor (**ZATEN İYİ**). ⚠️ Tek origin veriyor; birden fazla domain (ör. `www.` ve apex) gerekiyorsa compose değiştirilmeli.
- ⚠️ `.split(',')` **trim yapmıyor** (`server.ts:48`) → `"a.com, b.com"` yazılırsa ikinci origin `" b.com"` olur ve **hiç eşleşmez**. Sessiz konfigürasyon tuzağı. **BULGU D.4-2 (düşük/orta).**

#### 8. Cookie ayarları

| Cookie | dosya:satır | `httpOnly` | `secure` | `sameSite` | env'e bağlı mı |
|---|---|---|---|---|---|
| Refresh (auth) | `authController.ts:65-68` | ✅ `true` | 🟡 `isProd` (`NODE_ENV`) | ✅ `'strict'` | evet — `NODE_ENV` |
| Refresh temizleme | `authController.ts:74` | ✅ `true` | 🟡 `isProd` | ✅ `'strict'` | evet |
| Refresh (self-serve) | `selfServeController.ts:31-34` | ✅ `true` | 🟡 `isProd` | ✅ `'strict'` | evet |
| Platform admin | `platformController.ts:15-17` | ✅ `true` | 🟡 `NODE_ENV==='production'` | ✅ `'strict'` | evet |

**Makul mü:** ✅ Üç bayrağın üçü de doğru seçilmiş; `sameSite: 'strict'` CSRF'e karşı güçlü, `httpOnly` XSS token hırsızlığına karşı. **ZATEN İYİ.**
⚠️ Tek zayıflık: `secure` yalnızca `NODE_ENV`'e bağlı (madde 6). `secure` için ayrı bir `COOKIE_SECURE` env'i yok — `grep -rn "COOKIE_SECURE" src/` → 0.
**Ne olmalı:** `secure: true` prod'da zaten zorunlu olduğundan, `NODE_ENV` yerine "HTTPS arkasında mıyız" sorusuna bağlanmalı ya da doğrudan sabitlenmeli. Ayrıca `app.set('trust proxy', ...)` **yok** (`grep -rn "trust proxy" src/` → 0) → ters proxy arkasında `req.ip` (`rateLimiter.ts:53`) **proxy'nin IP'sini** verebilir, tüm IP-bazlı limitler tek kovaya düşer. **BULGU D.4-3 (orta) — PO/altyapı teyit etmeli.**

#### 9. `DEFAULT_TENANT_ID`
`config.ts:12-14` prod'da **set edilmişse throw** (ters guard — doğru). `config.ts:54` → `middleware/tenant.ts:27`: `const tenantId = headerTenantId || config.defaultTenantId;`
**Yanlış kalırsa:** `NODE_ENV≠production` + `DEFAULT_TENANT_ID` dolu ise, `X-Tenant-Id` header'ı **olmayan** her istek o tenant'a yazar/okur → **tenant izolasyonu kırılır**. `.env.example:16`'da boş bırakılmış (**ZATEN İYİ**), compose'da hiç geçmiyor (**ZATEN İYİ**).
**Makul mü: EVET** — guard'ın yönü doğru. Yine `NODE_ENV`'e bağlı.

---

### D.5 — DOCKER / DEPLOY TARAFI

#### `Dockerfile` (backend, `/home/user/menti-mentor/Dockerfile`)
Geçen env: **`NODE_ENV=production`** (satır 39) — tek `ENV`. `EXPOSE 3000` (:40). `CMD` (:43): `npx prisma migrate deploy && node dist/server.js`.
Not: `node dist/server.js` ile çalıştığı için **`npm_package_version` set edilmez** → `/health` daima `0.1.0` döner (`server.ts:57`).

#### `frontend/Dockerfile`
`ARG NEXT_PUBLIC_API_URL=http://localhost:3000` (:16) → `ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL` (:17) → **build-time'da bundle'a gömülür** (:19 `npm run build`). `ENV NODE_ENV=production` (:34), `ENV PORT=3001` (:35).
⚠️ **BULGU D.5-1 (yüksek):** `NEXT_PUBLIC_API_URL` **runtime'da değiştirilemez.** Build sırasında `--build-arg` verilmezse `http://localhost:3000` kalıcı olarak gömülür ve canlıda tüm API çağrıları localhost'a gider. `docker-compose.yml:82-83` `args: NEXT_PUBLIC_API_URL: ${BACKEND_URL:-http://localhost:3000}` ile besliyor — ama `.env.compose.local` dosyasında `BACKEND_URL` doldurulmamışsa veya imaj başka yerde build edilmişse **sessizce localhost'a düşer**. **PO teyit etmeli:** canlı frontend build'inin hangi `BACKEND_URL` ile yapıldığı.

#### `docker-compose.yml` (`/home/user/menti-mentor-v2/docker-compose.yml`) — backend servisine geçen 18 env (satır 43-65)
`NODE_ENV`(43), `DATABASE_URL`(44), `JWT_SECRET`(45, `:?` zorunlu), `PLATFORM_ADMIN_KEY`(46, `:?` zorunlu), `PLATFORM_ADMIN_EMAIL`(48, zayıf varsayılan), `PORT`(49), `ALLOWED_ORIGINS`(50), `SMTP_HOST`(52), `SMTP_PORT`(53), `SMTP_SECURE`(54), `SMTP_USER`(55), `SMTP_PASS`(56), `SMTP_FROM`(57), `FRONTEND_URL`(58), `FRONTEND_OAUTH_CALLBACK_URL`(59), `GOOGLE_CLIENT_ID`(60), `GOOGLE_CLIENT_SECRET`(61), `GOOGLE_REDIRECT_URI`(62), `LINKEDIN_CLIENT_ID`(63), `LINKEDIN_CLIENT_SECRET`(64), `LINKEDIN_REDIRECT_URI`(65).
Postgres servisi (19-22): `POSTGRES_USER`, `POSTGRES_PASSWORD` (`:?` zorunlu), `POSTGRES_DB`.
Frontend (88-90): `NODE_ENV`, `PORT`.
`.env.compose` (14 değişken şablonu): `POSTGRES_USER/PASSWORD/DB`, `JWT_SECRET`, `PLATFORM_ADMIN_KEY`, `PLATFORM_ADMIN_EMAIL`, `BACKEND_URL`, `FRONTEND_URL`, `BACKEND_PORT`, `FRONTEND_PORT`, `SMTP_HOST/PORT/SECURE/USER/PASS/FROM`, `GOOGLE_*`, `LINKEDIN_*`.

#### CI workflow'ları
**Backend `.github/workflows/ci.yml`** (58 satır, TAM okundu) — set edilen: `DATABASE_URL`(34), `TEST_DATABASE_URL`(35); postgres servisi: `POSTGRES_USER/PASSWORD/DB`(19-21).
⚠️ `JWT_SECRET`/`PLATFORM_ADMIN_KEY` workflow'da **set edilmiyor** — `tests/setup.ts:20-21` bunları kod içinde atadığı için testler geçiyor.
**Çatı `.github/workflows/ci.yml`** — set edilen: `NODE_VERSION`(21), `NEXT_PUBLIC_API_URL`(94, 195), postgres env(106-108, 173-175), `NODE_ENV=test`(118, 186), `TEST_DATABASE_URL`(119, 188), `DATABASE_URL`(120, 187), `JWT_SECRET`(121, 189), `PLATFORM_ADMIN_KEY`(122, 190), `PORT`(191), `BACKEND_URL`(192), `FRONTEND_URL`(193), `ALLOWED_ORIGINS`(194).

#### ⚠️ KODDA KULLANILIP HİÇBİR DEPLOY DOSYASINDA GEÇMEYENLER
Kapsam: `Dockerfile` + `frontend/Dockerfile` + `docker-compose.yml` + `.env.compose` + iki `ci.yml` (hepsi TAM okundu).
**Canlıda muhtemelen SET EDİLMEMİŞ — hepsi kod varsayılanına düşer. PO DOĞRULAMALI:**

| değişken | koddaki varsayılan | canlıda varsayılanda kalırsa |
|---|---|---|
| `TENANT_NOTIFICATIONS_ENABLED` | `false` | ⭐ **Kurum onay/red/düzeltme mailleri hiç gitmez** (D.2a) — en yüksek iş etkisi |
| `CRON_ENABLED` | AÇIK | Etkisiz (varsayılan doğru) — ama şalterin varlığı belgesiz |
| `JWT_EXPIRES_IN` | `'1h'` | Kabul edilebilir |
| `RATE_LIMIT_RPM` | `100`/dk/tenant | ⚠️ Büyük STK'da meşru kullanıcılar `429` alabilir |
| `PLATFORM_AUTH_RPM` | `10` | Kabul edilebilir |
| `PLATFORM_READ_RPM` | `120` | Kabul edilebilir |
| `AVATAR_UPLOAD_RPM` | `5` | Kabul edilebilir |
| `LOGIN_RATE_RPM` | `10` | Kabul edilebilir (`.env.example`'da var, compose'da yok) |
| `PASSWORD_RESET_RATE_RPM` | `5` | Kabul edilebilir |
| `REGISTER_RATE_RPM` | `10` | Kabul edilebilir |
| `SUSPICION_RATE_RPM` | `5` | Kabul edilebilir |
| `INVITE_JOIN_RATE_RPM` | `20` | Kabul edilebilir |
| `CHECK_SLUG_RATE_RPM` | `30` | Kabul edilebilir |
| `DATA_EXPORT_RATE_RPM` | `5` | Kabul edilebilir |
| `ACCOUNT_DELETE_RATE_RPM` | `5` | Kabul edilebilir |
| `SELF_SERVE_REGISTER_RATE_RPM` | `5` | Kabul edilebilir |
| `TENANT_CACHE_TTL_MS` | `300_000` (5 dk) | Tenant ayar değişikliği ≤5 dk gecikir |
| `BACKEND_URL` (backend'e) | `FRONTEND_URL` → `localhost:3000` | ⚠️ **Compose backend'e `BACKEND_URL` GEÇİRMİYOR** — yalnız `${BACKEND_URL}` değişkenini OAuth redirect URI'larını (`:62`, `:65`) ve frontend build arg'ını (`:83`) üretmekte kullanıyor. Sonuç: `config.ts:49`'da `backendBaseUrl = FRONTEND_URL` olur → **avatar public URL'leri ve KVKK unsubscribe linki frontend domain'ine işaret eder** → `/uploads/...` ve `/api/tenants/unsubscribe` 404. **BULGU D.5-2 (yüksek) — PO teyit etmeli** |
| `UPLOAD_DIR` | `cwd()/uploads` | ⚠️ **`docker-compose.yml`'de backend için VOLUME YOK** (yalnız `postgres_data`, satır 96-97) → **her deploy'da tüm kullanıcı avatarları silinir.** `.env.example:51-53`'ün "kalıcı disk mount edilmeli" uyarısı compose'da uygulanmamış. **BULGU D.5-3 (yüksek)** |
| `UPLOAD_PUBLIC_BASE_URL` | `backendBaseUrl` | Yukarıdaki `BACKEND_URL` sorununu miras alır |
| `UPLOAD_MAX_BYTES` | 5 MB | Kabul edilebilir |
| `DEFAULT_TENANT_ID` | `undefined` | Doğru (prod'da zaten yasak) |
| `INVITATION_TOKEN_EXPIRY` | `'90d'` | Etkisiz — ölü ayar (gerçek: sabit `30d`) |
| `LLM_PROVIDER` / `OPENAI_API_KEY` / `OPENAI_MODEL` | — | Etkisiz — ölü (D.3) |
| `TENANT_IMAGE_DOMAINS` (frontend) | `[]` | Harici CDN'deki tenant logoları `next/image`'da render edilmez |

---

### ZATEN İYİ

1. `config.ts` **fail-fast guard'ları** — prod'da varsayılan `JWT_SECRET` (`:19-21`) ve `PLATFORM_ADMIN_KEY` (`:26-28`) ile açılışı engelliyor; `DEFAULT_TENANT_ID` prod'da yasak (`:12-14`).
2. `config.ts:34-38` — `PLATFORM_ADMIN_EMAIL` için throw yerine warn tercihi **gerekçesiyle birlikte** yorumlanmış (logger yerine `console.warn`, çünkü logger → db → Prisma zinciri modül yüklenirken DB yazımı tetikler). Düşünülmüş bir karar.
3. `config.ts:4-8` — `.env` yolu hatası (`../../.env` yerine `../.env`) yorumla belgelenmiş: "tüm config sessizce varsayılanlara düşerdi". Tam da bu denetimin konusu olan riski yazar fark etmiş.
4. **CORS wildcard yok** (`server.ts:48-49`) — açık liste + `credentials:true` doğru kombinasyon. Varsayılan fail-closed.
5. **Cookie'lerin 3 bayrağı da doğru** — `httpOnly:true` + `sameSite:'strict'` dört cookie'nin hepsinde (`authController.ts:65-68,74`, `selfServeController.ts:31-34`, `platformController.ts:15-17`).
6. **`globalErrorHandler` hata detayı sızdırmıyor** (`errorHandler.ts:22-24`) — `NODE_ENV`'e bakmaksızın **her zaman** jenerik mesaj; stack yalnız log'a. Bu, `NODE_ENV`'e bağlı OLMAYAN nadir korumalardan biri — doğru tasarım.
7. **`helmet` aktif** (`server.ts:43-46`), gerekçeli istisnalarla (API sunucusu → CSP kapalı).
8. **`/uploads` statik servisinde sertleştirme** (`server.ts:67-78`): `nosniff`, `CSP default-src 'none'; sandbox`, `index:false`, `dotfiles:'deny'`.
9. **`docker-compose.yml` `:?` zorunlulukları** — `POSTGRES_PASSWORD`(:21), `JWT_SECRET`(:45), `PLATFORM_ADMIN_KEY`(:46) eksikse compose başlamaz.
10. **`Dockerfile` sertleştirme** — root olmayan kullanıcı (`:26-27,38`), çok aşamalı build, `--omit=dev`, `--ignore-scripts`, `NODE_ENV=production` sabit.
11. **`emailService.ts:20-29`** — `.local/.test/.invalid/.example` alıcıları filtreleniyor: gerçek gönderen kutusunu bounce'la doldurmayı engelliyor. Saf fonksiyon, test edilebilir.
12. **KVKK disiplini** — `emailService.ts:33`, `tenantNotifications.ts:117-121`, `cronScheduler.ts:188-189`: log'lara e-posta adresi yazılmıyor, yalnız `tenantId` + durum.
13. **`.env.test.example` fail-safe belgelemesi** (satır 5-18) — canlı DB'nin TRUNCATE edilmesini önleyen guard açıkça anlatılmış.
14. **Test env izolasyonu** (`tests/setup.ts:19-24`) — `NODE_ENV=test` cron'u kapatıyor (`cronScheduler.ts:30`), rate limit'ler gevşetiliyor.
15. **`tests/platformAdminEmail.unit.test.ts`** — `PLATFORM_ADMIN_EMAIL` varsayılan/prod davranışı için birim testi var (`:38-82`); config guard'ları test edilmiş.
16. **Graceful shutdown** (`server.ts:152-171`) — SIGTERM/SIGINT, 10 s timeout, Prisma `$disconnect`.
17. **`cronScheduler.ts`'nin dürüstlüğü** — `:356-364` checkpoint cron'unun LOG-ONLY olduğunu ve neden Aşama 2'ye bırakıldığını açıkça yazıyor; `tenantNotifications.ts:4-7` bayrağın kapalı olduğunu dosyanın başında ilan ediyor. Sessiz kapalılık **kodda belgelenmiş** — sorun bu bilginin `.env.example`'a taşınmamış olması.
18. **`LOGIN_RATE_RPM` / `PASSWORD_RESET_RATE_RPM` `.env.example`'da gerekçesiyle belgelenmiş** (satır 9-13) — diğer 16 rate limit değişkeni için de aynısı yapılmalı.

---

### TARANAMADI / KAPSAM DIŞI

| konu | neden |
|---|---|
| **Canlı ortamın gerçek env değerleri** | Bu denetim yalnız kaynak kodu okur. Canlı sunucudaki `.env` / Dokploy / konteyner env'ine erişim yok. `TENANT_NOTIFICATIONS_ENABLED`, `SMTP_HOST`, `CRON_ENABLED`, `NODE_ENV`, `JWT_SECRET`, `ALLOWED_ORIGINS`, `BACKEND_URL`, `UPLOAD_DIR` — **hepsi PO tarafından doğrulanmalı.** Hızlı teyit: `GET /health` → `env` alanı (`server.ts:55`) |
| **Frontend'in "davet gönderildi" / "mail gönderildi" metinleri** | Frontend `src/` bileşenleri bu turda metin düzeyinde taranmadı. Kullanıcıya yanlış vaat verilip verilmediği **TEYİT GEREK** |
| **`node_modules/`, `dist/`** | Kapsam dışı (üçüncü taraf / türetilmiş) |
| **`docs/` ve `CLAUDE.md` içerikleri** | Belge iddiaları kod kanıtı sayılmadı. Yalnız D.3'te belge iddiası koda karşı sınandı (doğrulandı) |
| **`/home/user/menti-mentor-v2/scripts/`** | Env taraması bu dizini kapsamadı — küçük olasılıkla ek değişken içerebilir |
| **Dokploy / hosting platformu konfigürasyonu** | Repoda yok. `.env.example:52`'de "Dokploy persistent volume" atfı var ama platform konfigürasyonu repoda bulunmuyor — **PO teyit etmeli** (özellikle `UPLOAD_DIR` volume mount'u, D.5-3) |
| **Ters proxy / nginx / TLS terminasyonu** | Repoda yok. `trust proxy` ayarının gerekip gerekmediği (D.4-3) buna bağlı — **TEYİT GEREK** |
| **`.env` (gerçek dosya)** | Repoda yok (`.gitignore`'da) — doğru davranış |
| **Replika/ölçekleme topolojisi** | `docker-compose.yml`'de tek instance. Çok replikalı çalışma cron çift-koşma (D.2b-4) ve in-memory rate limit (D.4-1) sorunlarını doğurur — **PO teyit etmeli** |

---

### EN YÜKSEK ÖNCELİKLİ 5 BULGU (özet)

1. **D.2c-1 (KRİTİK):** `SMTP_HOST` boşsa **tüm e-postalar sessizce atılır**; çağıran katman her durumda başarı görür (`emailService.ts:38-41`). Şifre sıfırlama dahil. `docker-compose.yml:52` boş varsayılana izin veriyor.
2. **D.2a-1 (YÜKSEK):** `TENANT_NOTIFICATIONS_ENABLED` varsayılan `false` → kurum **onay/ret/düzeltme** bildirimleri hiç gitmiyor; `.env.example`'da hiç anılmıyor → operatör habersiz.
3. **D.4/1 (KRİTİK desen):** `config.ts:16` kaynak koda gömülü **fallback JWT secret** var; tek koruma `NODE_ENV==='production'` kontrolüne bağlı.
4. **D.5-3 (YÜKSEK):** `docker-compose.yml`'de backend için **kalıcı volume yok** → `UPLOAD_DIR` varsayılanda kalır, her deploy'da kullanıcı avatarları silinir.
5. **D.5-2 (YÜKSEK):** Compose backend'e **`BACKEND_URL` geçirmiyor** → `backendBaseUrl` yanlışlıkla `FRONTEND_URL` olur → avatar URL'leri ve KVKK unsubscribe linki kırılır.

---

## 3. ⭐ ŞÜPHE → SONUÇ (dört şüphe, tek tek, kanıtla)

### (a) "Hata izleme servisi yok gibi" → **DOĞRULANDI**, ama şüphe yanlış yerden bakıyordu

**Kanıt:** 19 terim × 2 repo × `grep -rniE` → 2 eşleşme, **ikisi de yanlış-pozitif** (`adminController.ts:711` `noteLength` içindeki `oteL`; bir araştırma yazısındaki "LogRocket" atfı). Lockfile doğrulaması: `@opentelemetry` kurulu paket **0/0**; ikisi de yalnız Prisma/Next.js'in opsiyonel peer bildirimleri. `docker-compose.yml:41-64`'te hiçbir `*_DSN`/`SENTRY_*`/`APM_*` yok.

**⚠️ Ama şüphenin çerçevesi eksikti.** Asıl sorun "Sentry kurulu değil" değil; **kurulu olan kendi altyapımızın teşhise yetmemesi**:
- Hata **DB'ye yazılıyor** (`logger.ts:23`) ve 90 gün saklanıyor — bu iyi.
- Ama kayıtta **endpoint/kullanıcı/kurum yok** (`errorHandler.ts:11`, `_req` kullanılmıyor) ve **stack hiçbir arayüzden okunamıyor** (`platformController.ts:189` `select`'inde `meta` yok; tek okuyabilen uç `systemLogController.ts:28` frontend'den **hiç çağrılmıyor**).
- **Süreç çöküşü hiçbir yere yazılmıyor** (`uncaughtException`/`unhandledRejection` handler'ı `grep` → 0) ve `restart: unless-stopped` ile sessizce yeniden başlar.

⇒ **Doğru ifade: "hata sayacımız var, hata kaydımız yok."** Dış servis şart değil; E1+E2+E3'ün kapatılması (isteğin URL'sini ve `userId`/`tenantId`'sini `meta`'ya yazmak, `meta`'yı PII-filtreli biçimde panele açmak, iki satırlık process handler) mevcut altyapıyı teşhis edilebilir hâle getirir.

### (b) "Düzenli yedek yordamı yok gibi" → **DOĞRULANDI**

**Kanıt:** 17 iki-dilli terim × 2 repo × 7 dizin ailesi → `pg_dump`/`pgdump`/`pg_restore` **0 eşleşme**; CI'larda `schedule:` **0**; üç `package.json`'da yedek script'i **0**; compose'da backup servisi/volume **0**; `cronScheduler.ts`'teki 8 işin **sıfırı** yedek alıyor.
**Buna karşılık iki otomatik SİLME cron'u var** (`cronScheduler.ts:411-413`, `:421-423`).

**Nüans (KURAL 15 — kısmi kapatma yapılmadı):** *tek-tablo* yedeği gerçek ve iki kez uygulanmış bir yordamdır (`07-oturum-gunlugu.md:51`, satır-sayısı doğrulamalı). Eksik olan **bütün-DB yedeği** ve **restore provası** — ikincisi projenin kendi kaydıyla *"DENENMEDİ"* (`07-oturum-gunlugu.md:65`).

### (c) "Rate limit kapsamı dar gibi (23 route dosyasından 6'sında referans)" → **ÇÜRÜTÜLDÜ** — ve yerine daha kötü bir bulgu geçti

**Şüphe yanlıştı:** limit dar değil, **global**. `server.ts:81` `app.use('/api', generalRateLimiter)` → **189 ucun tamamı** kapsanıyor. "Rate limit hiç yok" denebilecek uç teknik olarak **1 tane** (`GET /health`, `/api` dışı) + `/uploads` statik servisi.

**Ama bu bir savunma değil (🔴 C.1-d-1):** kova anahtarı doğrulanmamış bir **istek başlığıdır** — `rateLimiter.ts:36` `req.header('X-Tenant-Id')?.trim() ?? 'anon'`. Saldırgan her istekte rastgele bir `X-Tenant-Id` göndererek **her seferinde taze kova** alır ⇒ global limit **sınırsız atlatılır**. Doğrulama (`tenant.ts:37`) limitçiden SONRA çalıştığı için sahte tenant 401 alsa bile istek DB'ye (`getCachedTenant`) ulaşmış olur. Yan etki: `counters` Map'i saldırganın istediği hızda şişer (`rateLimiter.ts:13,28-33` — temizlik 5 dakikada bir) ⇒ hafif bellek DoS.

**Ve ikinci kat (🔴 C.1-d-2):** `app.set('trust proxy')` **yok** (`trust proxy|trustProxy|X-Forwarded-For|x-forwarded` × `src/`+`Dockerfile` → **0 sonuç**). Üretimde uygulama ters vekil arkasında olduğundan `req.ip` (`rateLimiter.ts:52-54`) **vekilin tek IP'sidir** ⇒ **9 IP-bazlı limitçinin tamamı bozuk**: tüm meşru kullanıcılar tek kovayı paylaşır (`loginRateLimiter` 10/dk ile tüm kurum kilitlenebilir = kendi kendine DoS), saldırgan ile kurban aynı kovada. ⚠️ Ciddiyeti üretimdeki gerçek `req.ip` değerine bağlı — **TEYİT GEREK**.

⇒ **Doğru ifade: "limit geniş ama iki temel varsayımı üretimde tutmuyor."**

### (d) "13 ortam değişkeni belgelenmemiş" → **11 DOĞRULANDI · 1 KISMEN ÇÜRÜDÜ · 1 ÇÜRÜDÜ**

| # | Değişken | Hüküm | Kanıt |
|---|---|---|---|
| 1 | `CRON_ENABLED` | ✅ DOĞRULANDI | `cronScheduler.ts:31`; `.env.example`'da 0 |
| 2 | `JWT_EXPIRES_IN` | ✅ DOĞRULANDI | `config.ts:58` → `jwtAuth.ts:25` |
| 3 | `RATE_LIMIT_RPM` | ✅ DOĞRULANDI | `rateLimiter.ts:10` |
| 4 | `PLATFORM_AUTH_RPM` | ✅ DOĞRULANDI | `rateLimiter.ts:49` |
| 5 | `PLATFORM_READ_RPM` | ✅ DOĞRULANDI | `rateLimiter.ts:50` |
| 6 | `AVATAR_UPLOAD_RPM` | ✅ DOĞRULANDI | `rateLimiter.ts:82` |
| 7 | `SMTP_SECURE` | 🟡 **KISMEN ÇÜRÜDÜ** | `.env.example:31-32`'de **yorum satırı** olarak belgeli (`# SMTP_SECURE="true"`); kasıtlı — 465 için otomatik türetiliyor (`config.ts:76-78`) |
| 8 | `TENANT_CACHE_TTL_MS` | ✅ DOĞRULANDI | `tenantCache.ts:16` |
| 9 | `TENANT_NOTIFICATIONS_ENABLED` | ✅ DOĞRULANDI — **en riskli madde** | `config.ts:88` → `tenantNotifications.ts:116` |
| 10 | `LLM_PROVIDER` | ✅ DOĞRULANDI **ve ÖLÜ** | `config.ts:65`, 0 tüketici |
| 11 | `NODE_ENV` | ✅ DOĞRULANDI — ama canlı risk düşük | `Dockerfile:39` + `docker-compose.yml:43` set ediyor; **PO teyit etmeli** |
| 12 | `PORT` | ✅ DOĞRULANDI — etkisiz | `docker-compose.yml:49` `PORT: 3000` |
| 13 | `PLATFORM_ADMIN_EMAIL` | ❌ **ÇÜRÜTÜLDÜ** | **`.env.example:8`'de VAR** (üstünde 2 satır açıklamasıyla, `:6-7`) |

⚠️ **Şüphe listesi eksikti — aynı durumda 7 değişken daha var:** `REGISTER_RATE_RPM`, `SUSPICION_RATE_RPM`, `INVITE_JOIN_RATE_RPM`, `CHECK_SLUG_RATE_RPM`, `DATA_EXPORT_RATE_RPM`, `ACCOUNT_DELETE_RATE_RPM`, `SELF_SERVE_REGISTER_RATE_RPM` — hepsi `rateLimiter.ts`'te aktif, hiçbiri `.env.example`'da yok.
⇒ **Gerçek sayı: `src/` runtime'da kullanılıp `.env.example`'da hiç geçmeyen 18 değişken** (+`SMTP_SECURE` yalnız yorumda = 19'uncu, kısmi). 13 sanılıyordu.

⚠️ **Ters yönde bir bulgu da var — `.env.example` YANILTICI olan 3 satır taşıyor:**
- `.env.example:19-20` `OPENAI_API_KEY` / `OPENAI_MODEL` — **tamamen ölü** (`config.ts:66-67`, 0 tüketici), ama blok `# LLM (opsiyonel — ileride kullanılabilir)` başlığıyla sunuluyor ⇒ operatörü canlıya **gerçek bir API anahtarı koymaya davet ediyor**: hiçbir işe yaramayan ama `docker inspect`/log üzerinden okunabilen bir sır.
- `.env.example:48` `INVITATION_TOKEN_EXPIRY="90d"` — **ölü ayar** (`config.ts:100`, 0 tüketici). Davet token'ı `selfServeController.ts:571` ve `:632`'de **sabit `'30d'`** ile imzalanır. Operatör `180d` yazsa bile token 30 gün yaşar.

---

## 4. ⭐ RİSK SIRALAMASI — "gerçek kullanıcı geldiğinde ne kadar canını yakar"

> Sıralama ölçütü: (kullanıcıya görünen zarar) × (gerçekleşme olasılığı) × (fark edilmeme süresi). **Kim çözer** sütunu ayrımı: **AJAN** = kod işi, bu repoda yapılır · **PO** = hesap/sunucu/panel işi, kod değiştirerek çözülemez.

| # | Bulgu | Ne olur (somut senaryo) | Kim çözer | Efor | Ürün kararı? |
|---|---|---|---|---|---|
| **1** | 🔴 **Avatar dosyaları için kalıcı disk yok** (`docker-compose.yml`'de backend `volumes:` anahtarı yok · `UPLOAD_DIR` tanımsız · `Dockerfile`'da `chown` yok) | Kullanıcı profil fotoğrafını yükler, günler sonra bir deploy olur, **fotoğraf kaybolur** ama `User.avatarUrl` DB'de kalır → profilde kırık görsel. Hiçbir hata fırlamaz, hiçbir log yazılmaz; **kullanıcı şikâyet edene kadar kimse bilmez.** DB restore ile düzeltilemez. Ayrıca aynı kök neden (uid 1001'in `/app`'te yazma izni yok) 2026-09-09 "Beklenmedik sunucu hatası" vakasının **muhtemel açıklaması** | **PO** (Dokploy volume mount + klasör sahipliği) · AJAN yalnız `docker-compose.yml`+`Dockerfile`'a volume/`chown` ekleyebilir | **S** | ❌ hayır — zaten 🔴 ÇIKIŞ BLOKERİ ilan edilmiş (`G8-01:33`) |
| **2** | 🔴 **`SMTP_HOST` boşsa tüm e-postalar sessizce atılıyor** (`emailService.ts:38-41` `return`; çağıran katmanın hepsi `void`/`.catch()` — dönüş değeri hiç kontrol edilmiyor) | Kullanıcı şifresini unutur → "E-postanızı kontrol edin" görür → **mail hiç gelmez** → hesabına erişimini kalıcı kaybeder. Aynı sessizlik: kayıt onayı, randevu talebi (mentör haberdar olmaz, API `201` döner), yeni mesaj, admin bildirimleri. Tek belirti `SystemLog`'da bir `warn` satırı | **PO** (canlı SMTP değerleri) + **AJAN** (açılışta `transporter.verify()`, `/health`'e SMTP durumu, gönderim başarısızlığını çağırana bildirme) | **M** | ❌ hayır |
| **3** | 🔴 **Rate limit iki temel varsayımı tutmuyor** — global limitin anahtarı saldırgan kontrollü başlık (`rateLimiter.ts:36`) + `trust proxy` yok ⇒ 9 IP limitçisi vekil arkasında bozuk | (a) Saldırgan rastgele `X-Tenant-Id` ile global limiti sınırsız atlatır, `counters` Map'ini şişirir. (b) Ters vekil arkasında **tüm kullanıcılar tek IP kovasını paylaşır** → bir kişinin 10 hatalı girişi **tüm kurumu 1 dakika kilitler** (kendi kendine DoS). Ve bunların üstüne: `POST /api/auth/forgot-password` public + her istekte kurbanın adresine mail → **mail-bomb** | **AJAN** (`app.set('trust proxy', 1)` + genel limitçiyi doğrulanmış kimliğe/IP'ye bağlamak) | **S** (trust proxy) / **M** (anahtar mimarisi) | ❌ hayır — teknik karar |
| **4** | 🔴 **`TENANT_NOTIFICATIONS_ENABLED` varsayılan `false`** ve hiçbir deploy dosyasında geçmiyor (`config.ts:88`) | Platform admini bir STK başvurusuna **"düzeltme iste"** der, gerekçeyi yazar, panelde **başarı görür** — ama kuruma hiçbir şey gitmez. Başvuru `CORRECTION_REQUESTED` durumunda **süresiz askıda kalır**; kurum ne istendiğini bilmediği için asla düzeltmez. Aynısı onay ve ret için de geçerli (`platformController.ts:298, 325, 371`) | **PO** (canlı değeri `'true'` yapmak) + **AJAN** (`.env.example`'a eklemek; panelde "gönderim kapalı" uyarısı) | **S** | 🟡 **EVET — soru §4.1'de** |
| **5** | 🔴 **Süreç çöküşü + 500 hataları teşhis edilemiyor** (E1+E2+E3: kayıtta endpoint/kullanıcı yok · stack hiçbir arayüzde yok · `uncaughtException` handler'ı yok) | Canlıda bir uç patlar. Panelde 40 adet birbirinin aynısı `ERROR / HTTP / "Beklenmedik sunucu hatası"` satırı görürsünüz; **hangi ekranın, hangi kurumun, hangi kullanıcının patladığını ayırt edemezsiniz.** Süreç tamamen çökerse panelde **hiç görünmez** (sayaç artmaz), container sessizce restart eder. Teşhis için DB'ye elle SQL atmak gerekir | **AJAN** | **M** | 🟡 **EVET — soru §4.2'de** (stack'i panele açmak KVKK kararıdır) |
| **6** | 🔴 **IDOR: `POST /api/mentors/:mentorId/visibility-optin` sahiplik kontrolü yok** (`userRoutes.ts:89-93`, `requireSelfOrAdmin` YOK; controller `matchingController.ts:124-190`'da `req.auth.userId === mentorId` karşılaştırması hiç yok) | Aynı kurumdaki Mentör A, Mentör B'nin ID'sini yazıp **B adına** bir menti için opt-in kaydı oluşturabilir/ezebilir. `initiatedBy:'MENTOR'` sabit yazıldığı için denetim izinde **B'nin kendi eylemi gibi görünür**. Mentör ID'leri `GET /api/users?role=MENTOR` ile serbestçe toplanabilir. Komşu uçlar (`:84, :100, :152, :161`) bu korumayı taşıyor — tutarsızlık | **AJAN** — düzeltme tek satır: `requireSelfOrAdmin('mentorId')` | **S** | ❌ hayır |
| **7** | 🔴 **6 saatten eski veri kaybına karşı sıfır koruma** + haftalık silme cron'u pencereyle çakışıyor | `runWeeklyPurge` **Pazar 03:00 UTC** siler (`cronScheduler.ts:414-416`). Pazartesi mesai başında bir sorun fark edilirse aradan **~27 saat** geçmiştir → Neon penceresi kapanmıştır, **geri dönüş yok.** Bu tam olarak F.13:780'de yazılan senaryodur ve onu bir insan değil **kodun kendisi her hafta tetikliyor** | **PO** (Neon ücretli plan / sunucu-tarafı yedek) + **AJAN** (SEÇENEK A/B script'leri) | **M** (A+B) / **L** (gerçek yedek + restore provası) | 🟡 **EVET — soru §4.3'te** |
| **8** | 🔴 **Docker healthcheck yalan söyleyebilir** — `/health` DB'ye hiç bakmaz (`server.ts:53-59`) ama healthcheck onu kullanıyor (`docker-compose.yml:67`) ve frontend `depends_on: service_healthy` ona güveniyor | Postgres düşer. `/health` yine `{ok:true}` döner → container **"healthy"** görünür → orchestrator restart etmez, kimse uyarılmaz. Site tamamen kullanılamazken altyapı "her şey yolunda" der | **AJAN** (`/health`'e `SELECT 1` eklemek veya ayrı `/readyz`) | **S** | ❌ hayır |
| **9** | 🟡 **k-anonimlik KPI/analytics uçlarında yok** — `applyKAnonymity` (`mask.ts:70`) **yalnız 1 uçta** çağrılıyor (`userController.ts:140`) | 4 kişilik bir kurumda `GET /api/admin/kpi` → `usersByRole = {MENTOR:1, MENTI:3}`; kurumu tanıyan admin için **tek mentörün kimliği kesindir**. `GET /api/platform/tenants/:id/analytics` → `discDistribution:[{discType:'D',count:1}]` → **o kişinin DISC tipi ifşa olur** (DISC, CLAUDE.md'de PII). Frontend'de de suppression yok (`admin/kpi/page.tsx:44-49` ham basıyor). Araç hazır, uygulanmamış | **AJAN** | **S** | ❌ hayır — CLAUDE.md kuralı zaten yasaklıyor |
| **10** | 🟡 **Fallback JWT secret kaynak koda gömülü** (`config.ts:16`), tek koruma `NODE_ENV==='production'` kontrolüne bağlı | `NODE_ENV` production'a set edilmezse **7 koruma birden sessizce kapanır**: 3 fail-fast guard (`JWT_SECRET`, `PLATFORM_ADMIN_KEY`, `DEFAULT_TENANT_ID`) + 4 cookie `secure` bayrağı (platform admin çerezi dâhil). Sistem, **GitHub'da okunabilen bir secret'la** JWT imzalar → herkes geçerli admin token'ı üretebilir. Azaltıcı: `Dockerfile:39` + `docker-compose.yml:43` ikisi de `NODE_ENV=production` set ediyor ✅ | **AJAN** (fallback'i tamamen kaldır) + **PO** (canlı `NODE_ENV` teyidi: `GET /health` → `env` alanı) | **S** | ❌ hayır |
| **11** | 🟡 **`POST /api/meetings/reminders/send` sınırsız toplu mail** (`feedbackController.ts:189-203` — görüşme başına 2 mail, döngü, batch/cooldown yok) | Tek bir kurum yöneticisi butona arka arkaya basarak **tüm kurumu spam'ler**; SMTP kotası tükenir, gönderen domain itibarı zarar görür, sonraki gerçek mailler spam'e düşer | **AJAN** (cooldown + batch) | **S** | ❌ hayır |
| **12** | 🟡 **Yedek tablolar birikiyor ve şemada yok** — S26 **21 gündür**, S37 **11 gündür** bekliyor; 4 tane daha planlı | `migrate diff` bunları "şemada olmayan tablo" görür. ⚠️ `00-KARAR-TAKIP.md:189`'un kendi uyarısı: *"`migrate dev`/`db push` onu **fazlalık görüp DROP etmek isteyebilir**"* ⇒ **koruma aracının kendisi, koruduğu veriyi kaybetme riski taşıyor.** Tek savunma `db push --accept-data-loss` yasağı — bir insan kuralı, kod muhafızı değil | **PO** (DROP kararı) + **AJAN** (SEÇENEK B envanter script'i) | **S** | 🟡 **EVET — soru §4.4'te** |
| **13** | 🟡 **`BACKEND_URL` backend'e geçirilmiyor** (`docker-compose.yml` onu yalnız OAuth redirect URI'ları ve frontend build arg'ı üretmekte kullanıyor) | `config.ts:49` `backendBaseUrl = FRONTEND_URL` olur ⇒ **avatar public URL'leri ve KVKK zorunlu unsubscribe linki frontend domain'ine işaret eder** → `/uploads/...` ve `/api/tenants/unsubscribe` **404**. KVKK'nın zorunlu kıldığı abonelikten çıkma linki çalışmaz | **AJAN** (compose'a ekle) + **PO** (canlı teyit) | **S** | ❌ hayır |
| **14** | 🟡 **`NEXT_PUBLIC_API_URL` build-time gömülüyor** (`frontend/Dockerfile:16-19`), runtime'da değiştirilemez | Build `--build-arg` olmadan yapılırsa `http://localhost:3000` **kalıcı olarak** bundle'a gömülür ⇒ canlı site tüm API çağrılarını localhost'a yapar, **hiçbir şey çalışmaz** ve frontend'de error boundary/log olmadığı için (E10) **hiçbir iz kalmaz** | **PO** (build'in hangi `BACKEND_URL` ile yapıldığı) | **S** | ❌ hayır |
| **15** | 🟡 **CLAUDE.md'nin "kasıtlı public uç" listesi kodla uyuşmuyor** — listede olmayan **11 public uç** var | Belge beyanı yanlış olduğu için sonraki denetimler **gerçek bir fazlalığı gözden kaçırır**. Özellikle: `POST /api/tenants/self-serve/register` public bir uç olarak **kalıcı kurum + yetkili ADMIN hesabı** yaratıyor ve listede hiç geçmiyor | **AJAN** (belge düzeltmesi — bu tur kapsam dışı) | **S** | ❌ hayır |
| **16** | 🟡 **`GET /api/users/:id/export` rate limitsiz** — ikizi `/me/data-export` 5/dk ile korunuyor (`userRoutes.ts:187` vs `:197`) | Kullanıcı `:id`'ye kendi ID'sini yazarak **limitsiz** aynı ağır çok-tablolu KVKK export'unu koşturabilir ⇒ `dataExportRateLimiter` fiilen atlatılır, DB baskı altına alınabilir | **AJAN** | **S** | ❌ hayır |
| **17** | 🟡 **`CRON_ENABLED=false` yazılırsa 8 iş sessizce durur** (varsayılan AÇIK ✅, tek belirti konteyner log'unda tek satır) | KVKK 90 gün/3 yıl imhası durur (saklama politikası ihlali), anlaşma yenileme istemi doğmaz (taraflar bitişi fark etmez), geri bildirim hatırlatması gitmez → NPS verisi kurur → algoritma tuning'inin girdisi de kurur (zincirleme) | **AJAN** (`.env.example` + `/health`'e cron durumu) | **S** | ❌ hayır |
| **18** | 🟡 **`RATE_LIMIT_RPM` 100/dk/tenant** — anahtar tenant olduğu için tüm kurum paylaşıyor | 200 kişilik bir STK'da dashboard açan birkaç kullanıcı limiti doldurabilir → **meşru kullanıcılar 429 alır**. (C.1-d-1 ile birlikte tuhaf bir denge: saldırgan atlatabiliyor, meşru kullanıcı takılıyor) | **AJAN** | **S** | ❌ hayır |
| **19** | 🟡 **`mentorVisibilityEnabled` hiçbir akışta zorlanmıyor** — 2 isabet, ikisi de pasif (`schema.prisma:323` tanım, `userController.ts:183` salt okuma); `matching.ts` filtrelerinde yok | Ürün niyeti *"mentör kendini havuzdan çekebilsin"* idiyse bu özellik **fiilen yok**. Frontend'de de 0 isabet ⇒ "frontend guard yeterli değil" değil, **hiçbir katmanda yok** | **PO** (niyet) → sonra AJAN | **S** | 🟡 **EVET — soru §4.5'te** |
| **20** | 🟡 **Frontend'de sıfır gözlemlenebilirlik** — error boundary **0**, `not-found.tsx` **0**, tüm frontend'de 1 console çağrısı | Bir React render hatası = **beyaz ekran**; kullanıcıya mesaj yok, hiçbir yerde kayıt yok. Kullanıcı "site açılmıyor" der, backend loglarında hiçbir şey görünmez | **AJAN** | **S** | ❌ hayır |

### 4.1 — SORU (kart AÇILMADI, tur kapsamı gereği): kurum bildirimleri açılsın mı?
`TENANT_NOTIFICATIONS_ENABLED` bugün kapalı görünüyor (canlı değer **PO teyit etmeli**). Açılırsa kurum yöneticileri **onay/ret/düzeltme** maillerini alır — ama ret ve düzeltme metinleri kuruma giden, **hukuki sonucu olabilecek** metinlerdir ve bu turda içerikleri denetlenmedi. Soru: *bildirimler açılsın mı, yoksa önce metinler gözden geçirilsin mi?* Açılmazsa 4 no'lu risk sürer.

### 4.2 — SORU: hata stack'i platform paneline açılsın mı?
`meta` bugün KVKK gerekçesiyle `select` dışında (`platformController.ts:182-185`) — **niyet doğru**. Ama yan etkisi, hatayı teşhis etmenin tek yolunun DB'ye elle SQL atmak olması. Soru: *stack'i platform admin'e (PII-filtreli biçimde) göstermek kabul edilebilir mi, yoksa teşhis DB erişimiyle mi yapılsın?* Ara yol: `meta`'ya istek bağlamını (**URL + `userId` + `tenantId`**, e-posta/ad **asla**) yazmak — bu tek başına E1'i kapatır ve yeni bir PII yüzeyi açmaz.

### 4.3 — SORU: gerçek yedek nereye yazılsın?
SEÇENEK C (GitHub Actions artifact) **KVKK açısından "üçüncü ülkeye veri aktarımı"** sayılabilir; proje zaten bir aktarım envanteri tutuyor (`kvkk-veri-aktarim-envanteri-2026-08-25.md`). Alternatifler: (i) Dokploy volume'üne yazan cron — veri VPS'te kalır, (ii) Neon ücretli plan — pencere 6 saat → 30 gün, kod işi yok. Soru: *hangisi?* — üçü de farklı maliyet/hukuk profiline sahip.

### 4.4 — SORU: iki yedek tablo düşürülsün mü?
S26 (`MentorshipAgreement_yedek_20260830`, 150 satır) ve S37 (`CertificationOption_yedek_20260909`, 20 satır) canlıda duruyor; ikisi de şemada yok, `migrate dev`/`db push` onları silmek isteyebilir. Soru: *tetikleyici koşul ("regresyonsuz görülünce") gerçekleşti mi, DROP edilsinler mi?* — bu bir DB işlemidir, bulutta yapılamaz.

### 4.5 — SORU: `mentorVisibilityEnabled` ne olacak?
Alan şemada var, varsayılanı `true`, hiçbir akış okumuyor/yazmıyor. **Silme protokolü adım 1 (NİYET) yapılamadı** — bu turda git arkeolojisi kapsam dışıydı. Soru: *mentörün kendini havuzdan çekebilmesi istenen bir özellik mi (→ bağlanmalı), yoksa terk edilmiş mi (→ protokole girmeli)?* ⛔ "Kullanılmıyor" tek başına silme gerekçesi değildir.

---

## 5. ⭐ "ZATEN İYİ" — kontrol edilip sorun çıkmayanlar

> Bu bölüm boş bırakılmaz: neyin sağlam olduğunu bilmek de değerlidir. **44 madde**, dört bölümden derlendi.

### 5.1 — Hata izleme tarafı (A)
1. **Global error handler doğru imza ve doğru sırada** — 4 parametreli (`errorHandler.ts:9-14`), tüm route'lardan sonra (`server.ts:135-137`).
2. **Hata detayı client'a sızdırılmıyor** — `errorHandler.ts:22-24`, `NODE_ENV`'e **bakmaksızın** her zaman jenerik mesaj. `NODE_ENV`'e bağlı OLMAYAN nadir korumalardan biri.
3. **Express 5.2.1 kurulu** (`package-lock.json:2878`) → async controller hataları otomatik error middleware'e taşınıyor; `asyncHandler` yokluğu fiilen hata kaybına yol açmıyor.
4. **Merkezi logger gerçekten merkezî** — 24 dosyada 87 `logger.*` çağrısı, ad-hoc `console.log` yerine tek kapı.
5. **Logger ana akışı asla kırmıyor** — `logger.ts:22-34`, log yazamamak kullanıcı isteğini düşürmez.
6. **SystemLog indeksleri doğru** — `schema.prisma:691-695`, `@@index([level, category, createdAt])` panelin sorgusunu tam karşılıyor.
7. **Log okuma uçları yetkilendirilmiş** — `platformRoutes.ts:39`, `systemLogRoutes.ts:9` → `requirePlatformAdmin`; tenant ADMIN'i cross-tenant log göremez.
8. **Log okumada PII koruması bilinçli ve belgeli** — `platformController.ts:95-97, 182-185`. (Yan etkisi E2'dir; niyet doğru.)
9. **KVKK denetim izi (AUDIT) çalışıyor** — `platformAudit.ts:20-36`, PII yazmama kuralı `:11-13`'te yazılı, panelde ayrı filtre.
10. **Güvenlik olayları loglanıyor** — `tenant.ts:67` cross-tenant penetrasyon girişimi, `platformController.ts:41` başarısız platform login (IP'li).
11. **Log saklama süresi otomatik yönetiliyor** — `gdprService.ts:359-368` + `cronScheduler.ts:86-90`, tablo sınırsız şişmiyor.
12. **Graceful shutdown düzgün** — `server.ts:152-171`, 10 sn timeout, `server.close` + `prisma.$disconnect`.
13. **requestLogger hassas veri sızdırmıyor** — `requestLogger.ts:3-4, 18-27`: `Authorization` loglanmıyor, yalnız method/url/status/ms/tenantId.
14. **Ölü avatar dosyası hatası loglanıyor** — `avatarStorage.ts:100-102`, ENOENT ayrılıp diğerleri `logger.warn`'a düşüyor.

### 5.2 — Yedek tarafı (B)
15. **Migration-öncesi yedek tablo kuralı GERÇEK ve İKİ KEZ UYGULANDI** — satır sayısı doğrulamasıyla (`07-oturum-gunlugu.md:51`, `09-DURUM.md:16`). Çoğu projede bu bile yoktur.
16. **Yedek/silme koşulu BİREBİR aynı tutulmuş** — `.sql:14`. "Yedeklediğimle sildiğim aynı satırlar mı" sorusunu yapısal olarak çözer.
17. **`IF NOT EXISTS` bilinçli REDDEDİLMİŞ** — `.sql:12-13`: *"tablo zaten varsa sessizce atlanır → YEDEKSİZ silmeye yol açar"*. Sessiz başarısızlığın veri kaybına dönüşmesini gören olgun muhakeme.
18. **Geri alma SQL'i yazılı** — `.sql:29`. Denenmemiş ama düşünülmüş.
19. **F.13 riski dürüstçe adlandırılmış** — `00-KARAR-TAKIP.md:775` *"o işlemler sandığımızdan riskliydi"*. Geriye dönük öz-eleştiri nadirdir.
20. **Kaynak kalitesi işaretlenmiş** — `:779` *"Kaynak: PO beyanı — ajan doğrulamadı, panel erişimi yok."*
21. **Avatar volume riski TESPİT EDİLMİŞ, ÖLÇÜLMÜŞ, 🔴 BLOKER ilan edilmiş** — `G8-01:23-33`, kod-teyidi dâhil. Bilinmeyen değil, bilinen ve iletilmiş bir risk.
22. **Kod içinde uyarı bırakılmış** — `config.ts:106`, `.env.example:51`: *"Deploy'da SİLİNMEMESİ için kalıcı disk olarak mount edilmeli"*.
23. **S26/S37 drift riskini ÖNCEDEN görmüş** — `00-KARAR-TAKIP.md:189`. Çoğu ekip bunu ancak veri kaybettikten sonra öğrenir.
24. **`purgeExpiredData` keyfi süre uydurmamış** — `gdprService.ts:376-378`, `Message` saklama süresi avukat metnini bekliyor. Kod ↔ hukuki metin tutarlılığı gözetilmiş.
25. **CI canlı Neon'a değil ephemeral Postgres'e bağlanıyor**, üç ayrı guard'la (`assertTestDatabase.ts`, e2e Neon guard'ı, `TEST_DATABASE_URL`). 2026-07-13'te **gerçekten yaşanmış** bir risk yapısal olarak kapatılmış.

### 5.3 — Koruma tarafı (C)
26. **Rate limitçiler test/dev'de devre dışı DEĞİL** — `NODE_ENV` `src/middleware/` içinde hiç geçmiyor (10 isabetin tamamı denetlendi). Eşikler **çağrı anında** okunuyor → test izolasyonu limiti kapatmadan sağlanıyor. **Yaygın ve tehlikeli bir anti-desenden kaçınılmış.**
27. **Avatar yükleme altı katmanlı — denetimdeki EN İYİ korunan yüzey:** boyut 5 MB + tek dosya (`avatarUpload.ts:20`) + MIME ön-filtre (`:16,21-27`) + **magic-byte** doğrulaması (`avatarStorage.ts:26-48`) + **SVG bilinçli reddi** (XSS vektörü) + kullanıcı adından bağımsız `<userId>-<uuid>.<ext>` dosya adı (`:51-53`) + silmede `basename`+mutlak-yol **ikinci** doğrulaması (`:71-80`) + `nosniff`/CSP-sandbox/`index:false`/`dotfiles:deny` (`server.ts:72-76`) + rate limit doğru sırada (`userRoutes.ts:49-55` — limitçi `requireAuth`'tan **sonra**, çünkü `req.auth.userId`'ye ihtiyaç duyuyor). **MIME'ın sahtelenebileceği kodun kendi yorumunda yazılı** (`avatarUpload.ts:8-9`).
28. **Global gövde boyut sınırı** — `express.json({limit:'1mb'})` (`server.ts:50`).
29. **Global `omit: { user: { password: true } }`** (`db.ts:52`) — `select`siz hiçbir sorgu parola hash'ini response'a taşıyamaz.
30. **Cross-tenant token reddi** — `tenant.ts:66-77`, WARN log + 403.
31. **Aktif üyelik kapısı** — `tenant.ts:82-97`; RLS'in `findUnique`'i filtrelememesi burada **bilinçli ve doğru** kullanılmış.
32. **Platform token domain ayrımı** — `platformAuth.ts:27` çift kontrol (`isPlatformAdmin` claim **ve** `aud === 'platform'`); tenant token'ı platform ucunda geçerli sayılamaz.
33. **E-posta numaralandırma karşıtı desenler** — `register` var/yok aynı 201 (`authController.ts:180-184`), `forgot-password` tek jenerik mesaj (`:522, :550`).
34. **Token hijyeni** — reset token DB'de SHA-256 hash'li (`authController.ts:93-98`), refresh rotasyonlu (`:473-483`), reset sonrası tüm refresh token'lar iptal (`:586`).
35. **Feedback karşılıklı görünürlüğü BACKEND'de zorlanıyor** — `feedbackController.ts:126-153`, alan kırpma sunucu tarafında, veri response'a **hiç girmiyor**. Örnek desen.
36. **PII maskeleme BACKEND'de** — `platformTenantController.ts:198` `emailMasked`; frontend ham e-postayı **hiç almıyor**. `mask.ts:5` ilkeyi yazmış.
37. **k-anonimlik mentör sayımında çift katmanlı** — backend `userController.ts:140` + `mask.ts:52,70-75` (eşik 3, gerçek sayı response'a hiç konmuyor) ve frontend `menti/page.tsx:189` (aynı eşik). **Görevde "frontend-only" sanılan örnek, kod gerçeğiyle çürüdü.**
38. **Rol guard'ı hem frontend hem backend'de** — `(admin)/layout.tsx:79` (dosyanın kendi yorumu bunu *"KABA"* diye niteliyor) + `adminRoutes.ts:40` `requireRole('ADMIN')` **28 ucun tamamında**. Doğru "defense in depth".
39. **Eşik/cevap anahtarı frontend'den backend'e TAŞINMIŞ** — `types/discTest.ts:5-11` eski `CORE_COMPLETION_THRESHOLD = 20` hardcode'unun kaldırılışını açıkça anlatıyor; aynı desen sertifikada (`admin/certification/page.tsx:85`, `types/certification.ts:47`). **Eski bir denetim bulgusu bilinçli olarak kapatılmış.**
40. **Conversation katılımcı-bazlı yetki, yetkisizde 404** (403 değil) → varlık ifşası engelli; tenant-kapsam dışı bırakılması `db.ts:34-38`'de gerekçelendirilmiş (shared-pool'da taraflar farklı tenant'ta olabilir).
41. **Tenant izolasyonunda tespit edilen eksik: YOK** — `findUnique({where:{id:` deseni 34 controller dosyasında tarandı → 9 isabet, dokuzu da tek tek denetlendi, `tenantId` içermeyen ve elle doğrulanmayan **0 sorgu**.
42. **Kötüye kullanım frenleri** — `nudgeUser` 24 saat/hedef cooldown (`adminController.ts:200-206`), `createReport` tekrar-şikayet ve self-report engelleri (`reportController.ts:21-23, 37-44`), PENDING üye peer havuzunu göremiyor (`userController.ts:46-57`).

### 5.4 — Ortam tarafı (D)
43. **`config.ts` fail-fast guard'ları** — prod'da varsayılan `JWT_SECRET` (`:19-21`) ve `PLATFORM_ADMIN_KEY` (`:26-28`) ile açılışı engelliyor; `DEFAULT_TENANT_ID` prod'da **yasak** (`:12-14`, ters guard — doğru yön). `PLATFORM_ADMIN_EMAIL` için throw yerine warn tercihi **gerekçesiyle** yazılmış (`:34-38`). `.env` yolu hatası riski de yorumla belgelenmiş (`:4-8`: *"tüm config sessizce varsayılanlara düşerdi"*) — tam da bu denetimin konusu olan riski yazar fark etmiş.
44. **Deploy sertleştirmesi** — `docker-compose.yml` `:?` zorunlulukları (`POSTGRES_PASSWORD:21`, `JWT_SECRET:45`, `PLATFORM_ADMIN_KEY:46` — eksikse compose başlamaz); `Dockerfile` root olmayan kullanıcı (`:26-27,38`), çok aşamalı build, `--omit=dev`, `--ignore-scripts`, `NODE_ENV=production` sabit; **CORS wildcard yok** (`server.ts:48-49`, açık liste + `credentials:true` doğru kombinasyon, varsayılan fail-closed); **cookie'lerin üç bayrağı da doğru** (`httpOnly:true` + `sameSite:'strict'` dört cookie'nin hepsinde); `helmet` aktif gerekçeli istisnalarla (`server.ts:43-46`); `/uploads` statik servisinde sertleştirme (`:67-78`). Ayrıca `emailService.ts:20-29` `.local/.test/.invalid/.example` alıcılarını filtreleyerek bounce kirliliğini önlüyor; loglara e-posta adresi yazılmıyor (`emailService.ts:33`, `tenantNotifications.ts:117-121`, `cronScheduler.ts:188-189`); `tests/platformAdminEmail.unit.test.ts:38-82` config guard'larını test ediyor.

---

## 6. ⛔ TARANAMADI — bu denetimin erişemediği yerler (hiçbiri hakkında iddiada bulunulmadı)

> Bulut oturumunda Neon DB, Dokploy paneli ve canlı loglar **yoktur**. Aşağıdakiler **PO'dadır**.

### 6.1 — PO'nun doğrulaması gereken canlı ortam değerleri
Hepsi için hızlı ortak teyit yolu: **`GET /health` → `env` alanı** (`server.ts:55`) `"production"` mu?

| Değişken | Neden kritik | Kanıt/ilgili risk |
|---|---|---|
| `NODE_ENV` | Production değilse **7 koruma birden kapalı** (3 guard + 4 cookie `secure`) | risk #10 |
| `JWT_SECRET` | Set değilse kaynak koda gömülü secret'la imzalanır | `config.ts:16` |
| `TENANT_NOTIFICATIONS_ENABLED` | `'true'` değilse kurum onay/ret/düzeltme mailleri hiç gitmiyor | risk #4 |
| `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` | Biri boşsa **tüm mailler sessizce atılıyor** | risk #2 |
| `UPLOAD_DIR` + Dokploy volume mount'u | Yoksa her deploy'da avatarlar siliniyor | risk #1 |
| `BACKEND_URL` | Yanlışsa avatar URL'leri ve KVKK unsubscribe linki 404 | risk #13 |
| `ALLOWED_ORIGINS` | Set değilse frontend CORS'a takılır (fail-closed). ⚠️ `.split(',')` **trim yapmıyor** (`server.ts:48`) → `"a.com, b.com"` yazılırsa ikinci origin hiç eşleşmez | `server.ts:48-49` |
| `CRON_ENABLED` | Varsayılan AÇIK ✅; teyit için konteyner log'unda `[CRON] Haftalık görevler zamanlandı…` (`cronScheduler.ts:445-446`) satırı aranmalı | risk #17 |
| Frontend build'inin `BACKEND_URL`'ü | Yanlışsa site tamamen çalışmaz ve **hiç iz bırakmaz** | risk #14 |

### 6.2 — DB'den doğrulanması gerekenler
| # | Sorgu | Ne öğreniriz |
|---|---|---|
| 1 | `SELECT "createdAt", level, category, message, meta FROM "SystemLog" WHERE level='ERROR' AND "createdAt" >= '2026-09-09' AND "createdAt" < '2026-09-10' ORDER BY "createdAt";` | `meta.stack` içinde `EACCES`/`ENOSPC`/`ensureUploadDir` geçiyor mu → **A.3'ün EACCES teşhisini kesinleştirir** |
| 2 | `SELECT level, category, count(*) FROM "SystemLog" GROUP BY 1,2;` | ERROR'ların ne kadarı jenerik `'Beklenmedik sunucu hatası'` → E1'in pratik ağırlığı |
| 3 | `SELECT table_name FROM information_schema.tables WHERE table_name LIKE '%_yedek_%';` | S26/S37 tabloları hâlâ orada mı → risk #12 |

### 6.3 — Altyapı / platform (repodan görülemez)
- **Dokploy ayarları:** kalıcı volume mount'u panelden tanımlanmış olabilir; gerçek env seti compose'dakinden farklı olabilir.
- **Docker/Dokploy log driver'ı:** stdout ne kadar saklanıyor, rotasyon var mı, 2026-09-09 logları hâlâ erişilebilir mi → `requestLogger` izinin ömrünü belirler.
- **Süreç restart geçmişi:** backend konteyneri 2026-09-09 civarında yeniden başlatıldı mı (E3'ün gerçekleşip gerçekleşmediği).
- **Ters proxy / TLS terminasyonu:** `trust proxy` ihtiyacı buna bağlı (risk #3'ün ciddiyeti). **Üretimdeki gerçek `req.ip` değeri kod okunarak belirlenemez — ölçülmeli.**
- **Reverse proxy erişim logları:** Traefik/nginx varsa 5xx sayaçları ek bir iz kaynağı olabilir.
- **Replika/ölçekleme topolojisi:** compose'da tek instance. Çok replikalı çalışma → cron'lar **N kez** koşar (özellikle silme işi) ve in-memory rate limit **N ile çarpılır**.
- **SMTP'nin gerçek durumu:** `platformController.ts:147` yalnız env varlığına bakar; kimlik bilgileri geçerli mi, mail gerçekten gidiyor mu — canlı test gerekir.
- **Neon konsolu:** 6 saatlik pencere görev gereği **veri olarak kabul edildi**, doğrulanmaya çalışılmadı.

### 6.4 — Kod tarafında bu turda taranamayanlar (kapsam/bağlam sınırı — dürüstlük gereği listelenmiştir)
- `adminController.ts` (39 KB) tam denetimi — yalnız `getKpiDashboard`, `getHealthMetrics`, `nudgeUser` okundu; kalan ~25 admin ucunun tenant/sahiplik detayı **taranmadı**.
- `meetingController.ts` (25 KB) tam denetimi — `:meetingId` uçlarında (`approve`/`reject`/`check-in`) katılımcı kontrolü **taranmadı**.
- `oauthCallback` (`authController.ts:656-705`), `platformLogin`/`platformLogout` gövdeleri, `auth/reapply` (`:393-432`) — kısmen okundu; Zod doğrulaması ve mail gönderip göndermedikleri **TEYİT GEREK**.
- `onboardingController.ts` (23 KB) — `sanitizeTags` sınırları kısmen okundu.
- `tests/` dizini — kapsam dışı bırakıldı; hangi güvenlik iddiasının testle korunduğu **bilinmiyor**.
- `mentorVisibilityEnabled` **niyet arkeolojisi** — git log okunmadı (risk #19 / §4.5'in ön koşulu).
- `/api/tenants` üçlü mount'unun (`server.ts:98/102/108`) canlı yönlendirme davranışı — elle akıl yürütmeyle denetlendi, **koşturulmadı**.
- `v2/scripts/` dizini D bölümünün env taramasına dâhil edilmedi (küçük olasılıkla ek değişken içerebilir).
- `frontend/Dockerfile` VOLUME açısından tarandı (0 eşleşme) ama içeriği tam okunmadı; frontend'in kalıcı veri yazmadığı varsayıldı (düşük risk, **TEYİT GEREK**).
- **`backend/.dockerignore` ↔ `migrate deploy` çelişkisi** (B.6 sonu) — `docker build` salt-okuma kapsamı dışı olduğu için **doğrulanmadı**. Kurtarma anında ortaya çıkabilecek bir risktir; ayrıca ele alınmalı.

---

## 7. KALEM LİSTESİ (KURAL 9 — bu listede satır almayan bulgu, bulgu sayılmaz)

**Sayılan birim:** ayrı ayrı aksiyona dönüşebilecek bulgu (aynı kök nedeni paylaşanlar tek satırda kümelenmiştir). **Toplam 28 kalem.**

| # | Kalem | Bölüm | Önerilen durum | Numara adayı mı |
|---|---|---|---|---|
| 1 | Avatar dosyaları için kalıcı disk yok; her deploy'da siliniyor, `avatarUrl` DB'de kalıp sessizce kırılıyor | A/B/D | ⬜ AÇIK | **evet** (G8-01 ile kümelenebilir) |
| 2 | `SMTP_HOST` boşsa tüm mailler sessizce atılıyor; çağırana hiçbir kanalla bildirilmiyor | D | ⬜ AÇIK | **evet** |
| 3 | `generalRateLimiter` anahtarı doğrulanmamış `X-Tenant-Id` → global limit atlatılabilir + bellek şişirme | C | ⬜ AÇIK | **evet** |
| 4 | `app.set('trust proxy')` yok → 9 IP-bazlı limitçi vekil arkasında bozuk | C | ❓ TEYİT GEREK (üretim `req.ip`) | **evet** |
| 5 | `TENANT_NOTIFICATIONS_ENABLED` varsayılan kapalı; 3 kurum akışı sessiz | D | ⬜ AÇIK | **evet** |
| 6 | Hata kaydında endpoint/kullanıcı/kurum yok (E1) | A | ⬜ AÇIK | **evet** |
| 7 | Stack hiçbir arayüzden okunamıyor; tek okuyan uç frontend'den çağrılmıyor (E2) | A | ⬜ AÇIK | **evet** |
| 8 | `uncaughtException`/`unhandledRejection` handler'ı yok → sessiz restart (E3) | A | ⬜ AÇIK | **evet** |
| 9 | IDOR: `POST /api/mentors/:mentorId/visibility-optin` sahiplik kontrolü yok | C | ⬜ AÇIK | **evet** |
| 10 | `/health` DB'ye bakmıyor ama Docker healthcheck'ini besliyor → yalancı "healthy" | A/C | ⬜ AÇIK | **evet** |
| 11 | 6 saatten eski veri kaybına karşı sıfır koruma; `runWeeklyPurge` pencereyle çakışıyor | B | ⬜ AÇIK | **evet** |
| 12 | Düzenli/bütün-DB yedeği yok; restore provası hiç yapılmamış | B | ⬜ AÇIK | **evet** |
| 13 | Yedek tablolar birikiyor, şemada yok → `migrate`/`db push` DROP riski (S26 21 gün, S37 11 gün) | B | ⬜ AÇIK (PO kararı) | evet (S26/S37 mevcut) |
| 14 | `applyKAnonymity` yalnız 1 uçta; KPI/analytics/health-metrics'te yok (n=1 kovada toplam = satır) | C | ⬜ AÇIK | **evet** |
| 15 | Fallback JWT secret kaynak koda gömülü; guard tek `NODE_ENV` kontrolüne bağlı (7 koruma) | D | ⬜ AÇIK | **evet** |
| 16 | `POST /api/meetings/reminders/send` sınırsız toplu mail, cooldown yok | C | ⬜ AÇIK | **evet** |
| 17 | `BACKEND_URL` backend'e geçirilmiyor → avatar URL'leri + KVKK unsubscribe linki 404 | D | ❓ TEYİT GEREK | **evet** |
| 18 | `NEXT_PUBLIC_API_URL` build-time gömülü; yanlış build sessizce localhost'a düşer | D | ❓ TEYİT GEREK | evet |
| 19 | CLAUDE.md "kasıtlı public" listesi eksik — 11 belgelenmemiş public uç (+`/uploads`) | C | ⬜ AÇIK (belge işi) | **evet** |
| 20 | `GET /api/users/:id/export` rate limitsiz → `/me/data-export` limitini atlatıyor | C | ⬜ AÇIK | **evet** |
| 21 | `mentorVisibilityEnabled` hiçbir katmanda zorlanmıyor (uyuyan alan) | C | ❓ TEYİT GEREK (PO niyeti) | **evet** |
| 22 | Frontend'de sıfır gözlemlenebilirlik: error boundary 0, `not-found.tsx` 0, console 1 (E10) | A | ⬜ AÇIK | **evet** |
| 23 | `src/` runtime'da kullanılıp `.env.example`'da olmayan **18** değişken (13 sanılıyordu) | D | ⬜ AÇIK | **evet** |
| 24 | `.env.example` **yanıltıcı 3 satır** taşıyor: `OPENAI_API_KEY`/`OPENAI_MODEL` ölü ama sır koymaya davet ediyor; `INVITATION_TOKEN_EXPIRY="90d"` ölü (gerçek: sabit `30d`) | D | ⬜ AÇIK | **evet** |
| 25 | `RATE_LIMIT_RPM` tenant-anahtarlı 100/dk → büyük kurumda meşru kullanıcı 429 alır | C/D | ⬜ AÇIK | evet |
| 26 | `POST /api/tags/suggest` `requireTenant`sız mount → her zaman 401 (fail-closed ölü uç) | C | ⬜ AÇIK | evet |
| 27 | In-memory rate limit sayacı çok-instance'ta ölçeklenmez; saat/gün penceresi ifade edilemiyor | C | ⬜ AÇIK | evet |
| 28 | `.dockerignore` migration `.sql`'lerini eliyor ama `Dockerfile` `migrate deploy` çalıştırıyor → **boş DB'ye kurtarmada şema oluşmayabilir** | B | ❓ TEYİT GEREK (`docker build` gerekir) | **evet** |

**Ayrıca bulgu sayılmayan, ama not edilen kalıntı riskler:** magic-byte yalnız ilk 12 baytı okuyor (polyglot; CSP+nosniff ile azaltılmış), avatar silme best-effort (disk sızıntısı), `/api/tenants` üçlü mount'unun path-segment bağımlılığı, `superAdminRoutes`'un `platformReadRateLimiter` taşımaması, `systemLogController.ts:9-11` kategori enum'unda `AUDIT` eksikliği, `ALLOWED_ORIGINS`'in `.split(',')`'ünün trim yapmaması, `02-ILERLEME.md` yedek-kaydı kuralının fiilen uygulanmaması.

---

## 8. BELGE SENKRONU

**Bu tur için belge güncellemesi GEREKMEDİ — gerekçe:** 🟩 PLANLA turu, salt-okuma; hiçbir kod/şema/DB durumu değişmedi, hiçbir iş tamamlanmadı. Tur talimatı `docs/otonom/`, `docs/kararlar/`, `docs/devir/`, `CLAUDE.md` ve `.env.example`'a dokunmayı **açıkça yasakladı** (terminalde açık turlar var). Bulguların `00-KARAR-TAKIP`'e girişi ve numara alması (KURAL 8 adım 2 · KURAL 9) **ayrı bir turda** yapılacaktır; §7 kalem listesi o turun kaynağıdır.

⚠️ **Bu turda tespit edilen, ilgili turda düzeltilmesi gereken bayat belge iddiaları** (KURAL 12 birincil ayak — bu tur belgeye dokunamadığı için yalnız RAPOR EDİLDİ, düzeltilmedi):
1. `backend/CLAUDE.md` "**38 model**" → kod gerçeği `grep -c '^model ' prisma/schema.prisma` = **39**.
2. `v2/CLAUDE.md` güvenlik bölümü: *"KASITLI public olan endpoint'ler: login, register, health, unsubscribe, invitation join, suspicion report. Bunun DIŞINDA public endpoint YOK."* → kod gerçeği: **11 public uç daha var** (+`/uploads` statik servisi). Bkz. kalem 19.
3. `v2/CLAUDE.md:48` + `OTONOM-PROMPT.txt:48`: *"Yedek adı + satır sayısı `02-ILERLEME.md`'ye yazılır"* → fiilen uygulanmıyor (`grep` → 0); iki yedek de başka belgelere kaydedilmiş.
4. `backend/CLAUDE.md` *"yalnız kullanılmayan `config.ts` OpenAI env iskelesi kaldı"* → **bu iddia koddan DOĞRULANDI** ✅ (`iceBreaker.ts`/`matchReason.ts`/`llmRetry.ts` gerçekten yok, `openai`/`@anthropic-ai` bağımlılığı yok, `config.llm` 0 tüketici). Bayat değil.

---

## 9. EK — ikinci okuma turu (aynı tur, ayrı commit)

> **Ne bu:** Bu rapor yazıldıktan sonra aynı tur kapsamında bağımsız bir ikinci okuma yapıldı (backend `61aae07`, çatı `d4ff9a7`). Bulguların ezici çoğunluğu **birebir örtüştü** (`trust proxy`, `X-Tenant-Id` anahtarı, `NODE_ENV` tek-arıza-noktası, `LLM_PROVIDER` ölü, `unhandledRejection` yok, 190 uç sayımı). Aşağıda **yalnız örtüşmeyen iki kalem** var.
> ⛔ **Yukarıdaki hiçbir satır silinmedi/değiştirilmedi.** Bu bölüm yalnız EKLER; §7 kalem listesine de yeni satır **eklenir**, mevcut satırlar olduğu gibi kalır (Belge Düzeltme Deseni).

### 9.1 ⚠️ GÜNCELLEME — kalem 11 ve 12 NUMARASIZ DEĞİL: `madde 120` / `[G1-28]` olarak zaten izleniyor

§7'de **kalem 11** ("6 saatten eski veri kaybına karşı sıfır koruma") ve **kalem 12** ("Düzenli/bütün-DB yedeği yok; restore provası hiç yapılmamış") *"numara adayı: **evet**"* olarak işaretlenmiş. **Bu iki kalem zaten numaralı ve zaten en sert önceliğe sahip:**

| Kaynak | Kanıt |
|---|---|
| `docs/kararlar/00-KARAR-TAKIP.md:615` | **madde 120** — "Sunucu/altyapı sertleştirme (Dokploy HTTP/firewall/SSH/SSL/**yedek**) (= G1-28)" · ⬜ AÇIK (PO önceliklendirmedi) |
| `docs/raporlar/bilanco/kararlar/G1-guvenlik-kvkk.md:440` | **[G1-28]** kartı — durum **🔴 ÇIKIŞ BLOKERİ** (2026-09-02 PO kararı) |
| `G1-guvenlik-kvkk.md:451` | PAKET AYRIMI: "**Yedekleme → 🔴 en sert bloker**" |
| `docs/kararlar/00-CIKIS-PLANI.md:74` | Kanonik çıkış listesi: "sunucu/altyapı güvenliği HTTPS/firewall/SSH/SSL/yedek (yarım-tam gün) · **yedekleme geri-dönüş denemesi (1-2 saat)**" — yani "restore provası" da zaten listede |
| `00-KARAR-TAKIP.md:171` | **S19** 🔴 "çıkış öncesi ZORUNLU" |

**Neden önemli (KURAL 8 adım 2 · KURAL 15):** bu iki kaleme yeni numara verilirse **aynı iş iki numarayla** izlenir ve 🔴 çıkış blokeri, yeni açılmış ⬜ bir kalem gibi görünerek **hafife alınır** — `[G1-28]`'in başına 2026-09-02'de tam olarak bu gelmişti (kart 🔵 "bilinçli erteleme" sanılıyordu, çapraz-ref turunda 🔴'ye çekildi). **Öneri: kalem 11-12 için numara adayı "evet" → "hayır, madde 120/G1-28'e bağla".**
⚠️ Buna karşılık §7 **kalem 13** (yedek tabloların birikmesi, S26/S37) gerçekten ayrı bir kalemdir — madde 120 yedek **alma**yı, kalem 13 alınmış yedeklerin **ömrünü** konu alır. Karıştırılmamalı.
⚠️ Ayrıca **hata izleme (kalem 6-8-22)** için ters yön geçerli: `00-KARAR-TAKIP.md` içinde `izleme · monitoring · uptime · alarm · uyarı sistemi · sentry` (6 terim, harf duyarsız) → **0 sahiplenen madde**. Bunlar gerçekten numarasız; "evet" işaretleri doğru.

### 9.2 🔴 YENİ BULGU — oryantasyon kilidi CANLI randevu yolunda uygulanmıyor (raporda yok)

`checkOrientationLock()` **tanımlı ve çalışır durumda**, ama yalnız kullanılmayan yolda bağlı:

```
$ grep -n "checkOrientationLock" backend/src/controllers/meetingController.ts
140:async function checkOrientationLock(mentiId: string, res: Response): Promise<boolean> {
162:  if (await checkOrientationLock(mentiId, res)) return;      ← createMeeting (:155)
```

- **Tek çağrı yeri `createMeeting`** (`meetingController.ts:155`, çağrı `:162`).
- Frontend'in gerçekten kullandığı yol **`POST /api/meetings/book` → `bookMeeting`** (`meetingRoutes.ts:47`; `meetingController.ts:413`). Gövdesinde (`413-531`) `orientation` geçen **0 satır** var — format/tarih doğrulaması, match doğrulaması, müsaitlik, çakışma ve haftalık limit var; **oryantasyon kilidi yok**.
- Frontend de durdurmuyor: `menti/page.tsx:139-150` yalnız **bilgilendirici banner** ("Görüşme Kilidi Aktif") basar; mentör kartları ve "Randevu Al" butonu (`:297-303`) `needsOrientation` durumunda **gizlenmez**; `frontend/src/app/(dashboard)/book-meeting/` altında `needsOrientation` → **0 eşleşme**.

**Etki:** hazırlık puanı düşük bulunup kilitlenen bir menti, "Randevu Al"a basıp randevu alır; mentör hazırlıksız menti ile karşılaşır. Ürünün kendi kalite kapısı **hiçbir katmanda** durdurmuyor — §2.C'deki k-anonimlik/PENDING desenlerinin aynısı: *koruma yalnızca ekranda.*
**Düzeltme (S):** `bookMeeting` içine `if (await checkOrientationLock(mentiId, res)) return;` — `meetingController.ts:418` civarı, `createMeeting`'deki satırın aynısı.
**Ürün kararı gerekiyor mu — EVET (kart AÇILMADI, yalnız soru):** *"Oryantasyonu bitirmemiş menti randevu alabilmeli mi? Ekrandaki 'Görüşme Kilidi Aktif' yazısı bir uyarı mı, yoksa gerçek bir engel mi?"* Kod bugün **uyarı** gibi davranıyor, metin **engel** vaat ediyor.

### 9.3 §7 KALEM LİSTESİ'NE EK SATIRLAR (KURAL 9 — mevcut 28 satır aynen duruyor)

| # | Kalem | Bölüm | Önerilen durum | Numara adayı mı |
|---|---|---|---|---|
| 29 | **Oryantasyon kilidi canlı `bookMeeting` yolunda uygulanmıyor**; yalnız `createMeeting`'de bağlı, frontend de yalnız banner basıyor | C | ⬜ AÇIK | **evet** (ürün kararı önce: §9.2'deki soru) |
| 30 | §7 **kalem 11-12 için numara VERİLMEMELİ** — `madde 120` / `[G1-28]` 🔴 çıkış blokeri olarak zaten izleniyor; yeni numara aynı işi ikiye böler ve blokeri hafifletir | B | 🗑️ GEÇERSİZ ADAYI (numara adaylığı geçersiz; kalemin kendisi geçerli) | **hayır** — mevcut numaraya bağlanır |
