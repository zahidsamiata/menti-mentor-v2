# MentiMentor — Admin Panelleri Keşif + Tasarım Raporu
**Tarih:** 2026-08-02 · **Mod:** salt-okuma keşif (7 paralel ajan) · **Amaç:** 6 admin panelini KODLAMADAN önce tasarımı netleştirmek
**Kaynak:** `docs/teshis-raporu-2026-08-02.md` Grup A. Her karar mevcut koda dayalı (dosya:satır).

> Bu bir TASARIM sunumudur — kod yazılmadı. Kullanıcı tasarımları onaylayınca (belki değiştirerek) ayrı, DevSecOps-katmanlı kodlama turu gelecek.

---

## 🔴 EN KRİTİK BULGU — global seed eksik (veri sorunu, kod DEĞİL)

**A8 (DISC soruları boş görünüyor) + Oyunlaştırma (Learning Journey boş) = AYNI kök neden.**

- Kod SAĞLAM: `buildQuestionList` (questionService.ts) global (`tenantId:null`) + tenant sorularını döndürüyor; frontend `tenantId===null` ile global'leri filtreliyor. Learning Journey route'ları aktif, `seed-learning-journey.ts` 13 aşama tanımlı, `learningJourney.service.ts` tam işlevsel.
- AMA: bu oturumda çalıştırdığımız `seed-test-tenant.mjs` yalnızca **test kurumu + 5 kullanıcı + 3 görüşme** ekledi — **global içeriği eklemedi** (`seed-questions.ts` / `seed-learning-journey.ts` çalıştırılmadı).
- **Sonuç:** Global DISC soruları ve learning stages ana Neon'da muhtemelen YOK → iki özellik de "boş/bozuk" görünüyor ama aslında **veri eksik**.
- **Aksiyon:** Önce global seed'leri ana Neon'a uygula (bir DB yazımı → **kullanıcı kararı**). Muhtemelen 6 panelin 2'si (A8 + oyunlaştırma) hiç kod istemeden düzelir.
- **Doğrulama (salt-okuma):** `SELECT count(*) FROM "Question" WHERE "tenantId" IS NULL` ve `LearningStage` sayısı 0 mı — kodlama turunda ilk adım.

---

## Ortak UI desen envanteri (Ajan 6 — yeni paneller buna UYSUN)

Mevcut admin sayfaları (`(admin)/admin/*`) tutarlı bir şablon kullanıyor:
- **Sayfa iskeleti:** Başlık (`<h1>` + açıklama + opsiyonel Badge) → `AlertMessage` (hata) → filtre/sekme → loading skeleton → empty-state → tablo/grid → sayfalama.
- **Veri:** `const api = useApiClient(); const { data, isLoading, error, refetch } = useQuery(() => adminApi.listX(api, filters), [deps])`.
- **Bileşenler:** `ui/card`, `ui/badge` (variant: success/warning/destructive/brand…), `ui/button`, `molecules/AlertMessage`, `molecules/ConfirmDialog`, `organisms/DashboardMetricCard`.
- **Tablo:** inline `<table>` (ayrı bileşen YOK) — `overflow-x-auto rounded-2xl border`, `thead bg-muted/50`, `tbody divide-y`, satır `hover:bg-muted/30`, sağ-hizalı aksiyon hücresi.
- **Empty-state:** dashed border + emoji + başlık + açıklama (`approvals/page.tsx`, `waiting-room/page.tsx` örnek).
- **Loading:** `animate-pulse bg-muted` yer tutucu (3-4 satır/kart).
- **Filtre/sekme:** `bg-muted p-1` tab grubu (`tags/page.tsx:58-73`) veya button-toggle (`learning-journey/page.tsx:86`).
- **Sayfalama:** `← Önceki / Sayfa n/m / Sonraki →` (`approvals/page.tsx:80-92`).

**Nav yerleşimi** (`(admin)/layout.tsx` — PRIMARY: Onay/Davet/Program; ADVANCED: Bekleme/Yöneticiler/Algoritma/Soru/Etiket/Sertifika/Yolculuk): **yeni panellerin hepsi ADVANCED_NAV'a** →
Eşleşmeler 🔗 · Mentör Havuzu 👥 · Menti Havuzu 👫 · Sertifika Sonuç 📜 · Branding 🎨.

