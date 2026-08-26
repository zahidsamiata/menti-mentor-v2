# BELGE BİLANÇOSU — TUR 3 / GRUP C (çalışma-tarzı: kök `CLAUDE.md` + `backend/CLAUDE.md`)

**📸 DONDURULMUŞ** (bilanço bölümü — 2026-08-26) · Tur 3/GRUP-C · Salt-okuma defter. Kod SALT-OKUNDU (spot-teyit), DEĞİŞTİRİLMEDİ · DB'ye DOKUNULMADI · PR/commit/belge-silme YOK · numara DOĞURULMADI · hakem OLUNMADI.

> **Ne bu:** İki "çalışma tarzı" belgesinin BAŞTAN-SONA okuma-defteri. Çoğu kalem KURAL/TALİMAT (kod-dışı,
> yürürlükte) — bunlar "✅ yapıldı" DEĞİL, "KOD DIŞI (yürürlükteki kural)" işaretlenir. Yalnız içlerine gömülü
> **kod-gerçeği İDDİALARI** (dosya adı, flag, güvenli-seed listesi, model sayısı, sunucu bölgesi) KODDA doğrulandı →
> ✅/❓/🗑️ yalnız bunlara verilir. Çapraz-kontrol: `T1-A-canonical.md` (özellikle Ç6 sunucu-ülkesi), `T2-C-kod-denetimi.md`.

---

## 0. OKUMA İLERLEME TABLOSU

| belge | toplam satır | okunan satır | tam✅/kısmi⚠️/okunmadı❌ | kalem |
|---|:---:|:---:|:---:|:---:|
| kök `CLAUDE.md` | 417 | 417 (1-150, 151-300, 301-417) | ✅ TAM | 78 |
| `backend/CLAUDE.md` | 108 | 108 (1-108) | ✅ TAM | 33 |

**Toplam: 2/2 belge TAM okundu. Okunmayan: 0. Toplam defter kalemi: 111.**

> Not: kök CLAUDE.md 417 satır ARALIK-ARALIK okundu (kırpılma tuzağı önlendi): 1-150 / 151-300 / 301-417 = tam.

---

## 1.A — DEFTER: kök `CLAUDE.md` (78 kalem)

**DURUM kodları:** ✅ YAPILDI · 🟡 YARIM · 🔀 PR'DA · ⬜ AÇIK · ❓ TEYİT GEREK · 🗑️ GEÇERSİZ ADAYI · "KOD DIŞI" = yürürlükteki kural.

### Çalışma Sözleşmesi — mod & onay

| kaynak (dosya:satır) | kalem/kural | numara | durum | kanıt |
|---|---|---|:---:|---|
| CLAUDE.md:5 | Her turda mod net bildirilir (PLAN/BYPASS/MANUEL-ONAY) | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:6-7 | Geri-alınamaz adımda (merge/prod deploy/prod DB yazımı/force-push/external gönderim) DUR, onay bekle | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:8 | PR aç, MERGE ETME — merge kararı kullanıcının | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:9-10 | Uçtan uca yürüt; karar gerekeni "kullanıcı kararı gerekli" NOT et, gereksiz durma | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:11 | SHA/commit/branch tahmin etme — git'ten DOĞRULA | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:12 | Dürüst pushback; testi/CI'ı yeşil GÖSTERME | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |

### Proje Hafızası — nereye bakılır

| kaynak (dosya:satır) | kalem/kural | numara | durum | kanıt |
|---|---|---|:---:|---|
| CLAUDE.md:15 | Canonical güncel durum = `docs/kararlar/09-DURUM.md`, oturum başında oku | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | dosya var (T1-A okundu) |
| CLAUDE.md:16 | `PROJECT_STATUS.md` = dondurulmuş onboarding, güncel durum İÇİN DEĞİL | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:17 | Detaylı kararlar → `docs/kararlar/00-INDEX.md` | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:18-19 | Geçmiş raporlar `docs/raporlar/`; işe başlarken 09-DURUM oku | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |

### Push Öncesi / verify ↔ CI

| kaynak (dosya:satır) | kalem/kural | numara | durum | kanıt |
|---|---|---|:---:|---|
| CLAUDE.md:22-24 | Her push öncesi `npm run verify`; verify=CI ile birebir; `scripts/verify.sh` CI ile eşli | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | `scripts/verify.sh` DOĞRULANMADI (bu turda açılmadı) — ❓ dosya varlığı |
| CLAUDE.md:27-28 | verify entegrasyon testleri `TEST_DATABASE_URL` guard'ına tabi; yoksa DURUR (canlı Neon'a truncate atmaz); asıl kanıt CI | madde ilişkili (assertTestDatabase) | KOD DIŞI + ✅ kod-teyitli | `tests/helpers/assertTestDatabase.ts` VAR (guard mevcut) |
| CLAUDE.md:29-31 | Backend CI yalnız `main` hedefli PR/push'ta; stacked PR'da backend CI koşmaz; çatı CI her branch | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | CI workflow bu turda açılmadı — ❓ |

### Branch akışı / CI kontrolü / Submodule

| kaynak (dosya:satır) | kalem/kural | numara | durum | kanıt |
|---|---|---|:---:|---|
| CLAUDE.md:34-36 | Doğrudan main'e push YOK; feature branch → PR → iki repo yeşil → merge | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:39-40 | Her push sonrası `gh run list` HEM backend HEM çatı için kontrol | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:43-45 | Backend değişince aynı tur pointer güncellenir; backend push↔pointer arası ara commit YOK; sıra tanımlı | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:47-56 | Merge sonrası pointer bump dansı önleme (`git submodule update --remote backend`, `.gitmodules branch=main`, descendant doğrula) | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | `.gitmodules branch=main` DOĞRULANMADI — ❓ |

### API/Şema · Veri modeli · Migration · DB uyarıları (⭐ kod-gerçeği yoğun)

