> 🔥 SICAK — her otonom turda okunur. Hedefli okuma: OTONOM-PROMPT.txt § 0.4
> TÜR: 🔥 · SON DOĞRULAMA: ❓ içerik denetlenmedi (başlık 2026-09-23 DA turunda eklendi) · TAZELEME TETİKLEYİCİSİ: PO bir işi yapınca ya da yeni kod-dışı iş çıkınca

# 03 — PO'NUN ELLE YAPACAKLARI (kod değiştirilerek çözülemeyen işler)

> ⛔⛔ **ACİL (2026-09-25) — canlıda "taslak" kurum var mı?** Yeni kurum kaydı, sihirbazda logo girilmediyse / renk değiştirilmediyse / platform onayı bekliyorsa "taslak" adımında kalıyordu; her gün çalışan temizlik 96 saati geçen, anlaşması olmayan taslak kurumları **kullanıcılarıyla birlikte siliyor** (`backend/src/services/cronScheduler.ts:181-212`). İleriye dönük düzeltme: menti-mentor-v2 #272. **Senin bakman gereken:** Neon/prod veritabanında `SELECT id, slug, "createdAt", "onboardingStep", "verificationStatus" FROM "Tenant" WHERE "onboardingStep" IN ('TEMPLATE','LOGO','PREVIEW') AND "isActive" = true;` (salt okuma). Satır varsa **KARAR-81**'i cevapla; ajan tarihli yedek alıp düzeltir. Acil güvence istersen Dokploy'da geçici `CRON_ENABLED=false` (tüm zamanlanmış işleri durdurur — KVKK imhası dahil; bkz. V-11).


🔄 YAŞAYAN · Oluşturma: 2026-09-19 · Kaynak: W (`operasyonel-hazirlik-2026-09-19.md`) + X (`uctan-uca-kurum-yolculugu-2026-09-19.md`) denetimleri.

> **Bu belge neden var:** Denetimlerde çıkan risklerin bir kısmı **kodla çözülemez** — Dokploy paneli, hesap
> ayarı, SMTP hesabı, Neon planı, canlı ortam değişkeni gibi işler. Bunlar kuyruğa (`00-KUYRUK.md`) YAZILMAZ;
> yoksa ajan yapamayacağı işi her turda atlar ve kuyruk kirlenir. Buraya risk sırasıyla yazılır, PO tek tek yapar.

> 🟠 **YENİ (2026-09-25) — Dokploy: frontend build argümanı `NEXT_PUBLIC_SITE_URL`.** Sitenin paylaşım görseli (Y-09), sitemap ve arama motoru adresleri bu değişkenden kuruluyor ve değer **build sırasında** koda gömülüyor. Dokploy'da frontend uygulamasının **build argümanlarına** `NEXT_PUBLIC_SITE_URL` = sitenin herkese açık adresi (https ile, sonda `/` olmadan) eklenmeli. Eklenmezse link paylaşıldığında görsel çıkmaz (adres `localhost` olur). **Doğrulama:** yeniden deploy sonrası ana sayfanın kaynağında `og:image` satırı canlı alan adıyla başlamalı. (Kod tarafı: çatı #297 Dockerfile ARG.)

## ⛔ GÜVENLİK — bu belgeye ASLA gerçek değer yazılmaz
Repo **PUBLIC**. Şifre · API anahtarı · token · SMTP parolası · JWT secret **buraya YAZILMAZ.**
Yalnız "hangi değişken · nereye · neden · nasıl doğrularım" yazılır. Değerler PO'da/Dokploy'da kalır.

---

## ⛔ CANLIYA ÇIKIŞ İÇİN ŞART — PO'nun 10 işi (2026-09-21, devir analizi §11)

> **Tek cümlelik cevap: Hayır, bugün çıkılamaz — ama yükün ağırlığı koda değil PO'ya düşüyor.**
> 24 çıkış blokerinden **10'u PO'da, 14'ü ajanda**. PO'nun 10 işinin **8'i "S" eforlu** (env/panel ayarı + teyit) → **bir oturumda kapatılabilir.**
> Test ölçütü (`00-CIKIS-PLANI.md:13`): **T1** yasa/sızıntı/geri-alınamaz kayıp · **T2** ana akış kırılır · **T3** sessiz yanlış (kimse fark etmez).

### ⭐ ADIM 0 — HER ŞEYDEN ÖNCE: hangi veritabanı canlı?
**`CLAUDE.md` kendi içinde çelişiyor:** bir yerde *"canlı ve lokal **AYNI Neon**"*, başka yerde *"**PROD**: docker-compose Postgres, **Neon değil**"*.
Kırmızı kural 1, yedek stratejisi ve "6 saat restore penceresi" hesabının tamamı bu varsayıma dayanıyor.
⇒ **Dokploy → backend → `DATABASE_URL` hangi sunucuyu gösteriyor?** (değeri kimseye gönderme, ekran görüntüsü alma — yalnız **hangisi** olduğunu not et).
⛔ **Bu netleşene kadar EN KÖTÜ DURUMU varsay: migration/seed öncesi yedek ZORUNLU.**
*(Aynı adım `po-cikis-kilavuzu-2026-09-21.md` Blok 0 ile birebir — iki belge çelişmiyor, aynı işi gösteriyor.)*

### Sıralı liste — hepsinin ayrıntısı aşağıdaki A/B/C bölümlerinde

| # | İş | Test | Efor | Bölüm |
|---|---|:---:|:---:|---|
| A1 | Avatar için kalıcı disk (persistent volume) + `UPLOAD_DIR` + klasör sahipliği (uid 1001) | T1 | S | A#1 |
| A2 | DB yedeği + **geri yükleme provası** (= madde 120 / G1-28) | T1 | M | A#2 |
| A3 | `NODE_ENV=production` teyidi | T1+T3 | S | A#3 |
| B4 | SMTP doldur (`SMTP_HOST`/`USER`/`PASS`/`FROM`) | T2+T3 | S | B#4 |
| B5 | `TENANT_NOTIFICATIONS_ENABLED='true'` | T2+T3 | S | B#5 |
| B6 | `BACKEND_URL` teyidi | T1 | S | B#6 |
| B7 | `NEXT_PUBLIC_API_URL` **build** teyidi | T2 | S | B#7 |
| B8 | `ALLOWED_ORIGINS` değeri | T2 | S | B#8 |
| B9 | `CRON_ENABLED` teyidi | T1+T3 | S | B#9 |
| C11 | Seed tabloları dolu mu (`Question` · `CertificationQuestion` · `LearningStage`) | T2 | S | C#11 |

