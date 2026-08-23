# Değerlendirme / Test / Soru Sistemi — Envanter Raporu (2026-08-15)

**📸 DONDURULMUŞ (2026-08-15)** — o günkü kod gerçeğinin fotoğrafı; güncellenmez. Güncel durum daima `docs/kararlar/09-DURUM.md`.

> **Amaç:** MentiMentor'daki tüm değerlendirme/test/soru altyapısının GERÇEK durumunu (koddan kanıtlı) tek belgede
> toplamak. Kaynak: 2026-08-15 salt-okuma keşif turu. Her iddia `dosya:satır` ile kanıtlı. Belge niyeti ile kod
> gerçeği çeliştiğinde **kod gerçeği** esas alınmıştır (belge eskimiş olabilir).
>
> **Altın kural:** Bu bir keşif fotoğrafıdır; iş/PR ile durum değişince canonical yer `09-DURUM.md` + `10-yol-haritasi.md`.

---

## 1. ÖZET
Sistemde **6 farklı değerlendirme/ölçme/öğrenme** yapısı var: DISC (mizaç), DISC→OCEAN türetimi, arketip türetimi,
SJT (senaryo→OCEAN kalibrasyonu), sertifika sınavı (mentör yetkinliği) ve öğrenme yolculuğu (rol beceri keşfi).
Bunların çoğu tam kurulu; ancak ürün sahibinin hatırladığı **"mentiye DISC-tipine göre nasıl yaklaşılır" adaptif
sınavı kodda YOK** (yaklaşım yalnız genel senaryolarla öğretiliyor). SJT içerik olarak zayıf (3 soru; belge 4 diyor).
Yönetici, test **sonuçlarının** bir kısmını görür ama **bireysel ham cevapları göremez** (KVKK açısından kontrollü).

---

## 2. TEST / DEĞERLENDİRME ENVANTERİ (6 sistem)

| # | Ad | Ne ölçer/öğretir | Kime | Ne zaman | Sonuç | Kanıt (dosya:satır) |
|---|---|---|---|---|---|---|
| 1 | **DISC (mizaç)** | D/I/S/C mizaç profili | Menti + Mentör | Onboarding (CORE) | `discVector`/`discType` → eşleşme girdisi | `schema.prisma:239-275`; `discVectorService.ts` |
| 2 | **DISC→OCEAN adapter** | Big Five (OCEAN) türetimi | Her ikisi | DISC sonrası (otomatik) | `oceanVector` → eşleşme hesabı | `disc-to-ocean.adapter.ts:12-25` |
| 3 | **Arketip türetimi** | 8 arketip (M1-M4 / m1-m4) | Her ikisi | OCEAN sonrası | `archetype` (tanılayıcı) | `disc-to-ocean.adapter.ts:27-43`; `schema.prisma:929-969` |
| 4 | **SJT** | Senaryo → OCEAN kalibrasyonu (kararsız boyutlar) | Her ikisi | DISC sonrası (adaptif/opsiyonel) | Kısmi OCEAN override; **puansız** | `schema.prisma:862-904`; `sjt-scorer.ts:44-84` |
| 5 | **Sertifika sınavı** | Mentörlük yetkinliği (10 konu, senaryo) | **Yalnız Mentör** | Kayıt/onay sonrası | `certScore` + `isCertified` + `qualityMultiplier` → havuza dahil kapısı | `schema.prisma:1077-1105`; `certification.service.ts:230-242` |
| 6 | **Öğrenme Yolculuğu** | Rol beceri keşfi (yaklaşım, dinleme, güven) | Her ikisi (ayrı yolculuk) | Onboarding sonrası | Tamamlanma zamanı; **puansız (bilinçli)** | `schema.prisma:724-764`; `learningJourney.service.ts` |

> Not: Her satır için hem model hem onu okuyan/yazan kod yolu doğrulandı. Sertifika verisi kurum-içi tutulur
> (`TenantMembership.isCertified`, `schema.prisma:1050`).

---

## 3. OYUNLAŞTIRILMIŞ "MENTİYE NASIL YAKLAŞILIR" DURUMU → 🟡 KISMEN

**VAR (koddan kanıtlı):**
- **Öğrenme Yolculuğu** — 13 aşama (7 mentör + 6 menti), oyunlaştırılmış senaryo, puansız keşif, rol-odaklı yaklaşım öğretimi (`seed-learning-journey.ts`; `learningJourney.service.ts`). **Oyunlaştırmanın asıl olduğu yer burası.**
- **Sertifika** — 10 konu × 2 varyant = 20 senaryo; "menti şöyle davrandı, ne yaparsın" mentörlük yetkinliği (`seed-certification.ts:37-100`).
- **SJT** — senaryo + arketip sinyali (`seed.ts:530-573`).