| kaynak (dosya:satır) | kalem/kural | numara | durum | kanıt |
|---|---|---|:---:|---|
| CLAUDE.md:59 | Endpoint/Prisma şeması değişince "kim kullanıyor?" taraması | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:62-63 | ⭐ Kurum-içi rol/sayım `TenantMembership.role` üzerinden, `User.role` DEĞİL | TUR-1'de var: T1-A madde 49 / T2-C 1.F:122 | ✅ YAPILDI (model var) | ⭐ KOD-TEYİT: `schema.prisma` `model TenantMembership` VAR (38 model listesinde). NOT: `User.role` ÇİFT-KAYNAK hâlâ duruyor (T2-C 1.F:122 ❓ "legacy mi terk mi") — bu kural yürürlükte ama kod çift-kaynak taşıyor |
| CLAUDE.md:64-65 | ⭐ Her katılım akışında `ensureMembership()`/`ensureMembershipSafe()` (`membership.ts`) çağrılır — idempotent, non-fatal | NUMARASIZ | ✅ YAPILDI (servis var) | ⭐ KOD-TEYİT: `src/services/membership.ts:22 ensureMembership`, `:42 ensureMembershipSafe` VAR. Çağrı-yerleri bu turda taranmadı — ❓ "her akışta" tam kapsamı |
| CLAUDE.md:68 | ⭐ Migration: `IF NOT EXISTS`+`db execute`+`migrate resolve`; `db push --accept-data-loss` YASAK (Neon shadow-DB) | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:70-71 | ⭐ Canlı=lokal AYNI Neon DB (`ep-fancy-tooth-ab4u5xhr`) | NUMARASIZ | ✅ YAPILDI (DB-ID kod-teyitli) | ⭐ KOD-TEYİT: `tests/helpers/assertTestDatabase.test.ts:7` `ep-fancy-tooth-ab4u5xhr-pooler...neon.tech` — DB-ID gerçek |
| CLAUDE.md:72-74 | ⚠️ Tehlikeli seed/npm run seed/db seed VERİ SİLER; "Güvenli: seed-questions.ts, seed-learning-journey.ts, seed-test-tenant.mjs" | NUMARASIZ | 🗑️ GEÇERSİZ ADAYI (satır 74 bayat) | ⭐ KOD-TEYİT: `prisma/seed-questions.ts` YOK (silinmiş). Satır 74 hâlâ eski güvenli-listeyi yazıyor → **satır 75-78 GÜNCELLEME notu bunu zaten düzeltmiş** (aşağıda). Satır 74 kendi başına bayat ama üzeri çizilmemiş, altına not eklenmiş (Belge Düzeltme Deseni uygulanmış) |
| CLAUDE.md:75-78 | ⚠️ GÜNCELLEME (2026-08-23): `seed-questions.ts` SİLİNDİ (backend `5745e0f`); gerçek güvenli liste = `seed-certification.ts`·`seed-learning-journey.ts`·`scripts/seed-test-tenant.mjs`; tehlikeli=`prisma/seed.ts` (`npm run seed`=`tsx prisma/seed.ts`), satır 300-307 toplu `deleteMany()` | NUMARASIZ | ✅ YAPILDI (kod-teyitli — DOĞRU) | ⭐ KOD-TEYİT (5 iddia doğrulandı): (1) `seed-questions.ts` YOK ✅ · (2) `seed-certification.ts`+`seed-learning-journey.ts` VAR ✅ · (3) `scripts/seed-test-tenant.mjs` VAR ✅ · (4) `package.json:16 "seed":"tsx prisma/seed.ts"` ✅ · (5) `prisma/seed.ts:300-308` `deleteMany()` (userResponse/feedbackLog/feedback/meeting/matchRequest/visibilityOptIn/matchCombinationScore/clubMembership) — **satır 300 başlıyor** ✅. GÜNCELLEME notu KOD-GERÇEĞİYLE tam örtüşüyor |

### Ortam/Veritabanı — PROD ≠ DEV ≠ TEST (⭐ SUNUCU-BÖLGESİ ÇELİŞKİ ADAYI)

