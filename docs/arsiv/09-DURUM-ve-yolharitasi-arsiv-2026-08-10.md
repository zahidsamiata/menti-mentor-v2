# ARŞİV — 09-DURUM.md + 10-yol-haritasi.md (2026-08-10 öncesi tam kopya)
**📸 DONDURULMUŞ (2026-08-10)** — tarihsel arşiv, güncellenmez.

> ⚠️ Bu dosya, `09-DURUM.md` ve `10-yol-haritasi.md`'nin 2026-08-10 belge-temizliği ÖNCESİ tam
> hâlidir. Katman katman büyümüş, eskimiş/çözülmüş/çelişkili bloklar içerir — **GÜNCEL DEĞİLDİR**,
> yalnızca tarihsel kayıt için tutulur. Neyin neden değiştiği: `docs/kararlar/belge-denetimi-2026-08-10.md`.
> **Güncel durum:** `docs/kararlar/09-DURUM.md` · **Güncel yol haritası:** `docs/kararlar/10-yol-haritasi.md`.

---

# ═══════════ ARŞİV: 09-DURUM.md (2026-08-10 öncesi) ═══════════

# 09 — GÜNCEL DURUM (ŞU AN NEREDEYİZ)
**Son güncelleme:** 2026-08-10 (MENTÖR PANELİ TAM CANLIDA + Taraf-2 ölü kod silindi + unutulmuş-niyet envanteri #54; backend main HEAD `afc2769`, pointer senkron → aşağıdaki ⚠️ GÜNCELLEME) · Bu belge SIK güncellenir — her oturum başında oku, sonunda güncelle.

> ⚠️ **GÜNCELLEME (2026-08-10) — MENTÖR PANELİ TAM CANLIDA + ölü kod silindi + niyet envanteri:**
> Bu oturumda merge edilen işler (hepsi canlıda, iki repo main CI ✅, açık PR = SIFIR):
> - **MENTÖR PANELİ TAM CANLIDA:** metrik endpoint `GET /api/mentors/:mentorId/dashboard-metrics`
>   (backend **#36**, IDOR korumalı `requireSelfOrAdmin` — salt-okuma, yeni tablo/kolon YOK) +
>   metrik FE (çatı **#52**) + **Yaklaşan Toplantılar** (çatı **#51**, FE-only). Panel artık placeholder
>   yerine gerçek metrik (aktif menti · bekleyen · tamamlanan · ortalama NPS) + yaklaşan onaylı toplantı gösteriyor.
>   - #51↔#52 `mentor/page.tsx` çakışması "iki sorgu bloğunu da tut" ile çözüldü (deterministik).
> - **ÖLÜ KOD SİLİNDİ — menti-driven görünürlük talebi (Taraf-2):** `mentiRequestController.ts` (3 handler) +
>   `userRoutes` 3 rota (backend **#35** + çatı pointer **#50**). 0 frontend/0 test/0 iç çağrı; opt-in gate
>   eşleşme akışından zaten kaldırılmıştı (`requestController.ts:17`). **`VisibilityOptIn` ŞEMA kolonu HÂLÂ
>   DURUYOR** (DROP ayrı, PO-onaylı migration turu).
> - **UNUTULMUŞ-NİYET ENVANTERİ:** `docs/kararlar/unutulmus-niyet-envanteri-2026-08-10.md` (**#54 MERGED**).
>   4 kaynaktan (belge/kod/yarım-özellik/strateji) kanıtlı; kritik K1–K7 (KVKK yasal + OAuth consent + güvenlik).
> - **Pointer:** backend main HEAD **`afc2769`** = çatı main submodule pointer (doğrulandı, senkron).
> - **Bu turda DB'ye/şemaya DOKUNULMADI.** Kalan: aşağıdaki ⏳ bekleyen (ürün sahibi manuel testleri).
>
> **⏳ BEKLEYEN (ürün sahibi elinde — kod değil, kaybolmasın):**
> - Canlı **chat uçtan uca testi** (menti→mentör ilk mesaj · thread · çan rozeti · okundu).
> - **Foto volume doğrulama** (Dokploy redeploy sonrası kalıcılık — `dokploy-foto-volume-talimati.md`).
> - **Mentör paneli metriklerini canlıda gözle görme** (gerçek veri doluyor mu).

> ⚠️ **GÜNCELLEME (2026-08-09) — CHAT TAM CANLIDA (frontend merge edildi, chat işi kapandı):**
> - **Frontend #47 MERGED → canlıda.** inbox/thread + `MessagesBell` (45sn polling) + `conversations.ts` + menti ilk-mesaj + nav.
>   Çatı main submodule pointer = **`0ec6b2b`** = backend main HEAD (doğrulandı, senkron). İki repo main CI ✅. Açık PR = SIFIR.
> - **DB doğrulandı (salt-okuma):** canlı Neon'da `Conversation` + `Message` tabloları **VAR** (boş), kolonlar şemayla birebir,
>   `_prisma_migrations`'ta `add_chat_conversation_message` **applied** (2026-08-06, rolled_back=null). → önceki "prod migration
>   davranışı TEYİT GEREK" çekincesi bu DB için **kapandı** (canlı=lokal aynı Neon). Bu turda DB'ye YAZILMADI.
> - **#48 MERGED** (bir önceki "taşınıyor" notu). Bu not onu GÜNCELLER: frontend artık AÇIK değil, **MERGED**.
> - **CHAT İŞİ KAPANDI.** Kalan tek şey: **ürün sahibi uçtan uca canlı test** (menti→mentör ilk mesaj · thread · çan rozeti · okundu).

> ⚠️ **GÜNCELLEME (2026-08-09) — CHAT CANLIYA TAŞINIYOR (backend canlıda, frontend merge PO'da):**
> - **Backend #33 MERGED → canlıda.** 6 konuşma ucu + Conversation/Message şeması + okundu-bazlı e-posta main'de.
>   Yeni **backend main HEAD `0ec6b2b`**.
> - **⚠️ Migration ÇALIŞTIRILMADI:** `add_chat_conversation_message` migration dosyası artık main'de ama bu turda
>   `prisma migrate`/`db execute` **koşulmadı, DB'ye dokunulmadı**. Additive + `IF NOT EXISTS` (idempotent) → güvenli beklenir;
>   **prod deploy migration davranışı TEYİT GEREK** (ürün sahibi doğrulamalı).
> - **Frontend PR #47 (`feat/chat-frontend-live`) AÇIK — MERGE PO'DA.** Güncel main'den cherry-pick (temiz taban):
>   inbox/thread sayfaları + `MessagesBell` (45sn polling) + `conversations.ts` API client + menti ilk-mesaj + nav.
>   Submodule pointer → `0ec6b2b`. İki repo CI ✅. **Merge = uçtan uca canlı test sonrası PO kararı.**
> - **#40 KAPATILDI (superseded)** — stale `docs/merge-turu-devir` tabanı + 28-commit divergence taşıyordu; #47 onun temiz hâli.
> - Bu not, aşağıdaki (bir önceki) "CHAT CANLIDA DEĞİL" düzeltmesini GÜNCELLER: artık backend canlıda, frontend merge bekliyor.

> ⚠️ **GÜNCELLEME (2026-08-09) — TEMİZLİK TURU CANLIYA ALINDI (ürün sahibi onayıyla merge edildi):**
> 5 PR main'e merge edildi (autodeploy = canlıda), iki repo main CI ✅:
> - **#43** platform derin-görünüş tema geçişi (çatı, frontend-only, kozmetik).
> - **#42** belgelerde kişi adı nötrleme (çatı, docs-only).
> - **#45** CLAUDE.md kalıcı kurallar (çatı, docs-only).
> - **VisibilityOptIn ölü kod:** backend **#34** (kod, tek dosya `mentiRequestController.ts` — ŞEMAYA DOKUNMADI) +
>   çatı **#44** (09-DURUM notu) + **submodule pointer bump** `7828c8e → 3d89ba7`. Çatı main pointer = backend main HEAD (doğrulandı).
> - **⚠️ VisibilityOptIn ŞEMA kolonu DROP'u HÂLÂ BEKLİYOR** — `prisma/schema.prisma`'daki `requestMessage` kolonu duruyor; DROP = migration
>   → ayrı, PO-onaylı bir migration turunda (DB'ye dokunan bir işle birlikte) yapılacak. Kod artık bu kolonu yazmıyor/okumuyor.
> - **DÜZELTME — CHAT CANLIDA DEĞİL:** chat PR'ları **#33/#40 hâlâ AÇIK** (bu turda ELLENMEDİ, ayrı akış). Önceki keşifte
>   doğrulandı: backend chat endpoint'leri hazır ama **frontend main'e bağlı değil** → chat henüz canlı bir özellik değil.
>   Aşağıdaki "CHAT v1" bloğunun "tam inşa bitti" ifadesi bu düzeltmeyle okunmalı.

## 📌 AÇIK İŞLER (ürün sahibi elinde — kaybolmasın)

### 💬 CHAT v1 (menti↔mentör mesajlaşma) — PR HAZIR, MERGE PO'DA (2026-08-06)
Tam inşa bitti (backend + okundu-bazlı e-posta + frontend inbox/thread + çan/rozet). **PR'lar açık, MERGE YOK.**
- **PR'lar:** backend `menti-mentor#33` · çatı `menti-mentor-v2#40` (base `docs/merge-turu-devir`). Branch: iki repoda `feat/chat-messaging`.
- **Migration:** `Conversation`+`Message` Faz 1'de canlı=lokal DB'ye uygulandı (additive, PO onaylı). Bu turda yeni migration YOK.
- **Kapsam:** menti zorunlu ilk mesajla açar (hemen açık) · katılımcı-bazlı yetki (yabancı 404, admin aynı-tenant okur) · okundu-bazlı mail (okunmamış yokken ilk mesajda) · polling (gerçek zamanlı yok).
- **İKİ REPO CI YEŞİL** ✅ (backend #33 `ci` pass; çatı #40 Backend-TS+Lint ✅ + Frontend-TS+Build ✅ + Integration Tests ✅). Entegrasyon testleri CI'da postgres'e karşı geçti.
- **Bir hata bulundu+giderildi:** çatı frontend job'ı vitest de koşuyor; `MessagesBell` nav'a eklenince `ux-fixes.test.tsx` (api'yi `() => ({})` mock'luyor) patladı → child'ı null'a mock'layarak düzeltildi (38 test geçti). Ders: yerel doğrulamaya **frontend vitest** de eklenmeli (sadece build+tsc yetmez).
- **Detay + bilinen sınırlar:** `docs/kararlar/chat-v1-teslim.md` (ürün sahibi buradan inceler).
- **Bilinen sınırlar (PO kararı):** eski `MatchRequest.requestMessage` backfill YOK (kapsam) · `VisibilityOptIn.requestMessage` ölü alan **KOD tarafı temizlendi**, şema kolonu DROP'u ertelendi (bkz. aşağı) · `Meeting.requestMessage` ayrı akış, dokunulmadı.
- **🧹 `VisibilityOptIn.requestMessage` ölü kod temizliği — KOD YAPILDI, ŞEMA ERTELENDİ (PR açık, MERGE YOK):** Frontend hiç kullanmıyordu (chat v1 bu niyet-mesajı akışının yerini aldı; grep: 0 referans). Kod tarafı ölü referanslar kaldırıldı (`mentiRequestController.ts` — validation alanı + upsert create/update yazımları + pending-list select). **PR:** backend `menti-mentor#34` (branch `chore/remove-visibilityoptin-deadcode`, base main). tsc+eslint temiz, backend CI ✅. **⚠️ ÖLÜ ŞEMA — SONRA SİLİNECEK:** `prisma/schema.prisma` `VisibilityOptIn.requestMessage` **kolonu duruyor** (DROP = migration → "DB şeması değişmez" kuralı gereği bu turda YAPILMADI). Kolon artık hiçbir kod tarafından yazılmıyor/okunmuyor — **gelecekte DB'ye dokunan bir işle birlikte, PO-onaylı bir DROP migration'ıyla temizlenecek**.
- **Sonraki:** PO PR'ları (#33/#40/backend#34) inceleyip revize/merge kararı verecek. MERGE YAPILMADI.

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

### ✅ ESKİ AÇIK PR TURU — TAMAMLANDI (2026-08-06): triyaj + kurtarma + kapatma
Merge turu öncesi (2026-07-30/31) kalan 5 eski PR ele alındı. **Kanıtlı triyaj, önceki "muhtemelen superseded" varsayımını ÇÜRÜTTÜ:** 5'in yalnız 1'i (backend #27 kodu) superseded; **4'ü main'de OLMAYAN benzersiz iş taşıyordu** → yeni recover PR'larında kurtarıldı.
- **Backend #27** (IDOR + login rate-limit) → **KAPATILDI** (superseded, kanıtlı): requireSelfOrAdmin+loginRateLimiter kodu + login testi main'de; /clubs IDOR coverage `clubs-idor.test.ts`'te; /users/:id 403-yaklaşımı bilinçli field-strip ile değiştirilmiş.
- **Backend #28** (REGISTER_MESSAGES) → **KURTARILDI → recover PR #32** (backend). "a0e1a69 kapsıyor" notu YANLIŞMIŞ; refactor main'de yoktu. Uyarlama: success mesajı 2 yerde → enumeration-safety için ikisi de bağlandı. **KAPATILDI**.
- **Çatı #29** (platform derin görünüm FE) → **KURTARILDI → recover PR #36** (çatı). Backend+API zaten canlıda, UI eksikti; platform.ts'e 4 fonksiyon eklendi (merge, overwrite değil) + dashboard cerrahi link. **KAPATILDI**.
- **Çatı #30** (kayıt hata UX FE) → **KURTARILDI → recover PR #37** (çatı). #32 ile çift (error-kodu sözleşmesi). Tema regresyonu atlandı. **KAPATILDI**.
- **Çatı #31** (CLAUDE.md 7 ders) → **KURTARILDI → recover PR #38** (çatı). 7 ders güncel CLAUDE.md'ye çakışmasız işlendi. **KAPATILDI**.
- **Durum (2026-08-06 GÜNCEL): 4 recover PR MERGED → canlıda.** Backend main **`7828c8e`** (recover #32), çatı main **`10e5c93`** (pointer `7828c8e` + #36 deep-view UI + #37 register-UX + #38 CLAUDE.md dersleri). İki main CI ✅. 5 eski PR kapatıldı. **Frontend autodeploy gerçek** (yeni platform deep-view sayfası) + backend autodeploy (register mesajları) → **ürün sahibi deploy'ları doğrulamalı**. PR kuyruğu = **GERÇEKTEN SIFIR**.

### 🎨 PLATFORM DEEP-VIEW UI — TEMA UYUMU (açık iş, sonraki tur)
Recover PR #36 (platform kurum derin-görünüm UI) **eski slate/indigo stiliyle** merge edildi (fonksiyon doğru, light-theme öncesi). Sayfa/bileşenler (`/platform/tenants/[id]` + 4 bileşen) tema-değişkeni (`bg-card`/`text-foreground` vb.) yerine hardcoded slate kullanıyor → panelin geri kalanıyla stil tutarsız. **İş:** slate→tema-değişkeni geçişi (kozmetik, düşük risk). Fonksiyonel değil, aciliyet düşük.

### 🔒 DİJİTAL AYAK İZİ — DERİN KISIM (ürün sahibi hazır olduğunda, web işi)
Belge nötrleme YAPILDI (PR hazır: çatı `menti-mentor-v2#42`, branch `chore/docs-neutralize-names`). Ama asıl iz **Git commit author bilgisinde + repo'nun PUBLIC olmasında**. Yapılacak (kod değil, GitHub web ayarı):
1. **İki repoyu da private yap:** `menti-mentor-v2` (çatı) + `menti-mentor` (backend submodule) — ikisi de Settings > Danger Zone > Make private.
2. **Private sonrası Dokploy'un repoya hâlâ eriştiğini doğrula** (deploy token/bağlantı) — erişim koparsa autodeploy durur, önce bunu teyit et.
3. **Git author geçmişini yeniden yazma ÖNERİLMİYOR** (çok riskli — tüm commit hash'leri değişir, submodule bozulur). Private yapmak daha güvenli çözüm.
- **Aciliyet: düşük.** Belge nötrleme yeterli ilk adım.

## 🔒 GÜVENLİK TURU KAPANDI (2026-08-06)
**PR #30 + PR #31 canlıya alındı; güvenlik denetiminin TÜM maddeleri (O1-O5) main'de/canlıda. Hedeflenen güvenlik iş kuyruğu = temiz.**
**Eski PR turu (2026-08-06) TAMAMLANDI + MERGED:** 5 eski PR kapatıldı; 4 recover PR (#32/#36/#37/#38) main'e MERGE edildi → canlıda (backend `7828c8e`, çatı `10e5c93`). Detay: yukarıdaki "✅ ESKİ AÇIK PR TURU" bloğu. Kanıtlı triyaj "muhtemelen superseded" varsayımını çürüttü (4/5 benzersiz içerik taşıyordu). Kalan: #36 tema uyumu (yukarıda 🎨).
- **PR #30 MERGED** (backend). Yeni **backend main HEAD `3f67024`** (merge-commit). Analytics IDOR (ham DISC PII) + meeting ownership + password-reset rate-limit → **canlıda**. Main CI ✅. Autodeploy tetiklendi → **ürün sahibi backend canlı deploy'unu doğrulamalı** (Dokploy erişimi ajanda yok).
- **Çatı pointer hizalandı** (PR #34 MERGED): yeni **çatı main HEAD `d3505f9`**, backend pointer **`3f67024`** (backend main ile hizalı). İki repo senkron. Frontend autodeploy no-op (fonksiyonel değişiklik yok).
- **Temizlik turu → PR #31 MERGED** (backend main `70a14d8`, çatı main `c6a05b9` — pointer PR #35 ile hizalı, iki CI ✅; O1-O5 **canlıda**). Autodeploy tetiklendi → **ürün sahibi backend canlı deploy'unu doğrulamalı**. İçerik — güvenlik denetiminin kalan 🟡 maddeleri:
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

**🔴 KIRMIZI KURALLAR:** Canlı = lokal aynı Neon → DB işleminde onay al · main'e merge = canlıya deploy (autodeploy açık) → merge kararı ürün sahibinde · tehlikeli seed asla · PR aç merge etme · submodule sırası: backend push → çatı pointer → çatı push (ara commit yok).

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
- `User.lastLoginAt DateTime?` eklendi. **MIGRATION ürün sahibi onayıyla canlı Neon'a uygulandı** (nullable, veri kaybı yok, `IF NOT EXISTS`).
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
- **⚠️ Dokploy'da yapılacak (ürün sahibi):** persistent volume mount `/app/uploads` + `UPLOAD_DIR=/app/uploads` env + `NEXT_PUBLIC_API_URL` kontrolü.

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

## ⏳ BEKLEYEN İŞLER (öncelik ürün sahibinde)

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
- PR aç, merge etme (ürün sahibi inceler).
- Ürün kararı ürün sahibinde, dürüst pushback yap.

## GÜNCELLEME NOTU
Bu belge her oturum sonunda güncellenmeli. Karara bağlanan açık sorular 08'den ilgili belgeye taşınmalı.

---

# ═══════════ ARŞİV: 10-yol-haritasi.md (2026-08-10 öncesi) ═══════════

# MentiMentor — Sıradaki İşler Yol Haritası

> Bu belge, mail işinden sonra yapılacak tüm işleri doğru sıraya, bağlamına, moduna ve
> bağımlılığına göre toplar. Amaç: her seferinde "sırada ne var" diye düşünmeden bu belgeyi
> takip ederek ilerlemek. **İşler tek tek, kullanıcı başlattıkça yapılır — bu belge yalnızca referans.**

---

## 🎯 SIRADAKİ İŞLER (2026-08-10 — EN GÜNCEL, öncelik sırasıyla)

> Bu blok bu oturumun kararlarına + unutulmuş-niyet envanterine (`unutulmus-niyet-envanteri-2026-08-10.md`,
> #54 MERGED) dayanır. Detaylar o belgede ve 09-DURUM'da. Her iş tek tek, ürün sahibi başlattıkça yapılır.
> **Mentör paneli TAM CANLIDA** (#36+#52+#51), **Taraf-2 ölü kod silindi** (#35+#50) — bunlar BİTTİ.

### 🔴 A) STK ADMIN PANELİ — 13 BULGU (ürün sahibi test etti; İLK ADIM: salt-okuma keşif "backend hazır mı / ne kadar iş")
1. **Giriş ekranı** şifre göster/gizle butonu yok (+ kayıt + şifre-sıfırlama ekranları da).
2. **Admin sol menü** sıralama/gruplama gözden geçir (tasarım kararı bekliyor).
3. **Havuz tablosu "Sektörler" kolonu** — çoklu değer nasıl gösterilecek.
4. **DISC gösterimi tek harf** — ikincil/karma tip backend'de tutuluyor mu (keşif) + gösterim kararı.
5. **Havuz sayfası layout** (tasarım kararı).
6. **Algoritma Kalibrasyon Merkezi** sayfası çok boş — eşleştirme ağırlıkları backend'de var mı (evet: 0.60/0.40 hardcoded), sayfa ne göstermeli.
7. **Yöneticiler sayfası** işlevi belirsiz — atama/çıkarma/yetki backend'de var mı (evet: `promote-admin`/`demote-admin`, max 3).
8. **Soru Yönetimi:** ifadelerin puanlama/cevap-tipi görünmüyor (keşifle netleşecek).
9. **CORE/DEEPENING İngilizce** — Türkçeleştir (enum mu görünüm mü, keşif).
10. **Yeni soru formu** cevap tipi (şıklı/açık uçlu) seçimi yok.
11. **Yeni soru formunda** tek seçenekli gereksiz dropdown.
12. **Etiket Yönetimi:** sayfa amacı doğru; hazır sistem etiketleri nerede tanımlı (teyit).
13. **Sertifika Konuları:** içerik/senaryo görünmüyor + "kurum ekleyemez" tasarım gerekçesi (topic1-5 placeholder mı gerçek mi).
→ **İlk adım (PLANLA):** 13 madde için "backend hazır mı / ne kadar iş (S/M/L)" salt-okuma keşfi; sonra ürün sahibi öncelik verir.

### 🔴 B) KVKK / YASAL (envanter #54 K1–K5 — ÜRETİM ÖNCESİ KRİTİK)
- **K1** Yasal metinler TASLAK (`/kvkk`, `/gizlilik`, `/terms` — "taslak niteliğinde") → hukukçu incelemesi.
- **K2** OAuth kullanıcılarında `kvkkConsentAt` NULL (register/self-serve set ediyor, `oauth/` etmiyor) → **kod** işi.
- **K3** Migration-öncesi eski kayıt consent politikası yok → **karar** (yeniden-rıza / bulk / erteleme).
- **K4** Yaş 18+ input/doğrulama yok (terms "18+" diyor) → karar + kod.
- **K5** Veri sorumlusu kimliği + sunucu konumu (Neon/Hostinger) beyanı yok → karar + içerik.

### 🟡 C) DİĞER (envanter #54 + önceki turlar)
- **Sektör skoru stub** (`sector-scorer.service.ts` sabit 50 dönüyor) → 5-bileşen canlı yola bağla (**staging şart**, canlı eşleşmeyi değiştirir).
- **K6** Admin sayfaları client-side guard → server `middleware.ts` hardening (API zaten backend-korumalı, veri sızıntısı değil).
- **super-admin router + `setVisibilityOptIn` (Taraf-1)** kararı: sil / bağla / ertele (ikisi de "niyetli ama bağlanmamış" — super-admin testli, Taraf-1 yarım admin manuel-eşleştirme).
- **`VisibilityOptIn` şema kolonu DROP'u** → ayrı, PO-onaylı migration turu (DB'ye dokunan bir işle birlikte).
- **Foto volume** doğrulama (Dokploy — ürün sahibi işi).

### 🟢 D) ÜRÜN SAHİBİ MANUEL (kod değil)
- Chat canlı uçtan uca test · foto Dokploy testi · repoları PRIVATE yapma (GitHub ayarı).

---

## 🆕 (2026-08-10) KOPUK-UÇ ENVANTERİ + MENTÖR KARAR EKRANI (chat CANLI sonrası)

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

### ✅ TAM CANLIDA (2026-08-10 — hepsi MERGED)
Mentör paneli yarım özelliklerinin ikisi de inşa edildi ve **canlıya alındı**:
- **Yaklaşan Toplantılar** — FE-only: `mentor/page.tsx` placeholder → onaylı (`SCHEDULED`) & `startsAt≥now`
  toplantıları tarihe göre listeler, boşsa "Yaklaşan toplantınız yok". Mevcut
  `meetingsApi.list({status:'SCHEDULED'})` kullanıldı, **yeni endpoint yok**. → **#51 MERGED**.
- **Mentör metrik kartları** — hafif okuma endpoint'i:
  `GET /api/mentors/:mentorId/dashboard-metrics` (`mentorMetricsController.ts`), **IDOR korumalı**
  (`requireRole('ADMIN','MENTOR')` + `requireSelfOrAdmin('mentorId')`). 4 metrik: bekleyen/tamamlanan
  (Meeting count) · aktif menti (distinct Meeting SCHEDULED/IN_PROGRESS/COMPLETED) · ortalama NPS
  (`FeedbackLog.npsScore` agregasyonu, veri yoksa `null`→"—"). **Yeni tablo/kolon yok**, salt-okuma.
  → **backend #36 MERGED** + **çatı pointer #52 MERGED**.
- **Merge notları:** #36 merge-commit yarattı → #52 pointer'ı backend main HEAD `afc2769`'e re-sync
  edildi (pointer == HEAD doğrulandı). #51↔#52 `mentor/page.tsx` çakışması ("iki sorgu bloğu da eklendi")
  **"ikisini de tut"** ile çözüldü (deterministik, ürün sahibi onaylı). İki repo main CI yeşil,
  pointer `afc2769` senkron. **Mentör paneli artık gerçek metrik + yaklaşan toplantı gösteriyor.**

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
