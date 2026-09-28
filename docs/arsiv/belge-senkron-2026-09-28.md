# Belge senkron — eski satırlar (2026-09-28)

> OTONOM-PROMPT 5c kural (h): kapanış işareti eklenen satırın ESKİ metni AYNEN.

## docs/kararlar/konu/consent-modeli-plani-2026-08-28.md:46 (AJ-88)

- Mevcut `kvkkConsentAt` (User:277, Tenant:186) **bu turda silinmez** — geriye uyum; yeni yazımlar Consent'e (dual-write), eski alanın kaldırılması ayrı/sonraki iş.

## docs/kararlar/00-KARAR-TAKIP.md:942 (AJ-87)

> - aday · **Kuyrukta satırı olmayan bulgular** (strateji katmanı satır açsın mı): G-kart doğrulaması (`docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md`) ~30 ⬜ kalem · `GET /api/system-logs` denetim izi/meta · kurum-içi sayımlar `User.role` · frontend askı ekranı yok · token türü ayrımı (OAuth pending). · 🟨 kısmen — system-logs iz/meta (AJ-02) ve kurum-içi sayımlar (AJ-01/AJ-40) yapıldı; kalan: askı ekranı → AJ-72, token türü → AJ-87, platform geneli rol sayımı → KARAR-124, G-kart kalemleri → `docs/raporlar/kod-denetimi/sahipsiz-kalanlar-2026-09-27.md`

## docs/kararlar/00-KARAR-TAKIP.md:153 (AJ-69)

>   + **DEVREDEN:** tasarım↔kod uçurumu (OCEAN, madde 101) · k-anonimlik yok (G1-22). · 🟨 kısmen — V-05: eşik 3 (`backend/src/services/mask.ts:52`), KPI ve platform analitiği maskeli; kalan: algoritma ayar ekranı ve ağırlık önerisi e-postası NPS ortalamasını 1-2 yanıtla gösteriyor → AJ-69 · OCEAN ayağı → PS-A3

## docs/kararlar/00-KARAR-TAKIP.md:635 (AJ-69)

| 119 | k-anonimlik (super-admin küçük-grup metrik yuvarlama) (= G1-22, bkz. bilanco/kararlar/G1-guvenlik-kvkk.md) | ⬜ AÇIK (PO önceliklendirmedi) · 🟨 kısmen — V-05: eşik 3 (`backend/src/services/mask.ts:52`), KPI ve platform analitiği maskeli; kalan: algoritma ayar ekranı + öneri e-postası NPS'i maskesiz → AJ-69 | ⬜ | T4-A2 | KVKK-agregat borcu: küçük grupta yeniden-tanımlanma riski | grep boş; iz zayıf |

## docs/kararlar/00-KARAR-TAKIP.md:69 (GÖREV 2.2 eski-onay doğrulaması — #37 kurum "düzeltme iste" CANLIDA)

| 🔴/🟡/🔵 **v1 açık iş** | **6** | ⚡ #37 kurum "düzeltme iste" → **✅ CANLIDA** (backend #50 + çatı #104 merged, migration canlıda). Kalan: cevap-tipi(#13), kurum-maili(#6), 2a/2b/#7-B tasarım-hazır, içerik/seed/PO + **9a** ağırlık-ayar (migration bekliyor) + **37m** kurum-mail-açma (PO-manuel env) |

## docs/kararlar/00-KARAR-TAKIP.md:73 (GÖREV 2.2 eski-onay doğrulaması — canlıda v1 ~10 kalem (özet satırı))

| ✅ **canlıda (v1)** | **~10** | KARAR 5, K2, K5, menü, rozetler, DISC harf, İş 2+3, admin soru UI, login enumeration |

## docs/kararlar/00-KARAR-TAKIP.md:98 (GÖREV 2.2 eski-onay doğrulaması — G7-04 ✅ + G1-17 (başlık))

> **⚡ GÜNCELLEME (2026-08-29) — FAZ 3a middleware turu (G7-04 ✅ + G1-17 yeniden tanım):** Çatı PR (frontend-only, backend DOKUNULMADI).

## docs/kararlar/00-KARAR-TAKIP.md:99 (GÖREV 2.2 eski-onay doğrulaması — G7-04 www→apex 301)

> **G7-04 ✅ CANLI ADAY:** `frontend/src/middleware.ts` — `www.sivilkapasite.org → sivilkapasite.org` 301, yol+query korunur, apex/localhost döngü koruması (5 test).

## docs/kararlar/00-KARAR-TAKIP.md:106 (GÖREV 2.2 eski-onay doğrulaması — G1-17 admin/platform uçları rol korumalı)

> **⭐ G1-17 → ✅ (gerçek çözüm bu tur):** Admin/platform backend uçları denetlendi — hepsi `requireRole('ADMIN')`/`requirePlatformAdmin` + tenant-scoped (🟢). Frontend middleware ile çözülemeyen kısmın ASIL koruması backend'de zaten var + eksik peer-katmanı kapatıldı. Kanıt: yetki haritası §B/§E + PR #60.

## docs/kararlar/00-KARAR-TAKIP.md:110 (GÖREV 2.2 eski-onay doğrulaması — 131-136 IDOR bulguları kapatıldı (başlık))

> **6 YENİ BULGU — NUMARALANDI (131-136), 3b-2'de ✅ KAPATILDI (PR #60, IDOR testli):**

## docs/kararlar/00-KARAR-TAKIP.md:111 (GÖREV 2.2 eski-onay doğrulaması — madde 131 IDOR düzeltmesi)

> - **131 (Y1)** `GET /requests` peer talep+PII sızıntısı → non-admin `OR[requester/target=self]` ✅ `requestController.ts`

## docs/kararlar/00-KARAR-TAKIP.md:112 (GÖREV 2.2 eski-onay doğrulaması — madde 132 IDOR düzeltmesi)

> - **132 (Y2)** `GET /meetings` peer görüşme meta sızıntısı → non-admin `OR[mentor/menti=self]` ✅ `meetingController.ts`

## docs/kararlar/00-KARAR-TAKIP.md:113 (GÖREV 2.2 eski-onay doğrulaması — madde 133 IDOR düzeltmesi)

> - **133 (Y3)** `GET /mentors/:mentorId/filter` peer filtre okuma → `requireSelfOrAdmin` ✅ `userRoutes.ts`

## docs/kararlar/00-KARAR-TAKIP.md:114 (GÖREV 2.2 eski-onay doğrulaması — madde 134 IDOR düzeltmesi)

> - **134 (Y4)** `PUT /mentors/:mentorId/filter` peer filtre YAZMA (sabotaj) → `requireSelfOrAdmin` ✅ `userRoutes.ts`

## docs/kararlar/00-KARAR-TAKIP.md:115 (GÖREV 2.2 eski-onay doğrulaması — madde 135 IDOR düzeltmesi)

> - **135 (Y5)** `POST /scoring/compute-profile` peer profil/rol ezme → self/admin guard + role token'dan ✅ `sjtScoringController.ts`

## docs/kararlar/00-KARAR-TAKIP.md:116 (GÖREV 2.2 eski-onay doğrulaması — madde 136 IDOR düzeltmesi)

> - **136 (Y6)** `POST /questions` tenant admin global soru → daima tenant'a sınırlı ✅ `questionController.ts`

## docs/kararlar/00-KARAR-TAKIP.md:121 (GÖREV 2.2 eski-onay doğrulaması — DK1 isPlatformAuthError)

> - **DK1 → ✅:** platform `dashboard` + `tenants/[id]` sayfaları oturum hatasını `message.includes('401')` ile arıyordu (backend Türkçe mesaj fırlatır, kod yok) → 401'de login'e yönlendirmiyordu. `isPlatformAuthError(e)` helper'ı `.status`'e bakar; 2 sayfada kullanıldı (6 birim test). `frontend/src/lib/api/platform.ts`.

## docs/kararlar/00-KARAR-TAKIP.md:123 (GÖREV 2.2 eski-onay doğrulaması — register rate-limit (Faz 3c))

>   - ⚠️ **GÜNCELLEME (2026-09-02, çapraz-ref B1 — ETİKET DÜZELTMESİ):** Bu ✅ **REGISTER uçunun** rate-limiti (Faz 3c) — **kart G1-26'nın konusu DEĞİL.** Kart **G1-26 = ŞÜPHE-BİLDİRİMİ formu** (`suspicionReportRateLimiter`, `suspicionRoutes.ts:9`) ve durumu **🟡 YARIM** (IP-limit ✅ · CAPTCHA/step-up ⬜). Kart kendisi "register limiter AYRI uç — Faz 3c" der. **KURAL 15: kart kazanır → G1-26 = 🟡, ✅ değil.** (Register limiti ayrı iş; onun ✅'sı doğru ama G1-26 etiketi yanlış.)

## docs/kararlar/00-KARAR-TAKIP.md:124 (GÖREV 2.2 eski-onay doğrulaması — G1-02 DISC sızıntısı yok)

> - **G1-02 (DISC sızıntısı) → ✅ TEYİT: sızıntı YOK.** `analyticsRoutes.ts:12` requireSelfOrAdmin · menti-facing DTO disc strip (`matchingController.ts:77-90`) · counterpart select'leri disc'siz (`conversationController.ts:64`, `meetingController.ts` select). Kendi tipini görmek normal; karşı tarafınki hiçbir peer yanıtında YOK.

## docs/kararlar/00-KARAR-TAKIP.md:196 (GÖREV 2.2 eski-onay doğrulaması — S23 Consent migration + backfill (kod ayağı))

| S23 | **G1-07 Tur B** — Consent migration + backfill'i CANLIYA uygula. **PO onayı ZORUNLU** (canlı=lokal aynı Neon). ⚠️ MIGRATION TEK BAŞINA. `CONSENT_VERSION` avukat metniyle (G1-10) sabitlenmeli. | 2026-08-28 | ✅ **TAM (2026-08-28, B1 PR #133 + B2 PR #134):** B1 migration CANLIDA · **B2 backfill `--apply` → 5 ACIK_RIZA yazıldı** (yalnız ACIK_RIZA, grantedAt==kvkkConsentAt 5/5, idempotens teyitli, revokedAt null). Ön-sayımlar değişmedi (6/2/5/0). Consent modeli canlıda tam devrede. **Kalan (ayrı işler):** CONSENT_VERSION→G1-10 · G1-08 OAuth rıza UI · G1-05 self-servis FE. | G1-07 / backend PR #58 / G1-10 |

## docs/kararlar/00-KARAR-TAKIP.md:298 (GÖREV 2.2 eski-onay doğrulaması — madde 6 kullanıcı onay/red maili çalışıyor)

| 6 | Onay/red maili — **kurum/destek** kısmı | 🟡 | yarım-kaldı | Kurum(tenant)-onay/ret maili + `destek@` + prod `PLATFORM_ADMIN_EMAIL` env bağla (kullanıcı maili ✅ çalışıyor) | `10-yol:md.6`; tam-envanter C3 | Hayır | S-M |

## docs/kararlar/00-KARAR-TAKIP.md:299 (GÖREV 2.2 eski-onay doğrulaması — madde 7(A) havuz kartı CANLIDA)

| 7 | Havuz kartı (A) + eşleşme-sonrası değerlendirme (B) | (A) ✅ CANLIDA / (B) 🔵 | (A) TAMAMLANDI + (B) tasarım-hazır | geçmiş: bkz. GEÇMİŞ §md.7 · ⚠️ **PO KARARI (2026-09-08): MADDE BÖLÜNDÜ.** Tek satırda iki iş vardı. **(A) Havuz kartı** ✅ CANLIDA — bu satırda ✅ olarak kalır. **(B) Eşleşme-sonrası değerlendirme** → **yeni madde 172.** ⚠️ Bu satır artık YALNIZ (A)'yı temsil eder. · ⚠️ **(A) 10-yol tamamlananlara taşındı (2026-09-08)** — `10-yol-haritasi.md` md.7 stub'ına "madde 7-A ✅ CANLIDA — BÖLÜNDÜ" notu eklendi. ⚠️ **NOT:** (A)'nın `10-yol-haritasi` tamamlananlar listesine taşınması **AYRI TUR** — bu turda o dosyaya dokunulmadı (çakışma riski). · (A) **✅ CANLIDA** aday kartı gerekçe FE render (çatı #102, DISC harfi hariç); (B) = **#7 sistem tasarımı** (bkz. C) | (A) main `mentor/page.tsx` compatibilityReason (2×) + `RankedMenti` tipi; (B) `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md` | (A) Hayır (B) Evet | (A) S (B) L |

## docs/kararlar/00-KARAR-TAKIP.md:300 (GÖREV 2.2 eski-onay doğrulaması — madde 9 ağırlık gösterimi CANLIDA)