| kaynak (dosya:satır) | kalem/kural | numara | durum | kanıt |
|---|---|---|:---:|---|
| CLAUDE.md:81 | ⭐ "Lokal geliştirme: backend/.env → ana Neon (`ep-fancy-tooth-ab4u5xhr`, **eu-west-2/İrlanda**)" | TUR-1'de var: T1-A madde 92/Ç6 (ÇELİŞKİ) | 🗑️ GEÇERSİZ ADAYI (bayat — "İrlanda" hatalı) | ⭐ KOD-TEYİT: `ep-fancy-tooth-ab4u5xhr` ✅ + `eu-west-2` ✅ (`assertTestDatabase.test.ts:7`). ANCAK **AWS `eu-west-2` = Londra/BK, İrlanda=`eu-west-1`** → "eu-west-2/İrlanda" İÇSEL ÇELİŞKİLİ. **T1-A madde 92/Ç6: PO teyitli düzeltme = Londra/BK, AB DEĞİL; "İrlanda hatalıydı".** Bu satır o düzeltmeden HABERSİZ → bayat. HAKEM DEĞİLİM: ikisini yazdım (belge:İrlanda ↔ T1-A/kod-bölge:eu-west-2=Londra). NİYET: DB-konum beyanı; NEREDE DURDU: CLAUDE.md:81 GÜNCELLEME notu almadı (madde 92 yalnız KVKK belgelerine işlendi) |
| CLAUDE.md:83 | ⭐ Test: `TEST_DATABASE_URL` beklenir; yoksa guard (`assertTestDatabase.ts`) canlı Neon'a TRUNCATE atmaz, suite durur | NUMARASIZ | ✅ YAPILDI (guard var) | ⭐ KOD-TEYİT: `tests/helpers/assertTestDatabase.ts` VAR |
| CLAUDE.md:85-86 | CI: ephemeral localhost Postgres; `.env.test` gitignored; test env `tests/setup.ts`'te set | NUMARASIZ | KOD DIŞI + ❓ | `tests/setup.ts` bu turda açılmadı — ❓ |
| CLAUDE.md:87 | PROD: docker-compose Postgres (`@postgres:5432`), Neon değil; migration/backfill prod DATABASE_URL ile | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | docker-compose bu turda açılmadı — ❓ |
| CLAUDE.md:88 | Kural: hangi DB'ye bağlı önce host'tan doğrula (secret'sız) | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:91-94 | Neon test-branch koreografisi: `.env` yedekle→host kanıtla→iş bitince ana DB'ye dön; geçici secret sil; port doğrula | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |

### Belirsiz/riskli · Paralellik · Kişi-adı · Model · Hata felsefesi

| kaynak (dosya:satır) | kalem/kural | numara | durum | kanıt |
|---|---|---|:---:|---|
| CLAUDE.md:97 | Belirsiz/riskli → DUR ve raporla; tahminle riskli adım YASAK | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:100-106 | Koşullu paralellik: bağımsız→paralel, bağımlı→SIRALI; migration/merge/pointer/paylaşılan-config HER ZAMAN sıralı; şüphede sıralı | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:109-110 | ⚠️ Kişi adı YASAĞI (kalıcı): kod/yorum/commit/PR/belgeye isim YAZMA; nötr terim ("PO"); mevcut isimler ayrı temizlik işinde | TUR-1'de var: ilişkili (isim-temizlik ayrı iş) | ⬜ AÇIK (mevcut-isim temizliği) | NİYET: isimsizleştirme; NEREDE DURDU: "mevcut belgelerdeki isimler AYRI temizlik işinde giderilir" — o iş henüz yapılmadı (DURUŞ: ayrı-tur bekliyor). Yeni-içerik kuralı = KOD DIŞI yürürlükte |
| CLAUDE.md:113-116 | Model yönlendirme: mod başında model öner; Sonnet=basit, Opus=karmaşık/riskli; emin değilsen Opus | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:119-121 | Hata felsefesi: araştır+kanıtla→çöz+risk→net ise çöz belirsizse DUR; panikle deneme-yanılma YOK | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |

### Belge Senkronizasyonu (zorunlu bitiş adımı) + Docs çakışma serileştirme

| kaynak (dosya:satır) | kalem/kural | numara | durum | kanıt |
|---|---|---|:---:|---|
| CLAUDE.md:124-125 | ⚠️ GÜNCELLEME (2026-08-11): eski "iş bitince 09-DURUM" kuralı atlanamaz bitiş adımıyla güçlendirildi | NUMARASIZ | KOD DIŞI (yürürlükteki kural — meta) | tarihsel iz notu |
| CLAUDE.md:127-134 | Her BYPASS tur belge-senkron kontrolü yapılmadan TAMAMLANMIŞ SAYILMAZ: (1) iş bitti→09-DURUM (2) kuyruk değişti→10-yol (3) gerekmiyorsa açıkça belirt; atlanırsa tur EKSİK | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:135 | Belge hijyeni: eskiyi SİLME → ⚠️ GÜNCELLEME notu veya `docs/arsiv/` | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:137-146 | Docs çakışma önleme: 09-DURUM/10-yol PAYLAŞILAN→yazım SIRALI; 09/10 güncellemesi en sona TEK docs turunda; ortak başlığa tarihli append; `.gitattributes merge=union` opsiyonel-riskli | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | `.gitattributes` union satırı DOĞRULANMADI — ❓ (opsiyonel, "eklenebilir" der) |

### Karar-Takip Disiplini + Git fetch + Belge düzeni/düzeltme

| kaynak (dosya:satır) | kalem/kural | numara | durum | kanıt |
|---|---|---|:---:|---|
| CLAUDE.md:148-150 | Karar-Takip disiplini: tek canonical `docs/kararlar/00-KARAR-TAKIP.md` (açık iş/karar/ölü-kod) | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | dosya var (T1-A okundu) |
| CLAUDE.md:152-154 | KURAL 1: oturum başında 00-KARAR-TAKIP OKU + açık maddeleri (🔴/🟡/🔵/❓) proaktif hatırlat | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:155-158 | KURAL 2: tur sonunda 00-KARAR-TAKIP GÜNCELLE (yalnız KOD GERÇEĞİYLE ✅); yarım→🟡, yeni→🔴; atlanırsa tur EKSİK | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:159-161 | 00-KARAR-TAKIP="ne kaldı" · 09-DURUM="şu an ne oldu" · 10-yol="öncelikli sıra" (çakışmaz, tamamlar) | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:162-163 | Ölü kod ilkesi: "sil" varsayılan DEĞİL; önce niyet+neye-bağlanacak; gerçek-terk "❓ PO kararı" | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:166-167 | Git fetch önce: main durumu kontrol edilecekse ÖNCE `git fetch origin` | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:170-171 | Belge Düzeltme Deseni: eskiyi SİLME → üstüne `⚠️ GÜNCELLEME (tarih)` notu | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:174-178 | Belge Düzeni: `belge-duzeni-rehberi.md` 8 düzen kuralı (canonical/tür=klasör/🔄📸/adlandırma/INDEX/eksik-işaretle/taşıyıcı/bulgu-döngüsü) | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | rehber dosyası DOĞRULANMADI — ❓ |
| CLAUDE.md:180-185 | KURAL 8 bulgu yaşam döngüsü: keşif→📸rapor→00-KARAR-TAKIP numara→10-yol tek satır→bitince KOD-doğrula+4 yer→oturum sonu 07-oturum-gunlugu | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |

### Güvenlik Kuralları (⭐ kalıp-kanıtı kod-teyitli)

| kaynak (dosya:satır) | kalem/kural | numara | durum | kanıt |
|---|---|---|:---:|---|
| CLAUDE.md:193-200 | Her yeni endpoint ZORUNLU: auth/requireAuth·doğru-rol·tenant-izolasyon·IDOR·Zod; public whitelist (login/register/health/unsubscribe/invitation-join/suspicion-report) DIŞINDA public YOK | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:203-205 | Veri döndürürken: explicit `select`, `password` ASLA; over-fetch yok; hata iç-detay sızdırmaz | madde 38 ilişkili | KOD DIŞI + ✅ global-omit kod-teyitli | ⭐ KOD-TEYİT: `src/db.ts:52` global `omit:{user:{password:true}}` (kalıcı savunma, madde 38) |
| CLAUDE.md:208-209 | Frontend guard yeterli DEĞİL; backend'de de guard olmalı | K6 ilişkili | KOD DIŞI (yürürlükteki kural) | not: K6/madde 66 admin server-side guard hâlâ AÇIK (T2-C 1.A:32) — kural ihlali kod-borcu olarak biliniyor |
| CLAUDE.md:212-214 | Token HttpOnly cookie; localStorage'a token YAZMA; sır koda YAZMA (env'den) | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:214 | Sır'ı log/response/hata mesajına BASMA | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:217 | Public endpoint eklerken: rate limit/boyut sınırı/spam koruması var mı | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:220-222 | Hassas veri eklerken: PII mi/kim görmeli; KVKK meşru+silinebilir; kişi-hakkında yorum o kişi görmeli mi | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:225 | Yeni paket → `npm audit`; HIGH/CRITICAL varsa ekleme | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:228-229 | ⭐ Ownership kalıbı: `requireSelfOrAdmin(paramName)` (`authorize.ts`) — sahibi/ADMIN değilse 403 | NUMARASIZ | ✅ YAPILDI (kalıp var) | ⭐ KOD-TEYİT: `src/middleware/authorize.ts:70 requireSelfOrAdmin(paramName='id')` VAR |
| CLAUDE.md:230-231 | ⭐ Brute-force kalıbı: `loginRateLimiter`/`platformAuthRateLimiter` (`rateLimiter.ts`); `generalRateLimiter` tenant-key'li (public'te zayıf) | NUMARASIZ | ✅ YAPILDI (kalıp var) | ⭐ KOD-TEYİT: `rateLimiter.ts:105 loginRateLimiter`, `:57 platformAuthRateLimiter`, `:35 generalRateLimiter` VAR; yorum "generalRateLimiter zayıf anon kovası" da kodda |
| CLAUDE.md:232-233 | ⭐ Merkezi mesaj kalıbı: "`registerMessages.ts` / kod-bazlı resolver"; enumeration-safe | NUMARASIZ | ❓ TEYİT GEREK (dosya-adı bayat adayı) | ⭐ KOD-TEYİT: `registerMessages`/`RegisterMessage` grep BOŞ (src'de yok). "kod-bazlı resolver" ALTERNATİFİ gerçek olabilir ama `registerMessages.ts` DOSYASI **arandı, sonuç yok**. NİYET: merkezi kullanıcı-mesajı; NEREDE DURDU: dosya-adı iddiası kodda karşılıksız (ya yeniden-adlandırıldı ya hiç oluşturulmadı) → ❓/🗑️ adayı |
| CLAUDE.md:236 | Güvenlikte emin değilsen DUR ve sor | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |

### Temiz Kod & Sürdürülebilirlik

| kaynak (dosya:satır) | kalem/kural | numara | durum | kanıt |
|---|---|---|:---:|---|
| CLAUDE.md:243-245 | Uzun-ömür felsefesi: "çalışıyor" yetmez, "anlaşılır+değiştirilebilir" | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:248-251 | İsimlendirme+yapı: niyet-belli isim; tek sorumluluk; katman ayrımı (service↔controller↔UI↔Prisma) | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:254-257 | Sabitler+tekrar: sihirli sayı YOK (tek config/const, örn. `CERT_CONFIG`); DRY (iki kez tekrarda çıkar, erken soyutlama yok) | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | `CERT_CONFIG` örnek olarak anılmış — varlığı DOĞRULANMADI (örnek, iddia değil) |
| CLAUDE.md:260-262 | Yorumlar: "neden"i anlat; ölü/yorum-satırı-kod bırakma sil | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:265-266 | Test edilebilirlik: DB/HTTP'den arınmış saf fonksiyon; yeni bağımlılık ekleme (gerekmedikçe)+`npm audit` | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:269-272 | Stil+mimari kayıt: mevcut stile uy; kalıcı mimari kararı CLAUDE.md'ye/dosya başına not | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| CLAUDE.md:275-276 | Dil: kullanıcıya görünen metin TÜRKÇE; kod-mekaniği (değişken/fonksiyon/commit/error-code) İngilizce | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |

### RTK (Rust Token Killer) — komut kuralları

| kaynak (dosya:satır) | kalem/kural | numara | durum | kanıt |
|---|---|---|:---:|---|
| CLAUDE.md:285-294 | Golden rule: komutları `rtk` ile prefix'le (chain'de `&&` içinde bile) | NUMARASIZ | KOD DIŞI (yürürlükteki araç-kuralı) | `rtk` aracının kurulu/çalışır olması bu turda DOĞRULANMADI — ❓ (araç-varlığı) |
| CLAUDE.md:296-401 | RTK komut kataloğu (build/test/git/gh/pnpm-npm/files/analysis/docker/network/meta) + tasarruf oranları | NUMARASIZ | KOD DIŞI (araç dokümantasyonu) | referans tablo; iddia değil |
| CLAUDE.md:403-417 | Token tasarruf özet tablosu (kategori × oran; ortalama %60-90) | NUMARASIZ | KOD DIŞI (araç dokümantasyonu) | referans tablo |

