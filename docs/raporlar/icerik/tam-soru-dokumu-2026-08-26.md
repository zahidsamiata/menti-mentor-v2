# Tam Soru Dökümü + Puanlama/Felsefe Analizi (2026-08-26)

**🟢 BYPASS (yalnız-belge) · 📸 DONDURULMUŞ (2026-08-26)** — kaynak: backend seed dosyaları + servis kodu (kod gerçeği). Kullanıcı yanıtı/PII **yoktur**.

> **Bu belge NEDEN var:** Ürün sahibi tüm değerlendirme sorularını görüp beğendiklerini/beğenmediklerini ayırmak istiyor; dört iş (DISC-DERİNLEŞME kurgusu, #31, #13, #30) bu keşfe bağlı. Mevcut `raporlar/icerik/` belgeleri **bayat** (silinmiş `seed-questions.ts`'e dayanıyor, "20 DISC" diyor). Bu belge her şeyi **koddan** yeniden çıkardı.
>
> **Nasıl okunur:** Bu = **tam teknik döküm** (analiz + kanıt). Soru **metinleri** bölüm dosyalarında (`bolumler/*.md`), tekrar edilmedi (referans verildi). Ürün sahibi işaretleme için iki sade dosya ayrı: `sorular-po-inceleme-2026-08-26.md` (68 soru) + `eslesme-uyum-po-inceleme-2026-08-26.md` (eşleştirme uyum kararı).

---

## 1. Tek bakışta — sayılar (kod gerçeği)

| Test | Kaynak | Sayı (KOD) | Ne ölçüyor | Puan/eşik? |
|---|---|---:|---|---|
| **DISC kişilik** | `seed.ts:30-184` | **32** soru (20 CORE + 12 DEEPENING; D/I/S/C × 8) | DISC boyutları | Likert 1-5, boyut skoru |
| **SJT (durumsal)** | `seed.ts:530-573` | **3** senaryo (2 CORE + 1 FOLLOWUP) | **OCEAN (Big Five)** + arketip | OCEAN ağırlıkları |
| **Sertifika** | `seed-certification.ts:37-257` | **20** senaryo (10 konu × 2 varyant) | Mentörlük yetkinliği | 0-3 puan + baraj |
| **Öğrenme yolculuğu** | `seed-learning-journey.ts:39-499` | **13** aşama (7 mentör + 6 menti) | Öğrenme (senaryo) | **PUAN YOK** (timestamp) |
| **Kurum-özel** | `Question`/STK_CUSTOM | (dinamik) | Kurumun kendi amacı | Likert 1-5 |

> **Toplam PO'ya sunulan soru:** 32 + 3 + 20 + 13 = **68** (kurum-özel hariç; o dinamik/kuruma bağlı).
> Tam metinler: [`bolumler/01-disc.md`](bolumler/01-disc.md) · [`02-sjt.md`](bolumler/02-sjt.md) · [`03-sertifika.md`](bolumler/03-sertifika.md) · [`04-ogrenme-kurumozel.md`](bolumler/04-ogrenme-kurumozel.md) · [`05-felsefe-motoru.md`](bolumler/05-felsefe-motoru.md).

---

## 2-6. İçerik dökümleri → bölüm dosyaları (tam metin orada)

Ham dökümü burada tekrar etmiyoruz (bağlam koruması). Her testin **soru-şık-puanlama** tam dökümü kendi dosyasında, kanıt (dosya:satır) ile:

- **2. DISC** → [`bolumler/01-disc.md`](bolumler/01-disc.md) — 32 sorunun 32'si, D/I/S/C dağılımı, "20 vs 32" çözümü.
- **3. SJT** → [`bolumler/02-sjt.md`](bolumler/02-sjt.md) — 3 senaryo + OCEAN ağırlıkları + arketip sinyalleri.
- **4. Sertifika** → [`bolumler/03-sertifika.md`](bolumler/03-sertifika.md) — 20 senaryo (80 şık) + baraj/red-line mantığı.
- **5. Öğrenme yolculuğu** → [`bolumler/04-ogrenme-kurumozel.md`](bolumler/04-ogrenme-kurumozel.md) — 13 aşama tam metin.
- **6. Kurum-özel altyapı** → aynı dosya (GÖREV B) — `Question`/`STK_CUSTOM`, DISC kilidi, #13.

---

## 7. Puanlama ve felsefe motoru (özet — tam analiz `bolumler/05`)

Kaynak + kanıt: [`bolumler/05-felsefe-motoru.md`](bolumler/05-felsefe-motoru.md). Ana bulgular:

- **Adaptif test:** CORE sıralı → en az 5 CORE yanıtı sonrası **baskın boyut** hesaplanır → DEEPENING **yalnız baskın boyutta** açılır (`adaptiveTestEngine.ts`).
- **discVector:** Likert 1-5 → [0..1] → boyut ortalaması → normalize (D+I+S+C = 1.0). Ters (reverse) kodlanan soru **yok** (hepsi pozitif yön).
- **Harf:** midline `0.25` üstü boyutlar gösterilir; baskının %75'i üstündekiler BÜYÜK harf. Eşitlikte sıra **D > I > S > C**. Baskın+ikincil ("DI"/"Di").
- **Eşleştirme uyumu:** `scoring.ts` **elle sabit yazılmış 4×4 tablo** (asimetrik) + sektör/DISC **%60/%40**. **D mentör → S menti** için anti-match kuralı var.
- **discResultCard** ("aha" kartı): üretiliyor **ve OKUNUYOR** (FE profil) — ölü değil.
- **OCEAN:** DISC'ten türetiliyor + UserProfile'a yazılıyor. **enneagramWing:** yazılıyor ama **hiçbir yerde okunmuyor** (yaz-ama-oku-yok).
- ⚠️ **SJT/OCEAN → `rank-mentors` sıralaması hesaplanıyor AMA canlı eşleştirme (`matching.ts`) bunu OKUMUYOR** — bağlanmamış paralel katman (kod yorumu + grep teyitli). → **madde 101.**
- ⭐⭐ **Psikometrik gerekçe BELGELENMEMİŞ/sezgisel:** tiebreak sırası, %60/%40, 16'lık uyum matrisi değerleri, anti-match kuralı, harf eşikleri — hiçbiri için ampirik/teorik kaynak YOK. Kod bunu dolaylı itiraf ediyor (`discLetters.ts:23` "başlangıç değerleri — gerçek veri biriktikçe kalibre edilecek"). → **madde 103.**

---

## 8. Sayı çelişkileri — verdikt (KOD kazanır)

| Test | Belge diyor | KOD diyor | Verdikt |
|---|---|---|---|
| DISC | 20 | **32** (20 CORE + 12 DEEPENING) | Belgedeki "20" yalnız **CORE dilimi**; banka **32**. Eski "20" = silinmiş `seed-questions.ts` (backend `5745e0f`). |
| SJT | 4 | **3** (2 CORE + 1 FOLLOWUP) | Belge "4" **YANLIŞ**; seed'de 3 senaryo. |
| Sertifika | ~5 (canlı) | **20** (kod) | Kod 20 içerir; **canlı sayısı ⏳ TEYİT GEREK** (DB — bu turda sorulmadı). |

---

## 9. #31 boşluğu — "karşındakine nasıl yaklaşmalısın" içeriği

**NEGATİF TEYİT: yok.** Grep + üç ajan taraması: DISC tipine göre **"karşı taraf X tipse şöyle yaklaş"** üreten hiçbir içerik/fonksiyon YOK.

- `coachingSuggestions.ts` VAR ama **yöneticiye** yönelik kural-bazlı öneri (disiplin/görüşme sıklığı/check-in) — mentiye-DISC-yaklaşım DEĞİL.
- `discResultCard` kişinin **kendi** arketipini/gücünü anlatır (`compatibleWith` listesi var ama "nasıl yaklaş" metni yok).
- Öğrenme yolculuğu **sabit kurgudur** (aşağıda), DISC tipine göre dallanmaz.
- **Sonuç:** #31 sıfırdan yazılacak. **Doğal ev-sahibi (öneri, dayatma değil):** eşleşme sonrası mentör/menti kartı — karşı tarafın discType'ı zaten biliniyor; oraya tipe-özel kısa "yaklaşım ipucu" bloğu eklenebilir. PO'nun DISC-DERİNLEŞME fikrinin "aksiyon" ayağı tam budur.

---

## 10. Derinleşme zemini — PO fikrinin ne kadarı hazır?

PO fikri: tek-seferlik test yerine **kademeli derinleşme** (kişi kullandıkça karakteri netleşsin) + sonra **karşıdakine nasıl yaklaşılacağı**.

| PO fikrinin parçası | Kodda durum | Hazırlık |
|---|---|---|
| Kademeli/adaptif test | ✅ VAR — CORE→DEEPENING adaptif motor | **Hazır** |
| Profilin güncellenmesi | ✅ VAR — DEEPENING sonucu `discVector` **ÜZERİNE yazar** | **Hazır** ama... |
| "Netleşiyor" hissi / ilerleme | ⚠️ `confidence` hesaplanıyor ama kullanıcıya **kademeli netleşme** göstergesi yok | Kısmi |
| Tekrar derinleşme sınırı | ⚠️ **Sınır YOK** — kullanıcı sınırsız yeniden yapabilir, her sefer üzerine yazar | Karar gerek |
| "Karşıdakine nasıl yaklaş" (aksiyon) | ❌ YOK (#31) | **Sıfırdan** |

**Verdikt (kaba tahmin):** Altyapının **~%50-60'ı hazır** (adaptif motor + profil güncelleme çalışıyor). Eksik: (a) #31 aksiyon içeriği (en büyük parça, sıfırdan), (b) "karakter netleşiyor" ilerleme deneyimi/UX, (c) sınırsız-yeniden-yazma davranışının bir karara bağlanması (her derinleşme profili değiştiriyor — istenen bu mu?).

---

## 11. İçerik kalite gözlemleri (gözlem — soru DEĞİŞTİRİLMEDİ, PO karar verir)

**DISC:**
- ⚠️ **Ters-kodlanan (reverse) soru YOK — hepsi pozitif yön.** Bu, "hep katılıyorum" eğilimini (acquiescence / sosyal beğenilirlik yanlılığı) ölçemez; psikometrik zayıflık.
- **Sosyal beğenilirlik:** bazı DEEPENING ifadeleri "doğru cevabı" belli eder (ör. D28 "sakin ve yapıcı tutum sergilerim", C31 "en ufak hatayı düzeltmek isterim") — çoğu kişi katılır.
- **Dil:** I9 *"doğal bir güçlüğüm gibi hissettiriyor"* — "güçlüğüm" muhtemelen "güçlü yanım" olmalı (yazım). C20 *"Kalite, hız veya miktardan her zaman daha önce gelir"* — cümle yapısı biraz karışık.

**SJT:**
- **Yazım:** Senaryo 1 *"Menteen"* → "Mentin/Menti'n" olmalı.
- **Kapsam:** yalnız **3 senaryo** ile 5 OCEAN boyutunu ölçmek çok ince; boyut başına ~yeterli sinyal yok.

**Öğrenme yolculuğu:**
- **Tek sabit kurgu:** mentee hep **"Zeynep"**, mentör hep **"Deniz"**. İçerik kaliteli/sıcak, Türkiye-STK bağlamına uygun (dernek/gönüllü). Ama tek persona → çeşitlilik yok, DISC tipine göre dallanmıyor.
- **Outcome yapısı tutarsız:** T3'te **"wrong" yok** (1 correct + 2 warn); T4'te sıra a=correct/b=**wrong**/c=warn; M3'te 2 "wrong". Bilinçli olabilir ama aşamalar arası tutarsız.

**Sertifika:** İçerik güçlü; red-line konular (kriz/gizlilik/sınır) net. Şık dengesi iyi (her senaryoda 3/2/1/0 puan bandı). Gözle çarpan tekrar/dengesizlik yok (tam döküm `bolumler/03`).

**Genel örüntü:** İçerik editoryal olarak **iyi yazılmış**; ana zayıflıklar **psikometrik** (reverse yok, SJT ince, gerekçe belgesiz) ve **mimari** (üç sistem birbirine bağlı değil — bkz. §12 altı).

---

## 12. ⚠️ CORE-eşiği tutarsızlığı (ayrı başlık — kanıt)

Kodda **iki** ilerleme/eşik modeli var:
- `adaptiveTestEngine.ts`: sabit **`MIN_CORE_RESPONSES = 5`**.
- `questionService.ts`: dinamik **`coreThreshold = coreCount`** (tüm CORE sayısı).

**Çağrı zinciri kanıtı (canlı yol):** `userRoutes.ts:131 → adaptiveTestController.ts → adaptiveTestEngine.getNextQuestion` → yani **canlı soru-seçim akışında sabit `5` etkin**. `questionService`'in dinamik eşiği **ayrı bir tüketici** (engine'i çağırmaz). İkisi tek akışta çakışmıyor ama **hangi FE ekranının hangi ilerlemeyi gösterdiği belirsiz** → **TEYİT GEREK (FE tüketici haritası)**. → **madde 102.**

---

## 13. Ekstra mimari bulgu — üç ayrık sistem

Kod gerçeği: üç değerlendirme sistemi **birbirine bağlı değil**:
1. **DISC** (32 soru) → discVector → **canlı eşleştirmeyi besler** ✅
2. **SJT/OCEAN** (3 senaryo) → OCEAN + rank-mentors → **canlı eşleştirme OKUMUYOR** (madde 101) ⚠️
3. **Öğrenme yolculuğu** (13 aşama) → puan yok, timestamp → eşleştirmeyle ilgisiz (tasarımı böyle)

PO'nun DISC-DERİNLEŞME + #31 kurgusu, aslında bu üçünü (özellikle 1 ve eksik "aksiyon" katmanını) **anlamlı biçimde birleştirmek** demektir.

---

## 14. PO'ya sorular (numaralı — karar bekliyor)

1. **DISC-DERİNLEŞME:** "karakter netleşiyor" deneyimi UX olarak nasıl olsun? (ilerleme çubuğu / her turda "güven arttı" mesajı / rozet?)
2. **Sınırsız yeniden-derinleşme:** her derinleşme profili üzerine yazıyor, sınır yok. İstenen bu mu, yoksa "profil kilitlenir / N kez" mi?
3. **#31 aksiyon içeriği:** hangi biçim? (a) tipe-özel statik "yaklaşım" kartı, (b) SJT'yi menti-DISC'e göre dallandırma, (c) sertifika varyantı. (Eşleşme kartı doğal ev-sahibi.)
4. **SJT/OCEAN katmanı (madde 101):** eşleştirmeye bağlanacak mı, yoksa bilinçli mi ayrı? (Şu an hesaplanıp kullanılmıyor.)
5. **Sertifika 5→20 (madde 30):** güvenli seed runner yok (madde 73). Canlıya 20'yi taşımak için önce runner + PO onaylı DB yazımı gerek. Öncelik?
6. **#13 cevap-tipi:** kurum-özel sorulara şıklı/açık-uçlu tip eklemek migration ister. Gerçekten gerekli mi, yoksa Likert yeterli mi?
7. **Psikometrik gerekçe (madde 103):** uyum matrisi/60-40/tiebreak sezgisel. Uzman görüşü / pilot-veri kalibrasyonu bir iş kalemi olsun mu?
8. **Kalite düzeltmeleri:** yazım (I9 "güçlüğüm", SJT "Menteen") + reverse-kodlu soru ekleme + öğrenme kurgusuna çeşitlilik — hangileri yapılsın?

---

## ⏳ CANLI TEYİT KUYRUĞU (DB gerektirir — BU TURDA SORULMADI)

> Aşağıdakiler canlı Neon DB salt-okuma sorgusu gerektirir. Bu tur DB'ye hiçbir komut atmadı. Bir sonraki **altyapı-kontrol turunda** tek seferde bakılacak.

1. Canlı `Question` tablosunda kaç DISC sorusu var (kod 32; canlı = ?) — seed çalıştı mı, güncel mi?
2. Canlı `certificationQuestion` sayısı (kod 20; madde 30 "~5" iddiası) — trim mi eksik-seed mi?
3. Canlı `sjtQuestion` sayısı (kod 3; elle eklenmiş kayıt var mı?).
4. Canlı `LearningStage` sayısı (kod 13) + STK'ların eklediği `STK_CUSTOM` soru dağılımı.
5. Herhangi bir tenant'ın `Question`'a eklediği kurum-özel soru var mı (kullanım teyidi).
6. Hangi FE ekranı `questionService.completionPercent`'i, hangisi `adaptiveTestEngine` progress'ini gösteriyor (madde 102 — kısmen kod, kısmen çalışan uygulamada teyit).

---

*Bölüm dökümleri: `bolumler/01-05`. PO işaretleme dosyaları: `sorular-po-inceleme-2026-08-26.md` + `eslesme-uyum-po-inceleme-2026-08-26.md`. Yeni iş maddeleri: `00-KARAR-TAKIP` 101/102/103.*
