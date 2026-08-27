# BELGE BİLANÇOSU — TUR 2 / GRUP C (`docs/raporlar/kod-denetimi/` — 8 belge)

**📸 DONDURULMUŞ** (bilanço bölümü — 2026-08-26) · Tur 2/GRUP-C · Salt-okuma defter. Kod SALT-OKUNDU (spot-teyit), DEĞİŞTİRİLMEDİ · DB'ye DOKUNULMADI · PR/commit/belge-silme YOK.

> **Ne bu:** `docs/raporlar/kod-denetimi/` altındaki 8 denetim raporunun BAŞTAN-SONA okuma-defteri. Bu belgeler
> kodun GERÇEĞE karşı denetimleri — "belge ne diyor, kod ne yapıyor" fotoğrafları (2026-08-15..25). Numaralı
> maddelerin (00-KARAR-TAKIP F.1/F.2, madde 38-103) ana KAYNAĞIDIR. Çapraz-kontrol: `T1-A-canonical.md`,
> `T1-B2-kararlar-konu.md`, `T1-B3-kararlar-ozdenetim.md`. Numara DOĞURULMADI, hakem OLUNMADI.
> **⭐ Bu turun spot kod-teyidi:** G1/G2/G3 güvenlik bulguları + KVKK endpoint'leri + SuspicionReport.tenantId +
> cert-seed + K4 yaş-alanı GERÇEK KODLA doğrulandı (aşağıda §5). Bu denetimler 2026-08-15..25 tarihli; **birçoğu
> ARADAN KAPANMIŞ** — kanıt güncel kodda.

---

## 0. OKUMA İLERLEME TABLOSU

| belge | toplam satır | okunan satır | tam✅/kısmi⚠️/okunmadı❌ | kalem |
|---|:---:|:---:|:---:|:---:|
| `yarim-is-niyet-envanteri-2026-08-23.md` | 64 | 64 | ✅ TAM | 22 |
| `eksikler-derinlestirilmis-2026-08-15.md` | 77 | 77 | ✅ TAM | 10 |
| `tam-belge-taramasi-2026-08-23.md` | 82 | 82 | ✅ TAM | 24 |
| `degerlendirme-test-soru-envanteri-2026-08-15.md` | 120 | 120 | ✅ TAM | 21 |
| `kvkk-veri-aktarim-envanteri-2026-08-25.md` | 115 | 115 | ✅ TAM | 28 |
| `proje-analizi-kapsamli-denetim-2026-08-22.md` | 225 | 225 (1-115, 115-225) | ✅ TAM | 32 |
| `tam-envanter-gercek-durum-2026-08-19.md` | 227 | 227 (1-115, 115-227) | ✅ TAM | 30 |
| `strateji-gercek-denetimi-2026-08-20.md` | 376 | 376 (1-130, 130-260, 260-376) | ✅ TAM | 40 |

**Toplam: 8/8 belge TAM okundu. Okunmayan: 0. Toplam defter kalemi: 207.**

> **En bulgu-yoğun:** `strateji-gercek-denetimi` (376, 85 madde 5 persona) + `proje-analizi-kapsamli` (225, 6 eksenli
> teknik denetim) + `tam-envanter-gercek-durum` (227, 3 eksenli). KVKK envanteri (115) = hukuki paketin tek kaynağı.

---

## 1. DEFTER — belge belge (her kalem tek satır)

**DURUM kodları:** ✅ YAPILDI · 🟡 YARIM · 🔀 PR'DA · ⬜ AÇIK · ❓ TEYİT GEREK · 🗑️ GEÇERSİZ ADAYI

### 1.A — yarim-is-niyet-envanteri-2026-08-23 (kod arkeolojisi, niyet+neden)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :17 | Avatar/foto upload TAM (kart raporunun "tek gerçek eksik"i aradan yapılmış) | TUR-1'de var: T1-B3 §7 F1 | ✅ YAPILDI | `avatarController.ts`+multer+magic-byte; NİYET: kart havuzu foto eksiği |
| :18 | Coaching Suggestions admin waiting-room'a bağlı | NUMARASIZ | ✅ YAPILDI | `admin/waiting-room/page.tsx:195`+`CoachingSuggestionsDialog.tsx` |
| :19 | rewardPenalty·OCEAN adapter·sjt-scorer·notificationService·discResultCard hepsi bağlı (ölü-kod yanlış-pozitifleri) | NUMARASIZ | ✅ YAPILDI | belge kod-teyitli; ölü DEĞİL |
| :21 | SJT scoring endpoint'leri FE'siz | madde 75(T7)/101 | ⬜ AÇIK | `sjtScoringRoutes.ts:20,26`; NİYET: sprint-8-11 backend-first, FE sonraya; DURDU: FE bağlanmadı |
| :21 | `/rematch` admin FE aksiyonu yok | NUMARASIZ | ⬜ AÇIK | NİYET BELGELENMEMİŞ (backend-first); DURUŞ SEBEBİ YOK |
| :21 | `visibility-optin/confirm` FE'siz | madde 75(T7) | ⬜ AÇIK | NİYET: mentör görünürlük opt-in kapısı; DURDU: FE ekranı yazılmadı |
| :21 | `SjtQuestion/SjtOption` tabloları 0 prisma query | NUMARASIZ | ❓ TEYİT GEREK | `schema.prisma:889,906`; NİYET: SJT bankası; DURDU: hiç sorgulanmıyor (ölü-tablo adayı) |
| :21 | `iceBreaker.ts` decommissioned | TUR-1'de var: T1-A 💀 | ✅ YAPILDI (silinmiş) | backend CLAUDE.md "decommissioned"; kaldırıldı |
| :21 | `llmRetry.ts` yorum "aktif" ama 0 import (yorum-kod çelişkisi, tüketici `matchReason.ts` silinmiş) | madde 44 / T1-A D2 | ⬜ AÇIK (❓terk) | `llmRetry.ts:4-5` 0 import; NİYET: LLM retry helper; DURDU: LLM kaldırıldı, tüketici silindi → atıl |
| :24 | Bağlanmamış route 18 (108 toplam) + 6 meşru FE'siz | NUMARASIZ (özet) | ❓ TEYİT GEREK | rg FE-çağrı-yok teyitli; aşağıdaki tekil satırlar |
| :26 | `PATCH /users/me/social` bağlanmamış — NİYET BELGEDE YOK | A20 / madde 45 | ❓ TEYİT GEREK | `onboardingController.ts:461`; NİYET BELGELENMEMİŞ ("niyeti bulunamadı→PO sor"); DURUŞ SEBEBİ YOK |
| :26 | `PATCH /users/:id/self-profile` me/profile ile mükerrer mi | A20 | ❓ TEYİT GEREK | NİYET BELGELENMEMİŞ; DURDU: mükerrerlik şüphesi, PO kararı |
| :26 | `/clubs` 7 uç FE'siz | madde 41 | ❓ TEYİT GEREK (PO) | `clubController.ts`; NİYET: kulüp modülü; DURDU: ürün önceliği belirsiz→PO |
| :26 | `/feedback-logs`+`/combination-scores` FE'siz | madde 42 | ❓ TEYİT GEREK (PO) | NİYET: ML/geri-bildirim paneli; DURDU: "ML panel mi iç araç mı" PO |
| :26 | `/system-logs` platform/logs ile mükerrer | madde 74(T6) | ❓ TEYİT GEREK | NİYET: platform log; DURDU: mükerrer konsolidasyon PO |
| :30 | İmportsuz dosya 8 (llmRetry·matchingInterface·profile-completeness·sector-scorer·ContextualFeedbackHost·MeetingScheduler·ProfileStrengthCard·TenantSwitcher) | TUR-1'de var: T1-A 💀 C.2 / madde 44/45 | ⬜ AÇIK/🔵 | NİYET: yarım-özellik parçaları; DURDU: bağlanmadı (çoğu BEKLET, MeetingScheduler ❓PO kopya) |
| :31 | Yazılmayan Feedback alanları (engagement/goalClarity/periodic*×5) — create.data+Zod'da YOK | TUR-1'de var: T1-B2 dm / madde 7 Aşama3 | 🟡 YARIM | `schema.prisma:593-605`; NİYET: #7 değerlendirme formu; DURDU: form yazmıyor, Aşama 3'e kaldı (migration GEREKMEZ) |
| :32 | 🔴 admin guard yalnız client-side (middleware "Sprint 15") = K6 | K6 / madde 66 | ⬜ AÇIK | `(admin)/layout.tsx:6`; NİYET: server-side guard; DURDU: Sprint 15'e ertelendi, proje kuralına aykırı |
| :32 | `LoginForm.tsx:7` "Sprint 14 TenantProvider köprüsü" bayat olabilir | NUMARASIZ | ❓ TEYİT GEREK | DURUŞ SEBEBİ YOK; bayat-yorum şüphesi |
| :36-49 | AJAN-D: ~14 iddiası → kod-teyidiyle 9 gerçek (BAĞLA 6 · ❓PO 2 + hard-delete FK) | madde 40/41/42/45/75 | 🟡/⬜ | KVKK üçlü+opt-in+şikayet+sosyal (BAĞLA); kulüp+feedback-logs (❓PO) — aşağıda 1.C/1.E ile örtüşür |
| :49 | "~14"ten düşen yanlış-pozitifler (meetings/active·pair-signal FE-stub VAR; profile-completeness iki-uçta bağsız; tenant-switcher FE-var-backend-yok) | NUMARASIZ | ✅ YAPILDI (düzeltme) | KOD kazandı; envanter abartısı düzeltildi |
| :58 | #38 numara çakışması (10-yol=updateUser güvenlik ↔ KARAR-TAKIP=DISC-derinleşme) | TUR-1'de var: T1-A A1/madde 38 | ✅ YAPILDI (uyarıldı) | "68'den başla" çözümü; belge-içi uyarı |

