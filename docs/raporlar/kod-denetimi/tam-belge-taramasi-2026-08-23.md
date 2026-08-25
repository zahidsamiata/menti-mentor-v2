# Tam-Belge Taraması — 40+ Belgeden Kayıp Madde Çıkarımı (2026-08-23)

**📸 DONDURULMUŞ (2026-08-23)** — o günün fotoğrafı, güncellenmez. Kanıtlar o anki kod gerçeğine (backend submodule pointer `ba92dfa`, çatı `docs/belge-duzeni-reorg-2026-08-23`) dayanır.

> **Amaç:** Belge reorg turunda 68 belge yalnız YÜZEYSEL (başlık/tür/ilk satır) tarandı — içindeki kararlar sistematik çıkarılmadı.
> Bu tur `raporlar/` + `kararlar/konu/` + `kararlar/oz-denetim/` altındaki **42 içerik belgesi TAM OKUNDU**, her birinden yapılmamış iş /
> verilmemiş karar / açık soru / çelişki çıkarıldı ve **kod gerçeğiyle çapraz kontrol** edildi (belgeye değil koda güven).
> Yöntem: 7 paralel salt-okuma ajanı (6 tarama + 1 referans). Kalan gerçek kayıp maddeler `00-KARAR-TAKIP.md` **Bölüm F**'e işlendi.

## Sayılar
- **Okunan içerik belgesi:** 42 (kesif 10 · kod-denetimi 5 · panel 4 · persona 3 · icerik 6 · konu 13 · oz-denetim 7 — 09/10/00 taşıyıcılar referans ajanında).
- **Ham kalem (7 ajan toplam, ~):** ~247 (çok tekrar + zaten-takip + bayat dahil).
- **Zaten takip ediliyor (10-yol madde 1-67 / KARAR-TAKIP A-E / B.4 Y1-Y7 / ölü kod C):** çoğunluk — referans ajanı (AJAN-7) tam listeyi çıkardı.
- **"Belge açık diyor, kod ARADA YAPMIŞ" (bayat not adayı):** ~25 (aşağıda Bölüm 3).
- **Gerçek YENİ kayıp madde (takipte yoktu + kod-teyitli açık):** **13** → KARAR-TAKIP Bölüm F (3 güvenlik + 10 iş/karar).

---

## Bölüm 1 — GERÇEK YENİ KAYIP MADDELER (Bölüm F'e işlendi)

### 🔴 Güvenlik — CANLI ÖNCESİ (repolar PUBLIC → önce PRIVATE, sonra düzelt)
| Kod | İş | Kanıt (bu tur elle doğrulandı) | Not |
|---|---|---|---|
| G1 | `updateUser` (+2 kardeş uç) yanıtı `select`siz tüm User objesini döner → **password hash + PII sızıntısı** | `backend/src/controllers/userController.ts:272→277` (ayrıca 355→381, 418→424) | =10-yol madde 38; KARAR-TAKIP'te yoktu. Explicit `select` / global `omit` gerek |
| G2 | `hardDeleteUser` Meeting/Feedback FK nullable değil → **transaction rollback = KVKK kalıcı silme çalışmıyor** | `backend/src/services/gdprService.ts:172-174` (kod-yorumu itiraf ediyor) + `schema.prisma` Meeting `mentorUserId/mentiUserId` non-null RESTRICT | =10-yol madde 39; migration olası (onDelete SetNull), PO |
| G3 | `listSuspicionReports` `findMany({where})` `select`siz → **şüphe raporu edenin PII'si (reporterName/contact) maskesiz** platform admin'e döner | `backend/src/controllers/platformController.ts:353` | YENİ bulgu; `maskEmail` deseni burada uygulanmamış |

