> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-24 (📸 fotoğraf tarihi) · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)
> ⚠️ Bu belge kalemlerin TANIMINI tutar, DURUMUNU TUTMAZ. Buradaki işaretler 2026-09-24 durumudur. Güncel durum: `docs/otonom/00-KUYRUK.md` (köprü: `docs/kararlar/00-KART-INDEKSI.md`)
> İŞLENME: ✅ işlendi (2026-09-25, tur: KR kalıcı hâle getirme) → `00-KUYRUK` EN ÜST — KOD İNCELEMESİ (KR) bloğu · KARAR-77/78/79 · kutu: 2026-09-25 DA2 turu (belge-duzeni-rehberi § KURAL 23)

# Kod İncelemesi — 2026-09-24 (6 paralel salt-okuma ajanı)

**📸 RAPOR** · tarama 2026-09-24 · kalıcı hâle getirme 2026-09-25 · Sahip: PO
> Bu rapor bir **bulgu kaydıdır**, iş kaynağı değildir. İşler `docs/otonom/00-KUYRUK.md` → **EN ÜST — KOD İNCELEMESİ (KR)** bloğunda.
> Açılan kararlar: `docs/otonom/01-KARARLAR.md` → **KARAR-77 · KARAR-78 · KARAR-79**.

## 0. Güvenlik notu (repo public)
**B bölümü ve C1** için bu belgede yalnız **kısa ad · ciddiyet · kuyruk kodu** yazılır. Dosya:satır, açığın işleyişi ve düzeltme tarifi
**bilerek yazılmamıştır**. Her B maddesi (ve C1) kapandığında ayrıntısı en alttaki **"Kapanış ekleri"** bölümüne
`kapandı: <commit>` notuyla eklenir. Aynı kural kuyruk satırları için de geçerlidir (orada yalnız dosya adı durur).

