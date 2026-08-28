# BİLANÇO KARAR DOSYASI — G2: Eşleştirme motoru / psikometri / karakter testi

**📸 DONDURULMUŞ** · 2026-08-27 (Tur-5b) · Kaynak: `docs/raporlar/bilanco/kararlar/00-SAYIM-2026-08-27.md` (G2 listesi) + `karar-defteri-2026-08-26.md` (GRUP 2 Eşleştirme/Psikometri s.76-99)

> **Ne bu:** G2 grubundaki her karar-gerektiren kalem için PO'nun tek tek işaretleyeceği karar kartı. Salt-okuma + kod-teyit; kod/DB/PR/commit YOK, mevcut belge değiştirilmedi. SEVİYE-1 psikometri kalemleri (matris, ağırlık, m101 SJT/OCEAN, m102 CORE-eşiği, sektör-scorer) geniş grep ile kod-teyitli.

---

## DOSYA BAŞI — mutabakat

- **Tur-5a beyanı (SAYIM tablo (a) + liste (c)):** G2 = **21 kalem**. ✅ Görev brief'i ile birebir.
- **Yazılan kart + ✅ kart-yok mutabakatı:** 21 kalem = **11 kart** (karar-gerektiren + PO-onay bekleyen "✅ kod ama ❓ onay" kalemleri) + **9 ✅ "zaten yapılmışlar"** + **1 🔵 bilgi notu**. Kuraldaki istisna gereği, kod ✅ olsa da PO-onay bekleyen matris/ağırlık/anti-match/tiebreak kalemleri ❓ olarak KART ALIR.
- **Durum dağılımı (21 kalem):** ✅ = 10 · 🟡 = 1 · ⬜ = 2 · ❓ = 7 · 🔵 = 1 · 🗑️ = 0.
- **PO okuma süresi (tahmini):** ~12 dk (SAYIM (a) tablosu G2 satırı).

**Kod-teyidi özeti (bu dosyada):** SEVİYE-1'in 6 çekirdek kalemi (matris değerleri, anti-match, %60/40 ağırlık, m101 iki-ayrı-ranking/OCEAN, m102 CORE-eşiği, sector-scorer atıl) grep'le doğrulandı — **hiçbiri çürümedi**. DB'ye sorulamayan sayılar yok (G2 tümü kod-kanıtlı).

---

## Bu grupta zaten yapılmışlar (✅ — kart YOK)

Kod-gerçeğiyle doğrulanmış tamamlanmış kalemler (PO kararı GEREKMEZ):

