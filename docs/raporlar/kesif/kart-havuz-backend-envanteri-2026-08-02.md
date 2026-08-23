# Kart / Havuz / Uyum / Niyet Mektubu / Foto — Backend Envanteri (Keşif)
**📸 DONDURULMUŞ (2026-08-02)** — o günün keşif fotoğrafı, güncellenmez; güncel durum: `09-DURUM.md`

**Tarih:** 2026-08-02
**Mod:** Salt-okuma keşif. Kod değişmedi.
**Amaç:** Menti/mentör kart tasarımı + çift yönlü havuz + uyum yüzdesi + niyet mektubu +
zorunlu fotoğraf işine başlamadan önce, backend/frontend'de ZATEN VAR OLAN kodu bulmak.
Sıfırdan yazmak yerine mevcut emeğin üstüne inşa etmek.
**Yöntem:** 3 Explore agent'ı backend route/controller/service, `backend/prisma/schema.prisma`
ve ilgili frontend sayfa/api-client'larını okudu. Her bulgu dosya:satır kanıtlı.

---

## Özet Tablo

| Konu | Durum | Kart işine hazır mı |
|------|-------|---------------------|
| 1 Uyum yüzdesi / eşleşme skoru | ✅ VAR | Evet — API'den dönüyor, frontend zaten gösteriyor |
| 2 Niyet mektubu / talep akışı | ✅ VAR | Evet — `requestMessage` 1000 char, mentör görüyor |
| 3 Müsaitlik / takvim | ✅ VAR | Evet — dışarı açık endpoint, akış tam |
| 4 Fotoğraf / profil resmi | 🟡 KISMEN | **Hayır — tek gerçek eksik** |
| 5 Havuz / listeleme (çift yönlü) | ✅ VAR | Evet (avatar hariç) — endpoint + sayfalama + çift yönlü |
| 6 DISC rozeti / sektör etiketi | ✅ VAR | Evet — rozet + etiket dönüyor, KVKK ayrımı var |

---

## KONU 1 — Uyum Yüzdesi / Eşleşme Skoru → ✅ VAR (kartta gösterilebilir)

**Skor hesaplama**
- `backend/src/services/scoring.ts:31-84` — `computeSectorScore`, `computeDiscScore`,
  `computeTotalScore`. Formül: **sektör × 0.6 + DISC × 0.4 = totalScore (0-100)**.

**Ranking**
- `backend/src/services/matching.ts:40-204` — `rankMentisForMentor` (mentör için menti
  adaylarını sıralar, 4 kademeli fallback: strict → loose).
- `backend/src/services/scoring.service.ts:165-192` — `rankMentorsForMenti`.

**API'den DÖNÜYOR (kritik)**
- `GET /api/mentors/:mentorId/candidates` (`matchingController.ts:39-71`) →
  `{ mentiId, mentiName, totalScore, sectorScore, discScore, confidence, fallbackLevel, warnings }`.
- `GET /api/meetings` (`meetingController.ts:172`) → `match { predictedScore, sectorScore, characterScore }`.

**Frontend ZATEN gösteriyor**
- Mentör paneli `%X uyum` + sektör/DISC alt kırılımı (`mentor/page.tsx:381-407`).
- Admin eşleşmeler `%{predictedScore}` + sektör + karakter (`admin/eslesmeler/page.tsx:145-156`).

**Durum detayı**
- DISC uyumu ✅ çalışıyor: `DISC_COMPATIBILITY` matrisi + adaptif test vektörü blend
  (`confidence × vector + (1-confidence) × matrix`) + anti-match D↔S engeli (`matching.ts:20-22`).
- 🟡 Sektör uyumu: basit tag-overlap (kesişim / menti-tag-sayısı, `scoring.ts:31-41`).
  5-bileşen `sector-scorer.service.ts:67-85` (taksonomi/beceri/hedef/kıdem/bağlam) **yazılı
  ama `matching.ts` çağırmıyor** — hayalet kod, İŞ 7 bunu bağlayacak.

---

## KONU 2 — Niyet Mektubu / Talep Akışı → ✅ VAR

**Ana akış (MatchRequest)**
- Model: `schema.prisma:369-386` — `requestMessage String? @db.VarChar(1000)`.
- Oluşturma: `POST /api/requests` → `requestController.ts:19-76` (`createMatchRequest`).
- Zod: `requestMessage: z.string().min(1).max(1000).optional()` (`requestController.ts:14`)
  → **1000 karakter, niyet mektubu boyu** (opsiyonel).
- Frontend: `matchRequestApi.create()` (`frontend/src/lib/api/matching.ts:38-45`),
  menti dashboard mesaj alanı (`menti/page.tsx:91-108`).

