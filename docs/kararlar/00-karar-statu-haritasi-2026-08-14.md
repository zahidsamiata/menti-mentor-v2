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
_(işleniyor)_

<!-- KÜME 5 -->
## KÜME 5 — STK Admin 13 Bulgusu (yol haritası A)
_(işleniyor)_

<!-- KÜME 6 -->
## KÜME 6 — Algoritma · Altyapı · Denetimden Kurtarılanlar (yol haritası C/D/F)
_(işleniyor)_

<!-- KÜME 7 -->
## KÜME 7 — Unutulmuş Niyetler & PO Manuel (yol haritası E + envanter C)
_(işleniyor)_

---

## ÖZET
_(en sonda — toplam sayı + kategori dağılımı + 🟨 vurgu listesi + en büyük 🟥/❓ kümeleri)_
