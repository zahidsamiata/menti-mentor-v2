> 🌡️ ILIK — gerektiğinde okunur (rutin turda değil). Okuma kuralı: OTONOM-PROMPT.txt § 0.4
> TÜR: 🌡️ · SON DOĞRULAMA: ❓ içerik denetlenmedi (başlık 2026-09-23 DA turunda eklendi) · TAZELEME TETİKLEYİCİSİ: ilgili kod ya da karar değişince

# 03 — PSİKOMETRİ VE EŞLEŞTİRME ALGORİTMASI
**🔄 YAŞAYAN** (canonical: psikometri ve eşleştirme algoritması)
**Son güncelleme:** 2026-08-02 · Kaynak: psikometri/algoritma chat'i (ana), repo-inceleme chat'i

> UYARI: Bu tasarımın çoğu psikometri chat'inde kodlandı ama bazı parçalar reçete/tasarım
> aşamasında kaldı (⏳ ile işaretli). Kod iteratif değişti — "en son hali" esastır.

## MODEL TEMELİ
- **DISC görünür + Big Five (OCEAN) motor.** Kullanıcıya sezgisel arketipler gösterilir; algoritma altta OCEAN sürekli boyutlarında çalışır. 🟢✅ · 🟨 kısmen (doğrulama 09-28) — var: `backend/src/services/disc-to-ocean.adapter.ts` · eksik: canlı eşleştirme OCEAN okumuyor (`backend/src/services/matching.ts:3` DISC+sektör) → F-11 (00-KUYRUK) · madde 101
- Gerekçe: MBTI/Enneagram düşük psikometrik geçerlilik; Big Five ampirik olarak en sağlam.
- **Adapter stratejisi:** DISC silinmez, üstüne adapter (köprü). `discToOcean` ile OCEAN türetilir; O ve N (DISC'te zayıf) SJT ile override edilir. Bağlam: `disc-to-ocean.adapter.ts`.

## 8 ARKETİP (4 mentör + 4 menti) 🟢✅ · 🟨 kısmen (doğrulama 09-28) — var: `backend/src/services/scoring.config.ts:33-34` (M1-M4/m1-m4) · eksik: arketip yalnız uyuyan `scoring.service.ts` yolunda; canlı `matching.ts` kullanmıyor → F-11 / PS-A3 (00-KUYRUK)
- **Mentör:** Mimar (M1), Kâşif (M2), Çoban (M3), Komutan (M4).
- **Menti:** İnşaatçı (m1), Gezgin (m2), Tohum (m3), Atılgan (m4).
- 4×4=16 hücre yönetilebilir çözünürlük.

## EŞLEŞME FORMÜLÜ 🟢✅ · doğrulama 09-28: `backend/src/services/scoring.ts:106-109,118-121` (canlı çarpan sınırı 0.8–1.2)
- **Toplam = (Sektör × 0.60) + (Mizaç × 0.40), sonra × qualityMultiplier** (0.7–1.15 clamp).
- **Hard-gate = kapı, çarpan ≠ toplam terimi:** Toksik eşleşme skorlama ÖNCESİ elenir (Gate→Score). Mentörlük yetkinliği toplama eklenmez, çarpan olarak modüle eder.
- Bağlam: `calculateMatchScore`, `scoring.service.ts`. (DİKKAT: bu fonksiyon 3 kez değişti — temel→çarpan→sertifika kapısı; en son hali kullanılmalı.)

## HARD-GATE (TOKSİK BLOK) 🟢✅ · 🟨 kısmen (doğrulama 09-28) — var: D↔S anti-match canlı (`backend/src/services/scoring.ts:24`) · eksik: M4-m3 arketip vetosu yalnız uyuyan `scoring.service.ts:36` → F-11 (00-KUYRUK)
- M4-m3 (Komutan-Tohum) toksik → **kesinlikle bloklanır** (mutlak veto, override edilemez).
- M1-m4 çatışma, M3-m3 düşük (gelişimsiz).
- Anti-match: D tipi mentör + S tipi menti bloklu (toksik dinamik riski).
- Bağlam: `BLOCKED_PAIRS` (scoring.config.ts).
- **Yönetici eşiği ≠ hard-gate:** Yönetici kalite eşiğini oynatabilir ama güvenlik bloğunu (toksik) açamaz. Panelde ayrı gösterilmeli.

## SJT (Durumsal Yargı Testi) & YANIT FORMATI 🟢✅ · 🟨 kısmen (doğrulama 09-28) — var: `backend/src/services/sjt-scorer.ts` · `backend/prisma/schema.prisma:927` (MOST_LEAST) · eksik: SJT/OCEAN canlı eşleştirmede okunmuyor → madde 101 / PS-A2 (00-KUYRUK)
- Likert ("1-5 puan ver") REDDEDİLDİ → senaryo-bazlı SJT (sosyal arzu edilebilirliğe dirençli).
- **İki katmanlı soru:** CORE (zorunlu, ilk girişte %70 profil) + FOLLOWUP (opsiyonel/adaptif, kararsız boyutlarda tetiklenir).
- **KATMANLI HİBRİT format:** CORE = Single-Select, FOLLOWUP = Most/Least. Saf multi-select + şık-başı Likert REDDEDİLDİ.
- Gerekçe: Multi-select vektör iptali (signal cancellation) yaratır; Likert faking'e açık; Most/Least "en az" şıkkı ters katsayıyla (-0.5) sinyali güçlendirir.
- Bağlam: `sjt-scorer.ts`, `answerFormat` enum (SINGLE / MOST_LEAST).
- **CAT/IRT reddi (Sprint 1):** Gerçek IRT/CAT yerine statik "kararsızlık bayrağı" (40-60 bandı); veri ileride CAT'e geçecek formatta saklanır.

## SEKTÖR SKORU (%60'ın içi) 🟢 reçete / ⏳ kod bekliyor
- 5 alt-metrik: Ana Sektör %30, Beceri Kesişimi %25, Hedef-Uzmanlık Hizalaması %25, Kıdem Delta %15, Ortak Bağlam %5.
- Taksonomi: hiyerarşik ağaç (IndustryNode) + en yakın ortak ata (LCA, embedding değil); beceriler asimetrik kapsama (payda=menti); kıdem çan eğrisi (3-8 yıl ideal).
- **DURUM:** ~~Reçete onaylandı ama kod YAZILMADI — şu an stub (nötr 50 dönüyor). ⏳~~ ⚠️ ÇELİŞKİ (2026-09-23, CS raporu): kod gerçeği farklı — `backend/src/services/sector-scorer.service.ts:7` ağırlık formülü (`W={A:0.30,B:0.25,C:0.25,D:0.15,E:0.05}`) + `:67 resolveSectorScore` **TAM yazılmış** (stub değil). ANCAK `matching.ts` bu servisi **0 kez import ediyor** (grep-teyitli) → yazılmış-ama-bağlanmamış/atıl. İki taraf da doğru: skorlayıcı var, motora bağlı değil. Karar/bağlama PO'nun (KARAR-10 aşamalı). Kanıt: `sector-scorer.service.ts:7,67` · `matching.ts` (0 import).
- Uyuyan `sector-scorer.service.ts` ile bağlantılı (bugünkü teşhiste görüldü).

## MENTÖRLÜK YETKİNLİĞİ & SERTİFİKASYON 🟨 kısmen (AJ-101, 2026-09-28) — var: sertifika kapısı + kırmızı-çizgi + 2 başarısızlık sonrası 24s bekleme + aktif konuların %80'i eşiği (`backend/src/services/certification.service.ts:27-38,52`) · yok: "Mini Akademi 4 modül" (kodda/ön yüzde yapılmadı; yapılıp yapılmayacağı → KARAR-127) · geçmiş: `docs/arsiv/belge-senkron-2026-09-28.md` § AJ-101
- **3. sütun: Mentörlük Yetkinliği** — 5 boyut (P1 Pedagoji, P2 Geri bildirim, P3 Empati, P4 Adanmışlık, P5 Uyarlanabilirlik).
- **"Önce Eğit, Sonra Kalibre Et":** Sertifikasyon = kabul kapısı (0→1); kalite çarpanı = gerçek performans (1'den başlar). Yeni mentör düşük çarpanla yargılanmaz.
- **Mini Akademi:** 4 modül (Yönlendir/Dinle/Güvenli alan/Sınırlar), ~6 dk puansız + ~~[ESKİ · düzeltildi 2026-08-17] 4 pedagojik SJT~~ → **kod gerçeği 3 SJT** (bkz. alttaki ⚠️ GÜNCELLEME).
  > ⚠️ GÜNCELLEME (2026-09-28, AJ-101): **Mini Akademi modülleri kodda YOK** (ön yüz + backend; `certification.service.ts` yalnız sertifika konularını yönetir) → durum "yapılmadı"; yapılıp yapılmayacağı ürün kararı **KARAR-127** (cevapsız).
  > ⚠️ GÜNCELLEME (2026-08-17): **BELGE-KOD ÇELİŞKİSİ — kod gerçeği = 3 SJT, "4" tasarım niyetidir.** `backend/prisma/seed.ts` `SJT_QUESTIONS` dizisinde **tam 3 soru** var (Q_MENTOR_CORE_01, Q_MENTI_CORE_01, Q_MENTI_FOLLOWUP_N_01, satır 530-573; doğrulandı) — ve bunlar OCEAN kalibrasyonu içindir, "Mini Akademi" modülü olarak kodlanmamıştır. İçeriği 4'e (niyet) genişletme = seed+içerik işi → **PO kararı** (yol haritası #33). Kod DEĞİŞMEDİ; yalnız bu not eklendi (envanter/içerik raporları da "kod 3, belge 4" der).
- ~~[ESKİ · 2026-09-28] **Baraj 65 + kırmızı-çizgi + cooldown:** 12 puan üzerinden %65 baraj VE hiçbir kırmızı-çizgi (isRedLine) sorusunda 0 puanlık şık seçilmemeli; 2. başarısızlıktan sonra 24s cooldown; baraj geçen çarpan=1.0.~~
  > ⚠️ GÜNCELLEME (2026-09-28, AJ-101): **baraj = aktif konuların %80'i ilk denemede geçilmeli (yukarı yuvarlanır), "12 puan üzerinden %65" DEĞİL** (T4 kararı) · kırmızı-çizgi korunuyor · 2 başarısız denemeden sonra 24 saat bekleme · sertifika alınınca çarpan 1.0 — kanıt: `backend/src/services/certification.service.ts:27-38` (`CERT_CONFIG.passRateThreshold: 0.8`, `attemptsBeforeCooldown: 2`, `cooldownHours: 24`) · `:52` `requiredToPass`.
- Bağlam: `certification.service.ts`, PASS_THRESHOLD=65, CERT_CONFIG (passRateThreshold 0.8).

## PROGRESSIVE PROFILING & FALLBACK 🟢✅ · doğrulama 09-28: `backend/src/services/matching.ts:52,128` · `backend/src/services/scoring.ts:118-121`
- Test yarım kalsa da kesirli DISC vektörü + confidence skoru.
- **Kademeli fallback:** Eşleşme yoksa filtreler sırayla gevşer (Seviye 0→3). Boş sonuç HATA DEĞİL, geçerli durum → `{ items: [], fallbackLevel }` döner, throw etmez. [P0 güvenlik — boş havuzda deadlock olmamalı]
- **Geri bildirim döngüsü:** Son 10 görüşme ±%20 kalite çarpanı; <3 görüşme = 1.0 (yeni mentöre ceza yok).

## MULTI-TENANT KİMLİK
- User global (tek e-posta); TenantMembership pivot'ta tenant'a özel role/isCertified/qualityMultiplier; UserProfile tenant-scoped. Aynı kişi A'da mentör B'de menti olabilir. `@@unique([userId, tenantId])`.
- Match tenant-scoped (kurumlar arası eşleşme yok).

## AÇIK SORULAR (detay: 08-acik-sorular.md)
- Sektör ağırlıkları (30/25/25/15/5) nihai mi? ❓ (kullanıcı "reçete harika" dedi ama tek tek onaylamadı)
- Eşleşme hesaplama tetikleyicisi event-driven mi sayfa-açılınca mı? ❓
- Baraj "0 puan" kuralı tüm sorularda mı sadece isRedLine'da mı? (şu an sadece isRedLine)