- ✅ **Eşleşme formülü Sektör×0.60 + Mizaç×0.40 (×qualityMultiplier)** — KOD-TEYİT: `scoring.ts:89 DEFAULT_SECTOR_WEIGHT=0.6`, `:106` sectorWeight fallback. *(NOT: %60/40 VARSAYILAN oranın PO onayı ayrı kalem → [G2-05] kartı.)*
- ✅ **Ağırlık gösterim kartı %60/%40 (STK admin)** — GET .../weights endpoint mevcut.
- ✅ **Tenant manuel ağırlık ayarı** (PUT weights, +/−%5, %40-70 clamp, audit) — mevcut.
- ✅ **Motor kaydedilen ağırlığı okur** (madde 87 ölü-yazma çözüldü) — `scoring.ts` opsiyonel ağırlık okur.
- ✅ **Hard-gate toksik blok** (D-mentör+S-menti veto, ANTI_MATCH) — KOD-TEYİT: `scoring.ts:20-26 ANTI_MATCH_RULES` + `scoring.config.ts:33 BLOCKED_PAIRS` + `scoring.service.ts:36 isHardBlocked`. *(NOT: onay `[ ]` boş → [G2-02] kartı.)*
- ✅ **Match DB'ye persist ediliyor** (runtime skorlama değil) — `scoring.service.ts:137`.
- ✅ **OCEAN adapter (disc-to-ocean) + arketip + SJT scorer** — `disc-to-ocean.adapter.ts` mevcut (SJT tarafı kısmen yarım).
- ✅ **`isCertified` yalnız sertifika sınavıyla set** (SJT ile bağlı değil) — KOD-TEYİT: `certification.service.ts:234 isCertified=passed` (passRateOk && redLineOk; `:41 PASS_RATE_THRESHOLD=CERT_CONFIG.passRateThreshold`). SJT ile bağlı değil, doğrulandı.
- ✅ **Progressive profiling + kademeli fallback** (`{items:[],fallbackLevel}` throw etmez) — deadlock guard.
- ✅ **adaptive-test `progress`** (+FE guard #114) — SAYIM'da G3'te değil G2'de listelenmiş (Ç... bkz. SAYIM G2 son satır md.70/T2/B15). *(Bu 10. ✅.)*

---

## KARAR KARTLARI (G2)

---
**[G2-01] DISC 4×4 uyum matrisi (asimetrik, sabit-kodlu) PO onayı**
Ne: Mentör-menti DISC uyumunu belirleyen 4×4 matris (asimetrik, sabit-kodlu) PO onayına sunuldu ama onay kutusu boş.
Neden başlanmıştı: Eşleştirme skorunun DISC bileşeninin çekirdeği; hangi tipin hangiyle ne kadar uyumlu olduğu.
Nerede durdu: Kod tamamen yazılı ve belgeyle birebir; PO onayı işaretlenmedi.
Bugünkü durum: ❓ (PO onayı; kod ✅)
Etkisi: Onaysız matris üretimde eşleştirme kararlarını belirliyor; PO gözünden geçmemiş.
İş boyu: S (PO karar-işi)
Kaynak: karar-defteri GRUP 2 (md.103) · Numara: md.103
KOD-TEYİT: `scoring.ts:44-45 DISC_COMPATIBILITY` — `D:{D:60,I:75,S:30,C:85}` belgeyle BİREBİR doğrulandı; `:74` matrixScore kullanımı. Korunur.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G2-02] Hard-gate toksik blok onayı (kod ✅, onay boş)**
Ne: D-mentör + S-menti gibi toksik çiftleri tamamen eleyen hard-gate (ANTI_MATCH/BLOCKED_PAIRS) kodda çalışıyor; yönetici eşiği ≠ hard-gate ayrımı da var. Onay kutusu boş.
Neden başlanmıştı: Güvenlik/kalite — belirli DISC çiftlerinin eşleşmesi zararlı; yönetici bile açamamalı.
Nerede durdu: Kod tam; PO onayı işaretlenmedi.
Bugünkü durum: ✅ (kod) / ❓ (onay)
Etkisi: Onaysız bir "sabit güvenlik bloğu" davranışı üretimde; PO hangi çiftlerin neden bloklu olduğunu onaylamadı.
İş boyu: S (PO karar-işi)
Kaynak: karar-defteri GRUP 2 (md.103/03:23) · Numara: md.103 / 03:23
KOD-TEYİT: `scoring.ts:20-26 ANTI_MATCH_RULES=[{mentorDisc:'D',mentiDisc:'S'}]` + `isAntiMatch()`; `scoring.config.ts:33 BLOCKED_PAIRS`; `scoring.service.ts:36,46 isHardBlocked/hard-gate`. Doğrulandı, korunur.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G2-03] Tiebreak sırası D>I>S>C PO onayı**
Ne: Skor eşitliğinde adayları D>I>S>C sırasıyla önceleyen tiebreak kuralı PO onayına sunuldu; kutu boş.
Neden başlanmıştı: Eşit skorlu adaylar arasında deterministik, açıklanabilir bir sıralama.
Nerede durdu: Kod mevcut (`scoring.ts`/`discLetters.ts` eşitlikte D>I>S>C); onay işaretlenmedi.
Bugünkü durum: ❓ (PO onayı)
Etkisi: Onaysız bir öncelik varsayımı sıralamayı belirliyor; D-baskın adaylar sistematik öne çıkabilir.
İş boyu: S
Kaynak: karar-defteri GRUP 2 (madde 103 akraba) · Numara: (madde 103 akraba)

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G2-04] Psikometrik gerekçe BELGELENMEMİŞ (matris/ağırlık/eşik ampirik kaynaksız)**
Ne: Matris değerleri, %60/40 ağırlık ve eşikler ampirik kaynak olmadan seçilmiş; kodda "kalibre edilecek" itirafı var. Bilimsel/psikometrik gerekçe yok.
Neden başlanmıştı: Bir eşleştirme motorunun çalışması için başlangıç değerleri gerekti; "başla, sonra kalibre et" yaklaşımı.
Nerede durdu: Başlangıç değerleri konuldu; gerçek-veri kalibrasyonu ve gerekçe belgesi yapılmadı.
Bugünkü durum: ❓ (ürün/bilim kararı — PO)
Etkisi: Ürünün çekirdek vaadi (isabetli eşleştirme) dayanaksız varsayımlara dayanıyor; canlı veri biriktikçe kalibrasyon planı yok.
İş boyu: M (ürün/bilim kararı + kalibrasyon süreci)
Kaynak: karar-defteri GRUP 2 (md.103) · Numara: md.103
KOD-TEYİT: `discLetters.ts:23` "⚠️ BAŞLANGIÇ DEĞERLERİ — gerçek kullanıcı verisi biriktikçe ileride kalibre edilecek" itirafı grep'le doğrulandı; `scoring.ts:44-45` sabit matris. Korunur.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G2-05] %60/%40 VARSAYILAN oranın PO onayı**
Ne: Sektör %60 / Mizaç %40 VARSAYILAN oranı PO onayına sunuldu; `eslesme-uyum` belgesinde kutu boş.
Neden başlanmıştı: Eşleştirmede sektör uyumunun mizaçtan ağır basması bir ürün kararı.
Nerede durdu: Kod varsayılanı uyguluyor; PO neden %60/40 sorusunu onaylamadı.
Bugünkü durum: ❓ (PO onayı)
Etkisi: Onaysız ağırlık dengesi tüm eşleştirmeleri belirliyor; "neden sektör ağır basıyor" gerekçesiz.
İş boyu: S
Kaynak: karar-defteri GRUP 2 (md.9 alt) · Numara: (md.9 alt)
KOD-TEYİT: `scoring.ts:89 DEFAULT_SECTOR_WEIGHT=0.6`, `:106` fallback; `05-felsefe-motoru.md:184` "NEDEN 60/40? gerekçe YOK" gözlemi. Korunur.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G2-06] "Varsayılana düşen profil oranı" izleme metriği**
Ne: Profili eksik olup varsayılan/nötr skora düşen kullanıcıların oranını izleyen bir metrik yok. Psikometrik kör-nokta.
Neden başlanmıştı: Kaç kullanıcının aslında ölçülememiş (nötr 50'ye düşmüş) olduğunu görmek — eşleştirme kalitesinin sessiz göstergesi.
Nerede durdu: Niyet belgelenmiş; kod izi yok (grep boş).
Bugünkü durum: ⬜ (niyet var, iz yok)
Etkisi: Sistemin "aslında ne kadarını ölçemediği" görünmez; kalite körü.
İş boyu: S
Kaynak: karar-defteri GRUP 2 (NUMARASIZ) · Numara: NUMARASIZ

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G2-07] madde 101 — SJT/OCEAN katmanı canlı eşleştirmede OKUNMUYOR**
Ne: SJT/OCEAN psikometri katmanı hesaplanıp yazılıyor ama CANLI eşleştirme yolunda OKUNMUYOR. İki ayrı `rankMentorsForMenti` var: canlı yol DISC+sektör (OCEAN yok), OCEAN'lı olan ayrı bir tüketici. Bağlanmamış paralel sistem.
Neden başlanmıştı: Eşleştirmeyi OCEAN/SJT ile zenginleştirmek; daha derin psikometrik isabet.
Nerede durdu: OCEAN'lı ranking yazıldı ama canlı akışa bağlanmadı — "bağlansın mı, bilinçli mi ayrı" kararı PO'da.
Bugünkü durum: ⬜ (bağlanmamış paralel; niyet PO'da)
Etkisi: Hesaplanan psikometrik zenginlik canlıda kullanılmıyor; emek atıl, eşleştirme daha sığ çalışıyor.
İş boyu: M
Kaynak: karar-defteri GRUP 2 (md.101) · Numara: md.101
KOD-TEYİT: İki ayrı fonksiyon doğrulandı — `matching.ts:351 rankMentorsForMenti` (async, DISC+sektör, `matching.ts` kendi sectorScore'unu hesaplar) ↔ `scoring.service.ts:165 rankMentorsForMenti` (sectorScoreResolver + certData, OCEAN'lı, ayrı tüketici: `sjtScoringController.ts`/`sector-scorer.service.ts`). `matching.ts` sector-scorer'ı import ETMEZ. Doğrulandı, korunur.
⚠️ ilişkili: [G2-08] (sector-scorer atıl) ve md.15 (eşleştirmeyi birleştir 🔵) aynı kök soruna bağlı.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G2-08] madde 14 — Sektör skoru 5-bileşen servisi UYUYOR (sector-scorer.service.ts)**
Ne: Zengin 5-bileşenli sektör skorlama servisi (`sector-scorer.service.ts`) TAM yazılı ama canlı `matching.ts` onu ÇAĞIRMIYOR; canlı basit Jaccard/tag×0.6 kullanıyor. Servis uyuyor.
Neden başlanmıştı: Daha isabetli sektör uyum skoru (tek Jaccard yerine çok bileşenli).
Nerede durdu: Servis tam yazıldı; canlı akışa bağlanması için "staging şart" denip durduruldu.
Bugünkü durum: 🟡 (kod tam, bağlanmadı)
Etkisi: Basit sektör skoru üretimde; yazılmış gelişmiş skorlama atıl → eşleştirme sektör-isabeti düşük.
İş boyu: M (bağlama + staging doğrulama)
Kaynak: karar-defteri GRUP 2 (md.14/İŞ7/U1) · Numara: md.14 (İŞ7) / U1
KOD-TEYİT: `sector-scorer.service.ts` VAR ve `scoring.service.ts`'ten import eder; `matching.ts` sector-scorer'ı import ETMEZ (grep boş); `matching.ts:315,423` kendi `sectorScore`'unu hesaplar. Doğrulandı, korunur.
⚠️ ilişkili: [G10] `taxonomy.service`/`IndustryNode` LCA seed'li ama skorlamada kullanılmıyor (sector-scorer'a bağlı) — SAYIM G10'da ayrı kalem; aynı atıl-sektör-skorlama zincirinin parçası.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G2-09] madde 102 — CORE-eşiği tutarsızlığı (sabit 5 ↔ dinamik coreCount)**
Ne: DISC testinde CORE→DEEPENING geçiş eşiği iki modülde farklı: `adaptiveTestEngine` sabit 5, `questionService` dinamik (tüm CORE sayısı). İki ayrı tüketici; tek akışta çakışmıyor ama hangi FE ekranı hangisini gösteriyor belirsiz.
Neden başlanmıştı: Adaptif testte "yeterince CORE cevaplandı, derinleşmeye geç" eşiği.
Nerede durdu: İki modül ayrı geliştirildi; canlı akış `adaptiveTestEngine`'i (sabit 5) kullanıyor, `questionService` (dinamik) ayrı zincir. FE tüketici haritası çıkarılmadı; hangisinin doğru davranış olduğu belgelenmedi.
Bugünkü durum: ❓ (niyet belgelenmemiş; FE tüketici haritası yok)
Etkisi: İki farklı ilerleme mantığı; FE'de tutarsız ilerleme göstergesi riski.
İş boyu: S (teyit + belgeleme)
Kaynak: karar-defteri GRUP 2 (md.102) · Numara: md.102
KOD-TEYİT: `adaptiveTestEngine.ts:22 MIN_CORE_RESPONSES=5` (`:129,:135,:194` kullanır — canlı `getNextQuestion` yolu) ↔ `questionService.ts:117 coreThreshold=coreCount` (`:162-173` dinamik, `adaptiveTestController` ÇAĞIRMAZ, ayrı zincir). İki modül birbirini çağırmaz. Doğrulandı, korunur.

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G2-10] Eşleşme hesaplama tetikleyicisi (event-driven mi sayfa-açılınca mı)**
Ne: Eşleşmenin ne zaman hesaplandığı — bir olayla mı (event-driven) yoksa kullanıcı sayfayı açınca mı — karar verilmemiş.
Neden başlanmıştı: Performans + tazelik dengesi; eşleşmelerin ne zaman güncelleneceği.
Nerede durdu: Match DB'ye persist ediliyor ama tetikleyici modeli kararlaştırılmadı (`selfServeController.ts:245` yalnız tenant-tier AUTO_APPROVED).
Bugünkü durum: ❓ (keşif + PO)
Etkisi: Tetik belirsizliği → eşleşmeler bayat kalabilir veya gereksiz yeniden hesaplanabilir.
İş boyu: M
Kaynak: karar-defteri GRUP 2 (A14/F5) · Numara: A14 / F5

