# Belge Denetimi — 09-DURUM.md + 10-yol-haritasi.md (2026-08-10)

**📸 DONDURULMUŞ (2026-08-10)** — belge denetimi fotoğrafı.

> **Amaç:** İki hafıza belgesi aylardır katman katman büyüdü; içinde çözülmüş/eskimiş/çelişkili maddeler
> birikti. Bu denetim her maddeyi **gerçekle (kod + git)** kıyaslar: hâlâ geçerli mi / çözülmüş mü /
> eskimiş mi / çelişkili mi. Amaç, ürün sahibinin "belgeyi şöyle temizleyelim" kararına temel olmak.
>
> **Bu bir salt-okuma denetimdir — asıl iki belge bu turda DÜZENLENMEDİ.** Düzenleme kararı ürün sahibinde.
>
> **Doğrulama tabanı:** `git fetch origin`; backend main HEAD `afc2769`; 3 paralel keşif + doğrudan
> teyitler. Her iddia dosya:satır/commit/PR kanıtlı. Kişi adı yok.
>
> **İşaretler:** ✅ çözülmüş · 🔵 hâlâ açık · ⚠️ eskimiş/geçersiz · ❓ teyit gerek.

---

## A) 10-yol-haritasi.md — madde denetimi

| Madde | Belgedeki durum | GERÇEK | Kanıt |
|---|---|---|---|
| **İŞ 0 — MAIL** | "Gmail kırık, Resend'e geçiş devam ediyor, forgot-password bitmedi" | ⚠️ ESKİMİŞ — mail **çalışıyor** | `backend/src/services/emailService.ts:1-16` Gmail App Password çıkarılmış → generic SMTP relay (Resend/Brevo); forgot/reset tam: `authRoutes.ts:34,38` + `authController.ts:411-446` + FE `forgot-password`/`reset-password` sayfaları |
| **İŞ 1 — TEMİZLİK** | Worktree/branch sil (cati-lj, backend-testfix, fix/forgot-password-page, feat/learning-journey) | 🔵 AÇIK — **yapılmadı** | `git worktree list` → `cati-lj`, `cati-bump`, `cati-compose` HÂLÂ VAR; `feat/learning-journey` + `fix/forgot-password-page` merged ama silinmemiş |
| **İŞ 2 — İZOLE TEST DB** | "guard yok, .env.test yok, lokal verify tehlikeli" | ✅ ÇÖZÜLMÜŞ (büyük ölçüde) | `backend/.env.test` + `.env.test.example` VAR; `tests/helpers/assertTestDatabase.ts:44-76` guard + `tests/globalSetup.ts` TEST_DATABASE_URL kontrolü |
| **İŞ 3 — ONAY PANELİ** (bildirim maili + destek@ + prod admin) | Açık | ❓ TEYİT GEREK | Bildirim maili / `destek@` durumu derin kontrol edilmedi |
| **İŞ 4 — ÖĞRENME YOLCULUĞU uçları** | Kod merged, açık uçlar (DISC ton, test) | 🔵 kısmen açık | Kod main'de (learning-journey MERGED, commit `4ee7a4c`); içerik/test uçları TEYİT GEREK |
| **İŞ 5 — STAGING** | Yapılacak (`.env.compose.staging`) | 🔵 AÇIK — **yok** | `.env.compose.staging` / staging config bulunamadı; yalnızca prod `docker-compose.yml` |
| **İŞ 6 — LANDING UX** | Yapılacak | 🔵 AÇIK | Tema/landing branch'leri var, merge durumu ❓ TEYİT GEREK |
| **İŞ 7 — SEKTÖR SKORU** | "uyuyan 5-bileşen `sector-scorer`'ı canlı yola bağla (staging şart)" | 🔵 **HÂLÂ AÇIK** | `sector-scorer.service.ts` TAM 5-bileşen mantık **içerir** ama **canlı yola BAĞLI DEĞİL** — dışarıdan import/çağrı grep'i **boş**. Canlı eşleşme `scoring.ts:94` → `computeSectorScore` (etiket-örtüşme, `×0.6`) kullanıyor (`matching.ts:2` `scoring.js`'ten import ediyor). |
| **İŞ 8 — EŞLEŞTİRME BİRLEŞTİR** | Yapılacak (İŞ 7 sonrası) | 🔵 AÇIK | İŞ 7'ye bağlı |
| **Retention (öncelik kuyruğu md.4)** | "STK-yönetici dilimi BÜYÜK ÖLÇÜDE YAPILDI; davranışsal kalan açık" | ✅ kısmen doğru | `retentionMetrics.service.ts` + nudge + `activityService` (lastLoginAt) VAR; davranışsal (otomatik-nudge, mentör/menti sevdirme) 🔵 açık |
| **Bağımsız: repo PRIVATE yap** | Yapılacak | 🔵 AÇIK (GitHub web ayarı, kod değil) | — |
| **2026-08-10 blokları** (kopuk-uç · mentör paneli · SIRADAKİ İŞLER) | Güncel | ✅ GEÇERLİ | mentör paneli #36/#52/#51, Taraf-2 #35/#50 doğru |

