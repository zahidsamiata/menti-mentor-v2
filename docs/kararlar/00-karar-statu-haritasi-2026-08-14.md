# Karar Statü Haritası

**📸 DONDURULMUŞ (2026-08-14)** — o günün fotoğrafı; güncellenmez. Bu belge **ham statü haritasıdır** —
sonraki adım (ayrı tur) bunu tek-bakışta **DURUM PANOSU**'na (`00-DURUM-PANOSU`) dönüştürecek, sonra
yol haritası v1/v2 önceliklendirmesi yapılacak. **Bu belge önceliklendirme YAPMAZ, pano DEĞİLDİR.**

> **Amaç:** `docs/kararlar/` + `docs/raporlar/` + `10-yol-haritasi.md` (A–F) içindeki her kararın **ŞU AN
> gerçekte** hangi durumda olduğunu — gri bölgeler dahil — tek yerden, dosya:satır kanıtıyla göstermek.
> Asıl değer gri bölgede: 🟨 "arka var / ön yok" = az işle kazanç.
>
> **Yöntem:** Mevcut denetimlerin (belge-aksiyon-denetimi, unutulmus-niyet, belge-denetimi, stk-admin-bulgu,
> tasarim-kararlari-admin) üstüne bina edildi; gri/şüpheli maddeler **güncel kodla** (2026-08-14, #62 sonrası) teyit edildi.
> "sanırım" yok — kanıt yoksa ❓ BELİRSİZ. Karar noktalarında durulmadı, ❓ + "PO kararı gerekli" notu düşüldü.

---

## KAPSAM — taranan kaynaklar
- **KAYNAK 1 — belgeler:** `docs/kararlar/` 01–08 (vizyon, mimari, psikometri, güvenlik, özellikler, tasarım,
  çalışma, açık sorular) + `tasarim-kararlari-admin-2026-08-11` (12 KARAR) + `stk-admin-bulgu-envanteri` (13 bulgu) +
  `docs/raporlar/` 16 belge (strateji/persona/envanter/teşhis).
- **KAYNAK 2 — yol haritası:** `10-yol-haritasi.md` A (13 admin bulgusu) · B (KVKK K1–K5) · C (algoritma+hardening) ·
  D (altyapı+temizlik) · E (PO manuel) · F (denetimden kurtarılan F1–F7).
- **Mevcut denetim tabanı (sıfırdan üretilmedi, statü güncellendi):** `belge-aksiyon-denetimi-2026-08-11.md` (34 belge),
  `unutulmus-niyet-envanteri-2026-08-10.md`, `belge-denetimi-2026-08-10.md`.
- **Toplam karar (yaklaşık):** ~50 (kesin dağılım ÖZET'te). Kümeler halinde işlendi.

## BOYUT & RENK LEJANTI
Her karar **üç boyutta** işaretlenir (plan ile kod AYRI sorular):
- **BOYUT A — PLAN:** yol haritasında (10-yol) madde var mı? `PLAN:VAR` / `PLAN:YOK`.
- **BOYUT B — KOD:**
  - 🟩 **TAM BİTTİ** — backend + ön yüz + canlıda çalışıyor.
  - 🟨 **ARKA VAR / ÖN YOK** — backend yazılmış, kullanıcı göremiyor (buton/ekran eksik). ★ **az işle kazanç.**
  - 🟧 **YARIM KALDI** — başlanmış, ne backend ne ön yüz tam.
  - 🟥 **HİÇ BAŞLANMADI** — karar var, kod yok.
  - 🔵 **SIRADA BEKLİYOR** — planlı ama BİLİNÇLİ ertelenmiş/ileri-faz/Katman-3 (boşluk değil, kasıtlı).
  - ⬜ **KOD-DIŞI** — saf strateji/tasarım/politika, kod gerektirmez.
- **BOYUT C — ÇELİŞKİ:** ❌ geçersiz/çeliştli (kazanan kanıtlı) · ❓ belirsiz (PO kesinleştirmeli) · (yoksa boş).

---

<!-- KÜME 1 -->
## KÜME 1 — Vizyon · Mimari · Psikometri (kararlar 01–03)
| Karar | Plan | Kod | Çelişki | Kanıt / Not |
|---|---|---|---|---|
| DISC/mizaç temelli eşleştirme | — | 🟩 | | `scoring.config.ts` (COMPATIBILITY_MATRIX) + `scoring.service.ts` |
| Multi-tenant B2B2C | — | 🟩 | | `middleware/tenant.ts` requireTenant + `schema.prisma` Tenant |
| Anti-toksik hard-gate + opt-in gizlilik | — | 🟩 | | `scoring.config.ts` BLOCKED_PAIRS + `isHardBlocked` |
| DISC→OCEAN adapter · 8 arketip · SJT scorer | — | 🟩 | | `disc-to-ocean.adapter.ts` · `deriveArchetype` · `sjt-scorer.ts` |
| Formül (Sektör×0.60 + Mizaç×0.40)×qualityMultiplier | — | 🟩 | | `scoring.config.ts` WEIGHTS + `scoring.service.ts` |
| Sertifika (5 boyut, 65 baraj, 24s cooldown) · kademeli fallback | — | 🟩 | | `certification.service.ts` CERT_CONFIG · `matching.ts` fallbackLevel 0-3 |
| **Sektör skoru 5-bileşen servisi (eski İŞ 7)** | VAR (C) | 🟨 | | `sector-scorer.service.ts` YAZILI ama canlı yola **bağlı değil** (uyuyor); canlı basit `computeSectorScore` (etiket×0.6). ★ arka var/ön(canlı) yok — **canlı-riskli → staging şart** |
| Freemium (şimdilik ücretsiz, ileride premium) | — | ⬜ | ❓ | `schema.prisma` `plan`/`limits` alanları var ama boş; "nasıl kullanılacak" tanımsız → PO |
| Modül sırası (Mentörlük→Hafıza→Sponsorluk…) | — | ⬜ | ❓ | ileri faz; net roadmap satırı yok → PO |
| certified/qualityMultiplier → TenantMembership | — | 🟩 | ❓ | `schema.prisma` alanlar TenantMembership'te; **tüm okumaların oradan olduğu TEYİT GEREK (K7)** |
| Erasmus iptal / UniClub→Sivilkapasite / fiyat çözümü | — | ⬜ | | çelişki-çözüm kaydı (INDEX); kodda Erasmus/UniClub yok |

<!-- KÜME 2 -->
## KÜME 2 — Güvenlik & KVKK (04 + yol haritası B / K1–K6)
| Karar | Plan | Kod | Çelişki | Kanıt / Not |
|---|---|---|---|---|
| 5 katman tenant izolasyonu + RLS | — | 🟩 | | `middleware/tenant.ts` (header+JWT+çelişki 403+üyelik+RLS) |
| 2 IDOR (mentors/candidates, requests/:id) | — | 🟩 | ✅ | **çözüldü — açık YOK** (kod keşfi 2026-08-14, commit `161ae00`; `matchingController.ts:45-52`, `requestController.ts:116-121`). Eski "BOZUK ↔ korumalı" çelişkisi kapandı |
| DISC ham profil asla gösterilmez (yüzde) | — | 🟩 | | `matchingController.ts` buildPublicItem maskeleme; havuzda yüzde yok |
| Audit log (KVKK Md.12) | — | 🟩 | | `platformAudit.ts` (SystemLog'a AUDIT) |
| **K1 — Yasal metinler** (/kvkk, /gizlilik, /terms) | VAR (B) | 🟩 | ❓ | sayfalar YAZILI, taslak değil (`frontend/src/app/kvkk\|gizlilik\|terms/page.tsx`). **Hukukçu onayı** hâlâ PO/dış iş |
| **K2 — OAuth `kvkkConsentAt`** | VAR (B) | 🟧 | | **kod eksiği:** `oauthService.ts` OAuth kullanıcıda `kvkkConsentAt` set ETMİYOR (NULL); local register (`authController.ts:173`) + self-serve (`selfServeController.ts:284`) ediyor → ★ küçük, yüksek-değer fix |
| **K3 — Eski kayıt consent politikası** | VAR (B) | ⬜ | ❓ | migration sütunları var; eski-kayıt geçiş politikası **karar** (yeniden-rıza/bulk/erteleme) → PO |
| **K4 — Yaş 18+ doğrulama** | VAR (B) | 🟥 | | kayıt formunda yaş input YOK, `schema.prisma`'da birthDate YOK; sadece terms metninde "18+" yazıyor → karar + kod |
| **K5 — Veri sorumlusu + sunucu konumu beyanı** | VAR (B) | 🟨 | | veri sorumlusu beyanı VAR (`kvkk/page.tsx`); **sunucu/hosting konumu beyanı YOK** → içerik eklenecek |
| **K6 — Admin server-side guard** | VAR (C) | 🟥 | | admin sayfaları **client-side** guard (`useAuth`), `frontend/src/middleware.ts` YOK. API zaten backend-korumalı → veri sızıntısı değil, **savunma-derinliği** |
| Privacy center UI · DISC için ayrı rıza | VAR (B/C) | 🟥 | | envanter #54 (D); kodda yok |
| RLS lint kuralı (`findUnique` sızıntı tuzağı) | VAR (C) | 🟥 | | güvenlik-iyileştirme; henüz lint yok (`04:18`) |
| Sunucu/altyapı güvenliği (firewall/SSH/SSL/yedek) | VAR (E-benzeri) | ⬜ | | HİÇ ele alınmadı; ayrı tur (`04:49-51`) — kod değil, altyapı |

<!-- KÜME 3 -->
## KÜME 3 — Özellikler & Paneller (05 + raporlar: panel/platform/strateji)
> **NOT:** Eski denetim (2026-08-11) bu kümede çok "UNUTULDU / FE yok" işaretlemişti. **Güncel kod (2026-08-14) doğrulaması: çoğu artık 🟩 TAM.** Sadece 1 gerçek 🟨 kaldı.
| Karar | Plan | Kod | Çelişki | Kanıt / Not |
|---|---|---|---|---|
| Chat v1 (menti↔mentör mesajlaşma) | — | 🟩 | | #33/#47/#48 MERGED; `Conversation`+`Message` canlı |
| Mentör paneli (metrik kartları + toplantılar) | — | 🟩 | | `dashboard-metrics` (IDOR korumalı) #36/#52 |
| Platform katmanı (approve/reject/freeze/activate + requirePlatformAdmin) | — | 🟩 | | `platformAuth.ts` + `platformController.ts` |
| **Platform drill-down UI** (kurum detayı) | VAR (F2) | 🟩 | | eski "backend var/FE yok" idi → **artık TAM:** `platformTenantController.ts:75-276` + `frontend/src/lib/api/platform.ts:300-328` + sayfalar |
| **KPI drill-down (sayıdan kişiye)** | VAR (F7) | 🟩 | | eski "UNUTULDU" idi → **TAM:** `retentionMetrics.service.ts` (DRILLDOWN_CAP=100) + `ProgramHealthSection.tsx` |
| Sertifika sonuç panosu | — | 🟩 | | `adminController.ts:345-389` + `admin/sertifika-sonuclari/page.tsx` (certScore/status render) |
| lastLoginAt KPI / retention | VAR (C) | 🟩 | | `retentionMetrics.service.ts` + `activityService.ts:22` + FE health-metrics |
| Fotoğraf upload (client-side) | VAR (F1) | 🟩 | ❓ | eski F1 "yapılacak iş" idi → **kod TAM:** `avatarController.ts:23-57` (POST /users/me/avatar, multer) + `profile/page.tsx:101-207` upload UI. **F1 roadmap maddesi bayat olabilir → PO teyit** ("foto zorunlu kart" bağı ayrı) |
| Yönetici atama/çıkarma UI (+son-admin guard, max 3) | VAR (A md.7) | 🟩 | | #62; `admin/managers/page.tsx:66-124` + `adminController.ts:689-760` |
| Mentör/menti havuzu (liste+filtre+sayfalama) · branding (logo https) | — | 🟩 | | `userController.ts` pagination · `admin/branding/page.tsx` |
| **SJT/scoring endpoint'leri** (`/scoring/compute-profile`, `/rank-mentors`) | — | 🟨 | ❓ | ★ **arka var/ön yok:** `sjtScoringController.ts:48-130` + route var; **frontend çağrısı grep boş** → **bağla mı sil mi PO kararı** (canlı eşleşme farklı yol kullanıyor) |
| Eşleşme paneli — Match DB'ye persist ediliyor mu | — | ❓ | ❓ | `Match` modeli var; runtime skorlama var; **canlı persist DB sorgusu yapılmadı** (DB'ye bağlanılmadı) → teyit |
| Ön-tanımlı davet OTOMATİK onay (Yol B) | — | ❓ | ❓ | `InvitationTemplate` var; otomatik-onay davranışı kodda net konumlanmadı → keşif (bkz. KARAR 6, KÜME 4) |

<!-- KÜME 4 -->
## KÜME 4 — Tasarım & UX (06 + tasarim-kararlari-admin 12 KARAR + landing)
> **NOT:** tasarım-kararları belgede kayıtlı ama **çoğu koda geçmemiş** → en büyük 🟥/🟨 kümesi burada. Yol haritasına iş kalemi olarak bağlı değiller (PO önceliklendirmesi gerekli).
| Karar (tasarim-kararlari-admin) | Plan | Kod | Çelişki | Kanıt / Not |
|---|---|---|---|---|
| **KARAR 1 — Sol menü 4-grup gruplama** | ~A md.2 | 🟥 | | `frontend/(admin)/layout.tsx:19-40` hâlâ "3 öğe + Gelişmiş(11)"; 4-grup yok |
| **KARAR 2 — Havuz KART görünümü (role-göre)** | ~A md.5 | 🟨 | | backend `buildPublicItem` (`matchingController.ts`) `compatibilityReason` üretiyor; **frontend havuz hâlâ TABLO** (`admin/mentor-havuzu\|menti-havuzu/page.tsx`) → ★ arka kısmen var/ön yok |
| **KARAR 3 — Durum rozeti (Onaylı/Bekliyor/Pasif, yönetici-only)** | — | 🟥 | | havuz tablosunda sadece onay-durumu var; tasarımdaki iç-yönetim rozeti yok |
| **KARAR 4 — Sertifika rozeti ("Sertifikalı ✓", herkes)** | — | 🟥 | | grep boş; mentör kartında sertifika rozeti render edilmiyor |
| **KARAR 5 — DISC mahremiyet asimetri** (menti mentörün DISC'ini görmez) | — | 🟨 | ❓ | yüzde hiç gösterilmiyor ✓; **ama menti→mentör DISC gizleme backend'de kanıtlanamadı** → **güvenlik/PII TEYİT GEREK** (DTO role-ayrışması; frontend gizleme yetmez) |
| **KARAR 7 — "Neden uyumlu" Katman 1** | — | 🟨 | | backend `compatibilityReason` var; **frontend `RankedMenti` tipinde alan yok + kart yok** → görünmüyor (KARAR 2 ile birlikte) |
| **KARAR 11 — DISC baskın+ikincil HARF ("DI"), yüzde yok** | ~A md.4 | 🟥 | | havuzda tek harf; ikincil harf türetme/gösterim yok. (B4 "güvenli harf yolu" ama yapılmadı) |
| **KARAR 12 — Sektör/etiket başlangıç havuzu** | ~A md.12 | 🟨 | ❓ | `seed.ts` SECTOR_POOL (50+ etiket) VAR + öneri kuyruğu (PendingTag) VAR; **admin-yönetilir "sistem etiketi" tablosu YOK** → seed mi tablo mu **keşif/PO** (B12 açığı) |
| **KARAR 6 — Otomatik onay (önden davet→onaylı)** | ~F6 | ❓ | ❓ | `InvitationTemplate` var; **davet→otomatik-onay tetiği kodda yok** → keşif + PO |
| **KARAR 8 — "Neden uyumlu" Katman 2** | — | 🔵 | | bilinçli erteleme (ürün olgunlaşınca) |
| **KARAR 9 — Mentör yaklaşım kılavuzu Katman 3 (vizyon)** | — | 🔵 | | KVKK rıza + mahremiyet + etik karar ÖNCE; "vizyon kutusu", canlı-öncesi erken |
| **KARAR 10 — Sektör kolonu (veri girişi boşluğu)** | ~A md.3 | 🔵 | | canlı-SONRASINA ertelendi; blocker değil (VERİ girişi sorunu, gösterim değil) |
| **F4 — Landing slogan** (tam metin hazır) | VAR (F4) | 🟥 | ❓ | karar+tam metin `10-yol F4`/`06:21`; `frontend/src/app/page.tsx` hâlâ eski slogan → **PO tam metni onaylayınca uygulanır** |
| Dark/light tema altyapısı | — | 🟩 | | `ThemeProvider.tsx` + `ThemeToggle.tsx` |
| ThemeToggle admin/platform nav'a (D21) | VAR (D) | 🟨 | | menti/mentör nav'da VAR; admin/platform'da yok |
| Yumuşak lacivert tema + Landing UX paketi (tooltip/WCAG/kart) | VAR (D) | 🔵 | ❓ | 10-yol D; "lacivert" adı roadmap'te net değil → paket içinde mi PO netleştirsin (canlı-sonrası) |

<!-- KÜME 5 -->
## KÜME 5 — STK Admin 13 Bulgusu (yol haritası A)
> Kaynak: `stk-admin-bulgu-envanteri-2026-08-11`. #62'de md.1/7/9 bağlandı; md.4 ertelendi; kalanlar açık. Güncel kod doğrulandı.
| Bulgu | Plan | Kod | Çelişki | Kanıt / Not |
|---|---|---|---|---|
| **md.1 — Şifre göster/gizle** | VAR (A) | 🟩 | | #62; `PasswordField` login+register+reset (`_RegisterContent.tsx:89-126`) |
| **md.7 — Yönetici atama UI** | VAR (A) | 🟩 | | #62; `admin/managers/page.tsx:66-124` |
| **md.9 — CORE/DEEPENING Türkçe** | VAR (A) | 🟩 | | #62; `admin/questions/page.tsx:18` TYPE_LABELS (Temel/Derinleştirme) |
| **md.8 — Soru puanlama/cevap-tipi görünürlüğü** | VAR (A) | 🟩 | | `admin/questions/page.tsx` type/dimension + yeni-soru select'leri render ediliyor |
| **md.13 — Sertifika Konuları (topic1-5)** | VAR (A) | 🟩 | | `seed-certification.ts:37-80` gerçek senaryolar (placeholder değil) |
| **md.6 — Algoritma Kalibrasyon Merkezi** | VAR (A/C) | 🟧 | | sayfa VAR (`admin/algorithm-tuner/page.tsx`) ama **sadece rapor-frekansı** gösteriyor; **ağırlık (0.60/0.40) ayarı/gösterimi YOK** → yarım |
| **md.10 — Yeni soru cevap tipi (şıklı/açık uçlu) seçimi** | VAR (A) | 🟨 | ❓ | soru formunda CORE/DEEPENING + DISC select var; **cevap-tipi (şıklı/açık) seçimi ayrı** → belirsiz, teyit |
| **md.11 — Gereksiz tek-seçenekli dropdown** | VAR (A) | ❓ | | minor UI temizliği; güncel formda teyit gerek |
| **md.2 — Sol menü gruplama** | VAR (A) | 🟥 | | = KARAR 1 (KÜME 4); layout 3+Gelişmiş |
| **md.5 — Havuz layout** | VAR (A) | 🟨 | | = KARAR 2 (KÜME 4); tablo→kart yapılmadı |
| **md.3 — Havuz "Sektörler" kolonu çoklu gösterim** | VAR (A) | 🔵 | | = KARAR 10; canlı-sonrası (veri girişi boşluğu) |
| **md.4 — DISC ikincil/karma gösterim** | VAR (A) | 🟥 | | ertelendi (#62 dışı); KARAR 11 harf yolu var ama yapılmadı |
| **md.12 — Etiket Yönetimi sistem etiketleri nerede** | VAR (A) | 🟨 | ❓ | = KARAR 12; seed'de var, admin tablo yok |

<!-- KÜME 6 -->
## KÜME 6 — Algoritma · Altyapı · Denetimden Kurtarılanlar (yol haritası C/D/F)
| Karar | Plan | Kod | Çelişki | Kanıt / Not |
|---|---|---|---|---|
| Sektör skoru servisi bağla (eski İŞ 7) | VAR (C) | 🟨 | | (KÜME 1) `sector-scorer.service.ts` yazılı, canlı yola bağlı değil → **staging şart** |
| Eşleştirmeyi birleştir (eski İŞ 8) | VAR (C) | 🔵 | | İŞ 7 sonrası, staging'de |
| super-admin router + `setVisibilityOptIn` (Taraf-1) | VAR (C) | ❓ | ❓ | "niyetli ama bağlanmamış"; ikisi de kasıtlı korundu (testli) → **sil/bağla/ertele PO kararı** (`userRoutes.ts:76-81`) |
| `VisibilityOptIn.requestMessage` şema kolonu DROP | VAR (C) | 🔵 | | ertelenmiş teknik borç; DB'ye dokunur → PO-onaylı ayrı migration turu |
| Retention davranışsal — otomatik nudge (cron) | VAR (C) | 🟥 | | manuel `nudgeUser` VAR; otomatik zamanlı nudge yok |
| **Staging ortamı (eski İŞ 5)** | VAR (D) | 🟥 | | `staging.sivilkapasite.org` + ayrı Neon branch + Dokploy 2. app yok — canlı-riskli işlerin ön koşulu |
| Ortam temizliği — merged worktree/branch sil (eski İŞ 1) | VAR (D) | 🟥 | | `cati-lj/cati-bump/cati-compose` hâlâ var; PO manuel + teyit (`git branch --merged`) |
| Onay paneli tamamlama — bildirim maili (eski İŞ 3) | VAR (D) | 🟨 | ❓ | mail altyapısı hazır; kurum onay/ret maili + `destek@` + prod `PLATFORM_ADMIN_EMAIL` bağlanmadı |
| Öğrenme yolculuğu kalan uçları (eski İŞ 4) | VAR (D) | ❓ | | kod MERGED; DISC ton + STK düzenleme + içerik onayı + uçtan uca test → teyit |
| **F1 — Fotoğraf yükleme** | VAR (F1) | 🟩 | ❓ | **kod TAM** (`avatarController.ts` + `profile/page.tsx`) → **F1 roadmap maddesi bayat olabilir; PO teyit** ("foto zorunlu kart" bağı ayrı iş) |
| **F2 — Platform drill-down UI** | VAR (F2) | 🟩 | ❓ | **TAM** (KÜME 3) → F2 bayat |
| **F3 — Tenant hard-delete (KVKK Md.7)** | VAR (F3) | 🟥 | | sadece freeze (soft); hard-delete endpoint yok. **GERİ-ALINAMAZ + DB → keşif + PO ÖNCE** |
| **F4 — Landing slogan** | VAR (F4) | 🟥 | ❓ | (KÜME 4) tam metin hazır; kod eski slogan → PO onayı |
| **F5 — Eşleşme hesaplama tetikleyicisi** | VAR (F5) | ❓ | ❓ | event-driven mi sayfa-açılınca mı karara bağlanmamış (`08:20`) → keşif + PO |
| **F6 — Hayalet mod + toplu CSV davet** | VAR (F6) | 🟥 | | şemada YOK → yeni model/migration → **ayrı büyük tur, PO onaylı** |
| **F7 — KPI drill-down** | VAR (F7) | 🟩 | ❓ | **TAM** (KÜME 3) → F7 bayat |

<!-- KÜME 7 -->
## KÜME 7 — Unutulmuş Niyetler & PO Manuel (yol haritası E + envanter C)
| Karar | Plan | Kod | Çelişki | Kanıt / Not |
|---|---|---|---|---|
| Chat uçtan uca canlı test | VAR (E) | ⬜ | | PO manuel — kod değil |
| Foto Dokploy volume testi | VAR (E) | ⬜ | | PO manuel; **merge/autodeploy'dan ÖNCE ŞART** (yoksa foto sessizce silinir) |
| Mentör metriklerini canlıda gözle görme | VAR (E) | ⬜ | | PO manuel |
| Repoları PRIVATE yapma | VAR (E) | ⬜ | | PO manuel (GitHub web + Dokploy erişim teyidi) |
| Bekleme salonu bildirim izni (`Notification.requestPermission`) | VAR (C-env) | 🟥 | | bekleme salonu VAR; tarayıcı bildirim izni istemi kodda yok (grep boş) |
| Mentör görünürlük opt-in ekranı ("7a") | env | 🟨 | ❓ | backend `setVisibilityOptIn`+tablo var; FE opt-in ekranı belirsiz → teyit |
| STK "iki-aha modeli" (önizleme + gerçek aha) | env | ❓ | | onboarding wizard var; "canlı veri ile aha" tam değil → teyit |
| Push bildirim (gerçek Expo/FCM) | env | 🟧 | | `notificationService.ts:49` TODO; sabit `sent:true` stub (biliniyor; in-app/e-posta idare ediyor) |
| `.env.backup-*` temizliği | env | ⬜ | ❓ | gitignore'lu; env geçişi bitince PO siler |
| İlk-aha / reddi yumuşat / emeği görünür (persona fikirleri) | — | ❓ | | veri/altyapı var; "hediye gibi sunum" UI render teyit (persona raporları fikir ağırlıklı) |

---

## ÖZET

**Toplam taranan karar/madde:** ~72 (7 küme). Aşağıdaki dağılım BOYUT B (kod) birincil statüsüne göre yaklaşıktır
(bazı satır çift-kategorili; kesin sayım pano turunda netleşecek).

### Kategori dağılımı (yaklaşık)
| Kod statüsü | ~Sayı | Kısa |
|---|---|---|
| 🟩 TAM BİTTİ | ~27 | çekirdek eşleştirme/güvenlik/panel/chat + #62 admin UI + platform&KPI drill-down + foto upload |
| 🟨 ARKA VAR / ÖN YOK ★ | ~13 | **az işle kazanç — aşağıda liste** |
| 🟧 YARIM KALDI | ~3 | md.6 kalibrasyon · K2 OAuth consent · push stub |
| 🟥 HİÇ BAŞLANMADI | ~15 | tasarım-kararları (menü/rozet/DISC-harf) · K4 yaş · K6 guard · F3/F6 · staging |
| 🔵 SIRADA (bilinçli) | ~7 | Katman 2/3 · sektör kolonu · eşleştirme birleştirme · VisibilityOptIn DROP |
| ⬜ KOD-DIŞI | ~9 | freemium/modül politikası · PO manuel işler · altyapı güvenliği |
| ❓ BELİRSİZ (birincil) | ~4 | Match persist · otomatik onay · iki-aha · F5 tetikleyici |
| ❌ ÇELİŞKİ | 0 | (tek çelişki — 2 IDOR — ✅ çözüldü: korumalı) |

### ★ 🟨 "ARKA VAR / ÖN YOK" — az işle kazanç (PO'nun en çok istediği)
1. **SJT/scoring endpoint'leri** (`/scoring/compute-profile`, `/rank-mentors`) — backend hazır, FE çağrısı yok → **bağla mı sil mi PO**.
2. **Havuz KART görünümü + "neden uyumlu" (KARAR 2/7)** — backend `compatibilityReason` üretiyor, FE hâlâ tablo + tip eksik.
3. **md.6 Algoritma Kalibrasyon (🟧)** — sayfa var, ağırlık (0.60/0.40) UI'ı yok.
4. **K2 OAuth `kvkkConsentAt` (🟧)** — küçük backend fix (local/self-serve set ediyor, OAuth etmiyor).
5. **Sektör/etiket başlangıç havuzu (KARAR 12)** — seed'de var, admin-yönetilir tablo yok.
6. **K5 sunucu konumu beyanı** — veri sorumlusu var, hosting konumu içerik eklenecek.
7. **Onay paneli bildirim maili** — mail altyapısı hazır, bağlanmadı (başvuran sessiz kalıyor).
8. **Mentör görünürlük opt-in ekranı (7a)** — backend var, FE ekranı belirsiz.
9. **ThemeToggle admin/platform nav** — menti/mentör'de var, admin/platform'da yok.
10. **Sektör skoru servisi** — 5-bileşen yazılı, canlı yola bağlı değil (⚠️ canlı-riskli → staging şart).

### ⚠️ Roadmap bayat olabilir (kod bitmiş ama F maddesi "yapılacak" diyor) — PO teyit
- **F1 (foto upload), F2 (platform drill-down), F7 (KPI drill-down) → kod TAM.** Yol haritası F bölümü bu 3'ü hâlâ "yapılacak iş" sayıyor → **önceliklendirme turunda düzeltilmeli.**

### En büyük 🟥 kümeleri (hiç başlanmadı)
- **Tasarım-kararları (KÜME 4):** sol menü 4-grup (KARAR 1/md.2) · durum rozeti (KARAR 3) · sertifika rozeti (KARAR 4) · DISC ikincil harf (KARAR 11/md.4). Belgede kayıtlı, koda geçmemiş, yol haritasına bağlanmamış.
- **KVKK:** K4 yaş 18+ doğrulama · K6 admin server-side guard (savunma-derinliği).
- **F3 tenant hard-delete** (GERİ-ALINAMAZ+DB, keşif+PO önce) · **F6 hayalet mod+CSV** (migration, ayrı büyük tur) · **staging ortamı**.

### En kritik ❓ (PO kararı gerekli — güvenlik önce)
- **KARAR 5 — DISC mahremiyet asimetrisi:** menti→mentör DISC tipi gizleme backend'de kanıtlanamadı → **güvenlik/PII teyidi şart** (DTO role-ayrışması; frontend gizleme yetmez).
- **F5 eşleşme tetikleyicisi** · **KARAR 6 otomatik onay** · **super-admin/Taraf-1 sil-bağla-ertele** · **Match DB persist**.

---
> **Sonraki adım (AYRI tur):** Bu ham harita → tek-bakışta renkli **DURUM PANOSU** (`00-DURUM-PANOSU`) → sonra
> yol haritası **v1/v2 önceliklendirme** (PO çerçeveyi verecek). Bu belge önceliklendirme yapmaz.
