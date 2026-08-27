# BELGE BİLANÇOSU — TUR 2 / GRUP E (`docs/raporlar/icerik/` — içerik keşfi karar belgeleri)

**📸 DONDURULMUŞ** (bilanço bölümü — 2026-08-26) · Tur 2/GRUP-E · Salt-okuma defter. Kod/DB/PR/commit YOK.

> **Ne bu:** `docs/raporlar/icerik/` altındaki KARAR/PO-NOTU/NİYET içeren 3 ANA belgenin baştan-sona okuma-sayımı.
> Çapraz-kontrol: `T1-A-canonical.md` (numaralı envanter + A1-A23 + Ç1-Ç6) · `T1-B2-kararlar-konu.md` · `T1-B3-kararlar-ozdenetim.md`.
> Numara DOĞURULMADI (yalnız mevcut madde no'ları). Kod SALT-OKUNDU (psikometri/eşleştirme S1 teyidi); DEĞİŞTİRİLMEDİ. DB'ye dokunulmadı.

---

## 0. OKUMA İLERLEME TABLOSU

| belge | toplam satır | okunan satır | durum | kalem |
|---|:---:|:---:|:---:|:---:|
| `tam-soru-dokumu-2026-08-26.md` | 158 | 158/158 | ✅ TAM | 14 (madde 101/102/103 + çelişkiler + felsefe + 8 PO-sorusu + 6 canlı-teyit) |
| `sorular-po-inceleme-2026-08-26.md` | 404 | 404/404 (1-150+151-300+301-405) | ✅ TAM | 3 (68 boş `[ ] PO notu` + kalite-hataları + yapı-gözlemi) |
| `eslesme-uyum-po-inceleme-2026-08-26.md` | 90 | 90/90 | ✅ TAM | 5 (uyum matrisi + tiebreak + %60/%40 + anti-match + hepsi boş `[ ]`) |

**Ana 3 belge: 3/3 TAM okundu. Okunmayan: 0.**

### SAYILMADI (yalnız var olduğu NOT edildi — kalem çıkarılmadı)
- `icerik/bolumler/01-disc.md · 02-sjt.md · 03-sertifika.md · 04-ogrenme-kurumozel.md · 05-felsefe-motoru.md` — **SAYILMADI: ham içerik** (ana belgeler bunları referans veriyor; soru metni, karar kalemi değil).
- `icerik/00-icerik-index.md · disc-sorulari-2026-08-15.md · sjt-sorulari-2026-08-15.md · sertifika-senaryolari-2026-08-15.md · ogrenme-yolculugu-2026-08-15.md · stk-custom-sorular-2026-08-15.md` — **SAYILMADI: ham içerik + BAYAT** (silinmiş `seed-questions.ts`'e dayanır, "20 DISC" der; tam-soru-dokumu bunları açıkça bayat ilan ediyor, §1 kaynak notu).
- Bu SAYILMADI belgelerinde gömülü YENİ karar/PO-notu görülmedi (ana 3 belge onları zaten kapsıyor).

---

## 1. DEFTER — tam-soru-dokumu-2026-08-26.md (158 satır)

**DURUM kodları:** ✅ YAPILDI · 🟡 YARIM · 🔀 PR'DA · ⬜ AÇIK · ❓ TEYİT GEREK · 🗑️ GEÇERSİZ ADAYI

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :48,117-118,125 | **madde 101** — SJT/OCEAN katmanı canlı eşleştirmede OKUNMUYOR (bağlanmamış paralel) | madde 101 | ⬜ AÇIK | **KOD KANITLANDI (madde 101 GERÇEK):** iki ayrı `rankMentorsForMenti` var — `matching.ts:351` (canlı, `computeTotalScore`=DISC+sektör, OCEAN YOK) ↔ `scoring.service.ts:165` (OCEAN'lı, `sjtScoringController.ts:121`'den çağrılıyor, ayrı tüketici). `matching.ts` OCEAN/`oceanO` grep=sonuç yok. TUR-1'de var: T1-A madde 101 (S1 eşleştirme, ⏳ canlı davranış teyidi). NİYET: eşleştirmeye bağlansın mı bilinçli ayrı mı = PO sorusu #4 (aşağıda). NEREDE DURDU: PO kararı bekliyor (tam-soru:137). |
| :117,111-118 | **madde 102** — CORE-eşiği tutarsızlığı (adaptiveTestEngine sabit 5 ↔ questionService dinamik coreCount) | madde 102 | ❓ TEYİT GEREK | **KOD KANITLANDI (çelişki GERÇEK):** `adaptiveTestEngine.ts:22` `MIN_CORE_RESPONSES=5` (sabit; :129,:194'te canlı akışta etkin) ↔ `questionService.ts:117` `coreThreshold=coreCount` (dinamik, tüm CORE sayısı, AYRI tüketici — engine'i çağırmaz). Çakışmıyor ama hangi FE ekranı hangi ilerlemeyi gösteriyor belirsiz. TUR-1'de var: T1-A madde 102 (S1, ⏳ TEYİT FE). NİYET BELGELENMEMİŞ (hangisi doğru davranış). NEREDE DURDU: FE tüketici haritası çıkarılmadı (tam-soru:117). |
| :49,140,88-90 (§7,§11) | **madde 103** — Psikometrik gerekçe BELGELENMEMİŞ/sezgisel (uyum matrisi/%60-40/tiebreak/anti-match/harf eşikleri ampirik kaynaksız) | madde 103 | ❓ TEYİT GEREK | **KOD KANITLANDI (gerekçesizlik GERÇEK):** `scoring.ts:44-49` DISC_COMPATIBILITY elle sabit matris (D:{D60,I75,S30,C85}…); `scoring.ts:20-22` ANTI_MATCH D→S sabit; `discLetters.ts` "başlangıç değerleri, gerçek veri biriktikçe kalibre" itirafı (belge §7 aktarımı). S1-kalite. TUR-1'de var: T1-A madde 103. NİYET (belgede): uzman görüşü / pilot-veri kalibrasyonu iş kalemi olsun mu = PO sorusu #7. NEREDE DURDU: PO kararı bekliyor. **KOD DIŞI kısmı:** "sezgisel değer doğru mu" = ürün/bilim kararı. |
| :15,57,124,30 | **DISC 32 (20 CORE+12 DEEPENING)** — belge "20" bayatı çözüldü (KOD 32) | (çelişik, T1-A Ç3) | ✅ YAPILDI (döküm) | **KOD KANITLANDI:** `seed.ts` CORE/DEEPENING/SJT grep=49 giriş; T1-B2:305 SJT=3 teyidi ile aynı seed. Kod 32 üretir. TUR-1'de var: T1-A Ç3 (DISC 32/canlı ~20). Canlı sayı → **❓ TEYİT GEREK (DB)** (aşağıda canlı-kuyruk 1). |
| :16,58 | **SJT 3 (2 CORE+1 FOLLOWUP)** — belge "4" YANLIŞ, KOD 3 | (çelişik, T1-A Ç4/BÇ1) | ✅ YAPILDI (döküm) | **KOD:** `seed.ts:530` SJT_QUESTIONS=3 (T1-B2:305 teyitli). TUR-1'de var: T1-A Ç4 + T1-B2 BÇ1. Yeni bilgi yok, teyit tekrarı. |
| :17,59,150 | **madde 30** — Sertifika kod 20 ↔ canlı ~5 (seed↔canlı tutarsızlığı) | madde 30 | ⬜ AÇIK | **KOD:** `seed-certification.ts` 20 senaryo. Canlı sayı DB gerektirir → ❓ TEYİT GEREK (DB, canlı-kuyruk 2). TUR-1'de var: T1-A madde 30 (🔴 T73 runner bloke, canlı DB→PO) + madde 73 (güvenli seed runner). PO sorusu #5. |
| :46,47 | **discResultCard OKUNUYOR (ölü değil); enneagramWing yaz-ama-oku-yok** | NUMARASIZ | 🟡 (kısmi çelişki) | **KOD:** discResultCard FE'de okunuyor (`frontend/.../profile.ts` + `onboarding.ts` grep-teyit) → doğru. enneagramWing → **belge "hiçbir yerde okunmuyor" der AMA `temperamentController.ts:60,66` OKUYOR** (grep). → belge beyanı KISMEN yanlış (nüans: eşleştirmede okunmuyor, temperament endpoint'inde okunuyor). ❓ minor. |
| :42-49,90-107 (§7,§11) | **İçerik felsefesi gözlemleri** (reverse-kodlu soru YOK, sosyal-beğenilirlik, SJT ince, tek-persona Zeynep/Deniz, outcome tutarsız) | NUMARASIZ | ⬜ AÇIK | **KOD DIŞI** (içerik kalite felsefesi, soru DEĞİŞTİRİLMEDİ). PO sorusu #8 (hangi kalite düzeltmeleri). belge beyanı; ürün kararı. |
| :94-98 | **Yazım hataları:** I9/D9 "güçlüğüm"→"güçlü yanım", C20/D20 karışık cümle, SJT1 "Menteen"→"Menti'n" | NUMARASIZ | ⬜ AÇIK | **KOD DIŞI** (içerik metni). belge beyanı; PO sorusu #8 kapsamı. Düşük efor düzeltme. |
| :76-86 (§10) | **DISC-DERİNLEŞME zemini ~%50-60 hazır** (adaptif motor+profil güncelleme ✅; #31 aksiyon+netleşme-UX+sınır eksik) | (A1/A4 ile bağlı) | 🟡 YARIM | **KOD:** adaptif CORE→DEEPENING motor VAR (`adaptiveTestEngine.ts`), DEEPENING `discVector` üzerine yazar. TUR-1'de var: T1-A A1 (DISC-DERİNLEŞME 🔵❓ tasarım) + A3 (sınırsız-yeniden karara bağlanmalı) + A4 (içerik keşfi). NİYET (belge §10): kademeli netleşme + karşıya-yaklaşım. NEREDE DURDU: PO sorusu #1/#2 (netleşme UX + sınır kararı). |
| :63-70 (§9) | **#31 boşluğu NEGATİF TEYİT** — DISC-tipe-özel "karşıdakine nasıl yaklaş" içeriği YOK (sıfırdan) | madde 31 | ⬜ AÇIK | **KOD KANITLANDI (yokluk):** grep+3 ajan taraması; `coachingSuggestions.ts` yöneticiye yönelik (mentiye-DISC-yaklaşım değil), discResultCard kendi arketipini anlatır. TUR-1'de var: T1-A madde 31 (🔵 SIFIRDAN, negatif teyit). NİYET: eşleşme kartı doğal ev-sahibi. PO sorusu #3. |
| :139 (§14-6) | **madde 13** — kurum-özel soru cevap-tipi (şıklı/açık-uçlu) migration ister; gerçekten gerekli mi | madde 13 | ⬜ AÇIK | TUR-1'de var: T1-A madde 13 (⏸️ERTELENDİ, migration, kapsam belirsiz→PO) + T1-B3 B8b. NİYET: Likert yeterli mi = PO sorusu #6. NEREDE DURDU: PO kapsam kararı bekliyor. |
| :121-128 (§13) | **Üç ayrık sistem** (DISC→eşleştirme ✅ / SJT-OCEAN→okunmuyor / öğrenme-yolculuğu puansız-timestamp) mimari bulgusu | (madde 101 ile bağlı) | ⬜ AÇIK | **KOD:** madde 101 kanıtıyla aynı. NİYET: DISC-DERİNLEŞME+#31 bu üçünü birleştirmek demek. Yeni bilgi: DISC-DERİNLEŞME'nin mimari kapsamını açıklıyor. |
| :132-141,145-155 | **8 PO-sorusu (numaralı) + 6 canlı-teyit kuyruğu (DB)** | NUMARASIZ | ❓ TEYİT GEREK | 8 soru = yukarıdaki maddelerin PO-karar özeti (1 UX / 2 sınır / 3 #31-biçim / 4 madde101 / 5 madde30 / 6 madde13 / 7 madde103 / 8 kalite). 6 canlı-teyit = DB salt-okuma (DISC/sertifika/SJT/LearningStage/kurum-özel sayısı + FE-progress haritası). Hepsi ❓ TEYİT (DB'ye BU TURDA sorulmadı, kural). |

---

## 2. DEFTER — sorular-po-inceleme-2026-08-26.md (404 satır)

> **⭐⭐ EN KRİTİK BULGU:** Bu belge PO'nun soru-başına işaretleme dosyası — **68 sorunun tamamında `[ ] PO notu:` satırı BOŞ.** PO henüz HİÇBİR soruyu beğendi/beğenmedi/değişsin diye işaretlememiş. Belge HAZIR ama PO-girdisi 0. Bu = A2/A4 (PO "tüm soruları görmek istiyor, sonra ayıracak") işinin **bekleyen çıktısı** — iş açık.

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :14-404 (68 soru) | **68 boş `[ ] PO notu:` — PO işaretlemesi HENÜZ YOK** (32 DISC + 3 SJT + 20 SERT + 13 ÖĞR) | NUMARASIZ | ⬜ AÇIK (PO işi) | **KOD DIŞI** (PO tercih/işaretleme). TUR-1'de var: T1-A A2 (PO tüm soruları görmek istiyor→ayıracak, ⬜ PO işi) + A4 (içerik keşfi, ⬜ kısmen 2026-08-26 yapıldı). YENİ: keşif belgesi ÜRETİLDİ ama PO-işaretleme sıfır → A2/A4'ün "sonra beğendiklerini ayıracak" ayağı AÇIK duruyor. NİYET (belge başlık): beğeni/beğenmeme/değişsin işaretle. NEREDE DURDU: PO'nun okuyup işaretlemesi bekleniyor (belge:2). |
| :44,132 (D9),:88 (D20) | **DISC yazım/dil hataları** (D9 "güçlüğüm", D20 "Kalite hız veya miktardan daha önce gelir" karışık) | NUMARASIZ | ⬜ AÇIK | **KOD DIŞI** (içerik). tam-soru §11 ile aynı; T2-E-1 defterinde de var. PO sorusu #8. |
| :146 (SJT1) | **SJT1 "Menteen" yazım hatası** | NUMARASIZ | ⬜ AÇIK | **KOD DIŞI.** tam-soru:98 ile aynı. PO sorusu #8. |

---

## 3. DEFTER — eslesme-uyum-po-inceleme-2026-08-26.md (90 satır)

> Eşleştirme (DISC uyum) motorunun **sabit-kodlu kararlarının** PO onayına sunumu. TÜM `[ ] PO notu:` satırları BOŞ (17 nokta: 16 kombinasyon + anti-match + tiebreak + %60/%40 + genel). PO onayı HENÜZ verilmemiş.

| kaynak (dosya:satır) | kalem | numara | durum | kanıt |
|---|---|---|:---:|---|
| :19-52 (16 komb.) | **DISC 4×4 uyum matrisi (asimetrik) PO onayına sunuldu — `[ ]` BOŞ** | madde 103 | ❓ TEYİT GEREK (PO) | **KOD KANITLANDI (matris birebir):** `scoring.ts:44-49` D:{D60,I75,S30,C85}/I:{D70,I60,S70,C80}/S:{D35,I70,S75,C65}/C:{D85,I75,S65,C60} — belgedeki düşük/orta/yüksek bantlarıyla TAM örtüşür (≤40 düşük, 41-69 orta, ≥70 yüksek). SEVİYE-1 psikometri. NİYET: PO onaylasın/değiştirsin. NEREDE DURDU: PO onayı bekliyor (boş `[ ]`). |
| :59-60 | **Özel engel: D mentör + S menti tamamen eleniyor (havuz boşsa gevşer)** | madde 103 | ❓ TEYİT GEREK (PO) | **KOD KANITLANDI:** `scoring.ts:20-22` `ANTI_MATCH_RULES=[{mentorDisc:'D',mentiDisc:'S'}]` + `isAntiMatch()`. SEVİYE-1. TUR-1'de var: T1-B2 03:23-28 (hard-gate BLOCKED_PAIRS ✅ kod var). Kod GERÇEK; PO onayı `[ ]` boş. |
| :64-71 | **Tiebreak sırası D>I>S>C PO onayına sunuldu — `[ ]` BOŞ** | (T1-A A/felsefe) | ❓ TEYİT GEREK (PO) | **KOD:** tam-soru §7 (`scoring.ts`/`discLetters.ts` eşitlikte D>I>S>C). SEVİYE-1. NİYET: PO onaylasın. NEREDE DURDU: boş `[ ]`. |
| :75-82 | **%60 sektör / %40 karakter ağırlığı PO onayına sunuldu — `[ ]` BOŞ (kuruma-özel değişebilir notu)** | madde 9/9a | ❓ TEYİT GEREK (PO) | **KOD:** `scoring.ts` %60/%40 varsayılan; T1-A madde 9 (%60/%40 kartı ✅) + 9a (tenant PUT weights ✅ CANLIDA). Mekanizma ✅ ama **VARSAYILAN oranın PO onayı** `[ ]` boş. TUR-1'de var: T1-B2 03:19-21 + 08:23. |
| :86-90 | **Dürüst not: 16 değer+sıralama+ağırlık = sezgisel, bilimsel dayanak YOK; onay ürün kararı** | madde 103 | ❓ TEYİT GEREK (PO) | tam-soru madde 103 ile birebir aynı. KOD DIŞI karar (değerin doğruluğu). PO kararı bekliyor. |

---

## 4. YARIM KALAN İŞLER (gruplu)

### PO bekliyor (girdi/karar PO elinde)
- **68 boş PO-notu** (`sorular-po-inceleme` tümü) — NİYET: PO beğenip/beğenmediğini işaretleyecek (A2/A4). DURDU: PO okuması bekleniyor. **En büyük bekleyen PO-işi.**
- **17 boş eşleştirme PO-notu** (`eslesme-uyum` tümü: 16 komb.+anti-match+tiebreak+%60-40+genel) — NİYET: sabit-kodlu psikometrik kararları PO onaylasın/değiştirsin. DURDU: PO onayı bekleniyor. SEVİYE-1.
- **8 PO-sorusu** (tam-soru §14) — madde 30/13/31/101/103 + DISC-derinleşme UX/sınır + kalite. DURDU: PO kararı.

### Başka işe bağlı
- **madde 30 (sertifika 5→20 canlı)** — madde 73 (güvenli seed runner) + PO onaylı DB yazımına bağlı. NİYET: 20 senaryoyu canlıya taşı. DURDU: runner yok + canlı DB→PO (T1-A madde 30 🔴 T73 bloke).
- **madde 13 (cevap-tipi)** — migration'a bağlı. NİYET: şıklı/açık-uçlu. DURDU: kapsam belirsiz→PO (T1-A ⏸️ERTELENDİ).
- **#31 aksiyon içeriği** — DISC-DERİNLEŞME kurgusuna + eşleşme kartına bağlı. NİYET: tipe-özel yaklaşım ipucu (sıfırdan). DURDU: PO biçim kararı (#3).

### Bilinçli ertelendi
- **6 canlı-teyit kuyruğu (DB)** — NİYET: canlı Question/certification/SJT/LearningStage/kurum-özel sayıları + FE-progress haritası. DURDU: BİLİNÇLİ — bu tur DB'ye komut atmadı (belge:147 "altyapı-kontrol turuna" ertelendi).

### Sebep yazılmamış (DURUŞ SEBEBİ YOK)
- **madde 102 (CORE-eşiği hangisi doğru)** — NİYET BELGELENMEMİŞ (5 mi coreCount mu doğru davranış yazılmamış). NEREDE DURDU: FE tüketici haritası çıkarılmamış, sebep yazılmamış (yalnız "belirsiz" denmiş, tam-soru:117).
- **enneagramWing yaz-oku çelişkisi** — belge "okunmuyor" der ama kod okuyor; niyet (DROP mu bırak mı) yazılmamış.

---

## 5. KESİN SAYIM (TAM SAYI)

- **Ana belge:** 3/3 TAM okundu (158/158 + 404/404 + 90/90). Okunmayan: 0.
- **SAYILMADI (ham/bayat):** 11 belge (5 bolumler + 6 eski 2026-08-15). Bunlarda gömülü yeni karar: 0.
- **Toplam kalem: 22** (tam-soru 14 + PO-inceleme 3 + eslesme-uyum 5).
- **Durum dağılımı (TAM):**
  - ✅ YAPILDI: **3** (tümü "döküm/çelişki çözüldü" — DISC 32, SJT 3; hiçbiri yeni canlı iş değil, kod-döküm teyidi).
  - 🟡 YARIM: **2** (discResultCard/enneagramWing kısmi çelişki · DISC-DERİNLEŞME %50-60 zemin).
  - 🔀 PR'DA: **0**.
  - ⬜ AÇIK: **9**.
  - ❓ TEYİT GEREK: **8** (madde 102 + madde 103 + eslesme-uyum 5 nokta + tam-soru PO-soru/canlı-teyit bloğu).
  - 🗑️ GEÇERSİZ ADAYI: **0**.
- **NUMARASIZ kalem: 10** (madde no taşımayan; 68/17 boş-PO-notu, felsefe, yazım, tiebreak, üç-sistem, mimari).
- **🟡 sayısı: 2** — "NİYET BELGELENMEMİŞ": **0** (her iki 🟡'nin niyeti belgede yazılı: discResultCard kod-teyit + DISC-DERİNLEŞME §10). Ama madde 102 (❓) + enneagramWing = "NİYET BELGELENMEMİŞ/DURUŞ SEBEBİ YOK" (§4 son grup, 2 kalem).
- **YENİ PO-notu kararı (T1'de HENÜZ işlenmemiş):** Ana yeni gerçek = **68+17 boş PO-notu belgesi ÜRETİLDİ** (T1-A A2/A4'ün somut çıktısı, ama PO-girdisi 0 → iş açık). madde 101/102/103 TUR-1'de zaten var (T1-A). eslesme-uyum'un PO-onay-sunumu formatı YENİ (matris/anti-match/tiebreak/%60-40 tek tek PO onayına sunulmuş — T1'de "sabit-kodlu" biliniyordu ama PO-onay-kalemi olarak ayrıştırılmamıştı) → **5 yeni PO-onay kalemi**.
- **Çelişki: 3** (Ç-a: enneagramWing "okunmuyor" belge ↔ kod okuyor · Ç-b: DISC belge-tarihi "20" ↔ kod 32 [=T1-A Ç3, tekrar] · Ç-c: SJT "4" ↔ kod 3 [=T1-A Ç4/BÇ1, tekrar]). Yeni çelişki: 1 (enneagramWing). HAKEM OLMADIM.
- **Kod arandı / ❓ (DB) kalan:** Kod SALT-OKUNDU — teyit edilen: madde 101 (iki ayrı rankMentorsForMenti, matching.ts OCEAN yok) ✅ · madde 102 (5 vs coreCount) ✅ · madde 103 matris/anti-match/tiebreak/%60-40 (`scoring.ts:20-49`) ✅ · SJT=3, DISC seed 32 ✅ · enneagramWing okunuyor (`temperamentController.ts`) ✅ · discResultCard FE'de okunuyor ✅. **DB'ye SORULAMAYAN (❓ TEYİT GEREK-DB): 6 canlı sayı** (canlı DISC/sertifika/SJT/LearningStage/kurum-özel + FE-progress).

---

## KAPANIŞ NOTU (Grup E)
- **3/3 ana belge TAM okundu** (158/404/90). 11 ham/bayat belge SAYILMADI (gömülü yeni karar 0).
- **En çarpıcı gerçek:** İki PO-inceleme belgesi (`sorular-po-inceleme` 68 soru + `eslesme-uyum` 17 nokta) **HAZIR ama tüm `[ ] PO notu:` satırları BOŞ** — PO henüz hiçbir şey işaretlememiş. Bu, T1-A A2/A4'ün ("PO tüm soruları görüp beğendiğini ayıracak") somut ama **bekleyen** çıktısıdır.
- **madde 101/102/103 KOD KANITIYLA DOĞRULANDI** (TUR-1'de ⏳ teyit bekliyorlardı; bu turda salt-okuma kod-teyidi verildi): 101 gerçek (iki ayrı ranking, canlı matching OCEAN okumuyor), 102 gerçek (5≠coreCount, ayrı tüketiciler), 103 gerçek (matris/anti-match/tiebreak/%60-40 sabit + kod-içi "kalibre edilecek" itirafı).
- **Yeni çelişki:** enneagramWing — belge "hiçbir yerde okunmuyor" der ama `temperamentController.ts:60,66` okuyor (nüans: eşleştirmede okunmuyor).
- **eslesme-uyum matrisi kodla BİREBİR** (`scoring.ts:44-49`) — belge doğru aktarmış; onay ürün kararı, kod DIŞI.
- **DB'ye dokunulmadı** (6 canlı-sayı ❓ TEYİT GEREK-DB), **kod değiştirilmedi, PR açılmadı, git commit yapılmadı, numara doğurulmadı, belge silinmedi/taşınmadı.**
- Dosya yazıldı: `docs/raporlar/bilanco/bolumler/T2-E-icerik.md`.
