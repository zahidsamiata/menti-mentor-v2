> 📸 DONDURULMUŞ (2026-09-28) — GÖREV 2.2: otonom sistem (2026-09-19) öncesi yazılmış ✅ / CANLIDA / TAMAMLANDI iddialarının "kodda var mı" doğrulamasının fotoğrafı; güncellenmez. Güncel iş durumu: `docs/otonom/00-KUYRUK.md` · kararlar: `docs/otonom/01-KARARLAR.md`.
> TÜR: 📸 · SON DOĞRULAMA: 2026-09-28 · TAZELEME TETİKLEYİCİSİ: KALICI — tazeleme gerekmez (dondurulmuş)

# Eski ✅ iddiaları — kodda var mı? (GÖREV 2.2, 2026-09-28)

Taban: çatı `origin/main` `100c499` (frontend) · backend `origin/main` `1fa44fc`. Yalnız "kodda var mı" bakıldı: test yazılmadı, mutasyon yok, DB yok. Canlı davranış iddiaları (ör. "migration canlıda", "mail gidiyor") için yalnız kod ayağı doğrulandı; canlı ayağı §4'te PO kabul testi adayı.

## 0. Yöntem

1. **Yaşayan belge seçimi (betik):** `docs/**/*.md` içinden ilk 5 satırında 📸 / 🧊 / DONDURULDU / DONDURULMUŞ / DONMUŞ olmayanlar; hariç: `docs/arsiv/`, `docs/otonom/arsiv/`, `docs/otonom/00-KUYRUK.md`, `01-KARARLAR.md`, `02-ILERLEME.md`, `00-SIMDI.md` → **55 yaşayan belge**.
2. **Aday satır:** `✅|CANLIDA|TAMAMLANDI` geçen satır → **415 satır / 26 belge**.
3. **Zaten izli olanlar düşüldü (40):** satırda `doğrulama 09-2x` · `bitti-dogrulama` · `✅ yapıldı — … PR #` · `kod-teyit` · `kodda doğrulandı` izi olanlar (KARAR-TAKIP 23 · kod-kalemleri 5 · e3-bağlanmamış 4 · 09-DURUM 3 · 03-PO 2 · 06-ux 1 · değerlendirme-tasarım 1 · tasarım-admin 1).
4. **Önceki raporlarda doğrulanmış satırlar düşüldü (25):** `bitti-dogrulama-2026-09-27.md` (+ `bitti-dogrulama-partiler/`), `sahipsiz-kalanlar-2026-09-27.md`, `donmus-belge-esleme-2026-09-27.md`, `docs/arsiv/belge-senkron-2026-09-27.md` içindeki 742 `belge:satır` atfı; satır numarası kaymasına karşı atfın o tarihteki (`e4026a0`) metni bugünkü belgede arandı → 25 eşleşme (KARAR-TAKIP 8 · 03-PO 7 · kod-kalemleri 7 · 08-açık 1 · 11-tasarım 1 · değerlendirme-tasarım 1).
5. Kalan 350 satır tek tek okundu ve sınıflandı (aşağıda). Kod iddiası olan her satır koda (backend `src/`, `prisma/`, `tests/`; frontend `src/`) karşı kontrol edildi.

## 1. Özet sayılar

