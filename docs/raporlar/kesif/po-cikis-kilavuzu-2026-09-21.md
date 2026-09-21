# PO CANLIYA ÇIKIŞ KILAVUZU — 11 iş, koddan çıkarılmış adımlar

**📸 DONDURULMUŞ** — bu turun kod fotoğrafı. Güncel durum: `docs/kararlar/09-DURUM.md`.
**Tur:** BA · **Dal:** `otonom/BA-po-cikis-kilavuzu-20260921` · **Tarih:** 2026-09-21
**Kod sürümü:** backend `main` @ `b5415bd` · çatı+frontend `main` @ `a8cec0f`
**Mod:** 🟩 PLANLA — salt-okuma. Kod/DB/şema **değişmedi**, `docs/otonom/` · `docs/kararlar/` · `docs/arsiv/` · `CLAUDE.md` **ellenmedi**. Repoya eklenen tek dosya bu kılavuzdur.
**Yöntem:** 4 paralel salt-okuma alt-ajanı (A1+C11 · A2 · A3+B4 · B5–B9+SITE_URL) + orkestratörün elle teyidi. Her iddia `dosya:satır` kanıtlı.

## ⛔ GÜVENLİK — bu belgede gerçek değer YOKTUR
Repo **PUBLIC**. Şifre · API anahtarı · token · SMTP parolası · JWT secret · gerçek alan adı **buraya yazılmaz.**
Aşağıda yalnız **değişken ADI · değer BİÇİMİ · yer tutucu** vardır. Yer tutucular:

| Yer tutucu | Ne demek |
|---|---|
| `<BACKEND-ALAN>` | Backend'in (API) alan adı, protokolüyle. Örn. biçim: `https://api.ornek.org` |
| `<FRONTEND-ALAN>` | Kullanıcıların girdiği site adresi. Örn. biçim: `https://ornek.org` |
| `<SMTP-SUNUCU>` | E-posta sağlayıcısının sunucu adresi. Örn. biçim: `smtp.saglayici.com` |
| `<GONDEREN-ADRES>` | Gönderen e-posta adresi. Örn. biçim: `noreply@ornek.org` |
| `<BAĞLANTI-DİZESİ>` | Veritabanı bağlantı dizesi — **hiçbir yere yapıştırma, ekran görüntüsü alma** |

---

## ⚠️ ÖNCE OKU — BU KILAVUZ NEYİN YERİNE GEÇMEZ

`docs/otonom/03-PO-ELLE-ISLER.md` **zaten var** (58 satır, 2026-09-19) ve aynı 13 işi listeliyor. Buradaki A1/A2/A3/B4–B9/C11 kodları **oradan** geliyor.

**Bu kılavuz onun yerine geçmez, yürütme katmanıdır.** Fark:

| `03-PO-ELLE-ISLER.md` verir | Bu kılavuz ekler |
|---|---|
| Ne · neden kritik · nerede yapılır · nasıl anlaşılır | Değişkenin **tam adı ve değer biçimi** · **hangi servise** (backend mi frontend mi) · **build mi restart mı** · Dokploy'da adım sırası · bilinen tuzaklar · yapılış **sırası** |

⛔ **Çelişki olursa:** iş tanımı ve öncelik için `03-PO-ELLE-ISLER.md`, değer/biçim/adım için bu belge. İkisi de koddan üretildi; bu belge daha yeni koda (`b5415bd`) bakıyor.

> ⚠️ **Not — bulunamayan kaynak:** Bu turun gerekçesi `docs/raporlar/kesif/devir-analizi-2026-09-21.md` §11'e atıf yapıyordu. **Bu dosya depoda YOK.**
> Kapsam beyanı: `find` ile iki repoda dosya adı araması (`*devir*`) + `grep -rn "devir-analizi" docs/` + `git log --all --diff-filter=A` + `git branch -r` (3 uzak dal) → **0 sonuç.** Muhtemelen terminalde çalışan tur onu henüz commit etmedi. İş listesi promptta açıkça verildiği için tur yine de yürütüldü; "24 çıkış blokeri, 10'u PO'nun" sayıları **bu belgeden doğrulanamadı** ve burada tekrarlanmıyor.

---

# 1. ⭐ 15 DAKİKALIK SIRA

**Nasıl kullanılır:** Sırayı bozma. Aynı ekranda yapılanlar bir arada; **tüm env'ler tek seferde girilir, sonra TEK restart/build.** Kutucuklar telefondan işaretlenebilir.

> 🔴 **Sadece iki iş BUILD ister** (restart yetmez): **B7** ve **EK (SITE_URL)**. Diğer her şey restart'la gelir.
> ⏱️ Aşağıdaki 15 dakika **A2 (yedek) hariçtir.** A2 ayrı bir oturumdur (§2.A2) — 30–60 dk + ayrıca prova.

### BLOK 0 — Önce bunu öğren (2 dk, hiçbir şeyi değiştirmeden)

- [ ] **0.1** Dokploy → backend uygulaması → ortam değişkenleri → `DATABASE_URL` **hangi sunucuyu gösteriyor?**
      Neon adresi mi, yoksa `@postgres:5432` mi? **Değeri kimseye gönderme, sadece hangisi olduğunu not et.**
      ⚠️ Neden ilk adım: belgeler çelişiyor (§5, Ç-1). **A2 (yedek) bu cevaba bağlı — yanlış veritabanının yedeği işe yaramaz.**

### BLOK 1 — Backend ortam değişkenleri (5 dk, TEK ekran, TEK kayıt)

Dokploy → **backend** uygulaması → ortam değişkenleri bölümü. Hepsini gir, **sonra tek sefer kaydet.**

- [ ] **1.1 · A3** `NODE_ENV` → `production` (tam bu yazım; `Production`/`prod` **çalışmaz**)
- [ ] **1.2 · B4** `SMTP_HOST` → `<SMTP-SUNUCU>`
- [ ] **1.3 · B4** `SMTP_PORT` → `465` (ya da sağlayıcı 587 diyorsa `587`)
- [ ] **1.4 · B4** `SMTP_USER` → sağlayıcının verdiği kullanıcı adı (⚠️ e-posta adresi olmayabilir)
- [ ] **1.5 · B4** `SMTP_PASS` → sağlayıcının verdiği şifre/anahtar
- [ ] **1.6 · B4** `SMTP_FROM` → `<GONDEREN-ADRES>` ⚠️ **atlanırsa kaynak koddaki sabit adrese düşer → mailler spam'e gider**
- [ ] **1.7 · B4** `SMTP_SECURE` → **port 465 ise HİÇ YAZMA** (otomatik doğru). Port 587 ise `false`
- [ ] **1.8 · B5** `TENANT_NOTIFICATIONS_ENABLED` → `true` (küçük harf; `TRUE`/`1`/`yes` **çalışmaz**) ⚠️ önce §2.B5'teki karar notunu oku
- [ ] **1.9 · B6** `BACKEND_URL` → `<BACKEND-ALAN>` — **sonda eğik çizgi YOK**
- [ ] **1.10 · EK** `FRONTEND_URL` → `<FRONTEND-ALAN>` — sonda eğik çizgi YOK ⚠️ **gizli ön koşul** (§2.EK-FRONTEND_URL)
- [ ] **1.11 · B8** `ALLOWED_ORIGINS` → `<FRONTEND-ALAN>` · birden fazlaysa **virgülle, BOŞLUK YOK**
- [ ] **1.12 · A1** `UPLOAD_DIR` → `/app/uploads` ⛔ **ASLA boş bırakma / `UPLOAD_DIR=""` yazma** (§2.A1 Tuzak-1)
- [ ] **1.13 · B9** `CRON_ENABLED` → **HİÇBİR ŞEY YAZMA.** Varsayılanı zaten açık. Listede `false` varsa **sil**
- [ ] **1.14** `JWT_SECRET` ve `PLATFORM_ADMIN_KEY` dolu mu? Boşsa canlıya çıkma (§2.A3)
- [ ] **1.15** `PLATFORM_ADMIN_EMAIL` dolu mu? ⚠️ boşsa sistem **durmaz**, sessizce zayıf varsayılana düşer

### BLOK 2 — Kalıcı disk (3 dk, aynı uygulamanın ayarları)

- [ ] **2.1 · A1** Backend uygulamasının **kalıcı disk / volume** bölümüne bir mount ekle:
      **Mount yolu: `/app/uploads`** · tür: **kalıcı volume** (bind mount değil) · ad: serbest (ör. `menti-uploads`)
- [ ] **2.2 · A1** ⚠️ Klasör sahipliği **uid 1001** olmalı. Dockerfile'da bunu ayarlayan satır **yok** (§2.A1 Tuzak-2) — boş volume `root` sahipli gelirse backend yazamaz

### BLOK 3 — Backend'i yeniden başlat (1 dk)

- [ ] **3.1** Backend → **Redeploy / Restart**. Yeşil olmasını bekle.

### BLOK 4 — Frontend 🔴 BUILD (3 dk)

