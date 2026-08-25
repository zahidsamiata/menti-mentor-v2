# Yarım-İş & Niyet Envanteri — Kod Arkeolojisi (2026-08-23)

**📸 DONDURULMUŞ (2026-08-23)** — o günün fotoğrafı, güncellenmez. Kanıtlar backend submodule pointer `ba92dfa` koduna dayanır.

> **Amaç:** "backend tam / frontend yok ~14 özellik" iddiasının ARKASINDAKİ LİSTE hiç çıkarılmamıştı. PO ilkesi: *"o kodu bir
> sebeple yazdık; önemli olan neden yazdığımızı bulup kaldığı yerden devam etmek."* Bu envanter her yarım-iş/bağlanmamış-kod
> kalemini **niyetiyle** (git log + PR + docs + kod-yorumu sırasıyla arandı) + neye bağlanacağı + bitirmek için ne eksik + kod-teyidiyle listeler.
> Yöntem: 5 paralel salt-okuma ajanı. "SİL" önerisi yok — silme PO kararı. Özet Bölüm F + `00-KARAR-TAKIP.md` C.2'de.

## Yöntem & niyet kaynağı
Çoğu bağlanmamış endpoint/tablonun niyeti **2026-07-07 tarihli "sprint 8-11" mega-commit'ine** dayanıyor: backend-first inşa edilmiş, FE sonraya bırakılmış. KVKK üçlüsü + mentor opt-in için açık planlı-niyet kanıtı `oz-denetim/unutulmus-niyet-envanteri-2026-08-10.md:102,105`. DB'ye hiçbir sorgu atılmadı; kod yalnız OKUNDU (rg + dosya + `git log --follow` + `gh pr`).

---

## 1. AJAN-A — Eski hayalet raporları (2026-08-02) kodla yeniden doğrulama
**24 kalem · BAĞLA 8 · BEKLET 12 · ❓PO 4.** 3 haftada en önemli kalemler ARADA YAPILMIŞ:
- **Avatar/foto upload** (kart raporunun "tek gerçek eksik"i) → TAM bitmiş: `avatarController.ts` + multer 5MB + magic-byte + rate-limit + `avatarStorage.ts` + FE `profile/page.tsx:120` + kart select'leri (`matching.ts:147,367`).
- **Coaching Suggestions** → admin waiting-room'a bağlı (`admin/waiting-room/page.tsx:195` + `CoachingSuggestionsDialog.tsx`).
- **rewardPenalty · OCEAN adapter · sjt-scorer · notificationService · discResultCard okuma** → hepsi bağlı (ölü-kod raporunun yanlış-pozitifleri).