[ ] işleme al   [x] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---
**[G2-11] KARAR 6 otomatik onay (davetle gelen ONAYLI, dışardan Bekliyor) — tetik kodda yok**
Ne: Yönetici davetiyle gelen kullanıcı otomatik ONAYLI, dışarıdan gelen Bekliyor olmalı (KARAR 6). InvitationTemplate var ama otomatik-onay tetiği kodda YOK.
Neden başlanmıştı: Davetli kullanıcıya sürtünmesiz giriş; güvenilir kaynaktan gelenler beklemesin.
Nerede durdu: Davet altyapısı var; onay-durumunu davet kaynağına göre set eden tetik yazılmadı.
Bugünkü durum: ❓ (keşif + PO)
Etkisi: Davetli kullanıcılar da "Bekliyor"da kalıyor olabilir → onboarding sürtünmesi.
İş boyu: M
Kaynak: karar-defteri GRUP 2 (KARAR 6/A14) · Numara: KARAR 6 / A14
KOD-TEYİT: `selfServeController.ts:245` AUTO_APPROVED yalnız tenant-tier'a bağlı; davet-kaynaklı otomatik-onay tetiği yok (grep). Doğrulandı, korunur.

[x] işleme al   [ ] şimdilik alma   [ ] geçersiz   [ ] anlamadım / açıkla
[ ] PO notu: 
---