**İkinci akış (menti-driven görünürlük talebi)**
- `POST /mentis/:mentiId/request-visibility` → `mentiRequestController.ts:34`
  (`requestVisibilityFromMentor`), `requestMessage max(500)`.
- Model: `VisibilityOptIn` (`schema.prisma:327-354`), bidirectional `OptInInitiator` enum.

**Mentör görebiliyor mu → ✅ Evet**
- `GET /mentors/:mentorId/pending-visibility-requests` (`mentiRequestController.ts:148-209`),
  select'te `requestMessage: true` (satır 185).
- `GET /requests/:id` (`requestController.ts:103-124`) — IDOR korumalı (oluşturan menti,
  hedef mentör veya ADMIN görebilir).

---

## KONU 3 — Müsaitlik / Takvim → ✅ VAR (dışarı gösteriliyor)

**Altyapı**
- Model: `AvailabilityBlock` (`schema.prisma:952-970`) — `weekday` (Weekday enum),
  `startTime`/`endTime` ("HH:MM"), `timezone` (default Europe/Istanbul), `isActive`.
- Controller'lar: `saveAvailability` (`meetingController.ts:223-285`), `getAvailability`
  (288-312), `bookMeeting` (329-442).
- Route'lar: `meetingRoutes.ts:31-51` — `POST /availability`, `GET /availability`, `POST /book`.

**Müsaitlik dışarı açık mı → ✅ Evet**
- `GET /api/meetings/availability?mentorUserId=...` (`meetingRoutes.ts:39-43`, `requireAuth`)
  → `{ mentorUserId, blocks }`. Haftalık tekrarlı program.
- Frontend: `getAvailability(api, mentorUserId)` (`meetings.ts:93-94`), takvim render
  (`book-meeting/page.tsx:34-38`).

**"Müsait saate tıkla → talep" akışı → ✅ TAM**
- `POST /api/meetings/book` (`bookMeeting`): müsaitlik-aralığı kontrolü (`381-400`),
  çakışma kontrolü (mentör+menti, `402-417`), geçmiş zaman engeli (`358`).
- `requestMessage` min 50 / max 500 (`meetingController.ts:323-326`), PENDING oluşturur
  (mentör onayı bekler). Onay: `POST /:meetingId/approve` → SCHEDULED.

---

## KONU 4 — Fotoğraf / Profil Resmi → 🟡 KISMEN (en zayıf halka)

**Alan VAR ama sadece OAuth'dan doluyor**
- `User.avatarUrl String?` (`schema.prisma:282`).
- Google OAuth `picture` URL'i sanitize edilip yazılıyor (`googleProvider.ts:40-84`,
  `oauthService.ts:105`). Allowlist: `lh3.googleusercontent.com` vb. HTTPS domain'ler.

**❌ Client-side upload YOK**
- Multer/multipart middleware yok. `/avatar-upload` gibi endpoint yok. Dosya depolama
  (S3/disk/dış servis) yok. Foto sadece OAuth anında geliyor.

**❌ Havuz kartlarında gösterilmiyor**
- `listUsers` select'inde `avatarUrl` yok (`userController.ts:73-87`).
- Frontend her yerde baş-harf avatar: `admin/mentor-havuzu/page.tsx:108`,
  `mentor/page.tsx:384`, `menti/page.tsx:253`.
- `MentorListItem` / `RankedMenti` tiplerinde `avatarUrl` yok (`types/matching.ts`).
- Ayrı bir avatar-resim UI component'i yok.

**Zorunlu foto**
- Şema izin veriyor (`String?` → `String` yapılabilir) ama önce upload altyapısı +
  boyut/tip validasyonu + rate limit gerekir.

---

## KONU 5 — Havuz / Listeleme (Çift Yönlü) → ✅ VAR (avatar hariç kart alanları hazır)

**Menti → mentör havuzu**
- `GET /api/users?role=MENTOR&isActive=true&pageSize=100` (`userController.ts:39-96`,
  `listUsers`). Frontend: `matchingApi.listMentors()` (`matching.ts:17-18`).
- Select: `id, role, email, fullName, isActive, sectorTags, discType, skills, bioSummary,
  expertiseDetails, targetAudience, needsOrientation, createdAt` — **`avatarUrl` yok**.

**Mentör → menti aday havuzu**
- `GET /api/mentors/:mentorId/candidates` (`matchingController.ts:39-71`). Filtreler:
  `minMatchScore`, `excludeDiscTypes`.
- Dönüş: `mentiId, mentiName, totalScore, sectorScore, discScore, confidence, skills,
  fallbackLevel, warnings` (`matching.ts:5-17`) — **`avatarUrl` yok**.