### 🟡/🔵/❓ Yeni iş / karar / çelişki
| Kod | İş | Tür | Kanıt (tarama-ajanı kod-teyidi) | Boy | Migr |
|---|---|---|---|---|---|
| T1 | Zod VALIDATION hata yanıtında `message` alanı yok → kullanıcı hep generic "Hata" görür | yapılmamış-iş (UX/i18n) | `questionController.ts:83,138,250,297` + `frontend .../questions/page.tsx:52` (`error.message ?? 'Hata'`) | S | Hayır |
| T2 | adaptive-test backend `progress` döndürmüyor (FE guard'la kapatılmış) — kalıcı kontrat düzeltmesi | yapılmamış-iş | `backend/src/services/adaptiveTestEngine.ts` (grep "progress" → yok) | M | Hayır |
| T3 | `SuspicionReport`'ta `tenantId` yok → raporlar global, tenant-izolasyon boşluğu | açık-soru/güvenlik | `platformController.ts:348-356` (where'de tenantId yok) | S | Olası |
| T4 | Sertifika baraj "0 puan" kuralı yalnız `isRedLine` sorularda kodlanmış; "tüm sorularda mı" kararı yok | verilmemiş-karar | `backend/src/services/certification.service.ts:67` (`isRedLine ? ===3 : >=2`) | S | Hayır |
| T5 | `seed-certification.ts` hiçbir runner/npm-script'e bağlı değil → 20-senaryo bankasını canlıya **güvenli** taşıma yöntemi yok | yapılmamış-iş | `package.json` (tek "seed" = `prisma/seed.ts`; cert seed'e referans yok) | M | Evet (kontrollü seed) |
| T6 | `superAdminRoutes` mount edilmiş ama frontend'de 0 kullanım → paralel/ölü ikinci platform-admin API'si | ölü-kod/karar | `backend/src/server.ts:12,105` (mount) + frontend "super-admin" grep → yok | S | Hayır |
| T7 | Mentör **görünürlük opt-in** FE ekranı bağlı değil (backend `setVisibilityOptIn` var) — temel "görünür olmak için rıza" kapısı | yapılmamış-iş | backend `userRoutes` setVisibilityOptIn var; FE'de çağrı → yok | M | Hayır |
| T8 | Sıfırdan manuel eşleştirme: STK panel envanteri "eksik" der, strateji "elle eşleştirme YASAK" der → **çelişki, PO kararı** | çelişki/karar | `stk-yonetici-panel-envanteri:71,148` ↔ `stk-yonetici-strateji:67`; kodda `assign/manualMatch` → yok | M | Hayır |
| T9 | Platform tek-kullanıcı profil drill-down endpoint'i yok (tenant üye listesi var, kişiye inilmiyor) | yapılmamış-iş | `platform.ts` `getTenantOverview/listTenantMembers` var, `/users/:userId` yok | M | Hayır |
| T10 | Mentör emeği görünür kılma (takdir/rozet/"yılın mentörü") — persona-kaynaklı, hiç yok | yapılmamış-iş | `mentor-persona-ve-sevdirme:83-86,98`; kodda rozet/takdir → yok | M | Olası |

---

## Bölüm 2 — GÜVENLİK BULGULARININ ELLE TEYİDİ (bu tur)
- **G1 doğrulandı:** `userController.ts` satır 272 `prisma.user.update({...})` → 277 `res.json(updated)`; select yok. Aynı desen 3 uçta (272/277, 355/381, 418/424). Dönen obje `password` (bcrypt hash) + tüm PII içerir.
- **G2 doğrulandı:** `gdprService.ts:172-174` yorumu aynen: *"Meeting ve Feedback kayıtları silinmez — mentorId/mentiId NULL yapılır. Bu Prisma şemasında FK nullable değilse transaction rollback olur."* → şema nullable değil, yani gerçek hesapta `hardDeleteUser` patlar.
- **G3 doğrulandı:** `platformController.ts:353` `prisma.suspicionReport.findMany({ where, orderBy })` — `select` yok; tüm alanlar (reporter kimlik/iletişim) döner. Aynı controller'da üye listesi için `maskEmail` var ama buraya uygulanmamış.
- **⚠️ PUBLIC repo notu:** Bu üç bulgu, repolar PUBLIC olduğu için dışarıdan okunabilir koddadır. **Düzeltmeden ÖNCE veya en azından aynı anda repoların PRIVATE yapılması** (zaten takip edilen PO-manuel iş) önceliklidir. Bu rapor yeni bir sızıntı yaratmaz (kod zaten herkese açık) ama görünürlüğü artırır → hızlı aksiyon gerekir.

---

## Bölüm 3 — "BELGE AÇIK DİYOR, KOD YAPILMIŞ" (bayat not adayları)
> Bu kalemler için kaynak belgeye ⚠️ GÜNCELLEME notu düşülmeli (ayrı belge-hijyen turu). Silme yok; belge dondurulmuşsa yalnız üst-not.

**Kesif (2026-08-02) belgeleri:** A1 eşleşme paneli · A2 mentör havuzu · A3 menti havuzu · A4 sertifika sonuç panosu · A7 branding paneli (hepsi `frontend/.../(admin)/admin/*` altında YAPILMIŞ) · `listUsers` sayfalama (`userController.ts:99`) · fotoğraf upload altyapısı (`avatarController.ts` multer+magic-byte+rate-limit) · `avatarUrl` havuz select'lerinde · B11 logout UI bağlı · 2 IDOR (candidates/requests) korumalı · `rewardPenalty.ts` ölü DEĞİL (aktif import) · `iceBreaker.ts` kaldırılmış · CLAUDE.md pointer-bump + docs-serileştir reçeteleri eklenmiş.