- [ ] **4.1 · B7** Frontend'in **build argümanı** olarak `NEXT_PUBLIC_API_URL` = `<BACKEND-ALAN>`
      ⛔ Bunu "Environment" kutusuna yazmak **HİÇBİR İŞE YARAMAZ** — değer derleme sırasında koda gömülür (§2.B7)
      *(compose ile deploy ediliyorsa ayrıca yazma: `BACKEND_URL`'den besleniyor — yine de **yeniden build** şart)*
- [ ] **4.2 · B7** Frontend → **REBUILD** (Restart değil, yeniden **BUILD**)

### BLOK 5 — Doğrulama (4 dk, hepsi tarayıcıdan)

- [ ] **5.1** `<BACKEND-ALAN>/health` aç. Şu dördü birden olmalı:
      `"env": "production"` · `"db": "up"` · `"smtp": "verified"` · `"cron": "enabled"`
      *(bu tek sayfa A3 + B4 + B9'u birden doğrular)*
- [ ] **5.2 · B7** Sitede **F12 → Network**, giriş yapmayı dene → `login` isteğinin adresi **`<BACKEND-ALAN>`** olmalı, `localhost` **değil**
- [ ] **5.3 · B8** **F12 → Console**'da `blocked by CORS policy` **olmamalı**. `www`'lu ve `www`'suz ayrı ayrı dene
- [ ] **5.4 · A1** Profil → **Fotoğraf yükle** → fotoğraf görünüyor mu
- [ ] **5.5 · A1** Backend'i **tekrar Redeploy et** → **Ctrl+F5** ile profili aç → ⭐ **fotoğraf hâlâ duruyorsa kalıcı disk ÇALIŞIYOR**
- [ ] **5.6 · B5** Platform paneli → bir test kurumunu **Onayla** → o kuruma mail geldi mi
- [ ] **5.7 · C11** Admin panelde üç ekranı aç (§2.C11): Soru Yönetimi · Sertifika Konuları · Öğrenme Yolculuğu — üçü de **dolu** mu

### BLOK 6 — Ayrı oturum (bugün değil de olur, ama ertelenmemeli)

- [ ] **6.1 · A2** Veritabanı yedeği + **geri yükleme provası** → §2.A2 (30–60 dk)
- [ ] **6.2 · C13** İki yedek tablo düşürülsün mü kararı → §2.A2 sonu
- [ ] **6.3 · EK** `NEXT_PUBLIC_SITE_URL` 🔴 **şu an SET EDİLEMİYOR** — kod değişikliği gerekiyor (§2.EK-SITE_URL). PO'nun yapabileceği bir şey yok, ajan işi.

---

# 2. İŞLERİN AYRINTISI

> Her iş aynı şablonda: **Neden kritik · Kodda nerede okunuyor · Değişken adı · Hangi servise · Değer biçimi · ⚠️ Tuzak · Adımlar · Çalıştığını nasıl anlarım.**
> ⛔ Dokploy'un menü adları **uydurulmadı.** "ortam değişkenleri bölümü", "kalıcı disk bölümü", "build argümanları" gibi **işlev adlarıyla** yazıldı — arayüz sürümle değişebilir.

---

## A1 · Avatar için kalıcı disk (🔴 çıkış blokeri)

**Neden kritik:** Kullanıcı profil fotoğrafını yükler; günler sonra bir deploy olur ve **fotoğraf silinir** — ama `User.avatarUrl` veritabanında kalır, yani profilde kırık bir kare görünür. Hiçbir hata, hiçbir log yoktur; kullanıcı şikâyet edene kadar kimse bilmez. **Veritabanı yedeği bunu düzeltemez** (dosyalar veritabanında değil).

**Kodda nerede okunuyor:**
| Ne | Yer |
|---|---|
| Klasör yolu | `backend/src/config.ts:113` → `process.env.UPLOAD_DIR ?? resolve(process.cwd(), 'uploads')` |
| Klasör yaratma | `backend/src/services/avatarStorage.ts:61-63` (`mkdir`, recursive) |
| Diske yazma | `backend/src/services/avatarStorage.ts:66-69` (`writeFile`) |
| Dosya adı | `backend/src/services/avatarStorage.ts:51-53` → `<userId>-<uuid>.<uzantı>` (kullanıcı adı girdi olarak kullanılmaz) |
| İnternete servis | `backend/src/server.ts:71-73` → `express.static`, URL yolu **`/uploads`** |
| Yükleme ucu | `POST /api/users/me/avatar` — `backend/src/routes/userRoutes.ts:49-55` |
| Konteyner çalışma dizini | `backend/Dockerfile:23` → `WORKDIR /app` |
| Konteyner kullanıcısı | `backend/Dockerfile:26-27` (uid **1001**) + `:38` (`USER backend`) |

⇒ **`UPLOAD_DIR` yazılmazsa yol `/app/uploads` olur** (`config.ts:113` + `Dockerfile:23`) — ve bu, konteynerin **geçici** katmanıdır, her deploy'da silinir.

**Değişken adı:** `UPLOAD_DIR` · (ilgili: `UPLOAD_PUBLIC_BASE_URL`, `UPLOAD_MAX_BYTES` — ikisi de opsiyonel)
**Hangi servise:** yalnız **BACKEND**
**Değer biçimi:** `/app/uploads` — mutlak yol, sonda eğik çizgi yok. **Mount yolu ile BİREBİR aynı olmalı.**
**Varsayılanı:** `/app/uploads` (yukarıdaki hesap) · **varsayılanda kalırsa:** yol doğru ama **disk kalıcı değil** → her deploy fotoğrafları siler.
**BUILD gerektirir mi:** ❌ Hayır, restart yeterli.

### ⚠️ Tuzaklar

**Tuzak 1 — 🔴 `UPLOAD_DIR` ASLA boş bırakılmaz.** `backend/.env.example:101` şablonunda `UPLOAD_DIR=""` yazıyor ve yorumu (`:98-100`) "boş bırakılırsa varsayılan kullanılır" diyor. **Kod bunu YAPMIYOR:** `config.ts:113` `??` operatörü kullanıyor, `??` yalnız tanımsız/null için yedeğe düşer — **boş metin geçerli bir değer sayılır.** Sonuç: yol boş kalır, klasör yaratma patlar, fotoğraflar servis edilemez.
⇒ **Kural: ya `UPLOAD_DIR`'ı hiç tanımlama, ya `/app/uploads` yaz. Asla boş bırakma.** (Bu, `.env.example` ile kodun çeliştiği bir nokta — §5, Ç-3.)

**Tuzak 2 — 🔴 Klasör sahipliği.** Backend uid **1001** ile çalışıyor (`Dockerfile:26-27,38`) ama **Dockerfile'da `/app/uploads` için ne `mkdir` ne `chown` var** (43 satırın tamamı okundu; `grep "VOLUME"` → 0). Yeni boş bir volume `root` sahipli gelirse uid 1001 oraya **yazamaz**. Bu bir olasılık değil, Dockerfile'ın yapısal eksiği.
⇒ **Belirti:** kullanıcı fotoğraf yüklerken kırmızı yazı görür: **"Fotoğraf şu anda kaydedilemedi. Lütfen daha sonra tekrar deneyin; sorun sürerse yöneticinize bildirin."** (HTTP 503 `AVATAR_YAZILAMADI` — `backend/src/controllers/avatarController.ts:58-61`).
⇒ **Bu cümleyi görürsen: volume yok ya da yazma izni yok.** Dokploy'da volume'ün sahipliğini uid 1001'e ver.

**Tuzak 3 — 🔴 Doğrulamada Ctrl+F5 şart.** `backend/src/server.ts:79` fotoğraflara `Cache-Control: public, max-age=86400` (24 saat) gönderiyor. Normal yenilemede tarayıcı fotoğrafı **kendi önbelleğinden** gösterir ve sen yanlışlıkla "çalışıyor" sanarsın. **Sert yenile (Ctrl+F5) veya gizli sekme kullan.**

**Tuzak 4 — Yanlış-negatif riski.** Fotoğraf yüklenip de **görünmüyorsa** sorun kalıcı disk olmayabilir: `NEXT_PUBLIC_API_URL` yanlış build edilmişse `next/image` görseli reddeder (`frontend/next.config.mjs:45-54` bu URL'den izin deseni üretiyor). ⇒ **A1'i test etmeden önce B7'yi bitir.**

### Adımlar
1. Dokploy → **backend** uygulaması → **kalıcı disk / volume** bölümü → yeni mount ekle.
   **Mount yolu: `/app/uploads`** · tür: **kalıcı volume** (bind mount değil) · ad: serbest.
2. Aynı uygulamanın **ortam değişkenleri** bölümüne `UPLOAD_DIR=/app/uploads` ekle. (Boş bırakma — Tuzak 1.)
3. Volume'ün sahipliğinin **uid 1001** olduğundan emin ol (Tuzak 2).
4. Backend'i **Redeploy** et.

### Çalıştığını nasıl anlarım
| # | Adım | ✅ DOĞRU | 🔴 YANLIŞ ve anlamı |
|---|---|---|---|
| 1 | Giriş yap → menüde **👤 Profil** (`frontend/src/components/organisms/DashboardNav.tsx:17` MENTI / `:25` MENTOR) | Sayfa açılır, **"Fotoğraf yükle"** butonu var (`profile/page.tsx:194`) | — |
| 2 | JPG/PNG/WebP seç (en çok 5 MB — `profile/page.tsx:16-17`) | Fotoğraf ekranda belirir | Kırmızı **"Fotoğraf şu anda kaydedilemedi…"** → **yazma izni yok** (Tuzak 2) |
| 3 | Fotoğrafa sağ tık → resim adresini yeni sekmede aç | Adres `<BACKEND-ALAN>/uploads/…` ve fotoğraf açılır | 404 → `BACKEND_URL` yanlış (→ B6) |
| 4 | Backend'i **Redeploy** et, yeşil olsun | — | — |
| 5 | **Ctrl+F5** ile profili aç | ⭐ **Fotoğraf hâlâ duruyor = KALICI DİSK ÇALIŞIYOR** | Kırık kare / baş harf rozeti → **kalıcı disk YOK** |
| 6 | Adım 3'teki `/uploads/…` adresini tekrar aç | Açılır | **404** → dosya gerçekten silinmiş, kesin kanıt |

> Adım 2 başarılı **ama** adım 5 başarısızsa: yazma izni **var**, kalıcılık **yok** (mount eksik).
> Adım 2'de 503 alıyorsan: yazma izni **yok** (sahiplik sorunu).

---

## A2 · Veritabanı yedeği + geri yükleme provası (🔴 çıkış blokeri · AYRI OTURUM)

**Neden kritik:** Bugün 6 saatten eski veri kaybına karşı **sıfır koruma** var. Üstelik kod **her hafta ve her gün otomatik veri siliyor** — ve silme saatleri 6 saatlik pencereyi aşıyor:

| Silen iş | Saat (UTC) | **Türkiye saati** | Pencere kapanışı | Kanıt |
|---|---|---|---|---|
| KVKK temizliği (`runWeeklyPurge`) | Pazar 03:00 | **Pazar 06:00** | Pazar 12:00 | `cronScheduler.ts:422-424` |
| Taslak kurum temizliği (`runDraftTenantCleanup`) | Her gün 04:00 | **Her gün 07:00** | Aynı gün 13:00 | `cronScheduler.ts:432-434`, silme `:211-212` |

⇒ Pazar sabahı silinen bir şey **pazartesi mesaide fark edilirse ~27 saat geçmiş** olur → Neon penceresi kapanmıştır, **geri dönüş yok.** Bunu bir insan değil, **kodun kendisi her hafta tetikliyor.**

**Kodda nerede:** `backend/src/services/cronScheduler.ts:410-458` (8 iş, hepsi UTC) · `backend/src/services/gdprService.ts:341-342` (saklama süreleri: `SystemLog` 90 gün, `FeedbackLog` 3 yıl) · `:359-389` (`purgeExpiredData`)

**Değişken adı:** — (bu bir env işi değil, yordam işi)
**Hangi servise:** — (Neon hesabı + PO'nun bilgisayarı)
**BUILD gerektirir mi:** ❌

### ⛔ ADIM 0 — Hangi veritabanı canlı? (bu netleşmeden başlama)
Belgeler çelişiyor (§5, Ç-1): `CLAUDE.md:245` "canlı ve lokal **aynı Neon**" der, `CLAUDE.md:261` "**PROD**: docker-compose Postgres, **Neon değil**" der.
⇒ Dokploy → backend → `DATABASE_URL` hangi sunucuyu gösteriyor? **Yanlış veritabanının yedeği hiçbir şey kurtarmaz.**
*(`CLAUDE.md:262`'nin kendi kuralı: "hangi DB'ye bağlı olduğunu ÖNCE host'tan doğrula. Yanlış DB'de iş yapma.")*

### Seçenekler — üçü de gerçek, farklı maliyet/hukuk profili

| | (a) Neon ücretli plan | (b) `pg_dump` ile kendi bilgisayarına | (c) Sunucuya yazan cron | (d) GitHub Actions artifact |
|---|---|---|---|---|
| **Ne yapar** | Geri dönüş penceresi 6 saat → 30 gün | Tam kopyayı **tek dosyaya** indirir | Dokploy sunucusunda dosya üretir | CI'da dosya üretip saklar |
| **Gerçek yedek mi** | 🟡 pencere, ayrı kopya değil | ✅ **evet, Neon'dan bağımsız** | ✅ evet | ✅ evet |
| **Para** | aylık ücret (**fiyat TEYİT GEREK** — repoda yok) | **0** | 0 | 0 |
| **Kod işi** | **yok** | yok (elle komut) | var (ajan) | var (ajan) |
| **Neon hesabı kaybına karşı korur** | ❌ | ✅ | ✅ | ✅ |
| **KVKK** | 🟢 yeni aktarım **yok** — veri Neon'dan çıkmaz | 🟢 yurtdışı aktarım yok (PO Türkiye'deyse) ama **Md.12 güvenlik yükümlülüğü doğar** | 🟡 **sunucunun ülkesine bağlı — TEYİT GEREK** | 🔴 **üçüncü ülkeye aktarım sayılabilir** |
| **Otomatik** | ✅ | ❌ elle | ✅ | ✅ |
| **Avatarları kapsar** | ❌ | ❌ | 🟡 aynı diskteyse | ❌ |

**KVKK dayanağı:** Aktarım envanteri (`docs/raporlar/kod-denetimi/kvkk-veri-aktarim-envanteri-2026-08-25.md`) Neon'u **Londra/Birleşik Krallık** olarak kaydetmiş (`:5`, PO teyitli — ⚠️ **BK, AB üyesi değil**). GitHub o envanterde **veri işleyen olarak kayıtlı değil** (`:26-35`). Dokploy sunucusunun ülkesi **envanterde de bilinmiyor** (`:23` "Kodda konum ipucu YOK · TEYİT GEREK").
⚠️ **Envanterde yedekleme ile ilgili TEK BİR kayıt yok.** Kapsam beyanı: 115 satırın tamamında `grep -niE 'yedek|backup|restore'` → **0 satır.** ⇒ **Hangi seçenek seçilirse envantere yeni satır eklenmesi gerekecek** — bu seçenekten bağımsız, kesin bir iş.

**⭐ Önerilen:** **(b) bugün, sıfır maliyetle** → sonra (a) veya (c) ile otomatikleştir.

### (b) yolunun adımları
1. Bilgisayarına PostgreSQL istemci araçlarını kur (`pg_dump` içinde gelir). ⚠️ İstemci sürümü sunucudan **eski olmasın**.
2. Neon panelinden bağlantı dizesini kopyala. ⛔ **Hiçbir dosyaya, nota, sohbete yazma; ekran görüntüsü alma.**
3. Terminalde:
```bash
pg_dump "<BAĞLANTI-DİZESİ>" --format=custom --no-owner --no-privileges \
  --file=menti-mentor-yedek-<YYYYAAGG>.dump
```
4. Dosyanın oluştuğunu **ve boyutunun 0 olmadığını** gör: `ls -lh menti-mentor-yedek-*.dump`

⚠️ **Tuzaklar:**
1. **En büyüğü: dosyayı alıp hiç denememek.** Bu proje tam bu tuzakta — yedek **iki kez alınmış**, geri yükleme **hiç denenmemiş** (`docs/devir/07-oturum-gunlugu.md:65`: *"geri alma (DROP COLUMN/restore) **DENENMEDİ**"*).
2. ⛔ **Dosyayı buluta senkronlanan klasöre (Masaüstü/Belgeler/OneDrive/iCloud/Drive) koyma** — o an kayıtsız bir yurtdışı aktarım doğar.
3. **Yedek avatar dosyalarını KAPSAMAZ.** Fotoğraflar veritabanında değil, diskte (A1). ⇒ Kusursuz bir veritabanı yedeği bile **fotoğrafları geri getirmez.**
4. Dosya, tüm kullanıcıların kimlik + iletişim + **psikometrik (DISC)** + mesaj verisinin **şifresiz tam kopyasıdır.** Diski şifreli tut, erişimi sınırla, **saklama süresine karar ver ve süre dolunca sil.**

### ⭐ Geri yükleme provası — canlıyı riske atmadan
**İlke:** canlıya **hiçbir yazma** yapılmaz. Tüm yazma işlemleri **geçici izole bir Neon dalında** olur.
Dayanak: `CLAUDE.md:264-268` "Neon test branch — geçici izole DB koreografisi" (bu projede bir kez başarıyla yürütülmüş).

1. Provayı **Pazar 06:00 ve her gün 07:00 TSİ silme saatlerinden UZAK** bir saatte yap. En rahat: hafta içi öğleden sonra.
2. Mevcut `.env` dosyanı **yedekle** (`CLAUDE.md:265` adım 1).
3. Neon panelinde ana daldan **yeni bir dal oluştur**, adına tarih koy (ör. `prova-<YYYYAAGG>`). ⚠️ Dal açmak canlıyı **değiştirmez**, ondan okur.
4. ⛔ **Yeni dalın host adının ana daldan FARKLI olduğunu GÖR** (`CLAUDE.md:266` adım 2). Bu adım atlanırsa prova canlı üzerinde yapılmış olabilir.
5. Yedeği **o dala** geri yükle — hedefin prova dalı olduğunu **iki kez** kontrol et:
```bash
pg_restore --dbname="<PROVA-DALI-BAĞLANTI-DİZESİ>" --no-owner --no-privileges \
  menti-mentor-yedek-<YYYYAAGG>.dump
```
6. Doğrula (aşağıdaki üç ölçüt).
7. **Temizlik (atlanamaz):** `.env`'i geri koy, geçici secret dosyalarını **sil**, **prova dalını sil** (`CLAUDE.md:266` adım 3).

**Prova NE ZAMAN başarılı sayılır** — ⛔ "komut hata vermedi" başarı değildir. Üçü birden:
1. **Tablo sayısı:** `SELECT count(*) FROM information_schema.tables WHERE table_schema='public';` → şemadaki **39 model tablosunun tamamı** gelmeli (`grep -c '^model ' schema.prisma` → 39).
2. **Satır sayımı canlıyla EŞİT ve hiçbiri 0 değil:** aynı sorguyu **önce canlıda (salt-okuma)**, sonra prova dalında çalıştır, sonuçları karşılaştır — ör. `SELECT count(*) FROM "User";`, `"Tenant"`, `"CertificationOption"`, `"LearningStage"`, `"Question"`. ⛔ **"≠0" şartı kritik:** boş bir veritabanına yapılan geri yükleme de hatasız biter.
3. **Şema sağlamlığı:** `SELECT column_name, data_type FROM information_schema.columns WHERE table_name='CertificationOption' AND column_name='internalNote';` → `text` dönmeli.

> ✅ **Başarı tanımı:** 39 tablonun tamamı var **+** en az 4 tablonun satır sayısı canlıyla birebir eşit ve hiçbiri 0 değil **+** sütun kontrolü geçti **— ve bunların hiçbiri için canlıya tek bir yazma gitmedi.**

### Bağlantılı iş — iki yedek tablo (C13)
Canlıda şemada olmayan iki tablo duruyor: `MentorshipAgreement_yedek_20260830` (150 satır) ve `CertificationOption_yedek_20260909` (20 satır). İkisi de `schema.prisma`'da **yok** ⇒ ileride `migrate dev`/`db push` onları **fazlalık görüp silmek isteyebilir** (`docs/kararlar/00-KARAR-TAKIP.md:189`). Bugün itibarıyla S26 **22 gündür**, S37 **12 gündür** bekliyor.
- **Envanteri gör (risksiz, salt-okuma):** `SELECT table_name FROM information_schema.tables WHERE table_name LIKE '%_yedek_%';` → tam bu ikisi çıkmalı; **fazlası çıkarsa** kimsenin izlemediği yedek tablo var.
- **Karar senin:** S26'nın bekleyen tek koşulu *"gerçek anlaşma akışını tarayıcıdan bizzat görüp regresyonsuz olduğunu teyit etmek"* (`00-KARAR-TAKIP.md:178`). S37 için aynısı sertifika akışında.
- ⭐ Bu iki tablo, **geri yükleme provası için mükemmel bir tatbikat konusu**: düşük değerli, yedeği zaten var, izole edilebilir.

---

## A3 · `NODE_ENV=production` (🔴 en yüksek aciliyet)

**Neden kritik:** Bu değer tam olarak `production` değilse **7 koruma birden sessizce kapanır** — ve repo **PUBLIC** olduğu için kaynak koda gömülü varsayılan anahtarlar **GitHub'dan okunabilir.** Yani tek bir yazım hatası, sistemi herkesin üretebileceği bir yönetici oturumuna açar.

**Kodda nerede okunuyor:** `backend/src/config.ts:10` → `const isProd = process.env.NODE_ENV === 'production'` (**tam eşitlik**; `Production`/`prod`/`PRODUCTION` → hepsi `false`). Ayrıca 4 yerde doğrudan okunuyor: `authController.ts:62`, `selfServeController.ts:16`, `platformController.ts:17`, `cronScheduler.ts:30`.

**Production değilse kapanan 7 koruma:**

| # | Ne kapanır | Yer | Sonuç |
|---|---|---|---|
| 1 | `JWT_SECRET` varsayılan kontrolü | `config.ts:19-21` | Kaynak koda gömülü (**GitHub'dan okunabilir**) anahtarla oturum imzalanır → **herkes geçerli yönetici oturumu üretebilir** |
| 2 | `PLATFORM_ADMIN_KEY` varsayılan kontrolü | `config.ts:26-28` | Gömülü anahtarla **platform yönetici paneline** giriş |
| 3 | `DEFAULT_TENANT_ID` yasağı | `config.ts:12-14` | Kurumlar arası veri izolasyonu delinebilir |
| 4 | Oturum çerezi `secure` | `authController.ts:67` | Çerez şifresiz bağlantıda gönderilir → ağdaki dinleyici oturumu çalabilir |
| 5 | Çıkışta çerez temizleme `secure` | `authController.ts:74` | Çerez **silinmeyebilir**; "çıkış yaptım" sanan kullanıcının oturumu açık kalır |
| 6 | Self-serve kayıt çerezi `secure` | `selfServeController.ts:33` | Yeni kurum yöneticisinin oturumu şifresiz kanalda |
| 7 | **Platform yönetici çerezi** `secure` | `platformController.ts:17` | En yetkili hesabın çerezi şifresiz kanalda |

⚠️ 1, 2 ve 3 numaralı korumalar **`isProd &&` koşuluna bağlı** — yani `NODE_ENV` yanlışsa **hiçbiri çalışmaz.** Yedi korumanın tamamı tek bir değişkenin doğru yazılmasına bağlıdır.

**Değişken adı:** `NODE_ENV` · **Hangi servise:** backend **ve** frontend · **Değer biçimi:** `production` (tamamı küçük harf) · **BUILD:** ❌ restart yeterli.
**Azaltıcı (iyi haber):** `backend/Dockerfile:39`, `docker-compose.yml:43`, `frontend/Dockerfile:34`, `docker-compose.yml:92` — **dördü de `production` set ediyor.** Risk yalnız şu hâllerde doğar: (a) Dokploy panelinden elle başka bir değere ezilmişse, (b) uygulama Docker dışında çalıştırılıyorsa.

### Bununla birlikte kontrol edilecek üç değer
| Değişken | Durum | Not |
|---|---|---|
| `JWT_SECRET` | **dolu olmalı** | Rastgele üret: `openssl rand -base64 48` (`.env.compose` da bunu öneriyor). Boşsa canlıya çıkma |
| `PLATFORM_ADMIN_KEY` | **dolu olmalı** | Aynı yöntem |
| `PLATFORM_ADMIN_EMAIL` | **dolu olmalı** | ⚠️ **Bu sistemi DURDURMAZ** — boşsa yalnız bir uyarı basar (`config.ts:39-45`) ve o uyarı **sistem loglarına bile düşmez**, yalnız konteyner çıktısında görünür. Sessizce zayıf varsayılanla çalışır |

### Adımlar
1. Dokploy → backend → ortam değişkenleri → `NODE_ENV` değerini **gör**. `production` değilse düzelt.
2. Aynı ekranda `JWT_SECRET`, `PLATFORM_ADMIN_KEY`, `PLATFORM_ADMIN_EMAIL` dolu mu — kontrol et.
3. Frontend uygulamasında da `NODE_ENV=production` olmalı.
4. Restart.

### Çalıştığını nasıl anlarım
Tarayıcıda **`<BACKEND-ALAN>/health`** aç (kimlik doğrulama gerekmez, rate limit yok — `server.ts:60-63`):
```json
{ "ok": true, "db": "up", "smtp": "verified", "cron": "enabled",
  "env": "production", "ts": "...", "version": "...", "uptime": 1234 }
```
⇒ **`"env": "production"` görmüyorsan canlıya çıkma.**
Alternatif: konteyner logunda açılış satırı `API ayakta: … [production]` (`server.ts:152`).
⚠️ Platform panelinde `env` **ekrana basılmıyor** (backend döndürüyor — `platformController.ts:160` — ama arayüz göstermiyor) ⇒ **tek pratik yol `/health`.**

---

## B4 · SMTP — e-posta ayarları

**Neden kritik:** Üç değişkenden biri boşsa **tüm e-postalar sessizce atılıyor.** Kullanıcı şifresini unutur → ekranda "E-postanızı kontrol edin" görür → **mail hiç gelmez** → hesabına erişimini kalıcı kaybeder. Aynı sessizlik: kayıt onayı, randevu talebi (mentör haberdar olmaz, uygulama "başarılı" der), yeni mesaj, yönetici bildirimleri.

**Kodda nerede:** `backend/src/config.ts:70-89` (`email` bloğu) · gönderim kapısı `backend/src/services/emailService.ts:79-82`:
> `smtpHost` **veya** `smtpUser` **veya** `smtpPass` boşsa → `return false`, mail gönderilmez, `EMAIL` kategorisinde bir uyarı loglanır. **Hata fırlatılmaz.**

### Değişkenler — 6 tane (hepsi yalnız BACKEND, BUILD ❌)

| Değişken | Değer biçimi (yer tutucu) | Varsayılan | Yazılmazsa |
|---|---|---|---|
| `SMTP_HOST` | `<SMTP-SUNUCU>` (ör. biçim `smtp.saglayici.com`) | boş | 🔴 **tüm mailler sessizce atılır** |
| `SMTP_PORT` | `465` veya `587` | `465` | 465 varsayılır |
| `SMTP_USER` | sağlayıcının verdiği kullanıcı adı | boş | 🔴 **tüm mailler sessizce atılır** |
| `SMTP_PASS` | sağlayıcının verdiği şifre/anahtar | boş | 🔴 **tüm mailler sessizce atılır** |
| `SMTP_FROM` | `<GONDEREN-ADRES>` (ör. biçim `noreply@ornek.org`) | ⚠️ **kaynak kodda sabit bir adres** (`config.ts:83`) | 🔴 **doğrulanmamış bir alan adından gönderilir → mailler spam'e düşer/reddedilir** |
| `SMTP_SECURE` | port 465 → **hiç yazma** · port 587 → `false` | port 465 ise otomatik `true` | doğru davranış |

**`SMTP_SECURE` türetme mantığı** (`config.ts:76-78`): değişken tanımlıysa `=== 'true'` karşılaştırması; tanımsızsa `SMTP_PORT === 465` ise otomatik `true`. ⇒ **465 kullanıyorsan yazmana gerek yok.**

### ⚠️ Tuzaklar
1. **`SMTP_FROM`'u atlamak.** Varsayılanı boş değil — kaynak kodda **sabit bir kurumsal adres** var. Kendi alan adını kullanacaksan mutlaka set et; yoksa SPF/DKIM doğrulanmamış bir gönderenle mail gider ve **teslim edilmez.** (`config.ts:81-82` yorumu ayrıca "`SMTP_USER`'a düşme" diye uyarıyor — bazı sağlayıcılarda `SMTP_USER` bir kullanıcı adıdır, e-posta adresi değil.)
2. **Test adresi kullanmak.** `.local` · `.test` · `.invalid` · `.example` ile biten adreslere **hiçbir ortamda mail gitmez** (`emailService.ts:56`, `isUndeliverableRecipient`). Testte **gerçek bir posta kutusu** kullan.
3. **Ekrandaki "gönderildi" mesajına inanmak.** Şifre sıfırlama, hesap var/yok bilgisini sızdırmamak için **her durumda aynı başarı mesajını** döner (`authController.ts:522,550`) ve mail çağrısını beklemeden ateşler (`:543`). ⇒ **Ekran mesajı kanıt DEĞİL. Kanıt: postanın gerçekten gelmesi.**
4. **`FRONTEND_URL` gizli ön koşuludur** — aşağıya bak. SMTP kusursuz olsa bile bu yanlışsa şifre sıfırlama linki ölüdür ve **hiçbir alarm çalmaz.**

### Adımlar
1. Dokploy → backend → ortam değişkenleri → yukarıdaki 5 değeri gir (`SMTP_SECURE`'u 465'te boş bırak).
2. Restart.

### Çalıştığını nasıl anlarım — 3 katmanlı
1. **`<BACKEND-ALAN>/health`** → `"smtp"` alanı. Değerler (`emailService.ts:26`):
   | Değer | Anlamı |
   |---|---|
   | `verified` | ✅ **gerçek SMTP bağlantısı ve kimlik doğrulaması başarılı** |
   | `unconfigured` | Değişkenler eksik |
   | `failed` | Bağlantı kurulamadı / şifre reddedildi |
   | `unknown` | Henüz denenmedi |
   *(Açılışta bir kez gerçek bağlantı denemesi yapılıyor — `emailService.ts:32-45`, sonuç `/health`'te önbellekli.)*
2. **Platform paneli → Genel Bakış → "E-posta (SMTP)" kartı.** Bu kart **her yenilemede canlı bağlantı denemesi** yapar (`platformController.ts:145-147` — kod yorumu: *"config-var varlığı DEĞİL, gerçek SMTP el sıkışması"*). ⇒ `/health`'ten **daha tazedir**. ⚠️ Kart kırmızıysa etiket "Eksik yapılandırma" der ama **yanlış şifre de aynı kırmızıyı verir.**
3. **Uçtan uca:** `/forgot-password` sayfasına git (giriş ekranındaki link — `LoginForm.tsx:169`), **gerçek bir kayıtlı adres** gir, posta kutusunu kontrol et.
4. **Gelmezse:** Platform paneli → **Sistem Logları** sekmesi → kategori **`EMAIL`**. Aranacak metinler:
   | Log metni | Anlamı |
   |---|---|
   | `SMTP yapılandırması eksik — e-posta gönderilmedi.` | Değişken eksik (`emailService.ts:80`) |
   | `E-posta gönderilemedi: …` | Kimlik/bağlantı hatası, sağlayıcının mesajı dahil (`:89`) |
   | `SMTP verify başarısız: …` | Açılış denemesi başarısız (`:41`) |
   | `Teslim edilemez/sahte alıcı — gönderim atlandı.` | Test uzantılı adres kullandın (`:76`) |

### SMTP çalışınca hangi mailler başlayacak
Randevu talebi ve onayı · yeni mesaj bildirimi · yeni kayıt (yöneticiye) · kullanıcı onay/ret/düzeltme · **şifre sıfırlama** · DISC testi bitti (yöneticiye) · haftalık algoritma kalibrasyon önerisi · taslak kurum kurtarma hatırlatması · "zaten kayıtlısınız" · dürtme (pasif üyeye) · geri bildirim hatırlatması. *(Kurum başvuru onay/ret/düzeltme ayrı bir bayrağa bağlı → B5.)*

---

## EK · `FRONTEND_URL` — SMTP'nin sessiz ön koşulu (listede yoktu, ama gerekli)

**Neden kritik:** Şifre sıfırlama linki **doğrudan bu değişkenden** üretiliyor: `emailService.ts:185` → `${process.env.FRONTEND_URL ?? 'http://localhost:3001'}/reset-password?token=…`
⇒ Yanlış/eksikse mail **başarıyla gider**, hiçbir hata loglanmaz, `/health` ve platform paneli **yeşil kalır** — ama kullanıcı linke tıkladığında **kendi bilgisayarında hiçbir şey açılmaz.** Yani *"SMTP çalışıyor ama şifre sıfırlama çalışmıyor"* durumu oluşur ve **hiçbir izleme bunu yakalamaz.**

**Nerede daha kullanılıyor:** kalibrasyon onay/red linkleri (`:225-227`) · taslak kurum "kuruluma devam et" linki (`:261`) · "zaten kayıtlısınız" giriş linki (`:290` → `config.ts:92`). Ayrıca `docker-compose.yml`'de **`ALLOWED_ORIGINS` (`:50`) ve OAuth callback (`:62`) bu değerden türetiliyor** ⇒ yanlışsa CORS ve OAuth de bozulur.

**Değişken adı:** `FRONTEND_URL` · **Hangi servise:** backend · **Değer biçimi:** `<FRONTEND-ALAN>`, protokol dahil, **sonda eğik çizgi YOK** · **Varsayılan:** `http://localhost:3001` · **BUILD:** ❌
**Doğrulama:** şifre sıfırlama mailindeki linkin üzerine gel → durum çubuğunda **`<FRONTEND-ALAN>`** görünmeli, `localhost` değil.

---

## B5 · `TENANT_NOTIFICATIONS_ENABLED`

**Neden kritik:** Platform yöneticisi bir kurum başvurusuna **"düzeltme iste"** der, gerekçeyi yazar, panelde **başarı görür** — ama kuruma hiçbir şey gitmez. Başvuru "düzeltme bekleniyor" durumunda **süresiz askıda kalır**; kurum ne istendiğini bilmediği için asla düzeltmez.

**Kodda nerede:** `backend/src/config.ts:88` → `process.env.TENANT_NOTIFICATIONS_ENABLED === 'true'` · kapı `backend/src/services/tenantNotifications.ts:116-123` (bayrak kapalıysa mail gönderilmeden `return`, yalnız bilgi logu).

**Değişken adı:** `TENANT_NOTIFICATIONS_ENABLED` · **Hangi servise:** yalnız **BACKEND** · **BUILD:** ❌ restart yeterli
**Değer biçimi:** `true` — **tırnaksız, tamamı küçük harf**
**Varsayılan:** `false` (kapalı) · **Hiçbir deploy dosyasında geçmiyor** ⇒ canlıda muhtemelen kapalı — **TEYİT GEREK.**

### Kapalıyken sessizce gitmeyen 3 akış
| # | Platform yöneticisi ne yapar | Kurum ne bekler | Kapalıyken ne olmaz | Tetikleyen |
|---|---|---|---|---|
| 1 | Kurumu **Onayla** | "Başvurunuz onaylandı, hoş geldiniz" | Kurum onaylandığını **öğrenmez**, süresiz bekler | `platformController.ts:300` |
| 2 | Kurumu **Reddet** (+ gerekçe) | "Başvurunuz hakkında" + gerekçe | Gerekçe veritabanına yazılır ama **kimseye ulaşmaz** | `platformController.ts:327` |
| 3 | **Düzeltme İste** (+ not) | Neyi düzelteceği | 🔴 **En kötüsü:** başvuru sonsuza kadar askıda kalır | `platformController.ts:373` |

Üçünde de uygulama her hâlükârda "başarılı" döner — dönüş değeri beklenmiyor.

### ⚠️ Tuzaklar
1. **`TRUE` / `True` / `1` / `yes` yazmak.** Karşılaştırma katı (`=== 'true'`) ⇒ küçük harf `true` dışındaki her şey **sessizce kapalı** bırakır, hiçbir uyarı çıkmaz.
2. **SMTP olmadan açmak.** Bayrak açık ama SMTP eksikse mail denenir, başarısız olur, hata loglanır ve akış yine sessizce devam eder. ⇒ **Önce B4.**
3. ⚠️ **ÜRÜN/HUKUK KARARI ÖN KOŞULU:** ret ve düzeltme metinleri kuruma giden, **hukuki sonucu olabilecek** metinlerdir ve bu turda içerikleri denetlenmedi. `03-PO-ELLE-ISLER.md:31`'in kendi notu: *"⚠️ Önce karar §4.1: ret/düzeltme metinleri hukuki sonuçlu — açmadan önce metinler gözden geçirilsin mi?"* ⇒ **Karar senin.** Açmazsan 1-2-3 numaralı akışlar sessiz kalmaya devam eder.

### Çalıştığını nasıl anlarım
1. Değeri gir → **Restart**.
2. Kendi kontrol ettiğin bir e-posta adresiyle bir test kurumu kaydet (yönetici olarak).
3. Platform paneli → **Kurumlar** → o kurumu **Onayla**.
4. **Beklenen:** o adrese "Başvurunuz Onaylandı" konulu mail düşer.
5. **Gelmezse** → Platform paneli → **Sistem Logları** → `EMAIL` kategorisi:
   | Log metni | Anlamı |
   |---|---|
   | `Kurum bildirimi hazır ama gönderim KAPALI (log-only).` | Bayrak **hâlâ kapalı** — değer yanlış yazılmış ya da restart olmamış |
   | `Kurum bildirimi gönderildi.` | Bayrak açık; sorun teslimatta (spam klasörü / SPF-DKIM) |
   | `Kurum bildirimi başarısız: …` | Bayrak açık ama SMTP hatalı → B4'e dön |

---

## B6 · `BACKEND_URL`

**Neden kritik:** Yanlış/eksikse iki şey kırılır: (1) **avatar adresleri** yanlış alan adına işaret eder → profil fotoğrafları kırık kare, (2) **KVKK'nın zorunlu kıldığı "abonelikten çık" linki** 404 verir.

**Kodda nerede:** `backend/src/config.ts:49` → `process.env.BACKEND_URL ?? process.env.FRONTEND_URL ?? 'http://localhost:3000'` (**iki kademeli düşüş**) · avatar adresi `config.ts:114` → `avatarStorage.ts:57` · unsubscribe linki `emailService.ts:264-266` (env'i **doğrudan** okuyor).

**Değişken adı:** `BACKEND_URL` · **Hangi servise:** **BACKEND** (compose kullanılıyorsa **frontend'in build değerini de besler** — `docker-compose.yml:86`) · **Değer biçimi:** `<BACKEND-ALAN>`, protokol dahil, **sonda eğik çizgi YOK** · **BUILD:** backend ❌ · **frontend'e etkisi 🔴 EVET** (bkz. B7)

**Durum — iyi haber:** Compose bunu backend'e **açıkça geçiriyor** (`docker-compose.yml:61`, üstünde V-08 gerekçe yorumu) ve ayrıca OAuth yönlendirmeleri (`:65`, `:68`) ile frontend build değerini (`:86`) üretiyor. ⇒ **Kod tarafı kapanmış; sana yalnız canlı değeri teyit etmek kalıyor.**

### Yanlışsa ne olur
| Durum | Avatar | Unsubscribe linki |
|---|---|---|
| Set değil, `FRONTEND_URL` var | Adresler **frontend alanına** gider → **404, kırık kare** | Link frontend'e gider → **404.** KVKK yükümlülüğü fiilen çalışmıyor |
| İkisi de yok | `localhost` → kullanıcının kendi bilgisayarına istek → kırık kare | **Tıklanamaz link** |
| Sonda `/` var | ✅ sorun yok (`config.ts:114` sondaki çizgileri temizliyor) | ⚠️ çift `//` oluşur — `emailService.ts:266`'da **trim yok** → proxy'ye bağlı, **TEYİT GEREK** |

### ⚠️ Tuzaklar
1. **Sonda eğik çizgi** — unsubscribe linkinde temizlenmiyor.
2. **`FRONTEND_URL` ile aynı değeri yazmak:** tek alan adı + yol yönlendirmesi kullanıyorsan doğru, **ayrı alan adı kullanıyorsan felaket.** Hangi modelde olduğun **TEYİT GEREK.**
3. Değiştirince **frontend'i yeniden build etmeyi unutmak** (compose bağlantısı `:86`).

### Çalıştığını nasıl anlarım
1. Profil fotoğrafı yükle → görünüyor mu.
2. Fotoğrafa sağ tık → resmi yeni sekmede aç → adres çubuğunda **`<BACKEND-ALAN>`** olmalı.
3. Mail geldiğinde alttaki "abonelikten çık" linkinin üzerine gel → durum çubuğunda `<BACKEND-ALAN>/api/tenants/unsubscribe?token=…` görünmeli.

---

## B7 · `NEXT_PUBLIC_API_URL` — 🔴 BUILD GEREKTİREN İŞ

**Neden kritik:** Yanlışsa **site görsel olarak ayakta ama tamamen işlevsizdir**: giriş çalışmaz, kayıt çalışmaz, panel veri çekmez. Ve **sunucu tarafında hiçbir log oluşmaz**, çünkü istek backend'e hiç ulaşmaz.

**Kodda nerede okunuyor (4 yer, hepsi frontend):**
| Yer | Neye akıyor |
|---|---|
| `frontend/src/lib/api/client.ts:16` | **Tüm** normal API çağrılarının tabanı |
| `frontend/src/lib/api/platform.ts:3` | Platform yönetici paneli çağrıları |
| `frontend/src/components/molecules/OAuthButtons.tsx:16` | Google/LinkedIn ile giriş adresi |
| `frontend/next.config.mjs:45-54` | Bu adresin sunucu adından **avatar görsellerine izin deseni** üretiliyor (`/uploads/**`) |

**Değişken adı:** `NEXT_PUBLIC_API_URL` · **Hangi servise:** yalnız **FRONTEND** — ve **ortam değişkeni olarak DEĞİL, BUILD ARGÜMANI olarak** · **Değer biçimi:** `<BACKEND-ALAN>`, sonda eğik çizgi yok · **Varsayılan:** `http://localhost:3000`

### 🔴 BUILD-TIME kanıtı — bu kılavuzun en önemli maddesi
```
frontend/Dockerfile:16   ARG NEXT_PUBLIC_API_URL=http://localhost:3000
frontend/Dockerfile:17   ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
frontend/Dockerfile:19   RUN npm run build          ← DEĞER BURADA KODA GÖMÜLÜR
```
Bu satırlar yalnız **build aşamasında**. Çalışan konteyner farklı bir aşamadan geliyor (`:22`) ve orada **sadece** `NODE_ENV` (`:34`) ile `PORT` (`:35`) var — `NEXT_PUBLIC_API_URL` **yok.** ⇒ Çalışma zamanında bu değişken **mevcut bile değil**; değer derlenmiş dosyaların içinde.

> ⛔ **Bu değişkeni Dokploy'un "ortam değişkenleri" kutusuna yazmak HİÇBİR İŞE YARAMAZ.**
> **Build argümanları / build-time değişkenler** alanına yazılmalı, sonra **Restart değil, yeniden BUILD** yapılmalı.

**Compose kullanılıyorsa:** ayrıca yazma — değer `${BACKEND_URL}`'den besleniyor (`docker-compose.yml:84-86`, `build.args` içinde, `environment` değil). Yine de **`BACKEND_URL`'i düzeltip frontend'i yeniden build etmen** gerekir.

### ⚠️ Tuzaklar
1. **Environment'a yazıp restart etmek** → hiçbir şey değişmez, sen değiştiğini sanırsın.
2. Compose'da `BACKEND_URL` boşsa **sessizce `http://localhost:3000`'e düşer** (`:86`'daki varsayılan), hiçbir hata vermez.
3. Yanlışsa **avatarlar da kırılır** (`next.config.mjs:45-54` izin deseni) ⇒ A1 testinde yanlış teşhise yol açar. **A1'den önce bunu bitir.**

### Adımlar
1. Dokploy → **frontend** uygulaması → **build argümanları** → `NEXT_PUBLIC_API_URL` = `<BACKEND-ALAN>`.
2. Frontend → **REBUILD** (Redeploy değil, yeniden **BUILD**).

### Çalıştığını nasıl anlarım (30 saniye)
1. Canlı sitede **F12 → Network** sekmesini aç.
2. Giriş sayfasında e-posta/şifre gir, **Giriş yap**'a bas.
3. Listedeki `login` isteğinin adresine bak:
   - `<BACKEND-ALAN>/api/auth/login` → ✅ **DOĞRU**
   - `http://localhost:3000/api/auth/login` → 🔴 **YANLIŞ BUILD** — 1. adıma dön

---

## B8 · `ALLOWED_ORIGINS`

**Neden kritik:** Yanlışsa **site açılır, tasarım görünür, ama hiçbir işlem tamamlanmaz.** Kullanıcı giriş düğmesine basar, hiçbir şey olmaz. **Backend tarafında hiçbir hata logu yoktur** — istek backend'e ulaşır, yanıtı tarayıcı atar. Sunucu "her şey yolunda" der.

**Kodda nerede:** `backend/src/server.ts:53` → `(process.env.ALLOWED_ORIGINS ?? 'http://localhost:3001,http://127.0.0.1:3001').split(',')` · `:54` → `cors({ origin: allowedOrigins, credentials: true })`
**İyi haber:** wildcard (`*`) **kullanılmıyor**, izin listesi yaklaşımı — doğru tasarım. `credentials: true` ile wildcard zaten imkânsız.

**Değişken adı:** `ALLOWED_ORIGINS` (**çoğul, sonda S var**) · **Hangi servise:** yalnız **BACKEND** · **BUILD:** ❌
**Değer biçimi:** `<FRONTEND-ALAN>` · birden fazlaysa **virgülle, BOŞLUK YOK** · protokol dahil · **sonda eğik çizgi YOK** · **port yazma**

### ⚠️ Tuzaklar — hepsi SESSİZ arıza
| Yazım | Sonuç |
|---|---|
| `https://a.org,https://www.a.org` | ✅ ikisi de çalışır |
| `https://a.org, https://www.a.org` | 🔴 **ikincisi başında boşlukla kalır, hiç eşleşmez** — `server.ts:53` **trim yapmıyor** |
| `https://a.org/` | 🔴 tarayıcı adresi eğik çizgisiz gönderir → eşleşmez |
| `http://…` (canlıda) | 🔴 protokol de eşleşmenin parçası |
| `https://a.org:443` | 🔴 tarayıcı portu göndermez → eşleşmez |

> **Trim yapılmadığının kanıtı:** aynı depoda başka bir yerde trim **yazılmış** (`frontend/next.config.mjs:34` → `.split(',').map(d => d.trim())`), `server.ts:53`'te **yazılmamış.** Yani bu bir tasarım değil, eksik.

### ⚠️ Compose kullanılıyorsa önemli kısıt
`docker-compose.yml:50` → `ALLOWED_ORIGINS: ${FRONTEND_URL:-http://localhost:3001}`
⇒ Değer **`ALLOWED_ORIGINS`'den değil, `FRONTEND_URL`'den** geliyor. İki sonucu var:
1. Compose ortam dosyasına `ALLOWED_ORIGINS=…` yazmak **hiçbir etki yapmaz** (compose o satırı okumuyor; şablonda da böyle bir satır yok).
2. Compose ile **tek alan adı** verilebilir ⇒ **apex + www birlikte desteklenemez**, biri CORS'a takılır.
   **Çözüm:** `FRONTEND_URL`'i kullanıcıların gerçekten girdiği adrese ayarla, diğerini DNS/proxy katmanında yönlendir. *(Alternatif compose satırını değiştirmek — kod işi, bu turun kapsamı dışı.)*
   Dokploy'da backend compose'suz ayrı bir uygulama olarak deploy edildiyse `ALLOWED_ORIGINS` doğrudan yazılabilir ve çoklu değer çalışır. **Hangi modelde olduğun TEYİT GEREK.**

### Çalıştığını nasıl anlarım
1. Canlı sitede **F12 → Console**. Sayfayı yenile, giriş yapmayı dene.
2. **`blocked by CORS policy`** yazısı arıyorsun — **olmamalı.**
3. `www`'lu ve `www`'suz adresi **ayrı ayrı** dene. Biri çalışıp diğeri çalışmıyorsa listede eksik adres var.

---

## B9 · `CRON_ENABLED` — ✅ ZATEN AÇIK, YAZACAK BİR ŞEY YOK

> ### ⭐ ÖNCE BUNU OKU
> **Varsayılanı AÇIK.** Hiçbir yere bir şey yazmana gerek yok. Zamanlanmış işler canlıda **zaten çalışıyor olmalı.**
> **Tek yapacağın: yanlışlıkla `CRON_ENABLED=false` yazılmadığını doğrulamak.**

**Kodda nerede:** `backend/src/services/cronScheduler.ts:29-31`
```
const CRON_ENABLED =
  process.env.NODE_ENV !== 'test' &&
  process.env.CRON_ENABLED !== 'false';
```
İkinci koşul **`!== 'false'`** — yani mantık tersine çalışıyor (opt-out):

| Değer | Sonuç |
|---|---|
| (hiç tanımsız) | ✅ **AÇIK** |
| `true` / `1` / `yes` / boş | ✅ AÇIK |
| `FALSE` / `False` | ✅ **AÇIK** (küçük harf `false` değil!) |
| `false` | ❌ **KAPALI** — tek kapatan değer |

⚠️ `NODE_ENV=test` ise cron **her hâlükârda kapalıdır** (`&&` bağlacı) — canlıda `production` olmalı (→ A3).

**Değişken adı:** `CRON_ENABLED` · **Hangi servise:** backend · **BUILD:** ❌ · **Hiçbir deploy dosyasında geçmiyor — bu DOĞRU.**

### Kapalıysa koşmayan 8 iş
| # | İş | Saat (UTC / **TSİ**) | Koşmazsa kullanıcı gözünden |
|---|---|---|---|
| 1 | Algoritma ağırlık ayarı | Pazar 02:00 / **05:00** | Eşleştirme kalitesi **hiç öğrenmez**; 6 ay sonra da ilk günkü kaliteyle eşleştirir |
| 2 | **KVKK veri temizliği** | Pazar 03:00 / **06:00** | 🔴 **Saklama süresi ihlali** — kişisel veri süresiz saklanır. Hukuki risk |
| 3 | Taslak kurum kurtarma maili | Her 6 saatte / 03·09·15·21 | Yarım kalan kurumlar **hiç hatırlatma almaz**, kurum kaybedilir |
| 4 | Taslak kurum temizliği | Her gün 04:00 / **07:00** | Terk edilmiş yarım kayıtlar birikir; veri minimizasyonu çalışmaz |
| 5 | Checkpoint kontrolü | Her gün 08:00 / 11:00 | Yalnız log kaybı — **bu iş zaten kullanıcıya bildirim göndermiyor**, en düşük etki |
| 6 | Geri bildirim hatırlatması | Her gün 09:00 / **12:00** | Geri bildirim hiç istenmez → NPS verisi birikmez → 1 numaralı iş de beslenmez (çifte kayıp) |
| 7 | Anlaşma yenileme kontrolü | Her gün 10:00 / 13:00 | 🔴 Anlaşmalar **haber verilmeden** süresi dolmuş duruma düşer; taraflar bir gün panele girip bitmiş olduğunu görür |
| 8 | Mentör sertifika bildirimi | Her gün 11:00 / 14:00 | Yönetici geride kalan mentörleri fark etmez |

### Çalıştığını nasıl anlarım — 3 yol
1. **En kolay:** `<BACKEND-ALAN>/health` → `"cron": "enabled"` ✅ · `"disabled"` 🔴
2. **Konteyner logu** (Dokploy → backend → Logs), açılışta:
   - ✅ `[CRON] Haftalık görevler zamanlandı: Pazar 02:00 (tuning) + 03:00 (purge) UTC` (`cronScheduler.ts:456`)
   - 🔴 `[CRON] CRON_ENABLED=false — tüm zamanlanmış görevler devre dışı.` (`:412`)
3. **Platform paneli → Sistem Logları** → `SYSTEM` kategorisinde günlük `Cron: …` satırları birikmeli. Bir gün hiç yoksa işler koşmuyor.
⚠️ Platform panelinin sağlık kartlarında **cron göstergesi yok** ⇒ 1. veya 2. yolu kullan.

### ⚠️ Tuzaklar
1. "Açmak için `true` yazmalıyım" diye düşünmek — **gereksiz.** Yazmak zararsız ama işe yaramaz.
2. Asıl risk **ters yönde:** birinin geçmişte hata ayıklarken `false` bırakmış olması. **Bu yüzden `/health`'i mutlaka kontrol et.**
3. Tüm saatler **UTC**. Türkiye UTC+3 ⇒ "09:00 UTC" = **12:00 Türkiye saati.**

---

## C11 · Seed tabloları dolu mu — teyit

**Neden kritik:** Bu üç tablo boşsa kullanıcı akışları kırılır — **ve bir tanesi sessizce yanlış bilgi verir** (aşağıda).

> ⛔ **`npm run seed` / `npx prisma db seed` ASLA çalıştırılmaz.** `backend/package.json:16` bu komutu `prisma/seed.ts`'e bağlıyor ve o dosya `:300-318` arasında **16 adet toplu silme** yapıyor (kullanıcı yanıtları, geri bildirimler, görüşmeler, kullanıcılar, kurumlar ve **tüm global DISC soruları** dahil). Bu kılavuzda hiçbir seed komutu önerilmiyor.
> ⛔ Bu iş yalnız **"dolu mu boş mu" teyidi**dir. Boşsa ne yapılacağı bir **karar** konusudur — aşağıya bak.

**Hangi tablolar:** `Question` (DISC soruları, global) · `LearningStage` (öğrenme yolculuğu aşamaları) · `CertificationQuestion` + `CertificationOption` (sertifika senaryoları)

### 🥇 En hızlı yol — admin panelinden 3 tıkla (DB'ye girmeden)
Admin menüsü: `frontend/src/app/(admin)/layout.tsx:50-54`

| # | Menü | Yol | ✅ DOLU ise | 🔴 BOŞ ise (kanıt) |
|---|---|---|---|---|
| 1 | **❓ Soru Yönetimi** | `/admin/questions` | "DISC Soruları" altında soru listesi | **"Henüz sistem DISC sorusu yüklenmemiş."** — `admin/questions/page.tsx:193` |
| 2 | **🎓 Sertifika Konuları** | `/admin/certification` | "Şu an **N** konu açık" (N≥1) + konu kartları | **"Şu an 0 konu açık"** ve kart hiç yok — `admin/certification/page.tsx:89` |
| 3 | **🚀 Öğrenme Yolculuğu** | `/admin/learning-journey` | Aşama kartları listesi | **"Bu yolculukta henüz aşama yok."** — `admin/learning-journey/page.tsx:122` |

⇒ **Üçü de dolu görünüyorsa bu iş tamamdır.** Bu üç ekran açık Türkçe boş-durum metni verir; en güvenilir kontrol budur.

### 🔴 Kullanıcı ekranlarına neden GÜVENMEMEN gerekiyor — iki sessiz tuzak

**Tuzak 1 — `/learning-journey` boş tabloda "Yolculuğu tamamladın!" gösterir.**
Tablo boşken backend hatasız `200` ve boş liste döner; frontend bunu "bitirdi" sayar (`ScenarioGuideEngine.tsx:108` → `current >= scenarios.length` ⇒ `0 >= 0` = **doğru**) ve **yeşil kutu + 🌟 + "Yolculuğu tamamladın!" + "Panele Dön"** çizer (`:251-263`).
⇒ Kullanıcı yolculuğu **hiç oynamadan tamamlamış görünür.** Hiçbir hata, hiçbir uyarı yok.
**Ayırt etme kuralı:** ekranda **"1 / N" sayacı ve ilerleme noktaları görünmeden** doğrudan yeşil kutu çıkıyorsa → **tablo BOŞ.**

**Tuzak 2 — `/mentor/certification` boş tabloda bomboş sayfa açar.**
`certification/page.tsx:229` → `if (!currentTopic || !currentQuestion) return null;` ⇒ yükleniyor yazısı yok, hata yok, mesaj yok — **tamamen boş içerik alanı.**
⇒ "Sayfa bozuk" değil, **"içerik yok"** demektir.

**DISC testi ise dürüst davranıyor** (✅): `/disc-test` boş tabloda net mesaj verir — **"Şu an aktif test sorusu yok"** + *"Test soruları henüz hazırlanmamış olabilir. Lütfen kurum yöneticinizle iletişime geçin."* (`disc-test/page.tsx:148-161`).

### ⚠️ Boşsa ne olur — bu bir KARAR konusu, kılavuz çözüm önermiyor
| Tablo | Güvenli seed script'i var mı |
|---|---|
| `LearningStage` | ✅ `prisma/seed-learning-journey.ts` — yalnız `upsert`, silme yok (`:518`) |
| `CertificationQuestion`/`Option` | ✅ `prisma/seed-certification.ts` — yalnız `upsert` (`:263`, `:284`) |
| **`Question` (DISC)** | 🔴 **YOK.** Tek yol yıkıcı `prisma/seed.ts`'tir (`:325-336`). Eski `seed-questions.ts` silinmiş (commit `5745e0f`) |

🔴 **İki ayrı engel var, ikisi de ajan/karar işi — PO'nun tek başına çözebileceği bir şey değil:**
1. **DISC soruları boşsa mevcut araçlarla güvenli doldurma yolu yok.** Ayrı bir karar+iş gerekir.
2. Güvenli iki script bile **canlı konteynerde hazır değil:** çalıştırıcıları (`tsx`, `prisma` CLI) geliştirme bağımlılığı ve üretim imajı `npm ci --omit=dev` ile kuruluyor (`backend/Dockerfile:30`); ayrıca bu ikisi için `package.json`'da npm script de yok. **Nasıl çalıştırılacağı TEYİT GEREK.**

⇒ **Senin işin sadece teyit:** üç ekranı aç, hangisinin boş olduğunu not et, kuyruğa bildir.

---

## EK · `NEXT_PUBLIC_SITE_URL` — 🔴 ŞU AN SET EDİLEMİYOR (PO'nun yapabileceği bir şey yok)

**Neden burada:** `docs/otonom/02-ILERLEME.md:85` PO'ya *"F-29 canlıda tam etki için `NEXT_PUBLIC_SITE_URL` prod domaine set edilmeli"* diyor. **Ama set etmenin yolu kapalı** — belge bunu söylemiyor. Bu kılavuz o boşluğu kapatıyor.

**Neden kritik:** Varsayılanda kalırsa `/sitemap.xml` içindeki **9 herkese açık sayfanın adresi de** `localhost` yazar → Google sitemap'i **tamamen yok sayar**; `/robots.txt` sitemap satırı localhost'a işaret eder; paylaşılan linklerin önizleme kartı bozuk gelir. **Kullanıcı hiçbir hata görmez** — tamamen SEO/paylaşım katmanı. En sinsi arıza türü.

**Kodda nerede:** `frontend/src/lib/siteUrl.ts:9` (tek okuma noktası, sondaki eğik çizgi ve boşluk otomatik temizleniyor `:9-11`) · tüketiciler: `app/sitemap.ts:21` · `app/robots.ts:8` · `app/layout.tsx:35` (`metadataBase`). **Mimari temiz — tek düğme.**
**Varsayılan:** `http://localhost:3001` (`siteUrl.ts:10`)

### 🔴 Neden şu an yazılamıyor — kanıt
**Kapsam beyanı:** `grep -rni "NEXT_PUBLIC_SITE_URL"` iki repoda, `.git` ve `node_modules` hariç → isabetler **yalnız** `frontend/src/lib/siteUrl.ts` ve onun birim testinde. `docker-compose.yml` · `.env.compose` · `frontend/Dockerfile` · backend `Dockerfile` · iki `ci.yml` → **hiçbirinde YOK.**
`frontend/Dockerfile`'da **tek bir `ARG` var**: `:16 ARG NEXT_PUBLIC_API_URL`. Bu değişken için **`ARG`/`ENV` satırı yok.**

⇒ `NEXT_PUBLIC_*` değişkenleri derleme sırasında koda gömülür; mevcut Dockerfile bu değeri derleme aşamasına **aktarmıyor.** Dokploy'da **ne ortam değişkenine ne build argümanına** yazsan etkisi olmaz.
⇒ **Çözüm kod değişikliğidir** (`frontend/Dockerfile`'a iki satır + `docker-compose.yml` `args:` bloğuna bir satır). **Ajan işi, bu salt-okuma turunun dışı.**
⚠️ Tek istisna: Dokploy frontend'i Dockerfile yerine otomatik derleyici (Nixpacks/Buildpack) ile kuruyorsa build ortamındaki değişken doğrudan görülebilir ve işe yarayabilir. **Dokploy'un frontend build yöntemi TEYİT GEREK.**

**Doğrulama (kod düzeltildikten sonra):** `<FRONTEND-ALAN>/robots.txt` aç → en alttaki `Sitemap:` satırı **kendi alan adını** göstermeli, `localhost` değil. Sonra `<FRONTEND-ALAN>/sitemap.xml` → `<loc>` etiketlerinde `localhost` geçmemeli.

---

# 3. BUNLARI YAPTIKTAN SONRA NE OLUR

| Biten iş | Ne açılır / neyi çözer |
|---|---|
| **A1** kalıcı disk | 🔴 **ÇIKIŞ BLOKERİ kapanır** (`G8-01`). Profil fotoğrafları kalıcı olur; `G8-02` ortam teyidinin yarısı biter. Kuyrukta `K-04`'ün "⚠️ Kalıcı disk = PO adımı" notu düşer. 2026-09-09'daki "sunucu hatası"nın muhtemel kök nedeni de kapanır |
| **A2** yedek + prova | 🔴 **ÇIKIŞ BLOKERİ kapanır** (madde 120 / `G1-28`). Projenin en eski açık riski. Prova yapılınca `07-oturum-gunlugu.md:65`'teki "restore DENENMEDİ" itirafı kapanır. **C13** (iki yedek tablo) için de zemin hazırlanır |
| **A3** `NODE_ENV` | 7 koruma birden doğrulanır; gömülü anahtar riski kapanır. Bütün güvenlik denetimlerinin sessiz ön koşulu |
| **B4** SMTP | 11 e-posta akışı çalışmaya başlar (şifre sıfırlama dahil). `/health` `smtp:verified` olur. **B5'in ön koşulu** |
| **B5** kurum bildirimleri | Kurum başvuru döngüsü **kapanır** — onay/ret/düzeltme kuruma ulaşır. Bekleme ekranının "e-posta ile bilgi verilecek" sözü doğru hale gelir |
| **B6** `BACKEND_URL` | Avatar adresleri + **KVKK zorunlu "abonelikten çık" linki** düzelir |
| **B7** frontend build | Site **fiilen çalışır hale gelir.** Diğer her testin ön koşulu — bu bitmeden A1/B5/B6 testleri yanlış sonuç verir |
| **B8** `ALLOWED_ORIGINS` | Tarayıcı istekleri engellenmez; `www`'lu/`www`'suz erişim netleşir |
| **B9** `CRON_ENABLED` teyidi | 8 zamanlanmış işin koştuğu **kanıtlanır** — KVKK imhası, anlaşma yenileme, geri bildirim hatırlatması dahil |
| **C11** seed teyidi | DISC / öğrenme yolculuğu / sertifika akışlarının canlıda gerçekten çalıştığı doğrulanır; boşsa **doğru iş açılır** (bugün hangisinin boş olduğu bilinmiyor) |

**Ayrıca bu turda görülen, PO'nun ilgisini çekebilecek üç yan kalem:**
- `backend/.env.backup-anaDB` dosyası hâlâ var ve eski bağlantı bilgisi barındırabilir → `G8-05`, silinmesi bekliyor.
- `INVITATION_TOKEN_EXPIRY` **ölü ayar** (`.env.example:91-95`'te işaretli) — env listesinde görürsen şaşırma, değiştirmek bir şeyi değiştirmez.
- 🔴 **`.dockerignore` ↔ `migrate deploy` çelişkisi:** imajda veritabanı göç dosyaları eksik olabilir ⇒ **sıfırdan kurtarmada şema oluşmayabilir.** Bugün görünmez çünkü mevcut veritabanı zaten güncel; **tam da kurtarma anında patlar.** `docker build` gerektirdiği için doğrulanamadı — **TEYİT GEREK**, A2'nin görünmez ortağı.

---

# 4. YAPAMAZSAN — her iş için neyi kaybedersin (tek cümle, dürüst)

| İş | Yapılmazsa |
|---|---|
| **A1** | Her deploy'da kullanıcıların profil fotoğrafları silinir; veritabanında adres kalır, ekranda kırık kare görünür ve **hiçbir uyarı çıkmaz** — veritabanı yedeği bunu düzeltemez. |
| **A2** | 6 saatten eski bir veri kaybında **geri dönüş yoktur**; üstelik kodun kendisi her Pazar sabahı ve her gün 07:00'de veri siliyor, yani pencere fark edilmeden kapanıyor. |
| **A3** | Kaynak koda gömülü ve **GitHub'dan okunabilen** anahtarlarla çalışma riski sürer; 7 koruma birden kapalı olabilir ve bunu hiçbir şey sana söylemez. |
| **B4** | Şifresini unutan kullanıcı hesabına **kalıcı olarak erişemez**; randevu, mesaj ve onay bildirimlerinin hiçbiri gitmez — ekran hepsinde "gönderildi" der. |
| **B5** | Kurum başvuruları askıda kalır; özellikle "düzeltme iste" dediğinde kurum **ne istediğini asla öğrenemez** ve başvuru sonsuza kadar bekler. |
| **B6** | Profil fotoğrafları görünmez ve **KVKK'nın zorunlu kıldığı "abonelikten çık" linki 404 verir** — bu bir uyum sorunudur. |
| **B7** | Site açılır ama **hiçbir şey çalışmaz**: giriş, kayıt, panel — hepsi sessizce başarısız olur ve sunucu loglarında hiçbir iz kalmaz. |
| **B8** | Site görünür ama işlemler tamamlanmaz; hata yalnız kullanıcının tarayıcı konsolunda görünür, **sunucu "her şey yolunda" der.** |
| **B9** | *(Varsayılan açık olduğu için muhtemelen kaybın yok.)* Ama yanlışlıkla kapalıysa: KVKK veri imhası durur (**hukuki risk**), anlaşmalar haber verilmeden süresi dolar, geri bildirim hiç istenmez. |
| **C11** | Hangi içeriğin eksik olduğunu bilmeden canlıya çıkarsın; en kötüsü **öğrenme yolculuğu boşsa kullanıcı "tamamladın!" ekranı görür** ve sen bunu çalışıyor sanarsın. |
| **EK SITE_URL** | Google'da hiç çıkmazsın ve paylaşılan linkler bozuk önizlemeyle görünür. *(Zaten şu an senin elinde değil — kod işi.)* |

---

# 5. KOD ↔ BELGE ÇELİŞKİLERİ (bu turda bulundu, düzeltilmedi)

> Bu tur `docs/kararlar/` · `docs/otonom/` · `CLAUDE.md` · `.env.example`'a **yazmadı** (tur talimatı). Aşağıdakiler yalnız **rapor edilmiştir**; düzeltme ilgili turun işi.

### Ç-1 — 🔴 `CLAUDE.md` kendi içinde çelişiyor: canlı veritabanı hangisi?
- `CLAUDE.md:245` → *"Canlı ve lokal **AYNI Neon** DB'sini paylaşıyor"*
- `CLAUDE.md:261` → *"**PROD**: docker-compose Postgres (`@postgres:5432`), **Neon değil**."*

İkisi aynı dosyada ve doğrudan çelişiyor. Ağırlıklı kanıt Neon'u gösteriyor (canlı göç turunda host fiilen doğrulanmış — `09-DURUM.md:20`), ama `docker-compose.yml:16-24` gerçekten bir Postgres servisi de tanımlıyor.
⇒ **A2'nin temelidir**, bu yüzden kılavuzun 0. adımı yapıldı. `CLAUDE.md:262`'nin kendi kuralı da bunu emrediyor: *"hangi DB'ye bağlı olduğunu ÖNCE host'tan doğrula."*

### Ç-2 — `dokploy-foto-volume-talimati.md` ile kod: yol ve uid DOĞRU, satır numaraları bayat
`docs/kararlar/dokploy-foto-volume-talimati.md` (71 satır) okundu. **Ana iddiaları doğru:** konteyner yolu `/app/uploads` (`:24`, `:65`) ✅ · uid **1001** (`:14`, `:49`) ✅ · compose'da backend volume'ü yok (`:15`) ✅ · adım sırası ve "tekrar redeploy et" doğrulaması ✅.
**Bayat satır numaraları:** `:10` "`config.ts:94`" → gerçekte **`config.ts:113`** · `:12` "`server.ts:68`" → gerçekte **`:73`** · `:13` "`server.ts:140`" → gerçekte **`:154`**.

### Ç-3 — 🔴 `.env.example` ile kod çelişiyor: `UPLOAD_DIR=""`
`backend/.env.example:98-100` *"boş bırakılırsa varsayılan kullanılır"* diyor ve `:101`'de `UPLOAD_DIR=""` veriyor. **Kod bunu yapmıyor:** `config.ts:113` `??` operatörü kullanıyor, boş metin geçerli değer sayılıyor ⇒ yol boş kalır, fotoğraf yükleme kırılır.
⇒ Şablonu kopyalayan PO doğrudan bu tuzağa düşer. Kılavuzda uyarı olarak yazıldı (A1 Tuzak-1).

### Ç-4 — `dokploy-foto-volume-talimati.md`'de eksik olan iki adım
- **Sahiplik sorununun kökeni yazılmamış:** talimat `:48-58` uid sorununu "olabilir" diye anlatıyor, ama `Dockerfile`'da `/app/uploads` için **ne `mkdir` ne `chown`** olmadığını söylemiyor (43 satırın tamamı okundu). Bu bir olasılık değil, yapısal eksik.
- **Hata belirtisi tarif edilmemiş:** talimat "log'a düşer" diyor; oysa kullanıcı **net bir cümle** görüyor: *"Fotoğraf şu anda kaydedilemedi…"* (503 `AVATAR_YAZILAMADI`, `avatarController.ts:58-61`). Bu cümle en hızlı teşhis aracıdır, kılavuza eklendi.

### Ç-5 — `02-ILERLEME.md` PO'ya yapılamayan bir iş veriyor
`02-ILERLEME.md:85` *"`NEXT_PUBLIC_SITE_URL` prod domaine set edilmeli"* diyor. **Ama `frontend/Dockerfile`'da bu değişken için `ARG` yok** ⇒ PO nereye yazsa etkisiz. Belge, işin PO'da olduğunu ima ediyor; gerçekte **kod işi** (EK bölümü).

### Ç-6 — KVKK envanteri ile kod: `FeedbackLog` saklama süresi
`kvkk-veri-aktarim-envanteri-2026-08-25.md:64` *"`FeedbackLog`: **süresiz** (yorumda '3 yıl' ama uygulanmamış)"* diyor. **Kod bugün 3 yılı uyguluyor** (`gdprService.ts:342`, silme `:371-373`). Envanter 📸 dondurulmuş bir fotoğraf olduğu için eskime beklenir; **ama KVKK metinleri bu envanterden üretilecekse kod kazanır** (KURAL 10).

### Ç-7 — `backend/CLAUDE.md` model sayısı
"38 model" diyor; gerçek **39** (`grep -c '^model ' prisma/schema.prisma`). *(Bu, önceki turda da raporlanmıştı; hâlâ düzeltilmemiş.)*

---

# 6. TARANAMADI / TEYİT GEREK — PO'nun cevaplayacakları

| # | Soru | Neden önemli |
|---|---|---|
| 1 | Dokploy'da `DATABASE_URL` **Neon'u mu, compose-Postgres'i mi** gösteriyor? | **A2'nin temeli** (Ç-1) |
| 2 | Dokploy backend/frontend **hangi yöntemle** deploy ediliyor — compose mu, ayrı uygulama mı? | B8'de çoklu adres desteğini belirler |
| 3 | Dokploy frontend'i **Dockerfile ile mi** yoksa otomatik derleyiciyle mi kuruyor? | `NEXT_PUBLIC_SITE_URL`'in yazılabilir olup olmadığını belirler |
| 4 | Frontend **hangi `BACKEND_URL` değeriyle build edilmiş**? | B7 — sitenin çalışıp çalışmadığının tek belirleyicisi |
| 5 | Dokploy sunucusu **hangi ülkede**? | Yedek seçeneği (c)'nin KVKK değerlendirmesi — envanterde de bilinmiyor |
| 6 | Neon ücretli plan **fiyatı**? | Seçenek (a) kararı — repoda fiyat bilgisi yok |
| 7 | Canlıda `NODE_ENV` panelden **ezilmiş mi**? | A3 — Dockerfile+compose doğru set ediyor, orkestratör katmanı repoda görünmüyor |
| 8 | `/uploads` için Dokploy'da **elle bir mount zaten var mı**? | A1 — belki iş kısmen yapılmıştır |
| 9 | Dokploy backend'i **submodule'ü nasıl çözüyor**? | `docker-compose.yml:36` `context: ./backend` ama bu çalışma kopyasında o dizin boş |

**Bu turda kod tarafında taranamayanlar (dürüstlük):** `docs/raporlar/kesif/devir-analizi-2026-09-21.md` **depoda yok** (kapsam beyanı §"ÖNCE OKU"); `.dockerignore` ↔ `migrate deploy` çelişkisi `docker build` gerektirdiği için **doğrulanmadı**; Neon planı/6 saatlik pencere/branch özelliği **veri olarak kabul edildi**, doğrulanmadı; canlı satır sayıları belgelerden okundu (2026-08/09 fotoğrafı), **bugünkü değerler TEYİT GEREK.**

---

# 7. BELGE SENKRONU

**Bu tur için belge güncellemesi GEREKMEDİ — gerekçe:** 🟩 PLANLA turu, salt-okuma; hiçbir kod/şema/DB durumu değişmedi, hiçbir kuyruk işi tamamlanmadı. Tur talimatı `docs/otonom/`, `docs/kararlar/`, `docs/arsiv/`, `CLAUDE.md` ve `.env.example`'a yazmayı **açıkça yasakladı** (terminalde büyük tur çalışıyor).

⚠️ **İlgili turun yapması gerekenler** (bu tur yazamadığı için yalnız listelendi):
1. §5'teki 7 çelişki (özellikle **Ç-1** `CLAUDE.md` DB çelişkisi ve **Ç-3** `UPLOAD_DIR=""`) düzeltilmeli — Ç-3 doğrudan bir veri/işlev kaybı tuzağıdır.
2. `03-PO-ELLE-ISLER.md`'ye bu kılavuza atıf düşülebilir (o belge "ne", bu belge "nasıl").
3. `NEXT_PUBLIC_SITE_URL` için `frontend/Dockerfile` + `docker-compose.yml` düzeltmesi bir **kod işi** olarak kuyruğa girmeli (EK bölümü) — `02-ILERLEME.md:85` bugün PO'ya yapamayacağı bir iş veriyor.
