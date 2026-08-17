# 09 — GÜNCEL DURUM (ŞU AN NEREDEYİZ)

**🔄 YAŞAYAN** (canonical: güncel durum) · **Son güncelleme:** 2026-08-17 (**① grubu masa temizliği MERGED, canlıda**:
#32 admin soru düzenleme UI (çatı #87) · #6 correction-maili fix (backend #44) · #33 ölü seed temizliği (backend #45) → çatı
main `41f91b4` · backend `e83ec9c` · pointer senkron · açık PR **0/0**; detay: "✅ ① GRUBU" bölümü). Önceki: 2026-08-15 (**5-PR masa temizliği merge'i**: menü 4-grup #76,
sertifika rozeti kişi-geneli #40+#77, envanter+içerik raporları #78+#79 → hepsi CANLIDA; çatı main `444c025` · backend `5eafbbd` ·
açık PR 0/0; **v1 #8 + #11 tamamlandı, #10 zaten mevcuttu** — bkz. "✅ MASA TEMİZLİĞİ"). Önceki: KARAR 5 DISC güvenlik açığı düzeltildi ve
CANLIYA merge edildi: backend #37 + çatı #71 MERGED, submodule pointer senkron, iki repo main CI yeşil → **v1 #1
tamamlandı**.
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
  > ⚠️ GÜNCELLEME (2026-08-15, v1 merge turu): 4 kod PR merge sonrası → **backend main HEAD `379658a`** (#38+#39) · **çatı main HEAD `c3e4626`** (#73+#74) · **submodule pointer = `379658a` (backend main HEAD ile TAM SENKRON, `ls-tree` == `rev-parse` doğrulandı)**.
  > ⚠️ GÜNCELLEME (2026-08-15, 5-PR merge turu): masa temizliği merge'i sonrası → **çatı main HEAD `444c025`** (#77) · **backend main HEAD `5eafbbd`** (#40) · **submodule pointer = `5eafbbd` (backend main HEAD ile TAM SENKRON, `git submodule status` doğrulandı)**. Merge sırası: #78→#79→#76→#40→#77 (#77 pointer'ı #40 merge commit'ine bump edildi). İki repo her adımda main CI yeşil.
  > ⚠️ GÜNCELLEME (2026-08-16, İş 2+3 turu): onay/red izi + gerekçe merge sonrası → **çatı main HEAD `b66e07c`** (#82) · **backend main HEAD `ed84806`** (#41) · **submodule pointer = `ed84806` (senkron)**. Merge sırası: #41→#81 (pointer bump)→#82. **Migration canlıya uygulandı** (User'a 5 nullable kolon).
  > ⚠️ GÜNCELLEME (2026-08-16, yönetici-adı + İş 3 P2/P3): #42+#83 (yönetici-adı) → #84 (docs) → #43+#85 (İş 3 P2/P3) MERGED. Son: **çatı main HEAD `513ba84`** · **backend main HEAD `a9fc0bf`** · **submodule pointer = `a9fc0bf` (senkron)**. Açık PR 0/0.
  > ⚠️ GÜNCELLEME (2026-08-17, ① grubu masa temizliği): admin soru düzenleme UI + correction-maili fix + ölü seed temizliği MERGED. Merge sırası: backend #44→#45 → çatı pointer bump #88 → çatı FE #87. Son: **çatı main HEAD `41f91b4`** (#88) · **backend main HEAD `e83ec9c`** (#45) · **submodule pointer = `e83ec9c` (backend main HEAD ile TAM SENKRON, `git submodule status` doğrulandı)**. Açık PR **0/0**. İki repo her adımda main CI yeşil. **Migration/DB/seed çalıştırma YOK.**
- **Açık PR:** çatı **0** · backend **0** — **masa temiz** (2026-08-14: bu oturumun 5 belge PR'ı #65–#69 sırayla MERGED).
  > ⚠️ GÜNCELLEME (2026-08-14): bu satır #65–#69 açıkken "çatı #65 (merge PO'da)" diyordu; 5 PR merge olunca gerçeğe (açık PR 0) çekildi (Belge Düzeltme Deseni / Kural 6).
  > ⚠️ GÜNCELLEME (2026-08-15): artık **açık PR: backend #37 + çatı #71** — KARAR 5 DISC güvenlik düzeltmesi, **merge PO'da** (bkz. "🟡 GÜVENLİK" bölümü).
  > ⚠️ GÜNCELLEME (2026-08-15, aynı gün geç): #37 + #71 **MERGED, canlıda** → **açık PR yeniden çatı 0 · backend 0, masa temiz** (bkz. "✅ GÜVENLİK" bölümü).
  > ⚠️ GÜNCELLEME (2026-08-15, v1 turu): yeni v1 işleri açıldı → **açık PR: bu docs (#72) · KVKK backend #38 + çatı #73 · havuz-kart backend #39 + çatı #74** — hepsi **merge PO'da** (bkz. "🚧 BU OTURUM — v1 İŞLERİ" bölümü). İki repo tüm CI yeşil.
  > ⚠️ GÜNCELLEME (2026-08-15, v1 merge turu): **4 kod PR sırayla MERGED, canlıda** (#38→#73→#39→#74, `--merge`). **Açık PR yalnız bu docs (#72)** — kod PR: çatı 0 · backend 0. #74'te submodule pointer çakışması backend main HEAD'e bump ile çözüldü. İki repo main CI yeşil.
  > ⚠️ GÜNCELLEME (2026-08-15, devir turu): #72 de **MERGED** (çatı main HEAD `cafd68c`) → açık PR gerçekte **çatı 0 · backend 0** (git + `gh pr list` kanıtlı). Yukarıdaki "docs (#72) açık" ifadesi **eskimiştir.** Oturum kapanışı: `docs/devir/08-oturum-2026-08-15.md`.
  > ⚠️ GÜNCELLEME (2026-08-15, 5-PR merge turu): sonraki turlarda 5 PR daha açılıp merge edildi (#76 menü · #40+#77 rozet · #78 envanter · #79 içerik). Merge sonrası **açık PR yeniden çatı 0 · backend 0, masa temiz** (bkz. "✅ MASA TEMİZLİĞİ" bölümü).
  > ⚠️ GÜNCELLEME (2026-08-16, İş 2+3 turu): #80 (docs) + #41+#81 (İş 2+P1 backend) + #82 (İş 2/3 FE) MERGED, canlıda. **Açık:** yönetici-adı gösterimi (backend #42 + çatı #83, CI yeşil, merge PO'da) + bu docs PR. Kod PR: onlar dışında 0. (bkz. "✅ İŞ 2 + İŞ 3 P1" bölümü.)
- **İzole test DB:** `backend/.env.test` + `assertTestDatabase` guard VAR (lokal `verify` güvenli).

## ✅ ① GRUBU — MASA TEMİZLİĞİ MERGED, CANLIDA (2026-08-17)
> Çatı main `41f91b4` · backend main `e83ec9c` · submodule pointer `e83ec9c` (senkron) · açık PR **0/0** (git + `gh pr list` doğrulandı). Merge sırası: backend #44 → #45 → çatı pointer bump #88 → çatı FE #87. Her adımda iki repo main CI yeşil. **Migration/DB yazımı/seed çalıştırma SIFIR.**
- **#32 — Admin soru düzenleme UI (çatı #87), canlıda:** kuruma özel soruya **Düzenle** butonu + inline form (`(admin)/admin/questions/page.tsx`). Backend PATCH `/api/questions/:id` (requireRole ADMIN + tenant-scoped IDOR: global soru `GLOBAL_SORU_KILITLI`, çapraz-tenant `YETKI_YETERSIZ`) **zaten hazırdı** → yalnız FE eksikti. Yalnız metin düzenlenir (backend `UpdateQuestionSchema` gereği; discDimension/type yapısal). CI Integration (Admin) yeşil.
- **#6 — Onay/red maili TEYİT + correction-fix (backend #44), canlıda:** `approveUser`→onay maili ✅, `rejectUser`→red maili (gerekçeli) ✅ **zaten çalışıyordu** (teyit). Bulunan bug: `requestCorrection` düzeltme notunu (`feedbackNote`) DB'ye yazıyor ama **e-postaya iletmiyordu** (yorum "iletir" diyordu, etmiyordu) → tek satır fix (`rejectionReason: parsed.data.feedbackNote`). PII yok.
  > ⚠️ NOT: 10-yol-haritasi md.6 "onay paneli bildirim maili" **kurum onay/ret + `destek@` + prod `PLATFORM_ADMIN_EMAIL`** kapsıyor — bu AYRI/geniş; yalnız kullanıcı onay/red/correction maili teyit+fix edildi, kurum/env kısmı DEĞİL.
- **#33 — Ölü/çelişen seed dosyası temizliği (backend #45), canlıda (KISMİ):** `prisma/seed-questions.ts` (hiç import edilmeyen standalone CLI, 20 global DISC sorusu) **silindi** — aktif `seed.ts` (32 soru) ile çelişiyordu. **DB'ye dokunulmadı, hiçbir seed çalıştırılmadı.**
  > ⚠️ KALAN (PO kararı, ayrı tur — canlı DB yazımı gerektirir): (1) **seed↔canlı tutarsızlığı**: canlı DB'de **20 DISC sorusu** var (eski standalone seed'in izi), aktif `seed.ts` **32** üretir → hangi set canonical, canlı re-seed mi seed.ts trim mi? (2) **SJT belge-kod çelişkisi**: `03-psikometri:47` "4 pedagojik SJT" der, **kod 3** (`seed.ts` SJT_QUESTIONS = 3, doğrulandı) → belge kod gerçeğine hizalandı (bu tur), içerik 4'e genişletme PO kararı.
- **#5 — ThemeToggle admin/platform nav (kod-doğrulandı bu tur):** ✅ **ZATEN MEVCUT** — `(admin)/layout.tsx:92` `<ThemeToggle />` + platform dashboard'da var. Yol haritasından düşürülebilir (kod gerçeği).
- **⚠️ BRIEF DÜZELTMELERİ (git+kod esas, dürüst pushback):** Bu turun brief'i 3 yanlış içeriyordu: (a) **#13 cevap-tipi "yapıldı" DEĞİL** — önceki turda migration gerektirdiği için ATLANDI, PR yok, hâlâ açık; (b) **SJT "kod 4" DEĞİL** — kod 3 (belge 4 diyor, tersi); (c) **#9/#34 "yapıldı" DEĞİL** — kod-doğrulama negatif (#9 ağırlık gösterimi yok, #34 `learningJourneyCompletedAt` STK adminController select'inde yok, yalnız platform süper-admin'de).

## ✅ İŞ 3 P2/P3 — REDDEDİLEN KULLANICI AKIŞI, CANLIDA (2026-08-16)
> Çatı main `513ba84` · backend main `a9fc0bf` · submodule senkron · açık PR 0/0. Yaklaşım: **Yol 1** (token vermeden).
- **P2 (gerekçe görme) — backend #43 + çatı #85, canlıda:** reddedilen kullanıcı doğru şifreyle giriş deneyince **token VERİLMEZ**; 403 yanıtında `rejectionReason` + `canReapply` döner; FE kibar red ekranı gösterir. **Enumeration-safe:** REJECTED kontrolü `bcrypt.compare`'den SONRA (yanlış şifre → generic 401, red bilgisi sızmaz). Token olmadığından reddedilen hiçbir korumalı sayfaya erişemez.
- **P3 (tekrar başvuru) — canlıda:** `POST /api/auth/reapply` (public, rate-limit) — email+şifre doğrular (enumeration-safe), yalnız **kendi** hesabını (IDOR yok) `REJECTED→PENDING` yapar, `isActive=true`. **Red geçmişi KORUNUR** (`rejectionReason`/`rejectedBy`/`rejectedAt` silinmez — çok-yönetici). Test/DISC/profil verisine dokunulmaz.
- **Kibar red e-postası:** destekleyici ton, "düzeltme" vaat etmez (Yol 1'de uygulama-içi düzeltme yok), "dilerseniz tekrar başvurabilirsiniz, verileriniz korunur". Best-effort.
- **Testler:** enumeration (P2+reapply yanlış şifre generic), IDOR-durum (reapply yalnız REJECTED), geçiş + geçmiş koruma + test-verisi koruma. CI'da geçti.
- **⚠️ KABUL EDİLEN SINIR (PO):** (1) **PENDING durumu login'de şifre-öncesi sızıyor** (mevcut, kapsam dışı) → ileride "giriş enumeration sertleştirme" ile ele alınacak (10-yol-haritasi). (2) **Uygulama-içi profil düzeltme YOK** (Yol 1); istenirse Yol 2 mimarisiyle ayrı iş.

## ✅ İŞ 2 + İŞ 3 P1 — ONAY/RED İZİ + GEREKÇE, CANLIDA (2026-08-16)
> Çatı main `b66e07c` · backend main `ed84806` · açık PR: yönetici-adı (#42+#83, merge PO'da).
- **Migration CANLIDA (additive/nullable, veri kaybı yok):** `User`'a `approvedBy`, `approvedAt`, `rejectedBy`, `rejectedAt`, `rejectionReason`. Yöntem: `db execute` (IF NOT EXISTS) + `migrate resolve --applied`; salt-okuma SELECT ile doğrulandı. `db push` kullanılmadı.
- **İş 2 (kim onayladı/reddetti izi) — backend #41 + çatı #81, canlıda:** `approveUser`/`rejectUser` yapan yöneticiyi + zamanı kaydeder; `approveUser` eski red izini temizler. `adminListUsers` denetim alanlarını döndürür (yalnız admin, audit).
- **İş 3 P1 (red gerekçesi) — canlıda:** `rejectUser` opsiyonel `reason` (≤500) → `rejectionReason`; `requestCorrection` `feedbackNote`'u kalıcı kaydeder (önceden yalnız e-posta).
- **İş 2/3 FE — çatı #82, canlıda:** havuz tablolarında onay/red tarihi + red gerekçesi (title ile tam metin) + reddet akışında gerekçe kutusu (`RejectReasonDialog`, PII uyarısı). Yalnız admin.
- **Yönetici-adı gösterimi (backend #42 + çatı #83, merge PO'da):** `approvedBy`/`rejectedBy` userId'si TEK sorgu + TENANT-SCOPED `fullName`'e çözülür (`approvedByName`/`rejectedByName`); çapraz-tenant isim sızmaz; havuzda "Onaylayan/Reddeden: [Ad] · [tarih]".
- **⏳ KALAN (AYRI TUR — auth/güvenlik kararı):** İş 3 **P2** (reddedilen kullanıcı kendi ekranında gerekçe görür) + **P3** (REJECTED→PENDING tekrar başvuru + başvuru revizyonu). Reddedilen `isActive=false` → login generic 401 (enumeration koruması); bu akışı değiştirmek PO ürün+güvenlik kararı.

## ✅ MASA TEMİZLİĞİ — 5 PR MERGED, CANLIDA (2026-08-15, geç oturumlar)
> Çatı main `444c025` · backend main `5eafbbd` · submodule senkron · açık PR 0/0 (git doğrulandı).
- **v1 #8 — admin sol menü 4-grup (çatı #76):** ✅ TAMAMLANDI, canlıda. Gruplar: Günlük İşler · İnsanlar · Program & İçerik · Ayarlar & Kurulum (KARAR 1). Salt-frontend (`(admin)/layout.tsx`).
- **v1 #11 — sertifika rozeti (backend #40 + çatı #77):** ✅ TAMAMLANDI, canlıda. **KİŞİ-GENELİ:** kişi HERHANGİ bir kurumda sertifikalıysa mentör havuzunda "✓ Sertifikalı" görünür — `TenantMembership.isCertified` üzerinden `some()` ile türetilir. `UserProfile.isCertified` **bakımsız** (hiç yazılmıyor) olduğu için kullanılmadı (kod kanıtıyla; migration gerekmedi).
- **v1 #10 — durum rozeti:** ✅ **ZATEN MEVCUTTU** (kod gerçeği — yol haritasında ⏳ görünüyordu ama yanlıştı). Mentör + menti havuz tablosunda "Durum" sütunu `APPROVAL_META` ile Onaylı/Bekliyor/Reddedildi gösteriyor (`mentor-havuzu/page.tsx`, `menti-havuzu/page.tsx`); admin-only. Yeniden yapılmadı, teyit edildi.
- **Raporlar (çatı #78 + #79):** değerlendirme/test/soru envanteri (`docs/raporlar/degerlendirme-test-soru-envanteri-2026-08-15.md`) + içerik dökümü (`docs/raporlar/icerik/`) + derinleştirilmiş eksik analizi (`docs/raporlar/eksikler-derinlestirilmis-2026-08-15.md`). Canlı DB salt-okuma sayımıyla seed↔canlı tutarlılığı doğrulandı.
  - ⚠️ **Kritik tespit:** sertifika bankası kodda 20 senaryo ama **canlıda yalnız 5 soru** (seed edilmemiş). Ayrıca STK-custom canlıda 1 (envanterin "0"ı düzeltildi). Detay: eksikler raporu.

## ✅ BU OTURUM — v1 İŞLERİ MERGED, CANLIDA (2026-08-15)
> ⚠️ GÜNCELLEME (2026-08-15, merge turu): **4 kod PR sırayla MERGED, canlıya deploy oldu** (#38→#73→#39→#74, `--merge`).
> Submodule TAM SENKRON (`379658a`). İki repo main CI yeşil. Regresyon testleri (oauth-kvkk-consent, mentor-matches, disc-visibility)
> CI Integration suite'te geçiyor. Açık PR yalnız bu docs (#72). **Aşağıdaki maddeler artık "tamamlandı" — merge oldu.**
> ---
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
