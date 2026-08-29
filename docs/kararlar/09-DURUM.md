# 09 — GÜNCEL DURUM (ŞU AN NEREDEYİZ)

**🔄 YAŞAYAN** (canonical: güncel durum) · **Son güncelleme:** 2026-08-29

> **⚡ ŞU AN — FAZ 3c: GÜVENLİK KAPANIŞ → FAZ 3 KAPANDI (2026-08-29, backend PR #61 + çatı PR — MERGE ETME):** Faz 3'ün son turu (3a middleware + 3b yetki haritası + 3c). **2 iş:** **DK1** platform `dashboard`+`tenants/[id]` sayfaları `.status` ile 401/403'te login'e yönlendirir (`isPlatformAuthError` helper, eski `message.includes('401')` bozuktu; 6 test) · **G1-26** `POST /self-serve/register` IP-bazlı rate limit (5/dk, CAPTCHA hariç — PO kararı; test 429). **3 TEYİT:** **G1-02** DISC sızıntısı **YOK** (`analyticsRoutes.ts:12` requireSelfOrAdmin + menti-facing DTO disc strip + counterpart select'leri disc'siz) · **G1-19** kalite çarpanı **çift-çarpım YOK** (`scoring.ts:109` base×qm + `matching.ts:307` bonus×qm, ayrı bileşen 1'er kez; keşif iddiası yanlıştı) · **G1-14/15** denetim izi çoğu VAR (SystemLog+platformAudit+Consent tablosu), tek gerçek gap `updateTenantSettings` → AUDIT eklendi (PII yok); kalan minör = madde 137. **Log'da PII YOK.** **Doğrulama:** backend tsc+tsc-test+eslint ✓ · frontend tsc/eslint/vitest 49/49/build ✓ · entegrasyon → CI. Migration/DB/seed YOK. **MERGE EDİLMEDİ.** **[önceki: FAZ 3b ↓]**
>
> **⚡ FAZ 3b: YETKİ HARİTASI + 6 AÇIK KAPATILDI (2026-08-29, backend PR #60 + çatı PR — MERGE ETME):** **3b-1 (denetim, salt-okuma):** 23 route · **187 endpoint** tarandı (📸 kalıcı referans `docs/raporlar/kesif/yetki-haritasi-2026-08-29.md` — "neyin otomatik/neyin elle"). **⭐ Cross-tenant izolasyon SAĞLAM: 0 açık** (merkezi RLS `db.ts:60-64` READ+scoped-model'i otomatik keser; ama `findUnique`+tüm yazmalar+scope-dışı modele DOKUNMAZ → elle sahiplik gerekir). Dağılım 🟢~167·🔵~14·🟡6·🔴0. **3b-2 (kapatma):** 6 tenant-İÇİ peer açığı (madde 131-136 / Y1-Y6) kapatıldı — Y1 `GET /requests` + Y2 `GET /meetings` (non-admin taraf-filtresi), Y3+Y4 `/mentors/:id/filter` (`requireSelfOrAdmin`), Y5 `compute-profile` (self/admin+rol token'dan), Y6 `POST /questions` (global soru yasak). Her fix ayrı commit + **5 IDOR regresyon testi**. **G1-17 → ✅** (admin/platform backend uçları denetlendi, hepsi guard'lı; asıl koruma backend'de). **G1-23 → 🗑️ geçersiz** (guard var). **G1-04 → yeniden tanım** (tenant açığı değil). Kırılan akış yok (FE `GET /requests` kullanmıyor; meetings/mentor kendi id'siyle çağırıyor; questions `tenantScoped:true`). **Doğrulama:** backend tsc+tsc-test+eslint ✓; entegrasyon (IDOR) testleri lokalde canlı-Neon guard'ıyla durur → kanıt CI. Migration/DB/seed YOK. **MERGE EDİLMEDİ.** **[önceki: FAZ 3a ↓]**
>
> **⚡ FAZ 3a: MIDDLEWARE (G7-04 ✅ + G1-17 yeniden tanım) (2026-08-29, çatı PR — MERGE ETME):** Frontend-only (backend DOKUNULMADI → pointer yok). **G7-04 ✅:** `frontend/src/middleware.ts` — `www.sivilkapasite.org → sivilkapasite.org` **301** (yol+query korunur; apex/localhost döngü koruması; matcher `_next`/`api`/statik muaf). **⭐ G1-17 middleware ile ÇÖZÜLEMEDİ (yeniden tanım → Faz 3b):** auth cookie'leri backend origin'inde (`api.sivilkapasite.org`), frontend origin'i (`sivilkapasite.org`) ALMAZ (parent domain paylaşımı yok, SameSite=Strict); access token yalnız bellekte → middleware token/rol OKUYAMAZ. JS-yazılabilir rol çerezi REDDEDİLDİ (sahte güven). **Gerçek koruma = BACKEND yetki denetimi** → Faz 3b (admin/platform endpoint audit, G1-23 ailesi). **EK:** `platform/layout.tsx` istemci guard'ı YOKTU → eklendi (`/health` ile oturum doğrula, 401/403 → login; login muaf, döngü yok) · `(admin)` guard yorumu gerçekle güncellendi · `lib/api/platform.ts` hataya `.status` iliştirildi. **🆕 Bulgu (DK1):** dashboard 401-yönlendirmesi latent bug (mesaj-tabanlı tespit; `.status` ile düzeltilecek). **Doğrulama:** frontend tsc/eslint ✓ · vitest **43/43** (5 yeni middleware testi) · `next build` ✓ (Middleware 34 kB). ⚠️ CANLI SİTE etkiler (www yönlendirme) — matcher dar, test edildi. **MERGE EDİLMEDİ.** **[önceki: G1-05 ↓]**
>
> **⚡ G1-05: KVKK SELF-SERVİS HAK EKRANI (2026-08-29, backend PR #59 + çatı G1-05 PR — MERGE ETME):** Kullanıcı artık **kendi verisini indirebilir + hesabını kapatabilir** (önce yalnız ADMIN çağırabiliyordu). **Backend (yeni uçlar, migration YOK):** `GET /api/me/data-export` — userId **TOKEN'dan** (gövdeden değil → IDOR yapısal imkânsız); profil + rızalar (denetim izi) + eşleşme talepleri + **mesaj SAYISI** (içerik YOK — karşı taraf PII'si sızmasın). `POST /api/me/delete-account` — gövdede **teyit e-postası** (yanlışlıkla tetikleme önlemi) → `hardDeleteUser` anonimleştirir (madde 39; silmez), oturum düşer, refresh cookie temizlenir. **Güvenlik:** son-admin guard `isSoleActiveTenantAdmin` (kurumun tek aktif ADMIN'i kendini kapatamaz → 409) · `anonymizeUser` içinde **ACIK_RIZA `revokeConsent`** ile geri çekilir (satır SİLİNMEZ, revokedAt dolar; AYDINLATMA geri çekilmez) · per-user rate limiter. **FE:** profil altında `DataPrivacySection` — "Verilerimi indir" (JSON blob) + "Hesabımı kapat" iki-adımlı onay (sade Türkçe uyarı → e-posta teyidi), KVKK metnine link. **Doğrulama:** backend tsc/tsc-test/eslint ✓ · frontend tsc/eslint/vitest 38-38/build ✓ · **entegrasyon testleri (`tests/me-data-rights.test.ts`) lokalde canlı-Neon guard'ıyla durdu (TEST_DATABASE_URL yok) → gerçek kanıt CI.** **madde 97 KAPANDI.** #110/kvkk-metinleri DOKUNULMADI. **[önceki: G1-07 B2 ↓]**
>
> **⚡ G1-07 TUR B2: CONSENT BACKFILL CANLIYA YAZILDI (2026-08-28, CANLI DB, docs PR — MERGE ETME):** Branch `docs/s23-b2-2026-08-28` (**PR #134**, yalnız belge — kod değişmedi). **`backfill-consent.ts --apply` → 5 ACIK_RIZA satırı CANLIYA yazıldı** (5 user + 0 tenant). **Doğrulama (SELECT):** Consent=**5** (yalnız ACIK_RIZA — **AYDINLATMA YAZILMADI**) · source=BACKFILL, version=v1.0-legacy, hepsi aktif (revokedAt null) · **grantedAt==kvkkConsentAt 5/5** · ⭐ **User/Tenant/kvkkConsentAt DEĞİŞMEDİ** (6/2/5/0) · **idempotens teyitli** (ikinci dry-run=0). **G1-07 CANLIDA TAM DEVREDE** (Tur A kod + B1 migration + B2 backfill). **Kalan (ayrı):** CONSENT_VERSION→G1-10 · G1-08 OAuth rıza UI (servis hazır) · G1-05 self-servis FE. **[önceki: B1 ↓]**
>
> **⚡ G1-07 TUR B1: CONSENT MIGRATION CANLIDA (2026-08-28):** ⚠️ **İlk CANLI DB migration'ı.** Branch `docs/s23-b1-2026-08-28` (**PR #133**, yalnız belge — kod değişmedi, backend commit YOK). **Consent migration `20260828000000_add_consent` CANLI Neon'a (`ep-fancy-tooth-ab4u5xhr`) uygulandı** (`prisma db execute --file` + `migrate resolve --applied`; `migrate status`="up to date"). **Doğrulama (SELECT):** Consent tablosu (9 sütun) + `ConsentType`(AYDINLATMA/ACIK_RIZA) + `ConsentSource`(FORM/OAUTH/SELF_SERVE/BACKFILL) + 3 index + 2 FK oluştu · ⭐ **ön-sayımlar DEĞİŞMEDİ** (User **6** · Tenant **2** · User.kvkkConsentAt-dolu **5** · Tenant.kvkkConsentAt-dolu **0** — migration öncesiyle aynı → veriye DOKUNULMADI) · Consent = **0 satır** (boş). **Backfill DRY-RUN: 5 satır yazılacak** (5 user+0 tenant; tutarlı). **⚠️ `--apply` ÇALIŞTIRILMADI** — B2 ayrı tur, PO onayı. Migration additive (yıkıcı komut yok). **Kalan B2 (S23):** backfill `--apply` (5 ACIK_RIZA). **[önceki: Tur A ↓]**
>
> **⚡ G1-07 CONSENT MODELİ TUR A (2026-08-28, KOD DEĞİŞTİ, MERGE EDİLDİ #58/#132):** Branch `feat/g1-07-consent-modeli-2026-08-28` (backend **PR #58** + çatı **PR #132**; temiz main `b687aa9`'dan). **Tipli+sürümlü KVKK rızası KODLANDI (canlıya migration UYGULANMADI):** `Consent` tablosu (şema + Neon-safe additive migration `20260828000000_add_consent`, **ÇALIŞTIRILMADI**, yıkıcı komut YOK) · `consentService` (record/getActive/getAll/revoke/hasValid + `CONSENT_VERSION='v1.0'`) · **dual-write** (normal+self-serve+OAuth → AYDINLATMA+ACIK_RIZA; user.create'ler transaction'a sarıldı, `kvkkConsentAt` korundu; OAuth yalnız ilk kayıt) · **backfill** (`scripts/backfill-consent.ts`, yalnız ACIK_RIZA, dry-run default, **HİÇBİR MODDA ÇALIŞTIRILMADI**) · testler (consentService+dual-write entegrasyon, backfill birim DB'siz). **HİÇBİR DB KOMUTU çalıştırılmadı** (yalnız prisma validate/generate/format/migrate-diff = salt-okuma). **CI PROVASI:** CI test-DB'sinde `migrate deploy` migration'ı uygular + testler koşar → CI yeşilse SQL doğru. **Kalan Tur B (S23, PO onayı ZORUNLU):** migration + backfill canlıya (⚠️ TEK BAŞINA). Keşif: 3 rıza-yazma yolu + kritik guard `platformTenantController:203` (dual-write'la korundu). Lokal: tsc/tsc-test/eslint ✓ (integration CI'da, TEST_DATABASE_URL yok). Sapma: backfill `.ts` (tsx). #110 ELLENMEDİ · kvkk-metinleri DOKUNULMADI. **[önceki tur ⤵]**
>
> **⚡ FAZ 2 GÜVENLİ KALEMLER + CONSENT PLANI (2026-08-28, MERGE ETME):** Branch backend `feat/faz2-g1-06-feedbacklog-purge` (**PR #57**) + çatı `feat/faz2-kvkk-safe-2026-08-28` (**PR #131**; #130 üstünde — doğru pointer + S22 taşır). **Yapıldı (migration'sız):** **G1-06** FeedbackLog 3-yıl otomatik imha (`gdprService.purgeExpiredData`, createdAt+cutoff, şema YOK; Message → `TODO(G1-10)` bilinçli yazılmadı) · **G1-01** kayıt+STK kutusu metni 18+'yı AÇIKÇA öne çıkarır (tek kutu, migration YOK; gerçek yaş alanı G1-10'a) · **page.tsx metadata** eski "İnsan Kimyasıyla" → yeni marka (DISC refleri dokunulmadı, ayrı iş). **G1-07 TASARIM:** consent modeli planı belgelendi (`konu/consent-modeli-plani-2026-08-28.md`, 📸) — tipli+sürümlü `Consent` tablosu, backfill YALNIZ ACIK_RIZA (AYDINLATMA geçmişe yazılmaz), geri-çekme = pasifleştir (otomatik anonimleştirme YOK), migration adım+rollback. **Migration ÜRETİLMEDİ/ÇALIŞTIRILMADI** (schema.prisma DOKUNULMADI). **BEKLEYEN (ayrı turlar):** G1-07 uygulama (⚠️ migration, PO onayı) · G1-08 OAuth rıza · G1-05 self-servis FE. **Doğrulama:** backend tsc/eslint ✓ · frontend tsc/vitest 38-38/build. #110 ELLENMEDİ · kvkk-metinleri DOKUNULMADI. Kırık link: 0.
>
> **⚡ ŞU AN — FAZ 1b KOD TEMİZLİĞİ (2026-08-28, KOD DEĞİŞTİ):** Branch backend `feat/faz1b-llmretry-sil-2026-08-28` (**PR #56**) + çatı `feat/faz1b-kod-temizligi-2026-08-28` (**PR #129**; temiz main `e5fcf66`'ten, #128 MERGED). ⚠️ **GÜNCELLEME (2026-08-28): #56 + #129 MERGED** (backend main `303da85` · çatı main `e0e2ffa`). #129 pointer re-bump'tan ÖNCE merge edildiği için çatı main pointer'ı geçici `0cb237c` (backend feature commit) gösterdi — **ağaç doğruydu (llmRetry yok), yalnız pointer sarktı.** Ayrı `chore/faz1b-pointer-s22` turunda pointer `303da85`'e re-bump edildi + S22 ✅ + CLAUDE.md merge-sıra dersi (**PR açık, MERGE ETME**). **Yapıldı:** **G10-01** `llmRetry.ts` SİLİNDİ (0 import, tüketici `matchReason.ts` yok; backend/CLAUDE.md 3 bayat ref güncellendi) — `MeetingScheduler.tsx` **SİLİNMEDİ** (yarım özellik: `/availability` endpoint'i var, bağlanmayı bekliyor) · **G6-07** 5 kullanılmayan @radix-ui paketi çıkarıldı (build YEŞİL, 41 transitif kalktı) · **G7-12** HeroSection H1 → "Mentörlük programınızı zahmetsizce yönetin" (alt metin PO'ca kesinleşmedi → dokunulmadı) · **G7-13** yumuşak lacivert tema **yönü belgeye** işlendi (`06-tasarim-ux`; KOD YOK, uygulama G7-11 ile) · **G8-06** 12 merged yerel dal silindi (#110 + unmerged korundu; **uzak dallar → PO onayı**). **Doğrulama:** DB-güvenli verify (1-4) YEŞİL — backend tsc/tsc-test/eslint(0 err) · frontend tsc/vitest 38-38/build. Adım 5 (entegrasyon) lokalde TEST_DATABASE_URL yok → CI'da. **Kapsam dışı not:** `page.tsx` metadata title'ında eski "İnsan Kimyasıyla" ibaresi (SEO başlığı, ayrı karar — PO). #110 ELLENMEDİ · kvkk-metinleri DOKUNULMADI · migration/seed/DB YOK. Kırık link: 0.
>
> **⚡ ŞU AN — OTURUM TEZİ + G3-15 TAŞIMASI (2026-08-28, yalnız-belge, PR açık — MERGE ETME):** Branch `docs/oturum-tezi-2026-08-28` (temiz main `71ec51c`'ten; **#127 MERGED**). Bu oturumun *muhakemesi* ayrı 📸 belgeye kaydedildi → **`devir/08-oturum-tezi-2026-08-28.md`** (8 bölüm): büyük dönüşlerin neden'leri (D1 DISC bırakıldı · D2 görünen-yüz≠motor · D3 Likert→senaryo · D4 karakter %50→%25 · D5 sertifika=öğretim · D6 manuel-eşleştirme yok) · yanlış çıkan varsayımlar Y1-Y5 (dürüstlük kaydı) · PO gerekçeleri · 7 yöntem dersi M1-M7. Amaç: bilanço teşhisi "NİYET BELGELENMEMİŞ" boşluğunu kapatmak — **yeni karar/yorum ÜRETİLMEDİ** (canonical: tasarım belgesi + kartlar). **G3-15 taşıması (PO kararı):** yazım hataları Faz 1b/1 → **Faz 6** ("sorular Faz 6'da baştan yazılacak, silinecek metni düzeltmek anlamsız") → G3-15 kartı + 00-ONCELIK-SIRASI + 10-yol güncellendi. Senkron: 00-INDEX + 07-oturum-gunlugu + bu blok. **Kırık link: 0.** Kod/DB/seed DEĞİŞMEDİ · #110 ELLENMEDİ · kvkk-metinleri DOKUNULMADI.
>
> **⚡ ŞU AN — FAZ 1a BELGE DÜZENİ (2026-08-28, yalnız-belge, PR açık — MERGE ETME):** Branch `docs/faz1a-belge-duzeni-2026-08-28` (temiz main `7192606`'dan; #126 MERGED). **G9 belge-düzeni 12 kalem uygulandı** (kod YOK): **G9-03** 5 bayat satır üstü-çizili `[ESKİ]` damgası + ⚠️ desen (konu/03,04,05,08+dm) → kök `CLAUDE.md` "Belge Düzeltme Deseni"ne ⭐ KALICI KURAL eklendi · **G9-04** AdminAuditLog KANIT: model YOK, `SystemLog` (schema:640); belge düzeltildi · **G9-02** registerMessages "planlanan, kodda yok" · **G9-15** model yönlendirmesi 5 belgeden çıkarıldı · **G9-06** durum-panosu 🔄→📸 · **G9-05** ⚠️ SAPMA: eski çelişki blokları zaten kapanmış (T1-B3:90) → arşive taşıma yerine uzlaştırma notu · **G9-08/16+09+13** 8 belge arşive taşındı (git mv: icerik/ 6 döküm + PROJECT_STATUS + admin-panelleri) + link güncelleme · **G9-10** INDEX tamamlandı (G1-G11+OKUMA-REHBERI+eslestirme-motoru+arsiv/icerik) + 4 üst-etiket · **G9-14** kişi adı: gövede 0 (tek ad "…Ata" yalnız `kvkk-metinleri/`'nde, yasal → DOKUNULMADI). **Kırık link: 0** (python taraması). docs .md: 130. 12 G9 kartı ✅. **Kod temizliği (G10-01/G6-07/G8-06/G3-15/G7-12/G7-13) = Faz 1b, AYRI TUR.** G9-11/12/07 şimdilik alınmadı. 122/123 ✅.
>
> **⚡ ŞU AN — ÖNCELİK DÜZELTMELERİ (2026-08-28, yalnız-belge, PR #126'ya eklendi):** PO iki teyit noktasını karara bağladı. **(1) G2-01..05 → 🗑️ GEÇERSİZ** (DISC matrisi/anti-match/tiebreak/%60-40 onay noktaları; DISC bırakıldı, Big Five'a geçildi — tasarım B9). **(2) G9-05 notu düzeltildi** (yanlışlıkla sertifika/anket yazılmıştı → belge-hijyeni notuyla değiştirildi; sertifika/anket zaten G3-04/G3-13 kartlarında). **(3) Taşımalar:** G1-01→Faz 2 (KVKK), G3-05→Faz 6, G4-39→Faz 7. **Revize dağılım (kod-kutusu doğrulandı): 184 = 87 işleme-al / 87 şimdilik / 8 geçersiz / 2 keşif.** Faz 8'de G2-11/G8-13/G8-14 kaldı. Öncelik belgesi + 10-yol + 00-PO-KARARLARI güncellendi. Kod/DB DEĞİŞMEDİ. Yeni PR açılmadı (#126'ya commit).
>
> **⚡ ŞU AN — 8 BOŞ KART + ÖNCELİK SIRALAMASI (2026-08-28, yalnız-belge):** Branch `docs/oncelik-siralama-2026-08-28` (temiz main `90bb7d4`'ten; **#124 + #125 MERGED**). PR açık — **MERGE ETME.** **8 boş kart PO'ca bağlandı:** G3-08/G4-01/G4-24/G8-08/G9-05 işleme-al · G4-11/G4-12 şimdilik · G3-11 geçersiz · +G4-10 PO-teyit (keşif). **Yeni dağılım (TAM SAYI, kod-kutusu doğrulandı): 184 = 92 işleme-al / 87 şimdilik / 3 geçersiz / 2 keşif / 0 boş.** **S17 ✅** — öncelik sıralaması yapıldı → yeni belge `../raporlar/bilanco/kararlar/00-ONCELIK-SIRASI-2026-08-28.md` (8 faz + 🟣 PO-park + bağlı işler) + `10-yol-haritasi` "KOD İŞ SIRASI" bölümü. ⚠️ **DURAK:** 11 işleme-al kart PO'nun faz listesinde tek tek anılmamıştı → kaybolmasın diye Faz 8'e eklendi (PO teyidine açık; detay öncelik belgesi). Kod/DB DEĞİŞMEDİ.
>
> **⚡ ŞU AN — DEĞERLENDİRME/EŞLEŞTİRME TASARIM BELGESİ (2026-08-28, yalnız-belge, iki tur):** ⚠️ GÜNCELLEME (2026-08-28): **PR #125 MERGED (`b212507`)** — "açık" ibaresi bayat, tasarım belgesi artık main'de. Branch `docs/tasarim-belgesi-2026-08-27`, ~~PR #125 açık (MERGE ETME)~~. Yeni belge `konu/degerlendirme-sistemi-tasarim-2026-08-27.md` (🔄 YAŞAYAN, **16 bölüm** — Tur A: 1-8, Tur B: 9-16). İçerik: DISC→**Big Five** model kararı · **metafor arketipler** · Likert→**senaryo** ölçme + **çekirdek 12 senaryo (tam metin)** · derinleşme (EN BELİRSİZ boyuttan) · sertifika (hatalı-konu hedefleme) · **eşleştirme algoritması** katman ağırlıkları **%45 hedef/değer · %30 alan · %25 kişilik** (eski %50 karakter araştırmayla düştü) · kişilik içi dağılım + 2 veto · sektör asimetri düzeltmesi · **üç soru** (S1/S2/S3) veri boşluğu · görünürlük/k-anonimlik · süreç (manuel eşleştirme YOK) · göç/kalibrasyon/dürüstlük sınırları · **Bölüm 16 KALEM LİSTESİ (24 kalem).** Kod/DB DEĞİŞMEDİ. **8 açık nokta** (Bölüm 14). Kalemler `00-KARAR-TAKIP`'e girecek (numarayı orada alacak). Söz **S16 ✅** + yeni söz **S21** (profil envanter keşfi — üç soru ön koşulu). madde 101/102/103 + 125-130'a ⚠️ GÜNCELLEME referansı işlendi. Detay: belge + `../raporlar/kesif/eslestirme-motoru-kesfi-2026-08-27.md`.
>
> **⚡ ŞU AN — PO KARARLARI İŞLENDİ (2026-08-27, yalnız-belge):** ⚠️ GÜNCELLEME (2026-08-28): **PR #124 MERGED (`90bb7d4` = güncel main HEAD)** — "açık" ibaresi bayat; 8 boş kart artık bağlandı (üstteki blok). Bilanço 184 karar kartının PO kararları işlendi (branch `docs/po-kararlari-2026-08-27`, ~~PR açık — MERGE ETME~~). **176 karar + 8 boş:** ✅ işleme al 87 (9 çıkış-blokeri dahil) · ⏸️ şimdilik alma 85 · 🗑️ geçersiz 2 (G4-03 manuel-eşleştirme=Ç5 kapandı) · ❓ keşif 2 (G4-09/10 super-admin). **8 kart PO listesinde yoktu → boş** (G3-08/11, G4-01/11/12/24, G8-08, G9-05). Sync: **madde 13 (cevap-tipi) ⏸️→✅** (STK anket→answerType migration, G3-04/13); **T8/76 manuel-eşleştirme 🗑️ çözüldü**; SÖZLER +4 (S17-S20: sıralama/super-admin-keşfi/sunucu-sertleştirme/foto-düzenleme). Öncelik SIRALAMA YAPILMADI (10-yol'a eklenmedi). Özet: `../raporlar/bilanco/kararlar/00-PO-KARARLARI-2026-08-27.md`.
>
> **⚡ CLAUDE.md DÜZELTME + KURAL 9-12 (2026-08-27, yalnız-belge):** Branch `docs/claude-md-duzeltme-2026-08-26`, iki PR açık (MERGE ETME): **backend #55** (`backend/CLAUDE.md` 6 bayat kod-gerçeği iddiası grep-kanıtlı düzeltildi: 5-model→38, silinmiş iceBreaker/matchReason çıkarıldı, LLM içsel çelişki tek ifade, llmRateLimiter kaldırıldı, etiket 50→80) + **çatı** (kök `CLAUDE.md`: eu-west-2 "İrlanda"→Londra/BK; **KURAL 9-12 yürürlüğe alındı** — KURAL 8 ardına; `00-KARAR-TAKIP` **madde 124 ✅** + **"⭐ SONRAKİ-TUR SÖZLERİ" bölümü açıldı**, 10 açık söz taşındı). `registerMessages.ts` (frontend) + `assertTestDatabase.ts` (tests/helpers) DOĞRU çıktı. Kod/DB DEĞİŞMEDİ; çatı submodule pointer backend #55 feature-commit'e bump (merge sonrası main HEAD'e re-bump). Detay: `../raporlar/bilanco/tekrar-onleme-2026-08-26.md`.
>

> **⚡ ŞU AN — BELGE BİLANÇOSU SNAPSHOT (2026-08-26, salt-belge 4-tur sayım):** Çatı main `d79cb93` (senkron; #119 merged) · backend main/pointer `b433554`. **Yeni belgeler (branch `docs/belge-bilancosu-2026-08-26`, PR açılıyor — MERGE ETME):** `docs/raporlar/bilanco/` altında nihai rapor + karar defteri + PO özet + tekrar-önleme + 16 bölüm defteri. **Sonuç:** tüm docs (71 belge, 10.473 satır) + `CLAUDE.md` okundu → **≈259 benzersiz kalem** [⚠️ DÜZELTME (2026-08-27): "196" YANLIŞTI → gerçek ≈259, bkz. `../raporlar/bilanco/kararlar/00-KATLAMA-IZI-2026-08-27.md`]; 21 numara adayı → **NUMARALANDI (104-124, PO talimatı, `00-KARAR-TAKIP` F.6)**, hepsi ⬜ AÇIK (PO önceliklendirmedi), 10-yol'a eklenmedi; 15 tutulmamış söz; ~29 unutulmuş erken niyet; 6 çelişki (5 kod-hakemli); ~20 hayalet-tamamlanmış. `enneagramWing` kod-hakem: yarım-bağlı yaz-echo-alanı. KURAL 9-12 önerisi (yürürlükte DEĞİL). Kod/DB DEĞİŞMEDİ. Detay: `../raporlar/bilanco/belge-bilancosu-2026-08-26.md`.
>
> **⚡ İÇERİK KEŞFİ SNAPSHOT (2026-08-26, salt-belge tur):** Çatı main `27542ef` · backend main/pointer `b433554` (senkron). **Yeni belgeler (branch `docs/icerik-kesfi-2026-08-26`, PR açılıyor — MERGE ETME):** kod-kanıtlı tam soru dökümü + PO işaretleme dosyaları. Kod gerçeği: **DISC 32 · SJT 3 (OCEAN) · sertifika 20 · öğrenme 13.** Bulgular: **#31 içeriği YOK (sıfırdan)** · psikometrik gerekçe **BELGELENMEMİŞ** · **SJT/OCEAN canlı eşleştirmede okunmuyor** (m101) · CORE-eşiği tutarsızlığı (m102). Yeni madde **101/102/103**. Kaynak: `../raporlar/icerik/tam-soru-dokumu-2026-08-26.md` + PO: `sorular-po-inceleme` / `eslesme-uyum-po-inceleme`. **⏳ Canlı sayılar TEYİT GEREK** (kuyrukta; DB'ye sorulmadı). Kod OKUNDU, değiştirilmedi.
>
> **⚡ MERGE TURU SNAPSHOT (2026-08-26, git doğrulandı):** Dört PR MERGED → **çatı main HEAD `71bac0c`** (#116 + #117), **backend main HEAD `b433554`** (#53 `2caa7bb` + #54). **Submodule pointer bump PR #118 MERGED** (`chore/pointer-bump-53-54`: `838d128`→`b433554`, ileri-sarım; çatı main sonrasında `27542ef`, pointer senkron). İki repo main CI **yeşil.**
> · **✅ CANLIDA (backend autodeploy):** **madde 95** kalibrasyon aktör izi (actorName yalnız AD, tenant-izolasyon) · **madde 92** KVKK Londra/BK + veri sorumlusu (docs) · ⭐ **madde 93/39 TAM ANONİMLEŞTİRME + hardDelete→anonymize.**
> · ⚠️ **DAVRANIŞ DEĞİŞİKLİĞİ — ANONİMLEŞTİRME ARTIK CANLIDA:** hesap anonimleştirme/"silme" artık bağlı **serbest metni** (mesaj `[silindi]` iki-taraflı, görüşme/telefon/feedback/talep/şikayet/sözleşme), **fiziksel avatar dosyasını** ve **oturum/token'ı** (membership pasif → eski token 403) temizler. `hardDelete` **anonymize'e yönlendirilir** — kullanıcıya "silindi" DENMEZ (ACCOUNT_CLOSED_MESSAGE). **Sınır:** userId (cuid) kalır → "tam geri-döndürülemez" vaadi YOK (hukukçu **H-9**). Gelecek oturumlar bunu bilmeli.
> · **Açık PR (merge turu sonrası):** pointer PR `chore/pointer-bump-53-54` **#118 MERGED** (PO) → geriye **#110** (analytics, 🛑 kilitli) kaldı; 5 iş PR'ı MERGED. *(Sonraki içerik-keşfi turunda ayrıca `docs/icerik-kesfi` PR'ı açıldı — üstteki snapshot.)*
> · **Kalan iş:** madde 97 (FE hesap-kapatma akışı) · H-9 (hukukçu) · küçük borç 98/99/100 (audit void / SystemLog purge izi / meta indeks).
>
> **⚡ SNAPSHOT (2026-08-26, KVKK+madde 95+anonim — iş turu, git):** Çatı main HEAD **`f9c1a34`** (#52 pointer-bump merged) · backend main HEAD/pointer **`838d128`** (senkron). **Bu tur 3 iş + keşif:**
> · **FAZ 0 — KVKK (madde 92 ✅):** sunucu ülkesi **Londra/Birleşik Krallık** (AWS `eu-west-2`, AB üyesi DEĞİL; eski "İrlanda" hatalıydı) + veri sorumlusu kimliği (gerçek kişi — şirketleşene kadar; PO kararı) yasal metinlere işlendi; Word yeniden üretildi. Docs PR (bu turda açılıyor).
> · **FAZ 1 — madde 95 (🔀 PR'da, MERGE OLMADI):** kalibrasyon "son değişiklik" aktör izi. Backend **#53** (`getLastWeightChange` — actorName yalnız AD, tenant-izolasyonlu, migration YOK) + çatı **#116** (FE satırı). CI bekliyor.
> · **FAZ 2 — TAM ANONİMLEŞTİRME (madde 93+39) ✅ UYGULANDI (🔀 PR'da, MERGE OLMADI):** DURAK-1'de PO **1·1·1 = (c)+(iii)+(2)** seçti. Backend **#54** (MIGRATION YOK): bağlı serbest-metin temizlenir (mesaj `[silindi]` iki-taraflı, görüşme/telefon/feedback/talep/şikayet/sözleşme), fiziksel avatar dosyası silinir, **oturum/token iptal** (membership pasif + token sil → eski token 403, test), `hardDelete`→anonymize (kullanıcıya "silindi" DENMEZ). **Sınır (dürüst):** userId (rastgele cuid, kişisel değil) kalır → yasal metin "tam geri-döndürülemez" vaadi VERMEZ; hukukçuya **H-9** soruldu. KVKK metinleri (05/06/00-AVUKAT) + Word güncellendi. Yeni iş: **madde 97** (FE hesap-kapatma akışı yok).
> · **Açık PR (bu tur):** backend **#53** (madde 95) + **#54** (anonim) · çatı **#116** (FE madde 95) + **#117** (KVKK docs, FAZ 0+2+senkron) + önceki **#110** (analytics kilitli). **HİÇBİRİ MERGE EDİLMEDİ** — merge PO'da. Pointer bump = backend #53/#54 merge sonrası.
>
> **⚡ ŞU AN — GÜNCEL SNAPSHOT (2026-08-25, git+API doğrulandı):** Çatı main HEAD **`9bb02b7`** (#112 merged) · backend main HEAD **`b4b6d66`**
> (#51 merged) · **çatı submodule pointer:** bump PR **#113** açık (`ba92dfa`→`b4b6d66`, ileri-sarım — merge PO'da). **Açık PR:** çatı #113 (pointer) + #110 (analytics, 🛑 merge-kilitli). **Repolar PRIVATE** (PO yaptı).
> **#51 CANLIDA (backend autodeploy):** madde 38 `updateUser` PII sızıntısı · 68/80/88/89 platform PII maskeleme · 79 görüşme limiti · 69 validation mesajı · 70 adaptive progress · 93 anonimleştirme (kısmi). **KALAN:** madde 39 (KVKK hardDelete FK, migration) · madde 70 FE guard (ayrı çatı PR) · 9a/9b kalibrasyon (migration'sız, #51 sonrası temiz main'den) · madde 93 tam-anonim (mimari).
>
> **⚡ ŞU AN — SNAPSHOT (2026-08-26, git+API):** Çatı main HEAD **`6e6e798`** (#114 merged) · backend main HEAD **`838d128`** (#52 merged) · **çatı pointer:** bump PR `chore/pointer-bump-52` açık (`b4b6d66`→`838d128`, ileri-sarım — merge PO'da). **9a/9b/madde 70 CANLIDA:** motor kaydedilen ağırlığı okur (madde 87 çözüldü) + tenant manuel ağırlık ayarı + progress guard. **⭐ DURAK-A (PO Neon prod salt-okuma):** özel ağırlık kayıtlı tenant = **0** → 9b hiçbir sıralamayı değiştirmedi (tümü %60/%40 varsayılan). **Kalan:** madde 95 (kalibrasyon 'kim' izi — yarım) · madde 39 KVKK hardDelete (migration) · madde 93 tam-anonim. **Açık PR:** pointer-bump-52 + #110 (analytics kilitli).
>
> **⚡ GÜNCELLEME (2026-08-26, 9a/9b kalibrasyon — KOD, migration YOK):** Temiz main'den (#51 sonrası) 9b+9a yapıldı. **9b:** canlı motor kaydedilen tenant ağırlığını okur (`scoring.ts` opsiyonel ağırlık, default 0.6/0.4=eski davranış; `matching.ts` N+1 yok; regresyon testi) → **madde 87 (ölü yazma) çözülür.** **9a:** tenant manuel ağırlık ayarı (`PUT /algorithm-tuner/weights`; 0.05 katı, %40-70, discWeight=1-sector, tenant-izolasyon, tüm adminler, SystemLog.meta audit). **MIGRATION GEREKMEDİ** (tenantVocabulary Json; keşif doğruladı). **FE:** kalibrasyon +/− UI + madde 70 progress guard kaldırma. **PR'lar (MERGE OLMADI):** backend **#52** (CI yeşil) + çatı **#114**. ⚠️ **DURAK-A (PO, merge öncesi):** özel ağırlık kayıtlı tenant sayısını salt-okuma kontrol et (0 ise 9b risksiz). **Açık PR:** #52+#114 (kalibrasyon) + #110 (analytics kilitli).
>
> **⚡ ŞU AN (git ile doğrulandı, 2026-08-23):** Çatı main HEAD `753c545` (#95) · backend main HEAD / submodule pointer `b6187c1`
> (senkron) · **açık kod PR: 0/0, masa temiz.** Bu sabah **#12 DISC çoklu harf** (backend #47 + çatı #93 + docs #94) ve
> **#37 login enumeration sertleştirme** (backend #46 + çatı #91 + docs #92) MERGED → **canlıda.** Açık docs PR: keşif
> raporları (#96 tam-envanter · #97 belge-mimarisi) — merge PO'da, kod değil.
>
> **⚡ GÜNCELLEME (2026-08-19, sonraki tur):** Yukarıdaki snapshot bayat. Bu sabahki docs PR'ları (#96/#97) +
> #99 karar-takip MERGED → çatı main HEAD **`9a580a5`**, backend main HEAD/pointer **`b6187c1`** (senkron).
> **YENİ AÇIK KOD PR (bu tur, #7 Aşama 1 — MERGE OLMADI):** backend **#48** + çatı **#100** (FE + pointer bump).
> Detay: aşağıdaki "🔀 #7 AŞAMA 1" bölümü.
>
> **⚡ GÜNCELLEME (2026-08-19, merge turu — GÜNCEL SNAPSHOT):** #7 Aşama 1 PR'ları MERGED → **çatı main HEAD `ef2b995`**,
> **backend main HEAD `b5f4b88`**, **submodule pointer `b5f4b88` (senkron)**, **açık kod PR 0/0** (git doğrulandı).
> İki main CI yeşil. #7 Aşama 1 artık **CANLIDA** (autodeploy). Detay: aşağıdaki "🔀 #7 AŞAMA 1" bölümü (✅ MERGED notu).
>
> **⚡ GÜNCELLEME (2026-08-19, küçük işler paketi — ✅ MERGED, CANLIDA — GÜNCEL SNAPSHOT):** #34 + #7(A) + #9-gösterim
> PR'ları MERGED → **çatı main HEAD `0fd4942`**, **backend main HEAD `18cfc42`**, **submodule pointer `18cfc42` (senkron)**,
> **açık kod PR 0/0** (git doğrulandı). İki main CI yeşil. Backend #49 → `18cfc42`; çatı #102 → `0fd4942` (pointer backend main
> HEAD'e bump edildi, ileri-sarım teyitli). Bağlanan uçlar artık **CANLIDA** (autodeploy). Detay: "✅ KÜÇÜK İŞLER PAKETİ" bölümü.
>
> **⚡ GÜNCELLEME (2026-08-19, #37 kurum düzeltme-iste — ✅ MERGED, CANLIDA — GÜNCEL SNAPSHOT):** #37 PR'ları MERGED →
> **çatı main HEAD `2639e2e`**, **backend main HEAD `ba92dfa`**, **submodule pointer `ba92dfa` (senkron)**, **açık kod PR 0/0**
> (git doğrulandı). İki main CI yeşil. Backend #50 → `ba92dfa`; çatı #104 → `2639e2e` (pointer bump, ileri-sarım teyitli).
> 🛑 **MIGRATION CANLIDA:** `CORRECTION_REQUESTED` enum + `Tenant.correctionNote` (canlı DB'de VAR, teyitli; Tenant 3→3).
> Mail altyapısı hazır ama **GÖNDERİM KAPALI** (`TENANT_NOTIFICATIONS_ENABLED=false`). Detay: "✅ #37 KURUM DÜZELTME-İSTE" bölümü.
>
> **⚡ GÜNCELLEME (2026-08-23, strateji-denetimi + PO oturumu — GÜNCEL SNAPSHOT):** İki docs PR bu turda işlendi.
> (1) **Strateji↔gerçek denetimi** (`strateji-gercek-denetimi-2026-08-20.md`, salt-okuma): 6 strateji/persona belgesi kodla
> madde-madde karşılaştırıldı — **85 madde, %66 tam var.** PR **#106 → MERGED** (çatı main HEAD **`c747de1`**; backend main/pointer
> **`ba92dfa` değişmedi, senkron**; kod değişikliği YOK, yalnız yeni rapor). İki main CI yeşil.
> **Ana bulgu:** admin tasarım-kartları (6 panel + oyunlaştırma) baştan sona uygulanmış; kalan kopukluk 3 eksende —
> (a) mail/bildirim (37m, en yüksek kaldıraç · 🟠 küme), (b) menti retention inceliği (bekleme anı/ret-yumuşatma/kutlama),
> (c) yönetici kanıt katmanı (rapor export + ivme/oran metrikleri). Öz-doğrulama 2 alt-ajan false-negatif'ini düzeltti
> (mentör DISC aha-kartı + paylaşım aslında VAR).
> (2) **Karar-takip senkronu** (bu docs PR): PO'nun bu oturumdaki kararları `00-KARAR-TAKIP.md`'ye işlendi — 9a (tüm yöneticiler +
> değişiklik izi), 9b (düzeltilecek), K6 (v2), K3 (en son), sektör/etiket (talep-onay), 2a ghost-red (**30 gün uyku modu**),
> #7 otomatik pasifleştirme (varsayılan kapalı), #13 (ertelendi), #31 (felsefe-keşfi sonrası), **DISC-DERİNLEŞME kurgusu**
> (numarasız — eski "#38" etiketi madde-38 güvenlikle çakıştığı için 2026-08-23'te ada çevrildi), Y1–Y7 denetim işleri + 2 keşif turu (içerik-felsefe, belge-düzeni). Detay: `00-KARAR-TAKIP.md` Bölüm B.4 + satır-içi notlar.
>
> **⚡ GÜNCELLEME (2026-08-23, belge-düzeni reorg — salt-docs, KOD YOK):** `docs/kararlar/` ve `docs/raporlar/` şişince
> **alt-klasörlere** ayrıldı (git mv, içerik değişmedi): kararlar → `konu/` + `oz-denetim/`; raporlar → `kesif/` + `kod-denetimi/`
> + `panel/` + `persona/` + `icerik/`. Canonical taşıyıcılar (00-INDEX · 09-DURUM · 00-KARAR-TAKIP · 10-yol-haritasi ·
> 10-yol-tamamlananlar) `kararlar/` kökünde KALDI. 38 tam-yol referansı yeni konumlara güncellendi; 00-INDEX yeni ağaca göre
> yeniden yazıldı; `belge-duzeni-rehberi` Kural 2 alt-klasör genişletmesiyle tazelendi. **Kırık-link taraması: 0** (bayat 2 devir
> işaretçisi de düzeltildi). docs/ dosya sayısı 68 (kayıp yok). PR (docs) — **merge PO'da.** Kod/DB dokunulmadı, #110 ellenmedi.
>
> **⚡ GÜNCELLEME (2026-08-23, tam-belge taraması — salt-okuma keşif, KOD YOK):** Reorg turunda belgeler yüzeysel tarandığından
> içlerindeki kararlar sistematik çıkarılmamıştı. Bu turda **42 içerik belgesi TAM okundu + kod gerçeğiyle çapraz kontrol**
> (7 paralel salt-okuma ajanı) → **13 gerçek yeni kayıp madde** → `00-KARAR-TAKIP.md` **Bölüm F**. Bunların **3'ü 🔴 GÜVENLİK
> canlı-öncesi**: G1 `updateUser` password/PII sızıntısı (`userController.ts:272-277`), G2 `hardDeleteUser` FK-RESTRICT →
> KVKK kalıcı silme çalışmıyor (`gdprService.ts:172-174`), G3 `SuspicionReport` reporter PII maskesiz (`platformController.ts:353`).
> ⚠️ Repolar PUBLIC → önce PRIVATE + düzelt. Yeni rapor: `../raporlar/kod-denetimi/tam-belge-taramasi-2026-08-23.md`.
> MADDE 67 (çerez izni) 10-yol'da VAR (eklenmedi). Kod OKUNDU, değiştirilmedi; DB'ye dokunulmadı.
>
> **⚡ GÜNCELLEME (2026-08-23, niyet envanteri + numaralandırma — salt-docs):** (1) **Kırmızı kural düzeltmesi:** "güvenli seed" listesi
> silinen `seed-questions.ts`'i sayıyordu → gerçek liste `seed-certification`+`seed-learning-journey`+`seed-test-tenant.mjs` (CLAUDE.md+4 belge).
> (2) **Niyet envanteri (5 ajan):** yarım-iş/bağlanmamış-kod kod-arkeolojisi → `00-KARAR-TAKIP` **C.2** + rapor `yarim-is-niyet-envanteri-2026-08-23.md`;
> "~14 FE'siz özellik" → **9 doğrulandı.** (3) **Numaralandırma:** Bölüm F → yol haritası **madde 68-78** (`v1-H`); **#38 çakışması çözüldü**
> (madde 38=güvenlik canonical; DISC işi numarasız "DISC-DERİNLEŞME kurgusu"). (4) **KURAL 7** (taşıyıcı belge iş bölümü) rehbere eklendi.
> (5) `durum-panosu-2026-08-14` 🔄→📸 adayı (Bölüm E). Gerçek statü çelişkisi: 0. Tümü #112'de (merge PO'da).
>
> **⚡ GÜNCELLEME (2026-08-25, KVKK güvenlik turu — KOD + docs):** İlk KOD turu (docs değil).
> **(A) K0 güvenlik düzeltmeleri → backend PR #51 (MERGE OLMADI):** madde 38 `updateUser`/temperament password+PII sızıntısı
> (db.ts global omit `{user:{password:true}}` + explicit select + test) · madde 68 `SuspicionReport` reporter PII maskeleme
> (maskName/maskContact + test). tsc/tsc-test/eslint temiz; DB testleri CI'da (guard). **Çatı submodule pointer'ı DEĞİŞMEDİ** (backend merge olmadı).
> **(B) FAZ B teyitleri (salt-okuma):** T7 opt-in eşleşmeyi bloklamıyor (K2) · `maxMeetingsPerWeek` enforce EDİLMİYOR (madde 79) · 9b indirmesi doğru.
> **(C) KVKK veri aktarım envanteri** (kod-kanıtlı, 2 ajan) → `../raporlar/kod-denetimi/kvkk-veri-aktarim-envanteri-2026-08-25.md`;
> 8 hukukçu sorusu + [PO DOLDURACAK] alanlar. **Yeni maddeler 79-87** (00-KARAR-TAKIP F.5).
>
> **⚡ GÜNCELLEME (2026-08-25, KVKK belge paketi turu — KOD + docs):** (A) **madde 80** (`getPlatformLogs` select + `listUserReports`
> maskeleme) düzeltildi → **backend PR #51'e eklendi** (test, tsc/eslint temiz). Yeni bulgular madde **88** (getPlatformStats recentLogs) +
> **89** (listPendingTenants admin PII). (B) **FAZ D KVKK belge paketi YAZILDI** → `konu/kvkk-metinleri/` **9 belge TASLAK** (envantere
> dayalı, jenerik değil; platform=işleyen/kurum=sorumlu avukat modeli). 8 hukukçu sorusu + [PO DOLDURACAK] + 🔴 sunucu-ülke çelişkisi
> (ülke adı yazılmadı). Yeni maddeler **90** (veri işleyen sözleşmesi entegrasyonu, migration) · **91** (kulüp-tenant aktif edilmez) ·
> **92** (sunucu ülke teyidi). **KALAN:** FAZ E FE entegrasyonu (merge-kilitli PR — hukukçu onayına kadar zaten merge olmaz; ayrı tur).
>
> **⚡ GÜNCELLEME (2026-08-25c, KVKK Word + anonimleştirme teyidi — KOD + docs):** (A) **Anonimleştirme kod teyidi:** `anonymizeUser` kısmi
> (takma-adlaştırma) çıktı → sosyal/avatar/enneagram/discResultCard **eklendi (backend PR #51)**; kalan (mesaj/foto-dosyası/userId-bağı) = **madde 93**.
> Saklama-imha metni "tam geri-döndürülemez" vaadini kaldırıp gerçeği beyan ediyor. (B) **Profesyonel Word paketi** üretildi:
> `konu/kvkk-metinleri/KVKK-BELGE-PAKETI-2026-08-25.docx` (kapak+içindekiler+9 belge+sayfa-no+tablolar+işaret-vurgu; emoji temiz, Türkçe tam;
> üretici `scripts/kvkk-docx-gen.py`, md=canonical). (C) **PO kararı: FE site-entegrasyonu İPTAL** — avukata Word ile gidilecek; `/kvkk /gizlilik /terms` sayfalarına DOKUNULMADI.
>
> **⚡ GÜNCELLEME (2026-08-25d, migration'sız 5 iş — KOD, backend PR #51, MERGE OLMADI):** 4 paralel ajan + 1 CI-fix, hepsi **CI YEŞİL** (357 test):
> **88** getPlatformStats meta çıkarıldı · **89** listPendingTenants admin PII maskelendi (karar: maskele, domain korunur) · **79** haftalık görüşme
> limiti enforce (menti başına · **sabit 7-günlük UTC kova** — ilk CI'da ileri-only pencere hatası teşhis+düzeltildi · iptal/tamamlanan hariç) ·
> **69** validation `message` (FE değişikliği YOK — FE zaten okuyor) · **70** adaptive-test `progress` (migration yok; FE guard ayrı tur).
> Yeni bulgu **madde 94** (listPendingTenants VIEW audit izi, düşük). **Kalan:** madde 70 FE guard kaldırma (ayrı çatı PR) · PR #51 merge PO'da.
>
> **⚡ GÜNCELLEME (2026-08-23, canlı çıkış planı — salt-docs):** Dağınık ~58 açık iş **tek çıkış planına** sınıflandı → yeni canonical
> `00-CIKIS-PLANI.md` (K0-K5 + tur planı). **KATI test:** ~40 "v1" maddenin çoğu çıkışı ENGELLEMİYOR → **gerçek çıkış-bloker: 5 K0**
> (madde 38/68 PII sızıntısı · 39 KVKK silme · repo private · KVKK metinleri) **+ 1 K1** (foto volume) + 2 şüpheli (T7 opt-in, maxMeetings — TEYİT GEREK).
> **İndirilenler (K0/K1→K2):** çerez izni #67 (analytics'siz çıkışta gerekmez), 9b (henüz görünür yalan değil), K3 (~0 kullanıcı), T3, KVKK FE.
> **KURAL 8** (bulgu yaşam döngüsü) rehbere + CLAUDE.md'ye eklendi. Tur sırası: PO manuel (repo private+foto+metin) → güvenlik 38+68 (paralel) → G2 migration (tek başına). Kod OKUNDU, değiştirilmedi.
>
> Bu belge SIK güncellenir — her oturum başında oku, sonunda güncelle. **Sıradaki işler + öncelik:**
> `10-yol-haritasi.md`. **Tarih/SHA katmanı geçmişi (bu belgeden taşındı):** `docs/arsiv/09-DURUM-gecmis-katmanlar-2026-08-19.md`.
> **2026-08-10 öncesi tam geçmiş:** `docs/arsiv/09-DURUM-ve-yolharitasi-arsiv-2026-08-10.md`.
> **Belge denetimi (neden temizlendi):** `belge-denetimi-2026-08-10.md`.

---

## ⚡ TEK BAKIŞTA (şu an — hepsi doğrulanmış)
- **Canlı:** sivilkapasite.org ayakta (Dokploy). **Mail çalışıyor** (generic SMTP relay — Resend/Brevo;
  Gmail App Password kaldırıldı, `emailService.ts`). Forgot/reset-password akışı tam.
- **DB:** Canlı = lokal aynı Neon (`ep-fancy-tooth-ab4u5xhr`). DISC soruları (20) + öğrenme aşamaları (13) yüklü.
- **Backend main HEAD:** `b6187c1` (#46 login enumeration merge) · **çatı main HEAD** `753c545` (#95) · **submodule pointer = `b6187c1`**
  (backend main HEAD ile TAM SENKRON, `git submodule status` + `ls-tree` doğrulandı). **Migration/DB/seed çalıştırma bu turda YOK.**
  > Eski SHA senkron katmanları (her merge turunun tarihsel izi) → `docs/arsiv/09-DURUM-gecmis-katmanlar-2026-08-19.md` (B bölümü).
- **Açık PR:** kod **çatı 0 · backend 0 — masa temiz** (git + `gh pr list` doğrulandı). Açık **docs PR: #96 (tam-envanter keşfi) · #97 (belge-mimarisi keşfi)** — merge PO'da, kod değil.
  > Eski "açık PR" katmanları (her turun tarihsel izi) → `docs/arsiv/09-DURUM-gecmis-katmanlar-2026-08-19.md` (C bölümü).
- **İzole test DB:** `backend/.env.test` + `assertTestDatabase` guard VAR (lokal `verify` güvenli).

## ✅ #7 AŞAMA 1 — DEĞERLENDİRME/METRİK ÖLÜ UÇLARINI BAĞLA — MERGED, CANLIDA (2026-08-19)
> **⚡ GÜNCELLEME (2026-08-19, merge turu):** ~~PR'DA (MERGE OLMADI)~~ → **MERGED, canlıda.** Backend **#48** → backend main `b5f4b88`;
> çatı **#100** → çatı main `ef2b995`; merge sırasında pointer backend main HEAD `b5f4b88`'e bump edildi (ileri-sarım teyitli: `6b84e27` ANCESTOR `b5f4b88`); pointer senkron; iki main CI yeşil. Aşağıdaki bağlanan uçlar artık CANLIDA (autodeploy). MERGE EDİLDİ.
>
> Backend **#48** + çatı **#100** (FE + submodule pointer). Başlangıçta MERGE EDİLMEMİŞTİ (PO inceledi → merge onayı verdi).
> Amaç: yarım kalmış "eşleşme-sonrası değerlendirme + metrik" özelliğinin **migration'sız** uçlarını bağlamak (sıfırdan yazım değil). Tasarım: `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md`.
- **Bağlanan uçlar:**
  1. **Kalite puanı kalıcı yazım** — `computeMentorQualityMultiplier` sonucu artık `TenantMembership.qualityMultiplier`'a event-driven yazılıyor (`persistMentorQualityMultiplier`, feedback gelince). Alan ZATEN vardı; sadece sertifika yazıyordu.
  2. **Yönetici görünürlüğü** — mentör havuzunda "Kalite Puanı" kolonu (5 üzerinden); eşleşmeler sayfasında "Risk" rozeti (İyi/Dikkat/Riskli). Backend: `adminListUsers` kalite + `adminListMatches` risk sinyali (batch).
  3. **Periyodik checkpoint cron** — ölü `findMatchesDueForCheckpoint` günlük cron'a bağlandı (`runCheckpointFeedbackReminderCron`), **LOG-ONLY**.
- **KVKK:** kalite puanı + risk sinyali YALNIZ yönetici endpoint'lerinde; kişi kendi puanını/sinyalini GÖRMEZ. Test: menti/mentör `/api/admin/*` → 403; tenant izolasyonu doğrulandı.
- **Migration/şema/seed: SIFIR.** Canlı eşleştirme sıralaması değişmez (`matching.ts` bu alanı okumaz).
- **Atlananlar (bilinçli):** otomatik pasifleştirme + tenant eşik alanı (şema=migration → Aşama 2); checkpoint cron gerçek bildirim (mail geri-alınamaz + dedup guard'ı şema ister → Aşama 2); `ContextualFeedbackHost` FE bağlama (kullanıcı-bazlı checkpoint endpoint'i + poller yok → Aşama 2/3); menti havuzu kalite kolonu (mentör metriği, menti'de yanıltıcı).
- **Doğrulama:** backend PR #48 CI **yeşil** (entegrasyon+unit CI'da geçti); FE lokal tsc ✓ · vitest 38/38 ✓ · build ✓. Lokal backend entegrasyon testleri TEST_DATABASE_URL guard'ıyla durur (canlıya truncate yok) — asıl kanıt CI.
- **Merge sırası (PO için):** backend #48 merge → çatı pointer'ı backend main HEAD'e bump (`git submodule update --remote backend`) → çatı #100 merge.

## ✅ #37 KURUM DÜZELTME-İSTE — MERGED, CANLIDA (2026-08-19)
> **⚡ GÜNCELLEME (2026-08-19, merge turu):** ~~PR'DA (MERGE OLMADI)~~ → **MERGED, canlıda.** Backend **#50** → backend main `ba92dfa`;
> çatı **#104** → çatı main `2639e2e` (pointer backend main HEAD `ba92dfa`'ya bump, ileri-sarım teyitli: `decfc75` ANCESTOR `ba92dfa`); pointer senkron; iki main CI yeşil. Kod gerçeği main'de + canlı DB'de (enum+kolon) teyitli. Aşağıdaki akış CANLIDA (autodeploy). **Mail GÖNDERİM HÂLÂ KAPALI** (env açılmadı). MERGE EDİLDİ.
>
> Backend **#50** + çatı **#104**. Kurum başvurusu için **onayla / reddet / DÜZELTME İSTE** üçlüsü. Reddetmek yerine revizyon talebi (kişi tarafı `requestCorrection` deseninin kurum karşılığı).
- **🛑 MIGRATION (PO onaylı, canlıya uygulandı):** `TenantVerificationStatus += CORRECTION_REQUESTED` + `Tenant.correctionNote String?`. Additive/nullable, `IF NOT EXISTS` SQL + `db execute` + `migrate resolve --applied` (db push YASAK). **Doğrulama:** Tenant 3→3 (değişmedi), durum dağılımı aynı, `verificationNote` (başvuru kanıtı) EZİLMEDİ — düzeltme notu AYRI `correctionNote`'a yazılır. Migration dosyası: `20260819000000_add_tenant_correction_request`.
- **Backend akış:** platform admin `POST /api/platform/tenants/:id/request-correction` (→ CORRECTION_REQUESTED + not); kurum admini `POST /api/tenants/self-serve/resubmit` (→ PENDING_REVIEW, correctionNote KORUNUR, IDOR-safe); `getMe` additive `tenant` bloğu (correctionNote YALNIZ ADMIN'e).
- **FE:** platform dashboard "Düzeltme İste" butonu + PII uyarılı not diyaloğu; STK admin layout `TenantCorrectionBanner` (durum + tekrar-gönderim formu, destekleyici dil).
- **📧 Mail altyapısı — GÖNDERİM KAPALI (kritik):** `tenantNotifications.ts` 3 Türkçe şablon (onay/red/düzeltme). Gönderim `TENANT_NOTIFICATIONS_ENABLED` env arkasında, **VARSAYILAN false** → gerçek mail GİTMEZ, log-only. **Bu turda açılmadı, canlıya test maili bile atılmadı.** Açma: PO `destek@` + prod SMTP env kurup bayrağı `true` yapacak (madde 37m).
- **Testler:** yetki (platform admin), IDOR (kurum yalnız kendini), durum geçişleri, geçmiş korunuyor, correctionNote görünürlük (ADMIN vs MENTI). Lokalde entegrasyon TEST_DATABASE_URL guard'ıyla durur → kanıt CI.
- **Doğrulama:** backend tsc/tsc-test/lint ✓ · FE tsc ✓ · vitest 38/38 ✓ · build ✓.
- **Bulgu:** iki paralel kurum-doğrulama yolu (`/api/platform/*` FE-kullanımı ↔ `/api/super-admin/verify` testler). Pre-existing duplikasyon, birleştirilmedi.
- **Merge sırası (PO için):** backend #50 merge → çatı pointer bump → çatı PR merge.

## ✅ KÜÇÜK İŞLER PAKETİ — #34 + #7(A) + #9-gösterim — MERGED, CANLIDA (2026-08-19)
> **⚡ GÜNCELLEME (2026-08-19, merge turu):** ~~PR'DA (MERGE OLMADI)~~ → **MERGED, canlıda.** Backend **#49** → backend main `18cfc42`;
> çatı **#102** → çatı main `0fd4942` (pointer backend main HEAD `18cfc42`'ye bump, ileri-sarım teyitli: `8d1d1dd` ANCESTOR `18cfc42`); pointer senkron; iki main CI yeşil. Kod gerçeği main'de doğrulandı. Aşağıdaki uçlar artık CANLIDA (autodeploy). MERGE EDİLDİ.
>
> Backend **#49** + çatı **#102**. Üç açık maddeyi tek turda kapattı; hepsi **migration'sız**, düşük riskli, farklı dosyalar. Sema değişmedi, DB'ye yazılmadı, seed çalıştırılmadı.
- **#34 — Öğrenme yolculuğu tamamlanma görünürlüğü (STK yönetici):** `adminListUsers` select'ine `learningJourneyCompletedAt` eklendi (mevcut tenant-scoped `tenantMembership` batch sorgusundan — qualityMultiplier ile aynı, N+1 yok). Platform admin'de ZATEN vardı; artık STK yöneticisi de menti/mentör havuzunda "Öğrenme Yolculuğu" kolonunda görür (tamamlandıysa tarih rozeti, yoksa "—"). KVKK: Analytical, PII değil. Test eklendi (alan döner + tamamlamayan null).
- **#7(A) — Aday menti kartı "neden uyumlu" gerekçesi:** backend `compatibilityReason`'ı ZATEN üretiyordu (`buildPublicItem`), FE render etmiyordu. Mentör dashboard aday kartında jenerik gerekçe render edildi; `RankedMenti` FE tipine alan eklendi. **⚠️ DISC harfi/tipi EKLENMEDİ** (KARAR 3/5 uzlaştırması PO'da — jenerik metin sızdırmaz).
- **#9-kısmi — Eşleştirme ağırlığı GÖSTERİMİ (ayarlama YOK):** kalibrasyon sayfası ağırlıkları yalnız bekleyen öneri varken gösteriyordu; artık "Mevcut Eşleştirme Ağırlıkları" kartı her zaman %60/%40 + açıklama gösterir. Yeni salt-okuma endpoint `GET /api/admin/algorithm-tuner/weights` (`getAlgorithmWeights` kaynağı). **Ayarlanabilirlik YAPILMADI** (input/slider/kaydet yok) — tenant-bazlı şema alanı + canlı eşleştirme değişikliği gerektirir → PO onaylı migration turu (bkz. 00-KARAR-TAKIP yeni madde a).
- **⚠️ Bulgu (çözülmedi, raporlandı):** canlı eşleştirme yolu (`scoring.ts:96`) ağırlığı **hardcoded 0.6/0.4** kullanıyor; kalibrasyonun sakladığı `getAlgorithmWeights` değerini OKUMUYOR → kalibrasyon şu an efektif olarak dekoratif. Canlı eşleştirmeye dokunulmadı (kural). PO kararı + ayrı tur.
- **Doğrulama:** backend tsc/tsc-test/lint ✓ (0 hata) · FE tsc ✓ · vitest 38/38 ✓ · build ✓. Backend entegrasyon testleri lokalde TEST_DATABASE_URL guard'ıyla durur — gerçek kanıt CI'da.
- **Merge sırası (PO için):** backend #49 merge → çatı pointer'ı backend main HEAD'e bump (`git submodule update --remote backend`) → çatı PR merge.
- **FAZ 4 keşif (kurum başvuru "düzeltme iste"):** salt-okuma yapıldı, kod yazılmadı → bulgular 00-KARAR-TAKIP yeni madde (b)'de.

## ✅ #37 LOGIN ENUMERATION SERTLEŞTİRME — MERGED, CANLIDA (2026-08-19)
> Backend **#46** (`b6187c1`) + çatı pointer **#91** (`af33339`) + docs **#92** (`1cd2c56`) MERGED → canlıda (git doğrulandı). İki repo main CI yeşil.
- **Sorun:** login akışında kimlik doğrulaması BAŞARISIZ olduğunda durum sızıyordu — (1) PENDING hesap yanlış/rastgele
  şifreyle `403 HESAP_ONAY_BEKLENIYOR` (`authController.ts:257-262` eski); (2) OAuth hesap şifre denemeden
  `401 OAUTH_HESAP` "sosyal giriş ile oluşturulmuştur" (`:267-272` eski). İkisi de e-postanın kayıtlı+durumunu şifresiz sızdırıyordu.
- **Çözüm:** "önce kimlik doğrula → sonra duruma göre yönlendir" deseni. Yok/OAuth/şifresiz/yanlış-şifre → **hepsi aynı generic 401**
  (ayırt edilemez). Durum (REJECTED/pasif/PENDING) yalnız doğru şifreden SONRA. Pasif hesap da artık şifre sonrası `HESAP_PASIF`
  (önce generic 401'di). Meşru akış korundu (onaylı giriş, red ekranı İş 3 P2, onay-bekleme). **Şema DEĞİŞMEDİ (migration yok).**
- **Test:** enumeration testleri eklendi (`auth.test.ts`) — yanlış-şifrede PENDING/OAuth/pasif sızmıyor + var-olmayan/PENDING/OAuth üçü aynı yanıt.
- **Doğrulama:** lokal backend tsc (src+test) + eslint yeşil; entegrasyon/enumeration testleri CI'da (lokal `TEST_DATABASE_URL` guard'ı canlı DB'yi korur).
- **Bilinen sınır:** timing (zamanlama) yan-kanalı kapsam dışı bırakıldı (üretim-öncesi, düşük risk).

## ✅ #12 DISC ÇOKLU HARF — MERGED, CANLIDA (2026-08-19)
> Backend **#47** (`4c63d0e`) + çatı (FE + pointer) **#93** (`61b6eb2`) + docs **#94** (`42e35bf`) MERGED → canlıda (git doğrulandı). İki repo main CI yeşil.
- **Ne:** DISC kimliği tek baskın harf yerine türetilmiş **1–3 harf** (ör. `D`, `DI`, `Di`, `DIs`) — KARAR 1 (#12=md.4).
- **Onaylanan eşikler (PO, 2026-08-17):** orta çizgi (midline) **0.25** (normalize vektör, eşit pay); geçen tipler gösterilir,
  birincil daima. BÜYÜK/küçük = **birincilin %75'i** (yakın→BÜYÜK, zayıfça geçen→küçük). Tek merkezi `DISC_LETTER_CONFIG`
  (başlangıç değerleri; gerçek kullanıcı verisiyle kalibre edilecek — kullanıcı isteği).
- **Migration YOK:** harf saklanan normalize vektörden türetilir (`discLetters.ts`). Şema değişmedi.
- **Güvenlik (KARAR 5/PII):** yalnız türetilmiş harf gönderilir; ham vektör response'a KONMAZ (adminList'te vektör
  select'e eklenir ama base map'te çıkarılır; `admin.test.ts` doğrular).
- **Gösterim (bu tur):** yönetici havuz (menti/mentör havuzu + bekleme odası) + kendi profil kartı + menti dashboard
  (paylaşılan `DiscBadge` atomu). **Kapsam DIŞI (belirgin):** peer kartı (menti→mentör KARAR 5'te gizli), platform üye
  tablosu + DISC dağılım grafiği (agregat), eşleşme aday kartı (=#7 follow-up).
- **Doğrulama:** lokal backend tsc(src+test) ✓ · eslint ✓ · frontend tsc ✓ · vitest 38/38 ✓ · build ✓; DISC saf mantık
  `tsx` ile 8/8 ✓. Entegrasyon/unit DISC testleri → CI (lokal TEST_DATABASE_URL guard'ı canlı DB'yi korur).
- **Sıradaki (Grup 2):** 2a ghost red (#35) — migration, AYRI tur.

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
- **Raporlar (çatı #78 + #79):** değerlendirme/test/soru envanteri (`docs/raporlar/kod-denetimi/degerlendirme-test-soru-envanteri-2026-08-15.md`) + içerik dökümü (`docs/raporlar/icerik/`) + derinleştirilmiş eksik analizi (`docs/raporlar/kod-denetimi/eksikler-derinlestirilmis-2026-08-15.md`). Canlı DB salt-okuma sayımıyla seed↔canlı tutarlılığı doğrulandı.
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
> ⚠️ GÜNCELLEME (2026-08-28, G9-05 uzlaştırma): Bilanço bu belgede "belge-içi 4 çelişki" (chat 3-durum · VisibilityOptIn 2-durum · 4-rol · platform-tema) işaretlemişti (T1-B3 :59-62). **Kanıt-teyidi:** eski SERT çelişkili bloklar ("chat #47 açık/taşınıyor", "#34 PR açık", "platform tema yapılacak") bu belgede ARADAN kapandı — güncellendi, arşive taşınacak bayat blok kalmadı (T1-B3 :90 = "✅ YAPILDI, aradan kapandı"). Kalan tek okuma-karışıklığı için tek-gerçek aşağıda sabitlendi:
> - **CHAT:** kod TAM CANLIDA (aşağıdaki blok) · geriye YALNIZ PO'nun uçtan-uca manuel testi kaldı (⏳ BEKLEYEN bölümü) — çelişki değil, iki ayrı gerçek.
> - **VisibilityOptIn:** Taraf-2 (menti-driven) SİLİNDİ · Taraf-1 `setVisibilityOptIn` korundu · `requestMessage` ŞEMA kolonu DROP ertelendi (migration turu) — üçü tamamlayıcı, çelişki değil (bkz. aşağıdaki iki blok).
> - **4-rol / platform-tema:** Mentör ✅ + tema toggle ✅ ZATEN mevcut (madde 5, satır ~229); "yapılacak" ifadeleri güncellendi.
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

## ✅ CANLIDA / KAPANMIŞ — eski oturumlar (2026-08-11 + 2026-08-14)
> Bu iki kapanmış oturumun tam dökümü (STK admin UI #62 · belge işleri #58-#64 · IDOR kod-keşfi çözümü · 5 belge PR
> #65-#69) "şu an"a odaklanmak için arşive taşındı → `docs/arsiv/09-DURUM-tamamlanan-isler-arsiv-2026-08-19.md`.

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
