📸 DONDURULMUŞ · 2026-09-03 · iki salt-okuma keşif turu · kod DEĞİŞMEDİ

# İçerik Ön-Koşul Keşifleri (2026-09-03)

> 🔒 Bu belge iki salt-okuma keşif turunun (2026-09-03) kod-kanıtlı bulgularını kalıcı kılar.
> Bulgular önce yalnız sohbette duruyordu. **Kod/DB/şema DEĞİŞMEDİ; DB'ye komut gitmedi.**
> Canonical statü: `00-KARAR-TAKIP.md` (madde 30·73·145·147·148 + S31) + `10-yol-haritasi.md`.
> Çelişki olursa **kod kazanır** (KURAL 10).
>
> **Kapsam (KURAL 13):** iddialar `backend/prisma/`, `backend/src/` ve `frontend/src/` üzerinden
> dosya:satır kanıtlı. Negatif iddialarda "N terim · M dosya, 0 sonuç" beyanı verildi.

---

## A. SERTİFİKA BANKASI İKİZİ

- **Canlı sertifika kaynağı** = `backend/prisma/senaryo-bankasi-tam.md` (v2). İçerik `seed-certification.ts`'e
  **ELLE GÖMÜLÜ** — markdown import EDİLMİYOR; `seed-certification.ts:7` yalnız yorum satırında kaynağı gösterir.
- **Faz 6 belgesindeki 20 senaryo DAHA YENİ ama KODA GİRMEMİŞ** (`../icerik/faz6-ogrenme-ve-sertifika-2026-09-03.md` §8).
- **7 konu ORTAK · 3'er konu FARKLI:**
  - tam.md'de VAR, Faz 6'da YOK: **aktif dinleme · gönüllü tükenmişliği (STK) · okul-gönüllülük dengesi (STK)**
  - Faz 6'da VAR, tam.md'de YOK: **sürekliliği koruma · kendi sınırını bilmek · bitirme**
- **4 kritik (red-line) konu İKİSİNDE DE AYNI:** geri bildirim · sınır · gizlilik · kriz.
- **Metin farkı örnekleri:** sınır (gece mesajı ↔ arkadaşlık isteği) · gizlilik (başka gönüllü ↔ kurum yöneticisi) ·
  kriz (umutsuzluk / ailede şiddet ↔ menti kayboldu / "yok olsam").
- **Sunum farkı:** tam.md puanlı (0-3) + akademik kaynaklı (CIMER, NCSU); Faz 6 puansız + isim değişkenli + kaynaksız.

### ⭐ PO KARARI (2026-09-03): HARMANLA

Faz 6'nın **yapısı ve isim değişkenleri** alınır; tam.md'nin attığı **3 konu GERİ GELİR.**
Gerekçe: atılan üçü STK bağlamına özgü (kullanıcı kitlesi gönüllü ve öğrenci) ve **aktif dinleme mentörlüğün
temel becerisi.**

### ⚠️ ARİTMETİK SONUÇ — 11 KONU × 2 VARYANT = 22 SENARYO