---

## TASARIM KARTLARI

### A1 — Eşleşme paneli (yönetici "kim kiminle eşleşti")
- **Veri:** `Match` modeli (schema.prisma:906): `mentorId, mentiId, predictedScore, sectorScore, characterScore, mentorArchetype, mentiArchetype, status (ACTIVE|COMPLETED|EARLY_EXIT|DISSOLVED), tenantId, createdAt`; ilişkili `Meeting`/`MatchFeedback`.
- **⚠️ DOĞRULANACAK (kritik):** `Match` kayıtları GERÇEKTEN persist ediliyor mu, yoksa `rankMentisForMentor` (matching.ts:40) sadece runtime skorlama mı? Persist edilmiyorsa panelin veri kaynağı **kabul edilmiş eşleşmeler** için `MentorshipAgreement` veya `VisibilityOptIn (APPROVED)` olmalı. Bu, eforu belirler.
- **Endpoint:** Yeni `GET /api/admin/matches?status=&page=` (tenant-filtre). Admin'e eşleşme listesi veren mevcut route YOK.
- **Sayfa:** Tablo (Mentör | Menti | Puan | Sektör% | Karakter% | Durum) + durum sekmeleri + satır-detay (arketip, görüşme sayısı, son feedback).
- **Efor:** **Orta** (Match persist ediliyorsa küçük-orta; edilmiyorsa önce persist/kaynak kararı → büyür).
- **Güvenlik:** tenant izolasyonu (SADECE kendi kurumu), `requireRole('ADMIN')`, **email + ham discVector GÖSTERME** (arketip adı + skor yeterli — KVKK).