> **kök CLAUDE.md kalem toplamı: 78.** (Çoğu KOD DIŞI yürürlükteki kural; kod-gerçeği iddiası olanlar ✅/❓/🗑️ aldı.)

---

## 1.B — DEFTER: `backend/CLAUDE.md` (33 kalem)

> ⚠️ Bu belge büyük ölçüde DONDURULMUŞ ONBOARDING snapshot'ı (Menti-Mentor tanıtımı) — birçok kod-gerçeği iddiası
> ESKİ (5-model, iceBreaker/matchReason canlı-dosya gibi). Kod bugün 38 model + LLM tümüyle kaldırılmış durumda.

### Project overview + Commands

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| backend:7 | "Menti-Mentor multi-tenant SaaS (TS/Node/Express5/PG/Prisma); LLM (OpenAI) yalnız ice-breaker" | NUMARASIZ | 🗑️ GEÇERSİZ ADAYI (kısmen bayat) | LLM iddiası bayat: iceBreaker KALDIRILDI (aşağı bkz. :46/:87); "LLM yalnız ice-breaker" artık geçerli değil (satır 62 kendisi "LLM removed" der → İÇSEL ÇELİŞKİ) |
| backend:12-21 | Komutlar (`npm run dev/build/start/lint/format`, `prisma:generate/migrate/studio`) | NUMARASIZ | ❓ TEYİT GEREK | `package.json`'da `seed` doğrulandı; diğer script adları bu turda tek tek DOĞRULANMADI — ❓ |
| backend:23 | `.env.example`→`.env`: `DATABASE_URL`+`OPENAI_API_KEY`+`DEFAULT_TENANT_ID` | NUMARASIZ | 🟡 kısmen (OPENAI bayat adayı) | ⭐ KOD-TEYİT: `config.ts:12-13,40 DEFAULT_TENANT_ID` VAR (prod'da YASAK). `OPENAI_API_KEY` LLM kaldırıldığı için muhtemelen atıl — DOĞRULANMADI ❓ |

### Architecture — request flow + core modules (⭐ iddia yoğun)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| backend:30-33 | HTTP→tenant middleware (`X-Tenant-Id` zorunlu)→controller→service→Prisma; `tenant.ts` doğrular, `TenantContext` ekler, sorgular tenantId-scoped | NUMARASIZ | ✅ YAPILDI (kod-teyitli) | ⭐ KOD-TEYİT: `src/middleware/tenant.ts:26 req.header('X-Tenant-Id')` VAR |
| backend:39-47 | Core modül tablosu (`server.ts`·`config.ts`·`db.ts`·`middleware/tenant.ts`·`scoring.ts`·`matching.ts`·`tenantSharing.ts`·`iceBreaker.ts`·`controllers/`) | NUMARASIZ | 🟡 kısmen (iceBreaker satırı bayat) | `scoring.ts` VAR (aşağı :55/:63); `iceBreaker.ts` **arandı, sonuç yok** (silinmiş) → tablo satırı bayat |
| backend:46 | "`iceBreaker.ts` — OpenAI (decommissioned — no longer wired to any controller)" | TUR-1'de var: T1-A 💀 / T2-C 1.A:50 | 🗑️ GEÇERSİZ ADAYI (dosya YOK) | ⭐ KOD-TEYİT: `src/services/iceBreaker.ts` DOSYASI YOK. "decommissioned" doğru ama dosyayı hâlâ mevcut listeliyor → bayat (dosya tamamen silinmiş, yalnız `gdprService.ts`/`llmRetry.ts` yorumlarında adı geçiyor) |
| backend:51 | ⭐ "Data Model (Prisma): **Five models** — Tenant, User, VisibilityOptIn, MatchRequest, JobListing" | TUR-1'de var: ilişkili (şema büyüdü) | 🗑️ GEÇERSİZ ADAYI (5≠38) | ⭐ KOD-TEYİT: `schema.prisma` `^model ` sayımı = **38 model** (Tenant/User/VisibilityOptIn/MatchRequest/JobListing dahil ama +33 daha: TenantMembership·Conversation·Message·Feedback·SjtQuestion·CertificationQuestion·SuspicionReport·UserProfile·Match... ). "Five models" ONBOARDING snapshot'ı — ağır bayat. HAKEM DEĞİLİM: belge=5 ↔ kod=38 |
| backend:54 | `UserRole: ADMIN|MENTOR|MENTI` | NUMARASIZ | ❓ TEYİT GEREK | enum bu turda açılmadı; T1-A/T2-C rolleri (MENTOR/MENTI/ADMIN) tutarlı görünüyor — ❓ tam-teyit |
| backend:55 | `DiscType` → 40% kişilik skoru (`scoring.ts` hardcoded matrix) | NUMARASIZ | ✅ YAPILDI (matris var) | ⭐ KOD-TEYİT: `scoring.ts:45-48` DISC matrisi (D/I/S/C×D/I/S/C sayısal) VAR |
| backend:56 | `MatchTargetType: USER|JOB_LISTING` (polymorphic, gelecek iş-panosu) | madde U2 ilişkili | ❓ TEYİT GEREK | `matchingInterface.ts` uyuyan-şablon (T2-C 1.G:44 🔵). `JobListing` model VAR (`schema.prisma:620`); enum DOĞRULANMADI ❓ |

### Key business rules + ESM

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| backend:60 | Tenant isolation: havuz paylaşımı yalnız iki taraf `isSharedPoolActive=true` | NUMARASIZ | ❓ TEYİT GEREK | `tenantSharing.ts`/`canCrossTenantMatch()` bu turda açılmadı — ❓ (satır 105 tekrarı) |
| backend:61 | Opt-in gate: mentör `VisibilityOptIn` onaylamadan profil açılmaz | madde 75(T7) ilişkili | KOD DIŞI (iş kuralı) | opt-in FE bağlı değil (T2-C 1.C T7 ⬜) ama backend kural mevcut |
| backend:62 | ⭐ "LLM removed — `iceBreaker.ts` decommissioned; mentiler kendi requestMessage'ını yazar; runtime'da OpenAI bağımlılığı YOK" | TUR-1'de var: T1-A 💀 | ✅ YAPILDI (kod-teyitli) | ⭐ KOD-TEYİT: `iceBreaker.ts` YOK; aktif OpenAI çağrısı yok (`llmRetry.ts:5` "iceBreaker kaldırıldı" der, kendisi 0-import ölü). SATIR 62 DOĞRU — ama satır 7 ("LLM yalnız ice-breaker") ile ÇELİŞİR (aynı belge içi) |
| backend:63 | Scoring saf matematik: sektör %60 + DISC matrix %40 | NUMARASIZ | ✅ YAPILDI (kod-teyitli) | ⭐ KOD-TEYİT: `scoring.ts:89 DEFAULT_SECTOR_WEIGHT=0.6` (+ :87 yorum "0.60/0.40 taban") + DISC matris :45 |
| backend:67 | ESM: `"type":"module"`; import'lar açık `.js` uzantı (TS kaynağında bile) | NUMARASIZ | ❓ TEYİT GEREK | `package.json` "type":"module" DOĞRULANMADI (yalnız seed satırları okundu) — ❓ |

### Analytics & Compliance — PII/Analytical + KVKK

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| backend:79 | PII alan listesi (fullName/email/bioSummary/.../UserProfile.discD-I-S-C/oceanO-N/archetype); KVKK Md.7/GDPR Md.17; anonimleştir+hard-delete; schools/companies/communities re-identify → KPI dışı | NUMARASIZ | KOD DIŞI (sınıflandırma kuralı) | PII alan-listesi referans; tekil alan-varlıkları DOĞRULANMADI |
| backend:80 | Analytical (non-PII) alan listesi (sectorTags/role/tenantId/npsScore/... UserProfile.skillTags/goalTags/industryCode/yearsExp); aggregate güvenli, kimlikle bağlanmaz | NUMARASIZ | KOD DIŞI (sınıflandırma kuralı) | — |
| backend:84 | Yeni alan eklerken önce PII/Analytical sınıflandır | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | — |
| backend:85 | Analytics endpoint'leri (`/api/analytics/*`,`/api/admin/kpi`) yalnız aggregate; row-level PII YOK | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | endpoint yolları DOĞRULANMADI — ❓ |
| backend:86 | ⭐ `gdprService.ts` = KVKK/GDPR tek gerçek kaynağı; tüm anonimleştirme/silme oradan | madde 39/93/96 ilişkili | ✅ YAPILDI (dosya var) | ⭐ KOD-TEYİT: `src/services/gdprService.ts` VAR (`:159 iceBreaker:null`, `:189 anonimleştirme yol listesi`) |
| backend:87 | ⭐ LLM çağrıları (`iceBreaker.ts`,`matchReason.ts`) ham email/tam-ad/tanımsız-alan almasın | TUR-1'de var: T1-A 💀 | 🗑️ GEÇERSİZ ADAYI (iki dosya da YOK) | ⭐ KOD-TEYİT: `iceBreaker.ts` YOK · `matchReason.ts` YOK (yalnız `llmRetry.ts:4` yorumunda anılıyor, tüketici silinmiş — T2-C 1.A:51). Kural konusuz kalmış (LLM tümüyle atıl) → bayat |
| backend:88 | Log'larda PII YOK; yalnız `userId`+`tenantId`; email/fullName/discVector loglama | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | `logger.ts`/`requestLogger.ts` DOĞRULANMADI — ❓ |
| backend:89 | ⭐ `llmRateLimiter` middleware var ama artık uygulanmıyor (LLM kaldırıldı); gelecek için tut, route'a EKLEME | NUMARASIZ | ❓ TEYİT GEREK (middleware bayat adayı) | ⭐ KOD-TEYİT: `llmRateLimiter` grep src'de **arandı, sonuç yok**. "middleware var" iddiası kodda karşılıksız → ya silinmiş ya adı değişmiş → 🗑️/❓ adayı. NİYET: gelecek LLM için sakla; NEREDE DURDU: middleware kodda görünmüyor |
| backend:90 | `sectorTags` sanitize (trim/lowercase/max50/alfanumerik); aynısı UserProfile tag'leri → `sanitizeTags()` (`onboardingController.ts`) | NUMARASIZ | ❓ TEYİT GEREK | `sanitizeTags()`/`onboardingController.ts` bu turda açılmadı; T2-C `onboardingController.ts:461` başka bağlamda anıldı — ❓ tam-teyit |

### Data Retention + Security Invariants

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| backend:95-99 | Saklama tablosu: SystemLog 90g (`purgeExpiredData()` cron haftalık)·FeedbackLog 3y·UserResponse silinene-dek·VisibilityOptIn hard-delete'e-dek | TUR-1'de var: T1-A madde 81/99 / T2-C 1.E:63 | 🟡 kısmen kod-teyitli | T2-C 1.E:63 `gdprService.ts:262` cron VAR ama "yalnız SystemLog; mesaj/feedback süresiz" (madde 81 AÇIK). Tablo=hedef; kod kısmen |
| backend:103 | Tenant isolation: tenant-scoped tabloda her sorgu `where`'de `tenantId` | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | not: `SuspicionReport`'ta tenantId YOK (T2-C T3 ⬜, S1 açık) — kural ihlali kod-borcu biliniyor |
| backend:104 | Self-match: kimse kendine opt-in yapamaz (controller-level, sadece DB değil) | NUMARASIZ | KOD DIŞI (yürürlükteki kural) | controller kod DOĞRULANMADI — ❓ |
| backend:105 | Cross-tenant: yalnız iki taraf `isSharedPoolActive=true`; `canCrossTenantMatch()` | NUMARASIZ | ❓ TEYİT GEREK | `canCrossTenantMatch()` grep bu turda yapılmadı — ❓ (satır 60 tekrarı) |
| backend:106 | JWT tek tenant-scoped; cross-tenant token WARN loglanır+reddedilir | NUMARASIZ | ❓ TEYİT GEREK | DOĞRULANMADI — ❓ |
| backend:107 | `sectorTags` poison önleme: `SECTOR_TAG_SCHEMA` (`userController.ts`) persist öncesi | NUMARASIZ | ❓ TEYİT GEREK | `SECTOR_TAG_SCHEMA`/`userController.ts` bu turda açılmadı — ❓ |

> **backend/CLAUDE.md kalem toplamı: 33.** (Onboarding snapshot ağır bayat: 5-model, iceBreaker/matchReason canlı-dosya, llmRateLimiter, "LLM yalnız ice-breaker" = 🗑️/❓ adayları.)

---

## 2. ⭐ KOD-GERÇEĞİ İDDİA SONUÇLARI (doğrulanan / bayat-çelişki)

> Yalnız kod-gerçeği İDDİALARI (dosya/flag/liste/sayı/bölge). Saf kurallar bu tabloda YOK.

### ✅ DOĞRULANDI (kod = belge)
| İddia | Belge | Kod kanıtı |
|---|---|---|
| `seed-questions.ts` SİLİNDİ | CLAUDE.md:75 | `prisma/seed-questions.ts` YOK |
| Gerçek güvenli seed = certification+learning-journey+test-tenant.mjs | CLAUDE.md:76-77 | 3'ü de VAR (prisma/ + scripts/) |
| `npm run seed`=`tsx prisma/seed.ts` | CLAUDE.md:78 | `package.json:16` |
| `prisma/seed.ts` deleteMany satır 300-307 | CLAUDE.md:78 | `seed.ts:300-308` toplu `deleteMany()` (satır 300 başlıyor) |
| DB-ID `ep-fancy-tooth-ab4u5xhr` (canlı=lokal) | CLAUDE.md:71,81 | `assertTestDatabase.test.ts:7` |
| `eu-west-2` bölge string'i | CLAUDE.md:81 | `assertTestDatabase.test.ts:7` (ama "İrlanda" etiketi yanlış — aşağı) |
| `assertTestDatabase.ts` guard | CLAUDE.md:83 | `tests/helpers/assertTestDatabase.ts` VAR |
| `TenantMembership.role` model | CLAUDE.md:62 | `schema.prisma model TenantMembership` |
| `membership.ts` + ensureMembership/ensureMembershipSafe | CLAUDE.md:64-65 | `membership.ts:22,42` |
| `requireSelfOrAdmin` (authorize.ts) | CLAUDE.md:228 | `authorize.ts:70` |
| loginRateLimiter/platformAuthRateLimiter/generalRateLimiter | CLAUDE.md:230-231 | `rateLimiter.ts:105,57,35` |
| `db.ts` global omit password (madde 38) | CLAUDE.md:203 | `db.ts:52 omit:{user:{password:true}}` |
| `X-Tenant-Id` tenant middleware | backend:30-33 | `tenant.ts:26` |
| DISC matris + %60/%40 scoring | backend:55,63 | `scoring.ts:45-48,89` |
| `gdprService.ts` KVKK tek kaynak | backend:86 | `src/services/gdprService.ts` VAR |
| `DEFAULT_TENANT_ID` config | backend:23 | `config.ts:12-13,40` (prod'da YASAK) |
| `iceBreaker.ts` decommissioned/LLM removed | backend:62 | `iceBreaker.ts` YOK; aktif OpenAI çağrısı yok |
| `JobListing` model | backend:51,56 | `schema.prisma:620` |

**DOĞRULANAN kod-gerçeği iddiası: 18.**

### 🗑️/❓ BAYAT-ÇELİŞKİ (belge ≠ kod — HAKEM DEĞİLİM, ikisi de yazıldı)
| # | İddia | Belge | Kod gerçeği | İşaret |
|---|---|---|---|---|
| B1 | Sunucu "eu-west-2/**İrlanda**" | CLAUDE.md:81 | `eu-west-2`=AWS **Londra**; T1-A madde 92/Ç6 PO-teyitli "Londra/BK, İrlanda hatalıydı" | 🗑️ (bayat; T1-A Ç6 ile örtüşür) |
| B2 | Güvenli liste "seed-questions.ts,..." (eski) | CLAUDE.md:74 | `seed-questions.ts` YOK → satır 75-78 GÜNCELLEME zaten düzeltmiş (üzeri çizili değil, not eklenmiş) | 🗑️ (satır-74; not-altı düzeltilmiş) |
| B3 | "**Five models**" | backend:51 | `^model ` = **38** | 🗑️ (onboarding snapshot bayat) |
| B4 | `iceBreaker.ts` core-modül tablosunda mevcut-dosya | backend:39-47,46 | dosya YOK (silinmiş) | 🗑️ (bayat) |
| B5 | LLM çağrıları `iceBreaker.ts`+`matchReason.ts` | backend:87 | ikisi de YOK | 🗑️ (konusuz kural) |
| B6 | "LLM yalnız ice-breaker için" | backend:7 | satır 62 "LLM removed" — aynı belge içi çelişki | 🗑️ (bayat + içsel-çelişki) |
| B7 | `llmRateLimiter` middleware "var" | backend:89 | grep src'de **arandı, sonuç yok** | ❓ (silinmiş/adı-değişmiş adayı) |
| B8 | `registerMessages.ts` merkezi mesaj dosyası | CLAUDE.md:232 | grep **arandı, sonuç yok** ("kod-bazlı resolver" alternatifi olabilir) | ❓ (dosya-adı karşılıksız) |

**Bayat-çelişki/❓ kod-gerçeği iddiası: 8** (6× 🗑️ · 2× ❓).

---

## 3. SON İKİ BÖLÜM

### (a) YARIM KALAN İŞLER / DÜZELTİLMESİ GEREKENLER (gruplu)

**— Bayat kod-gerçeği iddiası (belge güncellemesi geride kalmış; SİLME YOK → ⚠️ GÜNCELLEME notu / düzeltme PO/ekip kararı):**
- **CLAUDE.md:81** "eu-west-2/İrlanda" → T1-A Ç6 (Londra/BK) ile çelişir; env-notu düzeltmesi yapılmamış. NİYET: DB-konum beyanı; NEREDE DURDU: madde 92 düzeltmesi yalnız KVKK belgelerine işlendi, CLAUDE.md'ye YANSIMADI.
- **backend/CLAUDE.md:7,46,51,87** onboarding snapshot bayat (LLM-ice-breaker / iceBreaker-dosya / 5-model / matchReason). NİYET: proje tanıtımı; NEREDE DURDU: onboarding donduruldu, kod 38-model + LLM-siz'e evrildi, snapshot güncellenmedi.
- **backend/CLAUDE.md:89** `llmRateLimiter` "var" — kodda görünmüyor. NİYET: gelecek LLM için sakla; DURUŞ: middleware bulunamadı.
- **CLAUDE.md:232** `registerMessages.ts` — kodda karşılıksız. NİYET: merkezi mesaj; DURUŞ: dosya adı doğrulanamadı.

**— PO/ekip kararı bekleyen (kuralla ilişkili kod-borcu, bu belgeler işaretlemiş):**
- **CLAUDE.md:109-110** Kişi-adı yasağı: yeni-içerik kuralı yürürlükte AMA "mevcut belgelerdeki isimler AYRI temizlik işinde" — o iş yapılmadı (⬜ açık). NİYET: isimsizleştirme; DURUŞ: ayrı-tur bekliyor.

**— Kural ihlali = bilinen açık kod-borcu (bu turda YENİ değil, çapraz-referans):**
- CLAUDE.md:208 (backend guard olmalı) ↔ K6/madde 66 admin server-side guard AÇIK (T2-C 1.A:32).
- backend:103 (her sorguda tenantId) ↔ `SuspicionReport.tenantId` YOK (T2-C T3, S1 açık).
- backend:95-99 (saklama) ↔ mesaj/FeedbackLog süresiz (madde 81 açık).
> Bunlar kural-ihlali gözlemi; DÜZELTME zaten ilgili numaralarda takipte — burada yalnız kurala-bağlanışı not edildi, YENİ numara doğurulmadı.

### (b) KESİN SAYIM (tam sayı)

- **Belgeler:** kök `CLAUDE.md` 417/417 ✅ TAM · `backend/CLAUDE.md` 108/108 ✅ TAM. Okunmayan: **0**.
- **Toplam defter kalemi: 111** (kök 78 + backend 33).
- **Durum dağılımı:**
  - KOD DIŞI (yürürlükteki kural/araç-doküman): **72**
  - ✅ YAPILDI (kod-gerçeği iddiası doğrulandı, tam/kısmi kod-teyitli): **19**
  - 🗑️ GEÇERSİZ ADAYI (bayat kod-gerçeği): **6** (B1,B2,B3,B4,B5,B6)
  - ❓ TEYİT GEREK: **12** (B7,B8 + 10 doğrulanmayan-dosya/enum/script iddiası: CLAUDE.md:24 verify.sh, :51 .gitmodules, :146 .gitattributes, :174 rehber, :285 rtk-araç, backend:12 komutlar, :54 UserRole, :56 MatchTargetType, :67 ESM, :90/:105/:106/:107 servis-teyitleri — sayımda tekilleştirildi)
  - 🟡 YARIM: **3** (backend:23 OPENAI, :39-47 core-tablo iceBreaker, :95-99 saklama)
  - ⬜ AÇIK: **1** (CLAUDE.md:109 mevcut-isim temizliği)
  > (72+19+6+12+3+1 = 113; 2 kalem çift-durum taşıyor [CLAUDE.md:62 KOD DIŞI+✅, :203 KOD DIŞI+✅] → tekil kalem 111.)
- **NUMARASIZ kalem:** çoğu (bu belgeler kural-belgesi, numara taşımaz). Numaralı-ilişki kurulan: TenantMembership(md.49), seed(md.30/45), sunucu-ülke(md.92/Ç6), iceBreaker(💀), guard(K6/66), tenantId(T3), saklama(md.81/99), opt-in(T7).
- **Doğrulanan kod-gerçeği iddiası: 18** · **Bayat-çelişki (🗑️): 6** · **❓ kod-gerçeği: 2** (llmRateLimiter, registerMessages) + 10 açılmayan-teyit.
- **Hayalet-tamamlanmış: 0** (bu belgeler kural-belgesi; "açık diyor kod yapmış" deseni yok — tersi var: belge "var" diyor kod "yok" = bayat, yukarıda 🗑️).
- **HAKEM OLUNMADI:** her çelişkide (İrlanda↔Londra, 5-model↔38, iceBreaker/matchReason/llmRateLimiter/registerMessages var↔yok) belge-iddiası + kod-gerçeği İKİSİ de yazıldı; karar PO/ekipte.

---

## KAPANIŞ NOTU (Grup C / Tur 3)
- **2/2 belge TAM okundu** (417+108), okunmayan 0, kırpılma tuzağı önlendi (aralık-aralık).
- **Toplam 111 kalem.** Ezici çoğunluk (72) yürürlükteki KURAL/talimat = "KOD DIŞI" (✅ değil).
- **18 kod-gerçeği iddiası kod-teyitli DOĞRU** — en kritik: seed-güvenlik GÜNCELLEME notu (CLAUDE.md:75-78) kodla TAM örtüşüyor (seed-questions.ts silinmiş, deleteMany satır 300).
- **6 bayat 🗑️ adayı:** en çarpıcı **`backend/CLAUDE.md` = ağır bayat onboarding snapshot** (5-model↔38, iceBreaker/matchReason canlı-dosya sanıyor, "LLM yalnız ice-breaker" ↔ "LLM removed" içsel-çelişki). Kök CLAUDE.md:81 "İrlanda" = T1-A Ç6 ile örtüşen bayat (eu-west-2=Londra).
- **2 ❓ dosya-adı iddiası** kodda karşılıksız: `llmRateLimiter` (backend:89), `registerMessages.ts` (CLAUDE.md:232).
- DB'ye dokunulmadı, kod değiştirilmedi, PR açılmadı, numara doğurulmadı, hakem olunmadı, CLAUDE.md'ler değiştirilmedi.
