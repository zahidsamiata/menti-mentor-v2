# KONSEY 2 · 🔐 GÜVENLİK VE KVKK
**📸 DONDURULMUŞ — 2026-09-21 fotoğrafı. Bu belge plan değildir; tek işi kuyruğu beslemektir. Bulguları `00-KUYRUK.md`'ye işlendikten sonra güncellenmez.**

**Soru:** Bir kullanıcı, bir kurum ya da dışarıdan biri, erişmemesi gereken veriye ulaşabilir mi?
**Dal:** `otonom/CB-konsey-guvenlik-20260921` · **Kuyruk öneki:** `G-??`
**Mod:** 🟩 SALT-OKUMA. Kod/belge/DB/şema/seed **değişmedi**; `docs/otonom/`, `docs/kararlar/`, `CLAUDE.md` **ellenmedi**; numara **verilmedi**. Canlı sisteme istek atılmadı, exploit yazılmadı, gerçek sır/anahtar/alan adı yazılmadı.
**Denetlenen sürüm:** backend `/home/user/menti-mentor` @ **`b5415bd`** (çatının canlı submodule pointer'ı) · frontend `menti-mentor-v2/frontend` @ `a8cec0f`.

---

## 1. KAPSAM BEYANLARI

| Bölüm | Kapsam | Yöntem |
|---|---|---|
| **A** yetki matrisi | `src/server.ts` + 23 rota dosyası + 33 controller | Uç uç mount izleme; her uç için auth/rol/tenant/sahiplik |
| **B** KVKK | `prisma/schema.prisma` · `gdprService.ts` · `cronScheduler.ts` · `logger.ts` · `docs/raporlar/kod-denetimi/kvkk-*` | Model-model silme izleme |
| **C** sırlar/oturum | backend `src/`,`prisma/`,`scripts/`,`tests/` · frontend `src/`,`next.config.mjs` · çatı `docker-compose.yml`,`.github/workflows/`,`Dockerfile` | Harf duyarsız desen + davranış izleme |
| **D** dosya/girdi | backend `src/`,`scripts/`,`prisma/`,`tests/` · frontend `src/` | multipart/XSS/ham-SQL/komut yüzeyi |

**Sayım birimi:** *"1 uç = 1 metot+yol çifti."* Orkestratör bağımsız sayımı: `router.(get|post|put|patch|delete)` → **188** (23 rota dosyası) + `server.ts` içi **2** inline handler = **190 uç**.

**İki dilli tarama** (KURAL 13): `mentor↔mentör` · `tenant↔kurum` · `meeting↔görüşme` · `match↔eşleşme` · `consent↔rıza` · `delete↔silme` · `report↔rapor`.

⭐ **MEVCUT KUYRUKLA ÇAPRAZ KONTROL:** Tüm bulgular, merge edilmemiş `origin/otonom/BB-devir-uygulama-20260921` dalındaki güncel `00-KUYRUK.md` (344 satır) ile karşılaştırıldı. Kuyrukta **22 güvenlik/KVKK satırı** zaten var: **5 BITTI** (`V-03` IDOR visibility-optin · `V-09` public uç listesi · `V-10` `:id/export` rate limit · `V-11` cron · `P-00` k-anonimlik FE-only) · **17 BEKLIYOR** (`V-05` `V-06` `V-15` `U-08` `U-12` `U-13` `U-15` `Y-02` `Y-15` `F-02` `F-03` `F-04` `F-05` `F-23` `P-16` `K-13` `K-14`). Mevcut satıra düşen bulgular **yeni satır açmadı**, `= <no>, ek bulgu:` olarak yazıldı.

---

## 2.C — SIRLAR VE OTURUM

### C.1 Koda gömülü sırlar — **4 canlı-etkili + 6 üretim-dışı = 10**
⛔ Hiçbir gerçek değer bu raporda yazılmamıştır; yalnız `dosya:satır` + tarif.

| # | konum | ne | guard | guard atlanırsa |
|---|---|---|---|---|
| 1 | `config.ts:16-17` | fallback **JWT secret** | ✅ throw, `config.ts:19` → `isProd` | **Tam kimlik sahtekârlığı.** Secret public repoda → saldırgan istediği `sub`/`tenantId`/`role` ile token imzalar; `isPlatformAdmin:true` + `aud:'platform'` claim'li token da üretebilir → `platformAuth.ts:27` **DB'ye hiç bakmaz** → tüm `/api/platform/*` ele geçer. Aynı secret **davet token'ı** (`invitationToken.ts:30`) ve **OAuth state** (`oauthStateService.ts:23`) üretir |
| 2 | `config.ts:23-24` | fallback **platform admin key** | ✅ throw, `config.ts:26` | Platform paneli bilinen parolayla açılır; tek fren IP 10/dk — parola bilindiği için anlamsız |
| 3 | `config.ts:31-32` | fallback **platform admin e-postası** ("ikinci faktör") | ❌ **YOK** — yalnız `console.warn` (`:39-45`), prod'da bile durdurmaz | İkinci faktör **canlıda da** tahmin edilebilir varsayılanda kalabilir → 2FA fiilen **tek faktöre iner**. Kodun kendi yorumu (`:34-38`) bunu kabul ediyor |
| 4 | `docker-compose.yml:47` | compose aynı varsayılanı `:-` ile **açıkça enjekte eder** | ❌ yok | #3'ü deploy'da kalıcılaştırır. ⚠️ Kıyas: `JWT_SECRET`/`PLATFORM_ADMIN_KEY` `:?` ile **zorunlu** (`:43-45`) — compose onlarsız başlamaz; e-posta için bu disiplin uygulanmamış |

**Üretim dışı ama public repoda sabit (6):** `prisma/seed.ts:293` (sabit seed şifresi + `:383` yorumu düz metin tekrarlıyor; **seed'i prod'da engelleyen guard YOK** — kapsam `prisma/seed.ts`, desen `NODE_ENV|isProd` harf duyarsız → 0) · `scripts/seed-test-tenant.mjs:38` (+`:111` şifreyi **stdout'a basıyor**, `ci.yml:222` bu seed'i çağırıyor) · `tests/setup.ts:20-21` · `tests/helpers/factories.ts:49` · `ci.yml:121-122` · `ci.yml:189-190`.

**`.env.example` dosyalarında gerçek sır: YOK** ✅ (3 dosya denetlendi, hepsi placeholder). İki bilgi-ifşası notu: `config.ts:83` gerçek kurumsal gönderen alan adı fallback olarak gömülü; `.env.compose:18-19` prod host'larını açık ediyor (sır değil, altyapı bilgisi).
**Negatif iddialar (kapsam beyanlı):** özel anahtar **yok** (`BEGIN (RSA|PRIVATE|OPENSSH)`, `private_key`, `apiKey` → tek eşleşme env okuması) · frontend'de gömülü sır **yok** · Dockerfile'larda sır **yok**.

### C.2 ⭐ `NODE_ENV` — tek yazım hatası **7 korumayı** birden kapatır
`isProd` tek kaynaktan ve **katı eşitlik**: `NODE_ENV === 'production'` (`config.ts:10`, `authController.ts:62`, `selfServeController.ts:16`, `platformController.ts:17`). `""`, `prod`, `Production`, `staging` → hepsi `false`.

| # | konum | koruma | prod değilse |
|---|---|---|---|
| 1 | `config.ts:12-14` | `DEFAULT_TENANT_ID` prod'da yasak | Guard kapanır → `tenant.ts:30` `X-Tenant-Id` **olmayan** istek sessizce varsayılan tenant'a düşer — tenant izolasyonunun ilk kapısı açılır |
| 2 | `config.ts:19-21` | fallback JWT secret reddi | Public repodaki sabit secret kullanılır → C.1 #1 |
| 3 | `config.ts:26-28` | fallback platform key reddi | C.1 #2 |
| 4-7 | `authController.ts:67` · `:74` · `selfServeController.ts:33` · `platformController.ts:17` | cookie `secure` bayrağı ×4 | Refresh çerezi (7 gün, **DB'de plaintext**) ve **platform admin oturum çerezi** düz HTTP'de gider |

⭐ **Görünürlük sorunu:** tek iz `GET /health` → `env` alanı (`health.ts:45`) ve o uç **kimlik doğrulaması istemez** (`server.ts:60-63`) → saldırgan `NODE_ENV`'in yanlış olduğunu **dışarıdan tek istekle** anlayıp fallback secret'ı denemeye geçer. Açılışta "bilinen ortam" fail-fast doğrulaması yok.
= **`V-06`, ek bulgu:** V-06 yalnız JWT secret'ı konu ediyor; asıl kırılganlık `NODE_ENV`'in **kendisi** — 7 koruma tek stringe asılı ve durumu kimliksiz ifşa ediliyor.

### C.3 Token / oturum
| Konu | Bulgu | Kanıt |
|---|---|---|
| Access / refresh ömrü | 1 saat / 7 gün | `config.ts:58`, `authController.ts:57` |
| Refresh rotasyonu | ✅ VAR (eski satır silinir) | `authController.ts:474-483` |
| Yeniden-kullanım tespiti | ❌ YOK — silinmiş token tekrar sunulursa yalnız 401; "token ailesi" iptal edilmez, alarm yok | `:459-467` (desen `reuse\|family\|blacklist\|revoke` → 0) |
| Refresh saklama | ⚠️ **DB'de PLAINTEXT** | `schema.prisma:823-834` `token String @unique`. Kıyas: reset token **SHA-256 hash'li** (`authController.ts:116-118`) — desen biliniyor, refresh'e uygulanmamış |
| **Logout invalidation** | ❌ **Access token için YOK** — logout yalnız refresh satırını siler | `authController.ts:504-513`; platform için `platformController.ts:65-68` |
| Rol kaynağı | ⚠️ **JWT payload'ından** (`req.auth.role = payload.role`), DB'den okunmaz | `tenant.ts:101-105`, `authorize.ts:53,80` |
| → sonucu | ADMIN'likten düşürülen kullanıcı **≤1 saat daha ADMIN** kalır (bir sonraki `/refresh`'te taze rol gelir, `:485-490`) |
| **Pasifleştirilen kullanıcı** | 🔴 `requireTenant` **`User.isActive`'i HİÇ okumaz** — yalnız `TenantMembership.isActive`'e bakar | **Orkestratör teyitli:** `tenant.ts:83-100`, `select: { isActive: true }` (membership) |
| → sonucu | `rejectUser` `User.isActive=false` yapar ama **üyeliğe dokunmaz** (**teyitli:** `adminController.ts:760-768`) → reddedilen kullanıcının access token'ı **kalan ömrü boyunca tüm tenant uçlarında geçerli** |
| Pasifleştirilen **tenant** | `getCachedTenant` `isActive` alanını **seçmiyor** → devre dışı tenant'ın istekleri geçer, üstelik 5 dk TTL | `tenantCache.ts:43-50`, `tenant.ts:41-45` |
| **Davet token'ı** | İmzalı JWT, **DB kaydı YOK** → tek kullanımlık **değil**, iptal edilemez, e-postaya bağlı **değil**, sabit `'30d'` | `selfServeController.ts:562-580`, `invitationToken.ts:1-36` |
| ⚠️ Davet token'ı **log'da** | JWT **URL path'inde** (`GET /api/invitations/:token/join`) ve `requestLogger` `originalUrl`'i olduğu gibi stdout'a basıyor | `invitationRoutes.ts:13`, `requestLogger.ts:23` → **log'a erişen herkes geçerli davet token'ı toplayabilir**; aynı satır OAuth `code`/`state` query'lerini de loglar |
| ⚠️ Access token **URL'de** | OAuth callback token'ı **query string** ile taşıyor | `authController.ts:686-690` → tarayıcı geçmişi + `Referer` + ara proxy log'ları |

### C.4 Cookie bayrakları — 6 çağrı
| konum | cookie | httpOnly | secure | sameSite | maxAge | path |
|---|---|---|---|---|---|---|
| `authController.ts:65-70` | kullanıcı refresh | ✅ | ⚠️ `isProd` | `strict` | 7 gün | `/` |
| `authController.ts:74` | silme | ✅ | ⚠️ `isProd` | `strict` | — | `/` |
| `selfServeController.ts:31-35` | STK kurucu (**ADMIN**) refresh | ✅ | ⚠️ `isProd` | `strict` | 7 gün | `/` |
| `platformController.ts:60` | **platform admin** oturumu | ✅ | ⚠️ `isProd` | `strict` | 1 saat | `/api/platform` |
| `platformController.ts:66` | silme | ✅ | ⚠️ `isProd` | `strict` | 0 | `/api/platform` |
| `gdprController.ts:129` | hesap kapatmada silme | ❌ opsiyon yok | ❌ | ❌ | — | `/` |

✅ **`localStorage`'a token YAZILMIYOR** — proje kuralına uyuluyor (`AuthProvider.tsx:47` state; kapsam `frontend/src/**`, desen `localStorage|sessionStorage` → eşleşmeler yalnız tema ve `X-Tenant-Id`; tenant id zaten JWT ile karşılaştırılıp uyuşmazsa 403, `tenant.ts:71-80`).

### C.5 Şifre politikası + sıfırlama
**Politika:** min **8 karakter** (`authController.ts:27,52`), **karmaşıklık kuralı YOK** (kapsam `src/**`, desen `password.*(regex|refine)` → 0), bcrypt **12** tur (üretim yolları). **Oturum-içi şifre değiştirme ucu YOK** (kapsam backend+frontend, desen `changePassword|change-password|currentPassword` → **0**; `authRoutes.ts` tam okundu) → kullanıcı e-posta akışına mecbur, "mevcut şifre" doğrulaması hiçbir yerde yok.

✅ **Sıfırlama akışı iyi yazılmış:** 256-bit entropi (`:534`) · **SHA-256 hash'li DB kaydı** (`:535-541`, `schema.prisma:888-899`) · 60 dk (`:110-114`) · **tek kullanımlık** (`:580-587`) · kullanımda **tüm refresh token'lar silinir** (`:586`) · yeni talepte eskiler temizlenir (`:532`) · pasif hesaba token verilmez (`:531,568`).
⚠️ Kalan: access token blacklist'i olmadığı için sıfırlama sonrası saldırganın token'ı **≤1 saat daha** çalışır.

### C.5-B 🔴 ENUMERATION — koruma bir uçta var, **ikinci yol açık**
| Uç | Kayıtlı e-posta ile yanıt | Sızdırıyor mu |
|---|---|---|
| `POST /api/auth/forgot-password` | `200` + generic (kayıtsızla **aynı**) | ❌ ✅ |
| `POST /api/auth/login` | `401` + "E-posta veya şifre hatalı" (**birebir aynı**) | ❌ ✅ |
| `POST /api/auth/register` | `201` + **AYNI** mesaj, `user:null` | ❌ ✅ |
| **`POST /api/tenants/self-serve/register`** | 🔴 **`409 EMAIL_MEVCUT` + "Bu e-posta adresi zaten kayıtlı."** | ✅ **AÇIK ORACLE** |

**Orkestratör teyitli.** Karşıtlık çarpıcı: `authController.ts:177-184` **bilinçli** enumeration-safe (kodda açıklayıcı yorum: *"E-posta numaralandırmasını önle"*), `selfServeController.ts:262-267` **aynı `User` tablosuna** karşı doğrudan oracle sunuyor. Tek fren IP 5/dk (`rateLimiter.ts:239`) ≈ 7.200 adres/gün/IP.
⭐ **Bu, k-anonimlik ve IDOR ile AYNI SINIF hata:** koruma bir yolda var, ikinci yol açık.
**İki zamanlama yan-kanalı:** (1) `login` kullanıcı yoksa `:292` **erken döner, bcrypt HİÇ çalışmaz**; varsa 12 tur çalışır → ölçülebilir oracle. Kod bunu bilerek kapsam dışı bırakmış (`:289-291`) ama sabit-zaman deseni projede **var** (`platformController.ts:23-32`), login'e uygulanmamış. (2) `forgot-password` kullanıcı varsa 2 DB yazımı await edilir (`:531-550`), yoksa hiç → süre farkı aynı bilgiyi verir.

---

## 2.D — DOSYA VE GİRDİ

### D.1 Dosya yükleme — **tek yol**, büyük ölçüde iyi
`POST /api/users/me/avatar` (`userRoutes.ts:50-53`). Kapsam: `multer|busboy|formidable|upload|multipart` → başka multipart ucu **yok**.

✅ **Doğru yapılanlar:** tip kararı **magic-byte'ta** (`avatarStorage.ts:26-48`, `avatarController.ts:33`), MIME yalnız ön-filtre · doğrulama **diske yazmadan ÖNCE** (`:33` vs `:51`) · **SVG bilinçli reddediliyor** · boyut 5 MB + `files:1` · dosya adı `${userId}-${randomUUID()}`, `file.originalname` **kodda hiç okunmuyor** → path traversal **yapısal olarak imkânsız** · silmede **çift koruma** (`basename()` + `resolve!==join`, `:87-92`) · statik serviste `nosniff` + `CSP: default-src 'none'; sandbox` + `index:false` + `dotfiles:'deny'` (`server.ts:74-80`) · kullanıcı-başına 5/dk limit.

**Eksikler (5):**
| # | bulgu | sonuç |
|---|---|---|
| D-1 🟠 | **EXIF/GPS temizlenmiyor** — ham buffer birebir yazılıyor (`avatarStorage.ts:68`); `sharp`/`jimp`/`exif` bağımlılığı **yok** | Telefon fotoğrafındaki **GPS koordinatı**, `/uploads/` altında **kimlik doğrulamasız public** servis edilir (`server.ts:72`'de `requireAuth` yok) ve dosya adı `userId` ile başladığı için **konum ↔ kullanıcı doğrudan eşleşir**. KVKK Md.4 veri minimizasyonu |
| D-2 🟠 | **Piksel-boyutu sınırı yok** — `detectImageType` yalnız sihirli bayta bakar | `next.config.mjs:42-58` backend `/uploads/**`'ı `remotePatterns`'e ekliyor → Next **image optimizer** dosyayı indirip **decode ediyor**; avatar bir havuz kartında görününce optimizer'da bellek patlaması. Backend etkilenmez. Etki büyüklüğü **TEYİT GEREK**, kontrolün yokluğu kesin |
| D-3 ❓ | Kalıcı volume repo'dan doğrulanamıyor | Mount yoksa her deploy'da avatarlar silinir, `avatarUrl` **ölü linke** döner. Kod bunu **biliyor ve ele alıyor** (`avatarController.ts:48-62` → 503 + PII'siz log). **TEYİT GEREK** (Dokploy) |
| D-4 🟡 | `UPLOAD_MAX_BYTES` hatalı yazılırsa `Number()` → `NaN` → `limits.fileSize: NaN`; `size > NaN` daima false | Operatör yazım hatası sessizce **sınırsız yüklemeye** döner. Multer 2.x NaN davranışı **TEYİT GEREK** |
| D-5 ⚪ | `Content-Disposition` yok | Pratik istismar yolu görülmedi; `nosniff` + doğru `Content-Type` + `sandbox` üçlüsü zaten kesiyor. Derinlemesine savunma notu |

### D.2 🔴 XSS — **BİR GERÇEK AÇIK**
**Kapsam:** `dangerouslySetInnerHTML` → frontend `src/` genelinde **tam 1 sonuç** (`layout.tsx:44`, tema FOUC script'i — **sabit literal**, tek dış girdi `localStorage` değeri allowlist'ten geçip yalnız `classList.toggle`'a gidiyor, DOM'a yazılmıyor → ✅ **GÜVENLİ**). Markdown/zengin metin render eden yer **yok**.

**🔴 D-6 · `locationUrl` → depolanmış XSS (YÜKSEK, AÇIK)** — **orkestratör uçtan uca teyitli:**
| Adım | Kanıt |
|---|---|
| 1. Menti "Bağlantı" alanını doldurur | `book-meeting/page.tsx:44,176` — `<input type="text">`, istemci şema kontrolü **yok** |
| 2. Backend şeması **serbest string** | `meetingController.ts:404` → `locationUrl: z.string().optional()` — **`.url()` YOK**, şema allowlist'i YOK, regex YOK |
| 3. Aynen DB'ye | `meetingController.ts:521` |
| 4. Karşı tarafa **tıklanabilir link** | `meetings/page.tsx:69` → `<a href={meeting.locationUrl}>` |

⚠️ React `href`'te `javascript:` şemasını **engellemez** (yalnız geliştirme uyarısı basar). ⭐ **Kurbanın şüphelenme şansı yok:** link metni sabit *"Görüşmeye katıl →"*, **URL ekranda hiç gösterilmiyor** (`meetings/page.tsx:74`).
**Sonuç:** kimliği doğrulanmış herhangi bir menti, hedef mentöre görüşme talebi açarak mentörün tarayıcısında **kendi origin'inde kod çalıştırabilir**. `accessToken` bellekte tutuluyor (iyi karar) ama XSS aynı origin'de çalıştığı için refresh akışı (HttpOnly cookie tarayıcıca otomatik gönderilir, `lib/api/client.ts:59-61`) üzerinden **taze token mintlenebilir** → hesap devralma. HttpOnly XSS'i azaltır, **sıfırlamaz**.
**Yazma/okuma noktaları (orkestratör teyidi):** backend'de `locationUrl` yalnız `meetingController.ts:404,426` (tek giriş); frontend'de yalnız `meetings/page.tsx:65,69` render (tek çıkış) → **düzeltme iki noktada kapanır**. `IN_PERSON`/`PHONE` dalları metin olarak render ediliyor → React kaçışı devrede ✅.

**🟠 D-7 · E-posta HTML'i — 13 şablonun tamamında kaçış yok (ORTA, sistematik)**
`emailService.ts` (337 satır) tamamı okundu; dosyada **hiçbir kaçış yardımcısı tanımlı değil** (`escapeHtml|sanitize|encode` → 0). 13 şablon ham template-literal enterpolasyonu kullanıyor. En belirgin vektörler: `:310` `<p>${args.message}</p>` (**admin serbest metni**), `:169-174` `rejectionReason` (**admin serbest metni**), `:152-153` `newUserFullName`. Girdi tarafında kısıt yok — `fullName` şeması `authController.ts:28` `z.string().min(2).max(120)`, **HTML karakter kısıtı yok**.
**Sonuç:** kayıt sırasında adına HTML koyan kullanıcı, tenant admininin gelen kutusundaki mailin gövdesini şekillendirebilir → **HTML enjeksiyonu / phishing** (sahte "doğrula" düğmesi, saldırgan sunucusuna `<a href>`) + uzak `<img>` ile açılma izleme. Modern istemciler `<script>` çalıştırmaz → klasik JS XSS beklenmez, ama etiket enjeksiyonu kesin. **Düzeltme tek noktadan:** `send()` (`:72`) öncesi tek `escapeHtml()` → 13 şablon birden kapanır.

**🟡 D-8 · `G1-23` logoUrl — bugünkü durum: KISMEN kapanmış, kalan kısım XSS DEĞİL**
`admin/branding/page.tsx:47-57` `isSafeLogoUrl()` `https:` şema allowlist'i + `:70-72` geçersizken kaydetmeyi de engelliyor ✅ · `atoms/TenantLogo.tsx:26` `next/image` → `remotePatterns` allowlist'i ✅ (`next.config.mjs:11-19`, wildcard **kaldırılmış**).
⚠️ **Açık kalan:** `organisms/TenantSwitcher.tsx:196-201` ham `<img src={logoUrl}>` — `next/image` değil, `isSafeLogoUrl` çağrısı yok. **Davranış değerlendirmesi:** `<img src="javascript:…">` modern tarayıcıda **çalışmaz**, `<img>` bağlamındaki SVG script'i de **çalışmaz** → **XSS değildir**. Gerçek kalan etki: `remotePatterns` allowlist'inin **baypası** — tenant admini rastgele dış host'a `<img>` isteği attırabilir (her üye için IP/UA sızdıran **izleme pikseli**); backend `https:` zorlamıyor (`tenantController.ts:11,82` `z.string().url()` şema allowlist'i **değildir**). Tek satırlık düzeltme: `TenantLogo`/`next/image`'e çevir.
= **`F-04`, ek bulgu:** F-04 yalnız `logoUrl`'ü konu ediyor; asıl açık kalan nokta **`TenantSwitcher.tsx:198`** ve risk XSS değil **izleme pikseli / allowlist baypası**.
⚪ `verificationNote` href (`platform/dashboard/page.tsx:294-299`): iki bağımsız engelle kapalı (`startsWith('http')` + alan daima `{` ile başlayan JSON) → kalan risk yalnız phishing, XSS değil. `Step3Branding.tsx:78` → **self-XSS**, başkasına ulaşmıyor.

### D.3 Ham SQL — ✅ **TEMİZ**
Kapsam: `\$queryRaw|\$executeRaw|\$queryRawUnsafe|\$executeRawUnsafe` → backend `src/`(3) + `tests/`(6) = **9 kullanım**, **`Unsafe` varyantı 0**, string birleştirme 0. Tek kullanıcı-girdili olan `tagController.ts:193-199` (`array_replace`) **etiketli template literal** → Prisma her `${}`'yi prepared-statement parametresine çevirir, üçü de **değer konumunda** (tablo/kolon adı değil) → enjeksiyon **yapısal olarak imkânsız**. **9 kullanım / 0 güvensiz.**

### D.4 Ek girdi doğrulama
✅ `express.json({limit:'1mb'})` (`server.ts:55`) · ✅ `express.urlencoded` **mount edilmemiş** (yüzey hiç açılmamış) · ✅ **`child_process`/`exec`/`spawn` → `src/` genelinde 0 kullanım** (komut enjeksiyonu yüzeyi **yok**; tek `exec(` eşleşmesi `meetingController.ts:16` `RegExp.exec`, deseni sabit, ReDoS yok) · `fs` yazma yalnız `avatarStorage.ts`.
`.strict()` 9 şemada (~85 şemadan). ⚠️ **Yanlış soru tuzağına düşülmedi:** `.strict()` yokluğu tek başına açık **değildir** — zod varsayılanı bilinmeyen anahtarları **kırpar**, ve controller'lar Prisma'ya `parsed.data`'nın **destructure edilmiş alanlarını** veriyor (`meetingController.ts:510-523` — `data:{}` elle kuruluyor, spread yok). Mass assignment için gereken `...parsed.data` spread deseni **aranmalı**; incelenen controller'larda yok. 85 şemanın tamamı izlenmedi → **TEYİT GEREK**.

---