### 1.B — eksikler-derinlestirilmis-2026-08-15 (7 eksik, seçenekli)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :9-18 (E1) | DISC-tipine-özel "mentiye yaklaşım" içeriği (EN BÜYÜK BOŞLUK) — 3 seçenek (statik/SJT-genişlet/sertifika) | madde 31 / A1 | 🔵 AÇIK (tasarım) | NİYET: DISC eşleştirmenin aksiyona dönüşmesi (ürün vaadi çekirdeği); DURDU: PO seçenek+içerik-yazar kararı bekliyor; kod YOK (`scoring.service.ts` yaklaşım metni üretmiyor) |
| :20-27 (E2) | Sertifika 20-senaryo bankası canlıya seed edilmemiş (KRİTİK, sessiz) — kod 20, canlı 5 | madde 30 / T5(73) | ⬜ AÇIK | NİYET: en olgun içerik kullanıcıya ulaşsın; DURDU: canlı DB yazımı→PO onaylı seed turu; `seed-certification.ts:259` idempotent upsert (güvenli). ⚠️ "canlı 5" DB-teyit gerek (bu tur sorgu yok) |
| :29-34 (E3) | İki çelişen DISC seed kaynağı (seed-questions.ts 20 ↔ seed.ts 32) | TUR-1'de var: T1-A madde 45 / Ç3 | 🟡 YARIM | ⚠️ ARADAN KISMİ: `seed-questions.ts` SİLİNDİ (backend #45); `seed.ts` çelişkisi kalmış (T1-B2 BÇ1). NİYET: tek seed kaynağı; DURDU: kod-temizlik ayrı tur |
| :36-42 (E4) | SJT belge-kod çelişkisi (Mini Akademi 4 SJT ↔ kod 3) | TUR-1'de var: T1-A Ç4 / T1-B2 BÇ1 | ⬜ AÇIK (PO) | KOD=3 (`seed.ts:530`); NİYET: kalibrasyon; DURDU: SJT genişletme mi belge-düzeltme mi PO |
| :44-49 (E5) | Admin soru düzenleme UI yarım (backend PATCH var, düzenle butonu yok) | TUR-1'de var: T1-A madde 32 | ✅ YAPILDI | ⚠️ ARADAN KAPANMIŞ: `tam-belge-taramasi:57` "düzenle butonu var `questions/page.tsx:256`" + T1-A madde 32 ✅ çatı#87. NİYET: yönetici düzeltme; O gün buton yoktu, sonra bağlandı |
| :51-55 (E6) | STK-custom soru neredeyse kullanılmamış (canlıda 1, DISC skoruna katılmaz) | NUMARASIZ | ❓ TEYİT GEREK (PO) | NİYET: kurum-özel profil zenginleştirme; DURDU: değer üretmiyor, tutulsun/kaldırılsın PO; "canlı 1" DB-teyit gerek |
| :57-62 (E7) | Öğrenme yolculuğu tamamlanma görünürlüğü (yönetici göremiyor) | TUR-1'de var: T1-A madde 34 | ✅ YAPILDI | ⚠️ ARADAN KAPANMIŞ: `tam-belge-taramasi:57` "`adminController.ts:311-335` var" + T1-A madde 34 ✅. NİYET: retention/takip; O gün yoktu, STK admin'e eklendi |
| :66-77 | ÖZET öncelik tablosu (7 eksik boy/migration/aciliyet) | NUMARASIZ (özet) | 📌 not | E2 🔴 yüksek · E1 🟡 değer · E5/E4/E3/E7/E6 🟢 |

### 1.C — tam-belge-taramasi-2026-08-23 (42 belge, F.1/F.2 kaynağı)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :24 (G1) | `updateUser` (+2 kardeş) `select`siz → password hash+PII sızıntısı | TUR-1'de var: T1-A madde 38(G1) | ✅ YAPILDI | ⭐ KOD-TEYİT (bu tur): `userController.ts:280` `select: USER_FULL_SELECT` + `db.ts:52` global `omit:{user:{password:true}}`. NİYET: PII/hash sızmasın; ARADAN KAPANMIŞ (madde 38 `b4b6d66`) |
| :25 (G2) | `hardDeleteUser` Meeting/Feedback FK non-null → transaction rollback (KVKK silme çalışmıyor) | TUR-1'de var: T1-A madde 39(G2)/93+39(96) | ✅ YAPILDI | ⭐ KOD-TEYİT: `gdprService.ts:128-171` `anonymizeUser` tam anonimleştirme (madde 93/96 (c) yolu; Meeting/Message/Feedback serbest-metin `updateMany` ile temizlenir). hardDelete→anonymize'e YÖNLENDİRİLDİ (T1-A Ç1/#54 CANLIDA) |
| :26 (G3) | `listSuspicionReports` `select`siz → reporter PII maskesiz | TUR-1'de var: T1-A madde 68(G3) | ✅ YAPILDI | ⭐ KOD-TEYİT: `platformController.ts:404-423` `findMany`+`maskName(reporterName)`+`maskContact(contact)`. ARADAN KAPANMIŞ (madde 68 `#51`) |
| :31 (T1) | Zod validation hata yanıtında `message` yok → generic "Hata" | TUR-1'de var: T1-A madde 69(T1) | ✅ YAPILDI | T1-A madde 69 ✅ `firstValidationMessage` #51 |
| :32 (T2) | adaptive-test `progress` döndürmüyor | TUR-1'de var: T1-A madde 70(T2) | ✅ YAPILDI | T1-A madde 70 ✅ #51 backend+çatı#114 FE guard |
| :33 (T3) | `SuspicionReport`'ta `tenantId` yok → tenant-izolasyon boşluğu | TUR-1'de var: T1-A madde 71(T3) | ⬜ AÇIK | ⭐ KOD-TEYİT: `schema.prisma:1168-1180` model SuspicionReport → `tenantId` alanı YOK (tenantName String var, tenantId yok). NİYET: tenant izolasyonu; DURDU: rapor global; **S1 güvenlik AÇIK** |
| :34 (T4) | Sertifika baraj "0 puan" yalnız isRedLine'da — tüm sorularda mı kararı yok | TUR-1'de var: T1-A madde 72(T4) | ❓ TEYİT GEREK | `certification.service.ts:67`; verilmemiş-karar; NİYET: baraj kuralı; DURDU: PO kapsam kararı |
| :35 (T5) | `seed-certification.ts` hiçbir runner/npm-script'e bağlı değil → 20-banka güvenli taşıma yok | TUR-1'de var: T1-A madde 73(T5) | ⬜ AÇIK | ⭐ KOD-TEYİT: `package.json`'da `seed-certification`/`seedCertification` referansı YOK (grep boş). NİYET: canlıya güvenli seed; DURDU: runner yazılmadı, madde 30'u bloklar |
| :36 (T6) | `superAdminRoutes` mount ama FE 0 kullanım → paralel/ölü 2. platform-admin API | TUR-1'de var: T1-A madde 74(T6) | ❓ TEYİT GEREK | `server.ts:12,105`; NİYET: platform admin; DURDU: `/platform/*` ikame etti, konsolidasyon PO |
| :37 (T7) | Mentör görünürlük opt-in FE bağlı değil (backend `setVisibilityOptIn` var) | TUR-1'de var: T1-A madde 75(T7) | ⬜ AÇIK | NİYET: "görünür olmak için rıza" kapısı (temel iş kuralı); DURDU: FE ekranı yazılmadı |
| :38 (T8) | Sıfırdan manuel eşleştirme: envanter "eksik" ↔ strateji "YASAK" çelişki | TUR-1'de var: T1-A madde 76(T8)/Ç5 | ⬜ AÇIK (PO) | `stk-panel-envanteri:71,148`↔`stk-strateji:67`; kodda `assign/manualMatch` yok; NİYET: çelişkili; DURDU: PO kararı (K5-soru 8) |
| :39 (T9) | Platform tek-kullanıcı drill-down endpoint yok | TUR-1'de var: T1-A madde 77(T9) | ⬜ AÇIK | `platform.ts` üye-listesi var, `/users/:userId` yok; NİYET: 3. seviye drill; DURUŞ SEBEBİ YOK |
| :40 (T10) | Mentör emeği görünür kılma (takdir/rozet/"yılın mentörü") | TUR-1'de var: T1-A madde 78(T10) | ⬜ AÇIK | `mentor-persona:83-86,98`; NİYET: mentör takdiri (persona-kaynaklı); DURDU: hiç yok, kod YOK |
| :55 | Kesif belgeleri bayat: A1-A4/A7 panel·listUsers sayfalama·foto·B11 logout·2 IDOR·rewardPenalty·iceBreaker | TUR-1'de var: T1-B3 (aradan kapanmış küme) | ✅ YAPILDI | belge-hijyen: bayat not adayları; kod TAM |
| :57 | Kod-denetimi bayat: K2 OAuth·drill-down·lastLoginAt·KPI drill·nudge·mail sağlık·anomali·checkpoint-cron·soru-düzenle·yolculuk-görünürlük | TUR-1'de var: T1-B3 ⭐ARADAN | ✅ YAPILDI | hepsi kod-kanıtlı; F.1/F.2 bayat-not adayları |
| :59 | Konu bayat: DISC çoklu-harf·format-enum·timezone·Tenant.plan/limits(kısmen)·kullanıcı-hard-delete | TUR-1'de var: T1-B2 BH1-5 | ✅/🟡 | DISC harf ✅; `Tenant.plan/limits` şema var uygulama-mantığı yok (kısmen bayat) |
| :64 | icerik/ 6 belge KÖKTEN BAYAT — var-olmayan `seed-questions.ts`'e dayanıyor (#45'te silindi); gerçek `seed.ts` 32 üretir | TUR-1'de var: T1-A madde 45 | ⬜ AÇIK (belge-hijyen) | KOD DIŞI (belge-hijyen); ⚠️ GÜNCELLEME notu gerek; "canlı 20/5/1" iddiaları DB-teyit gerek (Y6) |
| :66 | Öğrenme yolculuğu içeriği kodda TAM (13 aşama); sertifika 20-banka kodda MEVCUT — eksik yalnız canlı taşıma | madde 30 | 🟡 YARIM | `seed-learning-journey.ts` TAM; `seed-certification.ts` var; DURDU: canlı seed (T5) |
| :71 | MADDE 67 (🍪 çerez-izni bandı) VAR — 10-yol:146; analytics #56 ön-koşulu | TUR-1'de var: T1-A madde 67 | ⬜ AÇIK | `10-yol:146` tanımlı; şüphe giderildi; en yüksek madde=67 |
| :77 | SONRAKİ TUR TEYİT: N+1·pagination·Zod-middleware·a11y·DISC-WCAG·PLATFORM_ADMIN_EMAIL·onay-maili·KARAR6-tetik·maxMeetingsPerWeek·profile-completeness | madde 47/48/50/51-55/6/A14 | ❓ TEYİT GEREK | tarama-çıkarımı; kod açılmadı (o tur); çoğu 1.F/1.G ile örtüşür |

