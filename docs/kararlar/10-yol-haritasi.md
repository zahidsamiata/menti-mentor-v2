# MentiMentor — Sıradaki İşler Yol Haritası

> Bu belge, mail işinden sonra yapılacak tüm işleri doğru sıraya, bağlamına, moduna ve
> bağımlılığına göre toplar. Amaç: her seferinde "sırada ne var" diye düşünmeden bu belgeyi
> takip ederek ilerlemek. **İşler tek tek, kullanıcı başlattıkça yapılır — bu belge yalnızca referans.**

---

## 🆕 (2026-08-10) KOPUK-UÇ ENVANTERİ + MENTÖR KARAR EKRANI (chat CANLI sonrası — EN GÜNCEL)

> Chat v1 canlıya alındı (backend #33 MERGED main'de, frontend #47/#48 MERGED). Bu blok, chat
> sonrası GÜNCEL kopuk-uç taramasını ve kalıcı bir iş notunu toplar. Kanıtlar dosya:satır.
> Aşağıdaki maddeler **İŞ 6 (HAYALET-BACKEND LİSTESİ)** kapsamına girer — sil/bağla/ertele
> kararı ürün sahibinde.

### ⭐ KALICI İŞ — Mentör karar ekranında menti mesajı (boyut: M)
- **Durum bugün:** Mentör talep karar ekranı (`frontend/src/app/(dashboard)/mentor/page.tsx:167-247`,
  "Toplantı Talepleri" onay kuyruğu) şu an **`Meeting.requestMessage`** gösteriyor
  (`mentor/page.tsx:190-193` blockquote "Niyet mesajı"). Backend `listMeetings`
  (`backend/src/controllers/meetingController.ts:152-177`) bu alanı döndürüyor.
- **Kopukluk:** Chat'in ilk mesajı (`Conversation`/`Message`, `startConversation`
  `conversationController.ts:104-182`) **AYRI** ve karar ekranına bağlı **DEĞİL**.
  `Conversation` → `MatchRequest`'e bağlı; karar ekranı `Meeting` sorguluyor; **`Conversation↔Meeting`
  arası FK yok**. Chat'in ayrıca kabul/ret karar ekranı da yok.
- **Risk:** Chat, talep-anı mesajının yerini alırsa menti açılış mesajı yalnızca `/messages` inbox'ta
  kalır → mentör mesajı görmeden (veya ayrı ekrana giderek) karar verebilir.