## 1. Konu ve kapsam
- **Tür:** salt-okuma kod incelemesi; hiçbir dosya değiştirilmedi, DB/seed/migration/test çalıştırılmadı.
- **Çatı repo** `main` = `99189a8aca9344396637cb44d6754a6375e4880c`
- **Backend submodule** = `4686ba4c64a8064a1f6cbcab9a5ea70dd2ec5c90` (çatı pointer'ı ile aynı; backend `origin/main` HEAD)
- **Taranan:** `backend/src` · `backend/prisma` · `backend/tests` · `backend/scripts` · `backend/Dockerfile` · `backend/package.json` ·
  `backend/.github/workflows` · `frontend/src` · `frontend/e2e` · `frontend/Dockerfile` · `frontend/package.json` ·
  `.github/workflows` · `scripts/verify.sh` · `docker-compose.yml` · `docs/otonom` · `docs/kararlar`
- **Kapsam dışı:** merge edilmemiş dalların içeriği (yalnız dal listesi okundu).
- **Alanlar (6 ajan):** backend güvenlik · backend mantık/veri · frontend · test/CI/altyapı · belge-kod tutarlılığı · kod kalitesi/mükerrer kod.

## 2. Doğrulama işaretleri
- **[D]** = koda karşı doğrulandı (inceleme oturumunda ya da 2026-09-25'te strateji katmanında).
- **[teyit gerek]** = yalnız ajan raporuna dayanıyor; düzeltmeyi yapacak ajan **önce kodda doğrular**, doğrulanamazsa işi kapatmaz, not düşer.
- 2026-09-25 strateji katmanı şunları ek olarak doğruladı ve [D] yaptı: **A1, A2, A3** (sayfanın `/api/users/:id`'den yüklendiği dahil),
  **B1–B6** (B4'ün servis sorgusu dahil), **C1, C5** (`prisma`'nın `devDependencies`'te olduğu dahil).

---

## A. Kullanıcıya görünen hatalar

### A1 · Sayfa yenilenince (F5) oturum düşüyor · **Kritik** · [D] · kuyruk **KR-02**
- **Kanıt:** `frontend/src/providers/AuthProvider.tsx:104-117` — sessiz yenileme yalnız erişim anahtarını alıyor, kullanıcı bilgisini yüklemiyor. Kullanıcı bilgisi yalnız giriş ve OAuth yolunda dolduruluyor (`:147`, `:160-164`).
- **Kullanıcı gözünden:** giriş yapmış kullanıcı F5'e basınca panel yerine giriş ekranına atılıyor.
- **Düzeltme:** sessiz yenilemeden sonra `/api/auth/me` çağrılıp kullanıcı bilgisi doldurulsun (OAuth yolundaki `:160-164` deseni).
- **Dokunacağı dosya:** `frontend/src/providers/AuthProvider.tsx` · **Migration:** yok
- **Sıra:** A2 ile BİRLİKTE test edilir (A2'nin etkisi ancak A1 düzelince ekranda görünür).

### A2 · Kurum markası (logo/renk) yüklenmiyor · **Kritik** · [D] · kuyruk **KR-03**
- **Kanıt:** `frontend/src/providers/AuthTenantBridge.tsx:35` normal kullanıcı için `GET /api/tenants/:id` çağırıyor; bu uç `backend/src/routes/tenantRoutes.ts:14` gereği yalnız platform yöneticisine açık → istek hep reddediliyor, hata sessizce geçiliyor.
- **Kullanıcı gözünden:** kurum logosu ve rengi hiçbir ekranda uygulanmıyor; davet metninde kurum adı yerine "Kurumunuz" çıkıyor. `/disc-test`'in bu yüzden sonsuz yüklendiği **[teyit gerek]** (`frontend/src/app/(dashboard)/disc-test/page.tsx:29`).
- **Düzeltme:** normal kullanıcıya açık, **yalnız kendi kurumunu** döndüren, açık alan seçimi (explicit select) yapan bir okuma yolu. Kullanıcıya açık mevcut bir kurum-bilgisi ucu varsa ona geçilir; yoksa yeni uç — yeni uç için CLAUDE.md güvenlik kontrol listesi (auth · tenant izolasyonu · komşu uç karşılaştırması) uygulanır.
- **Dokunacağı dosyalar:** `frontend/src/providers/AuthTenantBridge.tsx` + bir backend route/controller dosyası · **Migration:** yok

### A3 · Profil kaydı LinkedIn/Instagram bağlantılarını siliyor · **Yüksek** · [D] · kuyruk **KR-06**
- **Kanıt:** profil sayfası `/api/users/:id`'den yükleniyor; `backend/src/controllers/userController.ts:168` `USER_FULL_SELECT` içinde `linkedinUrl` ve `instagramUrl` yok → form boş açılıyor → kayıtta `frontend/src/app/(dashboard)/profile/page.tsx:154-155` iki alanı `null` gönderiyor.
- **Kullanıcı gözünden:** profilini her kaydettiğinde sosyal bağlantıları siliniyor.
- **Düzeltme:** iki alan `USER_FULL_SELECT`'e eklensin (bu seçim yalnız kullanıcının kendisi ve yönetici yolunda kullanılıyor) + regresyon testi.
- **Dokunacağı dosya:** `backend/src/controllers/userController.ts` · **Migration:** yok

### A4 · Eşleştirme ağırlık ayarında ölçek uyuşmazlığı · **Kritik (kodda)** · [D] · kuyruk **KR-07**
- **Kanıt:** `backend/src/services/algorithmTuner.ts:290-311` ortalamayı 70/50/60 eşikleriyle karşılaştırıyor; puan `backend/src/controllers/feedbackLogController.ts:26` gereği **0-10**.
- **Kullanıcı gözünden:** veri biriktiğinde memnun kurumlarda bile eşleştirme ağırlığı her hafta DISC yönüne kayar.
- **Canlı etkisi [teyit gerek]:** FeedbackLog'a yazan bir ekran yok ve 10'dan az yanıtla ayar hiç çalışmıyor; gerçek etki ancak canlı kayıt sayısıyla (salt-okuma DB sorgusu, PO işi) bilinir.
- **Düzeltme:** eşikler 0-10 ölçeğine çevrilsin ya da gerçek NPS (promoter% − detractor%) hesaplansın + test.
- **Dokunacağı dosya:** `backend/src/services/algorithmTuner.ts` (+ test) · **Migration:** yok
- **Not:** I-13 / PS-A1 **başka** bir ölçek hatasıdır (OCEAN), bu değil.

### A5 · Bir görüşmeye yalnız bir taraf değerlendirme yazabiliyor · **Yüksek** · [D] · kuyruk **KR-08** · 🔴 **KARAR-77**
- **Kanıt:** `backend/prisma/schema.prisma:623` (`Feedback.meetingId @unique`) · `backend/src/controllers/feedbackController.ts:63-64` (`hasFeedback` ise 409 `ZATEN_MEVCUT`) · `:118` (ilk kayıtta `hasFeedback: true`). Controller 2026-09-25'te doğrulandı.
- **Kullanıcı gözünden:** önce yazan taraf diğerini engelliyor; ikinci taraf "zaten var" hatası alıyor.
- **Düzeltme:** tekillik (görüşme + yazar) olsun — verinin anlamını değiştirir → ürün kararı.
- **Dokunacağı dosyalar:** `backend/prisma/schema.prisma` · `backend/src/controllers/feedbackController.ts` · **Migration:** VAR
- **İlişkili:** AN-47 (geri bildirim modelleri envanteri).

### A6 · Platform panelinde ret penceresinde "İptal" de kurumu reddediyor · **Yüksek** · [D] · kuyruk **KR-09**
- **Kanıt:** `frontend/src/app/platform/dashboard/page.tsx:107-108` — pencereden boş dönülse de ret isteği gidiyor.
- **Kullanıcı gözünden:** platform yöneticisi vazgeçse de kurum reddediliyor.
- **Düzeltme:** pencere iptal edilince işlem durdurulsun.
- **Dokunacağı dosya:** `frontend/src/app/platform/dashboard/page.tsx` · **Migration:** yok

### A7 · Müsaitlik ekranı hata sonrası kaydedilirse blokları siliyor · **Yüksek** · [teyit gerek] · kuyruk **KR-10**
- **Kanıt:** `frontend/src/app/(dashboard)/mentor/availability/page.tsx:44-48, 97`.
- **Kullanıcı gözünden:** yükleme hatasında liste boş görünüyor; o hâlde "Kaydet" tüm müsaitlik bloklarını siliyor.
- **Düzeltme:** yükleme hatasında kaydet düğmesi kilitlensin, hata gösterilsin.
- **Dokunacağı dosya:** aynı sayfa · **Migration:** yok

### A8 · Dönemlik anket gönderilemiyor ve sayfaya bağlantı yok · **Orta** · [D] · kuyruk **KR-11** · 🔴 **KARAR-78**
- **Kanıt (2026-09-25 doğrulandı):** `frontend/src/app/(dashboard)/periodic-survey/page.tsx:54-65` `periodic*` alanlarını `POST /api/meetings/:id/feedback`'e gönderiyor; `backend/src/controllers/feedbackController.ts:9-28` şeması bu alanları tanımıyor ve "en az bir puan" şartı koyuyor → istek her durumda reddediliyor. `frontend/src` içinde sayfaya bağlantı yok (grep boş). Alanlar şemada var (`backend/prisma/schema.prisma` `Feedback.periodic*`, "ayda bir tetiklenir" yorumu) ama tetikleyen kod yok.
- **A5 ile bağ:** anket, görüşme başına TEK olan aynı `Feedback` kaydına yazmaya çalışıyor → A5'in tekillik kuralı bu özelliği de kilitler.
- **Kullanıcı gözünden:** özellik fiilen yok; sayfaya kimse ulaşamıyor, ulaşsa da gönderemiyor.
- **Düzeltme:** özelliğin kalıp kalmayacağı ürün kararı (silme seçeneği silme protokolüne tabi).
- **Dokunacağı dosyalar:** aynı sayfa (+ `backend/src/controllers/feedbackController.ts` şeması) · **Migration:** karara bağlı

### A9 · Randevu ekranında müsaitlik uyarısı 3 saat kayık · **Orta** · [teyit gerek] · kuyruk **KR-12**
- **Kanıt:** `frontend/src/app/(dashboard)/book-meeting/page.tsx:56-68` UTC ile kontrol ediyor; backend İstanbul saatiyle değerlendiriyor.
- **Kullanıcı gözünden:** uygun saat "müsaitlik dışında" görünüyor (ya da tersi).
- **Düzeltme:** kontrol İstanbul saatine göre yapılsın.
- **Dokunacağı dosya:** aynı sayfa · **Migration:** yok

---

## B. Güvenlik (ayrıntı kapanışta eklenecek)

| Kod | Kısa ad | Ciddiyet | Doğrulama | Kuyruk | Ayrıntı |
|---|---|---|---|---|---|
| B1 | Görüşme değerlendirme kayıtlarında erişim kapsamı hatalı | Kritik | [D] | GV-04 | ayrıntı kapanışta eklenecek |
| B2 | Görüşme oluşturma ucunda kimlik kaynağı hatalı | Kritik | [D] | GV-06 | ayrıntı kapanışta eklenecek |
| B3 | Geri bildirim kaydı ucunda kimlik kaynağı hatalı | Yüksek | [D] | GV-05 | ayrıntı kapanışta eklenecek |
| B4 | Psikometrik ön izleme ucunda kurum kapsamı hatalı | Kritik | [D] | KR-04 | ayrıntı kapanışta eklenecek |
| B5 | Zamanlanmış iş tetikleme uçlarında yetki kapsamı hatalı | Yüksek | [D] | KR-05 · 🔴 KARAR-79 | ayrıntı kapanışta eklenecek |
| B6 | Genel istek sınırlamasında anahtar seçimi hatalı | Yüksek | [D] | K-14 | ayrıntı kapanışta eklenecek |
| B7 | Görüşme bağlantısı alanında girdi doğrulaması eksik | Yüksek | [teyit gerek] | GV-03 | ayrıntı kapanışta eklenecek |
| B8 | OAuth yolunda onay kapısı eksik | Yüksek | [teyit gerek] | ❓ U-08 ile ilişkisi belirsiz (satır açılmadı) | ayrıntı kapanışta eklenecek |
| B9 | Kurum dondurma/ret durumu erişime yansımıyor | Yüksek | [teyit gerek] | ❓ GV-10 kapsamında olabilir (satır açılmadı) | ayrıntı kapanışta eklenecek |
| B10 | Kurum-içi rol kaynağı hatalı | Yüksek | [teyit gerek] | GV-10 | ayrıntı kapanışta eklenecek |
| B11 | E-posta şablonlarında girdi kaçışı eksik | Orta | [teyit gerek] | GV-15 | ayrıntı kapanışta eklenecek |

---

## C. Veri kaybı ve altyapı

### C1 · Veri silen yardımcı komutta koruma eksik · **Kritik** · [D] · kuyruk **KR-01** (kuyruğun en üstü)
- Ayrıntı kapanışta eklenecek.

### C2 · `cron-probe.ts` korumasız gerçek temizlik çalıştırıyor · **Yüksek** · [teyit gerek] · kuyruk **KR-13**
- **Kanıt:** `backend/tests/cron-probe.ts:19, 174` — `.env`'deki veritabanını yüklüyor ve taslak kurum temizliğini gerçek olarak çağırıyor; test veritabanı koruması yok. vitest kapsamında değil, elle çalıştırılır.
- **Kullanıcı gözünden:** elle çalıştırılırsa canlı veride gerçek taslak kurumlar ve kullanıcıları silinebilir.
- **Düzeltme:** betiğin başına mevcut test veritabanı koruması (`assertTestDatabase`) eklensin.
- **Dokunacağı dosya:** `backend/tests/cron-probe.ts` (ve aynı desendeki `backend/tests/k1-probe.ts` kontrol edilir) · **Migration:** yok

### C3 · Test veritabanı koruması atlanabiliyor · **Yüksek** · [teyit gerek] · kuyruk **KR-14**
- **Kanıt:** `backend/tests/helpers/assertTestDatabase.ts:24, 67` · `backend/tests/globalSetup.ts:171` · `backend/tests/helpers/db.ts:25`.
- **Kullanıcı gözünden:** aynı canlı veritabanının farklı bir bağlantı adresi (pooler/direct) korumayı geçebilir; testler canlı veriyi silebilir.
- **Düzeltme:** karşılaştırma yalnız metin eşitliğiyle değil host + veritabanı adına göre yapılsın; tanınmayan uzak host varsayılan olarak reddedilsin.
- **Dokunacağı dosyalar:** bu üç dosya · **Migration:** yok

### C4 · Uçtan uca test koruması lokalde etkisiz · **Yüksek** · [teyit gerek] · kuyruk **KR-15**
- **Kanıt:** `frontend/e2e/global-setup.ts:28-38` — veritabanı adresi boşken yalnız uyarı yazıp devam ediyor.
- **Kullanıcı gözünden:** lokalde Playwright koşarsa test kayıtları canlı veritabanına yazılabilir.
- **Düzeltme:** adres boşsa çalışma durdurulsun.
- **Dokunacağı dosya:** `frontend/e2e/global-setup.ts` · **Migration:** yok

### C5 · Prisma CLI canlı imajda yok · **Yüksek** · [D] · kuyruk **KR-16**
- **Kanıt:** `backend/Dockerfile:30` üretim bağımlılıklarını `--omit=dev` ile kuruyor; `prisma` `backend/package.json`'da `devDependencies` içinde; `backend/Dockerfile:43` her açılışta `npx prisma migrate deploy` çalıştırıyor.
- **Kullanıcı gözünden:** sunucu her açılışta Prisma'yı sürümü sabitlenmeden internetten indiriyor → açılış ağa bağımlı, yanlış sürüm gelebilir.
- **Düzeltme:** Prisma CLI sabit sürümle imaja girsin.
- **Dokunacağı dosyalar:** `backend/Dockerfile` · `backend/package.json` · `backend/package-lock.json` · **Migration:** yok
- **Sıra:** KR-01'den SONRA (aynı `package.json`).

---

## D. Diğer önemli bulgular

### D1 · Eşleşme kaydı hiç oluşturulmuyor · **Yüksek** · [D] · kuyruk **PS-04 · U-18** (mevcut)
- **Kanıt:** `backend/src/services/scoring.service.ts:118` `createMatchIfEligible` tek oluşturma noktası; çağıranı yok.
- **Kullanıcı gözünden:** yönetici eşleşme listesi, uyum rozeti, çift risk sinyali boş.
- **Düzeltme:** mevcut satırlardaki sıra geçerli (önce GV-08 silme yolu, sonra Match yazımı). Silme protokolü: önce niyet.

### D2 · Aynı saate iki randevu onaylanabiliyor · **Yüksek** · [teyit gerek] · kuyruk **KR-17**
- **Kanıt:** `backend/src/controllers/meetingController.ts:487-501, 577` — çakışma kontrolü bekleyen (PENDING) talepleri saymıyor; onay sırasında yeniden kontrol yok; kontrol ve kayıt tek işlemde değil.
- **Kullanıcı gözünden:** mentör aynı saatteki iki talebi de onaylayabiliyor → çifte randevu.
- **Düzeltme:** onayda çakışma yeniden kontrol edilsin; kontrol + kayıt tek transaction.
- **Dokunacağı dosya:** `backend/src/controllers/meetingController.ts` · **Migration:** yok

### D3 · Yenilenen anlaşma "aktif" listesinden düşüyor · **Yüksek** · [teyit gerek] · kuyruk **KR-18**
- **Kanıt:** `backend/src/controllers/agreementController.ts:166-169` durumu `RENEWED` yapıyor; aktif filtresi (`:63`, `:138`) `RENEWED`'i içermiyor.
- **Kullanıcı gözünden:** anlaşmasını yenileyen çift anlaşmasını artık bulamıyor; bitiremiyor.
- **Düzeltme:** aktif filtresine `RENEWED` eklensin + test.
- **Dokunacağı dosya:** `backend/src/controllers/agreementController.ts` · **Migration:** yok

### D4 · Çift engeli tek yönde uygulanıyor · **Yüksek** · [teyit gerek] · kuyruk **KR-19**
- **Kanıt:** `backend/src/services/matching.ts:126` engeli yalnız mentör→menti yönünde okuyor; `matching.ts:382`, `backend/src/controllers/conversationController.ts:141`, randevu ve anlaşma oluşturma okumuyor.
- **Kullanıcı gözünden:** yöneticinin engellediği çift menti tarafında birbirini görüp mesajlaşabiliyor, randevu alabiliyor.
- **Düzeltme:** engel menti listesi, sohbet başlatma, randevu ve anlaşma yollarında da uygulansın.
- **Dokunacağı dosyalar:** `matching.ts` · `conversationController.ts` · `meetingController.ts` · `agreementController.ts` · **Migration:** yok

### D5 · Ret sonrası tekrar başvuru ve geri onay bozuk · **Orta** · [teyit gerek] · kuyruk **KR-20**
- **Kanıt:** `backend/src/controllers/selfServeController.ts:256, 277` (reddedilen kurumun adresi "boş" sayılıyor ama veritabanında dolu → 500) · `backend/src/controllers/adminController.ts:652-663` (onay, retle kapatılan hesabı yeniden açmıyor).
- **Kullanıcı gözünden:** reddedilen kurum aynı adresle tekrar başvurunca hata alıyor; reddedilip sonra onaylanan kullanıcı giriş yapamıyor.
- **Dokunacağı dosyalar:** `selfServeController.ts` · `adminController.ts` · **Migration:** yok

### D6 · Kurumun rapor sıklığı tercihi okunmuyor · **Orta** · [teyit gerek] · kuyruk **KR-21**
- **Kanıt:** `backend/src/services/cronScheduler.ts:53-62` — sorgu `reportingFrequency`'yi seçmiyor, değer hep varsayılana (haftalık) düşüyor.
- **Kullanıcı gözünden:** kurum "aylık" seçse de ağırlık ayarı her hafta çalışıyor.
- **Dokunacağı dosya:** `backend/src/services/cronScheduler.ts` · **Migration:** yok

### D7 · `verify.sh` CI ile birebir aynı değil · **Orta** · [teyit gerek] · kuyruk **KR-22**
- **Kanıt:** `scripts/verify.sh:2, 10, 43-45` "birebir aynı" diyor; `.github/workflows/ci.yml:164-280` e2e job'u verify'da yok; entegrasyon testleri farklı veritabanında; backend CI (`backend/.github/workflows/ci.yml`) test-tsc ve eslint adımı içermiyor.
- **Kullanıcı gözünden:** (iç kalite) lokalde yeşil görünen iş CI'da kırılabiliyor ya da tersi.
- **Dokunacağı dosyalar:** `scripts/verify.sh` · `.github/workflows/ci.yml` · `backend/.github/workflows/ci.yml` · **Migration:** yok

### D8 · Belgeler koddan geride · **Orta** · [teyit gerek] · kuyruk ❓ (satır açılmadı)
- **Kanıt:** `docs/kararlar/09-DURUM.md:21, 30-34` (son güncelleme 2026-09-20; backend HEAD ve açık PR bilgisi eski) · `docs/kararlar/00-KARAR-TAKIP.md` B.1 (kuyrukta BİTTİ olan maddeleri açık gösteriyor).
- **Kuyruk:** belge senkronu K-20 yinelenen tur-sonu adımıdır ve arşivde BİTTİ; ayrı satır gerekip gerekmediği belirsiz → ❓.

### D9 · Canlı veritabanı Neon mu, Docker Postgres mi · [D] · kuyruk yok (PO işi)
- **Kanıt:** `docker-compose.yml:44` `DATABASE_URL`'i sabit `@postgres:5432` kuruyor; Neon lehine olan her şey belge beyanı.
- **Takip:** `docs/otonom/03-PO-ELLE-ISLER.md` ADIM 0 (Dokploy'da teyit). Kod değişikliği yok.

### D10 · Merge sırası: backend #90 önce, çatı #264 sonra · [teyit gerek: PR numaraları] · kuyruk yok (operasyonel)
- Çatı #264'ün backend pointer'ı merge edilmemiş backend commit'ini gösteriyor; #264 önce merge edilirse main var olmayan bir backend commit'ini gösterir.

### D11 · Frontend'den çağrılmayan 55 backend ucu · [teyit gerek] · kuyruk **K-13 · E-3** (mevcut)
- 23 mükerrer (başka yol aynı işi yapıyor) · 28 bağlanmamış · 4'ünün ekranı olmaması normal. **Silme önerisi yok** (silme protokolü).

---

## 3. Dosya çakışmaları ve sıra
**Sıralı (aynı dosya):**
- `meetingController.ts`: GV-06 → GV-03 → KR-17 → KR-19 (+ mevcut K-05 / U-01 / V-15 ile sıralı)
- `adminController.ts` / `adminRoutes.ts`: KR-05 → KR-20 (+ mevcut U-13 / Y-14 / GV-10 ile sıralı)
- `agreementController.ts`: KR-18 → KR-19
- `backend/package.json`: KR-01 → KR-16
- `AuthProvider.tsx` + `AuthTenantBridge.tsx`: KR-02 ile KR-03 birlikte test edilir
- `userController.ts`: KR-06, mevcut GV-24 / U-08 / P-16 ile sıralı
- `selfServeController.ts`: KR-20, mevcut GV-12 / GV-11 ile sıralı
- `cronScheduler.ts`: KR-21, mevcut I-10 ile sıralı
- `algorithmTuner.ts`: KR-07, mevcut F-08 / Y-05 ile sıralı
- `platform/dashboard/page.tsx`: KR-09, mevcut IC-03 ile sıralı
- `book-meeting/page.tsx`: KR-12, mevcut K-05 / IC-11 ile sıralı

**Bağımsız (paralel yazılabilir):** KR-04 · KR-06 · KR-07 · KR-13 · KR-14 · KR-18 · KR-21 (backend) · KR-09 · KR-10 · KR-12 · KR-15 (frontend).
**Kısıt:** tüm backend işleri submodule pointer'ını paylaşır → kod paralel yazılabilir, **merge + pointer bump SIRALIDIR**.

**Önce karar:** KR-08 (KARAR-77, migration) · KR-11 (KARAR-78) · KR-05 (KARAR-79) · D1 (niyet araştırması, mevcut satırlarda).

## 4. Öncelik (PO, 2026-09-25)
**KR-01** → **KR-02 + KR-03** → **B1–B6** (GV-04 · GV-06 · GV-05 · KR-04 · KR-05 🔴 · K-14) → kalanlar.

## 5. Kuyruk eşleştirme yöntemi
Aktif `docs/otonom/00-KUYRUK.md` ve `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md` anahtar kelimeyle tarandı; bulunan satırlar okunarak karşılaştırıldı.
Arşivde bu bulguların hiçbiriyle örtüşen BİTTİ satırı çıkmadı.

---

## Kapanış ekleri
> Her B maddesi ve C1 kapandığında ayrıntısı buraya `kapandı: <commit>` notuyla eklenir.

- **C1 · kapandı: backend #91 (`df30e69`) + çatı #267** — `backend/prisma/seed.ts` artık `main()`'in ilk satırında `backend/src/seedGuard.ts` `assertSeedAllowed` çağırıyor; yalnız yerel host + açık onay değişkeni + production dışı üçü birden sağlanırsa toplu temizlik çalışıyor. `package.json` `prisma.seed` üzerinden (migrate reset / db seed) tetiklenme de aynı kilide takılıyor. Test: `backend/tests/seedGuard.unit.test.ts`.
- **B1 · kapandı: backend #93 (`d7fd9eb`) + çatı #269** — `backend/src/controllers/meetingCheckInController.ts` `getCheckIns`: taraf yalnız kendi kaydını, kurum yöneticisi tümünü görüyor; taraf olmayan 403, başka kurum 404. Test: `backend/tests/checkin-visibility.test.ts`.
- **B2 · kapandı: backend #94 (`48c5b97`) + çatı #269** — `backend/src/controllers/meetingController.ts` `createMeeting`: MENTI çağıranda menti kimliği oturumdakiyle aynı olmak zorunda (aksi 403). Test: `backend/tests/create-meeting-identity.test.ts`.
- **B3 · kapandı: backend #95 (`2d4c824`) + çatı #269** — `backend/src/controllers/feedbackLogController.ts` `createFeedbackLog`: MENTOR yalnız kendi adına ve kurum içinde görüşme kaydı olan menti için yazıyor; ret durumunda kayıt ve kombinasyon skoru değişmiyor. Test: `backend/tests/feedbacklog-identity.test.ts`.
- **B4 · kapandı: backend #96 (`e5e1167`) + çatı #269** — `backend/src/controllers/adaptiveTestController.ts` `previewAdaptiveResult`: hedef kullanıcı `id + tenantId + isActive` ile doğrulanıyor (komşu uçlarla aynı). Test: `backend/tests/adaptive-preview-scope.test.ts`.
- **B6 · kapandı (yalnız anahtar ayağı): backend #97 (`43bffa3`) + çatı #269** — `backend/src/middleware/rateLimiter.ts` `generalRateLimitKey`: kova artık istemci başlığından değil, doğrulanmış erişim anahtarındaki kullanıcıdan ya da IP'den. `server.ts` `trust proxy` ayarı yapılmadı (PO turu; değer gerçek vekil sayısı olmalı). Test: `backend/tests/general-rate-limit-key.unit.test.ts`.