| 9 | Algoritma kalibrasyon ağırlık UI (0.60/0.40) | ✅ CANLIDA (gösterim) | gösterim TAMAMLANDI | **GÖSTERİM ✅ CANLIDA** (backend #49 + çatı #102): "Mevcut Ağırlıklar" kartı %60/%40 + salt-okuma endpoint. **AYARLAMA YAPILMADI** → madde 9a migration turu | main `algorithm-tuner/page.tsx` kart (2×) + `GET /algorithm-tuner/weights` | Hayır (gösterim) / Evet (ayar) | S |

## docs/kararlar/00-KARAR-TAKIP.md:305 (GÖREV 2.2 eski-onay doğrulaması — madde 34 öğrenme yolculuğu tamamlanma kolonu)

| 34 | Öğrenme-yolculuğu tamamlanma görünürlüğü (STK admin) | ✅ CANLIDA | TAMAMLANDI | **✅ CANLIDA** (backend #49 → `18cfc42` + çatı #102 → `0fd4942`, merged): `adminListUsers`'a `learningJourneyCompletedAt` + havuz kolonu. Test var | 🟩 main `adminController.ts` alan döner (4×) + test; `menti/mentor-havuzu` kolonu (2×) | Hayır | S |

## docs/kararlar/00-KARAR-TAKIP.md:308 (GÖREV 2.2 eski-onay doğrulaması — madde 138 notu: discResultCard CANLIDA, FE okuyor)

| 138 | Arketip hesabı — en yüksek boyut + ikinci; fark <10 puan ise "şimdilik" dili | 🔵 ⛔MOTOR | hesap-mantığı | Baskın+ikincil boyut hesabı + eşik<10 "şimdilik" metin dalı (4 varyant madde 139). **⚠️ MOTOR ÖN KOŞULU (2026-09-03 keşif):** `oceanO..N` canlı akışta üretilmiyor. Yazan tek kod `computeAndStoreProfile` (`scoring.service.ts:103-115`), çağıran tek uç `POST /api/scoring/compute-profile` (`sjtScoringController.ts:72`) — FE bu ucu HİÇ çağırmıyor. ⭐ VERİ KÖPRÜSÜ YOK: fonksiyon `UserProfile.discD/I/S/C` okur, onboarding `User.discVector`'a yazar → çağrılsa bile tüm boyutlar 50'ye eşitlenir (ayrışma yok). **Faz 5 / madde 101 ön koşulu.** **⚠️ EK (2026-09-04, KEŞİF): motor işi 11 kaleme ayrıldı** (SjtQuestion/SjtOption/sjt-scorer iskeleti HAZIR; 3 boşluk: SjtResponse/adaptif-ters/güven-rampası) — detay: `../raporlar/kesif/faz5-onkosul-kesfi-2026-09-04.md`. ⭐ **İKİ AYRI ARKETİP (karıştırma):** `User.discResultCard.archetype` (Türkçe DISC kartı — Öncü/Ateşleyici/Yapı Taşı/Kâşif; CANLIDA, FE okuyor) ↔ `UserProfile.archetype` (Big Five; NULL, FE okumuyor). Yeni 8 metafor arketip İKİNCİSİNE bağlı. | arketip §3/§10-1 (`../raporlar/icerik/arketip-ve-yaklasim-icerigi-2026-09-03.md`) | Hayır | M |

## docs/kararlar/00-KARAR-TAKIP.md:313 (GÖREV 2.2 eski-onay doğrulaması — madde 143 şık karıştırma KODLANDI)

| 143 | ⭐ Şık sırası her gösterimde KARIŞTIRILSIN — öğrenme yolculuğu + sertifika | 🔀 PR'DA | gösterim-mantığı | **✅ KODLANDI (2026-09-04, çatı PR):** `lib/shuffle.ts` (Fisher-Yates, kimlik korur) + `ScenarioGuideEngine` opt-in `shuffleChoices` (öğrenme yolculuğu) + `mentor/certification` displayOptions. Cevap `key`'e bağlı → bozulmaz. ⚠️ Karakter testi senaryoları kodda YOK (dokunulmadı). Kanıt: keşif; önceden `shuffle\|Math.random`=0. | faz6 §5/§10-5 + kod-kalemleri **Madde 1** | Hayır | S |

## docs/kararlar/00-KARAR-TAKIP.md:315 (GÖREV 2.2 eski-onay doğrulaması — madde 145 regresyon testi)

| 145 | ⭐ Öğrenme yolculuğu cevapları kişilik profiline İŞLENMESİN (yön verilen seçim saf sinyal değil) | 🔀 PR'DA | veri-akışı | ~~[ESKİ · 2026-09-03] Yolculuk cevap yolu profile yazmasın; outcome akıbeti S31 keşfine bağlı~~ **⚠️ GÜNCELLEME (2026-09-03, KEŞİF): "kesme işi" DEĞİL KORUMA işi** — kullanıcı seçimi bugün ZATEN hiçbir yere yazılmıyor. **✅ KODLANDI (2026-09-04, backend PR #68):** `resolveChoice`'a madde 145 uyarı yorumu + regresyon testi (select sonrası UserProfile AYNI, ocean/archetype null). Davranış DEĞİŞMEDİ, kilitlendi. Kanıt: `../raporlar/kesif/icerik-onkosul-kesifleri-2026-09-03.md` §B | menti §5 Kalem A/§11-4 | Hayır (koruma) | S |

## docs/kararlar/00-KARAR-TAKIP.md:333 (GÖREV 2.2 eski-onay doğrulaması — madde 163 CertificationOption iç-not alanı)

| 163 | `CertificationOption`'a iç-not alanı — **MIGRATION** · KALEM 6 doğrulandı: `explanation` ve `outcome` ikisi de kullanıcıya gösteriliyor, gizli alan YOK (`schema.prisma:1149-1161`). Alan açılmazsa Oturum 1'in 🔒 iç notları seed'e GİREMEZ | ~~⬜ AÇIK~~ ~~🔀 PR'DA~~ ✅ CANLIDA | MIGRATION | geçmiş: bkz. GEÇMİŞ §md.163 · ✅ **MIGRATION UYGULANDI (2026-09-09, çalıştırma turu):** `ALTER TABLE "CertificationOption" ADD COLUMN IF NOT EXISTS "internalNote" TEXT;` canlı Neon'a uygulandı (`20260909000000_add_internal_note` · `prisma db execute` + `migrate resolve --applied`). **YEDEK TABLO:** `CertificationOption_yedek_20260909` (20 satır, kaynakla eşit — FAZ 1 teyitli). **DOĞRULAMA:** kolon var (`text`, nullable) ✅ · satır sayısı değişmedi (20) ✅ · `migrate status` = "Database schema is up to date!" ✅. ⭐ **madde 30'un öncülü olarak DÜŞTÜ** — kalan zincir: **madde 164 (eşik `>= 2` + test) → madde 30 (seed).** ⚠️ **KALEM 6 ÇÖZÜLDÜ:** iç notlar artık seed'e girebilir; ama `seed-certification.ts` HENÜZ iç not YAZMIYOR (alanı doldurmak ayrı iş, madde 30). ⚠️ Yedek tablo `schema.prisma`'da YOK → **S37** ile takibe alındı (regresyonsuz görülünce DROP). | `../raporlar/kesif/faz5-veri-akisi-kesfi-2026-09-08.md` §E | **Evet** | M |

## docs/kararlar/00-KARAR-TAKIP.md:352 (GÖREV 2.2 eski-onay doğrulaması — K4 18+ beyanı (beyan ✅))

| — | K4 yaş **verisi** doğrulaması (beyan ✅ ama veri yok) | ❓ | Şemada yaş alanı yok; öz-beyan yeterli mi yoksa veri-doğrulama mı → PO | 🟩 `schema.prisma` yaş alanı yok (A1) | Evet |

## docs/kararlar/00-KARAR-TAKIP.md:353 (GÖREV 2.2 eski-onay doğrulaması — 9a ağırlık ayarı CANLIDA)

| 9a | **Eşleştirme ağırlığı AYARLANABİLİRLİĞİ** (tenant bazlı) | ✅ CANLIDA (#52+#114) | **PO kararı alındı:** varsayılan %60/%40, dernek değiştirebilsin ama **5'er adımla** (küsürat yok), iki ağırlık toplamı hep %100 (biri artınca diğeri azalır). FE: slider ya da +/−, biçim uygulayıcıya. **Migration gerekli** (tenant-bazlı alan) + canlı eşleştirmeyi etkiler → #7 Aşama 2 ile birlikte, PO onaylı migration turu. **Ön iş: madde 9b** · **⚠️ GÜNCELLEME (2026-08-23):** ağırlığı kurumun **TÜM yöneticileri** değiştirebilir (yalnız kurucu değil); iz = kalibrasyon sayfasında tek satır *"son değişiklik: kim / ne zaman / eski→yeni"*; aynı iz hem ağırlık-değişikliği hem **kalibrasyon onay/red** aksiyonları için tutulur. | 🟩 `algorithmTuner.ts` STEP=0.05/MIN-MAX · **⚠️ GÜNCELLEME (2026-08-26): MIGRATION GEREKMEDİ** (ağırlık `tenantVocabulary` Json'da; audit `SystemLog.meta`) — keşif doğruladı. **✅ CANLIDA — backend #52 (`838d128`) + çatı #114 (`6e6e798`) merged.** `PUT /algorithm-tuner/weights` (tenant-izolasyon, TÜM adminler, audit) + FE +/− %5 UI. ⚠️ **'kim' izi YARIM** → madde 95. | **Hayır** |

## docs/kararlar/00-KARAR-TAKIP.md:354 (GÖREV 2.2 eski-onay doğrulaması — 9b scoring saklanan ağırlığı okur)

| 9b | **`scoring.ts` saklanan ağırlığı yoksayıyor** (kalibrasyon dekoratif) | ~~❓ bulgu~~ ✅ CANLIDA | ⚠️ **PO KARARI (2026-09-08): ✅ CANLIDA** (backend #52, madde 87 ile birlikte). Kod canlıda, iş yapıldı. ⚠️ **ETKİSİ GÖZLENMEDİ:** özel ağırlık kayıtlı tenant sayısı **0** (2026-09-08 DURAK-A). Düzeltme canlıda ama **hiç tetiklenmedi.** ⬜ **SÖZ S35:** ilk tenant özel ağırlık kaydettiğinde sıralamanın beklendiği gibi değiştiği **DOĞRULANACAK** — yoksa sessiz bozulma fark edilmez (madde 171 kapsamı). ⚠️ Bu kayıt, aynı turda yazılan **"YAPILDI ≠ DOĞRULANDI"** kural ekinin ilk uygulamasıdır. · geçmiş: bkz. GEÇMİŞ §md.9b | 🟩 canlı yol artık ağırlığı okur · **✅ CANLIDA — backend #52 (`838d128`):** `computeTotalScore` opsiyonel ağırlık; `matching.ts` bir kez okur (N+1 yok); regresyon testi. **madde 87 çözüldü.** ⭐ **DURAK-A (PO, Neon prod salt-okuma):** özel ağırlık kayıtlı tenant = **0 satır** → 9b hiçbir sıralamayı değiştirmedi (tümü varsayılan %60/%40). | Hayır (kod) |

## docs/kararlar/00-KARAR-TAKIP.md:355 (GÖREV 2.2 eski-onay doğrulaması — madde 37 düzeltme iste CANLIDA)

| 37 | **Kurum (STK) başvurusu "DÜZELTME İSTE" akışı** (red değil, revizyon talebi) | ✅ CANLIDA | TAMAMLANDI | **✅ CANLIDA** (backend #50 → `ba92dfa` + çatı #104 → `2639e2e`, merged): migration (CORRECTION_REQUESTED enum + `Tenant.correctionNote`, canlıya uygulandı — DB teyitli) + platform admin "Düzeltme İste" endpoint/UI + kurum resubmit + getMe tenant bloğu + mail altyapısı (GÖNDERİM KAPALI). Test CI'da geçti. **⚠️ mail açma = madde 37m** | 🟩 main `platformController.requestTenantCorrection`; `resubmitTenantApplication`; `TenantCorrectionBanner`; `tenantNotifications.ts`; canlı DB enum+kolon VAR | ✅ (additive) |

## docs/kararlar/00-KARAR-TAKIP.md:446 (GÖREV 2.2 eski-onay doğrulaması — D1 checkpoint cron)

> - ✅🔀 **D1 `findMatchesDueForCheckpoint`** → günlük cron'a bağlandı (`runCheckpointFeedbackReminderCron`), **LOG-ONLY** (gerçek bildirim Aşama 2 — mail geri-alınamaz + dedup guard'ı şema ister).

## docs/kararlar/00-KARAR-TAKIP.md:447 (GÖREV 2.2 eski-onay doğrulaması — kalite puanı kalıcı yazım)

> - ✅🔀 **Kalite puanı kalıcı yazım** → `TenantMembership.qualityMultiplier`'a event-driven yazılır (`persistMentorQualityMultiplier`); yönetici havuzunda "Kalite Puanı" kolonu görünür.

## docs/kararlar/00-KARAR-TAKIP.md:448 (GÖREV 2.2 eski-onay doğrulaması — pair-signal yöneticiye bağlandı)

> - ✅🔀 **F1 `getPairSignal` / `/pair-signal`** → yöneticiye TOPLU bağlandı (`adminListMatches` risk sinyali kolonu; eşleşmeler sayfası "Risk" rozeti). Esik mantığı `pairSignal.service.ts`'te.

## docs/kararlar/00-KARAR-TAKIP.md:453 (GÖREV 2.2 eski-onay doğrulaması — #7 Aşama 1 MERGED CANLIDA (başlık))

> **⚡ GÜNCELLEME (2026-08-19, merge turu) — #7 Aşama 1 ✅ MERGED, CANLIDA:** yukarıdaki 🔀 PR'lar merge edildi

## docs/kararlar/00-KARAR-TAKIP.md:455 (GÖREV 2.2 eski-onay doğrulaması — #7 Aşama 1 kalemleri CANLIDA)

> Yani **✅🔀 kalemleri artık ✅ CANLIDA** (autodeploy açık): D1 checkpoint cron (LOG-ONLY), kalite puanı kalıcı

## docs/kararlar/00-KARAR-TAKIP.md:538 (GÖREV 2.2 eski-onay doğrulaması — F.1 güvenlik #51 (başlık))

### F.1 — 🔴 GÜVENLİK · CANLI ÖNCESİ (✅ #51 MERGED — düzeltmeler canlıda; repolar PO tarafından PRIVATE yapıldı)

## docs/kararlar/00-KARAR-TAKIP.md:539 (GÖREV 2.2 eski-onay doğrulaması — G1-G3 #51 ile düzeltildi)

> ✅ Üç açık da **#51 ile CANLIDA düzeltildi** (b4b6d66); repolar PO tarafından **PRIVATE yapıldı.** (Tarihsel: bu açıklar public repoda görünürdü.)

## docs/kararlar/00-KARAR-TAKIP.md:543 (GÖREV 2.2 eski-onay doğrulaması — G1 updateUser password sızıntısı)

| G1 | `updateUser` (+2 kardeş uç) yanıtı `select`siz tüm User objesini döner → **password hash + PII sızıntısı** | `userController.ts:272→277` (ayrıca 355→381, 418→424) | Hayır | =10-yol madde 38 · **✅ CANLIDA (#51 MERGED → backend main `b4b6d66`):** db.ts global omit + explicit select + test |

## docs/kararlar/00-KARAR-TAKIP.md:544 (GÖREV 2.2 eski-onay doğrulaması — G2 hardDelete→anonymize)

| G2 | `hardDeleteUser` Meeting/Feedback FK non-null → **transaction rollback = KVKK kalıcı silme çalışmıyor** | `gdprService.ts:172-174` (kod-yorumu itiraf) + `schema.prisma` Meeting FK RESTRICT | Olası (SetNull) | =10-yol madde 39; ✅ **CANLIDA (2026-08-26, backend #54 → main `b433554`):** PO onayı (2) → `hardDeleteUser` **anonymizeUser'a yönlendirildi** (migration YOK); kullanıcıya "silindi" DENMEZ (ACCOUNT_CLOSED_MESSAGE). Test: satır silinmez, anonim+pasif. İki main CI yeşil. |

## docs/kararlar/00-KARAR-TAKIP.md:545 (GÖREV 2.2 eski-onay doğrulaması — G3 listSuspicionReports maske)

| G3 | `listSuspicionReports` `select`siz → **şüphe raporu edenin PII'si maskesiz** platform admin'e döner | `platformController.ts:353` | Hayır | =10-yol madde 68 · **✅ CANLIDA (#51 MERGED → backend main `b4b6d66`):** maskName/maskContact + explicit select + test |

## docs/kararlar/00-KARAR-TAKIP.md:552 (GÖREV 2.2 eski-onay doğrulaması — madde 79 haftalık görüşme limiti)

| **79** | `maxMeetingsPerWeek` enforce EDİLMİYORDU → menti limitsiz görüşme açar | yapılmamış-iş (sessiz yanlış) | `meetingController.ts` | ✅ **CANLIDA (#51 MERGED, backend main `b4b6d66`)** (menti başına · sabit 7-günlük UTC kova · tanımsızsa limit yok · 409 · iptal/tamamlanan hariç; test) |

## docs/kararlar/00-KARAR-TAKIP.md:553 (GÖREV 2.2 eski-onay doğrulaması — madde 80 getPlatformLogs select + listUserReports maske)

| **80** | `getPlatformLogs` `select`siz + `listUserReports` fullName maskesiz | güvenlik/PII | `platformController.ts:175,411` | ✅ **CANLIDA (#51 MERGED, backend main `b4b6d66`)** (explicit select + maskName + test) |

## docs/kararlar/00-KARAR-TAKIP.md:554 (GÖREV 2.2 eski-onay doğrulaması — madde 88 recentLogs meta çıkarıldı)

| **88** | `getPlatformStats` → `recentLogs` `select`siz → ham `meta` (PII) | güvenlik/PII | `platformController.ts:98` | ✅ **CANLIDA (#51 MERGED, backend main `b4b6d66`)** (explicit select, meta çıkarıldı; test) |

## docs/kararlar/00-KARAR-TAKIP.md:555 (GÖREV 2.2 eski-onay doğrulaması — madde 89 listPendingTenants maske)

| **89** | `listPendingTenants` admin `fullName`+`email` maskesiz | güvenlik/karar | `platformController.ts` | ✅ **CANLIDA (#51 MERGED, backend main `b4b6d66`)** — KARAR: maskele (onay akışı e-posta tüketmiyor, mail adresi yeniden çeker; `maskEmail` domain'i korur). Test |

## docs/kararlar/00-KARAR-TAKIP.md:557 (GÖREV 2.2 eski-onay doğrulaması — madde 95 son değişiklik aktörü)

| **95** | Kalibrasyon **'son değişiklik'** satırında **AKTÖR (kim)** gösterilmiyor — `getWeights` yalnız `lastAdjustedAt`/`reason` döner; actorUserId SystemLog audit'te yazılı ama okuma tarafına açılmamış → 9a PO kararının (kim/ne zaman/eski→yeni) yarısı eksik | yapılmamış-iş (küçük) | `getWeights` son audit kaydından actor döndürsün; migration yok | ✅ **CANLIDA (2026-08-26):** backend **#53 → main `b433554`** (`getLastWeightChange` — actorName yalnız AD, e-posta değil; tenant-izolasyonlu; `WEIGHT_CHANGE_AUDIT_MESSAGE` tek-kaynak; **migration YOK**) + çatı **#116 → main `9b09dc3`** (FE "Son değişiklik: {ad} · {tarih} · %X → %Y"). Testler: aktör + eski→yeni + e-posta sızmıyor + okuma-tarafı tenant izolasyonu. İki main CI yeşil. |

## docs/kararlar/00-KARAR-TAKIP.md:561 (GÖREV 2.2 eski-onay doğrulaması — madde 93 anonimleştirme (kısmen ✅))

| **93** | **Tam anonimleştirme** — `anonymizeUser` kısmi (takma-adlaştırma). **✅ Kısmen CANLIDA (#51 MERGED):** sosyal/avatar/enneagram/discResultCard eklendi. **KALAN:** mesaj içeriği · fiziksel foto dosyası (disk) · `Meeting.phoneNumber/notes` · kayıt-anahtarı (userId PK) bağı → çapraz-tablo yeniden-tanımlanma riski | yapılmamış-iş (KVKK, mimari) | `gdprService.ts`; saklama-imha metni gerçeğe göre düzeltildi | ✅ **CANLIDA (2026-08-26, backend #54 → main `b433554`):** PO onayı (c)+(iii) → serbest metin (mesaj `[silindi]` iki-taraflı, görüşme/feedback/talep/şikayet/sözleşme), fiziksel avatar dosyası, oturum/token temizlenir. **MIGRATION YOK.** İki main CI yeşil. **Sınır (dürüst):** userId (cuid, kişisel değil) kalır → H-9 (hukukçu). Yasal metin "tam geri-döndürülemez" vaadi vermez. |

## docs/kararlar/00-KARAR-TAKIP.md:568 (GÖREV 2.2 eski-onay doğrulaması — madde 87 motor ağırlığı okur)

| **87** | Onaylanan kalibrasyon önerisi scoring'de okunmuyordu (ölü yazma) | ölü-kod | 9b ile bağlandı | **✅ ÇÖZÜLDÜ CANLIDA — backend #52 (`838d128`)** — motor kaydedilen ağırlığı okur |

## docs/kararlar/00-KARAR-TAKIP.md:569 (GÖREV 2.2 eski-onay doğrulaması — madde 96 tam anonimleştirme CANLIDA)

| **96** | **Tam anonimleştirme keşfi (madde 93+39 birleşik) — 🛑 DURAK-1 PO onayı bekliyor** — 3 salt-okuma ajan (2026-08-26): (A) `anonymizeUser` yalnız User/UserProfile/UserResponse'a dokunur; **8 serbest-metin alanı hiç temizlenmiyor** (`Message.content` NOT NULL → placeholder `[silindi]`; diğer 8 `String?` zaten nullable → migration YOK). Mesaj iki-taraflı: öneri = A'nın yazdığı içerik `[silindi]`, B'nin mesajları + iskelet kalır. (B) Fiziksel dosya: yalnız avatar (userId dosya adında sızıyor); `deleteLocalAvatar()` VAR ama `gdprService`'e **bağlı değil**; öneri = transaction SONRASI best-effort sil + hata log'la (rollback değil). (C) Kayıt anahtarı: ~13 Restrict-FK tablosu (userId NOT NULL) → hardDelete gerçekten patlıyor. Seçenekler: **(a)** SetNull migration (~22 kolon, riskli, karşı-taraf geçmişi bozar) · **(b)** Cascade sil (geçmiş yok olur) · **(c)** userId kalsın + tüm bağlı PII temizlensin (**migration YOK**, en ucuz; ama userId **deseni** kalır → "anonim mi pseudonim mi" = hukukçu **H-9**) · **(d)** pratik değil. madde 39: hardDelete'i anonymize'e yönlendir (migration'sız). **Önerilen paket: (c)+(2)+mesaj(iii)+avatar-log — MIGRATION YOK.** ⚠️ (c) seçilirse yasal metinde "tam geri-döndürülemez" vaadi **verilemez** (dürüst beyan kalır); yalnız (a) vaadi güçlendirir. | keşif/karar (KVKK, mimari) | AJAN A/B/C raporları (bu tur); `gdprService.ts`, `schema.prisma`, `avatarStorage.ts` | ✅ **CANLIDA (2026-08-26): PO KARARI 1·1·1 = (c)+(iii)+(2)** → backend **#54 → main `b433554`** (migration YOK) + KVKK metinleri (05/06/00-AVUKAT H-9, çatı #117). EK: hesap-kapatma "silindi" DEMEZ, token/oturum iptali (test). İki main CI yeşil. **Kalan H-9:** userId (cuid) bağı hukukçuya. Yeni iş: **madde 97** (FE) · küçük borç **98/99/100**. |

## docs/kararlar/00-KARAR-TAKIP.md:571 (GÖREV 2.2 eski-onay doğrulaması — madde 97 self-servis dışa aktarım + hesap kapatma)

| **97** | **FE hesap-kapatma/anonimleştirme akışı YOK** — backend `anonymize`/`hard-delete` uçları ADMIN-only; kullanıcının kendi hesabını kapatabileceği (KVKK Md.11 hak-kullanım) FE ekranı yok. hardDelete anonymize'e yönlendirildiğinde gösterilecek onay/sonuç metni de FE'de yok. | yapılmamış-iş (KVKK FE) | grep: `frontend/src`'te silme/anonymize akışı 0 sonuç; madde 40/84 (KVKK FE üçlüsü) ile bağlı | ✅ **YAPILDI (2026-08-29, G1-05, backend PR #59 + çatı PR):** Self-servis uçlar + FE ekran. Backend: `GET /api/me/data-export` (userId TOKEN'dan → IDOR yapısal imkânsız; profil+rızalar+mesaj SAYISI, içerik yok) · `POST /api/me/delete-account` (e-posta teyidi → `hardDeleteUser` anonimleştirir; son-admin guard `isSoleActiveTenantAdmin` 409; ACIK_RIZA `revokeConsent` ile geri çekilir, satır silinmez). Kanıt: `gdprController.ts` (exportMyDataHandler/deleteMyAccountHandler), `gdprService.ts` (isSoleActiveTenantAdmin + anonymizeUser revoke), `userRoutes.ts` `/me/*`, test `tests/me-data-rights.test.ts`. FE: `DataPrivacySection.tsx` (indir + iki-adımlı onay), `lib/api/kvkk.ts`, profil sayfası altı. Onay metni ACCOUNT_CLOSED_MESSAGE korunur. **Kalan H-9** (userId-pseudonim) hukukçuda — bu iş kapsamı dışı. |

## docs/kararlar/00-KARAR-TAKIP.md:586 (GÖREV 2.2 eski-onay doğrulaması — T1 Zod message)

| T1 (madde 69) | Zod VALIDATION yanıtında `message` yok → generic "Hata" | ✅ **CANLIDA (#51, `b4b6d66`)** | `questionController.ts` (`firstValidationMessage`; FE zaten `message` okuyor → FE değişikliği YOK) | S | Hayır |

## docs/kararlar/00-KARAR-TAKIP.md:587 (GÖREV 2.2 eski-onay doğrulaması — T2 adaptive progress + FE guard)

| T2 (madde 70) | adaptive-test backend `progress` döndürmüyor | ✅ **CANLIDA (#51 backend + #114 FE guard)** | `adaptiveTestEngine.ts` `computeProgress` + FE `DailyQuestionWidget` guard kaldırıldı (çatı #114 `6e6e798`) | M | Hayır |

## docs/kararlar/00-KARAR-TAKIP.md:589 (GÖREV 2.2 eski-onay doğrulaması — T4 sertifika baraj kodda)

| T4 | Sertifika baraj (madde 72) ~~[ESKİ · 2026-09-04] "tüm sorularda mı" kararı yok~~ **✅ KARARA BAĞLANDI (2026-09-04, PO): seçenek (c)** — red-line ilk-deneme `!== 3` DOĞRUDAN ELER + diğer konularda TOPLAM EŞİĞİ (KONU'nun %80'i, `ceil`). ⭐ **Kod ZATEN uyguluyor** (FAZ 0-T1: `certification.service.ts:12` %80-KONU + `:50` `ceil(n×0.8)` + `:66-67` red-line===3/normal≥2 + `:86` RED_LINE_FAILED). Eşik **KONU bazlı**, PUAN değil (8 konu→7). ⬜ Alt karar: toplam eşiği kalibrasyona muhtaç (ilk 20-30 sınav; içeriği bloklamaz). Detay: §I `../raporlar/kesif/faz5-onkosul-kesfi-2026-09-04.md` · **⚠️ EK (2026-09-04, PO): KRİTİK KONU EŞİĞİ `=== 3` → `>= 2`.** Kritik 4 konuda **3 veya 2 GEÇER, 0 ve 1 ELER**; diğer 7 konuda ELEME YOK (yalnız toplam eşiğine katkı). Red-line'ın **İKİ işlevi de korunur:** garantili gelme (madde 149) + ayrı eleme kapısı (çizgi indi, kapı DURUYOR; `RED_LINE_FAILED` `:86` anlamlı kalır). **KOD DEĞİŞİKLİĞİ gerekir** (`certification.service.ts:66-67`, kod turu). Detay: keşif §I-3. · **⚠️ ÇAPRAZ-REF (2026-09-08):** eşik `>=2`'nin **içerik ayağı** Oturum 1'de UYGULANDI — 32 kritik-konu şıkkı "3/2 GEÇER, 1/0 ELER" varsayımıyla puanlandı + 1↔2 çizgisi her kritik senaryoda gösterildi (`../raporlar/icerik/sertifika-oturum1-4-kritik-konu-2026-09-08.md`). **KOD TURU hâlâ AÇIK** (`certification.service.ts:66-67` bugün `=== 3`); içerik `>=2` yapılacağı varsayımıyla yazıldı. · **⚠️ EK (2026-09-08, KEŞİF): KOD TURUNUN TEST AYAĞI.** `>= 2` değişikliğinde **`backend/tests/certification.test.ts:78` KIRILACAK** — `expect(isFirstAttemptPass(2, true)).toBe(false)` assert'i ters döner (`:74-77` geçerli kalır). Kod turu bu testi de güncellemeli. ⚠️ `certification-retry.test.ts` ve eşik testleri satır satır okunmadı → **❓ TEYİT GEREK.** Detay: `faz5-veri-akisi-kesfi-2026-09-08.md` §G.2. | ~~verilmemiş-karar~~ ✅ KARAR (c) + eşik `>=2` | `certification.service.ts:12/50/66-67/86` | S | Hayır |

## docs/kararlar/00-KARAR-TAKIP.md:624 (GÖREV 2.2 eski-onay doğrulaması — madde 108 ön-koşul chat ✅)

| 108 | Mentör karar ekranında menti CHAT ilk mesajı görünsün | ⬜ AÇIK (PO önceliklendirmedi) | ⬜ | T4-A1(E29) | Mentör görüşme kararı verirken menti'nin ilk mesajını görsün ("KALICI İŞ") | Ön-koşul (chat) ✅ ama Conversation↔Meeting FK yok; ekran inşa edilmedi |

## docs/kararlar/00-KARAR-TAKIP.md:687 (GÖREV 2.2 eski-onay doğrulaması — 5 FK RESTRICT + cron düzeltmesi)

> ✅ **ÇÖZÜLDÜ (2026-08-30, backend PR #63 · CANLI, PO onaylı):** 5 eksik FK'nin 5'i de eklendi (hepsi **ON DELETE RESTRICT** — PO kararı) + 150 öksüz satır silindi (yedek alınarak) + cron düzeltildi (kullanılmış kurum silinmez). 3 ayrı commit. **DURAK B:** FK 58→63, silinen=150=yedek (aynı satırlar), gerçek satır 0 etkilenmedi. **13-Temmuz zinciri kalıcı kayıt** (keşif belgesi §H). ⭐ Köken netleşti: İş 4 (`7f1cb11`) migration FK'siz yarattı + test-DB guard 16 gün sonra geldi → test canlıya yazdı. **Kalan (ayrı kalem, DÜZELTİLMEDİ):** updatedAt default (4 tablo 🟢) · LearningStage onDelete (🟡) · yedek tablo düşürme (**S26**). Detay: `../raporlar/kesif/sema-drift-2026-08-30.md` §H.

## docs/kararlar/00-KARAR-TAKIP.md:717 (GÖREV 2.2 eski-onay doğrulaması — #12 login-PENDING (davet=onay) çözüldü)

| 12 | login-PENDING kayıt akışı (davetli /onboarding'e ulaşamıyor) | E2E turu 2026-09-01 | ✅ ÇÖZÜLDÜ (LOCAL, #67+FE) | **F.11** — davet=onay düzeltmesi |

## docs/kararlar/00-KARAR-TAKIP.md:720 (GÖREV 2.2 eski-onay doğrulaması — #12 login-PENDING çözüldü (toplam notu))

> **Toplam: 13 numarasız kalem** (⚠️ GÜNCELLEME 2026-09-01: #12 login-PENDING ✅ ÇÖZÜLDÜ (LOCAL); #13 OAuth token

## docs/kararlar/00-KARAR-TAKIP.md:736 (GÖREV 2.2 eski-onay doğrulaması — (12) login-PENDING çözüldü)

> **(12) LOGIN-PENDING KAYIT AKIŞI** — ✅ **ÇÖZÜLDÜ (2026-09-01, LOCAL; backend PR #67 + çatı FE)**

## docs/kararlar/09-DURUM.md:46 (GÖREV 2.2 eski-onay doğrulaması — #7 Aşama 1 CANLIDA)

## ✅ #7 AŞAMA 1 — DEĞERLENDİRME/METRİK ÖLÜ UÇLARINI BAĞLA — MERGED, CANLIDA (2026-08-19)

## docs/kararlar/09-DURUM.md:62 (GÖREV 2.2 eski-onay doğrulaması — #37 düzeltme iste CANLIDA)

## ✅ #37 KURUM DÜZELTME-İSTE — MERGED, CANLIDA (2026-08-19)

## docs/kararlar/09-DURUM.md:76 (GÖREV 2.2 eski-onay doğrulaması — #34 + #7(A) + #9 gösterim CANLIDA)

## ✅ KÜÇÜK İŞLER PAKETİ — #34 + #7(A) + #9-gösterim — MERGED, CANLIDA (2026-08-19)

## docs/kararlar/09-DURUM.md:89 (GÖREV 2.2 eski-onay doğrulaması — #37 login enumeration CANLIDA)

## ✅ #37 LOGIN ENUMERATION SERTLEŞTİRME — MERGED, CANLIDA (2026-08-19)

## docs/kararlar/09-DURUM.md:101 (GÖREV 2.2 eski-onay doğrulaması — #12 DISC çoklu harf CANLIDA)

## ✅ #12 DISC ÇOKLU HARF — MERGED, CANLIDA (2026-08-19)

## docs/kararlar/09-DURUM.md:117 (GÖREV 2.2 eski-onay doğrulaması — ① grubu masa temizliği (başlık))

## ✅ ① GRUBU — MASA TEMİZLİĞİ MERGED, CANLIDA (2026-08-17)

## docs/kararlar/09-DURUM.md:120 (GÖREV 2.2 eski-onay doğrulaması — #6 onay/red maili + correction-fix)

- **#6 — Onay/red maili TEYİT + correction-fix (backend #44), canlıda:** `approveUser`→onay maili ✅, `rejectUser`→red maili (gerekçeli) ✅ **zaten çalışıyordu** (teyit). Bulunan bug: `requestCorrection` düzeltme notunu (`feedbackNote`) DB'ye yazıyor ama **e-postaya iletmiyordu** (yorum "iletir" diyordu, etmiyordu) → tek satır fix (`rejectionReason: parsed.data.feedbackNote`). PII yok.

## docs/kararlar/09-DURUM.md:124 (GÖREV 2.2 eski-onay doğrulaması — #5 ThemeToggle zaten mevcut)

- **#5 — ThemeToggle admin/platform nav (kod-doğrulandı bu tur):** ✅ **ZATEN MEVCUT** — `(admin)/layout.tsx:92` `<ThemeToggle />` + platform dashboard'da var. Yol haritasından düşürülebilir (kod gerçeği).

## docs/kararlar/09-DURUM.md:127 (GÖREV 2.2 eski-onay doğrulaması — İş 3 P2/P3 reddedilen akışı)

## ✅ İŞ 3 P2/P3 — REDDEDİLEN KULLANICI AKIŞI, CANLIDA (2026-08-16)

## docs/kararlar/09-DURUM.md:135 (GÖREV 2.2 eski-onay doğrulaması — İş 2 + İş 3 P1 onay/red izi)

## ✅ İŞ 2 + İŞ 3 P1 — ONAY/RED İZİ + GEREKÇE, CANLIDA (2026-08-16)

## docs/kararlar/09-DURUM.md:137 (GÖREV 2.2 eski-onay doğrulaması — onay/red izi migration CANLIDA (kod ayağı))

- **Migration CANLIDA (additive/nullable, veri kaybı yok):** `User`'a `approvedBy`, `approvedAt`, `rejectedBy`, `rejectedAt`, `rejectionReason`. Yöntem: `db execute` (IF NOT EXISTS) + `migrate resolve --applied`; salt-okuma SELECT ile doğrulandı. `db push` kullanılmadı.

## docs/kararlar/09-DURUM.md:144 (GÖREV 2.2 eski-onay doğrulaması — masa temizliği 5 PR (başlık))

## ✅ MASA TEMİZLİĞİ — 5 PR MERGED, CANLIDA (2026-08-15, geç oturumlar)

## docs/kararlar/09-DURUM.md:146 (GÖREV 2.2 eski-onay doğrulaması — v1 #8 sol menü 4 grup)

- **v1 #8 — admin sol menü 4-grup (çatı #76):** ✅ TAMAMLANDI, canlıda. Gruplar: Günlük İşler · İnsanlar · Program & İçerik · Ayarlar & Kurulum (KARAR 1). Salt-frontend (`(admin)/layout.tsx`).

## docs/kararlar/09-DURUM.md:147 (GÖREV 2.2 eski-onay doğrulaması — v1 #11 sertifika rozeti)

- **v1 #11 — sertifika rozeti (backend #40 + çatı #77):** ✅ TAMAMLANDI, canlıda. **KİŞİ-GENELİ:** kişi HERHANGİ bir kurumda sertifikalıysa mentör havuzunda "✓ Sertifikalı" görünür — `TenantMembership.isCertified` üzerinden `some()` ile türetilir. `UserProfile.isCertified` **bakımsız** (hiç yazılmıyor) olduğu için kullanılmadı (kod kanıtıyla; migration gerekmedi).

## docs/kararlar/09-DURUM.md:148 (GÖREV 2.2 eski-onay doğrulaması — v1 #10 durum rozeti)

- **v1 #10 — durum rozeti:** ✅ **ZATEN MEVCUTTU** (kod gerçeği — yol haritasında ⏳ görünüyordu ama yanlıştı). Mentör + menti havuz tablosunda "Durum" sütunu `APPROVAL_META` ile Onaylı/Bekliyor/Reddedildi gösteriyor (`mentor-havuzu/page.tsx`, `menti-havuzu/page.tsx`); admin-only. Yeniden yapılmadı, teyit edildi.

## docs/kararlar/09-DURUM.md:152 (GÖREV 2.2 eski-onay doğrulaması — bu oturum v1 işleri (başlık))

## ✅ BU OTURUM — v1 İŞLERİ MERGED, CANLIDA (2026-08-15)

## docs/kararlar/09-DURUM.md:178 (GÖREV 2.2 eski-onay doğrulaması — KARAR 5 CANLIDA)

## ✅ GÜVENLİK — KARAR 5 DÜZELTİLDİ, CANLIDA (backend #37 + çatı #71 MERGED)

## docs/kararlar/09-DURUM.md:202 (GÖREV 2.2 eski-onay doğrulaması — v1 #1 KARAR 5 tamamlandı)

  > ⚠️ GÜNCELLEME (2026-08-15): **v1 #1 (KARAR 5) ✅ tamamlandı, canlıda** (#37+#71). Sıradaki v1 adayı: **havuz KART görünümü + "Neden uyumlu" L1 (KARAR 2/7)** — DISC güvenliği kapandığı için ön-koşul karşılandı, artık yapılabilir.

## docs/kararlar/09-DURUM.md:204 (GÖREV 2.2 eski-onay doğrulaması — CANLIDA/KAPANMIŞ (başlık))

## ✅ CANLIDA / KAPANMIŞ (kod main'de)

## docs/kararlar/09-DURUM.md:206 (GÖREV 2.2 eski-onay doğrulaması — CHAT kod TAM CANLIDA)

> - **CHAT:** kod TAM CANLIDA (aşağıdaki blok) · geriye YALNIZ PO'nun uçtan-uca manuel testi kaldı (⏳ BEKLEYEN bölümü) — çelişki değil, iki ayrı gerçek.

## docs/kararlar/09-DURUM.md:208 (GÖREV 2.2 eski-onay doğrulaması — tema toggle ZATEN mevcut)

> - **4-rol / platform-tema:** Mentör ✅ + tema toggle ✅ ZATEN mevcut (madde 5, satır ~229); "yapılacak" ifadeleri güncellendi.

## docs/kararlar/09-DURUM.md:209 (GÖREV 2.2 eski-onay doğrulaması — CHAT v1 TAM CANLIDA)

- **CHAT v1 — TAM CANLIDA.** menti↔mentör mesajlaşma: inbox/thread + `MessagesBell` (45sn polling) +

## docs/kararlar/09-DURUM.md:212 (GÖREV 2.2 eski-onay doğrulaması — MENTÖR PANELİ TAM CANLIDA)

- **MENTÖR PANELİ — TAM CANLIDA.** Gerçek metrik kartları (aktif menti · bekleyen · tamamlanan · ortalama NPS)

## docs/kararlar/10-yol-tamamlananlar.md:19 (GÖREV 2.2 eski-onay doğrulaması — KARAR 5 DISC görünürlüğü)

| 1 | KARAR 5 — DISC güvenlik açığı (menti mentörün DISC tipini görmesin) | ✅ backend #37 + çatı #71 | 2026-08-15 |

## docs/kararlar/10-yol-tamamlananlar.md:20 (GÖREV 2.2 eski-onay doğrulaması — K2 OAuth kvkkConsentAt)

| 2 | K2 — OAuth `kvkkConsentAt` ispat yükü | ✅ #38+#73 | 2026-08-15 |

## docs/kararlar/10-yol-tamamlananlar.md:21 (GÖREV 2.2 eski-onay doğrulaması — K4 18+ beyanı)

| 3 | K4 — Yaş 18+ öz-beyan (KVKK metnine gömülü) | ✅ #38+#73 | 2026-08-15 |

## docs/kararlar/10-yol-tamamlananlar.md:22 (GÖREV 2.2 eski-onay doğrulaması — K5 sunucu konumu beyanı)

| 4 | K5 — Sunucu konumu/yurt dışı aktarım beyanı | ✅ #73 | 2026-08-15 |

## docs/kararlar/10-yol-tamamlananlar.md:23 (GÖREV 2.2 eski-onay doğrulaması — ThemeToggle admin/platform)

| 5 | ThemeToggle admin/platform nav | ✅ zaten mevcut (kod-doğrulandı) | 2026-08-17 |

## docs/kararlar/10-yol-tamamlananlar.md:24 (GÖREV 2.2 eski-onay doğrulaması — sol menü 4 grup)

| 8 | Sol menü 4-grup gruplama (KARAR 1) | ✅ çatı #76 | 2026-08-15 |

## docs/kararlar/10-yol-tamamlananlar.md:25 (GÖREV 2.2 eski-onay doğrulaması — durum rozeti)

| 10 | Durum rozeti (KARAR 3) | ✅ zaten mevcuttu (kod-doğrulandı) | 2026-08-15 |

## docs/kararlar/10-yol-tamamlananlar.md:26 (GÖREV 2.2 eski-onay doğrulaması — sertifika rozeti)

| 11 | Sertifika rozeti (KARAR 4, kişi-geneli) | ✅ backend #40 + çatı #77 | 2026-08-15 |

## docs/kararlar/10-yol-tamamlananlar.md:27 (GÖREV 2.2 eski-onay doğrulaması — DISC çoklu harf)

| 12 | DISC baskın+ikincil harf "DI" (KARAR 11) | ✅ backend #47 + çatı #93 + docs #94 | 2026-08-19 |

## docs/kararlar/10-yol-tamamlananlar.md:28 (GÖREV 2.2 eski-onay doğrulaması — İş 2+3 onay/red izi + reddedilen akışı)

| 29 | İş 2 + İş 3 (P1+P2+P3) — onay/red izi + gerekçe + yönetici-adı + reddedilen akışı | ✅ #41-#43, #81-#85 | 2026-08-16 |

## docs/kararlar/10-yol-tamamlananlar.md:29 (GÖREV 2.2 eski-onay doğrulaması — admin soru düzenleme UI)

| 32 | Admin soru düzenleme UI | ✅ çatı #87 | 2026-08-17 |

## docs/kararlar/10-yol-tamamlananlar.md:30 (GÖREV 2.2 eski-onay doğrulaması — öğrenme yolculuğu kolonu)

| 34 | Öğrenme yolculuğu tamamlanma görünürlüğü (STK admin havuz kolonu) | ✅ backend #49 + çatı #102 | 2026-08-19 |

## docs/kararlar/10-yol-tamamlananlar.md:31 (GÖREV 2.2 eski-onay doğrulaması — giriş enumeration)

| 37 | Giriş enumeration sertleştirme (PENDING dahil) | ✅ backend #46 + çatı #91 + docs #92 | 2026-08-19 |

## docs/kararlar/10-yol-tamamlananlar.md:32 (GÖREV 2.2 eski-onay doğrulaması — updateUser password sızıntısı)

| 38 | `updateUser`/temperament password+PII sızıntısı (db.ts global omit + explicit select) | ✅ backend #51 | 2026-08-25 |

## docs/kararlar/10-yol-tamamlananlar.md:33 (GÖREV 2.2 eski-onay doğrulaması — SuspicionReport maske)

| 68 | `SuspicionReport` reporter PII maskeleme (maskName/maskContact) | ✅ backend #51 | 2026-08-25 |

## docs/kararlar/10-yol-tamamlananlar.md:34 (GÖREV 2.2 eski-onay doğrulaması — getPlatformLogs/listUserReports)

| 80 | `getPlatformLogs` select + `listUserReports` fullName maske | ✅ backend #51 | 2026-08-25 |

## docs/kararlar/10-yol-tamamlananlar.md:35 (GÖREV 2.2 eski-onay doğrulaması — recentLogs meta)

| 88 | `getPlatformStats` recentLogs meta çıkarıldı | ✅ backend #51 | 2026-08-25 |

## docs/kararlar/10-yol-tamamlananlar.md:36 (GÖREV 2.2 eski-onay doğrulaması — listPendingTenants maske)

| 89 | `listPendingTenants` admin fullName+email maske | ✅ backend #51 | 2026-08-25 |

## docs/kararlar/10-yol-tamamlananlar.md:37 (GÖREV 2.2 eski-onay doğrulaması — haftalık limit)

| 79 | Haftalık görüşme limiti enforce (sabit 7-günlük UTC kova) | ✅ backend #51 | 2026-08-25 |

## docs/kararlar/10-yol-tamamlananlar.md:38 (GÖREV 2.2 eski-onay doğrulaması — Zod message)

| 69 | Zod validation yanıtında anlamlı `message` (FE otomatik gösterir) | ✅ backend #51 | 2026-08-25 |

## docs/kararlar/10-yol-tamamlananlar.md:39 (GÖREV 2.2 eski-onay doğrulaması — adaptive progress)

| 70 | adaptive-test `progress` (FE guard kaldırma = ayrı tur, kalan) | ✅ backend #51 | 2026-08-25 |

## docs/kararlar/10-yol-tamamlananlar.md:40 (GÖREV 2.2 eski-onay doğrulaması — motor tenant ağırlığı)

| 9b | Motor kaydedilen tenant ağırlığını okur (scoring opsiyonel ağırlık, N+1 yok; madde 87 çözüldü) | ✅ backend #52 | 2026-08-26 |

## docs/kararlar/10-yol-tamamlananlar.md:41 (GÖREV 2.2 eski-onay doğrulaması — ağırlık ayarı)

| 9a | Tenant manuel ağırlık ayarı (PUT weights + FE +/− %5 UI; migration YOK) | ✅ backend #52 + çatı #114 | 2026-08-26 |

## docs/kararlar/10-yol-tamamlananlar.md:42 (GÖREV 2.2 eski-onay doğrulaması — DailyQuestionWidget guard)

| 70-FE | DailyQuestionWidget progress guard kaldırıldı (backend progress canlıda) | ✅ çatı #114 | 2026-08-26 |

## docs/kararlar/10-yol-tamamlananlar.md:43 (GÖREV 2.2 eski-onay doğrulaması — KVKK sunucu ülkesi Londra)

| 92 | KVKK sunucu ülkesi Londra/BK (AB üyesi değil) + veri sorumlusu kimliği | ✅ çatı #117 (docs) | 2026-08-26 |

## docs/kararlar/10-yol-tamamlananlar.md:44 (GÖREV 2.2 eski-onay doğrulaması — son değişiklik aktörü)

| 95 | Kalibrasyon "son değişiklik" aktör izi (actorName yalnız AD; tenant-izolasyon; migration YOK) | ✅ backend #53 + çatı #116 | 2026-08-26 |

## docs/kararlar/10-yol-tamamlananlar.md:45 (GÖREV 2.2 eski-onay doğrulaması — tam anonimleştirme)

| 93+39 | Tam anonimleştirme (serbest metin+foto dosyası+token) + hardDelete→anonymize; PO (c)+(iii)+(2), migration YOK; sınır: userId cuid kalır (H-9) | ✅ backend #54 + çatı #117 (metin) | 2026-08-26 |

## docs/kararlar/10-yol-tamamlananlar.md:47 (GÖREV 2.2 eski-onay doğrulaması — madde 93 kısmen notu)

> ⚠️ Kısmen: **madde 93** (anonimleştirme sosyal/avatar/kişilik alanları eklendi ✅ / mesaj+foto-dosyası+userId-bağı AÇIK) — `00-KARAR-TAKIP` F.5.

## docs/kararlar/10-yol-tamamlananlar.md:50 (GÖREV 2.2 eski-onay doğrulaması — md.6 kullanıcı maili ✅)

> **Kısmi/kalanı açık olanlar aktif roadmap'te kalır:** md.6 (kullanıcı maili ✅ / kurum maili AÇIK) ·

## docs/kararlar/10-yol-tamamlananlar.md:51 (GÖREV 2.2 eski-onay doğrulaması — md.7 kart + Aşama 1 ✅ · md.9 9a/9b CANLIDA)

> md.7 (menti→mentör kart + (A) gerekçe + Aşama 1 ✅ / Aşama 2-3 AÇIK) · md.9 (ağırlık gösterimi + 9a/9b ✅ CANLIDA) ·

## docs/kararlar/10-yol-tamamlananlar.md:52 (GÖREV 2.2 eski-onay doğrulaması — md.33 ölü seed ✅)

> md.33 (ölü seed ✅ / seed↔canlı + SJT AÇIK). Bunlar `10-yol-haritasi.md`'de açık işler index'inde.

## docs/kararlar/10-yol-tamamlananlar.md:61 (GÖREV 2.2 eski-onay doğrulaması — KARAR 5 CANLIDA)

**✅ KARAR 5 — DISC güvenlik açığı düzeltmesi — v1 #1, canlı-öncesi ŞART → TAMAMLANDI, CANLIDA** *(backend #37 `0850eaa` + çatı #71 `4c48a8e` MERGED)*.

## docs/kararlar/10-yol-tamamlananlar.md:63 (GÖREV 2.2 eski-onay doğrulaması — KARAR 5 tamamlandı canlıda)

- **✅ tamamlandı, canlıda:** `--merge` ile MERGED; submodule pointer senkron; iki repo main CI yeşil; regresyon testi CI Integration suite'te geçiyor. **v1 #1 kapandı.**

## docs/kararlar/konu/02-mimari-ve-altyapi.md:31 (GÖREV 2.2 eski-onay doğrulaması — Next.js 15.5.20 doğrulandı)

- **Frontend:** Next.js **15.5.20** (dikkat: bazı eski belgelerde 14.2.35 yazıyor — çelişki, güncel olan 15.5.20; **✅ 2026-08-14 `frontend/package.json` ile doğrulandı**), React 18, Tailwind, Radix UI. ~14.600 satır, 37 sayfa, 30 bileşen.

## docs/kararlar/konu/03-psikometri-ve-algoritma.md:12 (GÖREV 2.2 eski-onay doğrulaması — DISC görünür + OCEAN motor 🟢✅)

- **DISC görünür + Big Five (OCEAN) motor.** Kullanıcıya sezgisel arketipler gösterilir; algoritma altta OCEAN sürekli boyutlarında çalışır. 🟢✅

## docs/kararlar/konu/03-psikometri-ve-algoritma.md:16 (GÖREV 2.2 eski-onay doğrulaması — 8 arketip 🟢✅)

## 8 ARKETİP (4 mentör + 4 menti) 🟢✅

## docs/kararlar/konu/03-psikometri-ve-algoritma.md:21 (GÖREV 2.2 eski-onay doğrulaması — eşleşme formülü 🟢✅)

## EŞLEŞME FORMÜLÜ 🟢✅

## docs/kararlar/konu/03-psikometri-ve-algoritma.md:26 (GÖREV 2.2 eski-onay doğrulaması — hard-gate toksik blok 🟢✅)

## HARD-GATE (TOKSİK BLOK) 🟢✅

## docs/kararlar/konu/03-psikometri-ve-algoritma.md:33 (GÖREV 2.2 eski-onay doğrulaması — SJT & yanıt formatı 🟢✅)

## SJT (Durumsal Yargı Testi) & YANIT FORMATI 🟢✅

## docs/kararlar/konu/03-psikometri-ve-algoritma.md:47 (GÖREV 2.2 eski-onay doğrulaması — mentörlük yetkinliği & sertifikasyon 🟢✅)

## MENTÖRLÜK YETKİNLİĞİ & SERTİFİKASYON 🟢✅

## docs/kararlar/konu/03-psikometri-ve-algoritma.md:55 (GÖREV 2.2 eski-onay doğrulaması — progressive profiling & fallback 🟢✅)

## PROGRESSIVE PROFILING & FALLBACK 🟢✅

## docs/kararlar/konu/04-guvenlik-ve-kvkk.md:9 (GÖREV 2.2 eski-onay doğrulaması — IDOR korumalı + K2/K4/K5 CANLIDA)

> Bilinen düzeltmeler: **IDOR "2 açık" DEĞİL — kod korumalı** (`/mentors/:mentorId/candidates` + `/requests/:id` tenant izolasyonu + sahiplik, düzeltme `161ae00`; bkz. `devir/07-oturum-gunlugu.md` 2026-08-14). **K2/K4/K5 KVKK maddeleri CANLIDA** (2026-08-15). Kalan KVKK: K3 (eski-kayıt consent, canlı öncesi) + K6 (admin server guard → v2) → `00-KARAR-TAKIP.md`.

## docs/kararlar/konu/04-guvenlik-ve-kvkk.md:38 (GÖREV 2.2 eski-onay doğrulaması — 2 uç IDOR korumalı)

- **✅ GÜNCELLEME (2026-08-14):** Kod incelemesi (salt-okuma keşif) bu 2 endpoint'in **tenant izolasyonu + sahiplik kontrolü ile KORUMALI** olduğunu KANITLADI — **IDOR açığı YOK**. İlgili endpoint'ler (mentör aday listesi, talep detayı) çift katmanlı korumalı: tenant filtresi + sahiplik/ADMIN kontrolü, null-auth 401 ile reddedilir. Düzeltme commit `161ae00`. Kanıt: `matchingController.ts:45-52`, `requestController.ts:116-121`. Yukarıdaki "⏳ DÜZELTİLMEDİ" satırı BAYAT.

## docs/kararlar/konu/05-ozellikler-ve-paneller.md:9 (GÖREV 2.2 eski-onay doğrulaması — platform admin Kapsam B kodlandı)

- **Kapsam B (Orta):** Kurum detayı + Mentörler/Mentiler/Görüşmeler listeleri + DISC dağılımı, MEVCUT veriyle, şema değişikliği YOK. 🟢✅ (kodlandı, merge edilmedi)

## docs/kararlar/konu/05-ozellikler-ve-paneller.md:20 (GÖREV 2.2 eski-onay doğrulaması — A2 mentör havuzu)

- **A2 Mentör havuzu** ✅ (mevcut endpoint `GET /api/users?role=MENTOR`).

## docs/kararlar/konu/05-ozellikler-ve-paneller.md:21 (GÖREV 2.2 eski-onay doğrulaması — A3 menti havuzu)

- **A3 Menti havuzu** ✅ (aynı endpoint).

## docs/kararlar/konu/05-ozellikler-ve-paneller.md:22 (GÖREV 2.2 eski-onay doğrulaması — A4 sertifika sonuç panosu)

- **A4 Sertifika sonuç panosu** ✅ (yeni endpoint; TenantMembership certScore/status/attempts).

## docs/kararlar/konu/05-ozellikler-ve-paneller.md:23 (GÖREV 2.2 eski-onay doğrulaması — A1 eşleşme paneli)

- **A1 Eşleşme paneli** ✅ (Match DB'ye persist ediliyor — scoring.service.ts:137 doğrulandı).

## docs/kararlar/konu/05-ozellikler-ve-paneller.md:24 (GÖREV 2.2 eski-onay doğrulaması — A7 branding + logo XSS koruması)

- **A7 Branding düzenleme** ✅ (logoURL XSS koruması: https-only + güvenli img render).

## docs/kararlar/konu/05-ozellikler-ve-paneller.md:26 (GÖREV 2.2 eski-onay doğrulaması — takvim/feedback 🟢✅)

## TAKVİM / FEEDBACK (psikometri chat'i) 🟢✅

## docs/kararlar/konu/05-ozellikler-ve-paneller.md:31 (GÖREV 2.2 eski-onay doğrulaması — bookMeeting UTC/Istanbul düzeltildi)

  - **✅ GÜNCELLEME (2026-08-14): DÜZELTİLDİ** — commit `6a30f21` (bookMeeting UTC/Istanbul tutarsızlığı giderildi). Yukarıdaki "düzeltilmedi ⏳" ifadesi BAYAT.

## docs/kararlar/konu/06-tasarim-ux.md:9 (GÖREV 2.2 eski-onay doğrulaması — tema toggle altyapısı 🟢✅)

- **Toggle var:** İsteyen light'a geçebilir. Altyapı kuruldu (PR #32: .dark class, ThemeProvider, localStorage, FOUC önleme, ThemeToggle butonu). 🟢✅

## docs/kararlar/konu/06-tasarim-ux.md:20 (GÖREV 2.2 eski-onay doğrulaması — D21 toggle admin/platform nav TAMAMLANDI)

- **D21:** Toggle admin/platform nav'a eklenmeli. 🟢✅ **TAMAMLANDI** (2026-08-02, frontend `188aad5`).

## docs/kararlar/konu/06-tasarim-ux.md:28 (GÖREV 2.2 eski-onay doğrulaması — H1 UYGULANDI)

  - ✅ **GÜNCELLEME (2026-08-28, G7-12, Faz 1b PR):** H1 **UYGULANDI** → `HeroSection.tsx` H1 artık **"Mentörlük programınızı zahmetsizce yönetin"** (PO'nun son/kısa metni; "doğru eşleşmelerle" ibaresi çıkarıldı). **Alt metin (subtitle) PO'ca KESİNLEŞMEDİ → DOKUNULMADI** (mevcut "DISC davranış modeline dayalı…" alt metni kod'da duruyor; kesinleşince ayrı iş). Kanıt: `HeroSection.tsx:38-45`.

## docs/kararlar/konu/08-acik-sorular.md:32 (GÖREV 2.2 eski-onay doğrulaması — bookMeeting düzeltildi)

- ~~**timezone bug'ı (bookMeeting):** UTC vs Europe/Istanbul — gerçek bug mu, doğrulanacak.~~ ✅ ÇÖZÜLDÜ (2026-08-02, backend `6a30f21`) — bkz. 09-DURUM.

## docs/kararlar/konu/consent-modeli-plani-2026-08-28.md:10 (GÖREV 2.2 eski-onay doğrulaması — Consent tasarımı KODLANDI (Tur A))

> ✅ **GÜNCELLEME (2026-08-28, Tur A tamamlandı — backend PR #58):** Bu tasarım **KODLANDI + CI'da prova edildi** (şema + `consentService` + dual-write + backfill + testler). **Sapmalar:** (1) backfill `.mjs` yerine **`.ts`** (tsx-run, saf mantık `src/services/consentBackfill.ts`, tsc-temiz); (2) planlanan tasarıma sadık kalındı — keşifte bir ajanın önerdiği `role`-scoped consent **REDDEDİLDİ** (bu belge canonical). Kritik guard `platformTenantController.ts:203` dual-write ile çalışmaya devam eder (G1-08'de consentService'e geçer).

## docs/kararlar/konu/consent-modeli-plani-2026-08-28.md:12 (GÖREV 2.2 eski-onay doğrulaması — Consent migration CANLIDA (kod ayağı))

> ✅ **GÜNCELLEME (2026-08-28, Tur B1 — migration CANLIDA uygulandı, PR #133):** `20260828000000_add_consent` CANLI Neon'a `db execute` + `migrate resolve --applied` ile uygulandı; `migrate status` = "up to date". **Doğrulama:** Consent tablosu (9 sütun) + `ConsentType`/`ConsentSource` enum + 3 index + 2 FK oluştu; **ön-sayımlar değişmedi** (mevcut veriye dokunulmadı); Consent boş (0 satır). Backfill **DRY-RUN**: 5 satır yazılacak (5 user + 0 tenant).

## docs/kararlar/konu/consent-modeli-plani-2026-08-28.md:14 (GÖREV 2.2 eski-onay doğrulaması — backfill canlıya yazıldı (kod ayağı))

> ✅ **GÜNCELLEME (2026-08-28, Tur B2 — backfill CANLIYA yazıldı, PR #134):** `backfill-consent.ts --apply` → **5 ACIK_RIZA satırı** yazıldı (5 user + 0 tenant). **Doğrulama:** Consent=5, yalnız ACIK_RIZA (**AYDINLATMA yazılmadı**), source=BACKFILL + version=v1.0-legacy, hepsi aktif (revokedAt null), **grantedAt==kvkkConsentAt 5/5**. Ön-sayımlar değişmedi (6/2/5/0). **İdempotens teyitli** (ikinci dry-run=0). **Consent modeli canlıda TAM DEVREDE.** Kalan: `CONSENT_VERSION` avukat metniyle (G1-10) · G1-08 · G1-05.

## docs/kararlar/konu/degerlendirme-metrik-sistemi-tasarim-2026-08-19.md:218 (GÖREV 2.2 eski-onay doğrulaması — Aşama 1 MERGED CANLIDA)

> **⚡ GÜNCELLEME (2026-08-19, merge turu) — AŞAMA 1 ✅ MERGED, CANLIDA:** backend #48 (→ backend main `b5f4b88`) +

## docs/kararlar/konu/degerlendirme-metrik-sistemi-tasarim-2026-08-19.md:220 (GÖREV 2.2 eski-onay doğrulaması — Aşama 1 autodeploy CANLIDA)

> autodeploy ile CANLIDA. Aşağıya "PR'da, MERGE OLMADI" olarak yazılmıştı; artık merged. Aşama 2/3 kapsamı değişmedi (açık).

## docs/kararlar/konu/kvkk-metinleri/05-saklama-imha-politikasi.md:19 (GÖREV 2.2 eski-onay doğrulaması — SystemLog 90 gün cron VAR)

| Sistem/güvenlik kaydı | `SystemLog` | 90 gün sonra otomatik silinir | ✅ VAR (haftalık cron) | 90 gün (mevcut — güvenlik/iz sürme için makul) |

## docs/kararlar/konu/kvkk-metinleri/05-saklama-imha-politikasi.md:25 (GÖREV 2.2 eski-onay doğrulaması — taslak kurum 96 saat silme VAR)

| Taslak kurum başvurusu | `Tenant`+`User` (taslak) | 96 saat taslak kalırsa silinir | ✅ VAR | mevcut |

## docs/devir/07-oturum-gunlugu.md:126 (GÖREV 2.3)

- **K-02 🔀 PR'DA (PR #179):** kök `disc-test/page.tsx:86` (loading==`questions.length===0` → hata/boş/yükleniyor karışık, getQuestions hatası sonsuz iskelet). `DiscTestState.loading` + `reload()` + üç ekran. Test 3/3 (useDiscTest.test.tsx).

## docs/kararlar/00-KARAR-TAKIP.md:942 (AJ-72)

> - aday · **Kuyrukta satırı olmayan bulgular** (strateji katmanı satır açsın mı): G-kart doğrulaması (`docs/raporlar/kesif/g-kart-dogrulama-2026-09-26.md`) ~30 ⬜ kalem · `GET /api/system-logs` denetim izi/meta · kurum-içi sayımlar `User.role` · frontend askı ekranı yok · token türü ayrımı (OAuth pending). · 🟨 kısmen — system-logs iz/meta (AJ-02) ve kurum-içi sayımlar (AJ-01/AJ-40) yapıldı; kalan: askı ekranı → AJ-72, token türü → AJ-87, platform geneli rol sayımı → KARAR-124, G-kart kalemleri → `docs/raporlar/kod-denetimi/sahipsiz-kalanlar-2026-09-27.md` · ✅ token türü yapıldı — AJ-87 · PR #219/#410 · 2026-09-28

## docs/kararlar/konu/06-tasarim-ux.md:40 (AJ-90)

- **Grid + sayfalama:** sayfa başına ~15-18 kart (kesin sayı açık soru, bkz. 08); masaüstü 3 / tablet 2 / mobil 1 sütun. 300 mentör → çok sayfa. · 🟨 kısmen — kart ızgarası var; kalan: sayfalama (bugün tek istekte en çok 100) → AJ-90

## docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:756 (AJ-89)

| 10 | Görünürlük kuralları (10.3) uygula | 🟨 kısmen — S1 ihtiyacı hiçbir ekranda gösterilmiyor (seçimde gizlilik fiilen sağlanıyor); kalan: eşleşme sonrası mentöre görünme + yöneticiye yalnız toplu dağılım → AJ-89 | evet |

## docs/kararlar/00-KARAR-TAKIP.md:311 (AJ-70)

| 141 | Üç sorunun önüne tek cümle: "Son üç soru. Sonra karakter kartın hazır." | 🟨 kısmen — cümle + sıra canlıda (I-02, `frontend/src/app/onboarding/_OnboardingContent.tsx:36,190`); kalan: PO ek önlemleri (ayrı görsel dil + kart öncesi kısa geçiş) yapılmadı → AJ-70 | FE-metin+akış | ~~[ESKİ · 2026-09-04] Üç-soru ekranına tek cümle ekle~~ **⚠️ ERTELENDİ (2026-09-04, kod turu).** Karar VERİLMİŞ (arketip §4: kart üç sorudan SONRA), ama mevcut kod TERSİ çalışıyor: Profil → Mizaç Testi → Sonuç(kart) → Tercihler(3 soru) (`_OnboardingContent.tsx:223-234`). ⭐ Yani 141 yalnız METİN işi DEĞİL — **AKIŞ SIRASI DEĞİŞİKLİĞİ** içerir. Ayrıca vaat edilen kart madde 140 (motor bekliyor). **Ön koşul: akış yeniden sıralaması + madde 140.** ⚠️ PO ek önlemleri (141 kapsamına): (1) sorular kart ekranıyla FARKLI görsel dilde ("test bitti, form dolduruyorum" hissi); (2) kart açılışına kısa gecikme — sorulardan ayırsın, ödül anını belirginleştirsin. | arketip §4/§10-4 | Hayır | S |

## docs/kararlar/00-KARAR-TAKIP.md:338 (AJ-94)

| 168 | `matching.ts:286` ve `:400`'deki ham cast yerine mevcut `parseDiscVector` guard'ı kullanılsın — bugün `User.discVector` JSON'u doğrulamasız cast ediliyor; şekli bozuk bir kayıt sessizce yanlış skor üretebilir. Guard zaten kodda var, kullanılmıyor | 🟨 kısmen — `parseDiscVector` guard'ı var ama dışa açık değil (`backend/src/services/discVectorService.ts:37`); kalan: `matching.ts:351,499` hâlâ ham tip dönüşümü → AJ-94 | KOD | İki çağrı noktasını `parseDiscVector` guard'ından geçir | `matching.ts:286,400` + mevcut `parseDiscVector` | Hayır | S |

## docs/kararlar/00-KARAR-TAKIP.md:339 (AJ-94)

| 169 | **İki ayrı `DiscVector` tipi var** — `scoring.ts:12-18` (`confidence` zorunlu) ve `scoring.config.ts:8` (`confidence` yok, küçük harfli alanlar). Onboarding'in yazdığı obje ikisine de tam uymuyor. Tipler adlandırılıp ayrılsın ya da birleştirilsin | 🟨 kısmen — ölçek testi kapandı (PS-A1/AJ-32); kalan: iki `DiscVector` tipi hâlâ ayrı (`backend/src/services/scoring.ts:12` ↔ `scoring.config.ts:8`) → AJ-94 | KOD | İki tipi ayır/adlandır; `buildDiscVector` (madde 162) tek tipe dayansın · **⚠️ KAPSAM DARALTMASI (2026-09-08):**  → **keşif YAPILDI, kapsam netleşti.** Kök sebep: Prisma `Json?` sütununa yazarken tip `InputJsonValue` oluyor, uygulama tipi yazma sınırında hiç uygulanmıyor (kanıt: `.prisma/client/index.d.ts` `discVector?: NullableJsonNullValueInput \| InputJsonValue`). **Kod TEMİZ** — yazma noktasında `as`/`any`/`@ts-ignore` YOK, `tsconfig` `strict: true`. Tip kaçış sayımı: `@ts-ignore` **0** · `: any` **0** · `as any` **4** · `as unknown as` 171 ama %90'ı Express `RequestHandler` route şablonu, veriyle ilgisiz. **Boşluk kaçış-deseni kaynaklı DEĞİL.** Yapısal boşluk 13 JSON alanının hepsinde var; gözlenen hata yalnız `discVector`'da, çünkü katı app-tip sözleşmesi olan tek alan o. Bu madde artık **yalnız iki tip ayrımını** kapsar (S); genel JSON sertleştirmesi ayrı kalem (F.14, numarasız, M) | `scoring.ts:12-18` vs `scoring.config.ts:8` | Hayır | S · geçmiş: bkz. GEÇMİŞ §md.169 |

## docs/kararlar/00-KARAR-TAKIP.md:208 (AJ-93)

| S35 | ⭐ İlk tenant özel ağırlık kaydettiğinde sıralamanın beklendiği gibi değiştiği doğrulanacak — 9b canlıda ama 0 tenant kullandı, etkisi hiç gözlenmedi | 2026-09-08 | 🟨 kısmen — kaydetme/doğrulama/izolasyon testli (`backend/tests/algorithm-weights-manual.test.ts`); kalan: özel ağırlığın sıralamayı değiştirdiğini kanıtlayan test → AJ-93 | 9b · 171 |

## docs/kararlar/00-KARAR-TAKIP.md:340 (AJ-95a)

| 170 | JSON yazım koruması — Prisma `Json?` sütunlarına yazarken tip `InputJsonValue` olduğu için uygulama tipi hiç uygulanmıyor; 13 JSON alanında yapısal boşluk. Gözlenen tek hata `discVector`'da | 🟨 kısmen — sahipsizdi (GÖREV 4); kalan: `schema.prisma`'daki 13 `Json` alanına yazım öncesi yapı doğrulaması → AJ-95 | KOD+KEŞİF | ⚠️ **KAPSAM BEYANI EKSİK:** "diğer alanlar okuma tarafında savunuluyor" iddiası keşif turunun GÖZLEMİDİR, sistematik tarama DEĞİL — 13 alanın **her** okuma noktası taranmadı. **Tek korumasız okuma yolu varsa bu kalemin "opsiyonel" gerekçesi çöker.** İş: (a) KAPSAM BEYANLI tarama, (b) sonra tip-checked sarmalayıcı kararı | `.prisma/client/index.d.ts` `InputJsonValue` · madde 162/169 | Hayır | M |

## docs/00-BELGE-HARITASI.md:68 (AJ-71)

- `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md` 🔄 Tasarım: Eşleşme Sonrası Değerlendirme +…

## docs/00-BELGE-HARITASI.md:69 (AJ-71)

- `degerlendirme-sistemi-tasarim-2026-08-27.md` ❓ Değerlendirme + Eşleştirme Sistemi —…

## docs/kararlar/00-INDEX.md:89 (AJ-71)

| `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md` | #7 eşleşme-sonrası değerlendirme + metrik takip + otomatik pasifleştirme + yeniden değerlendirme + periyodik hatırlatma vizyonu; VİZYON ↔ KOD GERÇEĞİ ayrı; 3 aşamalı plan | 🔄 YAŞAYAN (#7 inşasına başlarken) |

## docs/kararlar/00-INDEX.md:90 (AJ-71)

| `degerlendirme-sistemi-tasarim-2026-08-27.md` | Değerlendirme + eşleştirme sistemi tasarım belgesi (16 bölüm, iki tur): DISC→Big Five model kararı, metafor arketipler, Likert→senaryo ölçme + çekirdek 12 senaryo, derinleşme, sertifika, eşleştirme algoritması (%45/30/25), üç soru veri boşluğu, süreç/göç/kalibrasyon; Bölüm 16 KALEM LİSTESİ | 🔄 YAŞAYAN (kalemler 00-KARAR-TAKIP'e girecek) |

## docs/kararlar/00-INDEX.md:148 (AJ-71)

| `eslestirme-motoru-kesfi-2026-08-27.md` | Eşleştirme motoru keşfi (katman ağırlıkları/veto/sektör asimetri) — `degerlendirme-sistemi-tasarim-2026-08-27` tasarımının kaynağı |

## docs/kararlar/konu/00-INDEX.md:21 (AJ-71)

- `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md` — Tasarım: Eşleşme Sonrası Değerlendirme + Metrik Takip + Otomatik Pasifleştirme (iş #7)

## docs/kararlar/konu/00-INDEX.md:22 (AJ-71)

- `degerlendirme-sistemi-tasarim-2026-08-27.md` — Değerlendirme + Eşleştirme Sistemi — Tasarım Belgesi

## docs/otonom/03-PO-ELLE-ISLER.md:206 (AJ-71)

| A11 | **YENİ (GÖREV 4, 2026-09-27) — Kişi hakkında türetilen kalite puanı (mentör kalite çarpanı) KVKK Md.11 erişim hakkı kapsamında mı?** Puan yalnız kurum yöneticisine görünüyor; kişinin "verilerimi indir" çıktısında yok (`backend/src/services/gdprService.ts:318-361`). Kişiye gösterilmeli / dışa aktarımda verilmeli mi; gerekiyorsa ham puan mı, açıklamalı özet mi? | Kişi hakkında türetilmiş veri erişim hakkına girerse dışa aktarım eksik kalır. | KARAR-91 ile kümelenir; "evet" ise ajan dışa aktarıma alan ekleyen 🟢 (+7b) satır açar (kaynak: `docs/kararlar/konu/degerlendirme-metrik-sistemi-tasarim-2026-08-19.md:158`) |

## docs/raporlar/icerik/kod-kalemleri-2026-09-03.md:103 (AJ-71)

- **Eski kayıt (yerini bul):** `docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md:410` —

## docs/kararlar/00-KART-INDEKSI.md — İŞ 2 TEK KAYNAK (bayat bekçisi 5c-t, 2026-09-28)

> NEDEN: kart indeksi bağlı işin kuyruk durumunu kopyalıyordu ("⬜ → AJ-75 (BEKLIYOR)"); iş bitince kopya bayatladı. Durum hücresi işaretçiye çevrildi, bağlı iş bittiyse kartın kendi durumu güncellendi. Eski satırlar AYNEN:

- :35 (G1-06) `| G1-06 | KVKK otomatik veri imhası | ⬜ → F-02 (BEKLIYOR) | md.81 | F-02 | KUYRUK |`
- :37 (G1-08) `| G1-08 | OAuth açık rıza UI | ⬜ → AN-30 (PR-ACIK) | md.83 | F-03 | KUYRUK |`
- :41 (G1-12) `| G1-12 | Veri İşleyen Sözleşmesi | ⬜ → AN-36 (BEKLIYOR) | md.90 | — | G-kartı |`
- :42 (G1-13) `| G1-13 | Kulüp-tipi kurum aktif | ⬜ → AN-29 (BEKLIYOR) | md.91 | KARAR-9/18 | G-kartı |`
- :47 (G1-18) `| G1-18 | Çift-tenant kimlik teyidi | ⬜ → AJ-56 (BEKLIYOR) | — | — | G-kartı |`
- :49 (G1-20) `| G1-20 | RLS lint kuralı | ⬜ → AJ-75 (BEKLIYOR) | md.26(v2) | — | G-kartı |`
- :55 (G1-26) `| G1-26 | Şüphe formu IP-limit/CAPTCHA | ⬜ → F-05 (BEKLIYOR) | — | F-05 | KUYRUK |`
- :59 (G1-30) `| G1-30 | Çerez-izni bandı | ⬜ → Y-12 (BEKLIYOR) | md.67 | — | G-kartı |`
- :69 (G2-06) `| G2-06 | "Varsayılana düşen oran" metriği | ⬜ → AJ-79 (BEKLIYOR) | **madde 111** | — | G-kartı |`
- :72 (G2-09) `| G2-09 | CORE-eşiği tutarsızlığı (kart) | ⬜ → AJ-80 (BEKLIYOR) | md.102 | — | G-kartı |`
- :93 (G3-15) `| G3-15 | Soru metni yazım hataları | ⬜ → AN-02 (PR-ACIK) | — | — | G-kartı |`
- :110 (G4-09) `| G4-09 | Mükerrer platform API | ⬜ → E-4 (BEKLIYOR) | md.74 | K-13 | KUYRUK |`
- :111 (G4-10) `| G4-10 | setVisibilityOptIn Taraf-1 | ⬜ → E-4 (BEKLIYOR) | md.86 | K-13 | KUYRUK |`
- :145 (G5-01) `| G5-01 | Kurum başvuru maili açma | ⬜ → DK-02 (BEKLIYOR) | md.37m | KARAR-18 | G-kartı |`
- :149 (G5-05) `| G5-05 | Kullanıcı→ürün geri bildirim | ⬜ → AN-52 (PR-ACIK) | E24 | F-31 | KUYRUK |`
- :157 (G6-02) `| G6-02 | String→enum + çift-rol | ⬜ → AJ-77 (BEKLIYOR) | md.49 | — | G-kartı |`
- :171 (G7-05) `| G7-05 | Ziyaretçi ölçümü | ⬜ → Y-12 (BEKLIYOR) | md.56 | — | G-kartı |`
- :176 (G7-10) `| G7-10 | Açılış UX paketi | ⬜ → AJ-86 (BEKLIYOR) | md.22(v2) | — | G-kartı |`
- :177 (G7-11) `| G7-11 | Açılış koyu/açık tema | ⬜ → AJ-86 (BEKLIYOR) | md.22(v2) | — | G-kartı |`
- :179 (G7-13) `| G7-13 | Yumuşak lacivert tema yönü | ⬜ → AJ-86 (BEKLIYOR) | E4/md.65 | — | G-kartı |`
- :180 (G7-14) `| G7-14 | Mesaj listesi sanallaştırma | ⬜ → AJ-83 (BEKLIYOR) | — | — | G-kartı |`
- :195 (G8-11) `| G8-11 | Rate limiter Redis'e | ⬜ → AJ-76 (BEKLIYOR) | md.02:50/E2 | — | G-kartı |`
- :196 (G8-12) `| G8-12 | Cron çok-sunucuda çift | ⬜ → AN-06 (BEKLIYOR) | — | — | G-kartı |`
- :208 (G9-06) `| G9-06 | durum-panosu 📸'ye | ⬜ → F-01 (BEKLIYOR) | A11 | F-01 (reorg) | KUYRUK |`
- :213 (G9-11) `| G9-11 | Belge reorg 5 taşıyıcı ad | ⬜ → F-01 (BEKLIYOR) | A5 | F-01 | KUYRUK |`
- :214 (G9-12) `| G9-12 | Belge yeniden yapılandırma | ⬜ → F-01 (BEKLIYOR) | A5 | F-01 | KUYRUK |`
- :223 (G10-01) `| G10-01 | Kesin-ölü kod bloğu | 🟨 kısmen — E-1 + E-2 · PR #183; kalan → E-4 (BEKLIYOR) | md.44 | K-13 · E-1..E-5 | KUYRUK |`
- :224 (G10-02) `| G10-02 | VisibilityOptIn.requestMessage DROP | ⬜ → E-4 (BEKLIYOR) | md.18/A21 | — | G-kartı |`
- :225 (G10-03) `| G10-03 | matchingInterface USER-strategy | ⬜ → E-4 (BEKLIYOR) | U2/md.44 | — | G-kartı |`
- :226 (G10-04) `| G10-04 | findMatchesDueForCheckpoint LOG-ONLY | ⬜ → E-4 (BEKLIYOR) | D1 | — | G-kartı |`
- :230 (G10-08) `| G10-08 | UserProfile.qualityMultiplier ikiz | ⬜ → E-4 (BEKLIYOR) | D3 | — | G-kartı |`
- :232 (G10-10) `| G10-10 | PATCH /users/me/social bağlanmamış | ⬜ → E-4 (BEKLIYOR) | **madde 113** | K-13 | KUYRUK |`
- :233 (G10-11) `| G10-11 | PATCH /users/:id/self-profile mükerrer | ⬜ → E-4 (BEKLIYOR) | A20 | K-13 | KUYRUK |`
- :237 (G10-15) `| G10-15 | questionController toplu-yanıt | ⬜ → E-4 (BEKLIYOR) | md.70 | — | G-kartı |`
- :240 (G10-18) `| G10-18 | enneagramWing tüketici yok | ⬜ → E-4 (BEKLIYOR) | md.86/101 | — | G-kartı |`
- :253 (G11-02) `| G11-02 | Gelir modeli + pilot | ⬜ → AN-52 (PR-ACIK) · AN-29 (BEKLIYOR) | — | — | G-kartı |`
- (Nasıl okunur lejantı) eski: `⬜ → <iş> (BEKLIYOR/PR-ACIK)`

## İŞ 2 · 7b düzeltmesi (2026-09-28) — "kalan → X" kalıbı: bağlı iş bitmiş hücreler (eski satırlar AYNEN)

> NEDEN: 7b incelemesi (#455) bekçinin "kalan → X" kalıbını ve oktan sonraki kimlik listesini görmediğini buldu; kural genişletilince 7 kart hücresi ve 00-KARAR-TAKIP'te kural (h) kapanış işareti eksik 7 satır çıktı. Kart hücresi bağlı işin kuyruk kaydına göre ✅/🟨 yapıldı; 00-KARAR-TAKIP satırlarına açıklayıcı metin KORUNARAK "✅ X kalanı yapıldı — PR #" eklendi. G6-01: N+1 ayağı AJ-06 ile kapanmış (`backend/src/controllers/conversationController.ts:298-329` groupBy, commit b42a36e).

- docs/kararlar/00-KART-INDEKSI.md:52 (G1-23) `| G1-23 | logoUrl XSS koruması | 🟨 kısmen — F-04 + AJ-22 · PR #102/#272/#314, #387; kalan → AJ-52 · KARAR-112 | — | F-04 | KUYRUK |`
- docs/kararlar/00-KART-INDEKSI.md:102 (G4-01) `| G4-01 | Havuz KART görünümü rol-bazlı | 🟨 kısmen — F-10 · commit d9fd456 (PR gerekmedi); kalan → AJ-81 | KARAR-2 | F-10 | KUYRUK |`
- docs/kararlar/00-KART-INDEKSI.md:123 (G4-22) `| G4-22 | Menti "bekleme anı" | 🟨 kısmen — F-15 + AJ-45 · PR #228, #208/#395; kalan → AJ-82 | Y1 | F-15 | KUYRUK |`
- docs/kararlar/00-KART-INDEKSI.md:131 (G4-30) `| G4-30 | Yönetici rapor EXPORT | 🟨 kısmen — F-18 · PR #163/#342; kalan → AJ-78 | Y3 | F-18 | KUYRUK |`
- docs/kararlar/00-KART-INDEKSI.md:156 (G6-01) `| G6-01 | N+1 konuşma listesi | 🟨 kısmen — F-27 + AJ-45 · PR #86/#229, #208/#395; kalan → AJ-83 | md.48 | F-27 | KUYRUK |`
- docs/kararlar/00-KART-INDEKSI.md:167 (G7-01) `| G7-01 | Ekran-okuyucu düzeltmeleri | 🟨 kısmen — F-21 · PR #305; kalan → AJ-84 | md.50 | F-21 | KUYRUK |`
- docs/kararlar/00-KART-INDEKSI.md:175 (G7-09) `| G7-09 | WCAG 2.1 AA bütünsel | 🟨 kısmen — F-21 + AJ-07 · PR #305, #359; kalan → AJ-85 | md.64 | F-21 | KUYRUK |`
- docs/kararlar/00-KARAR-TAKIP.md:108

```text
> ⚠️ **GÜNCELLEME (2026-09-02, G1 çapraz doğrulama): ⭐ YANLIŞ KAPATMA — düzeltildi.** **NEDEN yanlış kapandı:** logoUrl **sahiplik/IDOR guard'ı** gerçekten VAR → o tespit DOĞRU (kaybolmaz). AMA **G1-23 kartının konusu XSS** (host/MIME beyaz listesi + CSP) ve o KODDA YOK (`tenantController.ts:11,82` çıplak `z.string().url()`; CSP `server.ts:74` yalnız `/uploads`, tenant `logoUrl`'i kapsamıyor). → **G1-23 kartı ⬜ AÇIK'a DÖNDÜ · 🟨 kısmen — F-04 + AJ-22 (#387: CSP engelleme modu yapıldı, 2026-09-27); kalan: logo yalnız izinli kaynaktan → KARAR-112 · CSP ihlal kaydı → AJ-52 · 🟨 kısmen — AJ-05 + AJ-22 (#387: CSP engelleme modu yapıldı, 2026-09-27); kalan: logo yalnız izinli kaynaktan → KARAR-112 · CSP ihlal kaydı → AJ-52** (XSS gerçek açık iş; kart takip taşıyıcısıdır). Kaynak hiyerarşisi: bkz. **KURAL 15** (kök CLAUDE.md — çelişkide KART kazanır). Detay/kanıt: `bilanco/kararlar/G1-guvenlik-kvkk.md` [G1-23]. · geçmiş: bkz. GEÇMİŞ §G1-23-yanlis-kapatma-2026-09-02 (AJ-68)
```
- docs/kararlar/00-KARAR-TAKIP.md:311

```text
| 141 | Üç sorunun önüne tek cümle: "Son üç soru. Sonra karakter kartın hazır." | 🟨 kısmen — cümle + sıra canlıda (I-02, `frontend/src/app/onboarding/_OnboardingContent.tsx:36,190`); kalan: PO ek önlemleri (ayrı görsel dil + kart öncesi kısa geçiş) yapılmadı → AJ-70 | FE-metin+akış | ⚠️ PO ek önlemleri (141 kapsamına): (1) sorular kart ekranıyla FARKLI görsel dilde ("test bitti, form dolduruyorum" hissi); (2) kart açılışına kısa gecikme — sorulardan ayırsın, ödül anını belirginleştirsin. | arketip §4/§10-4 | Hayır | S · ✅ PO ek önlemleri yapıldı — AJ-70 · PR #433 · 2026-09-28 (form görünümü + kart öncesi geçiş) · geçmiş: bkz. GEÇMİŞ §md.141 (AJ-68) |
```
- docs/kararlar/00-KARAR-TAKIP.md:328

```text
| 158 | Sertifika deneme sınırı — günde 2, üçüncüsü için bekleme; bekleme süresince öğrenme yolculuğuna yönlendirme | 🟨 kısmen — mola metni + öğrenme yolculuğu yönlendirmesi canlıda (AN-01); kalan: takvim günü başına 2 deneme sınırı → I-08, sayfa yeniden açılınca kalan süre → AJ-60 | backend-mantık | Günlük deneme sayacı + bekleme + yolculuk yönlendirme | faz6 §5/§10-4 | ❓ (deneme sayacı/zaman alanı) | M |
```
- docs/kararlar/00-KARAR-TAKIP.md:339

```text
| 169 | **İki ayrı `DiscVector` tipi var** — `scoring.ts:12-18` (`confidence` zorunlu) ve `scoring.config.ts:8` (`confidence` yok, küçük harfli alanlar). Onboarding'in yazdığı obje ikisine de tam uymuyor. Tipler adlandırılıp ayrılsın ya da birleştirilsin | 🟨 kısmen — ölçek testi kapandı (PS-A1/AJ-32); kalan: iki `DiscVector` tipi hâlâ ayrı (`backend/src/services/scoring.ts:12` ↔ `scoring.config.ts:8`) → AJ-94 | KOD | İki tipi ayır/adlandır; `buildDiscVector` (madde 162) tek tipe dayansın · **⚠️ KAPSAM DARALTMASI (2026-09-08):**  → **keşif YAPILDI, kapsam netleşti.** Yapısal boşluk 13 JSON alanının hepsinde var; gözlenen hata yalnız `discVector`'da, çünkü katı app-tip sözleşmesi olan tek alan o. Bu madde artık **yalnız iki tip ayrımını** kapsar (S); genel JSON sertleştirmesi ayrı kalem (F.14, numarasız, M) | `scoring.ts:12-18` vs `scoring.config.ts:8` | Hayır | S · geçmiş: bkz. GEÇMİŞ §md.169 · ✅ yapıldı — AJ-94 · PR #242/#436 · 2026-09-28 · geçmiş: bkz. GEÇMİŞ §md.169 (AJ-68) |
```
- docs/kararlar/00-KARAR-TAKIP.md:373

```text
| 22 | Landing UX paketi + yumuşak lacivert tema | 🟨 kısmen — belge yönü yazıldı (G7-13); kalan: canlı-sonrası landing tema + UX paketi kodu → AJ-86 | Hayır | canlı-sonrası |
```
- docs/kararlar/00-KARAR-TAKIP.md:396

```text
| Y3 | Yönetici **rapor EXPORT** (PDF/CSV) + görüşme ivmesi/tamamlama-uyum ORAN metrikleri | 🟨 kısmen — CSV dışa aktarım (F-18) yapıldı; kalan: görüşme ivmesi/trend → KARAR-103 md.10, tamamlama oranı → AJ-78 | En az export (S) — Persona B/C kanıtı | denetim B.3/2,3,10,11,12,14 |
```
- docs/kararlar/00-KARAR-TAKIP.md:524

```text
- **🟡 Etiket-gerçek çelişkisi — 3 yaşayan belge (KURAL 3/4 ihlali, AJAN-E 2026-08-23):** (a) `oz-denetim/durum-panosu-2026-08-14.md` · 🟨 kısmen — (a) durum-panosu 📸, (b) tasarim-kararlari-admin ↪️ (AN-44); kalan: (c) `degerlendirme-metrik-sistemi-tasarim-2026-08-19.md` hâlâ 🔄 + tarihli ad → AJ-71
```
- docs/kararlar/00-KART-INDEKSI.md "Nasıl okunur" lejantı — eski satırın TAMAMI:

```text
- **durum** = 2026-09-28 senkron (GÖREV 2.3): `✅ <iş> · PR #` kuyrukta BITTI · `🟨 kısmen — <iş>; kalan → <sahip>` · `⬜ → <iş> (BEKLIYOR/PR-ACIK)` · `🔴 KARAR-N` cevapsız karar. Kuyrukta eşleşmesi olmayan hücreler G-kart snapshot kodunu korur: ✅ YAPILDI · 🟡 YARIM · ⬜ AÇIK · ❓ TEYİT · 🗑️ GEÇERSİZ · 🔵 v2-backlog.
```

## İŞ 2 bekçisi (5c-t1) · AJ-99 kapanışı — kural (h) işareti (2026-09-28, eski satırlar AYNEN)

- docs/kararlar/00-KARAR-TAKIP.md:153

```text
>   + **DEVREDEN:** tasarım↔kod uçurumu (OCEAN, madde 101) · k-anonimlik yok (G1-22). · 🟨 kısmen — V-05: eşik 3 (`backend/src/services/mask.ts:52`), KPI ve platform analitiği maskeli; kalan: algoritma ayar ekranı ve ağırlık önerisi e-postası NPS ortalamasını 1-2 yanıtla gösteriyor → AJ-69 · OCEAN ayağı → PS-A3 · ✅ AJ-69 kalanı yapıldı — PR #220/#411 · 2026-09-28 (algoritma ayar ekranı + e-posta maskeli; kalan küçük çıkarım → KARAR-126, mentör paneli → AJ-99)
```
- docs/kararlar/00-KARAR-TAKIP.md:635

```text
| 119 | k-anonimlik (super-admin küçük-grup metrik yuvarlama) (= G1-22, bkz. bilanco/kararlar/G1-guvenlik-kvkk.md) | ⬜ AÇIK (PO önceliklendirmedi) · 🟨 kısmen — V-05: eşik 3 (`backend/src/services/mask.ts:52`), KPI ve platform analitiği maskeli; kalan: algoritma ayar ekranı + öneri e-postası NPS'i maskesiz → AJ-69 | ⬜ | T4-A2 | KVKK-agregat borcu: küçük grupta yeniden-tanımlanma riski | grep boş; iz zayıf | · ✅ AJ-69 kalanı yapıldı — PR #220/#411 · 2026-09-28 (algoritma ayar ekranı + e-posta maskeli; kalan küçük çıkarım → KARAR-126, mentör paneli → AJ-99)
```
