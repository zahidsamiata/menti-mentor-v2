# 03 — PO'NUN ELLE YAPACAKLARI (kod değiştirilerek çözülemeyen işler)

🔄 YAŞAYAN · Oluşturma: 2026-09-19 · Kaynak: W (`operasyonel-hazirlik-2026-09-19.md`) + X (`uctan-uca-kurum-yolculugu-2026-09-19.md`) denetimleri.

> **Bu belge neden var:** Denetimlerde çıkan risklerin bir kısmı **kodla çözülemez** — Dokploy paneli, hesap
> ayarı, SMTP hesabı, Neon planı, canlı ortam değişkeni gibi işler. Bunlar kuyruğa (`00-KUYRUK.md`) YAZILMAZ;
> yoksa ajan yapamayacağı işi her turda atlar ve kuyruk kirlenir. Buraya risk sırasıyla yazılır, PO tek tek yapar.

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
| 10 | **İki yedek tablo düşürülsün mü — karar + (evetse) DROP** (S26 `MentorshipAgreement_yedek_20260830` 150 satır, S37 `CertificationOption_yedek_20260909` 20 satır) | İkisi de şemada yok → `migrate dev`/`db push` bunları **"fazlalık görüp DROP etmek isteyebilir** (koruma aracı koruduğu veriyi kaybedebilir). Tek savunma `db push --accept-data-loss` yasağı — insan kuralı, kod muhafızı değil. ⚠️ Karar §4.4: tetikleyici ("regresyonsuz görülünce") gerçekleşti mi? | Neon konsolu / canlı DB (yedek alındıktan sonra). | `SELECT table_name FROM information_schema.tables WHERE table_name LIKE '%_yedek_%';` — DROP sonrası bu iki tablo listede yok. |
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

## Karar bekleyenler (kart `01-KARARLAR.md`'de — PO cevap yazacak)
~~[ESKİ · 2026-09-19] Bu belgedeki bazı işler bir ÜRÜN/HUKUK kararına bağlı. Kartlar bu turda açıldı (KARAR-23+): kurum bildirimleri açılsın mı (§4.1) · hata stack'i panele açılsın mı (§4.2) · yedek nereye (§4.3) · yedek tablo DROP (§4.4) · `mentorVisibilityEnabled` (§4.5) · oryantasyon kilidi engel mi (§9.2) · dış hata izleme servisi kurulsun mu · `LLM_PROVIDER`/OpenAI ölü env silinsin mi.~~
⚠️ **GÜNCELLEME (2026-09-21): YANLIŞ BEYAN DÜZELTİLDİ.** Yukarıdaki cümle *"kartlar bu turda açıldı (KARAR-23+)"* diyordu; **açılmamışlar.** Kod-teyidi: `01-KARARLAR.md`'de kart numaraları **KARAR-0…29 (30 kart)**, en yüksek **29**; `grep "mentorVisibilityEnabled"` → **0 sonuç**, "oryantasyon kilidi" → tek isabet ve o da **başka bir kartın gövdesinde**, kendi kartı yok. ⇒ PO listeye bakıp arayacak, bulamayacaktı.
**Doğrusu:** bu belgedeki işlerin bağlı olduğu kararlardan **bir kısmının kartı hâlâ YOK.** Bu turda (BB) açılan yeni kartlar `01-KARARLAR.md` sonunda **KARAR-30'dan** başlar; içindekiler tablosuna da eklendi. Kartı olmayan konular yeni kartlarda kümelenmiştir — hangi işin hangi karta bağlı olduğu ilgili satırın Not sütununda yazılıdır.

## ❓ Kod tarafı TEYİT GEREK (ajan bulutta yapamadı, canlı/gerçek hesap ister)
- `book-meeting` saat dilimi kayması İstanbul'da 409 üretiyor mu (X §8#5, gerçek deneme).
- PENDING (OAuth) menti `mentor-matches`'ten veri alıyor mu (X §8#6 / U-08, gerçek hesap).
- ~~[ESKİ · 2026-09-19] `.dockerignore` ↔ `migrate deploy` çelişkisi kurtarmada şema oluşturuyor mu (W §7#28 / V-14, `docker build`).~~ ⚠️ **GÜNCELLEME (2026-09-21): BU SATIR PO İŞİ DEĞİL** — `docker build` lokal/CI'da koşar, Dokploy veya Neon erişimi gerektirmez ⇒ **ajan işi**, `00-KUYRUK.md`'de **V-14** Not'una taşındı. Buradan çıkarıldı.