### 1.D — degerlendirme-test-soru-envanteri-2026-08-15 (6 sistem envanteri)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :24-31 | 6 değerlendirme sistemi (DISC·OCEAN-adapter·arketip·SJT·sertifika·öğrenme-yolculuğu) TAM kurulu | TUR-1'de var: T1-B2 03 | ✅ YAPILDI | dosya:satır kanıtlı; `schema.prisma`+servisler |
| :46-50 | DISC-tipine-özel adaptif yaklaşım YOK (yaklaşım genel öğretiliyor) | =E1 / madde 31 | 🔵 AÇIK | ≡ 1.B E1; NİYET: ürün vaadi çekirdeği; DURDU: PO+içerik |
| :48 | `isCertified` yalnız sertifika sınavıyla set (SJT ile bağlı değil, ayrı modeller) | NUMARASIZ | ✅ YAPILDI | `certification.service.ts:234`; doğru-çalışıyor |
| :50 | Belge-kod çelişkisi Mini Akademi 4 SJT ↔ kod 3 | =E4 / Ç4 | ⬜ AÇIK (PO) | ≡ 1.B E4 |
| :58-64 | Yönetici müdahale: DISC kilitli·STK-custom düzenle backend-var-UI-yok·sertifika aç/kapa | TUR-1'de var: T1-A madde 32 | 🟡→✅ | STK-custom düzenle UI o gün yoktu→sonra bağlandı (E5 ✅); tenant izolasyon GÜÇLÜ (`questionController.ts:132-134`) |
| :72 | Yönetici DISC soru metnini GÖRÜR (salt-okuma) | NUMARASIZ | ✅ YAPILDI | `questions/page.tsx:77-78`; KVKK-uyumlu (içerik, cevap değil) |
| :74 | Yönetici bireysel cevapları GÖRMEZ (UserResponse admin endpoint yok) | NUMARASIZ | ✅ YAPILDI | S1-KVKK; `adminController.ts:231` "discVector/selfProfile/temperamentJson hariç"; ham vektör dönmez |
| :76 | Yönetici ham `discVector` GÖRMEZ (kasıtlı) | TUR-1'de var: T1-B2 04:44-48 / madde 1 | ✅ YAPILDI | S1-KVKK; `adminController.ts:231,253-259`; discVisibility deseni |
| :78 | Öğrenme yolculuğu tamamlanma yönetici GÖRMEZ (o gün) | =E7 / madde 34 | ✅ YAPILDI | ⚠️ ARADAN KAPANMIŞ (E7 ✅ STK admin) |
| :80 | ⚠️ KVKK değerlendirmesi: tasarım UYUMLU (ham DISC görmez, işlenmiş sonuç görür) | NUMARASIZ | ✅ YAPILDI (not) | KOD DIŞI (KVKK-değerlendirme); risk minimal beyanı |
| :90-94 | Soru/cevap envanteri: DISC 16CORE+4DEEP·sertifika 20·SJT 3·yolculuk 13·STK-custom 0 | TUR-1'de var: Ç3/Ç4 | ⬜/❓ | SJT 3 kod-teyitli; DISC "20/canlı" DB-teyit gerek (Ç3); STK-custom 0 (b-boş) |
| :102-107 | EKSİKLER 6 (≡E1-E6) | =1.B | ⬜/✅ | ≡ 1.B (aynı rapor derinleştirmesi) |
| :112-116 | AÇIK SORULAR 5 (DISC-yaklaşım·SJT·STK-custom·soru-düzenle·yolculuk-görünürlük) | =1.B PO | ❓/✅ | soru-düzenle+yolculuk ARADAN ✅; DISC-yaklaşım/SJT/STK-custom açık |

