# 03 — PO'NUN ELLE YAPACAKLARI (kod değiştirilerek çözülemeyen işler)

🔄 YAŞAYAN · Oluşturma: 2026-09-19 · Kaynak: W (`operasyonel-hazirlik-2026-09-19.md`) + X (`uctan-uca-kurum-yolculugu-2026-09-19.md`) denetimleri.

> **Bu belge neden var:** Denetimlerde çıkan risklerin bir kısmı **kodla çözülemez** — Dokploy paneli, hesap
> ayarı, SMTP hesabı, Neon planı, canlı ortam değişkeni gibi işler. Bunlar kuyruğa (`00-KUYRUK.md`) YAZILMAZ;
> yoksa ajan yapamayacağı işi her turda atlar ve kuyruk kirlenir. Buraya risk sırasıyla yazılır, PO tek tek yapar.

## ⛔ GÜVENLİK — bu belgeye ASLA gerçek değer yazılmaz
Repo **PUBLIC**. Şifre · API anahtarı · token · SMTP parolası · JWT secret **buraya YAZILMAZ.**
Yalnız "hangi değişken · nereye · neden · nasıl doğrularım" yazılır. Değerler PO'da/Dokploy'da kalır.

## Ortak doğrulama yolu
Çoğu ortam değeri tek yerden görülür: **`GET /health`** → `env` alanı (`server.ts:55`). Bu tur `/health`
zenginleştirilirse (Bölüm 6 + V-01/V-04/V-11) SMTP · DB · cron durumu da buradan okunacak.

---

## A — ÇIKIŞ BLOKERİ / VERİ KAYBI (en acil)

| # | İş | Neden kritik (somut senaryo) | Nerede yapılır | Nasıl anlaşılır (doğrulama) |
|---|---|---|---|---|
| 1 | **Avatar için kalıcı disk (persistent volume) tanımla + `UPLOAD_DIR` ayarla + klasör sahipliği (uid 1001)** | Kullanıcı profil fotoğrafını yükler; günler sonra bir deploy olur ve **fotoğraf silinir** — `User.avatarUrl` DB'de kalır → profilde kırık görsel. Hiçbir hata/log yok; kullanıcı şikâyet edene kadar kimse bilmez. DB restore ile düzeltilemez. Aynı kök neden (uid 1001'in `/app` yazma izni yok) 2026-09-09 "Beklenmedik sunucu hatası"nın muhtemel açıklaması. **G8-01'de 🔴 ÇIKIŞ BLOKERİ.** | **Dokploy** paneli: backend servisine persistent volume mount + env `UPLOAD_DIR` (mount yolu). Klasör sahipliği uid 1001'e verilmeli. | Fotoğraf yükle → **bir deploy tetikle** → fotoğraf hâlâ görünüyorsa ✅. (Kalıcı disk yoksa deploy sonrası kırılır.) |
| 2 | **Düzenli/bütün-DB yedek yordamı kur + restore provası yap** — `= madde 120 / [G1-28]` 🔴 çıkış blokeri (yeni numara VERİLMEZ) | Bugün 6 saatten eski veri kaybına karşı **sıfır koruma** var. Üstelik `runWeeklyPurge` **Pazar 03:00 UTC** siliyor (`cronScheduler.ts:414-416`); Pazartesi mesaide fark edilen bir sorunda ~27 saat geçmiş olur → Neon 6-saat penceresi kapanır → **geri dönüş yok.** Silmeyi bir insan değil **kodun kendisi her hafta tetikliyor.** | Karar §4.3'e bağlı (`01-KARARLAR`): (i) Dokploy volume'üne yazan cron, (ii) Neon ücretli plan (pencere 6sa→30g), (iii) GitHub Actions artifact ⚠️ **KVKK'da üçüncü ülkeye aktarım sayılabilir** (aktarım envanteri tutuluyor). | Yedek dosyası oluşuyor + **boş bir DB'ye geri yükleme (restore) denendi ve tablolar/satırlar geldi** ✅. Restore provası yapılmadan "yedek var" sayılmaz. |
| 3 | **`NODE_ENV=production` canlıda gerçekten set mi — teyit et** | Set değilse **7 koruma birden sessizce kapanır**: 3 fail-fast guard (`JWT_SECRET`, `PLATFORM_ADMIN_KEY`, `DEFAULT_TENANT_ID`) + 4 cookie `secure` bayrağı (platform admin çerezi dâhil). Sistem GitHub'da okunabilen gömülü secret'la JWT imzalayabilir. (Azaltıcı: `Dockerfile:39` + `docker-compose.yml:43` ikisi de set ediyor ✅ — yine de canlı teyit şart.) | Dokploy env / deploy tanımı. | `GET /health` → `env` alanı **`"production"`** dönüyorsa ✅. |