### A2 — Mentör havuzu / A3 — Menti havuzu (aynı endpoint)
- **Veri:** `GET /api/users?role=MENTOR|MENTI&isActive=true` (userRoutes.ts:23 → adminController listUsers). Explicit select: `id, fullName, email, role, discType, sectorTags, skills, approvalStatus, isActive, createdAt` (password YOK). Filtreler: role, approvalStatus, isActive, pagination — VAR.
- **Endpoint:** **Mevcut yeter** (A2/A3). A3'te "eşleşme durumu" (bağlantısız/bekliyor/bağlı) sütunu isteniyorsa `VisibilityOptIn` join'li küçük backend ek.
- **Sayfa:** İki havuz **aynı desen** — Kullanıcı | DISC | Sektörler | Kayıt | Durum (+ A3: Eşleşme Durumu). Filtre: durum/DISC.
- **Efor:** **Küçük** (A2), **küçük-orta** (A3, eşleşme sütunu backend ek isterse). *(Ajan'ın "7 gün" tahmini şişirilmiş — bunlar mevcut endpoint + tek liste sayfası.)*
- **Güvenlik:** tenant izolasyonu, admin-only, email maskeleme **opsiyonel** (yönetici kendi üyelerini görüyor).

### A4 — Mentör sertifika sonuç panosu
- **Veri:** `TenantMembership` (schema.prisma:975): `isCertified, certificationStatus (NOT_STARTED|IN_PROGRESS|CERTIFIED|FAILED|COOLDOWN), certScore, certAttempts, certifiedAt, cooldownUntil, certWrongTopics` — TAM var. `certification.service.ts` CERT_CONFIG (passRateThreshold 0.8, red-line).
- **Endpoint:** Yeni `GET /api/admin/mentors/certification-results?status=&page=` (mevcut yalnızca konu aç/kapa var: `admin/certification`).
- **Sayfa:** Yeni `/admin/certification-results` — Tablo: Mentör | Durum rozeti (Geçti/Kaldı/Bekliyor/Başlamamış) | Skor% | Deneme. Filtre: durum. Detay modal: sertifika tarihi + yanlış konular.
- **Efor:** **Orta (~3-4h)** — veri hazır, yeni endpoint + sayfa.
- **Güvenlik:** tenant izolasyonu, admin-only, `certScore` sadece admin görür (mentör başkasınınkini görmez).

### A7 — Kurum branding düzenleme (kayıt sonrası)
- **Veri:** `Tenant.logoUrl, primaryColor, displayName` (schema.prisma:156-158). Onboarding `Step3Branding.tsx` formu (logoUrl input + 6 preset renk + custom picker + canlı önizleme) yeniden kullanılabilir. `TenantProvider` + `lib/branding.ts` (hex→HSL) enjeksiyonu hazır.
- **Endpoint:** **Mevcut** `PATCH /api/tenants/:id/onboarding` (selfServeController: `extractAdminPayload` → admin + `payload.tenantId !== id → 403` tenant-izole; logoUrl `z.string().url()`, primaryColor hex regex). Yeter — yeni endpoint şart değil (istenirse ayrı `PATCH /api/tenants/:id/branding` netlik için).
- **Sayfa:** Yeni `/admin/branding` — Step3 formu + canlı önizleme. `displayName` düzenlemesi için UpdateOnboardingSchema'ya alan eklenebilir (küçük).
- **Efor:** **Küçük-orta.** ⚠️ **Logo = URL only** — dosya-upload altyapısı YOK (S3/CDN gerekirse ayrı büyük iş).
- **Güvenlik:** tenant izolasyonu (SADECE kendi kurumu), admin-only. ⚠️ **logoUrl XSS:** `z.string().url()` yetersiz — `data:image/svg+xml,<svg onload>` / kötü SVG geçebilir. Öneri: MIME/host doğrulama + CSP `img-src https:`. Kodlama turunda ele al.

### A8 — DISC sorularını görüntüleme (DÜZELTME)
- **Kök neden:** Kod SAĞLAM (yukarıdaki "global seed eksik" bulgusuna bakınız). `buildQuestionList` global+tenant döndürüyor, `admin/questions` `tenantId===null` global'leri listeliyor. Ajan A5 (a/b/c) arasında kesinleştiremedi ama en olası (a) **veri:** global sorular ana Neon'da seed'li değil.
- **Aksiyon:** Global seed'i uygula → sorular görünür. Kod değişikliği muhtemelen GEREKMİYOR. (Kodlama turunda önce `SELECT count(*) FROM "Question" WHERE tenantId IS NULL` ile doğrula.)
- **Efor:** **Küçük / veri.**

---

## Oyunlaştırma (Learning Journey) — DURUM (Ajan 7, sadece bilgi)
- **Ne:** Keşif motoru (`learningJourney.service.ts`, 550 satır) — Durum→Seçenek→Outcome(correct/warn/wrong)+Feedback. **Puanlama YOK = bilinçli tasarım** (test: `expect(res.body).not.toHaveProperty('score')`). `seed-learning-journey.ts` 13 aşama (7 mentör + 6 menti), route aktif.
- **Kullanıcı nerede görmeli:** `/learning-journey` (MENTOR/MENTI — **ADMIN görmez**, `audienceForRole` reddediyor).
- **"Boş" nedeni:** (a) global seed ana Neon'a uygulanmamış (en olası), (b) ADMIN hesapla bakılmış, (c) yanlış tenant header. **Kod sorunu yok** — puanlama-yokluğu doğru/bilinçli.
- **Not:** Kullanıcı "detay göremiyorum" dediyse: seed'i uygula + MENTÖR/MENTİ hesapla `/learning-journey`'e gir.

---

## Önerilen kodlama sırası (öncelik kullanıcının)
1. **VERİ (kod yok):** global seed'leri ana Neon'a uygula (`seed-questions`, `seed-learning-journey`) → A8 + oyunlaştırma "kendiliğinden" dolar. **DB yazımı → kullanıcı kararı.**
2. **Grup 1 (küçük, hızlı kazanç):** A2 Mentör + A3 Menti havuzu — mevcut endpoint, ortak desen. Tek tur.
3. **Grup 2 (yeni endpoint):** A4 Sertifika sonuç + A1 Eşleşme (**A1 için önce Match persist/kaynak doğrula**).
4. **Grup 3:** A7 Branding (logoUrl XSS doğrulamasıyla).

**Güvenlik önizleme (tüm paneller):** her yeni admin endpoint `requireTenant` + `requireRole('ADMIN')` + `where: { tenantId }`; PII (email maskeleme opsiyonel, ham DISC vektörü ASLA); audit log (mevcut `logger.info` deseni). Yeni yüzey dar (çoğu okuma).

**Kod yazılmadı. Kullanıcı tasarımı onaylayınca (değiştirerek) kodlama turu başlar.**