> **⚠️ Envanter #54 düzeltmesi:** `unutulmus-niyet-envanteri-2026-08-10.md`'de sektör skoru "sabit 50
> stub dönüyor" yazıyor — bu **imprecise**. Canlı skorer (`computeSectorScore`) basit ama **gerçek**
> (etiket-örtüşme); "sabit 50" değil. Doğru ifade: *zengin 5-bileşen `sector-scorer.service.ts` UYUYOR
> (canlı yola bağlı değil)*. İŞ 7 niyeti geçerli kalır.

---

## B) 09-DURUM.md — madde denetimi

| Blok / madde | Belgedeki durum | GERÇEK | Kanıt |
|---|---|---|---|
| **Üst blok (2026-08-10)** mentör paneli TAM CANLIDA + Taraf-2 silindi + #54 | Güncel | ✅ DOĞRU | backend HEAD `afc2769`; #35/#36/#50/#51/#52/#54 MERGED |
| **"CHAT TAM CANLIDA" bloğu** (#47/#48 MERGED) | Güncel | ✅ DOĞRU | #47 `1af5170`, #48 `c2a8c45` MERGED |
| **"CHAT CANLIYA TAŞINIYOR — #47 AÇIK, MERGE PO'DA"** | #47 açık | ⚠️ ESKİMİŞ | #47 MERGED; üstteki blok geçersiz kılıyor ama blok hâlâ duruyor |
| **"⚠️ DÜZELTME — CHAT CANLIDA DEĞİL (#33/#40 açık)"** | Chat canlı değil | ⚠️ ESKİMİŞ/ÇELİŞKİLİ | #33 MERGED, #40 kapatıldı, chat canlı → blok tamamen geçersiz, hâlâ duruyor |
| **"CHAT v1 — PR HAZIR, MERGE PO'DA"** (AÇIK İŞLER) | PR'lar açık, MERGE YOK | ⚠️ ESKİMİŞ | #33/#47/#48 MERGED; migration main'de |
| **"VisibilityOptIn #34 — PR açık, MERGE YOK"** | Açık | ⚠️ ESKİMİŞ | #34 MERGED (pointer `3d89ba7`) |
| **4-rol tablosu "Mentör ⬜ Menti ⬜"** | Mentör başlanmadı | ⚠️ ESKİMİŞ | Mentör paneli #36/#52/#51 MERGED → **Mentör ✅** olmalı; Menti hâlâ ⬜ |
| **"Platform deep-view tema — yapılacak"** | Açık | ⚠️ ESKİMİŞ | #43 tema geçişi MERGED |
| **mentiRequestController.ts SİLİNDİ** | Silindi | ✅ DOĞRU | `git ls-files` boş; backend commit `5652bae` |
| **VisibilityOptIn.requestMessage şema kolonu duruyor** | Duruyor, DROP bekliyor | ✅ DOĞRU | `schema.prisma`'da `requestMessage String?` var |
| **FOTO VOLUME · chat canlı test · metrik gözle görme** | Bekleyen (PO manuel) | 🔵 AÇIK (kod değil) | Ürün sahibi görevleri |

### Belge-içi çelişkiler (aynı konu, farklı durum — eski bloklar silinmemiş)
1. **Chat:** "TAM CANLIDA" (güncel) ↔ "CANLIYA TAŞINIYOR / #47 AÇIK" ↔ "DÜZELTME — CANLIDA DEĞİL" (son ikisi eskimiş, hâlâ duruyor → okuyucu üç farklı durum görüyor).
2. **VisibilityOptIn:** "#34 KOD TEMİZLENDİ + MERGED" ↔ "#34 PR açık, MERGE YOK" (eskimiş).
3. **4-rol:** "Mentör ⬜" ↔ üst blok "mentör paneli TAM CANLIDA".
4. **Platform tema:** "yapılacak" ↔ "#43 tema geçişi MERGED".

---

## C) Ajan abartıları — denetimde düzeltilen noktalar (dürüstlük)

- **`setVisibilityOptIn` (Taraf-1, `userRoutes.ts:76-81`) hâlâ var** ≠ "kısmi silme çelişkisi". Taraf-1
  **kasıtlı** korundu (silme turunda karar verildi — yarım admin manuel-eşleştirme yeteneği). Yalnızca
  Taraf-2 (`mentiRequestController` + 3 rota) silindi. Belge tutarlı.
- **super-admin router "ölü" DEĞİL** — davranışsal testi var (`tenant-verification.test.ts:153,172,204`),
  silme turunda korundu. 10-yol'daki eski "sil" önerisi zaten revize edildi.
- **Sektör skoru "canlıda, stub değil" (ajan ifadesi) yanıltıcı** — canlı yol basit tag-scorer; zengin
  5-bileşen servis UYUYOR. İŞ 7 açık kalır (yukarı bkz).

---

## SONUÇ — ürün sahibi karar temeli

### ⚠️ ARTIK GEÇERSİZ (belgeden çıkar / `docs/arsiv/`'e taşı)
- **09-DURUM:** "CHAT CANLIYA TAŞINIYOR (#47 açık)" + "DÜZELTME — CHAT CANLIDA DEĞİL" blokları ·
  "CHAT v1 PR HAZIR, MERGE PO'DA" bloğu · "#34 PR açık, MERGE YOK" · "platform tema yapılacak".
- **10-yol:** İŞ 0 "mail kırık" · İŞ 2 "guard yok" (ikisi de artık doğru değil).

### 🔵 HÂLÂ AÇIK (kalmalı — önerilen öncelik)
1. **KVKK/yasal K1–K5** (üretim öncesi) — K2 OAuth `kvkkConsentAt` set edilmiyor (`oauthService.ts:98-110`).
2. **STK admin paneli 13 bulgu** (SIRADAKİ İŞLER-A).
3. **İŞ 7 sektör skoru** — uyuyan servisi canlı yola bağla (staging şart).
4. **İŞ 1 temizlik** — worktree `cati-lj`/`cati-bump`/`cati-compose` + merged branch'ler sil.
5. **İŞ 5 staging · İŞ 8 eşleştirme birleştir · retention davranışsal kalan · repo private.**
6. **PO manuel:** chat canlı test · foto volume · metrik gözle görme.

### 🔁 ÇELİŞKİ/TEKRAR (düzeltilmeli)
- 09-DURUM 4 belge-içi çelişki (yukarıda B).
- 10-yol: eski "İŞ 0-8" ile yeni "SIRADAKİ İŞLER (2026-08-10)" kısmen tekrar/çelişki.
- 4-rol tablosu güncellenmeli (Mentör ✅).

### 🧹 Önerilen TEMİZ SIRA (yalnızca öneri — uygulama ürün sahibi kararında)
- **09-DURUM = yalnızca "ŞU AN":** en üstte tek güncel durum özeti (ne canlı / ne bekliyor) + kısa
  "son değişiklikler" listesi. Eskimiş taşıma/düzeltme blokları `docs/arsiv/`'e taşınır (tarihsel iz orada durur).
- **10-yol-haritası = yalnızca "BUNDAN SONRA":** tek öncelik kuyruğu ("SIRADAKİ İŞLER 2026-08-10" ana
  liste olur). Eski "İŞ 0-8"de çözülenler işaretlenip arşive; açık kalanlar (staging, sektör skoru,
  landing UX, temizlik) yeni kuyruğa taşınır.

> Not: Bu temizlik "belge düzeltme deseni"ne (eskiyi silme, `⚠️ GÜNCELLEME`/arşiv ile koru) uyularak
> yapılmalı; tarihsel iz kaybolmasın. Uygulama ayrı, ürün sahibi onaylı bir turda.