**Hâlâ gerçekten açık:** SJT scoring endpoint'leri (`sjtScoringRoutes.ts:20,26`, FE'siz) · `/rematch` (admin FE aksiyonu yok) · `visibility-optin/confirm` · `sector-scorer.service.ts` (İŞ 7) · `SjtQuestion/SjtOption` tabloları (`schema.prisma:889,906`, 0 prisma query) · `taxonomy.service`/`IndustryNode` (sector-scorer'a bağlı) · `iceBreaker.ts` (decommissioned) · `matchingInterface.ts` (planlı JOB_LISTING) · `llmRetry.ts` (yorum "aktif" der ama 0 import — yorum-kod çelişkisi, tüketici `matchReason.ts` silinmiş).

## 2. AJAN-B — Bağlanmamış endpoint avı
**Toplam route 108 · gerçek bağlanmamış 18 (+ meşru FE'siz 6: super-admin×4 debug, cron×2).** Her biri `rg` ile FE-çağrı-yok teyitli.

Gerçek bağlanmamış (niyet + öneri): `/scoring/compute-profile` · `/scoring/rank-mentors` (BEKLET, SJT) · `GET+PATCH /admin/reports` (tenant şikayet inceleme, ❓PO) · `/users/:id/rematch` (BAĞLA) · `/visibility-optin/:id/confirm` (BAĞLA) · `/feedback-logs/combination-scores` (BEKLET, ML panel) · `/meetings/active` (poller, ❓PO) · `GET /meetings/:id/check-ins` (BEKLET) · `/meetings/reminders/send` (❓PO, cron yeterli mi) · `/meetings/orientation-lock/:userId` (❓PO) · `POST /questions/respond` bulk (❓PO, data-migration aracı) · `PATCH /users/me/social` (BAĞLA, niyet belgede yok) · `PATCH /users/:id/self-profile` (❓PO, me/profile ile mükerrer mi) · `/tenants/:id/block-pair` (BEKLET) · `POST /tenants` + `PATCH /tenants/:id` platform (❓PO) · `GET /requests` + `/:id` (BEKLET) · `/clubs` 7 uç (❓PO) · `/system-logs` (❓PO, platform/logs ile mükerrer).

## 3. AJAN-C — Yazılmış ama kullanılmayan kod
**İmportsuz dosya 8 · yazılmayan şema alanı 7 · eyleme-değer TODO 6.**
- **İmportsuz (dış import 0):** `llmRetry.ts` (tüketici silinmiş, ❓PO) · `matchingInterface.ts` (BEKLET, JOB_LISTING) · `profile-completeness.service.ts` (BEKLET) · `sector-scorer.service.ts` (BEKLET, v2 #14) · `ContextualFeedbackHost.tsx` (BEKLET, #7 Aşama 3) · `MeetingScheduler.tsx` (❓PO, canonical kopya) · `ProfileStrengthCard.tsx` (BEKLET) · `TenantSwitcher.tsx` (BEKLET, çok-kurum).
- **Yazılmayan `Feedback` alanları** (`schema.prisma:593-605`): `engagementScore` · `goalClarityScore` · `periodicCareerGrowth/TrustScore/NetworkScore/ConfidenceScore/NpsScore` — hepsi yalnız menti-gizleme destructure'ında geçiyor, `create.data`+Zod'da YOK. Migration GEREKMEZ (alanlar şemada; yazan kod eksik). = #7 değerlendirme formu (Aşama 3).
- **🔴 GÜVENLİK TODO:** `(admin)/layout.tsx:6` "middleware Sprint 15'te" → admin guard hâlâ **yalnız client-side** (proje kuralı "frontend guard yeterli değil"e aykırı) = K6. `LoginForm.tsx:7` "Sprint 14 TenantProvider köprüsü" → bayat olabilir (❓TEYİT).
- Not: (a)+(b) kalemleri `00-KARAR-TAKIP.md:180-191` + `10-yol:44-45,14`'te zaten kayıtlı — bu denetim onları kodla bağımsız doğruladı, yeni çelişki yok.

## 4. AJAN-D — Frontend'i olmayan backend özellikleri
**İddia "~14" → kod-teyidiyle DOĞRULANAN 9.** BAĞLA 6 · ❓PO 2 (+ hard-delete FK ayrı iş).
| Özellik | Backend (dosya:satır) | FE eksik | Öneri |
|---|---|---|---|
| KVKK veri dışa aktarma `GET /users/:id/export` | `gdprController.ts:39` + `gdprService` | FE 0 çağrı | BAĞLA (=madde 40) |
| KVKK anonimleştirme `POST /users/:id/anonymize` | `gdprController.ts:9` | FE 0 | BAĞLA (=madde 40) |
| KVKK kalıcı silme `DELETE /users/:id/hard-delete` | `gdprController.ts:24` + `gdprService.ts:145` | FE 0 | BAĞLA — ama önce backend FK/SetNull (G2/madde 39) |
| Mentör görünürlük opt-in `POST /mentors/:id/visibility-optin` | `matchingController.ts` + **test var** `matching.test.ts:106` | FE 0 | BAĞLA (=Bölüm F T7) |
| Admin double-opt-in `POST /admin/visibility-optin/:id/confirm` | `adminController.ts` | FE 0 | BAĞLA |
| Kulüp modülü `/clubs` CRUD+members | `clubController.ts` + `Club/ClubMembership` | FE 0 | ❓PO (ürün önceliği belirsiz) |
| Feedback-logs `/feedback-logs`+`/combination-scores` | `feedbackLogController.ts` + erişim testi | FE 0 | ❓PO (ML panel mi iç araç mı) |
| Sosyal profil `PATCH /users/me/social` | `onboardingController.ts:461` (explicit select) | FE 0 | BAĞLA düşük-risk (niyet belgede yok) |
| Kurum-içi şikayet inceleme `GET/PATCH /admin/reports` | `reportController.ts` | FE 0 (yalnız platform user-reports var) | BAĞLA (döngü kapanır) |

**"~14"ten düşen yanlış-pozitifler (KOD kazandı):** `meetings/active` + `pair-signal` (FE-client stub `meetings.ts:116` VAR, ekran yok — #7 kümesi) · `profile-completeness` (backend caller da YOK, iki uçta bağsız) · `tenant-switcher` (FE var, backend `/my-tenants` YOK — ters durum) · `super-admin` (`/platform/*` ile ikame). Bu 9 kalemin tablolarının hepsi şemada mevcut (42 migration) → **FE bağlama migration İSTEMEZ**; tek istisna hard-delete FK zinciri (G2, ayrı iş).

## 5. AJAN-E — Yaşayan belge sınır denetimi
- **19 gerçek 🔄 YAŞAYAN belge** (rg 20 döndü; `belge-temizlik-haritasi-2026-08-14` üst-etiketi aslında 📸 → kapsam dışı).
- **Etiket-gerçek çelişkisi 3** (git son-içerik-değişikliği ile, bugün baz):
  - `oz-denetim/durum-panosu-2026-08-14.md` — 🔄 ama 11 gün donmuş + madde 38-67/#12/#37/#7'den habersiz + adı zaten tarihli → **📸'ye düşürülmeli** (en net vaka).
  - `konu/tasarim-kararlari-admin-2026-08-11.md` — tarihli ad + 🔄 etiket (Kural-4 ihlali) → yaşayan kalacaksa ad tarihsizleşmeli.
  - `konu/degerlendirme-metrik-...-2026-08-19.md` — bayat değil (6 gün, aktif #7'ye bağlı) ama tarihli ad + 🔄 → ad tarihsizleştirilebilir; dondurmaya gerek yok.
  - ⚠️ Taşıma/yeniden-adlandırma YAPILMADI — salt öneri, karar PO'da (ad değişimi referans günceller).
- **Gerçek statü çelişkisi: 0.** İki taşıyıcı çift (00-KARAR-TAKIP↔10-yol · 10-yol-tamamlananlar↔09-DURUM) satır-satır + kodla teyitli senkron (#34, #37, #9b, #30/T5, tamamlananlar↔09-DURUM tümü örtüşüyor). Tek not: #38 numara çakışması — ama KARAR-TAKIP kendi içinde zaten uyarmış → çelişki değil, bu turda çözüldü (bkz. Bölüm F numaralandırma).
- **KURAL 7** (taşıyıcı belge iş bölümü) önerildi → `belge-duzeni-rehberi.md`'ye eklendi.

---

## Kapanış
DB'ye dokunulmadı · kod OKUNDU/değiştirilmedi · hiçbir "SİL" önerisi yok (silme PO kararı) · kişi adı yazılmadı · PII içeriği kopyalanmadı. Her kalem `dosya:satır` kanıtlı; niyeti bulunamayanlar "❓ NİYET BİLİNMİYOR → PO'ya sor" işaretli (ör. `PATCH /users/me/social`). Aksiyon özeti: `00-KARAR-TAKIP.md` C.2 + Bölüm F.