**KRİTİK BOŞLUK (YOK):**
- **DISC-tipine-özel adaptif yaklaşım** senaryo setinde **ayrılmamış.** "D-tipi mentiye şöyle, S-tipi mentiye böyle yaklaş" gibi mentinin DISC tipine göre uyarlanan soru/seçenek yok. Yaklaşım *genel* öğretiliyor. Aranan terimler (senaryo/roleplay/gamif/disc-approach/situational) → yalnız yukarıdaki genel yapılar bulundu.

**Sertifika bağı:** `isCertified` yalnız **sertifika sınavıyla** set ediliyor (`certification.service.ts:234`); **SJT ile bağlı değil** (ayrı modeller).

**Belge-kod çelişkisi:** `docs/kararlar/03-psikometri-ve-algoritma.md:44-49` "Mini Akademi = 4 pedagojik SJT" diyor; kodda **3 SJT sorusu** + ayrı sertifika var. Belge niyeti tam kodlanmamış (kod gerçeği esas).

---

## 4. YÖNETİCİ YETKİSİ — MÜDAHALE (ekle/düzenle/sil)

| Test/Alan | Ekle | Düzenle | Sil | Kapsam | Kanıt |
|---|---|---|---|---|---|
| DISC soruları | ❌ | ❌ | ❌ | Global, kilitli ("Sistem sorusu") | `questionController.ts:87-91`; `questions/page.tsx:150-175` |
| STK Custom soru | ✅ | ⚠️ backend PATCH var, **UI'da buton yok** | ✅ | **Tenant-scoped** (kendi kurumu) | `questionController.ts:94-147`; `questions/page.tsx:59-75,194-202` |
| Global soru gizleme | ✅ (kendi kurumundan gizle) | — | — | `questionHide` çapraz tablo; DISC gizlenemez | `questionController.ts:180-212` |
| Sertifika konuları | ❌ | ❌ | ❌ | **sadece aç/kapa** (tenant `disabledCertTopics`), red-line kilitli + min-konu guard | `certification/page.tsx:52-66`; `sjtScoringController.ts:169-192` |
| SJT / Öğrenme Yolculuğu soruları | ❌ | ❌ | ❌ | Seed/sistem-yönetimli (admin UI yok) | — |

**Tenant izolasyonu GÜÇLÜ:** yönetici yalnız `tenantId === req.tenant.tenantId` sorularını düzenler (`questionController.ts:132-134`); global sorulara yazamaz (403), sadece kendi kurumundan gizleyebilir.

---

## 5. YÖNETİCİ YETKİSİ — GÖRÜNÜRLÜK (kim ne görür)