**Admin listeleri**
- `GET /api/admin/users` (`adminController.ts:136-169`) — **`avatarUrl` yok**.
- `GET /api/admin/matches` (`adminController.ts:185-231`) — `predictedScore, sectorScore,
  characterScore, mentorArchetype, mentiArchetype, status` + nested isimler.

**Sayfalama → ✅ hepsinde**
- `page` (default 1) + `pageSize` (default 50, max 100) → `{ items, total, page, pageSize,
  totalPages }`. Menti havuzu `pageSize=100` istiyor (`matching.ts:18`).

**Çift yönlü görünürlük → ✅ VAR**
- Mentör → menti: `POST /api/mentors/:mentorId/visibility-optin` (`matchingController.ts:80-147`).
- Menti → mentör: `POST /api/mentis/:mentiId/request-visibility` (`userRoutes.ts:119-123`).
- Model: `VisibilityOptIn` (`schema.prisma:327-354`), `OptInInitiator` enum (MENTOR | MENTI).

**Kartta ZATEN render edilen alanlar (avatar hariç)**
- Ad (`fullName`), DISC tipi (renk rozeti), sektör etiketleri (`sectorTags`, 2-3 + "+N"),
  beceriler (`skills`), uyum skoru (`totalScore` %), uyarı rozeti (`fallbackLevel > 0`).

---

## KONU 6 — DISC Rozeti / Sektör Etiketi Verisi → ✅ VAR (KVKK ayrımı mevcut)

**DISC tipi**
- `enum DiscType { D, I, S, C }` (`schema.prisma:18-23`), `User.discType DiscType?`
  (`schema.prisma:238`). Onboarding'de yazılıyor (`onboardingController.ts:410-415`).
- API'den dönüyor: `GET /api/users/:id` ve `GET /api/users?role=MENTOR`
  (`userController.ts:39-96, 116-154`).

**Sektör etiketi**
- `User.sectorTags String[] @default([])` (`schema.prisma:236`). Tüm user endpoint'lerinde
  dönüyor (`userController.ts:79, 126`).

**Gösterilebilir rozet (arketip)**
- `discResultCard` JSON (`schema.prisma:271`, yazan `onboardingController.ts:402-415`):
  arketip ("Öncü/Ateşleyici/Yapı Taşı/Kâşif"), ikon, süper güç, güçlü yönler, uyumlu tipler.

**Ham vs gösterilebilir ayrımı (KVKK) → ✅ VAR**
- Ham (gösterilmez): `discVector` (0-1 vektör), `temperamentJson`.
- Gösterilebilir (kart): `discResultCard` (arketip/ikon).
- Maskeleme: `buildPublicItem` (`matchingController.ts:10-16`) — nicel skor gizleniyor,
  `compatibilityReason` nitel yapılıyor.
- ⚠️ **Teyit gerek / risk:** `GET /api/users/:id` ham `discVector` döndürüyor
  (`userController.ts:128`). Kart işinde bu endpoint kullanılmamalı; liste endpoint'lerinin
  maskeli çıktısı tercih edilmeli.

---

## SONUÇ — Kart işine başlamak için ne hazır, ne eksik

**Hazır (sıfırdan backend gerekmez):** Konu 1, 2, 3, 5, 6. Mevcut endpoint'ler kullanılır.

**Kritik bağımlılık netleştirmesi (uyum yüzdesi):**
Uyum yüzdesi API'den ZATEN dönüyor ve frontend gösteriyor. Kartta uyum%'yi göstermek
**İŞ 7'yi (sektör-scorer bağlama) BEKLEMEZ.** İŞ 7 sadece skoru daha isabetli yapar;
kart bugünkü basit tag-overlap skoruyla çalışır. Yani kart işi İŞ 7'ye bloke değil.

**Tek gerçek eksik: FOTOĞRAF (Konu 4).** "Zorunlu foto" hedefi için efor/öncelik sırası:
1. **(Orta efor)** Foto upload altyapısı — endpoint + depolama (disk/S3/dış servis) +
   boyut/tip validasyonu + rate limit (public/yarı-public → kötüye kullanım koruması).
2. **(Düşük efor)** `avatarUrl`'i havuz select'lerine ekle (`userController.ts`,
   `adminController.ts`, `matchingController.ts`) + frontend tiplerine (`types/matching.ts`)
   + baş-harf avatar'ı resimle değiştir.
3. **(Düşük efor)** Kayıt/profil akışında foto zorunluluğu.

**İkincil not (güvenlik):** Kart/havuz verisinde ham `discVector` sızmamalı;
`GET /api/users/:id` yerine maskeli liste endpoint'leri kullanılmalı (teyit gerek).
