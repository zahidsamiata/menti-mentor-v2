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

## 2.B — KVKK

**Şema büyüklüğü:** `grep -c '^model ' prisma/schema.prisma` = **39 model** (`backend/CLAUDE.md` "38 models" diyor → 1 model drift, **belge bayat**).

### B.1 Kişisel veri envanteri — **sınıflandırma yalnız 2 modeli kapsıyor**
`backend/CLAUDE.md` PII↔Analitik tablosu **yalnız `User` + `UserProfile`** düzeyinde. Kullanıcıya bağlı 39 modelin çoğu **hiç sınıflandırılmamış**. Sınıflandırılmamış ama kişisel veri taşıyan **en az 20 model/alan grubu**, içinde:
- **3 psikometrik kopya:** `Match.mentorArchetype`/`mentiArchetype` (`schema.prisma:1035-1036`) · `User.discResultCard`(325) · `User.enneagramWing`(287) — ⚠️ kodun kendisi bunları hassas sayıyor (`gdprService.ts:98-99`), sınıflandırma tablosu saymıyor
- **8 serbest-metin alanı:** `MatchFeedback.comment`(1174) · `UserReport.description`(1194)/`reviewNote`(1196) · `SuspicionReport.reporterName/contact/description/reviewNote`(1215-1221) · `PendingTag.value`(869) · `MeetingCheckIn.openNote`(606)/`nextTopicNote`(603) · `Feedback.keyLearnings`(640)/`specificComments`(641) · `MentorshipAgreement.mentiGoal`(1242)
- **İletişim/tanımlayıcı:** `Meeting.phoneNumber`(562) · `User.avatarUrl/linkedinUrl/instagramUrl`(336-338) · `User.password`(269) · `User.rejectionReason`(313)

**Sonucu:** CLAUDE.md kuralı 1 (*"yeni alan önce sınıflandırılır"*) sınıflandırılmamış alanlar için **hiç işlemiyor** → bir sonraki geliştirici `Match.mentiArchetype`'ı veya `MatchFeedback.comment`'i bir KPI/export ucuna ekleyebilir ve kural onu **durdurmaz**.

### B.2 ⭐ SİLME HAKKI — "silme" diye bir şey yok, **anonimleştirme var**
`hardDeleteUser` (`gdprService.ts:233-247`) **fiziksel silme yapmaz** — tek satırı `anonymizeUser(...)` (`:234`), dönüş `anonymizedInstead: true` (`:245`). Gerekçe kodda yazılı (`:225-231`): ~13 Restrict-FK tablosu transaction'ı rollback ediyordu. **Bu bir eksiklik değil, bilinçli ve belgeli karar**; kullanıcıya dönen metin de "silindi" demiyor (`:49-51`). Ama **"silme hakkı" fiilen "anonimleştirme hakkı"dır.**
✅ FE ekranı **VAR** — eski raporlardaki "FE yok" iddiası **bayat** (`DataPrivacySection.tsx`, `profile/page.tsx:443`).

#### 🔴 UNUTULAN: **7 kazara model + 4 alan** (orkestratör teyitli)
`grep "tx\.match\.|matchFeedback|pendingTag|availabilityBlock|clubMembership|mentorFilter" gdprService.ts` → **0 eşleşme** (yalnız `tx.matchRequest` `:154`).

| model | ne kalıyor | neden yakalanmıyor |
|---|---|---|
| ⭐ **`Match`** | **`mentorArchetype`/`mentiArchetype`** — `String`, **NOT NULL** (`schema.prisma:1035-1036`) + 3 skor | `gdprService.ts:112-119` `UserProfile.archetype`'ı **özenle `null`'luyor**, ama **aynı arketip `Match`'te düz metin duruyor** ve `Match.mentorId → UserProfile.id → UserProfile.userId` zinciriyle **hâlâ kişiye bağlanabiliyor** |
| ⭐ **`MatchFeedback`** | `comment` ≤1000 **serbest metin** + `fromUserId` | `fromUserId`'de **FK bile yok, düz String** (`:1170`) → şema düzeyinde **hiçbir cascade** yakalayamaz |
| `PendingTag` | `value` = kullanıcının yazdığı ham metin | dokunulmuyor |
| `MentorFilter` | `blockedDiscTypes` (kişilik tercihi) | dokunulmuyor |
| `ClubMembership` | kulüp üyelik kaydı | dokunulmuyor |
| `AvailabilityBlock` | haftalık müsaitlik takvimi **`isActive=true` kalır** | dokunulmuyor |
| `SystemLog` | `meta` içinde `userId` + **ham e-posta** (B.7) | FK yok; tek çıkış 90 günlük cron |