| Görünürlük sorusu | Durum | Kanıt |
|---|---|---|
| **Soru/cevap içeriği** (DISC soru metni) | 🟡 **GÖRÜR** (salt-okuma) | `questions/page.tsx:77-78,159-163`; `questionController.ts:72-75` |
| Sertifika senaryoları + SJT içeriği | ❌ **GÖRMEZ** (admin içerik ekranı yok; sertifikada sadece konu aç/kapa) | `sjtScoringController.ts:148-161`; `certification/page.tsx:40-66` |
| **Bireysel cevaplar** (kim testte ne seçti — DISC Likert, sertifika şıkkı, SJT) | ✅ **GÖRMEZ** (admin'e `UserResponse` dönen endpoint yok) | `adminController.ts:231` ("discVector, selfProfile, temperamentJson hariç"); UserResponse admin select'i yok |
| Sonuç: **DISC tipi** | 🟡 **GÖRÜR** (havuz `discType`) | `adminController.ts:254`; `mentor-havuzu/page.tsx:120-128` |
| Sonuç: **ham `discVector`** | ✅ **GÖRMEZ** (kasıtlı hariç) | `adminController.ts:231,253-259` |
| Sonuç: **sertifika durumu/skoru** | 🟡 **GÖRÜR** | `adminController.ts:360-389`; `sertifika-sonuclari/page.tsx` |
| Sonuç: **öğrenme yolculuğu tamamlanma** | ❌ **GÖRMEZ** (admin panelinde sorgu yok; `learningJourneyCompletedAt` gösterilmiyor) | `learning-journey/page.tsx` (yalnız aşama yönetimi) |

**⚠️ KVKK değerlendirmesi:** Tasarım **uyumlu.** Yöneticinin **bireysel ham DISC yanıtlarını ve vektörünü görmemesi** bilinçli/doğru (backend/CLAUDE.md: `discVector`/`discType` PII; ham vektör dönmez). Yönetici yalnız işlenmiş sonuçları (arketip/tip, sertifika skoru) görür — meşru yönetim ihtiyacı. Risk şu an minimal.

---

## 6. SORU/CEVAP ENVANTERİ (fiili durum: a/b/c/d)

Durum kodları: **(a)** soru+cevap tam · **(b)** alan var, içi boş · **(c)** sadece biri var · **(d)** ekleme imkânı hiç yok.

| Test/Alan | Ekleme imkânı | Soru durumu | Cevap durumu | Fiili | Kanıt |
|---|---|---|---|---|---|
| DISC soruları | Admin UI salt-okuma | 16 CORE + 4 DEEPENING (seed) | Likert 1-5 | **(a)** (admin ekleyemez) | `seed-questions.ts:5-26` |
| Sertifika soruları | Admin sadece aç/kapa | 10 konu × 2 varyant = 20 senaryo | seçenek + competencyScore + açıklama | **(a)** (uzman-hazır) | `seed-certification.ts:37-100` |
| SJT soruları | Admin UI yok | **3 soru** (belge 4 diyor) | seçenek + weights | **(a)** ama içerik zayıf/eksik | `seed.ts:530-573` |
| Öğrenme Yolculuğu | Admin UI yok | 13 aşama (7 mentör + 6 menti) | choices + feedback + outcome | **(a)** | `seed-learning-journey.ts` |
| STK Custom sorular | UI'da ekle+sil var | **0 tanımlı** (seed'de yok) | N/A (profil zenginleştirme; DISC skoruna etkisiz) | **(b)** alan var, içi boş | `questions/page.tsx:59-75` |

---

## 7. EKSİKLER / YARIM KALANLAR / YAPILMASI GEREKENLER

| # | Eksik | Neden önemli | Boy | Migration/şema? |
|---|---|---|---|---|
| 1 | **DISC-tipine-özel "mentiye yaklaşım" senaryoları** | Ürün vaadinin çekirdeği; en büyük içerik boşluğu. Mentör, farklı DISC tipine nasıl yaklaşacağını öğrenmiyor | **M–L** | Muhtemelen şema (soru tipi/tetikleme) + seed + UI |
| 2 | **SJT içeriğini belgeyle hizala (3→4+ soru)** | Belge "4 pedagojik SJT / Mini Akademi" diyor, kod 3 soru; kalibrasyon zayıf | **S–M** | Genelde seed; şema gerekmeyebilir |
| 3 | **Admin soru düzenleme UI'ı** | Backend PATCH hazır (`questionController.ts:115-147`) ama UI'da düzenle butonu yok — yarım | **S** | Yok (FE only) |
| 4 | **STK Custom soru hiç kullanılmamış** | Özellik var (ekle/sil), 0 tanımlı soru; değer üretmiyor | **S** (içerik/karar) | Yok |
| 5 | **Öğrenme yolculuğu tamamlanma görünürlüğü** | Yönetici kimin tamamladığını göremiyor; retention/takip için faydalı olabilir | **S** | Yok (select + FE) |
| 6 | **Belge-kod çelişkisi (Mini Akademi 4 SJT)** | `03-psikometri` niyeti kodla uyuşmuyor; ileride yanlış yönlendirir | **S** | Yok (salt-docs) |

---

## 8. AÇIK SORULAR / PO KARARI GEREKENLER
1. **DISC-tipine-özel yaklaşım sınavı** yapılacak mı, yapılacaksa kapsam ne? (ayrı model mi, mevcut SJT'nin genişletilmesi mi — mimari + içerik kararı)
2. **SJT** belge niyetine (4 pedagojik SJT + Mini Akademi) çekilecek mi, yoksa belge mi güncellenecek (kod esas)?
3. **STK Custom soru** özelliği tutulacak mı (0 kullanım) — kaldırılsın mı, örnek içerikle canlandırılsın mı?
4. **Admin soru düzenleme UI'ı** öncelikli mi (backend hazır, küçük iş)?
5. **Öğrenme yolculuğu tamamlanma** yöneticiye gösterilsin mi (retention paneli)?

---
*Kaynak: 2026-08-15 salt-okuma keşif turu (iki paralel Explore bloğu + yönetici görünürlük keşfi). Bu belge fotoğraftır;
canonical güncel durum `docs/kararlar/09-DURUM.md`, sıradaki işler `docs/kararlar/10-yol-haritasi.md`.*