**Kod-denetimi/panel belgeleri:** K2 OAuth `kvkkConsentAt` TAM (`oauthService.ts:112`) · kurum drill-down FE var (`platform/tenants/[id]/page.tsx`) · `lastLoginAt` altyapısı var (migration + `activityService` + `retentionMetrics`) · KPI drill-down + retention metrikleri var (`/health-metrics`, `ProgramHealthSection`) · nudge (elle) var (`nudgeService` + `POST /users/:id/nudge`) · mail sağlık göstergesi var (`PlatformHealth.mail`) · anomali tespiti v1 var (`getAnomalies`) · `findMatchesDueForCheckpoint` cron'a bağlı (`cronScheduler.ts:359`, log-only) · STK-custom soru düzenle butonu var (`questions/page.tsx:256`) · öğrenme-yolculuğu tamamlanma görünürlüğü var (`adminController.ts:311-335`).

**Konu belgeleri:** DISC çoklu harf (KARAR 1/11) tam kodlandı+test (`discLetters.ts`, `DiscBadge.tsx`, `adminController.ts:290`) → belge 11 "kesin sayı #12'ye bırakıldı" BAYAT · format enum (online vs ONLINE) çelişkisi yok, FE uppercase · timezone bug düzeltilmiş · `Tenant.plan/limits` şema alanları eklenmiş (uygulama mantığı yok, kısmen bayat) · kullanıcı-bazlı hard-delete var (`gdprController.ts:24`) ama kurum-bazlı yok.

---

## Bölüm 4 — icerik/ BELGELERİ KÖKTEN BAYAT (öncül hatalı)
- `raporlar/icerik/` 6 belgesi + `disc-sorulari` **var olmayan `seed-questions.ts`'e dayanıyor** — o dosya backend'de YOK (Glob boş; #45'te silindi). Gerçek tek seed runner `prisma/seed.ts` ve **32 DISC sorusu** üretir (`seed.ts:325-337,503`); belgenin "canlı 20, güvenli set" anlatısı geçersiz.
- Sonuç: bu 6 belgenin DISC/seed kısmı ⚠️ GÜNCELLEME notu ister. "Canlı 20 / canlı 5 / canlı 1" iddiaları kod-only doğrulanamaz (DB sorgusu atılmadı) → gerçek canlı sayım ayrı salt-okuma turu (Y6) gerektirir.
- Not: Öğrenme yolculuğu içeriği kodda TAM ve tutarlı (13 aşama, `seed-learning-journey.ts`); sertifika 20-senaryo bankası kodda MEVCUT (`seed-certification.ts`) — eksik olan yalnız canlıya güvenli taşıma (T5 + madde 30).

---

## Bölüm 5 — MADDE 67 + numara çakışması
- **MADDE 67 (🍪 çerez-izni bandı / KVKK cookie consent) VAR** — `10-yol-haritasi.md:146` (tam tanım) + `:34` (hızlı index). Analytics #56'nın yasal ön-koşulu; PR #110 buna bağlı. **Eklemeye gerek yok** (dünkü şüphe giderildi). En yüksek madde no = 67, süreklilik tam.
- **⚠️ #38 çakışması:** 10-yol madde 38 = `updateUser` PII sızıntısı (güvenlik) · KARAR-TAKIP B.4 "#38" = yeni DISC/karakter derinleşme kurgusu. **Yeni numara verirken 68'den başla**, #38'i güvenlik için ayır.

---

## Bölüm 6 — SONRAKİ TUR İÇİN "TEYİT GEREK" (bu tur kod okunmadı)
Tarama ajanları şu kalemleri belgeden çıkardı ama ilgili kodu bu turda açmadı → bir sonraki turda tek tek doğrulanmalı (uydurma yok, açık işaretlendi): N+1 konuşma listesi (`conversationController.ts:236`) · pagination'sız listeler · Zod validate middleware merkezi mi · a11y noktaları (ReportUserButton modal, form label, radiogroup) · DISC light WCAG renkleri · `PLATFORM_ADMIN_EMAIL` `.env.example` · onay/red maili başvurana gidiyor mu · KARAR 6 davet→otomatik-onay tetiği · `maxMeetingsPerWeek` enforce · profile-completeness uçtan uca bağı.

---

## Yöntem notu
DB'ye hiçbir sorgu atılmadı (SELECT dahil). Kod yalnız OKUNDU (rg + dosya). Hiçbir belge silinmedi. Kişi adı yazılmadı; PII içeriği kopyalanmadı (yalnız konumu işaretlendi). "sanırım/muhtemelen" kullanılmadı — her kalem `dosya:satır` kanıtlı, doğrulanamayan "TEYİT GEREK" işaretli.
