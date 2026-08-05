# 09 — GÜNCEL DURUM (ŞU AN NEREDEYİZ)
**Son güncelleme:** 2026-08-05 (GÜVENLİK TURU: PR #30 MERGED + temizlik PR #31 hazır) · Bu belge SIK güncellenir — her oturum başında oku, sonunda güncelle.

## 📌 AÇIK İŞLER (ürün sahibi elinde — kaybolmasın)

### ⏳ FOTO VOLUME DOĞRULAMA — ERTELENDİ (ürün sahibi hazır olduğunda)
Dokploy'da `UPLOAD_DIR=/app/uploads` + volume panelden eklendi ama **canlıda doğrulanmadı**.
Test adımları (`docs/kararlar/dokploy-foto-volume-talimati.md`'de detaylı):
1. Backend deploy 'done' (yeşil) mi kontrol et.
2. Uygulamada bir profil fotosu yükle → görünüyor mu.
3. Backend'i **Redeploy** et.
4. Redeploy sonrası foto **HÂLÂ duruyor mu** → duruyorsa volume çalışıyor. ✅

Foto yüklenmiyor/görünmüyor/kayboluyorsa: muhtemelen **uid 1001 yazma izni** sorunu →
ayrı ele alınır. Bu iş canlıyı **bloklamaz** (henüz gerçek foto yok); aciliyet düşük ama
**gerçek foto yüklemeye başlamadan ÖNCE tamamlanmalı.**

### 🟢 PR #31 MERGE KARARI — ürün sahibinde
Temizlik turu (O1-O4) hazır, CI yeşil. Merge edilirse çatı pointer'ı yine hizalanmalı (aşağı bak).

## 🔒 GÜVENLİK TURU KAPANDI (2026-08-05)
**PR #30 canlıya alındı, denetimin kalan maddeleri (O1-O4) temizlik PR'ında hazır. Güvenlik açısından bekleyen fonksiyonel açık kalmadı.**
- **PR #30 MERGED** (backend). Yeni **backend main HEAD `3f67024`** (merge-commit). Analytics IDOR (ham DISC PII) + meeting ownership + password-reset rate-limit → **canlıda**. Main CI ✅. Autodeploy tetiklendi → **ürün sahibi backend canlı deploy'unu doğrulamalı** (Dokploy erişimi ajanda yok).
- **Çatı pointer hizalandı** (PR #34 MERGED): yeni **çatı main HEAD `d3505f9`**, backend pointer **`3f67024`** (backend main ile hizalı). İki repo senkron. Frontend autodeploy no-op (fonksiyonel değişiklik yok).
- **Temizlik turu → PR #31 HAZIR** (backend `chore/security-cleanup`, CI ✅, **merge PO'da**): güvenlik denetiminin kalan 🟡 maddeleri:
  - **O1** — 4 public endpoint'e IP-bazlı rate-limit (loginRateLimiter deseni, env-ayarlanabilir): `POST /auth/register` (10/dk), `POST /suspicion-reports` (5/dk), `GET /invitations/:token/join` (20/dk — kampüs NAT toplu katılımı için makul; imzalı JWT'de brute-force zaten infeasible), `GET /tenants/self-serve/check-slug` (30/dk). Test: register + invitation-join.
  - **O2** — `listUsers` (menti mentör-tarama) over-fetch: `email` + serbest-metin `bio/expertise/target` peer'a dönmüyor (kart yalnız fullName/discType/sectorTags/avatar kullanıyor — doğrulandı). Admin havuzu farklı endpoint, etkilenmez.
  - **O3** — createUser/updateUser JSON alanları (`temperament/volunteer/pastProjects/education`) `z.any()` → `boundedJson` 20KB cap (JSON bomba koruması).
  - **O4** — createUser response explicit select (ham obje `password/discVector/selfProfile` sızdırmıyordu → güvenli subset).
  - **O5 (strateji doğrulama turunda bulundu, PR #31'e eklendi)** — **onaysız mentör havuz sızıntısı kapatıldı**: `GET /api/users` (menti mentör-tarama) approvalStatus filtrelemiyordu → PENDING mentör menti havuzunda görünüp talep alabiliyordu. `listUsers` where'ine `approvalStatus:'APPROVED'` eklendi (rol-bağımsız; mentör→menti yönü zaten filtreliydi). Admin ayrı endpoint, etkilenmez. Test: `listusers-approval-filter.test.ts`. Commit `be295e2`, CI ✅.
- **Atlanan (bilinçli, 09'a not):** 🟢 düşük tutarlılık maddeleri (adminSettings desen tutarlılığı, admin over-fetch) — fonksiyonel güvenlik değil → **gelecek tidiness turu**.
- **Kalan sıradaki:** (1) **Foto volume doğrulama** (PO, Dokploy — tek açık teknik doğrulama; PARALEL, ajan işine dokunmaz) · (2) **dijital ayak izi temizliği** · (3) mentör/menti mevcut-kıyas (4-rol metodolojisi).

## 🚀 MERGE TURU TAMAMLANDI (2026-08-05)
**Biriken TÜM iş iki repoda main'e merge edildi; iki main CI de YEŞİL. Bekleyen birikim = SIFIR.**
- **Backend** (menti-mentor) PR #26 → main. Yeni main HEAD **`dacc171`** (merge-commit). Main CI ✅.
- **Çatı** (menti-mentor-v2) PR #32 → main; sonra pointer hizalama PR #33 → main. Güncel çatı main HEAD **`962889c`**; backend pointer **`975c03f`** (backend main HEAD'ine hizalı). Main CI ✅.
- **getUser IDOR fix** (`a0e1a69`): ham DISC vektörü/PII yalnızca self/admin — tenant-içi sızıntı kapandı.
- **PR #29 MERGED (backend main `975c03f`):** PR #27'nin main'de eksik iki parçası — **`/users/:userId/clubs` IDOR kapısı** (`requireSelfOrAdmin`) + **login brute-force rate-limit** (`loginRateLimiter`, 10/dk/IP) — canlıda. getUser-403 + f11134e bilinçli atlandı (field-strip zaten var). Çatı pointer PR #33 ile `975c03f`'ye hizalandı (çatı main `962889c`), frontend autodeploy no-op tetiklendi.
- **PR #28 incelendi:** iyi huylu bakım işi (backend pointer→`b313601` + `PLATFORM_ADMIN_EMAIL` env passthrough), ürün sahibinin kendi hesabından; `a0e1a69` onu kapsıyor → **iş/veri kaybı yok, süreç ihlali yok**.
- **Çatı merge yöntemi:** rebase, commit'lenmemiş `PROJECT_STATUS.md` yüzünden engellendi → **merge** ile çözüldü (tek pointer çakışması `a0e1a69` tutularak; force-push yok; `PROJECT_STATUS.md`'ye dokunulmadı).
- **⚠️ Foto volume (AÇIK — ürün sahibi doğrulamalı):** merge autodeploy'u tetikledi. Dokploy'da `UPLOAD_DIR=/app/uploads` + `/app/uploads` kalıcı volume aktifleşmeli. Panel erişimi olmadığından doğrulanamadı. Doğrulama: foto yükle → redeploy → **duruyor mu**. Talimat: `docs/kararlar/dokploy-foto-volume-talimati.md`. Foto sorunu merge'i geri aldırmaz, ayrı ele alınır (uid 1001 yazma izni olabilir).

**Sıradaki (öncelik):** (1) **Foto volume doğrulama** (ürün sahibi, Dokploy — tek açık teknik doğrulama) · (2) ~~login rate-limit / clubs IDOR~~ ✅ **PR #29 MERGED (canlıda)** · (3) ~~kapsamlı güvenlik denetimi~~ ✅ **PR #30 MERGED (canlıda)**: analytics IDOR (ham DISC PII) + meeting ownership + password-reset rate-limit · (3b) ~~denetimin kalan 🟡'leri (listUsers over-fetch, JSON `z.any()` cap, public IP-limit)~~ ✅ **TEMİZLİK TURU → PR #31 HAZIR** (O1-O4, CI yeşil, merge PO'da) · (4) **dijital ayak izi temizliği** · (5) mentör/menti mevcut-kıyas.

## 🧭 SON DURUM ÖZETİ (DEVİR)
**Bitenler (hepsi MERGE EDİLDİ — main'de/canlıda):** güvenlik (2 IDOR + timezone + **getUser IDOR fix**) · kapasite (sayfalama) · **fotoğraf altyapısı** · **STK yönetici retention/aktivite turu** (lastLoginAt + kaynayan-üye metrikleri + nudge + drill-down) · **Platform admin turu** (KVKK audit izi + UserReport şikayet + basit otomatik tespit + sistem sağlığı paneli).

**4-rol metodolojisi (strateji→kıyas→aksiyon):** STK yönetici ✅ (strateji+kıyas+aksiyon TAMAM) · **Platform admin ✅ (strateji+kıyas+aksiyon TAMAM)** · Mentör ⬜ · Menti ⬜.

**Sıradakiler:** (1) **Foto volume doğrulama** (ürün sahibi, Dokploy) · (2) **login rate-limit** (PR #27 kalanı) · (3) **kapsamlı güvenlik denetimi** · (4) **dijital ayak izi temizliği** · (5) mentör/menti kıyas · (6) hayalet-mod/davet turu.

**🔴 KIRMIZI KURALLAR:** Canlı = lokal aynı Neon → DB işleminde onay al · main'e merge = canlıya deploy (autodeploy açık) → merge kararı Zahid'de · tehlikeli seed asla · PR aç merge etme · submodule sırası: backend push → çatı pointer → çatı push (ara commit yok).

## ⚡ TEK BAKIŞTA
- **Canlı:** sivilkapasite.org ayakta (Dokploy). Mail (Resend) çalışıyor.
- **DB:** Canlı = lokal aynı Neon. DISC soruları (20) + öğrenme aşamaları (13) yüklendi. **`lastLoginAt` alanı eklendi (migration uygulandı).**
- **Açık PR'lar:** #26 + #32 MERGE EDİLDİ (2026-08-05). Backend main `dacc171`, çatı main `5dfe539`. Bekleyen birikim = SIFIR. (#27 login rate-limit hâlâ açık.)
- **Bugün kapandı:** **MERGE TURU** — tüm birikim (güvenlik+foto+retention+platform admin+getUser IDOR fix) main'de/canlıda, iki main CI yeşil.
- **Sıradaki:** foto volume doğrulama (Dokploy) → login rate-limit → kapsamlı güvenlik denetimi → dijital ayak izi temizliği → mentör/menti kıyas.
- **Açık kararlar:** tema DISC renk (light) + kart DISC gösterim biçimi + foto ne zaman zorunlu + **otomatik-nudge KVKK/rıza** (bkz. 08).

## ✅ SON YAPILANLAR (2026-08-02 — PLATFORM ADMIN TURU: audit + şikayet + sağlık)
> Hepsi commit'li, **HİÇBİRİ merge edilmedi** (çatı `feat/light-theme`, backend `feat/platform-panel-deep`).
> Temeli: platform admin envanterindeki 3 kritik eksik (bkz. docs/raporlar/platform-admin-panel-envanteri).

**İŞ 1 — KVKK erişim loglama (backend `8eb1614`, frontend `36a8bd9`) — MIGRATION YOK:**
- Mevcut `SystemLog` AUDIT deseni yeniden kullanıldı (yeni tablo yok). `platformAudit.ts → auditPlatformAction()`.
- Tüm hassas platform aksiyonları loglanıyor (approve/reject/freeze/activate/review + drill-down). Sadece "ne yapıldı" (action+hedef ID+IP) — DISC/PII değeri ASLA. Panelde "Denetim İzi (AUDIT)" filtresi.

**İŞ 2 — Kullanıcı şikayeti + otomatik tespit (backend `7cfc8d5`, frontend `59a2abe`) — MIGRATION `20260805010000_add_user_report` (onaylı uygulandı, additive):**
- `UserReport` modeli + `POST /users/:id/report` (tenant izolasyonu + self/spam engeli). Tenant admin `/admin/reports`, platform `/platform/user-reports`.
- Basit otomatik tespit v1 (`abuseDetection.service.ts`): çok şikayet alan (≥2) + çok reddedilen talep (≥3). Ağır ML yok.
- Frontend: `ReportUserButton` (menti/mentör kartları) + platform "Kullanıcı Şikayetleri" sekmesi (şikayet + anomali).

**İŞ 3 — Sistem sağlığı paneli (backend `528502b`, frontend `8c0d469`) — MIGRATION YOK:**
- `/api/platform/health` genişletildi: mail (SMTP config) durumu + son 24s kritik hata sayısı. Frontend: yeşil/kırmızı özet (DB/mail/hata/uptime) + logs "Hatalar" (ERROR) filtresi.

**⚠️ Yol notları:** reviewedBy='platform-admin' sabit (çoklu platform admin olursa gerçek kimlik yazılmalı); user-reports 200 tavanlı, sayfalama yok (canlı-sonrası). Platform strateji dosyası (platform-admin-strateji.md) projede YOK — üretilmemiş.

## ✅ SON YAPILANLAR (2026-08-02 — STK YÖNETİCİ RETENTION/AKTİVİTE TURU)
> Hepsi commit'li, **HİÇBİRİ merge edilmedi** (çatı `feat/light-theme`, backend `feat/platform-panel-deep`).
> Temeli: STK yönetici envanterindeki 5 eksik (bkz. docs/raporlar/stk-yonetici-panel-envanteri).

**1. `lastLoginAt` / aktivite altyapısı — RETENTION TEMELİ (backend `1895ca5`):**
- `User.lastLoginAt DateTime?` eklendi. **MIGRATION Zahid onayıyla canlı Neon'a uygulandı** (nullable, veri kaybı yok, `IF NOT EXISTS`).
- Yeniden kullanılabilir `recordUserActivity(userId)` (non-fatal) 3 auth noktasına bağlandı: local login, token refresh, OAuth. "Login değil aktivite" — refresh'te de tazelenir (uzun oturum yanlış pasif görünmesin).
- ⚠️ Bu alan **platform admin panelini de besleyecek** (ortak veri — iki kez yazılmasın).

**2. "Kimse kaynıyor mu" metrikleri (backend `e0edb4f`):**
- `GET /api/admin/health-metrics` + `retentionMetrics.service.ts`: mentörsüz menti, ölü eşleşme (onaylı opt-in ama hiç görüşme), pasif üye (lastLoginAt eşiği, default 30g), arz-talep dengesi. Eşikler query ile ayarlanabilir.
- **Tenant izolasyonu korundu** (her sorgu tenantId). PII: sadece ad/rol/zaman — ham discVector/email DÖNMEZ.

**3. Nudge / dürtme (backend `465ae47`):**
- `POST /api/admin/users/:id/nudge` — yönetici elle re-engagement. Mevcut mail altyapısı (Resend/SMTP) kullanıldı.
- **Spam limiti 24s** (SystemLog'dan kontrol) + **denetim logu** (AUDIT, sadece ID — PII yok).
- **Otomatik dürtme YAPILMADI:** cron altyapısı var AMA pasif üyelere otomatik toplu mail = istenmeden re-engagement (KVKK/rıza) → "riskli durumda dur" gereği bağlanmadı; rıza/opt-out tasarımıyla ayrı iş olarak NOT düşüldü (bkz. 08 açık soru).

**4. KPI drill-down + Hatırlat butonu (çatı `b39b8bd`):**
- `/admin/kpi`'ye `ProgramHealthSection`: özet sayıya tıkla → o gruptaki kişiler. Pasif üye + ölü eşleşme satırlarında "Hatırlat" (nudge) butonu (durum + 429 gösterimi), "+N daha" truncation.

**5. Katılım modeli — SADECE KEŞİF/NOT (çatı `e5c738a`, kod yazılmadı):**
- Not: docs/raporlar/katilim-modeli-mevcut-durum-notu-2026-08-02.md. Mevcut: ✅ ön-tanımlı davet mesajı (InvitationTemplate) + ✅ imzalı-token davet linki + ✅ admin elle üye ekleme. ❌ "Hayalet mod" (kişi katılmadan pasif hesap + sonra aktive) YOK, ❌ toplu davet YOK → ayrı tur.

## ✅ SON YAPILANLAR (2026-08-02 — GEÇ OTURUM: güvenlik + foto + kararlar)
> Hepsi commit'li, **HİÇBİRİ merge edilmedi** (branch'ler: çatı `feat/light-theme`, backend `feat/platform-panel-deep`).

**Güvenlik / bug:**
- 2 IDOR açığı kapatıldı (`/mentors/:id/candidates` + `/requests/:id`) — backend `161ae00`.
- bookMeeting timezone bug'ı (UTC/Europe-Istanbul) düzeltildi — backend `6a30f21`.

**Kapasite / UX:**
- `listUsers` sayfalama eklendi (kapasite darboğazı; gerçek sayfasız endpoint `/api/users`, tüketici menti mentör-tarama; şimdi `pageSize=100`) — backend `909c065` + frontend `60eb64f`.
- D21: admin/platform nav'a tema toggle butonu — frontend `188aad5`.

**Dokümantasyon / temizlik:**
- docs/ klasör düzeni + `06-tasarim-ux.md` geri eklendi; CLAUDE.md'ye "CANLI=LOKAL DB" uyarısı + "Proje Hafızası" haritası — `81d718c`.
- Kök "Menti Mentör proje/" boş klasörü + kök 06 kopyası silindi.
- 5 keşif raporu (docs/raporlar/): depo-denetimi, kapasite-analizi, hayalet-backend, tema-durum-ve-landing-maliyeti, **kart-havuz-backend-envanteri** (`e0608a4`).

**🖼️ FOTOĞRAF ALTYAPISI (bugünkü son iş — tamamlandı):**
- **Backend** (`3bee4ba`, `27cc788`, `1ab33cb`): `POST /api/users/me/avatar` — multer + magic-byte içerik doğrulaması (jpeg/png/webp, SVG red) + 5MB sınırı + kullanıcı-başı rate limit + güvenli rastgele isim (path traversal yok) + eski foto silme + `/uploads` statik güvenli servis (nosniff/CSP sandbox). `avatarUrl` havuz/aday/getUser select'lerine eklendi.
- **Frontend** (`278c142`, `26687cd`): `UserAvatar` atom (foto yoksa baş-harf fallback) + profil sayfası yükleme + 3 havuz kartında gösterim + apiClient FormData desteği + next.config remotePatterns.
- **Depolama:** KALICI DİSK (Dokploy persistent volume). Foto **OPSİYONEL** (ileride zorunlu).
- **⚠️ Dokploy'da yapılacak (Zahid):** persistent volume mount `/app/uploads` + `UPLOAD_DIR=/app/uploads` env + `NEXT_PUBLIC_API_URL` kontrolü.

**Bugünkü ürün kararları:** kart tasarımı + mesajlaşma (yok, niyet mektubu) + tema/landing (canlı-sonrası) → **06-tasarim-ux**'a; yeni öncelik kuyruğu → **10-yol-haritasi**'na; yeni açık sorular → **08**'e işlendi.

## ✅ SON YAPILANLAR (2026-08-02 — ERKEN OTURUM)
- Çöken mentör/menti dashboard düzeltildi (DailyQuestionWidget). Commit cfda33c.
- Kapsamlı teşhis → docs/teshis-raporu-2026-08-02.md.
- Admin panelleri tasarım keşfi → docs/admin-panelleri-tasarim-2026-08-02.md.
- Çıkış butonu (B11) + anlamlı hata mesajları (B14). Commit a606bab.
- 5 admin paneli kodlandı (mentör/menti havuzu, sertifika sonuç, eşleşme, branding).
- Global içerik seed (DISC 20 + aşama 13) ana Neon'a. Mevcut veri sabit.
- Hafıza sistemi kuruldu (bu docs/ belgeleri).

## 📂 AÇIK PR'LAR (hiçbiri MERGE EDİLMEDİ)
- **PR #32** (feat/light-theme): tema altyapısı + dashboard fix + çıkış butonu + hata mesajları + 5 admin paneli (frontend).
- **PR #26** (feat/platform-panel-deep, backend): panel derin görünüm + yeni admin endpoint'leri (eşleşme/sertifika — 08-02'de eklendi).
- **PR #29** (frontend panel derin görünüm — mail/panel chat'inden).
- **PR #27/#28** (güvenlik paketi), **PR #30** (UX), **PR #31** (CLAUDE.md).
- Merge runbook: teshis-raporu'nda. Sıra: backend PR → çatı pointer bump → çatı PR. b3 membership backfill dikkat.

## ⏳ BEKLEYEN İŞLER (öncelik Zahid'de)

### 🔴 Canlı-öncesi kritik
- ~~2 yeni IDOR fix (/mentors/:mentorId/candidates + /requests/:id).~~ ✅ YAPILDI (backend `161ae00`).
- KVKK blocker'ları (privacy center, DISC rıza, 18+ — açık sorulara bağlı, bkz. 08).
- Sunucu/altyapı güvenliği (Dokploy HTTP+açık, firewall, SSH, SSL) — hiç ele alınmadı.
- Arkadaşın başvurusu — gerçek kişi bekliyor.

### 🟡 Kullanılabilirlik / özellik
- B10 cache turu (yavaşlık) — karar verildi, ayrı dikkatli tur.
- Admin panellerini tarayıcıda gez + onayla (kodlandı ama görülmedi).
- A8 DISC görüntüleme + oyunlaştırma teyidi (seed geldi, kullanıcı bakacak).
- Yöneticilik akışı (A9) — yeniden kurgu, kod öncesi kullanıcıya sorulacak.
- Geri bildirim mekanizması (mail ile).

### 🟡 Tasarım / UX
- Tema bitirme: D21 toggle admin'e + D22 DISC renk kontrast + D23 rozetler. DISC renk TON kararı kullanıcı gözünden bekliyor.
- Landing slogan uygulama + Landing UX paketi.
- Sol menü tipografi, açıklama metinleri, dropdown Türkçeleştirme.

### 🟡 Algoritma (psikometri chat'inden yarım kalanlar)
- Sektör skoru kodu (sectorScoreResolver) — reçete var, kod stub (nötr 50 dönüyor). **= İŞ 7** (staging sonrası; canlı eşleşmeyi değiştirir). Kart %UYUM'u buna BAĞLI DEĞİL — bugünkü skorla çalışır.
- UserProfile sektör alanları migration + IndustryNode ağacı.
- Tenant plan/limit altyapısı (freemium için).
- ~~timezone bug düzeltmesi (bookMeeting).~~ ✅ YAPILDI (backend `6a30f21`).

## 📌 KALICI HATIRLATMALAR
- Canlı = lokal aynı DB → DB işleminde onay al (detay: 02).
- Tehlikeli seed.ts asla çalıştırma (detay: 02).
- PR aç, merge etme (Zahid inceler).
- Ürün kararı Zahid'de, dürüst pushback yap.

## GÜNCELLEME NOTU
Bu belge her oturum sonunda güncellenmeli. Karara bağlanan açık sorular 08'den ilgili belgeye taşınmalı.
