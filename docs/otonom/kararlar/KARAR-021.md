### KARAR-21 · STK anket sorusu cevap tipi: Likert-sabit mi, seçmeli mi?  [ÜRÜN KARARI · MIGRATION]
**Şu an ne var:** Kurumların ekleyebildiği özel sorular yalnız **Likert** (1-5 katılıyorum/katılmıyorum) tipinde; şıklı (çoktan seçmeli) veya açık-uçlu cevap seçeneği yok. Kanıt: `Question` modelinde `answerType` alanı yok (`backend/prisma/schema.prisma:738-759`; `type` yalnız CORE/DEEPENING). (Not: `SjtQuestion.AnswerFormat` benzer isimli ama farklı bir kavram — sertifika şık düzeni.)
**Sorun ne:** Bir kurum "en çok hangi konuda destek istersin?" gibi şıklı ya da "beklentin ne?" gibi açık bir soru soramıyor; her şeyi Likert'e sıkıştırmak zorunda.
**Neden sana soruyorum:** "Kurumlar ne kadar esnek soru sorabilsin" bir ürün tercihi; ayrıca veritabanı alanı eklemek gerekiyor (geri dönüşü zor).
**Seçenekler:**
**A) İki tip ekle: Likert + çoktan seçmeli** · Kullanıcı: kurum soru eklerken tip seçer · Kazanç: en sık ihtiyaç (şıklı) karşılanır · Kaybedersin: açık-uçlu yine yok; migration + form değişikliği · Süre: M · Geri alınır: zor (veri modeli) · Migration: VAR
**B) Üç tip: Likert + çoktan seçmeli + açık-uçlu** · Kullanıcı: tam esneklik · Kazanç: her soru tipi mümkün · Kaybedersin: açık-uçlu cevaplar analiz/eşleştirmeye giremez (serbest metin), raporlama karmaşıklaşır · Süre: L · Geri alınır: zor · Migration: VAR
**C) Şimdilik Likert kalsın** · Kullanıcı: değişiklik yok · Kazanç: migration bütçesi başka işe · Kaybedersin: kurum esnekliği yok, G3-13 kalıcı açık · Süre: yok · Geri alınır: evet · Migration: yok
**Karşılaştırma:** Kurum anketlerini satış hikâyenin parçası yapacaksan A yeterli ve dengeli (şıklı en sık istenen). Tam esneklik istiyorsan B ama açık-uçlu verinin nereye gideceğini (analiz/eşleştirme mi, sadece görüntüleme mi) önceden çözmen gerekir. Başka migration yapılmayacaksa C ile ertelenebilir.
**Benim önerim:** A — şıklı soru en sık gerçek ihtiyaç; açık-uçlu, cevabın nereye akacağı netleşmeden eklenirse ölü veri olur. KARAR-1/2'ye de "evet" dersen aynı migration turunda yapılabilir.
**Cevap vermezsen:** F-12 (G3-13) atlanır. Başka iş etkilenmez.
**İlgili kartlar:** KARAR-2 (o da migration; aynı turda birleştirilebilir) · KARAR-111 (migration turu, K-15) — birlikte cevaplanması önerilir: KARAR-21 + KARAR-2
⚠️ AĞUSTOS SİNYALİ (2026-08-27, C DIŞLANMIŞ — A/B/C DEĞİL): Ağustos G3-13'ü "⏸️→✅ canlandı" (`00-PO-KARARLARI-2026-08-27.md:60`) + bağlı-karar "G3-04→G3-13: STK şıklı-soru isteği `answerType` şema alanını zorunlu kılar" (`:106`). Yani ağustos answerType eklenmesini VE şıklı-soruyu istiyor → bu kartın C seçeneği (Likert kalsın) ağustosla ÇELİŞİR; yön A veya B. PO teyit ederse CEVAP'a yazılabilir.
**CEVAP:**

---