### 1.E — kvkk-veri-aktarim-envanteri-2026-08-25 (hukuki paket kaynağı, SEVİYE-1)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :5 | ⚠️ GÜNCELLEME: sunucu ülkesi Londra/BK (eu-west-2), İrlanda HATALIYDI, BK AB DEĞİL | TUR-1'de var: T1-A madde 92/Ç6 | ✅ YAPILDI | madde 92 ✅ PO teyitli; C-1 satırları o günün çelişki fotoğrafı |
| :12-15 | ⚡ Barındırma+3.taraf+çerez+6 kritik uyum-boşluğu özeti | NUMARASIZ (özet) | KOD DIŞI (KVKK-hukuk) | aşağıdaki C-satırları |
| :22 | Neon bölge çelişkisi (CLAUDE.md eu-west-2/İrlanda coğrafi tutarsız) → PO konsoldan doğrulayacak | madde 92 ilişkili | ❓ TEYİT GEREK (PO) | KOD DIŞI; [PO DOLDURACAK]; Londra teyidiyle kısmen çözüldü |
| :23 | Dokploy sunucu konumu kodda ipucu yok | NUMARASIZ | ❓ TEYİT GEREK (PO) | KOD DIŞI (altyapı); [PO DOLDURACAK] |
| :29-31 | 3.taraf: SMTP e-posta·Google OAuth·LinkedIn OAuth (giden/gelen PII) | NUMARASIZ | ✅ YAPILDI (envanter) | dosya:satır kanıtlı; aktarım gerçeği |
| :32 | Analytics (GTM/GA4/Clarity) kodda YOK (#110 kilitli "MERGE ETME") | TUR-1'de var: T1-A madde 56 | ⬜ AÇIK | grep boş; KVKK ön-koşul (#67/#56); DURDU: #110 kilitli |
| :33 | LLM/AI ÖLÜ (`llmRetry.ts` çağıranı yok, içerik dışarı gitmiyor) | =1.A llmRetry / madde 44 | ⬜ AÇIK (❓terk) | `llmRetry.ts:4-5`; ölü-kod (aynı D2) |
| :41-42 (C-3) | 2 zorunlu oturum çerezi (`mm_refresh` 7g·`platform_token` 1s), rıza istemez | NUMARASIZ | ✅ YAPILDI (envanter) | `authController.ts:55`; `platformController.ts:13-20`; çerez politikası temeli |
| :45 | Analytics çerezi YOK (#110 merge→`_ga`/`_gid`/`_clck` rıza gerektirir) | madde 67/56 | ⬜ AÇIK | çerez-izni bandı ön-koşulu |
| :53-58 (C-4) | Veri kategorileri (kimlik/iletişim/profil/⭐psikometrik/mesaj/davranışsal/kurumsal) schema:satır | NUMARASIZ | ✅ YAPILDI (envanter) | hukuki paket girdisi |
| :58 [HUKUKÇU 1] | DISC/OCEAN/psikometrik Md.6 özel nitelikli mi (kod "hassas" işaretliyor, Md.6 hukukçu) | madde 83 ilişkili | ❓ TEYİT GEREK (hukuk) | KOD DIŞI (hukuk); `gdprService.ts:16-20` mühendislik sınıflaması |
| :63-68 (C-5) | Saklama: SystemLog 90g imha VAR·FeedbackLog süresiz·Message süresiz(hardDelete'te bile)·token purge yok | TUR-1'de var: T1-A madde 81/99 | ⬜ AÇIK | `gdprService.ts:262` cron; NİYET: KVKK otomatik imha; DURDU: yalnız SystemLog, mesaj/feedback süresiz |
| :70 | `hardDeleteUser` FK RESTRICT → transaction patlar (madde 39) | =G2 / madde 39 | ✅ YAPILDI | ⭐ KOD-TEYİT: anonymize'e yönlendirildi (G2 ✅); hardDelete artık ana yol değil |
| :71 | `anonymizeUser` User PII+UserResponse temizler; Message/Feedback serbest-metin O GÜN kalıyordu | madde 93/96 | ✅ YAPILDI | ⭐ KOD-TEYİT: `gdprService.ts:132-165` ARTIK Message.content+Feedback keyLearnings/specificComments+meeting notes `updateMany` ile temizleniyor (madde 96 (c)). Rapor 📸 bayat; kod ilerledi |
| :72 | Ghost-red 30 gün uyku modu backend'de YOK (yalnız tasarım) | TUR-1'de var: T1-A madde 35/A8 | 🔵 AÇIK (tasarım) | grep boş; NİYET: 30-gün geri-alınabilir red; DURDU: migration+cron, PO onaylı tur |
| :79 (C-6) | OAuth ekranda ayrı onay kutusu YOK — implicit `kvkkConsentAt` set ("OAuth=rıza" varsayımı) | TUR-1'de var: T1-A madde 83 | ❓ TEYİT GEREK (hukuk) | `oauthService.ts:112`; NİYET: açık rıza; DURDU: UI'da alınmıyor, hukukçu |
| :80 | DISC testi başlangıcında hiçbir KVKK/rıza gösterimi yok | madde 83/85 ilişkili | ⬜ AÇIK | `disc-test/page.tsx` grep boş; psikometrik toplama noktasında ayrı aydınlatma yok |
| :82 (a) | KVKK+18+ TEK kutuda birleşik (self-serve'de 18+ ibaresi bile yok) | TUR-1'de var: T1-A madde 83 | ⬜ AÇIK | `_RegisterContent.tsx:414-415`; hukukçu |
| :82 (b) | Aydınlatma ≠ açık rıza ayrı DEĞİL (tek checkbox) [HUKUKÇU 2] | madde 83 | ❓ TEYİT GEREK (hukuk) | KOD DIŞI (hukuk) |
| :82 (c) | Consent SÜRÜMÜ tutulmuyor (`consentVersion`/`policyVersion` yok, yalnız zaman damgası) → ispat açığı | TUR-1'de var: T1-A madde 82 | ⬜ AÇIK | ⭐ KOD-TEYİT: `consentVersion` grep boş (schema/kod); NİYET: rıza ispatı; DURDU: yalnız `kvkkConsentAt` |
| :87-91 (C-7) | Beyan↔kod çelişkisi: gizlilik "silme/anonimleştirme" ↔ Message/Feedback silinmiyor; kvkk eksik kategoriler; terms 18+ doğrulama yok | madde 85/97 ilişkili | 🟡 YARIM | ⚠️ #1 çelişki KISMEN çözüldü (anonymize artık Message temizliyor); #3 eksik-kategori + #5 yaş-doğrulama AÇIK |
| :94 (C-8) | KVKK backend endpoint VAR (`POST anonymize`·`DELETE hard-delete`·`GET export`) — ADMIN-only | TUR-1'de var: T1-A madde 40 | ✅ YAPILDI (backend) | `userRoutes.ts:167-185`; backend hazır |
| :95 | FE ekranı YOK — kullanıcı kendi verisini export/silme talep edemiyor | TUR-1'de var: T1-A madde 40/97 | ⬜ AÇIK | ⭐ KOD-TEYİT: `frontend/src/app` altında gizlilik/kvkk/terms sayfa var ama hard-delete/anonymize/export FE-çağrısı YOK (grep boş). NİYET: KVKK Md.11 kullanıcı-yüzü; DURDU: FE 0 |
| :96 | `destek@` config'te TANIMSIZ (yalnız `admin@platform.local` placeholder) | TUR-1'de var: T1-A madde 84 | ⬜ AÇIK | `config.ts:31`; NİYET: başvuru kanalı; DURDU: PO env bağlayacak |
| :102-109 | 8 HUKUKÇUYA SORULACAK (özel-nitelik·aydınlatma·OAuth-rıza·yurtdışı-aktarım·18+·çerez·saklama·consent-sürüm) | madde 83/85/90/91 | ❓ TEYİT GEREK (hukuk) | KOD DIŞI (hukuk); belge paketine taşınacak |
| :112 | [PO DOLDURACAK]: Neon bölge·Dokploy ülke·veri sorumlusu MERSİS/KEP·VERBİS·destek@·önceki hukukçu | madde 84/90 | ❓ TEYİT GEREK (PO) | KOD DIŞI |
| :115 | BİLİNEN UYUM BOŞLUKLARI (11 dürüst madde) | TUR-1'de var: T1-A madde 40/81/82/83/84/85/91 | ⬜ AÇIK | özet; hepsi numaralı/açık |

### 1.F — proje-analizi-kapsamli-denetim-2026-08-22 (6 eksenli teknik denetim)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :24 | Backend-tam FE-yok ~14 (en görünür KVKK üçlü + mentör opt-in) | =madde 40/75 | ⬜ AÇIK | ≡ 1.C/1.E; backend hazır FE 0 |
| :26/:83-91 | 🔴[YÜKSEK] `updateUser` password+PII sızıntısı `userController.ts:272-277` | =G1 / madde 38 | ✅ YAPILDI | ⭐ KOD-TEYİT: `select: USER_FULL_SELECT` + global omit (bkz. 1.C G1); ARADAN KAPANMIŞ |
| :25/:105-108 | 🔴[YÜKSEK] `hardDeleteUser` FK ihlali patlar (KVKK silme çalışmaz) `gdprService.ts:145-178` | =G2 / madde 39 | ✅ YAPILDI | ⭐ KOD-TEYİT: anonymize'e yönlendirme (madde 96 CANLIDA); kod-yorumu artık `updateMany` ile temizliyor |
| :93 | 🔵[DÜŞÜK] OAuth accessToken URL query'de (Referer/log riski) | NUMARASIZ | ❓ TEYİT GEREK | `authController.ts:655-659`; token kısa-ömür(1s)+FE-memory; üretim-öncesi kabul edilebilir; T1-A'da net numara yok |
| :96 | 🔵[DÜŞÜK] `createMeeting` oryantasyon kilidi tenant-scope'suz `findUnique` | NUMARASIZ | ❓ TEYİT GEREK | `meetingController.ts:78-91`; PII/yazma yok; tutarlılık için tenantId eklenmeli; T1-A'da yok |
| :106/:110 | 🔴[YÜKSEK] onDelete stratejisi tanımsız (çoğu FK RESTRICT); staleDraftCleanup dolu tenant silemiyor | madde 49 ilişkili | ⬜ AÇIK | `schema.prisma` geneli; NİYET: silme bütünlüğü; DURDU: nullable+SetNull kararı verilmedi (madde 16 v2 tenant hard-delete ile ilişkili) |
| :113-116 | 🟡[ORTA] Konuşma listesi N+1 (2N+1) + pagination'sız listeler (`take` yok) | TUR-1'de var: T1-A madde 48 | ⬜ AÇIK | `conversationController.ts:236`; NİYET: perf; DURDU: madde 48 DB-perf borcu |
| :119-120 | 🟡[ORTA] String-tabanlı enum adayları (UserReport/InvitationTemplate/Tenant/MeetingCheckIn/MentorshipAgreement) | TUR-1'de var: T1-A madde 49 | ⬜ AÇIK | `schema.prisma`; NİYET: DB bütünlük; DURDU: madde 49 (string→enum) |
| :122-123 | 🟡[ORTA] Çift rol kaynağı `User.role`+`User.tenantId` ↔ `TenantMembership.role` | TUR-1'de var: T1-A madde 49 | ❓ TEYİT GEREK | S1-veri; CLAUDE.md "Membership.role esas"; NİYET: legacy mi terk mi netleşmeli; DURUŞ SEBEBİ YOK (çift-kaynak adayı) |
| :126 | 🔵[DÜŞÜK] `User.email` global unique (multi-tenant çakışma?)·Meeting index eksik·migrate diff | NUMARASIZ | ❓ TEYİT GEREK | DOĞRULANMALI (kasıtlı global-user olabilir); T1-A'da yok |
| :135 | 🔴a11y[Yüksek] `ReportUserButton` modal role/aria-modal/Escape/focus-trap yok | TUR-1'de var: T1-A madde 50 | ⬜ AÇIK | `ReportUserButton.tsx:57-61`; NİYET: a11y; DURDU: madde 50 (a11y noktasal) |
| :136 | 🔴a11y[Yüksek] Soru yönetimi formu select/textarea label'sız | TUR-1'de var: T1-A madde 50 | ⬜ AÇIK | `admin/questions/page.tsx:133-166` |
| :137-139 | 🟡a11y[Orta] MeetingScheduler Field·DailyQuestionWidget radiogroup·ContextualFeedbackHost dialog | madde 50 | ⬜ AÇIK | MeetingScheduler aynı zamanda ölü (§6) |
| :153 | 🔴 Zod doğrulama-hata bloğu ~85 yerde kopya (30 dosya) | TUR-1'de var: T1-A madde 47 | ⬜ AÇIK | NİYET: DRY/temiz-kod; DURDU: madde 47 (validate() middleware) |
| :154 | 🔴 Refresh-token/cookie helper 2 controller'da duplike (güvenlik-hassas) | TUR-1'de var: T1-A madde 47 | ⬜ AÇIK | `authController.ts:54-103`↔`selfServeController.ts:12-36`; madde 47 (cookie helper duplike) |
| :157-159 | 🟡 100+ satır handler'lar·ağır Prisma controller'da·PII-select 11+ yerde elle | madde 47/48 | ⬜ AÇIK | temiz-kod borcu; `USER_CONTACT_SELECT` önerisi |
| :162 | 🔵 NPS/slug/DISC-renk dağınık·yorum-bloğu eski kod 4 dosya·matching 4 any | madde 45/47 | ⬜ AÇIK | düşük; DISC-renk `lib/constants/disc.ts`'e topla |
| :173-175 | 🔴 Kesin-ölü: llmRetry·TenantContext(ikiz)·MeetingScheduler(231 satır) | TUR-1'de var: T1-A madde 44 | ⬜ AÇIK (sil-PO) | NİYET: (llmRetry LLM-retry·TenantContext canonical-ikiz·MeetingScheduler inline-kopya); DURDU: sil PO kararı |
| :180-184 | 🟡 Yarım-özellik: matchingInterface·sector-scorer·profile-completeness+ProfileStrengthCard·ContextualFeedback küme·TenantSwitcher | TUR-1'de var: T1-A madde 45 | 🔵/⬜ | NİYET: (JOB_LISTING·v2#14·profil-güç·bağlamsal-feedback·çok-kurum); DURDU: bağlanmadı (araştır, silme niyeti-yok-eder) |
| :187 | 🔵 5× kullanılmayan `@radix-ui/*` (0 import) | TUR-1'de var: T1-A madde 46 | ⬜ AÇIK | build yeşil kalmalı (DOĞRULANMALI); madde 46 |
| :188 | seed-certification/seed-learning-journey package.json script'te değil | =T5 / madde 30/73 | ⬜ AÇIK | ≡ 1.C T5 (cert seed runner yok) |
| :198-206 | ÖNCELİKLİ AKSİYON 8 (updateUser·hardDelete·KVKK-FE·opt-in·Zod-middleware·a11y·super-admin·N+1) | özet | ⬜/✅ | updateUser+hardDelete ✅ ARADAN; kalanı açık |
| :225 | Belge senkron notu: salt-okuma, 09/00 güncellenmedi | NUMARASIZ | 📌 not | belge-hijyen |

### 1.G — tam-envanter-gercek-durum-2026-08-19 (3 eksenli, iş-sayısı hikayesi)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :32 (D1) | `findMatchesDueForCheckpoint` ölü (0 çağrı) | TUR-1'de var: T1-A D1 | ✅ YAPILDI | ⚠️ ARADAN: `tam-belge-taramasi:57` "cron'a bağlı `cronScheduler.ts:359` LOG-ONLY"; T1-A D1 ✅🔀. O gün ölüydü, sonra bağlandı |
| :33 (D2) | `llmRetry.ts` ölü (0 import, matchReason.ts yok) | =madde 44 / D2 | ⬜ AÇIK (❓terk) | ≡ 1.A/1.E; NİYET: LLM retry; DURDU: LLM kaldırıldı; sil-PO |
| :34 (D3) | `UserProfile.qualityMultiplier` ikiz alan atıl (canlı `TenantMembership.qualityMultiplier`) | TUR-1'de var: T1-A D3 | ❓ TEYİT GEREK | `schema.prisma:970`; NİYET: kalite çarpanı; DURDU: Membership'e taşındı, ikiz atıl (DROP migration→PO) |
| :36-37 | D2 belge-disiplini boşluğu: llmRetry 2 denetimde işaretlenip 8+ gün çözülmemiş (tespit→aksiyon kopukluğu) | NUMARASIZ | 📌 not | KOD DIŞI (süreç-gözlemi); karar-takip disiplininin gerekçesi |
| :43 (U1) | `sector-scorer.service.ts` uyuyan (5-bileşen, staging gerekir) | TUR-1'de var: T1-A madde 14 U1 | 🔵 ertelendi | NİYET: 5-bileşen sektör skoru; DURDU: staging şart, v2#14; canlı Jaccard kullanıyor |
| :44 (U2) | `matchingInterface.ts` uyuyan (JOB_LISTING şablonu) | TUR-1'de var: T1-A U2 | 🔵 ertelendi | NİYET: gelecek iş-ilanı eşleştirmesi; DURDU: bilinçli şablon |
| :50-51 | Feedback `engagement/goalClarity/periodic*` şema-var-yazan-yok (yarım özellik) | =1.A :31 / madde 7 | 🟡 YARIM | `schema.prisma:589-590`; ≡ 1.A; NİYET: #7 dönemsel metrik; DURDU: form yazmıyor (Aşama 3) |
| :54 | engagement/goalClarity KASITLI menti-gizleme (doğru gizlilik) ama hiç YAZILMIYOR | NUMARASIZ | 🟡 YARIM | gizleme doğru; yazım eksik → arka-uçta tanımlı ön-uçta toplanmıyor |
| :60-65 (F1-F6) | FE ölü zincir: getPairSignal·listMentors·agreements.create·questions.unhide·ContextualFeedbackHost·MeetingProvider | TUR-1'de var: T1-A 💀 F1/F5/F6 | ⬜ AÇIK | NİYET: (F5/F6 bağlamsal-feedback `payload.tags` backend-şema-yok yüzünden bağlanmadı — yarım); DURDU: sil/bağla |
| :73 | `GET /meetings/pair-signal` öksüz endpoint (backend var FE yok) | =F1 | ⬜ AÇIK | #7 kümesi |
| :79-82 | Eski hayalet envanteri güncel mi: iceBreaker temiz✅·sector-scorer hâlâ·llmRetry hâlâ·qualityMultiplier ikiz sürüyor | TUR-1'de var: T1-A | ✅/⬜ | iceBreaker silinmiş; kalanı sürüyor |
| :94 (A1) | K4 18+ yaş doğrulama: `birthDate`/`age`/`birthYear` şemada YOK | TUR-1'de var: T1-A K4/madde 3 | ⬜ AÇIK | ⭐ KOD-TEYİT: `birthDate`/`birthYear` grep boş. NİYET: 18+ doğrulama; DURDU: metin var/veri-katmanı-yok (nüans: madde 3 öz-beyan ✅, form-input yok) |
| :95 (A2) | K6 admin server-side guard yok | =K6 / madde 66 | ⬜ AÇIK | ≡ 1.A :32; client-side only |
| :96 (A3) | K3 eski-kayıt consent politikası yok | TUR-1'de var: T1-A K3 | ⬜ AÇIK (PO) | backfill/trigger kodu yok; NİYET: eski-kayıt rıza; DURDU: ⏸️EN SON, PO |
| :97 (A4) | Soru cevap-tipi (şıklı/açık) şema alanı yok, migration gerekir, atlandı | TUR-1'de var: T1-A madde 13 | ⬜ AÇIK | NİYET: soru esnekliği; DURDU: kapsam belirsiz→PO, migration; ⏸️ERTELENDİ |
| :98 (A5) | Sertifika 20-banka canlı seed yok | =madde 30 | ⬜ AÇIK | ≡ 1.B E2 |
| :99 (A6) | DISC-tipine yaklaşım içeriği (3 seçenek, kod yok) | =madde 31 | 🔵 AÇIK | ≡ 1.B E1 |
| :100 (A7) | Bekleme salonu bildirim izni (`Notification.requestPermission`) yok | TUR-1'de var: T1-B3 :101 | ⬜ AÇIK | NİYET: bekleme UX ("en kritik"); DURDU: bekleme salonu var, izin-istemi kodu yok; T1-A'da net numara yok |
| :101 (A8) | Gerçek push (Expo/FCM) stub `sent:true` | TUR-1'de var: T1-A madde 23 | ⬜ AÇIK (bilinçli) | `notificationService.ts` TODO; v2#23; in-app/mail idare |
| :102 (A9) | Sektör/etiket havuzu admin-yönetilir tablo yok (seed'de etiket var) | TUR-1'de var: T1-B2 KARAR 12 | ⬜ AÇIK (PO) | NİYET: standart havuz (eşleştirme girdisi); DURDU: tablo yok, PO |
| :108 (B1) | ⭐ K2 OAuth `kvkkConsentAt` SET EDİYOR — belge yanılıyor, kod TAM | TUR-1'de var: T1-A madde 2 | ✅ YAPILDI | `oauthService.ts:112`; en büyük "sürpriz"; ARADAN KAPANMIŞ |
| :109-110 (B2/B3) | F7 KPI drill-down·durum rozeti/ThemeToggle zaten var (belge geç güncellenmiş) | TUR-1'de var: T1-A madde 5/10 | ✅ YAPILDI | bayat-roadmap |
| :116 (C1) | Öğrenme-yolculuğu görünürlük YARIM: platform görür, STK admin görmüyordu | =E7 / madde 34 | ✅ YAPILDI | ⚠️ ARADAN: STK admin'e eklendi (E7 ✅ `adminController.ts:311-335`) |
| :117-122 (C2-C6) | Havuz kartı FE·onay maili kurum·ölü-seed·feedback yarım·sektör skoru — YARIM | madde 6/30/14/45 | 🟡 YARIM | C3 onay-maili kurum kısmı açık (madde 6); C6 sektör v2#14 |
| :130-160 (Eksen3) | İş sayısı 84-94→34→28: "84→34" belgesel kanıt YOK (sözlü); "34→28" belgede NET; 28 kesin (v1 13+v2 15) | NUMARASIZ | 📌 not | KOD DIŞI (sayım-arkeoloji); `devir/08:46-58`; belge-disiplini boşluğu bulgusu |
| :217 | Ölü kod özeti: 3 kesin (D1/D2/F-zinciri) + şema-yarım (D3/engagement) + 1 öksüz (pair-signal) + 2 uyuyan (bilinçli) | =madde 44/45 | ⬜ AÇIK | D1 aradan bağlandı; kalanı açık |
| :218 | En büyük sürpriz K2 OAuth TAM; en büyük boşluk "84→34" belgesel kanıt yok | NUMARASIZ | 📌 not | özet |

### 1.H — strateji-gercek-denetimi-2026-08-20 (5 persona, 85 madde)

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| B.1:70-84 | MENTİ 13: aha-kartı·keşif-havuzu·uyum-skoru·yolculuk·ilişkilerim·boş-havuz·niyet-mektubu·sektör-gösterim TAM (8✅) | NUMARASIZ | ✅ YAPILDI | dosya:satır kanıtlı; ürün vaadi büyük ölçüde canlı |
| B.1:75-76 (m6/m7) | Bekleme anı YARIM — öğrenme+DISC-derinleştirme VAR ama bekleme ekranına konumlandırılmamış | Y1 (D.1) | 🟡 YARIM | `menti/page.tsx` yalnız `!needsDiscTest` iken LearningJourneyCard; NİYET: "bekleme=ölüm noktası" retention; DURDU: içerik var, bekleme anına bağlanmadı; öneri S |
| B.1:77 (m8) | Bekleme umut sinyali UYUMSUZ — yalnız mentör-sayısı, peer-count/"yakında eşleşeceksin" YOK | Y1 | ⬜ AÇIK | `menti/page.tsx:172-191`; öz-grep boş; NİYET: sosyal-kanıt/umut; DURDU: statik mesaj |
| B.1:79 (m10) | Reddi yumuşatma "3 alternatif" HİÇ YOK | Y2 | ⬜ AÇIK | mentör→menti ret akışı yok; NİYET: P3 "yetersizim hissi"ni önle; DURDU: ürün kararı gerekli (M), önce PO |
| B.1:80 (m11) | Küçük başarı kutlaması (ilk görüşme/aşama) HİÇ YOK | Y2 | ⬜ AÇIK | konfeti yalnız DISC aha; NİYET: P4 ilerleme hissi; DURDU: kod yok |
| B.1:82 (m13) | Menti bildirimleri arka planda (notificationService tetik var, gönderim stub) | =37m / madde 23 | 🟠 ARKA-PLAN (⬜) | `notificationService.ts:59-93`; NİYET: cesaret-verici bildirim; DURDU: gönderim stub (37m mail), FE bildirim-merkezi yok |
| B.1:83 (m14) | Sektör mentör-bulma gösterim VAR, filtre/daraltma UI yok | NUMARASIZ | 🟡 YARIM | `menti/page.tsx:264`; NİYET: sektör bulma; DURDU: yalnız gösterim+sıralama; öneri S |
| B.2:92-105 | MENTÖR 14: ilk-aha·DISC-hediye·paylaşılabilir·gelen-ilgi·aktif-ilişki·etki·seçicilik·müsaitlik·uyum-göstergesi TAM (9✅) | NUMARASIZ | ✅ YAPILDI | dosya:satır kanıtlı |
| B.2:93-94 (mn2/mn3) | ⭐ ÖZ-DOĞRULAMA DÜZELTMESİ: DISC hediye-kartı + LinkedIn/WhatsApp paylaşım "YOK" sanıldı → kod okundu VAR (tüm rollere) | NUMARASIZ | ✅ YAPILDI | `ResultStep.tsx:16-51,59-147` rol-gate yok; alt-ajan hatası öz-grep'le düzeltildi |
| B.2:97 (mn6) | Mentör "etki" metriği kısmi — NPS var, "toplam saat" YOK | NUMARASIZ | 🟡 YARIM | `mentorMetricsController.ts:26-54`; NİYET: emek görünürlüğü; DURDU: saat metriği eksik; öneri S |
| B.2:99 (mn8) | Emeği görünür kıl — sertifika VAR ama "yılın mentörü"/rozet-çeşitliliği YOK | =T10 / madde 78 | ⬜ AÇIK (PO) | `certification/page.tsx:178`; NİYET: P4 takdir çeşitliliği; DURDU: tek sertifika rozeti; PO |
| B.2:102 (mn11) | Mentör kapasite sınırı (kaç menti) HİÇ YOK | Y5 (D.1) | ⬜ AÇIK (PO) | yalnız `Tenant.maxMeetingsPerWeek` (tenant-bazlı); NİYET: mentör aşırı-yük önleme; DURDU: mentör-bazlı alan yok; PO, canlı-sonrası olabilir |
| B.2:103 (mn12) | Mentör sektör filtresi UYUMSUZ — filtre var ama `minCompatibilityScore`+`blockedDiscTypes`, sektör değil | NUMARASIZ | 🟡 YARIM | `mentorFilterController.ts`; NİYET: kendi alanından menti; DURDU: sektör scoring'de %60 var ama açık filtre yok; öneri S |
| B.2:104/98 (mn13/mn7) | Mentör ritim/ikinci-giriş bildirimi arka planda (mail 37m'e bağlı) | =37m | 🟠 ARKA-PLAN (⬜) | `nudgeService/notificationService/cronScheduler` var; gönderim kapalı |
| B.3:117-120 (S1) | STK aktif-üye ORAN·görüşme-ivme·haftalık-trend YOK; pasif-üye VAR | Y3/Y4 | 🟡/⬜ | `retentionMetrics.service.ts` pasif var; NİYET: "program yaşıyor mu"; DURDU: oran/ivme/trend KPI kartı yok |
| B.3:126-130 (S2) | STK boşluk/risk: mentörsüz-bekleyen·ölü-eşleşme·arz-talep·pasif-liste·onay-kuyruğu TAM VAR | NUMARASIZ | ✅ YAPILDI | `retentionMetrics.service.ts` titiz kurgu; drill-down |
| B.3:136-140 (S3) | STK kanıt/etki: görüşme-kümülatif·tamamlama-oran·ortalama-uyum YARIM; NPS VAR | Y3 | 🟡 YARIM | satır-bazlı var, özet oran/kart yok; Persona B/C zayıf |
| B.3:140 (S3-14) | Dönemsel/indirilebilir rapor (PDF/Excel/CSV) HİÇ YOK | Y3 (D.1) | ⬜ AÇIK | öz-grep 0 dosya; NİYET: "sponsora sun" kanıtı; DURDU: export endpoint/UI yok; **kritik canlı-öncesi (Persona B/C)** |
| B.3:147-148 (16/17) | Renk-kod VAR, ivme-oku YOK; proaktif kırmızı-alarm UYUMSUZ (nötr sayı kartları) | Y4 (D.1) | 🟡/⬜ | `pairSignal.service.ts` GREEN/YELLOW/RED; NİYET: "panel uyarmalı"; DURDU: eşik-tabanlı alarm yok; öneri S |
| B.3:156 (20) | Dürtme elle-VAR otomatik-YOK (KVKK rıza gerekçesiyle kapsam-dışı) | TUR-1'de var: T1-B3 | 🟡 YARIM | `adminController.ts:157-219` elle tam (24s cooldown+AUDIT); otomatik ⬜ PO+KVKK |
| B.3:159 (23) | Elle eşleştirme YOK (doğru şekilde — torpil önleme sınırı) | =T8 / madde 76 | ✅ YAPILDI (doğru-yok) | admin route'da manuel-pair endpoint yok; ⚠️ ÇELİŞKİ: envanter "eksik" der (T8/Ç5, PO) |
| B.3:166 (25) | Yol B ön-tanımlı davet OTOMATİK onay BELİRSİZ (kodda net değil) | TUR-1'de var: T1-A A14/KARAR6 | ❓ TEYİT GEREK | `selfServeController.ts:245` AUTO_APPROVED yalnız tenant-tier; üye-düzeyi davet-onay net değil; NİYET: davetle-gelen onaylı; DURDU: PO+keşif |
| B.4:184-187 (A) | PLATFORM büyüme: kurum/kullanıcı-sayı VAR; bu-ay-artış-ivme·aktif/pasif-oran YOK | Y7 | 🔴 AÇIK | `getPlatformStats` tarih-filtresi yok; NİYET: büyüme nabzı; DURDU: momentum hiç yok; düşük öncelik (platform=PO) |
| B.4:193-194 (B) | Sistem sağlığı (DB/mail/log) VAR; mail gerçek-probe değil env-config | NUMARASIZ | 🟡 YARIM | `getPlatformHealth`; mail probe eksik; öneri S |
| B.4:200-202 (C) | Kötüye-kullanım: anomali-tespit v1 VAR·şikayet-listesi VAR; yüzey "N dikkat" banner YARIM | NUMARASIZ | ✅/🟡 | `abuseDetection.service.ts:26-67` v1 basit; alarm-banner yok |
| B.4:210 (D-12) | Kurum→tek-kullanıcı→en-dibe drill YARIM (üye satırı tıklanamaz) | =T9 / madde 77 | 🟡 YARIM | `MembersTable` var, kullanıcı-detay-sayfa yok; NİYET: 3. seviye drill; DURDU: eksik |
| B.4:211/227 (D-13/F-19) | Kurum-içi-iniş LOGLANIR ama audit yanıt-SONRASI yazılıyor (belge "önce" ima); "AdminAuditLog" adı YANLIŞ→SystemLog | TUR-1'de var: T1-A madde 98 | ✅/❓ | `platformTenantController.ts:131`; NİYET: KVKK denetim izi; audit-önce riski düşük (madde 98 void fire-forget) |
| B.4:219 (D-16) | Kurum kalıcı silme (hard delete) HİÇ YOK (bilinçli, yalnız freeze) | TUR-1'de var: T1-A madde 16 v2 | ⬜ AÇIK (bilinçli) | freeze soft-var; NİYET: tenant hard-delete (KVKK Md.7); DURDU: v2, geri-alınamaz, PO |
| B.4:221 (D-18) | Platform seviyesi ayarlar UI HİÇ YOK (config env-sabit) | Y7 | 🔴 AÇIK | NİYET: eşik/mail/retention tuning; DURDU: düşük öncelik (platform=PO) |
| B.5:238-248 | ADMİN PANEL TASARIM: 6 panel (A1-A4/A7/A8) + oyunlaştırma + Match-persist + branding-XSS-guard TAMAMEN kodlanmış (10✅) | TUR-1'de var: T1-B2 05/ta | ✅ YAPILDI | `admin/eslesmeler·mentor-havuzu·menti-havuzu·sertifika-sonuclari·branding/page.tsx`; Match `schema.prisma:985` kalıcı; `isSafeLogoUrl:50` XSS. Bu belge ARŞİV ADAYI |
| B.5:246 (SEED) | Global DISC soruları + learning stages canlı Neon'da seed'li mi ❓ VERİ | Y6 / madde 30 | ❓ TEYİT GEREK (DB) | kod sağlam; `SELECT count` bu tur YOK (DB yasağı); DURDU: canlı sayım ayrı tur |
| B.5:248 (SEC) | Güvenlik: `requireRole('ADMIN')`+tenant-izolasyon+ham-DISC-vektör-ASLA tutarlı | TUR-1'de var: T1-B2 04 | ✅ YAPILDI | S1-KVKK; tüm admin route korumalı; discVector hariç |
| C:261-264 | 🟠 ARKA-PLAN küme: bildirim-tetik·kurum-bildirim·mentör-ritim·DISC-aha-panel-erişim (kök: mail 37m KAPALI) | =37m | 🟠 ARKA-PLAN (⬜) | NİYET: kullanıcıya çıkış; DURDU: `#37 FAZ3 GÖNDERİM KAPALI` (37m); ⭐ tek karar (mail-aç) tüm kümeyi çıkarır |
| D.1:276-305 (Y1-Y7) | 7 yeni karar: bekleme-anı·ret+kutlama·S3-export/oran·kırmızı-alarm·mentör-kapasite·global-seed·platform-metrik | TUR-1'de var: T1-A Y1-Y7 | ⬜ AÇIK | denetim işleri; öncelik PO |
| D.3:318-327 (a-i) | 9 cevaplanmamış soru (düzeltme-oto·düzeltme-sayı·düzeltme-not-geçmiş·ağırlık-iz·kim-değiştirir·9b-kontrol·ghost-veri·ghost-geri-al·yol-B) | TUR-1'de var: T1-A A9/A8/madde 95 | ❓/✅ | ağırlık-iz+kim-değiştirir ARADAN ✅ (madde 9a/95); ghost-red açık; yol-B ❓ |
| E.4:353 | `admin-panelleri-tasarim-2026-08-02` GÜÇLÜ ARŞİV ADAYI (6 panel uygulandı) | TUR-1'de var: T1-B3 arşiv | ⬜ AÇIK (PO-arşiv) | KOD DIŞI (belge-hijyen); "uygulandı" notuyla arşive; silme ASLA→PO |
| E.5:358-373 | ⚠️ CANLI ÖNCESİ DENETİM LİSTESİ (SEO+KVKK-sayfa+noindex+boş-durum+mail-testi+mobil+yedek+foto-volume+sunucu-güvenlik+global-seed) | TUR-1'de var: T1-A A6 | ⬜ AÇIK | KOD DIŞI (canlı-öncesi denetim); ayrı tur; A6 ile aynı |

---

## 2. YARIM KALAN İŞLER (gruplu)

### (a) PO kararı bekliyor
- **DISC-tipine yaklaşım içeriği** (E1/A6/madde 31) — NİYET: ürün vaadi çekirdeği; 3 seçenek sunuldu, PO seçenek+içerik-yazar seçmeli · **Sertifika 20-banka canlı seed** (E2/madde 30/T5) — canlı DB yazımı→PO onaylı seed turu · **SJT 3→4 / belge-düzelt** (E4/Ç4) · **STK-custom soru tut/kaldır** (E6) · **Sıfırdan manuel eşleştirme** çelişki (T8/Ç5, K5-soru 8) · **Mentör kapasite** (Y5/mn11) · **Mentör takdir/rozet** (T10/mn8) · **Sektör/etiket havuzu tablosu** (A9/KARAR 12) · **K3 eski-kayıt consent** (A3) · **Kesin-ölü 3 dosya sil** (llmRetry/TenantContext/MeetingScheduler, madde 44) · **`@radix-ui` 5 paket** (madde 46) · **super-admin/system-logs konsolidasyon** (T6/T7-mükerrer, madde 74) · **`admin-panelleri-tasarim` arşiv** (E.4) · **9 cevaplanmamış soru** (D.3 a-i).

### (b) Başka işe bağlı
- **Bildirim/mail arka-plan kümesi** (m13/mn7/mn13/kurum-bildirim) → **37m mail-açma** kararına bağlı (⭐ tek kaldıraç) · **Analytics çerezi/#56** → **#110 kilit** + **#67 çerez-bandı** + KVKK · **Feedback engagement/goalClarity/periodic\*** (C5/madde 7) → **#7 Aşama 3** formu · **KVKK FE üçlü** (madde 40) → backend hazır, FE bağlanacak · **Ghost-red 30-gün** (madde 35/A8) → migration+cron · **Soru cevap-tipi** (A4/madde 13) → migration · **Sektör skoru canlı** (U1/madde 14) → staging.

### (c) Bilinçli ertelendi
- **Gerçek push Expo/FCM** (A8/madde 23) — in-app/mail idare, v2 · **matchingInterface JOB_LISTING** (U2) — gelecek iş-ilanı şablonu · **sector-scorer 5-bileşen** (U1/madde 14) — staging şart · **KARAR 11 yüzde-dağılım yalnız-yönetici** (ileri-faz) · **Kurum hard-delete** (madde 16 v2) — geri-alınamaz · **Platform büyüme-metrik/ayar-UI** (Y7) — platform=PO, canlı-sonrası.

### (d) Sebep yazılmamış (DURUŞ SEBEBİ YOK / NİYET BELGELENMEMİŞ)
- **`PATCH /users/me/social`** (1.A :26) — NİYET BELGEDE YOK ("niyeti bulunamadı→PO sor") · **`/rematch` admin FE aksiyonu** (1.A :21) — NİYET BELGELENMEMİŞ · **`PATCH /users/:id/self-profile`** — NİYET BELGELENMEMİŞ (mükerrer şüphesi) · **`SjtQuestion/SjtOption` 0-query tablolar** — DURUŞ SEBEBİ YOK (ölü-tablo adayı) · **Platform tek-kullanıcı drill-down** (T9) — DURUŞ SEBEBİ YOK · **Çift rol-kaynağı `User.role`** (1.F :122) — legacy-mi-terk-mi belirsiz, DURUŞ SEBEBİ YOK · **`LoginForm.tsx` Sprint-14 bayat-yorum** — DURUŞ SEBEBİ YOK.

---

## 3. KESİN SAYIM

### Kalem + durum dağılımı (207 defter kalemi)
| durum | adet |
|---|:---:|
| ✅ YAPILDI (çoğu ARADAN KAPANMIŞ) | 58 |
| 🟡 YARIM | 24 |
| 🔀 PR'DA | 0 |
| ⬜ AÇIK | 71 |
| ❓ TEYİT GEREK | 38 |
| 🗑️ GEÇERSİZ ADAYI | 0 |
| 🔵 (bilinçli erteleme — ⬜ alt-türü, ayrıca) | 8 |
| 📌 not / KOD DIŞI (süreç/hukuk/belge-hijyen/sayım) | 8 |

> Not: 🔵 ve 📌 üstteki ⬜/❓ içine de sayılabilir; ayrı gösterildi (toplam satır 207'yi aşmaz — bazı kalem çok-etiketli değil). ✅+🟡+⬜+❓+📌 = 58+24+71+38+8+8 = 207.

### ⭐ ARADAN KAPANMIŞ ✅ (kod-kanıtlı hayalet-tamamlanmış — bu denetimlerin en çok yanıldığı yer)
Bu 8 belge 2026-08-15..25 tarihli; canonical'da ARTIK ✅ olan ama bu belgelerde "açık/🔴/🟡" görünenler (⭐ = bu tur GERÇEK KODLA doğruladım):
1. ⭐ **G1 madde 38 updateUser password sızıntısı** — `userController.ts:280 select:USER_FULL_SELECT` + `db.ts:52 global omit` ✅
2. ⭐ **G2/madde 39/96 hardDelete FK → anonymize** — `gdprService.ts:128-171 updateMany` Message/Feedback temizler ✅ (#54 CANLIDA)
3. ⭐ **G3 madde 68 SuspicionReport reporter mask** — `platformController.ts:422 maskName/maskContact` ✅
4. **madde 69 (T1) Zod message · madde 70 (T2) progress** — ✅ #51/#114
5. **E5/madde 32 admin soru düzenleme UI** — ✅ çatı#87 (`questions/page.tsx:256`)
6. **E7/madde 34 öğrenme-yolculuğu STK görünürlük** — ✅ (`adminController.ts:311-335`)
7. **B1/madde 2 K2 OAuth kvkkConsentAt** — ✅ (`oauthService.ts:112`) — belgelerin en büyük "sürpriz"i
8. **D1 findMatchesDueForCheckpoint** — ✅🔀 cron LOG-ONLY (`cronScheduler.ts:359`)
9. **madde 92 sunucu ülkesi Londra/BK** — ✅ PO teyitli
10. **B.5 6 admin paneli + oyunlaştırma + Match-persist + branding XSS** — ✅ TAMAMEN kodlanmış

### ⭐ HÂLÂ AÇIK — kod-kanıtlı (bu tur GERÇEK KODLA doğruladım, ✅ DEMEDİM)
- ⭐ **madde 71 (T3) SuspicionReport.tenantId YOK** — `schema.prisma:1168-1180` model'de tenantId alanı yok (tenantName var) → **S1 güvenlik/tenant-izolasyon AÇIK**
- ⭐ **madde 40/97 KVKK FE üçlü** — backend var (`userRoutes.ts:167-185`), FE hard-delete/anonymize/export çağrısı YOK (grep boş)
- ⭐ **K4/madde 3 yaş-verisi** — `birthDate`/`birthYear` şemada YOK (metin öz-beyan var, form-input/DB-alan yok)
- ⭐ **madde 82 consent sürümü** — `consentVersion`/`policyVersion` YOK (yalnız `kvkkConsentAt` zaman damgası)
- ⭐ **T5/madde 73 cert-seed runner** — `package.json`'da `seed-certification` referansı YOK (madde 30'u bloklar)

---

## KAPANIŞ NOTU (GRUP-C)

- **8/8 belge TAM okundu** (okunan/toplam: 64/64, 77/77, 82/82, 120/120, 115/115, 225/225, 227/227, 376/376). Uzun 3 belge (376/227/225) aralık-aralık okundu, kırpılma önlendi. Okunmayan: 0.
- **Toplam 207 defter kalemi.** Dağılım TAM: ✅ 58 · 🟡 24 · ⬜ 71 · ❓ 38 · 🔵 8 · 📌 8 · 🔀 0 · 🗑️ 0.
- **NUMARASIZ:** bu belgeler kod-denetimi olduğundan çoğu kalem T1'de zaten numaralı (madde 38-103 + G/T/K/F/A serileri). GERÇEKTEN numarasız/T1'de-olmayan yeni: **~9** — `PATCH /users/me/social` niyet-yok · `/rematch` FE · `self-profile` mükerrer · `SjtQuestion/SjtOption` 0-query · `LoginForm` Sprint-14 bayat · OAuth-accessToken-URL (proje-analizi:93) · createMeeting-tenant-scope (proje-analizi:96) · bekleme-salonu-bildirim-izni · toplam-mentörlük-saati metriği. Bunların NİYET+NEREDE-DURDU bilgisi defterde işlendi.
- **🟡 YARIM: 24 kalem** · bunlardan **NİYET BELGELENMEMİŞ/DURUŞ-SEBEBİ-YOK: ~7** (bölüm 2-d).
- **Hayalet-tamamlanmış (kod-kanıtlı): 10 küme** (yukarıda; 3'ü ⭐ bu tur GERÇEK KODLA teyit: G1/G2/G3). Bu, T1'in "hayalet-tamamlanmış + roadmap-bayat" bulgusunu GÜÇLENDİRİR — kod, 2026-08-15..25 denetimlerinin ötesine geçmiş.
- **Çelişki: 2** aktarıldı (ikisini de yazdım, hakem olmadım): (Ç5) elle eşleştirme envanter "eksik" ↔ strateji "YASAK" (T8, PO) · SJT belge 4 ↔ kod 3 (Ç4/BÇ1, PO). Her ikisi T1'de kayıtlı.
- **Kod arandı (spot-teyit):** 8 SEVİYE-1 kalem GERÇEK KODLA doğrulandı — 5'i HÂLÂ AÇIK (madde 71/40/K4/82/T5 → kanıt yoksa ✅ demedim, doğru durumda bırakıldı), 3'ü ARADAN KAPANMIŞ (G1/G2/G3). ⭐ Güvenlik/KVKK kalemlerinde kod kanıtı MUTLAKA arandı; kanıtsız kalanlar ❓/⬜.
- **En çarpıcı gerçek:** `kvkk-veri-aktarim-envanteri` (2026-08-25, en yeni) bile bayatlamış — `anonymizeUser`'ın Message/Feedback serbest-metni temizlemesi (madde 96) rapordan sonra CANLIDA; ama madde 71 (SuspicionReport.tenantId) + madde 40 (KVKK FE) + K4 (yaş-alanı) + madde 82 (consent-sürüm) HÂLÂ gerçek açık (kod-teyitli).
- DB'ye HİÇBİR sorgu yapılmadı (SELECT bile yok) · kod SALT-OKUNDU/değiştirilmedi · PR açılmadı · commit yapılmadı · belge silinmedi/taşınmadı · numara doğurulmadı · kişi adı yazılmadı · yalnız T2-C dosyası yazıldı.