### ⭐ Adım adım kopyala-yapıştır kılavuz
Her iş için **değişkenin tam adı · değer biçimi · hangi servise (backend/frontend) · build mi restart mı · bilinen tuzaklar · doğrulama** burada:
**`docs/raporlar/kesif/po-cikis-kilavuzu-2026-09-21.md`** (dal `otonom/BA-po-cikis-kilavuzu-20260921` — bu belge onun *ne* tarafı, kılavuz *nasıl* tarafı).

> ⚠️ **Ajan tarafındaki 14 çıkış blokeri** `00-KUYRUK.md`'de Not sütununda **`⛔ ÇIKIŞ BLOKERİ (T…)`** ile işaretlidir — PO'nun yapacağı bir şey yok, bilgi amaçlı.

## Ortak doğrulama yolu
~~[ESKİ · 2026-09-19] Çoğu ortam değeri tek yerden görülür: **`GET /health`** → `env` alanı. Bu tur `/health` zenginleştirilirse (Bölüm 6 + V-01/V-04/V-11) SMTP · DB · cron durumu da buradan okunacak.~~
⚠️ **GÜNCELLEME (2026-09-21, kod-teyitli): `/health` ZENGİNLEŞTİRİLDİ — V-01/V-11 İNDİ.** Tek istekte dört şey birden görülüyor:
**`GET <BACKEND-ALAN>/health`** → `{ "ok", "db": "up|down", "smtp": "verified|failed|unconfigured|unknown", "cron": "enabled|disabled", "env", "ts", "version", "uptime" }`
Kanıt: `backend/src/services/health.ts:7-17` (tip) · `:40-49` (gövde) · `backend/src/server.ts:60-63` (uç — **auth YOK, rate limit YOK**) · SMTP durum değerleri `backend/src/services/emailService.ts:26,48-52`.
⇒ **A3 (`env`) · B4 (`smtp`) · B9 (`cron`) artık TEK tarayıcı sekmesinden doğrulanır.** DB erişilemezse uç **503** döner → Docker healthcheck'in yalancı "healthy" vermesi bitti.

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
| 4 | **SMTP ayarlarını doldur ve geçerliliğini teyit et** (`SMTP_HOST` / `SMTP_USER` / `SMTP_PASS`) | Biri boşsa **tüm e-postalar sessizce atılıyor** (`emailService.ts:38-41` `return`; çağıran hep `void`/`.catch`). Kullanıcı şifresini unutur → "E-postanızı kontrol edin" görür → **mail hiç gelmez** → hesabına erişimi kalıcı kaybolur. Aynı sessizlik: kayıt onayı, randevu talebi (mentör haberdar olmaz, API `201` döner), yeni mesaj, admin bildirimleri. | Dokploy env. | Şifre sıfırlama iste → **mail gerçekten geliyor mu.** Bölüm 6 sonrası `/health` SMTP durumu "ok" gösteriyor mu (V-01).  ⚠️ **EK (2026-09-21):** **P-10** mentör talep bildirimi bu ayar olmadan **ETKİSİZ** kalır — kod merge edilse de mentöre mail gitmez (`notificationService.ts:38-54` `[PUSH-STUB]` yalnız log yazıp `{sent:true}` döner). Kardeş satırlar U-04·V-01·V-08 bu işareti taşıyordu, P-10'da yoktu. |
| 5 | **`TENANT_NOTIFICATIONS_ENABLED='true'` yap** (varsayılan `false`, hiçbir deploy dosyasında geçmiyor — `config.ts:88`) | Platform admini bir STK başvurusuna "düzeltme iste"/"onayla"/"reddet" der, panelde **başarı görür** — ama kuruma hiçbir şey gitmez. Başvuru `CORRECTION_REQUESTED`'da **süresiz askıda kalır**; kurum ne istendiğini bilmediği için asla düzeltmez. Bekleme ekranı ise kuruma "e-posta ile bilgi verilecek" sözü veriyor. ⚠️ **Önce karar §4.1:** ret/düzeltme metinleri hukuki sonuçlu — açmadan önce metinler gözden geçirilsin mi? | Dokploy env (karar sonrası). | Bir test kurumu onayla/reddet → kuruma mail gitti mi. |
| 6 | **`BACKEND_URL` backend konteynerine geçiriliyor mu — teyit + gerekirse ekle** | Geçmiyorsa `backendBaseUrl = FRONTEND_URL` olur → **avatar public URL'leri** ve **KVKK zorunlu unsubscribe linki** frontend domain'ine işaret eder → `/uploads/...` ve `/api/tenants/unsubscribe` **404.** KVKK'nın zorunlu kıldığı abonelikten çıkma linki çalışmaz. (Ajan compose'a ekliyor — V-08; canlı değeri PO teyit eder.) | Dokploy env / `docker-compose.yml`. | Bir e-postadaki unsubscribe linkine tıkla → 404 değil, çalışıyor ✅. Avatar URL'i backend domaininde.  ✅ **GÜNCELLEME (2026-09-21): kod tarafı KAPANDI** — compose backend'e açıkça geçiriyor (`docker-compose.yml:59-61`, V-08/PR #225). Geriye **yalnız** "Dokploy'da değer doğru mu" teyidi kaldı. |
| 7 | **Frontend build'i doğru `BACKEND_URL` / `NEXT_PUBLIC_API_URL` ile mi yapıldı — teyit** | `NEXT_PUBLIC_API_URL` **build-time** gömülür (`frontend/Dockerfile:16-19`), runtime'da değiştirilemez. Build `--build-arg` olmadan yapılırsa `http://localhost:3000` **kalıcı olarak** bundle'a gömülür → canlı site tüm API çağrılarını localhost'a yapar, **hiçbir şey çalışmaz** ve frontend'de iz kalmaz. | Dokploy build arg / CI build tanımı. | Canlı sitede giriş yap → API çağrıları backend domaine gidiyor (tarayıcı ağ sekmesi), localhost değil.  ⚠️ **NETLEŞTİRME (2026-09-21):** Dokploy'da **`BACKEND_URL`** set et — compose `args` köprüsü hazır (`docker-compose.yml:85-86` → `frontend/Dockerfile:16-17`). ⛔ `NEXT_PUBLIC_API_URL`'i "Environment" kutusuna yazmak **işe yaramaz**: değer **build sırasında koda gömülür**, restart yetmez → **REBUILD** şart. |
| 8 | **`ALLOWED_ORIGINS` doğru ve boşluksuz mu** | Set değilse frontend CORS'a takılır (fail-closed). ⚠️ `.split(',')` **trim yapmıyor** (`server.ts:48`) → `"a.com, b.com"` yazılırsa boşluklu ikinci origin **hiç eşleşmez** → o origin'den site açılmaz. | Dokploy env. | Değerde virgülden sonra **boşluk olmamalı.** Canlı frontend origin'i listede ve CORS hatası yok.  ⚠️ **GÜNCELLEME (2026-09-21): kod tarafı KUYRUĞA taşındı** (`.split(',')` trim etmiyor — `server.ts:53`; AŞAMA Y'de satır açıldı). Bu satır artık **yalnız** "değer doğru alan adını içeriyor mu" teyidine daralır. |
| 9 | **`CRON_ENABLED` açık mı — teyit** (varsayılan AÇIK ✅) | `false` ise 8 iş sessizce durur: KVKK 90 gün/3 yıl imhası (saklama ihlali), anlaşma yenileme istemi, geri bildirim hatırlatması → NPS/algoritma girdisi kurur. Tek belirti konteyner log'unda tek satır. | Dokploy env / log. | Konteyner log'unda `[CRON] Haftalık görevler zamanlandı…` (`cronScheduler.ts:445-446`) satırı var mı. Bölüm 6 sonrası `/health` cron durumu (V-11). |