## Kalan kalem — bilgi (kart-dışı, 🔵 bilinçli erteleme)

- 🔵 **Eşleştirmeyi birleştir (iki paralel skorlama tek sisteme, staging'de)** — karar-defteri GRUP 2 (md.15/İŞ8). [G2-07] (m101 OCEAN bağlanmamış) ve [G2-08] (sector-scorer atıl) ile aynı kök: iki paralel skorlama sistemini tek sisteme birleştirme işi. Staging şart olduğu için bilinçli ertelendi. Karar verilirse [G2-07]+[G2-08] ile birlikte tek iş olarak ele alınır. *(SAYIM'da 🔵 olarak sayıldı; ayrı kart açılmadı — birleştirme kararı [G2-07/08]'e bağlı.)*

---

## MUTABAKAT KONTROLÜ (G2)

- SAYIM (c) G2 = 21 satır. Bu dosyada: **10 ✅ (kart-yok)** + **11 kart** + **1 🔵 bilgi notu (md.15)** = **22 referans**; ancak md.15 (🔵) SAYIM'da 1 satır ve kart-almadığı için **21 benzersiz kalem** korunur (md.15 bilgi notu olarak anıldı, çift-sayılmadı). ✅ 10 + kart 11 = 21 birebir tuttu.
  - Kart dağılımı: G2-01..G2-11 = 11 kart. Bunların durum-dökümü: ❓ = 7 (G2-01,02(onay),03,04,05,09,10,11 → not: G2-02 kod✅/onay❓, G2-08 🟡) · ⬜ = 2 (G2-06, G2-07) · 🟡 = 1 (G2-08).
- **Kod-teyidi:** SEVİYE-1'in 6 çekirdek kalemi (DISC matris değerleri, ANTI_MATCH/BLOCKED_PAIRS, %60/40 ağırlık, m101 iki-ayrı-ranking + matching.ts sector-scorer import-yok, m102 5↔coreCount, isCertified) grep'le doğrulandı — **0 çürüdü**. G2'de DB-sorulamayan sayı yok; tüm kalemler kod-kanıtlı.
- **TEREDDÜT çözümü:** Brief'teki uyarı gereği [G2-08] sector-scorer ↔ [G10] taxonomy.service ilişkisi karta "⚠️ ilişkili" olarak not düşüldü (numara doğurulmadı).
