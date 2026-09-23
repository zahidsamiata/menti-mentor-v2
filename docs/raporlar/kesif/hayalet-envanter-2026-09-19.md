> 🧊 DONMUŞ — rutin turda okunmaz (yalnız bir kalemin geçmişi aranırken, grep ile).
> TÜR: 🧊 · SON DOĞRULAMA: 2026-09-19 (📸 fotoğraf tarihi) · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)
> ⚠️ Bu belge kalemlerin TANIMINI tutar, DURUMUNU TUTMAZ. Buradaki işaretler 2026-09-19 durumudur. Güncel durum: `docs/otonom/00-KUYRUK.md` (köprü: `docs/kararlar/00-KART-INDEKSI.md`)
> İŞLENME: ✅ işlendi (2026-09-19, tur: TUR 1 — E-1/E-2) → AŞAMA E (BITTI satırları `docs/otonom/arsiv/00-KUYRUK-bitti-2026-09.md`) · KARAR-12…17 · kutu: 2026-09-23 DA turu (belge-duzeni-rehberi § KURAL 23)

# 📸 HAYALET ENVANTER — Niyet Arkeolojisi + Triyaj (2026-09-19)

**📸 DONDURULMUŞ keşif raporu** · Otonom Tur — Aşama E (E-1 + E-2) · salt-okuma, hiçbir kod değişmedi.
Yöntem: 4 paralel salt-okuma alt-ajan (backend öksüz uçlar · ölü şema alanları · mount edilmeyen bileşenler · eski denetim + niyet arkeolojisi). Her iddia dosya:satır kanıtlı.

> ⚠️ Bu rapor AKSİYON KAYNAĞI DEĞİLDİR (KURAL 8). Aksiyonlar `docs/otonom/01-KARARLAR.md`'ye karar kartı (KARAR-12..17) olarak, kapsanan kalemler mevcut KARAR-9/10/11'e referansla girmiştir.

---

## 0. SAYILAR (bir bakışta)

| Kategori | Bu turun sayısı | Eski denetim (2026-08-02) |
|---|---|---|
| Öksüz backend ucu (frontend çağırmıyor) | **35** | 6 "muhtemel hayalet" (teyit-gerek dilinde) |
| Ölü şema alanı (0 oku + 0 yaz) | **4** (biri WIP, biri yaz-oku-yok) | "birkaç aday" (discResultCard, SJT, IndustryNode) |
| Mount edilmeyen frontend bileşeni | **3** (+1 bağlı context) | (kapsam dışıydı) |

**Eski "~56 uç / ~44 kalem" ile fark:** Bu sayılar repoda kanıtlanamadı — `hayalet-backend-2026-08-02.md` gerçekte **6 uç** saydı ("en az" dilinde). "~56/~44" başka bir oturumun şişmiş çapraz-toplamı; repoda izi yok. Bu tur envanteri **baştan** çıkarıldı.

**Bu turda elenen yanlış-pozitif (kanıtlı):**
- `GET /api/platform/tenants/:id/meetings` — "öksüz" sanıldı; aslında `platform.ts`'de `${id}/meetings` ile ÇAĞRILIYOR → elendi.
- (Tarihsel, doğrulandı) `/orientation-completed` · `temperament-test` · `self-profile` · `rewardPenalty.ts` geçmiş denetimlerde "ölü" denip sonra çürütülmüştü — bu tur da dikkate alındı.

---

## 1. KAPSAM BEYANLARI

**(a) Öksüz backend uçları:** Tarandı `backend/src/routes/*.ts` (23 dosya) + `server.ts` mount tablosu (satır 84-133) → ~110 mount edilmiş handler. Frontend tarafı `frontend/src` TÜMÜ (`lib/api/*.ts`, `app/`, `components/`, `providers/`, `hooks/`, `middleware.ts`) → 134 benzersiz `/api/...` literali. Harf duyarsız (`grep -i`), İKİ DİLLİ (club↔kulüp/kulup · job↔ilan · meeting↔görüşme · super-admin↔superadmin · system-log↔systemLog · feedback-log↔feedbackLog · rematch↔yeniden eşleş · temperament↔mizaç). Testler (`__tests__/`) çağıran SAYILMADI.