## C — DB / VERİ İŞLEMLERİ (bulutta yapılamaz, canlı Neon gerekir)

| # | İş | Neden kritik (somut senaryo) | Nerede yapılır | Nasıl anlaşılır (doğrulama) |
|---|---|---|---|---|
| 10 | **İki yedek tablo düşürülsün mü — karar + (evetse) DROP** (S26 `MentorshipAgreement_yedek_20260830` 150 satır, S37 `CertificationOption_yedek_20260909` 20 satır) | İkisi de şemada yok → `migrate dev`/`db push` bunları **"fazlalık görüp DROP etmek isteyebilir** (koruma aracı koruduğu veriyi kaybedebilir). Tek savunma `db push --accept-data-loss` yasağı — insan kuralı, kod muhafızı değil. ⚠️ Karar §4.4: tetikleyici ("regresyonsuz görülünce") gerçekleşti mi? | Neon konsolu / canlı DB (yedek alındıktan sonra). | `SELECT table_name FROM information_schema.tables WHERE table_name LIKE '%_yedek_%';` — DROP sonrası bu iki tablo listede yok.  ⚠️ **EK (güvenlik konseyi §2.B.2 / §5 P-f, 2026-09-21):** asıl mesele tek seferlik DROP kararı değil, **yapısal körlük** — `anonymizeUser`'ın tamamı Prisma delegate'leriyle yazılmış (`gdprService.ts:81-178`, `$executeRaw` yok) ve Prisma yalnız `schema.prisma`'da tanımlı modele bağlanır ⇒ **şemada olmayan hiçbir `*_yedek_*` tablosu anonimleştirmeden görülemez.** Bugünkü pratik maruziyet düşük görünüyor (150 satır öksüz test-fixture, `cleanup-orphan-agreements-2026-08-30.sql:4-9`) ama **TEYİTSİZ**; ve F.13 kuralı her migration öncesi yedek tablo zorunlu kıldığı için PII taşıyan bir tabloya (`User`, `Message`, `Feedback`) migration atıldığı an aynı körlük yeniden doğar. Karar **KARAR-26/KARAR-36** ile birlikte verilmeli. |
| 11 | **Canlı DB'de seed tabloları dolu mu — teyit** (`Question` / `CertificationQuestion` / `LearningStage`) | Temiz DB'de bu yol DISC testinde kırılır (`isComplete` asla `true` olamaz, X §4.6). Havuz yalnız `prisma/seed.ts` ile dolar ve o dosya **prod'da yıkıcı** (`:295-319` koşulsuz `deleteMany`). | Neon konsolu (salt-okuma sorgu). | `SELECT count(*) FROM "Question";` > 0 · aynısı `CertificationQuestion`, `LearningStage`. |
| 12 | **2026-09-09 hata teşhisi + "yakılan hatırlatma" etkisi — canlı sorgu** | (a) `SystemLog`'ta o günün ERROR'ları `EACCES`/`ensureUploadDir` içeriyor mu → avatar-izin teşhisini kesinleştirir. (b) `cronScheduler.ts:143-153` mail atlansa da `reminderEmailSentAt` yazıyor → kaç kurumda hatırlatma "yakıldı". | Neon konsolu (salt-okuma). | W §6.2'deki 3 SQL sorgusu (SystemLog ERROR filtresi + GROUP BY + yedek tablo listesi). |
| 13 | **Canlıda `COMPLETED` görüşme var mı / `/admin/eslesmeler` boş mu — teyit** | Kod `SCHEDULED→COMPLETED` geçişi yazmıyor (X §6#2/U-01) ve `Match` tablosuna yazan kod yok (`createMatchIfEligible` 0 çağıran). Canlıda eski/elle veri olabilir; ürün kararı bu teyide bağlı. | Neon konsolu (salt-okuma). | `SELECT count(*) FROM "Meeting" WHERE status='COMPLETED';` ve `SELECT count(*) FROM "Match";`. |

---

## D — CANLI GÖZLEM TESTLERİ (kod hazır, gerçek hesapla ekran doğrulaması gerekir)

> Kaynak: `09-DURUM.md:439,441` · kartlar `G8-altyapi-po-manuel.md:48-70` (G8-03 · G8-04, ikisi ⬜, "[x] işleme al" PO işaretli) · `01-KARARLAR.md` KARAR-18 · `00-CIKIS-PLANI.md:75` (K4).
> **Ajan yapamaz:** iki gerçek hesap, canlı alan adı, gerçek e-posta kutusu, 45 sn polling gerekiyor.

| # | İş | Neden kritik | Nerede | Nasıl anlaşılır |
|---|---|---|---|---|
| 14 | **[G8-03] Sohbeti (chat) canlıda uçtan uca dene** | Kod TAM CANLIDA (`09-DURUM.md:419-421`) ama **hiç gerçek kullanıcıyla denenmedi**. Chat, mentinin mentörle ilk teması — buradaki bir pürüz tam güven anında patlar. **Mail ayağı ayrıca riskli:** SMTP boşsa e-posta sessizce düşer (`emailService.ts:79-82`), kullanıcıya hiçbir belirti çıkmaz. | Canlı site, **iki ayrı gizli pencere** (menti + mentör, aynı kurum) + gerçek e-posta kutusu | (1) Menti ilk mesajı yazar → mentörde **rozet 45 sn içinde** artar (polling). (2) Mentör konuşmayı açar, mesaj görünür. (3) Mentide "okundu" işareti belirir. (4) Mentörün kutusuna bildirim **gerçekten düşer** (düşmezse → B#4 SMTP). (5) Ters yönde aynı 4 adım. **30-45 dk** |
| 15 | **[G8-04] Mentör paneli metriklerini canlıda gözle gör** | Metrik kartları canlıda (IDOR korumalı) ama **gerçek veriyle hiç bakılmadı**. Bu kartlar mentörün emeğinin tek görünür karşılığı; yanlış/sıfır sayı mentörün bırakmasına yol açar ve kimse fark etmez (uç 200 döner). **Somut şüphe:** `SCHEDULED→COMPLETED` geçişi kodda **hiç yazılmıyor** (U-01) → "tamamlanan" kartı kalıcı 0 gösterebilir. | Canlı site, gerçek mentör hesabı + Neon salt-okuma `SELECT` | 4 kart **"0"/"—" değil gerçek sayı** ve DB ile birebir: `SELECT count(*) FROM "Meeting" WHERE "mentorUserId"='<id>' AND status='SCHEDULED';` ↔ bekleyen · `status='COMPLETED'` ↔ tamamlanan (**0 çıkarsa bu U-01'in kanıtıdır, kart hatası değil — not düş**). "Yaklaşan Toplantılar" tarih sırasıyla görünüyor. **20 dk** |
| 16 | **Kullanıcı mesajları (`Message`) için KVKK saklama süresi belirlet** | `SystemLog` 90 gün, `FeedbackLog` 3 yıl imha ediliyor ama **kişiler arası mesajlar süresiz** duruyor — kod bunu açıkça söylüyor (`gdprService.ts:375-378`: süre avukat metniyle belirlenecek, *"kodda keyfi bir süre uygularsak yayınlanacak aydınlatma metniyle çelişir"*). KVKK "sınırlı süre" ilkesine aykırı; denetimde ilk sorulacak şey. Süreyi ajan seçerse hukuki sorumluluk **uydurulmuş bir sayıya** dayanır. | Avukat / hukuk danışmanı (G1-10 metin paketi) | Saklama süresi ("N ay") **yazılı bir metinde** geçiyor ✅ → **F-02** ajan tarafından kodlanabilir hale gelir. ⚠️ Bugüne kadar ne KARAR kartı ne 03-PO satırı vardı → **hiçbir yerde takip edilmiyordu** |
| 17 | **OAuth açık rıza metnini yazdır** | Google/LinkedIn ile girişte rıza **örtük** alınıyor (`oauth/oauthService.ts`); kayıt formundaki metin OAuth akışında kullanılamıyor. Ajan onay kutusunu koyabilir, **metni yazamaz**. | Aynı hukuk görüşmesi (#16 ile birlikte) | Metin yazılı ✅ → **F-03** kodlanabilir |
| 18 | **"Kurum kendi sertifika sorusunu ekleyemez" kuralının gerekçesini bir cümleyle yaz** | Kısıt kodda uygulanıyor (`certification.service.ts:385`) ama **NEDEN'i hiçbir belgede yok**. Gerekçe yazılmazsa bir sonraki tur "ölü kısıt" sanıp kaldırmaya kalkar — **bu projede üç kez yaşandı** (YANLIŞ SORU TUZAĞI). Ajan uyduramaz (SİLME PROTOKOLÜ adım 1: *"GEREKÇE BULUNAMADI yaz, UYDURMA"*). | PO — tek cümle | Cümle yazılı ✅ → **F-13** 🟢, 10 dakikalık belge işi |

---

---

## E — DÖRT KONSEY (2026-09-21) — güvenlik · psikometri · içerik · yönetişim

> Bu sekiz kalem 2026-09-21 konsey turundan geldi. **Mükerrer denetimi yapıldı:** `DATABASE_URL` teyidi (ADIM 0),
> `CRON_ENABLED` (#9), `NODE_ENV` (#3), yedek tablolar (#10/#12), avukat paketi (#16/#17) **zaten vardı — tekrar eklenmedi.**
> ⛔ Buraya hiçbir gerçek değer, sır, anahtar ya da alan adı yazılmaz (bkz. belgenin başındaki güvenlik kuralı).

| # | İş | Neden kritik | Nerede yapılır | Nasıl anlaşılır (doğrulama) |
|---|---|---|---|---|
| 19 | **`PLATFORM_ADMIN_EMAIL` canlıda set mi — teyit et** | Bu değişken platform panelinin **ikinci faktörü**. Guard'ı YOK: set değilse uygulama durmuyor, yalnız `console.warn` basıyor (`config.ts:31-45`) — ⚠️ kıyas: `JWT_SECRET` ve `PLATFORM_ADMIN_KEY` prod'da **throw** ediyor. Üstelik `docker-compose.yml:47` varsayılanı `:-` ile açıkça enjekte ediyor (`JWT_SECRET`/`PLATFORM_ADMIN_KEY` için kullanılan `:?` zorunluluk disiplini burada uygulanmamış) → 2FA fiilen **tek faktöre iner**. Kaynak: güvenlik konseyi §5. | **Dokploy** env (backend servisi) | Değişken **kurumsal bir adrese** set edilmiş ✅ — ⛔ değeri buraya YAZMA, yalnız "set edildi" notu. Set değilse: #3 (`NODE_ENV`) doğru olsa bile platform paneli **tek faktörle** korunuyor demektir |
| 20 | **Aydınlatma metni için avukata tek soru:** *"Sunucumuz Londra/Birleşik Krallık'ta; bu KVKK'ya göre yurt dışı aktarım sayılır mı, ek açık rıza gerekiyor mu?"* | Metin bugün **yanlış ülke ve yanlış hukuki rejim** beyan ediyor (`app/kvkk/page.tsx:92-107` ↔ `CLAUDE.md` § Ortam/Veritabanı, madde 92, PO teyitli 2026-08-26). Ajan doğru cevabı koddan çıkaramaz; cevabın yönü **KARAR-38'in maliyetini tamamen değiştiriyor**. ⛔ Aynı görüşmede **#16** (mesaj saklama süresi) · **#17** (OAuth rıza metni) · **#21** (kriz/yaş paketi) ile birlikte sorulmalı — hepsi **KARAR-47**'de toplandı. Kaynak: güvenlik konseyi §5 P-a | Avukat / hukuk danışmanı — G1-10 metin paketiyle birlikte | Yazılı cevap var ✅ → **KARAR-38** cevaplanabilir, **GV-09** çalışılabilir hale gelir |
| 21 | **Uygulama sunucusunun ülkesini teyit et** (veritabanı bölgesi biliniyor; **uygulama sunucusununki kodda hiç yok**) | Aydınlatma metni **ikisini birden** beyan etmek zorunda. Kod tarafında tek bir ipucu yok → ajan bu boşluğu asla dolduramaz. Kaynak: güvenlik konseyi §5 P-b | **Dokploy** paneli — ⛔ yalnız bölge/ülke bilgisi; değer/ekran görüntüsü paylaşma | Ülke tek cümleyle yazılı ✅ → #20 ile birlikte **KARAR-38**'i açar |
| 22 | **Üç psikometri sayımını canlı DB'de ölç** — (a) kaç `UserProfile` satırında `archetype != null` · (b) kaç kullanıcı Likert soru havuzunu **tamamlamış** · (c) `Tenant.tenantVocabulary.algorithmWeights` kayıtlı mı | (a) **KARAR-10'un fiyatını belirler:** kayıtlı `archetype` varsa hepsi çöp (`M1`/`m1`) ve onarım **backfill/recompute** gerektirir — kaç satırı etkilediği bilinmeden iş büyüklüğü kestirilemez. (b) **KARAR-42'den (DISC tekrar testi) etkilenen kitleyi** verir: yalnız havuzu tamamlamış kullanıcı kilitleniyor; sayı 0 ise düşük öncelikli, yüksekse vaat bugün kırılıyor. (c) Canlı ağırlıklar DB'den okunuyor (`algorithmTuner.ts:165-174`); kayıt yoksa sert fallback (`matching.ts:38`) devrede demektir — **belgedeki 60/40 varsayımı doğrulanmamış.** ⛔ Üçü de **varsayılmamalı, ölçülmeli.** Kaynak: psikometri konseyi §7 | Neon konsolu (**salt-okuma** `SELECT`) — ⚠️ **KARAR-35'e bağlı**; #11/#12/#13 ile **aynı oturumda** | `SELECT count(*) FROM "UserProfile" WHERE "archetype" IS NOT NULL;` · havuzu tamamlamış kullanıcı: `UserResponse` sayısı aktif `Question` sayısına eşit olan `userId` sayısı · `SELECT count(*) FROM "Tenant" WHERE "tenantVocabulary" ? 'algorithmWeights';` — **üç sayı da** `02-ILERLEME.md`'ye yazıldıysa ✅ |
| 23 | **`docs/raporlar/icerik/eslesme-uyum-po-inceleme-2026-08-26.md`'deki boş `[ ] PO notu:` satırlarını doldur** — üç kalem: **16 uyum değeri** (4×4 DISC matrisi) · **D>I>S>C sıralaması** · **%60/%40 ağırlık** | Belgenin kendisi diyor ki (`:87-91`): *"…kodun içine elle yazılmış sabit sayılardır. Bunların bilimsel/psikometrik bir kaynağı, dayanağı ya da gerekçesi ne kodda ne de belgelerde yoktur… şu an sezgiseldir."* Bu sayılar kullanıcının gördüğü **her yüzdeyi** üretiyor (`scoring.ts:44-49,89-90`). Ajan bu onayı **veremez** — psikometrik/bilimsel dayanak beyanı ürün sahibinindir. **21 gündür boş.** ⚠️ Söz bugün **yapısal olarak tutulamaz**: kalibrasyonun dayanağı `Match` tablosu hiç yazılmıyor (U-18). Kaynak: psikometri konseyi §7 | PO — belgedeki üç `[ ] PO notu:` satırı (onay ya da *"sezgisel olduğunu kabul ediyorum"* beyanı) | Üç satır da dolu ✅ → **F-08** ve **KARAR-10** cevapları dayanaklı hâle gelir |
| 24 | **`ProfileStep.tsx:296` — form placeholder'ındaki iki gerçek üçüncü-taraf kurum adını teyit et** | Kayıt formunun örnek metninde **iki gerçek kurum adı** geçiyor. Kişi adı yasağı kapsamında **değil**, ama marka/izin açısından PO teyidi gerekir; ajan marka izni konusunda karar veremez. Kaynak: içerik konseyi §10#4 | PO — tek cümle onay ya da "değiştirilsin" talimatı | Ya "kalsın" yazılı ✅ ya da yerine konacak jenerik örnek yazılı ✅ → içerik işi 🟢 olur |
| 25 | **`AZ` ve `BB` dallarının merge SIRASI** — `AZ` **önce** ya da BB ile **birlikte** | Merge yetkisi PO'da; yanlış sıra BB'nin kanıt atıflarını boşa düşürür. `belge-duzeni-rehberi.md:49` + `CLAUDE.md` 4 yerden `docs/raporlar/kesif/devir-analizi-2026-09-21.md`'ye atıf veriyor; dosya **yalnız `origin/otonom/AZ-devir-analizi-20260921`'de** vardı. ✅ **BU PR bunu çözüyor** — AZ·BA·BB·CA·CB·CC·CD yedisi tek dalda birleştirildi, dosya artık bu PR'da. Satır **kayıt olarak** duruyor: bu PR merge edilirse iş biter. Kaynak: yönetişim konseyi §7#2 | GitHub — merge sırası | Bu PR merge edildiyse ✅ (yedi dal ayrıca merge EDİLMEZ, kapatılır) |
| 26 | **KURAL 16 ADAYI'na onay ver — 19 gündür bekliyor** | KURAL 14 ve 15 onaylandı, **16 atlandı**. Kuralın kendi metni *"PO onaylayınca ADAYI düşer"* diyor — yani onayı **yalnız PO** verebilir. Kural: *"bir sayı raporlanmadan önce sayılan birim tanımlanır"*; üç kez aynı desen yaşandı (196↔259 · 30↔40 · 6↔15). Kural artık `docs/kararlar/konu/belge-duzeni-rehberi.md` § KURAL 16'da (bu PR'da CLAUDE.md'den taşındı). Kaynak: yönetişim konseyi §7#3 | PO — tek kelime (onay / ret) | Başlıktaki `ADAYI` etiketi kaldırıldı ✅ ya da kural `🗑️ GEÇERSİZ` işaretlendi ✅ |

## Karar bekleyenler (kart `01-KARARLAR.md`'de — PO cevap yazacak)

> ⭐ **YENİ (2026-09-21, dört konsey): KARAR-38…52 — 15 kart.** Kümeler: 38-40 güvenlik/KVKK · 41-44 psikometri/eşleştirme · 45-48 içerik/metin · 49-52 belge yönetişimi.
> En çok iş açanlar: **KARAR-45** (arketip ad↔kod, 4 iş) · **KARAR-47** (hukuki metin paketi, 5 kalem — #16/#17/#20 hepsi burada) · **KARAR-50** (kural geçersizleşme koşulu, 4 iş).
~~[ESKİ · 2026-09-19] Bu belgedeki bazı işler bir ÜRÜN/HUKUK kararına bağlı. Kartlar bu turda açıldı (KARAR-23+): kurum bildirimleri açılsın mı (§4.1) · hata stack'i panele açılsın mı (§4.2) · yedek nereye (§4.3) · yedek tablo DROP (§4.4) · `mentorVisibilityEnabled` (§4.5) · oryantasyon kilidi engel mi (§9.2) · dış hata izleme servisi kurulsun mu · `LLM_PROVIDER`/OpenAI ölü env silinsin mi.~~
⚠️ **GÜNCELLEME (2026-09-21): YANLIŞ BEYAN DÜZELTİLDİ.** Yukarıdaki cümle *"kartlar bu turda açıldı (KARAR-23+)"* diyordu; **açılmamışlar.** Kod-teyidi: `01-KARARLAR.md`'de kart numaraları **KARAR-0…29 (30 kart)**, en yüksek **29**; `grep "mentorVisibilityEnabled"` → **0 sonuç**, "oryantasyon kilidi" → tek isabet ve o da **başka bir kartın gövdesinde**, kendi kartı yok. ⇒ PO listeye bakıp arayacak, bulamayacaktı.
**Doğrusu:** bu belgedeki işlerin bağlı olduğu kararlardan **bir kısmının kartı hâlâ YOK.** Bu turda (BB) açılan yeni kartlar `01-KARARLAR.md` sonunda **KARAR-30'dan** başlar; içindekiler tablosuna da eklendi. Kartı olmayan konular yeni kartlarda kümelenmiştir — hangi işin hangi karta bağlı olduğu ilgili satırın Not sütununda yazılıdır.

## ⚖️ AVUKAT PAKETİ — tek görüşmede sorulacaklar (2026-09-22, terminal turu)

> Bu paket, ürün/hukuk kararlarından çıkan ve **tek bir avukat görüşmesinde** toplanabilecek soruları bir araya
> getirir. Amaç: PO'nun avukata her seferinde ayrı gitmesini önlemek. Mevcut KVKK metin paketi
> `docs/kararlar/konu/kvkk-metinleri/` altındadır (00-AVUKAT-KONTROL-DOSYASI · 01-aydinlatma-metni ·
> 02-acik-riza-metni · 05-saklama-imha-politikasi …) — aşağıdaki maddeler bu metinlere işlenecek cevaplar üretir.
> ⛔ Bu belgede güvenlik kuralı geçerli: hiçbir gerçek değer/sır yazılmaz.
> ⚠️ **Mükerrer notu:** E-bölümü #16 (mesaj saklama süresi) · #17 (OAuth rıza metni) · #20 (yurtdışı aktarım) ·
> #21 (uygulama sunucusu ülkesi) zaten **KARAR-47** hukuki metin paketinde. Aşağıdaki 8 madde onları **tekrarlamaz**,
> yeni kararlardan doğanları ekler.

| # | Soru (avukata) | Neden önemli | Hangi karar/iş bekliyor |
|---|---|---|---|
| A1 | **KARAR-3** — Sertifika senaryosunda "yasal bildirim yükümlülüğü" ima eden şık hukuken doğru/güvenli mi? Yükümlülük gerçekten var mı, varsa metin nasıl olmalı? | Kullanıcıya "bildirmek zorundasın" ima eden bir metin yanlışsa hukuki sorumluluk doğurur; doğruysa eksik bırakmak risk. | `01-KARARLAR.md` **KARAR-3** cevabı buna bağlı |
| A2 | **KARAR-4** — Kriz geri bildiriminde yönlendirilecek "somut destek kaynağı" metni ne olmalı (hangi hat/kurum, hangi ibare)? | Kendine zarar sinyalinde yanlış/eksik yönlendirme hem etik hem hukuki risk; kaynak resmi ve güncel olmalı. | **KARAR-4** cevabı + kriz akışı metni |
| A3 | **KARAR-31** — Kriz bildirimi (kendine zarar) + **yaş sınırı**: reşit olmayan kullanıcı verisi/veli rızası nasıl ele alınmalı, bildirim eşiği ne? | Yaş + kriz birleşimi KVKK'da özel nitelikli veri + çocuk verisi; yanlış kurgu ağır sonuç. | **KARAR-31** cevabı (öneri YOK, avukat ön koşulu) |
| A4 | **KARAR-27** — Sentry (dış hata izleme) kullanımının **aydınlatma metnine ve yurtdışı aktarım envanterine** eklenmesi: hangi ibare, hangi ülke/alıcı beyanı? | Sentry PII taşıyabilir → yurtdışı aktarım; metinde yer almazsa entegrasyon KVKK'ya aykırı olur. | **DK-01** (Sentry entegrasyonu) CANLI olamadan önce şart |
| A5 | **KARAR-33** — Kurumdan çıkarılan üyenin **adının** mentör geçmişinde (soluk/yarı saydam) kalması veri minimizasyonuna uygun mu, yoksa "Eski üye" mi yazılmalı? | Ad kişisel veri; işlevsel gerekçe (mentör emeği) yeterli mi, yoksa maskeleme mi gerekir — avukat kararı. | **Y-14** / KARAR-33 akışının ad-gösterim ayağı |
| A6 | **KARAR-24 bağlamı** — Platform yöneticisinin **kurum verisine erişimi**: bugün erişim VAR ve KAYITLI (denetim izi). PO "kayıtsız tam erişim" istiyor — bu hukuken mümkün mü, hangi koşulla? | "Tüm sistemi kayıtsız gezme" denetim izini kaldırır; KVKK hesap verebilirlik ilkesiyle çatışabilir. | **DK-03** kapsam dışı bırakılan denetim-izi kararı |
| A7 | **KARAR-34 — SOMUT TASARIM (2026-09-23 cevaplandı):** Topluluk lideri modeli seçildi — lider veri sorumlusu, platform veri işleyen. **Bu kurgu tüzel kişiliği olmayan toplulukta (meslek topluluğu, mezun ağı) hukuken geçerli mi?** Lider gerçek kişi olarak veri sorumlusu sorumluluğunu üstlenebilir mi; üstlenmezse/yoksa platform mu veri sorumlusu olur? | Veri sorumlusu platform çıkarsa KVKK yükü tümüyle platformda; lider çıkarsa sözleşme lidere imzalatılır. Tasarım artık somut → avukat bu iki senaryoyu netleştirmeli. | **KARAR-34** cevaplandı (Bölüm 3); kayıt ekranı metni A9/A10 ile birlikte AVUKAT bekliyor |
| A8 | **KARAR-23** — Kuruma giden **"düzeltme" e-postasının metni** hukuken güvenli mi (ret maili gönderilmiyor, yalnız onay + düzeltme)? | Kuruma giden, hukuki sonucu olabilecek metin; ton ve içerik gözden geçirilmeli. | **DK-02** (düzeltme e-postası) PO onayından önce |
| A9 | **YENİ (KARAR-34) — Platformun anonim toplu veriyi KENDİ eşleştirme algoritmasını iyileştirmek için kullanması:** kayıt ekranına **zorunlu madde** olarak eklendi ("anonim verilerin eşleştirmeyi iyileştirmede kullanılması"). Bu, platformun **kendi amacı** için işleme → platform bu noktada **tek başına veri sorumlusu** olabilir. Zorunlu onay maddesi bunun için **yeterli hukuki dayanak mı**, yoksa ayrı açık rıza mı gerekir? | Platform kendi ticari/ürün amacı için özel-nitelikli psikometrik veriyi (anonimleştirilmiş de olsa) işliyorsa aydınlatma + hukuki sebep ayrı kurgulanmalı; "zorunlu kutu" tek başına yetmeyebilir. | **KARAR-34** kayıt ekranı zorunlu maddeleri (Bölüm 3) · `mask.ts applyKAnonymity` |
| A10 | **YENİ — Kriz / kendine zarar bildirimi (KARAR-31 EK):** Menti kriz ifadesi kullandığında platformun **bildirim yükümlülüğü** var mı? **Reşit olmayan** kullanıcıda ne değişir? **Gizlilik ↔ güvenlik** dengesi (mentiye mahrem notu ile can güvenliği çatışması) nasıl kurulmalı? Platformun **sorumluluğu** nerede başlar/biter (mentör terapist değil)? | Kriz sinyalinde yanlış/eksik ya da fazla müdahale hem etik hem ağır hukuki risk; pasif yönlendirme (112/183) ile aktif tespit+eskalasyon arasındaki hukuki fark netleşmeli. ⚠️ **RUH SAĞLIĞI UZMANI görüşüyle birlikte** (Bölüm 6.5b) ele alınmalı. | **KARAR-31** + **KARAR-4** (destek kaynağı metni) · A2/A3 ile aynı görüşmede |

---

## 🔬 UZMAN PAKETİ — tek danışmada sorulacaklar (2026-09-23, analiz turu)

> Avukat paketi gibi; amaç PO'nun uzmana **tek seferde** gitmesi. **İKİ ayrı uzmanlık** var — karıştırma.

### (a) PSİKOMETRİ / ÖLÇME uzmanı
> Kaynak: `00-ANALIZ-TURU-OZETI-2026-09-23.md` §6 · `icerik-kalitesi-2026-09-23.md` §G. **E ile yönlendirme:** G-1/G-2/G-4 tamamen uzman (E araştırmasında yok); G-3/G-5/G-6 **önce E araştırması dönsün, çıktısı uzmana girdi olsun (sıralı).**
- **G-1** Türkçe ölçme değişmezliği (measurement invariance) protokolü — ölçek Türkçede aynı şeyi mi ölçüyor.
- **G-2** Eşleştirme kalitesi ölçüt değişkeni — NPS / yıldız / ilişki süresi / hedef ilerlemesi / görüşme sayısı arasında "eşleşme işe yaradı" için hangisi birincil ve bizim ölçeğimizde güvenilir? (KARAR-44 ile bağlı)
- **G-3** SJT ampirik anahtar geçiş eşiği — senaryo bankası kaç yanıtta "ampirik" sayılır.
- **G-4** Sertifika 88 şıkkın 1↔2 puan çizgisi — iki bağımsız okuyucuda ne kadar örtüşüyor (karar tutarlılığı). (KARAR-46 · P-99 ile bağlı)
- **G-5** DISC↔Big Five ağırlık matrisi (5×4) hücre-hücre denetimi — `scoring.config.ts:23-29` `DISC_TO_OCEAN_WEIGHTS` savunulabilir mi? (KARAR-10 · KARAR-63 ile bağlı) ⚠️ önce E B-1 dönsün.
- **G-6** "En az" ters katsayı onayı — MOST_LEAST puanlamada ters yön doğru mu.

### (b) ⭐ RUH SAĞLIĞI uzmanı (YENİ, 2026-09-23)
> Kaynak: `persona-panel-gelisimi-2026-09-23.md` (C3/R7) · KARAR-31 EK · KARAR-71 · prompt. Kırılgan/kaygılı genç kitle hedeflenmesinin klinik boyutu — psikometri uzmanı DEĞİL, klinik/ruh sağlığı uzmanı gerekir.
- **RS-1 · Kriz protokolü:** menti kriz/kendine zarar ifadesi kullanınca sistem ne yapmalı? Pasif yönlendirme (112/183) mi, aktif tespit + eskalasyon mu? Mentöre ne söylenmeli (mentör terapist değil)? ⚠️ **AVUKAT A10 ile birlikte.**
- **RS-2 · Kırılgan kullanıcıda tutundurma etiğinin sınırı (KARAR-71):** hangi tutundurma tekniği (streak, suçlulu hatırlatma, yapay kıtlık, ayrılmayı zorlaştırma) kırılgan genç kitlede zararlı? Bugün canlıda olan (umut sinyali F-15/F-16, kutlama P-07, takdir P-14, bildirim izni F-20) kabul edilebilir mi? Nerede tutundurma biter, baskı/manipülasyon başlar?
- **RS-3 · Mentöre verilecek rehberlik:** mentör bir kriz/kırılganlık sinyali gördüğünde ne yapmalı, ne YAPMAMALI? Üzerinden ne kadar yük alınmalı (mentör tükenmesini önleme)?

---

## 📥 ANALİZ TURU PO İŞLERİ (2026-09-23)

> Analiz turundan çıkan, kodla çözülemeyen PO işleri. Kaynak: `00-ANALIZ-TURU-OZETI-2026-09-23.md` §5 · `gelen-kutusu-envanteri-2026-09-23.md` · KARAR-70.

| # | İş | Neden gerekli | Nerede yapılır | Nasıl anlaşılır |
|---|---|---|---|---|
| 27 | ⭐ **GERÇEK KULLANICI GÖRÜŞMESİ yürüt** — 7 persona/panel/strateji belgesinin 7'si de "gerçek mentilerle doğrulanmalı" şartını koştu; **7 haftadır yapılmadı**; 10 davranışsal varsayım YALNIZ bununla sınanabilir. Kılavuzu ajan hazırlıyor (kuyruk **AN-32**, KARAR-70). ⚠️ 2026-09-09 testi PO'nun KENDİ hesaplarıyla gezinti (dogfooding) testiydi — **gerçek kullanıcı görüşmesi DEĞİL.** | Ürünün en büyük belirsizliği davranışsal ("menti gerçekten kırılgan mı, mentör gerçekten seçici mi") → koda karşı test edilemez, yalnız gerçek insanla. persona-v2 (KARAR-68 B) bunsuz üretilemez. | PO — AN-32 kılavuzuyla, gerçek menti/mentör/yönetici ile | Tek-sayfa kılavuzdaki soru seti gerçek kişilerle soruldu ✅; bulgular `02-ILERLEME.md`/09-DURUM'a. **Tetikleyici + öncelik = KARAR-70 cevabı** (öneri A: 3-5 kişi, erken). |
| 28 | **`docs/gelen/` temizliği** — 13 dosya var, **hepsi güvenle silinebilir** (özleri izlenen belge/kodda kayıtlı; kanıt: `gelen-kutusu-envanteri-2026-09-23.md`). Klasör `.gitignore`'da → ajanlar göremez. | Kişisel prompt taslakları birikiyor; içlerinde kayıtlanmamış karar/içerik OLSAYDI kaybolurdu (bu turda tarandı, yoktu). | PO — dosyaları sil (ya da arşivle) | Klasör boş ya da yalnız aktif taslak içeriyor ✅. ⭐ **KURAL önerisi:** *"karar ya da içerik taşıyan hiçbir metin `docs/gelen/`'de BIRAKILMAZ; ilgili `docs/` klasörüne taşınır"* — çünkü `.gitignore` → bulut ajanları göremez. |
| 29 | **Analiz turu salt-okuma DB sayımları** (bulutta DB yok) — (a) canlıda **eski 20 DISC sorusu** kaç ve hangi metin (TO §6-1) · (b) **STK-custom soru** canlı sayısı (OB-13) · (c) **sertifika canlı senaryo** sayısı (IK §C `03-sertifika:21`). Ayrıca **deploy topolojisi:** Dokploy tek-instance mi çok-instance mi (OB-08 cron-duplication kararını belirler) · Neon `connection_limit` (OB-06). | Bu sayılar bilinmeden AN-04 (banka taşıma), AN-13 (ölü triyaj) ve cron kararı büyüklüğü kestirilemez; ajan bulutta canlı Neon'a bakamaz. ⚠️ **KARAR-35 (salt-okuma izni) ve #11/#22 ile aynı oturumda.** | Neon konsolu (salt-okuma `SELECT`) + Dokploy paneli (yalnız topoloji bilgisi) | Beş sayı/bilgi `02-ILERLEME.md`'ye yazıldı ✅. ⛔ değer/secret yazma, yalnız sayım. |

---

## ❓ Kod tarafı TEYİT GEREK (ajan bulutta yapamadı, canlı/gerçek hesap ister)
- `book-meeting` saat dilimi kayması İstanbul'da 409 üretiyor mu (X §8#5, gerçek deneme).
- PENDING (OAuth) menti `mentor-matches`'ten veri alıyor mu (X §8#6 / U-08, gerçek hesap).
- ~~[ESKİ · 2026-09-19] `.dockerignore` ↔ `migrate deploy` çelişkisi kurtarmada şema oluşturuyor mu (W §7#28 / V-14, `docker build`).~~ ⚠️ **GÜNCELLEME (2026-09-21): BU SATIR PO İŞİ DEĞİL** — `docker build` lokal/CI'da koşar, Dokploy veya Neon erişimi gerektirmez ⇒ **ajan işi**, `00-KUYRUK.md`'de **V-14** Not'una taşındı. Buradan çıkarıldı.

---

## Ajan sunucusu (opsiyonel) — PC kapalıyken terminal çalışsın

> **ÖNCELİK: DÜŞÜK.** ⛔ Bu **canlıya çıkış blokeri DEĞİLDİR.** Bölüm A/B/C/D'deki hiçbir işi beklemez ve
> hiçbirini açmaz; yalnızca tur kapasitesini artırır. A ve B bitmeden buna başlanmaz.

**Neden:** Bulut oturumu (claude.ai/code) **merge edemez** ve **DB'ye erişemez** — migration, backfill ve seed
işleri (KARAR-1, KARAR-10 aşama 2, K-15, K-16, K-18, PS-A2) bulutta **yapılamaz**. Bugün bu işler yalnız ev
PC'sinin terminalinde koşuyor; PC kapanınca tur da duruyor. Mevcut VPS'te (**KVM 2 · 2 çekirdek · 8 GB**;
ölçülen kullanım **CPU %2, bellek %23**) **ayrı bir kullanıcı** altında Claude Code çalıştırılabilir.

### ⛔ PAZARLIK DIŞI — güvenlik sınırları

- Kullanıcı **`sudo` ALMAZ**.
- Kullanıcı **`docker` grubuna EKLENMEZ.** ⚠️ `docker` grubu **fiilen root demektir** — eklenirse Dokploy,
  tüm konteynerler ve canlı web sitesi ajana açılır.
- Erişim **yalnız kendi ev dizini** ile sınırlıdır.

### Adımlar

1. **Ayrı kullanıcı** aç (root ile), `sudo`suz ve `docker` grubuna eklenmeden.
2. **Claude Code** kur — resmi kurulum sayfasındaki **yerel yükleyici** tek komutu (Node gerekmez).
3. **`git` + `tmux`** kur (root ile, sistem paketi).
4. Repoyu klonla: `git clone --recurse-submodules` ⚠️ `--recurse-submodules` şart — `backend/` bir
   submodule'dür, onsuz boş gelir.
5. **Giriş yap**, sonra `/config` → **Remote Control** aç.
6. **`tmux` içinde başlat.** Ayrılmak için `Ctrl+B`, sonra `D`; geri dönmek için `tmux attach`.
   *(tmux olmadan SSH oturumu kapanınca tur ölür.)*

### Çalıştırma sınırları

- **Bellek tavanı + `nice`** ile çalıştır — derleme sırasında **canlı web sitesi etkilenmesin**.
- ⛔ **`DATABASE_URL` o kullanıcının ortamına KALICI YAZILMAZ.** Migration turunda **tek seferlik** verilir,
  iş bitince kaldırılır. *(Kalıcı yazılırsa: `sudo`suz bir kullanıcının ev dizininde canlı DB anahtarı durur.)*
- **Gözden geçirme koşulu:** VPS'te **CPU düzenli olarak %40'ı aşarsa** ajan **ayrı bir sunucuya taşınır.**

### ⚠️ Bilinen tuzak

**Ubuntu 22.04**'te yükleyici için **zaman aşımı** bildirilmiş; **24.04 sorunsuz.**

### Nasıl anlaşılır (doğrulama)

`tmux attach` ile oturuma dönülüyor ✅ · ajan `git pull` + `npm run verify` koşabiliyor ✅ ·
`groups <kullanıcı>` çıktısında **`docker` YOK** ve `sudo -l` **izin vermiyor** ✅ ·
canlı site yük altında yavaşlamıyor ✅.