7 ortak + 3 geri + 3 yeni = 13 konu olurdu (26 senaryo, tasarımdaki 10×2=20'yi aşar). **İki çift birleştirilerek
11'e indirildi:**

- gönüllü tükenmişliği (STK) + kendi sınırını bilmek → **"Kendi kapasiteni bilmek"**
  (varyant A: STK gönüllü tükenmişliği · varyant B: genel kapasite aşımı)
- okul-gönüllülük dengesi (STK) + sürekliliği koruma → **"Sürekliliği koruma"**
  (varyant A: menti sınav dönemi · varyant B: genel devamsızlık)

Sınav yine **8 soru:** 4 kritik garantili + kalan **7 konudan** 4 rastgele (çeşitlilik 6→7, tekrar riski azalır).

⬜ **AÇIK:** 22 senaryonun **METNİ yazılmadı.** İçerik oturumu gerekiyor — 7 konu iki belgede mevcut, 4 konu
(aktif dinleme + iki birleşik + bitirme) yazılacak/uyarlanacak. (numara adayı — bu tur numara verilmedi.)

---

## B. `outcome` ALANI — S31 CEVABI

- **İKİ ayrı `outcome` var:** öğrenme yolculuğu `StageChoice.outcome` (kalem 145'in konusu) · sertifika
  `CertificationOption.outcome` (AYRI sistem — karıştırılmamalı).
- Öğrenme yolculuğunda `outcome` bir **KOLON DEĞİL** — `LearningStage.choices` JSON eleman alanı
  (`learningJourney.service.ts:20` · `schema.prisma:790`), değerleri `correct|warn|wrong`.
- ⭐ **KULLANICININ SEÇİMİ HİÇBİR YERE YAZILMIYOR.** Select ucu yalnız döndürüyor
  (`learningJourneyController.ts:52` · `learningJourney.service.ts:170-198`). Kalıcı olan tek şey
  `TenantMembership.learningJourneyCompletedAt` (`learningJourney.service.ts:206-225`).
- **Kişilik profiline (`ocean*`/`discVector`) giden yol YOK.**
  **KAPSAM BEYANI (KURAL 13):** `learningJourney.service.ts` (553/553 satır) + `learningJourneyController.ts`
  (107/107 satır) tam okundu; aranan **7 terim iki dilde harf-duyarsız** (outcome↔sonuç · profile↔profil · ocean ·
  discVector · discType · personality↔kişilik · score↔puan) → **0 sonuç.**
- **Ek not:** öğrenme yolculuğunda `outcome` kullanıcı-cevabı alanı DEĞİL, **CEVAP ANAHTARI** — kişi onu üretmiyor.

### ⭐ KALEM 145 KÜÇÜLDÜ: "kesme işi" DEĞİL, KORUMA işi

Bugün zaten işlenmiyor; iş = **ileride biri eklemesin diye kuralı yazmak.** (S31 cevabı: outcome profile işlenmiyor.)

---

## C. DÖRT AYRI İÇERİK SİSTEMİ (karıştırılmamalı)

| Sistem | Adet | Kaynak → tablo | Seed güvenliği | İlgili kalem |
|---|---|---|---|---|
| Onboarding DISC | 8 | `onboardingController.ts:109-190` (hardcoded) | seed değil, kod | — |
| Adaptif DISC | 32 | `seed.ts:325` → `Question` | ⚠️ TEHLİKELİ (deleteMany) | madde 33 |
| Öğrenme yolculuğu | 13 (7+6) | `seed-learning-journey.ts` → `LearningStage` | ✅ güvenli (upsert) | 147 · 148 · 144 · 145 |
| Sertifika | 20 | `seed-certification.ts` → `CertificationQuestion` | ✅ güvenli (upsert) | 30 · 149 · 157 · 158 |

- **Onboarding zinciri:** FE `fetchDiscQuestions` → `GET /api/users/disc/questions` → `getDiscQuestions` →
  `ONBOARDING_DISC_QUESTIONS` (8 hardcoded, A/B/C/D kategorik). Kod yorumu (`onboardingController.ts:107`):
  "Question DB modeli kullanılmaz."
- **32 soru AYRI adaptif dashboard testini besliyor** (`GET /api/questions`, Likert 1-5). Canlı doluluk ❓ TEYİT GEREK.

### ⭐ KALEM 148 KAYNAK DÜZELTMESİ

148 **DISC'e DOKUNMAZ.** Değişecek dosya `seed-learning-journey.ts:7` ("13 aşama: Mentör 7 + Menti 6").

---

## D. SEED BLOKERİ — madde 73'ün GERÇEK KAPSAMI

- `backend/prisma/` altında **3 seed dosyası.** Yıkıcı işlem taraması (**7 terim harf-duyarsız:** deleteMany ·
  deleteAll · truncate · dropTable · `.delete(` · executeRaw · `$executeRaw`):
  - `seed.ts` → **15 deleteMany** (`seed.ts:300-318`) ⚠️ TEHLİKELİ
  - `seed-certification.ts` → **0** (yalnız upsert + `updateMany{isActive:false}`)
  - `seed-learning-journey.ts` → **0** (yalnız upsert)
- İkisi de **İDEMPOTENT:** sertifika `code` + `questionId_key` bileşik anahtar; öğrenme yolculuğu deterministik id
  (`seed-ls-mentor-1..7` / `seed-ls-menti-1..6`, `seed-learning-journey.ts:518-522`).
- **İmport zinciri TEK YÖNLÜ:** `seed.ts:12-13` çocukları çağırıyor; çocuklar `seed.ts`'i import ETMİYOR, her biri
  kendi `PrismaClient`'ını kuruyor. Ortak yerel modül yok.

### ⭐ ASİMETRİ — asıl bulgu

- `seed-learning-journey.ts` **tek başına çalışabilir** — doğrudan-çalıştırma muhafızı VAR
  (`seed-learning-journey.ts:534-543`). `seed.ts` deleteMany'si TETİKLENMEZ.
- `seed-certification.ts` **tek başına çalışamaz** — muhafız YOK (`seed-certification.ts:318` fonksiyon kapanışıyla
  biter). Tek yol `seed.ts` main() = önce deleteMany. **madde 73'ün gerçek sebebi budur.**

### ⭐ madde 73 KAPSAM DARALTMASI (kod-teyitli)

Kaynaklar YALNIZ sertifikayı kastediyor:
`10-yol-haritasi.md:232` ("seed-certification.ts runner'a bağlı değil — madde #30'u bloklar") ·
`../bilanco/karar-defteri-2026-08-26.md:196` · `../bilanco/bolumler/T2-C-kod-denetimi.md:90`.
Ama `10-yol-haritasi.md:70` (2026-09-03 öncelik bloğu) bunu **8 kaleme genişletmiş** — bu genelleme
**KOD GERÇEĞİYLE ÇELİŞİYOR** (KURAL 10).

**Bloker kapsamı, kalem kalem:**

| Kalem | Kapsamda mı | Gerekçe |
|---|---|---|
| 147 · 148 | ❌ ÇIKIYOR | güvenli runner zaten var (muhafızlı), idempotent, deleteMany yok |
| 30 | ✅ KALIYOR | runner yok; bugün tek yol deleteMany'li `seed.ts` |
| 149 · 157 · 158 | ❌ zaten değildi | motor mantığı (`certification.service.ts`), seed değil |
| 150 | kısmen | mantık seed'siz; yönlendirme hedefi 147/148'e bağlı |
| 159 | ❌ seed değil | ön koşulu avukat teyidi (faz6 §12) |
| 146 | ❌ seed değil | şema/çözümleme katmanı |

### ⭐ madde 73 ARTIK 9 SATIRLIK İŞ

`seed-certification.ts`'e `seed-learning-journey.ts:534-543`'teki muhafızın **aynısını** eklemek yeter →
deleteMany'siz güvenli standalone.

⚠️ **KALAN GERÇEK BLOKER:** **F.13** (Neon yedeği teyitsiz) — canlı DB işlemi için PO onayı hâlâ ŞART.
Bu ayrı ve geçerli.

---

## ⚠️ KALEM 148 İÇİN İNCELİK (yeni bulgu)

`seed-learning-journey.ts` silinen aşamayı **PASİFLEŞTİRMİYOR** — sertifikadaki `updateMany{isActive:false}` deseni
orada YOK. Kalem 148 menti aşamalarını **6→5** indirecek; salt re-seed eski `seed-ls-menti-6`'yı **aktif öksüz**
bırakır (kullanıcı silinmiş aşamayı görmeye devam eder). Mentör 7→8 sorunsuz (yeni id create).
→ **Pasifleştirme, kalem 148'in kapsamına EKLENMELİ.**

---

## KALEM LİSTESİ (KURAL 9)

| Kalem | Önerilen durum | Numara adayı mı |
|---|---|---|
| 22 senaryonun METNİ (11 konu × 2 varyant) yazılacak — içerik oturumu | ⬜ AÇIK | Evet (içerik turu; madde 30'un içerik ayağı olabilir — PO) |
| Sertifika güvenli-runner muhafızı (9 satır) | ⬜ AÇIK | Hayır (= madde 73'ün kendisi, yeni değil) |
| Pasifleştirme (menti 6→5 öksüz) | ⬜ AÇIK | Hayır (= madde 148 kapsamına eklendi) |
| madde 73 kapsam daraltması (yalnız 30) | 🔀 belge-güncellemesi | Hayır (mevcut madde) |
| madde 145 → KORUMA işi (bugün zaten işlenmiyor) | 🔀 belge-güncellemesi | Hayır (mevcut madde) |
| S31 cevabı (outcome profile işlenmiyor) | ✅ | Hayır (söz kapanışı) |

> **Sayılan birim (KURAL 16):** "22 senaryo" = 11 konu × 2 varyant. "7 konu" = harmanlama sonrası benzersiz konu
> (4 kritik + 3 diğer). "3+3 farklı konu" = iki bankanın simetrik farkı. Bu belge YENİ NUMARA VERMEZ — mevcut
> maddeleri (30·73·145·147·148) günceller; içerik-turu ve olası yeni kalemler PO numaralandırmasına bırakılır.