## B — SESSİZ KOPMA (kullanıcı etkilenir, kimse görmez)

| # | İş | Neden kritik (somut senaryo) | Nerede yapılır | Nasıl anlaşılır (doğrulama) |
|---|---|---|---|---|
| 4 | **SMTP ayarlarını doldur ve geçerliliğini teyit et** (`SMTP_HOST` / `SMTP_USER` / `SMTP_PASS`) | Biri boşsa **tüm e-postalar sessizce atılıyor** (`emailService.ts:38-41` `return`; çağıran hep `void`/`.catch`). Kullanıcı şifresini unutur → "E-postanızı kontrol edin" görür → **mail hiç gelmez** → hesabına erişimi kalıcı kaybolur. Aynı sessizlik: kayıt onayı, randevu talebi (mentör haberdar olmaz, API `201` döner), yeni mesaj, admin bildirimleri. | Dokploy env. | Şifre sıfırlama iste → **mail gerçekten geliyor mu.** Bölüm 6 sonrası `/health` SMTP durumu "ok" gösteriyor mu (V-01). |
| 5 | **`TENANT_NOTIFICATIONS_ENABLED='true'` yap** (varsayılan `false`, hiçbir deploy dosyasında geçmiyor — `config.ts:88`) | Platform admini bir STK başvurusuna "düzeltme iste"/"onayla"/"reddet" der, panelde **başarı görür** — ama kuruma hiçbir şey gitmez. Başvuru `CORRECTION_REQUESTED`'da **süresiz askıda kalır**; kurum ne istendiğini bilmediği için asla düzeltmez. Bekleme ekranı ise kuruma "e-posta ile bilgi verilecek" sözü veriyor. ⚠️ **Önce karar §4.1:** ret/düzeltme metinleri hukuki sonuçlu — açmadan önce metinler gözden geçirilsin mi? | Dokploy env (karar sonrası). | Bir test kurumu onayla/reddet → kuruma mail gitti mi. |
| 6 | **`BACKEND_URL` backend konteynerine geçiriliyor mu — teyit + gerekirse ekle** | Geçmiyorsa `backendBaseUrl = FRONTEND_URL` olur → **avatar public URL'leri** ve **KVKK zorunlu unsubscribe linki** frontend domain'ine işaret eder → `/uploads/...` ve `/api/tenants/unsubscribe` **404.** KVKK'nın zorunlu kıldığı abonelikten çıkma linki çalışmaz. (Ajan compose'a ekliyor — V-08; canlı değeri PO teyit eder.) | Dokploy env / `docker-compose.yml`. | Bir e-postadaki unsubscribe linkine tıkla → 404 değil, çalışıyor ✅. Avatar URL'i backend domaininde. |
| 7 | **Frontend build'i doğru `BACKEND_URL` / `NEXT_PUBLIC_API_URL` ile mi yapıldı — teyit** | `NEXT_PUBLIC_API_URL` **build-time** gömülür (`frontend/Dockerfile:16-19`), runtime'da değiştirilemez. Build `--build-arg` olmadan yapılırsa `http://localhost:3000` **kalıcı olarak** bundle'a gömülür → canlı site tüm API çağrılarını localhost'a yapar, **hiçbir şey çalışmaz** ve frontend'de iz kalmaz. | Dokploy build arg / CI build tanımı. | Canlı sitede giriş yap → API çağrıları backend domaine gidiyor (tarayıcı ağ sekmesi), localhost değil. |
| 8 | **`ALLOWED_ORIGINS` doğru ve boşluksuz mu** | Set değilse frontend CORS'a takılır (fail-closed). ⚠️ `.split(',')` **trim yapmıyor** (`server.ts:48`) → `"a.com, b.com"` yazılırsa boşluklu ikinci origin **hiç eşleşmez** → o origin'den site açılmaz. | Dokploy env. | Değerde virgülden sonra **boşluk olmamalı.** Canlı frontend origin'i listede ve CORS hatası yok. |
| 9 | **`CRON_ENABLED` açık mı — teyit** (varsayılan AÇIK ✅) | `false` ise 8 iş sessizce durur: KVKK 90 gün/3 yıl imhası (saklama ihlali), anlaşma yenileme istemi, geri bildirim hatırlatması → NPS/algoritma girdisi kurur. Tek belirti konteyner log'unda tek satır. | Dokploy env / log. | Konteyner log'unda `[CRON] Haftalık görevler zamanlandı…` (`cronScheduler.ts:445-446`) satırı var mı. Bölüm 6 sonrası `/health` cron durumu (V-11). |