- **İş:** `listMeetings`'e menti+mentör çiftinin `Conversation` ilk mesajını ekle
  (`Conversation`'da `mentorUserId_mentiUserId` unique index var → lookup kolay) — **BE orta** +
  FE karar kartında render — **küçük**. Toplam **M**. Yeni endpoint gerekmez.
- **Ön koşul (chat canlı): ✅ TAMAMLANDI.**

### (B) Ölü backend uçları (kod VAR → frontend çağırmıyor)
- **`super-admin` router tümü ölü (4 endpoint):** `backend/src/routes/superAdminRoutes.ts:14-19`
  (`GET /dashboard`, `PATCH /tenants/:id/status`, `GET /tenants/pending`, `PATCH /tenants/:id/verify`).
  `server.ts:105`'te `/api/super-admin`'e mount edilmiş AMA frontend'de **sıfır referans** (grep boş).
  Aynı işi `/api/platform` (mount `server.ts:84`, controller platformController) yapıyor ve frontend
  onu kullanıyor → **super-admin legacy DUPLİKE küme**. Karar: **sil** (öneri) veya bağla.
- **Menti visibility opt-in legacy uçları:** `backend/src/routes/userRoutes.ts:76-81, 139-152`
  (`POST /mentors/:id/visibility-optin`, `POST /mentis/:id/request-visibility`,
  `GET /mentors/:id/pending-visibility-requests`, `PATCH .../visibility-optin/:optInId/respond`,
  controller `mentiRequestController`). Frontend'de **çağrılmıyor** (grep boş) → chat opt-in akışının
  yerini aldığı eski "Akış B". Karar: sil/ertele (şema kolonu `VisibilityOptIn` DROP ayrı tur).

### (C) Yarım/placeholder özellikler (UI VAR → backend eksik/stub)
- **Mentör metrik kartları placeholder:** `frontend/src/app/(dashboard)/mentor/page.tsx:31-36`
  `PLACEHOLDER_METRICS` (Aktif Mentilerim / Bekleyen Talepler / Ortalama NPS / Tamamlanan) hepsi
  "—" gösteriyor; mentöre özel metrik endpoint'i yok. **Canlıda görünür.** (TEYİT GEREK: KPI
  endpoint'i admin içindir, mentör-bazlı değil.)
- **"Yaklaşan Toplantılar" placeholder:** `mentor/page.tsx:414-423` "Toplantı modülü yakında buraya
  entegre edilecek." — boş kart. **Canlıda görünür.**
- **Push bildirim stub:** `backend/src/services/notificationService.ts` — gerçek push (FCM/Expo) yok,
  SystemLog'a yazıyor. **Canlıda kullanıcıya görünmez** (in-app unread/e-posta üzerinden idare ediliyor).

### (D) Karşılıksız frontend çağrısı — YOK ✅
- Frontend'in tüm API çağrılarının backend karşılığı **VAR** (0 adet 404-beklentisi). Prefix/method
  eşleşmeleri tutarlı. `PATCH /api/tenants/:id/settings` `adminSettingsRoutes` (`server.ts:102`) ile
  karşılanıyor (bir ara-taramada "mount yok" sanıldı — **yanlış**, mount VAR).

### Öncelik önerisi (kullanıcıyı en çok etkileyen → en az)
1. **Mentör metrik + "Yaklaşan Toplantılar" placeholder** — canlıda mentör bunları boş görüyor
   (deneyim/güven etkisi yüksek). Retention "mentör sevdirme" işiyle örtüşür (bkz. kuyruk md.4).
2. **Mentör karar ekranında menti mesajı (M)** — chat büyürse doğrudan karar kalitesini etkiler.
3. **super-admin ölü küme + visibility legacy uçları** — kullanıcıya görünmez ama güvenlik/bakım
   yükü (auth'lu ama kullanılmayan yüzey). Temizlik/İŞ 6 turunda sil.

### ⚠️ GÜNCELLEME (2026-08-10) — silme turu sonucu + revizyon
Ölü-uç silme turunda silmeden önceki son teyit, önceki envanterin bazı "ölü" iddialarını **çürüttü**:
- **super-admin router → SİLİNMEDİ.** `backend/tests/tenant-verification.test.ts:153,172,204`
  `/api/super-admin/tenants/:id/verify` ve `/pending` uçlarını **davranışsal test ediyor** → dead
  legacy değil, frontend'e henüz bağlanmamış **testli yetenek**. (Yukarıdaki (B)/öncelik-3'te "ölü"
  sanılmıştı — düzeltildi.)
- **`setVisibilityOptIn` (Taraf-1, `matchingController`) → SİLİNMEDİ.** Docs
  `stk-yonetici-panel-envanteri-2026-08-02.md:70` bunu "yarım admin manuel-eşleştirme, teyit gerek"
  olarak işaretliyor + aktif controller içinde. **TEYİT GEREK**, ayrı karar.
- **Menti-driven görünürlük talebi (Taraf-2) → SİLİNDİ.** `mentiRequestController.ts` (3 handler) +
  `userRoutes` 3 rota. Gerçekten ölü: 0 frontend / 0 test / 0 iç çağrı; opt-in gate eşleşme
  akışından zaten kaldırılmıştı (`requestController.ts:17`). **Şemaya/DB'ye dokunulmadı**
  (`VisibilityOptIn` tablosu duruyor — `VisibilityOptIn` kolon DROP'u ayrı onaylı migration turu).
  - PR: backend **#35** · çatı pointer **#50** → **✅ MERGED (2026-08-10)**, canlıda silindi.
    Çatı pointer = backend main HEAD `152cf93` (doğrulandı). `VisibilityOptIn` şema kolonu **hâlâ
    duruyor** (DROP ayrı onaylı migration turu).

### 📜 SİLİNEN TARAF-2 NEYDİ? (arşiv-keşif — ürün sahibine sade özet)
- **Ne hayal ediyordu:** Gizlilik-önce (KVKK) bir *el sıkışma*. Menti bir mentöre "beni görebilir
  misin / profilimi sana açayım mı" **görünürlük talebi** gönderiyordu (`request-visibility`). Mentör
  bekleyen talepleri görüp **onaylıyor/reddediyordu** (`respond`). ONAY (`VisibilityOptIn=APPROVED`)
  gelmeden menti'nin profil detayları (ad, DISC, sektör) mentöre açılmıyor ve eşleşme isteği
  oluşturulamıyordu. "Taraf-2" = bu el sıkışmanın *menti-başlatan* yönü (Taraf-1 = mentör-başlatan,
  `setVisibilityOptIn` — hâlâ duruyor).
- **Neden ölü:** Aynı gün (2026-07-07) doğdu (`de6be04` 10:51) ve ~40 dk sonra (`99f68a1` 11:30
  "direct messaging … AI removed") eşleşme akışından **opt-in onay adımı kaldırıldı** — menti artık
  mentöre *doğrudan* talep/mesaj gönderiyor (bu, sonradan **chat**'e evrildi). El sıkışma kapısı
  atlandığı için Taraf-2 uçları hiçbir yerden çağrılmaz oldu.
- **Tek cümle:** *"Menti profilini mentöre açmak için önce izin isteyen bir onay-kapısıydı; ürün
  doğrudan-iletişim (sonra chat) modeline geçince gereksiz kaldı."*

### 🔨 YARIM ÖZELLİK İNŞA PLANI (2026-08-10 keşfi — İNŞA EDİLMEDİ, ürün sahibi onayında)
Mentör paneli (`frontend/src/app/(dashboard)/mentor/page.tsx`) iki placeholder içeriyor; veri kaynağı
keşfi yapıldı, çoğu **mevcut `Meeting` verisinden** gelebilir:

- **Mentör metrik kartları** (`mentor/page.tsx:31-36` `PLACEHOLDER_METRICS`):
  - *Bekleyen Talepler* → **veri HAZIR**: sayfa zaten `pendingMeetings` çekiyor (status=PENDING) →
    `.items.length` bas. **S** (sadece FE).
  - *Tamamlanan Toplantılar* → **veri HAZIR**: `Meeting` where mentorUserId=me & status=COMPLETED
    sayımı. `listMeetings` status filtresi var. **S** (FE'de mevcut endpoint'le, veya küçük count).
  - *Aktif Mentilerim* → **veri VAR (KISMİ)**: distinct menti (Meeting APPROVED/SCHEDULED/COMPLETED)
    veya aktif `Agreement`. **S/M** (agregasyon nerede: FE'de türet veya küçük endpoint).
  - *Ortalama NPS* → **veri KISMİ**: `Meeting.hasFeedback` + feedback (npsScore/starRating) var ama
    mentör-bazlı ortalama sorgusu **YOK** → küçük agregasyon endpoint gerekir. **M**.
  - **Öneri:** 4 metriği tek hafif endpoint'te topla — `GET /api/mentors/:mentorId/dashboard-metrics`
    (ownership guard `requireSelfOrAdmin`) → tek sorgu bloğu; FE'de placeholder yerine bas. Toplam **M**.
- **"Yaklaşan Toplantılar"** (`mentor/page.tsx:414-423` placeholder kart):
  - **veri HAZIR**: `Meeting` where mentorUserId=me & status∈{SCHEDULED,APPROVED} & startsAt≥now,
    `startsAt asc`. `listMeetings` (`meetingController.ts:152-177`) zaten status filtresi destekliyor →
    yeni endpoint **gerekmez**; FE `meetingsApi.list({status:'SCHEDULED'})` çağırıp render eder. **S**.

**Toplam:** Yaklaşan Toplantılar **S** (yeni endpoint yok) · Mentör metrikleri **M** (1 hafif
agregasyon endpoint + FE). İnşa ayrı tur; retention "mentör sevdirme" işiyle (kuyruk md.4) örtüşür.

---

## 🆕 GÜNCEL ÖNCELİK KUYRUĞU (2026-08-02 geç oturum)

> Aşağıdaki eski "İŞ 0–8" planının çoğu tamamlandı (mail, IDOR, timezone, foto). Bu kuyruk
> güncel önceliği yansıtır; öncelik sırasını ürün sahibi değiştirebilir. Eski plan referans olarak altta durur.

1. **MERGE TURU** — biriken tüm PR/commit'ler (#26–#32 + bugünküler: güvenlik, foto), CI yeşilse.
   - Submodule pointer sırası **kritik**: backend push → çatı `git add backend` → çatı commit → çatı push (ara commit yok).
   - **Merge kararı ürün sahibinde.** + **Dokploy foto volume ayarı bu turda** (persistent volume `/app/uploads` + `UPLOAD_DIR=/app/uploads` env + `NEXT_PUBLIC_API_URL` kontrolü).
2. **PROFİL-DÜZENLEME KEŞFİ (PLANLA)** — kullanıcı bilgilerini/fotosunu **kayıttan SONRA** güncelleyebiliyor mu, silebiliyor/ekleyebiliyor mu? Profil düzenleme sayfası var mı, eksik mi?
3. **KART + SAYFALAMA TASARIMI** — 06-tasarim-ux'taki kararlara göre. Backend **%90 hazır** (kart-havuz-backend-envanteri raporu). %UYUM İŞ 7'ye bağlı değil, bugünkü skorla çalışır.
4. **RETENTION TURU** (büyük; teknik + davranışsal) — 3 aşamalı:
   - a. **Keşif (PLANLA):** hesap/veri korunuyor mu; cleanup cron kimi siliyor; `lastLoginAt`/aktiflik verisi var mı; kullanıcıyı geri getiren ne var (bildirim/öğrenme/oyunlaştırma).
   - b. **Metrik belirleme (ürün sahibi kararı):** yönetici panelinde hangi anlamlı veriler.
   - c. **Uygulama — YÖNETİCİ İSTATİSTİK PANELİ:** önce özet sayı/grafik → tıklayınca alt kişiler (**drill-down**). Kişi-bazlı liste değil, anlamlı istatistik öncelik. + pasifi dürtme araçları.
   - ✅ **DURUM (2026-08-02): STK-yönetici dilimi BÜYÜK ÖLÇÜDE YAPILDI** — `lastLoginAt` temeli (`1895ca5`) + kaynayan-üye metrikleri (`e0edb4f`) + elle nudge (`465ae47`) + KPI drill-down (`b39b8bd`). Bkz. 09-DURUM retention bloğu.
   - 🟡 **KALAN (davranışsal + genişletme):** otomatik-nudge (KVKK/rıza — bkz. 08); mentör/menti "sevdirme" deneyimi (persona belgeleri); onboarding "aha"; görüşme sayıları/onboarding-% metrikleri; menti/mentör tarafı retention panelleri (şimdiki panel yönetici içindi).
   - **Referanslar — 3 persona belgesi (bu turun temeli):** menti/mentör/yönetici sevdirme belgeleri retention turunun temelidir; keşif + metrik + panel bunlardan türer:
     - docs/raporlar/menti-persona-ve-sevdirme-2026-08-02.md (talep tarafı — tutmak zor, kırılgan; bekleme anı riski)
     - docs/raporlar/mentor-persona-ve-sevdirme-2026-08-02.md (arz tarafı — en kıt kaynak; mentörü tutmak mentiden önce gelir)
     - docs/raporlar/yonetici-persona-ve-metrikler-2026-08-02.md (3 yönetici personası + 3 temel soru + metrik taslağı)
5. **PLATFORM ADMIN — ✅ TAMAM (strateji+kıyas+aksiyon).** Aksiyon turu bitti: KVKK audit izi + UserReport şikayet + basit otomatik tespit + sistem sağlığı paneli (bkz. 09-DURUM). 4-rol metodolojisinde sırada **mentör → menti** var.
   - 🟡 **Küçük yol notları (canlı-sonrası, acil değil):**
     - (a) `reviewedBy='platform-admin'` **sabit metin** — tek platform admin olduğu için şimdilik yeterli; çoklu platform admin gelirse gerçek kimlik yazılmalı.
     - (b) `GET /platform/user-reports` **200 tavanlı, sayfalama YOK** — şikayet sayısı büyürse gerçek sayfalama gerekir.
6. **HAYALET-BACKEND LİSTESİ** — hayalet-backend raporundaki bulguları tek tek bağla/sil/ertele (ürün sahibi ile birlikte karar).
7. **SEKTÖR SKORU = İŞ 7** (aşağıdaki eski plandaki İŞ 7 ile aynı) — 5-bileşenli `sector-scorer`'ı canlı yola bağla. **Canlı eşleşmeyi değiştirir → staging ŞART → staging sonrası.**
8. **MENTİ MENTÖR-TARAMA UX** — 100+ mentörlü tenant için gerçek arama/sayfalama (sinyal gelince; kart tasarımı bunu kısmen çözecek).

---

## 🔄 ŞU AN ÜZERİNDE (devam eden — bitmeden diğerlerine geçme)

### İŞ 0 — MAIL ALTYAPISI (Resend + domain + bounce guard) — BAŞLADI
- **Ne:** Gmail App Password 20 Tem'den beri iptal → mail akışı kırık. Resend'e geçiş +
  `noreply@sivilkapasite.org` + `@test.local` bounce guard + hata loglama.
- **Mod:** BYPASS (kod), PR aç MERGE ETME. Kod ↔ DNS paralel iki kol.
- **Claude kolu:** kod PR'ı (`fix/mail-infrastructure`).
- **Senin manuel adımların:** Resend hesabı → sivilkapasite.org ekle → Hostinger DNS'e
  SPF/DKIM/DMARC → verify → API key → env'e koy.
- **Bitince:** uçtan uca gerçek mail testi (kendi adresine gelir, @test.local'e gitmez) → onayınla merge.
- **⚠️ Bu iş forgot-password'ı GERÇEKTEN tamamlar** (sayfa var ama mail gitmiyor).

---

## 🧹 İŞ 1 — ORTAM TEMİZLİĞİ (mail biter bitmez, KISA)
- **Ne:** Bugünkü işlerden kalan artıkları topla.
- **Mod:** BYPASS (temizlik). Silmeden önce "merged mi" teyidi.
- **Kapsam:**
  - Worktree'ler: `cati-lj`, `backend-testfix` (merge oldu → sil).
  - Temp scriptler: `backend/scripts/gen-reset-link.mjs`, `check-*.mjs`.
  - Merge olmuş branch'ler (local+remote, önce `git branch --merged` teyidi):
    - çatı: `fix/forgot-password-page`, `feat/learning-journey` (+ mail branch merge olduysa)
    - backend: `fix/test-db-isolation`, `feat/learning-journey`
  - Arka plan server'lar (:3000, :3001) + monitor → durdur.
  - Canlı checkout'ları temiz `main`'e al.
- **Neden önce bu:** Temiz ortamla başla; birikmiş worktree/branch submodule pointer'ı karıştırmasın.
- **Bağımlılık:** Mail merge/kapanmadan bazı branch'ler silinmemeli → mail'den sonra.

---

## 🗄️ İŞ 2 — İZOLE TEST DB (TEST_DATABASE_URL) (temizlikten sonra, KISA)
- **Ne:** DB fix guard'ı var ama izole test DB yok → lokal `npm run verify` guard'la DURUYOR.
  Neon'da ayrı test branch bağlanacak.
- **Mod:** BYPASS (config) + senin Neon adımını bekle.
- **Senin manuel adımın:** Neon Console → Branches → New branch ("test") → connection string →
  `.env.test`'e `TEST_DATABASE_URL` (prod'dan FARKLI olmalı).
- **Claude kolu:** guard/config doğrula → izole DB'de tam verify koş → yeşil teyidi.
- **Neden burada:** Küçük iş, yüksek fayda. İŞ 5 (staging) için Neon-branch provası.
- **Bağımlılık:** Bağımsız ama staging'den (İŞ 5) önce yapılmalı.

---

## 📬 İŞ 3 — ONAY PANELİ TAMAMLAMA (bildirim maili + destek@ + prod admin)
- **Ne:** Keşifte çıkan onay paneli eksikleri. Panel çalışıyor AMA:
  1. Kurum onaylanınca/reddedilince başvurana BİLDİRİM GİTMİYOR (sessiz) → asimetri.
  2. `destek@mentimentor.io` placeholder (domain sivilkapasite.org) → yazan ulaşamaz.
  3. Prod'da `PLATFORM_ADMIN_EMAIL` yok → `admin@platform.local` ile giriliyor.
- **Mod:** BYPASS (kod), PR aç MERGE ETME.
- **Kapsam kararları (kullanıcı, iş başlamadan):** onay/ret bildirim maili? ret gerekçesi iletilsin mi?
  destek@ gerçek kutuya mı bağlansın?
- **Senin manuel adımın (varsa):** destek@ için gerçek mailbox; prod env'e `PLATFORM_ADMIN_EMAIL`.
- **Bağımlılık:** İŞ 0'a BAĞLI (bildirim maili çalışan mail altyapısı ister) → mail'den sonra.

---

## 🌱 İŞ 4 — ÖĞRENME YOLCULUĞU: KALAN AÇIK UÇLAR
- **Ne:** Kod merge edildi ama açık:
  - DISC + yolculuk düzenleme KEŞFİ (DISC sorularının tonu + STK düzenleme mimarisi).
  - İçerik kesin onayı (küçük yazım düzeltmeleri: menti Aşama 1 "Bu t," kesik).
  - Canlıda/staging'de uçtan uca test.
- **Mod:** Önce PLAN (keşif), sonra BYPASS (düzeltmeler).
- **Bağımlılık:** Uçtan uca test için staging (İŞ 5) veya en az izole test DB (İŞ 2) faydalı.
  Keşif kısmı bağımsız.

---

## 🏗️ İŞ 5 — STAGING ORTAMI (en büyük, en çok manuel adım)
- **Ne:** Canlının kopyası ama AYRI DB olan test ortamı.
  `staging.sivilkapasite.org` + ayrı Neon branch + Dokploy 2. app.
- **Mod:** BYPASS (kod: env ayrımı, config) + çok sayıda senin manuel adımın.
- **Senin manuel adımların:** Neon'da staging branch (test'ten AYRI); Dokploy 2. uygulama;
  subdomain + SSL; OAuth/SMTP staging callback ve env'leri.
- **Claude kolu:** `.env.compose.staging` + config env ayrımı.
- **Neden EN SON:** En büyük iş, en çok hosting/DNS adımı sende; riskli (yanlış DATABASE_URL
  prod'u etkileyebilir).
- **Bağımlılık:** İŞ 2 provası burada işe yarar; İŞ 0 (mail) staging'de de gerekli.

---

## 🎨 İŞ 6 — LANDING UX İYİLEŞTİRME PAKETİ (staging'de test et)
- **Öncelikli (güven zedeleyen):**
  - Tooltip kayboluyor (kaynak linkleri tıklanamıyor) → hover köprüsü + sabitle.
  - Sıfır etikette sıfır-olmayan skor (%52/%68) → çelişki; demo olduğu belli olsun.
  - "i" ikonu keşfedilebilir değil → kontrast + hafif ipucu.
- **Orta:** düşük kontrastlı gri metinler (WCAG); mobil deneyim testi.
- **Ekle:** alan-özel hata mesajları (Ad Soyad <3 → genel değil, alan-özel).
- **Mod:** BYPASS (frontend), PR aç MERGE ETME.
- **Bağımlılık:** Staging'de test ideal ama şart değil.

---

## 📊 İŞ 7 — AŞAMA 2: ÇOK-EKSENLİ SKORLAMA
- **Ne:** Uyuyan `sector-scorer.service.ts` (5 bileşen) canlıya bağlanacak.
  `rank-mentors → resolveSectorScore`; SECTORS↔IndustryNode eşlemesi; testler.
- **Mod:** Önce PLAN, sonra BYPASS.
- **Bağımlılık:** Canlı eşleşme davranışını değiştirir → staging'de test ŞART → staging'den sonra.

---

## 🔀 İŞ 8 — AŞAMA 3/4: EŞLEŞTİRMEYİ BİRLEŞTİR + TEMİZLİK
- **Ne:** İki paralel skorlama sistemini tek yap. 3a/3b kararı bekliyor.
- **Mod:** PLAN → karar → BYPASS.
- **Bağımlılık:** İŞ 7'den sonra. En riskli → staging şart.

---

## 🧩 BAĞIMSIZ / SIRA-SERBEST İŞLER (araya sığar, aciliyet düşük)
- Depoları PRIVATE yap (GitHub Settings → Danger Zone — kullanıcı yapar).
- STK → platform öneri/talep kanalı (form → platform admin).
- Profil/tanıtım sayfası (eşleşenler okul/bölüm görsün).
- Gerçek STK logo şeridi.
- Panel açık/koyu tema toggle.
- STK sayfa özelleştirmesi → ŞİMDİ YAPILMIYOR (gerçek talep gelince).

---

## 🗺️ ÖZET SIRA (neden bu sıra)
```
0. MAIL (devam) ──────────► forgot-password'ı gerçekten bitirir; İŞ 3 buna bağlı.
1. TEMİZLİK ──────────────► masayı topla, mail branch'i de kapansın.
2. İZOLE TEST DB ─────────► verify güvenli koşsun; staging provası.
3. ONAY PANELİ TAMAMLAMA ─► mail altyapısı (0) hazır olunca bildirim eklenebilir.
4. ÖĞRENME YOLCULUĞU uçları► keşif + küçük düzeltmeler; test için 2/5 faydalı.
5. STAGING ───────────────► en büyük manuel iş; canlı-riskli işlerin test zemini.
6. LANDING UX ────────────► staging'de test; güven zedeleyen hatalar.
7. ÇOK-EKSENLİ SKORLAMA ──► canlı eşleşme değişir → staging ŞART.
8. EŞLEŞTİRME BİRLEŞTİR ──► en riskli; en sona, staging'de.
   (Bağımsız işler herhangi bir araya sığar.)
```

**Temel mantık:** Önce KIRIK olanı düzelt (mail) → ORTAMI topla (temizlik + test DB) →
ÜRÜNÜ çalışır yap (onay paneli) → TEST ZEMİNİ kur (staging) → en son CANLI-RİSKLİ
değişiklikleri staging'de yap (skorlama, birleştirme). Canlı davranışı değiştiren her iş
staging'den sonra. Manuel adımı çok olan büyük işler küçük kod işlerinden sonra.

---

## 📌 HER İŞTE UYGULANACAK SABİT KURALLAR
- Mod bildirimi: keşif→PLAN, kod+"merge etme"→BYPASS, merge/silme→MANUEL ONAY.
- Güvenlik ağı: uzun otonom işlerde "PR aç, MERGE ETME" → kullanıcı en sonda inceler.
- Submodule sırası: backend PR → çatı pointer → çatı PR (ara commit yok).
- Neon migration: `IF NOT EXISTS` + `db execute` + `migrate resolve`. `db push` YASAK.
- Test güvenliği: `TEST_DATABASE_URL` yoksa testler gerçek Neon'a truncate atmaz (guard).
- Bağımsız işler paralel alt-agent (tek oturum); bağımlı/şüphede sıralı. Ayrı terminal YOK.
- Temiz kod: sabitler config'te, açık isim, DRY, katman ayrımı, mevcut stile uy.
- Dürüstlük: uydurma yok; canlıda AI/token maliyeti yok; içerik statik.
- Ürün vizyonu (senaryo/içerik) AI tek başına UYDURMAZ; kullanıcı sağlar/onaylar.