**(b) Ölü şema alanları:** Tarandı `backend/prisma/schema.prisma` → **39 model** (backend/CLAUDE.md "38" der = bayat), ~230 non-standart alan. Kullanım araması `backend/src` + `tests` + `scripts` + `prisma` (harf duyarsız). id/createdAt/updatedAt gürültüsü + enum'lar hariç. İlişki (relation) FK'ları AYRI değerlendirildi (ORM navigasyonu düz-ad taramasında kaçar → `IndustryNode.parentId` bu yüzden ölü SANILDI ama `taxonomy.service.ts:23` `parent` relation'ıyla okuyor = CANLI, elendi).

**(c) Mount edilmeyen bileşenler:** Tarandı `frontend/src/components/**/*.tsx` → 46 bileşen. Her export için `frontend/src` genelinde `import`/`<Ad` referansı (harf duyarsız), kendi dosyası + `__tests__` mock elendi. app router `page/layout/route` framework-mount sayıldı (öksüz denmedi). `--follow` ile gerçek köken bulundu (düz `--diff-filter=A` monorepo yeniden-adlandırma commit'ini yanlış gösteriyordu).

---

## 2. ENVANTER — (a) Öksüz backend uçları (35)

> Hiçbiri **kırık değil** — hepsi çalışır, yalnızca istemci çağırmıyor. Kökeni çoğunlukla iki mega-commit: `3e49117` (2026-05-22 ilk iskele) ve `de6be04` (2026-07-07 sprint 8-11 freemium PLG). Mega-commit'ler uç-düzeyi gerekçe içermez; niyet docs'tan çıkarıldı.

| # | Uç grubu (uç sayısı) | route dosya | Kova | Kapsandığı kart / not |
|---|---|---|---|---|
| 1 | `clubRoutes` /api/clubs/* (6) + `/users/:userId/clubs` (1) | clubRoutes.ts:20-37, userRoutes.ts:114 | ❓ SOR | **KARAR-9** (mevcut — kulüp modülü) |
| 2 | `jobListingRoutes` /api/job-listings/* (4) | jobListingRoutes.ts:15-24 | ❓ SOR | **KARAR-9** (mevcut — iş ilanları) |
| 3 | `superAdminRoutes` /api/super-admin/* (4) | superAdminRoutes.ts:14-19 | 🔒 KARANTİNA ADAYI | **KARAR-11** (mükerrer — platform uçları aynı işi yapıyor, istemci `/api/platform/*` kullanıyor) |
| 4 | `systemLogRoutes` GET /api/system-logs (1) | systemLogRoutes.ts:12 | 🔒 KARANTİNA ADAYI | **KARAR-11** (mükerrer — istemci `/api/platform/logs` kullanıyor) |
| 5 | `tenantRoutes` çıplak CRUD (4) | tenantRoutes.ts:16-19 | 🔒 KARANTİNA ADAYI | **KARAR-11** (mükerrer — istemci hep alt-path `/settings`,`/onboarding`,`/self-serve/*` çağırıyor) |
| 6 | `/api/users/me/social` PATCH (1) | onboardingRoutes.ts:41 | 🔒 KARANTİNA ADAYI | **KARAR-11** (mükerrer — `/api/users/me/profile` profil düzenlemeyi yapıyor; görev örneği, teyit edildi) |
| 7 | `/api/users/:id/self-profile` PATCH (1) | userRoutes.ts:118 | 🔒 KARANTİNA ADAYI | **KARAR-11** (mükerrer — `/api/users/me/profile`) |
| 8 | `feedbackLogRoutes` /api/feedback-logs/* (3) | feedbackLogRoutes.ts:17-30 | ❓ SOR | **KARAR-12 (YENİ)** — görüşme feedback'inden AYRI ML/analiz döngüsü (`rewardPenalty.ts` bağlı; md.42 ❓) |
| 9 | `admin/cron/run-tuning` + `run-purge` (2) | adminRoutes.ts:80-81 | ⚙️ OPERASYON | **KARAR-13 (YENİ)** |
| 10 | `meetings/reminders/send` (1) | meetingRoutes.ts:132 | ⚙️ OPERASYON | **KARAR-13 (YENİ)** |
| 11 | `meetings/orientation-lock/:userId` DELETE (1) | meetingRoutes.ts:137 | ⚙️ OPERASYON | **KARAR-13 (YENİ)** — self yolu `/api/users/me/orientation-completed` var; ADMIN kaldırma bağlı değil |
| 12 | ADMIN KVKK: `/users/:id/anonymize` · `/hard-delete` · `/:id/export` (3) | userRoutes.ts:177-187 | ⚙️ OPERASYON | **KARAR-14 (YENİ)** — self-servis `/api/me/*` var; ADMIN muadili bağlı değil (KVKK/hukuki) |
| 13 | `admin/reports` GET+PATCH (2) | adminRoutes.ts:84-85 | 🔧 BAĞLA | **Kuyruk K-11** (tenant-admin şikayet paneli — zaten BAĞLA işi) |
| 14 | `admin/visibility-optin/:optInId/confirm` (1) | adminRoutes.ts:69 | 🔧 BAĞLA | **KARAR-16 (YENİ)** — mentör görünürlük onayı, FE butonu yok |
| 15 | `admin/users/:id/rematch` (1) | adminRoutes.ts:56 | 🔧 BAĞLA | **KARAR-16 (YENİ)** — yeniden eşleştirme; push bildirimi stub |
| 16 | `/api/tags/suggest` POST (1) | server.ts:133 | 🔧 BAĞLA | Not (düşük değer) — kullanıcı etiket-önerisi üreticisi bağlanmamış; **sonraki tura** (kart açılmadı) |
| 17 | `/api/tenants/:slug/preview` GET (1) | selfServeRoutes.ts:29 | 🔧 BAĞLA | **KARAR-17 (YENİ)** — self-serve "çift-aha" önizleme demo; FE eksik |
| 18 | `/api/users/:id/temperament-test` POST (1) | userRoutes.ts:62 | 🔒 KARANTİNA ADAYI | **KARAR-11** (muhtemel legacy — DISC/adaptif test canlı; geçmişte "korunuyor" damgalı, silme değil karar) |
| 19 | `/api/requests` GET + `/:id` GET (2) | userRoutes.ts:108-109 | 🔧 BAĞLA | Not — eşleşme isteği listeleme; POST kullanılıyor, GET listeleme bağlı değil; **sonraki tura** (kart açılmadı) |

**Toplam: 35 uç** (7+4+4+1+4+1+1+3+2+1+1+3+2+1+1+1+1+1 = 35). GEREKÇE BULUNAMADI çıkan uç: **0** (hepsinin kökeni ve/veya docs niyeti bulundu).

---

## 3. ENVANTER — (b) Ölü şema alanları (4)

| model.alan | schema:satır | durum | Kova | kart/not |
|---|---|---|---|---|
| `SjtQuestion.triggersOn` | :939 | YAZILIYOR (seed), OKUNMUYOR | ❓ SOR | **KARAR-10** (OCEAN/SJT motoru — yarım) |
| `SjtOption.signalsArchetype` | :956 | YAZILIYOR (seed), OKUNMUYOR | ❓ SOR | **KARAR-10** (arketip sinyali skorlamaya bağlanmamış) |
| `Tenant.verifiedBy` | :224 | 0 oku + 0 yaz (kardeş `verificationStatus`/`verifiedAt` yazılıyor) | 🔧 BAĞLA (teknik) | **GEREKÇE BULUNAMADI** (alanın kendi niyeti docs'ta yok) → küçük teknik audit-izi eksiği; "kim doğruladı" kaydı tutulmuyor. Kart AÇILMADI (ürün kararı değil, teknik BAĞLA); sonraki turda doğrulama akışına yazılabilir. |
| `CertificationOption.internalNote` | :1158 | 0 oku + 0 yaz (repoda) | — (WIP) | **ÖLÜ DEĞİL** — madde 163 ile 2026-09-09'da CANLI'ya indi; sertifika seed'i (madde 30) bağlayacak. Envanterden düşürüldü. |

---

## 4. ENVANTER — (c) Mount edilmeyen frontend bileşenleri (3)

| bileşen | dosya:satır | durum | Kova | kart/not |
|---|---|---|---|---|
| `MeetingScheduler` | organisms/MeetingScheduler.tsx:47 | Superseded — mentor tarafı `mentor/availability/page.tsx` inline, menti tarafı `book-meeting/page.tsx` inline | 🔒 KARANTİNA ADAYI | **KARAR-11** (mükerrer bileşen) |
| `ContextualFeedbackHost` (+ `MeetingContext`/`MeetingProvider`) | organisms/ContextualFeedbackHost.tsx:22, context/MeetingContext.tsx:34 | Superseded — feedback akışı `/meeting-checkin` sayfasıyla; Provider hiçbir layout'ta mount değil (useMeeting çağrılsa throw) | 🔒 KARANTİNA ADAYI | **KARAR-11** (mükerrer + bağlı ölü context) |
| `TenantSwitcher` | organisms/TenantSwitcher.tsx:36 | Mount edilmemiş — çok-kurumlu üyelik değiştirici; DashboardNav'da kurum-değiştirme UI'ı yok; mükerrer YOK (gerçek eksik özellik) | ❓ SOR | **KARAR-15 (YENİ)** — çok-kurumlu değiştirici özelliği yapılsın mı |

Üçünün de kökeni `918727b` (2026-06-21 ilk büyük scaffold); UI-kit olarak yazılıp sayfalar inline/alternatif çözümlerle inşa edilince bağlanmamış.

---

## 5. TRİYAJ — DÖRT KOVA (sayılar)

- **🔧 BAĞLA (gerçek boşluk, kullanıcı değeri):** `admin/reports` (kuyruk K-11) · `visibility-optin confirm` · `rematch` · `tenants/:slug/preview` · `tags/suggest` (düşük) · `/requests` GET (düşük) · `Tenant.verifiedBy` (teknik audit) — **~7 kalem**
- **🔒 KARANTİNA ADAYI (ikame VAR, kapsam beyanıyla kanıtlı — SİLİNMEZ):** superAdmin(4) · systemLog(1) · tenants CRUD(4) · me/social(1) · self-profile(1) · temperament-test(1) · MeetingScheduler · ContextualFeedbackHost+MeetingContext — **~13 uç/bileşen** → hepsi **KARAR-11** kapsamı
- **⚙️ OPERASYON (cron/admin tetik, bugün UI yok):** cron/run-tuning · cron/run-purge · reminders/send · orientation-lock unlock · ADMIN KVKK (anonymize/hard-delete/export) — **~7 kalem** → KARAR-13 + KARAR-14
- **❓ SOR (ürün kararı):** club+jobListing → KARAR-9 · SJT/OCEAN → KARAR-10 · feedbackLog → KARAR-12 · TenantSwitcher → KARAR-15 — **karara bağlı**

**GEREKÇE BULUNAMADI:** yalnız **1 kalem** — `Tenant.verifiedBy` (alanın kendi niyeti; kardeş alanlar belgeli). Kural gereği karantina adayı OLAMAZ → teknik BAĞLA/not olarak bırakıldı, kart açılmadı.

---

## 6. AÇILAN KARAR KARTLARI (01-KARARLAR.md sonuna)

| Kart | Başlık | Kova |
|---|---|---|
| KARAR-12 | Görüşme geri bildirim log sistemi (FeedbackLog) — panel mi, iç araç mı, dursun mu | ❓ SOR |
| KARAR-13 | Yönetici için manuel operasyon tetikleri (tuning/purge/hatırlatıcı/kilit) | ⚙️ OPERASYON |
| KARAR-14 | Yönetici panelinden KVKK işlemleri (dışa aktar/sil/anonimleştir) | ⚙️ OPERASYON (hukuki) |
| KARAR-15 | Çok-kurumlu kullanıcı için kurum değiştirici (TenantSwitcher) | ❓ SOR |
| KARAR-16 | Yönetici eşleştirme kontrolleri (görünürlük onayı + yeniden eşleştirme) | 🔧 BAĞLA |
| KARAR-17 | Kurum self-servis önizleme / çift-aha demo (:slug/preview) | 🔧 BAĞLA |

**Mevcut kartlara referansla kapsanan (YENİ kart açılmadı):** KARAR-9 (kulüp+iş ilanları) · KARAR-10 (OCEAN/SJT + triggersOn/signalsArchetype) · KARAR-11 (tüm mükerrer uçlar + 3 bileşen + temperament-test) · Kuyruk K-11 (admin/reports paneli).

**Kart açılmayan, sonraki tura bırakılan (düşük değer):** `tags/suggest` (etiket-önerisi üreticisi) · `/requests` GET listeleme · `Tenant.verifiedBy` audit yazımı (teknik).