## C — DB / VERİ İŞLEMLERİ (bulutta yapılamaz, canlı Neon gerekir)

| # | İş | Neden kritik (somut senaryo) | Nerede yapılır | Nasıl anlaşılır (doğrulama) |
|---|---|---|---|---|
| 10 | **İki yedek tablo düşürülsün mü — karar + (evetse) DROP** (S26 `MentorshipAgreement_yedek_20260830` 150 satır, S37 `CertificationOption_yedek_20260909` 20 satır) | İkisi de şemada yok → `migrate dev`/`db push` bunları **"fazlalık görüp DROP etmek isteyebilir** (koruma aracı koruduğu veriyi kaybedebilir). Tek savunma `db push --accept-data-loss` yasağı — insan kuralı, kod muhafızı değil. ⚠️ Karar §4.4: tetikleyici ("regresyonsuz görülünce") gerçekleşti mi? | Neon konsolu / canlı DB (yedek alındıktan sonra). | `SELECT table_name FROM information_schema.tables WHERE table_name LIKE '%_yedek_%';` — DROP sonrası bu iki tablo listede yok. |
| 11 | **Canlı DB'de seed tabloları dolu mu — teyit** (`Question` / `CertificationQuestion` / `LearningStage`) | Temiz DB'de bu yol DISC testinde kırılır (`isComplete` asla `true` olamaz, X §4.6). Havuz yalnız `prisma/seed.ts` ile dolar ve o dosya **prod'da yıkıcı** (`:295-319` koşulsuz `deleteMany`). | Neon konsolu (salt-okuma sorgu). | `SELECT count(*) FROM "Question";` > 0 · aynısı `CertificationQuestion`, `LearningStage`. |
| 12 | **2026-09-09 hata teşhisi + "yakılan hatırlatma" etkisi — canlı sorgu** | (a) `SystemLog`'ta o günün ERROR'ları `EACCES`/`ensureUploadDir` içeriyor mu → avatar-izin teşhisini kesinleştirir. (b) `cronScheduler.ts:143-153` mail atlansa da `reminderEmailSentAt` yazıyor → kaç kurumda hatırlatma "yakıldı". | Neon konsolu (salt-okuma). | W §6.2'deki 3 SQL sorgusu (SystemLog ERROR filtresi + GROUP BY + yedek tablo listesi). |
| 13 | **Canlıda `COMPLETED` görüşme var mı / `/admin/eslesmeler` boş mu — teyit** | Kod `SCHEDULED→COMPLETED` geçişi yazmıyor (X §6#2/U-01) ve `Match` tablosuna yazan kod yok (`createMatchIfEligible` 0 çağıran). Canlıda eski/elle veri olabilir; ürün kararı bu teyide bağlı. | Neon konsolu (salt-okuma). | `SELECT count(*) FROM "Meeting" WHERE status='COMPLETED';` ve `SELECT count(*) FROM "Match";`. |

---

## Karar bekleyenler (kart `01-KARARLAR.md`'de — PO cevap yazacak)
Bu belgedeki bazı işler bir ÜRÜN/HUKUK kararına bağlı. Kartlar bu turda açıldı (KARAR-23+):
kurum bildirimleri açılsın mı (§4.1) · hata stack'i panele açılsın mı (§4.2) · yedek nereye (§4.3) ·
yedek tablo DROP (§4.4) · `mentorVisibilityEnabled` (§4.5) · oryantasyon kilidi engel mi (§9.2) ·
dış hata izleme servisi kurulsun mu · `LLM_PROVIDER`/OpenAI ölü env silinsin mi.

## ❓ Kod tarafı TEYİT GEREK (ajan bulutta yapamadı, canlı/gerçek hesap ister)
- `book-meeting` saat dilimi kayması İstanbul'da 409 üretiyor mu (X §8#5, gerçek deneme).
- PENDING (OAuth) menti `mentor-matches`'ten veri alıyor mu (X §8#6 / U-08, gerçek hesap).
- `.dockerignore` ↔ `migrate deploy` çelişkisi kurtarmada şema oluşturuyor mu (W §7#28 / V-14, `docker build`).