| Kalem | Sayı |
|---|---|
| Aday satır (betik) | **415** |
| Atlanan — zaten doğrulama izi var (satır içi) | 40 |
| Atlanan — 09-27 raporlarında doğrulanmış (kanıtla eşleşen) | 25 |
| Atlanan — satır zaten otonom dönemi kod-atıflı (dosya:satır/test satırda) | 9 |
| **Atlanan zaten-doğrulanmış toplam** | **74** |
| Kapsam dışı — `00-KART-İNDEKSİ` (📸 damgası 7. satırda; önceki raporlarla tutarlı olarak dondurulmuş sayıldı) | 33 |
| Kapsam dışı — `devir/07-oturum-gunlugu.md` (📓 tarihsel günlük) | 11 |
| Kapsam dışı — `## GEÇMİŞ` bölümü (6) + ✅ yalnız `~~üstü çizili~~` metinde (2) | 8 |
| Kod iddiası değil — lejant/kural · PO elle işi / PO teyidi · karar kaydı · belge/keşif/pointer süreci · numaralandırma · otonom dönemi PR'lı (4) | 149 |
| **Koda karşı kontrol edilen satır** | **140** (≈55 ayrı iddia; aynı iş 2-4 belgede tekrar ediyor) |
| ✅ VAR | **135** |
| 🟨 KISMEN | **5** (4'ünün kalanı zaten kuyrukta sahipli: F-11 / PS-A2 / PS-A3 / madde 101 · 1'i yeni → AJ aday #1) |
| ❌ YOK (kodda bulunamadı) | **0** |
| Canlıda bakılmalı (kod VAR, davranış canlıda) | **8** → §4 |
| Test kovası notu (yetki/KVKK iddiası, testi yok) | **3** → §5 |

Değişen belge: **12** · değişen satır: **140** · `docs/arsiv/belge-senkron-2026-09-28.md`'ye eklenen eski satır: **140** (eşit).

⚠️ **1.000 karakter uyarısı:** ekleme ile tavanı YENİ aşan 2 satır — `00-KARAR-TAKIP.md:299` (946→1068) ve `:354` (979→1043). Tavanı ZATEN aşmış 6 satıra da kısa not eklendi (`00-KARAR-TAKIP.md:308,333,353,569,571,589`; KARAR-TAKIP'te >1.000 satır sayısı 25 → 27). Bekçi kural (m) yalnız UYARI verir; bu satırların eski katmanı GEÇMİŞ'e taşınmalı (YN-09 işi, bu turda yapılmadı).

## 2. Hüküm tablosu (140 satır)

Not biçimi (belgede satır sonuna eklendi, eski metin silinmedi): VAR → ` · doğrulama 09-28: <dosya:satır>` · KISMEN → ` · 🟨 kısmen (doğrulama 09-28) — var: … · eksik: … → <sahip>`.

| Belge:satır | İddia | Hüküm | Kanıt |
|---|---|---|---|
| `docs/kararlar/00-KARAR-TAKIP.md:69` | #37 kurum "düzeltme iste" CANLIDA | ✅ VAR | `backend/prisma/schema.prisma:178,227` · `backend/src/routes/platformRoutes.ts:53` |
| `docs/kararlar/00-KARAR-TAKIP.md:73` | canlıda v1 ~10 kalem (özet satırı) | ✅ VAR | alt kalemler kodda (bu tablodaki tekil satırlar) |
| `docs/kararlar/00-KARAR-TAKIP.md:98` | G7-04 ✅ + G1-17 (başlık) | ✅ VAR | `frontend/src/middleware.ts:23` · `backend/src/routes/adminRoutes.ts:41` |
| `docs/kararlar/00-KARAR-TAKIP.md:99` | G7-04 www→apex 301 | ✅ VAR | `frontend/src/middleware.ts:23` |
| `docs/kararlar/00-KARAR-TAKIP.md:106` | G1-17 admin/platform uçları rol korumalı | ✅ VAR | `backend/src/routes/adminRoutes.ts:41` · `backend/src/routes/platformRoutes.ts:40` |
| `docs/kararlar/00-KARAR-TAKIP.md:110` | 131-136 IDOR bulguları kapatıldı (başlık) | ✅ VAR | `backend/src/controllers/requestController.ts:109` · `backend/src/routes/userRoutes.ts:155,164` |
| `docs/kararlar/00-KARAR-TAKIP.md:111` | madde 131 IDOR düzeltmesi | ✅ VAR | `backend/src/controllers/requestController.ts:109` |
| `docs/kararlar/00-KARAR-TAKIP.md:112` | madde 132 IDOR düzeltmesi | ✅ VAR | `backend/src/controllers/meetingController.ts:281` |
| `docs/kararlar/00-KARAR-TAKIP.md:113` | madde 133 IDOR düzeltmesi | ✅ VAR | `backend/src/routes/userRoutes.ts:155` |
| `docs/kararlar/00-KARAR-TAKIP.md:114` | madde 134 IDOR düzeltmesi | ✅ VAR | `backend/src/routes/userRoutes.ts:164` |
| `docs/kararlar/00-KARAR-TAKIP.md:115` | madde 135 IDOR düzeltmesi | ✅ VAR | `backend/src/controllers/sjtScoringController.ts:63-66` |
| `docs/kararlar/00-KARAR-TAKIP.md:116` | madde 136 IDOR düzeltmesi | ✅ VAR | `backend/src/controllers/questionController.ts:142-150` |
| `docs/kararlar/00-KARAR-TAKIP.md:121` | DK1 isPlatformAuthError | ✅ VAR | `frontend/src/app/platform/dashboard/page.tsx:102` |
| `docs/kararlar/00-KARAR-TAKIP.md:123` | register rate-limit (Faz 3c) | ✅ VAR | `backend/src/routes/authRoutes.ts:25` |
| `docs/kararlar/00-KARAR-TAKIP.md:124` | G1-02 DISC sızıntısı yok | ✅ VAR | `backend/src/routes/analyticsRoutes.ts:12` |
| `docs/kararlar/00-KARAR-TAKIP.md:196` | S23 Consent migration + backfill (kod ayağı) | ✅ VAR | `backend/prisma/schema.prisma:1294` · `backend/src/services/consentService.ts:66` |
| `docs/kararlar/00-KARAR-TAKIP.md:298` | madde 6 kullanıcı onay/red maili çalışıyor | ✅ VAR | `backend/src/controllers/adminController.ts:663,711,771` |
| `docs/kararlar/00-KARAR-TAKIP.md:299` | madde 7(A) havuz kartı CANLIDA | ✅ VAR | `frontend/src/app/(dashboard)/mentor/page.tsx:521` · `frontend/src/app/(dashboard)/menti/page.tsx:348` |
| `docs/kararlar/00-KARAR-TAKIP.md:300` | madde 9 ağırlık gösterimi CANLIDA | ✅ VAR | `frontend/src/app/(admin)/admin/algorithm-tuner/page.tsx:118-146` |
| `docs/kararlar/00-KARAR-TAKIP.md:305` | madde 34 öğrenme yolculuğu tamamlanma kolonu | ✅ VAR | `backend/src/controllers/adminController.ts:315` · `frontend/src/app/(admin)/admin/mentor-havuzu/page.tsx:190` |
| `docs/kararlar/00-KARAR-TAKIP.md:308` | madde 138 notu: discResultCard CANLIDA, FE okuyor | ✅ VAR | `frontend/src/components/organisms/DiscRecallCard.tsx` |
| `docs/kararlar/00-KARAR-TAKIP.md:313` | madde 143 şık karıştırma KODLANDI | ✅ VAR | `frontend/src/lib/shuffle.ts:9` · `frontend/src/app/(dashboard)/learning-journey/page.tsx:74` |
| `docs/kararlar/00-KARAR-TAKIP.md:315` | madde 145 regresyon testi | ✅ VAR | `backend/src/services/learningJourney.service.ts:169` · `backend/tests/learning-journey.test.ts:116` |
| `docs/kararlar/00-KARAR-TAKIP.md:333` | madde 163 CertificationOption iç-not alanı | ✅ VAR | `backend/prisma/schema.prisma:1158` |
| `docs/kararlar/00-KARAR-TAKIP.md:352` | K4 18+ beyanı (beyan ✅) | ✅ VAR | `frontend/src/app/(auth)/register/_RegisterContent.tsx:431` |
| `docs/kararlar/00-KARAR-TAKIP.md:353` | 9a ağırlık ayarı CANLIDA | ✅ VAR | `backend/src/routes/adminRoutes.ts:78` · `frontend/src/app/(admin)/admin/algorithm-tuner/page.tsx:51` |
| `docs/kararlar/00-KARAR-TAKIP.md:354` | 9b scoring saklanan ağırlığı okur | ✅ VAR | `backend/src/services/matching.ts:67-72,168` |
| `docs/kararlar/00-KARAR-TAKIP.md:355` | madde 37 düzeltme iste CANLIDA | ✅ VAR | `backend/prisma/schema.prisma:178,227` · `backend/src/routes/platformRoutes.ts:53` |
| `docs/kararlar/00-KARAR-TAKIP.md:446` | D1 checkpoint cron | ✅ VAR | `backend/src/services/cronScheduler.ts:421,490` |
| `docs/kararlar/00-KARAR-TAKIP.md:447` | kalite puanı kalıcı yazım | ✅ VAR | `backend/src/services/scoring.ts:169` · `frontend/src/app/(admin)/admin/mentor-havuzu/page.tsx:94` |
| `docs/kararlar/00-KARAR-TAKIP.md:448` | pair-signal yöneticiye bağlandı | ✅ VAR | `backend/src/controllers/adminController.ts:422` · `frontend/src/app/(admin)/admin/eslesmeler/page.tsx:125` |
| `docs/kararlar/00-KARAR-TAKIP.md:453` | #7 Aşama 1 MERGED CANLIDA (başlık) | ✅ VAR | `backend/src/services/cronScheduler.ts:490` · `backend/src/services/scoring.ts:169` · `backend/src/controllers/adminController.ts:422` |
| `docs/kararlar/00-KARAR-TAKIP.md:455` | #7 Aşama 1 kalemleri CANLIDA | ✅ VAR | `backend/src/services/cronScheduler.ts:490` · `backend/src/services/scoring.ts:169` · `backend/src/controllers/adminController.ts:422` |
| `docs/kararlar/00-KARAR-TAKIP.md:538` | F.1 güvenlik #51 (başlık) | ✅ VAR | alt kalemler kodda (bu tablodaki tekil satırlar) |
| `docs/kararlar/00-KARAR-TAKIP.md:539` | G1-G3 #51 ile düzeltildi | ✅ VAR | alt kalemler kodda (bu tablodaki tekil satırlar) |
| `docs/kararlar/00-KARAR-TAKIP.md:543` | G1 updateUser password sızıntısı | ✅ VAR | `backend/src/db.ts:52` |
| `docs/kararlar/00-KARAR-TAKIP.md:544` | G2 hardDelete→anonymize | ✅ VAR | `backend/src/services/gdprService.ts:110,159,212,266` |
| `docs/kararlar/00-KARAR-TAKIP.md:545` | G3 listSuspicionReports maske | ✅ VAR | `backend/src/controllers/platformController.ts:466-467` |
| `docs/kararlar/00-KARAR-TAKIP.md:552` | madde 79 haftalık görüşme limiti | ✅ VAR | `backend/src/controllers/meetingController.ts:120,557` |
| `docs/kararlar/00-KARAR-TAKIP.md:553` | madde 80 getPlatformLogs select + listUserReports maske | ✅ VAR | `backend/src/controllers/platformController.ts:224,516` |
| `docs/kararlar/00-KARAR-TAKIP.md:554` | madde 88 recentLogs meta çıkarıldı | ✅ VAR | `backend/src/controllers/platformController.ts:134` |
| `docs/kararlar/00-KARAR-TAKIP.md:555` | madde 89 listPendingTenants maske | ✅ VAR | `backend/src/controllers/platformController.ts:259` |
| `docs/kararlar/00-KARAR-TAKIP.md:557` | madde 95 son değişiklik aktörü | ✅ VAR | `backend/src/services/algorithmTuner.ts:230` |
| `docs/kararlar/00-KARAR-TAKIP.md:561` | madde 93 anonimleştirme (kısmen ✅) | ✅ VAR | `backend/src/services/gdprService.ts:110,159,212,266` |
| `docs/kararlar/00-KARAR-TAKIP.md:568` | madde 87 motor ağırlığı okur | ✅ VAR | `backend/src/services/matching.ts:67-72,168` |
| `docs/kararlar/00-KARAR-TAKIP.md:569` | madde 96 tam anonimleştirme CANLIDA | ✅ VAR | `backend/src/services/gdprService.ts:110,159,212,266` |
| `docs/kararlar/00-KARAR-TAKIP.md:571` | madde 97 self-servis dışa aktarım + hesap kapatma | ✅ VAR | `backend/src/routes/userRoutes.ts:204,211` · `frontend/src/components/organisms/DataPrivacySection.tsx` |
| `docs/kararlar/00-KARAR-TAKIP.md:586` | T1 Zod message | ✅ VAR | `backend/src/controllers/questionController.ts:91` |
| `docs/kararlar/00-KARAR-TAKIP.md:587` | T2 adaptive progress + FE guard | ✅ VAR | `backend/src/services/adaptiveTestEngine.ts:116` · `frontend/src/components/organisms/DailyQuestionWidget.tsx:42` |
| `docs/kararlar/00-KARAR-TAKIP.md:589` | T4 sertifika baraj kodda | ✅ VAR | `backend/src/services/certification.service.ts:52,79` |
| `docs/kararlar/00-KARAR-TAKIP.md:624` | madde 108 ön-koşul chat ✅ | ✅ VAR | `frontend/src/components/organisms/MessagesBell.tsx:17` · `backend/src/controllers/conversationController.ts:119` |
| `docs/kararlar/00-KARAR-TAKIP.md:687` | 5 FK RESTRICT + cron düzeltmesi | ✅ VAR | `backend/prisma/migrations/20260830100000_add_restrict_fks/migration.sql` · `backend/src/services/cronScheduler.ts:218` |
| `docs/kararlar/00-KARAR-TAKIP.md:717` | #12 login-PENDING (davet=onay) çözüldü | ✅ VAR | `backend/src/controllers/authController.ts:149-153` |
| `docs/kararlar/00-KARAR-TAKIP.md:720` | #12 login-PENDING çözüldü (toplam notu) | ✅ VAR | `backend/src/controllers/authController.ts:149-153` |
| `docs/kararlar/00-KARAR-TAKIP.md:736` | (12) login-PENDING çözüldü | ✅ VAR | `backend/src/controllers/authController.ts:149-153` |
| `docs/kararlar/09-DURUM.md:46` | #7 Aşama 1 CANLIDA | ✅ VAR | `backend/src/services/cronScheduler.ts:490` · `backend/src/services/scoring.ts:169` · `backend/src/controllers/adminController.ts:422` |
| `docs/kararlar/09-DURUM.md:62` | #37 düzeltme iste CANLIDA | ✅ VAR | `backend/prisma/schema.prisma:178,227` · `backend/src/routes/platformRoutes.ts:53` |
| `docs/kararlar/09-DURUM.md:76` | #34 + #7(A) + #9 gösterim CANLIDA | ✅ VAR | alt kalemler kodda (bu tablodaki tekil satırlar) |
| `docs/kararlar/09-DURUM.md:89` | #37 login enumeration CANLIDA | ✅ VAR | `backend/src/controllers/authController.ts:323-330` |
| `docs/kararlar/09-DURUM.md:101` | #12 DISC çoklu harf CANLIDA | ✅ VAR | `backend/src/services/discLetters.ts:58` |
| `docs/kararlar/09-DURUM.md:117` | ① grubu masa temizliği (başlık) | ✅ VAR | alt kalemler kodda (bu tablodaki tekil satırlar) |
| `docs/kararlar/09-DURUM.md:120` | #6 onay/red maili + correction-fix | ✅ VAR | `backend/src/controllers/adminController.ts:663,711,771` |
| `docs/kararlar/09-DURUM.md:124` | #5 ThemeToggle zaten mevcut | ✅ VAR | `frontend/src/app/(admin)/layout.tsx:99` · `frontend/src/app/platform/dashboard/page.tsx:234` |
| `docs/kararlar/09-DURUM.md:127` | İş 3 P2/P3 reddedilen akışı | ✅ VAR | `backend/prisma/schema.prisma:309-313` · `backend/src/routes/authRoutes.ts:72` |
| `docs/kararlar/09-DURUM.md:135` | İş 2 + İş 3 P1 onay/red izi | ✅ VAR | `backend/prisma/schema.prisma:309-313` · `backend/src/routes/authRoutes.ts:72` |
| `docs/kararlar/09-DURUM.md:137` | onay/red izi migration CANLIDA (kod ayağı) | ✅ VAR | `backend/prisma/schema.prisma:309-313` · `backend/src/routes/authRoutes.ts:72` |
| `docs/kararlar/09-DURUM.md:144` | masa temizliği 5 PR (başlık) | ✅ VAR | alt kalemler kodda (bu tablodaki tekil satırlar) |
| `docs/kararlar/09-DURUM.md:146` | v1 #8 sol menü 4 grup | ✅ VAR | `frontend/src/app/(admin)/layout.tsx:30-58` |
| `docs/kararlar/09-DURUM.md:147` | v1 #11 sertifika rozeti | ✅ VAR | `backend/src/controllers/adminController.ts:284` · `frontend/src/app/(admin)/admin/mentor-havuzu/page.tsx:168` |
| `docs/kararlar/09-DURUM.md:148` | v1 #10 durum rozeti | ✅ VAR | `frontend/src/app/(admin)/admin/mentor-havuzu/page.tsx:25` |
| `docs/kararlar/09-DURUM.md:152` | bu oturum v1 işleri (başlık) | ✅ VAR | alt kalemler kodda (bu tablodaki tekil satırlar) |
| `docs/kararlar/09-DURUM.md:178` | KARAR 5 CANLIDA | ✅ VAR | `backend/src/services/discVisibility.ts:22` |
| `docs/kararlar/09-DURUM.md:202` | v1 #1 KARAR 5 tamamlandı | ✅ VAR | `backend/src/services/discVisibility.ts:22` |
| `docs/kararlar/09-DURUM.md:204` | CANLIDA/KAPANMIŞ (başlık) | ✅ VAR | alt kalemler kodda (bu tablodaki tekil satırlar) |
| `docs/kararlar/09-DURUM.md:206` | CHAT kod TAM CANLIDA | ✅ VAR | `frontend/src/components/organisms/MessagesBell.tsx:17` · `backend/src/controllers/conversationController.ts:119` |
| `docs/kararlar/09-DURUM.md:208` | tema toggle ZATEN mevcut | ✅ VAR | `frontend/src/app/(admin)/layout.tsx:99` · `frontend/src/app/platform/dashboard/page.tsx:234` |
| `docs/kararlar/09-DURUM.md:209` | CHAT v1 TAM CANLIDA | ✅ VAR | `frontend/src/components/organisms/MessagesBell.tsx:17` · `backend/src/controllers/conversationController.ts:119` |
| `docs/kararlar/09-DURUM.md:212` | MENTÖR PANELİ TAM CANLIDA | ✅ VAR | `frontend/src/app/(dashboard)/mentor/page.tsx:43-46` · `backend/src/routes/userRoutes.ts:101` |
| `docs/kararlar/10-yol-tamamlananlar.md:19` | KARAR 5 DISC görünürlüğü | ✅ VAR | `backend/src/services/discVisibility.ts:22` |
| `docs/kararlar/10-yol-tamamlananlar.md:20` | K2 OAuth kvkkConsentAt | ✅ VAR | `backend/src/services/oauth/oauthService.ts:134` |
| `docs/kararlar/10-yol-tamamlananlar.md:21` | K4 18+ beyanı | ✅ VAR | `frontend/src/app/(auth)/register/_RegisterContent.tsx:431` |
| `docs/kararlar/10-yol-tamamlananlar.md:22` | K5 sunucu konumu beyanı | ✅ VAR | `frontend/src/app/kvkk/page.tsx:96` |
| `docs/kararlar/10-yol-tamamlananlar.md:23` | ThemeToggle admin/platform | ✅ VAR | `frontend/src/app/(admin)/layout.tsx:99` · `frontend/src/app/platform/dashboard/page.tsx:234` |
| `docs/kararlar/10-yol-tamamlananlar.md:24` | sol menü 4 grup | ✅ VAR | `frontend/src/app/(admin)/layout.tsx:30-58` |
| `docs/kararlar/10-yol-tamamlananlar.md:25` | durum rozeti | ✅ VAR | `frontend/src/app/(admin)/admin/mentor-havuzu/page.tsx:25` |
| `docs/kararlar/10-yol-tamamlananlar.md:26` | sertifika rozeti | ✅ VAR | `backend/src/controllers/adminController.ts:284` · `frontend/src/app/(admin)/admin/mentor-havuzu/page.tsx:168` |
| `docs/kararlar/10-yol-tamamlananlar.md:27` | DISC çoklu harf | ✅ VAR | `backend/src/services/discLetters.ts:58` |
| `docs/kararlar/10-yol-tamamlananlar.md:28` | İş 2+3 onay/red izi + reddedilen akışı | ✅ VAR | `backend/prisma/schema.prisma:309-313` · `backend/src/routes/authRoutes.ts:72` |
| `docs/kararlar/10-yol-tamamlananlar.md:29` | admin soru düzenleme UI | ✅ VAR | `frontend/src/app/(admin)/admin/questions/page.tsx:292` · `backend/src/routes/questionRoutes.ts:57` |
| `docs/kararlar/10-yol-tamamlananlar.md:30` | öğrenme yolculuğu kolonu | ✅ VAR | `backend/src/controllers/adminController.ts:315` · `frontend/src/app/(admin)/admin/mentor-havuzu/page.tsx:190` |
| `docs/kararlar/10-yol-tamamlananlar.md:31` | giriş enumeration | ✅ VAR | `backend/src/controllers/authController.ts:323-330` |
| `docs/kararlar/10-yol-tamamlananlar.md:32` | updateUser password sızıntısı | ✅ VAR | `backend/src/db.ts:52` |
| `docs/kararlar/10-yol-tamamlananlar.md:33` | SuspicionReport maske | ✅ VAR | `backend/src/controllers/platformController.ts:466-467` |
| `docs/kararlar/10-yol-tamamlananlar.md:34` | getPlatformLogs/listUserReports | ✅ VAR | `backend/src/controllers/platformController.ts:224,516` |
| `docs/kararlar/10-yol-tamamlananlar.md:35` | recentLogs meta | ✅ VAR | `backend/src/controllers/platformController.ts:134` |
| `docs/kararlar/10-yol-tamamlananlar.md:36` | listPendingTenants maske | ✅ VAR | `backend/src/controllers/platformController.ts:259` |
| `docs/kararlar/10-yol-tamamlananlar.md:37` | haftalık limit | ✅ VAR | `backend/src/controllers/meetingController.ts:120,557` |
| `docs/kararlar/10-yol-tamamlananlar.md:38` | Zod message | ✅ VAR | `backend/src/controllers/questionController.ts:91` |
| `docs/kararlar/10-yol-tamamlananlar.md:39` | adaptive progress | ✅ VAR | `backend/src/services/adaptiveTestEngine.ts:116` · `frontend/src/components/organisms/DailyQuestionWidget.tsx:42` |
| `docs/kararlar/10-yol-tamamlananlar.md:40` | motor tenant ağırlığı | ✅ VAR | `backend/src/services/matching.ts:67-72,168` |
| `docs/kararlar/10-yol-tamamlananlar.md:41` | ağırlık ayarı | ✅ VAR | `backend/src/routes/adminRoutes.ts:78` · `frontend/src/app/(admin)/admin/algorithm-tuner/page.tsx:51` |
| `docs/kararlar/10-yol-tamamlananlar.md:42` | DailyQuestionWidget guard | ✅ VAR | `frontend/src/components/organisms/DailyQuestionWidget.tsx:37-42` |
| `docs/kararlar/10-yol-tamamlananlar.md:43` | KVKK sunucu ülkesi Londra | ✅ VAR | `frontend/src/app/kvkk/page.tsx:96` |
| `docs/kararlar/10-yol-tamamlananlar.md:44` | son değişiklik aktörü | ✅ VAR | `backend/src/services/algorithmTuner.ts:230` |
| `docs/kararlar/10-yol-tamamlananlar.md:45` | tam anonimleştirme | ✅ VAR | `backend/src/services/gdprService.ts:110,159,212,266` |
| `docs/kararlar/10-yol-tamamlananlar.md:47` | madde 93 kısmen notu | ✅ VAR | `backend/src/services/gdprService.ts:159,212` (mesaj+foto artık kodda; userId bağı H-9 sınırı) |
| `docs/kararlar/10-yol-tamamlananlar.md:50` | md.6 kullanıcı maili ✅ | ✅ VAR | `backend/src/controllers/adminController.ts:663,711,771` |
| `docs/kararlar/10-yol-tamamlananlar.md:51` | md.7 kart + Aşama 1 ✅ · md.9 9a/9b CANLIDA | ✅ VAR | alt kalemler kodda (bu tablodaki tekil satırlar) |
| `docs/kararlar/10-yol-tamamlananlar.md:52` | md.33 ölü seed ✅ | ✅ VAR | `backend/prisma/` (seed-questions.ts yok; `5745e0f` main atası) |
| `docs/kararlar/10-yol-tamamlananlar.md:61` | KARAR 5 CANLIDA | ✅ VAR | `backend/src/services/discVisibility.ts:22` |
| `docs/kararlar/10-yol-tamamlananlar.md:63` | KARAR 5 tamamlandı canlıda | ✅ VAR | `backend/src/services/discVisibility.ts:22` |
| `docs/kararlar/konu/02-mimari-ve-altyapi.md:31` | Next.js 15.5.20 doğrulandı | ✅ VAR | `frontend/package.json:20` |
| `docs/kararlar/konu/03-psikometri-ve-algoritma.md:12` | DISC görünür + OCEAN motor 🟢✅ | 🟨 KISMEN | var: `backend/src/services/disc-to-ocean.adapter.ts` · eksik: canlı eşleştirme OCEAN okumuyor (`backend/src/services/matching.ts:3` DISC+sektör) → F-11 (00-KUYRUK) · madde 101 |
| `docs/kararlar/konu/03-psikometri-ve-algoritma.md:16` | 8 arketip 🟢✅ | 🟨 KISMEN | var: `backend/src/services/scoring.config.ts:33-34` (M1-M4/m1-m4) · eksik: arketip yalnız uyuyan `scoring.service.ts` yolunda; canlı `matching.ts` kullanmıyor → F-11 / PS-A3 (00-KUYRUK) |
| `docs/kararlar/konu/03-psikometri-ve-algoritma.md:21` | eşleşme formülü 🟢✅ | ✅ VAR | `backend/src/services/scoring.ts:106-109,118-121` (canlı çarpan sınırı 0.8–1.2) |
| `docs/kararlar/konu/03-psikometri-ve-algoritma.md:26` | hard-gate toksik blok 🟢✅ | 🟨 KISMEN | var: D↔S anti-match canlı (`backend/src/services/scoring.ts:24`) · eksik: M4-m3 arketip vetosu yalnız uyuyan `scoring.service.ts:36` → F-11 (00-KUYRUK) |
| `docs/kararlar/konu/03-psikometri-ve-algoritma.md:33` | SJT & yanıt formatı 🟢✅ | 🟨 KISMEN | var: `backend/src/services/sjt-scorer.ts` · `backend/prisma/schema.prisma:927` (MOST_LEAST) · eksik: SJT/OCEAN canlı eşleştirmede okunmuyor → madde 101 / PS-A2 (00-KUYRUK) |
| `docs/kararlar/konu/03-psikometri-ve-algoritma.md:47` | mentörlük yetkinliği & sertifikasyon 🟢✅ | 🟨 KISMEN | var: sertifika kapısı + 24s bekleme + %80 konu eşiği `backend/src/services/certification.service.ts:27,33,52` · eksik: "Mini Akademi 4 modül" kodda/FE'de yok → AJ aday #1 (eski-onay raporu) |
| `docs/kararlar/konu/03-psikometri-ve-algoritma.md:55` | progressive profiling & fallback 🟢✅ | ✅ VAR | `backend/src/services/matching.ts:52,128` · `backend/src/services/scoring.ts:118-121` |
| `docs/kararlar/konu/04-guvenlik-ve-kvkk.md:9` | IDOR korumalı + K2/K4/K5 CANLIDA | ✅ VAR | alt kalemler kodda (bu tablodaki tekil satırlar) |
| `docs/kararlar/konu/04-guvenlik-ve-kvkk.md:38` | 2 uç IDOR korumalı | ✅ VAR | `backend/src/controllers/matchingController.ts:49-52` · `backend/src/controllers/requestController.ts:139-142` |
| `docs/kararlar/konu/05-ozellikler-ve-paneller.md:9` | platform admin Kapsam B kodlandı | ✅ VAR | `frontend/src/app/platform/tenants/[id]/page.tsx:27-28` · `frontend/src/app/platform/tenants/[id]/_components/DiscSummary.tsx` |
| `docs/kararlar/konu/05-ozellikler-ve-paneller.md:20` | A2 mentör havuzu | ✅ VAR | `frontend/src/app/(admin)/admin/mentor-havuzu/page.tsx` |
| `docs/kararlar/konu/05-ozellikler-ve-paneller.md:21` | A3 menti havuzu | ✅ VAR | `frontend/src/app/(admin)/admin/menti-havuzu/page.tsx` |
| `docs/kararlar/konu/05-ozellikler-ve-paneller.md:22` | A4 sertifika sonuç panosu | ✅ VAR | `backend/src/routes/adminRoutes.ts:55` · `frontend/src/app/(admin)/admin/sertifika-sonuclari/` |
| `docs/kararlar/konu/05-ozellikler-ve-paneller.md:23` | A1 eşleşme paneli | ✅ VAR | `backend/src/routes/adminRoutes.ts:54` · `backend/src/services/scoring.service.ts:141` |
| `docs/kararlar/konu/05-ozellikler-ve-paneller.md:24` | A7 branding + logo XSS koruması | ✅ VAR | `backend/src/services/logoUrl.ts` · `frontend/src/app/(admin)/admin/branding/` |
| `docs/kararlar/konu/05-ozellikler-ve-paneller.md:26` | takvim/feedback 🟢✅ | ✅ VAR | `frontend/src/components/organisms/MeetingFeedbackCard.tsx` · `backend/prisma/schema.prisma:564,1171-1173` |
| `docs/kararlar/konu/05-ozellikler-ve-paneller.md:31` | bookMeeting UTC/Istanbul düzeltildi | ✅ VAR | `backend/src/controllers/meetingController.ts:521` |
| `docs/kararlar/konu/06-tasarim-ux.md:9` | tema toggle altyapısı 🟢✅ | ✅ VAR | `frontend/src/providers/ThemeProvider.tsx` · `frontend/src/app/layout.tsx:26` |
| `docs/kararlar/konu/06-tasarim-ux.md:20` | D21 toggle admin/platform nav TAMAMLANDI | ✅ VAR | `frontend/src/app/(admin)/layout.tsx:99` · `frontend/src/app/platform/dashboard/page.tsx:234` |
| `docs/kararlar/konu/06-tasarim-ux.md:28` | H1 UYGULANDI | ✅ VAR | `frontend/src/app/_sections/HeroSection.tsx:37-43` |
| `docs/kararlar/konu/08-acik-sorular.md:32` | bookMeeting düzeltildi | ✅ VAR | `backend/src/controllers/meetingController.ts:521` |
| `docs/kararlar/konu/consent-modeli-plani-2026-08-28.md:10` | Consent tasarımı KODLANDI (Tur A) | ✅ VAR | `backend/prisma/schema.prisma:1294` · `backend/src/services/consentService.ts:66` |
| `docs/kararlar/konu/consent-modeli-plani-2026-08-28.md:12` | Consent migration CANLIDA (kod ayağı) | ✅ VAR | `backend/prisma/schema.prisma:1294` · `backend/src/services/consentService.ts:66` |
| `docs/kararlar/konu/consent-modeli-plani-2026-08-28.md:14` | backfill canlıya yazıldı (kod ayağı) | ✅ VAR | `backend/prisma/schema.prisma:1294` · `backend/src/services/consentService.ts:66` |
| `docs/kararlar/konu/degerlendirme-metrik-sistemi-tasarim-2026-08-19.md:218` | Aşama 1 MERGED CANLIDA | ✅ VAR | `backend/src/services/cronScheduler.ts:490` · `backend/src/services/scoring.ts:169` · `backend/src/controllers/adminController.ts:422` |
| `docs/kararlar/konu/degerlendirme-metrik-sistemi-tasarim-2026-08-19.md:220` | Aşama 1 autodeploy CANLIDA | ✅ VAR | `backend/src/services/cronScheduler.ts:490` · `backend/src/services/scoring.ts:169` · `backend/src/controllers/adminController.ts:422` |
| `docs/kararlar/konu/kvkk-metinleri/05-saklama-imha-politikasi.md:19` | SystemLog 90 gün cron VAR | ✅ VAR | `backend/src/services/gdprService.ts:414` · `backend/src/services/cronScheduler.ts:18` |
| `docs/kararlar/konu/kvkk-metinleri/05-saklama-imha-politikasi.md:25` | taslak kurum 96 saat silme VAR | ✅ VAR | `backend/src/services/cronScheduler.ts:120,195` |
**YOK kapsam beyanı (negatif sonuç = 0):** YOK hükmü verilmedi; bulunamayan tek parça ("Mini Akademi 4 modül", §3) için arama: `backend/src`, `backend/prisma`, `frontend/src` · desen `akademi|academy|modül|module|Mini Akademi|mini-akademi|MiniAcademy|Güvenli alan` · harf duyarsız · Türkçe+İngilizce → yalnız ilgisiz eşleşmeler (sektör etiketi "Akademi", metodoloji kaynak adları, "Sertifika akademisi" başlık yorumu `frontend/src/app/(dashboard)/mentor/page.tsx:193`). Aynı sonuç: `docs/raporlar/kesif/icerik-tam-okuma-2026-09-23.md:496` ("kodda ve FE'de 0").

## 3. AJ adayları (numara ana ajanda)

| # | Başlık | Neden | Kanıt dosya:satır | Önerilen kapı |
|---|---|---|---|---|
| 1 | **03-psikometri "Mentörlük yetkinliği & sertifikasyon 🟢✅" bölümü kodla hizalansın — "Mini Akademi 4 modül (~6 dk puansız)" kodda yok** | Bölüm başlığı ✅ diyor ama "Mini Akademi" hiç kodlanmadı; "Baraj 65" de T4 kararıyla %80 konu eşiğine döndü (`certification.service.ts:27,52`). "Önce eğit" niyeti bugün öğrenme yolculuğu → sertifika sırasıyla karşılanıyor olabilir — ama bu eşleştirme hiçbir belgede karar olarak yazılı değil. Ürün sorusu: Mini Akademi ayrı bir özellik olarak yapılacak mı, yoksa öğrenme yolculuğu onun yerini mi aldı? | `docs/kararlar/konu/03-psikometri-ve-algoritma.md:47-50` · `backend/src/services/certification.service.ts:27,33,52` · `frontend/src/app/(dashboard)/mentor/page.tsx:193` · `docs/raporlar/kesif/icerik-tam-okuma-2026-09-23.md:496,562` (numarasız "TO-??" kalmış) | 🟢 belge damgası (kod gerçeği yazılır) + ürün kısmı için 🔴 KARAR kartı ("Mini Akademi yapılsın mı") |

Diğer 4 KISMEN satırın kalanı zaten sahipli (yeni aday açılmadı): `03-psikometri:12` MODEL (OCEAN canlıda okunmuyor) → F-11 / madde 101 · `:16` 8 ARKETİP → F-11 / PS-A3 · `:26` HARD-GATE (M4-m3 vetosu yalnız uyuyan `scoring.service.ts:36`; canlı kapı D↔S `scoring.ts:24`) → F-11 · `:33` SJT → madde 101 / PS-A2.

## 4. 03-PO KABUL TESTİ adayları (kod VAR — davranış yalnız canlıda görülür)

| # | Rol olarak | Nereye git | Ne görmeli | Kod kanıtı |
|---|---|---|---|---|
| 1 | Ziyaretçi (oturumsuz) | `https://www.sivilkapasite.org/metodoloji?x=1` | Adres `https://sivilkapasite.org/metodoloji?x=1` olur (kalıcı yönlendirme, yol + sorgu korunur) | `frontend/src/middleware.ts:23` |
| 2 | Kurum yöneticisi | Onaylar → bekleyen bir kullanıcıyı onayla; başka birine "düzeltme iste", birini reddet | Kullanıcının e-postasına onay / düzeltme notlu / gerekçeli red maili düşer (SMTP açıksa) | `backend/src/controllers/adminController.ts:663,711,771` |
| 3 | Platform yöneticisi → kurum yöneticisi | Platform paneli → bekleyen kurum başvurusu → "Düzeltme iste" (not yaz); sonra o kurumun yöneticisiyle giriş | Kurum yöneticisi düzeltme notunu görür, bilgileri düzeltip yeniden gönderebilir | `backend/src/routes/platformRoutes.ts:53` · `selfServeRoutes.ts:29` · `frontend/src/components/molecules/TenantCorrectionBanner.tsx` |
| 4 | Kurum yöneticisi | Algoritma ayarı sayfası → sektör ağırlığını +/− ile değiştir, kaydet | Adım %5; iki ağırlık toplamı hep %100; "son değişiklik" satırında değiştirenin ADI görünür (e-posta değil) | `frontend/src/app/(admin)/admin/algorithm-tuner/page.tsx:51,118-146` · `backend/src/services/algorithmTuner.ts:230` |
| 5 | Platform yöneticisi | Platform paneli açıkken oturum çerezini sil (ya da oturum süresi dolsun), sayfayı yenile / bir işlem yap | Giriş sayfasına yönlendirilir (boş/hatalı panelde kalmaz) | `frontend/src/app/platform/dashboard/page.tsx:102,197` |
| 6 | PO (Dokploy) | Backend konteyner günlüğü — Pazar 03:00 UTC sonrası ve her gün cron saati | KVKK saklama temizliği (SystemLog 90 gün) ve checkpoint geri bildirim hatırlatma cron'unun çalıştığına dair günlük satırı | `backend/src/services/cronScheduler.ts:7,18,490` · `gdprService.ts:414` |
| 7 | Menti | Profil → "Verilerimi indir", sonra (test hesabında) "Hesabımı kapat" | JSON dosyası iner; kapatmadan sonra aynı hesapla giriş yapılamaz | `backend/src/routes/userRoutes.ts:204,211` · `frontend/src/components/organisms/DataPrivacySection.tsx` |
| 8 | Kurum yöneticisi | Eşleşmeler sayfası + Mentör havuzu | Eşleşmelerde "Risk" rozeti; mentör havuzunda "Kalite Puanı" ve "Öğrenme Yolculuğu" kolonları dolu (veri varsa) | `frontend/src/app/(admin)/admin/eslesmeler/page.tsx:125` · `mentor-havuzu/page.tsx:94-95` |

(Sohbet uçtan uca denemesi zaten 03-PO #14'te — tekrar eklenmedi.)

## 5. Test kovası notları (yetki / KVKK / gizlilik iddiası — testi yok; AJ-32 benzeri)

| # | İddia | Kod | Test durumu |
|---|---|---|---|
| 1 | madde 88 — `GET /api/platform/stats` "son loglar" ham `meta` (PII olabilir) döndürmez | `backend/src/controllers/platformController.ts:134` | Uç yalnız 200/403 için test ediliyor (`backend/tests/security-audit-2.test.ts:94-127`); yanıtta `meta` yokluğu hiçbir testte ölçülmüyor |
| 2 | madde 80 (a) — `GET /api/platform/logs` ham `meta` döndürmez | `backend/src/controllers/platformController.ts:224` | Komşu `/api/system-logs` için var (`backend/tests/security.test.ts:220`); bu uç için yalnız denetim izi testi var (`backend/tests/platform-read-audit.test.ts:62`) |
| 3 | madde 163 — `CertificationOption.internalNote` (🔒 iç not) kullanıcıya HİÇBİR aşamada dönmez | `backend/prisma/schema.prisma:1158` · kullanıcıya dönen sorgular explicit `select` (`backend/src/services/certification.service.ts:307-317,451-457`) | `internalNote` hiçbir testte geçmiyor (`backend/tests`, `frontend/src/__tests__` — 0 sonuç); ileride `include: { options: true }` bir yanıta sızarsa yakalayan test yok |

## 6. Kod iddiası sayılmayan / zaten kod-atıflı satırlar (158)

| Belge | Satırlar | Sınıf | Gerekçe |
|---|---|---|---|
| `docs/kararlar/00-KARAR-TAKIP.md` | 11 | kod-dışı / iddia değil | başlık/üst bilgi (otonom dönemi PR'lı: #201-205) |
| `docs/kararlar/00-KARAR-TAKIP.md` | 20,21,22,24,50,174,214,224,242,251,275,503,849 | kod-dışı / iddia değil | lejant/kural metni — iddia değil |
| `docs/kararlar/00-KARAR-TAKIP.md` | 131,132,142,143,144,145 | kod-dışı / iddia değil | karar/belge kaydı (PO kararı, kural eklendi) — kod iddiası değil |
| `docs/kararlar/00-KARAR-TAKIP.md` | 156,162,166,168 | kod-dışı / iddia değil | belge-doğrulama/süreç günlüğü (kendisi 09-02 kod çapraz doğrulaması) |
| `docs/kararlar/00-KARAR-TAKIP.md` | 184,189,190,194,195,197,198,200,201,202,204,205,206,209 | kod-dışı / iddia değil | söz kaydı — belge/keşif/pointer süreci, kod iddiası değil |
| `docs/kararlar/00-KARAR-TAKIP.md` | 301,304,307,409,577 | kod-dışı / iddia değil | ✅ burada "GEÇERLİ/işleme al" lejantı — yapıldı iddiası değil |
| `docs/kararlar/00-KARAR-TAKIP.md` | 302 | kod-dışı / iddia değil | içerik (senaryo metni) yazıldı — belge işi, kod iddiası değil |
| `docs/kararlar/00-KARAR-TAKIP.md` | 331 | kod-dışı / iddia değil | ✅ = keşif sorusu cevaplandı (satır kendisi söylüyor) |
| `docs/kararlar/00-KARAR-TAKIP.md` | 343 | kod-dışı / iddia değil | söz S1 süreç kaydı |
| `docs/kararlar/00-KARAR-TAKIP.md` | 429,430,523,528 | kod-dışı / iddia değil | depo hijyeni / belge süreci (PO-manuel) — kod iddiası değil |
| `docs/kararlar/00-KARAR-TAKIP.md` | 560 | kod-dışı / iddia değil | PO teyidi (sunucu ülkesi) — kod dışı |
| `docs/kararlar/00-KARAR-TAKIP.md` | 593 | kod-dışı / iddia değil | karar (manuel eşleştirme yok) — kod dışı |
| `docs/kararlar/00-KARAR-TAKIP.md` | 604,823,827,831 | kod-dışı / iddia değil | numaralandırma kaydı — kod iddiası değil |
| `docs/kararlar/00-KARAR-TAKIP.md` | 638,639,640,679 | kod-dışı / iddia değil | belge-hijyen/keşif işi — kod iddiası değil |
| `docs/kararlar/00-KARAR-TAKIP.md` | 796,798,802 | kod-dışı / iddia değil | PO panel teyidi / zincir notu — kod dışı |
| `docs/kararlar/09-DURUM.md` | 8,14 | kod-dışı / iddia değil | otonom dönemi (2026-09-20, PR #201-205) — kapsam dışı |
| `docs/kararlar/09-DURUM.md` | 18 | kod-dışı / iddia değil | PO Neon panel teyidi — kod dışı |
| `docs/kararlar/09-DURUM.md` | 48,64,78 | kod-dışı / iddia değil | merge/pointer anlatısı — iddia başlıkta |
| `docs/kararlar/09-DURUM.md` | 205 | kod-dışı / iddia değil | belge uzlaştırma notu — süreç |
| `docs/kararlar/09-DURUM.md` | 221 | kod-dışı / iddia değil | başlık — içerik arşive taşınmış (docs/arsiv/09-DURUM-tamamlanan-isler-arsiv-2026-08-19.md) |
| `docs/kararlar/10-yol-tamamlananlar.md` | 7,11,15,58,59 | kod-dışı / iddia değil | başlık/açıklama |
| `docs/kararlar/konu/04-guvenlik-ve-kvkk.md` | 37 | kod-dışı / iddia değil | yönlendirme satırı (bkz. alttaki güncelleme) |
| `docs/kararlar/konu/05-ozellikler-ve-paneller.md` | 30 | kod-dışı / iddia değil | yönlendirme satırı (bkz. alttaki güncelleme) |
| `docs/kararlar/konu/06-tasarim-ux.md` | 16 | kod-dışı / iddia değil | yön belgeye işlendi, kod değiştirilmedi (satır kendisi söylüyor) |
| `docs/kararlar/konu/belge-duzeni-rehberi.md` | 114,155,167,168,169,170,175,198,208,316,318,329,330 | kod-dışı / iddia değil | kural metni — iddia değil |
| `docs/kararlar/konu/chat-v1-teslim.md` | 8 | kod-dışı / iddia değil | 2026-08-06 PR durumu (merge YOK) — yapıldı iddiası değil; :80 çelişki notu |
| `docs/kararlar/konu/chat-v1-teslim.md` | 80 | kod-dışı / iddia değil | zaten kod teyitli çelişki notu (CS raporu, conversationController.ts) |
| `docs/kararlar/konu/degerlendirme-sistemi-tasarim-2026-08-27.md` | 136,564,588,722,760,772 | kod-dışı / iddia değil | içerik örneği / PO kararı / lejant — kod iddiası değil |
| `docs/kararlar/konu/kvkk-metinleri/00-AVUKAT-KONTROL-DOSYASI.md` | 25,45 | kod-dışı / iddia değil | PO teyidi (sunucu ülkesi, veri sorumlusu) — kod dışı |
| `docs/kararlar/konu/kvkk-metinleri/README.md` | 23 | kod-dışı / iddia değil | PO teyidi — kod dışı |
| `docs/kararlar/konu/rtk-komut-rehberi.md` | 24 | kod-dışı / iddia değil | komut örneği |
| `docs/kararlar/konu/tasarim-kararlari-admin.md` | 13,22,87,144,163 | kod-dışı / iddia değil | lejant/karar başlığı |
| `docs/kararlar/konu/tasarim-kararlari-admin.md` | 150,154,155,156,159,160,161 | zaten kod-atıflı | AN-35 statü tablosu (2026-09-25) — satırda dosya:satır kanıtı var |
| `docs/otonom/03-PO-ELLE-ISLER.md` | 17 | kod-dışı / iddia değil | otonom dönemi (2026-09-27, PR #183/#367) — kapsam dışı |
| `docs/otonom/03-PO-ELLE-ISLER.md` | 79,80,81,92,151,152,153,154,155,156,237,304,305,306 | kod-dışı / iddia değil | PO elle iş — ✅ kabul ölçütü metni, kod iddiası değil |
| `docs/otonom/03-PO-ELLE-ISLER.md` | 89,259 | zaten kod-atıflı | otonom dönemi kod-atıflı güncelleme (dosya:satır/test satırda) |
| `docs/raporlar/icerik/00-INDEKS.md` | 48,49,54 | kod-dışı / iddia değil | içerik belgesi kaydedildi — belge işi |
| `docs/raporlar/icerik/kod-kalemleri-2026-09-03.md` | 8,11,21,27,28,29,31,32,38,41,42,44,50,51,53,56,57,85,96,107,140,141 | kod-dışı / iddia değil | ✅ = "doğrulandı/numaralandı" (işleme alındı) — yapıldı iddiası değil |
Ek kapsam dışı: `docs/kararlar/00-KART-INDEKSI.md` 33 satır (📸, `:7`) · `docs/devir/07-oturum-gunlugu.md` 11 satır (📓 günlük) · `00-KARAR-TAKIP.md` `## GEÇMİŞ` 6 satır · ✅ yalnız üstü çizili 2 satır.

## 7. Arşiv ve bekçi

- Değişen 140 satırın eski hâli AYNEN: `docs/arsiv/belge-senkron-2026-09-28.md` (başlık biçimi `## <yol>:<satır> (GÖREV 2.2 eski-onay doğrulaması — <iddia>)`).
- `bash scripts/belge-bekci.sh` → HATA yok.