**+1 kasıtlı:** `Conversation` iskeleti (kodda gerekçeli, `gdprService.ts:132`).
**+4 alan-düzeyi boşluk:** `Meeting.locationUrl` (`:139-142` diğer 4 alanı null'luyor, bunu atlıyor) · `UserReport.reviewNote` (`:163-166` yalnız `description`) · `User.password` (bcrypt hash kalıyor) · `User.rejectionReason`.

⭐ **En ağır sonuç:** `gdprService.ts:50`'deki kullanıcıya verilen taahhüt — *"kimliğinizle ilişkilendirilebilir verileriniz geri döndürülemez şekilde anonimleştirildi"* — **psikometrik profil için yanlış**.

#### Yedek tablolar — yapısal körlük
`anonymizeUser`'ın **tamamı Prisma delegate'leriyle** yazılmış; `$executeRaw` **yok** (`gdprService.ts:81-178`). Prisma bir delegate'i yalnız `schema.prisma`'da tanımlı modele bağlar → `MentorshipAgreement_yedek_20260830` (şemada **YOK**) anonimleştirmeden **yapısal olarak görünmez**.
**Dürüst değerlendirme:** o tablonun 150 satırı script başlığına göre **öksüz test-fixture** (`cleanup-orphan-agreements-2026-08-30.sql:4-9`) → bugünkü pratik maruziyet **düşük**. ⚠️ **Ama yapısal risk gerçek ve tekrar edecek:** F.13 kuralı her migration öncesi yedek tablo almayı **zorunlu** kılıyor → PII taşıyan bir tabloya (`User`, `Message`, `Feedback`) migration atıldığı an, anonimleştirmenin **hiçbir zaman göremeyeceği** ham kopya doğar. Gerçek içerik **TEYİT GEREK** (canlı DB'ye dokunulmadı).

### B.3 DIŞA AKTARIM — **16 tablo + ≈22 `User` alanı eksik**
`exportUserData` (`gdprService.ts:284-333`) **6 kaynak** döner: `User` (kısmi select `:288-293`), `UserResponse`, `FeedbackLog`, `MatchRequest`, `Consent`, `Message` → **yalnız `count`** (`:314`).
**Mesaj içeriği şüphesi DOĞRULANDI:** `prisma.message.count(...)` — içerik değil sayı; tip tanımı da bunu yazıyor (`:280-281`), FE tipine kadar taşınmış (`kvkk.ts:20-22`). Gerekçe: *"karşı tarafın PII'si"*. **Karşı argüman:** kişinin **kendi yazdığı** mesaj (`senderUserId = kendisi`) karşı tarafın verisi değildir; KVKK Md.11/GDPR Md.20 için gerekçe zayıf.
**Eksik 16 tablo** — en ağırı ⭐ **`UserProfile`**: sistemin **en hassas türetilmiş psikometrik verisi** (OCEAN, arketip, DISC türevi) **hiç verilmiyor**. Ayrıca `Match`, `MatchFeedback`, `Meeting`, `MeetingCheckIn`, `Feedback`, `Conversation`, `VisibilityOptIn`, `MentorshipAgreement`, `UserReport`, `TenantMembership`, `ClubMembership`, `AvailabilityBlock`, `MentorFilter`, `PendingTag`, `Message`(içerik).
⚠️ **Yanlış soru tuzağından kaçınma:** K-12 iyileştirmesi ham JSON'u okunur özete çevirdi — ama özet **backend'in verdiğinden fazlasını üretemez**. Eksiklik **backend kaynaklı, FE'de değil.**

### B.4 Saklama süreleri + cron
| veri | süre | uygulanıyor mu |
|---|---|---|
| `SystemLog` | 90 gün (`gdprService.ts:341`) | ✅ `:366-368` |
| `FeedbackLog` | 3 yıl (`:342`) | ✅ `:371-373` — ⚠️ eski raporlardaki *"uygulanmamış"* iddiası **BAYAT** |
| `Message` | **süre yok** | ❌ bilinçli TODO(G1-10) — avukat metni beklendiği için keyfi süre yazılmamış. = **`F-02`** |

**`CRON_ENABLED` kodda doğrulandı:** `cronScheduler.ts:29-31` `process.env.CRON_ENABLED !== 'false'` → **unset = AÇIK**; `'FALSE'`/`'0'`/`'no'` da **AÇIK**; yalnız tam `'false'` kapatır.
**`'false'` olursa 8 işin 8'i durur.** KVKK sonuçları: SystemLog 90g imhası durur (→ içindeki **ham e-posta süresiz birikir**, B.7) · FeedbackLog 3y imhası durur · terk edilmiş taslak kurumların `User` kayıtları (ad+e-posta) 96 saat kuralıyla silinmez.
⭐ **Kaçış kapısı (yanlış soru tuzağından kaçınma):** `POST /api/admin/cron/run-purge` (`adminRoutes.ts:81`) **bayrağa BAKMAZ** → admin elle tetikleyebilir. **Ama `runDraftTenantCleanup` için böyle bir uç YOK** → 3. madde tamamen durur. `/health` bayrağı gösteriyor (`health.ts:44`) → **sessiz kayıp değil, görünür**. = **`V-11`** (BITTI).

### B.5 Rıza kaydı — ✅ **versiyonlanıyor**, ama **hiç okunmuyor**
`Consent` (`schema.prisma:1294-1312`): `userId`/`tenantId` XOR (`consentService.ts:46-53`), `type` (`AYDINLATMA`|`ACIK_RIZA`), **`version`**, `grantedAt`, `revokedAt`, `source`. Yeni rıza **yeni satır**, geri çekme satır silmez (`:97-99,130-146`). Kayıt akışı **atomik** (kullanıcı `create` ile aynı transaction — `authController.ts:189-211`).

🔴 **İki boşluk:**
1. **`hasValidConsent(subject, type, requiredVersion)` doğru yazılmış (`consentService.ts:152-162`) ama üretim kodunda HİÇBİR ÇAĞIRANI YOK.** *Kapsam:* `grep -rn "hasValidConsent\|getActiveConsent\|getAllConsents" src tests` → `src/` içinde **0** (yalnız tanım), tek tüketici `tests/consentService.test.ts`. `exportUserData` bile `getAllConsents` yerine ham `prisma.consent.findMany` kullanıyor (`gdprService.ts:308-312`).
   **Sonucu:** metin `v2.0`'a çıkarsa `v1.0` rızalı kullanıcılar **hiçbir yeniden-onay kapısıyla karşılaşmaz**. Rıza **yazılıyor ama hiç okunmuyor**.
2. `CONSENT_VERSION = 'v1.0'` bir **yer tutucu** — kodda yazılı: `TODO(G1-10): avukat metni gelince sürüm sabitlenecek` (`:25-28`) → DB'deki `'v1.0'` **yayınlanmış bir metin sürümüne karşılık gelmiyor**.

**OAuth'ta rıza: İMPLICIT.** Backend rızayı **varsayarak** yazıyor (`oauthService.ts:108-120`), yorum bunu itiraf ediyor (`:112-114`). Frontend'de OAuth düğmeleri **hiçbir onay kutusu/KVKK bağlantısı taşımıyor** — *kapsam:* `OAuthButtons.tsx` içinde `kvkk|rıza|consent|onay` → **0 eşleşme**. Kıyas: klasik kayıtta **zorunlu kutu var** (`_RegisterContent.tsx:398-421` + `z.literal(true)`). = **`F-03`**.
⚠️ **Ek bulgu:** tek kutu **KVKK açık rıza + 18+ beyanını BİRLEŞTİRİYOR** (`_RegisterContent.tsx:413-417`) ve `AYDINLATMA` ile `ACIK_RIZA` **aynı tek kutudan** iki satır yazılıyor (`consentService.ts:57-70`) → **aydınlatmayı ve açık rızayı ayrı ayrı reddetme imkânı yok**. Kod bunu "ayrı kutular G1-08 işi" diye not ediyor (`:58`).

### B.6 Yurtdışı aktarım — envanter ✅, **kullanıcıya gösterilen metin ❌**
*Kapsam:* `grep -rn "https://" src` (localhost/example hariç) → **0**; `grep -rn "fetch(" src` → **yalnız 4**, hepsi OAuth. **Envanter kodla örtüşüyor, yeni dış servis eklenmemiş** ✅ (PostgreSQL · SMTP · Google OAuth · LinkedIn OAuth; analitik "AKTİF DEĞİL" beyanı hâlâ doğru; LLM ve CDN yok).

🔴 **`app/kvkk/page.tsx:92-107` KODLA ÇELİŞİYOR — iki kat:**
1. Metin *"İrlanda (Avrupa Birliği) bölgesinde … yönetilen PostgreSQL"* + *"(GDPR) standartlarına tabidir"* diyor. **Gerçek:** `eu-west-2` = **Londra / Birleşik Krallık, AB üyesi DEĞİL** (`menti-mentor-v2/CLAUDE.md:255`, madde 92, **PO teyitli 2026-08-26**). → **yanlış ülke ve yanlış hukuki rejim beyanı**.
2. *"yönetilen PostgreSQL hizmeti"* diyor; **PROD kendi konteynerinde Postgres 16** (`docker-compose.yml:16-24,44`; `CLAUDE.md:261`). Uygulama sunucusunun ülkesi kodda **hiç yok** → **TEYİT GEREK (PO)**.
3. `kvkk/page.tsx:60-64` "Aktarım" bölümü **Google/LinkedIn OAuth ve SMTP sağlayıcısını hiç saymıyor** — oysa bu servislere kişisel veri gidiyor.
4. `kvkk/page.tsx:31-39` "İşlenen Kişisel Veriler" 5 kalem; kodda işlenen ama listede **olmayan**: mesaj içeriği · telefon · sosyal linkler · avatar · OCEAN/arketip · şikâyet kayıtları · **IP adresi** (`platformAudit.ts:32`) · `lastLoginAt`.

⭐ **PR #110 gerekçesi: EVET hâlâ GEÇERLİ — ama risk GERÇEKLEŞMİŞ DEĞİL, POTANSİYEL.**
`state: open`, `merged: false`, son hareket **2026-08-23** (29 gün). *Kapsam:* `frontend/src` özyinelemeli, **harf duyarsız**, `GTM-|gtag\(|clarity|next/script` → **0 eşleşme**; genişletilmiş desen (`googletagmanager|hotjar|posthog|mixpanel|plausible|matomo|segment\.|fbq\(`) → yalnız **kendi backend'inin** analytics ucunu çağıran iç kodlar. `components/analytics/` dizini main'de **yok**.
→ Bugün **tek bir izinsiz aktarım gerçekleşmiyor**; ama PR'ın ön koşulları (çerez bandı + Consent Mode v2 + metin güncellemesi) **karşılanmadı** → merge edildiği an autodeploy ile risk gerçekleşir. = **`Y-12`** (kuyrukta zaten var).
✅ `app/gizlilik/page.tsx:60-65` çerez beyanı (*"Analitik veya pazarlama çerezi bulunmamaktadır"*) **kodla TUTARLI**. ⚠️ Aynı sayfanın **2 satırı bayat:** `:76-81` *"veri silme talepleriniz için kurum yöneticiniz aracılığıyla"* — artık **self-servis var**; `:13` *"Son güncelleme: Temmuz 2026"*. Gizlilik metninde **yurt dışı aktarım bölümü hiç yok** (yalnız `/kvkk`'da).

### B.7 🔴 LOGLARDA KİŞİSEL VERİ — **VAR**
**Kural (`backend/CLAUDE.md` #5):** *"Log `userId` ve `tenantId` only — never `email`, `fullName`, `discVector`."*

🔴 **İHLAL (orkestratör teyitli):** `platformController.ts:42-45`
```ts
void logger.warn('AUTH', 'Platform login başarısız', { email: email ?? '(boş)', ip: req.ip ?? 'unknown' });
```
Başarısız **her** platform-admin giriş denemesinde **ham e-posta + IP** `SystemLog.meta`'ya **kalıcı** yazılıyor. Yanlış kutuya e-posta yazan **herhangi birinin** adresi de düşer.
⚠️ **Yapısal sebep:** `logger.ts:23-28` `meta`'yı **hiç süzmüyor** — `meta: meta ? (meta as object) : undefined`, allow-list/sanitizasyon **yok** → `meta`'ya ne konursa kalıcı DB'ye gider.
⭐ **Zincir:** bu satırlar `anonymizeUser` tarafından **temizlenmiyor** (B.2 — `SystemLog` UNUTULAN) → tek çıkış 90 günlük cron → **`CRON_ENABLED='false'` ise o da çalışmaz** (B.4) → **hesabını kapatmış kişinin e-postası sistemde süresiz kalabilir.**

**Sınırda (3):** `questionController.ts:318-323` `discVector.confidence` + `userId` (ham vektör değil — kuralın **lafzına** uyuluyor, **ruhuna** aykırı, karar PO/hukukçuda) · `errorHandler.ts:19-27` `err.message`/`err.stack` kontrol edilemez içerik taşır (somut sızıntı **bulunamadı** → **TEYİT GEREK**) · `requestLogger.ts:22` `originalUrl` **query dâhil** → OAuth `?code=`/`?state=` ve `?token=` (kalıcı `unsubscribeToken`) **konsola** düşüyor (DB'ye değil).

✅ **TEMİZ çıkanlar (kanıtlı):** `platformAudit.ts:31-36` (yalnız `actorId`/`action`/`ip`; dosya başında açık yasak `:12-14`) · `notificationService.ts:43-47` (`title` loglanıyor, **`body` loglanmıyor**) · `emailService.ts:76,80` (**alıcı adresi loglanmıyor**, kural yorumda `:70-71`) · `cronScheduler.ts:254-255` (adresler mail fonksiyonuna gidiyor, log'a değil) · `adminController.ts:666,774` **yanlış pozitif** (logger değil, mail çağrısı — ayıklandı).
✅ **Frontend TEMİZ:** *kapsam* `frontend/src` özyinelemeli, `__tests__` hariç → **toplam 3 `console.*`** (`TenantSwitcher.tsx:69`, `error.tsx:28`, `global-error.tsx:22`), hiçbiri kullanıcı alanı basmıyor.

---

## 2.A — YETKİ MATRİSİ

**190 uç** tarandı (188 uç / 23 rota dosyası + `GET /health` `server.ts:60` + `POST /api/tags/suggest` `server.ts:139`). **Orkestratör bağımsız sayımı aynı sonucu verdi.**

### A.0 Mimari ön bilgi — matrisin doğru okunması için zorunlu
1. `requireTenant` (`middleware/tenant.ts:20`) dört iş birden yapar: tenant doğrulama · JWT çözme · **cross-tenant token reddi** (`:66-77`) · **aktif `TenantMembership`** kontrolü (`:82-97`).
2. `db.ts:54-71` Prisma extension: `TENANT_SCOPED` (14 model, `db.ts:19-39`) + okuma op'u ise **`where.tenantId` otomatik enjekte edilir**. `findUnique` **kasıtlı kapsam dışı** (`db.ts:41-43`).
⭐ **Bu yüzden "controller'da `tenantId` yok" ≠ "tenant sızıntısı var".** Her satır iki katmana göre değerlendirildi — **yanlış soru tuzağına düşülmedi**.

### A.1 Public uçlar — **17 uç, "kazara public" 0**
Kasıtlı-public listesi 6 kalem; listede olmayan 11 ucun **hepsi** ya kimliğini token/parola ile kanıtlıyor (`refresh`, `logout`, `reset-password`, `reapply` — `authController.ts:409` **bcrypt ile parola doğruluyor**) ya rate-limit + **yazılı gerekçeyle** açık (`check-slug` `:22`, `self-serve/register` `:24`, `platform/auth` `:33`).
🟡 **Tek yapısal not (DÜŞÜK):** `GET /api/auth/:provider` (`authRoutes.ts:55`) bir **catch-all GET**'tir. `/api/auth/me` (`:42`) ondan ÖNCE tanımlı olduğu için bugün sorun yok; ama `/api/auth` altına **55'ten sonra** eklenecek her yeni GET ucu sessizce `oauthRedirect`'e düşer. Kod yorumu bu riski belgelemiyor.
= **`V-09`** (BITTI) ile örtüşüyor; o satır "11 belgelenmemiş public uç" demişti — bu tur **hepsinin gerekçeli olduğunu** doğruladı, yeni satır gerekmiyor.

### A.2 🔴 IDOR — **5 YENİ doğrudan bulgu + 2 komşu**
`requireSelfOrAdmin` 7 yerde, **17 uçta controller-içi inline sahiplik kontrolü** doğrulandı (bunlar geçerli korumadır). Parametreli 76 ucun tamamı gözden geçirildi.

| # | uç | şiddet | kanıt | saldırgan ne elde eder |
|---|---|---|---|---|
| **G-1** | `POST /api/meetings/:meetingId/feedback` | 🔴 **KRİTİK** | `meetingRoutes.ts:86` `requireRole('ADMIN','MENTOR','MENTI')` = *her kullanıcı*. `feedbackController.ts:30-104` — **orkestratör teyidi: `req.auth` 0 kez geçiyor**. Uç, meeting'i çekerken `mentorUserId`/`mentiUserId`'yi **`:38`'de zaten seçiyor** ama karşılaştırmıyor | (1) Başkasının görüşmesine **sahte değerlendirme** · (2) `guidanceScore/trustScore` → `persistMentorQualityMultiplier` `:83` → **hedef mentörün kalıcı kalite katsayısı düşer**, eşleştirmede geriye gider · (3) `preparednessScore<=2` → `:92-96` **hedef mentiye oryantasyon kilidi** = hizmet engelleme · (4) `hasFeedback=true` `:69-72` → **gerçek taraflar bir daha yazamaz** (409) |
| **G-2** | `POST /api/scoring/feedback` | 🔴 **KRİTİK** | **Orkestratör teyidi:** `FeedbackSchema:39-40` **`fromUserId` VE `role` gövdeden**; `feedbackHandler:255` `{...parsed.data, tenantId}` — `req.auth` hiç kullanılmıyor; `feedback.service.ts:26-32` yalnız match'in tenant'ını doğruluyor | (1) `upsert` (`:34`) → **gerçek geri bildirimi EZER** · (2) kayda **sahte rol** yazılır · (3) ⭐ `earlyExit:true` → `feedback.service.ts:61-65` `prisma.match.updateMany({status:'EARLY_EXIT'})` → **üçüncü bir kullanıcı başkasının mentörlük eşleşmesini SONLANDIRIR** |
| **G-3** | `GET /api/meetings/:meetingId/check-ins` | 🟠 YÜKSEK | `meetingRoutes.ts:119` yalnız `requireAuth()`; `meetingCheckInController.ts:100-108` `req.auth` **hiç okunmuyor**. Karşı örnek: aynı dosyanın `submitCheckIn`'i `:56-61` taraf kontrolü **yapıyor** | Kurumdaki herkes başkasının check-in'lerini okur: `overallRating`, `continueIntent`, `menteePreparedness`, **`nextTopicNote` (500 krk)**, **`concernTag`** (ör. `MOT_DUSUK`), **`openNote` (1000 krk)** — ilişkinin **en mahrem serbest-metin verisi** |
| **G-4** | `POST /api/meetings` | 🟠 YÜKSEK | `meetingRoutes.ts:67` `requireRole('ADMIN','MENTI')`; `createMeeting` `:155-211` — `mentorId`/`mentiId` **gövdeden**, `req.auth.userId` karşılaştırması **yok**. İkizi `bookMeeting` `:515` token'dan alıyor → `createMeeting` **eski/güvensiz ikiz** | Menti, başka mentinin id'siyle görüşme yaratır → (1) kurbanın **haftalık kotası** doldurulur (`:119,184`) → kurban gerçek görüşme alamaz · (2) mentöre **kurbanın adına talep e-postası** gider (`:199-203`) |
| **G-5** | `POST /api/feedback-logs` | 🟠 YÜKSEK | `feedbackLogRoutes.ts:17`; `feedbackLogController.ts:45-99` — `mentorId`/`mentiId` gövdeden, `req.auth` **hiç geçmiyor**. ⭐ **Asimetri:** aynı dosyada **okuma** korunuyor (`:122-123` `role==='MENTOR' ? userId : mentorId`), **yazma** korunmuyor | Mentör A, B adına 1 yıldız yazar → (1) kayıt **B'nin adına** görünür (`:134`) · (2) `applyFeedbackSignal` `:84-90` → **kurumun ML DISC kombinasyon skorları zehirlenir**, gelecekteki tüm eşleştirmeler etkilenir · (3) `@@unique` nedeniyle **gerçek mentör o çift için bir daha yazamaz** |
| **G-6** | `GET /api/users/:id` | 🟡 ORTA | `listUsers` iki kapı kuruyor (çağıran APPROVED değilse 403 `:46-57`; sonuçlar `approvalStatus:'APPROVED'` `:74`, gerekçe `:69-73` *"onaylanmamış üye GÖRÜNMEZ"*). `getUser` `:187-215` **ikisini de yapmıyor** | PENDING kullanıcı `listUsers`'ın 403 kapısını **teker teker atlar**; herkes onaylanmamış/reddedilmiş üyelerin `USER_PUBLIC_SELECT` profilini okur. *(Ham DISC/e-posta sızmıyor — `fullAccess` kapısı `:189,193` doğru çalışıyor)* |
| **G-7** | `POST /api/scoring/rank-mentors` | 🟡 ORTA | `sjtScoringController.ts:90-142` — `mentiId` gövdeden, sahiplik yok. Karşı örnek: `computeProfileHandler:61-65` aynı dosyada sahiplik **zorluyor** | Başkasının **kişiselleştirilmiş mentör sıralaması + uyum skorları**. *Sömürü zorluğu:* parametre `User.id` değil **`UserProfile.id`** ve istemciye rutin dönmüyor → pratikte tahmin zor |

⭐ **Ortak desen:** yedisinin **altısında** aynı dosyada veya aynı ailede **doğru desen zaten var** (okuma korunuyor/yazma korunmuyor, ikiz uç korunuyor/eski uç korunmuyor). Bu bir bilgi eksikliği değil, **tutarlılık denetimi eksikliği**.

### A.3 ✅ TENANT SIZINTISI: **YOK**
Üç katmanlı savunma, her katman kodla teyit: (1) **token↔header çelişkisi reddi** `tenant.ts:66-77` → 403 + log · (2) **aktif üyelik kapısı** `:82-97` · (3) **RLS enjeksiyonu** `db.ts:60-65`.
26 model `tenantId` taşıyor, `TENANT_SCOPED` listesinde 14 var; kalan 12'nin **hepsi** ya açık `where:{tenantId}` kullanıyor (`MeetingCheckIn`, `MentorshipAgreement` 5/5, `UserReport`, `InvitationTemplate`) ya **kasıtlı global** ve gerekçesi kodda yazılı (`Conversation` — sınır tenant değil **KATILIMCI**, shared-pool'da taraflar farklı kurumda olabilir, `db.ts:34-38`; `Question`/`LearningStage` `tenantId:null` = global, **mutasyonları kilitli** `questionController.ts:125-133,168-176,208-216`; `SystemLog` platform-global).
`requireTenant`'ı atlayan **7 ucun 7'sinde de** elle `payload.tenantId !== :id → 403` mevcut (`selfServeController.ts:388,503,598,741,755`; `adminSettingsController.ts:82,141`) — **eksik yok**.

### A.4 Rol yükseltme — doğrudan yükseltme YOK, **2 kural ihlali**
✅ `requireRole` fail-closed (`authorize.ts:42-60`); gövdeden rol yükseltme kapalı (`.strict()` whitelist `userController.ts:336-350`; `sjtScoringController.ts:65` non-admin için rolü token'dan zorluyor).

| # | ihlal | kanıt | sonucu |
|---|---|---|---|
| **G-8** 🟡 | **Rol `TenantMembership.role`'den değil JWT'den okunuyor** — CLAUDE.md kuralı (`:236`) ihlali | `tenant.ts:82-85` membership'i çekiyor ama **`select:{isActive:true}` — rol seçilmiyor**; `:102` `role: payload.role`. `requireRole`/`requireSelfOrAdmin` + 20+ controller kontrolü buna dayanıyor | **Rol düşürme ≤1 saat gecikir:** `demoteFromAdmin` (`adminController.ts:951-978`) iki tabloyu da günceller ama **token'ı iptal etmez** → yetkisi alınan yönetici ≤1 saat `/api/admin/*`'ta ADMIN kalır. ⭐ **Doğru desen kodda VAR** (`meetingController.ts:334-340`, `matching.ts:154-156` `TenantMembership.role` okuyor) — yetki middleware'inde uygulanmamış. Ayrıca admin **sayımları** `prisma.user.count({role:'ADMIN'})` ile (`:909,929,960`) — `ensureMembershipSafe` **non-fatal** olduğu için senkron sessizce bozulursa `MAX_ADMINS` ve "son admin" koruması yanlış sayıya dayanır |
| **G-9** 🟡 | **`selfServe`/`adminSettings` üyelik kapısını atlıyor** | `extractAdminPayload` (`selfServeController.ts:61-71`, `adminSettingsController.ts:11-21`) yalnız `verifyToken` + `role==='ADMIN'`; `TenantMembership.isActive` kapısı **yok** | Üyeliği pasife alınmış (ör. anonimleştirme akışı üyeliği pasifler) bir yönetici, elindeki JWT ile `PATCH /:id/settings` ve `POST /:id/block-pair` çağırıp **kurumun görüşme limitini/minimum eşleşme skorunu değiştirebilir, üye çiftlerini engelleyebilir**. Ayrıca `aud` claim'i kontrol edilmiyor (kıyas: `platformAuth.ts:27` **kontrol ediyor**) |

### A.5 Frontend-only guard — **12 kural incelendi, 10'u server-side VAR, 2'si YOK**
✅ VAR: admin alanı · sertifika · mentör paneli · öğrenme yolculuğu · **k-anonimlik** (bu hafta kapatıldı) · PENDING login yönlendirmesi · anlaşma (sahiplikle) · sertifika rozeti · menti'ye DISC gizleme (asıl kapatma **backend'de**, `discVisibility.ts`).
✅ `frontend/src/middleware.ts:11-20` rol guard'ının **bilinçli yokluğu** gerekçeli (auth cookie'leri backend origin'inde; *"JS-yazılabilir rol cookie'si sahte güven verir"*) → **bulgu değil**.

| # | frontend kuralı | backend | durum |
|---|---|---|---|
| **G-10** 🟡 | `menti/page.tsx:55-58` mentör listesi yalnız `isApproved` iken sorgulanıyor | `matching.ts:355-366` çağıranı yalnız `isActive` + MENTI üyeliğiyle doğruluyor; **`approvalStatus` okunmuyor** (hedefler `:385` filtreli) | **YOK** — PENDING menti `/api/users`'tan 403 yerken bu uçtan kurumun **tüm onaylı mentörlerinin** ad/avatar/sektör/uyum yüzdesini alır. ⭐ **Bu haftaki k-anonimlik açığıyla birebir aynı sınıf.** = **`U-08`, ek bulgu:** U-08 doğru teşhis koymuş; bu tur **etkiyi** (hangi alanlar sızıyor) ve **karşı örneği** (`userController.ts:69-73` aynı kuralı doğru uyguluyor) ekliyor |
| **G-11** 🟡 | `menti/page.tsx:45,155` oryantasyon kilidi ekranı | `checkOrientationLock` **yalnız 2 yerde**: tanım `:140`, tek çağrı `:162` (`createMeeting`). Canlı yol `bookMeeting` `:413-532`'de **çağrı yok** | **YOK** = **`V-15`** (kuyrukta zaten var, BEKLIYOR). Ek bulgu: kilidi basan yer `feedbackController.ts:92-96` — yani **G-1 ile zincirleniyor**: saldırgan G-1 ile kilidi basar, kurban G-11 ile atlayabilir; ikisi de düzeltilmeli |

---
