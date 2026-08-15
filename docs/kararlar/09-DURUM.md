# 09 — GÜNCEL DURUM (ŞU AN NEREDEYİZ)

**🔄 YAŞAYAN** (canonical: güncel durum) · **Son güncelleme:** 2026-08-15 (KARAR 5 DISC güvenlik açığı düzeltildi ve
CANLIYA merge edildi: backend #37 + çatı #71 MERGED, submodule pointer senkron, iki repo main CI yeşil → **v1 #1
tamamlandı**; sıradaki v1 adayı havuz kart işi KARAR 2/7).
Önceki: 2026-08-14 (oturum kapanışı: bu oturumun 5 belge PR'ı
[#65 belge temizliği · #66 devir · #67 karar-statü haritası · #68 durum panosu · #69 v1/v2 yol haritası] MERGED →
**açık PR: 0, masa temiz**; IDOR çelişkisi kod keşfiyle çözüldü — kapanış özeti: `docs/devir/07-oturum-2026-08-14.md`).
Önceki: 2026-08-11 (oturum belgeleri merge oldu → "açık PR" bloğu gerçek merge durumuna çekildi).
Bu belge SIK güncellenir — her oturum başında oku, sonunda güncelle.
**Sıradaki işler + öncelik:** `docs/kararlar/10-yol-haritasi.md`. **2026-08-10 öncesi tam geçmiş:**
`docs/arsiv/09-DURUM-ve-yolharitasi-arsiv-2026-08-10.md`. **Belge denetimi (neden temizlendi):**
`docs/kararlar/belge-denetimi-2026-08-10.md`.

---

## ⚡ TEK BAKIŞTA (şu an — hepsi doğrulanmış)
- **Canlı:** sivilkapasite.org ayakta (Dokploy). **Mail çalışıyor** (generic SMTP relay — Resend/Brevo;
  Gmail App Password kaldırıldı, `emailService.ts`). Forgot/reset-password akışı tam.
- **DB:** Canlı = lokal aynı Neon (`ep-fancy-tooth-ab4u5xhr`). DISC soruları (20) + öğrenme aşamaları (13) yüklü.
- **Backend main HEAD:** `afc2769` · çatı main HEAD `e817a2d` (#69) · submodule pointer = `afc2769` (senkron, doğrulandı).
  > ⚠️ GÜNCELLEME (2026-08-15): KARAR 5 merge sonrası → **backend main HEAD `0850eaa`** (#37) · **çatı main HEAD `4c48a8e`** (#71)
  > · **submodule pointer = `0850eaa` (backend main HEAD ile TAM SENKRON, `git submodule status` + `ls-tree` ile doğrulandı)**.
- **Açık PR:** çatı **0** · backend **0** — **masa temiz** (2026-08-14: bu oturumun 5 belge PR'ı #65–#69 sırayla MERGED).
  > ⚠️ GÜNCELLEME (2026-08-14): bu satır #65–#69 açıkken "çatı #65 (merge PO'da)" diyordu; 5 PR merge olunca gerçeğe (açık PR 0) çekildi (Belge Düzeltme Deseni / Kural 6).
  > ⚠️ GÜNCELLEME (2026-08-15): artık **açık PR: backend #37 + çatı #71** — KARAR 5 DISC güvenlik düzeltmesi, **merge PO'da** (bkz. "🟡 GÜVENLİK" bölümü).
  > ⚠️ GÜNCELLEME (2026-08-15, aynı gün geç): #37 + #71 **MERGED, canlıda** → **açık PR yeniden çatı 0 · backend 0, masa temiz** (bkz. "✅ GÜVENLİK" bölümü).
  > ⚠️ GÜNCELLEME (2026-08-15, v1 turu): yeni v1 işleri açıldı → **açık PR: bu docs (#72) · KVKK backend #38 + çatı #73 · havuz-kart backend #39 + çatı #74** — hepsi **merge PO'da** (bkz. "🚧 BU OTURUM — v1 İŞLERİ" bölümü). İki repo tüm CI yeşil.
- **İzole test DB:** `backend/.env.test` + `assertTestDatabase` guard VAR (lokal `verify` güvenli).

## 🚧 BU OTURUM — v1 İŞLERİ (PR açık, merge PO'da; 2026-08-15)
> ⚠️ GÜNCELLEME (2026-08-15): KARAR 5 sonrası v1 işleri kodlandı. **Hepsi PR açık, merge PO'da** (henüz merge YOK →
> "tamamlandı" denmez). İki repo tüm CI yeşil (backend entegrasyon suite CI'da geçiyor). Merge sırası PO'da (aşağıda öneri).

- **KVKK v1-A (backend #38 + çatı #73):**
  - **K2 — `kvkkConsentAt` ispat yükü:** OAuth `handleNewUser` + self-serve kurucu admin `create` `new Date()` set eder
    (önceden NULL). `oauthService.ts` + `selfServeController.ts`. Test: `oauth-kvkk-consent.test.ts`.
  - **K5 — sunucu konumu/yurt dışı aktarım beyanı:** `kvkk/page.tsx` "8. Sunucu Konumu ve Yurt Dışı Aktarım" (İrlanda/AB, KVKK Md.9).
  - **K4 — 18+ beyanı:** **PO kararı: AYRI kutu DEĞİL** → tek KVKK onay kutusunun metnine gömüldü ("...ve 18 yaşından
    büyük olduğumu beyan ederim"). Ayrı `ageConsent` alanı (ilk denemede eklenmişti) **geri alındı**. DB'ye yaş yazılmaz (şema yok).
- **Havuz kart / menti→mentör uyum skoru (backend #39 + çatı #74) — v1-C kısmi:**
  - **GÜVENLİ YOL:** mevcut skorlama motoru (`computeTotalScore`) **ters yönde** okundu — `rankMentorsForMenti` (yeni
    salt-okuma yolu). **Canlı eşleştirme (`rankMentisForMentor`) DEĞİŞMEDİ.** Yeni endpoint `GET /mentis/:mentiId/mentor-matches`
    (IDOR: `requireSelfOrAdmin`).
  - **KARAR 5 güvenlik:** menti response'unda mentörün `discType`/`discScore` YOK; `compatibilityReason` jenerik (harf sızmaz).
    Menti yalnız **%uyum skoru + jenerik gerekçe** görür. Test: `mentor-matches.test.ts` (discType YOK + harf sızmaz + IDOR 403).
  - **FE:** `menti/page.tsx` mentör havuzu satır-listesi → **KART** (skor + neden uyumlu). `MentorMatch` tipi (discType yok).
  - **⚠️ KALAN v1-C (bu turda YOK — follow-up):** (1) **mentör→menti aday kartı** DISC+gerekçeli (RankedMenti'ye menti
    `discType` eklenmeli — KARAR 5 mentör→menti'ye izin verir → backend+çatı turu) · (2) **yönetici havuz kartları**
    (tablo→kart + durum rozeti KARAR 3 + sertifika rozeti KARAR 4, `tenantMembership.isCertified` DTO'ya) · (3) **sol menü
    4-grup** (KARAR 1). Bunlar `10-yol-haritasi.md` md.7/8/10/11'de.

## ✅ GÜVENLİK — KARAR 5 DÜZELTİLDİ, CANLIDA (backend #37 + çatı #71 MERGED)
> ⚠️ GÜNCELLEME (2026-08-15, merge turu): açık **KAPANDI, canlıda**. Backend **#37** (`0850eaa`) + çatı **#71** (`4c48a8e`)
> `--merge` ile MERGED; submodule pointer `0850eaa` backend main HEAD ile **tam senkron**; iki repo main CI yeşil; autodeploy
> ile canlıya çıktı. Regresyon testi `disc-visibility.test.ts` CI'da (Integration suite) geçiyor → açığın geri gelmesi guard'lı.
> **v1 #1 canlı-öncesi ŞART karşılandı.** Havuz kart işi (KARAR 2/7) ön-koşulu artık karşılandı → yapılabilir (sıradaki aday).
> ---
> ⚠️ GÜNCELLEME (2026-08-15): bu açık **kod düzeltmesiyle kapatıldı**, PR açık, **merge PO'da** (henüz merge YOK →
> "tamamlandı" denmez). Backend **PR #37** (`menti-mentor`) + çatı **PR #71** (`menti-mentor-v2`: FE gizleme + submodule pointer + bu docs).
> Fix: merkezi `services/discVisibility.ts` → `canViewerSeeDiscType(viewer,target)` (ADMIN hepsi · MENTOR→MENTI görür ·
> MENTI hiç kimseyi görmez). Kapatma backend'de: menti→mentör response'undan `discType`+`discResultCard` **tamamen
> çıkarılır** (`listUsers` + `getUser` public yol). FE `menti/page.tsx` DISC gösterimi kaldırıldı (savunma-derinliği).
> Regresyon testi `disc-visibility.test.ts` (menti→mentör YOK / mentör→menti VAR / admin VAR). Doğrulama: tsc+tsc-test+
> eslint+FE tsc/vitest/build yeşil; backend entegrasyon **gerçek kanıt CI'da** (lokal TEST_DATABASE_URL guard'ıyla durur).
> Havuz kart işi (KARAR 2/7) bu düzeltmeden SONRA yapılabilir; aynı `canViewerSeeDiscType` kuralından beslenecek.
- **KARAR 5 — menti mentörün DISC tipini görüyor (PII/mahremiyet açığı):** salt-okuma güvenlik denetimi 🔴 AÇIK buldu.
  Menti'ye mentörün `discType` (harf) + arketip backend'den dönüyor: `userController.ts:90` (`listUsers`) + `:138-139`
  (`USER_PUBLIC_SELECT`) + FE `menti/page.tsx:262-266`. Ham vektör güvenli (self/admin). Kod `discType`'ı bilinçli public
  tasarlamış → KARAR 5 (daha yeni PO kararı) ile çelişiyor. Düzeltme = viewer/target-role-aware select → **yol haritası v1 #1**
  (canlı-öncesi ŞART). Ön-koşul: havuz kart işi (KARAR 2/7) bu düzeltmeden SONRA.

## 🗺️ YOL HARİTASI — v1/v2 ÖNCELİKLENDİRİLDİ (2026-08-14)
- `10-yol-haritasi.md` gerçekle hizalandı + v1/v2 etiketlendi (kaynak: `00-karar-statu-haritasi-2026-08-14`). Biten işler
  (F1 foto upload / F2 platform drill-down / F7 KPI drill-down) düşürüldü; tasarım kararları (KARAR 1/3/4/11) eklendi.
  **v1 #1 = KARAR 5 güvenlik.** Sıradaki: v1 işlerini tek tek kodlama turları.
  > ⚠️ GÜNCELLEME (2026-08-15): **v1 #1 (KARAR 5) ✅ tamamlandı, canlıda** (#37+#71). Sıradaki v1 adayı: **havuz KART görünümü + "Neden uyumlu" L1 (KARAR 2/7)** — DISC güvenliği kapandığı için ön-koşul karşılandı, artık yapılabilir.

## ✅ CANLIDA / KAPANMIŞ (kod main'de)
- **CHAT v1 — TAM CANLIDA.** menti↔mentör mesajlaşma: inbox/thread + `MessagesBell` (45sn polling) +
  menti zorunlu ilk mesaj + katılımcı-bazlı yetki + okundu-bazlı e-posta. Backend #33 + frontend #47/#48 MERGED.
  Canlı Neon'da `Conversation`+`Message` tabloları var (migration applied). Detay: `chat-v1-teslim.md`.
- **MENTÖR PANELİ — TAM CANLIDA.** Gerçek metrik kartları (aktif menti · bekleyen · tamamlanan · ortalama NPS)
  endpoint `GET /api/mentors/:mentorId/dashboard-metrics` (IDOR korumalı `requireSelfOrAdmin`, salt-okuma) +
  **Yaklaşan Toplantılar** (onaylı/SCHEDULED). Backend #36 + çatı #52/#51 MERGED.
- **Ölü kod temizliği — menti-driven görünürlük talebi (Taraf-2):** `mentiRequestController.ts` + 3 rota
  SİLİNDİ (backend #35 + çatı pointer #50). Taraf-1 `setVisibilityOptIn` **kasıtlı korundu**.
- **Güvenlik turu (O1-O5) · eski PR kurtarma turu · retention (STK-yönetici) · platform admin turu ·
  fotoğraf altyapısı · timezone fix · IDOR fix'leri** — hepsi MERGED, canlıda (geçmiş detay arşivde).
- **Unutulmuş-niyet envanteri** (`unutulmus-niyet-envanteri-2026-08-10.md`, #54) + **belge denetimi** (#56) MERGED.

## ✅ CANLIDA / KAPANMIŞ — bu oturum (2026-08-11)
> ⚠️ GÜNCELLEME (2026-08-11): Bu blok önce "🔧 AÇIK PR — BU TURDA (merge PO'da)" başlığındaydı ve `PR: (aşağıda no)`
> placeholder içeriyordu. O PR'ların **HEPSİ merge oldu** → bilgi bayatladı, gerçek merge durumuyla güncellendi
> (Belge Düzeltme Deseni / belge-duzeni-rehberi Kural 6). **Açık PR: 0, masa temiz.**
- **STK admin UI bağlama (S işler) — #62 MERGED, CANLIDA:** **B7** Yönetici atama UI (backend `promote/demote`
  zaten vardı, ön yüze bağlandı) · **B9** CORE/DEEPENING görünen etiket Türkçeleştirme (enum-safe; DB değeri
  değişmedi) · **B1** şifre göster/gizle (paylaşılan `PasswordField` molekülü → login + reset). Salt-frontend.
  - **Bilinen sınır / ertelendi:** **B4** (DISC ikincil/karma gösterim) bu turdan ÇIKARILDI — ikincil tipi göstermek
    backend'e yeni türetilmiş DISC alanı eklemeyi gerektiriyor; backend `CLAUDE.md` bunu PII sınıfında tutuyor →
    PO/uyum kararı + ayrı backend turu gerekir. (İlgili karar: `tasarim-kararlari-admin-2026-08-11.md` KARAR 11.)
- **Belge işleri — hepsi MERGED (bu oturum):** STK admin 13-bulgu keşfi (`stk-admin-bulgu-envanteri-2026-08-11.md`,
  📸 dondurulmuş) · belge-aksiyon denetimi **#59** · yol haritası 7 madde/F bölümü **#60** · CLAUDE.md belge-senkron
  kuralı **#61** · tasarım kararları (`tasarim-kararlari-admin-2026-08-11.md`) **#63** · devir belgeleri (`docs/devir/`) **#58**.
- **Belge düzeni kalıcı temeli — bu tur:** `belge-duzeni-rehberi.md` (6 kural) + CLAUDE.md "Belge Düzeni" bağlaması.

## ✅ CANLIDA / KAPANMIŞ — bu oturum (2026-08-14)
- **IDOR çelişkisi ÇÖZÜLDÜ (kod keşfi):** `/mentors/:mentorId/candidates` + `/requests/:id` tenant izolasyonu +
  sahiplik kontrolü ile **KORUMALI — açık YOK** (düzeltme `161ae00`; `matchingController.ts:45-52`,
  `requestController.ts:116-121`). `04-guvenlik-ve-kvkk`'deki "düzeltilmedi" notu ✅ ile güncellendi.
- **Bu oturumun 5 belge PR'ı MERGED (main'de) — #65–#69:** belge düzeni uygulaması (44 belgeye tür etiketi + INDEX
  tamamlama + gruplama + 7 bayat işaret; `belge-temizlik-haritasi-2026-08-14`, #65) · devir belgeleri güncelleme
  (`devir/07-oturum-2026-08-14`, #66) · karar-statü haritası (`00-karar-statu-haritasi-2026-08-14`, #67) · durum panosu
  (`00-DURUM-PANOSU`, #68) · v1/v2 yol haritası (#69). **Hepsi salt-docs.**
- **🔴 KARAR 5 DISC güvenlik açığı** (yukarıda "GÜVENLİK" bölümü) → yol haritası **v1 #1** (canlı-öncesi ŞART).
- **#64 belge düzeni rehberi** (6 kural) + CLAUDE.md "Belge Düzeni" bağlaması MERGED (oturum başı).

## 4-rol metodolojisi (strateji→kıyas→aksiyon)
STK yönetici ✅ · Platform admin ✅ · **Mentör ✅** (panel + chat canlıda) · **Menti ⬜** (sıradaki).

## ⏳ BEKLEYEN — ürün sahibi elinde (kod değil, kaybolmasın)
- **Chat uçtan uca canlı test:** menti→mentör ilk mesaj · thread · çan rozeti · okundu.
- **Foto volume doğrulama** (Dokploy redeploy sonrası kalıcılık — `dokploy-foto-volume-talimati.md`).
- **Mentör paneli metriklerini canlıda gözle görme** (gerçek veri doluyor mu).
- **Repoları PRIVATE yapma** (GitHub web ayarı; sonra Dokploy erişimini doğrula).

## ⚠️ ERTELENMİŞ TEKNİK BORÇ (bilinçli)
- **`VisibilityOptIn.requestMessage` ŞEMA kolonu duruyor** — kod artık yazmıyor/okumuyor; DROP = migration
  → DB'ye dokunan, PO-onaylı ayrı bir migration turunda temizlenecek ("DB şeması değişmez" kuralı).

## 🔴 KIRMIZI KURALLAR (kalıcı)
- Canlı = lokal aynı Neon → DB işleminde (seed/migration/backfill) **önce onay al**. Tehlikeli seed asla.
- main'e merge = canlıya deploy (autodeploy açık) → **merge kararı ürün sahibinde**. PR aç, merge etme.
- Submodule sırası: backend push → çatı `git add backend` → çatı commit → çatı push (ara commit yok).
- Ürün kararı ürün sahibinde; dürüst pushback yap; testi/CI'ı yeşil gösterme, gerçeği ver.

## GÜNCELLEME NOTU
Bu belge yalnızca **ŞU AN**'ı tutar (tek tutarlı durum). Tamamlanan işler buraya kısa özet olarak yazılır,
detaylı geçmiş arşive taşınır. Karara bağlanan açık sorular 08'e/ilgili belgeye işlenir.

> ⚠️ 2026-08-14: **Karar-statü haritası çıkarıldı** — `00-karar-statu-haritasi-2026-08-14.md`. ~72 kararın
> plan/kod/çelişki statüsü; kritik bulgu: eski "yapılmadı" sanılan çok iş aslında 🟩 TAM (platform/KPI drill-down,
> foto upload), roadmap F1/F2/F7 bayat.
> ⚠️ 2026-08-14: **Durum panosu çıkarıldı** — `00-DURUM-PANOSU.md` (🔄): 92 kararın tek-bakışta renkli
> statüsü (31 🟩 tam · 17 🟨/🟧 az-işle-kazanç · 18 🟥 hiç). Sıradaki: yol haritası v1/v2 önceliklendirme.
